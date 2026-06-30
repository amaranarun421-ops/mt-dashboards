'use client';

import * as React from 'react';
import { DashboardShell } from '@/components/dashboard/shell';
import { useDashboardStore } from '@/lib/dashboard-store';
import { EcommerceDashboard } from '@/components/dashboards/ecommerce-dashboard';
import { AnalyticsDashboard } from '@/components/dashboards/analytics-dashboard';
import { MarketingDashboard } from '@/components/dashboards/marketing-dashboard';
import { CrmDashboard } from '@/features/crm/dashboard';
import { StocksDashboard } from '@/components/dashboards/stocks-dashboard';
import { SaasDashboard } from '@/components/dashboards/saas-dashboard';
import { LogisticsDashboard } from '@/components/dashboards/logistics-dashboard';
import { AiWorkspaceDashboard as AiDashboard } from '@/components/dashboards/ai-dashboard';
import { SalesDashboard } from '@/components/dashboards/sales-dashboard';
import { FinanceDashboard } from '@/components/dashboards/finance-dashboard';
import { UIElementsPage } from '@/components/component-pages/ui-elements';
import { FormsPage } from '@/components/component-pages/forms';
import { TablesPage } from '@/components/component-pages/tables';
import { ChartsPage } from '@/components/component-pages/charts';
import { AdvancedUIPage } from '@/components/component-pages/advanced-ui';
import { ExtendedUIPage } from '@/components/component-pages/extended-ui';
import { FormsInputsPage } from '@/features/forms-inputs';
import { NavigationMenusPage } from '@/components/component-pages/navigation-menus';
import { FeedbackStatusPage } from '@/components/component-pages/feedback-status';
import { DataDisplayPage } from '@/components/component-pages/data-display';
import { DateSearchPage } from '@/components/component-pages/date-search';
import { MediaContentPage } from '@/components/component-pages/media-content';
import { CommunicationPage } from '@/components/component-pages/communication';
import { OverlayInteractivePage } from '@/components/component-pages/overlay-interactive';
import { UtilityCustomizationPage } from '@/components/component-pages/utility-customization';
import { InteractiveUtilitiesPage } from '@/components/component-pages/interactive-utilities';
import { MapsPage } from '@/components/component-pages/maps';
import { ChatPage } from '@/components/component-pages/chat';
import { FileManagerPage } from '@/components/component-pages/file-manager';
import { ProductsPage } from '@/components/ecommerce-pages/products';
import { ProductDetailPage } from '@/components/ecommerce-pages/product-detail';
import { ProductCardsPage } from '@/components/ecommerce-pages/product-cards';
import { AddProductPage } from '@/components/ecommerce-pages/add-product';
import { BillingPage } from '@/components/ecommerce-pages/billing';
import { InvoicesPage } from '@/components/ecommerce-pages/invoices';
import { SingleInvoicePage } from '@/components/ecommerce-pages/single-invoice';
import { CreateInvoicePage } from '@/components/ecommerce-pages/create-invoice';
import { TransactionsPage } from '@/components/ecommerce-pages/transactions';
import { SingleTransactionPage } from '@/components/ecommerce-pages/single-transaction';
import { AIChatPage } from '@/components/ai-pages/chat';
import { AIWorkspacePage } from '@/components/ai-pages/workspace';
import { AIImageGeneratorPage } from '@/components/ai-pages/image-generator';
import { AICodeGeneratorPage } from '@/components/ai-pages/code-generator';
import { AIVideoGeneratorPage } from '@/components/ai-pages/video-generator';
import { AISettingsPage } from '@/components/ai-pages/settings';
import { AIApiUsagePage } from '@/components/ai-pages/api-usage';
import {
  ProfilePage, SettingsPage, PricingPage, FAQPage, ApiKeysPage, IntegrationsPage,
  ActivityLogPage, NotificationsPage, TeamPage, SuccessPage, BlankPage,
  Error404Page, Error500Page, Error503Page, ComingSoonPage, MaintenancePage,
} from '@/components/pages-section';
import {
  SignInPage, SignUpPage, ForgotPasswordPage, ResetPasswordPage, VerifyEmailPage,
  TwoFactorPage, OtpPage, WelcomePage, SessionsPage,
} from '@/components/auth/auth-pages';

const dashboards = {
  ecommerce: EcommerceDashboard,
  analytics: AnalyticsDashboard,
  marketing: MarketingDashboard,
  crm: CrmDashboard,
  stocks: StocksDashboard,
  saas: SaasDashboard,
  logistics: LogisticsDashboard,
  ai: AiDashboard,
  sales: SalesDashboard,
  finance: FinanceDashboard,
} as const;

const componentPages = {
  'ui-elements': UIElementsPage,
  forms: FormsPage,
  tables: TablesPage,
  charts: ChartsPage,
  'advanced-ui': AdvancedUIPage,
  'extended-ui': ExtendedUIPage,
  'forms-inputs': FormsInputsPage,
  'navigation-menus': NavigationMenusPage,
  'feedback-status': FeedbackStatusPage,
  'data-display': DataDisplayPage,
  'date-search': DateSearchPage,
  'media-content': MediaContentPage,
  'communication': CommunicationPage,
  'overlay-interactive': OverlayInteractivePage,
  'utility-customization': UtilityCustomizationPage,
  'interactive-utilities': InteractiveUtilitiesPage,
  'maps': MapsPage,
  'chat': ChatPage,
  'file-manager': FileManagerPage,
} as const;

const ecommercePages = {
  products: ProductsPage,
  'product-detail': ProductDetailPage,
  'product-cards': ProductCardsPage,
  'add-product': AddProductPage,
  billing: BillingPage,
  invoices: InvoicesPage,
  'single-invoice': SingleInvoicePage,
  'create-invoice': CreateInvoicePage,
  transactions: TransactionsPage,
  'single-transaction': SingleTransactionPage,
} as const;

const aiPages = {
  chat: AIChatPage,
  workspace: AIWorkspacePage,
  'image-generator': AIImageGeneratorPage,
  'code-generator': AICodeGeneratorPage,
  'video-generator': AIVideoGeneratorPage,
  settings: AISettingsPage,
  'api-usage': AIApiUsagePage,
} as const;

const pagesPages = {
  profile: ProfilePage,
  settings: SettingsPage,
  pricing: PricingPage,
  faq: FAQPage,
  'api-keys': ApiKeysPage,
  integrations: IntegrationsPage,
  'activity-log': ActivityLogPage,
  notifications: NotificationsPage,
  team: TeamPage,
  success: SuccessPage,
  blank: BlankPage,
  '404': Error404Page,
  '500': Error500Page,
  '503': Error503Page,
  'coming-soon': ComingSoonPage,
  maintenance: MaintenancePage,
} as const;

const authPages = {
  'sign-in': SignInPage,
  'sign-up': SignUpPage,
  'forgot-password': ForgotPasswordPage,
  'reset-password': ResetPasswordPage,
  'verify-email': VerifyEmailPage,
  'two-factor': TwoFactorPage,
  otp: OtpPage,
  welcome: WelcomePage,
  sessions: SessionsPage,
} as const;

export default function HomePage() {
  const section = useDashboardStore((s) => s.section);
  const active = useDashboardStore((s) => s.active);
  const component = useDashboardStore((s) => s.component);
  const ecommerce = useDashboardStore((s) => s.ecommerce);
  const aiAssistant = useDashboardStore((s) => s.aiAssistant);
  const pages = useDashboardStore((s) => s.pages);
  const auth = useDashboardStore((s) => s.auth);
  const setActive = useDashboardStore((s) => s.setActive);
  const setComponent = useDashboardStore((s) => s.setComponent);
  const setEcommerce = useDashboardStore((s) => s.setEcommerce);
  const setAiAssistant = useDashboardStore((s) => s.setAiAssistant);
  const setPages = useDashboardStore((s) => s.setPages);
  const setAuth = useDashboardStore((s) => s.setAuth);

  const Active =
    section === 'dashboard'
      ? (dashboards[active] ?? EcommerceDashboard)
      : section === 'ecommerce'
        ? (ecommercePages[ecommerce] ?? ProductsPage)
        : section === 'ai-assistant'
          ? (aiPages[aiAssistant] ?? AIChatPage)
          : section === 'pages'
            ? (pagesPages[pages] ?? ProfilePage)
            : section === 'auth'
              ? (authPages[auth] ?? SignInPage)
              : (componentPages[component] ?? UIElementsPage);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSection = params.get('section');

    if (requestedSection === 'dashboard') {
      const requested = params.get('active');
      if (requested && requested in dashboards) setActive(requested as keyof typeof dashboards);
      return;
    }

    if (requestedSection === 'components') {
      const requested = params.get('component');
      if (requested && requested in componentPages) setComponent(requested as keyof typeof componentPages);
      return;
    }

    if (requestedSection === 'ecommerce') {
      const requested = params.get('ecommerce');
      if (requested && requested in ecommercePages) setEcommerce(requested as keyof typeof ecommercePages);
      return;
    }

    if (requestedSection === 'ai-assistant') {
      const requested = params.get('aiAssistant');
      if (requested && requested in aiPages) setAiAssistant(requested as keyof typeof aiPages);
      return;
    }

    if (requestedSection === 'pages') {
      const requested = params.get('pages');
      if (requested && requested in pagesPages) setPages(requested as keyof typeof pagesPages);
      return;
    }

    if (requestedSection === 'auth') {
      const requested = params.get('auth');
      if (requested && requested in authPages) setAuth(requested as keyof typeof authPages);
    }
  }, [setActive, setComponent, setEcommerce, setAiAssistant, setPages, setAuth]);
  React.useEffect(() => {
    const main = document.getElementById('dashboard-main');
    if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section, active, component, ecommerce, aiAssistant, pages, auth]);

  // Auth pages (except Active Sessions) render fullscreen WITHOUT the
  // DashboardShell (no sidebar, no header) — like the mtverse public auth pages.
  const isFullscreenAuth = section === 'auth' && auth !== 'sessions';

  if (isFullscreenAuth) {
    return <Active />;
  }

  return (
    <DashboardShell>
      <Active />
    </DashboardShell>
  );
}
