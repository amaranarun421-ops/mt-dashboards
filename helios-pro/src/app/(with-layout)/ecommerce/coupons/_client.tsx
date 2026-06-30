"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { Tabs } from "@/components/shared/tabs";
import { Modal } from "@/components/shared/modal";
import { StatCard } from "@/components/shared/stat-card";
import { Progress } from "@/components/shared/progress";
import { EmptyState } from "@/components/shared/empty-state";
import { FormSection, FormField, inputClass } from "@/components/shared/form-section";
import {
  TagIcon,
  WalletIcon,
  CheckIcon,
  TicketIcon,
  ShoppingBagIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  coupons as initialCoupons,
  couponStatuses,
  type Coupon,
  type CouponStatus,
  type DiscountType,
} from "@/data/ecommerce/coupons";

const statusVariant: Record<CouponStatus, "success" | "info" | "neutral" | "warning"> = {
  Active: "success",
  Scheduled: "info",
  Paused: "neutral",
  Expired: "warning",
};

const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const DISCOUNT_TYPES: DiscountType[] = ["Percentage", "Fixed amount", "Free shipping", "BOGO"];

export default function CouponsClient() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<DiscountType>("Percentage");
  const [value, setValue] = useState(10);
  const [minOrder, setMinOrder] = useState(0);
  const [usageLimit, setUsageLimit] = useState(1000);
  const [startsAt, setStartsAt] = useState("Feb 01, 2025");
  const [expiresAt, setExpiresAt] = useState("May 01, 2025");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: coupons.length };
    for (const s of couponStatuses) {
      c[s] = coupons.filter((cu) => cu.status === s).length;
    }
    return c;
  }, [coupons]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return coupons.filter((c) => {
      if (statusFilter !== "All" && c.status !== statusFilter) return false;
      if (q !== "" && !((c.code + c.description).toLowerCase().includes(q))) return false;
      return true;
    });
  }, [coupons, query, statusFilter]);

  const totalRevenue = coupons.reduce((s, c) => s + c.revenue, 0);
  const totalRedemptions = coupons.reduce((s, c) => s + c.used, 0);
  const activeCount = coupons.filter((c) => c.status === "Active").length;
  const avgDiscount = coupons.filter((c) => c.type === "Percentage").reduce((s, c) => s + c.value, 0) / Math.max(1, coupons.filter((c) => c.type === "Percentage").length);

  function resetForm() {
    setCode("");
    setDescription("");
    setDiscountType("Percentage");
    setValue(10);
    setMinOrder(0);
    setUsageLimit(1000);
    setStartsAt("Feb 01, 2025");
    setExpiresAt("May 01, 2025");
  }

  function createCoupon() {
    if (code.trim() === "") return;
    const newCoupon: Coupon = {
      id: `CPN-${String(coupons.length + 1).padStart(3, "0")}`,
      code: code.toUpperCase(),
      description: description || "New coupon",
      type: discountType,
      value,
      minOrder: minOrder > 0 ? minOrder : undefined,
      status: "Active",
      startsAt,
      expiresAt,
      usageLimit,
      used: 0,
      revenue: 0,
      appliesTo: "All products",
    };
    setCoupons([newCoupon, ...coupons]);
    setModalOpen(false);
    resetForm();
  }

  function copyCode(c: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(c).catch(() => {});
    }
  }

  return (
    <div>
      <PageHeader
        title="Coupons"
        description="Create discount codes, track redemptions and measure revenue impact."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/coupons" },
          { label: "Coupons" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <TagIcon className="size-4" />
              Create coupon
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Active coupons" value={activeCount} icon={<TagIcon className="size-5" />} tone="primary" />
        <StatCard label="Redemptions" value={totalRedemptions.toLocaleString()} icon={<TicketIcon className="size-5" />} tone="accent" />
        <StatCard label="Revenue impact" value={fmt(totalRevenue)} icon={<WalletIcon className="size-5" />} tone="violet" />
        <StatCard label="Avg. discount" value={`${avgDiscount.toFixed(1)}%`} icon={<ShoppingBagIcon className="size-5" />} tone="info" />
      </div>

      <Card className="mt-6" padded={false}>
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="relative w-full md:max-w-sm">
            <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5" width={16} height={16} viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search coupons by code or description..."
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
              ...couponStatuses.map((s) => ({
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
              icon={<TagIcon className="size-7" />}
              title="No coupons match your filters"
              description="Try adjusting your search or status filter."
              action={<Button variant="primary" size="sm" onClick={() => { setQuery(""); setStatusFilter("All"); }}>Reset filters</Button>}
            />
          </Card>
        ) : (
          <Card padded={false}>
            <CardHeader
              title="Coupons"
              subtitle={`${filtered.length} of ${coupons.length} coupons`}
              className="px-5 pt-5 md:px-6 md:pt-6"
              action={<Badge variant="primary">{filtered.length} shown</Badge>}
            />
            <DataTable<Coupon>
              data={filtered}
              rowKey={(c) => c.id}
              pageSize={10}
              columns={[
                {
                  key: "code",
                  header: "Code",
                  sortable: true,
                  sortAccessor: (c) => c.code,
                  cell: (c) => (
                    <div>
                      <button
                        onClick={() => copyCode(c.code)}
                        className="group inline-flex items-center gap-1.5 rounded-md bg-gray-2 px-2.5 py-1 font-mono text-sm font-semibold text-dark hover:bg-primary-subtle hover:text-primary dark:bg-dark-3 dark:text-white dark:hover:bg-primary/15 dark:hover:text-primary-light"
                        title="Click to copy"
                      >
                        {c.code}
                        <svg className="size-3.5 opacity-0 transition group-hover:opacity-100" viewBox="0 0 24 24" fill="none">
                          <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </button>
                      <p className="mt-1 max-w-[280px] text-xs text-dark-5 dark:text-dark-6">{c.description}</p>
                    </div>
                  ),
                },
                {
                  key: "type",
                  header: "Discount",
                  cell: (c) => (
                    <div>
                      <Badge variant={c.type === "Percentage" ? "primary" : c.type === "Fixed amount" ? "accent" : c.type === "Free shipping" ? "info" : "violet"} size="sm">{c.type}</Badge>
                      <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                        {c.type === "Percentage" ? `${c.value}% off` : c.type === "Fixed amount" ? `$${c.value} off` : c.type === "Free shipping" ? "Free delivery" : "Buy one, get one"}
                        {c.minOrder ? ` · min $${c.minOrder}` : ""}
                      </p>
                    </div>
                  ),
                },
                {
                  key: "used",
                  header: "Usage",
                  sortable: true,
                  sortAccessor: (c) => c.used,
                  cell: (c) => (
                    <div className="w-32">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-dark dark:text-white">{c.used.toLocaleString()}</span>
                        <span className="text-dark-5 dark:text-dark-6">/ {c.usageLimit.toLocaleString()}</span>
                      </div>
                      <Progress
                        value={(c.used / c.usageLimit) * 100}
                        tone={c.used / c.usageLimit > 0.85 ? "danger" : c.used / c.usageLimit > 0.6 ? "accent" : "primary"}
                        size="xs"
                        className="mt-1"
                      />
                    </div>
                  ),
                },
                {
                  key: "revenue",
                  header: "Revenue",
                  sortable: true,
                  sortAccessor: (c) => c.revenue,
                  cell: (c) => <span className="font-medium text-dark dark:text-white">{c.revenue > 0 ? fmt(c.revenue) : "—"}</span>,
                },
                {
                  key: "expiresAt",
                  header: "Expires",
                  sortable: true,
                  sortAccessor: (c) => c.expiresAt,
                  cell: (c) => (
                    <div>
                      <p className="text-dark-7 dark:text-dark-7">{c.expiresAt}</p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">From {c.startsAt}</p>
                    </div>
                  ),
                },
                {
                  key: "appliesTo",
                  header: "Applies to",
                  cell: (c) => (
                    <div>
                      <span className="text-dark-7 dark:text-dark-7">{c.appliesTo}</span>
                      {c.target && <p className="text-xs text-dark-5 dark:text-dark-6">{c.target}</p>}
                    </div>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  cell: (c) => <Badge variant={statusVariant[c.status]} size="sm">{c.status}</Badge>,
                },
                {
                  key: "actions",
                  header: "",
                  cell: (c) => (
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm">Edit</Button>
                      {c.status === "Active" && <Button variant="ghost" size="sm">Pause</Button>}
                    </div>
                  ),
                  width: "120px",
                },
              ]}
            />
          </Card>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); resetForm(); }}
        title="Create coupon"
        description="Set up a new discount code for your store."
        size="lg"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => { setModalOpen(false); resetForm(); }}>Cancel</Button>
            <Button variant="primary" size="md" onClick={createCoupon} disabled={code.trim() === ""}>
              <CheckIcon className="size-4" />
              Create coupon
            </Button>
          </>
        }
      >
        <div className="space-y-5">
          <FormSection title="Coupon details" columns={2}>
            <FormField label="Code" htmlFor="code" required hint="Customers enter this at checkout.">
              <input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="SUMMER25"
                className={`${inputClass} font-mono uppercase`}
              />
            </FormField>
            <FormField label="Description" htmlFor="description">
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="25% off summer sale"
                className={inputClass}
              />
            </FormField>
          </FormSection>

          <FormSection title="Discount" columns={2}>
            <FormField label="Type" htmlFor="type">
              <select
                id="type"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                className={inputClass}
              >
                {DISCOUNT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField
              label={discountType === "Percentage" ? "Percentage off" : discountType === "Fixed amount" ? "Amount off" : "—"}
              htmlFor="value"
            >
              <input
                id="value"
                type="number"
                min={0}
                value={value}
                onChange={(e) => setValue(Math.max(0, Number(e.target.value) || 0))}
                disabled={discountType === "Free shipping" || discountType === "BOGO"}
                className={inputClass}
              />
            </FormField>
            <FormField label="Minimum order ($)" htmlFor="minOrder" hint="Coupon requires order subtotal above this.">
              <input
                id="minOrder"
                type="number"
                min={0}
                value={minOrder}
                onChange={(e) => setMinOrder(Math.max(0, Number(e.target.value) || 0))}
                className={inputClass}
              />
            </FormField>
            <FormField label="Usage limit" htmlFor="usageLimit" hint="Total redemptions allowed.">
              <input
                id="usageLimit"
                type="number"
                min={1}
                value={usageLimit}
                onChange={(e) => setUsageLimit(Math.max(1, Number(e.target.value) || 1))}
                className={inputClass}
              />
            </FormField>
          </FormSection>

          <FormSection title="Schedule" columns={2}>
            <FormField label="Starts" htmlFor="startsAt">
              <input id="startsAt" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className={inputClass} />
            </FormField>
            <FormField label="Expires" htmlFor="expiresAt">
              <input id="expiresAt" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className={inputClass} />
            </FormField>
          </FormSection>

          <div className="rounded-lg border border-primary/30 bg-primary-subtle/60 p-4 dark:border-primary/30 dark:bg-primary/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-light">Preview</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="font-mono text-lg font-bold text-dark dark:text-white">{code || "CODE"}</p>
                <p className="text-sm text-dark-7 dark:text-dark-7">
                  {discountType === "Percentage" ? `${value}% off entire order` : discountType === "Fixed amount" ? `$${value} off` : discountType === "Free shipping" ? "Free shipping" : "Buy one, get one free"}
                  {minOrder > 0 && ` · min $${minOrder}`}
                </p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
