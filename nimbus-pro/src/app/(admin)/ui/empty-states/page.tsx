"use client";
import { PageHeader, Card, CardHeader, CardBody, EmptyState, Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Inbox,
  SearchX,
  MessageSquareOff,
  BellOff,
  AlertTriangle,
  Wrench,
  Rocket,
  FileQuestion,
  FolderPlus,
  Mail,
  RefreshCw,
  Settings,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

type Tone = "brand" | "success" | "warning" | "error" | "purple" | "orange" | "gray";

const TONE_ICON_BG: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

/* ---------- Custom empty state shell ---------- */
function CustomEmpty({
  icon: Icon,
  tone = "gray",
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone?: Tone;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", TONE_ICON_BG[tone])}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
        {description && <p className="mx-auto max-w-sm text-xs text-gray-500 dark:text-gray-400">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function EmptyStatesPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Empty States"
        description="What users see when there's nothing to show — eight variations covering no data, no results, no messages, errors, maintenance, and coming soon."
        breadcrumbs={[{ label: "UI Components" }, { label: "Empty States" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {/* 1. No data */}
        <Card>
          <CardHeader title="No Data" description="First-time use — invite the user to create" />
          <CardBody>
            <EmptyState
              icon={Inbox}
              title="No projects yet"
              description="Get started by creating your first project. We'll walk you through the setup."
              action={
                <Button size="sm" variant="primary">
                  <FolderPlus className="h-3.5 w-3.5" /> New project
                </Button>
              }
            />
          </CardBody>
        </Card>

        {/* 2. No search results */}
        <Card>
          <CardHeader title="No Search Results" description="Filters returned nothing" />
          <CardBody>
            <CustomEmpty
              icon={SearchX}
              tone="gray"
              title="No matching results"
              description="Try adjusting your search or filters to find what you're looking for."
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" variant="secondary">
                  <RefreshCw className="h-3.5 w-3.5" /> Clear filters
                </Button>
                <Button size="sm" variant="ghost">Search tips</Button>
              </div>
            </CustomEmpty>
          </CardBody>
        </Card>

        {/* 3. No messages */}
        <Card>
          <CardHeader title="No Messages" description="Inbox with zero conversations" />
          <CardBody>
            <CustomEmpty
              icon={MessageSquareOff}
              tone="brand"
              title="Your inbox is empty"
              description="When teammates message you, conversations will appear here."
            >
              <Button size="sm" variant="outline">
                <Mail className="h-3.5 w-3.5" /> Start a conversation
              </Button>
            </CustomEmpty>
          </CardBody>
        </Card>

        {/* 4. No notifications */}
        <Card>
          <CardHeader title="No Notifications" description="All caught up" />
          <CardBody>
            <CustomEmpty
              icon={BellOff}
              tone="success"
              title="You're all caught up"
              description="No new notifications. We'll let you know when something happens."
            >
              <Badge tone="success" variant="soft" dot>
                Inbox zero
              </Badge>
            </CustomEmpty>
          </CardBody>
        </Card>

        {/* 5. Error state */}
        <Card>
          <CardHeader title="Error State" description="Something went wrong — offer recovery" />
          <CardBody>
            <CustomEmpty
              icon={AlertTriangle}
              tone="error"
              title="Failed to load data"
              description="We couldn't fetch your dashboard. Check your connection and try again."
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" variant="primary">
                  <RefreshCw className="h-3.5 w-3.5" /> Retry
                </Button>
                <Button size="sm" variant="ghost">Contact support</Button>
              </div>
            </CustomEmpty>
          </CardBody>
        </Card>

        {/* 6. Maintenance */}
        <Card>
          <CardHeader title="Maintenance" description="Temporarily unavailable" />
          <CardBody>
            <CustomEmpty
              icon={Wrench}
              tone="warning"
              title="Under maintenance"
              description="We're performing scheduled upgrades. Nimbus Pro will be back by 14:00 UTC."
            >
              <div className="flex items-center gap-2 rounded-lg bg-warning-50 px-3 py-1.5 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-400">
                <Clock className="h-3.5 w-3.5" /> ETA: 35 minutes
              </div>
            </CustomEmpty>
          </CardBody>
        </Card>

        {/* 7. Coming soon */}
        <Card>
          <CardHeader title="Coming Soon" description="Feature not shipped yet" />
          <CardBody>
            <CustomEmpty
              icon={Rocket}
              tone="purple"
              title="AI insights — coming soon"
              description="We're putting the finishing touches on automated trend detection. Subscribe to be notified at launch."
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" variant="primary">
                  <BellOff className="h-3.5 w-3.5" /> Notify me
                </Button>
                <Badge tone="purple" variant="soft">Q2 2025</Badge>
              </div>
            </CustomEmpty>
          </CardBody>
        </Card>

        {/* 8. 404 / not found */}
        <Card>
          <CardHeader title="404 Not Found" description="Page or resource missing" />
          <CardBody>
            <CustomEmpty
              icon={FileQuestion}
              tone="orange"
              title="Page not found"
              description="The page you're looking for doesn't exist or may have been moved."
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button size="sm" variant="secondary">
                  <ArrowRight className="h-3.5 w-3.5" /> Back to dashboard
                </Button>
                <Button size="sm" variant="ghost">Report issue</Button>
              </div>
            </CustomEmpty>
          </CardBody>
        </Card>

        {/* 9. Success / completed */}
        <Card>
          <CardHeader title="All Done" description="Empty because everything's finished" />
          <CardBody>
            <CustomEmpty
              icon={CheckCircle2}
              tone="success"
              title="Inbox zero achieved"
              description="You've handled every task. Take a breath — you're all caught up."
            >
              <Button size="sm" variant="ghost">
                <Settings className="h-3.5 w-3.5" /> Notification settings
              </Button>
            </CustomEmpty>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader title="Anatomy & Tips" description="Anatomy of an empty state" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Icon</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">A 56px rounded square with a tone-tinted background. Sets the mood — playful, neutral, or alarming.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Title + description</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Be specific about why it&apos;s empty and what to do next. Avoid generic &quot;No items&quot; copy.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Primary CTA</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">One clear action — &quot;Create&quot;, &quot;Retry&quot;, &quot;Notify me&quot;. Skip the CTA if there&apos;s truly nothing to do.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Secondary action</p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">A ghost button — &quot;Learn more&quot;, &quot;Search tips&quot;, &quot;Contact support&quot;. Optional.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
