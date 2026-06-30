import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import {
  StarIcon,
  XCircleIcon,
  AlertTriangleIcon,
  LockIcon,
  CheckIcon,
  FolderIcon,
  UploadIcon,
  BellIcon,
  MailIcon,
  RefreshCwIcon,
} from "@/components/Layouts/sidebar/icons";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      width="1em"
      height="1em"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Empty States",
  description:
    "Helios Pro — empty state component showcase: no data, no results, error, success, no permissions with action buttons in three sizes.",
};

export default function EmptyStatesPage() {
  return (
    <>
      <PageHeader
        title="Empty States"
        description="Six empty-state patterns in three sizes — guide users from a blank screen to their next action with consistent iconography and copy."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/empty-states" },
          { label: "Empty States" },
        ]}
        actions={
          <Badge variant="primary">
            <FolderIcon className="size-3.5" /> 6 patterns
          </Badge>
        }
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="No data" subtitle="A list or table with zero rows." />
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                title="No projects yet"
                description="Create your first project to start tracking tasks, files and conversations in one place."
                icon={<FolderIcon className="size-6" />}
                action={
                  <Button variant="primary" size="sm">
                    <PlusIcon className="size-4" /> New project
                  </Button>
                }
              />
            </div>
          </Card>

          <Card>
            <CardHeader
              title="No results"
              subtitle="Filters returned an empty result set."
            />
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                title="No matches found"
                description="Try adjusting your filters or search keywords to find what you're looking for."
                icon={<AlertTriangleIcon className="size-6" />}
                action={
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Clear filters
                    </Button>
                    <Button variant="primary" size="sm">
                      Search again
                    </Button>
                  </div>
                }
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Error" subtitle="Something went wrong loading data." />
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                title="Couldn't load report"
                description="The server returned a 500 error. Try again in a moment, or contact support if it persists."
                icon={<XCircleIcon className="size-6" />}
                action={
                  <Button variant="primary" size="sm">
                    <RefreshCwIcon className="size-4" /> Retry
                  </Button>
                }
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Success" subtitle="Completed state with a celebratory icon." />
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                title="Inbox zero — nicely done"
                description="You've cleared every unread email. New messages will appear here as they arrive."
                icon={<CheckIcon className="size-6" />}
                action={
                  <Button variant="soft" size="sm">
                    <BellIcon className="size-4" /> Notification settings
                  </Button>
                }
              />
            </div>
          </Card>

          <Card>
            <CardHeader
              title="No permissions"
              subtitle="Locked state when the user lacks access."
            />
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                title="You don't have access"
                description="This workspace requires the Admin role. Ask a workspace owner to invite you with elevated permissions."
                icon={<LockIcon className="size-6" />}
                action={
                  <Button variant="primary" size="sm">
                    Request access
                  </Button>
                }
              />
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Nothing to upload"
              subtitle="Drag-and-drop zone before any files are added."
            />
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                title="Drop files here"
                description="Drag and drop up to 20 files at once, or click below to browse. Max 50 MB per file."
                icon={<UploadIcon className="size-6" />}
                action={
                  <Button variant="outline" size="sm">
                    <UploadIcon className="size-4" /> Browse files
                  </Button>
                }
              />
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Sizes"
            subtitle="Small, medium and large for tight table cells vs. full-page empty states."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                size="sm"
                title="No notifications"
                description="You're all caught up."
                icon={<BellIcon className="size-5" />}
              />
            </div>
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                size="md"
                title="No notifications"
                description="You're all caught up for today. New activity will appear here."
                icon={<BellIcon className="size-6" />}
              />
            </div>
            <div className="rounded-xl border border-stroke dark:border-dark-3">
              <EmptyState
                size="lg"
                title="No notifications"
                description="You're all caught up. We'll let you know the moment something needs your attention."
                icon={<BellIcon className="size-8" />}
                action={<Button variant="primary" size="sm">View settings</Button>}
              />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Realistic table shell"
            subtitle="Keep the header row visible so users see what would have been there."
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stroke text-left text-xs uppercase text-dark-5 dark:border-dark-3 dark:text-dark-6">
                  <th className="py-2 pr-4 font-medium">Starred item</th>
                  <th className="py-2 pr-4 font-medium">Owner</th>
                  <th className="py-2 pr-4 font-medium">Added</th>
                  <th className="py-2 font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="p-0">
                    <EmptyState
                      title="No starred items"
                      description="Star important files, tasks and conversations to find them quickly later."
                      icon={<StarIcon className="size-6" />}
                      action={
                        <Button variant="primary" size="sm">
                          <MailIcon className="size-4" /> Browse inbox
                        </Button>
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
