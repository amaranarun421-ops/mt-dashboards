"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { Drawer } from "@/components/shared/drawer";
import { Modal } from "@/components/shared/modal";
import { StatCard } from "@/components/shared/stat-card";
import { Progress } from "@/components/shared/progress";
import { AvatarGroup } from "@/components/shared/avatar";
import { EmptyState } from "@/components/shared/empty-state";
import {
  FormSection,
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  ShieldIcon,
  UsersIcon,
  CheckSquareIcon,
  LockIcon,
  UserPlusIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  roles as initialRoles,
  roleColor,
  type RoleKey,
  type RoleRow,
} from "@/data/user-account/roles";
import { teamMembers } from "@/data/user-account/team";

const colorBadge: Record<RoleRow["color"], "primary" | "accent" | "info" | "violet" | "neutral" | "danger"> = {
  primary: "primary",
  accent: "accent",
  violet: "violet",
  info: "info",
  rose: "danger",
  neutral: "neutral",
};

const dotClass: Record<RoleRow["color"], string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  violet: "bg-violet",
  info: "bg-blue",
  rose: "bg-rose",
  neutral: "bg-gray-4",
};

export default function RolesClient() {
  const [roles, setRoles] = useState<RoleRow[]>(initialRoles);
  const [editRole, setEditRole] = useState<RoleRow | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const [draftName, setDraftName] = useState("");
  const [draftDesc, setDraftDesc] = useState("");
  const [draftColor, setDraftColor] = useState<RoleRow["color"]>("violet");
  const [draftPermissions, setDraftPermissions] = useState(0);

  const openEdit = (r: RoleRow) => {
    setEditRole(r);
    setDraftName(r.name);
    setDraftDesc(r.description);
    setDraftColor(r.color);
    setDraftPermissions(r.permissions);
  };

  const saveRole = () => {
    if (!editRole) return;
    setRoles((arr) =>
      arr.map((r) =>
        r.id === editRole.id
          ? { ...r, name: draftName, description: draftDesc, color: draftColor, permissions: draftPermissions }
          : r,
      ),
    );
    setEditRole(null);
  };

  const createRole = () => {
    if (!draftName.trim()) return;
    const newRole: RoleRow = {
      id: "R-" + (roles.length + 1).toString().padStart(2, "0"),
      name: draftName,
      key: draftName.replace(/\s+/g, "") as RoleKey,
      description: draftDesc || "Custom role.",
      members: 0,
      isSystem: false,
      color: draftColor,
      permissions: draftPermissions,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };
    setRoles((arr) => [...arr, newRole]);
    setDraftName("");
    setDraftDesc("");
    setDraftColor("violet");
    setDraftPermissions(0);
    setCreateOpen(false);
  };

  const deleteRole = (id: string) => {
    setRoles((arr) => arr.filter((r) => r.id !== id));
    setEditRole(null);
  };

  const columns = [
    {
      key: "role",
      header: "Role",
      cell: (r: RoleRow) => (
        <div className="flex items-center gap-3">
          <span className={`grid size-9 place-items-center rounded-lg ${dotClass[r.color]} bg-opacity-20`}>
            <span className={`size-2.5 rounded-full ${dotClass[r.color]}`} />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm font-semibold text-dark dark:text-white">
              {r.name}
              {r.isSystem && (
                <Badge variant="outline" size="sm">
                  <LockIcon className="size-3" />
                  System
                </Badge>
              )}
            </p>
            <p className="truncate text-xs text-dark-5 dark:text-dark-6">{r.description}</p>
          </div>
        </div>
      ),
      sortable: true,
      sortAccessor: (r: RoleRow) => r.name,
    },
    {
      key: "members",
      header: "Members",
      cell: (r: RoleRow) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-dark dark:text-white">{r.members}</span>
          {r.members > 0 && (
            <AvatarGroup
              size="xs"
              names={teamMembers
                .filter((m) => m.role === r.key)
                .slice(0, 4)
                .map((m) => m.name)}
              max={3}
            />
          )}
        </div>
      ),
      sortable: true,
      sortAccessor: (r: RoleRow) => r.members,
    },
    {
      key: "permissions",
      header: "Permissions",
      cell: (r: RoleRow) => (
        <div className="flex items-center gap-2">
          <Badge variant={colorBadge[r.color]}>{r.permissions} rules</Badge>
          <div className="w-24">
            <Progress value={r.permissions} max={24} tone="primary" size="xs" />
          </div>
        </div>
      ),
      sortable: true,
      sortAccessor: (r: RoleRow) => r.permissions,
    },
    {
      key: "created",
      header: "Created",
      cell: (r: RoleRow) => (
        <span className="text-dark-7 dark:text-dark-6">{r.createdAt}</span>
      ),
      sortable: true,
      sortAccessor: (r: RoleRow) => r.createdAt,
    },
    {
      key: "actions",
      header: "",
      cell: (r: RoleRow) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => openEdit(r)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Roles"
        description="Define what your team members can see and do across Helios Pro."
        breadcrumbs={[{ label: "User & Account" }, { label: "Roles" }]}
        actions={
          <Button onClick={() => setCreateOpen(true)}>
            <UserPlusIcon className="size-4" />
            New role
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total roles"
          value={roles.length}
          sublabel={`${roles.filter((r) => r.isSystem).length} system`}
          tone="primary"
          icon={<ShieldIcon className="size-5" />}
        />
        <StatCard
          label="Custom roles"
          value={roles.filter((r) => !r.isSystem).length}
          tone="violet"
          icon={<ShieldIcon className="size-5" />}
        />
        <StatCard
          label="Members assigned"
          value={roles.reduce((acc, r) => acc + r.members, 0)}
          tone="info"
          icon={<UsersIcon className="size-5" />}
        />
        <StatCard
          label="Avg. permissions / role"
          value={Math.round(roles.reduce((acc, r) => acc + r.permissions, 0) / roles.length)}
          tone="accent"
          icon={<CheckSquareIcon className="size-5" />}
        />
      </div>

      <Card className="mt-6" padded={false}>
        <div className="flex items-center justify-between p-4 md:p-5">
          <div>
            <h3 className="text-base font-semibold text-dark dark:text-white">All roles</h3>
            <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">
              Click a role to edit its description, color, and permission count.
            </p>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={roles}
          rowKey={(r) => r.id}
          pageSize={10}
          emptyState={
            <EmptyState
              title="No roles yet"
              description="Create your first custom role to get started."
              icon={<ShieldIcon className="size-7" />}
            />
          }
        />
      </Card>

      {/* Role editor drawer */}
      <Drawer
        open={!!editRole}
        onClose={() => setEditRole(null)}
        title={editRole ? `Edit ${editRole.name}` : ""}
        description="Edit role description, color and permission count."
        width="max-w-lg"
        footer={
          <>
            {editRole && !editRole.isSystem && (
              <Button
                variant="danger"
                className="mr-auto"
                onClick={() => deleteRole(editRole.id)}
              >
                Delete role
              </Button>
            )}
            <Button variant="outline" onClick={() => setEditRole(null)}>
              Cancel
            </Button>
            <Button onClick={saveRole} disabled={editRole?.isSystem}>
              <CheckSquareIcon className="size-4" />
              Save role
            </Button>
          </>
        }
      >
        {editRole && (
          <div className="space-y-6">
            {editRole.isSystem && (
              <div className="rounded-lg border border-accent/40 bg-accent-subtle/40 p-3 text-xs text-accent-dark dark:bg-accent/10 dark:text-accent-light">
                <p className="flex items-center gap-2 font-semibold">
                  <LockIcon className="size-4" />
                  System role
                </p>
                System roles are part of Helios Pro's defaults and can't be renamed or deleted.
                You can still change the description, color, and permissions.
              </div>
            )}

            <FormSection title="Role details" columns={1} className="border-0 p-0 shadow-none">
              <FormField label="Role name" htmlFor="r-name">
                <input
                  id="r-name"
                  className={inputClass}
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  disabled={editRole.isSystem}
                />
              </FormField>
              <FormField label="Description" htmlFor="r-desc" hint="Shown to members when picking a role.">
                <textarea
                  id="r-desc"
                  rows={3}
                  className={`${inputClass} resize-none`}
                  value={draftDesc}
                  onChange={(e) => setDraftDesc(e.target.value)}
                />
              </FormField>
              <FormField label="Color" htmlFor="r-color">
                <div className="flex flex-wrap gap-2">
                  {(["primary", "accent", "violet", "info", "rose", "neutral"] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setDraftColor(c)}
                      aria-label={`Color ${c}`}
                      className={`grid size-9 place-items-center rounded-lg border-2 transition ${
                        draftColor === c ? "border-dark dark:border-white" : "border-transparent"
                      }`}
                    >
                      <span className={`size-5 rounded-full ${dotClass[c]}`} />
                    </button>
                  ))}
                </div>
              </FormField>
            </FormSection>

            <FormSection title="Permission scope" description="" columns={1} className="border-0 p-0 shadow-none">
              <FormField
                label={`Number of permission rules · ${draftPermissions} / 24`}
                htmlFor="r-perms"
                hint="Slide to set how many actions this role can perform across modules."
              >
                <input
                  id="r-perms"
                  type="range"
                  min={0}
                  max={24}
                  value={draftPermissions}
                  onChange={(e) => setDraftPermissions(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </FormField>
              <div className="rounded-xl border border-stroke p-4 dark:border-dark-3">
                <p className="text-sm font-semibold text-dark dark:text-white">Members with this role</p>
                <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                  {editRole.members} member(s) currently assigned.
                </p>
                {editRole.members > 0 ? (
                  <div className="mt-3">
                    <AvatarGroup
                      size="sm"
                      names={teamMembers
                        .filter((m) => m.role === editRole.key)
                        .map((m) => m.name)}
                      max={6}
                    />
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-dark-5 dark:text-dark-6">No members assigned yet.</p>
                )}
              </div>
            </FormSection>

            <FormSection title="Quick links" description="" columns={1} className="border-0 p-0 shadow-none">
              <a
                href="/user-account/permissions"
                className="flex items-center justify-between rounded-lg border border-stroke px-4 py-3 text-sm text-dark-7 transition hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:text-dark-6 dark:hover:text-primary-light"
              >
                <span>Open permission matrix</span>
                <span>→</span>
              </a>
              <a
                href="/user-account/team-members"
                className="flex items-center justify-between rounded-lg border border-stroke px-4 py-3 text-sm text-dark-7 transition hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:text-dark-6 dark:hover:text-primary-light"
              >
                <span>Assign members to this role</span>
                <span>→</span>
              </a>
            </FormSection>
          </div>
        )}
      </Drawer>

      {/* Create role modal */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create a custom role"
        description="Custom roles let you give members exactly the access they need."
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createRole} disabled={!draftName.trim()}>
              <CheckSquareIcon className="size-4" />
              Create role
            </Button>
          </>
        }
      >
        <FormSection title="" columns={1} className="border-0 p-0 shadow-none">
          <FormField label="Role name" htmlFor="cr-name">
            <input
              id="cr-name"
              className={inputClass}
              placeholder="e.g. Support Agent"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
            />
          </FormField>
          <FormField label="Description" htmlFor="cr-desc">
            <textarea
              id="cr-desc"
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Handle customer tickets, manage refunds, view orders."
              value={draftDesc}
              onChange={(e) => setDraftDesc(e.target.value)}
            />
          </FormField>
          <FormField label="Color" htmlFor="cr-color">
            <div className="flex flex-wrap gap-2">
              {(["primary", "accent", "violet", "info", "rose", "neutral"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setDraftColor(c)}
                  aria-label={`Color ${c}`}
                  className={`grid size-9 place-items-center rounded-lg border-2 transition ${
                    draftColor === c ? "border-dark dark:border-white" : "border-transparent"
                  }`}
                >
                  <span className={`size-5 rounded-full ${dotClass[c]}`} />
                </button>
              ))}
            </div>
          </FormField>
          <FormField label={`Starting permission rules · ${draftPermissions} / 24`} htmlFor="cr-perms">
            <input
              id="cr-perms"
              type="range"
              min={0}
              max={24}
              value={draftPermissions}
              onChange={(e) => setDraftPermissions(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </FormField>
        </FormSection>
      </Modal>
    </div>
  );
}
