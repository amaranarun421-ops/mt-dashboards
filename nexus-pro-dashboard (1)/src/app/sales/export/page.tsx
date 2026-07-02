import { SalesExportPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Export",
  description: "One-click exports of all sales data.",
};

export default function Page() {
  return <SalesExportPage />;
}
