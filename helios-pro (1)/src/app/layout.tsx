import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Helios Pro",
    default: "Helios Pro — Premium Admin & Dashboard UI Kit",
  },
  description:
    "Helios Pro is a premium Next.js admin dashboard UI kit with 100+ pages, advanced data tables, charts, apps, ecommerce, auth, and a refined design system.",
  keywords: [
    "Helios Pro",
    "Next.js admin",
    "dashboard UI kit",
    "premium admin template",
    "analytics dashboard",
    "ecommerce admin",
  ],
  authors: [{ name: "Helios Pro" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#10b981" showSpinner={false} />

          {children}

          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={5000}
            toastOptions={{
              className: "dark:bg-gray-dark dark:border-dark-3 dark:text-white",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
