import { UiModalsPage } from "@/components/pages/ui-modals-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Modals & Drawers',
  description: 'Confirmation, form, drawer, and fullscreen modals.',
};

export default function Page() {
  return <UiModalsPage />;
}
