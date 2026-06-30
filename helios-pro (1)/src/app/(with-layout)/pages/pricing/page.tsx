import PricingClient from "./_client";

export const metadata = {
  title: "Pricing",
  description:
    "Helios Pro pricing — Starter, Pro and Enterprise. One-time purchase, lifetime updates on Pro and Enterprise, 14-day refund window.",
};

export default function PricingPage() {
  return <PricingClient />;
}
