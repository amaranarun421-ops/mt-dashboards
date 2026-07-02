"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: string[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PageBreadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="mb-6">
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span
              className={
                i === items.length - 1
                  ? "text-sm font-medium text-gray-800 dark:text-white/90"
                  : "text-sm text-gray-500 dark:text-gray-400"
              }
            >
              {item}
            </span>
            {i < items.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
