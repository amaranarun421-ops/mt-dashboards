'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  AlignLeft,
  Bell,
  Check,
  ChevronDown,
  CreditCard,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useDashboardStore } from '@/lib/dashboard-store';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

interface HeaderNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  tone: 'brand' | 'success' | 'warning' | 'error' | 'info';
}

const NOTIFICATIONS: HeaderNotification[] = [
  { id: 'n1', title: 'New high-value order', message: 'Order #OR-9081 placed for $2,399.00', time: '3 min ago', read: false, tone: 'success' },
  { id: 'n2', title: 'MRR milestone reached', message: 'Monthly recurring revenue crossed $48,200', time: '22 min ago', read: false, tone: 'brand' },
  { id: 'n3', title: 'Server response time elevated', message: 'p95 latency on /api/orders is 412ms', time: '1 hour ago', read: false, tone: 'warning' },
  { id: 'n4', title: 'Failed payment', message: 'Invoice INV-2034 could not be charged', time: '3 hours ago', read: true, tone: 'error' },
  { id: 'n5', title: 'New team member joined', message: 'Sara Nguyen accepted the workspace invite', time: '6 hours ago', read: true, tone: 'info' },
];

const toneDotClass: Record<HeaderNotification['tone'], string> = {
  brand: 'ds-dot-brand', success: 'ds-dot-success', warning: 'ds-dot-warning', error: 'ds-dot-error', info: 'ds-dot-info',
};

const iconButtonClass =
  'flex size-11 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-sunken)] hover:text-[var(--color-brand-500)] dark:border-white/10 dark:bg-white/[0.03] dark:text-[var(--text-muted)] dark:hover:bg-white/[0.06] dark:hover:text-[var(--color-brand-300)]';

export function Header() {
  const { setMobileMenuOpen, setCommandOpen, toggleSidebarCollapsed, setSection, setPages } = useDashboardStore();
  const { theme, toggleTheme, mounted } = useTheme();
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<HeaderNotification[]>(NOTIFICATIONS);

  const notifRef = React.useRef<HTMLDivElement>(null);
  const userRef = React.useRef<HTMLDivElement>(null);
  const mobileSearchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    if (mobileSearchOpen) setTimeout(() => mobileSearchRef.current?.focus(), 50);
  }, [mobileSearchOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })));
  }

  return (
    <header className="sticky top-0 z-30 flex h-[74px] items-center border-b border-[var(--border)] bg-[var(--card)]/95 px-4 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-[var(--background)]/90 sm:px-5 lg:px-6">
      {/* Left — sidebar toggle + search */}
      <div className="flex items-center gap-3">
        {/* Desktop sidebar toggle */}
        <button
          type="button"
          onClick={toggleSidebarCollapsed}
          className="hidden size-11 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-sunken)] hover:text-[var(--color-brand-500)] dark:border-white/10 dark:bg-white/[0.03] dark:text-[var(--text-muted)] dark:hover:bg-white/[0.06] lg:flex"
          aria-label="Toggle sidebar"
        >
          <AlignLeft className="size-5" strokeWidth={2.1} />
        </button>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-sunken)] hover:text-[var(--color-brand-500)] dark:border-white/10 dark:bg-white/[0.03] lg:hidden"
          aria-label="Open menu"
        >
          <AlignLeft className="size-5" strokeWidth={2.1} />
        </button>

        {/* Inline search bar (mtverse style) */}
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={1.9} />
          <input
            type="text"
            onFocus={() => setCommandOpen(true)}
            placeholder="Search or type command..."
            className="h-11 w-72 cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--card)] pl-12 pr-14 text-sm font-medium text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[var(--color-brand-300)] focus:ring-[3px] focus:ring-[rgba(70,95,255,0.10)] dark:border-white/10 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-[var(--text-subtle)] dark:focus:border-[var(--color-brand-400)] dark:focus:ring-[rgba(70,95,255,0.15)] lg:w-[430px]"
            readOnly
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-[var(--border)] bg-[var(--surface-sunken)] px-2 py-1 text-xs font-medium leading-none text-[var(--text-muted)] dark:border-white/10 dark:bg-white/[0.04]">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex-1" />

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        {/* Mobile search */}
        <button
          type="button"
          onClick={() => setMobileSearchOpen(true)}
          className={cn(iconButtonClass, 'sm:hidden')}
          aria-label="Search"
        >
          <Search className="size-5" strokeWidth={2} />
        </button>

        {/* Theme toggle — suppress icon until mounted to prevent hydration mismatch */}
        <button
          type="button"
          onClick={toggleTheme}
          className={iconButtonClass}
          aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : 'Toggle theme'}
          suppressHydrationWarning
        >
          {mounted ? (theme === 'light' ? <Moon className="size-5" strokeWidth={2} /> : <Sun className="size-5" strokeWidth={2} />) : <Moon className="size-5" strokeWidth={2} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => { setNotifOpen((p) => !p); setUserOpen(false); }}
            className={cn('relative', iconButtonClass)}
            aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
          >
            <Bell className="size-5" strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-error-400)]/70" />
                <span className="relative inline-flex size-2.5 rounded-full border-2 border-[var(--card)] bg-[var(--color-error-500)]" />
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-3 w-[calc(100vw-1.5rem)] max-w-sm overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in sm:w-96">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">Notifications</p>
                  <p className="text-[11px] font-medium text-[var(--text-muted)]">{unreadCount} unread of {notifications.length}</p>
                </div>
                <button type="button" onClick={markAllRead} className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-[var(--color-brand-600)] transition hover:bg-[var(--color-brand-50)] dark:text-[var(--color-brand-300)] dark:hover:bg-[rgba(70,95,255,0.16)]">
                  <Check className="size-3.5" /> Mark all read
                </button>
              </div>
              <div className="max-h-[320px] overflow-y-auto modern-scrollbar">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      'flex items-start gap-3 border-b border-[var(--border-subtle)] px-4 py-3 transition-colors last:border-b-0 hover:bg-[var(--surface-sunken)]',
                      !notif.read && 'bg-[var(--color-brand-50)]/40 dark:bg-[rgba(70,95,255,0.06)]',
                    )}
                  >
                    <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', toneDotClass[notif.tone])} aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--text-strong)]">{notif.title}</p>
                      <p className="truncate text-xs font-medium text-[var(--text-muted)]">{notif.message}</p>
                      <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="w-full cursor-pointer border-t border-[var(--border-subtle)] px-4 py-3 text-center text-sm font-medium text-[var(--color-brand-600)] transition hover:bg-[var(--surface-sunken)] dark:text-[var(--color-brand-300)]">
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* User menu */}
        <div ref={userRef} className="relative">
          <button
            type="button"
            onClick={() => { setUserOpen((p) => !p); setNotifOpen(false); }}
            className="flex cursor-pointer items-center gap-1.5 rounded-full p-1.5 transition-colors hover:bg-[var(--surface-sunken)]"
            aria-label="User menu"
            aria-expanded={userOpen}
          >
            <span className="relative size-10 overflow-hidden rounded-full ring-2 ring-[var(--color-brand-500)]/15">
              <Image src="/images/arun-pandian.jpg" alt="Arun Pandian" fill sizes="40px" className="object-cover" />
            </span>
            <span className="hidden text-sm font-medium text-[var(--text-strong)] md:block">Arun</span>
            <ChevronDown className={cn('hidden size-4 text-[var(--text-muted)] transition-transform md:block', userOpen && 'rotate-180')} strokeWidth={2.1} />
          </button>

          {userOpen && (
            <div className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
              <div className="border-b border-[var(--border-subtle)] px-4 py-3">
                <p className="text-sm font-medium text-[var(--text-strong)]">Arun Pandian</p>
                <p className="truncate text-xs font-medium text-[var(--text-muted)]">arun@mtverse.io</p>
              </div>
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { setSection('pages'); setPages('profile'); setUserOpen(false); }}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                >
                  <User className="size-4 shrink-0 text-[var(--text-muted)]" /> My Profile
                </button>
                <button
                  type="button"
                  onClick={() => { setSection('pages'); setPages('settings'); setUserOpen(false); }}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                >
                  <Settings className="size-4 shrink-0 text-[var(--text-muted)]" /> Settings
                </button>
                <button
                  type="button"
                  onClick={() => { setSection('pages'); setPages('pricing'); setUserOpen(false); }}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                >
                  <CreditCard className="size-4 shrink-0 text-[var(--text-muted)]" /> Billing
                </button>
              </div>
              <div className="border-t border-[var(--border-subtle)] py-1">
                <button type="button" className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--color-error-600)] transition hover:bg-[var(--color-error-50)] dark:text-[var(--color-error-500)] dark:hover:bg-[rgba(240,68,56,0.16)]">
                  <LogOut className="size-4 shrink-0" /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div className="absolute inset-x-0 top-0 z-10 flex h-[74px] items-center gap-3 border-b border-[var(--border)] bg-[var(--card)] px-4 ds-fade-in sm:hidden">
          <Search className="size-4.5 shrink-0 text-[var(--text-muted)]" />
          <input
            ref={mobileSearchRef}
            type="search"
            placeholder="Search..."
            className="flex-1 bg-transparent text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]"
          />
          <button type="button" onClick={() => setMobileSearchOpen(false)} className="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)]" aria-label="Close search">
            <X className="size-5" />
          </button>
        </div>
      )}
    </header>
  );
}
