'use client';

import * as React from 'react';
import { useDashboardStore } from '@/lib/dashboard-store';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CommandPalette } from './command-palette';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useDashboardStore((s) => s.sidebarCollapsed);
  const section = useDashboardStore((s) => s.section);
  const active = useDashboardStore((s) => s.active);
  const component = useDashboardStore((s) => s.component);
  const ecommerce = useDashboardStore((s) => s.ecommerce);
  const aiAssistant = useDashboardStore((s) => s.aiAssistant);
  const pages = useDashboardStore((s) => s.pages);

  const mainRef = React.useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Scroll to top on any navigation (page/section change)
  React.useEffect(() => {
    const main = mainRef.current;
    if (main) {
      main.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [section, active, component, ecommerce, aiAssistant, pages]);

  // Show/hide go-to-top button based on scroll position
  React.useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    function handleScroll() {
      if (!main) return;
      setShowScrollTop(main.scrollTop > 400);
    }
    main.addEventListener('scroll', handleScroll, { passive: true });
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="h-screen overflow-hidden bg-[var(--background)]">
      <Sidebar />
      <div
        className={cn(
          'flex h-screen flex-col transition-[padding-left] duration-300 ease-in-out',
          sidebarCollapsed ? 'lg:pl-[var(--sidebar-collapsed-width)]' : 'lg:pl-[var(--sidebar-width)]',
        )}
      >
        <Header />
        <main
          ref={mainRef}
          id="dashboard-main"
          className="flex-1 overflow-y-auto modern-scrollbar p-4 sm:p-6 lg:p-8"
        >
          <div className="mx-auto max-w-[1600px] ds-page-enter">{children}</div>
        </main>
      </div>
      <CommandPalette />

      {/* Go to top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] shadow-[var(--shadow-theme-lg)] transition-all hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] ds-fade-in"
          aria-label="Go to top"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}
