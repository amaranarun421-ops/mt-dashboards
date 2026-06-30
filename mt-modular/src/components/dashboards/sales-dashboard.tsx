'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, MoreHorizontal,
  Eye, Users, Clock, Phone, Mail, MessageSquare, Building2, Target, TrendingUp,
  TrendingDown, AlertTriangle, AlertCircle, Info, Star, CheckCircle2, XCircle,
  Plus, X, Search, Filter, Bell, Link2, Video, FileText, UserPlus, Briefcase,
  Zap, Activity, Calendar, Check, Shield, MapPin, Globe, Award, Flag, Rocket,
  Hourglass, Gauge, Flame, Trophy, Crosshair, ArrowRight, MapPinned, Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from './analytics-interactions';
import * as Data from './sales-data';
import type { SalesDeal } from './sales-data';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const VectorMap = dynamic(
  () => import('@react-jvectormap/core').then((mod: any) => mod.VectorMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-[var(--color-brand-500)] border-t-transparent" />
      </div>
    ),
  },
);
import { worldMill } from '@react-jvectormap/world';

/* ============================================================
   Shared helpers
   ============================================================ */
function CardActionMenu({ cardName }: { cardName: string }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  function handle(action: string) {
    setOpen(false);
    const messages: Record<string, string> = {
      view: `Viewing ${cardName} details`,
      download: `${cardName} chart downloaded`,
      copy: `${cardName} report link copied`,
    };
    toast({ title: messages[action] || 'Action completed' });
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

function Sparkline({ data, color = '#465FFF', height = 30, width = 80 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const id = React.useId();
  const max = Math.max(...data), min = Math.min(...data), rangeVal = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const toX = (i: number) => i * step;
  const toY = (v: number) => height - ((v - min) / rangeVal) * (height - 4) - 2;
  const points = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaPath = `M 0,${height} L ${points} L ${width},${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={`sales-spark-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#sales-spark-${id})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray="100" strokeDashoffset="100">
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="800ms" fill="freeze" begin="120ms" />
      </polyline>
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="2" fill={color}>
        <animate attributeName="r" values="2;3.4;2" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* Quota ring — animated arc gauge for the hero */
function QuotaGauge({ value }: { value: number }) {
  const r = 78;
  const circumference = 2 * Math.PI * r;
  const arc = 0.75; // 270°
  const offset = circumference - (value / 100) * (circumference * arc);
  return (
    <div className="relative size-[200px]">
      <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-[135deg]">
        <defs>
          <linearGradient id="quota-arc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#465FFF" />
            <stop offset="50%" stopColor="#7A5AF8" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx="100" cy="100" r={r}
          fill="none"
          stroke="var(--surface-sunken)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${circumference * arc} ${circumference}`}
        />
        {/* Progress */}
        <circle
          cx="100" cy="100" r={r}
          fill="none"
          stroke="url(#quota-arc-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${circumference * arc} ${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.32, 0.72, 0, 1)' }}
        >
          <animate attributeName="stroke-dashoffset" from={circumference * arc} to={offset} dur="1.4s" fill="freeze" begin="180ms" />
        </circle>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Quota Attainment</p>
        <p className="mt-1 text-4xl font-semibold tabular-nums text-[var(--text-strong)]">{value}%</p>
        <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">of $2.4M target</p>
      </div>
    </div>
  );
}

const fmtMoney = (v: number, digits = 0) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(digits === 0 ? 2 : digits)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

/* ============================================================
   Sales Header
   ============================================================ */
function SalesHeader({ onNewDeal }: { onNewDeal: () => void }) {
  const { toast } = useToast();
  const [quarterOpen, setQuarterOpen] = React.useState(false);
  const [teamOpen, setTeamOpen] = React.useState(false);
  const [territoryOpen, setTerritoryOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [quarter, setQuarter] = React.useState('Q2 2026');
  const [team, setTeam] = React.useState('All teams');
  const [territory, setTerritory] = React.useState('All territories');

  function handleExport(format: 'csv' | 'pdf' | 'xls') {
    setExportOpen(false);
    if (format === 'csv') {
      const headers = ['Deal', 'Account', 'Owner', 'Territory', 'Stage', 'Value', 'Probability', 'Close Date', 'Risk', 'Next Step'];
      const rows = Data.salesDeals.map((d) => [d.deal, d.account, d.owner, d.territory, d.stage, d.value, `${d.probability}%`, d.closeDate, d.risk, d.nextStep]);
      const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sales-deals-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: 'CSV exported', description: `${Data.salesDeals.length} deals downloaded` });
    } else {
      toast({ title: `${format.toUpperCase()} export prepared`, description: `Your ${format.toUpperCase()} sales report is being generated.` });
    }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>Dashboards</span>
          <ChevronRight className="size-3 text-[var(--text-faint)]" />
          <span className="text-[var(--text-strong)]">Sales</span>
        </nav>
        <h1 className="ds-page-title">Sales Revenue Command Center</h1>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">Track quota, forecast confidence, pipeline coverage, rep activity, and deal velocity.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* Quarter selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setQuarterOpen((p) => !p); setTeamOpen(false); setTerritoryOpen(false); setExportOpen(false); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="dialog"
            aria-expanded={quarterOpen}
          >
            <CalendarDays className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            {quarter}
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', quarterOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={quarterOpen} onClose={() => setQuarterOpen(false)} align="right" width={170}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Quarter</p></div>
            {Data.QUARTERS.map((q) => (
              <PopoverItem key={q} active={quarter === q} onClick={() => { setQuarter(q); setQuarterOpen(false); toast({ title: `Quarter set to ${q}`, description: Data.SALES_RANGE }); }}>{q}</PopoverItem>
            ))}
          </Popover>
        </div>
        {/* Team filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setTeamOpen((p) => !p); setQuarterOpen(false); setTerritoryOpen(false); setExportOpen(false); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="dialog"
            aria-expanded={teamOpen}
          >
            <Users className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{team}</span><span className="sm:hidden">Team</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', teamOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={teamOpen} onClose={() => setTeamOpen(false)} align="right" width={170}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Team</p></div>
            {Data.TEAMS.map((t) => (
              <PopoverItem key={t} active={team === t} onClick={() => { setTeam(t); setTeamOpen(false); toast({ title: `Team filter: ${t}` }); }}>{t}</PopoverItem>
            ))}
          </Popover>
        </div>
        {/* Territory filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setTerritoryOpen((p) => !p); setQuarterOpen(false); setTeamOpen(false); setExportOpen(false); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="dialog"
            aria-expanded={territoryOpen}
          >
            <MapPin className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{territory}</span><span className="sm:hidden">Region</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', territoryOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={territoryOpen} onClose={() => setTerritoryOpen(false)} align="right" width={170}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Territory</p></div>
            {Data.TERRITORIES.map((t) => (
              <PopoverItem key={t} active={territory === t} onClick={() => { setTerritory(t); setTerritoryOpen(false); toast({ title: `Territory filter: ${t}` }); }}>{t}</PopoverItem>
            ))}
          </Popover>
        </div>
        {/* Export */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setExportOpen((p) => !p); setQuarterOpen(false); setTeamOpen(false); setTerritoryOpen(false); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="menu"
            aria-expanded={exportOpen}
          >
            <Download className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            Export
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', exportOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={exportOpen} onClose={() => setExportOpen(false)} align="right" width={170}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export format</p></div>
            <PopoverItem icon={Download} onClick={() => handleExport('csv')}>Export CSV</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('pdf')}>Export PDF</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('xls')}>Export XLS</PopoverItem>
          </Popover>
        </div>
        {/* New deal */}
        <button
          type="button"
          onClick={onNewDeal}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"
        >
          <Plus className="size-4" strokeWidth={2.4} />
          New deal
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Hero: Quota & Forecast (large gauge + forecast cone)
   ============================================================ */
function QuotaForecastHero() {
  const cone = Data.forecastCone;
  const options: any = {
    chart: { type: 'area', height: 320, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 900, dynamicAnimation: { enabled: true, speed: 350 } } },
    colors: ['#12B76A', '#7A5AF8', '#F79009'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [2.5, 2.5, 2], dashArray: [0, 4, 4] },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: [0.32, 0.18, 0.08], opacityTo: [0.04, 0.02, 0], stops: [0, 100] },
    },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 8, bottom: 0, left: 8 } },
    xaxis: {
      categories: cone.map((p) => p.week),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' } },
      axisBorder: { show: false }, axisTicks: { show: false },
      crosshairs: { stroke: { color: 'var(--color-brand-500)', width: 1, dashArray: 4 }, fill: { type: 'solid', color: 'var(--color-brand-500)', opacity: 0.05 } },
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' },
        formatter: (v: number) => v >= 1000 ? `$${(v / 1000).toFixed(1)}M` : `$${v}K`,
      },
    },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, labels: { colors: 'var(--text-body)' }, markers: { size: 6, strokeWidth: 0, offsetX: -4 }, itemMargin: { horizontal: 12, vertical: 0 } },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }: any) => {
        const p = cone[dataPointIndex];
        const gapToQuota = p.bestCase - p.quota;
        const gapColor = gapToQuota >= 0 ? '#12B76A' : '#F04739';
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:220px;">
          <div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.week} · Forecast</div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:5px 16px;font-size:12px;">
            <span style="color:var(--text-body);">Commit forecast</span>
            <span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">$${(p.commit / 1000).toFixed(2)}M</span>
            <span style="color:var(--text-body);">Best case</span>
            <span style="color:#7A5AF8;font-weight:600;font-variant-numeric:tabular-nums;">$${(p.bestCase / 1000).toFixed(2)}M</span>
            <span style="color:var(--text-body);">Open pipeline</span>
            <span style="color:#F79009;font-weight:600;font-variant-numeric:tabular-nums;">$${(p.pipeline / 1000).toFixed(1)}M</span>
            <span style="color:var(--text-body);">Weekly quota</span>
            <span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">$${(p.quota / 1000).toFixed(2)}M</span>
            <span style="color:var(--text-body);border-top:1px solid var(--border-subtle);padding-top:5px;margin-top:2px;">Gap to quota</span>
            <span style="color:${gapColor};font-weight:600;font-variant-numeric:tabular-nums;border-top:1px solid var(--border-subtle);padding-top:5px;margin-top:2px;">${gapToQuota >= 0 ? '+' : ''}$${(gapToQuota / 1000).toFixed(2)}M</span>
          </div>
        </div>`;
      },
    },
    markers: { size: 0, hover: { size: 5, sizeOffset: 3 }, strokeColors: 'var(--card)', strokeWidth: 2 },
    annotations: {
      yaxis: [
        { y: 1500, borderColor: '#465FFF', strokeDashArray: 4, label: { text: 'Weekly quota', position: 'left', borderColor: '#465FFF', style: { color: '#fff', background: '#465FFF', fontSize: '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, padding: { left: 6, right: 6, top: 2, bottom: 2 } } } },
      ],
    },
  };
  const chartSeries = [
    { name: 'Commit', data: cone.map((p) => p.commit) },
    { name: 'Best Case', data: cone.map((p) => p.bestCase) },
    { name: 'Pipeline', data: cone.map((p) => p.pipeline) },
  ];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Target className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Quota &amp; Forecast</h2>
            <p className="text-xs text-[var(--text-muted)]">Q2 attainment arc + 12-week forecast cone (commit / best case / pipeline).</p>
          </div>
        </div>
        <CardActionMenu cardName="Quota & Forecast" />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
        {/* Quota gauge + metrics */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-5">
          <QuotaGauge value={Data.quotaHero.attainment} />
          <div className="grid w-full grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] p-2.5">
              <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Closed Won</p>
              <p className="mt-0.5 text-base font-semibold tabular-nums text-[var(--text-strong)]">{fmtMoney(Data.quotaHero.closedWon)}</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] p-2.5">
              <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Forecasted</p>
              <p className="mt-0.5 text-base font-semibold tabular-nums text-[var(--text-strong)]">{fmtMoney(Data.quotaHero.forecasted)}</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] p-2.5">
              <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Quota</p>
              <p className="mt-0.5 text-base font-semibold tabular-nums text-[var(--text-strong)]">{fmtMoney(Data.quotaHero.quota)}</p>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] p-2.5">
              <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Pipeline Cov.</p>
              <p className="mt-0.5 text-base font-semibold tabular-nums text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{Data.quotaHero.pipelineCoverage}x</p>
            </div>
          </div>
        </div>
        {/* Forecast cone */}
        <div className="min-w-0">
          <Chart options={options} series={chartSeries} type="area" height={320} />
          <div className="mt-2 flex items-start gap-2 rounded-xl border border-[var(--color-brand-200,rgba(70,95,255,0.3))] bg-[var(--color-brand-50)]/60 p-3 dark:bg-[rgba(70,95,255,0.08)]">
            <Info className="mt-0.5 size-4 flex-shrink-0 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" strokeWidth={2.2} />
            <p className="text-xs text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">{Data.quotaHero.insight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Right rail: Close Plan
   ============================================================ */
function ClosePlanCard() {
  const [active, setActive] = React.useState<string | null>(null);
  const dueConfig = {
    today: { tone: 'error' as const, label: 'Today' },
    tomorrow: { tone: 'warning' as const, label: 'Tomorrow' },
    'this-week': { tone: 'brand' as const, label: 'This week' },
    'next-week': { tone: 'info' as const, label: 'Next week' },
  };
  const confConfig = {
    high: { tone: 'success' as const, icon: CheckCircle2 },
    medium: { tone: 'warning' as const, icon: AlertCircle },
    low: { tone: 'error' as const, icon: AlertTriangle },
  };
  const activeItem = Data.closePlan.find((c) => c.id === active);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
            <Rocket className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Close Plan</h2>
            <p className="text-xs text-[var(--text-muted)]">Key upcoming sales moments — click for detail.</p>
          </div>
        </div>
        <CardActionMenu cardName="Close Plan" />
      </div>
      <div className="space-y-2">
        {Data.closePlan.map((c) => {
          const dc = dueConfig[c.dueIn];
          const CIcon = confConfig[c.confidence].icon;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(active === c.id ? null : c.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition cursor-pointer',
                active === c.id
                  ? 'border-[var(--color-brand-300)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]'
                  : 'border-[var(--border-subtle)] hover:bg-[var(--surface-sunken)]/40'
              )}
            >
              <span className="inline-flex size-9 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-[var(--surface-sunken)] text-[var(--text-strong)]">
                <CIcon className="size-3.5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-[var(--text-strong)]">{c.account}</p>
                  <span className="text-[10px] font-medium tabular-nums text-[var(--text-muted)]">· {fmtMoney(c.amount)}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-[var(--text-muted)]">{c.moment}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge tone={dc.tone} dot>{c.when.split(' · ')[0]}</StatusBadge>
                <span className="text-[10px] text-[var(--text-muted)]">{c.when.split(' · ')[1] ?? c.when}</span>
              </div>
            </button>
          );
        })}
      </div>
      {activeItem && (
        <div className="mt-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-3" style={{ animation: 'ecomPopoverIn 200ms ease-out' }}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-[var(--text-strong)]">{activeItem.account} · {activeItem.moment}</p>
              <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">Owner: {activeItem.owner} · Stage: {activeItem.stage}</p>
            </div>
            <StatusBadge tone={confConfig[activeItem.confidence].tone} dot>{activeItem.confidence} conf.</StatusBadge>
          </div>
          <p className="mt-2 text-xs text-[var(--text-body)]">{activeItem.detail}</p>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   Right rail: Deal Risk Snapshot
   ============================================================ */
function DealRiskSnapshotCard() {
  const { toast } = useToast();
  const sevConfig = {
    high: { tone: 'error' as const, color: '#F04739', icon: AlertCircle },
    medium: { tone: 'warning' as const, color: '#F79009', icon: AlertTriangle },
    warning: { tone: 'info' as const, color: '#0BA5EC', icon: Info },
  };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]">
            <Flame className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Deal Risk Snapshot</h2>
            <p className="text-xs text-[var(--text-muted)]">At-risk pipeline segments needing action.</p>
          </div>
        </div>
        <CardActionMenu cardName="Deal Risk Snapshot" />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {Data.riskSnapshot.map((r) => {
          const sc = sevConfig[r.severity];
          const SIcon = sc.icon;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => toast({ title: r.label, description: r.hint })}
              className="group flex flex-col gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3 text-left transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)] cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-7 items-center justify-center rounded-lg" style={{ background: `${sc.color}1f`, color: sc.color }}>
                  <SIcon className="size-3.5" strokeWidth={2.2} />
                </span>
                <StatusBadge tone={sc.tone}>{r.count}</StatusBadge>
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--text-strong)]">{r.label}</p>
                <p className="mt-0.5 line-clamp-2 text-[10px] text-[var(--text-muted)]">{r.hint}</p>
              </div>
              <Sparkline data={r.trend} color={sc.color} height={20} width={120} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Pipeline Stage Board (6 stage cards with mini trend)
   ============================================================ */
function PipelineStageBoard({ onStageClick }: { onStageClick: (stage: string) => void }) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]">
            <Layers className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Pipeline Stage Board</h2>
            <p className="text-xs text-[var(--text-muted)]">6-stage funnel — forecast probability, velocity, weighted pipeline. Click a stage to filter the deals table.</p>
          </div>
        </div>
        <CardActionMenu cardName="Pipeline Stage Board" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Data.pipelineStages.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onStageClick(s.name)}
            className={cn(
              'group relative flex flex-col gap-2 overflow-hidden rounded-xl border p-3 text-left transition cursor-pointer',
              hovered === i ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]/40' : 'border-[var(--border-subtle)] bg-[var(--card)] hover:bg-[var(--surface-sunken)]/30'
            )}
          >
            <div className="absolute inset-x-0 top-0 h-1" style={{ background: s.color }} />
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs font-medium text-[var(--text-strong)]">{s.name}</p>
              <span className="rounded-md px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: `${s.color}1f`, color: s.color }}>{s.probability}%</span>
            </div>
            <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{fmtMoney(s.value)}</p>
            <p className="text-[10px] text-[var(--text-muted)]">{s.count} deals · {s.velocity}d avg</p>
            <div className="mt-1 flex items-end justify-between gap-2">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Weighted</p>
                <p className="text-xs font-medium tabular-nums text-[var(--text-body)]">{fmtMoney(s.weighted)}</p>
              </div>
              <Sparkline data={s.trend} color={s.color} height={26} width={70} />
            </div>
            {hovered === i && (
              <span className="absolute right-2 top-2 inline-flex items-center gap-0.5 rounded-md bg-[var(--card)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)] shadow-sm" style={{ animation: 'ecomPopoverIn 160ms ease-out' }}>
                Filter <ArrowRight className="size-2.5" strokeWidth={2.4} />
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Deal Velocity (flow timeline)
   ============================================================ */
function DealVelocityCard() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const maxDays = Math.max(...Data.velocityStages.map((s) => s.days));
  const totalDays = Data.velocityStages.reduce((sum, s) => sum + s.days, 0);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <Hourglass className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Deal Velocity</h2>
            <p className="text-xs text-[var(--text-muted)]">Days spent per stage vs. target — hover for bottleneck insights.</p>
          </div>
        </div>
        <CardActionMenu cardName="Deal Velocity" />
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Avg sales cycle</p>
          <p className="mt-0.5 text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.dealVelocity.avgCycle}<span className="text-xs font-normal text-[var(--text-muted)]">d</span></p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Stage conversion</p>
          <p className="mt-0.5 text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.dealVelocity.stageConversion}<span className="text-xs font-normal text-[var(--text-muted)]">%</span></p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Win rate</p>
          <p className="mt-0.5 text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.dealVelocity.winRate}<span className="text-xs font-normal text-[var(--text-muted)]">%</span></p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Avg deal size</p>
          <p className="mt-0.5 text-lg font-semibold tabular-nums text-[var(--text-strong)]">{fmtMoney(Data.dealVelocity.avgDealSize)}</p>
        </div>
      </div>
      {/* Flow timeline */}
      <div className="overflow-x-auto">
        <div className="flex min-w-[680px] items-end gap-2 pb-2">
          {Data.velocityStages.map((s, i) => {
            const pct = (s.days / maxDays) * 100;
            const overTarget = s.days > s.target;
            const isLast = i === Data.velocityStages.length - 1;
            return (
              <React.Fragment key={s.name}>
                <div
                  className="flex flex-1 flex-col items-center"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="relative flex w-full flex-col items-center">
                    <p className={cn('mb-1 text-xs font-semibold tabular-nums', overTarget ? 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]' : 'text-[var(--text-strong)]')}>{s.days}d</p>
                    {/* Bar */}
                    <div className="relative w-full overflow-hidden rounded-t-lg" style={{ height: 130 }}>
                      <div
                        className={cn('absolute inset-x-0 bottom-0 rounded-t-lg transition-all', hovered === i ? 'opacity-100' : 'opacity-90')}
                        style={{
                          height: `${pct}%`,
                          background: `linear-gradient(180deg, ${s.color}, ${s.color}cc)`,
                          transition: 'height 1s cubic-bezier(0.32, 0.72, 0, 1)',
                        }}
                      />
                      {/* Target line */}
                      <div
                        className="absolute inset-x-0 z-10 flex items-center"
                        style={{ bottom: `${(s.target / maxDays) * 100}%` }}
                      >
                        <div className="h-0.5 w-full bg-[var(--text-strong)]/40" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--text-strong) 0 4px, transparent 4px 8px)' }} />
                      </div>
                    </div>
                    <p className="mt-1.5 text-center text-[10px] font-medium leading-tight text-[var(--text-strong)]">{s.name}</p>
                    <p className="text-[9px] tabular-nums text-[var(--text-muted)]">→ {s.conversion}%</p>
                    {overTarget && (
                      <span className="mt-1 inline-flex items-center gap-0.5 rounded-full bg-[var(--color-warning-50)] px-1.5 py-0.5 text-[8px] font-medium text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
                        <AlertTriangle className="size-2" strokeWidth={2.5} />Bottleneck
                      </span>
                    )}
                    {/* Hover insight */}
                    {hovered === i && (
                      <div className="absolute -top-32 left-1/2 z-20 w-44 -translate-x-1/2 whitespace-normal rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2.5 text-xs shadow-lg" style={{ animation: 'ecomPopoverIn 160ms ease-out' }}>
                        <p className="font-medium text-[var(--text-strong)]">{s.name}</p>
                        <div className="mt-1 space-y-0.5 text-[10px]">
                          <p className="text-[var(--text-muted)]">Days: <span className="font-medium tabular-nums text-[var(--text-strong)]">{s.days}d</span> · Target: <span className="font-medium tabular-nums text-[var(--text-body)]">{s.target}d</span></p>
                          <p className="text-[var(--text-muted)]">Conversion: <span className="font-medium tabular-nums text-[var(--text-strong)]">{s.conversion}%</span></p>
                          <p className="mt-1 text-[var(--text-body)]">{s.bottleneck}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {!isLast && (
                  <div className="flex items-center pt-6" style={{ width: 14 }}>
                    <ChevronRight className="size-3 text-[var(--text-subtle)]" strokeWidth={2.4} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Total cycle: <span className="font-medium tabular-nums text-[var(--text-strong)]">{totalDays}d</span></span>
        <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1"><span className="h-0.5 w-3 bg-[var(--text-strong)]/40" style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--text-strong) 0 2px, transparent 2px 4px)' }} />Target</span>
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-sm bg-[var(--color-brand-500)]" />Actual days</span>
        </span>
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-xl border border-[var(--color-warning-200,rgba(247,144,9,0.3))] bg-[var(--color-warning-50)]/60 p-3 dark:bg-[rgba(247,144,9,0.08)]">
        <AlertCircle className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" strokeWidth={2.2} />
        <p className="text-xs text-[var(--color-warning-700)] dark:text-[var(--color-warning-500)]">{Data.dealVelocity.insight}</p>
      </div>
    </section>
  );
}

/* ============================================================
   Rep Performance Arena (avatar cards)
   ============================================================ */
function RepPerformanceArena() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const rankBadge = ['bg-[#FBBF24] text-white', 'bg-[#A1A1AA] text-white', 'bg-[#D97706] text-white', 'bg-[var(--surface-sunken)] text-[var(--text-muted)]', 'bg-[var(--surface-sunken)] text-[var(--text-muted)]'];
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#f5f3ff] text-[#7a5af8] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#a78bfa]">
            <Trophy className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Rep Performance Arena</h2>
            <p className="text-xs text-[var(--text-muted)]">Leaderboard — hover for stage breakdown.</p>
          </div>
        </div>
        <CardActionMenu cardName="Rep Performance" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Data.reps.map((rep, i) => {
          const r = 26;
          const circ = 2 * Math.PI * r;
          const offset = circ - (rep.attainment / 100) * circ;
          const isHovered = hovered === i;
          return (
            <div
              key={rep.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                'group relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition',
                isHovered ? 'border-[var(--color-brand-300)] bg-[var(--color-brand-50)]/40 dark:bg-[rgba(70,95,255,0.06)]' : 'border-[var(--border-subtle)] bg-[var(--card)] hover:border-[var(--border-strong)]'
              )}
            >
              {/* Rank badge */}
              <span className={cn('absolute left-2 top-2 inline-flex size-6 items-center justify-center rounded-full text-[10px] font-bold', rankBadge[rep.rank - 1])}>
                {rep.rank <= 3 ? <Award className="size-3" strokeWidth={2.4} /> : `#${rep.rank}`}
              </span>
              {/* Avatar with quota ring */}
              <div className="relative">
                <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
                  <circle cx="32" cy="32" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth="4" />
                  <circle
                    cx="32" cy="32" r={r} fill="none"
                    stroke={rep.attainment >= 75 ? '#12B76A' : rep.attainment >= 60 ? '#F79009' : '#F04739'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.32, 0.72, 0, 1)' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <UserAvatar name={rep.name} size="sm" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-[var(--text-strong)]">{rep.name}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{fmtMoney(rep.closedWon)} closed</p>
              </div>
              <Sparkline data={rep.sparkline} color="#465FFF" height={22} width={90} />
              <div className="grid w-full grid-cols-3 gap-1 border-t border-[var(--border-subtle)] pt-2 text-center">
                <div><p className="text-[8px] uppercase tracking-wider text-[var(--text-subtle)]">Att.</p><p className="text-[10px] font-semibold tabular-nums text-[var(--text-strong)]">{rep.attainment}%</p></div>
                <div><p className="text-[8px] uppercase tracking-wider text-[var(--text-subtle)]">Win</p><p className="text-[10px] font-semibold tabular-nums text-[var(--text-strong)]">{rep.winRate}%</p></div>
                <div><p className="text-[8px] uppercase tracking-wider text-[var(--text-subtle)]">Act.</p><p className="text-[10px] font-semibold tabular-nums text-[var(--text-strong)]">{rep.activityScore}</p></div>
              </div>
              {/* Hover breakdown */}
              <div className={cn('grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out', isHovered && 'grid-rows-[1fr]')}>
                <div className="overflow-hidden">
                  <div className="mt-2 space-y-1 border-t border-[var(--border-subtle)] pt-2">
                    <p className="text-[8px] uppercase tracking-wider text-[var(--text-subtle)]">Open deals by stage</p>
                    {[
                      { label: 'Prospecting', v: rep.breakdown.prospecting, c: '#465FFF' },
                      { label: 'Discovery', v: rep.breakdown.discovery, c: '#0BA5EC' },
                      { label: 'Proposal', v: rep.breakdown.proposal, c: '#F79009' },
                      { label: 'Commit', v: rep.breakdown.commit, c: '#7A5AF8' },
                      { label: 'Won', v: rep.breakdown.won, c: '#EC4899' },
                    ].map((b) => (
                      <div key={b.label} className="flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-1 text-[var(--text-muted)]"><span className="size-1.5 rounded-sm" style={{ background: b.c }} />{b.label}</span>
                        <span className="font-medium tabular-nums text-[var(--text-strong)]">{b.v}</span>
                      </div>
                    ))}
                    <div className="mt-1.5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-1.5 text-[10px]">
                      <span className="text-[var(--text-muted)]">Pipeline</span>
                      <span className="font-medium tabular-nums text-[var(--text-strong)]">{fmtMoney(rep.pipelineCreated)}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[var(--text-muted)]">Avg cycle</span>
                      <span className="font-medium tabular-nums text-[var(--text-strong)]">{rep.avgCycle}d</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Territory Map (real jvectormap)
   ============================================================ */
function TerritoryMapCard({ onTerritoryClick }: { onTerritoryClick: (t: string) => void }) {
  const [selected, setSelected] = React.useState<string | null>('t1');
  const [hovered, setHovered] = React.useState<number | null>(null);

  const markers = Data.territories.map((t) => ({
    latLng: [t.lat, t.lng],
    name: `${t.name} · ${fmtMoney(t.closed)} closed`,
    style: {
      fill: selected === t.id ? '#465FFF' : t.attainment >= 80 ? '#12B76A' : t.attainment >= 65 ? '#F79009' : '#F04739',
      r: selected === t.id ? 8 : 6,
      strokeWidth: 2,
      borderColor: '#fff',
    },
  })) as any[];

  const selectedTerritory = Data.territories.find((t) => t.id === selected);
  // Build a region fill map so covered regions get tinted by attainment
  const regionColors: Record<string, string> = {};
  Data.territories.forEach((t) => {
    const color = t.attainment >= 80 ? 'rgba(18,183,106,0.35)' : t.attainment >= 65 ? 'rgba(247,144,9,0.35)' : 'rgba(240,68,56,0.35)';
    t.regionCodes.forEach((code) => { regionColors[code] = color; });
  });

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <MapPinned className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Territory Revenue Map</h2>
            <p className="text-xs text-[var(--text-muted)]">Closed won by territory — hover marker for detail, click to filter dashboard.</p>
          </div>
        </div>
        <CardActionMenu cardName="Territory Map" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Real interactive map */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]" style={{ minHeight: 320 }}>
          {React.createElement(VectorMap as any, {
            map: worldMill,
            backgroundColor: 'transparent',
            markerStyle: { initial: { fill: '#12B76A', r: 6 }, hover: { r: 8 } },
            markersSelectable: true,
            markers,
            selectedMarkers: [],
            zoomOnScroll: false,
            regionStyle: {
              initial: { fill: '#E5E7EB', fillOpacity: 1, stroke: 'none' },
              hover: { fill: '#465FFF', fillOpacity: 0.3 },
              selected: { fill: '#465FFF' },
            },
            series: {
              regions: [{ values: regionColors }],
            },
            onMarkerClick: (e: any, code: number) => {
              const t = Data.territories[code];
              if (t) { setSelected(t.id); onTerritoryClick(t.name); }
            },
            onRegionTipShow: (e: any, el: any, code: string) => {
              const t = Data.territories.find((tt) => tt.regionCodes.includes(code));
              if (t) {
                el.html(`<div style="font-weight:600;">${t.name}</div><div style="font-size:10px;color:var(--text-muted);">${fmtMoney(t.closed)} closed · ${t.attainment}% to quota</div>`);
              } else {
                el.html(el.html());
              }
            },
          })}
          <style jsx global>{`
            .jvectormap-container { background: transparent !important; }
            .jvectormap-region.jvectormap-element { transition: fill 0.2s ease; }
            .jvectormap-marker.jvectormap-element { cursor: pointer; transition: r 0.2s ease; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
            .jvectormap-tip { background: var(--popover) !important; border: 1px solid var(--border) !important; border-radius: 8px !important; padding: 6px 10px !important; font-size: 11px !important; font-weight: 500 !important; font-family: Outfit, sans-serif !important; color: var(--text-strong) !important; box-shadow: 0 8px 24px -4px rgba(15,23,42,0.15) !important; white-space: nowrap !important; }
            .jvectormap-zoomin, .jvectormap-zoomout { display: none !important; }
          `}</style>
        </div>
        {/* Territory list */}
        <div className="space-y-1.5">
          {Data.territories.map((t, i) => {
            const attColor = t.attainment >= 80 ? '#12B76A' : t.attainment >= 65 ? '#F79009' : '#F04739';
            return (
              <button
                key={t.id}
                type="button"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => { setSelected(t.id); onTerritoryClick(t.name); }}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-lg border p-2.5 text-left transition cursor-pointer',
                  selected === t.id ? 'border-[var(--color-brand-300)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border-subtle)] hover:bg-[var(--surface-sunken)]'
                )}
              >
                <span className="inline-flex size-7 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-medium" style={{ background: `${attColor}1f`, color: attColor }}>
                  <Globe className="size-3.5" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-xs font-medium text-[var(--text-strong)]">{t.name}</p>
                    <span className="text-[10px] font-semibold tabular-nums" style={{ color: attColor }}>{t.attainment}%</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                    <span>{fmtMoney(t.closed)} closed</span>
                    <span>·</span>
                    <span>{fmtMoney(t.pipeline)} pipe</span>
                    <span>·</span>
                    <span className="truncate">{t.topRep.split(' ')[0]}</span>
                  </div>
                  {/* mini progress bar */}
                  <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                    <div className="h-full rounded-full" style={{ width: `${t.attainment}%`, background: attColor, transition: 'width 1s cubic-bezier(0.32, 0.72, 0, 1)' }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Selected territory footer */}
      {selectedTerritory && (
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3 text-xs sm:grid-cols-4">
          <div><span className="text-[var(--text-subtle)]">Selected</span><p className="font-medium text-[var(--text-strong)]">{selectedTerritory.name}</p></div>
          <div><span className="text-[var(--text-subtle)]">Closed won</span><p className="font-medium tabular-nums text-[var(--text-strong)]">{fmtMoney(selectedTerritory.closed)}</p></div>
          <div><span className="text-[var(--text-subtle)]">Pipeline</span><p className="font-medium tabular-nums text-[var(--text-strong)]">{fmtMoney(selectedTerritory.pipeline)}</p></div>
          <div><span className="text-[var(--text-subtle)]">Top rep</span><p className="font-medium text-[var(--text-strong)]">{selectedTerritory.topRep}</p></div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   Forecast Categories (layered bars)
   ============================================================ */
function ForecastCategoriesCard() {
  const total = Data.forecastCategories.reduce((sum, c) => sum + c.value, 0);
  const weekly = Data.forecastCategoryWeekly;
  const options: any = {
    chart: { type: 'bar', height: 280, stacked: true, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 700, dynamicAnimation: { enabled: true, speed: 300 } } },
    plotOptions: { bar: { horizontal: false, columnWidth: '42%', borderRadius: 4, borderRadiusApplication: 'end' } },
    colors: ['#12B76A', '#465FFF', '#7A5AF8', '#F79009'],
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 8, bottom: 0, left: 8 } },
    xaxis: {
      categories: weekly.map((w) => w.week),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' },
        formatter: (v: number) => `$${(v / 1000).toFixed(1)}M`,
      },
    },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, labels: { colors: 'var(--text-body)' }, markers: { size: 6, strokeWidth: 0, offsetX: -4 }, itemMargin: { horizontal: 10, vertical: 0 } },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }: any) => {
        const p = weekly[dataPointIndex];
        const totalWeek = p.closedWon + p.commit + p.bestCase + p.pipeline;
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:220px;">
          <div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.week} · Forecast Build</div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:5px 16px;font-size:12px;">
            <span style="color:var(--text-body);">Closed Won</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">$${(p.closedWon / 1000).toFixed(2)}M</span>
            <span style="color:var(--text-body);">Commit</span><span style="color:#465FFF;font-weight:600;font-variant-numeric:tabular-nums;">$${(p.commit / 1000).toFixed(2)}M</span>
            <span style="color:var(--text-body);">Best Case</span><span style="color:#7A5AF8;font-weight:600;font-variant-numeric:tabular-nums;">$${(p.bestCase / 1000).toFixed(2)}M</span>
            <span style="color:var(--text-body);">Pipeline</span><span style="color:#F79009;font-weight:600;font-variant-numeric:tabular-nums;">$${(p.pipeline / 1000).toFixed(2)}M</span>
            <span style="color:var(--text-body);border-top:1px solid var(--border-subtle);padding-top:5px;margin-top:2px;">Week total</span>
            <span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;border-top:1px solid var(--border-subtle);padding-top:5px;margin-top:2px;">$${(totalWeek / 1000).toFixed(2)}M</span>
          </div>
        </div>`;
      },
    },
    fill: { opacity: 1 },
  };
  const chartSeries = [
    { name: 'Closed Won', data: weekly.map((w) => w.closedWon) },
    { name: 'Commit', data: weekly.map((w) => w.commit) },
    { name: 'Best Case', data: weekly.map((w) => w.bestCase) },
    { name: 'Pipeline', data: weekly.map((w) => w.pipeline) },
  ];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Crosshair className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Forecast Categories</h2>
            <p className="text-xs text-[var(--text-muted)]">Layered weekly build — closed won → commit → best case → pipeline.</p>
          </div>
        </div>
        <CardActionMenu cardName="Forecast Categories" />
      </div>
      {/* Category strip */}
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Data.forecastCategories.map((c) => (
          <div key={c.name} className="rounded-xl border border-[var(--border-subtle)] p-2.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[var(--text-muted)]">
                <span className="size-2 rounded-sm" style={{ background: c.color }} />
                {c.name}
              </span>
              <span className="text-[9px] tabular-nums text-[var(--text-subtle)]">{c.deals} deals</span>
            </div>
            <p className="mt-1 text-base font-semibold tabular-nums text-[var(--text-strong)]">{fmtMoney(c.value)}</p>
            <p className="mt-0.5 text-[9px] text-[var(--text-muted)]">{c.description}</p>
          </div>
        ))}
      </div>
      {/* Stacked bar chart */}
      <Chart options={options} series={chartSeries} type="bar" height={280} />
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Total forecast: <span className="font-medium tabular-nums text-[var(--text-strong)]">{fmtMoney(total)}</span></span>
        <span className="inline-flex items-center gap-1 text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><ArrowUp className="size-3" strokeWidth={2.5} />+11.8% vs. last quarter</span>
      </div>
    </section>
  );
}

/* ============================================================
   Key Deals Board (strategic deal cards)
   ============================================================ */
function KeyDealsBoard({ onDealClick }: { onDealClick: (d: Data.KeyDeal) => void }) {
  const riskConfig = {
    low: { tone: 'success' as const, icon: CheckCircle2, label: 'Low risk' },
    medium: { tone: 'warning' as const, icon: AlertCircle, label: 'Med risk' },
    high: { tone: 'error' as const, icon: AlertTriangle, label: 'High risk' },
  };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#f5f3ff] text-[#7a5af8] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#a78bfa]">
            <Star className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Key Deals Board</h2>
            <p className="text-xs text-[var(--text-muted)]">Strategic deals — click for full detail drawer.</p>
          </div>
        </div>
        <CardActionMenu cardName="Key Deals" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Data.keyDeals.map((d) => {
          const rc = riskConfig[d.risk];
          const RIcon = rc.icon;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onDealClick(d)}
              className="group flex flex-col gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-4 text-left transition hover:border-[var(--color-brand-300)] hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--text-strong)]">{d.account}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Strategic · {d.territory} · {d.competitor} competing</p>
                </div>
                <StatusBadge tone={rc.tone} dot><RIcon className="size-2.5" strokeWidth={2.4} /></StatusBadge>
              </div>
              <div>
                <p className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{fmtMoney(d.value)}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{d.probability}% probability · {d.stage}</p>
              </div>
              {/* Probability bar */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                <div className="h-full rounded-full" style={{ width: `${d.probability}%`, background: `linear-gradient(90deg, #465FFF, #7A5AF8)`, transition: 'width 1s cubic-bezier(0.32, 0.72, 0, 1)' }} />
              </div>
              <div className="flex items-start gap-1.5 border-t border-[var(--border-subtle)] pt-2.5 text-[10px]">
                <Flag className="mt-0.5 size-3 flex-shrink-0 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" strokeWidth={2.2} />
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Next step</p>
                  <p className="text-[var(--text-body)]">{d.nextStep}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1"><CalendarDays className="size-2.5" strokeWidth={2.2} />{d.closeDate}</span>
                <span className="inline-flex items-center gap-1 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)] group-hover:underline">View <ArrowRight className="size-2.5" strokeWidth={2.4} /></span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Sales Activities (stacked timeline chart)
   ============================================================ */
function SalesActivitiesCard() {
  const weekly = Data.activityWeekly;
  const options: any = {
    chart: { type: 'bar', height: 300, stacked: true, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 700, dynamicAnimation: { enabled: true, speed: 300 } } },
    plotOptions: { bar: { horizontal: false, columnWidth: '52%', borderRadius: 3, borderRadiusApplication: 'end' } },
    colors: ['#465FFF', '#0BA5EC', '#12B76A', '#F79009', '#7A5AF8'],
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 8, bottom: 0, left: 8 } },
    xaxis: {
      categories: weekly.map((w) => w.week),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' },
        formatter: (v: number) => `${v}`,
      },
    },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, labels: { colors: 'var(--text-body)' }, markers: { size: 6, strokeWidth: 0, offsetX: -4 }, itemMargin: { horizontal: 10, vertical: 0 } },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }: any) => {
        const p = weekly[dataPointIndex];
        const total = p.calls + p.emails + p.demos + p.proposals + p.meetings;
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:240px;">
          <div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.week} · Activity Mix</div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:5px 16px;font-size:12px;">
            <span style="color:var(--text-body);">Calls</span><span style="color:#465FFF;font-weight:600;font-variant-numeric:tabular-nums;">${p.calls}</span>
            <span style="color:var(--text-body);">Emails</span><span style="color:#0BA5EC;font-weight:600;font-variant-numeric:tabular-nums;">${p.emails}</span>
            <span style="color:var(--text-body);">Demos</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">${p.demos}</span>
            <span style="color:var(--text-body);">Proposals</span><span style="color:#F79009;font-weight:600;font-variant-numeric:tabular-nums;">${p.proposals}</span>
            <span style="color:var(--text-body);">Meetings</span><span style="color:#7A5AF8;font-weight:600;font-variant-numeric:tabular-nums;">${p.meetings}</span>
            <span style="color:var(--text-body);border-top:1px solid var(--border-subtle);padding-top:5px;margin-top:2px;">Total activities</span>
            <span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;border-top:1px solid var(--border-subtle);padding-top:5px;margin-top:2px;">${total.toLocaleString()}</span>
            <span style="color:var(--text-body);">Conversion impact</span>
            <span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">${p.conversion}%</span>
          </div>
        </div>`;
      },
    },
    fill: { opacity: 1 },
  };
  const chartSeries = [
    { name: 'Calls', data: weekly.map((w) => w.calls) },
    { name: 'Emails', data: weekly.map((w) => w.emails) },
    { name: 'Demos', data: weekly.map((w) => w.demos) },
    { name: 'Proposals', data: weekly.map((w) => w.proposals) },
    { name: 'Meetings', data: weekly.map((w) => w.meetings) },
  ];

  const totals = {
    calls: weekly.reduce((s, w) => s + w.calls, 0),
    emails: weekly.reduce((s, w) => s + w.emails, 0),
    demos: weekly.reduce((s, w) => s + w.demos, 0),
    proposals: weekly.reduce((s, w) => s + w.proposals, 0),
    meetings: weekly.reduce((s, w) => s + w.meetings, 0),
  };
  const lastConv = weekly[weekly.length - 1].conversion;
  const firstConv = weekly[0].conversion;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]">
            <Activity className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Sales Activities</h2>
            <p className="text-xs text-[var(--text-muted)]">Weekly activity mix — hover for count and conversion impact.</p>
          </div>
        </div>
        <CardActionMenu cardName="Sales Activities" />
      </div>
      <div className="mb-3 grid grid-cols-5 gap-2">
        <div className="rounded-lg border border-[var(--border-subtle)] p-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Calls</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{totals.calls.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Emails</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--color-info-600)] dark:text-[var(--color-info-500)]">{totals.emails.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Demos</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{totals.demos.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Proposals</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">{totals.proposals.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2 text-center">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Meetings</p>
          <p className="text-sm font-semibold tabular-nums text-[#7a5af8]">{totals.meetings.toLocaleString()}</p>
        </div>
      </div>
      <Chart options={options} series={chartSeries} type="bar" height={300} />
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Conversion impact grew <span className="font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">+{(lastConv - firstConv).toFixed(1)}pp</span> across 8 weeks</span>
        <span className="inline-flex items-center gap-1 text-[var(--text-muted)]"><Zap className="size-3" strokeWidth={2.2} />Activities → conversions</span>
      </div>
    </section>
  );
}

/* ============================================================
   Deals Table (with search + filters + pagination + row click)
   ============================================================ */
function DealsTable({ deals, onRowClick }: { deals: SalesDeal[]; onRowClick: (d: SalesDeal) => void }) {
  const { toast } = useToast();
  const [search, setSearch] = React.useState('');
  const [stageFilter, setStageFilter] = React.useState('All');
  const [territoryFilter, setTerritoryFilter] = React.useState('All');
  const [ownerFilter, setOwnerFilter] = React.useState('All owners');
  const [page, setPage] = React.useState(1);
  const [stageOpen, setStageOpen] = React.useState(false);
  const [territoryOpen, setTerritoryOpen] = React.useState(false);
  const [ownerOpen, setOwnerOpen] = React.useState(false);
  const [actionMenuFor, setActionMenuFor] = React.useState<string | null>(null);
  const pageSize = 8;

  const stages = ['All', 'Prospecting', 'Discovery', 'Solution Fit', 'Proposal', 'Commit', 'Closed Won'];
  const territories = ['All', 'West', 'East', 'Central', 'EMEA', 'APAC'];

  const filtered = React.useMemo(() => {
    return deals.filter((d) => {
      if (stageFilter !== 'All' && d.stage !== stageFilter) return false;
      if (territoryFilter !== 'All' && d.territory !== territoryFilter) return false;
      if (ownerFilter !== 'All owners' && d.owner !== ownerFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!d.deal.toLowerCase().includes(q) && !d.account.toLowerCase().includes(q) && !d.owner.toLowerCase().includes(q) && !d.nextStep.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [deals, search, stageFilter, territoryFilter, ownerFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

  React.useEffect(() => { setPage(1); }, [search, stageFilter, territoryFilter, ownerFilter]);

  const riskTone = { low: 'success' as const, medium: 'warning' as const, high: 'error' as const };
  const stageColor: Record<string, string> = {
    Prospecting: '#465FFF', Discovery: '#0BA5EC', 'Solution Fit': '#12B76A', Proposal: '#F79009', Commit: '#7A5AF8', 'Closed Won': '#EC4899',
  };

  function handleAction(action: string, d: SalesDeal) {
    setActionMenuFor(null);
    toast({ title: `${action} — ${d.account}`, description: `${d.deal} · ${fmtMoney(d.value)}` });
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Briefcase className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Deals</h2>
            <p className="text-xs text-[var(--text-muted)]">All open and won deals — click row for detail drawer.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search deals..."
              className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)] sm:w-48"
            />
          </div>
          {/* Stage filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setStageOpen((p) => !p); setTerritoryOpen(false); setOwnerOpen(false); }}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            >
              <Layers className="size-3.5" strokeWidth={2.2} />Stage
              <ChevronDown className={cn('size-3 transition-transform', stageOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={stageOpen} onClose={() => setStageOpen(false)} align="right" width={150}>
              <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Stage</p></div>
              {stages.map((s) => (
                <PopoverItem key={s} active={stageFilter === s} onClick={() => { setStageFilter(s); setStageOpen(false); }}>{s}</PopoverItem>
              ))}
            </Popover>
          </div>
          {/* Territory filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setTerritoryOpen((p) => !p); setStageOpen(false); setOwnerOpen(false); }}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            >
              <MapPin className="size-3.5" strokeWidth={2.2} />Territory
              <ChevronDown className={cn('size-3 transition-transform', territoryOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={territoryOpen} onClose={() => setTerritoryOpen(false)} align="right" width={150}>
              <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Territory</p></div>
              {territories.map((t) => (
                <PopoverItem key={t} active={territoryFilter === t} onClick={() => { setTerritoryFilter(t); setTerritoryOpen(false); }}>{t}</PopoverItem>
              ))}
            </Popover>
          </div>
          {/* Owner filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setOwnerOpen((p) => !p); setStageOpen(false); setTerritoryOpen(false); }}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            >
              <Users className="size-3.5" strokeWidth={2.2} />Owner
              <ChevronDown className={cn('size-3 transition-transform', ownerOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={ownerOpen} onClose={() => setOwnerOpen(false)} align="right" width={180}>
              <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Owner</p></div>
              {Data.OWNERS.map((o) => (
                <PopoverItem key={o} active={ownerFilter === o} onClick={() => { setOwnerFilter(o); setOwnerOpen(false); }}>{o}</PopoverItem>
              ))}
            </Popover>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Deal</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Account</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Owner</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Territory</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Stage</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Value</th>
              <th className="py-2.5 px-2 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Probability</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Close date</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Risk</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Next step</th>
              <th className="py-2.5 pl-2 pr-1"></th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={11} className="py-12 text-center"><p className="text-sm font-medium text-[var(--text-strong)]">No deals found</p><p className="mt-1 text-xs text-[var(--text-muted)]">Try adjusting your search or filters.</p></td></tr>
            ) : paged.map((d) => (
              <tr
                key={d.id}
                onClick={() => onRowClick(d)}
                className="group cursor-pointer border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40"
              >
                <td className="py-3 pl-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Briefcase className="size-3" strokeWidth={2.2} /></span>
                    <span className="text-xs font-medium text-[var(--text-strong)]">{d.deal}</span>
                  </div>
                </td>
                <td className="py-3 px-2"><span className="text-xs text-[var(--text-body)]">{d.account}</span></td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1.5">
                    <UserAvatar name={d.owner} size="xs" />
                    <span className="text-[10px] text-[var(--text-muted)]">{d.owner.split(' ')[0]} {d.owner.split(' ')[1]?.[0]}.</span>
                  </div>
                </td>
                <td className="py-3 px-2"><span className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)]"><MapPin className="size-2.5" strokeWidth={2.2} />{d.territory}</span></td>
                <td className="py-3 px-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: `${stageColor[d.stage]}1f`, color: stageColor[d.stage] }}>
                    <span className="size-1.5 rounded-full" style={{ background: stageColor[d.stage] }} />
                    {d.stage}
                  </span>
                </td>
                <td className="py-3 px-2 text-right text-xs font-semibold tabular-nums text-[var(--text-strong)]">{fmtMoney(d.value)}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-12 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                      <div className="h-full rounded-full" style={{ width: `${d.probability}%`, background: stageColor[d.stage] }} />
                    </div>
                    <span className="text-[10px] tabular-nums text-[var(--text-muted)]">{d.probability}%</span>
                  </div>
                </td>
                <td className="py-3 px-2"><span className="text-[10px] text-[var(--text-muted)]">{d.closeDate}</span></td>
                <td className="py-3 px-2"><StatusBadge tone={riskTone[d.risk]} dot>{d.risk}</StatusBadge></td>
                <td className="py-3 px-2"><span className="text-[10px] text-[var(--text-body)]">{d.nextStep}</span></td>
                <td className="py-3 pl-2 pr-1 text-right">
                  <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setActionMenuFor(actionMenuFor === d.id ? null : d.id)}
                      className="flex size-6 cursor-pointer items-center justify-center rounded-md text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100"
                      aria-label={`Actions for ${d.account}`}
                    >
                      <MoreHorizontal className="size-3.5" strokeWidth={2.2} />
                    </button>
                    <Popover open={actionMenuFor === d.id} onClose={() => setActionMenuFor(null)} align="right" width={170}>
                      <PopoverItem icon={Eye} onClick={() => handleAction('View', d)}>View details</PopoverItem>
                      <PopoverItem icon={Mail} onClick={() => handleAction('Email owner', d)}>Email owner</PopoverItem>
                      <PopoverItem icon={Phone} onClick={() => handleAction('Log call', d)}>Log call</PopoverItem>
                      <PopoverItem icon={Calendar} onClick={() => handleAction('Schedule', d)}>Schedule follow-up</PopoverItem>
                      <div className="my-1 h-px bg-[var(--border-subtle)]" />
                      <PopoverItem icon={X} danger onClick={() => handleAction('Close lost', d)}>Mark as lost</PopoverItem>
                    </Popover>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Showing {paged.length} of {filtered.length} deals {filtered.length !== deals.length && `(filtered from ${deals.length})`}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="size-3 rotate-180" strokeWidth={2.5} />Prev
          </button>
          <span className="px-2 text-xs tabular-nums text-[var(--text-muted)]">{current} / {totalPages}</span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={current === totalPages}
            className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next<ChevronRight className="size-3" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   New Deal Drawer
   ============================================================ */
function NewDealDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (d: SalesDeal) => void }) {
  const [form, setForm] = React.useState({
    deal: '',
    account: '',
    owner: 'Darlene Robertson',
    stage: 'Discovery' as SalesDeal['stage'],
    value: '',
    probability: '35',
    closeDate: '',
    territory: 'West' as SalesDeal['territory'],
    nextStep: '',
  });

  React.useEffect(() => {
    if (!open) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  function handleSubmit() {
    if (!form.deal.trim() || !form.account.trim()) return;
    const newDeal: SalesDeal = {
      id: `sd-${Date.now()}`,
      deal: form.deal.trim(),
      account: form.account.trim(),
      owner: form.owner,
      stage: form.stage,
      value: parseInt(form.value, 10) || 0,
      probability: parseInt(form.probability, 10) || 0,
      closeDate: form.closeDate || 'TBD',
      risk: 'medium',
      nextStep: form.nextStep.trim() || 'Initial outreach',
      territory: form.territory,
      daysInStage: 0,
    };
    onCreate(newDeal);
    setForm({ deal: '', account: '', owner: 'Darlene Robertson', stage: 'Discovery', value: '', probability: '35', closeDate: '', territory: 'West', nextStep: '' });
    onClose();
  }

  const inputCls = 'h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]';
  const labelCls = 'mb-1.5 block text-xs font-medium text-[var(--text-body)]';

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="New deal">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white"><Plus className="size-4.5" strokeWidth={2.4} /></span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">New Deal</h3>
              <p className="text-xs text-[var(--text-muted)]">Add a new opportunity to the pipeline.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <div>
            <label className={labelCls}>Deal name <span className="text-[var(--color-error-600)]">*</span></label>
            <input type="text" value={form.deal} onChange={(e) => setForm({ ...form, deal: e.target.value })} placeholder="e.g. Enterprise Platform" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Account <span className="text-[var(--color-error-600)]">*</span></label>
            <input type="text" value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} placeholder="e.g. Acme Studio" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Owner</label>
              <select value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className={cn(inputCls, 'cursor-pointer')}>
                <option>Darlene Robertson</option>
                <option>Kristin Watson</option>
                <option>Albert Flores</option>
                <option>Devon Lane</option>
                <option>Jane Cooper</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Stage</label>
              <select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value as SalesDeal['stage'] })} className={cn(inputCls, 'cursor-pointer')}>
                <option>Prospecting</option>
                <option>Discovery</option>
                <option>Solution Fit</option>
                <option>Proposal</option>
                <option>Commit</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Value ($)</label>
              <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="e.g. 84000" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Probability (%)</label>
              <input type="number" min="0" max="100" value={form.probability} onChange={(e) => setForm({ ...form, probability: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Close date</label>
              <input type="date" value={form.closeDate} onChange={(e) => setForm({ ...form, closeDate: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Territory</label>
              <select value={form.territory} onChange={(e) => setForm({ ...form, territory: e.target.value as SalesDeal['territory'] })} className={cn(inputCls, 'cursor-pointer')}>
                <option>West</option>
                <option>East</option>
                <option>Central</option>
                <option>EMEA</option>
                <option>APAC</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Next step</label>
            <textarea value={form.nextStep} onChange={(e) => setForm({ ...form, nextStep: e.target.value })} rows={3} placeholder="e.g. Schedule discovery call" className={cn(inputCls, 'h-auto resize-none p-3')} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Cancel</button>
          <button type="button" onClick={handleSubmit} disabled={!form.deal.trim() || !form.account.trim()} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50">Create deal</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Deal Detail Drawer
   ============================================================ */
function DealDetailDrawer({ deal, onClose }: { deal: SalesDeal | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!deal) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [deal, onClose]);

  if (!deal || typeof document === 'undefined') return null;
  const riskTone = { low: 'success' as const, medium: 'warning' as const, high: 'error' as const };
  const stageColor: Record<string, string> = {
    Prospecting: '#465FFF', Discovery: '#0BA5EC', 'Solution Fit': '#12B76A', Proposal: '#F79009', Commit: '#7A5AF8', 'Closed Won': '#EC4899',
  };

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Deal detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl text-white" style={{ background: stageColor[deal.stage] }}><Briefcase className="size-4.5" strokeWidth={2.2} /></span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">{deal.account}</h3>
              <p className="text-xs text-[var(--text-muted)]">{deal.deal} · {fmtMoney(deal.value)} · {deal.stage}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Owner</p><p className="text-sm font-medium text-[var(--text-strong)]">{deal.owner}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Territory</p><p className="text-sm font-medium text-[var(--text-strong)]">{deal.territory}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Value</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{fmtMoney(deal.value)}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Probability</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{deal.probability}%</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Risk</p><div className="mt-0.5"><StatusBadge tone={riskTone[deal.risk]} dot>{deal.risk}</StatusBadge></div></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Days in stage</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{deal.daysInStage}d</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Stage</p><p className="text-sm font-medium text-[var(--text-strong)]">{deal.stage}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Close date</p><p className="text-sm font-medium text-[var(--text-strong)]">{deal.closeDate}</p></div>
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] p-3">
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Next step</p>
            <p className="mt-1 text-sm text-[var(--text-body)]">{deal.nextStep}</p>
          </div>
          {/* Probability gauge */}
          <div className="rounded-xl border border-[var(--border-subtle)] p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Win probability</p>
              <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{deal.probability}%</p>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
              <div className="h-full rounded-full" style={{ width: `${deal.probability}%`, background: `linear-gradient(90deg, ${stageColor[deal.stage]}, #7A5AF8)`, transition: 'width 1s cubic-bezier(0.32, 0.72, 0, 1)' }} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Mail className="size-3.5" strokeWidth={2.2} />Email owner</button>
          <button type="button" className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"><Calendar className="size-3.5" strokeWidth={2.2} />Schedule</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Main Sales Dashboard export
   ============================================================ */
export function SalesDashboard() {
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [deals, setDeals] = React.useState<SalesDeal[]>(Data.salesDeals);
  const [selectedDeal, setSelectedDeal] = React.useState<SalesDeal | null>(null);

  // External filter drivers (set by stage board click / territory map click)
  const [stageFilter, setStageFilter] = React.useState('All');
  const [territoryFilter, setTerritoryFilter] = React.useState('All');

  function handleCreateDeal(d: SalesDeal) {
    setDeals((prev) => [d, ...prev]);
    toast({ title: 'Deal created', description: `${d.account} — ${d.deal} · ${fmtMoney(d.value)}` });
  }
  function handleStageClick(stage: string) {
    setStageFilter(stage);
    toast({ title: `Filtered by stage: ${stage}`, description: 'Deals table updated below.' });
  }
  function handleTerritoryClick(t: string) {
    setTerritoryFilter(t);
    toast({ title: `Filtered by territory: ${t}`, description: 'Deals table updated below.' });
  }

  // Filter the deals list using the external filter state (so the DealsTable picks them up
  // via its `deals` prop). We pass filtered deals + initial filter override.
  const visibleDeals = React.useMemo(() => {
    return deals.filter((d) => {
      if (stageFilter !== 'All' && d.stage !== stageFilter) return false;
      if (territoryFilter !== 'All' && d.territory !== territoryFilter) return false;
      return true;
    });
  }, [deals, stageFilter, territoryFilter]);

  // We render a custom variant of the DealsTable that respects our external filters.
  // The DealsTable component already supports search + its own stage/territory filters
  // on top of the deals it receives — so passing a pre-filtered list gives the right
  // composition (external filter + internal filter).
  return (
    <div className="space-y-6">
      <SalesHeader onNewDeal={() => setDrawerOpen(true)} />

      {/* Hero: Quota & Forecast (large) + right rail (Close Plan + Deal Risk) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <QuotaForecastHero />
        <div className="flex flex-col gap-5">
          <ClosePlanCard />
          <DealRiskSnapshotCard />
        </div>
      </div>

      {/* Pipeline Stage Board (full width) */}
      <PipelineStageBoard onStageClick={handleStageClick} />

      {/* Deal Velocity + Rep Performance */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <DealVelocityCard />
        <RepPerformanceArena />
      </div>

      {/* Territory Map (full width, real jvectormap) */}
      <TerritoryMapCard onTerritoryClick={handleTerritoryClick} />

      {/* Forecast Categories + Key Deals */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ForecastCategoriesCard />
        <KeyDealsBoard onDealClick={(d) => {
          // Find matching SalesDeal from table by account to open row drawer
          const matching = deals.find((x) => x.account === d.account);
          if (matching) setSelectedDeal(matching);
          else toast({ title: d.account, description: `${d.stage} · ${fmtMoney(d.value)} · ${d.nextStep}` });
        }} />
      </div>

      {/* Sales Activities (full width) */}
      <SalesActivitiesCard />

      {/* Deals table */}
      <DealsTable
        deals={visibleDeals}
        onRowClick={(d) => setSelectedDeal(d)}
      />

      {/* External filter reset banner */}
      {(stageFilter !== 'All' || territoryFilter !== 'All') && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--color-brand-200,rgba(70,95,255,0.3))] bg-[var(--color-brand-50)]/60 p-3 text-xs dark:bg-[rgba(70,95,255,0.08)]">
          <span className="inline-flex items-center gap-2 text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">
            <Filter className="size-3.5" strokeWidth={2.2} />
            Deals table filtered by: {stageFilter !== 'All' && <StatusBadge tone="brand">{stageFilter}</StatusBadge>} {territoryFilter !== 'All' && <StatusBadge tone="info">{territoryFilter}</StatusBadge>}
          </span>
          <button
            type="button"
            onClick={() => { setStageFilter('All'); setTerritoryFilter('All'); toast({ title: 'Filters cleared' }); }}
            className="inline-flex h-7 cursor-pointer items-center gap-1 rounded-lg border border-[var(--color-brand-300)] bg-[var(--card)] px-2.5 text-[11px] font-medium text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)] transition hover:bg-[var(--color-brand-50)]"
          >
            <X className="size-3" strokeWidth={2.4} />Clear filters
          </button>
        </div>
      )}

      {/* Drawers */}
      <NewDealDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onCreate={handleCreateDeal} />
      <DealDetailDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
    </div>
  );
}
