'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  LayoutDashboard,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/lib/dashboard-store';
import type { AuthKey } from '@/lib/dashboard-store';

/* ========================================================================
   AuthLayout — fullscreen non-scrollable split-screen premium auth shell.
   - Bypasses the DashboardShell (no sidebar / header)
   - Left: scrollable form panel (kept compact to fit single screen)
   - Right: MTVerse branding panel copied from mtverse with subtle motion
   ======================================================================== */

interface AuthLayoutProps {
  /** Form content on the left */
  children: React.ReactNode;
  /** Optional footer link row below the form */
  footer?: React.ReactNode;
  /** Hide the right branding panel — useful for narrower focused flows */
  hideBranding?: boolean;
}

export function AuthLayout({ children, footer, hideBranding }: AuthLayoutProps) {
  return (
    <div className="relative isolate flex h-dvh overflow-hidden bg-[var(--background)]">
      {/* ============================================
          LEFT — Form panel (full height, no scroll on desktop)
          ============================================ */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center overflow-y-auto px-5 py-8 lg:w-1/2 lg:px-[8vw] lg:py-0">
        <BackToDashboard />
        <div className="w-full max-w-[480px]">
          {children}
          {footer && <div className="mt-6 text-center text-sm text-[var(--text-muted)]">{footer}</div>}
        </div>
      </div>

      {/* ============================================
          RIGHT — Premium MTVerse branding panel (from mtverse)
          ============================================ */}
      {!hideBranding && <AuthBrandPanel />}
    </div>
  );
}

/* ========================================================================
   BackToDashboard — top-left link that takes user back to the app shell
   with the sidebar visible and Authentication section expanded.
   Goes to Active Sessions (the only auth page that's NOT fullscreen).
   ======================================================================== */
export function BackToDashboard() {
  const setAuth = useDashboardStore((s) => s.setAuth);
  return (
    <div className="mb-6 text-left lg:mb-8">
      <button
        type="button"
        onClick={() => setAuth('sessions')}
        className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"
      >
        <ArrowLeft className="size-4" />
        Back to Dashboard
      </button>
    </div>
  );
}

/* ========================================================================
   AuthBrandPanel — copied from mtverse AuthBrandPanel with framer-motion
   ======================================================================== */
function AuthBrandPanel() {
  return (
    <aside className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden bg-[#171a57] text-white lg:flex lg:items-center lg:justify-center">
      {/* Grid pattern overlay (mtverse style) */}
      <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:64px_64px]" />

      {/* Decorative translucent squares (mtverse style) — with subtle motion */}
      <motion.div
        className="absolute left-[18%] top-[39%] h-28 w-28 bg-white/[0.075]"
        animate={{ y: [0, -14, 0], opacity: [0.075, 0.12, 0.075] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[24%] h-28 w-28 bg-white/[0.075]"
        animate={{ y: [0, 14, 0], opacity: [0.075, 0.12, 0.075] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="absolute left-[31%] top-[53%] h-20 w-20 bg-white/[0.075]"
        animate={{ y: [0, -10, 0], opacity: [0.075, 0.10, 0.075] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
      />

      {/* Soft glow orbs for added premium feel */}
      <motion.div
        className="absolute -left-20 top-1/4 size-72 rounded-full bg-[var(--color-brand-500)] opacity-30 blur-[100px]"
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-20 bottom-1/4 size-72 rounded-full bg-[#7a5af8] opacity-25 blur-[100px]"
        animate={{ opacity: [0.20, 0.35, 0.20] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Centered brand content */}
      <motion.div
        className="relative flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo + brand name */}
        <div className="mb-7 flex items-center justify-center gap-5">
          <motion.div
            className="flex size-16 items-center justify-center rounded-[18px] bg-[var(--color-brand-500)] shadow-[0_18px_45px_rgba(70,95,255,0.34)]"
            initial={{ scale: 0.8, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <LayoutDashboard className="size-9" strokeWidth={2.4} />
          </motion.div>
          <motion.p
            className="text-[44px] font-medium leading-none tracking-[-0.04em]"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            M<span className="text-[var(--color-brand-400)]">T</span>Verse
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.p
          className="max-w-md text-xl leading-7 text-white/64"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.45 }}
        >
          Premium Tailwind CSS admin UI library
          <br />
          for modern SaaS products
        </motion.p>

        {/* Stats row — added for extra premium feel */}
        <motion.div
          className="mt-10 flex items-center gap-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
        >
          {[
            { value: '49+', label: 'Pages' },
            { value: '10', label: 'Dashboards' },
            { value: '6', label: 'Libraries' },
            { value: '3', label: 'AI Gens' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.7 + i * 0.08 }}
            >
              <p className="text-2xl font-semibold text-white">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom-right moon badge (mtverse style) — with subtle pulse */}
      <motion.div
        className="absolute bottom-8 right-8 flex size-16 items-center justify-center rounded-full bg-[var(--color-brand-500)] shadow-[0_20px_50px_rgba(70,95,255,0.38)]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Moon className="size-7" />
      </motion.div>
    </aside>
  );
}

/* ========================================================================
   AuthFormHeading — title + subtitle for the form panel
   ======================================================================== */
interface AuthFormHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function AuthFormHeading({ title, subtitle, icon: Icon }: AuthFormHeadingProps) {
  return (
    <div className="mb-6">
      {Icon && (
        <motion.div
          className="mb-4 inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white shadow-lg shadow-[var(--color-brand-500)]/25"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Icon className="size-5" />
        </motion.div>
      )}
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-[28px]">{title}</h1>
      {subtitle && <p className="mt-1.5 text-sm font-normal text-[var(--text-muted)]">{subtitle}</p>}
    </div>
  );
}

/* ========================================================================
   AuthInput — input with label, icon, error, success, password toggle
   ======================================================================== */
interface AuthInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string;
  success?: boolean;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  id?: string;
}

export function AuthInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  success,
  required,
  autoComplete,
  hint,
  id,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const inputId = id ?? `auth-input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const isPassword = type === 'password';
  const actualType = isPassword && showPassword ? 'text' : type;

  const showError = !!error;
  const showSuccess = success && !showError && value.length > 0;

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 flex items-center gap-1 text-sm font-medium text-[var(--text-strong)]">
        {label}
        {required && <span className="text-[var(--color-error-500)]">*</span>}
      </label>
      <div
        className={cn(
          'group relative flex h-11 items-center rounded-xl border bg-[var(--card)] transition-all',
          focused && !showError && !showSuccess && 'border-[var(--color-brand-400)] ring-[3px] ring-[rgba(70,95,255,0.10)]',
          showError && 'border-[var(--color-error-500)] ring-[3px] ring-[rgba(240,68,56,0.10)]',
          showSuccess && 'border-[var(--color-success-500)] ring-[3px] ring-[rgba(18,183,106,0.10)]',
          !focused && !showError && !showSuccess && 'border-[var(--border)] hover:border-[var(--border-strong)]',
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              'ml-3.5 size-4 shrink-0 transition-colors',
              showError ? 'text-[var(--color-error-500)]' : showSuccess ? 'text-[var(--color-success-500)]' : focused ? 'text-[var(--color-brand-500)]' : 'text-[var(--text-subtle)]',
            )}
          />
        )}
        <input
          id={inputId}
          type={actualType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className="h-full flex-1 bg-transparent px-3 text-sm font-normal text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]"
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="mr-3 inline-flex size-7 cursor-pointer items-center justify-center rounded-md text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        ) : showSuccess ? (
          <Check className="mr-3.5 size-4 text-[var(--color-success-500)]" />
        ) : showError ? (
          <AlertCircle className="mr-3.5 size-4 text-[var(--color-error-500)]" />
        ) : null}
      </div>
      {showError ? (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--color-error-600)] dark:text-[var(--color-error-500)]">
          <AlertCircle className="size-3" /> {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs font-normal text-[var(--text-muted)]">{hint}</p>
      ) : null}
    </div>
  );
}

/* ========================================================================
   AuthButton — primary action button with loading state
   ======================================================================== */
interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export function AuthButton({
  children,
  onClick,
  loading = false,
  disabled = false,
  type = 'button',
  fullWidth = true,
  icon: Icon,
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-500)] px-5 text-sm font-medium text-white shadow-sm transition-all',
        'hover:bg-[var(--color-brand-600)] hover:shadow-md hover:shadow-[var(--color-brand-500)]/20',
        'active:scale-[0.99]',
        'disabled:cursor-not-allowed disabled:opacity-60',
        fullWidth && 'w-full',
      )}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Please wait…</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="size-4" />}
          <span>{children}</span>
          <ArrowRight className="size-4 opacity-80" />
        </>
      )}
    </button>
  );
}

/* ========================================================================
   AuthLink — internal navigation link between auth pages
   ======================================================================== */
interface AuthLinkProps {
  to: AuthKey;
  children: React.ReactNode;
  className?: string;
}

export function AuthLink({ to, children, className }: AuthLinkProps) {
  const setAuth = useDashboardStore((s) => s.setAuth);
  return (
    <button
      type="button"
      onClick={() => setAuth(to)}
      className={cn(
        'cursor-pointer text-sm font-medium text-[var(--color-brand-600)] transition hover:text-[var(--color-brand-700)] hover:underline dark:text-[var(--color-brand-300)] dark:hover:text-[var(--color-brand-200)]',
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ========================================================================
   SocialButton — Google / GitHub / Apple / X social login buttons
   ======================================================================== */
type SocialProvider = 'google' | 'github' | 'apple' | 'x';

interface SocialButtonProps {
  provider: SocialProvider;
  onClick?: () => void;
  label?: string;
}

const SOCIAL_LABELS: Record<SocialProvider, string> = {
  google: 'Sign in with Google',
  github: 'Sign in with GitHub',
  apple: 'Sign in with Apple',
  x: 'Sign in with X',
};

export function SocialButton({ provider, onClick, label }: SocialButtonProps) {
  const Icon = SOCIAL_ICONS[provider];
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
    >
      <Icon className="size-4" />
      <span>{label ?? SOCIAL_LABELS[provider]}</span>
    </button>
  );
}

/* Social icons — real SVG paths, no emojis */
export const SOCIAL_ICONS: Record<SocialProvider, React.ComponentType<{ className?: string }>> = {
  google: GoogleBrandIcon,
  github: GitHubBrandIcon,
  apple: AppleBrandIcon,
  x: XBrandIcon,
};

function GoogleBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function GitHubBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function AppleBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function XBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ========================================================================
   AuthCheckbox — labeled checkbox for "remember me" etc.
   ======================================================================== */
interface AuthCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export function AuthCheckbox({ checked, onChange, label }: AuthCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-md border transition',
          checked
            ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white'
            : 'border-[var(--border-strong)] bg-[var(--card)] hover:border-[var(--color-brand-400)]',
        )}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </button>
      <span className="text-sm font-normal text-[var(--text-body)]">{label}</span>
    </label>
  );
}

/* ========================================================================
   AuthDivider — "or" divider between form and social buttons
   ======================================================================== */
export function AuthDivider({ label = 'Or continue with' }: { label?: string }) {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-[var(--border)]" />
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-subtle)]">{label}</span>
      <span className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}

/* ========================================================================
   AuthOtpInput — 6-digit OTP box grid
   ======================================================================== */
interface AuthOtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function AuthOtpInput({ length = 6, value, onChange, error }: AuthOtpInputProps) {
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  function handleChange(idx: number, v: string) {
    const digit = v.replace(/\D/g, '').slice(-1);
    const next = value.split('');
    next[idx] = digit;
    onChange(next.join('').slice(0, length));
    if (digit && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) inputRefs.current[idx - 1]?.focus();
    if (e.key === 'ArrowRight' && idx < length - 1) inputRefs.current[idx + 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted);
    if (pasted.length === length) {
      inputRefs.current[length - 1]?.focus();
    } else if (pasted.length > 0) {
      inputRefs.current[pasted.length]?.focus();
    }
  }

  return (
    <div className="flex justify-between gap-2" onPaste={handlePaste}>
      {digits.map((d, idx) => (
        <input
          key={idx}
          ref={(el) => { inputRefs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className={cn(
            'ds-stat-value h-14 w-12 rounded-xl border bg-[var(--card)] text-center text-xl text-[var(--text-strong)] outline-none transition-all',
            error
              ? 'border-[var(--color-error-500)] ring-[3px] ring-[rgba(240,68,56,0.10)]'
              : d
                ? 'border-[var(--color-brand-500)] ring-[3px] ring-[rgba(70,95,255,0.10)]'
                : 'border-[var(--border)] focus:border-[var(--color-brand-400)] focus:ring-[3px] focus:ring-[rgba(70,95,255,0.10)]',
          )}
          aria-label={`Digit ${idx + 1}`}
        />
      ))}
    </div>
  );
}

/* ========================================================================
   AuthStrengthMeter — password strength meter
   ======================================================================== */
export function AuthStrengthMeter({ password }: { password: string }) {
  const checks = [
    { label: '8+ characters', test: (p: string) => p.length >= 8 },
    { label: 'Uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Number', test: (p: string) => /\d/.test(p) },
    { label: 'Special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];
  const passed = checks.filter((c) => c.test(password)).length;
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][passed];
  const strengthColor = ['', 'var(--color-error-500)', 'var(--color-warning-500)', 'var(--color-info-500)', 'var(--color-success-500)'][passed];

  if (!password) return null;
  return (
    <div className="mt-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--text-muted)]">Password strength</span>
        <span className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel}</span>
      </div>
      <div className="mt-2 flex gap-1">
        {checks.map((c, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--border-strong)]">
            <div className="h-full rounded-full transition-all" style={{ width: i < passed ? '100%' : '0%', backgroundColor: strengthColor }} />
          </div>
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-1.5">
        {checks.map((c) => {
          const ok = c.test(password);
          return (
            <li key={c.label} className="flex items-center gap-1.5 text-[11px] font-medium">
              <span className={cn('inline-flex size-3.5 items-center justify-center rounded-full', ok ? 'bg-[var(--color-success-500)] text-white' : 'bg-[var(--border-strong)] text-transparent')}>
                <Check className="size-2.5" strokeWidth={3} />
              </span>
              <span className={ok ? 'text-[var(--text-body)]' : 'text-[var(--text-muted)]'}>{c.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ========================================================================
   AuthInfoRow — small info box with icon (used in success / verify pages)
   ======================================================================== */
interface AuthInfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tone?: 'brand' | 'success' | 'warning' | 'info';
}

export function AuthInfoRow({ icon: Icon, title, description, tone = 'brand' }: AuthInfoRowProps) {
  const toneClasses = {
    brand: 'bg-[var(--color-brand-50)] text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]',
    success: 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    warning: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    info: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
  }[tone];

  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3.5">
      <span className={cn('inline-flex size-9 shrink-0 items-center justify-center rounded-xl', toneClasses)}>
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[var(--text-strong)]">{title}</p>
        <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">{description}</p>
      </div>
    </div>
  );
}

/* ========================================================================
   BackToSignIn — secondary link to return to sign-in
   ======================================================================== */
export function BackToSignIn() {
  return (
    <div className="mt-6 text-center">
      <AuthLink to="sign-in" className="inline-flex items-center gap-1.5">
        <ArrowRight className="size-3.5 rotate-180" />
        Back to sign in
      </AuthLink>
    </div>
  );
}
