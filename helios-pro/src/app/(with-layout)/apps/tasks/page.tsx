import TasksClient from "./_client";

export const metadata = {
  title: "Tasks",
  description: "Track work across projects with priorities, subtasks and quick filters.",
};

export default function TasksPage() {
  return <TasksClient />;
}
