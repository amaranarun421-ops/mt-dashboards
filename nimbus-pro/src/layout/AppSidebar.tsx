"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { navigation, type NavItem } from "@/config/navigation";
import { ChevronDown, Search, X } from "lucide-react";

export default function AppSidebar() {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const isActive = useCallback(
    (path?: string) => {
      if (!path) return false;
      if (path === "/") return pathname === "/";
      return pathname === path || pathname.startsWith(path + "/");
    },
    [pathname]
  );

  // Auto-open the group containing the active route
  useEffect(() => {
    navigation.forEach((section) => {
      section.items.forEach((item) => {
        const paths = item.children ? item.children.map((c) => c.path) : item.path ? [item.path] : [];
        if (paths.some((p) => isActive(p))) {
          setOpenGroups((prev) => new Set(prev).add(item.name));
        }
      });
    });
  }, [pathname, isActive]);

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  // Search filtering
  const filteredNav = useMemo(() => {
    if (!search.trim()) return navigation;
    const q = search.toLowerCase();
    return navigation
      .map((section) => ({
        ...section,
        items: section.items
          .map((item) => {
            if (item.children) {
              const children = item.children.filter((c) => c.name.toLowerCase().includes(q) || item.name.toLowerCase().includes(q));
              return children.length ? { ...item, children } : null;
            }
            return item.name.toLowerCase().includes(q) ? item : null;
          })
          .filter(Boolean) as NavItem[],
      }))
      .filter((section) => section.items.length > 0);
  }, [search]);

  const showText = isExpanded || isHovered || isMobileOpen;

  return (
    <aside
      className={`fixed top-0 left-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-white text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900
        ${isExpanded || isMobileOpen ? "w-[280px]" : isHovered ? "w-[280px]" : "w-[76px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className={`flex h-16 shrink-0 items-center border-b border-gray-100 dark:border-gray-800 ${showText ? "px-5" : "justify-center px-3"}`}>
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-icon.svg"
            alt="Nimbus Pro"
            width={32}
            height={32}
            className="shrink-0"
            priority
          />
          {showText && (
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Nimbus</span>
              <span className="text-lg font-semibold tracking-tight text-brand-500">Pro</span>
            </div>
          )}
        </Link>
      </div>

      {/* Search */}
      {showText && (
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages..."
              className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-xs font-medium text-gray-700 placeholder:text-gray-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:focus:bg-gray-900"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6 no-scrollbar">
        {filteredNav.map((section) => (
          <div key={section.label} className="mb-5">
            {showText && <p className="menu-section-label mt-3">{section.label}</p>}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const ItemIcon = item.icon;
                const hasChildren = !!item.children?.length;
                const isOpen = openGroups.has(item.name) || !!search;
                const active = hasChildren ? item.children!.some((c) => isActive(c.path)) : isActive(item.path);

                return (
                  <li key={item.name}>
                    {hasChildren ? (
                      <button
                        onClick={() => toggleGroup(item.name)}
                        className={`menu-item w-full ${active ? "menu-item-active" : ""} ${!showText && "lg:justify-center"}`}
                      >
                        <ItemIcon className="menu-item-icon" />
                        {showText && <span className="flex-1 text-left">{item.name}</span>}
                        {showText && item.badge && (
                          <span className="menu-dropdown-badge">{item.badge}</span>
                        )}
                        {showText && (
                          <ChevronDown
                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.path!}
                        className={`menu-item ${active ? "menu-item-active" : ""} ${!showText && "lg:justify-center"}`}
                      >
                        <ItemIcon className="menu-item-icon" />
                        {showText && <span className="flex-1">{item.name}</span>}
                        {showText && item.badge && (
                          <span className="menu-dropdown-badge">{item.badge}</span>
                        )}
                      </Link>
                    )}

                    {hasChildren && showText && (
                      <div
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{ maxHeight: isOpen ? "600px" : "0px" }}
                      >
                        <ul className="mt-0.5 space-y-0.5 pl-3">
                          {item.children!.map((child) => (
                            <li key={child.path}>
                              <Link
                                href={child.path}
                                className={`menu-dropdown-item ${isActive(child.path) ? "menu-dropdown-item-active" : ""}`}
                              >
                                <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                                <span className="flex-1">{child.name}</span>
                                {child.badge && <span className="menu-dropdown-badge">{child.badge}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {filteredNav.length === 0 && (
          <div className="px-4 py-8 text-center text-xs text-gray-400">No matches found</div>
        )}
      </nav>

      {/* Footer mini card */}
      {showText && (
        <div className="border-t border-gray-100 p-3 dark:border-gray-800">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 p-4 text-white">
            <div className="relative z-10 space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Nimbus Pro</p>
              <p className="text-sm font-bold">Unlock Premium</p>
              <p className="text-[11px] opacity-90">100+ pages, lifetime updates.</p>
              <button className="mt-2 rounded-md bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-white/30">
                Upgrade →
              </button>
            </div>
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 blur-xl" />
            <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/10 blur-xl" />
          </div>
        </div>
      )}
    </aside>
  );
}
