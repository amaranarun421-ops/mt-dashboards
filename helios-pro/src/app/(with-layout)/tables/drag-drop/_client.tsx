"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { ChevronUp, CheckSquareIcon } from "@/components/Layouts/sidebar/icons";
import { projects as initial, type Project, type ProjectPriority, type ProjectStatus } from "@/data/tables/projects";

const fmtCurrency = (n: number) => `$${n.toLocaleString("en-US")}`;
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

const statusVariant: Record<ProjectStatus, "neutral" | "info" | "warning" | "accent" | "success" | "danger"> = {
  Planning: "neutral",
  "In Progress": "info",
  "On Hold": "warning",
  Review: "accent",
  Completed: "success",
  Cancelled: "danger",
};

const priorityVariant: Record<ProjectPriority, "neutral" | "info" | "warning" | "danger"> = {
  Low: "neutral",
  Medium: "info",
  High: "warning",
  Critical: "danger",
};

export default function DragDropClient() {
  const [rows, setRows] = useState<Project[]>(initial.slice(0, 10));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  function move(from: number, to: number) {
    if (from === to || from < 0 || to < 0 || from >= rows.length || to >= rows.length) return;
    setRows((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setHistory((prev) => [
      `${new Date().toLocaleTimeString()} — Moved "${rows[from].name}" from #${from + 1} to #${to + 1}`,
      ...prev,
    ].slice(0, 6));
  }

  function onDragStart(index: number) {
    setDragIndex(index);
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    if (overIndex !== index) setOverIndex(index);
  }

  function onDrop(index: number) {
    if (dragIndex !== null) move(dragIndex, index);
    setDragIndex(null);
    setOverIndex(null);
  }

  function onDragEnd() {
    setDragIndex(null);
    setOverIndex(null);
  }

  function reset() {
    setRows(initial.slice(0, 10));
    setHistory([]);
  }

  return (
    <div>
      <PageHeader
        title="Drag & Drop Row Reorder"
        description="Reorder rows with the drag handle on the left, or use the up/down buttons for precision. The new order persists in component state."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/drag-drop" }, { label: "Drag & Drop" }]}
        actions={
          <Button variant="outline" size="sm" onClick={reset}>
            <ChevronUp className="size-4 rotate-180" />
            Reset order
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Rows</p>
          <p className="mt-2 text-2xl font-bold text-dark dark:text-white">{rows.length}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Drag-enabled projects</p>
        </Card>
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Reorders logged</p>
          <p className="mt-2 text-2xl font-bold text-primary dark:text-primary-light">{history.length}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Last 6 retained</p>
        </Card>
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Drag handle</p>
          <p className="mt-2 text-sm font-semibold text-dark dark:text-white">HTML5 DnD · native</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">No library — uses draggable attribute</p>
        </Card>
      </div>

      <Card padded={false}>
        <CardHeader
          title="Project Backlog"
          subtitle="Drag the handle on the left, or use ▲▼ buttons to move a row"
          action={<Badge variant="primary" size="sm">Reorderable</Badge>}
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <div className="helios-scroll overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-stroke bg-gray-2 text-left dark:border-dark-3 dark:bg-dark-2">
                <th className="w-12 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Handle</th>
                <th className="w-12 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">#</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Project</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Priority</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Due</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Budget</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Move</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                const isDragging = dragIndex === i;
                const isOver = overIndex === i && dragIndex !== null && dragIndex !== i;
                return (
                  <tr
                    key={p.id}
                    draggable
                    onDragStart={() => onDragStart(i)}
                    onDragOver={(e) => onDragOver(e, i)}
                    onDrop={() => onDrop(i)}
                    onDragEnd={onDragEnd}
                    className={`border-b border-stroke last:border-0 dark:border-dark-3 transition-colors ${
                      isDragging ? "opacity-40" : "hover:bg-primary/5 dark:hover:bg-white/5"
                    } ${isOver ? "bg-primary-subtle dark:bg-primary/10" : ""}`}
                  >
                    <td className="px-3 py-3 text-center">
                      <button
                        type="button"
                        className="grid size-8 cursor-grab place-items-center rounded-md text-dark-5 hover:bg-gray-2 active:cursor-grabbing dark:hover:bg-white/5"
                        title="Drag to reorder"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <DragHandleIcon />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-grid size-6 place-items-center rounded-full bg-gray-2 text-xs font-semibold text-dark-7 dark:bg-white/5 dark:text-dark-7">{i + 1}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={p.owner} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-dark dark:text-white">{p.name}</p>
                          <p className="truncate text-xs text-dark-5 dark:text-dark-6">{p.id} · {p.client}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge variant={priorityVariant[p.priority]} size="sm">{p.priority}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[p.status]} size="sm">{p.status}</Badge></td>
                    <td className="px-4 py-3 text-xs text-dark-5 dark:text-dark-6">{fmtDate(p.dueDate)}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-dark dark:text-white">{fmtCurrency(p.budget)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => move(i, i - 1)}
                          disabled={i === 0}
                          className="grid size-7 place-items-center rounded-md border border-stroke text-dark-5 transition hover:bg-gray-2 disabled:opacity-30 dark:border-dark-3 dark:hover:bg-white/5"
                          title="Move up"
                        >
                          <ChevronUp className="size-3.5" />
                        </button>
                        <button
                          onClick={() => move(i, i + 1)}
                          disabled={i === rows.length - 1}
                          className="grid size-7 place-items-center rounded-md border border-stroke text-dark-5 transition hover:bg-gray-2 disabled:opacity-30 dark:border-dark-3 dark:hover:bg-white/5"
                          title="Move down"
                        >
                          <ChevronUp className="size-3.5 rotate-180" />
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

      <Card className="mt-6">
        <CardHeader
          title="Reorder audit log"
          subtitle="Most recent 6 moves"
          action={history.length > 0 ? <Badge variant="success" size="sm">{history.length} moves</Badge> : undefined}
        />
        {history.length === 0 ? (
          <div className="flex items-center gap-2 rounded-xl bg-gray-2 p-4 text-sm text-dark-5 dark:bg-white/5 dark:text-dark-6">
            <CheckSquareIcon className="size-4" />
            No moves yet — drag a row by its handle, or use the ▲▼ buttons on the right.
          </div>
        ) : (
          <ul className="space-y-2">
            {history.map((entry, i) => (
              <li key={i} className="flex items-center gap-2 rounded-xl border border-stroke px-3 py-2 text-sm dark:border-dark-3">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-dark-5 dark:text-dark-6">{entry.split(" — ")[0]}</span>
                <span className="text-dark-7 dark:text-dark-7">{entry.split(" — ")[1]}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function DragHandleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="3" r="1.2" fill="currentColor" />
      <circle cx="10" cy="3" r="1.2" fill="currentColor" />
      <circle cx="4" cy="7" r="1.2" fill="currentColor" />
      <circle cx="10" cy="7" r="1.2" fill="currentColor" />
      <circle cx="4" cy="11" r="1.2" fill="currentColor" />
      <circle cx="10" cy="11" r="1.2" fill="currentColor" />
    </svg>
  );
}
