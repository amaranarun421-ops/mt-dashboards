import { SalesDealsPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deals",
  description: "All open deals with bulk actions and export.",
};

export default function Page() {
  return <SalesDealsPage />;
}
