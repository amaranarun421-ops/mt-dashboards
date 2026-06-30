"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { Progress } from "@/components/shared/progress";
import { EmptyState } from "@/components/shared/empty-state";
import { inputClass } from "@/components/shared/form-section";
import { CheckSquareIcon, EditIcon, CheckIcon, StarIcon } from "@/components/Layouts/sidebar/icons";
import { tasks as initialTasks, type Task, type TaskPriority } from "@/data/apps/tasks";

const priorityTone: Record<TaskPriority, "neutral" | "info" | "accent" | "danger"> = {
  low: "neutral",
  medium: "info",
  high: "accent",
  urgent: "danger",
};

const statusTone: Record<Task["status"], "neutral" | "info" | "success"> = {
  todo: "neutral",
  "in-progress": "info",
  done: "success",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | Task["status"]>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | TaskPriority>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(initialTasks[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", priority: "medium" as TaskPriority, due: "Feb 14" });

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => (filter === "all" ? true : t.status === filter))
      .filter((t) => (priorityFilter === "all" ? true : t.priority === priorityFilter))
      .filter((t) =>
        query.trim() === "" ? true : (t.title + t.description + t.project).toLowerCase().includes(query.toLowerCase()),
      );
  }, [tasks, filter, priorityFilter, query]);

  const active = tasks.find((t) => t.id === selectedId) || filtered[0] || null;

  const counts = useMemo(() => ({
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  }), [tasks]);

  function toggleStatus(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "done" ? "todo" : "done",
              subtasks: t.status === "done" ? t.subtasks.map((s) => ({ ...s, done: false })) : t.subtasks.map((s) => ({ ...s, done: true })),
            }
          : t,
      ),
    );
  }

  function toggleSubtask(taskId: string, subId: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) => (s.id === subId ? { ...s, done: !s.done } : s)),
            }
          : t,
      ),
    );
  }

  function createTask() {
    if (!draft.title.trim()) return;
    const t: Task = {
      id: `T-${Math.floor(Math.random() * 900) + 600}`,
      title: draft.title.trim(),
      description: "Newly created task.",
      status: "todo",
      priority: draft.priority,
      assignee: "Me",
      due: draft.due,
      project: "Inbox",
      tags: ["new"],
      subtasks: [],
    };
    setTasks((prev) => [t, ...prev]);
    setSelectedId(t.id);
    setDraft({ title: "", priority: "medium", due: "Feb 14" });
    setModalOpen(false);
  }

  return (
    <div>
      <PageHeader
        title="Tasks"
        description="Track work across projects with priorities, subtasks and quick filters."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "Tasks" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Export CSV</Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <EditIcon className="size-4" />
              New task
            </Button>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card padded className="!p-4">
          <p className="text-xs text-dark-5 dark:text-dark-6">Total</p>
          <p className="mt-1 text-2xl font-bold text-dark dark:text-white">{counts.all}</p>
        </Card>
        <Card padded className="!p-4">
          <p className="text-xs text-dark-5 dark:text-dark-6">To do</p>
          <p className="mt-1 text-2xl font-bold text-dark dark:text-white">{counts.todo}</p>
        </Card>
        <Card padded className="!p-4">
          <p className="text-xs text-dark-5 dark:text-dark-6">In progress</p>
          <p className="mt-1 text-2xl font-bold text-dark dark:text-white">{counts["in-progress"]}</p>
        </Card>
        <Card padded className="!p-4">
          <p className="text-xs text-dark-5 dark:text-dark-6">Done</p>
          <p className="mt-1 text-2xl font-bold text-primary dark:text-primary-light">{counts.done}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Task list */}
        <Card padded={false}>
          <div className="flex flex-col gap-3 border-b border-stroke p-4 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-1">
              {([
                { key: "all", label: "All" },
                { key: "todo", label: "To do" },
                { key: "in-progress", label: "In progress" },
                { key: "done", label: "Done" },
              ] as const).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    filter === t.key
                      ? "bg-primary text-white"
                      : "text-dark-5 hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-white/5"
                  }`}
                >
                  {t.label}
                  <span className="ml-1.5 opacity-70">({counts[t.key]})</span>
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks…"
              className={`${inputClass} !h-9 !py-1 max-w-[220px]`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5 border-b border-stroke px-4 py-2.5 dark:border-dark-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Priority:</span>
            {(["all", "urgent", "high", "medium", "low"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize transition ${
                  priorityFilter === p
                    ? "bg-primary text-white"
                    : "bg-gray-2 text-dark-7 hover:bg-gray-3 dark:bg-white/10 dark:text-dark-7"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <ul className="divide-y divide-stroke dark:divide-dark-3">
            {filtered.length === 0 ? (
              <li>
                <EmptyState
                  size="md"
                  icon={<CheckSquareIcon className="size-6" />}
                  title="No tasks match"
                  description="Adjust filters or create a new task."
                />
              </li>
            ) : (
              filtered.map((t) => {
                const doneSubs = t.subtasks.filter((s) => s.done).length;
                const isActive = active?.id === t.id;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => setSelectedId(t.id)}
                      className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition ${
                        isActive ? "bg-primary-subtle/60 dark:bg-primary/10" : "hover:bg-gray-2/60 dark:hover:bg-white/[0.03]"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(t.id);
                        }}
                        aria-label="toggle done"
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition ${
                          t.status === "done"
                            ? "border-primary bg-primary text-white"
                            : "border-stroke text-transparent hover:border-primary dark:border-dark-3"
                        }`}
                      >
                        <CheckIcon className="size-3" />
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-medium ${t.status === "done" ? "text-dark-5 line-through dark:text-dark-6" : "text-dark dark:text-white"}`}>
                            {t.title}
                          </p>
                          <div className="flex shrink-0 items-center gap-1.5">
                            <Badge variant={priorityTone[t.priority]} size="sm">{t.priority}</Badge>
                            <Badge variant={statusTone[t.status]} size="sm">{t.status}</Badge>
                          </div>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-dark-5 dark:text-dark-6">{t.description}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <Avatar name={t.assignee} size="xs" />
                          <span className="text-[11px] text-dark-5 dark:text-dark-6">{t.project}</span>
                          <span className="text-[11px] text-dark-5 dark:text-dark-6">Due {t.due}</span>
                          {t.subtasks.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-dark-5 dark:text-dark-6">
                              <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              {doneSubs}/{t.subtasks.length}
                            </span>
                          )}
                          {t.starred && <StarIcon className="size-3 text-accent" />}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </Card>

        {/* Detail */}
        <Card padded={false} className="flex h-full min-h-[600px] flex-col">
          {!active ? (
            <EmptyState
              className="m-auto"
              size="md"
              icon={<CheckSquareIcon className="size-6" />}
              title="No task selected"
              description="Pick a task to see details and subtasks."
            />
          ) : (
            <>
              <div className="border-b border-stroke p-5 dark:border-dark-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-dark-5 dark:text-dark-6">{active.id}</span>
                  <Badge variant={priorityTone[active.priority]} size="sm">{active.priority}</Badge>
                  <Badge variant={statusTone[active.status]} size="sm">{active.status}</Badge>
                </div>
                <h2 className={`mt-2 text-base font-semibold ${active.status === "done" ? "text-dark-5 line-through dark:text-dark-6" : "text-dark dark:text-white"}`}>
                  {active.title}
                </h2>
                <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">{active.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar name={active.assignee} size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-dark dark:text-white">{active.assignee}</p>
                    <p className="text-[11px] text-dark-5 dark:text-dark-6">Owner · Due {active.due}</p>
                  </div>
                </div>
              </div>
              <div className="helios-scroll flex-1 overflow-y-auto p-5">
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <Badge key={t} variant="neutral" size="sm">#{t}</Badge>
                  ))}
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      Subtasks
                    </p>
                    <span className="text-[11px] text-dark-5 dark:text-dark-6">
                      {active.subtasks.filter((s) => s.done).length}/{active.subtasks.length}
                    </span>
                  </div>
                  {active.subtasks.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-stroke py-4 text-center text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
                      No subtasks yet.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {active.subtasks.map((s) => (
                        <li
                          key={s.id}
                          className="flex items-center gap-2 rounded-lg border border-stroke p-2 dark:border-dark-3"
                        >
                          <button
                            onClick={() => toggleSubtask(active.id, s.id)}
                            className={`grid size-4 place-items-center rounded border transition ${
                              s.done
                                ? "border-primary bg-primary text-white"
                                : "border-stroke text-transparent hover:border-primary dark:border-dark-3"
                            }`}
                            aria-label="toggle subtask"
                          >
                            <CheckIcon className="size-3" />
                          </button>
                          <span
                            className={`text-sm ${s.done ? "text-dark-5 line-through dark:text-dark-6" : "text-dark dark:text-white"}`}
                          >
                            {s.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                    Progress
                  </p>
                  <Progress
                    value={
                      active.subtasks.length === 0
                        ? active.status === "done" ? 100 : 30
                        : (active.subtasks.filter((s) => s.done).length / active.subtasks.length) * 100
                    }
                    tone={active.status === "done" ? "success" : "primary"}
                    size="md"
                    showLabel
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-stroke p-4 dark:border-dark-3">
                <Button variant="ghost" size="sm">Add comment</Button>
                <Button variant="primary" size="sm" onClick={() => toggleStatus(active.id)}>
                  {active.status === "done" ? "Reopen task" : "Mark complete"}
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New task"
        description="Quickly capture a task. You can refine details later."
        size="md"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={createTask}>Create task</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Title</label>
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="e.g. Review PR #2841"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Priority</label>
              <select
                value={draft.priority}
                onChange={(e) => setDraft({ ...draft, priority: e.target.value as TaskPriority })}
                className={inputClass}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Due date</label>
              <input
                value={draft.due}
                onChange={(e) => setDraft({ ...draft, due: e.target.value })}
                placeholder="e.g. Feb 14"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
