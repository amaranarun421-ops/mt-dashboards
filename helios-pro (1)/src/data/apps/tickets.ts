export type TicketStatus = "open" | "in-progress" | "waiting" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type Ticket = {
  id: string;
  subject: string;
  requester: string;
  requesterEmail: string;
  company: string;
  assignee: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: "email" | "chat" | "phone" | "web";
  category: string;
  created: string;
  updated: string;
  replies: number;
  firstResponseMins: number;
  csat?: number;
};

export const tickets: Ticket[] = [
  { id: "TKT-4821", subject: "SSO with Okta — user attributes not mapping", requester: "Grace Okoro", requesterEmail: "grace.okoro@northwind.io", company: "Northwind Labs", assignee: "Daniel Chen", status: "in-progress", priority: "high", channel: "email", category: "Authentication", created: "Jan 22, 09:14", updated: "12 min ago", replies: 6, firstResponseMins: 8, csat: undefined },
  { id: "TKT-4820", subject: "Billing discrepancy on INV-2024-0140", requester: "Mei Lin", requesterEmail: "mei.lin@brightwave.cn", company: "Brightwave", assignee: "Aarav Sharma", status: "waiting", priority: "urgent", channel: "email", category: "Billing", created: "Jan 22, 07:48", updated: "44 min ago", replies: 4, firstResponseMins: 5, csat: undefined },
  { id: "TKT-4819", subject: "API rate limit too aggressive on /v2/uploads", requester: "Tobias Frank", requesterEmail: "tobias.frank@quantix.co", company: "Quantix", assignee: "Marcus Bell", status: "open", priority: "medium", channel: "chat", category: "API", created: "Jan 22, 06:30", updated: "1 hr ago", replies: 2, firstResponseMins: 11, csat: undefined },
  { id: "TKT-4818", subject: "Bulk user import — CSV column mapping", requester: "Henrik Vogel", requesterEmail: "henrik.vogel@altavista.de", company: "Altavista GmbH", assignee: "Layla Hassan", status: "resolved", priority: "low", channel: "web", category: "Onboarding", created: "Jan 21, 16:42", updated: "Yesterday", replies: 8, firstResponseMins: 3, csat: 5 },
  { id: "TKT-4817", subject: "Webhook signature verification failing", requester: "Rafael Costa", requesterEmail: "rafael.costa@meridian.br", company: "Meridian SA", assignee: "Daniel Chen", status: "resolved", priority: "high", channel: "email", category: "API", created: "Jan 21, 14:08", updated: "Yesterday", replies: 11, firstResponseMins: 6, csat: 5 },
  { id: "TKT-4816", subject: "Mobile app crashes on iOS 17.3 login", requester: "Ingrid Solberg", requesterEmail: "ingrid.solberg@fjordtech.no", company: "Fjord Tech", assignee: "Sofia Mendes", status: "in-progress", priority: "urgent", channel: "phone", category: "Mobile", created: "Jan 21, 11:22", updated: "Yesterday", replies: 9, firstResponseMins: 2, csat: undefined },
  { id: "TKT-4815", subject: "Audit log export — missing fields", requester: "Yuki Tanaka", requesterEmail: "yuki.tanaka@heliospro.io", company: "Helios Pro", assignee: "Liam Walsh", status: "open", priority: "medium", channel: "web", category: "Compliance", created: "Jan 21, 09:50", updated: "Yesterday", replies: 1, firstResponseMins: 14, csat: undefined },
  { id: "TKT-4814", subject: "Workspace rename — old name persists in URLs", requester: "Grace Okoro", requesterEmail: "grace.okoro@northwind.io", company: "Northwind Labs", assignee: "Layla Hassan", status: "closed", priority: "low", channel: "chat", category: "Workspace", created: "Jan 20, 17:14", updated: "2 days ago", replies: 5, firstResponseMins: 7, csat: 4 },
  { id: "TKT-4813", subject: "SCIM deactivation not cascading to sub-apps", requester: "Daniel Chen", requesterEmail: "daniel.chen@heliospro.io", company: "Helios Pro", assignee: "Daniel Chen", status: "resolved", priority: "high", channel: "email", category: "Authentication", created: "Jan 20, 13:30", updated: "2 days ago", replies: 14, firstResponseMins: 1, csat: 5 },
  { id: "TKT-4812", subject: "Pricing page broken on Safari 17", requester: "Emma Reyes", requesterEmail: "emma.reyes@heliospro.io", company: "Helios Pro", assignee: "Sofia Mendes", status: "closed", priority: "medium", channel: "web", category: "Website", created: "Jan 20, 10:18", updated: "2 days ago", replies: 6, firstResponseMins: 4, csat: 5 },
  { id: "TKT-4811", subject: "Need invoice copy for FY2024 reconciliation", requester: "Henrik Vogel", requesterEmail: "henrik.vogel@altavista.de", company: "Altavista GmbH", assignee: "Priya Patel", status: "resolved", priority: "low", channel: "email", category: "Billing", created: "Jan 19, 15:55", updated: "3 days ago", replies: 3, firstResponseMins: 22, csat: 5 },
  { id: "TKT-4810", subject: "Dashboard widget — KPI tile stuck loading", requester: "Tobias Frank", requesterEmail: "tobias.frank@quantix.co", company: "Quantix", assignee: "Liam Walsh", status: "closed", priority: "medium", channel: "chat", category: "UI", created: "Jan 19, 11:02", updated: "3 days ago", replies: 7, firstResponseMins: 5, csat: 4 },
];

export const ticketStatusTone: Record<TicketStatus, "info" | "accent" | "violet" | "success" | "neutral"> = {
  open: "info",
  "in-progress": "accent",
  waiting: "violet",
  resolved: "success",
  closed: "neutral",
};

export const ticketPriorityTone: Record<TicketPriority, "neutral" | "info" | "accent" | "danger"> = {
  low: "neutral",
  medium: "info",
  high: "accent",
  urgent: "danger",
};

export const ticketThread = {
  id: "TKT-4821",
  subject: "SSO with Okta — user attributes not mapping",
  requester: "Grace Okoro",
  requesterEmail: "grace.okoro@northwind.io",
  company: "Northwind Labs",
  assignee: "Daniel Chen",
  status: "in-progress" as TicketStatus,
  priority: "high" as TicketPriority,
  channel: "email" as const,
  category: "Authentication",
  created: "Jan 22, 09:14",
  updated: "12 min ago",
  replies: [
    { id: "r1", author: "Grace Okoro", role: "Requester", initials: "GO", time: "Jan 22, 09:14", body: "We just enabled SSO with Okta. Login works but the role attribute from Okta isn't being applied — every user lands as 'member' even though the Okta profile says 'admin'. Tried re-provisioning a few users, no luck." },
    { id: "r2", author: "Layla Hassan", role: "Support", initials: "LH", time: "Jan 22, 09:22", body: "Hi Grace — thanks for reaching out. Sounds like an attribute mapping issue. Can you share the SAML response (with sensitive bits redacted) and the exact Okta attribute name you're sending for role? I'll loop in our SSO engineer." },
    { id: "r3", author: "Grace Okoro", role: "Requester", initials: "GO", time: "Jan 22, 09:35", body: "Attribute is 'helios_role'. Pasting the SAML response below — note the AttributeStatement only includes email and name, not helios_role. Maybe Okta isn't sending it?" },
    { id: "r4", author: "Daniel Chen", role: "Engineer", initials: "DC", time: "Jan 22, 09:48", body: "Confirmed — Okta isn't releasing helios_role. In your Okta app config, go to SAML 2.0 → Attribute Statements and add: Name=helios_role, Value=user.role. Then re-provision affected users. I'll also push a hotfix on our side to make the error message clearer when the attribute is missing." },
    { id: "r5", author: "Grace Okoro", role: "Requester", initials: "GO", time: "Jan 22, 10:14", body: "That was it — added the attribute statement and users are now provisioning with the correct role. Thank you both!" },
    { id: "r6", author: "Daniel Chen", role: "Engineer", initials: "DC", time: "Jan 22, 10:31", body: "Great. I'll keep this open until the clearer-error hotfix ships (target: today). Will close once it's deployed." },
  ] as { id: string; author: string; role: string; initials: string; time: string; body: string }[],
};
