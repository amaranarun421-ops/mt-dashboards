"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
  CommandSeparator, CommandShortcut,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search, Command as CmdIcon, FileText, User, Settings, Bell, LayoutGrid,
  Calendar, Mail, CreditCard, Star, Folder, Plus, ArrowRight, Moon, Sun,
  LogOut, HelpCircle, Globe, Download, Zap, Home, BarChart3, ShoppingCart,
} from "lucide-react";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function CommandPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setDialogOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Command Palette"
        description="cmdk-powered command component in inline, dialog and grouped modes."
        breadcrumbs={[{ label: "UI Library" }, { label: "Command" }]}
        actions={
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            <CmdIcon className="size-4 mr-1.5" /> Open palette
            <Badge variant="outline" className="ml-2 text-[10px] bg-background/20 border-background/30 text-foreground">⌘K</Badge>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Inline Command" description="Always-visible command palette">
          <Command className="rounded-lg border border-border shadow-sm">
            <CommandInput placeholder="Type a command or search…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem onSelect={() => toast.info("Opening calendar")}>
                  <Calendar className="size-4" /> Calendar
                  <CommandShortcut>⌘C</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening inbox")}>
                  <Mail className="size-4" /> Inbox
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening settings")}>
                  <Settings className="size-4" /> Settings
                  <CommandShortcut>⌘,</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening notifications")}>
                  <Bell className="size-4" /> Notifications
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Quick actions">
                <CommandItem onSelect={() => toast.success("New project created")}>
                  <Plus className="size-4" /> New project
                </CommandItem>
                <CommandItem onSelect={() => toast.success("Inviting member…")}>
                  <User className="size-4" /> Invite member
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Exporting data…")}>
                  <Download className="size-4" /> Export workspace
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </SectionCard>

        <SectionCard title="Navigation Mode" description="Grouped navigation commands">
          <Command className="rounded-lg border border-border shadow-sm">
            <CommandInput placeholder="Jump to…" />
            <CommandList>
              <CommandEmpty>No matching pages.</CommandEmpty>
              <CommandGroup heading="Dashboards">
                <CommandItem onSelect={() => toast.info("Loading analytics")}>
                  <BarChart3 className="size-4" /> Analytics
                  <CommandShortcut>↵</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Loading ecommerce")}>
                  <ShoppingCart className="size-4" /> Ecommerce
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Loading CRM")}>
                  <User className="size-4" /> CRM
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Apps">
                <CommandItem onSelect={() => toast.info("Loading calendar")}>
                  <Calendar className="size-4" /> Calendar
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Loading email")}>
                  <Mail className="size-4" /> Email
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Loading files")}>
                  <Folder className="size-4" /> Files
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Enterprise">
                <CommandItem onSelect={() => toast.info("Loading team")}>
                  <User className="size-4" /> Team
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Loading billing")}>
                  <CreditCard className="size-4" /> Billing
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Loading security")}>
                  <Settings className="size-4" /> Security
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </SectionCard>

        <SectionCard title="Search Mode" description="File & member search">
          <Command className="rounded-lg border border-border shadow-sm">
            <CommandInput placeholder="Search files, members, projects…" />
            <CommandList>
              <CommandEmpty>No matches.</CommandEmpty>
              <CommandGroup heading="Files">
                <CommandItem onSelect={() => toast.info("Opening file")}>
                  <FileText className="size-4" /> Q4-roadmap.pdf
                  <CommandShortcut>2 days ago</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening file")}>
                  <FileText className="size-4" /> design-system-v2.fig
                  <CommandShortcut>5d ago</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening file")}>
                  <FileText className="size-4" /> mobile-sdk-spec.md
                  <CommandShortcut>1w ago</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Members">
                <CommandItem onSelect={() => toast.info("Viewing member")}>
                  <User className="size-4" /> Aria Montgomery
                  <CommandShortcut>Admin</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Viewing member")}>
                  <User className="size-4" /> Jordan Lee
                  <CommandShortcut>Editor</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Viewing member")}>
                  <User className="size-4" /> Sam Khoury
                  <CommandShortcut>Viewer</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Projects">
                <CommandItem onSelect={() => toast.info("Opening project")}>
                  <Folder className="size-4" /> Aurora Web App
                  <CommandShortcut>14 members</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening project")}>
                  <Folder className="size-4" /> Mobile SDK v3
                  <CommandShortcut>6 members</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </SectionCard>

        <SectionCard title="Action Commands" description="Runnable commands with shortcuts">
          <Command className="rounded-lg border border-border shadow-sm">
            <CommandInput placeholder="Run a command…" />
            <CommandList>
              <CommandEmpty>No matching commands.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => toast.success("Project created")}>
                  <Plus className="size-4" /> Create new project
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Search opened")}>
                  <Search className="size-4" /> Search everywhere
                  <CommandShortcut>⌘F</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.success("Bookmarked")}>
                  <Star className="size-4" /> Bookmark current page
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening help")}>
                  <HelpCircle className="size-4" /> Open help center
                  <CommandShortcut>F1</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Preferences">
                <CommandItem onSelect={() => toast.info("Toggling theme")}>
                  <Moon className="size-4" /> Toggle dark mode
                  <CommandShortcut>⌘J</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening settings")}>
                  <Settings className="size-4" /> Open settings
                  <CommandShortcut>⌘,</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Opening shortcuts")}>
                  <Zap className="size-4" /> Keyboard shortcuts
                  <CommandShortcut>⌘/</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Account">
                <CommandItem onSelect={() => toast.info("Loading profile")}>
                  <User className="size-4" /> View profile
                </CommandItem>
                <CommandItem onSelect={() => toast.info("Loading billing")}>
                  <CreditCard className="size-4" /> Billing & plans
                </CommandItem>
                <CommandItem onSelect={() => toast.warning("Are you sure?")} className="text-destructive data-[selected=true]:text-destructive">
                  <LogOut className="size-4" /> Sign out
                  <CommandShortcut>⌘⇧Q</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </SectionCard>

        <SectionCard title="With Footer Hints" description="Command palette with action row">
          <Command className="rounded-lg border border-border shadow-sm">
            <CommandInput placeholder="Try “create project” or “@aria”…" />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Recent">
                <CommandItem><Home className="size-4" /> Dashboard</CommandItem>
                <CommandItem><LayoutGrid className="size-4" /> Projects</CommandItem>
                <CommandItem><Bell className="size-4" /> Notifications</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Discover">
                <CommandItem><Globe className="size-4" /> Public templates</CommandItem>
                <CommandItem><Star className="size-4" /> Featured this week</CommandItem>
                <CommandItem><ArrowRight className="size-4" /> Browse all</CommandItem>
              </CommandGroup>
            </CommandList>
            <div className="flex items-center justify-between px-3 py-2 border-t border-border text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-muted rounded">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-muted rounded">↵</kbd> Select</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-muted rounded">Esc</kbd> Close</span>
              </div>
              <span className="flex items-center gap-1"><Sun className="size-3" /> MTVerse Search</span>
            </div>
          </Command>
        </SectionCard>

        <SectionCard title="Dialog Mode" description="Toggle the dialog variant below">
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-muted-foreground">
              The dialog variant centers the command palette over your app, triggered by <kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">⌘K</kbd> or the button.
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <CmdIcon className="size-4 mr-1.5" /> Open command dialog
            </Button>
            <div className="mt-2 w-full space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Available shortcuts:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { k: "⌘K", d: "Toggle palette" },
                  { k: "⌘N", d: "New project" },
                  { k: "⌘F", d: "Search files" },
                  { k: "⌘,", d: "Settings" },
                ].map((s) => (
                  <div key={s.k} className="flex items-center justify-between rounded-md border border-border p-2">
                    <span className="text-muted-foreground">{s.d}</span>
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">{s.k}</kbd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="p-0 overflow-hidden max-w-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Command palette</DialogTitle>
            <DialogDescription>Search commands and navigate.</DialogDescription>
          </DialogHeader>
          <Command>
            <CommandInput placeholder="Type a command or search…" autoFocus />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Quick navigation">
                <CommandItem onSelect={() => { setDialogOpen(false); toast.info("Going to dashboard"); }}>
                  <Home className="size-4" /> Go to dashboard
                  <CommandShortcut>⌘1</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => { setDialogOpen(false); toast.info("Going to projects"); }}>
                  <Folder className="size-4" /> Go to projects
                  <CommandShortcut>⌘2</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => { setDialogOpen(false); toast.info("Going to analytics"); }}>
                  <BarChart3 className="size-4" /> Go to analytics
                  <CommandShortcut>⌘3</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => { setDialogOpen(false); toast.success("Project created"); }}>
                  <Plus className="size-4" /> Create new project
                </CommandItem>
                <CommandItem onSelect={() => { setDialogOpen(false); toast.success("Invitation sent"); }}>
                  <User className="size-4" /> Invite member
                </CommandItem>
                <CommandItem onSelect={() => { setDialogOpen(false); toast.info("Exporting…"); }}>
                  <Download className="size-4" /> Export data
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Help">
                <CommandItem onSelect={() => { setDialogOpen(false); toast.info("Opening docs"); }}>
                  <HelpCircle className="size-4" /> Documentation
                </CommandItem>
                <CommandItem onSelect={() => { setDialogOpen(false); toast.info("Starting chat"); }}>
                  <Mail className="size-4" /> Contact support
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}
