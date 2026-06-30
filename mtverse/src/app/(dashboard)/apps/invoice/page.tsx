"use client";

import * as React from "react";
import { useState } from "react";
import {
  Plus, Search, Download, Filter, MoreVertical, Eye, Send, FileText,
  DollarSign, Clock, AlertCircle, CheckCircle2, CreditCard, Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Invoice = {
  id: string; client: string; clientInitials: string; clientColor: string;
  issued: string; due: string; amount: number; status: "paid" | "outstanding" | "overdue" | "draft";
  project: string; items: number;
};

const statusStyles: Record<Invoice["status"], string> = {
  paid: "bg-success/10 text-success border-success/20",
  outstanding: "bg-info/10 text-info border-info/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  draft: "bg-muted text-muted-foreground border-border",
};

const clientColors: Record<string, string> = {
  AC: "bg-rose-500/15 text-rose-600",
  GC: "bg-emerald-500/15 text-emerald-600",
  IN: "bg-sky-500/15 text-sky-600",
  UC: "bg-violet-500/15 text-violet-600",
  SI: "bg-amber-500/15 text-amber-600",
  WE: "bg-fuchsia-500/15 text-fuchsia-600",
  HO: "bg-teal-500/15 text-teal-600",
  LP: "bg-orange-500/15 text-orange-600",
};

const initialInvoices: Invoice[] = [
  { id: "INV-2024-0892", client: "Acme Corp", clientInitials: "AC", clientColor: clientColors.AC, issued: "Sep 10", due: "Sep 24", amount: 12480, status: "paid", project: "Annual license + onboarding", items: 3 },
  { id: "INV-2024-0891", client: "Globex Inc", clientInitials: "GC", clientColor: clientColors.GC, issued: "Sep 08", due: "Sep 22", amount: 8240, status: "paid", project: "Pro plan — 50 seats", items: 2 },
  { id: "INV-2024-0890", client: "Initech", clientInitials: "IN", clientColor: clientColors.IN, issued: "Sep 05", due: "Sep 19", amount: 24600, status: "paid", project: "Enterprise tier — Q4", items: 5 },
  { id: "INV-2024-0893", client: "Umbrella Co", clientInitials: "UC", clientColor: clientColors.UC, issued: "Sep 12", due: "Sep 26", amount: 4280, status: "outstanding", project: "Starter plan upgrade", items: 1 },
  { id: "INV-2024-0894", client: "Stark Industries", clientInitials: "SI", clientColor: clientColors.SI, issued: "Sep 14", due: "Sep 28", amount: 38900, status: "outstanding", project: "Custom integration", items: 8 },
  { id: "INV-2024-0885", client: "Wayne Ent", clientInitials: "WE", clientColor: clientColors.WE, issued: "Aug 28", due: "Sep 11", amount: 6420, status: "overdue", project: "Pro plan — 24 seats", items: 2 },
  { id: "INV-2024-0882", client: "Hooli", clientInitials: "HO", clientColor: clientColors.HO, issued: "Aug 22", due: "Sep 05", amount: 14800, status: "overdue", project: "Annual renewal", items: 4 },
  { id: "INV-2024-0895", client: "Lumen Pharma", clientInitials: "LP", clientColor: clientColors.LP, issued: "Sep 18", due: "Oct 02", amount: 18900, status: "outstanding", project: "Enterprise + SSO", items: 6 },
  { id: "INV-2024-0896", client: "Acme Corp", clientInitials: "AC", clientColor: clientColors.AC, issued: "Sep 20", due: "Oct 04", amount: 9600, status: "draft", project: "Add-on services", items: 3 },
  { id: "INV-2024-0888", client: "Globex Inc", clientInitials: "GC", clientColor: clientColors.GC, issued: "Sep 01", due: "Sep 15", amount: 4200, status: "paid", project: "Training workshop", items: 1 },
  { id: "INV-2024-0886", client: "Initech", clientInitials: "IN", clientColor: clientColors.IN, issued: "Aug 30", due: "Sep 13", amount: 15600, status: "paid", project: "Premium support", items: 2 },
];

const fmt = (n: number) => `$${n.toLocaleString()}`;

export default function InvoiceApp() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newDue, setNewDue] = useState("30");

  const filtered = invoices.filter((inv) => {
    if (filter !== "all" && inv.status !== filter) return false;
    if (query && !(`${inv.id} ${inv.client} ${inv.project}`.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  const stats = {
    total: invoices.reduce((a, i) => a + i.amount, 0),
    paid: invoices.filter((i) => i.status === "paid").reduce((a, i) => a + i.amount, 0),
    outstanding: invoices.filter((i) => i.status === "outstanding").reduce((a, i) => a + i.amount, 0),
    overdue: invoices.filter((i) => i.status === "overdue").reduce((a, i) => a + i.amount, 0),
  };

  const create = () => {
    const amt = parseFloat(newAmount);
    if (!newClient.trim() || !amt || amt <= 0) { toast.error("Client and valid amount required"); return; }
    const initials = newClient.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const inv: Invoice = {
      id: `INV-2024-${String(897 + invoices.length).padStart(4, "0")}`,
      client: newClient, clientInitials: initials, clientColor: clientColors[initials] ?? "bg-muted text-muted-foreground",
      issued: "Sep 24", due: `Oct ${String(24 + parseInt(newDue)).padStart(2, "0")}`,
      amount: amt, status: "draft", project: newProject || "General services", items: 1,
    };
    setInvoices([inv, ...invoices]);
    setNewClient(""); setNewAmount(""); setNewProject(""); setNewDue("30");
    setCreateOpen(false);
    toast.success("Invoice created", { description: `${inv.id} · ${fmt(inv.amount)}` });
  };

  const markPaid = (id: string) => {
    setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status: "paid" } : i));
    toast.success("Marked as paid", { description: id });
  };

  const sendInvoice = (id: string) => {
    toast.success("Invoice sent", { description: `${id} emailed to client` });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Create, track, and manage billing across all your clients."
        breadcrumbs={[{ label: "Apps" }, { label: "Invoice" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9" onClick={() => toast.message("Export started")}><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9" onClick={() => setCreateOpen(true)}><Plus className="size-4 mr-2" /> Create invoice</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Invoiced" value={fmt(stats.total)} icon={<DollarSign className="size-5" />} footer={`${invoices.length} invoices`} />
        <StatCard label="Paid" value={fmt(stats.paid)} delta={12.4} deltaLabel="vs last month" icon={<CheckCircle2 className="size-5" />} footer={`${invoices.filter((i) => i.status === "paid").length} settled`} />
        <StatCard label="Outstanding" value={fmt(stats.outstanding)} icon={<Clock className="size-5" />} footer={`${invoices.filter((i) => i.status === "outstanding").length} pending`} />
        <StatCard label="Overdue" value={fmt(stats.overdue)} delta={-2.1} deltaLabel="vs last month" icon={<AlertCircle className="size-5" />} footer={`${invoices.filter((i) => i.status === "overdue").length} need follow-up`} />
      </div>

      <SectionCard
        title="All invoices"
        description={`${filtered.length} of ${invoices.length} invoices`}
        noBodyPadding
        actions={
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" className="pl-9 h-8 w-48 text-xs" />
            </div>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground"><Filter className="size-4" /></Button>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground"><MoreVertical className="size-4" /></Button>
          </div>
        }
      >
        <div className="p-3 border-b border-border">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-xs">All <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{invoices.length}</Badge></TabsTrigger>
              <TabsTrigger value="paid" className="text-xs">Paid <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{invoices.filter((i) => i.status === "paid").length}</Badge></TabsTrigger>
              <TabsTrigger value="outstanding" className="text-xs">Outstanding <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{invoices.filter((i) => i.status === "outstanding").length}</Badge></TabsTrigger>
              <TabsTrigger value="overdue" className="text-xs">Overdue <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{invoices.filter((i) => i.status === "overdue").length}</Badge></TabsTrigger>
              <TabsTrigger value="draft" className="text-xs">Drafts <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{invoices.filter((i) => i.status === "draft").length}</Badge></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ScrollArea className="max-h-[560px]">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-accent/50">
                  <TableCell className="pl-5 font-mono text-xs font-medium">{inv.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7"><AvatarFallback className={`text-[10px] font-semibold ${inv.clientColor}`}>{inv.clientInitials}</AvatarFallback></Avatar>
                      <span className="text-sm font-medium">{inv.client}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{inv.project}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{inv.issued}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{inv.due}</TableCell>
                  <TableCell className="text-right font-semibold">{fmt(inv.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] capitalize ${statusStyles[inv.status]}`}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="pr-5 text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      {inv.status === "draft" && (
                        <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" onClick={() => sendInvoice(inv.id)} title="Send"><Send className="size-3.5" /></Button>
                      )}
                      {(inv.status === "outstanding" || inv.status === "overdue") && (
                        <Button variant="ghost" size="icon" className="size-7 text-success" onClick={() => markPaid(inv.id)} title="Mark paid"><CheckCircle2 className="size-3.5" /></Button>
                      )}
                      <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" onClick={() => toast.message("Preview opened")} title="Preview"><Eye className="size-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" onClick={() => toast.message("Download started")} title="Download"><Download className="size-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <FileText className="size-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No invoices match this filter</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Payment methods" description="Connected accounts">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="size-9 rounded-md bg-violet-500/15 text-violet-600 flex items-center justify-center"><CreditCard className="size-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Stripe</p>
                <p className="text-[10px] text-muted-foreground">Connected · USD</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">Active</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="size-9 rounded-md bg-sky-500/15 text-sky-600 flex items-center justify-center"><CreditCard className="size-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">PayPal Business</p>
                <p className="text-[10px] text-muted-foreground">Connected · Multi-currency</p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-[10px]">Active</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border">
              <div className="size-9 rounded-md bg-muted text-muted-foreground flex items-center justify-center"><CreditCard className="size-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Wise Transfer</p>
                <p className="text-[10px] text-muted-foreground">Connect for international</p>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => toast.message("Opening Wise…")}>Connect</Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Top clients" description="By total invoiced">
          <div className="space-y-3">
            {Object.entries(
              invoices.reduce((acc, i) => { acc[i.client] = (acc[i.client] || 0) + i.amount; return acc; }, {} as Record<string, number>)
            ).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([client, total]) => {
              const initials = client.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div key={client} className="flex items-center gap-3">
                  <Avatar className="size-8"><AvatarFallback className={`text-[10px] font-semibold ${clientColors[initials] ?? "bg-muted text-muted-foreground"}`}>{initials}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{client}</p>
                    <p className="text-[10px] text-muted-foreground">{invoices.filter((i) => i.client === client).length} invoices</p>
                  </div>
                  <span className="text-sm font-semibold">{fmt(total)}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Quick actions" description="Common workflows">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start h-10" onClick={() => setCreateOpen(true)}><Plus className="size-4 mr-2" /> Create new invoice</Button>
            <Button variant="outline" className="w-full justify-start h-10" onClick={() => toast.message("Reminder sent to 2 clients")}><Send className="size-4 mr-2" /> Send payment reminders</Button>
            <Button variant="outline" className="w-full justify-start h-10" onClick={() => toast.message("Recurring template opened")}><Receipt className="size-4 mr-2" /> Manage recurring invoices</Button>
            <Button variant="outline" className="w-full justify-start h-10" onClick={() => toast.message("Tax report generating")}><FileText className="size-4 mr-2" /> Generate tax report (Q3)</Button>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground">Avg days to pay</p>
                <p className="text-base font-bold">18</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground">Collection rate</p>
                <p className="text-base font-bold text-success">94%</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Create new invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Client name</Label>
              <Input value={newClient} onChange={(e) => setNewClient(e.target.value)} placeholder="e.g. Acme Corp" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Project / description</Label>
              <Input value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder="e.g. Annual license — 50 seats" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Amount (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                  <Input value={newAmount} onChange={(e) => setNewAmount(e.target.value)} placeholder="0.00" type="number" className="pl-7" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Payment terms</Label>
                <Select value={newDue} onValueChange={setNewDue}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="14">Net 14</SelectItem>
                    <SelectItem value="30">Net 30</SelectItem>
                    <SelectItem value="45">Net 45</SelectItem>
                    <SelectItem value="60">Net 60</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
              <p>Invoice will be created as a <span className="font-medium text-foreground">draft</span>. You can review and send it from the invoices table.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={create}><Plus className="size-4 mr-2" /> Create invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
