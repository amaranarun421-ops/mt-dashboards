"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { StatCard } from "@/components/shared/stat-card";
import { Progress } from "@/components/shared/progress";
import { EmptyState } from "@/components/shared/empty-state";
import {
  ShieldIcon,
  CheckSquareIcon,
  UsersIcon,
  LockIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  permissionMatrix as initialMatrix,
  modules,
  roles as roleList,
  actions,
  moduleSummaries,
  type ActionKey,
  type ModuleKey,
  type PermissionMatrix,
  type RoleKey,
} from "@/data/user-account/permissions";

const roleBadge: Record<RoleKey, "primary" | "accent" | "info" | "violet" | "neutral"> = {
  Admin: "primary",
  Manager: "info",
  Editor: "violet",
  Viewer: "neutral",
};

const roleColorDot: Record<RoleKey, string> = {
  Admin: "bg-primary",
  Manager: "bg-blue",
  Editor: "bg-violet",
  Viewer: "bg-gray-4",
};

const actionLabels: Record<ActionKey, string> = {
  view: "View",
  create: "Create",
  edit: "Edit",
  delete: "Delete",
};

const cellTone = (checked: boolean) =>
  checked
    ? "border-primary/50 bg-primary-subtle text-primary dark:border-primary/40 dark:bg-primary/15 dark:text-primary-light"
    : "border-stroke bg-gray-2 text-dark-6 dark:border-dark-3 dark:bg-white/5 dark:text-dark-6";

export default function PermissionsClient() {
  const [matrix, setMatrix] = useState<PermissionMatrix>(initialMatrix);
  const [activeRole, setActiveRole] = useState<RoleKey | "All">("All");
  const [activeModule, setActiveModule] = useState<ModuleKey | "All">("All");
  const [dirty, setDirty] = useState(false);

  const toggle = (mod: ModuleKey, role: RoleKey, action: ActionKey) => {
    setMatrix((prev) => ({
      ...prev,
      [mod]: {
        ...prev[mod],
        [role]: {
          ...prev[mod][role],
          [action]: !prev[mod][role][action],
        },
      },
    }));
    setDirty(true);
  };

  const setAllForCell = (mod: ModuleKey, role: RoleKey, value: boolean) => {
    setMatrix((prev) => ({
      ...prev,
      [mod]: {
        ...prev[mod],
        [role]: { view: value, create: value, edit: value, delete: value },
      },
    }));
    setDirty(true);
  };

  const setAllForRole = (role: RoleKey, value: boolean) => {
    setMatrix((prev) => {
      const next: PermissionMatrix = { ...prev };
      for (const m of modules) {
        next[m] = { ...next[m], [role]: { view: value, create: value, edit: value, delete: value } };
      }
      return next;
    });
    setDirty(true);
  };

  const reset = () => {
    setMatrix(initialMatrix);
    setDirty(false);
  };

  const visibleModules = useMemo(
    () => (activeModule === "All" ? modules : [activeModule]),
    [activeModule],
  );
  const visibleRoles = useMemo(
    () => (activeRole === "All" ? roleList : [activeRole]),
    [activeRole],
  );

  const totalAllowed = useMemo(() => {
    let count = 0;
    for (const m of modules) {
      for (const r of roleList) {
        for (const a of actions) {
          if (matrix[m][r][a.key]) count++;
        }
      }
    }
    return count;
  }, [matrix]);

  const totalPossible = modules.length * roleList.length * actions.length;

  const roleStats = useMemo(() => {
    return roleList.map((r) => {
      let allowed = 0;
      for (const m of modules) {
        for (const a of actions) {
          if (matrix[m][r][a.key]) allowed++;
        }
      }
      return { role: r, allowed, total: modules.length * actions.length };
    });
  }, [matrix]);

  const moduleStats = useMemo(() => {
    return modules.map((m) => {
      let allowed = 0;
      for (const r of roleList) {
        for (const a of actions) {
          if (matrix[m][r][a.key]) allowed++;
        }
      }
      return { module: m, allowed, total: roleList.length * actions.length };
    });
  }, [matrix]);

  return (
    <div>
      <PageHeader
        title="Permissions"
        description="Decide what each role can do across every module. Toggle View, Create, Edit and Delete per cell."
        breadcrumbs={[{ label: "User & Account" }, { label: "Permissions" }]}
        actions={
          <>
            <Button variant="outline" onClick={reset} disabled={!dirty}>
              Reset
            </Button>
            <Button disabled={!dirty}>
              <CheckSquareIcon className="size-4" />
              Save changes
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Modules"
          value={modules.length}
          sublabel="Securable areas of the product"
          tone="primary"
          icon={<ShieldIcon className="size-5" />}
        />
        <StatCard
          label="Roles"
          value={roleList.length}
          sublabel="Admin, Manager, Editor, Viewer"
          tone="info"
          icon={<UsersIcon className="size-5" />}
        />
        <StatCard
          label="Allowed rules"
          value={`${totalAllowed} / ${totalPossible}`}
          sublabel={`${Math.round((totalAllowed / totalPossible) * 100)}% of all rules enabled`}
          tone="violet"
          icon={<CheckSquareIcon className="size-5" />}
        />
        <StatCard
          label="Restricted modules"
          value={moduleStats.filter((m) => m.allowed === 0).length}
          sublabel="Modules hidden from everyone"
          tone="accent"
          icon={<LockIcon className="size-5" />}
        />
      </div>

      {/* Role summary */}
      <Card className="mt-6">
        <CardHeader
          title="Role coverage"
          subtitle="How many actions each role can perform across all modules."
          action={
            <div className="flex flex-wrap gap-2">
              {roleList.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setActiveRole(activeRole === r ? "All" : r)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                    activeRole === r
                      ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                      : "border-stroke text-dark-5 hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:text-dark-6"
                  }`}
                >
                  <span className={`size-1.5 rounded-full ${roleColorDot[r]}`} />
                  {r}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setActiveRole("All")}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ${
                  activeRole === "All"
                    ? "border-primary bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                    : "border-stroke text-dark-5 hover:text-primary dark:border-dark-3 dark:text-dark-6"
                }`}
              >
                All
              </button>
            </div>
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roleStats.map((s) => {
            const pct = Math.round((s.allowed / s.total) * 100);
            return (
              <div
                key={s.role}
                className="rounded-xl border border-stroke p-4 dark:border-dark-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${roleColorDot[s.role]}`} />
                    <span className="text-sm font-semibold text-dark dark:text-white">{s.role}</span>
                  </div>
                  <Badge variant={roleBadge[s.role]} size="sm">{pct}%</Badge>
                </div>
                <p className="mt-2 text-xs text-dark-5 dark:text-dark-6">
                  {s.allowed} of {s.total} actions allowed
                </p>
                <Progress
                  value={pct}
                  tone={pct > 80 ? "primary" : pct > 40 ? "info" : "accent"}
                  size="sm"
                  className="mt-2"
                />
                <div className="mt-2 flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setAllForRole(s.role, true)}
                  >
                    Allow all
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-red"
                    onClick={() => setAllForRole(s.role, false)}
                  >
                    Block all
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Permission matrix */}
      <Card className="mt-6" padded={false}>
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
          <div>
            <h3 className="text-base font-semibold text-dark dark:text-white">
              Permission matrix
            </h3>
            <p className="mt-0.5 text-sm text-dark-5 dark:text-dark-6">
              Toggle View / Create / Edit / Delete for every module and role. Click a cell to grant or revoke all four at once.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-medium text-dark-5 dark:text-dark-6">Module:</label>
            <select
              className="rounded-lg border border-stroke bg-white px-3 py-1.5 text-xs text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              value={activeModule}
              onChange={(e) => setActiveModule(e.target.value as ModuleKey | "All")}
            >
              <option value="All">All modules</option>
              {modules.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="helios-scroll overflow-x-auto border-t border-stroke dark:border-dark-3">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="bg-gray-2 dark:bg-dark-2">
                <th className="sticky left-0 z-10 bg-gray-2 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-5 dark:bg-dark-2 dark:text-dark-6">
                  Module
                </th>
                {visibleRoles.map((r) => (
                  <th key={r} className="px-3 py-3 text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      <span className={`size-1.5 rounded-full ${roleColorDot[r]}`} />
                      {r}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleModules.map((m) => (
                <tr key={m} className="border-t border-stroke dark:border-dark-3">
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 align-top dark:bg-gray-dark">
                    <p className="text-sm font-semibold text-dark dark:text-white">{m}</p>
                    <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">
                      {moduleSummaries[m]}
                    </p>
                  </td>
                  {visibleRoles.map((r) => {
                    const cell = matrix[m][r];
                    const allOn = actions.every((a) => cell[a.key]);
                    return (
                      <td key={r} className="px-3 py-3 align-top">
                        <button
                          type="button"
                          onClick={() => setAllForCell(m, r, !allOn)}
                          className="mb-2 flex w-full items-center justify-between rounded-md border border-stroke px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-dark-5 transition hover:border-primary/40 hover:text-primary dark:border-dark-3 dark:text-dark-6"
                          aria-label={`Toggle all actions for ${m} / ${r}`}
                        >
                          <span>All</span>
                          <span>{allOn ? "On" : "Off"}</span>
                        </button>
                        <div className="grid grid-cols-2 gap-1.5">
                          {actions.map((a) => {
                            const checked = cell[a.key];
                            return (
                              <label
                                key={a.key}
                                className={`group flex cursor-pointer items-center gap-1.5 rounded-md border px-1.5 py-1 text-[11px] font-medium transition ${cellTone(checked)}`}
                                title={`${actionLabels[a.key]} · ${m} · ${r}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggle(m, r, a.key)}
                                  className="size-3 rounded border-stroke text-primary focus:ring-primary/30 dark:border-dark-3 dark:bg-dark-3"
                                />
                                <span>{actionLabels[a.key]}</span>
                              </label>
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleModules.length === 0 && (
          <EmptyState
            title="No modules match"
            description="Pick a different module filter."
            icon={<ShieldIcon className="size-7" />}
          />
        )}

        <div className="flex flex-col gap-2 border-t border-stroke px-4 py-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6 sm:flex-row sm:items-center sm:justify-between md:px-5">
          <p>
            <span className="font-semibold text-dark dark:text-white">{totalAllowed}</span> of {totalPossible} action rules enabled across {modules.length} modules × {roleList.length} roles.
          </p>
          <p>Click any cell header to flip all four actions at once.</p>
        </div>
      </Card>

      {/* Module access breakdown */}
      <Card className="mt-6">
        <CardHeader
          title="Module access"
          subtitle="Share of roles that can perform each action on a given module."
          action={<Badge variant="info">{modules.length} modules</Badge>}
        />
        <ul className="space-y-3">
          {moduleStats.map((s) => {
            const pct = Math.round((s.allowed / s.total) * 100);
            return (
              <li
                key={s.module}
                className="flex flex-col gap-2 rounded-xl border border-stroke p-3 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-dark dark:text-white">{s.module}</p>
                  <p className="truncate text-xs text-dark-5 dark:text-dark-6">
                    {moduleSummaries[s.module]}
                  </p>
                </div>
                <div className="flex w-full max-w-xs items-center gap-3">
                  <Progress value={pct} tone={pct > 75 ? "primary" : pct > 25 ? "info" : "accent"} size="sm" />
                  <span className="w-12 text-right text-xs font-semibold text-dark dark:text-white">
                    {pct}%
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
