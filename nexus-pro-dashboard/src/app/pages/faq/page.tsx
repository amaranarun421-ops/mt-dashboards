import { FaqPage } from "@/components/pages/faq-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Categorized frequently asked questions.',
};

export default function Page() {
  return <FaqPage />;
}
