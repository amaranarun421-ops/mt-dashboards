"use client";

import * as React from "react";
import { Sidebar } from "@/components/mtv/sidebar";
import { Topbar } from "@/components/mtv/topbar";
import { CommandPalette } from "@/components/mtv/command-palette";
import { NavigationSpinner } from "@/components/mtv/navigation-spinner";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Cmd+K / Cmd+B shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setCollapsed((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="bg-mtv-aurora h-screen w-screen overflow-hidden">
      {/* Boxed dashboard container — old-school admin dashboard style */}
      <div className="h-full w-full p-2 sm:p-3 md:p-4 lg:p-5">
        <div className="mx-auto h-full max-w-[1800px] rounded-2xl bg-card shadow-[var(--shadow-xl)] ring-1 ring-border overflow-hidden flex">
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
                <Sidebar onClose={() => setSidebarOpen(false)} />
              </div>
            </>
          )}

          {/* Desktop sidebar (sticky, scrolls internally) */}
          <div className="hidden lg:flex shrink-0 h-full">
            <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((v) => !v)} />
          </div>

          {/* Main column: topbar + scrollable content + footer */}
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <Topbar
              onMenuClick={() => setSidebarOpen(true)}
              onToggleCollapse={() => setCollapsed((v) => !v)}
              onOpenCommand={() => setCommandOpen(true)}
            />

            {/* Single scroll area — only place that scrolls */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-muted/30">
              <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8 animate-fade-in">
                {children}
              </div>
              <footer className="border-t border-border mt-8 py-6 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[1600px] flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                  <p>© {new Date().getFullYear()} MTVerse. All rights reserved. A premium enterprise dashboard kit.</p>
                  <div className="flex items-center gap-4">
                    <a href="/enterprise/help" className="hover:text-foreground transition-colors">Help</a>
                    <a href="/enterprise/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                    <a href="/enterprise/changelog" className="hover:text-foreground transition-colors">Changelog</a>
                  </div>
                </div>
              </footer>
            </main>
          </div>
        </div>
      </div>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <NavigationSpinner />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
