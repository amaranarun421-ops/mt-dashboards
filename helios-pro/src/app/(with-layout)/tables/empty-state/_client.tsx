"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Tabs } from "@/components/shared/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { Spinner } from "@/components/shared/spinner";
import { Table, PackageIcon, RefreshCwIcon, AlertTriangleIcon, UploadIcon, CheckIcon } from "@/components/Layouts/sidebar/icons";
import { SearchIcon } from "@/components/Layouts/sidebar/icons-extra";

type Variant = "empty" | "no-results" | "error" | "loading";

const variants: { value: Variant; label: string; icon: React.ReactNode }[] = [
  { value: "empty", label: "No data", icon: <Table className="size-4" /> },
  { value: "no-results", label: "No results", icon: <SearchIcon className="size-4" /> },
  { value: "error", label: "Error", icon: <AlertTriangleIcon className="size-4" /> },
  { value: "loading", label: "Loading", icon: <RefreshCwIcon className="size-4" /> },
];

export default function EmptyStateClient() {
  const [variant, setVariant] = useState<Variant>("empty");

  return (
    <div>
      <PageHeader
        title="Empty States"
        description="Four common empty-state patterns for tables: no data at all, no search results, an error fetching, and the loading skeleton."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/empty-state" }, { label: "Empty States" }]}
      />

      <Card className="mb-6">
        <CardHeader title="Pick a state" subtitle="Switch between the four variants" />
        <Tabs
          tabs={variants}
          value={variant}
          onChange={(v) => setVariant(v as Variant)}
          variant="pills"
        />
      </Card>

      <Card padded={false}>
        <CardHeader
          title="Inventory Items"
          subtitle={`Currently showing the "${variant}" state`}
          action={<Badge variant="neutral" size="sm">{variant}</Badge>}
          className="px-5 pt-5 md:px-6 md:pt-6"
        />

        <div className="helios-scroll overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-stroke bg-gray-2 text-left dark:border-dark-3 dark:bg-dark-2">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">SKU</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Product</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Warehouse</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Stock</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Price</th>
              </tr>
            </thead>
            <tbody>
              {variant === "loading" && (
                <>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <tr key={i} className="border-b border-stroke last:border-0 dark:border-dark-3">
                      <td className="px-4 py-4" colSpan={5}>
                        <div className="shimmer-bg h-4 rounded" style={{ width: `${60 + i * 7}%` }} />
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {variant === "empty" && (
                <tr>
                  <td colSpan={5} className="px-4">
                    <EmptyState
                      size="lg"
                      icon={<PackageIcon className="size-8 text-primary" />}
                      title="No inventory yet"
                      description="When you add products to your warehouses, they'll show up here. Start by creating your first inventory item."
                      action={
                        <div className="flex items-center gap-2">
                          <Button size="sm">
                            <UploadIcon className="size-4" />
                            Import CSV
                          </Button>
                          <Button size="sm" variant="outline">
                            <PackageIcon className="size-4" />
                            Add item
                          </Button>
                        </div>
                      }
                    />
                  </td>
                </tr>
              )}

              {variant === "no-results" && (
                <tr>
                  <td colSpan={5} className="px-4">
                    <EmptyState
                      size="lg"
                      icon={<SearchIcon className="size-8 text-accent-dark" />}
                      title="No matching items"
                      description="Try a different keyword, clear your filters, or widen the date range. We searched every warehouse for you."
                      action={
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <RefreshCwIcon className="size-4" />
                            Clear filters
                          </Button>
                          <Button size="sm" variant="ghost">Adjust search</Button>
                        </div>
                      }
                    />
                  </td>
                </tr>
              )}

              {variant === "error" && (
                <tr>
                  <td colSpan={5} className="px-4">
                    <EmptyState
                      size="lg"
                      icon={<AlertTriangleIcon className="size-8 text-red" />}
                      title="Couldn't load inventory"
                      description="The server returned a 503 — usually a brief connectivity blip. Your data is safe, just retry."
                      action={
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="danger">
                            <RefreshCwIcon className="size-4" />
                            Retry request
                          </Button>
                          <Button size="sm" variant="ghost">Contact support</Button>
                        </div>
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {variant === "loading" && (
          <div className="flex items-center justify-center gap-2 border-t border-stroke py-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
            <Spinner size={14} />
            Loading inventory…
          </div>
        )}
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <VariantCard
          active={variant === "empty"}
          onClick={() => setVariant("empty")}
          icon={<PackageIcon className="size-5 text-primary" />}
          title="No data"
          desc="Nothing has been added yet — show a friendly prompt to create the first item."
        />
        <VariantCard
          active={variant === "no-results"}
          onClick={() => setVariant("no-results")}
          icon={<SearchIcon className="size-5 text-accent-dark" />}
          title="No results"
          desc="Filters/search returned zero matches — let users clear or adjust them."
        />
        <VariantCard
          active={variant === "error"}
          onClick={() => setVariant("error")}
          icon={<AlertTriangleIcon className="size-5 text-red" />}
          title="Error"
          desc="The request failed — give a clear reason and a retry button."
        />
        <VariantCard
          active={variant === "loading"}
          onClick={() => setVariant("loading")}
          icon={<RefreshCwIcon className="size-5 text-primary" />}
          title="Loading"
          desc="Show shimmer skeletons that match the eventual layout to prevent layout shift."
        />
      </div>

      <Card className="mt-6">
        <CardHeader title="Best practices" subtitle="What every empty state should include" />
        <ul className="space-y-3 text-sm text-dark-7 dark:text-dark-7">
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <span><strong>Clear headline</strong> that names the situation in 2-4 words. Avoid generic phrases like "Nothing to show".</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <span><strong>Helpful description</strong> that explains what to do next. Tell the user how to fix it.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <span><strong>Primary action</strong> — a button that gets the user back to a productive state (Add, Retry, Clear filters).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <span><strong>Recognisable icon</strong> in a coloured tile to instantly communicate which state the user is in.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <span><strong>Consistent layout</strong> — the table headers stay visible so the user understands what they'd see if data were present.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

function VariantCard({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${
        active
          ? "border-primary bg-primary-subtle dark:bg-primary/10"
          : "border-stroke hover:border-primary/40 dark:border-dark-3"
      }`}
    >
      <div className="mb-3 grid size-10 place-items-center rounded-xl bg-white shadow-sm dark:bg-white/5">
        {icon}
      </div>
      <p className="text-sm font-semibold text-dark dark:text-white">{title}</p>
      <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{desc}</p>
      {active && (
        <div className="mt-2">
          <Badge variant="primary" size="sm">Showing</Badge>
        </div>
      )}
    </button>
  );
}
