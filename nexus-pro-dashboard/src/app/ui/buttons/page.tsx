import { UiButtonsPage } from "@/components/pages/ui-buttons-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Buttons',
  description: 'Variants, sizes, icon buttons, loading states, and groups.',
};

export default function Page() {
  return <UiButtonsPage />;
}
