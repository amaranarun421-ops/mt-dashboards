"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import SimpleBar from "simplebar-react";

type Msg = { id: number; fromMe: boolean; text: string; time: string };
type Contact = { id: number; name: string; img: number; lastMsg: string; time: string; unread?: number; online?: boolean };

const contacts: Contact[] = [
  { id: 1, name: "Sarah Johnson", img: 4, lastMsg: "Sure, I'll send the file shortly", time: "2 min", unread: 2, online: true },
  { id: 2, name: "Michael Chen", img: 5, lastMsg: "Did you see the new design?", time: "15 min", online: true },
  { id: 3, name: "Emily Rodriguez", img: 6, lastMsg: "Thanks for the update!", time: "1 hour", unread: 1, online: false },
  { id: 4, name: "David Park", img: 7, lastMsg: "Meeting at 3 PM tomorrow", time: "3 hours", online: true },
  { id: 5, name: "Lisa Anderson", img: 8, lastMsg: "I've reviewed the proposal", time: "Yesterday", online: false },
  { id: 6, name: "James Wilson", img: 9, lastMsg: "Sounds great!", time: "2 days", online: false },
];

const initialMessages: Msg[] = [
  { id: 1, fromMe: false, text: "Hey! Are you available for a quick chat about the project?", time: "10:30 AM" },
  { id: 2, fromMe: true, text: "Hi Sarah! Yes, sure. What's up?", time: "10:32 AM" },
  { id: 3, fromMe: false, text: "I wanted to discuss the new dashboard design. I've made some updates.", time: "10:33 AM" },
  { id: 4, fromMe: true, text: "That sounds great! Can you share the file?", time: "10:35 AM" },
  { id: 5, fromMe: false, text: "Sure, I'll send the file shortly", time: "10:36 AM" },
];

const ChatsPage = () => {
  const [active, setActive] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), fromMe: true, text: input, time: "Now" }]);
    setInput("");
  };

  const activeContact = contacts.find((c) => c.id === active)!;

  return (
    <PageContainer title="Chats" description="Real-time messaging interface with contacts list and conversation panel.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 h-[calc(100vh-220px)] rounded-xl overflow-hidden border border-defaultBorder bg-background">
        {/* Contacts list */}
        <div className="border-r border-defaultBorder flex flex-col">
          <div className="p-4 border-b border-defaultBorder">
            <div className="relative">
              <Icon icon="solar:magnifer-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <Input placeholder="Search chats..." className="pl-9 h-9" />
            </div>
          </div>
          <SimpleBar className="flex-1">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`w-full p-3 flex items-center gap-3 hover:bg-lightprimary/40 text-left transition-colors ${active === c.id ? "bg-lightprimary" : ""}`}
              >
                <div className="relative">
                  <Avatar className="h-11 w-11"><AvatarImage src={`/images/profile/user-${c.img}.jpg`} /><AvatarFallback>{c.name[0]}</AvatarFallback></Avatar>
                  {c.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-background" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <span className="text-xs opacity-60 shrink-0 ml-2">{c.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs opacity-70 truncate">{c.lastMsg}</p>
                    {c.unread && <Badge variant="error" className="ml-2 h-5 min-w-5 px-1 text-[10px]">{c.unread}</Badge>}
                  </div>
                </div>
              </button>
            ))}
          </SimpleBar>
        </div>

        {/* Conversation */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="p-4 border-b border-defaultBorder flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10"><AvatarImage src={`/images/profile/user-${activeContact.img}.jpg`} /><AvatarFallback>{activeContact.name[0]}</AvatarFallback></Avatar>
                {activeContact.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background" />}
              </div>
              <div>
                <p className="font-semibold text-sm">{activeContact.name}</p>
                <p className="text-xs opacity-70">{activeContact.online ? "Online" : "Last seen 2h ago"}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="h-9 w-9"><Icon icon="solar:phone-bold" width={18} /></Button>
              <Button size="icon" variant="ghost" className="h-9 w-9"><Icon icon="solar:videocamera-bold" width={18} /></Button>
              <Button size="icon" variant="ghost" className="h-9 w-9"><Icon icon="solar:menu-dots-bold" width={18} /></Button>
            </div>
          </div>

          <SimpleBar className="flex-1 p-4 space-y-3 bg-lightgray/30 dark:bg-dark/20">
            <p className="text-center text-xs opacity-60 py-2">Today</p>
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] ${m.fromMe ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`rounded-2xl px-4 py-2 ${m.fromMe ? "bg-primary text-white rounded-br-md" : "bg-background rounded-bl-md border border-defaultBorder"}`}>
                    <p className="text-sm">{m.text}</p>
                  </div>
                  <span className="text-xs opacity-60 mt-1 px-1">{m.time}</span>
                </div>
              </div>
            ))}
          </SimpleBar>

          <div className="p-3 border-t border-defaultBorder flex items-center gap-2">
            <Button size="icon" variant="ghost" className="h-9 w-9 shrink-0"><Icon icon="solar:gallery-bold-duotone" width={20} /></Button>
            <Button size="icon" variant="ghost" className="h-9 w-9 shrink-0"><Icon icon="solar:paperclip-bold-duotone" width={20} /></Button>
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1"
            />
            <Button size="icon" className="h-9 w-9 shrink-0" onClick={send}><Icon icon="solar:plain-2-bold" width={18} /></Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ChatsPage;
