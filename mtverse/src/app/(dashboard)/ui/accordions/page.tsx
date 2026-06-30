"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown, HelpCircle, FileText, Settings, Lock, CreditCard,
  Bell, Code, Shield, Database, Zap, AlertCircle, CheckCircle2,
} from "lucide-react";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

const faqs = [
  { q: "How do I invite a teammate to my workspace?", a: "Open Settings → Members → Invite. Enter their email, pick a role (Admin, Editor or Viewer) and click Send. They’ll receive an invitation email valid for 7 days." },
  { q: "What happens when I cancel my subscription?", a: "Your workspace stays active until the end of the current billing cycle. After that, projects become read-only for 30 days before being permanently deleted." },
  { q: "Can I export all my data at once?", a: "Yes — go to Settings → Advanced → Export workspace. You’ll receive a ZIP archive with all projects, files and audit logs within 24 hours." },
  { q: "How does pricing work for additional seats?", a: "Pro plan is $24 per seat per month. Adding members mid-cycle prorates the charge automatically on your next invoice." },
];

const nested = [
  {
    category: "Getting Started",
    icon: HelpCircle,
    items: [
      { q: "What is MTVerse?", a: "MTVerse is a premium dashboard kit for building internal tools and SaaS products faster." },
      { q: "How do I create my first project?", a: "Click the + button in the sidebar, pick a template, and you’re ready to go." },
    ],
  },
  {
    category: "Account & Billing",
    icon: CreditCard,
    items: [
      { q: "How do I upgrade my plan?", a: "Settings → Billing → Upgrade. Changes apply immediately and prorate." },
      { q: "Can I get a refund?", a: "We offer a 14-day money-back guarantee on annual plans, no questions asked." },
    ],
  },
];

export default function AccordionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Accordions"
        description="Single, multiple, nested, with icons and badges — collapsible content sections."
        breadcrumbs={[{ label: "UI Library" }, { label: "Accordions" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Single Open" description="Only one item expanded at a time">
          <Accordion type="single" defaultValue="item-1" className="w-full">
            {[
              { id: "item-1", q: "What is included in the Pro plan?", a: "Pro includes 25 seats, 500 GB storage, 1M API calls/month, priority support and access to all 24 UI library pages and 12 dashboard templates." },
              { id: "item-2", q: "Do you offer a free trial?", a: "Yes — every plan starts with a 14-day free trial. No credit card required. You can upgrade, downgrade or cancel anytime." },
              { id: "item-3", q: "Can I self-host MTVerse?", a: "Enterprise customers can deploy MTVerse on their own infrastructure. Contact our sales team for Docker images, Helm charts and on-prem licenses." },
              { id: "item-4", q: "How often do you ship updates?", a: "We ship a minor release every 2 weeks with new components and improvements, and a major release every quarter with new dashboard templates." },
            ].map((i) => (
              <AccordionItem key={i.id} value={i.id}>
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><HelpCircle className="size-3.5 text-muted-foreground" /> {i.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">{i.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionCard>

        <SectionCard title="Multiple Open" description="Several items can be expanded simultaneously">
          <Accordion type="multiple" defaultValue={["m-1", "m-3"]} className="w-full">
            {[
              { id: "m-1", q: "Security & compliance", a: "SOC 2 Type II certified, ISO 27001 compliant, GDPR and HIPAA ready. All data is encrypted at rest with AES-256 and in transit with TLS 1.3." },
              { id: "m-2", q: "Data residency", a: "Choose where your data lives: US-East, EU-West (Frankfurt) or AP-Southeast (Singapore). Available on Enterprise plans." },
              { id: "m-3", q: "Audit logging", a: "Every action — logins, file changes, permission updates — is recorded and retained for 365 days. Export logs as JSON or CSV." },
              { id: "m-4", q: "Single sign-on (SSO)", a: "Supports SAML 2.0 with Okta, Azure AD, Google Workspace, OneLogin and any custom IdP. SCIM provisioning for automatic user management." },
            ].map((i) => (
              <AccordionItem key={i.id} value={i.id}>
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2"><Lock className="size-3.5 text-muted-foreground" /> {i.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">{i.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionCard>

        <SectionCard title="With Badges" description="Accordion items with status indicators">
          <Accordion type="single" defaultValue="b-1" className="w-full">
            {[
              { id: "b-1", q: "Deployment pipeline", a: "CI/CD via GitHub Actions. Auto-deploys to staging on PR merge, production on release tag. Current build: #2841 (passed).", badge: "Healthy", badgeClass: "bg-success/10 text-success border-success/20", icon: CheckCircle2 },
              { id: "b-2", q: "Database migrations", a: "Last migration ran 2 days ago. 3 pending migrations queued for next deploy window.", badge: "3 pending", badgeClass: "bg-warning/10 text-warning border-warning/20", icon: Database },
              { id: "b-3", q: "API rate limits", a: "Default: 1000 req/min per token. Burst: 1500 req/min for 10 seconds.", badge: "Within limits", badgeClass: "bg-info/10 text-info border-info/20", icon: Zap },
              { id: "b-4", q: "Error monitoring", a: "Sentry integrated. 0 critical errors in last 24h, 4 warnings (low priority).", badge: "Action needed", badgeClass: "bg-destructive/10 text-destructive border-destructive/20", icon: AlertCircle },
            ].map((i) => {
              const Icon = i.icon;
              return (
                <AccordionItem key={i.id} value={i.id}>
                  <AccordionTrigger className="text-sm hover:no-underline">
                    <span className="flex items-center gap-2 flex-1">
                      <Icon className="size-3.5 text-muted-foreground" /> {i.q}
                      <Badge variant="outline" className={`text-[10px] ml-1 ${i.badgeClass}`}>{i.badge}</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground">{i.a}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </SectionCard>

        <SectionCard title="Nested Accordions" description="Categories containing sub-questions">
          <Accordion type="multiple" defaultValue={["c-0"]} className="w-full">
            {nested.map((cat, ci) => {
              const Icon = cat.icon;
              return (
                <AccordionItem key={cat.category} value={`c-${ci}`}>
                  <AccordionTrigger className="text-sm hover:no-underline">
                    <span className="flex items-center gap-2"><Icon className="size-3.5 text-primary" /> {cat.category}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="single" className="w-full pl-4 border-l border-border ml-2">
                      {cat.items.map((item, ii) => (
                        <AccordionItem key={ii} value={`c-${ci}-i-${ii}`}>
                          <AccordionTrigger className="text-xs hover:no-underline py-2">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-xs text-muted-foreground">{item.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </SectionCard>

        <SectionCard title="FAQ Section" description="Common questions with collapse-all behavior" className="lg:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-sm hover:no-underline">
                  <span className="flex items-center gap-2">
                    <FileText className="size-3.5 text-muted-foreground" />
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Didn’t find what you’re looking for?</p>
            <div className="flex gap-2">
              <button onClick={() => toast.info("Opening docs")} className="text-xs text-primary hover:underline">Browse docs</button>
              <span className="text-muted-foreground">·</span>
              <button onClick={() => toast.info("Starting live chat")} className="text-xs text-primary hover:underline">Live chat</button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Settings Accordion" description="Grouped config panels">
          <Accordion type="multiple" defaultValue={["s-general"]} className="w-full">
            {[
              { id: "s-general", title: "General Settings", icon: Settings, items: ["Workspace name: Acme Studio", "Default language: English (US)", "Timezone: Pacific Time (PT)", "Week starts: Monday"] },
              { id: "s-notif", title: "Notifications", icon: Bell, items: ["Email digest: Daily at 9:00 AM", "Push notifications: Enabled", "Mention alerts: Immediate", "Weekly summary: Mondays"] },
              { id: "s-security", title: "Security", icon: Shield, items: ["2FA: Required for all members", "Session timeout: 30 minutes", "IP allowlist: 3 IPs configured", "SSO: Active via Okta"] },
              { id: "s-dev", title: "Developer", icon: Code, items: ["API rate limit: 1000/min", "Webhook endpoints: 2 active", "API keys: 4 issued", "GraphQL endpoint: /v2/graphql"] },
            ].map((g) => {
              const Icon = g.icon;
              return (
                <AccordionItem key={g.id} value={g.id}>
                  <AccordionTrigger className="text-sm hover:no-underline">
                    <span className="flex items-center gap-2"><Icon className="size-3.5 text-muted-foreground" /> {g.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {g.items.map((it, ii) => (
                        <li key={ii} className="flex items-center gap-2 pl-2">
                          <ChevronDown className="size-3 -rotate-90 text-muted-foreground/50" /> {it}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </SectionCard>
      </div>
    </div>
  );
}
