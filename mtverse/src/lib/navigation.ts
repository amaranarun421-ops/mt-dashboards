import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, ShoppingCart, BarChart3, Users, Wallet, Sparkles,
  Megaphone, Cloud, Truck, TrendingUp, LifeBuoy, KanbanSquare, Briefcase,
  MessageSquare, Mail, Kanban, StickyNote, Calendar, FolderOpen, ListTodo,
  Bot, FileText, Package, GitBranch, UsersRound,
  LogIn, UserPlus, KeyRound, Lock, ShieldCheck, Smartphone, Power, Wrench, Rocket,
  CreditCard, Key, Activity, ScrollText, Bell, Plug, User, Users2, LockKeyhole,
  Settings, ShieldAlert, Receipt, HelpCircle, FileQuestion, History,
  FormInput, TextCursorInput, Table2, LineChart, Map, Compass,
  AlertCircle, Layers, Square, PanelRight, PanelTop, FolderTree,
  Clock, Loader, GitCommitHorizontal, Upload, Move, Maximize2, FileEdit,
  Image, Inbox, Search,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const BRAND = {
  name: "MTVerse",
  short: "MTV",
  tagline: "Enterprise Dashboard Kit",
  description:
    "MTVerse is a premium enterprise dashboard kit built for modern teams. Modular, accessible, and production-ready.",
  url: "https://mtverse.example.com",
  email: "hello@mtverse.example.com",
};

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Dashboards",
    items: [
      { href: "/", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboards/ecommerce", label: "Ecommerce", icon: ShoppingCart },
      { href: "/dashboards/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/dashboards/crm", label: "CRM", icon: Users },
      { href: "/dashboards/finance", label: "Finance", icon: Wallet },
      { href: "/dashboards/ai-workspace", label: "AI Workspace", icon: Sparkles, badge: "New" },
      { href: "/dashboards/marketing", label: "Marketing", icon: Megaphone },
      { href: "/dashboards/saas", label: "SaaS", icon: Cloud },
      { href: "/dashboards/logistics", label: "Logistics", icon: Truck },
      { href: "/dashboards/sales", label: "Sales", icon: TrendingUp },
      { href: "/dashboards/support", label: "Support", icon: LifeBuoy },
      { href: "/dashboards/projects", label: "Project Management", icon: KanbanSquare },
      { href: "/dashboards/hr", label: "HR", icon: Briefcase },
    ],
  },
  {
    title: "Applications",
    items: [
      { href: "/apps/chat", label: "Chat", icon: MessageSquare },
      { href: "/apps/email", label: "Email", icon: Mail },
      { href: "/apps/kanban", label: "Kanban Board", icon: Kanban },
      { href: "/apps/notes", label: "Notes", icon: StickyNote },
      { href: "/apps/calendar", label: "Calendar", icon: Calendar },
      { href: "/apps/file-manager", label: "File Manager", icon: FolderOpen },
      { href: "/apps/tasks", label: "Task Manager", icon: ListTodo },
      { href: "/apps/ai-assistant", label: "AI Assistant", icon: Bot, badge: "AI" },
      { href: "/apps/invoice", label: "Invoice System", icon: FileText },
      { href: "/apps/ecommerce-products", label: "Product Management", icon: Package },
      { href: "/apps/crm-pipeline", label: "CRM Pipeline", icon: GitBranch },
      { href: "/apps/team-workspace", label: "Team Workspace", icon: UsersRound },
    ],
  },
  {
    title: "Enterprise",
    items: [
      { href: "/enterprise/pricing", label: "Pricing", icon: CreditCard },
      { href: "/enterprise/api-keys", label: "API Keys", icon: Key },
      { href: "/enterprise/activity-logs", label: "Activity Logs", icon: Activity },
      { href: "/enterprise/audit-logs", label: "Audit Logs", icon: ScrollText },
      { href: "/enterprise/notifications", label: "Notifications", icon: Bell },
      { href: "/enterprise/integrations", label: "Integrations", icon: Plug },
      { href: "/enterprise/profile", label: "User Profile", icon: User },
      { href: "/enterprise/team", label: "Team Management", icon: Users2 },
      { href: "/enterprise/rbac", label: "RBAC / Permissions", icon: LockKeyhole },
      { href: "/enterprise/settings", label: "Settings", icon: Settings },
      { href: "/enterprise/security", label: "Security Center", icon: ShieldAlert },
      { href: "/enterprise/billing", label: "Billing", icon: Receipt },
      { href: "/enterprise/help", label: "Help Center", icon: HelpCircle },
      { href: "/enterprise/faq", label: "FAQ", icon: FileQuestion },
      { href: "/enterprise/changelog", label: "Changelog", icon: History },
    ],
  },
  {
    title: "Authentication",
    items: [
      { href: "/auth/signin", label: "Sign In", icon: LogIn },
      { href: "/auth/signup", label: "Sign Up", icon: UserPlus },
      { href: "/auth/forgot", label: "Forgot Password", icon: KeyRound },
      { href: "/auth/reset", label: "Reset Password", icon: Lock },
      { href: "/auth/otp", label: "OTP Verification", icon: Smartphone },
      { href: "/auth/two-factor", label: "Two Factor", icon: ShieldCheck },
      { href: "/auth/sessions", label: "Sessions", icon: Activity },
      { href: "/auth/lock", label: "Lock Screen", icon: Power },
      { href: "/auth/maintenance", label: "Maintenance", icon: Wrench },
      { href: "/auth/coming-soon", label: "Coming Soon", icon: Rocket },
    ],
  },
  {
    title: "UI Library",
    items: [
      { href: "/ui/forms", label: "Advanced Forms", icon: FormInput },
      { href: "/ui/inputs", label: "Input Variants", icon: TextCursorInput },
      { href: "/ui/tables", label: "Data Tables", icon: Table2 },
      { href: "/ui/charts", label: "Charts", icon: LineChart },
      { href: "/ui/maps", label: "Maps", icon: Map },
      { href: "/ui/navigation", label: "Navigation", icon: Compass },
      { href: "/ui/feedback", label: "Feedback", icon: AlertCircle },
      { href: "/ui/overlays", label: "Overlays", icon: Layers },
      { href: "/ui/modals", label: "Advanced Modals", icon: Square },
      { href: "/ui/drawers", label: "Drawers", icon: PanelRight },
      { href: "/ui/popovers", label: "Popovers", icon: PanelTop },
      { href: "/ui/tabs", label: "Tabs", icon: FolderTree },
      { href: "/ui/accordions", label: "Accordions", icon: FolderTree },
      { href: "/ui/command", label: "Command Palette", icon: Search },
      { href: "/ui/skeletons", label: "Skeletons", icon: Clock },
      { href: "/ui/loaders", label: "Loaders", icon: Loader },
      { href: "/ui/timeline", label: "Timeline", icon: GitCommitHorizontal },
      { href: "/ui/file-upload", label: "File Upload", icon: Upload },
      { href: "/ui/drag-drop", label: "Drag & Drop", icon: Move },
      { href: "/ui/resizable", label: "Resizable Layouts", icon: Maximize2 },
      { href: "/ui/rich-text", label: "Rich Text Editor", icon: FileEdit },
      { href: "/ui/media-gallery", label: "Media Gallery", icon: Image },
      { href: "/ui/empty-states", label: "Empty States", icon: Inbox },
      { href: "/ui/search", label: "Advanced Search", icon: Search },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

export const COMMAND_PALETTE_ITEMS = ALL_NAV_ITEMS.map((item) => ({
  label: item.label,
  href: item.href,
  icon: item.icon,
  group: NAV_GROUPS.find((g) => g.items.includes(item))?.title ?? "",
}));
