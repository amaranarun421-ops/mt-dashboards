"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ChartCard } from "@/components/common/chart-card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const data = [{n:"Mon",v:400,w:240},{n:"Tue",v:450,w:280},{n:"Wed",v:380,w:320},{n:"Thu",v:520,w:380},{n:"Fri",v:480,w:420},{n:"Sat",v:620,w:480},{n:"Sun",v:580,w:440}];

export function ChartBar() {
  return (
    <div>
      <PageHeader breadcrumb={["Charts", "Bar Charts"]} title="Bar Charts" description="Compare values across categories." actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Vertical Bars" description="Daily sales volume">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{left:-20, right:8, top:8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false}/>
                <XAxis dataKey="n" tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}} cursor={{fill:"#f2f4f7"}}/>
                <Bar dataKey="v" fill="#465fff" radius={[6,6,0,0]} maxBarSize={40}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Grouped Bars" description="Compare two metrics">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{left:-20, right:8, top:8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false}/>
                <XAxis dataKey="n" tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}} cursor={{fill:"#f2f4f7"}}/>
                <Legend wrapperStyle={{fontSize:12}}/>
                <Bar dataKey="v" fill="#465fff" radius={[6,6,0,0]} maxBarSize={24} name="Online"/>
                <Bar dataKey="w" fill="#0ba5ec" radius={[6,6,0,0]} maxBarSize={24} name="In-store"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
