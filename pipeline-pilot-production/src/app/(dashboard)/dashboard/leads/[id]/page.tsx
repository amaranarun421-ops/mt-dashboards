'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { ErrorState } from '@/components/common/states';
import { leads, activities, type Lead } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft, Phone, Mail, Calendar, CheckCircle2, Clock, Sparkles, Lightbulb,
  Target, TrendingUp, Activity as ActivityIcon, RefreshCw, Pencil, Plus,
  Flame, ChevronRight, ExternalLink, Users, Building2, Zap, ArrowRight,
} from 'lucide-react';

const STATUS_COLOR: Record<Lead['status'], string> = {
  'New': 'var(--chart-1)',
  'Working': 'var(--chart-3)',
  'Nurturing': 'var(--chart-5)',
  'Qualified': 'var(--success)',
  'Disqualified': 'var(--destructive)',
};

function scoreColor(score: number): string {
  if (score >= 75) return 'var(--success)';
  if (score >= 50) return 'var(--warning)';
  return 'var(--muted-foreground)';
}

function leadInitials(name: string): string {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

const ACTIVITY_ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  call: { icon: Phone, color: 'var(--chart-1)' },
  meeting: { icon: Calendar, color: 'var(--chart-3)' },
  email: { icon: Mail, color: 'var(--chart-5)' },
  task: { icon: CheckCircle2, color: 'var(--warning)' },
  note: { icon: Pencil, color: 'var(--chart-4)' },
  deal_update: { icon: RefreshCw, color: 'var(--accent)' },
};

const initialNotes = [
  { id: 'n1', author: 'Sarah Chen', initials: 'SC', color: 'var(--accent)', text: 'Strong fit for enterprise tier — they mentioned budget approval and a Q3 deployment timeline.', time: '2h ago' },
  { id: 'n2', author: 'David Okafor', initials: 'DO', color: 'var(--chart-1)', text: 'Initial outreach call went well. Champion is the VP of Ops — they’re evaluating 3 vendors.', time: '4h ago' },
];

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const lead = leads.find((l) => l.id === (params?.id as string));

  const [notes, setNotes] = React.useState(initialNotes);
  const [noteInput, setNoteInput] = React.useState('');
  const [steps, setSteps] = React.useState([
    { id: 's1', text: 'Schedule discovery call with champion', done: true, due: 'Completed' },
    { id: 's2', text: 'Send follow-up email with case studies', done: false, due: 'Today · 5:00 PM' },
    { id: 's3', text: 'Qualify budget and timeline', done: false, due: 'Tomorrow' },
    { id: 's4', text: 'Introduce Solutions Engineer', done: false, due: 'Jul 5' },
    { id: 's5', text: 'Convert to opportunity', done: false, due: 'Jul 8' },
  ]);

  if (!lead) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push('/dashboard/leads')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to leads
        </button>
        <ErrorState
          title="Lead not found"
          description={`We couldn't find a lead with ID "${params?.id}". It may have been deleted or the link is incorrect.`}
          onRetry={() => router.push('/dashboard/leads')}
        />
      </div>
    );
  }

  const statusColor = STATUS_COLOR[lead.status];
  const sColor = scoreColor(lead.score);

  // Synthesize lead score breakdown
  const scoreBreakdown = [
    { component: 'Engagement', value: Math.min(100, lead.score + 5), icon: ActivityIcon, color: 'var(--chart-1)', description: 'Email opens, clicks, and replies' },
    { component: 'Firmographic Fit', value: Math.min(100, lead.score - 8), icon: Building2, color: 'var(--chart-3)', description: 'Industry, company size, revenue' },
    { component: 'Intent', value: lead.intent === 'High' ? 90 : lead.intent === 'Medium' ? 60 : 30, icon: Flame, color: 'var(--destructive)', description: 'Buying signals and content engagement' },
    { component: 'Behavioral', value: Math.min(100, lead.score - 12), icon: TrendingUp, color: 'var(--accent)', description: 'Website visits, demo requests, downloads' },
  ];

  // Conversion path suggestion
  const conversionPath = [
    { step: 'Lead', status: 'completed', color: 'var(--success)' },
    { step: 'Qualified', status: lead.status === 'Qualified' ? 'current' : 'pending', color: 'var(--accent)' },
    { step: 'Opportunity', status: 'pending', color: 'var(--chart-3)' },
    { step: 'Discovery', status: 'pending', color: 'var(--chart-5)' },
    { step: 'Won', status: 'pending', color: 'var(--warning)' },
  ];

  // Synthesize activities for this lead
  const leadActivities = activities.slice(0, 4).map((a, i) => ({
    ...a,
    title: ['Initial outreach email sent', 'Discovery call scheduled', 'Pricing page viewed 3x', 'Case study downloaded'][i] || a.title,
    relatedTo: lead.company,
  }));

  // Similar leads — pick others with similar intent/score
  const similarLeads = leads
    .filter((l) => l.id !== lead.id && Math.abs(l.score - lead.score) < 20)
    .slice(0, 3);

  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes([
      { id: `n${Date.now()}`, author: 'You', initials: 'YO', color: 'var(--accent)', text: noteInput.trim(), time: 'Just now' },
      ...notes,
    ]);
    setNoteInput('');
  };

  const toggleStep = (id: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  const completedSteps = steps.filter((s) => s.done).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lead Details"
        description="Comprehensive view of a single lead"
        actions={
          <Button variant="outline" size="sm" asChild className="bg-card border-border">
            <Link href="/dashboard/leads">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
            </Link>
          </Button>
        }
      />

      {/* Hero header */}
      <div
        className="relative overflow-hidden rounded-xl border p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{
          borderColor: `color-mix(in oklch, ${statusColor} 30%, var(--border))`,
          background: `linear-gradient(135deg, color-mix(in oklch, ${statusColor} 8%, var(--card)) 0%, var(--card) 60%)`,
        }}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg"
              style={{ background: statusColor }}
            >
              {leadInitials(lead.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-mono text-muted-foreground">{lead.id}</span>
                <StageBadge stage={lead.status} color={statusColor} />
                <StatusBadge status={lead.intent === 'High' ? 'high' : lead.intent === 'Medium' ? 'medium' : 'low'} label={`${lead.intent} intent`} />
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{lead.name}</h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {lead.company}</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-card/60 border-border">
                <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Zap className="w-3.5 h-3.5 mr-1.5" /> Convert
              </Button>
            </div>
            {/* Score badge */}
            <div className="flex items-center gap-3 bg-card/60 backdrop-blur border border-border rounded-lg px-3 py-2">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lead Score</p>
                <p className="text-xl font-bold tabular-nums" style={{ color: sColor }}>{lead.score}</p>
              </div>
              <div className="w-10 h-10 relative shrink-0">
                <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--secondary)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="14" fill="none" stroke={sColor} strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${(lead.score / 100) * 88} 88`}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Owner strip */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mt-4 border-t border-border">
          <div className="flex items-center gap-2.5">
            <AvatarBadge initials={leadInitials(lead.owner)} size="md" color={statusColor} />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Owner</p>
              <p className="text-sm font-semibold text-foreground truncate">{lead.owner}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Est. Value</p>
              <p className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(lead.estimatedValue, { compact: true })}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Created</p>
              <p className="text-sm font-semibold text-foreground">
                {new Date(lead.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Activity</p>
              <p className="text-sm font-semibold text-foreground">{lead.lastActivity}</p>
            </div>
          </div>
        </div>

        {/* Decorative orb */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: statusColor }}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead info card */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Lead Information</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground truncate">{lead.email}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{lead.phone}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Source</p>
                <p className="text-sm font-medium text-foreground">{lead.source}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Created</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(lead.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Activity</p>
                <p className="text-sm font-medium text-foreground">{lead.lastActivity}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Est. Value</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(lead.estimatedValue)}</p>
              </div>
            </div>
          </section>

          {/* Activity timeline */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ActivityIcon className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Activity Timeline</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-accent hover:text-accent">
                View all <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-4">
                {leadActivities.map((act, i) => {
                  const cfg = ACTIVITY_ICON_MAP[act.type] || ACTIVITY_ICON_MAP.note;
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={act.id}
                      className="relative pl-10 animate-in fade-in slide-in-from-left-2 duration-300"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                    >
                      <div
                        className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-card shadow-sm"
                        style={{ background: `color-mix(in oklch, ${cfg.color} 15%, var(--card))` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">{act.title}</p>
                          <span className="text-[10px] text-muted-foreground shrink-0">{act.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{act.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Notes section */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Notes</h3>
                <span className="text-[11px] text-muted-foreground">({notes.length})</span>
              </div>
            </div>
            <div className="mb-4 flex gap-2">
              <Textarea
                placeholder="Add a note about this lead..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="bg-secondary border-border min-h-[60px] resize-none text-sm"
                rows={2}
              />
              <Button
                size="sm"
                onClick={addNote}
                disabled={!noteInput.trim()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground self-start"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="space-y-3">
              {notes.map((note, i) => (
                <div
                  key={note.id}
                  className="flex gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <AvatarBadge initials={note.initials} size="sm" color={note.color} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-foreground">{note.author}</span>
                      <span className="text-[10px] text-muted-foreground">{note.time}</span>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">{note.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-6">
          {/* Lead score breakdown */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Score Breakdown</h3>
            </div>
            <div className="space-y-4">
              {scoreBreakdown.map((b, i) => (
                <div key={b.component} className="animate-in fade-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in oklch, ${b.color} 12%, transparent)` }}>
                        <b.icon className="w-3.5 h-3.5" style={{ color: b.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{b.component}</p>
                        <p className="text-[10px] text-muted-foreground">{b.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-foreground tabular-nums">{b.value}</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${b.value}%`, background: b.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Overall Score</span>
              <span className="text-lg font-bold tabular-nums" style={{ color: sColor }}>{lead.score}/100</span>
            </div>
          </section>

          {/* Conversion path */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Conversion Path</h3>
            </div>
            <div className="space-y-3">
              {conversionPath.map((s, i) => (
                <div key={s.step} className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0 transition-all',
                      s.status === 'completed' && 'text-white',
                      s.status === 'current' && 'ring-4',
                      s.status === 'pending' && 'bg-card text-muted-foreground border-border'
                    )}
                    style={{
                      background: s.status === 'completed' || s.status === 'current' ? s.color : undefined,
                      borderColor: s.status === 'completed' || s.status === 'current' ? s.color : undefined,
                      // @ts-expect-error css var
                      '--tw-ring-color': s.status === 'current' ? `color-mix(in oklch, ${s.color} 25%, transparent)` : undefined,
                    }}
                  >
                    {s.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-xs font-medium', s.status === 'pending' ? 'text-muted-foreground' : 'text-foreground')}>{s.step}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{s.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button size="sm" className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Zap className="w-3.5 h-3.5 mr-1.5" /> Convert to opportunity
            </Button>
          </section>

          {/* Recommended next actions */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Next Actions</h3>
              </div>
              <span className="text-[11px] text-muted-foreground">{completedSteps}/{steps.length} done</span>
            </div>
            <div className="space-y-2">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => toggleStep(s.id)}
                  className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary/50 transition-colors text-left animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <div className={cn(
                    'w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                    s.done ? 'bg-accent border-accent' : 'border-border'
                  )}>
                    {s.done && <CheckCircle2 className="w-3 h-3 text-accent-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-xs', s.done ? 'text-muted-foreground line-through' : 'text-foreground font-medium')}>{s.text}</p>
                    <p className="text-[10px] text-muted-foreground">{s.due}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Similar leads */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Similar Leads</h3>
            </div>
            <div className="space-y-2">
              {similarLeads.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">No similar leads found.</p>
              ) : (
                similarLeads.map((l, i) => (
                  <Link
                    key={l.id}
                    href={`/dashboard/leads/${l.id}`}
                    className="group flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <AvatarBadge initials={leadInitials(l.name)} size="sm" color={STATUS_COLOR[l.status]} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{l.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{l.company}</p>
                    </div>
                    <span
                      className="text-xs font-bold tabular-nums px-1.5 py-0.5 rounded"
                      style={{ color: scoreColor(l.score), background: `color-mix(in oklch, ${scoreColor(l.score)} 12%, transparent)` }}
                    >
                      {l.score}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
