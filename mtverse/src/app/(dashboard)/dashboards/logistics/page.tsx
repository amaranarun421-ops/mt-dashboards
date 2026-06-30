"use client";

import * as React from "react";
import {
  Package, Truck, Plane, Ship, CheckCircle2, Clock, Plus, Download,
  Filter, MapPin, Navigation, Route, ArrowRight, Activity, Zap, Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, CardMenuButton } from "@/components/mtv/primitives";
import {
  AreaTrend, DonutChart, Sparkline,
} from "@/components/charts";

const shipmentTrend = [
  { week: "W1", dispatched: 1240, delivered: 980 },
  { week: "W2", dispatched: 1380, delivered: 1120 },
  { week: "W3", dispatched: 1480, delivered: 1240 },
  { week: "W4", dispatched: 1620, delivered: 1380 },
  { week: "W5", dispatched: 1740, delivered: 1480 },
  { week: "W6", dispatched: 1820, delivered: 1580 },
  { week: "W7", dispatched: 1980, delivered: 1680 },
  { week: "W8", dispatched: 2120, delivered: 1820 },
  { week: "W9", dispatched: 2240, delivered: 1940 },
  { week: "W10", dispatched: 2380, delivered: 2080 },
  { week: "W11", dispatched: 2480, delivered: 2180 },
  { week: "W12", dispatched: 2640, delivered: 2340 },
];

const shipmentsByCarrier = [
  { name: "DHL", value: 32, color: "var(--chart-1)" },
  { name: "FedEx", value: 28, color: "var(--chart-2)" },
  { name: "UPS", value: 22, color: "var(--chart-3)" },
  { name: "Maersk", value: 12, color: "var(--chart-4)" },
  { name: "Other", value: 6, color: "var(--chart-5)" },
];

// Major shipping hubs positioned with x/y % on a stylized world map
const hubs = [
  { name: "Shanghai", country: "CN", x: 82, y: 38, volume: "2,840", status: "active" },
  { name: "Singapore", country: "SG", x: 74, y: 56, volume: "1,920", status: "active" },
  { name: "Dubai", country: "AE", x: 60, y: 44, volume: "1,640", status: "active" },
  { name: "Rotterdam", country: "NL", x: 47, y: 28, volume: "1,480", status: "active" },
  { name: "Hamburg", country: "DE", x: 50, y: 26, volume: "1,240", status: "warning" },
  { name: "Los Angeles", country: "US", x: 14, y: 38, volume: "2,120", status: "active" },
  { name: "New York", country: "US", x: 25, y: 36, volume: "1,840", status: "active" },
  { name: "Tokyo", country: "JP", x: 88, y: 36, volume: "1,520", status: "active" },
  { name: "Sydney", country: "AU", x: 88, y: 76, volume: "840", status: "active" },
  { name: "Santos", country: "BR", x: 32, y: 68, volume: "620", status: "warning" },
  { name: "Mumbai", country: "IN", x: 68, y: 48, volume: "1,180", status: "active" },
  { name: "Cape Town", country: "ZA", x: 53, y: 74, volume: "420", status: "active" },
];

const liveShipments = [
  { id: "SH-9821", carrier: "DHL", status: "In Transit", eta: "4h 20m", progress: 68, origin: "Shanghai", dest: "Los Angeles" },
  { id: "SH-9820", carrier: "FedEx", status: "In Transit", eta: "12h 05m", progress: 42, origin: "Hamburg", dest: "New York" },
  { id: "SH-9819", carrier: "Maersk", status: "Loading", eta: "1d 8h", progress: 12, origin: "Singapore", dest: "Rotterdam" },
  { id: "SH-9818", carrier: "UPS", status: "In Transit", eta: "2h 45m", progress: 84, origin: "Dubai", dest: "Mumbai" },
  { id: "SH-9817", carrier: "DHL", status: "In Transit", eta: "8h 30m", progress: 56, origin: "Tokyo", dest: "Sydney" },
  { id: "SH-9816", carrier: "FedEx", status: "Customs", eta: "6h 12m", progress: 72, origin: "Santos", dest: "Cape Town" },
];

const activeShipments = [
  { tracking: "TRK-7842-X9", origin: "Shanghai, CN", destination: "Los Angeles, US", carrier: "DHL", status: "In Transit", eta: "Dec 19, 4:20 PM" },
  { tracking: "TRK-7841-K2", origin: "Hamburg, DE", destination: "New York, US", carrier: "FedEx", status: "In Transit", eta: "Dec 19, 11:30 PM" },
  { tracking: "TRK-7840-M7", origin: "Singapore, SG", destination: "Rotterdam, NL", carrier: "Maersk", status: "Loading", eta: "Dec 20, 8:00 AM" },
  { tracking: "TRK-7839-Q4", origin: "Dubai, AE", destination: "Mumbai, IN", carrier: "UPS", status: "In Transit", eta: "Dec 18, 6:45 PM" },
  { tracking: "TRK-7838-V3", origin: "Tokyo, JP", destination: "Sydney, AU", carrier: "DHL", status: "In Transit", eta: "Dec 19, 2:15 AM" },
  { tracking: "TRK-7837-B8", origin: "Santos, BR", destination: "Cape Town, ZA", carrier: "FedEx", status: "Customs", eta: "Dec 19, 9:50 AM" },
  { tracking: "TRK-7836-W1", origin: "Los Angeles, US", destination: "Tokyo, JP", carrier: "UPS", status: "Delivered", eta: "Dec 17, 4:30 PM" },
  { tracking: "TRK-7835-T6", origin: "Rotterdam, NL", destination: "Hamburg, DE", carrier: "Maersk", status: "Delayed", eta: "Dec 20, 1:00 PM" },
];

const topRoutes = [
  { route: "Shanghai → Los Angeles", volume: 2480, share: 18.2, avgDays: 14, color: "var(--chart-1)" },
  { route: "Hamburg → New York", volume: 1840, share: 13.5, avgDays: 11, color: "var(--chart-2)" },
  { route: "Singapore → Rotterdam", volume: 1620, share: 11.9, avgDays: 18, color: "var(--chart-3)" },
  { route: "Dubai → Mumbai", volume: 1280, share: 9.4, avgDays: 6, color: "var(--chart-4)" },
  { route: "Tokyo → Sydney", volume: 980, share: 7.2, avgDays: 9, color: "var(--chart-5)" },
];

const carrierBadge = (carrier: string) => {
  switch (carrier) {
    case "DHL": return "bg-chart-1/10 text-chart-1 border-chart-1/20";
    case "FedEx": return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    case "UPS": return "bg-chart-3/10 text-chart-3 border-chart-3/20";
    case "Maersk": return "bg-chart-4/10 text-chart-4 border-chart-4/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

const statusBadge = (status: string) => {
  switch (status) {
    case "In Transit": return "bg-info/10 text-info border-info/20";
    case "Loading": return "bg-warning/10 text-warning border-warning/20";
    case "Customs": return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    case "Delivered": return "bg-success/10 text-success border-success/20";
    case "Delayed": return "bg-destructive/10 text-destructive border-destructive/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function LogisticsDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Logistics Dashboard"
        description="Track global shipments, carrier performance, and live operations across all major hubs."
        breadcrumbs={[{ label: "Dashboards" }, { label: "Logistics" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Shipment</Button>
          </>
        }
      />

      {/* Top: 4 stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Shipments", value: "2,847", delta: 8.4, icon: <Package className="size-5" />, spark: shipmentTrend.map((d) => ({ value: d.dispatched })), color: "var(--chart-1)" },
          { label: "Delivered Today", value: "1,284", delta: 12.6, icon: <CheckCircle2 className="size-5" />, spark: shipmentTrend.map((d) => ({ value: d.delivered })), color: "var(--chart-2)" },
          { label: "Avg Transit Time", value: "8.4 days", delta: -3.2, icon: <Clock className="size-5" />, spark: [{value:9.4},{value:9.1},{value:8.9},{value:8.7},{value:8.5},{value:8.4}], color: "var(--chart-3)" },
          { label: "On-Time Rate", value: "94.2%", delta: 1.8, icon: <Truck className="size-5" />, spark: [{value:91.2},{value:92.0},{value:92.8},{value:93.4},{value:93.8},{value:94.2}], color: "var(--chart-4)" },
        ].map((s) => {
          const up = s.delta >= 0;
          const isTransit = s.label === "Avg Transit Time";
          const positive = (up && !isTransit) || (!up && isTransit);
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex size-10 items-center justify-center rounded-xl" style={{ background: `color-mix(in oklab, ${s.color} 14%, transparent)`, color: s.color }}>
                  {s.icon}
                </div>
                <Badge variant="outline" className={`gap-0.5 px-1.5 py-0 text-[10px] ${positive ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
                  {up ? <Navigation className="size-3 rotate-45" /> : <Navigation className="size-3 -rotate-45" />}
                  {Math.abs(s.delta)}%
                </Badge>
              </div>
              <p className="text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              <div className="h-8 mt-2 -mx-1">
                <Sparkline data={s.spark} color={s.color} height={32} />
              </div>
            </div>
          );
        })}
      </div>

      {/* HERO: Global Operations Map (col-8) + Live Operations Snapshot (col-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Stylized world map panel */}
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Globe2 className="size-4 text-primary" />
                <h3 className="text-base font-semibold tracking-tight">Global Operations Map</h3>
              </div>
              <p className="text-xs text-muted-foreground">12 active hubs · real-time shipment volume (last 24h)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-success" />
                </span>
                Active
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="size-2 rounded-full bg-warning" />
                Congested
              </span>
              <CardMenuButton items={[{ label: "Satellite view" }, { label: "Export" }]} />
            </div>
          </div>
          <div className="px-5 pb-5">
            <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40 border border-border">
              {/* Stylized world map SVG — abstract continent shapes */}
              <svg
                viewBox="0 0 1000 500"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="dotgrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="var(--muted-foreground)" opacity="0.18" />
                  </pattern>
                </defs>
                <rect width="1000" height="500" fill="url(#dotgrid)" />
                {/* Stylized continent blobs */}
                <g fill="var(--muted-foreground)" opacity="0.13">
                  {/* North America */}
                  <path d="M 80,140 Q 60,120 80,100 L 160,80 Q 220,90 240,140 L 260,200 Q 240,240 200,250 L 160,260 Q 120,250 100,220 Z" />
                  {/* South America */}
                  <path d="M 280,280 Q 300,270 320,290 L 340,360 Q 330,420 300,440 L 270,420 Q 260,360 270,320 Z" />
                  {/* Europe */}
                  <path d="M 440,120 L 520,110 Q 540,140 530,170 L 480,180 Q 450,170 440,150 Z" />
                  {/* Africa */}
                  <path d="M 480,200 Q 520,190 560,220 L 580,320 Q 560,380 520,400 L 490,380 Q 470,320 480,260 Z" />
                  {/* Asia */}
                  <path d="M 560,100 L 820,90 Q 880,120 880,180 L 840,220 Q 780,240 720,230 L 620,210 Q 570,180 560,140 Z" />
                  {/* India */}
                  <path d="M 680,220 L 720,220 Q 730,260 710,290 L 690,280 Q 670,250 680,230 Z" />
                  {/* Southeast Asia + Indonesia */}
                  <path d="M 770,260 Q 820,250 850,280 L 840,310 Q 800,320 770,300 Z" />
                  {/* Australia */}
                  <path d="M 820,360 Q 880,350 920,380 L 910,420 Q 860,430 820,410 Z" />
                </g>
                {/* Trade route arcs */}
                <g stroke="var(--chart-1)" strokeWidth="1.5" fill="none" opacity="0.35" strokeDasharray="4 4">
                  <path d="M 820,190 Q 600,80 140,190" />
                  <path d="M 470,150 Q 350,100 250,180" />
                  <path d="M 740,280 Q 650,200 470,140" />
                  <path d="M 880,180 Q 920,280 880,380" />
                </g>
              </svg>
              {/* Hub markers */}
              {hubs.map((hub) => (
                <div
                  key={hub.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                >
                  {/* Pulsing ring */}
                  <span className="absolute inset-0 -m-1 flex items-center justify-center">
                    <span
                      className="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75"
                      style={{ background: hub.status === "warning" ? "var(--warning)" : "var(--chart-1)" }}
                    />
                  </span>
                  {/* Solid dot */}
                  <span
                    className="relative inline-flex rounded-full size-2.5 ring-2 ring-background"
                    style={{ background: hub.status === "warning" ? "var(--warning)" : "var(--chart-1)" }}
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10">
                    <div className="rounded-md border border-border bg-popover px-2 py-1 shadow-md whitespace-nowrap">
                      <p className="text-[10px] font-semibold">{hub.name}, {hub.country}</p>
                      <p className="text-[9px] text-muted-foreground tabular-nums">{hub.volume} shipments</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Legend overlay */}
              <div className="absolute bottom-3 left-3 rounded-lg border border-border bg-card/90 backdrop-blur px-3 py-2 text-[10px]">
                <p className="font-semibold text-foreground mb-1 flex items-center gap-1.5"><MapPin className="size-3" /> 12 Active Hubs</p>
                <p className="text-muted-foreground">Total 24h volume: <span className="font-semibold text-foreground tabular-nums">17,420</span> shipments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Operations Snapshot */}
        <div className="lg:col-span-4 rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
          <div className="flex items-start justify-between p-5 pb-3 border-b border-border">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-success" />
                </span>
                <h3 className="text-base font-semibold tracking-tight">Live Operations</h3>
              </div>
              <p className="text-xs text-muted-foreground">Active shipments in transit</p>
            </div>
            <CardMenuButton items={[{ label: "View all" }]} />
          </div>
          <div className="flex-1 p-4 space-y-2.5 max-h-[420px] overflow-y-auto">
            {liveShipments.map((s) => (
              <div key={s.id} className="rounded-lg border border-border p-3 hover:bg-accent/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-info opacity-75" />
                      <span className="relative inline-flex rounded-full size-2 bg-info" />
                    </span>
                    <span className="font-mono text-[10px] font-medium">{s.id}</span>
                  </div>
                  <Badge variant="outline" className={`font-normal text-[9px] h-4 px-1.5 py-0 ${carrierBadge(s.carrier)}`}>{s.carrier}</Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs mb-2">
                  <span className="text-muted-foreground truncate">{s.origin}</span>
                  <ArrowRight className="size-3 text-muted-foreground shrink-0" />
                  <span className="font-medium truncate">{s.dest}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={s.progress} className="h-1.5 flex-1" />
                  <span className="text-[10px] font-semibold tabular-nums w-8 text-right">{s.progress}%</span>
                </div>
                <div className="flex items-center justify-between mt-1.5 text-[10px]">
                  <Badge variant="outline" className={`font-normal h-4 px-1.5 py-0 ${statusBadge(s.status)}`}>{s.status}</Badge>
                  <span className="text-muted-foreground flex items-center gap-1 tabular-nums"><Clock className="size-2.5" /> ETA {s.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2-col: Shipments Dispatched vs Delivered Area (col-7) + Shipments by Carrier Donut (col-5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Dispatched vs Delivered</h3>
              <p className="text-xs text-muted-foreground">Weekly shipment volume (12 weeks)</p>
            </div>
            <CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />
          </div>
          <div className="px-5 pb-5">
            <AreaTrend
              data={shipmentTrend}
              xKey="week"
              yKeys={[
                { key: "dispatched", name: "Dispatched", color: "var(--chart-1)" },
                { key: "delivered", name: "Delivered", color: "var(--chart-2)" },
              ]}
              height={280}
            />
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Shipments by Carrier</h3>
              <p className="text-xs text-muted-foreground">Volume share across partners</p>
            </div>
            <CardMenuButton items={[{ label: "Carrier report" }]} />
          </div>
          <div className="px-5 pb-5">
            <DonutChart data={shipmentsByCarrier} centerValue="2,847" centerLabel="Active Shipments" height={210} />
            <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
              {shipmentsByCarrier.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-semibold tabular-nums">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Shipments table — col-span-12 */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Active Shipments</h3>
            <p className="text-xs text-muted-foreground">All shipments in the operational pipeline</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs">View all shipments</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Tracking #</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5 text-right">ETA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeShipments.map((s) => (
              <TableRow key={s.tracking} className="hover:bg-accent/50">
                <TableCell className="pl-5 font-mono text-xs font-medium">{s.tracking}</TableCell>
                <TableCell className="text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3 text-muted-foreground shrink-0" />
                    {s.origin}
                  </span>
                </TableCell>
                <TableCell className="text-sm">
                  <span className="flex items-center gap-1.5">
                    <Navigation className="size-3 text-muted-foreground shrink-0" />
                    {s.destination}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-normal ${carrierBadge(s.carrier)}`}>{s.carrier}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-normal ${statusBadge(s.status)}`}>{s.status}</Badge>
                </TableCell>
                <TableCell className="pr-5 text-right text-sm text-muted-foreground tabular-nums">{s.eta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Top Routes list */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Top Trade Routes</h3>
            <p className="text-xs text-muted-foreground">Highest-volume shipping corridors this month</p>
          </div>
          <CardMenuButton items={[{ label: "Optimize routes" }]} />
        </div>
        <div className="px-5 pb-5 space-y-3">
          {topRoutes.map((r, i) => (
            <div key={r.route} className="flex items-center gap-4">
              <span className="flex size-7 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground shrink-0 tabular-nums">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium flex items-center gap-1.5 truncate">
                    <Route className="size-3.5 text-muted-foreground shrink-0" />
                    {r.route}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground shrink-0">
                    <span className="flex items-center gap-1 tabular-nums"><Activity className="size-3" /> {r.volume.toLocaleString()}</span>
                    <span className="flex items-center gap-1 tabular-nums"><Clock className="size-3" /> {r.avgDays}d avg</span>
                    <span className="font-semibold text-foreground tabular-nums">{r.share}%</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.share * 4}%`, background: r.color }} />
                </div>
              </div>
            </div>
          ))}
          <div className="pt-3 mt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Zap className="size-3.5 text-warning" /> Busiest corridor: Shanghai → LA (18.2%)</span>
            <span className="flex items-center gap-1.5"><Ship className="size-3.5" /> 68% ocean · 22% air · 10% land</span>
          </div>
        </div>
      </div>
    </div>
  );
}
