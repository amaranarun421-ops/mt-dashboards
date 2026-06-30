"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const HeadlessDisclosurePage = () => {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState<number | null>(null);

  return (
    <PageContainer title="Headless Disclosure" description="Show/hide content sections with smooth transitions.">
      <div className="space-y-6">
        <DemoBlock title="Basic Disclosure">
          <Collapsible open={open1} onOpenChange={setOpen1}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between gap-2">
                What is mtverse?
                <Icon icon={open1 ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} width={16} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="p-4 rounded-lg bg-lightgray dark:bg-dark text-sm opacity-80">
                mtverse is a premium admin dashboard template built with Next.js 16, React 19, and Tailwind CSS 4.
              </div>
            </CollapsibleContent>
          </Collapsible>
        </DemoBlock>

        <DemoBlock title="Multiple Disclosures">
          <div className="space-y-2">
            {[
              { q: "Is dark mode supported?", a: "Yes, full dark mode with system preference detection." },
              { q: "Can I customize colors?", a: "All colors are CSS variables — edit one file to retheme." },
              { q: "Is it accessible?", a: "Yes, ARIA-compliant with full keyboard navigation." },
            ].map((item, i) => (
              <Collapsible key={i} open={open2 === i} onOpenChange={(o) => setOpen2(o ? i : -1)}>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg border border-defaultBorder hover:bg-lightgray dark:hover:bg-dark transition-colors text-sm font-medium">
                  {item.q}
                  <Icon icon={open2 === i ? "solar:minus-linear" : "solar:add-linear"} width={16} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-3 text-sm opacity-70">{item.a}</div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessDisclosurePage;
