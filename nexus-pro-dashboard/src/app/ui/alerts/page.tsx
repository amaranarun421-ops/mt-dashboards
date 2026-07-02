import { UiAlertsPage } from "@/components/pages/ui-alerts-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Alerts & Toasts',
  description: 'Alerts, banners, toasts, and inline validation.',
};

export default function Page() {
  return <UiAlertsPage />;
}
