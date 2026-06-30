"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Search,
  Command,
  CornerDownLeft,
  Sparkles,
  Home,
  Settings,
  Users,
  Folder,
  FileText,
  BarChart3,
  Calendar,
  Mail,
  Bell,
  Moon,
  LogOut,
  Plus,
  Download,
  Star,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  group: "Navigation" | "Actions" | "Settings" | "Help";
  keywords?: string;
  shortcut?: string[];
};

const COMMANDS: CommandItem[] = [
  // Navigation
  { id: "nav-home", label: "Go to Dashboard", icon: Home, group: "Navigation", keywords: "home overview", shortcut: ["G", "D"] },
  { id: "nav-projects", label: "Go to Projects", icon: Folder, group: "Navigation", keywords: "workspaces", shortcut: ["G", "P"] },
  { id: "nav-team", label: "Go to Team", icon: Users, group: "Navigation", keywords: "members people", shortcut: ["G", "T"] },
  { id: "nav-reports", label: "Go to Reports", icon: BarChart3, group: "Navigation", keywords: "analytics charts", shortcut: ["G", "R"] },
  { id: "nav-calendar", label: "Go to Calendar", icon: Calendar, group: "Navigation", keywords: "events schedule", shortcut: ["G", "C"] },
  { id: "nav-messages", label: "Go to Messages", icon: Mail, group: "Navigation", keywords: "inbox email", shortcut: ["G", "M"] },
  // Actions
  { id: "act-new-project", label: "Create new project", icon: Plus, group: "Actions", keywords: "add make", shortcut: ["C"] },
  { id: "act-new-doc", label: "Create new document", icon: FileText, group: "Actions", keywords: "page note", shortcut: ["D"] },
  { id: "act-invite", label: "Invite teammate", icon: Users, group: "Actions", keywords: "add member", shortcut: ["I"] },
  { id: "act-export", label: "Export data", icon: Download, group: "Actions", keywords: "download csv", shortcut: ["E"] },
  { id: "act-star", label: "Star current page", icon: Star, group: "Actions", keywords: "favorite bookmark", shortcut: ["S"] },
  // Settings
  { id: "set-theme", label: "Toggle theme", icon: Moon, group: "Settings", keywords: "dark light mode", shortcut: ["⌘", "⇧", "L"] },
  { id: "set-notifications", label: "Notification preferences", icon: Bell, group: "Settings", keywords: "alerts", shortcut: ["⌘", ","] },
  { id: "set-account", label: "Account settings", icon: Settings, group: "Settings", keywords: "profile", shortcut: ["⌘", "."] },
  { id: "set-logout", label: "Sign out", icon: LogOut, group: "Settings", keywords: "exit quit" },
  // Help
  { id: "help-docs", label: "Open documentation", icon: FileText, group: "Help", keywords: "docs guide", shortcut: ["?"] },
  { id: "help-shortcuts", label: "Keyboard shortcuts", icon: Command, group: "Help", keywords: "keybinding", shortcut: ["?"] },
  { id: "help-support", label: "Contact support", icon: HelpCircle, group: "Help", keywords: "help chat" },
];

const GROUP_ORDER: CommandItem["group"][] = ["Navigation", "Actions", "Settings", "Help"];

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["↑", "↓"], label: "Navigate results" },
  { keys: ["↵"], label: "Run selected command" },
  { keys: ["Esc"], label: "Close palette" },
  { keys: ["⌘", "P"], label: "Quick switch project" },
  { keys: ["⌘", "B"], label: "Toggle sidebar" },
  { keys: ["⌘", "/"], label: "Search settings" },
];

function Kbd({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {keys.map((k, i) => (
        <kbd
          key={i}
          className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-gray-200 bg-gray-50 px-1 text-[10px] font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}

export default function CommandMenuPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Global ⌘K handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Filter commands
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => {
      const haystack = `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  // Group filtered commands
  const grouped = useMemo(() => {
    const map = new Map<CommandItem["group"], CommandItem[]>();
    GROUP_ORDER.forEach((g) => map.set(g, []));
    filtered.forEach((c) => {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    });
    return GROUP_ORDER.map((g) => ({ group: g, items: map.get(g) ?? [] })).filter((g) => g.items.length > 0);
  }, [filtered]);

  // Flat index of visible commands (for arrow key navigation)
  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  // Reset active when filtered list changes — done via key on the input's onChange, not effect
  const handleQueryChange = (v: string) => {
    setQuery(v);
    setActive(0);
  };

  // Reset on close (deferred to avoid setState-in-effect warning)
  const closePalette = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setQuery("");
      setActive(0);
    }, 200);
  }, []);

  // Scroll active into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const runCommand = useCallback((cmd: CommandItem | undefined) => {
    if (!cmd) return;
    setLastAction(cmd.label);
    closePalette();
  }, [closePalette]);

  const onKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(flat.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(flat[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
    }
  };

  let runningIdx = -1;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Command Menu"
        description="A keyboard-first command palette (Cmd+K) for navigating the app, running actions, and changing settings — without touching the mouse."
        breadcrumbs={[{ label: "UI Components" }, { label: "Command Menu" }]}
        actions={
          <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
            <Command className="h-4 w-4" /> Launch demo
          </Button>
        }
      />

      {/* Command palette overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center bg-gray-900/50 p-4 pt-[12vh] backdrop-blur-sm animate-fade-in"
          onClick={() => closePalette()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-2xl dark:border-gray-800 dark:bg-gray-900 animate-scale-in"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 dark:border-gray-800">
              <Search className="h-4 w-4 shrink-0 text-gray-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={onKeydown}
                placeholder="Type a command or search…"
                className="h-14 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
              />
              <Badge tone="gray" variant="soft">Esc</Badge>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {flat.length === 0 ? (
                <div className="px-3 py-10 text-center">
                  <Search className="mx-auto h-6 w-6 text-gray-300 dark:text-gray-600" />
                  <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">No matching commands</p>
                  <p className="text-xs text-gray-500">Try a different keyword.</p>
                </div>
              ) : (
                grouped.map((g) => (
                  <div key={g.group} className="mb-1">
                    <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">{g.group}</p>
                    {g.items.map((cmd) => {
                      runningIdx += 1;
                      const idx = runningIdx;
                      const isActive = idx === active;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.id}
                          data-idx={idx}
                          onMouseMove={() => setActive(idx)}
                          onClick={() => runCommand(cmd)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                            isActive
                              ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="min-w-0 flex-1 text-sm font-medium">{cmd.label}</span>
                          {cmd.shortcut && <Kbd keys={cmd.shortcut} />}
                          {isActive && <CornerDownLeft className="h-3.5 w-3.5 text-brand-500" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-4 py-2.5 text-[11px] text-gray-500 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Kbd keys={["↑"]} /> <Kbd keys={["↓"]} /> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <Kbd keys={["↵"]} /> Select
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-brand-500" /> Nimbus Pro · {flat.length} commands
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* What is it */}
        <Card>
          <CardHeader title="What is a Command Palette?" description="The fastest path to anywhere in your app" />
          <CardBody className="space-y-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              A command palette is a keyboard-first interface that lets users jump to any page, run any action, or change any setting by typing part of its name. Popularized by Linear, Raycast, and GitHub, it&apos;s the single most-loved power-user feature in modern SaaS apps.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Speed</p>
                <p className="mt-0.5 text-xs text-gray-700 dark:text-gray-300">3–5 keystrokes to any action.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Discoverability</p>
                <p className="mt-0.5 text-xs text-gray-700 dark:text-gray-300">Type to fuzzy-search every command.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Muscle memory</p>
                <p className="mt-0.5 text-xs text-gray-700 dark:text-gray-300">Same shortcut on every page.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">A11y</p>
                <p className="mt-0.5 text-xs text-gray-700 dark:text-gray-300">Fully keyboard navigable, no mouse needed.</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Launch */}
        <Card>
          <CardHeader title="Try It Now" description="Open the palette and run a command" />
          <CardBody className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={() => setOpen(true)}>
                <Command className="h-4 w-4" /> Launch demo
              </Button>
              <span className="text-xs text-gray-500">or press</span>
              <Kbd keys={["⌘", "K"]} />
              <span className="text-xs text-gray-500">/</span>
              <Kbd keys={["Ctrl", "K"]} />
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900/40">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Last action</p>
              <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                {lastAction ?? "No command run yet — open the palette and try one."}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-3 text-xs text-gray-500 dark:border-gray-800">
              Tip: try searching for <span className="font-semibold text-gray-700 dark:text-gray-300">theme</span>, <span className="font-semibold text-gray-700 dark:text-gray-300">invite</span>, or <span className="font-semibold text-gray-700 dark:text-gray-300">star</span>.
            </div>
          </CardBody>
        </Card>

        {/* Keyboard shortcuts */}
        <Card className="lg:col-span-2">
          <CardHeader title="Keyboard Shortcuts" description="Global keybindings available across the app" />
          <CardBody>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SHORTCUTS.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-4 py-2.5 dark:border-gray-800"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">{s.label}</span>
                  <Kbd keys={s.keys} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Example commands */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Example Commands"
            description="All 18 commands bundled with the demo palette"
            action={<Badge tone="brand" variant="soft">{COMMANDS.length} total</Badge>}
          />
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {GROUP_ORDER.map((g) => (
                <div key={g}>
                  <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">{g}</p>
                  <div className="space-y-1">
                    {COMMANDS.filter((c) => c.group === g).map((c) => {
                      const Icon = c.icon;
                      return (
                        <div
                          key={c.id}
                          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-gray-700 dark:text-gray-300"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                          <span className="min-w-0 flex-1 truncate font-medium">{c.label}</span>
                          {c.shortcut && <Kbd keys={c.shortcut} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card className="lg:col-span-2">
          <CardHeader title="Anatomy & Tips" description="How to build a great command palette" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Trigger</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">⌘K / Ctrl+K is the universal convention. Toggle on second press.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Fuzzy search</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Match against label + group + keywords. Sort by recency for power users.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Grouping</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Group results by category (Navigation, Actions, Settings, Help) with sticky headers.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Keyboard only</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Arrow keys, Enter, Esc. Mouse hover updates the active index so click & keyboard stay in sync.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
