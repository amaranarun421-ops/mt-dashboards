'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from 'recharts';
import { useTheme } from '@/components/dashboard/theme-provider';

/* Shared tooltip */
function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--popover)] px-3 py-2 shadow-[var(--shadow-theme-lg)]">
      {label && (
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-medium">
            <span
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="text-[var(--text-muted)]">{entry.name}:</span>
            <span className="font-medium text-[var(--text-strong)]">
              {typeof entry.value === 'number'
                ? entry.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const tooltipProps = {
  content: <ChartTooltip />,
  cursor: { fill: 'rgba(70, 95, 255, 0.06)', stroke: 'rgba(70, 95, 255, 0.18)' },
} as const;

const axisProps = {
  tickLine: false,
  axisLine: false,
  tick: { fontSize: 11, fontWeight: 500, fill: 'var(--text-muted)' as const },
} as const;

interface BaseChartProps {
  height?: number;
  className?: string;
}

/* ---------------- AreaChart ---------------- */
export interface AreaSeries {
  key: string;
  name: string;
  color: string;
}

interface AreaTrendChartProps extends BaseChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: AreaSeries[];
  stack?: boolean;
  showGrid?: boolean;
}

export function AreaTrendChart({
  data,
  xKey,
  series,
  stack = false,
  showGrid = true,
  height = 280,
  className,
}: AreaTrendChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
              </linearGradient>
            ))}
          </defs>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-subtle)"
              vertical={false}
            />
          )}
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} width={48} />
          <RTooltip {...tooltipProps} />
          {series.map((s, idx) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={2.5}
              fill={`url(#grad-${s.key})`}
              stackId={stack ? '1' : undefined}
              activeDot={{ r: 4, strokeWidth: 2, stroke: 'var(--card)' }}
              isAnimationActive={true}
              animationDuration={800}
              animationBegin={idx * 150}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------------- BarChart ---------------- */
interface BarTrendChartProps extends BaseChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: AreaSeries[];
  stack?: boolean;
  showGrid?: boolean;
  horizontal?: boolean;
}

export function BarTrendChart({
  data,
  xKey,
  series,
  stack = false,
  showGrid = true,
  horizontal = false,
  height = 280,
  className,
}: BarTrendChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 12, right: 12, left: -8, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-subtle)"
              vertical={!horizontal}
              horizontal={horizontal}
            />
          )}
          {horizontal ? (
            <>
              <XAxis type="number" {...axisProps} />
              <YAxis type="category" dataKey={xKey} {...axisProps} width={120} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} {...axisProps} />
              <YAxis {...axisProps} width={48} />
            </>
          )}
          <RTooltip {...tooltipProps} />
          {series.map((s, idx) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color}
              stackId={stack ? '1' : undefined}
              radius={stack ? [0, 0, 0, 0] : [6, 6, 0, 0]}
              maxBarSize={48}
              isAnimationActive={true}
              animationDuration={800}
              animationBegin={idx * 150}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------------- LineChart ---------------- */
interface LineTrendChartProps extends BaseChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: AreaSeries[];
  showGrid?: boolean;
}

export function LineTrendChart({
  data,
  xKey,
  series,
  showGrid = true,
  height = 280,
  className,
}: LineTrendChartProps) {
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-subtle)"
              vertical={false}
            />
          )}
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} width={48} />
          <RTooltip {...tooltipProps} />
          {series.map((s, idx) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: 'var(--card)' }}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={idx * 200}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------------- DonutChart ---------------- */
interface DonutChartProps extends BaseChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  centerLabel,
  centerValue,
  height = 220,
  className,
}: DonutChartProps) {
  return (
    <div className={className} style={{ width: '100%', height, position: 'relative' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="92%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <RTooltip {...tooltipProps} />
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <p className="text-2xl font-semibold text-[var(--text-strong)]">{centerValue}</p>
          )}
          {centerLabel && (
            <p className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">{centerLabel}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- HorizontalBars (custom SVG) ---------------- */
interface HorizontalBarsProps {
  data: { label: string; value: number; color?: string; subtitle?: string }[];
  max?: number;
  className?: string;
  valueFormatter?: (v: number) => string;
}

export function HorizontalBars({
  data,
  max,
  className,
  valueFormatter = (v) => v.toLocaleString(),
}: HorizontalBarsProps) {
  const maximum = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className={className} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {data.map((item, idx) => (
        <li key={item.label} className={idx > 0 ? 'mt-4' : ''}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--text-strong)]">{item.label}</p>
              {item.subtitle && (
                <p className="truncate text-xs font-medium text-[var(--text-muted)]">{item.subtitle}</p>
              )}
            </div>
            <span className="flex-shrink-0 text-sm font-medium text-[var(--text-strong)]">
              {valueFormatter(item.value)}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${(item.value / maximum) * 100}%`,
                backgroundColor: item.color ?? 'var(--color-brand-500)',
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
