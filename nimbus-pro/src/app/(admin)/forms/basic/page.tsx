"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Input, Label, Textarea, Select, Badge, Button } from "@/components/ui";
import {
  Mail, Lock, Eye, EyeOff, User, Phone, Globe, Search, Hash, AlertCircle,
  Check, Info, DollarSign,
} from "lucide-react";

export default function BasicFormPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Basic Inputs"
        description="Text, email, password, number, telephone, URL, and search inputs with all states."
        breadcrumbs={[{ label: "Forms" }, { label: "Basic" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Text inputs */}
        <Card>
          <CardHeader title="Text Inputs" description="Standard text fields with labels and help text" />
          <CardBody className="space-y-4">
            <div>
              <Label required>Full name</Label>
              <Input placeholder="John Doe" defaultValue="Aaroh Sharma" />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">As shown on your government ID.</p>
            </div>
            <div>
              <Label>Username</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">@</span>
                <Input className="pl-7" placeholder="username" />
              </div>
            </div>
            <div>
              <Label>Disabled input</Label>
              <Input value="Cannot be edited" disabled />
            </div>
            <div>
              <Label>Read-only input</Label>
              <Input value="Read-only value" readOnly className="bg-gray-50 dark:bg-gray-800/40" />
            </div>
          </CardBody>
        </Card>

        {/* Email & password */}
        <Card>
          <CardHeader title="Email & Password" description="Credentials with show/hide toggles" />
          <CardBody className="space-y-4">
            <div>
              <Label required>Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="email" className="pl-9" placeholder="you@company.com" />
              </div>
            </div>
            <div>
              <Label required>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type={showPass ? "text" : "password"} className="px-9" placeholder="••••••••" />
                <button onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Toggle">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label required>Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type={showConfirm ? "text" : "password"} className="px-9" placeholder="••••••••" error defaultValue="different" />
                <button onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Toggle">
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> Passwords do not match</p>
            </div>
            <div>
              <Label>OTP / verification code</Label>
              <Input placeholder="123456" maxLength={6} className="font-mono tracking-[0.5em]" />
            </div>
          </CardBody>
        </Card>

        {/* Number & tel */}
        <Card>
          <CardHeader title="Number & Telephone" description="Numeric and phone inputs" />
          <CardBody className="space-y-4">
            <div>
              <Label>Age</Label>
              <Input type="number" placeholder="28" min={0} max={120} />
            </div>
            <div>
              <Label required>Price (USD)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="number" className="pl-9" placeholder="0.00" step="0.01" />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Enter amount in USD.</p>
            </div>
            <div>
              <Label>Phone number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="tel" className="pl-9" placeholder="+1 (415) 555-0142" />
              </div>
            </div>
            <div>
              <Label>Quantity</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">-</Button>
                <Input type="number" defaultValue={1} className="text-center" />
                <Button variant="outline" size="icon" className="h-10 w-10">+</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* URL & search */}
        <Card>
          <CardHeader title="URL & Search" description="Web addresses and search fields" />
          <CardBody className="space-y-4">
            <div>
              <Label>Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="url" className="pl-9" placeholder="https://example.com" />
              </div>
            </div>
            <div>
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="search" className="pl-9" placeholder="Search products..." />
              </div>
            </div>
            <div>
              <Label>Tracking number</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input className="pl-9 font-mono" placeholder="NP-9821-XYZ" />
              </div>
            </div>
            <div>
              <Label>Invalid input</Label>
              <Input error defaultValue="bad @email" />
              <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> Please enter a valid email address</p>
            </div>
          </CardBody>
        </Card>

        {/* Textarea */}
        <Card>
          <CardHeader title="Textarea" description="Multi-line text inputs" />
          <CardBody className="space-y-4">
            <div>
              <Label>Bio</Label>
              <Textarea placeholder="Tell us about yourself..." />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">0 / 200 characters</p>
            </div>
            <div>
              <Label>Notes (auto-resize)</Label>
              <Textarea className="min-h-[180px]" placeholder="Start typing..." />
            </div>
            <div>
              <Label>Disabled textarea</Label>
              <Textarea value="This field is currently locked." disabled />
            </div>
          </CardBody>
        </Card>

        {/* Select */}
        <Card>
          <CardHeader title="Select" description="Dropdown selects" />
          <CardBody className="space-y-4">
            <div>
              <Label>Country</Label>
              <Select defaultValue="">
                <option value="" disabled>Select a country...</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
              </Select>
            </div>
            <div>
              <Label required>Timezone</Label>
              <Select>
                <option>Asia/Kolkata (IST)</option>
                <option>America/New_York (EST)</option>
                <option>Europe/London (GMT)</option>
              </Select>
            </div>
            <div>
              <Label>Select a plan</Label>
              <Select error defaultValue="">
                <option value="" disabled>Choose a plan...</option>
                <option>Free</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </Select>
              <p className="mt-1 flex items-center gap-1 text-xs text-error-600 dark:text-error-400"><AlertCircle className="h-3 w-3" /> Plan is required</p>
            </div>
            <div>
              <Label>Disabled select</Label>
              <Select disabled><option>Locked</option></Select>
            </div>
          </CardBody>
        </Card>

        {/* Input states overview */}
        <Card className="lg:col-span-2">
          <CardHeader title="Input States" description="All visual states at a glance" />
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label>Default</Label>
                <Input placeholder="Placeholder" />
              </div>
              <div>
                <Label>Focused</Label>
                <Input placeholder="Typing..." className="ring-2 ring-brand-500/40" />
              </div>
              <div>
                <Label>Success</Label>
                <div className="relative">
                  <Input defaultValue="valid@email.com" className="pr-9 border-success-400 focus:border-success-500" />
                  <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-success-500" />
                </div>
              </div>
              <div>
                <Label>Error</Label>
                <div className="relative">
                  <Input defaultValue="bad@" error className="pr-9" />
                  <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-error-500" />
                </div>
              </div>
              <div>
                <Label>Disabled</Label>
                <Input value="Locked" disabled />
              </div>
              <div>
                <Label>With icon</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input className="pl-9" placeholder="Username" />
                </div>
              </div>
              <div>
                <Label>With hint</Label>
                <Input placeholder="6-12 chars" />
                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"><Info className="h-3 w-3" /> Use 6–12 characters</p>
              </div>
              <div>
                <Label>Badge</Label>
                <div className="relative">
                  <Input defaultValue="aaroh" className="pr-16" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2"><Badge tone="success" variant="soft">Available</Badge></span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
