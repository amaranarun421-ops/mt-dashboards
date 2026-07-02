"use client";

import * as React from "react";
import { ChevronDown, User, Settings, LogOut, Mail, MoreVertical, Plus, Download, Edit, Trash2, Share2, Bell, Bookmark } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

export function UiDropdowns() {
  const [position, setPosition] = React.useState("bottom");
  return (
    <div>
      <PageHeader breadcrumb={["UI Elements", "Dropdowns"]} title="Dropdown Menus" description="Custom dropdown menu components with various styles." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Basic Dropdown</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline" className="gap-1.5">Open Menu<ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
              <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> Messages</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error-600"><LogOut className="mr-2 h-4 w-4" /> Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Icon Dropdown</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
              <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Download</DropdownMenuItem>
              <DropdownMenuItem><Share2 className="mr-2 h-4 w-4" /> Share</DropdownMenuItem>
              <DropdownMenuItem><Bookmark className="mr-2 h-4 w-4" /> Bookmark</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">With Labels</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button className="gap-1.5">Options<ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
              <DropdownMenuItem><Bell className="mr-2 h-4 w-4" /> Notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Checkbox Items</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline" className="gap-1.5">Filter<ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuCheckboxItem checked>Active users</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Admins only</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Verified</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Online now</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Radio Items</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="outline" className="gap-1.5">Position: {position}<ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Primary Action</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button className="gap-1.5"><Plus className="h-4 w-4" /> Create New<ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem><User className="mr-2 h-4 w-4" /> New User</DropdownMenuItem>
              <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> New Message</DropdownMenuItem>
              <DropdownMenuItem><Plus className="mr-2 h-4 w-4" /> New Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      </div>
    </div>
  );
}
