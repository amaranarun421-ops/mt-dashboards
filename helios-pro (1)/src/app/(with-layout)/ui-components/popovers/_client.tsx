"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Popover } from "@/components/shared/tooltip";
import {
  PopoverIcon,
  EditIcon,
  CheckSquareIcon,
  UploadIcon,
  MailIcon,
  BellIcon,
  User,
  ChevronRight,
  FileTextIcon,
  TagIcon,
} from "@/components/Layouts/sidebar/icons";

function Action({ icon, label }: { icon?: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-dark-7 transition hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
    >
      {icon && <span className="text-dark-5 dark:text-dark-6">{icon}</span>}
      {label}
    </button>
  );
}

function Divider() {
  return <div className="my-1 h-px bg-stroke dark:bg-dark-3" />;
}

export default function PopoversClient() {
  return (
    <>
      <PageHeader
        title="Popovers"
        description="Floating panels anchored to a trigger — basic content, headers, actions, alignment and menu-style popovers."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/popovers" },
          { label: "Popovers" },
        ]}
        actions={
          <Badge variant="primary">
            <PopoverIcon className="size-3.5" /> 3 alignments
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader title="Basic popover" subtitle="Click the trigger to toggle." />
          <Popover
            trigger={<Button variant="outline">Open popover</Button>}
          >
            <div className="w-56">
              <p className="text-sm font-semibold text-dark dark:text-white">
                Quick info
              </p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                Popovers are great for inline help, micro-forms and contextual
                menus that don&apos;t deserve a full modal.
              </p>
            </div>
          </Popover>
        </Card>

        <Card>
          <CardHeader
            title="With header"
            subtitle="A titled popover with avatar and metadata."
          />
          <Popover
            trigger={
              <Button variant="primary">
                <User className="size-4" /> View user
              </Button>
            }
          >
            <div className="w-64">
              <div className="flex items-center gap-3">
                <Avatar name="Sofia Marquez" size="md" />
                <div>
                  <p className="text-sm font-semibold text-dark dark:text-white">
                    Sofia Marquez
                  </p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">
                    Senior Designer · 6y tenure
                  </p>
                </div>
              </div>
              <Divider />
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-bold text-dark dark:text-white">
                    128
                  </p>
                  <p className="text-[10px] text-dark-5 dark:text-dark-6">
                    Projects
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-dark dark:text-white">
                    4.9
                  </p>
                  <p className="text-[10px] text-dark-5 dark:text-dark-6">
                    Rating
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-dark dark:text-white">
                    98%
                  </p>
                  <p className="text-[10px] text-dark-5 dark:text-dark-6">
                    On-time
                  </p>
                </div>
              </div>
            </div>
          </Popover>
        </Card>

        <Card>
          <CardHeader
            title="With actions"
            subtitle="Actionable footer that closes on click."
          />
          <div className="flex flex-wrap gap-3">
            <Popover
              trigger={<Button variant="accent">Card actions</Button>}
            >
              {(close) => (
                <div className="w-48">
                  <Action
                    icon={<EditIcon className="size-4" />}
                    label="Edit card"
                  />
                  <Action
                    icon={<CheckSquareIcon className="size-4" />}
                    label="Mark done"
                  />
                  <Action
                    icon={<UploadIcon className="size-4" />}
                    label="Export PNG"
                  />
                  <Divider />
                  <Action
                    icon={<MailIcon className="size-4" />}
                    label="Share link"
                  />
                  <button
                    onClick={close}
                    className="mt-2 w-full rounded-lg bg-primary px-2.5 py-1.5 text-sm font-medium text-white"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </Popover>

            <Popover
              trigger={<Button variant="outline">Quick edit</Button>}
            >
              {(close) => (
                <div className="w-60">
                  <p className="mb-2 text-sm font-semibold text-dark dark:text-white">
                    Rename workspace
                  </p>
                  <input
                    autoFocus
                    type="text"
                    defaultValue="Helios Pro HQ"
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                  />
                  <div className="mt-3 flex justify-end gap-2">
                    <Button size="sm" variant="ghost" onClick={close}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={close}>
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </Popover>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Aligned popovers"
            subtitle="Anchor start, center or end relative to the trigger."
          />
          <div className="flex flex-wrap items-center justify-around gap-8">
            <Popover
              align="start"
              trigger={<Button variant="outline">Start</Button>}
            >
              <div className="w-40">
                <Action label="Aligned to start" />
                <Action label="Second item" />
                <Action label="Third item" />
              </div>
            </Popover>
            <Popover
              align="center"
              trigger={<Button variant="outline">Center</Button>}
            >
              <div className="w-40">
                <Action label="Aligned to center" />
                <Action label="Second item" />
                <Action label="Third item" />
              </div>
            </Popover>
            <Popover
              align="end"
              trigger={<Button variant="outline">End</Button>}
            >
              <div className="w-40">
                <Action label="Aligned to end" />
                <Action label="Second item" />
                <Action label="Third item" />
              </div>
            </Popover>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Menu popover"
            subtitle="A denser, menu-only variant with dividers and shortcuts."
          />
          <div className="flex flex-wrap gap-4">
            <Popover
              trigger={
                <Button variant="primary">
                  File <ChevronRight className="size-4 rotate-90" />
                </Button>
              }
            >
              {(close) => (
                <div className="w-52">
                  <Action
                    icon={<FileTextIcon className="size-4" />}
                    label="New document"
                  />
                  <Action
                    icon={<TagIcon className="size-4" />}
                    label="Rename"
                  />
                  <Action
                    icon={<UploadIcon className="size-4" />}
                    label="Upload version"
                  />
                  <Divider />
                  <Action
                    icon={<MailIcon className="size-4" />}
                    label="Share"
                  />
                  <Action
                    icon={<BellIcon className="size-4" />}
                    label="Subscribe"
                  />
                  <button
                    onClick={close}
                    className="mt-2 w-full rounded-lg bg-gray-2 px-2.5 py-1.5 text-center text-xs font-medium text-dark-5 dark:bg-white/5 dark:text-dark-6"
                  >
                    Click any item to dismiss
                  </button>
                </div>
              )}
            </Popover>

            <Popover
              trigger={
                <Button variant="outline">
                  Row actions <ChevronRight className="size-4 rotate-90" />
                </Button>
              }
            >
              {(close) => (
                <div className="w-48">
                  <Action
                    icon={<EditIcon className="size-4" />}
                    label="Edit row"
                  />
                  <Action
                    icon={<CheckSquareIcon className="size-4" />}
                    label="Duplicate"
                  />
                  <Action
                    icon={<UploadIcon className="size-4" />}
                    label="Export"
                  />
                  <Divider />
                  <button
                    onClick={close}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm text-red transition hover:bg-red-light-5 dark:hover:bg-red/15"
                  >
                    Delete row
                  </button>
                </div>
              )}
            </Popover>
          </div>
        </Card>
      </div>
    </>
  );
}
