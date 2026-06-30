"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "./logo";

/**
 * Navigation spinner that appears in the content area, centered in the viewport,
 * whenever the route changes. It auto-dismisses once the new route has rendered
 * and a short minimum visibility window has elapsed (so the spinner never flashes).
 */
export function NavigationSpinner() {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const minTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAtRef = React.useRef<number>(0);

  // Whenever the pathname changes, show the spinner briefly.
  React.useEffect(() => {
    // Skip on first mount (initial load).
    if (startedAtRef.current === 0) {
      startedAtRef.current = Date.now();
      return;
    }

    setLoading(true);
    const MIN_VISIBLE = 500; // ms – avoids spinner flashing on fast nav

    // Clear any pending hide timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (minTimerRef.current) clearTimeout(minTimerRef.current);

    // Hide after the route has settled + at least MIN_VISIBLE ms have passed.
    minTimerRef.current = setTimeout(() => {
      setLoading(false);
    }, MIN_VISIBLE);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  // Safety: never show spinner for more than 4s
  React.useEffect(() => {
    if (!loading) return;
    const safety = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(safety);
  }, [loading]);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Soft backdrop scoped to the viewport */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] animate-fade-in" />

      {/* Spinner stack */}
      <div className="relative flex flex-col items-center gap-4 animate-scale-in">
        <div className="relative size-16">
          {/* Outer rotating ring */}
          <svg
            className="absolute inset-0 size-full animate-spin"
            style={{ animationDuration: "900ms" }}
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="var(--muted)"
              strokeWidth="4"
              fill="none"
              opacity="0.3"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="var(--primary)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="120 200"
              strokeDashoffset="0"
            />
          </svg>
          {/* Centered logo mark */}
          <div className="absolute inset-0 grid place-items-center">
            <LogoMark size={28} />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Loading</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Preparing your workspace…</p>
        </div>
      </div>
    </div>
  );
}
