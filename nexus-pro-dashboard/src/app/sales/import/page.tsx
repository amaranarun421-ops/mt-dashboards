import { SalesImportPage } from "@/components/sales/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Import",
  description: "Bulk import leads, contacts, and accounts.",
};

export default function Page() {
  return <SalesImportPage />;
}
