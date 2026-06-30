"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const BoxedRegister = () => (
  <div className="min-h-screen flex items-center justify-center bg-lightprimary p-6">
      <BackToDashboard />
    <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-md">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3"><FullLogo /></div>
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="opacity-70 text-sm mt-1">Get started with a free 14-day trial.</p>
      </div>
      <form className="space-y-4">
        <div><Label>Full Name</Label><Input placeholder="John Doe" className="mt-2" /></div>
        <div><Label>Email</Label><Input type="email" placeholder="you@example.com" className="mt-2" /></div>
        <div><Label>Password</Label><Input type="password" placeholder="Min 8 characters" className="mt-2" /></div>
        <div className="flex items-start gap-2">
          <Checkbox id="terms" className="mt-1" />
          <Label htmlFor="terms" className="font-normal text-xs">I agree to the <Link href="#" className="text-primary">Terms</Link> and <Link href="#" className="text-primary">Privacy Policy</Link></Label>
        </div>
        <Button className="w-full" asChild><Link href="/">Create Account</Link></Button>
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
      <p className="text-center text-sm mt-6">Already have an account? <Link href="/auth/boxed-login" className="text-primary font-medium hover:underline">Sign in</Link></p>
    </div>
  </div>
);

export default BoxedRegister;
