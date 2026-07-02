import { UiFormsPage } from "@/components/pages/ui-forms-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Form Elements',
  description: 'Complete input showcase with states and helpers.',
};

export default function Page() {
  return <UiFormsPage />;
}
