import { cn } from "@/lib/utils";
import * as React from "react";

type FormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3;
};

export function FormSection({
  title,
  description,
  children,
  className,
  columns = 2,
}: FormSectionProps) {
  const cols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  }[columns];

  return (
    <section
      className={cn(
        "rounded-2xl border border-stroke bg-white p-5 shadow-card-2 dark:border-dark-3 dark:bg-gray-dark md:p-6",
        className,
      )}
    >
      <div className="mb-5">
        <h3 className="text-base font-semibold text-dark dark:text-white">{title}</h3>
        {description && (
          <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">{description}</p>
        )}
      </div>
      <div className={cn("grid gap-4", cols)}>{children}</div>
    </section>
  );
}

export function FormField({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 flex items-center gap-1 text-sm font-medium text-dark dark:text-white"
      >
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">{hint}</p>
      )}
      {error && <p className="mt-1 text-xs text-red">{error}</p>}
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-stroke bg-white px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-6 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:placeholder:text-dark-6";
