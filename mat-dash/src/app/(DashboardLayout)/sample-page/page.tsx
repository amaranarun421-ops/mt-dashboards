"use client";
import PageContainer from "../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const base: ApexOptions = { chart: { toolbar: { show: false }, fontFamily: "inherit" }, dataLabels: { enabled: false }, tooltip: { theme: "dark" }, grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 } };

const SamplePage = () => {
  return (
    <PageContainer
      title="Sample Page"
      description="A demonstration of the upgraded premium UI with stats, charts, activity feed, and team overview."
    >
      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: "$48,920", change: "+12.5%", icon: "solar:dollar-minimalistic-bold-duotone", color: "primary" },
          { label: "Active Users", value: "12,543", change: "+8.2%", icon: "solar:users-group-rounded-bold-duotone", color: "success" },
          { label: "Open Tasks", value: "234", change: "-4.1%", icon: "solar:clipboard-check-bold-duotone", color: "warning" },
          { label: "Conversion", value: "3.24%", change: "+0.8%", icon: "solar:graph-up-bold-duotone", color: "info" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-background border border-defaultBorder p-5">
            <div className="flex items-start justify-between">
              <div className={`h-11 w-11 rounded-xl bg-light${s.color} text-${s.color} flex items-center justify-center`}>
                <Icon icon={s.icon} width={24} />
              </div>
              <Badge variant={s.change.startsWith("+") ? "lightSuccess" : "lightError"} className="gap-1">
                <Icon icon={s.change.startsWith("+") ? "solar:arrow-up-bold" : "solar:arrow-down-bold"} width={12} />
                {s.change}
              </Badge>
            </div>
            <p className="text-2xl font-bold mt-3">{s.value}</p>
            <p className="text-xs opacity-70 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DemoBlock title="Weekly Performance" className="lg:col-span-2">
          <Chart options={{ ...base, colors: ["var(--color-primary)"], stroke: { curve: "smooth", width: 3 }, xaxis: { categories: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] } }} series={[{ name: "Tasks Completed", data: [12, 19, 14, 22, 18, 25, 30] }]} type="line" height={300} />
        </DemoBlock>

        <DemoBlock title="Team Members">
          <div className="space-y-3">
            {[
              { name: "Sarah Johnson", role: "Lead Designer", img: 4, status: "online" },
              { name: "Michael Chen", role: "Senior Developer", img: 5, status: "online" },
              { name: "Emily Rodriguez", role: "Product Manager", img: 6, status: "away" },
              { name: "David Park", role: "DevOps Engineer", img: 7, status: "offline" },
              { name: "Lisa Anderson", role: "QA Lead", img: 8, status: "online" },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-lightgray dark:hover:bg-dark transition-colors">
                <div className="relative">
                  <Avatar className="h-9 w-9"><AvatarImage src={`/images/profile/user-${m.img}.jpg`} /><AvatarFallback>{m.name[0]}</AvatarFallback></Avatar>
                  <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-background ${m.status === "online" ? "bg-success" : m.status === "away" ? "bg-warning" : "bg-gray-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{m.name}</p>
                  <p className="text-xs opacity-60 truncate">{m.role}</p>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-lightprimary hover:text-primary">
                  <Icon icon="solar:chat-round-dots-bold" width={14} />
                </Button>
              </div>
            ))}
          </div>
        </DemoBlock>
      </div>

      <DemoBlock title="Recent Activity">
        <div className="space-y-3">
          {[
            { icon: "solar:add-circle-bold-duotone", color: "success", text: "Sarah created 'Phoenix Project'", time: "2 min ago" },
            { icon: "solar:pen-2-bold-duotone", color: "primary", text: "Michael updated the design system tokens", time: "15 min ago" },
            { icon: "solar:upload-bold-duotone", color: "info", text: "Emily uploaded 5 wireframes to the docs folder", time: "1 hour ago" },
            { icon: "solar:check-circle-bold-duotone", color: "success", text: "David approved the Q3 budget proposal", time: "3 hours ago" },
            { icon: "solar:trash-bin-minimalistic-bold-duotone", color: "error", text: "Lisa removed 12 outdated records from the database", time: "5 hours ago" },
            { icon: "solar:bell-bing-bold-duotone", color: "warning", text: "System maintenance scheduled for tonight at 2 AM UTC", time: "Yesterday" },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-lightgray dark:hover:bg-dark transition-colors">
              <div className={`h-9 w-9 rounded-lg bg-light${a.color} text-${a.color} flex items-center justify-center shrink-0`}>
                <Icon icon={a.icon} width={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{a.text}</p>
                <p className="text-xs opacity-60 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </DemoBlock>
    </PageContainer>
  );
};

export default SamplePage;
