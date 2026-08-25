"use client";

import { useEffect, useState } from "react";
import { BIZ } from "../app/data";
import { Icon } from "./icons";
import { reportPhoneClick } from "../lib/tracking";

// Minimal landing-page header: logo + click-to-call only.
// No nav links by design — every exit path costs form conversions.
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container">
        <a href="#top" className="brand-logo" aria-label={`${BIZ.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BIZ.logo} alt={`${BIZ.name} — ${BIZ.location}`} />
        </a>

        <div className="header-cta">
          <a
            href={BIZ.phoneHref}
            className="header-phone"
            aria-label={`Call the clinic on ${BIZ.phone}`}
            onClick={reportPhoneClick}
          >
            <Icon name="phone" width={22} height={22} />
            <span className="hp-text">
              <span className="hp-label">Call the clinic</span>
              <span className="hp-num">{BIZ.phone}</span>
            </span>
          </a>
          <a href="#book" className="btn">
            Book a Consultation
          </a>
        </div>
      </div>
    </header>
  );
}

export function MobileCTA() {
  return (
    <div className="mobile-cta">
      <a
        href={BIZ.phoneHref}
        className="btn btn--ghost"
        onClick={reportPhoneClick}
      >
        <Icon name="phone" width={18} height={18} /> Call
      </a>
      <a href="#book" className="btn">
        <Icon name="calendar" width={18} height={18} /> Book Consultation
      </a>
    </div>
  );
}

export function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
