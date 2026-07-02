"use client";

import * as React from "react";
import { Search, Inbox, Star, Send, Trash2, Archive, Reply, Forward, Plus, Paperclip, MoreVertical } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";

const folders = [
  { name: "Inbox", icon: Inbox, count: 24, active: true },
  { name: "Starred", icon: Star, count: 8 },
  { name: "Sent", icon: Send, count: 0 },
  { name: "Archive", icon: Archive, count: 0 },
  { name: "Trash", icon: Trash2, count: 0 },
];

const emails = [
  { from: "Sarah Chen", subject: "Q3 Roadmap Review", preview: "Hi team, I've put together the Q3 roadmap document. Please review before our meeting tomorrow...", time: "9:42 AM", unread: true, starred: true, avatar: "https://i.pravatar.cc/40?img=1", label: "Work" },
  { from: "GitHub", subject: "[nexus-pro] New pull request #284", preview: "alex-kim opened pull request #284: Add premium dark mode support with refined color palette...", time: "8:15 AM", unread: true, starred: false, avatar: "https://github.githubassets.com/favicons/favicon.svg", label: "Notifications" },
  { from: "Stripe", subject: "Your monthly statement is ready", preview: "Your June 2026 statement is now available. Total processed: $84,210.32 across 640 transactions...", time: "Yesterday", unread: true, starred: false, avatar: "https://stripe.com/img/favicon.ico", label: "Finance" },
  { from: "Riya Patel", subject: "Re: Design system update", preview: "Thanks for the feedback! I've updated the spacing tokens and added the new shadow system...", time: "Yesterday", unread: false, starred: true, avatar: "https://i.pravatar.cc/40?img=3", label: "Work" },
  { from: "Linear", subject: "12 issues need your attention", preview: "You have 12 issues assigned to you that are due this week. Click to view them in Linear...", time: "2 days ago", unread: false, starred: false, avatar: "https://linear.app/favicon.ico", label: "Notifications" },
  { from: "John Davis", subject: "Weekend trip?", preview: "Hey! A few of us are planning a hiking trip this weekend. Are you in? We're thinking Saturday morning...", time: "3 days ago", unread: false, starred: false, avatar: "https://i.pravatar.cc/40?img=6", label: "Personal" },
];

const labelColors: Record<string, string> = {
  Work: "primary",
  Notifications: "info",
  Finance: "success",
  Personal: "warning",
};

export function MailboxPage() {
  const [selected, setSelected] = React.useState(0);
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "Mailbox"]}
        title="Inbox"
        description="You have 3 unread messages."
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Compose</Button>}
      />
      <Card className="grid h-[calc(100vh-220px)] grid-cols-1 overflow-hidden p-0 lg:grid-cols-4">
        {/* Folders sidebar */}
        <div className="hidden flex-col border-r border-border p-3 lg:flex">
          <Button className="mb-3 gap-1.5"><Plus className="h-4 w-4" /> Compose</Button>
          <div className="space-y-0.5">
            {folders.map((f) => {
              const Icon = f.icon;
              return (
                <button key={f.name} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${f.active ? "bg-brand-500/10 text-brand-500" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800/50 hover:text-gray-800 dark:text-white/90"}`}>
                  <Icon className="h-4 w-4" />
                  <span>{f.name}</span>
                  {f.count > 0 && <span className="ml-auto rounded-full bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] font-bold">{f.count}</span>}
                </button>
              );
            })}
          </div>
          <div className="mt-6">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Labels</p>
            {Object.entries(labelColors).map(([name, color]) => (
              <button key={name} className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:bg-gray-800/50">
                <span className={`h-2 w-2 rounded-full bg-${color}`} />
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Email list */}
        <div className="flex flex-col border-r border-border">
          <div className="border-b border-border p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input placeholder="Search inbox..." className="pl-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {emails.map((e, i) => (
              <button key={i} onClick={() => setSelected(i)} className={`flex w-full gap-3 border-b border-border/50 p-3 text-left transition hover:bg-gray-100 dark:bg-gray-800/30 ${selected === i ? "bg-gray-100 dark:bg-gray-800/50" : ""} ${e.unread ? "font-semibold" : ""}`}>
                <Avatar className="h-9 w-9 shrink-0"><AvatarImage src={e.avatar} /><AvatarFallback>{e.from[0]}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm">{e.from}</span>
                    <span className="ml-2 shrink-0 text-xs text-gray-500 dark:text-gray-400">{e.time}</span>
                  </div>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">{e.subject}</p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400/70">{e.preview}</p>
                  <div className="mt-1 flex items-center gap-1">
                    {e.starred && <Star className="h-3 w-3 fill-warning text-warning-600 dark:text-orange-400" />}
                    <StatusBadge variant={labelColors[e.label] as any}>{e.label}</StatusBadge>
                  </div>
                </div>
                {e.unread && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Email detail */}
        <div className="col-span-1 flex flex-col lg:col-span-2">
          {emails[selected] && (
            <>
              <div className="flex items-center gap-2 border-b border-border p-3">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Reply className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Forward className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Archive className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <h2 className="text-xl font-bold">{emails[selected].subject}</h2>
                <div className="mt-3 flex items-center gap-3">
                  <Avatar className="h-10 w-10"><AvatarImage src={emails[selected].avatar} /><AvatarFallback>{emails[selected].from[0]}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-semibold">{emails[selected].from}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">to me · {emails[selected].time}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  <p>Hi Alex,</p>
                  <p>{emails[selected].preview}</p>
                  <p>I'd love to get your thoughts on this when you have a moment. The key areas I'd like feedback on are:</p>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>Overall direction and feasibility</li>
                    <li>Timeline estimates for Q3 deliverables</li>
                    <li>Resource allocation across teams</li>
                    <li>Potential risks and mitigation strategies</li>
                  </ul>
                  <p>Let me know if you'd like to schedule a quick sync to discuss in detail. I'm flexible tomorrow afternoon.</p>
                  <p>Best regards,<br />{emails[selected].from}</p>
                </div>
                <div className="mt-6 rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Paperclip className="h-4 w-4" />
                    <span className="font-medium">2 attachments</span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <div className="flex items-center gap-2 rounded-md bg-gray-100 dark:bg-gray-800/50 p-2 text-xs">
                      <div className="h-8 w-8 rounded bg-error-500/15 text-error-600 dark:text-error-500 flex items-center justify-center text-[10px] font-bold">PDF</div>
                      <div><p className="font-medium">roadmap-q3.pdf</p><p className="text-gray-500 dark:text-gray-400">2.4 MB</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2">
                  <Input placeholder="Reply to email..." className="flex-1" />
                  <Button size="icon"><Send className="h-4 w-4" /></Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
