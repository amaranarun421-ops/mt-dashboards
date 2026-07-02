"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Phone, Mail, Calendar, FileText, Building2, Users, DollarSign,
  Target, TrendingUp, AlertTriangle, Sparkles, Check, X, ChevronRight,
  Globe, MapPin, Briefcase, Crown, Activity, MessageSquare, Plus, Download,
} from "lucide-react";
import { PageHero, StatBlock, SectionHeading, Panel, Callout, EmptyState } from "@/components/common/page-blocks";
import { AreaSeriesChart, DonutChart, ChartCard } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deals, leads, accounts, contacts, activities, salesReps, pipelineStages } from "@/data/sales";
import { formatCurrency, formatCompactCurrency, formatPercent } from "@/lib/chart-theme";
import { cn } from "@/lib/utils";

const STAGE_COLORS: Record<string, string> = {
  prospecting: "#94a3b8", qualification: "#0ba5ec", proposal: "#7a5af8",
  negotiation: "#f79009", "closed-won": "#12b76a", "closed-lost": "#f04438",
};

function StageBadge({ stage }: { stage: string }) {
  const color = STAGE_COLORS[stage] ?? "#94a3b8";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize" style={{ backgroundColor: `${color}20`, color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {stage.replace("-", " ")}
    </span>
  );
}

function RiskBadge({ score }: { score: number }) {
  const tone = score >= 60 ? "error" : score >= 40 ? "warning" : "success";
  const cls = tone === "error" ? "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
    : tone === "warning" ? "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500"
    : "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500";
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", cls)}>
    <AlertTriangle className="h-3 w-3" /> {score}/100 risk
  </span>;
}

// Timeline component shared across detail pages
function Timeline({ items }: { items: typeof activities }) {
  const iconMap: Record<string, { icon: typeof Activity; color: string }> = {
    call: { icon: Phone, color: "bg-blue-light-500/15 text-blue-light-600 dark:text-blue-light-400" },
    email: { icon: Mail, color: "bg-brand-500/15 text-brand-500" },
    meeting: { icon: Users, color: "bg-success-500/15 text-success-600 dark:text-success-500" },
    deal: { icon: Briefcase, color: "bg-purple-500/15 text-purple-500" },
    note: { icon: FileText, color: "bg-warning-500/15 text-warning-600 dark:text-warning-500" },
    task: { icon: Check, color: "bg-gray-500/15 text-gray-600 dark:text-gray-400" },
  };
  return (
    <ol className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gray-200 dark:before:bg-gray-800">
      {items.map((a) => {
        const { icon: Icon, color } = iconMap[a.type] ?? iconMap.task;
        return (
          <li key={a.id} className="relative flex gap-3">
            <div className={cn("relative z-10 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900", color)}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1 pb-4 border-b border-gray-100 dark:border-gray-800/50 last:border-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{a.title}</p>
                {a.outcome && <Badge variant="outline" className="text-[10px] capitalize">{a.outcome}</Badge>}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{a.description}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <span className="font-medium text-gray-600 dark:text-gray-400">{a.actor}</span>
                <span>·</span>
                <span>{new Date(a.timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// ============ Deal detail ============
export function DealDetailPage({ id }: { id: string }) {
  const deal = deals.find((d) => d.id === id);
  if (!deal) notFound();

  const relatedActivities = activities.filter((a) => a.relatedTo === deal.id);
  const contact = contacts.find((c) => c.accountName === deal.account);
  const account = accounts.find((a) => a.name === deal.account);
  const rep = salesReps.find((r) => r.name === deal.owner);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title={deal.title}
        description={`${deal.account} · Owner: ${deal.owner}`}
        breadcrumb={["Nexus Pro", "Sales Ops", "Deals", deal.title]}
        tone="brand"
        meta={[
          { label: "Stage", value: deal.stage },
          { label: "Value", value: formatCurrency(deal.value) },
          { label: "Close date", value: new Date(deal.expectedClose).toLocaleDateString("en-US", { month: "short", day: "numeric" }) },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" asChild className="gap-1.5">
              <Link href="/sales/deals"><ArrowLeft className="h-4 w-4" /> All deals</Link>
            </Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Log activity</Button>
          </>
        }
      />

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBlock label="Deal Value" value={formatCurrency(deal.value)} icon={DollarSign} variant="compact" />
        <StatBlock label="Weighted" value={formatCurrency(deal.weightedValue)} icon={TrendingUp} variant="compact" tone="brand" />
        <StatBlock label="Probability" value={formatPercent(deal.probability, 0)} icon={Target} variant="compact" />
        <StatBlock label="Age" value={`${deal.age} days`} icon={Activity} variant="compact" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <Panel title="Activity timeline">
                {relatedActivities.length > 0 ? (
                  <Timeline items={relatedActivities} />
                ) : (
                  <EmptyState title="No activities yet" description="Log your first call, email, or meeting to start tracking this deal." icon={Activity} action={<Button size="sm">Log activity</Button>} />
                )}
              </Panel>
            </TabsContent>
            <TabsContent value="details">
              <Panel title="Deal details">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  <div><dt className="text-xs text-gray-500 dark:text-gray-400">Account</dt><dd className="font-medium text-gray-800 dark:text-white mt-0.5">{deal.account}</dd></div>
                  <div><dt className="text-xs text-gray-500 dark:text-gray-400">Contact</dt><dd className="font-medium text-gray-800 dark:text-white mt-0.5">{deal.contact}</dd></div>
                  <div><dt className="text-xs text-gray-500 dark:text-gray-400">Owner</dt><dd className="font-medium text-gray-800 dark:text-white mt-0.5">{deal.owner}</dd></div>
                  <div><dt className="text-xs text-gray-500 dark:text-gray-400">Stage</dt><dd className="mt-0.5"><StageBadge stage={deal.stage} /></dd></div>
                  <div><dt className="text-xs text-gray-500 dark:text-gray-400">Created</dt><dd className="font-medium text-gray-800 dark:text-white mt-0.5">{new Date(deal.created).toLocaleDateString()}</dd></div>
                  <div><dt className="text-xs text-gray-500 dark:text-gray-400">Expected close</dt><dd className="font-medium text-gray-800 dark:text-white mt-0.5">{new Date(deal.expectedClose).toLocaleDateString()}</dd></div>
                  <div><dt className="text-xs text-gray-500 dark:text-gray-400">Next step</dt><dd className="font-medium text-gray-800 dark:text-white mt-0.5">{deal.nextStep}</dd></div>
                  <div><dt className="text-xs text-gray-500 dark:text-gray-400">Competitors</dt><dd className="font-medium text-gray-800 dark:text-white mt-0.5">{deal.competitors?.join(", ") ?? "None identified"}</dd></div>
                </dl>
              </Panel>
            </TabsContent>
            <TabsContent value="files">
              <EmptyState title="No files attached" description="Attach proposals, MSAs, or NDAs to keep everything in one place." icon={FileText} variant="illustrated" action={<Button size="sm">Upload file</Button>} />
            </TabsContent>
            <TabsContent value="comments">
              <EmptyState title="No comments yet" description="Start a thread with your team about this deal." icon={MessageSquare} action={<Button size="sm">Add comment</Button>} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Panel title="Health">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Risk score</span>
                <RiskBadge score={deal.riskScore} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Probability</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{formatPercent(deal.probability, 0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">Days in stage</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{Math.round(deal.age / 4)}d</span>
              </div>
            </div>
            {deal.riskScore >= 40 && (
              <Callout tone="warning" title="Risk factors" className="mt-4">
                <ul className="text-xs space-y-1">
                  <li>· Deal has been in pipeline for {deal.age} days</li>
                  <li>· Last activity was 3+ days ago</li>
                  <li>· No decision-maker identified yet</li>
                </ul>
              </Callout>
            )}
          </Panel>

          {contact && (
            <Panel title="Primary contact">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">
                    {contact.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{contact.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{contact.title}</p>
                </div>
              </div>
              <div className="mt-3 space-y-1 text-xs">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-500">
                  <Mail className="h-3.5 w-3.5" /> {contact.email}
                </a>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone className="h-3.5 w-3.5" /> {contact.phone}
                </p>
              </div>
            </Panel>
          )}

          {account && (
            <Panel title="Account">
              <Link href={`/sales/accounts/${account.id}`} className="block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate hover:text-brand-500">{account.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{account.industry} · {account.tier}</p>
                  </div>
                </div>
              </Link>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-gray-50 dark:bg-white/[0.03] p-2">
                  <p className="text-gray-400">Employees</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{account.employees.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-white/[0.03] p-2">
                  <p className="text-gray-400">Revenue</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{formatCompactCurrency(account.annualRevenue)}</p>
                </div>
              </div>
            </Panel>
          )}

          {rep && (
            <Panel title="Owner">
              <Link href={`/sales/rep/${rep.id}`} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">{rep.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white truncate hover:text-brand-500">{rep.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{rep.team} · {rep.region}</p>
                </div>
              </Link>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ Lead detail ============
export function LeadDetailPage({ id }: { id: string }) {
  const lead = leads.find((l) => l.id === id);
  if (!lead) notFound();

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title={lead.name}
        description={`${lead.company} · Source: ${lead.source}`}
        breadcrumb={["Nexus Pro", "Sales Ops", "Leads", lead.name]}
        tone="brand"
        meta={[
          { label: "Score", value: lead.score.toString() },
          { label: "Status", value: lead.status },
          { label: "Est. value", value: formatCurrency(lead.estimatedValue) },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" asChild className="gap-1.5"><Link href="/sales/leads"><ArrowLeft className="h-4 w-4" /> All leads</Link></Button>
            <Button size="sm" className="gap-1.5"><Check className="h-4 w-4" /> Convert to deal</Button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBlock label="Lead Score" value={lead.score.toString()} icon={Target} variant="compact" />
        <StatBlock label="Est. Value" value={formatCurrency(lead.estimatedValue)} icon={DollarSign} variant="compact" />
        <StatBlock label="Owner" value={lead.owner} icon={Users} variant="compact" />
        <StatBlock label="Created" value={new Date(lead.created).toLocaleDateString()} icon={Calendar} variant="compact" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="Contact info" className="lg:col-span-1">
          <dl className="space-y-3 text-sm">
            <div><dt className="text-xs text-gray-500 dark:text-gray-400">Email</dt><dd><a href={`mailto:${lead.email}`} className="text-brand-500 hover:underline">{lead.email}</a></dd></div>
            <div><dt className="text-xs text-gray-500 dark:text-gray-400">Phone</dt><dd className="font-mono text-xs">{lead.phone}</dd></div>
            <div><dt className="text-xs text-gray-500 dark:text-gray-400">Company</dt><dd className="font-medium">{lead.company}</dd></div>
            <div><dt className="text-xs text-gray-500 dark:text-gray-400">Source</dt><dd><Badge variant="outline" className="capitalize">{lead.source}</Badge></dd></div>
            <div><dt className="text-xs text-gray-500 dark:text-gray-400">Last activity</dt><dd>{new Date(lead.lastActivity).toLocaleDateString()}</dd></div>
          </dl>
        </Panel>
        <Panel title="Activity timeline" className="lg:col-span-2">
          <Timeline items={activities.slice(0, 4)} />
        </Panel>
      </div>
    </div>
  );
}

// ============ Account detail ============
export function AccountDetailPage({ id }: { id: string }) {
  const account = accounts.find((a) => a.id === id);
  if (!account) notFound();

  const accountDeals = deals.filter((d) => d.account === account.name);
  const accountContacts = contacts.filter((c) => c.accountName === account.name);
  const accountActivities = activities.filter((a) => accountDeals.some((d) => d.id === a.relatedTo));

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title={account.name}
        description={`${account.industry} · ${account.tier} tier · ${account.region}`}
        breadcrumb={["Nexus Pro", "Sales Ops", "Accounts", account.name]}
        tone="brand"
        meta={[
          { label: "Open deals", value: account.openDeals.toString() },
          { label: "Pipeline", value: formatCurrency(account.totalPipeline) },
          { label: "Health", value: account.health },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" asChild className="gap-1.5"><Link href="/sales/accounts"><ArrowLeft className="h-4 w-4" /> All accounts</Link></Button>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New deal</Button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBlock label="Employees" value={account.employees.toLocaleString()} icon={Users} variant="compact" />
        <StatBlock label="Annual Revenue" value={formatCompactCurrency(account.annualRevenue)} icon={DollarSign} variant="compact" />
        <StatBlock label="Open Pipeline" value={formatCurrency(account.totalPipeline)} icon={TrendingUp} variant="compact" />
        <StatBlock label="Owner" value={account.owner} icon={Users} variant="compact" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Panel title="Open deals">
            {accountDeals.length > 0 ? (
              <div className="space-y-2">
                {accountDeals.map((d) => (
                  <Link key={d.id} href={`/sales/deals/${d.id}`} className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 p-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{d.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{d.stage} · {d.owner}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white">{formatCurrency(d.value)}</span>
                  </Link>
                ))}
              </div>
            ) : <EmptyState title="No open deals" description="Start a new deal with this account." icon={Briefcase} />}
          </Panel>
          <Panel title="Activity timeline">
            <Timeline items={accountActivities} />
          </Panel>
        </div>
        <div className="space-y-4">
          <Panel title="Account info">
            <dl className="space-y-3 text-sm">
              <div><dt className="text-xs text-gray-500 dark:text-gray-400">Website</dt><dd><a href={`https://${account.website}`} className="text-brand-500 hover:underline flex items-center gap-1"><Globe className="h-3 w-3" /> {account.website}</a></dd></div>
              <div><dt className="text-xs text-gray-500 dark:text-gray-400">Industry</dt><dd className="font-medium">{account.industry}</dd></div>
              <div><dt className="text-xs text-gray-500 dark:text-gray-400">Tier</dt><dd><Badge variant="outline" className="capitalize">{account.tier.replace("-", " ")}</Badge></dd></div>
              <div><dt className="text-xs text-gray-500 dark:text-gray-400">Region</dt><dd className="font-medium">{account.region}</dd></div>
              <div><dt className="text-xs text-gray-500 dark:text-gray-400">Health</dt><dd><Badge variant="outline" className="capitalize">{account.health}</Badge></dd></div>
            </dl>
          </Panel>
          <Panel title="Contacts" description={`${accountContacts.length} contacts`}>
            <div className="space-y-2">
              {accountContacts.map((c) => (
                <Link key={c.id} href={`/sales/contacts`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.02] transition">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

// ============ Rep detail ============
export function RepDetailPage({ id }: { id: string }) {
  const rep = salesReps.find((r) => r.id === id);
  if (!rep) notFound();

  const repDeals = deals.filter((d) => d.owner === rep.name);
  const repPipeline = repDeals.reduce((s, d) => s + d.value, 0);
  const repWeighted = repDeals.reduce((s, d) => s + d.weightedValue, 0);

  // Mock monthly attainment history
  const attainmentHistory = [
    { name: "Jan", attained: 180000, quota: 200000 },
    { name: "Feb", attained: 220000, quota: 200000 },
    { name: "Mar", attained: 195000, quota: 200000 },
    { name: "Apr", attained: 240000, quota: 210000 },
    { name: "May", attained: 260000, quota: 210000 },
    { name: "Jun", attained: 235000, quota: 210000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHero
        title={rep.name}
        description={`${rep.team} team · ${rep.region} · ${rep.email}`}
        breadcrumb={["Nexus Pro", "Sales Ops", "Team", rep.name]}
        tone="brand"
        meta={[
          { label: "Attainment", value: formatPercent(rep.attainmentRate, 1) },
          { label: "Win rate", value: formatPercent(rep.winRate, 0) },
          { label: "Deals", value: rep.deals.toString() },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm" asChild className="gap-1.5"><Link href="/sales/team-performance"><ArrowLeft className="h-4 w-4" /> Leaderboard</Link></Button>
            <Button size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBlock label="Quota" value={formatCompactCurrency(rep.quota)} icon={Target} variant="compact" />
        <StatBlock label="Attained" value={formatCompactCurrency(rep.attained)} icon={DollarSign} variant="compact" />
        <StatBlock label="Pipeline" value={formatCompactCurrency(rep.pipeline)} icon={TrendingUp} variant="compact" />
        <StatBlock label="Win Rate" value={formatPercent(rep.winRate, 0)} icon={Crown} variant="compact" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Attainment history" description="Last 6 months vs quota" className="lg:col-span-2">
          <AreaSeriesChart
            data={attainmentHistory}
            series={[
              { key: "attained", label: "Attained", color: "#465fff" },
              { key: "quota", label: "Quota", color: "#98a2b3" },
            ]}
            xKey="name"
            currency
            height={300}
          />
        </ChartCard>
        <Panel title="Pipeline composition" description="By stage">
          <DonutChart
            data={pipelineStages.filter((s) => s.id !== "closed-lost").map((s) => {
              const stageDeals = repDeals.filter((d) => d.stage === s.id);
              return {
                name: s.label,
                value: stageDeals.reduce((sum, d) => sum + d.value, 0),
                color: STAGE_COLORS[s.id],
              };
            }).filter((d) => d.value > 0)}
            centerLabel="Pipeline"
            centerValue={formatCompactCurrency(repPipeline)}
            height={260}
          />
        </Panel>
      </div>
      <Panel title="Open deals" description={`${repDeals.length} deals · ${formatCurrency(repPipeline)} pipeline · ${formatCurrency(repWeighted)} weighted`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400">
                <th className="text-left p-3 font-semibold">Deal</th>
                <th className="text-left p-3 font-semibold">Account</th>
                <th className="text-right p-3 font-semibold">Value</th>
                <th className="text-right p-3 font-semibold">Weighted</th>
                <th className="text-left p-3 font-semibold">Stage</th>
                <th className="text-right p-3 font-semibold">Risk</th>
              </tr>
            </thead>
            <tbody>
              {repDeals.map((d) => (
                <tr key={d.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="p-3"><Link href={`/sales/deals/${d.id}`} className="font-medium text-gray-800 dark:text-white hover:text-brand-500">{d.title}</Link></td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">{d.account}</td>
                  <td className="p-3 text-right font-semibold text-gray-800 dark:text-white">{formatCurrency(d.value)}</td>
                  <td className="p-3 text-right text-brand-600 dark:text-brand-400">{formatCurrency(d.weightedValue)}</td>
                  <td className="p-3"><StageBadge stage={d.stage} /></td>
                  <td className="p-3 text-right">
                    <span className={cn("text-xs font-semibold", d.riskScore >= 60 ? "text-error-600 dark:text-error-500" : d.riskScore >= 40 ? "text-warning-600 dark:text-warning-500" : "text-success-600 dark:text-success-500")}>
                      {d.riskScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
