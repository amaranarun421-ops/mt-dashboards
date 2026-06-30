"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";

const CustomFormsPage = () => {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [slider, setSlider] = useState([50]);
  const [rating, setRating] = useState(3);

  return (
    <PageContainer
      title="Custom Form Controls"
      description="Specialized inputs — toggle switches, sliders, ratings, chips, and toggle buttons."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Toggle Switches">
          <div className="space-y-4">
            <div className="flex items-center justify-between"><Label className="font-normal text-sm">Email notifications</Label><Switch checked={toggle1} onCheckedChange={setToggle1} /></div>
            <div className="flex items-center justify-between"><Label className="font-normal text-sm">Push notifications</Label><Switch checked={toggle2} onCheckedChange={setToggle2} /></div>
            <div className="flex items-center justify-between"><Label className="font-normal text-sm opacity-60">SMS alerts (disabled)</Label><Switch disabled /></div>
            <div className="flex items-center justify-between"><Label className="font-normal text-sm">Auto-save drafts</Label><Switch defaultChecked /></div>
          </div>
        </DemoBlock>

        <DemoBlock title="Slider">
          <div className="space-y-6 pt-4">
            <div>
              <Label>Volume: {slider[0]}%</Label>
              <Slider value={slider} onValueChange={setSlider} max={100} step={1} className="mt-3" />
            </div>
            <div>
              <Label>Range slider (mock)</Label>
              <div className="mt-3 h-2 bg-lightgray dark:bg-dark rounded-full relative">
                <div className="absolute h-2 bg-primary rounded-full" style={{ width: "60%" }} />
                <div className="absolute h-4 w-4 bg-white border-2 border-primary rounded-full -top-1 left-0" />
                <div className="absolute h-4 w-4 bg-white border-2 border-primary rounded-full -top-1" style={{ left: "calc(60% - 16px)" }} />
              </div>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Star Rating">
          <div className="flex flex-col gap-4">
            <div>
              <Label>Rate your experience</Label>
              <div className="flex gap-2 mt-3">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} onClick={() => setRating(s)} className="text-3xl transition-colors">
                    <Icon icon={s <= rating ? "solar:star-bold" : "solar:star-linear"} className={s <= rating ? "text-warning" : "text-gray-400"} />
                  </button>
                ))}
              </div>
              <p className="text-sm opacity-70 mt-2">You selected {rating} of 5 stars</p>
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Chip / Tag Input">
          <div className="space-y-3">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2 p-2 border border-defaultBorder rounded-md min-h-[42px]">
              {["React","TypeScript","Tailwind","Next.js","Node.js"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1 bg-lightprimary text-primary px-2 py-1 rounded-md text-xs font-medium">
                  {t}
                  <button className="hover:bg-primary hover:text-white rounded-full"><Icon icon="solar:close-circle-bold" width={14} /></button>
                </span>
              ))}
              <input placeholder="Add tag..." className="flex-1 min-w-[120px] bg-transparent outline-none text-sm px-1" />
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Image Upload" description="Drag-and-drop styled uploader">
          <div className="border-2 border-dashed border-defaultBorder rounded-xl p-8 text-center hover:border-primary hover:bg-lightprimary transition-colors cursor-pointer">
            <Icon icon="solar:upload-bold-duotone" width={42} className="text-primary mx-auto mb-3" />
            <p className="text-sm font-medium">Drop files here or click to browse</p>
            <p className="text-xs opacity-60 mt-1">PNG, JPG, GIF, PDF up to 10MB</p>
            <Button variant="lightprimary" size="sm" className="mt-3">Choose File</Button>
          </div>
        </DemoBlock>

        <DemoBlock title="Color Picker" description="Inline color swatches">
          <div className="space-y-3">
            <Label>Brand Color</Label>
            <div className="flex flex-wrap gap-2">
              {["#237DD9","#0EA5E9","#10B981","#F97316","#EF4444","#3B82F6","#1f2a3d","#0F766E"].map((c) => (
                <button key={c} className="h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-background hover:scale-110 transition-transform" style={{ backgroundColor: c, outline: c === "#237DD9" ? `2px solid ${c}` : "none", outlineOffset: 2 }} />
              ))}
            </div>
            <div className="flex gap-2">
              <Input type="text" defaultValue="#237DD9" className="flex-1 font-mono" />
              <input type="color" defaultValue="#237DD9" className="h-10 w-12 rounded-md border border-defaultBorder cursor-pointer" />
            </div>
          </div>
        </DemoBlock>

        <DemoBlock title="Segmented Tabs Input" description="Use tabs as a single-select input">
          <Tabs defaultValue="monthly">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
              <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="mt-3 text-center"><p className="text-2xl font-bold">$29<span className="text-sm font-normal opacity-60">/mo</span></p></TabsContent>
            <TabsContent value="yearly" className="mt-3 text-center"><p className="text-2xl font-bold">$279<span className="text-sm font-normal opacity-60">/yr</span></p></TabsContent>
            <TabsContent value="lifetime" className="mt-3 text-center"><p className="text-2xl font-bold">$599<span className="text-sm font-normal opacity-60"> once</span></p></TabsContent>
          </Tabs>
        </DemoBlock>

        <DemoBlock title="Toggle Button Group" description="Multi-select chips">
          <div className="space-y-3">
            <Label>What are you interested in?</Label>
            <div className="flex flex-wrap gap-2">
              {["Design","Engineering","Marketing","Product","Sales","Support","HR","Finance"].map((t, i) => (
                <button key={t} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${i < 3 ? "bg-primary text-white border-primary" : "border-defaultBorder hover:bg-lightprimary hover:text-primary"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default CustomFormsPage;
