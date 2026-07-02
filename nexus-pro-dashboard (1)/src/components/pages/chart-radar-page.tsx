"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ChartCard } from "@/components/common/chart-card";
import { Button } from "@/components/ui/button";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  {m:"Speed",a:90,b:75},{m:"Reliability",a:85,b:92},{m:"Design",a:95,b:70},
  {m:"Support",a:80,b:88},{m:"Price",a:70,b:85},{m:"Features",a:88,b:78},
];

export function ChartRadar() {
  return (
    <div>
      <PageHeader breadcrumb={["Charts", "Radar Charts"]} title="Radar Charts" description="Multi-dimensional comparison between entities." actions={<Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>} />
      <ChartCard title="Product Comparison" description="Nexus Pro vs Competitor across 6 dimensions">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius={120}>
              <PolarGrid stroke="#e4e7ec"/>
              <PolarAngleAxis dataKey="m" tick={{fontSize:12, fill:"#667085"}}/>
              <PolarRadiusAxis angle={90} domain={[0,100]} tick={{fontSize:10, fill:"#98a2b3"}}/>
              <Tooltip contentStyle={{background:"#fff", border:"1px solid #e4e7ec", borderRadius:8, fontSize:12}}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Radar dataKey="a" stroke="#465fff" fill="#465fff" fillOpacity={0.3} strokeWidth={2} name="Nexus Pro"/>
              <Radar dataKey="b" stroke="#f79009" fill="#f79009" fillOpacity={0.2} strokeWidth={2} name="Competitor"/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
