"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const BoxedTwoSteps = () => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const setDigit = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    setCode(c => c.map((d, idx) => idx === i ? v : d));
    if (v && i < 5) document.getElementById(`otp-box-${i + 1}`)?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lightprimary p-6">
      <BackToDashboard />
      <div className="w-full max-w-md rounded-2xl bg-background border border-defaultBorder p-8 shadow-lg">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3"><FullLogo /></div>
          <h1 className="text-2xl font-bold">Two-Step Verification</h1>
          <p className="opacity-70 text-sm mt-1">Enter the 6-digit code sent to your email.</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? "bg-primary text-white" : "bg-lightgray dark:bg-dark"}`}>{step > 1 ? <Icon icon="solar:check-bold" width={18} /> : "1"}</div>
          <div className={`flex-1 h-0.5 ${step > 1 ? "bg-primary" : "bg-defaultBorder"}`} />
          <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? "bg-primary text-white" : "bg-lightgray dark:bg-dark"}`}>2</div>
        </div>

        {step === 1 ? (
          <>
            <div className="flex gap-2 justify-between mb-4">
              {code.map((d, i) => (
                <Input key={i} id={`otp-box-${i}`} type="text" inputMode="numeric" maxLength={1} value={d} onChange={(e) => setDigit(i, e.target.value)} className="w-11 h-12 text-center text-lg font-bold" />
              ))}
            </div>
            <Button className="w-full" onClick={() => setStep(2)} disabled={code.some(c => !c)}>Verify</Button>
            <p className="text-center text-sm mt-4"><button className="text-primary font-medium hover:underline">Resend code</button></p>
          </>
        ) : (
          <div className="text-center">
            <div className="h-14 w-14 rounded-full bg-lightsuccess text-success mx-auto flex items-center justify-center mb-3"><Icon icon="solar:check-circle-bold-duotone" width={28} /></div>
            <h3 className="font-semibold">Successfully Verified!</h3>
            <p className="text-sm opacity-70 mt-1 mb-4">Your account is now secured.</p>
            <Button className="w-full" asChild><Link href="/auth/boxed-login">Continue to Login</Link></Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxedTwoSteps;
