"use client";
import { useState, useMemo } from "react";
import { PageHeader, Card, CardHeader, CardBody, StatCard, Badge, Button, MoreMenu, Select } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { INVENTORY_LOG } from "@/data/mock";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import {
  Plus, Download, Filter, Package, CheckCircle2, AlertTriangle, XCircle,
  DollarSign, ArrowLeftRight, RefreshCw, Warehouse, TrendingDown,
} from "lucide-react";

type Inventory = (typeof INVENTORY_LOG)[number];

const STATUS_TONE: Record<string, "success" | "warning" | "error"> = {
  in_stock: "success",
  low_stock: "warning",
  out_of_stock: "error",
};

const STATUS_LABEL: Record<string, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
};

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

function colorForProduct(name: string): string {
  // Hash product name → pick a tone key (deterministic)
  const tones = ["brand", "purple", "orange", "pink", "success", "warning", "error"];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return tones[sum % tones.length];
}

export default function InventoryPage() {
  const [warehouse, setWarehouse] = useState("all");

  const filtered = useMemo(() => INVENTORY_LOG.filter((i) => warehouse === "all" ? true : i.warehouse === warehouse), [warehouse]);

  const kpis = {
    totalSkus: INVENTORY_LOG.length,
    inStock: INVENTORY_LOG.filter((i) => i.status === "in_stock").length,
    lowStock: INVENTORY_LOG.filter((i) => i.status === "low_stock").length,
    outStock: INVENTORY_LOG.filter((i) => i.status === "out_of_stock").length,
    value: INVENTORY_LOG.reduce((s, i) => s + i.onHand * 100, 0), // mock unit value ~$100
  };

  const restockSuggestions = INVENTORY_LOG.filter((i) => i.available < i.reorderPoint);

  const columns: Column<Inventory>[] = [
    {
      key: "sku",
      header: "SKU",
      sortable: true,
      cell: (i) => <span className="font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">{i.sku}</span>,
    },
    {
      key: "product",
      header: "Product",
      sortable: true,
      cell: (i) => (
        <div className="flex items-center gap-2.5">
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white", COLOR_TONE[colorForProduct(i.product)] ?? COLOR_TONE.brand)}>
            {i.product.slice(0, 2).toUpperCase()}
          </div>
          <p className="max-w-[220px] truncate text-sm font-semibold text-gray-900 dark:text-white">{i.product}</p>
        </div>
      ),
    },
    {
      key: "warehouse",
      header: "Warehouse",
      sortable: true,
      cell: (i) => (
        <div className="flex items-center gap-1.5">
          <Warehouse className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">{i.warehouse}</span>
        </div>
      ),
    },
    {
      key: "onHand",
      header: "On Hand",
      sortable: true,
      cell: (i) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatNumber(i.onHand)}</span>,
    },
    {
      key: "reserved",
      header: "Reserved",
      sortable: true,
      cell: (i) => <span className="text-sm text-warning-600 dark:text-warning-400">{formatNumber(i.reserved)}</span>,
    },
    {
      key: "available",
      header: "Available",
      sortable: true,
      cell: (i) => <span className="text-sm font-bold text-success-600 dark:text-success-400">{formatNumber(i.available)}</span>,
    },
    {
      key: "reorderPoint",
      header: "Reorder Point",
      sortable: true,
      cell: (i) => {
        const below = i.available < i.reorderPoint;
        return (
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-medium", below ? "text-error-600 dark:text-error-400" : "text-gray-700 dark:text-gray-300")}>{i.reorderPoint}</span>
            {below && (
              <span className="inline-flex items-center gap-0.5 rounded-md bg-error-50 px-1.5 py-0.5 text-[10px] font-bold text-error-700 dark:bg-error-500/15 dark:text-error-400">
                <TrendingDown className="h-2.5 w-2.5" /> Below
              </span>
            )}
          </div>
        );
      },
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
        <div className="flex items-center justify-end">
          <MoreMenu
            items={[
              { label: "Adjust stock", icon: RefreshCw },
              { label: "Transfer", icon: ArrowLeftRight },
              { label: "Reorder", icon: Plus },
              { label: "View history" },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Inventory"
        description="Track stock levels across warehouses, monitor reorder points, and trigger restocks."
        breadcrumbs={[{ label: "Ecommerce" }, { label: "Inventory" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Plus className="h-4 w-4" /> New Stock Adjustment</Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-5">
        <StatCard label="Total SKUs" value={formatNumber(kpis.totalSkus)} delta="+2 added" deltaTone="up" icon={Package} iconTone="brand" footer="across 3 warehouses" />
        <StatCard label="In Stock" value={formatNumber(kpis.inStock)} delta={`${Math.round((kpis.inStock / kpis.totalSkus) * 100)}% healthy`} deltaTone="up" icon={CheckCircle2} iconTone="success" footer="above reorder point" />
        <StatCard label="Low Stock" value={formatNumber(kpis.lowStock)} delta="needs reorder" deltaTone="down" icon={AlertTriangle} iconTone="warning" footer="action recommended" />
        <StatCard label="Out of Stock" value={formatNumber(kpis.outStock)} delta="urgent" deltaTone="down" icon={XCircle} iconTone="error" footer="0 units available" />
        <StatCard label="Inventory Value" value={formatCurrency(kpis.value)} delta="+8.2%" deltaTone="up" icon={DollarSign} iconTone="pink" footer="at cost" />
      </div>

      {/* Warehouse overview cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["Mumbai", "Singapore", "London"].map((wh) => {
          const items = INVENTORY_LOG.filter((i) => i.warehouse === wh);
          const units = items.reduce((s, i) => s + i.onHand, 0);
          const lowItems = items.filter((i) => i.status !== "in_stock").length;
          return (
            <Card key={wh}>
              <CardBody className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"><Warehouse className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{wh}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{items.length} SKUs</p>
                    </div>
                  </div>
                  <Badge tone={lowItems > 0 ? "warning" : "success"} variant="soft" dot>{lowItems > 0 ? `${lowItems} alerts` : "Healthy"}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-2 dark:border-gray-800">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Units on hand</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">{formatNumber(units)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Est. value</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(units * 100)}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="w-auto min-w-[180px]">
              <option value="all">All warehouses</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Singapore">Singapore</option>
              <option value="London">London</option>
            </Select>
            <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> More filters</Button>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{filtered.length} inventory records</span>
        </div>
      </Card>

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={10}
        searchPlaceholder="Search by SKU or product..."
        emptyMessage="No inventory matches your filters"
      />

      {/* Restock suggestions */}
      <Card>
        <CardHeader
          title="Restock suggestions"
          description="Items below their reorder point — recommended for immediate restocking"
          action={<Badge tone="error" variant="soft" dot>{restockSuggestions.length} urgent</Badge>}
        />
        <CardBody className="space-y-3">
          {restockSuggestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
              <CheckCircle2 className="h-6 w-6 text-success-500" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">All inventory is healthy</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">No restocks needed at this time.</p>
            </div>
          ) : (
            restockSuggestions.map((item) => {
              const suggested = Math.max(item.reorderPoint * 3, 100);
              return (
                <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white", COLOR_TONE[colorForProduct(item.product)] ?? COLOR_TONE.brand)}>
                      {item.product.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.product}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.sku} · {item.warehouse} warehouse</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
                      <p className="text-sm font-bold text-error-600 dark:text-error-400">{item.available}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Reorder point</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.reorderPoint}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Suggested</p>
                      <p className="text-sm font-bold text-brand-600 dark:text-brand-400">+{suggested}</p>
                    </div>
                    <Button size="sm" variant="secondary"><RefreshCw className="h-3.5 w-3.5" /> Create PO</Button>
                    <Button size="sm"><ArrowLeftRight className="h-3.5 w-3.5" /> Transfer</Button>
                  </div>
                </div>
              );
            })
          )}
        </CardBody>
      </Card>
    </div>
  );
}
