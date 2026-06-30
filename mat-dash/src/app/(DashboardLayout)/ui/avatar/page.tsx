"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

const AvatarPage = () => {
  return (
    <PageContainer
      title="Avatar"
      description="User representation with image, initials, or icons. Multiple sizes, group stacks, and status indicators."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Sizes">
          <div className="flex flex-wrap items-end gap-4">
            {["h-8 w-8","h-10 w-10","h-12 w-12","h-16 w-16","h-20 w-20"].map((s) => (
              <Avatar key={s} className={s}>
                <AvatarImage src="/images/profile/user-3.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="With Initials">
          <div className="flex flex-wrap items-end gap-4">
            <Avatar className="h-12 w-12 bg-lightprimary text-primary"><AvatarFallback>JD</AvatarFallback></Avatar>
            <Avatar className="h-12 w-12 bg-lightsuccess text-success"><AvatarFallback>SR</AvatarFallback></Avatar>
            <Avatar className="h-12 w-12 bg-lightwarning text-warning"><AvatarFallback>MK</AvatarFallback></Avatar>
            <Avatar className="h-12 w-12 bg-lighterror text-error"><AvatarFallback>AB</AvatarFallback></Avatar>
            <Avatar className="h-12 w-12 bg-lightinfo text-info"><AvatarFallback>EL</AvatarFallback></Avatar>
          </div>
        </DemoBlock>

        <DemoBlock title="Status Indicator">
          <div className="flex flex-wrap items-end gap-4">
            {[
              { color: "bg-success", img: 4 },
              { color: "bg-warning", img: 5 },
              { color: "bg-error", img: 6 },
              { color: "bg-gray-400", img: 7 },
            ].map((s, i) => (
              <div key={i} className="relative inline-block">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/images/profile/user-${s.img}.jpg`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${s.color} ring-2 ring-background`} />
              </div>
            ))}
          </div>
        </DemoBlock>

        <DemoBlock title="Avatar Group" description="Stacked overlapping avatars">
          <div className="flex items-center">
            {[
              { img: 1, name: "JD" },
              { img: 2, name: "JR" },
              { img: 3, name: "MK" },
              { img: 4, name: "SR" },
              { img: 5, name: "AB" },
            ].map((u, i) => (
              <Avatar key={i} className="h-10 w-10 ring-2 ring-background -ml-3 first:ml-0">
                <AvatarImage src={`/images/profile/user-${u.img}.jpg`} />
                <AvatarFallback>{u.name}</AvatarFallback>
              </Avatar>
            ))}
            <div className="h-10 w-10 rounded-full bg-lightprimary text-primary ring-2 ring-background -ml-3 flex items-center justify-center text-xs font-semibold">
              +12
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Icon Avatars">
          <div className="flex flex-wrap items-end gap-4">
            <Avatar className="h-12 w-12 bg-primary text-white"><Icon icon="solar:user-bold" width={22} /></Avatar>
            <Avatar className="h-12 w-12 bg-secondary text-white"><Icon icon="solar:users-group-rounded-bold" width={22} /></Avatar>
            <Avatar className="h-12 w-12 bg-success text-white"><Icon icon="solar:shield-check-bold" width={22} /></Avatar>
            <Avatar className="h-12 w-12 bg-warning text-white"><Icon icon="solar:star-bold" width={22} /></Avatar>
            <Avatar className="h-12 w-12 bg-info text-white"><Icon icon="solar:chat-round-dots-bold" width={22} /></Avatar>
          </div>
        </DemoBlock>

        <DemoBlock title="Square / Rounded">
          <div className="flex flex-wrap items-end gap-4">
            <Avatar className="h-12 w-12 rounded-none">
              <AvatarImage src="/images/profile/user-8.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 rounded-md">
              <AvatarImage src="/images/profile/user-9.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12 rounded-xl">
              <AvatarImage src="/images/profile/user-10.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <AvatarImage src="/images/profile/user-1.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default AvatarPage;
