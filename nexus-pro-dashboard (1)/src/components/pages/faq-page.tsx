import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Mail } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { cat: "Getting Started", items: [{ q: "What is Nexus Pro?", a: "Nexus Pro is a premium admin dashboard template built with Next.js, TypeScript, and Tailwind CSS. It includes 100+ pages, production-ready components, and a complete design system." }, { q: "How do I get started?", a: "Simply clone the repository, install dependencies with bun install, and run bun dev. The dashboard will be available at localhost:3000." }, { q: "Do I need a license?", a: "Yes, a license is required for commercial use. The Personal license covers single projects, while the Extended license covers SaaS products." }] },
  { cat: "Features", items: [{ q: "Is dark mode supported?", a: "Yes, every page and component is fully themeable with a refined dark mode palette. The theme toggle is in the header." }, { q: "Can I customize the colors?", a: "Absolutely. The entire color system uses CSS variables in globals.css, making it trivial to rebrand to your company colors." }, { q: "What charts are available?", a: "We use Recharts for all visualizations. Area, bar, line, pie, radar, and radial charts are all included with premium styling." }, { q: "Is it responsive?", a: "Yes, every page is fully responsive from mobile (320px) to ultra-wide screens. The sidebar collapses on mobile and there's a mobile drawer." }] },
  { cat: "Billing", items: [{ q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. All payments are processed securely via Stripe." }, { q: "Can I get a refund?", a: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied, contact support for a full refund." }, { q: "Do you offer discounts?", a: "We offer 20% off yearly plans, and discounts for startups, students, and non-profits. Contact sales for details." }] },
];

export function FaqPage() {
  return (
    <div>
      <PageHeader breadcrumb={["Pages", "FAQ"]} title="Frequently Asked Questions" description="Find answers to common questions about Nexus Pro." />
      <Card className="mb-6 p-6">
        <div className="relative max-w-xl mx-auto"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" /><Input placeholder="Search FAQs..." className="pl-9 h-11" /></div>
      </Card>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {faqs.map((f) => (
            <Card key={f.cat} className="p-6">
              <h3 className="mb-3 text-base font-semibold">{f.cat}</h3>
              <Accordion type="single" collapsible>
                {f.items.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-sm font-medium text-left">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-500 dark:text-gray-400">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <Card className="p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500"><MessageCircle className="h-6 w-6" /></div>
            <h3 className="text-base font-semibold">Still have questions?</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Our support team is here to help.</p>
            <button className="mt-3 w-full rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white">Contact Support</button>
          </Card>
          <Card className="p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-light-500/10 text-blue-light-500"><Mail className="h-6 w-6" /></div>
            <h3 className="text-base font-semibold">Email Us</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get a response within 24 hours.</p>
            <p className="mt-2 text-sm font-semibold text-brand-500">support@nexuspro.app</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
