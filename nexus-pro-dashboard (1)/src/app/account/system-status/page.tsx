import { SystemStatusPage } from "@/components/pages/system-status-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'System Status',
  description: 'Service health, uptime, incidents, and maintenance.',
};

export default function Page() {
  return <SystemStatusPage />;
}
