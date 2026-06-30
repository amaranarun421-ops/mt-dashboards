"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import Link from "next/link";

const NavbarPage = () => (
  <PageContainer title="Navbar" description="Navigation bar variants for different layouts.">
    <div className="space-y-6">
      <DemoBlock title="Simple Navbar">
        <nav className="flex items-center justify-between p-3 rounded-lg border border-defaultBorder bg-background">
          <span className="font-bold">mtverse</span>
          <div className="flex gap-4">
            {["Home", "Products", "About", "Contact"].map((l) => <Link key={l} href="#" className="text-sm hover:text-primary">{l}</Link>)}
          </div>
          <Button size="sm">Sign In</Button>
        </nav>
      </DemoBlock>

      <DemoBlock title="Navbar with Search">
        <nav className="flex items-center justify-between gap-4 p-3 rounded-lg border border-defaultBorder bg-background">
          <div className="flex items-center gap-6">
            <span className="font-bold">mtverse</span>
            <div className="flex gap-3">
              {["Dashboard", "Analytics", "Settings"].map((l) => <Link key={l} href="#" className="text-sm hover:text-primary">{l}</Link>)}
            </div>
          </div>
          <div className="flex-1 max-w-xs"><Input placeholder="Search..." /></div>
          <Avatar className="h-8 w-8"><AvatarImage src="/images/profile/user-1.jpg" /><AvatarFallback>U</AvatarFallback></Avatar>
        </nav>
      </DemoBlock>

      <DemoBlock title="Navbar with Icons">
        <nav className="flex items-center justify-between p-3 rounded-lg border border-defaultBorder bg-background">
          <div className="flex items-center gap-2"><Icon icon="solar:widget-bold-duotone" width={24} className="text-primary" /><span className="font-bold">mtverse</span></div>
          <div className="flex items-center gap-1">
            {["solar:bell-bing-bold", "solar:letter-unread-bold", "solar:settings-bold"].map((i) => (
              <button key={i} className="h-9 w-9 rounded-full hover:bg-lightprimary hover:text-primary flex items-center justify-center"><Icon icon={i} width={18} /></button>
            ))}
            <Avatar className="h-8 w-8 ml-2"><AvatarImage src="/images/profile/user-1.jpg" /><AvatarFallback>U</AvatarFallback></Avatar>
          </div>
        </nav>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default NavbarPage;
