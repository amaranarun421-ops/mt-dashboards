"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useUIStore } from "@/lib/store";
import { routes, marketingRoutes, findRouteByPath } from "@/lib/route-map";
import { Plus, Moon, Sun, ArrowRight, Star, Clock, BookOpen, FileText, Sparkles, Briefcase, UserPlus, Building } from "lucide-react";

export function CommandPalette() {
  const router = useRouter();
  const { commandOpen, setCommandOpen, recentPages } = useUIStore();
  const { theme, setTheme } = useTheme();

  const recentRoutes = recentPages
    .map((p) => findRouteByPath(p))
    .filter((r): r is NonNullable<typeof r> => !!r && !r.hidden)
    .slice(0, 5);

  const navigate = (path: string) => {
    router.push(path);
    setCommandOpen(false);
  };

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Search pages, jump to a route, or run a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Quick actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setCommandOpen(false);
            }}
            className="gap-2"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Switch to {theme === "dark" ? "light" : "dark"} theme
          </CommandItem>
          <CommandItem onSelect={() => navigate("/sales/deals")} className="gap-2">
            <Briefcase className="h-4 w-4" /> Create a new deal <span className="ml-auto text-xs text-gray-400">Sales</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/sales/leads")} className="gap-2">
            <UserPlus className="h-4 w-4" /> Add a lead <span className="ml-auto text-xs text-gray-400">Sales</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/sales/accounts")} className="gap-2">
            <Building className="h-4 w-4" /> Add an account <span className="ml-auto text-xs text-gray-400">Sales</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/apps/todo")} className="gap-2">
            <Plus className="h-4 w-4" /> Create a task <span className="ml-auto text-xs text-gray-400">Apps</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Recently visited */}
        {recentRoutes.length > 0 && (
          <>
            <CommandGroup heading="Recently Visited">
              {recentRoutes.map((r) => {
                const Icon = r.icon;
                return (
                  <CommandItem
                    key={`rec-${r.id}`}
                    value={`${r.label} recent`}
                    onSelect={() => navigate(r.path)}
                    className="gap-2"
                  >
                    <Clock className="h-4 w-4 text-gray-400" />
                    {r.label}
                    <span className="ml-auto text-xs text-gray-400">{r.group}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Sales Ops (flagship module) */}
        <CommandGroup heading="Sales Ops">
          {routes.filter((r) => r.group === "Sales Ops" && !r.hidden).slice(0, 8).map((r) => {
            const Icon = r.icon;
            return (
              <CommandItem
                key={r.id}
                value={`${r.label} sales ${r.section ?? ""}`}
                onSelect={() => navigate(r.path)}
                className="gap-2"
              >
                <Icon className="h-4 w-4 text-brand-500" />
                {r.label}
                {r.badge && r.badgeVariant === "pro" && (
                  <span className="ml-auto rounded bg-gradient-to-r from-brand-500 to-purple-500 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-white">
                    Pro
                  </span>
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>

        {/* Dashboards */}
        <CommandGroup heading="Dashboards">
          {routes.filter((r) => r.group === "Dashboards").map((r) => {
            const Icon = r.icon;
            return (
              <CommandItem
                key={r.id}
                value={`${r.label} dashboard`}
                onSelect={() => navigate(r.path)}
                className="gap-2"
              >
                <Icon className="h-4 w-4 text-gray-500" />
                {r.label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        {/* Apps */}
        <CommandGroup heading="Applications">
          {routes.filter((r) => r.group === "Applications").map((r) => {
            const Icon = r.icon;
            return (
              <CommandItem
                key={r.id}
                value={`${r.label} app application`}
                onSelect={() => navigate(r.path)}
                className="gap-2"
              >
                <Icon className="h-4 w-4 text-gray-500" />
                {r.label}
                {r.badge && <span className="ml-auto text-xs text-gray-400">{r.badge}</span>}
              </CommandItem>
            );
          })}
        </CommandGroup>

        {/* Account */}
        <CommandGroup heading="Account">
          {routes.filter((r) => r.group === "Account").map((r) => {
            const Icon = r.icon;
            return (
              <CommandItem
                key={r.id}
                value={`${r.label} account`}
                onSelect={() => navigate(r.path)}
                className="gap-2"
              >
                <Icon className="h-4 w-4 text-gray-500" />
                {r.label}
              </CommandItem>
            );
          })}
        </CommandGroup>

        {/* Other groups */}
        {(["UI Elements", "Forms", "Tables", "Charts", "Pages"] as const).map((g) => (
          <CommandGroup key={g} heading={g}>
            {routes.filter((r) => r.group === g).map((r) => {
              const Icon = r.icon;
              return (
                <CommandItem
                  key={r.id}
                  value={`${r.label} ${g.toLowerCase()}`}
                  onSelect={() => navigate(r.path)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4 text-gray-500" />
                  {r.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}

        <CommandSeparator />

        {/* Documentation */}
        <CommandGroup heading="Documentation & Links">
          {marketingRoutes.filter((r) => r.path !== "/").map((r) => (
            <CommandItem
              key={r.path}
              value={`${r.label} docs documentation marketing`}
              onSelect={() => navigate(r.path)}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4 text-gray-500" />
              {r.label}
            </CommandItem>
          ))}
          <CommandItem onSelect={() => navigate("/pages/faq")} className="gap-2">
            <FileText className="h-4 w-4 text-gray-500" /> Help Center & FAQ
          </CommandItem>
          <CommandItem onSelect={() => navigate("/pricing-license")} className="gap-2">
            <Sparkles className="h-4 w-4 text-brand-500" /> Upgrade to Enterprise
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
