"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { ChartCard } from "@/components/common/chart-card";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [{ name: "Mon", v: 40 }, { name: "Tue", v: 65 }, { name: "Wed", v: 52 }, { name: "Thu", v: 78 }, { name: "Fri", v: 88 }, { name: "Sat", v: 72 }, { name: "Sun", v: 64 }];
const pieData = [{ name: "A", value: 40, color: "oklch(0.55 0.14 165)" }, { name: "B", value: 30, color: "oklch(0.62 0.14 240)" }, { name: "C", value: 20, color: "oklch(0.75 0.16 75)" }, { name: "D", value: 10, color: "oklch(0.65 0.20 350)" }];

export function UiChartsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Charts"]} title="Charts" description="Data visualization components powered by Recharts." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartCard title="Area Chart" description="Trend over time"><div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.55 0.14 165)" stopOpacity={0.4} /><stop offset="100%" stopColor="oklch(0.55 0.14 165)" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.01 250 / 0.15)" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} /><Area type="monotone" dataKey="v" stroke="oklch(0.55 0.14 165)" strokeWidth={2.5} fill="url(#g1)" /></AreaChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="Bar Chart" description="Categorical comparison"><div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.01 250 / 0.15)" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "oklch(0.7 0.01 250 / 0.08)" }} /><Bar dataKey="v" fill="oklch(0.62 0.14 240)" radius={[6, 6, 0, 0]} maxBarSize={40} /></BarChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="Line Chart" description="Multi-series trends"><div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.01 250 / 0.15)" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} /><Line type="monotone" dataKey="v" stroke="oklch(0.65 0.20 350)" strokeWidth={2.5} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div></ChartCard>
        <ChartCard title="Pie Chart" description="Proportional breakdown"><div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">{pieData.map((d, i) => <Cell key={i} fill={d.color} />)}</Pie><Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} /></PieChart></ResponsiveContainer></div></ChartCard>
      </div>
    </div>
  );
}
