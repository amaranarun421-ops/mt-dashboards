'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut } from '@/components/ui/command';
import { NAV_GROUPS, ALL_NAV_ITEMS } from '@/lib/navigation';
import { Plus, Search, ArrowUpRight, Sparkles } from 'lucide-react';
import { deals, accounts, contacts, leads } from '@/lib/data';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  const go = (href: string) => {
    router.push(href);
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search deals, accounts, contacts, or jump to a page…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => go('/dashboard/deals')}>
            <Plus className="mr-2 h-4 w-4" />
            Create new deal
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => go('/dashboard/leads')}>
            <Plus className="mr-2 h-4 w-4" />
            Create new lead
          </CommandItem>
          <CommandItem onSelect={() => go('/dashboard/report-builder')}>
            <Plus className="mr-2 h-4 w-4" />
            Build new report
          </CommandItem>
          <CommandItem onSelect={() => go('/dashboard/forecasting')}>
            <Sparkles className="mr-2 h-4 w-4" />
            View AI forecast
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {NAV_GROUPS.slice(0, 5).map((group) => (
          <CommandGroup key={group.id} heading={group.label}>
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  onSelect={() => go(item.href)}
                  value={`${item.label} ${group.label}`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                  <CommandShortcut>
                    <ArrowUpRight className="w-3 h-3" />
                  </CommandShortcut>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}

        <CommandSeparator />

        <CommandGroup heading="Deals">
          {deals.slice(0, 5).map((d) => (
            <CommandItem
              key={d.id}
              onSelect={() => go(`/dashboard/deals/${d.id}`)}
              value={`deal ${d.name} ${d.account}`}
            >
              <span className="mr-2 text-xs font-mono text-muted-foreground">{d.id}</span>
              <span className="truncate">{d.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">· {d.account}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Accounts">
          {accounts.slice(0, 5).map((a) => (
            <CommandItem
              key={a.id}
              onSelect={() => go(`/dashboard/accounts/${a.id}`)}
              value={`account ${a.name} ${a.industry}`}
            >
              <span className="mr-2 w-5 h-5 rounded text-[10px] flex items-center justify-center font-bold text-white" style={{ background: a.logoColor }}>
                {a.name.charAt(0)}
              </span>
              <span className="truncate">{a.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">· {a.industry}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Contacts">
          {contacts.slice(0, 5).map((c) => (
            <CommandItem
              key={c.id}
              onSelect={() => go(`/dashboard/contacts`)}
              value={`contact ${c.name} ${c.account} ${c.title}`}
            >
              <span className="mr-2 w-5 h-5 rounded-full bg-secondary text-[10px] flex items-center justify-center font-bold">
                {c.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <span className="truncate">{c.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">· {c.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Leads">
          {leads.slice(0, 5).map((l) => (
            <CommandItem
              key={l.id}
              onSelect={() => go(`/dashboard/leads/${l.id}`)}
              value={`lead ${l.name} ${l.company}`}
            >
              <span className="mr-2 text-xs font-mono text-muted-foreground">{l.id}</span>
              <span className="truncate">{l.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">· {l.company}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
