"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Icon } from "@iconify/react";

const TimelinePage = () => (
  <PageContainer title="Timeline" description="Vertical and horizontal timelines for activity feeds and project progress.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Vertical Timeline">
        <ol className="relative border-l border-defaultBorder ml-2 space-y-6 pl-6">
          {[
            { icon: "solar:add-circle-bold-duotone", color: "success", title: "Project Created", desc: "Phoenix project was created", time: "10:30 AM" },
            { icon: "solar:pen-2-bold-duotone", color: "primary", title: "Profile Updated", desc: "Bio and avatar changed", time: "9:15 AM" },
            { icon: "solar:upload-bold-duotone", color: "info", title: "Files Uploaded", desc: "12 files added to Documents", time: "Yesterday" },
            { icon: "solar:trash-bin-minimalistic-bold-duotone", color: "error", title: "Records Deleted", desc: "3 outdated entries removed", time: "2 days ago" },
          ].map((e, i) => (
            <li key={i} className="relative">
              <span className={`absolute -left-[34px] flex h-7 w-7 items-center justify-center rounded-full bg-light${e.color} text-${e.color} ring-4 ring-background`}>
                <Icon icon={e.icon} width={14} />
              </span>
              <p className="text-sm font-medium">{e.title}</p>
              <p className="text-xs opacity-70 mt-0.5">{e.desc}</p>
              <p className="text-xs opacity-50 mt-1">{e.time}</p>
            </li>
          ))}
        </ol>
      </DemoBlock>

      <DemoBlock title="Horizontal Timeline">
        <div className="flex items-center">
          {["Planning", "Design", "Development", "Testing", "Launch"].map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm ${i <= 2 ? "bg-primary text-white" : "bg-lightgray dark:bg-dark text-muted-foreground"}`}>
                  {i + 1}
                </div>
                <p className="text-xs mt-2 text-center">{step}</p>
              </div>
              {i < 4 && <div className={`flex-1 h-0.5 mx-2 ${i < 2 ? "bg-primary" : "bg-defaultBorder"}`} />}
            </div>
          ))}
        </div>
      </DemoBlock>

      <DemoBlock title="Activity Feed" className="lg:col-span-2">
        <div className="space-y-3">
          {[
            { user: "Sarah", action: "completed", target: "Q3 Budget Review", time: "2 min ago", img: 4, color: "success" },
            { user: "Michael", action: "commented on", target: "Design System v2", time: "15 min ago", img: 5, color: "primary" },
            { user: "Emily", action: "assigned", target: "3 new tasks to David", time: "1 hour ago", img: 6, color: "info" },
            { user: "Lisa", action: "approved", target: "Marketing Campaign", time: "3 hours ago", img: 8, color: "success" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-lightgray dark:hover:bg-dark transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/profile/user-${a.img}.jpg`} alt="" className="h-9 w-9 rounded-full" />
              <div className="flex-1">
                <p className="text-sm"><span className="font-medium">{a.user}</span> <span className="opacity-70">{a.action}</span> <span className="font-medium">{a.target}</span></p>
                <p className="text-xs opacity-50">{a.time}</p>
              </div>
              <span className={`h-2 w-2 rounded-full bg-${a.color}`} />
            </div>
          ))}
        </div>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default TimelinePage;
