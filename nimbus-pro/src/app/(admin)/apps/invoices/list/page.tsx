"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, Badge, Button, IconButton, StatCard } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { INVOICES } from "@/data/mock";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Plus, Download, Filter, FileText, DollarSign, AlertCircle, Clock, MoreHorizontal, ChevronRight
} from "lucide-react";

const STATUS_TONE: Record<string, "success" | "brand" | "error" | "gray"> = {
  paid: "success",
  sent: "brand",
  overdue: "error",
  draft: "gray",
};

const STATUS_LABEL: Record<string, string> = {
  paid: "Paid",
  sent: "Sent",
  overdue: "Overdue",
  draft: "Draft",
};

type Invoice = (typeof INVOICES)[number];

export default function InvoiceListPage() {
  const [tab, setTab] = useState("all");

  const counts = {
    all: INVOICES.length,
    paid: INVOICES.filter((i) => i.status === "paid").length,
    sent: INVOICES.filter((i) => i.status === "sent").length,
    overdue: INVOICES.filter((i) => i.status === "overdue").length,
    draft: INVOICES.filter((i) => i.status === "draft").length,
  };

  const totalOutstanding = INVOICES.filter((i) => i.status === "sent").reduce((s, i) => s + i.total, 0);
  const paidThisMonth = INVOICES.filter((i) => i.status === "paid").reduce((s, i) => s + i.total, 0);
  const overdueTotal = INVOICES.filter((i) => i.status === "overdue").reduce((s, i) => s + i.total, 0);

  const filtered = INVOICES.filter((i) => (tab === "all" ? true : i.status === tab));

  const columns: Column<Invoice>[] = [
    {
      key: "id",
      header: "Invoice",
      sortable: true,
      cell: (i) => (
        <Link href="/apps/invoices/detail" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
          {i.id}
        </Link>
      ),
    },
    {
      key: "client",
      header: "Client",
      sortable: true,
      cell: (i) => (
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{i.client}</p>
          <p className="text-[11px] text-gray-500">{i.email}</p>
        </div>
      ),
    },
    {
      key: "issued",
      header: "Issued",
      sortable: true,
      cell: (i) => <span className="text-sm text-gray-700 dark:text-gray-300">{i.issued}</span>,
    },
    {
      key: "due",
      header: "Due",
      sortable: true,
      cell: (i) => (
        <span className={cn(
          "text-sm",
          i.status === "overdue" ? "font-semibold text-error-600 dark:text-error-400" : "text-gray-700 dark:text-gray-300"
        )}>
          {i.due}
        </span>
      ),
    },
    {
      key: "total",
      header: "Amount",
      sortable: true,
      cell: (i) => <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(i.total)}</span>,
    },
    {
      key: "items",
      header: "Items",
      cell: (i) => <span className="text-sm text-gray-600 dark:text-gray-400">{i.items} line items</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (i) => <Badge tone={STATUS_TONE[i.status]} variant="soft" dot>{STATUS_LABEL[i.status]}</Badge>,
    },
    {
      key: "actions",
      header: "",
      cell: () => (
        <div className="flex items-center justify-end gap-1">
          <Link href="/apps/invoices/detail">
            <IconButton aria-label="View" className="h-7 w-7"><ChevronRight className="h-3.5 w-3.5" /></IconButton>
          </Link>
          <IconButton aria-label="More" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Invoices"
        description="Manage billing, track payments, and send invoices to clients."
        breadcrumbs={[{ label: "Apps" }, { label: "Invoices" }, { label: "List" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export CSV</Button>
            <Link href="/apps/invoices/create">
              <Button><Plus className="h-4 w-4" /> Create Invoice</Button>
            </Link>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Outstanding" value={formatCurrency(totalOutstanding)} delta="+12%" deltaTone="up" icon={DollarSign} iconTone="brand" footer="across 1 invoice" />
        <StatCard label="Paid This Month" value={formatCurrency(paidThisMonth)} delta="+24%" deltaTone="up" icon={FileText} iconTone="success" footer="3 invoices" />
        <StatCard label="Overdue" value={formatCurrency(overdueTotal)} delta="+1" deltaTone="down" icon={AlertCircle} iconTone="error" footer="needs follow-up" />
        <StatCard label="Draft" value={String(counts.draft)} delta="—" deltaTone="neutral" icon={Clock} iconTone="warning" footer="ready to send" />
      </div>

      {/* Tabs */}
      <div className="tab-list">
        {[
          { id: "all", label: "All", count: counts.all },
          { id: "paid", label: "Paid", count: counts.paid },
          { id: "sent", label: "Sent", count: counts.sent },
          { id: "overdue", label: "Overdue", count: counts.overdue },
          { id: "draft", label: "Draft", count: counts.draft },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn("tab-trigger", tab === t.id && "tab-trigger-active")}
          >
            {t.label}
            <span className="ml-1 rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold dark:bg-gray-700">{t.count}</span>
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={10}
        searchPlaceholder="Search invoices by ID or client..."
        onRowClick={() => {}}
        toolbar={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
            <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Export</Button>
          </div>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Revenue (30d)</p>
            <Badge tone="success" variant="soft" dot>+24%</Badge>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(52180)}</p>
          <p className="text-xs text-gray-500">vs $42,100 last 30 days</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Avg. days to pay</p>
            <Badge tone="brand" variant="soft" dot>Healthy</Badge>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">12.4 days</p>
          <p className="text-xs text-gray-500">industry avg: 18 days</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Collection rate</p>
            <Badge tone="success" variant="soft" dot>Excellent</Badge>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">96.8%</p>
          <p className="text-xs text-gray-500">3.2% written off as bad debt</p>
        </Card>
      </div>
    </div>
  );
}
