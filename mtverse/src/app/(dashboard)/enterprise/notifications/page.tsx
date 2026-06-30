"use client";

import * as React from "react";
import { useState } from "react";
import {
  Bell, Check, CheckCheck, MessageSquare, AtSign, Settings2, AlertTriangle,
  GitPullRequest, ShoppingCart, UserPlus, FileText, Sparkles, Building2,
  Shield, CreditCard, Trash2, MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader, StatCard, SectionCard, EmptyState } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Notification = {
  id: string;
  category: "mention" | "system" | "pr" | "order" | "team" | "billing" | "security";
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  actor?: { name: string; initials: string };
};

const initialNotifications: Notification[] = [
  { id: "n1", category: "mention", icon: AtSign, iconColor: "text-violet-600", iconBg: "bg-violet-500/10", title: "Priya Sharma mentioned you", description: "@alex Can you review the Q4 OKR doc before our sync at 3pm? Added new KRs around customer retention.", time: "5 min ago", read: false, actor: { name: "Priya Sharma", initials: "PS" } },
  { id: "n2", category: "pr", icon: GitPullRequest, iconColor: "text-sky-600", iconBg: "bg-sky-500/10", title: "PR #1248 ready for review", description: "Marcus Chen opened a pull request: 'Add PKCE flow to OAuth2 authentication'", time: "18 min ago", read: false, actor: { name: "Marcus Chen", initials: "MC" } },
  { id: "n3", category: "security", icon: Shield, iconColor: "text-destructive", iconBg: "bg-destructive/10", title: "New login from unrecognized device", description: "Login detected from a MacBook Pro in Berlin, DE. If this wasn't you, please secure your account.", time: "1 hour ago", read: false },
  { id: "n4", category: "order", icon: ShoppingCart, iconColor: "text-success", iconBg: "bg-success/10", title: "New order #ORD-7821 received", description: "Acme Corp placed an order for 3 MTVerse Pro licenses — total $4,280. Payment processed.", time: "2 hours ago", read: false },
  { id: "n5", category: "team", icon: UserPlus, iconColor: "text-info", iconBg: "bg-info/10", title: "Daniel Kim joined the team", description: "Daniel Kim accepted your invitation and is now part of the Engineering team.", time: "3 hours ago", read: true, actor: { name: "Daniel Kim", initials: "DK" } },
  { id: "n6", category: "system", icon: Sparkles, iconColor: "text-primary", iconBg: "bg-primary/10", title: "New feature: AI-powered insights", description: "We've shipped AI insights across all dashboards. Try it out and let us know what you think!", time: "5 hours ago", read: true },
  { id: "n7", category: "billing", icon: CreditCard, iconColor: "text-amber-600", iconBg: "bg-amber-500/10", title: "Payment method expiring soon", description: "Your Visa card ending in 4242 expires next month. Update your payment method to avoid disruption.", time: "Yesterday", read: true },
  { id: "n8", category: "mention", icon: AtSign, iconColor: "text-violet-600", iconBg: "bg-violet-500/10", title: "Sarah Williams mentioned you in a comment", description: "@alex The new design for the analytics dashboard looks great! Just one note on the color palette.", time: "Yesterday", read: true, actor: { name: "Sarah Williams", initials: "SW" } },
  { id: "n9", category: "system", icon: Building2, iconColor: "text-muted-foreground", iconBg: "bg-muted", title: "Scheduled maintenance window", description: "MTVerse will undergo scheduled maintenance on Sunday, Oct 27 from 2-4 AM UTC. Expect brief downtime.", time: "2 days ago", read: true },
  { id: "n10", category: "pr", icon: GitPullRequest, iconColor: "text-sky-600", iconBg: "bg-sky-500/10", title: "Your PR was merged", description: "PR #1242 'Update dashboard charts with dark mode support' was merged into main by Lena Park.", time: "2 days ago", read: true, actor: { name: "Lena Park", initials: "LP" } },
  { id: "n11", category: "security", icon: Shield, iconColor: "text-success", iconBg: "bg-success/10", title: "Two-factor authentication enabled", description: "You've successfully enabled 2FA. Your account is now more secure.", time: "3 days ago", read: true },
  { id: "n12", category: "team", icon: FileText, iconColor: "text-fuchsia-600", iconBg: "bg-fuchsia-500/10", title: "Jordan Reyes shared a document with you", description: "Q4 Marketing Campaign brief has been shared. You have edit access.", time: "4 days ago", read: true, actor: { name: "Jordan Reyes", initials: "JR" } },
];

const tabFilters = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "mention", label: "Mentions" },
  { key: "system", label: "System" },
];

const prefCategories = [
  {
    title: "Activity",
    items: [
      { id: "mentions", label: "Mentions", desc: "When someone @mentions you in a comment or document", enabled: true },
      { id: "comments", label: "Comments on your content", desc: "Replies to your posts, documents, and tasks", enabled: true },
      { id: "assign", label: "Task assignments", desc: "When a task is assigned to you", enabled: true },
      { id: "review", label: "Review requests", desc: "Pull requests and documents sent for your review", enabled: true },
    ],
  },
  {
    title: "Workspace",
    items: [
      { id: "team", label: "Team changes", desc: "Members joining, leaving, or changing roles", enabled: true },
      { id: "integration", label: "Integration updates", desc: "Connected apps and webhook deliveries", enabled: false },
      { id: "billing", label: "Billing & subscription", desc: "Invoices, payment failures, and plan changes", enabled: true },
      { id: "system", label: "System announcements", desc: "Product updates and maintenance windows", enabled: true },
    ],
  },
  {
    title: "Security",
    items: [
      { id: "login", label: "New device login", desc: "Sign-ins from unrecognized devices or locations", enabled: true },
      { id: "2fa", label: "2FA changes", desc: "When 2FA is enabled, disabled, or modified", enabled: true },
      { id: "apikeys", label: "API key activity", desc: "API key creation, revocation, or suspicious usage", enabled: true },
      { id: "permissions", label: "Permission changes", desc: "Changes to your role or access level", enabled: true },
    ],
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [tab, setTab] = useState("all");
  const [prefs, setPrefs] = useState(() =>
    prefCategories.reduce<Record<string, boolean>>((acc, c) => {
      c.items.forEach((i) => (acc[i.id] = i.enabled));
      return acc;
    }, {})
  );

  const filtered = notifications.filter((n) => {
    if (tab === "unread") return !n.read;
    if (tab === "mention") return n.category === "mention";
    if (tab === "system") return n.category === "system";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const remove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification dismissed");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay on top of mentions, team activity, security alerts, and system announcements."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Notifications" }]}
        actions={
          <Button variant="outline" size="sm" className="h-9" onClick={markAllRead} disabled={unreadCount === 0}>
            <CheckCheck className="size-4 mr-2" /> Mark all as read
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Unread" value={unreadCount} icon={<Bell className="size-5" />} deltaLabel="across all channels" />
        <StatCard label="Mentions" value={notifications.filter((n) => n.category === "mention").length} icon={<AtSign className="size-5" />} deltaLabel="this week" />
        <StatCard label="Security Alerts" value={notifications.filter((n) => n.category === "security").length} icon={<Shield className="size-5" />} deltaLabel="all reviewed" />
        <StatCard label="Avg Response" value="4.2 min" icon={<Check className="size-5" />} delta={-12} deltaLabel="faster than last week" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SectionCard
            title="Inbox"
            description={`${filtered.length} notifications`}
            noBodyPadding
            actions={
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="h-8">
                  {tabFilters.map((t) => (
                    <TabsTrigger key={t.key} value={t.key} className="text-xs h-6">
                      {t.label}
                      {t.key === "unread" && unreadCount > 0 && (
                        <Badge className="ml-1.5 h-4 px-1 text-[10px]">{unreadCount}</Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            }
          >
            {filtered.length === 0 ? (
              <EmptyState
                icon={<Bell className="size-7" />}
                title="You're all caught up"
                description="No notifications in this view. New activity will appear here."
              />
            ) : (
              <div className="divide-y divide-border max-h-[640px] overflow-y-auto">
                {filtered.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-4 hover:bg-accent/40 transition-colors ${!n.read ? "bg-primary/[0.03]" : ""}`}
                  >
                    <div className={`flex size-9 items-center justify-center rounded-lg ${n.iconBg} ${n.iconColor} shrink-0`}>
                      <n.icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                        {!n.read && <span className="size-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {n.actor && (
                          <Avatar className="size-5">
                            <AvatarFallback className="text-[9px] bg-muted text-muted-foreground">{n.actor.initials}</AvatarFallback>
                          </Avatar>
                        )}
                        <span className="text-xs text-muted-foreground">{n.time}</span>
                        {!n.read && (
                          <Button
                            variant="ghost" size="sm" className="h-6 px-2 text-xs ml-auto"
                            onClick={() => markRead(n.id)}
                          >
                            <Check className="size-3 mr-1" /> Mark read
                          </Button>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7 shrink-0">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => markRead(n.id)} disabled={n.read}>
                          <Check className="size-4 mr-2" /> Mark as read
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Muted this conversation")}>
                          <Bell className="size-4 mr-2" /> Mute thread
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => remove(n.id)}>
                          <Trash2 className="size-4 mr-2" /> Dismiss
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <SectionCard title="Preferences" description="Choose what you want to be notified about">
          <div className="space-y-5 max-h-[640px] overflow-y-auto pr-1">
            {prefCategories.map((cat) => (
              <div key={cat.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Settings2 className="size-3.5" /> {cat.title}
                </h4>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3">
                      <div className="space-y-0.5 flex-1">
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={prefs[item.id]}
                        onCheckedChange={(c) => {
                          setPrefs((p) => ({ ...p, [item.id]: c }));
                          toast.success(`${item.label} ${c ? "enabled" : "disabled"}`);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-border space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="size-3.5" /> Delivery channels
              </h4>
              {[
                { label: "Email digest (daily)", enabled: true },
                { label: "Push notifications", enabled: true },
                { label: "Mobile push", enabled: false },
                { label: "Slack integration", enabled: true },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between">
                  <span className="text-sm">{c.label}</span>
                  <Switch defaultChecked={c.enabled} />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
