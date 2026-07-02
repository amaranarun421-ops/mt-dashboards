import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function UiTabsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Tabs & Accordions"]} title="Tabs & Accordions" description="Organize content into switchable panels." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Default Tabs</h3><Tabs defaultValue="t1"><TabsList className="w-full"><TabsTrigger value="t1">Overview</TabsTrigger><TabsTrigger value="t2">Analytics</TabsTrigger><TabsTrigger value="t3">Reports</TabsTrigger></TabsList><TabsContent value="t1" className="mt-4 text-sm text-gray-500 dark:text-gray-400">Overview content — a high-level summary of your account activity and key metrics.</TabsContent><TabsContent value="t2" className="mt-4 text-sm text-gray-500 dark:text-gray-400">Analytics content — detailed charts and graphs showing trends over time.</TabsContent><TabsContent value="t3" className="mt-4 text-sm text-gray-500 dark:text-gray-400">Reports content — generate and download detailed reports.</TabsContent></Tabs></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Accordion</h3><Accordion type="single" defaultValue="a1"><AccordionItem value="a1"><AccordionTrigger className="text-sm font-semibold">What is Nexus Pro?</AccordionTrigger><AccordionContent className="text-sm text-gray-500 dark:text-gray-400">Nexus Pro is a premium admin dashboard built with Next.js, TypeScript, and Tailwind CSS. It includes 100+ pages and production-ready components.</AccordionContent></AccordionItem><AccordionItem value="a2"><AccordionTrigger className="text-sm font-semibold">Is dark mode supported?</AccordionTrigger><AccordionContent className="text-sm text-gray-500 dark:text-gray-400">Yes — every page and component is fully themeable with a refined dark mode palette.</AccordionContent></AccordionItem><AccordionItem value="a3"><AccordionTrigger className="text-sm font-semibold">Can I customize the colors?</AccordionTrigger><AccordionContent className="text-sm text-gray-500 dark:text-gray-400">Absolutely. The entire color system uses CSS variables, making it trivial to rebrand.</AccordionContent></AccordionItem></Accordion></Card>
      </div>
    </div>
  );
}
