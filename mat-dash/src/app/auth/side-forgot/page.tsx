"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const SideForgot = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <BackToDashboard />
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/backgrounds/profilebg.jpg')", backgroundSize: "cover" }} />
        <div className="relative"><FullLogo variant="light" /></div>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">Forgot your password?</h2>
          <p className="opacity-90 mt-3 text-lg">No worries — we'll email you a secure link to reset it.</p>
        </div>
        <p className="relative text-sm opacity-80">© 2024 mtverse. All rights reserved.</p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-6 flex justify-center"><FullLogo /></div>
          {sent ? (
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-lightsuccess text-success mx-auto flex items-center justify-center mb-4">
                <Icon icon="solar:letter-unread-bold-duotone" width={32} />
              </div>
              <h1 className="text-2xl font-bold">Check your email</h1>
              <p className="opacity-70 text-sm mt-2">We've sent a password reset link to your email address. The link expires in 30 minutes.</p>
              <Button variant="outline" className="mt-6 w-full" onClick={() => setSent(false)}>Resend email</Button>
              <p className="text-center text-sm mt-4"><Link href="/auth/side-login" className="text-primary font-medium hover:underline">← Back to sign in</Link></p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="opacity-70 text-sm mt-1">Enter your email and we'll send you a reset link.</p>
              <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" className="mt-2" required />
                </div>
                <Button type="submit" className="w-full gap-2"><Icon icon="solar:letter-bold" width={16} /> Send Reset Link</Button>
              </form>
              <p className="text-center text-sm mt-6"><Link href="/auth/side-login" className="text-primary font-medium hover:underline">← Back to sign in</Link></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideForgot;
