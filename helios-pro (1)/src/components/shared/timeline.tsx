import { cn } from "@/lib/utils";
import * as React from "react";

type TimelineEvent = {
  title: string;
  description?: string;
  time: string;
  tone?: "primary" | "accent" | "violet" | "info" | "rose" | "success" | "danger";
  icon?: React.ReactNode;
};

const toneClasses = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
  rose: "bg-rose-subtle text-rose dark:bg-rose/15 dark:text-rose-light",
  success: "bg-primary-subtle text-primary-dark dark:bg-primary/15 dark:text-primary-light",
  danger: "bg-red-light-5 text-red-dark dark:bg-red/15 dark:text-red-light",
};

export function Timeline({
  events,
  className,
  vertical = true,
}: {
  events: TimelineEvent[];
  className?: string;
  vertical?: boolean;
}) {
  if (!vertical) {
    return (
      <ol className={cn("flex items-start gap-4 overflow-x-auto", className)}>
        {events.map((e, i) => (
          <li key={i} className="relative flex min-w-[180px] flex-1 flex-col items-center text-center">
            {i !== events.length - 1 && (
              <span className="absolute top-4 left-1/2 h-px w-full bg-stroke dark:bg-dark-3" />
            )}
            <span
              className={cn(
                "relative z-10 grid size-8 place-items-center rounded-full",
                toneClasses[e.tone || "primary"],
              )}
            >
              {e.icon || (
                <span className="size-2 rounded-full bg-current" />
              )}
            </span>
            <p className="mt-2 text-sm font-semibold text-dark dark:text-white">{e.title}</p>
            {e.description && (
              <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">{e.description}</p>
            )}
            <p className="mt-1 text-[10px] text-dark-5 dark:text-dark-6">{e.time}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("relative space-y-5 pl-2", className)}>
      {events.map((e, i) => (
        <li key={i} className="relative flex gap-4">
          {i !== events.length - 1 && (
            <span
              className="absolute left-[14px] top-9 h-[calc(100%-12px)] w-px bg-stroke dark:bg-dark-3"
              aria-hidden
            />
          )}
          <span
            className={cn(
              "relative z-10 grid size-7 shrink-0 place-items-center rounded-full",
              toneClasses[e.tone || "primary"],
            )}
          >
            {e.icon || <span className="size-2 rounded-full bg-current" />}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-dark dark:text-white">{e.title}</p>
              <span className="text-xs text-dark-5 dark:text-dark-6">{e.time}</span>
            </div>
            {e.description && (
              <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">{e.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
