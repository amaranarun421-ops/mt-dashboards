"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Badge, Button, Avatar, AvatarGroup, SearchInput, StatCard, MoreMenu } from "@/components/ui";
import { CONTACTS } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Plus, Filter, Upload, Download, MoreHorizontal, Building2, Users, UserPlus, DollarSign,
  Briefcase, Star, Phone, Mail, Globe, MapPin, ChevronDown, Mailbox
} from "lucide-react";

const TIER_TONE: Record<string, "brand" | "purple" | "gray"> = {
  enterprise: "brand",
  pro: "purple",
  free: "gray",
};

const STATUS_TONE: Record<string, "success" | "warning"> = {
  active: "success",
  lead: "warning",
};

const GROUPS = [
  { id: "all", label: "All Contacts", icon: Users, count: 5 },
  { id: "customers", label: "Customers", icon: Building2, count: 3 },
  { id: "leads", label: "Leads", icon: UserPlus, count: 1 },
  { id: "partners", label: "Partners", icon: Briefcase, count: 1 },
  { id: "vendors", label: "Vendors", icon: Mailbox, count: 0 },
];

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");

  const filtered = CONTACTS.filter((c) => {
    const matchesSearch = !search.trim() ? true : c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase());
    const matchesGroup =
      activeGroup === "all" ? true :
      activeGroup === "customers" ? c.status === "active" :
      activeGroup === "leads" ? c.status === "lead" :
      activeGroup === "partners" ? c.industry === "Tech" :
      activeGroup === "vendors" ? false : true;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Contacts"
        description="Manage companies, leads, partners, and vendors in one CRM."
        breadcrumbs={[{ label: "Apps" }, { label: "Contacts" }]}
        actions={
          <>
            <Button variant="secondary"><Upload className="h-4 w-4" /> Import</Button>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Plus className="h-4 w-4" /> Add contact</Button>
          </>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Contacts" value="248" delta="+12" deltaTone="up" icon={Users} iconTone="brand" footer="across 5 groups" />
        <StatCard label="Active" value="184" delta="+8%" deltaTone="up" icon={Star} iconTone="success" footer="this quarter" />
        <StatCard label="New This Month" value="22" delta="+4" deltaTone="up" icon={UserPlus} iconTone="purple" footer="vs last month" />
        <StatCard label="Avg. Deal Size" value="$48.2k" delta="+6.4%" deltaTone="up" icon={DollarSign} iconTone="orange" footer="enterprise tier" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="space-y-4">
          <Card className="p-3">
            <nav className="space-y-0.5">
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGroup(g.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeGroup === g.id
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <g.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{g.label}</span>
                  <span className={cn(
                    "rounded-md px-1.5 py-0.5 text-[10px] font-bold",
                    activeGroup === g.id ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  )}>{g.count}</span>
                </button>
              ))}
            </nav>
          </Card>

          <Card className="p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">By industry</p>
            <div className="space-y-2">
              {[
                { label: "SaaS", count: 4, tone: "bg-brand-500" },
                { label: "Manufacturing", count: 1, tone: "bg-purple-500" },
                { label: "Finance", count: 1, tone: "bg-warning-500" },
                { label: "Tech", count: 1, tone: "bg-pink-500" },
                { label: "Charity", count: 1, tone: "bg-orange-500" },
              ].map((i) => (
                <button key={i.label} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                  <span className={cn("h-2 w-2 rounded-full", i.tone)} />
                  <span className="flex-1 text-left">{i.label}</span>
                  <span className="text-[10px] text-gray-400">{i.count}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-brand-500 to-accent-500 p-4 text-white">
            <UserPlus className="h-5 w-5 opacity-80" />
            <p className="mt-2 text-sm font-semibold">Invite teammates</p>
            <p className="mt-1 text-xs opacity-80">Collaborate on contacts and deals in shared workspaces.</p>
            <button className="mt-3 rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur hover:bg-white/25">Invite</button>
          </Card>
        </aside>

        {/* Main */}
        <Card className="p-0">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
            <SearchInput value={search} onChange={setSearch} placeholder="Search contacts..." className="w-full sm:max-w-xs" />
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Industry <ChevronDown className="h-3 w-3" /></Button>
              <Button variant="outline" size="sm">Tier <ChevronDown className="h-3 w-3" /></Button>
              <Button variant="outline" size="sm">Sort: Name <ChevronDown className="h-3 w-3" /></Button>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Industry</th>
                  <th>Revenue</th>
                  <th>Tier</th>
                  <th>Contacts</th>
                  <th>Status</th>
                  <th>Last Activity</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="cursor-pointer">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{c.name}</p>
                          <p className="text-[11px] text-gray-500">{c.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-700 dark:text-gray-300">{c.industry}</td>
                    <td className="text-sm font-semibold text-gray-900 dark:text-white">{c.revenue}</td>
                    <td>
                      <Badge tone={TIER_TONE[c.tier]} variant="soft" className="capitalize">{c.tier}</Badge>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                        <Users className="h-3.5 w-3.5 text-gray-400" />
                        {c.contacts}
                      </div>
                    </td>
                    <td>
                      <Badge tone={STATUS_TONE[c.status]} variant="soft" dot className="capitalize">{c.status}</Badge>
                    </td>
                    <td className="text-xs text-gray-500">{c.last}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <MoreMenu
                        items={[
                          { label: "View profile", icon: Building2 },
                          { label: "Send email", icon: Mail },
                          { label: "Call", icon: Phone },
                          { label: "Add to starred", icon: Star },
                          { label: "Delete", icon: MoreHorizontal, danger: true },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 p-4 dark:border-gray-800">
            <p className="text-xs text-gray-500">Showing {filtered.length} of {CONTACTS.length} contacts</p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">Previous</Button>
              <Button variant="ghost" size="sm">Next</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Contact detail preview */}
      <Card>
        <CardHeader title="Spotlight: Acme Corporation" description="Enterprise customer · since March 2023" action={<Badge tone="brand" variant="soft" dot>Active</Badge>} />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Primary contact</p>
              <div className="flex items-center gap-2">
                <Avatar name="Pepper Potts" size={36} />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Pepper Potts</p>
                  <p className="text-xs text-gray-500">VP Operations · pepper@acme.example</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Contact info</p>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gray-400" /> +1 (415) 555-0142</p>
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gray-400" /> ap@acme.example</p>
                <p className="flex items-center gap-2"><Globe className="h-3.5 w-3.5 text-gray-400" /> acme.example</p>
                <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-gray-400" /> San Francisco, CA</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Account team</p>
              <div className="flex items-center gap-3">
                <AvatarGroup users={[{ name: "Priya Iyer" }, { name: "Marcus Chen" }, { name: "Sofia García" }]} max={3} size={32} />
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">3 account managers</p>
                  <p className="text-[11px] text-gray-500">Since Mar 2023</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
