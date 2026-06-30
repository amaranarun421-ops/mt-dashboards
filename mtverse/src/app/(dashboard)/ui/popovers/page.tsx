"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar as CalendarIcon, Palette, Smile, Link2, Image as ImageIcon,
  AtSign, Bold, Italic, List, Mail, Bell, User, ChevronRight, Star,
  Sparkles, Clock, MessageCircle, Heart, ThumbsUp, Share2, MoreHorizontal,
  Circle, Plane,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function PopoversPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2024, 11, 15));
  const [color, setColor] = React.useState("var(--chart-1)");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Popovers"
        description="Popover variants — forms, menus, calendars, color pickers, and rich content panels anchored to triggers."
        breadcrumbs={[{ label: "UI Library" }, { label: "Popovers" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Form Popover" description="Inline form for quick captures like feedback or notes.">
          <div className="space-y-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline"><MessageCircle className="size-4 mr-2" />Send feedback</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold">Send feedback</p>
                    <p className="text-xs text-muted-foreground">How can we make MTVerse better?</p>
                  </div>
                  <Separator />
                  <div className="space-y-1.5">
                    <Label htmlFor="fb-name" className="text-xs">Name</Label>
                    <Input id="fb-name" placeholder="Your name" defaultValue="Alex Morgan" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fb-msg" className="text-xs">Message</Label>
                    <Textarea id="fb-msg" rows={3} placeholder="Tell us what's on your mind…" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">Category</Label>
                    <Badge variant="outline" className="cursor-pointer font-normal">Feature request</Badge>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <Button size="sm" variant="ghost">Cancel</Button>
                    <Button size="sm" onClick={() => toast.success("Feedback sent", { description: "Thanks for taking the time!" })}>
                      <Mail className="size-3.5 mr-1.5" />Send
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline"><AtSign className="size-4 mr-2" />Mention someone</Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0">
                <div className="px-3 py-2 border-b border-border">
                  <Input placeholder="Search team members…" className="h-8" autoFocus />
                </div>
                <div className="max-h-60 overflow-y-auto p-1">
                  {[
                    { name: "Alex Morgan", role: "Engineering" },
                    { name: "Priya Sharma", role: "Design" },
                    { name: "Marcus Chen", role: "Marketing" },
                    { name: "Sarah Kim", role: "Product" },
                    { name: "Diego Reyes", role: "Operations" },
                  ].map((m) => (
                    <button
                      key={m.name}
                      className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-left hover:bg-accent"
                      onClick={() => toast.info(`Mentioned @${m.name.toLowerCase().replace(" ", ".")}`)}
                    >
                      <Avatar className="size-7"><AvatarFallback className="text-[10px]">{m.name.split(" ").map((p) => p[0]).join("")}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{m.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{m.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </SectionCard>

        <SectionCard title="Menu Popover" description="Quick action menu anchored to a button.">
          <div className="flex flex-wrap gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon"><MoreHorizontal className="size-4" /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-1" align="start">
                <button className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-accent text-left" onClick={() => toast.info("Editing…")}>
                  <Bold className="size-3.5" />Edit
                </button>
                <button className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-accent text-left" onClick={() => toast.success("Duplicated")}>
                  <Italic className="size-3.5" />Duplicate
                </button>
                <button className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-accent text-left" onClick={() => toast.success("Added to favorites")}>
                  <Star className="size-3.5" />Add to favorites
                </button>
                <button className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-accent text-left" onClick={() => toast.success("Link copied")}>
                  <Link2 className="size-3.5" />Copy link
                </button>
                <Separator className="my-1" />
                <button className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-accent text-left" onClick={() => toast.info("Archived")}>
                  <List className="size-3.5" />Archive
                </button>
                <button className="flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm hover:bg-accent text-left text-destructive" onClick={() => toast.error("Deleted")}>
                  <List className="size-3.5" />Delete
                </button>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline"><Bell className="size-4 mr-2" />Notify</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0" align="start">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notify me when</p>
                </div>
                <div className="p-1">
                  {[
                    { label: "Anyone comments", on: true },
                    { label: "Mentions me", on: true },
                    { label: "Status changes", on: false },
                    { label: "Assigned to me", on: true },
                  ].map((n) => (
                    <label key={n.label} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer">
                      <input type="checkbox" defaultChecked={n.on} className="accent-primary" />
                      <span className="text-sm">{n.label}</span>
                    </label>
                  ))}
                </div>
                <Separator />
                <div className="p-1">
                  <button className="flex items-center justify-between w-full rounded px-2 py-1.5 text-sm hover:bg-accent" onClick={() => toast.info("Notification settings opened")}>
                    All settings <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </SectionCard>

        <SectionCard title="Calendar Popover" description="Date picker using the calendar component.">
          <div className="space-y-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-56 justify-start text-left">
                  <CalendarIcon className="size-4 mr-2" />
                  {date ? date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); if (d) toast.info(`Selected ${d.toLocaleDateString()}`); }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-56 justify-start text-left">
                  <Clock className="size-4 mr-2" />Schedule for later
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3" align="start">
                <p className="text-xs font-medium mb-2">Quick schedule</p>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { label: "Tomorrow at 9:00 AM", desc: "Tue, Dec 16" },
                    { label: "Tomorrow at 2:00 PM", desc: "Tue, Dec 16" },
                    { label: "Next Monday at 9:00 AM", desc: "Mon, Dec 22" },
                    { label: "In 1 hour", desc: "Today at 4:30 PM" },
                  ].map((s) => (
                    <button key={s.label} className="flex items-center justify-between rounded-md p-2 hover:bg-accent text-left" onClick={() => toast.success(`Scheduled: ${s.label}`)}>
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                      </div>
                      <ChevronRight className="size-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </div>
                <Separator className="my-2" />
                <button className="flex items-center gap-2 w-full rounded-md p-2 hover:bg-accent text-sm" onClick={() => toast.info("Opening date picker")}>
                  <CalendarIcon className="size-3.5" />Pick a custom date…
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </SectionCard>

        <SectionCard title="Color Picker" description="Palette popover for inline color selection.">
          <div className="space-y-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-56 justify-start text-left">
                  <Palette className="size-4 mr-2" style={{ color }} />Accent color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-3" align="start">
                <p className="text-xs font-medium mb-2">Choose a color</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {[
                    "var(--chart-1)", "var(--chart-2)", "var(--chart-3)",
                    "var(--chart-4)", "var(--chart-5)", "var(--chart-6)",
                    "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#10b981", "#06b6d4",
                  ].map((c) => (
                    <button
                      key={c}
                      className={"size-7 rounded-md border-2 transition-transform hover:scale-110 " + (color === c ? "border-foreground" : "border-transparent")}
                      style={{ backgroundColor: c }}
                      onClick={() => { setColor(c); toast.success("Color updated"); }}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </div>
                <Separator className="my-2" />
                <Label htmlFor="color-custom" className="text-xs">Custom hex</Label>
                <Input id="color-custom" placeholder="#7c3aed" className="mt-1 h-8 font-mono text-xs" />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-56 justify-start text-left">
                  <Smile className="size-4 mr-2" />Set status
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="start">
                {[
                  { icon: Circle, color: "fill-success text-success", label: "Available", desc: "Ready to collaborate" },
                  { icon: Circle, color: "fill-warning text-warning", label: "Away", desc: "Be right back" },
                  { icon: Circle, color: "fill-destructive text-destructive", label: "Do not disturb", desc: "Focused work" },
                  { icon: CalendarIcon, color: "text-muted-foreground", label: "In a meeting", desc: "Until 3:00 PM" },
                  { icon: Plane, color: "text-info", label: "On vacation", desc: "Back Monday" },
                ].map((s) => {
                  const Icon = s.icon as LucideIcon;
                  return (
                    <button key={s.label} className="flex items-center gap-3 w-full rounded-md p-2 hover:bg-accent text-left" onClick={() => toast.success(`Status: ${s.label}`)}>
                      <Icon className={"size-4 " + s.color} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </PopoverContent>
            </Popover>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Rich Content Popovers" description="Embed avatars, formatting toolbars, link forms, and reactions.">
        <div className="flex flex-wrap gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><User className="size-4 mr-2" />Hover preview</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex gap-3">
                <Avatar className="size-12"><AvatarFallback>AM</AvatarFallback></Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Alex Morgan</p>
                    <Badge variant="outline" className="font-normal text-[10px] h-4">Admin</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Design engineer · 248 commits · Joined Mar 2021</p>
                  <div className="flex gap-1.5 pt-1">
                    <Button size="sm" variant="outline" className="h-7" onClick={() => toast.info("Message sent")}><MessageCircle className="size-3 mr-1" />Message</Button>
                    <Button size="sm" variant="outline" className="h-7" onClick={() => toast.info("Profile opened")}>View</Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon"><Bold className="size-4" /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-1" align="start">
              <div className="flex items-center gap-0.5">
                {[Bold, Italic, List, Link2, ImageIcon].map((Icon, i) => (
                  <button key={i} className="size-8 rounded hover:bg-accent flex items-center justify-center" onClick={() => toast.info("Format applied")}>
                    <Icon className="size-3.5" />
                  </button>
                ))}
              </div>
              <Separator className="my-1" />
              <div className="px-2 py-1.5">
                <Label htmlFor="link-url" className="text-xs">Link URL</Label>
                <Input id="link-url" placeholder="https://…" className="mt-1 h-8 text-xs" />
                <Button size="sm" className="mt-2 h-7 w-full" onClick={() => toast.success("Link added")}>Apply link</Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><Sparkles className="size-4 mr-2" />Reactions</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="flex items-center gap-1">
                {[
                  { icon: ThumbsUp, label: "Like", color: "text-primary" },
                  { icon: Heart, label: "Love", color: "text-destructive" },
                  { icon: Star, label: "Star", color: "text-warning" },
                  { icon: Sparkles, label: "Celebrate", color: "text-info" },
                  { icon: Share2, label: "Share", color: "text-muted-foreground" },
                ].map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.label}
                      className={"size-9 rounded-md hover:bg-accent flex items-center justify-center transition-transform hover:scale-110 " + r.color}
                      onClick={() => toast.success(`Reacted with ${r.label}`)}
                      aria-label={r.label}
                    >
                      <Icon className="size-4" />
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><Link2 className="size-4 mr-2" />Insert link</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3" align="start">
              <div className="space-y-2">
                <div>
                  <Label htmlFor="link-text" className="text-xs">Text</Label>
                  <Input id="link-text" defaultValue="MTVerse documentation" className="mt-1 h-8" />
                </div>
                <div>
                  <Label htmlFor="link-href" className="text-xs">URL</Label>
                  <Input id="link-href" placeholder="https://mtverse.io/docs" className="mt-1 h-8" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="link-newtab" className="accent-primary" defaultChecked />
                  <Label htmlFor="link-newtab" className="text-xs cursor-pointer">Open in new tab</Label>
                </div>
                <Button size="sm" className="w-full" onClick={() => toast.success("Link inserted")}>Insert link</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SectionCard>
    </div>
  );
}
