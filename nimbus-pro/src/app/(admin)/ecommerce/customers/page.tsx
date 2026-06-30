"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { PageHeader, Card, StatCard, Badge, Button, Avatar, MoreMenu, Select } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { USERS } from "@/data/mock";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Plus, Download, Filter, Users, UserCheck, UserPlus, TrendingUp,
  ChevronRight, MapPin, Eye, Pencil, MessageSquare,
} from "lucide-react";

type User = (typeof USERS)[number];

const STATUS_TONE: Record<string, "success" | "warning" | "error" | "gray"> = {
  active: "success",
  invited: "warning",
  suspended: "error",
  pending: "gray",
};

const TIER_TONE: Record<string, "brand" | "purple" | "warning" | "gray"> = {
  Enterprise: "brand",
  Pro: "purple",
  Free: "gray",
  Starter: "warning",
};

// Decorate users with customer-specific mock data
const CUSTOMERS = USERS.map((u, i) => {
  const orders = [12, 18, 4, 22, 9, 1, 14, 6, 28, 3, 16, 2][i] ?? 5;
  const avgOrder = [148, 92, 64, 218, 105, 38, 142, 78, 184, 56, 122, 42][i] ?? 100;
  return {
    ...u,
    orders,
    totalSpent: orders * avgOrder,
    lastOrder: ["Jun 26", "Jun 22", "May 14", "Jun 25", "Jun 18", "—", "Jun 23", "Jun 10", "Jun 24", "May 02", "Jun 21", "—"][i] ?? "—",
    tier: u.plan === "Enterprise" ? "Enterprise" : u.plan === "Pro" ? "Pro" : "Free",
  };
});

export default function CustomersPage() {
  const [tier, setTier] = useState("all");
  const [status, setStatus] = useState("active");

  const filtered = useMemo(() => {
    return CUSTOMERS.filter((c) => {
      if (tier !== "all" && c.tier !== tier) return false;
      if (status !== "all" && c.status !== status) return false;
      return true;
    });
  }, [tier, status]);

  const kpis = {
    total: CUSTOMERS.length,
    active: CUSTOMERS.filter((c) => c.status === "active").length,
    newThisMonth: 3,
    avgLtv: Math.round(CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0) / CUSTOMERS.length),
  };

  const columns: Column<User & { orders: number; totalSpent: number; lastOrder: string; tier: string }>[] = [
    {
      key: "name",
      header: "Customer",
      sortable: true,
      cell: (c) => (
        <Link href="/ecommerce/customer-detail" className="flex items-center gap-3">
          <Avatar name={c.name} size={36} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400">{c.name}</p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">{c.email}</p>
          </div>
        </Link>
      ),
    },
    {
      key: "country",
      header: "Location",
      sortable: true,
      cell: (c) => (
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-sm text-gray-700 dark:text-gray-300">{c.country}</span>
        </div>
      ),
    },
    {
      key: "orders",
      header: "Orders",
      sortable: true,
      cell: (c) => <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatNumber(c.orders)}</span>,
    },
    {
      key: "totalSpent",
      header: "Total Spent",
      sortable: true,
      cell: (c) => <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(c.totalSpent)}</span>,
    },
    {
      key: "lastOrder",
      header: "Last Order",
      sortable: true,
      cell: (c) => <span className="text-sm text-gray-700 dark:text-gray-300">{c.lastOrder}</span>,
    },
    {
      key: "tier",
      header: "Tier",
      sortable: true,
      cell: (c) => <Badge tone={TIER_TONE[c.tier]} variant="soft" dot>{c.tier}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (c) => <Badge tone={STATUS_TONE[c.status]} variant="soft" dot>{c.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      cell: () => (
        <div className="flex items-center justify-end gap-1">
          <Link href="/ecommerce/customer-detail">
            <button aria-label="View" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"><ChevronRight className="h-4 w-4" /></button>
          </Link>
          <MoreMenu
            items={[
              { label: "View profile", icon: Eye },
              { label: "Edit", icon: Pencil },
              { label: "Send message", icon: MessageSquare },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Customers"
        description="Manage customer accounts, segments, and lifetime value."
        breadcrumbs={[{ label: "Ecommerce" }, { label: "Customers" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Plus className="h-4 w-4" /> Add Customer</Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Total Customers" value={formatNumber(kpis.total)} delta="+8.1%" deltaTone="up" icon={Users} iconTone="brand" footer="all time" />
        <StatCard label="Active" value={formatNumber(kpis.active)} delta={`${Math.round((kpis.active / kpis.total) * 100)}% active`} deltaTone="up" icon={UserCheck} iconTone="success" footer="last 30 days" />
        <StatCard label="New This Month" value={formatNumber(kpis.newThisMonth)} delta="+2 vs last" deltaTone="up" icon={UserPlus} iconTone="purple" footer="acquired" />
        <StatCard label="Avg. Lifetime Value" value={formatCurrency(kpis.avgLtv)} delta="+12.4%" deltaTone="up" icon={TrendingUp} iconTone="pink" footer="per customer" />
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={tier} onChange={(e) => setTier(e.target.value)} className="w-auto min-w-[140px]">
              <option value="all">All tiers</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Pro">Pro</option>
              <option value="Free">Free</option>
            </Select>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} className="w-auto min-w-[140px]">
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="invited">Invited</option>
              <option value="suspended">Suspended</option>
            </Select>
            <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> More filters</Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">{filtered.length} customers</span>
            <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Export CSV</Button>
          </div>
        </div>
      </Card>

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={10}
        searchPlaceholder="Search by name or email..."
        emptyMessage="No customers match your filters"
      />
    </div>
  );
}
