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


export function MeetingSchedule() {
  const { toast } = useToast();
  const [selected, setSelected] = React.useState<string | null>(null);
  const typeIcons = { demo: Video, renewal: RefreshCw, contract: FileText, onboarding: UserPlus };
  const typeColors = {
    demo: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
    renewal: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    contract: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    onboarding: 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
  };
  return (
    <PremiumCard className="flex h-full flex-col">
      <CardHeader
        icon={Calendar}
        iconBg="bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]"
        title="Meeting Schedule"
        subtitle="Today's meetings and calls."
        action={<CardActionMenu cardName="Meeting Schedule" />}
      />
      <div className="flex-1 space-y-2 p-4 sm:p-5">
        {Data.meetings.map((m) => {
          const Icon = typeIcons[m.type];
          const isSel = selected === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelected(isSel ? null : m.id);
                toast({ title: m.title, description: `${m.account} · ${m.time}` });
              }}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 cursor-pointer',
                isSel
                  ? 'border-[var(--color-brand-300)] bg-[var(--color-brand-50)]/40 dark:bg-[rgba(70,95,255,0.06)]'
                  : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)]/40',
              )}
            >
              <span className={cn('inline-flex size-9 flex-shrink-0 items-center justify-center rounded-lg', typeColors[m.type])}>
                <Icon className="size-4" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-[var(--text-strong)]">{m.title}</p>
                <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{m.account}</p>
              </div>
              <span className="flex-shrink-0 text-[11px] font-semibold tabular-nums text-[var(--text-strong)]">{m.time}</span>
            </button>
          );
        })}
      </div>
    </PremiumCard>
  );
}
