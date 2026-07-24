import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.sparklingwhitedental.com.au/locations/west-ends-local-dentists/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
