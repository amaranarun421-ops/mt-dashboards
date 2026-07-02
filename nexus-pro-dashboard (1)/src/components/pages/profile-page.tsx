"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar, Briefcase, Pencil, Award, Star, TrendingUp, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/status-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const stats = [
  { label: "Projects", value: "24", icon: Briefcase },
  { label: "Tasks Done", value: "284", icon: CheckCircle2 },
  { label: "Achievements", value: "12", icon: Award },
  { label: "Streak (days)", value: "48", icon: TrendingUp },
];

const skills = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 92 },
  { name: "Next.js", level: 88 },
  { name: "UI/UX Design", level: 78 },
  { name: "Node.js", level: 82 },
];

const activity = [
  { action: "Completed task", target: "Implement dark mode", time: "2h ago", icon: CheckCircle2, color: "text-success-600 dark:text-success-500 bg-success-500/10" },
  { action: "Joined project", target: "Mobile App Redesign", time: "5h ago", icon: Briefcase, color: "text-blue-light-500 bg-blue-light-500/10" },
  { action: "Earned achievement", target: "Sprint Hero", time: "Yesterday", icon: Award, color: "text-warning-600 dark:text-orange-400 bg-warning-500/10" },
  { action: "Updated profile", target: "New skills added", time: "2 days ago", icon: Pencil, color: "text-brand-500 bg-brand-500/10" },
];

export function ProfilePage() {
  return (
    <div>
      <PageHeader breadcrumb={["Account", "Profile"]} title="My Profile" description="Manage your personal information and preferences." />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4">
          <Card className="overflow-hidden p-0">
            <div className="h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-info/10" />
            <div className="px-5 pb-5">
              <div className="-mt-10 mb-3 flex items-end justify-between">
                <Avatar className="h-20 w-20 border-4 border-card"><AvatarImage src="https://i.pravatar.cc/120?img=12" /><AvatarFallback className="text-2xl">AK</AvatarFallback></Avatar>
                <Button variant="outline" size="sm" className="gap-1.5"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
              </div>
              <h2 className="text-xl font-bold">Alex Kim</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Senior Product Engineer</p>
              <div className="mt-3 space-y-1.5 text-sm">
                <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400"><Mail className="h-4 w-4" /> alex@nexuspro.app</p>
                <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400"><Phone className="h-4 w-4" /> +1 (555) 012-3456</p>
                <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400"><MapPin className="h-4 w-4" /> San Francisco, CA</p>
                <p className="flex items-center gap-2 text-gray-500 dark:text-gray-400"><Calendar className="h-4 w-4" /> Joined Mar 2024</p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <StatusBadge variant="success" dot pulse>Active</StatusBadge>
                <StatusBadge variant="primary">Pro Member</StatusBadge>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="mb-3 text-base font-semibold">Skills</h3>
            <div className="space-y-3">
              {skills.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="font-bold">{s.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
        <div className="xl:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-4">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-500"><Icon className="h-4 w-4" /></div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="edit">Edit Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="mt-4">
              <Card className="p-5">
                <h3 className="mb-4 text-base font-semibold">Recent Activity</h3>
                <div className="space-y-4">
                  {activity.map((a, i) => {
                    const Icon = a.icon;
                    return (
                      <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-3">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${a.color}`}><Icon className="h-4 w-4" /></div>
                        <div className="min-w-0 flex-1 border-b border-border/50 pb-3">
                          <p className="text-sm"><span className="text-gray-500 dark:text-gray-400">{a.action}</span> <span className="font-semibold">{a.target}</span></p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{a.time}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="edit" className="mt-4">
              <Card className="p-5">
                <h3 className="mb-4 text-base font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><Label>First Name</Label><Input defaultValue="Alex" className="mt-1" /></div>
                  <div><Label>Last Name</Label><Input defaultValue="Kim" className="mt-1" /></div>
                  <div><Label>Email</Label><Input defaultValue="alex@nexuspro.app" className="mt-1" /></div>
                  <div><Label>Phone</Label><Input defaultValue="+1 (555) 012-3456" className="mt-1" /></div>
                  <div><Label>Role</Label><Input defaultValue="Senior Product Engineer" className="mt-1" /></div>
                  <div><Label>Location</Label><Input defaultValue="San Francisco, CA" className="mt-1" /></div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
