import { ChartBar } from "@/components/pages/chart-bar-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Bar Charts',
  description: 'Vertical, horizontal, and stacked bars.',
};

export default function Page() {
  return <ChartBar />;
}
