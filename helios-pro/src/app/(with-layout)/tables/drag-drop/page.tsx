import type { Metadata } from "next";
import DragDropClient from "./_client";

export const metadata: Metadata = {
  title: "Drag & Drop | Tables | Helios Pro",
  description: "Reorderable table rows using native HTML5 drag-and-drop with up/down button fallback.",
};

export default function DragDropPage() {
  return <DragDropClient />;
}
