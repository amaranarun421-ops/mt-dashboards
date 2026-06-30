export type ConnectedAppStatus = "Connected" | "Revoked" | "Pending";

export type ConnectedApp = {
  id: string;
  name: string;
  category: "Communication" | "Payments" | "Analytics" | "Productivity" | "Marketing" | "Storage" | "CRM";
  description: string;
  scopes: string[];
  connectedAt: string;
  status: ConnectedAppStatus;
  installedBy: string;
  color: "primary" | "accent" | "violet" | "info" | "rose" | "neutral";
  initials: string;
};

export const connectedApps: ConnectedApp[] = [
  {
    id: "APP-01",
    name: "Slack",
    category: "Communication",
    description: "Send workspace alerts, daily digests and incident notifications to Slack channels.",
    scopes: ["channels:read", "chat:write", "users:read"],
    connectedAt: "Jan 12, 2025",
    status: "Connected",
    installedBy: "Priya Nair",
    color: "violet",
    initials: "SL",
  },
  {
    id: "APP-02",
    name: "Stripe",
    category: "Payments",
    description: "Sync invoices, refunds and chargebacks automatically with Helios Pro billing.",
    scopes: ["charges:read", "customers:write", "invoices:read"],
    connectedAt: "Jan 14, 2025",
    status: "Connected",
    installedBy: "Emma Larsen",
    color: "info",
    initials: "St",
  },
  {
    id: "APP-03",
    name: "Google Analytics",
    category: "Analytics",
    description: "Pull traffic, conversion and funnel data into Helios Pro analytics dashboards.",
    scopes: ["analytics.readonly", "userinfo.email"],
    connectedAt: "Jan 18, 2025",
    status: "Connected",
    installedBy: "Daniel Okoro",
    color: "accent",
    initials: "GA",
  },
  {
    id: "APP-04",
    name: "Notion",
    category: "Productivity",
    description: "Link Notion docs to tasks and pull meeting notes into project timelines.",
    scopes: ["read:pages", "write:pages"],
    connectedAt: "Feb 02, 2025",
    status: "Connected",
    installedBy: "Liam O'Connor",
    color: "neutral",
    initials: "No",
  },
  {
    id: "APP-05",
    name: "Mailchimp",
    category: "Marketing",
    description: "Sync customer segments and trigger campaign flows from Helios Pro.",
    scopes: ["campaigns:write", "lists:read", "members:read"],
    connectedAt: "Feb 06, 2025",
    status: "Connected",
    installedBy: "Sofia Marquez",
    color: "primary",
    initials: "Mc",
  },
  {
    id: "APP-06",
    name: "HubSpot CRM",
    category: "CRM",
    description: "Two-way sync of contacts, deals and lifecycle stages with HubSpot.",
    scopes: ["contacts:write", "deals:read", "owners:read"],
    connectedAt: "Feb 09, 2025",
    status: "Connected",
    installedBy: "Marcus Hale",
    color: "rose",
    initials: "Hs",
  },
  {
    id: "APP-07",
    name: "Dropbox",
    category: "Storage",
    description: "Attach Dropbox files to orders, support tickets and project cards.",
    scopes: ["files.content.read", "files.metadata.read"],
    connectedAt: "Dec 28, 2024",
    status: "Revoked",
    installedBy: "Yuki Tanaka",
    color: "info",
    initials: "Db",
  },
];

export const availableApps: Omit<ConnectedApp, "status" | "connectedAt" | "installedBy">[] = [
  {
    id: "APP-20",
    name: "Zoom",
    category: "Communication",
    description: "Create meeting links from calendar events and log recordings to projects.",
    scopes: ["meeting:write", "recording:read"],
    color: "info",
    initials: "Zm",
  },
  {
    id: "APP-21",
    name: "GitHub",
    category: "Productivity",
    description: "Link pull requests, issues and commits to Helios Pro tasks.",
    scopes: ["repo:read", "issues:write", "metadata:read"],
    color: "neutral",
    initials: "Gh",
  },
  {
    id: "APP-22",
    name: "Intercom",
    category: "CRM",
    description: "Sync support conversations and customer profiles with Helios Pro.",
    scopes: ["conversations:read", "contacts:write"],
    color: "accent",
    initials: "Ic",
  },
  {
    id: "APP-23",
    name: "Figma",
    category: "Productivity",
    description: "Embed Figma frames into design tasks and pull version history.",
    scopes: ["file:read", "project:read"],
    color: "violet",
    initials: "Fg",
  },
  {
    id: "APP-24",
    name: "Segment",
    category: "Analytics",
    description: "Stream product events from Helios Pro into your Segment pipeline.",
    scopes: ["track:write", "identify:write"],
    color: "rose",
    initials: "Sg",
  },
  {
    id: "APP-25",
    name: "AWS S3",
    category: "Storage",
    description: "Export Helios Pro reports and snapshots to your S3 buckets.",
    scopes: ["s3:PutObject", "s3:GetObject"],
    color: "accent",
    initials: "S3",
  },
];

export const connectedAppsStats = {
  total: connectedApps.length,
  active: connectedApps.filter((a) => a.status === "Connected").length,
  revoked: connectedApps.filter((a) => a.status === "Revoked").length,
  categories: new Set(connectedApps.map((a) => a.category)).size,
};
