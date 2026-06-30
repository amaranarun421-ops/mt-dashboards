"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, StatCard, Badge, Button, Avatar, Tabs } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { USERS, ORDERS, PRODUCTS } from "@/data/mock";
import { cn, formatCurrency, formatNumber, formatDate, initials } from "@/lib/utils";
import {
  ChevronLeft, Pencil, MessageSquare, ShoppingBag, DollarSign, Clock,
  Mail, MapPin, Calendar, Star, Package, TrendingUp, CreditCard, Truck,
} from "lucide-react";

const COLOR_TONE: Record<string, string> = {
  brand: "from-emerald-400 to-teal-500",
  purple: "from-violet-400 to-purple-500",
  orange: "from-amber-400 to-orange-500",
  pink: "from-rose-400 to-pink-500",
  success: "from-lime-400 to-emerald-500",
  warning: "from-amber-400 to-yellow-500",
  error: "from-rose-400 to-red-500",
  gray: "from-slate-400 to-slate-500",
};

const customerOrders = ORDERS.slice(0, 6).map((o, i) => ({
  ...o,
  customer: "Priya Iyer",
  items: [4, 2, 1, 3, 1, 2][i] ?? 1,
  total: [1248, 468, 199, 329, 89, 729][i] ?? 100,
  status: ["delivered", "delivered", "shipped", "delivered", "delivered", "processing"][i] as string,
}));

const addresses = [
  { id: "a1", label: "Home", default: true, line1: "42 Marine Drive, Apt 7B", city: "Mumbai", state: "Maharashtra", zip: "400021", country: "India" },
  { id: "a2", label: "Office", default: false, line1: "Bandra Kurla Complex, Tower B", city: "Mumbai", state: "Maharashtra", zip: "400051", country: "India" },
];

const notes = [
  { id: "n1", author: "Aaroh Sharma", text: "Prefers email communication over phone. VIP customer — flag any issues.", time: "Jun 12, 2026" },
  { id: "n2", author: "Priya Iyer (support)", text: "Asked about bulk discount for office order of 20+ keyboards. Quoted 15% off.", time: "May 28, 2026" },
  { id: "n3", author: "Sofia García", text: "Reported issue with previous order — resolved within 24h. Followed up, customer satisfied.", time: "Apr 14, 2026" },
];

const STATUS_TONE: Record<string, "success" | "brand" | "warning" | "error"> = {
  delivered: "success",
  shipped: "brand",
  processing: "warning",
  cancelled: "error",
};

export default function CustomerDetailPage() {
  const customer = USERS[0]; // Aaroh Sharma... but we want Priya Iyer — index 10
  const profile = { ...customer, name: "Priya Iyer", email: "priya.i@nimbuspro.io", country: "India", joined: "2023-07-04", color: "orange", plan: "Pro" };
  const [tab, setTab] = useState("overview");

  const totalOrders = 14;
  const totalSpent = 18420;
  const avgOrder = Math.round(totalSpent / totalOrders);
  const lastOrderDate = "Jun 26, 2026";

  const ltvData = [120, 240, 380, 520, 720, 980, 1280, 1560, 1820, 2100, 2300, 2520, 2780, 3100, 3420, 3800];
  const ltvOptions = {
    ...baseChartOptions("area"),
    colors: ["#8b5cf6"],
    stroke: { curve: "smooth", width: 2.5 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: ltvData.map((_, i) => `M${i + 1}`), labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `$${formatNumber(v)}` } },
    grid: { padding: { left: 4, right: 4 } },
  };

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "orders", label: "Orders", count: totalOrders },
    { value: "addresses", label: "Addresses", count: addresses.length },
    { value: "notes", label: "Notes", count: notes.length },
    { value: "activity", label: "Activity" },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Customer Profile"
        description="Detailed view of customer account, orders, and activity."
        breadcrumbs={[
          { label: "Ecommerce" },
          { label: "Customers", href: "/ecommerce/customers" },
          { label: profile.name },
        ]}
        actions={
          <>
            <Link href="/ecommerce/customers"><Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Back</Button></Link>
            <Button variant="secondary"><MessageSquare className="h-4 w-4" /> Message</Button>
            <Button><Pencil className="h-4 w-4" /> Edit</Button>
          </>
        }
      />

      {/* Profile header card */}
      <Card>
        <CardBody className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Avatar name={profile.name} size={72} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                <Badge tone="purple" variant="soft" dot>VIP · Pro</Badge>
                <Badge tone="success" variant="soft" dot>Active</Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {profile.email}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.country}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Member since {formatDate(profile.joined)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Mail className="h-3.5 w-3.5" /> Email</Button>
            <Button variant="outline" size="sm"><MessageSquare className="h-3.5 w-3.5" /> Message</Button>
          </div>
        </CardBody>
      </Card>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Total Orders" value={formatNumber(totalOrders)} delta="+3 this month" deltaTone="up" icon={ShoppingBag} iconTone="brand" footer="all time" />
        <StatCard label="Total Spent" value={formatCurrency(totalSpent)} delta="+18.2%" deltaTone="up" icon={DollarSign} iconTone="success" footer="lifetime value" />
        <StatCard label="Avg. Order Value" value={formatCurrency(avgOrder)} delta="+4.2%" deltaTone="up" icon={TrendingUp} iconTone="purple" footer="per order" />
        <StatCard label="Last Order" value={lastOrderDate} delta="3 days ago" deltaTone="neutral" icon={Clock} iconTone="pink" footer="ORD-4218" />
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === "overview" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {/* Recent orders */}
            <Card className="overflow-hidden">
              <CardHeader title="Recent orders" description="Latest purchases from this customer" action={<Button variant="ghost" size="sm" onClick={() => setTab("orders")}>View all</Button>} />
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerOrders.slice(0, 5).map((o) => (
                      <tr key={o.id}>
                        <td><Link href="/ecommerce/order-detail" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">{o.id}</Link></td>
                        <td className="text-sm text-gray-700 dark:text-gray-300">{formatDate(o.date)}</td>
                        <td className="text-sm text-gray-700 dark:text-gray-300">{o.items} items</td>
                        <td className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(o.total)}</td>
                        <td><Badge tone={STATUS_TONE[o.status]} variant="soft" dot>{o.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Customer info */}
            <Card>
              <CardHeader title="Customer information" description="Account & contact details" />
              <CardBody>
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { label: "Email", value: profile.email, icon: Mail },
                    { label: "Phone", value: "+91 98765 43210", icon: MessageSquare },
                    { label: "Location", value: "Mumbai, Maharashtra, India", icon: MapPin },
                    { label: "Timezone", value: "IST (UTC+5:30)", icon: Clock },
                    { label: "Member since", value: formatDate(profile.joined), icon: Calendar },
                    { label: "Tier", value: "Pro · VIP customer", icon: Star },
                    { label: "Preferred channel", value: "Email", icon: Mail },
                    { label: "Currency", value: "USD ($)", icon: DollarSign },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"><item.icon className="h-3.5 w-3.5" /></div>
                      <div>
                        <dt className="text-xs text-gray-500 dark:text-gray-400">{item.label}</dt>
                        <dd className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </CardBody>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card>
              <CardHeader title="Lifetime value" description="Cumulative spend over time" action={<Badge tone="success" variant="soft" dot>+24% YoY</Badge>} />
              <CardBody>
                <NimbusChart options={ltvOptions} series={[{ name: "Cumulative LTV", data: ltvData }]} type="area" height={180} />
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 dark:border-gray-800">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Avg. order</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(avgOrder)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Repeat rate</p>
                    <p className="text-lg font-bold text-success-600 dark:text-success-400">86%</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Top products" description="Most-purchased items" />
              <CardBody className="space-y-3">
                {PRODUCTS.slice(0, 3).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white", COLOR_TONE[p.color] ?? COLOR_TONE.brand)}>
                      {initials(p.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{[3, 2, 1][i] ?? 1}× purchased · {formatCurrency(p.price * ([3, 2, 1][i] ?? 1))}</p>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Quick stats" description="Engagement summary" />
              <CardBody className="space-y-2.5">
                {[
                  { label: "Avg. rating given", value: "4.7 ★", icon: Star, tone: "text-amber-500" },
                  { label: "Returns", value: "1 of 14", icon: Package, tone: "text-gray-500" },
                  { label: "Support tickets", value: "2 open", icon: MessageSquare, tone: "text-warning-500" },
                  { label: "Payment method", value: "VISA •••• 4242", icon: CreditCard, tone: "text-gray-500" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <s.icon className={cn("h-3.5 w-3.5", s.tone)} />
                      <span className="text-gray-500 dark:text-gray-400">{s.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{s.value}</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </aside>
        </div>
      )}

      {tab === "orders" && (
        <Card className="overflow-hidden">
          <CardHeader title="All orders" description={`${totalOrders} orders placed by ${profile.name}`} />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Channel</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[...customerOrders, ...customerOrders].map((o, i) => (
                  <tr key={`${o.id}-${i}`}>
                    <td><Link href="/ecommerce/order-detail" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">{o.id}</Link></td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{formatDate(o.date)}</td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{o.items} items</td>
                    <td className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(o.total)}</td>
                    <td><Badge tone="success" variant="soft" dot>paid</Badge></td>
                    <td><Badge tone={STATUS_TONE[o.status]} variant="soft" dot>{o.status}</Badge></td>
                    <td><Badge tone="brand" variant="outline">web</Badge></td>
                    <td className="text-right"><Link href="/ecommerce/order-detail" className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "addresses" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <Card key={a.id}>
              <CardBody className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"><MapPin className="h-4 w-4" /></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{a.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.default ? "Default shipping address" : "Saved address"}</p>
                    </div>
                  </div>
                  {a.default && <Badge tone="brand" variant="soft">Default</Badge>}
                </div>
                <div className="rounded-lg border border-gray-100 p-3 text-sm dark:border-gray-800">
                  <p className="text-gray-900 dark:text-white">{profile.name}</p>
                  <p className="text-gray-600 dark:text-gray-300">{a.line1}</p>
                  <p className="text-gray-600 dark:text-gray-300">{a.city}, {a.state} {a.zip}</p>
                  <p className="text-gray-600 dark:text-gray-300">{a.country}</p>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">+91 98765 43210</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                  {!a.default && <Button variant="ghost" size="sm">Set as default</Button>}
                </div>
              </CardBody>
            </Card>
          ))}
          <Card className="flex items-center justify-center border-dashed border-gray-300 p-8 dark:border-gray-700">
            <button className="flex flex-col items-center gap-2 text-gray-500 hover:text-brand-500">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800"><MapPin className="h-5 w-5" /></div>
              <span className="text-sm font-semibold">Add new address</span>
            </button>
          </Card>
        </div>
      )}

      {tab === "notes" && (
        <div className="space-y-4">
          <Card>
            <CardHeader title="Add note" description="Visible to your team only" />
            <CardBody className="space-y-3">
              <textarea placeholder="Add an internal note about this customer..." className="input min-h-[100px] resize-y" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">Notes are private and never shared with the customer.</p>
                <Button size="sm">Add note</Button>
              </div>
            </CardBody>
          </Card>
          <div className="space-y-3">
            {notes.map((n) => (
              <Card key={n.id}>
                <CardBody className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={n.author} size={32} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{n.author}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{n.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{n.text}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "activity" && (
        <Card>
          <CardHeader title="Activity timeline" description="All customer events in chronological order" />
          <CardBody>
            <ol className="relative space-y-6 border-l border-gray-200 pl-6 dark:border-gray-800">
              {[
                { icon: ShoppingBag, tone: "bg-brand-500", title: "Placed order #ORD-4218", desc: "4 items · $1,248.00", time: "Jun 26, 09:42" },
                { icon: Truck, tone: "bg-purple-500", title: "Order #ORD-4213 shipped", desc: "FedEx · tracking 7741 2890 5612", time: "Jun 24, 14:20" },
                { icon: Package, tone: "bg-success-500", title: "Received order #ORD-4213", desc: "Signed by customer", time: "Jun 23, 11:08" },
                { icon: Star, tone: "bg-amber-500", title: "Left a 5-star review", desc: "On Aurora Wireless Headphones", time: "Jun 22, 18:24" },
                { icon: CreditCard, tone: "bg-warning-500", title: "Updated payment method", desc: "Added VISA ending in 4242", time: "Jun 18, 12:14" },
                { icon: MessageSquare, tone: "bg-pink-500", title: "Contacted support", desc: "Question about bulk discount", time: "May 28, 16:30" },
                { icon: ShoppingBag, tone: "bg-brand-500", title: "First order placed", desc: "Welcome to Nimbus Pro!", time: "Jul 04, 2023" },
              ].map((a, i) => (
                <li key={i} className="relative">
                  <span className={cn("absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full text-white ring-4 ring-white dark:ring-gray-900", a.tone)}>
                    <a.icon className="h-2.5 w-2.5" />
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{a.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{a.desc}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{a.time}</p>
                </li>
              ))}
            </ol>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
