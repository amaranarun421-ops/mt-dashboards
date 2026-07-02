"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, ArrowUpRight, ArrowDownRight, Minus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// ============ PageHero — multiple variants to avoid repetition ============

type HeroTone = "default" | "brand" | "success" | "warning" | "error" | "minimal";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumb?: string[];
  actions?: React.ReactNode;
  tone?: HeroTone;
  /** Show meta items (e.g. last updated, owner) */
  meta?: Array<{ label: string; value: string }>;
  className?: string;
}

const toneStyles: Record<HeroTone, string> = {
  default: "bg-white dark:bg-white/[0.03] border-gray-200 dark:border-gray-800",
  brand: "bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-transparent border-brand-200 dark:border-brand-500/20",
  success: "bg-gradient-to-br from-success-500/10 via-success-500/5 to-transparent border-success-200 dark:border-success-500/20",
  warning: "bg-gradient-to-br from-warning-500/10 via-warning-500/5 to-transparent border-warning-200 dark:border-warning-500/20",
  error: "bg-gradient-to-br from-error-500/10 via-error-500/5 to-transparent border-error-200 dark:border-error-500/20",
  minimal: "bg-transparent border-transparent",
};

export function PageHero({ title, description, breadcrumb, actions, tone = "default", meta, className }: PageHeroProps) {
  return (
    <div className={cn("rounded-2xl border p-5 md:p-6 mb-6", toneStyles[tone], className)}>
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="mb-3">
          <ol className="flex items-center gap-1.5">
            {breadcrumb.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5 text-xs">
                <span className={cn(i === breadcrumb.length - 1 ? "font-semibold text-gray-800 dark:text-white/90" : "text-gray-500 dark:text-gray-400")}>
                  {item}
                </span>
                {i < breadcrumb.length - 1 && <ChevronRight className="h-3 w-3 text-gray-400" />}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
              {description}
            </p>
          )}
          {meta && meta.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              {meta.map((m, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400 dark:text-gray-500">{m.label}:</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

// ============ StatBlock — multiple variants ============

type StatVariant = "card" | "minimal" | "bar" | "gradient" | "compact";

interface StatBlockProps {
  label: string;
  value: string | number;
  delta?: number;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: StatVariant;
  /** Optional sub-label, e.g. "vs last month" */
  sublabel?: string;
  /** Optional sparkline data */
  spark?: number[];
  className?: string;
  /** Tone for gradient variant */
  tone?: "brand" | "success" | "warning" | "error" | "info";
}

const gradientTones: Record<string, string> = {
  brand: "from-brand-500 to-brand-700",
  success: "from-success-500 to-success-700",
  warning: "from-warning-500 to-warning-700",
  error: "from-error-500 to-error-700",
  info: "from-blue-light-500 to-blue-light-700",
};

export function StatBlock({
  label,
  value,
  delta,
  icon: Icon,
  variant = "card",
  sublabel,
  spark,
  className,
  tone = "brand",
}: StatBlockProps) {
  const positive = (delta ?? 0) >= 0;
  const DeltaIcon = positive ? ArrowUpRight : ArrowDownRight;
  const deltaColor = delta === undefined ? "" : Math.abs(delta) < 0.005 ? "text-gray-500" : positive ? "text-success-600 dark:text-success-500" : "text-error-600 dark:text-error-500";

  if (variant === "gradient") {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white shadow-lg", gradientTones[tone], className)}>
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70 font-semibold">{label}</p>
              <p className="mt-2 text-2xl font-bold">{value}</p>
            </div>
            {Icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <Icon className="h-5 w-5" />
              </div>
            )}
          </div>
          {(delta !== undefined || sublabel) && (
            <div className="mt-3 flex items-center gap-2 text-xs">
              {delta !== undefined && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-white/20 px-2 py-0.5 font-semibold">
                  <DeltaIcon className="h-3 w-3" /> {Math.abs(delta * 100).toFixed(1)}%
                </span>
              )}
              {sublabel && <span className="text-white/70">{sublabel}</span>}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("py-2", className)}>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-1 text-xl font-bold text-gray-800 dark:text-white">{value}</p>
        {delta !== undefined && (
          <p className={cn("mt-1 inline-flex items-center gap-0.5 text-xs font-medium", deltaColor)}>
            <DeltaIcon className="h-3 w-3" /> {Math.abs(delta * 100).toFixed(1)}%
            {sublabel && <span className="text-gray-400 ml-1 font-normal">{sublabel}</span>}
          </p>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.02]", className)}>
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
            <Icon className="h-4.5 w-4.5 text-gray-600 dark:text-gray-300" />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{label}</p>
          <p className="text-sm font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
        {delta !== undefined && (
          <span className={cn("ml-auto inline-flex items-center gap-0.5 text-xs font-semibold", deltaColor)}>
            <DeltaIcon className="h-3 w-3" /> {Math.abs(delta * 100).toFixed(1)}%
          </span>
        )}
      </div>
    );
  }

  if (variant === "bar") {
    // Side-bar accent style — good for pipeline stages
    return (
      <div className={cn("relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02] p-4", className)}>
        <div className={cn("absolute left-0 top-0 h-full w-1", tone === "brand" ? "bg-brand-500" : tone === "success" ? "bg-success-500" : tone === "warning" ? "bg-warning-500" : tone === "error" ? "bg-error-500" : "bg-blue-light-500")} />
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="mt-1 text-xl font-bold text-gray-800 dark:text-white">{value}</p>
        {delta !== undefined && (
          <p className={cn("mt-1 inline-flex items-center gap-0.5 text-xs", deltaColor)}>
            <DeltaIcon className="h-3 w-3" /> {Math.abs(delta * 100).toFixed(1)}% {sublabel}
          </p>
        )}
      </div>
    );
  }

  // default "card" variant
  return (
    <div className={cn("group relative rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.02] card-hover", className)}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        </div>
        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 transition group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10">
            <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300 group-hover:text-brand-500" />
          </div>
        )}
      </div>
      {delta !== undefined && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className={cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-semibold",
            Math.abs(delta) < 0.005 ? "bg-gray-100 text-gray-500 dark:bg-gray-800" :
            positive ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500" :
            "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500")}>
            {Math.abs(delta) < 0.005 ? <Minus className="h-3 w-3" /> : <DeltaIcon className="h-3 w-3" />}
            {Math.abs(delta * 100).toFixed(1)}%
          </span>
          {sublabel && <span className="text-gray-400 dark:text-gray-500">{sublabel}</span>}
        </div>
      )}
      {spark && spark.length > 0 && (
        <Sparkline data={spark} className="mt-3 h-8" positive={positive} />
      )}
    </div>
  );
}

// ============ Sparkline (tiny inline chart) ============

function Sparkline({ data, className, positive }: { data: number[]; className?: string; positive?: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`).join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={cn("w-full", className)}>
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={positive ? "#12b76a" : "#f04438"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={positive ? "#12b76a" : "#f04438"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${points} 100,100`} fill="url(#spark-grad)" />
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#12b76a" : "#f04438"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// ============ EmptyState — varied per-domain ============

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  variant?: "default" | "minimal" | "illustrated";
  className?: string;
}

export function EmptyState({ title, description, icon: Icon, action, secondaryAction, variant = "default", className }: EmptyStateProps) {
  if (variant === "minimal") {
    return (
      <div className={cn("flex flex-col items-center justify-center text-center py-12", className)}>
        {Icon && <Icon className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-3" />}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
        {description && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 max-w-sm">{description}</p>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    );
  }

  if (variant === "illustrated") {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-transparent dark:from-white/[0.02] py-16", className)}>
        <div className="absolute inset-0 mesh-bg opacity-50" />
        <div className="relative flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 mb-4">
            {Icon ? <Icon className="h-8 w-8" /> : <Sparkles className="h-8 w-8" />}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
          {description && <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-md">{description}</p>}
          {action && <div className="mt-5">{action}</div>}
          {secondaryAction && <div className="mt-2">{secondaryAction}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4", className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4">
        {Icon ? <Icon className="h-7 w-7 text-gray-400" /> : <Sparkles className="h-7 w-7 text-gray-400" />}
      </div>
      <h3 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
      {secondaryAction && <div className="mt-2">{secondaryAction}</div>}
    </div>
  );
}

// ============ ErrorState ============

interface ErrorStateProps {
  title?: string;
  description?: string;
  retry?: () => void;
  className?: string;
}

export function ErrorState({ title = "Something went wrong", description = "An unexpected error occurred while loading this content.", retry, className }: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4", className)}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-error-500/10 text-error-500 mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>
      {retry && (
        <Button onClick={retry} variant="outline" size="sm" className="mt-5">
          Try again
        </Button>
      )}
    </div>
  );
}

// ============ ChartSkeleton & TableSkeleton ============

export function ChartSkeleton({ className, height = "h-64" }: { className?: string; height?: string }) {
  return (
    <div className={cn("rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-5", className)}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className={cn("w-full", height)} />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4, className }: { rows?: number; cols?: number; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-white/[0.02]", className)}>
      <div className="border-b border-gray-200 dark:border-gray-800 p-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 flex-1 max-w-md" />
          <Skeleton className="h-7 w-20" />
        </div>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800/50">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ SectionHeading — for mid-page dividers ============

interface SectionHeadingProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({ title, description, action, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3 mb-4", className)}>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

// ============ Panel — alternative to Card for variety ============

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export function Panel({ children, className, title, description, action, noPadding }: PanelProps) {
  return (
    <div className={cn("rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02]", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 p-5 pb-0">
          <div>
            {title && <h3 className="text-base font-semibold text-gray-800 dark:text-white">{title}</h3>}
            {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={cn(!noPadding && (title ? "p-5 pt-4" : "p-5"))}>{children}</div>
    </div>
  );
}

// ============ Callout — for highlighting tips / pro-tips ============

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  tone?: "brand" | "success" | "warning" | "error" | "info";
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  className?: string;
}

const calloutTones: Record<NonNullable<CalloutProps["tone"]>, { bg: string; border: string; text: string; icon: string }> = {
  brand: { bg: "bg-brand-50/50 dark:bg-brand-500/10", border: "border-brand-200 dark:border-brand-500/30", text: "text-brand-700 dark:text-brand-300", icon: "text-brand-500" },
  success: { bg: "bg-success-50/50 dark:bg-success-500/10", border: "border-success-200 dark:border-success-500/30", text: "text-success-700 dark:text-success-400", icon: "text-success-500" },
  warning: { bg: "bg-warning-50/50 dark:bg-warning-500/10", border: "border-warning-200 dark:border-warning-500/30", text: "text-warning-700 dark:text-warning-400", icon: "text-warning-500" },
  error: { bg: "bg-error-50/50 dark:bg-error-500/10", border: "border-error-200 dark:border-error-500/30", text: "text-error-700 dark:text-error-400", icon: "text-error-500" },
  info: { bg: "bg-blue-light-50/50 dark:bg-blue-light-500/10", border: "border-blue-light-200 dark:border-blue-light-500/30", text: "text-blue-light-700 dark:text-blue-light-400", icon: "text-blue-light-500" },
};

export function Callout({ title, children, tone = "brand", icon: Icon, action, className }: CalloutProps) {
  const styles = calloutTones[tone];
  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-4", styles.bg, styles.border, className)}>
      {Icon && <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", styles.icon)} />}
      <div className="flex-1 min-w-0">
        {title && <p className={cn("text-sm font-semibold mb-0.5", styles.text)}>{title}</p>}
        <div className={cn("text-sm", styles.text, "opacity-90")}>{children}</div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

// ============ QuickLinkCard — for grid navigation / "explore" tiles ============

interface QuickLinkCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  className?: string;
}

export function QuickLinkCard({ title, description, href, icon: Icon, badge, className }: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.02] card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between">
        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 transition group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </div>
        )}
        {badge && (
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-500 opacity-0 transition group-hover:opacity-100">
        Open <ArrowUpRight className="h-3 w-3" />
      </div>
    </Link>
  );
}
