import { SalesForecastingPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forecasting",
  description: "Weighted forecast with accuracy tracking and scenario planning.",
};

export default function Page() {
  return <SalesForecastingPage />;
}
