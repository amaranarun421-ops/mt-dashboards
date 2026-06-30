'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import {
  ArrowUp, ArrowDown, CalendarDays, Download, ChevronDown, ChevronRight, MoreHorizontal,
  Eye, Users, Clock, Phone, Mail, MessageSquare, Building2, Target, TrendingUp,
  TrendingDown, AlertTriangle, AlertCircle, Info, Star, CheckCircle2, XCircle,
  Plus, X, Search, Filter, Bell, Link2, Video, FileText, UserPlus, Briefcase,
  Zap, Activity, Calendar, Check, Linkedin, MessagesSquare, RefreshCw, Shield,
  Flame, Sparkles, ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserAvatar, StatusBadge } from '@/components/dashboard/primitives';
import { Popover, PopoverItem } from '@/components/dashboards/analytics-interactions';
import { PremiumCard, CardHeader, CardActionMenu, Sparkline } from '@/shared';
import * as Data from '../data/mock-data';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export function RelationshipTimelineHero() {
  const series = Data.touchpointSeries;
  const isMobile = useIsMobile();
  const options: any = {
    chart: {
      type: 'bar',
      height: 360,
      fontFamily: 'Outfit, sans-serif',
      toolbar: { show: false },
      stacked: true,
      animations: { enabled: true, speed: 800, animateGradually: { enabled: true, delay: 50 }, dynamicAnimation: { enabled: true, speed: 350 } },
    },
    colors: ['#465FFF', '#12B76A', '#F79009', '#7A5AF8'],
    plotOptions: { bar: { columnWidth: '55%', borderRadius: 5, radiusOnLastStackedBar: true } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: [0, 0, 0, 3], colors: ['#7A5AF8'] },
    fill: { type: ['solid', 'solid', 'solid', 'gradient'], gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 100] } },
    grid: {
      borderColor: 'var(--border)',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 8, bottom: 0, left: isMobile ? 16 : 8 },
    },
    xaxis: {
      categories: series.map((p) => p.date),
      labels: { style: { colors: 'var(--text-muted)', fontSize: isMobile ? '11px' : '12px', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }, rotate: isMobile ? -35 : 0, trim: true, hideOverlappingLabels: true },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: { stroke: { color: 'var(--color-brand-500)', width: 1, dashArray: 4 } },
    },
    yaxis: { labels: { style: { colors: 'var(--text-muted)', fontSize: isMobile ? '11px' : '12px', fontFamily: 'Outfit, sans-serif' } } },
    legend: {
      position: 'top',
      horizontalAlign: isMobile ? 'left' : 'right',
      fontSize: '12px',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 500,
      labels: { colors: 'var(--text-body)' },
      markers: { size: 6, strokeWidth: 0, offsetX: -4, shape: 'circle' },
      itemMargin: { horizontal: isMobile ? 10 : 14, vertical: 4 },
    },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }: any) => {
        const p = series[dataPointIndex];
        const note = p.annotation
          ? `<div style="display:flex;align-items:center;gap:6px;margin-top:8px;padding:6px 10px;border-radius:8px;background:rgba(70,95,255,0.12);color:#465FFF;font-size:11px;font-weight:500;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4"/></svg>${p.annotation}</div>`
          : '';
        return `<div style="background:var(--popover);border:1px solid var(--border);border-radius:14px;padding:14px 16px;box-shadow:0 16px 32px -8px rgba(15,23,42,0.18);font-family:Outfit,sans-serif;min-width:220px;"><div style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">${p.date}</div><div style="display:grid;grid-template-columns:1fr auto;gap:6px 18px;font-size:12px;"><span style="color:var(--text-body);">Emails sent</span><span style="color:#465FFF;font-weight:600;font-variant-numeric:tabular-nums;">${p.emails}</span><span style="color:var(--text-body);">Calls completed</span><span style="color:#12B76A;font-weight:600;font-variant-numeric:tabular-nums;">${p.calls}</span><span style="color:var(--text-body);">Meetings booked</span><span style="color:#F79009;font-weight:600;font-variant-numeric:tabular-nums;">${p.meetings}</span><span style="color:var(--text-body);">Deals advanced</span><span style="color:#7A5AF8;font-weight:600;font-variant-numeric:tabular-nums;">${p.dealsAdvanced}</span></div>${note}</div>`;
      },
    },
    annotations: {
      xaxis: series
        .filter((p) => p.annotation)
        .map((p) => ({
          x: p.date,
          borderColor: '#7A5AF8',
          label: {
            text: p.annotation,
            orientation: 'vertical',
            position: 'top',
            style: { background: '#7A5AF8', color: '#fff', fontSize: '10px', fontFamily: 'Outfit, sans-serif', fontWeight: 500, padding: { left: 6, right: 6, top: 3, bottom: 3 }, borderRadius: 4 },
          },
        })),
    },
  };
  const chartSeries = [
    { name: 'Emails', data: series.map((p) => p.emails) },
    { name: 'Calls', data: series.map((p) => p.calls) },
    { name: 'Meetings', data: series.map((p) => p.meetings) },
    { name: 'Deals advanced', data: series.map((p) => p.dealsAdvanced) },
  ];

  const pulseStats = [
    { label: 'Active accounts', value: Data.crmPulse.activeAccounts.toLocaleString(), tone: 'brand' as const },
    { label: 'Open opportunities', value: String(Data.crmPulse.openOpportunities), tone: 'info' as const },
    { label: 'Pipeline value', value: `$${(Data.crmPulse.pipelineValue / 1000000).toFixed(2)}M`, tone: 'success' as const },
    { label: 'Avg response', value: Data.crmPulse.avgResponseTime, tone: 'violet' as const },
  ];
  const toneCls: Record<string, string> = {
    brand: 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]',
    info: 'text-[var(--color-info-600)] dark:text-[var(--color-info-500)]',
    success: 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]',
    violet: 'text-[#7a5af8] dark:text-[#a78bfa]',
  };

  return (
    <PremiumCard className="flex flex-col">
      <CardHeader
        icon={Activity}
        iconBg="bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"
        title="Relationship Timeline"
        subtitle="Touchpoints and deal movement over time."
        action={<CardActionMenu cardName="Relationship Timeline" />}
        badge={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-50)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[var(--color-success-500)]" />
            </span>
            Live
          </span>
        }
      />
      {/* Premium pulse stats row */}
      <div className="grid grid-cols-2 gap-px border-b border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-4">
        {pulseStats.map((stat) => (
          <div key={stat.label} className="bg-[var(--card)] px-5 py-3.5 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</p>
            <p className={cn('mt-0.5 text-xl font-semibold tabular-nums tracking-tight', toneCls[stat.tone])}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="px-3 py-4 sm:px-5">
        <Chart options={options} series={chartSeries} type="bar" height={isMobile ? 300 : 360} />
      </div>
    </PremiumCard>
  );
}
