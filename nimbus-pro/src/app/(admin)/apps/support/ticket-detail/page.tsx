"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, IconButton, Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  ChevronLeft, Clock, Paperclip, Send, Phone, Mail, Globe, User,
  CheckCircle2, Link2, Sparkles, Bold, Italic, Code, List as ListIcon,
  Lock, Reply, MoreHorizontal, Star, FileText, Smile
} from "lucide-react";

const PRIORITY_TONE: Record<string, "error" | "warning" | "brand" | "gray"> = {
  urgent: "error",
  high: "warning",
  medium: "brand",
  low: "gray",
};

const STATUS_TONE: Record<string, "brand" | "warning" | "success" | "gray"> = {
  open: "brand",
  in_progress: "warning",
  resolved: "success",
  pending: "gray",
};

const THREAD = [
  {
    id: 1,
    author: "Mira Patel",
    role: "Customer",
    email: "mira.p@acme.example",
    text: "Hi team, I'm trying to upgrade our workspace from the Pro plan to Enterprise, but every time I click 'Upgrade' in the billing settings, I get a 500 error. I've tried in both Chrome and Safari, cleared cache, and used incognito. Same result. We need this resolved ASAP — we're hitting the seat limit on Pro and have new hires starting Monday.",
    time: "Today, 09:14 AM",
    internal: false,
    attachments: [{ name: "screenshot-error.png", size: "412 KB" }],
  },
  {
    id: 2,
    author: "Ethan Wright",
    role: "Support Agent",
    email: "ethan.w@nimbuspro.io",
    text: "Hi Mira, thanks for reaching out. I'm sorry you're running into this — I can see the error in our logs. It looks like your workspace has a custom domain configuration that's blocking the upgrade flow. I've flagged this to engineering with priority. As a workaround, can you try removing the custom domain temporarily, completing the upgrade, then re-adding it? I'll also send you a direct upgrade link via email shortly.",
    time: "Today, 09:38 AM",
    internal: false,
  },
  {
    id: 3,
    author: "Ethan Wright",
    role: "Internal note",
    email: "ethan.w@nimbuspro.io",
    text: "Internal: confirmed bug in billing-service v3.2.1. Custom domain check throws when workspace has CNAME pointing to legacy endpoint. Workaround above should unblock customer. Engineering ETA for fix: 24h. Tagging @aaroh for visibility.",
    time: "Today, 09:39 AM",
    internal: true,
  },
  {
    id: 4,
    author: "Mira Patel",
    role: "Customer",
    email: "mira.p@acme.example",
    text: "That worked! I removed the custom domain, upgraded successfully to Enterprise, and re-added the domain. Everything looks good now. Could you confirm the upgrade went through on your end? Also, will the seat limit be lifted immediately?",
    time: "Today, 10:42 AM",
    internal: false,
  },
];

const RELATED = [
  { id: "TKT-9184", subject: "Workspace seat limit error", status: "resolved", priority: "medium" },
  { id: "TKT-9042", subject: "Custom domain not propagating", status: "resolved", priority: "low" },
  { id: "TKT-8911", subject: "Billing page 500 on Safari", status: "resolved", priority: "high" },
];

export default function TicketDetailPage() {
  const [status, setStatus] = useState("open");
  const [internalMode, setInternalMode] = useState(false);
  const [reply, setReply] = useState("");

  return (
    <div className="space-y-4">
      <PageHeader
        title="Cannot upgrade to Enterprise plan"
        description="TKT-9214 · Reported by Mira Patel · Today at 09:14 AM"
        breadcrumbs={[
          { label: "Apps" },
          { label: "Support", href: "/apps/support/tickets" },
          { label: "Tickets" },
          { label: "TKT-9214" },
        ]}
        actions={
          <>
            <Link href="/apps/support/tickets">
              <Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Back</Button>
            </Link>
            <Button variant="secondary"><Star className="h-4 w-4" /> Follow</Button>
            <Button variant="danger"><CheckCircle2 className="h-4 w-4" /> Resolve</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Conversation */}
        <div className="space-y-4">
          {/* Thread */}
          <Card className="p-0">
            <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Conversation</p>
                <Badge tone="gray" variant="soft">4 messages</Badge>
              </div>
              <div className="flex items-center gap-1">
                <IconButton aria-label="More"><MoreHorizontal className="h-4 w-4" /></IconButton>
              </div>
            </div>
            <div className="space-y-5 p-5">
              {THREAD.map((m) => (
                <div key={m.id} className={cn("flex gap-3", m.internal && "rounded-xl bg-warning-50/60 p-3 dark:bg-warning-500/10")}>
                  <Avatar name={m.author} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{m.author}</p>
                      <Badge
                        tone={m.internal ? "warning" : m.role === "Customer" ? "gray" : "brand"}
                        variant="soft"
                        className="text-[10px]"
                      >
                        {m.role}
                      </Badge>
                      <span className="text-[11px] text-gray-400">{m.time}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{m.email}</p>
                    <div className={cn(
                      "mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300",
                      m.internal && "italic text-warning-800 dark:text-warning-300"
                    )}>
                      {m.text}
                    </div>
                    {m.attachments && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.attachments.map((a) => (
                          <div key={a.name} className="flex items-center gap-2 rounded-lg border border-gray-100 p-2 dark:border-gray-800">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-900 dark:text-white">{a.name}</p>
                              <p className="text-[10px] text-gray-500">{a.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Reply box */}
          <Card className="p-0">
            <div className="flex items-center justify-between border-b border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInternalMode(false)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                    !internalMode ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  )}
                >
                  <Reply className="mr-1 inline h-3 w-3" /> Reply
                </button>
                <button
                  onClick={() => setInternalMode(true)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                    internalMode ? "bg-warning-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  )}
                >
                  <Lock className="mr-1 inline h-3 w-3" /> Internal note
                </button>
              </div>
              <div className="flex items-center gap-1">
                <IconButton aria-label="Bold" className="h-7 w-7"><Bold className="h-3.5 w-3.5" /></IconButton>
                <IconButton aria-label="Italic" className="h-7 w-7"><Italic className="h-3.5 w-3.5" /></IconButton>
                <IconButton aria-label="Code" className="h-7 w-7"><Code className="h-3.5 w-3.5" /></IconButton>
                <IconButton aria-label="List" className="h-7 w-7"><ListIcon className="h-3.5 w-3.5" /></IconButton>
                <IconButton aria-label="Emoji" className="h-7 w-7"><Smile className="h-3.5 w-3.5" /></IconButton>
                <IconButton aria-label="Attach" className="h-7 w-7"><Paperclip className="h-3.5 w-3.5" /></IconButton>
              </div>
            </div>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder={internalMode ? "Write an internal note (only visible to your team)..." : "Type your reply to Mira..."}
              className={cn(
                "min-h-[160px] w-full resize-y rounded-b-xl border-0 bg-transparent p-4 text-sm outline-none placeholder:text-gray-400 dark:text-gray-200",
                internalMode && "bg-warning-50/40 dark:bg-warning-500/5"
              )}
            />
            <div className="flex items-center justify-between border-t border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Send className="h-3.5 w-3.5" /> Reply via: <span className="font-semibold text-gray-700 dark:text-gray-300">Email + In-app</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm">Save draft</Button>
                <Button size="sm" variant={internalMode ? "secondary" : "primary"}>
                  {internalMode ? <Lock className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}
                  {internalMode ? "Add note" : "Send reply"}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Ticket meta */}
          <Card>
            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Ticket details</p>
            </div>
            <div className="space-y-3 p-4">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Status</p>
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: "open", label: "Open" },
                    { id: "in_progress", label: "In Progress" },
                    { id: "pending", label: "Pending" },
                    { id: "resolved", label: "Resolved" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStatus(s.id)}
                      className={cn(
                        "rounded-md px-2 py-1 text-[11px] font-semibold transition-colors",
                        status === s.id
                          ? "bg-brand-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Priority</p>
                <Badge tone={PRIORITY_TONE.high} variant="soft" className="mt-1 capitalize">High</Badge>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Assignee</p>
                <div className="mt-1 flex items-center gap-2">
                  <Avatar name="Ethan Wright" size={26} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ethan Wright</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Channel</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Mail className="h-4 w-4 text-gray-400" /> Email
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tags</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge tone="brand" variant="soft">billing</Badge>
                  <Badge tone="purple" variant="soft">plan</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Requester info */}
          <Card>
            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Requester</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <Avatar name="Mira Patel" size={48} />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white">Mira Patel</p>
                  <p className="text-xs text-gray-500">Editor · Pro plan</p>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gray-400" /> mira.p@nimbuspro.io</p>
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gray-400" /> +91 98765 43210</p>
                <p className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-gray-400" /> Mumbai, India</p>
                <p className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-gray-400" /> Customer since Aug 2023</p>
              </div>
              <Button variant="secondary" size="sm" className="mt-3 w-full">View customer profile</Button>
            </div>
          </Card>

          {/* SLA timer */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">SLA timer</p>
              <Badge tone="success" variant="soft" dot>On track</Badge>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">02:14:38</p>
                <p className="text-[11px] text-gray-500">Time to first response</p>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">First response</span>
                <span className="font-semibold text-success-600 dark:text-success-400">✓ 2m 14s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Resolution target</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">24h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Last reply</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">38m ago</span>
              </div>
            </div>
          </Card>

          {/* Related tickets */}
          <Card>
            <CardHeader title="Related tickets" description="3 similar issues" action={<button className="text-xs font-semibold text-brand-600 dark:text-brand-400">View</button>} />
            <CardBody className="space-y-2">
              {RELATED.map((r) => (
                <div key={r.id} className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <Link2 className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{r.subject}</p>
                    <p className="text-[10px] text-gray-500">{r.id} · {r.priority} priority</p>
                  </div>
                  <Badge tone={STATUS_TONE[r.status as keyof typeof STATUS_TONE]} variant="soft" className="text-[10px] capitalize">{r.status}</Badge>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-brand-500 to-accent-500 p-4 text-white">
            <Sparkles className="h-5 w-5 opacity-80" />
            <p className="mt-2 text-sm font-semibold">AI suggestion</p>
            <p className="mt-1 text-xs opacity-80">Based on similar tickets, this issue is likely caused by the custom domain CNAME check. Suggested reply drafted.</p>
            <button className="mt-3 rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur hover:bg-white/25">Use suggestion</button>
          </Card>
        </aside>
      </div>
    </div>
  );
}
