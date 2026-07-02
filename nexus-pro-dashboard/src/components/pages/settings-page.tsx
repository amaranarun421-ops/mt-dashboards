import * as React from "react";
import { User, Bell, Shield, CreditCard, Palette, Globe, Database, Plug } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SettingsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["Account", "Settings"]} title="Settings" description="Manage your account, preferences, and integrations." />
      <Tabs defaultValue="profile">
        <TabsList className="mb-4 flex flex-wrap h-auto">
          <TabsTrigger value="profile" className="gap-1.5"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5"><Palette className="h-4 w-4" /> Appearance</TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Profile Information</h3>
            <div className="mb-6 flex items-center gap-4">
              <Avatar className="h-16 w-16"><AvatarImage src="https://i.pravatar.cc/80?img=12" /><AvatarFallback>AK</AvatarFallback></Avatar>
              <div>
                <Button variant="outline" size="sm">Change Avatar</Button>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">JPG, PNG or GIF. 1MB max.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div><Label>First Name</Label><Input defaultValue="Alex" className="mt-1.5" /></div>
              <div><Label>Last Name</Label><Input defaultValue="Kim" className="mt-1.5" /></div>
              <div><Label>Email</Label><Input defaultValue="alex@nexuspro.app" className="mt-1.5" /></div>
              <div><Label>Phone</Label><Input defaultValue="+1 (555) 012-3456" className="mt-1.5" /></div>
              <div className="sm:col-span-2">
                <Label>Bio</Label>
                <textarea className="mt-1.5 w-full rounded-md border border-input bg-gray-50 dark:bg-gray-900 px-3 py-2 text-sm" rows={3} defaultValue="Senior Product Engineer passionate about building delightful experiences." />
              </div>
              <div><Label>Timezone</Label>
                <Select defaultValue="pst"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                  <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                </SelectContent></Select>
              </div>
              <div><Label>Language</Label>
                <Select defaultValue="en"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent></Select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Notification Preferences</h3>
            <div className="space-y-1">
              {[
                { title: "Email notifications", desc: "Receive emails about your account activity.", on: true },
                { title: "Push notifications", desc: "Get real-time alerts in your browser.", on: true },
                { title: "Weekly digest", desc: "A summary of your activity every Monday.", on: true },
                { title: "Product updates", desc: "News about new features and improvements.", on: false },
                { title: "Security alerts", desc: "Critical security-related notifications.", on: true },
                { title: "Marketing emails", desc: "Tips, offers, and product launches.", on: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border/50 py-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{s.desc}</p>
                  </div>
                  <Switch defaultChecked={s.on} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Security Settings</h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-semibold">Password</p><p className="text-xs text-gray-500 dark:text-gray-400">Last changed 3 months ago</p></div>
                  <Button variant="outline" size="sm">Change Password</Button>
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-semibold">Two-Factor Authentication</p><p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</p></div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="mb-3 text-sm font-semibold">Active Sessions</p>
                <div className="space-y-2">
                  {[
                    { device: "MacBook Pro · Chrome", location: "San Francisco, CA", current: true },
                    { device: "iPhone 15 · Safari", location: "San Francisco, CA", current: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between rounded-md bg-gray-100 dark:bg-gray-800/30 p-2.5 text-sm">
                      <div><p className="font-medium">{s.device}</p><p className="text-xs text-gray-500 dark:text-gray-400">{s.location}</p></div>
                      {s.current ? <span className="rounded bg-success-500/15 px-2 py-0.5 text-xs font-semibold text-success-600 dark:text-success-500">Current</span> : <Button variant="ghost" size="sm" className="text-error-600 dark:text-error-500">Revoke</Button>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Appearance</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { name: "Light", colors: ["bg-white", "bg-brand-500", "bg-gray-100 dark:bg-gray-800"], active: true },
                { name: "Dark", colors: ["bg-zinc-900", "bg-brand-500", "bg-zinc-800"], active: false },
                { name: "System", colors: ["bg-white", "bg-zinc-900", "bg-brand-500"], active: false },
              ].map((t) => (
                <button key={t.name} className={`rounded-xl border-2 p-3 text-left transition ${t.active ? "border-brand-500" : "border-border hover:border-brand-500/40"}`}>
                  <div className="mb-3 flex gap-1">
                    {t.colors.map((c, i) => <div key={i} className={`h-8 flex-1 rounded ${c}`} />)}
                  </div>
                  <p className="text-sm font-semibold">{t.name}</p>
                </button>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold">Billing & Plan</h3>
            <div className="rounded-xl border-2 border-brand-500/30 bg-gradient-to-br from-primary/5 to-transparent p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-500">Current Plan</p>
                  <p className="text-2xl font-bold">Pro Edition</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$29/month · renews on Jul 15, 2026</p>
                </div>
                <Button>Upgrade</Button>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-border p-4">
              <p className="mb-2 text-sm font-semibold">Payment Method</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-12 items-center justify-center rounded bg-zinc-900 text-[10px] font-bold text-white">VISA</div>
                <p className="text-sm">•••• •••• •••• 4242</p>
                <Button variant="outline" size="sm" className="ml-auto">Update</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
