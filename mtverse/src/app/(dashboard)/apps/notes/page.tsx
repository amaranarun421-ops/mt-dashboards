"use client";

import * as React from "react";
import { useState } from "react";
import {
  Search, Plus, Tag, Clock, Star, Trash2, MoreVertical, FileText,
  Pin, Share2, Download, Bold, Italic, List, Link2, Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Note = {
  id: number; title: string; content: string; tags: string[]; modified: string;
  pinned?: boolean; starred?: boolean; color?: string;
};

const tagColors: Record<string, string> = {
  Product: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Engineering: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  Meeting: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Research: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20",
  Personal: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Ideas: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Strategy: "bg-primary/10 text-primary border-primary/20",
};

const initialNotes: Note[] = [
  {
    id: 1, title: "Q4 OKR planning notes", pinned: true, starred: true, modified: "2 min ago", tags: ["Strategy", "Product"],
    content: "Q4 OKRs — draft v3\n\nObjective 1: Ship MTVerse 2.0 with premium dashboard kit\n- KR1: 50+ page templates live by Oct 15\n- KR2: NPS >= 60 among beta cohort\n- KR3: <2% regression rate on existing dashboards\n\nObjective 2: Grow ARR to $5M\n- KR1: 400 net new customers\n- KR2: 124% NRR\n- KR3: 8 enterprise deals closed\n\nOpen questions:\n- Should we separate Pro vs Enterprise pricing tiers for the dashboard kit?\n- Who owns the customer research cohort (Lena or Priya)?\n- Decision needed on white-label licensing by Oct 7",
  },
  {
    id: 2, title: "Architecture review — auth refactor", modified: "1 hour ago", tags: ["Engineering"],
    content: "Auth refactor review\n\nDecisions:\n- Adopt PKCE flow for all SPA + mobile clients\n- Refresh token TTL: 30 days (sliding)\n- Access token TTL: 15 minutes\n- Store refresh token in httpOnly cookie, NOT localStorage\n- Implement /oauth/revoke endpoint before GA\n\nAction items:\n- Marcus: write token rotation strategy doc by Friday\n- Daniel: implement revocation endpoint\n- Sarah: design the consent screen (Figma link TBA)\n\nRisks:\n- Backward compat with existing mobile tokens (need migration window)\n- Token replay attack if we don't rotate on privilege change",
  },
  {
    id: 3, title: "Customer interview — Acme Corp", modified: "Yesterday", tags: ["Research", "Meeting"],
    content: "Customer interview: Priya @ Acme Corp\nDate: Sep 24, 2024\nDuration: 45 min\n\nKey insights:\n- Uses dashboards 4-6 times per day, mostly for exec reporting\n- Pain point: exports are 'never quite right' for board decks\n- Wants: scheduled PDF exports, customizable branding\n- Loves: real-time collaboration, AI summaries\n- Would pay extra for: SSO, audit logs, custom domains\n\nQuotes:\n- \"Your exports cost me an hour a week in reformatting.\"\n- \"If you give me white-label, I'll double my seat count.\"\n\nFollow-up: send pricing for Enterprise tier + schedule technical eval",
  },
  {
    id: 4, title: "Marketing campaign ideas for launch", modified: "2 days ago", tags: ["Ideas", "Strategy"],
    content: "MTVerse 2.0 launch — campaign brainstorm\n\nChannels to test:\n1. Product Hunt launch (Tuesday morning)\n2. Twitter/X thread with design teardown\n3. LinkedIn carousel: '12 dashboards, 1 design system'\n4. YouTube: 10-min demo walk-through\n5. Newsletter sponsorship (2 newsletters in design/dev space)\n6. Hacker News Show HN post\n\nAngles:\n- \"The dashboard kit that pays for itself\"\n- \"Stop rebuilding the same shell for every app\"\n- \"50+ premium templates, one license\"\n\nNeed: Jordan to lock budget by Oct 1",
  },
  {
    id: 5, title: "Reading list — design systems", modified: "3 days ago", tags: ["Personal", "Research"],
    content: "Reading list — design systems & component architecture\n\nBooks:\n- Atomic Design (Brad Frost) — re-read Ch.4\n- Design Systems (Alla Kholmatova)\n\nArticles:\n- \"The component API design checklist\" — refactoringui.com\n- \"Tokens in practice\" — ninjanails\n- \"Headless UI patterns\" — mireade\n\nVideos:\n- Figma Config 2024: Variables talk\n- Vercel ship: design systems at scale\n\nNote: revisit after we ship our token system",
  },
  {
    id: 6, title: "Sprint retro action items", modified: "4 days ago", tags: ["Meeting", "Engineering"],
    content: "Sprint 24 retro — Sep 23\n\nWhat went well:\n- Shipped invoice v2 ahead of schedule\n- API response times down 22% after caching layer\n- New onboarding flow increased activation 14%\n\nWhat didn't:\n- Too many meetings (avg 18h/week per engineer)\n- QA bottleneck on Thursday deploys\n- Docs lagged behind code changes\n\nAction items (owners):\n- No-meeting Wednesdays (Alex)\n- Stagger deploy reviews (Marcus)\n- Docs-as-code PR template (Daniel)\n- Reduce standup to 12 min (Sarah)",
  },
  {
    id: 7, title: "Personal — week reflection", modified: "1 week ago", tags: ["Personal"],
    content: "Week of Sep 16\n\nWins:\n- Closed the Acme deal (largest this quarter)\n- Got through 6 customer interviews\n- Made time for a 3-mile run 4x\n\nLearned:\n- I'm over-indexing on engineering standups — delegate more\n- The team needs clearer weekly priorities, not daily ones\n- Saying 'no' to features is hard but necessary\n\nNext week:\n- Block 2hr/day for deep work\n- 1:1 with Marcus about his burnout signals\n- Finalize Q4 OKRs",
  },
  {
    id: 8, title: "Hiring rubric — Senior Product Designer", modified: "1 week ago", tags: ["Strategy", "Personal"],
    content: "Senior PD hiring rubric\n\nMust-have signals:\n- Can articulate trade-offs in their own work\n- Has shipped a complex system (not just screens)\n- Comfortable with ambiguity and can drive research\n- Strong visual + interaction craft\n\nNice-to-have:\n- Experience with design tokens / theming\n- Has mentored juniors\n- Public writing or speaking\n\nRed flags:\n- Can't explain WHY behind decisions\n- Talks only about aesthetics, never about outcomes\n- Hasn't collaborated with engineering closely\n\nLoop: portfolio review → take-home → systems interview → team fit → bar raiser",
  },
];

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeId, setActiveId] = useState(1);
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");

  const active = notes.find((n) => n.id === activeId)!;

  const filtered = notes.filter((n) => {
    if (query && !(`${n.title} ${n.content}`.toLowerCase().includes(query.toLowerCase()))) return false;
    if (tagFilter && !n.tags.includes(tagFilter)) return false;
    return true;
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  const update = (patch: Partial<Note>) => {
    setNotes((prev) => prev.map((n) => n.id === activeId ? { ...n, ...patch, modified: "just now" } : n));
  };

  const addNote = () => {
    const id = Math.max(...notes.map((n) => n.id)) + 1;
    const note: Note = { id, title: "Untitled note", content: "Start writing…", tags: [], modified: "just now" };
    setNotes([note, ...notes]);
    setActiveId(id);
    toast.success("Note created");
  };

  const addTag = () => {
    const t = newTag.trim();
    if (!t || active.tags.includes(t)) return;
    update({ tags: [...active.tags, t] });
    setNewTag("");
  };

  const removeTag = (t: string) => update({ tags: active.tags.filter((x) => x !== t) });

  const deleteNote = () => {
    const remaining = notes.filter((n) => n.id !== activeId);
    setNotes(remaining);
    setActiveId(remaining[0]?.id ?? 0);
    toast.message("Note deleted");
  };

  const togglePin = () => {
    setNotes((prev) => prev.map((n) => n.id === activeId ? { ...n, pinned: !n.pinned } : n));
    toast.message(active.pinned ? "Unpinned" : "Pinned to top");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notes"
        description="Capture ideas, meeting notes, and team knowledge."
        breadcrumbs={[{ label: "Apps" }, { label: "Notes" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9" onClick={() => toast.message("Exported as Markdown")}><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9" onClick={addNote}><Plus className="size-4 mr-2" /> New note</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4 h-[calc(100vh-220px)] min-h-[560px]">
        {/* List */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-3 border-b border-border space-y-3">
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes…" className="pl-9 h-9 bg-background" />
            </div>
            <div className="flex flex-wrap gap-1">
              <button onClick={() => setTagFilter(null)} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${!tagFilter ? "bg-foreground text-background border-foreground" : "bg-background text-muted-foreground border-border hover:bg-accent"}`}>All</button>
              {allTags.map((t) => (
                <button key={t} onClick={() => setTagFilter(tagFilter === t ? null : t)} className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${tagFilter === t ? "bg-foreground text-background border-foreground" : `${tagColors[t] ?? "bg-background text-muted-foreground border-border"} hover:opacity-80`}`}>{t}</button>
              ))}
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {filtered.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveId(n.id)}
                  className={`w-full text-left p-3 transition-colors ${activeId === n.id ? "bg-accent" : "hover:bg-accent/50"}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {n.pinned && <Pin className="size-3 text-muted-foreground shrink-0" />}
                      <span className={`text-sm truncate ${activeId === n.id ? "font-semibold" : "font-medium"}`}>{n.title}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0 flex items-center gap-1"><Clock className="size-3" />{n.modified}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{n.content.replace(/[^\w\s.,-]/g, "").slice(0, 110)}</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {n.tags.map((t) => (
                      <Badge key={t} variant="outline" className={`text-[9px] h-4 px-1 font-normal ${tagColors[t] ?? ""}`}>{t}</Badge>
                    ))}
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="size-8 text-muted-foreground/40 mb-2" />
                  <p className="text-sm text-muted-foreground">No notes match</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Editor */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          {active ? (
            <>
              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" /> Last edited {active.modified}
                </div>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={() => { setNotes((p) => p.map((n) => n.id === activeId ? { ...n, starred: !n.starred } : n)); toast.message(active.starred ? "Removed star" : "Starred"); }}>
                    <Star className={`size-4 ${active.starred ? "text-amber-500 fill-amber-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={togglePin}><Pin className={`size-4 ${active.pinned ? "text-primary fill-primary/30" : ""}`} /></Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={() => toast.message("Share link copied")}><Share2 className="size-4" /></Button>
                  <Separator orientation="vertical" className="h-5 mx-1" />
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={deleteNote}><Trash2 className="size-4" /></Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground"><MoreVertical className="size-4" /></Button>
                </div>
              </div>

              {/* Formatting toolbar */}
              <div className="flex items-center gap-0.5 p-2 border-b border-border bg-muted/20">
                {[Bold, Italic, List, Link2, Code].map((Icon, i) => (
                  <Button key={i} variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={() => toast.message("Formatting applied")}>
                    <Icon className="size-4" />
                  </Button>
                ))}
                <Separator orientation="vertical" className="h-5 mx-1" />
                <span className="text-[10px] text-muted-foreground ml-1">Markdown supported</span>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6 max-w-3xl mx-auto">
                  <Input
                    value={active.title}
                    onChange={(e) => update({ title: e.target.value })}
                    className="border-0 shadow-none focus-visible:ring-0 text-2xl font-bold px-0 h-auto bg-transparent"
                  />
                  <div className="flex items-center gap-1.5 flex-wrap mt-3 mb-4">
                    {active.tags.map((t) => (
                      <Badge key={t} variant="outline" className={`text-[10px] h-5 px-1.5 font-normal gap-1 ${tagColors[t] ?? ""}`}>
                        <Tag className="size-2.5" />{t}
                        <button onClick={() => removeTag(t)} className="ml-0.5 hover:text-foreground">×</button>
                      </Badge>
                    ))}
                    <div className="flex items-center gap-1">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                        placeholder="+ tag"
                        className="h-5 w-20 text-[10px] px-1.5 border-dashed"
                      />
                    </div>
                  </div>
                  <Textarea
                    value={active.content}
                    onChange={(e) => update({ content: e.target.value })}
                    className="border-0 shadow-none focus-visible:ring-0 text-sm leading-relaxed px-0 min-h-[400px] resize-none bg-transparent font-sans whitespace-pre-wrap"
                  />
                </div>
              </ScrollArea>

              <div className="flex items-center justify-between p-2.5 border-t border-border bg-muted/20 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span>{active.content.length} chars</span>
                  <span>{active.content.split(/\s+/).filter(Boolean).length} words</span>
                  <span>{active.content.split("\n").length} lines</span>
                </div>
                <span>Auto-saved</span>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <FileText className="size-12 text-muted-foreground/40 mb-3" />
              <p className="text-base font-semibold">No note selected</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">Create a new note or pick one from the list.</p>
              <Button className="mt-4" onClick={addNote}><Plus className="size-4 mr-2" /> New note</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
