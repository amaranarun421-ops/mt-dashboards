import { TodoPage } from "@/components/pages/todo-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'To-Do List',
  description: 'Lists, priorities, due dates, and filters.',
};

export default function Page() {
  return <TodoPage />;
}
