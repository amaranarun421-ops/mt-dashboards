"use client";

import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardHeader } from "@/components/shared/card";
import { HeliosChart } from "@/components/shared/helios-chart";
import { DataTable } from "@/components/shared/data-table";
import { Timeline } from "@/components/shared/timeline";
import { Badge } from "@/components/shared/badge";
import { Progress } from "@/components/shared/progress";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/shared/button";
import {
  TruckIcon,
  PackageIcon,
  MapPinIcon,
  CheckSquareIcon,
} from "@/components/Layouts/sidebar/icons";

type Carrier = {
  name: string;
  region: "NA" | "EU" | "APAC" | "LATAM";
  shipments: number;
  onTime: number;
  damage: number;
  cost: string;
  costVal: number;
};

const carriers: Carrier[] = [
  { name: "FleetPulse Express", region: "NA", shipments: 4820, onTime: 96, damage: 0.4, cost: "$48,200", costVal: 48200 },
  { name: "EuroLogistik GmbH", region: "EU", shipments: 3240, onTime: 92, damage: 0.8, cost: "$36,800", costVal: 36800 },
  { name: "Pacific Dragon Cargo", region: "APAC", shipments: 2840, onTime: 88, damage: 1.2, cost: "$52,400", costVal: 52400 },
  { name: "Andes Freight Co", region: "LATAM", shipments: 1180, onTime: 84, damage: 1.6, cost: "$24,200", costVal: 24200 },
  { name: "Northwind Couriers", region: "NA", shipments: 2480, onTime: 94, damage: 0.6, cost: "$28,400", costVal: 28400 },
  { name: "Iberia Express Lines", region: "EU", shipments: 1620, onTime: 90, damage: 1.0, cost: "$19,800", costVal: 19800 },
];

const regionVariant = {
  NA: "primary",
  EU: "violet",
  APAC: "accent",
  LATAM: "info",
} as const;

const dispatchEvents = [
  { title: "Shipment SHP-9241 dispatched", description: "FleetPulse · 240 packages · NA hub", time: "08:12", tone: "primary" as const },
  { title: "Customs cleared — Berlin", description: "EuroLogistik · 84 packages", time: "07:48", tone: "success" as const },
  { title: "Delay flagged — Shanghai", description: "Pacific Dragon · weather hold", time: "07:22", tone: "danger" as const },
  { title: "Arrived — Mexico City DC", description: "Andes Freight · 118 packages", time: "06:54", tone: "violet" as const },
  { title: "Out for delivery — Toronto", description: "Northwind · 64 packages", time: "06:18", tone: "info" as const },
  { title: "Shipment SHP-9238 delivered", description: "Iberia Express · 42 packages", time: "05:42", tone: "success" as const },
];

const mapRegions = [
  { region: "North America", x: "22%", y: "38%", count: 7300, tone: "bg-primary" },
  { region: "South America", x: "32%", y: "68%", count: 1180, tone: "bg-info" },
  { region: "Europe", x: "50%", y: "32%", count: 4860, tone: "bg-violet" },
  { region: "Africa", x: "52%", y: "56%", count: 820, tone: "bg-accent" },
  { region: "Asia-Pacific", x: "72%", y: "38%", count: 2840, tone: "bg-accent" },
  { region: "Oceania", x: "82%", y: "70%", count: 420, tone: "bg-primary" },
];

export default function LogisticsDashboard() {
  return (
    <div>
      <PageHeader
        title="Logistics Dashboard"
        description="Live shipment network, on-time performance and carrier scorecards for Helios Pro fulfillment."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Logistics" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="primary" size="sm">+ Dispatch</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Shipments Today" value="3,284" delta={{ value: "+8.4%", trend: "up" }} icon={<TruckIcon className="size-5" />} tone="primary" sublabel="14 hubs active" />
        <StatCard label="In Transit" value="8,420" delta={{ value: "+124", trend: "up" }} icon={<PackageIcon className="size-5" />} tone="accent" sublabel="across 6 carriers" />
        <StatCard label="On-Time Rate" value="92.4%" delta={{ value: "+1.2%", trend: "up" }} icon={<CheckSquareIcon className="size-5" />} tone="violet" sublabel="target 95%" />
        <StatCard label="Avg. Transit Time" value="3.8 days" delta={{ value: "-0.4d", trend: "down" }} icon={<MapPinIcon className="size-5" />} tone="info" sublabel="door-to-door" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-6">
        <ChartCard
          title="Shipments by Region"
          subtitle="Daily outbound volume"
          className="col-span-12 xl:col-span-8"
          action={<Badge variant="primary">4 regions</Badge>}
        >
          <HeliosChart
            type="bar"
            height={320}
            options={{
              plotOptions: { bar: { borderRadius: 6, columnWidth: "55%" } },
              xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
              dataLabels: { enabled: false },
              colors: ["#10b981", "#f59e0b", "#8b5cf6", "#0ea5e9"],
            }}
            series={[
              { name: "NA", data: [1240, 1320, 1280, 1410, 1380, 980, 690] },
              { name: "EU", data: [820, 880, 910, 840, 880, 620, 420] },
              { name: "APAC", data: [620, 680, 710, 640, 720, 480, 320] },
              { name: "LATAM", data: [180, 220, 240, 210, 260, 140, 90] },
            ]}
          />
        </ChartCard>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="On-Time Performance" subtitle="Rolling 7-day avg" action={<Badge variant="success" size="sm">+1.2pp</Badge>} />
          <div className="grid place-items-center py-4">
            <HeliosChart
              type="radialBar"
              height={240}
              options={{
                labels: ["On-Time"],
                plotOptions: { radialBar: { hollow: { size: "62%" }, dataLabels: { value: { fontSize: "28px", fontWeight: 700, formatter: (v: number) => `${Math.round(v)}%` } } } },
                colors: ["#10b981"],
                fill: { type: "gradient", gradient: { shade: "light", shadeIntensity: 0.4, gradientToColors: ["#34d399"], stops: [0, 100] } },
              }}
              series={[92]}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">Early</p>
              <p className="text-base font-bold text-primary dark:text-primary-light">824</p>
            </div>
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">On-time</p>
              <p className="text-base font-bold text-primary dark:text-primary-light">2,212</p>
            </div>
            <div>
              <p className="text-xs text-dark-5 dark:text-dark-6">Late</p>
              <p className="text-base font-bold text-red dark:text-red-light">248</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-12 xl:col-span-8">
          <CardHeader
            title="In-Transit Network"
            subtitle="Active shipments across the global map"
            action={<Badge variant="info" size="sm">6 regions</Badge>}
          />
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl border border-stroke bg-gradient-to-br from-gray-2 to-white dark:border-dark-3 dark:from-dark-3 dark:to-gray-dark">
            {/* Simplified world map placeholder with region pins */}
            <svg viewBox="0 0 200 100" className="absolute inset-0 size-full opacity-30 dark:opacity-20" preserveAspectRatio="none">
              <path d="M10 40 Q30 30 50 40 L60 50 Q40 60 20 55 Z" fill="currentColor" className="text-dark-5 dark:text-dark-6" />
              <path d="M30 60 Q40 55 48 65 L52 80 Q40 85 32 78 Z" fill="currentColor" className="text-dark-5 dark:text-dark-6" />
              <path d="M90 25 Q105 20 120 28 L122 38 Q108 42 92 38 Z" fill="currentColor" className="text-dark-5 dark:text-dark-6" />
              <path d="M100 45 Q110 42 118 52 L116 70 Q108 72 100 64 Z" fill="currentColor" className="text-dark-5 dark:text-dark-6" />
              <path d="M130 30 Q150 25 175 32 L180 42 Q160 48 132 42 Z" fill="currentColor" className="text-dark-5 dark:text-dark-6" />
              <path d="M165 62 Q175 60 182 68 L180 76 Q172 78 165 72 Z" fill="currentColor" className="text-dark-5 dark:text-dark-6" />
            </svg>
            {mapRegions.map((m) => (
              <div
                key={m.region}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: m.x, top: m.y }}
              >
                <span className={`relative flex size-3 ${m.tone}`}>
                  <span className={`absolute inline-flex size-full animate-ping rounded-full ${m.tone} opacity-60`} />
                  <span className={`relative inline-flex size-3 rounded-full ${m.tone}`} />
                </span>
                <div className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-md border border-stroke bg-white px-2 py-1 text-[10px] font-medium text-dark shadow-sm dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                  {m.region} · {m.count.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-[10px] text-dark-5 backdrop-blur dark:bg-dark-2/80 dark:text-dark-6">
              <MapPinIcon className="size-3" />
              Live network
            </div>
          </div>
        </Card>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader title="Dispatch Timeline" subtitle="Today's network events" action={<Badge variant="success" size="sm">Live</Badge>} />
          <Timeline events={dispatchEvents} />
        </Card>

        <Card className="col-span-12" padded={false}>
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <CardHeader title="Carrier Performance" subtitle="Shipments, on-time %, damage, cost" action={<Badge variant="neutral" size="sm">6 carriers</Badge>} />
          </div>
          <DataTable<Carrier>
            data={carriers}
            rowKey={(c) => c.name}
            pageSize={6}
            columns={[
              { key: "name", header: "Carrier", cell: (c) => <span className="font-medium text-dark dark:text-white">{c.name}</span> },
              { key: "region", header: "Region", cell: (c) => <Badge variant={regionVariant[c.region]}>{c.region}</Badge> },
              { key: "shipments", header: "Shipments", sortable: true, sortAccessor: (c) => c.shipments, cell: (c) => c.shipments.toLocaleString() },
              {
                key: "onTime",
                header: "On-Time",
                sortable: true,
                sortAccessor: (c) => c.onTime,
                cell: (c) => (
                  <div className="flex items-center gap-2">
                    <Progress value={c.onTime} tone={c.onTime >= 95 ? "success" : c.onTime >= 88 ? "accent" : "danger"} size="xs" className="w-24" />
                    <span className="text-xs font-semibold">{c.onTime}%</span>
                  </div>
                ),
              },
              { key: "damage", header: "Damage %", sortable: true, sortAccessor: (c) => c.damage, cell: (c) => (
                <span className={c.damage > 1.2 ? "font-semibold text-red dark:text-red-light" : "font-semibold text-dark-7"}>{c.damage}%</span>
              ) },
              { key: "cost", header: "Cost", sortable: true, sortAccessor: (c) => c.costVal, cell: (c) => <span className="font-semibold">{c.cost}</span> },
            ]}
          />
        </Card>
      </div>

      <div className="mt-6">
        <Breadcrumbs items={[{ label: "Helios Pro", href: "/" }, { label: "Dashboards" }, { label: "Logistics" }]} />
      </div>
    </div>
  );
}