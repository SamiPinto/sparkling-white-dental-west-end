import { NextResponse } from "next/server";
import { BIZ } from "../../data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------
// Lead endpoint — fires an instant SMS to the clinic on submit.
//
// Required env (set in Vercel, never committed — .env*.local is gitignored):
//   SMS_PROVIDER        "clicksend" | "twilio"
//   LEAD_SMS_TO         comma-separated E.164 numbers, e.g. "+61412345678"
//   clicksend:          CLICKSEND_USERNAME, CLICKSEND_API_KEY
//   twilio:             TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM
//
// With no provider configured the lead is logged and the caller still gets a
// 200 — so the form works in preview without credentials.
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
  return [
    `New veneers lead — ${BIZ.location}`,
    `Name: ${str(lead.name)}`,
    `Phone: ${str(lead.phone)}`,
    `Email: ${str(lead.email)}`,
    when ? `Prefers: ${when}` : "",
    str(lead.funding) ? `Funding: ${str(lead.funding)}` : "",
    str(lead.employment) ? `Employment: ${str(lead.employment)}` : "",
    str(lead.utm_source) ? `Source: ${str(lead.utm_source)}` : "",
  ]
    .filter(Boolean)
    .join("\n");
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

  const to = (process.env.LEAD_SMS_TO ?? "")
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);
  const provider = (process.env.SMS_PROVIDER ?? "").toLowerCase();
  const message = buildMessage(lead);

  // The lead is logged either way, so a failed SMS is still recoverable from
  // the platform logs rather than lost outright.
  console.log("LEAD", JSON.stringify(lead));

  if (!provider || to.length === 0) {
    console.warn("LEAD: no SMS provider configured — notification skipped");
    return NextResponse.json({ ok: true, notified: false });
  }

  try {
    if (provider === "clicksend") await sendClickSend(to, message);
    else if (provider === "twilio") await sendTwilio(to, message);
    else throw new Error(`Unknown SMS_PROVIDER "${provider}"`);
  } catch (err) {
    console.error("LEAD: SMS notification failed", err);
    // The patient still gets the success screen — their details are captured.
    return NextResponse.json({ ok: true, notified: false });
  }

  return NextResponse.json({ ok: true, notified: true });
}
