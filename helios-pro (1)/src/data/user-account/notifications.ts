export type NotificationChannel = "email" | "push" | "sms" | "slack" | "digest";

export type NotificationGroup = {
  id: string;
  title: string;
  description: string;
  channels: NotificationChannel[];
  items: NotificationItem[];
};

export type NotificationItem = {
  id: string;
  label: string;
  hint: string;
  // channel -> enabled
  enabled: Record<NotificationChannel, boolean>;
};

export const channelLabels: Record<NotificationChannel, string> = {
  email: "Email",
  push: "Push",
  sms: "SMS",
  slack: "Slack",
  digest: "Daily digest",
};

export const channelColors: Record<NotificationChannel, "primary" | "accent" | "violet" | "info" | "rose" | "neutral"> = {
  email: "primary",
  push: "violet",
  sms: "accent",
  slack: "rose",
  digest: "info",
};

export const notificationGroups: NotificationGroup[] = [
  {
    id: "security",
    title: "Security & account",
    description: "Critical alerts about sign-ins, devices and account changes.",
    channels: ["email", "push", "sms", "slack"],
    items: [
      {
        id: "SEC-1",
        label: "New device sign-in",
        hint: "Whenever a new device or browser signs into your account.",
        enabled: { email: true, push: true, sms: true, slack: false, digest: false },
      },
      {
        id: "SEC-2",
        label: "Failed sign-in attempts",
        hint: "After 3+ failed attempts from a new location.",
        enabled: { email: true, push: true, sms: false, slack: false, digest: false },
      },
      {
        id: "SEC-3",
        label: "Password or 2FA changes",
        hint: "When your password or 2FA settings are changed.",
        enabled: { email: true, push: true, sms: true, slack: false, digest: false },
      },
      {
        id: "SEC-4",
        label: "API token created or revoked",
        hint: "When a new API token is issued or revoked from your workspace.",
        enabled: { email: true, push: false, sms: false, slack: true, digest: true },
      },
    ],
  },
  {
    id: "team",
    title: "Team & collaboration",
    description: "Mentions, assignments and changes to your team.",
    channels: ["email", "push", "slack", "digest"],
    items: [
      {
        id: "TEAM-1",
        label: "Mentions in comments",
        hint: "When someone @-mentions you in a comment, task or note.",
        enabled: { email: true, push: true, sms: false, slack: true, digest: false },
      },
      {
        id: "TEAM-2",
        label: "Task assignments",
        hint: "When a task is assigned to you or one you own is updated.",
        enabled: { email: true, push: true, sms: false, slack: false, digest: true },
      },
      {
        id: "TEAM-3",
        label: "New team member joins",
        hint: "When a new member accepts their invite to the workspace.",
        enabled: { email: true, push: false, sms: false, slack: true, digest: false },
      },
      {
        id: "TEAM-4",
        label: "Role or permission changes",
        hint: "When your role or any permission set is modified.",
        enabled: { email: true, push: true, sms: false, slack: false, digest: true },
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & usage",
    description: "Invoices, plan changes and quota warnings.",
    channels: ["email", "push", "slack", "digest"],
    items: [
      {
        id: "BIL-1",
        label: "New invoice ready",
        hint: "When a new invoice is generated at the start of each cycle.",
        enabled: { email: true, push: false, sms: false, slack: false, digest: true },
      },
      {
        id: "BIL-2",
        label: "Payment failed",
        hint: "When a charge fails and a retry is scheduled.",
        enabled: { email: true, push: true, sms: true, slack: false, digest: false },
      },
      {
        id: "BIL-3",
        label: "Usage quota at 80%",
        hint: "When you cross 80% of any monthly quota (API calls, storage, etc.).",
        enabled: { email: true, push: true, sms: false, slack: true, digest: true },
      },
      {
        id: "BIL-4",
        label: "Plan upgrade or downgrade",
        hint: "When your plan is changed by an administrator.",
        enabled: { email: true, push: true, sms: false, slack: false, digest: false },
      },
    ],
  },
  {
    id: "product",
    title: "Product & releases",
    description: "New features, changelog posts and product announcements.",
    channels: ["email", "push", "slack", "digest"],
    items: [
      {
        id: "PRD-1",
        label: "New release notes",
        hint: "When Helios Pro ships a new release with a changelog post.",
        enabled: { email: true, push: false, sms: false, slack: true, digest: true },
      },
      {
        id: "PRD-2",
        label: "Product announcements",
        hint: "Occasional announcements about major changes and betas.",
        enabled: { email: true, push: false, sms: false, slack: false, digest: true },
      },
      {
        id: "PRD-3",
        label: "Maintenance windows",
        hint: "Scheduled downtime that may affect your team's workflow.",
        enabled: { email: true, push: true, sms: false, slack: true, digest: false },
      },
    ],
  },
];

export const notificationStats = {
  groups: notificationGroups.length,
  rules: notificationGroups.reduce((acc, g) => acc + g.items.length, 0),
  channels: Object.keys(channelLabels).length,
  quietHours: "22:00 — 07:00 IST",
};
