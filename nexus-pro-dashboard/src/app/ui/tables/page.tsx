import { UiTablesPage } from "@/components/pages/ui-tables-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tables',
  description: 'Simple, selectable, and grouped tables.',
};

export default function Page() {
  return <UiTablesPage />;
}
