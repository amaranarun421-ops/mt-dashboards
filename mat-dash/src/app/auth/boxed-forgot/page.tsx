"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const BoxedForgot = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightprimary p-6">
      <BackToDashboard />
      <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3"><FullLogo /></div>
          {sent ? (
            <>
              <div className="h-16 w-16 rounded-full bg-lightsuccess text-success mx-auto flex items-center justify-center mb-3">
                <Icon icon="solar:letter-unread-bold-duotone" width={32} />
              </div>
              <h1 className="text-2xl font-bold">Check your email</h1>
              <p className="opacity-70 text-sm mt-2">We've sent a reset link to your email.</p>
              <Button variant="outline" className="mt-5 w-full" onClick={() => setSent(false)}>Resend email</Button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="opacity-70 text-sm mt-1">Enter your email and we'll send a reset link.</p>
            </>
          )}
        </div>
        {!sent && (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div><Label>Email</Label><Input type="email" placeholder="you@example.com" className="mt-2" required /></div>
            <Button type="submit" className="w-full gap-2"><Icon icon="solar:letter-bold" width={16} /> Send Reset Link</Button>
          </form>
        )}
        <p className="text-center text-sm mt-6"><Link href="/auth/boxed-login" className="text-primary font-medium hover:underline">← Back to sign in</Link></p>
      </div>
    </div>
  );
};

export default BoxedForgot;
