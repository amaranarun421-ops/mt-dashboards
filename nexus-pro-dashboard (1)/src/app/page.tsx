import { MarketingLanding } from "@/components/marketing/landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Pro — Premium Next.js Admin Dashboard Kit",
  description:
    "100+ production-ready pages, advanced data tables, themed charts, dark-first premium UI. Built on Next.js App Router, Tailwind v4, and shadcn/ui.",
  alternates: { canonical: "/" },
};

export default function RootPage() {
  return <MarketingLanding />;
}
