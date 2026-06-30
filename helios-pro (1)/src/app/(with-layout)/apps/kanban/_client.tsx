"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar, AvatarGroup } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { Progress } from "@/components/shared/progress";
import { inputClass } from "@/components/shared/form-section";
import { KanbanIcon, EditIcon } from "@/components/Layouts/sidebar/icons";
import { kanbanCards, kanbanColumns, type KanbanCard, type KanbanColumnKey } from "@/data/apps/kanban";

const priorityTone: Record<KanbanCard["priority"], "neutral" | "info" | "accent" | "danger"> = {
  low: "neutral",
  medium: "info",
  high: "accent",
  urgent: "danger",
};

const coverTone: Record<NonNullable<KanbanCard["cover"]>, string> = {
  amber: "bg-accent/80",
  emerald: "bg-primary/80",
  violet: "bg-violet/80",
  sky: "bg-blue/80",
  rose: "bg-rose/80",
  slate: "bg-gray-4/80",
};

export default function KanbanPage() {
  const [cards, setCards] = useState<KanbanCard[]>(kanbanCards);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<KanbanColumnKey | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newCol, setNewCol] = useState<KanbanColumnKey>("backlog");
  const [newTitle, setNewTitle] = useState("");

  const byCol = useMemo(() => {
    const m: Record<KanbanColumnKey, KanbanCard[]> = {
      backlog: [],
      "in-progress": [],
      review: [],
      done: [],
    };
    cards.forEach((c) => m[c.column].push(c));
    return m;
  }, [cards]);

  function onDragStart(id: string) {
    setDragId(id);
  }

  function onDragOver(e: React.DragEvent, col: KanbanColumnKey) {
    e.preventDefault();
    setDragOverCol(col);
  }

  function onDrop(col: KanbanColumnKey) {
    if (!dragId) return;
    setCards((prev) =>
      prev.map((c) => (c.id === dragId ? { ...c, column: col, progress: col === "done" ? 100 : c.progress } : c)),
    );
    setDragId(null);
    setDragOverCol(null);
  }

  function addCard() {
    if (!newTitle.trim()) return;
    const c: KanbanCard = {
      id: `K-${Math.floor(Math.random() * 9000) + 1000}`,
      title: newTitle.trim(),
      column: newCol,
      priority: "medium",
      tags: ["new"],
      assignees: ["Me"],
      due: "Feb 14",
      progress: 0,
      comments: 0,
      attachments: 0,
    };
    setCards((prev) => [...prev, c]);
    setNewTitle("");
    setModalOpen(false);
  }

  return (
    <div>
      <PageHeader
        title="Kanban"
        description="Drag cards across columns to update status. Sprint 24 board — Helios Pro engineering."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "Kanban" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Filter</Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <EditIcon className="size-4" />
              Add card
            </Button>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kanbanColumns.map((col) => {
          const items = byCol[col.key];
          const totalProgress = items.length === 0 ? 0 : items.reduce((s, c) => s + c.progress, 0) / items.length;
          return (
            <Card key={col.key} padded className="!p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${col.accent}`} />
                  <span className="text-sm font-semibold text-dark dark:text-white">{col.title}</span>
                </div>
                <Badge variant={col.tone} size="sm">{items.length}</Badge>
              </div>
              <div className="mt-3">
                <Progress
                  value={totalProgress}
                  tone={col.tone === "neutral" ? "info" : col.tone === "success" ? "success" : col.tone === "accent" ? "accent" : "info"}
                  size="xs"
                  showLabel
                />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kanbanColumns.map((col) => {
          const items = byCol[col.key];
          return (
            <div
              key={col.key}
              onDragOver={(e) => onDragOver(e, col.key)}
              onDrop={() => onDrop(col.key)}
              onDragLeave={() => setDragOverCol(null)}
              className={`rounded-2xl border bg-gray-2/40 p-3 transition ${
                dragOverCol === col.key
                  ? "border-primary bg-primary-subtle/40 dark:bg-primary/10"
                  : "border-stroke dark:border-dark-3"
              }`}
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${col.accent}`} />
                  <span className="text-sm font-semibold text-dark dark:text-white">{col.title}</span>
                </div>
                <Badge variant={col.tone} size="sm">{items.length}</Badge>
              </div>
              <ul className="space-y-3">
                {items.map((c) => (
                  <li
                    key={c.id}
                    draggable
                    onDragStart={() => onDragStart(c.id)}
                    className={`group cursor-grab rounded-xl border border-stroke bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing dark:border-dark-3 dark:bg-gray-dark ${
                      dragId === c.id ? "opacity-50" : ""
                    }`}
                  >
                    {c.cover && (
                      <div className={`mb-3 h-1.5 rounded-full ${coverTone[c.cover]}`} />
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-dark-5 dark:text-dark-6">{c.id}</span>
                      <Badge variant={priorityTone[c.priority]} size="sm">{c.priority}</Badge>
                    </div>
                    <p className="mt-2 text-sm font-medium text-dark dark:text-white">{c.title}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-gray-2 px-1.5 py-0.5 text-[10px] font-medium text-dark-7 dark:bg-white/10 dark:text-dark-7"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Progress
                        value={c.progress}
                        tone={c.progress === 100 ? "success" : c.progress > 60 ? "primary" : "accent"}
                        size="xs"
                        showLabel
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <AvatarGroup names={c.assignees} max={3} size="xs" />
                      <div className="flex items-center gap-2 text-[11px] text-dark-5 dark:text-dark-6">
                        <span className="inline-flex items-center gap-0.5">
                          <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><path d="M21 11.5c0 4.4-4 8-9 8a9.8 9.8 0 01-4-.8L3 20l1.3-5A8 8 0 013 11.5C3 7.1 7 3.5 12 3.5s9 3.6 9 8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                          {c.comments}
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><path d="M21 10v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8a3 3 0 013-3h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M16 4l4 4-8 8H8v-4l8-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                          {c.attachments}
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                          {c.due}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      setNewCol(col.key);
                      setModalOpen(true);
                    }}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-stroke py-2 text-xs font-medium text-dark-5 transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-6"
                  >
                    <KanbanIcon className="size-3.5" />
                    Add card
                  </button>
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add new card"
        description="Create a new task on the kanban board."
        size="md"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={addCard}>Create card</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Card title</label>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Implement audit log export"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Column</label>
            <select
              value={newCol}
              onChange={(e) => setNewCol(e.target.value as KanbanColumnKey)}
              className={inputClass}
            >
              {kanbanColumns.map((c) => (
                <option key={c.key} value={c.key}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
