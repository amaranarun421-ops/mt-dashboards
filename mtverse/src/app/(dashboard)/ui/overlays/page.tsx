"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription,
} from "@/components/ui/sheet";
import {
  Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard, HoverCardContent, HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Bell, Settings, Share, MoreHorizontal, Mail, MessageCircle, Link2, Pencil,
  Trash2, Copy, Star, Eye, Download, ChevronRight, User, Folder, FileText,
  RefreshCw, ArrowRight,
} from "lucide-react";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function OverlaysPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Overlay Components"
        description="Dialogs, sheets, drawers, popovers, hover cards, tooltips, context menus, and dropdown menus."
        breadcrumbs={[{ label: "UI Library" }, { label: "Overlays" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Dialog" description="Centered modal for focused actions.">
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"><Mail className="size-4 mr-2" />Open dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite teammate</DialogTitle>
                  <DialogDescription>Send an invitation to join your workspace.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="invite-email">Email address</Label>
                    <Input id="invite-email" type="email" placeholder="teammate@company.com" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-border p-2">
                    <Avatar className="size-7"><AvatarFallback className="text-[10px]">AM</AvatarFallback></Avatar>
                    <span className="text-xs text-muted-foreground">Inviting as <strong className="text-foreground">Editor</strong></span>
                    <Badge variant="outline" className="ml-auto">change</Badge>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                  <Button onClick={() => toast.success("Invitation sent")}>Send invite</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline"><Share className="size-4 mr-2" />Share</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share project</DialogTitle>
                  <DialogDescription>Anyone with the link can view this project.</DialogDescription>
                </DialogHeader>
                <div className="flex gap-2">
                  <Input defaultValue="https://mtverse.io/p/7a8b3f" readOnly />
                  <Button variant="outline" onClick={() => toast.success("Link copied", { description: "Share it with anyone." })}>
                    <Copy className="size-4" />
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-xs font-medium">Who has access</p>
                  {["Alex Morgan (you)", "Priya Sharma", "Marcus Chen"].map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <Avatar className="size-7"><AvatarFallback className="text-[10px]">{p.split(" ").map((x) => x[0]).join("").slice(0, 2)}</AvatarFallback></Avatar>
                      <span className="text-sm flex-1">{p}</span>
                      <Badge variant="outline" className="font-normal">{p.includes("you") ? "Owner" : "Editor"}</Badge>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </SectionCard>

        <SectionCard title="Sheet (4 sides)" description="Full-height or full-width panels sliding in from any side.">
          <div className="flex flex-wrap gap-3">
            {[
              { side: "left" as const, label: "Left", desc: "Navigation panel sliding from the left edge." },
              { side: "right" as const, label: "Right", desc: "Detail panel anchored to the right edge." },
              { side: "top" as const, label: "Top", desc: "Banner sheet dropping from the top." },
              { side: "bottom" as const, label: "Bottom", desc: "Action sheet rising from the bottom." },
            ].map((s) => (
              <Sheet key={s.side}>
                <SheetTrigger asChild>
                  <Button variant="outline">{s.label}</Button>
                </SheetTrigger>
                <SheetContent side={s.side} className="flex flex-col">
                  <SheetHeader>
                    <SheetTitle className="capitalize">{s.side} sheet</SheetTitle>
                    <SheetDescription>{s.desc}</SheetDescription>
                  </SheetHeader>
                  <div className="px-4 flex-1 space-y-3">
                    <Separator />
                    <p className="text-sm text-muted-foreground">
                      Sheets are perfect for filters, settings, and detail views that benefit from staying anchored to a screen edge.
                    </p>
                    <div className="rounded-md border border-border p-3 space-y-2">
                      <p className="text-xs font-medium">Quick actions</p>
                      {["Edit details", "Duplicate", "Archive"].map((a) => (
                        <button key={a} className="flex items-center justify-between w-full text-sm hover:bg-accent rounded px-2 py-1.5" onClick={() => toast.info(a)}>
                          {a} <ChevronRight className="size-3.5 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Drawer" description="Bottom-anchored drawer commonly used on mobile.">
          <div className="flex flex-wrap gap-3">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline"><Bell className="size-4 mr-2" />Notifications</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Recent notifications</DrawerTitle>
                  <DrawerDescription>You have 4 unread items.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-4 space-y-2 max-h-80 overflow-y-auto">
                  {[
                    { title: "New comment on MTVerse 2.0", body: "Priya: Can we revisit the onboarding flow?", time: "2m" },
                    { title: "Build passed", body: "main · commit a8f2c1 deployed to staging", time: "18m" },
                    { title: "Invoice paid", body: "Acme Corp paid invoice #INV-2024-0882", time: "1h" },
                    { title: "New follower", body: "Marcus Chen started following your work", time: "3h" },
                  ].map((n) => (
                    <div key={n.title} className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-accent/40">
                      <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary"><Bell className="size-4" /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{n.body}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline"><Settings className="size-4 mr-2" />Quick settings</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Quick settings</DrawerTitle>
                  <DrawerDescription>Adjust workspace preferences.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-6 space-y-3">
                  {[
                    { label: "Email notifications", desc: "Receive updates by email", on: true },
                    { label: "Push notifications", desc: "Get alerts on your devices", on: true },
                    { label: "Weekly digest", desc: "Summary every Monday", on: false },
                    { label: "Mentions only", desc: "Only notify when mentioned", on: false },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                      <Badge variant={s.on ? "default" : "outline"} className="font-normal">{s.on ? "On" : "Off"}</Badge>
                    </div>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </SectionCard>

        <SectionCard title="Popover" description="Floating panel anchored to a trigger element.">
          <div className="flex flex-wrap gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline"><User className="size-4 mr-2" />User menu</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <div className="flex items-center gap-3 p-3 border-b border-border">
                  <Avatar className="size-10"><AvatarFallback>AM</AvatarFallback></Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">Alex Morgan</p>
                    <p className="text-xs text-muted-foreground truncate">alex@mtverse.io</p>
                  </div>
                </div>
                <div className="p-1">
                  {[
                    { icon: User, label: "Your profile" },
                    { icon: Settings, label: "Settings" },
                    { icon: Bell, label: "Notifications" },
                  ].map((i) => {
                    const Icon = i.icon;
                    return (
                      <button key={i.label} className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-accent" onClick={() => toast.info(`Opening ${i.label}`)}>
                        <Icon className="size-3.5 text-muted-foreground" />{i.label}
                      </button>
                    );
                  })}
                </div>
                <Separator />
                <div className="p-1">
                  <button className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-accent text-destructive" onClick={() => toast.info("Signed out")}>
                    Sign out
                  </button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline"><Pencil className="size-4 mr-2" />Quick note</Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-2">
                  <Label htmlFor="quick-note">Note</Label>
                  <Input id="quick-note" placeholder="What's on your mind?" />
                  <div className="flex items-center justify-between pt-1">
                    <Badge variant="outline" className="font-normal">Saved as draft</Badge>
                    <Button size="sm" className="h-7" onClick={() => toast.success("Note saved")}>Save</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </SectionCard>

        <SectionCard title="Hover Card" description="Reveal richer info on hover, like a user preview.">
          <div className="space-y-3 text-sm">
            <p>
              Mentioned by <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="font-medium text-primary underline underline-offset-2">@alex.morgan</button>
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <div className="flex gap-3">
                    <Avatar className="size-12"><AvatarFallback>AM</AvatarFallback></Avatar>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">Alex Morgan</p>
                        <Badge variant="outline" className="font-normal text-[10px] h-4">Admin</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Design engineer @ MTVerse · 4 mutual projects</p>
                      <div className="flex gap-3 pt-1 text-[11px] text-muted-foreground">
                        <span><strong className="text-foreground">248</strong> commits</span>
                        <span><strong className="text-foreground">42</strong> PRs</span>
                        <span><strong className="text-foreground">18</strong> reviews</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>{" "}
              in the Q4 planning thread — they suggested splitting the design system into a separate package.
            </p>
            <Separator />
            <p>
              Assigned to <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="font-medium text-primary underline underline-offset-2">@priya.sharma</button>
                </HoverCardTrigger>
                <HoverCardContent className="w-72">
                  <div className="flex gap-3">
                    <Avatar className="size-12"><AvatarFallback>PS</AvatarFallback></Avatar>
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-semibold">Priya Sharma</p>
                      <p className="text-xs text-muted-foreground">Senior designer · 6 years at MTVerse</p>
                      <div className="flex gap-2 pt-1">
                        <Button size="sm" variant="outline" className="h-7" onClick={() => toast.info("Message sent")}><MessageCircle className="size-3 mr-1" />Message</Button>
                        <Button size="sm" variant="outline" className="h-7" onClick={() => toast.info("Opening profile")}><Eye className="size-3 mr-1" />View</Button>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard> for review.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Tooltip" description="Short helper text on hover or focus.">
          <TooltipProvider delayDuration={200}>
            <div className="flex flex-wrap gap-6 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><Star className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Add to favorites</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><RefreshCw className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Refresh data</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><Download className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Download as CSV</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><Link2 className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Copy permalink</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon"><Share className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent>Share with team</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Context Menu" description="Right-click (or long-press) to reveal actions.">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="rounded-lg border border-dashed border-border p-8 text-center cursor-context-menu select-none hover:bg-accent/30 transition-colors">
                <Folder className="size-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Project: MTVerse 2.0</p>
                <p className="text-xs text-muted-foreground">Right-click here to see the menu</p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuItem onClick={() => toast.info("Opened in new tab")}><ArrowRight className="size-3.5 mr-2" />Open in new tab</ContextMenuItem>
              <ContextMenuItem onClick={() => toast.success("Link copied")}><Copy className="size-3.5 mr-2" />Copy link</ContextMenuItem>
              <ContextMenuItem onClick={() => toast.success("Added to favorites")}><Star className="size-3.5 mr-2" />Add to favorites</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger><Share className="size-3.5 mr-2" />Share with…</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-40">
                  <ContextMenuItem onClick={() => toast.info("Shared with team")}><User className="size-3.5 mr-2" />Team</ContextMenuItem>
                  <ContextMenuItem onClick={() => toast.info("Shared via email")}><Mail className="size-3.5 mr-2" />Email</ContextMenuItem>
                  <ContextMenuItem onClick={() => toast.info("Shared via Slack")}><MessageCircle className="size-3.5 mr-2" />Slack</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive focus:text-destructive" onClick={() => toast.error("Project moved to trash")}><Trash2 className="size-3.5 mr-2" />Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </SectionCard>

        <SectionCard title="Dropdown Menu" description="Triggered from a button — supports labels, separators, and checkbox items.">
          <div className="flex flex-wrap gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><MoreHorizontal className="size-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="start">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info("Editing project")}><Pencil className="size-3.5 mr-2" />Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Duplicated")}><Copy className="size-3.5 mr-2" />Duplicate</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Exported")}><Download className="size-3.5 mr-2" />Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => toast.error("Deleted")}><Trash2 className="size-3.5 mr-2" />Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><FileText className="size-4 mr-2" />View</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="start">
                <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Member</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Role</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Department</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Joined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Salary</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><Settings className="size-4 mr-2" />Sort by</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44" align="start">
                <DropdownMenuItem onClick={() => toast.info("Sorted by name")}>Name (A–Z)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Sorted by recent")}>Recently active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Sorted by department")}>Department</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Sorted by joined date")}>Date joined</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
