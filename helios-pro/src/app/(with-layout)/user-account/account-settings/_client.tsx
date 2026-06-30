"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Modal } from "@/components/shared/modal";
import { SettingsPanel } from "@/components/shared/settings-panel";
import {
  FormSection,
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  User,
  ToggleIcon,
  BellIcon,
  AlertIcon,
  CheckSquareIcon,
  LockIcon,
} from "@/components/Layouts/sidebar/icons";

type Pref = {
  id: string;
  label: string;
  hint: string;
  value: boolean;
};

type Notif = {
  id: string;
  label: string;
  hint: string;
  email: boolean;
  push: boolean;
  digest: boolean;
};

export default function AccountSettingsClient() {
  const [general, setGeneral] = useState({
    name: "Aarav Mehta",
    handle: "aarav",
    email: "aarav.mehta@heliospro.io",
    phone: "+91 98765 43210",
    language: "English (US)",
    timezone: "Asia / Kolkata (IST · UTC+5:30)",
    company: "Helios Pro, Inc.",
    role: "Founder & CEO",
  });

  const [prefs, setPrefs] = useState<Pref[]>([
    { id: "P1", label: "Compact mode", hint: "Reduce padding and font sizes across the dashboard.", value: false },
    { id: "P2", label: "Show keyboard shortcuts hint", hint: "Display a small hint banner with ⌘K shortcuts.", value: true },
    { id: "P3", label: "Animated charts", hint: "Animate chart transitions on first load.", value: true },
    { id: "P4", label: "Beta features", hint: "Get early access to features still in development.", value: true },
    { id: "P5", label: "Auto-save drafts", hint: "Save form and editor drafts every 30 seconds.", value: true },
    { id: "P6", label: "Confirm before delete", hint: "Always ask before deleting any record.", value: true },
  ]);

  const [notif, setNotif] = useState<Notif[]>([
    { id: "N1", label: "New device sign-in", hint: "When your account is accessed from a new device.", email: true, push: true, digest: false },
    { id: "N2", label: "Mentions in comments", hint: "When someone @-mentions you in a comment.", email: true, push: true, digest: true },
    { id: "N3", label: "Task due in 24h", hint: "When a task assigned to you is due within 24 hours.", email: false, push: true, digest: true },
    { id: "N4", label: "Weekly digest", hint: "A summary of activity every Monday at 09:00 local time.", email: true, push: false, digest: true },
    { id: "N5", label: "Product news", hint: "Occasional updates about new Helios Pro features.", email: true, push: false, digest: false },
  ]);

  const [dangerOpen, setDangerOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const togglePref = (id: string) =>
    setPrefs((arr) => arr.map((p) => (p.id === id ? { ...p, value: !p.value } : p)));

  const toggleNotif = (id: string, key: "email" | "push" | "digest") =>
    setNotif((arr) =>
      arr.map((n) => (n.id === id ? { ...n, [key]: !n[key] } : n)),
    );

  return (
    <div>
      <PageHeader
        title="Account settings"
        description="Manage your profile, preferences, notifications and account lifecycle."
        breadcrumbs={[{ label: "User & Account" }, { label: "Account settings" }]}
      />

      <SettingsPanel
        defaultPanel="general"
        panels={[
          {
            id: "general",
            label: "General",
            icon: <User className="size-4" />,
            content: (
              <FormSection
                title="General information"
                description="Your basic profile information used across Helios Pro."
                columns={2}
              >
                <FormField label="Full name" htmlFor="g-name">
                  <input
                    id="g-name"
                    className={inputClass}
                    value={general.name}
                    onChange={(e) => setGeneral({ ...general, name: e.target.value })}
                  />
                </FormField>
                <FormField label="Username" htmlFor="g-handle" hint="Your unique handle on Helios Pro.">
                  <input
                    id="g-handle"
                    className={inputClass}
                    value={general.handle}
                    onChange={(e) => setGeneral({ ...general, handle: e.target.value })}
                  />
                </FormField>
                <FormField label="Email" htmlFor="g-email">
                  <input
                    id="g-email"
                    type="email"
                    className={inputClass}
                    value={general.email}
                    onChange={(e) => setGeneral({ ...general, email: e.target.value })}
                  />
                </FormField>
                <FormField label="Phone" htmlFor="g-phone">
                  <input
                    id="g-phone"
                    className={inputClass}
                    value={general.phone}
                    onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
                  />
                </FormField>
                <FormField label="Company" htmlFor="g-company">
                  <input
                    id="g-company"
                    className={inputClass}
                    value={general.company}
                    onChange={(e) => setGeneral({ ...general, company: e.target.value })}
                  />
                </FormField>
                <FormField label="Role / title" htmlFor="g-role">
                  <input
                    id="g-role"
                    className={inputClass}
                    value={general.role}
                    onChange={(e) => setGeneral({ ...general, role: e.target.value })}
                  />
                </FormField>
                <FormField label="Language" htmlFor="g-lang">
                  <select
                    id="g-lang"
                    className={inputClass}
                    value={general.language}
                    onChange={(e) => setGeneral({ ...general, language: e.target.value })}
                  >
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Español</option>
                    <option>Français</option>
                    <option>Deutsch</option>
                    <option>日本語</option>
                    <option>हिन्दी</option>
                  </select>
                </FormField>
                <FormField label="Timezone" htmlFor="g-tz">
                  <select
                    id="g-tz"
                    className={inputClass}
                    value={general.timezone}
                    onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                  >
                    <option>Asia / Kolkata (IST · UTC+5:30)</option>
                    <option>America / New_York (EST · UTC-5)</option>
                    <option>Europe / London (GMT · UTC+0)</option>
                    <option>Asia / Tokyo (JST · UTC+9)</option>
                    <option>Australia / Sydney (AEDT · UTC+11)</option>
                  </select>
                </FormField>
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-3 rounded-xl border border-stroke bg-gray-2 p-4 dark:border-dark-3 dark:bg-dark-2">
                    <Avatar name={general.name} src="/images/user/user-01.png" size="lg" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-dark dark:text-white">
                        Profile photo
                      </p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">
                        PNG, JPG or GIF up to 4 MB. Recommended 400×400px.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Upload</Button>
                  </div>
                </div>
                <div className="sm:col-span-2 flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>
                    <CheckSquareIcon className="size-4" />
                    Save changes
                  </Button>
                </div>
              </FormSection>
            ),
          },
          {
            id: "preferences",
            label: "Preferences",
            icon: <ToggleIcon className="size-4" />,
            content: (
              <FormSection
                title="Workspace preferences"
                description="Fine-tune how Helios Pro looks and behaves for you."
                columns={1}
              >
                <ul className="divide-y divide-stroke dark:divide-dark-3">
                  {prefs.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-dark dark:text-white">
                          {p.label}
                        </p>
                        <p className="text-xs text-dark-5 dark:text-dark-6">{p.hint}</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={p.value}
                        onClick={() => togglePref(p.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                          p.value
                            ? "bg-primary"
                            : "bg-gray-3 dark:bg-dark-3"
                        }`}
                      >
                        <span
                          className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                            p.value ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">Reset</Button>
                  <Button>
                    <CheckSquareIcon className="size-4" />
                    Save preferences
                  </Button>
                </div>
              </FormSection>
            ),
          },
          {
            id: "notifications",
            label: "Notifications",
            icon: <BellIcon className="size-4" />,
            content: (
              <Card>
                <CardHeader
                  title="Notification channels"
                  subtitle="Pick which events reach your inbox, device or weekly digest."
                  action={<Badge variant="info">{notif.filter((n) => n.email || n.push).length} active</Badge>}
                />
                <div className="overflow-hidden rounded-xl border border-stroke dark:border-dark-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-2 text-left text-xs uppercase tracking-wider text-dark-5 dark:bg-dark-2 dark:text-dark-6">
                        <th className="px-4 py-3">Event</th>
                        <th className="px-4 py-3 text-center">Email</th>
                        <th className="px-4 py-3 text-center">Push</th>
                        <th className="px-4 py-3 text-center">Digest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notif.map((n) => (
                        <tr
                          key={n.id}
                          className="border-t border-stroke dark:border-dark-3"
                        >
                          <td className="px-4 py-3">
                            <p className="font-medium text-dark dark:text-white">{n.label}</p>
                            <p className="text-xs text-dark-5 dark:text-dark-6">{n.hint}</p>
                          </td>
                          {(["email", "push", "digest"] as const).map((k) => (
                            <td key={k} className="px-4 py-3 text-center">
                              <button
                                type="button"
                                onClick={() => toggleNotif(n.id, k)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                  n[k] ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"
                                }`}
                                aria-pressed={n[k]}
                                aria-label={`${n.label} ${k}`}
                              >
                                <span
                                  className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                                    n[k] ? "translate-x-5" : "translate-x-0.5"
                                  }`}
                                />
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline">Reset to defaults</Button>
                  <Button>
                    <CheckSquareIcon className="size-4" />
                    Save notifications
                  </Button>
                </div>
              </Card>
            ),
          },
          {
            id: "danger",
            label: "Danger zone",
            icon: <AlertIcon className="size-4" />,
            content: (
              <Card className="border-red/40 dark:border-red/30">
                <CardHeader
                  title="Danger zone"
                  subtitle="These actions are permanent and cannot be undone."
                />
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 rounded-xl border border-stroke p-4 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-dark dark:text-white">
                        Export account data
                      </p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">
                        Download a ZIP of everything Helios Pro knows about your account.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Request export</Button>
                  </div>
                  <div className="flex flex-col gap-3 rounded-xl border border-stroke p-4 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-dark dark:text-white">
                        Pause account
                      </p>
                      <p className="text-xs text-dark-5 dark:text-dark-6">
                        Temporarily disable sign-in and stop all notifications.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Pause account</Button>
                  </div>
                  <div className="flex flex-col gap-3 rounded-xl border border-red/40 bg-red-light-5/40 p-4 dark:bg-red/10 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-red-dark dark:text-red-light">
                        <LockIcon className="size-4" />
                        Delete account
                      </p>
                      <p className="text-xs text-red-dark/80 dark:text-red-light/80">
                        Permanently delete your account, workspace and all data. This cannot be undone.
                      </p>
                    </div>
                    <Button variant="danger" size="sm" onClick={() => setDangerOpen(true)}>
                      Delete account
                    </Button>
                  </div>
                </div>
              </Card>
            ),
          },
        ]}
      />

      <Modal
        open={dangerOpen}
        onClose={() => setDangerOpen(false)}
        title="Delete account"
        description="This will permanently delete your Helios Pro account and all associated data."
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDangerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={confirmText !== "DELETE"}
              onClick={() => setDangerOpen(false)}
            >
              Permanently delete
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-red/40 bg-red-light-5/40 p-3 text-xs text-red-dark dark:bg-red/10 dark:text-red-light">
            You will lose access to all dashboards, projects, tasks and integrations. Other admins
            on the workspace will retain their data.
          </div>
          <FormField
            label='Type "DELETE" to confirm'
            htmlFor="confirm-delete"
            error={confirmText && confirmText !== "DELETE" ? "Please type DELETE in uppercase." : undefined}
          >
            <input
              id="confirm-delete"
              className={inputClass}
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
            />
          </FormField>
        </div>
      </Modal>
    </div>
  );
}
