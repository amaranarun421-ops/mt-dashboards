"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import FullLogo from "@/app/(DashboardLayout)/layout/shared/logo/FullLogo";
import BackToDashboard from "@/app/components/auth/BackToDashboard";

const SideTwoSteps = () => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const setDigit = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    setCode(c => c.map((d, idx) => idx === i ? v : d));
    if (v && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <BackToDashboard />
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-white relative overflow-hidden">
        <div className="relative"><Link href="/"><FullLogo variant="light" /></Link></div>
        <div className="relative">
          <h2 className="text-4xl font-bold">Two-Step Verification</h2>
          <p className="opacity-90 mt-3 text-lg">We sent a 6-digit code to your email. Enter it below to continue.</p>
        </div>
        <p className="relative text-sm opacity-80">© 2024 mtverse. All rights reserved.</p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-6 flex justify-center"><FullLogo /></div>

          <div className="flex items-center gap-3 mb-6">
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? "bg-primary text-white" : "bg-lightgray dark:bg-dark text-muted-foreground"}`}>
              {step > 1 ? <Icon icon="solar:check-bold" width={18} /> : "1"}
            </div>
            <div className={`flex-1 h-0.5 ${step > 1 ? "bg-primary" : "bg-defaultBorder"}`} />
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? "bg-primary text-white" : "bg-lightgray dark:bg-dark text-muted-foreground"}`}>2</div>
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold">Enter Verification Code</h1>
              <p className="opacity-70 text-sm mt-1">Check your email for the 6-digit code.</p>
              <div className="mt-6 flex gap-2 justify-between">
                {code.map((d, i) => (
                  <Input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    className="w-12 h-14 text-center text-xl font-bold"
                  />
                ))}
              </div>
              <Button className="w-full mt-6" onClick={() => setStep(2)} disabled={code.some(c => !c)}>Verify Code</Button>
              <p className="text-center text-sm mt-4">Didn't get the code? <button className="text-primary font-medium hover:underline">Resend</button></p>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="h-16 w-16 rounded-full bg-lightsuccess text-success mx-auto flex items-center justify-center mb-3">
                  <Icon icon="solar:check-circle-bold-duotone" width={32} />
                </div>
                <h1 className="text-2xl font-bold">Verified!</h1>
                <p className="opacity-70 text-sm mt-1">Set a new password to complete.</p>
              </div>
              <div className="space-y-4">
                <div><Label>New Password</Label><Input type="password" className="mt-2" placeholder="••••••" /></div>
                <div><Label>Confirm Password</Label><Input type="password" className="mt-2" placeholder="••••••" /></div>
                <Button className="w-full" asChild><Link href="/auth/side-login">Complete Setup</Link></Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideTwoSteps;
