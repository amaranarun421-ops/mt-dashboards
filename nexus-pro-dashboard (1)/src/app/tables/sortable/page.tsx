import { TableSortable } from "@/components/pages/table-sortable-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sortable Tables',
  description: 'Multi-column sort with visual indicators.',
};

export default function Page() {
  return <TableSortable />;
}
