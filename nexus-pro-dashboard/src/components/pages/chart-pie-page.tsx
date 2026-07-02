"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ChartCard } from "@/components/common/chart-card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const pieData = [{n:"Mobile",v:45,c:"#465fff"},{n:"Desktop",v:35,c:"#0ba5ec"},{n:"Tablet",v:20,c:"#12b76a"}];
const donutData = [{n:"Pro",v:50,c:"#465fff"},{n:"Business",v:30,c:"#0ba5ec"},{n:"Enterprise",v:15,c:"#f79009"},{n:"Free",v:5,c:"#ee46bc"}];

export function ChartPie() {
  return (
    <div>
      <PageHeader breadcrumb={["Charts", "Pie & Donut"]} title="Pie & Donut Charts" description="Proportional data representation." actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Pie Chart" description="Device breakdown">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="v" stroke="none">
                  {pieData.map((d,i)=><Cell key={i} fill={d.c}/>)}
                </Pie>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}}/>
                <Legend wrapperStyle={{fontSize:12}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Donut Chart" description="Plan distribution">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="v" stroke="none">
                  {donutData.map((d,i)=><Cell key={i} fill={d.c}/>)}
                </Pie>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}}/>
                <Legend wrapperStyle={{fontSize:12}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
