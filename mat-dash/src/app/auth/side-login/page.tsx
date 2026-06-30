"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const SideLogin = () => (
  <div className="min-h-screen grid lg:grid-cols-2">
      <BackToDashboard />
    {/* Brand side */}
    <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/backgrounds/profilebg.jpg')", backgroundSize: "cover" }} />
      <div className="relative">
        <FullLogo variant="light" />
      </div>
      <div className="relative">
        <h2 className="text-4xl font-bold leading-tight">Welcome back to mtverse</h2>
        <p className="opacity-90 mt-3 text-lg">Sign in to your account and continue where you left off.</p>
        <div className="mt-8 flex gap-6">
          {[{v:"10k+",l:"Users"},{v:"4.9★",l:"Rating"},{v:"50+",l:"Pages"}].map((s) => (
            <div key={s.l}><p className="text-2xl font-bold">{s.v}</p><p className="text-sm opacity-80">{s.l}</p></div>
          ))}
        </div>
      </div>
      <p className="relative text-sm opacity-80">© 2024 mtverse. All rights reserved.</p>
    </div>

    {/* Form side */}
    <div className="flex items-center justify-center p-6 lg:p-12">
      <div className="w-full max-w-sm">
        <div className="lg:hidden mb-6 flex justify-center"><FullLogo /></div>
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="opacity-70 text-sm mt-1">Welcome back! Please enter your details.</p>

        <form className="mt-6 space-y-4">
          <div><Label>Email</Label><Input type="email" placeholder="you@example.com" className="mt-2" /></div>
          <div><Label>Password</Label><Input type="password" placeholder="••••••" className="mt-2" /></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Checkbox id="r" /><Label htmlFor="r" className="font-normal text-sm">Remember me</Label></div>
            <Link href="/auth/side-forgot" className="text-sm text-primary hover:underline">Forgot password?</Link>
          </div>
          <Button className="w-full" asChild><Link href="/">Sign In</Link></Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-defaultBorder" /></div>
          <div className="relative flex justify-center"><span className="bg-background px-3 text-xs opacity-60">OR CONTINUE WITH</span></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["solar:google-logo-bold","solar:apple-logo-bold","solar:facebook-logo-bold"].map((i) => (
            <button key={i} className="h-11 rounded-lg border border-defaultBorder hover:bg-lightprimary flex items-center justify-center"><Icon icon={i} width={20} /></button>
          ))}
        </div>

        <p className="text-center text-sm mt-6">Don't have an account? <Link href="/auth/side-register" className="text-primary font-medium hover:underline">Sign up</Link></p>
      </div>
    </div>
  </div>
);

export default SideLogin;
