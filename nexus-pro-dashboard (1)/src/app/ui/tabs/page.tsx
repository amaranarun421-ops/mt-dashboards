import { UiTabsPage } from "@/components/pages/ui-tabs-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tabs & Accordions',
  description: 'Horizontal, vertical, pill, and animated tabs.',
};

export default function Page() {
  return <UiTabsPage />;
}
