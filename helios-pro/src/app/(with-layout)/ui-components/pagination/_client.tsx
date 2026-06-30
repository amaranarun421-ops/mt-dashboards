"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Pagination } from "@/components/shared/pagination";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { PaginationIcon } from "@/components/Layouts/sidebar/icons";

const sizeScales = [
  { name: "Small", className: "origin-left scale-[0.85]" },
  { name: "Medium", className: "scale-100" },
  { name: "Large", className: "origin-left scale-[1.15]" },
];

export default function PaginationClient() {
  const [basicPage, setBasicPage] = React.useState(3);
  const [edgesPage, setEdgesPage] = React.useState(7);
  const [jumpPage, setJumpPage] = React.useState(4);
  const [jumpInput, setJumpInput] = React.useState("");
  const [sizePage, setSizePage] = React.useState(2);
  const [sizeVariant, setSizeVariant] = React.useState(1);
  const [simplePage, setSimplePage] = React.useState(2);

  const totalForJump = 12;

  return (
    <>
      <PageHeader
        title="Pagination"
        description="Navigate large data sets with five pagination patterns built on the shared Helios Pro Pagination component."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/pagination" },
          { label: "Pagination" },
        ]}
        actions={
          <Badge variant="primary">
            <PaginationIcon className="size-3.5" /> 5 variants
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Basic pagination"
            subtitle="Prev / numbers / next — no edge shortcuts."
          />
          <Pagination
            page={basicPage}
            totalPages={10}
            onPageChange={setBasicPage}
            showEdges={false}
          />
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Currently on page{" "}
            <span className="font-semibold text-dark dark:text-white">
              {basicPage}
            </span>{" "}
            of 10. The number window keeps neighbours visible around the active page.
          </p>
        </Card>

        <Card>
          <CardHeader
            title="With edges"
            subtitle="« and » buttons jump to the first and last page."
          />
          <Pagination
            page={edgesPage}
            totalPages={20}
            onPageChange={setEdgesPage}
            showEdges
          />
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Page{" "}
            <span className="font-semibold text-dark dark:text-white">
              {edgesPage}
            </span>{" "}
            of 20. The ellipsis collapses the middle range so the rail stays compact.
          </p>
        </Card>

        <Card>
          <CardHeader
            title="With jump"
            subtitle="Type a page number and press Go to skip ahead."
          />
          <div className="flex flex-wrap items-center gap-4">
            <Pagination
              page={jumpPage}
              totalPages={totalForJump}
              onPageChange={setJumpPage}
              showEdges
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const n = parseInt(jumpInput, 10);
                if (!Number.isNaN(n) && n >= 1 && n <= totalForJump) {
                  setJumpPage(n);
                  setJumpInput("");
                }
              }}
              className="flex items-center gap-2"
            >
              <input
                type="number"
                min={1}
                max={totalForJump}
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                placeholder="Page #"
                className="h-9 w-20 rounded-lg border border-stroke bg-white px-2 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
              <Button type="submit" size="sm" variant="primary">
                Go
              </Button>
            </form>
          </div>
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Jumping to page{" "}
            <span className="font-semibold text-dark dark:text-white">
              {jumpPage}
            </span>{" "}
            of {totalForJump}. Useful for very large result sets where sequential paging is slow.
          </p>
        </Card>

        <Card>
          <CardHeader
            title="Sizes"
            subtitle="Three button scales for dense toolbars and roomy dashboards."
          />
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {sizeScales.map((s, i) => (
                <Button
                  key={s.name}
                  size="sm"
                  variant={sizeVariant === i ? "primary" : "outline"}
                  onClick={() => setSizeVariant(i)}
                >
                  {s.name}
                </Button>
              ))}
            </div>
            <div className={sizeScales[sizeVariant].className}>
              <Pagination
                page={sizePage}
                totalPages={6}
                onPageChange={setSizePage}
                showEdges={false}
              />
            </div>
            <p className="text-sm text-dark-5 dark:text-dark-6">
              Currently {sizeScales[sizeVariant].name} scale — page{" "}
              <span className="font-semibold text-dark dark:text-white">
                {sizePage}
              </span>
              .
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Simple"
            subtitle="Prev / next only — for cards, stories and onboarding flows."
          />
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSimplePage((p) => Math.max(1, p - 1))}
              disabled={simplePage === 1}
            >
              Previous
            </Button>
            <span className="text-sm font-medium text-dark-7 dark:text-dark-7">
              Step {simplePage} of 5
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSimplePage((p) => Math.min(5, p + 1))}
              disabled={simplePage === 5}
            >
              Next
            </Button>
          </div>
          <p className="mt-4 text-sm text-dark-5 dark:text-dark-6">
            Ideal for wizard steps, walkthroughs and short lists where the total
            page count is implicit.
          </p>
        </Card>
      </div>
    </>
  );
}
