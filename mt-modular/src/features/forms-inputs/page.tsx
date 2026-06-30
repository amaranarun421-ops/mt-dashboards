'use client';

import * as React from 'react';
import {
  Plus, Check, X, Trash2, Download, Lock, Search, Eye, EyeOff,
  Loader2, Sparkles, Zap, ArrowRight, ChevronDown, Upload, Star,
  Mic, Command as CommandIcon, DollarSign, AlertCircle, Heart,
  MessageSquare, Copy, Bell, Settings, User,
  Cloud, Image as ImageIcon, ThumbsUp, Volume2,
  Bold, Italic, Underline, List, Link2, Code, Heading, Quote, Strikethrough,
  Play, FileText, File, CheckCircle2,
  TrendingUp, Eye as EyeIcon, Type,
} from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { PremiumSelect } from '@/components/dashboard/premium-controls';
import { cn } from '@/lib/utils';
import { FiStyles } from './fi-styles';
import {
  AnimatedButton, FabPreview, AddToCartButton, SocialButton,
  FloatingLabelInput, PasswordStrengthInput, OtpInputDemo, TagInputDemo,
  ExpandableInputDemo, MentionInputDemo,
  AutoResizeTextarea, AutoTextarea, FloatingLabelTextarea,
  SearchableSelectDemo, MultiSelectDemo, ComboboxDemo, AsyncSelectDemo,
  TagSelectDemo, AISuggestionSelectDemo,
  CheckboxDemo, CheckboxCard, AnimatedCheckbox, GradientCheckbox, IndeterminateCheckboxDemo,
  RadioGroupDemo, RadioPill, SegmentedRadioDemo, RadioCard, ImageRadio,
  SwitchDemo,
  SliderDemo,
  StarRatingDemo, EmojiRatingDemo, ReactionRatingDemo, ProgressRatingDemo,
  FileUploadDemo,
} from './sections';

export function FormsInputsPage() {

  return (
    <div className="fi-root space-y-6">
      <FiStyles />

      <PageHeader
        breadcrumb={[{ label: 'Components' }, { label: 'Forms & Inputs' }]}
        title="Forms & Inputs"
        description="Buttons, inputs, textareas, selects, checkboxes, radios, switches, sliders, ratings, and file upload — every variant production-ready and fully accessible."
      />

      {/* ============================================ BUTTONS ============================================ */}
      <SectionCard title="Buttons" description="20 variants — Primary, Secondary, Outline, Ghost, Soft, Gradient, Glass, Neon, Glow, Pill, Loading, Success, Destructive, AI Action, Command, Icon, Split, Animated, Social, Floating">
          <div className="space-y-7">
            <div>
              <p className="fi-label mb-3.5">Core Variants</p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="fi-btn fi-btn-primary"><Plus className="size-4" strokeWidth={2.5} /> Primary</button>
                <button className="fi-btn fi-btn-secondary">Secondary</button>
                <button className="fi-btn border-2 border-[var(--color-brand-500)] bg-transparent text-[var(--color-brand-600)] hover:bg-[var(--color-brand-50)] dark:text-[var(--color-brand-300)] dark:hover:bg-[rgba(70,95,255,0.16)] dark:border-[var(--color-brand-400)]">Outline</button>
                <button className="fi-btn fi-btn-ghost">Ghost</button>
                <button className="fi-btn bg-[var(--color-brand-50)] text-[var(--color-brand-700)] hover:bg-[var(--color-brand-100)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)] dark:hover:bg-[rgba(70,95,255,0.24)]">Soft</button>
                <button className="fi-btn bg-gradient-to-r from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--fi-shadow-md)] hover:shadow-[var(--fi-shadow-glow)] hover:-translate-y-0.5">Gradient</button>
                <button className="fi-btn fi-glass text-[var(--text-strong)] hover:bg-white/10">Glass</button>
                <button className="fi-btn bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]" style={{ boxShadow: '0 0 12px rgba(70,95,255,0.5), 0 0 24px rgba(70,95,255,0.3)' }}>Neon</button>
                <button className="fi-btn fi-pulse-glow bg-[var(--color-brand-500)] text-white">Glow</button>
                <button className="fi-btn rounded-full bg-[var(--color-brand-500)] text-white px-6 hover:bg-[var(--color-brand-600)] shadow-[var(--fi-shadow-sm)] hover:shadow-[var(--fi-shadow-md)]">Pill</button>
              </div>
            </div>

            <div className="fi-divider" />

            <div>
              <p className="fi-label mb-3.5">State Variants</p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="fi-btn fi-btn-primary" disabled style={{ opacity: 0.85 }}>
                  <Loader2 className="size-4 animate-spin" /> Loading
                </button>
                <button className="fi-btn bg-[var(--color-success-500)] text-white shadow-[var(--fi-shadow-sm)] hover:bg-[var(--color-success-600)] hover:-translate-y-0.5"><Check className="size-4" strokeWidth={2.5} /> Success</button>
                <button className="fi-btn bg-[var(--color-error-500)] text-white shadow-[var(--fi-shadow-sm)] hover:bg-[var(--color-error-600)] hover:-translate-y-0.5"><Trash2 className="size-4" strokeWidth={2.5} /> Destructive</button>
                <button className="fi-btn bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white shadow-[var(--fi-shadow-sm)] hover:shadow-[var(--fi-shadow-md)] hover:-translate-y-0.5"><Sparkles className="size-4" strokeWidth={2.5} /> AI Action</button>
                <button className="fi-btn fi-btn-secondary font-mono">
                  <CommandIcon className="size-3.5" /> ⌘K
                </button>
              </div>
            </div>

            <div className="fi-divider" />

            <div>
              <p className="fi-label mb-3.5">Icon & Split</p>
              <div className="flex flex-wrap items-center gap-3">
                <button className="fi-btn fi-btn-primary size-10 rounded-xl p-0"><Plus className="size-5" strokeWidth={2.5} /></button>
                <button className="fi-btn fi-btn-secondary size-10 rounded-xl p-0"><Download className="size-5" strokeWidth={2} /></button>
                <button className="fi-btn size-10 rounded-xl p-0 bg-[var(--color-error-50)] text-[var(--color-error-600)] hover:bg-[var(--color-error-100)] dark:bg-[rgba(240,68,56,0.16)] dark:text-[var(--color-error-500)]"><Trash2 className="size-5" strokeWidth={2} /></button>
                <div className="inline-flex overflow-hidden rounded-xl border border-[var(--color-brand-500)] shadow-[var(--fi-shadow-sm)]">
                  <button className="inline-flex h-10 items-center gap-2 bg-[var(--color-brand-500)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-600)]"><Plus className="size-4" strokeWidth={2.5} /> New Item</button>
                  <button className="inline-flex h-10 w-9 items-center justify-center border-l border-white/20 bg-[var(--color-brand-500)] text-white transition hover:bg-[var(--color-brand-600)]"><ChevronDown className="size-4" strokeWidth={2.5} /></button>
                </div>
              </div>
            </div>

            <div className="fi-divider" />

            <div>
              <p className="fi-label mb-3.5">Animated</p>
              <div className="flex flex-wrap items-center gap-3">
                <AnimatedButton />
                <AddToCartButton />
              </div>
            </div>

            <div className="fi-divider" />

            <div>
              <p className="fi-label mb-3.5">Social</p>
              <div className="flex flex-wrap items-center gap-3">
                <SocialButton provider="google" />
                <SocialButton provider="github" />
                <SocialButton provider="apple" />
                <SocialButton provider="x" />
              </div>
            </div>

            <div className="fi-divider" />

            <div>
              <p className="fi-label mb-3.5">Floating Action Button</p>
              <div className="relative h-48 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-sunken)] p-5">
                <div className="max-w-md">
                  <p className="text-sm font-semibold text-[var(--text-strong)]">Fixed-position action menu</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Click the FAB at the bottom-right to expand contextual actions. Try it now.</p>
                </div>
                <FabPreview />
              </div>
            </div>
          </div>
        </SectionCard>

      {/* ============================================ INPUTS ============================================ */}
      <SectionCard title="Inputs" description="16 variants — Default, Floating Label, Filled, Underline, Glass, Search, AI Search, Voice Input, OTP, Password Strength, Validation, Inline Action, Tag, Mention, Currency, Command, Expandable">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="fi-variant-title mb-2 block">Default</span>
              <input type="text" placeholder="Enter your name" className="fi-input" />
            </label>

            <FloatingLabelInput label="Full name" placeholder="Jane Cooper" />

            <label className="block">
              <span className="fi-variant-title mb-2 block">Filled</span>
              <input type="text" defaultValue="Pre-filled value" className="fi-input bg-[var(--surface-sunken)] border-transparent" />
            </label>

            <label className="block">
              <span className="fi-variant-title mb-2 block">Underline</span>
              <input type="text" placeholder="Minimal underline style" className="h-11 w-full rounded-none border-x-0 border-t-0 border-b-2 border-[var(--border-strong)] bg-transparent px-1 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)]" />
            </label>

            <label className="block">
              <span className="fi-variant-title mb-2 block">Search</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.25} />
                <input type="search" placeholder="Search anything..." className="fi-input pl-12" />
              </div>
            </label>

            <label className="block">
              <span className="fi-variant-title mb-2 block">AI Search</span>
              <div className="relative">
                <Sparkles className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-brand-500)]" strokeWidth={2.25} />
                <input type="search" placeholder="Ask AI anything..." className="fi-input pl-12 pr-16 border-[var(--color-brand-300)] dark:border-[rgba(70,95,255,0.3)]" />
                <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">AI</kbd>
              </div>
            </label>

            <label className="block">
              <span className="fi-variant-title mb-2 block">Voice Input</span>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Click mic to speak" className="fi-input flex-1" />
                <button className="fi-btn fi-btn-primary size-11 shrink-0 rounded-xl p-0" aria-label="Start voice input">
                  <Mic className="size-5" strokeWidth={2.25} />
                </button>
              </div>
            </label>

            <PasswordStrengthInput />

            <label className="block">
              <span className="fi-variant-title mb-2 block">Validation Error</span>
              <div className="relative">
                <input type="email" defaultValue="invalid-email" className="fi-input pr-12 border-[var(--color-error-500)] focus:border-[var(--color-error-500)]" style={{ boxShadow: '0 0 0 4px rgba(240,68,56,0.10)' }} />
                <AlertCircle className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-error-500)]" strokeWidth={2.25} />
              </div>
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--color-error-600)] dark:text-[var(--color-error-500)]"><AlertCircle className="size-3" strokeWidth={2.5} /> Please enter a valid email address</p>
            </label>

            <label className="block">
              <span className="fi-variant-title mb-2 block">Validation Success</span>
              <div className="relative">
                <input type="email" defaultValue="user@example.com" className="fi-input pr-12 border-[var(--color-success-500)] focus:border-[var(--color-success-500)]" style={{ boxShadow: '0 0 0 4px rgba(18,183,106,0.10)' }} />
                <Check className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-success-500)]" strokeWidth={2.5} />
              </div>
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]"><Check className="size-3" strokeWidth={2.5} /> Email verified</p>
            </label>

            <label className="block">
              <span className="fi-variant-title mb-2 block">Inline Action</span>
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] pl-4 pr-2 shadow-[var(--fi-shadow-xs)] transition focus-within:border-[var(--color-brand-500)] focus-within:ring-4 focus-within:ring-[rgba(70,95,255,0.12)]">
                <input type="text" defaultValue="sk_live_42x9Kp8mQ3" className="h-11 flex-1 bg-transparent font-mono text-xs text-[var(--text-strong)] outline-none" />
                <button className="fi-btn fi-btn-primary size-8 rounded-lg p-0" aria-label="Copy to clipboard"><Copy className="size-4" strokeWidth={2.25} /></button>
              </div>
            </label>

            <label className="block">
              <span className="fi-variant-title mb-2 block">Currency Input</span>
              <div className="relative">
                <DollarSign className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.25} />
                <input type="number" placeholder="0.00" className="fi-input pl-12" />
              </div>
            </label>

            <label className="block sm:col-span-2">
              <span className="fi-variant-title mb-2 block">Command Input</span>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-[var(--fi-shadow-sm)] transition focus-within:border-[var(--color-brand-500)] focus-within:ring-4 focus-within:ring-[rgba(70,95,255,0.12)] max-w-2xl">
                <Search className="size-4 shrink-0 text-[var(--text-subtle)]" strokeWidth={2.25} />
                <input type="text" placeholder="Search or type a command…" className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]" />
                <kbd className="inline-flex shrink-0 items-center gap-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-muted)]"><CommandIcon className="size-2.5" /> K</kbd>
              </div>
            </label>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="max-w-md">
              <span className="fi-variant-title mb-2 block">OTP Input</span>
              <OtpInputDemo />
            </div>
            <div className="max-w-lg">
              <span className="fi-variant-title mb-2 block">Tag Input</span>
              <TagInputDemo />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <MentionInputDemo />
            <ExpandableInputDemo />
          </div>
        </SectionCard>

      {/* ============================================ TEXTAREAS ============================================ */}
      <SectionCard title="Textareas" description="7 variants — Default, Auto Resize, AI Prompt, Code Editor, Floating Label, Validation, Rich Text, Markdown">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="fi-variant-title mb-2 block">Default Textarea</span>
              <AutoTextarea rows={4} placeholder="Write something..." className="fi-input h-auto py-3 leading-relaxed" />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">Auto Resize Textarea</span>
              <AutoResizeTextarea />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">AI Prompt Textarea</span>
              <div className="relative">
                <AutoTextarea rows={3} placeholder="Describe what you want to generate..." className="fi-input h-auto py-3 pr-14 leading-relaxed" />
                <button className="absolute bottom-3 right-3 fi-btn fi-btn-primary size-8 rounded-lg p-0"><Sparkles className="size-4" strokeWidth={2.5} /></button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {['Blog post', 'Email', 'Code', 'Summary'].map((s, i) => (
                  <button key={s} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] transition hover:border-[var(--color-brand-400)] hover:text-[var(--text-strong)]">
                    {i === 0 && <Sparkles className="size-3" strokeWidth={2.5} />}
                    {s}
                  </button>
                ))}
              </div>
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">Code Editor Style</span>
              <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#0c111d] shadow-[var(--fi-shadow-md)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-[var(--color-error-500)]" />
                    <span className="size-2.5 rounded-full bg-[var(--color-warning-500)]" />
                    <span className="size-2.5 rounded-full bg-[var(--color-success-500)]" />
                  </div>
                  <span className="font-mono text-[10px] text-white/40">code.ts</span>
                </div>
                <AutoTextarea rows={4} defaultValue={'const hello: string = "world";\nconsole.log(hello);'} className="w-full bg-transparent p-3 font-mono text-xs leading-relaxed text-[#f8f8f2] outline-none" />
              </div>
            </label>
            <FloatingLabelTextarea />
            <label className="block">
              <span className="fi-variant-title mb-2 block">Validation Textarea</span>
              <AutoTextarea rows={3} defaultValue="This text is too short" className="h-auto w-full rounded-xl border border-[var(--color-error-500)] bg-[var(--card)] p-4 text-sm font-medium text-[var(--text-strong)] outline-none" style={{ boxShadow: '0 0 0 4px rgba(240,68,56,0.10)' }} />
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--color-error-600)] dark:text-[var(--color-error-500)]"><AlertCircle className="size-3" strokeWidth={2.5} /> Minimum 50 characters required</p>
            </label>
            <label className="block sm:col-span-2">
              <span className="fi-variant-title mb-2 block">Rich Text Editor</span>
              <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--fi-shadow-xs)]">
                <div className="flex flex-wrap items-center gap-1 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-2">
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)] font-medium text-sm"><Bold className="size-4" strokeWidth={2.5} /></button>
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)] italic"><Italic className="size-4" strokeWidth={2.5} /></button>
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"><Underline className="size-4" strokeWidth={2.5} /></button>
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"><Strikethrough className="size-4" strokeWidth={2.5} /></button>
                  <span className="mx-1 h-5 w-px bg-[var(--border)]" />
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"><Heading className="size-4" strokeWidth={2.5} /></button>
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"><List className="size-4" strokeWidth={2.5} /></button>
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"><Quote className="size-4" strokeWidth={2.5} /></button>
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"><Code className="size-4" strokeWidth={2.5} /></button>
                  <span className="mx-1 h-5 w-px bg-[var(--border)]" />
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"><Link2 className="size-4" strokeWidth={2.5} /></button>
                  <button className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--card)] hover:text-[var(--text-strong)]"><ImageIcon className="size-4" strokeWidth={2.5} /></button>
                </div>
                <AutoTextarea rows={4} defaultValue={'<p>Rich text with <strong>formatting</strong> toolbar</p>\n\nBuild beautiful content with live preview.'} className="w-full bg-transparent p-4 text-sm font-medium leading-relaxed text-[var(--text-strong)] outline-none" />
              </div>
            </label>
            <label className="block sm:col-span-2">
              <span className="fi-variant-title mb-2 block">Markdown Editor</span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#0c111d] shadow-[var(--fi-shadow-xs)]">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/40">Markdown</span>
                    <span className="font-mono text-[10px] text-white/30">preview.md</span>
                  </div>
                  <AutoTextarea rows={5} defaultValue={'# Heading\n\n**Bold** and *italic* text.\n\n- List item\n- Another item'} className="w-full bg-transparent p-3 font-mono text-xs leading-relaxed text-[#f8f8f2] outline-none" />
                </div>
                <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm text-[var(--text-body)] shadow-[var(--fi-shadow-xs)]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Preview</span>
                    <EyeIcon className="size-3.5 text-[var(--text-muted)]" />
                  </div>
                  <p className="font-semibold tracking-tight text-lg text-[var(--text-strong)]">Heading</p>
                  <p className="mt-2"><span className="font-semibold">Bold</span> and <span className="italic">italic</span> text.</p>
                  <ul className="mt-2 list-disc pl-4 space-y-0.5"><li>List item</li><li>Another item</li></ul>
                </div>
              </div>
            </label>
          </div>
        </SectionCard>

      {/* ============================================ SELECTS ============================================ */}
      <SectionCard title="Selects" description="9 variants — Default, Native, Searchable, Multi Select, Combobox, Async Select, Tag Select, AI Suggestion Select, Grouped Select">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="fi-variant-title mb-2 block">Default Select</span>
              <Select value="a" onChange={() => {}} options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }, { value: 'c', label: 'Option C' }]} />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">Native Select</span>
              <PremiumSelect
                placeholder="Choose an option..."
                options={[
                  { value: 'react', label: 'React' },
                  { value: 'vue', label: 'Vue' },
                  { value: 'svelte', label: 'Svelte' },
                  { value: 'angular', label: 'Angular' },
                ]}
                maxWidth="full"
              />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">Searchable Select</span>
              <SearchableSelectDemo />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">Multi Select</span>
              <MultiSelectDemo />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">Combobox</span>
              <ComboboxDemo />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">Async Select</span>
              <AsyncSelectDemo />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">Tag Select</span>
              <TagSelectDemo />
            </label>
            <label className="block">
              <span className="fi-variant-title mb-2 block">AI Suggestion Select</span>
              <AISuggestionSelectDemo />
            </label>
            <label className="block sm:col-span-2">
              <span className="fi-variant-title mb-2 block">Grouped Select</span>
              <div className="max-w-md">
                <PremiumSelect
                  placeholder="Choose a technology..."
                  options={[
                    { value: 'react', label: 'React', description: 'Frontend' },
                    { value: 'vue', label: 'Vue', description: 'Frontend' },
                    { value: 'svelte', label: 'Svelte', description: 'Frontend' },
                    { value: 'node', label: 'Node.js', description: 'Backend' },
                    { value: 'python', label: 'Python', description: 'Backend' },
                    { value: 'go', label: 'Go', description: 'Backend' },
                    { value: 'postgres', label: 'PostgreSQL', description: 'Database' },
                    { value: 'mongo', label: 'MongoDB', description: 'Database' },
                    { value: 'redis', label: 'Redis', description: 'Database' },
                  ]}
                  maxWidth="full"
                />
              </div>
            </label>
          </div>
        </SectionCard>

      {/* ============================================ CHECKBOXES ============================================ */}
      <SectionCard title="Checkboxes" description="6 variants — Default, Card Style, Animated, Gradient, Grouped, Indeterminate">
          <div className="space-y-6">
            <div>
              <p className="fi-label mb-3.5">Default Variants</p>
              <div className="flex flex-wrap gap-6">
                <CheckboxDemo label="Default" />
                <CheckboxDemo label="Checked" defaultChecked />
                <CheckboxDemo label="Disabled" disabled />
              </div>
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Card Style</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {['Email notifications', 'Push notifications', 'SMS alerts'].map((label, i) => (
                  <CheckboxCard key={label} label={label} defaultChecked={i === 0} />
                ))}
              </div>
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Animated Checkbox</p>
              <AnimatedCheckbox label="Animated check with bounce" />
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Gradient Checkbox</p>
              <GradientCheckbox label="Gradient background when checked" defaultChecked />
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Grouped with Indeterminate</p>
              <IndeterminateCheckboxDemo />
            </div>
          </div>
        </SectionCard>

      {/* ============================================ RADIO BUTTONS ============================================ */}
      <SectionCard title="Radio Buttons" description="5 variants — Default, Card Style, Modern Pills, Segmented, Image Radio">
          <div className="space-y-6">
            <RadioGroupDemo />
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Modern Pills</p>
              <div className="flex flex-wrap gap-2">
                {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((label, i) => (
                  <RadioPill key={label} label={label} name="freq" defaultChecked={i === 1} />
                ))}
              </div>
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Segmented Control</p>
              <SegmentedRadioDemo />
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Card Style Radio</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {['Free', 'Pro', 'Enterprise'].map((label, i) => (
                  <RadioCard key={label} label={label} desc={`$${[0, 84, 240][i]}/mo`} defaultChecked={i === 1} />
                ))}
              </div>
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Image Radio</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&h=160&fit=crop', label: 'Mountains' },
                  { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=240&h=160&fit=crop', label: 'Forest' },
                  { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=240&h=160&fit=crop', label: 'Misty' },
                ].map((opt, i) => <ImageRadio key={opt.label} url={opt.url} label={opt.label} defaultChecked={i === 0} />)}
              </div>
            </div>
          </div>
        </SectionCard>

      {/* ============================================ SWITCHES ============================================ */}
      <SectionCard title="Switches" description="6 variants — iOS Style, Gradient, Icon Switch, AI Toggle, Loading Switch, Label Switch">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SwitchDemo label="iOS Style" variant="ios" />
            <SwitchDemo label="Gradient" variant="gradient" />
            <SwitchDemo label="Icon Switch" variant="icon" />
            <SwitchDemo label="AI Toggle" variant="ai" />
            <SwitchDemo label="Loading Switch" variant="loading" />
            <SwitchDemo label="Label Switch" variant="label" />
          </div>
        </SectionCard>

      {/* ============================================ SLIDERS ============================================ */}
      <SectionCard title="Sliders" description="6 variants — Range Slider, Price Slider, Gradient Slider, Multi Range, Audio Slider, Progress Slider">
          <div className="max-w-2xl space-y-7">
            <SliderDemo label="Range Slider" min={0} max={100} defaultVal={60} />
            <div className="fi-divider" />
            <SliderDemo label="Price Slider" min={0} max={1000} defaultVal={450} prefix="$" />
            <div className="fi-divider" />
            <SliderDemo label="Gradient Slider" min={0} max={100} defaultVal={75} gradient />
            <div className="fi-divider" />
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="fi-variant-title flex items-center gap-2"><Volume2 className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} /> Audio Slider</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-[var(--surface-sunken)] px-2 py-0.5 text-xs font-semibold tabular-nums text-[var(--text-body)]">45%</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--fi-shadow-xs)]">
                <button className="fi-btn fi-btn-secondary size-8 rounded-lg p-0"><Play className="size-3.5" strokeWidth={2.5} /></button>
                <Volume2 className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
                <input type="range" min={0} max={100} defaultValue={45} className="fi-slider flex-1" style={{ background: 'linear-gradient(90deg, var(--color-brand-500) 45%, var(--surface-sunken) 45%)' }} />
                <span className="w-10 text-right text-xs font-semibold tabular-nums text-[var(--text-muted)]">2:34</span>
              </div>
            </div>
            <div className="fi-divider" />
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="fi-variant-title">Progress Slider</span>
                <span className="inline-flex items-center gap-1 rounded-md bg-[var(--color-success-50)] px-2 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-success-700)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-400)]">3 / 5 steps</span>
              </div>
              <div className="relative">
                <input type="range" min={0} max={4} defaultValue={2} className="fi-slider w-full" style={{ background: 'linear-gradient(90deg, var(--color-success-500) 50%, var(--surface-sunken) 50%)' }} />
                <div className="mt-3 flex justify-between">
                  {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'].map((s, i) => (
                    <span key={s} className={cn('text-[11px] font-semibold', i <= 2 ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-faint)]')}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

      {/* ============================================ RATINGS ============================================ */}
      <SectionCard title="Ratings" description="4 variants — Star Rating, Emoji Rating, Reaction Rating, Progress Rating">
          <div className="space-y-7">
            <StarRatingDemo />
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Emoji Rating</p>
              <EmojiRatingDemo />
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Reaction Rating</p>
              <ReactionRatingDemo />
            </div>
            <div className="fi-divider" />
            <div>
              <p className="fi-label mb-3.5">Progress Rating</p>
              <ProgressRatingDemo />
            </div>
          </div>
        </SectionCard>

      {/* ============================================ FILE UPLOAD ============================================ */}
      <SectionCard title="File Upload" description="5 variants — Drag & Drop Upload, Media Upload, Cloud Upload, Multi File Upload, AI Upload">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="space-y-5">
              <FileUploadDemo />
              <div className="fi-divider" />
              <div>
                <p className="fi-label mb-3.5">Cloud Upload</p>
                <button className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--fi-shadow-xs)] transition hover:border-[var(--color-brand-400)] hover:shadow-[var(--fi-shadow-md)]">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]"><Cloud className="size-5" strokeWidth={2.5} /></span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[var(--text-strong)]">Upload to Cloud</p>
                    <p className="text-xs text-[var(--text-muted)]">Files are stored securely on AWS S3</p>
                  </div>
                  <Upload className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <p className="fi-label mb-3.5">Media Upload</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=240&h=180&fit=crop' },
                    { src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=240&h=180&fit=crop' },
                  ].map((item, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-xl border border-[var(--border)] shadow-[var(--fi-shadow-xs)] transition hover:shadow-[var(--fi-shadow-md)]">
                      <img src={item.src} alt="" className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                      <button className="absolute right-1.5 top-1.5 inline-flex size-6 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur transition hover:bg-[var(--color-error-500)]"><X className="size-3" strokeWidth={2.5} /></button>
                    </div>
                  ))}
                  <button className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--surface-sunken)] text-[var(--text-muted)] transition hover:border-[var(--color-brand-500)] hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-500)] dark:hover:bg-[rgba(70,95,255,0.08)]">
                    <Plus className="size-5" strokeWidth={2.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wide">Add</span>
                  </button>
                </div>
              </div>
              <div className="fi-divider" />
              <div>
                <p className="fi-label mb-3.5">AI Upload</p>
                <button className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-[var(--color-brand-300)] bg-gradient-to-r from-[var(--color-brand-50)] to-[#7a5af8]/10 p-4 shadow-[var(--fi-shadow-xs)] transition hover:shadow-[var(--fi-shadow-glow)] dark:border-[rgba(70,95,255,0.24)] dark:from-[rgba(70,95,255,0.16)] dark:to-[rgba(122,90,248,0.08)]">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--fi-shadow-sm)]"><Sparkles className="size-5" strokeWidth={2.5} /></span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[var(--text-strong)]">Upload with AI Analysis</p>
                    <p className="text-xs text-[var(--text-muted)]">AI will automatically tag, categorize, and describe your files</p>
                  </div>
                  <ArrowRight className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </SectionCard>
    </div>
  );

}
