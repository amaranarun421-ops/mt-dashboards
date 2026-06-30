import type { Metadata } from "next";
import PaginationClient from "./_client";

export const metadata: Metadata = {
  title: "Pagination | Tables | Helios Pro",
  description: "DataTable with switchable page sizes of 5, 10, 25 and 50 using the shared Pagination component.",
};

export default function PaginationPage() {
  return <PaginationClient />;
}
