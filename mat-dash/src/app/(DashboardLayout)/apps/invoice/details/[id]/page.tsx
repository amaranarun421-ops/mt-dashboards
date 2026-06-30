"use client";
import PageContainer from "../../../../layout/shared/page-container/PageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { invoices } from "../../../../data/invoices";

const statusVariant = { Paid: "lightSuccess", Pending: "lightWarning", Overdue: "lightError", Draft: "lightInfo" } as const;

const InvoiceDetails = ({ params }: { params: { id: string } }) => {
  const inv = invoices[Number(params.id) - 1] || invoices[0];
  const subtotal = inv.items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <PageContainer
      title="Invoice Details"
      breadcrumb={[{ to: "/", title: "Home" }, { to: "/apps/invoice/list", title: "Invoices" }, { title: inv.id }]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:download-minimalistic-bold" width={14} /> Download</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:letter-linear" width={14} /> Email</Button>
          <Button size="sm" className="gap-1.5"><Icon icon="solar:print-bold" width={14} /> Print</Button>
        </div>
      }
    >
      <div className="rounded-xl bg-background p-8 shadow-xs max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-defaultBorder">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-primary text-white flex items-center justify-center"><Icon icon="solar:bill-list-bold-duotone" width={28} /></div>
              <div>
                <h2 className="text-xl font-bold">mtverse Inc.</h2>
                <p className="text-xs opacity-70">123 Business Ave, San Francisco, CA 94102</p>
              </div>
            </div>
            <p className="text-sm opacity-70">contact@mtverse.io · +1 555 000 1234</p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-primary">INVOICE</h1>
            <p className="font-mono text-sm mt-1">{inv.id}</p>
            <Badge variant={statusVariant[inv.status]} className="mt-2">{inv.status}</Badge>
          </div>
        </div>

        {/* Bill To + Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-defaultBorder">
          <div>
            <p className="text-xs opacity-60 uppercase font-semibold mb-2">Bill To</p>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10"><AvatarImage src={`/images/profile/user-${inv.img}.jpg`} /><AvatarFallback>{inv.client[0]}</AvatarFallback></Avatar>
              <div>
                <p className="font-semibold text-sm">{inv.client}</p>
                <p className="text-xs opacity-70">{inv.email}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs opacity-60 uppercase font-semibold mb-2">Invoice Date</p>
            <p className="text-sm font-medium">{inv.date}</p>
          </div>
          <div>
            <p className="text-xs opacity-60 uppercase font-semibold mb-2">Due Date</p>
            <p className="text-sm font-medium">{inv.dueDate}</p>
          </div>
        </div>

        {/* Items */}
        <div className="py-6">
          <table className="w-full">
            <thead>
              <tr className="bg-lightprimary/50 text-left text-sm">
                <th className="py-3 px-4 font-semibold text-primary rounded-l-lg">Description</th>
                <th className="py-3 px-4 font-semibold text-primary text-center">Qty</th>
                <th className="py-3 px-4 font-semibold text-primary text-right">Rate</th>
                <th className="py-3 px-4 font-semibold text-primary text-right rounded-r-lg">Total</th>
              </tr>
            </thead>
            <tbody>
              {inv.items.map((it, i) => (
                <tr key={i} className="border-b border-defaultBorder">
                  <td className="py-3 px-4 text-sm">{it.description}</td>
                  <td className="py-3 px-4 text-sm text-center">{it.qty}</td>
                  <td className="py-3 px-4 text-sm text-right">${it.rate.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-right font-medium">${(it.qty * it.rate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between"><span className="opacity-70">Subtotal</span><span className="font-medium">${subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="opacity-70">Tax (8%)</span><span className="font-medium">${tax.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="opacity-70">Discount</span><span className="font-medium">$0.00</span></div>
            <Separator className="my-2" />
            <div className="flex justify-between text-base"><span className="font-bold">Total</span><span className="font-bold text-primary">${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-defaultBorder">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs opacity-60 uppercase font-semibold mb-2">Payment Info</p>
              <p className="text-sm opacity-80">Bank: First National Bank<br />Account: 0123456789<br />Routing: 021000021<br />SWIFT: FNBFUS33</p>
            </div>
            <div>
              <p className="text-xs opacity-60 uppercase font-semibold mb-2">Notes</p>
              <p className="text-sm opacity-80">Thank you for your business! Payment is due within 14 days. Please reference invoice number on your payment.</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default InvoiceDetails;
