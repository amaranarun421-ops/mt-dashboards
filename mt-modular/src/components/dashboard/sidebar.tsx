'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  LayoutDashboard,
  ShoppingCart,
  Bot,
  FileText,
  Component,
  ShieldCheck,
  Sparkles,
  Layers,
  FormInput,
  Navigation,
  Bell,
  Database,
  Calendar,
  Video,
  MessageSquare,
  Maximize2,
  Settings,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { DASHBOARD_NAV, COMPONENT_NAV, ECOMMERCE_NAV, AI_ASSISTANT_NAV, PAGES_NAV, AUTH_NAV } from '@/lib/dashboard-nav';
import { useDashboardStore } from '@/lib/dashboard-store';
import { cn } from '@/lib/utils';

/* 10 UI Elements categories — synthetic nav items that scroll to sections */
interface UICategoryItem {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
}
const UI_CATEGORIES: UICategoryItem[] = [
  { key: 'forms-inputs', label: 'Forms & Inputs', description: 'Buttons, inputs, selects, switches', icon: FormInput },
  { key: 'navigation-menus', label: 'Navigation & Menus', description: 'Dropdowns, tabs, breadcrumbs', icon: Navigation },
  { key: 'feedback-status', label: 'Feedback & Status', description: 'Alerts, toasts, progress, skeletons', icon: Bell },
  { key: 'data-display', label: 'Data Display', description: 'Cards, lists, avatars, badges', icon: Database },
  { key: 'date-search', label: 'Date & Search', description: 'Pickers, search bars, filters', icon: Calendar },
  { key: 'media-content', label: 'Media & Content', description: 'Carousels, players, code blocks', icon: Video },
  { key: 'communication', label: 'Communication', description: 'Chat, comments, reviews, share', icon: MessageSquare },
  { key: 'overlay-interactive', label: 'Overlay & Interactive', description: 'Tooltips, popovers, modals', icon: Maximize2 },
  { key: 'utility-customization', label: 'Utility', description: 'Theme, color, language, dividers', icon: Settings },
  { key: 'interactive-utilities', label: 'Interactive', description: 'KPIs, animations, counters', icon: Zap },
];

function SidebarLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image src="/SiteLogo.png" alt="mtverse" width={34} height={34} className="size-8 object-contain" priority />
      {!collapsed && (
        <div className="min-w-0">
          <span className="text-xl font-medium tracking-tight text-[var(--text-strong)]">mtverse</span>
          <span className="ml-1 text-xl font-normal text-[var(--text-faint)]">ui</span>
        </div>
      )}
    </div>
  );
}

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [show, setShow] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  function handleEnter() {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({ top: rect.top + rect.height / 2, left: rect.right + 12 });
    }
    setShow(true);
  }

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setShow(false)}
        onFocus={handleEnter}
        onBlur={() => setShow(false)}
        className="inline-flex"
        aria-label={label}
      >
        {children}
      </div>
      {show &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-[9999] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#1d2939] px-3 py-1.5 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-[var(--gray-900)]"
            style={{ top: coords.top, left: coords.left }}
          >
            {label}
          </div>,
          document.body,
        )}
    </>
  );
}

/* ---------------- Sidebar menu list (nested expandable sections) ---------------- */
interface SidebarMenuProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

interface NavGroup {
  id: 'ui-elements' | 'advanced-ui' | 'extended-ui' | 'forms-data' | 'dashboards' | 'ecommerce' | 'ai-assistant' | 'pages' | 'auth';
  label: string;
  icon: typeof LayoutDashboard;
  items: typeof DASHBOARD_NAV | typeof COMPONENT_NAV | typeof ECOMMERCE_NAV | typeof AI_ASSISTANT_NAV | typeof PAGES_NAV | typeof AUTH_NAV;
  onSelect: (key: string) => void;
  activeKey: string;
}

function SidebarMenu({ collapsed, onNavigate }: SidebarMenuProps) {
  const section = useDashboardStore((s) => s.section);
  const activeDashboard = useDashboardStore((s) => s.active);
  const activeComponent = useDashboardStore((s) => s.component);
  const activeEcommerce = useDashboardStore((s) => s.ecommerce);
  const activeAi = useDashboardStore((s) => s.aiAssistant);
  const activePages = useDashboardStore((s) => s.pages);
  const activeAuth = useDashboardStore((s) => s.auth);
  const setActive = useDashboardStore((s) => s.setActive);
  const setComponent = useDashboardStore((s) => s.setComponent);
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  const setAiAssistant = useDashboardStore((s) => s.setAiAssistant);
  const setPages = useDashboardStore((s) => s.setPages);
  const setAuth = useDashboardStore((s) => s.setAuth);

  // Auto-expand the active section on mount
  const [openGroups, setOpenGroups] = React.useState<Set<string>>(() => {
    const uiKeys = ['forms-inputs', 'navigation-menus', 'feedback-status', 'data-display', 'date-search', 'media-content', 'communication', 'overlay-interactive', 'utility-customization', 'interactive-utilities', 'ui-elements'];
    const formsDataKeys = ['forms', 'tables', 'charts', 'maps', 'chat', 'file-manager'];
    const initial =
      section === 'components' && uiKeys.includes(activeComponent) ? 'ui-elements' :
      section === 'components' && activeComponent === 'advanced-ui' ? 'advanced-ui' :
      section === 'components' && activeComponent === 'extended-ui' ? 'extended-ui' :
      section === 'components' && formsDataKeys.includes(activeComponent) ? 'forms-data' :
      section === 'dashboard' ? 'dashboards' :
      section === 'ecommerce' ? 'ecommerce' :
      section === 'ai-assistant' ? 'ai-assistant' :
      section === 'pages' ? 'pages' :
      section === 'auth' ? 'auth' :
      'dashboards';
    return new Set([initial]);
  });

  // Keep the active section expanded
  React.useEffect(() => {
    const uiKeys = ['forms-inputs', 'navigation-menus', 'feedback-status', 'data-display', 'date-search', 'media-content', 'communication', 'overlay-interactive', 'utility-customization', 'interactive-utilities', 'ui-elements'];
    const formsDataKeys = ['forms', 'tables', 'charts', 'maps', 'chat', 'file-manager'];
    const current =
      section === 'components' && uiKeys.includes(activeComponent) ? 'ui-elements' :
      section === 'components' && activeComponent === 'advanced-ui' ? 'advanced-ui' :
      section === 'components' && activeComponent === 'extended-ui' ? 'extended-ui' :
      section === 'components' && formsDataKeys.includes(activeComponent) ? 'forms-data' :
      section === 'dashboard' ? 'dashboards' :
      section === 'ecommerce' ? 'ecommerce' :
      section === 'ai-assistant' ? 'ai-assistant' :
      section === 'pages' ? 'pages' :
      section === 'auth' ? 'auth' :
      'dashboards';
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.add(current);
      return next;
    });
  }, [section, activeComponent]);

  function toggleGroup(id: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Helper: check if a group is currently active
  function checkGroupActive(groupId: string): boolean {
    if (groupId === 'ui-elements') {
      return section === 'components' && [
        'forms-inputs', 'navigation-menus', 'feedback-status', 'data-display',
        'date-search', 'media-content', 'communication', 'overlay-interactive',
        'utility-customization', 'interactive-utilities', 'ui-elements',
      ].includes(activeComponent);
    }
    if (groupId === 'advanced-ui') return section === 'components' && activeComponent === 'advanced-ui';
    if (groupId === 'extended-ui') return section === 'components' && activeComponent === 'extended-ui';
    if (groupId === 'forms-data') return section === 'components' && ['forms', 'tables', 'charts', 'maps', 'chat', 'file-manager'].includes(activeComponent);
    if (groupId === 'dashboards') return section === 'dashboard';
    if (groupId === 'ecommerce') return section === 'ecommerce';
    if (groupId === 'ai-assistant') return section === 'ai-assistant';
    if (groupId === 'pages') return section === 'pages';
    if (groupId === 'auth') return section === 'auth';
    return false;
  }

  const groups: NavGroup[] = [
    {
      id: 'ui-elements',
      label: 'UI Elements',
      icon: Component,
      items: COMPONENT_NAV.filter((c) => [
        'forms-inputs', 'navigation-menus', 'feedback-status', 'data-display',
        'date-search', 'media-content', 'communication', 'overlay-interactive',
        'utility-customization', 'interactive-utilities',
      ].includes(c.key)),
      onSelect: (key) => setComponent(key as never),
      activeKey: activeComponent,
    },
    {
      id: 'advanced-ui',
      label: 'Advanced UI',
      icon: Sparkles,
      items: COMPONENT_NAV.filter((c) => c.key === 'advanced-ui'),
      onSelect: (key) => setComponent(key as never),
      activeKey: activeComponent,
    },
    {
      id: 'extended-ui',
      label: 'Extended UI',
      icon: Layers,
      items: COMPONENT_NAV.filter((c) => c.key === 'extended-ui'),
      onSelect: (key) => setComponent(key as never),
      activeKey: activeComponent,
    },
    {
      id: 'forms-data',
      label: 'Forms & Data',
      icon: FormInput,
      items: COMPONENT_NAV.filter((c) => ['forms', 'tables', 'charts', 'maps', 'chat', 'file-manager'].includes(c.key)),
      onSelect: (key) => setComponent(key as never),
      activeKey: activeComponent,
    },
    {
      id: 'dashboards',
      label: 'Dashboards',
      icon: LayoutDashboard,
      items: DASHBOARD_NAV,
      onSelect: (key) => setActive(key as never),
      activeKey: activeDashboard,
    },
    {
      id: 'ecommerce',
      label: 'E-commerce',
      icon: ShoppingCart,
      items: ECOMMERCE_NAV,
      onSelect: (key) => setEcommerce(key as never),
      activeKey: activeEcommerce,
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: Bot,
      items: AI_ASSISTANT_NAV,
      onSelect: (key) => setAiAssistant(key as never),
      activeKey: activeAi,
    },
    {
      id: 'pages',
      label: 'Pages',
      icon: FileText,
      items: PAGES_NAV,
      onSelect: (key) => setPages(key as never),
      activeKey: activePages,
    },
    {
      id: 'auth',
      label: 'Authentication',
      icon: ShieldCheck,
      items: AUTH_NAV,
      onSelect: (key) => setAuth(key as never),
      activeKey: activeAuth,
    },
  ];

  if (collapsed) {
    // Collapsed mode — render group icons with tooltips; clicking a group opens its first item
    return (
      <nav aria-label="Sidebar navigation" className="flex flex-col items-center gap-1.5 px-3 py-3">
        {groups.map((group) => {
          const Icon = group.icon;
          const isGroupActive = checkGroupActive(group.id);
          return (
            <Tooltip key={group.id} label={group.label}>
              <span
                role="button"
                tabIndex={0}
                onClick={() => {
                  const first = group.items[0];
                  if (first) group.onSelect(first.key);
                  onNavigate?.();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const first = group.items[0];
                    if (first) group.onSelect(first.key);
                    onNavigate?.();
                  }
                }}
                className={cn(
                  'flex size-11 items-center justify-center rounded-xl transition-all',
                  isGroupActive
                    ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
                )}
              >
                <Icon className="size-5" strokeWidth={2.1} />
              </span>
            </Tooltip>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Sidebar navigation" className="px-3 py-3">
      <ul className="space-y-1.5">
        {groups.map((group) => {
          const Icon = group.icon;
          const isOpen = openGroups.has(group.id);
          const isGroupActive = checkGroupActive(group.id);
          const isSingle = group.items.length === 1;

          // Single-item groups: render as direct nav button (no accordion)
          if (isSingle) {
            const item = group.items[0];
            const isActive = group.activeKey === item.key;
            return (
              <li key={group.id}>
                <button
                  type="button"
                  onClick={() => {
                    group.onSelect(item.key);
                    onNavigate?.();
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                      : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
                  )}
                >
                  <Icon
                    className={cn(
                      'size-[18px] shrink-0',
                      isActive ? 'text-[var(--color-brand-500)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-strong)]',
                    )}
                    strokeWidth={1.9}
                  />
                  <span className="min-w-0 flex-1 truncate">{group.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-[var(--color-success-50)] px-1.5 py-0.5 text-[9px] font-medium uppercase leading-none text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="ml-0.5 h-1 w-1 rounded-full bg-[var(--color-brand-500)]" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          }

          // Multi-item groups: render as accordion (existing behavior)
          return (
            <li key={group.id}>
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isOpen}
                aria-controls={`group-${group.id}`}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all',
                  isGroupActive
                    ? 'text-[var(--text-strong)]'
                    : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
                )}
              >
                <Icon
                  className={cn(
                    'size-[18px] shrink-0',
                    isGroupActive ? 'text-[var(--color-brand-500)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-strong)]',
                  )}
                  strokeWidth={1.9}
                />
                <span className="min-w-0 flex-1 truncate">{group.label}</span>
                <span className="text-[10px] font-medium text-[var(--text-subtle)]">
                  {group.items.length}
                </span>
                <ChevronDown
                  className={cn(
                    'size-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  strokeWidth={2}
                />
              </button>

              <div
                id={`group-${group.id}`}
                className={cn(
                  'grid transition-[grid-template-rows] duration-200 ease-out',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <ul className="mt-1 space-y-0.5 border-l border-[var(--border-subtle)] pl-3 ml-4">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = group.activeKey === item.key;
                      const showDivider = group.id === 'ecommerce' && item.key === 'product-cards';
                      return (
                        <React.Fragment key={item.key}>
                          {showDivider && (
                            <li className="my-2 px-3" aria-hidden="true">
                              <span className="block h-px bg-[var(--border-subtle)]" />
                            </li>
                          )}
                          <li>
                          <button
                            type="button"
                            onClick={() => {
                              group.onSelect(item.key);
                              onNavigate?.();
                            }}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                              'group flex w-full items-center gap-2.5 rounded-lg py-2 pl-3 pr-2 text-left text-[13px] font-medium transition-all',
                              isActive
                                ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                                : 'text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
                            )}
                          >
                            <span className="min-w-0 flex-1 truncate">{item.label}</span>
                            {item.badge && (
                              <span className="rounded-full bg-[var(--color-success-50)] px-1.5 py-0.5 text-[9px] font-medium uppercase leading-none text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
                                {item.badge}
                              </span>
                            )}
                            {isActive && (
                              <span
                                className="ml-0.5 h-1 w-1 rounded-full bg-[var(--color-brand-500)]"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                          </li>
                        </React.Fragment>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
        <p className="text-xs font-medium text-[var(--text-strong)]">Pro Tip</p>
        <p className="mt-1 text-[11px] font-normal leading-relaxed text-[var(--text-muted)]">
          Press <kbd className="rounded bg-[var(--card)] px-1 py-0.5 text-[10px] font-medium text-[var(--text-strong)] shadow-sm">⌘K</kbd> to open the command palette and jump anywhere.
        </p>
      </div>
    </nav>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebarCollapsed, mobileMenuOpen, setMobileMenuOpen } =
    useDashboardStore();

  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const sidebarContent = (
    <div className="flex h-full flex-col overflow-hidden bg-[var(--sidebar)]">
      {/* Header — Logo */}
      <div className="flex h-[74px] shrink-0 items-center border-b border-[var(--sidebar-border)] px-5">
        <SidebarLogo collapsed={sidebarCollapsed} />
      </div>

      {/* Menu — scrollable */}
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
        <SidebarMenu collapsed={sidebarCollapsed} />
      </div>

      {/* Collapse button — separate section like mtverse */}
      <div className="shrink-0 border-t border-[var(--sidebar-border)] px-5 py-3">
        {!sidebarCollapsed ? (
          <button
            onClick={toggleSidebarCollapsed}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--text-body)] transition-colors hover:bg-[var(--surface-sunken)] hover:text-[var(--color-brand-500)]"
          >
            <ChevronLeft className="size-5 shrink-0" />
            <span className="flex-1 truncate text-left">Collapse</span>
          </button>
        ) : (
          <Tooltip label="Expand">
            <button
              onClick={toggleSidebarCollapsed}
              className="mx-auto flex size-11 cursor-pointer items-center justify-center rounded-xl text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-sunken)] hover:text-[var(--color-brand-500)]"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="size-5 shrink-0" />
            </button>
          </Tooltip>
        )}
      </div>

      {/* User card — separate section like mtverse */}
      <div className="shrink-0 border-t border-[var(--sidebar-border)] px-5 py-4">
        {sidebarCollapsed ? (
          <Tooltip label="Arun Pandian">
            <span className="mx-auto block size-11 cursor-pointer overflow-hidden rounded-full ring-2 ring-[var(--color-brand-500)]/15">
              <Image src="/images/arun-pandian.jpg" alt="Arun Pandian" width={44} height={44} className="size-full object-cover" />
            </span>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3">
            <span className="block size-10 shrink-0 cursor-pointer overflow-hidden rounded-full ring-2 ring-[var(--color-brand-500)]/15">
              <Image src="/images/arun-pandian.jpg" alt="Arun Pandian" width={40} height={40} className="size-full object-cover" />
            </span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-[var(--text-strong)]">Arun Pandian</p>
              <p className="truncate text-xs font-normal text-[var(--text-muted)]">arun@mtverse.io</p>
            </div>
            <button
              type="button"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--text-subtle)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
              aria-label="Sign out"
              title="Sign out"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] transition-[width] duration-300 ease-in-out lg:block"
        style={{
          width: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        }}
      >
        {sidebarContent}
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="absolute left-0 top-0 flex h-screen w-[280px] flex-col overflow-hidden border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] shadow-[var(--shadow-theme-xl)] ds-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[var(--sidebar-border)] px-4">
              <SidebarLogo collapsed={false} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                aria-label="Close sidebar"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
              <SidebarMenu collapsed={false} onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
