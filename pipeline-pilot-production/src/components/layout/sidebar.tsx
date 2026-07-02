'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_GROUPS } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { Logo } from '@/components/layout/logo';

interface SidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

export function Sidebar({
  collapsed,
  onCollapsedChange,
  mobileOpen,
  onMobileOpenChange,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(
    new Set(NAV_GROUPS.map((g) => g.id))
  );

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => onMobileOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-out flex flex-col',
          collapsed ? 'w-[72px]' : 'w-[260px]',
          // Mobile slide-in
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-sidebar-border shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <Logo className="w-9 h-9 shrink-0 transition-transform group-hover:scale-105" />
            <span
              className={cn(
                'font-semibold text-lg text-sidebar-foreground whitespace-nowrap transition-all duration-300',
                collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              )}
            >
              Pipeline Pilot
            </span>
          </Link>
          <button
            className="ml-auto lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-sidebar-accent"
            onClick={() => onMobileOpenChange(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Workspace switcher */}
        <div className="px-3 pt-3 pb-2 shrink-0">
          <button
            className={cn(
              'w-full flex items-center gap-3 p-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 hover:bg-sidebar-accent transition-colors',
              collapsed && 'justify-center'
            )}
          >
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-accent to-chart-1 flex items-center justify-center text-xs font-bold text-accent-foreground shrink-0">
              PP
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 text-left">
                <div className="text-xs font-semibold text-sidebar-foreground truncate">Pipeline Pilot HQ</div>
                <div className="text-[10px] text-muted-foreground truncate">Enterprise · 28 seats</div>
              </div>
            )}
            {!collapsed && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 min-h-0 px-3 py-2">
          <nav className="space-y-1 pb-4">
            <TooltipProvider delayDuration={0}>
              {NAV_GROUPS.map((group) => {
                const isExpanded = expandedGroups.has(group.id) || collapsed;
                return (
                  <div key={group.id} className="space-y-0.5">
                    {!collapsed && (
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-sidebar-foreground transition-colors"
                      >
                        <span>{group.label}</span>
                        <ChevronRight
                          className={cn(
                            'w-3 h-3 ml-auto transition-transform',
                            isExpanded && 'rotate-90'
                          )}
                        />
                      </button>
                    )}
                    {collapsed && (
                      <div className="px-3 py-1.5 mt-2">
                        <div className="h-px bg-sidebar-border" />
                      </div>
                    )}
                    {isExpanded &&
                      group.items.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;
                        const link = (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => onMobileOpenChange(false)}
                            className={cn(
                              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative',
                              active
                                ? 'bg-sidebar-accent text-sidebar-foreground'
                                : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50',
                              collapsed && 'justify-center'
                            )}
                          >
                            <span
                              className={cn(
                                'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-accent transition-all duration-300',
                                active ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            <Icon
                              className={cn(
                                'w-4.5 h-4.5 shrink-0 transition-transform duration-200',
                                active ? 'text-accent' : 'group-hover:scale-110'
                              )}
                              size={18}
                            />
                            {!collapsed && (
                              <span className="flex-1 text-left whitespace-nowrap truncate">{item.label}</span>
                            )}
                            {!collapsed && item.badge && (
                              <span
                                className={cn(
                                  'px-1.5 py-0.5 rounded-md text-[10px] font-semibold',
                                  item.badgeVariant === 'accent' && 'bg-accent/15 text-accent',
                                  item.badgeVariant === 'warning' && 'bg-warning/15 text-warning',
                                  item.badgeVariant === 'destructive' && 'bg-destructive/15 text-destructive',
                                  !item.badgeVariant && 'bg-sidebar-accent text-muted-foreground'
                                )}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );

                        if (collapsed) {
                          return (
                            <Tooltip key={item.href}>
                              <TooltipTrigger asChild>{link}</TooltipTrigger>
                              <TooltipContent side="right" sideOffset={8}>
                                {item.label}
                                {item.badge && (
                                  <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-secondary">
                                    {item.badge}
                                  </span>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          );
                        }
                        return link;
                      })}
                  </div>
                );
              })}
            </TooltipProvider>
          </nav>
        </ScrollArea>

        {/* Pro upsell card */}
        {!collapsed && (
          <div className="p-3 shrink-0">
            <div className="rounded-lg bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-foreground">AI Insights</span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">
                Unlock predictive deal scoring and smart forecasting.
              </p>
              <Button size="sm" className="w-full h-7 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">
                Upgrade
              </Button>
            </div>
          </div>
        )}

        {/* Collapse button */}
        <div className="p-3 border-t border-sidebar-border shrink-0 hidden lg:block">
          <button
            onClick={() => onCollapsedChange(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
