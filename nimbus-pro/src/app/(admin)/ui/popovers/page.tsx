"use client";
import { useState, useRef, useEffect, useId } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, IconButton, Badge, Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Bell,
  Settings,
  Calendar,
  Heart,
  Share2,
  Trash2,
  Pencil,
  Copy,
  Check,
  Info,
  ChevronRight,
  X,
} from "lucide-react";

type PopoverPosition = "top" | "right" | "bottom" | "left";

const POSITION_CLASS: Record<PopoverPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
};

const ARROW_CLASS: Record<PopoverPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 -mt-2 border-t-white border-x-transparent border-b-transparent dark:border-t-gray-900",
  right: "right-full top-1/2 -translate-y-1/2 -mr-2 border-r-white border-y-transparent border-l-transparent dark:border-r-gray-900",
  bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-2 border-b-white border-x-transparent border-t-transparent dark:border-b-gray-900",
  left: "left-full top-1/2 -translate-y-1/2 -ml-2 border-l-white border-y-transparent border-r-transparent dark:border-l-gray-900",
};

function Popover({
  content,
  position = "bottom",
  className,
  children,
}: {
  content: React.ReactNode;
  position?: PopoverPosition;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", handler);
      document.addEventListener("keydown", escHandler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <span
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className="inline-flex cursor-pointer"
      >
        {children}
      </span>
      {open && (
        <div
          id={panelId}
          role="dialog"
          className={cn(
            "absolute z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-theme-lg animate-scale-in dark:border-gray-800 dark:bg-gray-900",
            POSITION_CLASS[position],
            className
          )}
        >
          {content}
          <span className={cn("absolute h-0 w-0 border-4", ARROW_CLASS[position])} />
        </div>
      )}
    </div>
  );
}

export default function PopoversPage() {
  const [copied, setCopied] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Popovers"
        description="Floating panels anchored to a trigger — positions, titles, rich content, and actions. Click outside or press Esc to close."
        breadcrumbs={[{ label: "UI Components" }, { label: "Popovers" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Positions */}
        <Card>
          <CardHeader title="Positions" description="Four sides — top, right, bottom, left" />
          <CardBody>
            <div className="flex flex-wrap items-center justify-center gap-6 py-16">
              <Popover
                position="top"
                content={
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Top popover</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">This popover appears above the trigger.</p>
                  </div>
                }
              >
                <Button variant="secondary" size="sm">Top</Button>
              </Popover>
              <Popover
                position="right"
                content={
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Right popover</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Appears to the right of the trigger.</p>
                  </div>
                }
              >
                <Button variant="secondary" size="sm">Right</Button>
              </Popover>
              <Popover
                position="bottom"
                content={
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Bottom popover</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Appears below the trigger.</p>
                  </div>
                }
              >
                <Button variant="secondary" size="sm">Bottom</Button>
              </Popover>
              <Popover
                position="left"
                content={
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Left popover</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Appears to the left of the trigger.</p>
                  </div>
                }
              >
                <Button variant="secondary" size="sm">Left</Button>
              </Popover>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-xs text-gray-500 dark:bg-gray-900/40">
              Click any button to open. Click outside or press <kbd className="rounded bg-white px-1 py-0.5 text-[10px] font-semibold dark:bg-gray-800">Esc</kbd> to dismiss.
            </div>
          </CardBody>
        </Card>

        {/* With title */}
        <Card>
          <CardHeader title="With Title" description="Header with optional close button" />
          <CardBody>
            <div className="flex flex-wrap items-center justify-center gap-6 py-12">
              <Popover
                position="bottom"
                content={
                  <div className="-m-4">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                      <Badge tone="brand" variant="soft">3 new</Badge>
                    </div>
                    <div className="space-y-2 p-4">
                      {[
                        { name: "Aria Chen", msg: "commented on your design" },
                        { name: "Jordan Lee", msg: "shared a document" },
                      ].map((n) => (
                        <div key={n.name} className="flex items-start gap-2 text-xs">
                          <Avatar name={n.name} size={28} />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{n.name}</p>
                            <p className="text-gray-500 dark:text-gray-400">{n.msg}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
              >
                <Button variant="primary" size="sm">
                  <Bell className="h-4 w-4" /> Notifications
                </Button>
              </Popover>

              <Popover
                position="bottom"
                content={
                  <div className="-m-4">
                    <div className="border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Filter by status</p>
                    </div>
                    <div className="space-y-1 p-2">
                      {["All", "Active", "Pending", "Archived"].map((s, i) => (
                        <button
                          key={s}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          {s}
                          {i === 0 && <Check className="h-3.5 w-3.5 text-brand-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                }
              >
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" /> Filters
                </Button>
              </Popover>
            </div>
          </CardBody>
        </Card>

        {/* With HTML content */}
        <Card>
          <CardHeader title="Rich HTML Content" description="Forms, calendars, and structured layouts" />
          <CardBody>
            <div className="flex flex-wrap items-center justify-center gap-6 py-8">
              <Popover
                position="bottom"
                content={
                  <div className="-m-4">
                    <div className="border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">November 2024</p>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-gray-400">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                          <span key={i} className="py-1">{d}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {Array.from({ length: 30 }).map((_, i) => {
                          const day = i + 1;
                          const isToday = day === 14;
                          return (
                            <button
                              key={i}
                              className={cn(
                                "rounded-md py-1.5 font-medium transition-colors",
                                isToday
                                  ? "bg-brand-500 text-white"
                                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                              )}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                }
              >
                <Button variant="secondary" size="sm">
                  <Calendar className="h-4 w-4" /> Pick date
                </Button>
              </Popover>

              <Popover
                position="bottom"
                content={
                  <div className="-m-4">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Share document</p>
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Anyone with the link can view</p>
                      <div className="flex items-center gap-1.5">
                        <input
                          readOnly
                          value="https://nimbus.app/d/8f3a2c"
                          className="input h-8 text-xs"
                        />
                        <Button
                          size="sm"
                          variant="primary"
                          className="h-8 px-2.5"
                          onClick={copy}
                        >
                          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                }
              >
                <Button variant="secondary" size="sm">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </Popover>
            </div>
          </CardBody>
        </Card>

        {/* With actions */}
        <Card>
          <CardHeader title="With Actions" description="Footer buttons, confirmation, and forms" />
          <CardBody>
            <div className="flex flex-wrap items-center justify-center gap-6 py-8">
              <Popover
                position="bottom"
                content={
                  <div className="-m-4">
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Delete project?</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">This action cannot be undone. All data will be permanently removed.</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <Button size="sm" variant="ghost">Cancel</Button>
                      <Button size="sm" variant="danger">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </Button>
                    </div>
                  </div>
                }
              >
                <Button variant="danger" size="sm">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </Popover>

              <Popover
                position="bottom"
                content={
                  <div className="-m-4">
                    <div className="border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Quick edit</p>
                    </div>
                    <div className="space-y-3 p-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Name</label>
                        <input defaultValue="Project Nimbus" className="input h-8 text-xs" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Status</label>
                        <select className="input h-8 text-xs">
                          <option>Active</option>
                          <option>Pending</option>
                          <option>Archived</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <Button size="sm" variant="ghost">Cancel</Button>
                      <Button size="sm" variant="primary">Save</Button>
                    </div>
                  </div>
                }
              >
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4" /> Quick edit
                </Button>
              </Popover>

              <Popover
                position="top"
                content={
                  <div className="-m-4">
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Subscribe to updates</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Get notified whenever this project changes.</p>
                    </div>
                    <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-4 py-2.5 dark:border-gray-800">
                      <Button size="sm" variant="ghost">Not now</Button>
                      <Button size="sm" variant="primary" onClick={() => setSubscribed(true)}>
                        {subscribed ? <Check className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
                        {subscribed ? "Subscribed" : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                }
              >
                <Button variant="secondary" size="sm">
                  <Bell className="h-4 w-4" /> Subscribe
                </Button>
              </Popover>
            </div>
          </CardBody>
        </Card>

        {/* Trigger variations */}
        <Card>
          <CardHeader title="Trigger Variations" description="Icon buttons, badges, avatars, text" />
          <CardBody>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Icon buttons</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Popover
                    position="bottom"
                    content={
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">3 new alerts</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Aria replied to your comment.</p>
                      </div>
                    }
                  >
                    <IconButton aria-label="notifications">
                      <Bell className="h-4 w-4" />
                    </IconButton>
                  </Popover>
                  <Popover
                    position="bottom"
                    content={
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Account settings</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Manage your profile and preferences.</p>
                      </div>
                    }
                  >
                    <IconButton aria-label="settings">
                      <Settings className="h-4 w-4" />
                    </IconButton>
                  </Popover>
                  <Popover
                    position="bottom"
                    content={
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Add to favorites</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Save this item for quick access later.</p>
                      </div>
                    }
                  >
                    <IconButton aria-label="favorite">
                      <Heart className="h-4 w-4" />
                    </IconButton>
                  </Popover>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Avatar & badge triggers</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Popover
                    position="bottom"
                    content={
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar name="Aria Chen" size={32} />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Aria Chen</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Product Designer</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Member since Jan 2022 · 142 commits</p>
                      </div>
                    }
                  >
                    <Avatar name="Aria Chen" size={36} />
                  </Popover>
                  <Popover
                    position="bottom"
                    content={
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Plan: Pro</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Renews on Dec 14, 2024. Manage subscription to change plan.</p>
                      </div>
                    }
                  >
                    <Badge tone="purple" variant="soft">Pro</Badge>
                  </Popover>
                  <Popover
                    position="bottom"
                    content={
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">What does this mean?</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">This metric shows the rolling 30-day average of new signups.</p>
                      </div>
                    }
                  >
                    <span className="cursor-help border-b border-dashed border-brand-400 text-sm font-medium text-brand-600 dark:text-brand-400">
                      Conversion rate
                    </span>
                  </Popover>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Anatomy */}
        <Card>
          <CardHeader title="Anatomy & Tips" description="What goes inside a great popover" />
          <CardBody className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <div className="mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-brand-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Dimensions</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Default width is <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">w-64</code> (16rem). Override with the <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">className</code> prop.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <div className="mb-2 flex items-center gap-2">
                  <X className="h-4 w-4 text-error-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Dismissal</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Click outside, press <kbd className="rounded bg-gray-100 px-1 py-0.5 text-[10px] dark:bg-gray-800">Esc</kbd>, or click the trigger again to close.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <div className="mb-2 flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nesting</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Avoid putting essential UI inside popovers — they hide on dismiss. Use modals for blocking flows.</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <div className="mb-2 flex items-center gap-2">
                  <Check className="h-4 w-4 text-success-500" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Accessibility</p>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Uses <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">role=&quot;dialog&quot;</code>, <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">aria-haspopup</code>, and <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">aria-controls</code>.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
