"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ChartCard } from "@/components/common/chart-card";
import { Button } from "@/components/ui/button";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

export function ChartRadial() {
  return (
    <div>
      <PageHeader breadcrumb={["Charts", "Radial Bar"]} title="Radial Bar Charts" description="Circular progress indicators for goals and metrics." actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Revenue Goal", value: 78, color: "#465fff" },
          { label: "New Users", value: 92, color: "#12b76a" },
          { label: "Retention", value: 64, color: "#0ba5ec" },
          { label: "Satisfaction", value: 88, color: "#f79009" },
        ].map((m, i) => (
          <ChartCard key={m.label} title={m.label} description="Monthly target">
            <div className="h-44 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{value: m.value}]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0,100]} angleAxisId={0} tick={false}/>
                  <RadialBar background={{fill:"#e4e7ec"}} dataKey="value" cornerRadius={10} fill={m.color}/>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800 dark:text-white/90">{m.value}%</span>
              </div>
            </div>
          </ChartCard>
        ))}
      </div>
    </div>
  );
}
