"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export function UiTogglePage() {
  const [slider, setSlider] = React.useState([50]);
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Switches & Toggles"]} title="Switches & Toggles" description="Binary and multi-state toggles." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Switches</h3><div className="space-y-4">{[true, false, true].map((v, i) => (<div key={i} className="flex items-center justify-between"><div><p className="text-sm font-medium">Option {i + 1}</p><p className="text-xs text-gray-500 dark:text-gray-400">Description text</p></div><Switch defaultChecked={v} /></div>))}</div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Toggle Buttons</h3><div className="flex flex-wrap gap-2"><Toggle variant="outline"><Bold className="h-4 w-4" /></Toggle><Toggle variant="outline"><Italic className="h-4 w-4" /></Toggle><Toggle variant="outline"><Underline className="h-4 w-4" /></Toggle></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Toggle Group</h3><ToggleGroup type="single" defaultValue="left"><ToggleGroupItem value="left" aria-label="Left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem><ToggleGroupItem value="center" aria-label="Center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem><ToggleGroupItem value="right" aria-label="Right"><AlignRight className="h-4 w-4" /></ToggleGroupItem></ToggleGroup></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Slider</h3><Slider value={slider} onValueChange={setSlider} max={100} step={1} /><p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Value: {slider[0]}%</p></Card>
      </div>
    </div>
  );
}
