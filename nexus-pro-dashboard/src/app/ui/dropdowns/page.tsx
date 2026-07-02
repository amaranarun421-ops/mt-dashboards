import { UiDropdowns } from "@/components/pages/ui-dropdowns-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dropdowns',
  description: 'Menus, nav, and context dropdowns.',
};

export default function Page() {
  return <UiDropdowns />;
}
