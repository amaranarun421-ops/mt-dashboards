import type { AuditEvent, ApiKey, Session, TeamMember } from "@/types";

export const auditEvents: AuditEvent[] = [
  { id: "ae-1", actor: "Maya Okafor", action: "deal.update", resource: "Deal", resourceId: "deal-1", ip: "82.14.220.10", timestamp: "2026-06-30T14:32:11Z", severity: "info", metadata: { field: "stage", from: "qualification", to: "proposal" } },
  { id: "ae-2", actor: "system", action: "auth.login", resource: "Session", resourceId: "sess-2", ip: "82.14.220.10", timestamp: "2026-06-30T14:28:02Z", severity: "info", metadata: { method: "password", mfa: "true" } },
  { id: "ae-3", actor: "Lucas Andrade", action: "export.csv", resource: "Account", resourceId: "acc-8", ip: "190.244.12.88", timestamp: "2026-06-30T13:14:50Z", severity: "low", metadata: { rows: "12" } },
  { id: "ae-4", actor: "system", action: "alert.threshold", resource: "ApiKey", resourceId: "key-2", ip: "10.0.4.20", timestamp: "2026-06-30T12:48:21Z", severity: "medium", metadata: { threshold: "1000/hour", current: "1248" } },
  { id: "ae-5", actor: "Sofia Castellano", action: "user.invite", resource: "TeamMember", resourceId: "tm-9", ip: "98.34.156.71", timestamp: "2026-06-30T11:22:08Z", severity: "info", metadata: { email: "noemi.adeyemi@lumenhealth.com", role: "viewer" } },
  { id: "ae-6", actor: "unknown", action: "auth.failed", resource: "Session", resourceId: "sess-x", ip: "203.0.113.42", timestamp: "2026-06-30T10:18:44Z", severity: "high", metadata: { attempts: "5", locked: "true" } },
  { id: "ae-7", actor: "Maya Okafor", action: "apikey.revoke", resource: "ApiKey", resourceId: "key-3", ip: "82.14.220.10", timestamp: "2026-06-30T09:50:12Z", severity: "medium", metadata: { name: "legacy-ci-bot" } },
  { id: "ae-8", actor: "system", action: "backup.success", resource: "System", resourceId: "sys", ip: "10.0.0.1", timestamp: "2026-06-30T03:00:00Z", severity: "info", metadata: { size: "4.2GB", duration: "184s" } },
  { id: "ae-9", actor: "Priya Venkataraman", action: "lead.create", resource: "Lead", resourceId: "lead-1", ip: "110.227.124.16", timestamp: "2026-06-29T22:14:00Z", severity: "info", metadata: { source: "inbound" } },
  { id: "ae-10", actor: "system", action: "integration.sync", resource: "Integration", resourceId: "int-slack", ip: "10.0.4.21", timestamp: "2026-06-29T18:00:00Z", severity: "low", metadata: { records: "42", status: "ok" } },
  { id: "ae-11", actor: "Hannah Whitfield", action: "settings.update", resource: "Workspace", resourceId: "ws-1", ip: "76.18.220.34", timestamp: "2026-06-29T16:42:30Z", severity: "low", metadata: { field: "default_currency", to: "USD" } },
  { id: "ae-12", actor: "unknown", action: "auth.failed", resource: "Session", resourceId: "sess-y", ip: "198.51.100.7", timestamp: "2026-06-29T14:18:22Z", severity: "critical", metadata: { attempts: "12", pattern: "credential_stuffing" } },
];

export const apiKeys: ApiKey[] = [
  { id: "key-1", name: "Production Webhook", prefix: "nx_live_8f3a", scopes: ["read:orders", "write:orders", "read:customers"], createdAt: "2026-04-12T10:00:00Z", lastUsed: "2026-06-30T14:18:00Z", createdBy: "Maya Okafor", status: "active", usageCount: 184_220 },
  { id: "key-2", name: "BI Dashboard Reader", prefix: "nx_live_2c91", scopes: ["read:dashboard", "read:metrics"], createdAt: "2026-05-02T08:00:00Z", lastUsed: "2026-06-30T12:48:21Z", createdBy: "system", status: "active", usageCount: 1_248_440 },
  { id: "key-3", name: "Legacy CI Bot", prefix: "nx_live_a7d2", scopes: [], createdAt: "2025-11-18T16:00:00Z", lastUsed: "2026-06-15T22:00:00Z", createdBy: "Tobias Krüger", status: "revoked", usageCount: 8_820 },
  { id: "key-4", name: "Mobile App API", prefix: "nx_live_b4e8", scopes: ["read:orders", "write:cart", "read:profile"], createdAt: "2026-02-22T12:00:00Z", lastUsed: "2026-06-30T13:55:12Z", createdBy: "Sofia Castellano", status: "active", usageCount: 924_180 },
  { id: "key-5", name: "Slack Notifier", prefix: "nx_live_91f0", scopes: ["read:alerts"], createdAt: "2026-06-01T09:00:00Z", lastUsed: "2026-06-30T13:00:00Z", createdBy: "system", status: "active", usageCount: 12_840 },
];

export const sessions: Session[] = [
  { id: "sess-1", device: "MacBook Pro 16\"", os: "macOS 14.5", browser: "Chrome 126", ip: "82.14.220.10", location: "San Francisco, US", lastActive: "2026-06-30T14:30:00Z", current: true, trusted: true },
  { id: "sess-2", device: "iPhone 15 Pro", os: "iOS 17.5", browser: "Safari 17", ip: "82.14.220.10", location: "San Francisco, US", lastActive: "2026-06-29T19:42:00Z", current: false, trusted: true },
  { id: "sess-3", device: "Windows PC", os: "Windows 11", browser: "Edge 126", ip: "190.244.12.88", location: "Bogotá, CO", lastActive: "2026-06-28T11:14:00Z", current: false, trusted: false },
  { id: "sess-4", device: "iPad Pro 12.9", os: "iPadOS 17.5", browser: "Safari 17", ip: "76.18.220.34", location: "New York, US", lastActive: "2026-06-27T08:22:00Z", current: false, trusted: true },
  { id: "sess-5", device: "Unknown (Linux)", os: "Unknown", browser: "Firefox 127", ip: "203.0.113.42", location: "Unknown", lastActive: "2026-06-30T10:18:44Z", current: false, trusted: false },
];

export const teamMembers: TeamMember[] = [
  { id: "tm-1", name: "Maya Okafor", email: "maya.okafor@nexuspro.app", role: "Owner", status: "active", lastActive: "2026-06-30T14:32:00Z", initials: "MO" },
  { id: "tm-2", name: "Daniel Sørensen", email: "daniel.sorensen@nexuspro.app", role: "Admin", status: "active", lastActive: "2026-06-30T13:14:00Z", initials: "DS" },
  { id: "tm-3", name: "Sofia Castellano", email: "sofia.c@nexuspro.app", role: "Admin", status: "active", lastActive: "2026-06-30T11:22:00Z", initials: "SC" },
  { id: "tm-4", name: "Priya Venkataraman", email: "priya.v@nexuspro.app", role: "Editor", status: "active", lastActive: "2026-06-29T22:14:00Z", initials: "PV" },
  { id: "tm-5", name: "Lucas Andrade", email: "lucas.andrade@nexuspro.app", role: "Editor", status: "active", lastActive: "2026-06-30T13:14:00Z", initials: "LA" },
  { id: "tm-6", name: "Hannah Whitfield", email: "hannah.w@nexuspro.app", role: "Editor", status: "active", lastActive: "2026-06-29T16:42:00Z", initials: "HW" },
  { id: "tm-7", name: "Tobias Krüger", email: "tobias.kruger@nexuspro.app", role: "Editor", status: "active", lastActive: "2026-06-29T15:30:00Z", initials: "TK" },
  { id: "tm-8", name: "Rashid Al-Mansouri", email: "rashid.am@nexuspro.app", role: "Editor", status: "active", lastActive: "2026-06-30T07:45:00Z", initials: "RA" },
  { id: "tm-9", name: "Naomi Adeyemi", email: "naomi.a@lumenhealth.com", role: "Viewer", status: "invited", lastActive: "2026-06-30T11:22:08Z", initials: "NA" },
];

export const roleMatrix = [
  { resource: "Deals", owner: ["read", "write", "delete"], admin: ["read", "write", "delete"], editor: ["read", "write"], viewer: ["read"] },
  { resource: "Accounts", owner: ["read", "write", "delete"], admin: ["read", "write", "delete"], editor: ["read", "write"], viewer: ["read"] },
  { resource: "Reports", owner: ["read", "write", "delete", "export"], admin: ["read", "write", "export"], editor: ["read", "export"], viewer: ["read"] },
  { resource: "Team", owner: ["read", "write", "delete", "invite"], admin: ["read", "write", "invite"], editor: ["read"], viewer: ["read"] },
  { resource: "Billing", owner: ["read", "write"], admin: ["read"], editor: [], viewer: [] },
  { resource: "API Keys", owner: ["read", "write", "revoke"], admin: ["read", "write", "revoke"], editor: [], viewer: [] },
  { resource: "Audit Logs", owner: ["read", "export"], admin: ["read", "export"], editor: ["read"], viewer: [] },
  { resource: "Settings", owner: ["read", "write"], admin: ["read", "write"], editor: ["read"], viewer: ["read"] },
];
