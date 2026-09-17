import type { Metadata } from "next";
import { BIZ, FORM } from "../data";
import { Icon } from "../../components/icons";
import { LeadConversion, PhoneLink } from "../../components/SiteChrome";

export const metadata: Metadata = {
  title: `Thank You | ${BIZ.name} ${BIZ.location}`,
  description: `Your veneers consultation request has been received. The ${BIZ.location} team will call you to confirm.`,
  alternates: {},
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  {
    icon: "phone",
    title: "We'll call you",
    body: `Our ${BIZ.location} team will call to confirm a consultation time that suits you.`,
  },
  {
    icon: "calendar",
    title: "Free consultation",
    body: "Talk through your goals and get an honest assessment — no pressure, no obligation.",
  },
  {
    icon: "sparkle",
    title: "Your smile plan",
    body: "Leave with a clear plan, pricing and payment options before you decide anything.",
  },
];

export default function ThankYou() {
  return (
    <>
      <LeadConversion />

      <header className="header">
        <div className="container">
          <a href="/" className="brand-logo" aria-label={`${BIZ.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BIZ.logo} alt={`${BIZ.name} — ${BIZ.location}`} />
          </a>
          <PhoneLink className="header-phone">
            <Icon name="phone" width={22} height={22} />
            <span className="hp-text">
              <span className="hp-label">Call the clinic</span>
              <span className="hp-num">{BIZ.phone}</span>
            </span>
          </PhoneLink>
        </div>
      </header>

      <main className="ty">
        <div className="container">
          <div className="ty-card">
            <div className="ty-ck" aria-hidden="true">
              <Icon name="check" width={34} height={34} strokeWidth={2.4} />
            </div>
            <h1>{FORM.successHeading}</h1>
            <p className="ty-lede">{FORM.successBody}</p>

            <h2 className="ty-next">What happens next</h2>
            <ol className="ty-steps">
              {NEXT_STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="ty-num" aria-hidden="true">
                    <Icon name={s.icon} width={20} height={20} />
                  </span>
                  <div>
                    <h3>
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="ty-actions">
              <PhoneLink className="btn">
                <Icon name="phone" width={18} height={18} /> Call {BIZ.phone}
              </PhoneLink>
              <a href="/" className="btn btn--ghost">
                Back to the veneers page
              </a>
            </div>
            <p className="ty-note">
              Can&apos;t wait? Call us now and mention your online request.
            </p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <span className="f-name">
            {BIZ.name} — {BIZ.locationDisplay}
          </span>
          <span className="f-sep">|</span>
          <PhoneLink>{BIZ.phone}</PhoneLink>
          <span className="f-sep">|</span>
          <span>{BIZ.address}</span>
        </div>
        <div className="container footer-legal">
          © {new Date().getFullYear()} {BIZ.name}. All rights reserved. ·
          Designed by{" "}
          <a
            href="https://shopamarketing.com.au"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shopa Marketing
          </a>
        </div>
      </footer>
    </>
  );
}
