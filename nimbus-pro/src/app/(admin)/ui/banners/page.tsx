"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Badge, IconButton } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Info,
  Sparkles,
  X,
  ArrowRight,
  Gift,
  RefreshCw,
} from "lucide-react";

type Tone = "brand" | "info" | "success" | "warning" | "error" | "purple";

const TONE_STYLES: Record<Tone, { wrap: string; icon: string; iconBg: string; title: string }> = {
  brand: {
    wrap: "border-brand-200 bg-brand-50 dark:border-brand-500/30 dark:bg-brand-500/10",
    icon: "text-brand-600 dark:text-brand-400",
    iconBg: "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400",
    title: "text-brand-900 dark:text-brand-200",
  },
  info: {
    wrap: "border-accent-200 bg-accent-50 dark:border-accent-500/30 dark:bg-accent-500/10",
    icon: "text-accent-600 dark:text-accent-400",
    iconBg: "bg-accent-100 text-accent-600 dark:bg-accent-500/20 dark:text-accent-400",
    title: "text-accent-900 dark:text-accent-200",
  },
  success: {
    wrap: "border-success-200 bg-success-50 dark:border-success-500/30 dark:bg-success-500/10",
    icon: "text-success-600 dark:text-success-400",
    iconBg: "bg-success-100 text-success-600 dark:bg-success-500/20 dark:text-success-400",
    title: "text-success-900 dark:text-success-200",
  },
  warning: {
    wrap: "border-warning-200 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/10",
    icon: "text-warning-600 dark:text-warning-400",
    iconBg: "bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400",
    title: "text-warning-900 dark:text-warning-200",
  },
  error: {
    wrap: "border-error-200 bg-error-50 dark:border-error-500/30 dark:bg-error-500/10",
    icon: "text-error-600 dark:text-error-400",
    iconBg: "bg-error-100 text-error-600 dark:bg-error-500/20 dark:text-error-400",
    title: "text-error-900 dark:text-error-200",
  },
  purple: {
    wrap: "border-purple-200 bg-purple-50 dark:border-purple-500/30 dark:bg-purple-500/10",
    icon: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    title: "text-purple-900 dark:text-purple-200",
  },
};

const TONE_ICON: Record<Tone, React.ComponentType<{ className?: string }>> = {
  brand: Megaphone,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  purple: Sparkles,
};

/* ---------- Dismissible banner ---------- */
function DismissibleBanner({ tone, title, children }: { tone: Tone; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const Icon = TONE_ICON[tone];
  const s = TONE_STYLES[tone];
  return (
    <div className={cn("relative flex items-start gap-3 rounded-xl border p-4", s.wrap)}>
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", s.iconBg)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-semibold", s.title)}>{title}</p>
        <div className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">{children}</div>
      </div>
      <button
        onClick={() => setOpen(false)}
        className="rounded-md p-1 text-gray-400 transition-colors hover:bg-white/40 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-gray-200"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function BannersPage() {
  const [stickyOpen, setStickyOpen] = useState(true);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Banners"
        description="Persistent messages that sit above content — announcements, warnings, errors, success, info, upgrade prompts, and promotional gradients."
        breadcrumbs={[{ label: "UI Components" }, { label: "Banners" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Announcement */}
        <Card>
          <CardHeader title="Announcement" description="Highlight a new feature or event" />
          <CardBody>
            <div className={cn("flex items-center gap-3 rounded-xl border p-4", TONE_STYLES.brand.wrap)}>
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", TONE_STYLES.brand.iconBg)}>
                <Megaphone className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-semibold", TONE_STYLES.brand.title)}>Nimbus Pro 2.4 is live</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Command palette, 6 new chart types, and a redesigned settings panel. <button className="font-semibold text-brand-600 underline-offset-2 hover:underline dark:text-brand-400">Read the changelog →</button></p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Warning */}
        <Card>
          <CardHeader title="Warning" description="Non-blocking caution" />
          <CardBody>
            <div className={cn("flex items-center gap-3 rounded-xl border p-4", TONE_STYLES.warning.wrap)}>
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", TONE_STYLES.warning.iconBg)}>
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-semibold", TONE_STYLES.warning.title)}>Storage 92% full</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Free up space or upgrade your plan to keep uploads running.</p>
              </div>
              <Button size="sm" variant="secondary" className="shrink-0">Manage</Button>
            </div>
          </CardBody>
        </Card>

        {/* Error */}
        <Card>
          <CardHeader title="Error" description="Blocking failure requiring action" />
          <CardBody>
            <div className={cn("flex items-center gap-3 rounded-xl border p-4", TONE_STYLES.error.wrap)}>
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", TONE_STYLES.error.iconBg)}>
                <XCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-semibold", TONE_STYLES.error.title)}>Payment failed</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Your Pro subscription is paused. Update your billing details to resume.</p>
              </div>
              <Button size="sm" variant="danger" className="shrink-0">Fix now</Button>
            </div>
          </CardBody>
        </Card>

        {/* Success */}
        <Card>
          <CardHeader title="Success" description="Confirmation after an action" />
          <CardBody>
            <div className={cn("flex items-center gap-3 rounded-xl border p-4", TONE_STYLES.success.wrap)}>
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", TONE_STYLES.success.iconBg)}>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-semibold", TONE_STYLES.success.title)}>Email verified</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Thanks for confirming — your account is now fully activated.</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Info */}
        <Card>
          <CardHeader title="Info" description="Neutral, non-urgent update" />
          <CardBody>
            <div className={cn("flex items-center gap-3 rounded-xl border p-4", TONE_STYLES.info.wrap)}>
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", TONE_STYLES.info.iconBg)}>
                <Info className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-semibold", TONE_STYLES.info.title)}>Scheduled maintenance</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Nimbus Pro will be briefly unavailable on Saturday, 02:00–02:30 UTC.</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Upgrade prompt (purple) */}
        <Card>
          <CardHeader title="Upgrade Prompt" description="Card-style upsell with CTA" />
          <CardBody>
            <div className={cn("relative overflow-hidden rounded-xl border p-5", TONE_STYLES.purple.wrap)}>
              <div className="flex items-start gap-4">
                <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", TONE_STYLES.purple.iconBg)}>
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={cn("text-sm font-semibold", TONE_STYLES.purple.title)}>Upgrade to Team</p>
                    <Badge tone="purple" variant="soft">Save 20%</Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Unlock unlimited workspaces, advanced roles, and priority support. Annual plans billed yearly.</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Button size="sm" variant="primary">
                      <ArrowRight className="h-3.5 w-3.5" /> Upgrade now
                    </Button>
                    <Button size="sm" variant="ghost">Compare plans</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Gradient promotional */}
        <Card>
          <CardHeader title="Gradient Promotional" description="Bold, full-bleed gradient with confetti" />
          <CardBody>
            <div className="relative overflow-hidden rounded-xl gradient-bg p-5 text-white">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-6 h-32 w-32 rounded-full bg-white/10" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Gift className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Holiday gift — 3 months free</p>
                    <Badge tone="gray" variant="solid" className="bg-white/20 text-white">Limited time</Badge>
                  </div>
                  <p className="mt-1 text-sm text-white/90">Upgrade to Annual this week and get three extra months on us. No code needed.</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 transition-transform hover:scale-105">
                      <Gift className="h-3.5 w-3.5" /> Claim gift
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Dismissible */}
        <Card>
          <CardHeader title="Dismissible" description="User can close — state persists" />
          <CardBody className="space-y-3">
            <DismissibleBanner tone="info" title="What&apos;s new in 2.4">
              <p>Try the new command palette — press <kbd className="rounded bg-white/70 px-1 py-0.5 text-[10px] font-semibold dark:bg-white/10">⌘K</kbd> anywhere.</p>
            </DismissibleBanner>
            <DismissibleBanner tone="warning" title="Browser unsupported">
              <p>You&apos;re using an older browser. Some features may not work as expected.</p>
            </DismissibleBanner>
            <p className="text-xs text-gray-500">Click the × on either banner to dismiss it for this session.</p>
          </CardBody>
        </Card>

        {/* Sticky full-width */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Sticky Full-Width"
            description="Sits at the top of the viewport until dismissed"
            action={
              <Button size="sm" variant="ghost" onClick={() => setStickyOpen(true)} disabled={stickyOpen}>
                <RefreshCw className="h-3.5 w-3.5" /> Reset
              </Button>
            }
          />
          <CardBody>
            {stickyOpen ? (
              <div className={cn("relative flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center", TONE_STYLES.brand.wrap)}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/60 dark:bg-white/10">
                  <Megaphone className={cn("h-4 w-4", TONE_STYLES.brand.icon)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-sm font-semibold", TONE_STYLES.brand.title)}>
                    We&apos;ve updated our Terms of Service
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    By continuing to use Nimbus Pro after May 1, you agree to the revised terms.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button size="sm" variant="primary">Review changes</Button>
                  <IconButton aria-label="Dismiss" onClick={() => setStickyOpen(false)} className="bg-white/60 dark:bg-white/10">
                    <X className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center text-xs text-gray-500 dark:border-gray-800">
                Banner dismissed — click <span className="font-semibold text-brand-600">Reset</span> to bring it back.
              </div>
            )}
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card className="lg:col-span-2">
          <CardHeader title="Anatomy & Tips" description="Banner vs alert vs toast" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Banner</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Persistent, sits above content. Use for things the user must know but can dismiss.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Alert</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">In-page, contextual. Tied to a specific form or section.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Toast</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Transient, overlays UI. Use for action confirmations.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Modal</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Blocking. Reserve for things the user MUST address before continuing.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
