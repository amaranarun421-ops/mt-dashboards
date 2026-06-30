'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowUp, ArrowDown, ArrowRight, DollarSign, Package, Filter, ShoppingCart,
  CalendarDays, Download, Plus, RefreshCw, MoreHorizontal, Eye, Truck, AlertTriangle,
  Users, CreditCard, Star, Heart, Search, PackageCheck, RotateCcw, TrendingUp,
  Sparkles, Clock, MapPin, Globe, Smartphone, ChevronRight, ChevronDown, Check,
  Activity, AlertCircle, CheckCircle2, XCircle, Bell, FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageHeader, StatusBadge, UserAvatar } from '@/components/dashboard/primitives';
import { useToast } from '@/hooks/use-toast';
import * as Data from './ecommerce-data';
import { Popover, PopoverItem, CreateOrderDrawer, exportOrdersCsv, type NewOrder } from './ecommerce-interactions';

/* ApexCharts dynamic import (no SSR) */
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/* ============================================================
   Reusable mini chart primitives (pure SVG, no library deps)
   ============================================================ */

/* AnimatedSparkline — draws a line + area, animates on mount */
export function AnimatedSparkline({
  data,
  color = '#465FFF',
  height = 36,
  width = 120,
  fillOpacity = 0.18,
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  fillOpacity?: number;
}) {
  const id = React.useId();
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const toX = (i: number) => i * step;
  const toY = (v: number) => height - ((v - min) / range) * (height - 4) - 2;
  const points = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaPath = `M 0,${height} L ${points} L ${width},${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-${id})`}>
        <animate attributeName="opacity" from="0" to="1" dur="800ms" fill="freeze" />
      </path>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        pathLength={100} strokeDasharray="100" strokeDashoffset="100">
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="900ms" fill="freeze" begin="100ms" />
      </polyline>
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="2.5" fill={color}>
        <animate attributeName="r" values="2.5;4;2.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* MiniBarChart — small bar chart for KPI cards */
function MiniBarChart({ data, color = '#465FFF', height = 36, width = 120 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const max = Math.max(...data) || 1;
  const barWidth = data.length > 1 ? width / data.length - 2 : width;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {data.map((v, i) => {
        const h = (v / max) * (height - 4);
        const x = i * (barWidth + 2);
        const y = height - h;
        return (
          <rect key={i} x={x} y={y} width={barWidth} height={h} rx={1.5} fill={color} opacity={0.85}>
            <animate attributeName="height" from="0" to={h} dur="600ms" fill="freeze" begin={`${i * 50}ms`} />
            <animate attributeName="y" from={height} to={y} dur="600ms" fill="freeze" begin={`${i * 50}ms`} />
          </rect>
        );
      })}
    </svg>
  );
}

/* MiniFunnel — tiny funnel visual for conversion KPI */
function MiniFunnel({ data, height = 36, width = 120 }: { data: number[]; height?: number; width?: number }) {
  const max = data[0] || 1;
  const segH = height / data.length;
  const colors = ['#465FFF', '#0BA5EC', '#12B76A', '#F79009', '#7A5AF8'];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {data.map((v, i) => {
        const w = (v / max) * width;
        const x = (width - w) / 2;
        const y = i * segH;
        return (
          <rect key={i} x={x} y={y + 1} width={w} height={segH - 2} rx={1.5} fill={colors[i % colors.length]} opacity={0.9}>
            <animate attributeName="width" from="0" to={w} dur="600ms" fill="freeze" begin={`${i * 80}ms`} />
            <animate attributeName="x" from={width / 2} to={x} dur="600ms" fill="freeze" begin={`${i * 80}ms`} />
          </rect>
        );
      })}
    </svg>
  );
}

/* AnimatedProgress — horizontal bar that animates from 0 */
export function AnimatedProgress({ value, color = '#465FFF', delay = 0, height = 6 }: { value: number; color?: string; delay?: number; height?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]" style={{ height }}>
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${value}%`, background: color, animationDelay: `${delay}ms` }}
      />
    </div>
  );
}

/* ============================================================
   Page Header
   ============================================================ */
/* Date range presets */
const DATE_PRESETS = [
  { key: 'today', label: 'Today', range: 'Jun 23, 2026 – Jun 23, 2026' },
  { key: '7d', label: 'Last 7 days', range: 'Jun 17, 2026 – Jun 23, 2026' },
  { key: '30d', label: 'Last 30 days', range: 'May 24, 2026 – Jun 23, 2026' },
  { key: 'month', label: 'This month', range: 'Jun 01, 2026 – Jun 23, 2026' },
  { key: 'custom', label: 'Custom range', range: 'May 24, 2026 – Jun 23, 2026' },
];

function EcommerceHeader({ onCreateOrder, onOrderCreated }: { onCreateOrder: (order: NewOrder) => void; onOrderCreated: () => void }) {
  const { toast } = useToast();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState('30d');
  const [dateLabel, setDateLabel] = React.useState('May 24, 2026 – Jun 23, 2026');

  function handleCreateOrder(order: NewOrder) {
    onCreateOrder(order);
    onOrderCreated();
    toast({
      title: 'Order created',
      description: `${order.id} for ${order.customer} — ${order.amount}`,
    });
  }

  function handleExport(format: 'csv' | 'pdf' | 'xls') {
    setExportOpen(false);
    if (format === 'csv') {
      exportOrdersCsv(Data.orders);
      toast({ title: 'CSV exported', description: `${Data.orders.length} orders downloaded as CSV` });
    } else {
      toast({ title: `${format.toUpperCase()} export prepared`, description: `Your ${format.toUpperCase()} file is being generated.` });
    }
  }

  function handlePreset(key: string) {
    setSelectedPreset(key);
    const preset = DATE_PRESETS.find((p) => p.key === key);
    if (preset) setDateLabel(preset.range);
    setDateOpen(false);
    toast({ title: 'Date range updated', description: preset?.label });
  }

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span>Dashboards</span>
            <ChevronRight className="size-3 text-[var(--text-faint)]" />
            <span className="text-[var(--text-strong)]">Ecommerce</span>
          </nav>
          <h1 className="ds-page-title">Commerce Command Center</h1>
          <p className="mt-1.5 text-sm text-[var(--text-muted)]">
            Revenue, fulfillment, acquisition, and customer signals in one live workspace.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] px-2.5 py-1.5 dark:bg-[rgba(18,183,106,0.1)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" />
            </span>
            <span className="text-xs font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live data synced 2 min ago</span>
          </div>

          {/* Date range button + popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setDateOpen((p) => !p); setExportOpen(false); }}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
              aria-haspopup="dialog"
              aria-expanded={dateOpen}
            >
              <CalendarDays className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
              <span className="hidden sm:inline">{dateLabel}</span>
              <span className="sm:hidden">Date range</span>
              <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', dateOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={dateOpen} onClose={() => setDateOpen(false)} width={240}>
              <div className="px-2 py-1.5">
                <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Date range</p>
              </div>
              {DATE_PRESETS.map((p) => (
                <PopoverItem key={p.key} active={selectedPreset === p.key} onClick={() => handlePreset(p.key)}>
                  {p.label}
                </PopoverItem>
              ))}
              <div className="my-1 h-px bg-[var(--border-subtle)]" />
              <div className="px-2.5 py-2">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Selected</p>
                <p className="mt-0.5 text-xs text-[var(--text-body)]">{dateLabel}</p>
              </div>
            </Popover>
          </div>

          {/* Export button + dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setExportOpen((p) => !p); setDateOpen(false); }}
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
              aria-haspopup="menu"
              aria-expanded={exportOpen}
            >
              <Download className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
              Export
              <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', exportOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={exportOpen} onClose={() => setExportOpen(false)} width={180}>
              <div className="px-2 py-1.5">
                <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export format</p>
              </div>
              <PopoverItem icon={Download} onClick={() => handleExport('csv')}>Export CSV</PopoverItem>
              <PopoverItem icon={FileText} onClick={() => handleExport('pdf')}>Export PDF</PopoverItem>
              <PopoverItem icon={FileText} onClick={() => handleExport('xls')}>Export XLS</PopoverItem>
            </Popover>
          </div>

          {/* Create order — opens drawer */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"
          >
            <Plus className="size-4" strokeWidth={2.5} />
            Create order
          </button>
        </div>
      </div>

      {/* Create order drawer */}
      <CreateOrderDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreate={handleCreateOrder}
      />
    </>
  );
}

/* ============================================================
   KPI Cards — 4 unique designs
   ============================================================ */
function KpiCardNetRevenue() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--color-brand-300)] hover:shadow-lg dark:hover:border-[rgba(70,95,255,0.4)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
              <DollarSign className="size-5" strokeWidth={2} />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Net Revenue</span>
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--text-strong)]">{Data.netRevenueKpi.display}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
              <ArrowUp className="size-3" strokeWidth={2.5} />{Data.netRevenueKpi.change}
            </span>
            <span className="text-xs text-[var(--text-subtle)]">vs last period</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <AnimatedSparkline data={Data.netRevenueKpi.sparkline} color="#465FFF" height={36} width={110} />
        </div>
      </div>
      {/* Supporting details */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Gross</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">${(Data.netRevenueKpi.grossSales / 1000).toFixed(1)}K</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Refunds</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-body)]">${(Data.netRevenueKpi.refunds / 1000).toFixed(1)}K</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Discounts</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-body)]">${(Data.netRevenueKpi.discounts / 1000).toFixed(1)}K</p>
        </div>
      </div>
      {/* Hover reveal */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Profit margin</p>
              <p className="text-sm font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{Data.netRevenueKpi.profitMargin}%</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Avg daily</p>
              <p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">${(Data.netRevenueKpi.avgDailyRevenue / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCardOrders() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--color-success-300)] hover:shadow-lg dark:hover:border-[rgba(18,183,106,0.4)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
              <Package className="size-5" strokeWidth={2} />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Orders</span>
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--text-strong)]">{Data.ordersKpi.display}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
              <ArrowUp className="size-3" strokeWidth={2.5} />{Data.ordersKpi.change}
            </span>
            <span className="text-xs text-[var(--text-subtle)]">vs last period</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <MiniBarChart data={Data.ordersKpi.bars} color="#12B76A" height={36} width={110} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Paid</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{Data.ordersKpi.paid.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Failed</p>
          <p className="text-sm font-medium tabular-nums text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">{Data.ordersKpi.failed}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Pending</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-body)]">{Data.ordersKpi.pending}</p>
        </div>
      </div>
    </div>
  );
}

function KpiCardConversion() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--color-warning-300)] hover:shadow-lg dark:hover:border-[rgba(247,144,9,0.4)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
              <Filter className="size-5" strokeWidth={2} />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Conversion Funnel</span>
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--text-strong)]">{Data.conversionKpi.display}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
              <ArrowUp className="size-3" strokeWidth={2.5} />{Data.conversionKpi.change}
            </span>
            <span className="text-xs text-[var(--text-subtle)]">vs last period</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <MiniFunnel data={Data.conversionKpi.funnel} height={36} width={110} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Sessions</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{(Data.conversionKpi.sessions / 1000).toFixed(1)}K</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Checkout</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-body)]">{(Data.conversionKpi.checkoutStarted / 1000).toFixed(1)}K</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Purchased</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-body)]">{Data.conversionKpi.purchased.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function KpiCardCartRecovery() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:border-[var(--color-info-300)] hover:shadow-lg dark:hover:border-[rgba(11,165,236,0.4)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]">
              <ShoppingCart className="size-5" strokeWidth={2} />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Cart Recovery</span>
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--text-strong)]">{Data.cartRecoveryKpi.display}</p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
              <ArrowUp className="size-3" strokeWidth={2.5} />{Data.cartRecoveryKpi.change}
            </span>
            <span className="text-xs text-[var(--text-subtle)]">recoverable value</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <AnimatedSparkline data={Data.cartRecoveryKpi.line} color="#0BA5EC" height={36} width={110} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Active carts</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{Data.cartRecoveryKpi.activeCarts}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Idle 20m+</p>
          <p className="text-sm font-medium tabular-nums text-[var(--text-body)]">{Data.cartRecoveryKpi.idleOver20}</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Recovery</p>
          <p className="text-sm font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{Data.cartRecoveryKpi.recoveryRate}%</p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Revenue & Forecast chart card
   ============================================================ */
function RevenueForecastCard() {
  const [tab, setTab] = React.useState<'revenue' | 'orders' | 'margin'>('revenue');

  const series = React.useMemo(() => {
    if (tab === 'revenue') {
      return [
        { name: 'Net revenue', data: Data.revenueSeries.map(p => ({ x: p.date, y: p.net, isForecast: p.isForecast, campaign: p.campaign, orders: p.orders, gross: p.gross, refunds: p.refunds })) },
        { name: 'Gross sales', data: Data.revenueSeries.map(p => ({ x: p.date, y: p.gross, isForecast: p.isForecast, campaign: p.campaign, orders: p.orders, net: p.net, refunds: p.refunds })) },
        { name: 'Refunds', data: Data.revenueSeries.map(p => ({ x: p.date, y: p.refunds, isForecast: p.isForecast, campaign: p.campaign, orders: p.orders, net: p.net, gross: p.gross })) },
      ];
    }
    if (tab === 'orders') {
      return [
        { name: 'Orders', data: Data.revenueSeries.map(p => ({ x: p.date, y: p.orders, isForecast: p.isForecast, campaign: p.campaign, net: p.net, gross: p.gross, refunds: p.refunds })) },
      ];
    }
    // margin tab
    return [
      { name: 'Margin %', data: Data.revenueSeries.map(p => ({ x: p.date, y: Number(((1 - p.refunds / p.gross) * 100).toFixed(1)), isForecast: p.isForecast, campaign: p.campaign, orders: p.orders, net: p.net, gross: p.gross, refunds: p.refunds })) },
    ];
  }, [tab]);

  const options: any = {
    chart: {
      type: 'area',
      height: 380,
      fontFamily: 'Outfit, sans-serif',
      toolbar: { show: false },
      animations: {
        enabled: true,
        speed: 900,
        animateGradually: { enabled: true, delay: 80 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    colors: tab === 'revenue' ? ['#465FFF', '#12B76A', '#F04438'] : tab === 'orders' ? ['#465FFF'] : ['#7A5AF8'],
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: tab === 'revenue' ? [3, 2, 2] : [3],
      dashArray: 0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: tab === 'revenue' ? 0.32 : 0.4,
        opacityTo: 0.04,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: 'var(--border)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 8, bottom: 0, left: 8 },
    },
    xaxis: {
      type: 'category',
      categories: Data.revenueSeries.map(p => p.date),
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' },
        rotate: 0,
        trim: true,
        hideOverlappingLabels: true,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        stroke: { color: 'var(--color-brand-500)', width: 1, dashArray: 4 },
        fill: { type: 'solid', color: 'var(--color-brand-500)', opacity: 0.05 },
      },
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' },
        formatter: (v: number) => tab === 'margin' ? `${v}%` : tab === 'orders' ? `${v}` : `$${(v / 1000).toFixed(1)}K`,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 500,
      labels: { colors: 'var(--text-body)' },
      markers: { size: 6, strokeWidth: 0, offsetX: -4 },
      itemMargin: { horizontal: 12, vertical: 0 },
    },
    tooltip: {
      enabled: true,
      custom: ({ series: s, seriesIndex, dataPointIndex, w }: any) => {
        const p = Data.revenueSeries[dataPointIndex];
        const aov = p.orders > 0 ? (p.net / p.orders).toFixed(0) : '0';
        const conv = ((p.orders / Data.conversionKpi.sessions) * 100 * 30).toFixed(2);
        const campaignNote = p.campaign
          ? `<div style="display:flex;align-items:center;gap:6px;margin-top:6px;padding:4px 8px;border-radius:6px;background:rgba(70,95,255,0.12);color:#465FFF;font-size:10px;font-weight:500;">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              ${p.campaign}
            </div>`
          : '';
        const forecastBadge = p.isForecast
          ? '<span style="margin-left:6px;padding:1px 6px;border-radius:4px;background:rgba(247,144,9,0.15);color:#F79009;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">Forecast</span>'
          : '';
        return `
          <div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:220px;">
            <div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.date}${forecastBadge}</div>
            <div style="display:grid;grid-template-columns:1fr auto;gap:6px 16px;font-size:12px;">
              <span style="color:var(--text-body);">Net revenue</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">$${p.net.toLocaleString()}</span>
              <span style="color:var(--text-body);">Gross sales</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">$${p.gross.toLocaleString()}</span>
              <span style="color:var(--text-body);">Orders</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">${p.orders}</span>
              <span style="color:var(--text-body);">Conversion</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">${conv}%</span>
              <span style="color:var(--text-body);">Avg order value</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">$${aov}</span>
              <span style="color:var(--text-body);">Refunds</span><span style="color:#F04438;font-weight:600;font-variant-numeric:tabular-nums;">$${p.refunds.toLocaleString()}</span>
            </div>
            ${campaignNote}
          </div>
        `;
      },
    },
    markers: {
      size: 0,
      hover: { size: 6, sizeOffset: 3 },
      strokeColors: 'var(--card)',
      strokeWidth: 2,
    },
    annotations: {
      xaxis: Data.revenueSeries
        .filter(p => p.campaign)
        .map((p, i) => {
          const colors: Record<string, string> = { 'Summer Sale': '#12B76A', 'Email Blast': '#F79009', 'iPhone Launch': '#7A5AF8' };
          return {
            x: p.date,
            borderColor: colors[p.campaign!] || '#465FFF',
            label: {
              text: p.campaign,
              orientation: 'vertical',
              position: 'top',
              style: {
                background: colors[p.campaign!] || '#465FFF',
                color: '#fff',
                fontSize: '10px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                padding: { left: 6, right: 6, top: 3, bottom: 3 },
                borderRadius: 4,
              },
            },
          };
        }),
    },
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-medium text-[var(--text-strong)]">Revenue &amp; Forecast</h2>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">Daily net revenue, gross sales, and refunds with 7-day forecast and campaign annotations.</p>
        </div>
        {/* Segmented tabs */}
        <div className="inline-flex items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
          {([['revenue', 'Revenue'], ['orders', 'Orders'], ['margin', 'Margin']] as const).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              data-active={tab === k}
              className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-sm text-[var(--text-muted)] hover:text-[var(--text-strong)]"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {/* Summary badges */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-2.5 py-1 text-xs">
          <TrendingUp className="size-3 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" strokeWidth={2.5} />
          <span className="text-[var(--text-muted)]">Peak:</span>
          <span className="font-medium text-[var(--text-strong)]">Jun 13 $22.6K</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-2.5 py-1 text-xs">
          <DollarSign className="size-3 text-[var(--color-success-600)] dark:text-[var(--color-success-500)]" strokeWidth={2.5} />
          <span className="text-[var(--text-muted)]">Avg daily revenue:</span>
          <span className="font-medium text-[var(--text-strong)]">$9.4K</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-2.5 py-1 text-xs">
          <RotateCcw className="size-3 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" strokeWidth={2.5} />
          <span className="text-[var(--text-muted)]">Refund impact:</span>
          <span className="font-medium text-[var(--text-strong)]">4.5%</span>
        </span>
      </div>
      <Chart options={options} series={series} type="area" height={380} />
    </section>
  );
}

/* ============================================================
   Category Mix donut card
   ============================================================ */
function CategoryMixCard() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const total = Data.categories.reduce((s, c) => s + c.revenue, 0);
  const cx = 100, cy = 100, r = 70, strokeWidth = 22;
  const circumference = 2 * Math.PI * r;
  // Use reduce to compute cumulative offsets without mutating variables inside map
  const segments = Data.categories.reduce<Array<typeof Data.categories[number] & { len: number; offset: number; dashArray: string; index: number }>>(
    (acc, c, i) => {
      const len = (c.share / 100) * circumference;
      const prev = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].len : 0;
      acc.push({ ...c, len, offset: prev, dashArray: `${len} ${circumference - len}`, index: i });
      return acc;
    },
    [],
  );

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-medium text-[var(--text-strong)]">Category Mix</h2>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">Revenue distribution by product category with margin and return insights.</p>
      </div>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <div className="relative flex-shrink-0">
          <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth={strokeWidth} />
            {segments.map((seg) => (
              <circle
                key={seg.name}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={hovered === seg.index ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={seg.dashArray}
                strokeDashoffset={-seg.offset}
                style={{ transition: 'stroke-width 200ms ease', cursor: 'pointer' }}
                onMouseEnter={() => setHovered(seg.index)}
                onMouseLeave={() => setHovered(null)}
              >
                <animate attributeName="stroke-dashoffset" from={circumference} to={-seg.offset} dur="900ms" fill="freeze" begin={`${seg.index * 120}ms`} />
              </circle>
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Net revenue</span>
            <span className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">
              {hovered !== null ? Data.categories[hovered].display : '$284.9K'}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {hovered !== null ? `${Data.categories[hovered].share}% share` : 'this period'}
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {Data.categories.map((cat, i) => (
            <div
              key={cat.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn('flex items-center gap-3 rounded-lg border p-2.5 transition cursor-pointer', hovered === i ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]' : 'border-[var(--border-subtle)]')}
            >
              <span className="size-2.5 flex-shrink-0 rounded-full" style={{ background: cat.color }} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[var(--text-strong)]">{cat.name}</p>
                <p className="text-xs text-[var(--text-muted)]">Margin {cat.margin}% · Returns {cat.returnRate}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{cat.display}</p>
                <p className="text-xs text-[var(--text-muted)]">{cat.share}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer insight */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Top category: <span className="font-medium text-[var(--text-body)]">Electronics (42%)</span></span>
        <span className="text-[var(--text-muted)]">Avg margin: <span className="font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">41.3%</span></span>
      </div>
    </section>
  );
}

/* ============================================================
   Checkout Funnel card
   ============================================================ */
function CheckoutFunnelCard() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const max = Data.checkoutStages[0].count;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-medium text-[var(--text-strong)]">Checkout Funnel</h2>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">Conversion and drop-off across each stage from session to purchase.</p>
      </div>
      <div className="space-y-3">
        {Data.checkoutStages.map((stage, i) => {
          const prev = i === 0 ? stage.count : Data.checkoutStages[i - 1].count;
          const conv = i === 0 ? 100 : (stage.count / Data.checkoutStages[0].count) * 100;
          const stepConv = i === 0 ? 100 : (stage.count / prev) * 100;
          const dropOff = i === 0 ? 0 : 100 - stepConv;
          const isHighDropOff = dropOff > 50;
          const width = (stage.count / max) * 100;
          return (
            <div
              key={stage.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn('rounded-xl border p-3 transition', hovered === i ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]' : 'border-[var(--border-subtle)]')}
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="size-2 flex-shrink-0 rounded-full" style={{ background: stage.color }} />
                  <span className="text-sm font-medium text-[var(--text-strong)]">{stage.name}</span>
                  {isHighDropOff && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-[var(--color-warning-50)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
                      <AlertTriangle className="size-2.5" strokeWidth={2.5} />High drop-off
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-medium tabular-nums text-[var(--text-strong)]">{stage.count.toLocaleString()}</span>
                  <span className="tabular-nums text-[var(--text-muted)]">{conv.toFixed(1)}%</span>
                  {i > 0 && (
                    <span className={cn('tabular-nums', isHighDropOff ? 'font-medium text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]' : 'text-[var(--text-subtle)]')}>
                      −{dropOff.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              <AnimatedProgress value={width} color={stage.color} delay={i * 80} height={8} />
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--color-warning-200,rgba(247,144,9,0.3))] bg-[var(--color-warning-50)]/60 p-3 dark:bg-[rgba(247,144,9,0.08)]">
        <AlertCircle className="mt-0.5 size-4 flex-shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" strokeWidth={2.2} />
        <p className="text-xs text-[var(--color-warning-700)] dark:text-[var(--color-warning-500)]">{Data.funnelInsight} Consider improving product page imagery, adding trust badges, and reducing form friction at add-to-cart.</p>
      </div>
    </section>
  );
}

/* ============================================================
   Channel Performance card
   ============================================================ */
function ChannelPerformanceCard() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const maxRevenue = Math.max(...Data.channels.map(c => c.revenue));

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4">
        <h2 className="text-base font-medium text-[var(--text-strong)]">Channel Performance</h2>
        <p className="mt-0.5 text-xs text-[var(--text-muted)]">Acquisition channels ranked by revenue contribution with CAC and ROAS.</p>
      </div>
      <div className="space-y-2.5">
        {Data.channels.map((ch, i) => {
          const width = (ch.revenue / maxRevenue) * 100;
          return (
            <div
              key={ch.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn('rounded-xl border p-3 transition', hovered === i ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]' : 'border-[var(--border-subtle)]')}
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-xs font-medium tabular-nums text-[var(--text-subtle)]">#{i + 1}</span>
                  <span className="truncate text-sm font-medium text-[var(--text-strong)]">{ch.name}</span>
                  {ch.trend === 'up' && <ArrowUp className="size-3 flex-shrink-0 text-[var(--color-success-600)] dark:text-[var(--color-success-500)]" strokeWidth={2.5} />}
                  {ch.trend === 'down' && <ArrowDown className="size-3 flex-shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" strokeWidth={2.5} />}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-medium tabular-nums text-[var(--text-strong)]">${(ch.revenue / 1000).toFixed(1)}K</span>
                  <span className={cn('font-medium', ch.roas === 'Organic' || ch.roas === 'Direct' ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-muted)]')}>{ch.roas}</span>
                </div>
              </div>
              <div className="mb-2"><AnimatedProgress value={width} color={ch.color} delay={i * 60} height={6} /></div>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div>
                  <span className="text-[var(--text-subtle)]">Sessions</span>
                  <p className="font-medium tabular-nums text-[var(--text-body)]">{ch.sessions.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[var(--text-subtle)]">Conv.</span>
                  <p className="font-medium tabular-nums text-[var(--text-body)]">{ch.conversion}%</p>
                </div>
                <div>
                  <span className="text-[var(--text-subtle)]">CAC</span>
                  <p className="font-medium tabular-nums text-[var(--text-body)]">{ch.cac === 0 ? '—' : `$${ch.cac}`}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Footer insight */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Best ROAS: <span className="font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Email (14.8x)</span></span>
        <span className="text-[var(--text-muted)]">Total spend: <span className="font-medium tabular-nums text-[var(--text-strong)]">$48.2K</span></span>
      </div>
    </section>
  );
}

export { EcommerceHeader, KpiCardNetRevenue, KpiCardOrders, KpiCardConversion, KpiCardCartRecovery, RevenueForecastCard, CategoryMixCard, CheckoutFunnelCard, ChannelPerformanceCard };
