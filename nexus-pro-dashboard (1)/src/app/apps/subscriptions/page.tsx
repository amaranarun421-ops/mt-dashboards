import { SubscriptionsPage } from "@/components/pages/subscriptions-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Subscriptions',
  description: 'Active subscriptions, MRR, churn, and renewal schedule.',
};

export default function Page() {
  return <SubscriptionsPage />;
}
