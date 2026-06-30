'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/* ========================================================================
   mtverse-style hand-crafted SVG charts
   Premium, no heavy dependencies, fully responsive
   ======================================================================== */

interface CardStyle {
  className?: string;
}

/* ------------------------------------------------------------------ */
/* AreaChart with callout marker                                       */
/* ------------------------------------------------------------------ */
export interface MtverseAreaChartProps extends CardStyle {
  data: { label: string; value: number; secondary?: number }[];
  primaryColor?: string;
  secondaryColor?: string;
  height?: number;
  callout?: { index: number; title: string; value: string; delta: string };
}

export function MtverseAreaChart({
  data,
  primaryColor = '#465FFF',
  secondaryColor = '#93B4FF',
  height = 280,
  callout,
  className,
}: MtverseAreaChartProps) {
  const width = 820;
  const padding = { top: 30, right: 30, bottom: 50, left: 30 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const max = Math.max(...data.flatMap((d) => [d.value, d.secondary ?? 0]));
  const stepX = data.length > 1 ? innerW / (data.length - 1) : innerW;

  const toX = (i: number) => padding.left + i * stepX;
  const toY = (v: number) => padding.top + innerH - (v / max) * innerH;

  const primaryPoints = data.map((d, i) => `${toX(i)},${toY(d.value)}`).join(' ');
  const primaryArea = `${toX(0)},${padding.top + innerH} ${primaryPoints} ${toX(data.length - 1)},${padding.top + innerH}`;
  const secondaryPoints = data
    .map((d, i) => `${toX(i)},${toY(d.secondary ?? 0)}`)
    .join(' ');

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="min-w-[640px] w-full"
        role="img"
        aria-label="Area chart"
        style={{ height: 'auto' }}
      >
        <defs>
          <linearGradient id="mtvAreaFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.22" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((line) => {
          const y = padding.top + (innerH / 4) * line;
          return (
            <line
              key={line}
              x1={padding.left}
              x2={padding.left + innerW}
              y1={y}
              y2={y}
              stroke="var(--border-subtle)"
              strokeDasharray="3 3"
            />
          );
        })}
        {/* Primary area + line */}
        <polygon points={primaryArea} fill="url(#mtvAreaFill)" />
        <polyline
          points={primaryPoints}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Secondary line */}
        {data.some((d) => d.secondary !== undefined) && (
          <polyline
            points={secondaryPoints}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 4"
          />
        )}
        {/* Active callout dot */}
        {callout && (
          <circle
            cx={toX(callout.index)}
            cy={toY(data[callout.index].value)}
            r="6"
            fill={primaryColor}
            stroke="var(--card)"
            strokeWidth="4"
          />
        )}
        {/* Callout tooltip */}
        {callout && (
          <g transform={`translate(${Math.min(toX(callout.index) - 66, width - 150)} ${toY(data[callout.index].value) - 88})`}>
            <rect width="140" height="64" rx="14" fill="var(--card)" stroke="var(--border)" />
            <text x="14" y="22" fontSize="11" fill="var(--text-muted)" fontWeight="700">
              {callout.title}
            </text>
            <text x="14" y="46" fontSize="20" fill="var(--text-strong)" fontWeight="800">
              {callout.value}
            </text>
            <text x={14 + 70} y="46" fontSize="11" fill="var(--color-success-500)" fontWeight="700">
              {callout.delta}
            </text>
          </g>
        )}
        {/* X axis labels */}
        {data.map((d, i) => (
          <text
            key={d.label + i}
            x={toX(i)}
            y={height - 18}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-muted)"
            fontWeight="600"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* StackedBars (mtverse style with rounded tops)                       */
/* ------------------------------------------------------------------ */
export interface MtverseStackedBarChartProps extends CardStyle {
  data: { label: string; segments: { value: number; color: string }[] }[];
  height?: number;
  legend?: { label: string; color: string }[];
}

export function MtverseStackedBarChart({
  data,
  height = 280,
  legend,
  className,
}: MtverseStackedBarChartProps) {
  return (
    <div className={className}>
      <div className="flex items-end gap-3 sm:gap-4 overflow-x-auto pb-2" style={{ height }}>
        {data.map((bar) => {
          const total = bar.segments.reduce((sum, s) => sum + s.value, 0);
          return (
            <div
              key={bar.label}
              className="flex min-w-[44px] flex-1 flex-col items-center gap-2"
            >
              <div className="flex w-10 flex-col justify-end overflow-hidden rounded-t-2xl bg-[var(--surface-sunken)]" style={{ height: height - 40 }}>
                {bar.segments.map((seg, idx) => (
                  <span
                    key={idx}
                    className="block w-full transition-[height] duration-500"
                    style={{
                      height: `${(seg.value / total) * 100}%`,
                      backgroundColor: seg.color,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-[var(--text-muted)]">{bar.label}</span>
            </div>
          );
        })}
      </div>
      {legend && (
        <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-[var(--text-muted)]">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DonutChart (mtverse style — pure SVG, large center label)          */
/* ------------------------------------------------------------------ */
export interface MtverseDonutChartProps extends CardStyle {
  data: { label: string; value: number; color: string }[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}

export function MtverseDonutChart({
  data,
  centerLabel = 'coverage',
  centerValue = '100%',
  size = 220,
  className,
}: MtverseDonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = size / 2 - 16;
  const center = size / 2;

  // Pre-compute cumulative offsets so we don't mutate during render
  const segmentsWithOffsets = data.reduce<
    Array<{ label: string; value: number; color: string; dash: number; offset: number }>
  >((acc, segment, idx) => {
    const dash = (segment.value / total) * 100;
    const offset = idx === 0 ? 0 : acc[idx - 1].offset + acc[idx - 1].dash;
    acc.push({ label: segment.label, value: segment.value, color: segment.color, dash, offset });
    return acc;
  }, []);

  return (
    <div className={cn('flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6', className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className="size-48 md:size-52" style={{ flexShrink: 0 }}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--surface-sunken)" strokeWidth="24" />
        {segmentsWithOffsets.map((segment) => (
          <circle
            key={segment.label}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={segment.color}
            strokeWidth="24"
            strokeDasharray={`${segment.dash} ${100 - segment.dash}`}
            strokeDashoffset={-segment.offset}
            strokeLinecap="butt"
            pathLength={100}
            transform={`rotate(-90 ${center} ${center})`}
          />
        ))}
        <text x={center} y={center - 4} textAnchor="middle" fontSize="24" fontWeight="800" fill="var(--text-strong)">
          {centerValue}
        </text>
        <text x={center} y={center + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-muted)">
          {centerLabel}
        </text>
      </svg>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:flex md:flex-col">
        {data.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between gap-2 rounded-xl bg-[var(--surface-sunken)] p-2.5"
          >
            <span className="flex items-center gap-2 text-xs font-medium text-[var(--text-strong)]">
              <span className="size-3 rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
            <span className="text-xs font-medium text-[var(--text-strong)]">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FunnelChart (mtverse style)                                         */
/* ------------------------------------------------------------------ */
export interface MtverseFunnelChartProps extends CardStyle {
  data: { label: string; value: number; pct: number; color?: string }[];
}

export function MtverseFunnelChart({ data, className }: MtverseFunnelChartProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {data.map((step, idx) => {
        const nextPct = idx < data.length - 1 ? data[idx + 1].pct : 0;
        const dropoff = idx < data.length - 1 ? step.pct - nextPct : 0;
        return (
          <div key={step.label} className="rounded-2xl bg-[var(--surface-sunken)] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text-strong)]">{step.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--text-strong)]">
                  {step.value.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-[var(--text-muted)]">· {step.pct}%</span>
              </div>
            </div>
            <div className="h-3 rounded-full bg-[var(--card)] dark:bg-white/10">
              <div
                className="h-3 rounded-full transition-[width] duration-500"
                style={{
                  width: `${Math.max(step.pct, 6)}%`,
                  backgroundColor: step.color ?? 'var(--color-brand-500)',
                }}
              />
            </div>
            {dropoff > 0 && (
              <p className="mt-1.5 text-[11px] font-medium text-[var(--text-subtle)]">
                Drop-off to next step: -{dropoff}pp
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CohortHeatmap (mtverse style)                                       */
/* ------------------------------------------------------------------ */
export interface MtverseCohortHeatmapProps extends CardStyle {
  rows: { label: string; values: (number | null)[] }[];
  columns: string[];
  color?: string;
}

export function MtverseCohortHeatmap({
  rows,
  columns,
  color = '70,95,255',
  className,
}: MtverseCohortHeatmapProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <div className="grid min-w-[640px] gap-2" style={{ gridTemplateColumns: `100px repeat(${columns.length}, 1fr)` }}>
        <span className="text-center text-[11px] font-bold uppercase text-[var(--text-subtle)]">Month</span>
        {columns.map((c) => (
          <span key={c} className="text-center text-[11px] font-bold uppercase text-[var(--text-subtle)]">
            {c}
          </span>
        ))}
        {rows.map((row) => (
          <React.Fragment key={row.label}>
            <span className="flex h-9 items-center text-xs font-medium text-[var(--text-body)]">
              {row.label}
            </span>
            {row.values.map((value, idx) => (
              <span
                key={`${row.label}-${idx}`}
                className="flex h-9 items-center justify-center rounded-lg text-xs font-medium text-white"
                style={{
                  backgroundColor:
                    value === null
                      ? 'var(--surface-sunken)'
                      : `rgba(${color}, ${Math.max(0.12, value / 100)})`,
                  color: value === null ? 'transparent' : value > 60 ? '#fff' : 'var(--text-strong)',
                }}
                title={value === null ? 'Upcoming' : `${value}%`}
              >
                {value === null ? '—' : `${value}%`}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RealtimePanel — micro bar charts in a grid                          */
/* ------------------------------------------------------------------ */
export interface MtverseRealtimePanelProps extends CardStyle {
  items: { label: string; value: number; trend: 'up' | 'down'; bars: number[] }[];
}

export function MtverseRealtimePanel({ items, className }: MtverseRealtimePanelProps) {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2 xl:grid-cols-5', className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-[var(--surface-sunken)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--text-muted)]">{item.label}</span>
            {item.trend === 'up' ? (
              <svg viewBox="0 0 24 24" className="size-4 text-[var(--color-success-500)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-4 text-[var(--color-error-500)]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </svg>
            )}
          </div>
          <p className="mt-3 text-2xl font-semibold text-[var(--text-strong)]">{item.value.toLocaleString()}</p>
          <div className="mt-3 flex h-10 items-end gap-1">
            {item.bars.map((value, idx) => (
              <span
                key={idx}
                className="flex-1 rounded-t transition-[height] duration-500"
                style={{
                  height: `${value}%`,
                  backgroundColor: item.trend === 'up' ? 'var(--color-brand-500)' : 'var(--color-error-500)',
                  opacity: 0.4 + (idx / item.bars.length) * 0.6,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HorizontalProgressList — for top pages / sources                   */
/* ------------------------------------------------------------------ */
export interface MtverseProgressListProps extends CardStyle {
  data: { label: string; value: number; subtitle?: string; color?: string }[];
  max?: number;
  valueFormatter?: (v: number) => string;
}

export function MtverseProgressList({
  data,
  max,
  valueFormatter = (v) => v.toLocaleString(),
  className,
}: MtverseProgressListProps) {
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
