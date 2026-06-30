"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";

const AccountSettingPage = () => {
  const [notif, setNotif] = useState({ email: true, push: true, sms: false, weekly: true });

  return (
    <PageContainer title="Account Settings" description="Manage your profile, security, notifications, and billing preferences.">
      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="profile" className="gap-1.5"><Icon icon="solar:user-circle-line-duotone" width={16} /> Profile</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Icon icon="solar:shield-keyhole-line-duotone" width={16} /> Security</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Icon icon="solar:bell-bing-line-duotone" width={16} /> Notifications</TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5"><Icon icon="solar:card-line-duotone" width={16} /> Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DemoBlock title="Profile Picture" className="text-center">
              <Avatar className="h-24 w-24 mx-auto"><AvatarImage src="/images/profile/user-1.jpg" /><AvatarFallback>U</AvatarFallback></Avatar>
              <h6 className="font-semibold mt-3">John Doe</h6>
              <p className="text-xs opacity-70">Product Designer</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 gap-1.5"><Icon icon="solar:gallery-bold-duotone" width={14} /> Upload</Button>
                <Button variant="outline" size="sm" className="text-error hover:bg-lighterror">Remove</Button>
              </div>
              <p className="text-xs opacity-60 mt-3">JPG, PNG or GIF. Max size 2MB.</p>
            </DemoBlock>

            <DemoBlock title="Personal Information" className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name</Label><Input defaultValue="John" className="mt-2" /></div>
                <div><Label>Last Name</Label><Input defaultValue="Doe" className="mt-2" /></div>
                <div><Label>Email</Label><Input type="email" defaultValue="john@example.com" className="mt-2" /></div>
                <div><Label>Phone</Label><Input defaultValue="+1 555 000 1234" className="mt-2" /></div>
                <div><Label>Job Title</Label><Input defaultValue="Product Designer" className="mt-2" /></div>
                <div><Label>Department</Label><Input defaultValue="Design" className="mt-2" /></div>
                <div className="col-span-2"><Label>Bio</Label><Input defaultValue="Designer passionate about clean, intuitive interfaces." className="mt-2" /></div>
              </div>
              <div className="flex justify-end gap-2 mt-5">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-1.5"><Icon icon="solar:check-circle-bold" width={16} /> Save Changes</Button>
              </div>
            </DemoBlock>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DemoBlock title="Change Password">
              <div className="space-y-4">
                <div><Label>Current Password</Label><Input type="password" className="mt-2" /></div>
                <div><Label>New Password</Label><Input type="password" className="mt-2" /></div>
                <div><Label>Confirm New Password</Label><Input type="password" className="mt-2" /></div>
                <Button className="gap-1.5"><Icon icon="solar:lock-keyhole-bold" width={16} /> Update Password</Button>
              </div>
            </DemoBlock>

            <DemoBlock title="Two-Factor Authentication">
              <div className="flex items-center justify-between p-3 rounded-lg bg-lightsuccess mb-3">
                <div className="flex items-center gap-2 text-success">
                  <Icon icon="solar:shield-check-bold-duotone" width={24} />
                  <div><p className="font-semibold text-sm">2FA Enabled</p><p className="text-xs opacity-80">Your account is protected</p></div>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <p className="text-sm opacity-70 mb-3">Active sessions</p>
              <div className="space-y-2">
                {[
                  { device: "MacBook Pro · Chrome", loc: "San Francisco, CA", time: "Current session", icon: "solar:laptop-bold-duotone" },
                  { device: "iPhone 15 · Safari", loc: "San Francisco, CA", time: "2 hours ago", icon: "solar:smartphone-bold-duotone" },
                  { device: "iPad · Safari", loc: "New York, NY", time: "Yesterday", icon: "solar:tablet-bold-duotone" },
                ].map((s) => (
                  <div key={s.device} className="flex items-center gap-3 p-2 rounded-lg hover:bg-lightgray/60 dark:hover:bg-dark/30">
                    <Icon icon={s.icon} width={22} className="text-primary" />
                    <div className="flex-1"><p className="text-sm font-medium">{s.device}</p><p className="text-xs opacity-60">{s.loc} · {s.time}</p></div>
                    <Button size="sm" variant="ghost" className="text-error hover:bg-lighterror">Revoke</Button>
                  </div>
                ))}
              </div>
            </DemoBlock>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <DemoBlock title="Notification Preferences">
            <div className="space-y-1">
              {[
                { key: "email", label: "Email Notifications", desc: "Receive emails about account activity, mentions, and updates" },
                { key: "push", label: "Push Notifications", desc: "Get push alerts on your devices in real-time" },
                { key: "sms", label: "SMS Alerts", desc: "Critical alerts via text message (rates may apply)" },
                { key: "weekly", label: "Weekly Digest", desc: "A summary of your activity every Monday at 9 AM" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-3 border-b border-defaultBorder last:border-b-0">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs opacity-70">{n.desc}</p>
                  </div>
                  <Switch checked={(notif as any)[n.key]} onCheckedChange={(v) => setNotif((p) => ({ ...p, [n.key]: v }))} />
                </div>
              ))}
            </div>
          </DemoBlock>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DemoBlock title="Current Plan" className="lg:col-span-2">
              <div className="p-4 rounded-lg bg-lightprimary">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-70">You're on</p>
                    <h3 className="text-2xl font-bold text-primary">Pro Plan</h3>
                    <p className="text-xs opacity-70 mt-1">$29/month · Renews on July 24, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70">Seats used</p>
                    <p className="font-bold">8 / 10</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button>Upgrade Plan</Button>
                  <Button variant="outline">Cancel Subscription</Button>
                </div>
              </div>

              <h6 className="font-semibold text-sm mt-6 mb-3">Payment Method</h6>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-defaultBorder">
                <Icon icon="solar:card-bold-duotone" width={28} className="text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs opacity-60">Expires 08/2027</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </DemoBlock>

            <DemoBlock title="Billing History">
              <div className="space-y-2">
                {["Jun 2024","May 2024","Apr 2024","Mar 2024"].map((m) => (
                  <div key={m} className="flex items-center justify-between p-2 rounded-lg hover:bg-lightgray/60 dark:hover:bg-dark/30">
                    <div>
                      <p className="text-sm font-medium">{m}</p>
                      <p className="text-xs opacity-60">$29.00 · Paid</p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Icon icon="solar:download-minimalistic-bold" width={16} /></Button>
                  </div>
                ))}
              </div>
            </DemoBlock>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default AccountSettingPage;
