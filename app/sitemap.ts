import type { MetadataRoute } from "next";

// Keep this URL in sync with CANONICAL in app/layout.tsx.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.sparklingwhitedental.com.au/west-end-veneers/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
