import { LogisticsDashboard } from "@/components/pages/logistics-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Logistics Dashboard',
  description: 'Shipments, fleet, routes, SLA, and warehouse capacity.',
};

export default function Page() {
  return <LogisticsDashboard />;
}
