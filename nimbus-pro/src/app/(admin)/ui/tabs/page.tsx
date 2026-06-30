"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Tabs, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Settings,
  User,
  Bell,
  CreditCard,
  Shield,
  Folder,
  Star,
  Clock,
  Archive,
  type LucideIcon,
} from "lucide-react";

const TABS_BASIC = [
  { value: "overview", label: "Overview" },
  { value: "analytics", label: "Analytics" },
  { value: "reports", label: "Reports" },
  { value: "settings", label: "Settings" },
];

const TABS_ICONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "account", label: "Account", icon: User },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "security", label: "Security", icon: Shield },
];

const TABS_COUNTS: { value: string; label: string; count: number }[] = [
  { value: "all", label: "All", count: 124 },
  { value: "active", label: "Active", count: 87 },
  { value: "pending", label: "Pending", count: 12 },
  { value: "archived", label: "Archived", count: 25 },
];

const PILL_TABS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

const UNDERLINE_TABS = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
];

const VERTICAL_TABS = [
  { value: "profile", label: "Profile", icon: User },
  { value: "account", label: "Account", icon: Settings },
  { value: "appearance", label: "Appearance", icon: LayoutGrid },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "billing", label: "Billing", icon: CreditCard },
];

function PillTabs<T extends string>({ tabs, value, onChange }: { tabs: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-semibold transition-all",
            value === t.value
              ? "gradient-bg text-white shadow-[0_4px_12px_-2px_rgba(16,185,129,0.35)]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function UnderlineTabs<T extends string>({ tabs, value, onChange }: { tabs: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 dark:border-gray-800">
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            "relative pb-3 pt-1 text-sm font-semibold transition-colors",
            value === t.value
              ? "text-brand-600 dark:text-brand-400"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          )}
        >
          {t.label}
          {value === t.value && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full gradient-bg" />
          )}
        </button>
      ))}
    </div>
  );
}

export default function TabsPage() {
  const [basicTab, setBasicTab] = useState("overview");
  const [iconTab, setIconTab] = useState("account");
  const [countTab, setCountTab] = useState("all");
  const [pillTab, setPillTab] = useState("design");
  const [underlineTab, setUnderlineTab] = useState("week");
  const [verticalTab, setVerticalTab] = useState("profile");
  const [verticalIconTab, setVerticalIconTab] = useState("account");
  const [underlineCountTab, setUnderlineCountTab] = useState("active");

  return (
    <div className="space-y-4">
      <PageHeader
        title="Tabs"
        description="Basic, pill, underline, vertical — with icons and counts. Multiple variations on one page."
        breadcrumbs={[{ label: "UI Components" }, { label: "Tabs" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Basic tabs (using ui Tabs) */}
        <Card>
          <CardHeader title="Basic Tabs" description="Default segmented style from the ui library" />
          <CardBody className="space-y-4">
            <Tabs tabs={TABS_BASIC} value={basicTab} onChange={setBasicTab} />
            <div className="rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900/40">
              <p className="text-gray-700 dark:text-gray-300">
                Active tab: <span className="font-semibold text-brand-600 dark:text-brand-400">{basicTab}</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">Switch tabs to update this panel content.</p>
            </div>
          </CardBody>
        </Card>

        {/* With icons */}
        <Card>
          <CardHeader title="With Icons" description="Each tab can have a leading icon" />
          <CardBody className="space-y-4">
            <Tabs tabs={TABS_ICONS} value={iconTab} onChange={setIconTab} />
            <div className="grid grid-cols-2 gap-2">
              {TABS_ICONS.filter((t) => t.value === iconTab).map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.value} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.label}</p>
                      <p className="text-xs text-gray-500">Manage your {t.label.toLowerCase()} preferences</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* With counts */}
        <Card>
          <CardHeader title="With Counts" description="Numeric badge on each tab" />
          <CardBody className="space-y-4">
            <Tabs tabs={TABS_COUNTS} value={countTab} onChange={setCountTab} />
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-gray-900/40">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {TABS_COUNTS.find((t) => t.value === countTab)?.count} items
                </p>
                <p className="text-xs text-gray-500">in the {countTab} view</p>
              </div>
              <Badge tone="brand" variant="soft">
                {TABS_COUNTS.find((t) => t.value === countTab)?.count} total
              </Badge>
            </div>
          </CardBody>
        </Card>

        {/* Pill tabs */}
        <Card>
          <CardHeader title="Pill Tabs" description="Rounded full pills with gradient active state" />
          <CardBody className="space-y-4">
            <PillTabs tabs={PILL_TABS} value={pillTab} onChange={setPillTab} />
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing teams in <span className="font-semibold capitalize text-brand-600 dark:text-brand-400">{pillTab}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Alpha", "Beta", "Gamma", "Delta"].map((t) => (
                  <Badge key={t} tone="purple" variant="soft">{t}</Badge>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Underline tabs */}
        <Card>
          <CardHeader title="Underline Tabs" description="Minimal style with bottom border indicator" />
          <CardBody className="space-y-4">
            <UnderlineTabs tabs={UNDERLINE_TABS} value={underlineTab} onChange={setUnderlineTab} />
            <div className="rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-900/40">
              <p className="text-gray-700 dark:text-gray-300">
                View: <span className="font-semibold capitalize text-brand-600 dark:text-brand-400">{underlineTab}</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">Analytics summary for the selected period.</p>
            </div>
          </CardBody>
        </Card>

        {/* Underline tabs with counts */}
        <Card>
          <CardHeader title="Underline + Counts" description="Combine the two patterns" />
          <CardBody className="space-y-4">
            <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 dark:border-gray-800">
              {TABS_COUNTS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setUnderlineCountTab(t.value)}
                  className={cn(
                    "relative flex items-center gap-2 pb-3 pt-1 text-sm font-semibold transition-colors",
                    underlineCountTab === t.value
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                >
                  {t.label}
                  <span className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                    underlineCountTab === t.value
                      ? "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-300"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  )}>
                    {t.count}
                  </span>
                  {underlineCountTab === t.value && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full gradient-bg" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{TABS_COUNTS.find((t) => t.value === underlineCountTab)?.count}</span> {underlineCountTab} items.
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Vertical tabs */}
      <Card>
        <CardHeader title="Vertical Tabs" description="Side-by-side tab list with content panel" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr]">
            <div className="flex flex-row flex-wrap gap-1 rounded-xl bg-gray-50 p-1 dark:bg-gray-900/40 md:flex-col">
              {VERTICAL_TABS.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    onClick={() => setVerticalTab(t.value)}
                    className={cn(
                      "flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all md:flex-none",
                      verticalTab === t.value
                        ? "bg-white text-brand-600 shadow-sm dark:bg-gray-800 dark:text-brand-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                );
              })}
            </div>
            <div className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
              {(() => {
                const tab = VERTICAL_TABS.find((t) => t.value === verticalTab);
                if (!tab) return null;
                const Icon = tab.icon;
                return (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">{tab.label}</h3>
                        <p className="text-xs text-gray-500">Update your {tab.label.toLowerCase()} settings</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      This is the content area for the <span className="font-semibold">{tab.label}</span> tab. Vertical tabs are
                      great for settings pages where the tab list acts as a secondary sidebar.
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Sidebar-style tabs */}
      <Card>
        <CardHeader title="Sidebar-style Tabs" description="Left-rail navigation with detail panel" />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
            <nav className="flex flex-row flex-wrap gap-1 md:flex-col">
              {[
                { value: "account", label: "Account", icon: User, desc: "Profile & sign in" },
                { value: "appearance", label: "Appearance", icon: LayoutGrid, desc: "Theme & density" },
                { value: "notifications", label: "Notifications", icon: Bell, desc: "Email & push" },
                { value: "folders", label: "Folders", icon: Folder, desc: "Workspace files" },
                { value: "starred", label: "Starred", icon: Star, desc: "Pinned items" },
                { value: "recent", label: "Recent", icon: Clock, desc: "Last 30 days" },
                { value: "archived", label: "Archived", icon: Archive, desc: "Hidden items" },
              ].map((t) => {
                const Icon = t.icon;
                const active = verticalIconTab === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => setVerticalIconTab(t.value)}
                    className={cn(
                      "menu-item flex-1 md:flex-none",
                      active && "menu-item-active"
                    )}
                  >
                    <Icon className="menu-item-icon" />
                    <span className="flex-1 text-left">{t.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="rounded-xl border border-gray-100 p-5 dark:border-gray-800">
              <h3 className="text-base font-bold capitalize text-gray-900 dark:text-white">{verticalIconTab}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Settings panel for {verticalIconTab}. Use the rail on the left to switch sections.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                    <div className="h-2 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="mt-2 h-3 w-20 rounded-full bg-gray-100 dark:bg-gray-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
