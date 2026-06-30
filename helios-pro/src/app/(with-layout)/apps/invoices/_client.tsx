"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { Tabs } from "@/components/shared/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { StatCard } from "@/components/shared/stat-card";
import { inputClass } from "@/components/shared/form-section";
import {
  FileTextIcon,
  EditIcon,
  CreditCardIcon,
  WalletIcon,
  AlertTriangleIcon,
  CheckIcon,
} from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";
import {
  invoices,
  invoiceStatusTone,
  type Invoice,
  type InvoiceStatus,
} from "@/data/apps/invoices";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function InvoicesClient() {
  const [filter, setFilter] = useState<InvoiceStatus | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return invoices
      .filter((i) => (filter === "all" ? true : i.status === filter))
      .filter((i) =>
        query.trim() === ""
          ? true
          : (i.id + i.client + i.owner + i.clientEmail).toLowerCase().includes(query.toLowerCase()),
      );
  }, [filter, query]);

  const stats = useMemo(() => {
    const paid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
    const outstanding = invoices
      .filter((i) => i.status === "sent")
      .reduce((s, i) => s + i.amount, 0);
    const overdue = invoices
      .filter((i) => i.status === "overdue")
      .reduce((s, i) => s + i.amount, 0);
    const drafts = invoices.filter((i) => i.status === "draft").length;
    return { paid, outstanding, overdue, drafts };
  }, []);

  const counts = useMemo(
    () => ({
      all: invoices.length,
      paid: invoices.filter((i) => i.status === "paid").length,
      sent: invoices.filter((i) => i.status === "sent").length,
      overdue: invoices.filter((i) => i.status === "overdue").length,
      draft: invoices.filter((i) => i.status === "draft").length,
    }),
    [],
  );

  const columns = [
    {
      key: "id",
      header: "Invoice",
      sortable: true,
      sortAccessor: (i: Invoice) => i.id,
      cell: (i: Invoice) => (
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
            <FileTextIcon className="size-4" />
          </span>
          <div>
            <p className="font-mono text-xs font-semibold text-dark dark:text-white">{i.id}</p>
            <p className="text-[11px] text-dark-5 dark:text-dark-6">{i.items} items</p>
          </div>
        </div>
      ),
    },
    {
      key: "client",
      header: "Client",
      sortable: true,
      sortAccessor: (i: Invoice) => i.client,
      cell: (i: Invoice) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={i.client} size="xs" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-dark dark:text-white">{i.client}</p>
            <p className="truncate text-[11px] text-dark-5 dark:text-dark-6">{i.clientEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: "owner",
      header: "Owner",
      cell: (i: Invoice) => (
        <div className="flex items-center gap-2">
          <Avatar name={i.owner} size="xs" />
          <span className="text-xs text-dark-7 dark:text-dark-7">{i.owner}</span>
        </div>
      ),
    },
    {
      key: "issued",
      header: "Issued",
      sortable: true,
      sortAccessor: (i: Invoice) => i.issued,
      cell: (i: Invoice) => <span className="text-xs text-dark-7 dark:text-dark-7">{i.issued}</span>,
    },
    {
      key: "due",
      header: "Due",
      sortable: true,
      sortAccessor: (i: Invoice) => i.due,
      cell: (i: Invoice) => <span className="text-xs text-dark-7 dark:text-dark-7">{i.due}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      sortAccessor: (i: Invoice) => i.amount,
      cell: (i: Invoice) => (
        <span className="text-sm font-semibold text-dark dark:text-white">{fmt(i.amount)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortAccessor: (i: Invoice) => i.status,
      cell: (i: Invoice) => (
        <Badge variant={invoiceStatusTone[i.status]} size="sm" className="capitalize">
          {i.status}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Invoices"
        description="Track billing, manage outstanding balances and reconcile payments."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Apps" },
          { label: "Invoices" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Export CSV</Button>
            <Link href="/apps/invoices/create">
              <Button variant="primary" size="sm">
                <EditIcon className="size-4" />
                Create invoice
              </Button>
            </Link>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Outstanding"
          value={fmt(stats.outstanding)}
          delta={{ value: "$3.2k", trend: "up" }}
          icon={<WalletIcon className="size-5" />}
          tone="info"
          sublabel={`${counts.sent} invoices sent`}
        />
        <StatCard
          label="Overdue"
          value={fmt(stats.overdue)}
          delta={{ value: "$1.8k", trend: "down" }}
          icon={<AlertTriangleIcon className="size-5" />}
          tone="danger"
          sublabel={`${counts.overdue} invoices overdue`}
        />
        <StatCard
          label="Paid this month"
          value={fmt(stats.paid)}
          delta={{ value: "12.4%", trend: "up" }}
          icon={<CheckIcon className="size-5" />}
          tone="primary"
          sublabel={`${counts.paid} invoices paid`}
        />
        <StatCard
          label="Drafts"
          value={stats.drafts}
          icon={<FileTextIcon className="size-5" />}
          tone="violet"
          sublabel="Awaiting review"
        />
      </div>

      <Card padded={false} className="mb-4">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            value={filter}
            onChange={(v) => setFilter(v as InvoiceStatus | "all")}
            variant="pills"
            tabs={[
              { value: "all", label: "All", badge: <span className="ml-1 text-[10px] opacity-70">{counts.all}</span> },
              { value: "paid", label: "Paid", badge: <span className="ml-1 text-[10px] opacity-70">{counts.paid}</span> },
              { value: "sent", label: "Sent", badge: <span className="ml-1 text-[10px] opacity-70">{counts.sent}</span> },
              { value: "overdue", label: "Overdue", badge: <span className="ml-1 text-[10px] opacity-70">{counts.overdue}</span> },
              { value: "draft", label: "Draft", badge: <span className="ml-1 text-[10px] opacity-70">{counts.draft}</span> },
            ]}
          />
          <div className="relative max-w-[260px]">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search invoices…"
              className={`${inputClass} !pl-9`}
            />
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            size="md"
            icon={<FileTextIcon className="size-6" />}
            title="No invoices match"
            description="Try a different filter or search term."
            action={
              <Link href="/apps/invoices/create">
                <Button variant="primary" size="sm">
                  <EditIcon className="size-4" />
                  Create invoice
                </Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(i) => i.id}
          pageSize={8}
          onRowClick={() => {
            window.location.href = "/apps/invoices/detail";
          }}
        />
      )}

      <Card className="mt-4" padded>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light">
              <CreditCardIcon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">Reconciliation tip</p>
              <p className="text-xs text-dark-5 dark:text-dark-6">
                3 invoices are waiting for payment matching in Stripe. Reconcile now to keep books current.
              </p>
            </div>
          </div>
          <Button variant="soft" size="sm">Open reconciler</Button>
        </div>
      </Card>
    </div>
  );
}
