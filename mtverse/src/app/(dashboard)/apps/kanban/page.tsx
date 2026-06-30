"use client";

import * as React from "react";
import { useState } from "react";
import {
  Plus, ChevronLeft, ChevronRight, Calendar, MessageSquare, Paperclip,
  Filter, LayoutGrid, Users, CheckCircle2, Circle, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Avatar as AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, StatCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Card = {
  id: string; title: string; description: string; labels: string[];
  assignees: { name: string; color: string }[]; due: string; priority: "low" | "medium" | "high" | "urgent";
  comments: number; attachments: number; subtasks: { done: number; total: number };
};
type Column = { id: string; title: string; color: string; cards: Card[] };

const labelStyles: Record<string, string> = {
  Bug: "bg-destructive/10 text-destructive border-destructive/20",
  Feature: "bg-success/10 text-success border-success/20",
  Design: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Backend: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  Frontend: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Research: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Docs: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const priorityStyles: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/10 text-info",
  high: "bg-warning/10 text-warning",
  urgent: "bg-destructive/10 text-destructive",
};

const people: Record<string, string> = {
  SC: "bg-rose-500/15 text-rose-600",
  MH: "bg-emerald-500/15 text-emerald-600",
  PS: "bg-amber-500/15 text-amber-600",
  JR: "bg-sky-500/15 text-sky-600",
  LP: "bg-fuchsia-500/15 text-fuchsia-600",
  DK: "bg-violet-500/15 text-violet-600",
};

const initialCols: Column[] = [
  {
    id: "backlog", title: "Backlog", color: "bg-muted-foreground", cards: [
      { id: "MTV-101", title: "Multi-tenant workspace support", description: "Allow organizations to have multiple isolated workspaces under one billing entity. Includes admin UI for managing seats.", labels: ["Feature", "Backend"], assignees: [{ name: "MH", color: people.MH }], due: "Oct 14", priority: "medium", comments: 4, attachments: 2, subtasks: { done: 0, total: 8 } },
      { id: "MTV-102", title: "Audit log export to S3", description: "Stream audit events to customer-owned S3 buckets with configurable retention policies.", labels: ["Backend", "Docs"], assignees: [{ name: "DK", color: people.DK }], due: "Oct 22", priority: "low", comments: 1, attachments: 0, subtasks: { done: 0, total: 3 } },
      { id: "MTV-103", title: "Customer research interviews", description: "Schedule and conduct 12 user interviews with enterprise customers about reporting needs.", labels: ["Research"], assignees: [{ name: "LP", color: people.LP }, { name: "SC", color: people.SC }], due: "Oct 30", priority: "low", comments: 7, attachments: 1, subtasks: { done: 0, total: 5 } },
    ],
  },
  {
    id: "progress", title: "In Progress", color: "bg-info", cards: [
      { id: "MTV-094", title: "OAuth2 PKCE flow for mobile", description: "Implement PKCE-based OAuth2 flow for the React Native mobile app. Replaces the legacy implicit flow.", labels: ["Feature", "Frontend"], assignees: [{ name: "MH", color: people.MH }], due: "Oct 8", priority: "high", comments: 12, attachments: 3, subtasks: { done: 4, total: 6 } },
      { id: "MTV-096", title: "Dashboard sidebar redesign", description: "Implement the new collapsible sidebar with icon-rail mode. Includes animation polish and keyboard shortcut (Cmd+B).", labels: ["Design", "Frontend"], assignees: [{ name: "SC", color: people.SC }], due: "Oct 7", priority: "medium", comments: 6, attachments: 4, subtasks: { done: 3, total: 5 } },
    ],
  },
  {
    id: "review", title: "In Review", color: "bg-warning", cards: [
      { id: "MTV-088", title: "Invoice PDF generator v2", description: "Rewrite the invoice PDF pipeline using Puppeteer. Supports custom branding, multi-page layouts, and line-item tax.", labels: ["Backend", "Feature"], assignees: [{ name: "MH", color: people.MH }, { name: "DK", color: people.DK }], due: "Oct 5", priority: "high", comments: 9, attachments: 2, subtasks: { done: 7, total: 7 } },
      { id: "MTV-090", title: "Empty states & loading skeletons", description: "Replace all loading spinners with skeleton placeholders across the dashboard. Adds 14 illustrated empty states.", labels: ["Design", "Frontend"], assignees: [{ name: "SC", color: people.SC }], due: "Oct 4", priority: "low", comments: 3, attachments: 8, subtasks: { done: 5, total: 5 } },
    ],
  },
  {
    id: "done", title: "Done", color: "bg-success", cards: [
      { id: "MTV-082", title: "Stripe webhook idempotency", description: "Make webhook handlers idempotent using a deduplication table. Prevents duplicate processing of retried events.", labels: ["Bug", "Backend"], assignees: [{ name: "MH", color: people.MH }], due: "Sep 28", priority: "urgent", comments: 5, attachments: 1, subtasks: { done: 4, total: 4 } },
      { id: "MTV-085", title: "Settings page IA overhaul", description: "Restructure settings into 6 logical sections with sticky sub-nav. Adds breadcrumb support.", labels: ["Frontend"], assignees: [{ name: "JR", color: people.JR }], due: "Sep 30", priority: "medium", comments: 2, attachments: 0, subtasks: { done: 6, total: 6 } },
      { id: "MTV-086", title: "API rate limiting middleware", description: "Per-key rate limiting with sliding window. Returns 429 with Retry-After header.", labels: ["Backend", "Docs"], assignees: [{ name: "DK", color: people.DK }], due: "Oct 1", priority: "high", comments: 8, attachments: 2, subtasks: { done: 5, total: 5 } },
    ],
  },
];

const colOrder = ["backlog", "progress", "review", "done"];

export default function KanbanApp() {
  const [cols, setCols] = useState<Column[]>(initialCols);
  const [addOpen, setAddOpen] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState<Card["priority"]>("medium");
  const [newLabel, setNewLabel] = useState("Feature");
  const [newAssignee, setNewAssignee] = useState("MH");

  const allCards = cols.flatMap((c) => c.cards);
  const doneCount = cols.find((c) => c.id === "done")!.cards.length;
  const inProgressCount = cols.find((c) => c.id === "progress")!.cards.length;

  const move = (cardId: string, dir: -1 | 1) => {
    setCols((prev) => {
      const next = prev.map((c) => ({ ...c, cards: [...c.cards] }));
      let fromIdx = -1;
      let card: Card | undefined;
      for (let i = 0; i < next.length; i++) {
        const idx = next[i].cards.findIndex((x) => x.id === cardId);
        if (idx !== -1) { fromIdx = i; card = next[i].cards[idx]; break; }
      }
      if (!card || fromIdx === -1) return prev;
      const toIdx = fromIdx + dir;
      if (toIdx < 0 || toIdx >= next.length) return prev;
      next[fromIdx].cards = next[fromIdx].cards.filter((x) => x.id !== cardId);
      next[toIdx].cards.unshift(card);
      const stageLabel = colOrder[toIdx] === "done" ? "Done" : next[toIdx].title;
      toast.message(`Moved to ${stageLabel}`, { description: card.title });
      return next;
    });
  };

  const addCard = () => {
    const colId = addOpen!;
    if (!newTitle.trim()) { toast.error("Title required"); return; }
    const newCard: Card = {
      id: `MTV-${Math.floor(Math.random() * 9000) + 1000}`, title: newTitle.trim(),
      description: newDesc.trim() || "No description", labels: [newLabel],
      assignees: [{ name: newAssignee, color: people[newAssignee] }], due: "Oct 15",
      priority: newPriority, comments: 0, attachments: 0, subtasks: { done: 0, total: 0 },
    };
    setCols((prev) => prev.map((c) => c.id === colId ? { ...c, cards: [newCard, ...c.cards] } : c));
    setNewTitle(""); setNewDesc(""); setNewPriority("medium"); setNewLabel("Feature"); setNewAssignee("MH");
    setAddOpen(null);
    toast.success("Card added", { description: newCard.title });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kanban Board"
        description="Track work across backlog, progress, review, and done."
        breadcrumbs={[{ label: "Apps" }, { label: "Kanban" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Users className="size-4 mr-2" /> Members</Button>
            <Button size="sm" className="h-9"><LayoutGrid className="size-4 mr-2" /> Board</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Cards" value={allCards.length} icon={<LayoutGrid className="size-5" />} footer={`${cols.reduce((a, c) => a + c.cards.length, 0)} across 4 columns`} />
        <StatCard label="In Progress" value={inProgressCount} icon={<Circle className="size-5" />} footer="Active work in flight" />
        <StatCard label="In Review" value={cols.find((c) => c.id === "review")!.cards.length} icon={<Clock className="size-5" />} footer="Awaiting approval" />
        <StatCard label="Completed" value={doneCount} icon={<CheckCircle2 className="size-5" />} footer="Done this sprint" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cols.map((col, ci) => (
          <div key={col.id} className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${col.color}`} />
                <span className="text-sm font-semibold">{col.title}</span>
                <Badge variant="outline" className="text-[10px] h-5 px-1.5">{col.cards.length}</Badge>
              </div>
              <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" onClick={() => setAddOpen(col.id)}>
                <Plus className="size-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 max-h-[calc(100vh-440px)]">
              <div className="p-2.5 space-y-2.5">
                {col.cards.map((card) => (
                  <div key={card.id} className="group relative rounded-lg border border-border bg-background p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono text-muted-foreground">{card.id}</span>
                      <Badge variant="outline" className={`text-[9px] h-4 px-1 font-medium capitalize ${priorityStyles[card.priority]}`}>{card.priority}</Badge>
                    </div>
                    <p className="text-sm font-medium leading-snug mb-1.5">{card.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2.5">{card.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {card.labels.map((l) => (
                        <Badge key={l} variant="outline" className={`text-[9px] h-4 px-1 font-normal ${labelStyles[l]}`}>{l}</Badge>
                      ))}
                    </div>
                    {card.subtasks.total > 0 && (
                      <div className="flex items-center gap-1.5 mb-2.5 text-[10px] text-muted-foreground">
                        <CheckCircle2 className="size-3" /> {card.subtasks.done}/{card.subtasks.total} subtasks
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        {card.due && <span className="flex items-center gap-1"><Calendar className="size-3" />{card.due}</span>}
                        {card.comments > 0 && <span className="flex items-center gap-1"><MessageSquare className="size-3" />{card.comments}</span>}
                        {card.attachments > 0 && <span className="flex items-center gap-1"><Paperclip className="size-3" />{card.attachments}</span>}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-1.5">
                          {card.assignees.map((a, i) => (
                            <Avatar key={i} className="size-5 border-2 border-background"><AvatarFallback className={`text-[8px] font-semibold ${a.color}`}>{a.name}</AvatarFallback></Avatar>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Move buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                      {ci > 0 && (
                        <Button size="icon" variant="secondary" className="size-6 shadow-md" onClick={() => move(card.id, -1)} title="Move left">
                          <ChevronLeft className="size-3.5" />
                        </Button>
                      )}
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                      {ci < cols.length - 1 && (
                        <Button size="icon" variant="secondary" className="size-6 shadow-md" onClick={() => move(card.id, 1)} title="Move right">
                          <ChevronRight className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-muted-foreground h-8" onClick={() => setAddOpen(col.id)}>
                  <Plus className="size-3.5 mr-1.5" /> Add card
                </Button>
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>

      <Dialog open={!!addOpen} onOpenChange={(o) => setAddOpen(o ? addOpen : null)}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Add new card</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Title</Label>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What needs to be done?" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Description</Label>
              <Textarea rows={3} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Add more context…" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Priority</Label>
                <Select value={newPriority} onValueChange={(v) => setNewPriority(v as Card["priority"])}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Label</Label>
                <Select value={newLabel} onValueChange={setNewLabel}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(labelStyles).map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Assignee</Label>
                <Select value={newAssignee} onValueChange={setNewAssignee}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(people).map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(null)}>Cancel</Button>
            <Button onClick={addCard}><Plus className="size-4 mr-2" /> Add card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
