"use client";

import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { inputClass } from "@/components/shared/form-section";
import { Table, EditIcon, CheckIcon, RefreshCwIcon, XCircleIcon } from "@/components/Layouts/sidebar/icons";
import { CheckSquareIcon } from "@/components/Layouts/sidebar/icons";
import { employees as initial, type Employee } from "@/data/tables/employees";

const fmtSalary = (n: number) => `$${n.toLocaleString("en-US")}`;

const statusVariant: Record<Employee["status"], "success" | "warning" | "danger"> = {
  Active: "success",
  Invited: "warning",
  Suspended: "danger",
};

const roleVariant: Record<Employee["role"], "primary" | "accent" | "info" | "violet" | "neutral" | "success"> = {
  Owner: "accent",
  Admin: "primary",
  Manager: "info",
  Editor: "violet",
  Viewer: "neutral",
  Guest: "success",
};

type EditableField = "name" | "email" | "salary" | "role" | "status";
type EditState = { rowId: string; field: EditableField } | null;

export default function EditableClient() {
  const [rows, setRows] = useState<Employee[]>(initial.slice(0, 12));
  const [edit, setEdit] = useState<EditState>(null);
  const [draft, setDraft] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  useEffect(() => {
    if (edit && inputRef.current) inputRef.current.focus();
  }, [edit]);

  function startEdit(rowId: string, field: EditableField, value: string) {
    setEdit({ rowId, field });
    setDraft(value);
  }

  function saveEdit() {
    if (!edit) return;
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== edit.rowId) return r;
        if (edit.field === "salary") {
          const n = parseFloat(draft.replace(/[^0-9.]/g, ""));
          return { ...r, salary: Number.isFinite(n) ? n : r.salary };
        }
        if (edit.field === "role") return { ...r, role: draft as Employee["role"] };
        if (edit.field === "status") return { ...r, status: draft as Employee["status"] };
        return { ...r, [edit.field]: draft };
      }),
    );
    setHistory((prev) => [
      `${new Date().toLocaleTimeString()} — Updated ${edit.field} on ${edit.rowId}`,
      ...prev,
    ].slice(0, 8));
    setEdit(null);
    setDraft("");
  }

  function cancelEdit() {
    setEdit(null);
    setDraft("");
  }

  function resetAll() {
    setRows(initial.slice(0, 12));
    setHistory([]);
    setEdit(null);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }

  const editable: { label: string; hint: string }[] = [
    { label: "Name", hint: "text" },
    { label: "Email", hint: "text" },
    { label: "Role", hint: "select" },
    { label: "Status", hint: "select" },
    { label: "Salary", hint: "number" },
  ];

  return (
    <div>
      <PageHeader
        title="Inline Editable Cells"
        description="Click any editable cell to edit it inline. Press Enter to save, Esc to cancel. Changes are tracked in the audit log."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Tables", href: "/tables/editable" }, { label: "Editable" }]}
        actions={
          <Button variant="outline" size="sm" onClick={resetAll}>
            <RefreshCwIcon className="size-4" />
            Reset
          </Button>
        }
      />

      <Card className="mb-6">
        <CardHeader title="How to edit" subtitle="Three ways to commit a change" />
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-2 rounded-xl border border-stroke p-3 dark:border-dark-3">
            <EditIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">Click to edit</p>
              <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">Hover an editable cell — a pencil icon appears. Click to switch the cell into an input.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-stroke p-3 dark:border-dark-3">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">Enter to save</p>
              <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">Pressing Enter (or clicking away) commits the change and pushes an entry to the audit log.</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-stroke p-3 dark:border-dark-3">
            <XCircleIcon className="mt-0.5 size-4 shrink-0 text-red" />
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">Esc to cancel</p>
              <p className="mt-0.5 text-xs text-dark-5 dark:text-dark-6">Pressing Esc aborts the edit and restores the original value with no log entry.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-primary-subtle p-3 dark:bg-primary/10">
          <span className="text-xs font-semibold text-primary-dark dark:text-primary-light">Editable columns:</span>
          {editable.map((c) => (
            <Badge key={c.label} variant="primary" size="sm">{c.label} <span className="ml-1 opacity-70">· {c.hint}</span></Badge>
          ))}
        </div>
      </Card>

      <Card padded={false}>
        <CardHeader
          title="Employee Directory"
          subtitle="Editable rows — pencil icon appears on hover for editable cells"
          action={<Badge variant="neutral" size="sm">{rows.length} rows</Badge>}
          className="px-5 pt-5 md:px-6 md:pt-6"
        />
        <div className="helios-scroll overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-stroke bg-gray-2 text-left dark:border-dark-3 dark:bg-dark-2">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Employee</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Role</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Salary</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">Department</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const isEditingName = edit?.rowId === r.id && edit.field === "name";
                const isEditingEmail = edit?.rowId === r.id && edit.field === "email";
                const isEditingRole = edit?.rowId === r.id && edit.field === "role";
                const isEditingStatus = edit?.rowId === r.id && edit.field === "status";
                const isEditingSalary = edit?.rowId === r.id && edit.field === "salary";
                return (
                  <tr key={r.id} className="border-b border-stroke last:border-0 dark:border-dark-3">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={r.name} size="sm" />
                        <div className="min-w-0">
                          {isEditingName ? (
                            <input
                              ref={(el) => { if (el) inputRef.current = el; }}
                              value={draft}
                              onChange={(e) => setDraft(e.target.value)}
                              onKeyDown={onKeyDown}
                              onBlur={saveEdit}
                              className={`${inputClass} px-2 py-1 text-sm`}
                            />
                          ) : (
                            <button
                              onClick={() => startEdit(r.id, "name", r.name)}
                              className="group flex items-center gap-1 text-sm font-medium text-dark dark:text-white"
                            >
                              {r.name}
                              <EditIcon className="size-3 opacity-0 transition group-hover:opacity-60" />
                            </button>
                          )}
                          {isEditingEmail ? (
                            <input
                              ref={(el) => { if (el) inputRef.current = el; }}
                              value={draft}
                              onChange={(e) => setDraft(e.target.value)}
                              onKeyDown={onKeyDown}
                              onBlur={saveEdit}
                              className={`${inputClass} mt-1 px-2 py-1 text-xs`}
                            />
                          ) : (
                            <button
                              onClick={() => startEdit(r.id, "email", r.email)}
                              className="group flex items-center gap-1 text-xs text-dark-5 dark:text-dark-6"
                            >
                              {r.email}
                              <EditIcon className="size-3 opacity-0 transition group-hover:opacity-60" />
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {isEditingRole ? (
                        <select
                          ref={(el) => { if (el) inputRef.current = el; }}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={onKeyDown}
                          onBlur={saveEdit}
                          className={`${inputClass} px-2 py-1 text-xs`}
                        >
                          {(["Owner", "Admin", "Manager", "Editor", "Viewer", "Guest"] as const).map((roleOpt) => (
                            <option key={roleOpt} value={roleOpt}>{roleOpt}</option>
                          ))}
                        </select>
                      ) : (
                        <button
                          onClick={() => startEdit(r.id, "role", r.role)}
                          className="group inline-flex items-center gap-1"
                        >
                          <Badge variant={roleVariant[r.role]} size="sm">{r.role}</Badge>
                          <EditIcon className="size-3 opacity-0 transition group-hover:opacity-60" />
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditingStatus ? (
                        <select
                          ref={(el) => { if (el) inputRef.current = el; }}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={onKeyDown}
                          onBlur={saveEdit}
                          className={`${inputClass} px-2 py-1 text-xs`}
                        >
                          {(["Active", "Invited", "Suspended"] as const).map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <button
                          onClick={() => startEdit(r.id, "status", r.status)}
                          className="group inline-flex items-center gap-1"
                        >
                          <Badge variant={statusVariant[r.status]} size="sm">{r.status}</Badge>
                          <EditIcon className="size-3 opacity-0 transition group-hover:opacity-60" />
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditingSalary ? (
                        <input
                          ref={(el) => { if (el) inputRef.current = el; }}
                          type="number"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={onKeyDown}
                          onBlur={saveEdit}
                          className={`${inputClass} w-28 px-2 py-1 text-sm`}
                        />
                      ) : (
                        <button
                          onClick={() => startEdit(r.id, "salary", String(r.salary))}
                          className="group inline-flex items-center gap-1 text-sm font-semibold text-dark dark:text-white"
                        >
                          {fmtSalary(r.salary)}
                          <EditIcon className="size-3 opacity-0 transition group-hover:opacity-60" />
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-sm text-dark-7 dark:text-dark-7">
                        {r.department}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-6">
        <CardHeader
          title="Edit audit log"
          subtitle="Most recent 8 changes"
          action={history.length > 0 ? <Badge variant="success" size="sm">{history.length} edits</Badge> : undefined}
        />
        {history.length === 0 ? (
          <div className="flex items-center gap-2 rounded-xl bg-gray-2 p-4 text-sm text-dark-5 dark:bg-white/5 dark:text-dark-6">
            <CheckSquareIcon className="size-4" />
            No edits yet — click any cell with a pencil icon to start editing.
          </div>
        ) : (
          <ul className="space-y-2">
            {history.map((entry, i) => (
              <li key={i} className="flex items-center gap-2 rounded-xl border border-stroke px-3 py-2 text-sm dark:border-dark-3">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="font-mono text-xs text-dark-5 dark:text-dark-6">{entry.split(" — ")[0]}</span>
                <span className="text-dark-7 dark:text-dark-7">{entry.split(" — ")[1]}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
