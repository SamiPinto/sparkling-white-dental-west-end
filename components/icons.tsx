import type { SVGProps } from "react";

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Shared molar silhouette used as the base for the dental service icons.
const TOOTH =
  "M12 3c2 0 3-1 5-1 2.2 0 3.5 1.8 3.5 4.5 0 2-.6 3.4-1.2 5.4C18.5 14 18 17 17.3 19c-.5 1.4-1 2-1.8 2s-1.2-.9-1.5-2.4S13.2 15 12 15s-1.2 2.1-1.5 3.6S9.5 21 8.7 21s-1.3-.6-1.8-2c-.7-2-1.4-5.1-2-7.1C4.1 9.9 3.5 8.5 3.5 6.5 3.5 3.8 4.8 2 7 2c2 0 3 1 5 1z";

export function Icon({ name, ...p }: { name: string } & SVGProps<SVGSVGElement>) {
  const paths: Record<string, React.ReactNode> = {
    // ---- Dental service icons (tooth-based, one per service) ----
    "svc-general": (
      <>
        <path d={TOOTH} />
        <path d="M9.3 9.9l1.9 1.9 3.5-3.6" />
      </>
    ),
    "svc-ortho": (
      <>
        <rect x="3.2" y="6.6" width="3.4" height="7.6" rx="1.3" />
        <rect x="7.9" y="6.6" width="3.4" height="7.6" rx="1.3" />
        <rect x="12.6" y="6.6" width="3.4" height="7.6" rx="1.3" />
        <rect x="17.3" y="6.6" width="3.4" height="7.6" rx="1.3" />
        <path d="M2.3 10.2h19.4" />
        <circle cx="4.9" cy="10.2" r="0.95" fill="currentColor" stroke="none" />
        <circle cx="9.6" cy="10.2" r="0.95" fill="currentColor" stroke="none" />
        <circle cx="14.3" cy="10.2" r="0.95" fill="currentColor" stroke="none" />
        <circle cx="19" cy="10.2" r="0.95" fill="currentColor" stroke="none" />
      </>
    ),
    "svc-cosmetic": (
      <>
        <path d={TOOTH} />
        <path
          d="M18 2.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z"
          fill="currentColor"
          stroke="none"
        />
        <path d="M9.6 10.3c1.5-.3 2.4-1.2 2.7-2.7.3 1.5 1.2 2.4 2.7 2.7-1.5.3-2.4 1.2-2.7 2.7-.3-1.5-1.2-2.4-2.7-2.7z" />
      </>
    ),
    "svc-implant": (
      <>
        <path d="M8.4 3.6c1-.5 2.1-.8 3.6-.8s2.6.3 3.6.8c.7.4.9 1.2.5 1.9l-1 1.9H8.9l-1-1.9c-.4-.7-.2-1.5.5-1.9z" />
        <path d="M9.4 9.2h5.2M9.8 11.4h4.4M10.4 13.6h3.2M11 15.8h2" />
        <path d="M11.4 18l.6 1.6.6-1.6" />
      </>
    ),
    "svc-emergency": (
      <>
        <path d={TOOTH} />
        <path d="M12 8.3v4.4M9.8 10.5h4.4" strokeWidth={2} />
      </>
    ),
    "svc-children": (
      <>
        <path d={TOOTH} />
        <circle cx="9.7" cy="9.6" r="0.7" fill="currentColor" stroke="none" />
        <circle cx="14.3" cy="9.6" r="0.7" fill="currentColor" stroke="none" />
        <path d="M9.8 11.8c.6 1.1 3.8 1.1 4.4 0" />
      </>
    ),
    "svc-perio": (
      <>
        <path d={TOOTH} />
        <path
          d="M12 13.6c-1.2-1-2.6-1.9-2.6-3.3 0-.9.7-1.5 1.5-1.5.6 0 1 .3 1.1.7.1-.4.5-.7 1.1-.7.8 0 1.5.6 1.5 1.5 0 1.4-1.4 2.3-2.6 3.3z"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),
    "svc-surgery": (
      <>
        <path d={TOOTH} />
        <path d="M18.5 9.5V4M16 6.5 18.5 4l2.5 2.5" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    align: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
        <rect x="7" y="4" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
        <rect x="13" y="10" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
        <rect x="9" y="16" width="4" height="4" rx="1" fill="currentColor" stroke="none" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
        <path d="M12 8c.7 2.3 1.7 3.3 4 4-2.3.7-3.3 1.7-4 4-.7-2.3-1.7-3.3-4-4 2.3-.7 3.3-1.7 4-4z" />
      </>
    ),
    implant: (
      <>
        <path d="M12 2c2.5 0 4 2 4 4.5 0 1.5-.5 2.5-1 4s-.8 3-1 5c-.2 1.5-.4 3-2 3s-1.8-1.5-2-3c-.2-2-.5-3.5-1-5s-1-2.5-1-4C7 4 9.5 2 12 2z" />
        <path d="M9.5 8.5c1.5-1 3.5-1 5 0" />
      </>
    ),
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none" />,
    child: (
      <>
        <circle cx="12" cy="7" r="3.2" />
        <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M9.5 6.5c1.5 1 3.5 1 5 0" />
      </>
    ),
    gum: (
      <>
        <path d="M4 9c0-3 3-5 8-5s8 2 8 5c0 2-1 3-1.5 5S18 18 17 19s-1.5-1-2.5-1-1.5 1.5-2.5 1.5S10 19 9 19s-1.5 1-2.5 0S6 16 5.5 14 4 11 4 9z" />
      </>
    ),
    tooth: (
      <path d="M12 3c2 0 3-1 5-1 2.2 0 3.5 1.8 3.5 4.5 0 2-.6 3.4-1.2 5.4S18 17 17.3 19c-.5 1.4-1 2-1.8 2s-1.2-.9-1.5-2.4S13.2 15 12 15s-1.2 2.1-1.5 3.6S9.5 21 8.7 21s-1.3-.6-1.8-2c-.7-2-1.4-5.1-2-7.1S3.5 8.5 3.5 6.5C3.5 3.8 4.8 2 7 2c2 0 3 1 5 1z" />
    ),
    // ---- "Is this you?" qualifiers ----
    // Chipped / worn: molar with a wedge missing from the crown edge.
    "tooth-chip": (
      <>
        <path d={TOOTH} />
        <path d="M14.4 2.7 12.6 6.3l3.5.5-2.1 3.1" />
      </>
    ),
    // Stains: molar with discolouration specks on the crown.
    "tooth-stain": (
      <>
        <path d={TOOTH} />
        <circle cx="9.5" cy="7.6" r="1.15" fill="currentColor" stroke="none" />
        <circle cx="13.4" cy="6.4" r="0.8" fill="currentColor" stroke="none" />
        <circle cx="12.4" cy="10.4" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    // Gaps / uneven: three teeth of differing heights, one set wide apart.
    "tooth-gap": (
      <>
        <path d="M3.4 8.4c0-1 .8-1.7 1.9-1.7s1.9.8 1.9 1.7v6.1c0 1.4-.8 2.4-1.9 2.4s-1.9-1-1.9-2.4z" />
        <path d="M9.2 7.3c0-1 .8-1.8 1.9-1.8s1.9.8 1.9 1.8v7.2c0 1.4-.8 2.4-1.9 2.4s-1.9-1-1.9-2.4z" />
        <path d="M16.8 9.3c0-1 .8-1.7 1.9-1.7s1.9.8 1.9 1.7v5.2c0 1.4-.8 2.4-1.9 2.4s-1.9-1-1.9-2.4z" />
        <path d="M14.1 19.6h6.5M14.1 19.6l1.5-1.4M14.1 19.6l1.5 1.4" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    check: <path d="m5 12 5 5 9-11" />,
    card: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" />
        <path d="M2.5 10h19" />
        <path d="M6 14.5h4" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8.6" r="5.6" />
        <path d="m8.9 13.3-1.5 7.2 4.6-2.4 4.6 2.4-1.5-7.2" />
        <path
          d="m12 5.8.9 1.9 2 .3-1.45 1.4.35 2L12 10.4l-1.8.95.35-2L9.1 8l2-.3z"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),
    star: (
      <path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.8 5.4 21l1.4-7L1.6 9.3l7-.8L12 2z" fill="currentColor" stroke="none" />
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
    heart: (
      <path d="M12 20s-7-4.3-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.7 12 20 12 20z" />
    ),
  };

  return (
    <svg {...base} aria-hidden="true" {...p}>
      {paths[name] ?? paths.check}
    </svg>
  );
}
