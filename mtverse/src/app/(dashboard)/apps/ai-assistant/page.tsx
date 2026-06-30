"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Send, Bot, Sparkles, Plus, Search, MessageSquare, Trash2, MoreVertical,
  Paperclip, Copy, ThumbsUp, ThumbsDown, Code, PenLine, Lightbulb, FileText,
  TrendingUp, Zap, ChevronDown, Check, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Msg = { id: number; role: "user" | "ai"; content: string; streaming?: boolean };
type Conv = { id: number; title: string; preview: string; time: string; pinned?: boolean };

const conversations: Conv[] = [
  { id: 1, title: "Q4 OKR draft feedback", preview: "Help me sharpen these objectives…", time: "2m", pinned: true },
  { id: 2, title: "Architecture review summary", preview: "Summarize the auth refactor decisions…", time: "1h" },
  { id: 3, title: "Acme proposal revision", preview: "Rewrite section 3 to emphasize ROI…", time: "3h" },
  { id: 4, title: "Sprint retro action items", preview: "Extract action items from these notes…", time: "Yesterday" },
  { id: 5, title: "Customer interview synthesis", preview: "Find patterns across 12 interviews…", time: "2d" },
  { id: 6, title: "Marketing launch copy", preview: "Draft 5 subject line variations…", time: "3d" },
  { id: 7, title: "Board deck outline", preview: "Structure a 12-slide board deck…", time: "5d" },
  { id: 8, title: "Hiring rubric refinement", preview: "Tighten this rubric for senior PD…", time: "1w" },
];

const prompts = [
  { icon: TrendingUp, label: "Summarize my week", color: "bg-violet-500/15 text-violet-600" },
  { icon: PenLine, label: "Draft an email", color: "bg-sky-500/15 text-sky-600" },
  { icon: Code, label: "Explain this code", color: "bg-emerald-500/15 text-emerald-600" },
  { icon: Lightbulb, label: "Brainstorm ideas", color: "bg-amber-500/15 text-amber-600" },
  { icon: FileText, label: "Write a doc", color: "bg-rose-500/15 text-rose-600" },
  { icon: Zap, label: "Optimize workflow", color: "bg-fuchsia-500/15 text-fuchsia-600" },
];

const models = [
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", desc: "Most capable, slower" },
  { id: "gpt-4o", name: "GPT-4o", desc: "Balanced speed & quality" },
  { id: "claude-3.5", name: "Claude 3.5 Sonnet", desc: "Excellent for writing" },
  { id: "gemini-pro", name: "Gemini 1.5 Pro", desc: "Large context window" },
  { id: "llama-3.1", name: "Llama 3.1 70B", desc: "Open source, fast" },
];

const cannedResponses = [
  "Here's a more concise version:\n\n**Objective 1: Ship MTVerse 2.0**\n- KR1: 50+ templates live by Oct 15\n- KR2: NPS ≥ 60 in beta cohort\n- KR3: <2% regression on existing dashboards\n\n**Objective 2: Grow ARR to $5M**\n- KR1: 400 net new customers\n- KR2: 124% NRR\n- KR3: 8 enterprise deals closed\n\nI tightened language, made KRs measurable, and removed vague terms. Want me to add leading indicators for each KR?",
  "Great question. Based on the architecture review notes, here are the key decisions:\n\n1. **PKCE flow** for all SPA + mobile clients\n2. **Refresh token TTL**: 30 days (sliding window)\n3. **Access token TTL**: 15 minutes\n4. **Storage**: refresh token in httpOnly cookie (not localStorage)\n5. **Revocation endpoint** required before GA\n\nThe main open risk is backward compatibility with existing mobile tokens — you'll need a migration window. Want me to draft the migration plan?",
  "Here are 5 subject line variations for your launch email, ranked by predicted open rate:\n\n1. \"The dashboard kit that pays for itself\"\n2. \"Stop rebuilding the same shell for every app\"\n3. \"50+ premium templates. One license.\"\n4. \"Your next dashboard starts here\"\n5. \"We rebuilt the dashboard — so you don't have to\"\n\nI'd A/B test #1 vs #3 — they target different buyer motivations (ROI vs convenience). Want me to draft the email body too?",
  "Based on the sprint retro notes, here are the action items with suggested owners:\n\n| Action | Owner | Due |\n|---|---|---|\n| No-meeting Wednesdays | Alex | Next week |\n| Stagger deploy reviews | Marcus | This sprint |\n| Docs-as-code PR template | Daniel | Oct 7 |\n| Reduce standup to 12 min | Sarah | Tomorrow |\n\nWant me to create these as tasks in your task manager?",
];

export default function AIAssistantApp() {
  const [activeConv, setActiveConv] = useState(1);
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, role: "user", content: "Help me sharpen my Q4 OKRs. Here's my draft: Objective 1 — Ship MTVerse 2.0 with premium dashboard kit. KR1: lots of templates. KR2: customers love it. KR3: not too many regressions." },
    { id: 2, role: "ai", content: cannedResponses[0] },
  ]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [isStreaming, setIsStreaming] = useState(false);
  const [query, setQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const respIdx = useRef(2);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isStreaming) return;
    const userMsg: Msg = { id: Date.now(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);
    const aiId = Date.now() + 1;
    setMessages((prev) => [...prev, { id: aiId, role: "ai", content: "", streaming: true }]);
    const response = cannedResponses[respIdx.current % cannedResponses.length];
    respIdx.current++;
    let i = 0;
    const interval = setInterval(() => {
      i += 4;
      setMessages((prev) => prev.map((m) => m.id === aiId ? { ...m, content: response.slice(0, i) } : m));
      if (i >= response.length) {
        clearInterval(interval);
        setMessages((prev) => prev.map((m) => m.id === aiId ? { ...m, streaming: false } : m));
        setIsStreaming(false);
      }
    }, 25);
  };

  const newChat = () => {
    setMessages([]);
    setActiveConv(0);
    toast.message("New conversation started");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Assistant"
        description="Your always-on workspace copilot. Ask anything, draft anything."
        breadcrumbs={[{ label: "Apps" }, { label: "AI Assistant" }]}
        actions={
          <>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 h-9 px-3"><span className="size-1.5 rounded-full bg-success mr-1.5 animate-pulse" />Online</Badge>
            <Button size="sm" className="h-9" onClick={newChat}><Plus className="size-4 mr-2" /> New chat</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 h-[calc(100vh-220px)] min-h-[560px]">
        {/* Sidebar: history */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-3 border-b border-border">
            <Button size="sm" className="w-full h-9" onClick={newChat}><Plus className="size-4 mr-2" /> New conversation</Button>
          </div>
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chats…" className="pl-9 h-9" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1.5">Recent</p>
              {conversations.filter((c) => !query || c.title.toLowerCase().includes(query.toLowerCase())).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConv(c.id)}
                  className={`w-full flex items-start gap-2.5 p-2.5 rounded-lg text-left transition-colors ${activeConv === c.id ? "bg-accent" : "hover:bg-accent/50"}`}
                >
                  <MessageSquare className={`size-4 mt-0.5 shrink-0 ${activeConv === c.id ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium truncate">{c.title}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{c.preview}</p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <div className="p-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
              <Avatar className="size-8"><AvatarFallback className="text-[10px] font-semibold bg-primary/15 text-primary">AM</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">Alex Morgan</p>
                <p className="text-[10px] text-muted-foreground">Pro plan · 4.2M tokens left</p>
              </div>
              <Button variant="ghost" size="icon" className="size-7 text-muted-foreground"><MoreVertical className="size-3.5" /></Button>
            </div>
          </div>
        </div>

        {/* Chat thread */}
        <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center"><Sparkles className="size-4 text-white" /></div>
              <div>
                <p className="text-sm font-semibold">MTVerse Assistant</p>
                <p className="text-[10px] text-muted-foreground">Powered by {models.find((m) => m.id === model)?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="h-8 w-40 text-xs"><Zap className="size-3 mr-1.5" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{m.name}</span>
                        <span className="text-[10px] text-muted-foreground">{m.desc}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={() => { setMessages([]); toast.message("Conversation cleared"); }}><Trash2 className="size-4" /></Button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4"><Bot className="size-7 text-white" /></div>
                <h3 className="text-lg font-semibold">How can I help today?</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-5">Ask me to draft, summarize, brainstorm, or analyze. I learn from your workspace context.</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {prompts.map((p) => {
                    const Icon = p.icon;
                    return (
                      <button key={p.label} onClick={() => send(`${p.label}: `)} className="flex items-center gap-2.5 p-3 rounded-lg border border-border bg-background hover:bg-accent/50 transition-colors text-left">
                        <span className={`size-7 rounded-md flex items-center justify-center ${p.color}`}><Icon className="size-3.5" /></span>
                        <span className="text-xs font-medium">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "ai" && (
                  <div className="size-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0"><Sparkles className="size-4 text-white" /></div>
                )}
                <div className={`max-w-[78%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-background border border-border rounded-bl-sm"}`}>
                    {m.content || (m.streaming && <Loader2 className="size-4 animate-spin text-muted-foreground" />)}
                    {m.streaming && m.content && <span className="inline-block w-1.5 h-3.5 bg-primary ml-0.5 animate-pulse align-middle" />}
                  </div>
                  {m.role === "ai" && !m.streaming && m.content && (
                    <div className="flex items-center gap-0.5 mt-1">
                      <Button variant="ghost" size="icon" className="size-6 text-muted-foreground" onClick={() => { navigator.clipboard?.writeText(m.content); toast.success("Copied to clipboard"); }}><Copy className="size-3" /></Button>
                      <Button variant="ghost" size="icon" className="size-6 text-muted-foreground" onClick={() => toast.message("Marked as helpful")}><ThumbsUp className="size-3" /></Button>
                      <Button variant="ghost" size="icon" className="size-6 text-muted-foreground" onClick={() => toast.message("Feedback recorded")}><ThumbsDown className="size-3" /></Button>
                    </div>
                  )}
                </div>
                {m.role === "user" && (
                  <Avatar className="size-8 shrink-0"><AvatarFallback className="text-[10px] font-semibold bg-primary/15 text-primary">AM</AvatarFallback></Avatar>
                )}
              </div>
            ))}
          </div>

          {/* Prompt chips */}
          {messages.length > 0 && (
            <div className="px-4 pt-3 flex items-center gap-1.5 flex-wrap border-t border-border bg-background">
              {prompts.slice(0, 4).map((p) => (
                <button key={p.label} onClick={() => send(`${p.label} `)} className="text-[10px] px-2 py-1 rounded-full border border-border bg-background hover:bg-accent/50 transition-colors text-muted-foreground">
                  {p.label}
                </button>
              ))}
            </div>
          )}

          <div className="p-3">
            <div className="flex items-end gap-2 bg-background rounded-lg border border-border p-2 focus-within:ring-2 focus-within:ring-ring/30">
              <Button variant="ghost" size="icon" className="size-9 text-muted-foreground shrink-0"><Paperclip className="size-4" /></Button>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask anything… (Shift+Enter for new line)"
                className="border-0 shadow-none focus-visible:ring-0 resize-none min-h-[40px] max-h-32 bg-transparent text-sm"
                rows={1}
              />
              <Button size="icon" className="size-9 shrink-0" onClick={() => send()} disabled={!input.trim() || isStreaming}>
                {isStreaming ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">MTVerse AI can make mistakes. Verify important info.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
