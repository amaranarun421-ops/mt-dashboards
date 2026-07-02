'use client';

import * as React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { PageHeader } from '@/components/common/page-header';
import { useChartLoading, CHART_TOOLTIP_STYLE, AXIS_TICK_STYLE, GRID_STROKE, formatK } from '@/components/charts/chart-helpers';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  FileBarChart, Save, Play, Database, Handshake, Building2, Contact,
  UserPlus, Activity, DollarSign, ChevronRight, ChevronLeft, Check,
  Filter, Table2, BarChart3, PieChart as PieIcon, LineChart as LineIcon,
  Calendar, Clock, Sparkles, X, Plus,
} from 'lucide-react';

const DATA_SOURCES = [
  { id: 'deals', name: 'Deals', description: 'Pipeline opportunities, values, stages', icon: Handshake, color: 'var(--accent)', records: '16 records' },
  { id: 'accounts', name: 'Accounts', description: 'Customer accounts, ARR, tier', icon: Building2, color: 'var(--chart-1)', records: '12 records' },
  { id: 'contacts', name: 'Contacts', description: 'Contacts, roles, engagement', icon: Contact, color: 'var(--chart-3)', records: '10 records' },
  { id: 'leads', name: 'Leads', description: 'Lead sources, scores, status', icon: UserPlus, color: 'var(--chart-4)', records: '10 records' },
  { id: 'activities', name: 'Activities', description: 'Calls, meetings, emails, tasks', icon: Activity, color: 'var(--chart-5)', records: '8 records' },
  { id: 'revenue', name: 'Revenue', description: 'Closed-won bookings, trends', icon: DollarSign, color: 'var(--warning)', records: '12 months' },
];

const FIELDS_BY_SOURCE: Record<string, { id: string; label: string; type: string }[]> = {
  deals: [
    { id: 'name', label: 'Deal Name', type: 'text' },
    { id: 'account', label: 'Account', type: 'text' },
    { id: 'value', label: 'Deal Value', type: 'currency' },
    { id: 'stage', label: 'Stage', type: 'enum' },
    { id: 'probability', label: 'Probability', type: 'percent' },
    { id: 'closeDate', label: 'Close Date', type: 'date' },
    { id: 'owner', label: 'Owner', type: 'text' },
    { id: 'source', label: 'Source', type: 'enum' },
    { id: 'type', label: 'Deal Type', type: 'enum' },
    { id: 'riskScore', label: 'Risk Score', type: 'number' },
  ],
  accounts: [
    { id: 'name', label: 'Account Name', type: 'text' },
    { id: 'industry', label: 'Industry', type: 'enum' },
    { id: 'tier', label: 'Tier', type: 'enum' },
    { id: 'arr', label: 'ARR', type: 'currency' },
    { id: 'healthScore', label: 'Health Score', type: 'number' },
    { id: 'churnRisk', label: 'Churn Risk', type: 'percent' },
    { id: 'renewalDate', label: 'Renewal Date', type: 'date' },
    { id: 'owner', label: 'Owner', type: 'text' },
  ],
  contacts: [
    { id: 'name', label: 'Contact Name', type: 'text' },
    { id: 'title', label: 'Title', type: 'text' },
    { id: 'account', label: 'Account', type: 'text' },
    { id: 'engagement', label: 'Engagement', type: 'number' },
    { id: 'status', label: 'Role Status', type: 'enum' },
    { id: 'lastContact', label: 'Last Contact', type: 'date' },
  ],
  leads: [
    { id: 'name', label: 'Lead Name', type: 'text' },
    { id: 'company', label: 'Company', type: 'text' },
    { id: 'source', label: 'Source', type: 'enum' },
    { id: 'score', label: 'Lead Score', type: 'number' },
    { id: 'status', label: 'Status', type: 'enum' },
    { id: 'intent', label: 'Intent', type: 'enum' },
    { id: 'estimatedValue', label: 'Est. Value', type: 'currency' },
  ],
  activities: [
    { id: 'title', label: 'Activity Title', type: 'text' },
    { id: 'type', label: 'Type', type: 'enum' },
    { id: 'owner', label: 'Owner', type: 'text' },
    { id: 'duration', label: 'Duration', type: 'number' },
    { id: 'outcome', label: 'Outcome', type: 'enum' },
    { id: 'timestamp', label: 'Timestamp', type: 'date' },
  ],
  revenue: [
    { id: 'month', label: 'Month', type: 'date' },
    { id: 'revenue', label: 'Revenue', type: 'currency' },
    { id: 'target', label: 'Target', type: 'currency' },
    { id: 'pipeline', label: 'Pipeline', type: 'currency' },
  ],
};

const FILTER_OPTIONS = [
  'Stage = Negotiation', 'Value > $50k', 'Owner = Sarah Chen', 'Close Date this quarter',
  'Source = Outbound', 'Type = New Business', 'Risk Score < 30', 'Account Tier = Enterprise',
];

const CHART_TYPES = [
  { id: 'table', label: 'Table', icon: Table2 },
  { id: 'bar', label: 'Bar', icon: BarChart3 },
  { id: 'pie', label: 'Pie', icon: PieIcon },
  { id: 'line', label: 'Line', icon: LineIcon },
];

const SCHEDULE_OPTIONS = [
  { id: 'once', label: 'Run once', description: 'Generate immediately', icon: Play },
  { id: 'daily', label: 'Daily', description: 'Every day at 9:00 AM', icon: Clock },
  { id: 'weekly', label: 'Weekly', description: 'Every Monday at 9:00 AM', icon: Calendar },
  { id: 'monthly', label: 'Monthly', description: '1st of each month', icon: Calendar },
];

// Sample preview data (synthesized)
const previewBars = [
  { label: 'Negotiation', value: 245000, color: 'var(--accent)' },
  { label: 'Discovery', value: 203000, color: 'var(--chart-3)' },
  { label: 'Proposal', value: 178000, color: 'var(--chart-5)' },
  { label: 'Qualified', value: 38000, color: 'var(--chart-2)' },
  { label: 'Lead', value: 28000, color: 'var(--chart-1)' },
];

const previewRows = [
  { name: 'Enterprise Platform — Annual', account: 'Acme Corporation', value: 125000, stage: 'Negotiation' },
  { name: 'Manufacturing Suite Q3', account: 'GlobalTech Industries', value: 245000, stage: 'Negotiation' },
  { name: 'Robotics Vision Stack', account: 'Vertex Robotics', value: 156000, stage: 'Negotiation' },
  { name: 'Patient Records Migration', account: 'Pulse Health Systems', value: 134000, stage: 'Negotiation' },
  { name: 'Cloud Expansion — Multi-Region', account: 'CloudFirst Inc', value: 178000, stage: 'Proposal' },
];

const STEPS = [
  { id: 1, label: 'Data source', description: 'Choose what to report on' },
  { id: 2, label: 'Fields', description: 'Select columns to include' },
  { id: 3, label: 'Filters & grouping', description: 'Refine and visualize' },
];

export default function ReportBuilderPage() {
  const chartLoaded = useChartLoading(300);
  const [reportName, setReportName] = React.useState('Q3 Negotiation Stage Report');
  const [step, setStep] = React.useState(1);
  const [source, setSource] = React.useState<string>('deals');
  const [selectedFields, setSelectedFields] = React.useState<Set<string>>(new Set(['name', 'account', 'value', 'stage', 'owner']));
  const [activeFilters, setActiveFilters] = React.useState<string[]>(['Stage = Negotiation']);
  const [groupBy, setGroupBy] = React.useState('stage');
  const [chartType, setChartType] = React.useState('bar');
  const [schedule, setSchedule] = React.useState('once');

  const fields = FIELDS_BY_SOURCE[source] || [];

  const toggleField = (id: string) => {
    setSelectedFields((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  };

  const totalValue = previewRows.reduce((s, r) => s + r.value, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Report Builder"
        description="Compose custom reports from any data source"
        icon={FileBarChart}
        actions={
          <>
            <Button variant="outline" size="sm" className="bg-card border-border">
              <Save className="w-3.5 h-3.5 mr-1.5" /> Save draft
            </Button>
            <Button size="sm">
              <Play className="w-3.5 h-3.5 mr-1.5" /> Run report
            </Button>
          </>
        }
      />

      {/* Report name input + wizard steps */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <FileBarChart className="w-4 h-4 text-muted-foreground shrink-0" />
            <Input
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              placeholder="Untitled report"
              className="bg-secondary border-border h-9 font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={source} onValueChange={(v) => { setSource(v); setSelectedFields(new Set()); }}>
              <SelectTrigger className="w-40 h-9 bg-secondary border-border">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                {DATA_SOURCES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground hidden md:inline">
              {selectedFields.size} fields · {activeFilters.length} filters
            </span>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => {
            const isActive = step === s.id;
            const isComplete = step > s.id;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setStep(s.id)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all',
                    isActive ? 'bg-accent/10 border border-accent/30' : 'hover:bg-secondary'
                  )}
                >
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                      isComplete ? 'bg-accent text-accent-foreground' :
                      isActive ? 'bg-accent text-accent-foreground' :
                      'bg-secondary text-muted-foreground'
                    )}
                  >
                    {isComplete ? <Check className="w-3.5 h-3.5" /> : s.id}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className={cn('text-xs font-semibold', isActive || isComplete ? 'text-foreground' : 'text-muted-foreground')}>
                      {s.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{s.description}</p>
                  </div>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px bg-border relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-accent transition-transform duration-500 origin-left"
                      style={{ transform: step > s.id ? 'scaleX(1)' : 'scaleX(0)' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main builder layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: step content */}
        <div className="lg:col-span-3 space-y-4">
          {step === 1 && (
            <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Choose data source</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DATA_SOURCES.map((s, i) => {
                  const isSelected = source === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setSource(s.id); setSelectedFields(new Set()); }}
                      className={cn(
                        'group relative text-left p-4 rounded-lg border transition-all duration-300 animate-in fade-in slide-in-from-bottom-2',
                        isSelected ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40 hover:bg-secondary/40'
                      )}
                      style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                    >
                      <div className="flex items-start justify-between">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `color-mix(in oklch, ${s.color} 12%, transparent)` }}
                        >
                          <s.icon className="w-4 h-4" style={{ color: s.color }} />
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                            <Check className="w-3 h-3 text-accent-foreground" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-foreground mt-3">{s.name}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{s.description}</p>
                      <p className="text-[10px] text-muted-foreground/70 mt-2">{s.records}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Select fields to include</h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setSelectedFields(new Set(fields.map((f) => f.id)))}
                    className="text-accent hover:underline"
                  >
                    Select all
                  </button>
                  <span className="text-muted-foreground">·</span>
                  <button
                    onClick={() => setSelectedFields(new Set())}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {fields.map((f, i) => {
                  const checked = selectedFields.has(f.id);
                  return (
                    <label
                      key={f.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all animate-in fade-in slide-in-from-bottom-1',
                        checked ? 'border-accent/40 bg-accent/5' : 'border-border hover:bg-secondary/40'
                      )}
                      style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggleField(f.id)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{f.label}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                        {f.type}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-card border border-border rounded-xl p-5 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Active filters</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {FILTER_OPTIONS.map((f) => {
                    const active = activeFilters.includes(f);
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFilter(f)}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all',
                          active
                            ? 'border-accent/40 bg-accent/10 text-accent'
                            : 'border-border text-muted-foreground hover:text-foreground hover:border-accent/30'
                        )}
                      >
                        {active ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        {f}
                      </button>
                    );
                  })}
                </div>
                {activeFilters.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeFilters.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/15 text-accent text-[11px] font-medium"
                      >
                        {f}
                        <button onClick={() => toggleFilter(f)} className="hover:text-accent-foreground">
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Group by
                  </label>
                  <Select value={groupBy} onValueChange={setGroupBy}>
                    <SelectTrigger className="w-full bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((f) => (
                        <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Sort by
                  </label>
                  <Select defaultValue="value">
                    <SelectTrigger className="w-full bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.slice(0, 4).map((f) => (
                        <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Visualization type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {CHART_TYPES.map((c) => {
                    const isActive = chartType === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setChartType(c.id)}
                        className={cn(
                          'flex flex-col items-center gap-1.5 py-3 rounded-lg border transition-all',
                          isActive ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                        )}
                      >
                        <c.icon className="w-4 h-4" />
                        <span className="text-[11px] font-medium">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="bg-card border-border"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Previous
            </Button>
            <span className="text-xs text-muted-foreground">Step {step} of 3</span>
            <Button
              size="sm"
              disabled={step === 3}
              onClick={() => setStep((s) => Math.min(3, s + 1))}
            >
              Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          {/* Schedule section */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Schedule</h3>
              <span className="text-[11px] text-muted-foreground ml-auto">When should this report run?</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SCHEDULE_OPTIONS.map((opt) => {
                const isActive = schedule === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSchedule(opt.id)}
                    className={cn(
                      'flex flex-col items-start gap-2 p-3 rounded-lg border text-left transition-all',
                      isActive ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/30 hover:bg-secondary/40'
                    )}
                  >
                    <opt.icon className={cn('w-4 h-4', isActive ? 'text-accent' : 'text-muted-foreground')} />
                    <div>
                      <p className="text-xs font-semibold text-foreground">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Live preview</h3>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                {chartType}
              </span>
            </div>

            <p className="text-xs text-muted-foreground mb-3 truncate">{reportName}</p>

            {chartType === 'bar' && (
              <div className={cn('h-[220px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={previewBars} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} horizontal={false} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000}k`} />
                    <YAxis type="category" dataKey="label" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} width={80} />
                    <Tooltip
                      contentStyle={CHART_TOOLTIP_STYLE}
                      formatter={(v) => [formatK(Number(v)), 'Value']}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                      {previewBars.map((b) => (
                        <Cell key={b.label} fill={b.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {chartType === 'table' && (
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Deal</th>
                      <th className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Stage</th>
                      <th className="text-right text-[10px] uppercase tracking-wider text-muted-foreground font-semibold py-2 px-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((r) => (
                      <tr key={r.name} className="border-b border-border last:border-0">
                        <td className="py-2 px-2">
                          <p className="font-medium text-foreground truncate max-w-[140px]">{r.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{r.account}</p>
                        </td>
                        <td className="py-2 px-2">
                          <span className="text-[10px] text-accent font-medium">{r.stage}</span>
                        </td>
                        <td className="py-2 px-2 text-right tabular-nums font-semibold text-foreground">
                          ${r.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {chartType === 'pie' && (
              <div className="h-[220px] flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(var(--accent) 0% 35%, var(--chart-3) 35% 60%, var(--chart-5) 60% 80%, var(--chart-2) 80% 95%, var(--chart-1) 95% 100%)' }} />
                  <div className="absolute inset-6 rounded-full bg-card flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase text-muted-foreground">Total</span>
                    <span className="text-sm font-bold text-foreground tabular-nums">${(totalValue / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            )}

            {chartType === 'line' && (
              <div className={cn('h-[220px] transition-opacity duration-700', chartLoaded ? 'opacity-100' : 'opacity-0')}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={previewBars} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} vertical={false} />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} />
                    <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v) => [formatK(Number(v)), 'Value']} />
                    <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rows</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{previewRows.length}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total value</p>
                <p className="text-sm font-bold text-foreground tabular-nums">${(totalValue / 1000).toFixed(0)}k</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Filters</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{activeFilters.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
