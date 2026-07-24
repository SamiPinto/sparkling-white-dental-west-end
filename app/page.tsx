import Image from "next/image";
import {
  BIZ,
  HOURS,
  SERVICES,
  PAYMENTS,
  FAQS,
  OFFER,
  MEDIA,
  COVER_LOGOS,
} from "./data";
import { Icon } from "../components/icons";
import { Header, MobileCTA, ScrollReveal } from "../components/SiteChrome";
import { DoctifyReviews } from "../components/DoctifyReviews";
import { VideoPlayer } from "../components/VideoPlayer";

const bookProps = {
  href: BIZ.bookUrl,
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

export default function Home() {
  return (
    <>
      <a id="top" />
      <ScrollReveal />

      {/* ---------- Announcement ---------- */}
      <div className="announce">
        <div className="container">
          <span>
            <strong>New patients welcome</strong> at our West End clinic
          </span>
          <span className="dot">•</span>
          <span className="a-2">
            <strong>Interest-free</strong> payment plans available
          </span>
          <span className="dot a-hide">•</span>
          <span className="a-hide">
            <strong>CDBS</strong> bulk-billed for eligible kids
          </span>
        </div>
      </div>

      <Header />

      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="container">
          <div className="hero-anim">
            <div className="hero-badge">
              <span className="pill">45 Years</span>
              <span>
                Serving West End as <b>Dr. GP Nichols</b>, now Sparkling White
              </span>
            </div>
            <h1>
              West End&rsquo;s <br />
              <span className="accent">Local Dentists</span>
            </h1>
            <p className="hero-sub">
              Your trusted family dentist in the heart of Brisbane&rsquo;s West
              End — gentle, comprehensive care for every generation, all under
              one roof.
            </p>
            <div className="hero-offer">
              <span className="ho-tag">{OFFER.tag}</span>
              <span className="ho-text">
                <b>{OFFER.headline}</b>
                <span>{OFFER.sub}</span>
              </span>
            </div>
            <div className="hero-actions">
              <a className="btn btn--lg" {...bookProps}>
                <Icon name="calendar" width={20} height={20} /> Book Online
              </a>
              <a className="btn btn--ghost btn--lg" href={BIZ.phoneHref}>
                <Icon name="phone" width={18} height={18} /> {BIZ.phone}
              </a>
            </div>
            <div className="hero-trust">
              <div>
                <div className="stars">★★★★★</div>
                <div className="t-text">
                  Loved by <b>West End families</b>
                </div>
              </div>
              <div className="hero-divider" />
              <div className="t-text">
                <b>Dr. Bik</b> · nearly 30 years&rsquo; experience
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo">
              <Image
                src={MEDIA.drBik}
                alt="Dr. Bik, Principal Dentist at Sparkling White Dental, West End"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 500px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
              <div className="hero-photo-cap">
                <div className="cap-name">Dr. Bik</div>
                <div className="cap-role">
                  Principal Dentist · West End clinic
                </div>
              </div>
            </div>
            <div className="hero-float tl">
              <div className="hf-ico">
                <Icon name="award" width={22} height={22} />
              </div>
              <div>
                <div className="hf-big">45+ yrs</div>
                <div className="hf-small">Trusted locally</div>
              </div>
            </div>
            <div className="hero-float br">
              <div className="hf-ico">
                <Icon name="svc-emergency" width={22} height={22} />
              </div>
              <div>
                <div className="hf-big">Same-day</div>
                <div className="hf-small">Emergency care</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <div className="trust-strip">
        <div className="container">
          <a
            href="https://www.doctify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="doctify-badge"
            aria-label="Recommended by patients on Doctify"
          >
            <Image
              src={MEDIA.doctify}
              alt="Recommended by patients on Doctify"
              width={200}
              height={128}
            />
          </a>
          <div className="trust-strip-main">
            <span className="ts-label">Payment options &amp; cover</span>
            <div className="cover-logos">
              {COVER_LOGOS.map((l) => (
                <Image
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  width={120}
                  height={40}
                />
              ))}
              <span className="cover-hicaps">
                + all major health funds via <b>HICAPS</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Services ---------- */}
      <section id="services" className="section services-bg">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow center">Comprehensive Care</span>
            <h2>Every treatment you need, under one roof</h2>
            <p>
              From routine check-ups to advanced implants, orthodontics and laser
              dentistry — delivered with the latest technology and a gentle
              approach.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <a
                className="svc reveal"
                key={s.name}
                href={BIZ.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Book ${s.name}`}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <div className="svc-ico">
                  <Icon name={s.icon} width={28} height={28} />
                </div>
                <h3>{s.name}</h3>
                <p>{s.body}</p>
                <div className="svc-foot">
                  <span className="svc-tag">{s.tag}</span>
                  <span className="svc-book">
                    Book <Icon name="arrow" width={15} height={15} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- About / Dr Bik ---------- */}
      <section id="about" className="section about">
        <div className="container">
          <div className="about-visual reveal">
            <div className="about-photo">
              <Image
                src={MEDIA.team}
                alt="The Sparkling White Dental team at the West End reception"
                fill
                sizes="(max-width: 900px) 90vw, 560px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="about-card">
              <div className="ac-lead">
                <div className="ac-kicker">Led by</div>
                <div className="ac-name">Dr. Bik</div>
                <div className="ac-role">Principal Dentist · West End</div>
              </div>
              <div className="ac-stats">
                <div className="ac-stat">
                  <b>30</b>
                  <span>Years&rsquo; experience</span>
                </div>
                <div className="ac-stat">
                  <b>45</b>
                  <span>Years in West End</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-body reveal">
            <span className="eyebrow">Why Sparkling White</span>
            <h2>A trusted name, with the latest in modern dentistry</h2>
            <p>
              Known for 45 years as Dr. GP Nichols Dental Surgery, our practice is
              a reputable family dentist in West End, Brisbane. Under new
              management as Sparkling White Dental, we continue that same standard
              of care — now with advanced technology and techniques.
            </p>
            <blockquote className="about-quote">
              &ldquo;A thorough, educative approach — with a focus on your
              long-term oral health.&rdquo;
            </blockquote>
            <ul className="about-list">
              <li>
                <span className="tick">
                  <Icon name="check" width={15} height={15} />
                </span>
                Advanced treatments: implants, veneers, orthodontics &amp; laser
                dentistry
              </li>
              <li>
                <span className="tick">
                  <Icon name="check" width={15} height={15} />
                </span>
                Greater accuracy, reduced discomfort and complex cases treated
                with ease
              </li>
              <li>
                <span className="tick">
                  <Icon name="check" width={15} height={15} />
                </span>
                A warm, welcoming environment for the whole family
              </li>
              <li>
                <span className="tick">
                  <Icon name="check" width={15} height={15} />
                </span>
                One of the top dental teams near Brisbane&rsquo;s CBD
              </li>
            </ul>
            <a className="btn" {...bookProps}>
              Meet the team — book a visit <Icon name="arrow" width={18} height={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Stats band ---------- */}
      <section className="stats-band">
        <div className="container">
          {[
            { b: "45+", s: "Years serving West End" },
            { b: "8+", s: "Specialised dental services" },
            { b: "30", s: "Years of clinical experience" },
            { b: "1", s: "Convenient Boundary St clinic" },
          ].map((st) => (
            <div className="stat" key={st.s}>
              <b>{st.b}</b>
              <span>{st.s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Video tour ---------- */}
      <section className="section video-sec">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow center">Take a Look Inside</span>
            <h2>Step into our West End practice</h2>
            <p>
              Meet Dr. Bik and the team and see the warm, modern clinic our West
              End community has trusted for 45 years.
            </p>
          </div>
          <VideoPlayer />
        </div>
      </section>

      {/* ---------- Payments ---------- */}
      <section id="payments" className="section payments">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">Affordable Care</span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.6vw, 2.9rem)",
                marginTop: "16px",
              }}
            >
              Quality dental care that fits your budget
            </h2>
            <p style={{ marginTop: "18px", color: "var(--ink-soft)" }}>
              We&rsquo;re committed to making great dental care accessible for
              everyone. During your consultation we&rsquo;ll explain your options
              clearly and give you a transparent breakdown of costs — then help
              you choose a plan that works.
            </p>
            <p className="pay-note">
              Every major health fund processed on the spot through HICAPS.
              DVA &amp; CDBS accepted.
            </p>
            <div className="pay-logos">
              {COVER_LOGOS.map((l) => (
                <Image
                  key={l.alt}
                  src={l.src}
                  alt={l.alt}
                  width={120}
                  height={40}
                />
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="pay-grid">
              {PAYMENTS.map((p) => (
                <div className="pay-card" key={p.name}>
                  <div className="pc-name">{p.name}</div>
                  <p>{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Emergency ---------- */}
      <section className="section emergency">
        <div className="container">
          <div className="emergency-card reveal">
            <div>
              <div className="ec-kicker">In pain? Don&rsquo;t wait</div>
              <h2>Emergency dentist in West End</h2>
              <p>
                Toothache, a broken or knocked-out tooth, or sudden swelling — our
                team prioritises urgent care to relieve pain fast and prevent
                further complications. Call us early in the day.
              </p>
            </div>
            <div>
              <a href={BIZ.phoneHref} className="btn btn--light btn--lg">
                <Icon name="phone" width={20} height={20} /> Call {BIZ.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Reviews (live Doctify verified reviews) ---------- */}
      <section id="reviews" className="section reviews">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow center">Loved by the Community</span>
            <h2>Trusted by West End families for generations</h2>
            <p>
              Real, independently verified patient reviews — straight from
              Doctify.
            </p>
          </div>
          <DoctifyReviews />
          <p className="reviews-caption">
            <span className="rc-stars">★★★★★</span> Rated{" "}
            <b>4.98 / 5</b> by verified patients on Doctify
          </p>
        </div>
      </section>

      {/* ---------- Location / Contact ---------- */}
      <section id="contact" className="section location">
        <div className="container">
          <div className="loc-card reveal">
            <span className="eyebrow">Visit Us</span>
            <h2>Sparkling White Dental, West End</h2>
            <div className="loc-rows">
              <div className="loc-row">
                <div className="lr-ico">
                  <Icon name="pin" width={22} height={22} />
                </div>
                <div>
                  <div className="lr-label">Address</div>
                  <div className="lr-val">{BIZ.address}</div>
                </div>
              </div>
              <div className="loc-row">
                <div className="lr-ico">
                  <Icon name="phone" width={22} height={22} />
                </div>
                <div>
                  <div className="lr-label">Phone</div>
                  <div className="lr-val">
                    <a href={BIZ.phoneHref}>{BIZ.phone}</a>
                  </div>
                </div>
              </div>
              <div className="loc-row">
                <div className="lr-ico">
                  <Icon name="clock" width={22} height={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="lr-label">Opening hours</div>
                  <table className="hours-table">
                    <tbody>
                      {HOURS.map((h) => (
                        <tr key={h.day}>
                          <td>{h.day}</td>
                          <td>{h.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="hours-note">
                    Hours may vary on public holidays — please call to confirm.
                  </p>
                </div>
              </div>
            </div>
            <a className="btn btn--lg" {...bookProps}>
              <Icon name="calendar" width={20} height={20} /> Book Your Appointment
            </a>
          </div>

          <div className="map-wrap reveal">
            <iframe
              title="Sparkling White Dental, West End — map"
              src={BIZ.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section faq">
        <div className="container">
          <div className="section-head center reveal">
            <span className="eyebrow center">Good to Know</span>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details className="faq-item reveal" key={i} name="faq">
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
            Ready for a healthier, <span className="accent">brighter smile?</span>
          </h2>
          <p>
            Join the West End families who trust Sparkling White Dental. Book
            online in under a minute, or call our friendly team today.
          </p>
          <div className="final-actions">
            <a className="btn btn--light btn--lg" {...bookProps}>
              <Icon name="calendar" width={20} height={20} /> Book Online
            </a>
            <a
              className="btn btn--lg"
              href={BIZ.phoneHref}
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
          <div>
            <div className="f-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BIZ.logo} alt={BIZ.name} />
            </div>
            <p className="f-about">
              Your trusted family dentist in West End, Brisbane — 45 years of
              care, now with the latest dental technology under Dr. Bik.
            </p>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#about">Why Choose Us</a>
              </li>
              <li>
                <a href="#payments">Payment Plans</a>
              </li>
              <li>
                <a href="#reviews">Reviews</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Popular Services</h3>
            <ul>
              <li>
                <a href="#services">General Dentistry</a>
              </li>
              <li>
                <a href="#services">Dental Implants</a>
              </li>
              <li>
                <a href="#services">Cosmetic &amp; Whitening</a>
              </li>
              <li>
                <a href="#services">Emergency Dentist</a>
              </li>
              <li>
                <a href="#services">Children&rsquo;s Dentistry</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>West End Clinic</h3>
            <div className="f-loc">
              <b>Sparkling White Dental</b>
              {BIZ.address}
              <br />
              <a href={BIZ.phoneHref}>{BIZ.phone}</a>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <a href={BIZ.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <span style={{ opacity: 0.3 }}>·</span>
              <a href={BIZ.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div>© 2025 {BIZ.name}. All rights reserved.</div>
            <div>
              Also caring for patients in Alexandra Hills &amp; Goondiwindi
              <span className="fb-sep"> · </span>
              <span className="fb-credit">
                Designed by{" "}
                <a
                  href="https://shopamarketing.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shopa Marketing
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      <MobileCTA />
    </>
  );
}
