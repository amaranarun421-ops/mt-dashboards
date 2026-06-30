"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Tabs } from "@/components/shared/tabs";
import {
  TabsIcon,
  User,
  MailIcon,
  StarIcon,
  CheckSquareIcon,
  BellIcon,
  CreditCardIcon,
} from "@/components/Layouts/sidebar/icons";

export default function TabsClient() {
  const [underline, setUnderline] = React.useState("overview");
  const [pills, setPills] = React.useState("activity");
  const [boxed, setBoxed] = React.useState("profile");
  const [icons, setIcons] = React.useState("inbox");
  const [badges, setBadges] = React.useState("all");
  const [vertical, setVertical] = React.useState("general");

  return (
    <>
      <PageHeader
        title="Tabs"
        description="Three visual variants — underline, pills and boxed — with icons, badges and a vertical orientation."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/tabs" },
          { label: "Tabs" },
        ]}
        actions={
          <Badge variant="primary">
            <TabsIcon className="size-3.5" /> 3 variants
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader title="Underline tabs" subtitle="Default minimalist style." />
          <Tabs
            value={underline}
            onChange={setUnderline}
            tabs={[
              { value: "overview", label: "Overview" },
              { value: "analytics", label: "Analytics" },
              { value: "reports", label: "Reports" },
              { value: "settings", label: "Settings" },
            ]}
          />
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Active tab: <span className="font-semibold text-dark dark:text-white">{underline}</span>.
            Underline tabs work best for primary page-level navigation.
          </p>
        </Card>

        <Card>
          <CardHeader title="Pills tabs" subtitle="Soft background, contained look." />
          <Tabs
            value={pills}
            onChange={setPills}
            variant="pills"
            tabs={[
              { value: "activity", label: "Activity" },
              { value: "timeline", label: "Timeline" },
              { value: "notes", label: "Notes" },
              { value: "files", label: "Files" },
            ]}
          />
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Active tab: <span className="font-semibold text-dark dark:text-white">{pills}</span>.
            Pills are great for filters and segmented controls inside cards.
          </p>
        </Card>

        <Card>
          <CardHeader title="Boxed tabs" subtitle="Bordered container with solid active state." />
          <Tabs
            value={boxed}
            onChange={setBoxed}
            variant="boxed"
            tabs={[
              { value: "profile", label: "Profile" },
              { value: "security", label: "Security" },
              { value: "billing", label: "Billing" },
              { value: "integrations", label: "Integrations" },
            ]}
          />
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Active tab: <span className="font-semibold text-dark dark:text-white">{boxed}</span>.
            Boxed tabs draw more attention to the active state with a solid fill.
          </p>
        </Card>

        <Card>
          <CardHeader
            title="With icons"
            subtitle="Lead icons make tabs scannable at a glance."
          />
          <Tabs
            value={icons}
            onChange={setIcons}
            variant="underline"
            tabs={[
              { value: "inbox", label: "Inbox", icon: <MailIcon className="size-4" /> },
              { value: "tasks", label: "Tasks", icon: <CheckSquareIcon className="size-4" /> },
              { value: "starred", label: "Starred", icon: <StarIcon className="size-4" /> },
              { value: "alerts", label: "Alerts", icon: <BellIcon className="size-4" /> },
            ]}
          />
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Active tab: <span className="font-semibold text-dark dark:text-white">{icons}</span>.
          </p>
        </Card>

        <Card>
          <CardHeader
            title="With badges"
            subtitle="Numeric indicators surface counts on each tab."
          />
          <Tabs
            value={badges}
            onChange={setBadges}
            variant="pills"
            tabs={[
              { value: "all", label: "All", badge: <Badge variant="neutral" size="sm">128</Badge> },
              { value: "open", label: "Open", badge: <Badge variant="primary" size="sm">14</Badge> },
              { value: "pending", label: "Pending", badge: <Badge variant="accent" size="sm">6</Badge> },
              { value: "closed", label: "Closed", badge: <Badge variant="success" size="sm">108</Badge> },
            ]}
          />
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Active tab: <span className="font-semibold text-dark dark:text-white">{badges}</span>.
          </p>
        </Card>

        <Card>
          <CardHeader
            title="Vertical tabs"
            subtitle="A sidebar-style tab list rendered alongside the panel."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
            <div className="flex flex-col gap-1">
              {[
                { value: "general", label: "General", icon: <User className="size-4" /> },
                { value: "notifications", label: "Notifications", icon: <BellIcon className="size-4" /> },
                { value: "billing", label: "Billing", icon: <CreditCardIcon className="size-4" /> },
                { value: "integrations", label: "Integrations", icon: <MailIcon className="size-4" /> },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => setVertical(t.value)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                    vertical === t.value
                      ? "bg-primary text-white"
                      : "text-dark-7 hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
              {vertical === "general" && (
                <p className="text-sm text-dark-5 dark:text-dark-6">
                  General settings let you configure workspace name, default
                  landing page and timezone.
                </p>
              )}
              {vertical === "notifications" && (
                <p className="text-sm text-dark-5 dark:text-dark-6">
                  Choose which events trigger email, push and in-app
                  notifications.
                </p>
              )}
              {vertical === "billing" && (
                <p className="text-sm text-dark-5 dark:text-dark-6">
                  Manage your plan, payment method, invoices and download
                  receipts.
                </p>
              )}
              {vertical === "integrations" && (
                <p className="text-sm text-dark-5 dark:text-dark-6">
                  Connect Slack, GitHub, Stripe and 40+ other apps to your
                  workspace.
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
