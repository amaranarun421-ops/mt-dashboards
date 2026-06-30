"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type Tab = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  variant?: "underline" | "pills" | "boxed";
  className?: string;
  size?: "sm" | "md";
};

export function Tabs({
  tabs,
  value,
  onChange,
  variant = "underline",
  className,
  size = "md",
}: TabsProps) {
  const padding = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  if (variant === "pills") {
    return (
      <div className={cn("inline-flex flex-wrap gap-1 rounded-xl bg-gray-2 p-1 dark:bg-dark-2", className)}>
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg font-medium transition-all",
              padding,
              value === t.value
                ? "bg-white text-dark shadow-sm dark:bg-dark-3 dark:text-white"
                : "text-dark-5 hover:text-dark dark:text-dark-6 dark:hover:text-white",
            )}
          >
            {t.icon}
            {t.label}
            {t.badge}
          </button>
        ))}
      </div>
    );
  }

  if (variant === "boxed") {
    return (
      <div className={cn("flex flex-wrap gap-1 rounded-xl border border-stroke p-1 dark:border-dark-3", className)}>
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg font-medium transition-all",
              padding,
              value === t.value
                ? "bg-primary text-white shadow-sm"
                : "text-dark-5 hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-white",
            )}
          >
            {t.icon}
            {t.label}
            {t.badge}
          </button>
        ))}
      </div>
    );
  }

  // underline
  return (
    <div className={cn("flex gap-1 border-b border-stroke dark:border-dark-3", className)}>
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "relative inline-flex items-center gap-1.5 font-medium transition-all",
            padding,
            value === t.value
              ? "text-primary dark:text-primary-light"
              : "text-dark-5 hover:text-dark dark:text-dark-6 dark:hover:text-white",
          )}
        >
          {t.icon}
          {t.label}
          {t.badge}
          {value === t.value && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
