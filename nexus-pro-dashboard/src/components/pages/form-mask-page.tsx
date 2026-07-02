"use client";

import * as React from "react";
import { Phone, CreditCard, Calendar, Hash, Mail } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormMask() {
  const [phone, setPhone] = React.useState("");
  const [card, setCard] = React.useState("");
  const [date, setDate] = React.useState("");
  const [cvc, setCvc] = React.useState("");

  const maskPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0,3)}) ${d.slice(3)}`;
    return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  };
  const maskCard = (v: string) => v.replace(/\D/g, "").slice(0,16).replace(/(.{4})/g, "$1 ").trim();
  const maskDate = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0,4);
    return d.length <= 2 ? d : `${d.slice(0,2)}/${d.slice(2)}`;
  };

  return (
    <div>
      <PageHeader breadcrumb={["Forms", "Input Mask"]} title="Input Mask" description="Format input fields automatically as users type." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Formatted Inputs</h3>
          <div className="space-y-4">
            <div><Label>Phone Number</Label><div className="relative mt-1.5"><Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input value={phone} onChange={e=>setPhone(maskPhone(e.target.value))} placeholder="(555) 123-4567" className="pl-9" /></div><p className="mt-1 text-xs text-gray-400">Format: (XXX) XXX-XXXX</p></div>
            <div><Label>Credit Card</Label><div className="relative mt-1.5"><CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input value={card} onChange={e=>setCard(maskCard(e.target.value))} placeholder="4242 4242 4242 4242" className="pl-9" /></div><p className="mt-1 text-xs text-gray-400">Format: XXXX XXXX XXXX XXXX</p></div>
            <div><Label>Expiry Date</Label><div className="relative mt-1.5"><Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input value={date} onChange={e=>setDate(maskDate(e.target.value))} placeholder="MM/YY" className="pl-9" /></div><p className="mt-1 text-xs text-gray-400">Format: MM/YY</p></div>
            <div><Label>CVC</Label><div className="relative mt-1.5"><Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input value={cvc} onChange={e=>setCvc(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="123" className="pl-9" /></div><p className="mt-1 text-xs text-gray-400">3-4 digits</p></div>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Mask Examples</h3>
          <div className="space-y-3">
            {[
              { type: "Phone", format: "(555) 123-4567", desc: "US phone format with area code" },
              { type: "Credit Card", format: "4242 4242 4242 4242", desc: "16-digit card number with spaces" },
              { type: "Date", format: "MM/YY", desc: "2-digit month and year" },
              { type: "Currency", format: "$1,234.56", desc: "Decimal with thousand separators" },
              { type: "ZIP Code", format: "12345-6789", desc: "US postal code with extension" },
              { type: "SSN", format: "123-45-6789", desc: "Social Security Number format" },
              { type: "Time", format: "HH:MM", desc: "24-hour time format" },
              { type: "IP Address", format: "192.168.1.1", desc: "IPv4 address format" },
            ].map(m => (
              <div key={m.type} className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-800 p-3">
                <div><p className="text-sm font-medium text-gray-800 dark:text-white/90">{m.type}</p><p className="text-xs text-gray-400">{m.desc}</p></div>
                <code className="text-xs font-mono text-brand-500 bg-brand-50 dark:bg-brand-500/15 px-2 py-1 rounded">{m.format}</code>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
