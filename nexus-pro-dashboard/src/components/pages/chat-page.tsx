import * as React from "react";
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Smile, Plus, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";

const conversations = [
  { name: "Sarah Chen", last: "Sounds great! Let's ship it now", time: "2m", unread: 2, avatar: "https://i.pravatar.cc/40?img=1", online: true },
  { name: "Design Team", last: "Marcus: Updated the mockups", time: "8m", unread: 5, avatar: "https://i.pravatar.cc/40?img=2", online: false, group: true },
  { name: "Riya Patel", last: "Can you review the PR?", time: "1h", unread: 0, avatar: "https://i.pravatar.cc/40?img=3", online: true },
  { name: "Engineering", last: "John: Deploy is complete", time: "2h", unread: 0, avatar: "https://i.pravatar.cc/40?img=4", online: false, group: true },
  { name: "Mark Park", last: "Thanks for the help!", time: "5h", unread: 0, avatar: "https://i.pravatar.cc/40?img=5", online: false },
  { name: "Nora Lee", last: "See you at the meeting", time: "Yesterday", unread: 0, avatar: "https://i.pravatar.cc/40?img=6", online: true },
];

const messages = [
  { id: 1, sender: "Sarah Chen", avatar: "https://i.pravatar.cc/40?img=1", text: "Hey Alex! Did you get a chance to look at the new dashboard design?", time: "10:24 AM", me: false },
  { id: 2, sender: "me", avatar: "https://i.pravatar.cc/40?img=12", text: "Yes, just reviewed it. The KPI cards look amazing ", time: "10:26 AM", me: true },
  { id: 3, sender: "Sarah Chen", avatar: "https://i.pravatar.cc/40?img=1", text: "Glad you like it! I spent extra time on the animations. Want me to push the changes to staging?", time: "10:27 AM", me: false },
  { id: 4, sender: "me", avatar: "https://i.pravatar.cc/40?img=12", text: "Yes please. Also, can you add a dark mode variant for the chart cards?", time: "10:30 AM", me: true },
  { id: 5, sender: "Sarah Chen", avatar: "https://i.pravatar.cc/40?img=1", text: "Already on it! I'll have it ready by EOD.", time: "10:31 AM", me: false },
  { id: 6, sender: "Sarah Chen", avatar: "https://i.pravatar.cc/40?img=1", text: "Sounds great! Let's ship it now", time: "10:32 AM", me: false },
];

export function ChatPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "Chat"]}
        title="Messages"
        description="Real-time messaging with your team and clients."
        actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Chat</Button>}
      />
      <Card className="grid h-[calc(100vh-220px)] grid-cols-1 overflow-hidden p-0 md:grid-cols-3">
        {/* Conversations list */}
        <div className="flex flex-col border-r border-border">
          <div className="border-b border-border p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c, i) => (
              <button key={i} className={`flex w-full items-center gap-3 border-b border-border/50 p-3 text-left transition hover:bg-gray-100 dark:bg-gray-800/30 ${i === 0 ? "bg-gray-100 dark:bg-gray-800/50" : ""}`}>
                <div className="relative">
                  <Avatar className="h-10 w-10"><AvatarImage src={c.avatar} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
                  {c.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-success-500" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">{c.name}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{c.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">{c.last}</p>
                    {c.unread > 0 && (
                      <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">{c.unread}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="col-span-2 flex flex-col">
          <div className="flex items-center gap-3 border-b border-border p-3">
            <Avatar className="h-9 w-9"><AvatarImage src="https://i.pravatar.cc/40?img=1" /><AvatarFallback>SC</AvatarFallback></Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Sarah Chen</p>
              <p className="flex items-center gap-1 text-xs text-success-600 dark:text-success-500"><span className="h-1.5 w-1.5 rounded-full bg-success-500" /> Active now</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Video className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-gray-100 dark:bg-gray-800/20 p-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.me ? "flex-row-reverse" : ""}`}>
                {!m.me && <Avatar className="h-7 w-7"><AvatarImage src={m.avatar} /><AvatarFallback>{m.sender[0]}</AvatarFallback></Avatar>}
                <div className={`max-w-[70%] ${m.me ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`rounded-2xl px-3.5 py-2 text-sm ${m.me ? "rounded-br-sm bg-brand-500 text-white" : "rounded-bl-sm bg-white dark:bg-white/[0.03] border border-border"}`}>
                    {m.text}
                  </div>
                  <span className="mt-1 px-2 text-[10px] text-gray-500 dark:text-gray-400">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9"><Paperclip className="h-4 w-4" /></Button>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button variant="ghost" size="icon" className="h-9 w-9"><Smile className="h-4 w-4" /></Button>
              <Button size="icon" className="h-9 w-9"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
