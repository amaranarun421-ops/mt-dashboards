"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, MoreHorizontal, Star, Search, Sparkles, ArrowUpRight } from "lucide-react";
import { sidebarGroups, findRouteByPath, type RouteEntry } from "@/lib/route-map";
import { useUIStore } from "@/lib/store";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

interface SidebarProps {
  variant?: "desktop" | "mobile";
}

export function Sidebar({ variant = "desktop" }: SidebarProps) {
  const pathname = usePathname() ?? "";
  const { sidebarCollapsed, setMobileSidebarOpen, favorites, recentPages } = useUIStore();
  const collapsed = variant === "desktop" ? sidebarCollapsed : false;
  const [hovered, setHovered] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const showFull = collapsed ? hovered : true;

  const activeRoute = findRouteByPath(pathname);
  const activeParentGroup = activeRoute?.group;
  const [openGroups, setOpenGroups] = React.useState<Set<string>>(() => {
    return activeParentGroup ? new Set([activeParentGroup]) : new Set(["Dashboards"]);
  });

  React.useEffect(() => {
    if (activeParentGroup) {
      setOpenGroups((prev) => new Set([...prev, activeParentGroup]));
    }
  }, [activeParentGroup]);

  const handleGroupToggle = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const closeMobile = () => {
    if (variant === "mobile") setMobileSidebarOpen(false);
  };

  // Filter routes by search
  const filteredGroups = React.useMemo(() => {
    if (!search.trim()) return sidebarGroups;
    const q = search.toLowerCase();
    return sidebarGroups
      .map((g) => ({
        ...g,
        routes: g.routes.filter((r) => r.label.toLowerCase().includes(q)),
      }))
      .filter((g) => g.routes.length > 0);
  }, [search]);

  // Recent routes (lookup from path)
  const recentRoutes = recentPages
    .map((p) => findRouteByPath(p))
    .filter((r): r is RouteEntry => !!r && !r.hidden)
    .slice(0, 4);

  // Favorite routes
  const favoriteRoutes = favorites
    .map((p) => findRouteByPath(p))
    .filter((r): r is RouteEntry => !!r && !r.hidden)
    .slice(0, 5);

  return (
    <aside
      onMouseEnter={() => collapsed && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex h-full flex-col bg-white dark:bg-gray-900 text-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out",
        showFull ? "w-[290px]" : "w-[90px]",
        variant === "mobile" && "w-[290px]"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "py-6 flex",
          !showFull && variant === "desktop" ? "lg:justify-center" : "justify-start px-5"
        )}
      >
        {showFull || variant === "mobile" ? (
          <Link href="/" aria-label="Nexus Pro home">
            <Logo />
          </Link>
        ) : (
          <Link href="/" aria-label="Nexus Pro home">
            <Logo collapsed showText={false} />
          </Link>
        )}
        {variant === "mobile" && (
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="ml-auto mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Mini search */}
      {(showFull || variant === "mobile") && (
        <div className="px-5 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter navigation..."
              className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-xs text-gray-700 placeholder:text-gray-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:focus:bg-white/[0.05]"
            />
          </div>
        </div>
      )}

      {/* Nav */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar flex-1">
        <nav className="mb-6 px-5">
          {/* Favorites */}
          {(showFull || variant === "mobile") && favoriteRoutes.length > 0 && !search && (
            <div className="mb-4">
              <h3 className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Star className="h-3 w-3 fill-warning-400 text-warning-400" /> Favorites
              </h3>
              <ul className="space-y-0.5">
                {favoriteRoutes.map((r) => {
                  const Icon = r.icon;
                  const active = activeRoute?.id === r.id;
                  return (
                    <li key={`fav-${r.id}`}>
                      <Link
                        href={r.path}
                        onClick={closeMobile}
                        className={cn(
                          "menu-item group",
                          active ? "menu-item-active" : "menu-item-inactive"
                        )}
                      >
                        <span className={active ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
                          <Icon className="size-4.5" />
                        </span>
                        <span className="menu-item-text text-sm">{r.label}</span>
                        <Star className="ml-auto h-3.5 w-3.5 fill-warning-400 text-warning-400 group-hover:opacity-80" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Recent */}
          {(showFull || variant === "mobile") && recentRoutes.length > 0 && !search && (
            <div className="mb-4">
              <h3 className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> Recently visited
              </h3>
              <ul className="space-y-0.5">
                {recentRoutes.map((r) => {
                  const Icon = r.icon;
                  const active = activeRoute?.id === r.id;
                  return (
                    <li key={`rec-${r.id}`}>
                      <Link
                        href={r.path}
                        onClick={closeMobile}
                        className={cn(
                          "menu-item group",
                          active ? "menu-item-active" : "menu-item-inactive"
                        )}
                      >
                        <span className={active ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
                          <Icon className="size-4.5" />
                        </span>
                        <span className="menu-item-text text-sm">{r.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Groups */}
          <div className="flex flex-col gap-4">
            {filteredGroups.map((group) => {
              const isOpen = openGroups.has(group.label) || !!search;
              const isParentOfActive = activeParentGroup === group.label;
              return (
                <div key={group.id}>
                  <button
                    onClick={() => handleGroupToggle(group.label)}
                    className={cn(
                      "mb-3 text-xs uppercase leading-[20px] font-semibold flex items-center w-full",
                      !showFull && variant === "desktop" ? "lg:justify-center" : "justify-between px-1",
                      isParentOfActive ? "text-brand-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    )}
                  >
                    {showFull || variant === "mobile" ? (
                      <>
                        <span>{group.label}</span>
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} />
                      </>
                    ) : (
                      <MoreHorizontal className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {(showFull || variant === "mobile") && isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden space-y-0.5"
                      >
                        {group.routes.map((route) => {
                          const Icon = route.icon;
                          const active = activeRoute?.id === route.id;
                          return (
                            <li key={route.id}>
                              <Link
                                href={route.path}
                                onClick={closeMobile}
                                className={cn(
                                  "menu-item group",
                                  active ? "menu-item-active" : "menu-item-inactive",
                                  !showFull && variant === "desktop" && "lg:justify-center"
                                )}
                                title={!showFull && variant === "desktop" ? route.label : undefined}
                              >
                                <span className={active ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
                                  <Icon className="size-5" />
                                </span>
                                {(showFull || variant === "mobile") && (
                                  <>
                                    <span className="menu-item-text">{route.label}</span>
                                    {route.badge && (
                                      <span
                                        className={cn(
                                          "ml-auto block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
                                          route.badgeVariant === "success"
                                            ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                                            : route.badgeVariant === "warning"
                                            ? "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400"
                                            : route.badgeVariant === "error"
                                            ? "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                                            : route.badgeVariant === "info"
                                            ? "bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-400"
                                            : route.badgeVariant === "pro"
                                            ? "bg-gradient-to-r from-brand-500 to-purple-500 text-white"
                                            : route.badgeVariant === "new"
                                            ? "bg-success-500 text-white"
                                            : "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                                        )}
                                      >
                                        {route.badge}
                                      </span>
                                    )}
                                  </>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Widget */}
        {(showFull || variant === "mobile") && (
          <div className="px-5">
            <div className="relative overflow-hidden mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-5 text-center text-white shadow-lg shadow-brand-500/20">
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/5" />
              <div className="relative">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">Nexus Pro · Enterprise</h3>
                <p className="mb-4 text-xs text-white/80">
                  Unlock advanced analytics, dedicated support, and white-label branding.
                </p>
                <Link
                  href="/pricing-license"
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2.5 text-xs font-semibold text-brand-700 transition hover:bg-white/90"
                >
                  Upgrade to Enterprise <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
