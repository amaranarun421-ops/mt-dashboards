/* ========================================================================
   Finance dashboard mock data — realistic business cashflow operations.
   Internally consistent: $284,920 cash · $96,420 income · $64,180 expenses
   · $32,240 net cashflow · $18,600/mo burn · 14.8 months runway.
   ======================================================================== */

/* ---- Accounts ---- */
export type Account = {
  id: string;
  name: string;
  bank: string;
  last4: string;
  balance: number;
  type: 'checking' | 'savings' | 'business' | 'card';
  primary?: boolean;
};

export const accounts: Account[] = [
  { id: 'acc-1', name: 'Operating · Business', bank: 'Mercury', last4: '4983', balance: 184920, type: 'business', primary: true },
  { id: 'acc-2', name: 'Reserves · Savings', bank: 'Mercury', last4: '7720', balance: 88000, type: 'savings' },
  { id: 'acc-3', name: 'Payroll · Checking', bank: 'Chase', last4: '1182', balance: 12000, type: 'checking' },
];

export const periodPresets = [
  { key: '3m', label: '3 Month', range: 'Apr 01 – Jun 23, 2026' },
  { key: '6m', label: '6 Month', range: 'Jan 01 – Jun 23, 2026' },
  { key: 'ytd', label: 'YTD', range: 'Jan 01 – Jun 23, 2026' },
  { key: '12m', label: '12 Month', range: 'Jun 24, 2025 – Jun 23, 2026' },
  { key: 'custom', label: 'Custom', range: 'Apr 01 – Jun 23, 2026' },
];

export const years = ['2026', '2025', '2024'];

/* ---- Cashflow Overview hero metrics ---- */
export const cashflowOverview = {
  totalCash: 284920,
  income: 96420,
  expenses: 64180,
  netCashflow: 32240,
  burnRate: 18600,
  runwayMonths: 14.8,
  incomeChange: 12.4,
  expensesChange: -4.1,
  netChange: 28.6,
};

/* ---- Cashflow series by tab ---- */
export type CashflowPoint = {
  label: string;
  income: number;
  expense: number;
  net: number;
  burn: number;
  note?: string;
};

export const cashflowSeries: Record<'monthly' | 'quarterly' | 'yearly', CashflowPoint[]> = {
  monthly: [
    { label: 'Jan', income: 78200, expense: 64800, net: 13400, burn: 18200, note: 'Q1 kickoff payroll' },
    { label: 'Feb', income: 82400, expense: 61200, net: 21200, burn: 17800, note: 'Annual renewal cycle' },
    { label: 'Mar', income: 79600, expense: 68400, net: 11200, burn: 19400, note: 'Tax quarter close' },
    { label: 'Apr', income: 88200, expense: 62100, net: 26000, burn: 17600, note: 'Spring expansion' },
    { label: 'May', income: 92400, expense: 66800, net: 25600, burn: 18900, note: 'Marketing push' },
    { label: 'Jun', income: 96420, expense: 64180, net: 32240, burn: 18600, note: 'Mid-year close' },
  ],
  quarterly: [
    { label: 'Q1 2025', income: 218400, expense: 184200, net: 34200, burn: 18400, note: 'Baseline quarter' },
    { label: 'Q2 2025', income: 234800, expense: 192600, net: 42200, burn: 17900, note: 'Series A close' },
    { label: 'Q3 2025', income: 251200, expense: 201400, net: 49800, burn: 18200, note: 'Product launch' },
    { label: 'Q4 2025', income: 278600, expense: 224800, net: 53800, burn: 19100, note: 'Holiday season' },
    { label: 'Q1 2026', income: 240200, expense: 194400, net: 45800, burn: 18400, note: 'New fiscal year' },
    { label: 'Q2 2026', income: 277020, expense: 193080, net: 83940, burn: 18300, note: 'Current quarter' },
  ],
  yearly: [
    { label: '2022', income: 684200, expense: 612400, net: 71800, burn: 21800, note: 'Pre-funding year' },
    { label: '2023', income: 842400, expense: 718200, net: 124200, burn: 20400, note: 'Seed raise' },
    { label: '2024', income: 982400, expense: 802400, net: 180000, burn: 19200, note: 'Series A year' },
    { label: '2025', income: 1183200, expense: 942800, net: 240400, burn: 18400, note: 'Growth year' },
    { label: '2026', income: 641420, expense: 455280, net: 186140, burn: 18300, note: 'YTD projection' },
  ],
};

/* ---- My Cards wallet ---- */
export type CardItem = {
  id: string;
  name: string;
  type: 'visa' | 'mastercard';
  last4: string;
  expiry: string;
  balance: number;
  limit: number;
  spent: number;
  status: 'active' | 'frozen';
  holder: string;
  accent: string; // gradient css
  category: string;
};

export const cards: CardItem[] = [
  {
    id: 'card-1',
    name: 'Primary Business Card',
    type: 'visa',
    last4: '4983',
    expiry: '08/28',
    balance: 18420,
    limit: 50000,
    spent: 18420,
    status: 'active',
    holder: 'Darlene Robertson',
    accent: 'linear-gradient(135deg, #465FFF 0%, #7A5AF8 60%, #EC4899 100%)',
    category: 'Operations',
  },
  {
    id: 'card-2',
    name: 'Marketing Spend Card',
    type: 'mastercard',
    last4: '1208',
    expiry: '11/27',
    balance: 12840,
    limit: 30000,
    spent: 12840,
    status: 'active',
    holder: 'Kristin Watson',
    accent: 'linear-gradient(135deg, #F79009 0%, #F04438 60%, #EC4899 100%)',
    category: 'Marketing',
  },
  {
    id: 'card-3',
    name: 'Travel Card',
    type: 'visa',
    last4: '6671',
    expiry: '04/28',
    balance: 4280,
    limit: 20000,
    spent: 4280,
    status: 'frozen',
    holder: 'Devon Lane',
    accent: 'linear-gradient(135deg, #0BA5EC 0%, #465FFF 60%, #7A5AF8 100%)',
    category: 'Travel',
  },
];

/* ---- Runway Gauge ---- */
export const runway = {
  months: 14.8,
  burnRate: 18600,
  cashBalance: 284920,
  forecastRisk: 'Low' as 'Low' | 'Moderate' | 'High',
  assumptions: [
    { label: 'Starting cash', value: '$284.9K' },
    { label: 'Avg monthly burn', value: '$18.6K' },
    { label: 'Income stability', value: '94%' },
    { label: 'Expected income (90d)', value: '$284.2K' },
    { label: 'Scheduled expenses', value: '$112.4K' },
  ],
};

/* ---- Budget Variance ---- */
export type BudgetCategory = {
  name: string;
  actual: number;
  budget: number;
  icon: 'payroll' | 'marketing' | 'software' | 'contractors' | 'travel' | 'office' | 'taxes';
  color: string;
};

export const budgetVariance: BudgetCategory[] = [
  { name: 'Payroll', actual: 42800, budget: 45000, icon: 'payroll', color: '#465FFF' },
  { name: 'Marketing', actual: 30600, budget: 28000, icon: 'marketing', color: '#F79009' },
  { name: 'Software', actual: 12400, budget: 14000, icon: 'software', color: '#12B76A' },
  { name: 'Contractors', actual: 18200, budget: 16000, icon: 'contractors', color: '#7A5AF8' },
  { name: 'Travel', actual: 6800, budget: 9000, icon: 'travel', color: '#0BA5EC' },
];

/* ---- Expense Categories (treemap) ---- */
export type ExpenseCategory = {
  name: string;
  amount: number;
  share: number;
  color: string;
  transactions: number;
  variancePct: number; // vs budget
  trend: 'up' | 'down' | 'flat';
};

export const expenseCategories: ExpenseCategory[] = [
  { name: 'Payroll', amount: 42800, share: 38.4, color: '#465FFF', transactions: 124, variancePct: -4.9, trend: 'down' },
  { name: 'Marketing', amount: 30600, share: 27.5, color: '#F79009', transactions: 86, variancePct: 9.3, trend: 'up' },
  { name: 'Contractors', amount: 18200, share: 16.3, color: '#7A5AF8', transactions: 42, variancePct: 13.8, trend: 'up' },
  { name: 'Software', amount: 12400, share: 11.1, color: '#12B76A', transactions: 38, variancePct: -11.4, trend: 'down' },
  { name: 'Travel', amount: 6800, share: 6.1, color: '#0BA5EC', transactions: 24, variancePct: -24.4, trend: 'down' },
  { name: 'Office', amount: 1840, share: 1.7, color: '#EC4899', transactions: 12, variancePct: -2.1, trend: 'flat' },
  { name: 'Taxes', amount: 1320, share: 1.2, color: '#F04438', transactions: 4, variancePct: 0.0, trend: 'flat' },
];

/* ---- Invoice Aging ---- */
export type AgingBucket = {
  key: 'current' | '1-15' | '16-30' | '31-60' | '60+';
  label: string;
  amount: number;
  count: number;
  color: string;
  severity: 'good' | 'warning' | 'risk' | 'critical';
};

export const invoiceAging: AgingBucket[] = [
  { key: 'current', label: 'Current', amount: 42800, count: 14, color: '#12B76A', severity: 'good' },
  { key: '1-15', label: '1–15 days', amount: 18400, count: 8, color: '#0BA5EC', severity: 'good' },
  { key: '16-30', label: '16–30 days', amount: 9200, count: 5, color: '#F79009', severity: 'warning' },
  { key: '31-60', label: '31–60 days', amount: 6800, count: 3, color: '#7A5AF8', severity: 'risk' },
  { key: '60+', label: '60+ days', amount: 3100, count: 2, color: '#F04438', severity: 'critical' },
];

/* ---- Quick Send recipients ---- */
export type Recipient = {
  id: string;
  name: string;
  type: 'person' | 'vendor';
  detail: string;
};

export const recipients: Recipient[] = [
  { id: 'r1', name: 'Kristin Watson', type: 'person', detail: 'Contractor · Design' },
  { id: 'r2', name: 'Albert Flores', type: 'person', detail: 'Contractor · Dev' },
  { id: 'r3', name: 'Jane Cooper', type: 'person', detail: 'Vendor · Legal' },
  { id: 'r4', name: 'Devon Lane', type: 'person', detail: 'Consultant' },
  { id: 'r5', name: 'Figma', type: 'vendor', detail: 'Software · Annual' },
  { id: 'r6', name: 'AWS', type: 'vendor', detail: 'Cloud · Monthly' },
];

export const sendAccounts = [
  { id: 'acc-1', name: 'Operating · Business', detail: '$184,920' },
  { id: 'acc-2', name: 'Reserves · Savings', detail: '$88,000' },
  { id: 'acc-3', name: 'Payroll · Checking', detail: '$12,000' },
];

export const quickSendPurposes = ['Contractor payment', 'Vendor invoice', 'Refund', 'Reimbursement', 'Service fee', 'Other'];

/* ---- Recent Transactions feed ---- */
export type Transaction = {
  id: string;
  brand: 'netflix' | 'google' | 'aws' | 'figma' | 'paypal' | 'stellar' | 'stripe' | 'slack' | 'mercury' | 'chase';
  brandLabel: string;
  title: string;
  subtitle: string;
  amount: number; // signed
  date: string;
  time: string;
  category: string;
  card: string;
  status: 'completed' | 'pending' | 'failed';
  receipt?: string;
};

export const recentTransactions: Transaction[] = [
  { id: 't1', brand: 'stellar', brandLabel: 'Stellar Rewards', title: 'Payment received', subtitle: 'Stellar Rewards · Invoice INV-2841', amount: 1120, date: 'Jun 23', time: '14:32', category: 'Income', card: 'Bank transfer', status: 'completed', receipt: 'RC-7821' },
  { id: 't2', brand: 'netflix', brandLabel: 'Netflix', title: 'Netflix Subscription', subtitle: 'Entertainment · Team plan', amount: -36.24, date: 'Jun 23', time: '09:14', category: 'Software', card: 'Visa · 4983', status: 'completed', receipt: 'RC-7820' },
  { id: 't3', brand: 'paypal', brandLabel: 'PayPal', title: 'Money received via PayPal', subtitle: 'Client payment · Aurora Labs', amount: 590, date: 'Jun 22', time: '17:48', category: 'Income', card: 'PayPal balance', status: 'completed', receipt: 'RC-7819' },
  { id: 't4', brand: 'google', brandLabel: 'Google Ads', title: 'Google Ads', subtitle: 'Marketing · Search campaign', amount: -236.24, date: 'Jun 22', time: '11:02', category: 'Marketing', card: 'Mastercard · 1208', status: 'completed', receipt: 'RC-7818' },
  { id: 't5', brand: 'aws', brandLabel: 'AWS', title: 'AWS Cloud', subtitle: 'Infrastructure · Compute + storage', amount: -842.1, date: 'Jun 21', time: '23:50', category: 'Software', card: 'Visa · 4983', status: 'completed', receipt: 'RC-7817' },
  { id: 't6', brand: 'figma', brandLabel: 'Figma', title: 'Figma Seats', subtitle: 'Software · 8 seats', amount: -168, date: 'Jun 21', time: '08:30', category: 'Software', card: 'Visa · 4983', status: 'completed', receipt: 'RC-7816' },
];

/* ---- Revenue Streams ---- */
export type RevenueStream = {
  name: string;
  amount: number;
  share: number;
  growth: number;
  margin: number;
  color: string;
};

export const revenueStreams: RevenueStream[] = [
  { name: 'Subscriptions', amount: 64200, share: 66.6, growth: 14.2, margin: 78, color: '#465FFF' },
  { name: 'Services', amount: 18600, share: 19.3, growth: 8.4, margin: 52, color: '#12B76A' },
  { name: 'Marketplace', amount: 8400, share: 8.7, growth: 22.8, margin: 38, color: '#F79009' },
  { name: 'Affiliate', amount: 3200, share: 3.3, growth: 4.2, margin: 84, color: '#7A5AF8' },
  { name: 'Interest', amount: 1100, share: 1.1, growth: 1.8, margin: 96, color: '#0BA5EC' },
];

/* ---- Financial Health Score ---- */
export type HealthDimension = {
  name: string;
  score: number; // out of 100
  weight: number;
  note: string;
  color: string;
};

export const financialHealth = {
  score: 86,
  trend: '+4',
  dimensions: [
    { name: 'Cash runway', score: 92, weight: 25, note: '14.8 months of runway — well above 12-month safety threshold.', color: '#12B76A' },
    { name: 'Expense control', score: 78, weight: 20, note: 'Marketing +9.3% over budget — recommend tightening Q3 spend.', color: '#F79009' },
    { name: 'Invoice collection', score: 84, weight: 20, note: '78% collected within 30 days. 5 invoices overdue 30+ days.', color: '#465FFF' },
    { name: 'Revenue stability', score: 88, weight: 20, note: 'Subscriptions represent 66.6% of revenue — high predictability.', color: '#7A5AF8' },
    { name: 'Debt exposure', score: 90, weight: 15, note: 'Debt-to-equity at 0.18 — well below industry benchmark of 0.5.', color: '#0BA5EC' },
  ] as HealthDimension[],
};

/* ---- Invoices table ---- */
export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft' | 'Sent';

export type Invoice = {
  id: string;
  client: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  aging: 'Current' | '1–15' | '16–30' | '31–60' | '60+';
  agingDays: number;
  paymentMethod: 'Bank transfer' | 'Card' | 'PayPal' | 'Stripe' | 'Wire';
  owner: string;
  issued: string;
  memo?: string;
};

export const invoices: Invoice[] = [
  { id: 'INV-2841', client: 'Stellar Rewards', amount: 1120, status: 'Paid', dueDate: 'Jun 18, 2026', aging: 'Current', agingDays: 0, paymentMethod: 'Bank transfer', owner: 'Kristin Watson', issued: 'Jun 04, 2026', memo: 'Monthly retainer' },
  { id: 'INV-2842', client: 'Aurora Labs', amount: 590, status: 'Paid', dueDate: 'Jun 20, 2026', aging: 'Current', agingDays: 0, paymentMethod: 'PayPal', owner: 'Albert Flores', issued: 'Jun 06, 2026', memo: 'Consulting — design sprint' },
  { id: 'INV-2843', client: 'Northwind Group', amount: 4280, status: 'Pending', dueDate: 'Jun 28, 2026', aging: 'Current', agingDays: 4, paymentMethod: 'Bank transfer', owner: 'Jane Cooper', issued: 'Jun 14, 2026', memo: 'Q2 enterprise license' },
  { id: 'INV-2844', client: 'Vertex Co.', amount: 1860, status: 'Pending', dueDate: 'Jul 02, 2026', aging: '1–15', agingDays: 9, paymentMethod: 'Stripe', owner: 'Devon Lane', issued: 'Jun 18, 2026' },
  { id: 'INV-2845', client: 'Lumen Studio', amount: 8240, status: 'Pending', dueDate: 'Jul 04, 2026', aging: '1–15', agingDays: 12, paymentMethod: 'Card', owner: 'Kristin Watson', issued: 'Jun 20, 2026', memo: 'Brand system delivery' },
  { id: 'INV-2846', client: 'Meridian AI', amount: 3120, status: 'Overdue', dueDate: 'Jun 12, 2026', aging: '16–30', agingDays: 18, paymentMethod: 'Bank transfer', owner: 'Albert Flores', issued: 'May 28, 2026', memo: 'Implementation services' },
  { id: 'INV-2847', client: 'Cobalt Systems', amount: 2480, status: 'Overdue', dueDate: 'Jun 08, 2026', aging: '16–30', agingDays: 24, paymentMethod: 'Wire', owner: 'Jane Cooper', issued: 'May 24, 2026' },
  { id: 'INV-2848', client: 'Brightwave', amount: 4120, status: 'Overdue', dueDate: 'May 28, 2026', aging: '31–60', agingDays: 38, paymentMethod: 'Bank transfer', owner: 'Devon Lane', issued: 'May 12, 2026', memo: 'Annual platform fee' },
  { id: 'INV-2849', client: 'Pulse Robotics', amount: 2680, status: 'Overdue', dueDate: 'May 22, 2026', aging: '31–60', agingDays: 42, paymentMethod: 'Stripe', owner: 'Kristin Watson', issued: 'May 06, 2026' },
  { id: 'INV-2850', client: 'Quartz Digital', amount: 1860, status: 'Overdue', dueDate: 'Apr 28, 2026', aging: '60+', agingDays: 62, paymentMethod: 'Bank transfer', owner: 'Albert Flores', issued: 'Apr 12, 2026', memo: 'Custom integration' },
  { id: 'INV-2851', client: 'Helix Health', amount: 1240, status: 'Overdue', dueDate: 'Apr 18, 2026', aging: '60+', agingDays: 68, paymentMethod: 'Wire', owner: 'Jane Cooper', issued: 'Apr 02, 2026' },
  { id: 'INV-2852', client: 'Solstice Media', amount: 6420, status: 'Sent', dueDate: 'Jul 10, 2026', aging: 'Current', agingDays: 0, paymentMethod: 'Card', owner: 'Devon Lane', issued: 'Jun 22, 2026', memo: 'Q3 campaign bundle' },
  { id: 'INV-2853', client: 'Atlas Freight', amount: 3280, status: 'Draft', dueDate: 'Jul 14, 2026', aging: 'Current', agingDays: 0, paymentMethod: 'Bank transfer', owner: 'Kristin Watson', issued: 'Jun 23, 2026' },
  { id: 'INV-2854', client: 'Cascade Foods', amount: 2840, status: 'Sent', dueDate: 'Jul 16, 2026', aging: 'Current', agingDays: 0, paymentMethod: 'Stripe', owner: 'Albert Flores', issued: 'Jun 23, 2026' },
];

export const invoiceStatuses: Array<'All' | InvoiceStatus> = ['All', 'Paid', 'Sent', 'Pending', 'Overdue', 'Draft'];
export const agingFilters = ['All', 'Current', '1–15', '16–30', '31–60', '60+'] as const;

/* ---- Transaction categories + vendors ---- */
export const transactionCategories = ['Income', 'Payroll', 'Marketing', 'Software', 'Contractors', 'Travel', 'Office', 'Taxes', 'Other'];
export const transactionAccounts = ['Operating · Business', 'Reserves · Savings', 'Payroll · Checking'];
export const transactionTypes = ['Income', 'Expense'] as const;

/* ---- Card owners + types for Add Card drawer ---- */
export const cardOwners = ['Darlene Robertson', 'Kristin Watson', 'Albert Flores', 'Jane Cooper', 'Devon Lane'];
export const cardTypes = ['Visa', 'Mastercard', 'Amex', 'Virtual'] as const;
export const cardCategoryRestrictions = ['Marketing', 'Software', 'Travel', 'Office', 'Payroll', 'Contractors'];
