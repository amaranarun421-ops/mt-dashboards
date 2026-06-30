import { cn } from "@/lib/utils";
import * as React from "react";

type BannerProps = {
  title: string;
  description?: string;
  tone?: "info" | "success" | "warning" | "danger" | "primary";
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  className?: string;
};

const toneClasses = {
  info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light border-blue/20",
  success: "bg-primary-subtle text-primary-dark dark:bg-primary/15 dark:text-primary-light border-primary/20",
  warning: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light border-accent/20",
  danger: "bg-red-light-5 text-red-dark dark:bg-red/15 dark:text-red-light border-red/20",
  primary: "bg-primary-subtle text-primary-dark dark:bg-primary/15 dark:text-primary-light border-primary/20",
};

export function Banner({
  title,
  description,
  tone = "info",
  icon,
  action,
  onClose,
  className,
}: BannerProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4",
        toneClasses[tone],
        className,
      )}
    >
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        {description && (
          <p className="mt-0.5 text-sm opacity-90">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 rounded p-0.5 opacity-70 transition hover:opacity-100"
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
