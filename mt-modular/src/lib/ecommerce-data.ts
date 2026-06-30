import type { CardBrand } from '@/components/dashboard/card-icons';

/* ------------------------------------------------------------------ */
/* Realistic e-commerce mock data                                      */
/* ------------------------------------------------------------------ */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
  status: 'Active' | 'Draft' | 'Archived';
  image: string;
  rating: number;
  reviews: number;
  sold: number;
  description: string;
  variants?: { name: string; value: string }[];
  tags: string[];
}

// Using Unsplash Source URLs for real product images
export const products: Product[] = [
  {
    id: 'PRD-001',
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Audio',
    price: 349,
    compareAtPrice: 429,
    stock: 142,
    sku: 'AUD-NC-001',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1284,
    sold: 3420,
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.',
    variants: [
      { name: 'Color', value: 'Midnight Black' },
      { name: 'Color', value: 'Silver White' },
    ],
    tags: ['featured', 'best-seller'],
  },
  {
    id: 'PRD-002',
    name: 'Smart Watch Series 8',
    category: 'Wearables',
    price: 399,
    compareAtPrice: 449,
    stock: 89,
    sku: 'WR-SW8-002',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 892,
    sold: 2180,
    description: 'Advanced health tracking, GPS, and a stunning always-on display. Water resistant to 50m.',
    variants: [
      { name: 'Size', value: '41mm' },
      { name: 'Size', value: '45mm' },
    ],
    tags: ['featured', 'new'],
  },
  {
    id: 'PRD-003',
    name: 'Mechanical Keyboard RGB',
    category: 'Accessories',
    price: 159,
    stock: 256,
    sku: 'ACC-KB-003',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 2104,
    sold: 5640,
    description: 'Hot-swappable mechanical keyboard with per-key RGB lighting and aluminum frame.',
    variants: [
      { name: 'Switch', value: 'Brown' },
      { name: 'Switch', value: 'Blue' },
      { name: 'Switch', value: 'Red' },
    ],
    tags: ['best-seller'],
  },
  {
    id: 'PRD-004',
    name: '4K Webcam Pro',
    category: 'Electronics',
    price: 199,
    compareAtPrice: 249,
    stock: 0,
    sku: 'ELC-WC-004',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 487,
    sold: 1240,
    description: 'Ultra HD 4K webcam with auto-focus, low-light correction, and built-in microphone.',
    tags: ['out-of-stock'],
  },
  {
    id: 'PRD-005',
    name: 'Portable Bluetooth Speaker',
    category: 'Audio',
    price: 89,
    stock: 318,
    sku: 'AUD-BS-005',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 1567,
    sold: 4280,
    description: 'Waterproof portable speaker with 20-hour battery and 360-degree sound.',
    tags: ['best-seller'],
  },
  {
    id: 'PRD-006',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 449,
    compareAtPrice: 599,
    stock: 42,
    sku: 'FUR-CH-006',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 723,
    sold: 980,
    description: 'Premium ergonomic chair with adjustable lumbar support and breathable mesh back.',
    tags: ['featured'],
  },
  {
    id: 'PRD-007',
    name: 'USB-C Hub 8-in-1',
    category: 'Accessories',
    price: 69,
    stock: 184,
    sku: 'ACC-HB-007',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 892,
    sold: 2840,
    description: '8-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and 100W power delivery.',
    tags: [],
  },
  {
    id: 'PRD-008',
    name: 'Wireless Mouse Precision',
    category: 'Accessories',
    price: 79,
    stock: 0,
    sku: 'ACC-MS-008',
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 612,
    sold: 1840,
    description: 'Ergonomic wireless mouse with precision sensor and customizable buttons.',
    tags: [],
  },
  {
    id: 'PRD-009',
    name: 'Standing Desk Converter',
    category: 'Furniture',
    price: 289,
    compareAtPrice: 349,
    stock: 67,
    sku: 'FUR-SD-009',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 348,
    sold: 620,
    description: 'Adjustable standing desk converter with gas spring mechanism and spacious work surface.',
    tags: [],
  },
  {
    id: 'PRD-010',
    name: 'External SSD 1TB',
    category: 'Electronics',
    price: 129,
    stock: 234,
    sku: 'ELC-SS-010',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1456,
    sold: 3920,
    description: 'Ultra-fast portable SSD with USB-C, 1050MB/s read speed, and rugged design.',
    tags: ['best-seller'],
  },
  {
    id: 'PRD-011',
    name: 'Smart Home Hub',
    category: 'Smart Home',
    price: 149,
    stock: 0,
    sku: 'SMT-HB-011',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=300&fit=crop',
    rating: 4.3,
    reviews: 267,
    sold: 480,
    description: 'Central hub for smart home devices with voice control and automation support.',
    tags: ['new'],
  },
  {
    id: 'PRD-012',
    name: 'Wireless Charger Pad',
    category: 'Accessories',
    price: 39,
    compareAtPrice: 59,
    stock: 412,
    sku: 'ACC-WC-012',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1591290619762-c5e0bf3c2dc8?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 678,
    sold: 5240,
    description: 'Fast wireless charging pad with 15W output and LED indicator.',
    tags: ['best-seller'],
  },
];

export const productCategories = ['Audio', 'Wearables', 'Accessories', 'Electronics', 'Furniture', 'Smart Home'];

/* ------------------------------------------------------------------ */
/* Payment methods                                                     */
/* ------------------------------------------------------------------ */
export interface PaymentMethod {
  id: string;
  brand: CardBrand;
  last4: string;
  expMonth: number;
  expYear: number;
  holderName: string;
  isDefault: boolean;
  billingAddress: {
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'pm-1',
    brand: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2027,
    holderName: 'Arun Pandian',
    isDefault: true,
    billingAddress: {
      line1: '123 Market St, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94103',
      country: 'United States',
    },
  },
  {
    id: 'pm-2',
    brand: 'mastercard',
    last4: '5555',
    expMonth: 8,
    expYear: 2026,
    holderName: 'Arun Pandian',
    isDefault: false,
    billingAddress: {
      line1: '123 Market St, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94103',
      country: 'United States',
    },
  },
  {
    id: 'pm-3',
    brand: 'amex',
    last4: '8431',
    expMonth: 3,
    expYear: 2028,
    holderName: 'Arun Pandian',
    isDefault: false,
    billingAddress: {
      line1: '123 Market St, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94103',
      country: 'United States',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Billing history                                                     */
/* ------------------------------------------------------------------ */
export interface BillingRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  method: CardBrand;
  invoiceId: string;
}

export const billingHistory: BillingRecord[] = [
  { id: 'B-001', date: 'Jun 19, 2026', description: 'Pro plan — monthly subscription', amount: 84, status: 'Paid', method: 'visa', invoiceId: 'INV-2042' },
  { id: 'B-002', date: 'Jun 12, 2026', description: 'Additional 5 seats', amount: 420, status: 'Paid', method: 'visa', invoiceId: 'INV-2038' },
  { id: 'B-003', date: 'May 19, 2026', description: 'Pro plan — monthly subscription', amount: 84, status: 'Paid', method: 'mastercard', invoiceId: 'INV-2018' },
  { id: 'B-004', date: 'May 03, 2026', description: 'API overage — 1.2M requests', amount: 240, status: 'Paid', method: 'mastercard', invoiceId: 'INV-2014' },
  { id: 'B-005', date: 'Apr 19, 2026', description: 'Pro plan — monthly subscription', amount: 84, status: 'Paid', method: 'amex', invoiceId: 'INV-2002' },
  { id: 'B-006', date: 'Apr 02, 2026', description: 'Refund — duplicate charge', amount: -84, status: 'Refunded', method: 'amex', invoiceId: 'INV-1998' },
  { id: 'B-007', date: 'Mar 19, 2026', description: 'Pro plan — monthly subscription', amount: 84, status: 'Paid', method: 'visa', invoiceId: 'INV-1984' },
  { id: 'B-008', date: 'Mar 03, 2026', description: 'Enterprise upgrade — annual', amount: 5760, status: 'Paid', method: 'visa', invoiceId: 'INV-1978' },
];

/* ------------------------------------------------------------------ */
/* Invoices                                                            */
/* ------------------------------------------------------------------ */
export interface Invoice {
  id: string;
  customer: string;
  customerEmail: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Draft';
  issueDate: string;
  dueDate: string;
  paidDate: string | null;
  items: { description: string; qty: number; rate: number; amount: number }[];
  notes?: string;
  subtotal: number;
  tax: number;
  total: number;
}

export const invoices: Invoice[] = [
  {
    id: 'INV-2042',
    customer: 'Acme Corporation',
    customerEmail: 'billing@acme.com',
    amount: 48200,
    status: 'Paid',
    issueDate: 'Jun 01, 2026',
    dueDate: 'Jun 15, 2026',
    paidDate: 'Jun 12, 2026',
    items: [
      { description: 'Enterprise plan — 240 seats', qty: 240, rate: 200, amount: 48000 },
      { description: 'Onboarding & training', qty: 1, rate: 200, amount: 200 },
    ],
    subtotal: 48200,
    tax: 0,
    total: 48200,
  },
  {
    id: 'INV-2038',
    customer: 'Stark Industries',
    customerEmail: 'accounts@stark.com',
    amount: 84400,
    status: 'Paid',
    issueDate: 'Jun 04, 2026',
    dueDate: 'Jun 18, 2026',
    paidDate: 'Jun 14, 2026',
    items: [
      { description: 'Enterprise plan — 420 seats', qty: 420, rate: 200, amount: 84000 },
      { description: 'Custom integration', qty: 1, rate: 400, amount: 400 },
    ],
    subtotal: 84400,
    tax: 0,
    total: 84400,
  },
  {
    id: 'INV-2032',
    customer: 'Wayne Enterprises',
    customerEmail: 'finance@wayne.co',
    amount: 32800,
    status: 'Pending',
    issueDate: 'Jun 08, 2026',
    dueDate: 'Jun 22, 2026',
    paidDate: null,
    items: [
      { description: 'Pro plan — 164 seats', qty: 164, rate: 200, amount: 32800 },
    ],
    subtotal: 32800,
    tax: 0,
    total: 32800,
  },
  {
    id: 'INV-2028',
    customer: 'Umbrella Corp',
    customerEmail: 'billing@umbrella.co',
    amount: 18400,
    status: 'Overdue',
    issueDate: 'May 18, 2026',
    dueDate: 'Jun 01, 2026',
    paidDate: null,
    items: [
      { description: 'Pro plan — 92 seats', qty: 92, rate: 200, amount: 18400 },
    ],
    subtotal: 18400,
    tax: 0,
    total: 18400,
  },
  {
    id: 'INV-2024',
    customer: 'Cyberdyne Systems',
    customerEmail: 'ap@cyberdyne.ai',
    amount: 124000,
    status: 'Pending',
    issueDate: 'Jun 12, 2026',
    dueDate: 'Jun 26, 2026',
    paidDate: null,
    items: [
      { description: 'Enterprise plan — 620 seats', qty: 620, rate: 200, amount: 124000 },
    ],
    subtotal: 124000,
    tax: 0,
    total: 124000,
  },
  {
    id: 'INV-2018',
    customer: 'Initech LLC',
    customerEmail: 'billing@initech.com',
    amount: 8200,
    status: 'Paid',
    issueDate: 'Jun 14, 2026',
    dueDate: 'Jun 28, 2026',
    paidDate: 'Jun 19, 2026',
    items: [
      { description: 'Pro plan — 41 seats', qty: 41, rate: 200, amount: 8200 },
    ],
    subtotal: 8200,
    tax: 0,
    total: 8200,
  },
  {
    id: 'INV-2014',
    customer: 'Hooli Inc.',
    customerEmail: 'finance@hooli.com',
    amount: 184000,
    status: 'Draft',
    issueDate: 'Jun 18, 2026',
    dueDate: 'Jul 02, 2026',
    paidDate: null,
    items: [
      { description: 'Enterprise plan — 920 seats', qty: 920, rate: 200, amount: 184000 },
    ],
    subtotal: 184000,
    tax: 0,
    total: 184000,
  },
  {
    id: 'INV-2008',
    customer: 'Pied Piper',
    customerEmail: 'richard@piedpiper.com',
    amount: 12400,
    status: 'Overdue',
    issueDate: 'May 12, 2026',
    dueDate: 'May 26, 2026',
    paidDate: null,
    items: [
      { description: 'Pro plan — 62 seats', qty: 62, rate: 200, amount: 12400 },
    ],
    subtotal: 12400,
    tax: 0,
    total: 12400,
  },
];

/* ------------------------------------------------------------------ */
/* Transactions                                                        */
/* ------------------------------------------------------------------ */
export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed' | 'Refunded';
  method: CardBrand;
  last4: string;
  type: 'Payment' | 'Refund' | 'Subscription' | 'Payout';
  date: string;
  time: string;
  description: string;
}

export const transactions: Transaction[] = [
  { id: 'TXN-9081', customer: 'Darlene Robertson', email: 'darlene@example.com', amount: 2399, status: 'Success', method: 'visa', last4: '4242', type: 'Payment', date: 'Jun 19, 2026', time: '2:48 PM', description: 'MacBook Pro 13" — Order #OR-9081' },
  { id: 'TXN-9077', customer: 'Kristin Watson', email: 'kristin@example.com', amount: 879, status: 'Success', method: 'mastercard', last4: '5555', type: 'Payment', date: 'Jun 18, 2026', time: '4:22 PM', description: 'Apple Watch Ultra — Order #OR-9077' },
  { id: 'TXN-9062', customer: 'Bessie Cooper', email: 'bessie@example.com', amount: 1869, status: 'Success', method: 'amex', last4: '8431', type: 'Payment', date: 'Jun 17, 2026', time: '11:14 AM', description: 'iPhone 15 Pro Max — Order #OR-9062' },
  { id: 'TXN-9054', customer: 'Albert Flores', email: 'albert@example.com', amount: 1699, status: 'Failed', method: 'visa', last4: '1234', type: 'Payment', date: 'Jun 16, 2026', time: '9:08 AM', description: 'iPad Pro 11" — Order #OR-9054 (card declined)' },
  { id: 'TXN-9048', customer: 'Jane Cooper', email: 'jane@example.com', amount: 720, status: 'Success', method: 'visa', last4: '4242', type: 'Payment', date: 'Jun 15, 2026', time: '3:42 PM', description: 'AirPods Pro x3 — Order #OR-9048' },
  { id: 'TXN-9039', customer: 'Devon Lane', email: 'devon@example.com', amount: 1599, status: 'Refunded', method: 'mastercard', last4: '5555', type: 'Refund', date: 'Jun 14, 2026', time: '10:22 AM', description: 'Studio Display — Order #OR-9039 (returned)' },
  { id: 'TXN-9034', customer: 'Cameron Williamson', email: 'cameron@example.com', amount: 476, status: 'Success', method: 'amex', last4: '8431', type: 'Payment', date: 'Jun 13, 2026', time: '6:18 PM', description: 'Magic Keyboard x4 — Order #OR-9028' },
  { id: 'TXN-9030', customer: 'Sara Nguyen', email: 'sara@mtverse.io', amount: 84, status: 'Success', method: 'visa', last4: '4242', type: 'Subscription', date: 'Jun 13, 2026', time: '2:00 AM', description: 'Pro plan — monthly subscription' },
  { id: 'TXN-9028', customer: 'Esther Howard', email: 'esther@example.com', amount: 198, status: 'Success', method: 'mastercard', last4: '5555', type: 'Payment', date: 'Jun 12, 2026', time: '8:30 AM', description: 'HomePod mini x2 — Order #OR-9015' },
  { id: 'TXN-9022', customer: 'Wade Warren', email: 'wade@example.com', amount: 1099, status: 'Pending', method: 'discover', last4: '6011', type: 'Payment', date: 'Jun 11, 2026', time: '5:14 PM', description: 'MacBook Air M3 — Order #OR-9003 (reviewing)' },
  { id: 'TXN-9018', customer: 'Acme Corporation', email: 'billing@acme.com', amount: 48200, status: 'Success', method: 'visa', last4: '4242', type: 'Payout', date: 'Jun 12, 2026', time: '12:00 PM', description: 'Invoice INV-2042 payout' },
  { id: 'TXN-9014', customer: 'Stark Industries', email: 'accounts@stark.com', amount: 84400, status: 'Success', method: 'visa', last4: '4242', type: 'Payout', date: 'Jun 14, 2026', time: '12:00 PM', description: 'Invoice INV-2038 payout' },
];

export const customers = [
  { name: 'Darlene Robertson', email: 'darlene@example.com', company: 'Personal', location: 'San Francisco, US' },
  { name: 'Kristin Watson', email: 'kristin@example.com', company: 'Personal', location: 'Austin, US' },
  { name: 'Bessie Cooper', email: 'bessie@example.com', company: 'Personal', location: 'New York, US' },
  { name: 'Albert Flores', email: 'albert@example.com', company: 'Flores Studio', location: 'Miami, US' },
  { name: 'Jane Cooper', email: 'jane@example.com', company: 'Personal', location: 'Seattle, US' },
  { name: 'Devon Lane', email: 'devon@example.com', company: 'Lane Consulting', location: 'Denver, US' },
  { name: 'Cameron Williamson', email: 'cameron@example.com', company: 'Williamson Co', location: 'Portland, US' },
  { name: 'Esther Howard', email: 'esther@example.com', company: 'Personal', location: 'Chicago, US' },
  { name: 'Wade Warren', email: 'wade@example.com', company: 'Warren LLC', location: 'Phoenix, US' },
  { name: 'Acme Corporation', email: 'billing@acme.com', company: 'Acme Corp', location: 'San Francisco, US' },
  { name: 'Stark Industries', email: 'accounts@stark.com', company: 'Stark', location: 'Malibu, US' },
  { name: 'Wayne Enterprises', email: 'finance@wayne.co', company: 'Wayne', location: 'Gotham, US' },
];
