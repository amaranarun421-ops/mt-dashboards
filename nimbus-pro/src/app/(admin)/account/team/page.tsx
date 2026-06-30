"use client";
import { useState } from "react";
import { PageHeader, Card, CardBody, StatCard, Badge, Button, Avatar, MoreMenu } from "@/components/ui";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { USERS } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  UserPlus, Users, UserCheck, Shield, Mail, Pencil, Trash2,
  Crown,
} from "lucide-react";

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
  lastActive: string;
  joined: string;
};

const MEMBERS: Member[] = USERS.map((u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  status: u.status as Member["status"],
  lastActive: u.lastActive,
  joined: u.joined,
}));

const ROLE_TONE: Record<string, "error" | "warning" | "brand" | "purple" | "gray"> = {
  "Super Admin": "error",
  Admin: "warning",
  Editor: "brand",
  Viewer: "purple",
};

const STATUS_TONE: Record<string, "success" | "warning" | "error"> = {
  active: "success",
  invited: "warning",
  suspended: "error",
};

const columns: Column<Member>[] = [
  {
    key: "name",
    header: "Member",
    sortable: true,
    cell: (m) => (
      <div className="flex items-center gap-3">
        <Avatar name={m.name} size={36} />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{m.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{m.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
    cell: (m) => (
      <Badge tone={ROLE_TONE[m.role] ?? "gray"} variant="soft" className="capitalize">
        {m.role === "Admin" && <Crown className="h-3 w-3" />}
        {m.role}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    cell: (m) => (
      <Badge tone={STATUS_TONE[m.status]} variant="soft" dot className="capitalize">{m.status}</Badge>
    ),
  },
  { key: "lastActive", header: "Last Active", sortable: true },
  { key: "joined", header: "Joined", sortable: true },
  {
    key: "actions",
    header: "",
    className: "w-12",
    cell: () => (
      <MoreMenu
        items={[
          { label: "Edit role", icon: Pencil },
          { label: "Resend invite", icon: Mail },
          { label: "Remove", icon: Trash2, danger: true },
        ]}
      />
    ),
  },
];

export default function TeamPage() {
  const [roleFilter, setRoleFilter] = useState("all");

  const data = roleFilter === "all" ? MEMBERS : MEMBERS.filter((m) => m.role === roleFilter);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Team Members"
        description="Manage who has access to your workspace and what they can do."
        breadcrumbs={[{ label: "Account" }, { label: "Team" }]}
        actions={<Button><UserPlus className="h-4 w-4" /> Invite member</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Members" value="12" delta="+2 this month" deltaTone="up" icon={Users} iconTone="brand" />
        <StatCard label="Active" value="9" delta="75% active" deltaTone="up" icon={UserCheck} iconTone="success" />
        <StatCard label="Pending Invites" value="2" delta="2 awaiting" deltaTone="neutral" icon={Mail} iconTone="warning" />
        <StatCard label="Roles" value="4" delta="Admin / Editor / Viewer / Billing" deltaTone="neutral" icon={Shield} iconTone="purple" footer="" />
      </div>

      <DataTable
        columns={columns}
        data={data}
        pageSize={10}
        searchPlaceholder="Search members..."
        initialSort={{ key: "name", dir: "asc" }}
        toolbar={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
              {["all", "Admin", "Editor", "Viewer"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={cn("rounded-md px-2.5 py-1 text-xs font-semibold capitalize transition-colors",
                    roleFilter === r ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  )}
                >
                  {r === "all" ? "All roles" : r}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        }
      />

      <Card>
        <CardBody className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Invite teammates to collaborate</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Send email invitations to add new members to your workspace.</p>
            </div>
          </div>
          <Button variant="secondary" size="sm"><Mail className="h-3.5 w-3.5" /> Open invite dialog</Button>
        </CardBody>
      </Card>
    </div>
  );
}
