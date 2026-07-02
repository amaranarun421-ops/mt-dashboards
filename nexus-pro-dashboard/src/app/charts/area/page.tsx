import { ChartArea } from "@/components/pages/chart-area-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Area Charts',
  description: 'Single and stacked area charts.',
};

export default function Page() {
  return <ChartArea />;
}
