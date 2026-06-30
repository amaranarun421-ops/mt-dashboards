import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nimbus Pro — Premium Admin UI Kit",
    template: "%s · Nimbus Pro",
  },
  description:
    "Nimbus Pro is a premium Next.js admin dashboard UI kit with 100+ production-ready pages, advanced data tables, charts, forms, and a refined design system.",
  icons: {
    icon: "/brand/favicon.svg",
  },
  keywords: [
    "admin dashboard",
    "UI kit",
    "Next.js",
    "Tailwind CSS",
    "dashboard template",
    "Nimbus Pro",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('nimbus-theme')||'light';var d=localStorage.getItem('nimbus-density')||'comfortable';var c=localStorage.getItem('nimbus-color')||'emerald';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.setAttribute('data-density',d);document.documentElement.setAttribute('data-color',c);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
