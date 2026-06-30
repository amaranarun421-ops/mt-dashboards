"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Progress } from "@/components/shared/progress";
import { inputClass } from "@/components/shared/form-section";
import {
  FolderIcon,
  UploadIcon,
  StarIcon,
  CloudIcon,
} from "@/components/Layouts/sidebar/icons";
import { folderTree, recentFiles, storageUsed, type FileItem, type FileKind, type FolderNode } from "@/data/apps/files";

function FileIcon({ kind, className }: { kind: FileKind; className?: string }) {
  const base = className || "size-5";
  switch (kind) {
    case "folder":
      return <FolderIcon className={base} />;
    case "pdf":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path d="M5 3h9l5 5v13H5V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="7.5" y="12" width="9" height="6" rx="1" fill="currentColor" opacity="0.18" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="4.5" fill="currentColor" fontWeight="700">PDF</text>
        </svg>
      );
    case "image":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="9" cy="10" r="1.6" fill="currentColor" />
          <path d="M4 18l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "doc":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path d="M5 3h9l5 5v13H5V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M14 3v5h5M8 13h8M8 17h6M8 9h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "sheet":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path d="M5 3h9l5 5v13H5V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 17v-3M11 17v-5M14 17v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "video":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M17 9l4-2v10l-4-2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M9 10l4 2-4 2v-4z" fill="currentColor" />
        </svg>
      );
    case "audio":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path d="M9 18V6l10-2v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17" cy="16" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "archive":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 8v11a1 1 0 001 1h12a1 1 0 001-1V8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M11 11v2M11 14v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "code":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <FolderIcon className={base} />;
  }
}

const kindTone: Record<FileKind, string> = {
  folder: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  pdf: "bg-red-light-5 text-red-dark dark:bg-red/15 dark:text-red-light",
  image: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  doc: "bg-blue-light-5 text-blue-dark dark:bg-blue/15 dark:text-blue-light",
  sheet: "bg-primary-subtle text-primary-dark dark:bg-primary/15 dark:text-primary-light",
  video: "bg-rose-subtle text-rose dark:bg-rose/15 dark:text-rose-light",
  audio: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
  archive: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  code: "bg-gray-2 text-dark-7 dark:bg-white/10 dark:text-dark-7",
};

function Tree({ nodes, depth = 0, active, setActive }: { nodes: FolderNode[]; depth?: number; active: string; setActive: (id: string) => void }) {
  return (
    <ul className={depth === 0 ? "" : "ml-3 border-l border-stroke pl-2 dark:border-dark-3"}>
      {nodes.map((n) => (
        <li key={n.id}>
          <button
            onClick={() => setActive(n.id)}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition ${
              active === n.id
                ? "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                : "text-dark-7 hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
            }`}
            style={{ paddingLeft: `${8 + depth * 6}px` }}
          >
            <FolderIcon className={`size-4 ${active === n.id ? "text-primary dark:text-primary-light" : "text-accent-dark dark:text-accent-light"}`} />
            <span className="truncate font-medium">{n.name}</span>
          </button>
          {n.children && <Tree nodes={n.children} depth={depth + 1} active={active} setActive={setActive} />}
        </li>
      ))}
    </ul>
  );
}

export default function FileManagerPage() {
  const [activeFolder, setActiveFolder] = useState("f-root");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState<FileItem[]>(recentFiles);

  const filtered = useMemo(() => {
    return files.filter((f) =>
      query.trim() === "" ? true : f.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [files, query]);

  function toggleStar(id: string) {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, starred: !f.starred } : f)));
  }

  return (
    <div>
      <PageHeader
        title="File Manager"
        description="Browse, share and manage files across your Helios Pro workspace."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "File Manager" }]}
        actions={
          <>
            <Button variant="outline" size="sm">New folder</Button>
            <Button variant="primary" size="sm">
              <UploadIcon className="size-4" />
              Upload
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        {/* Left: folder tree + storage */}
        <div className="space-y-6">
          <Card padded={false}>
            <div className="border-b border-stroke px-4 py-3 dark:border-dark-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Folders
              </p>
            </div>
            <div className="p-2">
              <Tree nodes={folderTree} active={activeFolder} setActive={setActiveFolder} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-dark dark:text-white">Storage</h3>
              <Badge variant="info" size="sm">
                <CloudIcon className="size-3" />
                Synced
              </Badge>
            </div>
            <p className="mt-2 text-2xl font-bold text-dark dark:text-white">
              {storageUsed.used}
              <span className="text-sm font-medium text-dark-5 dark:text-dark-6"> / {storageUsed.total} GB</span>
            </p>
            <Progress
              className="mt-3"
              value={(storageUsed.used / storageUsed.total) * 100}
              tone="primary"
              size="md"
            />
            <ul className="mt-4 space-y-2">
              {storageUsed.breakdown.map((b) => (
                <li key={b.label} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-dark-7 dark:text-dark-7">
                    <span className={`size-2 rounded-full ${
                      b.tone === "primary" ? "bg-primary"
                        : b.tone === "accent" ? "bg-accent"
                        : b.tone === "violet" ? "bg-violet"
                        : "bg-blue"
                    }`} />
                    {b.label}
                  </span>
                  <span className="font-semibold text-dark dark:text-white">{b.value} GB</span>
                </li>
              ))}
            </ul>
            <Button variant="soft" size="sm" className="mt-4 w-full">Upgrade plan</Button>
          </Card>
        </div>

        {/* Right: files */}
        <div className="space-y-6">
          <Card padded={false}>
            <div className="flex flex-col gap-3 border-b border-stroke p-4 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-dark-5 dark:text-dark-6">
                <FolderIcon className="size-4 text-accent-dark dark:text-accent-light" />
                <span className="font-medium text-dark dark:text-white">My Drive</span>
                <span>/</span>
                <span>Engineering</span>
                <span>/</span>
                <span className="font-medium text-dark dark:text-white">Specs</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search files…"
                  className={`${inputClass} !h-9 !py-1 max-w-[220px]`}
                />
                <div className="flex items-center gap-0.5 rounded-lg border border-stroke p-0.5 dark:border-dark-3">
                  <button
                    onClick={() => setView("grid")}
                    className={`grid size-7 place-items-center rounded ${view === "grid" ? "bg-primary text-white" : "text-dark-5 hover:bg-gray-2 dark:text-dark-6"}`}
                    aria-label="grid view"
                  >
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></svg>
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`grid size-7 place-items-center rounded ${view === "list" ? "bg-primary text-white" : "text-dark-5 hover:bg-gray-2 dark:text-dark-6"}`}
                    aria-label="list view"
                  >
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            </div>

            {view === "grid" ? (
              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((f) => (
                  <div
                    key={f.id}
                    className="group relative rounded-xl border border-stroke bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-dark-3 dark:bg-gray-dark"
                  >
                    <button
                      onClick={() => toggleStar(f.id)}
                      className="absolute right-2 top-2 text-dark-6 opacity-0 transition group-hover:opacity-100"
                      aria-label="star"
                    >
                      <StarIcon className={`size-4 ${f.starred ? "text-accent" : ""}`} />
                    </button>
                    <div className={`mb-3 grid size-12 place-items-center rounded-xl ${kindTone[f.kind]}`}>
                      <FileIcon kind={f.kind} className="size-6" />
                    </div>
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{f.name}</p>
                    <p className="mt-0.5 text-[11px] text-dark-5 dark:text-dark-6">
                      {f.size} · {f.modified}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Avatar name={f.owner} size="xs" />
                      <span className="truncate text-[11px] text-dark-5 dark:text-dark-6">{f.owner}</span>
                      {f.sharedWith ? (
                        <Badge variant="info" size="sm" className="ml-auto">
                          {f.sharedWith} shared
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="divide-y divide-stroke dark:divide-dark-3">
                {filtered.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 px-4 py-3 transition hover:bg-gray-2/60 dark:hover:bg-white/[0.03]">
                    <div className={`grid size-9 place-items-center rounded-lg ${kindTone[f.kind]}`}>
                      <FileIcon kind={f.kind} className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-dark dark:text-white">{f.name}</p>
                      <p className="text-[11px] text-dark-5 dark:text-dark-6">{f.size} · Modified {f.modified}</p>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <Avatar name={f.owner} size="xs" />
                      <span className="text-xs text-dark-5 dark:text-dark-6">{f.owner}</span>
                    </div>
                    <button onClick={() => toggleStar(f.id)} aria-label="star" className="text-dark-5 dark:text-dark-6">
                      <StarIcon className={`size-4 ${f.starred ? "text-accent" : ""}`} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card padded={false}>
            <div className="flex items-center justify-between border-b border-stroke px-5 py-4 dark:border-dark-3">
              <div>
                <h3 className="text-sm font-semibold text-dark dark:text-white">Recent uploads</h3>
                <p className="text-xs text-dark-5 dark:text-dark-6">Files added in the last 24 hours</p>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <ul className="divide-y divide-stroke dark:divide-dark-3">
              {files.slice(0, 4).map((f) => (
                <li key={f.id} className="flex items-center gap-3 px-5 py-3 transition hover:bg-gray-2/60 dark:hover:bg-white/[0.03]">
                  <div className={`grid size-9 place-items-center rounded-lg ${kindTone[f.kind]}`}>
                    <FileIcon kind={f.kind} className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-dark dark:text-white">{f.name}</p>
                    <p className="text-[11px] text-dark-5 dark:text-dark-6">{f.size} · {f.modified}</p>
                  </div>
                  <Avatar name={f.owner} size="xs" />
                  <span className="hidden text-xs text-dark-5 dark:text-dark-6 sm:inline">{f.owner}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
