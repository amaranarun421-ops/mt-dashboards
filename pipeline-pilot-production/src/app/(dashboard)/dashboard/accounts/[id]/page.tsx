'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/common/page-header';
import { StatusBadge, StageBadge, AvatarBadge } from '@/components/common/status-badge';
import { ErrorState } from '@/components/common/states';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { accounts, contacts, deals, activities, STAGE_COLORS, type Account } from '@/lib/data';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, MapPin, Globe, Building2, Users, Phone, Mail, Calendar, ChevronRight,
  DollarSign, TrendingUp, Handshake, Activity as ActivityIcon, RefreshCw, CheckCircle2,
  ExternalLink, Pencil, Plus, FileText, BarChart3, Sparkles, Target, Clock,
} from 'lucide-react';

const TIER_COLOR: Record<Account['tier'], string> = {
  Enterprise: 'var(--accent)',
  Growth: 'var(--chart-1)',
  Starter: 'var(--chart-3)',
};

function healthColor(score: number): string {
  if (score >= 85) return 'var(--success)';
  if (score >= 70) return 'var(--warning)';
  return 'var(--destructive)';
}

const ACTIVITY_ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  call: { icon: Phone, color: 'var(--chart-1)' },
  meeting: { icon: Calendar, color: 'var(--chart-3)' },
  email: { icon: Mail, color: 'var(--chart-5)' },
  task: { icon: CheckCircle2, color: 'var(--warning)' },
  note: { icon: Pencil, color: 'var(--chart-4)' },
  deal_update: { icon: RefreshCw, color: 'var(--accent)' },
};

const filesMock = [
  { id: 'f1', name: 'Master_Services_Agreement.pdf', size: '2.4 MB', type: 'pdf', uploaded: '2h ago', by: 'SC' },
  { id: 'f2', name: 'Q2_Business_Review.pdf', size: '1.8 MB', type: 'pdf', uploaded: '3d ago', by: 'MJ' },
  { id: 'f3', name: 'Architecture_Diagram.png', size: '480 KB', type: 'image', uploaded: '5d ago', by: 'SC' },
  { id: 'f4', name: 'Pricing_Calculator.xlsx', size: '120 KB', type: 'sheet', uploaded: '1w ago', by: 'ED' },
];

function fileTypeIcon(type: string) {
  switch (type) {
    case 'pdf': return FileText;
    case 'image': return FileText;
    case 'sheet': return FileText;
    default: return FileText;
  }
}

function fileTypeColor(type: string): string {
  switch (type) {
    case 'pdf': return 'var(--destructive)';
    case 'image': return 'var(--chart-3)';
    case 'sheet': return 'var(--success)';
    default: return 'var(--muted-foreground)';
  }
}

export default function AccountDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const account = accounts.find((a) => a.id === (params?.id as string));

  if (!account) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => router.push('/dashboard/accounts')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to accounts
        </button>
        <ErrorState
          title="Account not found"
          description={`We couldn't find an account with ID "${params?.id}". It may have been deleted or the link is incorrect.`}
          onRetry={() => router.push('/dashboard/accounts')}
        />
      </div>
    );
  }

  const tierColor = TIER_COLOR[account.tier];
  const hColor = healthColor(account.healthScore);

  const accountContacts = contacts.filter((c) => c.accountId === account.id);
  const accountDeals = deals.filter((d) => d.accountId === account.id);
  const accountActivities = activities.filter(
    (a) => a.relatedTo === account.name || a.relatedType === 'account'
  );
  const displayedActivities = accountActivities.length > 0 ? accountActivities : activities.slice(0, 6);

  // Industry benchmark — synthesized based on industry
  const industryBenchmark = {
    industry: account.industry,
    yourArr: account.arr,
    industryMedian: Math.round(account.arr * 0.72),
    topQuartile: Math.round(account.arr * 1.4),
    growthRate: 12,
  };

  // Expansion opportunities (synthesized from existing deals + products)
  const expansionOpportunities = [
    { name: 'Premium Support Tier', potential: Math.round(account.arr * 0.08), likelihood: 75 },
    { name: 'Advanced Analytics Module', potential: Math.round(account.arr * 0.12), likelihood: 60 },
    { name: 'Additional User Licenses', potential: Math.round(account.arr * 0.05), likelihood: 85 },
    { name: 'API Usage Expansion', potential: Math.round(account.arr * 0.03), likelihood: 50 },
  ];

  // Account timeline (synthesized)
  const timeline = [
    { date: 'Jul 02', event: 'Discovery call completed', type: 'milestone', icon: Phone, color: 'var(--chart-1)' },
    { date: 'Jun 28', event: 'Deal moved to Negotiation', type: 'deal', icon: Handshake, color: 'var(--accent)' },
    { date: 'Jun 15', event: 'QBR with leadership team', type: 'meeting', icon: Calendar, color: 'var(--chart-3)' },
    { date: 'May 03', event: 'New stakeholder added', type: 'contact', icon: Users, color: 'var(--chart-5)' },
    { date: 'Apr 12', event: 'Renewal contract signed', type: 'milestone', icon: CheckCircle2, color: 'var(--success)' },
    { date: 'Mar 04', event: 'Account onboarded', type: 'milestone', icon: Sparkles, color: 'var(--accent)' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Account Details"
        description="Comprehensive view of a single account"
        actions={
          <Button variant="outline" size="sm" asChild className="bg-card border-border">
            <Link href="/dashboard/accounts">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
            </Link>
          </Button>
        }
      />

      {/* Hero — large logo block */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-center gap-5 min-w-0 flex-1">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-xl"
              style={{ background: account.logoColor }}
            >
              {account.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <StageBadge stage={account.tier} color={tierColor} />
                <StatusBadge
                  status={account.healthScore >= 85 ? 'success' : account.healthScore >= 70 ? 'warning' : 'destructive'}
                  label={`${account.healthScore}/100 health`}
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{account.name}</h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {account.industry}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {account.location}</span>
                <a href={`https://${account.website}`} className="flex items-center gap-1 text-accent hover:underline">
                  <Globe className="w-3 h-3" /> {account.website} <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Employees</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{formatNumber(account.employees, true)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ARR</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(account.arr, { compact: true })}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Active Deals</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{account.activeDeals}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account overview card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-accent" />
            <h3 className="text-base font-semibold text-foreground">Account Overview</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Lifetime Revenue</p>
              <p className="text-base font-bold text-foreground tabular-nums">{formatCurrency(account.revenue, { compact: true })}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ARR</p>
              <p className="text-base font-bold text-foreground tabular-nums">{formatCurrency(account.arr, { compact: true })}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Churn Risk</p>
              <p className="text-base font-bold tabular-nums" style={{ color: hColor }}>{account.churnRisk}%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Renewal</p>
              <p className="text-base font-bold text-foreground">
                {new Date(account.renewalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <AvatarBadge initials={account.ownerInitials} size="md" color={tierColor} />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Account Owner</p>
                <p className="text-sm font-semibold text-foreground">{account.owner}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Contact</p>
                <p className="text-sm font-semibold text-foreground">{account.lastContact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions side card */}
        <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <h3 className="text-base font-semibold text-foreground">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="bg-secondary/30 border-border justify-start">
              <Phone className="w-3.5 h-3.5 mr-2" /> Log call
            </Button>
            <Button variant="outline" size="sm" className="bg-secondary/30 border-border justify-start">
              <Mail className="w-3.5 h-3.5 mr-2" /> Send email
            </Button>
            <Button variant="outline" size="sm" className="bg-secondary/30 border-border justify-start">
              <Calendar className="w-3.5 h-3.5 mr-2" /> Schedule
            </Button>
            <Button variant="outline" size="sm" className="bg-secondary/30 border-border justify-start">
              <Plus className="w-3.5 h-3.5 mr-2" /> Add note
            </Button>
          </div>
          <Button size="sm" className="w-full mt-3 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Target className="w-3.5 h-3.5 mr-2" /> Create opportunity
          </Button>
        </div>
      </div>

      {/* Tabs section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-card border border-border p-1 h-auto">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="contacts" className="text-xs">
            Contacts <span className="ml-1 text-[10px] text-muted-foreground">{accountContacts.length}</span>
          </TabsTrigger>
          <TabsTrigger value="deals" className="text-xs">
            Deals <span className="ml-1 text-[10px] text-muted-foreground">{accountDeals.length}</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="text-xs">Activities</TabsTrigger>
          <TabsTrigger value="files" className="text-xs">Files</TabsTrigger>
        </TabsList>

        {/* Overview tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Industry benchmark */}
            <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Industry Benchmark</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">How this account compares to the {industryBenchmark.industry} sector</p>
              <div className="space-y-3">
                {[
                  { label: 'Your ARR', value: industryBenchmark.yourArr, color: 'var(--accent)', highlight: true },
                  { label: 'Industry Median', value: industryBenchmark.industryMedian, color: 'var(--chart-3)' },
                  { label: 'Top Quartile', value: industryBenchmark.topQuartile, color: 'var(--chart-1)' },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{row.label}</span>
                      <span className="text-xs font-semibold text-foreground tabular-nums">{formatCurrency(row.value, { compact: true })}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(row.value / industryBenchmark.topQuartile) * 100}%`, background: row.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">YoY Growth</span>
                <span className="text-sm font-bold text-success tabular-nums">+{industryBenchmark.growthRate}%</span>
              </div>
            </div>

            {/* Account timeline */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 mb-4">
                <ActivityIcon className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Account Timeline</h3>
              </div>
              <div className="relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
                <div className="space-y-3">
                  {timeline.map((t, i) => {
                    const Icon = t.icon;
                    return (
                      <div
                        key={i}
                        className="relative pl-10 animate-in fade-in slide-in-from-left-2 duration-300"
                        style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                      >
                        <div
                          className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-card shadow-sm"
                          style={{ background: `color-mix(in oklch, ${t.color} 15%, var(--card))` }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: t.color }} />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-medium text-foreground">{t.event}</p>
                          <span className="text-[10px] text-muted-foreground shrink-0">{t.date}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Expansion opportunities */}
          <div className="bg-card border border-border rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Expansion Opportunities</h3>
              </div>
              <span className="text-xs text-muted-foreground">
                Total potential: <span className="font-semibold text-foreground tabular-nums">{formatCurrency(expansionOpportunities.reduce((s, o) => s + o.potential, 0), { compact: true })}</span>
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {expansionOpportunities.map((opp, i) => (
                <div
                  key={opp.name}
                  className="p-3 rounded-lg border border-border bg-secondary/30 hover:border-accent/30 hover:bg-secondary/50 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <p className="text-sm font-medium text-foreground">{opp.name}</p>
                    <span className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(opp.potential, { compact: true })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${opp.likelihood}%`, background: opp.likelihood >= 75 ? 'var(--success)' : opp.likelihood >= 60 ? 'var(--warning)' : 'var(--chart-3)' }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums">{opp.likelihood}% likely</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Contacts tab */}
        <TabsContent value="contacts">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Contacts at this account</h3>
              </div>
              <Button variant="outline" size="sm" className="bg-card border-border">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Add contact
              </Button>
            </div>
            {accountContacts.length === 0 ? (
              <p className="text-xs text-muted-foreground py-8 text-center">No contacts linked to this account yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {accountContacts.map((c, i) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 hover:border-accent/30 hover:bg-secondary/50 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <AvatarBadge initials={c.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()} size="md" color={tierColor} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{c.title}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{c.email}</p>
                    </div>
                    <StatusBadge
                      status={c.status === 'Decision Maker' ? 'high' : c.status === 'Champion' ? 'success' : c.status === 'Influencer' ? 'info' : 'neutral'}
                      label={c.status}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Deals tab */}
        <TabsContent value="deals">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Handshake className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Deals for this account</h3>
              </div>
              <Button variant="outline" size="sm" className="bg-card border-border">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> New deal
              </Button>
            </div>
            {accountDeals.length === 0 ? (
              <p className="text-xs text-muted-foreground py-8 text-center">No deals linked to this account yet.</p>
            ) : (
              <div className="space-y-2">
                {accountDeals.map((d, i) => (
                  <Link
                    key={d.id}
                    href={`/dashboard/deals/${d.id}`}
                    className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 hover:border-accent/30 hover:bg-secondary/50 transition-all animate-in fade-in slide-in-from-left-2 duration-300"
                    style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground truncate">{d.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground">{d.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StageBadge stage={d.stage} color={STAGE_COLORS[d.stage]} />
                        <span className="text-[11px] text-muted-foreground">{d.type} · {d.probability}% likely</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(d.value, { compact: true })}</p>
                      <p className="text-[10px] text-muted-foreground">{d.owner}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Activities tab */}
        <TabsContent value="activities">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <ActivityIcon className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">Activity Timeline</h3>
            </div>
            <div className="relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-3">
                {displayedActivities.map((act, i) => {
                  const cfg = ACTIVITY_ICON_MAP[act.type] || ACTIVITY_ICON_MAP.note;
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={act.id}
                      className="relative pl-10 animate-in fade-in slide-in-from-left-2 duration-300"
                      style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                    >
                      <div
                        className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-card shadow-sm"
                        style={{ background: `color-mix(in oklch, ${cfg.color} 15%, var(--card))` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3 hover:bg-secondary/50 transition-colors">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-xs font-medium text-foreground">{act.title}</p>
                          <span className="text-[10px] text-muted-foreground shrink-0">{act.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{act.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                          <AvatarBadge initials={act.ownerInitials} size="sm" color={cfg.color} />
                          <span>{act.owner}</span>
                          {act.duration && <span>· {act.duration}min</span>}
                          {act.outcome && <span>· {act.outcome}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Files tab */}
        <TabsContent value="files">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Account Files</h3>
                <span className="text-[11px] text-muted-foreground">({filesMock.length})</span>
              </div>
              <Button variant="outline" size="sm" className="bg-card border-border">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Upload
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {filesMock.map((file, i) => {
                const Icon = fileTypeIcon(file.type);
                const color = fileTypeColor(file.type);
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
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
