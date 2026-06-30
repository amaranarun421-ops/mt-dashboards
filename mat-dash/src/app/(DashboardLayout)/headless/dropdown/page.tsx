"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const HeadlessDropdownPage = () => (
  <PageContainer title="Headless Dropdown" description="Headless UI dropdown with full keyboard navigation and ARIA support.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Basic Dropdown">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button className="gap-2">Options <Icon icon="solar:alt-arrow-down-linear" width={14} /></Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="gap-2"><Icon icon="solar:eye-linear" width={16} /> View</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Icon icon="solar:pen-linear" width={16} /> Edit</DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Icon icon="solar:share-linear" width={16} /> Share</DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-error"><Icon icon="solar:trash-bin-minimalistic-linear" width={16} /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoBlock>

      <DemoBlock title="With Icons & Shortcut">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="outline" className="gap-2">File <Icon icon="solar:alt-arrow-down-linear" width={14} /></Button></DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem className="gap-2"><Icon icon="solar:add-circle-linear" width={16} /> New File <kbd className="ml-auto text-[10px]">⌘N</kbd></DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Icon icon="solar:folder-linear" width={16} /> Open <kbd className="ml-auto text-[10px]">⌘O</kbd></DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Icon icon="solar:save-2-linear" width={16} /> Save <kbd className="ml-auto text-[10px]">⌘S</kbd></DropdownMenuItem>
            <DropdownMenuItem className="gap-2"><Icon icon="solar:export-linear" width={16} /> Export <kbd className="ml-auto text-[10px]">⌘E</kbd></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default HeadlessDropdownPage;
