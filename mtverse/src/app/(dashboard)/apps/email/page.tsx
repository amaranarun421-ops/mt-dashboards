"use client";

import * as React from "react";
import { useState } from "react";
import {
  Search, Inbox, Send, FileEdit, Star, Archive, Trash2, Reply, Forward,
  PenSquare, Paperclip, MoreVertical, ChevronLeft, ChevronRight, Tag,
  AlertCircle, Clock, Mail, MailOpen, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Email = {
  id: number; folder: string; from: string; fromEmail: string; initials: string;
  color: string; subject: string; preview: string; body: string; time: string;
  read: boolean; starred: boolean; hasAttachment: boolean; labels: string[];
};

const folders = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 8 },
  { id: "starred", label: "Starred", icon: Star, count: 3 },
  { id: "sent", label: "Sent", icon: Send, count: 0 },
  { id: "drafts", label: "Drafts", icon: FileEdit, count: 2 },
  { id: "archive", label: "Archive", icon: Archive, count: 0 },
  { id: "trash", label: "Trash", icon: Trash2, count: 0 },
];

const initialEmails: Email[] = [
  { id: 1, folder: "inbox", from: "GitHub", fromEmail: "noreply@github.com", initials: "GH", color: "bg-slate-500/15 text-slate-700 dark:text-slate-300", subject: "Pull request #2841 merged into main", preview: "Your PR \"feat: add OAuth2 PKCE flow\" has been merged by marcus-h. 3 files changed, +412 −28 lines.", body: "Hi Alex,\n\nYour pull request #2841 (feat: add OAuth2 PKCE flow) has been successfully merged into main by @marcus-h.\n\nChanges:\n- 3 files changed\n- +412 additions, −28 deletions\n- 4 reviewers approved\n- All CI checks passed\n\nView the merge commit at github.com/mtverse/web/pull/2841.\n\n— GitHub", time: "9:42 AM", read: false, starred: true, hasAttachment: false, labels: ["Updates"] },
  { id: 2, folder: "inbox", from: "Sarah Chen", fromEmail: "sarah@designstudio.co", initials: "SC", color: "bg-rose-500/15 text-rose-600", subject: "Re: Dashboard v3 wireframes — ready for review", preview: "Hey! Just pushed the latest wireframes to Figma. The sidebar now collapses to icons-only and I've restructured the top bar.", body: "Hey Alex!\n\nJust pushed the latest wireframes to Figma. The sidebar now collapses to icons-only and I've restructured the top bar to surface notifications + quick actions.\n\nKey changes:\n- Collapsible sidebar with icon-rail mode\n- Top bar now 56px (down from 64px)\n- Command palette trigger moved to top-left\n- Notifications dropdown redesigned with grouping\n\nCould you take a look before our 3pm sync? Link: figma.com/file/dashboard-v3\n\nThanks,\nSarah", time: "9:18 AM", read: false, starred: false, hasAttachment: true, labels: ["Design", "Internal"] },
  { id: 3, folder: "inbox", from: "Stripe", fromEmail: "receipts@stripe.com", initials: "ST", color: "bg-violet-500/15 text-violet-600", subject: "Your invoice INV-2024-0892 is paid", preview: "Acme Corp paid invoice INV-2024-0892 for $12,480.00. Funds will arrive in your bank account within 2 business days.", body: "Payment received\n\nAcme Corp has paid invoice INV-2024-0892.\n\nAmount: $12,480.00 USD\nMethod: ACH transfer\nDate: September 24, 2024\n\nFunds will arrive in your bank account ending in 4291 within 2 business days.\n\nView receipt: dashboard.stripe.com/invoices/INV-2024-0892", time: "8:55 AM", read: false, starred: false, hasAttachment: true, labels: ["Finance"] },
  { id: 4, folder: "inbox", from: "Priya Sharma", fromEmail: "priya@acme.co", initials: "PS", color: "bg-amber-500/15 text-amber-600", subject: "Q4 partnership proposal — let's sync", preview: "Hi Alex, following up on our conversation from last week. We've put together a draft proposal for the Q4 partnership.", body: "Hi Alex,\n\nFollowing up on our conversation from last week. We've put together a draft proposal for the Q4 partnership covering:\n\n- Co-marketing calendar (Oct–Dec)\n- Joint webinar series (3 sessions)\n- Revenue share structure\n- Exclusive integration roadmap\n\nAre you free Thursday afternoon for a 30-min sync? I'd love to walk through it together before circulating to the broader team.\n\nBest,\nPriya", time: "Yesterday", read: true, starred: true, hasAttachment: true, labels: ["Partnerships"] },
  { id: 5, folder: "inbox", from: "Vercel", fromEmail: "notify@vercel.com", initials: "VC", color: "bg-slate-500/15 text-slate-700 dark:text-slate-300", subject: "Deployment mtverse-web-9k2j ready", preview: "Your deployment is live. Build completed in 42s. Performance score: 98. View at mtverse-demo.vercel.app.", body: "Deployment ready\n\nProject: mtverse-web\nBranch: main\nCommit: 8f3a2d1 — feat: add OAuth2 PKCE flow\nBuild time: 42s\nStatus: Ready\nPerformance: 98\nAccessibility: 100\n\nView deployment: mtverse-demo.vercel.app", time: "Yesterday", read: true, starred: false, hasAttachment: false, labels: ["Updates"] },
  { id: 6, folder: "inbox", from: "Marcus Holloway", fromEmail: "marcus@mtverse.io", initials: "MH", color: "bg-emerald-500/15 text-emerald-600", subject: "Architecture review notes", preview: "Attaching my notes from yesterday's architecture review. TL;DR: the auth refactor looks solid, but we should revisit the token rotation strategy.", body: "Alex,\n\nAttaching my notes from yesterday's architecture review. TL;DR: the auth refactor looks solid, but we should revisit the token rotation strategy before we ship to production.\n\nMain concerns:\n1. Refresh token TTL might be too aggressive (15m)\n2. We need a revocation endpoint before GA\n3. PKCE verifier storage in sessionStorage is fine for now\n\nWant to pair on this Thursday?\n\nMarcus", time: "2 days ago", read: true, starred: false, hasAttachment: true, labels: ["Engineering"] },
  { id: 7, folder: "inbox", from: "Notion", fromEmail: "team@notion.so", initials: "NT", color: "bg-slate-500/15 text-slate-700 dark:text-slate-300", subject: "Weekly digest: 4 pages updated in your workspace", preview: "Here's what changed in your workspace this week. 4 pages updated, 2 new comments, 1 page shared with you.", body: "Weekly digest\n\n4 pages updated:\n- Engineering Roadmap Q4\n- Hiring Plan 2024\n- Customer Research Notes\n- Design System Tokens\n\n2 new comments on Dashboard v3 Specs\n1 page shared with you: Competitor Analysis by Priya S.\n\nView in Notion →", time: "3 days ago", read: true, starred: false, hasAttachment: false, labels: ["Updates"] },
  { id: 8, folder: "inbox", from: "Jordan Reyes", fromEmail: "jordan@mtverse.io", initials: "JR", color: "bg-sky-500/15 text-sky-600", subject: "Launch timeline — need your sign-off", preview: "Hey! The marketing team is ready to lock the launch timeline. Can you review the attached plan and sign off by EOD Friday?", body: "Hey Alex!\n\nThe marketing team is ready to lock the launch timeline for the MTVerse 2.0 release. Can you review the attached plan and sign off by EOD Friday?\n\nKey dates:\n- Oct 14: Press embargo lifts\n- Oct 15: Public launch\n- Oct 16-18: Customer webinar series\n- Oct 22: Partner co-marketing kickoff\n\nLet me know if you have concerns.\n\nJordan", time: "3 days ago", read: true, starred: false, hasAttachment: true, labels: ["Marketing"] },
  { id: 9, folder: "sent", from: "Alex Morgan", fromEmail: "alex@mtverse.io", initials: "AM", color: "bg-primary/15 text-primary", subject: "Re: Architecture review notes", preview: "Thursday works. Let's aim for 2pm in the Canyon room.", body: "Thursday works. Let's aim for 2pm in the Canyon room.", time: "2 days ago", read: true, starred: false, hasAttachment: false, labels: ["Engineering"] },
  { id: 10, folder: "drafts", from: "Draft", fromEmail: "alex@mtverse.io", initials: "DR", color: "bg-muted text-muted-foreground", subject: "Board update — September recap", preview: "Team, here's the September recap for the board meeting on Oct 7. Key highlights: ARR crossed $4.2M, churn down to 2.4%.", body: "Team,\n\nHere's the September recap for the board meeting on Oct 7.\n\nKey highlights:\n- ARR crossed $4.2M (+18% QoQ)\n- Net retention rate: 124%\n- Churn down to 2.4% (from 3.1%)\n- 412 new customers this quarter\n\nRisks:\n- [draft - need Marcus's input on infra costs]", time: "Yesterday", read: true, starred: false, hasAttachment: false, labels: [] },
];

const labelColors: Record<string, string> = {
  Updates: "bg-info/10 text-info border-info/20",
  Design: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Internal: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Finance: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Partnerships: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Engineering: "bg-sky-500/10 text-sky-600 border-sky-500/20",
  Marketing: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20",
};

export default function EmailApp() {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [folder, setFolder] = useState("inbox");
  const [activeId, setActiveId] = useState<number | null>(1);
  const [query, setQuery] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);

  const visible = emails.filter((e) => {
    if (folder === "starred") {
      if (!e.starred) return false;
    } else if (e.folder !== folder) return false;
    if (query && !(`${e.from} ${e.subject} ${e.preview}`.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });
  const active = emails.find((e) => e.id === activeId) || null;
  const unreadCount = emails.filter((e) => e.folder === "inbox" && !e.read).length;

  const openEmail = (id: number) => {
    setActiveId(id);
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, read: true } : e));
  };

  const action = (kind: "reply" | "forward" | "archive" | "delete" | "star") => {
    if (!active) return;
    if (kind === "star") {
      setEmails((prev) => prev.map((e) => e.id === active.id ? { ...e, starred: !e.starred } : e));
      toast.message(active.starred ? "Removed star" : "Starred");
      return;
    }
    if (kind === "archive") {
      setEmails((prev) => prev.map((e) => e.id === active.id ? { ...e, folder: "archive" } : e));
      setActiveId(null);
      toast.message("Archived", { description: active.subject });
      return;
    }
    if (kind === "delete") {
      setEmails((prev) => prev.map((e) => e.id === active.id ? { ...e, folder: "trash" } : e));
      setActiveId(null);
      toast.message("Moved to trash", { description: active.subject });
      return;
    }
    toast.message(kind === "reply" ? "Reply composer opened" : "Forward composer opened", { description: active.subject });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbox"
        description={`${unreadCount} unread · ${emails.filter((e) => e.folder === "inbox").length} total in inbox`}
        breadcrumbs={[{ label: "Apps" }, { label: "Email" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Search className="size-4 mr-2" /> Search</Button>
            <Button size="sm" className="h-9" onClick={() => setComposeOpen(true)}><PenSquare className="size-4 mr-2" /> Compose</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[200px_340px_1fr] gap-4 h-[calc(100vh-220px)] min-h-[560px]">
        {/* Folders */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-3 border-b border-border">
            <Button size="sm" className="w-full h-9" onClick={() => setComposeOpen(true)}><Plus className="size-4 mr-2" /> Compose</Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-0.5">
              {folders.map((f) => {
                const Icon = f.icon;
                const count = f.id === "starred"
                  ? emails.filter((e) => e.starred && e.folder !== "trash").length
                  : f.id === "inbox"
                  ? unreadCount
                  : emails.filter((e) => e.folder === f.id).length;
                return (
                  <button
                    key={f.id}
                    onClick={() => { setFolder(f.id); setActiveId(null); }}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${folder === f.id ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1 text-left">{f.label}</span>
                    {count > 0 && <Badge variant="outline" className="text-[10px] h-5 px-1.5">{count}</Badge>}
                  </button>
                );
              })}
            </div>
            <Separator className="my-2" />
            <div className="p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Labels</p>
              <div className="space-y-0.5">
                {Object.entries(labelColors).map(([label, cls]) => (
                  <button key={label} className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-accent/50">
                    <Tag className="size-3" /><span className="truncate">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Email list */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-3 border-b border-border space-y-2">
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search mail…" className="pl-9 h-9" />
            </div>
            <Tabs value={folder} onValueChange={(v) => { setFolder(v); setActiveId(null); }}>
              <TabsList className="grid grid-cols-3 h-8 w-full">
                <TabsTrigger value="inbox" className="text-xs">Inbox</TabsTrigger>
                <TabsTrigger value="starred" className="text-xs">Starred</TabsTrigger>
                <TabsTrigger value="sent" className="text-xs">Sent</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {visible.map((e) => (
                <button
                  key={e.id}
                  onClick={() => openEmail(e.id)}
                  className={`w-full text-left p-3 transition-colors ${activeId === e.id ? "bg-accent" : "hover:bg-accent/50"}`}
                >
                  <div className="flex items-start gap-2.5">
                    <Avatar className="size-9 shrink-0"><AvatarFallback className={`text-xs font-semibold ${e.color}`}>{e.initials}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm truncate ${e.read ? "font-medium" : "font-semibold"}`}>{e.from}</span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{e.time}</span>
                      </div>
                      <p className={`text-xs truncate ${e.read ? "text-muted-foreground" : "text-foreground font-medium"}`}>{e.subject}</p>
                      <p className="text-[11px] text-muted-foreground truncate mt-0.5">{e.preview}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {e.starred && <Star className="size-3 text-amber-500 fill-amber-500" />}
                        {e.hasAttachment && <Paperclip className="size-3 text-muted-foreground" />}
                        {!e.read && <span className="size-2 rounded-full bg-primary" />}
                        {e.labels.map((l) => (
                          <Badge key={l} variant="outline" className={`text-[9px] h-4 px-1 font-normal ${labelColors[l]}`}>{l}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {visible.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Mail className="size-8 text-muted-foreground/40 mb-2" />
                  <p className="text-sm text-muted-foreground">No messages here</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Preview */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          {active ? (
            <>
              <div className="p-4 border-b border-border">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">{active.subject}</h2>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {active.labels.map((l) => (
                        <Badge key={l} variant="outline" className={`text-[10px] font-normal ${labelColors[l]}`}>{l}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={() => action("star")}>
                      <Star className={`size-4 ${active.starred ? "text-amber-500 fill-amber-500" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={() => action("archive")}><Archive className="size-4" /></Button>
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={() => action("delete")}><Trash2 className="size-4" /></Button>
                    <Button variant="ghost" size="icon" className="size-8 text-muted-foreground"><MoreVertical className="size-4" /></Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10"><AvatarFallback className={`text-xs font-semibold ${active.color}`}>{active.initials}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{active.from} <span className="text-xs text-muted-foreground font-normal">&lt;{active.fromEmail}&gt;</span></p>
                    <p className="text-xs text-muted-foreground">to me · {active.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="h-8" onClick={() => action("reply")}><Reply className="size-3.5 mr-1.5" /> Reply</Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => action("forward")}><Forward className="size-3.5 mr-1.5" /> Forward</Button>
                  </div>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-5">
                  <pre className="text-sm text-foreground/90 whitespace-pre-wrap font-sans leading-relaxed">{active.body}</pre>
                  {active.hasAttachment && (
                    <div className="mt-5 pt-5 border-t border-border">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Attachments (1)</p>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg border border-border hover:bg-accent/50 cursor-pointer max-w-xs">
                        <div className="size-9 rounded-md bg-primary/10 text-primary flex items-center justify-center"><Paperclip className="size-4" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{active.subject.slice(0, 20)}.pdf</p>
                          <p className="text-[10px] text-muted-foreground">2.4 MB</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Download</Button>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2 bg-muted/30 rounded-lg border border-border px-3 py-2">
                  <Reply className="size-4 text-muted-foreground shrink-0" />
                  <Input placeholder="Click to write a reply…" className="border-0 shadow-none focus-visible:ring-0 h-8 bg-transparent" onFocus={() => action("reply")} />
                  <Button size="sm" className="h-7" onClick={() => action("reply")}><Send className="size-3.5 mr-1.5" /> Send</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mb-3"><MailOpen className="size-7 text-muted-foreground" /></div>
              <p className="text-sm font-semibold">Select an email to read</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">Choose a message from the list to see its contents here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Compose dialog */}
      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>New message</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">To</Label>
              <Input placeholder="recipient@company.com" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Subject</Label>
              <Input placeholder="What's this about?" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Message</Label>
              <Textarea rows={6} placeholder="Write your message…" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Paperclip className="size-3.5" /> Attach files · <Clock className="size-3.5" /> Schedule send
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setComposeOpen(false)}>Save draft</Button>
            <Button onClick={() => { setComposeOpen(false); toast.success("Message sent"); }}><Send className="size-4 mr-2" /> Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
