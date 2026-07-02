import { ChartLine } from "@/components/pages/chart-line-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Line Charts',
  description: 'Single and multi-series line charts.',
};

export default function Page() {
  return <ChartLine />;
}
