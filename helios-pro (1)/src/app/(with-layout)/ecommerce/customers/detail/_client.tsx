"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader, CardBody } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { StatCard } from "@/components/shared/stat-card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { ChartCard } from "@/components/shared/chart-card";
import { ActivityFeed } from "@/components/shared/activity-feed";
import {
  UsersIcon,
  WalletIcon,
  ShoppingBagIcon,
  StarIcon,
  ArrowLeftIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  sampleCustomer,
  customerSegments,
  type CustomerSegment,
} from "@/data/ecommerce/customers";
import { orders } from "@/data/ecommerce/orders";

const segmentVariant: Record<CustomerSegment, "violet" | "primary" | "info" | "accent" | "neutral" | "warning"> = {
  VIP: "violet",
  Loyal: "primary",
  New: "info",
  "At risk": "accent",
  Lost: "neutral",
  Wholesale: "warning",
};

const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CustomerDetailPage() {
  const c = sampleCustomer;
  const customerOrders = orders.filter((o) => o.customerEmail === c.email).slice(0, 5);

  // Build spend trend (last 12 months, fake but realistic)
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
  const spendTrend = months.map((m, i) => Math.round((c.totalSpent / 12) * (0.5 + Math.sin(i / 2) * 0.4 + (i / 12))));

  return (
    <div>
      <PageHeader
        title={c.name}
        description={`Customer since ${c.firstOrder} · ${c.ordersCount} orders`}
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Ecommerce", href: "/ecommerce/customers" },
          { label: "Customers", href: "/ecommerce/customers" },
          { label: c.id },
        ]}
        actions={
          <>
            <Link href="/ecommerce/customers">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="size-4" />
                Back
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <MailIcon className="size-4" />
              Email
            </Button>
            <Button variant="primary" size="sm">Create order</Button>
          </>
        }
      />

      {/* Profile header */}
      <Card className="mb-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={c.name} src={c.avatar} size="xl" ring />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-dark dark:text-white">{c.name}</h2>
                <Badge variant={segmentVariant[c.segment]}>{c.segment}</Badge>
              </div>
              <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">{c.email}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-dark-5 dark:text-dark-6">
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon className="size-3.5" />
                  {c.location}
                </span>
                {c.company && <span>· {c.company}</span>}
                <span>· Last seen {c.lastSeen}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">Edit profile</Button>
            <Button variant="outline" size="sm">Add tag</Button>
            <Button variant="soft" size="sm">Add note</Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Lifetime value" value={fmt(c.totalSpent)} icon={<WalletIcon className="size-5" />} tone="primary" delta={{ value: "+12.4%", trend: "up" }} />
        <StatCard label="Total orders" value={c.ordersCount} icon={<ShoppingBagIcon className="size-5" />} tone="accent" />
        <StatCard label="Avg. order value" value={fmt(c.avgOrderValue)} icon={<StarIcon className="size-5" />} tone="violet" />
        <StatCard label="Last order" value={c.lastOrder} icon={<UsersIcon className="size-5" />} tone="info" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Left: spend trend + orders + notes */}
        <div className="space-y-6">
          <ChartCard
            title="Spend trend"
            subtitle="Monthly spend over the last 12 months"
            action={<Badge variant="success">+12.4%</Badge>}
          >
            <HeliosChart
              type="bar"
              height={280}
              options={{
                xaxis: { categories: months },
                plotOptions: { bar: { columnWidth: "60%", borderRadius: 6 } },
                yaxis: { labels: { formatter: (v: number) => `$${v.toFixed(0)}` } },
                fill: { type: "gradient", gradient: { shade: "light", type: "vertical", shadeIntensity: 0.4, opacityFrom: 0.9, opacityTo: 0.7 } },
              }}
              series={[{ name: "Spend", data: spendTrend }]}
            />
          </ChartCard>

          <Card padded={false}>
            <div className="px-5 pt-5 md:px-6 md:pt-6">
              <CardHeader title="Recent orders" subtitle={`${c.ordersCount} total orders`} action={<Button variant="ghost" size="sm">View all</Button>} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-y border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-2">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Order</th>
                    <th className="px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Date</th>
                    <th className="px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Items</th>
                    <th className="px-2 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Total</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customerOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-sm text-dark-5 dark:text-dark-6">No linked orders in current dataset.</td>
                    </tr>
                  ) : customerOrders.map((o) => (
                    <tr key={o.id} className="border-b border-stroke last:border-0 dark:border-dark-3">
                      <td className="px-5 py-3">
                        <Link href="/ecommerce/orders/detail" className="font-mono font-medium text-primary hover:underline dark:text-primary-light">{o.id}</Link>
                      </td>
                      <td className="px-2 py-3 text-dark-7 dark:text-dark-7">{o.date}</td>
                      <td className="px-2 py-3 text-dark-7 dark:text-dark-7">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                      <td className="px-2 py-3 text-right font-medium text-dark dark:text-white">{fmt(o.total)}</td>
                      <td className="px-5 py-3">
                        <Badge variant={o.status === "Delivered" ? "success" : o.status === "Cancelled" ? "danger" : "info"} size="sm">{o.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader title="Internal notes" subtitle="Visible only to your team" action={<Button variant="soft" size="sm">Add note</Button>} />
            <div className="space-y-4">
              {c.notes.map((n) => (
                <div key={n.id} className="flex gap-3 rounded-lg border border-stroke p-3 dark:border-dark-3">
                  <Avatar name={n.author} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-dark dark:text-white">{n.author}</p>
                      <span className="text-xs text-dark-5 dark:text-dark-6">{n.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-dark-7 dark:text-dark-7">{n.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: customer details + activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Contact information" />
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MailIcon className="mt-0.5 size-4 text-dark-5" />
                <div className="min-w-0">
                  <p className="text-xs text-dark-5 dark:text-dark-6">Email</p>
                  <p className="font-medium text-dark dark:text-white break-all">{c.email}</p>
                </div>
              </div>
              {c.phone && (
                <div className="flex items-start gap-2">
                  <svg className="mt-0.5 size-4 text-dark-5" viewBox="0 0 24 24" fill="none">
                    <path d="M5 4h3l1.5 5L7 10c1 3 4 6 7 7l1-2.5L20 16v3a1 1 0 01-1 1A14 14 0 014 5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs text-dark-5 dark:text-dark-6">Phone</p>
                    <p className="font-medium text-dark dark:text-white">{c.phone}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 size-4 text-dark-5" />
                <div className="min-w-0">
                  <p className="text-xs text-dark-5 dark:text-dark-6">Location</p>
                  <p className="font-medium text-dark dark:text-white">{c.location}</p>
                </div>
              </div>
              {c.company && (
                <div className="flex items-start gap-2">
                  <svg className="mt-0.5 size-4 text-dark-5" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs text-dark-5 dark:text-dark-6">Company</p>
                    <p className="font-medium text-dark dark:text-white">{c.company}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title="Customer summary" />
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Customer ID</dt>
                <dd className="font-mono text-dark dark:text-white">{c.id}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Segment</dt>
                <dd><Badge variant={segmentVariant[c.segment]} size="sm">{c.segment}</Badge></dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">First order</dt>
                <dd className="text-dark dark:text-white">{c.firstOrder}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Last order</dt>
                <dd className="text-dark dark:text-white">{c.lastOrder}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Last seen</dt>
                <dd className="text-dark dark:text-white">{c.lastSeen}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Country</dt>
                <dd className="text-dark dark:text-white">{c.shippingCountry}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Payment methods</dt>
                <dd className="text-right text-dark dark:text-white">{c.paymentMethods.join(", ")}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardHeader title="Recent activity" />
            <ActivityFeed
              items={[
                { id: "a1", user: c.name, action: "placed order", target: customerOrders[0]?.id ?? "—", time: customerOrders[0]?.date ?? "Recently", tone: "success" as const },
                { id: "a2", user: c.name, action: "viewed product", target: "Helios Aero", time: "2 hr ago", tone: "primary" as const },
                { id: "a3", user: c.name, action: "added to cart", target: "Helios Buds Pro", time: "1 day ago", tone: "accent" as const },
                { id: "a4", user: c.name, action: "left a review on", target: "Helios Aero", time: "3 days ago", tone: "violet" as const },
              ]}
              compact
            />
          </Card>
        </div>
      </div>
    </div>
  );
}