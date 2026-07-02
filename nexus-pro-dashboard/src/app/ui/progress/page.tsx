import { UiProgressPage } from "@/components/pages/ui-progress-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Progress',
  description: 'Bars, radial, step, and upload progress.',
};

export default function Page() {
  return <UiProgressPage />;
}
