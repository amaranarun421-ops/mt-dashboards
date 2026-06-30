"use client";

import * as React from "react";
import {
  Activity, BarChart3, Globe, Clock, Zap, TrendingUp, Target, Gauge,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";
import {
  AreaTrend, LineTrend, BarTrend, DonutChart, SimplePie, RadialProgress, RadarChartTrend,
} from "@/components/charts";

const monthly = [
  { month: "Jan", visitors: 4200, signups: 820, revenue: 28 },
  { month: "Feb", visitors: 4800, signups: 940, revenue: 31 },
  { month: "Mar", visitors: 5400, signups: 1080, revenue: 35 },
  { month: "Apr", visitors: 5100, signups: 980, revenue: 33 },
  { month: "May", visitors: 6200, signups: 1240, revenue: 41 },
  { month: "Jun", visitors: 7100, signups: 1420, revenue: 48 },
  { month: "Jul", visitors: 7800, signups: 1560, revenue: 52 },
  { month: "Aug", visitors: 8400, signups: 1680, revenue: 56 },
  { month: "Sep", visitors: 7900, signups: 1520, revenue: 53 },
  { month: "Oct", visitors: 9100, signups: 1840, revenue: 61 },
  { month: "Nov", visitors: 9800, signups: 1980, revenue: 67 },
  { month: "Dec", visitors: 11200, signups: 2240, revenue: 78 },
];

const quarters = [
  { q: "Q1", desktop: 38, mobile: 62, tablet: 18 },
  { q: "Q2", desktop: 42, mobile: 68, tablet: 22 },
  { q: "Q3", desktop: 45, mobile: 75, tablet: 24 },
  { q: "Q4", desktop: 51, mobile: 82, tablet: 28 },
];

const devices = [
  { name: "Desktop", value: 42, color: "var(--chart-1)" },
  { name: "Mobile", value: 38, color: "var(--chart-2)" },
  { name: "Tablet", value: 12, color: "var(--chart-3)" },
  { name: "Other", value: 8, color: "var(--chart-4)" },
];

const categories = [
  { name: "Electronics", value: 38, color: "var(--chart-1)" },
  { name: "Apparel", value: 24, color: "var(--chart-2)" },
  { name: "Home", value: 18, color: "var(--chart-3)" },
  { name: "Beauty", value: 12, color: "var(--chart-4)" },
  { name: "Sports", value: 8, color: "var(--chart-5)" },
];

const radar = [
  { metric: "Speed", current: 86, target: 90 },
  { metric: "Reliability", current: 92, target: 95 },
  { metric: "Security", current: 78, target: 90 },
  { metric: "Usability", current: 88, target: 85 },
  { metric: "Scalability", current: 75, target: 80 },
  { metric: "Cost", current: 82, target: 70 },
];

const weeks = [
  { w: "W1", organic: 320, paid: 240, referral: 80 },
  { w: "W2", organic: 410, paid: 280, referral: 95 },
  { w: "W3", organic: 380, paid: 310, referral: 110 },
  { w: "W4", organic: 460, paid: 340, referral: 130 },
  { w: "W5", organic: 520, paid: 380, referral: 145 },
  { w: "W6", organic: 480, paid: 410, referral: 165 },
];

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Charts"
        description="A tour of every chart type available in the MTVerse kit — area, line, bars, pie, donut, radial, and radar."
        breadcrumbs={[{ label: "UI Library" }, { label: "Charts" }]}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <span className="size-1.5 rounded-full bg-success mr-1.5" />Live
            </Badge>
            <Badge variant="outline"><Clock className="size-3 mr-1" />Updated 2m ago</Badge>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: "Visitors", value: "11,200", delta: "+14.2%", color: "var(--chart-1)" },
          { icon: Zap, label: "Signups", value: "2,240", delta: "+8.6%", color: "var(--chart-2)" },
          { icon: Globe, label: "Countries", value: "84", delta: "+3", color: "var(--chart-3)" },
          { icon: Gauge, label: "Avg Load", value: "842ms", delta: "-12%", color: "var(--chart-4)" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <SectionCard key={s.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)`, color: s.color }}>
                  <Icon className="size-5" />
                </div>
              </div>
              <p className="text-xs text-success mt-2">{s.delta} vs last month</p>
            </SectionCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Area Trend" description="Visitors vs signups over 12 months" actions={<Badge variant="outline" className="font-normal">Area</Badge>}>
          <AreaTrend
            data={monthly}
            xKey="month"
            yKeys={[
              { key: "visitors", name: "Visitors", color: "var(--chart-1)" },
              { key: "signups", name: "Signups", color: "var(--chart-2)" },
            ]}
            height={260}
          />
        </SectionCard>

        <SectionCard title="Line Trend" description="Revenue growth across the year" actions={<Badge variant="outline" className="font-normal">Line</Badge>}>
          <LineTrend
            data={monthly}
            xKey="month"
            yKeys={[{ key: "revenue", name: "Revenue ($k)", color: "var(--chart-3)" }]}
            height={260}
          />
        </SectionCard>

        <SectionCard title="Bar — Grouped" description="Sessions by device per quarter" actions={<Badge variant="outline" className="font-normal">Grouped</Badge>}>
          <BarTrend
            data={quarters}
            xKey="q"
            yKeys={[
              { key: "desktop", name: "Desktop", color: "var(--chart-1)" },
              { key: "mobile", name: "Mobile", color: "var(--chart-2)" },
              { key: "tablet", name: "Tablet", color: "var(--chart-3)" },
            ]}
            height={260}
          />
        </SectionCard>

        <SectionCard title="Bar — Stacked" description="Acquisition channels per week" actions={<Badge variant="outline" className="font-normal">Stacked</Badge>}>
          <BarTrend
            data={weeks}
            xKey="w"
            yKeys={[
              { key: "organic", name: "Organic", color: "var(--chart-1)" },
              { key: "paid", name: "Paid", color: "var(--chart-2)" },
              { key: "referral", name: "Referral", color: "var(--chart-4)" },
            ]}
            stacked
            height={260}
          />
        </SectionCard>

        <SectionCard title="Pie" description="Traffic share by device" actions={<Badge variant="outline" className="font-normal">Pie</Badge>}>
          <SimplePie data={devices} height={260} />
        </SectionCard>

        <SectionCard title="Donut" description="Revenue by category" actions={<Badge variant="outline" className="font-normal">Donut</Badge>}>
          <DonutChart data={categories} height={260} centerValue="$284k" centerLabel="Total" />
        </SectionCard>

        <SectionCard title="Radial Progress" description="Quarterly OKR completion" actions={<Badge variant="outline" className="font-normal">Radial</Badge>}>
          <div className="grid grid-cols-3 gap-2">
            <RadialProgress value={76} label="Active users" height={170} color="var(--chart-1)" />
            <RadialProgress value={62} label="Retention" height={170} color="var(--chart-2)" />
            <RadialProgress value={91} label="NPS" height={170} color="var(--chart-3)" />
          </div>
        </SectionCard>

        <SectionCard title="Radar" description="Current vs target across 6 metrics" actions={<Badge variant="outline" className="font-normal">Radar</Badge>}>
          <RadarChartTrend
            data={radar}
            xKey="metric"
            yKeys={[
              { key: "current", name: "Current", color: "var(--chart-1)" },
              { key: "target", name: "Target", color: "var(--chart-4)" },
            ]}
            height={260}
          />
        </SectionCard>
      </div>

      <SectionCard title="Interactive Showcase" description="Switch between datasets to compare visual treatments.">
        <Tabs defaultValue="visitors">
          <TabsList className="mb-3">
            <TabsTrigger value="visitors" className="text-xs"><Activity className="size-3.5 mr-1.5" />Visitors</TabsTrigger>
            <TabsTrigger value="signups" className="text-xs"><Target className="size-3.5 mr-1.5" />Signups</TabsTrigger>
            <TabsTrigger value="revenue" className="text-xs"><BarChart3 className="size-3.5 mr-1.5" />Revenue</TabsTrigger>
          </TabsList>
          <TabsContent value="visitors">
            <AreaTrend data={monthly} xKey="month" yKeys={[{ key: "visitors", name: "Visitors", color: "var(--chart-1)" }]} height={240} />
          </TabsContent>
          <TabsContent value="signups">
            <BarTrend data={monthly} xKey="month" yKeys={[{ key: "signups", name: "Signups", color: "var(--chart-2)" }]} height={240} />
          </TabsContent>
          <TabsContent value="revenue">
            <LineTrend data={monthly} xKey="month" yKeys={[{ key: "revenue", name: "Revenue ($k)", color: "var(--chart-3)" }]} height={240} />
          </TabsContent>
        </Tabs>
      </SectionCard>
    </div>
  );
}
