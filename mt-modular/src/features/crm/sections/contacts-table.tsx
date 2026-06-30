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

import type { Contact } from '../types';

export function ContactsTable({ contacts, onRowClick }: { contacts: Contact[]; onRowClick: (c: Contact) => void }) {
  const { toast } = useToast();
  const [search, setSearch] = React.useState('');
  const [stageFilter, setStageFilter] = React.useState('All');
  const [healthFilter, setHealthFilter] = React.useState('All');
  const [stageOpen, setStageOpen] = React.useState(false);
  const [healthOpen, setHealthOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [actionMenuFor, setActionMenuFor] = React.useState<string | null>(null);
  const pageSize = 6;
  const stages = ['All', 'New Lead', 'Qualified', 'Demo', 'Proposal', 'Negotiation', 'Closed Won', 'Renewal'];
  const healths = ['All', 'healthy', 'attention', 'at-risk', 'expansion'];
  const filtered = contacts.filter((c) => {
    if (stageFilter !== 'All' && c.stage !== stageFilter) return false;
    if (healthFilter !== 'All' && c.health !== healthFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!c.account.toLowerCase().includes(q) && !c.contact.toLowerCase().includes(q) && !c.owner.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * pageSize, current * pageSize);
  const healthConfig = {
    healthy: { tone: 'success' as const, label: 'Healthy' },
    attention: { tone: 'warning' as const, label: 'Attention' },
    'at-risk': { tone: 'error' as const, label: 'At risk' },
    expansion: { tone: 'brand' as const, label: 'Expansion' },
  };
  const statusTone = { Active: 'success' as const, Stalled: 'warning' as const, Won: 'info' as const, Lost: 'error' as const };
  const activeFilterCount = (stageFilter !== 'All' ? 1 : 0) + (healthFilter !== 'All' ? 1 : 0);
  function handleAction(action: string, c: Contact) {
    setActionMenuFor(null);
    toast({ title: `${action} — ${c.account}`, description: c.contact });
  }
  return (
    <PremiumCard>
      <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
            <Users className="size-[18px]" strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-[15px] font-semibold tracking-tight text-[var(--text-strong)]">Contacts &amp; Accounts</h3>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">All accounts — click row for detail.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
            <input
              type="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search contacts..."
              className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-xs font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:font-normal placeholder:text-[var(--text-subtle)] sm:w-52"
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => { setStageOpen((p) => !p); setHealthOpen(false); }}
              className={cn(
                'inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-all duration-200',
                stageOpen || stageFilter !== 'All'
                  ? 'border-[var(--color-brand-500)] text-[var(--color-brand-600)] ring-2 ring-[rgba(70,95,255,0.1)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
              )}
            >
              Stage
              <ChevronDown className={cn('size-3 transition-transform duration-200', stageOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={stageOpen} onClose={() => setStageOpen(false)} align="right" width={160}>
              {stages.map((s) => (
                <PopoverItem key={s} active={stageFilter === s} onClick={() => { setStageFilter(s); setStageOpen(false); setPage(1); }}>{s}</PopoverItem>
              ))}
            </Popover>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => { setHealthOpen((p) => !p); setStageOpen(false); }}
              className={cn(
                'inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-all duration-200',
                healthOpen || healthFilter !== 'All'
                  ? 'border-[var(--color-brand-500)] text-[var(--color-brand-600)] ring-2 ring-[rgba(70,95,255,0.1)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
              )}
            >
              Health
              <ChevronDown className={cn('size-3 transition-transform duration-200', healthOpen && 'rotate-180')} strokeWidth={2.2} />
            </button>
            <Popover open={healthOpen} onClose={() => setHealthOpen(false)} align="right" width={160}>
              {healths.map((h) => (
                <PopoverItem key={h} active={healthFilter === h} onClick={() => { setHealthFilter(h); setHealthOpen(false); setPage(1); }}>
                  {h === 'All' ? 'All' : healthConfig[h as keyof typeof healthConfig].label}
                </PopoverItem>
              ))}
            </Popover>
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => { setStageFilter('All'); setHealthFilter('All'); setPage(1); }}
              className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg px-2 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            >
              <X className="size-3" strokeWidth={2.5} />
              Clear ({activeFilterCount})
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-sunken)]/30">
              <th className="py-3 pl-5 pr-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] sm:pl-6">Account</th>
              <th className="py-3 px-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Contact</th>
              <th className="py-3 px-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Owner</th>
              <th className="py-3 px-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Stage</th>
              <th className="py-3 px-2 text-right text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Value</th>
              <th className="py-3 px-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Health</th>
              <th className="py-3 px-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Last touch</th>
              <th className="py-3 px-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Next action</th>
              <th className="py-3 px-2 text-left text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Status</th>
              <th className="py-3 pl-2 pr-5 sm:pr-6"></th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--surface-sunken)] text-[var(--text-muted)]">
                      <Search className="size-5" strokeWidth={2} />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-strong)]">No contacts found</p>
                    <p className="text-xs text-[var(--text-muted)]">Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onRowClick(c)}
                  className="group cursor-pointer border-b border-[var(--border-subtle)] transition-colors duration-150 last:border-0 hover:bg-[var(--surface-sunken)]/40"
                >
                  <td className="py-3 pl-5 pr-2 sm:pl-6">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex size-7 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
                        <Building2 className="size-3.5" strokeWidth={2.2} />
                      </span>
                      <span className="text-[13px] font-semibold text-[var(--text-strong)]">{c.account}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={c.contact} size="xs" />
                      <span className="text-[11px] text-[var(--text-body)]">{c.contact}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2"><span className="text-[11px] text-[var(--text-muted)]">{c.owner}</span></td>
                  <td className="py-3 px-2"><span className="text-[11px] text-[var(--text-body)]">{c.stage}</span></td>
                  <td className="py-3 px-2 text-right text-[13px] font-semibold tabular-nums text-[var(--text-strong)]">{c.value}</td>
                  <td className="py-3 px-2"><StatusBadge tone={healthConfig[c.health].tone} dot>{healthConfig[c.health].label}</StatusBadge></td>
                  <td className="py-3 px-2"><span className="text-[11px] text-[var(--text-muted)]">{c.lastTouch}</span></td>
                  <td className="py-3 px-2"><span className="text-[11px] text-[var(--text-body)]">{c.nextAction}</span></td>
                  <td className="py-3 px-2"><StatusBadge tone={statusTone[c.status]} dot>{c.status}</StatusBadge></td>
                  <td className="py-3 pl-2 pr-5 text-right sm:pr-6">
                    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setActionMenuFor(actionMenuFor === c.id ? null : c.id)}
                        className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100"
                        aria-label={`Actions for ${c.account}`}
                      >
                        <MoreHorizontal className="size-4" strokeWidth={2.2} />
                      </button>
                      <Popover open={actionMenuFor === c.id} onClose={() => setActionMenuFor(null)} align="right" width={180}>
                        <PopoverItem icon={Eye} onClick={() => handleAction('View', c)}>View details</PopoverItem>
                        <PopoverItem icon={Mail} onClick={() => handleAction('Email', c)}>Send email</PopoverItem>
                        <PopoverItem icon={Phone} onClick={() => handleAction('Log call', c)}>Log call</PopoverItem>
                        <div className="my-1 h-px bg-[var(--border-subtle)]" />
                        <PopoverItem icon={X} danger onClick={() => handleAction('Archive', c)}>Archive</PopoverItem>
                      </Popover>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-5 py-3 text-xs sm:px-6">
        <span className="text-[var(--text-muted)]">
          Showing <span className="font-semibold text-[var(--text-strong)]">{paged.length}</span> of <span className="font-semibold text-[var(--text-strong)]">{filtered.length}</span> contacts
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="size-3 rotate-180" strokeWidth={2.5} />
            Prev
          </button>
          <span className="px-3 text-xs font-semibold tabular-nums text-[var(--text-strong)]">{current} / {totalPages}</span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={current === totalPages}
            className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight className="size-3" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </PremiumCard>
  );
}
