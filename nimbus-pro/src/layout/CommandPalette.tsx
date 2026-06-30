"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { flatNav } from "@/config/navigation";
import { Search, CornerDownLeft, ArrowUp, ArrowDown, Hash } from "lucide-react";
import Link from "next/link";

export default function CommandPalette() {
  const { isCommandOpen, setCommandOpen } = useSidebar();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return flatNav.slice(0, 8);
    const q = query.toLowerCase();
    return flatNav
      .filter((item) => item.name.toLowerCase().includes(q) || item.parent.toLowerCase().includes(q) || item.group.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query]);

  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandOpen]);

  // Reset query and activeIndex when palette closes
  useEffect(() => {
    if (!isCommandOpen) {
      const t = setTimeout(() => {
        setQuery("");
        setActiveIndex(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isCommandOpen]);

  // Reset activeIndex when query changes (handled in onChange, not effect, to avoid cascading renders)

  if (!isCommandOpen) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      window.location.href = results[activeIndex].path;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[15vh] animate-fade-in" onClick={() => setCommandOpen(false)}>
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-2xl animate-scale-in dark:border-gray-800 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-gray-100 p-4 dark:border-gray-800">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search pages..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white"
          />
          <button
            onClick={() => setCommandOpen(false)}
            className="rounded-md border border-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 dark:border-gray-700"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-gray-500 dark:text-gray-400">No results found for &ldquo;{query}&rdquo;</div>
          ) : (
            <>
              <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {query ? "Results" : "Frequently used"}
              </p>
              {results.map((item, i) => (
                <Link
                  key={item.path + i}
                  href={item.path}
                  onClick={() => setCommandOpen(false)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                    i === activeIndex ? "bg-brand-50 dark:bg-brand-500/10" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    <Hash className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.group} · {item.parent}</p>
                  </div>
                  {i === activeIndex && (
                    <CornerDownLeft className="h-3.5 w-3.5 text-gray-400" />
                  )}
                </Link>
              ))}
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-2.5 text-[11px] text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" />
              <ArrowDown className="h-3 w-3" />
              navigate
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" />
              open
            </span>
          </div>
          <span className="font-semibold text-brand-600 dark:text-brand-400">Nimbus Pro</span>
        </div>
      </div>
    </div>
  );
}
