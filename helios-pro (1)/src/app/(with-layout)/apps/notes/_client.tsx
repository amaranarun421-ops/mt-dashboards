"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Modal } from "@/components/shared/modal";
import { EmptyState } from "@/components/shared/empty-state";
import { inputClass } from "@/components/shared/form-section";
import { StickyNoteIcon, EditIcon, CheckIcon } from "@/components/Layouts/sidebar/icons";
import { notes as initialNotes, type Note, type NoteColor } from "@/data/apps/notes";

const colorTone: Record<NoteColor, { card: string; chip: string; dot: string }> = {
  amber: {
    card: "bg-accent/10 border-accent/30 dark:bg-accent/10",
    chip: "bg-accent text-white",
    dot: "bg-accent",
  },
  emerald: {
    card: "bg-primary/10 border-primary/30 dark:bg-primary/10",
    chip: "bg-primary text-white",
    dot: "bg-primary",
  },
  violet: {
    card: "bg-violet/10 border-violet/30 dark:bg-violet/10",
    chip: "bg-violet text-white",
    dot: "bg-violet",
  },
  sky: {
    card: "bg-blue/10 border-blue/30 dark:bg-blue/10",
    chip: "bg-blue text-white",
    dot: "bg-blue",
  },
  rose: {
    card: "bg-rose/10 border-rose/30 dark:bg-rose/10",
    chip: "bg-rose text-white",
    dot: "bg-rose",
  },
  slate: {
    card: "bg-gray-2 border-stroke dark:bg-white/[0.04]",
    chip: "bg-gray-4 text-white",
    dot: "bg-gray-4",
  },
};

const colorChoices: NoteColor[] = ["amber", "emerald", "violet", "sky", "rose", "slate"];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeId, setActiveId] = useState<string>(initialNotes[0].id);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", body: "", color: "amber" as NoteColor });

  const filtered = useMemo(() => {
    return notes.filter((n) =>
      query.trim() === "" ? true : (n.title + n.body + n.tags.join(" ")).toLowerCase().includes(query.toLowerCase()),
    );
  }, [notes, query]);

  const active = notes.find((n) => n.id === activeId) || filtered[0] || null;

  function togglePin(id: string) {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeId === id) {
      const next = notes.find((n) => n.id !== id);
      if (next) setActiveId(next.id);
    }
  }

  function saveActive(next: Partial<Note>) {
    if (!active) return;
    setNotes((prev) =>
      prev.map((n) => (n.id === active.id ? { ...n, ...next, updatedAt: "just now" } : n)),
    );
  }

  function createNote() {
    if (!draft.title.trim()) return;
    const n: Note = {
      id: `n${Date.now()}`,
      title: draft.title.trim(),
      body: draft.body.trim(),
      color: draft.color,
      tags: ["new"],
      updatedAt: "just now",
    };
    setNotes((prev) => [n, ...prev]);
    setActiveId(n.id);
    setDraft({ title: "", body: "", color: "amber" });
    setModalOpen(false);
  }

  return (
    <div>
      <PageHeader
        title="Notes"
        description="Capture ideas, checklists and meeting notes — color-coded for quick scanning."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "Notes" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              <EditIcon className="size-4" />
              New note
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        {/* Notes grid */}
        <div>
          <div className="mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes…"
              className={inputClass}
            />
          </div>

          {filtered.length === 0 ? (
            <Card>
              <EmptyState
                size="md"
                icon={<StickyNoteIcon className="size-6" />}
                title="No notes found"
                description="Create your first note to get started."
                action={
                  <Button size="sm" variant="primary" onClick={() => setModalOpen(true)}>
                    <EditIcon className="size-4" />
                    New note
                  </Button>
                }
              />
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filtered.map((n) => {
                const tone = colorTone[n.color];
                return (
                  <button
                    key={n.id}
                    onClick={() => setActiveId(n.id)}
                    className={`group relative rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.card} ${
                      active?.id === n.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${tone.dot}`} />
                        <h3 className="text-sm font-semibold text-dark dark:text-white">{n.title}</h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(n.id);
                        }}
                        aria-label="pin"
                        className="text-dark-5 transition hover:text-accent dark:text-dark-6"
                      >
                        <svg
                          width={14}
                          height={14}
                          viewBox="0 0 24 24"
                          fill={n.pinned ? "currentColor" : "none"}
                          className={n.pinned ? "text-accent" : ""}
                        >
                          <path d="M9 4h6l-1 6 4 3v2h-5v5l-1 2-1-2v-5H6v-2l4-3-1-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-2 line-clamp-5 whitespace-pre-line text-xs leading-relaxed text-dark-7 dark:text-dark-7">
                      {n.body}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {n.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-dark-7 dark:bg-white/10 dark:text-dark-7"
                        >
                          #{t}
                        </span>
                      ))}
                      <span className="ml-auto text-[10px] text-dark-5 dark:text-dark-6">{n.updatedAt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Editor */}
        <Card padded={false} className="flex h-full min-h-[640px] flex-col">
          {!active ? (
            <EmptyState
              className="m-auto"
              size="md"
              icon={<StickyNoteIcon className="size-6" />}
              title="No note selected"
              description="Pick a note from the grid to edit it."
            />
          ) : (
            <>
              <div className="flex items-center justify-between gap-2 border-b border-stroke p-4 dark:border-dark-3">
                <div className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${colorTone[active.color].dot}`} />
                  <input
                    value={active.title}
                    onChange={(e) => saveActive({ title: e.target.value })}
                    className="bg-transparent text-base font-semibold text-dark outline-none dark:text-white"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="iconSm" onClick={() => togglePin(active.id)} aria-label="pin">
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 24 24"
                      fill={active.pinned ? "currentColor" : "none"}
                      className={active.pinned ? "text-accent" : ""}
                    >
                      <path d="M9 4h6l-1 6 4 3v2h-5v5l-1 2-1-2v-5H6v-2l4-3-1-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="iconSm" onClick={() => deleteNote(active.id)} aria-label="delete">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                      <path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div className="border-b border-stroke px-4 py-2 dark:border-dark-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {active.tags.map((t) => (
                    <Badge key={t} variant="neutral" size="sm">#{t}</Badge>
                  ))}
                  <span className="ml-auto text-[11px] text-dark-5 dark:text-dark-6">
                    Updated {active.updatedAt}
                  </span>
                </div>
              </div>
              <textarea
                value={active.body}
                onChange={(e) => saveActive({ body: e.target.value })}
                rows={18}
                className="helios-scroll flex-1 resize-none bg-transparent p-4 text-sm leading-relaxed text-dark-7 outline-none dark:text-dark-7"
              />
              <div className="flex items-center justify-between gap-2 border-t border-stroke p-3 dark:border-dark-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-dark-5 dark:text-dark-6">Color:</span>
                  {colorChoices.map((c) => (
                    <button
                      key={c}
                      onClick={() => saveActive({ color: c })}
                      className={`size-5 rounded-full ${colorTone[c].chip} ${active.color === c ? "ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-dark" : ""}`}
                      aria-label={c}
                    />
                  ))}
                </div>
                <Badge variant="success" size="sm">
                  <CheckIcon className="size-3" />
                  Saved
                </Badge>
              </div>
            </>
          )}
        </Card>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New note"
        description="Capture a quick thought. You can edit details after creating."
        size="md"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={createNote}>Create note</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Title</label>
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Note title"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Body</label>
            <textarea
              rows={5}
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              placeholder="Write your note…"
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Color</label>
            <div className="flex flex-wrap gap-2">
              {colorChoices.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setDraft({ ...draft, color: c })}
                  className={`size-7 rounded-full ${colorTone[c].chip} ${draft.color === c ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-dark" : ""}`}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
