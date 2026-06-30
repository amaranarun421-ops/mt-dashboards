"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const people = [
  { name: "Sarah Johnson", img: 4, role: "Product Designer", mutual: 12, following: false },
  { name: "Michael Chen", img: 5, role: "Lead Engineer", mutual: 8, following: true },
  { name: "Emily Rodriguez", img: 6, role: "UX Researcher", mutual: 24, following: false },
  { name: "David Park", img: 7, role: "CTO at StartupX", mutual: 5, following: false },
  { name: "Lisa Anderson", img: 8, role: "HR Director", mutual: 18, following: true },
  { name: "James Wilson", img: 9, role: "Sales Lead", mutual: 3, following: false },
  { name: "Priya Patel", img: 10, role: "Backend Dev", mutual: 15, following: false },
  { name: "Tom Anderson", img: 1, role: "CFO", mutual: 7, following: true },
];

const FollowersPage = () => {
  return (
    <PageContainer
      title="Followers"
      description="People who follow you. Manage your network and discover new connections."
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {people.map((p, i) => (
          <DemoBlock key={i} title="">
            <div className="text-center -mt-2">
              <Avatar className="h-20 w-20 mx-auto"><AvatarImage src={`/images/profile/user-${p.img}.jpg`} /><AvatarFallback>{p.name[0]}</AvatarFallback></Avatar>
              <h6 className="font-semibold mt-3">{p.name}</h6>
              <p className="text-xs opacity-70">{p.role}</p>
              <p className="text-xs opacity-60 mt-1 flex items-center justify-center gap-1"><Icon icon="solar:users-group-rounded-bold" width={12} /> {p.mutual} mutual</p>
              <Button
                variant={p.following ? "outline" : "default"}
                size="sm"
                className={`mt-3 w-full gap-1.5 ${p.following ? "" : ""}`}
              >
                <Icon icon={p.following ? "solar:check-circle-bold" : "solar:add-circle-bold"} width={14} />
                {p.following ? "Following" : "Follow"}
              </Button>
            </div>
          </DemoBlock>
        ))}
      </div>
    </PageContainer>
  );
};

export default FollowersPage;
