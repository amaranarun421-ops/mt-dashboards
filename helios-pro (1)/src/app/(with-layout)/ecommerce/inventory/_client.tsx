"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { Tabs } from "@/components/shared/tabs";
import { Modal } from "@/components/shared/modal";
import { StatCard } from "@/components/shared/stat-card";
import { Progress } from "@/components/shared/progress";
import { HeliosChart } from "@/components/shared/helios-chart";
import { ChartCard } from "@/components/shared/chart-card";
import { EmptyState } from "@/components/shared/empty-state";
import { FormField, inputClass } from "@/components/shared/form-section";
import {
  BoxIcon,
  PackageIcon,
  AlertTriangleIcon,
  WalletIcon,
  RefreshCwIcon,
  TruckIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  inventoryItems,
  inventorySummary,
  warehouses,
  type InventoryItem,
  type StockLevel,
} from "@/data/ecommerce/inventory";

const badgeVariant: Record<StockLevel, "success" | "warning" | "danger" | "info"> = {
  "In stock": "success",
  "Low stock": "warning",
  "Out of stock": "danger",
  Backordered: "info",
};

const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export default function InventoryClient() {
  const [view, setView] = useState<"items" | "warehouses">("items");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null);
  const [restockQty, setRestockQty] = useState(0);

  const counts = useMemo(() => ({
    All: inventoryItems.length,
    "In stock": inventoryItems.filter((i) => i.status === "In stock").length,
    "Low stock": inventoryItems.filter((i) => i.status === "Low stock").length,
    "Out of stock": inventoryItems.filter((i) => i.status === "Out of stock").length,
    Backordered: inventoryItems.filter((i) => i.status === "Backordered").length,
  }), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inventoryItems.filter((i) => {
      if (statusFilter !== "All" && i.status !== statusFilter) return false;
      if (q !== "" && !((i.name + i.sku + i.category + i.warehouse).toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, statusFilter]);

  const lowStockItems = inventoryItems.filter((i) => i.status === "Low stock" || i.status === "Out of stock");

  // Stock movement chart (sum across all items)
  const movementData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((d, i) => {
      const dayItems = inventoryItems.map((it) => it.movement[i]);
      const inSum = dayItems.reduce((s, m) => s + m.in, 0);
      const outSum = dayItems.reduce((s, m) => s + m.out, 0);
      return { day: d, in: inSum, out: outSum };
    });
  }, []);

  function openRestock(item: InventoryItem) {
    setRestockItem(item);
    setRestockQty(item.reorderQty);
  }

  function confirmRestock() {
    if (!restockItem) return;
    setRestockItem(null);
    setRestockQty(0);
  }

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Track stock levels across warehouses, set reorder points and restock quickly."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/inventory" },
          { label: "Inventory" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <RefreshCwIcon className="size-4" />
              Sync stock
            </Button>
            <Button variant="primary" size="sm">
              <PackageIcon className="size-4" />
              Receive stock
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Inventory value"
          value={fmt(inventorySummary.inventoryValue)}
          icon={<WalletIcon className="size-5" />}
          tone="primary"
          sublabel={`Retail: ${fmt(inventorySummary.retailValue)}`}
        />
        <StatCard
          label="Total units"
          value={inventorySummary.total.toLocaleString()}
          icon={<BoxIcon className="size-5" />}
          tone="accent"
        />
        <StatCard
          label="Low stock items"
          value={inventorySummary.lowStock}
          icon={<AlertTriangleIcon className="size-5" />}
          tone="warning"
          sublabel={`${inventorySummary.outOfStock} out of stock`}
        />
        <StatCard
          label="Warehouses"
          value={warehouses.length}
          icon={<TruckIcon className="size-5" />}
          tone="info"
          sublabel={`${warehouses.reduce((s, w) => s + w.products, 0)} SKUs tracked`}
        />
      </div>

      {/* Low-stock alerts */}
      {lowStockItems.length > 0 && (
        <Card className="mt-6 border-accent/30 dark:border-accent/30">
          <CardHeader
            title="Low-stock alerts"
            subtitle="These items need attention — restock before they run out."
            action={<Badge variant="warning" size="sm">{lowStockItems.length} items</Badge>}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl border p-4 ${
                  item.status === "Out of stock"
                    ? "border-red/30 bg-red-light-5/40 dark:border-red/30 dark:bg-red/10"
                    : "border-accent/30 bg-accent-subtle/40 dark:border-accent/30 dark:bg-accent/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="size-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-dark dark:text-white">{item.name}</p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{item.sku} · {item.warehouse}</p>
                  </div>
                  <Badge variant={badgeVariant[item.status]} size="sm">{item.status}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-dark-5 dark:text-dark-6">
                    On hand: <span className="font-semibold text-dark dark:text-white">{item.onHand}</span> / Reorder at {item.reorderPoint}
                  </span>
                  <Button variant="primary" size="sm" onClick={() => openRestock(item)}>
                    <RefreshCwIcon className="size-3.5" />
                    Restock
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Stock movement chart */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ChartCard
          title="Stock movement"
          subtitle="Units in vs out across all warehouses (last 7 days)"
          action={<Badge variant="info">Weekly</Badge>}
        >
          <HeliosChart
            type="bar"
            height={300}
            options={{
              xaxis: { categories: movementData.map((m) => m.day) },
              plotOptions: { bar: { columnWidth: "60%", borderRadius: 6 } },
              stroke: { show: true, width: 2, colors: ["transparent"] },
              fill: { opacity: 1 },
            }}
            series={[
              { name: "Stock in", data: movementData.map((m) => m.in) },
              { name: "Stock out", data: movementData.map((m) => m.out) },
            ]}
          />
        </ChartCard>

        <Card>
          <CardHeader title="Warehouse capacity" subtitle="Distribution center utilization" />
          <div className="space-y-4">
            {warehouses.map((w) => {
              const pct = (w.used / w.capacity) * 100;
              return (
                <div key={w.id}>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-dark dark:text-white">{w.name}</p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">{w.code} · {w.location}</p>
                    </div>
                    <span className={`text-xs font-semibold ${pct > 85 ? "text-red" : pct > 70 ? "text-accent-dark dark:text-accent-light" : "text-primary dark:text-primary-light"}`}>
                      {Math.round(pct)}%
                    </span>
                  </div>
                  <Progress
                    value={pct}
                    tone={pct > 85 ? "danger" : pct > 70 ? "accent" : "primary"}
                    size="sm"
                    className="mt-2"
                  />
                  <div className="mt-1 flex items-center justify-between text-xs text-dark-5 dark:text-dark-6">
                    <span>{w.used.toLocaleString()} / {w.capacity.toLocaleString()} units</span>
                    <span>{w.products} SKUs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Tabs: items / warehouses */}
      <Card className="mt-6" padded={false}>
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <Tabs
            variant="boxed"
            value={view}
            onChange={(v) => setView(v as "items" | "warehouses")}
            tabs={[
              { value: "items", label: "Items", icon: <BoxIcon className="size-4" /> },
              { value: "warehouses", label: "Warehouses", icon: <TruckIcon className="size-4" /> },
            ]}
          />
          {view === "items" && (
            <div className="relative w-full md:max-w-sm">
              <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5" width={16} height={16} viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, SKU, category..."
                className={`${inputClass} pl-9`}
              />
            </div>
          )}
        </div>
        {view === "items" && (
          <div className="px-4 pb-3 md:px-5">
            <Tabs
              variant="pills"
              value={statusFilter}
              onChange={setStatusFilter}
              tabs={[
                { value: "All", label: "All", badge: <Badge variant="neutral" size="sm">{counts.All}</Badge> },
                { value: "In stock", label: "In stock", badge: <Badge variant="success" size="sm">{counts["In stock"]}</Badge> },
                { value: "Low stock", label: "Low stock", badge: <Badge variant="warning" size="sm">{counts["Low stock"]}</Badge> },
                { value: "Out of stock", label: "Out of stock", badge: <Badge variant="danger" size="sm">{counts["Out of stock"]}</Badge> },
                { value: "Backordered", label: "Backordered", badge: <Badge variant="info" size="sm">{counts["Backordered"]}</Badge> },
              ]}
            />
          </div>
        )}
      </Card>

      <div className="mt-6">
        {view === "items" ? (
          filtered.length === 0 ? (
            <Card>
              <EmptyState
                icon={<BoxIcon className="size-7" />}
                title="No inventory items match your filters"
                description="Try adjusting your search query or stock status filter."
                action={<Button variant="primary" size="sm" onClick={() => { setQuery(""); setStatusFilter("All"); }}>Reset filters</Button>}
              />
            </Card>
          ) : (
            <Card padded={false}>
              <CardHeader
                title="Inventory items"
                subtitle={`${filtered.length} of ${inventoryItems.length} items`}
                className="px-5 pt-5 md:px-6 md:pt-6"
                action={<Badge variant="primary">{filtered.length} shown</Badge>}
              />
              <DataTable<InventoryItem>
                data={filtered}
                rowKey={(i) => i.id}
                pageSize={10}
                columns={[
                  {
                    key: "name",
                    header: "Product",
                    sortable: true,
                    sortAccessor: (i) => i.name,
                    cell: (i) => (
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={i.image} alt={i.name} className="size-12 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <Link href="/ecommerce/products/detail" className="font-medium text-dark hover:text-primary dark:text-white">{i.name}</Link>
                          <p className="text-xs text-dark-5 dark:text-dark-6">{i.sku} · {i.category}</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "onHand",
                    header: "On hand",
                    sortable: true,
                    sortAccessor: (i) => i.onHand,
                    cell: (i) => (
                      <span className={`font-medium ${i.onHand === 0 ? "text-red" : i.onHand <= i.reorderPoint ? "text-accent-dark dark:text-accent-light" : "text-dark dark:text-white"}`}>
                        {i.onHand.toLocaleString()}
                      </span>
                    ),
                  },
                  { key: "committed", header: "Committed", cell: (i) => <span className="text-dark-7 dark:text-dark-7">{i.committed}</span> },
                  {
                    key: "available",
                    header: "Available",
                    sortable: true,
                    sortAccessor: (i) => i.available,
                    cell: (i) => <span className="font-medium text-primary dark:text-primary-light">{i.available.toLocaleString()}</span>,
                  },
                  {
                    key: "warehouse",
                    header: "Warehouse",
                    cell: (i) => <span className="text-dark-7 dark:text-dark-7">{i.warehouse}</span>,
                  },
                  {
                    key: "cost",
                    header: "Stock value",
                    sortable: true,
                    sortAccessor: (i) => i.onHand * i.cost,
                    cell: (i) => <span className="font-medium text-dark dark:text-white">{fmt(i.onHand * i.cost)}</span>,
                  },
                  {
                    key: "lastStockMovement",
                    header: "Last movement",
                    cell: (i) => <span className="text-dark-5 dark:text-dark-6">{i.lastStockMovement}</span>,
                  },
                  {
                    key: "status",
                    header: "Status",
                    cell: (i) => <Badge variant={badgeVariant[i.status]} size="sm">{i.status}</Badge>,
                  },
                  {
                    key: "actions",
                    header: "",
                    cell: (i) => (
                      <div className="flex justify-end">
                        <Button variant="soft" size="sm" onClick={() => openRestock(i)}>
                          <RefreshCwIcon className="size-3.5" />
                          Restock
                        </Button>
                      </div>
                    ),
                    width: "100px",
                  },
                ]}
              />
            </Card>
          )
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {warehouses.map((w) => {
              const pct = (w.used / w.capacity) * 100;
              const itemsHere = inventoryItems.filter((i) => i.warehouse === w.location);
              return (
                <Card key={w.id} hover>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-dark-5 dark:text-dark-6">{w.code}</p>
                      <h3 className="mt-1 font-semibold text-dark dark:text-white">{w.name}</h3>
                      <p className="text-xs text-dark-5 dark:text-dark-6">{w.location}</p>
                    </div>
                    <span className="grid size-11 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                      <TruckIcon className="size-5" />
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-dark-5 dark:text-dark-6">Capacity used</span>
                        <span className={`font-semibold ${pct > 85 ? "text-red" : pct > 70 ? "text-accent-dark dark:text-accent-light" : "text-primary dark:text-primary-light"}`}>
                          {Math.round(pct)}%
                        </span>
                      </div>
                      <Progress value={pct} tone={pct > 85 ? "danger" : pct > 70 ? "accent" : "primary"} size="sm" className="mt-1.5" />
                      <div className="mt-1 flex items-center justify-between text-xs text-dark-5 dark:text-dark-6">
                        <span>{w.used.toLocaleString()} units used</span>
                        <span>{(w.capacity - w.used).toLocaleString()} free</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-t border-stroke pt-3 dark:border-dark-3">
                      <div>
                        <p className="text-xs text-dark-5 dark:text-dark-6">SKUs</p>
                        <p className="font-semibold text-dark dark:text-white">{w.products}</p>
                      </div>
                      <div>
                        <p className="text-xs text-dark-5 dark:text-dark-6">Items here</p>
                        <p className="font-semibold text-dark dark:text-white">{itemsHere.length}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Restock modal */}
      <Modal
        open={Boolean(restockItem)}
        onClose={() => setRestockItem(null)}
        title="Receive stock"
        description={restockItem ? `Restocking ${restockItem.name}` : ""}
        size="md"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => setRestockItem(null)}>Cancel</Button>
            <Button variant="primary" size="md" onClick={confirmRestock}>
              <PackageIcon className="size-4" />
              Receive {restockQty} units
            </Button>
          </>
        }
      >
        {restockItem && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-stroke p-3 dark:border-dark-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={restockItem.image} alt={restockItem.name} className="size-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-dark dark:text-white">{restockItem.name}</p>
                <p className="text-xs text-dark-5 dark:text-dark-6">{restockItem.sku} · {restockItem.warehouse}</p>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <Badge variant={badgeVariant[restockItem.status]} size="sm">{restockItem.status}</Badge>
                  <span className="text-dark-5 dark:text-dark-6">On hand: {restockItem.onHand} · Reorder at {restockItem.reorderPoint}</span>
                </div>
              </div>
            </div>
            <FormField label="Quantity to receive" htmlFor="restockQty" hint={`Suggested reorder quantity: ${restockItem.reorderQty} units`}>
              <input
                id="restockQty"
                type="number"
                min={1}
                value={restockQty}
                onChange={(e) => setRestockQty(Math.max(1, Number(e.target.value) || 1))}
                className={inputClass}
              />
            </FormField>
            <div className="rounded-lg bg-primary-subtle/60 p-3 dark:bg-primary/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Current stock</span>
                <span className="font-medium text-dark dark:text-white">{restockItem.onHand}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Receiving</span>
                <span className="font-medium text-primary dark:text-primary-light">+{restockQty}</span>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-stroke pt-2 dark:border-dark-3">
                <span className="font-semibold text-dark dark:text-white">New stock level</span>
                <span className="font-bold text-dark dark:text-white">{restockItem.onHand + restockQty}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-dark-5 dark:text-dark-6">Restock value @ ${restockItem.cost.toFixed(2)}/unit</span>
                <span className="font-medium text-dark dark:text-white">{fmt(restockQty * restockItem.cost)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
