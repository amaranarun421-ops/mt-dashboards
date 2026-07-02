import { PricingPage } from "@/components/marketing/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & License",
  description: "One-time purchase. Lifetime updates.",
};

export default function Page() {
  return <PricingPage />;
}
