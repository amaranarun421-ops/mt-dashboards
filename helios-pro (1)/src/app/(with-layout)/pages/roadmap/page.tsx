import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { EmptyState } from "@/components/shared/empty-state";
import {
  RocketIcon,
  CheckIcon,
  HelpCircleIcon,
  BellIcon,
  StarIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  roadmapCards,
  roadmapColumns,
  type RoadmapColumn,
  type RoadmapStatus,
} from "@/data/pages/roadmap";

export const metadata = {
  title: "Roadmap",
  description:
    "Helios Pro public roadmap — what we are working on Now, Next, Later and what we have already Shipped. Upvote the features you want most.",
};

const columnMeta: Record<
  RoadmapColumn,
  { tone: "primary" | "accent" | "info" | "success"; subtitle: string; dot: string }
> = {
  Now: {
    tone: "primary",
    subtitle: "In active development — shipping this quarter.",
    dot: "bg-primary",
  },
  Next: {
    tone: "accent",
    subtitle: "Up next — queued for the quarter after.",
    dot: "bg-accent",
  },
  Later: {
    tone: "info",
    subtitle: "Exploring — under review or in design.",
    dot: "bg-blue",
  },
  Done: {
    tone: "success",
    subtitle: "Shipped — live in the current release.",
    dot: "bg-green",
  },
};

const statusVariant: Record<
  RoadmapStatus,
  "primary" | "accent" | "info" | "success" | "neutral"
> = {
  "In Progress": "primary",
  Planned: "accent",
  Exploring: "info",
  Shipped: "success",
  "Under Review": "neutral",
};

const categoryTone: Record<string, "primary" | "accent" | "violet" | "info" | "danger" | "success"> = {
  Dashboard: "primary",
  Charts: "info",
  Integrations: "violet",
  Performance: "danger",
  Mobile: "accent",
  AI: "success",
};

function formatUpvotes(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        title="Public Roadmap"
        description="See exactly what we are working on, what is coming next, and what we have already shipped. Upvote the features you want most."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Pages", href: "/pages/roadmap" },
          { label: "Roadmap" },
        ]}
        actions={
          <div className="flex gap-2">
            <Badge variant="primary">
              <RocketIcon className="size-3.5" /> {roadmapCards.length} items
            </Badge>
            <Button variant="outline" size="sm">
              <BellIcon className="size-4" /> Subscribe to updates
            </Button>
          </div>
        }
      />

      {/* INTRO CARD */}
      <Card className="mb-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
              <RocketIcon className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-dark dark:text-white">
                How the Helios Pro roadmap works
              </h2>
              <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">
                We ship every two weeks. Items move left-to-right as they
                progress — Now to Next to Later to Done. Upvote anything you
                want to see sooner.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["Now", "Next", "Later", "Done"] as RoadmapColumn[]).map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-stroke px-2.5 py-1 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6"
              >
                <span className={`size-2 rounded-full ${columnMeta[c].dot}`} />
                {c}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {roadmapColumns.map((col) => {
          const meta = columnMeta[col];
          const cards = roadmapCards.filter((c) => c.column === col);
          return (
            <div key={col} className="flex flex-col">
              {/* COLUMN HEADER */}
              <div className="mb-3 flex items-center justify-between rounded-xl border border-stroke bg-white px-4 py-3 dark:border-dark-3 dark:bg-gray-dark">
                <div className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${meta.dot}`} />
                  <h3 className="text-sm font-semibold text-dark dark:text-white">
                    {col}
                  </h3>
                </div>
                <Badge variant={meta.tone} size="sm">
                  {cards.length}
                </Badge>
              </div>
              <p className="mb-3 px-1 text-xs text-dark-5 dark:text-dark-6">
                {meta.subtitle}
              </p>

              {/* CARDS */}
              <div className="flex-1 space-y-3">
                {cards.length === 0 ? (
                  <Card>
                    <EmptyState
                      size="sm"
                      title="Nothing here yet"
                      description={`No items in ${col} right now.`}
                    />
                  </Card>
                ) : (
                  cards.map((card) => (
                    <Card key={card.id} hover className="py-4">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <Badge variant={statusVariant[card.status]} size="sm">
                          {card.status}
                        </Badge>
                        <Badge variant={categoryTone[card.category]} size="sm">
                          {card.category}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-semibold text-dark dark:text-white">
                        {card.title}
                      </h4>
                      <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                        {card.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-stroke pt-3 dark:border-dark-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-dark-5 transition hover:bg-primary-subtle hover:text-primary dark:text-dark-6 dark:hover:bg-primary/15 dark:hover:text-primary-light"
                          aria-label={`Upvote ${card.title}`}
                        >
                          <svg
                            width={14}
                            height={14}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 4l7 7h-4v9h-6v-9H5l7-7z"
                              fill="currentColor"
                            />
                          </svg>
                          {formatUpvotes(card.upvotes)}
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-dark-5 transition hover:text-primary dark:text-dark-6 dark:hover:text-primary-light"
                          aria-label={`Comment on ${card.title}`}
                        >
                          <svg
                            width={14}
                            height={14}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {Math.floor(card.upvotes / 12)}
                        </button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENTLY SHIPPED SUMMARY */}
      <section className="mt-12">
        <CardHeader
          title="Recently shipped"
          subtitle="A quick look at the big features that went live in the last few releases."
          className="mb-4"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {roadmapCards
            .filter((c) => c.column === "Done")
            .slice(0, 3)
            .map((c) => (
              <Card key={c.id} hover>
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="success" size="sm">
                    <CheckIcon className="size-3" /> Shipped
                  </Badge>
                  <Badge variant={categoryTone[c.category]} size="sm">
                    {c.category}
                  </Badge>
                </div>
                <h3 className="text-base font-semibold text-dark dark:text-white">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                  {c.description}
                </p>
                <div className="mt-4 flex items-center gap-2 border-t border-stroke pt-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
                  <StarIcon className="size-3.5 text-accent" />
                  <span>{formatUpvotes(c.upvotes)} upvotes</span>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <Card className="flex flex-col items-start justify-between gap-4 bg-primary-subtle/60 dark:bg-primary/10 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary text-white">
              <HelpCircleIcon className="size-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-dark dark:text-white">
                Have an idea for the roadmap?
              </h3>
              <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">
                Submit feature requests, upvote others and chat with the team in
                our community Discord. The most upvoted ideas move into Now.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <HelpCircleIcon className="size-4" /> Submit an idea
            </Button>
            <Button>
              <RocketIcon className="size-4" /> Join Discord
            </Button>
          </div>
        </Card>
      </section>
    </>
  );
}
