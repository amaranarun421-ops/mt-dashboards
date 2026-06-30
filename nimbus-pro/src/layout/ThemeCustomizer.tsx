"use client";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme, type ColorKey } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { X, Sun, Moon, Check, Sliders } from "lucide-react";

const COLORS: { key: ColorKey; label: string; color: string }[] = [
  { key: "emerald", label: "Emerald", color: "#10b981" },
  { key: "violet", label: "Violet", color: "#8b5cf6" },
  { key: "rose", label: "Rose", color: "#f43f5e" },
  { key: "amber", label: "Amber", color: "#f59e0b" },
  { key: "sky", label: "Sky", color: "#0ea5e9" },
];

export default function ThemeCustomizer() {
  const { isCustomizerOpen, setCustomizerOpen } = useSidebar();
  const { theme, setTheme, density, setDensity, color, setColor } = useTheme();

  if (!isCustomizerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-fade-in" onClick={() => setCustomizerOpen(false)}>
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />
      <div
        className="relative h-full w-full max-w-sm overflow-y-auto bg-white shadow-theme-2xl dark:bg-gray-900 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
              <Sliders className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Theme Customizer</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Customize the look & feel</p>
            </div>
          </div>
          <button
            onClick={() => setCustomizerOpen(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 p-5">
          {/* Mode */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Mode</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all",
                  theme === "light" ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                )}
              >
                <Sun className={cn("h-5 w-5", theme === "light" ? "text-brand-500" : "text-gray-400")} />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Light</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all",
                  theme === "dark" ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                )}
              >
                <Moon className={cn("h-5 w-5", theme === "dark" ? "text-brand-500" : "text-gray-400")} />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Dark</span>
              </button>
            </div>
          </section>

          {/* Primary color */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Primary Color</p>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setColor(c.key)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110",
                    color === c.key && "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
                  )}
                  style={{ backgroundColor: c.color, boxShadow: `0 0 0 ${color === c.key ? "2px" : "0"} ${c.color}` }}
                  title={c.label}
                >
                  {color === c.key && <Check className="h-4 w-4 text-white" />}
                </button>
              ))}
            </div>
          </section>

          {/* Density */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Density</p>
            <div className="grid grid-cols-2 gap-2">
              {(["comfortable", "compact"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDensity(d)}
                  className={cn(
                    "rounded-xl border-2 p-3 text-left transition-all",
                    density === d ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                  )}
                >
                  <p className="text-xs font-semibold capitalize text-gray-900 dark:text-white">{d}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {d === "comfortable" ? "More spacing" : "Tighter spacing"}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Layout options */}
          <section>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Layout Options</p>
            <div className="space-y-2">
              {[
                { label: "RTL Mode", desc: "Right-to-left layout", enabled: false },
                { label: "Sidebar Collapsed", desc: "Compact sidebar by default", enabled: false },
                { label: "Sticky Header", desc: "Keep header on scroll", enabled: true },
                { label: "Page Transitions", desc: "Smooth section reveals", enabled: true },
              ].map((opt) => (
                <div key={opt.label} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 dark:border-gray-800">
                  <div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">{opt.label}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{opt.desc}</p>
                  </div>
                  <span className={cn("relative h-5 w-9 rounded-full transition-colors", opt.enabled ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700")}>
                    <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform", opt.enabled ? "left-4" : "left-0.5")} />
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
