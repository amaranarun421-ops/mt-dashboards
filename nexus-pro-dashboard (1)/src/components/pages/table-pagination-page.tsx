"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";

const allData = Array.from({length: 42}, (_, i) => ({
  id: i + 1, name: ["Sarah Chen","Mark Park","Lisa Wang","David Liu","Nora Lee","Bruce Kim","Riya Patel","John Davis","Emma Wilson","James Brown"][i % 10],
  email: `user${i+1}@nexuspro.app`, role: ["Admin","Editor","Viewer","Manager"][i % 4], status: ["active","away","offline"][i % 3],
}));

export function TablePagination() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const totalPages = Math.ceil(allData.length / pageSize);
  const start = (page - 1) * pageSize;
  const current = allData.slice(start, start + pageSize);

  return (
    <div>
      <PageHeader breadcrumb={["Tables", "Pagination"]} title="Pagination Table" description="Navigate large datasets efficiently with page controls." />
      <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02]">
              <tr>{["#","Name","Email","Role","Status"].map(h => <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {current.map(u => (
                <tr key={u.id} className="text-sm hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-3 text-gray-400">#{u.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-800 dark:text-white/90">{u.name}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                  <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{u.role}</td>
                  <td className="px-5 py-3"><StatusBadge variant={u.status==="active"?"success":u.status==="away"?"warning":"neutral"} dot>{u.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>Rows per page:</span>
            <select value={pageSize} onChange={e=>{setPageSize(Number(e.target.value)); setPage(1);}} className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1 text-sm">
              <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option>
            </select>
            <span>· {start + 1}-{Math.min(start + pageSize, allData.length)} of {allData.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page===1} onClick={()=>setPage(1)}><ChevronsLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page===1} onClick={()=>setPage(p=>p-1)}><ChevronLeft className="h-4 w-4" /></Button>
            {Array.from({length: Math.min(totalPages, 5)}, (_, i) => {
              const p = i + 1;
              return <Button key={p} variant={page===p?"default":"outline"} size="sm" className="h-8 w-8 p-0" onClick={()=>setPage(p)}>{p}</Button>;
            })}
            {totalPages > 5 && <span className="px-1">...</span>}
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page===totalPages} onClick={()=>setPage(totalPages)}><ChevronsRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
