import { create } from 'zustand';

export type DashboardKey =
  | 'ecommerce'
  | 'analytics'
  | 'marketing'
  | 'crm'
  | 'stocks'
  | 'saas'
  | 'logistics'
  | 'ai'
  | 'sales'
  | 'finance';

export type ComponentKey =
  | 'ui-elements'
  | 'forms'
  | 'tables'
  | 'charts'
  | 'maps'
  | 'chat'
  | 'file-manager'
  | 'advanced-ui'
  | 'extended-ui'
  | 'forms-inputs'
  | 'navigation-menus'
  | 'feedback-status'
  | 'data-display'
  | 'date-search'
  | 'media-content'
  | 'communication'
  | 'overlay-interactive'
  | 'utility-customization'
  | 'interactive-utilities';

export type EcommerceKey =
  | 'products'
  | 'product-detail'
  | 'product-cards'
  | 'add-product'
  | 'billing'
  | 'invoices'
  | 'single-invoice'
  | 'create-invoice'
  | 'transactions'
  | 'single-transaction';

export type AiAssistantKey =
  | 'chat'
  | 'workspace'
  | 'image-generator'
  | 'code-generator'
  | 'video-generator'
  | 'settings'
  | 'api-usage';

export type PagesKey =
  | 'profile'
  | 'settings'
  | 'pricing'
  | 'faq'
  | 'api-keys'
  | 'integrations'
  | 'activity-log'
  | 'notifications'
  | 'team'
  | 'success'
  | 'blank'
  | '404'
  | '500'
  | '503'
  | 'coming-soon'
  | 'maintenance';

export type AuthKey =
  | 'sign-in'
  | 'sign-up'
  | 'forgot-password'
  | 'reset-password'
  | 'verify-email'
  | 'two-factor'
  | 'otp'
  | 'welcome'
  | 'sessions';

export type Section = 'dashboard' | 'components' | 'ecommerce' | 'ai-assistant' | 'pages' | 'auth';

interface DashboardStoreState {
  section: Section;
  active: DashboardKey;
  component: ComponentKey;
  ecommerce: EcommerceKey;
  aiAssistant: AiAssistantKey;
  pages: PagesKey;
  auth: AuthKey;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  commandOpen: boolean;
  setSection: (section: Section) => void;
  setActive: (key: DashboardKey) => void;
  setComponent: (key: ComponentKey) => void;
  setEcommerce: (key: EcommerceKey) => void;
  setAiAssistant: (key: AiAssistantKey) => void;
  setPages: (key: PagesKey) => void;
  setAuth: (key: AuthKey) => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCommandOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
  section: 'dashboard',
  active: 'ecommerce',
  component: 'ui-elements',
  ecommerce: 'products',
  aiAssistant: 'chat',
  pages: 'profile',
  auth: 'sign-in',
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  commandOpen: false,
  setSection: (section) => set({ section, mobileMenuOpen: false }),
  setActive: (key) => set({ section: 'dashboard', active: key, mobileMenuOpen: false }),
  setComponent: (key) => set({ section: 'components', component: key, mobileMenuOpen: false }),
  setEcommerce: (key) => set({ section: 'ecommerce', ecommerce: key, mobileMenuOpen: false }),
  setAiAssistant: (key) => set({ section: 'ai-assistant', aiAssistant: key, mobileMenuOpen: false }),
  setPages: (key) => set({ section: 'pages', pages: key, mobileMenuOpen: false }),
  setAuth: (key) => set({ section: 'auth', auth: key, mobileMenuOpen: false }),
  toggleSidebarCollapsed: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setCommandOpen: (open) => set({ commandOpen: open }),
}));
