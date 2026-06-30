"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import {
  BtnIcon,
  MailIcon,
  CheckSquareIcon,
  UploadIcon,
  EditIcon,
  StarIcon,
  RefreshCwIcon,
  ChevronRight,
} from "@/components/Layouts/sidebar/icons";

const variants: Array<{
  name: string;
  variant: React.ComponentProps<typeof Button>["variant"];
}> = [
  { name: "Primary", variant: "primary" },
  { name: "Accent", variant: "accent" },
  { name: "Outline", variant: "outline" },
  { name: "Ghost", variant: "ghost" },
  { name: "Soft", variant: "soft" },
  { name: "Danger", variant: "danger" },
  { name: "Subtle", variant: "subtle" },
];

const sizes: Array<{
  name: string;
  size: React.ComponentProps<typeof Button>["size"];
}> = [
  { name: "Small", size: "sm" },
  { name: "Medium", size: "md" },
  { name: "Large", size: "lg" },
];

export default function ButtonsClient() {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <>
      <PageHeader
        title="Buttons"
        description="Trigger actions with Helios Pro's seven button variants, four sizes and full state support."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/buttons" },
          { label: "Buttons" },
        ]}
        actions={
          <Badge variant="primary">
            <BtnIcon className="size-3.5" /> 7 variants
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader title="Variants" subtitle="All seven button styles." />
          <div className="flex flex-wrap gap-3">
            {variants.map((v) => (
              <Button key={v.name} variant={v.variant}>
                {v.name}
              </Button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Sizes" subtitle="sm, md, lg plus icon-only." />
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((s) => (
              <Button key={s.name} size={s.size}>
                {s.name}
              </Button>
            ))}
            <Button size="icon" aria-label="Icon button">
              <MailIcon className="size-5" />
            </Button>
            <Button size="iconSm" variant="soft" aria-label="Small icon button">
              <StarIcon className="size-4" />
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="With icons"
            subtitle="Lead and trailing icons across variants."
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">
              <CheckSquareIcon className="size-4" /> Save changes
            </Button>
            <Button variant="accent">
              <UploadIcon className="size-4" /> Upload file
            </Button>
            <Button variant="outline">
              <EditIcon className="size-4" /> Edit profile
            </Button>
            <Button variant="ghost">
              <MailIcon className="size-4" /> Send invite
            </Button>
            <Button variant="soft">
              Continue <ChevronRight className="size-4" />
            </Button>
            <Button variant="danger">
              <RefreshCwIcon className="size-4" /> Reset
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader
              title="Loading & disabled"
              subtitle="Async states for forms and destructive actions."
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setLoading(true)} disabled={loading}>
                {loading ? (
                  <>
                    <RefreshCwIcon className="size-4 animate-spin" /> Saving…
                  </>
                ) : (
                  "Click to save"
                )}
              </Button>
              <Button variant="soft" disabled>
                <RefreshCwIcon className="size-4 animate-spin" /> Loading
              </Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
              <Button variant="danger" disabled>
                Delete
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Button groups"
              subtitle="Joined buttons for segmented actions."
            />
            <div className="flex flex-col gap-4">
              <div className="inline-flex overflow-hidden rounded-lg border border-stroke dark:border-dark-3">
                <Button variant="ghost" className="rounded-none border-0">
                  Day
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-none border-0 border-x border-stroke dark:border-dark-3"
                >
                  Week
                </Button>
                <Button variant="ghost" className="rounded-none border-0">
                  Month
                </Button>
              </div>
              <div className="inline-flex overflow-hidden rounded-lg">
                <Button variant="primary" className="rounded-r-none">
                  Save
                </Button>
                <Button
                  variant="outline"
                  className="rounded-l-none border-l-0"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Split buttons"
            subtitle="Primary action with a secondary menu affordance."
          />
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex overflow-hidden rounded-lg">
              <Button variant="primary" className="rounded-r-none">
                <CheckSquareIcon className="size-4" /> Save
              </Button>
              <Button
                variant="primary"
                size="icon"
                className="rounded-l-none border-l border-white/30"
                aria-label="More actions"
              >
                <ChevronRight className="size-4 rotate-90" />
              </Button>
            </div>
            <div className="inline-flex overflow-hidden rounded-lg">
              <Button variant="danger" className="rounded-r-none">
                Delete
              </Button>
              <Button
                variant="danger"
                size="icon"
                className="rounded-l-none border-l border-white/30"
                aria-label="More options"
              >
                <ChevronRight className="size-4 rotate-90" />
              </Button>
            </div>
            <div className="inline-flex overflow-hidden rounded-lg">
              <Button variant="accent" className="rounded-r-none">
                <UploadIcon className="size-4" /> Export
              </Button>
              <Button
                variant="accent"
                size="icon"
                className="rounded-l-none border-l border-white/30"
                aria-label="Export options"
              >
                <ChevronRight className="size-4 rotate-90" />
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Icon-only buttons"
            subtitle="Square actions for toolbars and dense UI."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="icon" variant="primary" aria-label="Add">
              <CheckSquareIcon className="size-5" />
            </Button>
            <Button size="icon" variant="accent" aria-label="Favorite">
              <StarIcon className="size-5" />
            </Button>
            <Button size="icon" variant="outline" aria-label="Edit">
              <EditIcon className="size-5" />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Mail">
              <MailIcon className="size-5" />
            </Button>
            <Button size="iconSm" variant="soft" aria-label="Refresh">
              <RefreshCwIcon className="size-4" />
            </Button>
            <Button size="iconSm" variant="danger" aria-label="Reset">
              <RefreshCwIcon className="size-4" />
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
