"use client";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import CommandPalette from "@/layout/CommandPalette";
import ThemeCustomizer from "@/layout/ThemeCustomizer";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[280px]"
    : "lg:ml-[76px]";

  return (
    <div className="min-h-screen">
      <AppSidebar />
      <Backdrop />
      <div className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />
        <main className="flex-1 page-padding">
          <div className="mx-auto w-full max-w-[1600px] animate-fade-in">{children}</div>
        </main>
        <footer className="border-t border-gray-200 px-6 py-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-2 sm:flex-row">
            <p>© 2026 Nimbus Pro. Crafted with care.</p>
            <div className="flex items-center gap-4">
              <a href="/pages/changelog" className="hover:text-brand-600 dark:hover:text-brand-400">v3.0.0</a>
              <a href="/pages/help-center" className="hover:text-brand-600 dark:hover:text-brand-400">Help</a>
              <a href="/pages/about" className="hover:text-brand-600 dark:hover:text-brand-400">About</a>
            </div>
          </div>
        </footer>
      </div>
      <CommandPalette />
      <ThemeCustomizer />
    </div>
  );
}
