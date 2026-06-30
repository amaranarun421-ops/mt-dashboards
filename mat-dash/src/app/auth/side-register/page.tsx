"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const SideRegister = () => (
  <div className="min-h-screen grid lg:grid-cols-2">
      <BackToDashboard />
    <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/backgrounds/profilebg.jpg')", backgroundSize: "cover" }} />
      <div className="relative"><FullLogo variant="light" /></div>
      <div className="relative">
        <h2 className="text-4xl font-bold leading-tight">Start your journey with mtverse</h2>
        <p className="opacity-90 mt-3 text-lg">Join 10,000+ developers building beautiful admin interfaces faster.</p>
        <ul className="mt-6 space-y-2">
          {["14-day free trial — no card required","Cancel anytime","Full access to all features"].map((f) => (
            <li key={f} className="flex items-center gap-2"><Icon icon="solar:check-circle-bold" width={18} /> {f}</li>
          ))}
        </ul>
      </div>
      <p className="relative text-sm opacity-80">© 2024 mtverse. All rights reserved.</p>
    </div>

    <div className="flex items-center justify-center p-6 lg:p-12">
      <div className="w-full max-w-sm">
        <div className="lg:hidden mb-6 flex justify-center"><FullLogo /></div>
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="opacity-70 text-sm mt-1">Get started with a free 14-day trial.</p>

        <form className="mt-6 space-y-4">
          <div><Label>Full Name</Label><Input placeholder="John Doe" className="mt-2" /></div>
          <div><Label>Email</Label><Input type="email" placeholder="you@example.com" className="mt-2" /></div>
          <div><Label>Password</Label><Input type="password" placeholder="Min 8 characters" className="mt-2" /></div>
          <div className="flex items-start gap-2">
            <Checkbox id="terms" className="mt-1" />
            <Label htmlFor="terms" className="font-normal text-xs">I agree to the <Link href="#" className="text-primary">Terms of Service</Link> and <Link href="#" className="text-primary">Privacy Policy</Link></Label>
          </div>
          <Button className="w-full" asChild><Link href="/">Create Account</Link></Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-defaultBorder" /></div>
          <div className="relative flex justify-center"><span className="bg-background px-3 text-xs opacity-60">OR SIGN UP WITH</span></div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["solar:google-logo-bold","solar:apple-logo-bold","solar:facebook-logo-bold"].map((i) => (
            <button key={i} className="h-11 rounded-lg border border-defaultBorder hover:bg-lightprimary flex items-center justify-center"><Icon icon={i} width={20} /></button>
          ))}
        </div>

        <p className="text-center text-sm mt-6">Already have an account? <Link href="/auth/side-login" className="text-primary font-medium hover:underline">Sign in</Link></p>
      </div>
    </div>
  </div>
);

export default SideRegister;
