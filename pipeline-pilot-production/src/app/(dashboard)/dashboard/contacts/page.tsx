'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { contacts, accounts, type Contact } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Contact as ContactIcon, Plus, Download, Users, UserCheck, Activity, Sparkles, Filter, X,
} from 'lucide-react';

type StatusFilter = 'all' | Contact['status'];

const STATUS_COLOR: Record<Contact['status'], string> = {
  'Decision Maker': 'var(--destructive)',
  'Champion': 'var(--accent)',
  'Influencer': 'var(--chart-1)',
  'Gatekeeper': 'var(--chart-3)',
  'User': 'var(--chart-5)',
};

const STATUS_BADGE_TYPE: Record<Contact['status'], 'high' | 'success' | 'info' | 'warning' | 'neutral'> = {
  'Decision Maker': 'high',
  'Champion': 'success',
  'Influencer': 'info',
  'Gatekeeper': 'warning',
  'User': 'neutral',
};

function engagementColor(score: number): string {
  if (score >= 80) return 'var(--success)';
  if (score >= 60) return 'var(--warning)';
  return 'var(--destructive)';
}

function contactInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export default function ContactsPage() {
  const [status, setStatus] = React.useState<StatusFilter>('all');

  const filtered = React.useMemo(() => {
    return contacts.filter((c) => status === 'all' || c.status === status);
  }, [status]);

  const decisionMakers = contacts.filter((c) => c.status === 'Decision Maker').length;
  const avgEngagement = Math.round(contacts.reduce((s, c) => s + c.engagement, 0) / contacts.length);

  const stats = [
    { label: 'Total Contacts', value: contacts.length.toString(), icon: ContactIcon, color: 'var(--accent)', sub: 'across all accounts' },
    { label: 'Decision Makers', value: decisionMakers.toString(), icon: UserCheck, color: 'var(--destructive)', sub: 'key stakeholders' },
    { label: 'Avg Engagement', value: `${avgEngagement}`, icon: Activity, color: 'var(--chart-3)', sub: 'engagement score / 100' },
    { label: 'New This Month', value: '3', icon: Sparkles, color: 'var(--chart-1)', sub: 'added in last 30 days' },
  ];

  const statusChips: { value: StatusFilter; label: string; count: number; color: string }[] = [
    { value: 'all', label: 'All', count: contacts.length, color: 'var(--accent)' },
    ...(['Decision Maker', 'Champion', 'Influencer', 'Gatekeeper', 'User'] as Contact['status'][]).map((s) => ({
      value: s,
      label: s,
      count: contacts.filter((c) => c.status === s).length,
      color: STATUS_COLOR[s],
    })),
  ];

  const columns: Column<Contact>[] = [
    {
      key: 'name',
      header: 'Contact',
      sortable: true,
      sortAccessor: (c) => c.name,
      cell: (c) => (
        <div className="flex items-center gap-3 min-w-0">
          <AvatarBadge initials={contactInitials(c.name)} size="md" color={STATUS_COLOR[c.status]} />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
            <span className="text-[10px] text-muted-foreground truncate">{c.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      sortAccessor: (c) => c.title,
      cell: (c) => <span className="text-xs text-foreground">{c.title}</span>,
    },
    {
      key: 'account',
      header: 'Account',
      sortable: true,
      sortAccessor: (c) => c.account,
      cell: (c) => {
        const acct = accounts.find((a) => a.id === c.accountId);
        return (
          <Link
            href={acct ? `/dashboard/accounts/${acct.id}` : '/dashboard/accounts'}
            className="text-xs text-accent hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {c.account}
          </Link>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortAccessor: (c) => c.status,
      cell: (c) => (
        <StageBadge stage={c.status} color={STATUS_COLOR[c.status]} />
      ),
    },
    {
      key: 'engagement',
      header: 'Engagement',
      sortable: true,
      sortAccessor: (c) => c.engagement,
      cell: (c) => {
        const color = engagementColor(c.engagement);
        return (
          <div className="flex items-center gap-2 min-w-[100px]">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${c.engagement}%`, background: color }}
              />
            </div>
            <span className="text-xs font-semibold text-foreground tabular-nums w-7 text-right">{c.engagement}</span>
          </div>
        );
      },
    },
    {
      key: 'owner',
      header: 'Owner',
      sortable: true,
      sortAccessor: (c) => c.owner,
      cell: (c) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={contactInitials(c.owner)} size="sm" color="var(--chart-3)" />
          <span className="text-xs text-foreground">{c.owner}</span>
        </div>
      ),
    },
    {
      key: 'lastContact',
      header: 'Last Contact',
      sortable: true,
      sortAccessor: (c) => c.lastContact,
      cell: (c) => <span className="text-xs text-muted-foreground">{c.lastContact}</span>,
    },
    {
      key: 'source',
      header: 'Source',
      sortable: true,
      sortAccessor: (c) => c.source,
      cell: (c) => <span className="text-xs text-muted-foreground">{c.source}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts"
        description="Every stakeholder across your accounts — search, filter, and engage"
        icon={ContactIcon}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Contact
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-xl font-bold text-foreground tabular-nums">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Status filter chips */}
      <div className="bg-card border border-border rounded-xl p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </div>
          {statusChips.map((chip) => (
            <button
              key={chip.value}
              onClick={() => setStatus(chip.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                status === chip.value
                  ? 'text-foreground'
                  : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
              )}
              style={status === chip.value ? {
                background: `color-mix(in oklch, ${chip.color} 15%, transparent)`,
                borderColor: `color-mix(in oklch, ${chip.color} 40%, transparent)`,
              } : undefined}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: chip.color }} />
              {chip.label}
              <span className="text-[10px] text-muted-foreground">{chip.count}</span>
            </button>
          ))}
          {status !== 'all' && (
            <Button variant="ghost" size="sm" onClick={() => setStatus('all')} className="ml-auto h-7 text-xs text-muted-foreground hover:text-foreground">
              <X className="w-3 h-3 mr-1" /> Clear filter
            </Button>
          )}
        </div>
      </div>

      {/* Data table */}
      <DataTable<Contact>
        data={filtered}
        columns={columns}
        getRowId={(c) => c.id}
        searchable
        searchKeys={['name', 'email', 'account', 'title']}
        searchPlaceholder="Search contacts by name, email, or account…"
        selectable
        pageSize={10}
        emptyTitle="No contacts match your filters"
        emptyDescription="Try adjusting your search or clearing the status filter."
        emptyAction={
          <Button size="sm" variant="outline" onClick={() => setStatus('all')}>
            Clear filters
          </Button>
        }
        exportFilename="contacts.csv"
        initialSort={{ key: 'engagement', dir: 'desc' }}
      />
    </div>
  );
}
