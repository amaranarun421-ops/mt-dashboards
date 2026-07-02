import { POS } from "@/components/pages/pos-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Point of Sale',
  description: 'Product catalog, cart, payment, and receipt.',
};

export default function Page() {
  return <POS />;
}
