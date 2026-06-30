'use client';

import * as React from 'react';
import {
  Search, Upload, Folder, Image as ImageIcon, Video, Music, AppWindow, FileText,
  Download, MoreVertical, Trash2, Eye, Plus, ChevronRight, Home, LayoutGrid,
  Users, Clock, Star, Filter, Grid3x3, List as ListIcon, Cloud, HardDrive,
  Database, RefreshCw, Settings, User, ChevronDown, Share2, X, Edit3, Copy,
  Move, Info, DownloadCloud,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ============================================================
   TailAdmin-aligned File Manager — premium replica
   Layout: left storage rail · main content · right storage details
   ============================================================ */

/* ---------- Dropdown menu for the MoreVertical button ----------
   Closes on outside click, on Escape, and on item selection. */
function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const ref = React.useRef<T>(null);
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    }
    function escapeHandler(e: KeyboardEvent) {
      if (e.key === 'Escape') onOutside();
    }
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', escapeHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', escapeHandler);
    };
  }, [onOutside]);
  return ref;
}

type FmMenuItem = { label?: string; icon?: React.ElementType; danger?: boolean; divider?: boolean };

function FmDropdownMenu({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: FmMenuItem[];
}) {
  const ref = useClickOutside<HTMLDivElement>(onClose);
  if (!open) return null;
  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-30 mt-1 w-44 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] p-1 shadow-[0_12px_24px_-6px_rgba(15,23,42,0.12),0_4px_8px_-4px_rgba(15,23,42,0.06)] ds-fade-in"
      style={{ animation: 'dsFadeIn 140ms ease-out' }}
    >
      {items.map((item, i) =>
        item.divider ? (
          <div key={i} className="my-1 h-px bg-[var(--border-subtle)]" />
        ) : (
          <button
            key={i}
            type="button"
            onClick={() => {
              onClose();
            }}
            className={cn(
              'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition',
              item.danger
                ? 'text-[var(--color-error-600)] hover:bg-[var(--color-error-50)] dark:text-[var(--color-error-500)] dark:hover:bg-[rgba(240,68,56,0.16)]'
                : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
            )}
          >
            {item.icon && <item.icon className="size-3.5" strokeWidth={2.2} />}
            <span className="flex-1">{item.label}</span>
          </button>
        ),
      )}
    </div>
  );
}

/* ---------- Types ---------- */
type MediaCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  iconColor: string;       // text color
  tileBg: string;          // background tile color (light)
  count: number;
  pct: number;
  size: string;
};

type FolderItem = {
  id: string;
  name: string;
  files: number;
  size: string;
};

type RecentFile = {
  id: string;
  name: string;
  ext: string;
  category: 'Video' | 'Image' | 'Document' | 'Audio' | 'App';
  icon: React.ElementType;
  iconColor: string;
  tileBg: string;
  size: string;
  date: string;
};

/* ---------- Mock Data (matches TailAdmin reference exactly) ---------- */
const MEDIA_CATEGORIES: MediaCategory[] = [
  { id: 'img', name: 'Image', icon: ImageIcon, iconColor: 'text-[#10b981]', tileBg: 'bg-[#ecfdf5] dark:bg-[rgba(16,185,129,0.12)]', count: 245, pct: 17, size: '26.40 GB' },
  { id: 'vid', name: 'Videos', icon: Video, iconColor: 'text-[#ec4899]', tileBg: 'bg-[#fdf2f8] dark:bg-[rgba(236,72,153,0.12)]', count: 245, pct: 22, size: '26.40 GB' },
  { id: 'aud', name: 'Audios', icon: Music, iconColor: 'text-[#3b82f6]', tileBg: 'bg-[#eff6ff] dark:bg-[rgba(59,130,246,0.12)]', count: 830, pct: 23, size: '18.90 GB' },
  { id: 'app', name: 'Apps', icon: AppWindow, iconColor: 'text-[#f97316]', tileBg: 'bg-[#fff7ed] dark:bg-[rgba(249,115,22,0.12)]', count: 1200, pct: 65, size: '85.30 GB' },
  { id: 'doc', name: 'Documents', icon: FileText, iconColor: 'text-[#eab308]', tileBg: 'bg-[#fefce8] dark:bg-[rgba(234,179,8,0.12)]', count: 78, pct: 10, size: '5.40 GB' },
  { id: 'dwl', name: 'Downloads', icon: Download, iconColor: 'text-[#a855f7]', tileBg: 'bg-[#f3e8ff] dark:bg-[rgba(168,85,247,0.12)]', count: 245, pct: 16, size: '26.40 GB' },
];

const FOLDERS: FolderItem[] = [
  { id: 'f1', name: 'Images', files: 345, size: '26.40 GB' },
  { id: 'f2', name: 'Documents', files: 130, size: '26.40 GB' },
  { id: 'f3', name: 'Apps', files: 130, size: '26.40 GB' },
  { id: 'f4', name: 'Downloads', files: 345, size: '26.40 GB' },
];

const RECENT_FILES: RecentFile[] = [
  { id: 'r1', name: 'Video_947954.mp4', ext: 'mp4', category: 'Video', icon: Video, iconColor: 'text-[#ec4899]', tileBg: 'bg-[#fdf2f8] dark:bg-[rgba(236,72,153,0.12)]', size: '89 MB', date: '12 Jan, 2027' },
  { id: 'r2', name: 'Travel.jpg', ext: 'jpg', category: 'Image', icon: ImageIcon, iconColor: 'text-[#10b981]', tileBg: 'bg-[#ecfdf5] dark:bg-[rgba(16,185,129,0.12)]', size: '5.4 MB', date: '10 Feb, 2027' },
  { id: 'r3', name: 'Document.pdf', ext: 'pdf', category: 'Document', icon: FileText, iconColor: 'text-[#eab308]', tileBg: 'bg-[#fefce8] dark:bg-[rgba(234,179,8,0.12)]', size: '1.2 MB', date: '8 Mar, 2027' },
  { id: 'r4', name: 'Video_947954_028.mp4', ext: 'mp4', category: 'Video', icon: Video, iconColor: 'text-[#ec4899]', tileBg: 'bg-[#fdf2f8] dark:bg-[rgba(236,72,153,0.12)]', size: '489 MB', date: '29 Apr, 2027' },
  { id: 'r5', name: 'Mountain.png', ext: 'png', category: 'Image', icon: ImageIcon, iconColor: 'text-[#10b981]', tileBg: 'bg-[#ecfdf5] dark:bg-[rgba(16,185,129,0.12)]', size: '5.4 MB', date: '10 Feb, 2027' },
  { id: 'r6', name: 'CV.pdf', ext: 'pdf', category: 'Document', icon: FileText, iconColor: 'text-[#eab308]', tileBg: 'bg-[#fefce8] dark:bg-[rgba(234,179,8,0.12)]', size: '12 MB', date: '17 Jun, 2027' },
  { id: 'r7', name: 'Video_09783_882943.mp4', ext: 'mp4', category: 'Video', icon: Video, iconColor: 'text-[#ec4899]', tileBg: 'bg-[#fdf2f8] dark:bg-[rgba(236,72,153,0.12)]', size: '309 MB', date: '27 Jul, 2027' },
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'files', label: 'Files', icon: Folder, active: true },
  { id: 'calendar', label: 'Calendar', icon: Clock },
  { id: 'chat', label: 'Chat', icon: Users },
  { id: 'email', label: 'Email', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'profile', label: 'Profile', icon: User },
];

/* ---------- Storage donut math ---------- */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

const STORAGE_TOTAL = 160; // GB
const STORAGE_FREE = 585;  // GB free (per audit)
const STORAGE_SEGMENTS = [
  { label: 'Downloads', color: '#a855f7', value: 26.4 },
  { label: 'Apps', color: '#f97316', value: 85.3 },
  { label: 'Documents', color: '#eab308', value: 5.4 },
  { label: 'Media', color: '#10b981', value: 18.9 },
];

/* ============================================================
   Main Component
   ============================================================ */
export function FileManagerPage() {
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  const [search, setSearch] = React.useState('');
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const totalUsed = STORAGE_SEGMENTS.reduce((sum, s) => sum + s.value, 0);

  // Donut chart segments (in degrees). Use reduce to compute cumulative
  // start/end angles without mutating any variable inside the map callback
  // (React Compiler's immutability rule).
  const segments = React.useMemo(() => {
    return STORAGE_SEGMENTS.reduce<Array<typeof STORAGE_SEGMENTS[number] & { start: number; end: number }>>(
      (acc, seg) => {
        const prev = acc.length > 0 ? acc[acc.length - 1].end : 0;
        const angle = (seg.value / STORAGE_TOTAL) * 360;
        acc.push({ ...seg, start: prev, end: prev + angle });
        return acc;
      },
      [],
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* ========== Page Header ========== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <nav className="mb-1 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Home className="size-3.5" />
            <ChevronRight className="size-3 text-[var(--text-faint)]" />
            <span className="text-[var(--text-strong)]">File Manager</span>
          </nav>
          <h1 className="ds-page-title">File Manager</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Primary search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.2} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-9 pr-3 text-sm text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] sm:w-56"
            />
          </div>
          <button className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
            <Filter className="size-4" strokeWidth={2.2} /> Filter
          </button>
          {/* View toggle */}
          <div className="inline-flex h-10 items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1">
            <button
              type="button"
              onClick={() => setView('grid')}
              data-active={view === 'grid'}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition data-[active=true]:bg-[var(--color-brand-50)] data-[active=true]:text-[var(--color-brand-600)] dark:data-[active=true]:bg-[rgba(70,95,255,0.16)] dark:data-[active=true]:text-[var(--color-brand-300)]"
              aria-label="Grid view"
            >
              <Grid3x3 className="size-4" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              data-active={view === 'list'}
              className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition data-[active=true]:bg-[var(--color-brand-50)] data-[active=true]:text-[var(--color-brand-600)] dark:data-[active=true]:bg-[rgba(70,95,255,0.16)] dark:data-[active=true]:text-[var(--color-brand-300)]"
              aria-label="List view"
            >
              <ListIcon className="size-4" strokeWidth={2.2} />
            </button>
          </div>
          <button className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-brand-600)]">
            <Plus className="size-4" strokeWidth={2.5} /> Upload File
          </button>
        </div>
      </div>

      {/* ========== Main 3-column layout ========== */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[260px_1fr_320px]">
        {/* ========== LEFT: Storage Rail ========== */}
        <aside className="space-y-4">
          {/* Quick access card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Quick Access</p>
            <nav className="space-y-1">
              {[
                { label: 'My Drive', icon: HardDrive, count: '4 folders' },
                { label: 'Shared with me', icon: Users, count: '12 items' },
                { label: 'Recent', icon: Clock, count: '24 items' },
                { label: 'Starred', icon: Star, count: '8 items' },
                { label: 'Trash', icon: Trash2, count: '3 items' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                  >
                    <Icon className="size-4 text-[var(--text-muted)]" strokeWidth={2.2} />
                    <span className="flex-1 text-left">{item.label}</span>
                    <span className="text-xs text-[var(--text-subtle)]">{item.count}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Storage usage card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Storage</p>
              <span className="text-xs font-medium text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">75% Used</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
              <div className="h-full rounded-full bg-[var(--color-brand-500)]" style={{ width: '75%' }} />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-[var(--text-muted)]">{totalUsed.toFixed(1)} GB used</span>
              <span className="font-medium text-[var(--text-strong)]">{STORAGE_TOTAL} GB total</span>
            </div>
            <button className="mt-4 inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[var(--color-brand-300)] bg-[var(--color-brand-50)] text-sm font-medium text-[var(--color-brand-700)] transition hover:bg-[var(--color-brand-100)] dark:border-[rgba(70,95,255,0.3)] dark:bg-[rgba(70,95,255,0.12)] dark:text-[var(--color-brand-300)] dark:hover:bg-[rgba(70,95,255,0.18)]">
              <Database className="size-4" strokeWidth={2.2} /> Upgrade storage
            </button>
          </div>

          {/* Cloud sync status */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
                <Cloud className="size-5" strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--text-strong)]">Synced</p>
                <p className="text-xs text-[var(--text-muted)]">All files up to date</p>
              </div>
              <button className="cursor-pointer text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                <RefreshCw className="size-4" strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </aside>

        {/* ========== CENTER: Media + Folders + Recent ========== */}
        <div className="space-y-6">
          {/* ----- All Media ----- */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="ds-section-title">All Media</h2>
              <button className="text-xs font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">View all</button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MEDIA_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--border-strong)] hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <span className={cn('inline-flex size-10 items-center justify-center rounded-xl', cat.tileBg)}>
                        <Icon className={cn('size-5', cat.iconColor)} strokeWidth={2} />
                      </span>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setOpenMenu(openMenu === cat.id ? null : cat.id)}
                          className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100"
                          aria-label="More options"
                        >
                          <MoreVertical className="size-4" strokeWidth={2.2} />
                        </button>
                        <FmDropdownMenu
                          open={openMenu === cat.id}
                          onClose={() => setOpenMenu(null)}
                          items={[
                            { label: 'Open', icon: Eye },
                            { label: 'Rename', icon: Edit3 },
                            { label: 'Share', icon: Share2 },
                            { label: 'Copy link', icon: Copy },
                            { label: 'Download', icon: DownloadCloud },
                            { label: 'Move to', icon: Move },
                            { divider: true },
                            { label: 'Properties', icon: Info },
                            { label: 'Delete', icon: Trash2, danger: true },
                          ]}
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-medium text-[var(--text-strong)]">{cat.name}</p>
                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">{cat.count} files · {cat.pct}% Used · {cat.size}</p>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                      <div
                        className={cn('h-full rounded-full',
                          cat.id === 'img' && 'bg-[#10b981]',
                          cat.id === 'vid' && 'bg-[#ec4899]',
                          cat.id === 'aud' && 'bg-[#3b82f6]',
                          cat.id === 'app' && 'bg-[#f97316]',
                          cat.id === 'doc' && 'bg-[#eab308]',
                          cat.id === 'dwl' && 'bg-[#a855f7]',
                        )}
                        style={{ width: `${cat.pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ----- All Folders ----- */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="ds-section-title">All Folders</h2>
              <button className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
                <Plus className="size-3.5" strokeWidth={2.5} /> New folder
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FOLDERS.map((folder) => (
                <div
                  key={folder.id}
                  className="group relative cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--border-strong)] hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#fefce8] dark:bg-[rgba(234,179,8,0.16)]">
                      <Folder className="size-5 text-[#f59e0b]" strokeWidth={2} fill="currentColor" />
                    </span>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenu(openMenu === folder.id ? null : folder.id)}
                        className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] opacity-0 transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] group-hover:opacity-100"
                        aria-label="More options"
                      >
                        <MoreVertical className="size-4" strokeWidth={2.2} />
                      </button>
                      <FmDropdownMenu
                        open={openMenu === folder.id}
                        onClose={() => setOpenMenu(null)}
                        items={[
                          { label: 'Open folder', icon: Folder },
                          { label: 'Rename', icon: Edit3 },
                          { label: 'Share', icon: Share2 },
                          { label: 'Copy link', icon: Copy },
                          { label: 'Download all', icon: DownloadCloud },
                          { label: 'Move to', icon: Move },
                          { divider: true },
                          { label: 'Star', icon: Star },
                          { label: 'Properties', icon: Info },
                          { label: 'Delete folder', icon: Trash2, danger: true },
                        ]}
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-medium text-[var(--text-strong)]">{folder.name}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{folder.files} Files · {folder.size}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ----- Recent Files ----- */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="ds-section-title">Recent Files</h2>
              <button className="text-xs font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">View all</button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--surface-sunken)]/50">
                      <th className="py-3 pl-5 pr-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">File Name</th>
                      <th className="py-3 px-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Category</th>
                      <th className="py-3 px-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Size</th>
                      <th className="py-3 px-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Date Modified</th>
                      <th className="py-3 pl-3 pr-5 text-right text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_FILES.map((file) => {
                      const Icon = file.icon;
                      return (
                        <tr key={file.id} className="border-b border-[var(--border-subtle)] last:border-0 transition hover:bg-[var(--surface-sunken)]/40">
                          <td className="py-3 pl-5 pr-3">
                            <div className="flex items-center gap-3">
                              <span className={cn('inline-flex size-9 flex-shrink-0 items-center justify-center rounded-lg', file.tileBg)}>
                                <Icon className={cn('size-4', file.iconColor)} strokeWidth={2} />
                              </span>
                              <span className="truncate text-sm font-medium text-[var(--text-strong)]">{file.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-sm text-[var(--text-body)]">{file.category}</td>
                          <td className="py-3 px-3 text-sm text-[var(--text-body)] tabular-nums">{file.size}</td>
                          <td className="py-3 px-3 text-sm text-[var(--text-muted)]">{file.date}</td>
                          <td className="py-3 pl-3 pr-5">
                            <div className="flex items-center justify-end gap-1">
                              <button className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--color-brand-600)] dark:hover:text-[var(--color-brand-300)]" aria-label="Preview">
                                <Eye className="size-4" strokeWidth={2} />
                              </button>
                              <button className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--color-error-600)] dark:hover:text-[var(--color-error-500)]" aria-label="Delete">
                                <Trash2 className="size-4" strokeWidth={2} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* ========== RIGHT: Storage Details Donut ========== */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-base font-medium text-[var(--text-strong)]">Storage Details</h3>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === 'storage' ? null : 'storage')}
                  className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                  aria-label="More"
                >
                  <MoreVertical className="size-4" strokeWidth={2.2} />
                </button>
                <FmDropdownMenu
                  open={openMenu === 'storage'}
                  onClose={() => setOpenMenu(null)}
                  items={[
                    { label: 'Refresh', icon: RefreshCw },
                    { label: 'View breakdown', icon: Database },
                    { label: 'Export report', icon: Download },
                    { divider: true },
                    { label: 'Upgrade plan', icon: Cloud },
                  ]}
                />
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)]">{STORAGE_FREE} GB Free space left</p>

            {/* Donut chart */}
            <div className="my-5 flex justify-center">
              <div className="relative">
                <svg width="180" height="180" viewBox="0 0 180 180">
                  {/* Background circle */}
                  <circle cx="90" cy="90" r="68" fill="none" stroke="var(--surface-sunken)" strokeWidth="20" />
                  {/* Segments */}
                  {segments.map((seg, i) => {
                    const circumference = 2 * Math.PI * 68;
                    const dashLen = (seg.value / STORAGE_TOTAL) * circumference;
                    const dashOffset = -((seg.start / 360) * circumference);
                    return (
                      <circle
                        key={i}
                        cx="90"
                        cy="90"
                        r="68"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="20"
                        strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                        strokeDashoffset={dashOffset}
                        transform="rotate(-90 90 90)"
                        strokeLinecap="butt"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold tabular-nums text-[var(--text-strong)]">{STORAGE_TOTAL}</span>
                  <span className="text-xs text-[var(--text-muted)]">Total {STORAGE_TOTAL} GB</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <ul className="space-y-2.5">
              {STORAGE_SEGMENTS.map((seg) => (
                <li key={seg.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="text-[var(--text-body)]">{seg.label}</span>
                  </div>
                  <span className="font-medium tabular-nums text-[var(--text-strong)]">{seg.value.toFixed(1)} GB</span>
                </li>
              ))}
            </ul>

            <button className="mt-5 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-500)] text-sm font-medium text-white transition hover:bg-[var(--color-brand-600)]">
              <Plus className="size-4" strokeWidth={2.5} /> Buy more storage
            </button>
          </div>

          {/* Quick upload card */}
          <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--card)] p-5 text-center">
            <span className="mx-auto inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
              <Upload className="size-6" strokeWidth={2} />
            </span>
            <p className="mt-3 text-sm font-medium text-[var(--text-strong)]">Drag &amp; drop files</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">or click to browse from your computer</p>
            <label className="mt-4 inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-xs font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
              <Upload className="size-3.5" strokeWidth={2.2} /> Browse files
              <input type="file" className="hidden" multiple />
            </label>
          </div>

          {/* Activity card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h3 className="mb-3 text-base font-medium text-[var(--text-strong)]">Recent Activity</h3>
            <ul className="space-y-3">
              {[
                { action: 'Uploaded Travel.jpg', time: '2 min ago', tone: 'brand' as const },
                { action: 'Shared "Documents" with team', time: '1 hour ago', tone: 'info' as const },
                { action: 'Deleted 3 files from Trash', time: '3 hours ago', tone: 'error' as const },
                { action: 'Created folder "Q4 Reports"', time: 'Yesterday', tone: 'success' as const },
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className={cn('mt-1.5 size-2 flex-shrink-0 rounded-full',
                    a.tone === 'brand' && 'bg-[var(--color-brand-500)]',
                    a.tone === 'info' && 'bg-[var(--color-info-500)]',
                    a.tone === 'error' && 'bg-[var(--color-error-500)]',
                    a.tone === 'success' && 'bg-[var(--color-success-500)]',
                  )} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-[var(--text-body)]">{a.action}</p>
                    <p className="text-xs text-[var(--text-subtle)]">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
