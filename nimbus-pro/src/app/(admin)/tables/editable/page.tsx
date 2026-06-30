"use client";
import { useState, useRef, useEffect } from "react";
import { PageHeader, Card, Button, Input, Select, Badge } from "@/components/ui";
import { Plus, Trash2, Pencil } from "lucide-react";

type Row = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  plan: "Free" | "Pro" | "Enterprise";
  status: "active" | "invited" | "suspended";
};

const INITIAL_ROWS: Row[] = [
  { id: "u1", name: "Aaroh Sharma", email: "aaroh.sharma@nimbuspro.io", role: "Admin", plan: "Enterprise", status: "active" },
  { id: "u2", name: "Mira Patel", email: "mira.p@nimbuspro.io", role: "Editor", plan: "Pro", status: "active" },
  { id: "u3", name: "Leo Romano", email: "leo.r@nimbuspro.io", role: "Viewer", plan: "Free", status: "invited" },
  { id: "u4", name: "Yuki Tanaka", email: "yuki.t@nimbuspro.io", role: "Editor", plan: "Pro", status: "active" },
  { id: "u5", name: "Sofia García", email: "sofia.g@nimbuspro.io", role: "Admin", plan: "Enterprise", status: "active" },
];

const STATUS_TONE: Record<Row["status"], "success" | "warning" | "error"> = {
  active: "success",
  invited: "warning",
  suspended: "error",
};

const ROLE_TONE: Record<Row["role"], "warning" | "brand" | "purple"> = {
  Admin: "warning",
  Editor: "brand",
  Viewer: "purple",
};

const PLAN_TONE: Record<Row["plan"], "brand" | "purple" | "gray"> = {
  Enterprise: "brand",
  Pro: "purple",
  Free: "gray",
};

type TextField = "name" | "email";
type SelectField = "role" | "plan" | "status";

let _idCounter = 100;
const genId = () => `u${++_idCounter}`;

export default function EditableTablePage() {
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [editing, setEditing] = useState<{ rowId: string; field: TextField | SelectField } | null>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const startEdit = (rowId: string, field: TextField | SelectField, current: string) => {
    setEditing({ rowId, field });
    setDraft(current);
  };

  const commit = () => {
    if (!editing) return;
    const { rowId, field } = editing;
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r;
        if (field === "name" || field === "email") {
          return { ...r, [field]: draft.trim() || r[field] } as Row;
        }
        return { ...r, [field]: draft } as Row;
      })
    );
    setEditing(null);
  };

  const cancel = () => setEditing(null);

  const addRow = () => {
    const id = genId();
    setRows((prev) => [
      ...prev,
      { id, name: "New Member", email: `new-${id}@nimbuspro.io`, role: "Viewer", plan: "Free", status: "invited" },
    ]);
  };

  const deleteRow = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    if (editing?.rowId === id) setEditing(null);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Editable Table"
        description="Click any cell to edit. Press Enter or click outside to commit, Esc to cancel."
        breadcrumbs={[{ label: "Tables" }, { label: "Editable" }]}
        actions={
          <Button onClick={addRow}>
            <Plus className="h-4 w-4" /> Add row
          </Button>
        }
      />

      <Card className="p-0">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Status</th>
                <th className="w-20 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isEditingName = editing?.rowId === row.id && editing.field === "name";
                const isEditingEmail = editing?.rowId === row.id && editing.field === "email";
                const isEditingRole = editing?.rowId === row.id && editing.field === "role";
                const isEditingPlan = editing?.rowId === row.id && editing.field === "plan";
                const isEditingStatus = editing?.rowId === row.id && editing.field === "status";

                return (
                  <tr key={row.id}>
                    {/* Name */}
                    <td className="min-w-[180px]">
                      {isEditingName ? (
                        <Input
                          ref={inputRef}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onBlur={commit}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") commit();
                            if (e.key === "Escape") cancel();
                          }}
                          className="h-8 py-1 text-sm"
                        />
                      ) : (
                        <button
                          onClick={() => startEdit(row.id, "name", row.name)}
                          className="group flex w-full items-center gap-2 text-left text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          {row.name}
                          <Pencil className="h-3 w-3 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-600" />
                        </button>
                      )}
                    </td>

                    {/* Email */}
                    <td className="min-w-[220px]">
                      {isEditingEmail ? (
                        <Input
                          ref={inputRef}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onBlur={commit}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") commit();
                            if (e.key === "Escape") cancel();
                          }}
                          className="h-8 py-1 text-xs"
                        />
                      ) : (
                        <button
                          onClick={() => startEdit(row.id, "email", row.email)}
                          className="group flex w-full items-center gap-2 text-left font-mono text-xs text-gray-600 dark:text-gray-400"
                        >
                          {row.email}
                          <Pencil className="h-3 w-3 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-600" />
                        </button>
                      )}
                    </td>

                    {/* Role */}
                    <td className="min-w-[140px]">
                      {isEditingRole ? (
                        <Select
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onBlur={commit}
                          className="h-8 py-1 text-xs"
                          autoFocus
                        >
                          <option value="Admin">Admin</option>
                          <option value="Editor">Editor</option>
                          <option value="Viewer">Viewer</option>
                        </Select>
                      ) : (
                        <button onClick={() => startEdit(row.id, "role", row.role)} className="inline-block">
                          <Badge tone={ROLE_TONE[row.role]} variant="soft">{row.role}</Badge>
                        </button>
                      )}
                    </td>

                    {/* Plan */}
                    <td className="min-w-[140px]">
                      {isEditingPlan ? (
                        <Select
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onBlur={commit}
                          className="h-8 py-1 text-xs"
                          autoFocus
                        >
                          <option value="Free">Free</option>
                          <option value="Pro">Pro</option>
                          <option value="Enterprise">Enterprise</option>
                        </Select>
                      ) : (
                        <button onClick={() => startEdit(row.id, "plan", row.plan)} className="inline-block">
                          <Badge tone={PLAN_TONE[row.plan]} variant="soft">{row.plan}</Badge>
                        </button>
                      )}
                    </td>

                    {/* Status */}
                    <td className="min-w-[140px]">
                      {isEditingStatus ? (
                        <Select
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onBlur={commit}
                          className="h-8 py-1 text-xs capitalize"
                          autoFocus
                        >
                          <option value="active">active</option>
                          <option value="invited">invited</option>
                          <option value="suspended">suspended</option>
                        </Select>
                      ) : (
                        <button onClick={() => startEdit(row.id, "status", row.status)} className="inline-block">
                          <Badge tone={STATUS_TONE[row.status]} variant="soft" dot className="capitalize">{row.status}</Badge>
                        </button>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => deleteRow(row.id)} aria-label="Delete row">
                        <Trash2 className="h-4 w-4 text-error-500" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    No rows yet. Click <span className="font-semibold text-brand-600 dark:text-brand-400">Add row</span> to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-400">
        <p className="font-semibold text-gray-900 dark:text-white">Tips</p>
        <ul className="mt-1.5 space-y-1">
          <li>Click any cell to edit. Name and Email use text input; Role, Plan, Status use dropdowns.</li>
          <li>
            <kbd className="rounded border border-gray-300 px-1 dark:border-gray-700">Enter</kbd> or click outside to commit.{" "}
            <kbd className="rounded border border-gray-300 px-1 dark:border-gray-700">Esc</kbd> to cancel.
          </li>
          <li>Use the trash icon to delete a row, or <span className="font-semibold">Add row</span> to append a new entry.</li>
        </ul>
      </div>
    </div>
  );
}
