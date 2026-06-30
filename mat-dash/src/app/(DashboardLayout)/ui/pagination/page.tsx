"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const PaginationPage = () => {
  const [page, setPage] = useState(3);
  const totalPages = 10;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter(p => Math.abs(p - page) <= 1 || p === 1 || p === totalPages);

  return (
    <PageContainer
      title="Pagination"
      description="Navigate large data sets with numbered pagination, prev/next, and per-page size selectors."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Pagination">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-9 w-9"><Icon icon="solar:alt-arrow-left-linear" width={16} /></Button>
            {[1,2,3,4,5].map((p) => (
              <Button key={p} variant={p === 2 ? "default" : "outline"} size="icon" className="h-9 w-9">{p}</Button>
            ))}
            <Button variant="outline" size="icon" className="h-9 w-9"><Icon icon="solar:alt-arrow-right-linear" width={16} /></Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Pill Shape">
          <div className="flex items-center gap-1">
            <Button variant="ghost" shape="pill" size="icon" className="h-9 w-9"><Icon icon="solar:alt-arrow-left-linear" width={16} /></Button>
            {[1,2,3,4,5].map((p) => (
              <Button key={p} variant={p === 3 ? "default" : "ghost"} shape="pill" size="icon" className="h-9 w-9">{p}</Button>
            ))}
            <Button variant="ghost" shape="pill" size="icon" className="h-9 w-9"><Icon icon="solar:alt-arrow-right-linear" width={16} /></Button>
          </div>
        </DemoBlock>

        <DemoBlock title="With Ellipsis" description="Smart truncation for many pages">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setPage(p => Math.max(1, p - 1))}><Icon icon="solar:alt-arrow-left-linear" width={14} /> Prev</Button>
            {visiblePages.map((p, idx) => {
              const prev = visiblePages[idx - 1];
              return (
                <span key={p} className="flex items-center">
                  {prev && p - prev > 1 && <span className="px-2 opacity-50">…</span>}
                  <Button variant={p === page ? "default" : "outline"} size="icon" className="h-9 w-9" onClick={() => setPage(p)}>{p}</Button>
                </span>
              );
            })}
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next <Icon icon="solar:alt-arrow-right-linear" width={14} /></Button>
          </div>
          <p className="text-xs opacity-70 mt-3">Current page: <span className="font-semibold text-primary">{page}</span> of {totalPages}</p>
        </DemoBlock>

        <DemoBlock title="With Per-page Selector">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="opacity-70">Rows per page:</span>
              <button className="px-3 py-1.5 rounded-md border border-defaultBorder hover:bg-lightprimary text-sm flex items-center gap-1">10 <Icon icon="solar:alt-arrow-down-linear" width={14} /></button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-9 w-9"><Icon icon="solar:alt-arrow-left-linear" width={16} /></Button>
              {[1,2,3].map((p) => (
                <Button key={p} variant={p === 1 ? "default" : "outline"} size="icon" className="h-9 w-9">{p}</Button>
              ))}
              <Button variant="outline" size="icon" className="h-9 w-9"><Icon icon="solar:alt-arrow-right-linear" width={16} /></Button>
            </div>
            <span className="text-sm opacity-70">1–10 of 248</span>
          </div>
        </DemoBlock>

        <DemoBlock title="Load More Button" description="Infinite-scroll alternative">
          <div className="space-y-3">
            <p className="text-sm opacity-70">Showing 10 of 248 items</p>
            <Button variant="lightprimary" className="w-full gap-2"><Icon icon="solar:add-circle-bold" /> Load 10 more</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Color Variants">
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((p) => (
                <Button key={p} variant={p === 2 ? "secondary" : "outline"} size="icon" className="h-9 w-9">{p}</Button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((p) => (
                <Button key={p} variant={p === 2 ? "success" : "outline"} size="icon" className="h-9 w-9">{p}</Button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((p) => (
                <Button key={p} variant={p === 2 ? "warning" : "outline"} size="icon" className="h-9 w-9">{p}</Button>
              ))}
            </div>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default PaginationPage;
