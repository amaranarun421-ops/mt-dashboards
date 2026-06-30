export type RoleKey = "Admin" | "Manager" | "Editor" | "Viewer" | "Billing" | "Owner";

export type RoleRow = {
  id: string;
  name: string;
  key: RoleKey;
  description: string;
  members: number;
  isSystem: boolean;
  color: "primary" | "accent" | "violet" | "info" | "rose" | "neutral";
  permissions: number;
  createdAt: string;
};

export const roles: RoleRow[] = [
  {
    id: "R-01",
    name: "Owner",
    key: "Owner",
    description: "Full control over the workspace, billing and all settings. Cannot be modified or deleted.",
    members: 1,
    isSystem: true,
    color: "accent",
    permissions: 24,
    createdAt: "Jan 14, 2021",
  },
  {
    id: "R-02",
    name: "Administrator",
    key: "Admin",
    description: "Manage members, roles, billing and configuration. Cannot delete the workspace.",
    members: 2,
    isSystem: true,
    color: "primary",
    permissions: 22,
    createdAt: "Jan 14, 2021",
  },
  {
    id: "R-03",
    name: "Manager",
    key: "Manager",
    description: "Manage day-to-day operations, content and team members in their department.",
    members: 4,
    isSystem: false,
    color: "info",
    permissions: 15,
    createdAt: "Mar 03, 2021",
  },
  {
    id: "R-04",
    name: "Editor",
    key: "Editor",
    description: "Create and edit content, products and orders. No access to billing or member management.",
    members: 6,
    isSystem: false,
    color: "violet",
    permissions: 10,
    createdAt: "Jun 12, 2021",
  },
  {
    id: "R-05",
    name: "Viewer",
    key: "Viewer",
    description: "Read-only access to dashboards, reports and orders. Cannot make changes.",
    members: 3,
    isSystem: false,
    color: "neutral",
    permissions: 6,
    createdAt: "Aug 21, 2021",
  },
  {
    id: "R-06",
    name: "Billing",
    key: "Billing",
    description: "Manage subscription, payment methods, invoices and tax information only.",
    members: 1,
    isSystem: true,
    color: "rose",
    permissions: 8,
    createdAt: "Oct 02, 2021",
  },
];

export const roleColor: Record<RoleKey, "primary" | "accent" | "violet" | "info" | "rose" | "neutral"> = {
  Owner: "accent",
  Admin: "primary",
  Manager: "info",
  Editor: "violet",
  Viewer: "neutral",
  Billing: "rose",
};
