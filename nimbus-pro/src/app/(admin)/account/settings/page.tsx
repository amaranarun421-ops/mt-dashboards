"use client";
import { useState } from "react";
import { PageHeader, Card, CardBody, Badge, Button, Input, Label, Select, Textarea, Switch, Avatar } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  User, Bell, Shield, Monitor, Key, AlertTriangle, Save,
  Smartphone, Trash2, Copy,
} from "lucide-react";

const TABS = [
  { id: "general", label: "General", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "sessions", label: "Sessions", icon: Monitor },
  { id: "api", label: "API Keys", icon: Key },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle },
];

const TIMEZONES = ["Asia/Kolkata (IST)", "America/New_York (EST)", "Europe/London (GMT)", "Asia/Tokyo (JST)", "Australia/Sydney (AEDT)"];
const LANGUAGES = ["English (US)", "English (UK)", "Español", "Français", "Deutsch", "日本語", "हिन्दी"];

const NOTIF_PREFS = [
  { id: "email_product", label: "Product updates", desc: "New features and improvements", email: true, push: true },
  { id: "email_security", label: "Security alerts", desc: "Sign-in attempts and account changes", email: true, push: true },
  { id: "email_marketing", label: "Marketing", desc: "Tips, surveys, and offers", email: false, push: false },
  { id: "email_team", label: "Team activity", desc: "Mentions, assignments, and comments", email: true, push: false },
];

const SESSIONS = [
  { id: 1, device: "MacOS · Chrome 119", location: "Mumbai, IN", ip: "103.21.42.18", last: "Active now", current: true },
  { id: 2, device: "iOS · Safari", location: "Mumbai, IN", ip: "103.21.42.18", last: "2 hours ago", current: false },
  { id: 3, device: "Windows · Edge", location: "Bengaluru, IN", ip: "49.36.82.4", last: "Yesterday", current: false },
];

const API_KEYS = [
  { id: 1, name: "Production", key: "np_live_••••••••4f2a", created: "Mar 12, 2026", lastUsed: "2m ago" },
  { id: 2, name: "Staging", key: "np_test_••••••••91c0", created: "Jan 04, 2026", lastUsed: "1h ago" },
  { id: 3, name: "CI/CD", key: "np_test_••••••••3b7d", created: "Dec 18, 2025", lastUsed: "Yesterday" },
];

export default function SettingsPage() {
  const [active, setActive] = useState("general");
  const [prefs, setPrefs] = useState(NOTIF_PREFS);
  const [twoFactor, setTwoFactor] = useState(true);
  const [digestEmail, setDigestEmail] = useState(true);

  const updatePref = (id: string, channel: "email" | "push", v: boolean) => {
    setPrefs((p) => p.map((x) => (x.id === id ? { ...x, [channel]: v } : x)));
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Account Settings"
        description="Manage your account preferences, security, and connected services."
        breadcrumbs={[{ label: "Account" }, { label: "Settings" }]}
        actions={<Button><Save className="h-4 w-4" /> Save changes</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sidebar tabs */}
        <aside>
          <Card className="p-2">
            <nav className="space-y-0.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active === t.id
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <t.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{t.label}</span>
                  {t.id === "danger" && <span className="h-1.5 w-1.5 rounded-full bg-error-500" />}
                </button>
              ))}
            </nav>
          </Card>
        </aside>

        {/* Content */}
        <div className="space-y-4">
          {active === "general" && (
            <>
              <Card>
                <div className="border-b border-gray-100 p-5 dark:border-gray-800">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">General</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Update your account information and preferences</p>
                </div>
                <CardBody className="space-y-5">
                  <div className="flex items-center gap-4">
                    <Avatar name="Aaroh Sharma" size={72} />
                    <div className="space-y-1">
                      <Button variant="secondary" size="sm">Change avatar</Button>
                      <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG or GIF · Max 2MB</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label required>Full name</Label>
                      <Input defaultValue="Aaroh Sharma" />
                    </div>
                    <div>
                      <Label required>Username</Label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">@</span>
                        <Input defaultValue="aaroh" className="pl-7" />
                      </div>
                    </div>
                    <div>
                      <Label required>Email address</Label>
                      <Input type="email" defaultValue="aaroh.sharma@nimbuspro.io" />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input defaultValue="+91 98200 41122" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label>Bio</Label>
                      <Textarea defaultValue="Principal product designer leading the Nimbus Pro design system." />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">84 / 200 characters</p>
                    </div>
                    <div>
                      <Label>Timezone</Label>
                      <Select defaultValue={TIMEZONES[0]}>
                        {TIMEZONES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </Select>
                    </div>
                    <div>
                      <Label>Language</Label>
                      <Select defaultValue={LANGUAGES[0]}>
                        {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Weekly digest email</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get a summary of activity every Monday at 9am</p>
                    </div>
                    <Switch checked={digestEmail} onChange={setDigestEmail} />
                  </div>
                </CardBody>
              </Card>
            </>
          )}

          {active === "notifications" && (
            <Card>
              <div className="border-b border-gray-100 p-5 dark:border-gray-800">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Choose what you want to be notified about</p>
              </div>
              <CardBody className="p-0">
                <div className="grid grid-cols-[1fr_80px_80px] gap-3 border-b border-gray-100 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:border-gray-800">
                  <div>Category</div>
                  <div className="text-center">Email</div>
                  <div className="text-center">Push</div>
                </div>
                {prefs.map((p) => (
                  <div key={p.id} className="grid grid-cols-[1fr_80px_80px] items-center gap-3 border-b border-gray-100 px-5 py-4 last:border-0 dark:border-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>
                    </div>
                    <div className="flex justify-center"><Switch size="sm" checked={p.email} onChange={(v) => updatePref(p.id, "email", v)} /></div>
                    <div className="flex justify-center"><Switch size="sm" checked={p.push} onChange={(v) => updatePref(p.id, "push", v)} /></div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {active === "security" && (
            <>
              <Card>
                <div className="border-b border-gray-100 p-5 dark:border-gray-800">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Password</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last changed 2 months ago</p>
                </div>
                <CardBody className="space-y-4">
                  <div>
                    <Label required>Current password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label required>New password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <Label required>Confirm new password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  <Button>Update password</Button>
                </CardBody>
              </Card>

              <Card>
                <div className="border-b border-gray-100 p-5 dark:border-gray-800">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Two-factor authentication</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <CardBody>
                  <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Authenticator app</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Use Google Authenticator or 1Password</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge tone={twoFactor ? "success" : "gray"} variant="soft" dot>{twoFactor ? "Enabled" : "Disabled"}</Badge>
                      <Switch checked={twoFactor} onChange={setTwoFactor} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          )}

          {active === "sessions" && (
            <Card>
              <div className="border-b border-gray-100 p-5 dark:border-gray-800">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Active sessions</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Devices currently signed in to your account</p>
              </div>
              <CardBody className="space-y-3">
                {SESSIONS.map((s) => (
                  <div key={s.id} className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        <Monitor className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {s.device}
                          {s.current && <Badge tone="success" variant="soft" className="ml-2">This device</Badge>}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{s.location} · {s.ip} · {s.last}</p>
                      </div>
                    </div>
                    {!s.current && <Button variant="outline" size="sm">Revoke</Button>}
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {active === "api" && (
            <Card>
              <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-gray-800">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">API Keys</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Manage tokens used to authenticate API requests</p>
                </div>
                <Button size="sm">Generate new key</Button>
              </div>
              <CardBody className="p-0">
                {API_KEYS.map((k) => (
                  <div key={k.id} className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{k.name}</p>
                      <p className="font-mono text-xs text-gray-500 dark:text-gray-400">{k.key}</p>
                      <p className="mt-0.5 text-xs text-gray-400">Created {k.created} · Last used {k.lastUsed}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm"><Copy className="h-3.5 w-3.5" /> Copy</Button>
                      <Button variant="ghost" size="sm" className="text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"><Trash2 className="h-3.5 w-3.5" /> Revoke</Button>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          {active === "danger" && (
            <Card className="border-error-200 dark:border-error-500/20">
              <div className="border-b border-error-100 bg-error-50/40 p-5 dark:border-error-500/20 dark:bg-error-500/5">
                <h3 className="text-base font-semibold text-error-700 dark:text-error-400">Danger Zone</h3>
                <p className="text-xs text-error-600/80 dark:text-error-400/80">Irreversible account actions — proceed with caution</p>
              </div>
              <CardBody className="space-y-4">
                <div className="flex flex-col gap-3 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Export account data</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Download all your data as a ZIP archive</p>
                  </div>
                  <Button variant="outline" size="sm">Request export</Button>
                </div>
                <div className="flex flex-col gap-3 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Transfer ownership</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Transfer this workspace to another admin</p>
                  </div>
                  <Button variant="outline" size="sm">Transfer</Button>
                </div>
                <div className="flex flex-col gap-3 rounded-lg border border-error-200 bg-error-50/30 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-error-500/20 dark:bg-error-500/5">
                  <div>
                    <p className="text-sm font-semibold text-error-700 dark:text-error-400">Delete account</p>
                    <p className="text-xs text-error-600/80 dark:text-error-400/80">Permanently delete your account and all associated data</p>
                  </div>
                  <Button variant="danger" size="sm"><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
