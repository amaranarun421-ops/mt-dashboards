"use client";
import { useState, useId } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Search,
  Bell,
  Settings,
  Heart,
  Star,
  Download,
  Share2,
  Info,
  HelpCircle,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Position = "top" | "right" | "bottom" | "left";

const POSITION_CLASS: Record<Position, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
};

const ARROW_CLASS: Record<Position, string> = {
  top: "top-full left-1/2 -translate-x-1/2 -mt-1 border-t-gray-900 border-x-transparent border-b-transparent",
  right: "right-full top-1/2 -translate-y-1/2 -mr-1 border-r-gray-900 border-y-transparent border-l-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-gray-900 border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 -ml-1 border-l-gray-900 border-y-transparent border-r-transparent",
};

function Tooltip({
  content,
  position = "top",
  arrow = true,
  children,
}: {
  content: React.ReactNode;
  position?: Position;
  arrow?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const tipId = useId();
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? tipId : undefined} className="inline-flex">
        {children}
      </span>
      {open && (
        <span
          id={tipId}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-theme-lg animate-scale-in dark:bg-gray-700",
            POSITION_CLASS[position]
          )}
        >
          {content}
          {arrow && (
            <span className={cn("absolute h-0 w-0 border-4", ARROW_CLASS[position])} />
          )}
        </span>
      )}
    </span>
  );
}

function TooltipWithIcon({
  icon: Icon,
  label,
  tone = "gray",
  position = "top",
}: {
  icon: LucideIcon;
  label: string;
  tone?: "gray" | "brand" | "purple" | "pink" | "warning";
  position?: Position;
}) {
  const TONE: Record<string, string> = {
    gray: "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
    brand: "text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-500/15",
    purple: "text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-500/15",
    pink: "text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-500/15",
    warning: "text-warning-600 hover:bg-warning-50 dark:text-warning-400 dark:hover:bg-warning-500/15",
  };
  return (
    <Tooltip content={label} position={position}>
      <button
        aria-label={label}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
          TONE[tone]
        )}
      >
        <Icon className="h-4 w-4" />
      </button>
    </Tooltip>
  );
}

export default function TooltipsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Tooltips"
        description="Four positions, optional arrow, HTML content, and trigger variations — built with hover/focus."
        breadcrumbs={[{ label: "UI Components" }, { label: "Tooltips" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Positions */}
        <Card>
          <CardHeader title="Positions" description="Top, right, bottom, left — all four sides" />
          <CardBody>
            <div className="flex flex-wrap items-center justify-center gap-6 py-12">
              <Tooltip content="Tooltip on top" position="top">
                <Button variant="secondary" size="sm">Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip on right" position="right">
                <Button variant="secondary" size="sm">Right</Button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" position="bottom">
                <Button variant="secondary" size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip on left" position="left">
                <Button variant="secondary" size="sm">Left</Button>
              </Tooltip>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
              Hover any button to see the tooltip. Tooltips also appear on keyboard focus — try tabbing.
            </div>
          </CardBody>
        </Card>

        {/* With arrow toggle */}
        <Card>
          <CardHeader title="With Arrow" description="Small pointer toward the trigger" />
          <CardBody>
            <div className="flex flex-wrap items-center justify-center gap-6 py-12">
              <Tooltip content="With arrow" arrow position="top">
                <Button variant="primary" size="sm">Arrow on</Button>
              </Tooltip>
              <Tooltip content="No arrow" arrow={false} position="top">
                <Button variant="outline" size="sm">Arrow off</Button>
              </Tooltip>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Tooltip content="Search this page" arrow position="top">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300">
                  <Search className="h-4 w-4" /> Search
                </button>
              </Tooltip>
              <Tooltip content="3 new alerts" arrow position="top">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300">
                  <Bell className="h-4 w-4" /> Alerts
                </button>
              </Tooltip>
            </div>
          </CardBody>
        </Card>

        {/* HTML content */}
        <Card>
          <CardHeader title="Rich Content" description="Tooltips can contain markup, not just text" />
          <CardBody>
            <div className="flex flex-wrap items-center justify-center gap-6 py-8">
              <Tooltip
                content={
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3 w-3 text-warning-400" />
                    <span>Pro feature</span>
                  </span>
                }
                position="top"
              >
                <Button variant="secondary" size="sm">Hover for badge</Button>
              </Tooltip>

              <Tooltip
                content={
                  <span className="flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-warning-400 text-warning-400" />
                    <span>4.9 / 5 rating</span>
                  </span>
                }
                position="bottom"
              >
                <Button variant="secondary" size="sm">Hover for rating</Button>
              </Tooltip>

              <Tooltip
                content={
                  <span className="max-w-[200px] whitespace-normal text-center leading-snug">
                    Tooltips can wrap to multiple lines when content is long. Keep them short for usability.
                  </span>
                }
                position="top"
              >
                <Button variant="outline" size="sm">Hover for paragraph</Button>
              </Tooltip>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Tooltip
                content={<span className="flex items-center gap-1.5"><Download className="h-3 w-3" />Export as PDF</span>}
                position="top"
              >
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-50 py-2.5 text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  <Download className="h-4 w-4" /> Export
                </button>
              </Tooltip>
              <Tooltip
                content={<span className="flex items-center gap-1.5"><Share2 className="h-3 w-3" />Share with team</span>}
                position="top"
              >
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-50 py-2.5 text-sm font-semibold text-purple-700 dark:bg-purple-500/15 dark:text-purple-300">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </Tooltip>
            </div>
          </CardBody>
        </Card>

        {/* Trigger variations */}
        <Card>
          <CardHeader title="Trigger Variations" description="Buttons, icon buttons, badges, text" />
          <CardBody>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Icon buttons</p>
                <div className="flex flex-wrap items-center gap-3">
                  <TooltipWithIcon icon={Search} label="Search" tone="gray" />
                  <TooltipWithIcon icon={Bell} label="Notifications" tone="brand" position="bottom" />
                  <TooltipWithIcon icon={Settings} label="Settings" tone="purple" position="right" />
                  <TooltipWithIcon icon={Heart} label="Add to favorites" tone="pink" />
                  <TooltipWithIcon icon={Info} label="More info" tone="warning" position="left" />
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Text & badges</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Tooltip content="Click to learn more" position="top">
                    <span className="cursor-help border-b border-dashed border-brand-400 font-medium text-brand-600 dark:text-brand-400">
                      Learn more
                    </span>
                  </Tooltip>
                  <Tooltip content="Field is required" position="top">
                    <Badge tone="error" variant="soft">Required</Badge>
                  </Tooltip>
                  <Tooltip content="Synced 2 minutes ago" position="top">
                    <Badge tone="success" dot>Synced</Badge>
                  </Tooltip>
                  <Tooltip content="Beta feature — may change" position="top">
                    <Badge tone="warning" variant="outline">Beta</Badge>
                  </Tooltip>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Avatar & chips</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Tooltip content="Aria Chen — Product Designer" position="top">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-sm font-bold text-white">
                      AC
                    </div>
                  </Tooltip>
                  <Tooltip content="Maya Patel — VP Engineering" position="top">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                      MP
                    </div>
                  </Tooltip>
                  <Tooltip content="Jordan Lee — Designer" position="top">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
                      JL
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Toolbar example */}
      <Card>
        <CardHeader title="Toolbar Example" description="A real-world toolbar with tooltips on every action" />
        <CardBody>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
            <div className="flex items-center gap-1">
              <TooltipWithIcon icon={Search} label="Search" tone="gray" />
              <TooltipWithIcon icon={Bell} label="Notifications (3)" tone="gray" position="bottom" />
              <TooltipWithIcon icon={Settings} label="Settings" tone="gray" />
              <div className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <TooltipWithIcon icon={Download} label="Download" tone="gray" position="bottom" />
              <TooltipWithIcon icon={Share2} label="Share" tone="gray" />
              <TooltipWithIcon icon={Star} label="Add to favorites" tone="gray" position="bottom" />
            </div>
            <div className="flex items-center gap-3">
              <Tooltip content="Need help? Click to chat with support" position="bottom">
                <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                  <HelpCircle className="h-3.5 w-3.5" /> Help
                </button>
              </Tooltip>
              <Button variant="primary" size="sm">
                <Zap className="h-3.5 w-3.5" /> Upgrade
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-brand-500" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Tip</p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Wrap any element in <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">&lt;Tooltip&gt;</code> to add a hover/focus hint.</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="mb-2 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-500" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Accessibility</p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Uses <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">role=&quot;tooltip&quot;</code> and <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">aria-describedby</code> on focus.</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning-500" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Best practice</p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Keep tooltips under 50 chars. Don&rsquo;t put essential info in a tooltip.</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
