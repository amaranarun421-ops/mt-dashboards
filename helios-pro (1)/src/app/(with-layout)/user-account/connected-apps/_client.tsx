"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { Drawer } from "@/components/shared/drawer";
import { StatCard } from "@/components/shared/stat-card";
import { Tabs } from "@/components/shared/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import {
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  PlugIcon,
  CheckSquareIcon,
  ShieldIcon,
  XCircleIcon,
  ActivityIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  connectedApps as initialApps,
  availableApps,
  connectedAppsStats,
  type ConnectedApp,
} from "@/data/user-account/connected-apps";

const colorClasses: Record<ConnectedApp["color"], string> = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  info: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
  rose: "bg-rose-subtle text-rose dark:bg-rose/15 dark:text-rose-light",
  neutral: "bg-gray-2 text-dark-7 dark:bg-white/5 dark:text-dark-6",
};

const statusBadge: Record<ConnectedApp["status"], "success" | "danger" | "warning"> = {
  Connected: "success",
  Revoked: "danger",
  Pending: "warning",
};

const categoryTabs = [
  "All",
  "Communication",
  "Payments",
  "Analytics",
  "Productivity",
  "Marketing",
  "Storage",
  "CRM",
];

export default function ConnectedAppsClient() {
  const [apps, setApps] = useState<ConnectedApp[]>(initialApps);
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [connectOpen, setConnectOpen] = useState(false);
  const [detailApp, setDetailApp] = useState<ConnectedApp | null>(null);
  const [pendingRevoke, setPendingRevoke] = useState<ConnectedApp | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps.filter((a) => {
      const matchesCat = category === "All" || a.category === category;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.scopes.some((s) => s.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [apps, category, query]);

  const revokeApp = (id: string) => {
    setApps((arr) =>
      arr.map((a) => (a.id === id ? { ...a, status: "Revoked" as const } : a)),
    );
    setPendingRevoke(null);
    setDetailApp(null);
  };

  const reconnect = (id: string) =>
    setApps((arr) =>
      arr.map((a) => (a.id === id ? { ...a, status: "Connected" as const } : a)),
    );

  const connectNew = (app: Omit<ConnectedApp, "status" | "connectedAt" | "installedBy">) => {
    const newApp: ConnectedApp = {
      ...app,
      id: app.id,
      status: "Connected",
      connectedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      installedBy: "Aarav Mehta",
    };
    setApps((arr) => [newApp, ...arr]);
    setConnectOpen(false);
  };

  const categoryTabItems = categoryTabs.map((c) => ({
    value: c,
    label: c,
    badge: c === "All" ? (
      <Badge variant="neutral" size="sm">{apps.length}</Badge>
    ) : (
      <Badge variant="neutral" size="sm">{apps.filter((a) => a.category === c).length}</Badge>
    ),
  }));

  return (
    <div>
      <PageHeader
        title="Connected apps"
        description="Manage third-party integrations, scopes and OAuth tokens connected to your Helios Pro workspace."
        breadcrumbs={[{ label: "User & Account" }, { label: "Connected apps" }]}
        actions={
          <Button onClick={() => setConnectOpen(true)}>
            <PlugIcon className="size-4" />
            Connect app
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total apps"
          value={connectedAppsStats.total}
          sublabel="Across all categories"
          tone="primary"
          icon={<PlugIcon className="size-5" />}
        />
        <StatCard
          label="Active"
          value={apps.filter((a) => a.status === "Connected").length}
          sublabel="Currently exchanging data"
          tone="success"
          icon={<CheckSquareIcon className="size-5" />}
        />
        <StatCard
          label="Revoked"
          value={apps.filter((a) => a.status === "Revoked").length}
          sublabel="No longer authorized"
          tone="danger"
          icon={<XCircleIcon className="size-5" />}
        />
        <StatCard
          label="Categories"
          value={connectedAppsStats.categories}
          sublabel="Distinct app categories"
          tone="violet"
          icon={<ActivityIcon className="size-5" />}
        />
      </div>

      <Card className="mt-6" padded={false}>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
          <div className="relative max-w-md flex-1">
            <input
              className={`${inputClass} pl-9`}
              placeholder="Search by name, description or scope…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <Tabs
            tabs={categoryTabItems}
            value={category}
            onChange={setCategory}
            variant="pills"
            size="sm"
          />
        </div>

        <div className="border-t border-stroke p-4 md:p-5 dark:border-dark-3">
          {filtered.length === 0 ? (
            <EmptyState
              title="No connected apps match"
              description="Try a different category or clear your search."
              icon={<PlugIcon className="size-7" />}
              action={
                <Button onClick={() => setConnectOpen(true)}>
                  <PlugIcon className="size-4" />
                  Connect a new app
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((app) => (
                <div
                  key={app.id}
                  className="group flex flex-col rounded-2xl border border-stroke bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-3 dark:border-dark-3 dark:bg-gray-dark"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`grid size-12 place-items-center rounded-xl text-base font-bold ${colorClasses[app.color]}`}>
                        {app.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-dark dark:text-white">
                          {app.name}
                        </p>
                        <p className="text-xs text-dark-5 dark:text-dark-6">{app.category}</p>
                      </div>
                    </div>
                    <Badge variant={statusBadge[app.status]}>{app.status}</Badge>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs text-dark-5 dark:text-dark-6">
                    {app.description}
                  </p>

                  <div className="mt-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      Scopes
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {app.scopes.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-stroke bg-gray-2 px-1.5 py-0.5 font-mono text-[10px] text-dark-7 dark:border-dark-3 dark:bg-white/5 dark:text-dark-6"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-stroke pt-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
                    <div>
                      <p>Connected {app.connectedAt}</p>
                      <p>by {app.installedBy}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setDetailApp(app)}
                    >
                      Manage
                    </Button>
                    {app.status === "Connected" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red"
                        onClick={() => setPendingRevoke(app)}
                      >
                        <XCircleIcon className="size-4" />
                        Revoke
                      </Button>
                    ) : (
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={() => reconnect(app.id)}
                      >
                        Reconnect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Manage app drawer */}
      <Drawer
        open={!!detailApp}
        onClose={() => setDetailApp(null)}
        title={detailApp ? detailApp.name : ""}
        description={detailApp ? `${detailApp.category} · ${detailApp.status}` : ""}
        footer={
          <>
            <Button variant="outline" onClick={() => setDetailApp(null)}>Close</Button>
            {detailApp?.status === "Connected" && (
              <Button
                variant="danger"
                className="mr-auto"
                onClick={() => setPendingRevoke(detailApp)}
              >
                Revoke access
              </Button>
            )}
          </>
        }
      >
        {detailApp && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-xl border border-stroke p-4 dark:border-dark-3">
              <span className={`grid size-14 place-items-center rounded-xl text-lg font-bold ${colorClasses[detailApp.color]}`}>
                {detailApp.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-dark dark:text-white">{detailApp.name}</p>
                <p className="text-xs text-dark-5 dark:text-dark-6">{detailApp.category}</p>
                <div className="mt-2">
                  <Badge variant={statusBadge[detailApp.status]}>{detailApp.status}</Badge>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Description
              </p>
              <p className="mt-1 text-sm text-dark-7 dark:text-dark-6">{detailApp.description}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Authorized scopes
              </p>
              <ul className="mt-2 space-y-1.5">
                {detailApp.scopes.map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 rounded-lg bg-gray-2 px-3 py-2 dark:bg-white/5"
                  >
                    <ShieldIcon className="size-4 text-primary" />
                    <code className="text-xs text-dark-7 dark:text-dark-6">{s}</code>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-lg border border-stroke px-3 py-2 dark:border-dark-3">
                <span className="text-dark-5 dark:text-dark-6">Connected by</span>
                <span className="font-medium text-dark dark:text-white">{detailApp.installedBy}</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-stroke px-3 py-2 dark:border-dark-3">
                <span className="text-dark-5 dark:text-dark-6">Connected on</span>
                <span className="font-medium text-dark dark:text-white">{detailApp.connectedAt}</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-stroke px-3 py-2 dark:border-dark-3">
                <span className="text-dark-5 dark:text-dark-6">App ID</span>
                <span className="font-mono text-xs font-medium text-dark dark:text-white">{detailApp.id}</span>
              </li>
            </ul>

            {detailApp.status === "Connected" && (
              <div className="rounded-xl border border-red/40 bg-red-light-5/40 p-3 dark:bg-red/10">
                <p className="text-sm font-semibold text-red-dark dark:text-red-light">
                  Revoke access
                </p>
                <p className="mt-0.5 text-xs text-red-dark/80 dark:text-red-light/80">
                  {detailApp.name} will immediately lose access to your Helios Pro data. You can reconnect later but will need to re-grant every scope.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  className="mt-3"
                  onClick={() => setPendingRevoke(detailApp)}
                >
                  Revoke access
                </Button>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Revoke confirmation modal */}
      <Modal
        open={!!pendingRevoke}
        onClose={() => setPendingRevoke(null)}
        title={`Revoke ${pendingRevoke?.name ?? ""}?`}
        description="This will immediately cut off the app's access to your Helios Pro workspace."
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setPendingRevoke(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => pendingRevoke && revokeApp(pendingRevoke.id)}>
              Revoke access
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="rounded-lg border border-red/40 bg-red-light-5/40 p-3 text-xs text-red-dark dark:bg-red/10 dark:text-red-light">
            <p className="font-semibold">What happens next</p>
            <ul className="mt-1 list-disc pl-4">
              <li>The app's OAuth tokens are invalidated immediately.</li>
              <li>Any in-flight data syncs from this app will fail.</li>
              <li>Existing synced data stays in your workspace unless you delete it.</li>
            </ul>
          </div>
          <p className="text-sm text-dark-7 dark:text-dark-6">
            You can reconnect <span className="font-semibold">{pendingRevoke?.name}</span> at any time, but you'll need to re-authorize each scope.
          </p>
        </div>
      </Modal>

      {/* Connect new app modal */}
      <Modal
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
        title="Connect a new app"
        description="Browse the Helios Pro integration catalog and authorize a new connection."
        size="xl"
        footer={
          <Button variant="outline" onClick={() => setConnectOpen(false)}>Done</Button>
        }
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {availableApps.map((app) => (
            <div
              key={app.id}
              className="flex flex-col gap-3 rounded-xl border border-stroke p-4 dark:border-dark-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`grid size-11 place-items-center rounded-xl text-sm font-bold ${colorClasses[app.color]}`}>
                    {app.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-dark dark:text-white">
                      {app.name}
                    </p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">{app.category}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-dark-5 dark:text-dark-6">{app.description}</p>
              <div className="flex flex-wrap gap-1">
                {app.scopes.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-stroke bg-gray-2 px-1.5 py-0.5 font-mono text-[10px] text-dark-7 dark:border-dark-3 dark:bg-white/5 dark:text-dark-6"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <Button size="sm" onClick={() => connectNew(app)}>
                <PlugIcon className="size-4" />
                Connect
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-stroke p-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
          <p className="font-medium text-dark dark:text-white">Heads up</p>
          Connecting an app opens an OAuth flow in a new window. Helios Pro only requests the scopes listed above and never stores your third-party passwords.
        </div>
      </Modal>
    </div>
  );
}
