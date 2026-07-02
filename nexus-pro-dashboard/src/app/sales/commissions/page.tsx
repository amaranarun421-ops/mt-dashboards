import { SalesCommissionsPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commissions",
  description: "Estimated payouts with accelerators.",
};

export default function Page() {
  return <SalesCommissionsPage />;
}
