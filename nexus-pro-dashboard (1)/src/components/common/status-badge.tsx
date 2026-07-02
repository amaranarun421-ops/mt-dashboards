"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "light" | "solid";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: "sm" | "md";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
  className,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  const sizeStyles = {
    sm: "text-theme-xs",
    md: "text-sm",
  };

  const variants = {
    light: {
      primary:
        "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
      success:
        "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
      error:
        "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
      warning:
        "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
      info: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
      light: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
      dark: "bg-gray-500 text-white dark:bg-white/5 dark:text-white",
    },
    solid: {
      primary: "bg-brand-500 text-white dark:text-white",
      success: "bg-success-500 text-white dark:text-white",
      error: "bg-error-500 text-white dark:text-white",
      warning: "bg-warning-500 text-white dark:text-white",
      info: "bg-blue-light-500 text-white dark:text-white",
      light: "bg-gray-400 dark:bg-white/5 text-white dark:text-white/80",
      dark: "bg-gray-700 text-white dark:text-white",
    },
  };

  const sizeClass = sizeStyles[size];
  const colorStyles = variants[variant][color];

  return (
    <span className={cn(baseStyles, sizeClass, colorStyles, className)}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
}

// Status badge with dot, maps to TailAdmin colors
interface StatusBadgeProps {
  variant: "success" | "warning" | "error" | "info" | "neutral" | "primary";
  children: React.ReactNode;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
  /** Size is accepted for backward compat but currently fixed at "sm" internally. */
  size?: "sm" | "md";
}

export function StatusBadge({
  variant,
  children,
  dot = false,
  pulse = false,
  className,
}: StatusBadgeProps) {
  const colorMap: Record<string, BadgeColor> = {
    success: "success",
    warning: "warning",
    error: "error",
    info: "info",
    neutral: "light",
    primary: "primary",
  };

  const dotColors: Record<string, string> = {
    success: "bg-success-500",
    warning: "bg-warning-500",
    error: "bg-error-500",
    info: "bg-blue-light-500",
    neutral: "bg-gray-400",
    primary: "bg-brand-500",
  };

  return (
    <Badge color={colorMap[variant]} size="sm" className={className}>
      {dot && (
        <span className="relative mr-1 flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                dotColors[variant]
              )}
            />
          )}
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dotColors[variant]
            )}
          />
        </span>
      )}
      {children}
    </Badge>
  );
}
