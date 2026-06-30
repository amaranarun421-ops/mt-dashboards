"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { invoices } from "../../../data/invoices";

const statusVariant = { Paid: "lightSuccess", Pending: "lightWarning", Overdue: "lightError", Draft: "lightInfo" } as const;

const InvoiceListPage = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  let filtered = invoices.filter((i) => i.client.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()));
  if (tab !== "all") filtered = filtered.filter((i) => i.status.toLowerCase() === tab);

  const totalAmount = invoices.reduce((s, i) => s + i.amount, 0);
  const paidAmount = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pendingAmount = invoices.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const overdueAmount = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <PageContainer
      title="Invoices"
      description="Track billing, payments, and overdue accounts."
      actions={<Button asChild className="gap-1.5"><Link href="/apps/invoice/create"><Icon icon="solar:add-circle-bold" width={16} /> Create Invoice</Link></Button>}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Billed", value: `$${totalAmount.toLocaleString()}`, icon: "solar:dollar-minimalistic-bold-duotone", color: "primary", sub: `${invoices.length} invoices` },
          { label: "Paid", value: `$${paidAmount.toLocaleString()}`, icon: "solar:check-circle-bold-duotone", color: "success", sub: `${invoices.filter(i => i.status === "Paid").length} invoices` },
          { label: "Pending", value: `$${pendingAmount.toLocaleString()}`, icon: "solar:clock-circle-bold-duotone", color: "warning", sub: `${invoices.filter(i => i.status === "Pending").length} invoices` },
          { label: "Overdue", value: `$${overdueAmount.toLocaleString()}`, icon: "solar:danger-bold-duotone", color: "error", sub: `${invoices.filter(i => i.status === "Overdue").length} invoices` },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-background p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs opacity-70">{s.label}</p>
                <p className="text-xl font-bold mt-1">{s.value}</p>
                <p className="text-xs opacity-60 mt-1">{s.sub}</p>
              </div>
              <div className={`h-10 w-10 rounded-xl bg-light${s.color} text-${s.color} flex items-center justify-center`}>
                <Icon icon={s.icon} width={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <DemoBlock title={`Invoice List (${filtered.length})`}>
        <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
          <div className="relative md:max-w-md flex-1">
            <Icon icon="solar:magnifer-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <Input placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lightprimary/50 hover:bg-lightprimary/50">
                <TableHead className="text-primary">Invoice #</TableHead>
                <TableHead className="text-primary">Client</TableHead>
                <TableHead className="text-primary">Date</TableHead>
                <TableHead className="text-primary">Due Date</TableHead>
                <TableHead className="text-primary">Amount</TableHead>
                <TableHead className="text-primary">Status</TableHead>
                <TableHead className="text-primary text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-lightgray/40 dark:hover:bg-dark/30">
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarImage src={`/images/profile/user-${inv.img}.jpg`} /><AvatarFallback>{inv.client[0]}</AvatarFallback></Avatar>
                      <div><p className="text-sm font-medium">{inv.client}</p><p className="text-xs opacity-60">{inv.email}</p></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{inv.date}</TableCell>
                  <TableCell className="text-sm">{inv.dueDate}</TableCell>
                  <TableCell className="font-semibold">${inv.amount.toLocaleString()}</TableCell>
                  <TableCell><Badge variant={statusVariant[inv.status]}>{inv.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                        <Link href={`/apps/invoice/details/${inv.id.split("-")[2]}`}><Icon icon="solar:eye-linear" width={16} /></Link>
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" asChild>
                        <Link href={`/apps/invoice/edit/${inv.id.split("-")[2]}`}><Icon icon="solar:pen-linear" width={16} /></Link>
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-lightprimary hover:text-primary"><Icon icon="solar:download-minimalistic-bold" width={16} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DemoBlock>
    </PageContainer>
  );
};

export default InvoiceListPage;
