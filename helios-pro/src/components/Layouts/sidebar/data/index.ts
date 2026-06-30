import type { ReactElement } from "react";
import * as Icons from "../icons";

export type NavChild = { title: string; url: string; badge?: string };
export type NavItem = {
  title: string;
  url?: string;
  icon: (p: Icons.PropsType) => ReactElement;
  items: NavChild[];
  badge?: string;
};
export type NavSection = { label: string; items: NavItem[] };

export const NAV_DATA: NavSection[] = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboards",
        icon: Icons.GridIcon,
        items: [
          { title: "Ecommerce", url: "/" },
          { title: "Analytics", url: "/dashboards/analytics" },
          { title: "CRM", url: "/dashboards/crm" },
          { title: "Finance", url: "/dashboards/finance" },
          { title: "SaaS", url: "/dashboards/saas" },
          { title: "Projects", url: "/dashboards/projects" },
          { title: "Marketing", url: "/dashboards/marketing" },
          { title: "AI", url: "/dashboards/ai", badge: "New" },
          { title: "Support", url: "/dashboards/support" },
          { title: "Logistics", url: "/dashboards/logistics" },
        ],
      },
      {
        title: "Apps",
        icon: Icons.BriefcaseIcon,
        items: [
          { title: "Email Inbox", url: "/apps/email" },
          { title: "Email Detail", url: "/apps/email/detail" },
          { title: "Chat", url: "/apps/chat" },
          { title: "Calendar", url: "/apps/calendar" },
          { title: "Kanban", url: "/apps/kanban" },
          { title: "Notes", url: "/apps/notes" },
          { title: "Tasks", url: "/apps/tasks" },
          { title: "File Manager", url: "/apps/file-manager" },
          { title: "Contacts", url: "/apps/contacts" },
          { title: "Support Tickets", url: "/apps/support-tickets" },
          { title: "Ticket Detail", url: "/apps/support-tickets/detail" },
          { title: "Invoice List", url: "/apps/invoices" },
          { title: "Invoice Detail", url: "/apps/invoices/detail" },
          { title: "Invoice Create", url: "/apps/invoices/create" },
          { title: "Invoice Edit", url: "/apps/invoices/edit" },
        ],
      },
      {
        title: "Ecommerce",
        icon: Icons.ShoppingBagIcon,
        items: [
          { title: "Products", url: "/ecommerce/products" },
          { title: "Product Detail", url: "/ecommerce/products/detail" },
          { title: "Add Product", url: "/ecommerce/products/add" },
          { title: "Edit Product", url: "/ecommerce/products/edit" },
          { title: "Orders", url: "/ecommerce/orders" },
          { title: "Order Detail", url: "/ecommerce/orders/detail" },
          { title: "Customers", url: "/ecommerce/customers" },
          { title: "Customer Detail", url: "/ecommerce/customers/detail" },
          { title: "Cart", url: "/ecommerce/cart" },
          { title: "Checkout", url: "/ecommerce/checkout" },
          { title: "Reviews", url: "/ecommerce/reviews" },
          { title: "Coupons", url: "/ecommerce/coupons" },
          { title: "Inventory", url: "/ecommerce/inventory" },
        ],
      },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        title: "User & Account",
        icon: Icons.User,
        items: [
          { title: "Profile", url: "/user-account/profile" },
          { title: "Account Settings", url: "/user-account/account-settings" },
          { title: "Security Settings", url: "/user-account/security-settings" },
          { title: "Billing Settings", url: "/user-account/billing-settings" },
          { title: "Team Members", url: "/user-account/team-members" },
          { title: "Roles", url: "/user-account/roles" },
          { title: "Permissions", url: "/user-account/permissions" },
          { title: "Activity Log", url: "/user-account/activity-log" },
          { title: "Notifications Settings", url: "/user-account/notifications-settings" },
          { title: "Connected Apps", url: "/user-account/connected-apps" },
        ],
      },
      {
        title: "Forms",
        icon: Icons.InputIcon,
        items: [
          { title: "Basic Inputs", url: "/forms/basic-inputs" },
          { title: "Advanced Inputs", url: "/forms/advanced-inputs" },
          { title: "Selects", url: "/forms/selects" },
          { title: "Checkbox & Radio", url: "/forms/checkbox-radio" },
          { title: "Switches", url: "/forms/switches" },
          { title: "Date Picker", url: "/forms/date-picker" },
          { title: "File Upload", url: "/forms/file-upload" },
          { title: "Rich Text Editor", url: "/forms/rich-text-editor" },
          { title: "Form Layouts", url: "/forms/form-layouts" },
          { title: "Form Validation", url: "/forms/form-validation" },
          { title: "Multi Step Form", url: "/forms/multi-step-form" },
          { title: "Payment Form", url: "/forms/payment-form" },
        ],
      },
      {
        title: "Tables",
        icon: Icons.Table,
        items: [
          { title: "Basic Table", url: "/tables/basic" },
          { title: "Data Table", url: "/tables/data" },
          { title: "Sorting Table", url: "/tables/sorting" },
          { title: "Filtering Table", url: "/tables/filtering" },
          { title: "Pagination Table", url: "/tables/pagination" },
          { title: "Row Selection", url: "/tables/row-selection" },
          { title: "Editable Table", url: "/tables/editable" },
          { title: "Sticky Table", url: "/tables/sticky" },
          { title: "Column Visibility", url: "/tables/column-visibility" },
          { title: "Drag & Drop Table", url: "/tables/drag-drop" },
          { title: "Empty State Table", url: "/tables/empty-state" },
        ],
      },
      {
        title: "Charts & Data",
        icon: Icons.PieChart,
        items: [
          { title: "Line Charts", url: "/charts/line" },
          { title: "Area Charts", url: "/charts/area" },
          { title: "Bar Charts", url: "/charts/bar" },
          { title: "Pie & Doughnut", url: "/charts/pie-doughnut" },
          { title: "Radar & Radial", url: "/charts/radar-radial" },
          { title: "Candlestick", url: "/charts/candlestick" },
          { title: "KPI Cards", url: "/charts/kpi-cards" },
          { title: "Realtime Metrics", url: "/charts/realtime-metrics" },
          { title: "Chart Dashboard", url: "/charts/chart-dashboard" },
          { title: "Reports", url: "/charts/reports" },
        ],
      },
    ],
  },
  {
    label: "COMPONENTS",
    items: [
      {
        title: "UI Components",
        icon: Icons.FourCircle,
        items: [
          { title: "Buttons", url: "/ui-components/buttons" },
          { title: "Badges", url: "/ui-components/badges" },
          { title: "Cards", url: "/ui-components/cards" },
          { title: "Alerts", url: "/ui-components/alerts" },
          { title: "Avatars", url: "/ui-components/avatars" },
          { title: "Dropdowns", url: "/ui-components/dropdowns" },
          { title: "Modals", url: "/ui-components/modals" },
          { title: "Drawers", url: "/ui-components/drawers" },
          { title: "Tabs", url: "/ui-components/tabs" },
          { title: "Accordions", url: "/ui-components/accordions" },
          { title: "Tooltips", url: "/ui-components/tooltips" },
          { title: "Popovers", url: "/ui-components/popovers" },
          { title: "Breadcrumbs", url: "/ui-components/breadcrumbs" },
          { title: "Pagination", url: "/ui-components/pagination" },
          { title: "Progress", url: "/ui-components/progress" },
          { title: "Spinners", url: "/ui-components/spinners" },
          { title: "Toasts", url: "/ui-components/toasts" },
          { title: "Timeline", url: "/ui-components/timeline" },
          { title: "Empty States", url: "/ui-components/empty-states" },
          { title: "Banners", url: "/ui-components/banners" },
          { title: "Command Menu", url: "/ui-components/command-menu" },
        ],
      },
      {
        title: "Pages",
        icon: Icons.GlobeIcon,
        items: [
          { title: "Landing", url: "/pages/landing" },
          { title: "Pricing", url: "/pages/pricing" },
          { title: "FAQ", url: "/pages/faq" },
          { title: "Help Center", url: "/pages/help-center" },
          { title: "About", url: "/pages/about" },
          { title: "Contact", url: "/pages/contact" },
          { title: "Maintenance", url: "/pages/maintenance" },
          { title: "Coming Soon", url: "/pages/coming-soon" },
          { title: "Changelog", url: "/pages/changelog" },
          { title: "Roadmap", url: "/pages/roadmap" },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          { title: "Login", url: "/auth/sign-in" },
          { title: "Register", url: "/auth/sign-up" },
          { title: "Forgot Password", url: "/auth/forgot-password" },
          { title: "Reset Password", url: "/auth/reset-password" },
          { title: "Two Step Verification", url: "/auth/two-step" },
          { title: "Lock Screen", url: "/auth/lock-screen" },
          { title: "Side Login", url: "/auth/side-login" },
          { title: "Side Register", url: "/auth/side-register" },
          { title: "Boxed Login", url: "/auth/boxed-login" },
          { title: "Boxed Register", url: "/auth/boxed-register" },
        ],
      },
      {
        title: "Errors",
        icon: Icons.AlertTriangleIcon,
        items: [
          { title: "400", url: "/errors/400" },
          { title: "401", url: "/errors/401" },
          { title: "403", url: "/errors/403" },
          { title: "404", url: "/errors/404" },
          { title: "500", url: "/errors/500" },
          { title: "503", url: "/errors/503" },
        ],
      },
    ],
  },
];

/* Flat list for command palette search */
export const FLAT_NAV = NAV_DATA.flatMap((section) =>
  section.items.flatMap((item) =>
    item.items.length
      ? item.items.map((child) => ({
          group: section.label,
          parent: item.title,
          title: child.title,
          url: child.url,
          badge: child.badge,
        }))
      : [{ group: section.label, parent: item.title, title: item.title, url: item.url || "/", badge: item.badge }],
  ),
);
