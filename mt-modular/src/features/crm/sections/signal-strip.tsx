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


export function CrmSignalStrip() {
  const iconMap = { leads: UserPlus, hot: Flame, stalled: AlertTriangle, followups: CheckCircle2, reply: Clock, renewal: RefreshCw };
  const colorMap = {
    up: 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]',
    down: 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]',
    warning: 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]',
  };
  const bgMap = {
    up: 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    down: 'bg-[var(--color-error-50)] text-[var(--color-error-600)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
    warning: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
  };
  const sparkColors = {
    up: '#12B76A',
    down: '#F04438',
    warning: '#F79009',
  };
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {Data.crmSignals.map((sig) => {
        const Icon = iconMap[sig.icon];
        return (
          <div
            key={sig.id}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--shadow-theme-xs)] transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-theme-md)] hover:-translate-y-0.5"
            title={sig.tooltip}
          >
            <div className="flex items-center justify-between">
              <span className={cn('inline-flex size-9 items-center justify-center rounded-xl', bgMap[sig.trend])}>
                <Icon className="size-[18px]" strokeWidth={2.2} />
              </span>
              <Sparkline data={sig.sparkline} color={sparkColors[sig.trend]} height={24} width={56} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{sig.label}</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-xl font-semibold tabular-nums tracking-tight text-[var(--text-strong)]">{sig.value}</span>
                <span className={cn('inline-flex items-center gap-0.5 text-[11px] font-medium', colorMap[sig.trend])}>
                  {sig.trend === 'up' && <ArrowUp className="size-2.5" strokeWidth={2.5} />}
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
