import { InvoicesPage } from "@/components/pages/invoices-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Invoices',
  description: 'Invoice list, creation flow, and printable detail.',
};

export default function Page() {
  return <InvoicesPage />;
}
