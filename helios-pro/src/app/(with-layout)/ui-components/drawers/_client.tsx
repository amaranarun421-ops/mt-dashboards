"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Drawer } from "@/components/shared/drawer";
import { Avatar } from "@/components/shared/avatar";
import {
  DrawerIcon,
  CheckIcon,
  MailIcon,
  BellIcon,
  User,
  TagIcon,
  CalendarPlusIcon,
} from "@/components/Layouts/sidebar/icons";

export default function DrawersClient() {
  const [open, setOpen] = React.useState<string | null>(null);
  const close = () => setOpen(null);

  return (
    <>
      <PageHeader
        title="Drawers"
        description="Side panels for forms, details and quick edits — anchored left or right with optional header and footer."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/drawers" },
          { label: "Drawers" },
        ]}
        actions={
          <Badge variant="primary">
            <DrawerIcon className="size-3.5" /> Left & right
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Side & size variants"
            subtitle="Open drawers from either side at three widths."
          />
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setOpen("right-default")}>
              Right — default
            </Button>
            <Button variant="outline" onClick={() => setOpen("left-default")}>
              Left — default
            </Button>
            <Button variant="soft" onClick={() => setOpen("right-narrow")}>
              Right — narrow
            </Button>
            <Button variant="ghost" onClick={() => setOpen("right-wide")}>
              Right — wide
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader
              title="With header & footer"
              subtitle="Structured panel for actions and metadata."
            />
            <Button variant="primary" onClick={() => setOpen("structured")}>
              <BellIcon className="size-4" /> Notification settings
            </Button>
          </Card>

          <Card>
            <CardHeader
              title="Form drawer"
              subtitle="Edit a record without leaving the list."
            />
            <Button variant="accent" onClick={() => setOpen("form")}>
              <TagIcon className="size-4" /> Edit customer
            </Button>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Detail drawer"
            subtitle="Inspect a record with rich content on the side."
          />
          <Button variant="outline" onClick={() => setOpen("detail")}>
            <User className="size-4" /> View profile
          </Button>
        </Card>
      </div>

      {/* Right default */}
      <Drawer
        open={open === "right-default"}
        onClose={close}
        title="Right drawer"
        description="Anchored to the right edge with the default max-w-md width."
      >
        <p className="text-sm text-dark-5 dark:text-dark-6">
          Drawers are perfect for tasks that don&apos;t need a full modal — they
          keep context visible while letting the user focus on a single record
          or form.
        </p>
      </Drawer>

      {/* Left default */}
      <Drawer
        open={open === "left-default"}
        onClose={close}
        side="left"
        title="Left drawer"
        description="Anchored to the left edge — useful for navigation or filters."
      >
        <p className="text-sm text-dark-5 dark:text-dark-6">
          Use a left drawer when the panel relates to navigation or filtering
          the main content. Keep it narrow to avoid hiding too much.
        </p>
      </Drawer>

      {/* Narrow */}
      <Drawer
        open={open === "right-narrow"}
        onClose={close}
        title="Narrow drawer"
        width="max-w-sm"
      >
        <p className="text-sm text-dark-5 dark:text-dark-6">
          A narrow drawer (max-w-sm) works well for filters, quick toggles and
          single-column forms.
        </p>
      </Drawer>

      {/* Wide */}
      <Drawer
        open={open === "right-wide"}
        onClose={close}
        title="Wide drawer"
        width="max-w-2xl"
      >
        <p className="text-sm text-dark-5 dark:text-dark-6">
          A wide drawer (max-w-2xl) gives you room for two-column layouts,
          tables or split-pane details.
        </p>
      </Drawer>

      {/* Structured */}
      <Drawer
        open={open === "structured"}
        onClose={close}
        title="Notification preferences"
        description="Choose how and when Helios Pro can reach you."
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>
              <CheckIcon className="size-4" /> Save
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          {[
            { label: "Product updates", on: true },
            { label: "Security alerts", on: true },
            { label: "Weekly digest", on: false },
            { label: "Mentions and replies", on: true },
            { label: "Marketing emails", on: false },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 rounded-xl border border-stroke p-3 dark:border-dark-3"
            >
              <div>
                <p className="text-sm font-medium text-dark dark:text-white">
                  {row.label}
                </p>
                <p className="text-xs text-dark-5 dark:text-dark-6">
                  Delivered to your inbox
                </p>
              </div>
              <span
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
                  row.on ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"
                }`}
              >
                <span
                  className={`inline-block size-4 transform rounded-full bg-white shadow transition ${
                    row.on ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </span>
            </div>
          ))}
        </div>
      </Drawer>

      {/* Form drawer */}
      <Drawer
        open={open === "form"}
        onClose={close}
        title="Edit customer"
        description="Update Grace Whitfield's contact details."
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>
              <CheckIcon className="size-4" /> Save changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar name="Grace Whitfield" size="lg" />
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">
                Grace Whitfield
              </p>
              <p className="text-xs text-dark-5 dark:text-dark-6">
                Customer since 2022 · VIP segment
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-dark-5 dark:text-dark-6">
                Full name
              </label>
              <input
                type="text"
                defaultValue="Grace Whitfield"
                className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark-5 dark:text-dark-6">
                Email
              </label>
              <input
                type="email"
                defaultValue="grace@example.com"
                className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-dark-5 dark:text-dark-6">
                Segment
              </label>
              <select className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white">
                <option>VIP</option>
                <option>Loyal</option>
                <option>New</option>
                <option>At risk</option>
              </select>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Detail drawer */}
      <Drawer
        open={open === "detail"}
        onClose={close}
        title="Daniel Kim"
        description="Senior Frontend Engineer · Helios Pro"
        width="max-w-lg"
        footer={
          <Button onClick={close} className="w-full">
            <MailIcon className="size-4" /> Send message
          </Button>
        }
      >
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar name="Daniel Kim" size="xl" />
            <div>
              <p className="text-base font-semibold text-dark dark:text-white">
                Daniel Kim
              </p>
              <p className="text-sm text-dark-5 dark:text-dark-6">
                daniel.kim@heliospro.io
              </p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                San Francisco · Joined Mar 2021
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 border-t border-stroke pt-4 text-center dark:border-dark-3">
            <div>
              <p className="text-lg font-bold text-dark dark:text-white">42</p>
              <p className="text-xs text-dark-5 dark:text-dark-6">Projects</p>
            </div>
            <div>
              <p className="text-lg font-bold text-dark dark:text-white">98%</p>
              <p className="text-xs text-dark-5 dark:text-dark-6">On-time</p>
            </div>
            <div>
              <p className="text-lg font-bold text-dark dark:text-white">4.9</p>
              <p className="text-xs text-dark-5 dark:text-dark-6">Rating</p>
            </div>
          </div>
          <div className="rounded-xl border border-stroke p-3 dark:border-dark-3">
            <p className="text-xs font-semibold uppercase text-dark-5 dark:text-dark-6">
              Recent activity
            </p>
            <ul className="mt-2 space-y-2 text-sm text-dark-7 dark:text-dark-7">
              <li className="flex items-center gap-2">
                <CalendarPlusIcon className="size-4 text-primary" /> Shipped
                <span className="font-medium">Q3 onboarding flow</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="size-4 text-primary" /> Reviewed 6 PRs
                this week
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="size-4 text-primary" /> Posted in
                <span className="font-medium">#frontend</span>
              </li>
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
}
