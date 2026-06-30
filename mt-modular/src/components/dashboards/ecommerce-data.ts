/* ========================================================================
   Ecommerce dashboard mock data — realistic numbers across all sections.
   Totals are kept internally consistent:
     - Net revenue $284.9K, gross $317.4K, refunds $12.8K, discounts $19.7K
     - 5,359 orders, 5,102 paid, 86 failed, 171 pending
     - 64,023 sessions, 9,846 checkout started, 8.42% conversion
     - Category mix sums to 100% / $284.9K
   ======================================================================== */

/* ---- KPI 1: Net Revenue ---- */
export const netRevenueKpi = {
  value: 284920,
  display: '$284,920',
  change: '+12.4%',
  grossSales: 317400,
  refunds: 12800,
  discounts: 19700,
  profitMargin: 36.8,
  avgDailyRevenue: 9400,
  sparkline: [142, 168, 158, 184, 196, 212, 198, 224, 246, 232, 268, 284],
};

/* ---- KPI 2: Orders ---- */
export const ordersKpi = {
  value: 5359,
  display: '5,359',
  change: '+9.05%',
  paid: 5102,
  failed: 86,
  pending: 171,
  bars: [142, 168, 184, 162, 196, 212, 198, 224, 246, 232, 268, 284],
};

/* ---- KPI 3: Conversion Funnel ---- */
export const conversionKpi = {
  value: 8.42,
  display: '8.42%',
  change: '+6.0%',
  sessions: 64023,
  checkoutStarted: 9846,
  purchased: 5359,
  funnel: [64023, 38420, 14286, 9846, 5359],
};

/* ---- KPI 4: Cart Recovery ---- */
export const cartRecoveryKpi = {
  value: 38700,
  display: '$38.7K',
  change: '+4.1%',
  activeCarts: 412,
  idleOver20: 67,
  recoveryRate: 18.6,
  recoverableRevenue: 38700,
  emailsSent: 248,
  line: [22, 28, 26, 32, 30, 38, 42, 48, 52, 58, 64, 67],
};

/* ---- Revenue & Forecast chart ---- */
export type RevenuePoint = {
  date: string;
  net: number;       // net revenue
  gross: number;     // gross sales
  refunds: number;   // refunds (negative direction)
  orders: number;
  isForecast: boolean;
  campaign?: string;
};

// 30 days of data + 7-day forecast
export const revenueSeries: RevenuePoint[] = [
  { date: 'May 25', net: 7840, gross: 8680, refunds: 320, orders: 142, isForecast: false },
  { date: 'May 26', net: 8420, gross: 9340, refunds: 410, orders: 156, isForecast: false },
  { date: 'May 27', net: 9180, gross: 10240, refunds: 380, orders: 168, isForecast: false, campaign: 'Summer Sale' },
  { date: 'May 28', net: 11240, gross: 12680, refunds: 540, orders: 198, isForecast: false, campaign: 'Summer Sale' },
  { date: 'May 29', net: 10680, gross: 11920, refunds: 480, orders: 184, isForecast: false, campaign: 'Summer Sale' },
  { date: 'May 30', net: 9840, gross: 10920, refunds: 420, orders: 176, isForecast: false },
  { date: 'May 31', net: 8680, gross: 9620, refunds: 360, orders: 162, isForecast: false },
  { date: 'Jun 01', net: 9240, gross: 10280, refunds: 340, orders: 168, isForecast: false },
  { date: 'Jun 02', net: 10420, gross: 11680, refunds: 460, orders: 184, isForecast: false },
  { date: 'Jun 03', net: 11820, gross: 13240, refunds: 520, orders: 212, isForecast: false, campaign: 'Email Blast' },
  { date: 'Jun 04', net: 12640, gross: 14180, refunds: 580, orders: 224, isForecast: false, campaign: 'Email Blast' },
  { date: 'Jun 05', net: 11420, gross: 12720, refunds: 460, orders: 198, isForecast: false },
  { date: 'Jun 06', net: 9840, gross: 10920, refunds: 380, orders: 176, isForecast: false },
  { date: 'Jun 07', net: 9120, gross: 10120, refunds: 340, orders: 162, isForecast: false },
  { date: 'Jun 08', net: 8680, gross: 9640, refunds: 320, orders: 158, isForecast: false },
  { date: 'Jun 09', net: 9420, gross: 10480, refunds: 360, orders: 168, isForecast: false },
  { date: 'Jun 10', net: 10820, gross: 12080, refunds: 480, orders: 192, isForecast: false },
  { date: 'Jun 11', net: 12640, gross: 14120, refunds: 560, orders: 224, isForecast: false },
  { date: 'Jun 12', net: 18420, gross: 20680, refunds: 780, orders: 312, isForecast: false, campaign: 'iPhone Launch' },
  { date: 'Jun 13', net: 22640, gross: 25420, refunds: 920, orders: 384, isForecast: false, campaign: 'iPhone Launch' },
  { date: 'Jun 14', net: 19820, gross: 22240, refunds: 820, orders: 342, isForecast: false, campaign: 'iPhone Launch' },
  { date: 'Jun 15', net: 16420, gross: 18380, refunds: 680, orders: 286, isForecast: false },
  { date: 'Jun 16', net: 12840, gross: 14320, refunds: 540, orders: 226, isForecast: false },
  { date: 'Jun 17', net: 11420, gross: 12720, refunds: 480, orders: 202, isForecast: false },
  { date: 'Jun 18', net: 10680, gross: 11920, refunds: 440, orders: 188, isForecast: false },
  { date: 'Jun 19', net: 9840, gross: 10960, refunds: 400, orders: 174, isForecast: false },
  { date: 'Jun 20', net: 11240, gross: 12560, refunds: 460, orders: 198, isForecast: false },
  { date: 'Jun 21', net: 12680, gross: 14180, refunds: 520, orders: 224, isForecast: false },
  { date: 'Jun 22', net: 13420, gross: 15020, refunds: 580, orders: 236, isForecast: false },
  { date: 'Jun 23', net: 12840, gross: 14320, refunds: 540, orders: 224, isForecast: false },
  { date: 'Jun 24', net: 13240, gross: 14780, refunds: 540, orders: 232, isForecast: true },
  { date: 'Jun 25', net: 13820, gross: 15420, refunds: 560, orders: 242, isForecast: true },
  { date: 'Jun 26', net: 13420, gross: 14980, refunds: 540, orders: 236, isForecast: true },
  { date: 'Jun 27', net: 14280, gross: 15940, refunds: 580, orders: 250, isForecast: true },
  { date: 'Jun 28', net: 14620, gross: 16320, refunds: 600, orders: 256, isForecast: true },
  { date: 'Jun 29', net: 13820, gross: 15420, refunds: 560, orders: 242, isForecast: true },
  { date: 'Jun 30', net: 14420, gross: 16080, refunds: 580, orders: 252, isForecast: true },
];

/* ---- Checkout Funnel stages ---- */
export const checkoutStages = [
  { name: 'Sessions', count: 64023, color: '#465FFF' },
  { name: 'Product views', count: 38420, color: '#0BA5EC' },
  { name: 'Add to cart', count: 14286, color: '#12B76A' },
  { name: 'Checkout started', count: 9846, color: '#F79009' },
  { name: 'Purchased', count: 5359, color: '#7A5AF8' },
];

export const funnelInsight = 'Largest drop-off occurs between Product views and Add to cart.';

/* ---- Channel Performance ---- */
export type Channel = {
  name: string;
  sessions: number;
  revenue: number;
  conversion: number;
  cac: number;
  roas: string; // "5.4x" or "Organic"
  trend: 'up' | 'down' | 'flat';
  color: string;
};

export const channels: Channel[] = [
  { name: 'Google Shopping', sessions: 18420, revenue: 94200, conversion: 7.8, cac: 18, roas: '5.4x', trend: 'up', color: '#465FFF' },
  { name: 'Meta Ads', sessions: 14860, revenue: 61800, conversion: 5.1, cac: 24, roas: '3.8x', trend: 'up', color: '#7A5AF8' },
  { name: 'Organic Search', sessions: 12640, revenue: 52600, conversion: 8.9, cac: 0, roas: 'Organic', trend: 'up', color: '#12B76A' },
  { name: 'Email', sessions: 7420, revenue: 39400, conversion: 12.4, cac: 3, roas: '14.8x', trend: 'up', color: '#F79009' },
  { name: 'Direct', sessions: 6980, revenue: 28100, conversion: 6.2, cac: 0, roas: 'Direct', trend: 'flat', color: '#0BA5EC' },
  { name: 'Affiliates', sessions: 3703, revenue: 8800, conversion: 3.4, cac: 16, roas: '2.2x', trend: 'down', color: '#F04438' },
];

/* ---- Category Mix ---- */
export type Category = {
  name: string;
  revenue: number;
  display: string;
  share: number;
  margin: number;
  returnRate: number;
  color: string;
};

export const categories: Category[] = [
  { name: 'Electronics', revenue: 119700, display: '$119.7K', share: 42, margin: 38, returnRate: 3.2, color: '#465FFF' },
  { name: 'Accessories', revenue: 68300, display: '$68.3K', share: 24, margin: 52, returnRate: 2.1, color: '#12B76A' },
  { name: 'Wearables', revenue: 51200, display: '$51.2K', share: 18, margin: 44, returnRate: 4.6, color: '#F79009' },
  { name: 'Home & Audio', revenue: 45600, display: '$45.6K', share: 16, margin: 31, returnRate: 5.4, color: '#0BA5EC' },
];

/* ---- Product Performance ---- */
export type Product = {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenue: string;
  margin: number;
  stock: number;
  returnRate: number;
  trend: number[];
  badges: string[]; // 'Low stock' | 'Best seller' | 'High margin' | 'Return risk'
  stockTotal: number;
};

export const products: Product[] = [
  { id: 'p1', name: 'MacBook Pro 13"', category: 'Electronics', unitsSold: 1284, revenue: '$3.08M', margin: 38, stock: 142, returnRate: 2.4, trend: [12, 18, 14, 22, 28, 24, 32], badges: ['Best seller', 'High margin'], stockTotal: 200 },
  { id: 'p2', name: 'iPhone 15 Pro Max', category: 'Electronics', unitsSold: 1108, revenue: '$2.07M', margin: 42, stock: 14, returnRate: 3.1, trend: [22, 16, 28, 24, 30, 36, 34], badges: ['Low stock', 'Best seller'], stockTotal: 200 },
  { id: 'p3', name: 'Apple Watch Ultra 2', category: 'Wearables', unitsSold: 894, revenue: '$785K', margin: 44, stock: 86, returnRate: 4.6, trend: [8, 14, 18, 16, 22, 28, 30], badges: ['High margin'], stockTotal: 200 },
  { id: 'p4', name: 'AirPods Pro 2nd Gen', category: 'Home & Audio', unitsSold: 762, revenue: '$182K', margin: 52, stock: 28, returnRate: 5.8, trend: [14, 12, 18, 16, 14, 22, 26], badges: ['Low stock', 'Return risk'], stockTotal: 200 },
  { id: 'p5', name: 'iPad Pro 11"', category: 'Electronics', unitsSold: 654, revenue: '$709K', margin: 36, stock: 124, returnRate: 2.8, trend: [10, 12, 14, 16, 14, 18, 20], badges: ['High margin'], stockTotal: 200 },
  { id: 'p6', name: 'Studio Display 27"', category: 'Home & Audio', unitsSold: 348, revenue: '$556K', margin: 31, stock: 9, returnRate: 5.4, trend: [4, 6, 8, 10, 12, 14, 16], badges: ['Low stock', 'Return risk'], stockTotal: 200 },
];

/* ---- Inventory Risk ---- */
export type InventoryRisk = {
  name: string;
  unitsLeft: number;
  daysRemaining: number;
  severity: 'critical' | 'warning' | 'info';
  reorderStatus: string;
  supplierEta: string;
  reorderQty: number;
  stockTotal: number;
};

export const inventoryRisk: InventoryRisk[] = [
  { name: 'iPhone 15 Pro Max', unitsLeft: 14, daysRemaining: 2.1, severity: 'critical', reorderStatus: 'Reorder now', supplierEta: '7-10 days', reorderQty: 500, stockTotal: 200 },
  { name: 'AirPods Pro 2nd Gen', unitsLeft: 28, daysRemaining: 4.6, severity: 'critical', reorderStatus: 'Reorder now', supplierEta: '5-7 days', reorderQty: 300, stockTotal: 200 },
  { name: 'Studio Display 27"', unitsLeft: 9, daysRemaining: 0, severity: 'warning', reorderStatus: 'Reorder recommended', supplierEta: '14-21 days', reorderQty: 120, stockTotal: 200 },
];

/* ---- Fulfillment Queue ---- */
export const fulfillmentQueue = {
  readyToShip: 284,
  awaitingPickup: 96,
  delayed: 18,
  returned: 32,
  failedDelivery: 7,
};

/* ---- Realtime Monitor ---- */
export type RealtimeCard = {
  id: string;
  label: string;
  value: string;
  detail: string;
  icon: 'visitors' | 'carts' | 'payments' | 'reviews' | 'wishlists';
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  sparkline: number[];
};

export const realtimeCards: RealtimeCard[] = [
  { id: 'r1', label: 'Live visitors', value: '1,284', detail: 'Top: /products/iphone-15-pro', icon: 'visitors', trend: 'up', trendValue: '+8.4%', sparkline: [82, 96, 104, 124, 142, 168, 184, 192, 224, 248, 264, 284] },
  { id: 'r2', label: 'Active carts', value: '412', detail: '$38.7K recoverable value', icon: 'carts', trend: 'up', trendValue: '+4.1%', sparkline: [22, 28, 26, 32, 30, 38, 42, 48, 52, 58, 64, 67] },
  { id: 'r3', label: 'Payment failures', value: '18', detail: 'Stripe decline spike', icon: 'payments', trend: 'down', trendValue: '+12%', sparkline: [4, 6, 8, 6, 10, 12, 8, 14, 16, 12, 18, 18] },
  { id: 'r4', label: 'Reviews today', value: '64', detail: 'Avg rating 4.7', icon: 'reviews', trend: 'up', trendValue: '+24%', sparkline: [8, 12, 14, 10, 16, 18, 22, 26, 32, 38, 48, 64] },
  { id: 'r5', label: 'Wishlists', value: '248', detail: 'Top: Apple Watch Ultra 2', icon: 'wishlists', trend: 'up', trendValue: '+18%', sparkline: [22, 28, 26, 32, 30, 36, 42, 48, 58, 64, 76, 88] },
];

/* ---- Recent Orders ---- */
export type OrderStatus = 'Delivered' | 'Pending' | 'Shipped' | 'Cancelled' | 'Refunded';
export type PaymentStatus = 'Paid' | 'Refunded' | 'Failed' | 'Pending';
export type FulfillmentStatus = 'Packed' | 'Awaiting pickup' | 'Shipped' | 'Returned' | 'Delivered' | 'Processing';
export type RiskLevel = 'Low risk' | 'Medium risk' | 'High risk';

export type Order = {
  id: string;
  customer: string;
  channel: 'Web' | 'Mobile' | 'App';
  product: string;
  amount: string;
  payment: PaymentStatus;
  fulfillment: FulfillmentStatus;
  risk: RiskLevel;
  status: OrderStatus;
  date: string;
  qty: number;
};

export const orders: Order[] = [
  { id: 'OR-9081', customer: 'Darlene Robertson', channel: 'Web', product: 'MacBook Pro 13"', amount: '$2,399', payment: 'Paid', fulfillment: 'Packed', risk: 'Low risk', status: 'Delivered', date: 'Jun 23, 14:32', qty: 1 },
  { id: 'OR-9077', customer: 'Kristin Watson', channel: 'Mobile', product: 'Apple Watch Ultra 2', amount: '$879', payment: 'Paid', fulfillment: 'Awaiting pickup', risk: 'Low risk', status: 'Pending', date: 'Jun 23, 13:18', qty: 1 },
  { id: 'OR-9062', customer: 'Bessie Cooper', channel: 'Web', product: 'iPhone 15 Pro Max', amount: '$1,869', payment: 'Paid', fulfillment: 'Shipped', risk: 'Medium risk', status: 'Shipped', date: 'Jun 23, 11:42', qty: 1 },
  { id: 'OR-9054', customer: 'Albert Flores', channel: 'App', product: 'iPad Pro 11"', amount: '$1,699', payment: 'Refunded', fulfillment: 'Returned', risk: 'High risk', status: 'Cancelled', date: 'Jun 22, 18:24', qty: 1 },
  { id: 'OR-9048', customer: 'Jane Cooper', channel: 'Web', product: 'AirPods Pro 2nd Gen', amount: '$720', payment: 'Paid', fulfillment: 'Delivered', risk: 'Low risk', status: 'Delivered', date: 'Jun 22, 16:08', qty: 1 },
  { id: 'OR-9039', customer: 'Devon Lane', channel: 'Mobile', product: 'Studio Display 27"', amount: '$1,599', payment: 'Paid', fulfillment: 'Processing', risk: 'Medium risk', status: 'Pending', date: 'Jun 22, 14:42', qty: 1 },
  { id: 'OR-9028', customer: 'Cameron Williamson', channel: 'Web', product: 'Magic Keyboard', amount: '$476', payment: 'Paid', fulfillment: 'Shipped', risk: 'Low risk', status: 'Shipped', date: 'Jun 22, 11:18', qty: 2 },
  { id: 'OR-9015', customer: 'Esther Howard', channel: 'App', product: 'HomePod mini', amount: '$198', payment: 'Paid', fulfillment: 'Delivered', risk: 'Low risk', status: 'Delivered', date: 'Jun 21, 17:32', qty: 2 },
  { id: 'OR-9003', customer: 'Wade Warren', channel: 'Web', product: 'MacBook Air M3', amount: '$1,099', payment: 'Pending', fulfillment: 'Processing', risk: 'Medium risk', status: 'Pending', date: 'Jun 21, 12:48', qty: 1 },
  { id: 'OR-8994', customer: 'Marvin McKinney', channel: 'Mobile', product: 'AirPods Max', amount: '$549', payment: 'Paid', fulfillment: 'Delivered', risk: 'Low risk', status: 'Delivered', date: 'Jun 21, 09:14', qty: 1 },
];

/* ---- Customer Activity ---- */
export type ActivityEvent = {
  id: string;
  customer: string;
  action: string;
  detail: string;
  segment: 'VIP' | 'New customer' | 'Returning' | 'At-risk';
  time: string;
  amount?: string;
  icon: 'order' | 'cart' | 'subscribe' | 'refund' | 'review';
  tone: 'success' | 'warning' | 'brand' | 'error' | 'info';
};

export const customerActivity: ActivityEvent[] = [
  { id: 'a1', customer: 'Darlene Robertson', action: 'placed order', detail: '#OR-9081', segment: 'VIP', time: '3 min ago', amount: '$2,399', icon: 'order', tone: 'success' },
  { id: 'a2', customer: 'Kristin Watson', action: 'abandoned cart', detail: 'recovery email sent', segment: 'Returning', time: '12 min ago', amount: '$879', icon: 'cart', tone: 'warning' },
  { id: 'a3', customer: 'Bessie Cooper', action: 'subscribed to', detail: 'newsletter', segment: 'New customer', time: '28 min ago', icon: 'subscribe', tone: 'brand' },
  { id: 'a4', customer: 'Albert Flores', action: 'requested refund', detail: '#OR-9054', segment: 'At-risk', time: '1 hour ago', amount: '$1,699', icon: 'refund', tone: 'error' },
  { id: 'a5', customer: 'Jane Cooper', action: 'left a 5-star review', detail: 'AirPods Pro', segment: 'Returning', time: '2 hours ago', icon: 'review', tone: 'info' },
];

/* ---- Returns & Refunds ---- */
export const returnsData = {
  refundRate: 1.8,
  returnRequests: 126,
  refundValue: 12800,
  avgResolutionHrs: 18,
  reasons: [
    { reason: 'Damaged item', pct: 34, color: '#F04438' },
    { reason: 'Size/fit issue', pct: 24, color: '#F79009' },
    { reason: 'Changed mind', pct: 21, color: '#7A5AF8' },
    { reason: 'Late delivery', pct: 13, color: '#0BA5EC' },
    { reason: 'Other', pct: 8, color: '#64748B' },
  ],
};

/* ---- Customer Segments ---- */
export type Segment = {
  name: string;
  count: number;
  revenue: string;
  revenueValue: number;
  repeatRate: number;
  color: string;
};

export const customerSegments: Segment[] = [
  { name: 'New buyers', count: 428, revenue: '$42.6K', revenueValue: 42600, repeatRate: 18, color: '#465FFF' },
  { name: 'Returning customers', count: 2184, revenue: '$166.8K', revenueValue: 166800, repeatRate: 42, color: '#12B76A' },
  { name: 'VIP customers', count: 312, revenue: '$71.2K', revenueValue: 71200, repeatRate: 68, color: '#7A5AF8' },
  { name: 'At-risk customers', count: 94, revenue: '$4.3K', revenueValue: 4300, repeatRate: 9, color: '#F04438' },
];
