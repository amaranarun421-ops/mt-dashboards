// Centralized mock data for Nimbus Pro
// All data is fictional and original to this UI kit.

export const USERS = [
  { id: "u1", name: "Aaroh Sharma", email: "aaroh.sharma@nimbuspro.io", role: "Admin", status: "active", plan: "Enterprise", lastActive: "2m ago", joined: "2023-04-12", country: "India", color: "brand" },
  { id: "u2", name: "Mira Patel", email: "mira.p@nimbuspro.io", role: "Editor", status: "active", plan: "Pro", lastActive: "12m ago", joined: "2023-08-22", country: "India", color: "purple" },
  { id: "u3", name: "Leo Romano", email: "leo.r@nimbuspro.io", role: "Viewer", status: "invited", plan: "Free", lastActive: "—", joined: "2024-01-08", country: "Italy", color: "orange" },
  { id: "u4", name: "Yuki Tanaka", email: "yuki.t@nimbuspro.io", role: "Editor", status: "active", plan: "Pro", lastActive: "1h ago", joined: "2023-11-30", country: "Japan", color: "pink" },
  { id: "u5", name: "Sofia García", email: "sofia.g@nimbuspro.io", role: "Admin", status: "active", plan: "Enterprise", lastActive: "3h ago", joined: "2022-06-15", country: "Spain", color: "success" },
  { id: "u6", name: "Marcus Chen", email: "marcus.c@nimbuspro.io", role: "Viewer", status: "suspended", plan: "Free", lastActive: "5d ago", joined: "2024-03-04", country: "Singapore", color: "warning" },
  { id: "u7", name: "Aaliyah Brown", email: "aaliyah.b@nimbuspro.io", role: "Editor", status: "active", plan: "Pro", lastActive: "20m ago", joined: "2023-09-18", country: "USA", color: "error" },
  { id: "u8", name: "Dmitri Volkov", email: "dmitri.v@nimbuspro.io", role: "Viewer", status: "active", plan: "Free", lastActive: "2d ago", joined: "2024-02-11", country: "Russia", color: "brand" },
  { id: "u9", name: "Fatima Al-Rashid", email: "fatima.r@nimbuspro.io", role: "Editor", status: "active", plan: "Pro", lastActive: "45m ago", joined: "2023-12-19", country: "UAE", color: "purple" },
  { id: "u10", name: "Ethan Wright", email: "ethan.w@nimbuspro.io", role: "Admin", status: "active", plan: "Enterprise", lastActive: "8m ago", joined: "2022-09-22", country: "UK", color: "pink" },
  { id: "u11", name: "Priya Iyer", email: "priya.i@nimbuspro.io", role: "Editor", status: "active", plan: "Pro", lastActive: "1m ago", joined: "2023-07-04", country: "India", color: "orange" },
  { id: "u12", name: "Nikolai Petrov", email: "nikolai.p@nimbuspro.io", role: "Viewer", status: "invited", plan: "Free", lastActive: "—", joined: "2024-04-01", country: "Russia", color: "success" },
];

export const PRODUCTS = [
  { id: "p1", name: "Aurora Wireless Headphones", sku: "AUR-WH-001", price: 249, cost: 142, stock: 184, category: "Audio", status: "active", rating: 4.8, reviews: 1240, image: null, color: "brand" },
  { id: "p2", name: "Nimbus Mechanical Keyboard", sku: "NIM-MK-104", price: 179, cost: 88, stock: 92, category: "Peripherals", status: "active", rating: 4.9, reviews: 856, image: null, color: "purple" },
  { id: "p3", name: "Vortex 4K Webcam", sku: "VX-WC-4K", price: 129, cost: 64, stock: 0, category: "Cameras", status: "out_of_stock", rating: 4.6, reviews: 432, image: null, color: "orange" },
  { id: "p4", name: "Helix Standing Desk Mat", sku: "HX-DM-22", price: 89, cost: 38, stock: 318, category: "Office", status: "active", rating: 4.7, reviews: 678, image: null, color: "pink" },
  { id: "p5", name: "Stellar USB-C Hub 7-in-1", sku: "ST-HB-7", price: 69, cost: 24, stock: 12, category: "Accessories", status: "low_stock", rating: 4.5, reviews: 1890, image: null, color: "success" },
  { id: "p6", name: "Lumen Smart Lamp Pro", sku: "LM-SL-PR", price: 149, cost: 72, stock: 76, category: "Smart Home", status: "active", rating: 4.8, reviews: 924, image: null, color: "warning" },
  { id: "p7", name: "Echo Bluetooth Speaker", sku: "EC-BS-22", price: 99, cost: 48, stock: 234, category: "Audio", status: "active", rating: 4.4, reviews: 567, image: null, color: "error" },
  { id: "p8", name: "Quantum Ergonomic Mouse", sku: "QM-EM-12", price: 79, cost: 32, stock: 8, category: "Peripherals", status: "low_stock", rating: 4.7, reviews: 1102, image: null, color: "brand" },
  { id: "p9", name: "Pulse Fitness Tracker", sku: "PL-FT-V3", price: 199, cost: 96, stock: 152, category: "Wearables", status: "active", rating: 4.6, reviews: 778, image: null, color: "purple" },
  { id: "p10", name: "Nova 27\" 4K Monitor", sku: "NV-MN-4K27", price: 549, cost: 312, stock: 38, category: "Displays", status: "active", rating: 4.9, reviews: 412, image: null, color: "orange" },
];

export const ORDERS = [
  { id: "ORD-4218", customer: "Priya Iyer", email: "priya.i@nimbuspro.io", date: "2026-06-26", total: 1248, status: "delivered", items: 4, payment: "paid", channel: "web" },
  { id: "ORD-4217", customer: "Marcus Chen", email: "marcus.c@nimbuspro.io", date: "2026-06-26", total: 329, status: "shipped", items: 2, payment: "paid", channel: "mobile" },
  { id: "ORD-4216", customer: "Sofia García", email: "sofia.g@nimbuspro.io", date: "2026-06-25", total: 89, status: "processing", items: 1, payment: "pending", channel: "web" },
  { id: "ORD-4215", customer: "Yuki Tanaka", email: "yuki.t@nimbuspro.io", date: "2026-06-25", total: 1799, status: "delivered", items: 6, payment: "paid", channel: "web" },
  { id: "ORD-4214", customer: "Ethan Wright", email: "ethan.w@nimbuspro.io", date: "2026-06-24", total: 249, status: "cancelled", items: 1, payment: "refunded", channel: "mobile" },
  { id: "ORD-4213", customer: "Fatima Al-Rashid", email: "fatima.r@nimbuspro.io", date: "2026-06-24", total: 468, status: "delivered", items: 3, payment: "paid", channel: "web" },
  { id: "ORD-4212", customer: "Dmitri Volkov", email: "dmitri.v@nimbuspro.io", date: "2026-06-23", total: 129, status: "shipped", items: 1, payment: "paid", channel: "web" },
  { id: "ORD-4211", customer: "Aaliyah Brown", email: "aaliyah.b@nimbuspro.io", date: "2026-06-23", total: 729, status: "processing", items: 4, payment: "paid", channel: "mobile" },
  { id: "ORD-4210", customer: "Leo Romano", email: "leo.r@nimbuspro.io", date: "2026-06-22", total: 199, status: "delivered", items: 1, payment: "paid", channel: "web" },
  { id: "ORD-4209", customer: "Mira Patel", email: "mira.p@nimbuspro.io", date: "2026-06-22", total: 1549, status: "delivered", items: 5, payment: "paid", channel: "web" },
];

export const INVOICES = [
  { id: "INV-2041", client: "Acme Corporation", email: "ap@acme.example", issued: "2026-06-22", due: "2026-07-22", total: 12480, status: "paid", items: 12 },
  { id: "INV-2040", client: "Globex Industries", email: "billing@globex.example", issued: "2026-06-20", due: "2026-07-20", total: 8650, status: "sent", items: 8 },
  { id: "INV-2039", client: "Initech LLC", email: "accounts@initech.example", issued: "2026-06-18", due: "2026-07-18", total: 3240, status: "overdue", items: 4 },
  { id: "INV-2038", client: "Umbrella Group", email: "finance@umbrella.example", issued: "2026-06-15", due: "2026-06-30", total: 18900, status: "paid", items: 18 },
  { id: "INV-2037", client: "Stark Enterprises", email: "pepper@stark.example", issued: "2026-06-12", due: "2026-07-12", total: 4250, status: "draft", items: 3 },
  { id: "INV-2036", client: "Wayne Foundation", email: "lucius@wayne.example", issued: "2026-06-08", due: "2026-07-08", total: 6780, status: "paid", items: 7 },
];

export const ACTIVITY = [
  { id: 1, user: "Priya Iyer", action: "placed order", target: "#ORD-4218", time: "2m ago", type: "order", icon: "shopping" },
  { id: 2, user: "Aaroh Sharma", action: "updated product", target: "Aurora Wireless Headphones", time: "12m ago", type: "product", icon: "package" },
  { id: 3, user: "System", action: "auto-renewed subscription for", target: "Acme Inc.", time: "1h ago", type: "billing", icon: "card" },
  { id: 4, user: "Marcus Chen", action: "replied to ticket", target: "#TKT-9214", time: "2h ago", type: "support", icon: "ticket" },
  { id: 5, user: "Yuki Tanaka", action: "uploaded file", target: "Q3-roadmap.pdf", time: "3h ago", type: "file", icon: "file" },
  { id: 6, user: "Sofia García", action: "invited user", target: "leo.r@nimbuspro.io", time: "5h ago", type: "user", icon: "user" },
];

export const ACTIVITY_LOG = [
  { id: 1, user: "Aaroh Sharma", action: "Logged in", ip: "103.21.42.18", device: "MacOS · Chrome", time: "2026-06-28 09:42", status: "success" },
  { id: 2, user: "Aaroh Sharma", action: "Updated billing settings", ip: "103.21.42.18", device: "MacOS · Chrome", time: "2026-06-28 09:38", status: "success" },
  { id: 3, user: "System", action: "Failed login attempt", ip: "194.32.18.6", device: "Unknown · Firefox", time: "2026-06-28 08:11", status: "failed" },
  { id: 4, user: "Aaroh Sharma", action: "Exported customer CSV", ip: "103.21.42.18", device: "MacOS · Chrome", time: "2026-06-27 18:24", status: "success" },
  { id: 5, user: "Aaroh Sharma", action: "Changed password", ip: "103.21.42.18", device: "MacOS · Chrome", time: "2026-06-27 14:02", status: "success" },
];

export const TICKETS = [
  { id: "TKT-9214", subject: "Cannot upgrade to Enterprise plan", requester: "Mira Patel", priority: "high", status: "open", channel: "email", assigned: "Aaroh S.", updated: "12m", tags: ["billing", "plan"] },
  { id: "TKT-9213", subject: "API key rejected in production", requester: "Marcus Chen", priority: "urgent", status: "in_progress", channel: "chat", assigned: "Ethan W.", updated: "1h", tags: ["api", "production"] },
  { id: "TKT-9212", subject: "Bulk import CSV hangs at 80%", requester: "Sofia García", priority: "medium", status: "open", channel: "email", assigned: "—", updated: "3h", tags: ["import"] },
  { id: "TKT-9211", subject: "2FA backup codes not working", requester: "Yuki Tanaka", priority: "high", status: "resolved", channel: "email", assigned: "Priya I.", updated: "5h", tags: ["auth", "2fa"] },
  { id: "TKT-9210", subject: "Refund request — order ORD-4209", requester: "Mira Patel", priority: "low", status: "pending", channel: "form", assigned: "—", updated: "8h", tags: ["refund"] },
  { id: "TKT-9209", subject: "Webhook signature mismatch", requester: "Leo Romano", priority: "high", status: "in_progress", channel: "chat", assigned: "Aaroh S.", updated: "1d", tags: ["webhook"] },
];

export const EMAILS = [
  { id: "e1", from: "Acme Billing", fromEmail: "billing@acme.example", subject: "Invoice #2041 — Receipt", preview: "Thank you for your payment. Your receipt is attached...", time: "09:42", read: false, starred: true, label: "work", avatar: null },
  { id: "e2", from: "Priya Iyer", fromEmail: "priya.i@nimbuspro.io", subject: "Re: Q3 marketing plan", preview: "Looks great! Just one note on the September budget...", time: "08:18", read: false, starred: false, label: "internal", avatar: null },
  { id: "e3", from: "GitHub", fromEmail: "noreply@github.com", subject: "[nimbus/admin] PR #824 merged", preview: "feat(dashboard): add AI analytics view was merged by ethan-w", time: "Yesterday", read: true, starred: false, label: "dev", avatar: null },
  { id: "e4", from: "Stripe", fromEmail: "receipts@stripe.com", subject: "Your monthly statement is ready", preview: "Total volume: $48,920 across 312 transactions...", time: "Yesterday", read: true, starred: true, label: "billing", avatar: null },
  { id: "e5", from: "Sofia García", fromEmail: "sofia.g@nimbuspro.io", subject: "Customer feedback summary", preview: "I've compiled the highlights from last week's NPS surveys...", time: "Mon", read: true, starred: false, label: "internal", avatar: null },
  { id: "e6", from: "Linear", fromEmail: "team@linear.app", subject: "5 issues assigned to you", preview: "You have 5 new issues waiting in your inbox...", time: "Sun", read: false, starred: false, label: "dev", avatar: null },
];

export const CHATS = [
  { id: "c1", name: "Priya Iyer", last: "Sounds good — let's ship it", time: "2m", unread: 2, online: true },
  { id: "c2", name: "Engineering Team", last: "Marcus: deploy is green ✅", time: "18m", unread: 0, online: true },
  { id: "c3", name: "Sofia García", last: "I'll prep the report", time: "1h", unread: 0, online: false },
  { id: "c4", name: "Acme Support", last: "Got it, we'll check", time: "3h", unread: 1, online: false },
  { id: "c5", name: "Yuki Tanaka", last: "🎉 shipped the new layout", time: "5h", unread: 0, online: true },
  { id: "c6", name: "Marketing", last: "Campaign draft ready", time: "1d", unread: 0, online: false },
];

export const MESSAGES = [
  { id: 1, fromMe: false, text: "Hey! Did you get a chance to look at the new dashboard layout?", time: "10:24" },
  { id: 2, fromMe: true, text: "Yes — I just reviewed it. Looks really clean. The KPI cards are great.", time: "10:26" },
  { id: 3, fromMe: false, text: "Glad you like it! Should we ship to staging?", time: "10:27" },
  { id: 4, fromMe: true, text: "Sounds good — let's ship it. I'll handle the QA pass.", time: "10:28" },
];

export const KANBAN_COLUMNS = [
  { id: "backlog", title: "Backlog", color: "gray", cards: [
    { id: "k1", title: "Add CSV bulk import", priority: "medium", assignees: ["Mira Patel", "Leo Romano"], tags: ["backend"], due: "Jul 04", comments: 4, attachments: 1 },
    { id: "k2", title: "RTL support for sidebar", priority: "low", assignees: ["Yuki Tanaka"], tags: ["frontend"], due: "Jul 10", comments: 1, attachments: 0 },
  ]},
  { id: "todo", title: "To Do", color: "brand", cards: [
    { id: "k3", title: "Build AI dashboard widgets", priority: "high", assignees: ["Aaroh Sharma", "Sofia García"], tags: ["ai", "frontend"], due: "Jun 30", comments: 8, attachments: 2 },
    { id: "k4", title: "Refactor auth flow", priority: "high", assignees: ["Marcus Chen"], tags: ["auth"], due: "Jul 02", comments: 3, attachments: 0 },
  ]},
  { id: "in_progress", title: "In Progress", color: "warning", cards: [
    { id: "k5", title: "Optimize data tables for 10k+ rows", priority: "urgent", assignees: ["Priya Iyer"], tags: ["performance"], due: "Jun 28", comments: 12, attachments: 1 },
    { id: "k6", title: "Theme customizer v2", priority: "medium", assignees: ["Aaliyah Brown"], tags: ["frontend", "theme"], due: "Jul 05", comments: 2, attachments: 0 },
  ]},
  { id: "review", title: "Review", color: "purple", cards: [
    { id: "k7", title: "New chart dashboard layout", priority: "medium", assignees: ["Ethan Wright", "Fatima Al-Rashid"], tags: ["charts"], due: "Jun 29", comments: 5, attachments: 3 },
  ]},
  { id: "done", title: "Done", color: "success", cards: [
    { id: "k8", title: "Command palette", priority: "high", assignees: ["Aaroh Sharma"], tags: ["ux"], due: "Jun 25", comments: 6, attachments: 0 },
    { id: "k9", title: "Notification center", priority: "high", assignees: ["Priya Iyer", "Mira Patel"], tags: ["ux"], due: "Jun 24", comments: 4, attachments: 1 },
    { id: "k10", title: "Branding refresh", priority: "medium", assignees: ["Sofia García"], tags: ["brand"], due: "Jun 22", comments: 9, attachments: 5 },
  ]},
];

export const CALENDAR_EVENTS = [
  { id: 1, title: "Sprint planning", date: "2026-06-30", start: "10:00", end: "11:00", tone: "brand" },
  { id: 2, title: "Customer call — Acme", date: "2026-06-30", start: "14:30", end: "15:00", tone: "purple" },
  { id: 3, title: "Design review", date: "2026-07-01", start: "11:00", end: "12:00", tone: "warning" },
  { id: 4, title: "1:1 with Priya", date: "2026-07-02", start: "16:00", end: "16:30", tone: "success" },
  { id: 5, title: "All-hands", date: "2026-07-03", start: "09:30", end: "10:30", tone: "pink" },
  { id: 6, title: "Release v3.1", date: "2026-07-04", start: "12:00", end: "13:00", tone: "orange" },
];

export const ROLES = [
  { id: "r1", name: "Super Admin", users: 2, permissions: 48, desc: "Full access to everything", color: "error" },
  { id: "r2", name: "Admin", users: 5, permissions: 36, desc: "Manage users, billing, and content", color: "warning" },
  { id: "r3", name: "Editor", users: 14, permissions: 22, desc: "Create and edit content", color: "brand" },
  { id: "r4", name: "Viewer", users: 48, permissions: 12, desc: "Read-only access", color: "purple" },
  { id: "r5", name: "Billing", users: 3, permissions: 8, desc: "Manage invoices and billing", color: "success" },
  { id: "r6", name: "Support", users: 7, permissions: 16, desc: "Handle customer tickets", color: "pink" },
];

export const PERMISSIONS = [
  { module: "Dashboard", actions: { view: true, edit: false, delete: false, export: true } },
  { module: "Users", actions: { view: true, edit: true, delete: false, export: true } },
  { module: "Products", actions: { view: true, edit: true, delete: true, export: true } },
  { module: "Orders", actions: { view: true, edit: true, delete: false, export: true } },
  { module: "Billing", actions: { view: true, edit: false, delete: false, export: false } },
  { module: "Settings", actions: { view: true, edit: false, delete: false, export: false } },
  { module: "Reports", actions: { view: true, edit: false, delete: false, export: true } },
];

export const COUPONS = [
  { id: "C1", code: "SUMMER26", type: "percent", value: 25, used: 1240, limit: 5000, status: "active", expires: "2026-08-31" },
  { id: "C2", code: "WELCOME10", type: "percent", value: 10, used: 8920, limit: 10000, status: "active", expires: "—" },
  { id: "C3", code: "FLAT50", type: "fixed", value: 50, used: 412, limit: 1000, status: "active", expires: "2026-07-15" },
  { id: "C4", code: "BLACKFRI", type: "percent", value: 40, used: 5000, limit: 5000, status: "expired", expires: "2025-11-30" },
  { id: "C5", code: "VIPONLY", type: "fixed", value: 100, used: 84, limit: 200, status: "active", expires: "2026-12-31" },
];

export const REVIEWS = [
  { id: "RV1", product: "Aurora Wireless Headphones", customer: "Priya Iyer", rating: 5, title: "Best headphones I've owned", body: "Sound quality is incredible, the ANC is top-tier.", date: "2026-06-24", status: "published", helpful: 42 },
  { id: "RV2", product: "Nimbus Mechanical Keyboard", customer: "Marcus Chen", rating: 5, title: "Buttery smooth switches", body: "Hot-swap is a dream. Build quality feels premium.", date: "2026-06-22", status: "published", helpful: 28 },
  { id: "RV3", product: "Vortex 4K Webcam", customer: "Yuki Tanaka", rating: 3, title: "Decent but overpriced", body: "Image quality is fine, but the autofocus is slow.", date: "2026-06-20", status: "pending", helpful: 4 },
  { id: "RV4", product: "Echo Bluetooth Speaker", customer: "Sofia García", rating: 2, title: "Disappointing battery", body: "Battery only lasts 4 hours, not the 10 advertised.", date: "2026-06-18", status: "flagged", helpful: 11 },
];

// ============ Time-series helpers ============
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const REVENUE_SERIES = [42, 56, 48, 72, 65, 88, 92, 84, 105, 118, 124, 142].map((v, i) => ({ x: MONTHS[i], y: v * 1000 }));
export const ORDERS_SERIES = [180, 220, 195, 280, 245, 320, 340, 312, 380, 410, 425, 480];
export const VISITORS_SERIES = [1240, 1580, 1380, 1820, 1690, 2140, 2280, 2090, 2480, 2810, 2940, 3210];
export const CONVERSION_SERIES = [2.4, 2.8, 2.6, 3.1, 2.9, 3.4, 3.6, 3.3, 3.8, 4.1, 4.2, 4.6];

export const TRAFFIC_SOURCES = [
  { name: "Organic Search", value: 42, color: "#10b981" },
  { name: "Direct", value: 26, color: "#0ea5e9" },
  { name: "Social", value: 18, color: "#8b5cf6" },
  { name: "Referral", value: 9, color: "#f59e0b" },
  { name: "Email", value: 5, color: "#f43f5e" },
];

export const SALES_BY_CATEGORY = [
  { category: "Audio", sales: 184000, growth: 18 },
  { category: "Peripherals", sales: 142000, growth: 12 },
  { category: "Displays", sales: 98000, growth: -4 },
  { category: "Smart Home", sales: 76000, growth: 32 },
  { category: "Wearables", sales: 64000, growth: 22 },
  { category: "Cameras", sales: 38000, growth: -8 },
];

export const TOP_PRODUCTS = [
  { name: "Aurora Wireless Headphones", sales: 1240, revenue: 308760, trend: "up" },
  { name: "Nimbus Mechanical Keyboard", sales: 892, revenue: 159668, trend: "up" },
  { name: "Nova 27\" 4K Monitor", sales: 412, revenue: 226188, trend: "up" },
  { name: "Lumen Smart Lamp Pro", sales: 678, revenue: 101022, trend: "down" },
  { name: "Pulse Fitness Tracker", sales: 524, revenue: 104276, trend: "up" },
];

export const TEAM_PERFORMANCE = [
  { name: "Priya Iyer", role: "Sales Lead", deals: 24, revenue: 184000, conversion: 68, trend: "up" },
  { name: "Marcus Chen", role: "Account Exec", deals: 18, revenue: 142000, conversion: 54, trend: "up" },
  { name: "Sofia García", role: "Sales", deals: 16, revenue: 98000, conversion: 48, trend: "down" },
  { name: "Yuki Tanaka", role: "Sales", deals: 12, revenue: 76000, conversion: 42, trend: "up" },
];

export const PROJECTS = [
  { id: "PRJ-1", name: "Nimbus Pro v3.0", lead: "Aaroh Sharma", progress: 78, status: "on_track", due: "Jul 15", team: ["Aaroh Sharma", "Priya Iyer", "Marcus Chen"], tasks: 142, done: 96 },
  { id: "PRJ-2", name: "AI Insights Module", lead: "Sofia García", progress: 45, status: "at_risk", due: "Jul 28", team: ["Sofia García", "Yuki Tanaka"], tasks: 88, done: 39 },
  { id: "PRJ-3", name: "Mobile App Refresh", lead: "Yuki Tanaka", progress: 92, status: "on_track", due: "Jul 04", team: ["Yuki Tanaka", "Leo Romano"], tasks: 64, done: 59 },
  { id: "PRJ-4", name: "Enterprise SSO", lead: "Marcus Chen", progress: 22, status: "off_track", due: "Aug 12", team: ["Marcus Chen"], tasks: 48, done: 11 },
];

export const TRANSACTIONS = [
  { id: "TX-9821", desc: "Stripe payout", amount: 12480, type: "credit", date: "2026-06-26", account: "Operating", category: "Income", status: "completed" },
  { id: "TX-9820", desc: "AWS infrastructure", amount: -2840, type: "debit", date: "2026-06-25", account: "Operating", category: "Infrastructure", status: "completed" },
  { id: "TX-9819", desc: "Payroll run — June", amount: -48200, type: "debit", date: "2026-06-25", account: "Payroll", category: "Salaries", status: "completed" },
  { id: "TX-9818", desc: "Customer refund — ORD-4214", amount: -249, type: "debit", date: "2026-06-24", account: "Operating", category: "Refund", status: "completed" },
  { id: "TX-9817", desc: "Notion annual subscription", amount: -1080, type: "debit", date: "2026-06-23", account: "Operating", category: "SaaS", status: "completed" },
  { id: "TX-9816", desc: "Acme Inc. payment", amount: 8650, type: "credit", date: "2026-06-22", account: "Operating", category: "Income", status: "completed" },
];

export const FINANCE_KPI = {
  balance: 184250,
  inflow: 48200,
  outflow: 51320,
  burn: 3120,
  runway: 18,
};

export const FILES = [
  { id: "f1", name: "Q3-roadmap.pdf", size: "2.4 MB", type: "pdf", modified: "2h ago", owner: "Aaroh Sharma", shared: 3 },
  { id: "f2", name: "brand-guidelines.fig", size: "18.7 MB", type: "fig", modified: "Yesterday", owner: "Sofia García", shared: 8 },
  { id: "f3", name: "invoice-2041.pdf", size: "412 KB", type: "pdf", modified: "2d ago", owner: "Priya Iyer", shared: 1 },
  { id: "f4", name: "team-photo.jpg", size: "6.2 MB", type: "image", modified: "3d ago", owner: "Mira Patel", shared: 12 },
  { id: "f5", name: "budget-2026.xlsx", size: "88 KB", type: "spreadsheet", modified: "1w ago", owner: "Ethan Wright", shared: 4 },
  { id: "f6", name: "release-notes.md", size: "12 KB", type: "doc", modified: "1w ago", owner: "Marcus Chen", shared: 2 },
];

export const NOTES_LIST = [
  { id: "n1", title: "Sprint retro notes", preview: "What went well: shipped command palette, theme customizer. What didn't: estimation on data tables...", color: "brand", pinned: true, modified: "2h ago" },
  { id: "n2", title: "Customer interview — Acme", preview: "Key pain points: reporting depth, CSV export limits, webhook reliability...", color: "purple", pinned: true, modified: "Yesterday" },
  { id: "n3", title: "Hiring panel feedback", preview: "Strong on system design. Some concerns on frontend depth. Recommend second round...", color: "warning", pinned: false, modified: "2d ago" },
  { id: "n4", title: "Q4 OKRs draft", preview: "1) Launch AI module GA 2) Grow enterprise revenue 40% 3) Reduce churn to <2%...", color: "success", pinned: false, modified: "3d ago" },
  { id: "n5", title: "Competitive analysis", preview: "TailAdmin Pro: strong on tables. Metronic: heavy. Vuexy: vibrant. Our edge: design + DX...", color: "pink", pinned: false, modified: "1w ago" },
];

export const TASKS_LIST = [
  { id: "t1", title: "Review PR #824 — AI dashboard widgets", priority: "high", status: "in_progress", due: "Today", assignee: "Aaroh Sharma", project: "Nimbus Pro v3.0", tags: ["frontend"] },
  { id: "t2", title: "Refactor auth context", priority: "medium", status: "todo", due: "Tomorrow", assignee: "Marcus Chen", project: "Enterprise SSO", tags: ["backend", "auth"] },
  { id: "t3", title: "Write release notes for v3.0", priority: "low", status: "todo", due: "Jul 02", assignee: "Sofia García", project: "Nimbus Pro v3.0", tags: ["docs"] },
  { id: "t4", title: "Fix flaky e2e tests", priority: "high", status: "in_progress", due: "Today", assignee: "Yuki Tanaka", project: "Mobile App Refresh", tags: ["qa"] },
  { id: "t5", title: "Upgrade to Tailwind 4", priority: "medium", status: "done", due: "Yesterday", assignee: "Leo Romano", project: "Nimbus Pro v3.0", tags: ["frontend"] },
  { id: "t6", title: "Customer interview prep", priority: "low", status: "todo", due: "Jul 04", assignee: "Priya Iyer", project: "AI Insights Module", tags: ["research"] },
];

export const CONTACTS = [
  { id: "ct1", name: "Acme Corporation", type: "company", industry: "SaaS", revenue: "$4.2M", contacts: 12, status: "active", tier: "enterprise", last: "2d ago" },
  { id: "ct2", name: "Globex Industries", type: "company", industry: "Manufacturing", revenue: "$12M", contacts: 8, status: "active", tier: "enterprise", last: "5d ago" },
  { id: "ct3", name: "Initech LLC", type: "company", industry: "Finance", revenue: "$2.8M", contacts: 4, status: "lead", tier: "pro", last: "1w ago" },
  { id: "ct4", name: "Stark Enterprises", type: "company", industry: "Tech", revenue: "$24M", contacts: 18, status: "active", tier: "enterprise", last: "Yesterday" },
  { id: "ct5", name: "Wayne Foundation", type: "nonprofit", industry: "Charity", revenue: "$1.2M", contacts: 3, status: "active", tier: "free", last: "2w ago" },
];

export const INVENTORY_LOG = [
  { id: "IV1", sku: "AUR-WH-001", product: "Aurora Wireless Headphones", warehouse: "Mumbai", onHand: 184, reserved: 24, available: 160, reorderPoint: 50, status: "in_stock" },
  { id: "IV2", sku: "NIM-MK-104", product: "Nimbus Mechanical Keyboard", warehouse: "Singapore", onHand: 92, reserved: 12, available: 80, reorderPoint: 40, status: "in_stock" },
  { id: "IV3", sku: "VX-WC-4K", product: "Vortex 4K Webcam", warehouse: "Mumbai", onHand: 0, reserved: 0, available: 0, reorderPoint: 30, status: "out_of_stock" },
  { id: "IV4", sku: "ST-HB-7", product: "Stellar USB-C Hub 7-in-1", warehouse: "Singapore", onHand: 12, reserved: 2, available: 10, reorderPoint: 30, status: "low_stock" },
  { id: "IV5", sku: "QM-EM-12", product: "Quantum Ergonomic Mouse", warehouse: "London", onHand: 8, reserved: 0, available: 8, reorderPoint: 25, status: "low_stock" },
  { id: "IV6", sku: "NV-MN-4K27", product: 'Nova 27" 4K Monitor', warehouse: "London", onHand: 38, reserved: 6, available: 32, reorderPoint: 15, status: "in_stock" },
];

export const COUNTRIES = [
  { name: "United States", code: "US", flag: "🇺🇸", revenue: 184000, orders: 1240 },
  { name: "India", code: "IN", flag: "🇮🇳", revenue: 98000, orders: 820 },
  { name: "Germany", code: "DE", flag: "🇩🇪", revenue: 64000, orders: 412 },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", revenue: 52000, orders: 318 },
  { name: "Japan", code: "JP", flag: "🇯🇵", revenue: 48000, orders: 286 },
  { name: "Singapore", code: "SG", flag: "🇸🇬", revenue: 32000, orders: 194 },
];

export const CONNECTED_APPS = [
  { id: "a1", name: "Slack", desc: "Notifications & alerts", connected: true, category: "Communication", icon: "💬", color: "purple" },
  { id: "a2", name: "GitHub", desc: "Code & deployments", connected: true, category: "Developer", icon: "🐙", color: "gray" },
  { id: "a3", name: "Stripe", desc: "Payments & billing", connected: true, category: "Payments", icon: "💳", color: "brand" },
  { id: "a4", name: "Figma", desc: "Design files & assets", connected: false, category: "Design", icon: "🎨", color: "pink" },
  { id: "a5", name: "Notion", desc: "Docs & wikis", connected: true, category: "Productivity", icon: "📝", color: "warning" },
  { id: "a6", name: "Linear", desc: "Issue tracking", connected: false, category: "Developer", icon: "📐", color: "brand" },
  { id: "a7", name: "Zapier", desc: "Workflow automation", connected: false, category: "Automation", icon: "⚡", color: "orange" },
  { id: "a8", name: "Google Drive", desc: "Cloud storage", connected: true, category: "Storage", icon: "📁", color: "success" },
];

export const CHANGELOG = [
  { version: "3.0.0", date: "Jun 28, 2026", tag: "major", items: ["Complete rebrand to Nimbus Pro", "100+ new pages across 11 categories", "New design system with emerald palette", "Theme customizer with 5 colors", "Command palette (Cmd+K)", "Compact & comfortable density modes"] },
  { version: "2.5.0", date: "May 14, 2026", tag: "minor", items: ["Added AI dashboard", "New Kanban board", "Improved dark mode contrast"] },
  { version: "2.4.2", date: "Apr 02, 2026", tag: "patch", items: ["Fixed sidebar collapse on Safari", "Improved table performance"] },
];

export const ROADMAP = [
  { quarter: "Q3 2026", items: [{ title: "AI Insights GA", status: "in_progress", desc: "Move AI dashboard from beta to GA with full model coverage." }, { title: "Mobile companion app", status: "planned", desc: "Native iOS/Android companion with offline-first sync." }, { title: "Audit log streaming", status: "planned", desc: "Stream activity logs to SIEM via webhook." }] },
  { quarter: "Q4 2026", items: [{ title: "Realtime collaboration", status: "research", desc: "Multi-user cursors, comments, and presence." }, { title: "Plugin marketplace", status: "research", desc: "Third-party extensions marketplace with revenue share." }, { title: "RTL full coverage", status: "planned", desc: "Complete RTL support across every page." }] },
];

export const FAQ = [
  { q: "What does the Nimbus Pro license include?", a: "Nimbus Pro includes a lifetime license for one end-product, six months of premium support, and access to all minor and patch updates within the v3 major cycle." },
  { q: "Can I use Nimbus Pro for client projects?", a: "Yes. The Agency license permits unlimited end-products for clients. The Personal license covers a single end-product you own." },
  { q: "Does Nimbus Pro support dark mode?", a: "Yes, dark mode is supported across every page with proper contrast tokens. Users can toggle in the topbar or via the Theme Customizer." },
  { q: "Which browsers are supported?", a: "All modern browsers released in the last 24 months: Chrome, Edge, Firefox, Safari, and their mobile equivalents." },
  { q: "Can I change the primary color?", a: "Yes. Open the Theme Customizer (slider icon in the topbar) and choose from 5 curated palettes — or define your own via CSS variables." },
  { q: "Is the codebase TypeScript?", a: "Yes. Nimbus Pro is written in strict TypeScript with first-class types for every prop, data model, and API." },
];

export const PRICING_PLANS = [
  { name: "Personal", monthly: 0, yearly: 0, desc: "For individuals building their first dashboard", features: ["1 project", "20+ UI components", "Light & dark mode", "Community support"], highlighted: false, cta: "Start free" },
  { name: "Pro", monthly: 49, yearly: 470, desc: "For professionals shipping production apps", features: ["Unlimited projects", "100+ premium pages", "Theme customizer", "Priority support", "Lifetime updates"], highlighted: true, cta: "Upgrade to Pro" },
  { name: "Agency", monthly: 149, yearly: 1430, desc: "For teams & agencies building client work", features: ["Everything in Pro", "Unlimited developers", "White-label license", "Dedicated Slack", "Custom design tokens"], highlighted: false, cta: "Talk to sales" },
];
