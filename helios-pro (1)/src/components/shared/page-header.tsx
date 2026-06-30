import { cn } from "@/lib/utils";
import * as React from "react";

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-2 flex items-center gap-1.5 text-xs text-dark-5 dark:text-dark-6">
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {b.href ? (
                <a href={b.href} className="transition hover:text-primary">
                  {b.label}
                </a>
              ) : (
                <span className="text-dark-7 dark:text-dark-7">{b.label}</span>
              )}
              {i < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-dark dark:text-white md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm text-dark-5 dark:text-dark-6 md:text-base">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
