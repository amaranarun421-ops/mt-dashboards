'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  Activity, AlertCircle, ArrowDown, ArrowRight, ArrowUp, Bell,
  Briefcase, CalendarDays, CandlestickChart, ChevronDown,
  ChevronRight, Download, Eye, FileSpreadsheet, FileText, Filter, Gauge,
  Globe, Grid3x3, Info, Layers, Link2, MoreHorizontal, PieChart, Plus,
  Search, Shield, Star, TrendingDown, TrendingUp, Wallet, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from './analytics-interactions';
import * as Data from './stocks-data';
import type {
  AssetClass, CalendarEvent, Holding, PositionRow, TickerSymbol, WatchlistItem,
} from './stocks-data';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/* ============================================================
   Constants & helpers
   ============================================================ */
const ASSET_CLASS_LABEL: Record<AssetClass, string> = {
  equity: 'Equity',
  etf: 'ETF',
  crypto: 'Crypto',
  cash: 'Cash',
};

const ASSET_CLASS_TONE: Record<AssetClass, 'brand' | 'info' | 'warning' | 'neutral'> = {
  equity: 'brand',
  etf: 'info',
  crypto: 'warning',
  cash: 'neutral',
};

const CALENDAR_TYPE_META: Record<
  Data.CalendarEventType,
  { label: string; icon: React.ElementType; tone: 'brand' | 'success' | 'warning' | 'info' | 'neutral' }
> = {
  earnings: { label: 'Earnings', icon: CandlestickChart, tone: 'brand' },
  dividend: { label: 'Dividend', icon: Wallet, tone: 'success' },
  macro: { label: 'Macro', icon: Globe, tone: 'warning' },
  split: { label: 'Split', icon: Layers, tone: 'info' },
  'ex-div': { label: 'Ex-div', icon: CalendarDays, tone: 'neutral' },
};

function fmtCurrency(v: number, digits = 2) {
  return Data.formatCurrency(v, digits);
}
function fmtSigned(v: number, digits = 2) {
  return Data.formatSignedCurrency(v, digits);
}
function fmtSignedPct(v: number | null | undefined) {
  if (v == null) return '—';
  return Data.formatSignedPercent(v);
}
function fmtCompact(v: number) {
  return v.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: 1 });
}
function changeColor(v: number | null | undefined) {
  if (v == null) return 'var(--text-muted)';
  if (v > 0) return 'var(--color-success-600)';
  if (v < 0) return 'var(--color-error-600)';
  return 'var(--text-muted)';
}

/* ============================================================
   CardActionMenu — three-dot menu shared by all cards
   ============================================================ */
function CardActionMenu({ cardName }: { cardName: string }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  function handle(action: string) {
    setOpen(false);
    const map: Record<string, string> = {
      view: `Viewing ${cardName} details`,
      download: `${cardName} chart downloaded`,
      copy: `${cardName} report link copied to clipboard`,
    };
    toast({ title: map[action] || 'Action completed' });
  }
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
        aria-label={`Actions for ${cardName}`}
      >
        <MoreHorizontal className="size-4" strokeWidth={2.2} />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} align="right" width={180}>
        <div className="px-2 py-1.5">
          <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{cardName}</p>
        </div>
        <PopoverItem icon={Eye} onClick={() => handle('view')}>View details</PopoverItem>
        <PopoverItem icon={Download} onClick={() => handle('download')}>Download chart</PopoverItem>
        <PopoverItem icon={Link2} onClick={() => handle('copy')}>Copy report link</PopoverItem>
      </Popover>
    </div>
  );
}

/* ============================================================
   CardHeader — shared card header with title + action menu
   ============================================================ */
function CardHeader({
  icon: Icon, title, subtitle, accent = 'var(--color-brand-500)', cardName, right,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  accent?: string;
  cardName: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-4">
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 inline-flex size-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
        >
          <Icon className="size-4.5" strokeWidth={2.2} />
        </span>
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-[var(--text-strong)]">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-[var(--text-muted)]">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {right}
        <CardActionMenu cardName={cardName} />
      </div>
    </div>
  );
}

/* ============================================================
   Sparkline — animated mini line chart
   ============================================================ */
function Sparkline({
  data, color = 'var(--color-brand-500)', height = 28, width = 70, strokeWidth = 1.6,
}: { data: number[]; color?: string; height?: number; width?: number; strokeWidth?: number }) {
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
        <linearGradient id={`stk-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#stk-${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="100"
        style={{ animation: 'stkDrawLine 900ms ease-out forwards' }}
      />
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="2" fill={color} />
      <style>{`@keyframes stkDrawLine { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}

/* ============================================================
   Stocks Header — market selector, time range, export, add symbol
   ============================================================ */
function StocksHeader({
  timeRange, onTimeRangeChange, onAddSymbol,
}: {
  timeRange: string;
  onTimeRangeChange: (r: string) => void;
  onAddSymbol: () => void;
}) {
  const { toast } = useToast();
  const [marketOpen, setMarketOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [market, setMarket] = React.useState(Data.stocksHeader.defaultMarket);

  function handleExport(format: 'csv' | 'pdf' | 'xls') {
    setExportOpen(false);
    if (format === 'csv') {
      const headers = ['Symbol', 'Name', 'Asset Class', 'Sector', 'Shares', 'Avg Cost', 'Last', 'Market Value', 'Day P/L', 'Day P/L %', 'Total P/L', 'Total P/L %', 'Allocation %'];
      const rows = Data.positions.map((p) => [
        p.symbol, p.name, p.assetClass, p.sector,
        p.shares ?? '', p.avgCost ?? '', p.lastPrice ?? '',
        p.marketValue, p.dayPL, p.dayPLPct ?? '', p.totalPL, p.totalPLPct ?? '', p.allocation,
      ]);
      const csv = [headers, ...rows]
        .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
        .join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `stocks-positions-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: 'CSV exported', description: `${Data.positions.length} positions downloaded` });
    } else {
      toast({ title: `${format.toUpperCase()} export prepared`, description: `Your ${format.toUpperCase()} report is being generated.` });
    }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>Dashboards</span>
          <ChevronRight className="size-3 text-[var(--text-faint)]" />
          <span className="text-[var(--text-strong)]">{Data.stocksHeader.breadcrumb[1]}</span>
        </nav>
        <h1 className="ds-page-title">{Data.stocksHeader.title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-[var(--text-muted)]">{Data.stocksHeader.subtitle}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] px-2.5 py-1.5 dark:bg-[rgba(18,183,106,0.1)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" />
          </span>
          <span className="text-xs font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live · NYSE open</span>
        </div>
        {/* Market selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setMarketOpen((p) => !p); setExportOpen(false); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="dialog"
            aria-expanded={marketOpen}
          >
            <Globe className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{market}</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', marketOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={marketOpen} onClose={() => setMarketOpen(false)} width={200}>
            <div className="px-2 py-1.5">
              <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Market</p>
            </div>
            {Data.stocksHeader.markets.map((m) => (
              <PopoverItem key={m} active={market === m} onClick={() => { setMarket(m); setMarketOpen(false); toast({ title: 'Market switched', description: m }); }}>{m}</PopoverItem>
            ))}
          </Popover>
        </div>
        {/* Time range tabs */}
        <div className="inline-flex items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
          {Data.stocksHeader.timeRanges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onTimeRangeChange(r)}
              data-active={timeRange === r}
              className="cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-medium transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-sm text-[var(--text-muted)] hover:text-[var(--text-strong)]"
            >{r}</button>
          ))}
        </div>
        {/* Export */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setExportOpen((p) => !p); setMarketOpen(false); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="menu"
            aria-expanded={exportOpen}
          >
            <Download className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">Export</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', exportOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={exportOpen} onClose={() => setExportOpen(false)} align="right" width={180}>
            <div className="px-2 py-1.5">
              <p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export as</p>
            </div>
            <PopoverItem icon={Download} onClick={() => handleExport('csv')}>CSV (positions)</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('pdf')}>PDF report</PopoverItem>
            <PopoverItem icon={FileSpreadsheet} onClick={() => handleExport('xls')}>XLS workbook</PopoverItem>
          </Popover>
        </div>
        {/* Add symbol */}
        <button
          type="button"
          onClick={onAddSymbol}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-3.5 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"
        >
          <Plus className="size-4" strokeWidth={2.4} />
          <span className="hidden sm:inline">Add symbol</span>
        </button>
      </div>
    </div>
  );
}

// Pull these from lucide-react (added late to keep header block tidy)

/* ============================================================
   Ticker tape — horizontal scrolling strip
   ============================================================ */
function TickerTape({ onSymbol }: { onSymbol: (s: TickerSymbol) => void }) {
  const items = [...Data.tickerTape, ...Data.tickerTape];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--card)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--card)] to-transparent" />
      <div className="flex w-max gap-0 py-2.5" style={{ animation: 'stkTicker 60s linear infinite' }}>
        {items.map((t, i) => (
          <button
            key={`${t.symbol}-${i}`}
            type="button"
            onClick={() => onSymbol(t)}
            className="group flex cursor-pointer items-center gap-1.5 whitespace-nowrap border-r border-[var(--border-subtle)] px-2.5 py-1 transition hover:bg-[var(--surface-sunken)] sm:gap-2.5 sm:px-4"
            title={`${t.name} · ${fmtCurrency(t.price)}`}
          >
            <span className="text-xs font-semibold tracking-wide text-[var(--text-strong)]">{t.symbol}</span>
            <span className="text-xs font-medium text-[var(--text-body)]">{fmtCurrency(t.price)}</span>
            <span
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold"
              style={{ color: changeColor(t.changePct) }}
            >
              {t.changePct >= 0 ? <ArrowUp className="size-3" strokeWidth={2.6} /> : <ArrowDown className="size-3" strokeWidth={2.6} />}
              {Math.abs(t.changePct).toFixed(2)}%
            </span>
          </button>
        ))}
      </div>
      <style>{`@keyframes stkTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/* ============================================================
   Portfolio Hero — KPI row + performance chart
   ============================================================ */
function PortfolioHero({ timeRange }: { timeRange: string }) {
  const m = Data.portfolioMetrics;
  const kpis = [
    {
      label: 'Portfolio value', value: fmtCurrency(m.value, 2),
      sub: `Invested ${fmtCurrency(m.invested, 0)} · Cash ${fmtCurrency(m.cash, 0)}`,
      icon: Wallet, accent: 'var(--color-brand-500)',
      spark: Data.portfolioSeries.map((p) => p.portfolioValue),
    },
    {
      label: 'Today P/L', value: fmtSigned(m.todayPL, 2),
      sub: `${fmtSignedPct(m.todayPLPct)} vs ${m.benchmark} ${fmtSignedPct(m.benchmarkTodayPct)}`,
      icon: m.todayPL >= 0 ? TrendingUp : TrendingDown,
      accent: m.todayPL >= 0 ? 'var(--color-success-600)' : 'var(--color-error-600)',
      spark: Data.portfolioSeries.map((p) => p.dailyPL),
    },
    {
      label: '1Y return', value: `+${m.oneYReturn.toFixed(1)}%`,
      sub: `Unrealized ${fmtSigned(m.totalPL, 0)} (${fmtSignedPct(m.totalPLPct)})`,
      icon: ArrowUp, accent: 'var(--color-success-600)',
      spark: [180000, 186000, 192000, 199000, 205000, 209000, 212142],
    },
    {
      label: 'Max drawdown', value: `${m.drawdown.toFixed(1)}%`,
      sub: `VaR 95% ${m.riskLevel === 'Low' ? '-1.1%' : '-2.4%'} · Beta ${Data.riskMetrics.beta.toFixed(2)}`,
      icon: Shield, accent: 'var(--color-warning-600)',
      spark: [0, -1.2, -3.4, -5.8, -8.6, -6.1, -3.2],
    },
  ];

  // Apex charts options for hero
  const options: any = React.useMemo(() => ({
    chart: {
      type: 'area',
      height: 340,
      fontFamily: 'inherit',
      toolbar: { show: false },
      animations: { enabled: true, easing: 'easeinout', speed: 700, dynamicAnimation: { enabled: true, speed: 400 } },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [2.6, 2], dashArray: [0, 5] },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.32, opacityTo: 0, stops: [0, 90, 100] },
    },
    colors: ['var(--color-brand-500)', 'var(--text-subtle)'],
    grid: { borderColor: 'var(--border-subtle)', strokeDashArray: 4, padding: { left: 8, right: 8 } },
    series: [
      { name: 'Portfolio', data: Data.portfolioSeries.map((p) => ({ x: p.date, y: p.portfolioValue })) },
      { name: 'S&P 500 (benchmark)', data: Data.portfolioSeries.map((p) => ({ x: p.date, y: p.benchmark })) },
    ],
    xaxis: {
      type: 'category',
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: 'var(--text-muted)', fontSize: '11px' } },
      tooltip: { enabled: false },
    },
    yaxis: [
      {
        seriesName: 'Portfolio',
        labels: {
          formatter: (v: number) => '$' + fmtCompact(v),
          style: { colors: 'var(--text-muted)', fontSize: '11px' },
        },
      },
      {
        seriesName: 'S&P 500 (benchmark)',
        opposite: true,
        labels: {
          formatter: (v: number) => v.toFixed(0),
          style: { colors: 'var(--text-subtle)', fontSize: '11px' },
        },
      },
    ],
    annotations: {
      points: Data.portfolioSeries
        .filter((p) => p.event)
        .map((p) => ({
          x: p.date,
          y: p.portfolioValue,
          marker: { size: 5, fillColor: 'var(--color-brand-500)', strokeColor: '#fff', strokeWidth: 2, shape: 'circle' },
          label: {
            text: p.event,
            borderColor: 'var(--color-brand-500)',
            offsetY: -22,
            style: {
              background: 'var(--popover)',
              color: 'var(--text-strong)',
              fontSize: '10px',
              fontWeight: 600,
              padding: { left: 6, right: 6, top: 3, bottom: 3 },
            },
          },
        })),
    },
    tooltip: {
      enabled: true,
      custom(opts: any) {
        const idx = opts?.dataPointIndex ?? 0;
        const p = Data.portfolioSeries[idx];
        if (!p) return '';
        const ddColor = p.drawdown < 0 ? 'var(--color-error-600)' : 'var(--color-success-600)';
        const plColor = p.dailyPL >= 0 ? 'var(--color-success-600)' : 'var(--color-error-600)';
        return `
          <div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;min-width:220px;box-shadow:0 12px 24px -6px rgba(15,23,42,0.18);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span style="font-size:11px;color:var(--text-muted);font-weight:500;">${p.date} · ${timeRange}</span>
              ${p.event ? `<span style="font-size:10px;font-weight:600;color:var(--color-brand-600);background:color-mix(in srgb,var(--color-brand-500) 14%,transparent);padding:2px 6px;border-radius:6px;">${p.event}</span>` : ''}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;padding:3px 0;">
              <span style="font-size:11px;color:var(--text-muted);">Portfolio value</span>
              <span style="font-size:13px;font-weight:600;color:var(--text-strong);">${fmtCurrency(p.portfolioValue)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;padding:3px 0;">
              <span style="font-size:11px;color:var(--text-muted);">Daily P/L</span>
              <span style="font-size:13px;font-weight:600;color:${plColor};">${fmtSigned(p.dailyPL)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;padding:3px 0;">
              <span style="font-size:11px;color:var(--text-muted);">S&P 500</span>
              <span style="font-size:13px;font-weight:500;color:var(--text-body);">${p.benchmark.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:baseline;padding:3px 0;border-top:1px solid var(--border-subtle);margin-top:4px;padding-top:6px;">
              <span style="font-size:11px;color:var(--text-muted);">Drawdown</span>
              <span style="font-size:13px;font-weight:600;color:${ddColor};">${p.drawdown.toFixed(2)}%</span>
            </div>
          </div>`;
      },
    },
    legend: { show: false },
  }), [timeRange]);

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={TrendingUp}
        title="Portfolio Performance"
        subtitle={`Benchmarked vs ${m.benchmark} · ${timeRange} window · ${Data.portfolioSeries.length} data points`}
        cardName="Portfolio performance"
        right={
          <div className="hidden items-center gap-3 pr-1 md:flex">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-body)]">
              <span className="size-2 rounded-full bg-[var(--color-brand-500)]" /> Portfolio
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-muted)]">
              <span className="size-2 rounded-full bg-[var(--text-subtle)]" /> S&P 500
            </span>
          </div>
        }
      />
      <div className="grid grid-cols-2 gap-3 px-5 pt-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex size-7 items-center justify-center rounded-lg" style={{ backgroundColor: `color-mix(in srgb, ${k.accent} 14%, transparent)`, color: k.accent }}>
                <k.icon className="size-3.5" strokeWidth={2.4} />
              </span>
              <Sparkline data={k.spark} color={k.accent} width={52} height={20} />
            </div>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-[var(--text-muted)]">{k.label}</p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight text-[var(--text-strong)]">{k.value}</p>
            <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="px-2 pb-3 pt-1 sm:px-3">
        <Chart options={options} series={options.series} type="area" height={340} />
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-5 py-3">
        <p className="text-[11px] text-[var(--text-muted)]">
          <span className="font-medium text-[var(--text-body)]">Insight:</span> Portfolio outpaced the S&amp;P 500 by <span className="font-medium text-[var(--color-success-600)]">+0.07%</span> today, with a single-day gain of <span className="font-medium text-[var(--color-success-600)]">{fmtSigned(m.todayPL)}</span>.
        </p>
        <button type="button" className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)]">
          Full report <ArrowRight className="size-3" strokeWidth={2.4} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   Watchlist rail
   ============================================================ */
function WatchlistRail({ onSymbol }: { onSymbol: (s: WatchlistItem) => void }) {
  return (
    <section className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={Star}
        title="Watchlist"
        subtitle={`${Data.watchlist.length} symbols tracked across asset classes`}
        cardName="Watchlist"
        accent="var(--color-warning-600)"
      />
      <div className="max-h-[340px] flex-1 overflow-y-auto modern-scrollbar p-2">
        {Data.watchlist.map((w) => (
          <button
            key={w.symbol}
            type="button"
            onClick={() => onSymbol(w)}
            className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-left transition hover:bg-[var(--surface-sunken)]"
          >
            <span className="flex w-12 flex-col">
              <span className="text-xs font-semibold tracking-wide text-[var(--text-strong)]">{w.symbol}</span>
              <span className="text-[10px] uppercase text-[var(--text-subtle)]">{ASSET_CLASS_LABEL[w.assetClass]}</span>
            </span>
            <span className="flex-1 overflow-hidden">
              <span className="block truncate text-xs text-[var(--text-body)]">{w.name}</span>
              <span className="mt-0.5 block text-[10px] text-[var(--text-subtle)]">Vol {w.volumeLabel} · MCap {w.marketCapLabel}</span>
            </span>
            <Sparkline data={w.sparkline} color={changeColor(w.changePct)} width={48} height={22} />
            <span className="flex w-16 flex-col items-end">
              <span className="text-xs font-semibold text-[var(--text-strong)]">{fmtCurrency(w.price, w.price > 1000 ? 0 : 2)}</span>
              <span className="text-[11px] font-semibold" style={{ color: changeColor(w.changePct) }}>{fmtSignedPct(w.changePct)}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Risk Gauge — semicircle SVG gauge with 4 segments + needle
   ============================================================ */
function RiskGauge({ score, segments, level }: { score: number; segments: Data.RiskMetrics['gaugeSegments']; level: string }) {
  const W = 240;
  const H = 168;
  const cx = 120;
  const cy = 140;
  const r = 92;
  const sw = 14;
  const startA = 180;
  const totalA = 180;

  function pt(angleDeg: number, radius: number) {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  }
  function arcPath(a0: number, a1: number, radius: number) {
    const s = pt(a0, radius);
    const e = pt(a1, radius);
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
    const sweep = a1 > a0 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} ${sweep} ${e.x} ${e.y}`;
  }

  const scoreAngle = startA + (score / 100) * totalA;
  const needle = pt(scoreAngle, r - 16);
  const activeSeg = segments.find((s) => score >= s.from && score < s.to) || segments[segments.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Risk score ${score} out of 100, ${level}`}>
      {segments.map((seg) => {
        const a0 = startA + (seg.from / 100) * totalA;
        const a1 = startA + (seg.to / 100) * totalA;
        const isActive = seg.label === activeSeg.label;
        return (
          <path
            key={seg.label}
            d={arcPath(a0, a1, r)}
            stroke={seg.color}
            strokeWidth={isActive ? sw + 2 : sw}
            fill="none"
            opacity={isActive ? 1 : 0.32}
            strokeLinecap="butt"
            style={{ transition: 'all 300ms ease' }}
          />
        );
      })}
      {/* Tick labels */}
      {segments.map((seg) => {
        const mid = startA + ((seg.from + seg.to) / 2 / 100) * totalA;
        const p = pt(mid, r + 18);
        return (
          <text key={seg.label} x={p.x} y={p.y} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-muted)">
            {seg.label}
          </text>
        );
      })}
      {/* Needle */}
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke="var(--text-strong)" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'all 600ms cubic-bezier(0.32,0.72,0,1)' }} />
      <circle cx={cx} cy={cy} r="6" fill="var(--text-strong)" />
      <circle cx={cx} cy={cy} r="3" fill="var(--card)" />
      {/* Score readout */}
      <text x={cx} y={cy - 22} textAnchor="middle" fontSize="32" fontWeight="700" fill="var(--text-strong)" style={{ letterSpacing: '-0.02em' }}>
        {score}
      </text>
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10" fontWeight="600" fill={activeSeg.color} style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {level} risk
      </text>
    </svg>
  );
}

function RiskPanel() {
  const r = Data.riskMetrics;
  const stats = [
    { label: 'Beta', value: r.beta.toFixed(2), hint: 'vs S&P 500' },
    { label: 'Volatility', value: `${r.volatility.toFixed(1)}%`, hint: 'annualized' },
    { label: 'Sharpe', value: r.sharpe.toFixed(2), hint: 'risk-adj' },
    { label: 'VaR 95%', value: `${r.var95.toFixed(1)}%`, hint: '1-day' },
  ];
  return (
    <section className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={Gauge}
        title="Risk Gauge"
        subtitle="Composite portfolio risk score (0–100)"
        cardName="Risk gauge"
        accent="var(--color-warning-600)"
        right={<StatusBadge tone="warning">{r.level}</StatusBadge>}
      />
      <div className="px-5 pb-2 pt-3">
        <RiskGauge score={r.score} segments={r.gaugeSegments} level={r.level} />
      </div>
      <div className="grid grid-cols-4 gap-1 border-t border-[var(--border-subtle)] px-5 py-3">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-sm font-semibold text-[var(--text-strong)]">{s.value}</p>
            <p className="text-[10px] uppercase tracking-wide text-[var(--text-muted)]">{s.label}</p>
            <p className="text-[9px] text-[var(--text-subtle)]">{s.hint}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--border-subtle)] px-5 py-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Top risk contributors</p>
        <div className="max-h-32 space-y-1.5 overflow-y-auto modern-scrollbar">
          {r.contributors.slice(0, 4).map((c) => (
            <div key={c.label} className="flex items-center gap-2.5">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, Math.abs(c.contribution) * 3)}%`,
                    backgroundColor: c.contribution < 0 ? 'var(--color-success-500)' : 'var(--color-warning-500)',
                  }}
                />
              </div>
              <span className="w-24 shrink-0 truncate text-[11px] text-[var(--text-body)]" title={c.label}>{c.label}</span>
              <span className="w-8 shrink-0 text-right text-[11px] font-semibold" style={{ color: c.contribution < 0 ? 'var(--color-success-600)' : 'var(--color-warning-600)' }}>
                {c.contribution > 0 ? '+' : ''}{c.contribution}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Holdings Treemap — SVG squarify, tile size by value, color by Δ
   ============================================================ */
type TreemapTile = {
  symbol: string;
  name: string;
  marketValue: number;
  allocation: number;
  dayPLPct: number;
  sector: string;
  brandColor: string;
  shares: number | null;
  avgCost: number | null;
  lastPrice: number | null;
  dayPL: number;
  totalPL: number;
};
type TreemapRect = TreemapTile & { x: number; y: number; w: number; h: number };

function buildTreemap(items: TreemapTile[], x: number, y: number, w: number, h: number, gap = 4): TreemapRect[] {
  if (items.length === 0) return [];
  if (items.length === 1) return [{ ...items[0], x: x + gap / 2, y: y + gap / 2, w: w - gap, h: h - gap }];
  const total = items.reduce((s, i) => s + i.marketValue, 0);
  let cum = 0;
  let splitIdx = 1;
  for (let i = 0; i < items.length; i++) {
    if (cum + items[i].marketValue / total > 0.5 && i > 0) {
      splitIdx = i;
      break;
    }
    cum += items[i].marketValue / total;
    splitIdx = i + 1;
  }
  splitIdx = Math.max(1, Math.min(items.length - 1, splitIdx));
  const a = items.slice(0, splitIdx);
  const b = items.slice(splitIdx);
  const totalA = a.reduce((s, i) => s + i.marketValue, 0);
  const ratioA = totalA / total;
  if (w >= h) {
    const wA = w * ratioA;
    return [
      ...buildTreemap(a, x, y, wA, h, gap),
      ...buildTreemap(b, x + wA, y, w - wA, h, gap),
    ];
  }
  const hA = h * ratioA;
  return [
    ...buildTreemap(a, x, y, w, hA, gap),
    ...buildTreemap(b, x, y + hA, w, h - hA, gap),
  ];
}

function HoldingsTreemap({ onTile }: { onTile: (t: TreemapTile) => void }) {
  const tiles = React.useMemo(() => buildTreemap(Data.holdingsTreemap as TreemapTile[], 0, 0, 800, 360), []);
  const W = 800;
  const H = 360;
  function tileColor(dayPLPct: number) {
    if (dayPLPct === 0) return '#475467';
    if (dayPLPct > 2) return '#067647';
    if (dayPLPct > 0) return '#12B76A';
    if (dayPLPct > -2) return '#F04438';
    return '#C01048';
  }
  function tileOpacity(dayPLPct: number) {
    const a = Math.min(0.85, 0.42 + Math.abs(dayPLPct) * 0.12);
    return a;
  }
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={Layers}
        title="Holdings Treemap"
        subtitle="Tile size = market value · color intensity = daily change"
        cardName="Holdings treemap"
        accent="var(--color-info-500)"
        right={
          <div className="hidden items-center gap-3 pr-1 text-[10px] font-medium text-[var(--text-muted)] sm:flex">
            <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm" style={{ background: '#F04438' }} />Down</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm" style={{ background: '#475467' }} />Flat</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm" style={{ background: '#12B76A' }} />Up</span>
          </div>
        }
      />
      <div className="p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ animation: 'stkFadeIn 500ms ease-out' }}>
          {tiles.map((t, i) => {
            const color = tileColor(t.dayPLPct);
            const op = tileOpacity(t.dayPLPct);
            const showLabel = t.w > 80 && t.h > 50;
            const showMeta = t.w > 110 && t.h > 80;
            return (
              <g
                key={t.symbol}
                onClick={() => onTile(t)}
                className="cursor-pointer"
                style={{ animation: `stkTileIn 500ms ease-out ${i * 40}ms both` }}
              >
                <rect
                  x={t.x}
                  y={t.y}
                  width={t.w}
                  height={t.h}
                  rx="6"
                  fill={color}
                  fillOpacity={op}
                  stroke="var(--card)"
                  strokeWidth="2"
                  className="transition-[fill-opacity] duration-300 hover:fill-opacity-100"
                />
                {showLabel && (
                  <text x={t.x + 10} y={t.y + 22} fontSize="14" fontWeight="700" fill="#fff" style={{ pointerEvents: 'none' }}>
                    {t.symbol}
                  </text>
                )}
                {showMeta && (
                  <>
                    <text x={t.x + 10} y={t.y + 40} fontSize="10" fontWeight="500" fill="rgba(255,255,255,0.85)" style={{ pointerEvents: 'none' }}>
                      {fmtCompact(t.marketValue)}
                    </text>
                    <text x={t.x + 10} y={t.y + 56} fontSize="11" fontWeight="700" fill="#fff" style={{ pointerEvents: 'none' }}>
                      {t.dayPLPct === 0 ? 'CASH' : `${t.dayPLPct > 0 ? '+' : ''}${t.dayPLPct.toFixed(1)}%`}
                    </text>
                    <text x={t.x + 10} y={t.y + 70} fontSize="9" fontWeight="500" fill="rgba(255,255,255,0.7)" style={{ pointerEvents: 'none' }}>
                      {t.allocation.toFixed(1)}% alloc
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
        <style>{`@keyframes stkTileIn { from { opacity: 0; transform: scale(0.92); transform-origin: center; } to { opacity: 1; transform: scale(1); } } @keyframes stkFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-5 py-3">
        <p className="text-[11px] text-[var(--text-muted)]">
          <span className="font-medium text-[var(--text-body)]">Insight:</span> Top-3 holdings (NVDA · AAPL · MSFT) drive <span className="font-medium text-[var(--color-warning-600)]">{Data.riskMetrics.concentrationTop3}%</span> of risk concentration.
        </p>
        <button type="button" className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)]">
          Rebalance <ArrowRight className="size-3" strokeWidth={2.4} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   Sector Heatmap — 8-cell grid with allocation / change / contribution
   ============================================================ */
function SectorHeatmap() {
  const [hover, setHover] = React.useState<number | null>(null);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={PieChart}
        title="Sector Heatmap"
        subtitle="Portfolio-weighted daily sector return"
        cardName="Sector heatmap"
        accent="var(--color-success-600)"
      />
      <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4">
        {Data.sectors.map((s, i) => {
          const held = s.isHeld;
          const baseColor = s.dailyChange > 0.5 ? '#067647' : s.dailyChange > 0 ? '#12B76A' : s.dailyChange > -0.5 ? '#F79009' : '#F04438';
          const opacity = held ? Math.min(0.92, 0.45 + Math.abs(s.dailyChange) * 0.22) : 0.16;
          return (
            <div
              key={s.name}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative aspect-[5/4] cursor-default overflow-hidden rounded-xl border border-[var(--border-subtle)] p-3 transition"
              style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${baseColor} ${Math.round(opacity * 100)}% transparent), color-mix(in srgb, ${baseColor} ${Math.round(opacity * 60)}% transparent))` }}
            >
              <p className="text-[11px] font-semibold leading-tight text-[var(--text-strong)]">{s.name}</p>
              <p className="mt-1 text-[10px] text-[var(--text-muted)]">{held ? `${s.allocation.toFixed(1)}% alloc` : 'No position'}</p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-base font-bold" style={{ color: s.dailyChange >= 0 ? '#067647' : '#C01048' }}>
                  {s.dailyChange > 0 ? '+' : ''}{s.dailyChange.toFixed(2)}%
                </span>
                {held && (
                  <span className="text-[10px] font-medium text-[var(--text-body)]">
                    {fmtSigned(s.dayPL, 0)}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">
                Contrib <span className="font-medium" style={{ color: s.contribution >= 0 ? 'var(--color-success-600)' : 'var(--color-error-600)' }}>{s.contribution > 0 ? '+' : ''}{s.contribution.toFixed(2)}%</span>
              </p>

              {/* Hover tooltip with top holdings */}
              {hover === i && (
                <div className="absolute inset-x-2 bottom-2 z-10 rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2 shadow-lg" style={{ animation: 'ecomPopoverIn 140ms ease-out' }}>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-subtle)]">Top holdings</p>
                  {held && s.topHoldings.length > 0 ? (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {s.topHoldings.map((sym) => (
                        <span key={sym} className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--text-body)]">{sym}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-1 text-[10px] text-[var(--text-muted)]">No positions in this sector.</p>
                  )}
                  <p className="mt-1.5 text-[10px] text-[var(--text-muted)]">Market: <span className="font-medium" style={{ color: s.marketDailyChange >= 0 ? 'var(--color-success-600)' : 'var(--color-error-600)' }}>{s.marketDailyChange > 0 ? '+' : ''}{s.marketDailyChange.toFixed(2)}%</span></p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-5 py-3">
        <p className="text-[11px] text-[var(--text-muted)]">
          <span className="font-medium text-[var(--text-body)]">Insight:</span> Technology drove <span className="font-medium text-[var(--color-success-600)]">+0.97%</span> of today's portfolio return.
        </p>
        <button type="button" className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)]">
          Diversify <ArrowRight className="size-3" strokeWidth={2.4} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   Market Movers — tabbed gainers/losers with sparklines
   ============================================================ */
function MarketMovers({ onSymbol }: { onSymbol: (sym: string, price: number, changePct: number, name: string) => void }) {
  const [tab, setTab] = React.useState<'gainers' | 'losers'>('gainers');
  const list = Data.marketMovers[tab];
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={Activity}
        title="Market Movers"
        subtitle="Top daily gainers and losers"
        cardName="Market movers"
        accent="var(--color-brand-500)"
        right={
          <div className="inline-flex items-center gap-0.5 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] p-0.5">
            <button type="button" onClick={() => setTab('gainers')} data-active={tab === 'gainers'} className="inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--color-success-600)] data-[active=true]:shadow-sm text-[var(--text-muted)]">
              <TrendingUp className="size-3" strokeWidth={2.4} /> Gainers
            </button>
            <button type="button" onClick={() => setTab('losers')} data-active={tab === 'losers'} className="inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--color-error-600)] data-[active=true]:shadow-sm text-[var(--text-muted)]">
              <TrendingDown className="size-3" strokeWidth={2.4} /> Losers
            </button>
          </div>
        }
      />
      <div className="divide-y divide-[var(--border-subtle)]">
        {list.map((m) => (
          <button
            key={m.symbol}
            type="button"
            onClick={() => onSymbol(m.symbol, m.price, m.changePct, m.name)}
            className="group flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left transition hover:bg-[var(--surface-sunken)]"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-lg text-[11px] font-bold text-white" style={{ backgroundColor: m.brandColor }}>
              {m.symbol.slice(0, 2)}
            </span>
            <span className="flex-1 overflow-hidden">
              <span className="block text-sm font-semibold text-[var(--text-strong)]">{m.symbol}</span>
              <span className="block truncate text-[11px] text-[var(--text-muted)]">{m.name}</span>
            </span>
            <Sparkline data={m.sparkline} color={changeColor(m.changePct)} width={70} height={26} />
            <span className="flex w-20 flex-col items-end">
              <span className="text-sm font-semibold text-[var(--text-strong)]">{fmtCurrency(m.price, m.price > 1000 ? 0 : 2)}</span>
              <span className="text-[11px] font-semibold" style={{ color: changeColor(m.changePct) }}>
                {m.changePct > 0 ? '+' : ''}{m.changePct.toFixed(2)}%
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-5 py-3">
        <p className="text-[11px] text-[var(--text-muted)]">
          <span className="font-medium text-[var(--text-body)]">Insight:</span> {tab === 'gainers' ? 'Semis & mega-cap tech leading the tape.' : 'High-beta consumer names lagging on rate-hike repricing.'}
        </p>
        <button type="button" className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)]">
          Screener <ArrowRight className="size-3" strokeWidth={2.4} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   Correlation Matrix — 6×6 grid with color intensity + hover insight
   ============================================================ */
function CorrelationMatrix() {
  const [hover, setHover] = React.useState<{ r: number; c: number } | null>(null);
  const symbols = Data.correlationMatrix.symbols;
  function cellColor(v: number) {
    if (v >= 1) return '#0E5C3A';
    if (v >= 0.75) return '#12B76A';
    if (v >= 0.5) return '#5BB98C';
    if (v >= 0.3) return '#9CCBB5';
    if (v >= 0) return 'rgba(15,23,42,0.06)';
    return '#F04438';
  }
  function cellText(v: number) {
    return v >= 0.5 || v <= -0.3 ? '#fff' : 'var(--text-body)';
  }
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={Grid3x3}
        title="Correlation Matrix"
        subtitle="60-day correlation of top holdings"
        cardName="Correlation matrix"
        accent="var(--color-info-500)"
        right={<StatusBadge tone="info">60D</StatusBadge>}
      />
      <div className="p-5">
        <div className="flex">
          <div className="flex w-6 flex-col justify-around pb-6 pt-0.5">
            {symbols.map((s) => (
              <span key={s} className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: 38 }}>{s}</span>
            ))}
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-6 gap-1">
              {Data.correlationMatrix.cells.map((row, ri) =>
                row.map((cell, ci) => {
                  const isDiag = ri === ci;
                  return (
                    <div
                      key={`${ri}-${ci}`}
                      onMouseEnter={() => setHover({ r: ri, c: ci })}
                      onMouseLeave={() => setHover(null)}
                      className="relative flex aspect-square items-center justify-center rounded-md text-[11px] font-semibold transition hover:scale-105 hover:shadow-md"
                      style={{ backgroundColor: cellColor(cell.value), color: cellText(cell.value), cursor: isDiag ? 'default' : 'help' }}
                      title={`${cell.row} · ${cell.col} = ${cell.value.toFixed(2)}`}
                    >
                      {cell.value.toFixed(2)}
                      {hover && hover.r === ri && hover.c === ci && !isDiag && (
                        <div className="absolute bottom-full left-1/2 z-20 mb-2 w-44 -translate-x-1/2 rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2 text-[10px] font-normal shadow-lg" style={{ color: 'var(--text-body)', animation: 'ecomPopoverIn 140ms ease-out' }}>
                          <p className="font-semibold text-[var(--text-strong)]">{cell.row} ↔ {cell.col}</p>
                          <p className="mt-1 leading-relaxed text-[var(--text-muted)]">{cell.insight}</p>
                        </div>
                      )}
                    </div>
                  );
                }),
              )}
            </div>
            <div className="mt-2 grid grid-cols-6 gap-1">
              {symbols.map((s) => (
                <span key={s} className="text-center text-[10px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-[var(--surface-sunken)] px-3 py-2">
          <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-subtle)]">Scale</span>
          <div className="flex flex-1 items-center gap-1">
            <span className="text-[10px] text-[var(--text-muted)]">0.0</span>
            <div className="h-2 flex-1 rounded-full" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.06), #9CCBB5, #12B76A, #0E5C3A)' }} />
            <span className="text-[10px] text-[var(--text-muted)]">1.0</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pull Grid3x3 from lucide-react

/* ============================================================
   Dividend & Events Calendar — horizontal timeline
   ============================================================ */
function EventsCalendar() {
  const [open, setOpen] = React.useState<string | null>(null);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={CalendarDays}
        title="Dividend & Events Calendar"
        subtitle="Upcoming earnings, dividends & macro events"
        cardName="Events calendar"
        accent="var(--color-warning-600)"
        right={<StatusBadge tone="neutral">Next 90 days</StatusBadge>}
      />
      <div className="overflow-x-auto p-5">
        <div className="relative min-w-[640px]">
          {/* Timeline rail */}
          <div className="absolute left-0 right-0 top-[60px] h-0.5 bg-[var(--border-subtle)]" />
          <div className="grid" style={{ gridTemplateColumns: `repeat(${Data.calendarEvents.length}, minmax(0, 1fr))` }}>
            {Data.calendarEvents.map((ev) => {
              const meta = CALENDAR_TYPE_META[ev.type];
              const Icon = meta.icon;
              const impactTone = ev.impact === 'high' ? 'error' : ev.impact === 'medium' ? 'warning' : 'neutral';
              return (
                <div key={ev.id} className="relative flex flex-col items-center px-1.5">
                  <div className="flex h-12 items-end">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">{ev.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold leading-none text-[var(--text-strong)]">{ev.date.split(' ')[1]}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpen(open === ev.id ? null : ev.id)}
                      className="relative z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-[var(--card)] shadow-md transition hover:scale-110"
                      style={{ backgroundColor: `var(--color-${meta.tone === 'brand' ? 'brand' : meta.tone === 'success' ? 'success' : meta.tone === 'warning' ? 'warning' : meta.tone === 'info' ? 'info' : 'text-muted'}-500, ${meta.tone === 'neutral' ? '#94A3B8' : 'transparent'})` }}
                      aria-label={ev.title}
                    >
                      <Icon className="size-4" strokeWidth={2.2} style={{ color: '#fff' }} />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-col items-center gap-1 text-center">
                    <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
                    <p className="text-[11px] font-medium leading-tight text-[var(--text-strong)]">{ev.title}</p>
                    <StatusBadge tone={impactTone}>{ev.impact} impact</StatusBadge>
                    <p className="text-[10px] text-[var(--text-subtle)]">{ev.eta}</p>
                  </div>
                  {/* Popover detail */}
                  {open === ev.id && (
                    <div className="absolute left-1/2 top-full z-30 mt-2 w-60 -translate-x-1/2 rounded-xl border border-[var(--border)] bg-[var(--popover)] p-3 shadow-xl" style={{ animation: 'ecomPopoverIn 160ms ease-out' }}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-strong)]">{ev.title}</span>
                        <button type="button" onClick={() => setOpen(null)} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-strong)]" aria-label="Close">
                          <X className="size-3.5" strokeWidth={2.4} />
                        </button>
                      </div>
                      <p className="text-[11px] leading-relaxed text-[var(--text-body)]">{ev.detail}</p>
                      <div className="mt-2 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2 text-[10px] text-[var(--text-muted)]">
                        <span>{ev.date} · {ev.eta}</span>
                        {ev.symbol && <span className="font-semibold text-[var(--text-body)]">{ev.symbol}</span>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-5 py-3">
        <p className="text-[11px] text-[var(--text-muted)]">
          <span className="font-medium text-[var(--text-body)]">Insight:</span> NVDA earnings (Aug 12) is the largest single-name risk event for this portfolio.
        </p>
        <button type="button" className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)]">
          Subscribe <Bell className="size-3" strokeWidth={2.4} />
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   Positions table — search + filters + pagination + actions
   ============================================================ */
const ASSET_FILTERS = ['All', 'Equity', 'ETF', 'Crypto', 'Cash'] as const;
const SECTOR_FILTERS = ['All', 'Technology', 'Communication Services', 'Consumer Discretionary', 'Cash'] as const;
const PAGE_SIZE = 5;

function PositionsTable({ onRow }: { onRow: (p: PositionRow) => void }) {
  const { toast } = useToast();
  const [query, setQuery] = React.useState('');
  const [assetF, setAssetF] = React.useState<(typeof ASSET_FILTERS)[number]>('All');
  const [sectorF, setSectorF] = React.useState<(typeof SECTOR_FILTERS)[number]>('All');
  const [page, setPage] = React.useState(0);
  const [assetOpen, setAssetOpen] = React.useState(false);
  const [sectorOpen, setSectorOpen] = React.useState(false);
  const [rowMenu, setRowMenu] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    return Data.positions.filter((p) => {
      if (assetF !== 'All') {
        const want = assetF.toLowerCase();
        if (p.assetClass !== want) return false;
      }
      if (sectorF !== 'All') {
        if (sectorF === 'Cash' && !p.isCash) return false;
        if (sectorF !== 'Cash' && p.sector !== sectorF) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!p.symbol.toLowerCase().includes(q) && !p.name.toLowerCase().includes(q) && !p.sector.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [query, assetF, sectorF]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const rows = filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  function handleRowAction(action: string, p: PositionRow) {
    setRowMenu(null);
    const map: Record<string, string> = {
      view: `Opening ${p.symbol} details`,
      buy: `Buy more ${p.symbol} — order ticket opened`,
      sell: `Sell ${p.symbol} — order ticket opened`,
      alert: `Price alert created for ${p.symbol}`,
      copy: `${p.symbol} summary copied`,
    };
    toast({ title: map[action] || 'Action completed' });
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_24px_-12px_rgba(15,23,42,0.12)]">
      <CardHeader
        icon={Briefcase}
        title="Positions"
        subtitle={`${Data.positions.length} positions · ${fmtCurrency(Data.portfolioMetrics.invested + Data.portfolioMetrics.cash, 0)} total`}
        cardName="Positions"
        accent="var(--color-brand-500)"
      />
      <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(0); }}
            placeholder="Search symbol, name, sector…"
            className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => { setAssetOpen((p) => !p); setSectorOpen(false); setRowMenu(null); }}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]"
            >
              <Filter className="size-3.5 text-[var(--text-muted)]" strokeWidth={2.2} />
              {assetF === 'All' ? 'Asset type' : assetF}
              <ChevronDown className={cn('size-3 text-[var(--text-muted)] transition-transform', assetOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={assetOpen} onClose={() => setAssetOpen(false)} align="right" width={160}>
              {ASSET_FILTERS.map((a) => (
                <PopoverItem key={a} active={assetF === a} onClick={() => { setAssetF(a); setAssetOpen(false); setPage(0); toast({ title: 'Asset filter applied', description: a }); }}>{a}</PopoverItem>
              ))}
            </Popover>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => { setSectorOpen((p) => !p); setAssetOpen(false); setRowMenu(null); }}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]"
            >
              <PieChart className="size-3.5 text-[var(--text-muted)]" strokeWidth={2.2} />
              {sectorF === 'All' ? 'Sector' : sectorF}
              <ChevronDown className={cn('size-3 text-[var(--text-muted)] transition-transform', sectorOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={sectorOpen} onClose={() => setSectorOpen(false)} align="right" width={200}>
              {SECTOR_FILTERS.map((s) => (
                <PopoverItem key={s} active={sectorF === s} onClick={() => { setSectorF(s); setSectorOpen(false); setPage(0); toast({ title: 'Sector filter applied', description: s }); }}>{s}</PopoverItem>
              ))}
            </Popover>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">
              <th className="px-5 py-2.5 text-left font-medium">Symbol</th>
              <th className="px-3 py-2.5 text-left font-medium">Sector</th>
              <th className="px-3 py-2.5 text-right font-medium">Shares</th>
              <th className="px-3 py-2.5 text-right font-medium">Avg cost</th>
              <th className="px-3 py-2.5 text-right font-medium">Last</th>
              <th className="px-3 py-2.5 text-right font-medium">Market value</th>
              <th className="px-3 py-2.5 text-right font-medium">Day P/L</th>
              <th className="px-3 py-2.5 text-right font-medium">Total P/L</th>
              <th className="px-3 py-2.5 text-left font-medium">30D trend</th>
              <th className="px-5 py-2.5 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr
                key={p.id}
                onClick={() => onRow(p)}
                className="group cursor-pointer border-b border-[var(--border-subtle)] text-sm transition last:border-0 hover:bg-[var(--surface-sunken)]"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--surface-sunken)] text-[10px] font-bold text-[var(--text-strong)] group-hover:bg-[var(--card)]">
                      {p.symbol.slice(0, 2)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-strong)]">{p.symbol}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{p.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  {p.isCash ? (
                    <span className="text-xs text-[var(--text-muted)]">—</span>
                  ) : (
                    <StatusBadge tone={ASSET_CLASS_TONE[p.assetClass]}>{p.sector}</StatusBadge>
                  )}
                </td>
                <td className="px-3 py-3 text-right text-xs font-medium text-[var(--text-body)]">{p.shares ?? '—'}</td>
                <td className="px-3 py-3 text-right text-xs text-[var(--text-body)]">{p.avgCost != null ? fmtCurrency(p.avgCost) : '—'}</td>
                <td className="px-3 py-3 text-right text-xs text-[var(--text-body)]">{p.lastPrice != null ? fmtCurrency(p.lastPrice) : '—'}</td>
                <td className="px-3 py-3 text-right text-sm font-semibold text-[var(--text-strong)]">{fmtCurrency(p.marketValue, 0)}</td>
                <td className="px-3 py-3 text-right">
                  <span className="text-xs font-semibold" style={{ color: changeColor(p.dayPLPct) }}>
                    {fmtSigned(p.dayPL, 0)}
                    {p.dayPLPct != null && <span className="ml-1 text-[10px]">({fmtSignedPct(p.dayPLPct)})</span>}
                  </span>
                </td>
                <td className="px-3 py-3 text-right">
                  <span className="text-xs font-semibold" style={{ color: changeColor(p.totalPLPct) }}>
                    {fmtSigned(p.totalPL, 0)}
                    {p.totalPLPct != null && <span className="ml-1 text-[10px]">({fmtSignedPct(p.totalPLPct)})</span>}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <Sparkline data={p.sparkline} color={changeColor(p.dayPLPct ?? 0)} width={60} height={22} />
                    <div className="w-12">
                      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                        <div className="h-full rounded-full bg-[var(--color-brand-500)]" style={{ width: `${Math.min(100, p.allocation * 3)}%` }} />
                      </div>
                      <p className="mt-0.5 text-[9px] text-[var(--text-subtle)]">{p.allocation.toFixed(1)}%</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={() => setRowMenu(rowMenu === p.id ? null : p.id)}
                      className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                      aria-label={`Actions for ${p.symbol}`}
                    >
                      <MoreHorizontal className="size-4" strokeWidth={2.2} />
                    </button>
                    <Popover open={rowMenu === p.id} onClose={() => setRowMenu(null)} align="right" width={180}>
                      <PopoverItem icon={Eye} onClick={() => handleRowAction('view', p)}>View details</PopoverItem>
                      <PopoverItem icon={ArrowUp} onClick={() => handleRowAction('buy', p)}>Buy more</PopoverItem>
                      <PopoverItem icon={ArrowDown} onClick={() => handleRowAction('sell', p)}>Sell position</PopoverItem>
                      <PopoverItem icon={Bell} onClick={() => handleRowAction('alert', p)}>Set price alert</PopoverItem>
                      <PopoverItem icon={Link2} onClick={() => handleRowAction('copy', p)}>Copy summary</PopoverItem>
                    </Popover>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-5 py-12 text-center text-sm text-[var(--text-muted)]">
                  No positions match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 border-t border-[var(--border-subtle)] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-[var(--text-muted)]">
          Showing <span className="font-medium text-[var(--text-body)]">{filtered.length === 0 ? 0 : safePage * PAGE_SIZE + 1}–{Math.min(filtered.length, safePage * PAGE_SIZE + PAGE_SIZE)}</span> of <span className="font-medium text-[var(--text-body)]">{filtered.length}</span> positions
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage(Math.max(0, safePage - 1))}
            disabled={safePage === 0}
            className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-[11px] font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronDown className="size-3 rotate-90" strokeWidth={2.2} /> Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              data-active={safePage === i}
              className="inline-flex h-7 min-w-7 cursor-pointer items-center justify-center rounded-lg px-2 text-[11px] font-medium transition data-[active=true]:bg-[var(--color-brand-500)] data-[active=true]:text-white text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            >{i + 1}</button>
          ))}
          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages - 1, safePage + 1))}
            disabled={safePage >= totalPages - 1}
            className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-[11px] font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ChevronDown className="size-3 -rotate-90" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Symbol Detail Drawer — opens for ticker / watchlist / tile click
   ============================================================ */
type SymbolDetail = {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  changePct: number;
  change: number;
  dayRange?: string;
  marketCapLabel?: string;
  volumeLabel?: string;
  sparkline: number[];
  holding?: Holding;
};

function SymbolDetailDrawer({ detail, onClose }: { detail: SymbolDetail | null; onClose: () => void }) {
  if (!detail) return null;
  const d = detail;
  const positive = d.changePct >= 0;
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl"
        style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32,0.72,0,1)' }}
        role="dialog"
        aria-label={`${d.symbol} details`}
      >
        <div className="flex items-start justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-sm font-bold text-white">
              {d.symbol.slice(0, 2)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[var(--text-strong)]">{d.symbol}</h3>
                <StatusBadge tone={ASSET_CLASS_TONE[d.assetClass]}>{ASSET_CLASS_LABEL[d.assetClass]}</StatusBadge>
              </div>
              <p className="text-xs text-[var(--text-muted)]">{d.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={2.2} />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto modern-scrollbar p-5">
          {/* Price block */}
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">Last price</p>
                <p className="mt-0.5 text-2xl font-bold text-[var(--text-strong)]">{fmtCurrency(d.price, d.price > 1000 ? 0 : 2)}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">Day change</p>
                <p className="mt-0.5 flex items-center justify-end gap-1 text-base font-semibold" style={{ color: changeColor(d.changePct) }}>
                  {positive ? <ArrowUp className="size-4" strokeWidth={2.6} /> : <ArrowDown className="size-4" strokeWidth={2.6} />}
                  {fmtSigned(d.change)} ({fmtSignedPct(d.changePct)})
                </p>
              </div>
            </div>
            <div className="mt-3 h-12">
              <Sparkline data={d.sparkline} color={changeColor(d.changePct)} width={320} height={48} strokeWidth={2} />
            </div>
          </div>

          {/* Market stats */}
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Market data</p>
            <div className="grid grid-cols-2 gap-2">
              {d.dayRange && (
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Day range</p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-body)]">{d.dayRange}</p>
                </div>
              )}
              {d.volumeLabel && (
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Volume</p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-body)]">{d.volumeLabel}</p>
                </div>
              )}
              {d.marketCapLabel && (
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Market cap</p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-body)]">{d.marketCapLabel}</p>
                </div>
              )}
              <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                <p className="text-[10px] uppercase text-[var(--text-subtle)]">Asset class</p>
                <p className="mt-0.5 text-xs font-medium text-[var(--text-body)]">{ASSET_CLASS_LABEL[d.assetClass]}</p>
              </div>
            </div>
          </div>

          {/* Holding position info (if held) */}
          {d.holding && (
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Your position</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Shares</p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-body)]">{d.holding.shares}</p>
                </div>
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Avg cost</p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-body)]">{fmtCurrency(d.holding.avgCost)}</p>
                </div>
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Market value</p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-body)]">{fmtCurrency(d.holding.marketValue, 0)}</p>
                </div>
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Allocation</p>
                  <p className="mt-0.5 text-xs font-medium text-[var(--text-body)]">{d.holding.allocation.toFixed(2)}%</p>
                </div>
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Day P/L</p>
                  <p className="mt-0.5 text-xs font-semibold" style={{ color: changeColor(d.holding.dayPLPct) }}>{fmtSigned(d.holding.dayPL)}</p>
                </div>
                <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase text-[var(--text-subtle)]">Total P/L</p>
                  <p className="mt-0.5 text-xs font-semibold" style={{ color: changeColor(d.holding.totalPLPct) }}>{fmtSigned(d.holding.totalPL)} ({fmtSignedPct(d.holding.totalPLPct)})</p>
                </div>
              </div>
            </div>
          )}

          {/* Activity for this symbol */}
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Recent activity</p>
            <div className="space-y-1.5">
              {Data.activityLedger.filter((a) => a.symbol === d.symbol).slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] px-3 py-2">
                  <div>
                    <p className="text-xs font-medium text-[var(--text-body)]">{a.detail}</p>
                    <p className="text-[10px] text-[var(--text-subtle)]">{a.date} · {a.time}</p>
                  </div>
                  <StatusBadge tone={a.status === 'filled' || a.status === 'settled' ? 'success' : a.status === 'working' ? 'warning' : 'neutral'}>{a.status}</StatusBadge>
                </div>
              ))}
              {Data.activityLedger.filter((a) => a.symbol === d.symbol).length === 0 && (
                <p className="text-xs text-[var(--text-muted)]">No recent activity for this symbol.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
            Close
          </button>
          <button type="button" onClick={onClose} className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-success-600)] text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-success-700)]">
            <ArrowUp className="size-4" strokeWidth={2.4} /> Buy
          </button>
          <button type="button" onClick={onClose} className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-error-600)] text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-error-700)]">
            <ArrowDown className="size-4" strokeWidth={2.4} /> Sell
          </button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Position Detail Drawer — opens for positions table row click
   ============================================================ */
function PositionDetailDrawer({ position, onClose }: { position: PositionRow | null; onClose: () => void }) {
  if (!position) return null;
  const p = position;
  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl"
        style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32,0.72,0,1)' }}
        role="dialog"
        aria-label={`${p.symbol} position details`}
      >
        <div className="flex items-start justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-sm font-bold text-white">
              {p.symbol.slice(0, 2)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-[var(--text-strong)]">{p.symbol}</h3>
                {p.isCash ? <StatusBadge tone="neutral">Cash</StatusBadge> : <StatusBadge tone={ASSET_CLASS_TONE[p.assetClass]}>{ASSET_CLASS_LABEL[p.assetClass]}</StatusBadge>}
              </div>
              <p className="text-xs text-[var(--text-muted)]">{p.name}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close">
            <X className="size-4" strokeWidth={2.2} />
          </button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto modern-scrollbar p-5">
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">Market value</p>
                <p className="mt-0.5 text-2xl font-bold text-[var(--text-strong)]">{fmtCurrency(p.marketValue, 0)}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wide text-[var(--text-muted)]">Allocation</p>
                <p className="mt-0.5 text-base font-semibold text-[var(--text-strong)]">{p.allocation.toFixed(2)}%</p>
              </div>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--card)]">
              <div className="h-full rounded-full bg-[var(--color-brand-500)]" style={{ width: `${Math.min(100, p.allocation * 3)}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase text-[var(--text-subtle)]">Shares</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-body)]">{p.shares ?? '—'}</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase text-[var(--text-subtle)]">Sector</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-body)]">{p.sector}</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase text-[var(--text-subtle)]">Avg cost</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-body)]">{p.avgCost != null ? fmtCurrency(p.avgCost) : '—'}</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase text-[var(--text-subtle)]">Last price</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-body)]">{p.lastPrice != null ? fmtCurrency(p.lastPrice) : '—'}</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase text-[var(--text-subtle)]">Day P/L</p>
              <p className="mt-0.5 text-sm font-semibold" style={{ color: changeColor(p.dayPLPct) }}>
                {fmtSigned(p.dayPL, 0)} {p.dayPLPct != null && `(${fmtSignedPct(p.dayPLPct)})`}
              </p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase text-[var(--text-subtle)]">Total P/L</p>
              <p className="mt-0.5 text-sm font-semibold" style={{ color: changeColor(p.totalPLPct) }}>
                {fmtSigned(p.totalPL, 0)} {p.totalPLPct != null && `(${fmtSignedPct(p.totalPLPct)})`}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] p-3">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">7-day trend</p>
            <Sparkline data={p.sparkline} color={changeColor(p.dayPLPct ?? 0)} width={320} height={56} strokeWidth={2} />
          </div>
        </div>
        <div className="flex items-center gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">Close</button>
          <button type="button" onClick={onClose} className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-success-600)] text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-success-700)]"><ArrowUp className="size-4" strokeWidth={2.4} /> Buy more</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Add Symbol Drawer — right-side portal drawer with form
   ============================================================ */
function AddSymbolDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (sym: string) => void }) {
  const [form, setForm] = React.useState({
    symbol: '',
    name: '',
    assetType: 'equity' as AssetClass,
    group: Data.addSymbolConfig.defaultGroup,
    alert: Data.addSymbolConfig.alertTypes[0].value,
    notes: '',
  });

  React.useEffect(() => {
    if (open) {
      setForm({
        symbol: '',
        name: '',
        assetType: 'equity',
        group: Data.addSymbolConfig.defaultGroup,
        alert: Data.addSymbolConfig.alertTypes[0].value,
        notes: '',
      });
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit() {
    const sym = form.symbol.trim().toUpperCase();
    if (!sym) return;
    onCreate(sym);
  }

  const inputCls = 'h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]';

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl"
        style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32,0.72,0,1)' }}
        role="dialog"
        aria-label="Add symbol"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white">
              <Plus className="size-4.5" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">Add symbol</h3>
              <p className="text-xs text-[var(--text-muted)]">Track a new ticker or asset.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close">
            <X className="size-4" strokeWidth={2.2} />
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Symbol <span className="text-[var(--color-error-600)]">*</span></label>
            <input type="text" value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })} placeholder="e.g. GOOGL" maxLength={8} className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Company / asset name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Alphabet, Inc." className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Asset type</label>
              <select value={form.assetType} onChange={(e) => setForm({ ...form, assetType: e.target.value as AssetClass })} className={cn(inputCls, 'cursor-pointer')}>
                {Data.addSymbolConfig.assetTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Watchlist group</label>
              <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} className={cn(inputCls, 'cursor-pointer')}>
                {Data.addSymbolConfig.watchlistGroups.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Alert type</label>
            <select value={form.alert} onChange={(e) => setForm({ ...form, alert: e.target.value })} className={cn(inputCls, 'cursor-pointer')}>
              {Data.addSymbolConfig.alertTypes.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Why are you tracking this? (optional)" className={cn(inputCls, 'h-auto resize-none p-3')} />
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-body)]">
              <Info className="size-3.5 text-[var(--text-muted)]" strokeWidth={2.2} />
              Preview
            </p>
            <p className="mt-1.5 text-xs text-[var(--text-muted)]">
              {form.symbol || '—'} will be added to <span className="font-medium text-[var(--text-body)]">{form.group}</span> with a <span className="font-medium text-[var(--text-body)]">{Data.addSymbolConfig.alertTypes.find((a) => a.value === form.alert)?.label.toLowerCase()}</span> alert.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Cancel</button>
          <button type="button" onClick={handleSubmit} disabled={!form.symbol.trim()} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50">
            <Plus className="size-4" strokeWidth={2.4} /> Add symbol
          </button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Main dashboard
   ============================================================ */
export function StocksDashboard() {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = React.useState(Data.stocksHeader.defaultTimeRange);
  const [addOpen, setAddOpen] = React.useState(false);
  const [symbolDetail, setSymbolDetail] = React.useState<SymbolDetail | null>(null);
  const [positionDetail, setPositionDetail] = React.useState<PositionRow | null>(null);

  function handleTimeRange(r: string) {
    setTimeRange(r);
    toast({ title: 'Time range updated', description: `Now showing ${r} performance` });
  }

  function openTicker(t: TickerSymbol) {
    const holding = Data.holdings.find((h) => h.symbol === t.symbol);
    setSymbolDetail({
      symbol: t.symbol,
      name: t.name,
      assetClass: t.assetClass,
      price: t.price,
      changePct: t.changePct,
      change: t.change,
      dayRange: `${t.dayLow} – ${t.dayHigh}`,
      sparkline: t.sparkline,
      holding,
    });
    toast({ title: `${t.symbol} · ${fmtCurrency(t.price, t.price > 1000 ? 0 : 2)}`, description: `${t.name} · ${fmtSignedPct(t.changePct)} today` });
  }

  function openWatch(w: WatchlistItem) {
    const holding = Data.holdings.find((h) => h.symbol === w.symbol);
    setSymbolDetail({
      symbol: w.symbol,
      name: w.name,
      assetClass: w.assetClass,
      price: w.price,
      changePct: w.changePct,
      change: w.change,
      dayRange: w.dayRange,
      marketCapLabel: w.marketCapLabel,
      volumeLabel: w.volumeLabel,
      sparkline: w.sparkline,
      holding,
    });
  }

  function openTile(t: TreemapTile) {
    const holding = Data.holdings.find((h) => h.symbol === t.symbol);
    const ticker = Data.tickerTape.find((tk) => tk.symbol === t.symbol);
    setSymbolDetail({
      symbol: t.symbol,
      name: t.name,
      assetClass: holding?.assetClass ?? ticker?.assetClass ?? (t.symbol === 'CASH' ? 'cash' : 'equity'),
      price: t.lastPrice ?? 0,
      changePct: t.dayPLPct,
      change: holding?.dayPL ?? 0,
      dayRange: ticker ? `${ticker.dayLow} – ${ticker.dayHigh}` : undefined,
      marketCapLabel: ticker ? undefined : undefined,
      volumeLabel: ticker ? ticker.name : undefined,
      sparkline: holding?.sparkline ?? Data.cashSleeve.sparkline,
      holding,
    });
  }

  function openMover(sym: string, price: number, changePct: number, name: string) {
    const holding = Data.holdings.find((h) => h.symbol === sym);
    const ticker = Data.tickerTape.find((t) => t.symbol === sym);
    setSymbolDetail({
      symbol: sym,
      name,
      assetClass: holding?.assetClass ?? ticker?.assetClass ?? 'equity',
      price,
      changePct,
      change: holding?.dayPL ?? ticker?.change ?? 0,
      dayRange: ticker ? `${ticker.dayLow} – ${ticker.dayHigh}` : undefined,
      sparkline: holding?.sparkline ?? ticker?.sparkline ?? [price],
      holding,
    });
  }

  function handleAdd(sym: string) {
    setAddOpen(false);
    toast({ title: 'Symbol added', description: `${sym} is now on your watchlist.` });
  }

  return (
    <div className="space-y-5 px-4 py-5 sm:px-6 sm:py-6">
      <StocksHeader timeRange={timeRange} onTimeRangeChange={handleTimeRange} onAddSymbol={() => setAddOpen(true)} />
      <TickerTape onSymbol={openTicker} />

      {/* Hero row */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PortfolioHero timeRange={timeRange} />
        </div>
        <div className="flex flex-col gap-5">
          <WatchlistRail onSymbol={openWatch} />
          <RiskPanel />
        </div>
      </div>

      {/* Holdings + Sectors */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <HoldingsTreemap onTile={openTile} />
        <SectorHeatmap />
      </div>

      {/* Movers + Correlation */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <MarketMovers onSymbol={openMover} />
        <CorrelationMatrix />
      </div>

      {/* Calendar */}
      <EventsCalendar />

      {/* Positions table */}
      <PositionsTable onRow={setPositionDetail} />

      {/* Disclaimer footer */}
      <footer className="mt-auto flex flex-col items-center justify-between gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-sunken)] px-5 py-4 sm:flex-row">
        <p className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
          <AlertCircle className="size-3.5 text-[var(--color-warning-600)]" strokeWidth={2.2} />
          {Data.stocksDisclaimer}
        </p>
        <p className="text-[11px] text-[var(--text-subtle)]">Last synced {new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
      </footer>

      {/* Drawers */}
      <SymbolDetailDrawer detail={symbolDetail} onClose={() => setSymbolDetail(null)} />
      <PositionDetailDrawer position={positionDetail} onClose={() => setPositionDetail(null)} />
      <AddSymbolDrawer open={addOpen} onClose={() => setAddOpen(false)} onCreate={handleAdd} />
    </div>
  );
}
