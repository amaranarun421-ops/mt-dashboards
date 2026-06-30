export type ShopProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  description: string;
};

export const shopProducts: ShopProduct[] = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", category: "Audio", price: 299, oldPrice: 349, image: "/images/products/s1.jpg", rating: 4.8, reviews: 1240, badge: "Bestseller", inStock: true, description: "Premium over-ear headphones with active noise cancellation, 30-hour battery, and crystal-clear audio. Perfect for travel and deep work." },
  { id: 2, name: "Smart Fitness Watch Series 8", category: "Wearables", price: 399, image: "/images/products/s2.jpg", rating: 4.6, reviews: 856, badge: "New", inStock: true, description: "Track your workouts, sleep, heart rate, and blood oxygen. With always-on display and 18-hour battery life." },
  { id: 3, name: "Mechanical Gaming Keyboard RGB", category: "Accessories", price: 159, oldPrice: 199, image: "/images/products/s3.jpg", rating: 4.9, reviews: 2340, badge: "-20%", inStock: true, description: "Cherry MX switches, customizable RGB backlight, aluminum frame. Built for competitive gaming and typing enthusiasts." },
  { id: 4, name: "4K Webcam with Ring Light", category: "Accessories", price: 129, image: "/images/products/s4.jpg", rating: 4.4, reviews: 423, inStock: true, description: "Stream in 4K quality with built-in adjustable ring light. Auto-focus and noise-canceling microphone included." },
  { id: 5, name: "Portable Bluetooth Speaker", category: "Audio", price: 89, oldPrice: 109, image: "/images/products/s5.jpg", rating: 4.7, reviews: 1820, badge: "-18%", inStock: true, description: "Waterproof portable speaker with 20-hour battery, 360-degree sound, and deep bass. Perfect for outdoor adventures." },
  { id: 6, name: "USB-C Hub 7-in-1", category: "Accessories", price: 69, image: "/images/products/s6.jpg", rating: 4.5, reviews: 670, inStock: true, description: "Expand your laptop with HDMI, USB 3.0, SD card reader, and 100W power delivery. Compact aluminum design." },
  { id: 7, name: "Ergonomic Office Chair", category: "Furniture", price: 449, oldPrice: 599, image: "/images/products/s7.jpg", rating: 4.8, reviews: 920, badge: "-25%", inStock: true, description: "Mesh back, adjustable lumbar support, 4D armrests. Designed for 8+ hours of comfortable sitting." },
  { id: 8, name: "Standing Desk Electric", category: "Furniture", price: 599, image: "/images/products/s8.jpg", rating: 4.6, reviews: 510, inStock: true, description: "Electric height-adjustable desk with memory presets, cable management, and spacious 60x30 inch surface." },
  { id: 9, name: "Wireless Charging Pad", category: "Accessories", price: 39, oldPrice: 49, image: "/images/products/s9.jpg", rating: 4.3, reviews: 1450, badge: "Sale", inStock: true, description: "15W fast wireless charging for Qi-compatible devices. Non-slip surface and LED indicator." },
  { id: 10, name: "Smart Home Hub Pro", category: "Smart Home", price: 199, image: "/images/products/s10.jpg", rating: 4.7, reviews: 380, badge: "New", inStock: true, description: "Control all your smart devices from one hub. Works with Alexa, Google Assistant, and Apple HomeKit." },
  { id: 11, name: "External SSD 1TB USB-C", category: "Storage", price: 129, oldPrice: 159, image: "/images/products/s11.jpg", rating: 4.8, reviews: 890, badge: "-19%", inStock: true, description: "Blazing-fast 1050MB/s read and write speeds. Compact, rugged, and pocket-sized for on-the-go storage." },
  { id: 12, name: "Wireless Mouse Ergonomic", category: "Accessories", price: 49, image: "/images/products/s12.jpg", rating: 4.5, reviews: 1230, inStock: false, description: "Vertical ergonomic design reduces wrist strain. Silent clicks and 18-month battery life." },
];
