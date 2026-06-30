'use client';

import * as React from 'react';
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { useDashboardStore } from '@/lib/dashboard-store';
import { DASHBOARD_NAV, COMPONENT_NAV, ECOMMERCE_NAV, AI_ASSISTANT_NAV, PAGES_NAV, AUTH_NAV } from '@/lib/dashboard-nav';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

/* ========================================================================
   Deep search index — every individual UI element, section, and feature
   across the entire platform. When you search "alerts", it finds the
   Alerts section inside UI Elements and navigates there + scrolls to it.
   ======================================================================== */

interface CommandItem {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  group: string;
  onSelect: () => void;
}

/* Section-level items that live INSIDE specific pages.
   When selected, we navigate to the page AND scroll to the section. */
interface SectionItem {
  label: string;
  keywords: string[];
  page: 'ui-elements' | 'advanced-ui' | 'extended-ui' | 'forms' | 'tables' | 'charts' | 'ecommerce' | 'analytics' | 'marketing' | 'crm' | 'saas' | 'logistics' | 'ai' | 'sales' | 'finance';
  pageLabel: string;
  icon: LucideIcon;
}

// Import icons for section items
import {
  LayoutDashboard, ShoppingCart, Bot, FileText, Component, ShieldCheck,
  Bell, AlertTriangle, Info, CheckCircle2, Eye, Heart, Star, Plus, X,
  Search as SearchIcon, Mail, Lock, Key, Settings, User, Users, Calendar,
  Clock, Download, Upload, Copy, Trash2, Edit3, Share2, Zap, Sparkles,
  Code2, Video, Image as ImageIcon, MessageSquare, Bell as BellIcon,
  TrendingUp, BarChart3, PieChart, LineChart, DollarSign, Package,
  CreditCard, Receipt, ArrowLeftRight, Table2, FormInput, Layers,
  Hash, Gauge, Sliders, ToggleLeft, Palette, Type, Bold, Italic,
  Underline, AlignLeft, List, Grid2x2, Columns, Filter, SortAsc,
  ChevronDown, ChevronRight, Maximize2, Minimize2, RefreshCw, Loader2,
  Check, ArrowRight, MoreHorizontal, Menu, PanelLeft,
  Folder, FolderOpen, File as FileIcon, Inbox, Send, Paperclip, Star as StarIcon,
  Bookmark, ThumbsUp, GitBranch, Activity, Server, Database, Cloud,
  Cpu, HardDrive, Wifi, Shield, Globe, Moon, Sun, Command as CommandIcon,
  Wrench, Wrench as WrenchIcon, HelpCircle, Plug, KeyRound, LockKeyhole,
  MailCheck, LogIn, UserPlus, MonitorSmartphone, Play, Pause, Volume2,
} from 'lucide-react';

// Tag/Megaphone icon aliases — declared before DEEP_SECTIONS so they're
// available where the data uses them. Typed as LucideIcon for type safety.
const Tag: LucideIcon = ((props: any) => <Hash {...props} />) as unknown as LucideIcon;
const Megaphone: LucideIcon = ((props: any) => <BellIcon {...props} />) as unknown as LucideIcon;

const DEEP_SECTIONS: SectionItem[] = [
  // === UI Elements sections ===
  { label: 'Buttons', keywords: ['button', 'primary', 'secondary', 'ghost', 'cta'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Zap },
  { label: 'Badges & Chips', keywords: ['badge', 'chip', 'status', 'tag'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Tag },
  { label: 'Form Inputs', keywords: ['input', 'text', 'email', 'password', 'form'], page: 'ui-elements', pageLabel: 'UI Elements', icon: FormInput },
  { label: 'Alerts', keywords: ['alert', 'warning', 'error', 'success', 'info', 'notification'], page: 'ui-elements', pageLabel: 'UI Elements', icon: AlertTriangle },
  { label: 'Tooltips', keywords: ['tooltip', 'hint', 'hover'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Info },
  { label: 'Popovers', keywords: ['popover', 'popup', 'overlay'], page: 'ui-elements', pageLabel: 'UI Elements', icon: MoreHorizontal },
  { label: 'Breadcrumbs', keywords: ['breadcrumb', 'navigation', 'path'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ChevronRight },
  { label: 'Avatars', keywords: ['avatar', 'profile', 'user image'], page: 'ui-elements', pageLabel: 'UI Elements', icon: User },
  { label: 'Progress & Sparklines', keywords: ['progress', 'sparkline', 'bar', 'trend'], page: 'ui-elements', pageLabel: 'UI Elements', icon: TrendingUp },
  { label: 'Tabs', keywords: ['tab', 'tabbed', 'switcher'], page: 'ui-elements', pageLabel: 'UI Elements', icon: PanelLeft },
  { label: 'Dividers', keywords: ['divider', 'separator', 'line'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Minimize2 },
  { label: 'Toast Previews', keywords: ['toast', 'snackbar', 'notification popup'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Bell },
  { label: 'Segmented Control', keywords: ['segmented', 'toggle', 'pill switch'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ToggleLeft },
  { label: 'Stepper', keywords: ['stepper', 'steps', 'wizard', 'progress steps'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ChevronRight },
  { label: 'File Dropzone', keywords: ['file', 'upload', 'drop', 'drag'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Upload },
  { label: 'Color Swatch Picker', keywords: ['color', 'swatch', 'picker', 'palette'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Palette },
  { label: 'Avatar Group', keywords: ['avatar', 'group', 'stack', 'team'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Users },
  { label: 'Tag Input', keywords: ['tag', 'chip', 'input', 'multi'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Tag },
  { label: 'OTP Input', keywords: ['otp', 'code', 'verification', 'pin'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Hash },
  { label: 'Command Input', keywords: ['command', 'search', 'shortcut'], page: 'ui-elements', pageLabel: 'UI Elements', icon: CommandIcon },
  { label: 'Skeleton Loaders', keywords: ['skeleton', 'loading', 'shimmer', 'placeholder'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Loader2 },
  { label: 'Keyboard Shortcuts', keywords: ['keyboard', 'shortcut', 'kbd', 'hotkey'], page: 'ui-elements', pageLabel: 'UI Elements', icon: CommandIcon },
  { label: 'Copy Field', keywords: ['copy', 'clipboard', 'api key'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Copy },
  { label: 'Rating', keywords: ['rating', 'star', 'review', 'score'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Star },
  { label: 'Pill Toggle Switch', keywords: ['toggle', 'switch', 'pill'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ToggleLeft },
  { label: 'Loading Dots', keywords: ['loading', 'dots', 'spinner', 'bounce'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Loader2 },
  { label: 'Gradient Avatars', keywords: ['avatar', 'gradient', 'initials'], page: 'ui-elements', pageLabel: 'UI Elements', icon: User },
  { label: 'Slider', keywords: ['slider', 'range', 'value'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Sliders },
  { label: 'Circular Progress', keywords: ['circular', 'progress', 'ring', 'gauge'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Gauge },
  { label: 'Spinners', keywords: ['spinner', 'loading', 'ring', 'dots', 'pulse'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Loader2 },
  { label: 'Code Block', keywords: ['code', 'snippet', 'terminal', 'copy'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Code2 },
  { label: 'Pagination', keywords: ['pagination', 'page', 'next', 'previous'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ChevronRight },
  { label: 'Glass Card', keywords: ['glass', 'frosted', 'blur', 'transparent'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Layers },
  { label: 'KPI Cards', keywords: ['kpi', 'metric', 'stat', 'card'], page: 'ui-elements', pageLabel: 'UI Elements', icon: BarChart3 },
  { label: 'Marquee', keywords: ['marquee', 'scroll', 'ticker'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ArrowRight },
  { label: 'Theme Toggle', keywords: ['theme', 'dark', 'light', 'mode'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Moon },
  { label: 'Floating Action Button', keywords: ['fab', 'floating', 'action', 'button'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Plus },
  { label: 'Image Swiper', keywords: ['swiper', 'carousel', 'image slider', 'gallery'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ImageIcon },
  { label: 'Status Indicators', keywords: ['status', 'presence', 'online', 'offline', 'away'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Wifi },
  { label: 'Expandable Search', keywords: ['search', 'expand', 'collapsible'], page: 'ui-elements', pageLabel: 'UI Elements', icon: SearchIcon },
  { label: 'Animated Counter', keywords: ['counter', 'animated', 'count up', 'number'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Hash },
  { label: 'Text Animations', keywords: ['text', 'animation', 'rotating', 'typing', 'gradient', 'shimmer'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Type },
  { label: 'Menu / Close Icon', keywords: ['menu', 'hamburger', 'close', 'toggle icon'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Menu },
  { label: 'Floating Icons', keywords: ['floating', 'icon', 'animated'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Sparkles },
  { label: 'Dropdown Menu', keywords: ['dropdown', 'menu', 'select', 'options'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ChevronDown },
  { label: 'Modal', keywords: ['modal', 'dialog', 'popup', 'overlay'], page: 'ui-elements', pageLabel: 'UI Elements', icon: Maximize2 },
  { label: 'Add to Cart Button', keywords: ['cart', 'add', 'shop', 'buy'], page: 'ui-elements', pageLabel: 'UI Elements', icon: ShoppingCart },

  // === Advanced UI sections ===
  { label: 'Interactive Buttons', keywords: ['interactive', 'like', 'bookmark', 'copy'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Zap },
  { label: 'Loading States', keywords: ['loading', 'skeleton', 'spinner', 'progress'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Loader2 },
  { label: 'Animated Counters', keywords: ['counter', 'animated', 'count', 'number'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Hash },
  { label: 'Image Comparison Slider', keywords: ['comparison', 'before', 'after', 'slider'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Sliders },
  { label: 'Code Editor Mock', keywords: ['code', 'editor', 'syntax', 'highlight'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Code2 },
  { label: 'Drag-and-Drop Sortable List', keywords: ['drag', 'drop', 'sortable', 'reorder'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: List },
  { label: 'Comments Thread', keywords: ['comment', 'thread', 'reply', 'discussion'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: MessageSquare },
  { label: 'Activity Stream', keywords: ['activity', 'feed', 'stream', 'realtime'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Activity },
  { label: 'Empty States', keywords: ['empty', 'no data', 'placeholder'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Inbox },
  { label: 'Accordion', keywords: ['accordion', 'collapse', 'expand', 'faq'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: ChevronDown },
  { label: 'Carousel', keywords: ['carousel', 'slider', 'auto', 'rotate'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: ImageIcon },
  { label: '3D Tilt Card', keywords: ['3d', 'tilt', 'card', 'perspective'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Sparkles },
  { label: 'Spotlight Card', keywords: ['spotlight', 'cursor', 'glow'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Sparkles },
  { label: 'Magnetic Button', keywords: ['magnetic', 'button', 'cursor', 'attract'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Zap },
  { label: 'Number Ticker', keywords: ['ticker', 'number', 'count', 'roll'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Hash },
  { label: 'Glow Pulse', keywords: ['glow', 'pulse', 'ring', 'animated'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Sparkles },
  { label: 'Gradient Border Card', keywords: ['gradient', 'border', 'animated'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Layers },
  { label: 'Stagger List', keywords: ['stagger', 'list', 'fade in', 'animation'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: List },
  { label: 'Morphing Shape', keywords: ['morph', 'shape', 'blob', 'svg'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Sparkles },
  { label: 'Confetti Burst', keywords: ['confetti', 'burst', 'celebration'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Sparkles },
  { label: 'Liquid Tab', keywords: ['liquid', 'tab', 'smooth', 'indicator'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: PanelLeft },
  { label: 'Reveal on Hover', keywords: ['reveal', 'hover', 'slide up'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Eye },
  { label: 'Parallax Cards', keywords: ['parallax', 'depth', 'layer', 'scroll'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Layers },
  { label: 'Wave Background', keywords: ['wave', 'background', 'animated', 'svg'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Sparkles },
  { label: 'Neon Glow Card', keywords: ['neon', 'glow', 'border', 'pulse'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Zap },
  { label: 'Live Counter Widget', keywords: ['live', 'counter', 'realtime', 'widget'], page: 'advanced-ui', pageLabel: 'Advanced UI', icon: Activity },

  // === Extended UI sections ===
  { label: 'Calendar', keywords: ['calendar', 'date', 'picker', 'schedule'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Calendar },
  { label: 'Activity Timeline', keywords: ['timeline', 'activity', 'history', 'events'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Clock },
  { label: 'Kanban Board', keywords: ['kanban', 'board', 'drag', 'column', 'card'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Columns },
  { label: 'File Manager', keywords: ['file', 'manager', 'folder', 'browse'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Folder },
  { label: 'Chat / Messaging', keywords: ['chat', 'message', 'messaging', 'conversation'], page: 'extended-ui', pageLabel: 'Extended UI', icon: MessageSquare },
  { label: 'Email / Inbox', keywords: ['email', 'inbox', 'mail'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Mail },
  { label: 'Image Gallery', keywords: ['gallery', 'image', 'grid', 'preview'], page: 'extended-ui', pageLabel: 'Extended UI', icon: ImageIcon },
  { label: 'Masonry Layout', keywords: ['masonry', 'pinterest', 'staggered'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Grid2x2 },
  { label: 'Command Palette', keywords: ['command', 'palette', 'search', 'shortcut'], page: 'extended-ui', pageLabel: 'Extended UI', icon: CommandIcon },
  { label: 'Notification Stack', keywords: ['notification', 'toast', 'stack'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Bell },
  { label: 'Inbox Preview', keywords: ['inbox', 'preview', 'message list'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Inbox },
  { label: 'Stat Cards', keywords: ['stat', 'card', 'metric', 'kpi'], page: 'extended-ui', pageLabel: 'Extended UI', icon: BarChart3 },
  { label: 'Tree View', keywords: ['tree', 'file tree', 'expandable', 'folder'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Folder },
  { label: 'Filter Bar', keywords: ['filter', 'bar', 'chips', 'toggle'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Filter },
  { label: 'Bento Grid', keywords: ['bento', 'grid', 'asymmetric', 'dashboard'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Grid2x2 },
  { label: 'Audio Player', keywords: ['audio', 'player', 'music', 'waveform'], page: 'extended-ui', pageLabel: 'Extended UI', icon: Volume2 },

  // === Dashboard features ===
  { label: 'Revenue Trend', keywords: ['revenue', 'trend', 'chart', 'sales'], page: 'ecommerce', pageLabel: 'Commerce Revenue Studio', icon: DollarSign },
  { label: 'Top Products', keywords: ['product', 'top', 'best seller'], page: 'ecommerce', pageLabel: 'Commerce Revenue Studio', icon: Package },
  { label: 'Traffic Sources', keywords: ['traffic', 'source', 'google', 'youtube', 'facebook'], page: 'analytics', pageLabel: 'Audience Intelligence Lab', icon: Globe },
  { label: 'Top Countries', keywords: ['country', 'flag', 'geography', 'demographic'], page: 'analytics', pageLabel: 'Audience Intelligence Lab', icon: Globe },
  { label: 'World Map', keywords: ['map', 'world', 'geography', 'vector'], page: 'analytics', pageLabel: 'Audience Intelligence Lab', icon: Globe },
  { label: 'Conversion Funnel', keywords: ['funnel', 'conversion', 'drop off'], page: 'analytics', pageLabel: 'Audience Intelligence Lab', icon: Filter },
  { label: 'Real-time Sessions', keywords: ['realtime', 'session', 'live', 'visitor'], page: 'analytics', pageLabel: 'Audience Intelligence Lab', icon: Activity },
  { label: 'Campaign Performance', keywords: ['campaign', 'marketing', 'ad', 'roas'], page: 'marketing', pageLabel: 'Campaign Performance Hub', icon: Megaphone },
  { label: 'Pipeline', keywords: ['pipeline', 'deal', 'crm', 'stage'], page: 'crm', pageLabel: 'Relationship Pipeline Desk', icon: TrendingUp },
  { label: 'MRR Movement', keywords: ['mrr', 'revenue', 'saas', 'subscription'], page: 'saas', pageLabel: 'Subscription Growth Console', icon: DollarSign },
  { label: 'Shipments', keywords: ['shipment', 'logistics', 'tracking', 'delivery'], page: 'logistics', pageLabel: 'Fleet Operations Tower', icon: Package },
  { label: 'Image Generator', keywords: ['image', 'generator', 'ai', 'dall-e', 'flux'], page: 'ai', pageLabel: 'AI Image Generator', icon: ImageIcon },
  { label: 'Video Generator', keywords: ['video', 'generator', 'ai', 'sora', 'veo'], page: 'ai', pageLabel: 'AI Video Generator', icon: Video },
  { label: 'Code Generator', keywords: ['code', 'generator', 'ai', 'typescript'], page: 'ai', pageLabel: 'AI Code Generator', icon: Code2 },
  { label: 'AI Settings', keywords: ['ai', 'settings', 'api key', 'model'], page: 'ai', pageLabel: 'AI Settings', icon: Settings },
  { label: 'Portfolio', keywords: ['portfolio', 'stock', 'holdings', 'market'], page: 'sales', pageLabel: 'Revenue Pipeline Command', icon: TrendingUp },
  { label: 'P&L Statement', keywords: ['p&l', 'profit', 'loss', 'finance'], page: 'finance', pageLabel: 'Cashflow Control Center', icon: DollarSign },

  // === E-commerce pages ===
  { label: 'Products Catalog', keywords: ['product', 'catalog', 'grid', 'list'], page: 'ecommerce', pageLabel: 'Products', icon: Package },
  { label: 'Product Detail', keywords: ['product', 'detail', 'pdp'], page: 'ecommerce', pageLabel: 'Product Detail', icon: Package },
  { label: 'Invoices', keywords: ['invoice', 'billing', 'payment'], page: 'ecommerce', pageLabel: 'Invoices', icon: Receipt },
  { label: 'Transactions', keywords: ['transaction', 'payment', 'order'], page: 'ecommerce', pageLabel: 'Transactions', icon: ArrowLeftRight },
  { label: 'Billing', keywords: ['billing', 'payment', 'subscription'], page: 'ecommerce', pageLabel: 'Billing', icon: CreditCard },

  // === Auth pages ===
  { label: 'Sign In', keywords: ['sign in', 'login', 'authenticate'], page: 'ecommerce', pageLabel: 'Authentication', icon: LogIn },
  { label: 'Sign Up', keywords: ['sign up', 'register', 'create account'], page: 'ecommerce', pageLabel: 'Authentication', icon: UserPlus },
  { label: 'Forgot Password', keywords: ['forgot', 'password', 'reset', 'recover'], page: 'ecommerce', pageLabel: 'Authentication', icon: KeyRound },
  { label: 'Two-Factor Auth', keywords: ['2fa', 'two factor', 'totp', 'authenticator'], page: 'ecommerce', pageLabel: 'Authentication', icon: ShieldCheck },
  { label: 'OTP Verification', keywords: ['otp', 'verification', 'code', 'pin'], page: 'ecommerce', pageLabel: 'Authentication', icon: Hash },
  { label: 'Active Sessions', keywords: ['session', 'device', 'security', 'login'], page: 'ecommerce', pageLabel: 'Authentication', icon: MonitorSmartphone },
];

export function CommandPalette() {
  const { commandOpen, setCommandOpen, setActive, setComponent, setEcommerce, setAiAssistant, setPages, setAuth, setSection } = useDashboardStore();
  const [query, setQuery] = React.useState('');
  const [highlight, setHighlight] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setCommandOpen]);

  React.useEffect(() => {
    if (commandOpen) {
      setQuery('');
      setHighlight(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandOpen]);

  // Build page-level items (navigating to whole pages)
  const pageItems: CommandItem[] = React.useMemo(() => {
    const dashboards: CommandItem[] = DASHBOARD_NAV.map((d) => ({
      key: `dash-${d.key}`, label: d.label, description: d.description, icon: d.icon, badge: d.badge,
      group: 'Dashboards',
      onSelect: () => { setActive(d.key); setCommandOpen(false); },
    }));
    const ecommerce: CommandItem[] = ECOMMERCE_NAV.map((e) => ({
      key: `ecom-${e.key}`, label: e.label, description: e.description, icon: e.icon, badge: e.badge,
      group: 'E-commerce',
      onSelect: () => { setEcommerce(e.key); setCommandOpen(false); },
    }));
    const aiItems: CommandItem[] = AI_ASSISTANT_NAV.map((a) => ({
      key: `ai-${a.key}`, label: a.label, description: a.description, icon: a.icon, badge: a.badge,
      group: 'AI Assistant',
      onSelect: () => { setAiAssistant(a.key); setCommandOpen(false); },
    }));
    const components: CommandItem[] = COMPONENT_NAV.map((c) => ({
      key: `comp-${c.key}`, label: c.label, description: c.description, icon: c.icon, badge: c.badge,
      group: 'Components',
      onSelect: () => { setComponent(c.key); setCommandOpen(false); },
    }));
    const pagesItems: CommandItem[] = PAGES_NAV.map((p) => ({
      key: `page-${p.key}`, label: p.label, description: p.description, icon: p.icon,
      group: 'Pages',
      onSelect: () => { setPages(p.key); setCommandOpen(false); },
    }));
    const authItems: CommandItem[] = AUTH_NAV.map((a) => ({
      key: `auth-${a.key}`, label: a.label, description: a.description, icon: a.icon, badge: a.badge,
      group: 'Authentication',
      onSelect: () => { setAuth(a.key); setCommandOpen(false); },
    }));
    return [...dashboards, ...ecommerce, ...aiItems, ...pagesItems, ...components, ...authItems];
  }, [setActive, setComponent, setEcommerce, setAiAssistant, setPages, setAuth, setCommandOpen]);

  // Build deep section items (navigating to a specific section within a page)
  // Manual useMemo is kept for readability — React Compiler skips this component
  // but the array is still computed only when the setter deps change.
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const sectionItems: CommandItem[] = React.useMemo(() => {
    return DEEP_SECTIONS.map((s, i) => {
      // Determine which setX function to call based on page
      let onSelect: () => void;
      if (s.page === 'ui-elements' || s.page === 'advanced-ui' || s.page === 'extended-ui' || s.page === 'forms' || s.page === 'tables' || s.page === 'charts') {
        onSelect = () => {
          setComponent(s.page as any);
          setCommandOpen(false);
          // Scroll to the section after the page loads
          setTimeout(() => scrollToSection(s.label), 300);
        };
      } else if (s.page === 'ecommerce') {
        onSelect = () => {
          // If it's an auth item, use setAuth instead
          if (s.pageLabel === 'Authentication') {
            const authKey = s.label.toLowerCase().replace(/\s+/g, '-').replace('two-factor-auth', 'two-factor').replace('active-sessions', 'sessions').replace('sign-in', 'sign-in').replace('sign-up', 'sign-up').replace('forgot-password', 'forgot-password').replace('otp-verification', 'otp') as any;
            setAuth(authKey);
          } else {
            setEcommerce('products');
          }
          setCommandOpen(false);
          setTimeout(() => scrollToSection(s.label), 300);
        };
      } else {
        // Dashboard pages
        const dashKey = s.page as any;
        onSelect = () => {
          setActive(dashKey);
          setCommandOpen(false);
          setTimeout(() => scrollToSection(s.label), 300);
        };
      }
      return {
        key: `section-${i}`,
        label: s.label,
        description: `${s.pageLabel} → ${s.label}`,
        icon: s.icon,
        group: 'UI Elements & Components',
        onSelect,
      };
    });
  }, [setActive, setComponent, setEcommerce, setAiAssistant, setPages, setAuth, setCommandOpen]);

  // Combine page items and section items
  const allItems = React.useMemo(() => [...pageItems, ...sectionItems], [pageItems, sectionItems]);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return pageItems; // Show only page-level items when no query
    const q = query.toLowerCase();
    // Search across label, description, group, AND keywords
    return allItems.filter((item) => {
      if (item.label.toLowerCase().includes(q)) return true;
      if (item.description.toLowerCase().includes(q)) return true;
      if (item.group.toLowerCase().includes(q)) return true;
      // Also search the section keywords if this is a section item
      const sectionData = DEEP_SECTIONS.find(s => s.label === item.label);
      if (sectionData) {
        return sectionData.keywords.some(kw => kw.includes(q) || q.includes(kw));
      }
      return false;
    });
  }, [query, allItems, pageItems]);

  React.useEffect(() => {
    setHighlight(0);
  }, [query]);

  React.useEffect(() => {
    if (!commandOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filtered[highlight];
        if (item) item.onSelect();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [commandOpen, filtered, highlight]);

  if (!commandOpen) return null;

  // Group filtered items
  const groups = Array.from(new Set(filtered.map(i => i.group)));
  let runningIndex = -1;

  function scrollToSection(label: string) {
    const main = document.getElementById('dashboard-main');
    if (!main) return;
    const headings = main.querySelectorAll('h2, h3, .ds-section-title');
    for (const h of headings) {
      if (h.textContent && h.textContent.toLowerCase().includes(label.toLowerCase())) {
        h.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
  }

  function renderItem(item: CommandItem) {
    runningIndex += 1;
    const idx = runningIndex;
    const Icon = item.icon;
    const isHighlight = idx === highlight;
    return (
      <button
        key={item.key}
        id={`cmd-item-${idx}`}
        role="option"
        aria-selected={isHighlight}
        type="button"
        onMouseEnter={() => setHighlight(idx)}
        onClick={item.onSelect}
        className={cn(
          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
          isHighlight
            ? 'bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]'
            : 'hover:bg-[var(--surface-sunken)]',
        )}
      >
        <span
          className={cn(
            'inline-flex size-9 items-center justify-center rounded-lg',
            isHighlight
              ? 'bg-[var(--color-brand-500)] text-white'
              : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]',
          )}
        >
          <Icon className="size-4.5" strokeWidth={2.2} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[var(--text-strong)]">{item.label}</p>
          <p className="truncate text-xs font-normal text-[var(--text-muted)]">{item.description}</p>
        </div>
        {item.badge && (
          <span className="rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[10px] font-medium uppercase text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
            {item.badge}
          </span>
        )}
        {isHighlight && <CornerDownLeft className="size-4 text-[var(--text-muted)]" />}
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-start justify-center p-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setCommandOpen(false)}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-xl)] ds-fade-up">
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5">
          <Search className="size-5 text-[var(--text-muted)]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anything — alerts, slider, signup, products, charts..."
            className="flex-1 bg-transparent text-base font-normal text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]"
            aria-label="Command input"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
          />
          <kbd className="rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[11px] font-medium text-[var(--text-muted)]">
            ESC
          </kbd>
        </div>
        <div id="command-list" role="listbox" className="max-h-[420px] overflow-y-auto modern-scrollbar p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm font-normal text-[var(--text-muted)]">
              No matching items. Try a different search.
            </p>
          ) : (
            groups.map((group) => {
              const groupItems = filtered.filter(i => i.group === group);
              if (groupItems.length === 0) return null;
              return (
                <div key={group} className="mb-2">
                  <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">
                    {group}
                  </p>
                  <div className="space-y-0.5">
                    {groupItems.map((item) => renderItem(item))}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-2.5 text-[11px] font-medium text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ArrowUp className="size-3" />
              <ArrowDown className="size-3" />
              navigate
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="size-3" />
              select
            </span>
            {query.trim() && (
              <span className="text-[var(--text-subtle)]">
                {filtered.length} result{filtered.length === 1 ? '' : 's'}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setSection('dashboard');
              setCommandOpen(false);
            }}
            className="font-medium text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
