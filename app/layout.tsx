import type { Metadata, Viewport } from "next";
import { Playfair_Display, Questrial } from "next/font/google";
import { BIZ, SERVICES } from "./data";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
  display: "swap",
});

// Canonical page for the West End practice. Update if this deploys elsewhere.
const CANONICAL =
  "https://www.sparklingwhitedental.com.au/locations/west-ends-local-dentists/";
const OG_IMAGE =
  "https://www.sparklingwhitedental.com.au/wp-content/uploads/2025/07/Dentist-West-End-1024x683.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sparklingwhitedental.com.au"),
  title: "West End Dentist Brisbane | Sparkling White Dental",
  description:
    "Trusted family dentist in West End, Brisbane for 45 years. General, cosmetic & emergency dentistry, implants & orthodontics. Interest-free payment plans.",
  keywords: [
    "dentist West End",
    "West End dentist Brisbane",
    "emergency dentist West End",
    "family dentist Brisbane",
    "dental implants West End",
    "teeth whitening Brisbane",
    "children's dentist West End",
    "dentist near Brisbane CBD",
  ],
  authors: [{ name: "Sparkling White Dental" }],
  creator: "Sparkling White Dental",
  publisher: "Sparkling White Dental",
  category: "Dentist",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "West End's Local Dentists | Sparkling White Dental",
    description:
      "45 years serving West End, Brisbane. Comprehensive, gentle dental care under one roof. Interest-free payment plans available.",
    url: CANONICAL,
    siteName: "Sparkling White Dental",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: OG_IMAGE,
        width: 1024,
        height: 683,
        alt: "The Sparkling White Dental team at the West End clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "West End's Local Dentists | Sparkling White Dental",
    description:
      "Your trusted family dentist in West End, Brisbane for 45 years. Book online or call (07) 3844 2125.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0082b3",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${CANONICAL}#dentist`,
  name: "Sparkling White Dental — West End",
  alternateName: "West End's Local Dentists",
  description:
    "Trusted family dentist in West End, Brisbane for 45 years. General, cosmetic and emergency dentistry, implants, orthodontics and children's dentistry, led by Dr. Bik.",
  url: CANONICAL,
  telephone: "+61738442125",
  image: OG_IMAGE,
  logo: "https://www.sparklingwhitedental.com.au/wp-content/uploads/2024/05/Logo-1.webp",
  priceRange: "$$",
  currenciesAccepted: "AUD",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop 1/158 Boundary St",
    addressLocality: "West End",
    addressRegion: "QLD",
    postalCode: "4101",
    addressCountry: "AU",
  },
  geo: { "@type": "GeoCoordinates", latitude: -27.4816, longitude: 153.011 },
  areaServed: [
    { "@type": "Place", name: "West End, Brisbane" },
    { "@type": "Place", name: "South Brisbane" },
    { "@type": "Place", name: "Brisbane CBD" },
  ],
  sameAs: [BIZ.facebook, BIZ.instagram],
  medicalSpecialty: "Dentistry",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.98",
    reviewCount: "10",
    bestRating: "5",
    worstRating: "1",
  },
  availableService: SERVICES.map((s) => ({
    "@type": "MedicalProcedure",
    name: s.name,
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${playfair.variable} ${questrial.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
