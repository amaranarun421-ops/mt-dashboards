"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { StatCard } from "@/components/shared/stat-card";
import { Tabs } from "@/components/shared/tabs";
import { FormField, inputClass } from "@/components/shared/form-section";
import {
  BellIcon,
  CheckSquareIcon,
  MailIcon,
  ChatIcon,
  ActivityIcon,
  ShieldIcon,
  RefreshCwIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  notificationGroups as initialGroups,
  channelLabels,
  channelColors,
  notificationStats,
  type NotificationChannel,
  type NotificationGroup,
} from "@/data/user-account/notifications";

const channelDot: Record<NotificationChannel, string> = {
  email: "bg-primary",
  push: "bg-violet",
  sms: "bg-accent",
  slack: "bg-rose",
  digest: "bg-blue",
};

const channelBadge: Record<NotificationChannel, "primary" | "accent" | "violet" | "info" | "danger" | "neutral"> = {
  email: "primary",
  push: "violet",
  sms: "accent",
  slack: "danger",
  digest: "info",
};

const allChannels: NotificationChannel[] = ["email", "push", "sms", "slack", "digest"];

export default function NotificationsSettingsClient() {
  const [groups, setGroups] = useState<NotificationGroup[]>(initialGroups);
  const [activeGroup, setActiveGroup] = useState<string>(initialGroups[0].id);
  const [previewChannel, setPreviewChannel] = useState<NotificationChannel>("email");
  const [previewItemId, setPreviewItemId] = useState<string>(initialGroups[0].items[0].id);
  const [dirty, setDirty] = useState(false);

  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("07:00");
  const [quietEnabled, setQuietEnabled] = useState(true);

  const toggle = (groupId: string, itemId: string, channel: NotificationChannel) => {
    setGroups((arr) =>
      arr.map((g) =>
        g.id === groupId
          ? {
              ...g,
              items: g.items.map((it) =>
                it.id === itemId
                  ? { ...it, enabled: { ...it.enabled, [channel]: !it.enabled[channel] } }
                  : it,
              ),
            }
          : g,
      ),
    );
    setDirty(true);
  };

  const setGroupChannel = (groupId: string, channel: NotificationChannel, value: boolean) => {
    setGroups((arr) =>
      arr.map((g) =>
        g.id === groupId
          ? {
              ...g,
              items: g.items.map((it) => ({
                ...it,
                enabled: allChannels.includes(channel)
                  ? { ...it.enabled, [channel]: value }
                  : it.enabled,
              })),
            }
          : g,
      ),
    );
    setDirty(true);
  };

  const resetAll = () => {
    setGroups(initialGroups);
    setDirty(false);
  };

  const activeGroupData = useMemo(
    () => groups.find((g) => g.id === activeGroup) ?? groups[0],
    [groups, activeGroup],
  );

  const previewItem = useMemo(() => {
    for (const g of groups) {
      const found = g.items.find((it) => it.id === previewItemId);
      if (found) return { group: g, item: found };
    }
    const g = groups[0];
    return { group: g, item: g.items[0] };
  }, [groups, previewItemId]);

  const totalRules = groups.reduce((acc, g) => acc + g.items.length, 0);
  const activeRules = groups.reduce(
    (acc, g) => acc + g.items.filter((it) => Object.values(it.enabled).some(Boolean)).length,
    0,
  );

  const previewChannelOptions = activeGroupData.channels.includes(previewChannel)
    ? activeGroupData.channels
    : activeGroupData.channels;

  return (
    <div>
      <PageHeader
        title="Notifications settings"
        description="Choose exactly which events reach your inbox, phone, Slack and weekly digest."
        breadcrumbs={[{ label: "User & Account" }, { label: "Notifications" }]}
        actions={
          <>
            <Button variant="outline" onClick={resetAll} disabled={!dirty}>
              Reset to defaults
            </Button>
            <Button disabled={!dirty}>
              <CheckSquareIcon className="size-4" />
              Save preferences
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Groups"
          value={notificationStats.groups}
          sublabel="Security, Team, Billing, Product"
          tone="primary"
          icon={<BellIcon className="size-5" />}
        />
        <StatCard
          label="Active rules"
          value={`${activeRules} / ${totalRules}`}
          sublabel="Rules with at least one channel on"
          tone="info"
          icon={<CheckSquareIcon className="size-5" />}
        />
        <StatCard
          label="Channels"
          value={notificationStats.channels}
          sublabel="Email · Push · SMS · Slack · Digest"
          tone="violet"
          icon={<ChatIcon className="size-5" />}
        />
        <StatCard
          label="Quiet hours"
          value={quietEnabled ? `${quietStart}–${quietEnd}` : "Off"}
          sublabel="Mutes push & SMS during sleep"
          tone="accent"
          icon={<ActivityIcon className="size-5" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs
            tabs={groups.map((g) => ({
              value: g.id,
              label: g.title,
              badge: (
                <Badge variant="neutral" size="sm">
                  {g.items.filter((it) => Object.values(it.enabled).some(Boolean)).length}/{g.items.length}
                </Badge>
              ),
            }))}
            value={activeGroup}
            onChange={setActiveGroup}
            variant="pills"
            size="sm"
          />

          <Card>
            <CardHeader
              title={activeGroupData.title}
              subtitle={activeGroupData.description}
              action={
                <Badge variant={channelBadge[activeGroupData.channels[0]]}>
                  {activeGroupData.items.length} rules
                </Badge>
              }
            />
            <div className="overflow-hidden rounded-xl border border-stroke dark:border-dark-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-2 text-left text-xs uppercase tracking-wider text-dark-5 dark:bg-dark-2 dark:text-dark-6">
                    <th className="px-4 py-3">Event</th>
                    {activeGroupData.channels.map((c) => (
                      <th key={c} className="px-3 py-3 text-center">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`size-1.5 rounded-full ${channelDot[c]}`} />
                          {channelLabels[c]}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeGroupData.items.map((it) => {
                    const isPreview = previewItemId === it.id;
                    return (
                      <tr
                        key={it.id}
                        className={`border-t border-stroke transition cursor-pointer dark:border-dark-3 ${
                          isPreview ? "bg-primary-subtle/40 dark:bg-primary/5" : "hover:bg-gray-2 dark:hover:bg-white/5"
                        }`}
                        onClick={() => setPreviewItemId(it.id)}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-dark dark:text-white">{it.label}</p>
                          <p className="text-xs text-dark-5 dark:text-dark-6">{it.hint}</p>
                        </td>
                        {activeGroupData.channels.map((c) => {
                          const checked = it.enabled[c];
                          return (
                            <td key={c} className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                role="switch"
                                aria-checked={checked}
                                aria-label={`${it.label} ${channelLabels[c]}`}
                                onClick={() => toggle(activeGroupData.id, it.id, c)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                  checked ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"
                                }`}
                              >
                                <span
                                  className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                                    checked ? "translate-x-5" : "translate-x-0.5"
                                  }`}
                                />
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-2">
                    <td className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      Bulk toggle
                    </td>
                    {activeGroupData.channels.map((c) => {
                      const allOn = activeGroupData.items.every((it) => it.enabled[c]);
                      return (
                        <td key={c} className="px-3 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => setGroupChannel(activeGroupData.id, c, !allOn)}
                            className="rounded-md border border-stroke px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-dark-5 transition hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:text-dark-6"
                          >
                            {allOn ? "All on" : "All off"}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Quiet hours"
              subtitle="Push and SMS notifications are silenced during these hours. Email and Slack still deliver."
              action={<ShieldIcon className="size-5 text-primary" />}
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <FormField label="Start" htmlFor="quiet-start">
                <input
                  id="quiet-start"
                  type="time"
                  className={inputClass}
                  value={quietStart}
                  onChange={(e) => setQuietStart(e.target.value)}
                  disabled={!quietEnabled}
                />
              </FormField>
              <FormField label="End" htmlFor="quiet-end">
                <input
                  id="quiet-end"
                  type="time"
                  className={inputClass}
                  value={quietEnd}
                  onChange={(e) => setQuietEnd(e.target.value)}
                  disabled={!quietEnabled}
                />
              </FormField>
              <div className="flex items-center gap-3 pb-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={quietEnabled}
                  onClick={() => setQuietEnabled((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    quietEnabled ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"
                  }`}
                >
                  <span
                    className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                      quietEnabled ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-sm text-dark-7 dark:text-dark-6">
                  {quietEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Live preview side panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Live preview"
              subtitle="A sample of what your members will see."
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const idx = previewChannelOptions.indexOf(previewChannel);
                    const next = previewChannelOptions[(idx + 1) % previewChannelOptions.length];
                    setPreviewChannel(next);
                  }}
                >
                  <RefreshCwIcon className="size-4" />
                  Cycle
                </Button>
              }
            />
            <div className="mb-4 flex flex-wrap gap-1.5">
              {previewChannelOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setPreviewChannel(c)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                    previewChannel === c
                      ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                      : "border-stroke text-dark-5 hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:text-dark-6"
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${channelDot[c]}`} />
                  {channelLabels[c]}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-stroke bg-gradient-to-br from-gray-2 to-white p-4 dark:border-dark-3 dark:from-dark-2 dark:to-gray-dark">
              {previewChannel === "email" && (
                <div>
                  <div className="flex items-center gap-2 border-b border-stroke pb-3 dark:border-dark-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-primary text-white">
                      <MailIcon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-dark dark:text-white">
                        Helios Pro
                      </p>
                      <p className="truncate text-xs text-dark-5 dark:text-dark-6">
                        noreply@heliospro.io
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-dark dark:text-white">
                    {previewItem.item.label}
                  </p>
                  <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                    {previewItem.item.hint}
                  </p>
                  <p className="mt-3 text-xs text-dark-7 dark:text-dark-6">
                    Open your Helios Pro workspace to review this event in detail.
                  </p>
                  <div className="mt-4">
                    <span className="inline-flex rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                      Review now
                    </span>
                  </div>
                </div>
              )}

              {previewChannel === "push" && (
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-violet text-white">
                    <BellIcon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-dark dark:text-white">
                      Helios Pro · now
                    </p>
                    <p className="text-xs font-medium text-dark dark:text-white">
                      {previewItem.item.label}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-dark-5 dark:text-dark-6">
                      {previewItem.item.hint}
                    </p>
                  </div>
                </div>
              )}

              {previewChannel === "sms" && (
                <div className="space-y-2 text-xs">
                  <p className="text-dark-5 dark:text-dark-6">SMS · from HLP-PRO</p>
                  <p className="rounded-2xl rounded-bl-sm bg-primary px-3 py-2 text-white">
                    Helios Pro: {previewItem.item.label}. Open the app to review. Reply STOP to mute.
                  </p>
                  <p className="text-[10px] text-dark-5 dark:text-dark-6">
                    Standard messaging rates may apply.
                  </p>
                </div>
              )}

              {previewChannel === "slack" && (
                <div className="space-y-2 text-xs">
                  <p className="font-semibold text-dark dark:text-white">
                    #helios-pro-alerts
                  </p>
                  <div className="flex items-start gap-2">
                    <span className="grid size-7 shrink-0 place-items-center rounded-md bg-rose text-white text-[10px] font-bold">
                      HLP
                    </span>
                    <div className="min-w-0">
                      <p className="text-dark dark:text-white">
                        <span className="font-semibold">Helios Pro</span>{" "}
                        <span className="text-dark-5 dark:text-dark-6">APP · just now</span>
                      </p>
                      <p className="mt-0.5 text-dark dark:text-white">
                        *{previewItem.item.label}*
                      </p>
                      <p className="text-dark-5 dark:text-dark-6">
                        {previewItem.item.hint}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {previewChannel === "digest" && (
                <div className="space-y-2 text-xs">
                  <p className="border-b border-stroke pb-2 text-sm font-semibold text-dark dark:border-dark-3 dark:text-white">
                    Your Helios Pro daily digest
                  </p>
                  <p className="text-dark-5 dark:text-dark-6">Today's alerts:</p>
                  <ul className="space-y-1.5 text-dark dark:text-white">
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {previewItem.item.label}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-blue" />
                      3 new mentions in comments
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent" />
                      Invoice INV-2025-0214 is ready
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-3 rounded-lg border border-stroke p-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
              <p className="font-medium text-dark dark:text-white">Previewing</p>
              <p>{previewItem.group.title} · {previewItem.item.label}</p>
              <p className="mt-1">Channel: {channelLabels[previewChannel]}</p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Channel summary" subtitle="How many rules each channel delivers." />
            <ul className="space-y-2">
              {allChannels.map((c) => {
                const count = groups.reduce(
                  (acc, g) => acc + g.items.filter((it) => it.enabled[c]).length,
                  0,
                );
                return (
                  <li
                    key={c}
                    className="flex items-center justify-between rounded-lg border border-stroke px-3 py-2 text-sm dark:border-dark-3"
                  >
                    <span className="flex items-center gap-2 text-dark-7 dark:text-dark-6">
                      <span className={`size-2 rounded-full ${channelDot[c]}`} />
                      {channelLabels[c]}
                    </span>
                    <Badge variant={channelBadge[c]} size="sm">{count} rules</Badge>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
