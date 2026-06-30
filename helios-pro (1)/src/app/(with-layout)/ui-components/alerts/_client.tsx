"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import {
  AlertIcon,
  BellIcon,
  CheckIcon,
  AlertTriangleIcon,
  XCircleIcon,
} from "@/components/Layouts/sidebar/icons";

type Tone = "info" | "success" | "warning" | "danger" | "primary";

const toneClasses: Record<
  Tone,
  { wrap: string; icon: string; title: string }
> = {
  info: {
    wrap: "border-blue/30 bg-blue-light-5 text-blue-dark dark:bg-blue/10 dark:text-blue-light",
    icon: "bg-blue text-white dark:bg-blue",
    title: "Info",
  },
  success: {
    wrap: "border-primary/30 bg-primary-subtle text-primary-dark dark:bg-primary/10 dark:text-primary-light",
    icon: "bg-primary text-white dark:bg-primary",
    title: "Success",
  },
  warning: {
    wrap: "border-accent/30 bg-accent-subtle text-accent-dark dark:bg-accent/10 dark:text-accent-light",
    icon: "bg-accent text-white dark:bg-accent",
    title: "Warning",
  },
  danger: {
    wrap: "border-red/30 bg-red-light-5 text-red-dark dark:bg-red/10 dark:text-red-light",
    icon: "bg-red text-white dark:bg-red",
    title: "Danger",
  },
  primary: {
    wrap: "border-primary/30 bg-primary-subtle text-primary-dark dark:bg-primary/10 dark:text-primary-light",
    icon: "bg-primary text-white dark:bg-primary",
    title: "Primary",
  },
};

const icons: Record<Tone, React.ReactNode> = {
  info: <InfoIcon className="size-5" />,
  success: <CheckIcon className="size-5" />,
  warning: <AlertTriangleIcon className="size-5" />,
  danger: <XCircleIcon className="size-5" />,
  primary: <BellIcon className="size-5" />,
};

function Alert({
  tone,
  title,
  children,
  action,
  onClose,
}: {
  tone: Tone;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}) {
  const t = toneClasses[tone];
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 ${t.wrap}`}
      role="alert"
    >
      <span
        className={`grid size-8 shrink-0 place-items-center rounded-lg ${t.icon}`}
      >
        {icons[tone]}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-sm opacity-90">{children}</p>
        {action && <div className="mt-2.5">{action}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 rounded p-1 opacity-70 transition hover:opacity-100"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      width="1em"
      height="1em"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 8h.01M11 11h1v5h1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AlertsClient() {
  const [dismissed, setDismissed] = React.useState<Record<string, boolean>>({});

  const close = (id: string) =>
    setDismissed((prev) => ({ ...prev, [id]: true }));

  return (
    <>
      <PageHeader
        title="Alerts"
        description="Inline and banner-style alerts in five tones, with optional actions and dismiss support."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/alerts" },
          { label: "Alerts" },
        ]}
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Inline alerts"
            subtitle="All five tones, contextual content."
          />
          <div className="space-y-3">
            <Alert tone="info" title="Heads up">
              Your trial expires in 7 days. Add a payment method to keep your
              workspace active.
            </Alert>
            <Alert tone="success" title="Payment received">
              We received your payment of $480.00. A receipt has been emailed
              to your billing address.
            </Alert>
            <Alert tone="warning" title="Storage almost full">
              You have used 92% of your 50 GB storage. Consider upgrading or
              removing unused files.
            </Alert>
            <Alert tone="danger" title="Build failed">
              The deploy for commit <code>a3f9c1</code> failed on the test
              stage. Check the CI log for details.
            </Alert>
            <Alert tone="primary" title="Welcome to Helios Pro">
              Your workspace is ready. Invite teammates to start collaborating
              on dashboards.
            </Alert>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="With actions"
            subtitle="Inline buttons give the user an immediate next step."
          />
          <div className="space-y-3">
            <Alert
              tone="info"
              title="New version available"
              action={
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Release notes
                  </Button>
                  <Button size="sm" variant="primary">
                    Upgrade now
                  </Button>
                </div>
              }
            >
              Helios Pro 2.4 ships dark-mode polish and 30% faster queries.
            </Alert>
            <Alert
              tone="warning"
              title="Verify your email"
              action={
                <Button size="sm" variant="accent">
                  Resend email
                </Button>
              }
            >
              Some features are locked until you verify your email address.
            </Alert>
            <Alert
              tone="danger"
              title="Suspicious login blocked"
              action={
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Dismiss
                  </Button>
                  <Button size="sm" variant="danger">
                    Secure account
                  </Button>
                </div>
              }
            >
              We blocked a sign-in attempt from Lagos, Nigeria on Apr 12.
            </Alert>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Dismissible"
            subtitle="Click the close button to remove an alert."
          />
          <div className="space-y-3">
            {!dismissed["a1"] && (
              <Alert
                tone="success"
                title="Profile saved"
                onClose={() => close("a1")}
              >
                Your profile changes are now live across the workspace.
              </Alert>
            )}
            {!dismissed["a2"] && (
              <Alert
                tone="info"
                title="Maintenance window"
                onClose={() => close("a2")}
              >
                Helios Pro will be read-only on Sat 02:00 – 02:30 UTC for
                upgrades.
              </Alert>
            )}
            {!dismissed["a3"] && (
              <Alert
                tone="warning"
                title="Rate limit approaching"
                onClose={() => close("a3")}
              >
                You have used 88% of your monthly API quota.
              </Alert>
            )}
            {Object.keys(dismissed).length === 3 && (
              <p className="rounded-xl border border-dashed border-stroke p-4 text-center text-sm text-dark-5 dark:border-dark-3 dark:text-dark-6">
                All alerts dismissed. Refresh the page to bring them back.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Banner style"
            subtitle="Full-width banner alerts for top-of-page placement."
          />
          <div
            className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent px-4 py-3 text-accent-dark dark:bg-accent/10 dark:text-accent-light"
            role="alert"
          >
            <AlertIcon className="size-5 shrink-0" />
            <p className="flex-1 text-sm font-medium">
              System-wide notice: AI inference is temporarily throttled for
              maintenance until 18:00 UTC.
            </p>
            <Button size="sm" variant="outline" className="shrink-0">
              Status page
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Compact inline"
            subtitle="Smaller padding for inside lists and tables."
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary-subtle px-3 py-2 text-xs font-medium text-primary-dark dark:bg-primary/10 dark:text-primary-light">
              <CheckIcon className="size-4" /> Sync completed — 1,204 items
              updated.
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-red/30 bg-red-light-5 px-3 py-2 text-xs font-medium text-red-dark dark:bg-red/10 dark:text-red-light">
              <XCircleIcon className="size-4" /> Webhook delivery failed after
              3 retries.
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-blue/30 bg-blue-light-5 px-3 py-2 text-xs font-medium text-blue-dark dark:bg-blue/10 dark:text-blue-light">
              <BellIcon className="size-4" /> 4 new comments on your report.
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
