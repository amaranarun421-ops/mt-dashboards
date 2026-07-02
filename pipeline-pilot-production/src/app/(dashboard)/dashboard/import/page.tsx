'use client';

import * as React from 'react';
import { PageHeader } from '@/components/common/page-header';
import { DataTable, type Column } from '@/components/tables/data-table';
import { AvatarBadge } from '@/components/common/status-badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Upload, FileSpreadsheet, Handshake, Building2, Contact, UserPlus,
  Check, ChevronRight, ChevronLeft, FileUp, Download, AlertCircle,
  CheckCircle2, XCircle, Wand2, ArrowRight, FileText, Clock,
} from 'lucide-react';

type DataType = 'deals' | 'accounts' | 'contacts' | 'leads';

interface DataTypeOption {
  id: DataType;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  fields: number;
}

const DATA_TYPES: DataTypeOption[] = [
  { id: 'deals', name: 'Deals', description: 'Import pipeline opportunities, values, and stages', icon: Handshake, color: 'var(--accent)', fields: 12 },
  { id: 'accounts', name: 'Accounts', description: 'Import customer accounts, ARR, and tier information', icon: Building2, color: 'var(--chart-1)', fields: 10 },
  { id: 'contacts', name: 'Contacts', description: 'Import contacts, titles, and engagement data', icon: Contact, color: 'var(--chart-3)', fields: 9 },
  { id: 'leads', name: 'Leads', description: 'Import leads, sources, scores, and intent', icon: UserPlus, color: 'var(--chart-5)', fields: 11 },
];

const TEMPLATES = [
  { id: 'tpl-deals', name: 'Deals Template', type: 'Deals' as DataType, fields: 12, size: '4.2 KB', icon: Handshake, color: 'var(--accent)' },
  { id: 'tpl-accounts', name: 'Accounts Template', type: 'Accounts' as DataType, fields: 10, size: '3.1 KB', icon: Building2, color: 'var(--chart-1)' },
  { id: 'tpl-contacts', name: 'Contacts Template', type: 'Contacts' as DataType, fields: 9, size: '2.8 KB', icon: Contact, color: 'var(--chart-3)' },
  { id: 'tpl-leads', name: 'Leads Template', type: 'Leads' as DataType, fields: 11, size: '3.6 KB', icon: UserPlus, color: 'var(--chart-5)' },
];

interface ColumnMapping {
  source: string;
  target: string;
  autoMatched: boolean;
  required: boolean;
}

const COLUMN_MAPPINGS: ColumnMapping[] = [
  { source: 'Deal Name', target: 'name', autoMatched: true, required: true },
  { source: 'Company', target: 'account', autoMatched: true, required: true },
  { source: 'Amount', target: 'value', autoMatched: true, required: true },
  { source: 'Stage', target: 'stage', autoMatched: true, required: true },
  { source: 'Close_Date', target: 'closeDate', autoMatched: true, required: false },
  { source: 'Owner_Email', target: 'ownerEmail', autoMatched: true, required: false },
  { source: 'Probability', target: 'probability', autoMatched: true, required: false },
  { source: 'Lead_Source', target: 'source', autoMatched: true, required: false },
  { source: 'Next_Step', target: 'nextStep', autoMatched: false, required: false },
  { source: 'Type', target: 'dealType', autoMatched: false, required: false },
];

const PREVIEW_ROWS = [
  { name: 'Enterprise Platform — Annual', account: 'Acme Corporation', value: 125000, stage: 'Negotiation', closeDate: '2025-07-22', status: 'valid' },
  { name: 'Analytics Add-On', account: 'Acme Corporation', value: 48000, stage: 'Proposal', closeDate: '2025-08-05', status: 'valid' },
  { name: 'Manufacturing Suite Q3', account: 'GlobalTech Industries', value: 245000, stage: 'Negotiation', closeDate: '2025-07-30', status: 'valid' },
  { name: 'Healthcare Compliance Pack', account: 'Innovate Labs', value: 89000, stage: 'Proposal', closeDate: '2025-08-12', status: 'valid' },
  { name: 'Data Platform Renewal', account: 'DataStream Analytics', value: 92000, stage: 'Discovery', closeDate: '2025-07-08', status: 'warning' },
  { name: 'Finance Automation Pilot', account: 'NextGen Solutions', value: 38000, stage: 'Qualified', closeDate: '2025-09-01', status: 'valid' },
  { name: 'Cloud Expansion — Multi-Region', account: 'CloudFirst Inc', value: 178000, stage: 'Proposal', closeDate: '2025-08-18', status: 'valid' },
  { name: 'Robotics Vision Stack', account: 'Vertex Robotics', value: '—', stage: 'Negotiation', closeDate: '2025-07-15', status: 'error' },
  { name: 'Media Workflow Suite', account: 'BrightWave Media', value: 67000, stage: 'Qualified', closeDate: '2025-08-25', status: 'valid' },
  { name: 'Logistics Optimization Engine', account: 'Quantum Logistics', value: 203000, stage: 'Proposal', closeDate: '2025-08-30', status: 'valid' },
];

const RECENT_IMPORTS = [
  { id: 'imp-1', name: 'Q3-leads-export.csv', type: 'Leads', records: 248, status: 'success', importedBy: 'Sarah Chen', initials: 'SC', date: '2 hours ago', color: 'var(--chart-5)' },
  { id: 'imp-2', name: 'acme-accounts.xlsx', type: 'Accounts', records: 18, status: 'success', importedBy: 'Emily Davis', initials: 'ED', date: '5 hours ago', color: 'var(--chart-1)' },
  { id: 'imp-3', name: 'hubspot-contacts.csv', type: 'Contacts', records: 156, status: 'partial', importedBy: 'Admin', initials: 'AD', date: '1 day ago', color: 'var(--chart-3)' },
  { id: 'imp-4', name: 'q2-deals-batch.csv', type: 'Deals', records: 89, status: 'success', importedBy: 'Mike Johnson', initials: 'MJ', date: '2 days ago', color: 'var(--accent)' },
  { id: 'imp-5', name: 'trade-show-leads.csv', type: 'Leads', records: 34, status: 'failed', importedBy: 'David Okafor', initials: 'DO', date: '3 days ago', color: 'var(--chart-5)' },
  { id: 'imp-6', name: 'enterprise-accounts.csv', type: 'Accounts', records: 12, status: 'success', importedBy: 'Sarah Chen', initials: 'SC', date: '4 days ago', color: 'var(--chart-1)' },
];

const STEPS = [
  { id: 1, label: 'Data type' },
  { id: 2, label: 'Upload' },
  { id: 3, label: 'Map columns' },
  { id: 4, label: 'Review' },
  { id: 5, label: 'Import' },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string; label: string; icon: React.ElementType }> = {
  success: { color: 'var(--success)', bg: 'bg-success/10', border: 'border-success/30', label: 'Success', icon: CheckCircle2 },
  partial: { color: 'var(--warning)', bg: 'bg-warning/10', border: 'border-warning/30', label: 'Partial', icon: AlertCircle },
  failed: { color: 'var(--destructive)', bg: 'bg-destructive/10', border: 'border-destructive/30', label: 'Failed', icon: XCircle },
};

export default function ImportPage() {
  const [step, setStep] = React.useState(1);
  const [dataType, setDataType] = React.useState<DataType | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [importProgress, setImportProgress] = React.useState(0);
  const [importing, setImporting] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setFileName(file.name);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleStartImport = () => {
    setImporting(true);
    setImportProgress(0);
    const interval = setInterval(() => {
      setImportProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setImporting(false);
          return 100;
        }
        return p + 4;
      });
    }, 90);
  };

  const recentColumns: Column<typeof RECENT_IMPORTS[number]>[] = [
    {
      key: 'name',
      header: 'File',
      sortable: true,
      sortAccessor: (r) => r.name,
      cell: (r) => (
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${r.color} 12%, transparent)` }}>
            <FileSpreadsheet className="w-4 h-4" style={{ color: r.color }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{r.name}</p>
            <p className="text-[10px] text-muted-foreground">{r.type} import</p>
          </div>
        </div>
      ),
    },
    {
      key: 'records',
      header: 'Records',
      sortable: true,
      align: 'right',
      sortAccessor: (r) => r.records,
      cell: (r) => <span className="text-xs font-semibold text-foreground tabular-nums">{r.records}</span>,
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
            {cfg.label}
          </span>
        );
      },
    },
    {
      key: 'importedBy',
      header: 'Imported by',
      sortable: true,
      sortAccessor: (r) => r.importedBy,
      cell: (r) => (
        <div className="flex items-center gap-2">
          <AvatarBadge initials={r.initials} size="sm" color={r.color} />
          <span className="text-xs text-foreground">{r.importedBy}</span>
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
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Import Data"
        description="Bulk import deals, accounts, contacts, and leads into Pipeline Pilot"
        icon={Upload}
        actions={
          <Button size="sm" variant="outline" className="bg-card border-border">
            <FileText className="w-3.5 h-3.5 mr-1.5" /> Import guide
          </Button>
        }
      />

      {/* Wizard + templates */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Wizard */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl p-5">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-6 overflow-x-auto pb-1">
            {STEPS.map((s, i) => {
              const isActive = step === s.id;
              const isDone = step > s.id;
              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => {
                      // Allow navigation back to completed steps
                      if (s.id < step) setStep(s.id);
                    }}
                    className={cn(
                      'flex items-center gap-2 shrink-0 transition-colors',
                      (isActive || isDone) ? 'text-foreground cursor-pointer' : 'text-muted-foreground cursor-default'
                    )}
                  >
                    <div
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-all',
                        isActive && 'bg-accent text-accent-foreground border-accent',
                        isDone && 'bg-accent/15 text-accent border-accent/30',
                        !isActive && !isDone && 'bg-secondary text-muted-foreground border-border'
                      )}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : s.id}
                    </div>
                    <span className={cn('text-xs font-medium hidden sm:block', isActive && 'text-accent')}>{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px mx-2 bg-border relative overflow-hidden">
                      <div
                        className={cn('absolute inset-y-0 left-0 bg-accent transition-all duration-500', isDone ? 'w-full' : 'w-0')}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Step content */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-sm font-semibold text-foreground mb-1">Choose data type</h3>
              <p className="text-xs text-muted-foreground mb-5">What would you like to import?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DATA_TYPES.map((t, i) => {
                  const Icon = t.icon;
                  const isSelected = dataType === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setDataType(t.id)}
                      className={cn(
                        'group text-left p-4 rounded-xl border transition-all animate-in fade-in slide-in-from-bottom-2 duration-500',
                        isSelected ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40 hover:bg-secondary/30'
                      )}
                      style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `color-mix(in oklch, ${t.color} 12%, transparent)` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: t.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-semibold text-foreground">{t.name}</h4>
                            {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
                          <p className="text-[10px] text-muted-foreground/70 mt-2">{t.fields} fields available</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end mt-6">
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!dataType} onClick={() => setStep(2)}>
                  Continue <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-sm font-semibold text-foreground mb-1">Upload your file</h3>
              <p className="text-xs text-muted-foreground mb-5">Drag and drop your CSV or Excel file, or browse to upload.</p>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all',
                  dragOver ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40 hover:bg-secondary/30',
                  fileName && 'border-success/40 bg-success/5'
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
                <div className="flex flex-col items-center gap-3">
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
                    fileName ? 'bg-success/15 text-success' : 'bg-accent/10 text-accent'
                  )}>
                    {fileName ? <CheckCircle2 className="w-7 h-7" /> : <FileUp className="w-7 h-7" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {fileName ? fileName : 'Drop your file here'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {fileName ? 'File ready to import' : 'or click to browse · CSV, XLSX up to 10MB'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent imports list mini */}
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Recent uploads</p>
                <div className="space-y-2">
                  {RECENT_IMPORTS.slice(0, 3).map((r) => (
                    <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors cursor-pointer">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${r.color} 12%, transparent)` }}>
                        <FileSpreadsheet className="w-3.5 h-3.5" style={{ color: r.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{r.name}</p>
                        <p className="text-[10px] text-muted-foreground">{r.records} records · {r.date}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 text-xs text-muted-foreground hover:text-accent">
                        Re-use
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button size="sm" variant="outline" className="bg-card border-border" onClick={() => setStep(1)}>
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
                </Button>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={!fileName} onClick={() => setStep(3)}>
                  Continue <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Map columns</h3>
                  <p className="text-xs text-muted-foreground">Match source columns to Pipeline Pilot fields.</p>
                </div>
                <Button size="sm" variant="outline" className="bg-card border-border h-8 text-xs">
                  <Wand2 className="w-3 h-3 mr-1.5" /> Auto-match all
                </Button>
              </div>
              <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/60">
                        <th className="py-2.5 px-4 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Source column</th>
                        <th className="py-2.5 px-4 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Pipeline Pilot field</th>
                        <th className="py-2.5 px-4 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Match</th>
                        <th className="py-2.5 px-4 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Required</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COLUMN_MAPPINGS.map((m, i) => (
                        <tr key={m.source} className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-1" style={{ animationDelay: `${i * 25}ms`, animationFillMode: 'both' }}>
                          <td className="py-2.5 px-4">
                            <span className="text-xs font-mono text-foreground">{m.source}</span>
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2">
                              <ArrowRight className="w-3 h-3 text-muted-foreground/60" />
                              <span className="text-xs font-mono text-foreground">{m.target}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-4">
                            {m.autoMatched ? (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-success/30 bg-success/10 text-success">
                                <Check className="w-2.5 h-2.5" /> Auto-matched
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-medium border border-warning/30 bg-warning/10 text-warning">
                                <AlertCircle className="w-2.5 h-2.5" /> Review
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            {m.required ? (
                              <span className="text-[10px] font-medium text-destructive">Required</span>
                            ) : (
                              <span className="text-[10px] text-muted-foreground">Optional</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button size="sm" variant="outline" className="bg-card border-border" onClick={() => setStep(2)}>
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
                </Button>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(4)}>
                  Review & validate <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Review & validate</h3>
                  <p className="text-xs text-muted-foreground">Preview first 10 rows · 1 error · 1 warning</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border border-destructive/30 bg-destructive/10 text-destructive">
                    <XCircle className="w-3 h-3" /> 1 error
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border border-warning/30 bg-warning/10 text-warning">
                    <AlertCircle className="w-3 h-3" /> 1 warning
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border border-success/30 bg-success/10 text-success">
                    <CheckCircle2 className="w-3 h-3" /> 8 valid
                  </span>
                </div>
              </div>
              <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-secondary/60">
                        <th className="py-2.5 px-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-8">#</th>
                        <th className="py-2.5 px-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Deal Name</th>
                        <th className="py-2.5 px-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Account</th>
                        <th className="py-2.5 px-3 text-right text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                        <th className="py-2.5 px-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Stage</th>
                        <th className="py-2.5 px-3 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Close Date</th>
                        <th className="py-2.5 px-3 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-20">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PREVIEW_ROWS.map((row, i) => {
                        const cfg = row.status === 'valid'
                          ? { color: 'var(--success)', Icon: CheckCircle2 }
                          : row.status === 'warning'
                          ? { color: 'var(--warning)', Icon: AlertCircle }
                          : { color: 'var(--destructive)', Icon: XCircle };
                        const Icon = cfg.Icon;
                        return (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors animate-in fade-in slide-in-from-bottom-1" style={{ animationDelay: `${i * 25}ms`, animationFillMode: 'both' }}>
                            <td className="py-2.5 px-3 text-xs text-muted-foreground tabular-nums">{i + 1}</td>
                            <td className="py-2.5 px-3 text-xs font-medium text-foreground">{row.name}</td>
                            <td className="py-2.5 px-3 text-xs text-muted-foreground">{row.account}</td>
                            <td className="py-2.5 px-3 text-xs text-foreground text-right tabular-nums">
                              {typeof row.value === 'number' ? `$${row.value.toLocaleString()}` : row.value}
                            </td>
                            <td className="py-2.5 px-3 text-xs text-muted-foreground">{row.stage}</td>
                            <td className="py-2.5 px-3 text-xs text-muted-foreground tabular-nums">{row.closeDate}</td>
                            <td className="py-2.5 px-3 text-center">
                              <Icon className="w-3.5 h-3.5 inline-block" style={{ color: cfg.color }} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button size="sm" variant="outline" className="bg-card border-border" onClick={() => setStep(3)}>
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
                </Button>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(5)}>
                  Start import <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-sm font-semibold text-foreground mb-1">Import progress</h3>
              <p className="text-xs text-muted-foreground mb-5">{fileName} · 10 records · Deals</p>

              <div className="bg-secondary/30 rounded-lg border border-border p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                    importProgress >= 100 ? 'bg-success/15 text-success' : 'bg-accent/10 text-accent'
                  )}>
                    {importProgress >= 100 ? <CheckCircle2 className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {importProgress >= 100 ? 'Import completed successfully' : importing ? 'Importing data…' : 'Ready to import'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {importProgress >= 100
                        ? '10 records imported · 0 errors · 0 warnings'
                        : importing
                        ? `Processing ${Math.round(importProgress / 10)} of 10 records`
                        : 'Click the button below to start the import'}
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-foreground tabular-nums">{importProgress}%</span>
                </div>

                <Progress value={importProgress} className="h-2.5 mb-4" />

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 rounded-lg border border-border bg-card">
                    <p className="text-lg font-bold text-success tabular-nums">{importProgress >= 100 ? '8' : Math.floor(importProgress / 10)}</p>
                    <p className="text-[10px] text-muted-foreground">Imported</p>
                  </div>
                  <div className="p-2.5 rounded-lg border border-border bg-card">
                    <p className="text-lg font-bold text-warning tabular-nums">{importProgress >= 100 ? '1' : '0'}</p>
                    <p className="text-[10px] text-muted-foreground">Warnings</p>
                  </div>
                  <div className="p-2.5 rounded-lg border border-border bg-card">
                    <p className="text-lg font-bold text-destructive tabular-nums">{importProgress >= 100 ? '1' : '0'}</p>
                    <p className="text-[10px] text-muted-foreground">Errors</p>
                  </div>
                </div>

                {!importing && importProgress < 100 && (
                  <Button size="sm" className="w-full mt-5 bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleStartImport}>
                    <Upload className="w-3.5 h-3.5 mr-1.5" /> Start import
                  </Button>
                )}
                {importProgress >= 100 && (
                  <div className="flex gap-2 mt-5">
                    <Button size="sm" variant="outline" className="flex-1 bg-card border-border">
                      View imported deals
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-card border-border" onClick={() => { setStep(1); setFileName(null); setImportProgress(0); }}>
                      Import another file
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: templates */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileSpreadsheet className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Import templates</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Download pre-formatted CSV templates with the correct fields and required columns for each data type.
          </p>
          <div className="space-y-2">
            {TEMPLATES.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.id}
                  className="group flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent/40 hover:bg-secondary/40 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                >
                  <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${t.color} 12%, transparent)` }}>
                    <Icon className="w-4 h-4" style={{ color: t.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.fields} fields · {t.size}</p>
                  </div>
                  <Download className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-lg p-3">
              <p className="text-[11px] font-semibold text-foreground mb-1">Need help?</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Read the import guide for field requirements, formats, and best practices.
              </p>
              <button className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline">
                View guide <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent imports table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Recent imports</h3>
            <p className="text-xs text-muted-foreground mt-0.5">History of past import operations</p>
          </div>
        </div>
        <DataTable<typeof RECENT_IMPORTS[number]>
          data={RECENT_IMPORTS}
          columns={recentColumns}
          getRowId={(r) => r.id}
          searchable
          searchKeys={['name', 'type', 'importedBy', 'status']}
          searchPlaceholder="Search imports by file name, type, or importer…"
          pageSize={6}
          exportFilename="recent-imports.csv"
        />
      </div>
    </div>
  );
}
