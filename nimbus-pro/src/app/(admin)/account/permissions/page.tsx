"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Select, Checkbox } from "@/components/ui";
import { PERMISSIONS, ROLES } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Shield, Lock, Check, Eye, Pencil, Trash2, Download, Plus } from "lucide-react";

const ACTIONS = [
  { key: "view", label: "View", icon: Eye, tone: "brand" },
  { key: "edit", label: "Edit", icon: Pencil, tone: "warning" },
  { key: "delete", label: "Delete", icon: Trash2, tone: "error" },
  { key: "export", label: "Export", icon: Download, tone: "purple" },
] as const;

const ACTION_TONE_BG: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
};

type Actions = { view: boolean; edit: boolean; delete: boolean; export: boolean };

export default function PermissionsPage() {
  const [role, setRole] = useState(ROLES[1].name);
  const [matrix, setMatrix] = useState<Record<string, Actions>>(
    () => Object.fromEntries(PERMISSIONS.map((p) => [p.module, { ...p.actions }]))
  );

  const toggle = (module: string, action: keyof Actions) => {
    setMatrix((prev) => ({
      ...prev,
      [module]: { ...prev[module], [action]: !prev[module][action] },
    }));
  };

  const toggleRow = (module: string) => {
    setMatrix((prev) => {
      const allTrue = Object.values(prev[module]).every(Boolean);
      const next = { view: !allTrue, edit: !allTrue, delete: !allTrue, export: !allTrue } as Actions;
      return { ...prev, [module]: next };
    });
  };

  const totalEnabled = Object.values(matrix).reduce((s, a) => s + Object.values(a).filter(Boolean).length, 0);
  const totalPossible = PERMISSIONS.length * ACTIONS.length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Permissions Matrix"
        description="Configure granular permissions for each module and role."
        breadcrumbs={[{ label: "Account" }, { label: "Permissions" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Plus className="h-4 w-4" /> Save changes</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Matrix */}
        <Card className="p-0">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Module permissions</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Toggle actions per module</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Role</span>
              <Select value={role} onChange={(e) => setRole(e.target.value)} className="w-44">
                {ROLES.map((r) => <option key={r.id} value={r.name}>{r.name}</option>)}
              </Select>
            </div>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Module</th>
                  {ACTIONS.map((a) => (
                    <th key={a.key} className="text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <div className={cn("flex h-6 w-6 items-center justify-center rounded-md", ACTION_TONE_BG[a.tone])}>
                          <a.icon className="h-3 w-3" />
                        </div>
                        <span>{a.label}</span>
                      </div>
                    </th>
                  ))}
                  <th className="text-center">All</th>
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((p) => {
                  const allTrue = Object.values(matrix[p.module]).every(Boolean);
                  return (
                    <tr key={p.module}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                            <Shield className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{p.module}</span>
                        </div>
                      </td>
                      {ACTIONS.map((a) => (
                        <td key={a.key} className="text-center">
                          <div className="flex justify-center">
                            <Checkbox checked={matrix[p.module][a.key]} onChange={() => toggle(p.module, a.key)} />
                          </div>
                        </td>
                      ))}
                      <td className="text-center">
                        <button
                          onClick={() => toggleRow(p.module)}
                          className={cn("inline-flex h-6 w-6 items-center justify-center rounded-md border transition-colors",
                            allTrue ? "border-brand-500 bg-brand-500 text-white" : "border-gray-300 text-gray-400 hover:border-brand-400 dark:border-gray-700"
                          )}
                          aria-label="Toggle all"
                        >
                          {allTrue && <Check className="h-3.5 w-3.5" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card>
            <CardHeader title="Summary" description={`${role} role`} />
            <CardBody className="space-y-3">
              <div className="rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 p-4 text-white">
                <p className="text-xs uppercase tracking-wider opacity-80">Permissions enabled</p>
                <p className="mt-1 text-3xl font-bold">{totalEnabled}<span className="text-base opacity-80"> / {totalPossible}</span></p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white transition-all" style={{ width: `${(totalEnabled / totalPossible) * 100}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ACTIONS.map((a) => {
                  const count = PERMISSIONS.filter((p) => matrix[p.module][a.key]).length;
                  return (
                    <div key={a.key} className="rounded-lg border border-gray-100 p-3 dark:border-gray-800">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{a.label}</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{count} / {PERMISSIONS.length}</p>
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Legend" />
            <CardBody className="space-y-2">
              {ACTIONS.map((a) => (
                <div key={a.key} className="flex items-center gap-2 text-sm">
                  <div className={cn("flex h-7 w-7 items-center justify-center rounded-md", ACTION_TONE_BG[a.tone])}>
                    <a.icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{a.label}</span>
                  <span className="ml-auto text-xs text-gray-400">Allowed</span>
                </div>
              ))}
              <div className="flex items-center gap-2 border-t border-gray-100 pt-2 text-sm dark:border-gray-800">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-400 dark:bg-gray-800">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <span className="text-gray-700 dark:text-gray-300">Restricted</span>
                <span className="ml-auto text-xs text-gray-400">Blocked</span>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-warning-50/50 dark:bg-warning-500/5">
            <CardBody>
              <p className="text-xs font-semibold text-warning-700 dark:text-warning-400">Permission changes apply immediately</p>
              <p className="mt-1 text-xs text-warning-700/80 dark:text-warning-400/80">All users with this role will see updated access within a few seconds. Audit log entries are created automatically.</p>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
