"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown, X, Sparkles, ChevronRight, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_GROUPS, type NavItem } from "@/lib/navigation";
import { MTVLogo } from "./logo";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ onClose, collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  // Determine which group should be open based on current path
  React.useEffect(() => {
    const initial: Record<string, boolean> = {};
    NAV_GROUPS.forEach((g) => {
      const isActive = g.items.some(
        (i) => pathname === i.href || (i.href !== "/" && pathname?.startsWith(i.href))
      );
      initial[g.title] = isActive;
    });
    setOpenGroups(initial);
  }, [pathname]);

  const toggleGroup = (title: string) =>
    setOpenGroups((s) => ({ ...s, [title]: !s[title] }));

  const isActive = (item: NavItem) =>
    pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

  return (
    <TooltipProvider delayDuration={collapsed ? 200 : 999999}>
      <aside
        className={cn(
          "relative bg-sidebar text-sidebar-foreground flex flex-col h-full transition-[width] duration-300 ease-in-out",
          "border-r border-sidebar-border",
          collapsed ? "w-[76px]" : "w-[264px]"
        )}
        aria-label="Primary navigation"
      >
        {/* Subtle top glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-64 rounded-full bg-sidebar-primary/15 blur-3xl" />

        {/* Brand header */}
        <div className="relative flex items-center justify-between gap-2 px-4 h-16 border-b border-sidebar-border shrink-0">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" className="mx-auto" aria-label="MTVerse home">
                  <MTVLogo showText={false} variant="sidebar" size={36} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">MTVerse Home</TooltipContent>
            </Tooltip>
          ) : (
            <Link href="/" className="flex-1 group">
              <MTVLogo variant="sidebar" size={36} />
            </Link>
          )}

          {/* Mobile close */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        {/* Navigation — native scroll, no nested ScrollArea (prevents double scrollbar) */}
        <nav className="relative flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scroll-area-modern">
          <ul className="flex flex-col gap-3">
            {NAV_GROUPS.map((group) => {
              const isOpen = openGroups[group.title] ?? true;

              return (
                <li key={group.title}>
                  {/* Group label / toggle */}
                  {!collapsed ? (
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className={cn(
                        "group/label flex w-full items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-sidebar-foreground/40 hover:text-sidebar-foreground/70 transition-colors cursor-pointer"
                      )}
                      aria-expanded={isOpen}
                    >
                      <span>{group.title}</span>
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-300 text-sidebar-foreground/40 group-hover/label:text-sidebar-foreground/70",
                          isOpen ? "rotate-0" : "-rotate-90"
                        )}
                      />
                    </button>
                  ) : (
                    <div className="mx-2 my-2 h-px bg-sidebar-border/60" />
                  )}

                  {/* Group items */}
                  <ul
                    className={cn(
                      "flex flex-col gap-0.5 overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-[2000px] opacity-100 mt-1" : "max-h-0 opacity-0",
                      collapsed && "max-h-[2000px] opacity-100 mt-1"
                    )}
                  >
                    {group.items.map((item) => {
                      const active = isActive(item);
                      const Icon = item.icon;
                      const content = (
                        <Link
                          href={item.href}
                          title={collapsed ? item.label : undefined}
                          aria-current={active ? "page" : undefined}
                          onMouseEnter={() => setHoveredItem(item.href)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className={cn(
                            "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200 cursor-pointer",
                            collapsed && "justify-center px-0",
                            active
                              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_8px_20px_-8px_var(--brand-glow)]"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                          )}
                        >
                          {/* Active indicator bar (left) */}
                          {active && !collapsed && (
                            <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-sidebar-primary" />
                          )}

                          <Icon
                            className={cn(
                              "size-[18px] shrink-0 transition-all duration-200",
                              active
                                ? "text-sidebar-primary-foreground"
                                : hoveredItem === item.href
                                ? "text-sidebar-foreground scale-110"
                                : "text-sidebar-foreground/55 group-hover:text-sidebar-foreground"
                            )}
                          />
                          {!collapsed && (
                            <>
                              <span className="flex-1 truncate">{item.label}</span>
                              {item.badge && (
                                <Badge
                                  variant={active ? "secondary" : "outline"}
                                  className={cn(
                                    "h-5 px-1.5 text-[10px] font-semibold",
                                    active
                                      ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground border-transparent"
                                      : "bg-sidebar-accent text-sidebar-foreground/70 border-sidebar-border"
                                  )}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </Link>
                      );

                      if (collapsed) {
                        return (
                          <li key={item.href}>
                            <Tooltip>
                              <TooltipTrigger asChild>{content}</TooltipTrigger>
                              <TooltipContent side="right" className="font-medium">
                                {item.label}
                                {item.badge && (
                                  <Badge className="ml-1.5 h-4 px-1 text-[9px]">{item.badge}</Badge>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          </li>
                        );
                      }
                      return <li key={item.href}>{content}</li>;
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer upgrade card (modern, glassy) */}
        {!collapsed && (
          <div className="relative p-3 shrink-0 border-t border-sidebar-border">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sidebar-primary/25 via-sidebar-accent to-sidebar p-4 ring-1 ring-sidebar-border">
              <div className="absolute -top-6 -right-6 size-24 rounded-full bg-sidebar-primary/30 blur-2xl" />
              <div className="absolute -bottom-8 -left-4 size-20 rounded-full bg-chart-2/15 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-sidebar-primary" />
                  <p className="text-xs font-semibold text-sidebar-foreground">MTVerse Pro</p>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-sidebar-foreground/65">
                  Unlock 50+ premium dashboards and enterprise modules.
                </p>
                <button className="mt-3 w-full rounded-lg bg-sidebar-primary px-3 py-2 text-xs font-semibold text-sidebar-primary-foreground hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-1.5 group">
                  Upgrade now
                  <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed footer mini badge */}
        {collapsed && (
          <div className="p-3 shrink-0 border-t border-sidebar-border">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-full grid place-items-center size-10 rounded-xl bg-gradient-to-br from-sidebar-primary/25 via-sidebar-accent to-sidebar ring-1 ring-sidebar-border cursor-pointer hover:opacity-90 transition-opacity">
                  <Sparkles className="size-4 text-sidebar-primary" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Upgrade to MTVerse Pro</TooltipContent>
            </Tooltip>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
