import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * robots.txt — auto-served at /robots.txt.
 * Allows all crawlers, points to sitemap.xml.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: SITE_CONFIG.basePath || "/",
        disallow: [
          `${SITE_CONFIG.basePath}/api/`,
          `${SITE_CONFIG.basePath}/_next/`,
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.origin,
  };
}
