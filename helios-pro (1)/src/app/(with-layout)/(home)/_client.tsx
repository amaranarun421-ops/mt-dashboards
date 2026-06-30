"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { DataTable } from "@/components/shared/data-table";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  ShoppingBagIcon,
  WalletIcon,
  UsersIcon,
  StarIcon,
  GridIcon,
} from "@/components/Layouts/sidebar/icons";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  sold: number;
  stock: number;
  rating: number;
};

type Order = {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "paid" | "pending" | "refunded" | "shipped";
  date: string;
};

const products: Product[] = [
  { id: "P-1042", name: "Aurora Wireless Headphones", sku: "AUR-WH-01", category: "Audio", price: "$249.00", sold: 1284, stock: 312, rating: 4.8 },
  { id: "P-1043", name: "Helios Mechanical Keyboard", sku: "HEL-MK-22", category: "Peripherals", price: "$139.00", sold: 982, stock: 124, rating: 4.7 },
  { id: "P-1044", name: "Lumen Smart Desk Lamp", sku: "LUM-SDL-7", category: "Lighting", price: "$89.00", sold: 765, stock: 410, rating: 4.6 },
  { id: "P-1045", name: "Solstice 4K Webcam", sku: "SOL-4K-3", category: "Cameras", price: "$179.00", sold: 612, stock: 88, rating: 4.5 },
  { id: "P-1046", name: "Zenith Ergonomic Chair", sku: "ZEN-EC-9", category: "Furniture", price: "$549.00", sold: 408, stock: 56, rating: 4.9 },
  { id: "P-1047", name: "Nova USB-C Hub", sku: "NOV-UC-4", category: "Accessories", price: "$59.00", sold: 2240, stock: 920, rating: 4.4 },
];

const orders: Order[] = [
  { id: "#ORD-9241", customer: "Maya Lindqvist", product: "Aurora Wireless Headphones", amount: "$249.00", status: "paid", date: "2 min ago" },
  { id: "#ORD-9240", customer: "Diego Fernández", product: "Helios Mechanical Keyboard", amount: "$139.00", status: "shipped", date: "18 min ago" },
  { id: "#ORD-9239", customer: "Aiko Mori", product: "Zenith Ergonomic Chair", amount: "$549.00", status: "pending", date: "42 min ago" },
  { id: "#ORD-9238", customer: "Lucas Bauer", product: "Lumen Smart Desk Lamp", amount: "$89.00", status: "paid", date: "1 hr ago" },
  { id: "#ORD-9237", customer: "Priya Iyer", product: "Solstice 4K Webcam", amount: "$179.00", status: "refunded", date: "2 hr ago" },
];

const activity = [
  { id: "a1", user: "Sofia Mendes", action: "completed an order for", target: "Aurora Headphones", time: "Just now", tone: "success" as const },
  { id: "a2", user: "Liam Walsh", action: "left a 5-star review on", target: "Zenith Chair", time: "12 min ago", tone: "accent" as const },
  { id: "a3", user: "Priya Patel", action: "restocked inventory for", target: "Nova USB-C Hub", time: "37 min ago", tone: "primary" as const },
  { id: "a4", user: "Marcus Bell", action: "issued refund for order", target: "#ORD-9237", time: "2 hr ago", tone: "danger" as const },
  { id: "a5", user: "Yuki Tanaka", action: "added a new product", target: "Solstice 4K Webcam", time: "3 hr ago", tone: "violet" as const },
];

const statusVariant = {
  paid: "success",
  pending: "warning",
  refunded: "danger",
  shipped: "info",
} as const;

export default function EcommerceDashboard() {
  return (
    <div>
      <PageHeader
        title="Ecommerce Dashboard"
        description="Real-time store performance, sales by category and order pipeline."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Dashboards" },
          { label: "Ecommerce" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="primary" size="sm">View Store</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value="$284,920"
          delta={{ value: "+18.2%", trend: "up" }}
          icon={<WalletIcon className="size-5" />}
          tone="primary"
          sublabel="vs. last month"
        />
        <StatCard
          label="Orders"
          value="3,419"
          delta={{ value: "+9.4%", trend: "up" }}
          icon={<ShoppingBagIcon className="size-5" />}
          tone="accent"
          sublabel="612 today"
        />
        <StatCard
          label="Active Customers"
          value="2,184"
          delta={{ value: "+5.1%", trend: "up" }}
          icon={<UsersIcon className="size-5" />}
          tone="violet"
          sublabel="68% returning"
        />
        <StatCard
          label="Avg. Rating"
          value="4.7"
          delta={{ value: "+0.2", trend: "up" }}
          icon={<StarIcon className="size-5" />}
          tone="info"
          sublabel="from 8,204 reviews"
        />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="Revenue Overview"
          subtitle="Monthly revenue, last 12 months"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="success">+18.2%</Badge>}
        >
          <HeliosChart
            type="area"
            height={320}
            options={{
              xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
              stroke: { curve: "smooth", width: 3 },
              fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
              dataLabels: { enabled: false },
              yaxis: { labels: { formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` } },
            }}
            series={[
              { name: "Revenue", data: [18.2, 19.4, 21.1, 20.8, 22.6, 24.1, 23.8, 25.2, 26.7, 27.9, 28.4, 28.5] },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Sales by Category"
          subtitle="Share of total sales"
          className="col-span-12 xl:col-span-4"
        >
          <HeliosChart
            type="donut"
            height={320}
            options={{
              labels: ["Audio", "Peripherals", "Lighting", "Cameras", "Furniture", "Accessories"],
              legend: { position: "bottom" },
              dataLabels: { enabled: true, formatter: (_: number, opts: { percent?: number }) => `${Math.round((opts?.percent ?? 0) * 10) / 10}%` },
              plotOptions: { pie: { donut: { size: "70%" } } },
            }}
            series={[28, 22, 12, 10, 16, 12]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-8" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader
              title="Top Products"
              subtitle="Best-selling SKUs this month"
              action={<Badge variant="primary" size="sm">6 items</Badge>}
            />
          </div>
          <DataTable<Product>
            data={products}
            rowKey={(p) => p.id}
            pageSize={5}
            columns={[
              {
                key: "name",
                header: "Product",
                cell: (p) => (
                  <div className="flex items-center gap-3">
                    <Avatar name={p.name} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-dark dark:text-white">{p.name}</p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">{p.sku}</p>
                    </div>
                  </div>
                ),
              },
              { key: "category", header: "Category", cell: (p) => <Badge variant="neutral">{p.category}</Badge> },
              { key: "price", header: "Price", cell: (p) => <span className="font-medium">{p.price}</span> },
              { key: "sold", header: "Sold", sortable: true, sortAccessor: (p) => p.sold, cell: (p) => p.sold.toLocaleString() },
              {
                key: "rating",
                header: "Rating",
                cell: (p) => (
                  <span className="inline-flex items-center gap-1">
                    <StarIcon className="size-3.5 text-accent" />
                    <span className="font-medium">{p.rating}</span>
                  </span>
                ),
              },
            ]}
          />
        </Card>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader
            title="Customer Activity"
            subtitle="Live store events"
            action={<Badge variant="success" size="sm">Live</Badge>}
          />
          <ActivityFeed items={activity} />
        </Card>

        <Card className="col-span-12 xl:col-span-8" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader title="Recent Orders" subtitle="Latest customer purchases" />
          </div>
          <DataTable<Order>
            data={orders}
            rowKey={(o) => o.id}
            pageSize={5}
            columns={[
              { key: "id", header: "Order", cell: (o) => <span className="font-semibold text-primary dark:text-primary-light">{o.id}</span> },
              {
                key: "customer",
                header: "Customer",
                cell: (o) => (
                  <div className="flex items-center gap-2">
                    <Avatar name={o.customer} size="xs" />
                    <span className="font-medium text-dark dark:text-white">{o.customer}</span>
                  </div>
                ),
              },
              { key: "product", header: "Product", cell: (o) => <span className="text-dark-7">{o.product}</span> },
              { key: "amount", header: "Amount", cell: (o) => <span className="font-semibold">{o.amount}</span> },
              { key: "status", header: "Status", cell: (o) => <Badge variant={statusVariant[o.status]}>{o.status}</Badge> },
              { key: "date", header: "Time", cell: (o) => <span className="text-dark-5 dark:text-dark-6">{o.date}</span> },
            ]}
          />
        </Card>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="Quick Categories" subtitle="Tap to drill down" action={<GridIcon className="size-5 text-dark-5" />} />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Audio", value: "$79k", tone: "bg-primary-subtle text-primary dark:bg-primary/15" },
              { label: "Peripherals", value: "$62k", tone: "bg-accent-subtle text-accent-dark dark:bg-accent/15" },
              { label: "Lighting", value: "$34k", tone: "bg-violet-subtle text-violet dark:bg-violet/15" },
              { label: "Cameras", value: "$28k", tone: "bg-blue-light-5 text-blue-dark dark:bg-blue/15" },
              { label: "Furniture", value: "$45k", tone: "bg-rose-subtle text-rose dark:bg-rose/15" },
              { label: "Accessories", value: "$36k", tone: "bg-primary-subtle text-primary-dark dark:bg-primary/15" },
            ].map((c) => (
              <div key={c.label} className={`rounded-xl p-3 ${c.tone}`}>
                <p className="text-xs opacity-80">{c.label}</p>
                <p className="mt-1 text-lg font-bold">{c.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Ecommerce Dashboard" }]} />
      </div>
    </div>
  );
}