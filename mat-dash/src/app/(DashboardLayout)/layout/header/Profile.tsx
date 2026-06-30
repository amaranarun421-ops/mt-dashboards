"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Profile = () => {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 hover:bg-lightprimary rounded-full pl-1 pr-2 py-1 transition-colors">
            <Avatar className="h-8 w-8 ring-2 ring-defaultBorder">
              <AvatarImage src="/images/profile/user-1.jpg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-link dark:text-darklink leading-tight">John Doe</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Admin</p>
            </div>
            <Icon icon="solar:alt-arrow-down-linear" width={14} className="text-muted-foreground hidden md:block" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 p-0 rounded-xl border border-defaultBorder bg-white dark:bg-[#111827] shadow-lg overflow-hidden"
        >
          {/* User info header */}
          <div className="flex items-center gap-3 p-4 border-b border-defaultBorder">
            <Avatar className="h-11 w-11 ring-2 ring-lightprimary">
              <AvatarImage src="/images/profile/user-1.jpg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-link dark:text-darklink truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
            <Badge variant="lightSuccess" className="text-[10px] gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Online
            </Badge>
          </div>

          {/* Menu items */}
          <div className="p-1.5">
            <DropdownMenuItem asChild>
              <Link href="/user-profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-link dark:text-darklink hover:bg-lightprimary hover:text-primary transition-colors cursor-pointer">
                <Icon icon="solar:user-circle-outline" height={18} className="text-muted-foreground" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pages/account-setting" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-link dark:text-darklink hover:bg-lightprimary hover:text-primary transition-colors cursor-pointer">
                <Icon icon="solar:settings-outline" height={18} className="text-muted-foreground" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/apps/tickets" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-link dark:text-darklink hover:bg-lightprimary hover:text-primary transition-colors cursor-pointer">
                <Icon icon="solar:ticket-outline" height={18} className="text-muted-foreground" />
                My Tasks
                <Badge variant="lightWarning" className="ml-auto text-[10px]">3</Badge>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-link dark:text-darklink hover:bg-lightprimary hover:text-primary transition-colors cursor-pointer">
                <Icon icon="solar:gift-outline" height={18} className="text-muted-foreground" />
                Refer & Earn
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="bg-defaultBorder" />

          <div className="p-1.5">
            <DropdownMenuItem asChild>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-link dark:text-darklink hover:bg-lightprimary hover:text-primary transition-colors cursor-pointer">
                <Icon icon="solar:question-circle-outline" height={18} className="text-muted-foreground" />
                Help & Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-link dark:text-darklink hover:bg-lightprimary hover:text-primary transition-colors cursor-pointer">
                <Icon icon="solar:moon-stars-outline" height={18} className="text-muted-foreground" />
                Dark Mode
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="bg-defaultBorder" />

          {/* Logout */}
          <div className="p-1.5">
            <DropdownMenuItem asChild>
              <Link href="/auth/login" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-error hover:bg-lighterror transition-colors cursor-pointer">
                <Icon icon="solar:logout-3-outline" height={18} />
                Logout
              </Link>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
