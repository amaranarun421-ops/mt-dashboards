'use client';
import * as React from 'react';
import { Moon, Sun, Monitor, ChevronDown, Sparkles, Check, Globe, Palette } from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { PremiumSelect } from '@/components/dashboard/premium-controls';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Utility) ====================== */
function UcStyles() {
  return (
    <style jsx global>{`
      .uc-root {
        --uc-radius-sm: 8px;
        --uc-radius-md: 12px;
        --uc-radius-lg: 16px;
        --uc-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --uc-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --uc-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --uc-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
      }
      .uc-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .uc-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .uc-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
    `}</style>
  );
}

export function UtilityCustomizationPage() {
  const [theme, setTheme] = React.useState<'light' | 'dark' | 'system'>('light');
  const [selectedColor, setSelectedColor] = React.useState('#465FFF');
  const [lang, setLang] = React.useState('EN');

  return (
    <div className="uc-root uc-bg space-y-6">
      <UcStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Utility & Customization' }]} title="Utility & Customization" description="Theme switchers, color pickers, language switchers, dividers" />

      {/* ============================================ THEME SWITCHERS ============================================ */}
      <SectionCard title="Theme Switchers" description="3 variants — Minimal, Animated, AI">
        <div className="space-y-5">
          {/* Minimal segmented */}
          <div>
            <p className="uc-label mb-3">Minimal Segmented</p>
            <div className="inline-flex items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor },
              ].map(t => {
                const Icon = t.icon;
                return (
                  <button key={t.id} onClick={() => setTheme(t.id as any)} className={cn('inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition', theme === t.id ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--uc-shadow-xs)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>
                    <Icon className="size-3.5" strokeWidth={2.5} />{t.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="uc-divider" />
          {/* Animated icon toggle */}
          <div>
            <p className="uc-label mb-3">Animated Icon Toggle</p>
            <div className="flex gap-3">
              <button className="inline-flex size-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] shadow-[var(--uc-shadow-xs)] transition hover:scale-110 hover:text-[var(--color-brand-500)]"><Sun className="size-5" strokeWidth={2.5} /></button>
              <button className="inline-flex size-12 items-center justify-center rounded-xl bg-[var(--color-brand-500)] text-white shadow-[var(--uc-shadow-sm)] transition hover:scale-110"><Moon className="size-5" strokeWidth={2.5} /></button>
              <button className="inline-flex size-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] shadow-[var(--uc-shadow-xs)] transition hover:scale-110 hover:text-[var(--color-brand-500)]"><Monitor className="size-5" strokeWidth={2.5} /></button>
            </div>
          </div>
          <div className="uc-divider" />
          {/* AI theme */}
          <div>
            <p className="uc-label mb-3">AI Theme Generator</p>
            <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] px-4 text-sm font-medium text-white shadow-[var(--uc-shadow-sm)] transition hover:scale-105">
              <Sparkles className="size-4" strokeWidth={2.5} /> Generate Theme with AI
            </button>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ COLOR PICKERS ============================================ */}
      <SectionCard title="Color Pickers" description="3 variants — Palette, Gradient, Brand">
        <div className="space-y-5">
          {/* Palette */}
          <div>
            <p className="uc-label mb-3">Palette</p>
            <div className="flex flex-wrap gap-2.5">
              {['#465FFF', '#12B76A', '#F79009', '#F04438', '#0BA5EC', '#7A5AF8', '#EC4899', '#10B981'].map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} className={cn('size-9 cursor-pointer rounded-xl transition hover:scale-110', selectedColor === c && 'ring-2 ring-offset-2 ring-offset-[var(--card)]')} style={{ backgroundColor: c, boxShadow: selectedColor === c ? `0 0 0 2px ${c}` : 'none' }} />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl shadow-[var(--uc-shadow-xs)]" style={{ backgroundColor: selectedColor }} />
              <div>
                <p className="font-mono text-sm font-semibold text-[var(--text-strong)]">{selectedColor.toUpperCase()}</p>
                <p className="text-xs font-medium text-[var(--text-muted)]">Selected color</p>
              </div>
            </div>
          </div>
          <div className="uc-divider" />
          {/* Gradient */}
          <div>
            <p className="uc-label mb-3">Gradient Picker</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                'linear-gradient(135deg, #465FFF, #7A5AF8)',
                'linear-gradient(135deg, #12B76A, #0BA5EC)',
                'linear-gradient(135deg, #F79009, #F04438)',
                'linear-gradient(135deg, #EC4899, #7A5AF8)',
                'linear-gradient(135deg, #0BA5EC, #465FFF)',
              ].map(g => (
                <button key={g} className="size-9 cursor-pointer rounded-xl transition hover:scale-110" style={{ background: g }} />
              ))}
            </div>
          </div>
          <div className="uc-divider" />
          {/* Brand colors */}
          <div>
            <p className="uc-label mb-3">Brand Color System</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { name: 'Primary', color: '#465FFF' },
                { name: 'Success', color: '#12B76A' },
                { name: 'Warning', color: '#F79009' },
                { name: 'Error', color: '#F04438' },
              ].map(b => (
                <div key={b.name} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--uc-shadow-xs)]">
                  <div className="h-12 rounded-lg" style={{ backgroundColor: b.color }} />
                  <p className="mt-2 text-xs font-medium text-[var(--text-strong)]">{b.name}</p>
                  <p className="font-mono text-[10px] font-medium text-[var(--text-muted)]">{b.color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ LANGUAGE SWITCHERS ============================================ */}
      <SectionCard title="Language Switchers" description="3 variants — Dropdown, Compact, Flag Style">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-4">
            <PremiumSelect
              maxWidth="md"
              placeholder="English (US)"
              options={[
                { value: 'en', label: 'English (US)' },
                { value: 'es', label: 'Español' },
                { value: 'fr', label: 'Français' },
                { value: 'de', label: 'Deutsch' },
                { value: 'ja', label: '日本語' },
              ]}
            />
            <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] shadow-[var(--uc-shadow-xs)] transition hover:bg-[var(--surface-sunken)]">
              <Globe className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> {lang} <ChevronDown className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
            </button>
            <div className="inline-flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-1">
              {['🇺🇸 EN', '🇪🇸 ES', '🇫🇷 FR', '🇩🇪 DE'].map(l => (
                <button key={l} onClick={() => setLang(l.split(' ')[1])} className={cn('inline-flex h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-medium transition', lang === l.split(' ')[1] ? 'bg-[var(--card)] text-[var(--text-strong)] shadow-[var(--uc-shadow-xs)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ DIVIDERS ============================================ */}
      <SectionCard title="Dividers" description="4 variants — Gradient, Text, Dashed, Icon">
        <div className="space-y-6 max-w-2xl">
          <div>
            <p className="uc-label mb-3">Gradient</p>
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
          </div>
          <div>
            <p className="uc-label mb-3">Text</p>
            <div className="flex items-center gap-3"><span className="h-px flex-1 bg-[var(--border)]" /><span className="text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">OR</span><span className="h-px flex-1 bg-[var(--border)]" /></div>
          </div>
          <div>
            <p className="uc-label mb-3">Dashed</p>
            <div className="flex items-center gap-3"><span className="h-px flex-1 border-t border-dashed border-[var(--border-strong)]" /><span className="h-px flex-1 border-t border-dashed border-[var(--border-strong)]" /></div>
          </div>
          <div>
            <p className="uc-label mb-3">Icon</p>
            <div className="flex items-center gap-3"><span className="h-px flex-1 bg-[var(--border)]" /><Sparkles className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /><span className="h-px flex-1 bg-[var(--border)]" /></div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
