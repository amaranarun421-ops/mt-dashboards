"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useUIStore } from "@/lib/store";
import { findRouteByPath, STANDALONE_GROUPS } from "@/lib/route-map";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname() ?? "";
  const { mobileSidebarOpen, setMobileSidebarOpen, sidebarCollapsed, pushRecentPage } = useUIStore();

  // Track recently visited pages (for sidebar + command palette)
  React.useEffect(() => {
    if (pathname) pushRecentPage(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Standalone pages (auth, errors, maintenance, coming-soon) skip the shell
  const route = findRouteByPath(pathname);
  const isStandalone = !route || route.standalone || STANDALONE_GROUPS.has(route.group);

  // Marketing routes also skip the shell
  const isMarketingRoute =
    pathname === "/" ||
    pathname === "/features" ||
    pathname === "/pages-preview" ||
    pathname === "/components-preview" ||
    pathname === "/pricing-license" ||
    pathname === "/docs" ||
    pathname === "/changelog";

  if (isStandalone || isMarketingRoute) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mesh-bg">{children}</div>;
  }

  const mainContentMargin = mobileSidebarOpen
    ? "ml-0"
    : sidebarCollapsed
    ? "lg:ml-[90px]"
    : "lg:ml-[290px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="fixed top-0 left-0 h-screen z-30">
          <Sidebar variant="desktop" />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-gray-900/50 lg:hidden"
            />
            <motion.div
              initial={{ x: -290 }}
              animate={{ x: 0 }}
              exit={{ x: -290 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 z-50 h-screen lg:hidden"
            >
              <Sidebar variant="mobile" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <Header />
        <main className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
