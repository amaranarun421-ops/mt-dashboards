import type { Metadata } from "next";
import FilteringClient from "./_client";

export const metadata: Metadata = {
  title: "Filtering | Tables | Helios Pro",
  description: "DataTable with column-level filters including search, dropdowns, status selectors, and a joined-date range.",
};

export default function FilteringPage() {
  return <FilteringClient />;
}
