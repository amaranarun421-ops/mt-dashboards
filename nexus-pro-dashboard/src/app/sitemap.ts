import type { MetadataRoute } from "next";
import { routes } from "@/lib/route-map";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nexuspro.dashboard";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/features`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/pages-preview`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/components-preview`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/pricing-license`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/docs`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/changelog`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = routes
    .filter((r) => !r.path.includes("[") && !r.standalone)
    .map((r) => ({
      url: `${baseUrl}${r.path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...dynamicRoutes];
}
