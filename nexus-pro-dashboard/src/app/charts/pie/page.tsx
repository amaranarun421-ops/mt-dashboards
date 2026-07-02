import { ChartPie } from "@/components/pages/chart-pie-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pie & Donut',
  description: 'Pie, donut, and centered donut charts.',
};

export default function Page() {
  return <ChartPie />;
}
