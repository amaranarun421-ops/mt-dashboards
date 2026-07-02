"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export function UiFormsPage() {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Form Elements"]} title="Form Elements" description="Inputs, selects, switches, and validation states." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Text Inputs</h3><div className="space-y-4">
          <div><Label>Default Input</Label><Input placeholder="Enter your name" className="mt-1.5" /></div>
          <div><Label>With Icon</Label><div className="relative mt-1.5"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" /><Input placeholder="email@example.com" className="pl-9" /></div></div>
          <div><Label>Password</Label><div className="relative mt-1.5"><Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" /><Input type={show ? "text" : "password"} defaultValue="secret123" className="pl-9 pr-9" /><button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
          <div><Label>Disabled</Label><Input disabled defaultValue="Cannot edit" className="mt-1.5" /></div>
          <div><Label>Error State</Label><Input defaultValue="invalid@" className="mt-1.5 border-error-500 focus-visible:ring-destructive" /><p className="mt-1 text-xs text-error-600 dark:text-error-500">Please enter a valid email address</p></div>
          <div><Label>Success State</Label><Input defaultValue="alex@example.com" className="mt-1.5 border-success-500 focus-visible:ring-success" /><p className="mt-1 text-xs text-success-600 dark:text-success-500">Email available</p></div>
        </div></Card>
        <Card className="p-6"><h3 className="mb-4 text-base font-semibold">Selection & Toggles</h3><div className="space-y-4">
          <div><Label>Select Dropdown</Label><Select defaultValue="opt1"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="opt1">Option One</SelectItem><SelectItem value="opt2">Option Two</SelectItem><SelectItem value="opt3">Option Three</SelectItem></SelectContent></Select></div>
          <div><Label>Textarea</Label><Textarea placeholder="Write a message..." className="mt-1.5" rows={3} /></div>
          <div><Label>Checkboxes</Label><div className="mt-2 space-y-2"><div className="flex items-center gap-2"><Checkbox id="c1" defaultChecked /><Label htmlFor="c1" className="font-normal">Accept terms and conditions</Label></div><div className="flex items-center gap-2"><Checkbox id="c2" /><Label htmlFor="c2" className="font-normal">Subscribe to newsletter</Label></div></div></div>
          <div><Label>Radio Group</Label><RadioGroup defaultValue="r1" className="mt-2"><div className="flex items-center gap-2"><RadioGroupItem value="r1" id="r1" /><Label htmlFor="r1" className="font-normal">Free plan</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="r2" id="r2" /><Label htmlFor="r2" className="font-normal">Pro plan ($29/mo)</Label></div></RadioGroup></div>
          <div className="flex items-center justify-between"><div><Label>Enable notifications</Label><p className="text-xs text-gray-500 dark:text-gray-400">Get alerts about activity</p></div><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><div><Label>Dark mode</Label><p className="text-xs text-gray-500 dark:text-gray-400">Switch theme appearance</p></div><Switch /></div>
        </div></Card>
      </div>
    </div>
  );
}
