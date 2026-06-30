"use client";
import { useState } from "react";
import { PageHeader, Card, Badge, Button, IconButton, Avatar, SearchInput, Progress, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui";
import { FILES } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Plus, Filter, Grid, List, ChevronRight, Folder, FileText, Image, FileSpreadsheet,
  FileCode, MoreHorizontal, Download, Share2, Star, Trash2, HardDrive, Cloud, Home, Star as StarIcon,
  Users, Clock, ChevronDown, Upload, File as FileIcon
} from "lucide-react";

const FILE_TYPE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  image: Image,
  spreadsheet: FileSpreadsheet,
  doc: FileText,
  fig: FileCode,
};

const FILE_TYPE_BG: Record<string, string> = {
  pdf: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
  image: "bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400",
  spreadsheet: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  doc: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  fig: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
};

const FILE_TYPE_LABEL: Record<string, string> = {
  pdf: "PDF",
  image: "Image",
  spreadsheet: "Spreadsheet",
  doc: "Document",
  fig: "Figma",
};

const LOCATIONS = [
  { id: "my", label: "My Files", icon: Home, count: 142 },
  { id: "shared", label: "Shared with me", icon: Users, count: 38 },
  { id: "starred", label: "Starred", icon: StarIcon, count: 12 },
  { id: "recent", label: "Recent", icon: Clock, count: 24 },
];

const FOLDER_TREE = [
  { id: "f1", name: "Documents", count: 48, children: [{ id: "f1a", name: "Contracts", count: 12 }, { id: "f1b", name: "Reports", count: 8 }] },
  { id: "f2", name: "Design", count: 64, children: [{ id: "f2a", name: "Brand", count: 18 }, { id: "f2b", name: "Mockups", count: 32 }] },
  { id: "f3", name: "Engineering", count: 92, children: [{ id: "f3a", name: "Specs", count: 22 }] },
  { id: "f4", name: "Marketing", count: 38, children: [] },
];

export default function FileManagerPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [activeLocation, setActiveLocation] = useState("my");
  const [openFolders, setOpenFolders] = useState<string[]>(["f1"]);

  const toggleFolder = (id: string) =>
    setOpenFolders((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const filtered = FILES.filter((f) =>
    !search.trim() ? true : f.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalSize = "84.2 GB";
  const usedPct = 56;

  return (
    <div className="space-y-4">
      <PageHeader
        title="File Manager"
        description="Browse, organize, and share your files — all in one place."
        breadcrumbs={[{ label: "Apps" }, { label: "File Manager" }]}
        actions={
          <>
            <Button variant="secondary"><Plus className="h-4 w-4" /> New folder</Button>
            <Button><Upload className="h-4 w-4" /> Upload</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="space-y-4">
          <Card className="p-3">
            <nav className="space-y-0.5">
              {LOCATIONS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLocation(l.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                    activeLocation === l.id
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <l.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{l.label}</span>
                  <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-400">{l.count}</span>
                </button>
              ))}
            </nav>
          </Card>

          <Card className="p-3">
            <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Folders</p>
            <div className="space-y-0.5">
              {FOLDER_TREE.map((f) => (
                <div key={f.id}>
                  <button
                    onClick={() => toggleFolder(f.id)}
                    className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <ChevronRight className={cn("h-3 w-3 transition-transform", openFolders.includes(f.id) && "rotate-90")} />
                    <Folder className="h-4 w-4 text-warning-500" />
                    <span className="flex-1 text-left">{f.name}</span>
                    <span className="text-[10px] text-gray-400">{f.count}</span>
                  </button>
                  {openFolders.includes(f.id) && f.children.length > 0 && (
                    <div className="ml-4 space-y-0.5 border-l border-gray-100 pl-2 dark:border-gray-800">
                      {f.children.map((c) => (
                        <button key={c.id} className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800">
                          <Folder className="h-3.5 w-3.5 text-warning-400" />
                          <span className="flex-1 text-left">{c.name}</span>
                          <span className="text-[10px] text-gray-400">{c.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Storage usage */}
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                <HardDrive className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Storage</p>
                <p className="text-[11px] text-gray-500">Cloud · Pro plan</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{totalSize} of 150 GB</span>
                <span className="text-gray-500">{usedPct}%</span>
              </div>
              <Progress value={usedPct} tone="brand" size="md" />
              <div className="mt-3 space-y-1.5">
                {[
                  { label: "Documents", value: 24, tone: "bg-brand-500" },
                  { label: "Images", value: 38, tone: "bg-purple-500" },
                  { label: "Videos", value: 18, tone: "bg-pink-500" },
                  { label: "Other", value: 4, tone: "bg-gray-400" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                      <span className={cn("h-2 w-2 rounded-full", s.tone)} /> {s.label}
                    </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{s.value} GB</span>
                  </div>
                ))}
              </div>
            </div>
            <Button variant="secondary" size="sm" className="mt-3 w-full"><Cloud className="h-3.5 w-3.5" /> Upgrade storage</Button>
          </Card>
        </aside>

        {/* Main */}
        <div className="space-y-4">
          {/* Toolbar */}
          <Card className="p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-medium text-gray-500 dark:text-gray-400">My Files</span>
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                <span className="font-semibold text-gray-900 dark:text-white">All files</span>
              </div>
              <div className="flex flex-1 items-center gap-2 sm:max-w-md sm:justify-end">
                <SearchInput value={search} onChange={setSearch} placeholder="Search files..." className="flex-1" />
                <DropdownMenu
                  trigger={<Button variant="outline" size="sm"><Filter className="h-3.5 w-3.5" /> Type <ChevronDown className="h-3 w-3" /></Button>}
                >
                  <DropdownMenuLabel>File type</DropdownMenuLabel>
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Documents</DropdownMenuItem>
                  <DropdownMenuItem>Images</DropdownMenuItem>
                  <DropdownMenuItem>Spreadsheets</DropdownMenuItem>
                  <DropdownMenuItem>PDFs</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sort by size</DropdownMenuItem>
                </DropdownMenu>
                <div className="flex items-center rounded-lg border border-gray-200 p-0.5 dark:border-gray-800">
                  <button
                    onClick={() => setView("grid")}
                    className={cn("flex h-7 w-7 items-center justify-center rounded-md transition-colors", view === "grid" ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                  >
                    <Grid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={cn("flex h-7 w-7 items-center justify-center rounded-md transition-colors", view === "list" ? "bg-brand-500 text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400")}
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Files */}
          {view === "grid" ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((f) => {
                const Icon = FILE_TYPE_ICON[f.type] ?? FileIcon;
                return (
                  <Card key={f.id} hover className="group p-4">
                    <div className="flex items-start justify-between">
                      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", FILE_TYPE_BG[f.type])}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100">
                        <IconButton aria-label="Star" className="h-7 w-7"><Star className="h-3.5 w-3.5" /></IconButton>
                        <DropdownMenu
                          trigger={<IconButton aria-label="More" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></IconButton>}
                        >
                          <DropdownMenuItem icon={Download}>Download</DropdownMenuItem>
                          <DropdownMenuItem icon={Share2}>Share</DropdownMenuItem>
                          <DropdownMenuItem icon={Star}>Add to starred</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem icon={Trash2} danger>Delete</DropdownMenuItem>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="mt-3 truncate text-sm font-semibold text-gray-900 dark:text-white">{f.name}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                      <Badge tone="gray" variant="soft" className="text-[10px]">{FILE_TYPE_LABEL[f.type]}</Badge>
                      <span>{f.size}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-2.5 dark:border-gray-800/50">
                      <div className="flex items-center gap-1.5">
                        <Avatar name={f.owner} size={22} />
                        <span className="text-[11px] text-gray-500">{f.modified}</span>
                      </div>
                      {f.shared > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Users className="h-3 w-3" /> {f.shared}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="p-0">
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Owner</th>
                      <th>Modified</th>
                      <th>Shared</th>
                      <th className="w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((f) => {
                      const Icon = FILE_TYPE_ICON[f.type] ?? FileIcon;
                      return (
                        <tr key={f.id}>
                          <td>
                            <div className="flex items-center gap-2.5">
                              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", FILE_TYPE_BG[f.type])}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">{f.name}</span>
                            </div>
                          </td>
                          <td><Badge tone="gray" variant="soft">{FILE_TYPE_LABEL[f.type]}</Badge></td>
                          <td className="text-sm text-gray-600 dark:text-gray-400">{f.size}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Avatar name={f.owner} size={22} />
                              <span className="text-xs text-gray-700 dark:text-gray-300">{f.owner}</span>
                            </div>
                          </td>
                          <td className="text-xs text-gray-500">{f.modified}</td>
                          <td>
                            {f.shared > 0 ? (
                              <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400"><Users className="h-3 w-3" /> {f.shared}</div>
                            ) : <span className="text-xs text-gray-400">—</span>}
                          </td>
                          <td>
                            <IconButton aria-label="More" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></IconButton>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
