import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";

export function BlankPage() {
  return (
    <div>
      <PageHeader breadcrumb={["Pages", "Blank"]} title="Blank Page" description="A clean canvas to build your next page." />
      <Card className="flex min-h-[400px] items-center justify-center p-12 text-center">
        <div>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          </div>
          <h3 className="text-lg font-semibold">Start Building</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This is a blank page. Use it as a starting point for your custom content.</p>
        </div>
      </Card>
    </div>
  );
}
