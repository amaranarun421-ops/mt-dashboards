"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Accordion } from "@/components/shared/accordion";
import {
  AccordionIcon,
  User,
  CreditCardIcon,
  BellIcon,
  ShieldIcon,
  KeyIcon,
} from "@/components/Layouts/sidebar/icons";

function CustomChevron({ open }: { open: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform ${open ? "rotate-90" : ""}`}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AccordionsClient() {
  const [flushOpen, setFlushOpen] = React.useState<string | null>("f1");
  const [custom, setCustom] = React.useState<string | null>("c1");

  return (
    <>
      <PageHeader
        title="Accordions"
        description="Collapsible sections for FAQs and grouped content — single or multiple open, with descriptions, icons and flush style."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/accordions" },
          { label: "Accordions" },
        ]}
        actions={
          <Badge variant="primary">
            <AccordionIcon className="size-3.5" /> 6 patterns
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader title="Basic accordion" subtitle="Single-open by default." />
          <Accordion
            items={[
              {
                value: "b1",
                title: "What is Helios Pro?",
                content:
                  "Helios Pro is a premium Next.js admin dashboard UI kit with 100+ pages, advanced data tables, charts, apps, ecommerce, auth, and a refined design system.",
              },
              {
                value: "b2",
                title: "Which framework does it use?",
                content:
                  "Helios Pro is built on Next.js 16 with the App Router, React 19 and TypeScript 5. Styling is Tailwind CSS v4 with a custom design-token layer.",
              },
              {
                value: "b3",
                title: "Can I use it for client work?",
                content:
                  "Yes — the license covers unlimited personal and commercial projects. You may not resell the kit as a standalone product.",
              },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="With descriptions"
            subtitle="Each header shows a short subtitle below the title."
          />
          <Accordion
            defaultOpen={["d1"]}
            items={[
              {
                value: "d1",
                title: "Getting started",
                description: "Set up your first workspace in under 5 minutes.",
                content:
                  "Create a workspace, invite your teammates, then connect a data source. Helios Pro auto-generates a starter dashboard you can customize.",
              },
              {
                value: "d2",
                title: "Importing data",
                description: "CSV, Postgres, BigQuery, Stripe and more.",
                content:
                  "Open the data sources page, pick a connector, paste your credentials and pick the tables you want to sync. Refreshes happen every 15 minutes by default.",
              },
              {
                value: "d3",
                title: "Sharing dashboards",
                description: "Public links, embedded iframes or PDF exports.",
                content:
                  "Click Share on any dashboard to generate a public link, embed snippet or schedule a PDF email. You can revoke access at any time.",
              },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="Multiple open"
            subtitle="Pass the multiple prop to keep several panels expanded."
          />
          <Accordion
            multiple
            defaultOpen={["m1", "m3"]}
            items={[
              {
                value: "m1",
                title: "Billing & invoices",
                content:
                  "You can change your plan, update the payment method and download invoices from the Billing settings page.",
              },
              {
                value: "m2",
                title: "Team members",
                content:
                  "Invite up to the seat limit of your plan. Each member can be assigned a role: Viewer, Editor or Admin.",
              },
              {
                value: "m3",
                title: "API access",
                content:
                  "Generate personal access tokens from the API keys page. Tokens inherit your permissions and expire after 90 days by default.",
              },
              {
                value: "m4",
                title: "Audit log",
                content:
                  "Every important action — sign-in, role change, data export — is recorded in the audit log and retained for 90 days.",
              },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="With icons"
            subtitle="Lead icons help differentiate sections at a glance."
          />
          <Accordion
            defaultOpen={["i1"]}
            items={[
              {
                value: "i1",
                title: (
                  <span className="flex items-center gap-2">
                    <User className="size-4 text-primary" /> Account
                  </span>
                ),
                content:
                  "Manage your display name, avatar, email and password from the Account section.",
              },
              {
                value: "i2",
                title: (
                  <span className="flex items-center gap-2">
                    <ShieldIcon className="size-4 text-primary" /> Security
                  </span>
                ),
                content:
                  "Enable two-factor authentication, review active sessions and revoke suspicious devices.",
              },
              {
                value: "i3",
                title: (
                  <span className="flex items-center gap-2">
                    <BellIcon className="size-4 text-primary" /> Notifications
                  </span>
                ),
                content:
                  "Choose which events trigger email, push and in-app notifications. You can mute specific workspaces too.",
              },
              {
                value: "i4",
                title: (
                  <span className="flex items-center gap-2">
                    <CreditCardIcon className="size-4 text-primary" /> Billing
                  </span>
                ),
                content:
                  "View invoices, update your payment method and switch plans at any time.",
              },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="Flush style"
            subtitle="Borderless panels that sit flush against the card edges."
          />
          <div className="divide-y divide-stroke dark:divide-dark-3">
            {[
              { value: "f1", title: "How do I cancel my subscription?", content: "Open Settings > Billing > Cancel plan. Your workspace stays active until the end of the current billing period." },
              { value: "f2", title: "Do you offer refunds?", content: "Yes — within 14 days of purchase, no questions asked. Contact support@heliospro.io to start a refund." },
              { value: "f3", title: "Can I downgrade mid-cycle?", content: "Yes. The unused balance is credited to your account and applied to the next invoice." },
              { value: "f4", title: "What happens when I exceed my seat limit?", content: "We will email you when you are at 80% and 100% of the limit. New invites are blocked at 100% until you upgrade." },
            ].map((f) => (
              <div key={f.value} className="py-3">
                <button
                  onClick={() => setFlushOpen(flushOpen === f.value ? null : f.value)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <span className="text-sm font-semibold text-dark dark:text-white">
                    {f.title}
                  </span>
                  <span className="grid size-6 place-items-center rounded-md text-dark-5 dark:text-dark-6">
                    <CustomChevron open={flushOpen === f.value} />
                  </span>
                </button>
                {flushOpen === f.value && (
                  <p className="mt-2 text-sm text-dark-5 dark:text-dark-6">
                    {f.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Custom chevron"
            subtitle="Replace the default down-arrow with a right-arrow chevron."
          />
          <div className="space-y-2">
            {[
              { value: "c1", title: "What does the API rate limit look like?", content: "The default limit is 600 requests per minute per workspace. Burst capacity is 2x for up to 10 seconds." },
              { value: "c2", title: "Is there a sandbox environment?", content: "Yes — every workspace has a sandbox mode that uses sample data and never writes to your production sources." },
              { value: "c3", title: "How are secrets stored?", content: "Secrets are encrypted at rest with AES-256 and accessed only by the Helios Pro services that need them. Read more in our security whitepaper." },
            ].map((row) => {
              const isOpen = custom === row.value;
              return (
                <div
                  key={row.value}
                  className={`overflow-hidden rounded-xl border transition-all ${
                    isOpen
                      ? "border-primary/30"
                      : "border-stroke dark:border-dark-3"
                  }`}
                >
                  <button
                    onClick={() => setCustom(isOpen ? null : row.value)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
                      <KeyIcon className="size-4 text-primary" />
                      {row.title}
                    </span>
                    <span
                      className={`grid size-6 place-items-center rounded-md text-dark-5 transition-all dark:text-dark-6 ${
                        isOpen ? "text-primary" : ""
                      }`}
                    >
                      <CustomChevron open={isOpen} />
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-4 pb-4 text-sm text-dark-5 dark:text-dark-6">
                      {row.content}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
}
