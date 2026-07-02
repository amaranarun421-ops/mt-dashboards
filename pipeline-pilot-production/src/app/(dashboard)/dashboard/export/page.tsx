'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { AvatarBadge } from '@/components/common/status-badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Download, Plus, FileText, FileSpreadsheet, FileArchive, Clock,
  Calendar, CheckCircle2, Loader2, Mail, Zap, ArrowRight, FileBarChart,
  TrendingUp, Users, Handshake, Target,
} from 'lucide-react';

type ExportFormat = 'CSV' | 'XLSX' | 'PDF' | 'JSON';
type ExportStatus = 'Ready' | 'Generating' | 'Scheduled' | 'Failed';
type DeltaType = 'positive' | 'negative' | 'neutral';

interface ExportRow {
  id: string;
  fileName: string;
  type: string;
  format: ExportFormat;
  records: number;
  size: string;
  status: ExportStatus;
  requestedBy: string;
  initials: string;
  date: string;
  color: string;
}

const EXPORTS: ExportRow[] = [
  { id: 'ex-1', fileName: 'Q3-pipeline-forecast.xlsx', type: 'Pipeline', format: 'XLSX', records: 156, size: '4.8 MB', status: 'Ready', requestedBy: 'Sarah Chen', initials: 'SC', date: '2 hours ago', color: 'var(--accent)' },
  { id: 'ex-2', fileName: 'enterprise-accounts-q2.csv', type: 'Accounts', format: 'CSV', records: 248, size: '1.2 MB', status: 'Ready', requestedBy: 'Emily Davis', initials: 'ED', date: '5 hours ago', color: 'var(--chart-1)' },
  { id: 'ex-3', fileName: 'monthly-sales-summary.pdf', type: 'Sales', format: 'PDF', records: 0, size: '2.4 MB', status: 'Ready', requestedBy: 'Admin', initials: 'AD', date: '1 day ago', color: 'var(--chart-3)' },
  { id: 'ex-4', fileName: 'team-performance-q2.xlsx', type: 'Performance', format: 'XLSX', records: 32, size: '1.8 MB', status: 'Generating', requestedBy: 'Mike Johnson', initials: 'MJ', date: '10 minutes ago', color: 'var(--chart-5)' },
  { id: 'ex-5', fileName: 'leads-export-jul.json', type: 'Leads', format: 'JSON', records: 412, size: '892 KB', status: 'Ready', requestedBy: 'David Okafor', initials: 'DO', date: '1 day ago', color: 'var(--chart-3)' },
  { id: 'ex-6', fileName: 'revenue-by-quarter.pdf', type: 'Revenue', format: 'PDF', records: 0, size: '1.6 MB', status: 'Failed', requestedBy: 'Sarah Chen', initials: 'SC', date: '2 days ago', color: 'var(--destructive)' },
  { id: 'ex-7', fileName: 'win-loss-q2-analysis.xlsx', type: 'Win/Loss', format: 'XLSX', records: 187, size: '2.6 MB', status: 'Ready', requestedBy: 'Emily Davis', initials: 'ED', date: '3 days ago', color: 'var(--chart-1)' },
  { id: 'ex-8', fileName: 'contacts-engagement.csv', type: 'Contacts', format: 'CSV', records: 642, size: '3.1 MB', status: 'Scheduled', requestedBy: 'Admin', initials: 'AD', date: 'Tomorrow', color: 'var(--chart-3)' },
];

const KPIS: { label: string; value: string; delta: string; deltaType: DeltaType; icon: typeof Download; color: string }[] = [
  { label: 'Exports this month', value: '47', delta: '+12 vs last month', deltaType: 'positive', icon: Download, color: 'var(--accent)' },
  { label: 'Total records exported', value: '12.4k', delta: '+2.1k records', deltaType: 'positive', icon: FileText, color: 'var(--chart-1)' },
  { label: 'Avg processing time', value: '8.2s', delta: '-1.4s faster', deltaType: 'positive', icon: Clock, color: 'var(--chart-3)' },
  { label: 'Scheduled exports', value: '6', delta: '2 due this week', deltaType: 'neutral', icon: Calendar, color: 'var(--chart-5)' },
];

const TEMPLATES: { id: string; name: string; description: string; icon: React.ElementType; color: string; formats: ExportFormat[]; records: string }[] = [
  { id: 'tpl-1', name: 'Pipeline snapshot', description: 'All open deals with values, stages, owners', icon: Handshake, color: 'var(--accent)', formats: ['CSV', 'XLSX'], records: '~156' },
  { id: 'tpl-2', name: 'Revenue report', description: 'Monthly revenue + targets vs actuals', icon: TrendingUp, color: 'var(--chart-1)', formats: ['PDF', 'XLSX'], records: '~12 months' },
  { id: 'tpl-3', name: 'Account list', description: 'All accounts with tier, ARR, health score', icon: Users, color: 'var(--chart-3)', formats: ['CSV', 'XLSX'], records: '~248' },
  { id: 'tpl-4', name: 'Forecast summary', description: 'Q3 forecast breakdown by rep and stage', icon: Target, color: 'var(--chart-5)', formats: ['PDF', 'CSV'], records: '~8 reps' },
  { id: 'tpl-5', name: 'Activity log', description: 'Calls, meetings, emails for date range', icon: FileBarChart, color: 'var(--chart-4)', formats: ['CSV'], records: '~2.4k' },
];

const SCHEDULED: { id: string; name: string; frequency: string; nextRun: string; recipient: string; format: ExportFormat; color: string }[] = [
  { id: 'sch-1', name: 'Weekly pipeline summary', frequency: 'Every Monday · 8:00 AM', nextRun: 'Jul 7', recipient: 'sales-leaders@pipelinepilot.io', format: 'PDF', color: 'var(--accent)' },
  { id: 'sch-2', name: 'Monthly revenue report', frequency: '1st of month · 9:00 AM', nextRun: 'Aug 1', recipient: 'cfo@pipelinepilot.io', format: 'XLSX', color: 'var(--chart-1)' },
  { id: 'sch-3', name: 'Daily deals digest', frequency: 'Daily · 6:00 PM', nextRun: 'Today', recipient: 'sales-team@pipelinepilot.io', format: 'CSV', color: 'var(--chart-3)' },
  { id: 'sch-4', name: 'Quarterly forecast', frequency: 'Quarterly · last Friday', nextRun: 'Sep 26', recipient: 'leadership@pipelinepilot.io', format: 'PDF', color: 'var(--chart-5)' },
];

const FORMAT_CONFIG: Record<ExportFormat, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  CSV: { color: 'var(--chart-3)', bg: 'bg-chart-3/10', border: 'border-chart-3/30', icon: FileText },
  XLSX: { color: 'var(--success)', bg: 'bg-success/10', border: 'border-success/30', icon: FileSpreadsheet },
  PDF: { color: 'var(--destructive)', bg: 'bg-destructive/10', border: 'border-destructive/30', icon: FileText },
  JSON: { color: 'var(--chart-1)', bg: 'bg-chart-1/10', border: 'border-chart-1/30', icon: FileArchive },
};

const STATUS_CONFIG: Record<ExportStatus, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  Ready: { color: 'var(--success)', bg: 'bg-success/10', border: 'border-success/30', icon: CheckCircle2 },
  Generating: { color: 'var(--warning)', bg: 'bg-warning/10', border: 'border-warning/30', icon: Loader2 },
  Scheduled: { color: 'var(--chart-1)', bg: 'bg-chart-1/10', border: 'border-chart-1/30', icon: Clock },
  Failed: { color: 'var(--destructive)', bg: 'bg-destructive/10', border: 'border-destructive/30', icon: FileText },
};

export default function ExportPage() {
  const columns: Column<ExportRow>[] = [
    {
      key: 'fileName',
      header: 'File',
      sortable: true,
      sortAccessor: (r) => r.fileName,
      cell: (r) => (
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${r.color} 12%, transparent)` }}>
            <FileText className="w-4 h-4" style={{ color: r.color }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate max-w-[200px]">{r.fileName}</p>
            <p className="text-[10px] text-muted-foreground">{r.type}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'format',
      header: 'Format',
      sortable: true,
      sortAccessor: (r) => r.format,
      cell: (r) => {
        const cfg = FORMAT_CONFIG[r.format];
        const Icon = cfg.icon;
        return (
          <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border', cfg.bg, cfg.border)} style={{ color: cfg.color }}>
            <Icon className="w-2.5 h-2.5" />
            {r.format}
          </span>
        );
      },
    },
    {
      key: 'records',
      header: 'Records',
      sortable: true,
      align: 'right',
      sortAccessor: (r) => r.records,
      cell: (r) => (
        <span className="text-xs text-foreground tabular-nums">
          {r.records > 0 ? r.records.toLocaleString() : '—'}
        </span>
      ),
    },
    {
      key: 'size',
      header: 'Size',
      sortable: true,
      align: 'right',
      sortAccessor: (r) => r.size,
      cell: (r) => <span className="text-xs text-muted-foreground tabular-nums">{r.size}</span>,
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
            <Icon className={cn('w-3 h-3', r.status === 'Generating' && 'animate-spin')} />
            {r.status}
          </span>
        );
      },
    },
    {
      key: 'requestedBy',
      header: 'Requested by',
      sortable: true,
      sortAccessor: (r) => r.requestedBy,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={r.initials} size="sm" color={r.color} />
          <span className="text-xs text-foreground">{r.requestedBy}</span>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      sortable: true,
      sortAccessor: (r) => r.date,
      cell: (r) => <span className="text-xs text-muted-foreground">{r.date}</span>,
    },
    {
      key: 'download',
      header: 'Action',
      align: 'center',
      hideable: false,
      cell: (r) =>
        r.status === 'Ready' ? (
          <button
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-[11px] font-medium"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        ) : (
          <span className="text-[10px] text-muted-foreground">—</span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Export Center"
        description="Generate, schedule, and download exports of your Pipeline Pilot data"
        icon={Download}
        actions={
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> New export
          </Button>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map((k, i) => {
          const Icon = k.icon;
          const deltaColor = k.deltaType === 'positive' ? 'text-success' : k.deltaType === 'negative' ? 'text-destructive' : 'text-muted-foreground';
          return (
            <div
              key={k.label}
              className="relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-start justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{k.label}</span>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${k.color} 12%, transparent)` }}>
                  <Icon className="w-4 h-4" style={{ color: k.color }} />
                </div>
              </div>
              <p className="relative text-2xl lg:text-3xl font-bold text-foreground tabular-nums">{k.value}</p>
              <p className={cn('relative text-xs mt-1.5 font-medium', deltaColor)}>{k.delta}</p>
            </div>
          );
        })}
      </div>

      {/* Main: exports table + templates sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <DataTable<ExportRow>
            data={EXPORTS}
            columns={columns}
            getRowId={(r) => r.id}
            searchable
            searchKeys={['fileName', 'type', 'format', 'status', 'requestedBy']}
            searchPlaceholder="Search exports by file, type, or status…"
            pageSize={8}
            emptyTitle="No exports found"
            emptyDescription="Try adjusting your search."
            exportFilename="exports.csv"
          />
        </div>

        {/* Templates */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Quick export templates</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">One-click common exports</p>
            <div className="space-y-2">
              {TEMPLATES.map((t, i) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    className="group w-full text-left flex items-start gap-3 p-3 rounded-lg border border-border hover:border-accent/40 hover:bg-secondary/40 transition-all animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${t.color} 12%, transparent)` }}>
                      <Icon className="w-4 h-4" style={{ color: t.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">{t.description}</p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className="text-[9px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{t.records}</span>
                        {t.formats.map((f) => (
                          <span key={f} className="text-[9px] font-medium border px-1 py-0.5 rounded" style={{ color: FORMAT_CONFIG[f].color, borderColor: `color-mix(in oklch, ${FORMAT_CONFIG[f].color} 25%, transparent)`, backgroundColor: `color-mix(in oklch, ${FORMAT_CONFIG[f].color} 8%, transparent)` }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-1" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-xl p-4">
            <Mail className="w-5 h-5 text-accent mb-2" />
            <p className="text-xs font-semibold text-foreground mb-1">Auto-deliver exports</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Schedule recurring exports to be emailed to your team automatically.
            </p>
            <Button size="sm" variant="outline" className="w-full mt-3 bg-card border-accent/30 text-accent hover:bg-accent/10 h-8 text-xs">
              <Calendar className="w-3 h-3 mr-1.5" /> Schedule export
            </Button>
          </div>
        </div>
      </div>

      {/* Scheduled exports */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Scheduled exports</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Recurring exports that run automatically</p>
          </div>
          <Button size="sm" variant="outline" className="bg-card border-border h-8 text-xs">
            <Plus className="w-3 h-3 mr-1.5" /> New schedule
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {SCHEDULED.map((s, i) => {
            const cfg = FORMAT_CONFIG[s.format as ExportFormat];
            const Icon = cfg.icon;
            return (
              <div
                key={s.id}
                className="group relative bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-all duration-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}>
                    <Calendar className="w-4 h-4" style={{ color: s.color }} />
                  </div>
                  <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border', cfg.bg, cfg.border)} style={{ color: cfg.color }}>
                    <Icon className="w-2.5 h-2.5" />
                    {s.format}
                  </span>
                </div>
                <h4 className="relative text-sm font-semibold text-foreground mb-1">{s.name}</h4>
                <p className="relative text-[11px] text-muted-foreground flex items-center gap-1.5 mb-2">
                  <Clock className="w-3 h-3" />
                  {s.frequency}
                </p>
                <div className="relative pt-3 border-t border-border space-y-2">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Next run</p>
                    <p className="text-xs font-semibold text-foreground">{s.nextRun}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Recipient</p>
                    <p className="text-[11px] text-muted-foreground truncate">{s.recipient}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
