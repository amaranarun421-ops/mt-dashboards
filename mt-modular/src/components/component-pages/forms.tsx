'use client';

import * as React from 'react';
import {
  AlertCircle, ArrowRight, ArrowLeft, Bell, Building2, Calendar, Check,
  CheckCircle2, ChevronDown, ChevronRight, ChevronLeft, Clock, Code2,
  Copy, CreditCard, DollarSign, Download, Eye, EyeOff, FileText, GitBranch,
  Globe, Hash, Heart, Home, Info, Key, Link2, Loader2, Lock, Mail, MapPin,
  MessageSquare, Monitor, Smartphone, Package, Paperclip, Phone, Plus, Rocket,
  Send, Settings, Shield, Sparkles, Star, Store, Tag, Trash2, Truck, Upload,
  User, Users, Webhook, X, Zap,
} from 'lucide-react';
import { PageHeader, SectionCard, StatusBadge } from '@/components/dashboard/primitives';
import { PremiumSelect } from '@/components/dashboard/premium-controls';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM FORMS DESIGN SYSTEM ====================== */
function FormsStyles() {
  return (
    <style jsx global>{`
      .frm-root {
        --frm-radius-sm: 8px;
        --frm-radius-md: 12px;
        --frm-radius-lg: 16px;
        --frm-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --frm-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --frm-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --frm-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
      }
      .frm-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.025) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.020) 0px, transparent 50%);
      }
      .frm-label {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--text-strong);
        letter-spacing: -0.005em;
        line-height: 1.375rem;
      }
      .frm-helper {
        font-size: 0.75rem;
        font-weight: 400;
        color: var(--text-muted);
        line-height: 1rem;
      }
      .frm-error-text {
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--color-error-600);
        line-height: 1rem;
      }
      .frm-input {
        height: 2.5rem;
        width: 100%;
        border-radius: var(--frm-radius-md);
        border: 1px solid var(--border);
        background: var(--card);
        padding-left: 0.875rem;
        padding-right: 0.875rem;
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--text-strong);
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        box-shadow: var(--frm-shadow-xs);
        outline: none;
      }
      .frm-input::placeholder { color: var(--text-subtle); font-weight: 400; }
      .frm-input:hover { border-color: var(--border-strong); }
      .frm-input:focus {
        border-color: var(--color-brand-500);
        box-shadow: 0 0 0 3px rgba(70,95,255,0.12), var(--frm-shadow-xs);
      }
      .frm-input-error {
        border-color: var(--color-error-500);
      }
      .frm-input-error:focus {
        border-color: var(--color-error-500);
        box-shadow: 0 0 0 3px rgba(240,68,56,0.12), var(--frm-shadow-xs);
      }
      .frm-input-success {
        border-color: var(--color-success-500);
      }
      .frm-input-success:focus {
        border-color: var(--color-success-500);
        box-shadow: 0 0 0 3px rgba(18,183,106,0.12), var(--frm-shadow-xs);
      }
      .frm-textarea {
        min-height: 5.5rem;
        width: 100%;
        border-radius: var(--frm-radius-md);
        border: 1px solid var(--border);
        background: var(--card);
        padding: 0.625rem 0.875rem;
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--text-strong);
        line-height: 1.5rem;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
        box-shadow: var(--frm-shadow-xs);
        outline: none;
        resize: vertical;
      }
      .frm-textarea::placeholder { color: var(--text-subtle); }
      .frm-textarea:hover { border-color: var(--border-strong); }
      .frm-textarea:focus {
        border-color: var(--color-brand-500);
        box-shadow: 0 0 0 3px rgba(70,95,255,0.12), var(--frm-shadow-xs);
      }
      .frm-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border-radius: var(--frm-radius-md);
        font-size: 0.8125rem;
        font-weight: 600;
        letter-spacing: -0.005em;
        transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        cursor: pointer;
        white-space: nowrap;
      }
      .frm-btn:active { transform: scale(0.97); }
      .frm-btn-primary {
        height: 2.5rem;
        padding: 0 1rem;
        background: var(--color-brand-500);
        color: white;
        box-shadow: var(--frm-shadow-sm);
      }
      .frm-btn-primary:hover { background: var(--color-brand-600); box-shadow: var(--frm-shadow-md); }
      .frm-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      .frm-btn-secondary {
        height: 2.5rem;
        padding: 0 1rem;
        background: var(--card);
        color: var(--text-strong);
        border: 1px solid var(--border);
        box-shadow: var(--frm-shadow-xs);
      }
      .frm-btn-secondary:hover { background: var(--surface-sunken); border-color: var(--border-strong); }
      .frm-btn-ghost {
        height: 2.5rem;
        padding: 0 0.75rem;
        background: transparent;
        color: var(--text-muted);
      }
      .frm-btn-ghost:hover { background: var(--surface-sunken); color: var(--text-strong); }
      .frm-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        border-radius: 999px;
        padding: 0.125rem 0.5rem;
        font-size: 0.625rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }
      .frm-badge-basic { background: var(--color-success-50); color: var(--color-success-700); }
      .frm-badge-intermediate { background: var(--color-warning-50); color: var(--color-warning-700); }
      .frm-badge-advanced { background: var(--color-error-50); color: var(--color-error-700); }
      .frm-divider {
        height: 1px;
        background: var(--border);
      }
      .frm-toggle {
        position: relative;
        width: 2.25rem;
        height: 1.25rem;
        border-radius: 999px;
        transition: background-color 0.2s ease;
        cursor: pointer;
        flex-shrink: 0;
      }
      .frm-toggle-on { background: var(--color-brand-500); }
      .frm-toggle-off { background: var(--border-strong); }
      .frm-toggle-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 1rem;
        height: 1rem;
        border-radius: 999px;
        background: white;
        box-shadow: var(--frm-shadow-sm);
        transition: transform 0.2s ease;
      }
      .frm-toggle-on .frm-toggle-thumb { transform: translateX(1rem); }
    `}</style>
  );
}

/* ====================== REUSABLE FORM PRIMITIVES ====================== */
function FormField({ label, helper, error, success, required, children }: {
  label: string; helper?: string; error?: string; success?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="frm-label mb-1.5 flex items-center gap-1">
        {label}
        {required && <span className="text-[var(--color-error-500)]">*</span>}
      </label>
      {children}
      {helper && !error && !success && <p className="frm-helper mt-1.5">{helper}</p>}
      {error && (
        <p className="frm-error-text mt-1.5 flex items-center gap-1">
          <AlertCircle className="size-3.5" strokeWidth={2.5} /> {error}
        </p>
      )}
      {success && (
        <p className="frm-helper mt-1.5 flex items-center gap-1 text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
          <CheckCircle2 className="size-3.5" strokeWidth={2.5} /> {success}
        </p>
      )}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange} className={cn('frm-toggle', checked ? 'frm-toggle-on' : 'frm-toggle-off')}>
      <span className="frm-toggle-thumb" />
    </button>
  );
}

function FormSectionHeader({ index, title, description, category, complexity }: {
  index: number; title: string; description: string; category: string; complexity: 'Basic' | 'Intermediate' | 'Advanced';
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-50)] text-xs font-medium text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{index}</span>
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="text-base font-medium text-[var(--text-strong)]">{title}</h3>
            <span className={cn('frm-badge', complexity === 'Basic' ? 'frm-badge-basic' : complexity === 'Intermediate' ? 'frm-badge-intermediate' : 'frm-badge-advanced')}>{complexity}</span>
          </div>
          <p className="text-sm font-medium text-[var(--text-muted)]">{description}</p>
          <p className="mt-0.5 text-xs font-medium text-[var(--text-subtle)]">{category}</p>
        </div>
      </div>
    </div>
  );
}

/* ====================== MAIN PAGE ====================== */
export function FormsPage() {
  return (
    <div className="frm-root frm-bg space-y-6">
      <FormsStyles />
      <PageHeader
        breadcrumb={[{ label: 'Components' }, { label: 'Forms & Data' }, { label: 'Forms' }]}
        title="Forms"
        description="12 production-ready forms that developers actually build — complete with validation, states, and real-world UX patterns."
      />

      {/* 1. Contact Form */}
      <ContactForm />

      {/* 2. Feedback Form */}
      <FeedbackForm />

      {/* 3. Support Ticket Form */}
      <SupportTicketForm />

      {/* 4. Notification Preferences Form */}
      <NotificationPreferencesForm />

      {/* 5. Team Invite Form */}
      <TeamInviteForm />

      {/* 6. Billing Address Form */}
      <BillingAddressForm />

      {/* 7. Shipping Address Form */}
      <ShippingAddressForm />

      {/* 8. Checkout Details Form */}
      <CheckoutForm />

      {/* 9. Survey Form */}
      <SurveyForm />

      {/* 10. API Key Management Form */}
      <ApiKeyForm />

      {/* 11. Webhook Configuration Form */}
      <WebhookForm />

      {/* 12. Multi-Step Onboarding Wizard */}
      <OnboardingWizardForm />
    </div>
  );
}

/* ====================== 1. CONTACT FORM ====================== */
function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [form, setForm] = React.useState({ name: '', email: '', company: '', subject: '', message: '' });

  function submit() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  }

  if (submitted) {
    return (
      <SectionCard>
        <FormSectionHeader index={1} title="Contact Form" description="A simple contact form with name, email, subject, and message." category="Communication" complexity="Basic" />
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] py-12 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-success-500)] text-white shadow-[var(--frm-shadow-md)]">
            <CheckCircle2 className="size-6" strokeWidth={2.5} />
          </div>
          <h4 className="mt-4 text-lg font-medium text-[var(--text-strong)]">Message sent successfully</h4>
          <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">We'll get back to you within 24 hours.</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', subject: '', message: '' }); }} className="frm-btn frm-btn-secondary mt-4">Send another message</button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <FormSectionHeader index={1} title="Contact Form" description="A simple contact form with name, email, subject, and message." category="Communication" complexity="Basic" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Full name" required error={errors.name}>
          <input className={cn('frm-input', errors.name && 'frm-input-error')} placeholder="Arun Pandian" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }} />
        </FormField>
        <FormField label="Email address" required error={errors.email} helper="We'll never share your email.">
          <input type="email" className={cn('frm-input', errors.email && 'frm-input-error')} placeholder="arun@example.com" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }} />
        </FormField>
        <FormField label="Company" helper="Optional — helps us route your message.">
          <input className="frm-input" placeholder="Acme Inc." value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
        </FormField>
        <FormField label="Subject" required error={errors.subject}>
          <input className={cn('frm-input', errors.subject && 'frm-input-error')} placeholder="How can we help?" value={form.subject} onChange={e => { setForm({ ...form, subject: e.target.value }); setErrors({ ...errors, subject: '' }); }} />
        </FormField>
      </div>
      <div className="mt-4">
        <FormField label="Message" required error={errors.message} helper="Tell us a bit more about what you need.">
          <textarea className="frm-textarea" rows={4} placeholder="Hi there, I'd like to ask about..." value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }); }} />
        </FormField>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
        <p className="text-xs font-medium text-[var(--text-muted)]">Typical response time: 24 hours</p>
        <div className="flex gap-2">
          <button className="frm-btn frm-btn-ghost">Cancel</button>
          <button onClick={submit} disabled={loading} className="frm-btn frm-btn-primary">
            {loading ? <><Loader2 className="size-4 animate-spin" /> Sending...</> : <><Send className="size-4" strokeWidth={2.5} /> Send message</>}
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 2. FEEDBACK FORM ====================== */
function FeedbackForm() {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [category, setCategory] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [followUp, setFollowUp] = React.useState(false);
  const [error, setError] = React.useState('');

  function submit() {
    if (rating === 0) { setError('Please select a rating'); return; }
    if (!message.trim()) { setError('Please share your feedback'); return; }
    setError('');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SectionCard>
        <FormSectionHeader index={2} title="Feedback Form" description="Rate your experience and share detailed feedback with categories." category="Communication" complexity="Intermediate" />
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-brand-200)] bg-[var(--color-brand-50)] py-12 dark:border-[rgba(70,95,255,0.18)] dark:bg-[rgba(70,95,255,0.06)]">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-brand-500)] text-white shadow-[var(--frm-shadow-md)]">
            <Heart className="size-6" strokeWidth={2.5} />
          </div>
          <h4 className="mt-4 text-lg font-medium text-[var(--text-strong)]">Thank you for your feedback</h4>
          <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">Your input helps us improve the product.</p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <FormSectionHeader index={2} title="Feedback Form" description="Rate your experience and share detailed feedback with categories." category="Communication" complexity="Intermediate" />
      <div className="space-y-4">
        {/* Rating */}
        <FormField label="How was your experience?" required>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(s => (
              <button key={s} type="button" onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)} className="cursor-pointer transition-transform hover:scale-110">
                <Star className={cn('size-7 transition-colors', (hover || rating) >= s ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} strokeWidth={2} />
              </button>
            ))}
            <span className="ml-2 text-sm font-medium text-[var(--text-strong)]">{(hover || rating) > 0 ? `${(hover || rating)}/5` : 'Click to rate'}</span>
          </div>
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Feedback category" required>
            <PremiumSelect
              placeholder="Select category"
              options={[
                { value: 'bug', label: 'Bug report' },
                { value: 'feature', label: 'Feature request' },
                { value: 'ux', label: 'User experience' },
                { value: 'performance', label: 'Performance' },
                { value: 'other', label: 'Other' },
              ]}
              onChange={v => setCategory(v)}
            />
          </FormField>
          <FormField label="Email" helper="Optional — only if you want a response.">
            <input type="email" className="frm-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </FormField>
        </div>

        <FormField label="Your feedback" required error={error}>
          <textarea className="frm-textarea" rows={4} placeholder="Tell us what you think..." value={message} onChange={e => setMessage(e.target.value)} />
        </FormField>

        <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3">
          <div>
            <p className="text-sm font-medium text-[var(--text-strong)]">Allow follow-up contact</p>
            <p className="text-xs font-medium text-[var(--text-muted)]">We may reach out for more details.</p>
          </div>
          <Toggle checked={followUp} onChange={() => setFollowUp(!followUp)} />
        </div>

        <div className="flex justify-end border-t border-[var(--border-subtle)] pt-4">
          <button onClick={submit} className="frm-btn frm-btn-primary">
            <Send className="size-4" strokeWidth={2.5} /> Submit feedback
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 3. SUPPORT TICKET FORM ====================== */
function SupportTicketForm() {
  const [priority, setPriority] = React.useState('');
  const [department, setDepartment] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [files, setFiles] = React.useState<string[]>([]);
  const [dragOver, setDragOver] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function submit() {
    const errs: Record<string, string> = {};
    if (!department) errs.department = 'Please select a department';
    if (!priority) errs.priority = 'Please select a priority';
    if (!subject.trim()) errs.subject = 'Subject is required';
    if (!description.trim()) errs.description = 'Description is required';
    else if (description.trim().length < 20) errs.description = 'Please provide at least 20 characters';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SectionCard>
        <FormSectionHeader index={3} title="Support Ticket Form" description="Submit a support ticket with priority, department, file attachments, and detailed description." category="Support" complexity="Intermediate" />
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] py-12 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-success-500)] text-white shadow-[var(--frm-shadow-md)]">
            <CheckCircle2 className="size-6" strokeWidth={2.5} />
          </div>
          <h4 className="mt-4 text-lg font-medium text-[var(--text-strong)]">Ticket #TKT-2847 created</h4>
          <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">Our team will respond within 4 business hours.</p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => setSubmitted(false)} className="frm-btn frm-btn-secondary">View ticket</button>
            <button onClick={() => { setSubmitted(false); setSubject(''); setDescription(''); setFiles([]); }} className="frm-btn frm-btn-ghost">New ticket</button>
          </div>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <FormSectionHeader index={3} title="Support Ticket Form" description="Submit a support ticket with priority, department, file attachments, and detailed description." category="Support" complexity="Intermediate" />
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Department" required error={errors.department}>
            <PremiumSelect
              placeholder="Select department"
              options={[
                { value: 'technical', label: 'Technical Support' },
                { value: 'billing', label: 'Billing' },
                { value: 'account', label: 'Account' },
                { value: 'general', label: 'General Inquiry' },
              ]}
              onChange={v => { setDepartment(v); setErrors({ ...errors, department: '' }); }}
            />
          </FormField>
          <FormField label="Priority" required error={errors.priority}>
            <PremiumSelect
              placeholder="Select priority"
              options={[
                { value: 'low', label: 'Low — General question' },
                { value: 'medium', label: 'Medium — Need help soon' },
                { value: 'high', label: 'High — Blocking work' },
                { value: 'urgent', label: 'Urgent — Production down' },
              ]}
              onChange={v => { setPriority(v); setErrors({ ...errors, priority: '' }); }}
            />
          </FormField>
        </div>

        <FormField label="Subject" required error={errors.subject}>
          <input className={cn('frm-input', errors.subject && 'frm-input-error')} placeholder="Brief summary of the issue" value={subject} onChange={e => { setSubject(e.target.value); setErrors({ ...errors, subject: '' }); }} />
        </FormField>

        <FormField label="Description" required error={errors.description} helper="Include steps to reproduce, expected behavior, and actual behavior.">
          <textarea className={cn('frm-textarea', errors.description && 'frm-input-error')} rows={5} placeholder="Describe the issue in detail..." value={description} onChange={e => { setDescription(e.target.value); setErrors({ ...errors, description: '' }); }} />
        </FormField>

        {/* File Upload — Integrated naturally */}
        <FormField label="Attachments" helper="Screenshots, logs, or documents. Max 10MB each.">
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files).map(f => f.name)]); }}
            className={cn('flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors', dragOver ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border-strong)] bg-[var(--surface-sunken)] hover:border-[var(--color-brand-400)]')}
          >
            <Upload className="size-5 text-[var(--text-muted)]" strokeWidth={2.5} />
            <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">{dragOver ? 'Drop files here' : 'Drag files here or click to browse'}</p>
            <p className="text-xs font-medium text-[var(--text-muted)]">PNG, JPG, PDF, LOG up to 10MB</p>
          </div>
          {files.length > 0 && (
            <div className="mt-2 space-y-1.5">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2">
                  <Paperclip className="size-3.5 text-[var(--text-muted)]" strokeWidth={2.5} />
                  <span className="flex-1 truncate text-xs font-medium text-[var(--text-strong)]">{f}</span>
                  <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-[var(--text-muted)] transition hover:text-[var(--color-error-500)]"><X className="size-3.5" strokeWidth={2.5} /></button>
                </div>
              ))}
            </div>
          )}
        </FormField>

        <div className="flex items-center justify-between rounded-xl border border-[var(--color-info-200)] bg-[var(--color-info-50)] p-3 dark:border-[rgba(11,165,236,0.18)] dark:bg-[rgba(11,165,236,0.06)]">
          <div className="flex items-center gap-2">
            <Info className="size-4 text-[var(--color-info-500)]" strokeWidth={2.5} />
            <p className="text-xs font-medium text-[var(--text-body)]">Average response time: 4 hours during business days</p>
          </div>
        </div>

        <div className="flex justify-end border-t border-[var(--border-subtle)] pt-4">
          <button onClick={submit} className="frm-btn frm-btn-primary">
            <Send className="size-4" strokeWidth={2.5} /> Create ticket
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 4. NOTIFICATION PREFERENCES FORM ====================== */
function NotificationPreferencesForm() {
  const [prefs, setPrefs] = React.useState({
    emailProduct: true, emailSecurity: true, emailMarketing: false,
    pushMentions: true, pushAssignments: true, pushReminders: true,
    desktopEnabled: false, mobileEnabled: true,
    digest: 'weekly', quietStart: '22:00', quietEnd: '07:00',
  });
  const [saved, setSaved] = React.useState(false);

  function update(key: string, value: any) { setPrefs(prev => ({ ...prev, [key]: value })); setSaved(false); }

  const sections = [
    { title: 'Email notifications', icon: Mail, items: [
      { key: 'emailProduct', label: 'Product updates', desc: 'New features and improvements' },
      { key: 'emailSecurity', label: 'Security alerts', desc: 'Login attempts and password changes' },
      { key: 'emailMarketing', label: 'Marketing emails', desc: 'Tips, news, and special offers' },
    ]},
    { title: 'Push notifications', icon: Bell, items: [
      { key: 'pushMentions', label: 'Mentions', desc: 'When someone @mentions you' },
      { key: 'pushAssignments', label: 'Assignments', desc: 'When you are assigned a task' },
      { key: 'pushReminders', label: 'Task reminders', desc: 'Before tasks are due' },
    ]},
  ];

  return (
    <SectionCard>
      <FormSectionHeader index={4} title="Notification Preferences Form" description="Granular control over email, push, and desktop notifications with quiet hours." category="Settings" complexity="Intermediate" />
      <div className="space-y-5">
        {sections.map(section => {
          const SectionIcon = section.icon;
          return (
            <div key={section.title}>
              <div className="mb-2 flex items-center gap-2">
                <SectionIcon className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
                <h4 className="text-sm font-medium text-[var(--text-strong)]">{section.title}</h4>
              </div>
              <div className="space-y-1.5">
                {section.items.map(item => (
                  <div key={item.key} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-strong)]">{item.label}</p>
                      <p className="text-xs font-medium text-[var(--text-muted)]">{item.desc}</p>
                    </div>
                    <Toggle checked={prefs[item.key as keyof typeof prefs] as boolean} onChange={() => update(item.key, !prefs[item.key as keyof typeof prefs])} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="frm-divider" />

        {/* Channel toggles */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-[var(--text-strong)]">Notification channels</h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="flex items-center gap-2">
                <Monitor className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
                <span className="text-sm font-medium text-[var(--text-strong)]">Desktop</span>
              </div>
              <Toggle checked={prefs.desktopEnabled} onChange={() => update('desktopEnabled', !prefs.desktopEnabled)} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
              <div className="flex items-center gap-2">
                <Smartphone className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
                <span className="text-sm font-medium text-[var(--text-strong)]">Mobile</span>
              </div>
              <Toggle checked={prefs.mobileEnabled} onChange={() => update('mobileEnabled', !prefs.mobileEnabled)} />
            </div>
          </div>
        </div>

        {/* Quiet hours */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-[var(--text-strong)]">Quiet hours</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <FormField label="Digest frequency">
              <PremiumSelect
                value="weekly"
                options={[
                  { value: 'daily', label: 'Daily digest' },
                  { value: 'weekly', label: 'Weekly digest' },
                  { value: 'never', label: 'No digest' },
                ]}
              />
            </FormField>
            <FormField label="Quiet hours start">
              <input type="time" className="frm-input" value={prefs.quietStart} onChange={e => update('quietStart', e.target.value)} />
            </FormField>
            <FormField label="Quiet hours end">
              <input type="time" className="frm-input" value={prefs.quietEnd} onChange={e => update('quietEnd', e.target.value)} />
            </FormField>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          {saved ? (
            <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
              <CheckCircle2 className="size-4" strokeWidth={2.5} /> Preferences saved
            </p>
          ) : <p className="text-xs font-medium text-[var(--text-muted)]">Changes are applied immediately</p>}
          <button onClick={() => setSaved(true)} className="frm-btn frm-btn-primary">
            <Check className="size-4" strokeWidth={2.5} /> Save preferences
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 5. TEAM INVITE FORM ====================== */
function TeamInviteForm() {
  const [invites, setInvites] = React.useState<{ email: string; role: string }[]>([{ email: '', role: 'member' }]);
  const [message, setMessage] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState('');

  function addRow() { setInvites([...invites, { email: '', role: 'member' }]); }
  function removeRow(i: number) { setInvites(invites.filter((_, idx) => idx !== i)); }
  function updateRow(i: number, key: 'email' | 'role', value: string) {
    setInvites(invites.map((inv, idx) => idx === i ? { ...inv, [key]: value } : inv));
  }

  function send() {
    const valid = invites.filter(inv => inv.email.trim());
    if (valid.length === 0) { setError('Add at least one email address'); return; }
    for (const inv of valid) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inv.email)) { setError(`Invalid email: ${inv.email}`); return; }
    }
    setError('');
    setSent(true);
  }

  if (sent) {
    return (
      <SectionCard>
        <FormSectionHeader index={5} title="Team Invite Form" description="Invite multiple team members with role assignment and optional personal message." category="Team Management" complexity="Intermediate" />
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] py-12 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-success-500)] text-white shadow-[var(--frm-shadow-md)]">
            <Users className="size-6" strokeWidth={2.5} />
          </div>
          <h4 className="mt-4 text-lg font-medium text-[var(--text-strong)]">{invites.filter(i => i.email.trim()).length} invitations sent</h4>
          <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">Team members will receive an email with a join link.</p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <FormSectionHeader index={5} title="Team Invite Form" description="Invite multiple team members with role assignment and optional personal message." category="Team Management" complexity="Intermediate" />
      <div className="space-y-3">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 sm:col-span-7"><span className="frm-label">Email address</span></div>
          <div className="col-span-10 sm:col-span-4"><span className="frm-label">Role</span></div>
          <div className="col-span-2 sm:col-span-1"></div>
        </div>
        {invites.map((invite, i) => (
          <div key={i} className="grid grid-cols-12 gap-2">
            <div className="col-span-12 sm:col-span-7">
              <input type="email" className="frm-input" placeholder="colleague@example.com" value={invite.email} onChange={e => updateRow(i, 'email', e.target.value)} />
            </div>
            <div className="col-span-10 sm:col-span-4">
              <PremiumSelect
                value={invite.role}
                options={[
                  { value: 'owner', label: 'Owner' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'member', label: 'Member' },
                  { value: 'viewer', label: 'Viewer' },
                ]}
              />
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center">
              {invites.length > 1 && (
                <button onClick={() => removeRow(i)} className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--color-error-500)]">
                  <Trash2 className="size-4" strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button onClick={addRow} className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]">
          <Plus className="size-4" strokeWidth={2.5} /> Add another
        </button>

        <FormField label="Personal message" helper="Optional — included in the invitation email.">
          <textarea className="frm-textarea" rows={2} placeholder="Hi! I'd like to invite you to join our team workspace..." value={message} onChange={e => setMessage(e.target.value)} />
        </FormField>

        {error && <p className="frm-error-text flex items-center gap-1"><AlertCircle className="size-3.5" strokeWidth={2.5} /> {error}</p>}

        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          <p className="text-xs font-medium text-[var(--text-muted)]">Invitations expire after 7 days</p>
          <button onClick={send} className="frm-btn frm-btn-primary">
            <Send className="size-4" strokeWidth={2.5} /> Send {invites.filter(i => i.email.trim()).length || ''} invitations
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 6. BILLING ADDRESS FORM ====================== */
function BillingAddressForm() {
  const [form, setForm] = React.useState({ name: '', company: '', email: '', address: '', city: '', state: '', zip: '', country: 'United States', taxId: '', saveForLater: true });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [saved, setSaved] = React.useState(false);

  function update(key: string, value: any) { setForm(prev => ({ ...prev, [key]: value })); setErrors(prev => ({ ...prev, [key]: '' })); }

  function save() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.address.trim()) errs.address = 'Street address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.zip.trim()) errs.zip = 'ZIP / postal code is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaved(true);
  }

  return (
    <SectionCard>
      <FormSectionHeader index={6} title="Billing Address Form" description="Collect billing address with tax ID and company details for invoice generation." category="Billing" complexity="Intermediate" />
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Full name" required error={errors.name}>
            <input className={cn('frm-input', errors.name && 'frm-input-error')} placeholder="Arun Pandian" value={form.name} onChange={e => update('name', e.target.value)} />
          </FormField>
          <FormField label="Company" helper="Optional for individual accounts.">
            <input className="frm-input" placeholder="Acme Inc." value={form.company} onChange={e => update('company', e.target.value)} />
          </FormField>
        </div>

        <FormField label="Billing email" required error={errors.email} helper="Invoices will be sent to this address.">
          <input type="email" className={cn('frm-input', errors.email && 'frm-input-error')} placeholder="billing@acme.com" value={form.email} onChange={e => update('email', e.target.value)} />
        </FormField>

        <FormField label="Street address" required error={errors.address}>
          <input className={cn('frm-input', errors.address && 'frm-input-error')} placeholder="123 Main St, Suite 400" value={form.address} onChange={e => update('address', e.target.value)} />
        </FormField>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="City" required error={errors.city}>
            <input className={cn('frm-input', errors.city && 'frm-input-error')} placeholder="San Francisco" value={form.city} onChange={e => update('city', e.target.value)} />
          </FormField>
          <FormField label="State / Province">
            <input className="frm-input" placeholder="California" value={form.state} onChange={e => update('state', e.target.value)} />
          </FormField>
          <FormField label="ZIP / Postal" required error={errors.zip}>
            <input className={cn('frm-input', errors.zip && 'frm-input-error')} placeholder="94103" value={form.zip} onChange={e => update('zip', e.target.value)} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Country" required>
            <PremiumSelect
              value={form.country}
              options={[
                { value: 'United States', label: 'United States' },
                { value: 'United Kingdom', label: 'United Kingdom' },
                { value: 'Canada', label: 'Canada' },
                { value: 'Australia', label: 'Australia' },
                { value: 'Germany', label: 'Germany' },
                { value: 'France', label: 'France' },
                { value: 'India', label: 'India' },
                { value: 'Japan', label: 'Japan' },
              ]}
              onChange={v => update('country', v)}
            />
          </FormField>
          <FormField label="Tax ID / VAT" helper="For tax-exempt purchases and VAT compliance.">
            <input className="frm-input" placeholder="VAT123456789" value={form.taxId} onChange={e => update('taxId', e.target.value)} />
          </FormField>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3">
          <div>
            <p className="text-sm font-medium text-[var(--text-strong)]">Save for future purchases</p>
            <p className="text-xs font-medium text-[var(--text-muted)]">Store this address securely for faster checkout.</p>
          </div>
          <Toggle checked={form.saveForLater} onChange={() => update('saveForLater', !form.saveForLater)} />
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          {saved ? (
            <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
              <CheckCircle2 className="size-4" strokeWidth={2.5} /> Billing address saved
            </p>
          ) : <p className="text-xs font-medium text-[var(--text-muted)]">Required fields are marked with *</p>}
          <button onClick={save} className="frm-btn frm-btn-primary">
            <Check className="size-4" strokeWidth={2.5} /> Save billing address
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 7. SHIPPING ADDRESS FORM ====================== */
function ShippingAddressForm() {
  const [form, setForm] = React.useState({ name: '', phone: '', address: '', apt: '', city: '', state: '', zip: '', country: 'United States', instructions: '', default: false });
  const [method, setMethod] = React.useState('standard');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [saved, setSaved] = React.useState(false);

  function update(key: string, value: any) { setForm(prev => ({ ...prev, [key]: value })); setErrors(prev => ({ ...prev, [key]: '' })); }

  const shippingMethods = [
    { id: 'standard', label: 'Standard', desc: '5-7 business days', price: 'Free', icon: Truck },
    { id: 'express', label: 'Express', desc: '2-3 business days', price: '$12.00', icon: Zap },
    { id: 'overnight', label: 'Overnight', desc: 'Next business day', price: '$28.00', icon: Rocket },
  ];

  function save() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Recipient name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.address.trim()) errs.address = 'Street address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.zip.trim()) errs.zip = 'ZIP code is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaved(true);
  }

  return (
    <SectionCard>
      <FormSectionHeader index={7} title="Shipping Address Form" description="Recipient details with delivery method selection and delivery instructions." category="E-commerce" complexity="Intermediate" />
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Recipient name" required error={errors.name}>
            <input className={cn('frm-input', errors.name && 'frm-input-error')} placeholder="Arun Pandian" value={form.name} onChange={e => update('name', e.target.value)} />
          </FormField>
          <FormField label="Phone number" required error={errors.phone} helper="For delivery updates only.">
            <input type="tel" className={cn('frm-input', errors.phone && 'frm-input-error')} placeholder="+1 (555) 123-4567" value={form.phone} onChange={e => update('phone', e.target.value)} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <FormField label="Street address" required error={errors.address}>
              <input className={cn('frm-input', errors.address && 'frm-input-error')} placeholder="123 Main St" value={form.address} onChange={e => update('address', e.target.value)} />
            </FormField>
          </div>
          <FormField label="Apt / Suite">
            <input className="frm-input" placeholder="Apt 4B" value={form.apt} onChange={e => update('apt', e.target.value)} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="City" required error={errors.city}>
            <input className={cn('frm-input', errors.city && 'frm-input-error')} placeholder="San Francisco" value={form.city} onChange={e => update('city', e.target.value)} />
          </FormField>
          <FormField label="State">
            <input className="frm-input" placeholder="CA" value={form.state} onChange={e => update('state', e.target.value)} />
          </FormField>
          <FormField label="ZIP code" required error={errors.zip}>
            <input className={cn('frm-input', errors.zip && 'frm-input-error')} placeholder="94103" value={form.zip} onChange={e => update('zip', e.target.value)} />
          </FormField>
        </div>

        <FormField label="Country" required>
          <PremiumSelect
            value={form.country}
            options={[
              { value: 'United States', label: 'United States' },
              { value: 'United Kingdom', label: 'United Kingdom' },
              { value: 'Canada', label: 'Canada' },
              { value: 'Australia', label: 'Australia' },
            ]}
            onChange={v => update('country', v)}
          />
        </FormField>

        <FormField label="Delivery instructions" helper="Leave at door, call on arrival, etc.">
          <textarea className="frm-textarea" rows={2} placeholder="e.g. Leave package at the front desk" value={form.instructions} onChange={e => update('instructions', e.target.value)} />
        </FormField>

        {/* Shipping method */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-[var(--text-strong)]">Delivery method</h4>
          <div className="space-y-2">
            {shippingMethods.map(m => {
              const Icon = m.icon;
              const selected = method === m.id;
              return (
                <button key={m.id} onClick={() => setMethod(m.id)} className={cn('flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition', selected ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-brand-300)]')}>
                  <span className={cn('inline-flex size-9 items-center justify-center rounded-lg', selected ? 'bg-[var(--color-brand-500)] text-white' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>
                    <Icon className="size-4" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-strong)]">{m.label}</p>
                    <p className="text-xs font-medium text-[var(--text-muted)]">{m.desc}</p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--text-strong)]">{m.price}</span>
                  {selected && <Check className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3">
          <div>
            <p className="text-sm font-medium text-[var(--text-strong)]">Set as default address</p>
            <p className="text-xs font-medium text-[var(--text-muted)]">Use this address for future orders.</p>
          </div>
          <Toggle checked={form.default} onChange={() => update('default', !form.default)} />
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          {saved ? (
            <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">
              <CheckCircle2 className="size-4" strokeWidth={2.5} /> Shipping address saved
            </p>
          ) : <p className="text-xs font-medium text-[var(--text-muted)]">Estimated delivery: 5-7 business days</p>}
          <button onClick={save} className="frm-btn frm-btn-primary">
            <Check className="size-4" strokeWidth={2.5} /> Save address
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 8. CHECKOUT DETAILS FORM ====================== */
function CheckoutForm() {
  const [form, setForm] = React.useState({ cardName: '', cardNumber: '', expiry: '', cvc: '', email: '', saveCard: true });
  const [showCvc, setShowCvc] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [processing, setProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  function update(key: string, value: string) {
    let formatted = value;
    if (key === 'cardNumber') formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    if (key === 'expiry') formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    if (key === 'cvc') formatted = value.replace(/\D/g, '').slice(0, 4);
    setForm(prev => ({ ...prev, [key]: formatted }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  }

  function pay() {
    const errs: Record<string, string> = {};
    if (!form.cardName.trim()) errs.cardName = 'Name on card is required';
    if (form.cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = 'Enter a valid 16-digit card number';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errs.expiry = 'Use MM/YY format';
    if (form.cvc.length < 3) errs.cvc = 'CVC must be 3-4 digits';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setSuccess(true); }, 1800);
  }

  if (success) {
    return (
      <SectionCard>
        <FormSectionHeader index={8} title="Checkout Details Form" description="Payment form with card details, formatting, validation, and order summary." category="E-commerce" complexity="Advanced" />
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] py-12 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-success-500)] text-white shadow-[var(--frm-shadow-md)]">
            <CheckCircle2 className="size-6" strokeWidth={2.5} />
          </div>
          <h4 className="mt-4 text-lg font-medium text-[var(--text-strong)]">Payment successful</h4>
          <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">Order #ORD-9847 has been confirmed.</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-[var(--text-strong)]">$349.00</p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <FormSectionHeader index={8} title="Checkout Details Form" description="Payment form with card details, formatting, validation, and order summary." category="E-commerce" complexity="Advanced" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Form - 2 cols */}
        <div className="space-y-4 lg:col-span-2">
          <FormField label="Email for receipt" required error={errors.email}>
            <input type="email" className={cn('frm-input', errors.email && 'frm-input-error')} placeholder="arun@example.com" value={form.email} onChange={e => update('email', e.target.value)} />
          </FormField>

          <div className="flex items-center gap-2 border-t border-[var(--border-subtle)] pt-4">
            <CreditCard className="size-5 text-[var(--text-muted)]" strokeWidth={2.5} />
            <h4 className="text-sm font-medium text-[var(--text-strong)]">Payment details</h4>
          </div>

          <FormField label="Name on card" required error={errors.cardName}>
            <input className={cn('frm-input', errors.cardName && 'frm-input-error')} placeholder="ARUN PANDIAN" value={form.cardName} onChange={e => update('cardName', e.target.value)} />
          </FormField>

          <FormField label="Card number" required error={errors.cardNumber}>
            <div className="relative">
              <CreditCard className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
              <input className={cn('frm-input pl-9', errors.cardNumber && 'frm-input-error')} placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={e => update('cardNumber', e.target.value)} />
            </div>
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Expiry" required error={errors.expiry}>
              <input className={cn('frm-input', errors.expiry && 'frm-input-error')} placeholder="MM/YY" value={form.expiry} onChange={e => update('expiry', e.target.value)} />
            </FormField>
            <FormField label="CVC" required error={errors.cvc}>
              <div className="relative">
                <input type={showCvc ? 'text' : 'password'} className={cn('frm-input pr-9', errors.cvc && 'frm-input-error')} placeholder="123" value={form.cvc} onChange={e => update('cvc', e.target.value)} />
                <button onClick={() => setShowCvc(!showCvc)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                  {showCvc ? <EyeOff className="size-4" strokeWidth={2.5} /> : <Eye className="size-4" strokeWidth={2.5} />}
                </button>
              </div>
            </FormField>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3">
            <div>
              <p className="text-sm font-medium text-[var(--text-strong)]">Save card for future use</p>
              <p className="text-xs font-medium text-[var(--text-muted)]">Encrypted and stored securely.</p>
            </div>
            <Toggle checked={form.saveCard} onChange={() => setForm({ ...form, saveCard: !form.saveCard })} />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
            <Lock className="size-4 text-[var(--color-success-500)]" strokeWidth={2.5} />
            <p className="text-xs font-medium text-[var(--text-muted)]">Payments are encrypted and PCI DSS compliant.</p>
          </div>

          <button onClick={pay} disabled={processing} className="frm-btn frm-btn-primary w-full">
            {processing ? <><Loader2 className="size-4 animate-spin" /> Processing payment...</> : <><Lock className="size-4" strokeWidth={2.5} /> Pay $349.00</>}
          </button>
        </div>

        {/* Order Summary - 1 col */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--frm-shadow-xs)]">
            <h4 className="text-sm font-medium text-[var(--text-strong)]">Order summary</h4>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop" alt="" className="size-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-strong)]">Wireless Headphones</p>
                  <p className="text-xs font-medium text-[var(--text-muted)]">Qty: 1</p>
                </div>
                <span className="text-sm font-medium text-[var(--text-strong)]">$349.00</span>
              </div>
            </div>
            <div className="mt-3 space-y-1.5 border-t border-[var(--border-subtle)] pt-3 text-sm">
              <div className="flex justify-between"><span className="font-medium text-[var(--text-muted)]">Subtotal</span><span className="font-medium text-[var(--text-strong)]">$349.00</span></div>
              <div className="flex justify-between"><span className="font-medium text-[var(--text-muted)]">Shipping</span><span className="font-medium text-[var(--color-success-600)] dark:text-[var(--color-success-500)]">Free</span></div>
              <div className="flex justify-between"><span className="font-medium text-[var(--text-muted)]">Tax</span><span className="font-medium text-[var(--text-strong)]">$0.00</span></div>
            </div>
            <div className="mt-3 flex justify-between border-t border-[var(--border-subtle)] pt-3">
              <span className="text-sm font-semibold text-[var(--text-strong)]">Total</span>
              <span className="text-lg font-medium tabular-nums text-[var(--text-strong)]">$349.00</span>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 9. SURVEY FORM ====================== */
function SurveyForm() {
  const [answers, setAnswers] = React.useState<Record<string, any>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  const questions = [
    { id: 'q1', type: 'rating', label: 'How satisfied are you with our product?', required: true },
    { id: 'q2', type: 'rating', label: 'How likely are you to recommend us to a friend?', required: true },
    { id: 'q3', type: 'choice', label: 'Which features do you use most?', options: ['Dashboard', 'Analytics', 'Reports', 'Collaboration', 'API'], multi: true, required: true },
    { id: 'q4', type: 'scale', label: 'How easy was it to get started?', required: true },
    { id: 'q5', type: 'text', label: 'What can we improve?', required: false },
  ];

  function setAnswer(id: string, value: any) { setAnswers(prev => ({ ...prev, [id]: value })); }

  function submit() {
    for (const q of questions) {
      if (q.required && !answers[q.id]) { setError(`Please answer: ${q.label}`); return; }
    }
    setError('');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SectionCard>
        <FormSectionHeader index={9} title="Survey Form" description="Multi-question survey with ratings, choices, scale, and open-ended questions." category="Research" complexity="Advanced" />
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] py-12 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-success-500)] text-white shadow-[var(--frm-shadow-md)]">
            <CheckCircle2 className="size-6" strokeWidth={2.5} />
          </div>
          <h4 className="mt-4 text-lg font-medium text-[var(--text-strong)]">Survey submitted</h4>
          <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">Thank you for taking the time to share your thoughts.</p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <FormSectionHeader index={9} title="Survey Form" description="Multi-question survey with ratings, choices, scale, and open-ended questions." category="Research" complexity="Advanced" />
      <div className="space-y-6">
        {questions.map((q, qi) => (
          <div key={q.id} className="border-b border-[var(--border-subtle)] pb-5 last:border-0">
            <p className="mb-3 text-sm font-medium text-[var(--text-strong)]">
              <span className="text-[var(--text-muted)]">{qi + 1}.</span> {q.label}
              {q.required && <span className="ml-1 text-[var(--color-error-500)]">*</span>}
            </p>

            {q.type === 'rating' && (
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => setAnswer(q.id, s)} className="cursor-pointer transition-transform hover:scale-110">
                    <Star className={cn('size-7 transition-colors', (answers[q.id] || 0) >= s ? 'fill-[var(--color-warning-500)] text-[var(--color-warning-500)]' : 'fill-[var(--text-faint)] text-[var(--text-faint)]')} strokeWidth={2} />
                  </button>
                ))}
                <span className="ml-2 self-center text-sm font-medium text-[var(--text-strong)]">{answers[q.id] ? `${answers[q.id]}/5` : ''}</span>
              </div>
            )}

            {q.type === 'choice' && (
              <div className="flex flex-wrap gap-2">
                {q.options?.map(opt => {
                  const selected = answers[q.id]?.includes(opt);
                  return (
                    <button key={opt} onClick={() => {
                      const current = answers[q.id] || [];
                      setAnswer(q.id, selected ? current.filter((o: string) => o !== opt) : [...current, opt]);
                    }} className={cn('inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-2 text-sm font-medium transition', selected ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:border-[var(--color-brand-300)]')}>
                      {selected && <Check className="size-3.5" strokeWidth={2.5} />}{opt}
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === 'scale' && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--text-muted)]">Very difficult</span>
                <div className="flex flex-1 gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setAnswer(q.id, s)} className={cn('h-9 flex-1 rounded-lg border-2 text-sm font-medium transition', answers[q.id] === s ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] hover:border-[var(--color-brand-300)]')}>{s}</button>
                  ))}
                </div>
                <span className="text-xs font-medium text-[var(--text-muted)]">Very easy</span>
              </div>
            )}

            {q.type === 'text' && (
              <textarea className="frm-textarea" rows={3} placeholder="Share your thoughts..." value={answers[q.id] || ''} onChange={e => setAnswer(q.id, e.target.value)} />
            )}
          </div>
        ))}

        {error && <p className="frm-error-text flex items-center gap-1"><AlertCircle className="size-3.5" strokeWidth={2.5} /> {error}</p>}

        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          <p className="text-xs font-medium text-[var(--text-muted)]">All responses are anonymous</p>
          <button onClick={submit} className="frm-btn frm-btn-primary">
            <Send className="size-4" strokeWidth={2.5} /> Submit survey
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

/* ====================== 10. API KEY MANAGEMENT FORM ====================== */
function ApiKeyForm() {
  const [keys, setKeys] = React.useState([
    { id: 'k1', name: 'Production Server', key: 'sk_live_****************', created: 'Jun 15, 2025', lastUsed: '2 min ago', scope: 'Full access' },
    { id: 'k2', name: 'Staging Environment', key: 'sk_test_****************', created: 'Jun 10, 2025', lastUsed: '1h ago', scope: 'Read only' },
  ]);
  const [showCreate, setShowCreate] = React.useState(false);
  const [newKeyName, setNewKeyName] = React.useState('');
  const [newKeyScope, setNewKeyScope] = React.useState('full');
  const [revealed, setRevealed] = React.useState<Set<string>>(new Set());
  const [copied, setCopied] = React.useState<string | null>(null);
  const [created, setCreated] = React.useState<string | null>(null);

  function createKey() {
    if (!newKeyName.trim()) return;
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const id = 'k' + Date.now();
    setKeys(prev => [...prev, { id, name: newKeyName, key: newKey, created: 'Just now', lastUsed: 'Never', scope: newKeyScope === 'full' ? 'Full access' : newKeyScope === 'read' ? 'Read only' : 'Write only' }]);
    setCreated(newKey);
    setShowCreate(false);
    setNewKeyName('');
  }

  function copyKey(key: string) {
    navigator.clipboard?.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  function toggleReveal(id: string) {
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function revoke(id: string) {
    setKeys(prev => prev.filter(k => k.id !== id));
  }

  return (
    <SectionCard>
      <FormSectionHeader index={10} title="API Key Management Form" description="Create, view, copy, and revoke API keys with scoped permissions." category="Developer" complexity="Advanced" />

      {/* Security notice */}
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-[var(--color-warning-200)] bg-[var(--color-warning-50)] p-3 dark:border-[rgba(247,144,9,0.18)] dark:bg-[rgba(247,144,9,0.06)]">
        <Shield className="size-4 text-[var(--color-warning-500)]" strokeWidth={2.5} />
        <p className="text-xs font-medium text-[var(--text-body)]">Keep your API keys secure. Never share them in client-side code or public repositories.</p>
      </div>

      {/* Create key button / form */}
      {!showCreate ? (
        <button onClick={() => setShowCreate(true)} className="frm-btn frm-btn-primary mb-4">
          <Plus className="size-4" strokeWidth={2.5} /> Create new key
        </button>
      ) : (
        <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--frm-shadow-xs)]">
          <h4 className="mb-3 text-sm font-medium text-[var(--text-strong)]">Create new API key</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField label="Key name" required>
              <input className="frm-input" placeholder="e.g. Production Server" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} />
            </FormField>
            <FormField label="Permission scope" required>
              <PremiumSelect
                value={newKeyScope}
                options={[
                  { value: 'full', label: 'Full access' },
                  { value: 'read', label: 'Read only' },
                  { value: 'write', label: 'Write only' },
                ]}
                onChange={v => setNewKeyScope(v)}
              />
            </FormField>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={createKey} className="frm-btn frm-btn-primary">
              <Key className="size-4" strokeWidth={2.5} /> Generate key
            </button>
            <button onClick={() => setShowCreate(false)} className="frm-btn frm-btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      {/* Newly created key banner */}
      {created && (
        <div className="mb-4 rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] p-4 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[var(--color-success-500)]" strokeWidth={2.5} />
            <p className="text-sm font-medium text-[var(--text-strong)]">API key created successfully</p>
          </div>
          <p className="mb-2 text-xs font-medium text-[var(--text-muted)]">Copy this key now. For security reasons, it will not be shown in full again.</p>
          <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] p-2">
            <code className="flex-1 truncate font-mono text-xs font-semibold text-[var(--text-strong)]">{created}</code>
            <button onClick={() => copyKey(created)} className={cn('frm-btn h-7 px-2.5 text-xs', copied === created ? 'bg-[var(--color-success-500)] text-white' : 'bg-[var(--color-brand-500)] text-white')}>
              {copied === created ? <><Check className="size-3" strokeWidth={2.5} /> Copied</> : <><Copy className="size-3" strokeWidth={2.5} /> Copy</>}
            </button>
          </div>
          <button onClick={() => setCreated(null)} className="mt-2 text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">Dismiss</button>
        </div>
      )}

      {/* Key list */}
      <div className="space-y-2">
        {keys.map(k => (
          <div key={k.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--frm-shadow-xs)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Key className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />
                  <p className="text-sm font-medium text-[var(--text-strong)]">{k.name}</p>
                  <span className={cn('frm-badge', k.scope === 'Full access' ? 'frm-badge-advanced' : k.scope === 'Read only' ? 'frm-badge-basic' : 'frm-badge-intermediate')}>{k.scope}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <code className="rounded-md bg-[var(--surface-sunken)] px-2 py-1 font-mono text-xs font-semibold text-[var(--text-body)]">
                    {revealed.has(k.id) ? k.key : k.key.slice(0, 8) + '••••••••••••••••••••'}
                  </code>
                  <button onClick={() => toggleReveal(k.id)} className="inline-flex size-6 items-center justify-center rounded-md text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
                    {revealed.has(k.id) ? <EyeOff className="size-3.5" strokeWidth={2.5} /> : <Eye className="size-3.5" strokeWidth={2.5} />}
                  </button>
                  <button onClick={() => copyKey(k.key)} className="inline-flex size-6 items-center justify-center rounded-md text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]">
                    {copied === k.key ? <Check className="size-3.5 text-[var(--color-success-500)]" strokeWidth={2.5} /> : <Copy className="size-3.5" strokeWidth={2.5} />}
                  </button>
                </div>
                <p className="mt-1.5 text-[10px] font-medium text-[var(--text-subtle)]">Created {k.created} · Last used {k.lastUsed}</p>
              </div>
              <button onClick={() => revoke(k.id)} className="frm-btn frm-btn-ghost text-[var(--color-error-600)] dark:text-[var(--color-error-500)] hover:bg-[var(--color-error-50)] dark:hover:bg-[rgba(240,68,56,0.16)]">
                <Trash2 className="size-3.5" strokeWidth={2.5} /> Revoke
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 11. WEBHOOK CONFIGURATION FORM ====================== */
function WebhookForm() {
  const [webhooks, setWebhooks] = React.useState([
    { id: 'w1', url: 'https://api.example.com/hooks/orders', events: ['order.created', 'order.updated'], active: true, success: 99.8 },
    { id: 'w2', url: 'https://hooks.slack.com/services/T0/B0/X', events: ['payment.failed'], active: true, success: 100 },
  ]);
  const [showCreate, setShowCreate] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [events, setEvents] = React.useState<string[]>([]);
  const [secret, setSecret] = React.useState('whsec_9a8b7c6d5e');
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState('');

  const availableEvents = [
    { id: 'order.created', label: 'Order Created', desc: 'When a new order is placed' },
    { id: 'order.updated', label: 'Order Updated', desc: 'When an order status changes' },
    { id: 'order.cancelled', label: 'Order Cancelled', desc: 'When an order is cancelled' },
    { id: 'payment.success', label: 'Payment Success', desc: 'When payment is completed' },
    { id: 'payment.failed', label: 'Payment Failed', desc: 'When payment fails' },
    { id: 'user.signup', label: 'User Signup', desc: 'When a new user registers' },
  ];

  function create() {
    if (!url.trim()) { setError('Endpoint URL is required'); return; }
    if (!url.startsWith('https://')) { setError('URL must start with https://'); return; }
    if (events.length === 0) { setError('Select at least one event'); return; }
    setError('');
    setWebhooks(prev => [...prev, { id: 'w' + Date.now(), url, events, active: true, success: 0 }]);
    setUrl(''); setEvents([]); setShowCreate(false);
  }

  function toggleEvent(id: string) {
    setEvents(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  }

  function toggleActive(id: string) {
    setWebhooks(prev => prev.map(w => w.id === id ? { ...w, active: !w.active } : w));
  }

  function remove(id: string) {
    setWebhooks(prev => prev.filter(w => w.id !== id));
  }

  return (
    <SectionCard>
      <FormSectionHeader index={11} title="Webhook Configuration Form" description="Configure webhook endpoints with event subscriptions, secret key, and delivery stats." category="Developer" complexity="Advanced" />

      {/* Secret key */}
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3">
        <Shield className="size-4 text-[var(--text-muted)]" strokeWidth={2.5} />
        <span className="flex-1 truncate font-mono text-xs font-semibold text-[var(--text-body)]">{secret}</span>
        <button onClick={() => { navigator.clipboard?.writeText(secret); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className={cn('frm-btn h-7 px-2.5 text-xs', copied ? 'bg-[var(--color-success-500)] text-white' : 'bg-[var(--color-brand-500)] text-white')}>
          {copied ? <><Check className="size-3" strokeWidth={2.5} /> Copied</> : <><Copy className="size-3" strokeWidth={2.5} /> Copy</>}
        </button>
      </div>

      {/* Create button */}
      {!showCreate ? (
        <button onClick={() => setShowCreate(true)} className="frm-btn frm-btn-primary mb-4">
          <Plus className="size-4" strokeWidth={2.5} /> Add endpoint
        </button>
      ) : (
        <div className="mb-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--frm-shadow-xs)]">
          <h4 className="mb-3 text-sm font-medium text-[var(--text-strong)]">New webhook endpoint</h4>
          <div className="space-y-3">
            <FormField label="Endpoint URL" required error={error && error.includes('URL') ? error : undefined} helper="Must be a valid HTTPS URL.">
              <input className={cn('frm-input', error && error.includes('URL') && 'frm-input-error')} placeholder="https://your-app.com/webhooks" value={url} onChange={e => setUrl(e.target.value)} />
            </FormField>
            <div>
              <p className="frm-label mb-2">Events to subscribe</p>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {availableEvents.map(ev => {
                  const selected = events.includes(ev.id);
                  return (
                    <button key={ev.id} onClick={() => toggleEvent(ev.id)} className={cn('flex items-start gap-2 rounded-lg border-2 p-2.5 text-left transition', selected ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-brand-300)]')}>
                      <div className={cn('mt-0.5 inline-flex size-4 items-center justify-center rounded border-2', selected ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)]' : 'border-[var(--border-strong)]')}>
                        {selected && <Check className="size-2.5 text-white" strokeWidth={3} />}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[var(--text-strong)]">{ev.label}</p>
                        <p className="text-[10px] font-medium text-[var(--text-muted)]">{ev.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              {error && !error.includes('URL') && <p className="frm-error-text mt-1.5 flex items-center gap-1"><AlertCircle className="size-3.5" strokeWidth={2.5} /> {error}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={create} className="frm-btn frm-btn-primary">
                <Webhook className="size-4" strokeWidth={2.5} /> Create endpoint
              </button>
              <button onClick={() => setShowCreate(false)} className="frm-btn frm-btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Webhook list */}
      <div className="space-y-2">
        {webhooks.map(wh => (
          <div key={wh.id} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--frm-shadow-xs)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Webhook className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />
                  <code className="truncate text-xs font-medium text-[var(--text-strong)]">{wh.url}</code>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {wh.events.map(ev => <span key={ev} className="rounded-md bg-[var(--color-brand-50)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">{ev}</span>)}
                </div>
                <p className="mt-1.5 text-[10px] font-medium text-[var(--text-subtle)]">Success rate: {wh.success}%</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className={cn('text-[10px] font-medium', wh.active ? 'text-[var(--color-success-600)] dark:text-[var(--color-success-500)]' : 'text-[var(--text-muted)]')}>{wh.active ? 'Active' : 'Disabled'}</span>
                  <Toggle checked={wh.active} onChange={() => toggleActive(wh.id)} />
                </div>
                <button onClick={() => remove(wh.id)} className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--color-error-500)]">
                  <Trash2 className="size-3.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ====================== 12. MULTI-STEP ONBOARDING WIZARD ====================== */
function OnboardingWizardForm() {
  const [step, setStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [data, setData] = React.useState({
    name: '', role: '', teamSize: '',
    workspace: '', projectType: '',
    integrations: [] as string[],
    notifications: true,
  });

  const steps = [
    { label: 'Profile', icon: User },
    { label: 'Workspace', icon: Building2 },
    { label: 'Integrations', icon: GitBranch },
    { label: 'Preferences', icon: Settings },
  ];

  function update(key: string, value: any) { setData(prev => ({ ...prev, [key]: value })); }
  function next() { setStep(s => Math.min(s + 1, steps.length - 1)); }
  function prev() { setStep(s => Math.max(s - 1, 0)); }

  const integrationOptions = [
    { id: 'slack', name: 'Slack', icon: MessageSquare, color: 'var(--color-brand-500)' },
    { id: 'github', name: 'GitHub', icon: GitBranch, color: 'var(--text-strong)' },
    { id: 'figma', name: 'Figma', icon: Package, color: 'var(--color-error-500)' },
    { id: 'linear', name: 'Linear', icon: Zap, color: 'var(--color-brand-500)' },
    { id: 'notion', name: 'Notion', icon: FileText, color: 'var(--text-strong)' },
    { id: 'stripe', name: 'Stripe', icon: CreditCard, color: 'var(--color-info-500)' },
  ];

  if (completed) {
    return (
      <SectionCard>
        <FormSectionHeader index={12} title="Multi-Step Onboarding Wizard" description="4-step setup flow with progress tracking, validation, and completion state." category="Onboarding" complexity="Advanced" />
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] py-12 dark:border-[rgba(18,183,106,0.18)] dark:bg-[rgba(18,183,106,0.06)]">
          <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--color-success-500)] text-white shadow-[var(--frm-shadow-md)]">
            <CheckCircle2 className="size-6" strokeWidth={2.5} />
          </div>
          <h4 className="mt-4 text-lg font-medium text-[var(--text-strong)]">Setup complete</h4>
          <p className="mt-1 text-sm font-medium text-[var(--text-muted)]">Your workspace is ready. Welcome aboard, {data.name || 'there'}!</p>
          <button onClick={() => { setCompleted(false); setStep(0); setData({ name: '', role: '', teamSize: '', workspace: '', projectType: '', integrations: [], notifications: true }); }} className="frm-btn frm-btn-secondary mt-4">Start over</button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <FormSectionHeader index={12} title="Multi-Step Onboarding Wizard" description="4-step setup flow with progress tracking, validation, and completion state." category="Onboarding" complexity="Advanced" />

      {/* Progress steps */}
      <div className="mb-6 flex items-center justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isPast = i < step;
          const isCurrent = i === step;
          return (
            <React.Fragment key={s.label}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn('inline-flex size-9 items-center justify-center rounded-full transition-colors', isPast ? 'bg-[var(--color-success-500)] text-white' : isCurrent ? 'bg-[var(--color-brand-500)] text-white shadow-[var(--frm-shadow-md)]' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>
                  {isPast ? <Check className="size-4" strokeWidth={2.5} /> : <Icon className="size-4" strokeWidth={2.5} />}
                </div>
                <span className={cn('text-[10px] font-medium', isCurrent || isPast ? 'text-[var(--text-strong)]' : 'text-[var(--text-muted)]')}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={cn('h-0.5 flex-1 rounded-full transition-colors', i < step ? 'bg-[var(--color-success-500)]' : 'bg-[var(--border)]')} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step content */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--frm-shadow-xs)]">
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[var(--text-strong)]">Tell us about yourself</h4>
              <p className="text-xs font-medium text-[var(--text-muted)]">This helps us personalize your experience.</p>
            </div>
            <FormField label="Full name" required>
              <input className="frm-input" placeholder="Arun Pandian" value={data.name} onChange={e => update('name', e.target.value)} />
            </FormField>
            <FormField label="What best describes your role?" required>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {['Developer', 'Designer', 'Manager', 'Other'].map(r => (
                  <button key={r} onClick={() => update('role', r)} className={cn('rounded-lg border-2 px-3 py-2.5 text-xs font-medium transition', data.role === r ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:border-[var(--color-brand-300)]')}>{r}</button>
                ))}
              </div>
            </FormField>
            <FormField label="Team size" required>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {['Just me', '2-10', '11-50', '50+'].map(s => (
                  <button key={s} onClick={() => update('teamSize', s)} className={cn('rounded-lg border-2 px-3 py-2.5 text-xs font-medium transition', data.teamSize === s ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]' : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:border-[var(--color-brand-300)]')}>{s}</button>
                ))}
              </div>
            </FormField>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[var(--text-strong)]">Set up your workspace</h4>
              <p className="text-xs font-medium text-[var(--text-muted)]">This is where your team will collaborate.</p>
            </div>
            <FormField label="Workspace name" required>
              <input className="frm-input" placeholder="Acme Inc." value={data.workspace} onChange={e => update('workspace', e.target.value)} />
            </FormField>
            <FormField label="What are you working on?" required>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  { id: 'saas', label: 'SaaS Product', desc: 'Web applications and services' },
                  { id: 'mobile', label: 'Mobile App', desc: 'iOS and Android applications' },
                  { id: 'ecommerce', label: 'E-commerce', desc: 'Online store and marketplace' },
                  { id: 'internal', label: 'Internal Tools', desc: 'Dashboards and admin panels' },
                ].map(pt => (
                  <button key={pt.id} onClick={() => update('projectType', pt.id)} className={cn('rounded-xl border-2 p-3 text-left transition', data.projectType === pt.id ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-brand-300)]')}>
                    <p className="text-sm font-medium text-[var(--text-strong)]">{pt.label}</p>
                    <p className="text-xs font-medium text-[var(--text-muted)]">{pt.desc}</p>
                  </button>
                ))}
              </div>
            </FormField>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[var(--text-strong)]">Connect your tools</h4>
              <p className="text-xs font-medium text-[var(--text-muted)]">Integrate with your favorite services. You can skip this and do it later.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {integrationOptions.map(opt => {
                const Icon = opt.icon;
                const selected = data.integrations.includes(opt.id);
                return (
                  <button key={opt.id} onClick={() => update('integrations', selected ? data.integrations.filter(i => i !== opt.id) : [...data.integrations, opt.id])} className={cn('flex items-center gap-2.5 rounded-xl border-2 p-3 transition', selected ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--color-brand-300)]')}>
                    <span className="inline-flex size-8 items-center justify-center rounded-lg" style={{ color: opt.color }}><Icon className="size-4" strokeWidth={2.5} /></span>
                    <span className="flex-1 text-sm font-medium text-[var(--text-strong)]">{opt.name}</span>
                    {selected && <Check className="size-4 text-[var(--color-brand-500)]" strokeWidth={2.5} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[var(--text-strong)]">Notification preferences</h4>
              <p className="text-xs font-medium text-[var(--text-muted)]">Choose how you want to be notified.</p>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-sunken)] p-3">
              <div>
                <p className="text-sm font-medium text-[var(--text-strong)]">Email notifications</p>
                <p className="text-xs font-medium text-[var(--text-muted)]">Get notified about important updates.</p>
              </div>
              <Toggle checked={data.notifications} onChange={() => update('notifications', !data.notifications)} />
            </div>
            <div className="rounded-xl border border-[var(--color-info-200)] bg-[var(--color-info-50)] p-3 dark:border-[rgba(11,165,236,0.18)] dark:bg-[rgba(11,165,236,0.06)]">
              <div className="flex items-center gap-2">
                <Info className="size-4 text-[var(--color-info-500)]" strokeWidth={2.5} />
                <p className="text-xs font-medium text-[var(--text-body)]">You can change these settings anytime in Preferences.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
        <button onClick={prev} disabled={step === 0} className="frm-btn frm-btn-secondary disabled:opacity-40">
          <ArrowLeft className="size-4" strokeWidth={2.5} /> Back
        </button>
        <div className="flex items-center gap-3">
          {step < steps.length - 1 && <button onClick={next} className="text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">Skip step</button>}
          {step < steps.length - 1 ? (
            <button onClick={next} className="frm-btn frm-btn-primary">
              Continue <ArrowRight className="size-4" strokeWidth={2.5} />
            </button>
          ) : (
            <button onClick={() => setCompleted(true)} className="frm-btn frm-btn-primary">
              <Check className="size-4" strokeWidth={2.5} /> Complete setup
            </button>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
