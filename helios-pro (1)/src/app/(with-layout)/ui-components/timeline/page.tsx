import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Timeline } from "@/components/shared/timeline";
import {
  TimelineIcon,
  CheckIcon,
  UploadIcon,
  EditIcon,
  AlertTriangleIcon,
  XCircleIcon,
  BellIcon,
  StarIcon,
  RefreshCwIcon,
  CheckSquareIcon,
  MailIcon,
  UserPlusIcon,
} from "@/components/Layouts/sidebar/icons";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Helios Pro — timeline component showcase: vertical, horizontal, with icons, tones, descriptions and compact variants.",
};

const verticalEvents = [
  {
    title: "Order placed",
    description: "Grace Whitfield ordered 3 items for $480.00.",
    time: "10:24 AM",
    tone: "primary" as const,
    icon: <CheckSquareIcon className="size-4" />,
  },
  {
    title: "Payment captured",
    description: "Stripe charge succeeded — ch_1Q8xY2k9Jt.",
    time: "10:25 AM",
    tone: "success" as const,
    icon: <CheckIcon className="size-4" />,
  },
  {
    title: "Warehouse picked",
    description: "Items packed by Aarav at the Mumbai DC.",
    time: "11:02 AM",
    tone: "info" as const,
    icon: <UploadIcon className="size-4" />,
  },
  {
    title: "Shipment delayed",
    description: "Carrier flagged a 24-hour delay due to weather.",
    time: "02:48 PM",
    tone: "accent" as const,
    icon: <AlertTriangleIcon className="size-4" />,
  },
  {
    title: "Out for delivery",
    description: "On the courier's van — ETA 6:00 PM.",
    time: "04:15 PM",
    tone: "violet" as const,
    icon: <RefreshCwIcon className="size-4" />,
  },
];

const horizontalEvents = [
  {
    title: "Submitted",
    description: "Application received",
    time: "Mon",
    tone: "success" as const,
    icon: <CheckIcon className="size-4" />,
  },
  {
    title: "Screening",
    description: "Background check",
    time: "Tue",
    tone: "info" as const,
    icon: <BellIcon className="size-4" />,
  },
  {
    title: "Interview",
    description: "Two panels scheduled",
    time: "Wed",
    tone: "primary" as const,
    icon: <UserPlusIcon className="size-4" />,
  },
  {
    title: "Decision",
    description: "Hiring committee vote",
    time: "Thu",
    tone: "accent" as const,
    icon: <StarIcon className="size-4" />,
  },
  {
    title: "Offer",
    description: "Pending offer letter",
    time: "Fri",
    tone: "violet" as const,
    icon: <MailIcon className="size-4" />,
  },
];

const compactEvents = [
  { title: "Synced 1,204 records", time: "2m ago", tone: "success" as const, icon: <CheckIcon className="size-3.5" /> },
  { title: "Webhook delivered", time: "8m ago", tone: "primary" as const, icon: <CheckSquareIcon className="size-3.5" /> },
  { title: "Cache invalidated", time: "14m ago", tone: "info" as const, icon: <RefreshCwIcon className="size-3.5" /> },
  { title: "Rate limit at 80%", time: "26m ago", tone: "accent" as const, icon: <AlertTriangleIcon className="size-3.5" /> },
  { title: "Login from new device", time: "41m ago", tone: "violet" as const, icon: <BellIcon className="size-3.5" /> },
  { title: "Build passed on main", time: "1h ago", tone: "success" as const, icon: <CheckIcon className="size-3.5" /> },
];

const releaseEvents = [
  { title: "v2.4.0", description: "Dark-mode polish, 30% faster queries.", time: "Today", tone: "primary" as const, icon: <CheckIcon className="size-4" /> },
  { title: "v2.3.2", description: "Hotfix for CSV export crash.", time: "5 days ago", tone: "info" as const, icon: <EditIcon className="size-4" /> },
  { title: "v2.3.1", description: "Patch for SSO redirect loop.", time: "2 weeks ago", tone: "info" as const, icon: <EditIcon className="size-4" /> },
  { title: "v2.3.0", description: "New Logistics dashboard, Kanban enhancements.", time: "1 month ago", tone: "success" as const, icon: <CheckIcon className="size-4" /> },
  { title: "v2.2.0", description: "Reverted — caused sidebar layout regression.", time: "6 weeks ago", tone: "danger" as const, icon: <XCircleIcon className="size-4" /> },
];

export default function TimelinePage() {
  return (
    <>
      <PageHeader
        title="Timeline"
        description="Five timeline patterns — vertical, horizontal, with icons, with tones and a compact activity strip — all powered by the shared Timeline component."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/timeline" },
          { label: "Timeline" },
        ]}
        actions={
          <Badge variant="primary">
            <TimelineIcon className="size-3.5" /> 5 variants
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Vertical timeline"
            subtitle="Default orientation — order lifecycle with icons and descriptions."
          />
          <Timeline events={verticalEvents} />
        </Card>

        <Card>
          <CardHeader
            title="Horizontal timeline"
            subtitle="Recruiting pipeline laid out left-to-right with connector lines."
          />
          <Timeline events={horizontalEvents} vertical={false} />
        </Card>

        <Card>
          <CardHeader
            title="With tones"
            subtitle="Every event tone in the system — primary, accent, violet, info, success, danger, rose."
          />
          <Timeline
            events={[
              { title: "Primary tone", description: "Default brand color.", time: "Now", tone: "primary", icon: <CheckIcon className="size-4" /> },
              { title: "Accent tone", description: "Amber — used for warnings.", time: "Now", tone: "accent", icon: <StarIcon className="size-4" /> },
              { title: "Violet tone", description: "Special or premium events.", time: "Now", tone: "violet", icon: <StarIcon className="size-4" /> },
              { title: "Info tone", description: "Informational updates.", time: "Now", tone: "info", icon: <BellIcon className="size-4" /> },
              { title: "Success tone", description: "Completed and confirmed.", time: "Now", tone: "success", icon: <CheckIcon className="size-4" /> },
              { title: "Danger tone", description: "Failures and rollbacks.", time: "Now", tone: "danger", icon: <XCircleIcon className="size-4" /> },
              { title: "Rose tone", description: "Critical or destructive.", time: "Now", tone: "rose", icon: <AlertTriangleIcon className="size-4" /> },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="Compact activity strip"
            subtitle="Small icons, tight spacing — for dashboards and notification panels."
          />
          <Timeline events={compactEvents} className="max-w-md" />
        </Card>

        <Card>
          <CardHeader
            title="Release history"
            subtitle="Long-form descriptions for changelogs and version pages."
          />
          <Timeline events={releaseEvents} />
        </Card>
      </div>
    </>
  );
}
