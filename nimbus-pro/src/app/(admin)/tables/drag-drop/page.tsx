"use client";
import { useState } from "react";
import { PageHeader, Card, Badge, Button } from "@/components/ui";
import { GripVertical, Plus, ArrowUp, ArrowDown, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

type Task = {
  id: string;
  title: string;
  priority: "urgent" | "high" | "medium" | "low";
  status: "todo" | "in_progress" | "done";
  assignee: string;
  project: string;
  due: string;
};

const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Review PR #824 — AI dashboard widgets", priority: "high", status: "in_progress", assignee: "Aaroh Sharma", project: "Nimbus Pro v3.0", due: "Today" },
  { id: "t2", title: "Refactor auth context for SSO", priority: "medium", status: "todo", assignee: "Marcus Chen", project: "Enterprise SSO", due: "Tomorrow" },
  { id: "t3", title: "Write release notes for v3.0", priority: "low", status: "todo", assignee: "Sofia García", project: "Nimbus Pro v3.0", due: "Jul 02" },
  { id: "t4", title: "Fix flaky e2e tests on CI", priority: "urgent", status: "in_progress", assignee: "Yuki Tanaka", project: "Mobile App Refresh", due: "Today" },
  { id: "t5", title: "Upgrade Tailwind to v4", priority: "medium", status: "done", assignee: "Leo Romano", project: "Nimbus Pro v3.0", due: "Yesterday" },
  { id: "t6", title: "Customer interview prep — Acme", priority: "low", status: "todo", assignee: "Priya Iyer", project: "AI Insights Module", due: "Jul 04" },
  { id: "t7", title: "Optimize data tables for 10k+ rows", priority: "urgent", status: "in_progress", assignee: "Priya Iyer", project: "Nimbus Pro v3.0", due: "Jun 28" },
];

const PRIORITY_TONE: Record<Task["priority"], "error" | "warning" | "brand" | "gray"> = {
  urgent: "error",
  high: "warning",
  medium: "brand",
  low: "gray",
};

const STATUS_TONE: Record<Task["status"], "gray" | "warning" | "success"> = {
  todo: "gray",
  in_progress: "warning",
  done: "success",
};

const STATUS_LABEL: Record<Task["status"], string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export default function DragDropPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) {
      setOverIndex(null);
      return;
    }
    setOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    setTasks((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      return next;
    });
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const move = (index: number, dir: -1 | 1) => {
    setTasks((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Drag & Drop Rows"
        description="Reorder rows by dragging the handle, or use the arrow buttons for keyboard-friendly moves."
        breadcrumbs={[{ label: "Tables" }, { label: "Drag & Drop" }]}
        actions={<Button><Plus className="h-4 w-4" /> New task</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <ListOrdered className="h-4 w-4 text-brand-500" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Backlog</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{tasks.filter((t) => t.status === "todo").length}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <ListOrdered className="h-4 w-4 text-warning-500" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">In progress</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{tasks.filter((t) => t.status === "in_progress").length}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <ListOrdered className="h-4 w-4 text-success-500" />
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Done</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{tasks.filter((t) => t.status === "done").length}</p>
        </Card>
      </div>

      <Card className="p-0">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-12 text-center">#</th>
                <th className="w-12"></th>
                <th>Task</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assignee</th>
                <th>Project</th>
                <th>Due</th>
                <th className="w-20 text-right">Reorder</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                const isDragging = dragIndex === index;
                const isOver = overIndex === index && dragIndex !== null && dragIndex !== index;
                return (
                  <tr
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={cn(
                      "transition-opacity",
                      isDragging && "opacity-40",
                      isOver && "bg-brand-50 dark:bg-brand-500/10",
                      isOver && "shadow-[inset_0_2px_0_0_var(--color-brand-500)]"
                    )}
                  >
                    <td className="text-center text-xs font-mono font-semibold text-gray-400">{index + 1}</td>
                    <td className="px-2">
                      <button
                        type="button"
                        aria-label="Drag handle"
                        className="flex h-8 w-6 cursor-grab items-center justify-center rounded text-gray-300 hover:text-gray-500 active:cursor-grabbing dark:text-gray-600 dark:hover:text-gray-400"
                        onClick={(e) => e.preventDefault()}
                      >
                        <GripVertical className="h-4 w-4" />
                      </button>
                    </td>
                    <td>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{task.title}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{task.assignee}</p>
                    </td>
                    <td>
                      <Badge tone={PRIORITY_TONE[task.priority]} variant="soft" dot className="capitalize">{task.priority}</Badge>
                    </td>
                    <td>
                      <Badge tone={STATUS_TONE[task.status]} variant="soft" dot>{STATUS_LABEL[task.status]}</Badge>
                    </td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{task.assignee}</td>
                    <td className="text-xs text-gray-500 dark:text-gray-400">{task.project}</td>
                    <td className={cn("text-xs font-medium", task.due === "Today" ? "text-error-600 dark:text-error-400" : "text-gray-500 dark:text-gray-400")}>{task.due}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <button
                          onClick={() => move(index, -1)}
                          disabled={index === 0}
                          aria-label="Move up"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => move(index, 1)}
                          disabled={index === tasks.length - 1}
                          aria-label="Move down"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Drag the <GripVertical className="inline h-3 w-3" /> handle to reorder, or use the arrow buttons on the right for keyboard access. A blue indicator shows where the row will land when dropped.
      </p>
    </div>
  );
}
