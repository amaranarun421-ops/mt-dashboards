"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Optional animation delay (currently ignored — kept for backward compat) */
  delay?: number;
}

export function ChartCard({
  title,
  description,
  children,
  action,
  className,
  bodyClassName,
}: ChartCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${
        className || ""
      }`}
    >
      <div className="flex items-center justify-between px-5 pt-5 dark:px-6 dark:pt-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {description && (
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className={`p-5 dark:p-6 ${bodyClassName || ""}`}>{children}</div>
    </div>
  );
}
