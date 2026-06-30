"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Badge, Progress } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  UploadCloud, File as FileIcon, FileText, Image as ImageIcon, FileVideo,
  FileArchive, FileSpreadsheet, X, Check, Download, Eye, MoreHorizontal,
  Music, FileCode,
} from "lucide-react";

type UploadFile = {
  id: string;
  name: string;
  size: string;
  type: "image" | "pdf" | "video" | "zip" | "spreadsheet" | "doc" | "audio" | "code";
  progress: number;
  status: "uploading" | "done" | "queued" | "error";
};

const TYPE_ICON: Record<UploadFile["type"], React.ComponentType<{ className?: string }>> = {
  image: ImageIcon,
  pdf: FileText,
  video: FileVideo,
  zip: FileArchive,
  spreadsheet: FileSpreadsheet,
  doc: FileText,
  audio: Music,
  code: FileCode,
};

const TYPE_TONE: Record<UploadFile["type"], string> = {
  image: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
  pdf: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
  video: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  zip: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  spreadsheet: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  doc: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  audio: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  code: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

const INITIAL_FILES: UploadFile[] = [
  { id: "f1", name: "Q3-roadmap.pdf", size: "2.4 MB", type: "pdf", progress: 100, status: "done" },
  { id: "f2", name: "brand-guidelines.fig", size: "18.7 MB", type: "image", progress: 100, status: "done" },
  { id: "f3", name: "demo-recording.mp4", size: "44.2 MB", type: "video", progress: 62, status: "uploading" },
  { id: "f4", name: "assets.zip", size: "8.1 MB", type: "zip", progress: 0, status: "queued" },
];

export default function FileUploadPage() {
  const [files, setFiles] = useState<UploadFile[]>(INITIAL_FILES);
  const [gallery, setGallery] = useState([1, 2, 3]);

  const removeFile = (id: string) => setFiles((p) => p.filter((f) => f.id !== id));
  const simulateUpload = () => {
    const id = `f${Date.now()}`;
    setFiles((p) => [...p, { id, name: `new-file-${id}.pdf`, size: "1.2 MB", type: "pdf", progress: 0, status: "uploading" }]);
    // simulate progress
    const interval = setInterval(() => {
      setFiles((prev) => prev.map((f) => f.id === id ? { ...f, progress: Math.min(100, f.progress + 10) } : f));
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setFiles((prev) => prev.map((f) => f.id === id ? { ...f, progress: 100, status: "done" } : f));
    }, 2200);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="File Upload"
        description="Drag-and-drop zones, file lists, progress bars, and image galleries."
        breadcrumbs={[{ label: "Forms" }, { label: "File Upload" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Drag and drop */}
        <Card>
          <CardHeader title="Drag & Drop Zone" description="Drop files here or click to browse" />
          <CardBody>
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 px-6 py-12 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40 dark:border-gray-700 dark:hover:border-brand-700 dark:hover:bg-brand-500/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                <UploadCloud className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Drag files here to upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">or click to browse · PNG, JPG, PDF, ZIP up to 25MB</p>
              </div>
              <Button variant="secondary" size="sm" onClick={simulateUpload}><UploadCloud className="h-3.5 w-3.5" /> Browse files</Button>
            </div>
          </CardBody>
        </Card>

        {/* File list with progress */}
        <Card>
          <CardHeader title="Upload Queue" description="Files being uploaded or recently added" action={<Button variant="ghost" size="sm">Clear</Button>} />
          <CardBody className="space-y-3">
            {files.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
                <FileIcon className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                <p className="text-sm text-gray-500">No files in queue</p>
              </div>
            ) : files.map((f) => {
              const Icon = TYPE_ICON[f.type];
              return (
                <div key={f.id} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", TYPE_TONE[f.type])}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{f.name}</p>
                      <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{f.size}</span>
                    </div>
                    {f.status === "uploading" && (
                      <div className="mt-1.5">
                        <Progress value={f.progress} size="sm" tone="brand" />
                        <p className="mt-1 text-[11px] text-gray-400">Uploading... {f.progress}%</p>
                      </div>
                    )}
                    {f.status === "done" && <p className="mt-0.5 text-[11px] text-success-600 dark:text-success-400">Uploaded successfully</p>}
                    {f.status === "queued" && <p className="mt-0.5 text-[11px] text-gray-400">Queued</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    {f.status === "done" && <Check className="h-4 w-4 text-success-500" />}
                    <button onClick={() => removeFile(f.id)} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"><X className="h-4 w-4" /></button>
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>

        {/* File preview cards */}
        <Card className="lg:col-span-2">
          <CardHeader title="File Previews" description="Visual file cards with type indicators" action={<Button variant="secondary" size="sm"><UploadCloud className="h-3.5 w-3.5" /> Upload more</Button>} />
          <CardBody>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { id: 1, name: "Q3-roadmap.pdf", size: "2.4 MB", type: "pdf" as const, owner: "Aaroh S.", time: "2h ago" },
                { id: 2, name: "brand-assets.zip", size: "18.7 MB", type: "zip" as const, owner: "Sofia G.", time: "Yesterday" },
                { id: 3, name: "team-photo.jpg", size: "6.2 MB", type: "image" as const, owner: "Mira P.", time: "3d ago" },
                { id: 4, name: "budget-2026.xlsx", size: "88 KB", type: "spreadsheet" as const, owner: "Ethan W.", time: "1w ago" },
                { id: 5, name: "release-notes.md", size: "12 KB", type: "code" as const, owner: "Marcus C.", time: "1w ago" },
                { id: 6, name: "demo.mp4", size: "44.2 MB", type: "video" as const, owner: "Priya I.", time: "2w ago" },
              ].map((f) => {
                const Icon = TYPE_ICON[f.type];
                return (
                  <div key={f.id} className="group relative rounded-xl border border-gray-100 p-3 transition-colors hover:border-brand-300 dark:border-gray-800">
                    <div className="flex items-start justify-between">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", TYPE_TONE[f.type])}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <button className="rounded p-1 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"><MoreHorizontal className="h-4 w-4" /></button>
                    </div>
                    <p className="mt-3 truncate text-sm font-semibold text-gray-900 dark:text-white">{f.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{f.size} · {f.time}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-800">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{f.owner}</span>
                      <div className="flex gap-1">
                        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800" aria-label="Preview"><Eye className="h-3.5 w-3.5" /></button>
                        <button className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800" aria-label="Download"><Download className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Image gallery */}
        <Card className="lg:col-span-2">
          <CardHeader title="Image Gallery Upload" description="Upload multiple images with thumbnails" action={<Badge tone="brand" variant="soft">{gallery.length} / 8</Badge>} />
          <CardBody>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.map((i) => (
                <div key={i} className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-brand-200 to-accent-200 dark:from-brand-500/30 dark:to-accent-500/30">
                  <div className="absolute inset-0 flex items-center justify-center text-brand-700/60">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs font-medium text-white">image-{i}.jpg</span>
                    <button onClick={() => setGallery((p) => p.filter((x) => x !== i))} className="rounded p-1 text-white/80 hover:bg-white/20 hover:text-white"><X className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              ))}
              {gallery.length < 8 && (
                <button
                  onClick={() => setGallery((p) => [...p, Math.max(...p, 0) + 1])}
                  className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 transition-colors hover:border-brand-300 hover:text-brand-500 dark:border-gray-700"
                >
                  <UploadCloud className="h-6 w-6" />
                  <span className="text-xs font-semibold">Add image</span>
                </button>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800/40">
              <p className="text-xs text-gray-500 dark:text-gray-400">Images will be optimized and stored at full resolution.</p>
              <Button size="sm"><UploadCloud className="h-3.5 w-3.5" /> Upload all</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
