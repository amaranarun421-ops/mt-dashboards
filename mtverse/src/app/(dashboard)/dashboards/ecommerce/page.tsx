"use client";

import * as React from "react";
import {
  DollarSign, ShoppingCart, ShoppingBag, TrendingUp, Plus, Download,
  Eye, RotateCcw, Star, ArrowUpRight, ArrowDownRight, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader, CardMenuButton } from "@/components/mtv/primitives";
import { AreaTrend, BarTrend, DonutChart, Sparkline } from "@/components/charts";

const salesData = [
  { month: "Jan", online: 142, retail: 89, wholesale: 56 },
  { month: "Feb", online: 168, retail: 95, wholesale: 62 },
  { month: "Mar", online: 191, retail: 102, wholesale: 71 },
  { month: "Apr", online: 178, retail: 98, wholesale: 68 },
  { month: "May", online: 215, retail: 115, wholesale: 78 },
  { month: "Jun", online: 248, retail: 128, wholesale: 85 },
  { month: "Jul", online: 286, retail: 142, wholesale: 92 },
  { month: "Aug", online: 312, retail: 156, wholesale: 98 },
  { month: "Sep", online: 334, retail: 168, wholesale: 105 },
  { month: "Oct", online: 367, retail: 178, wholesale: 112 },
  { month: "Nov", online: 412, retail: 198, wholesale: 124 },
  { month: "Dec", online: 478, retail: 234, wholesale: 142 },
];

const categoryData = [
  { name: "Electronics", value: 38, color: "var(--chart-1)" },
  { name: "Apparel", value: 24, color: "var(--chart-2)" },
  { name: "Home Goods", value: 18, color: "var(--chart-3)" },
  { name: "Beauty", value: 12, color: "var(--chart-4)" },
  { name: "Sports", value: 8, color: "var(--chart-5)" },
];

const topProducts = [
  { name: "MTVerse Pro License", sku: "MTV-PRO-001", sold: 1284, revenue: 192600, stock: 1240, rating: 4.8, trend: 12.4 },
  { name: "Wireless Headphones X3", sku: "ELEC-WH-X3", sold: 894, revenue: 89400, stock: 156, rating: 4.6, trend: 8.1 },
  { name: "Smart Watch Series 5", sku: "ELEC-SW-S5", sold: 678, revenue: 135600, stock: 89, rating: 4.7, trend: -2.3 },
  { name: "Cotton Hoodie Premium", sku: "APP-HD-PREM", sold: 542, revenue: 43360, stock: 412, rating: 4.5, trend: 5.6 },
  { name: "Desk Lamp Aurora", sku: "HOME-DL-AUR", sold: 423, revenue: 33840, stock: 0, rating: 4.4, trend: 18.9 },
];

const orders = [
  { id: "#ORD-7821", customer: "Acme Corp", items: 3, total: 4280, status: "Completed", channel: "Online" },
  { id: "#ORD-7820", customer: "Globex Inc", items: 1, total: 1240, status: "Processing", channel: "Online" },
  { id: "#ORD-7819", customer: "Initech", items: 7, total: 8650, status: "Completed", channel: "Wholesale" },
  { id: "#ORD-7818", customer: "Umbrella Co", items: 2, total: 320, status: "Pending", channel: "Retail" },
  { id: "#ORD-7817", customer: "Stark Industries", items: 12, total: 18900, status: "Completed", channel: "Wholesale" },
  { id: "#ORD-7816", customer: "Wayne Ent", items: 4, total: 5640, status: "Refunded", channel: "Online" },
  { id: "#ORD-7815", customer: "Hooli", items: 2, total: 980, status: "Completed", channel: "Online" },
];

export default function EcommerceDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Ecommerce Dashboard"
        description="Monitor your store performance, products, orders, and customer activity."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Ecommerce" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> Add Product</Button>
          </>
        }
      />

      {/* BENTO GRID — asymmetric 12-col layout with rounded-2xl + varied bgs */}
      <div className="grid grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)]">
        {/* Hero stat — Total Revenue, col-span-6 row-span-2, gradient bg */}
        <Card className="col-span-12 lg:col-span-6 lg:row-span-2 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-card border-primary/20 overflow-hidden relative shadow-sm">
          <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 bottom-0 size-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          <div className="p-6 flex flex-col h-full relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <DollarSign className="size-3.5" /> Total Revenue
                </div>
                <p className="mt-3 text-5xl md:text-6xl font-bold tracking-tight tabular-nums">$284,920</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="bg-success/10 text-success border-success/20 gap-1 px-2 py-0.5">
                    <ArrowUpRight className="size-3" /> 14.2%
                  </Badge>
                  <span className="text-xs text-muted-foreground">vs last month · $249,480</span>
                </div>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/20">
                <DollarSign className="size-6" />
              </div>
            </div>
            <div className="mt-auto pt-6 h-28">
              <Sparkline data={salesData.map((d) => ({ value: d.online }))} height={112} />
            </div>
          </div>
        </Card>

        {/* Orders — small, col-span-3, bg-card */}
        <Card className="col-span-6 lg:col-span-3 rounded-2xl bg-card">
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Orders</span>
              <ShoppingCart className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums">3,847</p>
            <Badge className="mt-2 w-fit bg-success/10 text-success border-success/20 gap-1 px-1.5 py-0">
              <ArrowUpRight className="size-3" /> 8.6%
            </Badge>
            <div className="mt-auto pt-3 h-8">
              <Sparkline data={salesData.map((d) => ({ value: d.online + d.retail }))} color="var(--chart-2)" height={32} />
            </div>
          </div>
        </Card>

        {/* AOV — small, col-span-3, bg-primary/5 */}
        <Card className="col-span-6 lg:col-span-3 rounded-2xl bg-primary/5 border-primary/15">
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Avg Order Value</span>
              <ShoppingBag className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums">$74.07</p>
            <Badge className="mt-2 w-fit bg-success/10 text-success border-success/20 gap-1 px-1.5 py-0">
              <ArrowUpRight className="size-3" /> 3.1%
            </Badge>
            <div className="mt-auto pt-3 h-8">
              <Sparkline data={[{value:62},{value:65},{value:68},{value:71},{value:70},{value:73},{value:74}]} color="var(--chart-3)" type="bar" height={32} />
            </div>
          </div>
        </Card>

        {/* Conversion rate — col-span-3, row 2, bg-card */}
        <Card className="col-span-6 lg:col-span-3 rounded-2xl bg-card">
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Conversion Rate</span>
              <TrendingUp className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums">3.42%</p>
            <Badge className="mt-2 w-fit bg-destructive/10 text-destructive border-destructive/20 gap-1 px-1.5 py-0">
              <ArrowDownRight className="size-3" /> 0.8%
            </Badge>
            <div className="mt-auto pt-3 h-8">
              <Sparkline data={[{value:3.8},{value:3.6},{value:3.4},{value:3.5},{value:3.4}]} color="var(--chart-4)" height={32} />
            </div>
          </div>
        </Card>

        {/* Top product snippet — col-span-3, row 2, bg-muted/40 */}
        <Card className="col-span-6 lg:col-span-3 rounded-2xl bg-muted/40 border-border">
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Top Seller</span>
              <Star className="size-4 text-warning" />
            </div>
            <p className="mt-2 text-sm font-semibold leading-tight">MTVerse Pro License</p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">MTV-PRO-001</p>
            <div className="mt-auto pt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums">1,284</span>
              <span className="text-xs text-muted-foreground">units sold</span>
            </div>
          </div>
        </Card>

        {/* Sales by Channel — col-span-8 */}
        <Card className="col-span-12 lg:col-span-8 rounded-2xl bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Sales by Channel</h3>
              <p className="text-xs text-muted-foreground">Online vs retail vs wholesale ($K)</p>
            </div>
            <CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />
          </div>
          <div className="px-5 pb-5">
            <Tabs defaultValue="year">
              <TabsList className="h-8 mb-3">
                <TabsTrigger value="month" className="text-xs h-6">Month</TabsTrigger>
                <TabsTrigger value="quarter" className="text-xs h-6">Quarter</TabsTrigger>
                <TabsTrigger value="year" className="text-xs h-6">Year</TabsTrigger>
              </TabsList>
              <TabsContent value="year">
                <BarTrend data={salesData} xKey="month" yKeys={[
                  { key: "online", name: "Online", color: "var(--chart-1)" },
                  { key: "retail", name: "Retail", color: "var(--chart-2)" },
                  { key: "wholesale", name: "Wholesale", color: "var(--chart-3)" },
                ]} stacked height={240} />
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        {/* Category Donut — col-span-4, bg-primary/5 */}
        <Card className="col-span-12 lg:col-span-4 rounded-2xl bg-primary/5 border-primary/15 overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Category Breakdown</h3>
              <p className="text-xs text-muted-foreground">Sales by product category</p>
            </div>
            <CardMenuButton items={[{ label: "View all" }]} />
          </div>
          <div className="px-5 pb-5">
            <DonutChart data={categoryData} centerValue="38%" centerLabel="Electronics" height={220} />
          </div>
        </Card>

        {/* Top Products table — col-span-7 */}
        <Card className="col-span-12 lg:col-span-7 rounded-2xl bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Top Products</h3>
              <p className="text-xs text-muted-foreground">Best sellers this month</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs">View all</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Sold</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="pr-5 text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((p) => (
                <TableRow key={p.sku} className="hover:bg-accent/50">
                  <TableCell className="pl-5 font-medium">{p.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.sku}</TableCell>
                  <TableCell className="text-right tabular-nums">{p.sold.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">${p.revenue.toLocaleString()}</TableCell>
                  <TableCell className="pr-5 text-right">
                    <span className={p.trend >= 0 ? "text-success text-xs font-medium" : "text-destructive text-xs font-medium"}>
                      {p.trend >= 0 ? "+" : ""}{p.trend}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Inventory Status — col-span-5 */}
        <Card className="col-span-12 lg:col-span-5 rounded-2xl bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Inventory Status</h3>
              <p className="text-xs text-muted-foreground">Stock health overview</p>
            </div>
            <CardMenuButton items={[{ label: "Manage" }]} />
          </div>
          <div className="px-5 pb-5 space-y-4">
            {[
              { label: "In Stock", value: 1248, total: 1500, color: "var(--success)" },
              { label: "Low Stock", value: 142, total: 200, color: "var(--warning)" },
              { label: "Out of Stock", value: 18, total: 50, color: "var(--destructive)" },
              { label: "On Order", value: 320, total: 500, color: "var(--info)" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="text-xs font-semibold tabular-nums">{s.value} / {s.total}</span>
                </div>
                <Progress value={(s.value / s.total) * 100} className="h-1.5" />
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
              <RotateCcw className="size-3.5" /> 24 products need restock within 7 days
            </div>
          </div>
        </Card>

        {/* Recent Orders — col-span-12 */}
        <Card className="col-span-12 rounded-2xl bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Recent Orders</h3>
              <p className="text-xs text-muted-foreground">Latest transactions across channels</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs">View all orders</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id} className="hover:bg-accent/50">
                  <TableCell className="pl-5 font-mono text-xs font-medium">{o.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7"><AvatarFallback className="text-[10px] bg-muted text-muted-foreground">{o.customer.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                      <span className="text-sm font-medium">{o.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm tabular-nums">{o.items} items</TableCell>
                  <TableCell><Badge variant="outline" className="font-normal">{o.channel}</Badge></TableCell>
                  <TableCell className="text-right font-medium tabular-nums">${o.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      o.status === "Completed" ? "bg-success/10 text-success border-success/20" :
                      o.status === "Processing" ? "bg-info/10 text-info border-info/20" :
                      o.status === "Pending" ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-destructive/10 text-destructive border-destructive/20"
                    }>{o.status}</Badge>
                  </TableCell>
                  <TableCell className="pr-5 text-right"><Eye className="size-4 text-muted-foreground" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Bento footer summary — channel mix strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Online Revenue", value: "$412,800", share: "62%", icon: <ShoppingBag className="size-4" />, color: "var(--chart-1)" },
          { label: "Retail Revenue", value: "$189,400", share: "28%", icon: <Package className="size-4" />, color: "var(--chart-2)" },
          { label: "Wholesale Revenue", value: "$68,720", share: "10%", icon: <ShoppingCart className="size-4" />, color: "var(--chart-3)" },
          { label: "Returns / Refunds", value: "$12,480", share: "1.8%", icon: <RotateCcw className="size-4" />, color: "var(--chart-4)" },
        ].map((c) => (
          <Card key={c.label} className="rounded-2xl p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex size-9 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${c.color} 14%, transparent)`, color: c.color }}>
                {c.icon}
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground">{c.share}</span>
            </div>
            <p className="text-lg font-bold tabular-nums">{c.value}</p>
            <p className="text-xs text-muted-foreground">{c.label}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
