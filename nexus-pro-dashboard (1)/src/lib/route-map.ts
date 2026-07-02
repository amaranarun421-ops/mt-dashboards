import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, BarChart3, ShoppingCart, Wallet, Megaphone, Users,
  KanbanSquare, Truck, HeartPulse, GraduationCap, Building2, CalendarDays,
  Mail, FolderOpen, MessageSquare, FileText, Receipt, CreditCard, Bell,
  User, Shield, KeyRound, Plug, Activity, Server, FileBarChart,
  Settings, LogIn, UserPlus, LockKeyhole, AlertTriangle,
  Component, FormInput, Table2,
  Boxes, Tags, ClipboardList, Sparkles,
  Crown, Target, TrendingUp, Briefcase, Building, UserCheck, MapPin,
} from "lucide-react";

// ============ Route Map ============
// Every route in the app is declared here. This is the single source of truth
// for the sidebar, command palette, breadcrumbs, and active-route detection.

export interface RouteEntry {
  /** Unique id (matches old nav id for backward compat where reasonable) */
  id: string;
  /** Display label */
  label: string;
  /** Full URL path */
  path: string;
  /** Lucide icon */
  icon: LucideIcon;
  /** Optional badge text */
  badge?: string;
  /** Optional badge style */
  badgeVariant?: "primary" | "success" | "warning" | "info" | "error" | "new" | "pro";
  /** Group label for sidebar */
  group: "Dashboards" | "Applications" | "Account" | "Sales Ops" | "UI Elements" | "Forms" | "Tables" | "Charts" | "Pages" | "Authentication" | "Errors";
  /** Section label for sidebar (sub-grouping within a group) */
  section?: string;
  /** Whether this route is excluded from the sidebar (e.g. detail pages) */
  hidden?: boolean;
  /** Whether this route uses the dashboard shell (sidebar + header) */
  standalone?: boolean;
}

export const routes: RouteEntry[] = [
  // ===== DASHBOARDS =====
  { id: "dashboard-ecommerce", label: "Ecommerce", path: "/dashboard/ecommerce", icon: ShoppingCart, group: "Dashboards" },
  { id: "dashboard-analytics", label: "Analytics", path: "/dashboard/analytics", icon: BarChart3, group: "Dashboards" },
  { id: "dashboard-crm", label: "CRM", path: "/dashboard/crm", icon: Users, group: "Dashboards", badge: "12", badgeVariant: "info" },
  { id: "dashboard-finance", label: "Finance", path: "/dashboard/finance", icon: Wallet, group: "Dashboards" },
  { id: "dashboard-marketing", label: "Marketing", path: "/dashboard/marketing", icon: Megaphone, group: "Dashboards", badge: "New", badgeVariant: "success" },
  { id: "dashboard-hr", label: "Human Resources", path: "/dashboard/hr", icon: Users, group: "Dashboards" },
  { id: "dashboard-projects", label: "Project Management", path: "/dashboard/projects", icon: KanbanSquare, group: "Dashboards" },
  { id: "dashboard-logistics", label: "Logistics", path: "/dashboard/logistics", icon: Truck, group: "Dashboards" },
  { id: "dashboard-healthcare", label: "Healthcare", path: "/dashboard/healthcare", icon: HeartPulse, group: "Dashboards" },
  { id: "dashboard-education", label: "Education", path: "/dashboard/education", icon: GraduationCap, group: "Dashboards" },
  { id: "dashboard-realestate", label: "Real Estate", path: "/dashboard/real-estate", icon: Building2, group: "Dashboards" },
  { id: "dashboard-booking", label: "Booking", path: "/dashboard/booking", icon: CalendarDays, group: "Dashboards", badge: "5", badgeVariant: "warning" },

  // ===== SALES OPS (flagship module) =====
  { id: "sales-overview", label: "Overview", path: "/sales/overview", icon: TrendingUp, group: "Sales Ops", section: "Performance", badge: "Pro", badgeVariant: "pro" },
  { id: "sales-revenue", label: "Revenue", path: "/sales/revenue", icon: Wallet, group: "Sales Ops", section: "Performance" },
  { id: "sales-pipeline", label: "Pipeline", path: "/sales/pipeline", icon: BarChart3, group: "Sales Ops", section: "Performance" },
  { id: "sales-forecasting", label: "Forecasting", path: "/sales/forecasting", icon: TrendingUp, group: "Sales Ops", section: "Performance" },
  { id: "sales-quota", label: "Quota & Attainment", path: "/sales/quota", icon: Target, group: "Sales Ops", section: "Performance" },
  { id: "sales-deal", label: "Deals", path: "/sales/deals", icon: Briefcase, group: "Sales Ops", section: "Records" },
  { id: "sales-leads", label: "Leads", path: "/sales/leads", icon: UserPlus, group: "Sales Ops", section: "Records" },
  { id: "sales-accounts", label: "Accounts", path: "/sales/accounts", icon: Building, group: "Sales Ops", section: "Records" },
  { id: "sales-contacts", label: "Contacts", path: "/sales/contacts", icon: UserCheck, group: "Sales Ops", section: "Records" },
  { id: "sales-team-performance", label: "Team Performance", path: "/sales/team-performance", icon: Crown, group: "Sales Ops", section: "Team" },
  { id: "sales-territories", label: "Territories", path: "/sales/territories", icon: MapPin, group: "Sales Ops", section: "Team" },
  { id: "sales-activities", label: "Activities", path: "/sales/activities", icon: Activity, group: "Sales Ops", section: "Team" },
  { id: "sales-commissions", label: "Commissions", path: "/sales/commissions", icon: Wallet, group: "Sales Ops", section: "Team" },
  { id: "sales-playbooks", label: "Playbooks", path: "/sales/playbooks", icon: ClipboardList, group: "Sales Ops", section: "Playbook" },
  { id: "sales-reports", label: "Reports", path: "/sales/reports", icon: FileBarChart, group: "Sales Ops", section: "Playbook" },
  { id: "sales-import", label: "Import", path: "/sales/import", icon: Tags, group: "Sales Ops", section: "Playbook" },
  { id: "sales-export", label: "Export", path: "/sales/export", icon: Tags, group: "Sales Ops", section: "Playbook" },

  // Detail pages (hidden from sidebar)
  { id: "sales-deal-detail", label: "Deal Detail", path: "/sales/deals/[id]", icon: Briefcase, group: "Sales Ops", hidden: true },
  { id: "sales-lead-detail", label: "Lead Detail", path: "/sales/leads/[id]", icon: UserPlus, group: "Sales Ops", hidden: true },
  { id: "sales-account-detail", label: "Account Detail", path: "/sales/accounts/[id]", icon: Building, group: "Sales Ops", hidden: true },
  { id: "sales-rep-detail", label: "Rep Detail", path: "/sales/rep/[id]", icon: User, group: "Sales Ops", hidden: true },

  // ===== APPLICATIONS =====
  { id: "app-calendar", label: "Calendar", path: "/apps/calendar", icon: CalendarDays, group: "Applications" },
  { id: "app-chat", label: "Chat", path: "/apps/chat", icon: MessageSquare, group: "Applications", badge: "3", badgeVariant: "success" },
  { id: "app-mailbox", label: "Mailbox", path: "/apps/mailbox", icon: Mail, group: "Applications", badge: "24", badgeVariant: "error" },
  { id: "app-kanban", label: "Kanban Board", path: "/apps/kanban", icon: KanbanSquare, group: "Applications" },
  { id: "app-files", label: "File Manager", path: "/apps/files", icon: FolderOpen, group: "Applications" },
  { id: "app-invoices", label: "Invoices", path: "/apps/invoices", icon: Receipt, group: "Applications" },
  { id: "app-subscriptions", label: "Subscriptions", path: "/apps/subscriptions", icon: CreditCard, group: "Applications" },
  { id: "app-reports", label: "Reports", path: "/apps/reports", icon: FileBarChart, group: "Applications" },
  { id: "app-monitoring", label: "Monitoring", path: "/apps/monitoring", icon: Activity, group: "Applications" },
  { id: "app-pos", label: "Point of Sale", path: "/apps/pos", icon: ShoppingCart, group: "Applications" },
  { id: "app-todo", label: "To-Do List", path: "/apps/todo", icon: ClipboardList, group: "Applications" },
  { id: "app-notes", label: "Notes", path: "/apps/notes", icon: FileText, group: "Applications" },

  // ===== ACCOUNT =====
  { id: "account-profile", label: "Profile", path: "/account/profile", icon: User, group: "Account" },
  { id: "account-notifications", label: "Notifications", path: "/account/notifications", icon: Bell, group: "Account" },
  { id: "account-settings", label: "Settings", path: "/account/settings", icon: Settings, group: "Account" },
  { id: "account-team", label: "Team", path: "/account/team", icon: Users, group: "Account" },
  { id: "account-roles", label: "Roles & Permissions", path: "/account/roles", icon: Shield, group: "Account" },
  { id: "account-audit-logs", label: "Audit Logs", path: "/account/audit-logs", icon: FileText, group: "Account" },
  { id: "account-api-keys", label: "API Keys", path: "/account/api-keys", icon: KeyRound, group: "Account" },
  { id: "account-integrations", label: "Integrations", path: "/account/integrations", icon: Plug, group: "Account" },
  { id: "account-system-status", label: "System Status", path: "/account/system-status", icon: Server, group: "Account" },
  { id: "account-billing", label: "Billing", path: "/account/billing", icon: CreditCard, group: "Account" },
  { id: "account-security", label: "Security", path: "/account/security", icon: Shield, group: "Account" },
  { id: "account-sessions", label: "Active Sessions", path: "/account/sessions", icon: Activity, group: "Account" },

  // ===== UI ELEMENTS =====
  { id: "ui-buttons", label: "Buttons", path: "/ui/buttons", icon: Component, group: "UI Elements" },
  { id: "ui-typography", label: "Typography", path: "/ui/typography", icon: Component, group: "UI Elements" },
  { id: "ui-badges", label: "Badges & Chips", path: "/ui/badges", icon: Tags, group: "UI Elements" },
  { id: "ui-cards", label: "Cards", path: "/ui/cards", icon: Component, group: "UI Elements" },
  { id: "ui-forms", label: "Form Elements", path: "/ui/forms", icon: FormInput, group: "UI Elements" },
  { id: "ui-tables", label: "Tables", path: "/ui/tables", icon: Table2, group: "UI Elements" },
  { id: "ui-tabs", label: "Tabs & Accordions", path: "/ui/tabs", icon: Component, group: "UI Elements" },
  { id: "ui-modals", label: "Modals & Drawers", path: "/ui/modals", icon: Component, group: "UI Elements" },
  { id: "ui-toggle", label: "Switches & Toggles", path: "/ui/toggles", icon: Component, group: "UI Elements" },
  { id: "ui-alerts", label: "Alerts & Toasts", path: "/ui/alerts", icon: Bell, group: "UI Elements" },
  { id: "ui-avatars", label: "Avatars", path: "/ui/avatars", icon: User, group: "UI Elements" },
  { id: "ui-progress", label: "Progress", path: "/ui/progress", icon: Activity, group: "UI Elements" },
  { id: "ui-charts", label: "Charts", path: "/ui/charts", icon: BarChart3, group: "UI Elements" },
  { id: "ui-icons", label: "Icons", path: "/ui/icons", icon: Sparkles, group: "UI Elements" },
  { id: "ui-dropdowns", label: "Dropdowns", path: "/ui/dropdowns", icon: Component, group: "UI Elements" },
  { id: "ui-tooltips", label: "Tooltips & Popovers", path: "/ui/tooltips", icon: Component, group: "UI Elements" },
  { id: "ui-timeline", label: "Timeline", path: "/ui/timeline", icon: Activity, group: "UI Elements" },
  { id: "ui-pagination", label: "Pagination", path: "/ui/pagination", icon: Component, group: "UI Elements" },

  // ===== FORMS =====
  { id: "form-elements", label: "Form Elements", path: "/forms/elements", icon: FormInput, group: "Forms" },
  { id: "form-validation", label: "Validation", path: "/forms/validation", icon: FormInput, group: "Forms" },
  { id: "form-wizard", label: "Multi-Step Wizard", path: "/forms/wizard", icon: FormInput, group: "Forms" },
  { id: "form-layouts", label: "Form Layouts", path: "/forms/layouts", icon: FormInput, group: "Forms" },
  { id: "form-upload", label: "File Upload", path: "/forms/upload", icon: FormInput, group: "Forms" },
  { id: "form-mask", label: "Input Mask", path: "/forms/mask", icon: FormInput, group: "Forms" },
  { id: "form-select", label: "Select & Multiselect", path: "/forms/select", icon: FormInput, group: "Forms" },
  { id: "form-editor", label: "Rich Text Editor", path: "/forms/editor", icon: FormInput, group: "Forms" },

  // ===== TABLES =====
  { id: "table-basic", label: "Basic Tables", path: "/tables/basic", icon: Table2, group: "Tables" },
  { id: "table-advanced", label: "Advanced Data Table", path: "/tables/advanced", icon: Table2, group: "Tables" },
  { id: "table-sortable", label: "Sortable Tables", path: "/tables/sortable", icon: Table2, group: "Tables" },
  { id: "table-filterable", label: "Filterable Tables", path: "/tables/filterable", icon: Table2, group: "Tables" },
  { id: "table-pagination", label: "Pagination", path: "/tables/pagination", icon: Table2, group: "Tables" },

  // ===== CHARTS =====
  { id: "chart-line", label: "Line Charts", path: "/charts/line", icon: BarChart3, group: "Charts" },
  { id: "chart-bar", label: "Bar Charts", path: "/charts/bar", icon: BarChart3, group: "Charts" },
  { id: "chart-area", label: "Area Charts", path: "/charts/area", icon: BarChart3, group: "Charts" },
  { id: "chart-pie", label: "Pie & Donut", path: "/charts/pie", icon: BarChart3, group: "Charts" },
  { id: "chart-radar", label: "Radar Charts", path: "/charts/radar", icon: BarChart3, group: "Charts" },
  { id: "chart-radial", label: "Radial Bar", path: "/charts/radial", icon: BarChart3, group: "Charts" },

  // ===== PAGES =====
  { id: "page-pricing", label: "Pricing", path: "/pages/pricing", icon: CreditCard, group: "Pages" },
  { id: "page-faq", label: "FAQ", path: "/pages/faq", icon: FileText, group: "Pages" },
  { id: "page-timeline", label: "Timeline", path: "/pages/timeline", icon: Activity, group: "Pages" },
  { id: "page-gallery", label: "Gallery", path: "/pages/gallery", icon: FolderOpen, group: "Pages" },
  { id: "page-search-results", label: "Search Results", path: "/pages/search-results", icon: Component, group: "Pages" },
  { id: "page-maintenance", label: "Maintenance", path: "/pages/maintenance", icon: Settings, group: "Pages", standalone: true },
  { id: "page-coming-soon", label: "Coming Soon", path: "/pages/coming-soon", icon: Sparkles, group: "Pages", standalone: true },

  // ===== AUTH =====
  { id: "auth-signin", label: "Sign In", path: "/auth/sign-in", icon: LogIn, group: "Authentication", standalone: true },
  { id: "auth-signup", label: "Sign Up", path: "/auth/sign-up", icon: UserPlus, group: "Authentication", standalone: true },
  { id: "auth-forgot", label: "Forgot Password", path: "/auth/forgot-password", icon: Mail, group: "Authentication", standalone: true },
  { id: "auth-reset", label: "Reset Password", path: "/auth/reset-password", icon: LockKeyhole, group: "Authentication", standalone: true },
  { id: "auth-verify", label: "Verify Email", path: "/auth/verify-email", icon: Shield, group: "Authentication", standalone: true },
  { id: "auth-twofa", label: "Two-Factor Auth", path: "/auth/two-factor", icon: Shield, group: "Authentication", standalone: true },
  { id: "auth-lock", label: "Lock Screen", path: "/auth/lock-screen", icon: LockKeyhole, group: "Authentication", standalone: true },

  // ===== ERRORS =====
  { id: "err-401", label: "401 Unauthorized", path: "/errors/401", icon: AlertTriangle, group: "Errors", standalone: true },
  { id: "err-403", label: "403 Forbidden", path: "/errors/403", icon: AlertTriangle, group: "Errors", standalone: true },
  { id: "err-404", label: "404 Not Found", path: "/errors/404", icon: AlertTriangle, group: "Errors", standalone: true },
  { id: "err-405", label: "405 Method Not Allowed", path: "/errors/405", icon: AlertTriangle, group: "Errors", standalone: true },
  { id: "err-408", label: "408 Request Timeout", path: "/errors/408", icon: AlertTriangle, group: "Errors", standalone: true },
  { id: "err-429", label: "429 Too Many Requests", path: "/errors/429", icon: AlertTriangle, group: "Errors", standalone: true },
  { id: "err-500", label: "500 Server Error", path: "/errors/500", icon: AlertTriangle, group: "Errors", standalone: true },
  { id: "err-503", label: "503 Service Unavailable", path: "/errors/503", icon: AlertTriangle, group: "Errors", standalone: true },
  { id: "err-offline", label: "Offline", path: "/errors/offline", icon: AlertTriangle, group: "Errors", standalone: true },
];

// ============ Marketing routes (not in sidebar) ============
export const marketingRoutes = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/pages-preview", label: "Pages Preview" },
  { path: "/components-preview", label: "Components Preview" },
  { path: "/pricing-license", label: "Pricing & License" },
  { path: "/docs", label: "Documentation" },
  { path: "/changelog", label: "Changelog" },
];

// ============ Sidebar layout groups ============
export const sidebarGroups: Array<{
  id: string;
  label: string;
  routes: RouteEntry[];
}> = [
  { id: "dashboards", label: "Dashboards", routes: routes.filter((r) => r.group === "Dashboards") },
  { id: "sales", label: "Sales Ops", routes: routes.filter((r) => r.group === "Sales Ops" && !r.hidden) },
  { id: "apps", label: "Applications", routes: routes.filter((r) => r.group === "Applications") },
  { id: "account", label: "Account", routes: routes.filter((r) => r.group === "Account") },
  { id: "ui", label: "UI Elements", routes: routes.filter((r) => r.group === "UI Elements") },
  { id: "forms", label: "Forms", routes: routes.filter((r) => r.group === "Forms") },
  { id: "tables", label: "Tables", routes: routes.filter((r) => r.group === "Tables") },
  { id: "charts", label: "Charts", routes: routes.filter((r) => r.group === "Charts") },
  { id: "pages", label: "Pages", routes: routes.filter((r) => r.group === "Pages") },
  { id: "auth", label: "Authentication", routes: routes.filter((r) => r.group === "Authentication") },
  { id: "errors", label: "Error Pages", routes: routes.filter((r) => r.group === "Errors") },
];

// ============ Helpers ============
export function findRouteByPath(pathname: string): RouteEntry | undefined {
  // Try exact match first, then prefix match for detail routes
  let route = routes.find((r) => r.path === pathname);
  if (route) return route;

  // Handle detail routes — match by prefix
  // e.g. /sales/deals/deal-1 should match /sales/deals/[id]
  const detailRoutes = routes.filter((r) => r.path.includes("[id]"));
  for (const dr of detailRoutes) {
    const base = dr.path.replace(/\/\[id\]$/, "");
    if (pathname === base || pathname.startsWith(base + "/")) {
      return dr;
    }
  }

  // Fall back to longest-prefix match for parent routes
  const candidates = routes
    .filter((r) => !r.path.includes("[") && pathname.startsWith(r.path))
    .sort((a, b) => b.path.length - a.path.length);
  return candidates[0];
}

export function findRouteById(id: string): RouteEntry | undefined {
  return routes.find((r) => r.id === id);
}

export function getBreadcrumbs(pathname: string): Array<{ label: string; path: string }> {
  const route = findRouteByPath(pathname);
  if (!route) return [{ label: "Dashboard", path: "/dashboard/ecommerce" }];

  const parts: Array<{ label: string; path: string }> = [
    { label: "Nexus Pro", path: "/" },
    { label: route.group, path: "#" },
  ];

  if (route.section) {
    parts.push({ label: route.section, path: "#" });
  }

  parts.push({ label: route.label, path: route.path });
  return parts;
}

// Routes that should NOT be persisted as the last-visited page (standalone)
export const STANDALONE_GROUPS = new Set(["Authentication", "Errors", "Pages"]);
