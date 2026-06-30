import {
  Bot,
  Boxes,
  Brain,
  Briefcase,
  BarChart3,
  DollarSign,
  LayoutDashboard,
  LineChart,
  ShoppingCart,
  Truck,
  Component,
  FormInput,
  Table2,
  PieChart,
  MapPin,
  Map as MapIcon,
  MessagesSquare,
  LogIn,
  UserPlus,
  KeyRound,
  ShieldCheck,
  MailCheck,
  LockKeyhole,
  Hash,
  Sparkles,
  MonitorSmartphone,
  Layers,
  Package,
  Plus,
  CreditCard,
  FileText,
  Receipt,
  ArrowLeftRight,
  LayoutGrid,
  Code2,
  Video,
  Settings,
  Image as ImageIcon,
  User,
  HelpCircle,
  Key,
  Plug,
  Activity,
  Bell,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Wrench,
  Database,
  Maximize2,
  MessageSquare,
  Calendar,
  Zap,
  Folder,
  type LucideIcon,
} from 'lucide-react';
import type { DashboardKey, ComponentKey, EcommerceKey, AiAssistantKey, PagesKey, AuthKey } from '@/lib/dashboard-store';

export interface DashboardNavItem {
  key: DashboardKey;
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export interface ComponentNavItem {
  key: ComponentKey;
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export interface EcommerceNavItem {
  key: EcommerceKey;
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { key: 'ecommerce', label: 'Commerce Revenue Studio', description: 'Orders, checkout, revenue, and customers', icon: ShoppingCart },
  { key: 'analytics', label: 'Audience Intelligence Lab', description: 'Traffic, conversion, and behavior insights', icon: BarChart3 },
  { key: 'marketing', label: 'Campaign Performance Hub', description: 'Channels, spend, creative, and ROAS', icon: LineChart },
  { key: 'crm', label: 'Relationship Pipeline Desk', description: 'Accounts, leads, health, and renewals', icon: Briefcase },
  { key: 'stocks', label: 'Market Signals Terminal', description: 'Portfolio, holdings, movers, and risk', icon: DollarSign },
  { key: 'saas', label: 'Subscription Growth Console', description: 'MRR, churn, expansion, and lifecycle', icon: LayoutDashboard },
  { key: 'logistics', label: 'Fleet Operations Tower', description: 'Shipments, routes, carriers, and SLA', icon: Truck },
  { key: 'ai', label: 'AI Operations Workspace', description: 'Models, prompts, tokens, agents, and spend', icon: Bot, badge: 'NEW' },
  { key: 'sales', label: 'Revenue Pipeline Command', description: 'Deals, quota, forecast, and reps', icon: Boxes },
  { key: 'finance', label: 'Cashflow Control Center', description: 'P&L, budgets, cards, invoices, and cash', icon: Brain, badge: 'NEW' },
];

export const COMPONENT_NAV: ComponentNavItem[] = [
  { key: 'forms-inputs', label: 'Forms & Inputs', description: 'Buttons, inputs, selects, switches, sliders, ratings, upload', icon: FormInput },
  { key: 'navigation-menus', label: 'Navigation & Menus', description: 'Dropdowns, tabs, accordions, breadcrumbs, pagination', icon: LayoutGrid },
  { key: 'feedback-status', label: 'Feedback & Status', description: 'Alerts, toasts, progress, skeletons, empty/error states', icon: Bell },
  { key: 'data-display', label: 'Data Display', description: 'Cards, lists, timelines, avatars, badges, chips', icon: Database },
  { key: 'date-search', label: 'Date & Search', description: 'Date pickers, search bars, filter bars, sort controls', icon: Calendar },
  { key: 'media-content', label: 'Media & Content', description: 'Carousels, players, code blocks, copy actions', icon: Video },
  { key: 'communication', label: 'Communication', description: 'Chat, comments, reviews, share, social icons', icon: MessageSquare },
  { key: 'overlay-interactive', label: 'Overlay & Interactive', description: 'Tooltips, popovers, scroll areas, sticky bars', icon: Maximize2 },
  { key: 'utility-customization', label: 'Utility', description: 'Theme, color, language switchers, dividers', icon: Settings },
  { key: 'interactive-utilities', label: 'Interactive', description: 'KPI widgets, animations, counters, link previews', icon: Zap },
  { key: 'ui-elements', label: 'UI Elements (Legacy)', description: 'Original UI elements page', icon: Component },
  { key: 'advanced-ui', label: 'Advanced UI', description: 'Animations, transitions, complex widgets', icon: Sparkles, badge: 'NEW' },
  { key: 'extended-ui', label: 'Extended UI', description: 'Calendar, kanban, timeline, command palette', icon: Layers },
  { key: 'forms', label: 'Forms', description: 'Inputs, validation, layouts, wizards', icon: FormInput },
  { key: 'tables', label: 'Tables', description: 'Sortable, filterable, expandable tables', icon: Table2 },
  { key: 'charts', label: 'Charts', description: 'Line, bar, pie, radar, radial charts', icon: PieChart },
  { key: 'maps', label: 'Maps', description: 'Interactive world map, markers, regions', icon: MapIcon, badge: 'NEW' },
  { key: 'chat', label: 'Chat', description: 'Chat inbox, conversations, messages', icon: MessagesSquare, badge: 'NEW' },
  { key: 'file-manager', label: 'File Manager', description: 'File browser, folders, preview, upload', icon: Folder, badge: 'NEW' },
];

// 10 e-commerce pages: Products + Product Detail at top, then 8 others
export const ECOMMERCE_NAV: EcommerceNavItem[] = [
  // Top 2 — new mega pages
  { key: 'products', label: 'Products', description: 'Catalog showcase with 8 sections', icon: Package, badge: 'NEW' },
  { key: 'product-detail', label: 'Product Detail', description: 'Full PDP with 10 sections', icon: LayoutGrid, badge: 'NEW' },
  // Divider — existing pages below
  { key: 'product-cards', label: 'Product Cards', description: 'Grid + list view toggle', icon: Package },
  { key: 'add-product', label: 'Add Product', description: 'Create a new product with variants', icon: Plus },
  { key: 'billing', label: 'Billing', description: 'Payment methods and billing history', icon: CreditCard },
  { key: 'invoices', label: 'Invoices', description: 'All invoices with status and filters', icon: FileText },
  { key: 'single-invoice', label: 'Single Invoice', description: 'Invoice detail view with line items', icon: Receipt },
  { key: 'create-invoice', label: 'Create Invoice', description: 'Build a new invoice with dynamic items', icon: FileText },
  { key: 'transactions', label: 'Transactions', description: 'Payment transactions with status', icon: ArrowLeftRight },
  { key: 'single-transaction', label: 'Single Transaction', description: 'Transaction detail with timeline', icon: Receipt },
];

export function getDashboardMeta(key: DashboardKey): DashboardNavItem {
  return DASHBOARD_NAV.find((item) => item.key === key) ?? DASHBOARD_NAV[0];
}

export function getComponentMeta(key: ComponentKey): ComponentNavItem {
  return COMPONENT_NAV.find((item) => item.key === key) ?? COMPONENT_NAV[0];
}

export function getEcommerceMeta(key: EcommerceKey): EcommerceNavItem {
  return ECOMMERCE_NAV.find((item) => item.key === key) ?? ECOMMERCE_NAV[0];
}

export interface AiAssistantNavItem {
  key: AiAssistantKey;
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export const AI_ASSISTANT_NAV: AiAssistantNavItem[] = [
  { key: 'chat', label: 'Chat', description: 'AI chat assistant with conversation history', icon: Bot },
  { key: 'workspace', label: 'Workspace', description: 'Projects, recent files, and models', icon: Layers },
  { key: 'image-generator', label: 'Image Generator', description: 'Generate images from text prompts', icon: ImageIcon, badge: 'NEW' },
  { key: 'code-generator', label: 'Code Generator', description: 'Generate code from descriptions', icon: Code2, badge: 'NEW' },
  { key: 'video-generator', label: 'Video Generator', description: 'Generate videos from prompts', icon: Video, badge: 'NEW' },
  { key: 'settings', label: 'Settings', description: 'API keys, model preferences, limits', icon: Settings },
  { key: 'api-usage', label: 'API Usage', description: 'Token usage, costs, model distribution', icon: BarChart3 },
];

export interface PagesNavItem {
  key: PagesKey;
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export const PAGES_NAV: PagesNavItem[] = [
  { key: 'profile', label: 'Profile', description: 'User profile with cover and tabs', icon: User },
  { key: 'settings', label: 'Settings', description: 'Vertical tabbed settings panels', icon: Settings },
  { key: 'pricing', label: 'Pricing', description: '3 pricing columns with toggle', icon: DollarSign },
  { key: 'faq', label: 'FAQ', description: 'Category sidebar + accordion', icon: HelpCircle },
  { key: 'api-keys', label: 'API Keys', description: 'Key table with create modal', icon: Key },
  { key: 'integrations', label: 'Integrations', description: 'App-store grid with connect', icon: Plug },
  { key: 'activity-log', label: 'Activity Log', description: 'Vertical timeline with filters', icon: Activity },
  { key: 'notifications', label: 'Notifications', description: 'List with filter tabs', icon: Bell },
  { key: 'team', label: 'Team', description: 'Member table + invite modal', icon: Users },
  { key: 'success', label: 'Success', description: 'Centered success with animation', icon: CheckCircle2 },
  { key: 'blank', label: 'Blank Page', description: 'Minimal empty canvas', icon: FileText },
  { key: '404', label: '404 Error', description: 'Page not found', icon: AlertTriangle },
  { key: '500', label: '500 Error', description: 'Internal server error', icon: XCircle },
  { key: '503', label: '503 Error', description: 'Service unavailable', icon: AlertTriangle },
  { key: 'coming-soon', label: 'Coming Soon', description: 'Countdown timer page', icon: Clock },
  { key: 'maintenance', label: 'Maintenance', description: 'Under maintenance page', icon: Wrench },
];

export interface AuthNavItem {
  key: AuthKey;
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export const AUTH_NAV: AuthNavItem[] = [
  { key: 'sign-in', label: 'Sign In', description: 'Email + password login with social options', icon: LogIn },
  { key: 'sign-up', label: 'Sign Up', description: 'Create a new account with email verification', icon: UserPlus },
  { key: 'forgot-password', label: 'Forgot Password', description: 'Request a password reset link', icon: KeyRound },
  { key: 'reset-password', label: 'Reset Password', description: 'Set a new password from reset link', icon: LockKeyhole },
  { key: 'verify-email', label: 'Verify Email', description: 'Confirm email ownership via link', icon: MailCheck },
  { key: 'two-factor', label: 'Two-Factor Auth', description: 'TOTP authenticator setup and verify', icon: ShieldCheck, badge: 'NEW' },
  { key: 'otp', label: 'OTP Verification', description: '6-digit one-time code entry', icon: Hash },
  { key: 'welcome', label: 'Welcome Onboarding', description: 'Multi-step welcome flow', icon: Sparkles, badge: 'NEW' },
  { key: 'sessions', label: 'Active Sessions', description: 'Devices and security settings', icon: MonitorSmartphone },
];

export function getAuthMeta(key: AuthKey): AuthNavItem {
  return AUTH_NAV.find((item) => item.key === key) ?? AUTH_NAV[0];
}
