'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

/**
 * Lazy-loaded ApexCharts wrapper.
 *
 * Why: apexcharts + react-apexcharts ship ~350KB of JS. Loading eagerly on
 * every dashboard destroys initial bundle size. This wrapper centralizes
 * the dynamic import so all dashboards share the same chunk.
 *
 * Usage (replaces per-file `dynamic(() => import('react-apexcharts'))`):
 *   import { LazyChart } from '@/components/dashboard/lazy-chart';
 *   <LazyChart options={...} series={...} type="bar" height={360} />
 *
 * Falls back to a height-matched skeleton (no CLS) while the chart chunk loads.
 */

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

export type LazyChartProps = {
  options: any;
  series: any;
  type: "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "heatmap" | "radar" | "treemap" | "candlestick";
  height?: number | string;
  width?: number | string;
  className?: string;
};

export function LazyChart(props: LazyChartProps) {
  const { className, height = 360, ...chartProps } = props;
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <Chart {...chartProps} height={height} />
    </div>
  );
}

/**
 * Skeleton shown while the chart chunk loads (~100ms on fast connection).
 * Matches the chart height to prevent CLS (Cumulative Layout Shift).
 */
function ChartSkeleton({ height = 360 }: { height?: number }) {
  return (
    <div
      className="flex w-full animate-pulse items-center justify-center rounded-xl bg-[var(--surface-sunken)]/50"
      style={{ height }}
      aria-label="Loading chart..."
      role="status"
    >
      <div className="flex flex-col items-center gap-3 text-[var(--text-muted)]">
        <svg className="size-8 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round" />
        </svg>
        <span className="text-xs font-medium">Loading chart...</span>
      </div>
    </div>
  );
}

export default LazyChart;
