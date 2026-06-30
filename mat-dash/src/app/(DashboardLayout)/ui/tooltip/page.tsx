"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const TooltipPage = () => {
  return (
    <PageContainer
      title="Tooltip"
      description="Contextual hints that appear on hover. Supports multiple positions, variants, and rich content."
    >
      <TooltipProvider delayDuration={200}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemoBlock title="Positions">
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Top</Button></TooltipTrigger>
                <TooltipContent side="top">Tooltip on top</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Right</Button></TooltipTrigger>
                <TooltipContent side="right">Tooltip on right</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Bottom</Button></TooltipTrigger>
                <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild><Button variant="outline">Left</Button></TooltipTrigger>
                <TooltipContent side="left">Tooltip on left</TooltipContent>
              </Tooltip>
            </div>
          </DemoBlock>

          <DemoBlock title="Icon Tooltips">
            <div className="flex flex-wrap gap-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="h-10 w-10 rounded-full hover:bg-lightprimary text-link hover:text-primary flex items-center justify-center">
                    <Icon icon="solar:info-circle-bold-duotone" width={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>More info</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="h-10 w-10 rounded-full hover:bg-lighterror text-error flex items-center justify-center">
                    <Icon icon="solar:trash-bin-minimalistic-bold" width={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Delete item</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="h-10 w-10 rounded-full hover:bg-lightsuccess text-success flex items-center justify-center">
                    <Icon icon="solar:check-read-bold" width={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Mark as read</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="h-10 w-10 rounded-full hover:bg-lightwarning text-warning flex items-center justify-center">
                    <Icon icon="solar:star-bold" width={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Add to favorites</TooltipContent>
              </Tooltip>
            </div>
          </DemoBlock>

          <DemoBlock title="Rich Content" description="HTML and icons inside tooltip">
            <div className="flex flex-wrap gap-6">
              <Tooltip>
                <TooltipTrigger asChild><Button variant="lightprimary">Hover me</Button></TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="flex items-start gap-2">
                    <Icon icon="solar:lightbulb-bolt-bold-duotone" width={20} className="text-primary shrink-0" />
                    <p className="text-xs">Pro tip: Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">⌘K</kbd> to open the command palette.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </DemoBlock>

          <DemoBlock title="Color Variants">
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild><Button size="sm">Default</Button></TooltipTrigger>
                <TooltipContent>Default tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild><Button size="sm" variant="success">Success</Button></TooltipTrigger>
                <TooltipContent className="bg-success text-white border-success">Success tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild><Button size="sm" variant="warning">Warning</Button></TooltipTrigger>
                <TooltipContent className="bg-warning text-white border-warning">Warning tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild><Button size="sm" variant="destructive">Error</Button></TooltipTrigger>
                <TooltipContent className="bg-error text-white border-error">Error tooltip</TooltipContent>
              </Tooltip>
            </div>
          </DemoBlock>
        </div>
      </TooltipProvider>
    </PageContainer>
  );
};

export default TooltipPage;
