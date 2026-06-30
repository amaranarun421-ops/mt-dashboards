import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import { BRAND } from "@/lib/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Multilingual keywords covering all major global languages so search engines
 * can index MTVerse across regions. Each language block includes the most
 * common search terms users would type when looking for a premium dashboard kit.
 */
const KEYWORDS = [
  // English
  "MTVerse", "dashboard kit", "admin template", "enterprise dashboard",
  "Next.js dashboard", "Tailwind CSS dashboard", "SaaS dashboard",
  "premium UI kit", "analytics dashboard", "ecommerce dashboard",
  "CRM dashboard", "finance dashboard", "admin panel", "control panel",
  "management system", "back office", "business intelligence", "BI dashboard",
  "React dashboard", "TypeScript dashboard", "shadcn ui dashboard",

  // Spanish (Español)
  "panel de control", "tablero empresarial", "plantilla administrativa",
  "sistema de gestión", "panel de administración", "dashboard premium",
  "interfaz de administración", "panel SaaS",

  // French (Français)
  "tableau de bord", "panneau d'administration", "modèle d'administration",
  "système de gestion", "interface d'administration", "tableau de bord SaaS",
  "kit d'interface", "panneau de contrôle",

  // German (Deutsch)
  "Dashboard-Vorlage", "Administrationspanel", "Verwaltungssystem",
  "Bedienfeld", "Unternehmens-Dashboard", "SaaS-Dashboard",
  "Premium-UI-Kit", "Kontrollpanel",

  // Portuguese (Português)
  "painel de controle", "painel administrativo", "modelo de administração",
  "sistema de gestão", "dashboard empresarial", "painel SaaS",
  "kit de interface premium",

  // Italian (Italiano)
  "pannello di controllo", "dashboard aziendale", "modello amministrativo",
  "sistema di gestione", "interfaccia di amministrazione", "dashboard SaaS",

  // Dutch (Nederlands)
  "dashboard sjabloon", "beheerder paneel", "beheersysteem",
  "bedrijfsdashboard", "SaaS dashboard",

  // Russian (Русский)
  "панель управления", "административная панель", "шаблон администратора",
  "система управления", "корпоративная панель", "SaaS панель",

  // Chinese (中文)
  "管理面板", "仪表板", "企业仪表板", "后台管理系统",
  "SaaS 仪表板", "管理界面", "控制台",

  // Japanese (日本語)
  "管理パネル", "ダッシュボード", "企業ダッシュボード",
  "管理システム", "SaaS ダッシュボード",

  // Korean (한국어)
  "관리 패널", "대시보드", "기업 대시보드", "관리 시스템",
  "SaaS 대시보드",

  // Arabic (العربية)
  "لوحة التحكم", "لوحة تحكم المؤسسة", "نظام إدارة",
  "لوحة SaaS", "واجهة الإدارة",

  // Hindi (हिन्दी)
  "डैशबोर्ड", "प्रशासन पैनल", "प्रबंधन प्रणाली", "एंटरप्राइज डैशबोर्ड",

  // Turkish (Türkçe)
  "kontrol paneli", "yönetim paneli", "kurumsal gösterge paneli",
  "SaaS paneli",

  // Polish (Polski)
  "panel sterowania", "panel administracyjny", "system zarządzania",
  "pulpit firmowy",

  // Swedish (Svenska)
  "instrumentpanel", "administrationspanel", "styrningssystem",
  "företagspanel",

  // Vietnamese (Tiếng Việt)
  "bảng điều khiển", "bảng quản trị", "hệ thống quản lý",
  "bảng điều khiển doanh nghiệp",
];

const LANGUAGES = [
  "en", "es", "fr", "de", "pt", "it", "nl", "ru", "zh-CN", "zh-TW",
  "ja", "ko", "ar", "hi", "tr", "pl", "sv", "vi", "id", "th",
];

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: KEYWORDS,
  authors: [{ name: BRAND.name, url: BRAND.url }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BRAND.url,
    languages: Object.fromEntries(
      LANGUAGES.map((l) => [l, `${BRAND.url}?lang=${l}`])
    ),
  },
  icons: {
    icon: [
      { url: "/sitelogo.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/sitelogo.png", sizes: "512x512" }],
    shortcut: ["/sitelogo.png"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: [
      "es_ES", "fr_FR", "de_DE", "pt_BR", "it_IT", "nl_NL", "ru_RU",
      "zh_CN", "zh_TW", "ja_JP", "ko_KR", "ar_SA", "hi_IN", "tr_TR",
      "pl_PL", "sv_SE", "vi_VN", "id_ID", "th_TH",
    ],
    url: BRAND.url,
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    images: [
      {
        url: "/sitelogo.png",
        width: 512,
        height: 512,
        alt: `${BRAND.name} logo`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mtverse",
    creator: "@mtverse",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    images: ["/sitelogo.png"],
  },
  formatDetection: { email: false, address: false, telephone: false },
  appLinks: {
    web: {
      url: BRAND.url,
      should_fallback: true,
    },
  },
  archives: [`${BRAND.url}/enterprise/changelog`],
  bookmarks: [
    `${BRAND.url}/dashboards/analytics`,
    `${BRAND.url}/dashboards/ecommerce`,
    `${BRAND.url}/dashboards/crm`,
  ],
  other: {
    "msapplication-TileColor": "#7c3aed",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#7c3aed",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": BRAND.name,
    "mobile-web-app-capable": "yes",
    "application-name": BRAND.name,
    "og:site_name": BRAND.name,
    "og:type": "website",
    "og:locale": "en_US",
    "twitter:site": "@mtverse",
    "twitter:creator": "@mtverse",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 0.5,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="font-sans bg-background text-foreground">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
