import type { MetadataRoute } from "next";
import { SITE_CONFIG, getAllNavItems } from "@/lib/site-config";

/**
 * sitemap.xml — auto-served at /sitemap.xml.
 *
 * Generates URLs for every dashboard, component, ecommerce, ai, page, and auth
 * route from the central SITE_CONFIG.nav. Since the app currently uses a
 * Zustand single-page router with query-string navigation, each entry uses
 * the `?section=X&active=Y` pattern. When migrated to real Next.js routes,
 * swap the URL builder below — sitemap will auto-update.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Home page
  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // All nav items → query-string URLs
  for (const item of getAllNavItems()) {
    const section = (item as NavItemWithSection)._section;
    let params: string;
    if (section === "dashboard") params = `section=dashboard&active=${item.key}`;
    else if (section === "components") params = `section=components&component=${item.key}`;
    else if (section === "ecommerce") params = `section=ecommerce&ecommerce=${item.key}`;
    else if (section === "ai") params = `section=ai-assistant&aiAssistant=${item.key}`;
    else if (section === "pages") params = `section=pages&pages=${item.key}`;
    else if (section === "auth") params = `section=auth&auth=${item.key}`;
    else continue;

    entries.push({
      url: `${baseUrl}/?${params}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: section === "dashboard" ? 0.9 : section === "components" ? 0.7 : 0.6,
    });
  }

  return entries;
}

type NavItemWithSection = {
  _section: string;
  key: string;
  label: string;
  description?: string;
  badge?: string;
};
