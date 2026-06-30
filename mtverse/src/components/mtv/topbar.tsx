"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell, Menu, PanelLeft, Search, Sparkles, Plus,
  FileText, CheckSquare, KanbanSquare, UserPlus,
  User, Settings, CreditCard, Key, HelpCircle, LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { MTVLogo } from "./logo";
import { usePathname } from "next/navigation";
import { ALL_NAV_ITEMS, BRAND } from "@/lib/navigation";

interface TopbarProps {
  onMenuClick?: () => void;
  onToggleCollapse?: () => void;
  onOpenCommand?: () => void;
}

const NOTIFICATIONS = [
  { id: 1, title: "New order #5821 received", desc: "$1,429.00 from Acme Corp", time: "2m ago", unread: true, type: "success" },
  { id: 2, title: "Server CPU above 80%", desc: "Node eu-west-2 needs attention", time: "12m ago", unread: true, type: "warning" },
  { id: 3, title: "Sarah joined the team", desc: "Welcome a new Product Designer", time: "1h ago", unread: true, type: "info" },
  { id: 4, title: "Weekly report ready", desc: "Your analytics digest is available", time: "3h ago", unread: false, type: "default" },
];

export function Topbar({ onMenuClick, onToggleCollapse, onOpenCommand }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const currentItem = ALL_NAV_ITEMS.find(
    (i) => pathname === i.href || (i.href !== "/" && pathname?.startsWith(i.href))
  );

  return (
    <header className="shrink-0 z-30 glass border-b border-border">
      <div className="flex h-16 items-center gap-2 px-4 md:px-6">
        {/* Mobile menu */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden size-9 rounded-full"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>

        {/* Collapse toggle (desktop) */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex size-9 rounded-full text-muted-foreground hover:text-foreground"
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="size-4" />
        </Button>

        {/* Page title (replaces breadcrumb) */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="font-semibold text-foreground">{currentItem?.label ?? "Dashboard"}</span>
        </div>

        {/* Search / Command */}
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={onOpenCommand}
            className="hidden md:flex items-center gap-2 w-64 lg:w-72 h-9 rounded-full border border-border bg-background/50 px-3 text-sm text-muted-foreground hover:border-ring/40 hover:bg-accent transition-colors"
            aria-label="Open command palette"
          >
            <Search className="size-4" />
            <span className="flex-1 text-left">Search anything...</span>
            <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden size-9 rounded-full"
            onClick={onOpenCommand}
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>

          {/* Quick action */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="hidden md:inline-flex h-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              >
                <Plus className="size-4 mr-1" />
                <span className="text-sm font-medium">Create</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Create New</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/apps/invoice")}>
                  <FileText className="size-4 mr-2" /> New Invoice
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/apps/tasks")}>
                  <CheckSquare className="size-4 mr-2" /> New Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/apps/kanban")}>
                  <KanbanSquare className="size-4 mr-2" /> New Board
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/enterprise/team")}>
                  <UserPlus className="size-4 mr-2" /> Invite Member
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/apps/ai-assistant")}>
                  <Sparkles className="size-4 mr-2" /> Ask AI
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Notifications"
              >
                <Bell className="size-[18px]" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div>
                  <p className="text-sm font-semibold">Notifications</p>
                  <p className="text-xs text-muted-foreground">You have 3 unread messages</p>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Mark all read
                </Button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className="flex gap-3 px-4 py-3 hover:bg-accent transition-colors border-b border-border last:border-0 cursor-pointer"
                  >
                    <div className={`mt-1.5 size-2 rounded-full shrink-0 ${
                      n.type === "success" ? "bg-success" :
                      n.type === "warning" ? "bg-warning" :
                      n.type === "info" ? "bg-info" :
                      "bg-muted-foreground/40"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.desc}</p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1">{n.time}</p>
                    </div>
                    {n.unread && <div className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />}
                  </div>
                ))}
              </div>
              <div className="border-t border-border p-2">
                <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                  <Link href="/enterprise/notifications">View all notifications</Link>
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="ml-1 flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-accent transition-colors"
                aria-label="User menu"
              >
                <Avatar className="size-8 ring-2 ring-border">
                  <AvatarImage src="" alt="Alex Morgan" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xs font-semibold">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start leading-tight">
                  <span className="text-xs font-semibold">Alex Morgan</span>
                  <span className="text-[10px] text-muted-foreground">Admin</span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <div className="flex items-center gap-3 p-2">
                <Avatar className="size-10 ring-2 ring-border">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-sm font-semibold">
                    AM
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">Alex Morgan</p>
                  <p className="text-xs text-muted-foreground truncate">alex@mtverse.example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/enterprise/profile" className="cursor-pointer">
                    <User className="size-4 mr-2" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/enterprise/settings" className="cursor-pointer">
                    <Settings className="size-4 mr-2" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/enterprise/billing" className="cursor-pointer">
                    <CreditCard className="size-4 mr-2" /> Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/enterprise/api-keys" className="cursor-pointer">
                    <Key className="size-4 mr-2" /> API Keys
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/enterprise/help" className="cursor-pointer">
                    <HelpCircle className="size-4 mr-2" /> Help Center
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/signin" className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="size-4 mr-2" /> Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
