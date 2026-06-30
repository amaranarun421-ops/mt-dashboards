"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type Panel = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
};

export function SettingsPanel({
  panels,
  defaultPanel,
  className,
}: {
  panels: Panel[];
  defaultPanel?: string;
  className?: string;
}) {
  const [active, setActive] = React.useState(defaultPanel || panels[0]?.id);
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[220px_1fr]", className)}>
      <nav className="space-y-1">
        {panels.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
              active === p.id
                ? "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                : "text-dark-5 hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-white",
            )}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </nav>
      <div>
        {panels.find((p) => p.id === active)?.content}
      </div>
    </div>
  );
}
