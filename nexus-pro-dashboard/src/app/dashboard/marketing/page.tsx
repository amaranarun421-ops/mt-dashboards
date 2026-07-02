import { MarketingDashboard } from "@/components/pages/marketing-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Marketing Dashboard',
  description: 'Campaign performance, ROAS, CAC, and channel attribution.',
};

export default function Page() {
  return <MarketingDashboard />;
}
