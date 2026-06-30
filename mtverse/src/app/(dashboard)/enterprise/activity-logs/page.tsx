"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Search, Filter, Download, ChevronLeft, ChevronRight, Activity,
  User, Edit, Trash2, Plus, LogIn, LogOut, Settings, FileText,
  KeyRound, Shield, MessageSquare, Upload, Eye, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Activity = {
  id: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  timestamp: string;
  type: "create" | "update" | "delete" | "auth" | "view" | "comment" | "config" | "upload";
};

const allActivities: Activity[] = [
  { id: "a1", user: "Alex Morgan", action: "Created project", resource: "Q4 Marketing Campaign", ip: "192.168.1.24", timestamp: "2024-10-22 14:32:18", type: "create" },
  { id: "a2", user: "Priya Sharma", action: "Updated profile settings", resource: "Account Settings", ip: "10.0.4.112", timestamp: "2024-10-22 14:28:42", type: "config" },
  { id: "a3", user: "Marcus Chen", action: "Deleted invoice", resource: "INV-2024-0882", ip: "172.16.8.91", timestamp: "2024-10-22 14:15:09", type: "delete" },
  { id: "a4", user: "Sarah Williams", action: "Logged in", resource: "Authentication", ip: "192.168.1.24", timestamp: "2024-10-22 14:02:55", type: "auth" },
  { id: "a5", user: "Daniel Kim", action: "Uploaded file", resource: "Q4-financial-report.pdf", ip: "10.0.4.203", timestamp: "2024-10-22 13:48:11", type: "upload" },
  { id: "a6", user: "Lena Park", action: "Commented on task", resource: "TASK-4821 OAuth2 refactor", ip: "192.168.1.55", timestamp: "2024-10-22 13:34:22", type: "comment" },
  { id: "a7", user: "Jordan Reyes", action: "Viewed dashboard", resource: "Ecommerce Dashboard", ip: "10.0.4.78", timestamp: "2024-10-22 13:21:48", type: "view" },
  { id: "a8", user: "Alex Morgan", action: "Updated API key", resource: "Production API key", ip: "192.168.1.24", timestamp: "2024-10-22 13:08:33", type: "config" },
  { id: "a9", user: "Priya Sharma", action: "Created task", resource: "TASK-4830 Design review", ip: "10.0.4.112", timestamp: "2024-10-22 12:55:19", type: "create" },
  { id: "a10", user: "Marcus Chen", action: "Logged out", resource: "Authentication", ip: "172.16.8.91", timestamp: "2024-10-22 12:42:07", type: "auth" },
  { id: "a11", user: "Sarah Williams", action: "Edited document", resource: "Q4 OKR planning", ip: "192.168.1.24", timestamp: "2024-10-22 12:28:54", type: "update" },
  { id: "a12", user: "Daniel Kim", action: "Created integration", resource: "Slack integration", ip: "10.0.4.203", timestamp: "2024-10-22 12:15:38", type: "create" },
  { id: "a13", user: "Lena Park", action: "Viewed report", resource: "Monthly revenue report", ip: "192.168.1.55", timestamp: "2024-10-22 12:02:14", type: "view" },
  { id: "a14", user: "Jordan Reyes", action: "Updated permissions", resource: "RBAC Editor role", ip: "10.0.4.78", timestamp: "2024-10-22 11:48:51", type: "config" },
  { id: "a15", user: "Alex Morgan", action: "Deleted team member", resource: "tom.henry@external.com", ip: "192.168.1.24", timestamp: "2024-10-22 11:35:29", type: "delete" },
  { id: "a16", user: "Priya Sharma", action: "Commented on invoice", resource: "INV-2024-0879", ip: "10.0.4.112", timestamp: "2024-10-22 11:22:18", type: "comment" },
  { id: "a17", user: "Marcus Chen", action: "Uploaded file", resource: "screenshot-v2.png", ip: "172.16.8.91", timestamp: "2024-10-22 11:08:44", type: "upload" },
  { id: "a18", user: "Sarah Williams", action: "Created dashboard", resource: "Customer churn analysis", ip: "192.168.1.24", timestamp: "2024-10-22 10:55:32", type: "create" },
  { id: "a19", user: "Daniel Kim", action: "Updated billing info", resource: "Payment method", ip: "10.0.4.203", timestamp: "2024-10-22 10:42:17", type: "config" },
  { id: "a20", user: "Lena Park", action: "Viewed audit log", resource: "Security audit trail", ip: "192.168.1.55", timestamp: "2024-10-22 10:28:53", type: "view" },
  { id: "a21", user: "Jordan Reyes", action: "Logged in", resource: "Authentication", ip: "10.0.4.78", timestamp: "2024-10-22 10:15:09", type: "auth" },
  { id: "a22", user: "Alex Morgan", action: "Edited role", resource: "Manager role permissions", ip: "192.168.1.24", timestamp: "2024-10-22 10:02:44", type: "update" },
  { id: "a23", user: "Priya Sharma", action: "Created API key", resource: "Analytics pipeline key", ip: "10.0.4.112", timestamp: "2024-10-22 09:48:21", type: "create" },
  { id: "a24", user: "Marcus Chen", action: "Commented on PR", resource: "PR-1248 OAuth flow", ip: "172.16.8.91", timestamp: "2024-10-22 09:35:08", type: "comment" },
  { id: "a25", user: "Sarah Williams", action: "Deleted project", resource: "Legacy migration v1", ip: "192.168.1.24", timestamp: "2024-10-22 09:22:37", type: "delete" },
];

const typeIcons = {
  create: Plus, update: Edit, delete: Trash2, auth: LogIn, view: Eye,
  comment: MessageSquare, config: Settings, upload: Upload,
};

const typeStyles = {
  create: "bg-success/10 text-success border-success/20",
  update: "bg-info/10 text-info border-info/20",
  delete: "bg-destructive/10 text-destructive border-destructive/20",
  auth: "bg-primary/10 text-primary border-primary/20",
  view: "bg-muted text-muted-foreground border-border",
  comment: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  config: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  upload: "bg-sky-500/10 text-sky-600 border-sky-500/20",
};

const PAGE_SIZE = 8;

export default function ActivityLogsPage() {
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);

  const users = useMemo(() => Array.from(new Set(allActivities.map((a) => a.user))), []);
  const types = useMemo(() => Array.from(new Set(allActivities.map((a) => a.type))), []);

  const filtered = useMemo(() => {
    return allActivities.filter((a) => {
      if (userFilter !== "all" && a.user !== userFilter) return false;
      if (typeFilter !== "all" && a.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          a.user.toLowerCase().includes(q) ||
          a.action.toLowerCase().includes(q) ||
          a.resource.toLowerCase().includes(q) ||
          a.ip.includes(q)
        );
      }
      return true;
    });
  }, [search, userFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  React.useEffect(() => { setPage(1); }, [search, userFilter, typeFilter]);

  const handleExport = () => {
    toast.success("Export started", { description: `${filtered.length} activities will be emailed as CSV.` });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Logs"
        description="A complete timeline of user activity across your workspace — useful for troubleshooting and audits."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Activity Logs" }]}
        actions={
          <Button variant="outline" size="sm" className="h-9" onClick={handleExport}>
            <Download className="size-4 mr-2" /> Export CSV
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Events (24h)" value="1,284" icon={<Activity className="size-5" />} delta={8.4} deltaLabel="vs yesterday" />
        <StatCard label="Active Users" value="42" icon={<User className="size-5" />} delta={4.2} deltaLabel="vs yesterday" />
        <StatCard label="Most Active" value="Alex Morgan" icon={<Activity className="size-5" />} deltaLabel="312 events this week" />
        <StatCard label="Suspicious" value="3" icon={<AlertCircle className="size-5" />} delta={-1} deltaLabel="flagged events" />
      </div>

      <SectionCard
        title="Activity feed"
        description={`${filtered.length} events match your filters`}
        noBodyPadding
        actions={
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setSearch(""); setUserFilter("all"); setTypeFilter("all"); }}>
            <Filter className="size-3.5 mr-1.5" /> Reset
          </Button>
        }
      >
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by user, action, resource, or IP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="w-full sm:w-44 h-9"><SelectValue placeholder="Filter by user" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All users</SelectItem>
              {users.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-44 h-9"><SelectValue placeholder="Filter by type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All actions</SelectItem>
              {types.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead className="pr-5">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-12">
                  No activities match your filters.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((a) => {
                const Icon = typeIcons[a.type];
                return (
                  <TableRow key={a.id} className="hover:bg-accent/50">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7">
                          <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                            {a.user.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{a.user}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`gap-1 font-normal ${typeStyles[a.type]}`}>
                        <Icon className="size-3" /> {a.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{a.resource}</TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">{a.ip}</TableCell>
                    <TableCell className="pr-5 text-sm text-muted-foreground whitespace-nowrap">{a.timestamp}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline" size="icon" className="size-8"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="size-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="icon"
                  className="size-8 text-xs"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline" size="icon" className="size-8"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SectionCard title="Top actors (7d)">
          <div className="space-y-3">
            {[
              { name: "Alex Morgan", count: 312, pct: 100 },
              { name: "Priya Sharma", count: 248, pct: 79 },
              { name: "Marcus Chen", count: 187, pct: 60 },
              { name: "Sarah Williams", count: 142, pct: 45 },
            ].map((u) => (
              <div key={u.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium">{u.name}</span>
                  <span className="text-muted-foreground">{u.count} events</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${u.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Action distribution">
          <div className="space-y-2.5">
            {[
              { label: "View", count: 421, color: "bg-muted" },
              { label: "Create", count: 268, color: "bg-success" },
              { label: "Update", count: 198, color: "bg-info" },
              { label: "Auth", count: 142, color: "bg-primary" },
              { label: "Comment", count: 98, color: "bg-violet-500" },
              { label: "Delete", count: 42, color: "bg-destructive" },
            ].map((a) => (
              <div key={a.label} className="flex items-center gap-3 text-xs">
                <div className={`size-2 rounded-full ${a.color}`} />
                <span className="flex-1 font-medium">{a.label}</span>
                <span className="text-muted-foreground">{a.count}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quick insights">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
              <Shield className="size-4 text-success mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium">No anomalies detected</p>
                <p className="text-xs text-muted-foreground mt-0.5">All activities match expected usage patterns.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-info/5 border border-info/20">
              <FileText className="size-4 text-info mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium">Retention: 90 days</p>
                <p className="text-xs text-muted-foreground mt-0.5">Upgrade to Enterprise for unlimited retention.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
              <KeyRound className="size-4 text-warning mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium">3 keys unused for 30+ days</p>
                <p className="text-xs text-muted-foreground mt-0.5">Consider revoking stale API keys.</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
