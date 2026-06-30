"use client";
import { useState, useRef } from "react";
import {
  PageHeader,
  Card,
  CardHeader,
  CardBody,
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  MoreMenu,
  Badge,
  Avatar,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  MoreHorizontal,
  Settings,
  User,
  LogOut,
  Trash2,
  Pencil,
  Copy,
  Share2,
  Star,
  Download,
  Archive,
  Flag,
  ChevronDown,
  Bell,
  Mail,
  Folder,
  FileText,
  Plus,
  Ban,
} from "lucide-react";

/* Hover dropdown — controlled entirely by mouse enter/leave */
function HoverDropdown({
  trigger,
  children,
  align = "end",
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative inline-block"
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1 min-w-[200px] overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-theme-lg animate-scale-in dark:border-gray-800 dark:bg-gray-900",
            align === "end" ? "right-0" : "left-0"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function DropdownsPage() {
  const [log, setLog] = useState<string[]>([]);

  const pushLog = (msg: string) => setLog((l) => [...l, msg].slice(-6));

  return (
    <div className="space-y-4">
      <PageHeader
        title="Dropdowns"
        description="Click and hover dropdowns — sections, labels, alignment, danger items, and trigger variations."
        breadcrumbs={[{ label: "UI Components" }, { label: "Dropdowns" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Basic */}
        <Card>
          <CardHeader title="Basic Dropdown" description="Click trigger to open, click outside to close" />
          <CardBody>
            <div className="flex flex-wrap items-start gap-3">
              <DropdownMenu
                align="start"
                trigger={
                  <Button variant="secondary" size="sm">
                    Actions <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                }
              >
                <DropdownMenuItem icon={User} onClick={() => pushLog("Profile clicked")}>Profile</DropdownMenuItem>
                <DropdownMenuItem icon={Settings} onClick={() => pushLog("Settings clicked")}>Settings</DropdownMenuItem>
                <DropdownMenuItem icon={Mail} onClick={() => pushLog("Messages clicked")}>Messages</DropdownMenuItem>
                <DropdownMenuItem icon={LogOut} onClick={() => pushLog("Sign out clicked")}>Sign out</DropdownMenuItem>
              </DropdownMenu>

              <DropdownMenu
                trigger={
                  <Button variant="outline" size="sm">
                    File <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                }
              >
                <DropdownMenuItem icon={FileText} onClick={() => pushLog("New file")}>New file</DropdownMenuItem>
                <DropdownMenuItem icon={Folder} onClick={() => pushLog("New folder")}>New folder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={Download} onClick={() => pushLog("Download")}>Download</DropdownMenuItem>
                <DropdownMenuItem icon={Archive} onClick={() => pushLog("Archive")}>Archive</DropdownMenuItem>
              </DropdownMenu>
            </div>
          </CardBody>
        </Card>

        {/* With sections + labels */}
        <Card>
          <CardHeader title="Sections & Labels" description="Group related items with labels and separators" />
          <CardBody>
            <div className="flex flex-wrap items-start gap-3">
              <DropdownMenu
                trigger={
                  <Button variant="primary" size="sm">
                    <Plus className="h-3.5 w-3.5" /> Create <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                }
              >
                <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                <DropdownMenuItem icon={Folder}>New project</DropdownMenuItem>
                <DropdownMenuItem icon={FileText}>New document</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Team</DropdownMenuLabel>
                <DropdownMenuItem icon={User}>Invite member</DropdownMenuItem>
                <DropdownMenuItem icon={Mail}>Send announcement</DropdownMenuItem>
              </DropdownMenu>

              <DropdownMenu
                trigger={
                  <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                    <Avatar name="Aria Chen" size={20} /> Aria
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                }
              >
                <div className="flex items-center gap-2 px-2.5 py-2">
                  <Avatar name="Aria Chen" size={32} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">Aria Chen</p>
                    <p className="truncate text-xs text-gray-500">aria@nimbus.pro</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={User}>Your profile</DropdownMenuItem>
                <DropdownMenuItem icon={Settings}>Account settings</DropdownMenuItem>
                <DropdownMenuItem icon={Star}>Upgrade plan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={LogOut} danger>Sign out</DropdownMenuItem>
              </DropdownMenu>
            </div>
          </CardBody>
        </Card>

        {/* Alignment */}
        <Card>
          <CardHeader title="Alignment" description="Start and end alignment relative to the trigger" />
          <CardBody>
            <div className="flex items-start justify-between gap-3">
              <DropdownMenu
                align="start"
                trigger={
                  <Button variant="secondary" size="sm">
                    Align start <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                }
              >
                <DropdownMenuItem icon={Pencil}>Edit</DropdownMenuItem>
                <DropdownMenuItem icon={Copy}>Duplicate</DropdownMenuItem>
                <DropdownMenuItem icon={Share2}>Share</DropdownMenuItem>
              </DropdownMenu>

              <DropdownMenu
                align="end"
                trigger={
                  <Button variant="secondary" size="sm">
                    Align end <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                }
              >
                <DropdownMenuItem icon={Pencil}>Edit</DropdownMenuItem>
                <DropdownMenuItem icon={Copy}>Duplicate</DropdownMenuItem>
                <DropdownMenuItem icon={Share2}>Share</DropdownMenuItem>
              </DropdownMenu>
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-gray-300 p-4 text-xs text-gray-500 dark:border-gray-700">
              The menu flips to keep itself inside the viewport. Start opens left-aligned with the trigger; end opens
              right-aligned.
            </div>
          </CardBody>
        </Card>

        {/* Danger items */}
        <Card>
          <CardHeader title="Danger Items" description="Use the danger flag for destructive actions" />
          <CardBody>
            <div className="flex flex-wrap items-start gap-3">
              <DropdownMenu
                trigger={
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-3.5 w-3.5" /> Manage
                  </Button>
                }
              >
                <DropdownMenuItem icon={Pencil}>Rename</DropdownMenuItem>
                <DropdownMenuItem icon={Copy}>Duplicate</DropdownMenuItem>
                <DropdownMenuItem icon={Archive}>Archive</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={Trash2} danger>Delete permanently</DropdownMenuItem>
              </DropdownMenu>

              <DropdownMenu
                trigger={
                  <Button variant="danger" size="sm">
                    <Trash2 className="h-3.5 w-3.5" /> Danger
                  </Button>
                }
              >
                <DropdownMenuItem icon={Flag} danger>Report content</DropdownMenuItem>
                <DropdownMenuItem icon={Ban} danger>Block user</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={User}>View profile</DropdownMenuItem>
              </DropdownMenu>
            </div>
          </CardBody>
        </Card>

        {/* Trigger variations */}
        <Card>
          <CardHeader title="Trigger Variations" description="Button, icon, avatar, badge — anything can trigger" />
          <CardBody>
            <div className="flex flex-wrap items-start gap-4">
              <DropdownMenu
                trigger={
                  <button
                    aria-label="More actions"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                }
              >
                <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
                <DropdownMenuItem icon={Bell}>Notifications</DropdownMenuItem>
                <DropdownMenuItem icon={LogOut} danger>Sign out</DropdownMenuItem>
              </DropdownMenu>

              <DropdownMenu
                trigger={
                  <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white dark:ring-gray-900" />
                  </button>
                }
              >
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuItem icon={Mail}>3 new messages</DropdownMenuItem>
                <DropdownMenuItem icon={User}>2 new followers</DropdownMenuItem>
                <DropdownMenuItem icon={Star}>1 new mention</DropdownMenuItem>
              </DropdownMenu>

              <MoreMenu
                items={[
                  { label: "Edit", icon: Pencil, onClick: () => pushLog("Edit from MoreMenu") },
                  { label: "Duplicate", icon: Copy, onClick: () => pushLog("Duplicate from MoreMenu") },
                  { label: "Archive", icon: Archive, onClick: () => pushLog("Archive from MoreMenu") },
                  { label: "Delete", icon: Trash2, danger: true, onClick: () => pushLog("Delete from MoreMenu") },
                ]}
              />

              <DropdownMenu
                trigger={<Avatar name="Aria Chen" size={36} />}
              >
                <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
                <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
                <DropdownMenuItem icon={LogOut} danger>Sign out</DropdownMenuItem>
              </DropdownMenu>
            </div>
          </CardBody>
        </Card>

        {/* Hover dropdown */}
        <Card>
          <CardHeader title="Hover Dropdown" description="Opens on mouse enter, closes on mouse leave" />
          <CardBody>
            <div className="flex flex-wrap items-start gap-3">
              <HoverDropdown
                trigger={
                  <Button variant="secondary" size="sm">
                    Hover me <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                }
              >
                <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
                <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
                <DropdownMenuItem icon={Mail}>Messages</DropdownMenuItem>
                <DropdownMenuItem icon={LogOut} danger>Sign out</DropdownMenuItem>
              </HoverDropdown>

              <HoverDropdown
                align="start"
                trigger={
                  <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                    <Star className="h-3.5 w-3.5" /> Quick access
                  </button>
                }
              >
                <DropdownMenuItem icon={FileText}>Recent docs</DropdownMenuItem>
                <DropdownMenuItem icon={Folder}>Pinned projects</DropdownMenuItem>
                <DropdownMenuItem icon={Download}>Downloads</DropdownMenuItem>
              </HoverDropdown>
            </div>
          </CardBody>
        </Card>

        {/* Activity log */}
        <Card>
          <CardHeader
            title="Activity Log"
            description="Live log of dropdown item clicks across this page"
            action={<Badge tone="brand" variant="soft">{log.length}</Badge>}
          />
          <CardBody>
            <div className="max-h-64 space-y-2 overflow-y-auto pr-2">
              {log.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">Click any dropdown item to log it here.</p>
              ) : (
                log.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-xs dark:border-gray-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{entry}</span>
                  </div>
                ))
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
