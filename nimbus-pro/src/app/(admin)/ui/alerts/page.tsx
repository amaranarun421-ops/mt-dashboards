"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  X,
  RefreshCw,
  ArrowRight,
  Bell,
} from "lucide-react";

type Tone = "info" | "success" | "warning" | "error" | "brand";

const TONE_STYLES: Record<Tone, { wrap: string; iconWrap: string; icon: React.ComponentType<{ className?: string }>; title: string; action: string }> = {
  info: {
    wrap: "border-accent-200 bg-accent-50 dark:border-accent-800/50 dark:bg-accent-500/10",
    iconWrap: "bg-accent-100 text-accent-600 dark:bg-accent-500/20 dark:text-accent-300",
    icon: Info,
    title: "text-accent-900 dark:text-accent-200",
    action: "text-accent-700 hover:text-accent-800 dark:text-accent-300",
  },
  success: {
    wrap: "border-success-200 bg-success-50 dark:border-success-800/50 dark:bg-success-500/10",
    iconWrap: "bg-success-100 text-success-600 dark:bg-success-500/20 dark:text-success-300",
    icon: CheckCircle2,
    title: "text-success-900 dark:text-success-200",
    action: "text-success-700 hover:text-success-800 dark:text-success-300",
  },
  warning: {
    wrap: "border-warning-200 bg-warning-50 dark:border-warning-800/50 dark:bg-warning-500/10",
    iconWrap: "bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-300",
    icon: AlertTriangle,
    title: "text-warning-900 dark:text-warning-200",
    action: "text-warning-700 hover:text-warning-800 dark:text-warning-300",
  },
  error: {
    wrap: "border-error-200 bg-error-50 dark:border-error-800/50 dark:bg-error-500/10",
    iconWrap: "bg-error-100 text-error-600 dark:bg-error-500/20 dark:text-error-300",
    icon: XCircle,
    title: "text-error-900 dark:text-error-200",
    action: "text-error-700 hover:text-error-800 dark:text-error-300",
  },
  brand: {
    wrap: "border-brand-200 bg-brand-50 dark:border-brand-800/50 dark:bg-brand-500/10",
    iconWrap: "bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-300",
    icon: Sparkles,
    title: "text-brand-900 dark:text-brand-200",
    action: "text-brand-700 hover:text-brand-800 dark:text-brand-300",
  },
};

function Alert({
  tone,
  title,
  children,
  action,
  onClose,
  icon: CustomIcon,
}: {
  tone: Tone;
  title?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const s = TONE_STYLES[tone];
  const Icon = CustomIcon ?? s.icon;
  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-4", s.wrap)}>
      <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-lg", s.iconWrap)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        {title && <p className={cn("text-sm font-semibold", s.title)}>{title}</p>}
        {children && <p className={cn("text-sm", title ? "mt-0.5 text-gray-600 dark:text-gray-300" : "text-gray-700 dark:text-gray-200")}>{children}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn("shrink-0 rounded-md p-1 transition-colors", s.action)}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function AlertsPage() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});

  const dismiss = (id: string) => setDismissed((d) => ({ ...d, [id]: true }));
  const reset = () => setDismissed({});

  return (
    <div className="space-y-4">
      <PageHeader
        title="Alerts"
        description="Five tones × multiple variants — info, success, warning, error, brand — with actions and dismiss."
        breadcrumbs={[{ label: "UI Components" }, { label: "Alerts" }]}
        actions={
          <Button variant="outline" size="sm" onClick={reset}>
            <RefreshCw className="h-3.5 w-3.5" /> Reset dismiss
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Tones — simple */}
        <Card>
          <CardHeader title="Tones" description="Five semantic colors — built using a lookup map" />
          <CardBody className="space-y-3">
            <Alert tone="info">A new software update is available. See what&rsquo;s new in version 3.2.</Alert>
            <Alert tone="success">Your payment was processed successfully.</Alert>
            <Alert tone="warning">Your storage is 85% full. Consider upgrading your plan.</Alert>
            <Alert tone="error">There were 2 errors while submitting the form.</Alert>
            <Alert tone="brand">Welcome to Nimbus Pro! Complete your profile to unlock all features.</Alert>
          </CardBody>
        </Card>

        {/* With title + description */}
        <Card>
          <CardHeader title="With Title & Description" description="Two-line layout for more context" />
          <CardBody className="space-y-3">
            <Alert tone="info" title="Heads up">
              You can update your preferences at any time in your account settings.
            </Alert>
            <Alert tone="success" title="Deployment successful">
              Build #2349 went live 2 minutes ago. View the release notes for full details.
            </Alert>
            <Alert tone="warning" title="Approaching limit">
              You&rsquo;ve used 92% of your monthly API quota. Upgrade to avoid interruptions.
            </Alert>
            <Alert tone="error" title="Connection failed">
              Couldn&rsquo;t reach the billing service. Retrying in 30 seconds.
            </Alert>
          </CardBody>
        </Card>

        {/* With action button */}
        <Card>
          <CardHeader title="With Action Button" description="Inline CTA inside the alert" />
          <CardBody className="space-y-3">
            <Alert
              tone="brand"
              title="Try Pro free for 14 days"
              action={
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="primary" size="sm">Start trial</Button>
                  <Button variant="ghost" size="sm">Maybe later</Button>
                </div>
              }
            >
              Unlock advanced analytics, unlimited projects, and priority support.
            </Alert>
            <Alert
              tone="warning"
              title="Storage almost full"
              action={
                <Button variant="outline" size="sm">
                  Upgrade plan <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              }
            >
              You have 1.2 GB of 2 GB used.
            </Alert>
            <Alert
              tone="error"
              title="Payment failed"
              action={
                <Button variant="danger" size="sm">Update card</Button>
              }
            >
              Your subscription was paused. Update your payment method to continue.
            </Alert>
          </CardBody>
        </Card>

        {/* Dismissible */}
        <Card>
          <CardHeader title="Dismissible" description="Click X to remove — resets with the button above" />
          <CardBody className="space-y-3">
            {!dismissed.a && <Alert tone="info" title="Scheduled maintenance" onClose={() => dismiss("a")}>The platform will be down on Sunday 2–4 AM UTC.</Alert>}
            {!dismissed.b && <Alert tone="success" title="Welcome aboard" onClose={() => dismiss("b")}>Your account is ready. Start by inviting your team.</Alert>}
            {!dismissed.c && <Alert tone="warning" title="Action needed" onClose={() => dismiss("c")}>Please verify your email address.</Alert>}
            {!dismissed.d && <Alert tone="error" title="Build broken" onClose={() => dismiss("d")}>The latest commit failed CI checks.</Alert>}
            {dismissed.a && dismissed.b && dismissed.c && dismissed.d && (
              <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700">
                All alerts dismissed. Click &ldquo;Reset dismiss&rdquo; in the page header to bring them back.
              </div>
            )}
          </CardBody>
        </Card>

        {/* With custom icon */}
        <Card>
          <CardHeader title="Custom Icons" description="Override the default tone icon" />
          <CardBody className="space-y-3">
            <Alert tone="brand" icon={Sparkles} title="New feature">
              Real-time collaboration is now live for all team plans.
            </Alert>
            <Alert tone="info" icon={Bell} title="Notification">
              You have 3 unread mentions in the design channel.
            </Alert>
            <Alert tone="success" icon={CheckCircle2} title="All systems operational">
              All services are running normally. Last checked 30 seconds ago.
            </Alert>
          </CardBody>
        </Card>

        {/* Inline alerts */}
        <Card>
          <CardHeader title="Inline Alerts" description="Compact alerts inside forms and panels" />
          <CardBody>
            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Account settings</p>
                <p className="mb-3 text-xs text-gray-500">Manage your profile and security preferences.</p>
                <Alert tone="success">Changes saved successfully.</Alert>
              </div>
              <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Two-factor authentication</p>
                <p className="mb-3 text-xs text-gray-500">Add an extra layer of security to your account.</p>
                <Alert tone="error" title="Code expired">
                  The verification code has expired. Request a new one.
                </Alert>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-warning-200 bg-warning-50 px-3 py-2 dark:border-warning-800/50 dark:bg-warning-500/10">
                <AlertTriangle className="h-4 w-4 shrink-0 text-warning-600 dark:text-warning-300" />
                <p className="text-xs text-warning-800 dark:text-warning-200">Unsaved changes will be lost if you leave this page.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Banner example */}
      <Card>
        <CardHeader title="Banner" description="Full-width alert for site-wide notices" />
        <CardBody>
          <div className="gradient-bg flex items-center justify-between gap-3 rounded-xl p-4 text-white">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Nimbus Pro v3.2 is here</p>
                <p className="text-xs text-white/80">Real-time collaboration, AI insights, and 12 new dashboard widgets.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" className="border-0 bg-white/20 text-white hover:bg-white/30">
                Read changelog
              </Button>
              <button
                onClick={() => dismiss("banner")}
                className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/20"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {dismissed.banner && (
            <p className="mt-2 text-xs text-gray-500">Banner dismissed.</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
