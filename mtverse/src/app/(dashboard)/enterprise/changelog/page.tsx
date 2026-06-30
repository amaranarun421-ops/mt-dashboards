"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Sparkles, Wrench, Bug, Rocket, Star, Bell, Check, GitBranch,
  Calendar, ArrowRight, Tag, Filter, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type TagType = "New" | "Improved" | "Fixed" | "Security" | "Breaking";

type Release = {
  version: string;
  date: string;
  highlight: string;
  tags: TagType[];
  items: { type: TagType; title: string; desc: string }[];
  major?: boolean;
};

const releases: Release[] = [
  {
    version: "v2.4.1",
    date: "Oct 22, 2024",
    highlight: "Hotfix: critical security patch and bug fixes",
    tags: ["Fixed", "Security"],
    items: [
      { type: "Security", title: "Patch CVE-2024-4821 in OAuth flow", desc: "Fixed an issue where refresh tokens could be replayed under specific conditions. All active tokens have been rotated." },
      { type: "Fixed", title: "Chart tooltips render incorrectly in Safari", desc: "Tooltips on area charts were offset by ~12px in Safari 17+. Now positioned correctly." },
      { type: "Fixed", title: "API rate limit headers missing on 429 responses", desc: "X-RateLimit-Remaining and Retry-After headers are now properly returned on rate-limited responses." },
      { type: "Fixed", title: "Team invite emails fail for + aliases", desc: "Email addresses with + aliases (e.g. alex+test@mtverse.io) are now properly handled in invite flow." },
    ],
  },
  {
    version: "v2.4.0",
    date: "Oct 15, 2024",
    highlight: "AI-powered insights, new dashboard kit, and 12+ improvements",
    tags: ["New", "Improved", "Breaking"],
    major: true,
    items: [
      { type: "New", title: "AI-powered dashboard insights", desc: "Get natural-language summaries, anomaly detection, and forecasting across all dashboards. Powered by GPT-4 Turbo." },
      { type: "New", title: "Command palette (Cmd+K)", desc: "Quickly navigate to any page, run actions, and search across your workspace with the new command palette." },
      { type: "New", title: "12 new dashboard templates", desc: "Added CRM, finance, security, and marketing dashboards. Total template count is now 50+." },
      { type: "New", title: "Real-time collaboration cursors", desc: "See who's viewing a dashboard in real-time with live cursors and presence indicators." },
      { type: "Improved", title: "Chart performance up to 3x faster", desc: "Recharts upgraded to v3 with virtualization. Large datasets (10k+ points) now render smoothly." },
      { type: "Improved", title: "Dark mode polish", desc: "Refined dark mode contrast across all components. Better legibility for charts and tables." },
      { type: "Improved", title: "Mobile-responsive sidebar", desc: "Sidebar now collapses to icons on tablet and transforms into a drawer on mobile." },
      { type: "Breaking", title: "Deprecate v1 API endpoints", desc: "All /v1/* API endpoints have been removed. Migrate to /v2/* before Dec 31, 2024." },
      { type: "Breaking", title: "Drop Node 16 support", desc: "Minimum Node.js version is now 18. Upgrade your local environment and CI." },
    ],
  },
  {
    version: "v2.3.0",
    date: "Sep 28, 2024",
    highlight: "Custom integrations marketplace and webhook improvements",
    tags: ["New", "Improved"],
    items: [
      { type: "New", title: "Integrations marketplace", desc: "Browse and install 100+ pre-built integrations from the new marketplace. Featured: Slack, GitHub, Stripe, Linear, Notion." },
      { type: "New", title: "Webhook retries with exponential backoff", desc: "Failed webhook deliveries now retry up to 5 times with exponential backoff (1m, 5m, 30m, 2h, 12h)." },
      { type: "New", title: "Audit log export to S3", desc: "Stream audit logs directly to your S3 bucket for compliance. Configure in Security → Audit logs." },
      { type: "Improved", title: "Search across all resources", desc: "Global search now indexes dashboards, tasks, documents, and members. Faster and more relevant results." },
      { type: "Improved", title: "RBAC permission granularity", desc: "Added 'Export' and 'Share' as separate permissions. Existing roles are auto-migrated." },
    ],
  },
  {
    version: "v2.2.0",
    date: "Sep 5, 2024",
    highlight: "Billing improvements and SOC 2 Type II certification",
    tags: ["New", "Improved", "Security"],
    items: [
      { type: "Security", title: "SOC 2 Type II certification", desc: "We've completed our SOC 2 Type II audit. The full report is available on request from security@mtverse.io." },
      { type: "New", title: "Annual billing with 20% discount", desc: "Pay annually and save 20%. Available on all plans including Enterprise." },
      { type: "New", title: "Prorated upgrades", desc: "When upgrading mid-cycle, you only pay the difference. No more waiting for the next billing date." },
      { type: "Improved", title: "Invoice PDFs with custom branding", desc: "Enterprise customers can now customize invoice PDFs with their logo, colors, and footer." },
      { type: "Improved", title: "Failed payment recovery flow", desc: "When a payment fails, members can update their card without leaving the app. Recovery rate up 32%." },
    ],
  },
  {
    version: "v2.1.0",
    date: "Aug 12, 2024",
    highlight: "Performance overhaul and new chart types",
    tags: ["New", "Improved", "Fixed"],
    items: [
      { type: "New", title: "Radar and Radial charts", desc: "Two new chart types added: RadarChart for multi-dimensional comparison and RadialProgress for circular gauges." },
      { type: "New", title: "Custom dashboard themes", desc: "Define custom color palettes per workspace. Each dashboard can have its own theme." },
      { type: "Improved", title: "Dashboard load time reduced by 47%", desc: "Switched to lazy loading and code-splitting. Initial dashboard render is now under 400ms." },
      { type: "Improved", title: "Keyboard shortcuts", desc: "Press ? to see all shortcuts. New: G then D for dashboards, G then T for tasks, C for command palette." },
      { type: "Fixed", title: "Memory leak in long-running sessions", desc: "Fixed a memory leak that caused browser tabs to crash after 8+ hours of active use." },
      { type: "Fixed", title: "Date pickers off by one in UTC+13", desc: "Date pickers now correctly handle UTC+13 (Tonga) and other edge-case timezones." },
    ],
  },
  {
    version: "v2.0.0",
    date: "Jul 1, 2024",
    highlight: "Complete redesign with Next.js 16, new design system, and 50+ pages",
    tags: ["New", "Breaking"],
    major: true,
    items: [
      { type: "New", title: "Complete UI redesign", desc: "MTVerse 2.0 ships with a brand new design system built on Tailwind CSS 4 and shadcn/ui. Premium aesthetic with aurora gradients and glass effects." },
      { type: "New", title: "Next.js 16 App Router", desc: "Migrated from Pages Router to App Router with React Server Components. Faster initial loads and better SEO." },
      { type: "New", title: "50+ pre-built pages", desc: "12 dashboards, 12 apps, 15 enterprise pages, 10 auth flows, and a complete UI library." },
      { type: "Breaking", title: "Renamed all CSS variables", desc: "CSS variables now use the --chart-N pattern. Update any custom themes before upgrading." },
      { type: "Breaking", title: "TypeScript strict mode", desc: "All code is now strict-typed. Update any integrations that relied on loose typing." },
    ],
  },
];

const tagStyles: Record<TagType, string> = {
  New: "bg-success/10 text-success border-success/20",
  Improved: "bg-info/10 text-info border-info/20",
  Fixed: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  Security: "bg-warning/10 text-warning border-warning/20",
  Breaking: "bg-destructive/10 text-destructive border-destructive/20",
};

const tagIcons: Record<TagType, React.ElementType> = {
  New: Sparkles,
  Improved: Wrench,
  Fixed: Bug,
  Security: Star,
  Breaking: Zap,
};

const filters = ["All", "New", "Improved", "Fixed", "Security", "Breaking"];

export default function ChangelogPage() {
  const [filter, setFilter] = useState("All");
  const [subscribed, setSubscribed] = useState(false);

  const filteredReleases = useMemo(() => {
    if (filter === "All") return releases;
    return releases
      .map((r) => ({
        ...r,
        items: r.items.filter((i) => i.type === filter),
      }))
      .filter((r) => r.items.length > 0);
  }, [filter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Changelog"
        description="Stay up to date with the latest features, improvements, and fixes shipped to MTVerse."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Changelog" }]}
        actions={
          <Button
            variant={subscribed ? "outline" : "default"}
            size="sm"
            className="h-9"
            onClick={() => {
              setSubscribed((s) => !s);
              toast.success(subscribed ? "Unsubscribed from updates" : "Subscribed to changelog updates");
            }}
          >
            <Bell className="size-4 mr-2" />
            {subscribed ? "Subscribed" : "Subscribe"}
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Rocket, label: "Latest version", value: "v2.4.1", color: "text-primary" },
          { icon: Calendar, label: "Released", value: "Oct 22", color: "text-info" },
          { icon: GitBranch, label: "Total releases", value: "42", color: "text-success" },
          { icon: Star, label: "Major releases", value: "8", color: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-1">
              <s.icon className={`size-4 ${s.color}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-xl font-bold tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground flex items-center gap-1.5 mr-2">
          <Filter className="size-3.5" /> Filter by tag:
        </span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === f
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-border hover:bg-accent"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />
        <div className="space-y-8">
          {filteredReleases.map((release) => (
            <div key={release.version} className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className={`relative z-10 flex size-10 items-center justify-center rounded-full border-4 border-background ${release.major ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {release.major ? <Sparkles className="size-4" /> : <GitBranch className="size-4" />}
                </div>
                <div className="flex-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-xl font-bold tracking-tight">{release.version}</h2>
                  {release.major && (
                    <Badge className="gap-1">
                      <Star className="size-3" /> Major release
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" /> {release.date}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {release.tags.map((t) => (
                    <Badge key={t} variant="outline" className={`gap-1 font-normal ${tagStyles[t]}`}>
                      {React.createElement(tagIcons[t], { className: "size-3" })} {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="ml-14 space-y-4">
                <p className="text-sm text-muted-foreground">{release.highlight}</p>

                <div className="space-y-2">
                  {release.items.map((item, i) => {
                    const Icon = tagIcons[item.type];
                    return (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors">
                        <Badge variant="outline" className={`gap-1 font-normal shrink-0 ${tagStyles[item.type]}`}>
                          <Icon className="size-3" /> {item.type}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => toast.info(`Viewing full release notes for ${release.version}`)}>
                    <Tag className="size-3.5 mr-1.5" /> Full release notes
                    <ArrowRight className="size-3.5 ml-1" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => toast.success(`Copied ${release.version} to clipboard`)}>
                    <GitBranch className="size-3.5 mr-1.5" /> Copy version
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionCard>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-chart-4/5">
          <div className="flex items-start gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shrink-0">
              <Bell className="size-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold">Never miss an update</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Get notified about new releases, security patches, and product announcements.
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              variant={subscribed ? "outline" : "default"}
              onClick={() => {
                setSubscribed((s) => !s);
                toast.success(subscribed ? "Unsubscribed" : "Subscribed to email updates");
              }}
            >
              {subscribed ? <><Check className="size-4 mr-2" /> Subscribed</> : "Subscribe via email"}
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
