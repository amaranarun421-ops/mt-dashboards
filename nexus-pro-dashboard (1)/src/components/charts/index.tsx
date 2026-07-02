"use client";

import * as React from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar,
  RadarChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  type TooltipProps,
} from "recharts";
import { Maximize2, X, Download, TrendingUp, TrendingDown } from "lucide-react";
import { chartTokens, formatCompactCurrency, formatCompactNumber } from "@/lib/chart-theme";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ============ ChartTooltip — theme-aware custom tooltip ============

export function ChartTooltip<TValue extends string | number>({
  active,
  payload,
  label,
  formatter,
}: TooltipProps<number, string> & { formatter?: (value: number, name: string) => string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {label && (
        <p className="mb-1.5 text-xs font-semibold text-gray-800 dark:text-white/90">{label}</p>
      )}
      <div className="space-y-1">
        {payload.map((entry, i) => {
          const value = typeof entry.value === "number" ? entry.value : Number(entry.value);
          const formatted = formatter ? formatter(value, String(entry.name)) : formatCompactNumber(value);
          return (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color ?? entry.payload?.fill ?? chartTokens.series[0] }}
              />
              <span className="text-gray-600 dark:text-gray-400">{entry.name}</span>
              <span className="ml-auto font-semibold text-gray-800 dark:text-white/90">{formatted}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ ChartCard — wrapper with title, fullscreen, export ============

interface ChartCardProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Enable fullscreen mode */
  fullscreen?: boolean;
  /** Trend badge */
  trend?: { value: number; label?: string };
  /** Series legend (custom) */
  legend?: Array<{ label: string; color: string }>;
}

export function ChartCard({ title, description, actions, children, className, fullscreen: enableFullscreen = true, trend, legend }: ChartCardProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <>
      <div className={cn("rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02]", className)}>
        <div className="flex flex-wrap items-start justify-between gap-3 p-5 pb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h3>
              {trend && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    trend.value >= 0
                      ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                      : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                  )}
                >
                  {trend.value >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(trend.value * 100).toFixed(1)}%
                </span>
              )}
            </div>
            {description && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
            {legend && legend.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {legend.map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {actions}
            {enableFullscreen && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFullscreen(true)} aria-label="Expand chart">
                <Maximize2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="px-5 pb-5 pt-2">{children}</div>
      </div>

      {/* Fullscreen modal */}
      {enableFullscreen && (
        <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="h-[60vh]">{children}</div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// ============ Reusable chart components ============

interface LineSeriesChartProps {
  data: Array<Record<string, string | number>>;
  series: Array<{ key: string; label: string; color?: string }>;
  xKey: string;
  height?: number;
  currency?: boolean;
  showGrid?: boolean;
}

export function LineSeriesChart({ data, series, xKey, height = 280, currency, showGrid = true }: LineSeriesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e4e7ec)" vertical={false} />}
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }}
          axisLine={{ stroke: "var(--color-border, #e4e7ec)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => (currency ? formatCompactCurrency(Number(v)) : formatCompactNumber(Number(v)))}
        />
        <Tooltip content={<ChartTooltip />} />
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color ?? chartTokens.series[i % chartTokens.series.length]}
            strokeWidth={2}
            dot={{ r: 0 }}
            activeDot={{ r: 5, strokeWidth: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

interface AreaSeriesChartProps {
  data: Array<Record<string, string | number>>;
  series: Array<{ key: string; label: string; color?: string }>;
  xKey: string;
  height?: number;
  currency?: boolean;
  stacked?: boolean;
}

export function AreaSeriesChart({ data, series, xKey, height = 280, currency, stacked }: AreaSeriesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s, i) => {
            const color = s.color ?? chartTokens.series[i % chartTokens.series.length];
            return (
              <linearGradient key={s.key} id={`area-grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e4e7ec)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }} axisLine={{ stroke: "var(--color-border, #e4e7ec)" }} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }} axisLine={false} tickLine={false} tickFormatter={(v) => (currency ? formatCompactCurrency(Number(v)) : formatCompactNumber(Number(v)))} />
        <Tooltip content={<ChartTooltip />} />
        {series.map((s, i) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stackId={stacked ? "1" : undefined}
            stroke={s.color ?? chartTokens.series[i % chartTokens.series.length]}
            strokeWidth={2}
            fill={`url(#area-grad-${s.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface BarSeriesChartProps {
  data: Array<Record<string, string | number>>;
  series: Array<{ key: string; label: string; color?: string }>;
  xKey: string;
  height?: number;
  currency?: boolean;
  stacked?: boolean;
  horizontal?: boolean;
}

export function BarSeriesChart({ data, series, xKey, height = 280, currency, stacked, horizontal }: BarSeriesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout={horizontal ? "vertical" : "horizontal"} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border, #e4e7ec)" vertical={!horizontal} horizontal={horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }} axisLine={false} tickLine={false} tickFormatter={(v) => (currency ? formatCompactCurrency(Number(v)) : formatCompactNumber(Number(v)))} />
            <YAxis type="category" dataKey={xKey} tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }} axisLine={false} tickLine={false} width={100} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }} axisLine={{ stroke: "var(--color-border, #e4e7ec)" }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }} axisLine={false} tickLine={false} tickFormatter={(v) => (currency ? formatCompactCurrency(Number(v)) : formatCompactNumber(Number(v)))} />
          </>
        )}
        <Tooltip cursor={{ fill: "var(--color-muted, #f2f4f7)", opacity: 0.5 }} content={<ChartTooltip />} />
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            stackId={stacked ? "1" : undefined}
            fill={s.color ?? chartTokens.series[i % chartTokens.series.length]}
            radius={stacked ? 0 : [4, 4, 0, 0]}
            maxBarSize={48}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

interface DonutChartProps {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
  /** Show total value in the center */
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({ data, height = 280, centerLabel, centerValue }: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="62%"
            outerRadius="88%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color ?? chartTokens.series[i % chartTokens.series.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerLabel && <span className="text-xs text-gray-500 dark:text-gray-400">{centerLabel}</span>}
          {centerValue && <span className="text-2xl font-bold text-gray-800 dark:text-white">{centerValue}</span>}
          {centerLabel && <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{total.toLocaleString()} total</span>}
        </div>
      )}
    </div>
  );
}

interface RadarSeriesChartProps {
  data: Array<Record<string, string | number>>;
  series: Array<{ key: string; label: string; color?: string }>;
  xKey: string;
  height?: number;
}

export function RadarSeriesChart({ data, series, xKey, height = 320 }: RadarSeriesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid stroke="var(--color-border, #e4e7ec)" />
        <PolarAngleAxis dataKey={xKey} tick={{ fontSize: 11, fill: "var(--color-muted-foreground, #667085)" }} />
        <PolarRadiusAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground, #667085)" }} axisLine={false} />
        {series.map((s, i) => (
          <Radar
            key={s.key}
            name={s.label}
            dataKey={s.key}
            stroke={s.color ?? chartTokens.series[i % chartTokens.series.length]}
            fill={s.color ?? chartTokens.series[i % chartTokens.series.length]}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
        <Tooltip content={<ChartTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

interface RadialProgressChartProps {
  data: Array<{ name: string; value: number; fill?: string }>;
  height?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function RadialProgressChart({ data, height = 280, centerLabel, centerValue }: RadialProgressChartProps) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={14} data={data} startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={{ fill: "var(--color-muted, #f2f4f7)" }} dataKey="value" cornerRadius={10} />
          <Tooltip content={<ChartTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerValue && <span className="text-3xl font-bold text-gray-800 dark:text-white">{centerValue}</span>}
          {centerLabel && <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

// ============ FunnelChart — custom SVG ============

interface FunnelChartProps {
  data: Array<{ stage: string; value: number; pct?: number }>;
  height?: number;
  color?: string;
}

export function FunnelChart({ data, height = 280, color = "#465fff" }: FunnelChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-2" style={{ minHeight: height }}>
      {data.map((d, i) => {
        const widthPct = (d.value / max) * 100;
        const convPct = d.pct ?? (i === 0 ? 100 : (d.value / data[0].value) * 100);
        return (
          <div key={d.stage} className="group">
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="font-medium text-gray-700 dark:text-gray-300">{d.stage}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {d.value.toLocaleString()} · <span className="font-semibold text-brand-500">{convPct.toFixed(1)}%</span>
              </span>
            </div>
            <div className="relative h-8 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-lg transition-all duration-500 group-hover:brightness-110"
                style={{ width: `${widthPct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============ CohortMatrix — heatmap-style ============

interface CohortMatrixProps {
  data: Array<Array<{ value: number; label?: string }>>;
  rowLabels: string[];
  colLabels: string[];
  /** Max value for color scale */
  max?: number;
  formatValue?: (v: number) => string;
  className?: string;
}

export function CohortMatrix({ data, rowLabels, colLabels, max, formatValue = (v) => `${v}%`, className }: CohortMatrixProps) {
  const maxVal = max ?? Math.max(...data.flat().map((d) => d.value));

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th className="text-left p-2 font-medium text-gray-500 dark:text-gray-400">Cohort</th>
            {colLabels.map((c) => (
              <th key={c} className="p-2 font-medium text-gray-500 dark:text-gray-400 text-center min-w-[60px]">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="p-2 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{rowLabels[i]}</td>
              {row.map((cell, j) => {
                const intensity = cell.value / maxVal;
                return (
                  <td key={j} className="p-1">
                    <div
                      className="flex items-center justify-center h-9 rounded-md text-xs font-semibold transition hover:ring-2 hover:ring-brand-500/30 cursor-default"
                      style={{
                        backgroundColor: `rgba(70, 95, 255, ${0.08 + intensity * 0.7})`,
                        color: intensity > 0.5 ? "#fff" : "var(--color-foreground, #1d2939)",
                      }}
                      title={cell.label ?? formatValue(cell.value)}
                    >
                      {formatValue(cell.value)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
