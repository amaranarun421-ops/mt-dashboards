import { SalesRevenuePage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue",
  description: "Closed-won revenue by month, segment, and territory.",
};

export default function Page() {
  return <SalesRevenuePage />;
}
