"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Bell, User,
  Settings, CreditCard, Mail, Phone, Globe, CheckCircle2, Circle, Dot,
  Home, Folder as FolderIcon, Star, History, Layers, ChevronLeft, Menu,
} from "lucide-react";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator,
} from "@/components/ui/menubar";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

type TreeNode = {
  name: string;
  icon: React.ElementType;
  children?: TreeNode[];
  badge?: string;
};

const fileTree: TreeNode[] = [
  {
    name: "mtverse-app",
    icon: Folder,
    children: [
      {
        name: "src",
        icon: Folder,
        children: [
          {
            name: "components",
            icon: Folder,
            children: [
              { name: "ui", icon: Folder, children: [{ name: "button.tsx", icon: FileText }, { name: "input.tsx", icon: FileText }, { name: "card.tsx", icon: FileText }] },
              { name: "charts", icon: Folder, children: [{ name: "index.tsx", icon: FileText }] },
              { name: "mtv", icon: Folder, children: [{ name: "primitives.tsx", icon: FileText, badge: "shared" }] },
            ],
          },
          { name: "app", icon: Folder, children: [{ name: "page.tsx", icon: FileText }, { name: "layout.tsx", icon: FileText }] },
          { name: "lib", icon: Folder, children: [{ name: "utils.ts", icon: FileText }] },
        ],
      },
      { name: "package.json", icon: FileText },
      { name: "tsconfig.json", icon: FileText },
      { name: "README.md", icon: FileText, badge: "doc" },
    ],
  },
];

function Tree({ nodes, level = 0 }: { nodes: TreeNode[]; level?: number }) {
  return (
    <ul className={level === 0 ? "" : "ml-3 border-l border-border pl-2"}>
      {nodes.map((n) => <TreeItem key={n.name} node={n} level={level} />)}
    </ul>
  );
}

function TreeItem({ node, level }: { node: TreeNode; level: number }) {
  const [open, setOpen] = React.useState(level < 2);
  const hasChildren = !!node.children?.length;
  const Icon = node.icon;
  return (
    <li>
      <button
        className="flex items-center gap-1.5 w-full text-left py-1 px-1 rounded hover:bg-accent/60 text-sm group"
        onClick={() => hasChildren ? setOpen((o) => !o) : toast.info(`Opened ${node.name}`)}
      >
        {hasChildren ? (
          open ? <ChevronDown className="size-3.5 text-muted-foreground" /> : <ChevronRight className="size-3.5 text-muted-foreground" />
        ) : (
          <span className="w-3.5" />
        )}
        <Icon className={"size-3.5 " + (hasChildren ? (open ? "text-primary" : "text-muted-foreground") : "text-muted-foreground")} />
        <span className="truncate">{node.name}</span>
        {node.badge && <Badge variant="outline" className="ml-auto text-[9px] h-4 px-1">{node.badge}</Badge>}
      </button>
      {hasChildren && open && <Tree nodes={node.children!} level={level + 1} />}
    </li>
  );
}

export default function NavigationPage() {
  const [activeStep, setActiveStep] = React.useState(2);
  const steps = ["Cart", "Shipping", "Payment", "Review", "Confirm"];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Navigation Systems"
        description="Breadcrumbs, tabs, pills, segmented controls, pagination, steps, menu bar, and file tree patterns."
        breadcrumbs={[{ label: "UI Library" }, { label: "Navigation" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Breadcrumbs" description="Trail of pages leading to the current view.">
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#"><Home className="size-3.5" /></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">MTVerse 2.0</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Settings</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Reports</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">Finance</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Q4 2024</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#"><Layers className="size-3.5" /></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator><ChevronRight className="size-3.5" /></BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbLink href="#">Workspace</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator><ChevronRight className="size-3.5" /></BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbPage>Members</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </SectionCard>

        <SectionCard title="Tabs — Top & Bottom" description="Standard tab strip with content above or below.">
          <Tabs defaultValue="top">
            <TabsList className="mb-3">
              <TabsTrigger value="top"><Bell className="size-3.5 mr-1.5" />Notifications</TabsTrigger>
              <TabsTrigger value="inbox"><Mail className="size-3.5 mr-1.5" />Inbox</TabsTrigger>
              <TabsTrigger value="sent"><Globe className="size-3.5 mr-1.5" />Sent</TabsTrigger>
            </TabsList>
            <TabsContent value="top" className="text-sm text-muted-foreground">3 unread notifications waiting for your review.</TabsContent>
            <TabsContent value="inbox" className="text-sm text-muted-foreground">You have 14 unread messages from your team.</TabsContent>
            <TabsContent value="sent" className="text-sm text-muted-foreground">Your last 5 outbound emails were delivered successfully.</TabsContent>
          </Tabs>
          <Separator className="my-4" />
          <Tabs defaultValue="bottom">
            <TabsContent value="bottom" className="text-sm text-muted-foreground mb-3">Tab content rendered above the strip.</TabsContent>
            <TabsContent value="bottom2" className="text-sm text-muted-foreground mb-3">Switch tabs to see the layout shift.</TabsContent>
            <TabsList>
              <TabsTrigger value="bottom">Content</TabsTrigger>
              <TabsTrigger value="bottom2">Layout</TabsTrigger>
            </TabsList>
          </Tabs>
        </SectionCard>

        <SectionCard title="Pills & Segmented" description="Pill tabs and segmented toggle for compact switching.">
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Pills</p>
              <Tabs defaultValue="all">
                <TabsList className="bg-transparent gap-1 p-0 h-auto">
                  {["all", "active", "archived"].map((v) => (
                    <TabsTrigger key={v} value={v} className="rounded-full px-3 h-7 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border capitalize">
                      {v}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="all" className="text-xs text-muted-foreground mt-2">Showing all 248 projects.</TabsContent>
                <TabsContent value="active" className="text-xs text-muted-foreground mt-2">42 active projects.</TabsContent>
                <TabsContent value="archived" className="text-xs text-muted-foreground mt-2">206 archived projects.</TabsContent>
              </Tabs>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Segmented control</p>
              <ToggleGroup type="single" defaultValue="day">
                <ToggleGroupItem value="day" aria-label="Day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week" aria-label="Week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month" aria-label="Month">Month</ToggleGroupItem>
                <ToggleGroupItem value="year" aria-label="Year">Year</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Icon segmented</p>
              <ToggleGroup type="single" defaultValue="grid">
                <ToggleGroupItem value="grid" aria-label="Grid view"><Layers className="size-4" /></ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view"><Menu className="size-4" /></ToggleGroupItem>
                <ToggleGroupItem value="history" aria-label="History"><History className="size-4" /></ToggleGroupItem>
                <ToggleGroupItem value="starred" aria-label="Starred"><Star className="size-4" /></ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Steps / Stepper" description="Multi-step progress indicator with clickable navigation.">
          <div className="space-y-4">
            <ol className="flex items-center">
              {steps.map((s, i) => {
                const done = i < activeStep;
                const active = i === activeStep;
                return (
                  <li key={s} className="flex items-center last:flex-none">
                    <button
                      className="flex flex-col items-center gap-1.5 group"
                      onClick={() => { setActiveStep(i); toast.info(`Jumped to ${s}`); }}
                    >
                      <span className={
                        "flex size-8 items-center justify-center rounded-full text-xs font-semibold border-2 transition-colors " +
                        (done ? "border-success bg-success text-success-foreground" :
                          active ? "border-primary bg-primary text-primary-foreground" :
                            "border-border bg-background text-muted-foreground group-hover:border-primary/50")
                      }>
                        {done ? <CheckCircle2 className="size-4" /> : i + 1}
                      </span>
                      <span className={"text-[11px] font-medium " + (active || done ? "text-foreground" : "text-muted-foreground")}>{s}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-2 mb-5 bg-border rounded-full overflow-hidden">
                        <div className={"h-full transition-all " + (done ? "bg-success w-full" : "bg-transparent w-0")} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Button variant="ghost" size="sm" className="h-8" disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
                <ChevronLeft className="size-4 mr-1" /> Back
              </Button>
              <span className="text-xs text-muted-foreground">Step {activeStep + 1} of {steps.length}</span>
              <Button size="sm" className="h-8" disabled={activeStep === steps.length - 1} onClick={() => setActiveStep((s) => s + 1)}>
                Next <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Pagination" description="Numbered pagination with prev/next" className="lg:col-span-1">
          <div className="flex flex-col items-center gap-4 py-6">
            <p className="text-xs text-muted-foreground">Page 3 of 12 · 248 results</p>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="size-8"><ChevronLeft className="size-4" /></Button>
              <Button variant="outline" size="icon" className="size-8">1</Button>
              <Button variant="outline" size="icon" className="size-8">2</Button>
              <Button size="icon" className="size-8">3</Button>
              <Button variant="outline" size="icon" className="size-8">4</Button>
              <span className="px-1 text-muted-foreground">…</span>
              <Button variant="outline" size="icon" className="size-8">12</Button>
              <Button variant="outline" size="icon" className="size-8"><ChevronRight className="size-4" /></Button>
            </div>
            <div className="flex gap-2 text-xs">
              <Button variant="ghost" size="sm" className="h-7" onClick={() => toast.info("Jumped to first page")}>First</Button>
              <Button variant="ghost" size="sm" className="h-7" onClick={() => toast.info("Jumped to last page")}>Last</Button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Menu Bar" description="Top menu bar with dropdowns" className="lg:col-span-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => toast.info("New project created")}>New Project<kbd className="ml-auto text-xs">⌘N</kbd></MenubarItem>
                <MenubarItem onClick={() => toast.info("Opened file picker")}>Open…<kbd className="ml-auto text-xs">⌘O</kbd></MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => toast.success("Saved to drafts")}>Save<kbd className="ml-auto text-xs">⌘S</kbd></MenubarItem>
                <MenubarItem>Export as PDF</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => toast.info("Undo")}>Undo<kbd className="ml-auto text-xs">⌘Z</kbd></MenubarItem>
                <MenubarItem onClick={() => toast.info("Redo")}>Redo<kbd className="ml-auto text-xs">⇧⌘Z</kbd></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => toast.info("Toggled sidebar")}>Toggle Sidebar</MenubarItem>
                <MenubarItem onClick={() => toast.info("Toggled theme")}>Toggle Theme</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Zoom In</MenubarItem>
                <MenubarItem>Zoom Out</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => toast.info("Opening docs")}>Documentation</MenubarItem>
                <MenubarItem onClick={() => toast.info("Opening shortcuts")}>Keyboard Shortcuts</MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => toast.info("Contact support")}>Contact Support</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { icon: User, label: "Profile" },
              { icon: Settings, label: "Settings" },
              { icon: CreditCard, label: "Billing" },
              { icon: Mail, label: "Inbox" },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <button key={m.label} className="flex items-center gap-2 rounded-md border border-border p-2 hover:bg-accent transition-colors" onClick={() => toast.info(`Opening ${m.label}`)}>
                  <Icon className="size-3.5 text-muted-foreground" /> {m.label}
                </button>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="File Tree" description="Custom collapsible file tree with nested folders, files, and badges.">
        <div className="rounded-lg border border-border bg-muted/30 p-3 max-h-80 overflow-y-auto">
          <Tree nodes={fileTree} />
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Dot className="size-4" />Tip: click a folder to expand or collapse, click a file to open it.
        </div>
      </SectionCard>
    </div>
  );
}
