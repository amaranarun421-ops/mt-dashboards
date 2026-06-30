"use client";
import { PageHeader, Badge, Button } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { PRODUCTS } from "@/data/mock";
import { formatCurrency } from "@/lib/utils";
import { Download, Plus } from "lucide-react";

type Product = typeof PRODUCTS[number];

const STATUS_TONE: Record<string, "success" | "warning" | "error" | "gray"> = {
  active: "success",
  low_stock: "warning",
  out_of_stock: "error",
};

const columns: Column<Product>[] = [
  {
    key: "name",
    header: "Product",
    sortable: true,
    cell: (p) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
          {p.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
          <p className="font-mono text-[11px] text-gray-500">{p.sku}</p>
        </div>
      </div>
    ),
  },
  { key: "category", header: "Category", sortable: true, cell: (p) => <span className="text-sm text-gray-700 dark:text-gray-300">{p.category}</span> },
  { key: "price", header: "Price", sortable: true, cell: (p) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(p.price)}</span> },
  { key: "stock", header: "Stock", sortable: true, cell: (p) => <span className="text-sm text-gray-700 dark:text-gray-300">{p.stock}</span> },
  {
    key: "rating",
    header: "Rating",
    sortable: true,
    sortAccessor: (p) => p.rating,
    cell: (p) => (
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{p.rating}</span>
        <span className="text-xs text-gray-400">({p.reviews})</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    cell: (p) => <Badge tone={STATUS_TONE[p.status]} variant="soft" dot className="capitalize">{p.status.replace("_", " ")}</Badge>,
  },
];

export default function DataTablePage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Data Table"
        description="Full-featured DataTable with search, sort, and pagination built-in."
        breadcrumbs={[{ label: "Tables" }, { label: "Data Table" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Plus className="h-4 w-4" /> Add product</Button>
          </>
        }
      />

      <DataTable
        columns={columns}
        data={PRODUCTS as unknown as Product[]}
        pageSize={8}
        searchPlaceholder="Search products by name, SKU, category..."
        initialSort={{ key: "name", dir: "asc" }}
      />
    </div>
  );
}
