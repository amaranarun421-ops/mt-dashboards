import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UiAvatarsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Avatars"]} title="Avatars" description="User representation with images and fallbacks." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Sizes</h3><div className="flex items-end gap-4"><Avatar className="h-6 w-6"><AvatarImage src="https://i.pravatar.cc/40?img=1" /></Avatar><Avatar className="h-8 w-8"><AvatarImage src="https://i.pravatar.cc/40?img=1" /></Avatar><Avatar className="h-10 w-10"><AvatarImage src="https://i.pravatar.cc/40?img=1" /></Avatar><Avatar className="h-12 w-12"><AvatarImage src="https://i.pravatar.cc/40?img=1" /></Avatar><Avatar className="h-16 w-16"><AvatarImage src="https://i.pravatar.cc/40?img=1" /></Avatar></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">With Fallback</h3><div className="flex items-center gap-3"><Avatar className="h-10 w-10"><AvatarFallback className="bg-brand-500/15 text-brand-500">AK</AvatarFallback></Avatar><Avatar className="h-10 w-10"><AvatarFallback className="bg-blue-light-500/15 text-blue-light-500">SC</AvatarFallback></Avatar><Avatar className="h-10 w-10"><AvatarFallback className="bg-success-500/15 text-success-600 dark:text-success-500">MP</AvatarFallback></Avatar><Avatar className="h-10 w-10"><AvatarFallback className="bg-warning-500/15 text-warning-600 dark:text-orange-400">RP</AvatarFallback></Avatar></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Avatar Group</h3><div className="flex -space-x-3">{[1, 2, 3, 4, 5].map((i) => <Avatar key={i} className="h-10 w-10 border-2 border-card"><AvatarImage src={`https://i.pravatar.cc/40?img=${i}`} /></Avatar>)}<div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card bg-gray-100 dark:bg-gray-800 text-xs font-bold">+8</div></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">With Status</h3><div className="flex items-center gap-4">{[1, 2, 3].map((i) => <div key={i} className="relative"><Avatar className="h-10 w-10"><AvatarImage src={`https://i.pravatar.cc/40?img=${i}`} /></Avatar><span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${i === 1 ? "bg-success-500" : i === 2 ? "bg-warning-500" : "bg-gray-100 dark:bg-gray-800-foreground"}`} /></div>)}</div></Card>
      </div>
    </div>
  );
}
