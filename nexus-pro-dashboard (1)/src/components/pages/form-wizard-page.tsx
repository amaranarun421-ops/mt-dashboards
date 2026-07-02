"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, User, Building, CreditCard, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const steps = [
  { id: 0, title: "Account", icon: User, desc: "Set up your login" },
  { id: 1, title: "Company", icon: Building, desc: "Tell us about your business" },
  { id: 2, title: "Billing", icon: CreditCard, desc: "Payment details" },
  { id: 3, title: "Done", icon: CheckCircle2, desc: "Confirmation" },
];

export function FormWizard() {
  const [step, setStep] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const next = () => step < 2 ? setStep(step + 1) : setDone(true);
  const prev = () => step > 0 && setStep(step - 1);

  return (
    <div>
      <PageHeader breadcrumb={["Forms", "Multi-Step Wizard"]} title="Multi-Step Wizard" description="Guide users through complex forms with progressive steps." />
      <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step && !done;
            const isDone = i < step || done;
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full transition ${isDone ? "bg-success-500 text-white" : isActive ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-800"}`}>
                    {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${isActive ? "text-brand-500" : isDone ? "text-success-600" : "text-gray-400"}`}>{s.title}</span>
                </div>
                {i < steps.length - 1 && <div className={`h-0.5 flex-1 mx-2 transition ${i < step || done ? "bg-success-500" : "bg-gray-200 dark:bg-gray-800"}`} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="min-h-[280px]">
              {step === 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div><Label>Full Name</Label><Input placeholder="John Doe" className="mt-1.5" /></div>
                  <div><Label>Email</Label><Input type="email" placeholder="john@example.com" className="mt-1.5" /></div>
                  <div><Label>Password</Label><Input type="password" placeholder="Min 8 characters" className="mt-1.5" /></div>
                  <div><Label>Confirm Password</Label><Input type="password" placeholder="Re-enter" className="mt-1.5" /></div>
                </div>
              )}
              {step === 1 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label>Company Name</Label><Input placeholder="Acme Corporation" className="mt-1.5" /></div>
                  <div><Label>Industry</Label><Input placeholder="Technology" className="mt-1.5" /></div>
                  <div><Label>Company Size</Label><Input placeholder="50-200" className="mt-1.5" /></div>
                  <div className="sm:col-span-2"><Label>Website</Label><Input placeholder="https://example.com" className="mt-1.5" /></div>
                  <div className="sm:col-span-2"><Label>Address</Label><Input placeholder="123 Main St, San Francisco, CA" className="mt-1.5" /></div>
                </div>
              )}
              {step === 2 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label>Card Number</Label><Input placeholder="4242 4242 4242 4242" className="mt-1.5" /></div>
                  <div><Label>Expiry Date</Label><Input placeholder="MM/YY" className="mt-1.5" /></div>
                  <div><Label>CVC</Label><Input placeholder="123" className="mt-1.5" /></div>
                  <div className="sm:col-span-2"><Label>Name on Card</Label><Input placeholder="John Doe" className="mt-1.5" /></div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="done" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600 dark:bg-success-500/15 mb-4"><CheckCircle2 className="h-8 w-8" /></div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">Setup Complete!</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your account is ready. Welcome aboard!</p>
              <Button className="mt-6" onClick={()=>{setDone(false); setStep(0);}}>Start Over</Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        {!done && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <Button variant="outline" onClick={prev} disabled={step === 0} className="gap-1.5"><ChevronLeft className="h-4 w-4" /> Back</Button>
            <Button onClick={next} className="gap-1.5">{step === 2 ? "Submit" : "Continue"} <ChevronRight className="h-4 w-4" /></Button>
          </div>
        )}
      </Card>
    </div>
  );
}
