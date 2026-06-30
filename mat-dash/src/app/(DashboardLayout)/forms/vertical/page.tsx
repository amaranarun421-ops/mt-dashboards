"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VerticalFormsPage = () => {
  return (
    <PageContainer
      title="Vertical Form"
      description="Labels stacked above inputs. Best for mobile and narrow layouts."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Vertical">
          <form className="space-y-4">
            <div><Label>Full Name</Label><Input placeholder="John Doe" className="mt-2" /></div>
            <div><Label>Email Address</Label><Input type="email" placeholder="john@example.com" className="mt-2" /></div>
            <div><Label>Password</Label><Input type="password" placeholder="••••••" className="mt-2" /></div>
            <div><Label>Confirm Password</Label><Input type="password" placeholder="••••••" className="mt-2" /></div>
            <Button className="w-full">Create Account</Button>
          </form>
        </DemoBlock>

        <DemoBlock title="With Select & Textarea">
          <form className="space-y-4">
            <div>
              <Label>Department</Label>
              <Select><SelectTrigger className="mt-2 w-full"><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="eng">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Input placeholder="Brief subject line" className="mt-2" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea placeholder="Your message..." rows={4} className="mt-2" />
            </div>
            <Button className="w-full">Send</Button>
          </form>
        </DemoBlock>

        <DemoBlock title="With Radio & Checkbox">
          <form className="space-y-4">
            <div>
              <Label>Gender</Label>
              <RadioGroup defaultValue="male" className="mt-2 flex gap-6">
                <div className="flex items-center gap-2"><RadioGroupItem value="male" id="m" /><Label htmlFor="m" className="font-normal text-sm">Male</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="female" id="f" /><Label htmlFor="f" className="font-normal text-sm">Female</Label></div>
                <div className="flex items-center gap-2"><RadioGroupItem value="other" id="o" /><Label htmlFor="o" className="font-normal text-sm">Other</Label></div>
              </RadioGroup>
            </div>
            <div>
              <Label>Interests</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {["Technology","Sports","Music","Travel","Reading","Cooking"].map((i) => (
                  <div key={i} className="flex items-center gap-2"><Checkbox id={i} /><Label htmlFor={i} className="font-normal text-sm">{i}</Label></div>
                ))}
              </div>
            </div>
            <Button className="w-full">Save Preferences</Button>
          </form>
        </DemoBlock>

        <DemoBlock title="With Help Text">
          <form className="space-y-4">
            <div>
              <Label>Username</Label>
              <Input placeholder="johndoe" className="mt-2" />
              <p className="text-xs opacity-60 mt-1.5">4-20 characters, letters and numbers only.</p>
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" className="mt-2" />
              <p className="text-xs opacity-60 mt-1.5">Min 8 characters, 1 uppercase, 1 number, 1 symbol.</p>
            </div>
            <div>
              <Label>Website</Label>
              <Input type="url" placeholder="https://" className="mt-2" />
              <p className="text-xs opacity-60 mt-1.5">Include https:// or http://</p>
            </div>
          </form>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default VerticalFormsPage;
