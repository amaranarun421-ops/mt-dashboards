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

import type { Deal } from '../types';

export function PipelineBoard({ onDealClick }: { onDealClick: (deal: Deal) => void }) {
  const riskCls = {
    low: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    medium: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    high: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
  };
  return (
    <PremiumCard>
      <CardHeader
        icon={Briefcase}
        iconBg="bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"
        title="Pipeline Board"
        subtitle="Deals by stage — click a card for details."
        action={<CardActionMenu cardName="Pipeline Board" />}
      />
      <div className="flex gap-3 overflow-x-auto p-4 pb-5 sm:p-5">
        {Data.pipelineStages.map((stage) => {
          const stageDeals = Data.deals.filter((d) => d.stage === stage.key).slice(0, 3);
          const totalValue = (stage.value / 1000).toFixed(0);
          return (
            <div key={stage.key} className="flex w-64 flex-shrink-0 flex-col">
              <div
                className="mb-3 flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/40 px-3 py-2.5"
                style={{ borderLeftColor: stage.color, borderLeftWidth: 3 }}
              >
                <div>
                  <span className="block text-xs font-semibold text-[var(--text-strong)]">{stage.name}</span>
                  <span className="text-[11px] text-[var(--text-muted)]">{stage.count} deals</span>
                </div>
                <span className="text-sm font-semibold tabular-nums text-[var(--text-strong)]">${totalValue}K</span>
              </div>
              <div className="space-y-2">
                {stageDeals.map((deal) => (
                  <button
                    key={deal.id}
                    type="button"
                    onClick={() => onDealClick(deal)}
                    className="group w-full cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-3 text-left shadow-[var(--shadow-theme-xs)] transition-all duration-200 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-theme-md)] hover:-translate-y-0.5"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="truncate text-[13px] font-semibold text-[var(--text-strong)]">{deal.account}</span>
                      <span className={cn('inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide', riskCls[deal.risk])}>{deal.risk}</span>
                    </div>
                    <div className="mb-2 flex items-center gap-1.5">
                      <UserAvatar name={deal.owner} size="xs" />
                      <span className="truncate text-[11px] text-[var(--text-muted)]">{deal.owner}</span>
                    </div>
                    <div className="mb-2 flex items-center justify-between text-[11px]">
                      <span className="font-semibold tabular-nums text-[var(--text-strong)]">${(deal.value / 1000).toFixed(0)}K</span>
                      <span className="text-[var(--text-muted)]">{deal.probability}% prob</span>
                    </div>
                    <p className="truncate text-[11px] text-[var(--text-muted)]">{deal.nextAction}</p>
                    <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--text-subtle)]">{deal.daysInStage}d in stage</p>
                  </button>
                ))}
                {stageDeals.length === 0 && (
                  <p className="px-3 py-6 text-center text-[11px] text-[var(--text-subtle)]">No deals</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PremiumCard>
  );
}
