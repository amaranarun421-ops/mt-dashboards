"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Progress } from "@/components/shared/progress";
import { Modal } from "@/components/shared/modal";
import { UploadIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type UploadItem = {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "done" | "error";
  preview?: string;
};

const formatBytes = (b: number) => {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
};

const seedFiles = (): UploadItem[] => [
  { id: "f1", name: "Q4-roadmap.pdf", size: 1_240_000, progress: 100, status: "done" },
  { id: "f2", name: "brand-guidelines.fig", size: 8_420_000, progress: 100, status: "done" },
  { id: "f3", name: "team-photo.jpg", size: 540_000, progress: 100, status: "done", preview: "https://picsum.photos/seed/helios-team/240/240" },
];

export default function FileUploadClient() {
  /* drag-drop zone */
  const [items, setItems] = useState<UploadItem[]>(seedFiles);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const next: UploadItem[] = Array.from(files).map((f) => ({
      id: `${Date.now()}-${f.name}`,
      name: f.name,
      size: f.size,
      progress: 0,
      status: "uploading",
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));
    setItems((prev) => [...next, ...prev]);
  }, []);

  /* simulate progress */
  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) =>
        prev.map((it) => {
          if (it.status !== "uploading") return it;
          const p = Math.min(100, it.progress + 8 + Math.random() * 12);
          return { ...it, progress: p, status: p >= 100 ? "done" : "uploading" };
        }),
      );
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  /* image grid */
  const imageFiles = items.filter((i) => i.preview);

  /* avatar crop modal */
  const [cropOpen, setCropOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string>("https://picsum.photos/seed/helios-avatar/480/480");
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const onPickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type.startsWith("image/")) {
      setCropImage(URL.createObjectURL(f));
      setCropOpen(true);
    }
  };

  const stats = {
    total: items.length,
    uploading: items.filter((i) => i.status === "uploading").length,
    done: items.filter((i) => i.status === "done").length,
    size: items.reduce((s, i) => s + i.size, 0),
  };

  return (
    <div>
      <PageHeader
        title="File Upload"
        description="Drag-and-drop zone, file list with progress, multi-file, image preview grid and avatar upload with crop UI."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "File Upload" },
        ]}
        actions={
          <Badge variant="primary" size="lg">
            <UploadIcon className="size-4" /> 4 variants
          </Badge>
        }
      />

      {/* quick stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: "Total files", v: stats.total, t: "primary" },
          { l: "Uploading", v: stats.uploading, t: "accent" },
          { l: "Completed", v: stats.done, t: "success" },
          { l: "Total size", v: formatBytes(stats.size), t: "info" },
        ].map((s) => (
          <Card key={s.l} padded className="!p-4">
            <p className="text-xs text-dark-5 dark:text-dark-6">{s.l}</p>
            <p className="mt-1 text-2xl font-bold text-dark dark:text-white">{s.v}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* drag-drop zone */}
        <FormSection title="Drag & drop zone" description="Drop files anywhere on the dashed area or click to browse." columns={1}>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={classNames(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition",
              dragging
                ? "border-primary bg-primary-subtle/40 dark:bg-primary/10"
                : "border-stroke hover:border-primary/60 dark:border-dark-3",
            )}
          >
            <span className="grid size-14 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
              <UploadIcon className="size-6" />
            </span>
            <div>
              <p className="text-sm font-medium text-dark dark:text-white">
                Drop files here or <span className="text-primary">browse</span>
              </p>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                Supports PDF, PNG, JPG, SVG, ZIP — up to 25 MB per file.
              </p>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </FormSection>

        {/* avatar upload */}
        <FormSection title="Avatar upload with crop" description="Pick a photo, then adjust zoom and position." columns={1}>
          <div className="flex items-center gap-4">
            <div className="relative size-24 overflow-hidden rounded-full border-2 border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark-3">
              <img
                src={cropImage}
                alt="Avatar preview"
                className="size-full object-cover"
                style={{ transform: `scale(${zoom}) translate(${offset.x}%, ${offset.y}%)` }}
              />
            </div>
            <div className="flex-1">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPickAvatar}
              />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                <UploadIcon className="size-4" /> Choose photo
              </Button>
              <p className="mt-2 text-xs text-dark-5 dark:text-dark-6">
                JPG or PNG, square image recommended. Opens the crop UI.
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => setCropOpen(true)}>
            Open crop UI
          </Button>
        </FormSection>
      </div>

      {/* file list with progress */}
      <Card className="mt-6">
        <CardHeader
          title="File list with progress"
          subtitle="Click the close icon to remove a file. Uploading files auto-complete via a simulated timer."
          action={
            <Button variant="outline" size="sm" onClick={() => setItems([])}>
              Clear all
            </Button>
          }
        />
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-stroke p-8 text-center text-sm text-dark-5 dark:border-dark-3 dark:text-dark-6">
            No files yet — drop some above to see them appear here.
          </div>
        ) : (
          <ul className="divide-y divide-stroke dark:divide-dark-3">
            {items.map((it) => (
              <li key={it.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="grid size-10 flex-shrink-0 place-items-center rounded-lg bg-gray-2 text-xs font-semibold text-dark-7 dark:bg-dark-3 dark:text-dark-6">
                  {it.name.split(".").pop()?.toUpperCase().slice(0, 4) || "FILE"}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{it.name}</p>
                    <span className="text-xs text-dark-5 dark:text-dark-6">{formatBytes(it.size)}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Progress
                      value={it.progress}
                      tone={it.status === "error" ? "danger" : "primary"}
                      size="xs"
                      className="flex-1"
                    />
                    <span
                      className={classNames(
                        "text-xs font-medium",
                        it.status === "done" && "text-primary",
                        it.status === "uploading" && "text-dark-5 dark:text-dark-6",
                        it.status === "error" && "text-red",
                      )}
                    >
                      {it.status === "done" ? "Done" : it.status === "error" ? "Failed" : `${Math.round(it.progress)}%`}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(it.id)}
                  className="grid size-8 place-items-center rounded-md text-dark-5 transition hover:bg-gray-2 hover:text-red dark:text-dark-6 dark:hover:bg-white/5"
                  aria-label={`Remove ${it.name}`}
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* image preview grid */}
      <Card className="mt-6">
        <CardHeader
          title="Image preview grid"
          subtitle="Visual thumbnails for every uploaded image — click to remove."
        />
        {imageFiles.length === 0 ? (
          <div className="rounded-lg border border-dashed border-stroke p-8 text-center text-sm text-dark-5 dark:border-dark-3 dark:text-dark-6">
            Drop an image to populate the preview grid.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {imageFiles.map((it) => (
              <div key={it.id} className="group relative overflow-hidden rounded-xl border border-stroke dark:border-dark-3">
                <img src={it.preview} alt={it.name} className="aspect-square w-full object-cover" />
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                  <span className="truncate text-xs text-white">{it.name}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(it.id)}
                    className="grid size-6 place-items-center rounded bg-white/20 text-white backdrop-blur hover:bg-red"
                    aria-label={`Remove ${it.name}`}
                  >
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                {it.status === "uploading" && (
                  <div className="absolute inset-x-0 bottom-0">
                    <Progress value={it.progress} tone="primary" size="xs" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* crop modal */}
      <Modal
        open={cropOpen}
        onClose={() => setCropOpen(false)}
        title="Crop your avatar"
        description="Adjust zoom and position. The preview updates live."
        size="md"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => setCropOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setCropOpen(false);
              }}
            >
              Save avatar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid place-items-center rounded-xl bg-gray-2 p-4 dark:bg-dark-2">
            <div className="relative size-56 overflow-hidden rounded-full border-4 border-primary">
              <img
                src={cropImage}
                alt="Crop preview"
                className="size-full object-cover"
                style={{ transform: `scale(${zoom}) translate(${offset.x}%, ${offset.y}%)` }}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 flex items-center justify-between text-xs text-dark-5 dark:text-dark-6">
              <span>Zoom</span>
              <span className="font-mono text-primary">{Math.round(zoom * 100)}%</span>
            </label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-dark-5 dark:text-dark-6">Horizontal offset</label>
              <input
                type="range"
                min={-30}
                max={30}
                step={1}
                value={offset.x}
                onChange={(e) => setOffset((o) => ({ ...o, x: Number(e.target.value) }))}
                className="w-full accent-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-dark-5 dark:text-dark-6">Vertical offset</label>
              <input
                type="range"
                min={-30}
                max={30}
                step={1}
                value={offset.y}
                onChange={(e) => setOffset((o) => ({ ...o, y: Number(e.target.value) }))}
                className="w-full accent-[var(--color-primary)]"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setZoom(1);
                setOffset({ x: 0, y: 0 });
              }}
            >
              Reset
            </Button>
            <p className="text-xs text-dark-5 dark:text-dark-6">Final size: 256 × 256 px</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
