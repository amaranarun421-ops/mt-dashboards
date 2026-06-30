"use client";

import { FLAT_NAV } from "@/components/Layouts/sidebar/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { createPortal } from "react-dom";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const results = React.useMemo(() => {
    if (!query.trim()) return FLAT_NAV.slice(0, 8);
    const q = query.toLowerCase();
    return FLAT_NAV.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.parent.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    ).slice(0, 12);
  }, [query]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(results.length - 1, i + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      }
      if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        router.push(results[activeIndex].url);
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, results, activeIndex, router]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-start justify-center p-4 pt-[15vh]" style={{ zIndex: 9999 }}>
      <div
        className="absolute inset-0 bg-dark/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-stroke bg-white shadow-4 animate-slide-up dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center gap-3 border-b border-stroke px-4 dark:border-dark-3">
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" className="text-dark-5">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search pages, dashboards, apps..."
            className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-dark-6 dark:text-white"
          />
          <kbd className="hidden rounded border border-stroke px-1.5 py-0.5 text-[10px] font-medium text-dark-5 dark:border-dark-3 dark:text-dark-6 sm:inline-block">
            ESC
          </kbd>
        </div>
        <ul className="helios-scroll max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-dark-5 dark:text-dark-6">
              No matches for &quot;{query}&quot;
            </li>
          ) : (
            results.map((r, i) => (
              <li key={r.url}>
                <Link
                  href={r.url}
                  onClick={onClose}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                    i === activeIndex
                      ? "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                      : "text-dark-7 dark:text-dark-7",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-dark-5 dark:text-dark-6">›</span>
                    <span className="font-medium">{r.title}</span>
                  </span>
                  <span className="text-xs text-dark-5 dark:text-dark-6">
                    {r.parent}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
        <div className="border-t border-stroke bg-gray-2 px-4 py-2.5 dark:border-dark-3 dark:bg-dark-2">
          <p className="text-[11px] text-dark-5 dark:text-dark-6">
            <kbd className="rounded border border-stroke px-1 dark:border-dark-3">↑↓</kbd>{" "}
            navigate{" "}
            <kbd className="rounded border border-stroke px-1 dark:border-dark-3">↵</kbd>{" "}
            select{" "}
            <kbd className="rounded border border-stroke px-1 dark:border-dark-3">esc</kbd>{" "}
            close
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function useCommandPalette() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return { open, setOpen };
}
