"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UiPagination() {
  const [page, setPage] = React.useState(5);
  const total = 20;

  return (
    <div>
      <PageHeader breadcrumb={["UI Elements", "Pagination"]} title="Pagination" description="Page navigation components for data-heavy views." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Basic Pagination</h3>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-9 w-9" disabled><ChevronLeft className="h-4 w-4" /></Button>
            {[1,2,3,4,5].map(p => <Button key={p} variant={p===1?"default":"outline"} size="sm" className="h-9 w-9 p-0">{p}</Button>)}
            <Button variant="outline" size="icon" className="h-9 w-9"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">With First/Last</h3>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-9 w-9"><ChevronsLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="px-2 text-sm">Page 2 of 10</span>
            <Button variant="outline" size="icon" className="h-9 w-9"><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9"><ChevronsRight className="h-4 w-4" /></Button>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Interactive (Click to test)</h3>
          <div className="flex items-center gap-1 flex-wrap">
            <Button variant="outline" size="icon" className="h-9 w-9" disabled={page===1} onClick={()=>setPage(1)}><ChevronsLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9" disabled={page===1} onClick={()=>setPage(p=>p-1)}><ChevronLeft className="h-4 w-4" /></Button>
            {page > 3 && <><Button variant="outline" size="sm" className="h-9 w-9 p-0" onClick={()=>setPage(1)}>1</Button>{page > 4 && <MoreHorizontal className="h-4 w-4 text-gray-400 mx-1" />}</>}
            {Array.from({length: 5}, (_, i) => {
              const p = page - 2 + i;
              if (p < 1 || p > total) return null;
              return <Button key={p} variant={p===page?"default":"outline"} size="sm" className="h-9 w-9 p-0" onClick={()=>setPage(p)}>{p}</Button>;
            })}
            {page < total - 2 && <>{page < total - 3 && <MoreHorizontal className="h-4 w-4 text-gray-400 mx-1" />}<Button variant="outline" size="sm" className="h-9 w-9 p-0" onClick={()=>setPage(total)}>{total}</Button></>}
            <Button variant="outline" size="icon" className="h-9 w-9" disabled={page===total} onClick={()=>setPage(p=>p+1)}><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-9 w-9" disabled={page===total} onClick={()=>setPage(total)}><ChevronsRight className="h-4 w-4" /></Button>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Currently on page {page} of {total}</p>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Rounded Style</h3>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(p => <button key={p} className={`h-9 w-9 rounded-full text-sm font-medium transition ${p===2?"bg-brand-500 text-white":"text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"}`}>{p}</button>)}
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 sm:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">With Summary</h3>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">Showing 11-20 of 142 results</p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-9 w-9"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="default" size="sm" className="h-9 w-9 p-0">2</Button>
              <Button variant="outline" size="icon" className="h-9 w-9"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
