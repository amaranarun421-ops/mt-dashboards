"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { COMMAND_PALETTE_ITEMS, BRAND } from "@/lib/navigation";
import {
  Search, Sparkles, Moon, Sun, LayoutDashboard, ExternalLink, Settings, Bell,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  const grouped = React.useMemo(() => {
    const map = new Map<string, typeof COMMAND_PALETTE_ITEMS>();
    for (const item of COMMAND_PALETTE_ITEMS) {
      const arr = map.get(item.group) ?? [];
      arr.push(item);
      map.set(item.group, arr);
    }
    return Array.from(map.entries());
  }, []);

  const runCommand = (cmd: () => void) => {
    onOpenChange(false);
    cmd();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={`Search ${BRAND.name} — pages, settings, actions...`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <LayoutDashboard className="mr-2 size-4" />
            <span>Go to Overview</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/apps/ai-assistant"))}>
            <Sparkles className="mr-2 size-4" />
            <span>Open AI Assistant</span>
            <CommandShortcut>⌘J</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/enterprise/settings"))}>
            <Settings className="mr-2 size-4" />
            <span>Open Settings</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/enterprise/notifications"))}>
            <Bell className="mr-2 size-4" />
            <span>View Notifications</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {grouped.map(([group, items]) => (
          <CommandGroup key={group} heading={group}>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${group} ${item.href}`}
                  onSelect={() => runCommand(() => router.push(item.href))}
                >
                  <Icon className="mr-2 size-4" />
                  <span>{item.label}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">{group}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}

        <CommandSeparator />
        <CommandGroup heading="Help">
          <CommandItem onSelect={() => runCommand(() => router.push("/enterprise/help"))}>
            <ExternalLink className="mr-2 size-4" />
            <span>Open Help Center</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/enterprise/faq"))}>
            <ExternalLink className="mr-2 size-4" />
            <span>View FAQ</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
