"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { Tabs } from "@/components/shared/tabs";
import { inputClass } from "@/components/shared/form-section";
import {
  TicketIcon,
  EditIcon,
} from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";
import {
  tickets,
  ticketStatusTone,
  ticketPriorityTone,
  type Ticket,
  type TicketStatus,
} from "@/data/apps/tickets";

const channelIcon: Record<Ticket["channel"], React.ReactNode> = {
  email: <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chat: <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H8l-4 4V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  phone: <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M5 4h3l1 5-2 1a12 12 0 006 6l1-2 5 1v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  web: <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="currentColor" strokeWidth="1.6"/></svg>,
};

export default function SupportTicketsPage() {
  const [filter, setFilter] = useState<TicketStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return tickets
      .filter((t) => (filter === "all" ? true : t.status === filter))
      .filter((t) =>
        query.trim() === ""
          ? true
          : (t.id + t.subject + t.requester + t.company).toLowerCase().includes(query.toLowerCase()),
      );
  }, [filter, query]);

  const counts = useMemo(() => ({
    all: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    "in-progress": tickets.filter((t) => t.status === "in-progress").length,
    waiting: tickets.filter((t) => t.status === "waiting").length,
    resolved: tickets.filter((t) => t.status === "resolved").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  }), []);

  const columns = [
    {
      key: "id",
      header: "Ticket",
      sortable: true,
      sortAccessor: (t: Ticket) => t.id,
      cell: (t: Ticket) => (
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-semibold text-primary dark:text-primary-light">{t.id}</span>
            <span className="text-dark-5 dark:text-dark-6">{channelIcon[t.channel]}</span>
          </div>
          <p className="mt-0.5 max-w-[280px] truncate text-sm font-medium text-dark dark:text-white">
            {t.subject}
          </p>
          <p className="text-xs text-dark-5 dark:text-dark-6">{t.category}</p>
        </div>
      ),
    },
    {
      key: "requester",
      header: "Requester",
      cell: (t: Ticket) => (
        <div className="flex items-center gap-2">
          <Avatar name={t.requester} size="xs" />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-dark dark:text-white">{t.requester}</p>
            <p className="truncate text-[11px] text-dark-5 dark:text-dark-6">{t.company}</p>
          </div>
        </div>
      ),
    },
    {
      key: "assignee",
      header: "Assignee",
      cell: (t: Ticket) => (
        <div className="flex items-center gap-2">
          <Avatar name={t.assignee} size="xs" />
          <span className="text-xs text-dark-7 dark:text-dark-7">{t.assignee}</span>
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      sortable: true,
      sortAccessor: (t: Ticket) => t.priority,
      cell: (t: Ticket) => <Badge variant={ticketPriorityTone[t.priority]} size="sm">{t.priority}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortAccessor: (t: Ticket) => t.status,
      cell: (t: Ticket) => <Badge variant={ticketStatusTone[t.status]} size="sm">{t.status}</Badge>,
    },
    {
      key: "replies",
      header: "Replies",
      cell: (t: Ticket) => (
        <span className="inline-flex items-center gap-1 text-xs text-dark-5 dark:text-dark-6">
          <svg width={11} height={11} viewBox="0 0 24 24" fill="none"><path d="M21 11.5c0 4.4-4 8-9 8a9.8 9.8 0 01-4-.8L3 20l1.3-5A8 8 0 013 11.5C3 7.1 7 3.5 12 3.5s9 3.6 9 8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
          {t.replies}
        </span>
      ),
    },
    {
      key: "updated",
      header: "Updated",
      cell: (t: Ticket) => <span className="text-xs text-dark-5 dark:text-dark-6">{t.updated}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Support Tickets"
        description="Triage, assign and resolve customer issues across channels."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "Support Tickets" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="primary" size="sm">
              <EditIcon className="size-4" />
              New ticket
            </Button>
          </>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {([
          { key: "all", label: "All", tone: "neutral" as const },
          { key: "open", label: "Open", tone: "info" as const },
          { key: "in-progress", label: "In progress", tone: "accent" as const },
          { key: "waiting", label: "Waiting", tone: "violet" as const },
          { key: "resolved", label: "Resolved", tone: "success" as const },
          { key: "closed", label: "Closed", tone: "neutral" as const },
        ] as const).map((s) => (
          <Card key={s.key} padded className="!p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-dark-5 dark:text-dark-6">{s.label}</span>
              <Badge variant={s.tone} size="sm">{counts[s.key]}</Badge>
            </div>
            <p className="mt-2 text-2xl font-bold text-dark dark:text-white">{counts[s.key]}</p>
          </Card>
        ))}
      </div>

      <Card padded={false} className="mb-4">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            value={filter}
            onChange={(v) => setFilter(v as TicketStatus | "all")}
            variant="pills"
            tabs={[
              { value: "all", label: "All" },
              { value: "open", label: "Open" },
              { value: "in-progress", label: "In progress" },
              { value: "waiting", label: "Waiting" },
              { value: "resolved", label: "Resolved" },
              { value: "closed", label: "Closed" },
            ]}
          />
          <div className="relative max-w-[260px]">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tickets…"
              className={`${inputClass} !pl-9`}
            />
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            size="md"
            icon={<TicketIcon className="size-6" />}
            title="No tickets match"
            description="Try a different filter or search term."
            action={
              <Link href="/apps/support-tickets/detail">
                <Button variant="outline" size="sm">View sample ticket</Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(t) => t.id}
          pageSize={8}
          onRowClick={(t) => {
            window.location.href = "/apps/support-tickets/detail";
          }}
        />
      )}
    </div>
  );
}
