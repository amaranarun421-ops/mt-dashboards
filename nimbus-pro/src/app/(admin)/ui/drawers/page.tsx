"use client";
import { useState, useEffect } from "react";
import {
  PageHeader,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Label,
  Badge,
  Avatar,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { X, Filter, Bell, Settings, Search, SlidersHorizontal, ChevronRight } from "lucide-react";

type Side = "right" | "left" | "top" | "bottom";
type Size = "sm" | "md" | "lg";

const SIZE_DIM: Record<Side, Record<Size, string>> = {
  right: { sm: "w-80", md: "w-96", lg: "w-[32rem]" },
  left: { sm: "w-80", md: "w-96", lg: "w-[32rem]" },
  top: { sm: "h-48", md: "h-64", lg: "h-80" },
  bottom: { sm: "h-48", md: "h-64", lg: "h-80" },
};

const PANEL_ANIM: Record<Side, string> = {
  right: "animate-slide-in-right",
  left: "animate-slide-in-left",
  top: "animate-slide-in-top",
  bottom: "animate-slide-in-bottom",
};

function Drawer({
  open,
  onClose,
  side,
  size = "md",
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  side: Side;
  size?: Size;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const positionClass: Record<Side, string> = {
    right: "right-0 top-0 bottom-0",
    left: "left-0 top-0 bottom-0",
    top: "left-0 right-0 top-0",
    bottom: "left-0 right-0 bottom-0",
  };

  const isVertical = side === "right" || side === "left";

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "absolute flex flex-col bg-white shadow-theme-2xl dark:bg-gray-900",
          positionClass[side],
          isVertical ? SIZE_DIM[side][size] : SIZE_DIM[side][size],
          PANEL_ANIM[side]
        )}
      >
        {title && (
          <div className="flex items-start justify-between gap-3 border-b border-gray-100 p-5 dark:border-gray-800">
            <div className="min-w-0 space-y-0.5">
              <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
              {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className={cn("flex-1 overflow-y-auto p-5", !isVertical && "max-h-full")}>{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slide-in-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes slide-in-top { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes slide-in-bottom { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slide-in-right { animation: slide-in-right .3s cubic-bezier(.16,1,.3,1) both; }
        .animate-slide-in-left { animation: slide-in-left .3s cubic-bezier(.16,1,.3,1) both; }
        .animate-slide-in-top { animation: slide-in-top .3s cubic-bezier(.16,1,.3,1) both; }
        .animate-slide-in-bottom { animation: slide-in-bottom .3s cubic-bezier(.16,1,.3,1) both; }
      `}</style>
    </div>
  );
}

export default function DrawersPage() {
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(false);
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [size, setSize] = useState<Size>("md");

  return (
    <div className="space-y-4">
      <PageHeader
        title="Drawers"
        description="Right, left, top, bottom panels — built inline with state + fixed overlay + slide animation."
        breadcrumbs={[{ label: "UI Components" }, { label: "Drawers" }]}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Right */}
        <Card>
          <CardHeader title="Right Drawer" description="Slides in from the right edge" />
          <CardBody>
            <Button variant="primary" onClick={() => setRight(true)}>
              <Filter className="h-4 w-4" /> Open right
            </Button>
          </CardBody>
        </Card>

        {/* Left */}
        <Card>
          <CardHeader title="Left Drawer" description="Navigation or filters from the left" />
          <CardBody>
            <Button variant="secondary" onClick={() => setLeft(true)}>
              <SlidersHorizontal className="h-4 w-4" /> Open left
            </Button>
          </CardBody>
        </Card>

        {/* Top */}
        <Card>
          <CardHeader title="Top Drawer" description="Banner-style panel from the top" />
          <CardBody>
            <Button variant="outline" onClick={() => setTop(true)}>
              <Bell className="h-4 w-4" /> Open top
            </Button>
          </CardBody>
        </Card>

        {/* Bottom */}
        <Card>
          <CardHeader title="Bottom Drawer" description="Sheet-style panel from the bottom" />
          <CardBody>
            <Button variant="ghost" onClick={() => setBottom(true)}>
              <Settings className="h-4 w-4" /> Open bottom
            </Button>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="sm, md, lg — pick a size then open" />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {(["sm", "md", "lg"] as Size[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase transition-all",
                    size === s
                      ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <Button variant="primary" size="sm" className="mt-3" onClick={() => setRight(true)}>
              Open right drawer · {size}
            </Button>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card>
          <CardHeader title="Anatomy" description="What makes up a drawer" />
          <CardBody>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-brand-500" /> Fixed overlay with backdrop blur</li>
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-brand-500" /> Anchored panel — one side only</li>
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-brand-500" /> Header with title + close X</li>
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-brand-500" /> Scrollable body</li>
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-brand-500" /> Optional sticky footer</li>
              <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-brand-500" /> Esc + backdrop click to close</li>
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* Right drawer — filters */}
      <Drawer
        open={right}
        onClose={() => setRight(false)}
        side="right"
        size={size}
        title="Filters"
        description="Narrow down your results"
        footer={
          <>
            <Button variant="ghost" size="sm">Reset</Button>
            <Button variant="primary" size="sm" onClick={() => setRight(false)}>Apply 3 filters</Button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <Label>Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Keyword…" className="pl-9" />
            </div>
          </div>
          <div>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-2">
              {["Active", "Pending", "Archived"].map((s, i) => (
                <button
                  key={s}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all",
                    i === 0
                      ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Price range</Label>
            <div className="flex items-center gap-2">
              <Input type="number" placeholder="Min" />
              <span className="text-gray-400">—</span>
              <Input type="number" placeholder="Max" />
            </div>
          </div>
          <div>
            <Label>Categories</Label>
            <div className="space-y-2">
              {["Electronics", "Apparel", "Home & Garden", "Sports", "Books"].map((c, i) => (
                <label key={c} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input type="checkbox" defaultChecked={i < 2} className="h-4 w-4 rounded border-gray-300 text-brand-500" />
                  {c}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
            <p className="font-semibold text-gray-700 dark:text-gray-300">Tip</p>
            <p className="mt-1">Drawers keep users in context — great for filters, settings, and quick edits.</p>
          </div>
        </div>
      </Drawer>

      {/* Left drawer — navigation */}
      <Drawer
        open={left}
        onClose={() => setLeft(false)}
        side="left"
        size="md"
        title="Workspace menu"
        description="Switch between workspaces"
      >
        <div className="space-y-2">
          {[
            { name: "Lumina Inc", role: "Owner", active: true },
            { name: "Acme Corp", role: "Admin" },
            { name: "Side project", role: "Member" },
            { name: "Personal", role: "Owner" },
          ].map((w) => (
            <button
              key={w.name}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all",
                w.active
                  ? "border-brand-300 bg-brand-50 dark:border-brand-700 dark:bg-brand-500/10"
                  : "border-gray-100 hover:border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
              )}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-sm font-bold text-white">
                {w.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{w.name}</p>
                <p className="text-xs text-gray-500">{w.role}</p>
              </div>
              {w.active && <Badge tone="brand" variant="solid">Current</Badge>}
            </button>
          ))}
          <div className="border-t border-gray-100 pt-2 dark:border-gray-800">
            <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-400 dark:border-gray-700">+</div>
              Create new workspace
            </button>
          </div>
        </div>
      </Drawer>

      {/* Top drawer — notifications */}
      <Drawer
        open={top}
        onClose={() => setTop(false)}
        side="top"
        size="lg"
        title="3 new notifications"
      >
        <div className="space-y-2">
          {[
            { icon: Bell, tone: "brand", title: "New comment on Design Spec v3", time: "2m ago" },
            { icon: Settings, tone: "purple", title: "Backup completed successfully", time: "1h ago" },
            { icon: Search, tone: "warning", title: "Storage 85% full — upgrade recommended", time: "3h ago" },
          ].map((n, i) => {
            const toneMap: Record<string, string> = {
              brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
              purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
              warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
            };
            const Icon = n.icon;
            return (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", toneMap[n.tone])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.time}</p>
                </div>
                <button className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">View</button>
              </div>
            );
          })}
        </div>
      </Drawer>

      {/* Bottom drawer — quick settings */}
      <Drawer
        open={bottom}
        onClose={() => setBottom(false)}
        side="bottom"
        size="md"
        title="Quick settings"
        description="Adjust your preferences"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Theme", value: "System", icon: Settings },
            { label: "Language", value: "English", icon: Search },
            { label: "Timezone", value: "PST", icon: Bell },
            { label: "Density", value: "Comfortable", icon: SlidersHorizontal },
            { label: "Notifications", value: "All", icon: Bell },
            { label: "Sounds", value: "On", icon: Settings },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.label}
                className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 text-left transition-all hover:border-brand-300 hover:bg-brand-50 dark:border-gray-800 dark:hover:border-brand-700 dark:hover:bg-brand-500/10"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-gray-500">{s.label}</p>
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{s.value}</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
          <Avatar name="Aria Chen" size={24} />
          <span>Signed in as <span className="font-semibold text-gray-700 dark:text-gray-300">aria@nimbus.pro</span></span>
        </div>
      </Drawer>
    </div>
  );
}
