import { MonitoringPage } from "@/components/pages/monitoring-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Monitoring',
  description: 'Uptime, latency, incidents, logs, and alert rules.',
};

export default function Page() {
  return <MonitoringPage />;
}
