import { EcommerceDashboard } from "@/components/pages/ecommerce-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ecommerce Dashboard',
  description: 'Track revenue, orders, customers, products, and fulfillment in real time.',
};

export default function Page() {
  return <EcommerceDashboard />;
}
