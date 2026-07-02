import { UiTypographyPage } from "@/components/pages/ui-typography-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Typography',
  description: 'Type scale, headings, body text, and dashboard typography.',
};

export default function Page() {
  return <UiTypographyPage />;
}
