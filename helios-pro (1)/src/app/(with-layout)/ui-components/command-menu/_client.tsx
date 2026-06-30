"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import {
  CommandPalette,
  useCommandPalette,
} from "@/components/shared/command-palette";
import {
  CommandIcon,
  RocketIcon,
  BookIcon,
  MailIcon,
  CheckSquareIcon,
  BellIcon,
  UsersIcon,
  WalletIcon,
  KanbanIcon,
  Calendar,
  FileTextIcon,
  ShieldIcon,
} from "@/components/Layouts/sidebar/icons";

const shortcuts = [
  {
    keys: ["Cmd", "K"],
    mac: true,
    description: "Open or close the command palette from anywhere.",
  },
  {
    keys: ["Ctrl", "K"],
    mac: false,
    description: "Same shortcut on Windows / Linux.",
  },
  {
    keys: ["↑", "↓"],
    mac: true,
    description: "Move the active selection up or down the result list.",
  },
  {
    keys: ["↵"],
    mac: true,
    description: "Navigate to the highlighted result.",
  },
  {
    keys: ["Esc"],
    mac: true,
    description: "Close the palette without navigating.",
  },
];

const exampleRoutes = [
  { label: "Analytics Dashboard", parent: "Dashboards", icon: <RocketIcon className="size-4" /> },
  { label: "Email", parent: "Apps", icon: <MailIcon className="size-4" /> },
  { label: "Kanban Board", parent: "Apps", icon: <KanbanIcon className="size-4" /> },
  { label: "Calendar", parent: "Apps", icon: <Calendar className="size-4" /> },
  { label: "Tasks", parent: "Apps", icon: <CheckSquareIcon className="size-4" /> },
  { label: "Invoices", parent: "Apps", icon: <FileTextIcon className="size-4" /> },
  { label: "Customers", parent: "Ecommerce", icon: <UsersIcon className="size-4" /> },
  { label: "Roles & Permissions", parent: "User Account", icon: <ShieldIcon className="size-4" /> },
  { label: "Billing Settings", parent: "User Account", icon: <WalletIcon className="size-4" /> },
  { label: "Activity Log", parent: "User Account", icon: <BellIcon className="size-4" /> },
];

export default function CommandMenuClient() {
  const { open, setOpen } = useCommandPalette();

  return (
    <>
      <PageHeader
        title="Command Menu"
        description="A global command palette — search 100+ routes, jump between dashboards and trigger workspace actions without leaving the keyboard."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/command-menu" },
          { label: "Command Menu" },
        ]}
        actions={
          <Badge variant="primary">
            <CommandIcon className="size-3.5" /> Cmd / Ctrl + K
          </Badge>
        }
      />

      <CommandPalette open={open} onClose={() => setOpen(false)} />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Try it now"
            subtitle="The palette is already mounted on this page and listens for Cmd / Ctrl + K globally."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={() => setOpen(true)}>
              <CommandIcon className="size-4" /> Open command palette
            </Button>
            <span className="text-sm text-dark-5 dark:text-dark-6">
              or press
            </span>
            <kbd className="inline-flex items-center gap-1 rounded-lg border border-stroke bg-gray-2 px-2.5 py-1.5 text-xs font-semibold text-dark-7 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-7">
              <span className="hidden sm:inline">⌘</span>
              <span className="sm:hidden">Ctrl</span> + K
            </kbd>
          </div>
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            The palette searches across <span className="font-semibold text-dark dark:text-white">FLAT_NAV</span> — every route
            in the sidebar — by title, parent group and section. Results update
            instantly as you type. Try searching for{" "}
            <span className="font-medium">analytics</span>,{" "}
            <span className="font-medium">invoice</span> or{" "}
            <span className="font-medium">billing</span>.
          </p>
        </Card>

        <Card>
          <CardHeader
            title="Keyboard shortcuts"
            subtitle="The palette is fully keyboard-driven — no mouse required."
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stroke text-left text-xs uppercase text-dark-5 dark:border-dark-3 dark:text-dark-6">
                  <th className="py-2 pr-4 font-medium">Keys</th>
                  <th className="py-2 pr-4 font-medium">Platform</th>
                  <th className="py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stroke dark:divide-dark-3">
                {shortcuts.map((s) => (
                  <tr key={s.keys.join("+")}>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1">
                        {s.keys.map((k, i) => (
                          <React.Fragment key={k}>
                            {i > 0 && (
                              <span className="text-dark-5 dark:text-dark-6">+</span>
                            )}
                            <kbd className="inline-flex items-center justify-center rounded-md border border-stroke bg-gray-2 px-2 py-1 text-xs font-semibold text-dark-7 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-7 min-w-[28px]">
                              {k}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-dark-7 dark:text-dark-7">
                      {s.mac ? "macOS" : "Windows / Linux"}
                    </td>
                    <td className="py-3 text-dark-5 dark:text-dark-6">
                      {s.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Searchable routes"
            subtitle="A snapshot of the routes you can jump to from the palette."
          />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {exampleRoutes.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-stroke px-3 py-2.5 text-sm transition hover:border-primary/40 dark:border-dark-3"
              >
                <span className="flex items-center gap-2 text-dark-7 dark:text-dark-7">
                  <span className="text-dark-5 dark:text-dark-6">{r.icon}</span>
                  <span className="font-medium text-dark dark:text-white">
                    {r.label}
                  </span>
                </span>
                <span className="text-xs text-dark-5 dark:text-dark-6">
                  {r.parent}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            …and 90+ more across Dashboards, Apps, Ecommerce, User Account,
            Forms, Tables, Charts, UI Components and Pages.
          </p>
        </Card>

        <Card>
          <CardHeader
            title="How it's wired"
            subtitle="The hook + component split makes the palette trivial to mount on any page or layout."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-stroke bg-gray-2/50 p-4 dark:border-dark-3 dark:bg-dark-2/50">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dark-5 dark:text-dark-6">
                useCommandPalette()
              </p>
              <pre className="helios-scroll overflow-x-auto text-xs text-dark-7 dark:text-dark-7">
{`const { open, setOpen } = useCommandPalette();

return (
  <>
    <Button onClick={() => setOpen(true)}>
      Open palette
    </Button>
    <CommandPalette open={open}
      onClose={() => setOpen(false)} />
  </>
);`}
              </pre>
            </div>
            <div className="space-y-3 text-sm text-dark-5 dark:text-dark-6">
              <p>
                The hook registers a global <code>keydown</code> listener for
                <code> Cmd/Ctrl + K</code> and toggles the open state. Mount the{" "}
                <code>CommandPalette</code> once anywhere in the tree — the
                header already mounts it globally, so this page mounts a second
                instance purely for the live demo.
              </p>
              <p>
                Results come from <code>FLAT_NAV</code> in{" "}
                <code>sidebar/data</code> — the same source that drives the
                sidebar — so new routes appear in the palette automatically.
              </p>
              <p className="flex items-center gap-2">
                <BookIcon className="size-4 text-primary" />
                Press <kbd className="rounded border border-stroke bg-white px-1.5 py-0.5 text-[10px] font-semibold dark:border-dark-3 dark:bg-dark-2">⌘ K</kbd> anywhere to try it now.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
