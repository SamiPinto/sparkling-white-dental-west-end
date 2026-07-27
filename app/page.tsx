import Image from "next/image";
import {
  BIZ,
  HERO,
  QUALIFY,
  GALLERY,
  STEPS,
  DOCTOR,
  FAQS,
  CTA,
} from "./data";
import { Icon } from "../components/icons";
import { Header, MobileCTA, ScrollReveal } from "../components/SiteChrome";
import { VeneersForm } from "../components/VeneersForm";

export default function VeneersLanding() {
  return (
    <>
      <a id="top" />
      <ScrollReveal />

      {/* ---------- Announcement ---------- */}
      <div className="announce">
        <div className="container">
          <span>
            <strong>Porcelain veneers</strong> in {BIZ.location}
          </span>
          <span className="dot">•</span>
          <span className="a-2">
            <strong>Free</strong> initial consultation
          </span>
        </div>
      </div>

      <Header />

      {/* ---------- Hero + booking form ---------- */}
      <section className="hero">
        <div className="container">
          <div className="hero-content hero-anim">
            <span className="eyebrow">{HERO.eyebrow}</span>
            <h1>
              {HERO.headline}{" "}
              <span className="accent">{HERO.headlineAccent}</span>
            </h1>
            <p className="hero-sub">{HERO.lede}</p>
            <div className="trustline">
              {HERO.trust.map((t) => (
                <span className="it" key={t.text}>
                  <Icon name={t.icon} width={19} height={19} />
                  {t.text}
                </span>
              ))}
            </div>
            <span className="locbadge">
              <Icon name="pin" width={20} height={20} />
              {BIZ.address}
            </span>
          </div>

          <div className="hero-form-wrap" id="book">
            <VeneersForm />
          </div>
        </div>
      </section>

      {/* ---------- Is this you? ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow center">{QUALIFY.eyebrow}</span>
            <h2>{QUALIFY.heading}</h2>
          </div>
          <div className="qual-grid">
            {QUALIFY.items.map((q, i) => (
              <div
                className="qual reveal"
                key={q.title}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="qual-ico">
                  <Icon name={q.icon} width={28} height={28} />
                </div>
                <h3>{q.title}</h3>
                <p>{q.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Meet Dr Bikramjit ---------- */}
      <section className="doctor section-tint">
        <div className="container">
          <div className="doc-visual reveal">
            <div className="doc-photo">
              <Image
                src={DOCTOR.photo}
                alt={`${DOCTOR.capName}, Principal Dentist at ${BIZ.name}, ${BIZ.location}`}
                fill
                sizes="(max-width: 960px) 90vw, 420px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
              <div className="doc-photo-cap">
                <div className="cap-name">{DOCTOR.capName}</div>
                <div className="cap-role">{DOCTOR.capRole}</div>
              </div>
            </div>
            <div className="doc-float">
              <div className="df-ico">
                <Icon name="award" width={22} height={22} />
              </div>
              <div>
                <div className="df-big">{DOCTOR.statBig}</div>
                <div className="df-small">{DOCTOR.statSmall}</div>
              </div>
            </div>
          </div>

          <div className="doc-body reveal">
            <span className="eyebrow">Your dentist</span>
            <h2>{DOCTOR.heading}</h2>
            <p>{DOCTOR.body}</p>
            <div className="doc-actions">
              <a href="#book" className="btn btn--lg">
                <Icon name="calendar" width={20} height={20} /> Book My Free
                Consultation
              </a>
              <a href={BIZ.phoneHref} className="btn btn--ghost btn--lg">
                <Icon name="phone" width={18} height={18} /> {BIZ.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Before / after gallery ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow center">{GALLERY.eyebrow}</span>
            <h2>{GALLERY.heading}</h2>
            <p>{GALLERY.sub}</p>
          </div>
          <div className="gallery-grid">
            {GALLERY.items.map((g, i) => (
              <div
                className="gcard reveal"
                key={g.label}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="ba-pair">
                  <BaSlot label="Before" src={g.before} alt={g.label} />
                  <BaSlot label="After" src={g.after} alt={g.label} />
                </div>
              </div>
            ))}
          </div>
          <p className="gallery-note">{GALLERY.disclaimer}</p>
          <div className="gallery-cta reveal">
            <a href="#book" className="btn btn--lg">
              {GALLERY.ctaLabel} <Icon name="arrow" width={18} height={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow center">{STEPS.eyebrow}</span>
            <h2>{STEPS.heading}</h2>
          </div>
          <div className="step-grid">
            {STEPS.items.map((s, i) => (
              <div
                className="step-card reveal"
                key={s.title}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="n" aria-hidden="true">
                  {i + 1}
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow center">{FAQS.eyebrow}</span>
            <h2>{FAQS.heading}</h2>
          </div>
          <div className="faq-list">
            {FAQS.items.map((f, i) => (
              <details
                className="faq-item reveal"
                key={f.q}
                name="faq"
                open={i === 0}
              >
                <summary>
                  {f.q}
                  <span className="fq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="fq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="final-cta">
        <div className="container">
          <h2>
            {CTA.heading} <span className="accent">{CTA.headingAccent}</span>
          </h2>
          <p>{CTA.body}</p>
          <div className="final-actions">
            <a href="#book" className="btn btn--light btn--lg">
              <Icon name="calendar" width={20} height={20} /> {CTA.button}
            </a>
            <a
              href={BIZ.phoneHref}
              className="btn btn--lg"
              style={{ background: "rgba(255,255,255,0.12)", boxShadow: "none" }}
            >
              <Icon name="phone" width={18} height={18} /> {BIZ.phone}
            </a>
          </div>
          <div className="final-note">
            {BIZ.address} · New patients always welcome
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <div className="container">
          <span className="f-name">
            {BIZ.name} — {BIZ.location}
          </span>
          <span className="f-sep">|</span>
          <a href={BIZ.phoneHref}>{BIZ.phone}</a>
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

      <MobileCTA />
    </>
  );
}

// Before/after slot: real photo when supplied, styled placeholder until then.
function BaSlot({
  label,
  src,
  alt,
}: {
  label: string;
  src: string | null;
  alt: string;
}) {
  return (
    <div className="ba-slot">
      <span className="lbl">{label}</span>
      {src ? (
        <Image
          src={src}
          alt={`${alt} — ${label.toLowerCase()} veneers treatment`}
          fill
          sizes="(max-width: 640px) 50vw, 200px"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span className="ph">
          <Icon name="sparkle" width={26} height={26} />
          Photo to be added
        </span>
      )}
    </div>
  );
}
