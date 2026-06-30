"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ImageIcon, Video, FileText, Music, Archive, MoreHorizontal,
  Download, Share2, Trash, Star, Eye, X, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

type Media = {
  id: string;
  name: string;
  type: "image" | "video" | "doc";
  gradient: string;
  size: string;
  modified: string;
  starred: boolean;
};

const media: Media[] = [
  { id: "m1", name: "aurora-hero.png", type: "image", gradient: "from-orange-400 to-pink-500", size: "2.4 MB", modified: "2h ago", starred: true },
  { id: "m2", name: "design-system-v2.fig", type: "image", gradient: "from-violet-400 to-fuchsia-500", size: "8.1 MB", modified: "5h ago", starred: false },
  { id: "m3", name: "demo-walkthrough.mp4", type: "video", gradient: "from-rose-400 to-red-500", size: "24.4 MB", modified: "1d ago", starred: true },
  { id: "m4", name: "onboarding-tour.mp4", type: "video", gradient: "from-amber-400 to-orange-500", size: "18.2 MB", modified: "2d ago", starred: false },
  { id: "m5", name: "q4-roadmap.pdf", type: "doc", gradient: "from-cyan-400 to-blue-500", size: "1.2 MB", modified: "3d ago", starred: false },
  { id: "m6", name: "team-handbook.pdf", type: "doc", gradient: "from-emerald-400 to-teal-500", size: "3.8 MB", modified: "5d ago", starred: false },
  { id: "m7", name: "dashboard-mock.png", type: "image", gradient: "from-indigo-400 to-purple-500", size: "1.8 MB", modified: "1w ago", starred: true },
  { id: "m8", name: "logo-pack.zip", type: "doc", gradient: "from-slate-400 to-gray-500", size: "12.4 MB", modified: "1w ago", starred: false },
  { id: "m9", name: "launch-video.mp4", type: "video", gradient: "from-pink-400 to-rose-500", size: "42.1 MB", modified: "2w ago", starred: false },
  { id: "m10", name: "patterns-guide.pdf", type: "doc", gradient: "from-lime-400 to-green-500", size: "2.1 MB", modified: "2w ago", starred: false },
  { id: "m11", name: "team-photo.png", type: "image", gradient: "from-teal-400 to-cyan-500", size: "4.2 MB", modified: "3w ago", starred: false },
  { id: "m12", name: "interview.mp4", type: "video", gradient: "from-yellow-400 to-amber-500", size: "68.0 MB", modified: "1mo ago", starred: false },
];

const typeConfig = {
  image: { icon: ImageIcon, color: "bg-primary/10 text-primary" },
  video: { icon: Video, color: "bg-warning/10 text-warning" },
  doc: { icon: FileText, color: "bg-info/10 text-info" },
};

export default function MediaGalleryPage() {
  const [filter, setFilter] = React.useState("all");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [selectMode, setSelectMode] = React.useState(false);
  const [lightbox, setLightbox] = React.useState<Media | null>(null);

  const filtered = React.useMemo(() => {
    if (filter === "all") return media;
    if (filter === "starred") return media.filter((m) => m.starred);
    return media.filter((m) => m.type === filter);
  }, [filter]);

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const exitSelect = () => {
    setSelectMode(false);
    setSelected(new Set());
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Gallery"
        description="Grid of media items with filtering, lightbox and multi-select mode."
        breadcrumbs={[{ label: "UI Library" }, { label: "Media Gallery" }]}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectMode((v) => !v)}>
              <Check className="size-4 mr-1.5" /> {selectMode ? "Exit select" : "Select"}
            </Button>
            <Button size="sm"><Archive className="size-4 mr-1.5" /> Upload</Button>
          </>
        }
      />

      <SectionCard
        title="All Media"
        description={`${filtered.length} items · ${selected.size} selected`}
        actions={
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="h-8">
              <TabsTrigger value="all" className="text-xs h-6">All</TabsTrigger>
              <TabsTrigger value="image" className="text-xs h-6">Images</TabsTrigger>
              <TabsTrigger value="video" className="text-xs h-6">Videos</TabsTrigger>
              <TabsTrigger value="doc" className="text-xs h-6">Docs</TabsTrigger>
              <TabsTrigger value="starred" className="text-xs h-6">Starred</TabsTrigger>
            </TabsList>
          </Tabs>
        }
      >
        {selectMode && (
          <div className="mb-3 p-2 rounded-md bg-primary/5 border border-primary/20 flex items-center justify-between text-xs">
            <span className="font-medium">{selected.size} of {filtered.length} selected</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="h-7" onClick={() => setSelected(new Set(filtered.map(m => m.id)))}>Select all</Button>
              <Button size="sm" variant="ghost" className="h-7" onClick={() => setSelected(new Set())}>Clear</Button>
              <Button size="sm" variant="ghost" className="h-7" onClick={() => toast.success(`Downloaded ${selected.size} items`)}><Download className="size-3 mr-1" /> Download</Button>
              <Button size="sm" variant="ghost" className="h-7 text-destructive" onClick={() => { toast.error(`Deleted ${selected.size} items`); exitSelect(); }}><Trash className="size-3 mr-1" /> Delete</Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((m) => {
            const { icon: TypeIcon, color } = typeConfig[m.type];
            const isSelected = selected.has(m.id);
            return (
              <div
                key={m.id}
                className={cn(
                  "group relative rounded-lg border bg-card overflow-hidden transition-all cursor-pointer",
                  isSelected ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/40 hover:shadow-md"
                )}
                onClick={() => selectMode ? toggleSelect(m.id) : setLightbox(m)}
              >
                <div className={cn("relative aspect-[4/3] bg-gradient-to-br flex items-center justify-center", m.gradient)}>
                  <TypeIcon className="size-12 text-white drop-shadow" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className={cn("gap-1 text-[10px] backdrop-blur", color)}>
                      <TypeIcon className="size-2.5" /> {m.type}
                    </Badge>
                  </div>
                  {m.starred && (
                    <div className="absolute top-2 right-2 size-6 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
                      <Star className="size-3 fill-warning text-warning" />
                    </div>
                  )}
                  {selectMode && (
                    <div className="absolute top-2 right-2 size-5 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
                      {isSelected ? (
                        <div className="size-4 rounded-full bg-primary flex items-center justify-center"><Check className="size-2.5 text-primary-foreground" /></div>
                      ) : (
                        <div className="size-4 rounded-full border border-border" />
                      )}
                    </div>
                  )}
                  {!selectMode && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                      <Button size="icon" variant="secondary" className="size-7" onClick={(e) => { e.stopPropagation(); setLightbox(m); }}><Eye className="size-3.5" /></Button>
                      <Button size="icon" variant="secondary" className="size-7" onClick={(e) => { e.stopPropagation(); toast.success("Download started"); }}><Download className="size-3.5" /></Button>
                      <Button size="icon" variant="secondary" className="size-7" onClick={(e) => { e.stopPropagation(); toast.info("Share link copied"); }}><Share2 className="size-3.5" /></Button>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{m.name}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{m.size}</span>
                    <span className="text-[10px] text-muted-foreground">{m.modified}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">
            No media in this category.
          </div>
        )}
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Storage Usage" description="By media type">
          <div className="space-y-3">
            {[
              { type: "Images", size: "82.4 MB", count: 24, percent: 38, color: "bg-primary" },
              { type: "Videos", size: "142.8 MB", count: 8, percent: 58, color: "bg-warning" },
              { type: "Documents", size: "18.6 MB", count: 16, percent: 8, color: "bg-info" },
            ].map((s) => (
              <div key={s.type}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{s.type}</span>
                  <span className="text-xs text-muted-foreground">{s.size} · {s.count} files</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={cn("h-full rounded-full", s.color)} style={{ width: `${s.percent}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Total used</span>
              <span className="font-medium">243.8 MB of 2 GB</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent Uploads" description="Latest 4 items">
          <div className="space-y-2">
            {media.slice(0, 4).map((m) => (
              <div key={m.id} className="flex items-center gap-2 rounded-md border border-border p-2">
                <div className={cn("flex size-8 items-center justify-center rounded bg-gradient-to-br", m.gradient)}>
                  {(() => { const T = typeConfig[m.type].icon; return <T className="size-4 text-white" />; })()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{m.name}</p>
                  <p className="text-[10px] text-muted-foreground">{m.size} · {m.modified}</p>
                </div>
                <Button variant="ghost" size="icon" className="size-6" onClick={() => setLightbox(m)}><Eye className="size-3" /></Button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quick Filters" description="Common media views">
          <div className="space-y-2">
            {[
              { label: "Starred items", count: 3, icon: Star, color: "text-warning" },
              { label: "Images only", count: 4, icon: ImageIcon, color: "text-primary" },
              { label: "Videos only", count: 4, icon: Video, color: "text-warning" },
              { label: "Documents", count: 4, icon: FileText, color: "text-info" },
              { label: "Large files (>10MB)", count: 3, icon: Archive, color: "text-muted-foreground" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <button key={f.label} className="flex items-center gap-2 w-full rounded-md border border-border p-2 hover:bg-accent transition-colors text-left" onClick={() => toast.info(`Filtering: ${f.label}`)}>
                  <Icon className={cn("size-3.5", f.color)} />
                  <span className="text-xs flex-1">{f.label}</span>
                  <Badge variant="outline" className="text-[10px]">{f.count}</Badge>
                </button>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">{lightbox?.name}</DialogTitle>
          <DialogDescription className="sr-only">Media preview</DialogDescription>
          {lightbox && (
            <div>
              <div className={cn("aspect-video bg-gradient-to-br flex items-center justify-center relative", lightbox.gradient)}>
                {(() => { const T = typeConfig[lightbox.type].icon; return <T className="size-20 text-white drop-shadow-lg" />; })()}
                <Button variant="secondary" size="icon" className="absolute top-3 right-3 size-8" onClick={() => setLightbox(null)}><X className="size-4" /></Button>
                <div className="absolute bottom-3 left-3 flex gap-1">
                  <Button variant="secondary" size="icon" className="size-8" onClick={() => toast.success("Downloaded")}><Download className="size-3.5" /></Button>
                  <Button variant="secondary" size="icon" className="size-8" onClick={() => toast.info("Share link copied")}><Share2 className="size-3.5" /></Button>
                  <Button variant="secondary" size="icon" className="size-8" onClick={() => toast.success(lightbox.starred ? "Removed from starred" : "Added to starred")}><Star className={cn("size-3.5", lightbox.starred && "fill-warning text-warning")} /></Button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{lightbox.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{lightbox.size} · modified {lightbox.modified}</p>
                </div>
                <Badge variant="outline" className="capitalize">{lightbox.type}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
