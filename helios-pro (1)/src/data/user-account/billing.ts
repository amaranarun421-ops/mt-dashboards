export type InvoiceStatus = "Paid" | "Sent" | "Overdue" | "Draft";

export type Invoice = {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  description: string;
  method: string;
};

export type PaymentMethod = {
  id: string;
  brand: "Visa" | "Mastercard" | "Amex" | "PayPal" | "Bank";
  last4: string;
  expiry: string;
  isDefault: boolean;
  holder: string;
};

export type UsageMeter = {
  label: string;
  used: number;
  total: number;
  unit: string;
  tone: "primary" | "accent" | "violet" | "info" | "rose";
};

export const currentPlan = {
  name: "Helios Pro · Scale",
  price: 249,
  cycle: "month",
  renewsOn: "March 14, 2025",
  seats: 12,
  seatsUsed: 12,
  status: "Active" as const,
  features: [
    "Unlimited dashboards & reports",
    "Up to 25 team members",
    "Advanced permissions matrix",
    "SSO / SAML + SCIM provisioning",
    "99.95% uptime SLA",
    "Priority support · 4h response",
  ],
};

export const paymentMethods: PaymentMethod[] = [
  { id: "PM-1", brand: "Visa", last4: "4421", expiry: "08 / 27", isDefault: true, holder: "Aarav Mehta" },
  { id: "PM-2", brand: "Mastercard", last4: "1182", expiry: "11 / 26", isDefault: false, holder: "Helios Pro, Inc." },
  { id: "PM-3", brand: "Amex", last4: "9005", expiry: "02 / 28", isDefault: false, holder: "Aarav Mehta" },
];

export const invoices: Invoice[] = [
  { id: "INV-1", number: "INV-2025-0214", date: "Feb 14, 2025", amount: 249, status: "Sent", description: "Helios Pro · Scale — 12 seats", method: "Visa •••• 4421" },
  { id: "INV-2", number: "INV-2025-0114", date: "Jan 14, 2025", amount: 249, status: "Paid", description: "Helios Pro · Scale — 12 seats", method: "Visa •••• 4421" },
  { id: "INV-3", number: "INV-2024-1214", date: "Dec 14, 2024", amount: 199, status: "Paid", description: "Helios Pro · Growth — 8 seats", method: "Mastercard •••• 1182" },
  { id: "INV-4", number: "INV-2024-1114", date: "Nov 14, 2024", amount: 199, status: "Paid", description: "Helios Pro · Growth — 8 seats", method: "Mastercard •••• 1182" },
  { id: "INV-5", number: "INV-2024-1014", date: "Oct 14, 2024", amount: 199, status: "Paid", description: "Helios Pro · Growth — 8 seats", method: "Mastercard •••• 1182" },
  { id: "INV-6", number: "INV-2024-0914", date: "Sep 14, 2024", amount: 149, status: "Paid", description: "Helios Pro · Starter — 5 seats", method: "Visa •••• 4421" },
  { id: "INV-7", number: "INV-2024-0814", date: "Aug 14, 2024", amount: 149, status: "Paid", description: "Helios Pro · Starter — 5 seats", method: "Visa •••• 4421" },
  { id: "INV-8", number: "INV-2024-0714", date: "Jul 14, 2024", amount: 149, status: "Overdue", description: "Helios Pro · Starter — 5 seats", method: "Visa •••• 4421" },
];

export const usageMeters: UsageMeter[] = [
  { label: "API calls", used: 184320, total: 500000, unit: "calls", tone: "primary" },
  { label: "Storage", used: 84, total: 200, unit: "GB", tone: "violet" },
  { label: "Team seats", used: 12, total: 25, unit: "seats", tone: "info" },
  { label: "Automations / mo", used: 6280, total: 10000, unit: "runs", tone: "accent" },
];

export const usageSeries = [
  { name: "API calls (k)", data: [62, 78, 81, 95, 112, 128, 142, 138, 156, 168, 179, 184] },
];

export const usageCategories = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const billingStats = {
  mrr: 249,
  ytd: 2688,
  nextInvoice: 249,
  outstanding: 0,
};
