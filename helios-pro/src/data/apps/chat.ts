export type ChatContact = {
  id: string;
  name: string;
  role: string;
  status: "online" | "away" | "busy" | "offline";
  lastMessage: string;
  time: string;
  unread?: number;
  pinned?: boolean;
};

export type ChatMessage = {
  id: string;
  from: string;
  text: string;
  time: string;
  mine?: boolean;
  attachment?: { name: string; size: string };
};

export const chatContacts: ChatContact[] = [
  { id: "u1", name: "Priya Patel", role: "VP Engineering", status: "online", lastMessage: "Pushed v2 — please re-review by noon", time: "10:45", unread: 2, pinned: true },
  { id: "u2", name: "Daniel Chen", role: "Security Lead", status: "online", lastMessage: "Hotfix is rolling out, ETA 20 min", time: "10:31", unread: 1, pinned: true },
  { id: "u3", name: "Sofia Mendes", role: "Product Designer", status: "busy", lastMessage: "Figma v3 is ready for review", time: "10:14" },
  { id: "u4", name: "Marcus Bell", role: "AI Platform Lead", status: "away", lastMessage: "Cost spike root-caused, hotfix in flight", time: "09:52" },
  { id: "u5", name: "Aarav Sharma", role: "Staff Engineer", status: "online", lastMessage: "Customer sync done, subscription sync at 80%", time: "09:30" },
  { id: "u6", name: "Emma Reyes", role: "Marketing Manager", status: "online", lastMessage: "GTM is wired, analytics queued", time: "Yesterday" },
  { id: "u7", name: "Liam Walsh", role: "Data Analyst", lastMessage: "Sent the pricing experiment writeup", status: "offline", time: "Yesterday" },
  { id: "u8", name: "Yuki Tanaka", role: "Security Engineer", status: "away", lastMessage: "Audit findings doc attached", time: "Yesterday" },
  { id: "u9", name: "Layla Hassan", role: "Support Engineer", status: "online", lastMessage: "Zero-result rate down to 4%", time: "2 days ago" },
  { id: "u10", name: "Noah Kim", role: "People Ops", status: "offline", lastMessage: "Offsite venue shortlist is in the doc", time: "2 days ago" },
];

export const chatMessages: ChatMessage[] = [
  { id: "m1", from: "Priya Patel", text: "Morning! Pushed the v2 of the Q1 roadmap — moved SSO to week 2 like we discussed.", time: "09:42" },
  { id: "m2", from: "Priya Patel", text: "Also pulled the AI refactor to Q2 and added the customer analytics milestone back.", time: "09:43" },
  { id: "m3", from: "Me", text: "Perfect. Skimming now. The engineering hours on tab 2 look right?", time: "09:51", mine: true },
  { id: "m4", from: "Priya Patel", text: "Yes — Aarav rebalanced them yesterday. Stripe v3 stays at 6 person-weeks, SSO drops to 3 since staging is already verified.", time: "09:53", attachment: { name: "q1-roadmap-v2.xlsx", size: "118 KB" } },
  { id: "m5", from: "Me", text: "Got it. One more thing — can we add a row for the audit-log retention extension? Liam flagged it last week.", time: "10:02", mine: true },
  { id: "m6", from: "Priya Patel", text: "Good catch. Added it as a separate workstream (3 person-weeks, owner Liam). Pushed v2.1 just now.", time: "10:14" },
  { id: "m7", from: "Priya Patel", text: "Please re-review by noon so I can lock it before the leadership sync.", time: "10:45" },
];

export const chatChannels = [
  { id: "ch1", name: "engineering", unread: 4, tone: "primary" as const },
  { id: "ch2", name: "design", unread: 0, tone: "violet" as const },
  { id: "ch3", name: "marketing", unread: 12, tone: "accent" as const },
  { id: "ch4", name: "support", unread: 2, tone: "rose" as const },
  { id: "ch5", name: "random", unread: 0, tone: "info" as const },
];

export const chatSharedFiles = [
  { id: "sf1", name: "q1-roadmap-v2.xlsx", size: "118 KB", from: "Priya Patel", time: "10:14" },
  { id: "sf2", name: "audit-findings-q1.pdf", size: "640 KB", from: "Yuki Tanaka", time: "Yesterday" },
  { id: "sf3", name: "onboarding-v3.fig", size: "4.2 MB", from: "Sofia Mendes", time: "Yesterday" },
  { id: "sf4", name: "ai-cost-breakdown.xlsx", size: "212 KB", from: "Marcus Bell", time: "2 days ago" },
];
