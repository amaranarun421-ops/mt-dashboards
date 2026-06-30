"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { employees, Employee } from "../../../data/tables";

const EditableTablePage = () => {
  const [data, setData] = useState<Employee[]>(employees.slice(0, 5));
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState("");

  const startEdit = (idx: number, val: string) => { setEditing(idx); setDraft(val); };
  const save = () => {
    if (editing !== null) {
      setData(d => d.map((e, i) => i === editing ? { ...e, name: draft } : e));
      setEditing(null);
    }
  };

  return (
    <PageContainer title="React Table — Editable" description="Click any name to edit it inline. Press Enter or click Save.">
      <DemoBlock title="Inline Editable Cells">
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lightgray dark:bg-dark">
                <TableHead>Name (click to edit)</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((emp, idx) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    {editing === idx ? (
                      <div className="flex gap-1">
                        <Input value={draft} onChange={(e) => setDraft(e.target.value)} className="h-8 text-sm" autoFocus onKeyDown={(e) => e.key === "Enter" && save()} />
                        <Button size="icon" className="h-8 w-8" onClick={save}><Icon icon="solar:check-bold" width={14} /></Button>
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setEditing(null)}><Icon icon="solar:close-bold" width={14} /></Button>
                      </div>
                    ) : (
                      <button onClick={() => startEdit(idx, emp.name)} className="font-medium text-sm hover:text-primary hover:underline">{emp.name}</button>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{emp.department}</TableCell>
                  <TableCell className="text-sm">{emp.role}</TableCell>
                  <TableCell className="text-sm font-medium">${emp.salary.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs opacity-60 mt-3">Click any name to edit. Press Enter to save, Escape to cancel.</p>
      </DemoBlock>
    </PageContainer>
  );
};

export default EditableTablePage;
