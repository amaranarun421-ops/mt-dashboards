'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  RefreshCw, CheckCircle2, AlertTriangle, XCircle, Clock, Database,
  ArrowRight, ArrowLeftRight, GitBranch, FileWarning, Activity,
  Zap, Settings2,
} from 'lucide-react';

type SyncStatus = 'Success' | 'Partial' | 'Failed';

interface SyncLogRow {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  records: number;
  status: SyncStatus;
  duration: string;
}

const SYNC_LOG: SyncLogRow[] = [
  { id: 'sl-1', timestamp: '10:42 AM · Today', source: 'Salesforce', destination: 'Pipeline Pilot', records: 248, status: 'Success', duration: '1.4s' },
  { id: 'sl-2', timestamp: '09:15 AM · Today', source: 'HubSpot', destination: 'Pipeline Pilot', records: 56, status: 'Success', duration: '0.8s' },
  { id: 'sl-3', timestamp: '08:30 AM · Today', source: 'Outlook', destination: 'Pipeline Pilot', records: 12, status: 'Partial', duration: '2.1s' },
  { id: 'sl-4', timestamp: '11:50 PM · Yesterday', source: 'Stripe', destination: 'Pipeline Pilot', records: 8, status: 'Success', duration: '0.4s' },
  { id: 'sl-5', timestamp: '06:00 PM · Yesterday', source: 'Salesforce', destination: 'Pipeline Pilot', records: 0, status: 'Failed', duration: '4.7s' },
  { id: 'sl-6', timestamp: '03:30 PM · Yesterday', source: 'Segment', destination: 'Pipeline Pilot', records: 124, status: 'Success', duration: '0.9s' },
  { id: 'sl-7', timestamp: '11:00 AM · Yesterday', source: 'Zoom', destination: 'Pipeline Pilot', records: 7, status: 'Partial', duration: '1.2s' },
  { id: 'sl-8', timestamp: '09:00 AM · Yesterday', source: 'HubSpot', destination: 'Pipeline Pilot', records: 41, status: 'Success', duration: '0.7s' },
];

interface TimelineEvent {
  id: string;
  status: SyncStatus;
  title: string;
  description: string;
  records: number;
  timestamp: string;
  source: string;
}

const TIMELINE: TimelineEvent[] = [
  { id: 'ev-1', status: 'Success', title: 'Salesforce sync completed', description: 'Contacts, opportunities, and accounts synced successfully', records: 248, timestamp: '10:42 AM', source: 'Salesforce' },
  { id: 'ev-2', status: 'Partial', title: 'Outlook email sync completed with warnings', description: '12 new emails synced · 3 calendar events failed (time zone mismatch)', records: 12, timestamp: '08:30 AM', source: 'Outlook' },
  { id: 'ev-3', status: 'Success', title: 'HubSpot sync completed', description: 'Contacts and engagements synced to Pipeline Pilot', records: 56, timestamp: 'Yesterday · 09:15 AM', source: 'HubSpot' },
  { id: 'ev-4', status: 'Failed', title: 'Salesforce sync failed', description: 'API rate limit exceeded — retrying in 15 minutes', records: 0, timestamp: 'Yesterday · 06:00 PM', source: 'Salesforce' },
  { id: 'ev-5', status: 'Success', title: 'Segment CDP sync completed', description: 'Customer events and identity graph refreshed', records: 124, timestamp: 'Yesterday · 03:30 PM', source: 'Segment' },
  { id: 'ev-6', status: 'Success', title: 'Stripe billing sync completed', description: '8 new invoices and 3 subscription updates', records: 8, timestamp: 'Yesterday · 11:50 PM', source: 'Stripe' },
];

interface FieldMapping {
  id: string;
  crmField: string;
  pipelineField: string;
  direction: 'bidirectional' | 'crm-to-pipeline' | 'pipeline-to-crm';
  lastValue: string;
  lastSync: string;
}

const FIELD_MAPPINGS: FieldMapping[] = [
  { id: 'fm-1', crmField: 'Opportunity.Name', pipelineField: 'Deal.name', direction: 'bidirectional', lastValue: 'Enterprise Platform — Annual', lastSync: '2h ago' },
  { id: 'fm-2', crmField: 'Opportunity.Amount', pipelineField: 'Deal.value', direction: 'crm-to-pipeline', lastValue: '$125,000', lastSync: '2h ago' },
  { id: 'fm-3', crmField: 'Opportunity.StageName', pipelineField: 'Deal.stage', direction: 'bidirectional', lastValue: 'Negotiation', lastSync: '2h ago' },
  { id: 'fm-4', crmField: 'Opportunity.CloseDate', pipelineField: 'Deal.closeDate', direction: 'bidirectional', lastValue: '2025-07-22', lastSync: '2h ago' },
  { id: 'fm-5', crmField: 'Account.Name', pipelineField: 'Account.name', direction: 'bidirectional', lastValue: 'Acme Corporation', lastSync: '2h ago' },
  { id: 'fm-6', crmField: 'Account.AnnualRevenue', pipelineField: 'Account.revenue', direction: 'crm-to-pipeline', lastValue: '$485,000', lastSync: '2h ago' },
  { id: 'fm-7', crmField: 'Contact.Email', pipelineField: 'Contact.email', direction: 'bidirectional', lastValue: 'john@acme.com', lastSync: '2h ago' },
  { id: 'fm-8', crmField: 'User.Id', pipelineField: 'Rep.externalId', direction: 'pipeline-to-crm', lastValue: '0058...a2c', lastSync: '4h ago' },
  { id: 'fm-9', crmField: 'Opportunity.Probability', pipelineField: 'Deal.probability', direction: 'bidirectional', lastValue: '80', lastSync: '2h ago' },
];

const SYNC_STATS = [
  { label: 'Records synced', value: '248', sub: 'today', icon: Database, color: 'var(--accent)' },
  { label: 'Conflicts resolved', value: '5', sub: 'auto-merged', icon: GitBranch, color: 'var(--chart-3)' },
  { label: 'Sync errors', value: '1', sub: 'needs attention', icon: AlertTriangle, color: 'var(--destructive)' },
  { label: 'Mapped fields', value: '42', sub: 'of 48 total', icon: ArrowLeftRight, color: 'var(--chart-1)' },
];

const STATUS_CONFIG: Record<SyncStatus, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  Success: { color: 'var(--success)', bg: 'bg-success/10', border: 'border-success/30', icon: CheckCircle2 },
  Partial: { color: 'var(--warning)', bg: 'bg-warning/10', border: 'border-warning/30', icon: AlertTriangle },
  Failed: { color: 'var(--destructive)', bg: 'bg-destructive/10', border: 'border-destructive/30', icon: XCircle },
};

const DIRECTION_LABEL: Record<FieldMapping['direction'], string> = {
  'bidirectional': 'CRM ↔ Pipeline Pilot',
  'crm-to-pipeline': 'CRM → Pipeline Pilot',
  'pipeline-to-crm': 'Pipeline Pilot → CRM',
};

const SYNC_FREQUENCIES = [
  { value: '5m', label: 'Every 5 minutes' },
  { value: '15m', label: 'Every 15 minutes' },
  { value: '1h', label: 'Hourly' },
  { value: '6h', label: 'Every 6 hours' },
  { value: 'daily', label: 'Daily at midnight' },
];

export default function CrmSyncPage() {
  const [frequency, setFrequency] = React.useState('15m');
  const [syncing, setSyncing] = React.useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2400);
  };

  const columns: Column<SyncLogRow>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      sortable: true,
      sortAccessor: (r) => r.timestamp,
      cell: (r) => <span className="text-xs text-foreground whitespace-nowrap">{r.timestamp}</span>,
    },
    {
      key: 'source',
      header: 'Source',
      sortable: true,
      sortAccessor: (r) => r.source,
      cell: (r) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {r.source}
        </span>
      ),
    },
    {
      key: 'destination',
      header: 'Destination',
      cell: (r) => (
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
          {r.destination}
        </span>
      ),
    },
    {
      key: 'records',
      header: 'Records',
      sortable: true,
      align: 'right',
      sortAccessor: (r) => r.records,
      cell: (r) => <span className="text-xs font-semibold text-foreground tabular-nums">{r.records.toLocaleString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      sortAccessor: (r) => r.status,
      cell: (r) => {
        const cfg = STATUS_CONFIG[r.status];
        const Icon = cfg.icon;
        return (
          <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border', cfg.bg, cfg.border)} style={{ color: cfg.color }}>
            <Icon className="w-3 h-3" />
            {r.status}
          </span>
        );
      },
    },
    {
      key: 'duration',
      header: 'Duration',
      sortable: true,
      align: 'right',
      sortAccessor: (r) => parseFloat(r.duration),
      cell: (r) => (
        <span className="text-xs text-muted-foreground inline-flex items-center gap-1 tabular-nums">
          <Clock className="w-3 h-3" />
          {r.duration}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM Sync"
        description="Monitor and manage synchronization between your CRM and Pipeline Pilot"
        icon={RefreshCw}
        actions={
          <>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="w-[180px] h-9 bg-card border-border text-xs">
                <SelectValue placeholder="Sync frequency" />
              </SelectTrigger>
              <SelectContent>
                {SYNC_FREQUENCIES.map((f) => (
                  <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleSync} disabled={syncing}>
              <RefreshCw className={cn('w-3.5 h-3.5 mr-1.5', syncing && 'animate-spin')} />
              {syncing ? 'Syncing…' : 'Sync now'}
            </Button>
          </>
        }
      />

      {/* Sync status banner */}
      <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-r from-accent/10 via-card to-chart-1/5 p-5">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
              {syncing ? (
                <RefreshCw className="w-6 h-6 text-accent animate-spin" />
              ) : (
                <CheckCircle2 className="w-6 h-6 text-success" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {syncing ? 'Sync in progress…' : 'All systems synced'}
                </h3>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-success/30 bg-success/10 text-success">
                  <span className="w-1 h-1 rounded-full bg-success animate-pulse" /> Live
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {syncing
                  ? 'Syncing 248 records from Salesforce · ETA 1s'
                  : 'Last sync 2 hours ago · Next sync in 13 minutes · 0 active conflicts'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6 md:text-right">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last sync</p>
              <p className="text-sm font-semibold text-foreground tabular-nums">2h ago</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Next sync</p>
              <p className="text-sm font-semibold text-foreground tabular-nums">13 min</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</p>
              <p className="text-sm font-semibold text-success">Healthy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main: timeline + stats sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Sync activity timeline</h3>
            </div>
            <button className="text-xs text-muted-foreground hover:text-accent transition-colors">View all</button>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

            <div className="space-y-5">
              {TIMELINE.map((ev, i) => {
                const cfg = STATUS_CONFIG[ev.status];
                const Icon = cfg.icon;
                return (
                  <div
                    key={ev.id}
                    className="relative flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
                  >
                    <div
                      className={cn('relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-card shrink-0', cfg.border)}
                      style={{ color: cfg.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0 pb-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground">{ev.title}</h4>
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap">{ev.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">{ev.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-border bg-secondary text-muted-foreground">
                          <Database className="w-2.5 h-2.5" />
                          {ev.records} records
                        </span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-accent/30 bg-accent/10 text-accent">
                          {ev.source}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right sidebar: stats + field mapping summary */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Sync statistics</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SYNC_STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="p-3 rounded-lg border border-border bg-secondary/30 animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                  >
                    <div className="w-7 h-7 rounded-md flex items-center justify-center mb-2" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                    </div>
                    <p className="text-lg font-bold text-foreground tabular-nums">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                    <p className="text-[9px] text-muted-foreground/70 mt-0.5">{s.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold text-foreground">Field mapping</h3>
              </div>
              <button className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                <Settings2 className="w-3 h-3" /> Configure
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">42 of 48 fields mapped · 6 unmapped</p>

            {/* Mini progress */}
            <div className="relative h-2 rounded-full bg-secondary overflow-hidden mb-4">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-chart-1 transition-all duration-700"
                style={{ width: '87.5%' }}
              />
            </div>

            <div className="space-y-2">
              {[
                { obj: 'Deals', mapped: 14, total: 16, color: 'var(--accent)' },
                { obj: 'Accounts', mapped: 11, total: 12, color: 'var(--chart-1)' },
                { obj: 'Contacts', mapped: 12, total: 14, color: 'var(--chart-3)' },
                { obj: 'Activities', mapped: 5, total: 6, color: 'var(--chart-5)' },
              ].map((m) => (
                <div key={m.obj} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
                    <span className="text-muted-foreground">{m.obj}</span>
                  </div>
                  <span className="text-foreground tabular-nums font-medium">{m.mapped}/{m.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sync log table */}
      <DataTable<SyncLogRow>
        data={SYNC_LOG}
        columns={columns}
        getRowId={(r) => r.id}
        searchable
        searchKeys={['source', 'destination', 'status']}
        searchPlaceholder="Search sync logs by source or status…"
        pageSize={6}
        emptyTitle="No sync logs found"
        emptyDescription="Try adjusting your search."
        exportFilename="crm-sync-log.csv"
      />

      {/* Field mapping table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Field mapping</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Map CRM fields to Pipeline Pilot fields with direction</p>
          </div>
          <Button size="sm" variant="outline" className="bg-card border-border h-8 text-xs">
            <Settings2 className="w-3 h-3 mr-1.5" /> Edit mappings
          </Button>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="py-3 px-4 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">CRM Field</th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Pipeline Pilot Field</th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Direction</th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Last Synced Value</th>
                  <th className="py-3 px-4 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Last Sync</th>
                </tr>
              </thead>
              <tbody>
                {FIELD_MAPPINGS.map((fm, i) => {
                  const dirColor =
                    fm.direction === 'bidirectional' ? 'var(--accent)' :
                    fm.direction === 'crm-to-pipeline' ? 'var(--chart-1)' : 'var(--chart-3)';
                  return (
                    <tr
                      key={fm.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors animate-in fade-in slide-in-from-bottom-1"
                      style={{ animationDelay: `${Math.min(i, 8) * 30}ms`, animationFillMode: 'both' }}
                    >
                      <td className="py-3 px-4">
                        <span className="text-xs font-mono text-foreground">{fm.crmField}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                          <span className="text-xs font-mono text-foreground">{fm.pipelineField}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${dirColor} 12%, transparent)`,
                            color: dirColor,
                            borderColor: `color-mix(in oklch, ${dirColor} 25%, transparent)`,
                          }}
                        >
                          {DIRECTION_LABEL[fm.direction]}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-muted-foreground font-mono truncate max-w-[200px] inline-block">{fm.lastValue}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-xs text-muted-foreground tabular-nums">{fm.lastSync}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer warning */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-warning/30 bg-warning/5">
        <FileWarning className="w-4 h-4 text-warning shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs font-medium text-foreground">1 sync conflict needs review</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Outlook calendar event "QBR — Acme" failed due to time zone mismatch.{' '}
            <button className="text-accent hover:underline">Resolve conflict →</button>
          </p>
        </div>
      </div>
    </div>
  );
}
