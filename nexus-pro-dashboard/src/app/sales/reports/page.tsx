import { SalesReportsPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports",
  description: "Saved reports and scheduled exports.",
};

export default function Page() {
  return <SalesReportsPage />;
}
