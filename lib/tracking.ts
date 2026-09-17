import type { MouseEvent } from "react";
import { BIZ, TRACKING } from "../app/data";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const THANK_YOU_PATH = "/thank-you";
const LEAD_KEY = "swd_lead";

// The form hands a one-time lead id to the thank-you page, which fires the
// Lead / conversion events and then burns the id. Refreshes, back-button
// visits and people opening /thank-you directly therefore never count.
export function handOffLead() {
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  try {
    sessionStorage.setItem(LEAD_KEY, id);
  } catch {}
  window.location.assign(THANK_YOU_PATH);
}

export function reportLead() {
  let id: string | null = null;
  try {
    id = sessionStorage.getItem(LEAD_KEY);
    sessionStorage.removeItem(LEAD_KEY);
  } catch {}
  if (!id) return false;

  try {
    window.fbq?.(
      "track",
      "Lead",
      { location: BIZ.location, service: "Veneers" },
      { eventID: id }
    );
  } catch {}
  try {
    if (TRACKING.gadsSendTo)
      window.gtag?.("event", "conversion", {
        send_to: TRACKING.gadsSendTo,
        transaction_id: id,
      });
  } catch {}
  return true;
}

// Click handler for every tel: link. Reports the click to both ad platforms
// before the dialer opens, so each can attribute the call to its own ads.
// Google's conversion ping needs the navigation held open until it lands (or
// a short timeout elapses) — Meta's Contact event fires and-forget alongside it.
export function reportPhoneClick(e: MouseEvent<HTMLAnchorElement>) {
  const url = e.currentTarget.href;

  try {
    window.fbq?.("track", "Contact");
  } catch {}

  if (!TRACKING.gadsPhoneSendTo || !window.gtag) return;

  e.preventDefault();
  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };
  try {
    window.gtag("event", "conversion", {
      send_to: TRACKING.gadsPhoneSendTo,
      value: 1.0,
      currency: "AUD",
      event_callback: go,
    });
  } catch {
    return go();
  }
  setTimeout(go, 1000);
}
