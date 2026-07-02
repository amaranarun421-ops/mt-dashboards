import { IntegrationsPage } from "@/components/pages/integrations-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Marketplace, connected apps, sync status, and setup.',
};

export default function Page() {
  return <IntegrationsPage />;
}
