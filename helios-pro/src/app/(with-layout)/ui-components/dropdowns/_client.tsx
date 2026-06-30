"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Popover } from "@/components/shared/tooltip";
import {
  DropdownIcon,
  EditIcon,
  CheckSquareIcon,
  UploadIcon,
  MailIcon,
  BellIcon,
  User,
  LogInIcon,
  KeyIcon,
  ChevronRight,
  StarIcon,
  FileTextIcon,
  TagIcon,
  StarIcon as StarFilled,
} from "@/components/Layouts/sidebar/icons";

function Item({
  icon,
  label,
  shortcut,
  onClick,
  danger,
}: {
  icon?: React.ReactNode;
  label: string;
  shortcut?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition ${
        danger
          ? "text-red hover:bg-red-light-5 dark:hover:bg-red/15"
          : "text-dark-7 hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
      }`}
    >
      {icon && (
        <span className="text-dark-5 dark:text-dark-6">{icon}</span>
      )}
      <span className="flex-1">{label}</span>
      {shortcut && (
        <kbd className="rounded border border-stroke px-1 text-[10px] text-dark-5 dark:border-dark-3 dark:text-dark-6">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}

function Divider() {
  return <div className="my-1 h-px bg-stroke dark:bg-dark-3" />;
}

function Header({ label }: { label: string }) {
  return (
    <p className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
      {label}
    </p>
  );
}

export default function DropdownsPage() {
  return (
    <>
      <PageHeader
        title="Dropdowns"
        description="Dropdown menus built on the shared Popover primitive — click a trigger to reveal a contextual list."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/dropdowns" },
          { label: "Dropdowns" },
        ]}
        actions={
          <Badge variant="primary">
            <DropdownIcon className="size-3.5" /> Popover-based
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Basic dropdown"
            subtitle="A simple menu of actions."
          />
          <Popover
            trigger={
              <Button variant="outline">
                Open menu <ChevronRight className="size-4 rotate-90" />
              </Button>
            }
          >
            {(close) => (
              <div className="w-48">
                <Item label="New file" onClick={close} />
                <Item label="Open…" onClick={close} />
                <Item label="Recent" onClick={close} />
                <Divider />
                <Item label="Settings" onClick={close} />
              </div>
            )}
          </Popover>
        </Card>

        <Card>
          <CardHeader
            title="With icons & shortcuts"
            subtitle="Visual reinforcement plus keyboard hints."
          />
          <div className="flex flex-wrap gap-4">
            <Popover
              trigger={
                <Button variant="primary">
                  Actions <ChevronRight className="size-4 rotate-90" />
                </Button>
              }
            >
              {(close) => (
                <div className="w-52">
                  <Item
                    icon={<EditIcon className="size-4" />}
                    label="Edit"
                    shortcut="⌘E"
                    onClick={close}
                  />
                  <Item
                    icon={<CheckSquareIcon className="size-4" />}
                    label="Mark done"
                    shortcut="⌘D"
                    onClick={close}
                  />
                  <Item
                    icon={<UploadIcon className="size-4" />}
                    label="Export"
                    onClick={close}
                  />
                  <Divider />
                  <Item
                    icon={<MailIcon className="size-4" />}
                    label="Share"
                    onClick={close}
                  />
                </div>
              )}
            </Popover>

            <Popover
              trigger={
                <Button variant="ghost">
                  File <ChevronRight className="size-4 rotate-90" />
                </Button>
              }
            >
              {(close) => (
                <div className="w-52">
                  <Item
                    icon={<FileTextIcon className="size-4" />}
                    label="New document"
                    onClick={close}
                  />
                  <Item
                    icon={<TagIcon className="size-4" />}
                    label="Rename"
                    onClick={close}
                  />
                  <Item
                    icon={<UploadIcon className="size-4" />}
                    label="Upload version"
                    onClick={close}
                  />
                </div>
              )}
            </Popover>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="With dividers & headers"
            subtitle="Group related actions under labelled sections."
          />
          <Popover
            trigger={
              <Button variant="outline">
                Grouped menu <ChevronRight className="size-4 rotate-90" />
              </Button>
            }
          >
            {(close) => (
              <div className="w-56">
                <Header label="Create" />
                <Item
                  icon={<FileTextIcon className="size-4" />}
                  label="New task"
                  onClick={close}
                />
                <Item
                  icon={<MailIcon className="size-4" />}
                  label="New message"
                  onClick={close}
                />
                <Divider />
                <Header label="Workspace" />
                <Item label="Switch workspace" onClick={close} />
                <Item label="Invite members" onClick={close} />
                <Divider />
                <Item label="Sign out" danger onClick={close} />
              </div>
            )}
          </Popover>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader
              title="User menu"
              subtitle="Profile-triggered dropdown with avatar and identity."
            />
            <Popover
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl border border-stroke bg-white px-2 py-1.5 text-left transition hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:hover:bg-white/5"
                >
                  <Avatar name="Sofia Marquez" size="sm" />
                  <span className="hidden sm:block">
                    <span className="block text-sm font-semibold text-dark dark:text-white">
                      Sofia Marquez
                    </span>
                    <span className="block text-xs text-dark-5 dark:text-dark-6">
                      Senior Designer
                    </span>
                  </span>
                  <ChevronRight className="size-4 rotate-90 text-dark-5" />
                </button>
              }
            >
              {(close) => (
                <div className="w-60">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar name="Sofia Marquez" size="md" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-dark dark:text-white">
                        Sofia Marquez
                      </p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">
                        sofia@heliospro.io
                      </p>
                    </div>
                  </div>
                  <Divider />
                  <Item
                    icon={<User className="size-4" />}
                    label="Profile"
                    onClick={close}
                  />
                  <Item
                    icon={<KeyIcon className="size-4" />}
                    label="API keys"
                    onClick={close}
                  />
                  <Item
                    icon={<BellIcon className="size-4" />}
                    label="Notifications"
                    onClick={close}
                  />
                  <Divider />
                  <Item
                    icon={<LogInIcon className="size-4" />}
                    label="Sign out"
                    danger
                    onClick={close}
                  />
                </div>
              )}
            </Popover>
          </Card>

          <Card>
            <CardHeader
              title="Notifications dropdown"
              subtitle="Bell icon with a live list and unread counter."
            />
            <Popover
              trigger={
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative grid size-10 place-items-center rounded-xl border border-stroke bg-white text-dark-5 transition hover:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:text-dark-6 dark:hover:bg-white/5"
                >
                  <BellIcon className="size-5" />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-accent ring-2 ring-white dark:ring-gray-dark" />
                </button>
              }
            >
              {(close) => (
                <div className="w-80">
                  <div className="flex items-center justify-between px-1 pb-2">
                    <p className="text-sm font-semibold text-dark dark:text-white">
                      Notifications
                    </p>
                    <Badge variant="accent" size="sm">
                      3 new
                    </Badge>
                  </div>
                  <Divider />
                  <div className="space-y-1 py-1">
                    {[
                      {
                        title: "Priya commented on your report",
                        time: "2m ago",
                        tone: "primary" as const,
                      },
                      {
                        title: "New invoice #HLP-2043 was paid",
                        time: "1h ago",
                        tone: "success" as const,
                      },
                      {
                        title: "Storage usage at 92%",
                        time: "3h ago",
                        tone: "warning" as const,
                      },
                      {
                        title: "Yuki invited you to Project Atlas",
                        time: "Yesterday",
                        tone: "info" as const,
                      },
                    ].map((n) => (
                      <button
                        key={n.title}
                        onClick={close}
                        className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-gray-2 dark:hover:bg-white/5"
                      >
                        <span
                          className={`mt-1 size-2 shrink-0 rounded-full ${
                            n.tone === "primary"
                              ? "bg-primary"
                              : n.tone === "success"
                              ? "bg-green"
                              : n.tone === "warning"
                              ? "bg-accent"
                              : "bg-blue"
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-dark-7 dark:text-dark-7">
                            {n.title}
                          </p>
                          <p className="text-xs text-dark-5 dark:text-dark-6">
                            {n.time}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Divider />
                  <button
                    onClick={close}
                    className="w-full rounded-lg px-2 py-2 text-center text-sm font-medium text-primary hover:bg-primary-subtle dark:hover:bg-primary/15"
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </Popover>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Multi-level dropdown"
            subtitle="Nested menu using aligned popovers."
          />
          <div className="flex flex-wrap items-center gap-4">
            <Popover
              trigger={
                <Button variant="outline">
                  Sort by <ChevronRight className="size-4 rotate-90" />
                </Button>
              }
            >
              {(close) => (
                <div className="w-56">
                  <Header label="Sort field" />
                  <Item
                    icon={<StarFilled className="size-4" />}
                    label="Priority"
                    onClick={close}
                  />
                  <Item
                    icon={<CheckSquareIcon className="size-4" />}
                    label="Status"
                    onClick={close}
                  />
                  <Item
                    icon={<User className="size-4" />}
                    label="Assignee"
                    onClick={close}
                  />
                  <Divider />
                  <Popover
                    align="end"
                    trigger={
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-sm text-dark-7 transition hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
                      >
                        Direction
                        <ChevronRight className="size-4 -rotate-90 text-dark-5" />
                      </button>
                    }
                  >
                    {(close2) => (
                      <div className="w-40">
                        <Item label="Ascending" onClick={close2} />
                        <Item label="Descending" onClick={close2} />
                      </div>
                    )}
                  </Popover>
                </div>
              )}
            </Popover>

            <Popover
              trigger={
                <Button variant="ghost">
                  Filter <ChevronRight className="size-4 rotate-90" />
                </Button>
              }
            >
              {(close) => (
                <div className="w-56">
                  <Header label="Status" />
                  <Item label="All" onClick={close} />
                  <Item label="Active" onClick={close} />
                  <Item label="Archived" onClick={close} />
                  <Divider />
                  <Popover
                    align="end"
                    trigger={
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-sm text-dark-7 transition hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
                      >
                        By tag
                        <ChevronRight className="size-4 -rotate-90 text-dark-5" />
                      </button>
                    }
                  >
                    {(close2) => (
                      <div className="w-40">
                        <Item
                          icon={<StarIcon className="size-4" />}
                          label="Starred"
                          onClick={close2}
                        />
                        <Item
                          icon={<TagIcon className="size-4" />}
                          label="VIP"
                          onClick={close2}
                        />
                        <Item
                          icon={<MailIcon className="size-4" />}
                          label="Subscribed"
                          onClick={close2}
                        />
                      </div>
                    )}
                  </Popover>
                </div>
              )}
            </Popover>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Aligned dropdowns"
            subtitle="Use the align prop to anchor start, center or end."
          />
          <div className="flex flex-wrap items-center justify-around gap-8">
            <Popover
              align="start"
              trigger={
                <Button variant="outline" size="sm">
                  Start
                </Button>
              }
            >
              <div className="w-40">
                <Item label="Aligned start" />
                <Item label="Second item" />
                <Item label="Third item" />
              </div>
            </Popover>
            <Popover
              align="center"
              trigger={
                <Button variant="outline" size="sm">
                  Center
                </Button>
              }
            >
              <div className="w-40">
                <Item label="Aligned center" />
                <Item label="Second item" />
                <Item label="Third item" />
              </div>
            </Popover>
            <Popover
              align="end"
              trigger={
                <Button variant="outline" size="sm">
                  End
                </Button>
              }
            >
              <div className="w-40">
                <Item label="Aligned end" />
                <Item label="Second item" />
                <Item label="Third item" />
              </div>
            </Popover>
          </div>
        </Card>
      </div>
    </>
  );
}
