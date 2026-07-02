import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus, Trash2, Mail, ChevronRight, Heart, Settings, Search } from "lucide-react";

export function UiButtonsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Buttons"]} title="Buttons" description="Variants, sizes, and interactive states." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Variants</h3><div className="flex flex-wrap gap-3"><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button><Button variant="destructive">Destructive</Button></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Sizes</h3><div className="flex flex-wrap items-center gap-3"><Button size="sm">Small</Button><Button size="default">Default</Button><Button size="lg">Large</Button><Button size="icon"><Plus className="h-4 w-4" /></Button></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">With Icons</h3><div className="flex flex-wrap gap-3"><Button className="gap-1.5"><Plus className="h-4 w-4" /> New</Button><Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button><Button variant="destructive" className="gap-1.5"><Trash2 className="h-4 w-4" /> Delete</Button><Button variant="secondary" className="gap-1.5"><Mail className="h-4 w-4" /> Email</Button></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">States</h3><div className="flex flex-wrap gap-3"><Button>Default</Button><Button disabled>Disabled</Button><Button className="gap-1.5"><span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /><span>Loading</span></Button></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Icon Buttons</h3><div className="flex flex-wrap gap-3"><Button variant="outline" size="icon"><Search className="h-4 w-4" /></Button><Button variant="outline" size="icon"><Settings className="h-4 w-4" /></Button><Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button><Button size="icon"><Plus className="h-4 w-4" /></Button></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Button Group</h3><div className="flex flex-wrap gap-3"><div className="inline-flex rounded-lg border border-border overflow-hidden"><Button variant="ghost" size="sm" className="rounded-none">Day</Button><Button variant="ghost" size="sm" className="rounded-none bg-gray-100 dark:bg-gray-800">Week</Button><Button variant="ghost" size="sm" className="rounded-none">Month</Button></div></div></Card>
      </div>
    </div>
  );
}
