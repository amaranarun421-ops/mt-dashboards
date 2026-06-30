import type { Metadata } from "next";
import EditableClient from "./_client";

export const metadata: Metadata = {
  title: "Editable Cells | Tables | Helios Pro",
  description: "Inline-editable table cells with click-to-edit, Enter to save, Esc to cancel, and an audit log.",
};

export default function EditablePage() {
  return <EditableClient />;
}
