"use client";
import { useState } from "react";
import Link from "next/link";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, IconButton, Avatar, Input, Label, Select, Textarea } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import {
  ChevronLeft, Plus, Trash2, Save, Send,
  Percent, DollarSign, GripVertical, Search, X, Clock
} from "lucide-react";

type LineItem = { id: number; desc: string; qty: number; rate: number };

// Pre-filled with INV-2040 (Globex Industries, sent)
const INITIAL_ITEMS: LineItem[] = [
  { id: 1, desc: "Enterprise license — annual seat", qty: 50, rate: 120, },
  { id: 2, desc: "Onboarding & training", qty: 8, rate: 200 },
  { id: 3, desc: "Custom integration (Slack + Linear)", qty: 1, rate: 3500 },
  { id: 4, desc: "Priority support hours", qty: 24, rate: 150 },
];

const CLIENTS = [
  { id: "c2", name: "Globex Industries", email: "billing@globex.example", address: "42 Industrial Ave, Detroit, MI" },
  { id: "c1", name: "Acme Corporation", email: "ap@acme.example", address: "100 Market Street, San Francisco, CA" },
  { id: "c3", name: "Initech LLC", email: "accounts@initech.example", address: "200 Tech Way, Austin, TX" },
  { id: "c4", name: "Stark Enterprises", email: "pepper@stark.example", address: "10880 Malibu Point, Malibu, CA" },
  { id: "c5", name: "Wayne Foundation", email: "lucius@wayne.example", address: "1007 Mountain Dr, Gotham, NJ" },
];

export default function InvoiceEditPage() {
  const [items, setItems] = useState<LineItem[]>(INITIAL_ITEMS);
  const [clientId, setClientId] = useState("c2");
  const [issued, setIssued] = useState("2026-06-20");
  const [due, setDue] = useState("2026-07-20");
  const [currency, setCurrency] = useState("USD");
  const [taxRate, setTaxRate] = useState(8);
  const [discount, setDiscount] = useState(5);
  const [notes, setNotes] = useState("Net 30 — payment due within 30 days of issue. Late payments subject to 1.5% monthly interest. Questions? Email billing@nimbuspro.io.");
  const [showClientPicker, setShowClientPicker] = useState(false);
  const [clientSearch, setClientSearch] = useState("");

  const addItem = () => setItems((p) => [...p, { id: Date.now(), desc: "", qty: 1, rate: 0 }]);
  const removeItem = (id: number) => setItems((p) => p.filter((i) => i.id !== id));
  const updateItem = (id: number, field: keyof LineItem, value: string | number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  const discountAmount = Math.round(subtotal * (discount / 100));
  const total = subtotal + taxAmount - discountAmount;

  const client = CLIENTS.find((c) => c.id === clientId) ?? CLIENTS[0];
  const filteredClients = CLIENTS.filter((c) =>
    !clientSearch.trim() ? true : c.name.toLowerCase().includes(clientSearch.toLowerCase()) || c.email.toLowerCase().includes(clientSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Edit Invoice · INV-2040"
        description="Last edited 2 hours ago by Priya Iyer · Status: Sent"
        breadcrumbs={[
          { label: "Apps" },
          { label: "Invoices", href: "/apps/invoices/list" },
          { label: "INV-2040" },
          { label: "Edit" },
        ]}
        actions={
          <>
            <Link href="/apps/invoices/detail">
              <Button variant="secondary"><ChevronLeft className="h-4 w-4" /> Cancel</Button>
            </Link>
            <Button variant="danger"><Trash2 className="h-4 w-4" /> Delete</Button>
            <Button><Send className="h-4 w-4" /> Save & Send</Button>
          </>
        }
      />

      {/* Last edited banner */}
      <Card className="border-warning-200 bg-warning-50/40 p-3 dark:border-warning-800 dark:bg-warning-500/10">
        <div className="flex items-center gap-2 text-xs text-warning-700 dark:text-warning-300">
          <Clock className="h-3.5 w-3.5" />
          <span>You&apos;re editing a <strong>sent</strong> invoice. Saving will create a new version and notify the client of the changes.</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Form */}
        <div className="space-y-4">
          {/* Client + dates */}
          <Card>
            <CardHeader title="Invoice details" description="Update client info and dates" />
            <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label required>Client</Label>
                <button
                  onClick={() => setShowClientPicker(true)}
                  className="mt-1 flex w-full items-center gap-3 rounded-lg border border-gray-200 p-3 text-left transition-colors hover:border-brand-300 dark:border-gray-800 dark:hover:border-brand-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
                    {client.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{client.name}</p>
                    <p className="text-xs text-gray-500">{client.email}</p>
                  </div>
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <div>
                <Label required>Issue date</Label>
                <Input type="date" value={issued} onChange={(e) => setIssued(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label required>Due date</Label>
                <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label>Currency</Label>
                <Select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1">
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="INR">INR — Indian Rupee</option>
                  <option value="JPY">JPY — Japanese Yen</option>
                </Select>
              </div>
              <div>
                <Label>Invoice number</Label>
                <Input value="INV-2040" readOnly className="mt-1 bg-gray-50 dark:bg-gray-800/50" />
              </div>
            </CardBody>
          </Card>

          {/* Line items */}
          <Card className="p-0">
            <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Line items</p>
                <p className="text-xs text-gray-500">{items.length} items · editing existing invoice</p>
              </div>
              <Button size="sm" onClick={addItem}><Plus className="h-3.5 w-3.5" /> Add line</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-left dark:border-gray-800">
                    <th className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Description</th>
                    <th className="w-20 px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Qty</th>
                    <th className="w-28 px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Rate</th>
                    <th className="w-28 px-2 py-2 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">Amount</th>
                    <th className="w-12 px-2 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 dark:border-gray-800/50">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-3.5 w-3.5 cursor-grab text-gray-300" />
                          <input
                            value={item.desc}
                            onChange={(e) => updateItem(item.id, "desc", e.target.value)}
                            placeholder="Description of work..."
                            className="w-full border-0 bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
                          />
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, "qty", Number(e.target.value))}
                          className="w-16 rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-700 outline-none focus:border-brand-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                          className="w-24 rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-700 outline-none focus:border-brand-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        />
                      </td>
                      <td className="px-2 py-2 text-right text-sm font-bold text-gray-900 dark:text-white">
                        {formatCurrency(item.qty * item.rate)}
                      </td>
                      <td className="px-2 py-2 text-right">
                        <IconButton
                          aria-label="Remove"
                          className="h-7 w-7 text-gray-400 hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 p-4 dark:border-gray-800">
              <Button variant="ghost" size="sm" onClick={addItem}><Plus className="h-3.5 w-3.5" /> Add another line</Button>
              <p className="text-xs text-gray-500">{items.length} line items</p>
            </div>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader title="Notes & terms" description="Visible to the client on the invoice" />
            <CardBody>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </CardBody>
          </Card>
        </div>

        {/* Summary sidebar */}
        <aside className="space-y-4">
          <Card className="sticky top-4">
            <CardHeader title="Summary" description="Live calculation" />
            <CardBody className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Tax rate (%)</Label>
                  <div className="relative mt-1">
                    <Percent className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="input pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label>Discount (%)</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="input pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tax ({taxRate}%)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(taxAmount)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Discount ({discount}%)</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">— {formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
                  <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                <Button className="w-full"><Save className="h-4 w-4" /> Save changes</Button>
                <Button variant="secondary" className="w-full"><Send className="h-4 w-4" /> Save & Send</Button>
                <Button variant="ghost" className="w-full text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10">
                  <Trash2 className="h-4 w-4" /> Delete invoice
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Activity log */}
          <Card>
            <CardHeader title="Activity" description="Recent changes to this invoice" />
            <CardBody className="space-y-3">
              {[
                { user: "Priya Iyer", action: "Added line item 'Onboarding & training'", time: "2h ago" },
                { user: "Priya Iyer", action: "Changed discount from 0% to 5%", time: "2h ago" },
                { user: "Ethan Wright", action: "Sent invoice to billing@globex.example", time: "1d ago" },
                { user: "Priya Iyer", action: "Created invoice", time: "1d ago" },
              ].map((a, i) => (
                <div key={i} className="flex gap-2.5">
                  <Avatar name={a.user} size={24} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      <span className="font-semibold text-gray-900 dark:text-white">{a.user}</span> {a.action}
                    </p>
                    <p className="text-[10px] text-gray-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </aside>
      </div>

      {/* Client picker modal */}
      {showClientPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm" onClick={() => setShowClientPicker(false)}>
          <Card className="w-full max-w-lg p-0" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Select a client</p>
              <IconButton aria-label="Close" onClick={() => setShowClientPicker(false)}><X className="h-4 w-4" /></IconButton>
            </div>
            <div className="border-b border-gray-100 p-3 dark:border-gray-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Search clients..."
                  className="input pl-9"
                />
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredClients.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setClientId(c.id); setShowClientPicker(false); setClientSearch(""); }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50",
                    c.id === clientId && "bg-brand-50 dark:bg-brand-500/10"
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.email}</p>
                  </div>
                  {c.id === clientId && <Badge tone="brand" variant="soft">Selected</Badge>}
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
