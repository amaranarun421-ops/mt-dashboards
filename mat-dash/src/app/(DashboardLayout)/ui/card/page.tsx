"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

const CardPage = () => {
  return (
    <PageContainer
      title="Card"
      description="Flexible containers for grouping related content. Includes basic, header/footer, media, and stat variants."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Basic */}
        <DemoBlock title="Basic Card">
          <p className="text-sm opacity-80">
            A simple card with title and body content. Use it to group related information in a single container.
          </p>
          <Button variant="lightprimary" className="mt-4">Learn More</Button>
        </DemoBlock>

        {/* With media */}
        <DemoBlock title="With Media">
          <div className="-m-6 mt-0">
            <div className="h-32 bg-primary" />
            <div className="p-6">
              <h6 className="font-semibold text-base">Featured Plan</h6>
              <p className="text-sm opacity-80 mt-1">Get premium features at 50% off for the first 3 months.</p>
              <Button className="mt-3 w-full">Upgrade Now</Button>
            </div>
          </div>
        </DemoBlock>

        {/* Stat card */}
        <DemoBlock title="Stat Card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-70">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">$48,920</h3>
              <p className="text-xs text-success mt-1 flex items-center gap-1">
                <Icon icon="solar:arrow-up-linear" width={14} /> 12.5% vs last month
              </p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-lightprimary text-primary flex items-center justify-center">
              <Icon icon="solar:dollar-minimalistic-bold-duotone" width={28} />
            </div>
          </div>
        </DemoBlock>

        {/* Profile card */}
        <DemoBlock title="Profile Card">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/images/profile/user-2.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h6 className="font-semibold">Julia Roberts</h6>
              <p className="text-xs opacity-70">Product Designer</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div><p className="font-bold">1.2k</p><p className="text-xs opacity-70">Posts</p></div>
            <div><p className="font-bold">8.4k</p><p className="text-xs opacity-70">Followers</p></div>
            <div><p className="font-bold">240</p><p className="text-xs opacity-70">Following</p></div>
          </div>
          <Button variant="outline" className="mt-4 w-full">Follow</Button>
        </DemoBlock>

        {/* Pricing card */}
        <DemoBlock title="Pricing Card">
          <div className="text-center">
            <Badge variant="lightPrimary" className="mb-2">Most Popular</Badge>
            <h3 className="text-3xl font-bold">$29<span className="text-sm font-normal opacity-60">/mo</span></h3>
            <p className="text-xs opacity-70 mt-1">Billed annually</p>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {["10 Projects","Unlimited users","50GB storage","Priority support"].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Icon icon="solar:check-circle-bold" className="text-success" width={16} /> {f}
              </li>
            ))}
          </ul>
          <Button className="mt-4 w-full">Choose Plan</Button>
        </DemoBlock>

        {/* Action card */}
        <DemoBlock title="Action Card">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-lighterror text-error flex items-center justify-center shrink-0">
              <Icon icon="solar:danger-triangle-bold-duotone" width={22} />
            </div>
            <div>
              <h6 className="font-semibold">Storage Almost Full</h6>
              <p className="text-xs opacity-70 mt-1">You've used 92% of your storage quota. Upgrade to avoid disruption.</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm">Upgrade</Button>
                <Button size="sm" variant="outline">Dismiss</Button>
              </div>
            </div>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default CardPage;
