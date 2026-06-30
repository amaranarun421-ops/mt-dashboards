import KanbanClient from "./_client";

export const metadata = {
  title: "Kanban",
  description: "Drag cards across columns to update status. Sprint 24 board — Helios Pro engineering.",
};

export default function KanbanPage() {
  return <KanbanClient />;
}
