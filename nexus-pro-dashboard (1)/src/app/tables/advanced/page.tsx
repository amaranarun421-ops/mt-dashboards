import { TableAdvanced } from "@/components/pages/table-advanced-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Advanced Data Table',
  description: 'TanStack-powered with sort, filter, select, export.',
};

export default function Page() {
  return <TableAdvanced />;
}
