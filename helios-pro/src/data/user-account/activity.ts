export type ActivityCategory =
  | "Auth"
  | "Members"
  | "Billing"
  | "Content"
  | "Settings"
  | "Security"
  | "Integrations";

export type ActivitySeverity = "info" | "success" | "warning" | "danger";

export type ActivityLogEntry = {
  id: string;
  actor: string;
  category: ActivityCategory;
  action: string;
  target: string;
  ip: string;
  device: string;
  location: string;
  timestamp: string;
  severity: ActivitySeverity;
};

export const activityLog: ActivityLogEntry[] = [
  {
    id: "LOG-2041",
    actor: "Aarav Mehta",
    category: "Security",
    action: "Enabled two-factor authentication",
    target: "Own account",
    ip: "203.0.113.42",
    device: "MacBook Pro · Chrome 128",
    location: "Bengaluru, IN",
    timestamp: "2025-02-14 09:42:11",
    severity: "success",
  },
  {
    id: "LOG-2040",
    actor: "Priya Nair",
    category: "Members",
    action: "Invited new member to workspace",
    target: "marcus.hale@heliospro.io",
    ip: "203.0.113.18",
    device: "MacBook Air · Safari 17",
    location: "Bengaluru, IN",
    timestamp: "2025-02-14 09:14:02",
    severity: "info",
  },
  {
    id: "LOG-2039",
    actor: "System",
    category: "Billing",
    action: "Invoice generated for Feb 2025",
    target: "INV-2025-0214",
    ip: "—",
    device: "Helios Pro Billing Service",
    location: "—",
    timestamp: "2025-02-14 00:00:00",
    severity: "info",
  },
  {
    id: "LOG-2038",
    actor: "Daniel Okoro",
    category: "Settings",
    action: "Updated workspace export policy",
    target: "Operations workspace",
    ip: "102.89.23.10",
    device: "Windows 11 · Edge 122",
    location: "Lagos, NG",
    timestamp: "2025-02-13 18:25:43",
    severity: "warning",
  },
  {
    id: "LOG-2037",
    actor: "Sofia Marquez",
    category: "Content",
    action: "Published campaign landing page",
    target: "Spring Collection 2025",
    ip: "188.44.10.7",
    device: "MacBook Pro · Firefox 124",
    location: "Madrid, ES",
    timestamp: "2025-02-13 16:02:19",
    severity: "success",
  },
  {
    id: "LOG-2036",
    actor: "Unknown",
    category: "Auth",
    action: "Failed sign-in attempt (wrong password)",
    target: "emma.larsen@heliospro.io",
    ip: "45.227.18.92",
    device: "Unknown · Chrome 128",
    location: "Unknown",
    timestamp: "2025-02-13 14:11:55",
    severity: "danger",
  },
  {
    id: "LOG-2035",
    actor: "Emma Larsen",
    category: "Billing",
    action: "Updated payment method on file",
    target: "Visa ending 4421",
    ip: "84.215.10.6",
    device: "iPhone 15 · Safari 17",
    location: "Oslo, NO",
    timestamp: "2025-02-13 11:48:32",
    severity: "info",
  },
  {
    id: "LOG-2034",
    actor: "Liam O'Connor",
    category: "Integrations",
    action: "Revoked connected app access",
    target: "Slack",
    ip: "34.247.224.91",
    device: "MacBook Air · Chrome 128",
    location: "Dublin, IE",
    timestamp: "2025-02-13 09:30:11",
    severity: "warning",
  },
  {
    id: "LOG-2033",
    actor: "Yuki Tanaka",
    category: "Content",
    action: "Deleted 3 draft design assets",
    target: "Q1 brand refresh",
    ip: "202.45.10.22",
    device: "iMac · Chrome 128",
    location: "Tokyo, JP",
    timestamp: "2025-02-12 22:14:08",
    severity: "danger",
  },
  {
    id: "LOG-2032",
    actor: "Priya Nair",
    category: "Members",
    action: "Changed member role from Editor to Manager",
    target: "Sofia Marquez",
    ip: "203.0.113.18",
    device: "MacBook Air · Safari 17",
    location: "Bengaluru, IN",
    timestamp: "2025-02-12 17:51:39",
    severity: "info",
  },
  {
    id: "LOG-2031",
    actor: "Aarav Mehta",
    category: "Security",
    action: "Revoked active session",
    target: "iPad Pro · Safari",
    ip: "203.0.113.42",
    device: "MacBook Pro · Chrome 128",
    location: "Bengaluru, IN",
    timestamp: "2025-02-12 12:09:54",
    severity: "warning",
  },
  {
    id: "LOG-2030",
    actor: "System",
    category: "Security",
    action: "Auto-logout after 30 days of inactivity",
    target: "noah.bauer@heliospro.io",
    ip: "—",
    device: "Helios Pro Auth Service",
    location: "—",
    timestamp: "2025-02-12 03:00:00",
    severity: "info",
  },
  {
    id: "LOG-2029",
    actor: "Rafael Costa",
    category: "Settings",
    action: "Enabled SSO with Google Workspace",
    target: "heliospro.io domain",
    ip: "187.45.10.84",
    device: "Ubuntu 22.04 · Chrome 128",
    location: "São Paulo, BR",
    timestamp: "2025-02-11 19:33:27",
    severity: "success",
  },
  {
    id: "LOG-2028",
    actor: "Layla Haddad",
    category: "Content",
    action: "Exported support tickets CSV",
    target: "Last 90 days · 1,284 rows",
    ip: "92.45.10.18",
    device: "Windows 11 · Chrome 128",
    location: "Amman, JO",
    timestamp: "2025-02-11 15:18:02",
    severity: "info",
  },
  {
    id: "LOG-2027",
    actor: "Daniel Okoro",
    category: "Integrations",
    action: "Connected new integration",
    target: "Stripe",
    ip: "102.89.23.10",
    device: "Windows 11 · Edge 122",
    location: "Lagos, NG",
    timestamp: "2025-02-11 10:42:55",
    severity: "success",
  },
  {
    id: "LOG-2026",
    actor: "Unknown",
    category: "Auth",
    action: "Failed sign-in attempt (2FA code)",
    target: "noah.bauer@heliospro.io",
    ip: "193.27.14.88",
    device: "Unknown · Chrome 128",
    location: "Unknown",
    timestamp: "2025-02-10 21:05:18",
    severity: "danger",
  },
];

export const activityCategories: ActivityCategory[] = [
  "Auth",
  "Members",
  "Billing",
  "Content",
  "Settings",
  "Security",
  "Integrations",
];

export const activityStats = {
  total: activityLog.length,
  security: activityLog.filter((a) => a.category === "Security").length,
  failed: activityLog.filter((a) => a.severity === "danger").length,
  today: activityLog.filter((a) => a.timestamp.startsWith("2025-02-14")).length,
};
