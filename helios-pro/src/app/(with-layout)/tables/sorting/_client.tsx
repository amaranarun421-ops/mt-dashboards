"use client";

import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { Table, FileTextIcon } from "@/components/Layouts/sidebar/icons";
import { projects, type Project, type ProjectStatus, type ProjectPriority } from "@/data/tables/projects";

const statusVariant: Record<ProjectStatus, "neutral" | "info" | "warning" | "accent" | "success" | "danger"> = {
  Planning: "neutral",
  "In Progress": "info",
  "On Hold": "warning",
  Review: "accent",
  Completed: "success",
  Cancelled: "danger",
};

const priorityVariant: Record<ProjectPriority, "neutral" | "info" | "warning" | "danger"> = {
  Low: "neutral",
  Medium: "info",
  High: "warning",
  Critical: "danger",
};

const fmtCurrency = (n: number) => `$${n.toLocaleString("en-US")}`;
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

export default function SortingTablePage() {
  return (
    <div>
      <PageHeader
        title="Sortable Columns"
        description="Click any column header to sort. Text, number, currency, date and progress columns all support ascending, descending, and reset states."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/sorting" }, { label: "Sorting" }]}
        actions={
          <Button variant="outline" size="sm">
            <FileTextIcon className="size-4" />
            Export
          </Button>
        }
      />

      <Card padded={false}>
        <CardHeader
          title="Projects — sortable"
          subtitle={`${projects.length} rows · click headers (↕) to sort, click again to reverse, click a third time to clear`}
          action={<Badge variant="primary" size="sm">8 sortable cols</Badge>}
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <DataTable<Project>
          columns={[
            {
              key: "name",
              header: "Project",
              sortable: true,
              sortAccessor: (row) => row.name.toLowerCase(),
              cell: (row) => (
                <div>
                  <p className="text-sm font-medium text-dark dark:text-white">{row.name}</p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">{row.id} · {row.client}</p>
                </div>
              ),
              width: "200px",
            },
            {
              key: "owner",
              header: "Owner",
              sortable: true,
              sortAccessor: (row) => row.owner.toLowerCase(),
              cell: (row) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.owner}</span>,
            },
            {
              key: "priority",
              header: "Priority",
              sortable: true,
              sortAccessor: (row) => ["Low", "Medium", "High", "Critical"].indexOf(row.priority),
              cell: (row) => <Badge variant={priorityVariant[row.priority]} size="sm">{row.priority}</Badge>,
            },
            {
              key: "status",
              header: "Status",
              sortable: true,
              sortAccessor: (row) => row.status.toLowerCase(),
              cell: (row) => <Badge variant={statusVariant[row.status]} size="sm">{row.status}</Badge>,
            },
            {
              key: "progress",
              header: "Progress",
              sortable: true,
              sortAccessor: (row) => row.progress,
              cell: (row) => (
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-2 dark:bg-white/10">
                    <div className="h-full bg-primary" style={{ width: `${row.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-dark-7 dark:text-dark-7">{row.progress}%</span>
                </div>
              ),
            },
            {
              key: "budget",
              header: "Budget",
              sortable: true,
              sortAccessor: (row) => row.budget,
              cell: (row) => <span className="text-sm font-medium text-dark dark:text-white">{fmtCurrency(row.budget)}</span>,
              className: "text-right",
            },
            {
              key: "spent",
              header: "Spent",
              sortable: true,
              sortAccessor: (row) => row.spent,
              cell: (row) => {
                const pct = Math.round((row.spent / row.budget) * 100);
                const tone = pct >= 95 ? "text-red" : pct >= 80 ? "text-accent-dark" : "text-dark-7 dark:text-dark-7";
                return (
                  <div className="text-right">
                    <p className={`text-sm font-medium ${tone}`}>{fmtCurrency(row.spent)}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{pct}% of budget</p>
                  </div>
                );
              },
              className: "text-right",
            },
            {
              key: "dueDate",
              header: "Due Date",
              sortable: true,
              sortAccessor: (row) => new Date(row.dueDate).getTime(),
              cell: (row) => {
                const overdue = new Date(row.dueDate) < new Date("2024-10-15") && row.status !== "Completed";
                return <span className={`text-xs ${overdue ? "font-semibold text-red dark:text-red-light" : "text-dark-5 dark:text-dark-6"}`}>{fmtDate(row.dueDate)}</span>;
              },
            },
          ]}
          data={projects}
          rowKey={(row) => row.id}
          pageSize={10}
          initialSort={{ key: "dueDate", direction: "asc" }}
        />
      </Card>

      <Card className="mt-6">
        <CardHeader title="How sorting works" subtitle="Three-state cycle per column" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
            <p className="text-sm font-semibold text-dark dark:text-white">1. Click to sort ascending</p>
            <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">First click on a sortable header sorts the data ascending and shows ▲.</p>
          </div>
          <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
            <p className="text-sm font-semibold text-dark dark:text-white">2. Click again to reverse</p>
            <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Second click flips to descending order and the indicator switches to ▼.</p>
          </div>
          <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
            <p className="text-sm font-semibold text-dark dark:text-white">3. Click a third time to clear</p>
            <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Third click clears the sort, returning the table to its natural order — the indicator becomes ↕.</p>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-primary-subtle p-4 dark:bg-primary/10">
          <Table className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm text-dark-7 dark:text-dark-7">
            Each sortable column exposes a <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-white/10">sortAccessor</code> function that returns a string or number for comparison. This lets the column compare on a normalised value (e.g. lower-cased text, timestamp in ms) even when the rendered cell shows a formatted display string.
          </p>
        </div>
      </Card>
    </div>
  );
}