import { Card } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Progress } from "@/components/shared/progress";
import { Banner } from "@/components/shared/banner";
import {
  WrenchIcon,
  ServerIcon,
  ActivityIcon,
  CheckIcon,
  BellIcon,
  HelpCircleIcon,
} from "@/components/Layouts/sidebar/icons";

export const metadata = {
  title: "Maintenance",
  description:
    "Helios Pro is undergoing scheduled maintenance. We will be back shortly — thanks for your patience.",
};

const updates = [
  { label: "Database migration", status: "done" as const, time: "02:14 UTC" },
  { label: "Search index rebuild", status: "done" as const, time: "02:31 UTC" },
  { label: "Chart service upgrade", status: "active" as const, time: "in progress" },
  { label: "Final smoke tests", status: "pending" as const, time: "queued" },
];

export default function MaintenancePage() {
  return (
    <div className="min-h-[calc(100vh-200px)] grid place-items-center">
      <div className="w-full max-w-2xl px-4">
        {/* LOGO + STATUS */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="relative mb-5">
            <span className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
              <WrenchIcon className="size-8" />
            </span>
            <span className="absolute -right-1 -top-1 flex size-4">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex size-4 rounded-full bg-accent" />
            </span>
          </div>
          <Badge variant="warning" size="lg">
            Scheduled maintenance
          </Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-dark dark:text-white md:text-4xl">
            We&rsquo;ll be back shortly
          </h1>
          <p className="mt-3 max-w-md text-sm text-dark-5 dark:text-dark-6 md:text-base">
            Helios Pro is undergoing a scheduled upgrade to bring you realtime
            charts, the AI Insights panel and faster dashboard loads. Thanks
            for your patience.
          </p>
        </div>

        <Card>
          {/* PROGRESS */}
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-dark dark:text-white">
              Upgrade progress
            </span>
            <span className="font-semibold text-primary dark:text-primary-light">
              68%
            </span>
          </div>
          <Progress value={68} tone="primary" size="lg" />
          <p className="mt-2 text-xs text-dark-5 dark:text-dark-6">
            Estimated time remaining:{" "}
            <strong className="text-dark dark:text-white">~18 minutes</strong>{" "}
            (target completion: 03:30 UTC)
          </p>

          {/* TASK LIST */}
          <ul className="mt-6 space-y-2.5">
            {updates.map((u) => (
              <li
                key={u.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-stroke px-3 py-2.5 dark:border-dark-3"
              >
                <div className="flex items-center gap-3">
                  {u.status === "done" ? (
                    <span className="grid size-7 place-items-center rounded-md bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                      <CheckIcon className="size-4" />
                    </span>
                  ) : u.status === "active" ? (
                    <span className="grid size-7 place-items-center rounded-md bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light">
                      <svg
                        className="size-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeOpacity="0.25"
                        />
                        <path
                          d="M22 12a10 10 0 0 1-10 10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span className="grid size-7 place-items-center rounded-md bg-gray-2 text-dark-5 dark:bg-white/5 dark:text-dark-6">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        u.status === "pending"
                          ? "text-dark-5 dark:text-dark-6"
                          : "text-dark dark:text-white"
                      }`}
                    >
                      {u.label}
                    </p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">
                      {u.time}
                    </p>
                  </div>
                </div>
                {u.status === "done" && (
                  <Badge variant="success" size="sm">
                    Done
                  </Badge>
                )}
                {u.status === "active" && (
                  <Badge variant="warning" size="sm">
                    In progress
                  </Badge>
                )}
                {u.status === "pending" && (
                  <Badge variant="neutral" size="sm">
                    Queued
                  </Badge>
                )}
              </li>
            ))}
          </ul>
        </Card>

        {/* INFO BANNER */}
        <div className="mt-5">
          <Banner
            tone="info"
            icon={<BellIcon className="size-5" />}
            title="What you can do in the meantime"
            description="Bookmark our status page for live updates, follow us on X for the all-clear, or browse the docs which are still available."
            action={
              <Button size="sm" variant="outline">
                View status page
              </Button>
            }
          />
        </div>

        {/* QUICK LINKS */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              icon: <ActivityIcon className="size-4" />,
              label: "Status page",
              hint: "Live uptime + incident history",
            },
            {
              icon: <ServerIcon className="size-4" />,
              label: "Docs",
              hint: "Guides + API reference",
            },
            {
              icon: <HelpCircleIcon className="size-4" />,
              label: "Support",
              hint: "support@heliospro.io",
            },
          ].map((l) => (
            <button
              key={l.label}
              className="flex items-center gap-3 rounded-xl border border-stroke bg-white px-3 py-3 text-left transition hover:border-primary/40 hover:shadow-card-2 dark:border-dark-3 dark:bg-gray-dark dark:hover:border-primary/30"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                {l.icon}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-dark dark:text-white">
                  {l.label}
                </p>
                <p className="truncate text-xs text-dark-5 dark:text-dark-6">
                  {l.hint}
                </p>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-dark-5 dark:text-dark-6">
          Last updated 02:46 UTC · Helios Pro Operations ·{" "}
          <a
            href="#"
            className="font-medium text-primary hover:underline dark:text-primary-light"
          >
            Subscribe to incidents
          </a>
        </p>
      </div>
    </div>
  );
}
