"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { Icon } from "@iconify/react";
import { searchIndex, searchSections } from "./searchIndex";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GlobalSearch = ({ open, onOpenChange }: GlobalSearchProps) => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Listen for Ctrl+K / Cmd+K globally
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filtered = query.trim()
    ? searchIndex.filter((entry) => {
        const q = query.toLowerCase();
        return (
          entry.label.toLowerCase().includes(q) ||
          entry.section.toLowerCase().includes(q) ||
          entry.path.toLowerCase().includes(q) ||
          entry.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : searchIndex;

  // Group results by section
  const grouped = searchSections
    .map((section) => ({
      section,
      items: filtered.filter((e) => e.section === section),
    }))
    .filter((g) => g.items.length > 0);

  const handleSelect = (path: string) => {
    router.push(path);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-4 opacity-60">
            <Icon icon="solar:magnifer-bug-bold-duotone" width={40} />
            <p className="text-sm">No results for &quot;{query}&quot;</p>
            <p className="text-xs">Try: alert, badge, kanban, chart, table, login</p>
          </div>
        </CommandEmpty>

        {!query.trim() && (
          <div className="px-3 pt-3 pb-1">
            <div className="flex flex-wrap gap-1.5">
              {["alert", "badge", "button", "kanban", "chart", "table", "login", "pricing"].map((s) => (
                <button
                  key={s}
                  onMouseDown={(e) => { e.preventDefault(); setQuery(s); }}
                  className="px-2 py-0.5 rounded-full bg-lightgray dark:bg-dark text-xs hover:bg-lightprimary hover:text-primary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {grouped.map((group, idx) => (
          <div key={group.section}>
            {idx > 0 && <CommandSeparator />}
            <CommandGroup heading={group.section}>
              {group.items.map((entry) => (
                <CommandItem
                  key={entry.path}
                  value={`${entry.label} ${entry.section} ${entry.keywords.join(" ")}`}
                  onSelect={() => handleSelect(entry.path)}
                  className="gap-3"
                >
                  <div className="h-8 w-8 rounded-lg bg-lightprimary text-primary flex items-center justify-center shrink-0">
                    <Icon icon={entry.icon} width={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{entry.label}</p>
                    <p className="text-xs opacity-60 truncate">{entry.path}</p>
                  </div>
                  <kbd className="hidden sm:inline-flex h-5 min-w-5 items-center justify-center rounded border border-defaultBorder bg-muted px-1 text-[10px] font-mono opacity-60">
                    ↵
                  </kbd>
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>

      <div className="flex items-center justify-between px-3 py-2 border-t border-defaultBorder text-xs opacity-60">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <kbd className="h-5 min-w-5 inline-flex items-center justify-center rounded border border-defaultBorder bg-muted px-1 font-mono">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="h-5 min-w-5 inline-flex items-center justify-center rounded border border-defaultBorder bg-muted px-1 font-mono">↵</kbd>
            open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="h-5 inline-flex items-center justify-center rounded border border-defaultBorder bg-muted px-1.5 font-mono">esc</kbd>
            close
          </span>
        </div>
        <span className="text-primary font-medium">mtverse Search</span>
      </div>
    </CommandDialog>
  );
};

export default GlobalSearch;
