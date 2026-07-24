"use client";

import { useEffect, useRef } from "react";
import { MEDIA } from "../app/data";

// Live Doctify verified-reviews carousel. The widget posts its rendered
// height via postMessage; we apply it so the iframe never clips or leaves a
// gap. CSS min-heights act as a fallback if no message arrives.
export function DoctifyReviews() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      let host = "";
      try {
        host = new URL(e.origin).hostname;
      } catch {
        return;
      }
      if (!host.endsWith("doctify.com")) return;

      const d = e.data as unknown;
      let h: number | string | undefined;
      if (typeof d === "number") h = d;
      else if (d && typeof d === "object") {
        const o = d as Record<string, unknown>;
        h =
          (o.height as number) ??
          (o.iframeHeight as number) ??
          ((o.payload as Record<string, unknown>)?.height as number) ??
          ((o.data as Record<string, unknown>)?.height as number);
      }
      if (typeof h === "string") h = parseInt(h, 10);
      if (typeof h === "number" && h > 150 && ref.current) {
        ref.current.style.height = `${Math.ceil(h)}px`;
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="doctify-wrap reveal">
      <iframe
        ref={ref}
        className="doctify-frame"
        src={MEDIA.doctifyReviews}
        title="Verified patient reviews on Doctify"
        loading="lazy"
      />
    </div>
  );
}
