import { SalesQuotaPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quota & Attainment",
  description: "Per-rep quota tracking and variance.",
};

export default function Page() {
  return <SalesQuotaPage />;
}
