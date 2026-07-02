"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Smartphone, ArrowLeft, Shield } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AuthTwofa() {
  const router = useRouter();
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);

  const handleChange = (i: number, v: string) => {
    if (v.length > 1) return;
    setCode((prev) => prev.map((c, idx) => (idx === i ? v : c)));
    if (v && i < 5) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 dark:bg-brand-500/15"><Smartphone className="h-7 w-7" /></div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Two-Factor Authentication</h2>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">Enter the 6-digit code from your authenticator app</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (code.join("").length === 6) { toast.success("Verified! Signing you in..."); setTimeout(() => router.push("/dashboard/ecommerce"), 1000); } else toast.error("Please enter all 6 digits"); }} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((c, i) => (
                <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={c} onChange={(e) => handleChange(i, e.target.value)}
                  className="h-14 w-12 rounded-lg border border-gray-200 bg-white text-center text-xl font-bold text-gray-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white" />
              ))}
            </div>
            <Button type="submit" className="w-full h-11 gap-1.5"><Shield className="h-4 w-4" /> Verify & Sign In</Button>
          </form>
          <div className="mt-6 flex flex-col items-center gap-3">
            <button onClick={() => toast.info("Code sent via SMS!")} className="text-sm font-medium text-brand-500 hover:underline">Send code via SMS instead</button>
            <Link href="/auth/sign-in" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><ArrowLeft className="h-3.5 w-3.5" /> Back to sign in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
