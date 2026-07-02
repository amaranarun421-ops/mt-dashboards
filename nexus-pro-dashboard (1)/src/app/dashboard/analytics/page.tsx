import { AnalyticsDashboard } from "@/components/pages/analytics-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'Acquisition, behavior, conversion, and cohort analytics.',
};

export default function Page() {
  return <AnalyticsDashboard />;
}
