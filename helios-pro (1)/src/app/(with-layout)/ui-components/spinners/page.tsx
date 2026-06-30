import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import {
  Spinner,
  PageLoader,
  SkeletonCard,
  SkeletonRow,
} from "@/components/shared/spinner";
import { SpinnerIcon, RefreshCwIcon, UploadIcon } from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "Spinners & Skeletons",
  description:
    "Helios Pro — loading state showcase: spinners, page loaders, skeleton cards, rows, text and loading buttons.",
};

const spinnerSizes = [
  { name: "16px", size: 16 },
  { name: "20px", size: 20 },
  { name: "28px", size: 28 },
  { name: "40px", size: 40 },
  { name: "56px", size: 56 },
];

export default function SpinnersPage() {
  return (
    <>
      <PageHeader
        title="Spinners & Skeletons"
        description="Six loading patterns — from inline spinners to full skeleton screens — that keep users informed while data is in flight."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/spinners" },
          { label: "Spinners" },
        ]}
        actions={
          <Badge variant="primary">
            <SpinnerIcon className="size-3.5" /> 6 patterns
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Spinner sizes"
            subtitle="Five pixel sizes for inline, button and full-screen use."
          />
          <div className="flex flex-wrap items-end gap-8">
            {spinnerSizes.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center gap-2"
              >
                <Spinner size={s.size} />
                <span className="text-xs text-dark-5 dark:text-dark-6">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Spinner tones"
            subtitle="Primary for default contexts, white for solid buttons, dark for light overlays."
          />
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <div className="grid size-14 place-items-center rounded-xl bg-white dark:bg-gray-dark">
                <Spinner size={28} tone="primary" />
              </div>
              <span className="text-xs text-dark-5 dark:text-dark-6">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="grid size-14 place-items-center rounded-xl bg-primary">
                <Spinner size={28} tone="white" />
              </div>
              <span className="text-xs text-dark-5 dark:text-dark-6">White</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="grid size-14 place-items-center rounded-xl bg-gray-2 dark:bg-dark-3">
                <Spinner size={28} tone="dark" />
              </div>
              <span className="text-xs text-dark-5 dark:text-dark-6">Dark</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="grid size-14 place-items-center rounded-xl bg-accent">
                <Spinner size={28} tone="white" />
              </div>
              <span className="text-xs text-dark-5 dark:text-dark-6">On accent</span>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Loading buttons"
            subtitle="Inline spinners pair with copy like Saving… or Uploading…"
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" disabled>
              <RefreshCwIcon className="size-4 animate-spin" /> Saving…
            </Button>
            <Button variant="accent" disabled>
              <UploadIcon className="size-4 animate-spin" /> Uploading 64%
            </Button>
            <Button variant="outline" disabled>
              <Spinner size={16} tone="dark" /> Loading
            </Button>
            <Button variant="soft" disabled>
              <RefreshCwIcon className="size-4 animate-spin" /> Syncing data
            </Button>
            <Button variant="danger" disabled>
              <RefreshCwIcon className="size-4 animate-spin" /> Deleting…
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Page loader"
            subtitle="Centred spinner with optional label for full-route loading states."
          />
          <div className="rounded-xl border border-stroke bg-gray-2/50 py-4 dark:border-dark-3 dark:bg-dark-2/50">
            <PageLoader label="Loading dashboard…" />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Skeleton card"
            subtitle="Shimmer placeholder for stat cards and dashboards while data resolves."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Skeleton rows"
            subtitle="Table-row placeholders with adjustable column count."
          />
          <div className="space-y-3">
            <SkeletonRow columns={4} />
            <SkeletonRow columns={4} />
            <SkeletonRow columns={4} />
            <SkeletonRow columns={4} />
            <SkeletonRow columns={4} />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Skeleton text"
            subtitle="Multi-line shimmer blocks for paragraphs and article bodies."
          />
          <div className="space-y-2">
            <div className="shimmer-bg h-4 w-3/4 rounded" />
            <div className="shimmer-bg h-4 w-full rounded" />
            <div className="shimmer-bg h-4 w-5/6 rounded" />
            <div className="shimmer-bg h-4 w-2/3 rounded" />
            <div className="shimmer-bg h-4 w-1/2 rounded" />
          </div>
        </Card>
      </div>
    </>
  );
}
