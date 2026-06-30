export type InvoiceStatus = "paid" | "sent" | "overdue" | "draft";

export type Invoice = {
  id: string;
  client: string;
  clientEmail: string;
  issued: string;
  due: string;
  amount: number;
  status: InvoiceStatus;
  items: number;
  owner: string;
};

export const invoices: Invoice[] = [
  { id: "INV-2024-0142", client: "Northwind Labs", clientEmail: "billing@northwind.io", issued: "Jan 22, 2025", due: "Feb 05, 2025", amount: 12480, status: "sent", items: 8, owner: "Aarav Sharma" },
  { id: "INV-2024-0141", client: "Altavista GmbH", clientEmail: "ap@altavista.de", issued: "Jan 20, 2025", due: "Feb 03, 2025", amount: 4250, status: "paid", items: 4, owner: "Priya Patel" },
  { id: "INV-2024-0140", client: "Brightwave", clientEmail: "finance@brightwave.cn", issued: "Jan 18, 2025", due: "Feb 01, 2025", amount: 18900, status: "overdue", items: 12, owner: "Marcus Bell" },
  { id: "INV-2024-0139", client: "Meridian SA", clientEmail: "contato@meridian.br", issued: "Jan 15, 2025", due: "Jan 29, 2025", amount: 6720, status: "paid", items: 5, owner: "Emma Reyes" },
  { id: "INV-2024-0138", client: "Fjord Tech", clientEmail: "billing@fjordtech.no", issued: "Jan 12, 2025", due: "Jan 26, 2025", amount: 9420, status: "paid", items: 7, owner: "Daniel Chen" },
  { id: "INV-2024-0137", client: "Quantix", clientEmail: "ap@quantix.co", issued: "Jan 10, 2025", due: "Jan 24, 2025", amount: 3180, status: "overdue", items: 3, owner: "Sofia Mendes" },
  { id: "INV-2024-0136", client: "Helios Pro — Internal", clientEmail: "finance@heliospro.io", issued: "Jan 08, 2025", due: "Jan 22, 2025", amount: 0, status: "draft", items: 0, owner: "Liam Walsh" },
  { id: "INV-2024-0135", client: "Northwind Labs", clientEmail: "billing@northwind.io", issued: "Jan 05, 2025", due: "Jan 19, 2025", amount: 14200, status: "paid", items: 9, owner: "Aarav Sharma" },
  { id: "INV-2024-0134", client: "Inland Robotics", clientEmail: "ap@inlandrobotics.com", issued: "Jan 03, 2025", due: "Jan 17, 2025", amount: 7650, status: "paid", items: 6, owner: "Marcus Bell" },
  { id: "INV-2024-0133", client: "Cascade Energy", clientEmail: "billing@cascade.energy", issued: "Dec 28, 2024", due: "Jan 11, 2025", amount: 22340, status: "paid", items: 14, owner: "Priya Patel" },
  { id: "INV-2024-0132", client: "Atlas Freight", clientEmail: "finance@atlasfreight.io", issued: "Dec 22, 2024", due: "Jan 05, 2025", amount: 5180, status: "overdue", items: 4, owner: "Emma Reyes" },
  { id: "INV-2024-0131", client: "Brightwave", clientEmail: "finance@brightwave.cn", issued: "Dec 18, 2024", due: "Jan 01, 2025", amount: 16720, status: "paid", items: 11, owner: "Aarav Sharma" },
];

export type InvoiceLineItem = {
  id: string;
  description: string;
  qty: number;
  rate: number;
};

export const sampleInvoice = {
  id: "INV-2024-0142",
  client: "Northwind Labs",
  clientEmail: "billing@northwind.io",
  clientAddress: "221 Market St, Suite 1100\nSan Francisco, CA 94105\nUnited States",
  issued: "Jan 22, 2025",
  due: "Feb 05, 2025",
  status: "sent" as InvoiceStatus,
  owner: "Aarav Sharma",
  notes: "Payable by ACH or wire. Net 14 terms. Quote Q4-NW-2201.",
  items: [
    { id: "li1", description: "Helios Pro — Enterprise platform (annual, 250 seats)", qty: 1, rate: 8400 },
    { id: "li2", description: "Premium support add-on (24/7, dedicated TAM)", qty: 1, rate: 2400 },
    { id: "li3", description: "AI inference — additional 2M tokens / mo", qty: 2, rate: 320 },
    { id: "li4", description: "Onboarding & migration services", qty: 1, rate: 1200 },
    { id: "li5", description: "Custom SSO + SCIM setup", qty: 1, rate: 480 },
    { id: "li6", description: "Training workshop (2 sessions, on-site)", qty: 2, rate: 600 },
    { id: "li7", description: "Additional sandbox environments", qty: 4, rate: 90 },
    { id: "li8", description: "Audit log export — extended retention (1 yr)", qty: 1, rate: 240 },
  ] as InvoiceLineItem[],
  taxRate: 0.0,
  discount: 280,
};

export const invoiceStatusTone: Record<InvoiceStatus, "success" | "info" | "danger" | "neutral"> = {
  paid: "success",
  sent: "info",
  overdue: "danger",
  draft: "neutral",
};
