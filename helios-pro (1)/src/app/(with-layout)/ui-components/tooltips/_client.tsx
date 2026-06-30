"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Tooltip } from "@/components/shared/tooltip";
import {
  TooltipIcon,
  BellIcon,
  StarIcon,
  EditIcon,
  MailIcon,
  User,
} from "@/components/Layouts/sidebar/icons";

export default function TooltipsClient() {
  const [delayed, setDelayed] = React.useState(false);

  return (
    <>
      <PageHeader
        title="Tooltips"
        description="Tiny contextual labels that appear on hover or focus — four placements, rich content and a delayed variant."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/tooltips" },
          { label: "Tooltips" },
        ]}
        actions={
          <Badge variant="primary">
            <TooltipIcon className="size-3.5" /> 4 sides
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="All four sides"
            subtitle="Top, bottom, left and right placements."
          />
          <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
            <div className="flex justify-center">
              <Tooltip content="Tooltip on top" side="top">
                <Button variant="outline">Top</Button>
              </Tooltip>
            </div>
            <div className="flex justify-center">
              <Tooltip content="Tooltip on bottom" side="bottom">
                <Button variant="outline">Bottom</Button>
              </Tooltip>
            </div>
            <div className="flex justify-center">
              <Tooltip content="Tooltip on left" side="left">
                <Button variant="outline">Left</Button>
              </Tooltip>
            </div>
            <div className="flex justify-center">
              <Tooltip content="Tooltip on right" side="right">
                <Button variant="outline">Right</Button>
              </Tooltip>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="On icon buttons"
            subtitle="The most common pattern — labeling a toolbar action."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip content="Send email" side="top">
              <Button size="icon" variant="ghost" aria-label="Send email">
                <MailIcon className="size-5" />
              </Button>
            </Tooltip>
            <Tooltip content="Mark as favorite" side="top">
              <Button size="icon" variant="ghost" aria-label="Favorite">
                <StarIcon className="size-5" />
              </Button>
            </Tooltip>
            <Tooltip content="Edit item" side="top">
              <Button size="icon" variant="ghost" aria-label="Edit">
                <EditIcon className="size-5" />
              </Button>
            </Tooltip>
            <Tooltip content="View notifications" side="top">
              <Button size="icon" variant="ghost" aria-label="Notifications">
                <BellIcon className="size-5" />
              </Button>
            </Tooltip>
            <Tooltip content="View profile" side="top">
              <Button size="icon" variant="ghost" aria-label="Profile">
                <User className="size-5" />
              </Button>
            </Tooltip>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Rich HTML content"
            subtitle="Tooltips accept any React node — not just strings."
          />
          <div className="flex flex-wrap items-center gap-6">
            <Tooltip
              side="top"
              content={
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Online now
                </span>
              }
            >
              <Button variant="outline">Status</Button>
            </Tooltip>
            <Tooltip
              side="top"
              content={
                <span>
                  <span className="font-bold">3,248</span> active users this
                  week
                </span>
              }
            >
              <Button variant="outline">Metric</Button>
            </Tooltip>
            <Tooltip
              side="top"
              content={
                <span className="flex items-center gap-1.5">
                  <StarIcon className="size-3 text-accent" />
                  <StarIcon className="size-3 text-accent" />
                  <StarIcon className="size-3 text-accent" />
                  <StarIcon className="size-3 text-accent" />
                  <StarIcon className="size-3 text-accent" />
                  Rated 5.0 by 412 users
                </span>
              }
            >
              <Button variant="outline">Rating</Button>
            </Tooltip>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Delayed tooltip"
            subtitle="Wait 700ms before showing — avoids flicker on quick hovers."
          />
          <div className="flex flex-wrap items-center gap-4">
            <span
              className="relative inline-flex"
              onMouseEnter={() => {
                window.setTimeout(() => setDelayed(true), 700);
              }}
              onMouseLeave={() => setDelayed(false)}
            >
              <Button variant="primary">Hover for 700ms</Button>
              {delayed && (
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-dark px-2.5 py-1.5 text-xs font-medium text-white shadow-3 dark:bg-white dark:text-dark">
                  Now I appear
                </span>
              )}
            </span>
            <p className="text-xs text-dark-5 dark:text-dark-6">
              Move away to dismiss instantly.
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="On text & badges"
            subtitle="Highlight inline elements without cluttering the UI."
          />
          <p className="text-sm text-dark-7 dark:text-dark-7">
            Hover over the{" "}
            <Tooltip content="A unique 6-character identifier for this record" side="top">
              <span className="cursor-help font-medium text-primary underline decoration-dotted underline-offset-2">
                record ID
              </span>
            </Tooltip>{" "}
            or the{" "}
            <Tooltip content="Highest priority — gets routed first" side="top">
              <Badge variant="danger" size="sm" className="cursor-help">
                P0
              </Badge>
            </Tooltip>{" "}
            to learn more.
          </p>
        </Card>
      </div>
    </>
  );
}
