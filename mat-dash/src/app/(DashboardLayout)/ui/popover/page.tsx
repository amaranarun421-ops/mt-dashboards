"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

const PopoverPage = () => (
  <PageContainer title="Popover" description="Rich floating content triggered by click or hover.">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DemoBlock title="Basic Popover">
        <Popover>
          <PopoverTrigger asChild><Button>Click to open</Button></PopoverTrigger>
          <PopoverContent><p className="text-sm">This is a popover content. It can contain any HTML or React components.</p></PopoverContent>
        </Popover>
      </DemoBlock>

      <DemoBlock title="User Card Popover">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-lightprimary rounded-full p-1 pr-3">
              <Avatar className="h-9 w-9"><AvatarImage src="/images/profile/user-4.jpg" /><AvatarFallback>S</AvatarFallback></Avatar>
              <span className="text-sm font-medium">Sarah Johnson</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="text-center pb-3 border-b border-defaultBorder">
              <Avatar className="h-16 w-16 mx-auto mb-2"><AvatarImage src="/images/profile/user-4.jpg" /><AvatarFallback>S</AvatarFallback></Avatar>
              <h4 className="font-semibold">Sarah Johnson</h4>
              <p className="text-xs opacity-70">Product Designer</p>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-3 text-center">
              <div><p className="font-bold text-sm">1.2k</p><p className="text-[10px] opacity-60">Posts</p></div>
              <div><p className="font-bold text-sm">8.4k</p><p className="text-[10px] opacity-60">Followers</p></div>
              <div><p className="font-bold text-sm">240</p><p className="text-[10px] opacity-60">Following</p></div>
            </div>
            <Button size="sm" className="w-full mt-3">Follow</Button>
          </PopoverContent>
        </Popover>
      </DemoBlock>

      <DemoBlock title="Menu Popover">
        <Popover>
          <PopoverTrigger asChild><Button variant="outline" className="gap-2">Options <Icon icon="solar:alt-arrow-down-linear" width={14} /></Button></PopoverTrigger>
          <PopoverContent className="w-48 p-1">
            {["Edit", "Duplicate", "Share", "Archive", "Delete"].map((a, i) => (
              <button key={a} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-lightprimary hover:text-primary transition-colors ${a === "Delete" ? "text-error" : ""}`}>
                <Icon icon={["solar:pen-linear", "solar:copy-linear", "solar:share-linear", "solar:archive-down-linear", "solar:trash-bin-minimalistic-linear"][i]} width={16} /> {a}
              </button>
            ))}
          </PopoverContent>
        </Popover>
      </DemoBlock>

      <DemoBlock title="Form Popover">
        <Popover>
          <PopoverTrigger asChild><Button variant="lightprimary">Quick Add</Button></PopoverTrigger>
          <PopoverContent className="w-72">
            <h4 className="font-semibold text-sm mb-3">Add New Task</h4>
            <input placeholder="Task name" className="w-full px-3 py-2 rounded-md border border-defaultBorder bg-transparent text-sm mb-2" />
            <select className="w-full px-3 py-2 rounded-md border border-defaultBorder bg-transparent text-sm mb-3"><option>Low Priority</option><option>Medium</option><option>High</option></select>
            <Button size="sm" className="w-full">Add Task</Button>
          </PopoverContent>
        </Popover>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default PopoverPage;
