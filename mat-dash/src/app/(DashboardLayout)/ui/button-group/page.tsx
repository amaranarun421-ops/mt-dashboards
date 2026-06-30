"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const ButtonGroupPage = () => {
  return (
    <PageContainer
      title="Button Group"
      description="Group related buttons together — toolbar actions, segmented controls, and split buttons."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Group">
          <div className="inline-flex rounded-md border border-defaultBorder overflow-hidden">
            <Button variant="ghost" className="rounded-r-none border-r border-defaultBorder">Left</Button>
            <Button variant="ghost" className="rounded-none border-r border-defaultBorder">Middle</Button>
            <Button variant="ghost" className="rounded-l-none">Right</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Vertical Group">
          <div className="inline-flex flex-col rounded-md border border-defaultBorder overflow-hidden">
            <Button variant="ghost" className="rounded-b-none border-b border-defaultBorder">Top</Button>
            <Button variant="ghost" className="rounded-none border-b border-defaultBorder">Middle</Button>
            <Button variant="ghost" className="rounded-t-none">Bottom</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Pill Group">
          <div className="inline-flex rounded-full overflow-hidden bg-lightgray dark:bg-dark p-1">
            <Button shape="pill" variant="default" className="rounded-full">Day</Button>
            <Button shape="pill" variant="ghost" className="rounded-full">Week</Button>
            <Button shape="pill" variant="ghost" className="rounded-full">Month</Button>
            <Button shape="pill" variant="ghost" className="rounded-full">Year</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Toolbar" description="With mixed actions">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="inline-flex rounded-md border border-defaultBorder overflow-hidden">
              <Button variant="ghost" size="icon" className="rounded-r-none border-r border-defaultBorder"><Icon icon="solar:letter-bold" width={16} /></Button>
              <Button variant="ghost" size="icon" className="rounded-r-none border-r border-defaultBorder"><Icon icon="solar:archive-down-bold" width={16} /></Button>
              <Button variant="ghost" size="icon" className="rounded-r-none border-r border-defaultBorder"><Icon icon="solar:trash-bin-minimalistic-bold" width={16} /></Button>
              <Button variant="ghost" size="icon" className="rounded-l-none"><Icon icon="solar:share-bold" width={16} /></Button>
            </div>
            <div className="inline-flex rounded-md border border-defaultBorder overflow-hidden">
              <Button variant="ghost" size="sm" className="rounded-r-none border-r border-defaultBorder gap-1.5"><Icon icon="solar:export-bold" width={14} /> Export</Button>
              <Button variant="ghost" size="sm" className="rounded-l-none gap-1.5"><Icon icon="solar:alt-arrow-down-linear" width={14} /></Button>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Segmented Control" description="Single-select toggle">
          <div className="inline-flex rounded-lg bg-lightgray dark:bg-dark p-1">
            <Button variant="ghost" size="sm" className="bg-background shadow-sm rounded-md">List</Button>
            <Button variant="ghost" size="sm" className="rounded-md">Grid</Button>
            <Button variant="ghost" size="sm" className="rounded-md">Map</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Color Groups">
          <div className="space-y-3">
            <div className="inline-flex rounded-md overflow-hidden">
              <Button variant="default" className="rounded-r-none">Primary</Button>
              <Button variant="secondary" className="rounded-none">Secondary</Button>
              <Button variant="success" className="rounded-l-none">Success</Button>
            </div>
            <div className="block" />
            <div className="inline-flex rounded-md overflow-hidden">
              <Button variant="warning" className="rounded-r-none">Warning</Button>
              <Button variant="info" className="rounded-none">Info</Button>
              <Button variant="destructive" className="rounded-l-none">Error</Button>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="With Icons" description="Icon-only group">
          <div className="inline-flex rounded-md border border-defaultBorder overflow-hidden">
            <Button variant="ghost" size="icon" className="rounded-r-none border-r border-defaultBorder text-primary"><Icon icon="solar:widget-bold-duotone" width={18} /></Button>
            <Button variant="ghost" size="icon" className="rounded-r-none border-r border-defaultBorder"><Icon icon="solar:users-group-rounded-bold-duotone" width={18} /></Button>
            <Button variant="ghost" size="icon" className="rounded-r-none border-r border-defaultBorder"><Icon icon="solar:cart-large-2-bold-duotone" width={18} /></Button>
            <Button variant="ghost" size="icon" className="rounded-r-none border-r border-defaultBorder"><Icon icon="solar:chart-2-bold-duotone" width={18} /></Button>
            <Button variant="ghost" size="icon" className="rounded-l-none"><Icon icon="solar:settings-bold-duotone" width={18} /></Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Justified Group" description="Full-width equal columns">
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">4</Button>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default ButtonGroupPage;
