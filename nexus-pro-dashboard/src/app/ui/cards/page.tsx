import { UiCardsPage } from "@/components/pages/ui-cards-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cards',
  description: 'Analytics cards, profile cards, pricing cards, and media cards.',
};

export default function Page() {
  return <UiCardsPage />;
}
