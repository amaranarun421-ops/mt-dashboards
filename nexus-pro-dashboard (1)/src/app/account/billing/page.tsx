import { Billing } from "@/components/pages/billing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Current plan, usage, payment method, and invoices.',
};

export default function Page() {
  return <Billing />;
}
