"use client";

import { useEffect, useRef, useState } from "react";
import { BIZ, FORM, TRACKING } from "../app/data";
import { Icon } from "./icons";
import { reportPhoneClick } from "../lib/tracking";

type Fields = {
  employment: string;
  funding: string;
  name: string;
  email: string;
  phone: string;
  suburb: string;
  postcode: string;
  timeline: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  employment: "",
  funding: "",
  name: "",
  email: "",
  phone: "",
  suburb: "",
  postcode: "",
  timeline: "",
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// Campaign attribution — carried through to the lead payload so the
// clinic can see which ad produced the callback request.
function getTracking() {
  const p = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ];
  const o: Record<string, string> = {};
  keys.forEach((k) => {
    const v = p.get(k);
    if (v) o[k] = v;
  });
  o.landing_url = window.location.href;
  o.location = BIZ.location;
  o.service = "Veneers";
  o.submitted_at = new Date().toISOString();
  return o;
}

export function VeneersForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);

  const employmentRef = useRef<HTMLSelectElement>(null);
  const fundingRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const suburbRef = useRef<HTMLInputElement>(null);
  const postcodeRef = useRef<HTMLInputElement>(null);
  const timelineRef = useRef<HTMLSelectElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const advanced = useRef(false);

  // Meta Pixel bootstrap. No-ops until a pixel id is configured.
  useEffect(() => {
    if (!TRACKING.fbPixelId || window.fbq) return;
    const n: any = (window.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(t);
    window.fbq("init", TRACKING.fbPixelId);
    window.fbq("track", "PageView");
  }, []);

  // Move focus to the first field of step 2 once the user advances.
  useEffect(() => {
    if (step === 2 && advanced.current) nameRef.current?.focus();
  }, [step]);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));
  };

  function goStep2() {
    const next: Errors = {};
    if (!values.employment) next.employment = "Please choose an option.";
    if (!values.funding) next.funding = "Please choose an option.";
    setErrors(next);
    if (next.employment) return employmentRef.current?.focus();
    if (next.funding) return fundingRef.current?.focus();
    advanced.current = true;
    setStep(2);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    // Honeypot — silently drop bot submissions.
    if (honeypot.current?.value) return;

    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (values.phone.replace(/\D/g, "").length < 8)
      next.phone = "Please enter a contact number we can reach you on.";
    if (!values.suburb.trim()) next.suburb = "Please enter your suburb.";
    if (!/^\d{4}$/.test(values.postcode.trim()))
      next.postcode = "Please enter a 4-digit postcode.";
    if (!values.timeline) next.timeline = "Please choose an option.";
    setErrors(next);
    if (next.name) return nameRef.current?.focus();
    if (next.email) return emailRef.current?.focus();
    if (next.phone) return phoneRef.current?.focus();
    if (next.suburb) return suburbRef.current?.focus();
    if (next.postcode) return postcodeRef.current?.focus();
    if (next.timeline) return timelineRef.current?.focus();

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      suburb: values.suburb.trim(),
      postcode: values.postcode.trim(),
      employment: values.employment,
      funding: values.funding,
      timeline: values.timeline,
      ...getTracking(),
    };

    setSubmitting(true);
    setFailed(false);
    try {
      if (TRACKING.formEndpoint) {
        const res = await fetch(TRACKING.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Lead POST failed: ${res.status}`);
      } else {
        // No endpoint configured yet — see TRACKING in app/data.ts
        console.log(
          "Lead captured (no endpoint configured):",
          JSON.stringify(payload, null, 2)
        );
        await new Promise((r) => setTimeout(r, 400));
      }
      try {
        window.fbq?.("track", "Lead", {
          location: BIZ.location,
          service: "Veneers",
        });
      } catch {}
      try {
        if (TRACKING.gadsSendTo)
          window.gtag?.("event", "conversion", {
            send_to: TRACKING.gadsSendTo,
          });
      } catch {}
      setDone(true);
    } catch (err) {
      console.error(err);
      setFailed(true);
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="form-card">
        <div className="form-success" role="status">
          <div className="ck">
            <Icon name="check" width={30} height={30} strokeWidth={2.4} />
          </div>
          <h2>{FORM.successHeading}</h2>
          <p>{FORM.successBody}</p>
          <a
            href={BIZ.phoneHref}
            className="btn btn--ghost fs-phone"
            onClick={reportPhoneClick}
          >
            <Icon name="phone" width={18} height={18} /> {BIZ.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div className="fc-head">
        <h2>{FORM.heading}</h2>
        <p>{FORM.sub}</p>
      </div>

      <div className="step-progress" aria-hidden="true">
        <span className="done" />
        <span className={step === 2 ? "done" : ""} />
      </div>

      {/* Errors are announced by moving focus to the offending field, which
          carries aria-describedby — no live region needed (and a live region
          on the form would re-announce the whole step on every change). */}
      <form onSubmit={onSubmit} noValidate>
        <span className="step-count">Step {step} of 2</span>

        <div className={`step${step === 1 ? " active" : ""}`}>
          <div className="field">
            <label htmlFor="employment">
              {FORM.employmentLabel} <span className="req">*</span>
            </label>
            <select
              id="employment"
              name="employment"
              ref={employmentRef}
              value={values.employment}
              onChange={set("employment")}
              aria-invalid={!!errors.employment}
              aria-describedby={errors.employment ? "err-employment" : undefined}
            >
              <option value="" disabled>
                Please select
              </option>
              {FORM.employmentOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {errors.employment && (
              <span className="field-error" id="err-employment">
                {errors.employment}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="funding">
              {FORM.fundingLabel} <span className="req">*</span>
            </label>
            <select
              id="funding"
              name="funding"
              ref={fundingRef}
              value={values.funding}
              onChange={set("funding")}
              aria-invalid={!!errors.funding}
              aria-describedby={errors.funding ? "err-funding" : undefined}
            >
              <option value="" disabled>
                Please select
              </option>
              {FORM.fundingOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {errors.funding && (
              <span className="field-error" id="err-funding">
                {errors.funding}
              </span>
            )}
          </div>

          <button type="button" className="btn btn--block" onClick={goStep2}>
            Continue <Icon name="arrow" width={18} height={18} />
          </button>
          <p className="form-foot">{FORM.step1Note}</p>
        </div>

        <div className={`step${step === 2 ? " active" : ""}`}>
          <div className="field">
            <label htmlFor="name">
              Full name <span className="req">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              ref={nameRef}
              value={values.name}
              onChange={set("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
            />
            {errors.name && (
              <span className="field-error" id="err-name">
                {errors.name}
              </span>
            )}
          </div>

          <div className="frow">
            <div className="field">
              <label htmlFor="email">
                Email <span className="req">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@email.com"
                ref={emailRef}
                value={values.email}
                onChange={set("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <span className="field-error" id="err-email">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="phone">
                Phone <span className="req">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="04xx xxx xxx"
                ref={phoneRef}
                value={values.phone}
                onChange={set("phone")}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
              />
              {errors.phone && (
                <span className="field-error" id="err-phone">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>

          <div className="frow">
            <div className="field">
              <label htmlFor="suburb">
                Suburb <span className="req">*</span>
              </label>
              <input
                type="text"
                id="suburb"
                name="suburb"
                autoComplete="address-level2"
                placeholder={BIZ.location}
                ref={suburbRef}
                value={values.suburb}
                onChange={set("suburb")}
                aria-invalid={!!errors.suburb}
                aria-describedby={errors.suburb ? "err-suburb" : undefined}
              />
              {errors.suburb && (
                <span className="field-error" id="err-suburb">
                  {errors.suburb}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="postcode">
                Postcode <span className="req">*</span>
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={4}
                placeholder={BIZ.postcode}
                ref={postcodeRef}
                value={values.postcode}
                onChange={set("postcode")}
                aria-invalid={!!errors.postcode}
                aria-describedby={errors.postcode ? "err-postcode" : undefined}
              />
              {errors.postcode && (
                <span className="field-error" id="err-postcode">
                  {errors.postcode}
                </span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="timeline">
              {FORM.timelineLabel} <span className="req">*</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              ref={timelineRef}
              value={values.timeline}
              onChange={set("timeline")}
              aria-invalid={!!errors.timeline}
              aria-describedby={errors.timeline ? "err-timeline" : undefined}
            >
              <option value="" disabled>
                Please select
              </option>
              {FORM.timelineOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {errors.timeline && (
              <span className="field-error" id="err-timeline">
                {errors.timeline}
              </span>
            )}
          </div>

          {/* Honeypot — hidden from users, catches bots */}
          <input
            type="text"
            name="company"
            ref={honeypot}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
          />

          <button type="submit" className="btn btn--block" disabled={submitting}>
            {submitting ? "Sending…" : FORM.submitLabel}
          </button>
          {failed && (
            <span className="field-error" style={{ textAlign: "center" }}>
              Something went wrong. Please call us on {BIZ.phone}.
            </span>
          )}
          <button
            type="button"
            className="step-back"
            onClick={() => setStep(1)}
          >
            ← Back
          </button>
          <p className="form-foot">{FORM.step2Note}</p>
        </div>
      </form>
    </div>
  );
}
