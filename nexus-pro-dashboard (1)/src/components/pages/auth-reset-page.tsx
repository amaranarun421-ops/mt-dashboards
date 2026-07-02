"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, Eye, EyeOff, Lock, Check, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AuthReset() {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const rules = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains uppercase", valid: /[A-Z]/.test(password) },
    { label: "Contains number", valid: /\d/.test(password) },
    { label: "Contains special char", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/15"><KeyRound className="h-7 w-7" /></div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Set New Password</h2>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">Enter your new password below</p>
          </div>
          <form className="space-y-4" onSubmit={e=>{e.preventDefault(); if(password!==confirm){toast.error("Passwords don't match");return;} toast.success("Password reset successfully!"); setTimeout(()=>router.push("/auth/sign-in"),1000);}}>
            <div>
              <Label>New Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-9 h-11" required />
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{show?<EyeOff className="h-4 w-4" />:<Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <div>
              <Label>Confirm Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type={show?"text":"password"} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••" className="pl-9 h-11" required />
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 dark:bg-white/[0.03] p-3 space-y-1.5">
              {rules.map(r => (
                <div key={r.label} className="flex items-center gap-2 text-xs">
                  <div className={`flex h-4 w-4 items-center justify-center rounded-full ${r.valid?"bg-success-500 text-white":"bg-gray-200 dark:bg-gray-700"}`}>{r.valid && <Check className="h-2.5 w-2.5" />}</div>
                  <span className={r.valid?"text-success-600 dark:text-success-500":"text-gray-500 dark:text-gray-400"}>{r.label}</span>
                </div>
              ))}
            </div>
            <Button type="submit" className="w-full h-11 gap-1.5" disabled={password!==confirm || password.length<8}><Check className="h-4 w-4" /> Reset Password</Button>
          </form>
          <div className="mt-6 text-center"><Link href="/auth/sign-in" className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:underline"><ArrowLeft className="h-3.5 w-3.5" /> Back to sign in</Link></div>
        </div>
      </motion.div>
    </div>
  );
}
