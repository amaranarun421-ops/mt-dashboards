"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const HeadlessPopoverPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <PageContainer title="Headless Popover" description="Floating content panels with smart positioning.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Popover">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild><Button>Click to Toggle</Button></PopoverTrigger>
            <PopoverContent><p className="text-sm">This popover closes on outside click and Escape key.</p></PopoverContent>
          </Popover>
        </DemoBlock>

        <DemoBlock title="User Info Popover">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2"><Icon icon="solar:info-circle-bold" width={16} /> Hover Info</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">m</div>
                <div>
                  <h4 className="font-semibold text-sm">mtverse Dashboard</h4>
                  <p className="text-xs opacity-70 mt-1">A premium admin template with 96+ pages, 25+ components, and full dark mode.</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </DemoBlock>

        <DemoBlock title="Action Menu Popover" className="lg:col-span-2">
          <Popover>
            <PopoverTrigger asChild><Button variant="ghost" className="gap-2"><Icon icon="solar:menu-dots-bold" width={18} /> Actions</Button></PopoverTrigger>
            <PopoverContent className="w-48 p-1" align="start">
              {["Edit", "Duplicate", "Move", "Archive", "Delete"].map((a, i) => (
                <button key={a} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-lightprimary hover:text-primary transition-colors ${a === "Delete" ? "text-error" : ""}`}>
                  <Icon icon={["solar:pen-linear", "solar:copy-linear", "solar:move-linear", "solar:archive-down-linear", "solar:trash-bin-minimalistic-linear"][i]} width={16} /> {a}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessPopoverPage;
