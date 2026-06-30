export type ProductStatus = "Active" | "Draft" | "Archived" | "Out of stock";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful?: number;
  response?: { author: string; body: string; date: string };
};

export type ProductVariant = {
  name: string;
  options: string[];
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  compareAt?: number;
  cost: number;
  stock: number;
  lowStockThreshold: number;
  status: ProductStatus;
  rating: number;
  reviewsCount: number;
  sold: number;
  revenue: number;
  vendor: string;
  warehouse: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  variants: ProductVariant[];
  tags: string[];
  seo: { title: string; slug: string; metaDescription: string };
  reviews: ProductReview[];
  related: string[];
};

const img = (seed: string, w = 600, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const products: Product[] = [
  {
    id: "PRD-1001",
    sku: "HLP-AERO-01",
    name: "Helios Aero Wireless Headphones",
    category: "Audio",
    brand: "Helios Audio",
    price: 249,
    compareAt: 299,
    cost: 142,
    stock: 184,
    lowStockThreshold: 25,
    status: "Active",
    rating: 4.7,
    reviewsCount: 318,
    sold: 2410,
    revenue: 600090,
    vendor: "Helios Direct",
    warehouse: "Seattle, WA",
    image: img("helios-aero-headphones"),
    gallery: [img("helios-aero-headphones"), img("helios-aero-side"), img("helios-aero-case"), img("helios-aero-detail")],
    shortDescription: "Active noise-cancelling over-ear headphones with 40-hour battery life.",
    description:
      "The Helios Aero is a flagship pair of wireless over-ear headphones engineered for studio-grade sound and travel-ready comfort. Featuring hybrid adaptive noise cancellation, 40-hour battery life, and multipoint Bluetooth 5.3, the Aero is built for the modern professional.",
    specs: [
      { label: "Driver", value: "40mm beryllium" },
      { label: "Battery", value: "40 hours (ANC on)" },
      { label: "Bluetooth", value: "5.3 multipoint" },
      { label: "Weight", value: "248 g" },
      { label: "Charging", value: "USB-C, 10 min = 5h" },
      { label: "Warranty", value: "2 years" },
    ],
    variants: [
      { name: "Color", options: ["Midnight", "Sand", "Sage"] },
      { name: "Bundle", options: ["Standard", "Travel Kit"] },
    ],
    tags: ["audio", "premium", "wireless", "anc"],
    seo: {
      title: "Helios Aero Wireless Headphones — Active Noise Cancelling",
      slug: "helios-aero-wireless-headphones",
      metaDescription:
        "Studio-grade sound with 40-hour battery, hybrid ANC, and multipoint Bluetooth 5.3.",
    },
    reviews: [
      {
        id: "r1",
        author: "Sofia Mendes",
        rating: 5,
        date: "Jan 18, 2025",
        title: "Best headphones I've owned",
        body: "The ANC is genuinely impressive on long-haul flights. Battery easily lasts a full week of commuting.",
        verified: true,
        response: { author: "Helios Audio", body: "Thank you, Sofia! Safe travels.", date: "Jan 19, 2025" },
      },
      {
        id: "r2",
        author: "Liam Walsh",
        rating: 4,
        date: "Jan 12, 2025",
        title: "Great sound, tight clamp",
        body: "Sound is incredible but the clamp is a little strong out of the box. Loosened up after a week.",
        verified: true,
      },
      {
        id: "r3",
        author: "Yuki Tanaka",
        rating: 5,
        date: "Jan 06, 2025",
        title: "Travel kit is worth it",
        body: "Picked up the travel bundle — the hard case fits perfectly in my carry-on. Highly recommend.",
        verified: true,
      },
    ],
    related: ["PRD-1002", "PRD-1006", "PRD-1010"],
  },
  {
    id: "PRD-1002",
    sku: "HLP-BUDS-02",
    name: "Helios Buds Pro",
    category: "Audio",
    brand: "Helios Audio",
    price: 179,
    compareAt: 199,
    cost: 88,
    stock: 412,
    lowStockThreshold: 30,
    status: "Active",
    rating: 4.5,
    reviewsCount: 524,
    sold: 3820,
    revenue: 683780,
    vendor: "Helios Direct",
    warehouse: "Newark, NJ",
    image: img("helios-buds-pro"),
    gallery: [img("helios-buds-pro"), img("helios-buds-case"), img("helios-buds-tip"), img("helios-buds-charging")],
    shortDescription: "True wireless earbuds with adaptive EQ and 28-hour total battery.",
    description:
      "Helios Buds Pro deliver rich, balanced sound with adaptive EQ that tunes itself to your ear shape. With IPX5 sweat resistance, intuitive touch controls, and a pocketable charging case, they're the everyday companion.",
    specs: [
      { label: "Driver", value: "11mm titanium" },
      { label: "Battery", value: "8h buds + 20h case" },
      { label: "Bluetooth", value: "5.3 multipoint" },
      { label: "Water resistance", value: "IPX5" },
      { label: "Charging", value: "USB-C + Qi wireless" },
      { label: "Warranty", value: "1 year" },
    ],
    variants: [{ name: "Color", options: ["Graphite", "Pearl", "Sky"] }],
    tags: ["audio", "earbuds", "wireless"],
    seo: {
      title: "Helios Buds Pro — Adaptive EQ True Wireless Earbuds",
      slug: "helios-buds-pro",
      metaDescription:
        "Adaptive EQ earbuds with 28-hour battery, IPX5 water resistance, and Qi charging case.",
    },
    reviews: [
      {
        id: "r1",
        author: "Daniel Chen",
        rating: 5,
        date: "Jan 21, 2025",
        title: "Perfect gym buds",
        body: "Stay in place, sweat hasn't killed them yet. Bass response is excellent.",
        verified: true,
      },
      {
        id: "r2",
        author: "Priya Patel",
        rating: 4,
        date: "Jan 09, 2025",
        title: "Great, but case is small",
        body: "Battery life is solid. Wish the case was easier to open with one hand.",
        verified: true,
      },
    ],
    related: ["PRD-1001", "PRD-1006", "PRD-1003"],
  },
  {
    id: "PRD-1003",
    sku: "HLP-WATCH-03",
    name: "Helios Solar Watch",
    category: "Wearables",
    brand: "Helios Wear",
    price: 329,
    compareAt: 379,
    cost: 168,
    stock: 96,
    lowStockThreshold: 20,
    status: "Active",
    rating: 4.6,
    reviewsCount: 207,
    sold: 1180,
    revenue: 388220,
    vendor: "Helios Wear",
    warehouse: "Seattle, WA",
    image: img("helios-solar-watch"),
    gallery: [img("helios-solar-watch"), img("helios-solar-band"), img("helios-solar-back"), img("helios-solar-app")],
    shortDescription: "Solar-charging smartwatch with 30-day battery and AMOLED display.",
    description:
      "The Helios Solar Watch combines a power-efficient AMOLED display with a solar charging ring that extends battery life to 30 days in eco mode. Tracks 120+ activities, blood oxygen, and continuous heart rate.",
    specs: [
      { label: "Display", value: "1.4\" AMOLED" },
      { label: "Battery", value: "30 days eco / 7 days smart" },
      { label: "Solar", value: "Power Glass ring" },
      { label: "Water resistance", value: "10 ATM" },
      { label: "Sensors", value: "HR, SpO2, ECG, GPS" },
      { label: "Warranty", value: "2 years" },
    ],
    variants: [
      { name: "Case", options: ["42mm", "46mm"] },
      { name: "Band", options: ["Sport", "Leather", "Titanium"] },
    ],
    tags: ["wearable", "smartwatch", "solar"],
    seo: {
      title: "Helios Solar Watch — 30-Day Battery Smartwatch",
      slug: "helios-solar-watch",
      metaDescription:
        "Solar-charging smartwatch with 30-day battery, AMOLED display, and full health tracking.",
    },
    reviews: [
      {
        id: "r1",
        author: "Marcus Bell",
        rating: 5,
        date: "Jan 19, 2025",
        title: "30-day claim is real",
        body: "I've gone 22 days in smart mode without charging. Solar boost is real, not marketing.",
        verified: true,
      },
      {
        id: "r2",
        author: "Aarav Sharma",
        rating: 4,
        date: "Jan 02, 2025",
        title: "Solid watch, learning curve",
        body: "App takes a bit to learn but the watch itself is excellent. Heart rate matches my chest strap.",
        verified: true,
      },
    ],
    related: ["PRD-1001", "PRD-1010", "PRD-1006"],
  },
  {
    id: "PRD-1004",
    sku: "HLP-LAMP-04",
    name: "Helios Ray Desk Lamp",
    category: "Home Office",
    brand: "Helios Home",
    price: 89,
    cost: 38,
    stock: 14,
    lowStockThreshold: 20,
    status: "Active",
    rating: 4.4,
    reviewsCount: 142,
    sold: 880,
    revenue: 78320,
    vendor: "Helios Home",
    warehouse: "Newark, NJ",
    image: img("helios-ray-lamp"),
    gallery: [img("helios-ray-lamp"), img("helios-ray-base"), img("helios-ray-arm"), img("helios-ray-control")],
    shortDescription: "Adaptive LED desk lamp with circadian color temperature.",
    description:
      "The Helios Ray automatically adjusts brightness and color temperature throughout the day to match your circadian rhythm. Touch controls, USB-C pass-through charging, and a wireless phone charging base.",
    specs: [
      { label: "Brightness", value: "1200 lux max" },
      { label: "Color temp", value: "2700K - 6500K" },
      { label: "Power", value: "USB-C, 15W" },
      { label: "Wireless charging", value: "Qi 10W" },
      { label: "Height", value: "52 cm" },
      { label: "Warranty", value: "3 years" },
    ],
    variants: [{ name: "Color", options: ["Aluminum", "Matte Black"] }],
    tags: ["home-office", "lighting", "led"],
    seo: {
      title: "Helios Ray Desk Lamp — Circadian LED Light",
      slug: "helios-ray-desk-lamp",
      metaDescription:
        "Adaptive LED desk lamp with circadian color tuning, USB-C charging, and Qi wireless base.",
    },
    reviews: [
      {
        id: "r1",
        author: "Emma Reyes",
        rating: 5,
        date: "Jan 17, 2025",
        title: "Eye strain gone",
        body: "My evening headaches stopped once I started using the circadian mode. Worth every penny.",
        verified: true,
      },
    ],
    related: ["PRD-1005", "PRD-1007", "PRD-1008"],
  },
  {
    id: "PRD-1005",
    sku: "HLP-CHAIR-05",
    name: "Helios Ergo Chair",
    category: "Home Office",
    brand: "Helios Home",
    price: 549,
    compareAt: 649,
    cost: 286,
    stock: 38,
    lowStockThreshold: 15,
    status: "Active",
    rating: 4.8,
    reviewsCount: 96,
    sold: 412,
    revenue: 226188,
    vendor: "Helios Home",
    warehouse: "Dallas, TX",
    image: img("helios-ergo-chair"),
    gallery: [img("helios-ergo-chair"), img("helios-ergo-side"), img("helios-ergo-back"), img("helios-ergo-arm")],
    shortDescription: "Ergonomic mesh office chair with lumbar support and 4D armrests.",
    description:
      "The Helios Ergo Chair features an adjustable lumbar support, breathable mesh back, 4D armrests, and a synchronous tilt mechanism. Engineered for 8+ hour workdays.",
    specs: [
      { label: "Lumbar", value: "Adjustable height + depth" },
      { label: "Armrests", value: "4D adjustable" },
      { label: "Tilt", value: "Synchronous, 3 lock positions" },
      { label: "Seat", value: "Memory foam mesh" },
      { label: "Weight capacity", value: "150 kg" },
      { label: "Warranty", value: "10 years" },
    ],
    variants: [
      { name: "Color", options: ["Graphite", "Ocean", "Sand"] },
      { name: "Headrest", options: ["None", "Adjustable"] },
    ],
    tags: ["home-office", "furniture", "ergonomic"],
    seo: {
      title: "Helios Ergo Chair — Ergonomic Office Chair with Lumbar",
      slug: "helios-ergo-chair",
      metaDescription:
        "Ergonomic mesh chair with adjustable lumbar, 4D armrests, and 10-year warranty.",
    },
    reviews: [
      {
        id: "r1",
        author: "Noah Kim",
        rating: 5,
        date: "Jan 14, 2025",
        title: "Replaced my Aeron",
        body: "Genuinely comparable to a $1400 chair. Lumbar support is the highlight.",
        verified: true,
      },
      {
        id: "r2",
        author: "Layla Hassan",
        rating: 4,
        date: "Dec 28, 2024",
        title: "Great chair, heavy box",
        body: "Assembly was straightforward but the box is 36kg. Get a friend to help.",
        verified: true,
      },
    ],
    related: ["PRD-1004", "PRD-1007", "PRD-1009"],
  },
  {
    id: "PRD-1006",
    sku: "HLP-CAM-06",
    name: "Helios 4K Webcam",
    category: "Video",
    brand: "Helios Vision",
    price: 129,
    compareAt: 149,
    cost: 64,
    stock: 220,
    lowStockThreshold: 25,
    status: "Active",
    rating: 4.3,
    reviewsCount: 311,
    sold: 1640,
    revenue: 211560,
    vendor: "Helios Vision",
    warehouse: "Seattle, WA",
    image: img("helios-4k-webcam"),
    gallery: [img("helios-4k-webcam"), img("helios-4k-mount"), img("helios-4k-side"), img("helios-4k-clip")],
    shortDescription: "4K UHD webcam with HDR, autofocus, and dual stereo mics.",
    description:
      "Crisp 4K video with HDR, fast phase-detect autofocus, and dual stereo microphones with noise suppression. Privacy shutter included, USB-C plug-and-play.",
    specs: [
      { label: "Resolution", value: "3840 x 2160 @ 30fps" },
      { label: "Sensor", value: "1/2.8\" Sony STARVIS" },
      { label: "Field of view", value: "78° / 90° / 110°" },
      { label: "Microphones", value: "Dual stereo, noise suppressing" },
      { label: "Connection", value: "USB-C" },
      { label: "Warranty", value: "2 years" },
    ],
    variants: [{ name: "Field of view", options: ["78°", "90°", "110°"] }],
    tags: ["video", "webcam", "streaming"],
    seo: {
      title: "Helios 4K Webcam — HDR Video Conference Camera",
      slug: "helios-4k-webcam",
      metaDescription:
        "4K UHD webcam with HDR, Sony STARVIS sensor, and dual noise-suppressing mics.",
    },
    reviews: [
      {
        id: "r1",
        author: "Ingrid Larsen",
        rating: 4,
        date: "Jan 11, 2025",
        title: "Great image, software meh",
        body: "Picture is fantastic in any lighting. The companion app could use polish.",
        verified: true,
      },
    ],
    related: ["PRD-1001", "PRD-1002", "PRD-1010"],
  },
  {
    id: "PRD-1007",
    sku: "HLP-DESK-07",
    name: "Helios Standing Desk",
    category: "Home Office",
    brand: "Helios Home",
    price: 749,
    cost: 412,
    stock: 22,
    lowStockThreshold: 12,
    status: "Active",
    rating: 4.7,
    reviewsCount: 74,
    sold: 280,
    revenue: 209720,
    vendor: "Helios Home",
    warehouse: "Dallas, TX",
    image: img("helios-standing-desk"),
    gallery: [img("helios-standing-desk"), img("helios-desk-leg"), img("helios-desk-controller"), img("helios-desk-top")],
    shortDescription: "Electric sit-stand desk with memory presets and cable management.",
    description:
      "Whisper-quiet dual-motor standing desk with 4 memory presets, anti-collision detection, and a 1.6m bamboo top. Lifts up to 120kg at 38mm/s.",
    specs: [
      { label: "Top size", value: "160 x 75 cm bamboo" },
      { label: "Height range", value: "68 - 118 cm" },
      { label: "Motors", value: "Dual, < 50 dB" },
      { label: "Memory", value: "4 presets" },
      { label: "Capacity", value: "120 kg" },
      { label: "Warranty", value: "7 years" },
    ],
    variants: [
      { name: "Top", options: ["Bamboo", "Oak", "Matte Black"] },
      { name: "Frame", options: ["White", "Black"] },
    ],
    tags: ["home-office", "furniture", "ergonomic"],
    seo: {
      title: "Helios Standing Desk — Electric Sit-Stand with Memory",
      slug: "helios-standing-desk",
      metaDescription:
        "Dual-motor standing desk with 4 presets, anti-collision, and bamboo top.",
    },
    reviews: [
      {
        id: "r1",
        author: "Tobias Brandt",
        rating: 5,
        date: "Jan 16, 2025",
        title: "Worth the splurge",
        body: "Quiet, stable at full height, and the bamboo top is gorgeous. No wobble at all.",
        verified: true,
      },
    ],
    related: ["PRD-1004", "PRD-1005", "PRD-1009"],
  },
  {
    id: "PRD-1008",
    sku: "HLP-KEY-08",
    name: "Helios Mechanical Keyboard",
    category: "Peripherals",
    brand: "Helios Input",
    price: 159,
    compareAt: 179,
    cost: 78,
    stock: 0,
    lowStockThreshold: 20,
    status: "Out of stock",
    rating: 4.6,
    reviewsCount: 198,
    sold: 920,
    revenue: 146280,
    vendor: "Helios Input",
    warehouse: "Seattle, WA",
    image: img("helios-keyboard"),
    gallery: [img("helios-keyboard"), img("helios-key-switch"), img("helios-key-side"), img("helios-key-rgb")],
    shortDescription: "75% hot-swap mechanical keyboard with gasket mount and PBT keys.",
    description:
      "A 75% mechanical keyboard with a gasket-mounted PCB, hot-swap switches, per-key RGB, and a rotary encoder. Built for typists who care.",
    specs: [
      { label: "Layout", value: "75% (84 keys)" },
      { label: "Switches", value: "Hot-swap, pre-installed Banana Tactile" },
      { label: "Keycaps", value: "PBT double-shot" },
      { label: "Mount", value: "Gasket" },
      { label: "Connection", value: "USB-C + Bluetooth + 2.4GHz" },
      { label: "Warranty", value: "2 years" },
    ],
    variants: [
      { name: "Switch", options: ["Banana Tactile", "Berry Linear", "Coral Clicky"] },
      { name: "Color", options: ["Carbon", "Bone", "Sage"] },
    ],
    tags: ["peripherals", "keyboard", "mechanical"],
    seo: {
      title: "Helios Mechanical Keyboard — 75% Hot-Swap Gasket Mount",
      slug: "helios-mechanical-keyboard",
      metaDescription:
        "75% hot-swap mechanical keyboard with gasket mount, PBT keycaps, and tri-mode connectivity.",
    },
    reviews: [
      {
        id: "r1",
        author: "Henrik Sorensen",
        rating: 5,
        date: "Jan 15, 2025",
        title: "Thocky perfection",
        body: "Right out of the box this thing sounds incredible. No mods required.",
        verified: true,
      },
    ],
    related: ["PRD-1006", "PRD-1010", "PRD-1001"],
  },
  {
    id: "PRD-1009",
    sku: "HLP-MON-09",
    name: "Helios 34\" Ultrawide Monitor",
    category: "Video",
    brand: "Helios Vision",
    price: 899,
    compareAt: 999,
    cost: 524,
    stock: 47,
    lowStockThreshold: 10,
    status: "Active",
    rating: 4.5,
    reviewsCount: 88,
    sold: 198,
    revenue: 178002,
    vendor: "Helios Vision",
    warehouse: "Newark, NJ",
    image: img("helios-ultrawide-monitor"),
    gallery: [img("helios-ultrawide-monitor"), img("helios-monitor-stand"), img("helios-monitor-back"), img("helios-monitor-ports")],
    shortDescription: "34-inch curved ultrawide with 144Hz refresh and USB-C 90W.",
    description:
      "A 34-inch curved ultrawide with 3440x1440 resolution, 144Hz refresh rate, 1ms response, and USB-C 90W single-cable connectivity for laptops.",
    specs: [
      { label: "Panel", value: "34\" VA curved 1500R" },
      { label: "Resolution", value: "3440 x 1440" },
      { label: "Refresh", value: "144Hz" },
      { label: "Response", value: "1 ms MPRT" },
      { label: "USB-C", value: "90W power delivery" },
      { label: "Warranty", value: "3 years" },
    ],
    variants: [{ name: "Stand", options: ["Standard", "Ergo arm"] }],
    tags: ["video", "monitor", "ultrawide"],
    seo: {
      title: "Helios 34\" Ultrawide Monitor — 144Hz Curved",
      slug: "helios-34-ultrawide-monitor",
      metaDescription:
        "34-inch curved ultrawide with 144Hz refresh, 1ms response, and USB-C 90W power delivery.",
    },
    reviews: [
      {
        id: "r1",
        author: "Mei Lin",
        rating: 5,
        date: "Jan 13, 2025",
        title: "Productivity boost is real",
        body: "Replaced two 27\" monitors with this. Single USB-C cable to my laptop. Couldn't be happier.",
        verified: true,
      },
    ],
    related: ["PRD-1006", "PRD-1004", "PRD-1007"],
  },
  {
    id: "PRD-1010",
    sku: "HLP-HUB-10",
    name: "Helios Thunderbolt Dock",
    category: "Peripherals",
    brand: "Helios Input",
    price: 249,
    cost: 132,
    stock: 156,
    lowStockThreshold: 20,
    status: "Active",
    rating: 4.4,
    reviewsCount: 167,
    sold: 720,
    revenue: 179280,
    vendor: "Helios Input",
    warehouse: "Dallas, TX",
    image: img("helios-thunderbolt-dock"),
    gallery: [img("helios-thunderbolt-dock"), img("helios-dock-ports"), img("helios-dock-side"), img("helios-dock-cable")],
    shortDescription: "Thunderbolt 4 dock with 14 ports and 96W power delivery.",
    description:
      "One cable to your laptop for 14 ports: dual 4K@60Hz display out, 5x USB-A, 2x USB-C, SD card reader, 2.5GbE Ethernet, and 96W passthrough charging.",
    specs: [
      { label: "Host", value: "Thunderbolt 4 (40Gbps)" },
      { label: "Video out", value: "2x 4K @ 60Hz" },
      { label: "USB-A", value: "5x 10Gbps" },
      { label: "USB-C", value: "2x 10Gbps" },
      { label: "Ethernet", value: "2.5 GbE" },
      { label: "Power", value: "96W host passthrough" },
    ],
    variants: [{ name: "Cable", options: ["0.8m Thunderbolt", "1.5m Thunderbolt"] }],
    tags: ["peripherals", "dock", "thunderbolt"],
    seo: {
      title: "Helios Thunderbolt 4 Dock — 14 Ports, 96W Power",
      slug: "helios-thunderbolt-dock",
      metaDescription:
        "Thunderbolt 4 dock with dual 4K display out, 14 ports, and 96W host power delivery.",
    },
    reviews: [
      {
        id: "r1",
        author: "Rafael Costa",
        rating: 4,
        date: "Jan 10, 2025",
        title: "Cable management solved",
        body: "Single cable to my laptop. Drives two 4K monitors without breaking a sweat.",
        verified: true,
      },
    ],
    related: ["PRD-1001", "PRD-1006", "PRD-1009"],
  },
  {
    id: "PRD-1011",
    sku: "HLP-PEN-11",
    name: "Helios Stylus Pro",
    category: "Peripherals",
    brand: "Helios Input",
    price: 99,
    cost: 42,
    stock: 64,
    lowStockThreshold: 15,
    status: "Active",
    rating: 4.2,
    reviewsCount: 53,
    sold: 240,
    revenue: 23760,
    vendor: "Helios Input",
    warehouse: "Dallas, TX",
    image: img("helios-stylus-pro"),
    gallery: [img("helios-stylus-pro"), img("helios-stylus-tip"), img("helios-stylus-charge"), img("helios-stylus-side")],
    shortDescription: "Pressure-sensitive stylus with tilt and 12-hour battery.",
    description:
      "A 4096-pressure-level stylus with tilt recognition, palm rejection, and USB-C fast charging. 12-hour battery life with a 1-minute quick charge for 1 hour of use.",
    specs: [
      { label: "Pressure", value: "4096 levels" },
      { label: "Tilt", value: "Yes, ±60°" },
      { label: "Battery", value: "12 hours" },
      { label: "Charging", value: "USB-C, 1 min = 1 hr" },
      { label: "Tip", value: "Replaceable, 3 included" },
      { label: "Warranty", value: "1 year" },
    ],
    variants: [{ name: "Color", options: ["Silver", "Space Gray"] }],
    tags: ["peripherals", "stylus", "input"],
    seo: {
      title: "Helios Stylus Pro — 4096 Pressure Levels, Tilt",
      slug: "helios-stylus-pro",
      metaDescription:
        "Pressure-sensitive stylus with 4096 levels, tilt recognition, and 12-hour battery.",
    },
    reviews: [
      {
        id: "r1",
        author: "Grace Whitfield",
        rating: 4,
        date: "Jan 08, 2025",
        title: "Almost perfect",
        body: "Pressure curve is great. Wish the side button was a bit larger.",
        verified: true,
      },
    ],
    related: ["PRD-1008", "PRD-1010", "PRD-1009"],
  },
  {
    id: "PRD-1012",
    sku: "HLP-CHG-12",
    name: "Helios 100W GaN Charger",
    category: "Power",
    brand: "Helios Power",
    price: 69,
    cost: 28,
    stock: 8,
    lowStockThreshold: 25,
    status: "Active",
    rating: 4.5,
    reviewsCount: 124,
    sold: 1320,
    revenue: 91080,
    vendor: "Helios Power",
    warehouse: "Newark, NJ",
    image: img("helios-gan-charger"),
    gallery: [img("helios-gan-charger"), img("helios-charger-ports"), img("helios-charger-folds"), img("helios-charger-cable")],
    shortDescription: "Compact 100W GaN charger with 4 ports and folding prongs.",
    description:
      "A pocketable 100W GaN charger with 2x USB-C and 2x USB-A ports. Charges a laptop, phone, tablet, and earbuds simultaneously. Folding prongs and travel pouch included.",
    specs: [
      { label: "Total power", value: "100W" },
      { label: "Ports", value: "2x USB-C, 2x USB-A" },
      { label: "Protocol", value: "PD 3.0, PPS, QC 5" },
      { label: "Prongs", value: "Folding, US-style" },
      { label: "Size", value: "52 x 52 x 32 mm" },
      { label: "Warranty", value: "2 years" },
    ],
    variants: [{ name: "Region", options: ["US", "EU", "UK"] }],
    tags: ["power", "charger", "gan"],
    seo: {
      title: "Helios 100W GaN Charger — 4 Ports, Folding Prongs",
      slug: "helios-100w-gan-charger",
      metaDescription:
        "100W GaN charger with 4 ports, folding prongs, and PD 3.0 protocol support.",
    },
    reviews: [
      {
        id: "r1",
        author: "Ravi Krishnan",
        rating: 5,
        date: "Jan 12, 2025",
        title: "Replaced 4 chargers",
        body: "Travels with me everywhere. Charges my 16\" laptop at full speed.",
        verified: true,
      },
    ],
    related: ["PRD-1002", "PRD-1008", "PRD-1010"],
  },
  {
    id: "PRD-1013",
    sku: "HLP-CON-13",
    name: "Helios Smart Controller",
    category: "Smart Home",
    brand: "Helios Home",
    price: 199,
    cost: 96,
    stock: 32,
    lowStockThreshold: 15,
    status: "Draft",
    rating: 0,
    reviewsCount: 0,
    sold: 0,
    revenue: 0,
    vendor: "Helios Home",
    warehouse: "Dallas, TX",
    image: img("helios-smart-controller"),
    gallery: [img("helios-smart-controller"), img("helios-controller-mount"), img("helios-controller-back"), img("helios-controller-app")],
    shortDescription: "Whole-home controller with 7\" touchscreen and Matter support.",
    description:
      "A wall-mounted 7\" touchscreen smart home controller with Matter, Zigbee, and Z-Wave radios. Replaces every smart speaker and hub in your home.",
    specs: [
      { label: "Display", value: "7\" IPS touchscreen" },
      { label: "Radios", value: "Matter, Zigbee 3.0, Z-Wave, Wi-Fi 6" },
      { label: "Power", value: "PoE or USB-C" },
      { label: "Mount", value: "In-wall or surface" },
      { label: "Voice", value: "Far-field mic array" },
      { label: "Warranty", value: "2 years" },
    ],
    variants: [{ name: "Bezel", options: ["White", "Black"] }],
    tags: ["smart-home", "controller", "matter"],
    seo: {
      title: "Helios Smart Controller — 7\" Matter Home Hub",
      slug: "helios-smart-controller",
      metaDescription:
        "7\" touchscreen smart home controller with Matter, Zigbee, and Z-Wave radios.",
    },
    reviews: [],
    related: ["PRD-1004", "PRD-1005", "PRD-1007"],
  },
  {
    id: "PRD-1014",
    sku: "HLP-PWR-14",
    name: "Helios Power Bank 20K",
    category: "Power",
    brand: "Helios Power",
    price: 79,
    compareAt: 89,
    cost: 36,
    stock: 240,
    lowStockThreshold: 30,
    status: "Active",
    rating: 4.6,
    reviewsCount: 410,
    sold: 2980,
    revenue: 235420,
    vendor: "Helios Power",
    warehouse: "Newark, NJ",
    image: img("helios-power-bank"),
    gallery: [img("helios-power-bank"), img("helios-pb-ports"), img("helios-pb-display"), img("helios-pb-cable")],
    shortDescription: "20,000mAh power bank with 65W USB-C output and OLED display.",
    description:
      "A 20,000mAh power bank with 65W USB-C PD output, dual USB-A ports, and an OLED display showing remaining capacity and time-to-empty. TSA carry-on friendly.",
    specs: [
      { label: "Capacity", value: "20,000 mAh (74 Wh)" },
      { label: "USB-C", value: "65W out, 30W in" },
      { label: "USB-A", value: "2x 18W" },
      { label: "Display", value: "OLED capacity + time" },
      { label: "Weight", value: "395 g" },
      { label: "Warranty", value: "2 years" },
    ],
    variants: [{ name: "Color", options: ["Carbon", "Stone"] }],
    tags: ["power", "power-bank", "portable"],
    seo: {
      title: "Helios Power Bank 20K — 65W USB-C Output, OLED",
      slug: "helios-power-bank-20k",
      metaDescription:
        "20,000mAh power bank with 65W USB-C output, dual USB-A ports, and OLED display.",
    },
    reviews: [
      {
        id: "r1",
        author: "Aiko Yamada",
        rating: 5,
        date: "Jan 04, 2025",
        title: "Charges my laptop on the go",
        body: "65W is enough to charge my 14\" laptop while I'm at a coffee shop. Lifesaver.",
        verified: true,
      },
    ],
    related: ["PRD-1012", "PRD-1002", "PRD-1011"],
  },
];

export const productCategories = Array.from(new Set(products.map((p) => p.category)));
export const productBrands = Array.from(new Set(products.map((p) => p.brand)));
export const productWarehouses = Array.from(new Set(products.map((p) => p.warehouse)));

export const sampleProduct = products[0];

export function productById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
