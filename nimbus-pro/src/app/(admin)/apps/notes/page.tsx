"use client";
import { useState } from "react";
import { PageHeader, Card, Badge, Button, IconButton, SearchInput, DropdownMenu, DropdownMenuItem, DropdownMenuLabel, MoreMenu } from "@/components/ui";
import { NOTES_LIST } from "@/data/mock";
import { cn } from "@/lib/utils";
import {
  Plus, Pin, MoreHorizontal, FileText, Archive, Trash2, Tag, Star, Folder,
  Pencil, Copy, Share2, Sparkles
} from "lucide-react";

const COLOR_TOP_BAR: Record<string, string> = {
  brand: "bg-brand-500",
  purple: "bg-purple-500",
  warning: "bg-warning-500",
  success: "bg-success-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
};

const COLOR_ICON_BG: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
};

const TAGS = [
  { id: "work", label: "Work", count: 8 },
  { id: "personal", label: "Personal", count: 4 },
  { id: "research", label: "Research", count: 3 },
  { id: "ideas", label: "Ideas", count: 6 },
  { id: "meetings", label: "Meetings", count: 5 },
];

const CATEGORIES = [
  { id: "all", label: "All Notes", count: 12, icon: FileText },
  { id: "pinned", label: "Pinned", count: 2, icon: Pin },
  { id: "favorites", label: "Favorites", count: 3, icon: Star },
  { id: "archive", label: "Archive", count: 8, icon: Archive },
];

export default function NotesPage() {
  const [notes, setNotes] = useState(NOTES_LIST);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const togglePin = (id: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const filtered = notes.filter((n) => {
    const matchesSearch = !search.trim() ? true : n.title.toLowerCase().includes(search.toLowerCase()) || n.preview.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === "all" ? true : activeCat === "pinned" ? n.pinned : true;
    return matchesSearch && matchesCat;
  });

  const pinned = filtered.filter((n) => n.pinned);
  const others = filtered.filter((n) => !n.pinned);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Notes"
        description="Capture ideas, meeting notes, and research in one place."
        breadcrumbs={[{ label: "Apps" }, { label: "Notes" }]}
        actions={
          <>
            <Button variant="secondary"><Folder className="h-4 w-4" /> New folder</Button>
            <Button><Plus className="h-4 w-4" /> New note</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="space-y-4">
          <Card className="p-3">
            <nav className="space-y-0.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeCat === c.id
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <c.icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{c.label}</span>
                  <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-500 dark:bg-gray-800 dark:text-gray-400">{c.count}</span>
                </button>
              ))}
            </nav>
          </Card>

          <Card className="p-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tags</p>
              <IconButton aria-label="New tag" className="h-6 w-6"><Plus className="h-3 w-3" /></IconButton>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TAGS.map((t) => (
                <button
                  key={t.id}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Tag className="h-2.5 w-2.5" /> {t.label}
                  <span className="text-[10px] text-gray-400">{t.count}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-brand-500 to-accent-500 p-4 text-white">
            <Sparkles className="h-5 w-5 opacity-80" />
            <p className="mt-2 text-sm font-semibold">AI summary</p>
            <p className="mt-1 text-xs opacity-80">Let AI summarize your week&apos;s notes into a single digest.</p>
            <button className="mt-3 rounded-lg bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur hover:bg-white/25">Try it now</button>
          </Card>
        </aside>

        {/* Main */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <SearchInput value={search} onChange={setSearch} placeholder="Search notes..." className="flex-1" />
            <DropdownMenu
              trigger={<Button variant="outline" size="sm">Sort by: Modified <MoreHorizontal className="h-3.5 w-3.5" /></Button>}
            >
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuItem>Modified (newest)</DropdownMenuItem>
              <DropdownMenuItem>Modified (oldest)</DropdownMenuItem>
              <DropdownMenuItem>Title (A–Z)</DropdownMenuItem>
              <DropdownMenuItem>Recently created</DropdownMenuItem>
            </DropdownMenu>
          </div>

          {pinned.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-1.5">
                <Pin className="h-3.5 w-3.5 text-gray-400" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Pinned</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {pinned.map((n) => (
                  <NoteCard key={n.id} note={n} onTogglePin={togglePin} />
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="mb-3 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-gray-400" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">All notes ({others.length})</h3>
            </div>
            {others.length === 0 ? (
              <Card className="p-10 text-center">
                <FileText className="mx-auto h-8 w-8 text-gray-300" />
                <p className="mt-2 text-sm font-medium text-gray-500">No notes found</p>
                <p className="text-xs text-gray-400">Try a different search or create a new note.</p>
              </Card>
            ) : (
              <div className="columns-1 gap-3 sm:columns-2 xl:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
                {others.map((n) => (
                  <NoteCard key={n.id} note={n} onTogglePin={togglePin} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating new note button */}
      <button
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-theme-lg transition-transform hover:scale-105"
        aria-label="New note"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}

function NoteCard({ note, onTogglePin }: {
  note: typeof NOTES_LIST[number];
  onTogglePin: (id: string) => void;
}) {
  return (
    <Card hover className={cn("group relative overflow-hidden p-4")}>
      <div className={cn("absolute left-0 top-0 h-full w-1", COLOR_TOP_BAR[note.color])} />
      <div className="flex items-start justify-between">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", COLOR_ICON_BG[note.color])}>
          <FileText className="h-4 w-4" />
        </div>
        <div className="flex items-center opacity-0 transition-opacity group-hover:opacity-100">
          <IconButton aria-label="Pin" className="h-7 w-7" onClick={() => onTogglePin(note.id)}>
            <Pin className={cn("h-3.5 w-3.5", note.pinned && "fill-brand-500 text-brand-500")} />
          </IconButton>
          <MoreMenu
            items={[
              { label: "Edit", icon: Pencil },
              { label: "Duplicate", icon: Copy },
              { label: "Share", icon: Share2 },
              { label: "Archive", icon: Archive },
              { label: "Delete", icon: Trash2, danger: true },
            ]}
          />
        </div>
      </div>
      <h3 className="mt-3 text-sm font-bold text-gray-900 dark:text-white">{note.title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-4">{note.preview}</p>
      <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-2.5 dark:border-gray-800/50">
        <span className="text-[11px] text-gray-400">{note.modified}</span>
        {note.pinned && (
          <Badge tone="brand" variant="soft" className="text-[10px]"><Pin className="h-2.5 w-2.5" /> Pinned</Badge>
        )}
      </div>
    </Card>
  );
}
