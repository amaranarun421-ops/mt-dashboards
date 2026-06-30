"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

const ListsPage = () => {
  return (
    <PageContainer
      title="Lists"
      description="Vertical collections of related items — contacts, notifications, tasks, and activity feeds."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="User List">
          <ul className="divide-y divide-defaultBorder">
            {[
              { name: "Sarah Johnson", role: "Admin", img: 4, status: "Active" },
              { name: "Michael Chen", role: "Editor", img: 5, status: "Active" },
              { name: "Emily Rodriguez", role: "Viewer", img: 6, status: "Away" },
              { name: "David Park", role: "Editor", img: 7, status: "Offline" },
            ].map((u) => (
              <li key={u.name} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Avatar className="h-10 w-10"><AvatarImage src={`/images/profile/user-${u.img}.jpg`} /><AvatarFallback>U</AvatarFallback></Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs opacity-70">{u.role}</p>
                </div>
                <Badge variant={u.status === "Active" ? "lightSuccess" : u.status === "Away" ? "lightWarning" : "lightError"}>{u.status}</Badge>
              </li>
            ))}
          </ul>
        </DemoBlock>

        <DemoBlock title="Notification List">
          <ul className="space-y-2">
            {[
              { icon: "solar:user-check-bold-duotone", color: "primary", title: "New user registered", time: "2 min ago", desc: "Sarah just joined your platform" },
              { icon: "solar:cart-check-bold-duotone", color: "success", title: "Order #1234 completed", time: "1 hour ago", desc: "Payment of $240 received" },
              { icon: "solar:danger-triangle-bold-duotone", color: "warning", title: "Low stock alert", time: "3 hours ago", desc: "iPhone 13 has only 5 units left" },
              { icon: "solar:bell-bing-bold-duotone", color: "info", title: "Weekly report ready", time: "Yesterday", desc: "Your analytics summary is available" },
            ].map((n) => (
              <li key={n.title} className="flex items-start gap-3 p-3 rounded-lg hover:bg-lightgray dark:hover:bg-dark cursor-pointer">
                <div className={`h-10 w-10 rounded-xl bg-light${n.color} text-${n.color} flex items-center justify-center shrink-0`}>
                  <Icon icon={n.icon} width={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs opacity-70 truncate">{n.desc}</p>
                </div>
                <span className="text-xs opacity-60 shrink-0">{n.time}</span>
              </li>
            ))}
          </ul>
        </DemoBlock>

        <DemoBlock title="Task List" description="With checkboxes">
          <ul className="space-y-2">
            {[
              { label: "Review pull requests", done: true, priority: "high" },
              { label: "Update documentation", done: false, priority: "medium" },
              { label: "Deploy to staging", done: false, priority: "high" },
              { label: "Refactor auth module", done: true, priority: "low" },
              { label: "Sprint planning meeting", done: false, priority: "medium" },
            ].map((t) => (
              <li key={t.label} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-lightgray dark:hover:bg-dark">
                <input type="checkbox" defaultChecked={t.done} className="w-4 h-4 rounded accent-primary" />
                <span className={`text-sm flex-1 ${t.done ? "line-through opacity-50" : ""}`}>{t.label}</span>
                <Badge variant={t.priority === "high" ? "lightError" : t.priority === "medium" ? "lightWarning" : "lightInfo"}>{t.priority}</Badge>
              </li>
            ))}
          </ul>
        </DemoBlock>

        <DemoBlock title="Activity Feed" description="Timeline-style list">
          <ol className="relative border-l border-defaultBorder ml-2 space-y-6 pl-6">
            {[
              { icon: "solar:add-circle-bold-duotone", color: "success", title: "Created new project", desc: "Project 'Phoenix' was created by you", time: "10:30 AM" },
              { icon: "solar:pen-2-bold-duotone", color: "primary", title: "Edited user profile", desc: "Updated bio and avatar", time: "9:15 AM" },
              { icon: "solar:upload-bold-duotone", color: "info", title: "Uploaded 12 files", desc: "Files added to 'Documents' folder", time: "Yesterday" },
              { icon: "solar:trash-bin-minimalistic-bold-duotone", color: "error", title: "Deleted 3 records", desc: "Removed outdated entries", time: "2 days ago" },
            ].map((a) => (
              <li key={a.title} className="relative">
                <span className={`absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full bg-light${a.color} text-${a.color} ring-4 ring-background`}>
                  <Icon icon={a.icon} width={14} />
                </span>
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs opacity-70 mt-0.5">{a.desc}</p>
                <p className="text-xs opacity-50 mt-1">{a.time}</p>
              </li>
            ))}
          </ol>
        </DemoBlock>

        <DemoBlock title="Settings List" description="With toggles">
          <ul className="divide-y divide-defaultBorder">
            {[
              { label: "Email notifications", desc: "Receive emails about activity", on: true },
              { label: "Push notifications", desc: "Get push alerts on your device", on: true },
              { label: "SMS alerts", desc: "Critical alerts via text message", on: false },
              { label: "Weekly digest", desc: "Summary every Monday morning", on: true },
            ].map((s) => (
              <li key={s.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs opacity-70">{s.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={s.on} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-dark peer-checked:bg-primary rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform peer-checked:after:translate-x-5" />
                </label>
              </li>
            ))}
          </ul>
        </DemoBlock>

        <DemoBlock title="File List" description="With icons and metadata">
          <ul className="space-y-2">
            {[
              { name: "annual-report-2024.pdf", size: "2.4 MB", icon: "solar:document-text-bold-duotone", color: "error" },
              { name: "team-photo.jpg", size: "1.8 MB", icon: "solar:gallery-bold-duotone", color: "primary" },
              { name: "presentation.pptx", size: "5.2 MB", icon: "solar:document-add-bold-duotone", color: "warning" },
              { name: "data-export.csv", size: "420 KB", icon: "solar:document-bold-duotone", color: "success" },
            ].map((f) => (
              <li key={f.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-lightgray dark:hover:bg-dark">
                <Icon icon={f.icon} width={28} className={`text-${f.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs opacity-60">{f.size}</p>
                </div>
                <button className="h-8 w-8 rounded-full hover:bg-lightprimary text-link hover:text-primary flex items-center justify-center">
                  <Icon icon="solar:download-minimalistic-bold" width={16} />
                </button>
              </li>
            ))}
          </ul>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default ListsPage;
