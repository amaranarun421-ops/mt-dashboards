"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Badge, Button, IconButton, Avatar, SearchInput, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui";
import { EMAILS } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Inbox as InboxIcon, Star, Send, FileText, Trash2, Archive, RefreshCw, Reply, ReplyAll, Forward,
  Paperclip, MoreHorizontal, Tag, AlertCircle, Plus, ChevronLeft, Mail, MailOpen, Filter, Pencil
} from "lucide-react";

const FOLDERS = [
  { id: "inbox", label: "Inbox", icon: InboxIcon, count: 6 },
  { id: "starred", label: "Starred", icon: Star, count: 2 },
  { id: "sent", label: "Sent", icon: Send, count: 0 },
  { id: "drafts", label: "Drafts", icon: FileText, count: 3 },
  { id: "archive", label: "Archive", icon: Archive, count: 0 },
  { id: "trash", label: "Trash", icon: Trash2, count: 0 },
];

const LABELS = [
  { id: "work", label: "Work", color: "bg-brand-500" },
  { id: "internal", label: "Internal", color: "bg-purple-500" },
  { id: "dev", label: "Dev", color: "bg-orange-500" },
  { id: "billing", label: "Billing", color: "bg-success-500" },
];

const LABEL_BADGE_TONE: Record<string, "brand" | "purple" | "orange" | "success"> = {
  work: "brand",
  internal: "purple",
  dev: "orange",
  billing: "success",
};

const LABEL_DOT: Record<string, string> = {
  work: "bg-brand-500",
  internal: "bg-purple-500",
  dev: "bg-orange-500",
  billing: "bg-success-500",
};

const EMAIL_BODIES: Record<string, string[]> = {
  e1: [
    "Hi there,",
    "Thank you for your payment of $12,480.00 for invoice #2041. This receipt confirms that your payment has been processed successfully.",
    "If you have any questions about this invoice or need to update your billing details, just reply to this email and our billing team will assist you within 24 hours.",
    "Best regards,\nAcme Billing Team",
  ],
  e2: [
    "Aaroh,",
    "Looks great! Just one note on the September budget — we should increase the paid social line by ~15% to match the new acquisition target Sofia mentioned yesterday.",
    "Otherwise, the calendar is solid. Let's lock it on Friday.",
    "Priya",
  ],
  e3: [
    "PR #824 has been successfully merged into main.",
    "feat(dashboard): add AI analytics view",
    "Merged by ethan-w · 3 commits · 12 files changed · +482 / -124",
    "View the full diff in your repository.",
  ],
  e4: [
    "Your Stripe statement for May 2026 is ready to download.",
    "Total volume: $48,920 across 312 transactions. Net deposits: $47,840 after fees.",
    "You can download the full CSV from your Stripe dashboard.",
  ],
  e5: [
    "Team,",
    "I've compiled the highlights from last week's NPS surveys. Overall score is +58, up 4 points from last month.",
    "Key themes: strong love for the new dashboard, requests for CSV export limits to be raised, and a few complaints about webhook reliability.",
    "Full report attached. Sofia",
  ],
  e6: [
    "You have 5 new issues waiting in your Linear inbox.",
    "Review them now to keep your queue clear and your team unblocked.",
    "— The Linear Team",
  ],
};

const ATTACHMENTS = [
  { name: "invoice-2041.pdf", size: "412 KB", type: "pdf" },
  { name: "payment-receipt.pdf", size: "88 KB", type: "pdf" },
];

export default function EmailInboxPage() {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [selectedId, setSelectedId] = useState("e1");
  const [emails, setEmails] = useState(EMAILS);
  const [search, setSearch] = useState("");

  const selected = emails.find((e) => e.id === selectedId) ?? emails[0];

  const toggleStar = (id: string) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)));
  };

  const markRead = (id: string) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, read: true } : e)));
  };

  const filtered = emails.filter((e) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      e.subject.toLowerCase().includes(q) ||
      e.from.toLowerCase().includes(q) ||
      e.preview.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Inbox"
        description="You have 6 conversations — 3 unread."
        breadcrumbs={[{ label: "Apps" }, { label: "Email" }, { label: "Inbox" }]}
        actions={
          <>
            <Button variant="secondary"><Filter className="h-4 w-4" /> Filter</Button>
            <Button><Pencil className="h-4 w-4" /> Compose</Button>
          </>
        }
      />

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Folder sidebar */}
          <aside className="hidden border-r border-gray-100 p-3 dark:border-gray-800 lg:block">
            <Button className="w-full justify-start"><Plus className="h-4 w-4" /> Compose</Button>
            <nav className="mt-4 space-y-0.5">
              {FOLDERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFolder(f.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeFolder === f.id
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <f.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{f.label}</span>
                  {f.count > 0 && (
                    <span className={cn(
                      "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                      activeFolder === f.id ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    )}>{f.count}</span>
                  )}
                </button>
              ))}
            </nav>
            <div className="mt-6">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Labels</p>
              <nav className="mt-1 space-y-0.5">
                {LABELS.map((l) => (
                  <button key={l.id} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                    <span className={cn("h-2.5 w-2.5 rounded-full", l.color)} />
                    <span className="flex-1 text-left">{l.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="mt-6 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 p-4 text-white">
              <p className="text-xs font-semibold opacity-90">Storage</p>
              <p className="mt-1 text-2xl font-bold">6.4 GB</p>
              <p className="text-xs opacity-80">of 15 GB used</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white" style={{ width: "42%" }} />
              </div>
            </div>
          </aside>

          {/* Email list */}
          <section className="border-r border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 border-b border-gray-100 p-3 dark:border-gray-800">
              <SearchInput value={search} onChange={setSearch} placeholder="Search mail" className="flex-1" />
              <IconButton aria-label="Refresh"><RefreshCw className="h-4 w-4" /></IconButton>
              <DropdownMenu
                trigger={<IconButton aria-label="More"><MoreHorizontal className="h-4 w-4" /></IconButton>}
              >
                <DropdownMenuLabel>Mail actions</DropdownMenuLabel>
                <DropdownMenuItem icon={MailOpen}>Mark all as read</DropdownMenuItem>
                <DropdownMenuItem icon={Archive}>Archive selected</DropdownMenuItem>
                <DropdownMenuItem icon={Tag}>Add label</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={AlertCircle} danger>Report spam</DropdownMenuItem>
              </DropdownMenu>
            </div>
            <div className="max-h-[640px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                  <Mail className="h-6 w-6 text-gray-300" />
                  <p className="text-sm font-medium text-gray-500">No emails found</p>
                </div>
              ) : (
                filtered.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => { setSelectedId(e.id); markRead(e.id); }}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-gray-50 p-3 text-left transition-colors dark:border-gray-800/50",
                      selectedId === e.id ? "bg-brand-50/60 dark:bg-brand-500/10" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    )}
                  >
                    <Avatar name={e.from} size={38} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={cn("truncate text-sm", e.read ? "font-medium text-gray-700 dark:text-gray-300" : "font-bold text-gray-900 dark:text-white")}>
                          {e.from}
                        </p>
                        <span className="shrink-0 text-[11px] font-medium text-gray-400">{e.time}</span>
                      </div>
                      <p className={cn("mt-0.5 truncate text-sm", e.read ? "text-gray-600 dark:text-gray-400" : "font-semibold text-gray-900 dark:text-white")}>
                        {e.subject}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">{e.preview}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className={cn("h-1.5 w-1.5 rounded-full", LABEL_DOT[e.label])} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{e.label}</span>
                        {e.starred && <Star className="h-3 w-3 fill-warning-400 text-warning-400" />}
                      </div>
                    </div>
                    {!e.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                  </button>
                ))
              )}
            </div>
          </section>

          {/* Preview pane */}
          <section className="flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-1">
                <IconButton aria-label="Back" className="lg:hidden"><ChevronLeft className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Reply"><Reply className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Reply all"><ReplyAll className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Forward"><Forward className="h-4 w-4" /></IconButton>
              </div>
              <div className="flex items-center gap-1">
                <IconButton aria-label="Star" onClick={() => toggleStar(selected.id)}>
                  <Star className={cn("h-4 w-4", selected.starred && "fill-warning-400 text-warning-400")} />
                </IconButton>
                <IconButton aria-label="Archive"><Archive className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Delete"><Trash2 className="h-4 w-4" /></IconButton>
                <IconButton aria-label="More"><MoreHorizontal className="h-4 w-4" /></IconButton>
              </div>
            </div>

            <div className="max-h-[640px] flex-1 overflow-y-auto p-5">
              <div className="flex items-start gap-3">
                <Avatar name={selected.from} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-gray-900 dark:text-white">{selected.from}</p>
                    <Badge tone={LABEL_BADGE_TONE[selected.label]} variant="soft" className="capitalize">{selected.label}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selected.fromEmail}</p>
                  <p className="mt-0.5 text-xs text-gray-400">to me · {selected.time}</p>
                </div>
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">{selected.subject}</h2>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {(EMAIL_BODIES[selected.id] ?? ["Email body not available."]).map((p, i) => (
                  <p key={i} className="whitespace-pre-line">{p}</p>
                ))}
              </div>

              {(selected.id === "e1" || selected.id === "e4") && (
                <div className="mt-6 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <Paperclip className="h-3.5 w-3.5" /> Attachments ({ATTACHMENTS.length})
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {ATTACHMENTS.map((a) => (
                      <div key={a.name} className="flex items-center gap-3 rounded-lg border border-gray-100 p-2.5 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{a.name}</p>
                          <p className="text-[11px] text-gray-500">{a.size}</p>
                        </div>
                        <button className="text-xs font-semibold text-brand-600 dark:text-brand-400">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                <Button variant="secondary"><Reply className="h-4 w-4" /> Reply</Button>
                <Button variant="secondary"><ReplyAll className="h-4 w-4" /> Reply all</Button>
                <Button variant="secondary"><Forward className="h-4 w-4" /> Forward</Button>
              </div>

              <div className="mt-6 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Quick reply</p>
                <textarea
                  className="input min-h-[80px] resize-y"
                  placeholder="Type your reply..."
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <IconButton aria-label="Attach" className="h-8 w-8"><Paperclip className="h-4 w-4" /></IconButton>
                  </div>
                  <Button size="sm"><Send className="h-3.5 w-3.5" /> Send</Button>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-gray-400">
                <Link href="/apps/email/detail" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">Open full email view →</Link>
              </p>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
}
