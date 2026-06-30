export type Project = {
  id: string;
  name: string;
  client: string;
  owner: string;
  team: string[];
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Planning" | "In Progress" | "On Hold" | "Review" | "Completed" | "Cancelled";
  progress: number; // 0-100
  budget: number;
  spent: number;
  startDate: string; // ISO date
  dueDate: string; // ISO date
  tasksDone: number;
  tasksTotal: number;
  tags: string[];
};

export const projects: Project[] = [
  { id: "PRJ-01", name: "Atlas Migration", client: "Helios Internal", owner: "Aarav Sharma", team: ["Aarav Sharma", "Priya Nair", "Yuki Tanaka"], priority: "Critical", status: "In Progress", progress: 62, budget: 120000, spent: 74000, startDate: "2024-06-01", dueDate: "2024-12-15", tasksDone: 18, tasksTotal: 29, tags: ["infra", "backend"] },
  { id: "PRJ-02", name: "Helios Mobile App", client: "Helios Pro", owner: "Priya Nair", team: ["Priya Nair", "Mei Chen", "Ravi Patel"], priority: "High", status: "In Progress", progress: 48, budget: 88000, spent: 41000, startDate: "2024-07-10", dueDate: "2025-01-20", tasksDone: 24, tasksTotal: 50, tags: ["mobile", "react-native"] },
  { id: "PRJ-03", name: "Brand Refresh 2025", client: "Marketing", owner: "Sofia Rossi", team: ["Sofia Rossi", "Liam O'Brien", "Hana Park"], priority: "Medium", status: "Review", progress: 88, budget: 45000, spent: 39000, startDate: "2024-05-22", dueDate: "2024-10-30", tasksDone: 32, tasksTotal: 36, tags: ["design", "brand"] },
  { id: "PRJ-04", name: "Payments Revamp", client: "Finance", owner: "Daniel Carter", team: ["Daniel Carter", "Layla Haddad", "Omar Hassan"], priority: "Critical", status: "In Progress", progress: 35, budget: 200000, spent: 71000, startDate: "2024-08-01", dueDate: "2025-02-28", tasksDone: 14, tasksTotal: 42, tags: ["payments", "compliance"] },
  { id: "PRJ-05", name: "AI Insights Engine", client: "Helios Labs", owner: "Yuki Tanaka", team: ["Yuki Tanaka", "Marcus Lee", "Nadia Ivanova"], priority: "High", status: "Planning", progress: 12, budget: 320000, spent: 28000, startDate: "2024-09-15", dueDate: "2025-06-30", tasksDone: 5, tasksTotal: 40, tags: ["ai", "ml"] },
  { id: "PRJ-06", name: "Support Help Center", client: "Support", owner: "Marcus Lee", team: ["Marcus Lee", "Tobias Frank"], priority: "Low", status: "On Hold", progress: 22, budget: 22000, spent: 6000, startDate: "2024-06-15", dueDate: "2024-12-01", tasksDone: 4, tasksTotal: 18, tags: ["docs", "support"] },
  { id: "PRJ-07", name: "LATAM Expansion", client: "Sales", owner: "Emma Müller", team: ["Emma Müller", "Rafael Costa", "Isabela Souza"], priority: "High", status: "In Progress", progress: 54, budget: 150000, spent: 81000, startDate: "2024-04-20", dueDate: "2024-11-30", tasksDone: 22, tasksTotal: 40, tags: ["sales", "go-to-market"] },
  { id: "PRJ-08", name: "Customer NPS Survey", client: "Product", owner: "Grace Bennett", team: ["Grace Bennett", "Olivia Adams"], priority: "Medium", status: "Completed", progress: 100, budget: 18000, spent: 16400, startDate: "2024-05-01", dueDate: "2024-08-15", tasksDone: 12, tasksTotal: 12, tags: ["research", "survey"] },
  { id: "PRJ-09", name: "DevOps Pipeline", client: "Engineering", owner: "Omar Hassan", team: ["Omar Hassan", "Henrik Larsen", "Mateo Garcia"], priority: "High", status: "In Progress", progress: 71, budget: 95000, spent: 68000, startDate: "2024-07-01", dueDate: "2024-12-10", tasksDone: 20, tasksTotal: 28, tags: ["devops", "ci"] },
  { id: "PRJ-10", name: "EU Compliance Sprint", client: "Legal", owner: "Layla Haddad", team: ["Layla Haddad", "Ingrid Nilsen"], priority: "Critical", status: "Review", progress: 92, budget: 65000, spent: 58000, startDate: "2024-06-10", dueDate: "2024-10-15", tasksDone: 22, tasksTotal: 24, tags: ["compliance", "gdpr"] },
  { id: "PRJ-11", name: "Marketing Site v3", client: "Marketing", owner: "Liam O'Brien", team: ["Liam O'Brien", "Chloe Martin", "Hana Park"], priority: "Medium", status: "In Progress", progress: 41, budget: 52000, spent: 21000, startDate: "2024-08-15", dueDate: "2025-01-05", tasksDone: 13, tasksTotal: 32, tags: ["marketing", "web"] },
  { id: "PRJ-12", name: "Mobile Auth Rebuild", client: "Engineering", owner: "Priya Nair", team: ["Priya Nair", "Ravi Patel"], priority: "High", status: "Completed", progress: 100, budget: 38000, spent: 34200, startDate: "2024-05-20", dueDate: "2024-09-01", tasksDone: 18, tasksTotal: 18, tags: ["mobile", "auth"] },
  { id: "PRJ-13", name: "APAC Localization", client: "Product", owner: "Hana Park", team: ["Hana Park", "Yuki Tanaka"], priority: "Medium", status: "Planning", progress: 8, budget: 44000, spent: 4200, startDate: "2024-09-20", dueDate: "2025-03-15", tasksDone: 2, tasksTotal: 26, tags: ["i18n", "localization"] },
  { id: "PRJ-14", name: "Q4 Holiday Campaign", client: "Marketing", owner: "Emma Müller", team: ["Emma Müller", "Liam O'Brien", "Chloe Martin"], priority: "High", status: "In Progress", progress: 58, budget: 120000, spent: 67000, startDate: "2024-08-01", dueDate: "2024-12-20", tasksDone: 17, tasksTotal: 30, tags: ["campaign", "holiday"] },
  { id: "PRJ-15", name: "Internal Tools Refresh", client: "Operations", owner: "Amara Okafor", team: ["Amara Okafor", "Mateo Garcia", "Zara Khan"], priority: "Low", status: "On Hold", progress: 18, budget: 28000, spent: 4900, startDate: "2024-06-25", dueDate: "2025-02-01", tasksDone: 3, tasksTotal: 22, tags: ["internal", "tools"] },
  { id: "PRJ-16", name: "Data Warehouse Move", client: "Engineering", owner: "Henrik Larsen", team: ["Henrik Larsen", "Omar Hassan"], priority: "Critical", status: "In Progress", progress: 46, budget: 210000, spent: 98000, startDate: "2024-07-22", dueDate: "2025-01-31", tasksDone: 16, tasksTotal: 35, tags: ["data", "warehouse"] },
  { id: "PRJ-17", name: "Partner API v2", client: "Engineering", owner: "Mateo Garcia", team: ["Mateo Garcia", "Ravi Patel"], priority: "High", status: "Review", progress: 84, budget: 76000, spent: 63000, startDate: "2024-06-12", dueDate: "2024-10-25", tasksDone: 26, tasksTotal: 31, tags: ["api", "partners"] },
  { id: "PRJ-18", name: "CRM Cleanup", client: "Sales", owner: "Ingrid Nilsen", team: ["Ingrid Nilsen", "Ethan Wright"], priority: "Low", status: "Cancelled", progress: 14, budget: 15000, spent: 2100, startDate: "2024-08-05", dueDate: "2024-11-10", tasksDone: 2, tasksTotal: 14, tags: ["crm", "cleanup"] },
];

export const projectStatuses = ["Planning", "In Progress", "On Hold", "Review", "Completed", "Cancelled"] as const;
export const projectPriorities = ["Low", "Medium", "High", "Critical"] as const;

export type ProjectStatus = typeof projectStatuses[number];
export type ProjectPriority = typeof projectPriorities[number];
