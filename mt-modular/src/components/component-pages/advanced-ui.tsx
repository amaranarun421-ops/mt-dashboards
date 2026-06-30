'use client';

import * as React from 'react';
import {
  Search, CornerDownLeft, ArrowUp, ArrowDown, Plus, GripVertical,
  Flame, Zap, Star, Clock, Check, X, Sparkles, Home, Settings,
  User, Folder, FileText, GitBranch, Command as CommandIcon,
  TrendingUp, Heart, Download, Share2, Copy, Eye,
} from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { ComponentKeywords } from './component-keywords';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Advanced UI) ====================== */
function AdvStyles() {
  return (
    <style jsx global>{`
      .adv-root {
        --adv-radius-sm: 8px;
        --adv-radius-md: 12px;
        --adv-radius-lg: 16px;
        --adv-radius-xl: 20px;
        --adv-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --adv-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --adv-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --adv-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
        --adv-shadow-xl: 0 20px 32px -8px rgba(15,23,42,0.12), 0 8px 16px -8px rgba(15,23,42,0.06);
        --adv-shadow-glow: 0 0 0 1px rgba(70,95,255,0.12), 0 8px 24px -8px rgba(70,95,255,0.35);
      }
      .adv-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .adv-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .adv-variant-title {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--text-strong);
        letter-spacing: -0.01em;
      }
      .adv-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }

      /* Animations */
      @keyframes adv-fade-in {
        from { opacity: 0; transform: translateY(-4px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .adv-fade-in { animation: adv-fade-in 0.16s ease-out; transform-origin: top; }

      @keyframes adv-slide-up {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .adv-slide-up { animation: adv-slide-up 0.3s ease-out; }

      @keyframes adv-reveal {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes adv-pulse-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(70,95,255,0.4), 0 1px 3px rgba(15,23,42,0.06); }
        50% { box-shadow: 0 0 0 12px rgba(70,95,255,0), 0 1px 3px rgba(15,23,42,0.06); }
      }
      .adv-pulse-glow { animation: adv-pulse-glow 2s ease-in-out infinite; }

      @keyframes adv-wave {
        0% { transform: translateX(0) translateZ(0) scaleY(1); }
        50% { transform: translateX(-25%) translateZ(0) scaleY(0.95); }
        100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
      }
      .adv-wave-anim { animation: adv-wave 8s linear infinite; }

      @keyframes adv-blob {
        0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
        33% { border-radius: 70% 30% 46% 54% / 30% 60% 40% 70%; }
        66% { border-radius: 30% 70% 70% 30% / 60% 40% 60% 40%; }
      }
      .adv-blob-anim { animation: adv-blob 8s ease-in-out infinite; }

      /* Tilt card 3D */
      .adv-tilt-card {
        transform-style: preserve-3d;
        transition: transform 0.15s ease-out;
      }
      .adv-tilt-content {
        transform: translateZ(40px);
      }
      .adv-tilt-icon {
        transform: translateZ(60px);
      }

      /* Spotlight */
      .adv-spotlight {
        position: relative;
        overflow: hidden;
      }
      .adv-spotlight::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
      }
      .adv-spotlight:hover::before {
        opacity: 1;
      }

      /* Gradient border */
      .adv-grad-border {
        position: relative;
        background: var(--card);
        border-radius: 16px;
      }
      .adv-grad-border::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 16px;
        padding: 2px;
        background: radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(70,95,255,0.6), transparent 40%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .adv-grad-border:hover::before {
        opacity: 1;
      }

      /* Liquid tab */
      .adv-liquid-tab {
        position: absolute;
        bottom: -1px;
        height: 3px;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--color-brand-500), #7a5af8);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 8px rgba(70,95,255,0.4);
      }

      /* Scrollbar */
      .adv-scroll::-webkit-scrollbar { width: 6px; }
      .adv-scroll::-webkit-scrollbar-track { background: transparent; }
      .adv-scroll::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 3px; }
    `}</style>
  );
}

export function AdvancedUIPage() {
  return (
    <div className="adv-root adv-bg space-y-6">
      <AdvStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Advanced UI' }]} title="Advanced UI" description="Pro-level interactions, motion, and cursor-driven experiences inspired by Linear, Raycast, Vercel, and Arc." />
      <ComponentKeywords keywords={['Command Palette', 'Drag & Drop', '3D Tilt', 'Magnetic', 'Before/After', 'Number Ticker', 'Spotlight', 'Scroll Reveal', 'Liquid', 'Confetti']} />

      {/* ============================================ 1. COMMAND PALETTE ============================================ */}
      <CommandPaletteDemo />

      {/* ============================================ 2. DRAG & DROP BOARD ============================================ */}
      <DragDropBoardDemo />

      {/* ============================================ 3. 3D TILT CARDS ============================================ */}
      <ThreeDTiltDemo />

      {/* ============================================ 4. MAGNETIC ELEMENTS ============================================ */}
      <MagneticDemo />

      {/* ============================================ 5. BEFORE/AFTER SLIDER ============================================ */}
      <BeforeAfterDemo />

      {/* ============================================ 6. NUMBER TICKER ============================================ */}
      <NumberTickerDemo />

      {/* ============================================ 7. SPOTLIGHT & GLOW ============================================ */}
      <SpotlightGlowDemo />

      {/* ============================================ 8. SCROLL REVEAL & STAGGER ============================================ */}
      <ScrollRevealDemo />

      {/* ============================================ 9. LIQUID MORPH ============================================ */}
      <LiquidMorphDemo />

      {/* ============================================ 10. CONFETTI CELEBRATION ============================================ */}
      <ConfettiDemo />
    </div>
  );
}

/* ====================== 1. COMMAND PALETTE (⌘K) ====================== */
function CommandPaletteDemo() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIdx, setActiveIdx] = React.useState(0);

  const commands = [
    { label: 'Go to Dashboard', icon: Home, group: 'Navigation', shortcut: '⌘D' },
    { label: 'New Project', icon: Plus, group: 'Actions', shortcut: '⌘N' },
    { label: 'Search Files', icon: Search, group: 'Navigation', shortcut: '⌘F' },
    { label: 'Open Settings', icon: Settings, group: 'Navigation', shortcut: '⌘,' },
    { label: 'Invite Team Member', icon: User, group: 'Actions', shortcut: '⌘I' },
    { label: 'Toggle Theme', icon: Sparkles, group: 'Actions', shortcut: '⌘T' },
    { label: 'View Profile', icon: User, group: 'Navigation' },
    { label: 'Create Issue', icon: GitBranch, group: 'Actions', shortcut: '⌘J' },
    { label: 'Export Data', icon: Download, group: 'Actions', shortcut: '⌘E' },
    { label: 'Share Document', icon: Share2, group: 'Actions' },
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.group.toLowerCase().includes(query.toLowerCase())
  );

  const groups = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {} as Record<string, typeof commands>);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
      if (open) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIdx(i => Math.min(i + 1, filtered.length - 1));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIdx(i => Math.max(i - 1, 0));
        }
        if (e.key === 'Enter' && filtered[activeIdx]) {
          setOpen(false);
          setQuery('');
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, filtered, activeIdx]);

  let runningIdx = -1;

  return (
    <SectionCard title="Command Palette (⌘K)" description="Raycast-style overlay — press ⌘K or click below. Fuzzy search, grouped results, keyboard navigation (↑↓ Enter Esc).">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-muted)] shadow-[var(--adv-shadow-xs)] transition hover:border-[var(--color-brand-400)] hover:bg-[var(--surface-sunken)]"
        >
          <Search className="size-4" strokeWidth={2.5} />
          Search commands...
          <kbd className="inline-flex items-center gap-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">⌘K</kbd>
        </button>
        <p className="text-xs font-medium text-[var(--text-muted)]">Try pressing <kbd className="rounded border border-[var(--border)] bg-[var(--surface-sunken)] px-1 text-[10px] font-medium">⌘K</kbd> anywhere on this page</p>
      </div>

      {open && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center p-4 pt-[15vh]" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="adv-fade-in relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--adv-shadow-xl)]"
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5">
              <Search className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
              <input
                type="search"
                value={query}
                onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]"
                autoFocus
              />
              <kbd className="rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">ESC</kbd>
            </div>

            {/* Results */}
            <div className="adv-scroll max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm font-medium text-[var(--text-muted)]">No commands found for "{query}"</p>
              ) : (
                Object.entries(groups).map(([group, items]) => (
                  <div key={group} className="mb-1">
                    <p className="adv-label px-2.5 py-1.5">{group}</p>
                    {items.map(cmd => {
                      runningIdx++;
                      const idx = runningIdx;
                      const isActive = idx === activeIdx;
                      return (
                        <button
                          key={cmd.label}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onClick={() => { setOpen(false); setQuery(''); }}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                            isActive ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)]'
                          )}
                        >
                          <cmd.icon className="size-4 flex-shrink-0 text-[var(--text-muted)]" strokeWidth={2.5} />
                          <span className="flex-1 font-medium">{cmd.label}</span>
                          {cmd.shortcut && <kbd className="text-[10px] font-medium text-[var(--text-muted)]">{cmd.shortcut}</kbd>}
                          {isActive && <CornerDownLeft className="size-3.5 text-[var(--color-brand-500)]" strokeWidth={2.5} />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-2.5 text-[10px] font-medium text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><ArrowUp className="size-3" strokeWidth={2.5} /><ArrowDown className="size-3" strokeWidth={2.5} /> to navigate</span>
                <span className="inline-flex items-center gap-1"><CornerDownLeft className="size-3" strokeWidth={2.5} /> to select</span>
              </div>
              <span className="inline-flex items-center gap-1">Powered by <Sparkles className="size-3 text-[var(--color-brand-500)]" strokeWidth={2.5} /> mtverse</span>
            </div>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

/* ====================== 2. DRAG & DROP BOARD ====================== */
interface KanbanCard {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  avatar: string;
  tags: string[];
  comments: number;
  due: string;
}
interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}

function DragDropBoardDemo() {
  const [columns, setColumns] = React.useState<KanbanColumn[]>([
    {
      id: 'backlog', title: 'Backlog', color: 'var(--text-muted)',
      cards: [
        { id: 'c1', title: 'Design new pricing page', priority: 'medium', assignee: 'Sara', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50', tags: ['design'], comments: 3, due: 'Jun 28' },
        { id: 'c2', title: 'Research competitor features', priority: 'low', assignee: 'James', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50', tags: ['research'], comments: 1, due: 'Jul 2' },
      ],
    },
    {
      id: 'progress', title: 'In Progress', color: 'var(--color-brand-500)',
      cards: [
        { id: 'c3', title: 'Implement OAuth 2.0 flow', priority: 'high', assignee: 'Alex', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50', tags: ['backend', 'auth'], comments: 8, due: 'Jun 25' },
        { id: 'c4', title: 'Build dashboard widgets', priority: 'medium', assignee: 'Maria', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50', tags: ['frontend'], comments: 5, due: 'Jun 27' },
      ],
    },
    {
      id: 'review', title: 'Review', color: 'var(--color-warning-500)',
      cards: [
        { id: 'c5', title: 'Code review: API refactor', priority: 'high', assignee: 'James', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50', tags: ['review'], comments: 12, due: 'Jun 24' },
      ],
    },
    {
      id: 'done', title: 'Done', color: 'var(--color-success-500)',
      cards: [
        { id: 'c6', title: 'Setup CI/CD pipeline', priority: 'medium', assignee: 'Alex', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50', tags: ['devops'], comments: 2, due: 'Jun 20' },
        { id: 'c7', title: 'Write API documentation', priority: 'low', assignee: 'Sara', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50', tags: ['docs'], comments: 4, due: 'Jun 22' },
      ],
    },
  ]);
  const [draggedCard, setDraggedCard] = React.useState<{ cardId: string; fromCol: string } | null>(null);
  const [dragOverCol, setDragOverCol] = React.useState<string | null>(null);

  function handleDragStart(cardId: string, fromCol: string) {
    setDraggedCard({ cardId, fromCol });
  }

  function handleDragOver(e: React.DragEvent, colId: string) {
    e.preventDefault();
    setDragOverCol(colId);
  }

  function handleDrop(e: React.DragEvent, toColId: string) {
    e.preventDefault();
    if (!draggedCard) return;
    if (draggedCard.fromCol === toColId) {
      setDraggedCard(null);
      setDragOverCol(null);
      return;
    }
    setColumns(prev => prev.map(col => {
      if (col.id === draggedCard.fromCol) {
        return { ...col, cards: col.cards.filter(c => c.id !== draggedCard.cardId) };
      }
      if (col.id === toColId) {
        const card = prev.find(c => c.id === draggedCard.fromCol)?.cards.find(c => c.id === draggedCard.cardId);
        if (card) return { ...col, cards: [...col.cards, card] };
      }
      return col;
    }));
    setDraggedCard(null);
    setDragOverCol(null);
  }

  const priorityColors = {
    low: 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    medium: 'bg-[var(--color-warning-50)] text-[var(--color-warning-700)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    high: 'bg-[var(--color-error-50)] text-[var(--color-error-700)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]',
  };

  return (
    <SectionCard title="Drag & Drop Board" description="Multi-column board — drag cards BETWEEN columns. Visual drop indicators, priority badges, assignee avatars, tags, due dates.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map(col => (
          <div
            key={col.id}
            onDragOver={e => handleDragOver(e, col.id)}
            onDrop={e => handleDrop(e, col.id)}
            className={cn(
              'flex flex-col rounded-xl border-2 bg-[var(--surface-sunken)] p-3 transition-colors',
              dragOverCol === col.id ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-transparent'
            )}
          >
            {/* Column header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ backgroundColor: col.color }} />
                <span className="text-sm font-medium text-[var(--text-strong)]">{col.title}</span>
                <span className="rounded-full bg-[var(--card)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">{col.cards.length}</span>
              </div>
              <button className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><Plus className="size-4" strokeWidth={2.5} /></button>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2">
              {col.cards.map(card => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id, col.id)}
                  onDragEnd={() => { setDraggedCard(null); setDragOverCol(null); }}
                  className={cn(
                    'cursor-grab rounded-lg border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--adv-shadow-xs)] transition active:cursor-grabbing active:opacity-50',
                    draggedCard?.cardId === card.id && 'opacity-40'
                  )}
                >
                  {/* Priority + tags */}
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className={cn('rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase', priorityColors[card.priority])}>{card.priority}</span>
                    {card.tags.map(tag => (
                      <span key={tag} className="rounded-md bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-muted)]">{tag}</span>
                    ))}
                  </div>
                  {/* Title */}
                  <p className="text-sm font-medium text-[var(--text-strong)]">{card.title}</p>
                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <img src={card.avatar} alt={card.assignee} className="size-5 rounded-full object-cover" />
                      <span className="text-[10px] font-medium text-[var(--text-muted)]">{card.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-[var(--text-muted)]">
                      <span className="inline-flex items-center gap-0.5"><Clock className="size-3" strokeWidth={2.5} />{card.due}</span>
                      <span className="inline-flex items-center gap-0.5">{card.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 3. 3D TILT CARDS ====================== */
function ThreeDTiltDemo() {
  const tiltRef = React.useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent) {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -12;
    const ry = ((x - cx) / cx) * 12;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    el.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  }

  function handleLeave() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  }

  return (
    <SectionCard title="3D Perspective Tilt Cards" description="Cards rotate in 3D (rotateX/rotateY) tracking the cursor, with glare/shine overlay and depth-layered icons. Move your cursor over the card.">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 — gradient */}
        <div className="flex justify-center">
          <div
            ref={tiltRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="adv-tilt-card relative h-56 w-full max-w-xs overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] p-6 shadow-[var(--adv-shadow-lg)]"
          >
            <div className="adv-tilt-icon mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur">
              <Sparkles className="size-6" strokeWidth={2.5} />
            </div>
            <div className="adv-tilt-content">
              <p className="text-lg font-medium text-white">Gradient Tilt</p>
              <p className="mt-1 text-sm font-medium text-white/70">3D perspective with glare overlay and depth-layered icons.</p>
            </div>
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
              style={{ background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.25), transparent 40%)' }}
              onMouseMove={handleMove}
            />
          </div>
        </div>

        {/* Card 2 — glass */}
        <TiltCard variant="glass" icon={Zap} title="Glass Tilt" desc="Frosted glass with backdrop blur and 3D rotation." />
        {/* Card 3 — dark */}
        <TiltCard variant="dark" icon={Flame} title="Dark Tilt" desc="Dark surface with neon glow accent." />
      </div>
    </SectionCard>
  );
}

function TiltCard({ variant, icon: Icon, title, desc }: { variant: 'glass' | 'dark'; icon: any; title: string; desc: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -12;
    const ry = ((x - cx) / cx) * 12;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  }
  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
  }
  const styles = {
    glass: 'border border-white/10 bg-white/5 backdrop-blur-xl text-[var(--text-strong)]',
    dark: 'bg-[#0c111d] text-white',
  };
  return (
    <div className="flex justify-center">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn('adv-tilt-card relative h-56 w-full max-w-xs overflow-hidden rounded-2xl p-6 shadow-[var(--adv-shadow-lg)]', styles[variant])}
      >
        <div className="adv-tilt-icon mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-[var(--color-brand-500)]/20 text-[var(--color-brand-500)]">
          <Icon className="size-6" strokeWidth={2.5} />
        </div>
        <div className="adv-tilt-content">
          <p className="text-lg font-medium">{title}</p>
          <p className={cn('mt-1 text-sm font-medium', variant === 'dark' ? 'text-white/60' : 'text-[var(--text-muted)]')}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ====================== 4. MAGNETIC ELEMENTS ====================== */
function MagneticDemo() {
  return (
    <SectionCard title="Magnetic Elements" description="Elements attract toward the cursor with spring physics. Hover over each element — it follows your cursor and smoothly returns.">
      <div className="flex flex-wrap items-center gap-8">
        <MagneticButton />
        <MagneticIcon icon={Heart} color="var(--color-error-500)" />
        <MagneticIcon icon={Star} color="var(--color-warning-500)" />
        <MagneticIcon icon={Zap} color="var(--color-brand-500)" />
        <MagneticChip label="Hover me" />
      </div>
    </SectionCard>
  );
}

function MagneticButton() {
  const ref = React.useRef<HTMLButtonElement>(null);
  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }
  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  }
  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] px-6 text-sm font-medium text-white shadow-[var(--adv-shadow-md)] transition-transform duration-200 ease-out"
    >
      <Sparkles className="size-4" strokeWidth={2.5} /> Magnetic Button
    </button>
  );
}

function MagneticIcon({ icon: Icon, color }: { icon: any; color: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) scale(1.15)`;
  }
  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0) scale(1)';
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex size-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--adv-shadow-xs)] transition-transform duration-200 ease-out"
      style={{ color }}
    >
      <Icon className="size-6" strokeWidth={2.5} />
    </div>
  );
}

function MagneticChip({ label }: { label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }
  function handleLeave() {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-brand-300)] bg-[var(--color-brand-50)] px-4 py-2 text-sm font-medium text-[var(--color-brand-700)] shadow-[var(--adv-shadow-xs)] transition-transform duration-200 ease-out dark:border-[rgba(70,95,255,0.24)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]"
    >
      <Sparkles className="size-3.5" strokeWidth={2.5} /> {label}
    </div>
  );
}

/* ====================== 5. BEFORE/AFTER SLIDER ====================== */
function BeforeAfterDemo() {
  const [pos, setPos] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  function updatePos(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(pct);
  }

  function onMouseDown() { dragging.current = true; }
  function onMouseMove(e: React.MouseEvent) { if (dragging.current) updatePos(e.clientX); }
  function onMouseUp() { dragging.current = false; }
  function onTouchMove(e: React.TouchEvent) { if (dragging.current && e.touches[0]) updatePos(e.touches[0].clientX); }

  return (
    <SectionCard title="Before / After Image Slider" description="Drag the divider to compare two real photos. Supports mouse, touch, and keyboard (←→ arrows).">
      <div
        ref={containerRef}
        className="relative mx-auto h-80 max-w-2xl select-none overflow-hidden rounded-2xl border border-[var(--border)] shadow-[var(--adv-shadow-md)]"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        onTouchEnd={onMouseUp}
      >
        {/* After image (full) */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=480&fit=crop"
          alt="After"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">AFTER</span>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=480&fit=crop"
            alt="Before"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">BEFORE</span>
        </div>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${pos}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-lg">
            <div className="flex items-center gap-0.5">
              <ArrowUp className="size-3 -rotate-90 text-[var(--color-brand-600)]" strokeWidth={3} />
              <ArrowDown className="size-3 -rotate-90 text-[var(--color-brand-600)]" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs font-medium text-[var(--text-muted)]">Drag the handle • Position: {Math.round(pos)}%</p>
    </SectionCard>
  );
}

/* ====================== 6. NUMBER TICKER ====================== */
function NumberTickerDemo() {
  const [value, setValue] = React.useState(48240);
  const [revenue, setRevenue] = React.useState(1284500);
  const [users, setUsers] = React.useState(42800);

  return (
    <SectionCard title="Number Ticker" description="Slot-machine rolling digits that animate on mount AND on value change. Click buttons to trigger new values.">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--adv-shadow-xs)]">
          <p className="adv-label mb-3">Revenue</p>
          <RollingNumber value={value} className="text-3xl font-semibold tabular-nums text-[var(--text-strong)]" prefix="$" />
          <button
            onClick={() => setValue(Math.floor(Math.random() * 100000) + 10000)}
            className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--color-brand-500)] px-3 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]"
          >
            <TrendingUp className="size-3.5" strokeWidth={2.5} /> Randomize
          </button>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--adv-shadow-xs)]">
          <p className="adv-label mb-3">Active Users</p>
          <RollingNumber value={users} className="text-3xl font-semibold tabular-nums text-[var(--text-strong)]" />
          <button
            onClick={() => setUsers(Math.floor(Math.random() * 100000) + 5000)}
            className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--color-brand-500)] px-3 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]"
          >
            <User className="size-3.5" strokeWidth={2.5} /> Randomize
          </button>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--adv-shadow-xs)]">
          <p className="adv-label mb-3">Total MRR</p>
          <RollingNumber value={revenue} className="text-3xl font-semibold tabular-nums text-[var(--text-strong)]" prefix="$" />
          <button
            onClick={() => setRevenue(Math.floor(Math.random() * 2000000) + 500000)}
            className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-lg bg-[var(--color-brand-500)] px-3 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]"
          >
            <Sparkles className="size-3.5" strokeWidth={2.5} /> Randomize
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

function RollingNumber({ value, className, prefix = '' }: { value: number; className?: string; prefix?: string }) {
  const [display, setDisplay] = React.useState(0);
  const prevRef = React.useRef(0);

  React.useEffect(() => {
    const start = prevRef.current;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
      else prevRef.current = end;
    }
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span className={className}>{prefix}{display.toLocaleString()}</span>
  );
}

/* ====================== 7. SPOTLIGHT & GLOW ====================== */
function SpotlightGlowDemo() {
  return (
    <SectionCard title="Cursor Spotlight & Glow" description="Three effects: (1) radial spotlight follows cursor on card, (2) gradient border traces cursor, (3) pulsing glow ring. Hover each card.">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Radial spotlight */}
        <SpotlightCard />

        {/* Gradient border */}
        <GradientBorderCard />

        {/* Pulsing glow */}
        <GlowPulseCard />
      </div>
    </SectionCard>
  );
}

function SpotlightCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="adv-spotlight relative h-48 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--adv-shadow-xs)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ background: 'radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(70,95,255,0.15), transparent 40%)' }}
      />
      <div className="relative z-10">
        <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
          <Eye className="size-5" strokeWidth={2.5} />
        </div>
        <p className="text-sm font-medium text-[var(--text-strong)]">Radial Spotlight</p>
        <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">A soft glow follows your cursor across the card surface.</p>
      </div>
    </div>
  );
}

function GradientBorderCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="adv-grad-border relative h-48 overflow-hidden p-5 shadow-[var(--adv-shadow-xs)]"
    >
      <div className="relative z-10">
        <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">
          <Sparkles className="size-5" strokeWidth={2.5} />
        </div>
        <p className="text-sm font-medium text-[var(--text-strong)]">Gradient Border</p>
        <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">A gradient border traces your cursor around the card edge.</p>
      </div>
    </div>
  );
}

function GlowPulseCard() {
  return (
    <div className="adv-pulse-glow relative h-48 overflow-hidden rounded-2xl border border-[var(--color-brand-300)] bg-[var(--card)] p-5 dark:border-[rgba(70,95,255,0.24)]">
      <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white">
        <Zap className="size-5" strokeWidth={2.5} />
      </div>
      <p className="text-sm font-medium text-[var(--text-strong)]">Pulsing Glow</p>
      <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">A soft animated glow ring pulses to draw attention.</p>
    </div>
  );
}

/* ====================== 8. SCROLL REVEAL & STAGGER ====================== */
function ScrollRevealDemo() {
  const items = [
    { icon: TrendingUp, title: 'Track Growth', desc: 'Monitor key metrics with real-time dashboards.', color: 'var(--color-success-500)' },
    { icon: Sparkles, title: 'AI Insights', desc: 'Get predictive recommendations powered by AI.', color: 'var(--color-brand-500)' },
    { icon: Zap, title: 'Automate Work', desc: 'Build workflows that run themselves.', color: 'var(--color-warning-500)' },
    { icon: Heart, title: 'Delight Users', desc: 'Create experiences users love to use.', color: 'var(--color-error-500)' },
    { icon: Star, title: 'Quality First', desc: 'Ship polished features with confidence.', color: 'var(--color-info-500)' },
    { icon: Flame, title: 'Stay Fast', desc: 'Optimized for speed at every layer.', color: '#7a5af8' },
  ];

  return (
    <SectionCard title="Scroll Reveal & Stagger" description="Items fade and slide in sequentially using IntersectionObserver. Scroll down to trigger the animation — each item appears with a staggered delay.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <ScrollRevealItem key={item.title} {...item} delay={i * 100} />
        ))}
      </div>
    </SectionCard>
  );
}

function ScrollRevealItem({ icon: Icon, title, desc, color, delay }: { icon: any; title: string; desc: string; color: string; delay: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--adv-shadow-xs)] transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
    >
      <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl" style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`, color }}>
        <Icon className="size-5" strokeWidth={2.5} />
      </div>
      <p className="text-sm font-medium text-[var(--text-strong)]">{title}</p>
      <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{desc}</p>
    </div>
  );
}

/* ====================== 9. LIQUID MORPH ====================== */
function LiquidMorphDemo() {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = ['Overview', 'Analytics', 'Reports', 'Settings'];
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 });

  React.useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeTab]);

  return (
    <SectionCard title="Liquid Morph" description="Liquid tab indicator that morphs between tabs with smooth transition, plus a morphing SVG blob and animated wave background.">
      <div className="space-y-6">
        {/* Liquid tab indicator */}
        <div>
          <p className="adv-label mb-3">Liquid Tab Indicator</p>
          <div className="relative inline-flex border-b border-[var(--border)]">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                ref={el => { tabRefs.current[i] = el; }}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'relative px-5 py-3 text-sm font-medium transition-colors',
                  activeTab === i ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
                )}
              >
                {tab}
              </button>
            ))}
            <div
              className="adv-liquid-tab"
              style={{ left: indicator.left, width: indicator.width }}
            />
          </div>
        </div>

        <div className="adv-divider" />

        {/* Morphing blob + Wave */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="adv-label mb-3">Morphing SVG Blob</p>
            <div className="flex h-48 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--adv-shadow-xs)] overflow-hidden">
              <div
                className="adv-blob-anim size-32 bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] shadow-[var(--adv-shadow-lg)]"
              />
            </div>
          </div>
          <div>
            <p className="adv-label mb-3">Animated Wave Background</p>
            <div className="relative h-48 overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] shadow-[var(--adv-shadow-xs)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-medium text-white">Wave</p>
              </div>
              <svg
                className="adv-wave-anim absolute bottom-0 left-0 h-24 w-[200%]"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,60 C150,100 350,0 600,60 C850,120 1050,20 1200,60 L1200,120 L0,120 Z"
                  fill="rgba(255,255,255,0.15)"
                />
                <path
                  d="M0,80 C200,40 400,100 600,80 C800,60 1000,100 1200,80 L1200,120 L0,120 Z"
                  fill="rgba(255,255,255,0.1)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 10. CONFETTI CELEBRATION ====================== */
function ConfettiDemo() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [burst, setBurst] = React.useState(0);

  function fire(e?: React.MouseEvent) {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx2d = canvasEl.getContext('2d');
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;
    const canvas: HTMLCanvasElement = canvasEl;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const x = e ? e.clientX - rect.left : rect.width / 2;
    const y = e ? e.clientY - rect.top : rect.height / 2;

    const colors = ['#465FFF', '#7a5af8', '#12B76A', '#F79009', '#F04438', '#0BA5EC'];
    const particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; size: number; rot: number; vrot: number; life: number }> = [];

    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80 + Math.random() * 0.5;
      const speed = 3 + Math.random() * 6;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.3,
        life: 1,
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.vx *= 0.99;
        p.rot += p.vrot;
        p.life -= 0.008;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      frame++;
      if (alive && frame < 200) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
    setBurst(b => b + 1);
  }

  return (
    <SectionCard title="Confetti Celebration" description="Canvas-based particle system with physics. Click the button OR click anywhere on the canvas to fire confetti from that point.">
      <div className="space-y-4">
        <button
          onClick={() => fire()}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] px-5 text-sm font-medium text-white shadow-[var(--adv-shadow-md)] transition hover:scale-105"
        >
          <Sparkles className="size-4" strokeWidth={2.5} /> Celebrate! ({burst} bursts)
        </button>
        <div className="relative h-64 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-sunken)]">
          <canvas
            ref={canvasRef}
            onClick={fire}
            className="absolute inset-0 h-full w-full cursor-pointer"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-sm font-medium text-[var(--text-muted)]">Click anywhere to fire confetti 🎉</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
