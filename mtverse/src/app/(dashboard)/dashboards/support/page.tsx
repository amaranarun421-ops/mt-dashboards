"use client";

import * as React from "react";
import {
  Ticket, Clock, Smile, CheckCircle2, Download, Plus, Filter, Star,
  Bug, CreditCard, HelpCircle, Lightbulb, MessageSquare, Flame, Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, StatCard, SectionCard, CardMenuButton } from "@/components/mtv/primitives";
import { AreaTrend, DonutChart, RadialProgress, Sparkline } from "@/components/charts";

const ticketTrend = [
  { week: "W1", created: 412, resolved: 384 },
  { week: "W2", created: 468, resolved: 442 },
  { week: "W3", created: 398, resolved: 412 },
  { week: "W4", created: 524, resolved: 488 },
  { week: "W5", created: 488, resolved: 502 },
  { week: "W6", created: 442, resolved: 458 },
  { week: "W7", created: 518, resolved: 496 },
  { week: "W8", created: 562, resolved: 534 },
  { week: "W9", created: 498, resolved: 512 },
  { week: "W10", created: 538, resolved: 522 },
  { week: "W11", created: 472, resolved: 488 },
  { week: "W12", created: 512, resolved: 524 },
];

const categoryData = [
  { name: "Bug", value: 34, color: "var(--chart-1)" },
  { name: "Billing", value: 22, color: "var(--chart-2)" },
  { name: "How-to", value: 26, color: "var(--chart-3)" },
  { name: "Feature Request", value: 12, color: "var(--chart-4)" },
  { name: "Other", value: 6, color: "var(--chart-5)" },
];

const categoryMeta: Record<string, { icon: React.ReactNode; count: number }> = {
  "Bug": { icon: <Bug className="size-4" />, count: 42 },
  "Billing": { icon: <CreditCard className="size-4" />, count: 28 },
  "How-to": { icon: <HelpCircle className="size-4" />, count: 36 },
  "Feature Request": { icon: <Lightbulb className="size-4" />, count: 14 },
  "Other": { icon: <MessageSquare className="size-4" />, count: 8 },
};

type Ticket = {
  id: string;
  subject: string;
  requester: string;
  requesterInit: string;
  age: string;
  agent: string;
  agentInit: string;
  sla: string;
  slaTone: "danger" | "warning" | "safe";
};

const highPriority: Ticket[] = [
  { id: "TKT-8421", subject: "Login fails after password reset", requester: "Alex Morgan", requesterInit: "AM", age: "12m", agent: "Sarah Chen", agentInit: "SC", sla: "00:42", slaTone: "danger" },
  { id: "TKT-8420", subject: "Invoice shows duplicate charge", requester: "Jordan Park", requesterInit: "JP", age: "28m", agent: "Marcus Lee", agentInit: "ML", sla: "01:18", slaTone: "warning" },
  { id: "TKT-8417", subject: "API rate limit unexpectedly hit", requester: "Taylor Reed", requesterInit: "TR", age: "3h", agent: "Elena Rossi", agentInit: "ER", sla: "00:08", slaTone: "danger" },
  { id: "TKT-8411", subject: "Production DB connection drops", requester: "Sam Delgado", requesterInit: "SD", age: "44m", agent: "Aisha Khan", agentInit: "AK", sla: "02:14", slaTone: "safe" },
];

const mediumPriority: Ticket[] = [
  { id: "TKT-8419", subject: "Export to CSV missing columns", requester: "Riley Foster", requesterInit: "RF", age: "1h", agent: "Priya Patel", agentInit: "PP", sla: "04:32", slaTone: "safe" },
  { id: "TKT-8415", subject: "Dashboard widget not loading", requester: "Quinn Avery", requesterInit: "QA", age: "5h", agent: "James Wright", agentInit: "JW", sla: "02:48", slaTone: "safe" },
  { id: "TKT-8410", subject: "Webhook delivery delayed", requester: "Morgan Quinn", requesterInit: "MQ", age: "2h", agent: "Aisha Khan", agentInit: "AK", sla: "03:12", slaTone: "safe" },
];

const lowPriority: Ticket[] = [
  { id: "TKT-8418", subject: "How to set up SSO with Okta?", requester: "Casey Brooks", requesterInit: "CB", age: "2h", agent: "David Kim", agentInit: "DK", sla: "12:00", slaTone: "safe" },
  { id: "TKT-8416", subject: "Request: dark mode for reports", requester: "Sam Delgado", requesterInit: "SD", age: "4h", agent: "James Wright", agentInit: "JW", sla: "23:48", slaTone: "safe" },
  { id: "TKT-8409", subject: "Default timezone suggestion", requester: "Pat Nguyen", requesterInit: "PN", age: "6h", agent: "Priya Patel", agentInit: "PP", sla: "18:24", slaTone: "safe" },
];

const agentPerformance = [
  { name: "Sarah Chen", initials: "SC", handled: 184, csat: 4.9, response: "1h 42m", gradient: "from-chart-1 to-chart-2" },
  { name: "Marcus Lee", initials: "ML", handled: 168, csat: 4.8, response: "1h 58m", gradient: "from-chart-2 to-chart-3" },
  { name: "Priya Patel", initials: "PP", handled: 152, csat: 4.7, response: "2h 12m", gradient: "from-chart-3 to-chart-4" },
  { name: "David Kim", initials: "DK", handled: 142, csat: 4.8, response: "2h 24m", gradient: "from-chart-4 to-chart-5" },
  { name: "Elena Rossi", initials: "ER", handled: 128, csat: 4.6, response: "2h 38m", gradient: "from-chart-5 to-chart-6" },
  { name: "James Wright", initials: "JW", handled: 118, csat: 4.5, response: "2h 52m", gradient: "from-chart-6 to-chart-1" },
];

const columnMeta = [
  { key: "high", label: "High Priority", tickets: highPriority, headerClass: "bg-destructive/10 text-destructive border-destructive/20", dotClass: "bg-destructive", icon: <Flame className="size-3.5" /> },
  { key: "medium", label: "Medium Priority", tickets: mediumPriority, headerClass: "bg-warning/10 text-warning border-warning/20", dotClass: "bg-warning", icon: <Timer className="size-3.5" /> },
  { key: "low", label: "Low Priority", tickets: lowPriority, headerClass: "bg-info/10 text-info border-info/20", dotClass: "bg-info", icon: <Ticket className="size-3.5" /> },
] as const;

const slaToneClass: Record<Ticket["slaTone"], string> = {
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  safe: "bg-success/10 text-success border-success/20",
};

function TicketCard({ t }: { t: Ticket }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] text-muted-foreground">{t.id}</span>
        <Badge variant="outline" className={"px-1.5 py-0 text-[10px] " + slaToneClass[t.slaTone]}>
          <Clock className="size-2.5 mr-1" /> {t.sla}
        </Badge>
      </div>
      <p className="text-xs font-medium leading-snug mb-3 line-clamp-2">{t.subject}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Avatar className="size-5">
            <AvatarFallback className="text-[9px] bg-muted text-muted-foreground">{t.requesterInit}</AvatarFallback>
          </Avatar>
          <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">{t.requester}</span>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border px-1 py-0 text-[9px]">{t.age}</Badge>
          <Avatar className="size-5 ring-1 ring-background">
            <AvatarFallback className="text-[9px] bg-primary/10 text-primary">{t.agentInit}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default function SupportDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Support Dashboard"
        description="A real-time command center for ticket queues, SLA breaches, and agent performance."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Support" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Ticket</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Open Tickets"
          value="248"
          delta={-12}
          deltaLabel="vs last week"
          icon={<Ticket className="size-5" />}
          spark={<Sparkline data={ticketTrend.map((d) => ({ value: d.created - d.resolved }))} />}
        />
        <StatCard
          label="Avg Response"
          value="2h 14m"
          delta={-8}
          deltaLabel="vs last week"
          icon={<Clock className="size-5" />}
          spark={<Sparkline data={[{ value: 184 }, { value: 172 }, { value: 158 }, { value: 142 }, { value: 138 }, { value: 134 }]} color="var(--chart-2)" type="bar" />}
        />
        <StatCard
          label="CSAT Score"
          value="4.7/5"
          delta={0.2}
          deltaLabel="vs last week"
          icon={<Smile className="size-5" />}
          spark={<Sparkline data={[{ value: 4.3 }, { value: 4.4 }, { value: 4.5 }, { value: 4.5 }, { value: 4.6 }, { value: 4.7 }]} color="var(--chart-3)" />}
        />
        <StatCard
          label="First Contact Res."
          value="68%"
          delta={4}
          deltaLabel="vs last week"
          icon={<CheckCircle2 className="size-5" />}
          spark={<Sparkline data={[{ value: 58 }, { value: 61 }, { value: 63 }, { value: 65 }, { value: 66 }, { value: 68 }]} color="var(--chart-4)" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionCard
          title="Ticket Queue"
          description="Open tickets grouped by priority · live SLA countdown"
          className="lg:col-span-8"
          actions={
            <>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">
                <span className="size-1.5 rounded-full bg-success animate-pulse mr-1.5" /> Live
              </Badge>
              <CardMenuButton items={[{ label: "Reassign" }, { label: "Export" }]} />
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {columnMeta.map((col) => (
              <div key={col.key} className="flex flex-col gap-2.5">
                <div className={"flex items-center justify-between rounded-lg border px-3 py-2 " + col.headerClass}>
                  <div className="flex items-center gap-2">
                    {col.icon}
                    <span className="text-xs font-semibold">{col.label}</span>
                  </div>
                  <span className="text-xs font-bold tabular-nums">{col.tickets.length}</span>
                </div>
                <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 -mr-1">
                  {col.tickets.map((t) => (
                    <TicketCard key={t.id} t={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="SLA Compliance"
          description="Response & resolution targets"
          className="lg:col-span-4"
          actions={<CardMenuButton items={[{ label: "Configure" }]} />}
        >
          <RadialProgress value={92} label="of SLA met" color="var(--chart-2)" height={180} />
          <div className="mt-2 pt-3 border-t border-border space-y-2">
            {[
              { label: "Response SLA", value: "94%", color: "var(--success)" },
              { label: "Resolution SLA", value: "89%", color: "var(--info)" },
              { label: "Breaches (24h)", value: "8", color: "var(--destructive)" },
            ].map((g) => (
              <div key={g.label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: g.color }} />
                  {g.label}
                </span>
                <span className="font-semibold tabular-nums">{g.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Category Breakdown</p>
            <div className="space-y-1.5">
              {Object.entries(categoryMeta).map(([name, meta]) => {
                const cat = categoryData.find((c) => c.name === name)!;
                return (
                  <div key={name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <span className="size-2 rounded-full" style={{ background: cat.color }} />
                      {name}
                    </span>
                    <span className="font-semibold tabular-nums">{meta.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionCard
          title="Tickets Created vs Resolved"
          description="Trailing 12 weeks volume"
          className="lg:col-span-7"
          actions={<CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />}
        >
          <AreaTrend
            data={ticketTrend}
            xKey="week"
            yKeys={[
              { key: "created", name: "Created", color: "var(--chart-1)" },
              { key: "resolved", name: "Resolved", color: "var(--chart-2)" },
            ]}
            height={260}
          />
        </SectionCard>

        <SectionCard
          title="Tickets by Category"
          description="Distribution by issue type"
          className="lg:col-span-5"
          actions={<CardMenuButton items={[{ label: "View all" }]} />}
        >
          <DonutChart data={categoryData} centerValue="248" centerLabel="Open" height={260} />
        </SectionCard>
      </div>

      <SectionCard
        title="Agent Performance"
        description="Top agents this week · ranked by tickets handled"
        className="lg:col-span-12"
        noBodyPadding
        actions={<Button variant="ghost" size="sm" className="h-8 text-xs">View all</Button>}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Agent</TableHead>
              <TableHead className="text-right">Tickets Handled</TableHead>
              <TableHead>CSAT</TableHead>
              <TableHead className="text-right">Avg Response</TableHead>
              <TableHead className="text-right">Resolution Rate</TableHead>
              <TableHead className="pr-5 text-right">Utilization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentPerformance.map((a, i) => {
              const resolveRate = Math.round(100 - (i + 1) * 4);
              const util = Math.min(96, 70 + i * 4);
              return (
                <TableRow key={a.name} className="hover:bg-accent/50">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">{i + 1}</div>
                      <Avatar className="size-8 ring-2 ring-background">
                        <AvatarFallback className={"text-[10px] font-semibold bg-gradient-to-br text-white " + a.gradient}>{a.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-tight">{a.name}</p>
                        <p className="text-[10px] text-muted-foreground">{a.handled + 14} total tickets</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">{a.handled}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 fill-warning text-warning" />
                      <span className="text-xs font-semibold tabular-nums">{a.csat}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground tabular-nums">{a.response}</TableCell>
                  <TableCell className="text-right">
                    <span className={
                      resolveRate >= 90 ? "text-success text-xs font-semibold tabular-nums" :
                        "text-info text-xs font-semibold tabular-nums"
                    }>{resolveRate}%</span>
                  </TableCell>
                  <TableCell className="pr-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div
                          className={
                            util >= 90 ? "h-full bg-destructive" : util >= 80 ? "h-full bg-warning" : "h-full bg-success"
                          }
                          style={{ width: `${util}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold tabular-nums w-9 text-right">{util}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
