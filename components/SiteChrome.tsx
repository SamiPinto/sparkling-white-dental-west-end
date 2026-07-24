"use client";

import { useEffect, useState } from "react";
import { BIZ } from "../app/data";
import { Icon } from "./icons";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#about" },
  { label: "Payment Plans", href: "#payments" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <a href="#top" className="brand-logo" aria-label={`${BIZ.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BIZ.logo} alt={`${BIZ.name} — West End`} />
          </a>

          <nav className="nav">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="navlink">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="header-cta">
            <a
              href={BIZ.phoneHref}
              className="header-phone"
              aria-label={`Call the clinic on ${BIZ.phone}`}
            >
              <Icon name="phone" width={22} height={22} />
              <span className="hp-text">
                <span className="hp-label">Call the clinic</span>
                <span className="hp-num">{BIZ.phone}</span>
              </span>
            </a>
            <a
              href={BIZ.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Book Online
            </a>
            <button
              className="menu-toggle"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      >
        <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
          <div className="mm-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BIZ.logo} alt={BIZ.name} />
            <button
              className="mm-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="mm-link"
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <div className="mm-actions">
            <a
              href={BIZ.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Book Online
            </a>
            <a href={BIZ.phoneHref} className="btn btn--ghost">
              Call {BIZ.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function MobileCTA() {
  return (
    <div className="mobile-cta">
      <a href={BIZ.phoneHref} className="btn btn--ghost">
        <Icon name="phone" width={18} height={18} /> Call
      </a>
      <a
        href={BIZ.bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        <Icon name="calendar" width={18} height={18} /> Book Online
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
