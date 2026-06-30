"use client";
import { Card, CardHeader, CardBody, StatCard, PageHeader, Badge, Button, Progress } from "@/components/ui";
import { NimbusChart, baseChartOptions } from "@/components/charts/NimbusChart";
import { MONTHS } from "@/data/mock";
import {
  Truck, Package, CheckCircle2, AlertTriangle, Plus, Download, ArrowUpRight,
  Plane, MapPin, Clock, Route, TrendingUp
} from "lucide-react";

const CARRIERS = {
  FedEx: [320, 340, 380, 410, 420, 460, 480, 510, 540, 580, 610, 640],
  UPS: [280, 300, 320, 360, 380, 400, 420, 440, 460, 490, 510, 540],
  DHL: [180, 200, 210, 240, 250, 280, 290, 300, 320, 340, 360, 380],
  Local: [120, 140, 150, 170, 180, 200, 220, 230, 240, 260, 280, 300],
};

const SHIPMENT_STATUS = [
  { name: "Picked Up", count: 412, color: "bg-gray-400", tone: "gray" as const },
  { name: "In Transit", count: 1248, color: "bg-accent-500", tone: "brand" as const },
  { name: "Out for Delivery", count: 384, color: "bg-warning-500", tone: "warning" as const },
  { name: "Delivered", count: 2840, color: "bg-brand-500", tone: "success" as const },
  { name: "Returned", count: 92, color: "bg-error-500", tone: "error" as const },
];
const TOTAL_SHIPMENTS = SHIPMENT_STATUS.reduce((s, x) => s + x.count, 0);

const RECENT_SHIPMENTS = [
  { id: "SHP-9821", origin: "Mumbai, IN", destination: "Berlin, DE", carrier: "DHL", status: "in_transit", eta: "Jul 02" },
  { id: "SHP-9820", origin: "Singapore, SG", destination: "Tokyo, JP", carrier: "FedEx", status: "delivered", eta: "Delivered" },
  { id: "SHP-9819", origin: "London, UK", destination: "Madrid, ES", carrier: "UPS", status: "out_for_delivery", eta: "Today" },
  { id: "SHP-9818", origin: "New York, US", destination: "Toronto, CA", carrier: "FedEx", status: "picked_up", eta: "Jul 04" },
  { id: "SHP-9817", origin: "Dubai, AE", destination: "Mumbai, IN", carrier: "Local", status: "delayed", eta: "Jul 06" },
  { id: "SHP-9816", origin: "Sydney, AU", destination: "Auckland, NZ", carrier: "DHL", status: "delivered", eta: "Delivered" },
  { id: "SHP-9815", origin: "Paris, FR", destination: "Milan, IT", carrier: "UPS", status: "in_transit", eta: "Jul 01" },
];

const ROUTE_PERF = [
  { route: "Mumbai → Berlin", onTime: 94, volume: 412, avgDays: 4.2 },
  { route: "Singapore → Tokyo", onTime: 98, volume: 286, avgDays: 3.1 },
  { route: "London → Madrid", onTime: 91, volume: 318, avgDays: 2.4 },
  { route: "New York → Toronto", onTime: 96, volume: 248, avgDays: 2.1 },
  { route: "Dubai → Mumbai", onTime: 78, volume: 194, avgDays: 5.8 },
];

const carrierColor = (c: string) =>
  c === "FedEx" ? "brand" : c === "UPS" ? "warning" : c === "DHL" ? "accent" : "purple";

const statusMeta = (s: string): { label: string; tone: "brand" | "success" | "warning" | "error" | "gray" } => {
  switch (s) {
    case "in_transit": return { label: "In Transit", tone: "brand" };
    case "delivered": return { label: "Delivered", tone: "success" };
    case "out_for_delivery": return { label: "Out for Delivery", tone: "warning" };
    case "picked_up": return { label: "Picked Up", tone: "gray" };
    case "delayed": return { label: "Delayed", tone: "error" };
    default: return { label: s, tone: "gray" };
  }
};

export default function LogisticsDashboard() {
  const carrierOptions = {
    ...baseChartOptions("bar"),
    colors: ["#10b981", "#f59e0b", "#0ea5e9", "#8b5cf6"],
    chart: { ...baseChartOptions("bar").chart, stacked: true, type: "bar" },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "55%" } },
    xaxis: { categories: MONTHS, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${v}` } },
    legend: { show: true, position: "top", horizontalAlign: "right" },
    tooltip: { shared: true, y: { formatter: (v: number) => `${v} shipments` } },
  };
  const carrierSeries = Object.entries(CARRIERS).map(([name, data]) => ({ name, data }));

  const onTimeOptions = {
    ...baseChartOptions("radialBar"),
    labels: ["On-time"],
    colors: ["#10b981"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { size: "55%" },
        track: { background: "#e2e8f0", strokeWidth: "100%", margin: 8 },
        dataLabels: {
          name: { fontSize: "13px", color: "#64748b", offsetY: 60 },
          value: { fontSize: "32px", fontWeight: 700, color: "#0f172a", offsetY: -10, formatter: (v: number) => `${v}%` },
        },
      },
    },
    legend: { show: false },
    stroke: { lineCap: "round" as const },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Logistics Dashboard"
        description="Shipment tracking, carrier performance, on-time delivery, and routes."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Logistics" }]}
        actions={
          <>
            <Button variant="secondary" size="md"><Download className="h-4 w-4" /> Export</Button>
            <Button size="md"><Plus className="h-4 w-4" /> New Shipment</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Shipments" value="4,976" delta="+182" deltaTone="up" icon={Truck} iconTone="brand" footer="across 4 carriers" />
        <StatCard label="In Transit" value="1,248" delta="+12.4%" deltaTone="up" icon={Package} iconTone="purple" footer="moving now" />
        <StatCard label="Delivered Today" value="284" delta="+38" deltaTone="up" icon={CheckCircle2} iconTone="success" footer="since midnight" />
        <StatCard label="Delayed" value="92" delta="+6" deltaTone="down" icon={AlertTriangle} iconTone="error" footer="1.8% of active" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Shipments by Carrier"
            description="Monthly volume across FedEx, UPS, DHL, and Local"
            action={<Badge tone="brand" dot>+18% YoY</Badge>}
          />
          <CardBody>
            <NimbusChart options={carrierOptions} series={carrierSeries} type="bar" height={320} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="On-Time Delivery" description="Target: 95%" />
          <CardBody className="flex flex-col items-center">
            <NimbusChart options={onTimeOptions} series={[92.4]} type="radialBar" height={260} />
            <div className="mt-2 w-full space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">On-time this month</span>
                <span className="font-bold text-success-600 dark:text-success-400">92.4%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Avg. transit time</span>
                <span className="font-bold text-gray-900 dark:text-white">3.6 days</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Target gap</span>
                <span className="font-bold text-warning-600 dark:text-warning-400">-2.6 pts</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Shipment Status" description="Breakdown of active shipments" />
          <CardBody className="space-y-4">
            {SHIPMENT_STATUS.map((s) => {
              const pct = Math.round((s.count / TOTAL_SHIPMENTS) * 100);
              return (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                      <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                      {s.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-bold text-gray-900 dark:text-white">{s.count.toLocaleString()}</span>
                      <span className="ml-1.5 text-xs">({pct}%)</span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div className={`h-full rounded-full ${s.color} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="mt-4 rounded-xl bg-brand-50 p-4 dark:bg-brand-500/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Throughput up 14%</p>
              </div>
              <p className="mt-1 text-xs text-brand-600 dark:text-brand-400">Daily delivered volume grew from 248 to 284 over the past week.</p>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader
            title="Route Performance"
            description="Top 5 trade lanes by on-time delivery rate"
            action={<Button variant="ghost" size="sm">View map <MapPin className="h-3 w-3" /></Button>}
          />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Volume</th>
                  <th>Avg. Days</th>
                  <th>On-Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ROUTE_PERF.map((r) => (
                  <tr key={r.route}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                          <Route className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{r.route}</span>
                      </div>
                    </td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{r.volume}</td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{r.avgDays} days</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Progress value={r.onTime} size="sm" className="w-24" tone={r.onTime >= 95 ? "success" : r.onTime >= 85 ? "brand" : "warning"} />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{r.onTime}%</span>
                      </div>
                    </td>
                    <td>
                      <Badge tone={r.onTime >= 95 ? "success" : r.onTime >= 85 ? "brand" : "warning"} variant="soft" dot>
                        {r.onTime >= 95 ? "Excellent" : r.onTime >= 85 ? "On Track" : "Watch"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader
          title="Recent Shipments"
          description="Live tracking across active orders"
          action={
            <div className="flex items-center gap-2">
              <Badge tone="brand" variant="soft"><Plane className="h-3 w-3" /> 7 of 4,976</Badge>
              <Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3 w-3" /></Button>
            </div>
          }
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Carrier</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SHIPMENTS.map((s) => {
                const meta = statusMeta(s.status);
                return (
                  <tr key={s.id}>
                    <td className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{s.id}</td>
                    <td>
                      <span className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" /> {s.origin}
                      </span>
                    </td>
                    <td>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-white">
                        <MapPin className="h-3.5 w-3.5 text-brand-500" /> {s.destination}
                      </span>
                    </td>
                    <td><Badge tone={carrierColor(s.carrier) as "brand" | "warning" | "purple" | "gray"} variant="soft">{s.carrier}</Badge></td>
                    <td><Badge tone={meta.tone} variant="soft" dot>{meta.label}</Badge></td>
                    <td>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" /> {s.eta}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="overflow-hidden border-0 bg-gradient-to-r from-brand-600 via-accent-600 to-purple-600 text-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-4">
          {[
            { label: "Avg. Transit Time", value: "3.6 days", icon: Clock },
            { label: "Active Carriers", value: "4", icon: Truck },
            { label: "Trade Lanes", value: "38", icon: Route },
            { label: "Carbon Offset", value: "12.4 t", icon: Plane },
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
