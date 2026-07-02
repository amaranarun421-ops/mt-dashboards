import * as React from "react";
import { Plus, MoreHorizontal, Calendar, MessageSquare, Paperclip, Flag } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";

const columns = [
  {
    id: "backlog",
    title: "Backlog",
    color: "bg-gray-100 dark:bg-gray-800-foreground",
    count: 8,
    cards: [
      { id: "TSK-1290", title: "Research competitor pricing tiers", priority: "low", due: "Jul 8", assignees: ["https://i.pravatar.cc/24?img=1"], comments: 2, attachments: 0, tags: ["Research"] },
      { id: "TSK-1289", title: "Write blog post about new features", priority: "medium", due: "Jul 6", assignees: ["https://i.pravatar.cc/24?img=2"], comments: 0, attachments: 1, tags: ["Content"] },
      { id: "TSK-1288", title: "Update onboarding flow documentation", priority: "low", due: "Jul 10", assignees: ["https://i.pravatar.cc/24?img=3"], comments: 4, attachments: 2, tags: ["Docs"] },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "bg-blue-light-500",
    count: 5,
    cards: [
      { id: "TSK-1287", title: "Design new pricing page hero section", priority: "high", due: "Jul 4", assignees: ["https://i.pravatar.cc/24?img=4", "https://i.pravatar.cc/24?img=5"], comments: 6, attachments: 3, tags: ["Design", "Marketing"] },
      { id: "TSK-1286", title: "Implement OAuth integration with Google", priority: "high", due: "Jul 5", assignees: ["https://i.pravatar.cc/24?img=6"], comments: 2, attachments: 0, tags: ["Backend"] },
      { id: "TSK-1285", title: "Set up analytics event tracking", priority: "medium", due: "Jul 7", assignees: ["https://i.pravatar.cc/24?img=7"], comments: 1, attachments: 1, tags: ["Analytics"] },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-warning-500",
    count: 4,
    cards: [
      { id: "TSK-1284", title: "Build dark mode theme system", priority: "high", due: "Today", assignees: ["https://i.pravatar.cc/24?img=8", "https://i.pravatar.cc/24?img=9", "https://i.pravatar.cc/24?img=10"], comments: 12, attachments: 4, tags: ["Frontend", "Design"] },
      { id: "TSK-1283", title: "Refactor authentication middleware", priority: "medium", due: "Tomorrow", assignees: ["https://i.pravatar.cc/24?img=11"], comments: 3, attachments: 0, tags: ["Backend"] },
      { id: "TSK-1282", title: "Create component library documentation", priority: "low", due: "Jul 6", assignees: ["https://i.pravatar.cc/24?img=12"], comments: 0, attachments: 2, tags: ["Docs"] },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "bg-brand-500",
    count: 3,
    cards: [
      { id: "TSK-1281", title: "API rate limiting implementation", priority: "high", due: "Jul 4", assignees: ["https://i.pravatar.cc/24?img=13"], comments: 8, attachments: 1, tags: ["Backend", "Security"] },
      { id: "TSK-1280", title: "Landing page A/B test variants", priority: "medium", due: "Jul 5", assignees: ["https://i.pravatar.cc/24?img=14"], comments: 4, attachments: 3, tags: ["Marketing"] },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "bg-success-500",
    count: 12,
    cards: [
      { id: "TSK-1279", title: "Set up CI/CD pipeline", priority: "high", due: "Done", assignees: ["https://i.pravatar.cc/24?img=15"], comments: 5, attachments: 2, tags: ["DevOps"] },
      { id: "TSK-1278", title: "Migrate database to PostgreSQL", priority: "high", due: "Done", assignees: ["https://i.pravatar.cc/24?img=16", "https://i.pravatar.cc/24?img=17"], comments: 9, attachments: 1, tags: ["Backend"] },
      { id: "TSK-1277", title: "Design system color palette", priority: "low", due: "Done", assignees: ["https://i.pravatar.cc/24?img=18"], comments: 2, attachments: 4, tags: ["Design"] },
    ],
  },
];

const priorityVariants: Record<string, string> = {
  high: "error",
  medium: "warning",
  low: "info",
};
const tagColors: Record<string, string> = {
  Design: "bg-brand-500/10 text-brand-500",
  Backend: "bg-blue-light-500/10 text-blue-light-500",
  Frontend: "bg-success-500/10 text-success-600 dark:text-success-500",
  Marketing: "bg-warning-500/10 text-warning-600 dark:text-orange-400",
  Docs: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
  Research: "bg-error-500/10 text-error-600 dark:text-error-500",
  Content: "bg-brand-500/10 text-brand-500",
  Analytics: "bg-blue-light-500/10 text-blue-light-500",
  Security: "bg-error-500/10 text-error-600 dark:text-error-500",
  DevOps: "bg-success-500/10 text-success-600 dark:text-success-500",
};

export function KanbanPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "Kanban Board"]}
        title="Project Board"
        description="Drag-and-drop task management for agile teams."
        actions={
          <>
            <Button variant="outline" size="sm">Filter</Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Task</Button>
          </>
        }
      />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.id} className="flex w-72 shrink-0 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                <h3 className="text-sm font-bold uppercase tracking-wider">{col.title}</h3>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 px-1.5 text-xs font-bold text-gray-500 dark:text-gray-400">{col.count}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="flex-1 space-y-2.5">
              {col.cards.map((card) => (
                <Card key={card.id} className="card-hover cursor-pointer p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-gray-500 dark:text-gray-400">{card.id}</span>
                    <span className="ml-auto"><StatusBadge variant={priorityVariants[card.priority] as any}>{card.priority}</StatusBadge></span>
                  </div>
                  <p className="mb-2 text-sm font-semibold leading-snug">{card.title}</p>
                  <div className="mb-3 flex flex-wrap gap-1">
                    {card.tags.map((t) => (
                      <span key={t} className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${tagColors[t] || "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-border/60 pt-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{card.due}</span>
                      {card.comments > 0 && <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{card.comments}</span>}
                      {card.attachments > 0 && <span className="flex items-center gap-1"><Paperclip className="h-3 w-3" />{card.attachments}</span>}
                    </div>
                    <div className="flex -space-x-2">
                      {card.assignees.map((a, idx) => (
                        <Avatar key={idx} className="h-5 w-5 border-2 border-card"><AvatarImage src={a} /><AvatarFallback className="text-[8px]">U</AvatarFallback></Avatar>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
              <button className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-gray-500 dark:text-gray-400 transition hover:border-brand-500/40 hover:bg-gray-100 dark:bg-gray-800/30 hover:text-brand-500">
                <Plus className="h-3.5 w-3.5" /> Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
