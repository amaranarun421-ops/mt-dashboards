"use client";

import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { DataTable } from "@/components/shared/data-table";
import { Table, LayersIcon, RefreshCwIcon, FileTextIcon } from "@/components/Layouts/sidebar/icons";
import { transactions, type Transaction, type TransactionStatus } from "@/data/tables/transactions";

const statusVariant: Record<TransactionStatus, "success" | "warning" | "danger" | "info" | "violet"> = {
  Completed: "success",
  Pending: "warning",
  Failed: "danger",
  Refunded: "info",
  Disputed: "violet",
};

const fmtCurrency = (amount: number, currency: Transaction["currency"]) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function StickyPage() {
  // Duplicate the dataset so vertical scrolling is dramatic enough to showcase the sticky header.
  const expanded: Transaction[] = [...transactions, ...transactions.map((t) => ({ ...t, id: t.id + "-2", reference: t.reference + "-b" }))];

  return (
    <div>
      <PageHeader
        title="Sticky Header & First Column"
        description="Both the header row and the first column stay pinned while you scroll — useful for wide, long tables of transactions."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/sticky" }, { label: "Sticky" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <RefreshCwIcon className="size-4" />
              Refresh
            </Button>
            <Button size="sm">
              <FileTextIcon className="size-4" />
              Export
            </Button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card padded>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15">
              <Table className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Sticky Header</p>
              <p className="text-sm font-semibold text-dark dark:text-white">Stays pinned on scroll</p>
            </div>
          </div>
        </Card>
        <Card padded>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-accent-subtle text-accent-dark dark:bg-accent/15">
              <LayersIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Sticky First Column</p>
              <p className="text-sm font-semibold text-dark dark:text-white">Always in view horizontally</p>
            </div>
          </div>
        </Card>
        <Card padded>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gray-2 text-dark-7 dark:bg-white/5 dark:text-dark-7">
              <FileTextIcon className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Rows</p>
              <p className="text-sm font-semibold text-dark dark:text-white">{expanded.length} transactions</p>
            </div>
          </div>
        </Card>
      </div>

      <Card padded={false}>
        <CardHeader
          title="Transactions Ledger"
          subtitle="Scroll vertically to see the sticky header; scroll horizontally to see the sticky first column stay in place"
          action={<Badge variant="primary" size="sm">Sticky enabled</Badge>}
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <DataTable<Transaction>
          stickyHeader
          columns={[
            {
              key: "id",
              header: "Transaction",
              cell: (row) => (
                <div className="flex items-center gap-3 bg-white dark:bg-gray-dark">
                  <Avatar name={row.customer} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{row.customer}</p>
                    <p className="truncate text-xs text-dark-5 dark:text-dark-6">{row.id}</p>
                  </div>
                </div>
              ),
              width: "260px",
              className: "sticky left-0 z-[5] bg-white dark:bg-gray-dark shadow-[1px_0_0_0_var(--color-stroke)] dark:shadow-[1px_0_0_0_var(--color-dark-3)]",
            },
            { key: "reference", header: "Reference", cell: (row) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.reference}</span>, width: "180px" },
            { key: "method", header: "Method", cell: (row) => <Badge variant="neutral" size="sm">{row.method}</Badge>, width: "120px" },
            { key: "category", header: "Category", cell: (row) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.category}</span>, width: "140px" },
            { key: "type", header: "Type", cell: (row) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.type}</span>, width: "120px" },
            {
              key: "amount",
              header: "Amount",
              cell: (row) => <span className="text-sm font-semibold text-dark dark:text-white">{fmtCurrency(row.amount, row.currency)}</span>,
              width: "140px",
              className: "text-right",
            },
            {
              key: "riskScore",
              header: "Risk",
              cell: (row) => {
                const tone = row.riskScore >= 70 ? "text-red" : row.riskScore >= 30 ? "text-accent-dark" : "text-primary";
                return <span className={`text-xs font-semibold ${tone}`}>{row.riskScore}/100</span>;
              },
              width: "120px",
            },
            { key: "date", header: "Date", cell: (row) => <span className="text-xs text-dark-5 dark:text-dark-6">{fmtDate(row.date)}</span>, width: "180px" },
            { key: "status", header: "Status", cell: (row) => <Badge variant={statusVariant[row.status]} size="sm">{row.status}</Badge>, width: "140px" },
            { key: "customerEmail", header: "Email", cell: (row) => <span className="text-xs text-dark-5 dark:text-dark-6">{row.customerEmail}</span>, width: "240px" },
          ]}
          data={expanded}
          rowKey={(row) => row.id}
          pageSize={expanded.length}
        />
      </Card>

      <Card className="mt-6">
        <CardHeader title="Implementation notes" subtitle="How the stickiness works" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <Table className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-sm text-dark-7 dark:text-dark-7"><strong>Sticky header</strong> is enabled via the DataTable <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">stickyHeader</code> prop — the <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">thead</code> becomes <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">sticky top-0</code> inside a 600px scroll container.</p>
          </div>
          <div className="flex items-start gap-2">
            <LayersIcon className="mt-0.5 size-4 shrink-0 text-accent-dark" />
            <p className="text-sm text-dark-7 dark:text-dark-7"><strong>Sticky first column</strong> is achieved by adding <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">sticky left-0</code> + an opaque background to the first column via the <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">className</code> prop. The shared component lets you pass per-column classes.</p>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-primary-subtle p-4 dark:bg-primary/10">
          <Table className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm text-dark-7 dark:text-dark-7">
            Tip: try resizing the preview window narrower so the table needs horizontal scrolling — the Transaction column stays pinned on the left while everything else scrolls underneath. Then scroll vertically to confirm the header never leaves view.
          </p>
        </div>
      </Card>
    </div>
  );
}