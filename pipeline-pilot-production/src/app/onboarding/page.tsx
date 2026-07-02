'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/layout/logo';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  PartyPopper,
  Check,
  Plus,
  X,
  Sparkles,
  Rocket,
  Users,
  Building2,
  TrendingUp,
  Cloud,
  Workflow,
  Database,
  Mail,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

type Step = 0 | 1 | 2 | 3 | 4; // 4 = success

const STEPS = [
  { id: 0, label: 'Welcome', icon: Sparkles },
  { id: 1, label: 'Workspace', icon: Building2 },
  { id: 2, label: 'Connect CRM', icon: Cloud },
  { id: 3, label: 'Invite team', icon: Users },
];

const TEAM_SIZES = ['1–5', '6–15', '16–50', '51–200', '200+'];
const INDUSTRIES = [
  { id: 'saas', label: 'SaaS / Software' },
  { id: 'fintech', label: 'Financial services' },
  { id: 'health', label: 'Healthcare' },
  { id: 'ecom', label: 'E-commerce' },
  { id: 'mfg', label: 'Manufacturing' },
  { id: 'prosvc', label: 'Professional services' },
  { id: 'media', label: 'Media & entertainment' },
  { id: 'other', label: 'Other' },
];

const CRM_OPTIONS = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    desc: 'Sync accounts, contacts, opportunities and activities bi-directionally.',
    color: 'var(--chart-1)',
    logo: Cloud,
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    desc: 'Pull deals, contacts, companies and tickets into Pipeline Pilot.',
    color: 'var(--chart-4)',
    logo: Workflow,
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    desc: 'Import your pipeline stages and active deals in one click.',
    color: 'var(--chart-2)',
    logo: Database,
  },
];

const TIPS = [
  {
    icon: TrendingUp,
    title: 'Import your pipeline first',
    desc: 'A clean pipeline import unlocks forecasting, deal velocity and churn signals on day one.',
  },
  {
    icon: Users,
    title: 'Add 2–3 teammates early',
    desc: 'Inviting a few reps in onboarding helps the activity feed light up immediately.',
  },
  {
    icon: Lightbulb,
    title: 'Connect a CRM',
    desc: 'A live CRM sync keeps everything in sync — no manual data entry required.',
  },
];

const CONFETTI_COLORS = [
  'var(--accent)',
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--warning)',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('Pipeline Pilot HQ');
  const [teamSize, setTeamSize] = useState('6–15');
  const [industry, setIndustry] = useState('saas');
  const [connected, setConnected] = useState<string[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [invites, setInvites] = useState<string[]>([]);

  const goNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((s) => (s + 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const goBack = () => setStep((s) => (Math.max(0, s - 1)) as Step);

  const finish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 900);
  };

  const addInvite = () => {
    const email = inviteEmail.trim();
    if (!email || !email.includes('@')) return;
    if (invites.includes(email)) return;
    setInvites((list) => [...list, email]);
    setInviteEmail('');
    toast.success(`Invitation sent to ${email}`);
  };

  const removeInvite = (email: string) => {
    setInvites((list) => list.filter((e) => e !== email));
  };

  const toggleCRM = (id: string) => {
    setConnected((list) => (list.includes(id) ? list.filter((c) => c !== id) : [...list, id]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-background to-background flex flex-col">
      {/* Top bar */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-7 h-7" />
            <span className="font-semibold text-sm tracking-tight">Pipeline Pilot</span>
          </div>
          {step < 4 && (
            <button
              onClick={() => router.push('/dashboard')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip onboarding →
            </button>
          )}
        </div>
        {/* Progress bar — hidden on success step */}
        {step < 4 && (
          <div className="max-w-6xl mx-auto px-6 pb-3">
            <div className="flex items-center gap-2">
              {STEPS.map((s) => {
                const isComplete = step > s.id;
                const isCurrent = step === s.id;
                return (
                  <div key={s.id} className="flex items-center gap-2 flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                          isComplete && 'bg-accent text-accent-foreground',
                          isCurrent && 'bg-accent text-accent-foreground ring-4 ring-accent/20',
                          !isComplete && !isCurrent && 'bg-muted text-muted-foreground',
                        )}
                      >
                        {isComplete ? <Check className="w-3.5 h-3.5" /> : s.id + 1}
                      </div>
                      <span
                        className={cn(
                          'text-xs hidden sm:inline transition-colors',
                          isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground',
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                    {s.id < STEPS.length - 1 && (
                      <div className="h-px flex-1 bg-border relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-accent transition-transform duration-500 origin-left"
                          style={{
                            transform: step > s.id ? 'translateX(0)' : 'translateX(-100%)',
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Wizard card */}
          <div className="min-h-[460px]">
            {/* STEP 0 — Welcome */}
            {step === 0 && (
              <div className="relative rounded-2xl border border-border bg-card overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                {/* Confetti layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(28)].map((_, i) => {
                    const left = (i * 37) % 100;
                    const top = (i * 53) % 60;
                    const delay = (i % 10) * 0.15;
                    const size = 4 + (i % 4) * 2;
                    return (
                      <div
                        key={i}
                        className="absolute rounded-sm animate-in fade-in slide-in-from-top-8 duration-1000"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          width: size,
                          height: size,
                          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                          animationDelay: `${delay}s`,
                          transform: `rotate(${i * 33}deg)`,
                          opacity: 0.7,
                        }}
                      />
                    );
                  })}
                </div>

                <div className="relative p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <PartyPopper className="w-8 h-8 text-accent" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent font-medium">Account ready</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                    Welcome to Pipeline Pilot, Jordan!
                  </h1>
                  <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                    You&apos;re minutes away from a unified view of your pipeline, forecasts, deals and team performance. Let&apos;s set up your workspace together — most teams finish in under 5 minutes.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8 text-left">
                    {[
                      { icon: Building2, label: 'Set up workspace' },
                      { icon: Cloud, label: 'Connect your CRM' },
                      { icon: Users, label: 'Invite teammates' },
                    ].map((it) => (
                      <div key={it.label} className="rounded-lg border border-border/60 bg-background/50 p-3 flex items-center gap-2">
                        <it.icon className="w-4 h-4 text-accent shrink-0" />
                        <span className="text-xs font-medium">{it.label}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={goNext}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Get started <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 1 — Workspace setup */}
            {step === 1 && (
              <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Set up your workspace</h2>
                    <p className="text-sm text-muted-foreground">
                      This is where your team will live. You can change it later.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 mt-8">
                  <div className="space-y-2">
                    <Label htmlFor="ws-name">Workspace name</Label>
                    <Input
                      id="ws-name"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                      placeholder="Acme Sales"
                    />
                    <p className="text-xs text-muted-foreground">
                      Visible to everyone in your workspace.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Team size</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {TEAM_SIZES.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setTeamSize(size)}
                          className={cn(
                            'h-10 rounded-md border text-sm font-medium transition-all',
                            teamSize === size
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border hover:border-accent/40 hover:bg-accent/5',
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind.id}
                          type="button"
                          onClick={() => setIndustry(ind.id)}
                          className={cn(
                            'h-10 px-3 rounded-md border text-xs font-medium transition-all text-left truncate',
                            industry === ind.id
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border hover:border-accent/40 hover:bg-accent/5',
                          )}
                        >
                          {ind.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={goNext}
                    disabled={loading || !workspaceName.trim()}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                      <>Continue <ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2 — Connect CRM */}
            {step === 2 && (
              <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Cloud className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Connect your CRM</h2>
                    <p className="text-sm text-muted-foreground">
                      Sync deals, accounts and contacts. You can connect more later.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  {CRM_OPTIONS.map((crm) => {
                    const isConnected = connected.includes(crm.id);
                    return (
                      <div
                        key={crm.id}
                        className={cn(
                          'rounded-xl border p-4 flex items-center gap-4 transition-all',
                          isConnected ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/40',
                        )}
                      >
                        <div
                          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${crm.color}20`, color: crm.color }}
                        >
                          <crm.logo className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{crm.name}</p>
                          <p className="text-xs text-muted-foreground">{crm.desc}</p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant={isConnected ? 'outline' : 'default'}
                          className={isConnected ? '' : 'bg-accent text-accent-foreground hover:bg-accent/90'}
                          onClick={() => toggleCRM(crm.id)}
                        >
                          {isConnected ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Connected
                            </>
                          ) : (
                            'Connect'
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={goNext}>
                      Skip for now
                    </Button>
                    <Button
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={goNext}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                        <>Continue <ArrowRight className="w-4 h-4" /></>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 — Invite teammates */}
            {step === 3 && (
              <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Invite your teammates</h2>
                    <p className="text-sm text-muted-foreground">
                      Sales is a team sport. Bring your reps in to light up the activity feed.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="teammate@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addInvite();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={addInvite}
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <Plus className="w-4 h-4" /> Invite
                    </Button>
                  </div>

                  {invites.length > 0 && (
                    <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {invites.length} invitation{invites.length === 1 ? '' : 's'} ready to send
                      </p>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto">
                        {invites.map((email) => (
                          <div
                            key={email}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-background border border-border text-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
                          >
                            <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <span className="flex-1 truncate">{email}</span>
                            <button
                              type="button"
                              onClick={() => removeInvite(email)}
                              className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              aria-label={`Remove ${email}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {invites.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border p-6 text-center">
                      <Users className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Add emails above to send invitations. You can also skip and invite later.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={finish}>
                      Skip
                    </Button>
                    <Button
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={finish}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Rocket className="w-4 h-4" /> Finish setup
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 — Success */}
            {step === 4 && (
              <div className="relative rounded-2xl border border-border bg-card overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(36)].map((_, i) => {
                    const left = (i * 27) % 100;
                    const top = (i * 41) % 70;
                    const delay = (i % 12) * 0.1;
                    const size = 4 + (i % 5) * 2;
                    return (
                      <div
                        key={i}
                        className="absolute rounded-sm animate-in fade-in slide-in-from-top-8 duration-1000"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          width: size,
                          height: size,
                          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                          animationDelay: `${delay}s`,
                          transform: `rotate(${i * 41}deg)`,
                          opacity: 0.75,
                        }}
                      />
                    );
                  })}
                </div>

                <div className="relative p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                    You&apos;re all set, Jordan!
                  </h1>
                  <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                    Your workspace is configured, your CRM is syncing, and we&apos;ve sent{' '}
                    {invites.length > 0 ? (
                      <span className="text-foreground font-medium">
                        {invites.length} invitation{invites.length === 1 ? '' : 's'}
                      </span>
                    ) : (
                      'no invitations yet'
                    )}
                    . Time to dive into your dashboard.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8 text-left">
                    <div className="rounded-lg border border-border/60 bg-background/50 p-3">
                      <Check className="w-4 h-4 text-success mb-1.5" />
                      <p className="text-xs font-medium">Workspace ready</p>
                      <p className="text-[11px] text-muted-foreground">{workspaceName}</p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-background/50 p-3">
                      <Check className="w-4 h-4 text-success mb-1.5" />
                      <p className="text-xs font-medium">
                        {connected.length > 0 ? `${connected.length} CRM connected` : 'CRM skipped'}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {connected.length > 0
                          ? connected.map((c) => CRM_OPTIONS.find((o) => o.id === c)?.name).join(', ')
                          : 'Connect anytime'}
                      </p>
                    </div>
                    <div className="rounded-lg border border-border/60 bg-background/50 p-3">
                      <Check className="w-4 h-4 text-success mb-1.5" />
                      <p className="text-xs font-medium">
                        {invites.length > 0 ? `${invites.length} invites queued` : 'No invites sent'}
                      </p>
                      <p className="text-[11px] text-muted-foreground">Invite more later</p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => router.push('/dashboard')}
                  >
                    Go to dashboard <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Tips sidebar — hidden on mobile, hidden on success step */}
          {step < 4 && (
            <aside className="hidden lg:block">
              <div className="sticky top-32 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <p className="text-sm font-semibold">Tips for getting started</p>
                </div>
                <div className="space-y-4">
                  {TIPS.map((tip, i) => (
                    <div
                      key={tip.title}
                      className="flex items-start gap-3 animate-in fade-in slide-in-from-right-4 duration-500"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <tip.icon className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-0.5">{tip.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Need help?</p>
                  <a
                    href="mailto:onboarding@pipelinepilot.io"
                    className="text-xs text-accent hover:underline"
                  >
                    onboarding@pipelinepilot.io
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
