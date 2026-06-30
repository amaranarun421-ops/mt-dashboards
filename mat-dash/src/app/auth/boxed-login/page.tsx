"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const BoxedLogin = () => (
  <div className="min-h-screen flex items-center justify-center bg-lightprimary p-6">
      <BackToDashboard />
    <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-md">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3"><FullLogo /></div>
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="opacity-70 text-sm mt-1">Welcome back! Please enter your details.</p>
      </div>
      <form className="space-y-4">
        <div><Label>Email</Label><Input type="email" placeholder="you@example.com" className="mt-2" /></div>
        <div><Label>Password</Label><Input type="password" placeholder="••••••" className="mt-2" /></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><Checkbox id="r" /><Label htmlFor="r" className="font-normal text-sm">Remember me</Label></div>
          <Link href="/auth/boxed-forgot" className="text-sm text-primary hover:underline">Forgot password?</Link>
        </div>
        <Button className="w-full" asChild><Link href="/">Sign In</Link></Button>
      </form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-defaultBorder" /></div>
        <div className="relative flex justify-center"><span className="bg-background px-3 text-xs opacity-60">OR</span></div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {["solar:google-logo-bold","solar:apple-logo-bold","solar:facebook-logo-bold"].map((i) => (
          <button key={i} className="h-11 rounded-lg border border-defaultBorder hover:bg-lightprimary flex items-center justify-center"><Icon icon={i} width={20} /></button>
        ))}
      </div>

      <p className="text-center text-sm mt-6">Don't have an account? <Link href="/auth/boxed-register" className="text-primary font-medium hover:underline">Sign up</Link></p>
    </div>
  </div>
);

export default BoxedLogin;
