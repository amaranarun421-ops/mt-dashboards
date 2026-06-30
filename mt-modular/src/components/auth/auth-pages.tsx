'use client';

import * as React from 'react';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  MailCheck,
  LockKeyhole,
  Hash,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Chrome,
  MapPin,
  Clock,
  LogOut,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Copy,
  Check,
  Sparkles,
  Zap,
  UserPlus,
  LogIn,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDashboardStore } from '@/lib/dashboard-store';
import { cn } from '@/lib/utils';
import {
  AuthLayout,
  AuthFormHeading,
  AuthInput,
  AuthButton,
  AuthLink,
  AuthCheckbox,
  AuthDivider,
  SocialButton,
  AuthOtpInput,
  AuthStrengthMeter,
  AuthInfoRow,
  BackToSignIn,
} from './auth-primitives';

/* ========================================================================
   1. SIGN IN
   ======================================================================== */
export function SignInPage() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

  function validate() {
    const next: typeof errors = {};
    if (!email) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Signed in successfully', description: `Welcome back, ${email.split('@')[0]}!` });
    }, 1400);
  }

  return (
    <AuthLayout
      footer={
        <p>
          Don&apos;t have an account? <AuthLink to="sign-up">Sign up for free</AuthLink>
        </p>
      }
    >
      <AuthFormHeading
        icon={LogIn}
        title="Sign in to MTVerse"
        subtitle="Welcome back. Enter your credentials to access your dashboard."
      />

      <div className="space-y-4">
        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(v) => { setEmail(v); if (errors.email) setErrors((e) => ({ ...e, email: undefined })); }}
          icon={Mail}
          error={errors.email}
          success={!errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
          required
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(v) => { setPassword(v); if (errors.password) setErrors((e) => ({ ...e, password: undefined })); }}
          icon={Lock}
          error={errors.password}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <AuthCheckbox checked={remember} onChange={setRemember} label="Keep me logged in" />
          <AuthLink to="forgot-password" className="text-xs">Forgot password?</AuthLink>
        </div>

        <AuthButton onClick={handleSubmit} loading={loading}>Sign in</AuthButton>
      </div>

      <AuthDivider />

      <div className="grid grid-cols-2 gap-3">
        <SocialButton provider="google" onClick={() => toast({ title: 'Redirecting to Google…' })} />
        <SocialButton provider="github" onClick={() => toast({ title: 'Redirecting to GitHub…' })} />
      </div>
    </AuthLayout>
  );
}

/* ========================================================================
   2. SIGN UP
   ======================================================================== */
export function SignUpPage() {
  const { toast } = useToast();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [agree, setAgree] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; password?: string; agree?: string }>({});

  function validate() {
    const next: typeof errors = {};
    if (!name) next.name = 'Name is required';
    if (!email) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    else if (password.length < 8) next.password = 'Use 8+ characters';
    if (!agree) next.agree = 'You must accept the terms to continue';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Account created', description: 'Check your inbox to verify your email' });
    }, 1600);
  }

  return (
    <AuthLayout
      footer={
        <p>
          Already have an account? <AuthLink to="sign-in">Sign in</AuthLink>
        </p>
      }
    >
      <AuthFormHeading
        icon={UserPlus}
        title="Create your account"
        subtitle="Start your 14-day free trial. No credit card required."
      />

      <div className="space-y-4">
        <AuthInput
          label="Full name"
          placeholder="Arun Pandian"
          value={name}
          onChange={(v) => { setName(v); if (errors.name) setErrors((e) => ({ ...e, name: undefined })); }}
          icon={User}
          error={errors.name}
          success={!errors.name && name.length > 1}
          required
          autoComplete="name"
        />
        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(v) => { setEmail(v); if (errors.email) setErrors((e) => ({ ...e, email: undefined })); }}
          icon={Mail}
          error={errors.email}
          success={!errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
          required
          autoComplete="email"
        />
        <div>
          <AuthInput
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(v) => { setPassword(v); if (errors.password) setErrors((e) => ({ ...e, password: undefined })); }}
            icon={Lock}
            error={errors.password}
            required
            autoComplete="new-password"
          />
          <AuthStrengthMeter password={password} />
        </div>

        <div>
          <AuthCheckbox checked={agree} onChange={(v) => { setAgree(v); if (errors.agree) setErrors((e) => ({ ...e, agree: undefined })); }} label="I agree to the Terms of Service and Privacy Policy" />
          {errors.agree && <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[var(--color-error-600)] dark:text-[var(--color-error-500)]"><AlertTriangle className="size-3" /> {errors.agree}</p>}
        </div>

        <AuthButton onClick={handleSubmit} loading={loading} icon={UserPlus}>Create account</AuthButton>
      </div>

      <AuthDivider />

      <div className="grid grid-cols-2 gap-3">
        <SocialButton provider="google" onClick={() => toast({ title: 'Redirecting to Google…' })} />
        <SocialButton provider="apple" onClick={() => toast({ title: 'Redirecting to Apple…' })} />
      </div>
    </AuthLayout>
  );
}

/* ========================================================================
   3. FORGOT PASSWORD
   ======================================================================== */
export function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  function handleSubmit() {
    if (!email) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email address'); return; }
    setError(undefined);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast({ title: 'Reset link sent', description: `Check ${email}` });
    }, 1400);
  }

  return (
    <AuthLayout
      footer={
        <p>
          Remembered your password? <AuthLink to="sign-in">Back to sign in</AuthLink>
        </p>
      }
    >
      <AuthFormHeading
        icon={KeyRound}
        title="Forgot password?"
        subtitle="Enter your email and we'll send you a secure link to reset your password."
      />

      {sent ? (
        <div className="space-y-5">
          <AuthInfoRow
            icon={MailCheck}
            tone="success"
            title="Reset link sent"
            description={`We've sent a password reset link to ${email}. The link expires in 30 minutes.`}
          />
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4 text-center">
            <p className="text-xs font-normal text-[var(--text-muted)]">
              Didn&apos;t receive the email? Check spam or{' '}
              <button type="button" onClick={() => { setSent(false); setEmail(''); }} className="cursor-pointer font-medium text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">
                try a different address
              </button>
            </p>
          </div>
          <AuthButton onClick={() => toast({ title: 'Resending…' })} icon={RefreshCw}>Resend link</AuthButton>
        </div>
      ) : (
        <div className="space-y-4">
          <AuthInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(v) => { setEmail(v); if (error) setError(undefined); }}
            icon={Mail}
            error={error}
            required
            autoComplete="email"
          />
          <AuthButton onClick={handleSubmit} loading={loading} icon={Mail}>Send reset link</AuthButton>
        </div>
      )}
    </AuthLayout>
  );
}

/* ========================================================================
   4. RESET PASSWORD
   ======================================================================== */
export function ResetPasswordPage() {
  const { toast } = useToast();
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ password?: string; confirm?: string }>({});

  function validate() {
    const next: typeof errors = {};
    if (!password) next.password = 'Password is required';
    else if (password.length < 8) next.password = 'Use 8+ characters';
    if (!confirm) next.confirm = 'Please confirm your password';
    else if (confirm !== password) next.confirm = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Password reset successfully', description: 'You can now sign in with your new password' });
    }, 1500);
  }

  return (
    <AuthLayout
      footer={
        <p>
          <AuthLink to="sign-in">Back to sign in</AuthLink>
        </p>
      }
    >
      <AuthFormHeading
        icon={LockKeyhole}
        title="Set a new password"
        subtitle="Choose a strong password you haven't used before."
      />

      <div className="space-y-4">
        <div>
          <AuthInput
            label="New password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(v) => { setPassword(v); if (errors.password) setErrors((e) => ({ ...e, password: undefined })); }}
            icon={Lock}
            error={errors.password}
            required
            autoComplete="new-password"
          />
          <AuthStrengthMeter password={password} />
        </div>
        <AuthInput
          label="Confirm new password"
          type="password"
          placeholder="Re-enter new password"
          value={confirm}
          onChange={(v) => { setConfirm(v); if (errors.confirm) setErrors((e) => ({ ...e, confirm: undefined })); }}
          icon={Lock}
          error={errors.confirm}
          success={!errors.confirm && confirm.length > 0 && confirm === password}
          required
          autoComplete="new-password"
        />
        <AuthButton onClick={handleSubmit} loading={loading} icon={Check}>Reset password</AuthButton>
      </div>

      <BackToSignIn />
    </AuthLayout>
  );
}

/* ========================================================================
   5. VERIFY EMAIL
   ======================================================================== */
export function VerifyEmailPage() {
  const { toast } = useToast();
  const [verifying, setVerifying] = React.useState(false);
  const [verified, setVerified] = React.useState(false);

  function handleVerify() {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      toast({ title: 'Email verified', description: 'Welcome to MTVerse!' });
    }, 1500);
  }

  return (
    <AuthLayout
      footer={
        <p>
          Need help? <a href="#" className="cursor-pointer font-medium text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">Contact support</a>
        </p>
      }
    >
      <AuthFormHeading
        icon={MailCheck}
        title={verified ? 'Email verified' : 'Verify your email'}
        subtitle={verified ? 'Your email has been successfully confirmed.' : 'Confirm your email address to activate your account.'}
      />

      {verified ? (
        <div className="space-y-5">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--color-success-100)] bg-[var(--color-success-50)] py-8 dark:border-[rgba(18,183,106,0.20)] dark:bg-[rgba(18,183,106,0.08)]">
            <div className="inline-flex size-16 items-center justify-center rounded-full bg-[var(--color-success-500)] text-white shadow-lg shadow-[var(--color-success-500)]/30">
              <CheckCircle2 className="size-8" strokeWidth={2.2} />
            </div>
            <p className="mt-4 text-base font-medium text-[var(--text-strong)]">All set!</p>
            <p className="mt-1 text-xs font-normal text-[var(--text-muted)]">You can now access all MTVerse features.</p>
          </div>
          <AuthButton onClick={() => toast({ title: 'Taking you to your dashboard…' })} icon={ArrowRight}>Continue to dashboard</AuthButton>
        </div>
      ) : (
        <div className="space-y-4">
          <AuthInfoRow
            icon={Mail}
            tone="brand"
            title="Check your inbox"
            description="We sent a verification link to arun@mtverse.io. Click the link in the email to confirm your address."
          />
          <AuthInfoRow
            icon={Clock}
            tone="warning"
            title="Link expires in 24 hours"
            description="If you don't verify within 24 hours, you'll need to request a new link."
          />
          <AuthButton onClick={handleVerify} loading={verifying} icon={CheckCircle2}>Verify email address</AuthButton>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4 text-center">
            <p className="text-xs font-normal text-[var(--text-muted)]">
              Didn&apos;t receive the email?{' '}
              <button type="button" onClick={() => toast({ title: 'Verification email resent' })} className="cursor-pointer font-medium text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">
                Resend verification
              </button>
            </p>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}

/* ========================================================================
   6. TWO-FACTOR AUTHENTICATION
   ======================================================================== */
export function TwoFactorPage() {
  const { toast } = useToast();
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const [verified, setVerified] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const secret = 'JBSWY3DPEHPK3PXP';

  function handleSubmit() {
    if (code.length !== 6) { setError('Enter all 6 digits'); return; }
    setError(undefined);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === '123456' || code.length === 6) {
        setVerified(true);
        toast({ title: '2FA enabled', description: 'Your account is now protected with two-factor authentication' });
      } else {
        setError('Invalid code. Please try again.');
      }
    }, 1500);
  }

  function copySecret() {
    navigator.clipboard?.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (verified) {
    return (
      <AuthLayout
        footer={
          <p>
            <AuthLink to="sessions">Manage security settings</AuthLink>
          </p>
        }
      >
        <AuthFormHeading
          icon={ShieldCheck}
          title="Two-factor enabled"
          subtitle="Your account is now protected with an extra layer of security."
        />
        <div className="space-y-5">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--color-success-100)] bg-[var(--color-success-50)] py-8 dark:border-[rgba(18,183,106,0.20)] dark:bg-[rgba(18,183,106,0.08)]">
            <div className="inline-flex size-16 items-center justify-center rounded-full bg-[var(--color-success-500)] text-white shadow-lg shadow-[var(--color-success-500)]/30">
              <ShieldCheck className="size-8" strokeWidth={2.2} />
            </div>
            <p className="mt-4 text-base font-medium text-[var(--text-strong)]">All set!</p>
            <p className="mt-1 max-w-xs text-xs font-normal text-[var(--text-muted)]">Save your backup codes in a safe place in case you lose access to your authenticator app.</p>
          </div>
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Backup codes</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {['8H2K-9P4Q', 'M7N3-X5ZL', 'B1Y6-T8RW', 'D4F2-J9CV', 'E5L7-A3UO', 'G6S1-N2KW'].map((c) => (
                <span key={c} className="rounded-md bg-[var(--card)] px-2 py-1.5 text-[var(--text-body)]">{c}</span>
              ))}
            </div>
          </div>
          <AuthButton onClick={() => toast({ title: 'Taking you to your dashboard…' })} icon={ArrowRight}>Continue</AuthButton>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      footer={
        <p>
          <AuthLink to="sign-in">Back to sign in</AuthLink>
        </p>
      }
    >
      <AuthFormHeading
        icon={ShieldCheck}
        title="Two-factor authentication"
        subtitle="Scan the QR code with your authenticator app, then enter the 6-digit code."
      />

      <div className="space-y-4">
        {/* QR code + Secret key — side by side to save vertical space */}
        <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-lg bg-white p-2">
            <QrCodePattern />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-[var(--text-strong)]">Scan QR code</p>
            <p className="mt-0.5 text-[11px] font-normal text-[var(--text-muted)]">Use Google Authenticator, Authy, or 1Password</p>
            <div className="mt-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-2">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Secret key</p>
                  <p className="mt-0.5 font-mono text-xs font-medium tracking-wider text-[var(--text-strong)]">{secret}</p>
                </div>
                <button
                  type="button"
                  onClick={copySecret}
                  className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"
                  aria-label="Copy secret"
                >
                  {copied ? <Check className="size-3 text-[var(--color-success-500)]" /> : <Copy className="size-3" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* OTP entry */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-strong)]">Enter 6-digit code</label>
          <AuthOtpInput value={code} onChange={(v) => { setCode(v); if (error) setError(undefined); }} error={!!error} />
          {error && <p className="mt-2 flex items-center gap-1 text-xs font-medium text-[var(--color-error-600)] dark:text-[var(--color-error-500)]"><AlertTriangle className="size-3" /> {error}</p>}
        </div>

        <AuthButton onClick={handleSubmit} loading={loading} icon={ShieldCheck}>Verify and enable</AuthButton>
      </div>
    </AuthLayout>
  );
}

/* QR code visual pattern — generated procedurally for premium feel */
function QrCodePattern() {
  // Pseudo-random 21x21 grid based on a fixed seed for consistent rendering
  const cells: boolean[] = [];
  let seed = 42;
  for (let i = 0; i < 21 * 21; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.5);
  }
  // Force corner finder patterns to be solid
  function isFinder(r: number, c: number) {
    const inBox = (r0: number, c0: number) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7;
    const inInner = (r0: number, c0: number) => r >= r0 + 2 && r < r0 + 5 && c >= c0 + 2 && c < c0 + 5;
    const inRing = (r0: number, c0: number) => inBox(r0, c0) && !(r > r0 && r < r0 + 6 && c > c0 && c < c0 + 6);
    return (inBox(0, 0) && (inInner(0, 0) || inRing(0, 0))) || (inBox(0, 14) && (inInner(0, 14) || inRing(0, 14))) || (inBox(14, 0) && (inInner(14, 0) || inRing(14, 0)));
  }
  return (
    <svg viewBox="0 0 21 21" className="size-full" aria-hidden="true">
      <rect width="21" height="21" fill="#ffffff" />
      {cells.map((on, i) => {
        const r = Math.floor(i / 21);
        const c = i % 21;
        if (isFinder(r, c)) return <rect key={i} x={c} y={r} width="1" height="1" fill="#0a0e1a" />;
        if (on) return <rect key={i} x={c} y={r} width="1" height="1" fill="#0a0e1a" />;
        return null;
      })}
    </svg>
  );
}

/* ========================================================================
   7. OTP VERIFICATION (login second step)
   ======================================================================== */
export function OtpPage() {
  const { toast } = useToast();
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const [resendIn, setResendIn] = React.useState(30);

  React.useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  function handleSubmit() {
    if (code.length !== 6) { setError('Enter all 6 digits'); return; }
    setError(undefined);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (code === '000000') {
        setError('Invalid code. Please try again.');
      } else {
        toast({ title: 'Verified successfully', description: 'Welcome back!' });
      }
    }, 1400);
  }

  return (
    <AuthLayout
      footer={
        <p>
          Wrong number? <AuthLink to="sign-in">Sign in again</AuthLink>
        </p>
      }
    >
      <AuthFormHeading
        icon={Hash}
        title="Enter verification code"
        subtitle="We sent a 6-digit code to +1 (415) ••• 0142. Enter it below to continue."
      />

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-strong)]">Verification code</label>
          <AuthOtpInput value={code} onChange={(v) => { setCode(v); if (error) setError(undefined); }} error={!!error} />
          {error && <p className="mt-2 flex items-center gap-1 text-xs font-medium text-[var(--color-error-600)] dark:text-[var(--color-error-500)]"><AlertTriangle className="size-3" /> {error}</p>}
        </div>

        <AuthButton onClick={handleSubmit} loading={loading} disabled={code.length !== 6} icon={Check}>Verify code</AuthButton>

        <div className="flex items-center justify-center gap-1.5 text-xs font-normal text-[var(--text-muted)]">
          {resendIn > 0 ? (
            <span>Resend code in <span className="font-medium tabular-nums text-[var(--text-strong)]">0:{resendIn.toString().padStart(2, '0')}</span></span>
          ) : (
            <button type="button" onClick={() => { setResendIn(30); toast({ title: 'Code resent' }); }} className="cursor-pointer font-medium text-[var(--color-brand-600)] hover:underline dark:text-[var(--color-brand-300)]">
              Resend code
            </button>
          )}
        </div>
      </div>

      <BackToSignIn />
    </AuthLayout>
  );
}

/* ========================================================================
   8. WELCOME ONBOARDING (multi-step)
   ======================================================================== */
export function WelcomePage() {
  const { toast } = useToast();
  const setSection = useDashboardStore((s) => s.setSection);
  const [step, setStep] = React.useState(0);
  const [role, setRole] = React.useState<string>('');
  const [interests, setInterests] = React.useState<Set<string>>(new Set());
  const [name, setName] = React.useState('Arun');

  const steps = ['Role', 'Interests', 'Ready'];

  function next() {
    if (step === 0 && !role) { toast({ title: 'Pick a role to continue', variant: 'destructive' }); return; }
    if (step === 1 && interests.size === 0) { toast({ title: 'Pick at least one interest', variant: 'destructive' }); return; }
    if (step < steps.length - 1) setStep(step + 1);
    else {
      toast({ title: 'Welcome to MTVerse!', description: 'Your workspace is ready.' });
      setSection('dashboard');
    }
  }

  function toggleInterest(id: string) {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Stepper */}
        <div className="mb-8 flex items-center justify-between">
          {steps.map((label, idx) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  'inline-flex size-9 items-center justify-center rounded-full text-sm font-medium transition',
                  idx < step && 'bg-[var(--color-success-500)] text-white',
                  idx === step && 'bg-[var(--color-brand-500)] text-white shadow-md shadow-[var(--color-brand-500)]/25',
                  idx > step && 'bg-[var(--surface-sunken)] text-[var(--text-subtle)]',
                )}>
                  {idx < step ? <Check className="size-4" strokeWidth={3} /> : idx + 1}
                </div>
                <span className={cn('text-xs font-medium', idx === step ? 'text-[var(--text-strong)]' : 'text-[var(--text-muted)]')}>{label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={cn('mx-2 h-0.5 flex-1 rounded-full transition', idx < step ? 'bg-[var(--color-success-500)]' : 'bg-[var(--border)]')} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step content */}
        {step === 0 && (
          <div>
            <AuthFormHeading
              icon={Sparkles}
              title={`Welcome, ${name}!`}
              subtitle="Tell us how you'll use MTVerse so we can personalize your experience."
            />
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'designer', label: 'Designer', desc: 'UI/UX, design systems', icon: Sparkles },
                { id: 'developer', label: 'Developer', desc: 'Code, build, ship', icon: Hash },
                { id: 'pm', label: 'Product Manager', desc: 'Plan, track, deliver', icon: CheckCircle2 },
                { id: 'founder', label: 'Founder', desc: 'Build from zero', icon: Zap },
              ].map((r) => {
                const Icon = r.icon;
                const active = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={cn(
                      'flex cursor-pointer flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition',
                      active ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]' : 'border-[var(--border)] hover:border-[var(--color-brand-300)] hover:bg-[var(--surface-sunken)]',
                    )}
                  >
                    <span className={cn('inline-flex size-10 items-center justify-center rounded-xl', active ? 'bg-[var(--color-brand-500)] text-white' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)]')}>
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-strong)]">{r.label}</p>
                      <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <AuthFormHeading
              icon={Zap}
              title="What are you interested in?"
              subtitle="Pick the areas you'd like to explore. You can change these later."
            />
            <div className="flex flex-wrap gap-2">
              {['Dashboards', 'E-commerce', 'AI Generators', 'Forms', 'Charts', 'Tables', 'Authentication', 'Settings', 'Pricing', 'Error Pages', 'Components', 'Advanced UI'].map((i) => {
                const active = interests.has(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleInterest(i)}
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
                      active
                        ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white'
                        : 'border-[var(--border)] bg-[var(--card)] text-[var(--text-body)] hover:border-[var(--color-brand-300)] hover:bg-[var(--surface-sunken)]',
                    )}
                  >
                    {active && <Check className="size-3" strokeWidth={3} />}
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="mb-6 inline-flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white shadow-xl shadow-[var(--color-brand-500)]/30">
              <Sparkles className="size-10" strokeWidth={1.8} />
            </div>
            <h1 className="text-2xl font-semibold text-[var(--text-strong)]">You&apos;re all set, {name}!</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm font-normal text-[var(--text-muted)]">
              Your workspace is configured based on your preferences. You can update them anytime from Settings.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-left">
              {[
                { label: 'Role', value: role === 'designer' ? 'Designer' : role === 'developer' ? 'Developer' : role === 'pm' ? 'Product Manager' : 'Founder' },
                { label: 'Interests', value: `${interests.size} selected` },
                { label: 'Plan', value: 'Free trial' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">{s.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-[var(--text-strong)]">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-medium text-[var(--text-body)] transition hover:bg-[var(--surface-sunken)]">
              <ArrowLeft className="size-4" /> Back
            </button>
          ) : (
            <button type="button" onClick={() => { toast({ title: 'Skipped for now' }); setSection('dashboard'); }} className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
              Skip for now
            </button>
          )}
          <AuthButton onClick={next} fullWidth={false} icon={step === steps.length - 1 ? Sparkles : ArrowRight}>
            {step === steps.length - 1 ? 'Enter MTVerse' : 'Continue'}
          </AuthButton>
        </div>
      </div>
    </AuthLayout>
  );
}

/* ========================================================================
   9. ACTIVE SESSIONS / SECURITY SETTINGS
   ======================================================================== */
export function SessionsPage() {
  const { toast } = useToast();
  const [sessions, setSessions] = React.useState([
    { id: 's1', device: 'MacBook Pro 16"', browser: 'Chrome 124', location: 'Chennai, IN', ip: '103.21.42.18', current: true, lastActive: 'Active now', icon: Monitor },
    { id: 's2', device: 'iPhone 15 Pro', browser: 'Safari 17', location: 'Chennai, IN', ip: '103.21.42.19', current: false, lastActive: '2 hours ago', icon: Smartphone },
    { id: 's3', device: 'iPad Air', browser: 'Safari 17', location: 'Bengaluru, IN', ip: '49.207.51.10', current: false, lastActive: 'Yesterday at 4:12 PM', icon: Tablet },
    { id: 's4', device: 'Windows PC', browser: 'Edge 124', location: 'Mumbai, IN', ip: '14.139.34.5', current: false, lastActive: '3 days ago', icon: Monitor },
  ]);

  function revoke(id: string) {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast({ title: 'Session revoked', description: 'The device has been signed out.' });
  }

  function revokeAll() {
    setSessions((prev) => prev.filter((s) => s.current));
    toast({ title: 'All other sessions revoked' });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-strong)]">Active sessions & security</h1>
        <p className="mt-1.5 text-sm font-normal text-[var(--text-muted)]">Manage devices currently signed in to your MTVerse account and review your security settings.</p>
      </div>

      {/* Sessions list */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-[var(--text-strong)]">Active sessions</h2>
            <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">{sessions.length} device{sessions.length === 1 ? '' : 's'} signed in</p>
          </div>
          {sessions.filter((s) => !s.current).length > 0 && (
            <button type="button" onClick={revokeAll} className="ds-btn ds-btn-secondary !h-8 !text-xs">
              <LogOut className="size-3.5" /> Revoke all others
            </button>
          )}
        </div>

        <ul className="space-y-2">
          {sessions.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.id} className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--card)] text-[var(--text-muted)] ring-1 ring-[var(--border-subtle)]">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-[var(--text-strong)]">{s.device}</p>
                    {s.current && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-success-50)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]">
                        <span className="size-1.5 rounded-full bg-[var(--color-success-500)]" /> This device
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs font-normal text-[var(--text-muted)]">
                    <span className="inline-flex items-center gap-1"><Chrome className="size-3" /> {s.browser}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {s.location}</span>
                    <span className="inline-flex items-center gap-1"><Globe className="size-3" /> {s.ip}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {s.lastActive}</span>
                  </div>
                </div>
                {!s.current && (
                  <button
                    type="button"
                    onClick={() => revoke(s.id)}
                    className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--color-error-50)] hover:text-[var(--color-error-600)] dark:hover:bg-[rgba(240,68,56,0.16)]"
                    aria-label="Revoke session"
                    title="Revoke session"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Security settings */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-[var(--text-strong)]">Security settings</h2>
        <SecurityToggle
          icon={ShieldCheck}
          title="Two-factor authentication"
          description="Require a verification code in addition to your password."
          status="Enabled"
          tone="success"
          action={{ label: 'Manage', onClick: () => toast({ title: 'Opening 2FA settings…' }) }}
        />
        <SecurityToggle
          icon={Mail}
          title="Login alerts"
          description="Get an email when someone signs in from a new device."
          status="On"
          tone="success"
        />
        <SecurityToggle
          icon={Lock}
          title="Password"
          description="Last changed 3 months ago. We recommend changing every 90 days."
          status="3 months ago"
          tone="warning"
          action={{ label: 'Change', onClick: () => toast({ title: 'Opening password change…' }) }}
        />
        <SecurityToggle
          icon={KeyRound}
          title="Recovery email"
          description="Used to recover your account if you lose access."
          status="arun.backup@gmail.com"
          tone="info"
          action={{ label: 'Update', onClick: () => toast({ title: 'Opening recovery email…' }) }}
        />
      </section>

      {/* Danger zone */}
      <section className="rounded-2xl border border-[var(--color-error-100)] bg-[var(--color-error-50)] p-5 dark:border-[rgba(240,68,56,0.18)] dark:bg-[rgba(240,68,56,0.06)]">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[var(--color-error-600)] dark:text-[var(--color-error-500)]" />
          <div className="flex-1">
            <h2 className="text-sm font-medium text-[var(--color-error-700)] dark:text-[var(--color-error-500)]">Sign out everywhere</h2>
            <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">Sign out of all sessions including this one. You&apos;ll need to sign in again on every device.</p>
            <button className="ds-btn ds-btn-secondary mt-3 !h-8 !text-xs !border-[var(--color-error-200)] !text-[var(--color-error-600)] dark:!border-[rgba(240,68,56,0.24)] dark:!text-[var(--color-error-500)]">
              <LogOut className="size-3.5" /> Sign out everywhere
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface SecurityToggleProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  status: string;
  tone: 'success' | 'warning' | 'info' | 'neutral';
  action?: { label: string; onClick: () => void };
}

function SecurityToggle({ icon: Icon, title, description, status, tone, action }: SecurityToggleProps) {
  const toneClasses = {
    success: 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]',
    warning: 'bg-[var(--color-warning-50)] text-[var(--color-warning-600)] dark:bg-[rgba(247,144,9,0.16)] dark:text-[var(--color-warning-500)]',
    info: 'bg-[var(--color-info-50)] text-[var(--color-info-600)] dark:bg-[rgba(11,165,236,0.16)] dark:text-[var(--color-info-500)]',
    neutral: 'bg-[var(--surface-sunken)] text-[var(--text-muted)]',
  }[tone];

  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--card)] p-3.5">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-sunken)] text-[var(--text-muted)]">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-[var(--text-strong)]">{title}</p>
          <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', toneClasses)}>{status}</span>
        </div>
        <p className="mt-0.5 text-xs font-normal text-[var(--text-muted)]">{description}</p>
      </div>
      {action && (
        <button type="button" onClick={action.onClick} className="shrink-0 cursor-pointer text-xs font-medium text-[var(--color-brand-600)] transition hover:underline dark:text-[var(--color-brand-300)]">
          {action.label}
        </button>
      )}
    </div>
  );
}
