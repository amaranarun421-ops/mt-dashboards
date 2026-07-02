'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, initials } from '@/lib/utils';
import { ALL_NAV_ITEMS, NAV_GROUPS } from '@/lib/navigation';
import { useTheme } from 'next-themes';
import {
  Bell,
  Search,
  Calendar,
  Plus,
  Command,
  Menu,
  Moon,
  Sun,
  ChevronDown,
  Settings,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
  PanelRight,
  PanelRightOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { notifications } from '@/lib/data';

interface HeaderProps {
  onMobileMenuClick: () => void;
  onCommandOpen: () => void;
  onToggleRightPanel?: () => void;
  rightOpen?: boolean;
}

interface Crumb {
  label: string;
  href?: string;
}

function useBreadcrumbs(pathname: string): Crumb[] {
  return React.useMemo(() => {
    if (pathname === '/dashboard') return [{ label: 'Overview' }];
    const parts = pathname.replace('/dashboard/', '').split('/');
    const crumbs: Crumb[] = [{ label: 'Dashboard', href: '/dashboard' }];
    let acc = '/dashboard';
    for (const part of parts) {
      acc += '/' + part;
      // Look up label from nav
      const navItem = ALL_NAV_ITEMS.find((i) => i.href === acc);
      // prettify
      const label = navItem?.label ?? part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      crumbs.push({ label, href: acc });
    }
    return crumbs;
  }, [pathname]);
}

function usePageTitle(pathname: string): string {
  return React.useMemo(() => {
    if (pathname === '/dashboard') return 'Overview';
    const navItem = ALL_NAV_ITEMS.find(
      (i) => pathname === i.href || pathname.startsWith(i.href + '/')
    );
    if (navItem) return navItem.label;
    const parts = pathname.replace('/dashboard/', '').split('/');
    const last = parts[parts.length - 1];
    return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }, [pathname]);
}

export function Header({ onMobileMenuClick, onCommandOpen, onToggleRightPanel, rightOpen }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const pageTitle = usePageTitle(pathname);
  const crumbs = useBreadcrumbs(pathname);
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [dateRange, setDateRange] = React.useState('Last 30 days');

  React.useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 gap-4">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
          onClick={onMobileMenuClick}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-0.5">
            {crumbs.map((c, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-muted-foreground/40">/</span>}
                {c.href && i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-foreground transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground/70">{c.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">
            {pageTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Command palette / Search */}
        <button
          onClick={onCommandOpen}
          className={cn(
            'hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-muted-foreground hover:border-accent/50 hover:text-foreground transition-all duration-200',
            searchFocused ? 'w-72' : 'w-56'
          )}
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search or jump to…</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-background border border-border text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Mobile search icon */}
        <button
          onClick={onCommandOpen}
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Date range picker (compact) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-all">
              <Calendar className="w-4 h-4" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => setDateRange('Today')}>Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange('Last 7 days')}>Last 7 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange('Last 30 days')}>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange('This quarter')}>This quarter</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange('This year')}>This year</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              {mounted && theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <Moon className="w-4 h-4 mr-2" /> Dark
              {mounted && theme === 'dark' && <span className="ml-auto text-accent">●</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <Sun className="w-4 h-4 mr-2" /> Light
              {mounted && theme === 'light' && <span className="ml-auto text-accent">●</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <span className="text-sm font-semibold">Notifications</span>
              <Badge variant="accent" className="text-[10px]">3 new</Badge>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.slice(0, 6).map((n) => (
                <DropdownMenuItem key={n.id} className="p-3 cursor-pointer flex flex-col items-start gap-1 border-b border-border last:border-0">
                  <div className="flex items-center gap-2 w-full">
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                    <span className="text-xs font-medium text-foreground flex-1 truncate">{n.title}</span>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-2">{n.message}</span>
                </DropdownMenuItem>
              ))}
            </div>
            <Link href="/dashboard/notifications" className="block text-center text-xs text-accent hover:text-accent/80 py-2 border-t border-border">
              View all notifications
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Right panel toggle */}
        {onToggleRightPanel && (
          <button
            onClick={onToggleRightPanel}
            className={cn(
              'hidden lg:flex w-9 h-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors',
              rightOpen && 'text-accent bg-accent/10'
            )}
            aria-label={rightOpen ? 'Collapse right panel' : 'Expand right panel'}
            title={rightOpen ? 'Hide workspace panel' : 'Show workspace panel'}
          >
            {rightOpen ? <PanelRight className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>
        )}

        {/* Quick create */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground h-9 gap-1.5">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Create new</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/deals"><Plus className="w-4 h-4 mr-2" /> Deal</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/leads"><Plus className="w-4 h-4 mr-2" /> Lead</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/accounts"><Plus className="w-4 h-4 mr-2" /> Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/contacts"><Plus className="w-4 h-4 mr-2" /> Contact</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/tasks"><Plus className="w-4 h-4 mr-2" /> Task</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/report-builder"><Plus className="w-4 h-4 mr-2" /> Report</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-accent/40 transition-all">
              <Avatar className="w-9 h-9">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&q=80&fit=crop&crop=faces&auto=format"
                  alt="Jordan Doe"
                />
                <AvatarFallback className="bg-gradient-to-br from-accent to-chart-1 text-accent-foreground text-xs font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <div className="text-sm font-semibold">Jordan Doe</div>
              <div className="text-xs text-muted-foreground">jordan@pipelinepilot.io</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile-settings"><User className="w-4 h-4 mr-2" /> Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/workspace-settings"><Settings className="w-4 h-4 mr-2" /> Workspace</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/billing"><CreditCard className="w-4 h-4 mr-2" /> Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/security-settings"><HelpCircle className="w-4 h-4 mr-2" /> Security</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/auth/login" className="text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
