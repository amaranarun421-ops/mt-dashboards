"use client";

import * as React from "react";
import { useState } from "react";
import {
  CreditCard, Download, Users, Database, Activity, Zap, Crown,
  CheckCircle2, AlertTriangle, Clock, ArrowUpRight, RefreshCw,
  Calendar, Receipt, Wallet, Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

const usage = [
  { label: "Team seats", used: 18, total: 25, unit: "seats", icon: Users, color: "var(--chart-1)" },
  { label: "Storage", used: 412, total: 500, unit: "GB", icon: Database, color: "var(--chart-2)" },
  { label: "API calls", used: 842321, total: 1000000, unit: "calls", icon: Activity, color: "var(--chart-3)" },
  { label: "Webhooks", used: 12480, total: 25000, unit: "events", icon: Zap, color: "var(--chart-4)" },
];

const invoices = [
  { id: "INV-2024-1015", date: "Oct 15, 2024", amount: 2475, status: "paid", method: "Visa •••• 4242" },
  { id: "INV-2024-0915", date: "Sep 15, 2024", amount: 2475, status: "paid", method: "Visa •••• 4242" },
  { id: "INV-2024-0815", date: "Aug 15, 2024", amount: 2475, status: "paid", method: "Visa •••• 4242" },
  { id: "INV-2024-0715", date: "Jul 15, 2024", amount: 1980, status: "paid", method: "Visa •••• 4242" },
  { id: "INV-2024-0615", date: "Jun 15, 2024", amount: 1980, status: "paid", method: "Visa •••• 4242" },
  { id: "INV-2024-0515", date: "May 15, 2024", amount: 1980, status: "paid", method: "Visa •••• 4242" },
  { id: "INV-2024-0415", date: "Apr 15, 2024", amount: 1485, status: "paid", method: "Visa •••• 4242" },
  { id: "INV-2024-0315", date: "Mar 15, 2024", amount: 1485, status: "failed", method: "Visa •••• 4242" },
];

const formatNum = (n: number, unit: string) => {
  if (unit === "calls") return n.toLocaleString();
  return String(n);
};

export default function BillingPage() {
  const [cycle, setCycle] = useState("monthly");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Manage your subscription, payment methods, and view your billing history."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Billing" }]}
        actions={
          <Button variant="outline" size="sm" className="h-9" onClick={() => toast.success("All invoices downloaded")}>
            <Download className="size-4 mr-2" /> Download all
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Current Plan" value="Pro" icon={<Crown className="size-5" />} deltaLabel="$99 / user / mo" />
        <StatCard label="Next Invoice" value="$2,475" icon={<Receipt className="size-5" />} deltaLabel="Nov 15, 2024" />
        <StatCard label="YTD Spend" value="$21,420" icon={<Wallet className="size-5" />} delta={18.4} deltaLabel="vs last year" />
        <StatCard label="Payment Method" value="Visa 4242" icon={<CreditCard className="size-5" />} deltaLabel="expires 06/26" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Current plan"
          description="Pro — billed monthly"
          className="lg:col-span-2"
          actions={
            <Select value={cycle} onValueChange={setCycle}>
              <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="annual">Annual (save 20%)</SelectItem>
              </SelectContent>
            </Select>
          }
        >
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-chart-4/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Crown className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Pro Plan</h3>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1">
                      <CheckCircle2 className="size-3" /> Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    ${cycle === "annual" ? "82" : "99"} / user / month · {cycle === "annual" ? "billed annually" : "billed monthly"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Calendar className="size-3 inline mr-1" /> Renews on Nov 15, 2024 · 25 user licenses
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-bold">${cycle === "annual" ? "24,750" : "2,475"}</p>
                <p className="text-xs text-muted-foreground">{cycle === "annual" ? "/ year" : "/ month"}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Usage this billing period</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {usage.map((u) => {
                  const pct = (u.used / u.total) * 100;
                  const isWarning = pct >= 80;
                  return (
                    <div key={u.label} className="p-4 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <u.icon className="size-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{u.label}</span>
                        </div>
                        {isWarning && (
                          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-[10px] h-4 px-1 gap-1">
                            <AlertTriangle className="size-2.5" /> Near limit
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-lg font-bold">{formatNum(u.used, u.unit)}</span>
                        <span className="text-xs text-muted-foreground">/ {formatNum(u.total, u.unit)} {u.unit}</span>
                      </div>
                      <Progress value={pct} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1.5">{pct.toFixed(0)}% used · resets Nov 15</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
              <Button onClick={() => toast.success("Manage subscription", { description: "Opening plan management..." })}>
                <ArrowUpRight className="size-4 mr-2" /> Upgrade plan
              </Button>
              <Button variant="outline" onClick={() => toast.info("Add seat flow coming soon")}>
                <Users className="size-4 mr-2" /> Add seats
              </Button>
              <Button variant="outline" onClick={() => toast.info("Cancel subscription requires confirmation")}>
                Cancel subscription
              </Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Payment method" description="Default card used for billing">
          <div className="space-y-4">
            <div className="relative p-5 rounded-xl bg-gradient-to-br from-foreground to-foreground/80 text-background overflow-hidden">
              <div className="absolute -top-10 -right-10 size-32 rounded-full bg-background/10" />
              <div className="absolute -bottom-12 -left-12 size-32 rounded-full bg-background/5" />
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <Building2 className="size-7" />
                  <CreditCard className="size-6" />
                </div>
                <p className="text-lg font-mono tracking-wider mb-4">•••• •••• •••• 4242</p>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="opacity-60 uppercase tracking-wider text-[10px]">Card holder</p>
                    <p className="font-medium">Alex Morgan</p>
                  </div>
                  <div>
                    <p className="opacity-60 uppercase tracking-wider text-[10px]">Expires</p>
                    <p className="font-medium">06 / 26</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Card type", value: "Visa" },
                { label: "Brand", value: "Visa Platinum" },
                { label: "Country", value: "United States" },
              ].map((d) => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{d.label}</span>
                  <span className="font-medium">{d.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/5 border border-warning/20">
              <AlertTriangle className="size-4 text-warning mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">Your card expires in 8 months. Update before June 2026 to avoid service disruption.</p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => toast.info("Opening payment method editor")}>
              <RefreshCw className="size-4 mr-2" /> Update payment method
            </Button>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Billing history"
        description="All invoices for the past 12 months"
        noBodyPadding
        actions={<Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1"><CheckCircle2 className="size-3" /> All paid</Badge>}
      >
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id} className="hover:bg-accent/50">
                <TableCell className="pl-5">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Receipt className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium font-mono">{inv.id}</p>
                      <p className="text-xs text-muted-foreground">Monthly subscription</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="size-3.5" /> {inv.date}
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">${inv.amount.toLocaleString()}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{inv.method}</TableCell>
                <TableCell>
                  {inv.status === "paid" ? (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1">
                      <CheckCircle2 className="size-3" /> Paid
                    </Badge>
                  ) : inv.status === "failed" ? (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 gap-1">
                      <AlertTriangle className="size-3" /> Failed
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 gap-1">
                      <Clock className="size-3" /> Due
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <Button
                    variant="ghost" size="sm" className="h-8"
                    onClick={() => toast.success(`Downloading ${inv.id}.pdf`)}
                  >
                    <Download className="size-3.5 mr-1.5" /> PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Spending insights" description="Last 6 months">
          <div className="space-y-3">
            {[
              { month: "Oct", value: 2475 },
              { month: "Sep", value: 2475 },
              { month: "Aug", value: 2475 },
              { month: "Jul", value: 1980 },
              { month: "Jun", value: 1980 },
              { month: "May", value: 1980 },
            ].map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-8">{m.month}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(m.value / 2475) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium w-16 text-right">${m.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Tax information" description="For accounting purposes">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax ID</span>
              <span className="font-medium font-mono">US-123456789</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">YTD tax paid</span>
              <span className="font-medium">$1,712.50</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax rate</span>
              <span className="font-medium">8.0% (CA)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Billing address</span>
              <span className="text-xs">San Francisco, US</span>
            </div>
            <Button variant="outline" size="sm" className="w-full h-8" onClick={() => toast.info("Opening tax settings")}>
              Update tax info
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Need help?" description="Billing support options">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start h-9" onClick={() => toast.success("Support ticket created")}>
              <Receipt className="size-4 mr-2" /> Dispute a charge
            </Button>
            <Button variant="outline" className="w-full justify-start h-9" onClick={() => toast.info("Opening refund request form")}>
              <RefreshCw className="size-4 mr-2" /> Request a refund
            </Button>
            <Button variant="outline" className="w-full justify-start h-9" onClick={() => toast.success("Billing specialist will reach out")}>
              <Wallet className="size-4 mr-2" /> Talk to billing
            </Button>
            <div className="p-3 rounded-lg bg-info/5 border border-info/20 mt-3">
              <p className="text-xs text-muted-foreground">
                <Clock className="size-3 inline mr-1" /> Avg response time: 2 hours during business hours.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
