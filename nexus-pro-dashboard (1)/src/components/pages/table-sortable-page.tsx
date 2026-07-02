"use client";

import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";

const data = [
  { id: 1, name: "Premium Plan", price: 299, sales: 142, revenue: 42458, status: "active" },
  { id: 2, name: "Business Plan", price: 99, sales: 320, revenue: 31680, status: "active" },
  { id: 3, name: "Pro Plan", price: 29, sales: 720, revenue: 20880, status: "active" },
  { id: 4, name: "Starter Plan", price: 0, sales: 1240, revenue: 0, status: "deprecated" },
  { id: 5, name: "Enterprise", price: 499, sales: 84, revenue: 41916, status: "active" },
  { id: 6, name: "Add-on: Storage", price: 19, sales: 480, revenue: 9120, status: "active" },
];

export function TableSortable() {
  const [sortKey, setSortKey] = React.useState("name");
  const [sortAsc, setSortAsc] = React.useState(true);
  const sorted = [...data].sort((a: any, b: any) => sortAsc ? String(a[sortKey]).localeCompare(String(b[sortKey])) : String(b[sortKey]).localeCompare(String(a[sortKey])));
  const toggleSort = (key: string) => { if (key === sortKey) setSortAsc(!sortAsc); else { setSortKey(key); setSortAsc(true); } };
  const SortIcon = ({ k }: any) => k === sortKey ? (sortAsc ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-gray-300" />;

  return (
    <div>
      <PageHeader breadcrumb={["Tables", "Sortable"]} title="Sortable Table" description="Click column headers to sort data ascending or descending." />
      <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02]">
              <tr>
                {[{k:"name",l:"Product"},{k:"price",l:"Price"},{k:"sales",l:"Sales"},{k:"revenue",l:"Revenue"},{k:"status",l:"Status"}].map(c => (
                  <th key={c.k} className="px-5 py-3 text-left">
                    <button onClick={()=>toggleSort(c.k)} className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase hover:text-gray-700 dark:hover:text-gray-300">{c.l}<SortIcon k={c.k} /></button>
                  </th>
                ))}
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {sorted.map((row, i) => (
                <tr key={row.id} className="text-sm hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-medium text-gray-800 dark:text-white/90">{row.name}</td>
                  <td className="px-5 py-3 text-gray-700 dark:text-gray-300">${row.price}</td>
                  <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{row.sales}</td>
                  <td className="px-5 py-3 font-bold">${row.revenue.toLocaleString()}</td>
                  <td className="px-5 py-3"><StatusBadge variant={row.status === "active" ? "success" : "neutral"} dot>{row.status}</StatusBadge></td>
                  <td className="px-5 py-3 text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 p-4 text-sm text-gray-500 dark:text-gray-400">Sorted by {sortKey} ({sortAsc ? "ascending" : "descending"})</div>
      </Card>
    </div>
  );
}
