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
  UsersIcon,
  WalletIcon,
  ShoppingBagIcon,
  StarIcon,
} from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";
import {
  customers,
  customerSegments,
  type Customer,
  type CustomerSegment,
} from "@/data/ecommerce/customers";

const segmentVariant: Record<CustomerSegment, "violet" | "primary" | "info" | "accent" | "neutral" | "warning"> = {
  VIP: "violet",
  Loyal: "primary",
  New: "info",
  "At risk": "accent",
  Lost: "neutral",
  Wholesale: "warning",
};

const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CustomersClient() {
  const [query, setQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<string>("All");

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: customers.length };
    for (const s of customerSegments) {
      c[s] = customers.filter((cu) => cu.segment === s).length;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((c) => {
      if (segmentFilter !== "All" && c.segment !== segmentFilter) return false;
      if (q !== "" && !((c.name + c.email + c.location + (c.company ?? "")).toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, segmentFilter]);

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);
  const avgLTV = totalRevenue / customers.length;
  const vipCount = customers.filter((c) => c.segment === "VIP").length;
  const newCount = customers.filter((c) => c.segment === "New").length;

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage customer profiles, segments, lifetime value and order history."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/customers" },
          { label: "Customers" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="primary" size="sm">
              <UsersIcon className="size-4" />
              Add customer
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total customers" value={customers.length} delta={{ value: "+5.1%", trend: "up" }} icon={<UsersIcon className="size-5" />} tone="primary" />
        <StatCard label="Lifetime revenue" value={fmt(totalRevenue)} delta={{ value: "+18.2%", trend: "up" }} icon={<WalletIcon className="size-5" />} tone="accent" />
        <StatCard label="Avg. LTV" value={fmt(avgLTV)} icon={<ShoppingBagIcon className="size-5" />} tone="violet" />
        <StatCard label="VIP customers" value={vipCount} sublabel={`${newCount} new this month`} icon={<StarIcon className="size-5" />} tone="info" />
      </div>

      <Card className="mt-6" padded={false}>
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="relative w-full md:max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-dark-5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers by name, email or location..."
              className={`${inputClass} pl-9`}
            />
          </div>
        </div>
        <div className="px-4 pb-3 md:px-5">
          <Tabs
            variant="pills"
            value={segmentFilter}
            onChange={setSegmentFilter}
            tabs={[
              { value: "All", label: "All", badge: <Badge variant="neutral" size="sm">{counts.All}</Badge> },
              ...customerSegments.map((s) => ({
                value: s,
                label: s,
                badge: <Badge variant={segmentVariant[s]} size="sm">{counts[s]}</Badge>,
              })),
            ]}
          />
        </div>
      </Card>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <Card>
            <EmptyState
              icon={<UsersIcon className="size-7" />}
              title="No customers match your filters"
              description="Try adjusting your search query or segment filter."
              action={<Button variant="primary" size="sm" onClick={() => { setQuery(""); setSegmentFilter("All"); }}>Reset filters</Button>}
            />
          </Card>
        ) : (
          <Card padded={false}>
            <CardHeader
              title="Customers"
              subtitle={`${filtered.length} of ${customers.length} customers`}
              className="px-5 pt-5 md:px-6 md:pt-6"
              action={<Badge variant="primary">{filtered.length} shown</Badge>}
            />
            <DataTable<Customer>
              data={filtered}
              rowKey={(c) => c.id}
              pageSize={10}
              onRowClick={() => {}}
              columns={[
                {
                  key: "name",
                  header: "Customer",
                  sortable: true,
                  sortAccessor: (c) => c.name,
                  cell: (c) => (
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} src={c.avatar} size="md" />
                      <div className="min-w-0">
                        <Link href="/ecommerce/customers/detail" className="font-medium text-dark hover:text-primary dark:text-white">{c.name}</Link>
                        <p className="truncate text-xs text-dark-5 dark:text-dark-6">{c.email}</p>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "location",
                  header: "Location",
                  cell: (c) => <span className="text-dark-7 dark:text-dark-7">{c.location}</span>,
                },
                {
                  key: "segment",
                  header: "Segment",
                  sortable: true,
                  sortAccessor: (c) => c.segment,
                  cell: (c) => <Badge variant={segmentVariant[c.segment]} size="sm">{c.segment}</Badge>,
                },
                {
                  key: "ordersCount",
                  header: "Orders",
                  sortable: true,
                  sortAccessor: (c) => c.ordersCount,
                  cell: (c) => <span className="font-medium text-dark dark:text-white">{c.ordersCount}</span>,
                },
                {
                  key: "totalSpent",
                  header: "Total spent",
                  sortable: true,
                  sortAccessor: (c) => c.totalSpent,
                  cell: (c) => <span className="font-medium text-dark dark:text-white">{fmt(c.totalSpent)}</span>,
                },
                {
                  key: "avgOrderValue",
                  header: "AOV",
                  sortable: true,
                  sortAccessor: (c) => c.avgOrderValue,
                  cell: (c) => <span className="text-dark-7 dark:text-dark-7">{fmt(c.avgOrderValue)}</span>,
                },
                {
                  key: "lastOrder",
                  header: "Last order",
                  cell: (c) => <span className="text-dark-7 dark:text-dark-7">{c.lastOrder}</span>,
                },
                {
                  key: "actions",
                  header: "",
                  cell: () => (
                    <div className="flex justify-end">
                      <Link href="/ecommerce/customers/detail">
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
