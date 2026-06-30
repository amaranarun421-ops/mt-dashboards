"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const ModalPage = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <PageContainer
      title="Modal & Dialog"
      description="Overlay dialogs for focused interactions — confirmations, forms, alerts, and side sheets."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Modal">
          <Button onClick={() => setBasicOpen(true)}>Open Basic Modal</Button>
          <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Welcome to mtverse</DialogTitle>
                <DialogDescription>
                  This is a basic modal dialog. Use it for important notices that need user attention.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-3 p-4 bg-lightprimary rounded-lg text-primary">
                <Icon icon="solar:info-circle-bold-duotone" width={28} />
                <p className="text-sm">You can put any content here — text, forms, charts, or tables.</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setBasicOpen(false)}>Cancel</Button>
                <Button onClick={() => setBasicOpen(false)}>Got it</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>

        <DemoBlock title="Form Modal">
          <Button variant="lightprimary" onClick={() => setFormOpen(true)}>Add New User</Button>
          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Fill in the details below to create a new user account.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div><Label>Full Name</Label><Input placeholder="John Doe" className="mt-2" /></div>
                <div><Label>Email</Label><Input type="email" placeholder="john@example.com" className="mt-2" /></div>
                <div><Label>Role</Label><Input placeholder="Admin / Editor / Viewer" className="mt-2" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
                <Button onClick={() => setFormOpen(false)}>Create User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>

        <DemoBlock title="Confirmation Modal">
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Delete Account</Button>
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="max-w-md">
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-lighterror text-error flex items-center justify-center mb-3">
                  <Icon icon="solar:danger-triangle-bold-duotone" width={32} />
                </div>
                <DialogTitle className="text-xl">Delete Account?</DialogTitle>
                <DialogDescription className="mt-2">
                  This action is permanent and cannot be undone. All your data will be removed.
                </DialogDescription>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                <Button variant="destructive" className="flex-1" onClick={() => setConfirmOpen(false)}>Yes, Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>

        <DemoBlock title="Side Sheet / Drawer">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Right Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="px-4 space-y-4 mt-4">
                <div><Label>Category</Label><Input placeholder="All categories" className="mt-2" /></div>
                <div><Label>Min Price</Label><Input type="number" placeholder="0" className="mt-2" /></div>
                <div><Label>Max Price</Label><Input type="number" placeholder="1000" className="mt-2" /></div>
                <Button className="w-full mt-2">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default ModalPage;
