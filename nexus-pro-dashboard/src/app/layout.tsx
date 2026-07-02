import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CommandPalette } from "@/components/layout/command-palette";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexuspro.dashboard"),
  title: {
    default: "Nexus Pro — Premium Admin Dashboard Kit",
    template: "%s · Nexus Pro",
  },
  description:
    "Nexus Pro is a premium, production-ready Next.js App Router dashboard kit with 100+ pages, advanced tables, themed charts, and a polished dark-first experience for modern SaaS teams.",
  applicationName: "Nexus Pro",
  authors: [{ name: "Nexus Labs" }],
  creator: "Nexus Labs",
  publisher: "Nexus Labs",
  keywords: [
    "Nexus Pro",
    "Admin Dashboard",
    "Dashboard Kit",
    "Next.js",
    "App Router",
    "Tailwind CSS",
    "shadcn/ui",
    "TanStack Table",
    "SaaS Dashboard",
    "Analytics",
    "CRM",
    "Sales Ops",
  ],
  openGraph: {
    title: "Nexus Pro — Premium Admin Dashboard Kit",
    description:
      "100+ pages, advanced data tables, themed charts, dark-first premium UI. Built on Next.js App Router + Tailwind v4 + shadcn/ui.",
    siteName: "Nexus Pro",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Pro — Premium Admin Dashboard Kit",
    description:
      "100+ pages, advanced data tables, themed charts, dark-first premium UI. Built on Next.js App Router.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#465fff" },
    { media: "(prefers-color-scheme: dark)", color: "#101828" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Inline script to set the initial theme class before React hydrates, preventing a flash.
// Default theme is dark (per product spec). next-themes stores the resolved theme as a plain string.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('nexus-theme');
    // next-themes stores: "dark" or "light" (or sometimes with quotes)
    if (stored) { stored = stored.replace(/^"|"$/g, ''); }
    var resolved = stored || 'dark';
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${outfit.variable} ${jetbrains.variable} font-outfit bg-gray-50 dark:bg-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="nexus-theme"
        >
          {children}
          <CommandPalette />
          <Toaster />
          <SonnerToaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
