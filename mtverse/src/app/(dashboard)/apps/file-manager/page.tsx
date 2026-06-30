"use client";

import * as React from "react";
import { useState } from "react";
import {
  Search, Upload, LayoutGrid, List, Folder, FileText, Image as ImageIcon, Film,
  Download, Music, Archive, FileCode, FileSpreadsheet, Star, MoreVertical,
  ChevronRight, Home, Trash2, FolderOpen, HardDrive, Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PageHeader, StatCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

type FileItem = {
  id: string; name: string; type: "folder" | "image" | "video" | "audio" | "doc" | "code" | "spreadsheet" | "archive" | "pdf";
  size?: string; modified: string; owner: string; starred?: boolean; shared?: boolean;
};

const folders = [
  { id: "documents", label: "Documents", icon: FileText, color: "bg-sky-500/15 text-sky-600", count: 42 },
  { id: "images", label: "Images", icon: ImageIcon, color: "bg-rose-500/15 text-rose-600", count: 218 },
  { id: "videos", label: "Videos", icon: Film, color: "bg-violet-500/15 text-violet-600", count: 14 },
  { id: "downloads", label: "Downloads", icon: Download, color: "bg-emerald-500/15 text-emerald-600", count: 87 },
  { id: "trash", label: "Trash", icon: Trash2, color: "bg-muted text-muted-foreground", count: 6 },
];

const folderContents: Record<string, FileItem[]> = {
  documents: [
    { id: "d1", name: "Q4 OKRs.docx", type: "doc", size: "248 KB", modified: "2 hours ago", owner: "AM", starred: true, shared: true },
    { id: "d2", name: "Architecture proposals", type: "folder", modified: "Yesterday", owner: "MH" },
    { id: "d3", name: "Customer research", type: "folder", modified: "3 days ago", owner: "LP", shared: true },
    { id: "d4", name: "Invoice INV-2024-0892.pdf", type: "pdf", size: "1.2 MB", modified: "4 days ago", owner: "AM", starred: true },
    { id: "d5", name: "Acme Corp contract v3.pdf", type: "pdf", size: "892 KB", modified: "1 week ago", owner: "PS", shared: true },
    { id: "d6", name: "Roadmap Q4.xlsx", type: "spreadsheet", size: "156 KB", modified: "1 week ago", owner: "JR" },
    { id: "d7", name: "Board deck Sep 2024.pptx", type: "doc", size: "8.4 MB", modified: "2 weeks ago", owner: "AM", shared: true },
    { id: "d8", name: "Hiring rubric.docx", type: "doc", size: "82 KB", modified: "3 weeks ago", owner: "AM" },
  ],
  images: [
    { id: "i1", name: "Dashboard v3 hero.png", type: "image", size: "2.1 MB", modified: "1 hour ago", owner: "SC", starred: true },
    { id: "i2", name: "Onboarding flow", type: "folder", modified: "Yesterday", owner: "SC" },
    { id: "i3", name: "Logo exports", type: "folder", modified: "2 days ago", owner: "SC", shared: true },
    { id: "i4", name: "Empty states set.png", type: "image", size: "1.8 MB", modified: "3 days ago", owner: "SC" },
    { id: "i5", name: "Marketing banners Q4.jpg", type: "image", size: "3.4 MB", modified: "5 days ago", owner: "JR" },
    { id: "i6", name: "Team headshots.zip", type: "archive", size: "24 MB", modified: "1 week ago", owner: "AM", shared: true },
    { id: "i7", name: "Screenshot 2024-09-24.png", type: "image", size: "824 KB", modified: "1 week ago", owner: "AM" },
  ],
  videos: [
    { id: "v1", name: "Product demo recording.mp4", type: "video", size: "184 MB", modified: "2 days ago", owner: "JR", starred: true },
    { id: "v2", name: "Customer interview — Acme.mp4", type: "video", size: "412 MB", modified: "4 days ago", owner: "LP", shared: true },
    { id: "v3", name: "All-hands Sep 2024.mp4", type: "video", size: "682 MB", modified: "1 week ago", owner: "AM" },
    { id: "v4", name: "Sprint retro recording.mp4", type: "video", size: "98 MB", modified: "2 weeks ago", owner: "MH" },
  ],
  downloads: [
    { id: "dl1", name: "figma-desktop.dmg", type: "archive", size: "142 MB", modified: "Yesterday", owner: "AM" },
    { id: "dl2", name: "node-v20.10.0.pkg", type: "archive", size: "42 MB", modified: "3 days ago", owner: "MH" },
    { id: "dl3", name: "bcrypt-spec.pdf", type: "pdf", size: "320 KB", modified: "5 days ago", owner: "MH" },
    { id: "dl4", name: "stripe-api-reference.json", type: "code", size: "1.8 MB", modified: "1 week ago", owner: "MH" },
    { id: "dl5", name: "wallpaper-aurora.jpg", type: "image", size: "4.2 MB", modified: "2 weeks ago", owner: "AM" },
  ],
  trash: [
    { id: "t1", name: "old-proposal-v1.docx", type: "doc", size: "82 KB", modified: "Auto-deleted in 24 days", owner: "AM" },
    { id: "t2", name: "screenshot-old.png", type: "image", size: "640 KB", modified: "Auto-deleted in 18 days", owner: "AM" },
    { id: "t3", name: "draft-meeting-notes.md", type: "code", size: "12 KB", modified: "Auto-deleted in 12 days", owner: "LP" },
  ],
};

const typeMeta: Record<FileItem["type"], { icon: LucideIcon; color: string }> = {
  folder: { icon: Folder, color: "bg-amber-500/15 text-amber-600" },
  image: { icon: ImageIcon, color: "bg-rose-500/15 text-rose-600" },
  video: { icon: Film, color: "bg-violet-500/15 text-violet-600" },
  audio: { icon: Music, color: "bg-fuchsia-500/15 text-fuchsia-600" },
  doc: { icon: FileText, color: "bg-sky-500/15 text-sky-600" },
  code: { icon: FileCode, color: "bg-emerald-500/15 text-emerald-600" },
  spreadsheet: { icon: FileSpreadsheet, color: "bg-success/15 text-success" },
  archive: { icon: Archive, color: "bg-muted text-muted-foreground" },
  pdf: { icon: FileText, color: "bg-destructive/15 text-destructive" },
};

const ownerColors: Record<string, string> = {
  AM: "bg-primary/15 text-primary",
  MH: "bg-emerald-500/15 text-emerald-600",
  SC: "bg-rose-500/15 text-rose-600",
  JR: "bg-sky-500/15 text-sky-600",
  PS: "bg-amber-500/15 text-amber-600",
  LP: "bg-fuchsia-500/15 text-fuchsia-600",
};

export default function FileManagerApp() {
  const [activeFolder, setActiveFolder] = useState("documents");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["Documents"]);

  const items = (folderContents[activeFolder] || []).filter((f) => !query || f.name.toLowerCase().includes(query.toLowerCase()));

  const openFolder = (id: string, label: string) => {
    setActiveFolder(id);
    setBreadcrumbs([label]);
    setSelected(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const totalSize = "412 GB";
  const usedPct = 68;

  return (
    <div className="space-y-6">
      <PageHeader
        title="File Manager"
        description="Browse, organize, and share your team's files and assets."
        breadcrumbs={[{ label: "Apps" }, { label: "File Manager" }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="h-9" onClick={() => toast.message("New folder created")}><Folder className="size-4 mr-2" /> New folder</Button>
            <Button size="sm" className="h-9" onClick={() => toast.success("Upload started", { description: "3 files queued" })}><Upload className="size-4 mr-2" /> Upload</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Files" value="367" icon={<FolderOpen className="size-5" />} footer="Across 5 folders" />
        <StatCard label="Storage Used" value="412 GB" icon={<HardDrive className="size-5" />} footer="68% of 600 GB" />
        <StatCard label="Shared" value="48" icon={<Download className="size-5" />} footer="Files shared this month" />
        <StatCard label="Recent" value="14" icon={<Clock className="size-5" />} footer="Edited in last 24h" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        {/* Sidebar */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-3 border-b border-border">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Locations</p>
            <div className="space-y-0.5">
              {folders.map((f) => {
                const Icon = f.icon;
                return (
                  <button key={f.id} onClick={() => openFolder(f.id, f.label)} className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${activeFolder === f.id ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}>
                    <span className={`size-6 rounded-md flex items-center justify-center ${f.color}`}><Icon className="size-3.5" /></span>
                    <span className="flex-1 text-left">{f.label}</span>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5">{f.count}</Badge>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Storage</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium">{totalSize} / 600 GB</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${usedPct}%` }} />
              </div>
              <Button variant="outline" size="sm" className="w-full h-8 text-xs mt-2" onClick={() => toast.message("Upgrade plan opened")}>Upgrade storage</Button>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-border gap-2">
            <div className="flex items-center gap-1.5 text-sm min-w-0">
              <Home className="size-3.5 text-muted-foreground shrink-0" />
              {breadcrumbs.map((b, i) => (
                <React.Fragment key={i}>
                  <ChevronRight className="size-3.5 text-muted-foreground shrink-0" />
                  <span className={i === breadcrumbs.length - 1 ? "font-medium" : "text-muted-foreground"}>{b}</span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search files…" className="pl-9 h-9 w-56" />
              </div>
              <div className="flex items-center gap-0.5 border border-border rounded-md p-0.5">
                <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="size-7" onClick={() => setView("grid")}><LayoutGrid className="size-3.5" /></Button>
                <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="size-7" onClick={() => setView("list")}><List className="size-3.5" /></Button>
              </div>
            </div>
          </div>

          {selected.size > 0 && (
            <div className="flex items-center justify-between p-2.5 border-b border-border bg-primary/5">
              <span className="text-xs font-medium">{selected.size} selected</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.message("Download started")}><Download className="size-3.5 mr-1" /> Download</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toast.message("Share link copied")}><Folder className="size-3.5 mr-1" /> Move</Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={() => { setSelected(new Set()); toast.message("Moved to trash"); }}><Trash2 className="size-3.5 mr-1" /> Delete</Button>
              </div>
            </div>
          )}

          <ScrollArea className="max-h-[calc(100vh-380px)]">
            {view === "grid" ? (
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {items.map((f) => {
                  const meta = typeMeta[f.type];
                  const Icon = meta.icon;
                  const isSel = selected.has(f.id);
                  return (
                    <div key={f.id} onClick={() => toggleSelect(f.id)} className={`group relative rounded-xl border bg-card p-3 cursor-pointer transition-all hover:shadow-md ${isSel ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
                      <div className="flex flex-col items-center text-center">
                        <div className={`size-12 rounded-xl ${meta.color} flex items-center justify-center mb-2`}>
                          <Icon className="size-6" />
                        </div>
                        <p className="text-xs font-medium truncate w-full">{f.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{f.size ?? "—"} · {f.modified}</p>
                      </div>
                      <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {f.starred && <Star className="size-3 text-amber-500 fill-amber-500" />}
                        <Button variant="secondary" size="icon" className="size-6 shadow-sm" onClick={(e) => { e.stopPropagation(); toast.message("File menu"); }}><MoreVertical className="size-3" /></Button>
                      </div>
                      {f.shared && <div className="absolute top-1.5 left-1.5"><Badge variant="outline" className="text-[9px] h-4 px-1 bg-info/10 text-info border-info/20">Shared</Badge></div>}
                    </div>
                  );
                })}
                {items.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <FolderOpen className="size-10 text-muted-foreground/40 mb-2" />
                    <p className="text-sm text-muted-foreground">No files here</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-border">
                <div className="grid grid-cols-[1fr_100px_120px_80px_40px] gap-2 p-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/30">
                  <span className="pl-1">Name</span><span>Size</span><span>Modified</span><span>Owner</span><span></span>
                </div>
                {items.map((f) => {
                  const meta = typeMeta[f.type];
                  const Icon = meta.icon;
                  const isSel = selected.has(f.id);
                  return (
                    <div key={f.id} onClick={() => toggleSelect(f.id)} className={`grid grid-cols-[1fr_100px_120px_80px_40px] gap-2 p-2.5 items-center cursor-pointer transition-colors ${isSel ? "bg-primary/5" : "hover:bg-accent/50"}`}>
                      <div className="flex items-center gap-2.5 min-w-0 pl-1">
                        <div className={`size-7 rounded-md ${meta.color} flex items-center justify-center shrink-0`}>
                          <Icon className="size-3.5" />
                        </div>
                        <span className="text-xs font-medium truncate">{f.name}</span>
                        {f.starred && <Star className="size-3 text-amber-500 fill-amber-500 shrink-0" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{f.size ?? "—"}</span>
                      <span className="text-xs text-muted-foreground truncate">{f.modified}</span>
                      <Avatar className="size-6"><AvatarFallback className={`text-[9px] font-semibold ${ownerColors[f.owner] ?? "bg-muted text-muted-foreground"}`}>{f.owner}</AvatarFallback></Avatar>
                      <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" onClick={(e) => { e.stopPropagation(); toast.message("File menu"); }}><MoreVertical className="size-3.5" /></Button>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
