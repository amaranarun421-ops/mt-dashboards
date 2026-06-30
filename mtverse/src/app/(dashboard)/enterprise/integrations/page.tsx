"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Search, Plus, Check, Loader2, Puzzle, MessageSquare, Github,
  Square, FileText, Figma, PenTool, CreditCard, Zap, ShieldCheck,
  Activity, Cloud, Phone, MessagesSquare, Wallet, BarChart3, Triangle,
  ExternalLink, Settings2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader, StatCard, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Integration = {
  id: string;
  name: string;
  icon: LucideIcon;
  gradient: string;
  description: string;
  category: "Communication" | "DevOps" | "Productivity" | "Payments";
  connected: boolean;
  syncing?: boolean;
  scopes?: string[];
};

const initialIntegrations: Integration[] = [
  { id: "slack", name: "Slack", icon: MessageSquare, gradient: "from-purple-500 to-pink-500", description: "Send notifications, alerts, and reports to your Slack channels. Trigger workflows from messages.", category: "Communication", connected: true, scopes: ["channels:read", "chat:write"] },
  { id: "github", name: "GitHub", icon: Github, gradient: "from-gray-700 to-gray-900", description: "Sync pull requests, issues, and commits. Link code changes to tasks and projects.", category: "DevOps", connected: true, scopes: ["repo", "workflow"] },
  { id: "linear", name: "Linear", icon: Square, gradient: "from-indigo-500 to-purple-600", description: "Two-way sync of issues, sprints, and project status. Auto-create tasks from incidents.", category: "DevOps", connected: false },
  { id: "notion", name: "Notion", icon: FileText, gradient: "from-gray-800 to-black", description: "Embed dashboards in Notion pages. Sync databases and trigger automations.", category: "Productivity", connected: true, scopes: ["read", "write"] },
  { id: "figma", name: "Figma", icon: PenTool, gradient: "from-pink-500 to-orange-500", description: "Pull design files into your projects. Track design changes and version history.", category: "Productivity", connected: false },
  { id: "stripe", name: "Stripe", icon: CreditCard, gradient: "from-violet-500 to-indigo-600", description: "Track payments, subscriptions, and revenue events. Auto-generate invoices.", category: "Payments", connected: true, scopes: ["read_only"] },
  { id: "zapier", name: "Zapier", icon: Zap, gradient: "from-orange-500 to-red-500", description: "Connect MTVerse to 5,000+ apps. Build multi-step automations without code.", category: "Productivity", connected: false },
  { id: "sentry", name: "Sentry", icon: ShieldCheck, gradient: "from-purple-600 to-pink-600", description: "Surface errors and performance issues. Auto-create incidents from production errors.", category: "DevOps", connected: false },
  { id: "datadog", name: "Datadog", icon: Activity, gradient: "from-purple-500 to-violet-600", description: "Push metrics, logs, and traces. Combine infra and app observability.", category: "DevOps", connected: true, scopes: ["metrics:push"] },
  { id: "vercel", name: "Vercel", icon: Triangle, gradient: "from-gray-900 to-black", description: "Deploy previews on every PR. Track deployment status and performance.", category: "DevOps", connected: false },
  { id: "twilio", name: "Twilio", icon: Phone, gradient: "from-red-500 to-rose-600", description: "Send SMS alerts for critical incidents. Build voice-based automations.", category: "Communication", connected: false },
  { id: "intercom", name: "Intercom", icon: MessagesSquare, gradient: "from-blue-500 to-indigo-600", description: "Sync customer data and trigger conversations based on product events.", category: "Communication", connected: false },
  { id: "paypal", name: "PayPal", icon: Wallet, gradient: "from-blue-600 to-sky-500", description: "Accept PayPal payments. Sync transaction data with your billing records.", category: "Payments", connected: false },
  { id: "quickbooks", name: "QuickBooks", icon: BarChart3, gradient: "from-green-500 to-emerald-600", description: "Sync invoices, expenses, and financial reports. Automate bookkeeping.", category: "Payments", connected: false },
];

const categories = ["All", "Communication", "DevOps", "Productivity", "Payments"];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [connecting, setConnecting] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return integrations.filter((i) => {
      if (tab !== "All" && i.category !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        return i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [integrations, tab, search]);

  const connectedCount = integrations.filter((i) => i.connected).length;

  const handleToggle = (id: string, name: string, currentlyConnected: boolean) => {
    if (currentlyConnected) {
      setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, connected: false, syncing: false } : i)));
      toast.success(`${name} disconnected`, { description: "All data sync has been stopped." });
    } else {
      setConnecting(id);
      setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, syncing: true } : i)));
      setTimeout(() => {
        setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, connected: true, syncing: false } : i)));
        setConnecting(null);
        toast.success(`${name} connected`, { description: "Configure settings to start syncing data." });
      }, 1200);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect MTVerse to the tools your team already uses. Build powerful cross-platform workflows."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Integrations" }]}
        actions={
          <Button variant="outline" size="sm" className="h-9" onClick={() => toast.info("Browse the full marketplace")}>
            <Plus className="size-4 mr-2" /> Browse marketplace
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Connected" value={`${connectedCount} / ${integrations.length}`} icon={<Check className="size-5" />} deltaLabel="active integrations" />
        <StatCard label="API Calls (24h)" value="48,294" icon={<Activity className="size-5" />} delta={18.2} deltaLabel="vs yesterday" />
        <StatCard label="Sync Errors" value="2" icon={<Zap className="size-5" />} deltaLabel="auto-retrying" />
        <StatCard label="Webhooks" value="142" icon={<Cloud className="size-5" />} delta={4.6} deltaLabel="delivered this hour" />
      </div>

      <SectionCard
        title="Available integrations"
        description={`${filtered.length} integrations available`}
        actions={
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        }
      >
        <Tabs value={tab} onValueChange={setTab} className="mb-4">
          <TabsList className="h-9 flex-wrap">
            {categories.map((c) => (
              <TabsTrigger key={c} value={c} className="text-xs">
                {c}
                {c === "All" ? (
                  <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">{integrations.length}</Badge>
                ) : (
                  <Badge variant="secondary" className="ml-1.5 h-4 px-1 text-[10px]">
                    {integrations.filter((i) => i.category === c).length}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((i) => {
            const Icon = i.icon;
            return (
              <Card key={i.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${i.gradient} text-white shrink-0`}>
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold truncate">{i.name}</h3>
                        {i.connected && (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1 shrink-0">
                            <Check className="size-2.5" /> Connected
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="mt-1 font-normal">{i.category}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                    {i.description}
                  </p>

                  {i.connected && i.scopes && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {i.scopes.map((s) => (
                        <code key={s} className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{s}</code>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={i.connected ? "outline" : "default"}
                      className="h-8 flex-1"
                      disabled={i.syncing || connecting === i.id}
                      onClick={() => handleToggle(i.id, i.name, i.connected)}
                    >
                      {i.syncing || connecting === i.id ? (
                        <><Loader2 className="size-3.5 mr-1.5 animate-spin" /> Connecting...</>
                      ) : i.connected ? (
                        <><Settings2 className="size-3.5 mr-1.5" /> Manage</>
                      ) : (
                        <><Plus className="size-3.5 mr-1.5" /> Connect</>
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.info(`Opening ${i.name} documentation`)}>
                      <ExternalLink className="size-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="Connected integrations" description="Recently synced data">
          <div className="space-y-3">
            {integrations.filter((i) => i.connected).map((i) => {
              const Icon = i.icon;
              return (
                <div key={i.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <div className={`flex size-9 items-center justify-center rounded-lg bg-gradient-to-br ${i.gradient} text-white`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">Last synced 2 minutes ago</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20 gap-1">
                    <span className="size-1.5 rounded-full bg-success animate-pulse" /> Live
                  </Badge>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Webhook endpoints" description="Receive real-time events from MTVerse">
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium font-mono">https://api.mtverse.io/hooks/events</p>
                <Badge variant="outline" className="bg-info/10 text-info border-info/20">v2</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Sends events for: issue.created, project.updated, deployment.succeeded</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium font-mono">https://api.mtverse.io/hooks/billing</p>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Sends events for: invoice.paid, subscription.updated, payment.failed</p>
            </div>
            <Button variant="outline" size="sm" className="w-full h-8" onClick={() => toast.info("Opening webhook configuration")}>
              <Plus className="size-3.5 mr-1.5" /> Add webhook endpoint
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
