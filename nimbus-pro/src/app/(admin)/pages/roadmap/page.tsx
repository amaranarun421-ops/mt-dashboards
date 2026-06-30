"use client";
import { useState } from "react";
import { Card, Badge, Button, PageHeader } from "@/components/ui";
import { ROADMAP } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Compass, Sparkles, CheckCircle2, ThumbsUp, ArrowUpRight, Lightbulb,
  Loader, CalendarDays, Megaphone
} from "lucide-react";

type Status = "research" | "in_progress" | "planned";

type RoadmapItem = {
  title: string;
  status: Status;
  desc: string;
  quarter: string;
  votes: number;
};

const COLUMNS: { id: Status; label: string; desc: string; icon: typeof Compass; tone: "purple" | "brand" | "success" }[] = [
  { id: "research", label: "Exploring", desc: "Ideas we are researching and prototyping", icon: Lightbulb, tone: "purple" },
  { id: "in_progress", label: "In progress", desc: "Currently being built by the team", icon: Loader, tone: "brand" },
  { id: "planned", label: "Up next", desc: "Scoped and on the roadmap", icon: CalendarDays, tone: "success" },
];

const TONE_HEADER: Record<string, string> = {
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
};

const TONE_DOT: Record<string, string> = {
  purple: "bg-purple-500",
  brand: "bg-brand-500",
  success: "bg-success-500",
};

// Items shipped in prior quarters, shown in a "Shipped" footer rail.
const SHIPPED = [
  { title: "Theme customizer v2", quarter: "Q1 2026" },
  { title: "Command palette (Cmd+K)", quarter: "Q1 2026" },
  { title: "AI dashboard (beta)", quarter: "Q2 2026" },
  { title: "Kanban board app", quarter: "Q2 2026" },
];

// Seed the roadmap from the mock, then add a few local items so each column is full.
function buildItems(): RoadmapItem[] {
  const seed: RoadmapItem[] = [];
  ROADMAP.forEach((q) => {
    q.items.forEach((it) => {
      seed.push({
        title: it.title,
        status: it.status as Status,
        desc: it.desc,
        quarter: q.quarter,
        votes: Math.floor(Math.random() * 400) + 30,
      });
    });
  });
  // Local additions to balance the board
  const extras: RoadmapItem[] = [
    { title: "Webhooks v2", status: "research", desc: "Granular event subscriptions with retries and signing.", quarter: "Q4 2026", votes: 142 },
    { title: "Audit log streaming", status: "in_progress", desc: "SIEM-friendly webhook delivery with back-pressure handling.", quarter: "Q3 2026", votes: 88 },
    { title: "Saved views & filters", status: "planned", desc: "Bookmark, share, and pin filtered table views per workspace.", quarter: "Q3 2026", votes: 76 },
    { title: "Keyboard-first navigation", status: "planned", desc: "Homerow navigation across tables, lists, and menus.", quarter: "Q4 2026", votes: 64 },
  ];
  return [...seed, ...extras];
}

export default function RoadmapPage() {
  const [items, setItems] = useState<RoadmapItem[]>(() => buildItems());
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const onVote = (title: string) => {
    if (voted[title]) return;
    setVoted((v) => ({ ...v, [title]: true }));
    setItems((arr) =>
      arr.map((it) => (it.title === title ? { ...it, votes: it.votes + 1 } : it))
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Public roadmap"
        description="See what we are building next — and vote on what matters most to you."
        breadcrumbs={[{ label: "Pages" }, { label: "Roadmap" }]}
        actions={
          <Button variant="outline">
            <Megaphone className="h-4 w-4" /> Submit a feature request
          </Button>
        }
      />

      {/* ============ Board ============ */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {COLUMNS.map((col) => {
          const Icon = col.icon;
          const colItems = items.filter((it) => it.status === col.id);
          return (
            <div key={col.id} className="flex flex-col gap-4">
              {/* Column header */}
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", TONE_HEADER[col.tone])}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{col.label}</h3>
                    <span className={cn("h-1.5 w-1.5 rounded-full", TONE_DOT[col.tone])} />
                    <span className="text-xs text-gray-400 dark:text-gray-500">{colItems.length}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{col.desc}</p>
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {colItems.map((it) => {
                  const isVoted = !!voted[it.title];
                  return (
                    <Card key={it.title} hover className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <Badge tone="gray" variant="soft">
                          {it.quarter}
                        </Badge>
                        <button
                          onClick={() => onVote(it.title)}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all",
                            isVoted
                              ? "bg-brand-500 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-500/15 dark:hover:text-brand-400"
                          )}
                          aria-pressed={isVoted}
                          aria-label={`Vote for ${it.title}`}
                        >
                          <ThumbsUp className={cn("h-3 w-3", isVoted && "fill-current")} />
                          {it.votes}
                        </button>
                      </div>
                      <h4 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                        {it.title}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        {it.desc}
                      </p>
                      {isVoted && (
                        <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
                          <CheckCircle2 className="h-3 w-3" /> You voted for this
                        </p>
                      )}
                    </Card>
                  );
                })}
                {colItems.length === 0 && (
                  <Card className="p-6 text-center text-xs text-gray-500 dark:text-gray-400">
                    Nothing here yet.
                  </Card>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ============ Shipped rail ============ */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-500" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recently shipped</h3>
        </div>
        <Card className="p-0">
          <div className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-800 sm:grid-cols-2 sm:divide-y-0 sm:[&>*:nth-child(odd)]:border-r sm:[&>*]:border-gray-100 sm:dark:[&>*]:border-gray-800 lg:grid-cols-4 lg:[&>*]:border-r lg:dark:[&>*]:border-gray-800 lg:[&>*:last-child]:border-r-0">
            {SHIPPED.map((s) => (
              <div key={s.title} className="flex items-center gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{s.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.quarter}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ============ Footer CTA ============ */}
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-brand-500 to-accent-500 p-8 text-white lg:p-10">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Have an idea?</h2>
              <p className="mt-1 max-w-md text-sm text-white/85">
                Feature requests with the most community votes get prioritized every quarter.
                Tell us what would make Nimbus Pro better.
              </p>
            </div>
          </div>
          <Button variant="secondary" className="shrink-0">
            Submit request <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
