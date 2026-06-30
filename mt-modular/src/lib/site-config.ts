/**
 * MTVerse Dashboard — Site Configuration
 * =====================================
 *
 * Single source of truth for branding, navigation, and SEO metadata.
 * Buyers edit this ONE file to rebrand the entire template.
 *
 * Buyer Quickstart:
 *  1. Change `name` → your product name (auto-updates title, OG, manifest, JSON-LD).
 *  2. Change `url` → your production domain.
 *  3. Change `author` → your company info.
 *  4. Change `theme.brand` → your primary brand color (used in OG image, manifest).
 *  5. Edit `nav` arrays to customize the sidebar navigation.
 *
 * Everything else (favicon, OG image, sitemap, manifest, metadata) regenerates
 * automatically — no other files need editing.
 */

const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/templates/dash/mt-modular";

export const SITE_BASE_PATH = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://www.preview.mtverse.dev";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? `${SITE_ORIGIN}${SITE_BASE_PATH}`).replace(/\/$/, "");

export function withSiteBasePath(path: `/${string}`): string {
  return SITE_BASE_PATH ? `${SITE_BASE_PATH}${path}` : path;
}
export const SITE_CONFIG = {
  /** Product name — appears in titles, OG, manifest, JSON-LD. */
  name: "MTVerse Dashboard",

  /** Short tagline — appended to title in OG/Twitter cards. */
  tagline: "Premium SaaS UI Kit",

  /** One-sentence description for meta description + OG. */
  description:
    "A production-ready SaaS dashboard + UI library built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui. 60+ pages, 250+ components, dark mode, fully responsive.",

  /** Public base path for subdirectory deployment. */
  basePath: SITE_BASE_PATH,

  /** Public origin for this preview domain. */
  origin: SITE_ORIGIN,

  /** Production URL - used for metadataBase, sitemap, canonical URLs. */
  url: SITE_URL,

  /** Author / vendor info — used in metadata, JSON-LD, manifest. */
  author: {
    name: "MTVerse",
    url: "https://mtverse.dev",
    email: "hello@mtverse.dev",
    twitter: "@mtverse",
  },

  /** License — change to "Commercial" for paid tiers. */
  license: "MIT",

  /** Version — kept in sync with package.json. */
  version: "1.0.0",

  /** SEO keywords — used in metadata.keywords. */
  keywords: [
    "dashboard",
    "admin panel",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "UI kit",
    "SaaS template",
    "analytics dashboard",
    "ecommerce dashboard",
    "CRM dashboard",
    "dark mode",
    "responsive",
  ],

  /** Theme — used in manifest.json + OG image generation. */
  theme: {
    brand: "#465FFF",
    brandDark: "#3641F5",
    accent: "#7A5AF8",
    background: "#FFFFFF",
    backgroundDark: "#0C111D",
  },

  /** Social links — shown in footer + auth pages. */
  social: {
    twitter: "https://twitter.com/mtverse",
    github: "https://github.com/mtverse/dashboard",
    discord: "https://discord.gg/mtverse",
    website: "https://mtverse.dev",
  },

  /** Navigation — drives sidebar, sitemap, and command palette. */
  nav: {
    dashboards: [
      { key: "ecommerce", label: "Commerce Revenue Studio", description: "Orders, checkout, revenue, and customers" },
      { key: "analytics", label: "Audience Intelligence Lab", description: "Traffic, conversion, and behavior insights" },
      { key: "marketing", label: "Campaign Performance Hub", description: "Channels, spend, creative, and ROAS" },
      { key: "crm", label: "Relationship Pipeline Desk", description: "Accounts, leads, health, and renewals" },
      { key: "stocks", label: "Market Signals Terminal", description: "Portfolio, holdings, movers, and risk" },
      { key: "saas", label: "Subscription Growth Console", description: "MRR, churn, expansion, and lifecycle" },
      { key: "logistics", label: "Fleet Operations Tower", description: "Shipments, routes, carriers, and SLA" },
      { key: "ai", label: "AI Operations Workspace", description: "Models, prompts, tokens, agents, and spend", badge: "NEW" },
      { key: "sales", label: "Revenue Pipeline Command", description: "Deals, quota, forecast, and reps" },
      { key: "finance", label: "Cashflow Control Center", description: "P&L, budgets, cards, invoices, and cash", badge: "NEW" },
    ],
    components: [
      { key: "ui-elements", label: "UI Elements" },
      { key: "forms", label: "Forms" },
      { key: "tables", label: "Tables" },
      { key: "charts", label: "Charts" },
      { key: "maps", label: "Maps", badge: "NEW" },
      { key: "chat", label: "Chat", badge: "NEW" },
      { key: "file-manager", label: "File Manager", badge: "NEW" },
      { key: "advanced-ui", label: "Advanced UI", badge: "NEW" },
      { key: "extended-ui", label: "Extended UI" },
      { key: "forms-inputs", label: "Forms & Inputs" },
      { key: "navigation-menus", label: "Navigation & Menus" },
      { key: "feedback-status", label: "Feedback & Status" },
      { key: "data-display", label: "Data Display" },
      { key: "date-search", label: "Date & Search" },
      { key: "media-content", label: "Media & Content" },
      { key: "communication", label: "Communication" },
      { key: "overlay-interactive", label: "Overlay & Interactive" },
      { key: "utility-customization", label: "Utility & Customization" },
      { key: "interactive-utilities", label: "Interactive Utilities" },
    ],
    ecommerce: [
      { key: "products", label: "Products", badge: "NEW" },
      { key: "product-detail", label: "Product Detail", badge: "NEW" },
      { key: "product-cards", label: "Product Cards" },
      { key: "add-product", label: "Add Product" },
      { key: "billing", label: "Billing" },
      { key: "invoices", label: "Invoices" },
      { key: "single-invoice", label: "Single Invoice" },
      { key: "create-invoice", label: "Create Invoice" },
      { key: "transactions", label: "Transactions" },
      { key: "single-transaction", label: "Single Transaction" },
    ],
    ai: [
      { key: "chat", label: "Chat" },
      { key: "workspace", label: "Workspace" },
      { key: "image-generator", label: "Image Generator", badge: "NEW" },
      { key: "code-generator", label: "Code Generator", badge: "NEW" },
      { key: "video-generator", label: "Video Generator", badge: "NEW" },
      { key: "settings", label: "Settings" },
      { key: "api-usage", label: "API Usage" },
    ],
    pages: [
      { key: "profile", label: "Profile" },
      { key: "settings", label: "Settings" },
      { key: "pricing", label: "Pricing" },
      { key: "faq", label: "FAQ" },
      { key: "api-keys", label: "API Keys" },
      { key: "integrations", label: "Integrations" },
      { key: "activity-log", label: "Activity Log" },
      { key: "notifications", label: "Notifications" },
      { key: "team", label: "Team" },
      { key: "success", label: "Success" },
      { key: "blank", label: "Blank" },
      { key: "404", label: "Error 404" },
      { key: "500", label: "Error 500" },
      { key: "503", label: "Error 503" },
      { key: "coming-soon", label: "Coming Soon" },
      { key: "maintenance", label: "Maintenance" },
    ],
    auth: [
      { key: "sign-in", label: "Sign In" },
      { key: "sign-up", label: "Sign Up" },
      { key: "forgot-password", label: "Forgot Password" },
      { key: "reset-password", label: "Reset Password" },
      { key: "verify-email", label: "Verify Email" },
      { key: "two-factor", label: "Two Factor" },
      { key: "otp", label: "OTP" },
      { key: "welcome", label: "Welcome" },
      { key: "sessions", label: "Active Sessions" },
    ],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
export type NavItem = {
  key: string;
  label: string;
  description?: string;
  badge?: string;
};

/**
 * Flatten all nav items into a single array — used for sitemap generation
 * and the command palette global search.
 */
export function getAllNavItems(): NavItem[] {
  return [
    ...SITE_CONFIG.nav.dashboards.map((item) => ({ ...item, _section: "dashboard" })),
    ...SITE_CONFIG.nav.components.map((item) => ({ ...item, _section: "components" })),
    ...SITE_CONFIG.nav.ecommerce.map((item) => ({ ...item, _section: "ecommerce" })),
    ...SITE_CONFIG.nav.ai.map((item) => ({ ...item, _section: "ai" })),
    ...SITE_CONFIG.nav.pages.map((item) => ({ ...item, _section: "pages" })),
    ...SITE_CONFIG.nav.auth.map((item) => ({ ...item, _section: "auth" })),
  ];
}
