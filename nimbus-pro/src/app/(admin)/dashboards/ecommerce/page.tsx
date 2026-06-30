"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Avatar, Progress } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { REVENUE_SERIES, ORDERS_SERIES, TOP_PRODUCTS, TRAFFIC_SOURCES, ORDERS, MONTHS } from "@/data/mock";
import { formatCurrency, formatCompact } from "@/lib/utils";
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, ArrowUpRight, Star, MoreHorizontal, Plus, Download } from "lucide-react";
import { useState } from "react";

export default function EcommerceDashboard() {
  const [range, setRange] = useState<"7d" | "30d" | "12m">("12m");

  const revenueOptions = {
    ...baseChartOptions("area"),
    colors: ["#10b981", "#0ea5e9"],
    stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 4] },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `$${formatCompact(v)}` } },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    markers: { size: 0, hover: { size: 6 } },
    tooltip: { shared: true },
  };
  const revenueSeries = [
    { name: "Revenue", data: REVENUE_SERIES.map((p) => p.y) },
    { name: "Target", data: REVENUE_SERIES.map((p) => Math.round(p.y * 0.9)) },
  ];

  const ordersOptions = {
    ...baseChartOptions("bar"),
    colors: ["#10b981"],
    plotOptions: { bar: { borderRadius: 6, columnWidth: "60%", endingShape: "rounded" } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => formatCompact(v) } },
  };

  const trafficOptions = {
    ...baseChartOptions("donut"),
    labels: TRAFFIC_SOURCES.map((t) => t.name),
    colors: TRAFFIC_SOURCES.map((t) => t.color),
    legend: { show: false },
    plotOptions: { pie: { donut: { size: "70%", labels: { show: true, total: { show: true, label: "Total", formatter: () => "100%" } } } } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `${v}%` } },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ecommerce Dashboard"
        description="Real-time sales, orders, and inventory health at a glance."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Ecommerce" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Export</Button>
            <Button size="md"><Plus className="h-4 w-4" /> Add Product</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value="$1.42M" delta="+18.2%" deltaTone="up" icon={DollarSign} iconTone="brand" footer="vs last 12 months" />
        <StatCard label="Orders" value="3,824" delta="+12.4%" deltaTone="up" icon={ShoppingCart} iconTone="purple" footer="vs last 12 months" />
        <StatCard label="Customers" value="48,920" delta="+8.1%" deltaTone="up" icon={Users} iconTone="orange" footer="vs last 12 months" />
        <StatCard label="Avg. Order Value" value="$148.20" delta="-2.4%" deltaTone="down" icon={TrendingUp} iconTone="pink" footer="vs last 12 months" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Revenue vs Target"
            description="Monthly revenue compared to plan"
            action={
              <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
                {(["7d", "30d", "12m"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${range === r ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            }
          />
          <CardBody>
            <NimbusChart options={revenueOptions} series={revenueSeries} type="area" height={320} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Traffic Sources" description="Where your visitors come from" action={<button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="h-4 w-4" /></button>} />
          <CardBody>
            <NimbusChart options={trafficOptions} series={TRAFFIC_SOURCES.map((t) => t.value)} type="donut" height={260} />
            <div className="mt-4 space-y-2">
              {TRAFFIC_SOURCES.map((t) => (
                <div key={t.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-gray-700 dark:text-gray-300">{t.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{t.value}%</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Orders Volume" description="Monthly orders across all channels" action={<Badge tone="success" dot>+12.4% MoM</Badge>} />
          <CardBody>
            <NimbusChart options={ordersOptions} series={[{ name: "Orders", data: ORDERS_SERIES }]} type="bar" height={300} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Top Products" description="Best sellers this quarter" action={<button className="text-xs font-semibold text-brand-600 dark:text-brand-400">View all</button>} />
          <CardBody className="space-y-4">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  #{i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{p.sales.toLocaleString()} sold</span>
                    <span>·</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{formatCurrency(p.revenue)}</span>
                  </div>
                </div>
                <Badge tone={p.trend === "up" ? "success" : "error"} variant="soft">
                  {p.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : null}
                  {p.trend === "up" ? "Up" : "Down"}
                </Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader title="Recent Orders" description="Latest customer orders" action={<Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3 w-3" /></Button>} />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td className="font-semibold text-brand-600 dark:text-brand-400">{o.id}</td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={o.customer} size={28} />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{o.customer}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{o.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold text-gray-900 dark:text-white">{formatCurrency(o.total)}</td>
                    <td>
                      <Badge
                        tone={
                          o.status === "delivered" ? "success" :
                          o.status === "shipped" ? "brand" :
                          o.status === "processing" ? "warning" :
                          o.status === "cancelled" ? "error" : "gray"
                        }
                        variant="soft"
                      >
                        {o.status}
                      </Badge>
                    </td>
                    <td>
                      <Badge tone={o.payment === "paid" ? "success" : o.payment === "pending" ? "warning" : "error"} variant="soft">
                        {o.payment}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader title="Inventory Health" description="Stock levels across categories" />
          <CardBody className="space-y-4">
            {[
              { name: "Audio", level: 82, tone: "brand" as const, stock: "1,420 units" },
              { name: "Peripherals", level: 64, tone: "success" as const, stock: "892 units" },
              { name: "Smart Home", level: 48, tone: "warning" as const, stock: "612 units" },
              { name: "Cameras", level: 12, tone: "error" as const, stock: "84 units" },
              { name: "Displays", level: 72, tone: "purple" as const, stock: "238 units" },
            ].map((c) => (
              <div key={c.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{c.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{c.stock}</span>
                </div>
                <Progress value={c.level} tone={c.tone} />
              </div>
            ))}
            <div className="rounded-xl bg-brand-50 p-4 dark:bg-brand-500/10">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Reorder needed</p>
              </div>
              <p className="mt-1 text-xs text-brand-600 dark:text-brand-400">3 SKUs are below reorder point. Review inventory.</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="overflow-hidden border-0 bg-gradient-to-br from-brand-500 to-accent-500 text-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
          {[
            { label: "Avg. Rating", value: "4.7", icon: Star },
            { label: "Reviews", value: "8,420", icon: Users },
            { label: "Repeat Customers", value: "62%", icon: TrendingUp },
            { label: "Net Promoter Score", value: "+58", icon: ArrowUpRight },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs font-medium opacity-90">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
