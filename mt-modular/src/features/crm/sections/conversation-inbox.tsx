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

import type { Conversation } from '../types';

export function ConversationInbox({ onConversationClick }: { onConversationClick: (conv: Data.Conversation) => void }) {
  const channelIcons = { email: Mail, phone: Phone, linkedin: Linkedin, chat: MessageSquare, support: MessagesSquare };
  const channelColors = {
    email: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    phone: 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    linkedin: 'bg-[#0A66C2]/10 text-[#0A66C2]',
    chat: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
    support: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
  };
  return (
    <PremiumCard className="flex h-full flex-col">
      <CardHeader
        icon={MessagesSquare}
        iconBg="bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"
        title="Conversation Inbox"
        subtitle="Recent communications across channels."
        action={<CardActionMenu cardName="Conversation Inbox" />}
      />
      <div className="flex-1 space-y-2 p-4 sm:p-5">
        {Data.conversations.map((cv) => {
          const Icon = channelIcons[cv.channel];
          return (
            <button
              key={cv.id}
              type="button"
              onClick={() => onConversationClick(cv)}
              className="group flex w-full items-center gap-3 rounded-xl border border-[var(--border-subtle)] p-3 text-left transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)]/40 cursor-pointer"
            >
              <span className={cn('inline-flex size-9 flex-shrink-0 items-center justify-center rounded-lg', channelColors[cv.channel])}>
                <Icon className="size-4" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <UserAvatar name={cv.contact} size="xs" />
                  <span className="truncate text-[13px] font-semibold text-[var(--text-strong)]">{cv.contact}</span>
                  {cv.unread && <span className="size-2 flex-shrink-0 rounded-full bg-[var(--color-brand-500)]" />}
                  <span className="ml-auto text-[11px] text-[var(--text-subtle)]">{cv.time}</span>
                </div>
                <p className="mt-1 truncate text-[11px] text-[var(--text-muted)]">{cv.preview}</p>
                <p className="mt-0.5 text-[11px] font-medium text-[var(--text-subtle)]">{cv.account}</p>
              </div>
              <ChevronRight className="size-3 flex-shrink-0 text-[var(--text-muted)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" strokeWidth={2.5} />
            </button>
          );
        })}
      </div>
    </PremiumCard>
  );
}
