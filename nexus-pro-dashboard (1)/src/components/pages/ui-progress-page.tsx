"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

export function UiProgressPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Progress"]} title="Progress" description="Loading bars, circular progress, and step indicators." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Linear Progress</h3><div className="space-y-4">{[25, 50, 75, 100].map((v, i) => (<div key={i}><div className="mb-1.5 flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Task {i + 1}</span><span className="font-semibold">{v}%</span></div><Progress value={v} /></div>))}</div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Colored Progress</h3><div className="space-y-4"><div><div className="mb-1.5 flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Storage</span><span className="font-semibold text-success-600 dark:text-success-500">82%</span></div><Progress value={82} className="[&>div]:bg-success-500" /></div><div><div className="mb-1.5 flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Bandwidth</span><span className="font-semibold text-warning-600 dark:text-orange-400">68%</span></div><Progress value={68} className="[&>div]:bg-warning-500" /></div><div><div className="mb-1.5 flex justify-between text-sm"><span className="text-gray-500 dark:text-gray-400">Quota</span><span className="font-semibold text-error-600 dark:text-error-500">94%</span></div><Progress value={94} className="[&>div]:bg-error-500" /></div></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Circular Progress</h3><div className="flex items-center gap-6">{[75, 60, 90].map((v, i) => (<div key={i} className="relative h-20 w-20"><svg className="h-full w-full -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" fill="none" stroke="oklch(0.7 0.01 250 / 0.15)" strokeWidth="3" /><circle cx="18" cy="18" r="15.5" fill="none" stroke="oklch(0.55 0.14 165)" strokeWidth="3" strokeDasharray={`${v} 100`} strokeLinecap="round" /></svg><span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{v}%</span></div>))}</div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Step Indicator</h3><div className="flex items-center">{["Cart", "Shipping", "Payment", "Done"].map((s, i) => (<React.Fragment key={s}><div className="flex flex-col items-center"><div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${i <= 2 ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"}`}>{i < 2 ? <Check className="h-4 w-4" /> : i + 1}</div><span className="mt-1.5 text-xs">{s}</span></div>{i < 3 && <div className={`h-0.5 flex-1 mx-2 ${i < 2 ? "bg-brand-500" : "bg-gray-100 dark:bg-gray-800"}`} />}</React.Fragment>))}</div></Card>
      </div>
    </div>
  );
}
