import { UiIconsPage } from "@/components/pages/ui-icons-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Icons',
  description: 'Lucide icon gallery with search and categories.',
};

export default function Page() {
  return <UiIconsPage />;
}
