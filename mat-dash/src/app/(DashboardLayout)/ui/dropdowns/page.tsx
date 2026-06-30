"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import { useState } from "react";

const DropdownPage = () => {
  const [position, setPosition] = useState("bottom");

  return (
    <PageContainer
      title="Dropdown"
      description="Contextual menus with rich content — items, separators, labels, shortcuts, checkboxes, and radio groups."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button>Open Menu <Icon icon="solar:alt-arrow-down-linear" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2"><Icon icon="solar:user-circle-linear" width={16} /> Profile</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Icon icon="solar:settings-linear" width={16} /> Settings</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Icon icon="solar:bell-bing-linear" width={16} /> Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-error"><Icon icon="solar:logout-3-linear" width={16} /> Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DemoBlock>

        <DemoBlock title="With Avatar">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:bg-lightprimary rounded-full pl-1 pr-3 py-1">
                <Avatar className="h-8 w-8"><AvatarImage src="/images/profile/user-1.jpg" /><AvatarFallback>U</AvatarFallback></Avatar>
                <span className="text-sm font-medium">John Doe</span>
                <Icon icon="solar:alt-arrow-down-linear" width={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="p-2">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs opacity-70">john@example.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2"><Icon icon="solar:user-circle-linear" width={16} /> My Profile</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Icon icon="solar:letter-linear" width={16} /> Inbox <span className="ml-auto text-xs">12</span></DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Icon icon="solar:checklist-linear" width={16} /> Tasks</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-error"><Icon icon="solar:logout-3-linear" width={16} /> Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DemoBlock>

        <DemoBlock title="Checkbox Items">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">View Options</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Show sidebar</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Show breadcrumbs</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Show notifications</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Compact mode</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DemoBlock>

        <DemoBlock title="Radio Items">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline">Position: {position}</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Toast Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="top-right">Top Right</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom-right">Bottom Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </DemoBlock>

        <DemoBlock title="With Shortcuts" className="lg:col-span-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="lightprimary">Quick Actions</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2"><Icon icon="solar:add-circle-linear" width={16} /> New File <DropdownMenuShortcut>⌘N</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Icon icon="solar:folder-linear" width={16} /> Open Folder <DropdownMenuShortcut>⌘O</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Icon icon="solar:save-2-linear" width={16} /> Save <DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Icon icon="solar:copy-linear" width={16} /> Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Icon icon="solar:export-linear" width={16} /> Export <DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-error"><Icon icon="solar:trash-bin-minimalistic-linear" width={16} /> Delete <DropdownMenuShortcut>⌫</DropdownMenuShortcut></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default DropdownPage;
