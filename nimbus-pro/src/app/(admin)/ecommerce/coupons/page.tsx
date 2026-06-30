"use client";
import { useState, useMemo } from "react";
import { PageHeader, Card, StatCard, Badge, Button, MoreMenu, Progress } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { COUPONS } from "@/data/mock";
import { cn, formatCurrency, formatNumber, formatDate } from "@/lib/utils";
import {
  Plus, Download, Filter, Ticket, CheckCircle2, TrendingUp, Percent, DollarSign,
  Copy, Pencil, Trash2, Eye, Tag,
} from "lucide-react";

type Coupon = (typeof COUPONS)[number];

const TYPE_TONE: Record<string, "brand" | "purple"> = {
  percent: "brand",
  fixed: "purple",
};

const STATUS_TONE: Record<string, "success" | "error" | "warning" | "gray"> = {
  active: "success",
  expired: "error",
  scheduled: "warning",
  draft: "gray",
};

export default function CouponsPage() {
  const [status, setStatus] = useState("all");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => COUPONS.filter((c) => status === "all" ? true : c.status === status), [status]);

  const kpis = {
    active: COUPONS.filter((c) => c.status === "active").length,
    redeemed: COUPONS.reduce((s, c) => s + c.used, 0),
    avgDiscount: 24,
    revenueImpact: 184200,
  };

  const copy = (code: string) => {
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  const columns: Column<Coupon>[] = [
    {
      key: "code",
      header: "Code",
      sortable: true,
      cell: (c) => (
        <button onClick={() => copy(c.code)} className="group inline-flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <Ticket className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">{c.code}</p>
            <p className="flex items-center gap-1 text-[11px] text-gray-400 group-hover:text-brand-500">
              {copied === c.code ? <><CheckCircle2 className="h-3 w-3" /> Copied!</> : <><Copy className="h-3 w-3" /> Click to copy</>}
            </p>
          </div>
        </button>
      ),
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      cell: (c) => (
        <Badge tone={TYPE_TONE[c.type]} variant="soft" dot>
          {c.type === "percent" ? <Percent className="h-3 w-3" /> : <DollarSign className="h-3 w-3" />}
          {c.type === "percent" ? "Percentage" : "Fixed amount"}
        </Badge>
      ),
    },
    {
      key: "value",
      header: "Value",
      sortable: true,
      cell: (c) => <span className="text-sm font-bold text-gray-900 dark:text-white">{c.type === "percent" ? `${c.value}%` : formatCurrency(c.value)}</span>,
    },
    {
      key: "used",
      header: "Used / Limit",
      sortable: true,
      sortAccessor: (c) => c.used,
      cell: (c) => {
        const pct = c.limit > 0 ? Math.min(100, (c.used / c.limit) * 100) : 0;
        const tone = pct >= 100 ? "error" : pct >= 80 ? "warning" : "success";
        return (
          <div className="w-36">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(c.used)}</span>
              <span className="text-gray-500 dark:text-gray-400">/ {formatNumber(c.limit)}</span>
            </div>
            <Progress value={pct} size="sm" tone={tone} />
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      cell: (c) => <Badge tone={STATUS_TONE[c.status]} variant="soft" dot>{c.status}</Badge>,
    },
    {
      key: "expires",
      header: "Expires",
      sortable: true,
      cell: (c) => <span className="text-sm text-gray-700 dark:text-gray-300">{c.expires === "—" ? "No expiry" : formatDate(c.expires)}</span>,
    },
    {
      key: "actions",
      header: "",
      cell: () => (
        <div className="flex items-center justify-end">
          <MoreMenu
            items={[
              { label: "View details", icon: Eye },
              { label: "Edit coupon", icon: Pencil },
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
        title="Coupons"
        description="Create and manage discount codes, track redemptions, and analyze impact."
        breadcrumbs={[{ label: "Ecommerce" }, { label: "Coupons" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Plus className="h-4 w-4" /> Create Coupon</Button>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Active Coupons" value={formatNumber(kpis.active)} delta="+2 this month" deltaTone="up" icon={Ticket} iconTone="brand" footer="live on storefront" />
        <StatCard label="Redeemed (30d)" value={formatNumber(kpis.redeemed)} delta="+18.4%" deltaTone="up" icon={CheckCircle2} iconTone="success" footer="across all coupons" />
        <StatCard label="Avg. Discount" value={`${kpis.avgDiscount}%`} delta="—2.1% vs last" deltaTone="down" icon={Percent} iconTone="purple" footer="per redemption" />
        <StatCard label="Revenue Impact" value={formatCurrency(kpis.revenueImpact)} delta="+24.8%" deltaTone="up" icon={TrendingUp} iconTone="pink" footer="attributed to coupons" />
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="tab-list">
            {[
              { id: "all", label: "All", count: COUPONS.length },
              { id: "active", label: "Active", count: COUPONS.filter((c) => c.status === "active").length },
              { id: "expired", label: "Expired", count: COUPONS.filter((c) => c.status === "expired").length },
            ].map((t) => (
              <button key={t.id} onClick={() => setStatus(t.id)} className={cn("tab-trigger", status === t.id && "tab-trigger-active")}>
                {t.label}
                <span className="ml-1 rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold dark:bg-gray-700">{t.count}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Filter</Button>
            <span className="text-xs text-gray-500 dark:text-gray-400">{filtered.length} coupons</span>
          </div>
        </div>
      </Card>

      <DataTable
        columns={columns}
        data={filtered}
        pageSize={10}
        searchPlaceholder="Search by code..."
        emptyMessage="No coupons match your filters"
      />

      {/* Tips card */}
      <Card className="border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-500/10">
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white"><Tag className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold text-brand-800 dark:text-brand-200">Tip: Stack coupons with free shipping</p>
              <p className="text-xs text-brand-700 dark:text-brand-300">Coupons combined with free shipping thresholds see 32% higher redemption. Try creating a bundle coupon for orders over $200.</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Learn more</Button>
        </div>
      </Card>
    </div>
  );
}
