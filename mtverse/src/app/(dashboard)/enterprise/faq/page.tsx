"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Search, HelpCircle, MessageSquare, Mail, ChevronRight, BookOpen,
  User, CreditCard, Shield, Code, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type Faq = {
  q: string;
  a: string;
  category: "General" | "Account" | "Billing" | "Security" | "API";
};

const faqs: Faq[] = [
  // General
  { category: "General", q: "What is MTVerse and what does it do?", a: "MTVerse is a premium dashboard kit and analytics platform for modern SaaS teams. It provides 50+ pre-built dashboards, real-time charts, AI-powered insights, and a complete design system that helps teams launch data products faster without rebuilding the same shell for every app." },
  { category: "General", q: "How long is the free trial?", a: "Every paid plan includes a 14-day free trial with no credit card required. You'll have full access to all features during the trial period. We'll send you a reminder 3 days before it ends so you can decide whether to upgrade." },
  { category: "General", q: "Can I use MTVerse for client projects?", a: "Yes — with the Pro plan you can build client-facing dashboards. If you want to white-label the workspace (remove MTVerse branding, use your own domain), you'll need the Enterprise plan." },
  { category: "General", q: "What's included in the dashboard kit?", a: "The kit includes 50+ page templates across 5 categories (dashboards, apps, enterprise, auth, UI library), 8 chart components, a complete design system, dark mode support, and unlimited customization via Tailwind CSS variables." },
  { category: "General", q: "Do you offer discounts for startups?", a: "Yes, we offer up to 50% off for early-stage startups (less than $2M funding) and 40% off for non-profits and educational institutions. Reach out to our sales team to apply." },

  // Account
  { category: "Account", q: "How do I change my email address?", a: "Go to Profile → Overview → Email address. Enter your new email and we'll send a verification link. Your account email updates immediately after verification. If you lose access to your current email, contact support." },
  { category: "Account", q: "Can I have multiple workspaces with one account?", a: "Yes — you can create up to 5 workspaces on the Pro plan and unlimited workspaces on Enterprise. Switch between them from the workspace selector in the sidebar. Each workspace has its own billing, members, and settings." },
  { category: "Account", q: "How do I delete my account?", a: "Go to Settings → Advanced → Delete workspace. You'll need to confirm via email. Account deletion is permanent after a 30-day grace period during which you can restore your account. All your data will be permanently removed after this period." },
  { category: "Account", q: "Can I transfer ownership of my workspace?", a: "Yes. As an admin, go to Team → select the new owner → 'Transfer ownership'. The new owner must be an admin and accept the transfer via email. This action cannot be undone." },
  { category: "Account", q: "How do I export my account data?", a: "Go to Settings → Advanced → Export workspace data. You'll receive a JSON archive via email within 24 hours containing all your dashboards, members, settings, and historical data." },

  // Billing
  { category: "Billing", q: "When am I billed?", a: "You're billed on the day you upgrade and then on the same day each month (or year for annual plans). If you upgrade mid-cycle from a lower tier, we prorate the difference. Downgrades take effect at the end of your current billing period." },
  { category: "Billing", q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, and Discover. For annual plans over $1,200, we also accept ACH transfers and wire transfers. Enterprise customers can pay via invoice with NET-30 terms." },
  { category: "Billing", q: "Can I get a refund?", a: "Yes — we offer a no-questions-asked refund within 14 days of any payment. Contact our billing team with your invoice number. Refunds typically process within 5-7 business days." },
  { category: "Billing", q: "How do I update my payment method?", a: "Go to Billing → Payment method → Update. You can add a new card or switch to an existing one. Your new payment method will be used for the next billing cycle. We don't store full card numbers — they're tokenized via Stripe." },
  { category: "Billing", q: "Do you charge per user or per workspace?", a: "Pricing is per active user, per month. A user is anyone with a seat in your workspace. Viewers and guests are also counted as seats. You can remove inactive members anytime to reduce your bill." },
  { category: "Billing", q: "What happens if my payment fails?", a: "We'll retry the payment up to 3 times over 7 days. You'll receive an email notification after each attempt. If all retries fail, your account will be downgraded to the free tier but your data is preserved for 90 days." },

  // Security
  { category: "Security", q: "How is my data encrypted?", a: "All data is encrypted at rest using AES-256 and in transit using TLS 1.3. Enterprise customers can opt for customer-managed encryption keys (CMEK) via AWS KMS or GCP KMS for additional control." },
  { category: "Security", q: "Do you offer SSO?", a: "Yes — SAML 2.0 SSO is available on the Enterprise plan. We support Okta, Azure AD, Google Workspace, OneLogin, and any SAML-compliant identity provider. SCIM provisioning is also supported for automated user lifecycle management." },
  { category: "Security", q: "Are you SOC 2 / GDPR compliant?", a: "Yes — we're SOC 2 Type II certified (renewed annually) and fully GDPR compliant. We also support HIPAA for healthcare customers. Compliance reports are available on request from our security team." },
  { category: "Security", q: "How do I enable two-factor authentication?", a: "Go to Profile → Security → Two-factor authentication → Enable. You can use any TOTP-compatible authenticator app (Google Authenticator, Authy, 1Password). We also support hardware keys via WebAuthn on Enterprise." },
  { category: "Security", q: "What happens if I lose my 2FA device?", a: "Use one of your 10 backup recovery codes generated when you enabled 2FA. If you've lost both, contact support with a government-issued ID — we'll verify your identity and reset 2FA within 24 hours." },
  { category: "Security", q: "Where is my data stored?", a: "Your data is stored in the region you select during workspace creation. We offer US (us-east-1, us-west-2), EU (eu-west-1), and APAC (ap-southeast-1) regions. Data never leaves your selected region." },

  // API
  { category: "API", q: "How do I get an API key?", a: "Go to Enterprise → API Keys → Create Key. Choose a scope (read, write, or admin), set an expiration, and copy the key immediately — it's only shown once. Store it securely and never commit it to version control." },
  { category: "API", q: "What are the API rate limits?", a: "Free: 100 req/min. Pro: 1,000 req/min. Enterprise: 10,000 req/min (custom limits available). Rate limit headers are included in every response. If you exceed the limit, you'll get a 429 status with a Retry-After header." },
  { category: "API", q: "Do you have SDKs?", a: "Yes — we have official SDKs for JavaScript/TypeScript, Python, Go, and Ruby. All SDKs are open source on GitHub. Community SDKs are available for PHP, Rust, and Elixir." },
  { category: "API", q: "How do webhooks work?", a: "Configure webhook endpoints in Enterprise → Integrations → Webhooks. We send signed POST requests to your endpoint for events like issue.created, deployment.succeeded, invoice.paid. Verify signatures using your webhook secret." },
  { category: "API", q: "What's the difference between read, write, and admin scopes?", a: "Read allows GET requests only. Write adds POST, PUT, PATCH (create and update). Admin adds DELETE and access to sensitive endpoints (user management, billing, audit logs). Always use the most restrictive scope that meets your needs." },
];

const categories = [
  { key: "All", label: "All", icon: HelpCircle },
  { key: "General", label: "General", icon: Sparkles },
  { key: "Account", label: "Account", icon: User },
  { key: "Billing", label: "Billing", icon: CreditCard },
  { key: "Security", label: "Security", icon: Shield },
  { key: "API", label: "API", icon: Code },
];

const categoryColors: Record<string, string> = {
  General: "bg-primary/10 text-primary border-primary/20",
  Account: "bg-info/10 text-info border-info/20",
  Billing: "bg-success/10 text-success border-success/20",
  Security: "bg-warning/10 text-warning border-warning/20",
  API: "bg-violet-500/10 text-violet-600 border-violet-500/20",
};

export default function FaqPage() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      if (tab !== "All" && f.category !== tab) return false;
      if (search) {
        const q = search.toLowerCase();
        return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      }
      return true;
    });
  }, [tab, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, Faq[]> = {};
    filtered.forEach((f) => {
      if (!groups[f.category]) groups[f.category] = [];
      groups[f.category].push(f);
    });
    return groups;
  }, [filtered]);

  const categoryCount = (cat: string) => cat === "All" ? faqs.length : faqs.filter((f) => f.category === cat).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Frequently Asked Questions"
        description="Find quick answers to common questions about MTVerse — from setup to advanced configuration."
        breadcrumbs={[{ label: "Enterprise" }, { label: "FAQ" }]}
        actions={
          <Button variant="outline" size="sm" className="h-9" onClick={() => toast.success("Opening documentation")}>
            <BookOpen className="size-4 mr-2" /> Full docs
          </Button>
        }
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search questions and answers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11"
        />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-9 flex-wrap">
          {categories.map((c) => (
            <TabsTrigger key={c.key} value={c.key} className="text-sm gap-1.5">
              <c.icon className="size-3.5" />
              {c.label}
              <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">{categoryCount(c.key)}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <SectionCard>
          <div className="text-center py-12">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mx-auto mb-4">
              <HelpCircle className="size-7" />
            </div>
            <p className="text-sm font-semibold">No results found</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Try a different search term or browse the categories above.
            </p>
          </div>
        </SectionCard>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([cat, items]) => (
            <SectionCard
              key={cat}
              title={cat}
              description={`${items.length} questions`}
              actions={
                <Badge variant="outline" className={`font-normal ${categoryColors[cat]}`}>{cat}</Badge>
              }
            >
              <Accordion type="single" collapsible className="w-full">
                {items.map((item, i) => (
                  <AccordionItem key={`${cat}-${i}`} value={`${cat}-${i}`}>
                    <AccordionTrigger className="text-sm hover:no-underline">
                      <span className="flex items-start gap-2 text-left">
                        <HelpCircle className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                        {item.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-6">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SectionCard>
          ))}
        </div>
      )}

      <SectionCard>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-chart-4/5">
          <div className="flex items-start gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shrink-0">
              <MessageSquare className="size-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold">Still have questions?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Our support team is here to help. Get answers within 2 hours during business hours.
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => toast.success("Live chat opening...")}>
              <MessageSquare className="size-4 mr-2" /> Live chat
            </Button>
            <Button size="sm" onClick={() => toast.success("Email form opened")}>
              <Mail className="size-4 mr-2" /> Contact support
              <ChevronRight className="size-4 ml-1" />
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
