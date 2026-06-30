"use client";
import { useState, useMemo } from "react";
import { PageHeader, Card, Badge, Button, Checkbox } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { PRODUCTS } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import { Eye, EyeOff, RotateCcw, Columns3 } from "lucide-react";

type Product = (typeof PRODUCTS)[number];

const STATUS_TONE: Record<string, "success" | "warning" | "error" | "gray"> = {
  active: "success",
  low_stock: "warning",
  out_of_stock: "error",
};

const ALL_COLUMNS: Column<Product>[] = [
  { key: "name", header: "Product", sortable: true, cell: (p) => (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-[10px] font-bold text-white">
        {p.name.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
        <p className="font-mono text-[11px] text-gray-500">{p.sku}</p>
      </div>
    </div>
  ) },
  { key: "sku", header: "SKU", sortable: true, cell: (p) => <span className="font-mono text-xs text-gray-600 dark:text-gray-400">{p.sku}</span> },
  { key: "category", header: "Category", sortable: true, cell: (p) => <Badge tone="gray" variant="soft">{p.category}</Badge> },
  { key: "price", header: "Price", sortable: true, cell: (p) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(p.price)}</span> },
  { key: "cost", header: "Cost", sortable: true, cell: (p) => <span className="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(p.cost)}</span> },
  { key: "stock", header: "Stock", sortable: true, cell: (p) => (
    <span className={`text-sm font-semibold ${p.stock === 0 ? "text-error-600 dark:text-error-400" : p.stock < 20 ? "text-warning-600 dark:text-warning-400" : "text-gray-700 dark:text-gray-300"}`}>
      {p.stock}
    </span>
  ) },
  { key: "rating", header: "Rating", sortable: true, cell: (p) => (
    <div className="flex items-center gap-1">
      <span className="text-sm font-semibold text-gray-900 dark:text-white">{p.rating}</span>
      <span className="text-xs text-gray-400">({p.reviews})</span>
    </div>
  ) },
  { key: "status", header: "Status", sortable: true, cell: (p) => <Badge tone={STATUS_TONE[p.status]} variant="soft" dot className="capitalize">{p.status.replace("_", " ")}</Badge> },
];

const ALL_KEYS = ALL_COLUMNS.map((c) => c.key);
const DEFAULT_VISIBLE = ["name", "category", "price", "stock", "status"];

export default function ColumnVisibilityPage() {
  const [visible, setVisible] = useState<Set<string>>(new Set(DEFAULT_VISIBLE));

  const toggle = (key: string) => {
    setVisible((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const showAll = () => setVisible(new Set(ALL_KEYS));
  const hideAll = () => setVisible(new Set());
  const reset = () => setVisible(new Set(DEFAULT_VISIBLE));

  const columns = useMemo(() => ALL_COLUMNS.filter((c) => visible.has(c.key)), [visible]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Column Visibility"
        description="Toggle which columns appear in the table using the toolbar below."
        breadcrumbs={[{ label: "Tables" }, { label: "Column Visibility" }]}
        actions={<Button variant="secondary" onClick={reset}><RotateCcw className="h-4 w-4" /> Reset</Button>}
      />

      <Card className="p-0">
        {/* Column toggle toolbar */}
        <div className="border-b border-gray-100 p-4 dark:border-gray-800">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                <Columns3 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Toggle columns</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Showing <span className="font-semibold text-brand-600 dark:text-brand-400">{visible.size}</span> of {ALL_COLUMNS.length} columns
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={showAll}><Eye className="h-3.5 w-3.5" /> Show all</Button>
              <Button variant="outline" size="sm" onClick={hideAll}><EyeOff className="h-3.5 w-3.5" /> Hide all</Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {ALL_COLUMNS.map((col) => {
              const isOn = visible.has(col.key);
              return (
                <button
                  key={col.key}
                  onClick={() => toggle(col.key)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    isOn
                      ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-700 dark:bg-brand-500/15 dark:text-brand-400"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                  }`}
                >
                  <span className={`flex h-3.5 w-3.5 items-center justify-center rounded ${isOn ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}>
                    {isOn && (
                      <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  {col.header}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        {columns.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
            <EyeOff className="h-8 w-8 text-gray-300 dark:text-gray-600" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">All columns are hidden</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Enable at least one column to view data.</p>
            <Button variant="outline" size="sm" onClick={reset} className="mt-2"><RotateCcw className="h-3.5 w-3.5" /> Reset to defaults</Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={PRODUCTS as unknown as Product[]}
            pageSize={8}
            searchable={false}
            searchPlaceholder="Search products..."
            emptyMessage="No columns selected"
          />
        )}
      </Card>

      {/* Compact checkbox list variant */}
      <Card className="p-0">
        <div className="border-b border-gray-100 p-4 dark:border-gray-800">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Checkbox list variant</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Same control, different UI</p>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
          {ALL_COLUMNS.map((col) => (
            <Checkbox
              key={col.key}
              checked={visible.has(col.key)}
              onChange={() => toggle(col.key)}
              label={col.header}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
