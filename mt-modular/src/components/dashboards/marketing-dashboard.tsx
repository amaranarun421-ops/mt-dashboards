'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, MoreHorizontal,
  Eye, Users, Clock, Globe, Smartphone, Activity, Zap, TrendingUp, TrendingDown,
  AlertTriangle, AlertCircle, Info, Star, MousePointerClick, Target, Megaphone,
  FileText, Filter, Bell, RefreshCw, Link2, Search, Gauge, Plus, X, Image as ImageIcon,
  Play, Mail, Video, Type, LayoutGrid, CheckCircle2, XCircle, DollarSign, Eye as EyeIcon,
  Sparkles, Send, Calendar, Rocket, Flag, Repeat, Briefcase, Copy, Share2, UserPlus,
  Image as ImageLucide, Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem, exportAnalyticsCsv } from './analytics-interactions';
import * as Data from './marketing-data';
import type { Campaign } from './marketing-data';
import { getSocialIcon, GoogleIcon, MetaIcon, YouTubeIcon, InstagramIcon, TikTokIcon, LinkedInIcon, EmailIcon, XIcon } from './social-icons';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

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
      copy: `${cardName} report link copied`,
      hide: `${cardName} hidden`,
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
        <div className="my-1 h-px bg-[var(--border-subtle)]" />
        <PopoverItem icon={X} danger onClick={() => handleAction('hide')}>Hide card</PopoverItem>
      </Popover>
    </div>
  );
}

/* Mini sparkline */
function Sparkline({ data, color = '#465FFF', height = 28, width = 70 }: { data: number[]; color?: string; height?: number; width?: number }) {
  const id = React.useId();
  const max = Math.max(...data), min = Math.min(...data), rangeVal = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const toX = (i: number) => i * step;
  const toY = (v: number) => height - ((v - min) / rangeVal) * (height - 4) - 2;
  const points = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaPath = `M 0,${height} L ${points} L ${width},${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs><linearGradient id={`mk-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.2" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={areaPath} fill={`url(#mk-${id})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" pathLength={100} strokeDasharray="100" strokeDashoffset="100"><animate attributeName="stroke-dashoffset" from="100" to="0" dur="800ms" fill="freeze" begin="100ms" /></polyline>
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="2" fill={color}><animate attributeName="r" values="2;3.5;2" dur="2.4s" repeatCount="indefinite" /></circle>
    </svg>
  );
}

/* ============================================================
   Marketing Header
   ============================================================ */
const DATE_PRESETS = [
  { key: 'today', label: 'Today', range: 'Jun 23, 2026' },
  { key: '7d', label: 'Last 7 days', range: 'Jun 17 – Jun 23, 2026' },
  { key: '30d', label: 'Last 30 days', range: 'May 24 – Jun 23, 2026' },
  { key: 'month', label: 'This month', range: 'Jun 01 – Jun 23, 2026' },
  { key: 'custom', label: 'Custom range', range: 'May 24 – Jun 23, 2026' },
];
const CHANNELS = ['All channels', 'Google Ads', 'Meta Ads', 'YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'Email'];

function MarketingHeader({ onNewCampaign }: { onNewCampaign: () => void }) {
  const { toast } = useToast();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [channelOpen, setChannelOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [dateLabel, setDateLabel] = React.useState('May 24 – Jun 23, 2026');
  const [selectedPreset, setSelectedPreset] = React.useState('30d');
  const [channelFilter, setChannelFilter] = React.useState('All channels');

  function handlePreset(key: string) {
    setSelectedPreset(key);
    const preset = DATE_PRESETS.find((p) => p.key === key);
    if (preset) setDateLabel(preset.range);
    setDateOpen(false);
    toast({ title: 'Date range updated', description: preset?.label });
  }
  function handleChannel(ch: string) {
    setChannelFilter(ch);
    setChannelOpen(false);
    toast({ title: 'Channel filter applied', description: ch });
  }
  function handleExport(format: 'csv' | 'pdf' | 'xls') {
    setExportOpen(false);
    if (format === 'csv') {
      // Export campaigns as CSV
      const headers = ['Campaign', 'Channel', 'Objective', 'Status', 'Spend', 'Impressions', 'CTR', 'Conversions', 'CPA', 'ROAS'];
      const rows = Data.campaigns.map((c) => [c.name, c.channel, c.objective, c.status, c.spend, c.impressions, c.ctr, String(c.conversions), c.cpa, c.roas]);
      const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `marketing-campaigns-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: 'CSV exported', description: `${Data.campaigns.length} campaigns downloaded` });
    } else {
      toast({ title: `${format.toUpperCase()} export prepared`, description: `Your ${format.toUpperCase()} report is being generated.` });
    }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>Dashboards</span><ChevronRight className="size-3 text-[var(--text-faint)]" />
          <span className="text-[var(--text-strong)]">Marketing</span>
        </nav>
        <h1 className="ds-page-title">Marketing Command Center</h1>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">Track campaign spend, creative performance, channel mix, and audience engagement across paid and owned media.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] px-2.5 py-1.5 dark:bg-[rgba(18,183,106,0.1)]">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" /></span>
          <span className="text-xs font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live tracking · synced 1 min ago</span>
        </div>
        {/* Date range */}
        <div className="relative">
          <button type="button" onClick={() => { setDateOpen((p) => !p); setChannelOpen(false); setExportOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="dialog" aria-expanded={dateOpen}>
            <CalendarDays className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{dateLabel}</span><span className="sm:hidden">Date</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', dateOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={dateOpen} onClose={() => setDateOpen(false)} width={240}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Date range</p></div>
            {DATE_PRESETS.map((p) => (<PopoverItem key={p.key} active={selectedPreset === p.key} onClick={() => handlePreset(p.key)}>{p.label}</PopoverItem>))}
          </Popover>
        </div>
        {/* Channel filter */}
        <div className="relative">
          <button type="button" onClick={() => { setChannelOpen((p) => !p); setDateOpen(false); setExportOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="menu" aria-expanded={channelOpen}>
            <Filter className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{channelFilter}</span><span className="sm:hidden">Channel</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', channelOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={channelOpen} onClose={() => setChannelOpen(false)} width={180}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Channel</p></div>
            {CHANNELS.map((ch) => (<PopoverItem key={ch} active={channelFilter === ch} onClick={() => handleChannel(ch)}>{ch}</PopoverItem>))}
          </Popover>
        </div>
        {/* Export */}
        <div className="relative">
          <button type="button" onClick={() => { setExportOpen((p) => !p); setDateOpen(false); setChannelOpen(false); }} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-haspopup="menu" aria-expanded={exportOpen}>
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
        {/* New campaign */}
        <button type="button" onClick={onNewCampaign} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]">
          <Plus className="size-4" strokeWidth={2.5} />New campaign
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Campaign Pulse Hero
   ============================================================ */
function CampaignPulseHero() {
  const series = Data.campaignSeries;
  const isMobile = useIsMobile();
  const options: any = {
    chart: { type: 'line', height: 360, fontFamily: 'Outfit, sans-serif', toolbar: { show: false }, animations: { enabled: true, speed: 900, animateGradually: { enabled: true, delay: 60 }, dynamicAnimation: { enabled: true, speed: 350 } } },
    colors: ['#465FFF', '#12B76A', '#F79009', '#7A5AF8'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [3, 2, 2, 3], dashArray: [0, 0, 0, 4] },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0.04, stops: [0, 100] } },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 8, bottom: 0, left: isMobile ? 24 : 8 } },
    xaxis: { categories: series.map((p) => p.date), labels: { style: { colors: 'var(--text-muted)', fontSize: isMobile ? '10px' : '11px', fontFamily: 'Outfit, sans-serif' }, rotate: isMobile ? -45 : 0, trim: true, hideOverlappingLabels: true }, axisBorder: { show: false }, axisTicks: { show: false }, crosshairs: { stroke: { color: 'var(--color-brand-500)', width: 1.5, dashArray: 4 }, fill: { type: 'solid', color: 'var(--color-brand-500)', opacity: 0.06 } } },
    yaxis: [{ labels: { style: { colors: 'var(--text-muted)', fontSize: isMobile ? '10px' : '11px', fontFamily: 'Outfit, sans-serif' }, formatter: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v}` } }, { opposite: true, labels: { style: { colors: 'var(--text-muted)', fontSize: isMobile ? '10px' : '11px', fontFamily: 'Outfit, sans-serif' }, formatter: (v: number) => `$${(v / 1000).toFixed(1)}K` } }],
    legend: { position: 'top', horizontalAlign: isMobile ? 'left' : 'right', fontSize: isMobile ? '11px' : '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, labels: { colors: 'var(--text-body)' }, markers: { size: 6, strokeWidth: 0, offsetX: -4 }, itemMargin: { horizontal: isMobile ? 8 : 12, vertical: 0 } },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }: any) => {
        const p = series[dataPointIndex];
        const annotationNote = p.annotation ? `<div style="display:flex;align-items:center;gap:6px;margin-top:6px;padding:4px 8px;border-radius:6px;background:rgba(247,144,9,0.12);color:#F79009;font-size:10px;font-weight:500;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>${p.annotation}</div>` : '';
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:220px;"><div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.date}</div><div style="display:grid;grid-template-columns:1fr auto;gap:4px 16px;font-size:12px;"><span style="color:var(--text-body);">Spend</span><span style="color:#7A5AF8;font-weight:600;font-variant-numeric:tabular-nums;">$${p.spend.toLocaleString()}</span><span style="color:var(--text-body);">Impressions</span><span style="color:#465FFF;font-weight:600;font-variant-numeric:tabular-nums;">${p.impressions.toLocaleString()}</span><span style="color:var(--text-body);">Clicks</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">${p.clicks.toLocaleString()}</span><span style="color:var(--text-body);">CTR</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">${p.ctr}%</span><span style="color:var(--text-body);">Conversions</span><span style="color:#F79009;font-weight:600;font-variant-numeric:tabular-nums;">${p.conversions}</span><span style="color:var(--text-body);">CPA</span><span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">$${p.cpa}</span><span style="color:var(--text-body);">ROAS</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">${p.roas}x</span></div>${annotationNote}</div>`;
      },
    },
    markers: { size: 0, hover: { size: 6, sizeOffset: 3 }, strokeColors: 'var(--card)', strokeWidth: 2 },
    annotations: { xaxis: series.filter((p) => p.annotation).map((p) => ({ x: p.date, borderColor: '#F79009', label: { text: isMobile ? (p.annotation!.length > 14 ? p.annotation!.slice(0, 12) + '…' : p.annotation) : p.annotation, orientation: 'vertical', position: 'top', style: { background: '#F79009', color: '#fff', fontSize: isMobile ? '9px' : '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, padding: { left: 6, right: 6, top: 3, bottom: 3 }, borderRadius: 4 } } })) },
  };
  const chartSeries = [
    { name: 'Impressions', data: series.map((p) => p.impressions) },
    { name: 'Clicks', data: series.map((p) => p.clicks) },
    { name: 'Conversions', data: series.map((p) => p.conversions) },
    { name: 'Spend', data: series.map((p) => p.spend) },
  ];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Megaphone className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Campaign Pulse</h2>
            <p className="text-xs text-[var(--text-muted)]">Campaign performance timeline — spend, impressions, clicks, conversions.</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" /></span>Live</span>
          <CardActionMenu cardName="Campaign Pulse" />
        </div>
      </div>
      {/* Compact metric overlay */}
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Total spend</p>
          <div className="flex items-baseline gap-2"><span className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">${(Data.campaignPulse.totalSpend / 1000).toFixed(1)}K</span><span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><ArrowUp className="size-3" strokeWidth={2.5} />{Data.campaignPulse.spendChange}</span></div>
        </div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Impressions</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{(Data.campaignPulse.impressions / 1000000).toFixed(2)}M</p></div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Clicks</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.campaignPulse.clicks.toLocaleString()}</p></div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Conversions</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.campaignPulse.conversions.toLocaleString()}</p></div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Blended ROAS</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.campaignPulse.blendedRoas}x</p></div>
        <div className="h-8 w-px bg-[var(--border-subtle)]" />
        <div><p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">CPA</p><p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">${Data.campaignPulse.cpa}</p></div>
      </div>
      <Chart options={options} series={chartSeries} type="line" height={isMobile ? 300 : 360} />
    </section>
  );
}

/* ============================================================
   Budget Pacing card — radial gauge
   ============================================================ */
function BudgetGauge({ value }: { value: number }) {
  const r = 52, circumference = 2 * Math.PI * r, offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={value > 80 ? '#F79009' : '#465FFF'} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}><animate attributeName="stroke-dashoffset" from={circumference} to={offset} dur="1200ms" fill="freeze" /></circle>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{value}%</span>
        <span className="text-[10px] text-[var(--text-muted)]">pacing</span>
      </div>
    </div>
  );
}

function BudgetPacingCard() {
  const [showSplit, setShowSplit] = React.useState(false);
  return (
    <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><Gauge className="size-4" strokeWidth={2} /></span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Budget Pacing</h3>
        </div>
        <CardActionMenu cardName="Budget Pacing" />
      </div>
      <div className="flex items-center gap-4">
        <BudgetGauge value={Data.budgetPacing.pacing} />
        <div className="flex-1 space-y-2 text-xs">
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">Monthly budget</span><span className="font-medium tabular-nums text-[var(--text-strong)]">${Data.budgetPacing.monthlyBudget.toLocaleString()}</span></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">Spent</span><span className="font-medium tabular-nums text-[var(--text-strong)]">${Data.budgetPacing.spent.toLocaleString()}</span></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">Remaining</span><span className="font-medium tabular-nums text-[var(--text-strong)]">${Data.budgetPacing.remaining.toLocaleString()}</span></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">Forecast EOM</span><span className="font-medium tabular-nums text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">${Data.budgetPacing.forecastedSpend.toLocaleString()}</span></div>
          <div className="flex items-center justify-between"><span className="text-[var(--text-muted)]">Daily burn</span><span className="font-medium tabular-nums text-[var(--text-strong)]">${Data.budgetPacing.dailyBurnRate.toLocaleString()}/day</span></div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--color-warning-200,rgba(247,144,9,0.3))] bg-[var(--color-warning-50)]/60 p-2 dark:bg-[rgba(247,144,9,0.08)]">
        <AlertCircle className="size-3.5 flex-shrink-0 text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]" strokeWidth={2.2} />
        <p className="text-[10px] text-[var(--color-warning-700)] dark:text-[var(--color-warning-500)]">{Data.budgetPacing.risk} · {Data.budgetPacing.daysAhead} days ahead of plan</p>
      </div>
      {/* Hover: channel split */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-3 border-t border-[var(--border-subtle)] pt-3">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Channel split</p>
            <div className="space-y-1.5">
              {Data.budgetPacing.channelSplit.map((ch) => (
                <div key={ch.channel} className="flex items-center gap-2 text-[10px]">
                  <span className="size-2 rounded-full" style={{ background: ch.color }} />
                  <span className="flex-1 text-[var(--text-muted)]">{ch.channel}</span>
                  <span className="font-medium tabular-nums text-[var(--text-strong)]">${(ch.amount / 1000).toFixed(1)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Live Campaign Alerts card
   ============================================================ */
function CampaignAlertsCard() {
  const severityConfig = {
    info: { icon: Info, cls: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]', border: 'border-l-[var(--color-info-500)]' },
    warning: { icon: AlertTriangle, cls: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]', border: 'border-l-[var(--color-warning-500)]' },
    critical: { icon: AlertCircle, cls: 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]', border: 'border-l-[var(--color-error-500)]' },
  };
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><Bell className="size-4" strokeWidth={2} /></span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Live Campaign Alerts</h3>
        </div>
        <span className="inline-flex items-center rounded-full bg-[var(--color-warning-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">{Data.campaignAlerts.length} alerts</span>
      </div>
      <div className="space-y-2">
        {Data.campaignAlerts.map((a) => {
          const cfg = severityConfig[a.severity];
          const Icon = cfg.icon;
          return (
            <div key={a.id} className={cn('group rounded-lg border-l-2 bg-[var(--surface-sunken)]/40 p-2.5 transition', cfg.border)}>
              <div className="flex items-start gap-2">
                <span className={cn('inline-flex size-6 flex-shrink-0 items-center justify-center rounded-md', cfg.cls)}><Icon className="size-3" strokeWidth={2.2} /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-1"><p className="text-xs font-medium text-[var(--text-strong)]">{a.title}</p><span className="text-[9px] text-[var(--text-subtle)]">{a.time}</span></div>
                  <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{a.detail}</p>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden"><p className="mt-1 text-[9px] text-[var(--text-body)]"><span className="font-medium">Action:</span> {a.action}</p></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Channel Signal Strip — icon-led social chips
   ============================================================ */
function ChannelSignalStrip() {
  return (
    <div className="flex flex-wrap gap-2">
      {Data.channelSignals.map((sig) => (
        <div key={sig.id} className="group flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 transition hover:border-[var(--border-strong)] hover:shadow-sm" title={sig.tooltip}>
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[var(--surface-sunken)] transition group-hover:scale-110">{getSocialIcon(sig.channel, 'size-4')}</span>
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{sig.label}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{sig.value}</span>
              <span className={cn('inline-flex items-center gap-0.5 text-[10px] font-medium', sig.trend === 'up' ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : sig.trend === 'down' ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--text-muted)]')}>
                {sig.trend === 'up' && <ArrowUp className="size-2.5" strokeWidth={2.5} />}
                {sig.trend === 'down' && <ArrowDown className="size-2.5" strokeWidth={2.5} />}
                {sig.trendValue}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   Channel War Room — bento grid of channel cards
   ============================================================ */
function ChannelWarRoom() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><LayoutGrid className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Channel War Room</h2>
            <p className="text-xs text-[var(--text-muted)]">Per-channel performance with spend, CPA, ROAS, and live signals.</p>
          </div>
        </div>
        <CardActionMenu cardName="Channel War Room" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Data.channelPerformance.map((ch) => (
          <div
            key={ch.id}
            className={cn(
              'group relative rounded-xl border p-3.5 transition hover:shadow-md',
              ch.highlight === 'best' ? 'border-[var(--color-success-300)] bg-[var(--color-success-50)]/30 dark:bg-[rgba(18,183,106,0.04)] dark:border-[rgba(18,183,106,0.3)]'
              : ch.highlight === 'high-spend' ? 'border-[var(--color-brand-300)] bg-[var(--color-brand-50)]/30 dark:bg-[rgba(70,95,255,0.04)] dark:border-[rgba(70,95,255,0.3)]'
              : ch.highlight === 'risk' ? 'border-[var(--color-warning-300)] bg-[var(--color-warning-50)]/30 dark:bg-[rgba(247,144,9,0.04)] dark:border-[rgba(247,144,9,0.3)]'
              : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
            )}
          >
            {/* Highlight badge */}
            {ch.highlight === 'best' && <span className="absolute -top-2 left-3 inline-flex items-center gap-0.5 rounded-full bg-[var(--color-success-500)] px-2 py-0.5 text-[8px] font-medium uppercase tracking-wide text-white"><Star className="size-2" strokeWidth={2.5} />Best</span>}
            {ch.highlight === 'high-spend' && <span className="absolute -top-2 left-3 inline-flex items-center gap-0.5 rounded-full bg-[var(--color-brand-500)] px-2 py-0.5 text-[8px] font-medium uppercase tracking-wide text-white"><DollarSign className="size-2" strokeWidth={2.5} />Top spend</span>}
            {ch.highlight === 'risk' && <span className="absolute -top-2 left-3 inline-flex items-center gap-0.5 rounded-full bg-[var(--color-warning-500)] px-2 py-0.5 text-[8px] font-medium uppercase tracking-wide text-white"><AlertTriangle className="size-2" strokeWidth={2.5} />Risk</span>}
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--card)] transition group-hover:scale-110">{getSocialIcon(ch.channel, 'size-4.5')}</span>
                <span className="text-sm font-medium text-[var(--text-strong)]">{ch.name}</span>
              </div>
              <span className={cn('size-2 rounded-full', ch.status === 'active' ? 'bg-[var(--color-success-500)]' : ch.status === 'at-risk' ? 'bg-[var(--color-warning-500)]' : 'bg-[var(--text-faint)]')} />
            </div>
            {/* Main metric */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">Spend</p>
                <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">${(ch.spend / 1000).toFixed(1)}K</p>
              </div>
              <Sparkline data={ch.sparkline} color={ch.highlight === 'risk' ? '#F79009' : ch.highlight === 'best' ? '#12B76A' : '#465FFF'} height={28} width={60} />
            </div>
            {/* ROAS + CPA */}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-2 text-[10px]">
              <div><span className="text-[var(--text-subtle)]">ROAS</span><p className={cn('font-medium tabular-nums', ch.roas >= 5 ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-strong)]')}>{ch.roas}x</p></div>
              <div><span className="text-[var(--text-subtle)]">CPA</span><p className="font-medium tabular-nums text-[var(--text-strong)]">${ch.cpa}</p></div>
            </div>
            {/* Hover: expanded metrics */}
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="mt-2 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-2 text-[10px]">
                  <div><span className="text-[var(--text-subtle)]">Impr.</span><p className="font-medium tabular-nums text-[var(--text-body)]">{ch.impressions}</p></div>
                  <div><span className="text-[var(--text-subtle)]">Clicks</span><p className="font-medium tabular-nums text-[var(--text-body)]">{ch.clicks.toLocaleString()}</p></div>
                  <div><span className="text-[var(--text-subtle)]">CTR</span><p className="font-medium tabular-nums text-[var(--text-body)]">{ch.ctr}%</p></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Creative Performance Board
   ============================================================ */
function CreativeBoard() {
  const typeIcons = { cta: Target, video: Video, carousel: LayoutGrid, headline: Type };
  const statusConfig = {
    winner: { label: 'Winner', cls: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' },
    running: { label: 'Running', cls: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' },
    testing: { label: 'Testing', cls: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]' },
    'needs-data': { label: 'Needs data', cls: 'bg-[var(--surface-sunken)] text-[var(--text-muted)]' },
  };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-violet-50,#f5f3ff)] text-[#7a5af8] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#a78bfa]"><Sparkles className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Creative Performance Board</h2>
            <p className="text-xs text-[var(--text-muted)]">A/B test winners, lift, and confidence signals.</p>
          </div>
        </div>
        <CardActionMenu cardName="Creative Board" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Data.creativeTests.map((test, i) => {
          const Icon = typeIcons[test.type];
          const status = statusConfig[test.status];
          return (
            <div key={test.id} className="group rounded-xl border border-[var(--border-subtle)] p-3.5 transition hover:border-[var(--border-strong)] hover:shadow-sm" style={{ animation: `ecomFadeIn 400ms ease-out ${i * 80}ms both` }}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[var(--surface-sunken)] text-[var(--text-muted)]"><Icon className="size-3.5" strokeWidth={2} /></span>
                  <span className="text-xs font-medium text-[var(--text-strong)]">{test.test}</span>
                </div>
                <span className={cn('inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide', status.cls)}>{status.label}</span>
              </div>
              {/* Ad preview thumbnail blocks */}
              <div className="mb-2 flex gap-1.5">
                <div className="flex-1 rounded-lg border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--surface-sunken)] to-[var(--card)] p-2 text-center">
                  <p className="text-[8px] uppercase tracking-wider text-[var(--text-subtle)]">Variant A</p>
                  <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{test.variants.split(' vs ')[0]}</p>
                </div>
                <div className={cn('flex-1 rounded-lg border p-2 text-center', test.status === 'winner' ? 'border-[var(--color-success-300)] bg-[var(--color-success-50)]/40 dark:bg-[rgba(18,183,106,0.06)]' : 'border-[var(--border-subtle)] bg-gradient-to-br from-[var(--surface-sunken)] to-[var(--card)]')}>
                  <p className="text-[8px] uppercase tracking-wider text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Winner</p>
                  <p className="mt-0.5 text-[10px] font-medium text-[var(--text-strong)]">{test.winner.replace('Variant B (', '').replace(')', '')}</p>
                </div>
              </div>
              {/* Lift + confidence */}
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--text-muted)]">Lift</span>
                  <span className="inline-flex items-center gap-0.5 font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><ArrowUp className="size-2.5" strokeWidth={2.5} />{test.lift}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--text-muted)]">Confidence</span>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-12 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${test.confidence}%`, background: test.confidence >= 90 ? '#12B76A' : test.confidence >= 80 ? '#F79009' : '#64748B' }} /></div>
                    <span className="font-medium tabular-nums text-[var(--text-strong)]">{test.confidence}%</span>
                  </div>
                </div>
              </div>
              {/* Hover: full metrics */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="mt-2 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-2 text-[10px]">
                    <div><span className="text-[var(--text-subtle)]">Impr.</span><p className="font-medium tabular-nums text-[var(--text-body)]">{test.impressions.toLocaleString()}</p></div>
                    <div><span className="text-[var(--text-subtle)]">CTR</span><p className="font-medium tabular-nums text-[var(--text-body)]">{test.ctr}%</p></div>
                    <div><span className="text-[var(--text-subtle)]">CPA</span><p className="font-medium tabular-nums text-[var(--text-body)]">${test.cpa}</p></div>
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
   Attribution Path — flow visualization
   ============================================================ */
function AttributionPathCard() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const maxConv = Math.max(...Data.attributionPaths.map((p) => p.conversions));

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"><MousePointerClick className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Attribution Path</h2>
            <p className="text-xs text-[var(--text-muted)]">Assisted conversion paths — touchpoint sequences.</p>
          </div>
        </div>
        <CardActionMenu cardName="Attribution Path" />
      </div>
      <div className="space-y-2.5">
        {Data.attributionPaths.map((path, i) => {
          const thickness = (path.conversions / maxConv) * 100;
          const isHovered = hovered === i;
          return (
            <div
              key={path.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn('rounded-xl border p-3 transition', isHovered ? 'border-[var(--color-brand-300)] bg-[var(--surface-sunken)]' : 'border-[var(--border-subtle)]')}
            >
              {/* Path flow */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {path.path.map((node, ni) => {
                  const isChannel = path.channels.includes(node.toLowerCase().split(' ')[0]) || ['Google Ads', 'YouTube', 'LinkedIn', 'Instagram', 'Newsletter', 'Email'].includes(node);
                  const channelKey = node.toLowerCase().includes('google') ? 'google' : node.toLowerCase().includes('youtube') ? 'youtube' : node.toLowerCase().includes('linkedin') ? 'linkedin' : node.toLowerCase().includes('instagram') ? 'instagram' : node.toLowerCase().includes('email') || node.toLowerCase().includes('newsletter') ? 'email' : 'email';
                  return (
                    <React.Fragment key={ni}>
                      <div className={cn('flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1.5 transition', isChannel ? 'border-[var(--color-brand-200,rgba(70,95,255,0.3)] bg-[var(--color-brand-50)]/40 dark:bg-[rgba(70,95,255,0.06)]' : 'border-[var(--border-subtle)] bg-[var(--card)]')}>
                        {isChannel && <span className="inline-flex size-4 items-center justify-center">{getSocialIcon(channelKey, 'size-3.5')}</span>}
                        <span className="text-[10px] font-medium text-[var(--text-strong)]">{node}</span>
                      </div>
                      {ni < path.path.length - 1 && <ChevronRight className={cn('size-3 flex-shrink-0 transition', isHovered ? 'text-[var(--color-brand-500)]' : 'text-[var(--text-faint)]')} strokeWidth={2.5} />}
                    </React.Fragment>
                  );
                })}
              </div>
              {/* Conversions + share bar */}
              <div className="mt-2 flex items-center gap-3">
                <div className="flex-1">
                  <div className="h-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]"><div className="h-full rounded-full bg-[var(--color-brand-500)] transition-[width] duration-700" style={{ width: `${thickness}%`, animationDelay: `${i * 60}ms` }} /></div>
                </div>
                <span className="text-[10px] font-medium tabular-nums text-[var(--text-strong)]">{path.conversions} conv</span>
                <span className="text-[10px] tabular-nums text-[var(--text-muted)]">{path.share}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Top path: <span className="font-medium text-[var(--text-body)]">Google Ads → Pricing → Email → Signup</span></span>
        <span className="text-[var(--text-muted)]">{Data.attributionPaths.reduce((s, p) => s + p.conversions, 0).toLocaleString()} total</span>
      </div>
    </section>
  );
}

/* ============================================================
   Audience Segments — icon-led cards
   ============================================================ */
function AudienceSegmentsCard() {
  const segmentIcons = { new: Users, returning: Repeat, lookalike: Users, newsletter: Mail, abandoner: Target, enterprise: Briefcase };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"><Users className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Audience Segments</h2>
            <p className="text-xs text-[var(--text-muted)]">Audience size, engagement, conversion, and best channel.</p>
          </div>
        </div>
        <CardActionMenu cardName="Audience Segments" />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {Data.audienceSegments.map((seg) => {
          const Icon = segmentIcons[seg.icon];
          return (
            <div key={seg.id} className="group rounded-xl border border-[var(--border-subtle)] p-3 transition hover:border-[var(--border-strong)]">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Icon className="size-4" strokeWidth={2} /></span>
                <div className="min-w-0 flex-1"><p className="text-xs font-medium text-[var(--text-strong)]">{seg.name}</p><p className="text-[10px] text-[var(--text-muted)]">{seg.size} audience</p></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div><span className="text-[var(--text-subtle)]">CVR</span><p className="font-medium tabular-nums text-[var(--text-strong)]">{seg.conversion}%</p></div>
                <div><span className="text-[var(--text-subtle)]">CPA</span><p className="font-medium tabular-nums text-[var(--text-strong)]">${seg.cpa}</p></div>
                <div><span className="text-[var(--text-subtle)]">Eng.</span><p className="font-medium tabular-nums text-[var(--text-strong)]">{seg.engagement}%</p></div>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[9px] text-[var(--text-muted)]">
                <span className="text-[var(--text-subtle)]">Best:</span>{seg.bestChannel}
              </div>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden"><p className="mt-1.5 text-[9px] text-[var(--text-body)]"><span className="font-medium">Action:</span> {seg.action}</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* Import Repeat, Briefcase from lucide */

/* ============================================================
   Campaign Calendar — timeline
   ============================================================ */
function CampaignCalendar() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const statusConfig = {
    scheduled: { label: 'Scheduled', cls: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]', dot: 'bg-[var(--color-brand-500)]' },
    live: { label: 'Live', cls: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]', dot: 'bg-[var(--color-success-500)]' },
    'needs-review': { label: 'Needs review', cls: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]', dot: 'bg-[var(--color-warning-500)]' },
    completed: { label: 'Completed', cls: 'bg-[var(--surface-sunken)] text-[var(--text-muted)]', dot: 'bg-[var(--text-faint)]' },
  };
  const typeIcons = { creative: ImageIcon, email: Mail, social: Megaphone, video: Video, sale: Tag };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"><Calendar className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Campaign Calendar</h2>
            <p className="text-xs text-[var(--text-muted)]">Upcoming and active campaign moments.</p>
          </div>
        </div>
        <CardActionMenu cardName="Campaign Calendar" />
      </div>
      {/* Horizontal timeline */}
      <div className="relative overflow-x-auto">
        <div className="min-w-[560px]">
          {/* Timeline line */}
          <div className="absolute left-0 right-0 top-[36px] h-px bg-[var(--border)]" />
          <div className="relative flex justify-between gap-3">
            {Data.calendarEvents.map((ev, i) => {
              const Icon = typeIcons[ev.type];
              const status = statusConfig[ev.status];
              const isSel = selected === ev.id;
              return (
                <div key={ev.id} className="flex flex-1 flex-col items-center" style={{ animation: `ecomFadeIn 400ms ease-out ${i * 80}ms both` }}>
                  <span className="mb-2 text-[10px] font-medium text-[var(--text-muted)]">{ev.date}</span>
                  <button
                    type="button"
                    onClick={() => setSelected(isSel ? null : ev.id)}
                    className={cn('relative z-10 flex size-8 cursor-pointer items-center justify-center rounded-full border-2 transition', isSel ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] hover:border-[var(--color-brand-400)]')}
                    aria-label={ev.title}
                  >
                    <Icon className="size-3.5" strokeWidth={2.2} />
                  </button>
                  <div className={cn('mt-2 w-full rounded-lg border p-2 text-center transition', isSel ? 'border-[var(--color-brand-300)] bg-[var(--color-brand-50)]/40 dark:bg-[rgba(70,95,255,0.06)]' : 'border-[var(--border-subtle)]')}>
                    <p className="text-[10px] font-medium leading-tight text-[var(--text-strong)]">{ev.title}</p>
                    <p className="mt-0.5 text-[9px] text-[var(--text-muted)]">{ev.day} · {ev.channel}</p>
                    <span className={cn('mt-1 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide', status.cls)}>
                      <span className={cn('size-1 rounded-full', status.dot)} />{status.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {selected && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5 text-xs" style={{ animation: 'ecomPopoverIn 160ms ease-out' }}>
          <span className="text-[var(--text-muted)]">Selected: <span className="font-medium text-[var(--text-strong)]">{Data.calendarEvents.find((e) => e.id === selected)?.title}</span></span>
          <button className="inline-flex cursor-pointer items-center gap-1 font-medium text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">View details <ChevronRight className="size-3" strokeWidth={2.5} /></button>
        </div>
      )}
    </section>
  );
}

/* Import Image, Tag from lucide */

/* ============================================================
   Campaign Portfolio Table
   ============================================================ */
function CampaignPortfolioTable({ campaigns, onRowClick }: { campaigns: Campaign[]; onRowClick: (c: Campaign) => void }) {
  const [search, setSearch] = React.useState('');
  const [channelFilter, setChannelFilter] = React.useState('All');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [objectiveFilter, setObjectiveFilter] = React.useState('All');
  const [channelOpen, setChannelOpen] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [objectiveOpen, setObjectiveOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [actionMenuFor, setActionMenuFor] = React.useState<string | null>(null);
  const { toast } = useToast();
  const pageSize = 5;

  const channelOptions = ['All', 'Google Ads', 'Meta Ads', 'YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'Email'];
  const statusOptions = ['All', 'Active', 'Paused', 'Scheduled', 'Completed'];
  const objectiveOptions = ['All', 'Conversions', 'Awareness', 'Retention', 'Reach', 'Leads', 'Consideration'];

  const filtered = React.useMemo(() => {
    return campaigns.filter((c) => {
      if (channelFilter !== 'All' && c.channel !== channelFilter) return false;
      if (statusFilter !== 'All' && c.status !== statusFilter) return false;
      if (objectiveFilter !== 'All' && c.objective !== objectiveFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!c.name.toLowerCase().includes(q) && !c.channel.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [campaigns, search, channelFilter, statusFilter, objectiveFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

  function handleAction(action: string, campaign: Campaign) {
    setActionMenuFor(null);
    toast({ title: `${action} — ${campaign.name}`, description: campaign.channel });
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Megaphone className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Campaign Portfolio</h2>
            <p className="text-xs text-[var(--text-muted)]">All active and historical campaigns — click row for detail.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
            <input type="search" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search campaigns..." className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)] sm:w-48" />
          </div>
          <div className="relative">
            <button type="button" onClick={() => { setChannelOpen((p) => !p); setStatusOpen(false); setObjectiveOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Channel<ChevronDown className={cn('size-3 transition-transform', channelOpen && 'rotate-180')} strokeWidth={2.2} /></button>
            <Popover open={channelOpen} onClose={() => setChannelOpen(false)} align="right" width={140}>{channelOptions.map((ch) => (<PopoverItem key={ch} active={channelFilter === ch} onClick={() => { setChannelFilter(ch); setChannelOpen(false); setPage(1); }}>{ch}</PopoverItem>))}</Popover>
          </div>
          <div className="relative">
            <button type="button" onClick={() => { setStatusOpen((p) => !p); setChannelOpen(false); setObjectiveOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Status<ChevronDown className={cn('size-3 transition-transform', statusOpen && 'rotate-180')} strokeWidth={2.2} /></button>
            <Popover open={statusOpen} onClose={() => setStatusOpen(false)} align="right" width={140}>{statusOptions.map((s) => (<PopoverItem key={s} active={statusFilter === s} onClick={() => { setStatusFilter(s); setStatusOpen(false); setPage(1); }}>{s}</PopoverItem>))}</Popover>
          </div>
          <div className="relative">
            <button type="button" onClick={() => { setObjectiveOpen((p) => !p); setChannelOpen(false); setStatusOpen(false); }} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Objective<ChevronDown className={cn('size-3 transition-transform', objectiveOpen && 'rotate-180')} strokeWidth={2.2} /></button>
            <Popover open={objectiveOpen} onClose={() => setObjectiveOpen(false)} align="right" width={150}>{objectiveOptions.map((o) => (<PopoverItem key={o} active={objectiveFilter === o} onClick={() => { setObjectiveFilter(o); setObjectiveOpen(false); setPage(1); }}>{o}</PopoverItem>))}</Popover>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2.5 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Campaign</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Channel</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Objective</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Status</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Spend</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Impr.</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">CTR</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Conv.</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">CPA</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">ROAS</th>
              <th className="py-2.5 px-2 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Trend</th>
              <th className="py-2.5 pl-2 pr-1"></th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={12} className="py-12 text-center"><p className="text-sm font-medium text-[var(--text-strong)]">No campaigns found</p><p className="mt-1 text-xs text-[var(--text-muted)]">Try adjusting your search or filters.</p></td></tr>
            ) : paged.map((c) => {
              const channelKey = c.channel.toLowerCase().includes('google') ? 'google' : c.channel.toLowerCase().includes('meta') ? 'meta' : c.channel.toLowerCase().includes('youtube') ? 'youtube' : c.channel.toLowerCase().includes('instagram') ? 'instagram' : c.channel.toLowerCase().includes('tiktok') ? 'tiktok' : c.channel.toLowerCase().includes('linkedin') ? 'linkedin' : 'email';
              const statusTone = { Active: 'success', Paused: 'neutral', Scheduled: 'info', Completed: 'neutral' } as const;
              return (
                <tr key={c.id} onClick={() => onRowClick(c)} className="group cursor-pointer border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                  <td className="py-3 pl-1 pr-2"><p className="text-xs font-medium text-[var(--text-strong)]">{c.name}</p></td>
                  <td className="py-3 px-2"><div className="flex items-center gap-1.5"><span className="inline-flex size-4 items-center justify-center">{getSocialIcon(channelKey, 'size-3.5')}</span><span className="text-[10px] text-[var(--text-muted)]">{c.channel}</span></div></td>
                  <td className="py-3 px-2"><span className="text-[10px] text-[var(--text-muted)]">{c.objective}</span></td>
                  <td className="py-3 px-2"><StatusBadge tone={statusTone[c.status]} dot>{c.status}</StatusBadge></td>
                  <td className="py-3 px-2 text-right text-xs font-medium tabular-nums text-[var(--text-strong)]">{c.spend}</td>
                  <td className="py-3 px-2 text-right text-xs tabular-nums text-[var(--text-body)]">{c.impressions}</td>
                  <td className="py-3 px-2 text-right text-xs tabular-nums text-[var(--text-body)]">{c.ctr}</td>
                  <td className="py-3 px-2 text-right text-xs tabular-nums text-[var(--text-body)]">{c.conversions}</td>
                  <td className="py-3 px-2 text-right text-xs tabular-nums text-[var(--text-body)]">{c.cpa}</td>
                  <td className="py-3 px-2 text-right"><span className={cn('text-xs font-medium tabular-nums', parseFloat(c.roas) >= 5 ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-body)]')}>{c.roas}</span></td>
                  <td className="py-3 px-2"><div className="flex justify-center"><Sparkline data={c.trend} color="#465FFF" height={20} width={50} /></div></td>
                  <td className="py-3 pl-2 pr-1 text-right">
                    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                      <button type="button" onClick={() => setActionMenuFor(actionMenuFor === c.id ? null : c.id)} className="flex size-6 cursor-pointer items-center justify-center rounded-md text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100" aria-label={`Actions for ${c.name}`}><MoreHorizontal className="size-3.5" strokeWidth={2.2} /></button>
                      <Popover open={actionMenuFor === c.id} onClose={() => setActionMenuFor(null)} align="right" width={160}>
                        <PopoverItem icon={Eye} onClick={() => handleAction('View', c)}>View details</PopoverItem>
                        <PopoverItem icon={Target} onClick={() => handleAction('Edit', c)}>Edit campaign</PopoverItem>
                        <PopoverItem icon={Copy} onClick={() => handleAction('Duplicate', c)}>Duplicate</PopoverItem>
                        <div className="my-1 h-px bg-[var(--border-subtle)]" />
                        <PopoverItem icon={X} danger onClick={() => handleAction('Pause', c)}>Pause campaign</PopoverItem>
                      </Popover>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Showing {paged.length} of {filtered.length} campaigns</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current === 1} className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50"><ChevronRight className="size-3 rotate-180" strokeWidth={2.5} />Prev</button>
          <span className="px-2 text-xs tabular-nums text-[var(--text-muted)]">{current} / {totalPages}</span>
          <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={current === totalPages} className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50">Next<ChevronRight className="size-3" strokeWidth={2.5} /></button>
        </div>
      </div>
    </section>
  );
}

/* Import Copy icon */

/* ============================================================
   Social Content Performance
   ============================================================ */
function SocialContentCard() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"><Share2 className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Social Content Performance</h2>
            <p className="text-xs text-[var(--text-muted)]">Organic reach and engagement by platform.</p>
          </div>
        </div>
        <CardActionMenu cardName="Social Content" />
      </div>
      <div className="space-y-2">
        {Data.socialContent.map((sc) => (
          <div key={sc.id} className="group flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-2.5 transition hover:border-[var(--border-strong)]">
            <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--card)] transition group-hover:scale-110">{getSocialIcon(sc.platform === 'twitter' ? 'twitter' : sc.platform, 'size-5')}</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[var(--text-strong)]">{sc.name}</p>
              <p className="truncate text-[10px] text-[var(--text-muted)]">Top: {sc.topPost}</p>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-strong)]">{sc.reach}</p><p className="text-[var(--text-muted)]">reach</p></div>
              <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-strong)]">{sc.engagement}%</p><p className="text-[var(--text-muted)]">eng.</p></div>
              <div className="text-right"><p className="font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{sc.followers}</p><p className="text-[var(--text-muted)]">followers</p></div>
              <Sparkline data={sc.sparkline} color="#465FFF" height={20} width={45} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Import Share2 icon */

/* ============================================================
   Email Lifecycle Performance
   ============================================================ */
function EmailLifecycleCard() {
  const flowIcons = { welcome: UserPlus, winback: RefreshCw, newsletter: Mail, launch: Rocket };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><Mail className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Email Lifecycle Performance</h2>
            <p className="text-xs text-[var(--text-muted)]">Flow performance with open and click rates.</p>
          </div>
        </div>
        <CardActionMenu cardName="Email Lifecycle" />
      </div>
      {/* Mini stats */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Subscribers</p><p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.emailStats.subscribers.toLocaleString()}</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Open rate</p><p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.emailStats.openRate}%</p></div>
        <div className="rounded-lg border border-[var(--border-subtle)] p-2"><p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Click rate</p><p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.emailStats.clickRate}%</p></div>
      </div>
      {/* Flow list */}
      <div className="space-y-2">
        {Data.emailFlows.map((flow) => {
          const Icon = flowIcons[flow.type];
          return (
            <div key={flow.id} className="group flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-2.5 transition hover:border-[var(--border-strong)]">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--surface-sunken)] text-[var(--text-muted)]"><Icon className="size-4" strokeWidth={2} /></span>
              <div className="min-w-0 flex-1"><p className="text-xs font-medium text-[var(--text-strong)]">{flow.name}</p><p className="text-[10px] text-[var(--text-muted)]">{flow.sent.toLocaleString()} sent</p></div>
              <div className="flex items-center gap-3 text-[10px]">
                <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-strong)]">{flow.openRate}%</p><p className="text-[var(--text-muted)]">open</p></div>
                <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-strong)]">{flow.clickRate}%</p><p className="text-[var(--text-muted)]">click</p></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Delivered: <span className="font-medium tabular-nums text-[var(--text-strong)]">{Data.emailStats.deliveredRate}%</span></span>
        <span className="text-[var(--text-muted)]">Unsub: <span className="font-medium tabular-nums text-[var(--text-strong)]">{Data.emailStats.unsubscribeRate}%</span></span>
      </div>
    </section>
  );
}

/* Import UserPlus, RefreshCw, Rocket icons */

/* ============================================================
   Keyword Intelligence
   ============================================================ */
function KeywordIntelligenceCard() {
  const intentConfig = {
    Commercial: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    Transactional: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    Informational: 'bg-[var(--color-info-50)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
    Navigational: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
  };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"><Search className="size-5" strokeWidth={2} /></span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Keyword Intelligence</h2>
            <p className="text-xs text-[var(--text-muted)]">Top performing keywords with intent and cost signals.</p>
          </div>
        </div>
        <CardActionMenu cardName="Keyword Intelligence" />
      </div>
      <div className="space-y-1.5">
        {Data.keywords.map((kw, i) => (
          <div key={kw.id} className="group flex items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] p-2 transition hover:border-[var(--border-strong)]">
            <span className="text-xs font-medium tabular-nums text-[var(--text-subtle)]">#{i + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <code className="text-xs font-medium text-[var(--text-strong)]">{kw.keyword}</code>
                <span className={cn('inline-flex items-center rounded px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide', intentConfig[kw.intent])}>{kw.intent}</span>
              </div>
              <p className="truncate text-[10px] text-[var(--text-muted)]">→ {kw.landingPage}</p>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-strong)]">{kw.volume}</p><p className="text-[var(--text-muted)]">vol</p></div>
              <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-strong)]">{kw.ctr}%</p><p className="text-[var(--text-muted)]">CTR</p></div>
              <div className="text-right"><p className="font-medium tabular-nums text-[var(--text-strong)]">{kw.cpc}</p><p className="text-[var(--text-muted)]">CPC</p></div>
              <span className={cn('inline-flex items-center gap-0.5 font-medium', kw.trend === 'up' ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : kw.trend === 'down' ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--text-muted)]')}>
                {kw.trend === 'up' && <ArrowUp className="size-2.5" strokeWidth={2.5} />}
                {kw.trend === 'down' && <ArrowDown className="size-2.5" strokeWidth={2.5} />}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   New Campaign Drawer
   ============================================================ */
function NewCampaignDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (campaign: Campaign) => void }) {
  const [form, setForm] = React.useState({ name: '', channel: 'Google Ads' as Campaign['channel'], objective: 'Conversions' as Campaign['objective'], budget: '', startDate: '', endDate: '', audience: '', creativeType: '', notes: '' });

  React.useEffect(() => {
    if (!open) return;
    function escHandler(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', escHandler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', escHandler); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  function handleSubmit() {
    if (!form.name.trim() || !form.budget.trim()) return;
    const budget = parseInt(form.budget, 10) || 1000;
    const newCampaign: Campaign = {
      id: `c${Date.now()}`,
      name: form.name.trim(),
      channel: form.channel,
      objective: form.objective,
      status: 'Scheduled',
      spend: `$${(budget / 1000).toFixed(1)}K`,
      spendNum: budget,
      impressions: '0',
      ctr: '0%',
      conversions: 0,
      cpa: '$0',
      roas: '—',
      trend: [0, 0, 0, 0, 0, 0, 0],
    };
    onCreate(newCampaign);
    setForm({ name: '', channel: 'Google Ads', objective: 'Conversions', budget: '', startDate: '', endDate: '', audience: '', creativeType: '', notes: '' });
    onClose();
  }

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="New campaign">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white"><Plus className="size-4.5" strokeWidth={2.2} /></span>
            <div><h3 className="text-base font-medium text-[var(--text-strong)]">New Campaign</h3><p className="text-xs text-[var(--text-muted)]">Create a new marketing campaign.</p></div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close drawer"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Campaign name <span className="text-[var(--color-error-600)]">*</span></label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Summer Mega Sale 2026" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Channel</label><select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value as Campaign['channel'] })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"><option>Google Ads</option><option>Meta Ads</option><option>YouTube</option><option>Instagram</option><option>TikTok</option><option>LinkedIn</option><option>Email</option></select></div>
            <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Objective</label><select value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value as Campaign['objective'] })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"><option>Conversions</option><option>Awareness</option><option>Retention</option><option>Reach</option><option>Leads</option><option>Consideration</option></select></div>
          </div>
          <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Budget ($) <span className="text-[var(--color-error-600)]">*</span></label><input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="e.g. 5000" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Start date</label><input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]" /></div>
            <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">End date</label><input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]" /></div>
          </div>
          <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Target audience</label><input type="text" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} placeholder="e.g. Lookalike 1%, age 25-44" className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" /></div>
          <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Creative type</label><select value={form.creativeType} onChange={(e) => setForm({ ...form, creativeType: e.target.value })} className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"><option value="">Select type</option><option>Single image</option><option>Video</option><option>Carousel</option><option>Collection</option><option>Story</option><option>Reel</option></select></div>
          <div><label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Notes</label><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Internal notes (optional)" className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]" /></div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button type="button" onClick={onClose} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">Cancel</button>
          <button type="button" onClick={handleSubmit} disabled={!form.name.trim() || !form.budget.trim()} className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50">Create campaign</button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Campaign Detail Drawer
   ============================================================ */
function CampaignDetailDrawer({ campaign, onClose }: { campaign: Campaign | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!campaign) return;
    function escHandler(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', escHandler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', escHandler); document.body.style.overflow = ''; };
  }, [campaign, onClose]);

  if (!campaign || typeof document === 'undefined') return null;
  const channelKey = campaign.channel.toLowerCase().includes('google') ? 'google' : campaign.channel.toLowerCase().includes('meta') ? 'meta' : campaign.channel.toLowerCase().includes('youtube') ? 'youtube' : campaign.channel.toLowerCase().includes('instagram') ? 'instagram' : campaign.channel.toLowerCase().includes('tiktok') ? 'tiktok' : campaign.channel.toLowerCase().includes('linkedin') ? 'linkedin' : 'email';

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl" style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }} role="dialog" aria-label="Campaign detail">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--surface-sunken)]">{getSocialIcon(channelKey, 'size-5')}</span>
            <div><h3 className="text-base font-medium text-[var(--text-strong)]">{campaign.name}</h3><p className="text-xs text-[var(--text-muted)]">{campaign.channel} · {campaign.objective}</p></div>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]" aria-label="Close drawer"><X className="size-4" strokeWidth={2.2} /></button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Status</p><StatusBadge tone={campaign.status === 'Active' ? 'success' : campaign.status === 'Paused' ? 'neutral' : 'info'} dot>{campaign.status}</StatusBadge></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Spend</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{campaign.spend}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Impressions</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{campaign.impressions}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">CTR</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{campaign.ctr}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Conversions</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{campaign.conversions}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">CPA</p><p className="text-sm font-medium tabular-nums text-[var(--text-strong)]">{campaign.cpa}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">ROAS</p><p className="text-sm font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{campaign.roas}</p></div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5"><p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Objective</p><p className="text-sm font-medium text-[var(--text-strong)]">{campaign.objective}</p></div>
          </div>
          {/* Trend */}
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">7-day trend</h4>
            <div className="rounded-xl border border-[var(--border-subtle)] p-3"><Sparkline data={campaign.trend} color="#465FFF" height={48} width={280} /></div>
          </div>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Main Marketing Dashboard export
   ============================================================ */
export function MarketingDashboard() {
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [campaigns, setCampaigns] = React.useState<Campaign[]>(Data.campaigns);
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);

  function handleCreateCampaign(campaign: Campaign) {
    setCampaigns((prev) => [campaign, ...prev]);
    toast({ title: 'Campaign created', description: `${campaign.name} — ${campaign.channel}` });
  }

  return (
    <div className="space-y-6">
      <MarketingHeader onNewCampaign={() => setDrawerOpen(true)} />

      {/* Top hero: Campaign Pulse (left, large) + Budget Pacing + Alerts (right, stacked) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <CampaignPulseHero />
        <div className="flex flex-col gap-4">
          <BudgetPacingCard />
          <CampaignAlertsCard />
        </div>
      </div>

      {/* Channel Signal Strip */}
      <ChannelSignalStrip />

      {/* Channel War Room (full width) */}
      <ChannelWarRoom />

      {/* Creative Board + Attribution Path */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CreativeBoard />
        <AttributionPathCard />
      </div>

      {/* Audience Segments + Campaign Calendar */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AudienceSegmentsCard />
        <CampaignCalendar />
      </div>

      {/* Campaign Portfolio (full width) */}
      <CampaignPortfolioTable campaigns={campaigns} onRowClick={setSelectedCampaign} />

      {/* Social Content + Email Lifecycle + Keyword Intelligence */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <SocialContentCard />
        <EmailLifecycleCard />
        <KeywordIntelligenceCard />
      </div>

      {/* Drawers */}
      <NewCampaignDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onCreate={handleCreateCampaign} />
      <CampaignDetailDrawer campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
    </div>
  );
}
