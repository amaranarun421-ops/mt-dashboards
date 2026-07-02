"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitCommit, Rocket, Bug, CheckCircle2, UserPlus, FileEdit, Star } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const events = [
  { time: "10:42 AM", icon: Rocket, color: "bg-brand-500", title: "Deployed v2.4.1 to production", desc: "All services operational. Zero downtime deployment.", user: "Alex Kim", avatar: "https://i.pravatar.cc/40?img=12" },
  { time: "09:15 AM", icon: GitCommit, color: "bg-info-500", title: "Merged PR #284: Premium dark mode", desc: "Added refined color palette with accessibility-compliant contrast ratios.", user: "Sarah Chen", avatar: "https://i.pravatar.cc/40?img=1" },
  { time: "08:30 AM", icon: Bug, color: "bg-error-500", title: "Fixed critical login bug", desc: "Resolved OAuth redirect issue affecting 0.3% of users on Safari.", user: "John Davis", avatar: "https://i.pravatar.cc/40?img=4" },
  { time: "Yesterday", icon: UserPlus, color: "bg-success-500", title: "New team member onboarded", desc: "Lisa Wang joined the Engineering team as QA Engineer.", user: "HR System", avatar: "https://i.pravatar.cc/40?img=7" },
  { time: "Yesterday", icon: FileEdit, color: "bg-warning-500", title: "Updated API documentation", desc: "Added examples for webhook endpoints and error codes.", user: "Riya Patel", avatar: "https://i.pravatar.cc/40?img=3" },
  { time: "2 days ago", icon: Star, color: "bg-orange-400", title: "Reached 10K GitHub stars", desc: "Thank you to our amazing community for the milestone!", user: "Marketing", avatar: "https://i.pravatar.cc/40?img=5" },
  { time: "3 days ago", icon: CheckCircle2, color: "bg-success-500", title: "Q3 roadmap approved", desc: "Board approved the roadmap focusing on AI features and mobile.", user: "Mark Park", avatar: "https://i.pravatar.cc/40?img=2" },
];

export function TimelinePage() {
  return (
    <div>
      <PageHeader breadcrumb={["Pages", "Timeline"]} title="Activity Timeline" description="Chronological feed of all events across your workspace." />
      <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="relative">
          {events.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div key={i} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: i*0.05}} className="relative flex gap-4 pb-8 last:pb-0">
                {/* Line */}
                {i < events.length - 1 && <div className="absolute left-5 top-12 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />}
                {/* Icon */}
                <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${e.color} text-white z-10`}><Icon className="h-5 w-5" /></div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">{e.time}</span>
                  </div>
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-theme-sm transition">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8"><AvatarImage src={e.avatar} /><AvatarFallback className="text-xs">{e.user[0]}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white/90">{e.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{e.desc}</p>
                        <p className="text-xs text-gray-400 mt-2">by {e.user}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
