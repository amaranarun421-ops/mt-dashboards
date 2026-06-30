"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  ArrowUpDown, ArrowUp, ArrowDown, Search, Eye, EyeOff, Download,
  ChevronLeft, ChevronRight, Trash2, Mail, MoreHorizontal, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

type Member = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "invited" | "suspended";
  joined: string;
  salary: number;
};

const seed: Member[] = [
  { id: 1, name: "Alex Morgan", email: "alex@mtverse.io", role: "Admin", department: "Engineering", status: "active", joined: "2021-03-14", salary: 168000 },
  { id: 2, name: "Priya Sharma", email: "priya@mtverse.io", role: "Manager", department: "Design", status: "active", joined: "2021-06-22", salary: 142000 },
  { id: 3, name: "Marcus Chen", email: "marcus@mtverse.io", role: "Editor", department: "Marketing", status: "active", joined: "2022-01-09", salary: 98000 },
  { id: 4, name: "Sarah Kim", email: "sarah@mtverse.io", role: "Editor", department: "Product", status: "invited", joined: "2024-09-30", salary: 112000 },
  { id: 5, name: "Diego Reyes", email: "diego@mtverse.io", role: "Viewer", department: "Operations", status: "active", joined: "2022-11-04", salary: 88000 },
  { id: 6, name: "Yuki Tanaka", email: "yuki@mtverse.io", role: "Manager", department: "Engineering", status: "active", joined: "2021-08-17", salary: 154000 },
  { id: 7, name: "Nadia Hassan", email: "nadia@mtverse.io", role: "Editor", department: "Finance", status: "suspended", joined: "2023-02-21", salary: 102000 },
  { id: 8, name: "Owen Bennett", email: "owen@mtverse.io", role: "Viewer", department: "Sales", status: "active", joined: "2023-05-11", salary: 92000 },
  { id: 9, name: "Lena Fischer", email: "lena@mtverse.io", role: "Admin", department: "Operations", status: "active", joined: "2020-12-01", salary: 172000 },
  { id: 10, name: "Hiro Sato", email: "hiro@mtverse.io", role: "Editor", department: "Engineering", status: "invited", joined: "2024-10-18", salary: 128000 },
  { id: 11, name: "Maya Patel", email: "maya@mtverse.io", role: "Manager", department: "Design", status: "active", joined: "2022-04-25", salary: 138000 },
  { id: 12, name: "Tomas Silva", email: "tomas@mtverse.io", role: "Viewer", department: "Marketing", status: "active", joined: "2023-07-12", salary: 84000 },
  { id: 13, name: "Aisha Khan", email: "aisha@mtverse.io", role: "Editor", department: "Product", status: "active", joined: "2022-09-06", salary: 106000 },
  { id: 14, name: "Felix Wright", email: "felix@mtverse.io", role: "Viewer", department: "Finance", status: "suspended", joined: "2023-03-19", salary: 90000 },
  { id: 15, name: "Zoe Adams", email: "zoe@mtverse.io", role: "Manager", department: "Sales", status: "active", joined: "2021-11-30", salary: 132000 },
  { id: 16, name: "Noah Brooks", email: "noah@mtverse.io", role: "Editor", department: "Operations", status: "active", joined: "2022-06-14", salary: 98000 },
  { id: 17, name: "Liam Carter", email: "liam@mtverse.io", role: "Viewer", department: "Engineering", status: "active", joined: "2023-08-08", salary: 86000 },
  { id: 18, name: "Emma Davis", email: "emma@mtverse.io", role: "Admin", department: "Marketing", status: "active", joined: "2020-08-21", salary: 165000 },
];

type SortKey = "name" | "role" | "department" | "status" | "joined" | "salary";
type SortDir = "asc" | "desc";

const statusStyle: Record<Member["status"], string> = {
  active: "bg-success/10 text-success border-success/20",
  invited: "bg-info/10 text-info border-info/20",
  suspended: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function TablesPage() {
  const [query, setQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<SortKey>("name");
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [visibleCols, setVisibleCols] = React.useState<Record<string, boolean>>({
    name: true, role: true, department: true, status: true, joined: true, salary: true,
  });
  const [data, setData] = React.useState<Member[]>(seed);
  const pageSize = 6;

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase();
    const list = data.filter(
      (m) => m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.department.toLowerCase().includes(q),
    );
    list.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [data, query, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const toggleSelect = (id: number) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  };

  const toggleAll = () => {
    if (rows.every((r) => selected.includes(r.id))) {
      setSelected((s) => s.filter((x) => !rows.some((r) => r.id === x)));
    } else {
      setSelected((s) => [...new Set([...s, ...rows.map((r) => r.id)])]);
    }
  };

  const deleteSelected = () => {
    setData((d) => d.filter((m) => !selected.includes(m.id)));
    toast.success(`Removed ${selected.length} member${selected.length > 1 ? "s" : ""}`);
    setSelected([]);
  };

  const cols: { key: SortKey; label: string }[] = [
    { key: "name", label: "Member" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    { key: "status", label: "Status" },
    { key: "joined", label: "Joined" },
    { key: "salary", label: "Salary" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Tables"
        description="Sortable columns, pagination, row selection, live search, and column visibility controls."
        breadcrumbs={[{ label: "UI Library" }, { label: "Tables" }]}
      />

      <SectionCard
        title="Team Directory"
        description={`${filtered.length} members · ${selected.length} selected`}
        noBodyPadding
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Eye className="size-3.5 mr-1.5" /> Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {cols.map((c) => (
                  <DropdownMenuCheckboxItem
                    key={c.key}
                    checked={visibleCols[c.key]}
                    onCheckedChange={(v) => setVisibleCols((s) => ({ ...s, [c.key]: !!v }))}
                  >
                    {c.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="h-8" onClick={() => toast.success("Export started", { description: "CSV will download shortly." })}>
              <Download className="size-3.5 mr-1.5" /> Export
            </Button>
          </>
        }
      >
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search members…"
              className="pl-9 h-9"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
          </div>
          {selected.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/5">{selected.length} selected</Badge>
              <Button variant="outline" size="sm" className="h-8" onClick={() => toast.info(`Emailed ${selected.length} members`)}>
                <Mail className="size-3.5 mr-1.5" /> Email
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-destructive hover:text-destructive" onClick={deleteSelected}>
                <Trash2 className="size-3.5 mr-1.5" /> Delete
              </Button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5 w-10">
                  <Checkbox
                    checked={rows.length > 0 && rows.every((r) => selected.includes(r.id))}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </TableHead>
                {cols.filter((c) => visibleCols[c.key]).map((c) => {
                  const active = sortKey === c.key;
                  return (
                    <TableHead key={c.key} className="cursor-pointer select-none" onClick={() => toggleSort(c.key)}>
                      <span className="inline-flex items-center gap-1">
                        {c.label}
                        {active ? (
                          sortDir === "asc" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />
                        ) : (
                          <ArrowUpDown className="size-3 text-muted-foreground/40" />
                        )}
                      </span>
                    </TableHead>
                  );
                })}
                <TableHead className="pr-5 w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-12">
                    No members match &quot;{query}&quot;.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((m) => (
                  <TableRow key={m.id} className="hover:bg-accent/50" data-state={selected.includes(m.id) ? "selected" : undefined}>
                    <TableCell className="pl-5">
                      <Checkbox checked={selected.includes(m.id)} onCheckedChange={() => toggleSelect(m.id)} aria-label={`Select ${m.name}`} />
                    </TableCell>
                    {visibleCols.name && (
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-8"><AvatarFallback className="text-[10px] bg-muted">{m.name.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{m.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                          </div>
                        </div>
                      </TableCell>
                    )}
                    {visibleCols.role && <TableCell><Badge variant="outline" className="font-normal">{m.role}</Badge></TableCell>}
                    {visibleCols.department && <TableCell className="text-sm">{m.department}</TableCell>}
                    {visibleCols.status && (
                      <TableCell>
                        <Badge variant="outline" className={"font-normal capitalize " + statusStyle[m.status]}>{m.status}</Badge>
                      </TableCell>
                    )}
                    {visibleCols.joined && <TableCell className="text-sm text-muted-foreground">{m.joined}</TableCell>}
                    {visibleCols.salary && <TableCell className="text-sm font-medium tabular-nums">${m.salary.toLocaleString()}</TableCell>}
                    <TableCell className="pr-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8"><MoreHorizontal className="size-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => toast.info(`Viewing ${m.name}`)}>View profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info(`Editing ${m.name}`)}>Edit role</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`Email sent to ${m.email}`)}>Send email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => { setData((d) => d.filter((x) => x.id !== m.id)); toast.success(`${m.name} removed`); }}>
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="px-5 py-3 border-t border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted-foreground">
          <span>
            Showing {rows.length === 0 ? 0 : start + 1}–{start + rows.length} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={current === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i}
                variant={current === i + 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled={current === totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Compact Variant" description="Smaller, denser table with no selection or pagination — ideal for inline previews." noBodyPadding>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Project</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5 text-right">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "MTVerse 2.0", owner: "Alex Morgan", status: "On Track", progress: 68 },
              { name: "Brand Refresh", owner: "Priya Sharma", status: "At Risk", progress: 42 },
              { name: "API v3 Migration", owner: "Marcus Chen", status: "On Track", progress: 89 },
              { name: "Mobile Beta", owner: "Sarah Kim", status: "Delayed", progress: 23 },
            ].map((p) => (
              <TableRow key={p.name} className="hover:bg-accent/50">
                <TableCell className="pl-5 font-medium">{p.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.owner}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    p.status === "On Track" ? "bg-success/10 text-success border-success/20" :
                    p.status === "At Risk" ? "bg-warning/10 text-warning border-warning/20" :
                    "bg-destructive/10 text-destructive border-destructive/20"
                  }>{p.status}</Badge>
                </TableCell>
                <TableCell className="pr-5 text-right text-sm tabular-nums">{p.progress}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
