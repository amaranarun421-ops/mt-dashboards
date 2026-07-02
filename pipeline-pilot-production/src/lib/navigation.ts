// Central navigation config — used by Sidebar, Command Palette, and Breadcrumbs
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  DollarSign,
  GitBranch,
  Handshake,
  Users,
  Building2,
  Contact,
  UserPlus,
  Target,
  Map,
  Activity,
  Phone,
  Calendar,
  Mail,
  CheckSquare,
  Trello,
  BarChart3,
  FileBarChart,
  Bookmark,
  TrendingUp,
  Filter,
  Percent,
  HeartPulse,
  AlertTriangle,
  Trophy,
  Flag,
  Coins,
  Receipt,
  BookOpen,
  Megaphone,
  Plug,
  RefreshCw,
  Upload,
  Download,
  Bell,
  Inbox,
  Command,
  ScrollText,
  Shield,
  UsersRound,
  CreditCard,
  Key,
  Webhook,
  Settings,
  User,
  Lock,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  badgeVariant?: 'default' | 'accent' | 'warning' | 'destructive';
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    items: [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Revenue', href: '/dashboard/revenue', icon: DollarSign },
      { label: 'Command Center', href: '/dashboard/command-center', icon: Command, badge: 'New', badgeVariant: 'accent' },
    ],
  },
  {
    id: 'pipeline',
    label: 'Pipeline',
    items: [
      { label: 'Sales Pipeline', href: '/dashboard/pipeline', icon: GitBranch },
      { label: 'Pipeline Board', href: '/dashboard/pipeline-board', icon: Trello },
      { label: 'Kanban Deals', href: '/dashboard/kanban-deals', icon: Trello },
      { label: 'Deals', href: '/dashboard/deals', icon: Handshake, badge: 16 },
      { label: 'Opportunities', href: '/dashboard/opportunities', icon: Target },
      { label: 'Leads', href: '/dashboard/leads', icon: UserPlus, badge: 10, badgeVariant: 'accent' },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    items: [
      { label: 'Customers', href: '/dashboard/customers', icon: Users },
      { label: 'Accounts', href: '/dashboard/accounts', icon: Building2 },
      { label: 'Contacts', href: '/dashboard/contacts', icon: Contact },
      { label: 'Customer Health', href: '/dashboard/customer-health', icon: HeartPulse },
      { label: 'Churn Risk', href: '/dashboard/churn-risk', icon: AlertTriangle, badge: 6, badgeVariant: 'destructive' },
    ],
  },
  {
    id: 'activities',
    label: 'Activities',
    items: [
      { label: 'Sales Activities', href: '/dashboard/activities', icon: Activity },
      { label: 'Calls', href: '/dashboard/calls', icon: Phone, badge: 6 },
      { label: 'Meetings', href: '/dashboard/meetings', icon: Calendar },
      { label: 'Emails', href: '/dashboard/emails', icon: Mail },
      { label: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare, badge: 7, badgeVariant: 'warning' },
      { label: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
      { label: 'Inbox', href: '/dashboard/inbox', icon: Inbox, badge: 2, badgeVariant: 'accent' },
    ],
  },
  {
    id: 'forecast',
    label: 'Forecast & Targets',
    items: [
      { label: 'Forecasting', href: '/dashboard/forecasting', icon: TrendingUp },
      { label: 'Quota Tracking', href: '/dashboard/quota-tracking', icon: Target },
      { label: 'Targets', href: '/dashboard/targets', icon: Flag },
      { label: 'Commissions', href: '/dashboard/commissions', icon: Coins },
      { label: 'Compensation Plans', href: '/dashboard/compensation-plans', icon: Receipt },
    ],
  },
  {
    id: 'team',
    label: 'Team & Territories',
    items: [
      { label: 'Team Performance', href: '/dashboard/team', icon: Users },
      { label: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
      { label: 'Territories', href: '/dashboard/territories', icon: Map },
    ],
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    items: [
      { label: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
      { label: 'Report Builder', href: '/dashboard/report-builder', icon: FileBarChart },
      { label: 'Saved Reports', href: '/dashboard/saved-reports', icon: Bookmark },
      { label: 'Revenue Analytics', href: '/dashboard/revenue-analytics', icon: DollarSign },
      { label: 'Funnel Analytics', href: '/dashboard/funnel-analytics', icon: Filter },
      { label: 'Conversion Analytics', href: '/dashboard/conversion-analytics', icon: Percent },
      { label: 'Win/Loss Analysis', href: '/dashboard/win-loss-analysis', icon: BarChart3 },
      { label: 'Campaign Attribution', href: '/dashboard/campaign-attribution', icon: Megaphone },
      { label: 'Sales Playbooks', href: '/dashboard/playbooks', icon: BookOpen },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    items: [
      { label: 'Integrations', href: '/dashboard/integrations', icon: Plug },
      { label: 'CRM Sync', href: '/dashboard/crm-sync', icon: RefreshCw },
      { label: 'Import Data', href: '/dashboard/import', icon: Upload },
      { label: 'Export Center', href: '/dashboard/export', icon: Download },
      { label: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: 3, badgeVariant: 'destructive' },
      { label: 'Audit Logs', href: '/dashboard/audit-logs', icon: ScrollText },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    items: [
      { label: 'Roles & Permissions', href: '/dashboard/roles-permissions', icon: Shield },
      { label: 'Team Management', href: '/dashboard/team-management', icon: UsersRound },
      { label: 'Billing', href: '/dashboard/billing', icon: CreditCard },
      { label: 'Subscription', href: '/dashboard/subscription', icon: Receipt },
      { label: 'API Keys', href: '/dashboard/api-keys', icon: Key },
      { label: 'Webhooks', href: '/dashboard/webhooks', icon: Webhook },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    items: [
      { label: 'Workspace Settings', href: '/dashboard/workspace-settings', icon: Settings },
      { label: 'Profile Settings', href: '/dashboard/profile-settings', icon: User },
      { label: 'Security Settings', href: '/dashboard/security-settings', icon: Lock },
    ],
  },
];

// Flattened for command palette & search
export const ALL_NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

// Routes that should NOT show the dashboard chrome (sidebar + header)
export const STANDALONE_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/two-factor',
  '/invite-team',
  '/onboarding',
];
