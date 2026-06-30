"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Badge, Button, IconButton, Avatar, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui";
import { EMAILS } from "@/data/mock";
import {
  Star, Send, Reply, ReplyAll, Forward, Paperclip, MoreHorizontal, ChevronLeft, Archive, Trash2,
  Printer, Download, Bold, Italic, Underline, Link as LinkIcon, Smile, Image as ImageIcon,
  AlertOctagon, Clock, FileText, MailOpen, Tag
} from "lucide-react";

const EMAIL_BODIES: Record<string, string[]> = {
  e1: [
    "Hi there,",
    "Thank you for your payment of $12,480.00 for invoice #2041. This receipt confirms that your payment has been processed successfully through our secure payment gateway.",
    "Your subscription has been renewed for another 12 months, with all enterprise features unlocked for your team. You can download the full invoice and payment receipt from the attachments below.",
    "If you have any questions about this invoice or need to update your billing details, just reply to this email and our billing team will assist you within 24 hours.",
    "Best regards,\nThe Acme Billing Team",
  ],
  e2: [
    "Aaroh,",
    "Looks great! Just one note on the September budget — we should increase the paid social line by ~15% to match the new acquisition target Sofia mentioned yesterday.",
    "The webinar series in week 3 looks ambitious but doable if we lock the speakers this week. I've reached out to three candidates.",
    "Otherwise, the calendar is solid. Let's lock it on Friday so we can brief the team on Monday.",
    "Priya",
  ],
  e3: [
    "PR #824 has been successfully merged into main.",
    "feat(dashboard): add AI analytics view with real-time model usage, latency charts, and cost breakdowns by tenant.",
    "Merged by ethan-w · 3 commits · 12 files changed · +482 / -124",
    "The deployment to staging is queued and will be live in approximately 8 minutes.",
  ],
  e4: [
    "Your Stripe statement for May 2026 is ready to download.",
    "Total volume: $48,920 across 312 transactions. Net deposits: $47,840 after fees. Disputes: 2 (resolved).",
    "You can download the full CSV from your Stripe dashboard, or use the API endpoint below to fetch programmatically.",
  ],
  e5: [
    "Team,",
    "I've compiled the highlights from last week's NPS surveys. Overall score is +58, up 4 points from last month — our highest since launching Nimbus Pro.",
    "Key themes: strong love for the new dashboard layout, requests for CSV export limits to be raised, and a few complaints about webhook reliability that we should investigate.",
    "Full report attached. Let's review in standup tomorrow.",
    "Sofia",
  ],
  e6: [
    "You have 5 new issues waiting in your Linear inbox.",
    "Review them now to keep your queue clear and your team unblocked. Two are marked urgent, one is awaiting your review, and two are blocked on third-party dependencies.",
    "— The Linear Team",
  ],
};

const ATTACHMENTS = [
  { name: "invoice-2041.pdf", size: "412 KB", type: "pdf" },
  { name: "payment-receipt.pdf", size: "88 KB", type: "pdf" },
  { name: "enterprise-license.pdf", size: "1.2 MB", type: "pdf" },
];

const RELATED_EMAILS = [
  { id: "r1", from: "Priya Iyer", subject: "Re: Q3 marketing plan", time: "08:18", unread: true },
  { id: "r2", from: "Acme Billing", subject: "Invoice #2038 — Receipt", time: "Mon", unread: false },
  { id: "r3", from: "Stripe", subject: "Payment succeeded for $12,480", time: "Sun", unread: false },
];

export default function EmailDetailPage() {
  const email = EMAILS[0];
  const [body, setBody] = useState("");

  return (
    <div className="space-y-4">
      <PageHeader
        title="Invoice #2041 — Receipt"
        description="From Acme Billing · Received today at 09:42"
        breadcrumbs={[
          { label: "Apps", href: "/apps/email/inbox" },
          { label: "Email" },
          { label: "Invoice #2041" },
        ]}
        actions={
          <>
            <Link href="/apps/email/inbox">
              <Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Back to inbox</Button>
            </Link>
            <Button variant="secondary"><Archive className="h-4 w-4" /> Archive</Button>
            <Button variant="danger"><Trash2 className="h-4 w-4" /> Delete</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main email content */}
        <div className="space-y-4">
          <Card className="p-0">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 dark:border-gray-800 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <Avatar name={email.from} size={48} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 dark:text-white">{email.from}</p>
                    <Badge tone="success" variant="soft" dot>Verified</Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{email.fromEmail}</p>
                  <p className="mt-0.5 text-xs text-gray-400">to <span className="font-medium text-gray-700 dark:text-gray-300">aaroh.sharma@nimbuspro.io</span> · today at 09:42</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IconButton aria-label="Star"><Star className="h-4 w-4 fill-warning-400 text-warning-400" /></IconButton>
                <IconButton aria-label="Print"><Printer className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Download"><Download className="h-4 w-4" /></IconButton>
                <DropdownMenu trigger={<IconButton aria-label="More"><MoreHorizontal className="h-4 w-4" /></IconButton>}>
                  <DropdownMenuItem icon={Reply}>Reply</DropdownMenuItem>
                  <DropdownMenuItem icon={Forward}>Forward</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem icon={Tag}>Add label</DropdownMenuItem>
                  <DropdownMenuItem icon={AlertOctagon}>Report phishing</DropdownMenuItem>
                </DropdownMenu>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge tone="brand" variant="soft">work</Badge>
                <Badge tone="success" variant="soft">billing</Badge>
                <span className="text-xs text-gray-400">·</span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500"><Clock className="h-3 w-3" /> 09:42 AM</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{email.subject}</h1>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {(EMAIL_BODIES[email.id] ?? ["Email body not available."]).map((p, i) => (
                  <p key={i} className="whitespace-pre-line">{p}</p>
                ))}
              </div>

              {/* Attachments */}
              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <Paperclip className="h-3.5 w-3.5" /> 3 Attachments
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {ATTACHMENTS.map((a) => (
                    <div key={a.name} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{a.name}</p>
                        <p className="text-[11px] text-gray-500">{a.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Reply box */}
          <Card className="p-0">
            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Reply to Acme Billing</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">to billing@acme.example</p>
            </div>
            {/* Formatting toolbar */}
            <div className="flex items-center gap-1 border-b border-gray-100 px-3 py-2 dark:border-gray-800">
              <IconButton aria-label="Bold" className="h-8 w-8"><Bold className="h-3.5 w-3.5" /></IconButton>
              <IconButton aria-label="Italic" className="h-8 w-8"><Italic className="h-3.5 w-3.5" /></IconButton>
              <IconButton aria-label="Underline" className="h-8 w-8"><Underline className="h-3.5 w-3.5" /></IconButton>
              <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
              <IconButton aria-label="Link" className="h-8 w-8"><LinkIcon className="h-3.5 w-3.5" /></IconButton>
              <IconButton aria-label="Image" className="h-8 w-8"><ImageIcon className="h-3.5 w-3.5" /></IconButton>
              <IconButton aria-label="Attach" className="h-8 w-8"><Paperclip className="h-3.5 w-3.5" /></IconButton>
              <IconButton aria-label="Emoji" className="h-8 w-8"><Smile className="h-3.5 w-3.5" /></IconButton>
              <div className="ml-auto flex items-center gap-1">
                <Button variant="ghost" size="sm">Save draft</Button>
                <Button size="sm"><Send className="h-3.5 w-3.5" /> Send</Button>
              </div>
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[180px] w-full resize-y rounded-b-xl border-0 bg-transparent p-4 text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-300"
              placeholder="Hi Acme Billing team,

Thank you for the receipt. I can confirm we've received everything.

Best,
Aaroh"
            />
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card>
            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email details</p>
            </div>
            <div className="space-y-3 p-4 text-sm">
              {[
                { label: "From", value: "Acme Billing", sub: "billing@acme.example" },
                { label: "To", value: "Aaroh Sharma", sub: "aaroh.sharma@nimbuspro.io" },
                { label: "Received", value: "Today, 09:42 AM" },
                { label: "Thread", value: "3 messages" },
                { label: "Priority", value: "Normal" },
              ].map((d) => (
                <div key={d.label} className="flex items-start justify-between gap-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">{d.label}</span>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">{d.value}</p>
                    {d.sub && <p className="text-[11px] text-gray-500">{d.sub}</p>}
                  </div>
                </div>
              ))}
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Labels</span>
                <div className="flex flex-wrap justify-end gap-1">
                  <Badge tone="brand" variant="soft">work</Badge>
                  <Badge tone="success" variant="soft">billing</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Attachments (3)</p>
            </div>
            <div className="space-y-2 p-3">
              {ATTACHMENTS.map((a) => (
                <div key={a.name} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{a.name}</p>
                    <p className="text-[11px] text-gray-500">{a.size}</p>
                  </div>
                  <IconButton aria-label="Download" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></IconButton>
                </div>
              ))}
              <Button variant="secondary" size="sm" className="mt-2 w-full"><Download className="h-3.5 w-3.5" /> Download all</Button>
            </div>
          </Card>

          <Card>
            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Related emails</p>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {RELATED_EMAILS.map((r) => (
                <button key={r.id} className="flex w-full items-start gap-3 p-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <Avatar name={r.from} size={32} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{r.from}</p>
                      <span className="text-[10px] text-gray-400">{r.time}</span>
                    </div>
                    <p className="truncate text-xs text-gray-600 dark:text-gray-400">{r.subject}</p>
                  </div>
                  {r.unread && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500" />}
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-brand-500 to-accent-500 p-4 text-white">
            <MailOpen className="h-5 w-5 opacity-80" />
            <p className="mt-2 text-sm font-semibold">Quick actions</p>
            <p className="text-xs opacity-80">Reply, forward, or schedule send — all from one menu.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur hover:bg-white/25"><Reply className="mr-1 inline h-3 w-3" />Reply</button>
              <button className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur hover:bg-white/25"><ReplyAll className="mr-1 inline h-3 w-3" />Reply all</button>
              <button className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur hover:bg-white/25"><Forward className="mr-1 inline h-3 w-3" />Forward</button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
