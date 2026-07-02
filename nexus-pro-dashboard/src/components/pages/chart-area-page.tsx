"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ChartCard } from "@/components/common/chart-card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [{n:"Jan",u:4200,s:2400},{n:"Feb",u:4800,s:2800},{n:"Mar",u:5600,s:3200},{n:"Apr",u:5100,s:2900},{n:"May",u:6200,s:3800},{n:"Jun",u:7400,s:4200},{n:"Jul",u:8200,s:4800}];

export function ChartArea() {
  return (
    <div>
      <PageHeader breadcrumb={["Charts", "Area Charts"]} title="Area Charts" description="Volume visualization with gradient fills." actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Single Area" description="Total users growth">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{left:-20, right:8, top:8}}>
                <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#465fff" stopOpacity={0.4}/><stop offset="100%" stopColor="#465fff" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false}/>
                <XAxis dataKey="n" tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}}/>
                <Area type="monotone" dataKey="u" stroke="#465fff" strokeWidth={2.5} fill="url(#g1)" name="Users"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Stacked Area" description="Users vs subscribers">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{left:-20, right:8, top:8}}>
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#465fff" stopOpacity={0.4}/><stop offset="100%" stopColor="#465fff" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0ba5ec" stopOpacity={0.3}/><stop offset="100%" stopColor="#0ba5ec" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f2f4f7" vertical={false}/>
                <XAxis dataKey="n" tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11, fill:"#667085"}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}}/>
                <Legend wrapperStyle={{fontSize:12}}/>
                <Area type="monotone" dataKey="u" stroke="#465fff" strokeWidth={2} fill="url(#g2)" name="Users"/>
                <Area type="monotone" dataKey="s" stroke="#0ba5ec" strokeWidth={2} fill="url(#g3)" name="Subscribers"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
