"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

const WidgetsCardsPage = () => {
  return (
    <PageContainer title="Widget Cards" description="Pre-built card widgets for dashboards — stats, profiles, progress, and comparisons.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat cards */}
        {[
          { label: "Total Revenue", value: "$48,920", change: "+12.5%", trend: "up", icon: "solar:dollar-minimalistic-bold-duotone", color: "primary" },
          { label: "Active Users", value: "12,543", change: "+8.2%", trend: "up", icon: "solar:users-group-rounded-bold-duotone", color: "success" },
          { label: "Conversion Rate", value: "3.24%", change: "-0.5%", trend: "down", icon: "solar:graph-up-bold-duotone", color: "warning" },
          { label: "Avg Session", value: "4m 32s", change: "+1.2%", trend: "up", icon: "solar:clock-circle-bold-duotone", color: "info" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-background p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div className={`h-11 w-11 rounded-xl bg-light${s.color} text-${s.color} flex items-center justify-center`}>
                <Icon icon={s.icon} width={24} />
              </div>
              <Badge variant={s.trend === "up" ? "lightSuccess" : "lightError"} className="gap-1">
                <Icon icon={s.trend === "up" ? "solar:arrow-up-bold" : "solar:arrow-down-bold"} width={12} />
                {s.change}
              </Badge>
            </div>
            <p className="text-2xl font-bold mt-3">{s.value}</p>
            <p className="text-xs opacity-70 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Profile widget */}
        <div className="rounded-xl bg-background p-5 shadow-xs text-center">
          <Avatar className="h-20 w-20 mx-auto"><AvatarImage src="/images/profile/user-1.jpg" /><AvatarFallback>U</AvatarFallback></Avatar>
          <h6 className="font-semibold mt-3">John Doe</h6>
          <p className="text-xs opacity-70">Product Designer · San Francisco</p>
          <div className="flex justify-center gap-2 mt-3">
            <Button size="sm">Follow</Button>
            <Button size="sm" variant="outline">Message</Button>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-defaultBorder">
            <div><p className="font-bold">1.2k</p><p className="text-xs opacity-70">Posts</p></div>
            <div><p className="font-bold">8.4k</p><p className="text-xs opacity-70">Followers</p></div>
            <div><p className="font-bold">240</p><p className="text-xs opacity-70">Following</p></div>
          </div>
        </div>

        {/* Progress widget */}
        <div className="rounded-xl bg-background p-5 shadow-xs">
          <h6 className="font-semibold">Monthly Goals</h6>
          <div className="space-y-4 mt-4">
            {[
              { label: "Revenue", value: 78, target: "$50k of $64k", color: "primary" },
              { label: "New Users", value: 65, target: "812 of 1,250", color: "success" },
              { label: "Tasks Done", value: 92, target: "46 of 50", color: "info" },
              { label: "Customer Satisfaction", value: 88, target: "4.4/5.0", color: "warning" },
            ].map((g) => (
              <div key={g.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="opacity-80">{g.label}</span>
                  <span className="opacity-60">{g.target}</span>
                </div>
                <div className="h-2 bg-lightgray dark:bg-dark rounded-full overflow-hidden">
                  <div className={`h-full bg-${g.color} rounded-full transition-all`} style={{ width: `${g.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity widget */}
        <div className="rounded-xl bg-background p-5 shadow-xs">
          <h6 className="font-semibold">Recent Activity</h6>
          <div className="space-y-3 mt-4">
            {[
              { icon: "solar:add-circle-bold-duotone", color: "success", text: "Sarah created 'Phoenix Project'", time: "2m" },
              { icon: "solar:pen-2-bold-duotone", color: "primary", text: "Michael updated profile", time: "15m" },
              { icon: "solar:upload-bold-duotone", color: "info", text: "Emily uploaded 5 files", time: "1h" },
              { icon: "solar:trash-bin-minimalistic-bold-duotone", color: "error", text: "David deleted 2 records", time: "2h" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`h-8 w-8 rounded-lg bg-light${a.color} text-${a.color} flex items-center justify-center shrink-0`}>
                  <Icon icon={a.icon} width={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs">{a.text}</p>
                  <p className="text-xs opacity-60">{a.time} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default WidgetsCardsPage;
