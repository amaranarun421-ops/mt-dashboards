"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";

type Contact = { id: number; name: string; email: string; phone: string; img: number; role: string; company: string; status: "Active" | "Inactive"; favorite: boolean };

const contacts: Contact[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@acme.com", phone: "+1 555 0101", img: 4, role: "Product Manager", company: "Acme Corp", status: "Active", favorite: true },
  { id: 2, name: "Michael Chen", email: "m.chen@techco.com", phone: "+1 555 0102", img: 5, role: "Lead Designer", company: "TechCo", status: "Active", favorite: false },
  { id: 3, name: "Emily Rodriguez", email: "emily.r@designhub.com", phone: "+1 555 0103", img: 6, role: "UX Researcher", company: "DesignHub", status: "Active", favorite: true },
  { id: 4, name: "David Park", email: "d.park@startupx.com", phone: "+1 555 0104", img: 7, role: "CTO", company: "StartupX", status: "Inactive", favorite: false },
  { id: 5, name: "Lisa Anderson", email: "lisa.a@hr.com", phone: "+1 555 0105", img: 8, role: "HR Director", company: "GlobalHR", status: "Active", favorite: false },
  { id: 6, name: "James Wilson", email: "j.wilson@sales.com", phone: "+1 555 0106", img: 9, role: "Sales Lead", company: "SalesPro", status: "Inactive", favorite: false },
  { id: 7, name: "Priya Patel", email: "priya.p@eng.com", phone: "+1 555 0107", img: 10, role: "Engineer", company: "EngWorks", status: "Active", favorite: true },
  { id: 8, name: "Tom Anderson", email: "tom.a@fin.com", phone: "+1 555 0108", img: 1, role: "CFO", company: "FinCorp", status: "Active", favorite: false },
];

const ContactsPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageContainer
      title="Contacts"
      description="Manage your contact directory with grid and list views, favorites, and search."
      actions={
        <div className="flex gap-2">
          <div className="inline-flex rounded-md bg-lightgray dark:bg-dark p-1">
            <Button size="sm" variant={view === "grid" ? "default" : "ghost"} className="gap-1.5" onClick={() => setView("grid")}><Icon icon="solar:widget-bold" width={14} /> Grid</Button>
            <Button size="sm" variant={view === "list" ? "default" : "ghost"} className="gap-1.5" onClick={() => setView("list")}><Icon icon="solar:list-bold" width={14} /> List</Button>
          </div>
          <Button className="gap-1.5"><Icon icon="solar:add-circle-bold" width={16} /> Add Contact</Button>
        </div>
      }
    >
      <DemoBlock title={`All Contacts (${filtered.length})`}>
        <div className="relative mb-4 max-w-md">
          <Icon icon="solar:magnifer-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((c) => (
              <div key={c.id} className="rounded-xl border border-defaultBorder bg-background p-5 text-center hover:shadow-md transition-shadow group">
                <div className="relative inline-block">
                  <Avatar className="h-20 w-20"><AvatarImage src={`/images/profile/user-${c.img}.jpg`} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
                  {c.favorite && <Icon icon="solar:star-bold" className="absolute -top-1 -right-1 text-warning bg-background rounded-full p-0.5" width={20} />}
                </div>
                <h6 className="font-semibold mt-3">{c.name}</h6>
                <p className="text-xs opacity-70">{c.role}</p>
                <p className="text-xs opacity-60 mt-0.5">{c.company}</p>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  <Badge variant={c.status === "Active" ? "lightSuccess" : "lightError"}>{c.status}</Badge>
                </div>
                <div className="flex items-center justify-center gap-1 mt-4 pt-4 border-t border-defaultBorder">
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-lightprimary hover:text-primary"><Icon icon="solar:letter-linear" width={16} /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-lightprimary hover:text-primary"><Icon icon="solar:phone-bold" width={16} /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-lightprimary hover:text-primary"><Icon icon="solar:pen-linear" width={16} /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-lighterror hover:text-error"><Icon icon="solar:trash-bin-minimalistic-linear" width={16} /></Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-defaultBorder overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-lightprimary/50 hover:bg-lightprimary/50">
                  <TableHead className="text-primary">Name</TableHead>
                  <TableHead className="text-primary">Email</TableHead>
                  <TableHead className="text-primary">Phone</TableHead>
                  <TableHead className="text-primary">Company</TableHead>
                  <TableHead className="text-primary">Status</TableHead>
                  <TableHead className="text-primary text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="hover:bg-lightgray/40 dark:hover:bg-dark/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarImage src={`/images/profile/user-${c.img}.jpg`} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium text-sm flex items-center gap-1.5">{c.name}{c.favorite && <Icon icon="solar:star-bold" className="text-warning" width={12} />}</p>
                          <p className="text-xs opacity-60">{c.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{c.email}</TableCell>
                    <TableCell className="text-sm">{c.phone}</TableCell>
                    <TableCell className="text-sm">{c.company}</TableCell>
                    <TableCell><Badge variant={c.status === "Active" ? "lightSuccess" : "lightError"}>{c.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Icon icon="solar:eye-linear" width={16} /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8"><Icon icon="solar:pen-linear" width={16} /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-lighterror hover:text-error"><Icon icon="solar:trash-bin-minimalistic-linear" width={16} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DemoBlock>
    </PageContainer>
  );
};

export default ContactsPage;
