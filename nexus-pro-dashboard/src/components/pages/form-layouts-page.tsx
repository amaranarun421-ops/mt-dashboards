import * as React from "react";
import { User, Mail, Lock, Building, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function FormLayouts() {
  return (
    <div>
      <PageHeader breadcrumb={["Forms", "Layouts"]} title="Form Layouts" description="Different arrangement patterns for forms." />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Horizontal Form</h3>
          <div className="space-y-4">
            {[
              { label: "First Name", icon: User, placeholder: "John", type: "text" },
              { label: "Email", icon: Mail, placeholder: "john@example.com", type: "email" },
              { label: "Phone", icon: Phone, placeholder: "+1 (555) 012-3456", type: "tel" },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-4">
                <Label className="w-28 text-right text-sm">{f.label}</Label>
                <div className="relative flex-1"><f.icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input type={f.type} placeholder={f.placeholder} className="pl-9" /></div>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <Label className="w-28 text-right text-sm">Notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-end"><Button>Save Changes</Button></div>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Vertical Form</h3>
          <div className="space-y-4">
            <div><Label>Full Name</Label><div className="relative mt-1.5"><User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="John Doe" className="pl-9" /></div></div>
            <div><Label>Email</Label><div className="relative mt-1.5"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input type="email" placeholder="john@example.com" className="pl-9" /></div></div>
            <div><Label>Password</Label><div className="relative mt-1.5"><Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input type="password" placeholder="Min 8 characters" className="pl-9" /></div></div>
            <Button className="w-full">Create Account</Button>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 xl:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Two-Column Form</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><Label>Company Name</Label><div className="relative mt-1.5"><Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="Acme Corp" className="pl-9" /></div></div>
            <div><Label>Contact Email</Label><div className="relative mt-1.5"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input type="email" placeholder="info@acme.com" className="pl-9" /></div></div>
            <div><Label>Phone</Label><div className="relative mt-1.5"><Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="+1 (555) 012-3456" className="pl-9" /></div></div>
            <div><Label>Address</Label><div className="relative mt-1.5"><MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><Input placeholder="123 Main St" className="pl-9" /></div></div>
          </div>
          <div className="flex justify-end mt-6"><Button>Submit Form</Button></div>
        </Card>
      </div>
    </div>
  );
}
