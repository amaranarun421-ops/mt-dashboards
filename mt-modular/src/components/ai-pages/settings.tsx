'use client';

import * as React from 'react';
import {
  Search,
  ChevronDown,
  User,
  Settings as SettingsIcon,
  CreditCard,
  SlidersHorizontal,
  Brain,
  FileText,
  Cpu,
  Plug,
  ShieldCheck,
  Sparkles,
  Star,
  Plus,
  Check,
  Key,
  Eye,
  EyeOff,
  Copy,
  AlertTriangle,
  Zap,
  DollarSign,
  Bell,
  Globe,
  Lock,
  HardDrive,
  Trash2,
  RefreshCw,
  Database,
  CloudUpload,
  FileImage,
  Network,
  Webhook,
  Mail,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

/* ========================================================================
   Model registry — for the "Models" page (default landing)
   ======================================================================== */
interface AIModel {
  id: string;
  name: string;
  vendor: string;
  description: string;
  category: 'chat' | 'image' | 'video' | 'audio' | 'embedding';
  badge?: 'NEW' | 'PRO' | 'BETA';
  enabled: boolean;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const INITIAL_MODELS: AIModel[] = [
  { id: 'gpt-5.5', name: 'ChatGPT 5.5', vendor: 'OpenAI', description: 'Most capable OpenAI model for complex reasoning and multimodal tasks.', category: 'chat', badge: 'NEW', enabled: false, icon: Sparkles, iconBg: 'bg-[#0a6f6f]/10', iconColor: 'text-[#0a6f6f]' },
  { id: 'gpt-4.5', name: 'ChatGPT 4.5', vendor: 'OpenAI', description: 'Balanced chat model — great default for most tasks.', category: 'chat', enabled: true, icon: Sparkles, iconBg: 'bg-[#0a6f6f]/10', iconColor: 'text-[#0a6f6f]' },
  { id: 'claude-sonnet-4.6', name: 'Claude Sonnet 4.6', vendor: 'Anthropic', description: 'Fast, capable, and cost-effective. Great for code and analysis.', category: 'chat', badge: 'NEW', enabled: false, icon: Star, iconBg: 'bg-[#cc785c]/10', iconColor: 'text-[#cc785c]' },
  { id: 'claude-opus-4.6', name: 'Claude Opus 4.6', vendor: 'Anthropic', description: 'Anthropic\'s most powerful model for deep reasoning.', category: 'chat', enabled: false, icon: Star, iconBg: 'bg-[#cc785c]/10', iconColor: 'text-[#cc785c]' },
  { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro', vendor: 'Google', description: 'Google\'s flagship multimodal model with 1M token context.', category: 'chat', enabled: false, icon: Sparkles, iconBg: 'bg-[#4285F4]/10', iconColor: 'text-[#4285F4]' },
  { id: 'gemini-3-flash', name: 'Gemini 3 Flash', vendor: 'Google', description: 'Fast and lightweight Gemini variant for high-throughput tasks.', category: 'chat', enabled: false, icon: Sparkles, iconBg: 'bg-[#4285F4]/10', iconColor: 'text-[#4285F4]' },
  { id: 'grok-3', name: 'Grok 3', vendor: 'xAI', description: 'Real-time knowledge with witty personality.', category: 'chat', badge: 'NEW', enabled: false, icon: Sparkles, iconBg: 'bg-black/10 dark:bg-white/10', iconColor: 'text-[var(--text-strong)]' },
  { id: 'grok-2', name: 'Grok 2.0', vendor: 'xAI', description: 'Previous Grok generation — solid for general chat.', category: 'chat', enabled: false, icon: Sparkles, iconBg: 'bg-black/10 dark:bg-white/10', iconColor: 'text-[var(--text-strong)]' },
  { id: 'nano-banana-pro', name: 'Nano Banana Pro', vendor: 'Google', description: 'Premium image generation model with photorealistic output.', category: 'image', badge: 'PRO', enabled: true, icon: Star, iconBg: 'bg-[var(--color-warning-500)]/10', iconColor: 'text-[var(--color-warning-600)]' },
  { id: 'dall-e-3', name: 'DALL-E 3', vendor: 'OpenAI', description: 'Versatile image generation with strong prompt adherence.', category: 'image', enabled: false, icon: Sparkles, iconBg: 'bg-[#0a6f6f]/10', iconColor: 'text-[#0a6f6f]' },
  { id: 'flux-pro', name: 'FLUX Pro', vendor: 'Black Forest Labs', description: 'Open-weights image model with excellent composition.', category: 'image', enabled: false, icon: Sparkles, iconBg: 'bg-[#7a5af8]/10', iconColor: 'text-[#7a5af8]' },
  { id: 'veo-3.1', name: 'Google Veo 3.1', vendor: 'Google', description: 'Cinematic video generation with audio sync.', category: 'video', badge: 'NEW', enabled: true, icon: Sparkles, iconBg: 'bg-[#4285F4]/10', iconColor: 'text-[#4285F4]' },
  { id: 'sora', name: 'OpenAI Sora', vendor: 'OpenAI', description: 'Up to 60s photorealistic video from text prompts.', category: 'video', enabled: false, icon: Sparkles, iconBg: 'bg-[#0a6f6f]/10', iconColor: 'text-[#0a6f6f]' },
  { id: 'runway-gen3', name: 'Runway Gen-3', vendor: 'Runway', description: 'Creative video tool with motion brush and camera control.', category: 'video', enabled: false, icon: Sparkles, iconBg: 'bg-[#00A878]/10', iconColor: 'text-[#00A878]' },
];

/* ========================================================================
   Sidebar navigation — sectioned like the reference
   ======================================================================== */
type SectionKey = 'account' | 'general' | 'billing' | 'personalization' | 'memory' | 'files' | 'models' | 'connectors' | 'data-control';

interface NavItem {
  key: SectionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  section: 'ACCOUNT' | 'FEATURES' | 'SYSTEM';
}

const NAV_ITEMS: NavItem[] = [
  { key: 'account', label: 'Account', icon: User, section: 'ACCOUNT' },
  { key: 'general', label: 'General', icon: SettingsIcon, section: 'ACCOUNT' },
  { key: 'billing', label: 'Credit and Billing', icon: CreditCard, section: 'ACCOUNT' },
  { key: 'personalization', label: 'Personalization', icon: SlidersHorizontal, section: 'ACCOUNT' },
  { key: 'memory', label: 'Memory', icon: Brain, section: 'FEATURES' },
  { key: 'files', label: 'File & Media', icon: FileText, section: 'FEATURES' },
  { key: 'models', label: 'Model', icon: Cpu, section: 'FEATURES' },
  { key: 'connectors', label: 'Connector', icon: Plug, section: 'SYSTEM' },
  { key: 'data-control', label: 'Data Control', icon: ShieldCheck, section: 'SYSTEM' },
];

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'chat', label: 'Chat' },
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' },
  { value: 'embedding', label: 'Embedding' },
];

const GENERATIONS = [
  { value: 'all', label: 'All Generation' },
  { value: 'text', label: 'Text Generation' },
  { value: 'image', label: 'Image Generation' },
  { value: 'video', label: 'Video Generation' },
];

export function AISettingsPage() {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = React.useState<SectionKey>('models');
  const [models, setModels] = React.useState<AIModel[]>(INITIAL_MODELS);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [generationFilter, setGenerationFilter] = React.useState('all');
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  function toggleModel(id: string) {
    setModels((prev) => prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)));
    const m = models.find((x) => x.id === id);
    if (m) toast({ title: `${m.name} ${m.enabled ? 'disabled' : 'enabled'}` });
  }

  const filteredModels = models.filter((m) => {
    if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) && !m.vendor.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    return true;
  });

  const activeNavItem = NAV_ITEMS.find((n) => n.key === activeSection) ?? NAV_ITEMS.find((n) => n.key === 'models')!;

  return (
    <div className="flex h-[calc(100vh-74px)] overflow-hidden bg-[var(--background)]">
      {/* ============================================
          LEFT SIDEBAR — Sectioned navigation (like reference)
          ============================================ */}
      <aside className="flex w-72 shrink-0 flex-col border-r border-[var(--border-subtle)] bg-[var(--card)]">
        {/* User profile card at top */}
        <div className="relative shrink-0 p-4">
          <button
            type="button"
            onClick={() => setUserMenuOpen((p) => !p)}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[var(--surface-sunken)]"
          >
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-sm font-medium text-white">
              SC
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--text-strong)]">Shamarof Chy</p>
              <p className="truncate text-xs font-normal text-[var(--text-muted)]">Personal</p>
            </div>
            <ChevronDown className="size-4 shrink-0 text-[var(--text-muted)]" />
          </button>
          {userMenuOpen && (
            <div className="absolute left-4 right-4 top-[68px] z-50 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
              {['Switch to Team', 'Manage workspaces', 'Sign out'].map((label) => (
                <button key={label} type="button" onClick={() => { setUserMenuOpen(false); toast({ title: label }); }} className="block w-full px-3 py-2 text-left text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sectioned navigation — ACCOUNT / FEATURES / SYSTEM */}
        <nav className="flex-1 overflow-y-auto modern-scrollbar px-3 pb-3">
          {(['ACCOUNT', 'FEATURES', 'SYSTEM'] as const).map((section) => (
            <div key={section} className="mb-4">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">{section}</p>
              <div className="space-y-0.5">
                {NAV_ITEMS.filter((n) => n.section === section).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveSection(item.key)}
                      className={cn(
                        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition',
                        isActive
                          ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]'
                          : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]',
                      )}
                    >
                      <Icon className={cn('size-4 shrink-0', isActive ? 'text-[var(--color-brand-500)]' : 'text-[var(--text-muted)]')} />
                      <span className="flex-1 truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* ============================================
          MAIN CONTENT — section title + content
          ============================================ */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Section header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--card)] px-6">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-semibold text-[var(--text-strong)]">{activeNavItem.label}</h1>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">ALL {activeNavItem.section}</p>
          </div>
          {activeSection === 'models' && (
            <button type="button" onClick={() => toast({ title: 'Add custom model', description: 'Connect any OpenAI-compatible endpoint' })} className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]">
              <Plus className="size-3.5" /> Add Model
            </button>
          )}
        </div>

        {/* Content scroll area */}
        <div className="flex-1 overflow-y-auto modern-scrollbar">
          {activeSection === 'models' ? (
            <ModelsPageContent
              models={filteredModels}
              allModels={models}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategory={setCategoryFilter}
              generationFilter={generationFilter}
              onGeneration={setGenerationFilter}
              onToggle={toggleModel}
            />
          ) : activeSection === 'account' ? (
            <AccountSection />
          ) : activeSection === 'general' ? (
            <GeneralSection />
          ) : activeSection === 'billing' ? (
            <BillingSection />
          ) : activeSection === 'personalization' ? (
            <PersonalizationSection />
          ) : activeSection === 'memory' ? (
            <MemorySection />
          ) : activeSection === 'files' ? (
            <FilesSection />
          ) : activeSection === 'connectors' ? (
            <ConnectorsSection />
          ) : activeSection === 'data-control' ? (
            <DataControlSection />
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   Models page content — search bar + filter dropdowns + model list with toggles
   ======================================================================== */
interface ModelsPageProps {
  models: AIModel[];
  allModels: AIModel[];
  searchQuery: string;
  onSearch: (v: string) => void;
  categoryFilter: string;
  onCategory: (v: string) => void;
  generationFilter: string;
  onGeneration: (v: string) => void;
  onToggle: (id: string) => void;
}

function ModelsPageContent({ models, allModels, searchQuery, onSearch, categoryFilter, onCategory, generationFilter, onGeneration, onToggle }: ModelsPageProps) {
  const [showCatMenu, setShowCatMenu] = React.useState(false);
  const [showGenMenu, setShowGenMenu] = React.useState(false);
  const catRef = React.useRef<HTMLDivElement>(null);
  const genRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setShowCatMenu(false);
      if (genRef.current && !genRef.current.contains(e.target as Node)) setShowGenMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const enabledCount = allModels.filter((m) => m.enabled).length;

  return (
    <div className="mx-auto max-w-3xl px-6 py-6">
      {/* Search + filter row */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search Model..."
            className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] pl-10 pr-3 text-sm font-normal text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-400)] focus:ring-[3px] focus:ring-[rgba(70,95,255,0.10)]"
          />
        </div>

        <div className="relative" ref={catRef}>
          <button type="button" onClick={() => setShowCatMenu((p) => !p)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
            {CATEGORIES.find((c) => c.value === categoryFilter)?.label}
            <ChevronDown className="size-3.5 text-[var(--text-muted)]" />
          </button>
          {showCatMenu && (
            <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
              {CATEGORIES.map((c) => (
                <button key={c.value} type="button" onClick={() => { onCategory(c.value); setShowCatMenu(false); }} className={cn('flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium transition', categoryFilter === c.value ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
                  {c.label}
                  {categoryFilter === c.value && <Check className="size-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={genRef}>
          <button type="button" onClick={() => setShowGenMenu((p) => !p)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3.5 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
            {GENERATIONS.find((g) => g.value === generationFilter)?.label}
            <ChevronDown className="size-3.5 text-[var(--text-muted)]" />
          </button>
          {showGenMenu && (
            <div className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--popover)] shadow-[var(--shadow-theme-lg)] ds-fade-in">
              {GENERATIONS.map((g) => (
                <button key={g.value} type="button" onClick={() => { onGeneration(g.value); setShowGenMenu(false); }} className={cn('flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium transition', generationFilter === g.value ? 'bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-body)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}>
                  {g.label}
                  {generationFilter === g.value && <Check className="size-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs font-medium text-[var(--text-muted)]">{enabledCount} of {allModels.length} models enabled</p>
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">{models.length} {models.length === 1 ? 'result' : 'results'}</p>
      </div>

      <div className="mt-3 space-y-2">
        {models.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--surface-sunken)] text-[var(--text-subtle)]">
              <Search className="size-6" />
            </div>
            <p className="mt-4 text-sm font-medium text-[var(--text-strong)]">No models found</p>
            <p className="mt-1 text-xs font-normal text-[var(--text-muted)]">Try a different search or filter</p>
          </div>
        ) : (
          models.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.id} className={cn('group flex items-center gap-3 rounded-xl border bg-[var(--card)] p-3.5 transition', m.enabled ? 'border-[var(--color-brand-200)] dark:border-[rgba(70,95,255,0.24)]' : 'border-[var(--border-subtle)] hover:border-[var(--border)]')}>
                <span className={cn('inline-flex size-10 shrink-0 items-center justify-center rounded-xl', m.iconBg, m.iconColor)}>
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-[var(--text-strong)]">{m.name}</p>
                    {m.badge && (
                      <span className={cn('rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase leading-none', m.badge === 'NEW' && 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]', m.badge === 'PRO' && 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]', m.badge === 'BETA' && 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]')}>
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs font-normal text-[var(--text-muted)]">{m.description}</p>
                  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">{m.vendor}</p>
                </div>
                <button type="button" role="switch" aria-checked={m.enabled} onClick={() => onToggle(m.id)} className={cn('relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition', m.enabled ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--border-strong)]')} aria-label={`Toggle ${m.name}`}>
                  <span className={cn('inline-block size-4 transform rounded-full bg-white shadow transition-transform', m.enabled ? 'translate-x-6' : 'translate-x-1')} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/* ========================================================================
   Reusable field components
   ======================================================================== */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[var(--text-strong)]">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] font-normal text-[var(--text-muted)]">{hint}</span>}
    </label>
  );
}

function TextInput({ defaultValue, placeholder, type = 'text' }: { defaultValue?: string; placeholder?: string; type?: string }) {
  return <input type={type} defaultValue={defaultValue} placeholder={placeholder} className="ds-input !h-10 text-sm" />;
}

function Toggle({ defaultChecked = false, label, description, onChange }: { defaultChecked?: boolean; label: string; description?: string; onChange?: (checked: boolean) => void }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[var(--text-strong)]">{label}</p>
        {description && <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => { const next = !checked; setChecked(next); onChange?.(next); }}
        className={cn('relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition', checked ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--border-strong)]')}
        aria-label={label}
      >
        <span className={cn('inline-block size-4 transform rounded-full bg-white shadow transition-transform', checked ? 'translate-x-6' : 'translate-x-1')} />
      </button>
    </div>
  );
}

function SectionShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-3xl px-6 py-6">{children}</div>;
}

function SaveBar({ onSave }: { onSave?: () => void }) {
  const { toast } = useToast();
  return (
    <div className="mt-8 flex justify-end gap-2 border-t border-[var(--border-subtle)] pt-5">
      <button type="button" className="ds-btn ds-btn-secondary">Cancel</button>
      <button type="button" onClick={() => { onSave?.(); toast({ title: 'Settings saved' }); }} className="ds-btn ds-btn-primary"><Check className="size-4" /> Save changes</button>
    </div>
  );
}

/* ========================================================================
   ACCOUNT SECTION
   ======================================================================== */
function AccountSection() {
  return (
    <SectionShell>
      <div className="space-y-6">
        {/* Profile card */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-xl font-medium text-white">SC</span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-medium text-[var(--text-strong)]">Shamarof Chy</p>
              <p className="text-xs font-normal text-[var(--text-muted)]">shamarof.chy@example.com</p>
              <div className="mt-2 flex gap-2">
                <button className="ds-btn ds-btn-secondary !h-8 !text-xs">Change avatar</button>
                <button className="ds-btn ds-btn-ghost !h-8 !text-xs !text-[var(--color-error-600)]">Remove</button>
              </div>
            </div>
          </div>
        </section>

        {/* Personal info */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-4 text-sm font-medium text-[var(--text-strong)]">Personal information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name"><TextInput defaultValue="Shamarof Chy" /></Field>
            <Field label="Display name"><TextInput defaultValue="Shamarof" /></Field>
            <Field label="Email"><TextInput defaultValue="shamarof.chy@example.com" type="email" /></Field>
            <Field label="Phone"><TextInput defaultValue="+1 (415) 555-0142" /></Field>
            <Field label="Role"><TextInput defaultValue="Product Designer" /></Field>
            <Field label="Timezone" hint="Used for scheduling and notifications">
              <select className="ds-input !h-10 text-sm">
                <option>America/Los_Angeles (UTC-8)</option>
                <option>America/New_York (UTC-5)</option>
                <option>Europe/London (UTC+0)</option>
                <option>Asia/Kolkata (UTC+5:30)</option>
              </select>
            </Field>
          </div>
        </section>

        {/* Password */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-4 text-sm font-medium text-[var(--text-strong)]">Password</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Current password"><TextInput type="password" placeholder="••••••••" /></Field>
            <div className="hidden sm:block" />
            <Field label="New password"><TextInput type="password" placeholder="••••••••" /></Field>
            <Field label="Confirm new password"><TextInput type="password" placeholder="••••••••" /></Field>
          </div>
        </section>

        {/* Danger zone */}
        <section className="rounded-2xl border border-[var(--color-error-100)] bg-[var(--color-error-50)] p-5 dark:border-[rgba(240,68,56,0.18)] dark:bg-[rgba(240,68,56,0.06)]">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-[var(--color-error-700)] dark:text-[var(--color-error-500)]">Delete account</h2>
              <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">Permanently delete your account, conversations, and generated content. This cannot be undone.</p>
              <button className="ds-btn ds-btn-secondary mt-3 !h-8 !text-xs !border-[var(--color-error-200)] !text-[var(--color-error-600)] dark:!border-[rgba(240,68,56,0.24)] dark:!text-[var(--color-error-500)]">Delete account</button>
            </div>
          </div>
        </section>

        <SaveBar />
      </div>
    </SectionShell>
  );
}

/* ========================================================================
   GENERAL SECTION
   ======================================================================== */
function GeneralSection() {
  return (
    <SectionShell>
      <div className="space-y-6">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-1 text-sm font-medium text-[var(--text-strong)]">Appearance</h2>
          <p className="mb-4 text-xs font-normal text-[var(--text-muted)]">Customize how the application looks on your device.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Theme">
              <select className="ds-input !h-10 text-sm">
                <option>Light</option><option>Dark</option><option>System</option>
              </select>
            </Field>
            <Field label="Accent color">
              <div className="flex gap-2">
                {['#465fff', '#12b76a', '#f79009', '#7a5af8', '#f04438'].map((c, i) => (
                  <button key={c} className={cn('size-8 rounded-full ring-2 ring-offset-2 ring-offset-[var(--card)]', i === 0 ? 'ring-[var(--text-strong)]' : 'ring-transparent')} style={{ backgroundColor: c }} aria-label={`Accent ${c}`} />
                ))}
              </div>
            </Field>
            <Field label="Density">
              <select className="ds-input !h-10 text-sm"><option>Comfortable</option><option>Compact</option><option>Cozy</option></select>
            </Field>
            <Field label="Language">
              <select className="ds-input !h-10 text-sm"><option>English (US)</option><option>Español</option><option>Français</option><option>Deutsch</option><option>日本語</option></select>
            </Field>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Notifications</h2>
          <Toggle defaultChecked label="Email notifications" description="Get notified when generations complete or when usage hits 80% of your limit." />
          <Toggle defaultChecked label="Push notifications" description="Receive browser push for real-time events." />
          <Toggle label="Product updates" description="Occasional emails about new models and features." />
          <Toggle label="Marketing emails" description="Tips, case studies, and promotional offers." />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Behavior</h2>
          <Toggle defaultChecked label="Send with Enter" description="Press Enter to submit prompts. Disable to require clicking the send button." />
          <Toggle defaultChecked label="Stream responses" description="Show text/code as it is generated rather than waiting for completion." />
          <Toggle label="Auto-save conversations" description="Persist conversation history locally so you can return to it after refresh." />
        </section>

        <SaveBar />
      </div>
    </SectionShell>
  );
}

/* ========================================================================
   BILLING SECTION
   ======================================================================== */
function BillingSection() {
  return (
    <SectionShell>
      <div className="space-y-6">
        {/* Current plan */}
        <section className="overflow-hidden rounded-2xl border border-[var(--color-brand-200)] bg-gradient-to-br from-[var(--color-brand-50)] to-[var(--color-brand-100)] p-5 dark:border-[rgba(70,95,255,0.24)] dark:from-[rgba(70,95,255,0.16)] dark:to-[rgba(70,95,255,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">Current plan</p>
              <p className="mt-1 text-2xl font-semibold text-[var(--text-strong)]">Pro</p>
              <p className="mt-1 text-xs font-normal text-[var(--text-muted)]">$20/mo · renews on Jul 21, 2026</p>
            </div>
            <div className="flex gap-2">
              <button className="ds-btn ds-btn-secondary !h-9 !text-xs">Manage</button>
              <button className="ds-btn ds-btn-primary !h-9 !text-xs">Upgrade</button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-[var(--card)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Credits left</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-[var(--text-strong)]">8,420</p>
            </div>
            <div className="rounded-xl bg-[var(--card)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Used this month</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-[var(--text-strong)]">1,580</p>
            </div>
            <div className="rounded-xl bg-[var(--card)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Reset date</p>
              <p className="mt-1 text-lg font-semibold text-[var(--text-strong)]">Jul 21</p>
            </div>
          </div>
        </section>

        {/* Usage this month */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-4 text-sm font-medium text-[var(--text-strong)]">Usage this billing period</h2>
          <div className="space-y-3">
            {[
              { label: 'Chat tokens', used: 482000, total: 1000000, unit: 'tokens' },
              { label: 'Image generations', used: 142, total: 500, unit: 'images' },
              { label: 'Video generations', used: 18, total: 50, unit: 'videos' },
              { label: 'Storage', used: 2.4, total: 10, unit: 'GB' },
            ].map((u) => {
              const pct = (u.used / u.total) * 100;
              return (
                <div key={u.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
                    <span className="text-[var(--text-body)]">{u.label}</span>
                    <span className="tabular-nums text-[var(--text-muted)]">{u.used.toLocaleString()} / {u.total.toLocaleString()} {u.unit}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                    <div className={cn('h-full rounded-full', pct > 80 ? 'bg-[var(--color-error-500)]' : pct > 60 ? 'bg-[var(--color-warning-500)]' : 'bg-[var(--color-brand-500)]')} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Payment method */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-4 text-sm font-medium text-[var(--text-strong)]">Payment method</h2>
          <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-lg bg-[var(--card)] text-[var(--text-strong)]"><CreditCard className="size-5" /></span>
              <div>
                <p className="text-sm font-medium text-[var(--text-strong)]">Visa ending in 4242</p>
                <p className="text-xs font-normal text-[var(--text-muted)]">Expires 09/2028</p>
              </div>
            </div>
            <button className="ds-btn ds-btn-secondary !h-8 !text-xs">Update</button>
          </div>
        </section>

        {/* Invoices */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-4 text-sm font-medium text-[var(--text-strong)]">Recent invoices</h2>
          <div className="space-y-1">
            {[
              { id: 'INV-2026-06', date: 'Jun 21, 2026', amount: '$20.00' },
              { id: 'INV-2026-05', date: 'May 21, 2026', amount: '$20.00' },
              { id: 'INV-2026-04', date: 'Apr 21, 2026', amount: '$20.00' },
            ].map((inv) => (
              <div key={inv.id} className="flex items-center justify-between rounded-lg px-3 py-2 text-xs transition hover:bg-[var(--surface-sunken)]">
                <div className="flex items-center gap-3">
                  <FileText className="size-4 text-[var(--text-muted)]" />
                  <span className="font-mono text-[var(--text-body)]">{inv.id}</span>
                  <span className="text-[var(--text-muted)]">{inv.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium tabular-nums text-[var(--text-strong)]">{inv.amount}</span>
                  <button className="text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">Download</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SectionShell>
  );
}

/* ========================================================================
   PERSONALIZATION SECTION
   ======================================================================== */
function PersonalizationSection() {
  return (
    <SectionShell>
      <div className="space-y-6">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-1 text-sm font-medium text-[var(--text-strong)]">Custom instructions</h2>
          <p className="mb-4 text-xs font-normal text-[var(--text-muted)]">Tell the AI how you want it to respond. These instructions are added to every conversation.</p>
          <Field label="What would you like the AI to call you?"><TextInput defaultValue="Shamarof" /></Field>
          <div className="mt-4">
            <Field label="How should the AI respond?" hint="E.g. tone, length, format, things to avoid">
              <textarea rows={4} defaultValue="Be concise and direct. Prefer bullet points over paragraphs. Use code blocks for code samples. Avoid filler phrases." className="ds-input !h-auto py-2.5 text-sm leading-relaxed resize-none" />
            </Field>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Response style</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Default tone">
              <select className="ds-input !h-10 text-sm"><option>Neutral</option><option>Friendly</option><option>Professional</option><option>Casual</option><option>Witty</option></select>
            </Field>
            <Field label="Default verbosity">
              <select className="ds-input !h-10 text-sm"><option>Concise</option><option>Balanced</option><option>Detailed</option></select>
            </Field>
            <Field label="Default response format">
              <select className="ds-input !h-10 text-sm"><option>Markdown</option><option>Plain text</option><option>JSON</option></select>
            </Field>
            <Field label="Reading level">
              <select className="ds-input !h-10 text-sm"><option>College</option><option>High school</option><option>Expert</option><option>Elementary</option></select>
            </Field>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Preferences</h2>
          <Toggle defaultChecked label="Suggested follow-ups" description="Show suggested next prompts at the end of each response." />
          <Toggle defaultChecked label="Code highlighting" description="Apply syntax highlighting to code blocks." />
          <Toggle label="Cite sources" description="Include inline citations for factual claims when available." />
          <Toggle label="Show token count" description="Display input/output tokens used per response." />
        </section>

        <SaveBar />
      </div>
    </SectionShell>
  );
}

/* ========================================================================
   MEMORY SECTION
   ======================================================================== */
function MemorySection() {
  const [memories, setMemories] = React.useState([
    { id: 'm1', text: 'User is a product designer at a fintech startup', date: 'Jun 19, 2026' },
    { id: 'm2', text: 'Prefers TypeScript over JavaScript for code samples', date: 'Jun 18, 2026' },
    { id: 'm3', text: 'Currently working on a design system migration to Tailwind v4', date: 'Jun 15, 2026' },
    { id: 'm4', text: 'Time zone is America/Los_Angeles (UTC-8)', date: 'Jun 12, 2026' },
  ]);
  const [newMemory, setNewMemory] = React.useState('');

  return (
    <SectionShell>
      <div className="space-y-6">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-3">
            <Brain className="size-5 text-[var(--color-brand-500)]" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-[var(--text-strong)]">Memory</h2>
              <p className="text-xs font-normal text-[var(--text-muted)]">The AI remembers these facts across conversations to personalize responses.</p>
            </div>
          </div>

          {/* Add new memory */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="Add a fact for the AI to remember..."
              className="ds-input !h-10 flex-1 text-sm"
            />
            <button
              type="button"
              onClick={() => {
                if (!newMemory.trim()) return;
                setMemories((prev) => [{ id: `m${Date.now()}`, text: newMemory.trim(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...prev]);
                setNewMemory('');
              }}
              className="ds-btn ds-btn-primary !h-10 !text-xs"
            >
              <Plus className="size-3.5" /> Add
            </button>
          </div>

          {/* Memory list */}
          <ul className="mt-4 space-y-2">
            {memories.map((m) => (
              <li key={m.id} className="flex items-start justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
                <div className="min-w-0">
                  <p className="text-sm font-normal text-[var(--text-strong)]">{m.text}</p>
                  <p className="mt-0.5 text-[10px] font-normal text-[var(--text-subtle)]">Added {m.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMemories((prev) => prev.filter((x) => x.id !== m.id))}
                  className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--color-error-600)]"
                  aria-label="Forget"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Memory controls</h2>
          <Toggle defaultChecked label="Learn from conversations" description="Automatically save relevant facts the AI discovers during chats." />
          <Toggle label="Cross-conversation memory" description="Use memories from one conversation when responding in another." />
          <div className="rounded-xl border border-[var(--color-error-100)] bg-[var(--color-error-50)] p-4 dark:border-[rgba(240,68,56,0.18)] dark:bg-[rgba(240,68,56,0.06)]">
            <div className="flex items-start gap-3">
              <Trash2 className="mt-0.5 size-4 shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--color-error-700)] dark:text-[var(--color-error-500)]">Clear all memories</p>
                <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">Permanently forget everything the AI has learned about you.</p>
                <button className="ds-btn ds-btn-secondary mt-3 !h-8 !text-xs !border-[var(--color-error-200)] !text-[var(--color-error-600)] dark:!border-[rgba(240,68,56,0.24)] dark:!text-[var(--color-error-500)]">Clear all</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SectionShell>
  );
}

/* ========================================================================
   FILES & MEDIA SECTION
   ======================================================================== */
function FilesSection() {
  return (
    <SectionShell>
      <div className="space-y-6">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-3">
            <HardDrive className="size-5 text-[var(--color-brand-500)]" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-[var(--text-strong)]">Storage</h2>
              <p className="text-xs font-normal text-[var(--text-muted)]">Manage files you've uploaded to conversations.</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
              <span className="text-[var(--text-body)]">2.4 GB of 10 GB used</span>
              <span className="tabular-nums text-[var(--text-muted)]">24%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
              <div className="h-full rounded-full bg-[var(--color-brand-500)]" style={{ width: '24%' }} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Images', value: '1.2 GB', count: 142, icon: FileImage, color: 'text-[var(--color-success-600)]' },
              { label: 'Documents', value: '680 MB', count: 38, icon: FileText, color: 'text-[var(--color-info-600)]' },
              { label: 'Videos', value: '420 MB', count: 8, icon: FileText, color: 'text-[var(--color-warning-600)]' },
              { label: 'Other', value: '100 MB', count: 24, icon: FileText, color: 'text-[var(--text-muted)]' },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
                  <Icon className={cn('size-4', s.color)} />
                  <p className="mt-2 text-xs font-medium text-[var(--text-muted)]">{s.label}</p>
                  <p className="mt-0.5 text-sm font-medium tabular-nums text-[var(--text-strong)]">{s.value}</p>
                  <p className="text-[10px] font-normal text-[var(--text-subtle)]">{s.count} files</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Upload settings</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Max file size">
              <select className="ds-input !h-10 text-sm"><option>10 MB</option><option>25 MB</option><option>50 MB</option><option>100 MB</option></select>
            </Field>
            <Field label="Auto-delete after">
              <select className="ds-input !h-10 text-sm"><option>Never</option><option>30 days</option><option>90 days</option><option>1 year</option></select>
            </Field>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Image processing</h2>
          <Toggle defaultChecked label="Auto-compress images on upload" description="Resize and compress images larger than 2MB to save storage." />
          <Toggle defaultChecked label="Extract text from images (OCR)" description="Make text in uploaded images searchable and readable by the AI." />
          <Toggle label="Generate alt text automatically" description="Add accessibility descriptions to images you upload." />
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-strong)]">Recent files</h2>
          <div className="space-y-1">
            {[
              { name: 'design-system-spec.pdf', size: '4.2 MB', date: 'Jun 19, 2026' },
              { name: 'hero-mockup.png', size: '1.8 MB', date: 'Jun 18, 2026' },
              { name: 'q2-roadmap.docx', size: '282 KB', date: 'Jun 15, 2026' },
            ].map((f) => (
              <div key={f.name} className="flex items-center justify-between rounded-lg px-3 py-2 text-xs transition hover:bg-[var(--surface-sunken)]">
                <div className="flex items-center gap-3">
                  <FileText className="size-4 text-[var(--text-muted)]" />
                  <span className="font-medium text-[var(--text-body)]">{f.name}</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--text-muted)]">
                  <span className="tabular-nums">{f.size}</span>
                  <span>{f.date}</span>
                  <button className="text-[var(--color-error-600)] hover:underline dark:text-[var(--color-error-500)]">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SectionShell>
  );
}

/* ========================================================================
   CONNECTORS SECTION
   ======================================================================== */
function ConnectorsSection() {
  const [connectors, setConnectors] = React.useState([
    { id: 'gmail', name: 'Gmail', desc: 'Read and search your inbox', icon: Mail, color: '#EA4335', enabled: true },
    { id: 'drive', name: 'Google Drive', desc: 'Search and reference your documents', icon: CloudUpload, color: '#4285F4', enabled: true },
    { id: 'slack', name: 'Slack', desc: 'Search messages and channels', icon: Webhook, color: '#4A154B', enabled: false },
    { id: 'notion', name: 'Notion', desc: 'Read and search your workspace', icon: Database, color: '#000000', enabled: false },
    { id: 'github', name: 'GitHub', desc: 'Search repos, issues, and PRs', icon: Webhook, color: '#181717', enabled: true },
    { id: 'web', name: 'Web Search', desc: 'Browse the web for current info', icon: Globe, color: '#12b76a', enabled: true },
  ]);

  return (
    <SectionShell>
      <div className="space-y-6">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-3">
            <Network className="size-5 text-[var(--color-brand-500)]" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-[var(--text-strong)]">Connectors</h2>
              <p className="text-xs font-normal text-[var(--text-muted)]">Let the AI search and reference content from your connected apps.</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {connectors.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.id} className={cn('flex items-center gap-3 rounded-xl border bg-[var(--card)] p-3.5 transition', c.enabled ? 'border-[var(--color-brand-200)] dark:border-[rgba(70,95,255,0.24)]' : 'border-[var(--border-subtle)] hover:border-[var(--border)]')}>
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-black/5 dark:ring-white/10" style={{ backgroundColor: c.color }}>
                    <Icon className="size-5 text-white" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--text-strong)]">{c.name}</p>
                    <p className="truncate text-xs font-normal text-[var(--text-muted)]">{c.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConnectors((prev) => prev.map((x) => (x.id === c.id ? { ...x, enabled: !x.enabled } : x)))}
                    className={cn('inline-flex h-7 shrink-0 items-center gap-1 rounded-lg px-2.5 text-[10px] font-semibold uppercase transition', c.enabled ? 'bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]')}
                  >
                    {c.enabled ? 'Connected' : 'Connect'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Connector behavior</h2>
          <Toggle defaultChecked label="Auto-fetch relevant content" description="When you ask a question, search connected apps automatically for context." />
          <Toggle label="Cite sources" description="Show which connector each piece of context came from." />
          <Toggle defaultChecked label="Sync in background" description="Periodically index connected apps so search is instant." />
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-1 text-sm font-medium text-[var(--text-strong)]">Custom connector</h2>
          <p className="mb-4 text-xs font-normal text-[var(--text-muted)]">Connect any REST API or webhook as a custom data source.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Connector name"><TextInput placeholder="My internal API" /></Field>
            <Field label="Webhook URL"><TextInput placeholder="https://api.example.com/v1/search" /></Field>
          </div>
          <button className="ds-btn ds-btn-primary mt-4 !h-9 !text-xs"><Plus className="size-3.5" /> Add connector</button>
        </section>
      </div>
    </SectionShell>
  );
}

/* ========================================================================
   DATA CONTROL SECTION
   ======================================================================== */
function DataControlSection() {
  return (
    <SectionShell>
      <div className="space-y-6">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-[var(--color-brand-500)]" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-[var(--text-strong)]">Data usage</h2>
              <p className="text-xs font-normal text-[var(--text-muted)]">Control whether your conversations are used to improve AI models.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Training & improvement</h2>
          <Toggle label="Allow training on my data" description="Your conversations and uploads may be used to train future AI models. Disable for full privacy." />
          <Toggle defaultChecked label="Share crash reports" description="Anonymous error reports help us fix bugs faster." />
          <Toggle defaultChecked label="Share usage analytics" description="Aggregated, anonymized metrics about feature usage to help us prioritize improvements." />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-strong)]">Retention</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Conversation history">
              <select className="ds-input !h-10 text-sm"><option>Keep forever</option><option>30 days</option><option>90 days</option><option>1 year</option></select>
            </Field>
            <Field label="Generated content">
              <select className="ds-input !h-10 text-sm"><option>Keep forever</option><option>30 days</option><option>90 days</option></select>
            </Field>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-3 text-sm font-medium text-[var(--text-strong)]">Export your data</h2>
          <p className="mb-4 text-xs font-normal text-[var(--text-muted)]">Download a copy of all your conversations, generated content, and memories in JSON format.</p>
          <button className="ds-btn ds-btn-secondary !h-9 !text-xs"><CloudUpload className="size-3.5" /> Request export</button>
        </section>

        <section className="rounded-2xl border border-[var(--color-error-100)] bg-[var(--color-error-50)] p-5 dark:border-[rgba(240,68,56,0.18)] dark:bg-[rgba(240,68,56,0.06)]">
          <div className="flex items-start gap-3">
            <Lock className="mt-0.5 size-5 shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" />
            <div className="flex-1">
              <h2 className="text-sm font-medium text-[var(--color-error-700)] dark:text-[var(--color-error-500)]">Privacy mode</h2>
              <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">When enabled, conversations are not stored after the session ends. You will lose history but gain maximum privacy.</p>
              <div className="mt-3"><Toggle label="Enable privacy mode" /></div>
            </div>
          </div>
        </section>
      </div>
    </SectionShell>
  );
}
