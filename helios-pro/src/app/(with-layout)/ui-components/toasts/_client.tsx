"use client";

import * as React from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import {
  ToastIcon,
  CheckIcon,
  XCircleIcon,
  AlertTriangleIcon,
  BellIcon,
  UploadIcon,
  RefreshCwIcon,
  StarIcon,
} from "@/components/Layouts/sidebar/icons";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ToastsClient() {
  const [customOpen, setCustomOpen] = React.useState(false);

  return (
    <>
      <PageHeader
        title="Toasts"
        description="Eight call patterns backed by sonner — every trigger on this page produces a real toast in the bottom-right corner."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/toasts" },
          { label: "Toasts" },
        ]}
        actions={
          <Badge variant="primary">
            <ToastIcon className="size-3.5" /> 8 patterns
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Basic tones"
            subtitle="The four core tones — fire one of each to see positioning and rich colors."
          />
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => toast.success("Saved successfully!")}
            >
              <CheckIcon className="size-4" /> toast.success
            </Button>
            <Button
              variant="danger"
              onClick={() => toast.error("Could not save the record.")}
            >
              <XCircleIcon className="size-4" /> toast.error
            </Button>
            <Button
              variant="accent"
              onClick={() => toast.warning("Your trial expires in 3 days.")}
            >
              <AlertTriangleIcon className="size-4" /> toast.warning
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("A new version of Helios Pro is available.")}
            >
              <BellIcon className="size-4" /> toast.info
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="With descriptions"
            subtitle="Pass a second argument or an options object to add body copy."
          />
          <div className="flex flex-wrap gap-3">
            <Button
              variant="soft"
              onClick={() =>
                toast.success("Payment received", {
                  description: "We charged $480.00 to your Visa ending in 4242.",
                })
              }
            >
              <CheckIcon className="size-4" /> Success + description
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error("Build failed", {
                  description: "Commit a3f9c1 failed the test stage in CI.",
                })
              }
            >
              <XCircleIcon className="size-4" /> Error + description
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                toast.info("Scheduled maintenance", {
                  description: "Helios Pro will be read-only on Sat 02:00–02:30 UTC.",
                })
              }
            >
              <BellIcon className="size-4" /> Info + description
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Loading toast"
            subtitle="Persistent spinner until explicitly resolved or rejected."
          />
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={async () => {
                const id = toast.loading("Uploading report.pdf…");
                await delay(2200);
                toast.success("Upload complete", { id });
              }}
            >
              <UploadIcon className="size-4" /> Resolve as success
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                const id = toast.loading("Connecting to server…");
                await delay(1800);
                toast.error("Connection timed out", { id });
              }}
            >
              <XCircleIcon className="size-4" /> Resolve as error
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Promise toast"
            subtitle="One call handles loading, success and error transitions automatically."
          />
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() =>
                toast.promise(delay(1800), {
                  loading: "Importing 1,204 records…",
                  success: "Imported 1,204 records successfully.",
                  error: "Import failed at row 412.",
                })
              }
            >
              <RefreshCwIcon className="size-4" /> Successful promise
            </Button>
            <Button
              variant="danger"
              onClick={() =>
                toast.promise(
                  new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("network")), 1600),
                  ),
                  {
                    loading: "Syncing workspace…",
                    success: "Workspace synced.",
                    error: "Sync failed — check your connection.",
                  },
                )
              }
            >
              <XCircleIcon className="size-4" /> Failing promise
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Action toast"
            subtitle="Inline action button — great for Undo and View flows."
          />
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                toast("Email moved to Trash", {
                  action: {
                    label: "Undo",
                    onClick: () => toast.success("Email restored to Inbox"),
                  },
                })
              }
            >
              <RefreshCwIcon className="size-4" /> Undoable delete
            </Button>
            <Button
              variant="soft"
              onClick={() =>
                toast.success("Report generated", {
                  description: "Q3-finance.pdf is ready to download.",
                  action: {
                    label: "Download",
                    onClick: () => toast.success("Download started"),
                  },
                })
              }
            >
              <CheckIcon className="size-4" /> With download action
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Custom toast"
            subtitle="Pass arbitrary JSX for branded or richly designed toasts."
          />
          <div className="flex flex-wrap gap-3">
            <Button
              variant="accent"
              onClick={() =>
                toast.custom(
                  () => (
                    <div className="flex w-[356px] items-start gap-3 rounded-xl border border-accent/30 bg-white p-4 shadow-3 dark:border-accent/30 dark:bg-gray-dark">
                      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-white">
                        <StarIcon className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-dark dark:text-white">
                          You earned a Helios badge
                        </p>
                        <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                          Power User — completed 50 actions this week.
                        </p>
                      </div>
                    </div>
                  ),
                  { duration: 4000 },
                )
              }
            >
              <StarIcon className="size-4" /> Show custom toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.dismiss()}
            >
              <XCircleIcon className="size-4" /> Dismiss all
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setCustomOpen((v) => !v);
                toast("Toast rendered with richColors and closeButton.", {
                  duration: 8000,
                });
              }}
            >
              <BellIcon className="size-4" /> Long-duration toast
            </Button>
          </div>
          {customOpen && (
            <p className="mt-3 text-xs text-dark-5 dark:text-dark-6">
              The global Toaster (set in <code>src/app/layout.tsx</code>) is configured with{" "}
              <code>position=&quot;bottom-right&quot;</code>, <code>richColors</code>,{" "}
              <code>closeButton</code> and a 5s default duration.
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
