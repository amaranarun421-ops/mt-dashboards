import type { Metadata } from "next";
import RowSelectionClient from "./_client";

export const metadata: Metadata = {
  title: "Row Selection | Tables | Helios Pro",
  description: "DataTable with row checkboxes, select-all, and a bulk action bar with confirm modals.",
};

export default function RowSelectionPage() {
  return <RowSelectionClient />;
}
