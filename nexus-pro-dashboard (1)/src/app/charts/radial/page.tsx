import { ChartRadial } from "@/components/pages/chart-radial-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Radial Bar',
  description: 'Radial progress and gauge charts.',
};

export default function Page() {
  return <ChartRadial />;
}
