"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { DataTable } from "@/components/shared/data-table";
import { Tabs } from "@/components/shared/tabs";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { inputClass } from "@/components/shared/form-section";
import {
  ShoppingBagIcon,
  WalletIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";
import {
  orders,
  orderStatuses,
  type Order,
  type OrderStatus,
} from "@/data/ecommerce/orders";

const statusVariant: Record<OrderStatus, "success" | "info" | "accent" | "warning" | "neutral" | "danger" | "violet"> = {
  Pending: "warning",
  Processing: "info",
  "On hold": "accent",
  Shipped: "violet",
  Delivered: "success",
  Cancelled: "danger",
  Refunded: "neutral",
};

const paymentVariant: Record<Order["payment"], "success" | "warning" | "danger" | "neutral" | "info"> = {
  Paid: "success",
  Pending: "warning",
  Failed: "danger",
  Refunded: "neutral",
  "Partially refunded": "info",
};

const fmt = (n: number) => `$${n.toFixed(2)}`;

export default function OrdersClient() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: orders.length };
    for (const s of orderStatuses) {
      c[s] = orders.filter((o) => o.status === s).length;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;
      if (q !== "" && !((o.id + o.customer + o.customerEmail).toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, statusFilter]);

  const totalRevenue = orders.reduce((s, o) => (o.payment === "Paid" ? s + o.total : s), 0);
  const avgOrder = orders.reduce((s, o) => s + o.total, 0) / orders.length;
  const shipped = orders.filter((o) => o.status === "Shipped").length;
  const pending = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Manage customer orders, fulfillment status and payments."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/orders" },
          { label: "Orders" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Export CSV</Button>
            <Button variant="primary" size="sm">
              <ShoppingBagIcon className="size-4" />
              Create order
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Revenue (paid)"
          value={fmt(totalRevenue)}
          delta={{ value: "+12.4%", trend: "up" }}
          icon={<WalletIcon className="size-5" />}
          tone="primary"
        />
        <StatCard
          label="Total orders"
          value={orders.length}
          delta={{ value: "+8.1%", trend: "up" }}
          icon={<ShoppingBagIcon className="size-5" />}
          tone="accent"
        />
        <StatCard
          label="Avg. order value"
          value={fmt(avgOrder)}
          icon={<ShoppingCartIcon className="size-5" />}
          tone="violet"
        />
        <StatCard
          label="Pending fulfillment"
          value={pending}
          icon={<TruckIcon className="size-5" />}
          tone="info"
          sublabel={`${shipped} shipped today`}
        />
      </div>

      <Card className="mt-6" padded={false}>
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="relative w-full md:max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order ID, customer or email..."
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>
        <div className="px-4 pb-3 md:px-5">
          <Tabs
            variant="pills"
            value={statusFilter}
            onChange={setStatusFilter}
            tabs={[
              { value: "All", label: "All", badge: <Badge variant="neutral" size="sm">{counts.All}</Badge> },
              ...orderStatuses.map((s) => ({
                value: s,
                label: s,
                badge: <Badge variant={statusVariant[s]} size="sm">{counts[s]}</Badge>,
              })),
            ]}
          />
        </div>
      </Card>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <Card>
            <EmptyState
              icon={<ShoppingBagIcon className="size-7" />}
              title="No orders match your filters"
              description="Try adjusting your search query or status filter."
              action={<Button variant="primary" size="sm" onClick={() => { setQuery(""); setStatusFilter("All"); }}>Reset filters</Button>}
            />
          </Card>
        ) : (
          <Card padded={false}>
            <CardHeader
              title="Orders"
              subtitle={`${filtered.length} of ${orders.length} orders`}
              className="px-5 pt-5 md:px-6 md:pt-6"
              action={<Badge variant="primary">{filtered.length} shown</Badge>}
            />
            <DataTable<Order>
              data={filtered}
              rowKey={(o) => o.id}
              pageSize={10}
              onRowClick={() => {}}
              columns={[
                {
                  key: "id",
                  header: "Order",
                  sortable: true,
                  sortAccessor: (o) => o.id,
                  cell: (o) => (
                    <div>
                      <Link href="/ecommerce/orders/detail" className="font-mono font-medium text-primary hover:underline dark:text-primary-light">{o.id}</Link>
                      <p className="text-xs text-dark-5 dark:text-dark-6">{o.date} · {o.time}</p>
                    </div>
                  ),
                },
                {
                  key: "customer",
                  header: "Customer",
                  sortable: true,
                  sortAccessor: (o) => o.customer,
                  cell: (o) => (
                    <div className="flex items-center gap-3">
                      <Avatar name={o.customer} src={o.customerAvatar} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-dark dark:text-white">{o.customer}</p>
                        <p className="truncate text-xs text-dark-5 dark:text-dark-6">{o.customerEmail}</p>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "items",
                  header: "Items",
                  cell: (o) => (
                    <div className="flex -space-x-1.5">
                      {o.items.slice(0, 3).map((it, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={it.image} alt={it.name} className="size-8 rounded-full border-2 border-white object-cover dark:border-gray-dark" />
                      ))}
                      {o.items.length > 3 && (
                        <span className="grid size-8 place-items-center rounded-full border-2 border-white bg-gray-2 text-[10px] font-semibold text-dark-7 dark:border-gray-dark dark:bg-dark-3 dark:text-dark-7">
                          +{o.items.length - 3}
                        </span>
                      )}
                    </div>
                  ),
                },
                { key: "channel", header: "Channel", cell: (o) => <Badge variant="neutral" size="sm">{o.channel}</Badge> },
                {
                  key: "total",
                  header: "Total",
                  sortable: true,
                  sortAccessor: (o) => o.total,
                  cell: (o) => <span className="font-medium text-dark dark:text-white">{fmt(o.total)}</span>,
                },
                {
                  key: "payment",
                  header: "Payment",
                  cell: (o) => <Badge variant={paymentVariant[o.payment]} size="sm">{o.payment}</Badge>,
                },
                {
                  key: "status",
                  header: "Status",
                  sortable: true,
                  sortAccessor: (o) => o.status,
                  cell: (o) => <Badge variant={statusVariant[o.status]} size="sm">{o.status}</Badge>,
                },
                {
                  key: "actions",
                  header: "",
                  cell: (o) => (
                    <div className="flex justify-end">
                      <Link href="/ecommerce/orders/detail">
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </div>
                  ),
                  width: "80px",
                },
              ]}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
