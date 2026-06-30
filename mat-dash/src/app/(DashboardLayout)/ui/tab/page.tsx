"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const TabPage = () => {
  return (
    <PageContainer
      title="Tab"
      description="Switch between views within the same context. Supports underline, pill, and vertical variants."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Default Tabs">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-4">
              <p className="text-sm opacity-80">Manage your account settings including username, email, and password. Changes apply immediately across all sessions.</p>
            </TabsContent>
            <TabsContent value="password" className="mt-4">
              <p className="text-sm opacity-80">Update your password regularly to keep your account secure. We recommend at least 12 characters with a mix of letters, numbers, and symbols.</p>
            </TabsContent>
            <TabsContent value="team" className="mt-4">
              <p className="text-sm opacity-80">Invite teammates and manage their roles. Free plan allows up to 3 members; upgrade for unlimited seats.</p>
            </TabsContent>
          </Tabs>
        </DemoBlock>

        <DemoBlock title="Pill Tabs" description="Rounded style">
          <Tabs defaultValue="overview">
            <TabsList className="bg-lightgray dark:bg-dark p-1">
              <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">Analytics</TabsTrigger>
              <TabsTrigger value="reports" className="rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-3 gap-3">
                {[{l:"Revenue",v:"$48.2k"},{l:"Users",v:"12,543"},{l:"Churn",v:"2.1%"}].map((s) => (
                  <div key={s.l} className="rounded-lg bg-lightgray dark:bg-dark p-3 text-center">
                    <p className="text-xs opacity-70">{s.l}</p>
                    <p className="font-bold text-lg mt-1">{s.v}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <p className="text-sm opacity-80">Detailed analytics dashboard with traffic sources, conversion funnels, and cohort retention.</p>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <p className="text-sm opacity-80">Schedule and export PDF/CSV reports for stakeholders.</p>
            </TabsContent>
          </Tabs>
        </DemoBlock>

        <DemoBlock title="With Icons">
          <Tabs defaultValue="dashboard">
            <TabsList>
              <TabsTrigger value="dashboard" className="gap-1.5"><Icon icon="solar:widget-4-bold-duotone" width={16} /> Dashboard</TabsTrigger>
              <TabsTrigger value="users" className="gap-1.5"><Icon icon="solar:users-group-rounded-bold-duotone" width={16} /> Users</TabsTrigger>
              <TabsTrigger value="settings" className="gap-1.5"><Icon icon="solar:settings-bold-duotone" width={16} /> Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="mt-4"><p className="text-sm opacity-80">Main dashboard content goes here.</p></TabsContent>
            <TabsContent value="users" className="mt-4"><p className="text-sm opacity-80">User management interface.</p></TabsContent>
            <TabsContent value="settings" className="mt-4"><p className="text-sm opacity-80">System configuration and preferences.</p></TabsContent>
          </Tabs>
        </DemoBlock>

        <DemoBlock title="With Badge Counters">
          <Tabs defaultValue="inbox">
            <TabsList>
              <TabsTrigger value="inbox" className="gap-2">Inbox <Badge variant="lightPrimary" className="ml-1">12</Badge></TabsTrigger>
              <TabsTrigger value="sent" className="gap-2">Sent</TabsTrigger>
              <TabsTrigger value="drafts" className="gap-2">Drafts <Badge variant="lightWarning" className="ml-1">3</Badge></TabsTrigger>
              <TabsTrigger value="spam" className="gap-2">Spam <Badge variant="lightError" className="ml-1">42</Badge></TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="mt-4">
              <div className="space-y-2">
                {["Important update about your account","Weekly newsletter digest","New login from Mumbai, India"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-lightgray dark:hover:bg-dark">
                    <Avatar className="h-9 w-9"><AvatarImage src={`/images/profile/user-${i+4}.jpg`} /><AvatarFallback>U</AvatarFallback></Avatar>
                    <div className="flex-1"><p className="text-sm font-medium">{t}</p><p className="text-xs opacity-60">2 hours ago</p></div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="sent" className="mt-4"><p className="text-sm opacity-80">No sent items.</p></TabsContent>
            <TabsContent value="drafts" className="mt-4"><p className="text-sm opacity-80">3 drafts in progress.</p></TabsContent>
            <TabsContent value="spam" className="mt-4"><p className="text-sm opacity-80">42 spam messages flagged.</p></TabsContent>
          </Tabs>
        </DemoBlock>

        <DemoBlock title="Vertical Tabs" className="lg:col-span-2">
          <Tabs defaultValue="profile" orientation="vertical" className="flex gap-6">
            <TabsList className="flex-col h-auto bg-transparent border-r border-defaultBorder pr-4">
              <TabsTrigger value="profile" className="w-full justify-start">Profile</TabsTrigger>
              <TabsTrigger value="security" className="w-full justify-start">Security</TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start">Notifications</TabsTrigger>
              <TabsTrigger value="billing" className="w-full justify-start">Billing</TabsTrigger>
              <TabsTrigger value="integrations" className="w-full justify-start">Integrations</TabsTrigger>
            </TabsList>
            <div className="flex-1">
              <TabsContent value="profile"><p className="text-sm opacity-80">Edit your profile information: name, avatar, bio, and contact details.</p></TabsContent>
              <TabsContent value="security"><p className="text-sm opacity-80">Two-factor authentication, password rotation, and active sessions.</p></TabsContent>
              <TabsContent value="notifications"><p className="text-sm opacity-80">Choose what you get notified about and how — email, push, SMS, or Slack.</p></TabsContent>
              <TabsContent value="billing"><p className="text-sm opacity-80">Manage your subscription, payment methods, and download invoices.</p></TabsContent>
              <TabsContent value="integrations"><p className="text-sm opacity-80">Connect mtverse with Slack, Notion, Zapier, and 50+ other apps.</p></TabsContent>
            </div>
          </Tabs>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default TabPage;
