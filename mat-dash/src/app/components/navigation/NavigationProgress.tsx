"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PremiumSpinner from "../loaders/PremiumSpinner";

const MIN_LOADING_MS = 380;
const MAX_LOADING_MS = 1200;

const isModifiedEvent = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const NavigationProgress = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const startedAtRef = useRef(0);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstPathRef = useRef(true);

  const clearTimers = useCallback(() => {
    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
      finishTimerRef.current = null;
    }

    if (maxTimerRef.current) {
      clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
  }, []);

  const setLoadingState = useCallback((value: boolean) => {
    loadingRef.current = value;
    setLoading(value);
  }, []);

  const startLoading = useCallback(() => {
    clearTimers();
    startedAtRef.current = Date.now();
    setLoadingState(true);
    maxTimerRef.current = setTimeout(() => {
      setLoadingState(false);
      maxTimerRef.current = null;
    }, MAX_LOADING_MS);
  }, [clearTimers, setLoadingState]);

  const finishLoading = useCallback(() => {
    if (!loadingRef.current) return;

    if (finishTimerRef.current) {
      clearTimeout(finishTimerRef.current);
    }

    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(MIN_LOADING_MS - elapsed, 0);

    finishTimerRef.current = setTimeout(() => {
      clearTimers();
      setLoadingState(false);
    }, remaining);
  }, [clearTimers, setLoadingState]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (isModifiedEvent(event)) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const nextPath = nextUrl.pathname + nextUrl.search + nextUrl.hash;
      const currentPath = window.location.pathname + window.location.search + window.location.hash;
      if (nextPath !== currentPath) startLoading();
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [startLoading]);

  useEffect(() => {
    if (firstPathRef.current) {
      firstPathRef.current = false;
      return;
    }

    if (!loadingRef.current) {
      startLoading();
    }

    finishLoading();
  }, [finishLoading, pathname, startLoading]);

  useEffect(() => clearTimers, [clearTimers]);

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-lightgray/70 backdrop-blur-sm dark:bg-[#111827]/70"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/3 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 rounded-2xl border border-defaultBorder bg-white/90 px-6 py-5 shadow-lg dark:border-darkborder dark:bg-[#0B1120]/90">
        <PremiumSpinner size="md" variant="default" showText={true} text="Loading..." />
      </div>
    </div>
  );
};

export default NavigationProgress;
