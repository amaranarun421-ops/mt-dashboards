"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  MapPin, Globe, Users, TrendingUp, Activity, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

type Marker = {
  id: string;
  name: string;
  x: number; // percent on SVG
  y: number;
  value: number;
  region: string;
};

const markers: Marker[] = [
  { id: "sf", name: "San Francisco", x: 16, y: 38, value: 28400, region: "North America" },
  { id: "ny", name: "New York", x: 24, y: 36, value: 19200, region: "North America" },
  { id: "saop", name: "São Paulo", x: 31, y: 65, value: 8400, region: "LATAM" },
  { id: "london", name: "London", x: 46, y: 30, value: 21800, region: "EMEA" },
  { id: "berlin", name: "Berlin", x: 49, y: 31, value: 12600, region: "EMEA" },
  { id: "dubai", name: "Dubai", x: 58, y: 44, value: 6800, region: "EMEA" },
  { id: "mumbai", name: "Mumbai", x: 65, y: 47, value: 11200, region: "APAC" },
  { id: "singapore", name: "Singapore", x: 74, y: 56, value: 9400, region: "APAC" },
  { id: "tokyo", name: "Tokyo", x: 84, y: 38, value: 16200, region: "APAC" },
  { id: "sydney", name: "Sydney", x: 86, y: 72, value: 7600, region: "Oceania" },
];

const regions = [
  { name: "North America", value: 47600, share: 38, delta: 12.4, color: "var(--chart-1)" },
  { name: "EMEA", value: 41200, share: 33, delta: 8.2, color: "var(--chart-2)" },
  { name: "APAC", value: 36800, share: 29, delta: 18.6, color: "var(--chart-3)" },
  { name: "LATAM", value: 8400, share: 7, delta: -2.1, color: "var(--chart-4)" },
  { name: "Oceania", value: 7600, share: 6, delta: 4.3, color: "var(--chart-5)" },
];

const topCountries = [
  { name: "United States", code: "US", users: 48200, delta: 14.2 },
  { name: "United Kingdom", code: "GB", users: 18400, delta: 8.6 },
  { name: "Germany", code: "DE", users: 14200, delta: 6.1 },
  { name: "Japan", code: "JP", users: 12600, delta: 11.4 },
  { name: "India", code: "IN", users: 10800, delta: 22.8 },
  { name: "Brazil", code: "BR", users: 6400, delta: -1.8 },
  { name: "Australia", code: "AU", users: 5800, delta: 4.3 },
  { name: "France", code: "FR", users: 5200, delta: 3.7 },
];

const heatRows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const heatCols = ["00", "04", "08", "12", "16", "20"];
const heatData = heatRows.map(() => heatCols.map(() => Math.floor(Math.random() * 100)));

const heatColor = (v: number) => {
  if (v < 15) return "bg-primary/5";
  if (v < 35) return "bg-primary/15";
  if (v < 55) return "bg-primary/30";
  if (v < 75) return "bg-primary/55";
  if (v < 90) return "bg-primary/75";
  return "bg-primary";
};

export default function MapsPage() {
  const [active, setActive] = React.useState<Marker | null>(markers[0]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maps"
        description="Stylized world map with interactive markers, regional breakdowns, top countries, and a weekly activity heatmap."
        breadcrumbs={[{ label: "UI Library" }, { label: "Maps" }]}
        actions={
          <Button variant="outline" size="sm" onClick={() => toast.success("Map exported", { description: "PNG downloaded to your device." })}>
            <Globe className="size-4 mr-2" /> Export map
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Active Users", value: "108,400", delta: 12.4 },
          { icon: MapPin, label: "Cities", value: "84", delta: 3 },
          { icon: Globe, label: "Countries", value: "42", delta: 4 },
          { icon: Activity, label: "Live Sessions", value: "1,824", delta: 8.2 },
        ].map((s) => {
          const Icon = s.icon;
          const up = s.delta >= 0;
          return (
            <SectionCard key={s.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
              </div>
              <p className={"text-xs mt-2 flex items-center gap-1 " + (up ? "text-success" : "text-destructive")}>
                {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {up ? "+" : ""}{s.delta}% this week
              </p>
            </SectionCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Global Distribution" description="Click a marker to inspect" className="lg:col-span-2">
          <div className="relative aspect-[2/1] w-full rounded-lg bg-gradient-to-b from-muted/40 to-muted/10 border border-border overflow-hidden">
            {/* Grid backdrop */}
            <svg className="absolute inset-0 w-full h-full text-muted-foreground/15" preserveAspectRatio="none" viewBox="0 0 100 50">
              {Array.from({ length: 11 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 10} y1={0} x2={i * 10} y2={50} stroke="currentColor" strokeWidth={0.15} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h${i}`} x1={0} y1={i * 10} x2={100} y2={i * 10} stroke="currentColor" strokeWidth={0.15} />
              ))}
              {/* Equator */}
              <line x1={0} y1={25} x2={100} y2={25} stroke="var(--border)" strokeWidth={0.3} strokeDasharray="0.6 0.6" />
            </svg>
            {/* Stylized continents */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
              <g fill="var(--primary)" fillOpacity={0.12} stroke="var(--primary)" strokeOpacity={0.3} strokeWidth={0.2}>
                {/* North America */}
                <path d="M8,18 Q14,14 22,16 L26,22 Q24,30 18,34 L12,32 Q6,26 8,18 Z" />
                {/* South America */}
                <path d="M26,34 Q30,32 32,36 L31,46 Q28,48 25,46 L24,40 Z" />
                {/* Europe */}
                <path d="M44,20 Q50,18 53,22 L52,28 Q46,30 43,26 Z" />
                {/* Africa */}
                <path d="M48,30 Q56,28 58,34 L56,44 Q52,46 49,44 L47,38 Z" />
                {/* Asia */}
                <path d="M56,16 Q72,14 84,20 L82,32 Q70,34 60,30 L55,24 Z" />
                {/* India */}
                <path d="M64,30 L68,30 L67,38 L63,36 Z" />
                {/* Oceania */}
                <path d="M82,40 Q88,38 90,42 L88,46 Q84,46 82,44 Z" />
              </g>
            </svg>
            {/* Markers */}
            {markers.map((m) => {
              const isActive = active?.id === m.id;
              return (
                <button
                  key={m.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  onClick={() => { setActive(m); toast.info(`${m.name}`, { description: `${m.value.toLocaleString()} active users · ${m.region}` }); }}
                  aria-label={m.name}
                >
                  <span className={"absolute inset-0 rounded-full animate-ping " + (isActive ? "bg-primary/40" : "bg-primary/20")} style={{ width: 14, height: 14, left: -7, top: -7 }} />
                  <span className={"relative block rounded-full border-2 transition-all " + (isActive ? "size-3.5 bg-primary border-primary scale-125" : "size-2.5 bg-background border-primary group-hover:scale-110")} />
                </button>
              );
            })}
            {/* Active marker tooltip */}
            {active && (
              <div className="absolute left-4 top-4 rounded-lg border border-border bg-popover/95 backdrop-blur px-3 py-2 shadow-sm min-w-[180px]">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3" />{active.region}
                </div>
                <p className="text-sm font-semibold mt-0.5">{active.name}</p>
                <p className="text-lg font-bold mt-1 tabular-nums">{active.value.toLocaleString()}</p>
                <p className="text-[11px] text-muted-foreground">active users</p>
              </div>
            )}
            <div className="absolute right-3 bottom-3 flex items-center gap-3 text-[10px] text-muted-foreground bg-background/80 backdrop-blur px-2 py-1 rounded-md border border-border">
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-primary/30" />Low</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-primary/60" />Mid</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-primary" />High</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Regional Share" description="Users by region">
          <div className="space-y-4">
            {regions.map((r) => {
              const up = r.delta >= 0;
              return (
                <div key={r.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                      <span className="text-sm font-medium">{r.name}</span>
                    </div>
                    <span className="text-xs tabular-nums">{r.value.toLocaleString()}</span>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${r.share}%`, backgroundColor: r.color }} />
                  </div>
                  <p className={"text-[11px] mt-1 flex items-center gap-1 " + (up ? "text-success" : "text-destructive")}>
                    {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {up ? "+" : ""}{r.delta}% · {r.share}% share
                  </p>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Top Countries" description="By active user count" className="lg:col-span-2" noBodyPadding>
          <div className="divide-y divide-border">
            {topCountries.map((c, i) => {
              const up = c.delta >= 0;
              return (
                <div key={c.code} className="flex items-center gap-3 px-5 py-3 hover:bg-accent/40 transition-colors">
                  <span className="text-xs font-mono text-muted-foreground w-5">{i + 1}</span>
                  <Badge variant="outline" className="font-mono text-[10px] font-semibold w-9 justify-center">{c.code}</Badge>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <p className="text-[11px] text-muted-foreground">{c.users.toLocaleString()} users</p>
                  </div>
                  <div className="w-28 hidden sm:block">
                    <Progress value={(c.users / 48200) * 100} className="h-1.5" />
                  </div>
                  <Badge variant="outline" className={"font-normal " + (up ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20")}>
                    {up ? "+" : ""}{c.delta}%
                  </Badge>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Activity Heatmap" description="Sessions by hour and weekday">
          <div className="space-y-1">
            <div className="grid grid-cols-8 gap-1 text-[10px] text-muted-foreground">
              <span></span>
              {heatCols.map((c) => <span key={c} className="text-center">{c}</span>)}
            </div>
            {heatData.map((row, ri) => (
              <div key={ri} className="grid grid-cols-8 gap-1 items-center">
                <span className="text-[10px] text-muted-foreground">{heatRows[ri]}</span>
                {row.map((v, ci) => (
                  <div
                    key={ci}
                    title={`${heatRows[ri]} ${heatCols[ci]}:00 — ${v} sessions`}
                    className={"aspect-square rounded-sm " + heatColor(v) + " hover:ring-2 hover:ring-ring cursor-pointer transition-all"}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-[10px] text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {[5, 15, 30, 55, 75, 100].map((v) => <div key={v} className={"size-2.5 rounded-sm " + heatColor(v)} />)}
            </div>
            <span>More</span>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Live Regional Feed" description="Latest signups from around the world">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Sofia Lindqvist", country: "Sweden", code: "SE", time: "just now" },
            { name: "Rafael Costa", country: "Brazil", code: "BR", time: "2m ago" },
            { name: "Mei Tanaka", country: "Japan", code: "JP", time: "5m ago" },
            { name: "Hassan Ali", country: "UAE", code: "AE", time: "8m ago" },
            { name: "Elena Petrova", country: "Russia", code: "RU", time: "11m ago" },
            { name: "Lucas Silva", country: "Portugal", code: "PT", time: "14m ago" },
          ].map((u) => (
            <div key={u.name} className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-accent/40 transition-colors">
              <Avatar className="size-9"><AvatarFallback className="text-xs bg-muted">{u.name.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{u.name}</p>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1.5"><Badge variant="outline" className="font-mono text-[9px] h-4 px-1">{u.code}</Badge> {u.country} · {u.time}</p>
              </div>
              <TrendingUp className="size-4 text-success" />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
