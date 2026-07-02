"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, QrCode, Receipt, X, Filter } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge, StatusBadge } from "@/components/common/status-badge";

const products = [
  { name: "Espresso", price: 3.50, cat: "Coffee", stock: 124, image: "bg-amber-500/10" },
  { name: "Cappuccino", price: 4.50, cat: "Coffee", stock: 86, image: "bg-amber-500/10" },
  { name: "Latte", price: 4.75, cat: "Coffee", stock: 92, image: "bg-amber-500/10" },
  { name: "Croissant", price: 2.80, cat: "Bakery", stock: 48, image: "bg-orange-500/10" },
  { name: "Bagel", price: 3.20, cat: "Bakery", stock: 36, image: "bg-orange-500/10" },
  { name: "Muffin", price: 3.50, cat: "Bakery", stock: 28, image: "bg-orange-500/10" },
  { name: "Sandwich", price: 7.50, cat: "Food", stock: 18, image: "bg-green-500/10" },
  { name: "Salad Bowl", price: 8.99, cat: "Food", stock: 14, image: "bg-green-500/10" },
  { name: "Cookie", price: 1.99, cat: "Dessert", stock: 64, image: "bg-pink-500/10" },
  { name: "Brownie", price: 2.99, cat: "Dessert", stock: 42, image: "bg-pink-500/10" },
  { name: "Iced Tea", price: 2.50, cat: "Drinks", stock: 78, image: "bg-blue-500/10" },
  { name: "Smoothie", price: 5.50, cat: "Drinks", stock: 32, image: "bg-blue-500/10" },
];

const categories = ["All", "Coffee", "Bakery", "Food", "Dessert", "Drinks"];

export function POS() {
  const [cart, setCart] = React.useState<{name: string; price: number; qty: number}[]>([
    { name: "Cappuccino", price: 4.50, qty: 2 },
    { name: "Croissant", price: 2.80, qty: 1 },
    { name: "Cookie", price: 1.99, qty: 3 },
  ]);
  const [activeCat, setActiveCat] = React.useState("All");

  const filtered = activeCat === "All" ? products : products.filter(p => p.cat === activeCat);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const addToCart = (p: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === p.name);
      if (existing) return prev.map(i => i.name === p.name ? {...i, qty: i.qty + 1} : i);
      return [...prev, { name: p.name, price: p.price, qty: 1 }];
    });
  };

  return (
    <div>
      <PageHeader breadcrumb={["Applications", "Point of Sale"]} title="Point of Sale" description="Process transactions quickly with an intuitive checkout interface." />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Products Grid */}
        <div className="xl:col-span-2 space-y-4">
          <Card className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search products..." className="pl-9 h-11" />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map(c => (
                  <button key={c} onClick={() => setActiveCat(c)}
                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${activeCat === c ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <motion.button key={p.name} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay: i*0.03}}
                onClick={() => addToCart(p)}
                className="group rounded-2xl border border-gray-200 bg-white p-3 text-left transition hover:border-brand-300 hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]">
                <div className={`mb-3 flex h-20 items-center justify-center rounded-xl ${p.image}`}>
                  <ShoppingCart className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{p.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{p.cat}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-brand-500">${p.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-400">{p.stock} left</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div>
          <Card className="flex flex-col rounded-2xl border border-gray-200 dark:border-gray-800 h-[calc(100vh-220px)]">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-brand-500" />
                <h3 className="font-semibold text-gray-800 dark:text-white/90">Current Order</h3>
              </div>
              <Badge color="primary">#ORD-8421</Badge>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/[0.03]">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setCart(prev => prev.map((it, idx) => idx === i ? {...it, qty: Math.max(0, it.qty - 1)} : it))}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => setCart(prev => prev.map((it, idx) => idx === i ? {...it, qty: it.qty + 1} : it))}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <span className="w-16 text-right text-sm font-bold">${(item.price * item.qty).toFixed(2)}</span>
                  <button onClick={() => setCart(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-error-500"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <ShoppingCart className="h-12 w-12 mb-2" />
                  <p className="text-sm">Cart is empty</p>
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Tax (8%)</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-2 text-base"><span className="font-semibold">Total</span><span className="font-bold text-brand-500">${total.toFixed(2)}</span></div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-col gap-1 h-auto py-3"><Banknote className="h-4 w-4" /><span className="text-xs">Cash</span></Button>
                <Button variant="outline" size="sm" className="flex-col gap-1 h-auto py-3"><CreditCard className="h-4 w-4" /><span className="text-xs">Card</span></Button>
                <Button variant="outline" size="sm" className="flex-col gap-1 h-auto py-3"><QrCode className="h-4 w-4" /><span className="text-xs">QR</span></Button>
              </div>
              <Button className="w-full gap-2"><Receipt className="h-4 w-4" /> Charge ${total.toFixed(2)}</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
