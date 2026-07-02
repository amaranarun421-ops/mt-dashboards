"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TailButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function TailButton({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  disabled = false,
  className = "",
}: TailButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2.5 text-theme-sm",
    md: "px-5 py-3.5 text-sm",
  };

  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium gap-2 rounded-lg transition",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
}
