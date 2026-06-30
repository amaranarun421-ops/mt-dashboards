"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FLAT_NAV, NAV_DATA, type NavChild } from "./data";
import { ArrowLeftIcon, ChevronUp, SearchIcon } from "./icons-extra";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboards"]);
  const [search, setSearch] = useState("");

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  useEffect(() => {
    // Auto-expand the section containing the active route
    for (const section of NAV_DATA) {
      for (const item of section.items) {
        const isActive = item.items.some((sub) => sub.url === pathname);
        if (isActive) {
          setExpandedItems((prev) =>
            prev.includes(item.title) ? prev : [...prev, item.title],
          );
          return;
        }
      }
    }
  }, [pathname]);

  const filteredSections = useMemo(() => {
    if (!search.trim()) return NAV_DATA;
    const q = search.toLowerCase();
    const result: typeof NAV_DATA = [];
    for (const section of NAV_DATA) {
      const items: typeof section.items = [];
      for (const item of section.items) {
        if (item.items.length === 0) {
          const matchSelf =
            item.title.toLowerCase().includes(q) ||
            (item.url || "").toLowerCase().includes(q);
          if (matchSelf) items.push(item);
          continue;
        }
        const matchedChildren = item.items.filter(
          (c: NavChild) =>
            c.title.toLowerCase().includes(q) ||
            c.url.toLowerCase().includes(q) ||
            item.title.toLowerCase().includes(q),
        );
        if (matchedChildren.length > 0) {
          items.push({ ...item, items: matchedChildren });
        }
      }
      if (items.length > 0) result.push({ ...section, items });
    }
    return result;
  }, [search]);

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden border-r border-stroke bg-white transition-[width] duration-300 ease-linear dark:border-dark-3 dark:bg-gray-dark",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-6 pl-[25px] pr-[7px]">
          <div className="relative pr-4.5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative mt-5 pr-3.5">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-dark-5 dark:text-dark-6" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter navigation..."
              className="bg-gray-2 focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white w-full rounded-lg border py-2 pr-3 pl-9 text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-5 flex-1 overflow-y-auto pr-3">
            {filteredSections.length === 0 ? (
              <p className="px-2 py-6 text-sm text-dark-5 dark:text-dark-6">
                No matches.
              </p>
            ) : (
              filteredSections.map((section) => (
                <div key={section.label} className="mb-5">
                  <h2 className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                    {section.label}
                  </h2>
                  <nav role="navigation" aria-label={section.label}>
                    <ul className="space-y-1">
                      {section.items.map((item) => {
                        const hasChildren = item.items.length > 0;
                        const isExpanded = expandedItems.includes(item.title);
                        const isActive = hasChildren
                          ? item.items.some(({ url }) => url === pathname)
                          : pathname === item.url;

                        return (
                          <li key={item.title}>
                            {hasChildren ? (
                              <div>
                                <MenuItem
                                  isActive={isActive}
                                  onClick={() => toggleExpanded(item.title)}
                                >
                                  <item.icon
                                    className="size-5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span>{item.title}</span>
                                  <ChevronUp
                                    className={cn(
                                      "ml-auto size-3.5 rotate-180 transition-transform duration-200",
                                      isExpanded && "rotate-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                </MenuItem>

                                {isExpanded && (
                                  <ul
                                    className="ml-9 mr-0 space-y-0.5 pb-1 pr-0 pt-1"
                                    role="menu"
                                  >
                                    {item.items.map((subItem) => (
                                      <li key={subItem.url} role="none">
                                        <MenuItem
                                          as="link"
                                          href={subItem.url}
                                          isActive={pathname === subItem.url}
                                        >
                                          <span>{subItem.title}</span>
                                          {subItem.badge && (
                                            <span className="ml-auto rounded-full bg-primary-subtle px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/15 dark:text-primary-light">
                                              {subItem.badge}
                                            </span>
                                          )}
                                        </MenuItem>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ) : (
                              <MenuItem
                                className="flex items-center gap-3 py-2.5"
                                as="link"
                                href={item.url || "#"}
                                isActive={isActive}
                              >
                                <item.icon
                                  className="size-5 shrink-0"
                                  aria-hidden="true"
                                />
                                <span>{item.title}</span>
                                {item.badge && (
                                  <span className="ml-auto rounded-full bg-primary-subtle px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/15 dark:text-primary-light">
                                    {item.badge}
                                  </span>
                                )}
                              </MenuItem>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              ))
            )}
          </div>

          {/* Upgrade Card */}
          <div className="mt-3 pr-3.5">
            <div className="surface-gradient relative overflow-hidden rounded-xl border border-primary/20 p-4">
              <div className="relative z-10">
                <p className="text-xs font-semibold text-dark dark:text-white">
                  Helios Pro
                </p>
                <p className="mt-0.5 text-[11px] text-dark-5 dark:text-dark-6">
                  Premium admin UI kit · 100+ pages
                </p>
                <Link
                  href="/pages/pricing"
                  className="mt-2 inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-primary-dark"
                >
                  View plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export { FLAT_NAV };
