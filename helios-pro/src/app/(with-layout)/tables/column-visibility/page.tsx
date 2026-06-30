import type { Metadata } from "next";
import ColumnVisibilityClient from "./_client";

export const metadata: Metadata = {
  title: "Column Visibility | Tables | Helios Pro",
  description: "DataTable with a Columns dropdown to toggle the visibility of each column individually.",
};

export default function ColumnVisibilityPage() {
  return <ColumnVisibilityClient />;
}
