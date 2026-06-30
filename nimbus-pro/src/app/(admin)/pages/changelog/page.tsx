"use client";
import { useMemo, useState } from "react";
import { Card, Badge, Button, PageHeader } from "@/components/ui";
import { CHANGELOG } from "@/data/mock";
import { cn } from "@/lib/utils";
import { GitCommit, Rocket, Wrench, Bug, Tag, ArrowUpRight, Rss } from "lucide-react";

type Tag = "major" | "minor" | "patch";

const FILTERS: { id: Tag | "all"; label: string; icon: typeof Tag }[] = [
  { id: "all", label: "All releases", icon: GitCommit },
  { id: "major", label: "Major", icon: Rocket },
  { id: "minor", label: "Minor", icon: Wrench },
  { id: "patch", label: "Patches", icon: Bug },
];

const TAG_META: Record<Tag, { tone: "brand" | "purple" | "warning" | "success" | "pink"; icon: typeof Rocket; label: string }> = {
  major: { tone: "brand", icon: Rocket, label: "Major" },
  minor: { tone: "purple", icon: Wrench, label: "Minor" },
  patch: { tone: "warning", icon: Bug, label: "Patch" },
};

// Extra releases locally so the timeline reads richly while still anchored by CHANGELOG mock.
const EXTRA: { version: string; date: string; tag: Tag; items: string[] }[] = [
  { version: "2.4.1", date: "Mar 18, 2026", tag: "patch", items: ["Patched keyboard trap in command palette", "Fixed avatar grouping on Safari"] },
  { version: "2.4.0", date: "Mar 04, 2026", tag: "minor", items: ["New file manager app", "Infinite scroll for data tables", "Improved accessibility on all modals"] },
  { version: "2.3.0", date: "Feb 10, 2026", tag: "minor", items: ["Added logistics & finance dashboards", "Theme customizer v2 with palettes", "Toast notifications overhaul"] },
];

const ALL_RELEASES = [...CHANGELOG, ...EXTRA].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function ChangelogPage() {
  const [filter, setFilter] = useState<Tag | "all">("all");

  const releases = useMemo(() => {
    if (filter === "all") return ALL_RELEASES;
    return ALL_RELEASES.filter((r) => r.tag === filter);
  }, [filter]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Changelog"
        description="Every improvement, fix, and milestone — newest first."
        breadcrumbs={[{ label: "Pages" }, { label: "Changelog" }]}
        actions={
          <Button variant="outline">
            <Rss className="h-4 w-4" /> Subscribe via RSS
          </Button>
        }
      />

      {/* ============ Filter pills ============ */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const Icon = f.icon;
          const active = filter === f.id;
          const count = f.id === "all"
            ? ALL_RELEASES.length
            : ALL_RELEASES.filter((r) => r.tag === f.id).length;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                active
                  ? "bg-brand-500 text-white shadow-theme-sm"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:text-brand-600 hover:ring-brand-300 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800 dark:hover:text-brand-400"
              )}
            >
              <Icon className="h-4 w-4" /> {f.label}
              <span className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                active ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============ Timeline ============ */}
      <div className="relative">
        <div className="absolute left-4 top-2 h-full w-px bg-gray-200 dark:bg-gray-800 sm:left-5" />
        <div className="space-y-6">
          {releases.map((r, i) => {
            const meta = TAG_META[r.tag as Tag];
            const Icon = meta.icon;
            return (
              <div key={`${r.version}-${i}`} className="relative pl-12 sm:pl-16">
                {/* Node */}
                <div className={cn(
                  "absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-xl ring-4 ring-white dark:ring-gray-900",
                  meta.tone === "brand" && "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
                  meta.tone === "purple" && "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
                  meta.tone === "warning" && "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
                  meta.tone === "success" && "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
                  meta.tone === "pink" && "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400"
                )}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <Card hover className="p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      v{r.version}
                    </h3>
                    <Badge tone={meta.tone} variant="soft">
                      <Tag className="h-3 w-3" /> {meta.label}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {r.date}
                    </span>
                    <button className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                      Release notes <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {r.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============ Footer note ============ */}
      <Card className="flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Looking for older releases?
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Browse the full archive on GitHub, dating back to v1.0 in 2022.
          </p>
        </div>
        <Button variant="outline" className="shrink-0">
          View on GitHub <ArrowUpRight className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
}
