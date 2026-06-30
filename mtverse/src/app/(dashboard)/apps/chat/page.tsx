"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, ArrowLeft,
  CheckCheck, Check, Pin, MessageSquare, Users, Bot, Star, Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Msg = { id: number; from: "me" | "them"; text: string; time: string; status?: "sent" | "delivered" | "read" };
type Conv = {
  id: number; name: string; initials: string; color: string; online: boolean;
  pinned?: boolean; unread?: number; lastMessage: string; lastTime: string;
  role: string; phone: string; email: string; company: string;
  shared: { name: string; size: string }[];
  messages: Msg[];
};

const initialConvs: Conv[] = [
  {
    id: 1, name: "Sarah Chen", initials: "SC", color: "bg-rose-500/15 text-rose-600", online: true,
    pinned: true, unread: 2, lastMessage: "Sounds good — I'll send the wireframes by EOD.", lastTime: "2m",
    role: "Product Designer", phone: "+1 (415) 555-0142", email: "sarah@designstudio.co", company: "Design Studio",
    shared: [{ name: "Dashboard-v3.fig", size: "8.2 MB" }, { name: "Components.zip", size: "2.4 MB" }],
    messages: [
      { id: 1, from: "them", text: "Morning! Did you get a chance to review the latest mockups?", time: "09:14", status: "read" },
      { id: 2, from: "me", text: "Just opened them — the new sidebar layout is amazing. Love how the icons collapse.", time: "09:18", status: "read" },
      { id: 3, from: "them", text: "Thanks! Took a few iterations to get the proportions right.", time: "09:19", status: "read" },
      { id: 4, from: "them", text: "Should I prep a dev handoff doc?", time: "09:19", status: "read" },
      { id: 5, from: "me", text: "Yes please. Also include the spacing tokens we discussed.", time: "09:22", status: "read" },
      { id: 6, from: "them", text: "Sounds good — I'll send the wireframes by EOD.", time: "09:24", status: "delivered" },
    ],
  },
  {
    id: 2, name: "Marcus Holloway", initials: "MH", color: "bg-emerald-500/15 text-emerald-600", online: true,
    unread: 0, lastMessage: "Pushed the auth refactor to staging.", lastTime: "14m",
    role: "Staff Engineer", phone: "+1 (415) 555-0177", email: "marcus@mtverse.io", company: "MTVerse",
    shared: [{ name: "auth-refactor.diff", size: "42 KB" }],
    messages: [
      { id: 1, from: "me", text: "Hey, are we still on for the 1:1 at 3?", time: "13:40", status: "read" },
      { id: 2, from: "them", text: "Yep, see you then.", time: "13:42", status: "read" },
      { id: 3, from: "them", text: "Pushed the auth refactor to staging.", time: "13:50", status: "read" },
    ],
  },
  {
    id: 3, name: "Engineering Channel", initials: "EN", color: "bg-violet-500/15 text-violet-600", online: false,
    unread: 12, lastMessage: "Build #4291 passed all tests", lastTime: "1h",
    role: "12 members", phone: "", email: "eng@mtverse.io", company: "MTVerse",
    shared: [],
    messages: [
      { id: 1, from: "them", text: "Reminder: deploy freeze starts at 5pm today.", time: "12:30", status: "read" },
      { id: 2, from: "them", text: "Build #4291 passed all tests", time: "12:58", status: "read" },
    ],
  },
  {
    id: 4, name: "Priya Sharma", initials: "PS", color: "bg-amber-500/15 text-amber-600", online: false,
    unread: 0, lastMessage: "Thanks for the quick turnaround!", lastTime: "3h",
    role: "Account Manager", phone: "+1 (212) 555-0193", email: "priya@acme.co", company: "Acme Corp",
    shared: [],
    messages: [
      { id: 1, from: "me", text: "The proposal is attached — let me know if you need changes.", time: "10:05", status: "read" },
      { id: 2, from: "them", text: "Thanks for the quick turnaround!", time: "10:12", status: "read" },
    ],
  },
  {
    id: 5, name: "Jordan Reyes", initials: "JR", color: "bg-sky-500/15 text-sky-600", online: true,
    unread: 0, lastMessage: "Can we push the launch to next Tuesday?", lastTime: "1d",
    role: "Marketing Lead", phone: "+1 (646) 555-0118", email: "jordan@mtverse.io", company: "MTVerse",
    shared: [{ name: "Launch-Plan.pdf", size: "1.8 MB" }],
    messages: [
      { id: 1, from: "them", text: "Can we push the launch to next Tuesday?", time: "Yesterday", status: "read" },
    ],
  },
  {
    id: 6, name: "Lena Park", initials: "LP", color: "bg-fuchsia-500/15 text-fuchsia-600", online: false,
    unread: 0, lastMessage: "You: Perfect, talk then.", lastTime: "2d",
    role: "UX Researcher", phone: "+1 (310) 555-0124", email: "lena@researchlab.io", company: "Research Lab",
    shared: [],
    messages: [
      { id: 1, from: "me", text: "Perfect, talk then.", time: "Mon", status: "read" },
    ],
  },
];

export default function ChatApp() {
  const [convs, setConvs] = useState<Conv[]>(initialConvs);
  const [activeId, setActiveId] = useState<number>(1);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = convs.find((c) => c.id === activeId)!;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeId, active.messages.length]);

  const filtered = convs.filter((c) => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (tab === "unread" && !c.unread) return false;
    if (tab === "groups" && !c.role.includes("members")) return false;
    return true;
  });

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    setConvs((prev) => prev.map((c) => c.id === activeId
      ? { ...c, messages: [...c.messages, { id: Date.now(), from: "me", text, time: now, status: "sent" }], lastMessage: `You: ${text}`, lastTime: "now", unread: 0 }
      : c));
    setDraft("");
    toast.message("Message sent", { description: `To ${active.name}` });
  };

  const openConv = (id: number) => {
    setActiveId(id);
    setConvs((prev) => prev.map((c) => c.id === id ? { ...c, unread: 0 } : c));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="Real-time team and customer conversations."
        breadcrumbs={[{ label: "Apps" }, { label: "Chat" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Pin className="size-4 mr-2" /> Pinned</Button>
            <Button size="sm" className="h-9"><MessageSquare className="size-4 mr-2" /> New Chat</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-4 h-[calc(100vh-220px)] min-h-[560px]">
        {/* Left: Conversation list */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-3 border-b border-border space-y-3">
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search messages…" className="pl-9 h-9" />
            </div>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid grid-cols-3 h-8 w-full">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                <TabsTrigger value="groups" className="text-xs">Groups</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-1.5">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => openConv(c.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors mb-0.5 ${activeId === c.id ? "bg-accent" : "hover:bg-accent/50"}`}
                >
                  <div className="relative shrink-0">
                    <Avatar className="size-10"><AvatarFallback className={`text-xs font-semibold ${c.color}`}>{c.initials}</AvatarFallback></Avatar>
                    {c.online && <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success border-2 border-card" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{c.lastTime}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground truncate">{c.lastMessage}</span>
                      {c.unread ? <Badge className="bg-primary text-primary-foreground text-[10px] h-4 min-w-4 px-1 justify-center">{c.unread}</Badge> : null}
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && <p className="text-xs text-muted-foreground text-center py-8">No conversations</p>}
            </div>
          </ScrollArea>
        </div>

        {/* Center: Chat thread */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="size-8 lg:hidden"><ArrowLeft className="size-4" /></Button>
              <div className="relative">
                <Avatar className="size-9"><AvatarFallback className={`text-xs font-semibold ${active.color}`}>{active.initials}</AvatarFallback></Avatar>
                {active.online && <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-success border-2 border-card" />}
              </div>
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-[11px] text-muted-foreground">{active.online ? "Active now" : "Last seen 2h ago"} · {active.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="size-9 text-muted-foreground" onClick={() => toast.info("Voice call started")}><Phone className="size-4" /></Button>
              <Button variant="ghost" size="icon" className="size-9 text-muted-foreground" onClick={() => toast.info("Video call started")}><Video className="size-4" /></Button>
              <Button variant="ghost" size="icon" className="size-9 text-muted-foreground" onClick={() => setShowInfo((v) => !v)}><MoreVertical className="size-4" /></Button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
            <div className="flex justify-center"><Badge variant="outline" className="bg-background text-[10px] text-muted-foreground">Today</Badge></div>
            {active.messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end gap-2 max-w-[78%] ${m.from === "me" ? "flex-row-reverse" : ""}`}>
                  {m.from === "them" && <Avatar className="size-7 shrink-0"><AvatarFallback className={`text-[10px] font-semibold ${active.color}`}>{active.initials}</AvatarFallback></Avatar>}
                  <div>
                    <div className={`px-3.5 py-2 rounded-2xl text-sm ${m.from === "me" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-background border border-border rounded-bl-sm"}`}>
                      {m.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 text-[10px] text-muted-foreground ${m.from === "me" ? "justify-end" : ""}`}>
                      <span>{m.time}</span>
                      {m.from === "me" && (m.status === "read" ? <CheckCheck className="size-3 text-sky-500" /> : m.status === "delivered" ? <CheckCheck className="size-3" /> : <Check className="size-3" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 bg-background rounded-lg border border-border px-2 focus-within:ring-2 focus-within:ring-ring/30">
              <Button variant="ghost" size="icon" className="size-9 text-muted-foreground shrink-0"><Paperclip className="size-4" /></Button>
              <Input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Type a message…" className="border-0 shadow-none focus-visible:ring-0 h-11" />
              <Button variant="ghost" size="icon" className="size-9 text-muted-foreground shrink-0"><Smile className="size-4" /></Button>
              <Button size="icon" className="size-9 shrink-0" onClick={send} disabled={!draft.trim()}><Send className="size-4" /></Button>
            </div>
          </div>
        </div>

        {/* Right: Contact info */}
        {showInfo && (
          <div className="hidden lg:flex flex-col rounded-xl border border-border bg-card overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="p-5 flex flex-col items-center text-center border-b border-border">
                <Avatar className="size-16 mb-3"><AvatarFallback className={`text-lg font-semibold ${active.color}`}>{active.initials}</AvatarFallback></Avatar>
                <p className="text-base font-semibold">{active.name}</p>
                <p className="text-xs text-muted-foreground">{active.role}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="outline" size="icon" className="size-9" onClick={() => toast.info("Voice call started")}><Phone className="size-4" /></Button>
                  <Button variant="outline" size="icon" className="size-9" onClick={() => toast.info("Video call started")}><Video className="size-4" /></Button>
                  <Button variant="outline" size="icon" className="size-9" onClick={() => toast.message("Starred")}><Star className="size-4" /></Button>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Contact</p>
                  {active.email && <div className="flex items-center gap-2 text-xs"><span className="text-muted-foreground w-12">Email</span><span className="font-medium">{active.email}</span></div>}
                  {active.phone && <div className="flex items-center gap-2 text-xs"><span className="text-muted-foreground w-12">Phone</span><span className="font-medium">{active.phone}</span></div>}
                  <div className="flex items-center gap-2 text-xs"><span className="text-muted-foreground w-12">Company</span><span className="font-medium">{active.company}</span></div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Shared Files</p>
                    <Badge variant="outline" className="text-[10px]">{active.shared.length}</Badge>
                  </div>
                  {active.shared.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-2">No shared files yet</p>
                  ) : active.shared.map((f) => (
                    <div key={f.name} className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                      <div className="size-8 rounded-md bg-primary/10 text-primary flex items-center justify-center"><ImageIcon className="size-4" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{f.name}</p>
                        <p className="text-[10px] text-muted-foreground">{f.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Quick Actions</p>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => toast.message("Muted notifications")}><Bot className="size-4 mr-2" /> Mute notifications</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => toast.message("Added to favorites")}><Star className="size-4 mr-2" /> Add to favorites</Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => toast.message("Exporting conversation")}><Users className="size-4 mr-2" /> Create group</Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
