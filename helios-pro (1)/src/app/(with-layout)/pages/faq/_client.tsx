"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Accordion } from "@/components/shared/accordion";
import { EmptyState } from "@/components/shared/empty-state";
import { Tabs } from "@/components/shared/tabs";
import {
  HelpCircleIcon,
  MailIcon,
  ChatIcon,
  BookIcon,
  CheckIcon,
} from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";
import {
  faqCategories,
  faqItems,
  type FaqCategory,
} from "@/data/pages/faq";

export default function FaqClient() {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<"All" | FaqCategory>("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqItems.filter((item) => {
      const matchesCategory = active === "All" || item.category === active;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [query, active]);

  const categoryTabs = [
    { value: "All", label: `All (${faqItems.length})` },
    ...faqCategories.map((c) => ({
      value: c,
      label: `${c} (${faqItems.filter((i) => i.category === c).length})`,
    })),
  ];

  const grouped =
    active === "All"
      ? faqCategories
          .map((c) => ({
            category: c,
            items: filtered.filter((i) => i.category === c),
          }))
          .filter((g) => g.items.length > 0)
      : [{ category: active, items: filtered }];

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Find quick answers to common questions about Helios Pro — from getting started to billing, security, integrations and the API."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Pages", href: "/pages/faq" },
          { label: "FAQ" },
        ]}
        actions={
          <Badge variant="info">
            <HelpCircleIcon className="size-3.5" /> {faqItems.length} articles
          </Badge>
        }
      />

      {/* SEARCH */}
      <Card className="mb-6">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={'Search the FAQ — try "SSO", "refund", "rate limit"…'}
            className="w-full rounded-xl border border-stroke bg-white py-3 pl-11 pr-4 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-6 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:placeholder:text-dark-6"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-dark-5 transition hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-white/10"
              aria-label="Clear search"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-dark-5 dark:text-dark-6">
          Showing{" "}
          <strong className="text-dark dark:text-white">{filtered.length}</strong>{" "}
          of {faqItems.length} articles
          {active !== "All" && (
            <>
              {" "}in{" "}
              <strong className="text-primary">{active}</strong>
            </>
          )}
          {query && (
            <>
              {" "}matching{" "}
              <strong className="text-dark dark:text-white">
                &ldquo;{query}&rdquo;
              </strong>
            </>
          )}
          .
        </p>
      </Card>

      {/* CATEGORY TABS */}
      <div className="mb-6 overflow-x-auto">
        <Tabs
          variant="pills"
          value={active}
          onChange={(v) => setActive(v as "All" | FaqCategory)}
          tabs={categoryTabs}
        />
      </div>

      {/* RESULTS */}
      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            size="lg"
            icon={<HelpCircleIcon className="size-8" />}
            title="No articles match your search"
            description={
              query
                ? `Nothing in the FAQ matches "${query}". Try a different keyword, or reach out to our team.`
                : "No articles in this category yet. Try another category or contact support."
            }
            action={
              <div className="flex gap-2">
                {query && (
                  <Button variant="outline" size="sm" onClick={() => setQuery("")}>
                    Clear search
                  </Button>
                )}
                <Button size="sm">
                  <MailIcon className="size-4" /> Contact support
                </Button>
              </div>
            }
          />
        </Card>
      ) : (
        <div className="space-y-8">
          {grouped.map((group) => (
            <section key={group.category}>
              <CardHeader
                title={
                  <span className="flex items-center gap-2">
                    {group.category}
                    <Badge variant="neutral" size="sm">
                      {group.items.length}
                    </Badge>
                  </span>
                }
                subtitle={
                  group.category === "Getting Started"
                    ? "Getting off the ground in under 5 minutes."
                    : group.category === "Billing"
                      ? "Plans, payments, refunds and invoices."
                      : group.category === "Security"
                        ? "Encryption, compliance and data residency."
                        : group.category === "Integrations"
                          ? "Connectors, custom integrations and sync cadence."
                          : "REST, GraphQL, SDKs, rate limits and auth."
                }
              />
              <Accordion
                items={group.items.map((item) => ({
                  value: item.id,
                  title: item.question,
                  content: item.answer,
                }))}
                defaultOpen={[group.items[0].id]}
                multiple
              />
            </section>
          ))}
        </div>
      )}

      {/* CONTACT CTA */}
      <section className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card hover>
          <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
            <MailIcon className="size-5" />
          </div>
          <h3 className="text-base font-semibold text-dark dark:text-white">
            Email support
          </h3>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Reach our team at{" "}
            <span className="font-medium text-primary">
              support@heliospro.io
            </span>
            . We reply within a few hours, Monday to Friday.
          </p>
          <Button variant="soft" size="sm" className="mt-4">
            <MailIcon className="size-4" /> Email us
          </Button>
        </Card>
        <Card hover>
          <div className="mb-4 grid size-11 place-items-center rounded-xl bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light">
            <ChatIcon className="size-5" />
          </div>
          <h3 className="text-base font-semibold text-dark dark:text-white">
            Live chat
          </h3>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Chat with our team in real time — available 8am to 8pm UTC on
            weekdays. Average response: under 2 minutes.
          </p>
          <Button variant="soft" size="sm" className="mt-4">
            <ChatIcon className="size-4" /> Start a chat
          </Button>
        </Card>
        <Card hover>
          <div className="mb-4 grid size-11 place-items-center rounded-xl bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light">
            <BookIcon className="size-5" />
          </div>
          <h3 className="text-base font-semibold text-dark dark:text-white">
            Help center
          </h3>
          <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
            Browse guides, tutorials, the API reference and troubleshooting
            steps in our full help center.
          </p>
          <Button variant="soft" size="sm" className="mt-4">
            <BookIcon className="size-4" /> Open help center
          </Button>
        </Card>
      </section>

      {/* BOTTOM BANNER */}
      <section className="mt-8">
        <Card className="flex flex-col items-start justify-between gap-4 bg-primary-subtle/60 dark:bg-primary/10 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-white">
              <CheckIcon className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-dark dark:text-white">
                Did we answer your question?
              </h3>
              <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">
                If not, our team is one click away. We typically reply within a
                few hours during business days.
              </p>
            </div>
          </div>
          <Button>
            <MailIcon className="size-4" /> Contact support
          </Button>
        </Card>
      </section>
    </>
  );
}
