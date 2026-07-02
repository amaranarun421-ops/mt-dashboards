import { TableFilter } from "@/components/pages/table-filter-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Filterable Tables',
  description: 'Column filters and global search.',
};

export default function Page() {
  return <TableFilter />;
}
