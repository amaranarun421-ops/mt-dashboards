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


export function AccountHealthRadar() {
  const dims = Data.accountHealth.dimensions;
  const cx = 110, cy = 110, maxR = 78;
  const angleStep = (2 * Math.PI) / dims.length;
  const points = dims.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (d.score / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), labelX: cx + (maxR + 18) * Math.cos(angle), labelY: cy + (maxR + 18) * Math.sin(angle), ...d };
  });
  const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');
  const gridLevels = [25, 50, 75, 100];
  const [hovered, setHovered] = React.useState<number | null>(null);
  return (
    <PremiumCard className="flex h-full flex-col">
      <CardHeader
        icon={Shield}
        iconBg="bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"
        title="Account Health Radar"
        subtitle="Multi-dimensional health score"
        action={<CardActionMenu cardName="Account Health" />}
      />
      <div className="flex flex-1 flex-col items-center gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="relative flex-shrink-0">
          <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
            {gridLevels.map((level) => {
              const r = (level / 100) * maxR;
              const gridPts = dims.map((_, i) => { const a = i * angleStep - Math.PI / 2; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(' ');
              return <polygon key={level} points={gridPts} fill="none" stroke="var(--border-subtle)" strokeWidth="1" />;
            })}
            {dims.map((_, i) => {
              const a = i * angleStep - Math.PI / 2;
              return <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(a)} y2={cy + maxR * Math.sin(a)} stroke="var(--border-subtle)" strokeWidth="1" />;
            })}
            <polygon points={polygon} fill="rgba(70,95,255,0.18)" stroke="#465FFF" strokeWidth="2.5" strokeLinejoin="round" style={{ animation: 'ecomFadeIn 700ms ease-out' }} />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={hovered === i ? 6 : 4}
                fill={p.color}
                stroke="var(--card)"
                strokeWidth="2.5"
                style={{ transition: 'r 200ms ease', cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
            {points.map((p, i) => (
              <text
                key={i}
                x={p.labelX}
                y={p.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fill={hovered === i ? p.color : 'var(--text-muted)'}
                fontFamily="Outfit, sans-serif"
                fontWeight={hovered === i ? '600' : '500'}
                style={{ cursor: 'pointer', transition: 'fill 200ms ease' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {p.name}
              </text>
            ))}
          </svg>
        </div>
        <div className="flex-1 space-y-3">
          <div className="rounded-xl bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] p-3 dark:from-[rgba(70,95,255,0.12)] dark:to-[rgba(70,95,255,0.04)]">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Overall health</p>
            <p className="mt-0.5 text-3xl font-semibold tabular-nums tracking-tight text-[var(--text-strong)]">
              {Data.accountHealth.overallScore}
              <span className="text-base font-medium text-[var(--text-muted)]">/100</span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] px-3 py-2">
              <span className="text-xs text-[var(--text-muted)]">At-risk</span>
              <span className="text-sm font-semibold tabular-nums text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">{Data.accountHealth.atRiskAccounts} accounts</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] px-3 py-2">
              <span className="text-xs text-[var(--text-muted)]">Expansion-ready</span>
              <span className="text-sm font-semibold tabular-nums text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">{Data.accountHealth.expansionReady} accounts</span>
            </div>
          </div>
        </div>
      </div>
      {hovered !== null && (
        <div className="mx-5 mb-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 p-3 sm:mx-6" style={{ animation: 'ecomPopoverIn 200ms ease-out' }}>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[var(--text-strong)]">{dims[hovered].name}</p>
            <span className="text-sm font-semibold tabular-nums" style={{ color: dims[hovered].color }}>{dims[hovered].score}/100</span>
          </div>
        </div>
      )}
    </PremiumCard>
  );
}
