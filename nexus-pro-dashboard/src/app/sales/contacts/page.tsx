import { SalesContactsPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts",
  description: "All contacts tied to accounts.",
};

export default function Page() {
  return <SalesContactsPage />;
}
