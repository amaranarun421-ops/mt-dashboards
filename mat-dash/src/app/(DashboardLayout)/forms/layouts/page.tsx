"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";

const FormsLayoutsPage = () => {
  return (
    <PageContainer
      title="Form Layouts"
      description="Common layout patterns — stacked, two-column, grid, and form-with-sidebar arrangements."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Stacked Form">
          <form className="space-y-4">
            <div><Label>Full Name</Label><Input placeholder="John Doe" className="mt-2" /></div>
            <div><Label>Email</Label><Input type="email" placeholder="john@example.com" className="mt-2" /></div>
            <div><Label>Phone</Label><Input type="tel" placeholder="+1 555 000 1234" className="mt-2" /></div>
            <div><Label>Message</Label><Textarea placeholder="Your message..." className="mt-2" rows={3} /></div>
            <div className="flex items-center gap-2"><Checkbox id="agree" /><Label htmlFor="agree" className="font-normal text-sm">I agree to the terms</Label></div>
            <Button className="w-full">Submit</Button>
          </form>
        </DemoBlock>

        <DemoBlock title="Two Column Grid">
          <form className="grid grid-cols-2 gap-4">
            <div><Label>First Name</Label><Input className="mt-2" /></div>
            <div><Label>Last Name</Label><Input className="mt-2" /></div>
            <div className="col-span-2"><Label>Email</Label><Input type="email" className="mt-2" /></div>
            <div><Label>City</Label><Input className="mt-2" /></div>
            <div><Label>ZIP</Label><Input className="mt-2" /></div>
            <div className="col-span-2">
              <Label>Country</Label>
              <Select><SelectTrigger className="mt-2 w-full"><SelectValue placeholder="Select country" /></SelectTrigger><SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent></Select>
            </div>
            <div className="col-span-2 flex gap-2">
              <Button className="flex-1">Save</Button>
              <Button variant="outline" className="flex-1">Cancel</Button>
            </div>
          </form>
        </DemoBlock>

        <DemoBlock title="Form with Sidebar" description="Two-column layout with label sidebar">
          <form className="space-y-4">
            {[
              { label: "Username", type: "text", placeholder: "johndoe" },
              { label: "Email", type: "email", placeholder: "john@example.com" },
              { label: "Bio", type: "textarea", placeholder: "Tell us about yourself" },
              { label: "Website", type: "text", placeholder: "https://" },
            ].map((f) => (
              <div key={f.label} className="grid grid-cols-3 gap-4 items-start">
                <Label className="text-sm pt-2.5">{f.label}</Label>
                <div className="col-span-2">
                  {f.type === "textarea" ? (
                    <Textarea placeholder={f.placeholder} rows={2} />
                  ) : (
                    <Input type={f.type} placeholder={f.placeholder} />
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline">Reset</Button>
              <Button>Update Profile</Button>
            </div>
          </form>
        </DemoBlock>

        <DemoBlock title="Inline Form" description="Single-row form for quick actions">
          <form className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
              <Label>Email</Label>
              <Input type="email" placeholder="you@example.com" className="mt-2" />
            </div>
            <div className="flex-1 min-w-[180px]">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••" className="mt-2" />
            </div>
            <Button className="gap-2"><Icon icon="solar:login-3-bold" /> Sign In</Button>
          </form>
        </DemoBlock>

        <DemoBlock title="Sectioned Form" description="Form broken into sections with dividers">
          <form className="space-y-6">
            <div>
              <h6 className="text-sm font-semibold mb-3 text-primary">Personal Info</h6>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="First name" />
                <Input placeholder="Last name" />
              </div>
            </div>
            <div className="border-t border-defaultBorder pt-4">
              <h6 className="text-sm font-semibold mb-3 text-primary">Contact</h6>
              <div className="grid grid-cols-2 gap-3">
                <Input type="email" placeholder="Email" />
                <Input type="tel" placeholder="Phone" />
              </div>
            </div>
            <div className="border-t border-defaultBorder pt-4">
              <h6 className="text-sm font-semibold mb-3 text-primary">Preferences</h6>
              <div className="space-y-2">
                <div className="flex items-center justify-between"><Label className="font-normal text-sm">Email notifications</Label><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><Label className="font-normal text-sm">SMS alerts</Label><Switch /></div>
              </div>
            </div>
            <Button className="w-full">Save All Changes</Button>
          </form>
        </DemoBlock>

        <DemoBlock title="Card-style Form" description="Form inside a styled container">
          <div className="rounded-xl bg-lightgray dark:bg-dark p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center"><Icon icon="solar:user-bold" width={20} /></div>
              <div><h6 className="font-semibold">Create Account</h6><p className="text-xs opacity-70">Get started with a free trial</p></div>
            </div>
            <form className="space-y-3">
              <Input placeholder="Full name" />
              <Input type="email" placeholder="Email address" />
              <Input type="password" placeholder="Password" />
              <Button className="w-full">Create Account</Button>
              <p className="text-xs text-center opacity-70">By signing up you agree to our Terms & Privacy Policy</p>
            </form>
          </div>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default FormsLayoutsPage;
