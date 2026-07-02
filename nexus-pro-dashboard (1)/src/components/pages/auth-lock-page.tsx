"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, LogIn } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function AuthLock() {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-white text-2xl font-bold">AK</div>
              <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700"><Lock className="h-4 w-4 text-gray-500" /></div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Alex Kim</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">alex@nexuspro.app</p>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Your session is locked. Enter your password to continue.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Welcome back!"); setTimeout(() => router.push("/dashboard/ecommerce"), 1000); }} className="space-y-4">
            <div>
              <Label>Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-9 h-11" required />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
              </div>
            </div>
            <Button type="submit" className="w-full h-11 gap-1.5"><LogIn className="h-4 w-4" /> Unlock</Button>
          </form>
          <div className="mt-6 text-center"><Link href="/auth/sign-in" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><ArrowLeft className="h-3.5 w-3.5" /> Sign in as different user</Link></div>
        </div>
      </motion.div>
    </div>
  );
}
