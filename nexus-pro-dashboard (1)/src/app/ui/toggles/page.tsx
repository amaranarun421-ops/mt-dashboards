import { UiTogglePage } from "@/components/pages/ui-toggle-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Switches & Toggles',
  description: 'Switches, toggle groups, and controlled states.',
};

export default function Page() {
  return <UiTogglePage />;
}
