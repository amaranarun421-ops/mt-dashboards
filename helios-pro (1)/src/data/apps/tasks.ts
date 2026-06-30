export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type Subtask = {
  id: string;
  title: string;
  done: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: TaskPriority;
  assignee: string;
  due: string;
  project: string;
  tags: string[];
  subtasks: Subtask[];
  starred?: boolean;
};

export const tasks: Task[] = [
  {
    id: "T-501",
    title: "Migrate billing to Stripe v3",
    description: "Customer sync done. Subscription sync in progress. Webhook handlers next.",
    status: "in-progress",
    priority: "high",
    assignee: "Aarav Sharma",
    due: "Jan 24",
    project: "Billing v3",
    tags: ["backend", "billing"],
    starred: true,
    subtasks: [
      { id: "s1", title: "Customer sync", done: true },
      { id: "s2", title: "Subscription sync", done: false },
      { id: "s3", title: "Webhook handlers", done: false },
      { id: "s4", title: "Backfill historical invoices", done: false },
    ],
  },
  {
    id: "T-502",
    title: "Mobile onboarding redesign",
    description: "Consolidate from 7 screens to 4. New progress indicator.",
    status: "in-progress",
    priority: "urgent",
    assignee: "Sofia Mendes",
    due: "Jan 22",
    project: "Mobile",
    tags: ["design", "mobile"],
    subtasks: [
      { id: "s1", title: "Audit current flow", done: true },
      { id: "s2", title: "New screen list", done: true },
      { id: "s3", title: "Figma v3", done: true },
      { id: "s4", title: "Prototype review", done: false },
      { id: "s5", title: "Engineering handoff", done: false },
    ],
  },
  {
    id: "T-503",
    title: "Q1 security audit",
    description: "First-pass findings. Two medium, one low. Review with platform team.",
    status: "in-progress",
    priority: "high",
    assignee: "Yuki Tanaka",
    due: "Jan 28",
    project: "Security",
    tags: ["security", "audit"],
    starred: true,
    subtasks: [
      { id: "s1", title: "API gateway scan", done: true },
      { id: "s2", title: "Worker pool scan", done: true },
      { id: "s3", title: "Findings draft", done: true },
      { id: "s4", title: "Platform team review", done: false },
    ],
  },
  {
    id: "T-504",
    title: "Marketing site v4 launch",
    description: "Soft launch homepage + pricing Monday. Rest of pages Wednesday.",
    status: "todo",
    priority: "medium",
    assignee: "Emma Reyes",
    due: "Jan 30",
    project: "Marketing",
    tags: ["marketing", "website"],
    subtasks: [
      { id: "s1", title: "Homepage + pricing staged", done: true },
      { id: "s2", title: "Analytics + GTM", done: true },
      { id: "s3", title: "Posthog events", done: true },
      { id: "s4", title: "Soft launch", done: false },
      { id: "s5", title: "Redirect map review", done: false },
    ],
  },
  {
    id: "T-505",
    title: "Customer analytics v2",
    description: "New event taxonomy + retention dashboard.",
    status: "todo",
    priority: "medium",
    assignee: "Liam Walsh",
    due: "Feb 06",
    project: "Analytics",
    tags: ["data"],
    subtasks: [
      { id: "s1", title: "Event taxonomy doc", done: true },
      { id: "s2", title: "Pipeline refactor", done: false },
      { id: "s3", title: "Retention dashboard", done: false },
    ],
  },
  {
    id: "T-506",
    title: "AI inference cost refactor",
    description: "Stale capacity hint caused a 38% spike. Refresh every 30s.",
    status: "todo",
    priority: "low",
    assignee: "Marcus Bell",
    due: "Feb 12",
    project: "AI Platform",
    tags: ["ai", "cost"],
    subtasks: [
      { id: "s1", title: "Capacity hint refresh interval", done: false },
      { id: "s2", title: "Routing logic tests", done: false },
      { id: "s3", title: "Cost dashboard alerting", done: false },
    ],
  },
  {
    id: "T-507",
    title: "SSO + SCIM provisioning",
    description: "Staging verified. Prod cutover during 02:00 UTC window.",
    status: "done",
    priority: "high",
    assignee: "Daniel Chen",
    due: "Jan 18",
    project: "Auth",
    tags: ["security", "auth"],
    subtasks: [
      { id: "s1", title: "Staging verification", done: true },
      { id: "s2", title: "Prod cutover", done: true },
      { id: "s3", title: "On-call runbook", done: true },
    ],
  },
  {
    id: "T-508",
    title: "Help center search",
    description: "Zero-result rate down from 31% to 4%. Next: feedback loop.",
    status: "done",
    priority: "low",
    assignee: "Layla Hassan",
    due: "Jan 16",
    project: "Support",
    tags: ["support", "search"],
    subtasks: [
      { id: "s1", title: "Index rebuild", done: true },
      { id: "s2", title: "Search UI", done: true },
      { id: "s3", title: "Analytics tracking", done: true },
    ],
  },
  {
    id: "T-509",
    title: "Audit log retention extension",
    description: "1-yr extended retention for enterprise tier.",
    status: "todo",
    priority: "medium",
    assignee: "Liam Walsh",
    due: "Feb 03",
    project: "Compliance",
    tags: ["compliance", "data"],
    subtasks: [
      { id: "s1", title: "Storage cost analysis", done: true },
      { id: "s2", title: "Tier-gating logic", done: false },
      { id: "s3", title: "Customer comms", done: false },
    ],
  },
];
