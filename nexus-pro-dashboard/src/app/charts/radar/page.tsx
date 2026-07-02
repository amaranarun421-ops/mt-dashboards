import { ChartRadar } from "@/components/pages/chart-radar-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Radar Charts',
  description: 'Multi-axis radar comparisons.',
};

export default function Page() {
  return <ChartRadar />;
}
