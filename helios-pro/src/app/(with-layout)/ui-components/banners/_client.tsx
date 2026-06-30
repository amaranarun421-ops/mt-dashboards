"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Banner } from "@/components/shared/banner";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import {
  BannerIcon,
  BellIcon,
  CheckIcon,
  AlertTriangleIcon,
  XCircleIcon,
  RocketIcon,
  BookIcon,
  RefreshCwIcon,
} from "@/components/Layouts/sidebar/icons";

export default function BannersClient() {
  const [dismissed, setDismissed] = React.useState<Record<string, boolean>>({});
  const close = (id: string) =>
    setDismissed((prev) => ({ ...prev, [id]: true }));

  return (
    <>
      <div className="sticky top-0 z-30 -mx-4 mb-6 space-y-2 px-4 sm:-mx-6 lg:-mx-8">
        {!dismissed["sticky"] && (
          <Banner
            tone="primary"
            icon={<RocketIcon className="size-5" />}
            title="Helios Pro 2.4 is here"
            description="Dark-mode polish, 30% faster queries and a brand-new Logistics dashboard. Upgrade from Settings → General."
            action={
              <Button size="sm" variant="primary">
                <BookIcon className="size-4" /> Release notes
              </Button>
            }
            onClose={() => close("sticky")}
          />
        )}
      </div>

      <PageHeader
        title="Banners"
        description="Six banner patterns built on the shared Banner component — from sticky top-of-page notices to inline callouts inside cards."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/banners" },
          { label: "Banners" },
        ]}
        actions={
          <Badge variant="primary">
            <BannerIcon className="size-3.5" /> 6 patterns
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="All tones"
            subtitle="Info, success, warning, danger and primary in one place."
          />
          <div className="space-y-3">
            <Banner
              tone="info"
              icon={<BellIcon className="size-5" />}
              title="Scheduled maintenance"
              description="Helios Pro will be read-only on Sat 02:00–02:30 UTC for infrastructure upgrades."
            />
            <Banner
              tone="success"
              icon={<CheckIcon className="size-5" />}
              title="Workspace verified"
              description="Your domain heliospro.com has been verified. SSO is now available to all members."
            />
            <Banner
              tone="warning"
              icon={<AlertTriangleIcon className="size-5" />}
              title="Storage almost full"
              description="You have used 92% of your 50 GB plan. Upgrade to Pro for 1 TB and team features."
            />
            <Banner
              tone="danger"
              icon={<XCircleIcon className="size-5" />}
              title="Billing action required"
              description="Your last payment failed. Update your payment method to avoid service interruption."
            />
            <Banner
              tone="primary"
              icon={<RocketIcon className="size-5" />}
              title="Welcome to Helios Pro"
              description="Your workspace is ready. Invite teammates to start collaborating on dashboards and reports."
            />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="With actions"
            subtitle="Single or paired buttons give the user an immediate next step."
          />
          <div className="space-y-3">
            <Banner
              tone="info"
              title="New version available"
              description="Helios Pro 2.4 ships dark-mode polish and 30% faster queries."
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
            />
            <Banner
              tone="warning"
              title="Verify your email"
              description="Some features are locked until you verify your email address."
              action={
                <Button size="sm" variant="accent">
                  Resend email
                </Button>
              }
            />
            <Banner
              tone="danger"
              title="Suspicious login blocked"
              description="We blocked a sign-in attempt from Lagos, Nigeria on Apr 12 at 09:14 UTC."
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
            />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Dismissible"
            subtitle="Click the close button to remove a banner — refresh restores it."
          />
          <div className="space-y-3">
            {!dismissed["d1"] && (
              <Banner
                tone="success"
                icon={<CheckIcon className="size-5" />}
                title="Profile saved"
                description="Your profile changes are now live across the workspace."
                onClose={() => close("d1")}
              />
            )}
            {!dismissed["d2"] && (
              <Banner
                tone="info"
                icon={<BellIcon className="size-5" />}
                title="Weekly digest enabled"
                description="You'll get a Monday-morning summary of activity in your inbox."
                onClose={() => close("d2")}
              />
            )}
            {!dismissed["d3"] && (
              <Banner
                tone="warning"
                icon={<AlertTriangleIcon className="size-5" />}
                title="Rate limit approaching"
                description="You have used 88% of your monthly API quota."
                onClose={() => close("d3")}
              />
            )}
            {Object.keys(dismissed).filter((k) => k !== "sticky").length === 3 && (
              <p className="rounded-xl border border-dashed border-stroke p-4 text-center text-sm text-dark-5 dark:border-dark-3 dark:text-dark-6">
                All inline banners dismissed. The sticky banner at the top can
                also be dismissed. Refresh the page to restore.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Sticky top"
            subtitle="The banner above this page header is sticky — scroll to see it stay put."
          />
          <p className="text-sm text-dark-5 dark:text-dark-6">
            Sticky banners are ideal for system-wide notices that should follow
            the user as they scroll. The banner at the very top of this page is
            rendered in a <code>sticky top-0</code> container with the same
            <code> Banner</code> component, plus an action button and a close
            affordance. Dismiss it and it stays gone until refresh.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDismissed((p) => ({ ...p, sticky: false }))}
            >
              <RefreshCwIcon className="size-4" /> Restore sticky banner
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDismissed({})}
            >
              Restore all
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Inline"
            subtitle="Compact banners for placement inside cards, drawers and modals."
          />
          <div className="space-y-2">
            <Banner
              tone="success"
              title="Sync completed — 1,204 items updated."
            />
            <Banner
              tone="danger"
              title="Webhook delivery failed after 3 retries."
            />
            <Banner
              tone="info"
              title="4 new comments on your Q3 finance report."
            />
            <Banner
              tone="warning"
              title="Rate limit at 80% — consider caching responses."
            />
          </div>
        </Card>
      </div>
    </>
  );
}
