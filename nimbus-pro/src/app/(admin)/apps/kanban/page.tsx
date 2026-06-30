"use client";
import { useState } from "react";
import { PageHeader, Card, Badge, Button, IconButton, AvatarGroup, SearchInput, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui";
import { KANBAN_COLUMNS } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Plus, Filter, Settings, MessageSquare, Paperclip, Calendar,
  GripVertical, Star, Eye, Share2, LayoutDashboard, ChevronDown
} from "lucide-react";

const PRIORITY_TONE: Record<string, "error" | "warning" | "brand" | "gray"> = {
  urgent: "error",
  high: "warning",
  medium: "brand",
  low: "gray",
};

const COLUMN_HEADER_COLOR: Record<string, string> = {
  gray: "bg-gray-400",
  brand: "bg-brand-500",
  warning: "bg-warning-500",
  purple: "bg-purple-500",
  success: "bg-success-500",
};

const TAG_BG: Record<string, string> = {
  frontend: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
  backend: "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
  ai: "bg-pink-50 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
  auth: "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-300",
  performance: "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  theme: "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-300",
  charts: "bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300",
  ux: "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300",
  brand: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
};

const MEMBERS = ["Aaroh Sharma", "Priya Iyer", "Marcus Chen", "Sofia García", "Yuki Tanaka"];

export default function KanbanPage() {
  const [search, setSearch] = useState("");
  const [columns] = useState(KANBAN_COLUMNS);

  const totalCards = columns.reduce((s, c) => s + c.cards.length, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Nimbus Pro v3.0"
        description={`${totalCards} tasks across ${columns.length} columns · Last updated 12m ago`}
        breadcrumbs={[{ label: "Apps" }, { label: "Kanban" }, { label: "Nimbus Pro v3.0" }]}
        actions={
          <>
            <Button variant="secondary"><Share2 className="h-4 w-4" /> Share</Button>
            <Button><Plus className="h-4 w-4" /> New task</Button>
          </>
        }
      />

      {/* Toolbar */}
      <Card className="p-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <SearchInput value={search} onChange={setSearch} placeholder="Search tasks..." className="w-full sm:w-72" />
            <DropdownMenu
              trigger={
                <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Filters <ChevronDown className="h-3 w-3" /></Button>
              }
            >
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuItem>Assigned to me</DropdownMenuItem>
              <DropdownMenuItem>Due this week</DropdownMenuItem>
              <DropdownMenuItem>High priority</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Clear filters</DropdownMenuItem>
            </DropdownMenu>
            <DropdownMenu
              trigger={
                <Button variant="outline" size="sm"><Star className="h-3.5 w-3.5" /> Priority <ChevronDown className="h-3 w-3" /></Button>
              }
            >
              <DropdownMenuLabel>Priority</DropdownMenuLabel>
              {["Urgent", "High", "Medium", "Low"].map((p) => (
                <DropdownMenuItem key={p}>{p}</DropdownMenuItem>
              ))}
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <AvatarGroup users={MEMBERS.map((m) => ({ name: m }))} max={4} size={28} />
            <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
            <IconButton aria-label="Layout"><LayoutDashboard className="h-4 w-4" /></IconButton>
            <IconButton aria-label="Settings"><Settings className="h-4 w-4" /></IconButton>
          </div>
        </div>
      </Card>

      {/* Board */}
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max gap-4">
          {columns.map((col) => (
            <div key={col.id} className="w-[300px] shrink-0">
              {/* Column header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", COLUMN_HEADER_COLOR[col.color])} />
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{col.title}</h3>
                  <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    {col.cards.length}
                  </span>
                </div>
                <IconButton aria-label="Add card" className="h-7 w-7"><Plus className="h-3.5 w-3.5" /></IconButton>
              </div>

              {/* Cards */}
              <div className="space-y-2.5">
                {col.cards.map((card) => (
                  <Card key={card.id} hover className="group cursor-grab p-3 active:cursor-grabbing">
                    <div className="flex items-start justify-between">
                      <Badge tone={PRIORITY_TONE[card.priority]} variant="soft" className="capitalize">{card.priority}</Badge>
                      <div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100">
                        <GripVertical className="h-3.5 w-3.5 text-gray-300" />
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{card.title}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {card.tags.map((t) => (
                        <span key={t} className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-semibold", TAG_BG[t] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300")}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-2.5 dark:border-gray-800/50">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {card.due}</span>
                        {card.comments > 0 && (
                          <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {card.comments}</span>
                        )}
                        {card.attachments > 0 && (
                          <span className="flex items-center gap-1"><Paperclip className="h-3 w-3" /> {card.attachments}</span>
                        )}
                      </div>
                      <AvatarGroup users={card.assignees.map((a) => ({ name: a }))} max={2} size={22} />
                    </div>
                  </Card>
                ))}

                {/* Add card */}
                <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 py-2.5 text-xs font-semibold text-gray-500 transition-colors hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-600 dark:border-gray-700 dark:hover:border-brand-700 dark:hover:bg-brand-500/10 dark:hover:text-brand-400">
                  <Plus className="h-3.5 w-3.5" /> Add card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Board summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total tasks", value: totalCards, icon: LayoutDashboard, tone: "brand" as const },
          { label: "In progress", value: columns.find((c) => c.id === "in_progress")?.cards.length ?? 0, icon: Eye, tone: "warning" as const },
          { label: "In review", value: columns.find((c) => c.id === "review")?.cards.length ?? 0, icon: Star, tone: "purple" as const },
          { label: "Completed", value: columns.find((c) => c.id === "done")?.cards.length ?? 0, icon: MessageSquare, tone: "success" as const },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-3 p-4">
            <div className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl",
              s.tone === "brand" && "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
              s.tone === "warning" && "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
              s.tone === "purple" && "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
              s.tone === "success" && "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400"
            )}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
