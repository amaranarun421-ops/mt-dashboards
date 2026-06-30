"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Search, X, Clock, Star, Save, Filter, TrendingUp, FileText, User,
  Folder, Settings, Calendar, SlidersHorizontal, ChevronDown, ChevronRight,
  ArrowUpDown, MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

const suggestions = [
  { label: "aurora web app", type: "Project", icon: Folder },
  { label: "aria montgomery", type: "Member", icon: User },
  { label: "Q4 roadmap.pdf", type: "File", icon: FileText },
  { label: "analytics dashboard", type: "Page", icon: TrendingUp },
  { label: "settings → billing", type: "Setting", icon: Settings },
  { label: "calendar december", type: "Calendar", icon: Calendar },
];

const recentSearches = [
  "radar chart implementation",
  "invite team member",
  "export billing history",
  "design system v2 components",
  "github integration setup",
];

const savedSearches = [
  { name: "My open tasks", query: "assignee:me status:open", count: 14 },
  { name: "High priority bugs", query: "label:bug priority:high", count: 3 },
  { name: "Updated this week", query: "updated:>7d", count: 28 },
  { name: "Starred projects", query: "starred:true", count: 5 },
];

const sampleResults = [
  { title: "Aurora Web App — Design Spec", type: "Project", desc: "Comprehensive design specification covering 24 components, color system, typography and motion principles.", meta: "Updated 2h ago by Aria M.", matches: ["design", "spec"] },
  { title: "Design System v2 — Component Library", type: "File", desc: "Figma file with all 24 UI library showcase pages, including forms, tables, charts and overlays.", meta: "8.1 MB · Updated 5h ago", matches: ["design", "library"] },
  { title: "Aria Montgomery", type: "Member", desc: "Lead Product Designer · Acme Studio · 14 projects · 284 commits in the last 30 days.", meta: "Last active 8m ago", matches: ["aria"] },
  { title: "Q4 Product Roadmap", type: "Doc", desc: "Quarterly plan covering 12 dashboard templates, 8 enterprise pages and 24 UI library showcase pages.", meta: "Dec 1, 2024 · 1.2 MB", matches: ["roadmap"] },
  { title: "Radar Chart — Implementation Notes", type: "File", desc: "Technical notes on the radar chart component built with Recharts, including data shape and customization.", meta: "Updated 3d ago", matches: ["radar", "chart"] },
];

function highlight(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-primary/20 text-primary rounded px-0.5">{part}</mark>
      : part
  );
}

const typeColors: Record<string, string> = {
  Project: "bg-primary/10 text-primary",
  File: "bg-info/10 text-info",
  Member: "bg-success/10 text-success",
  Doc: "bg-warning/10 text-warning",
  Page: "bg-muted text-muted-foreground",
  Setting: "bg-muted text-muted-foreground",
  Calendar: "bg-muted text-muted-foreground",
};

export default function SearchPage() {
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<Set<string>>(new Set(["project", "file"]));
  const [saved, setSaved] = React.useState(savedSearches);
  const [recent, setRecent] = React.useState(recentSearches);

  const filteredSuggestions = React.useMemo(() => {
    if (!query) return suggestions;
    return suggestions.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const results = React.useMemo(() => {
    if (!query) return sampleResults;
    return sampleResults.filter((r) =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.desc.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const toggleFilter = (id: string) => {
    const next = new Set(activeFilters);
    if (next.has(id)) next.delete(id); else next.add(id);
    setActiveFilters(next);
  };

  const runSearch = (q: string) => {
    setQuery(q);
    setFocused(false);
    if (q && !recent.includes(q)) {
      setRecent((prev) => [q, ...prev].slice(0, 5));
    }
    toast.success(`Searching “${q}”`);
  };

  const saveSearch = () => {
    if (!query) return;
    const newSaved = { name: query, query, count: results.length };
    setSaved((prev) => [newSaved, ...prev]);
    toast.success("Search saved");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Advanced Search"
        description="Search bar with autocomplete, filters sidebar, recent and saved searches, results with highlighting."
        breadcrumbs={[{ label: "UI Library" }, { label: "Search" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Filters sidebar */}
        <SectionCard title="Filters" description="Narrow your search" className="lg:col-span-1 lg:sticky lg:top-4 lg:self-start">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1.5"><Filter className="size-3" /> Type</Label>
              <div className="space-y-1.5">
                {[
                  { id: "project", label: "Projects", count: 14 },
                  { id: "file", label: "Files", count: 284 },
                  { id: "member", label: "Members", count: 12 },
                  { id: "doc", label: "Documents", count: 42 },
                  { id: "page", label: "Pages", count: 8 },
                ].map((f) => (
                  <label key={f.id} className="flex items-center gap-2 cursor-pointer text-sm hover:bg-accent/50 rounded px-1.5 py-1">
                    <Checkbox checked={activeFilters.has(f.id)} onCheckedChange={() => toggleFilter(f.id)} />
                    <span className="flex-1">{f.label}</span>
                    <Badge variant="outline" className="text-[10px]">{f.count}</Badge>
                  </label>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1.5"><SlidersHorizontal className="size-3" /> Date</Label>
              <div className="grid grid-cols-2 gap-1">
                {["Today", "7d", "30d", "90d", "1y", "All"].map((d, i) => (
                  <button key={d} className={cn("text-xs px-2 py-1 rounded-md border transition-colors", i === 1 ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent")}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1.5"><ArrowUpDown className="size-3" /> Sort by</Label>
              <select className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs">
                <option>Relevance</option>
                <option>Most recent</option>
                <option>Oldest first</option>
                <option>Alphabetical</option>
              </select>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-xs flex items-center gap-1.5"><User className="size-3" /> Author</Label>
              <div className="space-y-1">
                {["Aria M.", "Jordan L.", "Sam K."].map((a, i) => (
                  <label key={a} className="flex items-center gap-2 cursor-pointer text-xs hover:bg-accent/50 rounded px-1.5 py-1">
                    <Checkbox defaultChecked={i === 0} />
                    <Avatar className="size-5"><AvatarFallback className="text-[9px] bg-muted text-muted-foreground">{a.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                    <span className="flex-1">{a}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Main search area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search bar with autocomplete */}
          <SectionCard title="Search" description="Type to see suggestions and results">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  onKeyDown={(e) => e.key === "Enter" && runSearch(query)}
                  placeholder="Search projects, files, members…"
                  className="pl-9 pr-20 h-11"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {query && (
                    <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground p-1">
                      <X className="size-3.5" />
                    </button>
                  )}
                  <Button size="sm" className="h-7" onClick={() => runSearch(query || "design")}>Search</Button>
                </div>
              </div>
              {focused && (
                <div className="absolute z-10 top-full mt-1 left-0 right-0 rounded-md border border-border bg-popover shadow-lg overflow-hidden">
                  {filteredSuggestions.length > 0 ? (
                    <div className="py-1">
                      <p className="px-3 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Suggestions</p>
                      {filteredSuggestions.map((s) => {
                        const Icon = s.icon;
                        return (
                          <button
                            key={s.label}
                            onMouseDown={() => runSearch(s.label)}
                            className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-accent transition-colors text-left"
                          >
                            <Icon className="size-3.5 text-muted-foreground" />
                            <span className="flex-1">{highlight(s.label, query)}</span>
                            <Badge variant="outline" className={cn("text-[10px]", typeColors[s.type])}>{s.type}</Badge>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-muted-foreground">
                      No suggestions for “{query}”
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recent searches */}
            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                <Clock className="size-3" /> Recent searches
              </p>
              <div className="flex flex-wrap gap-1.5">
                {recent.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => runSearch(r)}
                    className="group flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs hover:bg-accent transition-colors"
                  >
                    {r}
                    <button
                      onClick={(e) => { e.stopPropagation(); setRecent((prev) => prev.filter((_, idx) => idx !== i)); }}
                      className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-3" />
                    </button>
                  </button>
                ))}
                {recent.length === 0 && <span className="text-xs text-muted-foreground">No recent searches yet.</span>}
              </div>
            </div>
          </SectionCard>

          {/* Saved searches */}
          <SectionCard
            title="Saved Searches"
            description="Quick access to your frequent queries"
            actions={
              <Button variant="ghost" size="sm" onClick={saveSearch} disabled={!query}>
                <Save className="size-3.5 mr-1" /> Save current
              </Button>
            }
          >
            <div className="space-y-2">
              {saved.map((s, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2.5 hover:bg-accent/50 transition-colors group">
                  <Star className="size-3.5 text-warning fill-warning" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground font-mono truncate">{s.query}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">{s.count}</Badge>
                  <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100" onClick={() => runSearch(s.query)}>
                    <ChevronRight className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-7 opacity-0 group-hover:opacity-100 text-destructive" onClick={() => { setSaved((prev) => prev.filter((_, idx) => idx !== i)); toast.info("Search removed"); }}>
                    <X className="size-3.5" />
                  </Button>
                </div>
              ))}
              {saved.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No saved searches yet. Run a search and click “Save current”.</p>
              )}
            </div>
          </SectionCard>

          {/* Results */}
          <SectionCard
            title="Search Results"
            description={`${results.length} matches for “${query || "design"}”`}
            actions={
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="size-3.5" />
              </Button>
            }
          >
            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className="rounded-lg border border-border p-3 hover:bg-accent/30 transition-colors cursor-pointer" onClick={() => toast.info(`Opening ${r.title}`)}>
                  <div className="flex items-start gap-3">
                    <div className={cn("flex size-8 items-center justify-center rounded-md shrink-0", typeColors[r.type])}>
                      {r.type === "Project" && <Folder className="size-4" />}
                      {r.type === "File" && <FileText className="size-4" />}
                      {r.type === "Member" && <User className="size-4" />}
                      {r.type === "Doc" && <FileText className="size-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{highlight(r.title, query)}</p>
                        <Badge variant="outline" className={cn("text-[10px]", typeColors[r.type])}>{r.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {highlight(r.desc, query)}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                        <Clock className="size-2.5" />
                        {r.meta}
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </div>
              ))}
              {results.length === 0 && (
                <div className="text-center py-8">
                  <Search className="size-8 mx-auto text-muted-foreground" />
                  <p className="text-sm font-medium mt-2">No results found</p>
                  <p className="text-xs text-muted-foreground mt-1">Try a different query or adjust filters.</p>
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
