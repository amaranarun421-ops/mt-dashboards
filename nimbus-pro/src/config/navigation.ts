import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, ShoppingCart, Users, Activity,
  Megaphone,
  Mail, MessageSquare, CalendarDays, Columns3, StickyNote, ListTodo,
  FolderTree, Contact, Ticket, FileText, CreditCard,
  Package, Tag, Boxes,
  UserCog, Shield, KeyRound, Receipt, UserPlus, Lock, History, Bell, Plug,
  TextCursorInput, SlidersHorizontal, CheckSquare, ToggleLeft, Calendar,
  Upload, FileEdit, AlignLeft, CheckCheck, ListPlus, Wallet,
  Table2, ArrowUpDown, Filter, List, TableProperties, Pin, Eye, GripVertical, Inbox,
  LineChart, AreaChart, BarChart, PieChart, Radar, CandlestickChart, Gauge, Radio, FileBarChart,
  Hand, Award, LayoutGrid, AlertTriangle, CircleUser, ChevronDownSquare, SquareStack,
  PanelTop, PanelsTopLeft, ChevronDown, HelpCircle, SquareStack as Stack,
  Anchor, FileWarning, RotateCw, Sparkles, Plane, BookOpen, Phone, Wrench, Clock, Map as MapIcon,
  LogIn, UserPlus as SignUp, KeyRound as ForgotKey, ShieldCheck, LockKeyhole, PanelLeft,
  Bug, Ban, AlertOctagon, ServerCrash, CloudOff,
} from "lucide-react";

export type NavItem = {
  name: string;
  path?: string;
  icon: LucideIcon;
  badge?: string;
  badgeTone?: "new" | "pro" | "hot";
  children?: { name: string; path: string; badge?: string; badgeTone?: "new" | "pro" | "hot" }[];
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    label: "Dashboards",
    items: [
      {
        name: "Dashboards",
        icon: LayoutDashboard,
        children: [
          { name: "Analytics", path: "/dashboards/analytics" },
          { name: "Ecommerce", path: "/dashboards/ecommerce" },
          { name: "CRM", path: "/dashboards/crm" },
          { name: "Finance", path: "/dashboards/finance" },
          { name: "SaaS", path: "/dashboards/saas" },
          { name: "Project", path: "/dashboards/project" },
          { name: "Marketing", path: "/dashboards/marketing" },
          { name: "AI", path: "/dashboards/ai", badge: "New", badgeTone: "new" },
          { name: "Support", path: "/dashboards/support" },
          { name: "Logistics", path: "/dashboards/logistics" },
        ],
      },
    ],
  },
  {
    label: "Applications",
    items: [
      {
        name: "Email",
        icon: Mail,
        children: [
          { name: "Inbox", path: "/apps/email/inbox" },
          { name: "Detail", path: "/apps/email/detail" },
        ],
      },
      { name: "Chat", path: "/apps/chat", icon: MessageSquare },
      { name: "Calendar", path: "/apps/calendar", icon: CalendarDays },
      { name: "Kanban", path: "/apps/kanban", icon: Columns3 },
      { name: "Notes", path: "/apps/notes", icon: StickyNote },
      { name: "Tasks", path: "/apps/tasks", icon: ListTodo },
      { name: "File Manager", path: "/apps/file-manager", icon: FolderTree },
      { name: "Contacts", path: "/apps/contacts", icon: Contact },
      {
        name: "Support",
        icon: Ticket,
        children: [
          { name: "Tickets", path: "/apps/support/tickets" },
          { name: "Ticket Detail", path: "/apps/support/ticket-detail" },
        ],
      },
      {
        name: "Invoices",
        icon: FileText,
        children: [
          { name: "List", path: "/apps/invoices/list" },
          { name: "Detail", path: "/apps/invoices/detail" },
          { name: "Create", path: "/apps/invoices/create" },
          { name: "Edit", path: "/apps/invoices/edit" },
        ],
      },
    ],
  },
  {
    label: "Ecommerce",
    items: [
      {
        name: "Catalog",
        icon: Package,
        children: [
          { name: "Products", path: "/ecommerce/products" },
          { name: "Product Detail", path: "/ecommerce/product-detail" },
          { name: "Add Product", path: "/ecommerce/product-add" },
          { name: "Edit Product", path: "/ecommerce/product-edit" },
        ],
      },
      {
        name: "Orders",
        icon: ShoppingCart,
        children: [
          { name: "List", path: "/ecommerce/orders" },
          { name: "Order Detail", path: "/ecommerce/order-detail" },
        ],
      },
      {
        name: "Customers",
        icon: Users,
        children: [
          { name: "List", path: "/ecommerce/customers" },
          { name: "Customer Detail", path: "/ecommerce/customer-detail" },
        ],
      },
      { name: "Cart", path: "/ecommerce/cart", icon: ShoppingCart },
      { name: "Checkout", path: "/ecommerce/checkout", icon: CreditCard },
      { name: "Reviews", path: "/ecommerce/reviews", icon: Award },
      { name: "Coupons", path: "/ecommerce/coupons", icon: Tag },
      { name: "Inventory", path: "/ecommerce/inventory", icon: Boxes },
    ],
  },
  {
    label: "User & Account",
    items: [
      { name: "Profile", path: "/account/profile", icon: CircleUser },
      { name: "Account Settings", path: "/account/settings", icon: UserCog },
      { name: "Security", path: "/account/security", icon: Shield },
      { name: "Billing", path: "/account/billing", icon: Receipt },
      { name: "Team Members", path: "/account/team", icon: UserPlus },
      { name: "Roles", path: "/account/roles", icon: KeyRound },
      { name: "Permissions", path: "/account/permissions", icon: Lock },
      { name: "Activity Log", path: "/account/activity", icon: History },
      { name: "Notifications", path: "/account/notifications", icon: Bell },
      { name: "Connected Apps", path: "/account/connected-apps", icon: Plug },
    ],
  },
  {
    label: "Forms",
    items: [
      { name: "Basic Inputs", path: "/forms/basic", icon: TextCursorInput },
      { name: "Advanced Inputs", path: "/forms/advanced", icon: SlidersHorizontal },
      { name: "Selects", path: "/forms/selects", icon: ChevronDownSquare },
      { name: "Checkbox & Radio", path: "/forms/checkbox-radio", icon: CheckSquare },
      { name: "Switches", path: "/forms/switches", icon: ToggleLeft },
      { name: "Date Picker", path: "/forms/date-picker", icon: Calendar },
      { name: "File Upload", path: "/forms/file-upload", icon: Upload },
      { name: "Rich Text Editor", path: "/forms/rich-text", icon: FileEdit },
      { name: "Form Layouts", path: "/forms/layouts", icon: AlignLeft },
      { name: "Validation", path: "/forms/validation", icon: CheckCheck },
      { name: "Multi Step", path: "/forms/multi-step", icon: ListPlus },
      { name: "Payment Form", path: "/forms/payment", icon: Wallet },
    ],
  },
  {
    label: "Tables",
    items: [
      { name: "Basic Table", path: "/tables/basic", icon: Table2 },
      { name: "Data Table", path: "/tables/data", icon: Table2 },
      { name: "Sorting", path: "/tables/sorting", icon: ArrowUpDown },
      { name: "Filtering", path: "/tables/filtering", icon: Filter },
      { name: "Pagination", path: "/tables/pagination", icon: List },
      { name: "Row Selection", path: "/tables/row-selection", icon: CheckSquare },
      { name: "Editable", path: "/tables/editable", icon: TableProperties },
      { name: "Sticky", path: "/tables/sticky", icon: Pin },
      { name: "Column Visibility", path: "/tables/column-visibility", icon: Eye },
      { name: "Drag & Drop", path: "/tables/drag-drop", icon: GripVertical },
      { name: "Empty State", path: "/tables/empty-state", icon: Inbox },
    ],
  },
  {
    label: "Charts & Data",
    items: [
      { name: "Line Charts", path: "/charts/line", icon: LineChart },
      { name: "Area Charts", path: "/charts/area", icon: AreaChart },
      { name: "Bar Charts", path: "/charts/bar", icon: BarChart },
      { name: "Pie & Doughnut", path: "/charts/pie", icon: PieChart },
      { name: "Radar & Radial", path: "/charts/radar", icon: Radar },
      { name: "Candlestick", path: "/charts/candlestick", icon: CandlestickChart },
      { name: "KPI Cards", path: "/charts/kpi", icon: Gauge },
      { name: "Realtime Metrics", path: "/charts/realtime", icon: Radio, badge: "Live", badgeTone: "hot" },
      { name: "Chart Dashboard", path: "/charts/dashboard", icon: LayoutGrid },
      { name: "Reports", path: "/charts/reports", icon: FileBarChart },
    ],
  },
  {
    label: "UI Components",
    items: [
      { name: "Buttons", path: "/ui/buttons", icon: Hand },
      { name: "Badges", path: "/ui/badges", icon: Award },
      { name: "Cards", path: "/ui/cards", icon: LayoutGrid },
      { name: "Alerts", path: "/ui/alerts", icon: AlertTriangle },
      { name: "Avatars", path: "/ui/avatars", icon: CircleUser },
      { name: "Dropdowns", path: "/ui/dropdowns", icon: ChevronDownSquare },
      { name: "Modals", path: "/ui/modals", icon: SquareStack },
      { name: "Drawers", path: "/ui/drawers", icon: PanelTop },
      { name: "Tabs", path: "/ui/tabs", icon: PanelsTopLeft },
      { name: "Accordions", path: "/ui/accordions", icon: ChevronDown },
      { name: "Tooltips", path: "/ui/tooltips", icon: HelpCircle },
      { name: "Popovers", path: "/ui/popovers", icon: Anchor },
      { name: "Breadcrumbs", path: "/ui/breadcrumbs", icon: Stack },
      { name: "Pagination", path: "/ui/pagination", icon: List },
      { name: "Progress", path: "/ui/progress", icon: Activity },
      { name: "Spinners", path: "/ui/spinners", icon: RotateCw },
      { name: "Toasts", path: "/ui/toasts", icon: Bell },
      { name: "Timeline", path: "/ui/timeline", icon: History },
      { name: "Empty States", path: "/ui/empty-states", icon: Inbox },
      { name: "Banners", path: "/ui/banners", icon: Megaphone },
      { name: "Command Menu", path: "/ui/command-menu", icon: Sparkles },
    ],
  },
  {
    label: "Pages",
    items: [
      { name: "Landing", path: "/pages/landing", icon: Plane },
      { name: "Pricing", path: "/pages/pricing", icon: CreditCard },
      { name: "FAQ", path: "/pages/faq", icon: HelpCircle },
      { name: "Help Center", path: "/pages/help-center", icon: BookOpen },
      { name: "About", path: "/pages/about", icon: CircleUser },
      { name: "Contact", path: "/pages/contact", icon: Phone },
      { name: "Maintenance", path: "/pages/maintenance", icon: Wrench },
      { name: "Coming Soon", path: "/pages/coming-soon", icon: Clock },
      { name: "Changelog", path: "/pages/changelog", icon: FileText },
      { name: "Roadmap", path: "/pages/roadmap", icon: MapIcon },
    ],
  },
  {
    label: "Authentication",
    items: [
      { name: "Login", path: "/auth/login", icon: LogIn },
      { name: "Register", path: "/auth/register", icon: SignUp },
      { name: "Forgot Password", path: "/auth/forgot-password", icon: ForgotKey },
      { name: "Reset Password", path: "/auth/reset-password", icon: ShieldCheck },
      { name: "Two Step", path: "/auth/two-step", icon: LockKeyhole },
      { name: "Lock Screen", path: "/auth/lock-screen", icon: Lock },
      { name: "Side Login", path: "/auth/side-login", icon: PanelLeft },
      { name: "Side Register", path: "/auth/side-register", icon: UserPlus },
      { name: "Boxed Login", path: "/auth/boxed-login", icon: LogIn },
      { name: "Boxed Register", path: "/auth/boxed-register", icon: UserPlus },
    ],
  },
  {
    label: "Errors",
    items: [
      { name: "400", path: "/errors/400", icon: Bug },
      { name: "401", path: "/errors/401", icon: Ban },
      { name: "403", path: "/errors/403", icon: AlertOctagon },
      { name: "404", path: "/errors/404", icon: FileWarning },
      { name: "500", path: "/errors/500", icon: ServerCrash },
      { name: "503", path: "/errors/503", icon: CloudOff },
    ],
  },
];

// Flat list for command palette
export const flatNav: { group: string; parent: string; name: string; path: string }[] = navigation.flatMap(
  (section) =>
    section.items.flatMap((item) =>
      item.children
        ? item.children.map((c) => ({
            group: section.label,
            parent: item.name,
            name: c.name,
            path: c.path,
          }))
        : [{ group: section.label, parent: item.name, name: item.name, path: item.path! }]
    )
);
