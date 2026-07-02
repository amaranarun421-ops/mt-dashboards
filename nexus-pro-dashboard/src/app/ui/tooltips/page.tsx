import { UiTooltips } from "@/components/pages/ui-tooltips-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tooltips & Popovers',
  description: 'Tooltips, popovers, and hover cards.',
};

export default function Page() {
  return <UiTooltips />;
}
