"use client";
import { useState } from "react";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";

type Item = { id: number; description: string; qty: number; rate: number };

export const InvoiceForm = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, description: "", qty: 1, rate: 0 },
  ]);

  const addItem = () => setItems((arr) => [...arr, { id: Date.now(), description: "", qty: 1, rate: 0 }]);
  const removeItem = (id: number) => setItems((arr) => arr.filter((i) => i.id !== id));
  const updateItem = (id: number, key: keyof Item, value: any) =>
    setItems((arr) => arr.map((i) => i.id === id ? { ...i, [key]: value } : i));

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <DemoBlock title="Bill To">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Client Name *</Label><Input placeholder="Acme Corp" className="mt-2" /></div>
            <div><Label>Email *</Label><Input type="email" placeholder="billing@acme.com" className="mt-2" /></div>
            <div className="col-span-2"><Label>Address</Label><Input placeholder="123 Main St, San Francisco, CA" className="mt-2" /></div>
            <div><Label>Phone</Label><Input placeholder="+1 555 000 1234" className="mt-2" /></div>
            <div><Label>Tax ID / VAT</Label><Input placeholder="US123456789" className="mt-2" /></div>
          </div>
        </DemoBlock>

        <DemoBlock title="Invoice Items">
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-2 text-xs font-semibold opacity-70 px-2">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Rate</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            <Separator />
            {items.map((it) => (
              <div key={it.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6"><Input placeholder="Item description" value={it.description} onChange={(e) => updateItem(it.id, "description", e.target.value)} /></div>
                <div className="col-span-2"><Input type="number" className="text-center" value={it.qty} onChange={(e) => updateItem(it.id, "qty", Number(e.target.value))} /></div>
                <div className="col-span-2"><Input type="number" className="text-right" value={it.rate} onChange={(e) => updateItem(it.id, "rate", Number(e.target.value))} /></div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <span className="font-semibold text-sm w-16 text-right">${(it.qty * it.rate).toFixed(2)}</span>
                  <button onClick={() => removeItem(it.id)} className="text-error hover:bg-lighterror h-8 w-8 rounded-full flex items-center justify-center"><Icon icon="solar:trash-bin-minimalistic-bold" width={14} /></button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addItem} className="gap-1.5 mt-3"><Icon icon="solar:add-circle-bold" width={14} /> Add Line Item</Button>
          </div>

          <Separator className="my-5" />

          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2 text-sm">
              <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Tax Rate</span>
                <Select defaultValue="8"><SelectTrigger className="w-24 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="0">0%</SelectItem><SelectItem value="5">5%</SelectItem><SelectItem value="8">8%</SelectItem><SelectItem value="10">10%</SelectItem></SelectContent></Select>
              </div>
              <div className="flex justify-between"><span className="opacity-70">Tax</span><span className="font-medium">${tax.toFixed(2)}</span></div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base"><span className="font-bold">Total</span><span className="font-bold text-primary">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Notes">
          <Textarea placeholder="Payment terms, thank you note, etc." rows={3} />
        </DemoBlock>
      </div>

      <div className="space-y-6">
        <DemoBlock title="Invoice Details">
          <div className="space-y-4">
            <div><Label>Invoice #</Label><Input defaultValue="INV-2024-007" className="mt-2 font-mono" /></div>
            <div><Label>Issue Date</Label><Input type="date" defaultValue="2024-06-24" className="mt-2" /></div>
            <div><Label>Due Date</Label><Input type="date" defaultValue="2024-07-08" className="mt-2" /></div>
            <div>
              <Label>Status</Label>
              <Select defaultValue="draft"><SelectTrigger className="mt-2 w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Currency">
          <Select defaultValue="usd"><SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD ($)</SelectItem>
              <SelectItem value="eur">EUR (€)</SelectItem>
              <SelectItem value="gbp">GBP (£)</SelectItem>
              <SelectItem value="inr">INR (₹)</SelectItem>
            </SelectContent>
          </Select>
        </DemoBlock>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">Save Draft</Button>
          <Button className="flex-1 gap-1.5"><Icon icon="solar:letter-linear" width={16} /> Send</Button>
        </div>
      </div>
    </div>
  );
};
