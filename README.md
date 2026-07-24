# Sparkling White Dental — West End Landing Page

A high-conversion landing page for the **West End, Brisbane** practice, built with **Next.js 14 (App Router) + React 18 + TypeScript**. Brand colours and fonts are pulled directly from the live sparklingwhitedental.com.au site.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
# production:
npm run build && npm run start
```

## Brand system (from the live site)

| Token | Value | Use |
|-------|-------|-----|
| Primary | `#0082B3` | Buttons, links, accents |
| Deep | `#0170A0` | Hover / gradients |
| Fonts | **Playfair Display** + **Questrial** | Headings / body |

Buttons use the site's pill shape (~28–30px radius).

## Conversion features

- Sticky header with click-to-call + Book Online, always visible
- **Sticky mobile Call / Book bar** pinned to the bottom of the screen
- Hero with **real photo of Dr. Bik**, trust badge (45 years), star rating, dual CTA
- **Doctify "Recommended by patients" badge** in the trust strip
- 8-service grid, **real team photo** in the About section, stats band
- **Video tour** (the practice's Vimeo film) embedded in a framed player
- Payment-plans with **real provider logos** (DentiCare, Afterpay, Humm, Medicare/CDBS)
- Emergency call-out, **live Doctify verified-reviews carousel** (4.98★), live map, FAQ accordion, final CTA
- Full SEO metadata + Open Graph, `en-AU`, statically prerendered
- Accessible: reduced-motion support, semantic landmarks, keyboard-friendly

## Media (fetched from the live site → `public/images/`)

| File | What it is | Where used |
|------|-----------|-----------|
| `west-end-clinic.webp` | Dr. Bik in the surgery | Hero |
| `dentist-west-end.jpg` | Full West End team (compressed 34 MB → ~0.3 MB) | About |
| `doctify-badge.png` | Doctify recommendation badge | Trust strip |
| `logo.webp` | Practice logo (now served locally) | Header / footer |
| `pay-*.png/webp` | DentiCare, Afterpay, Humm, Medicare | Payments |
| Vimeo `988732252` | "West End – Sparkling White Dental" tour | Video section |

## SEO (built in)

- Title, meta description, keywords, `lang="en-AU"`, theme-color, favicon + apple-touch-icon
- **Canonical** URL, **Open Graph** + **Twitter** card (with a properly-sized 1024×683 image)
- **JSON-LD `Dentist` structured data** — name, address, geo, phone, services, `sameAs` socials, and the 4.98★ / 10-review `aggregateRating` (from Doctify)
- **`/sitemap.xml`** and **`/robots.txt`** auto-generated (`app/sitemap.ts`, `app/robots.ts`)
- One `<h1>`, clean H2/H3 hierarchy, descriptive `alt` on every image, lazy-loaded media
- Statically prerendered · ESLint clean · production build passes · no runtime console errors

## Deploy (make it live)

Fully production-ready. The uses `next/image` optimisation + external iframes, so deploy to a Node host (not static export):

```bash
# Recommended: Vercel
npx vercel            # preview
npx vercel --prod     # live
```

Or any Node host: `npm run build && npm run start` behind your domain.

**On deploy, if the final URL is NOT `sparklingwhitedental.com.au/locations/west-ends-local-dentists/`**, update the canonical/sitemap/OG base in `app/layout.tsx` (`CANONICAL`, `metadataBase`), `app/sitemap.ts`, and `app/robots.ts`.

## ⚠️ Confirm before go-live (edit `app/data.ts`)

1. **Opening hours** — *unverified placeholder* (not published on their site). Confirm real hours. Deliberately kept out of the structured data until confirmed; the page shows a "call to confirm" note.
6. **New-patient offer** — the hero shows a truthful "New patients welcome" callout (`OFFER` in `app/data.ts`). Swap `headline` for a real promo (e.g. "$149 New Patient Exam, X-rays & Clean") when you have one.
2. **Testimonials** — live **Doctify** widget, auto-updates. No action needed. (Needs internet to load — won't show offline.)
3. **Instagram URL** — `instagram.com/sparklingwhitedental` (matches their site); confirm it's the West End handle vs `sparklingwhitedentalbrisbane`.
4. **Booking URL** — live Centaur/D4W portal (`centaurportal.com/d4w/org-1576/search`). Verify for West End.
5. **Images/logo** — downloaded into `public/images/`, served locally. No action needed.

All editable content lives in **`app/data.ts`**. Styling is in **`app/globals.css`**.
