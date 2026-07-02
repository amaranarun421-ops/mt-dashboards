"use client";

import * as React from "react";
import { Search, FileText, User, Image as ImageIcon, Video, MessageSquare, Clock } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const results = [
  { type: "page", icon: FileText, title: "Analytics Dashboard Documentation", desc: "Learn how to use the analytics dashboard to track key metrics, create custom reports, and export data for offline analysis.", url: "/docs/analytics", meta: "Updated 2 days ago · 8 min read" },
  { type: "user", icon: User, title: "Sarah Chen - Senior Designer", desc: "Sarah is a senior designer on the Nexus Pro team, specializing in dashboard UI and data visualization.", url: "/team/sarah-chen", meta: "Member since 2024 · 142 contributions" },
  { type: "file", icon: ImageIcon, title: "Q3 Marketing Assets.zip", desc: "Collection of marketing materials including brand guidelines, logos, and templates for Q3 campaigns.", url: "/files/marketing", meta: "42 MB · 28 files" },
  { type: "page", icon: FileText, title: "API Authentication Guide", desc: "Comprehensive guide on how to authenticate with the Nexus Pro API using OAuth 2.0 and API keys.", url: "/docs/api-auth", meta: "Updated 1 week ago · 12 min read" },
  { type: "video", icon: Video, title: "Product Demo: New Analytics Features", desc: "Watch a 10-minute walkthrough of the latest analytics features including cohort analysis and funnel charts.", url: "/videos/demo", meta: "10:24 · 1.2K views" },
  { type: "conversation", icon: MessageSquare, title: "Discussion: Dark mode implementation", desc: "Team discussion about the dark mode color palette and accessibility considerations.", url: "/chat/dark-mode", meta: "24 messages · Active 3h ago" },
];

const typeColors: Record<string, string> = {
  page: "bg-brand-50 text-brand-500 dark:bg-brand-500/15",
  user: "bg-success-50 text-success-600 dark:bg-success-500/15",
  file: "bg-warning-50 text-warning-600 dark:bg-warning-500/15",
  video: "bg-error-50 text-error-600 dark:bg-error-500/15",
  conversation: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15",
};

export function SearchResults() {
  const [query, setQuery] = React.useState("analytics");
  const [filter, setFilter] = React.useState("all");
  const filtered = filter === "all" ? results : results.filter(r => r.type === filter);

  return (
    <div>
      <PageHeader breadcrumb={["Pages", "Search Results"]} title="Search Results" description={`Showing results for "${query}"`} />
      <Card className="mb-6 p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search everything..." className="pl-9 h-11" /></div>
      </Card>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 sticky top-20">
            <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">Filter by Type</h3>
            <div className="space-y-1">
              {[
                { key: "all", label: "All Results", count: results.length },
                { key: "page", label: "Pages", count: results.filter(r=>r.type==="page").length },
                { key: "user", label: "People", count: results.filter(r=>r.type==="user").length },
                { key: "file", label: "Files", count: results.filter(r=>r.type==="file").length },
                { key: "video", label: "Videos", count: results.filter(r=>r.type==="video").length },
                { key: "conversation", label: "Conversations", count: results.filter(r=>r.type==="conversation").length },
              ].map(f => (
                <button key={f.key} onClick={()=>setFilter(f.key)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${filter===f.key?"bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400":"text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"}`}>
                  <span>{f.label}</span><span className="text-xs">{f.count}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
        <div className="lg:col-span-3 space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} results found</p>
          {filtered.map((r, i) => {
            const Icon = r.icon;
            return (
              <Card key={i} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-theme-md transition cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${typeColors[r.type]}`}><Icon className="h-5 w-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded-full bg-gray-100 dark:bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase text-gray-500 dark:text-gray-400">{r.type}</span>
                    </div>
                    <h3 className="text-base font-semibold text-brand-500 hover:underline">{r.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{r.desc}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                      <span>{r.url}</span><span>·</span><Clock className="h-3 w-3" /><span>{r.meta}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
