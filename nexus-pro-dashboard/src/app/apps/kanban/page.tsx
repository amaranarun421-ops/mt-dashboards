import { KanbanPage } from "@/components/pages/kanban-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'Drag-and-drop board with columns, assignees, and due dates.',
};

export default function Page() {
  return <KanbanPage />;
}
