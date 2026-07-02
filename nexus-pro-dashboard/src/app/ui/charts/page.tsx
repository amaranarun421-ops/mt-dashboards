import { UiChartsPage } from "@/components/pages/ui-charts-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Charts',
  description: 'Premium analytics chart showcase.',
};

export default function Page() {
  return <UiChartsPage />;
}
