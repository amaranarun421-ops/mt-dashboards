import { SalesPipelinePage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pipeline",
  description: "Stage-by-stage deal board with weighted values.",
};

export default function Page() {
  return <SalesPipelinePage />;
}
