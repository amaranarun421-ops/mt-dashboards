import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function UiModalsPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Modals & Drawers"]} title="Modals & Drawers" description="Overlays for focused interactions." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6"><h3 className="mb-3 text-base font-semibold">Default Modal</h3><p className="mb-4 text-sm text-gray-500 dark:text-gray-400">A centered dialog for forms and confirmations.</p><Dialog><DialogTrigger asChild><Button>Open Modal</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Confirm Action</DialogTitle><DialogDescription>Are you sure you want to proceed? This action cannot be undone.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose><Button>Confirm</Button></DialogFooter></DialogContent></Dialog></Card>
        <Card className="p-6"><h3 className="mb-3 text-base font-semibold">Success Modal</h3><p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Use for positive confirmations.</p><Dialog><DialogTrigger asChild><Button variant="outline">Show Success</Button></DialogTrigger><DialogContent><div className="flex flex-col items-center py-4"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-success-500/15 text-success-600 dark:text-success-500"><CheckCircle2 className="h-6 w-6" /></div><DialogTitle className="mt-3 text-center">Payment Successful</DialogTitle><DialogDescription className="text-center">Your subscription is now active.</DialogDescription><Button className="mt-4 w-full">Continue</Button></div></DialogContent></Dialog></Card>
        <Card className="p-6"><h3 className="mb-3 text-base font-semibold">Side Drawer</h3><p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Slide-in panel for filters and details.</p><Sheet><SheetTrigger asChild><Button variant="outline">Open Drawer</Button></SheetTrigger><SheetContent><DialogHeader><DialogTitle>Filter Options</DialogTitle><DialogDescription>Refine your search results</DialogDescription></DialogHeader><div className="mt-4 space-y-4"><p className="text-sm text-gray-500 dark:text-gray-400">Drawer content goes here. Useful for filters, settings, or detail views.</p></div><div className="absolute bottom-4 left-4 right-4 flex gap-2"><Button variant="outline" className="flex-1">Reset</Button><Button className="flex-1">Apply</Button></div></SheetContent></Sheet></Card>
      </div>
    </div>
  );
}
