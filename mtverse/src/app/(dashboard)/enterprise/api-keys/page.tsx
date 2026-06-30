"use client";

import * as React from "react";
import { useState } from "react";
import {
  Key, Plus, Copy, Trash2, MoreHorizontal, Eye, EyeOff, Shield,
  Activity, Calendar, CheckCircle2, AlertTriangle, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { PageHeader, StatCard, SectionCard, EmptyState } from "@/components/mtv/primitives";
import { toast } from "sonner";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  scope: "read" | "write" | "admin";
  created: string;
  lastUsed: string;
  requestsThisMonth: number;
  requestLimit: number;
  expiresAt: string;
  status: "active" | "expiring" | "revoked";
};

const initialKeys: ApiKey[] = [
  { id: "k1", name: "Production API", key: "mtv_live_8f2a4b9c1d7e6f3a2b8c5d4e9f0a1b2c", scope: "admin", created: "2024-08-12", lastUsed: "2 min ago", requestsThisMonth: 842321, requestLimit: 1000000, expiresAt: "2025-08-12", status: "active" },
  { id: "k2", name: "Mobile App Client", key: "mtv_live_3d8e1f5a9b2c7d4e6f8a1b3c5d7e9f2a", scope: "write", created: "2024-09-03", lastUsed: "12 min ago", requestsThisMonth: 421889, requestLimit: 500000, expiresAt: "2025-09-03", status: "active" },
  { id: "k3", name: "Analytics Pipeline", key: "mtv_live_7b2c9d4e1f6a3b8c5d7e9f2a4b6c8d0e", scope: "read", created: "2024-07-22", lastUsed: "1 hour ago", requestsThisMonth: 158293, requestLimit: 500000, expiresAt: "2025-07-22", status: "active" },
  { id: "k4", name: "Webhook Service", key: "mtv_live_5c9d2e6f3a8b1c4d7e9f2a5b8c3d6e9f", scope: "write", created: "2024-06-15", lastUsed: "3 days ago", requestsThisMonth: 89234, requestLimit: 250000, expiresAt: "2025-06-15", status: "active" },
  { id: "k5", name: "Legacy Integration", key: "mtv_live_1f6a8b3c5d7e9f2a4b6c8d0e2f4a6b8c", scope: "read", created: "2023-11-04", lastUsed: "21 days ago", requestsThisMonth: 3421, requestLimit: 100000, expiresAt: "2025-01-04", status: "expiring" },
  { id: "k6", name: "Backup Sync", key: "mtv_live_9d4e7f2a5b8c3d6e9f0a2b5c8d3e6f9a", scope: "read", created: "2024-10-01", lastUsed: "5 min ago", requestsThisMonth: 672341, requestLimit: 750000, expiresAt: "2025-10-01", status: "active" },
];

const scopeStyles = {
  admin: "bg-destructive/10 text-destructive border-destructive/20",
  write: "bg-warning/10 text-warning border-warning/20",
  read: "bg-info/10 text-info border-info/20",
};

function maskKey(k: string) {
  return `mtv_live_${"•".repeat(24)}${k.slice(-4)}`;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newScope, setNewScope] = useState<"read" | "write" | "admin">("read");
  const [newExpiry, setNewExpiry] = useState("365");
  const [creating, setCreating] = useState(false);

  const totalRequests = keys.reduce((s, k) => s + k.requestsThisMonth, 0);
  const activeKeys = keys.filter((k) => k.status === "active").length;
  const expiringCount = keys.filter((k) => k.status === "expiring").length;

  const handleCopy = (k: string) => {
    navigator.clipboard?.writeText(k);
    toast.success("API key copied to clipboard");
  };

  const handleRevoke = (id: string, name: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast.success(`Key "${name}" has been revoked`, {
      description: "All requests using this key will be rejected immediately.",
    });
  };

  const handleCreate = () => {
    if (!newName.trim()) {
      toast.error("Please provide a name for your API key");
      return;
    }
    setCreating(true);
    setTimeout(() => {
      const newKey: ApiKey = {
        id: `k${Date.now()}`,
        name: newName.trim(),
        key: `mtv_live_${Math.random().toString(36).slice(2)}`,
        scope: newScope,
        created: new Date().toISOString().slice(0, 10),
        lastUsed: "Never",
        requestsThisMonth: 0,
        requestLimit: newScope === "admin" ? 1000000 : newScope === "write" ? 500000 : 250000,
        expiresAt: new Date(Date.now() + Number(newExpiry) * 86400000).toISOString().slice(0, 10),
        status: "active",
      };
      setKeys((prev) => [newKey, ...prev]);
      setNewName("");
      setNewScope("read");
      setNewExpiry("365");
      setCreating(false);
      setCreateOpen(false);
      toast.success("API key created", { description: `Key "${newKey.name}" is now active.` });
    }, 700);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="API Keys"
        description="Manage API keys for programmatic access to your workspace. Keys grant scoped access to resources via the MTVerse REST API."
        breadcrumbs={[{ label: "Enterprise" }, { label: "API Keys" }]}
        actions={
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> Create Key</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create new API key</DialogTitle>
                <DialogDescription>Generate a scoped key for your application or integration.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="key-name">Key name</Label>
                  <Input id="key-name" placeholder="e.g. Production API" value={newName} onChange={(e) => setNewName(e.target.value)} />
                  <p className="text-xs text-muted-foreground">A descriptive name to help you identify this key later.</p>
                </div>
                <div className="space-y-2">
                  <Label>Scope</Label>
                  <Select value={newScope} onValueChange={(v: "read" | "write" | "admin") => setNewScope(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="read">Read — GET requests only</SelectItem>
                      <SelectItem value="write">Write — Read + create/update</SelectItem>
                      <SelectItem value="admin">Admin — Full access including delete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Expiration</Label>
                  <Select value={newExpiry} onValueChange={setNewExpiry}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="730">2 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <AlertTriangle className="size-4 text-warning mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Store this key securely — it will only be shown once after creation. Treat it like a password.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate} disabled={creating}>
                  {creating && <Loader2 className="size-4 mr-2 animate-spin" />} Create key
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Keys" value={keys.length} icon={<Key className="size-5" />} deltaLabel="across all scopes" />
        <StatCard label="Active Keys" value={activeKeys} icon={<CheckCircle2 className="size-5" />} deltaLabel={`${expiringCount} expiring soon`} />
        <StatCard label="Requests (30d)" value={totalRequests.toLocaleString()} icon={<Activity className="size-5" />} delta={12.4} deltaLabel="vs last month" />
        <StatCard label="Avg Latency" value="142ms" icon={<Loader2 className="size-5" />} delta={-8.2} deltaLabel="vs last week" />
      </div>

      <SectionCard
        title="Your API keys"
        description="Keys provide programmatic access — keep them secret and rotate regularly"
        noBodyPadding
        actions={
          <Badge variant="outline" className="bg-info/10 text-info border-info/20">
            {keys.length} keys
          </Badge>
        }
      >
        {keys.length === 0 ? (
          <EmptyState
            icon={<Key className="size-7" />}
            title="No API keys yet"
            description="Create your first API key to start integrating with MTVerse."
            action={<Button size="sm" onClick={() => setCreateOpen(true)}><Plus className="size-4 mr-2" /> Create Key</Button>}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Usage (30d)</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((k) => {
                const usage = (k.requestsThisMonth / k.requestLimit) * 100;
                return (
                  <TableRow key={k.id} className="hover:bg-accent/50">
                    <TableCell className="pl-5">
                      <div className="font-medium text-sm">{k.name}</div>
                      <div className="text-xs text-muted-foreground">Expires {k.expiresAt}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {revealed[k.id] ? k.key : maskKey(k.key)}
                        </code>
                        <Button
                          variant="ghost" size="icon" className="size-7"
                          onClick={() => setRevealed((r) => ({ ...r, [k.id]: !r[k.id] }))}
                        >
                          {revealed[k.id] ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7" onClick={() => handleCopy(k.key)}>
                          <Copy className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={scopeStyles[k.scope]}>
                        <Shield className="size-3 mr-1" /> {k.scope}
                      </Badge>
                    </TableCell>
                    <TableCell className="min-w-[140px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">{(k.requestsThisMonth / 1000).toFixed(1)}k</span>
                          <span className="text-muted-foreground">/ {(k.requestLimit / 1000).toFixed(0)}k</span>
                        </div>
                        <Progress value={usage} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" /> {k.created}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{k.lastUsed}</TableCell>
                    <TableCell>
                      {k.status === "active" ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
                      ) : k.status === "expiring" ? (
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Expiring</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Revoked</Badge>
                      )}
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => handleCopy(k.key)}>
                            <Copy className="size-4 mr-2" /> Copy key
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info("Rotate dialog coming soon")}>
                            <Activity className="size-4 mr-2" /> View usage
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleRevoke(k.id, k.name)}
                          >
                            <Trash2 className="size-4 mr-2" /> Revoke
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </SectionCard>

      <SectionCard title="Best practices" description="Keep your workspace secure by following these guidelines">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Shield, title: "Least privilege", desc: "Use the most restrictive scope that meets your needs. Prefer read-only keys for analytics." },
            { icon: Calendar, title: "Rotate regularly", desc: "Rotate production keys every 90 days. Set reminders before expiration dates." },
            { icon: EyeOff, title: "Never commit keys", desc: "Use environment variables or a secrets manager. Add mtv_live_* to your .gitignore." },
            { icon: Trash2, title: "Revoke on turnover", desc: "Revoke keys immediately when team members leave or integrations are decommissioned." },
          ].map((p) => (
            <div key={p.title} className="p-4 rounded-xl border border-border">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                <p.icon className="size-4" />
              </div>
              <h4 className="text-sm font-semibold mb-1">{p.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
