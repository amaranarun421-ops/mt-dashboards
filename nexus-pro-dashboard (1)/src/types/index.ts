/**
 * Nexus Pro — Shared domain types
 * Single source of truth for cross-feature types. Feature-specific types
 * live alongside their feature modules.
 */

// ============ Common ============
export type ID = string;
export type ISODate = string; // ISO 8601 string

export type Trend = "up" | "down" | "flat";

export interface KpiPoint {
  label: string;
  value: number;
  delta?: number; // percentage change vs previous period
  trend?: Trend;
}

export interface TimeSeriesPoint {
  /** ISO date or short label like "Mon", "W1", "Jan" */
  name: string;
  [series: string]: string | number;
}

// ============ Ecommerce ============
export type OrderStatus = "delivered" | "pending" | "canceled" | "refunded" | "shipped";
export type PaymentStatus = "paid" | "pending" | "failed" | "refunded";

export interface Product {
  id: ID;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  variants: number;
  status: "active" | "draft" | "archived";
  rating: number;
  unitsSold: number;
  image?: string;
}

export interface Order {
  id: ID;
  number: string;
  customer: string;
  customerEmail: string;
  date: ISODate;
  total: number;
  items: number;
  status: OrderStatus;
  payment: PaymentStatus;
  channel: "web" | "mobile" | "pos" | "marketplace";
}

export interface Customer {
  id: ID;
  name: string;
  email: string;
  location: string;
  orders: number;
  totalSpent: number;
  avgOrderValue: number;
  lastOrderAt: ISODate;
  segment: "vip" | "regular" | "new" | "at-risk";
}

// ============ Sales / CRM ============
export type DealStage =
  | "prospecting"
  | "qualification"
  | "proposal"
  | "negotiation"
  | "closed-won"
  | "closed-lost";

export interface Deal {
  id: ID;
  title: string;
  account: string;
  contact: string;
  owner: string;
  value: number;
  weightedValue: number;
  stage: DealStage;
  probability: number; // 0..1
  expectedClose: ISODate;
  created: ISODate;
  age: number; // days
  riskScore: number; // 0..100, higher = riskier
  nextStep: string;
  competitors?: string[];
}

export interface Lead {
  id: ID;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: "inbound" | "outbound" | "referral" | "event" | "partner";
  status: "new" | "contacted" | "qualified" | "unqualified" | "converted";
  score: number; // 0..100
  owner: string;
  created: ISODate;
  lastActivity: ISODate;
  estimatedValue: number;
}

export interface Account {
  id: ID;
  name: string;
  industry: string;
  website: string;
  employees: number;
  annualRevenue: number;
  tier: "enterprise" | "mid-market" | "smb";
  region: string;
  owner: string;
  openDeals: number;
  totalPipeline: number;
  lastActivity: ISODate;
  health: "green" | "yellow" | "red";
}

export interface Contact {
  id: ID;
  name: string;
  email: string;
  phone: string;
  title: string;
  accountId: ID;
  accountName: string;
  owner: string;
  lastContacted: ISODate;
}

export interface SalesRep {
  id: ID;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  team: string;
  region: string;
  quota: number;
  attained: number;
  deals: number;
  winRate: number;
  pipeline: number;
  attainmentRate: number; // 0..1
}

export interface PipelineStage {
  id: DealStage;
  label: string;
  count: number;
  value: number;
  weightedValue: number;
  conversionRate: number; // 0..1
  avgDaysInStage: number;
}

export interface Activity {
  id: ID;
  type: "call" | "email" | "meeting" | "task" | "note" | "deal";
  title: string;
  description: string;
  actor: string;
  relatedTo?: string;
  timestamp: ISODate;
  outcome?: "positive" | "neutral" | "negative";
}

// ============ Finance ============
export interface Invoice {
  id: ID;
  number: string;
  customer: string;
  issued: ISODate;
  due: ISODate;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue" | "void";
  currency: string;
}

export interface Transaction {
  id: ID;
  reference: string;
  date: ISODate;
  description: string;
  account: string;
  type: "debit" | "credit";
  amount: number;
  category: string;
  status: "posted" | "pending" | "reconciled";
}

// ============ Projects ============
export type TaskStatus = "todo" | "in-progress" | "review" | "done" | "blocked";
export type Priority = "low" | "medium" | "high" | "urgent";

export interface Project {
  id: ID;
  name: string;
  code: string;
  client: string;
  status: "on-track" | "at-risk" | "delayed" | "completed";
  progress: number; // 0..100
  start: ISODate;
  due: ISODate;
  budget: number;
  spent: number;
  lead: string;
  team: string[];
  tasksDone: number;
  tasksTotal: number;
}

export interface Task {
  id: ID;
  title: string;
  projectId: ID;
  projectName: string;
  assignee: string;
  status: TaskStatus;
  priority: Priority;
  due: ISODate;
  estimate: number; // hours
  logged: number; // hours
  tags: string[];
}

// ============ HR ============
export interface Employee {
  id: ID;
  name: string;
  email: string;
  title: string;
  department: string;
  manager: string;
  location: string;
  status: "active" | "on-leave" | "remote" | "terminated";
  startDate: ISODate;
  salary: number;
  performance: number; // 0..100
}

// ============ Account/Admin ============
export type AuditSeverity = "info" | "low" | "medium" | "high" | "critical";

export interface AuditEvent {
  id: ID;
  actor: string;
  action: string;
  resource: string;
  resourceId: ID;
  ip: string;
  timestamp: ISODate;
  severity: AuditSeverity;
  metadata?: Record<string, string>;
}

export interface ApiKey {
  id: ID;
  name: string;
  prefix: string;
  scopes: string[];
  createdAt: ISODate;
  lastUsed: ISODate | null;
  createdBy: string;
  status: "active" | "revoked";
  usageCount: number;
}

export interface Session {
  id: ID;
  device: string;
  os: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: ISODate;
  current: boolean;
  trusted: boolean;
}

export interface TeamMember {
  id: ID;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
  lastActive: ISODate;
  avatar?: string;
  initials: string;
}
