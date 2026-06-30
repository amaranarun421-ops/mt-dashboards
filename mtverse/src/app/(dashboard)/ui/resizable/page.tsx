"use client";

import * as React from "react";
import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Mail, Inbox, Star, Send, Trash, Archive, Search, PenSquare, Reply, Forward,
  Paperclip, MoreHorizontal, Clock, Tag,
} from "lucide-react";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

const folders = [
  { name: "Inbox", icon: Inbox, count: 12, active: true },
  { name: "Starred", icon: Star, count: 3 },
  { name: "Sent", icon: Send, count: 0 },
  { name: "Drafts", icon: PenSquare, count: 2 },
  { name: "Archive", icon: Archive, count: 0 },
  { name: "Trash", icon: Trash, count: 0 },
];

const emails = [
  { id: 1, from: "Aria Montgomery", subject: "Q4 roadmap review — final pass", preview: "Hey team, I’ve gone through the latest revision and have a few notes on…", time: "8:42 AM", unread: true, starred: true },
  { id: 2, from: "GitHub", subject: "[mtverse/dashboard] PR #2841 merged", preview: "Your pull request feat(charts): radar chart support has been merged into main…", time: "7:15 AM", unread: true },
  { id: 3, from: "Jordan Lee", subject: "Design system v2 — component audit", preview: "Attached is the audit of all components in the current design system…", time: "Yesterday", unread: false },
  { id: 4, from: "Stripe", subject: "Invoice #INV-2024-2841 paid", preview: "Your customer Acme Corp has paid the invoice of $1,240.00…", time: "Yesterday", unread: false },
  { id: 5, from: "Sam Khoury", subject: "Re: Mobile SDK timeline", preview: "Pushed the new timeline to the doc. Let me know if it works for the team…", time: "Dec 12", unread: false },
  { id: 6, from: "Vercel", subject: "Deployment successful — mtverse.io", preview: "Your deployment to production completed in 1m 42s. View the live site…", time: "Dec 12", unread: false },
];

export default function ResizablePage() {
  const [selectedEmail, setSelectedEmail] = React.useState(1);
  const email = emails.find((e) => e.id === selectedEmail)!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resizable Layouts"
        description="Horizontal and vertical resizable panels using react-resizable-panels."
        breadcrumbs={[{ label: "UI Library" }, { label: "Resizable" }]}
      />

      <SectionCard title="Email Client Layout" description="Three-pane resizable email UI — drag the dividers" noBodyPadding>
        <div className="h-[520px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={18} minSize={14} maxSize={28} className="border-r border-border">
              <div className="h-full flex flex-col p-3">
                <Button size="sm" className="w-full mb-3"><PenSquare className="size-3.5 mr-1.5" /> Compose</Button>
                <div className="space-y-0.5 flex-1 overflow-y-auto">
                  {folders.map((f) => {
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.name}
                        className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-colors ${f.active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                      >
                        <Icon className="size-3.5" />
                        <span className="flex-1 text-left">{f.name}</span>
                        {f.count > 0 && <Badge variant={f.active ? "default" : "secondary"} className="text-[10px] h-4 px-1">{f.count}</Badge>}
                      </button>
                    );
                  })}
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent text-sm text-muted-foreground cursor-pointer">
                    <Tag className="size-3.5" /> <span className="flex-1">Labels</span>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={32} minSize={22} maxSize={45} className="border-r border-border">
              <div className="h-full flex flex-col">
                <div className="p-3 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <Input placeholder="Search mail…" className="h-8 pl-8 text-xs" />
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="divide-y divide-border">
                    {emails.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => setSelectedEmail(e.id)}
                        className={`w-full text-left p-3 hover:bg-accent/50 transition-colors ${selectedEmail === e.id ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          {e.unread && <span className="size-1.5 rounded-full bg-primary" />}
                          <span className={`text-sm flex-1 truncate ${e.unread ? "font-semibold" : "font-medium"}`}>{e.from}</span>
                          <span className="text-[10px] text-muted-foreground">{e.time}</span>
                        </div>
                        <p className={`text-xs truncate ${e.unread ? "text-foreground" : "text-muted-foreground"}`}>{e.subject}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{e.preview}</p>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-border flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{email.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                        {email.from.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{email.from}</p>
                        <p className="text-[10px] text-muted-foreground">{email.time} · to me</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-7"><Star className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="size-7"><Archive className="size-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="size-7"><MoreHorizontal className="size-3.5" /></Button>
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-4 text-sm text-muted-foreground space-y-3">
                    <p>{email.preview}</p>
                    <p>The latest revision addresses feedback from the design review meeting. Key changes include:</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>Updated component audit with 24 new entries</li>
                      <li>Radar chart support added to the chart library</li>
                      <li>Mobile SDK timeline extended to include Q1 2025</li>
                      <li>Billing flow simplified — 3 fewer steps</li>
                    </ul>
                    <p>Let me know if anything needs adjusting before we ship on Friday.</p>
                    <p>— Aria</p>
                    <div className="flex items-center gap-2 mt-3 p-2 rounded-md bg-muted/40 text-xs">
                      <Paperclip className="size-3.5" />
                      <span className="flex-1 truncate">q4-roadmap-v4.pdf</span>
                      <span className="text-muted-foreground">2.4 MB</span>
                    </div>
                  </div>
                </ScrollArea>
                <div className="p-3 border-t border-border flex items-center gap-2">
                  <Button size="sm" variant="outline"><Reply className="size-3.5 mr-1.5" /> Reply</Button>
                  <Button size="sm" variant="outline"><Forward className="size-3.5 mr-1.5" /> Forward</Button>
                  <div className="flex-1" />
                  <Button size="sm" variant="ghost" className="text-muted-foreground"><Clock className="size-3.5 mr-1.5" /> Snooze</Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Code Editor Layout" description="Side-by-side code panes" noBodyPadding>
          <div className="h-[320px]">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50} minSize={25} className="border-r border-border">
                <div className="h-full flex flex-col">
                  <div className="px-3 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">editor.tsx</div>
                  <pre className="flex-1 p-3 text-[10px] font-mono text-muted-foreground overflow-auto leading-relaxed">
{`import { useState } from "react";

export function Editor() {
  const [value, setValue] = useState("");
  return (
    <textarea
      value={value}
      onChange={(e) =>
        setValue(e.target.value)
      }
    />
  );
}`}
                  </pre>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={25}>
                <div className="h-full flex flex-col">
                  <div className="px-3 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">preview</div>
                  <div className="flex-1 p-3 text-xs">
                    <p className="text-muted-foreground">Live preview renders here as you type.</p>
                    <div className="mt-3 rounded-md border border-border p-3">
                      <p className="text-sm font-medium">Hello, MTVerse!</p>
                      <p className="text-xs text-muted-foreground mt-1">Editable textarea component</p>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </SectionCard>

        <SectionCard title="Vertical Resizable" description="Top/bottom panels" noBodyPadding>
          <div className="h-[320px]">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} minSize={25} className="border-b border-border">
                <div className="h-full flex flex-col">
                  <div className="px-3 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="size-3.5" /> Main content
                  </div>
                  <div className="flex-1 p-3 space-y-2 overflow-auto">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="h-6 rounded bg-muted/40" style={{ width: `${60 + Math.sin(i) * 30}%` }} />
                    ))}
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="h-full flex flex-col">
                  <div className="px-3 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground">Terminal</div>
                  <pre className="flex-1 p-3 text-[10px] font-mono text-muted-foreground overflow-auto">
{`$ bun run dev
Ready in 842ms
→ Local: http://localhost:3000
→ Compiled / in 312ms`}
                  </pre>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </SectionCard>

        <SectionCard title="Four Panel Grid" description="2x2 resizable grid" noBodyPadding className="lg:col-span-2">
          <div className="h-[320px]">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50} minSize={20} className="border-r border-border">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={50} minSize={15} className="border-b border-border">
                    <div className="h-full p-3 text-xs">
                      <p className="font-medium mb-1">Top-Left</p>
                      <p className="text-muted-foreground">Sidebar navigation</p>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50} minSize={15}>
                    <div className="h-full p-3 text-xs">
                      <p className="font-medium mb-1">Bottom-Left</p>
                      <p className="text-muted-foreground">File explorer</p>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={20}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={60} minSize={15} className="border-b border-border">
                    <div className="h-full p-3 text-xs">
                      <p className="font-medium mb-1">Top-Right</p>
                      <p className="text-muted-foreground">Editor pane</p>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={40} minSize={15}>
                    <div className="h-full p-3 text-xs">
                      <p className="font-medium mb-1">Bottom-Right</p>
                      <p className="text-muted-foreground">Output console</p>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
