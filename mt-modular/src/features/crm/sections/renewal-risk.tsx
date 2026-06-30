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


export function RenewalRiskCard() {
  const riskConfig = {
    high: { color: '#F04438', cls: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]' },
    medium: { color: '#F79009', cls: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]' },
    low: { color: '#12B76A', cls: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' },
  };
  return (
    <PremiumCard className="flex h-full flex-col">
      <CardHeader
        icon={RefreshCw}
        iconBg="bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"
        title="Renewal Risk"
        subtitle="Accounts approaching renewal with risk signals."
        action={
          <span className="inline-flex items-center rounded-full bg-[var(--color-warning-50)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]">
            {Data.renewalRisks.length} at risk
          </span>
        }
      />
      <div className="flex-1 space-y-2 p-4 sm:p-5">
        {Data.renewalRisks.map((r) => {
          const cfg = riskConfig[r.risk];
          return (
            <div
              key={r.id}
              className="group rounded-xl border-l-[3px] bg-[var(--surface-sunken)]/40 p-3 transition-all duration-200 hover:bg-[var(--surface-sunken)]/70"
              style={{ borderLeftColor: cfg.color }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[var(--text-strong)]">{r.account}</p>
                  <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{r.signal} · ${(r.value / 1000).toFixed(0)}K value</p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1">
                  <span className={cn('inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide', cfg.cls)}>{r.risk}</span>
                  <p className="text-[11px] font-medium tabular-nums text-[var(--text-muted)]">{r.daysToRenewal} days</p>
                </div>
              </div>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="mt-2 text-[11px] text-[var(--text-body)]">
                    <span className="font-semibold text-[var(--text-strong)]">Action:</span> {r.action}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PremiumCard>
  );
}
