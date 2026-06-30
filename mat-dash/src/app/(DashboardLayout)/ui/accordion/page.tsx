"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is mtverse UI Kit?", a: "mtverse is a premium admin dashboard template built with Next.js, Tailwind CSS, and shadcn/ui, designed for building modern SaaS and back-office applications." },
  { q: "Is dark mode supported?", a: "Yes — every component ships with full dark mode support via next-themes. The theme can be toggled from the header or persisted to localStorage." },
  { q: "Can I customize the design tokens?", a: "Absolutely. All colors, radii, and spacing are exposed as CSS variables in src/app/css/theme/. Edit default-colors.css or dark-colors.css to retheme the entire kit." },
  { q: "Which icon libraries are bundled?", a: "We ship with Iconify (Solar, Tabler, Lucide), @tabler/icons-react, and lucide-react. Mix and match as needed." },
];

const AccordionPage = () => {
  return (
    <PageContainer
      title="Accordion"
      description="Collapsible content sections for FAQs, settings panels, and progressive disclosure."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Single Open (Default)">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm opacity-80">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoBlock>

        <DemoBlock title="Multiple Open">
          <Accordion type="multiple" defaultValue={["item-0"]} className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm opacity-80">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoBlock>

        <DemoBlock title="Inside Card" description="Bordered card style">
          <div className="rounded-xl border border-defaultBorder overflow-hidden">
            <Accordion type="single" collapsible>
              {faqs.slice(0, 3).map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="px-4 border-defaultBorder">
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm opacity-80">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </DemoBlock>

        <DemoBlock title="Default Open" description="Pre-expanded item">
          <Accordion type="single" collapsible defaultValue="item-1">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm opacity-80">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default AccordionPage;
