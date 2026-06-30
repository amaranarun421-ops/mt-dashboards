"use client";

import * as React from "react";
import {
  Cpu, Clock, Zap, DollarSign, Plus, Download, Sparkles, Bot,
  Code2, MessageSquare, Image as ImageIcon, FileText, Brain,
  Activity, ArrowUpRight, ArrowDownRight, Send, CheckCircle2,
  AlertCircle, Loader2, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { PageHeader, CardMenuButton } from "@/components/mtv/primitives";
import {
  AreaTrend, BarTrend, RadialProgress, Sparkline,
} from "@/components/charts";

const tokenByModel = [
  { week: "W1", gpt4: 1820, claude: 1240, gemini: 980, llama: 620 },
  { week: "W2", gpt4: 2140, claude: 1480, gemini: 1120, llama: 740 },
  { week: "W3", gpt4: 2480, claude: 1820, gemini: 1340, llama: 820 },
  { week: "W4", gpt4: 2840, claude: 1960, gemini: 1480, llama: 940 },
  { week: "W5", gpt4: 3120, claude: 2240, gemini: 1680, llama: 1080 },
  { week: "W6", gpt4: 3580, claude: 2580, gemini: 1920, llama: 1240 },
  { week: "W7", gpt4: 3820, claude: 2740, gemini: 2140, llama: 1380 },
  { week: "W8", gpt4: 4180, claude: 3120, gemini: 2380, llama: 1480 },
  { week: "W9", gpt4: 4520, claude: 3380, gemini: 2580, llama: 1620 },
  { week: "W10", gpt4: 4860, claude: 3720, gemini: 2820, llama: 1780 },
  { week: "W11", gpt4: 5120, claude: 4040, gemini: 3040, llama: 1920 },
  { week: "W12", gpt4: 5480, claude: 4380, gemini: 3280, llama: 2080 },
];

const promptCategories = [
  { category: "Chat", requests: 18420 },
  { category: "Code", requests: 14280 },
  { category: "Analysis", requests: 9840 },
  { category: "Image", requests: 6420 },
  { category: "Embedding", requests: 4280 },
];

const modelUsage = [
  { name: "GPT-4", value: 38, tokens: "18.4M", cost: 1842, color: "var(--chart-1)" },
  { name: "Claude", value: 28, tokens: "13.6M", cost: 1248, color: "var(--chart-2)" },
  { name: "Gemini", value: 21, tokens: "10.2M", cost: 612, color: "var(--chart-3)" },
  { name: "Llama", value: 13, tokens: "6.3M", cost: 190, color: "var(--chart-4)" },
];

const chatThread = [
  { role: "user", content: "Summarize the Q4 revenue report and highlight top-performing regions.", time: "2:42 PM", tokens: 142 },
  { role: "ai", model: "GPT-4", content: "Q4 revenue reached $1.24M (+18.2% QoQ). Top regions: North America ($482K), EMEA ($412K), APAC ($268K). NA led with 24% growth driven by enterprise renewals.", time: "2:42 PM", tokens: 284, latency: 1240 },
  { role: "user", content: "Generate a Python script to fetch GitHub repo stats via the API.", time: "2:48 PM", tokens: 96 },
  { role: "ai", model: "Claude", content: "Here's a script using `requests` that pulls stars, forks, and open issues for any repo. Includes rate-limit handling and pagination. Want me to add a CSV export?", time: "2:48 PM", tokens: 412, latency: 980 },
  { role: "user", content: "Draft a marketing email for our Black Friday promo.", time: "2:55 PM", tokens: 78 },
  { role: "ai", model: "Gemini", content: "Subject: 48 Hours Only — 40% Off MTVerse Pro. Hi {{first_name}}, your exclusive Black Friday pass is here... I drafted 3 subject line variants too — want me to A/B test them?", time: "2:55 PM", tokens: 218, latency: 1480 },
];

const recentInteractions = [
  { id: "AI-7842", prompt: "Refactor authentication middleware for JWT rotation", model: "GPT-4", tokens: 1842, latency: 1240, cost: 0.184, status: "Completed" },
  { id: "AI-7841", prompt: "Generate test fixtures for the orders API", model: "Claude", tokens: 968, latency: 980, cost: 0.092, status: "Completed" },
  { id: "AI-7840", prompt: "Create hero image for landing page redesign", model: "Gemini", tokens: 642, latency: 2840, cost: 0.064, status: "Running" },
  { id: "AI-7839", prompt: "Analyze customer churn signals from support tickets", model: "GPT-4", tokens: 3240, latency: 1820, cost: 0.324, status: "Completed" },
  { id: "AI-7838", prompt: "Embed 1,248 product descriptions for vector search", model: "Llama", tokens: 12480, latency: 4200, cost: 0.124, status: "Completed" },
  { id: "AI-7837", prompt: "Translate release notes to French and German", model: "Claude", tokens: 1840, latency: 1120, cost: 0.184, status: "Failed" },
  { id: "AI-7836", prompt: "Optimize SQL query for monthly revenue rollup", model: "GPT-4", tokens: 924, latency: 1480, cost: 0.092, status: "Completed" },
];

const featuredTools = [
  { name: "Code Assistant", desc: "Smart code completion & refactors", uses: 8420, icon: Code2, color: "var(--chart-1)" },
  { name: "Chat Bot", desc: "Conversational AI assistant", uses: 6280, icon: MessageSquare, color: "var(--chart-2)" },
  { name: "Image Gen", desc: "Text-to-image generation", uses: 4180, icon: ImageIcon, color: "var(--chart-3)" },
  { name: "Doc Summarizer", desc: "Summarize long documents", uses: 3240, icon: FileText, color: "var(--chart-4)" },
  { name: "Embeddings API", desc: "Vector embeddings at scale", uses: 2840, icon: Brain, color: "var(--chart-5)" },
  { name: "Workflow Builder", desc: "Multi-step AI pipelines", uses: 1480, icon: Sparkles, color: "var(--chart-6)" },
];

const modelBadge = (model: string) => {
  switch (model) {
    case "GPT-4": return "bg-primary/10 text-primary border-primary/20";
    case "Claude": return "bg-success/10 text-success border-success/20";
    case "Gemini": return "bg-info/10 text-info border-info/20";
    case "Llama": return "bg-warning/10 text-warning border-warning/20";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

export default function AIWorkspaceDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="AI Workspace"
        description="Monitor token consumption, model performance, and live AI interactions across your workspace."
        breadcrumbs={[{ label: "Dashboards" }, { label: "AI Workspace" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9"><Filter className="size-4 mr-2" /> Filter</Button>
            <Button variant="outline" size="sm" className="h-9"><Download className="size-4 mr-2" /> Export</Button>
            <Button size="sm" className="h-9"><Plus className="size-4 mr-2" /> New Prompt</Button>
          </>
        }
      />

      {/* Compact stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Tokens Used", value: "48.2M", delta: 12.4, icon: <Cpu className="size-4" />, spark: tokenByModel.map((d) => ({ value: d.gpt4 + d.claude })), color: "var(--chart-1)" },
          { label: "Active Models", value: "12", delta: 2, icon: <Bot className="size-4" />, spark: [{value:8},{value:9},{value:10},{value:11},{value:12},{value:12}], color: "var(--chart-2)" },
          { label: "Avg Latency", value: "842ms", delta: -8.1, icon: <Clock className="size-4" />, spark: [{value:1120},{value:1040},{value:980},{value:920},{value:880},{value:842}], color: "var(--chart-3)" },
          { label: "AI Spend", value: "$3,892", delta: 18.6, icon: <DollarSign className="size-4" />, spark: [{value:2800},{value:3120},{value:3340},{value:3580},{value:3720},{value:3892}], color: "var(--chart-4)" },
        ].map((s) => {
          const up = s.delta >= 0;
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex size-8 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklab, ${s.color} 14%, transparent)`, color: s.color }}>
                  {s.icon}
                </div>
                <Badge variant="outline" className={`gap-0.5 px-1 py-0 text-[10px] ${up ? "bg-success/10 text-success border-success/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}>
                  {up ? <ArrowUpRight className="size-2.5" /> : <ArrowDownRight className="size-2.5" />}
                  {Math.abs(s.delta)}%
                </Badge>
              </div>
              <p className="text-xl font-bold tabular-nums leading-tight">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
              <div className="h-6 mt-1 -mx-1">
                <Sparkline data={s.spark} color={s.color} height={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* HERO SPLIT — Chat thread + Token gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Live AI Activity chat thread (col-span-8) */}
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
          <div className="flex items-start justify-between p-5 pb-3 border-b border-border">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-success" />
                </span>
                <h3 className="text-base font-semibold tracking-tight">Live AI Activity</h3>
              </div>
              <p className="text-xs text-muted-foreground">Recent prompts and responses across all models</p>
            </div>
            <CardMenuButton items={[{ label: "Open full thread" }, { label: "Export chat" }]} />
          </div>
          <div className="flex-1 p-5 space-y-4 max-h-[420px] overflow-y-auto">
            {chatThread.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-2.5 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                    <Avatar className="size-8 shrink-0">
                      {isUser ? (
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-semibold">YOU</AvatarFallback>
                      ) : (
                        <AvatarFallback className="text-[10px] bg-gradient-to-br from-primary to-chart-2 text-white font-semibold">
                          <Bot className="size-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className={`rounded-2xl px-3.5 py-2.5 ${isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                      {!isUser && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <Badge variant="outline" className={`text-[9px] h-4 px-1.5 py-0 ${modelBadge(msg.model)}`}>{msg.model}</Badge>
                          <span className="text-[9px] text-muted-foreground">{msg.latency}ms</span>
                        </div>
                      )}
                      <p className={`text-sm leading-relaxed ${isUser ? "text-primary-foreground" : "text-foreground"}`}>{msg.content}</p>
                      <div className={`flex items-center gap-2 mt-1.5 text-[9px] ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        <span>{msg.time}</span>
                        <span>·</span>
                        <span>{msg.tokens} tokens</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Composer bar */}
          <div className="p-3 border-t border-border bg-muted/30 flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
              Ask anything, or type @ to mention a model...
            </div>
            <Button size="icon" className="size-9 rounded-lg"><Send className="size-4" /></Button>
          </div>
        </div>

        {/* Right: Monthly Quota Usage gauge (col-span-4) */}
        <div className="lg:col-span-4 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card border-primary/15 overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Monthly Quota</h3>
              <p className="text-xs text-muted-foreground">Token usage vs limit</p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">48.2M / 75M</Badge>
          </div>
          <div className="px-5">
            <RadialProgress value={64} label="of 75M tokens" color="var(--chart-1)" height={180} />
          </div>
          <div className="px-5 pb-5 space-y-3 mt-2">
            {modelUsage.map((m) => (
              <div key={m.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full" style={{ background: m.color }} />
                    <span className="text-xs font-medium">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="tabular-nums">{m.tokens}</span>
                    <span className="font-semibold text-foreground tabular-nums">${m.cost}</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(m.value / 38) * 100}%`, background: m.color }} />
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5"><Zap className="size-3.5 text-warning" /> Resets in 12 days</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Upgrade plan</Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2-col: Tokens by Model Area + Prompt Categories Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Tokens by Model</h3>
              <p className="text-xs text-muted-foreground">Weekly consumption (12 weeks)</p>
            </div>
            <CardMenuButton items={[{ label: "Details" }, { label: "Export" }]} />
          </div>
          <div className="px-5 pb-5">
            <AreaTrend
              data={tokenByModel}
              xKey="week"
              yKeys={[
                { key: "gpt4", name: "GPT-4", color: "var(--chart-1)" },
                { key: "claude", name: "Claude", color: "var(--chart-2)" },
                { key: "gemini", name: "Gemini", color: "var(--chart-3)" },
                { key: "llama", name: "Llama", color: "var(--chart-4)" },
              ]}
              height={260}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-start justify-between p-5 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold tracking-tight">Prompt Categories</h3>
              <p className="text-xs text-muted-foreground">Requests by use case</p>
            </div>
            <CardMenuButton items={[{ label: "Breakdown" }]} />
          </div>
          <div className="px-5 pb-5">
            <BarTrend
              data={promptCategories}
              xKey="category"
              yKeys={[{ key: "requests", name: "Requests", color: "var(--chart-2)" }]}
              height={260}
              layout="vertical"
            />
          </div>
        </div>
      </div>

      {/* Recent AI Interactions table — col-span-12 */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Recent AI Interactions</h3>
            <p className="text-xs text-muted-foreground">Latest prompts processed across all models</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs">View all</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">ID</TableHead>
              <TableHead>Prompt</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">Tokens</TableHead>
              <TableHead className="text-right">Latency</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead className="pr-5 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentInteractions.map((r) => (
              <TableRow key={r.id} className="hover:bg-accent/50">
                <TableCell className="pl-5 font-mono text-xs font-medium">{r.id}</TableCell>
                <TableCell className="font-medium text-sm max-w-xs truncate">{r.prompt}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-normal ${modelBadge(r.model)}`}>{r.model}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium tabular-nums">{r.tokens.toLocaleString()}</TableCell>
                <TableCell className="text-right text-sm text-muted-foreground tabular-nums">{r.latency}ms</TableCell>
                <TableCell className="text-right font-medium tabular-nums">${r.cost.toFixed(3)}</TableCell>
                <TableCell className="pr-5 text-right">
                  {r.status === "Completed" ? (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1"><CheckCircle2 className="size-3" /> Completed</Badge>
                  ) : r.status === "Running" ? (
                    <Badge variant="outline" className="bg-info/10 text-info border-info/20 gap-1"><Loader2 className="size-3 animate-spin" /> Running</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 gap-1"><AlertCircle className="size-3" /> Failed</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Featured AI Tools grid */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-start justify-between p-5 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-base font-semibold tracking-tight">Featured AI Tools</h3>
            <p className="text-xs text-muted-foreground">Most-used tools in your workspace this month</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs">Browse marketplace</Button>
        </div>
        <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className="rounded-xl border border-border p-4 hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl shrink-0 group-hover:scale-110 transition-transform" style={{ background: `color-mix(in oklab, ${tool.color} 14%, transparent)`, color: tool.color }}>
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold truncate">{tool.name}</p>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-0.5 px-1 py-0 text-[9px] shrink-0">
                        <Activity className="size-2.5" /> {tool.uses.toLocaleString()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{tool.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
