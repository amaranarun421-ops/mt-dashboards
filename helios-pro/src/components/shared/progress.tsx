import { cn } from "@/lib/utils";
import * as React from "react";

type ProgressProps = {
  value: number;
  max?: number;
  tone?: "primary" | "accent" | "violet" | "info" | "rose" | "success" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
};

const toneClasses = {
  primary: "bg-primary",
  accent: "bg-accent",
  violet: "bg-violet",
  info: "bg-blue",
  rose: "bg-rose",
  success: "bg-green",
  danger: "bg-red",
};

const sizeMap = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export function Progress({
  value,
  max = 100,
  tone = "primary",
  size = "sm",
  showLabel,
  label,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-dark-5 dark:text-dark-6">{label || "Progress"}</span>
          <span className="font-semibold text-dark dark:text-white">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-gray-3 dark:bg-dark-3",
          sizeMap[size],
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", toneClasses[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({
  value,
  max = 100,
  size = 80,
  stroke = 8,
  tone = "primary",
  label,
  className,
}: {
  value: number;
  max?: number;
  size?: number;
  stroke?: number;
  tone?: keyof typeof toneClasses;
  label?: React.ReactNode;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const strokeColor: Record<string, string> = {
    primary: "#10b981",
    accent: "#f59e0b",
    violet: "#8b5cf6",
    info: "#0ea5e9",
    rose: "#f43f5e",
    success: "#10b981",
    danger: "#ef4444",
  };

  return (
    <div
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-gray-3 dark:text-dark-3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor[tone]}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        {label || (
          <span className="text-sm font-bold text-dark dark:text-white">
            {Math.round(pct)}%
          </span>
        )}
      </div>
    </div>
  );
}
