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


export function AccountHealthMatrix() {
  const [hovered, setHovered] = React.useState<string | null>(null);
  const segments = ['Enterprise', 'Mid-market', 'SMB', 'Trial'];
  const statuses = ['Healthy', 'Needs attention', 'At risk', 'Expansion-ready'];
  const statusColors = ['#12B76A', '#F79009', '#F04438', '#465FFF'];
  function getCell(seg: string, stat: string) {
    return Data.healthMatrix.find((c) => c.segment === seg && c.status === stat);
  }
  return (
    <PremiumCard className="flex h-full flex-col">
      <CardHeader
        icon={Shield}
        iconBg="bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]"
        title="Account Health Matrix"
        subtitle="Distribution by segment and health status."
        action={<CardActionMenu cardName="Health Matrix" />}
      />
      <div className="flex-1 overflow-x-auto p-4 sm:p-5">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr>
              <th className="py-2 pl-1 pr-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Segment</th>
              {statuses.map((s, i) => (
                <th key={s} className="py-2 px-2 text-center text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ background: statusColors[i] }} />
                    {s}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {segments.map((seg) => (
              <tr key={seg}>
                <td className="py-1.5 pl-1 pr-2 text-xs font-semibold text-[var(--text-strong)]">{seg}</td>
                {statuses.map((stat, si) => {
                  const cell = getCell(seg, stat);
                  const key = `${seg}-${stat}`;
                  const isHovered = hovered === key;
                  if (!cell || cell.count === 0) {
                    return (
                      <td key={stat} className="py-1.5 px-2">
                        <div className="flex h-12 items-center justify-center rounded-xl bg-[var(--surface-sunken)]/30 text-[11px] text-[var(--text-faint)]">—</div>
                      </td>
                    );
                  }
                  return (
                    <td key={stat} className="py-1.5 px-2">
                      <div
                        onMouseEnter={() => setHovered(key)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative flex h-12 cursor-pointer flex-col items-center justify-center rounded-xl border transition-all duration-200 hover:scale-[1.04]"
                        style={{ background: `${statusColors[si]}14`, borderColor: isHovered ? statusColors[si] : 'transparent' }}
                      >
                        <span className="text-base font-semibold tabular-nums text-[var(--text-strong)]">{cell.count}</span>
                        <span className={cn(
                          'text-[10px] font-medium',
                          cell.trend > 0 ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : cell.trend < 0 ? 'text-[var(--color-error-600)] dark:text-[var(--color-error-500)]' : 'text-[var(--text-muted)]',
                        )}>
                          {cell.trend > 0 ? '+' : ''}{cell.trend}
                        </span>
                        {isHovered && (
                          <div className="absolute -top-24 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-xl border border-[var(--border)] bg-[var(--popover)] p-3 text-xs shadow-[var(--shadow-theme-lg)]" style={{ animation: 'ecomPopoverIn 200ms ease-out' }}>
                            <p className="font-semibold text-[var(--text-strong)]">{seg} · {stat}</p>
                            <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">{cell.count} accounts</p>
                            <p className="mt-1 max-w-[200px] text-[11px] text-[var(--text-muted)]">Examples: {cell.examples.join(', ')}</p>
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
    </PremiumCard>
  );
}
