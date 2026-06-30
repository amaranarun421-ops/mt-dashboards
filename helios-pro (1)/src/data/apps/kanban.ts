export type KanbanColumnKey = "backlog" | "in-progress" | "review" | "done";

export type KanbanCard = {
  id: string;
  title: string;
  column: KanbanColumnKey;
  priority: "low" | "medium" | "high" | "urgent";
  tags: string[];
  assignees: string[];
  due: string;
  progress: number;
  comments: number;
  attachments: number;
  cover?: "amber" | "emerald" | "violet" | "sky" | "rose" | "slate";
};

export const kanbanCards: KanbanCard[] = [
  { id: "K-101", title: "Customer analytics v2 — retention dashboard", column: "backlog", priority: "medium", tags: ["data", "analytics"], assignees: ["Liam Walsh"], due: "Feb 06", progress: 12, comments: 4, attachments: 2, cover: "sky" },
  { id: "K-102", title: "AI inference cost refactor", column: "backlog", priority: "low", tags: ["ai", "cost"], assignees: ["Marcus Bell", "Noah Kim"], due: "Feb 12", progress: 5, comments: 2, attachments: 1, cover: "violet" },
  { id: "K-103", title: "Audit log retention extension", column: "backlog", priority: "medium", tags: ["compliance"], assignees: ["Liam Walsh"], due: "Feb 03", progress: 8, comments: 1, attachments: 0 },
  { id: "K-104", title: "Pricing experiment B rollout", column: "backlog", priority: "low", tags: ["growth"], assignees: ["Emma Reyes"], due: "Feb 10", progress: 0, comments: 3, attachments: 1, cover: "amber" },

  { id: "K-201", title: "Migrate billing to Stripe v3", column: "in-progress", priority: "high", tags: ["billing", "backend"], assignees: ["Aarav Sharma", "Priya Patel"], due: "Jan 24", progress: 62, comments: 18, attachments: 4, cover: "emerald" },
  { id: "K-202", title: "Mobile onboarding redesign", column: "in-progress", priority: "urgent", tags: ["mobile", "design"], assignees: ["Sofia Mendes"], due: "Jan 22", progress: 48, comments: 12, attachments: 7, cover: "rose" },
  { id: "K-203", title: "Q1 security audit — findings review", column: "in-progress", priority: "high", tags: ["security", "audit"], assignees: ["Yuki Tanaka", "Daniel Chen"], due: "Jan 28", progress: 70, comments: 9, attachments: 3 },

  { id: "K-301", title: "Marketing site v4 — soft launch", column: "review", priority: "medium", tags: ["marketing", "website"], assignees: ["Emma Reyes"], due: "Jan 30", progress: 74, comments: 6, attachments: 2, cover: "amber" },
  { id: "K-302", title: "Pricing page A/B test wrap-up", column: "review", priority: "low", tags: ["growth"], assignees: ["Emma Reyes", "Liam Walsh"], due: "Jan 26", progress: 90, comments: 4, attachments: 1 },
  { id: "K-303", title: "API rate limit hotfix", column: "review", priority: "high", tags: ["api", "backend"], assignees: ["Marcus Bell"], due: "Jan 23", progress: 82, comments: 5, attachments: 0 },

  { id: "K-401", title: "SSO + SCIM provisioning", column: "done", priority: "high", tags: ["auth", "security"], assignees: ["Daniel Chen"], due: "Jan 18", progress: 100, comments: 11, attachments: 2, cover: "emerald" },
  { id: "K-402", title: "Help center search", column: "done", priority: "low", tags: ["support", "search"], assignees: ["Layla Hassan"], due: "Jan 16", progress: 100, comments: 6, attachments: 1 },
  { id: "K-403", title: "Workspace rename bugfix", column: "done", priority: "medium", tags: ["bugfix"], assignees: ["Sofia Mendes"], due: "Jan 14", progress: 100, comments: 3, attachments: 0 },
];

export const kanbanColumns: { key: KanbanColumnKey; title: string; tone: "neutral" | "info" | "accent" | "success"; accent: string }[] = [
  { key: "backlog", title: "Backlog", tone: "neutral", accent: "bg-gray-4" },
  { key: "in-progress", title: "In Progress", tone: "info", accent: "bg-blue" },
  { key: "review", title: "Review", tone: "accent", accent: "bg-accent" },
  { key: "done", title: "Done", tone: "success", accent: "bg-primary" },
];
