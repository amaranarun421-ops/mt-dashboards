"use client";

import * as React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

type Trend = "up" | "down" | "neutral";
type BadgeColor = "success" | "error" | "warning" | "info" | "primary" | "light";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: Trend;
  icon: React.ElementType;
  iconColor?: string;
  subtitle?: string;
  /** Optional sparkline data (currently ignored — kept for backward compat) */
  sparkline?: number[];
  /** Optional animation delay (currently ignored — kept for backward compat) */
  delay?: number;
}

export function MetricCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  iconColor = "text-gray-800 dark:text-white/90",
  subtitle,
}: MetricCardProps) {
  const badgeColor: BadgeColor =
    trend === "up" ? "success" : trend === "down" ? "error" : "light";

  const badgeClasses = {
    success:
      "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
    error:
      "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
    warning:
      "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
    info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
    primary:
      "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
    light:
      "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
  }[badgeColor];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        <Icon className={`${iconColor} size-6`} />
      </div>
      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {value}
          </h4>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              {subtitle}
            </p>
          )}
        </div>
        {change !== undefined && (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 justify-center rounded-full font-medium text-sm ${badgeClasses}`}
          >
            {trend === "up" ? (
              <ArrowUp className="h-3.5 w-3.5" />
            ) : trend === "down" ? (
              <ArrowDown className="h-3.5 w-3.5" />
            ) : null}
            {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
}

// Keep KpiCard as an alias for backward compatibility
export const KpiCard = MetricCard;
