"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, StatCard, Badge, Button, Avatar, MoreMenu, Select } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { ORDERS } from "@/data/mock";
import { cn, formatCurrency, formatNumber, formatDate } from "@/lib/utils";
import {
  Plus, Download, Filter, ShoppingCart, Clock, Truck, CheckCircle2, XCircle,
  DollarSign, ChevronRight, Eye, Pencil, Printer,
} from "lucide-react";

type Order = (typeof ORDERS)[number];

const STATUS_TONE: Record<string, "success" | "brand" | "warning" | "error" | "gray"> = {
  delivered: "success",
  shipped: "brand",
  processing: "warning",
  cancelled: "error",
  pending: "gray",
};

const PAYMENT_TONE: Record<string, "success" | "warning" | "error" | "gray"> = {
  paid: "success",
  pending: "warning",
  refunded: "error",
  failed: "error",
};

const CHANNEL_TONE: Record<string, "brand" | "purple" | "orange"> = {
  web: "brand",
  mobile: "purple",
  pos: "orange",
};

export default function OrdersPage() {
  const [tab, setTab] = useState("all");
  const [channel, setChannel] = useState("all");

  const counts = {
    all: ORDERS.length,
    processing: ORDERS.filter((o) => o.status === "processing").length,
    shipped: ORDERS.filter((o) => o.status === "shipped").length,
    delivered: ORDERS.filter((o) => o.status === "delivered").length,
    cancelled: ORDERS.filter((o) => o.status === "cancelled").length,
  };

  const revenue = ORDERS.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);

  const filtered = ORDERS.filter((o) => {
    if (tab !== "all" && o.status !== tab) return false;
    if (channel !== "all" && o.channel !== channel) return false;
    return true;
  });

  const tabs = [
    { value: "all", label: "All", count: counts.all },
    { value: "processing", label: "Processing", count: counts.processing },
    { value: "shipped", label: "Shipped", count: counts.shipped },
    { value: "delivered", label: "Delivered", count: counts.delivered },
    { value: "cancelled", label: "Cancelled", count: counts.cancelled },
  ];

  const columns: Column<Order>[] = [
    {
      key: "id",
      header: "Order",
      sortable: true,
      cell: (o) => (
        <Link href="/ecommerce/order-detail" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">{o.id}</Link>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      sortable: true,
      cell: (o) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={o.customer} size={32} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{o.customer}</p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{o.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      cell: (o) => <span className="text-sm text-gray-700 dark:text-gray-300">{formatDate(o.date)}</span>,
    },
    {
      key: "items",
      header: "Items",
      sortable: true,
      cell: (o) => <span className="text-sm text-gray-700 dark:text-gray-300">{o.items} item{o.items > 1 ? "s" : ""}</span>,
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      cell: (o) => <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(o.total)}</span>,
    },
    {
      key: "payment",
      header: "Payment",
      sortable: true,
      cell: (o) => <Badge tone={PAYMENT_TONE[o.payment]} variant="soft" dot>{o.payment}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (o) => <Badge tone={STATUS_TONE[o.status]} variant="soft" dot>{o.status}</Badge>,
    },
    {
      key: "channel",
      header: "Channel",
      sortable: true,
      cell: (o) => <Badge tone={CHANNEL_TONE[o.channel]} variant="outline">{o.channel}</Badge>,
    },
    {
      key: "actions",
      header: "",
      cell: () => (
        <div className="flex items-center justify-end gap-1">
          <Link href="/ecommerce/order-detail">
            <button aria-label="View" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"><ChevronRight className="h-4 w-4" /></button>
          </Link>
          <MoreMenu
            items={[
              { label: "View details", icon: Eye },
              { label: "Edit order", icon: Pencil },
              { label: "Print invoice", icon: Printer },
              { label: "Cancel order", icon: XCircle, danger: true },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Orders"
        description="Track, fulfill, and manage all customer orders across channels."
        breadcrumbs={[{ label: "Ecommerce" }, { label: "Orders" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Plus className="h-4 w-4" /> Create Order</Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard label="Total Orders" value={formatNumber(ORDERS.length)} delta="+12.4%" deltaTone="up" icon={ShoppingCart} iconTone="brand" footer="this month" />
        <StatCard label="Processing" value={formatNumber(counts.processing)} delta="action needed" deltaTone="down" icon={Clock} iconTone="warning" footer="awaiting fulfillment" />
        <StatCard label="Shipped" value={formatNumber(counts.shipped)} delta="in transit" deltaTone="neutral" icon={Truck} iconTone="purple" footer="carrier tracking" />
        <StatCard label="Delivered" value={formatNumber(counts.delivered)} delta={`${Math.round((counts.delivered / ORDERS.length) * 100)}% rate`} deltaTone="up" icon={CheckCircle2} iconTone="success" footer="completed" />
        <StatCard label="Cancelled" value={formatNumber(counts.cancelled)} delta={`${Math.round((counts.cancelled / ORDERS.length) * 100)}% rate`} deltaTone="down" icon={XCircle} iconTone="error" footer="refunded" />
        <StatCard label="Revenue" value={formatCurrency(revenue)} delta="+18.2%" deltaTone="up" icon={DollarSign} iconTone="pink" footer="net of refunds" />
      </div>

      {/* Tabs + filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="tab-list">
          {tabs.map((t) => (
            <button key={t.value} onClick={() => setTab(t.value)} className={cn("tab-trigger", tab === t.value && "tab-trigger-active")}>
              {t.label}
              <span className="ml-1 rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold dark:bg-gray-700">{t.count}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Select value={channel} onChange={(e) => setChannel(e.target.value)} className="w-auto min-w-[140px]">
            <option value="all">All channels</option>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="pos">POS</option>
          </Select>
          <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Date range</Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={10}
        searchPlaceholder="Search by order ID, customer name, or email..."
        emptyMessage="No orders match your filters"
        toolbar={
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Export CSV</Button>
        }
      />
    </div>
  );
}
