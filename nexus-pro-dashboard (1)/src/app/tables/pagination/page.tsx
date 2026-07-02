import { TablePagination } from "@/components/pages/table-pagination-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pagination',
  description: 'Server-style and client-side pagination patterns.',
};

export default function Page() {
  return <TablePagination />;
}
