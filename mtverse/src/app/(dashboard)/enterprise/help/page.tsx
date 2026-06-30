"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Search, Rocket, User, CreditCard, Shield, Plug, Code, ArrowRight,
  BookOpen, TrendingUp, Clock, Headphones, MessageSquare, Mail,
  ChevronRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

const categories = [
  { name: "Getting Started", icon: Rocket, color: "bg-primary/10 text-primary", count: 24, desc: "Set up your workspace and invite your team" },
  { name: "Account", icon: User, color: "bg-info/10 text-info", count: 18, desc: "Manage your profile, preferences, and security" },
  { name: "Billing", icon: CreditCard, color: "bg-success/10 text-success", count: 15, desc: "Plans, invoices, payment methods, and refunds" },
  { name: "Security", icon: Shield, color: "bg-warning/10 text-warning", count: 22, desc: "2FA, SSO, audit logs, and compliance" },
  { name: "Integrations", icon: Plug, color: "bg-violet-500/10 text-violet-600", count: 31, desc: "Connect Slack, GitHub, Stripe, and 100+ apps" },
  { name: "API & Webhooks", icon: Code, color: "bg-sky-500/10 text-sky-600", count: 47, desc: "REST API reference, SDKs, and event webhooks" },
];

const popularArticles = [
  { id: "p1", title: "How to invite team members to your workspace", category: "Getting Started", views: "12.4k", time: "3 min read" },
  { id: "p2", title: "Setting up SSO with Okta or Azure AD", category: "Security", views: "9.8k", time: "8 min read" },
  { id: "p3", title: "Understanding your monthly invoice", category: "Billing", views: "8.2k", time: "4 min read" },
  { id: "p4", title: "Creating your first dashboard with charts", category: "Getting Started", views: "7.6k", time: "12 min read" },
  { id: "p5", title: "Authenticating API requests with Bearer tokens", category: "API", views: "6.9k", time: "6 min read" },
  { id: "p6", title: "Connecting Slack for notifications", category: "Integrations", views: "6.4k", time: "5 min read" },
  { id: "p7", title: "Configuring webhook endpoints and verifying signatures", category: "API", views: "5.8k", time: "10 min read" },
  { id: "p8", title: "Enabling two-factor authentication (2FA)", category: "Security", views: "5.2k", time: "3 min read" },
];

const recentArticles = [
  { id: "r1", title: "What's new in MTVerse 2.4 — AI-powered insights", category: "Product", time: "2 days ago" },
  { id: "r2", title: "Migrating from Looker to MTVerse: a complete guide", category: "Migration", time: "5 days ago" },
  { id: "r3", title: "Best practices for organizing your dashboards", category: "Tips", time: "1 week ago" },
  { id: "r4", title: "How to use the new command palette (Cmd+K)", category: "Product", time: "1 week ago" },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");

  const filteredArticles = useMemo(() => {
    if (!search) return popularArticles;
    const q = search.toLowerCase();
    return popularArticles.filter((a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Help Center"
        description="Find answers, learn best practices, and get the most out of MTVerse."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Help" }]}
        actions={
          <Button variant="outline" size="sm" className="h-9" onClick={() => toast.success("Opening documentation")}>
            <BookOpen className="size-4 mr-2" /> Documentation
          </Button>
        }
      />

      <Card className="relative overflow-hidden border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-4/5 pointer-events-none" />
        <CardContent className="relative p-8 md:p-12 text-center">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-4 gap-1">
            <Sparkles className="size-3" /> Help Center
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">How can we help you?</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Search our knowledge base, browse categories, or get in touch with our support team.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input
              placeholder="Search for articles, guides, and tutorials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 pl-12 text-base shadow-sm"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-8" size="sm">
              Search
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
            <span>Popular:</span>
            {["Setup guide", "API keys", "SSO", "Billing", "Webhooks"].map((t) => (
              <button
                key={t}
                onClick={() => setSearch(t)}
                className="px-2 py-0.5 rounded-md bg-muted hover:bg-accent transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold tracking-tight mb-4">Browse by category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Card
              key={cat.name}
              className="hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => toast.info(`Opening ${cat.name} category`)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className={`flex size-11 items-center justify-center rounded-xl ${cat.color} shrink-0 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold">{cat.name}</h4>
                      <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{cat.desc}</p>
                    <Badge variant="outline" className="mt-2 font-normal">{cat.count} articles</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard
          title="Popular articles"
          description={`${filteredArticles.length} articles`}
          className="lg:col-span-2"
        >
          <div className="divide-y divide-border">
            {filteredArticles.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No articles found matching "{search}".
              </div>
            ) : (
              filteredArticles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => toast.info(`Opening: ${a.title}`)}
                  className="w-full flex items-center gap-3 py-3 text-left hover:bg-accent/30 -mx-2 px-2 rounded-md transition-colors group"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">
                    <BookOpen className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">{a.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="outline" className="font-normal text-[10px] h-4 px-1">{a.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="size-3" /> {a.views} views
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3" /> {a.time}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))
            )}
          </div>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Recently updated" description="Fresh from the docs team">
            <div className="space-y-3">
              {recentArticles.map((a) => (
                <button
                  key={a.id}
                  onClick={() => toast.info(`Opening: ${a.title}`)}
                  className="w-full text-left group"
                >
                  <div className="flex items-start gap-2">
                    <div className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium group-hover:text-primary transition-colors line-clamp-2">{a.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="font-normal text-[10px] h-4 px-1">{a.category}</Badge>
                        <span className="text-xs text-muted-foreground">{a.time}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          <Card className="overflow-hidden">
            <CardContent className="p-5 bg-gradient-to-br from-primary/10 to-chart-4/5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-3">
                <Headphones className="size-5" />
              </div>
              <h4 className="text-sm font-semibold">Contact support</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Can't find what you're looking for? Our support team is available 24/7.
              </p>
              <div className="space-y-2 mt-4">
                <Button size="sm" className="w-full h-8" onClick={() => toast.success("Live chat opening...")}>
                  <MessageSquare className="size-3.5 mr-1.5" /> Live chat
                </Button>
                <Button variant="outline" size="sm" className="w-full h-8" onClick={() => toast.success("Email form opened")}>
                  <Mail className="size-3.5 mr-1.5" /> Email us
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <Avatar className="size-7">
                  <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">S1</AvatarFallback>
                </Avatar>
                <Avatar className="size-7 -ml-3">
                  <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">S2</AvatarFallback>
                </Avatar>
                <Avatar className="size-7 -ml-3">
                  <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">S3</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground ml-1">3 agents online</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SectionCard title="Resources" description="Additional tools and learning materials">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Code, title: "API Reference", desc: "Complete REST API documentation" },
            { icon: BookOpen, title: "Guides & Tutorials", desc: "Step-by-step walkthroughs" },
            { icon: Rocket, title: "Quickstart", desc: "Get up and running in 5 min" },
            { icon: MessageSquare, title: "Community", desc: "Join 12,000+ developers" },
          ].map((r) => (
            <button
              key={r.title}
              onClick={() => toast.info(`Opening ${r.title}`)}
              className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/30 text-left transition-colors group"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                <r.icon className="size-4" />
              </div>
              <h4 className="text-sm font-semibold mb-1">{r.title}</h4>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
