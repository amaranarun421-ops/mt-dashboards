import type { Product, Order, Customer } from "@/types";

export const ecommerceKpis = {
  revenue: 1_284_320,
  revenueDelta: 0.124,
  orders: 5_359,
  ordersDelta: -0.091,
  customers: 3_782,
  customersDelta: 0.110,
  avgOrderValue: 239,
  avgOrderValueDelta: 0.042,
  refundRate: 0.018,
  refundRateDelta: -0.004,
  paymentSuccessRate: 0.974,
  paymentSuccessRateDelta: 0.006,
  conversionRate: 0.032,
  conversionRateDelta: 0.008,
  abandonedCarts: 184,
  abandonedCartsDelta: 0.067,
  inventoryHealth: 0.88,
  inventoryHealthDelta: -0.012,
};

export const salesByPeriod = {
  "7D": [
    { name: "Mon", sales: 168, orders: 42 }, { name: "Tue", sales: 285, orders: 71 },
    { name: "Wed", sales: 201, orders: 53 }, { name: "Thu", sales: 298, orders: 78 },
    { name: "Fri", sales: 187, orders: 49 }, { name: "Sat", sales: 295, orders: 82 },
    { name: "Sun", sales: 212, orders: 56 },
  ],
  "30D": [
    { name: "W1", sales: 1240, orders: 312 }, { name: "W2", sales: 1580, orders: 395 },
    { name: "W3", sales: 1820, orders: 448 }, { name: "W4", sales: 2150, orders: 531 },
  ],
  "12M": [
    { name: "Jan", sales: 2168, orders: 542 }, { name: "Feb", sales: 2385, orders: 596 },
    { name: "Mar", sales: 2201, orders: 551 }, { name: "Apr", sales: 2598, orders: 649 },
    { name: "May", sales: 2187, orders: 547 }, { name: "Jun", sales: 2695, orders: 674 },
    { name: "Jul", sales: 2891, orders: 723 }, { name: "Aug", sales: 2510, orders: 627 },
    { name: "Sep", sales: 2715, orders: 679 }, { name: "Oct", sales: 2990, orders: 748 },
    { name: "Nov", sales: 2880, orders: 720 }, { name: "Dec", sales: 3112, orders: 778 },
  ],
} as const;

export const products: Product[] = [
  { id: "prod-1", name: "MacBook Pro 13\"", sku: "MBP-13-SPACE", category: "Laptop", price: 2399, cost: 1840, stock: 142, variants: 2, status: "active", rating: 4.8, unitsSold: 318 },
  { id: "prod-2", name: "Apple Watch Ultra 2", sku: "AW-U2-TITAN", category: "Watch", price: 879, cost: 612, stock: 89, variants: 1, status: "active", rating: 4.7, unitsSold: 412 },
  { id: "prod-3", name: "iPhone 15 Pro Max", sku: "IP15PM-256", category: "Smartphone", price: 1869, cost: 1420, stock: 234, variants: 2, status: "active", rating: 4.9, unitsSold: 892 },
  { id: "prod-4", name: "iPad Pro 12.9\" M2", sku: "IPP-129-M2", category: "Tablet", price: 1699, cost: 1240, stock: 18, variants: 2, status: "active", rating: 4.6, unitsSold: 264 },
  { id: "prod-5", name: "AirPods Pro 2nd Gen", sku: "APP-2-USB-C", category: "Audio", price: 240, cost: 158, stock: 412, variants: 1, status: "active", rating: 4.7, unitsSold: 1284 },
  { id: "prod-6", name: "Magic Keyboard", sku: "MK--US-GRY", category: "Accessories", price: 129, cost: 84, stock: 7, variants: 3, status: "active", rating: 4.5, unitsSold: 642 },
  { id: "prod-7", name: "Studio Display 5K", sku: "SD-5K-STD", category: "Display", price: 1599, cost: 1180, stock: 64, variants: 1, status: "active", rating: 4.4, unitsSold: 98 },
  { id: "prod-8", name: "HomePod mini", sku: "HPM-SPACE", category: "Audio", price: 99, cost: 68, stock: 312, variants: 1, status: "active", rating: 4.3, unitsSold: 484 },
  { id: "prod-9", name: "AirTag 4-Pack", sku: "AT-4PACK", category: "Accessories", price: 99, cost: 52, stock: 3, variants: 1, status: "active", rating: 4.6, unitsSold: 892 },
  { id: "prod-10", name: "Mac mini M2", sku: "MM-M2-256", category: "Desktop", price: 699, cost: 520, stock: 96, variants: 2, status: "active", rating: 4.7, unitsSold: 218 },
];

export const orders: Order[] = [
  { id: "order-1", number: "#NX-88421", customer: "Eleanor Reyes", customerEmail: "e.reyes@helixbio.com", date: "2026-06-30T08:14:00Z", total: 4276, items: 2, status: "delivered", payment: "paid", channel: "web" },
  { id: "order-2", number: "#NX-88420", customer: "Marcus Vetter", customerEmail: "m.vetter@northwind.io", date: "2026-06-30T07:42:00Z", total: 240, items: 1, status: "shipped", payment: "paid", channel: "mobile" },
  { id: "order-3", number: "#NX-88419", customer: "Linnea Holm", customerEmail: "l.holm@auroramobility.com", date: "2026-06-30T06:18:00Z", total: 1869, items: 1, status: "pending", payment: "pending", channel: "web" },
  { id: "order-4", number: "#NX-88418", customer: "Jamal Whitaker", customerEmail: "j.whitaker@lumenhealth.com", date: "2026-06-29T22:30:00Z", total: 879, items: 1, status: "delivered", payment: "paid", channel: "marketplace" },
  { id: "order-5", number: "#NX-88417", customer: "Yuki Tanaka", customerEmail: "yuki@cobaltstudios.tv", date: "2026-06-29T18:14:00Z", total: 1298, items: 4, status: "refunded", payment: "refunded", channel: "web" },
  { id: "order-6", number: "#NX-88416", customer: "Anika Patel", customerEmail: "a.patel@meridiancap.com", date: "2026-06-29T15:01:00Z", total: 3298, items: 2, status: "delivered", payment: "paid", channel: "pos" },
  { id: "order-7", number: "#NX-88415", customer: "Wen Li", customerEmail: "wen@tessellate.ai", date: "2026-06-29T12:45:00Z", total: 699, items: 1, status: "delivered", payment: "paid", channel: "web" },
  { id: "order-8", number: "#NX-88414", customer: "Camila Restrepo", customerEmail: "c.restrepo@pampasfoods.com", date: "2026-06-29T10:22:00Z", total: 472, items: 3, status: "canceled", payment: "failed", channel: "web" },
  { id: "order-9", number: "#NX-88413", customer: "Arjun Mehta", customerEmail: "a.mehta@industextiles.com", date: "2026-06-28T19:18:00Z", total: 1599, items: 1, status: "delivered", payment: "paid", channel: "web" },
  { id: "order-10", number: "#NX-88412", customer: "Klaus Becker", customerEmail: "k.becker@vertexrobotics.com", date: "2026-06-28T16:55:00Z", total: 969, items: 2, status: "pending", payment: "pending", channel: "mobile" },
  { id: "order-11", number: "#NX-88411", customer: "Aisha Mensah", customerEmail: "aisha@saharacloud.io", date: "2026-06-28T14:30:00Z", total: 2399, items: 1, status: "delivered", payment: "paid", channel: "web" },
  { id: "order-12", number: "#NX-88410", customer: "Hannah Whitfield", customerEmail: "hannah.w@nexuspro.app", date: "2026-06-28T09:12:00Z", total: 198, items: 2, status: "delivered", payment: "paid", channel: "web" },
];

export const customers: Customer[] = [
  { id: "cust-1", name: "Eleanor Reyes", email: "e.reyes@helixbio.com", location: "San Francisco, US", orders: 24, totalSpent: 48_320, avgOrderValue: 2013, lastOrderAt: "2026-06-30T08:14:00Z", segment: "vip" },
  { id: "cust-2", name: "Marcus Vetter", email: "m.vetter@northwind.io", location: "London, UK", orders: 12, totalSpent: 14_580, avgOrderValue: 1215, lastOrderAt: "2026-06-30T07:42:00Z", segment: "regular" },
  { id: "cust-3", name: "Linnea Holm", email: "l.holm@auroramobility.com", location: "Stockholm, SE", orders: 8, totalSpent: 9_240, avgOrderValue: 1155, lastOrderAt: "2026-06-30T06:18:00Z", segment: "regular" },
  { id: "cust-4", name: "Jamal Whitaker", email: "j.whitaker@lumenhealth.com", location: "Los Angeles, US", orders: 31, totalSpent: 62_140, avgOrderValue: 2005, lastOrderAt: "2026-06-29T22:30:00Z", segment: "vip" },
  { id: "cust-5", name: "Yuki Tanaka", email: "yuki@cobaltstudios.tv", location: "New York, US", orders: 4, totalSpent: 3_480, avgOrderValue: 870, lastOrderAt: "2026-06-29T18:14:00Z", segment: "at-risk" },
  { id: "cust-6", name: "Anika Patel", email: "a.patel@meridiancap.com", location: "New York, US", orders: 18, totalSpent: 38_920, avgOrderValue: 2162, lastOrderAt: "2026-06-29T15:01:00Z", segment: "vip" },
  { id: "cust-7", name: "Wen Li", email: "wen@tessellate.ai", location: "San Francisco, US", orders: 6, totalSpent: 5_840, avgOrderValue: 973, lastOrderAt: "2026-06-29T12:45:00Z", segment: "new" },
  { id: "cust-8", name: "Camila Restrepo", email: "c.restrepo@pampasfoods.com", location: "Bogotá, CO", orders: 14, totalSpent: 11_240, avgOrderValue: 803, lastOrderAt: "2026-06-29T10:22:00Z", segment: "regular" },
  { id: "cust-9", name: "Arjun Mehta", email: "a.mehta@industextiles.com", location: "Bengaluru, IN", orders: 9, totalSpent: 8_640, avgOrderValue: 960, lastOrderAt: "2026-06-28T19:18:00Z", segment: "regular" },
  { id: "cust-10", name: "Klaus Becker", email: "k.becker@vertexrobotics.com", location: "Munich, DE", orders: 22, totalSpent: 28_460, avgOrderValue: 1294, lastOrderAt: "2026-06-28T16:55:00Z", segment: "regular" },
];

export const customerSegments = [
  { name: "VIP", count: 248, share: 0.066, revenue: 412_800, color: "#465fff" },
  { name: "Regular", count: 2_482, share: 0.657, revenue: 684_200, color: "#0ba5ec" },
  { name: "New", count: 712, share: 0.188, revenue: 124_320, color: "#12b76a" },
  { name: "At-risk", count: 340, share: 0.089, revenue: 63_000, color: "#f79009" },
];

export const orderFunnel = [
  { stage: "Visited", value: 168_420, pct: 100 },
  { stage: "Added to cart", value: 32_180, pct: 19.1 },
  { stage: "Checkout", value: 12_540, pct: 7.4 },
  { stage: "Paid", value: 5_359, pct: 3.2 },
  { stage: "Fulfilled", value: 5_180, pct: 3.1 },
];
