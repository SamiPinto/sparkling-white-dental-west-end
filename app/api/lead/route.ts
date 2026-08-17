import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BIZ } from "../../data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------
// Lead endpoint — emails the lead, appends it to a Google Sheet, and fires an
// SMS on submit.
//
// All three channels are attempted independently: one failing never stops the
// others, and none failing ever fails the submission, because the patient
// should not see an error for a delivery problem at our end. Whatever
// happens, the full lead is logged so it can be recovered from the platform
// logs.
//
// Required env (set in Vercel, never committed — .env*.local is gitignored):
//   email:  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_EMAIL_TO
//           LEAD_EMAIL_FROM is optional and defaults to SMTP_USER.
//   sheet:  SHEETS_WEBHOOK_URL  the Apps Script web app /exec URL
//           SHEETS_TOKEN        shared secret the script checks
//   sms:    SMS_PROVIDER  "ghl" | "clicksend" | "twilio"
//           LEAD_SMS_TO   comma-separated E.164, e.g. "+61412345678"
//           clicksend:    CLICKSEND_USERNAME, CLICKSEND_API_KEY
//           twilio:       TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM
//           ghl:          GHL_WEBHOOK_URL (recipient set in the workflow)
//
// Any channel can be left unconfigured; it is simply skipped.
// ---------------------------------------------------------------

type Lead = Record<string, unknown>;

// Best-effort throttle. Serverless instances don't share memory, so this
// blunts a burst against one instance rather than guaranteeing a global cap —
// it exists so a scripted flood can't run up an SMS bill unattended.
const HITS = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  if (HITS.size > 500) HITS.clear();
  return recent.length > MAX_PER_WINDOW;
}

function str(v: unknown, max = 120) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function buildMessage(lead: Lead) {
  const when = [str(lead.apptDate), str(lead.apptTime)]
    .filter(Boolean)
    .join(" ");
  const where = [str(lead.suburb), str(lead.postcode)]
    .filter(Boolean)
    .join(" ");
  return [
    `New veneers lead - ${BIZ.location}`,
    `Name: ${str(lead.name)}`,
    `Phone: ${str(lead.phone)}`,
    `Email: ${str(lead.email)}`,
    where ? `Suburb: ${where}` : "",
    when ? `Prefers: ${when}` : "",
    str(lead.funding) ? `Funding: ${str(lead.funding)}` : "",
    str(lead.employment) ? `Employment: ${str(lead.employment)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// Every field the form collects, in the order it is useful to read them.
const EMAIL_ROWS: [string, string][] = [
  ["Name", "name"],
  ["Phone", "phone"],
  ["Email", "email"],
  ["Suburb", "suburb"],
  ["Postcode", "postcode"],
  ["Preferred date", "apptDate"],
  ["Preferred time", "apptTime"],
  ["Employment", "employment"],
  ["Funding", "funding"],
  ["Source", "utm_source"],
  ["Medium", "utm_medium"],
  ["Campaign", "utm_campaign"],
  ["Content", "utm_content"],
  ["Term", "utm_term"],
  ["Google click id", "gclid"],
  ["Meta click id", "fbclid"],
  ["Landing page", "landing_url"],
  ["Submitted", "submitted_at"],
];

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(lead: Lead) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = (process.env.LEAD_EMAIL_TO ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  if (!host || !user || !pass || to.length === 0) return false;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    // 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });

  const rows = EMAIL_ROWS.map(([label, key]) => [label, str(lead[key], 400)])
    .filter(([, v]) => v)
    .map(([label, v]) => [label, v] as [string, string]);

  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n");
  const html = `<div style="font-family:system-ui,Segoe UI,Arial,sans-serif;font-size:15px;color:#10323d">
<h2 style="margin:0 0 4px;font-size:19px">New veneers enquiry — ${esc(
    BIZ.location
  )}</h2>
<p style="margin:0 0 16px;color:#607680">${esc(BIZ.name)} · ${esc(
    BIZ.address
  )}</p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
${rows
  .map(
    ([l, v]) =>
      `<tr><td style="padding:5px 18px 5px 0;color:#607680;vertical-align:top;white-space:nowrap">${esc(
        l
      )}</td><td style="padding:5px 0"><strong>${esc(v)}</strong></td></tr>`
  )
  .join("\n")}
</table>
<p style="margin:20px 0 0;color:#607680;font-size:13px">Sent automatically by the ${esc(
    BIZ.location
  )} veneers landing page.</p>
</div>`;

  await transporter.sendMail({
    from: process.env.LEAD_EMAIL_FROM || user,
    to,
    // Reply goes to the patient, so the team can answer straight from the alert.
    replyTo: str(lead.email) || undefined,
    subject: `New Veneers Lead — ${BIZ.location} — ${
      str(lead.name) || "Website enquiry"
    }`,
    text,
    html,
  });
  return true;
}

// Appends the lead to the shared Google Sheet via an Apps Script web app.
// The script picks the tab from `location`, so all three sites post to the
// same URL and land in their own tab.
async function sendToSheet(lead: Lead) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return false;

  const payload: Record<string, string> = {
    token: process.env.SHEETS_TOKEN ?? "",
    location: BIZ.location,
  };
  EMAIL_ROWS.forEach(([, key]) => {
    payload[key] = str(lead[key], 400);
  });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Apps Script answers with a 302 to script.googleusercontent.com.
    redirect: "follow",
  });
  const body = await res.text();
  if (!res.ok || !body.includes('"ok":true')) {
    throw new Error(`Sheets ${res.status}: ${body.slice(0, 200)}`);
  }
  return true;
}

async function sendClickSend(to: string[], body: string) {
  const user = process.env.CLICKSEND_USERNAME;
  const key = process.env.CLICKSEND_API_KEY;
  if (!user || !key) throw new Error("ClickSend credentials missing");

  const res = await fetch("https://rest.clicksend.com/v3/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${user}:${key}`).toString("base64")}`,
    },
    body: JSON.stringify({
      messages: to.map((n) => ({ source: "web", to: n, body })),
    }),
  });
  if (!res.ok) {
    throw new Error(`ClickSend ${res.status}: ${await res.text()}`);
  }
}

// The recipient lives in the GHL workflow's Internal Notification action, so
// LEAD_SMS_TO does nothing here — changing it will not change who gets texted.
async function sendGhl(body: string, lead: Lead) {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) throw new Error("GHL webhook URL missing");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: body,
      location: BIZ.location,
      name: str(lead.name),
      phone: str(lead.phone),
      email: str(lead.email),
    }),
  });
  if (!res.ok) {
    throw new Error(`GHL ${res.status}: ${await res.text()}`);
  }
}

async function sendTwilio(to: string[], body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) throw new Error("Twilio credentials missing");

  // Twilio takes one recipient per request.
  for (const n of to) {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString(
            "base64"
          )}`,
        },
        body: new URLSearchParams({ To: n, From: from, Body: body }),
      }
    );
    if (!res.ok) {
      throw new Error(`Twilio ${res.status}: ${await res.text()}`);
    }
  }
}

export async function POST(req: Request) {
  let lead: Lead;
  try {
    lead = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Server-side honeypot — the client drops these too, but a bot posting
  // straight to the endpoint never runs the client check.
  if (str(lead.company)) return NextResponse.json({ ok: true });

  const name = str(lead.name);
  const email = str(lead.email);
  const phone = str(lead.phone);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Throttle only submissions that would actually send an SMS — a patient
  // retrying after a typo shouldn't burn their allowance.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    console.warn(`LEAD: rate limited ${ip}`);
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  // Logged before anything is dispatched, so the lead is recoverable from the
  // platform logs even if every delivery channel fails.
  console.log("LEAD", JSON.stringify(lead));

  const smsTo = (process.env.LEAD_SMS_TO ?? "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
  const provider = (process.env.SMS_PROVIDER ?? "").toLowerCase();

  async function trySms() {
    if (!provider) {
      console.warn("LEAD: no SMS provider configured — skipped");
      return false;
    }
    const message = buildMessage(lead);
    if (provider === "ghl") {
      await sendGhl(message, lead);
      return true;
    }
    if (smsTo.length === 0) {
      console.warn("LEAD: no SMS recipient configured — skipped");
      return false;
    }
    if (provider === "clicksend") await sendClickSend(smsTo, message);
    else if (provider === "twilio") await sendTwilio(smsTo, message);
    else throw new Error(`Unknown SMS_PROVIDER "${provider}"`);
    return true;
  }

  // Independent channels — one failing must not stop the others, so they are
  // settled rather than awaited in sequence.
  const [emailResult, sheetResult, smsResult] = await Promise.allSettled([
    sendEmail(lead),
    sendToSheet(lead),
    trySms(),
  ]);

  const emailed = emailResult.status === "fulfilled" && emailResult.value;
  const saved = sheetResult.status === "fulfilled" && sheetResult.value;
  const texted = smsResult.status === "fulfilled" && smsResult.value;

  if (emailResult.status === "rejected") {
    console.error("LEAD: email failed", emailResult.reason);
  } else if (!emailResult.value) {
    console.warn("LEAD: no SMTP configured — email skipped");
  }
  if (sheetResult.status === "rejected") {
    console.error("LEAD: sheet append failed", sheetResult.reason);
  } else if (!sheetResult.value) {
    console.warn("LEAD: no SHEETS_WEBHOOK_URL — sheet skipped");
  }
  if (smsResult.status === "rejected") {
    console.error("LEAD: SMS failed", smsResult.reason);
  }

  // The patient always sees success — their details are captured, and a
  // delivery problem at our end is not theirs to see or retry.
  return NextResponse.json({ ok: true, emailed, saved, texted });
}
