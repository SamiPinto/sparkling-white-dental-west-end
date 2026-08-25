import type { MouseEvent } from "react";
import { TRACKING } from "../app/data";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
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
