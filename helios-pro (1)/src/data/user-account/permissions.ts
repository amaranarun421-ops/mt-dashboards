export type ModuleKey =
  | "Dashboard"
  | "Users"
  | "Orders"
  | "Products"
  | "Customers"
  | "Reports"
  | "Settings"
  | "Billing";

export type ActionKey = "view" | "create" | "edit" | "delete";

export type RoleKey = "Admin" | "Manager" | "Editor" | "Viewer";

export type PermissionCell = {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};

export type PermissionMatrix = Record<ModuleKey, Record<RoleKey, PermissionCell>>;

export const modules: ModuleKey[] = [
  "Dashboard",
  "Users",
  "Orders",
  "Products",
  "Customers",
  "Reports",
  "Settings",
  "Billing",
];

export const roles: RoleKey[] = ["Admin", "Manager", "Editor", "Viewer"];

export const actions: { key: ActionKey; label: string }[] = [
  { key: "view", label: "View" },
  { key: "create", label: "Create" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
];

export const permissionMatrix: PermissionMatrix = {
  Dashboard: {
    Admin: { view: true, create: true, edit: true, delete: true },
    Manager: { view: true, create: true, edit: true, delete: false },
    Editor: { view: true, create: false, edit: false, delete: false },
    Viewer: { view: true, create: false, edit: false, delete: false },
  },
  Users: {
    Admin: { view: true, create: true, edit: true, delete: true },
    Manager: { view: true, create: true, edit: true, delete: false },
    Editor: { view: true, create: false, edit: false, delete: false },
    Viewer: { view: false, create: false, edit: false, delete: false },
  },
  Orders: {
    Admin: { view: true, create: true, edit: true, delete: true },
    Manager: { view: true, create: true, edit: true, delete: true },
    Editor: { view: true, create: true, edit: true, delete: false },
    Viewer: { view: true, create: false, edit: false, delete: false },
  },
  Products: {
    Admin: { view: true, create: true, edit: true, delete: true },
    Manager: { view: true, create: true, edit: true, delete: true },
    Editor: { view: true, create: true, edit: true, delete: false },
    Viewer: { view: true, create: false, edit: false, delete: false },
  },
  Customers: {
    Admin: { view: true, create: true, edit: true, delete: true },
    Manager: { view: true, create: true, edit: true, delete: false },
    Editor: { view: true, create: false, edit: true, delete: false },
    Viewer: { view: true, create: false, edit: false, delete: false },
  },
  Reports: {
    Admin: { view: true, create: true, edit: true, delete: true },
    Manager: { view: true, create: true, edit: false, delete: false },
    Editor: { view: true, create: false, edit: false, delete: false },
    Viewer: { view: true, create: false, edit: false, delete: false },
  },
  Settings: {
    Admin: { view: true, create: true, edit: true, delete: true },
    Manager: { view: true, create: false, edit: true, delete: false },
    Editor: { view: false, create: false, edit: false, delete: false },
    Viewer: { view: false, create: false, edit: false, delete: false },
  },
  Billing: {
    Admin: { view: true, create: true, edit: true, delete: true },
    Manager: { view: true, create: false, edit: false, delete: false },
    Editor: { view: false, create: false, edit: false, delete: false },
    Viewer: { view: false, create: false, edit: false, delete: false },
  },
};

export const moduleSummaries: Record<ModuleKey, string> = {
  Dashboard: "Analytics, charts and overview widgets",
  Users: "Team members, roles and permissions",
  Orders: "Customer orders, fulfillment and refunds",
  Products: "Catalog, inventory and pricing",
  Customers: "Customer profiles, segments and LTV",
  Reports: "Custom reports, exports and scheduled digests",
  Settings: "Workspace, security and integration settings",
  Billing: "Subscription, invoices and payment methods",
};
