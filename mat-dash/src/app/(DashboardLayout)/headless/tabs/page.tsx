"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const HeadlessTabsPage = () => (
  <PageContainer title="Headless Tabs" description="Accessible tab components with keyboard arrow navigation.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Basic Tabs">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 p-4 rounded-lg bg-lightgray dark:bg-dark text-sm">Overview content — use arrow keys to switch tabs.</TabsContent>
          <TabsContent value="activity" className="mt-4 p-4 rounded-lg bg-lightgray dark:bg-dark text-sm">Activity feed content.</TabsContent>
          <TabsContent value="settings" className="mt-4 p-4 rounded-lg bg-lightgray dark:bg-dark text-sm">Settings configuration.</TabsContent>
        </Tabs>
      </DemoBlock>

      <DemoBlock title="Tabs with Badges">
        <Tabs defaultValue="inbox">
          <TabsList>
            <TabsTrigger value="inbox" className="gap-2">Inbox <Badge variant="lightPrimary" className="text-[10px]">12</Badge></TabsTrigger>
            <TabsTrigger value="sent" className="gap-2">Sent</TabsTrigger>
            <TabsTrigger value="drafts" className="gap-2">Drafts <Badge variant="lightWarning" className="text-[10px]">3</Badge></TabsTrigger>
          </TabsList>
          <TabsContent value="inbox" className="mt-4 text-sm opacity-70">You have 12 unread messages.</TabsContent>
          <TabsContent value="sent" className="mt-4 text-sm opacity-70">No sent items.</TabsContent>
          <TabsContent value="drafts" className="mt-4 text-sm opacity-70">3 drafts in progress.</TabsContent>
        </Tabs>
      </DemoBlock>

      <DemoBlock title="Icon Tabs" className="lg:col-span-2">
        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard" className="gap-1.5"><Icon icon="solar:widget-bold-duotone" width={16} /> Dashboard</TabsTrigger>
            <TabsTrigger value="users" className="gap-1.5"><Icon icon="solar:users-group-rounded-bold-duotone" width={16} /> Users</TabsTrigger>
            <TabsTrigger value="chart" className="gap-1.5"><Icon icon="solar:chart-bold-duotone" width={16} /> Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5"><Icon icon="solar:settings-bold-duotone" width={16} /> Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-4 p-4 rounded-lg bg-lightgray dark:bg-dark text-sm">Dashboard content with metrics.</TabsContent>
          <TabsContent value="users" className="mt-4 p-4 rounded-lg bg-lightgray dark:bg-dark text-sm">User management.</TabsContent>
          <TabsContent value="chart" className="mt-4 p-4 rounded-lg bg-lightgray dark:bg-dark text-sm">Analytics and reports.</TabsContent>
          <TabsContent value="settings" className="mt-4 p-4 rounded-lg bg-lightgray dark:bg-dark text-sm">System settings.</TabsContent>
        </Tabs>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default HeadlessTabsPage;
