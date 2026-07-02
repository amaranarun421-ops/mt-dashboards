import { SalesTerritoriesPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Territories",
  description: "Geographic performance breakdown.",
};

export default function Page() {
  return <SalesTerritoriesPage />;
}
