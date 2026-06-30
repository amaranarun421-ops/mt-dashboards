"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";

const HeadlessDialogPage = () => {
  const [basic, setBasic] = useState(false);
  const [form, setForm] = useState(false);
  const [confirm, setConfirm] = useState(false);

  return (
    <PageContainer title="Headless Dialog" description="Modal dialogs with focus trapping and keyboard support.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DemoBlock title="Basic Dialog">
          <Button onClick={() => setBasic(true)}>Open Dialog</Button>
          <Dialog open={basic} onOpenChange={setBasic}>
            <DialogContent>
              <DialogHeader><DialogTitle>Welcome to mtverse</DialogTitle><DialogDescription>This is a headless dialog with focus trapping.</DialogDescription></DialogHeader>
              <p className="text-sm opacity-80">Press Escape or click outside to close. Tab navigation is trapped within the dialog.</p>
              <DialogFooter><Button onClick={() => setBasic(false)}>Close</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>

        <DemoBlock title="Form Dialog">
          <Button variant="lightprimary" onClick={() => setForm(true)}>Add User</Button>
          <Dialog open={form} onOpenChange={setForm}>
            <DialogContent>
              <DialogHeader><DialogTitle>Add New User</DialogTitle><DialogDescription>Fill in the details below.</DialogDescription></DialogHeader>
              <div className="space-y-3 py-2">
                <div><Label>Name</Label><Input className="mt-2" placeholder="John Doe" /></div>
                <div><Label>Email</Label><Input type="email" className="mt-2" placeholder="john@example.com" /></div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setForm(false)}>Cancel</Button><Button onClick={() => setForm(false)}>Create</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>

        <DemoBlock title="Confirmation Dialog">
          <Button variant="destructive" onClick={() => setConfirm(true)}>Delete Account</Button>
          <Dialog open={confirm} onOpenChange={setConfirm}>
            <DialogContent className="max-w-md">
              <div className="text-center">
                <div className="h-14 w-14 rounded-full bg-lighterror text-error flex items-center justify-center mx-auto mb-3"><Icon icon="solar:danger-triangle-bold-duotone" width={28} /></div>
                <DialogTitle className="text-xl">Delete Account?</DialogTitle>
                <DialogDescription className="mt-2">This action cannot be undone.</DialogDescription>
              </div>
              <DialogFooter className="gap-2"><Button variant="outline" className="flex-1" onClick={() => setConfirm(false)}>Cancel</Button><Button variant="destructive" className="flex-1" onClick={() => setConfirm(false)}>Delete</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HeadlessDialogPage;
