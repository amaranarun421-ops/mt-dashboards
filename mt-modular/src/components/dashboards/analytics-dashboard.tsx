'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, MoreHorizontal,
  Eye, Users, Clock, Globe, Smartphone, Monitor, Tablet, Activity, Zap, TrendingUp,
  TrendingDown, AlertTriangle, AlertCircle, Info, Star, MousePointerClick, Repeat,
  FileText, Heart, Filter, MapPin, Bell, RefreshCw, Link2, Search, Gauge,
  LogIn, UserPlus, FileCheck, Target, Home, BookOpen, DollarSign, Play, DownloadCloud,
  X, ExternalLink, Navigation, Layers, Eye as EyeIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import * as Data from './analytics-data';
import { Popover, PopoverItem, DATE_PRESETS, exportAnalyticsCsv } from './analytics-interactions';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const VectorMap = dynamic(
  () => import('@react-jvectormap/core').then((mod: any) => mod.VectorMap),
  { ssr: false, loading: () => <div className="flex h-full min-h-[300px] items-center justify-center"><div className="size-8 animate-spin rounded-full border-2 border-[var(--color-brand-500)] border-t-transparent" /></div> },
);
import { worldMill } from '@react-jvectormap/world';

/* ============================================================
   CardActionMenu — three-dot menu shared by all cards
   ============================================================ */
function CardActionMenu({ cardName }: { cardName: string }) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  function handleAction(action: string) {
    setOpen(false);
    const messages: Record<string, string> = {
      view: `Viewing ${cardName} details`,
      download: `${cardName} chart downloaded`,
      copy: `${cardName} report link copied to clipboard`,
    };
    toast({ title: messages[action] || 'Action completed' });
  }
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((p) => !p)} className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label={`Actions for ${cardName}`}>
        <MoreHorizontal className="size-4" strokeWidth={2.2} />
      </button>
      <Popover open={open} onClose={() => setOpen(false)} align="right" width={180}>
        <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{cardName}</p></div>
        <PopoverItem icon={Eye} onClick={() => handleAction('view')}>View details</PopoverItem>
        <PopoverItem icon={Download} onClick={() => handleAction('download')}>Download chart</PopoverItem>
        <PopoverItem icon={Link2} onClick={() => handleAction('copy')}>Copy report link</PopoverItem>
      </Popover>
    </div>
  );
}

/* ============================================================
   Analytics Header
   ============================================================ */
function AnalyticsHeader({ range, onRangeChange }: { range: '24h' | '7d' | '30d' | '90d'; onRangeChange: (r: '24h' | '7d' | '30d' | '90d') => void }) {
  const { toast } = useToast();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState('30d');
  const [dateLabel, setDateLabel] = React.useState('May 24 – Jun 23, 2026');

  function handlePreset(key: string) {
    setSelectedPreset(key);
    const preset = DATE_PRESETS.find((p) => p.key === key);
    if (preset) setDateLabel(preset.range);
    setDateOpen(false);
    toast({ title: 'Date range updated', description: preset?.label });
  }
  function handleExport(format: 'csv' | 'pdf' | 'xls') {
    setExportOpen(false);
    if (format === 'csv') {
      exportAnalyticsCsv(Data.realtimeSessions, 'analytics-sessions');
      toast({ title: 'CSV exported', description: `${Data.realtimeSessions.length} sessions downloaded` });
    } else {
      toast({ title: `${format.toUpperCase()} export prepared`, description: `Your ${format.toUpperCase()} report is being generated.` });
    }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>Dashboards</span><ChevronRight className="size-3 text-[var(--text-faint)]" />
          <span className="text-[var(--text-strong)]">Analytics</span>
        </nav>
        <h1 className="ds-page-title">Audience Intelligence</h1>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">Decode traffic quality, user journeys, engagement depth, and live behavior.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] px-2.5 py-1.5 dark:bg-[rgba(18,183,106,0.1)]">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" /></span>
          <span className="text-xs font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live tracking · synced 1 min ago</span>
        </div>
        <div className="inline-flex items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
          {(['24h', '7d', '30d', '90d'] as const).map((r) => (
            <button key={r} type="button" onClick={() => onRangeChange(r)} data-active={range === r} className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition data-[active=true]:bg-[var(--card)] data-[active=true]:text-[var(--text-strong)] data-[active=true]:shadow-sm text-[var(--text-muted)] hover:text-[var(--text-strong)]">{r}</button>
          ))}
        </div>
        <div className="relative">
          <button type="button" onClick={() => { setDateOpen((p) => !p); setExportOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="dialog" aria-expanded={dateOpen}>
            <CalendarDays className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{dateLabel}</span><span className="sm:hidden">Date</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', dateOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={dateOpen} onClose={() => setDateOpen(false)} width={240}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Date range</p></div>
            {DATE_PRESETS.map((p) => (<PopoverItem key={p.key} active={selectedPreset === p.key} onClick={() => handlePreset(p.key)}>{p.label}</PopoverItem>))}
            <div className="my-1 h-px bg-[var(--border-subtle)]" />
            <div className="px-2.5 py-2"><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Selected</p><p className="mt-0.5 text-xs text-[var(--text-body)]">{dateLabel}</p></div>
          </Popover>
        </div>
        <div className="relative">
          <button type="button" onClick={() => { setExportOpen((p) => !p); setDateOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="menu" aria-expanded={exportOpen}>
            <Download className="size-4 text-[var(--text-muted)]" strokeWidth={2} />Export
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', exportOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={exportOpen} onClose={() => setExportOpen(false)} width={180}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export format</p></div>
            <PopoverItem icon={Download} onClick={() => handleExport('csv')}>Export CSV</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('pdf')}>Export PDF</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('xls')}>Export XLS</PopoverItem>
          </Popover>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Audience Pulse Hero — traffic observatory
   ============================================================ */
function AudiencePulseHero({ range }: { range: '24h' | '7d' | '30d' | '90d' }) {
  const series = Data.trafficSeries[range];
  const options: any = {
    chart: { type: 'area', height: 340, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 900, animateGradually: { enabled: true, delay: 60 }, dynamicAnimation: { enabled: true, speed: 350 } } },
    colors: ['#465FFF', '#12B76A', '#0BA5EC'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [3, 2, 2] },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.32, opacityTo: 0.04, stops: [0, 100] } },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 8, bottom: 0, left: 8 } },
    xaxis: { categories: series.map((p) => p.date), labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' }, rotate: 0, trim: true, hideOverlappingLabels: true }, axisBorder: { show: false }, axisTicks: { show: false }, crosshairs: { stroke: { color: 'var(--color-brand-500)', width: 1, dashArray: 4 }, fill: { type: 'solid', color: 'var(--color-brand-500)', opacity: 0.05 } } },
    yaxis: { labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' }, formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v}` } },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, labels: { colors: 'var(--text-body)' }, markers: { size: 6, strokeWidth: 0, offsetX: -4 }, itemMargin: { horizontal: 12, vertical: 0 } },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }: any) => {
        const p = series[dataPointIndex];
        const annotationNote = p.annotation ? `<div style="display:flex;align-items:center;gap:6px;margin-top:6px;padding:4px 8px;border-radius:6px;background:rgba(70,95,255,0.12);color:#465FFF;font-size:10px;font-weight:500;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>${p.annotation}</div>` : '';
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:200px;"><div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.date}</div><div style="display:grid;grid-template-columns:1fr auto;gap:4px 16px;font-size:12px;"><span style="color:var(--text-body);">Visitors</span><span style="color:#465FFF;font-weight:600;font-variant-numeric:tabular-nums;">${p.visitors.toLocaleString()}</span><span style="color:var(--text-body);">Sessions</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">${p.sessions.toLocaleString()}</span><span style="color:var(--text-body);">Pageviews</span><span style="color:#0BA5EC;font-weight:600;font-variant-numeric:tabular-nums;">${p.pageviews.toLocaleString()}</span><span style="color:var(--text-body);">Bounce rate</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">${p.bounceRate}%</span><span style="color:var(--text-body);">Avg duration</span><span style="color:var(--text-strong);font-weight:600;">${p.avgDuration}</span></div>${annotationNote}</div>`;
      },
    },
    markers: { size: 0, hover: { size: 6, sizeOffset: 3 }, strokeColors: 'var(--card)', strokeWidth: 2 },
    annotations: { xaxis: series.filter((p) => p.annotation).map((p) => { const colors: Record<string, string> = { 'Product Hunt launch': '#F79009', 'Newsletter campaign': '#7A5AF8', 'Docs update': '#12B76A' }; return { x: p.date, borderColor: colors[p.annotation!] || '#465FFF', label: { text: p.annotation, orientation: 'vertical', position: 'top', style: { background: colors[p.annotation!] || '#465FFF', color: '#fff', fontSize: '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, padding: { left: 6, right: 6, top: 3, bottom: 3 }, borderRadius: 4 } } }; }) },
  };
  const chartSeries = [
    { name: 'Visitors', data: series.map((p) => p.visitors) },
    { name: 'Sessions', data: series.map((p) => p.sessions) },
    { name: 'Pageviews', data: series.map((p) => p.pageviews) },
  ];
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Activity className="size-5" strokeWidth={2} /></span>
            <div>
              <h2 className="text-base font-medium text-[var(--text-strong)]">Audience Pulse</h2>
              <p className="text-xs text-[var(--text-muted)]">Traffic observatory — visitors, sessions, pageviews over time.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" /></span>Live</span>
          <CardActionMenu cardName="Audience Pulse" />
        </div>
      </div>
      {/* Compact metric overlay */}
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Visitors</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-[var(--text-strong)]">{Data.audiencePulse.visitors.toLocaleString()}</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><ArrowUp className="size-3" strokeWidth={2.5} />{Data.audiencePulse.visitorsChange}</span>
          </div>
        </div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Sessions</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.audiencePulse.sessions.toLocaleString()}</p></div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Pageviews</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.audiencePulse.pageviews.toLocaleString()}</p></div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Avg duration</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.audiencePulse.avgDuration}</p></div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Bounce rate</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.trafficQuality.bounceRate}%</p></div>
      </div>
      <Chart options={options} series={chartSeries} type="area" height={340} />
      <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--color-brand-200,rgba(70,95,255,0.3))] bg-[var(--color-brand-50)]/60 p-3 dark:bg-[rgba(70,95,255,0.08)]">
        <Info className="mt-0.5 size-4 flex-shrink-0 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" strokeWidth={2.2} />
        <p className="text-xs text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">{Data.audiencePulse.insight}</p>
      </div>
    </section>
  );
}

/* ============================================================
   Live Intelligence Rail — 3 stacked compact cards
   ============================================================ */
function LiveSparkline({ data, color = '#465FFF', height = 32, width = 100 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const id = React.useId();
  const max = Math.max(...data), min = Math.min(...data), rangeVal = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const toX = (i: number) => i * step;
  const toY = (v: number) => height - ((v - min) / rangeVal) * (height - 4) - 2;
  const points = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaPath = `M 0,${height} L ${points} L ${width},${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs><linearGradient id={`ls-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.22" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={areaPath} fill={`url(#ls-${id})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray="100" strokeDashoffset="100"><animate attributeName="stroke-dashoffset" from="100" to="0" dur="900ms" fill="freeze" begin="100ms" /></polyline>
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="2.5" fill={color}><animate attributeName="r" values="2.5;4;2.5" dur="2.4s" repeatCount="indefinite" /></circle>
    </svg>
  );
}

function LiveNowCard() {
  return (
    <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Users className="size-4" strokeWidth={2} /></span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Live Now</h3>
        </div>
        <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" /></span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{Data.liveNow.activeVisitors.toLocaleString()}</p>
          <p className="text-[10px] text-[var(--text-muted)]">active visitors</p>
        </div>
        <LiveSparkline data={Data.liveNow.sparkline} color="#465FFF" height={32} width={90} />
      </div>
      <div className="mt-2.5 grid grid-cols-1 gap-1 border-t border-[var(--border-subtle)] pt-2.5 text-xs">
        <div className="flex items-center justify-between"><span className="flex items-center gap-1 text-[var(--text-muted)]"><Globe className="size-3" strokeWidth={2.2} />Top source</span><span className="font-medium text-[var(--text-strong)]">{Data.liveNow.topSource}</span></div>
        <div className="flex items-center justify-between"><span className="flex items-center gap-1 text-[var(--text-muted)]"><FileText className="size-3" strokeWidth={2.2} />Top page</span><span className="font-medium text-[var(--text-body)]">{Data.liveNow.topPage}</span></div>
        <div className="flex items-center justify-between"><span className="flex items-center gap-1 text-[var(--text-muted)]"><MapPin className="size-3" strokeWidth={2.2} />Top country</span><span className="font-medium text-[var(--text-body)]">{Data.liveNow.topCountry}</span></div>
      </div>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-2.5 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-2.5 text-center">
            <div><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">New</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{Data.liveNow.newVisitors}</p></div>
            <div><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Returning</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{Data.liveNow.returningVisitors}</p></div>
            <div><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Countries</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{Data.liveNow.activeCountries}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniRadial({ value, color, label, icon: Icon }: { value: number; color: string; label: string; icon: React.ElementType }) {
  const r = 22, circumference = 2 * Math.PI * r, offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
          <circle cx="28" cy="28" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth="5" />
          <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}><animate attributeName="stroke-dashoffset" from={circumference} to={offset} dur="900ms" fill="freeze" /></circle>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center"><Icon className="size-3.5" style={{ color }} strokeWidth={2.2} /></div>
      </div>
      <p className="mt-1 text-[10px] font-medium tabular-nums text-[var(--text-strong)]">{value}%</p>
      <p className="text-[9px] text-[var(--text-muted)]">{label}</p>
    </div>
  );
}

function TrafficQualityCard() {
  return (
    <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><Gauge className="size-4" strokeWidth={2} /></span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Traffic Quality</h3>
        </div>
        <CardActionMenu cardName="Traffic Quality" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MiniRadial value={100 - Data.trafficQuality.bounceRate} color="#12B76A" label="Engaged" icon={Activity} />
        <MiniRadial value={Data.trafficQuality.avgScrollDepth} color="#465FFF" label="Scroll" icon={Eye} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-2.5 text-xs">
        <div><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Engaged sessions</p><p className="font-medium tabular-nums text-[var(--text-strong)]">{Data.trafficQuality.engagedSessions.toLocaleString()}</p></div>
        <div><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Pages/session</p><p className="font-medium tabular-nums text-[var(--text-strong)]">{Data.trafficQuality.pagesPerSession}</p></div>
      </div>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-2.5 space-y-1.5 border-t border-[var(--border-subtle)] pt-2.5">
            <div className="flex items-center justify-between text-xs"><span className="flex items-center gap-1 text-[var(--text-muted)]"><Monitor className="size-3" strokeWidth={2.2} />Desktop bounce</span><span className="font-medium tabular-nums text-[var(--text-body)]">{Data.trafficQuality.desktopBounce}%</span></div>
            <div className="flex items-center justify-between text-xs"><span className="flex items-center gap-1 text-[var(--text-muted)]"><Smartphone className="size-3" strokeWidth={2.2} />Mobile bounce</span><span className="font-medium tabular-nums text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">{Data.trafficQuality.mobileBounce}%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnomalySnapshotCard() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><Bell className="size-4" strokeWidth={2} /></span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Anomaly Snapshot</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-[var(--color-warning-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">{Data.anomalies.length} alerts</span>
      </div>
      <div className="space-y-1.5">
        {Data.anomalies.slice(0, 3).map((a) => (
          <div key={a.id} className={cn('flex items-center gap-2 rounded-lg border-l-2 p-2 text-xs',
            a.severity === 'critical' ? 'border-l-[var(--color-error-500)] bg-[var(--color-error-50)]/40 dark:bg-[rgba(240,68,56,0.06)]' :
            a.severity === 'warning' ? 'border-l-[var(--color-warning-500)] bg-[var(--color-warning-50)]/40 dark:bg-[rgba(247,144,9,0.06)]' :
            'border-l-[var(--color-info-500)] bg-[var(--color-info-50)]/40 dark:bg-[rgba(11,165,236,0.06)]'
          )}>
            {a.severity === 'critical' ? <AlertCircle className="size-3.5 flex-shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" strokeWidth={2.2} /> :
             a.severity === 'warning' ? <AlertTriangle className="size-3.5 flex-shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" strokeWidth={2.2} /> :
             <Info className="size-3.5 flex-shrink-0 text-[var(--color-info-600)] dark:text-[var(--color-info-500)]" strokeWidth={2.2} />}
            <span className="flex-1 truncate text-[var(--text-body)]">{a.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Signal Strip — unique chips, not KPI cards
   ============================================================ */
function SignalStrip() {
  const iconMap = { new: Users, returning: Repeat, signup: Star, mobile: Smartphone, engagement: Clock };
  const colorMap = {
    up: 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]',
    down: 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]',
    warning: 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]',
  };
  return (
    <div className="flex flex-wrap gap-2">
      {Data.signals.map((sig) => {
        const Icon = iconMap[sig.icon];
        const colors = colorMap[sig.trend];
        return (
          <div key={sig.id} className="group relative flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 transition hover:border-[var(--border-strong)] hover:shadow-sm" title={sig.tooltip}>
            <span className={cn('inline-flex size-7 flex-shrink-0 items-center justify-center rounded-lg',
              sig.trend === 'warning' ? 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]'
              : sig.trend === 'up' ? 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]'
              : 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]'
            )}><Icon className="size-3.5" strokeWidth={2.2} /></span>
            <div className="min-w-0">
              <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{sig.label}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{sig.value}</span>
                <span className={cn('inline-flex items-center gap-0.5 text-[10px] font-medium', colors)}>
                  {sig.trend === 'up' && <ArrowUp className="size-2.5" strokeWidth={2.5} />}
                  {sig.trend === 'down' && <ArrowDown className="size-2.5" strokeWidth={2.5} />}
                  {sig.trend === 'warning' && <AlertTriangle className="size-2.5" strokeWidth={2.5} />}
                  {sig.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   Visitor Journey Flow — flow diagram with nodes + connectors
   ============================================================ */
function VisitorJourneyFlow() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const max = Data.funnelStages[0].count;
  const stageIcons = { landing: Home, engaged: Activity, keypage: Eye, 'signup-start': UserPlus, 'signup-done': FileCheck, activated: Zap, goal: Target };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"><Navigation className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Visitor Journey Flow</h2>
            <p className="text-xs text-[var(--text-muted)]">User flow from landing to goal completion — node width represents drop-off.</p>
          </div>
        </div>
        <CardActionMenu cardName="Visitor Journey" />
      </div>
      {/* Horizontal flow diagram */}
      <div className="overflow-x-auto">
        <div className="flex min-w-[760px] items-start gap-0">
          {Data.funnelStages.map((stage, i) => {
            const Icon = stageIcons[stage.icon];
            const prev = i === 0 ? stage.count : Data.funnelStages[i - 1].count;
            const conv = i === 0 ? 100 : (stage.count / Data.funnelStages[0].count) * 100;
            const stepConv = i === 0 ? 100 : (stage.count / prev) * 100;
            const dropOff = i === 0 ? 0 : 100 - stepConv;
            const isHighDropOff = dropOff > 40;
            const isLast = i === Data.funnelStages.length - 1;
            return (
              <React.Fragment key={stage.name}>
                <div
                  className="flex flex-1 flex-col items-center"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Node */}
                  <div
                    className={cn('relative flex flex-col items-center rounded-2xl border-2 p-3 transition-all',
                      hovered === i ? 'scale-105 border-[var(--color-brand-400)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border-subtle)] bg-[var(--card)]'
                    )}
                    style={{ width: 110 }}
                  >
                    <span className="mb-1.5 inline-flex size-9 items-center justify-center rounded-xl text-white" style={{ background: stage.color }}>
                      <Icon className="size-4.5" strokeWidth={2} />
                    </span>
                    <p className="text-center text-[10px] font-medium leading-tight text-[var(--text-strong)]">{stage.name}</p>
                    <p className="mt-1 text-base font-semibold tabular-nums text-[var(--text-strong)]">{stage.count.toLocaleString()}</p>
                    <p className="text-[9px] tabular-nums text-[var(--text-muted)]">{conv.toFixed(1)}% of total</p>
                    {isHighDropOff && (
                      <span className="absolute -right-1 -top-1 inline-flex items-center gap-0.5 rounded-full bg-[var(--color-warning-50)] px-1.5 py-0.5 text-[8px] font-medium text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)] shadow-sm">
                        <AlertTriangle className="size-2" strokeWidth={2.5} />Drop
                      </span>
                    )}
                    {/* Hover tooltip */}
                    {hovered === i && (
                      <div className="absolute -top-32 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2.5 text-xs shadow-lg" style={{ animation: 'ecomPopoverIn 160ms ease-out' }}>
                        <p className="font-medium text-[var(--text-strong)]">{stage.name}</p>
                        <div className="mt-1 space-y-0.5 text-[10px]">
                          <p className="text-[var(--text-muted)]">Count: <span className="font-medium tabular-nums text-[var(--text-strong)]">{stage.count.toLocaleString()}</span></p>
                          <p className="text-[var(--text-muted)]">Conversion: <span className="font-medium tabular-nums text-[var(--text-strong)]">{conv.toFixed(1)}%</span></p>
                          {i > 0 && <p className="text-[var(--text-muted)]">Drop-off: <span className={cn('font-medium tabular-nums', isHighDropOff ? 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]' : 'text-[var(--text-body)]')}>{dropOff.toFixed(1)}%</span></p>}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Drop-off indicator below node */}
                  {i > 0 && (
                    <div className="mt-2 text-center">
                      <p className={cn('text-[10px] font-medium tabular-nums', isHighDropOff ? 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]' : 'text-[var(--text-subtle)]')}>−{dropOff.toFixed(1)}%</p>
                    </div>
                  )}
                </div>
                {/* Connector — width represents flow thickness */}
                {!isLast && (
                  <div className="flex items-center pt-8" style={{ width: 40 }}>
                    <svg width="40" height="60" viewBox="0 0 40 60" className="overflow-visible">
                      <defs>
                        <linearGradient id={`flow-${i}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={Data.funnelStages[i].color} stopOpacity="0.5" />
                          <stop offset="100%" stopColor={Data.funnelStages[i + 1].color} stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                      {/* Thick connector representing flow volume */}
                      <path
                        d={`M 0 ${30 - (stage.count / max) * 22} L 40 ${30 - (Data.funnelStages[i + 1].count / max) * 22} L 40 ${30 + (Data.funnelStages[i + 1].count / max) * 22} L 0 ${30 + (stage.count / max) * 22} Z`}
                        fill={`url(#flow-${i})`}
                        opacity={hovered === i || hovered === i + 1 ? 0.8 : 0.4}
                        style={{ transition: 'opacity 200ms ease' }}
                      />
                      {/* Arrow */}
                      <path d="M 30 30 L 36 30 M 33 27 L 36 30 L 33 33" stroke={Data.funnelStages[i + 1].color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className="mt-4 flex items-start gap-2 border-t border-[var(--border-subtle)] pt-3 text-xs">
        <AlertCircle className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" strokeWidth={2.2} />
        <p className="text-[var(--text-muted)]">{Data.funnelInsight}</p>
      </div>
    </section>
  );
}

/* ============================================================
   Source Quality Matrix — scatter/quadrant bubble chart
   ============================================================ */
function SourceQualityMatrix() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const maxSessions = Math.max(...Data.channels.map((c) => c.sessions));
  const maxConv = Math.max(...Data.channels.map((c) => c.conversion));
  // Chart area dimensions
  const W = 520, H = 280, padL = 40, padR = 20, padT = 20, padB = 40;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const toX = (sessions: number) => padL + (sessions / maxSessions) * innerW;
  const toY = (conv: number) => padT + innerH - (conv / maxConv) * innerH;
  // Quadrant midpoints
  const midX = padL + innerW / 2;
  const midY = padT + innerH / 2;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-violet-50,#f5f3ff)] text-[#7a5af8] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#a78bfa]"><Layers className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Source Quality Matrix</h2>
            <p className="text-xs text-[var(--text-muted)]">Channels plotted by volume (X) vs conversion (Y). Bubble size = avg duration.</p>
          </div>
        </div>
        <CardActionMenu cardName="Source Quality" />
      </div>
      <div className="overflow-x-auto">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ minWidth: 520, height: 280 }}>
          {/* Quadrant background fills */}
          <rect x={padL} y={padT} width={midX - padL} height={midY - padT} fill="rgba(18,183,106,0.04)" />
          <rect x={midX} y={padT} width={padR + innerW / 2 - padR} height={midY - padT} fill="rgba(70,95,255,0.04)" />
          <rect x={padL} y={midY} width={midX - padL} height={padB + innerH / 2 - padB} fill="rgba(247,144,9,0.04)" />
          <rect x={midX} y={midY} width={padR + innerW / 2 - padR} height={padB + innerH / 2 - padB} fill="rgba(240,68,56,0.04)" />
          {/* Quadrant divider lines */}
          <line x1={midX} y1={padT} x2={midX} y2={H - padB} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1={padL} y1={midY} x2={W - padR} y2={midY} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 4" />
          {/* Axes */}
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--border)" strokeWidth="1.5" />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--border)" strokeWidth="1.5" />
          {/* Axis labels */}
          <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontFamily="Outfit, sans-serif">Sessions (volume)</text>
          <text x={12} y={H / 2} textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontFamily="Outfit, sans-serif" transform={`rotate(-90 12 ${H / 2})`}>Conversion rate</text>
          {/* Quadrant labels */}
          <text x={padL + 8} y={padT + 14} fontSize="9" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500">Low vol / High quality</text>
          <text x={midX + 8} y={padT + 14} fontSize="9" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500">High vol / High quality</text>
          <text x={padL + 8} y={H - padB - 6} fontSize="9" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500">Low vol / Low quality</text>
          <text x={midX + 8} y={H - padB - 6} fontSize="9" fill="var(--text-subtle)" fontFamily="Outfit, sans-serif" fontWeight="500">High vol / Low quality</text>
          {/* Bubbles */}
          {Data.channels.map((ch, i) => {
            const x = toX(ch.sessions);
            const y = toY(ch.conversion);
            // Bubble size based on avg duration (parse "3m 48s" → seconds)
            const durationParts = ch.avgDuration.match(/(\d+)m\s*(\d+)s/);
            const seconds = durationParts ? parseInt(durationParts[1]) * 60 + parseInt(durationParts[2]) : 120;
            const radius = 8 + (seconds / 300) * 18; // 8-26px range
            const isBest = ch.name === 'Newsletter';
            const isRisk = ch.name === 'Twitter / X';
            const color = isBest ? '#12B76A' : isRisk ? '#F04438' : ch.quality === 'high' ? '#465FFF' : ch.quality === 'medium' ? '#F79009' : '#F04438';
            const isHovered = hovered === i;
            return (
              <g key={ch.name} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ cursor: 'pointer' }}>
                {/* Pulse ring for best/risk */}
                {(isBest || isRisk) && (
                  <circle cx={x} cy={y} r={radius + 4} fill="none" stroke={color} strokeWidth="1" opacity="0.3">
                    <animate attributeName="r" from={radius} to={radius + 8} dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={x} cy={y} r={isHovered ? radius + 2 : radius} fill={color} fillOpacity={isHovered ? 0.9 : 0.7} stroke={color} strokeWidth="2" style={{ transition: 'r 200ms ease, fill-opacity 200ms ease' }} />
                {/* Label beside bubble */}
                <text x={x} y={y - radius - 6} textAnchor="middle" fontSize="10" fill="var(--text-strong)" fontFamily="Outfit, sans-serif" fontWeight={isHovered ? '600' : '500'}>{ch.name}</text>
                {/* Hover tooltip */}
                {isHovered && (
                  <g>
                    <rect x={x + radius + 8} y={y - 35} width="140" height="68" rx="8" fill="var(--popover)" stroke="var(--border)" strokeWidth="1" />
                    <text x={x + radius + 16} y={y - 20} fontSize="10" fill="var(--text-strong)" fontFamily="Outfit, sans-serif" fontWeight="600">{ch.name}</text>
                    <text x={x + radius + 16} y={y - 8} fontSize="9" fill="var(--text-muted)" fontFamily="Outfit, sans-serif">Sessions: <tspan fill="var(--text-strong)" fontWeight="500">{ch.sessions.toLocaleString()}</tspan></text>
                    <text x={x + radius + 16} y={y + 4} fontSize="9" fill="var(--text-muted)" fontFamily="Outfit, sans-serif">Conv: <tspan fill="var(--text-strong)" fontWeight="500">{ch.conversion}%</tspan> · Bounce: <tspan fill={ch.bounce > 45 ? '#F04438' : 'var(--text-strong)'} fontWeight="500">{ch.bounce}%</tspan></text>
                    <text x={x + radius + 16} y={y + 16} fontSize="9" fill="var(--text-muted)" fontFamily="Outfit, sans-serif">Duration: <tspan fill="var(--text-strong)" fontWeight="500">{ch.avgDuration}</tspan></text>
                    <text x={x + radius + 16} y={y + 28} fontSize="9" fill={isBest ? '#12B76A' : isRisk ? '#F04438' : 'var(--text-muted)'} fontFamily="Outfit, sans-serif" fontWeight="500">{isBest ? 'Best quality' : isRisk ? 'Quality risk' : ch.quality + ' quality'}</text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Best: <span className="font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Newsletter (12.8% conv)</span></span>
        <span className="text-[var(--text-muted)]">Risk: <span className="font-medium text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">Twitter/X (48.4% bounce)</span></span>
      </div>
    </section>
  );
}

/* ============================================================
   Device & Platform Mix — donut + platform grid with icons
   ============================================================ */
function DeviceMixCard() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const cx = 90, cy = 90, r = 60, strokeWidth = 20;
  const circumference = 2 * Math.PI * r;
  const segments = Data.devices.reduce<Array<typeof Data.devices[number] & { len: number; offset: number; dashArray: string; index: number }>>((acc, d, i) => {
    const len = (d.share / 100) * circumference;
    const prev = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].len : 0;
    acc.push({ ...d, len, offset: prev, dashArray: `${len} ${circumference - len}`, index: i });
    return acc;
  }, []);
  const deviceIcons = { Desktop: Monitor, Mobile: Smartphone, Tablet: Tablet };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><Smartphone className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Device &amp; Platform Mix</h2>
            <p className="text-xs text-[var(--text-muted)]">Sessions by device type and OS.</p>
          </div>
        </div>
        <CardActionMenu cardName="Device Mix" />
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative flex-shrink-0">
          <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth={strokeWidth} />
            {segments.map((seg) => (
              <circle key={seg.name} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={hovered === seg.index ? strokeWidth + 4 : strokeWidth} strokeDasharray={seg.dashArray} strokeDashoffset={-seg.offset} style={{ transition: 'stroke-width 200ms ease', cursor: 'pointer' }} onMouseEnter={() => setHovered(seg.index)} onMouseLeave={() => setHovered(null)}>
                <animate attributeName="stroke-dashoffset" from={circumference} to={-seg.offset} dur="900ms" fill="freeze" begin={`${seg.index * 120}ms`} />
              </circle>
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Sessions</span>
            <span className="text-xl font-semibold tabular-nums text-[var(--text-strong)]">{hovered !== null ? `${(Data.devices[hovered].sessions / 1000).toFixed(1)}K` : '46.2K'}</span>
            <span className="text-[10px] text-[var(--text-muted)]">{hovered !== null ? Data.devices[hovered].name : 'total'}</span>
          </div>
        </div>
        <div className="flex-1 space-y-2 w-full">
          {Data.devices.map((d, i) => {
            const DIcon = deviceIcons[d.name as keyof typeof deviceIcons];
            return (
              <div key={d.name} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className={cn('flex items-center gap-2.5 rounded-lg border p-2.5 transition cursor-pointer', hovered === i ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]' : 'border-[var(--border-subtle)]')}>
                <span className="inline-flex size-8 items-center justify-center rounded-lg" style={{ background: `${d.color}18`, color: d.color }}><DIcon className="size-4" strokeWidth={2} /></span>
                <div className="min-w-0 flex-1"><p className="text-sm font-medium text-[var(--text-strong)]">{d.name}</p><p className="text-[10px] text-[var(--text-muted)]">Bounce {d.bounce}% · {d.avgDuration}</p></div>
                <div className="text-right"><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{(d.sessions / 1000).toFixed(1)}K</p><p className="text-[10px] text-[var(--text-muted)]">{d.share}%</p></div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Platform grid */}
      <div className="mt-4 border-t border-[var(--border-subtle)] pt-3">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Operating system</p>
        <div className="grid grid-cols-5 gap-2">
          {Data.platforms.map((p) => (
            <div key={p.name} className="flex flex-col items-center rounded-lg border border-[var(--border-subtle)] p-2 text-center">
              <span className="size-2 rounded-full" style={{ background: p.color }} />
              <p className="mt-1 text-[10px] font-medium text-[var(--text-strong)]">{p.name}</p>
              <p className="text-[9px] tabular-nums text-[var(--text-muted)]">{p.share}%</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-start gap-2 border-t border-[var(--border-subtle)] pt-3 text-xs">
        <AlertCircle className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" strokeWidth={2.2} />
        <p className="text-[var(--text-muted)]">{Data.deviceInsight}</p>
      </div>
    </section>
  );
}

/* ============================================================
   Geo Intelligence — uses real jvectormap from Maps page
   ============================================================ */
function GeoIntelligenceCard() {
  const [selected, setSelected] = React.useState<string | null>('US');
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Build jvectormap markers from country data
  const markers = Data.countries.map((c) => ({
    latLng: [c.lat, c.lng],
    name: `${c.name} — ${c.visitors.toLocaleString()} visitors`,
    style: { fill: selected === c.code ? '#465FFF' : '#12B76A', r: selected === c.code ? 7 : 5, borderWidth: 2, borderColor: '#fff' },
  })) as any[];

  const selectedCountry = Data.countries.find((c) => c.code === selected);

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Globe className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Geo Intelligence</h2>
            <p className="text-xs text-[var(--text-muted)]">Visitor distribution by country with conversion and growth signals.</p>
          </div>
        </div>
        <CardActionMenu cardName="Geo Intelligence" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
        {/* Real interactive map */}
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)]" style={{ minHeight: 300 }}>
          {React.createElement(VectorMap as any, {
            map: worldMill,
            backgroundColor: 'transparent',
            markerStyle: { initial: { fill: '#12B76A', r: 5 } },
            markersSelectable: true,
            markers,
            zoomOnScroll: false,
            regionStyle: { initial: { fill: '#E5E7EB', fillOpacity: 1, stroke: 'none' }, hover: { fill: '#465FFF', fillOpacity: 0.3 }, selected: { fill: '#465FFF' } },
            onMarkerClick: (e: any, code: number) => { setSelected(Data.countries[code]?.code ?? null); },
          })}
          <style jsx global>{`
            .jvectormap-container { background: transparent !important; }
            .jvectormap-region.jvectormap-element { transition: fill 0.2s ease; }
            .jvectormap-marker.jvectormap-element { cursor: pointer; transition: r 0.2s ease; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }
            .jvectormap-tip { background: var(--popover) !important; border: 1px solid var(--border) !important; border-radius: 8px !important; padding: 6px 10px !important; font-size: 11px !important; font-weight: 500 !important; font-family: Outfit, sans-serif !important; color: var(--text-strong) !important; box-shadow: 0 8px 24px -4px rgba(15,23,42,0.15) !important; white-space: nowrap !important; }
            .jvectormap-zoomin, .jvectormap-zoomout { display: none !important; }
          `}</style>
        </div>
        {/* Country list */}
        <div className="space-y-1.5">
          {Data.countries.map((c, i) => (
            <button
              key={c.code}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(c.code)}
              className={cn('flex w-full items-center gap-2.5 rounded-lg border p-2.5 text-left transition cursor-pointer', selected === c.code ? 'border-[var(--color-brand-300)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border-subtle)] hover:bg-[var(--surface-sunken)]')}
            >
              <span className="inline-flex size-7 flex-shrink-0 items-center justify-center rounded-md bg-[var(--color-brand-50)] text-[10px] font-medium text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{c.code}</span>
              <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium text-[var(--text-strong)]">{c.name}</p><p className="text-[10px] text-[var(--text-muted)]">{c.visitors.toLocaleString()} visitors</p></div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><ArrowUp className="size-2.5" strokeWidth={2.5} />{c.growth}%</span>
            </button>
          ))}
        </div>
      </div>
      {/* Selected country detail footer */}
      {selectedCountry && (
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3 text-xs sm:grid-cols-4">
          <div><span className="text-[var(--text-subtle)]">Selected</span><p className="font-medium text-[var(--text-strong)]">{selectedCountry.name}</p></div>
          <div><span className="text-[var(--text-subtle)]">Visitors</span><p className="font-medium tabular-nums text-[var(--text-strong)]">{selectedCountry.visitors.toLocaleString()}</p></div>
          <div><span className="text-[var(--text-subtle)]">Conversion</span><p className="font-medium tabular-nums text-[var(--text-strong)]">{selectedCountry.conversion}%</p></div>
          <div><span className="text-[var(--text-subtle)]">Bounce</span><p className="font-medium tabular-nums text-[var(--text-body)]">{selectedCountry.bounce}%</p></div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   Top Pages Performance — icon-led ranked card
   ============================================================ */
function TopPagesCard() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const maxViews = Math.max(...Data.topPages.map((p) => p.views));
  const pageIcons = { pricing: DollarSign, docs: BookOpen, features: Zap, blog: FileText, signup: UserPlus, onboarding: LogIn };
  const pageColors = { pricing: '#465FFF', docs: '#12B76A', features: '#F79009', blog: '#7A5AF8', signup: '#0BA5EC', onboarding: '#EC4899' };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><FileText className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Top Pages Performance</h2>
            <p className="text-xs text-[var(--text-muted)]">Most viewed pages with engagement and exit signals.</p>
          </div>
        </div>
        <CardActionMenu cardName="Top Pages" />
      </div>
      <div className="space-y-2">
        {Data.topPages.map((page, i) => {
          const Icon = pageIcons[page.type];
          const color = pageColors[page.type];
          const width = (page.views / maxViews) * 100;
          return (
            <div key={page.path} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className={cn('flex items-center gap-3 rounded-xl border p-2.5 transition', hovered === i ? 'border-[var(--border-strong)] bg-[var(--surface-sunken)]' : 'border-[var(--border-subtle)]')}>
              <span className="inline-flex size-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: `${color}18`, color }}><Icon className="size-4" strokeWidth={2} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <code className="truncate text-xs font-medium text-[var(--text-strong)]">{page.path}</code>
                  {page.exitRate >= 50 && <span className="inline-flex items-center gap-0.5 rounded-full bg-[var(--color-error-50)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><AlertTriangle className="size-2.5" strokeWidth={2.5} />High exit</span>}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${width}%`, background: color, animationDelay: `${i * 60}ms` }} /></div>
                  <LiveSparkline data={page.sparkline} color={color} height={16} width={45} />
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-3 text-[10px]">
                <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-strong)]">{page.views.toLocaleString()}</p><p className="text-[var(--text-muted)]">views</p></div>
                <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-body)]">{page.avgTime}</p><p className="text-[var(--text-muted)]">avg time</p></div>
                <div className="text-right"><p className={cn('font-medium tabular-nums', page.exitRate >= 50 ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--text-body)]')}>{page.exitRate}%</p><p className="text-[var(--text-muted)]">exit</p></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Showing {Data.topPages.length} pages</span>
        <span className="text-[var(--text-muted)]">Total views: <span className="font-medium tabular-nums text-[var(--text-strong)]">{Data.topPages.reduce((s, p) => s + p.views, 0).toLocaleString()}</span></span>
      </div>
    </section>
  );
}

/* ============================================================
   Engagement Heatmap — day × hour grid
   ============================================================ */
function EngagementHeatmap() {
  const [hovered, setHovered] = React.useState<{ day: number; hour: number } | null>(null);
  const { days, hours, cells } = Data.engagementHeatmap;
  function cellColor(value: number) {
    // 0-100 → light to brand color
    const opacity = 0.15 + (value / 100) * 0.85;
    return `rgba(70, 95, 255, ${opacity})`;
  }
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Zap className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Engagement Heatmap</h2>
            <p className="text-xs text-[var(--text-muted)]">When visitors are most engaged by day and hour.</p>
          </div>
        </div>
        <CardActionMenu cardName="Engagement Heatmap" />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[420px]">
          {/* Hour labels */}
          <div className="mb-1 flex gap-1 pl-10">
            {hours.map((h) => <div key={h} className="flex-1 text-center text-[10px] font-medium tabular-nums text-[var(--text-muted)]">{h}:00</div>)}
          </div>
          {/* Day rows */}
          {days.map((day, di) => (
            <div key={day} className="mb-1 flex items-center gap-1">
              <div className="w-9 text-right text-[10px] font-medium text-[var(--text-muted)]">{day}</div>
              {hours.map((_, hi) => {
                const value = cells[di][hi];
                const isHovered = hovered?.day === di && hovered?.hour === hi;
                return (
                  <div
                    key={hi}
                    onMouseEnter={() => setHovered({ day: di, hour: hi })}
                    onMouseLeave={() => setHovered(null)}
                    className="relative flex-1 cursor-pointer rounded transition-all"
                    style={{
                      height: 36,
                      background: cellColor(value),
                      outline: isHovered ? '2px solid var(--color-brand-500)' : 'none',
                      outlineOffset: isHovered ? '1px' : '0',
                      animation: `ecomFadeIn 300ms ease-out ${di * 60 + hi * 30}ms both`,
                    }}
                  >
                    {isHovered && (
                      <div className="absolute -top-14 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2 text-xs shadow-lg" style={{ animation: 'ecomPopoverIn 160ms ease-out' }}>
                        <p className="font-medium text-[var(--text-strong)]">{day} {hours[hi]}:00</p>
                        <p className="text-[10px] text-[var(--text-muted)]">Engagement: <span className="font-medium tabular-nums text-[var(--text-strong)]">{value}%</span></p>
                        <p className="text-[10px] text-[var(--text-muted)]">Sessions: <span className="font-medium tabular-nums text-[var(--text-strong)]">{Math.round(value * 8.4).toLocaleString()}</span></p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--text-muted)]">Less</span>
          <div className="flex gap-0.5">
            {[15, 35, 55, 75, 95].map((v) => <div key={v} className="size-3 rounded" style={{ background: cellColor(v) }} />)}
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">More</span>
        </div>
        <span className="text-[10px] text-[var(--text-muted)]">Peak: <span className="font-medium text-[var(--text-strong)]">Wed 16:00 (92%)</span></span>
      </div>
    </section>
  );
}

/* ============================================================
   Retention Cohort Grid — heatmap cohort table
   ============================================================ */
function RetentionCohortGrid() {
  const [hovered, setHovered] = React.useState<{ row: number; col: number } | null>(null);
  const { cohortGrid, cohortSummary } = Data;
  function cellColor(value: number | null) {
    if (value === null) return 'transparent';
    const opacity = 0.15 + (value / 100) * 0.85;
    return `rgba(18, 183, 106, ${opacity})`;
  }
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><Repeat className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Retention Cohort</h2>
            <p className="text-xs text-[var(--text-muted)]">Weekly retention by signup cohort — darker = higher retention.</p>
          </div>
        </div>
        <CardActionMenu cardName="Retention Cohort" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr>
              <th className="py-2 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Cohort</th>
              <th className="py-2 px-1 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Size</th>
              {['W0', 'W1', 'W2', 'W3', 'W4', 'W5'].map((w) => <th key={w} className="py-2 px-1 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{w}</th>)}
            </tr>
          </thead>
          <tbody>
            {cohortGrid.map((row, ri) => (
              <tr key={row.cohort} style={{ animation: `ecomFadeIn 400ms ease-out ${ri * 80}ms both` }}>
                <td className="py-1 pl-1 pr-2 text-xs font-medium text-[var(--text-strong)]">{row.cohort}</td>
                <td className="py-1 px-1 text-center text-[10px] tabular-nums text-[var(--text-muted)]">{row.size.toLocaleString()}</td>
                {row.weeks.map((val, ci) => {
                  const isHovered = hovered?.row === ri && hovered?.col === ci;
                  const isNull = val === null;
                  const retainedUsers = val !== null ? Math.round((val / 100) * row.size) : null;
                  return (
                    <td key={ci} className="py-1 px-1">
                      <div
                        onMouseEnter={() => !isNull && setHovered({ row: ri, col: ci })}
                        onMouseLeave={() => setHovered(null)}
                        className={cn('relative mx-auto flex h-9 items-center justify-center rounded text-[10px] font-medium tabular-nums transition', isNull ? 'bg-[var(--surface-sunken)]/30 text-[var(--text-faint)]' : 'cursor-pointer text-[var(--text-strong)]')}
                        style={{ background: isNull ? undefined : cellColor(val), outline: isHovered ? '2px solid var(--color-success-500)' : 'none', outlineOffset: isHovered ? '1px' : '0' }}
                      >
                        {isNull ? '—' : `${val}%`}
                        {isHovered && (
                          <div className="absolute -top-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2 text-xs shadow-lg" style={{ animation: 'ecomPopoverIn 160ms ease-out' }}>
                            <p className="font-medium text-[var(--text-strong)]">{row.cohort} · Week {ci}</p>
                            <p className="text-[10px] text-[var(--text-muted)]">Retained: <span className="font-medium tabular-nums text-[var(--text-strong)]">{retainedUsers?.toLocaleString()}</span> ({val}%)</p>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3 text-xs">
        <div><span className="text-[var(--text-muted)]">Week 4 avg retention</span><p className="font-medium tabular-nums text-[var(--text-strong)]">{cohortSummary.week4Avg}%</p></div>
        <div><span className="text-[var(--text-muted)]">Returning visitor rate</span><p className="font-medium tabular-nums text-[var(--text-strong)]">{cohortSummary.returningRate}%</p></div>
      </div>
    </section>
  );
}

/* ============================================================
   Top Events Stream — icon-led event analytics
   ============================================================ */
function TopEventsStream() {
  const eventIcons = { page_view: Eye, scroll_depth_75: MousePointerClick, signup_started: UserPlus, signup_completed: FileCheck, file_download: DownloadCloud, pricing_clicked: DollarSign, docs_search: Search, video_played: Play };
  const categoryColor = {
    Navigation: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    Engagement: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    Conversion: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    Download: 'bg-[var(--color-info-50)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
  };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"><Zap className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Top Events Stream</h2>
            <p className="text-xs text-[var(--text-muted)]">Instrumented events grouped by category with trends.</p>
          </div>
        </div>
        <CardActionMenu cardName="Top Events" />
      </div>
      <div className="space-y-1.5">
        {Data.topEvents.map((ev) => {
          const Icon = eventIcons[ev.name as keyof typeof eventIcons] || Activity;
          return (
            <div key={ev.name} className="group flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-2.5 transition hover:border-[var(--border-strong)]">
              <span className="inline-flex size-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--surface-sunken)] text-[var(--text-muted)] transition group-hover:bg-[var(--color-brand-50)] group-hover:text-[var(--color-brand-600)] dark:group-hover:bg-[rgba(70,95,255,0.16)] dark:group-hover:text-[var(--color-brand-300)]"><Icon className="size-4" strokeWidth={2} /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <code className="text-xs font-medium text-[var(--text-strong)]">{ev.name}</code>
                  <span className={cn('inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide', categoryColor[ev.category])}>{ev.category}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium tabular-nums text-[var(--text-strong)]">{ev.count.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <LiveSparkline data={ev.sparkline} color={ev.trend === 'up' ? '#12B76A' : '#F04438'} height={24} width={55} />
                <span className={cn('inline-flex items-center gap-0.5 text-[10px] font-medium', ev.trend === 'up' ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]')}>
                  {ev.trend === 'up' && <ArrowUp className="size-2.5" strokeWidth={2.5} />}
                  {ev.trend === 'down' && <ArrowDown className="size-2.5" strokeWidth={2.5} />}
                  {ev.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">8 events tracked</span>
        <span className="text-[var(--text-muted)]">Total: <span className="font-medium tabular-nums text-[var(--text-strong)]">{Data.topEvents.reduce((s, e) => s + e.count, 0).toLocaleString()}</span></span>
      </div>
    </section>
  );
}

/* ============================================================
   Anomaly Watch — compact alert card
   ============================================================ */
function AnomalyWatchCard() {
  const severityConfig = {
    info: { icon: Info, cls: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]', border: 'border-l-[var(--color-info-500)]' },
    warning: { icon: AlertTriangle, cls: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]', border: 'border-l-[var(--color-warning-500)]' },
    critical: { icon: AlertCircle, cls: 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]', border: 'border-l-[var(--color-error-500)]' },
  };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><Bell className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Anomaly Watch</h2>
            <p className="text-xs text-[var(--text-muted)]">Detected anomalies with recommended actions.</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-warning-50)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><Bell className="size-3" strokeWidth={2.5} />{Data.anomalies.length} alerts</span>
      </div>
      <div className="space-y-2">
        {Data.anomalies.map((a) => {
          const cfg = severityConfig[a.severity];
          const Icon = cfg.icon;
          return (
            <div key={a.id} className={cn('group rounded-xl border border-l-4 border-[var(--border-subtle)] p-3 transition hover:border-[var(--border-strong)]', cfg.border)}>
              <div className="flex items-start gap-2.5">
                <span className={cn('inline-flex size-7 flex-shrink-0 items-center justify-center rounded-lg', cfg.cls)}><Icon className="size-3.5" strokeWidth={2.2} /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2"><p className="text-sm font-medium text-[var(--text-strong)]">{a.title}</p><span className="text-[10px] text-[var(--text-subtle)]">{a.time}</span></div>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{a.detail}</p>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden"><p className="mt-1.5 text-[10px] text-[var(--text-body)]"><span className="font-medium text-[var(--text-strong)]">Recommended:</span> {a.action}</p></div>
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
   Session Detail Drawer — opens when clicking a session row
   ============================================================ */
function SessionDetailDrawer({ session, onClose }: { session: Data.Session | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!session) return;
    function escHandler(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', escHandler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', escHandler); document.body.style.overflow = ''; };
  }, [session, onClose]);

  if (!session || typeof document === 'undefined') return null;
  const deviceIcons = { Desktop: Monitor, Mobile: Smartphone, Tablet: Tablet };

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Session detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            {session.visitor === 'Anonymous' ? <span className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--surface-sunken)] text-[var(--text-muted)]"><Users className="size-4" strokeWidth={2} /></span> : <UserAvatar name={session.visitor} size="sm" />}
            <div>
              <h3 className="text-sm font-medium text-[var(--text-strong)]">{session.visitor}</h3>
              <p className="text-xs text-[var(--text-muted)]">{session.id} · {session.location}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close drawer"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          {/* Session meta */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Source</p><p className="text-sm font-medium text-[var(--text-strong)]">{session.source}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Device</p><p className="text-sm font-medium text-[var(--text-strong)]">{session.device}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Duration</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{session.duration}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Events fired</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{session.events}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Entry page</p><p className="truncate text-sm font-medium text-[var(--text-strong)]">{session.entryPage}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Current page</p><p className="truncate text-sm font-medium text-[var(--text-strong)]">{session.currentPage}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Status</p><StatusBadge tone={session.status === 'Active' ? 'success' : session.status === 'Idle' ? 'warning' : 'error'} dot>{session.status}</StatusBadge></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Referrer</p><p className="truncate text-sm font-medium text-[var(--text-strong)]">{session.referrer || '—'}</p></div>
          </div>

          {/* Visitor path timeline */}
          {session.path && session.path.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Visitor Path</h4>
              <ol className="relative space-y-2.5 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--border-subtle)]">
                {session.path.map((p, i) => (
                  <li key={i} className="relative flex items-start gap-3">
                    <span className="relative z-10 inline-flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
                      <span className="size-2 rounded-full bg-current" />
                    </span>
                    <div className="flex-1 rounded-lg border border-[var(--border-subtle)] p-2">
                      <div className="flex items-center justify-between"><code className="text-xs font-medium text-[var(--text-strong)]">{p.page}</code><span className="text-[10px] tabular-nums text-[var(--text-muted)]">{p.time}</span></div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Events fired */}
          {session.eventsFired && session.eventsFired.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Events Fired ({session.eventsFired.length})</h4>
              <div className="flex flex-wrap gap-1.5">
                {session.eventsFired.map((ev, i) => (
                  <code key={i} className="inline-flex items-center rounded-md border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-2 py-1 text-[10px] font-medium text-[var(--text-body)]">{ev}</code>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Real-time Sessions table — full width with drawer
   ============================================================ */
function RealtimeSessionsTable() {
  const [search, setSearch] = React.useState('');
  const [sourceFilter, setSourceFilter] = React.useState<'All' | string>('All');
  const [deviceFilter, setDeviceFilter] = React.useState<'All' | 'Desktop' | 'Mobile' | 'Tablet'>('All');
  const [statusFilter, setStatusFilter] = React.useState<'All' | 'Active' | 'Idle' | 'Bouncing'>('All');
  const [sourceOpen, setSourceOpen] = React.useState(false);
  const [deviceOpen, setDeviceOpen] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [selectedSession, setSelectedSession] = React.useState<Data.Session | null>(null);

  const sources = ['All', 'Google', 'Direct', 'Newsletter', 'Twitter / X', 'Facebook', 'Email'];
  const devices: Array<'All' | 'Desktop' | 'Mobile' | 'Tablet'> = ['All', 'Desktop', 'Mobile', 'Tablet'];
  const statuses: Array<'All' | 'Active' | 'Idle' | 'Bouncing'> = ['All', 'Active', 'Idle', 'Bouncing'];

  const filtered = React.useMemo(() => {
    return Data.realtimeSessions.filter((s) => {
      if (sourceFilter !== 'All' && s.source !== sourceFilter) return false;
      if (deviceFilter !== 'All' && s.device !== deviceFilter) return false;
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!s.visitor.toLowerCase().includes(q) && !s.location.toLowerCase().includes(q) && !s.currentPage.toLowerCase().includes(q) && !s.source.toLowerCase().includes(q) && !s.entryPage.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [search, sourceFilter, deviceFilter, statusFilter]);

  const deviceIcon = { Desktop: Monitor, Mobile: Smartphone, Tablet: Tablet };
  const statusTone = { Active: 'success', Idle: 'warning', Bouncing: 'error' } as const;

  return (
    <>
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Activity className="size-5" strokeWidth={2} /></span>
            <div>
              <h2 className="text-base font-medium text-[var(--text-strong)]">Real-time Sessions</h2>
              <p className="text-xs text-[var(--text-muted)]">Live visitor sessions — click a row to view detail.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-50)] px-2.5 py-1 dark:bg-[rgba(18,183,106,0.1)]">
              <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" /></span>
              <span className="text-[10px] font-medium tabular-nums text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">1,284 active</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search sessions..." className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)] sm:w-48" />
            </div>
            {/* Source filter */}
            <div className="relative">
              <button type="button" onClick={() => { setSourceOpen((p) => !p); setDeviceOpen(false); setStatusOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Globe className="size-3.5" strokeWidth={2.2} />Source<ChevronDown className={cn('size-3 transition-transform', sourceOpen && 'rotate-180')} strokeWidth={2.2} /></button>
              <Popover open={sourceOpen} onClose={() => setSourceOpen(false)} align="right" width={160}><div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Source</p></div>{sources.map((s) => (<PopoverItem key={s} active={sourceFilter === s} onClick={() => { setSourceFilter(s); setSourceOpen(false); }}>{s}</PopoverItem>))}</Popover>
            </div>
            {/* Device filter */}
            <div className="relative">
              <button type="button" onClick={() => { setDeviceOpen((p) => !p); setSourceOpen(false); setStatusOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Monitor className="size-3.5" strokeWidth={2.2} />Device<ChevronDown className={cn('size-3 transition-transform', deviceOpen && 'rotate-180')} strokeWidth={2.2} /></button>
              <Popover open={deviceOpen} onClose={() => setDeviceOpen(false)} align="right" width={140}><div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Device</p></div>{devices.map((d) => (<PopoverItem key={d} active={deviceFilter === d} onClick={() => { setDeviceFilter(d); setDeviceOpen(false); }}>{d}</PopoverItem>))}</Popover>
            </div>
            {/* Status filter */}
            <div className="relative">
              <button type="button" onClick={() => { setStatusOpen((p) => !p); setSourceOpen(false); setDeviceOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Activity className="size-3.5" strokeWidth={2.2} />Status<ChevronDown className={cn('size-3 transition-transform', statusOpen && 'rotate-180')} strokeWidth={2.2} /></button>
              <Popover open={statusOpen} onClose={() => setStatusOpen(false)} align="right" width={140}><div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Status</p></div>{statuses.map((s) => (<PopoverItem key={s} active={statusFilter === s} onClick={() => { setStatusFilter(s); setStatusOpen(false); }}>{s}</PopoverItem>))}</Popover>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="py-2.5 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Visitor</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Location</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Source</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Entry page</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Current page</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Device</th>
                <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Duration</th>
                <th className="py-2.5 px-2 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Events</th>
                <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                <th className="py-2.5 pl-2 pr-1"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={10} className="py-12 text-center"><p className="text-sm font-medium text-[var(--text-strong)]">No sessions found</p><p className="mt-1 text-xs text-[var(--text-muted)]">Try adjusting your search or filters.</p></td></tr>
              ) : filtered.map((s) => {
                const DIcon = deviceIcon[s.device];
                return (
                  <tr key={s.id} onClick={() => setSelectedSession(s)} className="group cursor-pointer border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                    <td className="py-3 pl-1 pr-2">
                      <div className="flex items-center gap-2">
                        {s.visitor === 'Anonymous' ? <span className="inline-flex size-6 items-center justify-center rounded-full bg-[var(--surface-sunken)] text-[var(--text-muted)]"><Users className="size-3" strokeWidth={2.2} /></span> : <UserAvatar name={s.visitor} size="xs" />}
                        <span className="text-xs font-medium text-[var(--text-strong)]">{s.visitor}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2"><span className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)]"><MapPin className="size-2.5" strokeWidth={2.2} />{s.location}</span></td>
                    <td className="py-3 px-2"><span className="text-xs text-[var(--text-body)]">{s.source}</span></td>
                    <td className="py-3 px-2"><code className="text-xs text-[var(--text-body)]">{s.entryPage}</code></td>
                    <td className="py-3 px-2"><code className="text-xs text-[var(--text-body)]">{s.currentPage}</code></td>
                    <td className="py-3 px-2"><span className="inline-flex items-center gap-1 text-[10px] text-[var(--text-muted)]"><DIcon className="size-3" strokeWidth={2.2} />{s.device}</span></td>
                    <td className="py-3 px-2 text-right text-xs font-medium tabular-nums text-[var(--text-strong)]">{s.duration}</td>
                    <td className="py-3 px-2 text-center"><span className="inline-flex items-center gap-0.5 text-xs tabular-nums text-[var(--text-body)]"><Zap className="size-2.5 text-[var(--text-muted)]" strokeWidth={2.2} />{s.events}</span></td>
                    <td className="py-3 px-2"><StatusBadge tone={statusTone[s.status]} dot>{s.status}</StatusBadge></td>
                    <td className="py-3 pl-2 pr-1 text-right"><ChevronRight className="size-3.5 text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100" strokeWidth={2.2} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
          <span className="text-[var(--text-muted)]">Showing {filtered.length} of {Data.realtimeSessions.length} sessions</span>
          <span className="inline-flex items-center gap-1 text-[var(--text-muted)]"><RefreshCw className="size-3" strokeWidth={2.2} />Auto-refreshing every 15s</span>
        </div>
      </section>
      <SessionDetailDrawer session={selectedSession} onClose={() => setSelectedSession(null)} />
    </>
  );
}

/* ============================================================
   Main Analytics Dashboard export
   ============================================================ */
export function AnalyticsDashboard() {
  const [range, setRange] = React.useState<'24h' | '7d' | '30d' | '90d'>('30d');
  return (
    <div className="space-y-6">
      <AnalyticsHeader range={range} onRangeChange={setRange} />
      {/* Top hero: Pulse (left, large) + Live Intelligence Rail (right, 3 stacked) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <AudiencePulseHero range={range} />
        <div className="flex flex-col gap-4">
          <LiveNowCard />
          <TrafficQualityCard />
          <AnomalySnapshotCard />
        </div>
      </div>
      {/* Signal Strip */}
      <SignalStrip />
      {/* Visitor Journey Flow + Source Quality Matrix */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <VisitorJourneyFlow />
        <SourceQualityMatrix />
      </div>
      {/* Geo Intelligence (wide, real map) */}
      <GeoIntelligenceCard />
      {/* Device Mix + Top Pages */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <DeviceMixCard />
        <TopPagesCard />
      </div>
      {/* Engagement Heatmap + Retention Cohort */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <EngagementHeatmap />
        <RetentionCohortGrid />
      </div>
      {/* Top Events + Anomaly Watch */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TopEventsStream />
        <AnomalyWatchCard />
      </div>
      {/* Real-time Sessions (full width) */}
      <RealtimeSessionsTable />
    </div>
  );
}
