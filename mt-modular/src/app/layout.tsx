import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/dashboard/theme-provider";
import { SITE_CONFIG, withSiteBasePath } from "@/lib/site-config";

/**
 * TailAdmin-aligned typography: single font family (Outfit) for everything,
 * JetBrains Mono only for code blocks. No Inter — keeps the page light and
 * makes the typographic voice consistent across body, headings, and UI.
 *
 * `preload: true` + `display: swap` ensures text is visible during font load
 * (no invisible text, good CLS / LCP).
 */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // mono only used in code blocks — not critical for LCP
});

/**
 * Viewport — separates from metadata per Next 16+ convention.
 * `themeColor` array covers light + dark schemes (browser UI adapts).
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c111d" },
  ],
  colorScheme: "light dark",
};

/**
 * Root metadata — inherited by all routes unless overridden.
 * Per-page `generateMetadata` in route files can override any field.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.origin),

  // Title template — every page becomes "Page Title — MTVerse Dashboard"
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },

  description: SITE_CONFIG.description,

  applicationName: SITE_CONFIG.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.author.url }],
  creator: SITE_CONFIG.author.name,
  publisher: SITE_CONFIG.author.name,

  // SEO indexing — full indexing for the public demo.
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Open Graph — social sharing on Facebook, LinkedIn, Slack, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: withSiteBasePath("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [withSiteBasePath("/opengraph-image")],
    creator: "@mtverse",
  },

  // Icons — Next 16 auto-detects app/icon.tsx + app/apple-icon.tsx.
  // Fallbacks below cover legacy crawlers + pinned tabs.
  icons: {
    icon: [
      { url: withSiteBasePath("/icon"), type: "image/svg+xml" },
      { url: withSiteBasePath("/favicon.ico"), sizes: "any" },
    ],
    apple: [{ url: withSiteBasePath("/apple-icon"), sizes: "180x180" }],
    shortcut: [withSiteBasePath("/favicon.ico")],
  },

  // Manifest — PWA installability.
  manifest: withSiteBasePath("/manifest.json"),

  // Format detection — prevent iOS from auto-linking phone numbers/dates.
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  // Alternates — for multi-language support (add more if needed).
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      "en-US": SITE_CONFIG.url,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
         * No-flash theme script — runs before React hydration to prevent
         * a flash of incorrect theme. Reads from localStorage first, falls
         * back to OS preference. Wrapped in try/catch for private-mode Safari.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('mtverse-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {/*
         * JSON-LD structured data — helps Google understand this is a
         * SoftwareApplication. Rich snippets in search results.
         */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: SITE_CONFIG.name,
              description: SITE_CONFIG.description,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "99.00",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: SITE_CONFIG.author.name,
                url: SITE_CONFIG.author.url,
              },
            }),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
