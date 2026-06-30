"use client";

import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { DataTable } from "@/components/shared/data-table";
import { Table, FileTextIcon, RefreshCwIcon } from "@/components/Layouts/sidebar/icons";
import { transactions, type Transaction, type TransactionStatus, type TransactionMethod } from "@/data/tables/transactions";

const statusVariant: Record<TransactionStatus, "success" | "warning" | "danger" | "info" | "violet"> = {
  Completed: "success",
  Pending: "warning",
  Failed: "danger",
  Refunded: "info",
  Disputed: "violet",
};

const methodVariant: Record<TransactionMethod, "primary" | "accent" | "info" | "violet" | "neutral" | "warning" | "success"> = {
  Visa: "primary",
  Mastercard: "accent",
  Amex: "info",
  PayPal: "violet",
  "Apple Pay": "neutral",
  "Bank Transfer": "warning",
  Crypto: "success",
};

const fmtCurrency = (amount: number, currency: Transaction["currency"]) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function DataTablePage() {
  const total = transactions.reduce((s, t) => s + t.amount, 0);
  const completed = transactions.filter((t) => t.status === "Completed").length;
  const failed = transactions.filter((t) => t.status === "Failed" || t.status === "Disputed").length;
  const avg = total / transactions.length;

  return (
    <div>
      <PageHeader
        title="Data Table"
        description="A complete DataTable demo with realistic transactions, avatars, badges, risk indicators, and built-in pagination."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/data" }, { label: "Data Table" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <RefreshCwIcon className="size-4" />
              Refresh
            </Button>
            <Button size="sm">
              <FileTextIcon className="size-4" />
              Export CSV
            </Button>
          </>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Total Volume</p>
          <p className="mt-2 text-2xl font-bold text-dark dark:text-white">${total.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
          <p className="mt-1 text-xs text-primary">{transactions.length} transactions</p>
        </Card>
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Completed</p>
          <p className="mt-2 text-2xl font-bold text-dark dark:text-white">{completed}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{Math.round((completed / transactions.length) * 100)}% of total</p>
        </Card>
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Failed / Disputed</p>
          <p className="mt-2 text-2xl font-bold text-red dark:text-red-light">{failed}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Needs review</p>
        </Card>
        <Card padded>
          <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">Average Value</p>
          <p className="mt-2 text-2xl font-bold text-dark dark:text-white">${avg.toFixed(2)}</p>
          <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">Per transaction</p>
        </Card>
      </div>

      <Card padded={false}>
        <CardHeader
          title="Recent Transactions"
          subtitle={`${transactions.length} rows of realistic payments data — paginated 10 per page`}
          action={<Badge variant="primary" size="sm">Live preview</Badge>}
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <DataTable<Transaction>
          columns={[
            {
              key: "id",
              header: "Transaction",
              cell: (row) => (
                <div className="flex items-center gap-3">
                  <Avatar name={row.customer} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{row.customer}</p>
                    <p className="truncate text-xs text-dark-5 dark:text-dark-6">{row.id} · {row.reference}</p>
                  </div>
                </div>
              ),
              width: "240px",
            },
            {
              key: "method",
              header: "Method",
              cell: (row) => <Badge variant={methodVariant[row.method]} size="sm">{row.method}</Badge>,
            },
            {
              key: "category",
              header: "Category",
              cell: (row) => <span className="text-sm text-dark-7 dark:text-dark-7">{row.category}</span>,
            },
            {
              key: "amount",
              header: "Amount",
              cell: (row) => (
                <span className="text-sm font-semibold text-dark dark:text-white">{fmtCurrency(row.amount, row.currency)}</span>
              ),
              className: "text-right",
            },
            {
              key: "riskScore",
              header: "Risk",
              cell: (row) => {
                const tone = row.riskScore >= 70 ? "text-red" : row.riskScore >= 30 ? "text-accent-dark" : "text-primary";
                return (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-12 overflow-hidden rounded-full bg-gray-2 dark:bg-white/10">
                      <div className={`h-full ${row.riskScore >= 70 ? "bg-red" : row.riskScore >= 30 ? "bg-accent" : "bg-primary"}`} style={{ width: `${row.riskScore}%` }} />
                    </div>
                    <span className={`text-xs font-semibold ${tone} dark:${tone}`}>{row.riskScore}</span>
                  </div>
                );
              },
            },
            {
              key: "date",
              header: "Date",
              cell: (row) => <span className="text-xs text-dark-5 dark:text-dark-6">{fmtDate(row.date)}</span>,
            },
            {
              key: "status",
              header: "Status",
              cell: (row) => <Badge variant={statusVariant[row.status]} size="sm">{row.status}</Badge>,
            },
          ]}
          data={transactions}
          rowKey={(row) => row.id}
          pageSize={10}
        />
      </Card>

      <Card className="mt-6">
        <CardHeader title="What this demo shows" subtitle="Built entirely on the shared DataTable component" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <Table className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-sm text-dark-7 dark:text-dark-7">30 realistic transactions with customer avatars, payment method badges, risk score progress bars, and date stamps.</p>
          </div>
          <div className="flex items-start gap-2">
            <Table className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-sm text-dark-7 dark:text-dark-7">Built-in pagination — 10 per page with a footer summary and prev/next navigation rendered by the DataTable itself.</p>
          </div>
          <div className="flex items-start gap-2">
            <Table className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-sm text-dark-7 dark:text-dark-7">Custom cell renderers compose the shared <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">Avatar</code> and <code className="rounded bg-gray-2 px-1.5 py-0.5 text-xs dark:bg-white/10">Badge</code> components for consistent visual language.</p>
          </div>
          <div className="flex items-start gap-2">
            <Table className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-sm text-dark-7 dark:text-dark-7">Risk column renders a compact progress bar that turns amber above 30 and red above 70 — visualising risk at a glance.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}