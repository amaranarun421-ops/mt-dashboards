"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { AvatarGroup } from "@/components/shared/avatar";
import { DataTable } from "@/components/shared/data-table";
import { Drawer } from "@/components/shared/drawer";
import { Modal } from "@/components/shared/modal";
import { StatCard } from "@/components/shared/stat-card";
import { Tabs } from "@/components/shared/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import {
  FormSection,
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  UsersIcon,
  UserPlusIcon,
  CheckSquareIcon,
  ShieldIcon,
  User,
} from "@/components/Layouts/sidebar/icons";
import {
  teamMembers as initialMembers,
  teamStats,
  roleOptions,
  type Role,
  type TeamMember,
  type TeamStatus,
} from "@/data/user-account/team";

const roleBadgeVariant: Record<Role, "primary" | "accent" | "info" | "violet" | "neutral" | "danger"> = {
  Owner: "accent",
  Admin: "primary",
  Manager: "info",
  Editor: "violet",
  Viewer: "neutral",
  Billing: "danger",
};

const statusBadgeVariant: Record<TeamStatus, "success" | "info" | "danger"> = {
  Active: "success",
  Invited: "info",
  Suspended: "danger",
};

export default function TeamMembersClient() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);

  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Editor");
  const [inviteMessage, setInviteMessage] = useState("");

  const [editRole, setEditRole] = useState<Role>("Viewer");
  const [editDepartment, setEditDepartment] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q);
      const matchesRole = roleFilter === "All" || m.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [members, query, roleFilter]);

  const roleTabs = [
    { value: "All", label: "All", badge: <Badge variant="neutral" size="sm">{members.length}</Badge> },
    ...roleOptions.map((r) => ({
      value: r,
      label: r,
      badge: (
        <Badge variant="neutral" size="sm">
          {members.filter((m) => m.role === r).length}
        </Badge>
      ),
    })),
  ];

  const openEdit = (m: TeamMember) => {
    setEditMember(m);
    setEditRole(m.role);
    setEditDepartment(m.department);
    setTwoFactor(m.twoFactor);
  };

  const saveEdit = () => {
    if (!editMember) return;
    setMembers((arr) =>
      arr.map((m) =>
        m.id === editMember.id
          ? { ...m, role: editRole, department: editDepartment, twoFactor }
          : m,
      ),
    );
    setEditMember(null);
  };

  const removeMember = (id: string) => {
    setMembers((arr) => arr.filter((m) => m.id !== id));
  };

  const sendInvite = () => {
    if (!inviteEmails.trim()) return;
    const emails = inviteEmails.split(/[,\n\s]+/).filter(Boolean);
    const newMembers: TeamMember[] = emails.map((email, i) => ({
      id: "U-" + (members.length + i + 1),
      name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: inviteRole,
      status: "Invited",
      department: "—",
      location: "—",
      lastActive: "—",
      joinedAt: "Invited just now",
      twoFactor: false,
    }));
    setMembers((arr) => [...arr, ...newMembers]);
    setInviteEmails("");
    setInviteMessage("");
    setInviteOpen(false);
  };

  const columns = [
    {
      key: "member",
      header: "Member",
      cell: (m: TeamMember) => (
        <div className="flex items-center gap-3">
          <Avatar name={m.name} src={m.avatarSrc} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-dark dark:text-white">
              {m.name}
            </p>
            <p className="truncate text-xs text-dark-5 dark:text-dark-6">{m.email}</p>
          </div>
        </div>
      ),
      sortable: true,
      sortAccessor: (m: TeamMember) => m.name,
    },
    {
      key: "role",
      header: "Role",
      cell: (m: TeamMember) => (
        <Badge variant={roleBadgeVariant[m.role]}>{m.role}</Badge>
      ),
      sortable: true,
      sortAccessor: (m: TeamMember) => m.role,
    },
    {
      key: "department",
      header: "Department",
      cell: (m: TeamMember) => (
        <span className="text-dark-7 dark:text-dark-6">{m.department}</span>
      ),
      sortable: true,
      sortAccessor: (m: TeamMember) => m.department,
    },
    {
      key: "location",
      header: "Location",
      cell: (m: TeamMember) => (
        <span className="text-dark-7 dark:text-dark-6">{m.location}</span>
      ),
    },
    {
      key: "2fa",
      header: "2FA",
      cell: (m: TeamMember) =>
        m.twoFactor ? (
          <Badge variant="success">On</Badge>
        ) : (
          <Badge variant="warning">Off</Badge>
        ),
    },
    {
      key: "lastActive",
      header: "Last active",
      cell: (m: TeamMember) => (
        <span className="text-dark-7 dark:text-dark-6">{m.lastActive}</span>
      ),
      sortable: true,
      sortAccessor: (m: TeamMember) => m.lastActive,
    },
    {
      key: "status",
      header: "Status",
      cell: (m: TeamMember) => (
        <Badge variant={statusBadgeVariant[m.status]}>{m.status}</Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: (m: TeamMember) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => openEdit(m)}>
            Manage
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Team members"
        description="Invite teammates, manage roles and keep your workspace secure."
        breadcrumbs={[{ label: "User & Account" }, { label: "Team members" }]}
        actions={
          <Button onClick={() => setInviteOpen(true)}>
            <UserPlusIcon className="size-4" />
            Invite members
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total members"
          value={teamStats.total}
          tone="primary"
          icon={<UsersIcon className="size-5" />}
        />
        <StatCard
          label="Active"
          value={teamStats.active}
          tone="success"
          icon={<CheckSquareIcon className="size-5" />}
        />
        <StatCard
          label="Pending invites"
          value={teamStats.invited}
          tone="info"
          icon={<UserPlusIcon className="size-5" />}
        />
        <StatCard
          label="2FA enabled"
          value={`${teamStats.twoFactor} / ${teamStats.total}`}
          sublabel="Admins require 2FA"
          tone="violet"
          icon={<ShieldIcon className="size-5" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card padded={false} className="p-0">
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
              <div className="relative max-w-xs flex-1">
                <input
                  className={`${inputClass} pl-9`}
                  placeholder="Search members…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-5 dark:text-dark-6"
                >
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <Tabs
                tabs={roleTabs}
                value={roleFilter}
                onChange={setRoleFilter}
                variant="pills"
                size="sm"
              />
            </div>
            <DataTable
              columns={columns}
              data={filtered}
              rowKey={(m) => m.id}
              pageSize={8}
              emptyState={
                <EmptyState
                  title="No members match your filters"
                  description="Try a different search or role filter."
                  icon={<User className="size-7" />}
                />
              }
            />
          </Card>
        </div>

        {/* Permission summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Permission summary"
              subtitle="A snapshot of who can do what in this workspace."
              action={<ShieldIcon className="size-5 text-primary" />}
            />
            <ul className="space-y-3 text-sm">
              {roleOptions.map((r) => {
                const count = members.filter((m) => m.role === r).length;
                return (
                  <li
                    key={r}
                    className="flex items-center justify-between rounded-lg border border-stroke px-3 py-2 dark:border-dark-3"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant={roleBadgeVariant[r]}>{r}</Badge>
                      <span className="text-xs text-dark-5 dark:text-dark-6">
                        {r === "Owner"
                          ? "Full control"
                          : r === "Admin"
                            ? "Manage everything"
                            : r === "Manager"
                              ? "Manage team & ops"
                              : r === "Editor"
                                ? "Create & edit"
                                : r === "Viewer"
                                  ? "Read-only"
                                  : "Billing only"}
                      </span>
                    </div>
                    <span className="font-semibold text-dark dark:text-white">
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              Configure roles & permissions
            </Button>
          </Card>

          <Card>
            <CardHeader
              title="Workspace owners"
              subtitle="Members with admin-level access."
            />
            <ul className="space-y-3">
              {members
                .filter((m) => m.role === "Owner" || m.role === "Admin")
                .map((m) => (
                  <li key={m.id} className="flex items-center gap-3">
                    <Avatar name={m.name} src={m.avatarSrc} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-dark dark:text-white">
                        {m.name}
                      </p>
                      <p className="truncate text-xs text-dark-5 dark:text-dark-6">
                        {m.email}
                      </p>
                    </div>
                    <Badge variant={roleBadgeVariant[m.role]}>{m.role}</Badge>
                  </li>
                ))}
            </ul>
          </Card>

          <Card>
            <CardHeader
              title="Pending invites"
              subtitle="Waiting for teammates to accept."
              action={<AvatarGroup names={members.filter((m) => m.status === "Invited").map((m) => m.name)} />}
            />
            {members.filter((m) => m.status === "Invited").length === 0 ? (
              <p className="py-4 text-center text-sm text-dark-5 dark:text-dark-6">
                No pending invites.
              </p>
            ) : (
              <ul className="space-y-2 text-sm">
                {members
                  .filter((m) => m.status === "Invited")
                  .map((m) => (
                    <li
                      key={m.id}
                      className="flex items-center justify-between rounded-lg bg-gray-2 px-3 py-2 dark:bg-white/5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-dark dark:text-white">
                          {m.email}
                        </p>
                        <p className="text-xs text-dark-5 dark:text-dark-6">
                          {m.joinedAt}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red"
                        onClick={() => removeMember(m.id)}
                      >
                        Rescind
                      </Button>
                    </li>
                  ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      {/* Invite members modal */}
      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite team members"
        description="Send an email invite with a join link. You can invite up to 25 at once."
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={sendInvite}>
              <UserPlusIcon className="size-4" />
              Send {inviteEmails ? inviteEmails.split(/[,\n\s]+/).filter(Boolean).length : 0} invite(s)
            </Button>
          </>
        }
      >
        <FormSection title="" columns={2} className="border-0 p-0 shadow-none">
          <FormField
            label="Email addresses"
            htmlFor="invite-emails"
            hint="Separate multiple emails with commas, spaces or new lines."
          >
            <textarea
              id="invite-emails"
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="alice@heliospro.io, bob@heliospro.io"
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
            />
          </FormField>
          <FormField label="Role" htmlFor="invite-role" hint="You can change this later.">
            <select
              id="invite-role"
              className={inputClass}
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as Role)}
            >
              {roleOptions
                .filter((r) => r !== "Owner")
                .map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
            </select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Personal message (optional)" htmlFor="invite-msg">
              <textarea
                id="invite-msg"
                rows={3}
                className={`${inputClass} resize-none`}
                placeholder="Hi! I'd love for you to join our Helios Pro workspace…"
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
              />
            </FormField>
          </div>
        </FormSection>
        <div className="mt-3 rounded-lg border border-stroke p-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
          <p className="font-medium text-dark dark:text-white">Heads up</p>
          Invited members get an email with a magic link valid for 7 days. They'll be added
          to your seat count once they accept.
        </div>
      </Modal>

      {/* Edit member drawer */}
      <Drawer
        open={!!editMember}
        onClose={() => setEditMember(null)}
        title={editMember ? editMember.name : ""}
        description={editMember ? editMember.email : ""}
        footer={
          <>
            <Button variant="outline" onClick={() => setEditMember(null)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>
              <CheckSquareIcon className="size-4" />
              Save changes
            </Button>
          </>
        }
      >
        {editMember && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 rounded-xl border border-stroke p-4 dark:border-dark-3">
              <Avatar name={editMember.name} src={editMember.avatarSrc} size="lg" />
              <div>
                <p className="text-sm font-semibold text-dark dark:text-white">
                  {editMember.name}
                </p>
                <p className="text-xs text-dark-5 dark:text-dark-6">
                  {editMember.department} · Joined {editMember.joinedAt}
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant={roleBadgeVariant[editMember.role]}>
                    {editMember.role}
                  </Badge>
                  <Badge variant={statusBadgeVariant[editMember.status]}>
                    {editMember.status}
                  </Badge>
                </div>
              </div>
            </div>

            <FormSection title="Role & department" columns={1} className="border-0 p-0 shadow-none">
              <FormField label="Role" htmlFor="m-role" hint="Owners cannot be demoted from this drawer.">
                <select
                  id="m-role"
                  className={inputClass}
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as Role)}
                  disabled={editMember.role === "Owner"}
                >
                  {roleOptions
                    .filter((r) => r !== "Owner")
                    .map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                </select>
              </FormField>
              <FormField label="Department" htmlFor="m-dept">
                <input
                  id="m-dept"
                  className={inputClass}
                  value={editDepartment}
                  onChange={(e) => setEditDepartment(e.target.value)}
                />
              </FormField>
              <li className="flex items-center justify-between gap-4 py-2">
                <div>
                  <p className="text-sm font-medium text-dark dark:text-white">
                    Require 2FA for this member
                  </p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">
                    Block sign-in until 2FA is set up.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={twoFactor}
                  onClick={() => setTwoFactor((v) => !v)}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                    twoFactor ? "bg-primary" : "bg-gray-3 dark:bg-dark-3"
                  }`}
                >
                  <span
                    className={`inline-block size-5 transform rounded-full bg-white shadow transition ${
                      twoFactor ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </li>
            </FormSection>

            <FormSection title="Member access" description="" columns={1} className="border-0 p-0 shadow-none">
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Last active</span>
                  <span className="font-medium text-dark dark:text-white">
                    {editMember.lastActive}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">Location</span>
                  <span className="text-dark-7 dark:text-dark-6">{editMember.location}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-dark-5 dark:text-dark-6">2FA</span>
                  <Badge variant={editMember.twoFactor ? "success" : "warning"}>
                    {editMember.twoFactor ? "On" : "Off"}
                  </Badge>
                </li>
              </ul>
            </FormSection>

            <div className="rounded-xl border border-red/40 bg-red-light-5/40 p-3 dark:bg-red/10">
              <p className="text-sm font-semibold text-red-dark dark:text-red-light">
                Remove from workspace
              </p>
              <p className="mt-0.5 text-xs text-red-dark/80 dark:text-red-light/80">
                The member will lose access immediately. Their content remains owned by the workspace.
              </p>
              <Button
                variant="danger"
                size="sm"
                className="mt-3"
                onClick={() => {
                  removeMember(editMember.id);
                  setEditMember(null);
                }}
              >
                Remove member
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
