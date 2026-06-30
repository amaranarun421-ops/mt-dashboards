"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const friends = [
  { name: "Sarah Johnson", img: 4, status: "online", lastSeen: "Active now" },
  { name: "Michael Chen", img: 5, status: "online", lastSeen: "Active now" },
  { name: "Emily Rodriguez", img: 6, status: "away", lastSeen: "Away · 1h" },
  { name: "David Park", img: 7, status: "offline", lastSeen: "Last seen 2h ago" },
  { name: "Lisa Anderson", img: 8, status: "online", lastSeen: "Active now" },
  { name: "James Wilson", img: 9, status: "offline", lastSeen: "Last seen yesterday" },
  { name: "Priya Patel", img: 10, status: "online", lastSeen: "Active now" },
  { name: "Tom Anderson", img: 1, status: "away", lastSeen: "Away · 30m" },
];

const statusColor: Record<string, string> = { online: "bg-success", away: "bg-warning", offline: "bg-gray-400" };

const FriendsPage = () => {
  return (
    <PageContainer
      title="Friends"
      description="Your connections. Chat, call, or manage friendship from here."
    >
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Friends ({friends.length})</TabsTrigger>
          <TabsTrigger value="online">Online ({friends.filter(f => f.status === "online").length})</TabsTrigger>
          <TabsTrigger value="offline">Offline ({friends.filter(f => f.status !== "online").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {friends.map((f) => <FriendCard key={f.name} {...f} />)}
          </div>
        </TabsContent>
        <TabsContent value="online" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {friends.filter(f => f.status === "online").map((f) => <FriendCard key={f.name} {...f} />)}
          </div>
        </TabsContent>
        <TabsContent value="offline" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {friends.filter(f => f.status !== "online").map((f) => <FriendCard key={f.name} {...f} />)}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

const FriendCard = ({ name, img, status, lastSeen }: { name: string; img: number; status: string; lastSeen: string }) => (
  <DemoBlock title="">
    <div className="flex items-center gap-4 -mt-2">
      <div className="relative">
        <Avatar className="h-14 w-14"><AvatarImage src={`/images/profile/user-${img}.jpg`} /><AvatarFallback>{name[0]}</AvatarFallback></Avatar>
        <span className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full ${statusColor[status]} ring-2 ring-background`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{name}</p>
        <p className="text-xs opacity-70">{lastSeen}</p>
      </div>
      <div className="flex gap-1">
        <Button size="icon" variant="ghost" className="h-9 w-9 hover:bg-lightprimary hover:text-primary"><Icon icon="solar:chat-round-dots-bold" width={16} /></Button>
        <Button size="icon" variant="ghost" className="h-9 w-9 hover:bg-lighterror hover:text-error"><Icon icon="solar:user-minus-rounded-bold" width={16} /></Button>
      </div>
    </div>
  </DemoBlock>
);

export default FriendsPage;
