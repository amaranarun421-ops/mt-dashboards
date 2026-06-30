"use client";
import { useState } from "react";
import { PageHeader, Badge } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { TRANSACTIONS } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";

type Tx = typeof TRANSACTIONS[number];

const TYPE_TONE: Record<string, "success" | "error"> = {
  credit: "success",
  debit: "error",
};

const columns: Column<Tx>[] = [
  { key: "id", header: "Tx ID", sortable: true, cell: (t) => <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white">{t.id}</span> },
  { key: "desc", header: "Description", sortable: true, cell: (t) => <span className="text-sm text-gray-700 dark:text-gray-300">{t.desc}</span> },
  { key: "category", header: "Category", sortable: true },
  { key: "account", header: "Account", sortable: true },
  { key: "date", header: "Date", sortable: true, cell: (t) => <span className="text-xs text-gray-500">{t.date}</span> },
  { key: "type", header: "Type", sortable: true, cell: (t) => <Badge tone={TYPE_TONE[t.type]} variant="soft" dot className="capitalize">{t.type}</Badge> },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    sortAccessor: (t) => t.amount,
    cell: (t) => (
      <span className={`text-sm font-bold ${t.amount > 0 ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"}`}>
        {t.amount > 0 ? "+" : ""}{formatCurrency(Math.abs(t.amount))}
      </span>
    ),
  },
];

const SIZES = [5, 10, 20];

export default function PaginationTablePage() {
  const [pageSize, setPageSize] = useState(5);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Pagination Table"
        description="Demonstrate page size selection and navigation."
        breadcrumbs={[{ label: "Tables" }, { label: "Pagination" }]}
      />

      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Page size selector</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Change how many rows appear per page</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1 dark:border-gray-700">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setPageSize(s)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  pageSize === s ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {s} / page
              </button>
            ))}
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={TRANSACTIONS as unknown as Tx[]}
        pageSize={pageSize}
        searchPlaceholder="Search transactions..."
        initialSort={{ key: "date", dir: "desc" }}
      />
    </div>
  );
}
