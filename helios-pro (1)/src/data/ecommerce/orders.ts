export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Refunded"
  | "On hold";

export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded" | "Partially refunded";

export type FulfillmentStatus = "Unfulfilled" | "Picking" | "Packed" | "Shipped" | "Delivered";

export type OrderItem = {
  id: string;
  productId: string;
  sku: string;
  name: string;
  image: string;
  qty: number;
  price: number;
  variant?: string;
};

export type OrderTimelineEvent = {
  title: string;
  description?: string;
  time: string;
  tone: "primary" | "accent" | "violet" | "info" | "rose" | "success" | "danger";
};

export type Order = {
  id: string;
  customer: string;
  customerEmail: string;
  customerAvatar?: string;
  date: string;
  time: string;
  status: OrderStatus;
  payment: PaymentStatus;
  fulfillment: FulfillmentStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  discountCode?: string;
  channel: "Web" | "Mobile app" | "POS" | "Marketplace";
  items: OrderItem[];
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone?: string;
  };
  billingAddress: {
    name: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  shippingMethod: string;
  tracking?: { carrier: string; number: string; url?: string };
  timeline: OrderTimelineEvent[];
  notes?: string;
};

const img = (seed: string, w = 120, h = 120) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const orders: Order[] = [
  {
    id: "HLP-20431",
    customer: "Grace Whitfield",
    customerEmail: "grace.w@example.com",
    date: "Jan 24, 2025",
    time: "10:42 AM",
    status: "Processing",
    payment: "Paid",
    fulfillment: "Picking",
    total: 428.0,
    subtotal: 408.0,
    shipping: 0,
    tax: 20.0,
    discount: 0,
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1001", sku: "HLP-AERO-01", name: "Helios Aero Wireless Headphones", image: img("helios-aero-headphones"), qty: 1, price: 249, variant: "Midnight" },
      { id: "oi2", productId: "PRD-1011", sku: "HLP-PEN-11", name: "Helios Stylus Pro", image: img("helios-stylus-pro"), qty: 1, price: 99, variant: "Silver" },
      { id: "oi3", productId: "PRD-1004", sku: "HLP-LAMP-04", name: "Helios Ray Desk Lamp", image: img("helios-ray-lamp"), qty: 1, price: 89, variant: "Aluminum" },
    ],
    shippingAddress: {
      name: "Grace Whitfield",
      line1: "27 Maple Court",
      line2: "Apt 4B",
      city: "Portland",
      state: "OR",
      zip: "97205",
      country: "United States",
      phone: "+1 (503) 555-0142",
    },
    billingAddress: {
      name: "Grace Whitfield",
      line1: "27 Maple Court",
      city: "Portland",
      state: "OR",
      zip: "97205",
      country: "United States",
    },
    paymentMethod: "Visa •••• 4242",
    shippingMethod: "Free standard shipping (3-5 days)",
    notes: "Gift wrap requested.",
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web checkout", time: "Jan 24, 10:42 AM", tone: "primary" },
      { title: "Payment captured", description: "$428.00 charged to Visa •••• 4242", time: "Jan 24, 10:43 AM", tone: "success" },
      { title: "Picking started", description: "WMS picked by Aarav S.", time: "Jan 24, 11:15 AM", tone: "accent" },
      { title: "Packed", description: "Awaiting", time: "Pending", tone: "info" },
      { title: "Shipped", description: "Awaiting", time: "Pending", tone: "info" },
    ],
  },
  {
    id: "HLP-20430",
    customer: "Henrik Sorensen",
    customerEmail: "henrik.s@example.dk",
    date: "Jan 24, 2025",
    time: "08:11 AM",
    status: "Shipped",
    payment: "Paid",
    fulfillment: "Shipped",
    total: 179.0,
    subtotal: 179.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Mobile app",
    items: [
      { id: "oi1", productId: "PRD-1008", sku: "HLP-KEY-08", name: "Helios Mechanical Keyboard", image: img("helios-keyboard"), qty: 1, price: 159, variant: "Banana Tactile / Carbon" },
      { id: "oi2", productId: "PRD-1011", sku: "HLP-PEN-11", name: "Helios Stylus Pro", image: img("helios-stylus-pro"), qty: 1, price: 99, variant: "Space Gray" },
    ],
    shippingAddress: {
      name: "Henrik Sorensen",
      line1: "Bredgade 42, 3. tv",
      city: "Copenhagen",
      state: "Capital Region",
      zip: "1260",
      country: "Denmark",
      phone: "+45 32 14 22 88",
    },
    billingAddress: {
      name: "Henrik Sorensen",
      line1: "Bredgade 42, 3. tv",
      city: "Copenhagen",
      state: "Capital Region",
      zip: "1260",
      country: "Denmark",
    },
    paymentMethod: "Mastercard •••• 5512",
    shippingMethod: "DHL Express International (2-4 days)",
    tracking: { carrier: "DHL", number: "JD0204800034512345678", url: "#" },
    timeline: [
      { title: "Order placed", description: "Customer submitted order via mobile app", time: "Jan 24, 08:11 AM", tone: "primary" },
      { title: "Payment captured", description: "€179.00 charged to Mastercard •••• 5512", time: "Jan 24, 08:12 AM", tone: "success" },
      { title: "Packed", description: "Box sealed, label printed", time: "Jan 24, 09:30 AM", tone: "accent" },
      { title: "Shipped", description: "Picked up by DHL Express", time: "Jan 24, 14:55 PM", tone: "violet" },
      { title: "Out for delivery", description: "Awaiting", time: "Pending", tone: "info" },
    ],
  },
  {
    id: "HLP-20429",
    customer: "Mei Lin",
    customerEmail: "mei.lin@example.cn",
    date: "Jan 23, 2025",
    time: "9:48 PM",
    status: "Delivered",
    payment: "Paid",
    fulfillment: "Delivered",
    total: 899.0,
    subtotal: 899.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1009", sku: "HLP-MON-09", name: 'Helios 34" Ultrawide Monitor', image: img("helios-ultrawide-monitor"), qty: 1, price: 899, variant: "Standard stand" },
    ],
    shippingAddress: {
      name: "Mei Lin",
      line1: "Room 1804, Tower 2",
      line2: "Skyline Gardens, 88 Binjiang Ave",
      city: "Shanghai",
      state: "Shanghai",
      zip: "200120",
      country: "China",
      phone: "+86 138 0011 4477",
    },
    billingAddress: {
      name: "Mei Lin",
      line1: "Room 1804, Tower 2, Skyline Gardens",
      city: "Shanghai",
      state: "Shanghai",
      zip: "200120",
      country: "China",
    },
    paymentMethod: "Alipay",
    shippingMethod: "SF Express Standard (2 days)",
    tracking: { carrier: "SF Express", number: "SF1029384756102938", url: "#" },
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web", time: "Jan 23, 09:48 PM", tone: "primary" },
      { title: "Payment captured", description: "¥6,299 paid via Alipay", time: "Jan 23, 09:49 PM", tone: "success" },
      { title: "Packed", description: "Palletized, stretch-wrapped", time: "Jan 24, 07:15 AM", tone: "accent" },
      { title: "Shipped", description: "Picked up by SF Express", time: "Jan 24, 11:20 AM", tone: "violet" },
      { title: "Delivered", description: "Signed for by recipient", time: "Jan 25, 03:08 PM", tone: "success" },
    ],
  },
  {
    id: "HLP-20428",
    customer: "Rafael Costa",
    customerEmail: "rafael.c@example.br",
    date: "Jan 23, 2025",
    time: "4:22 PM",
    status: "Pending",
    payment: "Pending",
    fulfillment: "Unfulfilled",
    total: 348.0,
    subtotal: 348.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1010", sku: "HLP-HUB-10", name: "Helios Thunderbolt Dock", image: img("helios-thunderbolt-dock"), qty: 1, price: 249, variant: "0.8m Thunderbolt" },
      { id: "oi2", productId: "PRD-1006", sku: "HLP-CAM-06", name: "Helios 4K Webcam", image: img("helios-4k-webcam"), qty: 1, price: 99, variant: "90° FoV" },
    ],
    shippingAddress: {
      name: "Rafael Costa",
      line1: "Rua das Flores, 1234 - Apt 92",
      city: "São Paulo",
      state: "SP",
      zip: "01310-100",
      country: "Brazil",
      phone: "+55 11 98765 4321",
    },
    billingAddress: {
      name: "Rafael Costa",
      line1: "Rua das Flores, 1234 - Apt 92",
      city: "São Paulo",
      state: "SP",
      zip: "01310-100",
      country: "Brazil",
    },
    paymentMethod: "Boleto (awaiting payment)",
    shippingMethod: "Standard shipping (5-8 days)",
    notes: "Customer has 3 days to complete boleto payment before order is cancelled.",
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web", time: "Jan 23, 04:22 PM", tone: "primary" },
      { title: "Awaiting payment", description: "Boleto generated, expires Jan 26", time: "Jan 23, 04:22 PM", tone: "accent" },
      { title: "Payment captured", description: "Awaiting", time: "Pending", tone: "info" },
    ],
  },
  {
    id: "HLP-20427",
    customer: "Ingrid Larsen",
    customerEmail: "ingrid.l@example.no",
    date: "Jan 22, 2025",
    time: "1:09 PM",
    status: "Cancelled",
    payment: "Refunded",
    fulfillment: "Unfulfilled",
    total: 549.0,
    subtotal: 549.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1005", sku: "HLP-CHAIR-05", name: "Helios Ergo Chair", image: img("helios-ergo-chair"), qty: 1, price: 549, variant: "Graphite / Adjustable headrest" },
    ],
    shippingAddress: {
      name: "Ingrid Larsen",
      line1: "Storgata 18, 4. etg",
      city: "Oslo",
      state: "Oslo",
      zip: "0184",
      country: "Norway",
      phone: "+47 22 14 88 56",
    },
    billingAddress: {
      name: "Ingrid Larsen",
      line1: "Storgata 18, 4. etg",
      city: "Oslo",
      state: "Oslo",
      zip: "0184",
      country: "Norway",
    },
    paymentMethod: "Visa •••• 8801 (refunded)",
    shippingMethod: "Standard shipping",
    notes: "Customer cancelled — found a local alternative.",
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web", time: "Jan 22, 01:09 PM", tone: "primary" },
      { title: "Payment captured", description: "$549.00 charged to Visa •••• 8801", time: "Jan 22, 01:10 PM", tone: "success" },
      { title: "Cancellation requested", description: "Customer cancelled via self-service", time: "Jan 22, 03:48 PM", tone: "danger" },
      { title: "Refund issued", description: "$549.00 refunded to Visa •••• 8801", time: "Jan 22, 04:30 PM", tone: "info" },
    ],
  },
  {
    id: "HLP-20426",
    customer: "Tobias Brandt",
    customerEmail: "tobias.b@example.de",
    date: "Jan 22, 2025",
    time: "11:30 AM",
    status: "Delivered",
    payment: "Paid",
    fulfillment: "Delivered",
    total: 749.0,
    subtotal: 749.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1007", sku: "HLP-DESK-07", name: "Helios Standing Desk", image: img("helios-standing-desk"), qty: 1, price: 749, variant: "Bamboo / Black frame" },
    ],
    shippingAddress: {
      name: "Tobias Brandt",
      line1: "Schönhauser Allee 88",
      line2: "Aufgang 2, 3. OG",
      city: "Berlin",
      state: "Berlin",
      zip: "10437",
      country: "Germany",
      phone: "+49 30 4490 1234",
    },
    billingAddress: {
      name: "Tobias Brandt",
      line1: "Schönhauser Allee 88",
      city: "Berlin",
      state: "Berlin",
      zip: "10437",
      country: "Germany",
    },
    paymentMethod: "SEPA Direct Debit",
    shippingMethod: "DPD Standard (3 days)",
    tracking: { carrier: "DPD", number: "DPD02094857102938", url: "#" },
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web", time: "Jan 22, 11:30 AM", tone: "primary" },
      { title: "Payment captured", description: "€699 SEPA debit scheduled", time: "Jan 22, 11:31 AM", tone: "success" },
      { title: "Packed", description: "Freight pallet labeled", time: "Jan 23, 08:00 AM", tone: "accent" },
      { title: "Shipped", description: "Picked up by DPD Freight", time: "Jan 23, 02:15 PM", tone: "violet" },
      { title: "Delivered", description: "Signed for by recipient", time: "Jan 26, 10:22 AM", tone: "success" },
    ],
  },
  {
    id: "HLP-20425",
    customer: "Aiko Yamada",
    customerEmail: "aiko.y@example.jp",
    date: "Jan 21, 2025",
    time: "9:14 PM",
    status: "On hold",
    payment: "Partially refunded",
    fulfillment: "Unfulfilled",
    total: 258.0,
    subtotal: 258.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Marketplace",
    items: [
      { id: "oi1", productId: "PRD-1014", sku: "HLP-PWR-14", name: "Helios Power Bank 20K", image: img("helios-power-bank"), qty: 2, price: 79, variant: "Carbon" },
      { id: "oi2", productId: "PRD-1012", sku: "HLP-CHG-12", name: "Helios 100W GaN Charger", image: img("helios-gan-charger"), qty: 1, price: 69, variant: "US" },
      { id: "oi3", productId: "PRD-1002", sku: "HLP-BUDS-02", name: "Helios Buds Pro", image: img("helios-buds-pro"), qty: 0, price: 179, variant: "Graphite" },
    ],
    shippingAddress: {
      name: "Aiko Yamada",
      line1: "3-12-7 Ebisu",
      line2: "Shibuya-ku",
      city: "Tokyo",
      state: "Tokyo",
      zip: "150-0013",
      country: "Japan",
      phone: "+81 3 5421 8800",
    },
    billingAddress: {
      name: "Aiko Yamada",
      line1: "3-12-7 Ebisu, Shibuya-ku",
      city: "Tokyo",
      state: "Tokyo",
      zip: "150-0013",
      country: "Japan",
    },
    paymentMethod: "JCB •••• 1188",
    shippingMethod: "Yamato Transport (next day)",
    notes: "Buds Pro out of stock — partially refunded. Customer contacted to confirm replacement.",
    timeline: [
      { title: "Order placed", description: "Customer submitted order via Amazon marketplace", time: "Jan 21, 09:14 PM", tone: "primary" },
      { title: "Payment captured", description: "¥38,500 authorized", time: "Jan 21, 09:15 PM", tone: "success" },
      { title: "On hold", description: "Item Buds Pro out of stock", time: "Jan 21, 09:30 PM", tone: "accent" },
      { title: "Partial refund issued", description: "¥19,890 refunded for out-of-stock item", time: "Jan 22, 10:00 AM", tone: "info" },
    ],
  },
  {
    id: "HLP-20424",
    customer: "Daniel Chen",
    customerEmail: "daniel.c@example.com",
    date: "Jan 21, 2025",
    time: "3:50 PM",
    status: "Shipped",
    payment: "Paid",
    fulfillment: "Shipped",
    total: 508.0,
    subtotal: 508.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1003", sku: "HLP-WATCH-03", name: "Helios Solar Watch", image: img("helios-solar-watch"), qty: 1, price: 329, variant: "46mm / Titanium band" },
      { id: "oi2", productId: "PRD-1014", sku: "HLP-PWR-14", name: "Helios Power Bank 20K", image: img("helios-power-bank"), qty: 1, price: 79, variant: "Stone" },
      { id: "oi3", productId: "PRD-1012", sku: "HLP-CHG-12", name: "Helios 100W GaN Charger", image: img("helios-gan-charger"), qty: 1, price: 69, variant: "US" },
    ],
    shippingAddress: {
      name: "Daniel Chen",
      line1: "488 Bryant St, Suite 200",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
      phone: "+1 (415) 555-0199",
    },
    billingAddress: {
      name: "Daniel Chen",
      line1: "488 Bryant St, Suite 200",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States",
    },
    paymentMethod: "Apple Pay (Visa •••• 9921)",
    shippingMethod: "UPS Ground (3 days)",
    tracking: { carrier: "UPS", number: "1Z204E5W0498371529", url: "#" },
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web", time: "Jan 21, 03:50 PM", tone: "primary" },
      { title: "Payment captured", description: "$508.00 charged via Apple Pay", time: "Jan 21, 03:51 PM", tone: "success" },
      { title: "Packed", description: "Box sealed, label printed", time: "Jan 22, 09:15 AM", tone: "accent" },
      { title: "Shipped", description: "Picked up by UPS Ground", time: "Jan 22, 05:40 PM", tone: "violet" },
      { title: "Out for delivery", description: "Awaiting", time: "Pending", tone: "info" },
    ],
  },
  {
    id: "HLP-20423",
    customer: "Sofia Mendes",
    customerEmail: "sofia.m@example.com",
    date: "Jan 20, 2025",
    time: "10:22 AM",
    status: "Delivered",
    payment: "Paid",
    fulfillment: "Delivered",
    total: 249.0,
    subtotal: 229.0,
    shipping: 0,
    tax: 20.0,
    discount: 20.0,
    discountCode: "WELCOME10",
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1001", sku: "HLP-AERO-01", name: "Helios Aero Wireless Headphones", image: img("helios-aero-headphones"), qty: 1, price: 249, variant: "Sand / Travel Kit" },
    ],
    shippingAddress: {
      name: "Sofia Mendes",
      line1: "12 Rua Garrett",
      city: "Lisbon",
      state: "Lisbon",
      zip: "1200-203",
      country: "Portugal",
      phone: "+351 21 320 8800",
    },
    billingAddress: {
      name: "Sofia Mendes",
      line1: "12 Rua Garrett",
      city: "Lisbon",
      state: "Lisbon",
      zip: "1200-203",
      country: "Portugal",
    },
    paymentMethod: "MB Way",
    shippingMethod: "CTT Express (1 day)",
    tracking: { carrier: "CTT", number: "RR123456789PT", url: "#" },
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web", time: "Jan 20, 10:22 AM", tone: "primary" },
      { title: "Payment captured", description: "€229 paid via MB Way", time: "Jan 20, 10:23 AM", tone: "success" },
      { title: "Packed", description: "Box sealed, label printed", time: "Jan 20, 11:45 AM", tone: "accent" },
      { title: "Shipped", description: "Picked up by CTT Express", time: "Jan 20, 04:30 PM", tone: "violet" },
      { title: "Delivered", description: "Signed for by recipient", time: "Jan 21, 11:08 AM", tone: "success" },
    ],
  },
  {
    id: "HLP-20422",
    customer: "Aarav Sharma",
    customerEmail: "aarav.s@example.com",
    date: "Jan 19, 2025",
    time: "5:38 PM",
    status: "Delivered",
    payment: "Paid",
    fulfillment: "Delivered",
    total: 1089.0,
    subtotal: 1089.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "POS",
    items: [
      { id: "oi1", productId: "PRD-1007", sku: "HLP-DESK-07", name: "Helios Standing Desk", image: img("helios-standing-desk"), qty: 1, price: 749, variant: "Oak / White frame" },
      { id: "oi2", productId: "PRD-1004", sku: "HLP-LAMP-04", name: "Helios Ray Desk Lamp", image: img("helios-ray-lamp"), qty: 1, price: 89, variant: "Aluminum" },
      { id: "oi3", productId: "PRD-1008", sku: "HLP-KEY-08", name: "Helios Mechanical Keyboard", image: img("helios-keyboard"), qty: 1, price: 159, variant: "Banana Tactile / Carbon" },
      { id: "oi4", productId: "PRD-1006", sku: "HLP-CAM-06", name: "Helios 4K Webcam", image: img("helios-4k-webcam"), qty: 1, price: 129, variant: "78° FoV" },
    ],
    shippingAddress: {
      name: "Aarav Sharma",
      line1: "Helios Pro Flagship Store",
      line2: "415 Pine St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States",
    },
    billingAddress: {
      name: "Aarav Sharma",
      line1: "415 Pine St",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "United States",
    },
    paymentMethod: "Store card",
    shippingMethod: "In-store pickup",
    timeline: [
      { title: "Order placed", description: "Customer purchased in-store", time: "Jan 19, 05:38 PM", tone: "primary" },
      { title: "Payment captured", description: "$1,089.00 charged to store card", time: "Jan 19, 05:38 PM", tone: "success" },
      { title: "Picked up", description: "Customer collected from store", time: "Jan 19, 05:50 PM", tone: "success" },
    ],
  },
  {
    id: "HLP-20421",
    customer: "Priya Patel",
    customerEmail: "priya.p@example.com",
    date: "Jan 18, 2025",
    time: "2:11 PM",
    status: "Delivered",
    payment: "Paid",
    fulfillment: "Delivered",
    total: 329.0,
    subtotal: 329.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1003", sku: "HLP-WATCH-03", name: "Helios Solar Watch", image: img("helios-solar-watch"), qty: 1, price: 329, variant: "42mm / Sport band" },
    ],
    shippingAddress: {
      name: "Priya Patel",
      line1: "204 W 102nd St, Apt 6C",
      city: "New York",
      state: "NY",
      zip: "10025",
      country: "United States",
      phone: "+1 (212) 555-0117",
    },
    billingAddress: {
      name: "Priya Patel",
      line1: "204 W 102nd St, Apt 6C",
      city: "New York",
      state: "NY",
      zip: "10025",
      country: "United States",
    },
    paymentMethod: "Amex •••• 1007",
    shippingMethod: "UPS Next Day",
    tracking: { carrier: "UPS", number: "1Z204E5W0498371102", url: "#" },
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web", time: "Jan 18, 02:11 PM", tone: "primary" },
      { title: "Payment captured", description: "$329.00 charged to Amex •••• 1007", time: "Jan 18, 02:12 PM", tone: "success" },
      { title: "Shipped", description: "Picked up by UPS Next Day", time: "Jan 18, 06:00 PM", tone: "violet" },
      { title: "Delivered", description: "Signed for by recipient", time: "Jan 19, 09:48 AM", tone: "success" },
    ],
  },
  {
    id: "HLP-20420",
    customer: "Liam Walsh",
    customerEmail: "liam.w@example.com",
    date: "Jan 17, 2025",
    time: "8:48 AM",
    status: "Cancelled",
    payment: "Failed",
    fulfillment: "Unfulfilled",
    total: 159.0,
    subtotal: 159.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Web",
    items: [
      { id: "oi1", productId: "PRD-1008", sku: "HLP-KEY-08", name: "Helios Mechanical Keyboard", image: img("helios-keyboard"), qty: 1, price: 159, variant: "Berry Linear / Bone" },
    ],
    shippingAddress: {
      name: "Liam Walsh",
      line1: "55 George St",
      city: "Dublin",
      state: "Leinster",
      zip: "D02 XY88",
      country: "Ireland",
    },
    billingAddress: {
      name: "Liam Walsh",
      line1: "55 George St",
      city: "Dublin",
      state: "Leinster",
      zip: "D02 XY88",
      country: "Ireland",
    },
    paymentMethod: "Visa •••• 0042 (declined)",
    shippingMethod: "Standard shipping",
    notes: "Card declined — customer did not respond to retry notification.",
    timeline: [
      { title: "Order placed", description: "Customer submitted order via web", time: "Jan 17, 08:48 AM", tone: "primary" },
      { title: "Payment failed", description: "Card declined", time: "Jan 17, 08:48 AM", tone: "danger" },
      { title: "Customer notified", description: "Retry request sent", time: "Jan 17, 08:50 AM", tone: "accent" },
      { title: "Order cancelled", description: "No response after 48h", time: "Jan 19, 08:50 AM", tone: "danger" },
    ],
  },
  {
    id: "HLP-20419",
    customer: "Yuki Tanaka",
    customerEmail: "yuki.t@example.jp",
    date: "Jan 16, 2025",
    time: "11:25 PM",
    status: "Delivered",
    payment: "Paid",
    fulfillment: "Delivered",
    total: 249.0,
    subtotal: 249.0,
    shipping: 0,
    tax: 0,
    discount: 0,
    channel: "Mobile app",
    items: [
      { id: "oi1", productId: "PRD-1001", sku: "HLP-AERO-01", name: "Helios Aero Wireless Headphones", image: img("helios-aero-headphones"), qty: 1, price: 249, variant: "Sage / Standard" },
    ],
    shippingAddress: {
      name: "Yuki Tanaka",
      line1: "1-2-3 Marunouchi",
      line2: "Chiyoda-ku",
      city: "Tokyo",
      state: "Tokyo",
      zip: "100-0005",
      country: "Japan",
    },
    billingAddress: {
      name: "Yuki Tanaka",
      line1: "1-2-3 Marunouchi, Chiyoda-ku",
      city: "Tokyo",
      state: "Tokyo",
      zip: "100-0005",
      country: "Japan",
    },
    paymentMethod: "Apple Pay",
    shippingMethod: "Yamato Transport",
    tracking: { carrier: "Yamato", number: "YT0293847561029384", url: "#" },
    timeline: [
      { title: "Order placed", description: "Customer submitted order via mobile app", time: "Jan 16, 11:25 PM", tone: "primary" },
      { title: "Payment captured", description: "¥27,800 paid via Apple Pay", time: "Jan 16, 11:26 PM", tone: "success" },
      { title: "Shipped", description: "Picked up by Yamato", time: "Jan 17, 02:00 PM", tone: "violet" },
      { title: "Delivered", description: "Left at door (photo confirmation)", time: "Jan 18, 10:14 AM", tone: "success" },
    ],
  },
];

export const sampleOrder = orders[0];

export function orderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export const orderStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "On hold",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Refunded",
];
