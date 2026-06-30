"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Input, Label, Checkbox } from "@/components/ui";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export default function BoxedRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  };

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden rounded-3xl p-4 gradient-bg">
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-accent-300/20 blur-3xl" />

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-theme-lg">
            <Image src="/brand/logo-icon.svg" alt="Nimbus Pro" width={32} height={32} />
          </div>
          <span className="mt-3 text-lg font-bold tracking-tight text-white drop-shadow">
            Nimbus<span className="text-white/80"> Pro</span>
          </span>
        </div>

        {/* Card */}
        <div className="animate-slide-up rounded-2xl border border-white/20 bg-white/95 p-6 shadow-theme-2xl backdrop-blur-xl dark:bg-gray-950/90 sm:p-7">
          <div className="mb-5 text-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              14-day free trial · No credit card required
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-3.5">
            <div>
              <Label htmlFor="boxed-reg-name" required>Full name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="boxed-reg-name"
                  type="text"
                  required
                  placeholder="Aaroh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="boxed-reg-email" required>Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="boxed-reg-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="boxed-reg-password" required>Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="boxed-reg-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Checkbox
              checked={agree}
              onChange={setAgree}
              label={
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{" "}
                  <a href="#" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">Terms</a>
                  {" "}and{" "}
                  <a href="#" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">Privacy Policy</a>
                </span>
              }
            />

            <Button type="submit" size="lg" className="w-full" disabled={loading || !agree}>
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating account…
                </>
              ) : (
                <>
                  Sign Up <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">or</span>
            <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="w-full">
              <GoogleMark /> Google
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <GithubMark /> GitHub
            </Button>
          </div>
        </div>

        {/* Footer link */}
        <p className="mt-5 text-center text-sm text-white/90 drop-shadow">
          Already have an account?{" "}
          <Link href="/auth/boxed-login" className="font-semibold text-white underline-offset-2 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
