import { SalesOverviewPage } from "@/components/sales/overview-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Overview",
  description: "Pipeline value, weighted forecast, quota attainment, and rep performance.",
};

export default function Page() {
  return <SalesOverviewPage />;
}
