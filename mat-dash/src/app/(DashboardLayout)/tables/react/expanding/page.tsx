"use client";
import { useState } from "react";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { employees, Employee } from "../../../data/tables";

const ExpandingTablePage = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <PageContainer title="React Table — Expanding" description="Click a row to expand and see additional details.">
      <DemoBlock title="Expandable Rows">
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
              {employees.slice(0, 5).map((emp, idx) => (
                <>
                  <TableRow
                    key={emp.id}
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                    className="cursor-pointer hover:bg-lightgray/60 dark:hover:bg-dark/40"
                  >
                    <TableCell>
                      <Icon icon={expanded === idx ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} width={16} className="text-muted-foreground" />
                    </TableCell>
                    <TableCell className="font-medium text-sm">{emp.name}</TableCell>
                    <TableCell className="text-sm">{emp.department}</TableCell>
                    <TableCell className="text-sm">{emp.role}</TableCell>
                  </TableRow>
                  {expanded === idx && (
                    <TableRow key={`${emp.id}-detail`}>
                      <TableCell colSpan={4} className="bg-lightgray dark:bg-dark p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div><p className="text-xs opacity-60">Email</p><p className="font-medium">{emp.email}</p></div>
                          <div><p className="text-xs opacity-60">Salary</p><p className="font-medium">${emp.salary.toLocaleString()}</p></div>
                          <div><p className="text-xs opacity-60">Status</p><p className="font-medium">{emp.status}</p></div>
                          <div><p className="text-xs opacity-60">Hire Date</p><p className="font-medium">{emp.hireDate}</p></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs opacity-60 mt-3">Click any row to expand details.</p>
      </DemoBlock>
    </PageContainer>
  );
};

export default ExpandingTablePage;
