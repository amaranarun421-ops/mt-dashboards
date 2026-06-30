import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import {
  BadgeIcon,
  CheckIcon,
  BellIcon,
  StarIcon,
  XCircleIcon,
} from "@/components/Layouts/sidebar/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badges",
  description:
    "Helios Pro — badge component showcase: all variants, sizes, icons, dots, removable and count badges.",
};

const variants: Array<{
  name: string;
  variant: React.ComponentProps<typeof Badge>["variant"];
}> = [
  { name: "Neutral", variant: "neutral" },
  { name: "Primary", variant: "primary" },
  { name: "Accent", variant: "accent" },
  { name: "Success", variant: "success" },
  { name: "Warning", variant: "warning" },
  { name: "Danger", variant: "danger" },
  { name: "Info", variant: "info" },
  { name: "Violet", variant: "violet" },
  { name: "Outline", variant: "outline" },
];

export default function BadgesPage() {
  return (
    <>
      <PageHeader
        title="Badges"
        description="Compact status labels in nine tones and three sizes for tables, cards and navigation."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/badges" },
          { label: "Badges" },
        ]}
        actions={
          <Badge variant="primary">
            <BadgeIcon className="size-3.5" /> 9 variants
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader title="Variants" subtitle="All nine badge tones." />
          <div className="flex flex-wrap gap-2.5">
            {variants.map((v) => (
              <Badge key={v.name} variant={v.variant}>
                {v.name}
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Sizes"
            subtitle="Small, medium and large badges."
          />
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-dark-5 dark:text-dark-6">
                Small
              </span>
              <Badge variant="primary" size="sm">
                New
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-dark-5 dark:text-dark-6">
                Medium
              </span>
              <Badge variant="accent" size="md">
                Featured
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-dark-5 dark:text-dark-6">
                Large
              </span>
              <Badge variant="violet" size="lg">
                Premium
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="With icons"
            subtitle="Lead icons reinforce status at a glance."
          />
          <div className="flex flex-wrap gap-2.5">
            <Badge variant="success">
              <CheckIcon className="size-3.5" /> Approved
            </Badge>
            <Badge variant="info">
              <BellIcon className="size-3.5" /> 3 new
            </Badge>
            <Badge variant="warning">
              <StarIcon className="size-3.5" /> Featured
            </Badge>
            <Badge variant="danger">
              <XCircleIcon className="size-3.5" /> Rejected
            </Badge>
            <Badge variant="primary">
              <CheckIcon className="size-3.5" /> Verified
            </Badge>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Dot indicators"
            subtitle="Solid dots for live status signals."
          />
          <div className="flex flex-wrap gap-3">
            {variants.slice(0, 6).map((v) => (
              <span
                key={v.name}
                className="inline-flex items-center gap-2 text-sm text-dark-7 dark:text-dark-7"
              >
                <Badge variant={v.variant} size="sm">
                  <span className="size-1.5 rounded-full bg-current" />
                </Badge>
                <span>{v.name}</span>
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Count badges"
            subtitle="Numeric overlays on avatars and icons."
          />
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <span className="relative inline-flex">
                <Avatar name="Aarav Sharma" size="lg" />
                <span className="absolute -right-1 -top-1 inline-flex min-w-[20px] items-center justify-center rounded-full bg-red px-1.5 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-dark">
                  9
                </span>
              </span>
              <span className="text-xs text-dark-5 dark:text-dark-6">
                Notifications
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="relative inline-flex">
                <span className="grid size-12 place-items-center rounded-full bg-gray-2 text-dark-5 dark:bg-white/5 dark:text-dark-6">
                  <BellIcon className="size-5" />
                </span>
                <span className="absolute -right-1 -top-1 inline-flex min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-dark">
                  24
                </span>
              </span>
              <span className="text-xs text-dark-5 dark:text-dark-6">Inbox</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="relative inline-flex">
                <span className="grid size-12 place-items-center rounded-full bg-accent/15 text-accent-dark dark:text-accent-light">
                  <StarIcon className="size-5" />
                </span>
                <span className="absolute -right-1 -top-1 inline-flex min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-dark">
                  99+
                </span>
              </span>
              <span className="text-xs text-dark-5 dark:text-dark-6">
                Favorites
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Removable badges"
            subtitle="Tag-like chips with a dismiss affordance."
          />
          <div className="flex flex-wrap gap-2.5">
            {["Design", "Engineering", "Marketing", "Product", "Sales"].map(
              (tag, i) => (
                <Badge
                  key={tag}
                  variant={i % 2 === 0 ? "primary" : "outline"}
                  className="gap-1.5 pr-1.5"
                >
                  {tag}
                  <button
                    type="button"
                    aria-label={`Remove ${tag}`}
                    className="grid size-4 place-items-center rounded-full bg-current/10 hover:bg-current/20"
                  >
                    <svg
                      width={9}
                      height={9}
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-current"
                    >
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </Badge>
              ),
            )}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Status table"
            subtitle="Realistic badge use inside a row."
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stroke text-left text-xs uppercase text-dark-5 dark:border-dark-3 dark:text-dark-6">
                  <th className="py-2 pr-4 font-medium">Order</th>
                  <th className="py-2 pr-4 font-medium">Customer</th>
                  <th className="py-2 pr-4 font-medium">Payment</th>
                  <th className="py-2 pr-4 font-medium">Fulfillment</th>
                  <th className="py-2 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stroke dark:divide-dark-3">
                <tr>
                  <td className="py-3 pr-4 font-medium text-dark dark:text-white">
                    #HLP-2041
                  </td>
                  <td className="py-3 pr-4 text-dark-7 dark:text-dark-7">
                    Grace Whitfield
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="success" size="sm">
                      Paid
                    </Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="info" size="sm">
                      Shipped
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="neutral" size="sm">
                      Low
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-dark dark:text-white">
                    #HLP-2042
                  </td>
                  <td className="py-3 pr-4 text-dark-7 dark:text-dark-7">
                    Henrik Olsen
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="warning" size="sm">
                      Pending
                    </Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="neutral" size="sm">
                      Queued
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="warning" size="sm">
                      Medium
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-dark dark:text-white">
                    #HLP-2043
                  </td>
                  <td className="py-3 pr-4 text-dark-7 dark:text-dark-7">
                    Mei Tanaka
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="danger" size="sm">
                      Refunded
                    </Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="danger" size="sm">
                      Cancelled
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="danger" size="sm">
                      High
                    </Badge>
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
