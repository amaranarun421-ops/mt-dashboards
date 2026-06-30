'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, ChevronLeft,
  MoreHorizontal, Eye, Users, Activity, Zap, TrendingUp, TrendingDown,
  AlertCircle, Info, Star, RefreshCw, Link2, Search,
  X, FileText, Filter, CreditCard, Layers, Plug, Boxes,
  Building2, UserPlus, Sparkles, Target, Heart, CircuitBoard,
  TriangleAlert, CircleDollarSign, Workflow, Gauge as GaugeIcon,
  Crown, Rocket, UserCheck, Mail, ArrowRight, Dot,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from './analytics-interactions';
import * as Data from './saas-data';
import type {
  Invoice, InvoiceStatus, LifecycleCustomer, LifecycleGroupKey, CustomerDetail,
} from './saas-data';

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
      copy: `${cardName} report link copied to clipboard`,
      hide: `${cardName} hidden from layout`,
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
        <PopoverItem icon={Eye} onClick={() => handleAction('view')}>View details</PopoverItem>
        <PopoverItem icon={Download} onClick={() => handleAction('download')}>Download chart</PopoverItem>
        <PopoverItem icon={Link2} onClick={() => handleAction('copy')}>Copy report link</PopoverItem>
        <div className="my-1 h-px bg-[var(--border-subtle)]" />
        <PopoverItem icon={X} danger onClick={() => handleAction('hide')}>Hide card</PopoverItem>
      </Popover>
    </div>
  );
}

/* ============================================================
   Sparkline — tiny inline trend line
   ============================================================ */
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
      <defs>
        <linearGradient id={`saas-sp-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#saas-sp-${id})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        strokeDasharray="100"
        strokeDashoffset="100"
      >
        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="800ms" fill="freeze" begin="120ms" />
      </polyline>
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="2" fill={color}>
        <animate attributeName="r" values="2;3.5;2" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ============================================================
   Brand SVG icons — Stripe, Slack, GitHub, GA, HubSpot, Zapier
   ============================================================ */
function StripeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 25" className={className} aria-hidden>
      <path fill="currentColor" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 5.86c1.46 0 2.24.78 2.24 2.5v11.06h4.4V8.34c0-3.86-2.07-5.39-5.04-5.39-1.83 0-3.43.65-4.81 1.96V0h-4.4v19.42h4.4V8.78c.85-.95 1.92-1.46 3.21-1.46v-1.46zM26.27 13.55c0 1.62 1.32 2.46 2.78 2.46 1.07 0 2.04-.34 2.94-.83v3.36c-.92.49-2.06.79-3.43.79-3.71 0-6.7-2.18-6.7-6.84V6.94h-2.45V3.55h2.45V0h4.41v3.55h4.04v3.39h-4.04v6.61zM12.46 5.86c1.46 0 2.24.78 2.24 2.5v11.06h4.4V8.34c0-3.86-2.07-5.39-5.04-5.39-1.83 0-3.43.65-4.81 1.96V0h-4.4v19.42h4.4V8.78c.85-.95 1.92-1.46 3.21-1.46v-1.46zM4.32 6.6C4.32 5.39 3.36 4.55 2.02 4.55c-1.34 0-2.31.84-2.31 2.05 0 1.21.97 2.05 2.31 2.05 1.34 0 2.30-.84 2.30-2.05z" transform="translate(0, 1)" />
    </svg>
  );
}
function SlackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#E01E5A" d="M5.04 15.16a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52zm1.28 0a2.52 2.52 0 1 1 5.04 0v6.32a2.52 2.52 0 1 1-5.04 0v-6.32z" />
      <path fill="#36C5F0" d="M8.84 5.04a2.52 2.52 0 1 1 2.52-2.52v2.52H8.84zm0 1.28a2.52 2.52 0 1 1 0 5.04H2.52a2.52 2.52 0 1 1 0-5.04h6.32z" />
      <path fill="#2EB67D" d="M18.96 8.84a2.52 2.52 0 1 1 2.52 2.52h-2.52V8.84zm-1.28 0a2.52 2.52 0 1 1-5.04 0V2.52a2.52 2.52 0 1 1 5.04 0v6.32z" />
      <path fill="#ECB22E" d="M15.16 18.96a2.52 2.52 0 1 1-2.52 2.52v-2.52h2.52zm0-1.28a2.52 2.52 0 1 1 0-5.04h6.32a2.52 2.52 0 1 1 0 5.04h-6.32z" />
    </svg>
  );
}
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .314.21.683.825.566C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z" />
    </svg>
  );
}
function GoogleAnalyticsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#F9AB00" d="M22.84 2.998v17.999a2.984 2.984 0 0 1-2.967 2.998 2.984 2.984 0 0 1-2.967-2.998V2.998A2.984 2.984 0 0 1 19.873 0a2.984 2.984 0 0 1 2.967 2.998z" />
      <path fill="#E37400" d="M12 12v8.997a2.984 2.984 0 0 1-2.967 2.998A2.984 2.984 0 0 1 6.066 20.997V12a2.984 2.984 0 0 1 2.967-2.998A2.984 2.984 0 0 1 12 12z" />
      <path fill="#4285F4" d="M1.16 17v3.002a2.984 2.984 0 0 0 2.967 2.997 2.984 2.984 0 0 0 2.967-2.997V17a2.984 2.984 0 0 0-2.967-2.998A2.984 2.984 0 0 0 1.16 17z" />
    </svg>
  );
}
function HubSpotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#FF7A59" d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.27-1.983V3.04A2.198 2.198 0 0 0 17.241.846h-.061a2.198 2.198 0 0 0-2.198 2.194v.061c0 .886.529 1.65 1.27 1.983V7.93a6.234 6.234 0 0 0-2.962 1.31L5.378 2.668a2.475 2.475 0 1 0-1.198 1.59l8.535 6.593a6.265 6.265 0 0 0-.094 6.986l-2.594 2.594a2.026 2.026 0 0 0-.585-.094 2.04 2.04 0 1 0 2.04 2.04c0-.2-.034-.394-.094-.585l2.57-2.57a6.272 6.272 0 1 0 4.207-11.302zm-.864 9.396a3.155 3.155 0 1 1 0-6.31 3.155 3.155 0 0 1 0 6.31z" />
    </svg>
  );
}
function ZapierIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#FF4F00" d="M15.123 12.001c0-.564-.092-1.106-.26-1.613a8.584 8.584 0 0 0-2.248 2.248c.507.168 1.049.26 1.613.26.171 0 .338-.013.503-.034.197-.27.392-.572.392-.861zm-1.613 1.613a6.27 6.27 0 0 1-2.248-2.248 4.78 4.78 0 0 1 4.495.001l3.001-3.001A8.58 8.58 0 0 0 13.51 9c-.013-.027-.027-.052-.04-.079A6.267 6.267 0 0 1 12 5.248 6.27 6.27 0 0 1 9.752 3a8.583 8.583 0 0 0-3.001 7.488L3.75 13.488a8.583 8.583 0 0 0 7.489-3.001l3 3.001a8.583 8.583 0 0 0-3.001 7.488l3.001-3a8.58 8.58 0 0 0 7.489-3.001l-3.001-3a8.583 8.583 0 0 0-7.488-3.001l-3-3.001c.027-.013.052-.027.079-.04A6.267 6.267 0 0 1 13.5 7.5a6.27 6.27 0 0 1 2.249-2.248A8.583 8.583 0 0 0 13.5 2.25l3 3.001z" />
    </svg>
  );
}

function BrandIcon({ brand, className }: { brand: Data.Integration['brand']; className?: string }) {
  switch (brand) {
    case 'stripe':  return <StripeIcon className={className} />;
    case 'slack':   return <SlackIcon className={className} />;
    case 'github':  return <GitHubIcon className={className} />;
    case 'ga':      return <GoogleAnalyticsIcon className={className} />;
    case 'hubspot': return <HubSpotIcon className={className} />;
    case 'zapier':  return <ZapierIcon className={className} />;
  }
}

/* ============================================================
   SaaS Header
   ============================================================ */
function SaasHeader({ onAddCustomer }: { onAddCustomer: () => void }) {
  const { toast } = useToast();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [planOpen, setPlanOpen] = React.useState(false);
  const [segmentOpen, setSegmentOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [dateLabel, setDateLabel] = React.useState('May 24 – Jun 23, 2026');
  const [planFilter, setPlanFilter] = React.useState('All plans');
  const [segmentFilter, setSegmentFilter] = React.useState('All segments');

  function closeAll(except?: string) {
    if (except !== 'date') setDateOpen(false);
    if (except !== 'plan') setPlanOpen(false);
    if (except !== 'segment') setSegmentOpen(false);
    if (except !== 'export') setExportOpen(false);
  }

  function handleExportCsv() {
    setExportOpen(false);
    const headers = ['Invoice', 'Customer', 'Contact', 'Plan', 'Amount', 'Status', 'Due Date', 'Payment Method', 'Retry Status'];
    const rows = Data.invoices.map((inv) => [inv.invoice, inv.customer, inv.contact, inv.plan, String(inv.amount), inv.status, inv.dueDate, inv.paymentMethod, inv.retryStatus]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saas-invoices-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'CSV exported', description: `${Data.invoices.length} invoices downloaded` });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>Dashboards</span>
          <ChevronRight className="size-3 text-[var(--text-faint)]" />
          <span className="text-[var(--text-strong)]">SaaS</span>
        </nav>
        <h1 className="ds-page-title">SaaS Growth OS</h1>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">Monitor subscriptions, recurring revenue, activation, retention, churn, and customer expansion.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* Live status */}
        <div className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] px-2.5 py-1.5 dark:bg-[rgba(18,183,106,0.1)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" />
          </span>
          <span className="text-xs font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live · synced 1 min ago</span>
        </div>

        {/* Date range */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setDateOpen((p) => !p); closeAll('date'); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="dialog"
            aria-expanded={dateOpen}
          >
            <CalendarDays className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{dateLabel}</span>
            <span className="sm:hidden">Date</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', dateOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={dateOpen} onClose={() => setDateOpen(false)} width={240}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Date range</p></div>
            {Data.saasDatePresets.map((p) => (
              <PopoverItem
                key={p.key}
                active={dateLabel === p.range}
                onClick={() => { setDateLabel(p.range); setDateOpen(false); toast({ title: 'Date range updated', description: p.label }); }}
              >
                {p.label}
              </PopoverItem>
            ))}
          </Popover>
        </div>

        {/* Plan filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setPlanOpen((p) => !p); closeAll('plan'); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="menu"
            aria-expanded={planOpen}
          >
            <Layers className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{planFilter}</span>
            <span className="sm:hidden">Plan</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', planOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={planOpen} onClose={() => setPlanOpen(false)} width={180}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Plan</p></div>
            {Data.saasPlanFilters.map((p) => (
              <PopoverItem
                key={p}
                active={planFilter === p}
                onClick={() => { setPlanFilter(p); setPlanOpen(false); toast({ title: 'Plan filter applied', description: p }); }}
              >
                {p}
              </PopoverItem>
            ))}
          </Popover>
        </div>

        {/* Segment filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setSegmentOpen((p) => !p); closeAll('segment'); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="menu"
            aria-expanded={segmentOpen}
          >
            <Filter className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            <span className="hidden sm:inline">{segmentFilter}</span>
            <span className="sm:hidden">Segment</span>
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', segmentOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={segmentOpen} onClose={() => setSegmentOpen(false)} width={180}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Segment</p></div>
            {Data.saasSegments.map((s) => (
              <PopoverItem
                key={s}
                active={segmentFilter === s}
                onClick={() => { setSegmentFilter(s); setSegmentOpen(false); toast({ title: 'Segment filter applied', description: s }); }}
              >
                {s}
              </PopoverItem>
            ))}
          </Popover>
        </div>

        {/* Export */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setExportOpen((p) => !p); closeAll('export'); }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="menu"
            aria-expanded={exportOpen}
          >
            <Download className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
            Export
            <ChevronDown className={cn('size-3.5 text-[var(--text-muted)] transition-transform', exportOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={exportOpen} onClose={() => setExportOpen(false)} width={180}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export format</p></div>
            <PopoverItem icon={Download} onClick={handleExportCsv}>Export CSV</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => { setExportOpen(false); toast({ title: 'PDF export prepared', description: 'Your PDF report is being generated.' }); }}>Export PDF</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => { setExportOpen(false); toast({ title: 'XLS export prepared', description: 'Your XLS report is being generated.' }); }}>Export XLS</PopoverItem>
          </Popover>
        </div>

        {/* Add customer */}
        <button
          type="button"
          onClick={onAddCustomer}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]"
        >
          <UserPlus className="size-4" strokeWidth={2.5} />
          Add customer
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   MRR Waterfall Hero
   ============================================================ */
function MrrWaterfallHero() {
  const stages = Data.mrrWaterfall;
  const isMobile = useIsMobile();
  // For waterfall: each bar has a base and an amount. We compute base offsets.
  let running = 0;
  const bases: number[] = [];
  const tops: number[] = [];
  stages.forEach((s, i) => {
    if (s.kind === 'start') {
      bases[i] = 0; tops[i] = s.amount; running = s.amount;
    } else if (s.kind === 'end') {
      bases[i] = 0; tops[i] = s.amount;
    } else if (s.amount >= 0) {
      bases[i] = running; tops[i] = s.amount; running += s.amount;
    } else {
      running += s.amount; bases[i] = running; tops[i] = -s.amount;
    }
  });
  const colorMap: Record<string, string> = {
    start: '#465FFF', positive: '#12B76A', negative: '#F04438', end: '#7A5AF8',
  };
  const options: any = {
    chart: {
      type: 'bar', height: 380, fontFamily: 'Outfit, sans-serif',
      toolbar: { show: false },
      animations: {
        enabled: true, speed: 900,
        animateGradually: { enabled: true, delay: 90 },
        dynamicAnimation: { enabled: true, speed: 400 },
      },
    },
    plotOptions: {
      bar: { columnWidth: '46%', borderRadius: 6, borderRadiusApplication: 'end' },
    },
    colors: stages.map((s) => colorMap[s.kind]),
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 0.45, opacityFrom: 0.95, opacityTo: 0.78, stops: [0, 100] },
    },
    dataLabels: {
      enabled: true,
      offsetY: -8,
      style: { colors: ['var(--text-strong)'], fontSize: '11px', fontFamily: 'Outfit, sans-serif', fontWeight: 600 },
      formatter: (_v: number, { dataPointIndex }: any) => {
        const s = stages[dataPointIndex];
        const sign = s.kind === 'positive' ? '+' : s.kind === 'negative' ? '−' : '';
        return `${sign}$${Math.abs(s.amount / 1000).toFixed(1)}K`;
      },
    },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 16, right: 8, bottom: 0, left: isMobile ? 24 : 8 } },
    xaxis: {
      categories: stages.map((s) => s.label),
      labels: { style: { colors: 'var(--text-muted)', fontSize: isMobile ? '10px' : '11px', fontFamily: 'Outfit, sans-serif' }, rotate: isMobile ? -35 : 0, trim: false, hideOverlappingLabels: false },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--text-muted)', fontSize: isMobile ? '10px' : '11px', fontFamily: 'Outfit, sans-serif' },
        formatter: (v: number) => `$${(v / 1000).toFixed(0)}K`,
      },
    },
    legend: { show: false },
    tooltip: { enabled: true, custom: ({ dataPointIndex }: any) => {
      const s = stages[dataPointIndex];
      const sign = s.kind === 'positive' ? '+' : s.kind === 'negative' ? '−' : '';
      const pct = ((Math.abs(s.amount) / Data.mrrMetrics.startingMrr) * 100).toFixed(1);
      const kindLabel = { start: 'Starting balance', positive: 'Net addition', negative: 'Net reduction', end: 'Ending balance' }[s.kind];
      const kindColor = colorMap[s.kind];
      return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:220px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${kindColor};"></span>
          <span style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;">${s.label}</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr auto;gap:4px 16px;font-size:12px;">
          <span style="color:var(--text-body);">Contribution</span>
          <span style="color:${kindColor};font-weight:600;font-variant-numeric:tabular-nums;">${sign}$${Math.abs(s.amount).toLocaleString()}</span>
          <span style="color:var(--text-body);">Accounts</span>
          <span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">${s.accounts.toLocaleString()}</span>
          <span style="color:var(--text-body);">% of starting MRR</span>
          <span style="color:var(--text-strong);font-weight:600;font-variant-numeric:tabular-nums;">${pct}%</span>
          <span style="color:var(--text-body);">Type</span>
          <span style="color:var(--text-strong);font-weight:500;">${kindLabel}</span>
        </div>
        <div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border-subtle);font-size:10px;color:var(--text-muted);">${s.detail}</div>
      </div>`;
    } },
  };
  // Two stacked series: invisible base + visible delta creates the waterfall effect.
  const series = [
    { name: 'Base', data: bases.map((b) => b), color: 'transparent' },
    { name: 'Delta', data: tops.map((t) => t) },
  ];
  const stackedOptions: any = {
    ...options,
    chart: { ...options.chart, stacked: true, stackType: 'normal' },
    plotOptions: { ...options.plotOptions, bar: { ...options.plotOptions.bar, columnWidth: '52%', borderRadius: 0 } },
    dataLabels: {
      enabled: true,
      offsetY: -8,
      style: { colors: ['transparent', 'var(--text-strong)'], fontSize: '11px', fontFamily: 'Outfit, sans-serif', fontWeight: 600 },
      formatter: (_v: number, { seriesIndex, dataPointIndex }: any) => {
        if (seriesIndex === 0) return '';
        const s = stages[dataPointIndex];
        const sign = s.kind === 'positive' ? '+' : s.kind === 'negative' ? '−' : '';
        return `${sign}$${Math.abs(s.amount / 1000).toFixed(1)}K`;
      },
    },
    colors: [ 'rgba(0,0,0,0)', ...stages.map((s) => colorMap[s.kind]) ],
    fill: { type: ['solid', 'gradient'], gradient: { shadeIntensity: 0.45, opacityFrom: 0.95, opacityTo: 0.78, stops: [0, 100] } },
    legend: { show: false },
    tooltip: { enabled: true, custom: options.tooltip.custom, shared: false, intersect: true },
  };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <TrendingUp className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">MRR Waterfall</h2>
            <p className="text-xs text-[var(--text-muted)]">How recurring revenue moved this period — additions vs reductions.</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" />
            </span>
            Live
          </span>
          <CardActionMenu cardName="MRR Waterfall" />
        </div>
      </div>

      {/* Compact metric overlay */}
      <div className="mb-4 flex flex-wrap items-end gap-5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">MRR</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-[var(--text-strong)]">${(Data.mrrMetrics.mrr / 1000).toFixed(1)}K</span>
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
              <ArrowUp className="size-3" strokeWidth={2.5} />{Data.mrrMetrics.mrrChange}
            </span>
          </div>
        </div>
        <div className="h-9 w-px bg-[var(--border-subtle)]" />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">ARR</p>
          <p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">${(Data.mrrMetrics.arr / 1000000).toFixed(2)}M</p>
        </div>
        <div className="h-9 w-px bg-[var(--border-subtle)]" />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Net MRR growth</p>
          <p className="text-lg font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">+${(Data.mrrMetrics.netMrrGrowth / 1000).toFixed(1)}K</p>
        </div>
        <div className="h-9 w-px bg-[var(--border-subtle)]" />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">NRR</p>
          <p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.mrrMetrics.nrr}%</p>
        </div>
        <div className="h-9 w-px bg-[var(--border-subtle)]" />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">GRR</p>
          <p className="text-lg font-medium tabular-nums text-[var(--text-strong)]">{Data.mrrMetrics.grr}%</p>
        </div>
      </div>

      <Chart options={stackedOptions} series={series} type="bar" height={isMobile ? 320 : 380} />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="flex items-center gap-1.5 text-[var(--text-muted)]"><span className="size-2.5 rounded-sm" style={{ background: colorMap.start }} />Starting balance</span>
        <span className="flex items-center gap-1.5 text-[var(--text-muted)]"><span className="size-2.5 rounded-sm" style={{ background: colorMap.positive }} />Net addition</span>
        <span className="flex items-center gap-1.5 text-[var(--text-muted)]"><span className="size-2.5 rounded-sm" style={{ background: colorMap.negative }} />Net reduction</span>
        <span className="flex items-center gap-1.5 text-[var(--text-muted)]"><span className="size-2.5 rounded-sm" style={{ background: colorMap.end }} />Ending balance</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-50)]/60 px-2 py-1 text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.08)] dark:text-[var(--color-brand-300)]">
          <Info className="size-3" strokeWidth={2.2} />
          {Data.mrrMetrics.insight}
        </span>
      </div>
    </section>
  );
}

/* ============================================================
   Churn Risk Meter — radial gauge
   ============================================================ */
function ChurnRiskMeter() {
  const score = Data.churnRisk.churnRiskScore;
  const r = 56, circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const scoreColor = score < 33 ? '#12B76A' : score < 66 ? '#F79009' : '#F04438';
  return (
    <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]">
            <GaugeIcon className="size-4" strokeWidth={2} />
          </span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Churn Risk Meter</h3>
        </div>
        <CardActionMenu cardName="Churn Risk Meter" />
      </div>
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--surface-sunken)" strokeWidth="9" />
            <circle
              cx="70" cy="70" r={r} fill="none" stroke={scoreColor} strokeWidth="9" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
            >
              <animate attributeName="stroke-dashoffset" from={circumference} to={offset} dur="1100ms" fill="freeze" />
            </circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{score}</span>
            <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)]">risk score</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 rounded-full bg-[var(--color-warning-50)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
          <TriangleAlert className="size-3" strokeWidth={2.2} />Watch zone
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-3 text-center">
        <div>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Logo churn</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.churnRisk.logoChurn}%</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Revenue churn</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{Data.churnRisk.revenueChurn}%</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">At-risk MRR</p>
          <p className="text-sm font-semibold tabular-nums text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">${(Data.churnRisk.atRiskMrr / 1000).toFixed(1)}K</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px]">
        <span className="text-[var(--text-muted)]">Trend vs last month</span>
        <span className="inline-flex items-center gap-0.5 font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
          <ArrowDown className="size-3" strokeWidth={2.5} />{Data.churnRisk.trend}
        </span>
      </div>
      {/* Bands */}
      <div className="mt-2 flex h-1.5 overflow-hidden rounded-full">
        {Data.churnRisk.bands.map((b) => (
          <div key={b.label} className="flex-1" style={{ background: b.color, opacity: 0.6 }} title={`${b.label} (${b.range})`} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[9px] text-[var(--text-subtle)]">
        <span>0%</span><span>2%</span><span>4%+</span>
      </div>
    </div>
  );
}

/* ============================================================
   Expansion Pipeline — mini stacked
   ============================================================ */
function ExpansionPipelineCard() {
  const total = Data.expansionPipeline.drivers.reduce((s, d) => s + d.mrr, 0);
  return (
    <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[#f5f3ff] text-[#6d28d9] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#a78bfa]">
            <Rocket className="size-4" strokeWidth={2} />
          </span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Expansion Pipeline</h3>
        </div>
        <CardActionMenu cardName="Expansion Pipeline" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{Data.expansionPipeline.readyAccounts}</p>
          <p className="text-[10px] text-[var(--text-muted)]">expansion-ready accounts</p>
        </div>
        <Sparkline data={Data.expansionPipeline.sparkline} color="#7A5AF8" height={32} width={88} />
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2.5 text-xs">
        <span className="text-[var(--text-muted)]">Potential MRR</span>
        <span className="font-semibold tabular-nums text-[var(--text-strong)]">${(Data.expansionPipeline.potentialMrr / 1000).toFixed(1)}K</span>
      </div>
      {/* Mini stacked bar */}
      <div className="mt-2.5 flex h-3 w-full overflow-hidden rounded-full">
        {Data.expansionPipeline.drivers.map((d) => (
          <div
            key={d.driver}
            className="h-full transition-all duration-300 hover:opacity-80"
            style={{ width: `${(d.mrr / total) * 100}%`, background: d.color }}
            title={`${d.driver} — ${d.accounts} accounts · $${(d.mrr / 1000).toFixed(1)}K`}
          />
        ))}
      </div>
      {/* Driver legend */}
      <div className="mt-2.5 space-y-1">
        {Data.expansionPipeline.drivers.map((d) => (
          <div key={d.driver} className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 text-[var(--text-body)]">
              <span className="size-2 rounded-sm" style={{ background: d.color }} />
              {d.driver}
            </span>
            <span className="tabular-nums text-[var(--text-muted)]">{d.accounts} · ${(d.mrr / 1000).toFixed(1)}K</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-[var(--color-brand-200,rgba(70,95,255,0.3))] bg-[var(--color-brand-50)]/60 p-2.5 text-[10px] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.08)] dark:text-[var(--color-brand-300)]">
        <span className="font-medium">Top driver:</span> {Data.expansionPipeline.topDriver}
        <span className="mt-0.5 block text-[var(--text-muted)]">Avg sales cycle {Data.expansionPipeline.avgCycleDays}d · {Data.expansionPipeline.winProbability}% win probability</span>
      </div>
    </div>
  );
}

/* ============================================================
   Billing Watch — compact stats
   ============================================================ */
function BillingWatchCard() {
  return (
    <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
            <CreditCard className="size-4" strokeWidth={2} />
          </span>
          <h3 className="text-sm font-medium text-[var(--text-strong)]">Billing Watch</h3>
        </div>
        <CardActionMenu cardName="Billing Watch" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Failed payments</p>
          <p className="text-lg font-semibold tabular-nums text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">{Data.billingWatch.failedPayments}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Past due</p>
          <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">${(Data.billingWatch.pastDue / 1000).toFixed(1)}K</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
          <span>Recovery rate</span>
          <span className="font-semibold text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{Data.billingWatch.recoveryRate}% {Data.billingWatch.recoveryTrend}</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-success-400)] to-[var(--color-success-600)]"
            style={{ width: `${Data.billingWatch.recoveryRate}%`, transition: 'width 1.1s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] text-[var(--text-subtle)]">
          <span>Dunning emails: {Data.billingWatch.dunningEmailsSent}</span>
          <span>Avg retries: {Data.billingWatch.avgRetryAttempts}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-[var(--border-subtle)] pt-2.5">
        <Sparkline data={Data.billingWatch.sparkline} color="#F79009" height={24} width={70} />
        <p className="text-[10px] text-[var(--text-muted)]">Failed-payment volume trending down — dunning automation working.</p>
      </div>
    </div>
  );
}

/* ============================================================
   SaaS Signal Strip — 6 compact non-identical chips
   ============================================================ */
const signalIconMap = {
  customers: UserPlus,
  trial: Rocket,
  activated: UserCheck,
  conversion: Target,
  arpa: CircleDollarSign,
  ltv: Heart,
};

function SaasSignalStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {Data.saasSignals.map((s) => {
        const Icon = signalIconMap[s.icon];
        const trendCls = s.trend === 'up'
          ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]'
          : s.trend === 'down'
            ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]'
            : 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]';
        const TrendIcon = s.trend === 'up' ? ArrowUp : s.trend === 'down' ? ArrowDown : TriangleAlert;
        return (
          <div
            key={s.id}
            className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-3.5 transition hover:border-[var(--border-strong)] hover:shadow-md"
            title={s.tooltip}
          >
            <div
              className="absolute -right-4 -top-4 size-16 rounded-full opacity-[0.08] transition group-hover:opacity-[0.16]"
              style={{ background: s.accent }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex size-7 items-center justify-center rounded-lg"
                  style={{ background: `${s.accent}1a`, color: s.accent }}
                >
                  <Icon className="size-3.5" strokeWidth={2.2} />
                </span>
                <span className={cn('inline-flex items-center gap-0.5 text-[10px] font-medium', trendCls)}>
                  <TrendIcon className="size-2.5" strokeWidth={2.5} />
                  {s.trendValue}
                </span>
              </div>
              <p className="mt-2 text-xl font-semibold tabular-nums text-[var(--text-strong)]">{s.value}</p>
              <p className="text-[10px] font-medium text-[var(--text-body)]">{s.label}</p>
              <p className="text-[9px] text-[var(--text-muted)]">{s.metric}</p>
              <div className="mt-1.5">
                <Sparkline data={s.sparkline} color={s.accent} height={20} width={120} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   Lifecycle Funnel — flow nodes with connectors
   ============================================================ */
const lifecycleIconMap = {
  eye: Eye,
  signup: UserPlus,
  check: UserCheck,
  play: Rocket,
  card: CreditCard,
  up: ArrowUp,
  star: Star,
};

function LifecycleFunnelFlow() {
  const stages = Data.lifecycleFunnel;
  const maxValue = Math.max(...stages.map((s) => s.value));
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Workflow className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Lifecycle Funnel</h2>
            <p className="text-xs text-[var(--text-muted)]">Flow from first visit to advocate — node width scales with conversion.</p>
          </div>
        </div>
        <CardActionMenu cardName="Lifecycle Funnel" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-2">
        {stages.map((stage, i) => {
          const Icon = lifecycleIconMap[stage.icon];
          const widthPct = (stage.value / maxValue) * 100;
          const convFromPrev = i === 0 ? 100 : (stage.value / stages[i - 1].value) * 100;
          return (
            <React.Fragment key={stage.key}>
              <div className="group relative flex flex-col items-center text-center">
                {/* Node */}
                <div
                  className="relative w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 transition hover:border-[var(--border-strong)] hover:shadow-md"
                  style={{ minHeight: '120px' }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-700"
                    style={{ height: `${Math.max(20, widthPct)}%`, background: `linear-gradient(to top, ${stage.color}33, ${stage.color}11)`, borderTop: `2px solid ${stage.color}` }}
                  />
                  <div className="relative flex h-full flex-col items-center justify-center p-2.5">
                    <span
                      className="inline-flex size-7 items-center justify-center rounded-lg"
                      style={{ background: `${stage.color}1a`, color: stage.color }}
                    >
                      <Icon className="size-3.5" strokeWidth={2.2} />
                    </span>
                    <p className="mt-1.5 text-sm font-semibold tabular-nums text-[var(--text-strong)]">{stage.value.toLocaleString()}</p>
                    <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{stage.name}</p>
                    {i > 0 && (
                      <p className="mt-0.5 text-[9px] font-medium" style={{ color: stage.dropOff > 50 ? 'var(--color-error-500)' : 'var(--color-success-600)' }}>
                        {convFromPrev.toFixed(1)}%
                      </p>
                    )}
                  </div>
                </div>
                {/* Tooltip on hover */}
                <div className="pointer-events-none absolute -top-2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-full rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2.5 text-left shadow-lg group-hover:block" style={{ width: '180px' }}>
                  <p className="text-[10px] font-semibold text-[var(--text-strong)]">{stage.name}</p>
                  <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">{stage.description}</p>
                  <div className="mt-1.5 space-y-0.5 text-[10px]">
                    <div className="flex justify-between gap-2">
                      <span className="text-[var(--text-muted)]">Volume</span>
                      <span className="font-medium tabular-nums text-[var(--text-strong)]">{stage.value.toLocaleString()}</span>
                    </div>
                    {i > 0 && (
                      <div className="flex justify-between gap-2">
                        <span className="text-[var(--text-muted)]">Drop-off</span>
                        <span className="font-medium tabular-nums text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">{stage.dropOff}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="flex items-center justify-center lg:col-span-0" aria-hidden>
                  <ArrowRight className="size-4 text-[var(--text-faint)]" strokeWidth={2} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer insights */}
      <div className="mt-4 grid grid-cols-1 gap-2 border-t border-[var(--border-subtle)] pt-3 sm:grid-cols-3">
        <div className="flex items-start gap-2 rounded-lg bg-[var(--surface-sunken)]/40 p-2.5">
          <span className="inline-flex size-6 flex-shrink-0 items-center justify-center rounded-md bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <ArrowUp className="size-3" strokeWidth={2.5} />
          </span>
          <p className="text-[10px] text-[var(--text-body)]"><span className="font-medium text-[var(--text-strong)]">Trial activation 54.6%.</span> Above 50% target — onboarding improvements paying off.</p>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-[var(--surface-sunken)]/40 p-2.5">
          <span className="inline-flex size-6 flex-shrink-0 items-center justify-center rounded-md bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
            <TriangleAlert className="size-3" strokeWidth={2.5} />
          </span>
          <p className="text-[10px] text-[var(--text-body)]"><span className="font-medium text-[var(--text-strong)]">Paid conversion 14.8%.</span> Largest drop-off (74.8%) between trial and paid — pricing experiment recommended.</p>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-[var(--surface-sunken)]/40 p-2.5">
          <span className="inline-flex size-6 flex-shrink-0 items-center justify-center rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Star className="size-3" strokeWidth={2.5} />
          </span>
          <p className="text-[10px] text-[var(--text-body)]"><span className="font-medium text-[var(--text-strong)]">74 advocates.</span> Launch referral program — each advocate sourced 2.4 trials on average.</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Retention Cohort Grid — heatmap
   ============================================================ */
function cohortColor(pct: number): { bg: string; text: string } {
  if (pct === 0) return { bg: 'var(--surface-sunken)', text: 'var(--text-subtle)' };
  if (pct >= 90) return { bg: '#465FFF', text: '#fff' };
  if (pct >= 80) return { bg: '#465FFFcc', text: '#fff' };
  if (pct >= 70) return { bg: '#465FFF99', text: 'var(--text-strong)' };
  if (pct >= 60) return { bg: '#465FFF66', text: 'var(--text-strong)' };
  if (pct >= 40) return { bg: '#F7900966', text: 'var(--text-strong)' };
  return { bg: '#F0443866', text: 'var(--text-strong)' };
}

function RetentionCohortGrid() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]">
            <Boxes className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Retention Cohort Grid</h2>
            <p className="text-xs text-[var(--text-muted)]">Monthly cohort retention — Jan through Jun, M0 to M6.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 text-[9px] text-[var(--text-muted)] sm:flex">
            <span>Low</span>
            <div className="flex h-2.5 w-24 overflow-hidden rounded-full">
              <div className="flex-1" style={{ background: '#F0443866' }} />
              <div className="flex-1" style={{ background: '#F7900966' }} />
              <div className="flex-1" style={{ background: '#465FFF66' }} />
              <div className="flex-1" style={{ background: '#465FFF99' }} />
              <div className="flex-1" style={{ background: '#465FFF' }} />
            </div>
            <span>High</span>
          </div>
          <CardActionMenu cardName="Retention Cohort" />
        </div>
      </div>

      <div className="overflow-x-auto modern-scrollbar">
        <table className="w-full min-w-[640px] border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="rounded-lg bg-[var(--surface-sunken)]/60 px-3 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Cohort</th>
              <th className="rounded-lg bg-[var(--surface-sunken)]/60 px-2 py-2 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Size</th>
              {Data.cohortMonths.map((m) => (
                <th key={m} className="rounded-lg bg-[var(--surface-sunken)]/60 px-3 py-2 text-center text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Data.cohortGrid.map((row) => (
              <tr key={row.cohort}>
                <td className="rounded-lg bg-[var(--surface-sunken)]/40 px-3 py-2.5">
                  <p className="text-xs font-medium text-[var(--text-strong)]">{row.cohort}</p>
                  <p className="text-[9px] text-[var(--text-muted)]">{row.cohortLabel}</p>
                </td>
                <td className="rounded-lg bg-[var(--surface-sunken)]/40 px-2 py-2.5 text-center text-[10px] tabular-nums text-[var(--text-body)]">{row.size}</td>
                {row.retention.map((pct, mi) => {
                  const isFuture = pct === 0;
                  const colors = cohortColor(pct);
                  const retained = Math.round((row.size * pct) / 100);
                  const mrrRetained = row.mrrRetained[mi];
                  return (
                    <td key={mi} className="p-0">
                      <div
                        className="group relative flex h-12 cursor-default items-center justify-center rounded-lg text-[11px] font-semibold tabular-nums transition hover:scale-[1.04] hover:shadow-md"
                        style={{ background: colors.bg, color: colors.text, opacity: isFuture ? 0.35 : 1 }}
                        role="cell"
                        aria-label={`${row.cohort} cohort, month ${mi}, ${pct}% retention`}
                      >
                        {isFuture ? '—' : `${pct}%`}
                        {/* Hover tooltip */}
                        {!isFuture && (
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 hidden -translate-x-1/2 rounded-lg border border-[var(--border)] bg-[var(--popover)] p-2 text-left shadow-lg group-hover:block" style={{ minWidth: '160px' }}>
                            <p className="text-[10px] font-semibold text-[var(--text-strong)]">{row.cohortLabel} · M{mi}</p>
                            <div className="mt-1 space-y-0.5 text-[10px]">
                              <div className="flex justify-between gap-2"><span className="text-[var(--text-muted)]">Cohort size</span><span className="font-medium tabular-nums text-[var(--text-strong)]">{row.size}</span></div>
                              <div className="flex justify-between gap-2"><span className="text-[var(--text-muted)]">Retained</span><span className="font-medium tabular-nums text-[var(--text-strong)]">{retained} customers</span></div>
                              <div className="flex justify-between gap-2"><span className="text-[var(--text-muted)]">MRR retained</span><span className="font-medium tabular-nums text-[var(--text-strong)]">${(mrrRetained / 1000).toFixed(1)}K</span></div>
                              <div className="flex justify-between gap-2"><span className="text-[var(--text-muted)]">Retention</span><span className="font-medium tabular-nums text-[var(--text-strong)]">{pct}%</span></div>
                            </div>
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

      <div className="mt-4 grid grid-cols-1 gap-2 border-t border-[var(--border-subtle)] pt-3 sm:grid-cols-2">
        <div className="flex items-start gap-2 rounded-lg bg-[var(--surface-sunken)]/40 p-2.5">
          <Info className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-info-500)]" strokeWidth={2.2} />
          <p className="text-[10px] text-[var(--text-body)]"><span className="font-medium text-[var(--text-strong)]">Jan cohort retains 67% at M6.</span> Best-performing cohort — driven by stronger onboarding content.</p>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-[var(--surface-sunken)]/40 p-2.5">
          <TrendingDown className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-warning-500)]" strokeWidth={2.2} />
          <p className="text-[10px] text-[var(--text-body)]"><span className="font-medium text-[var(--text-strong)]">Largest drop M0→M1 (avg 11%).</span> Consider activation email sequence for first 7 days.</p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Plan Mix — segmented cards
   ============================================================ */
function PlanMixCards() {
  const totalMrr = Data.planMix.reduce((s, p) => s + p.mrr, 0);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#f5f3ff] text-[#6d28d9] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#a78bfa]">
            <Layers className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Plan Mix</h2>
            <p className="text-xs text-[var(--text-muted)]">Distribution of customers and MRR across pricing tiers.</p>
          </div>
        </div>
        <CardActionMenu cardName="Plan Mix" />
      </div>

      {/* Segmented horizontal composition */}
      <div className="mb-4 flex h-3 w-full overflow-hidden rounded-full">
        {Data.planMix.map((p) => (
          <div
            key={p.plan}
            className="h-full transition-all duration-500 hover:opacity-80"
            style={{ width: `${(p.mrr / totalMrr) * 100}%`, background: p.color }}
            title={`${p.plan} — $${(p.mrr / 1000).toFixed(0)}K MRR (${p.share}%)`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Data.planMix.map((p) => (
          <div
            key={p.plan}
            className="group relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3 transition hover:border-[var(--border-strong)] hover:shadow-md"
          >
            <div
              className="absolute -right-3 -top-3 size-12 rounded-full opacity-[0.12] transition group-hover:opacity-[0.22]"
              style={{ background: p.color }}
            />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex size-6 items-center justify-center rounded-md" style={{ background: `${p.color}1a`, color: p.color }}>
                  {p.plan === 'Enterprise' ? <Crown className="size-3" strokeWidth={2.2} /> : p.plan === 'Business' ? <Building2 className="size-3" strokeWidth={2.2} /> : p.plan === 'Pro' ? <Zap className="size-3" strokeWidth={2.2} /> : p.plan === 'Starter' ? <Rocket className="size-3" strokeWidth={2.2} /> : <Users className="size-3" strokeWidth={2.2} />}
                </span>
                {p.plan !== 'Free' && (
                  <span className="text-[9px] font-medium tabular-nums text-[var(--text-muted)]">{p.share}%</span>
                )}
              </div>
              <p className="mt-2 text-xs font-medium text-[var(--text-strong)]">{p.plan}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{p.customers.toLocaleString()} {p.plan === 'Free' ? 'users' : 'customers'}</p>
              {p.plan !== 'Free' ? (
                <p className="mt-1.5 text-base font-semibold tabular-nums text-[var(--text-strong)]">${(p.mrr / 1000).toFixed(0)}K</p>
              ) : (
                <p className="mt-1.5 text-base font-semibold tabular-nums text-[var(--text-muted)]">—</p>
              )}
              {/* Hover detail */}
              <div className="mt-2 space-y-0.5 border-t border-[var(--border-subtle)] pt-1.5 text-[9px]">
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">ARPA</span><span className="font-medium tabular-nums text-[var(--text-body)]">${p.arpa}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Churn</span><span className="font-medium tabular-nums text-[var(--text-body)]">{p.churnRate}%</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-muted)]">Expansion</span><span className="font-medium tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">+{p.expansionRate}%</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--color-brand-200,rgba(70,95,255,0.3))] bg-[var(--color-brand-50)]/60 p-3 dark:bg-[rgba(70,95,255,0.08)]">
        <Sparkles className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" strokeWidth={2.2} />
        <p className="text-xs text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">
          <span className="font-medium">Pro plan drives 44% of MRR</span> with the lowest churn among paid tiers. Enterprise has the highest expansion rate (34.2%) — prioritize 4 Business → Enterprise migrations this quarter.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   Usage Telemetry — pulse chart
   ============================================================ */
const usageIconMap = {
  api: CircuitBoard,
  project: Boxes,
  report: FileText,
  seat: Users,
  integration: Plug,
};

function UsageTelemetryCard() {
  const options: any = {
    chart: {
      type: 'area', height: 200, fontFamily: 'Outfit, sans-serif',
      toolbar: { show: false },
      animations: { enabled: true, speed: 800, animateGradually: { enabled: true, delay: 60 }, dynamicAnimation: { enabled: true, speed: 350 } },
    },
    colors: ['#465FFF', '#12B76A', '#F79009', '#7A5AF8'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [3, 2, 2, 2] },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.04, stops: [0, 100] } },
    grid: { borderColor: 'var(--border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } }, padding: { top: 0, right: 8, bottom: 0, left: 8 } },
    xaxis: {
      categories: Data.usagePulseSeries.map((p) => p.date),
      labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' }, rotate: 0, trim: true, hideOverlappingLabels: true },
      axisBorder: { show: false }, axisTicks: { show: false },
      crosshairs: { stroke: { color: 'var(--color-brand-500)', width: 1, dashArray: 4 }, fill: { type: 'solid', color: 'var(--color-brand-500)', opacity: 0.05 } },
    },
    yaxis: { labels: { style: { colors: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Outfit, sans-serif' }, formatter: (v: number) => `${(v / 1000).toFixed(0)}K` } },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '11px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, labels: { colors: 'var(--text-body)' }, markers: { size: 6, strokeWidth: 0, offsetX: -4 }, itemMargin: { horizontal: 10, vertical: 0 } },
    tooltip: {
      enabled: true, custom: ({ dataPointIndex }: any) => {
        const p = Data.usagePulseSeries[dataPointIndex];
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:12px;padding:12px 14px;box-shadow:0 12px 28px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:200px;">
          <div style="font-size:10px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${p.date}</div>
          <div style="display:grid;grid-template-columns:1fr auto;gap:4px 16px;font-size:12px;">
            <span style="color:var(--text-body);">API calls</span><span style="color:#465FFF;font-weight:600;font-variant-numeric:tabular-nums;">${(p.api / 1000).toFixed(0)}K</span>
            <span style="color:var(--text-body);">Projects</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">${p.projects}K</span>
            <span style="color:var(--text-body);">Reports</span><span style="color:#F79009;font-weight:600;font-variant-numeric:tabular-nums;">${p.reports}K</span>
            <span style="color:var(--text-body);">Integrations</span><span style="color:#7A5AF8;font-weight:600;font-variant-numeric:tabular-nums;">${p.integrations}</span>
          </div>
        </div>`;
      },
    },
    markers: { size: 0, hover: { size: 5, sizeOffset: 3 }, strokeColors: 'var(--card)', strokeWidth: 2 },
  };
  const chartSeries = [
    { name: 'API calls', data: Data.usagePulseSeries.map((p) => p.api) },
    { name: 'Projects', data: Data.usagePulseSeries.map((p) => p.projects * 1000) },
    { name: 'Reports', data: Data.usagePulseSeries.map((p) => p.reports * 1000) },
    { name: 'Integrations', data: Data.usagePulseSeries.map((p) => p.integrations) },
  ];
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <Activity className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Usage Telemetry</h2>
            <p className="text-xs text-[var(--text-muted)]">Live product activity pulse — API, projects, reports, seats, integrations.</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" /></span>Streaming
          </span>
          <CardActionMenu cardName="Usage Telemetry" />
        </div>
      </div>

      {/* Icon-led metric tiles */}
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {Data.usageMetrics.map((m) => {
          const Icon = usageIconMap[m.icon];
          return (
            <div key={m.id} className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-2.5 transition hover:border-[var(--border-strong)]" title={m.tooltip}>
              <div className="flex items-center justify-between">
                <span className="inline-flex size-7 items-center justify-center rounded-lg" style={{ background: `${m.accent}1a`, color: m.accent }}>
                  <Icon className="size-3.5" strokeWidth={2.2} />
                </span>
                <span className="inline-flex items-center gap-0.5 text-[9px] font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
                  <ArrowUp className="size-2.5" strokeWidth={2.5} />{m.change}
                </span>
              </div>
              <p className="mt-1.5 text-base font-semibold tabular-nums text-[var(--text-strong)]">{m.value}</p>
              <p className="text-[9px] text-[var(--text-muted)]">{m.label}</p>
            </div>
          );
        })}
      </div>

      <Chart options={options} series={chartSeries} type="area" height={200} />

      <div className="mt-3 flex items-start gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3">
        <Zap className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-warning-500)]" strokeWidth={2.2} />
        <p className="text-xs text-[var(--text-body)]"><span className="font-medium text-[var(--text-strong)]">Peak load Jun 22: 1.62M API calls.</span> Provisioning additional API gateway capacity for end-of-quarter reporting season.</p>
      </div>
    </section>
  );
}

/* ============================================================
   Churn Intelligence — ranked reason cards
   ============================================================ */
function ChurnIntelligenceCard() {
  const maxPct = Math.max(...Data.churnReasons.map((r) => r.percentage));
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]">
            <TriangleAlert className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Churn Intelligence</h2>
            <p className="text-xs text-[var(--text-muted)]">Ranked exit reasons with prescriptive recommendations.</p>
          </div>
        </div>
        <CardActionMenu cardName="Churn Intelligence" />
      </div>

      {/* Top summary */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Churned MRR</p>
          <p className="text-lg font-semibold tabular-nums text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">${(Data.churnIntelSummary.totalChurnedMrr / 1000).toFixed(1)}K</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Accounts lost</p>
          <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.churnIntelSummary.totalAccountsLost}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5">
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Top reason</p>
          <p className="truncate text-sm font-medium text-[var(--text-strong)]">{Data.churnIntelSummary.topReason}</p>
        </div>
      </div>

      {/* Ranked reason cards */}
      <div className="space-y-2">
        {Data.churnReasons.map((r, idx) => (
          <div
            key={r.id}
            className="group relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3 transition hover:border-[var(--border-strong)] hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              {/* Rank badge */}
              <span
                className="inline-flex size-7 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold tabular-nums"
                style={{ background: `${r.color}1a`, color: r.color }}
              >
                #{idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-[var(--text-strong)]">{r.reason}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{r.percentage}%</span>
                  </div>
                </div>
                {/* Bar */}
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(r.percentage / maxPct) * 100}%`, background: r.color, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  />
                </div>
                {/* Hover detail */}
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100" style={{ maxHeight: 0, transition: 'max-height 280ms ease, opacity 200ms ease' }}>
                  <span>Lost MRR: <span className="font-medium tabular-nums text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">${r.lostMrr.toLocaleString()}</span></span>
                  <span>Accounts: <span className="font-medium tabular-nums text-[var(--text-strong)]">{r.count}</span></span>
                </div>
              </div>
            </div>
            {/* Recommendation */}
            <div className="mt-2 flex items-start gap-1.5 border-t border-[var(--border-subtle)] pt-2 text-[10px]">
              <Sparkles className="mt-0.5 size-3 flex-shrink-0" style={{ color: r.color }} strokeWidth={2.2} />
              <p className="text-[var(--text-body)]">{r.recommendation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl border border-[var(--color-brand-200,rgba(70,95,255,0.3))] bg-[var(--color-brand-50)]/60 p-3 dark:bg-[rgba(70,95,255,0.08)]">
        <Lightbulb className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]" strokeWidth={2.2} />
        <p className="text-xs text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">{Data.churnIntelSummary.insight}</p>
      </div>
    </section>
  );
}
function Lightbulb({ className, style, strokeWidth }: { className?: string; style?: React.CSSProperties; strokeWidth?: number }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

/* ============================================================
   Customer Lifecycle Board — 5 groups
   ============================================================ */
const healthColor = (h: number) => h >= 80 ? '#12B76A' : h >= 60 ? '#F79009' : h >= 40 ? '#FDB022' : '#F04438';

function CustomerLifecycleBoard({ onCustomerClick }: { onCustomerClick: (c: LifecycleCustomer) => void }) {
  const groups = Object.entries(Data.lifecycleBoard) as [LifecycleGroupKey, typeof Data.lifecycleBoard[LifecycleGroupKey]][];
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Users className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Customer Lifecycle Board</h2>
            <p className="text-xs text-[var(--text-muted)]">Accounts grouped by lifecycle stage — click a card to view full detail.</p>
          </div>
        </div>
        <CardActionMenu cardName="Customer Lifecycle Board" />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        {groups.map(([key, meta]) => {
          const customers = Data.lifecycleCustomers.filter((c) => c.group === key);
          return (
            <div key={key} className="flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30">
              {/* Column header */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: meta.color }} />
                  <h3 className="text-xs font-medium text-[var(--text-strong)]">{meta.name}</h3>
                </div>
                <span className={cn('rounded-full px-1.5 py-0.5 text-[9px] font-medium', meta.accent)}>{customers.length}</span>
              </div>
              <p className="px-3 py-1.5 text-[9px] text-[var(--text-muted)]">{meta.description}</p>
              {/* Cards */}
              <div className="flex-1 space-y-2 overflow-y-auto p-2 modern-scrollbar" style={{ maxHeight: '320px' }}>
                {customers.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onCustomerClick(c)}
                    className="group flex w-full cursor-pointer flex-col gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--card)] p-2.5 text-left transition hover:border-[var(--border-strong)] hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex size-7 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-semibold"
                        style={{ background: `${meta.color}1a`, color: meta.color }}
                      >
                        {c.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-[var(--text-strong)]">{c.company}</p>
                        <p className="truncate text-[9px] text-[var(--text-muted)]">{c.plan} · {c.seats} seats</p>
                      </div>
                      <ChevronRight className="size-3 flex-shrink-0 text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100" strokeWidth={2.2} />
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold tabular-nums text-[var(--text-strong)]">${c.mrr.toLocaleString()}/mo</span>
                      <span className="flex items-center gap-1 text-[var(--text-muted)]">
                        <span className="size-1.5 rounded-full" style={{ background: healthColor(c.health) }} />
                        {c.health}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-[9px] text-[var(--text-muted)]"><span className="font-medium text-[var(--text-body)]">Next:</span> {c.nextAction}</p>
                  </button>
                ))}
                {customers.length === 0 && (
                  <div className="flex h-20 items-center justify-center text-[10px] text-[var(--text-subtle)]">No accounts</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   Integrations Health
   ============================================================ */
function IntegrationsHealthCard() {
  const statusTone: Record<Data.Integration['status'], { tone: 'success' | 'warning' | 'error'; label: string }> = {
    healthy:  { tone: 'success', label: 'Healthy' },
    degraded: { tone: 'warning', label: 'Degraded' },
    down:     { tone: 'error',   label: 'Down' },
  };
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]">
            <Plug className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Integrations Health</h2>
            <p className="text-xs text-[var(--text-muted)]">Sync status across connected platforms — failures trigger billing and activation risk.</p>
          </div>
        </div>
        <CardActionMenu cardName="Integrations Health" />
      </div>

      {/* Summary bar */}
      <div className="mb-4 grid grid-cols-4 gap-2">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5 text-center">
          <p className="text-lg font-semibold tabular-nums text-[var(--text-strong)]">{Data.integrationsSummary.total}</p>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Total</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5 text-center">
          <p className="text-lg font-semibold tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{Data.integrationsSummary.healthy}</p>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Healthy</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5 text-center">
          <p className="text-lg font-semibold tabular-nums text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]">{Data.integrationsSummary.degraded}</p>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Degraded</p>
        </div>
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-2.5 text-center">
          <p className="text-lg font-semibold tabular-nums text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">{Data.integrationsSummary.down}</p>
          <p className="text-[9px] uppercase tracking-wider text-[var(--text-subtle)]">Down</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Data.integrations.map((int) => {
          const st = statusTone[int.status];
          return (
            <div
              key={int.id}
              className="group relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/30 p-3.5 transition hover:border-[var(--border-strong)] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex size-9 items-center justify-center rounded-xl"
                    style={{ background: `${int.color}1a`, color: int.color }}
                  >
                    <BrandIcon brand={int.brand} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-strong)]">{int.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{int.category}</p>
                  </div>
                </div>
                <StatusBadge tone={st.tone} dot>{st.label}</StatusBadge>
              </div>
              {/* Sync health bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)]">
                  <span>Sync health</span>
                  <span className="font-medium tabular-nums text-[var(--text-strong)]">{int.syncHealth}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-700',
                      int.status === 'healthy' && 'bg-gradient-to-r from-[var(--color-success-400)] to-[var(--color-success-600)]',
                      int.status === 'degraded' && 'bg-gradient-to-r from-[var(--color-warning-400)] to-[var(--color-warning-600)]',
                      int.status === 'down' && 'bg-gradient-to-r from-[var(--color-error-400)] to-[var(--color-error-600)]',
                    )}
                    style={{ width: `${int.syncHealth}%` }}
                  />
                </div>
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-1 border-t border-[var(--border-subtle)] pt-2 text-[9px]">
                <div><p className="text-[var(--text-subtle)]">Accounts</p><p className="font-medium tabular-nums text-[var(--text-strong)]">{int.connectedAccounts.toLocaleString()}</p></div>
                <div><p className="text-[var(--text-subtle)]">Syncs/day</p><p className="font-medium tabular-nums text-[var(--text-strong)]">{int.syncsPerDay.toLocaleString()}</p></div>
                <div><p className="text-[var(--text-subtle)]">Last sync</p><p className="font-medium text-[var(--text-body)]">{int.lastSync}</p></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--color-error-200,rgba(240,68,56,0.3))] bg-[var(--color-error-50)]/60 p-3 dark:bg-[rgba(240,68,56,0.08)]">
        <AlertCircle className="mt-0.5 size-3.5 flex-shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" strokeWidth={2.2} />
        <p className="text-xs text-[var(--color-error-700)] dark:text-[var(--color-error-400)]">
          <span className="font-medium">Zapier sync down 46 min.</span> 318 connected accounts affected — automation workflows paused. Engineering paged.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   Invoices & Payments Table
   ============================================================ */
const invoiceStatusToneLocal: Record<InvoiceStatus, 'success' | 'info' | 'warning' | 'error' | 'neutral'> = Data.invoiceStatusTone;
const retryStatusToneLocal: Record<Data.RetryStatus, 'neutral' | 'info' | 'warning' | 'error' | 'success'> = Data.retryStatusTone;
const planToneMap: Record<string, 'info' | 'success' | 'brand' | 'warning'> = {
  Starter: 'info', Pro: 'success', Business: 'brand', Enterprise: 'warning',
};

function InvoicesPaymentsTable() {
  const { toast } = useToast();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'All' | InvoiceStatus>('All');
  const [planFilter, setPlanFilter] = React.useState<'All' | 'Starter' | 'Pro' | 'Business' | 'Enterprise'>('All');
  const [statusOpen, setStatusOpen] = React.useState(false);
  const [planOpen, setPlanOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [actionMenuFor, setActionMenuFor] = React.useState<string | null>(null);
  const [invoices, setInvoices] = React.useState<Invoice[]>(Data.invoices);
  const perPage = 6;

  const filtered = React.useMemo(() => {
    return invoices.filter((inv) => {
      const matchSearch = !search ||
        inv.invoice.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer.toLowerCase().includes(search.toLowerCase()) ||
        inv.contact.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
      const matchPlan = planFilter === 'All' || inv.plan === planFilter;
      return matchSearch && matchStatus && matchPlan;
    });
  }, [invoices, search, statusFilter, planFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * perPage, current * perPage);

  React.useEffect(() => { setPage(1); }, [search, statusFilter, planFilter]);

  function handleAction(action: string, inv: Invoice) {
    setActionMenuFor(null);
    if (action === 'Retry payment') {
      setInvoices((prev) => prev.map((p) => p.id === inv.id ? { ...p, retryStatus: 'Retrying' as Data.RetryStatus, retryCount: p.retryCount + 1 } : p));
      toast({ title: 'Payment retry scheduled', description: `${inv.invoice} — ${inv.customer} · retry attempt ${inv.retryCount + 1}` });
    } else if (action === 'Send reminder') {
      toast({ title: 'Reminder sent', description: `${inv.customer} · ${inv.contact}` });
    } else if (action === 'Mark as paid') {
      setInvoices((prev) => prev.map((p) => p.id === inv.id ? { ...p, status: 'Paid' as InvoiceStatus, retryStatus: 'Recovered' as Data.RetryStatus } : p));
      toast({ title: 'Invoice marked paid', description: `${inv.invoice} · $${inv.amount.toLocaleString()}` });
    } else if (action === 'View invoice') {
      toast({ title: `Viewing ${inv.invoice}`, description: inv.customer });
    } else if (action === 'Refund') {
      setInvoices((prev) => prev.map((p) => p.id === inv.id ? { ...p, status: 'Refunded' as InvoiceStatus } : p));
      toast({ title: 'Refund processed', description: `${inv.invoice} · $${inv.amount.toLocaleString()}` });
    }
  }

  const statusOptions: Array<'All' | InvoiceStatus> = ['All', 'Paid', 'Pending', 'Past due', 'Failed', 'Refunded'];
  const planOptions: Array<'All' | 'Starter' | 'Pro' | 'Business' | 'Enterprise'> = ['All', 'Starter', 'Pro', 'Business', 'Enterprise'];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 transition hover:border-[var(--border-strong)] hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
            <FileText className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h2 className="text-base font-medium text-[var(--text-strong)]">Invoices & Payments</h2>
            <p className="text-xs text-[var(--text-muted)]">Recurring billing ledger — search, filter, retry failed payments.</p>
          </div>
        </div>
        <CardActionMenu cardName="Invoices & Payments" />
      </div>

      {/* Toolbar */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice, customer, or contact…"
            className="h-9 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
          />
        </div>
        {/* Status filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setStatusOpen((p) => !p); setPlanOpen(false); }}
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="menu"
            aria-expanded={statusOpen}
          >
            <Filter className="size-3.5 text-[var(--text-muted)]" strokeWidth={2} />
            {statusFilter}
            <ChevronDown className={cn('size-3 text-[var(--text-muted)] transition-transform', statusOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={statusOpen} onClose={() => setStatusOpen(false)} width={150}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Status</p></div>
            {statusOptions.map((s) => (
              <PopoverItem key={s} active={statusFilter === s} onClick={() => { setStatusFilter(s); setStatusOpen(false); }}>{s}</PopoverItem>
            ))}
          </Popover>
        </div>
        {/* Plan filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setPlanOpen((p) => !p); setStatusOpen(false); }}
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-haspopup="menu"
            aria-expanded={planOpen}
          >
            <Layers className="size-3.5 text-[var(--text-muted)]" strokeWidth={2} />
            {planFilter}
            <ChevronDown className={cn('size-3 text-[var(--text-muted)] transition-transform', planOpen && 'rotate-180')} strokeWidth={2.2} />
          </button>
          <Popover open={planOpen} onClose={() => setPlanOpen(false)} width={150}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Plan</p></div>
            {planOptions.map((p) => (
              <PopoverItem key={p} active={planFilter === p} onClick={() => { setPlanFilter(p); setPlanOpen(false); }}>{p}</PopoverItem>
            ))}
          </Popover>
        </div>
        <span className="text-[10px] text-[var(--text-muted)]">{filtered.length} of {invoices.length} invoices</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto modern-scrollbar">
        <table className="w-full min-w-[920px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)]">
              <th className="py-2.5 pl-1 pr-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Invoice</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Customer</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Plan</th>
              <th className="py-2.5 px-2 text-right text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Status</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Due date</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Payment method</th>
              <th className="py-2.5 px-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Retry</th>
              <th className="py-2.5 pl-2 pr-1"></th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={9} className="py-12 text-center"><p className="text-sm font-medium text-[var(--text-strong)]">No invoices found</p><p className="mt-1 text-xs text-[var(--text-muted)]">Try adjusting your search or filters.</p></td></tr>
            ) : paged.map((inv) => (
              <tr key={inv.id} className="group border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                <td className="py-3 pl-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-6 items-center justify-center rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
                      <FileText className="size-3" strokeWidth={2.2} />
                    </span>
                    <span className="text-xs font-medium text-[var(--text-strong)]">{inv.invoice}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <UserAvatar name={inv.contact} size="xs" />
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-[var(--text-strong)]">{inv.customer}</p>
                      <p className="truncate text-[9px] text-[var(--text-muted)]">{inv.contact}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <StatusBadge tone={planToneMap[inv.plan]}>{inv.plan}</StatusBadge>
                </td>
                <td className="py-3 px-2 text-right text-xs font-medium tabular-nums text-[var(--text-strong)]">${inv.amount.toLocaleString()}</td>
                <td className="py-3 px-2"><StatusBadge tone={invoiceStatusToneLocal[inv.status]} dot>{inv.status}</StatusBadge></td>
                <td className="py-3 px-2"><span className="text-[10px] text-[var(--text-body)]">{inv.dueDate}</span></td>
                <td className="py-3 px-2"><span className="inline-flex items-center gap-1 text-[10px] text-[var(--text-body)]"><CreditCard className="size-3 text-[var(--text-muted)]" strokeWidth={2.2} />{inv.paymentMethod}</span></td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-1.5">
                    <StatusBadge tone={retryStatusToneLocal[inv.retryStatus]}>{inv.retryStatus}</StatusBadge>
                    {inv.retryCount > 0 && <span className="text-[9px] tabular-nums text-[var(--text-muted)]">×{inv.retryCount}</span>}
                  </div>
                </td>
                <td className="py-3 pl-2 pr-1 text-right">
                  <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => setActionMenuFor(actionMenuFor === inv.id ? null : inv.id)}
                      className="flex size-6 cursor-pointer items-center justify-center rounded-md text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100"
                      aria-label={`Actions for ${inv.invoice}`}
                    >
                      <MoreHorizontal className="size-3.5" strokeWidth={2.2} />
                    </button>
                    <Popover open={actionMenuFor === inv.id} onClose={() => setActionMenuFor(null)} align="right" width={170}>
                      <PopoverItem icon={Eye} onClick={() => handleAction('View invoice', inv)}>View invoice</PopoverItem>
                      {inv.status === 'Failed' || inv.status === 'Past due' ? (
                        <PopoverItem icon={RefreshCw} onClick={() => handleAction('Retry payment', inv)}>Retry payment</PopoverItem>
                      ) : null}
                      <PopoverItem icon={Mail} onClick={() => handleAction('Send reminder', inv)}>Send reminder</PopoverItem>
                      {inv.status !== 'Paid' && inv.status !== 'Refunded' && (
                        <PopoverItem icon={CircleDollarSign} onClick={() => handleAction('Mark as paid', inv)}>Mark as paid</PopoverItem>
                      )}
                      {inv.status === 'Paid' && (
                        <>
                          <div className="my-1 h-px bg-[var(--border-subtle)]" />
                          <PopoverItem icon={X} danger onClick={() => handleAction('Refund', inv)}>Refund</PopoverItem>
                        </>
                      )}
                    </Popover>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-xs">
        <span className="text-[var(--text-muted)]">Showing {paged.length} of {filtered.length} invoices</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="size-3" strokeWidth={2.5} />Prev
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
   Add Customer Drawer
   ============================================================ */
type NewCustomer = {
  company: string;
  owner: string;
  plan: 'Starter' | 'Pro' | 'Business' | 'Enterprise';
  seats: string;
  mrr: string;
  billingEmail: string;
  notes: string;
};

function AddCustomerDrawer({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (c: NewCustomer) => void }) {
  const [form, setForm] = React.useState<NewCustomer>({
    company: '', owner: 'Darlene Robertson', plan: 'Starter', seats: '5', mrr: '', billingEmail: '', notes: '',
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
    if (!form.company.trim() || !form.billingEmail.trim()) return;
    onCreate({ ...form, company: form.company.trim(), billingEmail: form.billingEmail.trim() });
    setForm({ company: '', owner: 'Darlene Robertson', plan: 'Starter', seats: '5', mrr: '', billingEmail: '', notes: '' });
    onClose();
  }

  // Auto-calculate MRR from plan + seats
  function autoMrr(plan: string, seats: number): string {
    const base: Record<string, number> = { Starter: 20, Pro: 100, Business: 200, Enterprise: 419 };
    return String((base[plan] || 0) * seats);
  }

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
        style={{ animation: 'ecomFadeIn 200ms ease-out' }}
      />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl"
        style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }}
        role="dialog"
        aria-label="Add customer"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white">
              <UserPlus className="size-4.5" strokeWidth={2.2} />
            </span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">Add Customer</h3>
              <p className="text-xs text-[var(--text-muted)]">Create a new subscription account.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label="Close drawer"
          >
            <X className="size-4" strokeWidth={2.2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Company <span className="text-[var(--color-error-600)]">*</span></label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="e.g. Acme Corporation"
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Owner</label>
              <select
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              >
                {Data.saasOwners.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Plan</label>
              <select
                value={form.plan}
                onChange={(e) => {
                  const plan = e.target.value as NewCustomer['plan'];
                  const seats = parseInt(form.seats, 10) || 1;
                  setForm({ ...form, plan, mrr: autoMrr(plan, seats) });
                }}
                className="h-10 w-full cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              >
                {Data.saasPlans.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Seats</label>
              <input
                type="number"
                min="1"
                value={form.seats}
                onChange={(e) => {
                  const seats = e.target.value;
                  const plan = form.plan;
                  setForm({ ...form, seats, mrr: seats ? autoMrr(plan, parseInt(seats, 10)) : '' });
                }}
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">MRR ($)</label>
              <input
                type="number"
                value={form.mrr}
                onChange={(e) => setForm({ ...form, mrr: e.target.value })}
                placeholder="auto"
                className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Billing email <span className="text-[var(--color-error-600)]">*</span></label>
            <input
              type="email"
              value={form.billingEmail}
              onChange={(e) => setForm({ ...form, billingEmail: e.target.value })}
              placeholder="billing@acme.com"
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-body)]">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              placeholder="Internal notes (optional)"
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
            />
          </div>

          {/* Live preview */}
          {form.company && (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-3">
              <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Preview</p>
              <div className="mt-1.5 flex items-center gap-2.5">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
                  <Building2 className="size-4" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">{form.company}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{form.plan} · {form.seats} seats · ${form.mrr || 0}/mo</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!form.company.trim() || !form.billingEmail.trim()}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <UserPlus className="size-4" strokeWidth={2.5} />
            Create customer
          </button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Customer Detail Drawer
   ============================================================ */
function CustomerDetailDrawer({ customer, onClose }: { customer: LifecycleCustomer | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!customer) return;
    function esc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [customer, onClose]);

  if (!customer || typeof document === 'undefined') return null;
  const meta = Data.lifecycleBoard[customer.group];
  const detail = Data.customerDetailByCompany[customer.company];
  const hc = healthColor(customer.health);

  return createPortal(
    <>
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" style={{ animation: 'ecomFadeIn 200ms ease-out' }} />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col bg-[var(--card)] shadow-2xl"
        style={{ animation: 'ecomDrawerIn 280ms cubic-bezier(0.32, 0.72, 0, 1)' }}
        role="dialog"
        aria-label="Customer detail"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex size-9 items-center justify-center rounded-xl text-xs font-semibold"
              style={{ background: `${meta.color}1a`, color: meta.color }}
            >
              {customer.initials}
            </span>
            <div>
              <h3 className="text-base font-medium text-[var(--text-strong)]">{customer.company}</h3>
              <p className="text-xs text-[var(--text-muted)]">{customer.plan} · {customer.seats} seats · ${customer.mrr.toLocaleString()}/mo</p>
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

        {/* Body */}
        <div className="flex-1 space-y-4 overflow-y-auto modern-scrollbar p-5">
          {/* Health + group */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Health score</p>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                  <div className="h-full rounded-full" style={{ width: `${customer.health}%`, background: hc, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }} />
                </div>
                <span className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">{customer.health}</span>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Lifecycle</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-strong)]">
                <span className="size-2 rounded-full" style={{ background: meta.color }} />
                {meta.name}
              </p>
            </div>
          </div>

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Owner</p>
              <div className="mt-1 flex items-center gap-1.5">
                <UserAvatar name={customer.owner} size="xs" />
                <p className="text-xs font-medium text-[var(--text-strong)]">{customer.owner}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Plan</p>
              <p className="mt-1 text-xs font-medium text-[var(--text-strong)]">{customer.plan}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Seats</p>
              <p className="mt-1 text-xs font-medium tabular-nums text-[var(--text-strong)]">{customer.seats}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">MRR</p>
              <p className="mt-1 text-xs font-medium tabular-nums text-[var(--text-strong)]">${customer.mrr.toLocaleString()}</p>
            </div>
            {detail && (
              <>
                <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Billing email</p>
                  <p className="mt-1 truncate text-xs font-medium text-[var(--text-body)]">{detail.billingEmail}</p>
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Started</p>
                  <p className="mt-1 text-xs font-medium text-[var(--text-strong)]">{detail.startedAt}</p>
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Last active</p>
                  <p className="mt-1 text-xs font-medium text-[var(--text-strong)]">{detail.lastActive}</p>
                </div>
                <div className="rounded-xl border border-[var(--border-subtle)] p-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">NPS</p>
                  <p className="mt-1 text-xs font-medium tabular-nums text-[var(--text-strong)]">{detail.npsScore}/10</p>
                </div>
              </>
            )}
          </div>

          {/* Next action */}
          <div className="rounded-xl border border-[var(--color-brand-200,rgba(70,95,255,0.3))] bg-[var(--color-brand-50)]/60 p-3 dark:bg-[rgba(70,95,255,0.08)]">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">Next action</p>
            <p className="mt-1 text-sm text-[var(--text-strong)]">{customer.nextAction}</p>
            <p className="mt-1 text-[10px] text-[var(--text-muted)]">In stage {customer.daysInStage} days</p>
          </div>

          {/* Expansion signals */}
          {detail && detail.expansionSignals.length > 0 && (
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Expansion signals</p>
              <div className="mt-1.5 space-y-1">
                {detail.expansionSignals.map((sig) => (
                  <div key={sig} className="flex items-center gap-1.5 text-[11px] text-[var(--text-body)]">
                    <Dot className="size-3 text-[var(--color-success-500)]" />
                    {sig}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {detail && (
            <div className="rounded-xl border border-[var(--border-subtle)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Notes</p>
              <p className="mt-1 text-xs text-[var(--text-body)]">{detail.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 border-t border-[var(--border)] px-5 py-4">
          <button className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
            <Mail className="size-4" strokeWidth={2.2} />Email
          </button>
          <button className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]">
            <CalendarDays className="size-4" strokeWidth={2.2} />Schedule
          </button>
        </div>
      </aside>
    </>,
    document.body,
  );
}

/* ============================================================
   Main SaaS Dashboard export
   ============================================================ */
export function SaasDashboard() {
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<LifecycleCustomer | null>(null);

  function handleCreate(c: NewCustomer) {
    toast({
      title: 'Customer created',
      description: `${c.company} — ${c.plan} · ${c.seats} seats · $${c.mrr || 0}/mo`,
    });
  }

  function handleCustomerClick(c: LifecycleCustomer) {
    setSelectedCustomer(c);
  }

  return (
    <div className="space-y-6">
      <SaasHeader onAddCustomer={() => setDrawerOpen(true)} />

      {/* Hero: MRR Waterfall (left) + right rail (Churn Risk, Expansion Pipeline, Billing Watch) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <MrrWaterfallHero />
        <div className="flex flex-col gap-4">
          <ChurnRiskMeter />
          <ExpansionPipelineCard />
          <BillingWatchCard />
        </div>
      </div>

      {/* Signal Strip */}
      <SaasSignalStrip />

      {/* Lifecycle Funnel (full width) */}
      <LifecycleFunnelFlow />

      {/* Retention Cohort Grid (full width) */}
      <RetentionCohortGrid />

      {/* Plan Mix + Usage Telemetry */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <PlanMixCards />
        <UsageTelemetryCard />
      </div>

      {/* Churn Intelligence (full width) */}
      <ChurnIntelligenceCard />

      {/* Customer Lifecycle Board (full width) */}
      <CustomerLifecycleBoard onCustomerClick={handleCustomerClick} />

      {/* Integrations Health (full width) */}
      <IntegrationsHealthCard />

      {/* Invoices & Payments table (full width) */}
      <InvoicesPaymentsTable />

      {/* Drawers */}
      <AddCustomerDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onCreate={handleCreate} />
      <CustomerDetailDrawer customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  );
}
