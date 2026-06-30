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



const DATE_PRESETS = [
  { key: '7d', label: 'Last 7 days', range: 'Jun 17 – Jun 23, 2026' },
  { key: '30d', label: 'Last 30 days', range: 'May 24 – Jun 23, 2026' },
  { key: '90d', label: 'Last 90 days', range: 'Mar 25 – Jun 23, 2026' },
  { key: 'month', label: 'This month', range: 'Jun 01 – Jun 23, 2026' },
  { key: 'custom', label: 'Custom range', range: 'May 24 – Jun 23, 2026' },
];
const OWNERS = ['All owners', 'Darlene Robertson', 'Kristin Watson', 'Albert Flores', 'Jane Cooper', 'Devon Lane'];
const PIPELINES = ['All pipelines', 'Sales Pipeline', 'Renewal Pipeline', 'Expansion Pipeline'];

function HeaderButton({
  icon: Icon,
  label,
  mobileLabel,
  onClick,
  active,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  mobileLabel?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border bg-[var(--card)] px-3.5 text-sm font-medium transition-all duration-200',
        active
          ? 'border-[var(--color-brand-500)] text-[var(--color-brand-600)] ring-4 ring-[rgba(70,95,255,0.12)]'
          : 'border-[var(--border)] text-[var(--text-body)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
      )}
    >
      <Icon className="size-4 text-[var(--text-muted)]" strokeWidth={2} />
      <span className="hidden sm:inline">{label}</span>
      {mobileLabel && <span className="sm:hidden">{mobileLabel}</span>}
      <ChevronDown
        className={cn('size-3.5 text-[var(--text-muted)] transition-transform duration-200', active && 'rotate-180')}
        strokeWidth={2.2}
      />
    </button>
  );
}

export function CrmHeader({ onNewContact }: { onNewContact: () => void }) {
  const { toast } = useToast();
  const [dateOpen, setDateOpen] = React.useState(false);
  const [ownerOpen, setOwnerOpen] = React.useState(false);
  const [pipeOpen, setPipeOpen] = React.useState(false);
  const [exportOpen, setExportOpen] = React.useState(false);
  const [dateLabel, setDateLabel] = React.useState('May 24 – Jun 23, 2026');
  const [ownerFilter, setOwnerFilter] = React.useState('All owners');
  const [pipeFilter, setPipeFilter] = React.useState('All pipelines');

  function closeAll() {
    setDateOpen(false);
    setOwnerOpen(false);
    setPipeOpen(false);
    setExportOpen(false);
  }

  function handleExport(format: string) {
    setExportOpen(false);
    if (format === 'csv') {
      const headers = ['Account', 'Contact', 'Owner', 'Stage', 'Value', 'Health', 'Last Touch', 'Next Action', 'Status'];
      const rows = Data.contacts.map((c) => [c.account, c.contact, c.owner, c.stage, c.value, c.health, c.lastTouch, c.nextAction, c.status]);
      const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `crm-contacts-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: 'CSV exported', description: `${Data.contacts.length} contacts downloaded` });
    } else {
      toast({ title: `${format.toUpperCase()} export prepared` });
    }
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <nav className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)]">
          <span className="hover:text-[var(--text-strong)]">Dashboards</span>
          <ChevronRight className="size-3 text-[var(--text-faint)]" strokeWidth={2.5} />
          <span className="text-[var(--text-strong)]">CRM</span>
        </nav>
        <h1 className="ds-page-title flex items-center gap-2.5">
          <span className="bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] bg-clip-text text-transparent">
            Relationship Command Center
          </span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
          Track accounts, conversations, deal health, follow-ups, and customer intent in one workspace.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-success-200,rgba(18,183,106,0.3))] bg-[var(--color-success-50)] px-3 py-2 dark:bg-[rgba(18,183,106,0.1)]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-success-500)] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[var(--color-success-500)]" />
          </span>
          <span className="text-xs font-medium text-[var(--color-success-700)] dark:text-[var(--color-success-500)]">Live · synced 1 min ago</span>
        </div>
        <div className="relative">
          <HeaderButton icon={CalendarDays} label={dateLabel} mobileLabel="Date" active={dateOpen} onClick={() => { closeAll(); setDateOpen(true); }} />
          <Popover open={dateOpen} onClose={() => setDateOpen(false)} width={240}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Date range</p></div>
            {DATE_PRESETS.map((p) => (
              <PopoverItem key={p.key} onClick={() => { setDateLabel(p.range); setDateOpen(false); toast({ title: 'Date range updated', description: p.label }); }}>{p.label}</PopoverItem>
            ))}
          </Popover>
        </div>
        <div className="relative">
          <HeaderButton icon={Users} label={ownerFilter} mobileLabel="Owner" active={ownerOpen} onClick={() => { closeAll(); setOwnerOpen(true); }} />
          <Popover open={ownerOpen} onClose={() => setOwnerOpen(false)} width={200}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Owner</p></div>
            {OWNERS.map((o) => (
              <PopoverItem key={o} active={ownerFilter === o} onClick={() => { setOwnerFilter(o); setOwnerOpen(false); toast({ title: 'Owner filter applied', description: o }); }}>{o}</PopoverItem>
            ))}
          </Popover>
        </div>
        <div className="relative">
          <HeaderButton icon={Briefcase} label={pipeFilter} mobileLabel="Pipeline" active={pipeOpen} onClick={() => { closeAll(); setPipeOpen(true); }} />
          <Popover open={pipeOpen} onClose={() => setPipeOpen(false)} width={200}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Pipeline</p></div>
            {PIPELINES.map((p) => (
              <PopoverItem key={p} active={pipeFilter === p} onClick={() => { setPipeFilter(p); setPipeOpen(false); toast({ title: 'Pipeline filter applied', description: p }); }}>{p}</PopoverItem>
            ))}
          </Popover>
        </div>
        <div className="relative">
          <HeaderButton icon={Download} label="Export" active={exportOpen} onClick={() => { closeAll(); setExportOpen(true); }} />
          <Popover open={exportOpen} onClose={() => setExportOpen(false)} width={200}>
            <div className="px-2 py-1.5"><p className="px-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">Export format</p></div>
            <PopoverItem icon={Download} onClick={() => handleExport('csv')}>Export CSV</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('pdf')}>Export PDF</PopoverItem>
            <PopoverItem icon={FileText} onClick={() => handleExport('xls')}>Export XLS</PopoverItem>
          </Popover>
        </div>
        <button
          type="button"
          onClick={onNewContact}
          className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-[0_4px_14px_-2px_rgba(70,95,255,0.45)] transition-all duration-200 hover:bg-[var(--color-brand-600)] hover:shadow-[0_6px_20px_-2px_rgba(70,95,255,0.55)] hover:-translate-y-0.5 active:translate-y-0"
        >
          <UserPlus className="size-4" strokeWidth={2.5} />
          New contact
        </button>
      </div>
    </div>
  );
}
