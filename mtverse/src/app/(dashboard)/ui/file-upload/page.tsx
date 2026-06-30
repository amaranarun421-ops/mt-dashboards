"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Upload, FileText, FileImage, FileVideo, FileArchive, File as FileIcon,
  X, CheckCircle2, AlertCircle, Loader2, Paperclip, Trash2, Eye, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

type UploadFile = {
  id: string;
  name: string;
  size: number;
  type: "image" | "video" | "pdf" | "zip" | "doc";
  progress: number;
  status: "uploading" | "done" | "error";
};

const typeIcon = {
  image: { icon: FileImage, color: "bg-primary/10 text-primary" },
  video: { icon: FileVideo, color: "bg-warning/10 text-warning" },
  pdf: { icon: FileText, color: "bg-destructive/10 text-destructive" },
  zip: { icon: FileArchive, color: "bg-info/10 text-info" },
  doc: { icon: FileIcon, color: "bg-muted text-muted-foreground" },
};

const initialFiles: UploadFile[] = [
  { id: "1", name: "aurora-spec-v2.pdf", size: 4_280_000, type: "pdf", progress: 100, status: "done" },
  { id: "2", name: "design-system-v2.fig", size: 8_120_000, type: "image", progress: 68, status: "uploading" },
  { id: "3", name: "demo-walkthrough.mp4", size: 24_400_000, type: "video", progress: 100, status: "done" },
  { id: "4", name: "source-assets.zip", size: 12_900_000, type: "zip", progress: 100, status: "error" },
  { id: "5", name: "team-notes.docx", size: 84_000, type: "doc", progress: 100, status: "done" },
];

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function FileUploadPage() {
  const [files, setFiles] = React.useState<UploadFile[]>(initialFiles);
  const [dragOver, setDragOver] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => {
      setFiles((prev) => prev.map((f) => {
        if (f.status === "uploading" && f.progress < 100) {
          const next = Math.min(100, f.progress + 8);
          return { ...f, progress: next, status: next === 100 ? "done" : "uploading" };
        }
        return f;
      }));
    }, 600);
    return () => clearInterval(t);
  }, []);

  const addFiles = () => {
    const samples = [
      { name: "screenshot-2024-12.png", size: 1_240_000, type: "image" as const },
      { name: "release-notes.pdf", size: 320_000, type: "pdf" as const },
      { name: "old-archive.zip", size: 4_800_000, type: "zip" as const },
    ];
    const pick = samples[Math.floor(Math.random() * samples.length)];
    const newFile: UploadFile = {
      id: Date.now().toString(),
      name: pick.name,
      size: pick.size,
      type: pick.type,
      progress: 0,
      status: "uploading",
    };
    setFiles((prev) => [newFile, ...prev]);
    toast.success(`Added ${pick.name}`);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.info("File removed");
  };

  const retry = (id: string) => {
    setFiles((prev) => prev.map((f) => f.id === id ? { ...f, status: "uploading", progress: 0 } : f));
    toast.info("Retrying upload…");
  };

  const totalSize = files.reduce((s, f) => s + f.size, 0);
  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="File Upload"
        description="Drag-drop zone, file list with progress bars, retry on failure and per-type icons."
        breadcrumbs={[{ label: "UI Library" }, { label: "File Upload" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionCard title="Upload Zone" description="Drag files here or click to browse" className="lg:col-span-2">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(); }}
            onClick={addFiles}
            className={cn(
              "rounded-lg border-2 border-dashed p-10 text-center cursor-pointer transition-colors",
              dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/50"
            )}
          >
            <div className={cn(
              "mx-auto flex size-14 items-center justify-center rounded-2xl transition-colors",
              dragOver ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <Upload className="size-6" />
            </div>
            <p className="text-sm font-medium mt-4">{dragOver ? "Drop to upload" : "Drag files here or click to browse"}</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, PDF, MP4, ZIP up to 25 MB each</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button size="sm" variant="outline"><Paperclip className="size-3.5 mr-1.5" /> Choose files</Button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-border p-2">
              <p className="text-lg font-bold">{files.length}</p>
              <p className="text-[10px] text-muted-foreground">Files</p>
            </div>
            <div className="rounded-lg border border-border p-2">
              <p className="text-lg font-bold">{doneCount}</p>
              <p className="text-[10px] text-muted-foreground">Uploaded</p>
            </div>
            <div className="rounded-lg border border-border p-2">
              <p className="text-lg font-bold">{formatSize(totalSize)}</p>
              <p className="text-[10px] text-muted-foreground">Total size</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Accepted Types" description="Common file formats">
          <div className="space-y-2">
            {[
              { ext: "PNG, JPG, WEBP", size: "Up to 25 MB", icon: FileImage, color: "bg-primary/10 text-primary" },
              { ext: "MP4, MOV, WEBM", size: "Up to 100 MB", icon: FileVideo, color: "bg-warning/10 text-warning" },
              { ext: "PDF, DOC, DOCX", size: "Up to 25 MB", icon: FileText, color: "bg-destructive/10 text-destructive" },
              { ext: "ZIP, TAR, GZ", size: "Up to 250 MB", icon: FileArchive, color: "bg-info/10 text-info" },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.ext} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                  <div className={cn("flex size-8 items-center justify-center rounded-md", t.color)}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{t.ext}</p>
                    <p className="text-[10px] text-muted-foreground">{t.size}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Upload Queue"
        description={`${files.length} files · ${doneCount} complete · ${files.filter(f => f.status === "uploading").length} uploading`}
        actions={
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => { setFiles([]); toast.info("Queue cleared"); }}>
            <Trash2 className="size-3.5 mr-1" /> Clear all
          </Button>
        }
      >
        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {files.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-10 text-center">
              <Upload className="size-8 mx-auto text-muted-foreground" />
              <p className="text-sm font-medium mt-3">No files in queue</p>
              <p className="text-xs text-muted-foreground mt-1">Files you add will appear here.</p>
              <Button size="sm" variant="outline" className="mt-3" onClick={addFiles}><Upload className="size-3.5 mr-1.5" /> Add files</Button>
            </div>
          )}
          {files.map((f) => {
            const { icon: Icon, color } = typeIcon[f.type];
            return (
              <div key={f.id} className="rounded-lg border border-border p-3 hover:bg-accent/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn("flex size-10 items-center justify-center rounded-md shrink-0", color)}>
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{f.name}</p>
                      {f.status === "done" && <CheckCircle2 className="size-3.5 text-success shrink-0" />}
                      {f.status === "error" && <AlertCircle className="size-3.5 text-destructive shrink-0" />}
                      {f.status === "uploading" && <Loader2 className="size-3.5 text-primary shrink-0 animate-spin" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">{formatSize(f.size)}</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className={cn(
                        "text-[10px] font-medium",
                        f.status === "done" && "text-success",
                        f.status === "error" && "text-destructive",
                        f.status === "uploading" && "text-primary"
                      )}>
                        {f.status === "done" ? "Completed" : f.status === "error" ? "Failed" : "Uploading…"}
                      </span>
                    </div>
                    {f.status === "uploading" && (
                      <div className="mt-1.5">
                        <Progress value={f.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {f.status === "error" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => retry(f.id)}>Retry</Button>
                    )}
                    {f.status === "done" && (
                      <>
                        <Button variant="ghost" size="icon" className="size-7" onClick={() => toast.info("Previewing file")}><Eye className="size-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="size-7" onClick={() => toast.success("Download started")}><Download className="size-3.5" /></Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-destructive" onClick={() => removeFile(f.id)}>
                      <X className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Compact List" description="Smaller file rows for inline use">
          <div className="space-y-1.5">
            {files.slice(0, 4).map((f) => {
              const { icon: Icon, color } = typeIcon[f.type];
              return (
                <div key={f.id} className="flex items-center gap-2 rounded-md border border-border px-2 py-1.5">
                  <div className={cn("flex size-6 items-center justify-center rounded", color)}>
                    <Icon className="size-3" />
                  </div>
                  <span className="text-xs flex-1 truncate">{f.name}</span>
                  <span className="text-[10px] text-muted-foreground">{formatSize(f.size)}</span>
                  {f.status === "done" && <Badge variant="outline" className="text-[9px] bg-success/10 text-success border-success/20">done</Badge>}
                  {f.status === "error" && <Badge variant="outline" className="text-[9px] bg-destructive/10 text-destructive border-destructive/20">fail</Badge>}
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="Drop Variants" description="Different dropzone styles">
          <div className="space-y-3">
            <div className="rounded-md border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
              Default dropzone
            </div>
            <div className="rounded-md border-2 border-primary/40 bg-primary/5 p-4 text-center text-xs text-primary font-medium">
              Active (drag over) state
            </div>
            <div className="rounded-md border border-dashed border-destructive/50 bg-destructive/5 p-4 text-center text-xs text-destructive">
              Error state — file too large
            </div>
            <div className="rounded-md border border-dashed border-success/50 bg-success/5 p-4 text-center text-xs text-success font-medium">
              Success state — files uploaded
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
