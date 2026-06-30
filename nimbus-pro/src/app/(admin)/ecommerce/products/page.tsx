"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader, Card, StatCard, Badge, Button, IconButton, MoreMenu, Progress, Select, EmptyState } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { PRODUCTS } from "@/data/mock";
import { cn, formatCurrency, formatNumber, initials } from "@/lib/utils";
import {
  Plus, Download, Filter, Package, CheckCircle2, AlertTriangle, XCircle,
  LayoutGrid, List, Star, MoreHorizontal, Pencil, Eye, Trash2, Copy,
} from "lucide-react";

type Product = (typeof PRODUCTS)[number];

const COLOR_TONE: Record<string, string> = {
  brand: "from-emerald-400 to-teal-500",
  purple: "from-violet-400 to-purple-500",
  orange: "from-amber-400 to-orange-500",
  pink: "from-rose-400 to-pink-500",
  success: "from-lime-400 to-emerald-500",
  warning: "from-amber-400 to-yellow-500",
  error: "from-rose-400 to-red-500",
  gray: "from-slate-400 to-slate-500",
};

const STATUS_TONE: Record<string, "success" | "brand" | "warning" | "error"> = {
  active: "success",
  out_of_stock: "error",
  low_stock: "warning",
  draft: "brand",
};

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  out_of_stock: "Out of stock",
  low_stock: "Low stock",
  draft: "Draft",
};

const CATEGORIES = ["All", "Audio", "Peripherals", "Cameras", "Office", "Accessories", "Smart Home", "Wearables", "Displays"];

function ProductThumb({ name, color, size = 64 }: { name: string; color: string; size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-bold text-white", COLOR_TONE[color] ?? COLOR_TONE.brand)}
    >
      <span style={{ fontSize: size * 0.34 }}>{initials(name)}</span>
    </div>
  );
}

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700")}
        />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (status !== "all" && p.status !== status) return false;
      return true;
    });
  }, [category, status]);

  const kpis = {
    total: PRODUCTS.length,
    active: PRODUCTS.filter((p) => p.status === "active").length,
    out: PRODUCTS.filter((p) => p.status === "out_of_stock").length,
    low: PRODUCTS.filter((p) => p.status === "low_stock").length,
  };

  const columns: Column<Product>[] = [
    {
      key: "name",
      header: "Product",
      sortable: true,
      cell: (p) => (
        <Link href="/ecommerce/product-detail" className="flex items-center gap-3">
          <ProductThumb name={p.name} color={p.color} size={40} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{p.sku}</p>
          </div>
        </Link>
      ),
    },
    { key: "sku", header: "SKU", sortable: true, cell: (p) => <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{p.sku}</span> },
    { key: "category", header: "Category", sortable: true, cell: (p) => <Badge tone="gray" variant="soft">{p.category}</Badge> },
    {
      key: "price",
      header: "Price",
      sortable: true,
      cell: (p) => <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(p.price)}</span>,
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      cell: (p) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatNumber(p.stock)}</span>
          <div className="w-16">
            <Progress value={Math.min(100, (p.stock / 250) * 100)} size="sm" tone={p.stock === 0 ? "error" : p.stock < 20 ? "warning" : "success"} />
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (p) => <Badge tone={STATUS_TONE[p.status]} variant="soft" dot>{STATUS_LABEL[p.status]}</Badge>,
    },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      sortAccessor: (p) => p.rating,
      cell: (p) => (
        <div className="flex items-center gap-1.5">
          <Stars rating={p.rating} />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{p.rating} ({formatNumber(p.reviews)})</span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: () => (
        <div className="flex items-center justify-end">
          <MoreMenu
            items={[
              { label: "View", icon: Eye },
              { label: "Edit", icon: Pencil },
              { label: "Duplicate", icon: Copy },
              { label: "Delete", icon: Trash2, danger: true },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Products"
        description="Manage your catalog, pricing, inventory, and product availability."
        breadcrumbs={[{ label: "Ecommerce" }, { label: "Products" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Link href="/ecommerce/product-add">
              <Button><Plus className="h-4 w-4" /> Add Product</Button>
            </Link>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Total Products" value={formatNumber(kpis.total)} delta="+4 this month" deltaTone="up" icon={Package} iconTone="brand" footer="across 8 categories" />
        <StatCard label="Active" value={formatNumber(kpis.active)} delta={`${Math.round((kpis.active / kpis.total) * 100)}% active`} deltaTone="up" icon={CheckCircle2} iconTone="success" footer="published to storefront" />
        <StatCard label="Out of Stock" value={formatNumber(kpis.out)} delta="needs reorder" deltaTone="down" icon={XCircle} iconTone="error" footer="0 units available" />
        <StatCard label="Low Stock" value={formatNumber(kpis.low)} delta="below threshold" deltaTone="down" icon={AlertTriangle} iconTone="warning" footer="action recommended" />
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={category} onChange={(e) => setCategory(e.target.value)} className="w-auto min-w-[160px]">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>)}
            </Select>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-auto min-w-[140px]">
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="low_stock">Low stock</option>
              <option value="out_of_stock">Out of stock</option>
              <option value="draft">Draft</option>
            </Select>
            <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> More filters</Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">{filtered.length} products</span>
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={cn("inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors", view === "grid" ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={cn("inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors", view === "list" ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {view === "grid" ? (
        <>
          {filtered.length === 0 ? (
            <Card>
              <EmptyState
                icon={Package}
                title="No products match your filters"
                description="Try adjusting the category or status filters, or add a new product."
                action={<Button><Plus className="h-4 w-4" /> Add Product</Button>}
              />
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <Card key={p.id} hover className="group flex flex-col overflow-hidden">
                  <Link href="/ecommerce/product-detail" className="relative block">
                    <div className={cn("flex aspect-[4/3] items-center justify-center bg-gradient-to-br text-white", COLOR_TONE[p.color] ?? COLOR_TONE.brand)}>
                      <span className="text-3xl font-bold">{initials(p.name)}</span>
                    </div>
                    <div className="absolute left-3 top-3">
                      <Badge tone={STATUS_TONE[p.status]} variant="solid" dot>{STATUS_LABEL[p.status]}</Badge>
                    </div>
                    <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <IconButton aria-label="More" className="bg-white/90 backdrop-blur hover:bg-white dark:bg-gray-900/90"><MoreHorizontal className="h-4 w-4" /></IconButton>
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link href="/ecommerce/product-detail">
                          <p className="truncate text-sm font-semibold text-gray-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400">{p.name}</p>
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.sku} · {p.category}</p>
                      </div>
                      <MoreMenu
                        items={[
                          { label: "View", icon: Eye },
                          { label: "Edit", icon: Pencil },
                          { label: "Duplicate", icon: Copy },
                          { label: "Delete", icon: Trash2, danger: true },
                        ]}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Stars rating={p.rating} />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{p.rating} ({formatNumber(p.reviews)})</span>
                      </div>
                      <Badge tone="gray" variant="outline">{formatNumber(p.stock)} in stock</Badge>
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                      <div>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(p.price)}</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">cost {formatCurrency(p.cost)}</p>
                      </div>
                      <Link href="/ecommerce/product-edit">
                        <Button size="sm" variant="secondary"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          pageSize={10}
          searchPlaceholder="Search products by name or SKU..."
          emptyMessage="No products match your filters"
        />
      )}
    </div>
  );
}
