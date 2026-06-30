"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription,
} from "@/components/ui/sheet";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Bell, UserPlus, Trash2, Rocket, MessageSquare, CheckCircle2, ChevronRight,
  ChevronLeft, Send, Gift, Sparkles, AlertTriangle,
} from "lucide-react";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function ModalsPage() {
  const [step, setStep] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const reset = () => { setStep(1); };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Advanced Modals"
        description="Five modal patterns across sizes (sm, md, lg, xl) — simple, form, confirmation, multi-step, and side panel."
        breadcrumbs={[{ label: "UI Library" }, { label: "Modals" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Simple */}
        <SectionCard title="Simple Modal" description="A compact informational dialog (sm).">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><Bell className="size-4 mr-2" />What&apos;s new</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Sparkles className="size-4 text-primary" />Release 2.4 is here</DialogTitle>
                <DialogDescription>Highlights from this week&apos;s ship.</DialogDescription>
              </DialogHeader>
              <ul className="space-y-2 text-sm">
                {[
                  "New command palette with fuzzy search",
                  "Dark mode improvements for charts",
                  "40% faster dashboard initial load",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="size-4 text-success mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <DialogFooter>
                <DialogClose asChild><Button size="sm">Got it</Button></DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SectionCard>

        {/* Form */}
        <SectionCard title="Form Modal" description="A medium dialog containing a form (md).">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline"><UserPlus className="size-4 mr-2" />Invite teammate</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite a teammate</DialogTitle>
                <DialogDescription>They&apos;ll receive an email invitation to join your workspace.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="inv-name">Full name</Label>
                  <Input id="inv-name" placeholder="Jordan Lee" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inv-email">Email address</Label>
                  <Input id="inv-email" type="email" placeholder="jordan@company.com" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select defaultValue="editor">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin — full access</SelectItem>
                      <SelectItem value="editor">Editor — can edit</SelectItem>
                      <SelectItem value="viewer">Viewer — read only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-start gap-2 rounded-md bg-muted/40 p-3 text-xs text-muted-foreground">
                  <Gift className="size-4 mt-0.5 text-primary" />
                  <span>Invitations include a 14-day Pro trial. Your teammate can upgrade anytime.</span>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <Button onClick={() => toast.success("Invitation sent", { description: "They'll receive an email shortly." })}>
                  <Send className="size-4 mr-2" />Send invite
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SectionCard>

        {/* Confirmation */}
        <SectionCard title="Confirmation Modal" description="Destructive action with explicit confirm (sm).">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive hover:text-destructive"><Trash2 className="size-4 mr-2" />Delete project</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-sm">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-full bg-destructive/10 text-destructive"><AlertTriangle className="size-4" /></span>
                  Delete this project?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete <strong className="text-foreground">MTVerse 2.0</strong> and all 248 documents, 18 collaborators, and complete history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="rounded-md border border-border p-3 text-xs">
                <Label htmlFor="confirm-name" className="text-muted-foreground">Type the project name to confirm</Label>
                <Input id="confirm-name" placeholder="MTVerse 2.0" className="mt-1.5 h-8" />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => toast.error("Project deleted", { description: "MTVerse 2.0 and all data removed." })}
                >
                  Delete forever
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SectionCard>

        {/* Multi-step */}
        <SectionCard title="Multi-step Modal" description="Wizard inside a dialog with progress (lg).">
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
            <DialogTrigger asChild>
              <Button variant="outline"><Rocket className="size-4 mr-2" />Launch campaign</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Launch a new campaign</DialogTitle>
                <DialogDescription>Step {step} of 3 — set up your campaign in minutes.</DialogDescription>
              </DialogHeader>
              <Progress value={(step / 3) * 100} className="h-1" />
              {step === 1 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="cmp-name">Campaign name</Label>
                    <Input id="cmp-name" placeholder="Q1 Product Launch" defaultValue="Q1 Product Launch" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cmp-desc">Description</Label>
                    <Textarea id="cmp-desc" rows={2} placeholder="What's this campaign about?" defaultValue="Announce the new MTVerse 2.0 release to existing customers." />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="space-y-2">
                    <Label>Channel</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "email", name: "Email", desc: "12,400 recipients" },
                        { id: "social", name: "Social", desc: "Twitter, LinkedIn" },
                        { id: "inapp", name: "In-app", desc: "Banner to 8,200 users" },
                        { id: "push", name: "Push", desc: "Mobile notifications" },
                      ].map((c) => (
                        <label key={c.id} className="flex flex-col gap-0.5 rounded-lg border border-border p-3 cursor-pointer hover:bg-accent">
                          <span className="text-sm font-medium">{c.name}</span>
                          <span className="text-xs text-muted-foreground">{c.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cmp-budget">Budget</Label>
                    <Input id="cmp-budget" defaultValue="$2,500" />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-3 animate-fade-in">
                  <div className="rounded-lg border border-border p-3 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span>Q1 Product Launch</span></div>
                    <Separator />
                    <div className="flex justify-between"><span className="text-muted-foreground">Channels</span><span>Email + In-app</span></div>
                    <Separator />
                    <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span>$2,500</span></div>
                    <Separator />
                    <div className="flex justify-between"><span className="text-muted-foreground">Audience</span><span>20,600 users</span></div>
                  </div>
                  <div className="flex items-start gap-2 rounded-md bg-success/10 p-3 text-xs text-success">
                    <CheckCircle2 className="size-4 mt-0.5" />
                    <span>Ready to launch — you can schedule or send immediately.</span>
                  </div>
                </div>
              )}
              <DialogFooter className="flex !justify-between">
                <Button variant="ghost" disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
                  <ChevronLeft className="size-4 mr-1" />Back
                </Button>
                {step < 3 ? (
                  <Button onClick={() => setStep((s) => s + 1)}>Continue<ChevronRight className="size-4 ml-1" /></Button>
                ) : (
                  <Button onClick={() => { toast.success("Campaign launched!", { description: "First messages go out in 5 minutes." }); setOpen(false); reset(); }}>
                    <Rocket className="size-4 mr-2" />Launch now
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </SectionCard>
      </div>

      {/* Side panel - xl */}
      <SectionCard title="Side Panel (xl)" description="Full-height detail panel for complex workflows, opened via Sheet.">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline"><MessageSquare className="size-4 mr-2" />Open ticket #4821</Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-2xl w-full flex flex-col">
            <SheetHeader>
              <div className="flex items-start justify-between">
                <div>
                  <SheetTitle className="text-base">Ticket #4821 — Login page returns 500 error</SheetTitle>
                  <SheetDescription>Reported by Sarah Kim · 2 hours ago · Priority: High</SheetDescription>
                </div>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Open</Badge>
              </div>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="size-7"><AvatarFallback className="text-[10px]">SK</AvatarFallback></Avatar>
                  <div>
                    <p className="text-xs font-medium">Sarah Kim</p>
                    <p className="text-[10px] text-muted-foreground">Reporter · 2h ago</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  When I try to log in with Google SSO on Chrome 121, the page returns a 500 error after the OAuth redirect. Reproduced 3 times. Affects ~12% of users according to Sentry.
                </p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="size-7"><AvatarFallback className="text-[10px] bg-primary/10 text-primary">AM</AvatarFallback></Avatar>
                  <div>
                    <p className="text-xs font-medium">Alex Morgan</p>
                    <p className="text-[10px] text-muted-foreground">Engineer · 1h ago</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Confirmed — the issue is in the callback handler. The session cookie isn&apos;t being set on Safari ITP. Pushing a fix to staging now.
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-medium mb-2">Properties</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-md border border-border p-2">
                    <p className="text-muted-foreground">Assignee</p>
                    <p className="font-medium mt-0.5">Alex Morgan</p>
                  </div>
                  <div className="rounded-md border border-border p-2">
                    <p className="text-muted-foreground">Priority</p>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 mt-0.5">High</Badge>
                  </div>
                  <div className="rounded-md border border-border p-2">
                    <p className="text-muted-foreground">Status</p>
                    <Badge variant="outline" className="bg-info/10 text-info border-info/20 mt-0.5">In Progress</Badge>
                  </div>
                  <div className="rounded-md border border-border p-2">
                    <p className="text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      <Badge variant="outline" className="font-normal">bug</Badge>
                      <Badge variant="outline" className="font-normal">auth</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-border p-3 flex gap-2">
              <Input placeholder="Reply or add a comment…" className="flex-1" />
              <Button onClick={() => toast.success("Reply posted")}>Send</Button>
            </div>
          </SheetContent>
        </Sheet>
      </SectionCard>
    </div>
  );
}
