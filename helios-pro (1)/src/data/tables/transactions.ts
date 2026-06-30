export type Transaction = {
  id: string;
  reference: string;
  customer: string;
  customerEmail: string;
  method: "Visa" | "Mastercard" | "Amex" | "PayPal" | "Apple Pay" | "Bank Transfer" | "Crypto";
  amount: number;
  currency: "USD" | "EUR" | "GBP" | "JPY" | "INR";
  status: "Completed" | "Pending" | "Failed" | "Refunded" | "Disputed";
  type: "Payment" | "Refund" | "Payout" | "Subscription" | "Withdrawal";
  category: "Sales" | "SaaS" | "Payroll" | "Marketing" | "Infrastructure" | "Refund";
  date: string; // ISO datetime
  riskScore: number; // 0-100
};

export const transactions: Transaction[] = [
  { id: "TX-1001", reference: "INV-2024-0192", customer: "Aarav Sharma", customerEmail: "aarav@example.com", method: "Visa", amount: 1240.00, currency: "USD", status: "Completed", type: "Payment", category: "Sales", date: "2024-09-01T09:12:00", riskScore: 8 },
  { id: "TX-1002", reference: "INV-2024-0193", customer: "Priya Nair", customerEmail: "priya@example.com", method: "Mastercard", amount: 860.50, currency: "EUR", status: "Completed", type: "Subscription", category: "SaaS", date: "2024-09-01T10:45:00", riskScore: 12 },
  { id: "TX-1003", reference: "INV-2024-0194", customer: "Daniel Carter", customerEmail: "daniel@example.com", method: "Amex", amount: 4290.00, currency: "USD", status: "Pending", type: "Payment", category: "Sales", date: "2024-09-02T14:20:00", riskScore: 22 },
  { id: "TX-1004", reference: "INV-2024-0195", customer: "Sofia Rossi", customerEmail: "sofia@example.com", method: "PayPal", amount: 320.75, currency: "GBP", status: "Completed", type: "Payment", category: "Sales", date: "2024-09-02T16:05:00", riskScore: 6 },
  { id: "TX-1005", reference: "INV-2024-0196", customer: "Liam O'Brien", customerEmail: "liam@example.com", method: "Visa", amount: 75.00, currency: "USD", status: "Failed", type: "Subscription", category: "SaaS", date: "2024-09-03T08:30:00", riskScore: 78 },
  { id: "TX-1006", reference: "INV-2024-0197", customer: "Yuki Tanaka", customerEmail: "yuki@example.com", method: "Apple Pay", amount: 1980.00, currency: "JPY", status: "Completed", type: "Payment", category: "Sales", date: "2024-09-03T11:50:00", riskScore: 4 },
  { id: "TX-1007", reference: "INV-2024-0198", customer: "Emma Müller", customerEmail: "emma@example.com", method: "Bank Transfer", amount: 12500.00, currency: "EUR", status: "Completed", type: "Payout", category: "Payroll", date: "2024-09-04T13:15:00", riskScore: 2 },
  { id: "TX-1008", reference: "INV-2024-0199", customer: "Marcus Lee", customerEmail: "marcus@example.com", method: "Mastercard", amount: 540.20, currency: "USD", status: "Refunded", type: "Refund", category: "Refund", date: "2024-09-04T15:42:00", riskScore: 14 },
  { id: "TX-1009", reference: "INV-2024-0200", customer: "Layla Haddad", customerEmail: "layla@example.com", method: "Visa", amount: 1990.00, currency: "USD", status: "Completed", type: "Subscription", category: "SaaS", date: "2024-09-05T09:25:00", riskScore: 9 },
  { id: "TX-1010", reference: "INV-2024-0201", customer: "Noah Becker", customerEmail: "noah@example.com", method: "PayPal", amount: 410.00, currency: "GBP", status: "Pending", type: "Payment", category: "Sales", date: "2024-09-05T12:18:00", riskScore: 28 },
  { id: "TX-1011", reference: "INV-2024-0202", customer: "Grace Bennett", customerEmail: "grace@example.com", method: "Amex", amount: 6840.00, currency: "USD", status: "Completed", type: "Payment", category: "Marketing", date: "2024-09-06T14:55:00", riskScore: 11 },
  { id: "TX-1012", reference: "INV-2024-0203", customer: "Henrik Larsen", customerEmail: "henrik@example.com", method: "Bank Transfer", amount: 2200.00, currency: "EUR", status: "Completed", type: "Withdrawal", category: "Infrastructure", date: "2024-09-06T17:02:00", riskScore: 5 },
  { id: "TX-1013", reference: "INV-2024-0204", customer: "Mei Chen", customerEmail: "mei@example.com", method: "Crypto", amount: 875.00, currency: "USD", status: "Disputed", type: "Payment", category: "Sales", date: "2024-09-07T10:40:00", riskScore: 84 },
  { id: "TX-1014", reference: "INV-2024-0205", customer: "Rafael Costa", customerEmail: "rafael@example.com", method: "Visa", amount: 145.00, currency: "USD", status: "Failed", type: "Subscription", category: "SaaS", date: "2024-09-07T13:33:00", riskScore: 92 },
  { id: "TX-1015", reference: "INV-2024-0206", customer: "Ingrid Nilsen", customerEmail: "ingrid@example.com", method: "Mastercard", amount: 3120.00, currency: "GBP", status: "Completed", type: "Payment", category: "Sales", date: "2024-09-08T09:15:00", riskScore: 7 },
  { id: "TX-1016", reference: "INV-2024-0207", customer: "Tobias Frank", customerEmail: "tobias@example.com", method: "PayPal", amount: 89.00, currency: "EUR", status: "Pending", type: "Payment", category: "Sales", date: "2024-09-08T11:48:00", riskScore: 35 },
  { id: "TX-1017", reference: "INV-2024-0208", customer: "Amara Okafor", customerEmail: "amara@example.com", method: "Apple Pay", amount: 660.00, currency: "USD", status: "Completed", type: "Subscription", category: "SaaS", date: "2024-09-09T14:22:00", riskScore: 10 },
  { id: "TX-1018", reference: "INV-2024-0209", customer: "Mateo Garcia", customerEmail: "mateo@example.com", method: "Visa", amount: 4280.00, currency: "USD", status: "Completed", type: "Payment", category: "Marketing", date: "2024-09-09T16:10:00", riskScore: 13 },
  { id: "TX-1019", reference: "INV-2024-0210", customer: "Hana Park", customerEmail: "hana@example.com", method: "Bank Transfer", amount: 9800.00, currency: "USD", status: "Completed", type: "Payout", category: "Payroll", date: "2024-09-10T10:05:00", riskScore: 3 },
  { id: "TX-1020", reference: "INV-2024-0211", customer: "Olivia Adams", customerEmail: "olivia@example.com", method: "Amex", amount: 215.50, currency: "USD", status: "Refunded", type: "Refund", category: "Refund", date: "2024-09-10T12:55:00", riskScore: 16 },
  { id: "TX-1021", reference: "INV-2024-0212", customer: "Ravi Patel", customerEmail: "ravi@example.com", method: "Mastercard", amount: 1490.00, currency: "INR", status: "Completed", type: "Subscription", category: "SaaS", date: "2024-09-11T15:30:00", riskScore: 8 },
  { id: "TX-1022", reference: "INV-2024-0213", customer: "Chloe Martin", customerEmail: "chloe@example.com", method: "PayPal", amount: 540.00, currency: "EUR", status: "Pending", type: "Payment", category: "Sales", date: "2024-09-11T18:00:00", riskScore: 24 },
  { id: "TX-1023", reference: "INV-2024-0214", customer: "Ethan Wright", customerEmail: "ethan@example.com", method: "Visa", amount: 870.00, currency: "USD", status: "Failed", type: "Subscription", category: "SaaS", date: "2024-09-12T09:42:00", riskScore: 68 },
  { id: "TX-1024", reference: "INV-2024-0215", customer: "Zara Khan", customerEmail: "zara@example.com", method: "Bank Transfer", amount: 3300.00, currency: "USD", status: "Completed", type: "Withdrawal", category: "Infrastructure", date: "2024-09-12T11:18:00", riskScore: 4 },
  { id: "TX-1025", reference: "INV-2024-0216", customer: "Leo Schmidt", customerEmail: "leo@example.com", method: "Crypto", amount: 1200.00, currency: "USD", status: "Disputed", type: "Payment", category: "Sales", date: "2024-09-13T14:00:00", riskScore: 88 },
  { id: "TX-1026", reference: "INV-2024-0217", customer: "Nadia Ivanova", customerEmail: "nadia@example.com", method: "Mastercard", amount: 480.00, currency: "EUR", status: "Completed", type: "Payment", category: "Sales", date: "2024-09-13T16:45:00", riskScore: 11 },
  { id: "TX-1027", reference: "INV-2024-0218", customer: "Omar Hassan", customerEmail: "omar@example.com", method: "Amex", amount: 7290.00, currency: "USD", status: "Completed", type: "Payment", category: "Marketing", date: "2024-09-14T10:30:00", riskScore: 6 },
  { id: "TX-1028", reference: "INV-2024-0219", customer: "Isabela Souza", customerEmail: "isabela@example.com", method: "PayPal", amount: 240.00, currency: "USD", status: "Pending", type: "Subscription", category: "SaaS", date: "2024-09-14T13:12:00", riskScore: 21 },
  { id: "TX-1029", reference: "INV-2024-0220", customer: "Aarav Sharma", customerEmail: "aarav@example.com", method: "Visa", amount: 1840.00, currency: "USD", status: "Completed", type: "Payment", category: "Sales", date: "2024-09-15T09:00:00", riskScore: 7 },
  { id: "TX-1030", reference: "INV-2024-0221", customer: "Priya Nair", customerEmail: "priya@example.com", method: "Apple Pay", amount: 990.00, currency: "USD", status: "Refunded", type: "Refund", category: "Refund", date: "2024-09-15T11:35:00", riskScore: 18 },
];

export const transactionStatuses = ["Completed", "Pending", "Failed", "Refunded", "Disputed"] as const;
export const transactionMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Bank Transfer", "Crypto"] as const;
export const transactionCategories = ["Sales", "SaaS", "Payroll", "Marketing", "Infrastructure", "Refund"] as const;

export type TransactionStatus = typeof transactionStatuses[number];
export type TransactionMethod = typeof transactionMethods[number];
export type TransactionCategory = typeof transactionCategories[number];
