"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  collapsed?: boolean;
  showText?: boolean;
}

export function Logo({ className, collapsed, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 shadow-sm shadow-brand-500/30">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M4 4H7.5L16 14.5V4H20V20H16.5L8 9.5V20H4V4Z"
            fill="currentColor"
          />
          <circle cx="20.5" cy="4" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
      {showText && !collapsed && (
        <span className="text-lg font-bold text-gray-800 dark:text-white/90">
          Nexus<span className="text-brand-500">Pro</span>
        </span>
      )}
    </div>
  );
}
