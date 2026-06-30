"use client";

import * as React from "react";
import { useState } from "react";
import {
  Crown, Shield, Pencil, Eye, UserCheck, Plus, Check, X, Users,
  Lock, MoreHorizontal, Save, Loader2, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Role = {
  id: string;
  name: string;
  description: string;
  members: number;
  color: string;
  icon: React.ElementType;
  system?: boolean;
};

const initialRoles: Role[] = [
  { id: "r1", name: "Admin", description: "Full access to all resources and settings", members: 3, color: "bg-destructive/10 text-destructive border-destructive/20", icon: Crown, system: true },
  { id: "r2", name: "Manager", description: "Manage team members and most resources", members: 5, color: "bg-warning/10 text-warning border-warning/20", icon: Shield, system: true },
  { id: "r3", name: "Editor", description: "Create and edit content across the workspace", members: 12, color: "bg-info/10 text-info border-info/20", icon: Pencil, system: true },
  { id: "r4", name: "Viewer", description: "Read-only access to dashboards and reports", members: 28, color: "bg-muted text-muted-foreground border-border", icon: Eye, system: true },
  { id: "r5", name: "Guest", description: "Limited external access to specific resources", members: 8, color: "bg-violet-500/10 text-violet-600 border-violet-500/20", icon: UserCheck, system: true },
  { id: "r6", name: "Billing Admin", description: "Manages billing, invoices, and payment methods", members: 2, color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: Shield },
];

const resources = ["Users", "Projects", "Invoices", "Reports", "Settings", "API Keys", "Webhooks", "Audit Logs"];
const actions = ["View", "Create", "Edit", "Delete"] as const;

// initialPermissions[roleId][resource][action] = boolean
const initialPermissions: Record<string, Record<string, Record<string, boolean>>> = {
  r1: Object.fromEntries(resources.map((r) => [r, Object.fromEntries(actions.map((a) => [a, true]))])),
  r2: Object.fromEntries(resources.map((r) => [r, Object.fromEntries(actions.map((a) => [a, !["Audit Logs"].includes(r) || a === "View"]))])),
  r3: Object.fromEntries(resources.map((r) => [r, Object.fromEntries(actions.map((a) => {
    if (["Settings", "API Keys", "Webhooks", "Audit Logs"].includes(r)) return [a, a === "View"];
    if (a === "Delete") return [a, false];
    return [a, true];
  }))])),
  r4: Object.fromEntries(resources.map((r) => [r, Object.fromEntries(actions.map((a) => [a, a === "View"]))])),
  r5: Object.fromEntries(resources.map((r) => [r, Object.fromEntries(actions.map((a) => [a, ["Projects", "Reports"].includes(r) && a === "View"]))])),
  r6: Object.fromEntries(resources.map((r) => [r, Object.fromEntries(actions.map((a) => [a, r === "Invoices" && a !== "Delete"]))])),
};

const memberPreviews: Record<string, { name: string; initials: string }[]> = {
  r1: [
    { name: "Alex Morgan", initials: "AM" },
    { name: "Priya Sharma", initials: "PS" },
    { name: "Lena Park", initials: "LP" },
  ],
  r2: [
    { name: "Marcus Chen", initials: "MC" },
    { name: "Sarah Williams", initials: "SW" },
    { name: "Daniel Kim", initials: "DK" },
  ],
  r3: [
    { name: "Eric Foster", initials: "EF" },
    { name: "Maya Patel", initials: "MP" },
    { name: "Chris Liu", initials: "CL" },
  ],
};

export default function RbacPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [permissions, setPermissions] = useState(initialPermissions);
  const [selectedRole, setSelectedRole] = useState("r1");
  const [createOpen, setCreateOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [creating, setCreating] = useState(false);

  const role = roles.find((r) => r.id === selectedRole)!;

  const togglePermission = (resource: string, action: string) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [resource]: {
          ...prev[selectedRole][resource],
          [action]: !prev[selectedRole][resource][action],
        },
      },
    }));
  };

  const handleCreate = () => {
    if (!newRoleName.trim()) {
      toast.error("Please provide a role name");
      return;
    }
    setCreating(true);
    setTimeout(() => {
      const id = `r${Date.now()}`;
      const newRole: Role = {
        id,
        name: newRoleName.trim(),
        description: newRoleDesc.trim() || "Custom role",
        members: 0,
        color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
        icon: Shield,
      };
      setRoles((prev) => [...prev, newRole]);
      setPermissions((prev) => ({
        ...prev,
        [id]: Object.fromEntries(resources.map((r) => [r, Object.fromEntries(actions.map((a) => [a, false]))])),
      }));
      setNewRoleName("");
      setNewRoleDesc("");
      setCreating(false);
      setCreateOpen(false);
      setSelectedRole(id);
      toast.success(`Role "${newRole.name}" created`, { description: "Configure permissions below." });
    }, 600);
  };

  const handleDeleteRole = (roleId: string, name: string) => {
    if (roleId === selectedRole) setSelectedRole("r1");
    setRoles((prev) => prev.filter((r) => r.id !== roleId));
    toast.success(`Role "${name}" deleted`);
  };

  const permissionCount = (roleId: string) => {
    const p = permissions[roleId];
    if (!p) return 0;
    return Object.values(p).reduce((acc, actions) => acc + Object.values(actions).filter(Boolean).length, 0);
  };

  const totalPermissions = resources.length * actions.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        description="Manage role-based access control. Define what each role can view, create, edit, and delete across resources."
        breadcrumbs={[{ label: "Enterprise" }, { label: "RBAC" }]}
        actions={
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> Create Role</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create custom role</DialogTitle>
                <DialogDescription>Define a new role with custom permissions.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role name</Label>
                  <Input id="role-name" placeholder="e.g. Content Reviewer" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-desc">Description</Label>
                  <Input id="role-desc" placeholder="What can this role do?" value={newRoleDesc} onChange={(e) => setNewRoleDesc(e.target.value)} />
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-info/5 border border-info/20">
                  <Info className="size-4 text-info mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    New roles start with no permissions. You can configure them in the matrix on the right.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button onClick={handleCreate} disabled={creating}>
                  {creating && <Loader2 className="size-4 mr-2 animate-spin" />}
                  {creating ? "Creating..." : "Create role"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Roles" value={roles.length} icon={<Shield className="size-5" />} deltaLabel="across workspace" />
        <StatCard label="Total Members" value={roles.reduce((s, r) => s + r.members, 0)} icon={<Users className="size-5" />} delta={4} deltaLabel="this month" />
        <StatCard label="Admins" value={roles.find((r) => r.name === "Admin")?.members || 0} icon={<Crown className="size-5" />} deltaLabel="with full access" />
        <StatCard label="Custom Roles" value={roles.filter((r) => !r.system).length} icon={<Plus className="size-5" />} deltaLabel="user-defined" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Roles" description={`${roles.length} roles configured`} className="lg:col-span-1">
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {roles.map((r) => {
              const isActive = selectedRole === r.id;
              return (
                <div
                  key={r.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    isActive ? "border-primary bg-primary/5" : "border-border hover:bg-accent/40"
                  }`}
                  onClick={() => setSelectedRole(r.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex size-9 items-center justify-center rounded-lg border ${r.color}`}>
                      <r.icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate">{r.name}</p>
                        {r.system && (
                          <Badge variant="outline" className="text-[10px] h-4 px-1 font-normal">System</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{r.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold">{r.members}</p>
                      <p className="text-xs text-muted-foreground">{permissionCount(r.id)}/{totalPermissions}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard
          title={`${role.name} permissions`}
          description={`${permissionCount(role.id)} of ${totalPermissions} permissions granted`}
          className="lg:col-span-2"
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8" onClick={() => toast.success("Permissions saved")}>
                <Save className="size-3.5 mr-1.5" /> Save
              </Button>
              {!role.system && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteRole(role.id, role.name)}
                    >
                      <X className="size-4 mr-2" /> Delete role
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          }
        >
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left font-medium text-muted-foreground p-3">Resource</th>
                  {actions.map((a) => (
                    <th key={a} className="text-center font-medium text-muted-foreground p-3 w-20">{a}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resources.map((resource, ri) => (
                  <tr key={resource} className={ri !== resources.length - 1 ? "border-b" : ""}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Lock className="size-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{resource}</span>
                      </div>
                    </td>
                    {actions.map((action) => {
                      const checked = permissions[role.id]?.[resource]?.[action] || false;
                      return (
                        <td key={action} className="p-3 text-center">
                          <div className="flex justify-center">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => togglePermission(resource, action)}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Members with this role ({role.members})
              </h4>
              <div className="space-y-2">
                {(memberPreviews[role.id] || []).slice(0, 4).map((m) => (
                  <div key={m.name} className="flex items-center gap-2.5">
                    <Avatar className="size-7">
                      <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">{m.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{m.name}</span>
                  </div>
                ))}
                {role.members > 4 && (
                  <button
                    className="text-xs text-primary hover:underline"
                    onClick={() => toast.info(`Viewing all ${role.members} members with ${role.name} role`)}
                  >
                    +{role.members - 4} more...
                  </button>
                )}
                {role.members === 0 && (
                  <p className="text-xs text-muted-foreground">No members assigned yet.</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Permission summary
              </h4>
              <div className="space-y-2">
                {actions.map((a) => {
                  const count = resources.filter((r) => permissions[role.id]?.[r]?.[a]).length;
                  return (
                    <div key={a} className="flex items-center justify-between text-xs">
                      <span className="font-medium">{a}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(count / resources.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground w-12 text-right">{count}/{resources.length}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Permission best practices" description="Follow these guidelines to keep your workspace secure">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Shield, title: "Least privilege", desc: "Grant the minimum permissions needed. Use Viewer as the default for new members." },
            { icon: Crown, title: "Limit admins", desc: "Keep admin count under 5% of your team. Admin actions are logged for audit." },
            { icon: Lock, title: "Audit regularly", desc: "Review role assignments quarterly. Remove access for inactive members." },
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
