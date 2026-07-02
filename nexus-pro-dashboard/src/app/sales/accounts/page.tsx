import { SalesAccountsPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts",
  description: "Tier-keyed accounts with pipeline and health.",
};

export default function Page() {
  return <SalesAccountsPage />;
}
