"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  UserPlus, Search, MoreHorizontal, Mail, Crown, Shield, Pencil,
  Eye, Trash2, Users, UserCheck, UserX, Clock, Loader2, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader, StatCard, SectionCard, EmptyState } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Member = {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: "Admin" | "Manager" | "Editor" | "Viewer" | "Guest";
  status: "active" | "invited" | "suspended";
  lastActive: string;
  joined: string;
};

const initialMembers: Member[] = [
  { id: "m1", name: "Alex Morgan", email: "alex.morgan@mtverse.io", initials: "AM", role: "Admin", status: "active", lastActive: "Just now", joined: "Mar 2023" },
  { id: "m2", name: "Priya Sharma", email: "priya.sharma@mtverse.io", initials: "PS", role: "Manager", status: "active", lastActive: "12 min ago", joined: "Apr 2023" },
  { id: "m3", name: "Marcus Chen", email: "marcus.chen@mtverse.io", initials: "MC", role: "Editor", status: "active", lastActive: "1 hour ago", joined: "Jun 2023" },
  { id: "m4", name: "Sarah Williams", email: "sarah.williams@mtverse.io", initials: "SW", role: "Editor", status: "active", lastActive: "3 hours ago", joined: "Aug 2023" },
  { id: "m5", name: "Daniel Kim", email: "daniel.kim@mtverse.io", initials: "DK", role: "Editor", status: "invited", lastActive: "Pending", joined: "Oct 2024" },
  { id: "m6", name: "Lena Park", email: "lena.park@mtverse.io", initials: "LP", role: "Manager", status: "active", lastActive: "Yesterday", joined: "Sep 2023" },
  { id: "m7", name: "Jordan Reyes", email: "jordan.reyes@mtverse.io", initials: "JR", role: "Viewer", status: "active", lastActive: "2 days ago", joined: "Jan 2024" },
  { id: "m8", name: "Tom Henry", email: "tom.henry@external.com", initials: "TH", role: "Guest", status: "active", lastActive: "5 days ago", joined: "Feb 2024" },
  { id: "m9", name: "Maya Patel", email: "maya.patel@mtverse.io", initials: "MP", role: "Editor", status: "suspended", lastActive: "2 weeks ago", joined: "Jul 2023" },
  { id: "m10", name: "Chris Liu", email: "chris.liu@mtverse.io", initials: "CL", role: "Viewer", status: "active", lastActive: "1 week ago", joined: "Mar 2024" },
  { id: "m11", name: "Nora Adler", email: "nora.adler@mtverse.io", initials: "NA", role: "Manager", status: "invited", lastActive: "Pending", joined: "Oct 2024" },
  { id: "m12", name: "Eric Foster", email: "eric.foster@mtverse.io", initials: "EF", role: "Editor", status: "active", lastActive: "4 hours ago", joined: "May 2024" },
];

const roleStyles = {
  Admin: "bg-destructive/10 text-destructive border-destructive/20",
  Manager: "bg-warning/10 text-warning border-warning/20",
  Editor: "bg-info/10 text-info border-info/20",
  Viewer: "bg-muted text-muted-foreground border-border",
  Guest: "bg-violet-500/10 text-violet-600 border-violet-500/20",
};

const roleIcons = {
  Admin: Crown, Manager: Shield, Editor: Pencil, Viewer: Eye, Guest: UserCheck,
};

const statusStyles = {
  active: "bg-success/10 text-success border-success/20",
  invited: "bg-warning/10 text-warning border-warning/20",
  suspended: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function TeamPage() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Member["role"]>("Editor");
  const [inviting, setInviting] = useState(false);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (roleFilter !== "all" && m.role !== roleFilter) return false;
      if (statusFilter !== "all" && m.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
      }
      return true;
    });
  }, [members, search, roleFilter, statusFilter]);

  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    members.forEach((m) => { counts[m.role] = (counts[m.role] || 0) + 1; });
    return counts;
  }, [members]);

  const activeCount = members.filter((m) => m.status === "active").length;
  const invitedCount = members.filter((m) => m.status === "invited").length;

  const handleInvite = () => {
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setInviting(true);
    setTimeout(() => {
      const initials = inviteEmail.slice(0, 2).toUpperCase();
      const newMember: Member = {
        id: `m${Date.now()}`,
        name: inviteEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: inviteEmail,
        initials,
        role: inviteRole,
        status: "invited",
        lastActive: "Pending",
        joined: new Date().toLocaleString("en-US", { month: "short", year: "numeric" }),
      };
      setMembers((prev) => [newMember, ...prev]);
      setInviteEmail("");
      setInviteRole("Editor");
      setInviting(false);
      setInviteOpen(false);
      toast.success("Invitation sent", { description: `Invite sent to ${newMember.email}` });
    }, 800);
  };

  const handleAction = (action: string, member: Member) => {
    if (action === "remove") {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
      toast.success(`${member.name} removed from team`);
    } else if (action === "suspend") {
      setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, status: "suspended" as const } : m)));
      toast.success(`${member.name} suspended`);
    } else if (action === "activate") {
      setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, status: "active" as const } : m)));
      toast.success(`${member.name} reactivated`);
    } else if (action === "resend") {
      toast.success(`Invitation resent to ${member.email}`);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Management"
        description="Manage your team members, roles, and permissions. Invite new members and track activity."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Team" }]}
        actions={
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9"><UserPlus className="size-4 mr-2" /> Invite member</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite team member</DialogTitle>
                <DialogDescription>Send an invitation to join your workspace.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="invite-email">Email address</Label>
                  <Input
                    id="invite-email" type="email" placeholder="colleague@company.com"
                    value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={inviteRole} onValueChange={(v: Member["role"]) => setInviteRole(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin — full access</SelectItem>
                      <SelectItem value="Manager">Manager — manage team</SelectItem>
                      <SelectItem value="Editor">Editor — create & edit</SelectItem>
                      <SelectItem value="Viewer">Viewer — read only</SelectItem>
                      <SelectItem value="Guest">Guest — limited access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-3 rounded-lg bg-info/5 border border-info/20">
                  <p className="text-xs text-muted-foreground">
                    <Mail className="size-3 inline mr-1" /> The invitee will receive an email with a link to join your workspace. The invitation expires in 7 days.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
                <Button onClick={handleInvite} disabled={inviting}>
                  {inviting && <Loader2 className="size-4 mr-2 animate-spin" />}
                  {inviting ? "Sending..." : "Send invitation"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Members" value={members.length} icon={<Users className="size-5" />} delta={2} deltaLabel="this month" />
        <StatCard label="Active" value={activeCount} icon={<UserCheck className="size-5" />} deltaLabel={`of ${members.length} members`} />
        <StatCard label="Pending Invites" value={invitedCount} icon={<Mail className="size-5" />} deltaLabel="awaiting acceptance" />
        <StatCard label="Admins" value={roleCounts["Admin"] || 0} icon={<Crown className="size-5" />} deltaLabel="with full access" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {(Object.keys(roleStyles) as Member["role"][]).map((r) => {
          const Icon = roleIcons[r];
          return (
            <Card key={r} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <span className="text-xl font-bold">{roleCounts[r] || 0}</span>
              </div>
              <p className="text-xs font-medium">{r}</p>
              <p className="text-xs text-muted-foreground">{((roleCounts[r] || 0) / members.length * 100).toFixed(0)}% of team</p>
            </Card>
          );
        })}
      </div>

      <SectionCard
        title="Team members"
        description={`${filtered.length} members`}
        noBodyPadding
        actions={
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setSearch(""); setRoleFilter("all"); setStatusFilter("all"); }}>
            <Filter className="size-3.5 mr-1.5" /> Reset filters
          </Button>
        }
      >
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-40 h-9"><SelectValue placeholder="All roles" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
              <SelectItem value="Guest">Guest</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 h-9"><SelectValue placeholder="All statuses" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<Users className="size-7" />}
            title="No members found"
            description="Try adjusting your search or filters."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((m) => (
                <TableRow key={m.id} className="hover:bg-accent/50">
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="text-xs font-medium bg-gradient-to-br from-primary/30 to-chart-4/30">{m.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`gap-1 font-normal ${roleStyles[m.role]}`}>
                      {React.createElement(roleIcons[m.role], { className: "size-3" })} {m.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-normal capitalize ${statusStyles[m.status]}`}>
                      <span className={`size-1.5 rounded-full ${
                        m.status === "active" ? "bg-success" :
                        m.status === "invited" ? "bg-warning" : "bg-destructive"
                      }`} />
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5" /> {m.lastActive}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.joined}</TableCell>
                  <TableCell className="pr-5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem onClick={() => toast.info(`Editing ${m.name}`)}>
                          <Pencil className="size-4 mr-2" /> Edit role
                        </DropdownMenuItem>
                        {m.status === "invited" && (
                          <DropdownMenuItem onClick={() => handleAction("resend", m)}>
                            <Mail className="size-4 mr-2" /> Resend invite
                          </DropdownMenuItem>
                        )}
                        {m.status === "active" && (
                          <DropdownMenuItem onClick={() => handleAction("suspend", m)}>
                            <UserX className="size-4 mr-2" /> Suspend
                          </DropdownMenuItem>
                        )}
                        {m.status === "suspended" && (
                          <DropdownMenuItem onClick={() => handleAction("activate", m)}>
                            <UserCheck className="size-4 mr-2" /> Reactivate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleAction("remove", m)}
                        >
                          <Trash2 className="size-4 mr-2" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </SectionCard>
    </div>
  );
}
