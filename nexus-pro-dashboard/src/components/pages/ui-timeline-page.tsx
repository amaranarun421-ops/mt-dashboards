"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, XCircle, Package, Truck, Home } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";

const timeline = [
  { icon: CheckCircle2, color: "bg-success-500", title: "Order Placed", time: "Jul 1, 2026 - 9:42 AM", desc: "Your order #ORD-8421 has been confirmed", done: true },
  { icon: Package, color: "bg-brand-500", title: "Order Processed", time: "Jul 1, 2026 - 11:20 AM", desc: "Items packed and ready for shipment", done: true },
  { icon: Truck, color: "bg-info-500", title: "Out for Delivery", time: "Jul 2, 2026 - 8:15 AM", desc: "Package is on the way to your address", done: true },
  { icon: Clock, color: "bg-warning-500", title: "In Transit", time: "Expected: Jul 3, 2026", desc: "Currently at distribution center", done: false },
  { icon: Home, color: "bg-gray-300", title: "Delivered", time: "Pending", desc: "Package will be delivered to your door", done: false },
];

export function UiTimeline() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Elements", "Timeline"]} title="Timeline Component" description="Visualize sequential events with timeline components." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">Vertical Timeline</h3>
          <div className="relative">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div key={i} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: i*0.05}} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < timeline.length - 1 && <div className={`absolute left-5 top-12 bottom-0 w-0.5 ${t.done ? "bg-success-300 dark:bg-success-500/30" : "bg-gray-200 dark:bg-gray-800"}`} />}
                  <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.color} text-white z-10`}><Icon className="h-5 w-5" /></div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{t.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.time}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">Horizontal Timeline</h3>
          <div className="flex items-start">
            {timeline.slice(0, 4).map((t, i) => {
              const Icon = t.icon;
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center text-center" style={{minWidth: "80px"}}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color} text-white mb-2`}><Icon className="h-5 w-5" /></div>
                    <p className="text-xs font-medium text-gray-800 dark:text-white/90">{t.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{t.time.split(" - ")[0]}</p>
                  </div>
                  {i < 3 && <div className={`flex-1 h-0.5 mx-1 mt-5 ${t.done ? "bg-success-300 dark:bg-success-500/30" : "bg-gray-200 dark:bg-gray-800"}`} />}
                </React.Fragment>
              );
            })}
          </div>
          <div className="mt-8 space-y-3">
            {[
              { icon: CheckCircle2, color: "text-success-500", label: "Completed Step", desc: "Green checkmark indicates done" },
              { icon: Clock, color: "text-warning-500", label: "In Progress", desc: "Yellow clock indicates pending" },
              { icon: AlertCircle, color: "text-info-500", label: "Info State", desc: "Blue circle for informational" },
              { icon: XCircle, color: "text-error-500", label: "Failed Step", desc: "Red X indicates failure" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3 p-2 rounded-lg"><s.icon className={`h-5 w-5 ${s.color}`} /><div><p className="text-sm font-medium text-gray-800 dark:text-white/90">{s.label}</p><p className="text-xs text-gray-400">{s.desc}</p></div></div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
