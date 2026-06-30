"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HorizontalFormsPage = () => {
  return (
    <PageContainer
      title="Horizontal Form"
      description="Label-left, input-right layout. Best for desktop screens and dense data entry."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Horizontal">
          <form className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">First Name</Label>
              <Input className="col-span-2" placeholder="John" />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">Last Name</Label>
              <Input className="col-span-2" placeholder="Doe" />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">Email</Label>
              <Input className="col-span-2" type="email" placeholder="john@example.com" />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">Phone</Label>
              <Input className="col-span-2" type="tel" placeholder="+1 555 000 1234" />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">Country</Label>
              <Select><SelectTrigger className="col-span-2 w-full"><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent><SelectItem value="us">United States</SelectItem><SelectItem value="ca">Canada</SelectItem><SelectItem value="uk">United Kingdom</SelectItem></SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div />
              <div className="col-span-2 flex items-center gap-2"><Checkbox id="remember" /><Label htmlFor="remember" className="font-normal text-sm">Remember me</Label></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div />
              <Button className="col-span-2 w-fit">Submit</Button>
            </div>
          </form>
        </DemoBlock>

        <DemoBlock title="With Help Text">
          <form className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-start">
              <Label className="text-sm pt-2.5">Username</Label>
              <div className="col-span-2">
                <Input placeholder="johndoe" />
                <p className="text-xs opacity-60 mt-1">Must be 4-20 characters, alphanumeric only.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-start">
              <Label className="text-sm pt-2.5">Password</Label>
              <div className="col-span-2">
                <Input type="password" placeholder="••••••" />
                <p className="text-xs opacity-60 mt-1">Use at least 8 characters with a mix of letters and numbers.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-start">
              <Label className="text-sm pt-2.5">Bio</Label>
              <div className="col-span-2">
                <Textarea placeholder="Tell us about yourself" rows={3} />
                <p className="text-xs opacity-60 mt-1">Maximum 280 characters.</p>
              </div>
            </div>
          </form>
        </DemoBlock>

        <DemoBlock title="Inline Validation States" description="Success/error indicators">
          <form className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm text-success">Username</Label>
              <div className="col-span-2 relative">
                <Input className="border-success text-success" defaultValue="johndoe" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-start">
              <div />
              <p className="col-span-2 text-xs text-success flex items-center gap-1">✓ Username is available</p>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm text-error">Email</Label>
              <Input className="col-span-2 border-error text-error" defaultValue="invalid-email" />
            </div>
            <div className="grid grid-cols-3 gap-4 items-start">
              <div />
              <p className="col-span-2 text-xs text-error flex items-center gap-1">⚠ Please enter a valid email address</p>
            </div>
          </form>
        </DemoBlock>

        <DemoBlock title="Disabled Fields">
          <form className="space-y-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">User ID</Label>
              <Input className="col-span-2" defaultValue="USR-2024-001" disabled />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">Email</Label>
              <Input className="col-span-2" type="email" defaultValue="john@example.com" disabled />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">Role</Label>
              <Input className="col-span-2" defaultValue="Administrator" disabled />
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
              <Label className="text-sm">Created</Label>
              <Input className="col-span-2" defaultValue="Jan 12, 2024" disabled />
            </div>
          </form>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default HorizontalFormsPage;
