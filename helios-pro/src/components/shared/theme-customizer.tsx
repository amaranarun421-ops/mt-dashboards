"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import * as React from "react";
import { createPortal } from "react-dom";

type ColorKey = "emerald" | "amber" | "rose" | "violet" | "cyan" | "blue";

const colorOptions: { key: ColorKey; label: string; hex: string; dark: string }[] = [
  { key: "emerald", label: "Emerald", hex: "#10b981", dark: "#047857" },
  { key: "amber", label: "Amber", hex: "#f59e0b", dark: "#d97706" },
  { key: "rose", label: "Rose", hex: "#f43f5e", dark: "#e11d48" },
  { key: "violet", label: "Violet", hex: "#8b5cf6", dark: "#7c3aed" },
  { key: "cyan", label: "Cyan", hex: "#06b6d4", dark: "#0891b2" },
  { key: "blue", label: "Sky", hex: "#0ea5e9", dark: "#0284c7" },
];

function applyThemeColor(hex: string, dark: string) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", hex);
  root.style.setProperty("--color-primary-dark", dark);
  root.style.setProperty("--color-primary-light", hex);
  // Also override green since primary aliases it
  root.style.setProperty("--color-green", hex);
  root.style.setProperty("--color-green-dark", dark);
}

export function ThemeCustomizer() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [activeColor, setActiveColor] = React.useState<ColorKey>("emerald");
  const [density, setDensity] = React.useState<"comfortable" | "compact">("comfortable");

  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("helios-color") as ColorKey | null;
    if (saved) {
      const opt = colorOptions.find((c) => c.key === saved);
      if (opt) {
        setActiveColor(saved);
        applyThemeColor(opt.hex, opt.dark);
      }
    }
    const savedDensity = localStorage.getItem("helios-density") as "comfortable" | "compact" | null;
    if (savedDensity) setDensity(savedDensity);
  }, []);

  // Lock body scroll when open
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function pickColor(c: { key: ColorKey; hex: string; dark: string }) {
    setActiveColor(c.key);
    applyThemeColor(c.hex, c.dark);
    if (typeof window !== "undefined") localStorage.setItem("helios-color", c.key);
  }

  function pickDensity(d: "comfortable" | "compact") {
    setDensity(d);
    if (typeof window !== "undefined") localStorage.setItem("helios-density", d);
    document.documentElement.dataset.density = d;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="grid size-12 cursor-pointer place-items-center rounded-full border bg-gray-2 text-dark outline-none transition hover:text-primary hover:border-primary/40 focus-visible:border-primary focus-visible:text-primary dark:border-dark-4 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3 dark:focus-visible:border-primary"
        aria-label="Open theme customizer"
        title="Theme customizer"
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <path d="M12 3a9 9 0 100 18 1 1 0 01.5-1.87A3 3 0 0116 16.13a3 3 0 014.5 2.6c0 .2 0 .4-.05.6A9 9 0 0012 3z" stroke="currentColor" strokeWidth="1.6"/>
          <circle cx="7.5" cy="11" r="1" fill="currentColor"/>
          <circle cx="11.5" cy="7.5" r="1" fill="currentColor"/>
          <circle cx="15.5" cy="9.5" r="1" fill="currentColor"/>
        </svg>
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0" style={{ zIndex: 9999 }}>
          <div
            className="absolute inset-0 bg-dark/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm overflow-y-auto bg-white p-5 shadow-4 dark:bg-gray-dark helios-scroll"
            style={{ animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-dark dark:text-white">Theme Customizer</h3>
              <button
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-lg text-dark-5 transition hover:bg-gray-2 dark:hover:bg-white/5"
                aria-label="Close theme customizer"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Mode */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Mode</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["light", "dark"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setTheme(m)}
                      className={cn(
                        "rounded-xl border px-3 py-3 text-sm font-medium capitalize transition",
                        theme === m
                          ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                          : "border-stroke text-dark-7 hover:bg-gray-2 dark:border-dark-3 dark:text-dark-7 dark:hover:bg-dark-3",
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Primary color</p>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => pickColor(c)}
                      className={cn(
                        "group flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition",
                        activeColor === c.key
                          ? "border-dark/40 dark:border-white/40"
                          : "border-stroke hover:border-dark/20 dark:border-dark-3 dark:hover:border-white/20",
                      )}
                    >
                      <span
                        className="size-7 rounded-full"
                        style={{ background: c.hex }}
                      />
                      <span className="text-[11px] font-medium text-dark-5 dark:text-dark-6">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Density */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Density</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["comfortable", "compact"] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => pickDensity(d)}
                      className={cn(
                        "rounded-xl border px-3 py-2.5 text-xs font-medium capitalize transition",
                        density === d
                          ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                          : "border-stroke text-dark-7 hover:bg-gray-2 dark:border-dark-3 dark:text-dark-7 dark:hover:bg-dark-3",
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  pickColor(colorOptions[0]);
                  setTheme("light");
                  pickDensity("comfortable");
                }}
                className="w-full rounded-lg border border-stroke py-2.5 text-sm font-medium text-dark-7 transition hover:bg-gray-2 dark:border-dark-3 dark:text-dark-7 dark:hover:bg-dark-3"
              >
                Reset to defaults
              </button>
            </div>
          </div>
          <style jsx>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </div>,
        document.body,
      )}
    </>
  );
}
