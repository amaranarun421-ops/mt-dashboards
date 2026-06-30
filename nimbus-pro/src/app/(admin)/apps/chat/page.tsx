"use client";
import { useState } from "react";
import { PageHeader, Card, Button, IconButton, Avatar, SearchInput, Switch } from "@/components/ui";
import { CHATS, MESSAGES } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Phone, Video, MoreHorizontal, Paperclip, Smile, Send, Mic, Image as ImageIcon,
  Star, Bell, Volume2, Pin, FileText, Link as LinkIcon, Users, Plus, CheckCheck
} from "lucide-react";

const SHARED_FILES = [
  { name: "Q3-marketing-plan.pdf", size: "2.4 MB", by: "Priya Iyer", time: "2h" },
  { name: "campaign-asset.fig", size: "18.7 MB", by: "Sofia García", time: "1d" },
  { name: "team-photo.jpg", size: "6.2 MB", by: "Mira Patel", time: "3d" },
];

const SHARED_LINKS = [
  { url: "figma.com/file/nimbus-pro-v3", title: "Nimbus Pro v3 — Figma", time: "5h" },
  { url: "linear.app/nimbus/insights", title: "AI Insights board", time: "1d" },
];

export default function ChatPage() {
  const [activeChatId, setActiveChatId] = useState(CHATS[0].id);
  const [messages, setMessages] = useState(MESSAGES);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [muted, setMuted] = useState(false);

  const activeChat = CHATS.find((c) => c.id === activeChatId) ?? CHATS[0];

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), fromMe: true, text, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }) },
    ]);
    setInput("");
  };

  const filteredChats = CHATS.filter((c) =>
    !search.trim() ? true : c.name.toLowerCase().includes(search.toLowerCase()) || c.last.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Chat"
        description="Real-time messaging with your team and customers."
        breadcrumbs={[{ label: "Apps" }, { label: "Chat" }]}
        actions={
          <>
            <Button variant="secondary"><Users className="h-4 w-4" /> New group</Button>
            <Button><Plus className="h-4 w-4" /> New chat</Button>
          </>
        }
      />

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_280px]">
          {/* Conversation list */}
          <aside className="border-r border-gray-100 dark:border-gray-800">
            <div className="border-b border-gray-100 p-3 dark:border-gray-800">
              <SearchInput value={search} onChange={setSearch} placeholder="Search conversations" />
            </div>
            <div className="max-h-[680px] overflow-y-auto">
              {filteredChats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveChatId(c.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-gray-50 p-3 text-left transition-colors dark:border-gray-800/50",
                    activeChatId === c.id ? "bg-brand-50/60 dark:bg-brand-500/10" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  )}
                >
                  <div className="relative">
                    <Avatar name={c.name} size={44} />
                    {c.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-success-500 dark:border-gray-900" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{c.name}</p>
                      <span className="shrink-0 text-[11px] text-gray-400">{c.time}</span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">{c.last}</p>
                      {c.unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Chat window */}
          <section className="flex min-h-[680px] flex-col">
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar name={activeChat.name} size={40} />
                  {activeChat.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-success-500 dark:border-gray-900" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{activeChat.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activeChat.online ? "Active now" : "Last seen 2h ago"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IconButton aria-label="Call"><Phone className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Video"><Video className="h-4 w-4" /></IconButton>
                <IconButton aria-label="More"><MoreHorizontal className="h-4 w-4" /></IconButton>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50/50 p-5 dark:bg-gray-900/30">
              <div className="flex items-center justify-center">
                <span className="rounded-full bg-gray-200 px-3 py-1 text-[11px] font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-400">Today</span>
              </div>
              {messages.map((m) => (
                <div key={m.id} className={cn("flex items-end gap-2", m.fromMe && "flex-row-reverse")}>
                  {!m.fromMe && <Avatar name={activeChat.name} size={28} />}
                  <div className={cn("max-w-[75%] sm:max-w-[60%]")}>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm",
                        m.fromMe
                          ? "rounded-br-md bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-theme-sm"
                          : "rounded-bl-md bg-white text-gray-700 shadow-theme-sm dark:bg-gray-800 dark:text-gray-200"
                      )}
                    >
                      {m.text}
                    </div>
                    <div className={cn("mt-1 flex items-center gap-1 text-[10px] text-gray-400", m.fromMe && "justify-end")}>
                      <span>{m.time}</span>
                      {m.fromMe && <CheckCheck className="h-3 w-3 text-brand-500" />}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-end gap-2">
                <Avatar name={activeChat.name} size={28} />
                <div className="max-w-[60%]">
                  <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-gray-700 shadow-theme-sm dark:bg-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-end gap-2">
                <IconButton aria-label="Attach"><Paperclip className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Image"><ImageIcon className="h-4 w-4" /></IconButton>
                <div className="relative flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Type a message..."
                    rows={1}
                    className="input min-h-[42px] resize-none pr-10"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <Smile className="h-4 w-4" />
                  </button>
                </div>
                <IconButton aria-label="Voice"><Mic className="h-4 w-4" /></IconButton>
                <Button size="icon" onClick={sendMessage} aria-label="Send"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </section>

          {/* Contact info sidebar */}
          <aside className="hidden border-l border-gray-100 lg:block dark:border-gray-800">
            <div className="flex flex-col items-center border-b border-gray-100 p-5 text-center dark:border-gray-800">
              <Avatar name={activeChat.name} size={72} />
              <p className="mt-3 font-semibold text-gray-900 dark:text-white">{activeChat.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activeChat.online ? "Active now" : "Last seen 2h ago"}
              </p>
              <div className="mt-3 flex gap-2">
                <IconButton aria-label="Call"><Phone className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Video"><Video className="h-4 w-4" /></IconButton>
                <IconButton aria-label="Star"><Star className="h-4 w-4" /></IconButton>
              </div>
            </div>

            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Contact info</p>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-xs text-gray-500">Email</dt>
                  <dd className="text-gray-700 dark:text-gray-300">{activeChat.name.toLowerCase().replace(" ", ".")}@nimbuspro.io</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Role</dt>
                  <dd className="text-gray-700 dark:text-gray-300">Senior Product Designer</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-500">Timezone</dt>
                  <dd className="text-gray-700 dark:text-gray-300">IST (UTC+5:30)</dd>
                </div>
              </dl>
            </div>

            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Shared files</p>
                <button className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">View all</button>
              </div>
              <div className="space-y-2">
                {SHARED_FILES.map((f) => (
                  <div key={f.name} className="flex items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{f.name}</p>
                      <p className="text-[10px] text-gray-500">{f.size} · {f.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-100 p-4 dark:border-gray-800">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Shared links</p>
              <div className="space-y-2">
                {SHARED_LINKS.map((l) => (
                  <a key={l.url} className="flex items-center gap-2.5 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <LinkIcon className="h-4 w-4 shrink-0 text-gray-400" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-gray-900 dark:text-white">{l.title}</p>
                      <p className="truncate text-[10px] text-gray-500">{l.url}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Notification settings</p>
              {[
                { icon: Bell, label: "Mute notifications", checked: muted, onChange: setMuted },
                { icon: Volume2, label: "Message sounds", checked: true, onChange: () => {} },
                { icon: Pin, label: "Pin to top", checked: true, onChange: () => {} },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <s.icon className="h-3.5 w-3.5 text-gray-400" /> {s.label}
                  </span>
                  <Switch checked={s.checked} onChange={s.onChange} size="sm" />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Card>
    </div>
  );
}
