"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

type Card = { id: number; title: string; description?: string; priority: "low" | "medium" | "high"; assignee: number; tags?: string[] };
type Column = { id: string; title: string; color: string; cards: Card[] };

const initialColumns: Column[] = [
  {
    id: "backlog", title: "Backlog", color: "bg-gray-400",
    cards: [
      { id: 1, title: "Refactor auth module", description: "Split into smaller composable hooks", priority: "medium", assignee: 4, tags: ["tech-debt"] },
      { id: 2, title: "Research new analytics vendor", priority: "low", assignee: 5 },
      { id: 3, title: "Update onboarding flow copy", description: "Marketing provided new copy", priority: "medium", assignee: 6, tags: ["copy"] },
    ],
  },
  {
    id: "todo", title: "To Do", color: "bg-primary",
    cards: [
      { id: 4, title: "Build settings page", description: "Tabbed interface with profile, security, notifications", priority: "high", assignee: 1, tags: ["frontend"] },
      { id: 5, title: "API rate limiting", priority: "high", assignee: 2, tags: ["backend","security"] },
    ],
  },
  {
    id: "progress", title: "In Progress", color: "bg-warning",
    cards: [
      { id: 6, title: "Redesign dashboard charts", description: "Use new gradient style", priority: "medium", assignee: 3, tags: ["design"] },
      { id: 7, title: "Implement WebSocket notifications", priority: "high", assignee: 1, tags: ["realtime"] },
    ],
  },
  {
    id: "review", title: "Review", color: "bg-info",
    cards: [
      { id: 8, title: "Q3 budget approval", priority: "medium", assignee: 4 },
    ],
  },
  {
    id: "done", title: "Done", color: "bg-success",
    cards: [
      { id: 9, title: "User profile page", priority: "low", assignee: 5, tags: ["frontend"] },
      { id: 10, title: "Email templates", priority: "medium", assignee: 6 },
      { id: 11, title: "Database backup automation", priority: "high", assignee: 2, tags: ["devops"] },
    ],
  },
];

const priorityColors = { low: "lightInfo", medium: "lightWarning", high: "lightError" } as const;

const KanbanPage = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedCard, setDraggedCard] = useState<{ cardId: number; fromCol: string } | null>(null);

  const onDragStart = (cardId: number, fromCol: string) => setDraggedCard({ cardId, fromCol });
  const onDrop = (toCol: string) => {
    if (!draggedCard) return;
    setColumns((cols) => {
      const from = cols.find((c) => c.id === draggedCard.fromCol);
      const to = cols.find((c) => c.id === toCol);
      if (!from || !to) return cols;
      const card = from.cards.find((c) => c.id === draggedCard.cardId);
      if (!card) return cols;
      return cols.map((c) => {
        if (c.id === from.id) return { ...c, cards: c.cards.filter((x) => x.id !== card.id) };
        if (c.id === to.id) return { ...c, cards: [...c.cards, card] };
        return c;
      });
    });
    setDraggedCard(null);
  };

  return (
    <PageContainer
      title="Kanban Board"
      description="Drag-and-drop task management. Drop cards across columns to update status."
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:filter-bold-duotone" width={14} /> Filter</Button>
          <Button size="sm" className="gap-1.5"><Icon icon="solar:add-circle-bold" width={14} /> New Task</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {columns.map((col) => (
          <div key={col.id} className="rounded-xl bg-lightgray/60 dark:bg-dark/40 p-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(col.id)}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                <h6 className="font-semibold text-sm">{col.title}</h6>
                <span className="text-xs opacity-60">{col.cards.length}</span>
              </div>
              <button className="opacity-50 hover:opacity-100"><Icon icon="solar:add-circle-bold" width={16} /></button>
            </div>

            <div className="space-y-2 min-h-[200px]">
              {col.cards.map((card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => onDragStart(card.id, col.id)}
                  className="bg-background rounded-lg p-3 shadow-xs border border-defaultBorder cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-medium leading-snug">{card.title}</p>
                    <button className="opacity-40 hover:opacity-100"><Icon icon="solar:pen-linear" width={14} /></button>
                  </div>
                  {card.description && <p className="text-xs opacity-70 mb-2 line-clamp-2">{card.description}</p>}
                  {card.tags && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {card.tags.map((t) => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-lightprimary text-primary">{t}</span>)}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-defaultBorder">
                    <Badge variant={priorityColors[card.priority]} className="text-[10px] capitalize">{card.priority}</Badge>
                    <Avatar className="h-6 w-6"><AvatarImage src={`/images/profile/user-${card.assignee}.jpg`} /><AvatarFallback>U</AvatarFallback></Avatar>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-xs opacity-50 hover:opacity-100 hover:bg-background rounded-lg border border-dashed border-defaultBorder flex items-center justify-center gap-1">
                <Icon icon="solar:add-circle-bold" width={14} /> Add Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default KanbanPage;
