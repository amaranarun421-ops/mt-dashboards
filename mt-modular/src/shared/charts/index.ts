/**
 * Charts — shared chart primitives barrel export.
 *
 * Pure-SVG components with no ApexCharts dependency — used for sparklines,
 * mini bar charts, and donut charts inside KPI cards.
 *
 * For full-size dashboards, use the lazy-loaded ApexCharts wrapper instead:
 *   import { LazyChart } from '@/components/dashboard/lazy-chart';
 */
export { Sparkline } from './sparkline';
export { MiniBarChart } from './mini-bar-chart';
export { DonutChart } from './donut-chart';
export type { DonutSegment } from './donut-chart';
