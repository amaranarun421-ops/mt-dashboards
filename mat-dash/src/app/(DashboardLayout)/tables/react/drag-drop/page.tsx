"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { employees, Employee } from "../../../data/tables";

const DragDropTablePage = () => {
  const [data, setData] = useState<Employee[]>(employees.slice(0, 6));
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const onDragStart = (idx: number) => setDragIdx(idx);
  const onDrop = (idx: number) => {
    if (dragIdx === null || dragIdx === idx) return;
    setData(d => {
      const arr = [...d];
      const [moved] = arr.splice(dragIdx, 1);
      arr.splice(idx, 0, moved);
      return arr;
    });
    setDragIdx(null);
  };

  return (
    <PageContainer title="React Table — Drag & Drop" description="Reorder rows by dragging the handle.">
      <DemoBlock title="Draggable Rows">
        <div className="rounded-lg border border-defaultBorder overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-lightgray dark:bg-dark">
                <TableHead className="w-10"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((emp, idx) => (
                <TableRow
                  key={emp.id}
                  draggable
                  onDragStart={() => onDragStart(idx)}
                  onDrop={() => onDrop(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  className={dragIdx === idx ? "opacity-50" : ""}
                >
                  <TableCell className="cursor-grab active:cursor-grabbing">
                    <Icon icon="solar:menu-dots-bold" width={16} className="opacity-40" />
                  </TableCell>
                  <TableCell className="font-medium text-sm">{emp.name}</TableCell>
                  <TableCell className="text-sm">{emp.department}</TableCell>
                  <TableCell className="text-sm">{emp.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs opacity-60 mt-3">Drag the ⋮ handle to reorder rows.</p>
      </DemoBlock>
    </PageContainer>
  );
};

export default DragDropTablePage;
