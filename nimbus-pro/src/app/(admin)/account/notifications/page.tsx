"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Switch } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Shield, User, CreditCard, Users, Megaphone, Moon, Mail, Bell, Smartphone,
  MessageSquare, Clock,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "security", label: "Security", icon: Shield, tone: "error",
    desc: "Critical account and security events",
    channels: [
      { id: "email", label: "Email", enabled: true },
      { id: "push", label: "Push", enabled: true },
      { id: "sms", label: "SMS", enabled: true },
      { id: "inapp", label: "In-app", enabled: true },
    ],
  },
  {
    id: "account", label: "Account", icon: User, tone: "brand",
    desc: "Profile, password, and settings changes",
    channels: [
      { id: "email", label: "Email", enabled: true },
      { id: "push", label: "Push", enabled: false },
      { id: "sms", label: "SMS", enabled: false },
      { id: "inapp", label: "In-app", enabled: true },
    ],
  },
  {
    id: "billing", label: "Billing", icon: CreditCard, tone: "warning",
    desc: "Invoices, payments, and subscription updates",
    channels: [
      { id: "email", label: "Email", enabled: true },
      { id: "push", label: "Push", enabled: false },
      { id: "sms", label: "SMS", enabled: false },
      { id: "inapp", label: "In-app", enabled: true },
    ],
  },
  {
    id: "team", label: "Team", icon: Users, tone: "purple",
    desc: "Mentions, assignments, and team activity",
    channels: [
      { id: "email", label: "Email", enabled: true },
      { id: "push", label: "Push", enabled: true },
      { id: "sms", label: "SMS", enabled: false },
      { id: "inapp", label: "In-app", enabled: true },
    ],
  },
  {
    id: "marketing", label: "Marketing", icon: Megaphone, tone: "pink",
    desc: "Tips, surveys, and product announcements",
    channels: [
      { id: "email", label: "Email", enabled: false },
      { id: "push", label: "Push", enabled: false },
      { id: "sms", label: "SMS", enabled: false },
      { id: "inapp", label: "In-app", enabled: false },
    ],
  },
];

const CHANNEL_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  email: Mail,
  push: Bell,
  sms: Smartphone,
  inapp: MessageSquare,
};

const TONE_BG: Record<string, string> = {
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
};

const RECENT = [
  { id: 1, title: "New sign-in from MacOS · Chrome", desc: "Mumbai, IN · 2 minutes ago", unread: true, tone: "error" },
  { id: 2, title: "Invoice #2041 was paid", desc: "$12,480.00 · 1 hour ago", unread: true, tone: "success" },
  { id: 3, title: "Priya Iyer mentioned you in a comment", desc: "On 'AI dashboard widgets' · 3 hours ago", unread: false, tone: "brand" },
  { id: 4, title: "Weekly digest is ready", desc: "12 new updates · Yesterday", unread: false, tone: "purple" },
];

export default function NotificationsPage() {
  const [cats, setCats] = useState(CATEGORIES.map((c) => ({ ...c, channels: c.channels.map((ch) => ({ ...ch })) })));
  const [dnd, setDnd] = useState(false);
  const [dndStart, setDndStart] = useState("22:00");
  const [dndEnd, setDndEnd] = useState("07:00");

  const toggle = (catId: string, chId: string) => {
    setCats((prev) => prev.map((c) => c.id === catId ? { ...c, channels: c.channels.map((ch) => ch.id === chId ? { ...ch, enabled: !ch.enabled } : ch) } : c));
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Notification Preferences"
        description="Choose how and when you want to be notified across channels."
        breadcrumbs={[{ label: "Account" }, { label: "Notifications" }]}
        actions={<Button variant="secondary">Reset to defaults</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {/* Category cards */}
          {cats.map((c) => (
            <Card key={c.id}>
              <CardBody className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", TONE_BG[c.tone])}>
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {c.channels.map((ch) => {
                    const Icon = CHANNEL_ICON[ch.id];
                    return (
                      <button
                        key={ch.id}
                        onClick={() => toggle(c.id, ch.id)}
                        className={cn("flex items-center justify-between rounded-lg border p-3 transition-colors",
                          ch.enabled ? "border-brand-300 bg-brand-50/40 dark:border-brand-700 dark:bg-brand-500/10" : "border-gray-200 dark:border-gray-800"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={cn("h-4 w-4", ch.enabled ? "text-brand-600 dark:text-brand-400" : "text-gray-400")} />
                          <span className={cn("text-xs font-semibold", ch.enabled ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>{ch.label}</span>
                        </div>
                        <Switch size="sm" checked={ch.enabled} onChange={() => toggle(c.id, ch.id)} />
                      </button>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card>
            <CardHeader title="Do Not Disturb" description="Pause non-critical notifications" />
            <CardBody className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", dnd ? "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400")}>
                    <Moon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Enable DND</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Silence non-urgent alerts</p>
                  </div>
                </div>
                <Switch checked={dnd} onChange={setDnd} />
              </div>
              {dnd && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Start</label>
                    <input type="time" defaultValue={dndStart} onChange={(e) => setDndStart(e.target.value)} className="input" />
                  </div>
                  <div>
                    <label className="label">End</label>
                    <input type="time" defaultValue={dndEnd} onChange={(e) => setDndEnd(e.target.value)} className="input" />
                  </div>
                </div>
              )}
              {dnd && (
                <div className="rounded-lg bg-purple-50 p-3 text-xs text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">
                  <Clock className="mb-1 h-3.5 w-3.5" />
                  DND active {dndStart} – {dndEnd} daily. Security alerts will still come through.
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Recent Notifications" description="Last 24 hours" action={<Button variant="ghost" size="sm">Mark all read</Button>} />
            <CardBody className="space-y-2">
              {RECENT.map((r) => (
                <div key={r.id} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <div className="mt-0.5">
                    {r.unread ? <span className="block h-2 w-2 rounded-full bg-brand-500" /> : <span className="block h-2 w-2 rounded-full bg-gray-200 dark:bg-gray-700" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm", r.unread ? "font-semibold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300")}>{r.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{r.desc}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
