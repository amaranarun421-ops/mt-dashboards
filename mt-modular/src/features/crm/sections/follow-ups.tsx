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


export function FollowUpsCard() {
  const { toast } = useToast();
  const [items, setItems] = React.useState(Data.followUps);
  const [selected, setSelected] = React.useState<string | null>(null);
  const typeIcons = { call: Phone, email: Mail, meeting: Video, review: FileText };
  const typeColors = {
    call: 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    email: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    meeting: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    review: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
  };
  const priorityCls = {
    high: 'border-l-[var(--color-error-500)]',
    medium: 'border-l-[var(--color-warning-500)]',
    low: 'border-l-[var(--color-info-500)]',
  };
  const priorityLabel = { high: 'High', medium: 'Medium', low: 'Low' };
  function toggle(id: string) {
    setItems((prev) => prev.map((f) => (f.id === id ? { ...f, done: !f.done } : f)));
    const item = items.find((f) => f.id === id);
    if (item && !item.done) toast({ title: 'Follow-up completed', description: item.task });
  }
  const dueCount = items.filter((f) => !f.done).length;
  return (
    <PremiumCard className="flex h-full flex-col">
      <CardHeader
        icon={CheckCircle2}
        iconBg="bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"
        title="Today's Follow-ups"
        subtitle="Priority tasks for today"
        action={<CardActionMenu cardName="Follow-ups" />}
        badge={
          <span className="inline-flex items-center rounded-full bg-[var(--color-brand-50)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            {dueCount} due
          </span>
        }
      />
      <div className="flex-1 space-y-2 p-4 sm:p-5">
        {items.map((f) => {
          const Icon = typeIcons[f.type];
          const isSel = selected === f.id;
          return (
            <div
              key={f.id}
              className={cn(
                'group flex items-center gap-3 rounded-xl border-l-[3px] bg-[var(--surface-sunken)]/40 p-3 transition-all duration-200 hover:bg-[var(--surface-sunken)]/70',
                priorityCls[f.priority],
                isSel && 'ring-2 ring-[var(--color-brand-200)] dark:ring-[rgba(70,95,255,0.3)]',
              )}
            >
              <button
                type="button"
                onClick={() => toggle(f.id)}
                className={cn(
                  'flex size-5 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border-2 transition-all duration-200',
                  f.done
                    ? 'border-[var(--color-success-500)] bg-[var(--color-success-500)] text-white'
                    : 'border-[var(--border-strong)] hover:border-[var(--color-brand-400)] hover:scale-110',
                )}
                aria-label={`Mark ${f.task} complete`}
              >
                {f.done && <Check className="size-3" strokeWidth={3} />}
              </button>
              <span className={cn('inline-flex size-7 flex-shrink-0 items-center justify-center rounded-lg', typeColors[f.type])}>
                <Icon className="size-3.5" strokeWidth={2.2} />
              </span>
              <div
                className="min-w-0 flex-1 cursor-pointer"
                onClick={() => setSelected(selected === f.id ? null : f.id)}
              >
                <p className={cn('truncate text-[13px] font-medium', f.done ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-strong)]')}>
                  {f.task}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                  <Clock className="size-3" strokeWidth={2} />
                  {f.time}
                  <span className="text-[var(--text-faint)]">·</span>
                  <span className={cn(
                    'font-medium',
                    f.priority === 'high' && 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]',
                    f.priority === 'medium' && 'text-[var(--color-warning-600)] dark:text-[var(--color-warning-500)]',
                    f.priority === 'low' && 'text-[var(--color-info-600)] dark:text-[var(--color-info-500)]',
                  )}>{priorityLabel[f.priority]}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {selected && (
        <div className="mx-4 mb-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)]/60 p-3 text-xs sm:mx-5" style={{ animation: 'ecomPopoverIn 200ms ease-out' }}>
          <p className="text-[var(--text-body)]">{items.find((f) => f.id === selected)?.detail}</p>
        </div>
      )}
      <div className="border-t border-[var(--border-subtle)] p-4 sm:p-5">
        <button
          type="button"
          onClick={() => toast({ title: 'Add task', description: 'Task creation modal would open here' })}
          className="inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-dashed border-[var(--border-strong)] text-xs font-medium text-[var(--text-muted)] transition-all duration-200 hover:border-[var(--color-brand-400)] hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-600)] dark:hover:bg-[rgba(70,95,255,0.08)]"
        >
          <Plus className="size-3.5" strokeWidth={2.5} />
          Add task
        </button>
      </div>
    </PremiumCard>
  );
}
