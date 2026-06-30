"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Timeline } from "@/components/shared/timeline";
import { Tabs } from "@/components/shared/tabs";
import {
  RocketIcon,
  CheckIcon,
  AlertIcon,
  WrenchIcon,
  BookIcon,
  FileTextIcon,
  BellIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  changelogVersions,
  type ChangeKind,
} from "@/data/pages/changelog";

const kindMeta: Record<
  ChangeKind,
  {
    label: string;
    variant: "success" | "info" | "danger" | "neutral" | "warning" | "primary";
    icon: React.ReactNode;
  }
> = {
  Added: { label: "Added", variant: "success", icon: <CheckIcon className="size-3" /> },
  Changed: { label: "Changed", variant: "info", icon: <WrenchIcon className="size-3" /> },
  Fixed: { label: "Fixed", variant: "primary", icon: <CheckIcon className="size-3" /> },
  Removed: { label: "Removed", variant: "danger", icon: <AlertIcon className="size-3" /> },
  Deprecated: { label: "Deprecated", variant: "warning", icon: <BellIcon className="size-3" /> },
};

export default function ChangelogClient() {
  const [active, setActive] = React.useState<"all" | string>("all");

  const visibleVersions = React.useMemo(
    () =>
      active === "all"
        ? changelogVersions
        : changelogVersions.filter((v) => v.version === active),
    [active],
  );

  const versionTabs = [
    { value: "all", label: `All (${changelogVersions.length})` },
    ...changelogVersions.map((v) => ({ value: v.version, label: v.version })),
  ];

  return (
    <>
      <PageHeader
        title="Changelog"
        description="Every release of Helios Pro — new features, improvements, fixes and removals, organised by version."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Pages", href: "/pages/changelog" },
          { label: "Changelog" },
        ]}
        actions={
          <div className="flex gap-2">
            <Badge variant="primary">
              <RocketIcon className="size-3.5" /> Latest: {changelogVersions[0].version}
            </Badge>
            <Button variant="outline" size="sm">
              <BellIcon className="size-4" /> Subscribe
            </Button>
          </div>
        }
      />

      {/* FILTER */}
      <Card className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardHeader
              title="Filter by version"
              subtitle="Pick a release to zoom in, or show every version."
              className="mb-0"
            />
          </div>
          <div className="overflow-x-auto">
            <Tabs
              variant="pills"
              size="sm"
              value={active}
              onChange={setActive}
              tabs={versionTabs}
            />
          </div>
        </div>
      </Card>

      {/* TIMELINE OF VERSIONS */}
      {visibleVersions.length === 0 ? (
        <Card>
          <p className="py-8 text-center text-sm text-dark-5 dark:text-dark-6">
            No versions match your filter.
          </p>
        </Card>
      ) : (
        <div className="space-y-8">
          {visibleVersions.map((v) => {
            const counts = v.changes.reduce<Record<ChangeKind, number>>(
              (acc, c) => {
                acc[c.kind] = (acc[c.kind] || 0) + 1;
                return acc;
              },
              { Added: 0, Changed: 0, Fixed: 0, Removed: 0, Deprecated: 0 },
            );
            return (
              <Card key={v.version}>
                {/* HEADER ROW */}
                <div className="flex flex-col items-start justify-between gap-4 border-b border-stroke pb-5 dark:border-dark-3 md:flex-row md:items-center">
                  <div className="flex items-start gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                      <RocketIcon className="size-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold tracking-tight text-dark dark:text-white">
                          {v.version}
                        </h2>
                        <Badge variant="neutral" size="sm">
                          {new Date(v.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm font-medium text-dark dark:text-white">
                        {v.title}
                      </p>
                      {v.highlight && (
                        <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">
                          {v.highlight}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(counts) as ChangeKind[]).map((k) =>
                      counts[k] > 0 ? (
                        <Badge key={k} variant={kindMeta[k].variant} size="sm">
                          {kindMeta[k].icon}
                          {counts[k]} {kindMeta[k].label}
                        </Badge>
                      ) : null,
                    )}
                  </div>
                </div>

                {/* CHANGES LIST */}
                <ul className="mt-5 space-y-2.5">
                  {v.changes.map((c, i) => {
                    const meta = kindMeta[c.kind];
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-stroke px-3 py-2.5 transition hover:border-primary/30 dark:border-dark-3 dark:hover:border-primary/30"
                      >
                        <Badge variant={meta.variant} size="sm" className="mt-0.5 shrink-0">
                          {meta.icon}
                          {meta.label}
                        </Badge>
                        <span className="text-sm text-dark dark:text-white">
                          {c.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* FOOTER */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stroke pt-4 dark:border-dark-3">
                  <p className="text-xs text-dark-5 dark:text-dark-6">
                    Released {new Date(v.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <FileTextIcon className="size-4" /> Release notes
                    </Button>
                    <Button variant="ghost" size="sm">
                      <BookIcon className="size-4" /> Migration guide
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* TIMELINE VISUAL SUMMARY */}
      <section className="mt-12">
        <CardHeader
          title="Release timeline"
          subtitle="A bird&rsquo;s-eye view of every Helios Pro release."
          className="mb-4"
        />
        <Card>
          <Timeline
            vertical
            events={changelogVersions.map((v) => ({
              title: `${v.version} — ${v.title}`,
              description: v.highlight,
              time: new Date(v.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
              tone: "primary",
            }))}
          />
        </Card>
      </section>

      {/* CTA */}
      <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 text-white md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Never miss a release
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">
              Subscribe to the Helios Pro release feed and get an email the
              moment every new version ships — including migration guides and
              breaking-change notes.
            </p>
          </div>
          <Button
            size="lg"
            className="shrink-0 bg-white text-primary hover:bg-white/90"
          >
            <BellIcon className="size-4" /> Subscribe to releases
          </Button>
        </div>
      </section>
    </>
  );
}
