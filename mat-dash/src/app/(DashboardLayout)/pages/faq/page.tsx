"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Icon } from "@iconify/react";

const faqs = [
  { category: "Getting Started", items: [
    { q: "How do I create an account?", a: "Click the 'Sign Up' button in the top right, fill in your email and password, and verify your email address. You'll be up and running in under a minute." },
    { q: "What's included in the free trial?", a: "Our 14-day free trial gives you full access to all Pro features — no credit card required. You can invite team members, integrate tools, and explore every feature." },
    { q: "Can I change my plan later?", a: "Absolutely! You can upgrade or downgrade your plan at any time from Settings → Billing. Changes take effect immediately and we prorate the difference." },
  ]},
  { category: "Billing & Payments", items: [
    { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual Enterprise plans." },
    { q: "Do you offer refunds?", a: "Yes — we offer a 30-day money-back guarantee on all annual plans. If you're not satisfied, contact support for a full refund." },
    { q: "Can I get an invoice for my purchase?", a: "Yes. Invoices are automatically generated and available in Settings → Billing → Billing History. You can add your company details for VAT-compliant invoices." },
  ]},
  { category: "Features", items: [
    { q: "Is there a limit on team members?", a: "Free plan allows up to 3 members. Pro plan allows 10. Business and Enterprise plans have unlimited seats." },
    { q: "Can I export my data?", a: "Yes — you can export all your data as CSV, JSON, or PDF at any time from Settings → Data Export. We never lock you in." },
    { q: "Do you offer an API?", a: "Yes, our REST API is available on all paid plans. Webhooks are available on Business and Enterprise. See our API docs for details." },
  ]},
  { category: "Security", items: [
    { q: "Is my data secure?", a: "We use 256-bit SSL encryption in transit and AES-256 at rest. We're SOC 2 Type II certified and GDPR compliant. Your data is backed up daily across 3 regions." },
    { q: "Do you offer SSO?", a: "Single Sign-On (SAML 2.0) is available on Business and Enterprise plans. We support Okta, Azure AD, Google Workspace, and any SAML-compliant provider." },
  ]},
];

const FAQPage = () => {
  const [search, setSearch] = useState("");
  const allItems = faqs.flatMap((c) => c.items.map((i) => ({ ...i, category: c.category })));
  const filtered = search ? allItems.filter((i) => (i.q + i.a).toLowerCase().includes(search.toLowerCase())) : null;

  return (
    <PageContainer
      title="Frequently Asked Questions"
      description="Find quick answers to common questions. Can't find what you're looking for? Contact our support team."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DemoBlock title="Search" className="lg:col-span-1 h-fit lg:sticky lg:top-24">
          <div className="relative">
            <Icon icon="solar:magnifer-linear" width={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <Input placeholder="Search FAQs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="mt-4 space-y-1">
            {faqs.map((c) => (
              <a key={c.category} href={`#${c.category}`} className="block px-3 py-2 rounded-lg hover:bg-lightprimary hover:text-primary text-sm">
                {c.category} <span className="text-xs opacity-60">({c.items.length})</span>
              </a>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-lightprimary text-center">
            <Icon icon="solar:headset-round-sound-bold-duotone" width={32} className="text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Still need help?</p>
            <p className="text-xs opacity-70 mt-1 mb-3">Our support team is here for you 24/7</p>
            <a href="mailto:support@mtverse.io" className="text-sm font-medium text-primary hover:underline">Contact Support</a>
          </div>
        </DemoBlock>

        <div className="lg:col-span-2 space-y-6">
          {filtered ? (
            <DemoBlock title={`Search Results (${filtered.length})`}>
              {filtered.length > 0 ? (
                <Accordion type="single" collapsible>
                  {filtered.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent><p className="text-sm opacity-80">{f.a}</p><p className="text-xs opacity-60 mt-2">Category: {f.category}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 opacity-60">
                  <Icon icon="solar:magnifer-bug-bold-duotone" width={48} className="mx-auto mb-2" />
                  <p>No results found for "{search}"</p>
                </div>
              )}
            </DemoBlock>
          ) : (
            faqs.map((cat) => (
              <DemoBlock key={cat.category} title={cat.category}>
                <Accordion type="single" collapsible>
                  {cat.items.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent><p className="text-sm opacity-80">{f.a}</p></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DemoBlock>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default FAQPage;
