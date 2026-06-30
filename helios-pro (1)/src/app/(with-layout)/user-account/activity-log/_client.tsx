"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { DataTable } from "@/components/shared/data-table";
import { Drawer } from "@/components/shared/drawer";
import { Tabs } from "@/components/shared/tabs";
import { Timeline } from "@/components/shared/timeline";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import {
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  ActivityIcon,
  ShieldIcon,
  AlertTriangleIcon,
  CheckSquareIcon,
  User,
  MapPinIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  activityLog,
  activityCategories,
  activityStats,
  type ActivityCategory,
  type ActivityLogEntry,
  type ActivitySeverity,
} from "@/data/user-account/activity";

const severityBadge: Record<ActivitySeverity, "success" | "info" | "warning" | "danger"> = {
  info: "info",
  success: "success",
  warning: "warning",
  danger: "danger",
};

const categoryTone: Record<
  ActivityCategory,
  "primary" | "accent" | "violet" | "info" | "danger" | "success"
> = {
  Auth: "info",
  Members: "violet",
  Billing: "accent",
  Content: "primary",
  Settings: "danger",
  Security: "danger",
  Integrations: "success",
};

const severityToTimelineTone: Record<
  ActivitySeverity,
  "primary" | "accent" | "violet" | "info" | "rose" | "success" | "danger"
> = {
  info: "info",
  success: "success",
  warning: "accent",
  danger: "danger",
};

export default function ActivityLogClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ActivityCategory>("All");
  const [severity, setSeverity] = useState<"All" | ActivitySeverity>("All");
  const [view, setView] = useState<"table" | "timeline">("table");
  const [selected, setSelected] = useState<ActivityLogEntry | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activityLog.filter((e) => {
      const matchesQuery =
        !q ||
        e.actor.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        e.target.toLowerCase().includes(q) ||
        e.ip.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q);
      const matchesCategory = category === "All" || e.category === category;
      const matchesSeverity = severity === "All" || e.severity === severity;
      return matchesQuery && matchesCategory && matchesSeverity;
    });
  }, [query, category, severity]);

  const categoryTabs = [
    { value: "All", label: "All", badge: <Badge variant="neutral" size="sm">{activityLog.length}</Badge> },
    ...activityCategories.map((c) => ({
      value: c,
      label: c,
      badge: (
        <Badge variant="neutral" size="sm">
          {activityLog.filter((e) => e.category === c).length}
        </Badge>
      ),
    })),
  ];

  const timelineEvents = filtered.slice(0, 12).map((e) => ({
    title: `${e.actor} · ${e.action}`,
    description: `${e.target} · ${e.device} · ${e.location} · ${e.ip}`,
    time: e.timestamp,
    tone: severityToTimelineTone[e.severity],
  }));

  const columns = [
    {
      key: "id",
      header: "ID",
      cell: (e: ActivityLogEntry) => (
        <span className="font-mono text-xs text-dark-5 dark:text-dark-6">{e.id}</span>
      ),
      sortable: true,
      sortAccessor: (e: ActivityLogEntry) => e.id,
      width: "110px",
    },
    {
      key: "actor",
      header: "Actor",
      cell: (e: ActivityLogEntry) => (
        <div className="flex items-center gap-2">
          <Avatar name={e.actor === "System" ? "Helios Pro" : e.actor} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-dark dark:text-white">{e.actor}</p>
            <p className="truncate text-xs text-dark-5 dark:text-dark-6">{e.location}</p>
          </div>
        </div>
      ),
      sortable: true,
      sortAccessor: (e: ActivityLogEntry) => e.actor,
    },
    {
      key: "category",
      header: "Category",
      cell: (e: ActivityLogEntry) => (
        <Badge variant={categoryTone[e.category]} size="sm">{e.category}</Badge>
      ),
      sortable: true,
      sortAccessor: (e: ActivityLogEntry) => e.category,
    },
    {
      key: "action",
      header: "Action",
      cell: (e: ActivityLogEntry) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-dark dark:text-white">{e.action}</p>
          <p className="truncate text-xs text-dark-5 dark:text-dark-6">{e.target}</p>
        </div>
      ),
      sortable: true,
      sortAccessor: (e: ActivityLogEntry) => e.action,
    },
    {
      key: "ip",
      header: "IP / Device",
      cell: (e: ActivityLogEntry) => (
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-dark-7 dark:text-dark-6">{e.ip}</p>
          <p className="truncate text-xs text-dark-5 dark:text-dark-6">{e.device}</p>
        </div>
      ),
    },
    {
      key: "timestamp",
      header: "When",
      cell: (e: ActivityLogEntry) => (
        <span className="whitespace-nowrap text-xs text-dark-7 dark:text-dark-6">{e.timestamp}</span>
      ),
      sortable: true,
      sortAccessor: (e: ActivityLogEntry) => e.timestamp,
    },
    {
      key: "severity",
      header: "Severity",
      cell: (e: ActivityLogEntry) => (
        <Badge variant={severityBadge[e.severity]} size="sm">{e.severity}</Badge>
      ),
      sortable: true,
      sortAccessor: (e: ActivityLogEntry) => e.severity,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Activity log"
        description="Audit every meaningful event across your Helios Pro workspace."
        breadcrumbs={[{ label: "User & Account" }, { label: "Activity log" }]}
        actions={
          <Button variant="outline">
            Export CSV
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total events"
          value={activityStats.total}
          sublabel="Last 30 days"
          tone="primary"
          icon={<ActivityIcon className="size-5" />}
        />
        <StatCard
          label="Security events"
          value={activityStats.security}
          sublabel="Logins, 2FA, sessions"
          tone="danger"
          icon={<ShieldIcon className="size-5" />}
        />
        <StatCard
          label="Failed attempts"
          value={activityStats.failed}
          sublabel="Across all auth methods"
          tone="warning"
          icon={<AlertTriangleIcon className="size-5" />}
        />
        <StatCard
          label="Events today"
          value={activityStats.today}
          sublabel="Since 00:00 local time"
          tone="info"
          icon={<CheckSquareIcon className="size-5" />}
        />
      </div>

      <Card className="mt-6" padded={false}>
        <div className="flex flex-col gap-3 p-4 md:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <input
                className={`${inputClass} pl-9`}
                placeholder="Search by actor, action, target or IP…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <FormField label="" htmlFor="severity-filter">
                <select
                  id="severity-filter"
                  className="rounded-lg border border-stroke bg-white px-3 py-2 text-xs text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as "All" | ActivitySeverity)}
                >
                  <option value="All">All severities</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                </select>
              </FormField>
              <Tabs
                tabs={[
                  { value: "table", label: "Table" },
                  { value: "timeline", label: "Timeline" },
                ]}
                value={view}
                onChange={(v) => setView(v as "table" | "timeline")}
                variant="boxed"
                size="sm"
              />
            </div>
          </div>
          <Tabs
            tabs={categoryTabs}
            value={category}
            onChange={(v) => setCategory(v as "All" | ActivityCategory)}
            variant="pills"
            size="sm"
          />
        </div>

        {view === "table" ? (
          <DataTable
            columns={columns}
            data={filtered}
            rowKey={(e) => e.id}
            onRowClick={(e) => setSelected(e)}
            pageSize={8}
            emptyState={
              <EmptyState
                title="No events match your filters"
                description="Try clearing the search or switching categories."
                icon={<ActivityIcon className="size-7" />}
              />
            }
          />
        ) : (
          <div className="border-t border-stroke p-5 dark:border-dark-3">
            {timelineEvents.length === 0 ? (
              <EmptyState
                title="No events to show"
                description="Your filter returned no events."
                icon={<ActivityIcon className="size-7" />}
              />
            ) : (
              <>
                <p className="mb-4 text-xs uppercase tracking-wider text-dark-5 dark:text-dark-6">
                  Showing latest {timelineEvents.length} of {filtered.length} events
                </p>
                <Timeline events={timelineEvents} />
              </>
            )}
          </div>
        )}
      </Card>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? selected.action : ""}
        description={selected ? `${selected.id} · ${selected.timestamp}` : ""}
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
            <Button variant="ghost" className="mr-auto text-red">Flag as suspicious</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 rounded-xl border border-stroke p-4 dark:border-dark-3">
              <Avatar name={selected.actor === "System" ? "Helios Pro" : selected.actor} size="lg" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-dark dark:text-white">{selected.actor}</p>
                <p className="text-xs text-dark-5 dark:text-dark-6">{selected.location}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant={categoryTone[selected.category]} size="sm">{selected.category}</Badge>
                  <Badge variant={severityBadge[selected.severity]} size="sm">{selected.severity}</Badge>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
              <p className="text-xs uppercase tracking-wider text-dark-5 dark:text-dark-6">Action</p>
              <p className="mt-1 text-sm font-medium text-dark dark:text-white">{selected.action}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-dark-5 dark:text-dark-6">Target</p>
              <p className="mt-1 text-sm text-dark-7 dark:text-dark-6">{selected.target}</p>
            </div>

            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-lg bg-gray-2 px-3 py-2 dark:bg-white/5">
                <span className="flex items-center gap-2 text-dark-5 dark:text-dark-6">
                  <User className="size-4" /> Actor
                </span>
                <span className="font-medium text-dark dark:text-white">{selected.actor}</span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-gray-2 px-3 py-2 dark:bg-white/5">
                <span className="flex items-center gap-2 text-dark-5 dark:text-dark-6">
                  <MapPinIcon className="size-4" /> Location
                </span>
                <span className="font-medium text-dark dark:text-white">{selected.location}</span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-gray-2 px-3 py-2 dark:bg-white/5">
                <span className="text-dark-5 dark:text-dark-6">IP address</span>
                <span className="font-mono text-xs font-medium text-dark dark:text-white">{selected.ip}</span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-gray-2 px-3 py-2 dark:bg-white/5">
                <span className="text-dark-5 dark:text-dark-6">Device / browser</span>
                <span className="text-right text-xs font-medium text-dark-7 dark:text-dark-6">{selected.device}</span>
              </li>
              <li className="flex items-center justify-between rounded-lg bg-gray-2 px-3 py-2 dark:bg-white/5">
                <span className="text-dark-5 dark:text-dark-6">Timestamp</span>
                <span className="text-xs font-medium text-dark dark:text-white">{selected.timestamp}</span>
              </li>
            </ul>
          </div>
        )}
      </Drawer>
    </div>
  );
}
