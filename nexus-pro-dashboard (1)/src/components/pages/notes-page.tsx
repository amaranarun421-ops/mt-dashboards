"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Pin, Trash2, Edit3, Star, Tag, FileText, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Note { id: number; title: string; content: string; color: string; pinned: boolean; date: string; tags: string[]; }

const noteColors = [
  "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20",
  "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
  "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20",
  "bg-pink-50 dark:bg-pink-500/10 border-pink-200 dark:border-pink-500/20",
  "bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20",
  "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20",
];

export function NotesPage() {
  const [notes, setNotes] = React.useState<Note[]>([
    { id: 1, title: "Q3 Strategy Meeting", content: "Discussed roadmap items: mobile app launch, API v2, enterprise features. Key decisions made on prioritization.", color: noteColors[0], pinned: true, date: "2h ago", tags: ["work", "meeting"] },
    { id: 2, title: "Book Recommendations", content: "Atomic Habits by James Clear, Deep Work by Cal Newport, The Almanack of Naval Ravikant", color: noteColors[1], pinned: true, date: "Yesterday", tags: ["personal"] },
    { id: 3, title: "Recipe: Pasta Carbonara", content: "200g spaghetti, 2 eggs, 50g pecorino, 100g pancetta, black pepper. Cook pasta, mix eggs and cheese, combine with hot pasta.", color: noteColors[2], pinned: false, date: "2 days ago", tags: ["cooking"] },
    { id: 4, title: "Project Ideas", content: "1. AI-powered task prioritization app\n2. Local-first notes with sync\n3. Habit tracker with streaks", color: noteColors[4], pinned: false, date: "3 days ago", tags: ["ideas"] },
    { id: 5, title: "Travel Checklist - Tokyo", content: "Passport, JR Pass, pocket WiFi, adapter, comfortable shoes, cash, IC card, travel insurance", color: noteColors[3], pinned: false, date: "1 week ago", tags: ["travel"] },
    { id: 6, title: "Weekly Reflections", content: "This week I focused on deep work blocks. Productivity increased significantly. Need to maintain this rhythm.", color: noteColors[5], pinned: false, date: "1 week ago", tags: ["journal"] },
    { id: 7, title: "Git Commands Cheat Sheet", content: "git rebase -i HEAD~3, git stash, git cherry-pick, git reflog, git bisect", color: noteColors[1], pinned: false, date: "2 weeks ago", tags: ["dev"] },
    { id: 8, title: "Home Maintenance", content: "Change AC filter, fix leaky faucet, paint bedroom, clean gutters before winter", color: noteColors[2], pinned: false, date: "2 weeks ago", tags: ["home"] },
  ]);
  const [search, setSearch] = React.useState("");

  const filtered = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()));
  const pinned = filtered.filter(n => n.pinned);
  const others = filtered.filter(n => !n.pinned);

  return (
    <div>
      <PageHeader breadcrumb={["Applications", "Notes"]} title="Notes" description="Capture ideas, reminders, and important information." actions={<Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New Note</Button>} />
      <div className="mb-6 flex items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search notes..." value={search} onChange={e=>setSearch(e.target.value)} className="pl-9 h-11" />
        </div>
      </div>
      {pinned.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300"><Pin className="h-4 w-4" /> Pinned</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pinned.map((n, i) => <NoteCard key={n.id} note={n} index={i} onTogglePin={(id)=>setNotes(prev=>prev.map(x=>x.id===id?{...x, pinned: !x.pinned}:x))} />)}
          </div>
        </div>
      )}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">All Notes</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {others.map((n, i) => <NoteCard key={n.id} note={n} index={i} onTogglePin={(id)=>setNotes(prev=>prev.map(x=>x.id===id?{...x, pinned: !x.pinned}:x))} />)}
        </div>
      </div>
    </div>
  );
}

function NoteCard({ note, index, onTogglePin }: { note: Note; index: number; onTogglePin: (id: number) => void }) {
  return (
    <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay: index*0.04}}>
      <Card className={`group p-4 rounded-2xl border ${note.color} hover:shadow-theme-md transition-shadow cursor-pointer h-full flex flex-col`}>
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-800 dark:text-white/90 text-sm">{note.title}</h4>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <button onClick={()=>onTogglePin(note.id)} className="text-gray-400 hover:text-brand-500"><Pin className={`h-3.5 w-3.5 ${note.pinned ? "fill-brand-500 text-brand-500" : ""}`} /></button>
            <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"><MoreHorizontal className="h-3.5 w-3.5" /></button>
          </div>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 flex-1 line-clamp-4 whitespace-pre-line">{note.content}</p>
        <div className="mt-3 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-2">
          <div className="flex gap-1 flex-wrap">
            {note.tags.map(t => <span key={t} className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:text-gray-400">#{t}</span>)}
          </div>
          <span className="text-[10px] text-gray-400">{note.date}</span>
        </div>
      </Card>
    </motion.div>
  );
}
