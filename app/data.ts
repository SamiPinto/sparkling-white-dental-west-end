// Central data for the West End VENEERS landing page (content brief v2).
// Copy is taken verbatim from the client-supplied brief.

export const BIZ = {
  name: "Sparkling White Dental",
  location: "West End",
  city: "Brisbane",
  phone: "(07) 3844 2125",
  phoneHref: "tel:+61738442125",
  address: "Shop 1/158 Boundary St, West End QLD 4101",
  logo: "/images/logo.webp",
};

// ---------------------------------------------------------------
// TRACKING / FORM CONFIG — the only place to wire these up.
//   fbPixelId  : Meta Pixel ID. Fires PageView + Lead on submit.
//   gadsSendTo : Google Ads conversion id, e.g. "AW-XXXX/abcd".
//   formEndpoint: where the lead is POSTed. Empty = console log only.
// The pixel ids stay empty until the client supplies them. The endpoint is
// our own route — it sends the instant SMS; see app/api/lead/route.ts for the
// env vars it needs.
// ---------------------------------------------------------------
export const TRACKING = {
  fbPixelId: "",
  gadsSendTo: "",
  formEndpoint: "/api/lead",
};

export const HERO = {
  eyebrow: "Porcelain Veneers · West End",
  headline: "Love the Smile You See in the",
  headlineAccent: "Mirror",
  hook: "Do you hide your smile?",
  lede: "Chips, gaps, staining — whatever's holding your smile back, custom porcelain veneers can fix it. Real results, gentle care, and a team that aims to answer all your questions in your free consultation.",
  // Hero image — sits between the headline and the hook line.
  // 16:9; supply replacements at 1600 × 900. Null renders a sized placeholder.
  photo: "/images/hero-mirror.webp" as string | null,
  photoAlt:
    "Woman smiling at her reflection in a bathroom mirror",
  trust: [
    { icon: "award", text: "30+ years experience" },
    { icon: "card", text: "Payment plans available" },
    { icon: "check", text: "Free initial consultation" },
  ],
};

// Each qualifier now carries a photo of the condition alongside the icon.
// `photo` stays null until the stock image lands in /public/images; the card
// falls back to the icon tile so the section never renders broken.
export const QUALIFY = {
  eyebrow: "Is this you?",
  heading: "Veneers might be right for you if...",
  items: [
    {
      icon: "tooth-chip",
      title: "Chipped or worn teeth",
      body: "Fix damage from wear, injury, or grinding without invasive treatment.",
      photo: "/images/qual-chipped.webp",
      photoAlt: "Close-up of a chipped and worn upper front tooth",
    },
    {
      icon: "tooth-stain",
      title: "Stains that won't budge",
      body: "Discolouration from coffee, wine, or medication that whitening can't fix.",
      photo: "/images/qual-stains.webp",
      photoAlt: "Smile showing heavily stained and discoloured teeth",
    },
    {
      icon: "tooth-gap",
      title: "Gaps or uneven teeth",
      body: "Close small gaps and even out your smile without full orthodontics.",
      photo: "/images/qual-gaps.webp",
      photoAlt: "Smile showing a gap between the two upper front teeth",
    },
  ] as {
    icon: string;
    title: string;
    body: string;
    photo: string | null;
    photoAlt: string;
  }[],
};

// Before/after gallery — one entry per patient, rendered as a drag-to-reveal
// slider (components/BeforeAfterSlider.tsx).
//
// To add a patient: crop both shots to 3:4 with the face at the same scale and
// height, drop them in /public/images, and add an entry. The wipe only reads as
// one transformation when the pair is framed alike — same camera distance and
// background — so match the crops carefully. An entry missing either path is
// skipped, not placeholdered.
export const GALLERY = {
  eyebrow: "Real Results",
  heading: "Smiles we've transformed",
  sub: "Drag the slider on any photo to see the transformation. More available in consultation.",
  ctaLabel: "See What Veneers Could Do For You",
  disclaimer:
    "Real patient results at Sparkling White Dental. Individual results vary. Photos shown with patient consent.",
  items: [
    {
      label: "Patient 1",
      before: "/images/ba-1-before.webp",
      after: "/images/ba-1-after.webp",
    },
    {
      label: "Patient 2",
      before: "/images/ba-2-before.webp",
      after: "/images/ba-2-after.webp",
    },
    {
      label: "Patient 3",
      before: "/images/ba-3-before.webp",
      after: "/images/ba-3-after.webp",
    },
  ] as { label: string; before: string | null; after: string | null }[],
};

export const STEPS = {
  eyebrow: "How It Works",
  heading: "Your journey to a new smile",
  items: [
    {
      title: "Free Consultation",
      body: "Meet Dr Bik, discuss your goals, and get an honest assessment — no pressure, no obligation.",
    },
    {
      title: "Custom Design",
      body: "Your veneers are designed and crafted to match your natural teeth and facial features.",
    },
    {
      title: "Reveal Your Smile",
      body: "Fitted in-clinic with ongoing care and support for years to come.",
    },
  ],
};

export const DOCTOR = {
  heading: "Meet Dr Bikramjit",
  body: "With more than 30 years of experience, Dr Bikramjit and the team at Sparkling White Dental West End are known for gentle, unhurried care. We listen first, aim to answer all your questions in your free, person-to-person consultation, and only ever recommend what you actually need.",
  photo: "/images/dr-bik.webp",
  capName: "Dr Bikramjit",
  capRole: "Principal Dentist · West End clinic",
  statBig: "30+",
  statSmall: "Years of experience",
};

export const FAQS = {
  eyebrow: "Good Questions",
  heading: "You might be wondering",
  items: [
    {
      q: "How long do veneers last?",
      a: "With good care, porcelain veneers typically last 10-15 years or longer. We'll walk you through maintenance at your consultation.",
    },
    {
      q: "Does getting veneers hurt?",
      a: "Most patients feel little to no discomfort. We use gentle techniques and local anaesthetic where needed to keep you comfortable throughout.",
    },
    {
      q: "How much do veneers cost?",
      a: "Cost depends on how many teeth and the material chosen. We offer interest-free payment plans, Afterpay, and health fund options — book a free consultation for an exact quote.",
    },
    {
      q: "Am I a good candidate for veneers?",
      a: "Most people with chips, staining, gaps, or uneven teeth are great candidates. The best way to know for sure is a free consultation with Dr Bik.",
    },
    {
      q: "How soon can I get an appointment?",
      a: "Leave your details below with your preferred date, and our West End team will call you back the same day to confirm.",
    },
  ],
};

export const FORM = {
  heading: "Book Your Free Veneers Consultation",
  sub: "Tell us a little about you and your preferred appointment time — our West End team will call to confirm.",
  step1Note: "No obligation. This just helps us prepare for your call.",
  step2Note: "No obligation. We never share your details.",
  submitLabel: "Book My Free Consultation",
  successHeading: "Thank you",
  successBody:
    "Your request is in. We'll call you back today to confirm your consultation.",
  employmentLabel: "Are you currently",
  employmentOptions: [
    "Full-time",
    "Part-time",
    "Casual",
    "Self-employed",
    "Retired",
    "Other",
  ],
  fundingLabel: "How would you like to fund your treatment?",
  fundingOptions: [
    "I have private health insurance",
    "I'd like a payment plan (Afterpay / Denticare)",
    "I can pay upfront",
    "Not sure yet — I'd like to discuss options",
  ],
  apptTimeOptions: [
    "Morning (9am-12pm)",
    "Afternoon (12pm-3pm)",
    "Late afternoon (3pm-6pm)",
  ],
};

export const CTA = {
  heading: "Your new smile is",
  headingAccent: "one call away",
  body: "Free consultation. No obligation. No pressure — just an honest conversation about what's possible for your smile.",
  button: "Book My Free Consultation",
};
