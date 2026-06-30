"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const DrawerPage = () => {
  return (
    <PageContainer
      title="Drawer & Sheet"
      description="Slide-in panels for filters, settings, and quick forms. Bottom drawer on mobile, side sheet on desktop."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Right Sheet" description="Desktop-friendly side panel">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="gap-2"><Icon icon="solar:filter-bold-duotone" /> Open Filters</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="px-4 space-y-4 mt-4">
                <div><Label>Search</Label><Input placeholder="Search products..." className="mt-2" /></div>
                <div><Label>Category</Label><Input placeholder="Electronics" className="mt-2" /></div>
                <div><Label>Min Price</Label><Input type="number" placeholder="0" className="mt-2" /></div>
                <div><Label>Max Price</Label><Input type="number" placeholder="1000" className="mt-2" /></div>
              </div>
              <SheetFooter className="mt-6">
                <Button className="w-full">Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </DemoBlock>

        <DemoBlock title="Left Sheet" description="Navigation drawer">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2"><Icon icon="solar:menu-dots-bold" /> Open Nav</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Quick Navigation</SheetTitle>
              </SheetHeader>
              <nav className="px-4 mt-4 space-y-1">
                {["Dashboard","Analytics","Users","Products","Orders","Settings"].map((item) => (
                  <a key={item} href="#" className="block px-3 py-2 rounded-lg hover:bg-lightprimary text-sm hover:text-primary">
                    {item}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </DemoBlock>

        <DemoBlock title="Bottom Drawer" description="Mobile-friendly bottom sheet">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="lightprimary" className="gap-2"><Icon icon="solar:upload-bold-duotone" /> Upload File</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-center">
                <DrawerTitle>Choose Upload Method</DrawerTitle>
                <DrawerDescription>Select how you'd like to add files</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 pb-4 grid grid-cols-3 gap-3">
                {[
                  { icon: "solar:gallery-bold-duotone", label: "Photos", color: "primary" },
                  { icon: "solar:document-add-bold-duotone", label: "Documents", color: "success" },
                  { icon: "solar:videocamera-bold-duotone", label: "Videos", color: "warning" },
                  { icon: "solar:cloud-bold-duotone", label: "Cloud", color: "info" },
                  { icon: "solar:link-bold-duotone", label: "URL", color: "error" },
                  { icon: "solar:camera-bold-duotone", label: "Camera", color: "secondary" },
                ].map((m) => (
                  <button key={m.label} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-defaultBorder hover:bg-lightprimary hover:text-primary">
                    <div className={`h-10 w-10 rounded-xl bg-light${m.color} text-${m.color} flex items-center justify-center`}>
                      <Icon icon={m.icon} width={22} />
                    </div>
                    <span className="text-xs">{m.label}</span>
                  </button>
                ))}
              </div>
              <DrawerFooter>
                <Button>Continue</Button>
                <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </DemoBlock>

        <DemoBlock title="Top Sheet" description="Slide from top">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2"><Icon icon="solar:arrow-up-bold" /> Search</Button>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>Quick Search</SheetTitle>
              </SheetHeader>
              <div className="px-4 py-6">
                <Input placeholder="Type to search across all pages..." className="h-12 text-base" autoFocus />
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Dashboard","Users","Products","Settings","Reports"].map((s) => (
                    <Button key={s} variant="ghost" size="sm">{s}</Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default DrawerPage;
