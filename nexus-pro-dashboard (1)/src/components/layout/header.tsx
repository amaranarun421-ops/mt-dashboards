"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, CheckCircle2, AlertCircle, Info, Gift, User, Settings, CreditCard, LogOut, ChevronDown, ChevronRight, Plus, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useUIStore } from "@/lib/store";
import { findRouteByPath, getBreadcrumbs } from "@/lib/route-map";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname() ?? "";
  const { toggleSidebar, setCommandOpen, setMobileSidebarOpen } = useUIStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const route = findRouteByPath(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCommandOpen]);

  // Quick-create menu — adapted to current route's domain
  const quickCreateItems = React.useMemo(() => {
    const group = route?.group;
    if (group === "Sales Ops") return [
      { label: "New Deal", href: "/sales/deals" },
      { label: "New Lead", href: "/sales/leads" },
      { label: "New Account", href: "/sales/accounts" },
      { label: "Log Activity", href: "/sales/activities" },
    ];
    if (group === "Dashboards" && route?.id === "dashboard-ecommerce") return [
      { label: "New Product", href: "/dashboard/ecommerce" },
      { label: "New Order", href: "/dashboard/ecommerce" },
      { label: "New Customer", href: "/dashboard/ecommerce" },
    ];
    return [
      { label: "New Deal", href: "/sales/deals" },
      { label: "New Lead", href: "/sales/leads" },
      { label: "New Task", href: "/apps/todo" },
      { label: "New Invoice", href: "/apps/invoices" },
    ];
  }, [route]);

  return (
    <header className="sticky top-0 flex w-full bg-white/80 backdrop-blur-xl border-gray-200 z-40 dark:border-gray-800 dark:bg-gray-900/80 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-3">
          {/* Sidebar toggle - desktop */}
          <button
            className="hidden items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-40 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.75 1.5C0.75 0.809644 1.30964 0.25 2 0.25H20C20.6904 0.25 21.25 0.809644 21.25 1.5C21.25 2.19036 20.6904 2.75 20 2.75L2 2.75C1.30964 2.75 0.75 2.19036 0.75 1.5ZM0.75 9C0.75 8.30964 1.30964 7.75 2 7.75H14C14.6904 7.75 15.25 8.30964 15.25 9C15.25 9.69036 14.6904 10.25 14 10.25H2C1.30964 10.25 0.75 9.69036 0.75 9ZM2 15.25C1.30964 15.25 0.75 15.8096 0.75 16.5C0.75 17.1904 1.30964 17.75 2 17.75H20C20.6904 17.75 21.25 17.1904 21.25 16.5C21.25 15.8096 20.6904 15.25 20 15.25H2Z" fill="currentColor" />
            </svg>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-40 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 6C3 5.17157 3.67157 4.5 4.5 4.5H19.5C20.3284 4.5 21 5.17157 21 6C21 6.82843 20.3284 7.5 19.5 7.5H4.5C3.67157 7.5 3 6.82843 3 6ZM3 12C3 11.1716 3.67157 10.5 4.5 10.5H19.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12ZM3 18C3 17.1716 3.67157 16.5 4.5 16.5H19.5C20.3284 16.5 21 17.1716 21 18C21 18.8284 20.3284 19.5 19.5 19.5H4.5C3.67157 19.5 3 18.8284 3 18Z" fill="currentColor" />
            </svg>
          </button>

          {/* Breadcrumbs - desktop */}
          <nav className="hidden lg:flex items-center gap-1.5 min-w-0">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={`${crumb.path}-${i}`}>
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.path === "#" ? pathname : crumb.path}
                    className="text-sm text-gray-500 hover:text-brand-500 dark:text-gray-400 transition truncate"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Search - desktop */}
          <div className="hidden lg:block ml-auto">
            <button
              onClick={() => setCommandOpen(true)}
              className="group flex items-center gap-3 h-10 w-[280px] rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-400 hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-gray-700"
            >
              <Search className="h-4 w-4" />
              <span>Search or type command...</span>
              <kbd className="ml-auto rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile logo */}
          <div className="lg:hidden ml-auto">
            <span className="text-lg font-bold text-gray-800 dark:text-white/90">
              Nexus<span className="text-brand-500">Pro</span>
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 2xsm:gap-3 lg:ml-2">
            {/* Quick Create */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="hidden sm:flex gap-1.5 h-9">
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:inline">Create</span>
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Quick Create</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {quickCreateItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild className="cursor-pointer gap-2">
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg border-gray-200 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && theme === "dark" ? (
                  <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg border-gray-200 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300" aria-label="Notifications">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 2C9.5 1.17157 10.1716 0.5 11 0.5C11.8284 0.5 12.5 1.17157 12.5 2V2.682C15.6381 3.39683 18 6.23544 18 9.595V14L19.4103 16.1098C19.8499 16.769 19.3768 17.6667 18.5831 17.6667H3.41688C2.6232 17.6667 2.15007 16.769 2.58974 16.1098L4 14V9.595C4 6.23544 6.36189 3.39683 9.5 2.682V2Z" fill="currentColor" />
                    <path d="M9.5 19.5C9.5 20.3284 10.1716 21 11 21C11.8284 21 12.5 20.3284 12.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0 z-50" sideOffset={8}>
                <NotificationsPanel />
              </PopoverContent>
            </Popover>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 py-1 pl-1 pr-2 transition" aria-label="User menu">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                    AK
                  </span>
                  <span className="hidden sm:flex items-center gap-1.5">
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">Alex Kim</span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white/90">Alex Kim</span>
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">alex@nexuspro.app</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                  <Link href="/account/profile"><User className="h-4 w-4 text-gray-500 dark:text-gray-400" /> View Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                  <Link href="/account/settings"><Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" /> Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer gap-2">
                  <Link href="/account/billing"><CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" /> Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer gap-2 text-error-600 focus:text-error-600 dark:text-error-500 dark:focus:text-error-500">
                  <Link href="/auth/sign-in"><LogOut className="h-4 w-4" /> Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

function NotificationsPanel() {
  const notifications = [
    { icon: CheckCircle2, color: "text-success-600 bg-success-50 dark:bg-success-500/15 dark:text-success-500", title: "Deployment successful", desc: "v2.4.1 is now live in production", time: "2m ago", unread: true },
    { icon: Info, color: "text-blue-light-500 bg-blue-light-50 dark:bg-blue-light-500/15 dark:text-blue-light-500", title: "New team member", desc: "Naomi Adeyemi joined the Lumen account", time: "1h ago", unread: true },
    { icon: AlertCircle, color: "text-warning-600 bg-warning-50 dark:bg-warning-500/15 dark:text-orange-400", title: "API rate limit at 80%", desc: "Consider upgrading your plan", time: "3h ago", unread: true },
    { icon: Gift, color: "text-brand-500 bg-brand-50 dark:bg-brand-500/15 dark:text-brand-400", title: "Weekly report ready", desc: "Your analytics summary is available", time: "6h ago", unread: false },
  ];

  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 p-3">
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-white/90">Notifications</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">3 unread messages</p>
        </div>
        <button className="text-xs font-medium text-brand-500 hover:underline">Mark all read</button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <button
              key={i}
              className="flex w-full gap-3 border-b border-gray-100 dark:border-gray-800 p-3 text-left transition hover:bg-gray-50 dark:hover:bg-white/[0.03] last:border-0"
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", n.color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">{n.title}</p>
                  {n.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />}
                </div>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">{n.desc}</p>
                <p className="mt-0.5 text-[10px] text-gray-400 dark:text-gray-500">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>
      <Link href="/account/notifications" className="block w-full border-t border-gray-100 dark:border-gray-800 p-2.5 text-center text-xs font-medium text-brand-500 transition hover:bg-gray-50 dark:hover:bg-white/[0.03]">
        View all notifications
      </Link>
    </div>
  );
}
