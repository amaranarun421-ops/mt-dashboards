"use client";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { Avatar, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, IconButton } from "@/components/ui";
import {
  Menu, Search, Bell, Sun, Moon, Settings, User, LogOut, CreditCard, ChevronDown, Sparkles, Sliders, CheckCircle2, AlertTriangle, Info, MessageSquare,
} from "lucide-react";
import { useState } from "react";

const NOTIFICATIONS = [
  { id: 1, title: "New order #4218", desc: "Order from Priya M. — $1,290", tone: "brand", time: "2m" },
  { id: 2, title: "Server CPU at 92%", desc: "Edge node us-east-2 spiked", tone: "error", time: "18m" },
  { id: 3, title: "Subscription renewed", desc: "Acme Inc. renewed annual plan", tone: "success", time: "1h" },
  { id: 4, title: "New comment", desc: "Marcus replied to your thread", tone: "info", time: "3h" },
];

const toneClass: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
  info: "bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
};
const toneIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  brand: Sparkles,
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
  warning: AlertTriangle,
};

export default function AppHeader() {
  const { toggleSidebar, toggleMobileSidebar, setCommandOpen, setCustomizerOpen } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) toggleSidebar();
    else toggleMobileSidebar();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/85 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/85 md:px-6">
      <button
        onClick={handleToggle}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label="Toggle Sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link href="/" className="lg:hidden">
        <Image src="/brand/logo-icon.svg" alt="Nimbus Pro" width={32} height={32} priority />
      </Link>

      {/* Command palette trigger */}
      <button
        onClick={() => setCommandOpen(true)}
        className="group flex h-10 max-w-md flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-500 transition-all hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700/60"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search or jump to...</span>
        <kbd className="hidden items-center gap-0.5 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 dark:border-gray-700 dark:bg-gray-900 sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1.5">
        <IconButton
          onClick={() => setCommandOpen(true)}
          className="sm:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </IconButton>

        <IconButton onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </IconButton>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-gray-900" />
          </button>
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-[340px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-theme-xl animate-scale-in dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">You have 4 unread</p>
                  </div>
                  <span className="badge badge-error">4 new</span>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {NOTIFICATIONS.map((n) => {
                    const ToneIcon = toneIcon[n.tone];
                    return (
                      <div key={n.id} className="flex gap-3 border-b border-gray-100 p-4 transition-colors last:border-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${toneClass[n.tone]}`}>
                          <ToneIcon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{n.desc}</p>
                          <p className="text-[11px] text-gray-400">{n.time} ago</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Link
                  href="/account/notifications"
                  onClick={() => setNotifOpen(false)}
                  className="block border-t border-gray-100 p-3 text-center text-xs font-semibold text-brand-600 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:text-brand-400 dark:hover:bg-gray-800/50"
                >
                  View all notifications
                </Link>
              </div>
            </>
          )}
        </div>

        <IconButton onClick={() => setCustomizerOpen(true)} aria-label="Customizer">
          <Sliders className="h-5 w-5" />
        </IconButton>

        {/* User menu */}
        <DropdownMenu
          trigger={
            <span
              role="button"
              tabIndex={0}
              className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Avatar name="Aaroh Sharma" size={32} />
              <div className="hidden text-left lg:block">
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Aaroh Sharma</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Admin</p>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-gray-400 lg:block" />
            </span>
          }
        >
          <div className="flex items-center gap-2.5 px-2.5 py-2">
            <Avatar name="Aaroh Sharma" size={36} />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Aaroh Sharma</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">aaroh@nimbuspro.io</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem icon={User} onClick={() => (window.location.href = "/account/profile")}>Profile</DropdownMenuItem>
          <DropdownMenuItem icon={Settings} onClick={() => (window.location.href = "/account/settings")}>Settings</DropdownMenuItem>
          <DropdownMenuItem icon={CreditCard} onClick={() => (window.location.href = "/account/billing")}>Billing</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={MessageSquare} onClick={() => (window.location.href = "/apps/chat")}>Messages</DropdownMenuItem>
          <DropdownMenuItem icon={Sparkles} onClick={() => (window.location.href = "/dashboards/ai")}>What&apos;s new</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem icon={LogOut} danger onClick={() => (window.location.href = "/auth/login")}>Sign out</DropdownMenuItem>
        </DropdownMenu>
      </div>
    </header>
  );
}
