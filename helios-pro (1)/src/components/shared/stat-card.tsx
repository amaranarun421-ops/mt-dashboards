import { cn } from "@/lib/utils";
import * as React from "react";

type Tone = "primary" | "accent" | "violet" | "info" | "rose" | "success" | "danger" | "warning";

type StatCardProps = {
  label: string;
  value: string | number;
  delta?: { value: string; trend: "up" | "down" | "neutral" };
  icon?: React.ReactNode;
  tone?: Tone;
  sublabel?: string;
  className?: string;
  footer?: React.ReactNode;
};

const toneBg: Record<Tone, string> = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
  rose: "bg-rose-subtle text-rose dark:bg-rose/15 dark:text-rose-light",
  success: "bg-primary-subtle text-primary-dark dark:bg-primary/15 dark:text-primary-light",
  danger: "bg-red-light-5 text-red-dark dark:bg-red/15 dark:text-red-light",
  warning: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
};

const trendColor = {
  up: "text-primary dark:text-primary-light",
  down: "text-red dark:text-red-light",
  neutral: "text-dark-5 dark:text-dark-6",
};

const trendIcon = {
  up: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M5 14l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  down: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M5 10l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  neutral: (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

export function StatCard({
  label,
  value,
  delta,
  icon,
  tone = "primary",
  sublabel,
  className,
  footer,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-stroke bg-white p-5 shadow-card-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-3 dark:border-dark-3 dark:bg-gray-dark",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-dark-5 dark:text-dark-6">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-dark dark:text-white">
            {value}
          </p>
          {sublabel && (
            <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{sublabel}</p>
          )}
        </div>
        {icon && (
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-xl transition-transform group-hover:scale-110",
              toneBg[tone],
            )}
          >
            {icon}
          </span>
        )}
      </div>

      {delta && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold",
              trendColor[delta.trend],
            )}
          >
            {trendIcon[delta.trend]}
            {delta.value}
          </span>
          <span className="text-dark-5 dark:text-dark-6">vs last month</span>
        </div>
      )}

      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
