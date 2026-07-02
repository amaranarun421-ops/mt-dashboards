import { SalesLeadsPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads",
  description: "Scored, source-tagged leads ready for outreach.",
};

export default function Page() {
  return <SalesLeadsPage />;
}
