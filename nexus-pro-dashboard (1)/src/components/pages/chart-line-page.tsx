"use client";

import * as React from "react";
import { TrendingUp, Download } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ChartCard } from "@/components/common/chart-card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data1 = [{n:"Jan",a:400,b:240,c:180},{n:"Feb",a:450,b:280,c:220},{n:"Mar",a:380,b:320,c:260},{n:"Apr",a:520,b:380,c:310},{n:"May",a:480,b:420,c:340},{n:"Jun",a:620,b:480,c:380}];

export function ChartLine() {
  return (
    <div>
      <PageHeader breadcrumb={["Charts", "Line Charts"]} title="Line Charts" description="Trend visualization with single and multi-series options." actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Single Line" description="Revenue trend over 6 months">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data1} margin={{left:-20, right:8, top:8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false}/>
                <XAxis dataKey="n" tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}}/>
                <Line type="monotone" dataKey="a" stroke="#465fff" strokeWidth={2.5} dot={{r:4}} name="Revenue ($K)"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Multi-Series" description="Compare three metrics">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data1} margin={{left:-20, right:8, top:8}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false}/>
                <XAxis dataKey="n" tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}}/>
                <Legend wrapperStyle={{fontSize:12}}/>
                <Line type="monotone" dataKey="a" stroke="#465fff" strokeWidth={2} dot={false} name="Product A"/>
                <Line type="monotone" dataKey="b" stroke="#0ba5ec" strokeWidth={2} dot={false} name="Product B"/>
                <Line type="monotone" dataKey="c" stroke="#12b76a" strokeWidth={2} dot={false} name="Product C"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
