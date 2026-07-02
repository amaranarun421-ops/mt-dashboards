import { PricingPage } from "@/components/pages/pricing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Plan comparison, FAQ, and license options.',
};

export default function Page() {
  return <PricingPage />;
}
