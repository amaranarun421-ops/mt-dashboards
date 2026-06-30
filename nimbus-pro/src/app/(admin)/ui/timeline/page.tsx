"use client";
import { PageHeader, Card, CardHeader, CardBody, Avatar, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  GitCommit,
  GitPullRequest,
  Rocket,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  FileText,
  Star,
  GitMerge,
  Package,
} from "lucide-react";

type Tone = "brand" | "success" | "warning" | "error" | "purple" | "orange" | "gray";

const TONE_DOT: Record<Tone, string> = {
  brand: "bg-brand-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  gray: "bg-gray-400",
};

const TONE_ICON_BG: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

/* ---------- Basic vertical timeline ---------- */
function BasicTimeline() {
  const items = [
    { time: "09:00", title: "Standup", desc: "Daily team sync", tone: "brand" as Tone },
    { time: "11:30", title: "Design review", desc: "Walk through the new dashboard", tone: "purple" as Tone },
    { time: "14:00", title: "Ship v2.4", desc: "Release Nimbus Pro 2.4 to production", tone: "success" as Tone },
    { time: "16:30", title: "Retro", desc: "Sprint 32 retrospective", tone: "orange" as Tone },
  ];
  return (
    <div className="relative">
      <div className="absolute left-2 top-1 bottom-1 w-px bg-gray-200 dark:bg-gray-800" />
      <ul className="space-y-6">
        {items.map((it, i) => (
          <li key={i} className="relative pl-8">
            <span className={cn("absolute left-0 top-0.5 h-4 w-4 rounded-full ring-4 ring-white dark:ring-gray-900", TONE_DOT[it.tone])} />
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{it.title}</p>
              <span className="text-xs font-medium text-gray-500">{it.time}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{it.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- With icons ---------- */
function IconTimeline() {
  const items = [
    { icon: GitCommit, title: "Commit pushed", desc: "feat: add breadcrumbs page", tone: "brand" as Tone, time: "2m ago" },
    { icon: GitPullRequest, title: "PR opened", desc: "#142 — UI showcase batch", tone: "purple" as Tone, time: "5m ago" },
    { icon: CheckCircle2, title: "CI passed", desc: "All 218 tests green", tone: "success" as Tone, time: "8m ago" },
    { icon: GitMerge, title: "Merged into main", desc: "by Aria Chen", tone: "orange" as Tone, time: "12m ago" },
    { icon: Rocket, title: "Deployed to prod", desc: "nimbus-pro v2.4.1", tone: "success" as Tone, time: "20m ago" },
  ];
  return (
    <div className="relative">
      <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />
      <ul className="space-y-5">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <li key={i} className="relative flex items-start gap-4">
              <span className={cn("relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900", TONE_ICON_BG[it.tone])}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1 pt-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{it.title}</p>
                  <span className="text-xs text-gray-500">{it.time}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{it.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- With avatars ---------- */
function AvatarTimeline() {
  const items = [
    { name: "Aria Chen", action: "created a task", target: "Design new onboarding", time: "10 min ago", tone: "brand" as Tone },
    { name: "Jordan Lee", action: "commented on", target: "API refactoring", time: "1 hour ago", tone: "purple" as Tone },
    { name: "Priya Shah", action: "uploaded a file", target: "Q4-report.pdf", time: "3 hours ago", tone: "orange" as Tone },
    { name: "Marcus Kim", action: "completed", target: "Sprint 32 planning", time: "Yesterday", tone: "success" as Tone },
  ];
  return (
    <div className="relative">
      <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />
      <ul className="space-y-5">
        {items.map((it, i) => (
          <li key={i} className="relative flex items-start gap-3">
            <span className="relative z-10 ring-4 ring-white dark:ring-gray-900 rounded-full">
              <Avatar name={it.name} size={40} />
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">{it.name}</span> {it.action}{" "}
                <span className="font-medium text-brand-600 dark:text-brand-400">{it.target}</span>
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className={cn("h-1.5 w-1.5 rounded-full", TONE_DOT[it.tone])} />
                <span className="text-xs text-gray-500">{it.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Alternating sides ---------- */
function AlternatingTimeline() {
  const items = [
    { title: "Project kickoff", desc: "Stakeholders aligned on goals", time: "Mar 4", tone: "brand" as Tone },
    { title: "Discovery sprint", desc: "User interviews and competitive scan", time: "Mar 11", tone: "purple" as Tone },
    { title: "Design review", desc: "Hi-fi mockups approved", time: "Mar 22", tone: "orange" as Tone },
    { title: "Beta launch", desc: "Internal release to 50 users", time: "Apr 5", tone: "warning" as Tone },
    { title: "GA release", desc: "Public launch on Product Hunt", time: "Apr 19", tone: "success" as Tone },
  ];
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-800 md:block" />
      <ul className="space-y-6">
        {items.map((it, i) => {
          const left = i % 2 === 0;
          return (
            <li key={i} className="relative md:grid md:grid-cols-2 md:gap-8">
              <span className={cn(
                "absolute left-1/2 top-2 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-white dark:ring-gray-900 md:block",
                TONE_DOT[it.tone]
              )} />
              <span className={cn(
                "absolute left-1 top-2 z-10 h-3 w-3 rounded-full ring-4 ring-white dark:ring-gray-900 md:hidden",
                TONE_DOT[it.tone]
              )} />
              <div className={cn("pl-6 md:pl-0", left ? "md:pr-8 md:text-right" : "md:col-start-2 md:pl-8")}>
                <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                  <div className={cn("flex items-center gap-2", left && "md:justify-end")}>
                    <Badge tone="gray" variant="soft">{it.time}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">{it.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{it.desc}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Horizontal timeline ---------- */
function HorizontalTimeline() {
  const steps = [
    { label: "Applied", date: "Mar 1", tone: "success" as Tone, icon: CheckCircle2 },
    { label: "Screening", date: "Mar 5", tone: "success" as Tone, icon: CheckCircle2 },
    { label: "Interview", date: "Mar 12", tone: "success" as Tone, icon: CheckCircle2 },
    { label: "Offer", date: "Mar 18", tone: "brand" as Tone, icon: Clock },
    { label: "Onboard", date: "Apr 1", tone: "gray" as Tone, icon: Package },
  ];
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 dark:bg-gray-800" />
      <ul className="relative grid grid-cols-5 gap-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={i} className="flex flex-col items-center text-center">
              <span className={cn(
                "relative z-10 flex h-9 w-9 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-50",
                TONE_ICON_BG[s.tone]
              )}>
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-2 text-xs font-semibold text-gray-900 dark:text-white">{s.label}</p>
              <p className="text-[10px] text-gray-500">{s.date}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Rich content cards ---------- */
function RichTimeline() {
  const items = [
    {
      icon: MessageSquare,
      tone: "purple" as Tone,
      title: "Aria Chen commented on Dashboard redesign",
      time: "2 hours ago",
      body: "The KPI tiles look great — can we add a comparison vs last month? I think it'd help the executive view.",
      tags: ["Design", "v2.4"],
    },
    {
      icon: FileText,
      tone: "brand" as Tone,
      title: "Jordan Lee shared a document",
      time: "5 hours ago",
      body: "Q4 strategy draft — please add comments by EOD Friday. I'll incorporate feedback over the weekend.",
      tags: ["Strategy", "Q4"],
    },
    {
      icon: AlertCircle,
      tone: "warning" as Tone,
      title: "Build failed on main",
      time: "Yesterday",
      body: "TypeError in src/components/charts/Line.tsx — non-finite y-scale value. Pinned to commit a1b2c3d.",
      tags: ["CI", "Bug"],
    },
    {
      icon: Star,
      tone: "orange" as Tone,
      title: "Priya Shah starred Nimbus Pro",
      time: "2 days ago",
      body: "First 5-star review from a Pro tier customer. Quoted: \"The new command palette is a game changer.\"",
      tags: ["Feedback", "Pro"],
    },
  ];
  return (
    <div className="relative">
      <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />
      <ul className="space-y-5">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <li key={i} className="relative flex items-start gap-4">
              <span className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900",
                TONE_ICON_BG[it.tone]
              )}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{it.title}</p>
                  <span className="text-xs text-gray-500">{it.time}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{it.body}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <Badge key={t} tone="gray" variant="soft">{t}</Badge>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button size="sm" variant="ghost">Reply</Button>
                  <Button size="sm" variant="ghost">View thread</Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Timeline"
        description="Chronological sequences — vertical with dots, icons, or avatars, alternating sides, horizontal steppers, and rich content cards."
        breadcrumbs={[{ label: "UI Components" }, { label: "Timeline" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Basic */}
        <Card>
          <CardHeader title="Basic Vertical" description="Dotted markers with time labels" />
          <CardBody>
            <BasicTimeline />
          </CardBody>
        </Card>

        {/* With icons */}
        <Card>
          <CardHeader title="With Icons" description="Each event has a typed icon" />
          <CardBody>
            <IconTimeline />
          </CardBody>
        </Card>

        {/* With avatars */}
        <Card>
          <CardHeader title="With Avatars" description="Activity feed style" />
          <CardBody>
            <AvatarTimeline />
          </CardBody>
        </Card>

        {/* Alternating */}
        <Card>
          <CardHeader title="Alternating Sides" description="Cards zig-zag across a central line (desktop)" />
          <CardBody>
            <AlternatingTimeline />
          </CardBody>
        </Card>

        {/* Horizontal */}
        <Card>
          <CardHeader title="Horizontal Stepper" description="Process flows & status trackers" />
          <CardBody>
            <HorizontalTimeline />
            <p className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
              Great for hiring pipelines, order tracking, and multi-step approvals. Collapses to a vertical dot list on mobile.
            </p>
          </CardBody>
        </Card>

        {/* Rich content */}
        <Card>
          <CardHeader title="Rich Content Cards" description="Notifications with body text and tags" />
          <CardBody>
            <RichTimeline />
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card>
          <CardHeader title="Anatomy & Tips" description="Timeline best practices" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Vertical line</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Use a 1px line in <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">border-color</code>. Markers sit on top with a 4px white ring to mask the line.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Color = type</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Reserve tone for event type (success, warning, error) — not for emphasis.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Density</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">If items &gt; 10, group by day with sticky date headers and collapse older events.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Alternating</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Only alternate on md+ screens. On mobile, all cards should sit on the right of the line.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
