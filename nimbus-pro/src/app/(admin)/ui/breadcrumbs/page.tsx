"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ChevronRight,
  Slash,
  Home,
  Users,
  User,
  Folder,
  FileText,
  Settings,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

type Crumb = { label: string; href?: string; icon?: React.ComponentType<{ className?: string }> };

/* ---------- Basic breadcrumbs ---------- */
function BasicCrumbs({ items, separator }: { items: Crumb[]; separator?: React.ReactNode }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {c.href && !isLast ? (
              <Link href={c.href} className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
                {c.label}
              </Link>
            ) : (
              <span className={cn(isLast && "text-gray-900 dark:text-white")}>{c.label}</span>
            )}
            {!isLast && (separator ?? <ChevronRight className="h-3.5 w-3.5 text-gray-400" />)}
          </span>
        );
      })}
    </nav>
  );
}

/* ---------- Icon breadcrumbs ---------- */
function IconCrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      {items.map((c, i) => {
        const Icon = c.icon;
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {c.href && !isLast ? (
              <Link
                href={c.href}
                className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-brand-400"
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {c.label}
              </Link>
            ) : (
              <span className={cn("inline-flex items-center gap-1.5 px-1.5 py-0.5 font-medium", isLast ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {c.label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 text-gray-400" />}
          </span>
        );
      })}
    </nav>
  );
}

/* ---------- Truncated breadcrumbs ---------- */
function TruncatedCrumbs({ items, max = 3 }: { items: Crumb[]; max?: number }) {
  const [expanded, setExpanded] = useState(false);
  if (items.length <= max || expanded) {
    return (
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-1">
              {c.href && !isLast ? (
                <Link href={c.href} className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
                  {c.label}
                </Link>
              ) : (
                <span className={cn(isLast && "text-gray-900 dark:text-white")}>{c.label}</span>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5 text-gray-400" />}
            </span>
          );
        })}
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="ml-2 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-500/10"
          >
            Collapse
          </button>
        )}
      </nav>
    );
  }
  const first = items[0];
  const last = items[items.length - 1];
  const hiddenCount = items.length - 2;
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
      <Link href={first.href ?? "#"} className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
        {first.label}
      </Link>
      <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
      <button
        onClick={() => setExpanded(true)}
        className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        aria-label={`Show ${hiddenCount} more breadcrumbs`}
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>
      <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
      <span className="text-gray-900 dark:text-white">{last.label}</span>
    </nav>
  );
}

/* ---------- With dropdown (overflow segment) ---------- */
function DropdownCrumbs({ items }: { items: Crumb[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const current = items[items.length - 1];
  const parents = items.slice(0, -1);
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
      {parents.map((c, i) => {
        const Icon = c.icon;
        const hasSiblings = i === parents.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            <Link href={c.href ?? "#"} className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-600 dark:hover:text-brand-400">
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {c.label}
            </Link>
            {hasSiblings && (
              <span className="relative">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="inline-flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  aria-label="More pages"
                >
                  <ChevronDown className="h-3 w-3" />
                </button>
                {open === i && (
                  <div className="absolute left-0 top-full z-20 mt-1 w-44 rounded-lg border border-gray-200 bg-white p-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
                    {["Overview", "Activity", "Files", "Settings"].map((s) => (
                      <Link
                        key={s}
                        href="#"
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        onClick={() => setOpen(null)}
                      >
                        <FileText className="h-3.5 w-3.5" /> {s}
                      </Link>
                    ))}
                  </div>
                )}
              </span>
            )}
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          </span>
        );
      })}
      <span className="text-gray-900 dark:text-white">{current.label}</span>
    </nav>
  );
}

const SEPARATORS: Record<string, React.ReactNode> = {
  chevron: <ChevronRight className="h-3.5 w-3.5 text-gray-400" />,
  slash: <Slash className="h-3 w-3 text-gray-400" />,
  dot: <span className="h-1 w-1 rounded-full bg-gray-400" />,
  arrow: <span className="text-gray-400">→</span>,
};

export default function BreadcrumbsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Breadcrumbs"
        description="Trail of links showing the user's current location in the app hierarchy — with icons, custom separators, truncation, and dropdowns."
        breadcrumbs={[{ label: "UI Components" }, { label: "Breadcrumbs" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Basic */}
        <Card>
          <CardHeader title="Basic" description="Text-only with chevron separators" />
          <CardBody className="space-y-4">
            <BasicCrumbs
              items={[
                { label: "Home", href: "#" },
                { label: "Projects", href: "#" },
                { label: "Nimbus Pro", href: "#" },
                { label: "Settings" },
              ]}
            />
            <BasicCrumbs
              items={[
                { label: "Dashboard", href: "#" },
                { label: "Analytics", href: "#" },
                { label: "Reports" },
              ]}
            />
            <BasicCrumbs
              items={[
                { label: "Home", href: "#" },
                { label: "Library" },
              ]}
            />
          </CardBody>
        </Card>

        {/* With icons */}
        <Card>
          <CardHeader title="With Icons" description="Each segment can carry an icon" />
          <CardBody className="space-y-4">
            <IconCrumbs
              items={[
                { label: "Home", href: "#", icon: Home },
                { label: "Team", href: "#", icon: Users },
                { label: "Aria Chen", icon: User },
              ]}
            />
            <IconCrumbs
              items={[
                { label: "Workspace", href: "#", icon: Folder },
                { label: "Documents", href: "#", icon: FileText },
                { label: "Q4 Report.pdf", icon: FileText },
              ]}
            />
            <IconCrumbs
              items={[
                { label: "Home", href: "#", icon: Home },
                { label: "Settings", href: "#", icon: Settings },
                { label: "Profile", icon: User },
              ]}
            />
          </CardBody>
        </Card>

        {/* Custom separators */}
        <Card>
          <CardHeader title="Custom Separators" description="Chevron, slash, dot, arrow" />
          <CardBody className="space-y-4">
            {(Object.keys(SEPARATORS) as (keyof typeof SEPARATORS)[]).map((key) => (
              <div key={key} className="flex items-center justify-between gap-3">
                <BasicCrumbs
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Products", href: "#" },
                    { label: "Details" },
                  ]}
                  separator={SEPARATORS[key]}
                />
                <Badge tone="gray" variant="soft">{key}</Badge>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Truncation */}
        <Card>
          <CardHeader title="With Truncation" description="Long paths collapse with a ••• overflow button" />
          <CardBody className="space-y-4">
            <TruncatedCrumbs
              items={[
                { label: "Home", href: "#" },
                { label: "Workspace", href: "#" },
                { label: "Projects", href: "#" },
                { label: "Nimbus Pro", href: "#" },
                { label: "Components", href: "#" },
                { label: "Breadcrumbs" },
              ]}
              max={4}
            />
            <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
              Click the <MoreHorizontal className="inline h-3 w-3" /> button to expand the full path. Useful for deeply nested routes.
            </div>
          </CardBody>
        </Card>

        {/* With dropdown */}
        <Card>
          <CardHeader title="With Dropdown" description="Last parent shows a sibling-pages dropdown" />
          <CardBody className="space-y-4">
            <DropdownCrumbs
              items={[
                { label: "Home", href: "#", icon: Home },
                { label: "Projects", href: "#", icon: Folder },
                { label: "Nimbus Pro", href: "#", icon: FileText },
                { label: "Settings" },
              ]}
            />
            <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
              The chevron next to a parent reveals sibling pages.
            </div>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="sm, md, lg on a single hierarchy" />
          <CardBody className="space-y-5">
            <div className="text-xs">
              <BasicCrumbs
                items={[
                  { label: "Home", href: "#" },
                  { label: "Settings", href: "#" },
                  { label: "Profile" },
                ]}
              />
            </div>
            <div className="text-sm">
              <BasicCrumbs
                items={[
                  { label: "Home", href: "#" },
                  { label: "Settings", href: "#" },
                  { label: "Profile" },
                ]}
              />
            </div>
            <div className="text-base">
              <BasicCrumbs
                items={[
                  { label: "Home", href: "#" },
                  { label: "Settings", href: "#" },
                  { label: "Profile" },
                ]}
              />
            </div>
          </CardBody>
        </Card>

        {/* Dark mode demo */}
        <Card>
          <CardHeader title="Dark Surface Demo" description="Rendered on a dark panel for contrast" />
          <CardBody>
            <div className="rounded-xl bg-gray-900 p-5 dark:bg-black">
              <IconCrumbs
                items={[
                  { label: "Home", href: "#", icon: Home },
                  { label: "Dashboard", href: "#", icon: Folder },
                  { label: "Analytics", href: "#", icon: FileText },
                  { label: "Realtime", icon: FileText },
                ]}
              />
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <Badge tone="brand" variant="soft">Live</Badge>
                Last updated 2 minutes ago
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card>
          <CardHeader title="Anatomy & Tips" description="What makes a great breadcrumb" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Hierarchy</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Show the path from root → current. Never show siblings or future steps.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Last item</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">The current page is never a link — render it as bold text in the page&apos;s text color.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Truncation</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">For paths deeper than 4 levels, collapse middle crumbs behind a ••• button.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Accessibility</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Always set <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">aria-label=&quot;Breadcrumb&quot;</code> on the nav.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
