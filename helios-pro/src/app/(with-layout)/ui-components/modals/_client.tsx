"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Modal } from "@/components/shared/modal";
import {
  ModalIcon,
  CheckIcon,
  XCircleIcon,
  AlertTriangleIcon,
  MailIcon,
  User,
  KeyIcon,
} from "@/components/Layouts/sidebar/icons";

export default function ModalsClient() {
  const [open, setOpen] = React.useState<string | null>(null);
  const close = () => setOpen(null);

  return (
    <>
      <PageHeader
        title="Modals"
        description="Overlay dialogs for focused interactions — five sizes, six patterns, all built on the shared Modal primitive."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/modals" },
          { label: "Modals" },
        ]}
        actions={
          <Badge variant="primary">
            <ModalIcon className="size-3.5" /> 4 sizes
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Basic & with header/footer"
            subtitle="A simple body-only modal versus a structured header/footer layout."
          />
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setOpen("basic")}>Open basic</Button>
            <Button variant="outline" onClick={() => setOpen("structured")}>
              Open with header & footer
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Sizes"
            subtitle="sm, md, lg and xl widths for different content density."
          />
          <div className="flex flex-wrap gap-3">
            <Button size="sm" onClick={() => setOpen("sm")}>
              Small
            </Button>
            <Button size="sm" variant="outline" onClick={() => setOpen("md")}>
              Medium
            </Button>
            <Button size="sm" variant="soft" onClick={() => setOpen("lg")}>
              Large
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setOpen("xl")}>
              Extra large
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader
              title="Confirmation modal"
              subtitle="Ask the user to confirm a non-destructive action."
            />
            <Button variant="primary" onClick={() => setOpen("confirm")}>
              <CheckIcon className="size-4" /> Publish report
            </Button>
          </Card>

          <Card>
            <CardHeader
              title="Danger modal"
              subtitle="Final confirmation for destructive actions."
            />
            <Button variant="danger" onClick={() => setOpen("danger")}>
              <XCircleIcon className="size-4" /> Delete workspace
            </Button>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Form modal"
            subtitle="Collect structured input without leaving the page."
          />
          <Button variant="accent" onClick={() => setOpen("form")}>
            <MailIcon className="size-4" /> Invite teammate
          </Button>
        </Card>
      </div>

      {/* Basic */}
      <Modal open={open === "basic"} onClose={close} size="sm">
        <p className="text-sm text-dark-5 dark:text-dark-6">
          This is a basic modal — no header, no footer. Use it for short
          confirmations or focused content where structure would feel heavy.
        </p>
        <div className="mt-4 flex justify-end">
          <Button size="sm" onClick={close}>
            Got it
          </Button>
        </div>
      </Modal>

      {/* Structured with header + footer */}
      <Modal
        open={open === "structured"}
        onClose={close}
        title="Upgrade to Helios Pro Business"
        description="Unlock unlimited workspaces, advanced analytics and SSO."
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Maybe later
            </Button>
            <Button onClick={close}>
              <CheckIcon className="size-4" /> Upgrade now
            </Button>
          </>
        }
      >
        <p className="text-sm text-dark-5 dark:text-dark-6">
          You are about to start a 14-day trial of the Business plan. No charge
          today — we will remind you 3 days before the trial ends.
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-dark-7 dark:text-dark-7">
          {[
            "Unlimited dashboards & reports",
            "SSO via SAML / OIDC",
            "Audit log retention: 90 days",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
                <CheckIcon className="size-3.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </Modal>

      {/* Sizes */}
      {(["sm", "md", "lg", "xl"] as const).map((s) => (
        <Modal
          key={s}
          open={open === s}
          onClose={close}
          size={s}
          title={`Modal size: ${s.toUpperCase()}`}
          description={`Max width class: ${
            { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" }[s]
          }`}
          footer={
            <Button size="sm" variant="outline" onClick={close}>
              Close
            </Button>
          }
        >
          <p className="text-sm text-dark-5 dark:text-dark-6">
            Use small modals for confirmations, medium for forms, large for
            multi-section content and extra-large for tables or rich previews.
          </p>
        </Modal>
      ))}

      {/* Confirmation */}
      <Modal
        open={open === "confirm"}
        onClose={close}
        title="Publish quarterly report?"
        description="The report will be visible to every member of your workspace."
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>
              <CheckIcon className="size-4" /> Publish
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3 rounded-xl bg-primary-subtle p-3 text-primary-dark dark:bg-primary/10 dark:text-primary-light">
          <AlertTriangleIcon className="size-5 shrink-0" />
          <p className="text-sm">
            Once published, recipients will be notified by email. You can still
            edit the report afterwards.
          </p>
        </div>
      </Modal>

      {/* Danger */}
      <Modal
        open={open === "danger"}
        onClose={close}
        title="Delete workspace?"
        description="This action cannot be undone."
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button variant="danger" onClick={close}>
              <XCircleIcon className="size-4" /> Delete forever
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3 rounded-xl border border-red/30 bg-red-light-5 p-3 text-red-dark dark:bg-red/10 dark:text-red-light">
          <XCircleIcon className="size-5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">
              All 14 dashboards, 218 reports and 6 data sources will be removed.
            </p>
            <p className="mt-1 opacity-90">
              Type the workspace name to confirm — this is your last chance to
              keep the data.
            </p>
          </div>
        </div>
      </Modal>

      {/* Form modal */}
      <Modal
        open={open === "form"}
        onClose={close}
        title="Invite a teammate"
        description="They will receive an email invitation to join this workspace."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>
              <MailIcon className="size-4" /> Send invite
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Full name
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-stroke bg-white px-3 py-2.5 dark:border-dark-3 dark:bg-dark-2">
              <User className="size-4 text-dark-5 dark:text-dark-6" />
              <input
                type="text"
                placeholder="Jordan Rivera"
                className="flex-1 bg-transparent text-sm text-dark outline-none placeholder:text-dark-6 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Email address
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-stroke bg-white px-3 py-2.5 dark:border-dark-3 dark:bg-dark-2">
              <MailIcon className="size-4 text-dark-5 dark:text-dark-6" />
              <input
                type="email"
                placeholder="jordan@heliospro.io"
                className="flex-1 bg-transparent text-sm text-dark outline-none placeholder:text-dark-6 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
              Role
            </label>
            <select className="w-full rounded-lg border border-stroke bg-white px-3 py-2.5 text-sm text-dark outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white">
              <option>Viewer</option>
              <option>Editor</option>
              <option>Admin</option>
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-stroke bg-gray-2 px-3 py-2.5 text-xs text-dark-5 dark:border-dark-3 dark:bg-white/5 dark:text-dark-6">
            <KeyIcon className="size-4" />
            Invited members count toward your plan&apos;s seat limit.
          </div>
        </div>
      </Modal>
    </>
  );
}
