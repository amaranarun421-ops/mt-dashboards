"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Badge, Button, Avatar, Tabs, StatCard } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { TICKETS } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Inbox, Clock, CheckCircle2, Smile, Plus, Filter, Download, Tag,
  Mail, MessageSquare, FileText
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

const STATUS_LABEL: Record<string, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  pending: "Pending",
};

const CHANNEL_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  chat: MessageSquare,
  form: FileText,
};

type Ticket = (typeof TICKETS)[number];

export default function SupportTicketsPage() {
  const [tab, setTab] = useState("all");

  const counts = {
    all: TICKETS.length,
    open: TICKETS.filter((t) => t.status === "open").length,
    in_progress: TICKETS.filter((t) => t.status === "in_progress").length,
    resolved: TICKETS.filter((t) => t.status === "resolved").length,
    pending: TICKETS.filter((t) => t.status === "pending").length,
  };

  const filtered = TICKETS.filter((t) => (tab === "all" ? true : t.status === tab));

  const columns: Column<Ticket>[] = [
    {
      key: "id",
      header: "ID",
      sortable: true,
      cell: (t) => (
        <Link href="/apps/support/ticket-detail" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          {t.id}
        </Link>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      sortable: true,
      cell: (t) => (
        <Link href="/apps/support/ticket-detail" className="block max-w-xs">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-600">{t.subject}</p>
          <div className="mt-0.5 flex items-center gap-1.5">
            {t.tags.map((tag) => (
              <span key={tag} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">{tag}</span>
            ))}
          </div>
        </Link>
      ),
    },
    {
      key: "requester",
      header: "Requester",
      cell: (t) => (
        <div className="flex items-center gap-2">
          <Avatar name={t.requester} size={26} />
          <span className="text-sm text-gray-700 dark:text-gray-300">{t.requester}</span>
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      sortable: true,
      cell: (t) => <Badge tone={PRIORITY_TONE[t.priority]} variant="soft" className="capitalize">{t.priority}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (t) => <Badge tone={STATUS_TONE[t.status]} variant="soft" dot className="capitalize">{STATUS_LABEL[t.status]}</Badge>,
    },
    {
      key: "channel",
      header: "Channel",
      cell: (t) => {
        const Icon = CHANNEL_ICON[t.channel] ?? Mail;
        return (
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <Icon className="h-3.5 w-3.5 text-gray-400" />
            <span className="capitalize">{t.channel}</span>
          </div>
        );
      },
    },
    {
      key: "assigned",
      header: "Assignee",
      cell: (t) => (
        <div className="flex items-center gap-1.5">
          {t.assigned === "—" ? (
            <span className="text-xs text-gray-400">Unassigned</span>
          ) : (
            <>
              <Avatar name={t.assigned} size={22} />
              <span className="text-xs text-gray-700 dark:text-gray-300">{t.assigned}</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "updated",
      header: "Last updated",
      sortable: true,
      cell: (t) => <span className="text-xs text-gray-500">{t.updated} ago</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Support Tickets"
        description="Track and resolve customer issues across all channels."
        breadcrumbs={[{ label: "Apps" }, { label: "Support" }, { label: "Tickets" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Plus className="h-4 w-4" /> New ticket</Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open" value={counts.open} delta="+2" deltaTone="up" icon={Inbox} iconTone="brand" footer="needs triage" />
        <StatCard label="In Progress" value={counts.in_progress} delta="—" deltaTone="neutral" icon={Clock} iconTone="warning" footer="being worked on" />
        <StatCard label="Resolved Today" value="18" delta="+12%" deltaTone="up" icon={CheckCircle2} iconTone="success" footer="vs yesterday" />
        <StatCard label="CSAT" value="94%" delta="+2 pts" deltaTone="up" icon={Smile} iconTone="purple" footer="last 30 days" />
      </div>

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: "all", label: "All", count: counts.all },
          { value: "open", label: "Open", count: counts.open },
          { value: "in_progress", label: "In Progress", count: counts.in_progress },
          { value: "pending", label: "Pending", count: counts.pending },
          { value: "resolved", label: "Resolved", count: counts.resolved },
        ]}
      />

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={10}
        searchPlaceholder="Search tickets..."
        onRowClick={() => {}}
        toolbar={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
            <Button variant="outline" size="sm"><Tag className="h-3.5 w-3.5" /> Tags</Button>
          </div>
        }
      />

      {/* Side panels: priority breakdown + SLA */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <div className="border-b border-gray-100 p-4 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">By priority</p>
          </div>
          <div className="space-y-3 p-4">
            {[
              { label: "Urgent", count: 1, tone: "bg-error-500", pct: 17 },
              { label: "High", count: 3, tone: "bg-warning-500", pct: 50 },
              { label: "Medium", count: 1, tone: "bg-brand-500", pct: 17 },
              { label: "Low", count: 1, tone: "bg-gray-400", pct: 17 },
            ].map((p) => (
              <div key={p.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                    <span className={cn("h-2 w-2 rounded-full", p.tone)} /> {p.label}
                  </span>
                  <span className="text-gray-500">{p.count} · {p.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className={cn("h-full rounded-full", p.tone)} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="border-b border-gray-100 p-4 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">By channel</p>
          </div>
          <div className="space-y-3 p-4">
            {[
              { label: "Email", count: 3, icon: Mail, pct: 50 },
              { label: "Chat", count: 2, icon: MessageSquare, pct: 33 },
              { label: "Form", count: 1, icon: FileText, pct: 17 },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <c.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{c.label}</span>
                    <span className="text-gray-500">{c.count} tickets</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-brand-500 to-accent-500 p-5 text-white">
          <Clock className="h-6 w-6 opacity-80" />
          <p className="mt-3 text-sm font-semibold opacity-90">SLA performance</p>
          <p className="mt-1 text-3xl font-bold">98.4%</p>
          <p className="text-xs opacity-80">First response · avg 2m 14s</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white" style={{ width: "98.4%" }} />
          </div>
          <p className="mt-2 text-[11px] opacity-80">Target: 95% · within 5 minutes</p>
        </Card>
      </div>
    </div>
  );
}
