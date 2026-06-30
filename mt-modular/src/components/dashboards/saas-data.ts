/* ========================================================================
   SaaS dashboard mock data — subscription growth operating system.
   Internally consistent:
     Starting MRR $444.2K + 42.8 + 18.6 + 4.2 − 9.8 − 17.4 = $482.6K Ending MRR
     ARR = $482.6K × 12 ≈ $5.79M
     Net MRR growth = +42.8 + 18.6 + 4.2 − 9.8 − 17.4 = +$38.4K
     NRR 118% / GRR 92%
   ======================================================================== */

/* ---- MRR Waterfall hero ---- */
export type WaterfallStage = {
  key: string;
  label: string;
  amount: number;          // signed contribution in dollars (starting/ending = absolute)
  kind: 'start' | 'positive' | 'negative' | 'end';
  accounts: number;        // number of accounts involved in this movement
  detail: string;
};

export const mrrWaterfall: WaterfallStage[] = [
  { key: 'start',        label: 'Starting MRR', amount: 444200, kind: 'start',    accounts: 3864, detail: 'Recurring revenue carried over from prior month.' },
  { key: 'new',          label: 'New MRR',      amount:  42800, kind: 'positive', accounts:  184, detail: '184 new customers — Pro and Business plan mix led growth.' },
  { key: 'expansion',    label: 'Expansion',    amount:  18600, kind: 'positive', accounts:   86, detail: '86 accounts expanded via seat adds and plan upgrades.' },
  { key: 'reactivation', label: 'Reactivation', amount:   4200, kind: 'positive', accounts:   24, detail: '24 previously churned accounts reactivated this period.' },
  { key: 'contraction',  label: 'Contraction',  amount:  -9800, kind: 'negative', accounts:   38, detail: '38 accounts downgraded plans or reduced seat count.' },
  { key: 'churn',        label: 'Churn',        amount: -17400, kind: 'negative', accounts:   62, detail: '62 accounts fully cancelled — top driver: "too expensive".' },
  { key: 'end',          label: 'Ending MRR',   amount: 482600, kind: 'end',      accounts: 3994, detail: 'Net MRR position at end of period — 8.6% growth vs start.' },
];

export const mrrMetrics = {
  mrr: 482600,
  arr: 5790000,
  netMrrGrowth: 38400,
  nrr: 118,
  grr: 92,
  startingMrr: 444200,
  endingMrr: 482600,
  mrrChange: '+8.6%',
  arrChange: '+12.4%',
  growthChange: '+6.2%',
  nrrChange: '+3 pts',
  grrChange: '-1 pt',
  insight: 'Net Revenue Retention held above 110% for the fifth consecutive month, driven by expansion outweighing churn by 2.1×.',
};

/* ---- Churn Risk Meter ---- */
export const churnRisk = {
  logoChurn: 3.2,
  revenueChurn: 2.1,
  atRiskMrr: 48600,
  atRiskAccounts: 38,
  churnRiskScore: 32,        // 0 = healthy, 100 = critical
  trend: '-0.4 pt',
  sparkline: [4.1, 3.9, 3.8, 3.6, 3.5, 3.4, 3.2],
  bands: [
    { label: 'Healthy',   range: '0–2%',     color: '#12B76A' },
    { label: 'Watch',     range: '2–4%',     color: '#F79009' },
    { label: 'Critical',  range: '> 4%',     color: '#F04438' },
  ],
};

/* ---- Expansion Pipeline ---- */
export type ExpansionDriver = { driver: string; accounts: number; mrr: number; color: string };

export const expansionPipeline = {
  readyAccounts: 86,
  potentialMrr: 72400,
  topDriver: 'Seat limit reached',
  avgCycleDays: 18,
  winProbability: 64,
  drivers: [
    { driver: 'Seat limit reached',   accounts: 34, mrr: 28600, color: '#465FFF' },
    { driver: 'Usage above plan',     accounts: 22, mrr: 18400, color: '#12B76A' },
    { driver: 'Add-on interest',      accounts: 16, mrr: 12800, color: '#F79009' },
    { driver: 'Tier upgrade eligible', accounts: 14, mrr: 12600, color: '#7A5AF8' },
  ] as ExpansionDriver[],
  sparkline: [42, 48, 54, 62, 68, 76, 86],
};

/* ---- Billing Watch ---- */
export const billingWatch = {
  failedPayments: 42,
  pastDue: 18700,
  recoveryRate: 64,
  dunningEmailsSent: 128,
  avgRetryAttempts: 2.4,
  atRiskAccounts: 38,
  sparkline: [56, 52, 48, 46, 44, 42, 42],
  recoveryTrend: '+6 pts',
};

/* ---- Signal Strip (6 compact non-identical chips) ---- */
export type SaaSSignal = {
  id: string;
  label: string;
  value: string;
  metric: string;
  trend: 'up' | 'down' | 'warning';
  trendValue: string;
  icon: 'customers' | 'trial' | 'activated' | 'conversion' | 'arpa' | 'ltv';
  tooltip: string;
  sparkline: number[];
  accent: string;
};

export const saasSignals: SaaSSignal[] = [
  { id: 'ss1', label: 'New customers', value: '184', metric: 'this period', trend: 'up', trendValue: '+14.2%', icon: 'customers',  tooltip: '184 new paying customers — 62 from product-led signup, 122 from sales-assisted.', sparkline: [128, 142, 154, 166, 172, 178, 184], accent: '#465FFF' },
  { id: 'ss2', label: 'Trial starts', value: '1,248', metric: 'sign-ups', trend: 'up', trendValue: '+8.6%', icon: 'trial',  tooltip: '1,248 new trial accounts — 682 activated within 7 days.', sparkline: [980, 1040, 1080, 1140, 1180, 1210, 1248], accent: '#0BA5EC' },
  { id: 'ss3', label: 'Activated trials', value: '682', metric: 'africa activation', trend: 'up', trendValue: '+11.4%', icon: 'activated',  tooltip: '682 trials reached activation event — 54.6% activation rate.', sparkline: [520, 560, 590, 620, 645, 665, 682], accent: '#12B76A' },
  { id: 'ss4', label: 'Paid conversion', value: '14.8%', metric: 'trial → paid', trend: 'warning', trendValue: '-0.6 pt', icon: 'conversion',  tooltip: '14.8% trial-to-paid — down 0.6 pt vs prior period. Review onboarding flow.', sparkline: [15.8, 15.6, 15.4, 15.2, 15.1, 14.9, 14.8], accent: '#F79009' },
  { id: 'ss5', label: 'ARPA', value: '$218', metric: 'avg per account', trend: 'up', trendValue: '+$6', icon: 'arpa',  tooltip: 'Average revenue per account $218 — driven by Business plan expansion.', sparkline: [198, 202, 206, 210, 213, 216, 218], accent: '#7A5AF8' },
  { id: 'ss6', label: 'LTV:CAC', value: '4.2x', metric: 'unit economics', trend: 'up', trendValue: '+0.3x', icon: 'ltv',  tooltip: 'Lifetime value $2,920 vs CAC $695 — healthy unit economics above 3x threshold.', sparkline: [3.6, 3.7, 3.8, 4.0, 4.1, 4.2, 4.2], accent: '#EC4899' },
];

/* ---- Lifecycle Funnel (SaaS flow, not ecommerce bars) ---- */
export type LifecycleStage = {
  key: string;
  name: string;
  value: number;
  description: string;
  color: string;
  dropOff: number;        // percentage of previous stage
  icon: 'eye' | 'signup' | 'check' | 'play' | 'card' | 'up' | 'star';
};

export const lifecycleFunnel: LifecycleStage[] = [
  { key: 'visitors',    name: 'Visitors',         value: 84520, description: 'Unique visitors to marketing site and app landing pages.', color: '#94A3B8', dropOff: 0,    icon: 'eye' },
  { key: 'signups',     name: 'Signups',          value:  9840, description: 'Created free account and reached dashboard at least once.', color: '#465FFF', dropOff: 88.4, icon: 'signup' },
  { key: 'activated',   name: 'Activated',        value:  6820, description: 'Completed activation event (created first project).',       color: '#0BA5EC', dropOff: 30.7, icon: 'check' },
  { key: 'trial',       name: 'Trial engaged',    value:  4960, description: 'Used a paid feature during 14-day trial window.',           color: '#12B76A', dropOff: 27.3, icon: 'play' },
  { key: 'paid',        name: 'Paid customers',   value:  1248, description: 'Converted to paid subscription after trial.',              color: '#F79009', dropOff: 74.8, icon: 'card' },
  { key: 'expanded',    name: 'Expanded',         value:   286, description: 'Added seats, upgraded plan, or purchased add-ons.',        color: '#7A5AF8', dropOff: 77.1, icon: 'up' },
  { key: 'advocates',   name: 'Advocates',        value:    74, description: 'NPS 9–10, public reference, or referral source.',          color: '#EC4899', dropOff: 74.1, icon: 'star' },
];

/* ---- Retention Cohort Grid (6 cohorts × 7 months) ---- */
export type CohortRow = {
  cohort: string;             // 'Jan' etc.
  cohortLabel: string;        // 'Jan 2026'
  size: number;               // cohort size at M0
  retention: number[];        // percentages M0..M6
  mrrRetained: number[];      // dollars retained M0..M6
};

export const cohortGrid: CohortRow[] = [
  { cohort: 'Jan', cohortLabel: 'Jan 2026', size: 218, retention: [100, 88, 81, 76, 72, 69, 67], mrrRetained: [42800, 37664, 34668, 32528, 30816, 29532, 28676] },
  { cohort: 'Feb', cohortLabel: 'Feb 2026', size: 196, retention: [100, 86, 79, 73, 68, 65,   0], mrrRetained: [38600, 33196, 30494, 28178, 26248, 25090, 0] },
  { cohort: 'Mar', cohortLabel: 'Mar 2026', size: 248, retention: [100, 91, 84, 78, 73,   0, 0], mrrRetained: [48400, 44044, 40656, 37752, 35332, 0, 0] },
  { cohort: 'Apr', cohortLabel: 'Apr 2026', size: 232, retention: [100, 89, 82, 75,   0, 0, 0], mrrRetained: [45600, 40584, 37392, 34200, 0, 0, 0] },
  { cohort: 'May', cohortLabel: 'May 2026', size: 268, retention: [100, 92, 84,   0, 0, 0, 0], mrrRetained: [52400, 48208, 44016, 0, 0, 0, 0] },
  { cohort: 'Jun', cohortLabel: 'Jun 2026', size: 312, retention: [100, 94,   0, 0, 0, 0, 0], mrrRetained: [61200, 57528, 0, 0, 0, 0, 0] },
];

export const cohortMonths = ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'];

/* ---- Plan Mix (segmented cards) ---- */
export type PlanMix = {
  plan: 'Free' | 'Starter' | 'Pro' | 'Business' | 'Enterprise';
  customers: number;
  mrr: number;                // monthly recurring revenue
  arpa: number;               // average revenue per account
  churnRate: number;          // % logo churn
  expansionRate: number;      // % expansion rate
  color: string;
  share: number;              // share of total MRR (%)
};

export const planMix: PlanMix[] = [
  { plan: 'Free',       customers: 18420, mrr:      0, arpa:   0, churnRate: 0.0, expansionRate: 12.4, color: '#94A3B8', share:  0.0 },
  { plan: 'Starter',    customers:  4820, mrr:  96000, arpa:  20, churnRate: 4.2, expansionRate: 14.8, color: '#0BA5EC', share: 19.9 },
  { plan: 'Pro',        customers:  2140, mrr: 214000, arpa: 100, churnRate: 2.8, expansionRate: 22.6, color: '#465FFF', share: 44.3 },
  { plan: 'Business',   customers:   680, mrr: 136000, arpa: 200, churnRate: 1.6, expansionRate: 28.4, color: '#7A5AF8', share: 28.2 },
  { plan: 'Enterprise', customers:    86, mrr:  36000, arpa: 419, churnRate: 0.4, expansionRate: 34.2, color: '#EC4899', share:  7.5 },
];

/* ---- Usage Telemetry ---- */
export type UsageMetric = {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  unit: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
  icon: 'api' | 'project' | 'report' | 'seat' | 'integration';
  accent: string;
  tooltip: string;
};

export const usageMetrics: UsageMetric[] = [
  { id: 'u1', label: 'API calls',           value: '13.5M', rawValue: 13500000, unit: 'calls',     change: '+8.4%',  trend: 'up',   icon: 'api',         accent: '#465FFF', tooltip: '13.5M API calls this period — peak 1.42M/day on Jun 22.' },
  { id: 'u2', label: 'Projects created',    value: '48.2K', rawValue: 48200,    unit: 'projects',  change: '+12.1%', trend: 'up',   icon: 'project',     accent: '#12B76A', tooltip: '48.2K new projects — Pro plan leads creation volume.' },
  { id: 'u3', label: 'Reports generated',   value: '284K',  rawValue: 284000,   unit: 'reports',   change: '+6.8%',  trend: 'up',   icon: 'report',      accent: '#F79009', tooltip: '284K reports generated — scheduled reports up 22%.' },
  { id: 'u4', label: 'Seats active',        value: '18.6K', rawValue: 18600,    unit: 'seats',     change: '+4.2%',  trend: 'up',   icon: 'seat',        accent: '#0BA5EC', tooltip: '18.6K active seats — 92% utilization vs provisioned.' },
  { id: 'u5', label: 'Integrations',        value: '6.8K',  rawValue: 6800,     unit: 'connected', change: '+9.6%',  trend: 'up',   icon: 'integration', accent: '#7A5AF8', tooltip: '6.8K integration connections — Slack most connected.' },
];

/* Usage pulse chart series (event stream) */
export const usagePulseSeries = [
  { date: 'Jun 17', api: 1180, projects: 4.2, reports: 28, integrations: 540 },
  { date: 'Jun 18', api: 1320, projects: 5.1, reports: 32, integrations: 620 },
  { date: 'Jun 19', api: 1280, projects: 4.8, reports: 30, integrations: 580 },
  { date: 'Jun 20', api: 1420, projects: 5.4, reports: 34, integrations: 640 },
  { date: 'Jun 21', api: 1180, projects: 4.4, reports: 28, integrations: 560 },
  { date: 'Jun 22', api: 1620, projects: 6.2, reports: 38, integrations: 720 },
  { date: 'Jun 23', api: 1540, projects: 5.8, reports: 36, integrations: 680 },
];

/* ---- Churn Intelligence ---- */
export type ChurnReason = {
  id: string;
  reason: string;
  percentage: number;         // share of churn
  lostMrr: number;            // dollars lost
  count: number;              // accounts lost
  recommendation: string;
  color: string;
};

export const churnReasons: ChurnReason[] = [
  { id: 'cr1', reason: 'Too expensive',      percentage: 28, lostMrr: 4872, count: 18, recommendation: 'Introduce annual billing discount and a flexible mid-tier plan for price-sensitive SMBs.', color: '#F04438' },
  { id: 'cr2', reason: 'Missing feature',    percentage: 21, lostMrr: 3654, count: 13, recommendation: 'Surface top feature requests in product roadmap; 4 features cover 80% of gaps.',     color: '#F79009' },
  { id: 'cr3', reason: 'Low usage',          percentage: 18, lostMrr: 3132, count: 11, recommendation: 'Trigger automated re-engagement at day 7 of inactivity; assign CSM for high-MRR risk.',  color: '#FDB022' },
  { id: 'cr4', reason: 'Switched vendor',    percentage: 14, lostMrr: 2436, count:  9, recommendation: 'Win-loss interviews — competitor pricing and integration breadth are primary drivers.', color: '#7A5AF8' },
  { id: 'cr5', reason: 'Payment failed',     percentage: 11, lostMrr: 1914, count:  7, recommendation: 'Add card update flow in-app and grace period expansion; recover 18% of failed payments.', color: '#0BA5EC' },
  { id: 'cr6', reason: 'Other',              percentage:  8, lostMrr: 1392, count:  4, recommendation: 'Categorize open-text exit surveys; review monthly for emerging patterns.',          color: '#94A3B8' },
];

export const churnIntelSummary = {
  totalChurnedMrr: 17400,
  totalAccountsLost: 62,
  topReason: 'Too expensive',
  recommendationCount: 6,
  insight: 'Price sensitivity accounts for 28% of churn — annual prepay and mid-tier pricing changes could recover ~$2.4K MRR/month.',
};

/* ---- Customer Lifecycle Board (5 groups) ---- */
export type LifecycleGroupKey = 'trial' | 'activated' | 'paid' | 'expansion' | 'risk';
export type LifecycleCustomer = {
  id: string;
  company: string;
  owner: string;
  plan: 'Trial' | 'Starter' | 'Pro' | 'Business' | 'Enterprise';
  mrr: number;
  seats: number;
  health: number;             // 0–100
  nextAction: string;
  daysInStage: number;
  group: LifecycleGroupKey;
  initials: string;
};

export const lifecycleBoard: Record<LifecycleGroupKey, { name: string; color: string; accent: string; description: string }> = {
  trial:     { name: 'Trial',           color: '#0BA5EC', accent: 'bg-[var(--color-info-50)] text-[var(--color-info-700)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',       description: '14-day trial accounts — engaging with paid features.' },
  activated: { name: 'Activated',       color: '#12B76A', accent: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]', description: 'Completed activation event — high conversion intent.' },
  paid:      { name: 'Paid',            color: '#465FFF', accent: 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',  description: 'Active paying customers on stable plans.' },
  expansion: { name: 'Expansion-ready', color: '#7A5AF8', accent: 'bg-[#f5f3ff] text-[#6d28d9] dark:bg-[rgba(122,90,248,0.16)] dark:text-[#a78bfa]', description: 'High signal for upsell — usage or seat-limit triggers.' },
  risk:      { name: 'At risk',         color: '#F04438', accent: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]', description: 'Health < 50 or recent downgrade — requires CSM action.' },
};

export const lifecycleCustomers: LifecycleCustomer[] = [
  // Trial
  { id: 'lc1',  company: 'Cyberdyne Systems', owner: 'Devon Lane',     plan: 'Trial',     mrr:    0, seats:  18, health: 64, nextAction: 'Schedule product demo',        daysInStage:  6, group: 'trial',     initials: 'CS' },
  { id: 'lc2',  company: 'Initech LLC',       owner: 'Jane Cooper',    plan: 'Trial',     mrr:    0, seats:   8, health: 72, nextAction: 'Send activation tips',         daysInStage:  4, group: 'trial',     initials: 'IL' },
  { id: 'lc3',  company: 'Pied Piper',        owner: 'Albert Flores',  plan: 'Trial',     mrr:    0, seats:  12, health: 58, nextAction: 'Connect with solutions eng',    daysInStage:  9, group: 'trial',     initials: 'PP' },
  // Activated
  { id: 'lc4',  company: 'BrightCart',        owner: 'Kristin Watson', plan: 'Starter',   mrr:  280, seats:   5, health: 81, nextAction: 'Offer paid conversion',        daysInStage:  3, group: 'activated', initials: 'BC' },
  { id: 'lc5',  company: 'SyncHub',           owner: 'Devon Lane',     plan: 'Starter',   mrr:  420, seats:   8, health: 88, nextAction: 'Send upgrade playbook',        daysInStage:  5, group: 'activated', initials: 'SH' },
  { id: 'lc6',  company: 'PixelForge',        owner: 'Jane Cooper',    plan: 'Pro',       mrr:  840, seats:  14, health: 76, nextAction: 'Trial-to-paid nudge',          daysInStage:  2, group: 'activated', initials: 'PF' },
  // Paid
  { id: 'lc7',  company: 'Acme Corporation',  owner: 'Darlene R.',     plan: 'Enterprise',mrr: 4800, seats: 240, health: 92, nextAction: 'Quarterly business review',    daysInStage:128, group: 'paid',      initials: 'AC' },
  { id: 'lc8',  company: 'Stark Industries',  owner: 'Jane Cooper',    plan: 'Enterprise',mrr: 3600, seats: 180, health: 88, nextAction: 'Renewal kickoff',              daysInStage: 96, group: 'paid',      initials: 'SI' },
  { id: 'lc9',  company: 'Wayne Enterprises', owner: 'Kristin Watson', plan: 'Pro',       mrr:  840, seats:  28, health: 76, nextAction: 'Send usage report',            daysInStage: 64, group: 'paid',      initials: 'WE' },
  { id: 'lc10', company: 'Hooli Inc.',        owner: 'Albert Flores',  plan: 'Enterprise',mrr: 5200, seats: 320, health: 95, nextAction: 'Executive check-in',           daysInStage:184, group: 'paid',      initials: 'HI' },
  // Expansion-ready
  { id: 'lc11', company: 'Northstar AI',      owner: 'Jane Cooper',    plan: 'Business',  mrr: 2400, seats:  96, health: 91, nextAction: 'Propose Enterprise upgrade',  daysInStage: 72, group: 'expansion', initials: 'NA' },
  { id: 'lc12', company: 'OrbitLabs',         owner: 'Albert Flores',  plan: 'Pro',       mrr: 1260, seats:  42, health: 86, nextAction: 'Seat expansion quote',        daysInStage: 48, group: 'expansion', initials: 'OL' },
  { id: 'lc13', company: 'AtlasCloud',        owner: 'Darlene R.',     plan: 'Business',  mrr: 1800, seats:  72, health: 84, nextAction: 'Add-on demo: SSO + audit',     daysInStage: 36, group: 'expansion', initials: 'AC' },
  // At risk
  { id: 'lc14', company: 'BluePeak',          owner: 'Kristin Watson', plan: 'Business',  mrr: 1560, seats:  64, health: 42, nextAction: 'Schedule save call',          daysInStage: 18, group: 'risk',      initials: 'BP' },
  { id: 'lc15', company: 'FlowDesk',          owner: 'Devon Lane',     plan: 'Starter',   mrr:  420, seats:  12, health: 38, nextAction: 'Re-engage champion',          daysInStage: 21, group: 'risk',      initials: 'FD' },
  { id: 'lc16', company: 'Umbrella Corp',     owner: 'Albert Flores',  plan: 'Pro',       mrr:  680, seats:  24, health: 31, nextAction: 'Payment recovery + save',     daysInStage: 14, group: 'risk',      initials: 'UC' },
];

/* ---- Integrations Health ---- */
export type Integration = {
  id: string;
  name: string;
  category: string;
  status: 'healthy' | 'degraded' | 'down';
  syncHealth: number;         // %
  connectedAccounts: number;
  lastSync: string;
  syncsPerDay: number;
  color: string;              // brand color
  brand: 'stripe' | 'slack' | 'github' | 'ga' | 'hubspot' | 'zapier';
};

export const integrations: Integration[] = [
  { id: 'int1', name: 'Stripe',          category: 'Payments',       status: 'healthy',  syncHealth: 99, connectedAccounts: 1248, lastSync: '2 min ago',  syncsPerDay: 8640,  color: '#635BFF', brand: 'stripe'  },
  { id: 'int2', name: 'Slack',           category: 'Notifications',  status: 'healthy',  syncHealth: 98, connectedAccounts:  842, lastSync: '5 min ago',  syncsPerDay: 4280,  color: '#4A154B', brand: 'slack'   },
  { id: 'int3', name: 'GitHub',          category: 'DevOps',         status: 'degraded', syncHealth: 86, connectedAccounts:  684, lastSync: '18 min ago', syncsPerDay: 2840,  color: '#181717', brand: 'github'  },
  { id: 'int4', name: 'Google Analytics',category: 'Analytics',      status: 'healthy',  syncHealth: 97, connectedAccounts:  968, lastSync: '8 min ago',  syncsPerDay: 1440,  color: '#E37400', brand: 'ga'      },
  { id: 'int5', name: 'HubSpot',         category: 'CRM',            status: 'healthy',  syncHealth: 95, connectedAccounts:  426, lastSync: '12 min ago', syncsPerDay: 1820,  color: '#FF7A59', brand: 'hubspot' },
  { id: 'int6', name: 'Zapier',          category: 'Automation',     status: 'down',     syncHealth: 42, connectedAccounts:  318, lastSync: '46 min ago', syncsPerDay:  680,  color: '#FF4F00', brand: 'zapier'  },
];

export const integrationsSummary = {
  total: 6,
  healthy: 4,
  degraded: 1,
  down: 1,
  totalAccounts: 4486,
  avgSyncHealth: 86,
};

/* ---- Invoices & Payments table ---- */
export type InvoiceStatus = 'Paid' | 'Pending' | 'Past due' | 'Failed' | 'Refunded';
export type RetryStatus = 'Not needed' | 'Scheduled' | 'Retrying' | 'Exhausted' | 'Recovered';

export type Invoice = {
  id: string;
  invoice: string;
  customer: string;
  contact: string;
  plan: 'Starter' | 'Pro' | 'Business' | 'Enterprise';
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  paymentMethod: 'Visa •• 4242' | 'Amex •• 1009' | 'MC •• 5318' | 'ACH •• 8821' | 'Wire transfer' | 'PayPal';
  retryStatus: RetryStatus;
  retryCount: number;
};

export const invoices: Invoice[] = [
  { id: 'inv1', invoice: 'INV-2026-04812', customer: 'Acme Corporation',  contact: 'Wile E. Coyote',  plan: 'Enterprise', amount: 4800, status: 'Paid',     dueDate: 'Jun 18, 2026', paymentMethod: 'Visa •• 4242',    retryStatus: 'Not needed', retryCount: 0 },
  { id: 'inv2', invoice: 'INV-2026-04813', customer: 'Stark Industries',  contact: 'Tony Stark',      plan: 'Enterprise', amount: 3600, status: 'Paid',     dueDate: 'Jun 18, 2026', paymentMethod: 'ACH •• 8821',     retryStatus: 'Not needed', retryCount: 0 },
  { id: 'inv3', invoice: 'INV-2026-04814', customer: 'BluePeak',          contact: 'Sara N.',         plan: 'Business',   amount: 1560, status: 'Failed',   dueDate: 'Jun 14, 2026', paymentMethod: 'Visa •• 4242',    retryStatus: 'Retrying',   retryCount: 2 },
  { id: 'inv4', invoice: 'INV-2026-04815', customer: 'Wayne Enterprises', contact: 'Bruce Wayne',     plan: 'Pro',        amount:  840, status: 'Pending',  dueDate: 'Jun 25, 2026', paymentMethod: 'Amex •• 1009',    retryStatus: 'Not needed', retryCount: 0 },
  { id: 'inv5', invoice: 'INV-2026-04816', customer: 'Umbrella Corp',     contact: 'Albert Wesker',   plan: 'Pro',        amount:  680, status: 'Past due', dueDate: 'Jun 10, 2026', paymentMethod: 'MC •• 5318',      retryStatus: 'Scheduled',  retryCount: 1 },
  { id: 'inv6', invoice: 'INV-2026-04817', customer: 'Hooli Inc.',        contact: 'Gavin Belson',    plan: 'Enterprise', amount: 5200, status: 'Paid',     dueDate: 'Jun 12, 2026', paymentMethod: 'Wire transfer',   retryStatus: 'Not needed', retryCount: 0 },
  { id: 'inv7', invoice: 'INV-2026-04818', customer: 'Initech LLC',       contact: 'Peter Gibbons',   plan: 'Starter',    amount:  240, status: 'Failed',   dueDate: 'Jun 08, 2026', paymentMethod: 'Visa •• 4242',    retryStatus: 'Exhausted',  retryCount: 4 },
  { id: 'inv8', invoice: 'INV-2026-04819', customer: 'Northstar AI',      contact: 'Jane Cooper',     plan: 'Business',   amount: 2400, status: 'Paid',     dueDate: 'Jun 20, 2026', paymentMethod: 'ACH •• 8821',     retryStatus: 'Recovered',  retryCount: 1 },
  { id: 'inv9', invoice: 'INV-2026-04820', customer: 'OrbitLabs',         contact: 'Albert Flores',   plan: 'Pro',        amount: 1260, status: 'Pending',  dueDate: 'Jun 28, 2026', paymentMethod: 'Amex •• 1009',    retryStatus: 'Not needed', retryCount: 0 },
  { id: 'inv10',invoice: 'INV-2026-04821', customer: 'FlowDesk',          contact: 'Devon Lane',      plan: 'Starter',    amount:  420, status: 'Refunded', dueDate: 'Jun 15, 2026', paymentMethod: 'PayPal',          retryStatus: 'Not needed', retryCount: 0 },
  { id: 'inv11',invoice: 'INV-2026-04822', customer: 'AtlasCloud',        contact: 'Darlene R.',      plan: 'Business',   amount: 1800, status: 'Paid',     dueDate: 'Jun 19, 2026', paymentMethod: 'Visa •• 4242',    retryStatus: 'Not needed', retryCount: 0 },
  { id: 'inv12',invoice: 'INV-2026-04823', customer: 'ZenithCorp',        contact: 'Esther H.',       plan: 'Enterprise', amount: 1980, status: 'Past due', dueDate: 'Jun 11, 2026', paymentMethod: 'MC •• 5318',      retryStatus: 'Scheduled',  retryCount: 1 },
];

export const invoiceStatusTone: Record<InvoiceStatus, 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
  'Paid':     'success',
  'Pending':  'info',
  'Past due': 'warning',
  'Failed':   'error',
  'Refunded': 'neutral',
};

export const retryStatusTone: Record<RetryStatus, 'neutral' | 'info' | 'warning' | 'error' | 'success'> = {
  'Not needed': 'neutral',
  'Scheduled':  'info',
  'Retrying':   'warning',
  'Exhausted':  'error',
  'Recovered':  'success',
};

/* ---- Add customer drawer (initial form state + plan options) ---- */
export const saasPlans = ['Starter', 'Pro', 'Business', 'Enterprise'] as const;
export const saasOwners = ['Darlene Robertson', 'Kristin Watson', 'Albert Flores', 'Jane Cooper', 'Devon Lane'];
export const saasSegments = ['All segments', 'SMB', 'Mid-market', 'Enterprise', 'Trial'] as const;
export const saasPlanFilters = ['All plans', 'Free', 'Starter', 'Pro', 'Business', 'Enterprise'] as const;
export const saasDatePresets = [
  { key: '7d',    label: 'Last 7 days',   range: 'Jun 17 – Jun 23, 2026' },
  { key: '30d',   label: 'Last 30 days',  range: 'May 24 – Jun 23, 2026' },
  { key: '90d',   label: 'Last 90 days',  range: 'Mar 25 – Jun 23, 2026' },
  { key: 'month', label: 'This month',    range: 'Jun 01 – Jun 23, 2026' },
  { key: 'quarter', label: 'This quarter',range: 'Apr 01 – Jun 23, 2026' },
  { key: 'custom',label: 'Custom range',  range: 'May 24 – Jun 23, 2026' },
] as const;

/* ---- Customer detail drawer (used when clicking board cards) ---- */
export type CustomerDetail = {
  company: string;
  owner: string;
  plan: string;
  seats: number;
  mrr: number;
  billingEmail: string;
  notes: string;
  health: number;
  group: LifecycleGroupKey;
  nextAction: string;
  daysInStage: number;
  startedAt: string;
  lastActive: string;
  npsScore: number;
  openTickets: number;
  expansionSignals: string[];
};

export const customerDetailByCompany: Record<string, CustomerDetail> = {
  'Acme Corporation': {
    company: 'Acme Corporation', owner: 'Darlene Robertson', plan: 'Enterprise', seats: 240, mrr: 4800,
    billingEmail: 'ap@acme.com', notes: 'Long-standing customer — strong product advocate. Renewal in 4 months.',
    health: 92, group: 'paid', nextAction: 'Quarterly business review', daysInStage: 128,
    startedAt: 'Jan 12, 2024', lastActive: '2h ago', npsScore: 9, openTickets: 1,
    expansionSignals: ['SSO add-on interest', 'Audit log requests from security team'],
  },
  'Northstar AI': {
    company: 'Northstar AI', owner: 'Jane Cooper', plan: 'Business', seats: 96, mrr: 2400,
    billingEmail: 'finance@northstar.ai', notes: 'High engagement — approaching Enterprise tier seat threshold.',
    health: 91, group: 'expansion', nextAction: 'Propose Enterprise upgrade', daysInStage: 72,
    startedAt: 'Mar 04, 2025', lastActive: '4h ago', npsScore: 10, openTickets: 0,
    expansionSignals: ['96/100 Enterprise seats used', 'Custom integration requested', 'SOC 2 docs requested'],
  },
  'BluePeak': {
    company: 'BluePeak', owner: 'Kristin Watson', plan: 'Business', seats: 64, mrr: 1560,
    billingEmail: 'billing@bluepeak.io', notes: 'Usage down 18% MoM — champion changed roles 3 weeks ago.',
    health: 42, group: 'risk', nextAction: 'Schedule save call', daysInStage: 18,
    startedAt: 'Sep 21, 2024', lastActive: '6d ago', npsScore: 5, openTickets: 4,
    expansionSignals: ['Usage declining 18% MoM', 'Champion inactive 14 days'],
  },
};
