import type { MetadataRoute } from "next";
import { SITE_CONFIG, withSiteBasePath } from "@/lib/site-config";

/**
 * Web App Manifest — PWA installability.
 * Auto-served at /manifest.json when this file exists.
 *
 * Buyer customization: edit SITE_CONFIG in site-config.ts.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.name.split(" ")[0], // "MTVerse"
    description: SITE_CONFIG.description,
    start_url: SITE_CONFIG.basePath || "/",
    display: "standalone",
    orientation: "any",
    background_color: SITE_CONFIG.theme.background,
    theme_color: SITE_CONFIG.theme.brand,
    categories: ["business", "productivity", "developer"],
    lang: "en-US",
    dir: "ltr",
    icons: [
      { src: withSiteBasePath("/icon"), sizes: "32x32", type: "image/png" },
      { src: withSiteBasePath("/apple-icon"), sizes: "180x180", type: "image/png" },
      { src: withSiteBasePath("/favicon.ico"), sizes: "48x48", type: "image/x-icon" },
    ],
    shortcuts: [
      {
        name: "Commerce Revenue Studio",
        url: `${SITE_CONFIG.basePath || ""}/?section=dashboard&active=ecommerce`,
        description: "Open orders, checkout, revenue, and customers",
      },
      {
        name: "Audience Intelligence Lab",
        url: `${SITE_CONFIG.basePath || ""}/?section=dashboard&active=analytics`,
        description: "Open traffic, conversion, and behavior insights",
      },
      {
        name: "Forms & Inputs",
        url: `${SITE_CONFIG.basePath || ""}/?section=components&component=forms-inputs`,
        description: "Browse form input components",
      },
    ],
  };
}
