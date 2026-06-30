export type Invoice = {
  id: string;
  client: string;
  email: string;
  img: number;
  amount: number;
  date: string;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue" | "Draft";
  items: { description: string; qty: number; rate: number }[];
};

export const invoices: Invoice[] = [
  { id: "INV-2024-001", client: "Acme Corporation", email: "billing@acme.com", img: 4, amount: 4850, date: "Jun 1, 2024", dueDate: "Jun 15, 2024", status: "Paid", items: [{ description: "Premium Subscription (Annual)", qty: 1, rate: 2400 }, { description: "Onboarding & Training", qty: 1, rate: 1500 }, { description: "Additional User Licenses (5x)", qty: 5, rate: 190 }] },
  { id: "INV-2024-002", client: "Globex Inc", email: "ap@globex.com", img: 5, amount: 2340, date: "Jun 3, 2024", dueDate: "Jun 17, 2024", status: "Pending", items: [{ description: "Pro Subscription (Monthly)", qty: 1, rate: 299 }, { description: "API Usage (100k calls)", qty: 1, rate: 500 }, { description: "Custom Integration", qty: 1, rate: 1541 }] },
  { id: "INV-2024-003", client: "Initech LLC", email: "accounts@initech.com", img: 6, amount: 8750, date: "May 28, 2024", dueDate: "Jun 11, 2024", status: "Overdue", items: [{ description: "Enterprise Plan (Annual)", qty: 1, rate: 7200 }, { description: "Priority Support Add-on", qty: 1, rate: 1550 }] },
  { id: "INV-2024-004", client: "Stark Industries", email: "pepper@stark.com", img: 7, amount: 15600, date: "Jun 10, 2024", dueDate: "Jun 24, 2024", status: "Paid", items: [{ description: "Enterprise Plan (Annual)", qty: 1, rate: 7200 }, { description: "Custom Development", qty: 1, rate: 5400 }, { description: "White-label Branding", qty: 1, rate: 3000 }] },
  { id: "INV-2024-005", client: "Wayne Enterprises", email: "lucius@wayne.com", img: 8, amount: 3120, date: "Jun 12, 2024", dueDate: "Jun 26, 2024", status: "Pending", items: [{ description: "Pro Subscription (Annual)", qty: 1, rate: 2990 }, { description: "Additional Storage 100GB", qty: 1, rate: 130 }] },
  { id: "INV-2024-006", client: "Umbrella LLC", email: "billing@umbrella.com", img: 9, amount: 450, date: "Jun 14, 2024", dueDate: "Jun 28, 2024", status: "Draft", items: [{ description: "Starter Plan (Monthly)", qty: 1, rate: 49 }, { description: "Setup Fee", qty: 1, rate: 401 }] },
];
