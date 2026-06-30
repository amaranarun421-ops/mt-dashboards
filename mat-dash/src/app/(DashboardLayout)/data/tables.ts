export type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Draft" | "Out of Stock";
  sales: number;
};

export const products: Product[] = [
  { id: 1, name: "iPhone 15 Pro Max", sku: "IPM-15-512", category: "Smartphones", price: 1199, stock: 45, status: "Active", sales: 1240 },
  { id: 2, name: "MacBook Pro 16 M3", sku: "MBP-16-1TB", category: "Laptops", price: 2499, stock: 18, status: "Active", sales: 856 },
  { id: 3, name: "AirPods Pro (3rd Gen)", sku: "APP-3-USB", category: "Audio", price: 249, stock: 120, status: "Active", sales: 3120 },
  { id: 4, name: "iPad Air 11", sku: "IPA-11-256", category: "Tablets", price: 599, stock: 32, status: "Active", sales: 645 },
  { id: 5, name: "Apple Watch Ultra 2", sku: "AWU-2-TI", category: "Wearables", price: 799, stock: 0, status: "Out of Stock", sales: 423 },
  { id: 6, name: "Magic Keyboard Pro", sku: "MKB-PRO-US", category: "Accessories", price: 299, stock: 78, status: "Active", sales: 980 },
  { id: 7, name: "Studio Display 5K", sku: "STD-5K-STD", category: "Displays", price: 1599, stock: 12, status: "Active", sales: 234 },
  { id: 8, name: "HomePod Mini", sku: "HPM-MI-2024", category: "Audio", price: 99, stock: 200, status: "Active", sales: 1820 },
  { id: 9, name: "Mac mini M2", sku: "MMN-M2-256", category: "Desktops", price: 699, stock: 25, status: "Active", sales: 512 },
  { id: 10, name: "iMac 24 M3", sku: "IMC-24-512", category: "Desktops", price: 1499, stock: 8, status: "Active", sales: 287 },
  { id: 11, name: "Magic Mouse", sku: "MMS-USB-C", category: "Accessories", price: 99, stock: 0, status: "Out of Stock", sales: 1456 },
  { id: 12, name: "iPhone SE (2024)", sku: "IPS-2024-64", category: "Smartphones", price: 429, stock: 65, status: "Draft", sales: 0 },
  { id: 13, name: "AirTag 4-Pack", sku: "ATG-4-PK", category: "Accessories", price: 99, stock: 150, status: "Active", sales: 2100 },
  { id: 14, name: "Apple Pencil Pro", sku: "APL-PRO-2024", category: "Accessories", price: 129, stock: 88, status: "Active", sales: 670 },
  { id: 15, name: "Vision Pro", sku: "AVP-256", category: "Wearables", price: 3499, stock: 4, status: "Active", sales: 89 },
];

export type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  status: "Active" | "On Leave" | "Inactive";
  hireDate: string;
};

export const employees: Employee[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@acme.com", department: "Engineering", role: "Senior Developer", salary: 125000, status: "Active", hireDate: "2021-03-15" },
  { id: 2, name: "Michael Chen", email: "m.chen@acme.com", department: "Design", role: "Lead Designer", salary: 110000, status: "Active", hireDate: "2020-08-22" },
  { id: 3, name: "Emily Rodriguez", email: "emily.r@acme.com", department: "Marketing", role: "Marketing Manager", salary: 95000, status: "On Leave", hireDate: "2022-01-10" },
  { id: 4, name: "David Park", email: "d.park@acme.com", department: "Engineering", role: "Frontend Developer", salary: 98000, status: "Active", hireDate: "2023-06-05" },
  { id: 5, name: "Lisa Anderson", email: "lisa.a@acme.com", department: "HR", role: "HR Director", salary: 130000, status: "Active", hireDate: "2019-11-12" },
  { id: 6, name: "James Wilson", email: "j.wilson@acme.com", department: "Sales", role: "Account Executive", salary: 85000, status: "Inactive", hireDate: "2021-09-30" },
  { id: 7, name: "Priya Patel", email: "priya.p@acme.com", department: "Engineering", role: "Backend Developer", salary: 115000, status: "Active", hireDate: "2022-04-18" },
  { id: 8, name: "Tom Anderson", email: "tom.a@acme.com", department: "Finance", role: "Financial Analyst", salary: 78000, status: "Active", hireDate: "2023-02-14" },
  { id: 9, name: "Maria Garcia", email: "m.garcia@acme.com", department: "Design", role: "UX Researcher", salary: 88000, status: "Active", hireDate: "2022-07-25" },
  { id: 10, name: "Kevin Lee", email: "k.lee@acme.com", department: "Product", role: "Product Manager", salary: 135000, status: "On Leave", hireDate: "2020-05-08" },
];
