"use client";

import * as React from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip,
  XAxis, YAxis, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const colors = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
  tertiary: "var(--chart-3)",
  quaternary: "var(--chart-4)",
  quinary: "var(--chart-5)",
  senary: "var(--chart-6)",
};

const palette = [colors.primary, colors.secondary, colors.tertiary, colors.quaternary, colors.quinary, colors.senary];

export function AreaTrend({
  data, xKey, yKeys, height = 280, showGrid = true, showAxis = true,
}: {
  data: any[];
  xKey: string;
  yKeys: { key: string; color?: string; name?: string }[];
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          {yKeys.map((y, i) => {
            const color = y.color ?? palette[i % palette.length];
            return (
              <linearGradient key={y.key} id={`area-${y.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />}
        {showAxis && <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />}
        {showAxis && <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />}
        <Tooltip cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />
        {yKeys.length > 1 && <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />}
        {yKeys.map((y, i) => {
          const color = y.color ?? palette[i % palette.length];
          return (
            <Area
              key={y.key}
              type="monotone"
              dataKey={y.key}
              name={y.name ?? y.key}
              stroke={color}
              strokeWidth={2}
              fill={`url(#area-${y.key})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LineTrend({
  data, xKey, yKeys, height = 280, showGrid = true,
}: {
  data: any[];
  xKey: string;
  yKeys: { key: string; color?: string; name?: string }[];
  height?: number;
  showGrid?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />}
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
        <Tooltip cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />
        {yKeys.length > 1 && <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />}
        {yKeys.map((y, i) => {
          const color = y.color ?? palette[i % palette.length];
          return (
            <Line
              key={y.key}
              type="monotone"
              dataKey={y.key}
              name={y.name ?? y.key}
              stroke={color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2 }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarTrend({
  data, xKey, yKeys, height = 280, showGrid = true, stacked = false, layout = "horizontal",
}: {
  data: any[];
  xKey: string;
  yKeys: { key: string; color?: string; name?: string }[];
  height?: number;
  showGrid?: boolean;
  stacked?: boolean;
  layout?: "horizontal" | "vertical";
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={layout}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        barGap={4}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={layout === "horizontal"} horizontal={layout === "vertical"} stroke="var(--border)" />}
        {layout === "horizontal" ? (
          <>
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
          </>
        ) : (
          <>
            <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <YAxis dataKey={xKey} type="category" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={80} />
          </>
        )}
        <Tooltip cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
        {yKeys.length > 1 && <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />}
        {yKeys.map((y, i) => {
          const color = y.color ?? palette[i % palette.length];
          return (
            <Bar
              key={y.key}
              dataKey={y.key}
              name={y.name ?? y.key}
              fill={color}
              stackId={stacked ? "stack" : undefined}
              radius={layout === "horizontal" ? [4, 4, 0, 0] : [0, 4, 4, 0]}
              maxBarSize={48}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data, height = 240, innerRadius = 60, outerRadius = 90, centerLabel, centerValue,
}: {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  centerLabel?: string;
  centerValue?: string;
}) {
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color ?? palette[i % palette.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            iconType="circle"
            iconSize={8}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && <span className="text-2xl font-bold">{centerValue}</span>}
          {centerLabel && <span className="text-xs text-muted-foreground mt-0.5">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

export function SimplePie({
  data, height = 240,
}: {
  data: { name: string; value: number; color?: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          stroke="none"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color ?? palette[i % palette.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function RadialProgress({
  value, height = 200, color, label,
}: {
  value: number;
  height?: number;
  color?: string;
  label?: string;
}) {
  const data = [{ name: label ?? "Progress", value }];
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={20}
            fill={color ?? colors.primary}
            background={{ fill: "var(--muted)" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold">{value}%</span>
        {label && <span className="text-xs text-muted-foreground mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

export function RadarChartTrend({
  data, xKey, yKeys, height = 280,
}: {
  data: any[];
  xKey: string;
  yKeys: { key: string; color?: string; name?: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey={xKey} tick={{ fontSize: 11 }} />
        <PolarRadiusAxis tick={{ fontSize: 10 }} />
        {yKeys.map((y, i) => {
          const color = y.color ?? palette[i % palette.length];
          return (
            <Radar
              key={y.key}
              name={y.name ?? y.key}
              dataKey={y.key}
              stroke={color}
              fill={color}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          );
        })}
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}

/* Sparkline for stat cards */
export function Sparkline({
  data, color, height = 40, type = "area",
}: {
  data: { value: number }[];
  color?: string;
  height?: number;
  type?: "area" | "line" | "bar";
}) {
  const c = color ?? colors.primary;
  const id = React.useId();
  const mapped = data.map((d, i) => ({ i, value: d.value }));
  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={mapped} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Bar dataKey="value" fill={c} radius={[2, 2, 0, 0]} maxBarSize={6} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={mapped} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <Line type="monotone" dataKey="value" stroke={c} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={mapped} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity={0.4} />
            <stop offset="100%" stopColor={c} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="value" stroke={c} strokeWidth={1.5} fill={`url(#spark-${id})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
