'use client';

import * as React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { CommandPalette } from '@/components/layout/command-palette';
import { RightPanel } from '@/components/layout/right-panel';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [rightOpen, setRightOpen] = React.useState(true);
  const [rightMobileOpen, setRightMobileOpen] = React.useState(false);

  // Keyboard shortcut for command palette
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        // Could trigger a create-deal modal — keep simple
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-out ${
          collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        } ${rightOpen ? 'lg:mr-[340px]' : 'lg:mr-[60px]'}`}
      >
        <Header
          onMobileMenuClick={() => setMobileOpen(true)}
          onCommandOpen={() => setCommandOpen(true)}
          onToggleRightPanel={() => setRightOpen((v) => !v)}
          rightOpen={rightOpen}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <div key="page-content" className="page-enter">
            {children}
          </div>
        </main>
      </div>
      <RightPanel
        open={rightOpen}
        onOpenChange={setRightOpen}
        mobileOpen={rightMobileOpen}
        onMobileOpenChange={setRightMobileOpen}
      />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}
