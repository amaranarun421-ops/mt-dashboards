'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { ErrorState } from '@/components/common/states';
import { deals, contacts, activities, STAGES, STAGE_COLORS, type Deal, type Stage } from '@/lib/data';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, Pencil, ChevronRight, Plus, Phone, Mail, Calendar, FileText, StickyNote,
  RefreshCw, CheckCircle2, Clock, AlertTriangle, Sparkles, TrendingUp, Lightbulb,
  Users, CheckSquare, File, Download, MoreHorizontal, ExternalLink, Activity as ActivityIcon,
  Building2, Target, Zap, ArrowRight, MessageSquare, Contact,
} from 'lucide-react';

// Derive stage history from deal age + daysInStage
function buildStageHistory(deal: Deal) {
  const today = new Date('2025-07-02');
  const created = new Date(deal.created);
  const elapsed = Math.max(1, Math.round((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)));
  // Walk through stages up to current
  const stageOrder: Stage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won'];
  const idx = stageOrder.indexOf(deal.stage);
  const stagesToShow = stageOrder.slice(0, idx + 1);
  const perStage = Math.max(3, Math.floor(elapsed / Math.max(1, stagesToShow.length)));
  return stagesToShow.map((s, i) => {
    const date = new Date(created);
    date.setDate(date.getDate() + perStage * i);
    return {
      stage: s,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      days: i === stagesToShow.length - 1 ? deal.daysInStage : perStage,
      current: i === stagesToShow.length - 1,
    };
  });
}

// Derive related contacts from the account
function getRelatedContacts(deal: Deal) {
  return contacts.filter((c) => c.accountId === deal.accountId).slice(0, 4);
}

// Static-ish notes (could be derived from a per-deal notes array; here we synthesize)
const initialNotes = [
  { id: 'n1', author: 'Sarah Chen', initials: 'SC', color: 'var(--accent)', text: 'Champion confirmed they have budget approved for Q3. Need to align on implementation timeline with their IT team.', time: '2h ago' },
  { id: 'n2', author: 'Mike Johnson', initials: 'MJ', color: 'var(--chart-1)', text: 'Legal team requested additional security review docs. Sent over SOC2 report and architecture diagram.', time: '1d ago' },
  { id: 'n3', author: 'Sarah Chen', initials: 'SC', color: 'var(--accent)', text: 'Initial discovery call went well. Key pain points: legacy system integration, reporting automation, multi-region compliance.', time: '3d ago' },
];

const stageFiles = [
  { id: 'f1', name: 'Revised_MSA_v3.pdf', size: '2.4 MB', type: 'pdf', uploaded: '2h ago', by: 'SC' },
  { id: 'f2', name: 'Security_Review_Document.pdf', size: '1.8 MB', type: 'pdf', uploaded: '1d ago', by: 'MJ' },
  { id: 'f3', name: 'Implementation_Architecture.png', size: '480 KB', type: 'image', uploaded: '3d ago', by: 'SC' },
  { id: 'f4', name: 'Q3_Pricing_Proposal.xlsx', size: '120 KB', type: 'sheet', uploaded: '5d ago', by: 'SC' },
];

const nextStepsList = [
  { id: 's1', text: 'Send revised MSA to legal', done: false, due: 'Today · 5:00 PM', owner: 'SC' },
  { id: 's2', text: 'Schedule security review call', done: true, due: 'Completed', owner: 'MJ' },
  { id: 's3', text: 'Prepare ROI calculator for CFO', done: false, due: 'Tomorrow', owner: 'SC' },
  { id: 's4', text: 'Confirm implementation timeline', done: false, due: 'Jul 8', owner: 'SC' },
  { id: 's5', text: 'Send customer references', done: true, due: 'Completed', owner: 'SC' },
];

const aiInsights = {
  riskFactors: [
    { level: 'high', text: 'Champion engagement dropped 32% in last 14 days', icon: AlertTriangle },
    { level: 'medium', text: 'No executive sponsor identified beyond VP Engineering', icon: Users },
    { level: 'low', text: 'Close date slipping — original target was Jul 15', icon: Clock },
  ],
  recommendations: [
    'Schedule executive briefing with CFO within 5 business days',
    'Bring in Solutions Engineer for security architecture deep-dive',
    'Send 2–3 customer references in same industry vertical',
    'Offer multi-year discount to lock in commitment before quarter-end',
  ],
  similarDeals: [
    { id: 'D-2054', name: 'Acme Multi-Year Renewal', value: 320000, stage: 'Discovery', won: false },
    { id: 'D-2043', name: 'Manufacturing Suite Q3', value: 245000, stage: 'Negotiation', won: false },
    { id: 'D-2051', name: 'Patient Records Migration', value: 134000, stage: 'Negotiation', won: false },
  ],
};

function fileTypeIcon(type: string) {
  switch (type) {
    case 'pdf': return FileText;
    case 'image': return File;
    case 'sheet': return FileText;
    default: return File;
  }
}

function fileColor(type: string) {
  switch (type) {
    case 'pdf': return 'var(--destructive)';
    case 'image': return 'var(--chart-3)';
    case 'sheet': return 'var(--success)';
    default: return 'var(--muted-foreground)';
  }
}

export default function DealDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dealId = params?.id as string;
  const deal = deals.find((d) => d.id === dealId);

  const [notes, setNotes] = React.useState(initialNotes);
  const [noteInput, setNoteInput] = React.useState('');
  const [steps, setSteps] = React.useState(nextStepsList);

  if (!deal) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push('/dashboard/deals')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to deals
        </button>
        <ErrorState
          title="Deal not found"
          description={`We couldn't find a deal with ID "${dealId}". It may have been deleted or the link is incorrect.`}
          onRetry={() => router.push('/dashboard/deals')}
        />
      </div>
    );
  }

  const stageColor = STAGE_COLORS[deal.stage];
  const stageHistory = buildStageHistory(deal);
  const relatedContacts = getRelatedContacts(deal);
  const dealActivities = activities.slice(0, 5);
  const currentStageIdx = STAGES.indexOf(deal.stage);
  const stageProgress = Math.round((currentStageIdx / (STAGES.length - 1)) * 100);

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
        title="Deal Details"
        description="Comprehensive view of a single opportunity"
        actions={
          <Button variant="outline" size="sm" asChild className="bg-card border-border">
            <Link href="/dashboard/deals">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
            </Link>
          </Button>
        }
      />

      {/* Hero header */}
      <div
        className="relative overflow-hidden rounded-xl border p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={{
          borderColor: `color-mix(in oklch, ${stageColor} 30%, var(--border))`,
          background: `linear-gradient(135deg, color-mix(in oklch, ${stageColor} 8%, var(--card)) 0%, var(--card) 60%)`,
        }}
      >
        <div className="relative z-10 space-y-5">
          {/* Top row: title + actions */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-mono text-muted-foreground">{deal.id}</span>
                <StatusBadge
                  status={deal.stage === 'Closed Won' ? 'won' : deal.stage === 'Closed Lost' ? 'lost' : deal.riskScore > 40 ? 'high' : 'active'}
                  label={deal.stage === 'Closed Won' ? 'Won' : deal.stage === 'Closed Lost' ? 'Lost' : deal.riskScore > 40 ? 'At risk' : 'Active'}
                />
                <StageBadge stage={deal.stage} color={stageColor} />
                <span className="text-[11px] text-muted-foreground">{deal.type}</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{deal.name}</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                <Link href={`/dashboard/accounts`} className="text-sm text-accent hover:underline">{deal.account}</Link>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{deal.source} source</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" className="bg-card/60 border-border">
                <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="bg-card/60 border-border">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Move stage
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Log activity
              </Button>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Big metric + stage progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Deal Value</p>
              <p className="text-3xl font-bold text-foreground tabular-nums">{formatCurrency(deal.value)}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-muted-foreground">Weighted: <span className="font-semibold text-foreground tabular-nums">{formatCurrency(deal.weightedValue, { compact: true })}</span></span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">Risk score: <span className="font-semibold" style={{ color: deal.riskScore > 40 ? 'var(--destructive)' : deal.riskScore > 25 ? 'var(--warning)' : 'var(--success)' }}>{deal.riskScore}/100</span></span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Stage Progression</p>
                <span className="text-[11px] text-muted-foreground">{stageProgress}% through pipeline</span>
              </div>
              {/* Stage progress bar */}
              <div className="relative">
                <div className="flex items-center">
                  {STAGES.slice(0, 5).map((s, i) => {
                    const isActive = i <= currentStageIdx;
                    const isCurrent = i === currentStageIdx;
                    return (
                      <React.Fragment key={s}>
                        <div
                          className={cn(
                            'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0 transition-all',
                            isActive ? 'text-white' : 'bg-card text-muted-foreground border-border',
                            isCurrent && 'ring-4'
                          )}
                          style={{
                            background: isActive ? STAGE_COLORS[s] : undefined,
                            borderColor: isActive ? STAGE_COLORS[s] : undefined,
                            // @ts-expect-error css var
                            '--tw-ring-color': isCurrent ? `color-mix(in oklch, ${STAGE_COLORS[s]} 25%, transparent)` : undefined,
                          }}
                        >
                          {isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                        </div>
                        {i < 4 && (
                          <div className="flex-1 h-0.5 mx-1 rounded-full overflow-hidden bg-border">
                            <div
                              className="h-full transition-all duration-700"
                              style={{
                                width: i < currentStageIdx ? '100%' : '0%',
                                background: STAGE_COLORS[s],
                              }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-between mt-1.5">
                {STAGES.slice(0, 5).map((s) => (
                  <span key={s} className="text-[9px] uppercase tracking-wider text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom metadata strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2.5">
              <AvatarBadge initials={deal.ownerInitials} size="md" color={stageColor} />
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Owner</p>
                <p className="text-sm font-semibold text-foreground truncate">{deal.owner}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Close Date</p>
                <p className="text-sm font-semibold text-foreground truncate">
                  {new Date(deal.closeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Age</p>
                <p className="text-sm font-semibold text-foreground truncate">{deal.age} days · {deal.daysInStage}d in stage</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <ActivityIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Activity</p>
                <p className="text-sm font-semibold text-foreground truncate">{deal.lastActivity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient orb */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: stageColor }}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Deal Summary */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Deal Summary</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Value</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(deal.value, { compact: true })}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Probability</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{deal.probability}%</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Weighted</p>
                <p className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(deal.weightedValue, { compact: true })}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Type</p>
                <p className="text-sm font-bold text-foreground">{deal.type}</p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Next Step</p>
              <p className="text-sm text-foreground flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                {deal.nextStep}
              </p>
            </div>
          </section>

          {/* Activity Timeline */}
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
              {/* Vertical line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-4">
                {dealActivities.map((act, i) => {
                  const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
                    call: { icon: Phone, color: 'var(--chart-1)' },
                    meeting: { icon: Calendar, color: 'var(--chart-3)' },
                    email: { icon: Mail, color: 'var(--chart-5)' },
                    task: { icon: CheckSquare, color: 'var(--warning)' },
                    note: { icon: StickyNote, color: 'var(--chart-4)' },
                    deal_update: { icon: RefreshCw, color: 'var(--accent)' },
                  };
                  const cfg = iconMap[act.type] || iconMap.note;
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
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <AvatarBadge initials={act.ownerInitials} size="sm" color={cfg.color} />
                            {act.owner}
                          </span>
                          {act.duration && <span>· {act.duration}min</span>}
                          {act.outcome && <span>· {act.outcome}</span>}
                          <span>· {act.relatedTo}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Stage History */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 mb-4">
              <RefreshCw className="w-4 h-4 text-accent" />
              <h3 className="text-base font-semibold text-foreground">Stage History</h3>
            </div>
            <div className="space-y-3">
              {stageHistory.map((h, i) => {
                const color = STAGE_COLORS[h.stage as Stage];
                return (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border transition-colors animate-in fade-in slide-in-from-left-2 duration-300',
                      h.current ? 'border-accent/40 bg-accent/5' : 'border-border bg-secondary/30'
                    )}
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{h.stage}</span>
                        {h.current && <StatusBadge status="active" label="Current" size="sm" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground">Entered on {h.date} · {h.days} day{h.days === 1 ? '' : 's'} in stage</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-foreground tabular-nums">{h.days}d</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Notes section */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Notes</h3>
                <span className="text-[11px] text-muted-foreground">({notes.length})</span>
              </div>
            </div>
            {/* Add note input */}
            <div className="mb-4 flex gap-2">
              <Textarea
                placeholder="Add a note about this deal..."
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

          {/* Files section */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Files</h3>
                <span className="text-[11px] text-muted-foreground">({stageFiles.length})</span>
              </div>
              <Button variant="outline" size="sm" className="bg-card border-border">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Upload
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {stageFiles.map((file, i) => {
                const Icon = fileTypeIcon(file.type);
                const color = fileColor(file.type);
                return (
                  <div
                    key={file.id}
                    className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 hover:border-accent/30 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `color-mix(in oklch, ${color} 12%, transparent)` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">{file.size} · {file.uploaded} by {file.by}</p>
                    </div>
                    <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card opacity-0 group-hover:opacity-100 transition-all">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-6">
          {/* AI Insights panel */}
          <section
            className="relative overflow-hidden rounded-xl border border-accent/30 p-5 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{
              background: 'linear-gradient(160deg, color-mix(in oklch, var(--accent) 8%, var(--card)) 0%, color-mix(in oklch, var(--chart-3) 5%, var(--card)) 100%)',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground">AI Insights</h3>
              </div>

              {/* Risk factors */}
              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Risk Factors</p>
                <div className="space-y-2">
                  {aiInsights.riskFactors.map((risk, i) => {
                    const colorMap = { high: 'var(--destructive)', medium: 'var(--warning)', low: 'var(--success)' };
                    const bgMap = { high: 'bg-destructive/10', medium: 'bg-warning/10', low: 'bg-success/10' };
                    return (
                      <div
                        key={i}
                        className={cn('flex items-start gap-2 p-2 rounded-lg border border-border', bgMap[risk.level as 'high' | 'medium' | 'low'])}
                      >
                        <risk.icon className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: colorMap[risk.level as 'high' | 'medium' | 'low'] }} />
                        <p className="text-xs text-foreground leading-relaxed">{risk.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" /> Recommendations
                </p>
                <div className="space-y-1.5">
                  {aiInsights.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="w-4 h-4 rounded-full bg-accent/15 text-accent text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar deals */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Similar Deals
                </p>
                <div className="space-y-1.5">
                  {aiInsights.similarDeals.map((d) => (
                    <Link
                      key={d.id}
                      href={`/dashboard/deals/${d.id}`}
                      className="flex items-center justify-between gap-2 p-2 rounded-lg bg-card/60 border border-border hover:border-accent/40 transition-all group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">{d.name}</p>
                        <p className="text-[10px] text-muted-foreground">{d.id} · {d.stage}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-foreground tabular-nums">{formatCurrency(d.value, { compact: true })}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Button size="sm" className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Zap className="w-3.5 h-3.5 mr-1.5" /> Run full analysis
              </Button>
            </div>

            {/* Decorative glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
          </section>

          {/* Stakeholders */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '60ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Stakeholders</h3>
                <span className="text-[11px] text-muted-foreground">({relatedContacts.length})</span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-accent hover:text-accent">
                <Plus className="w-3 h-3 mr-1" /> Add
              </Button>
            </div>
            {relatedContacts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No stakeholders yet</p>
            ) : (
              <div className="space-y-2">
                {relatedContacts.map((c, i) => {
                  const roleColors: Record<string, string> = {
                    'Decision Maker': 'var(--destructive)',
                    'Champion': 'var(--accent)',
                    'Influencer': 'var(--chart-1)',
                    'Gatekeeper': 'var(--warning)',
                    'User': 'var(--muted-foreground)',
                  };
                  return (
                    <div
                      key={c.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors animate-in fade-in slide-in-from-right-2 duration-300"
                      style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                    >
                      <AvatarBadge initials={c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)} size="md" color={roleColors[c.status] || 'var(--accent)'} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{c.title}</p>
                      </div>
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0"
                        style={{
                          background: `color-mix(in oklch, ${roleColors[c.status]} 12%, transparent)`,
                          color: roleColors[c.status],
                        }}
                      >
                        {c.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Next steps checklist */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Next Steps</h3>
              </div>
              <span className="text-[11px] text-muted-foreground">{completedSteps}/{steps.length} done</span>
            </div>
            <Progress value={(completedSteps / steps.length) * 100} className="h-1 mb-3" />
            <div className="space-y-1.5">
              {steps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary/40 transition-colors text-left animate-in fade-in slide-in-from-right-2 duration-300"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <div
                    className={cn(
                      'w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all',
                      step.done
                        ? 'bg-accent border-accent'
                        : 'border-border bg-secondary'
                    )}
                  >
                    {step.done && <CheckCircle2 className="w-3 h-3 text-accent-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      'text-xs font-medium leading-snug',
                      step.done ? 'text-muted-foreground line-through' : 'text-foreground'
                    )}>
                      {step.text}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      <span className={step.due === 'Completed' ? 'text-success' : ''}>{step.due}</span> · {step.owner}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Related contacts */}
          <section className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '180ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Contact className="w-4 h-4 text-accent" />
                <h3 className="text-base font-semibold text-foreground">Related Contacts</h3>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-xs text-accent hover:text-accent">
                <Link href="/dashboard/contacts">
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </Button>
            </div>
            <div className="space-y-2">
              {relatedContacts.map((c, i) => (
                <Link
                  key={c.id}
                  href="/dashboard/contacts"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group animate-in fade-in slide-in-from-right-2 duration-300"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <AvatarBadge initials={c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)} size="sm" color="var(--chart-3)" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate group-hover:text-accent transition-colors">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{c.email}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
