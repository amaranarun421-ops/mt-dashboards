import { cn } from "@/lib/utils";
import * as React from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: { wrap: "py-6", icon: "size-10", title: "text-sm", desc: "text-xs" },
  md: { wrap: "py-12", icon: "size-14", title: "text-base", desc: "text-sm" },
  lg: { wrap: "py-20", icon: "size-20", title: "text-lg", desc: "text-base" },
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  size = "md",
  className,
}: EmptyStateProps) {
  const s = sizeMap[size];
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        s.wrap,
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            "mb-3 grid place-items-center rounded-2xl bg-gray-2 text-dark-5 dark:bg-white/5 dark:text-dark-6",
            s.icon,
          )}
        >
          {icon}
        </div>
      )}
      <h3 className={cn("font-semibold text-dark dark:text-white", s.title)}>{title}</h3>
      {description && (
        <p
          className={cn(
            "mt-1 max-w-sm text-dark-5 dark:text-dark-6",
            s.desc,
          )}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
