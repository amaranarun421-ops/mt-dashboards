"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Mail, Search, Eye, EyeOff, CheckCircle2, AlertCircle, DollarSign,
  Lock, User, ArrowRight, X, Plus, Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Badge } from "@/components/ui/badge";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

export default function InputsPage() {
  const [pw, setPw] = React.useState("s3cure-Pass");
  const [showPw, setShowPw] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<string[] | null>(null);

  const fruits = ["Apple", "Apricot", "Banana", "Blackberry", "Cherry", "Clementine", "Date", "Dragonfruit", "Elderberry", "Fig", "Grape", "Guava"];

  const onSearch = (q: string) => {
    setQuery(q);
    setSearchResults(q.length > 0 ? fruits.filter((f) => f.toLowerCase().includes(q.toLowerCase())) : null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Input Variants"
        description="Standard, decorated, validated, sized, and specialized inputs across the MTVerse design system."
        breadcrumbs={[{ label: "UI Library" }, { label: "Inputs" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Standard & Decorated" description="Plain inputs with leading or trailing icons.">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="basic">Full Name</Label>
              <Input id="basic" placeholder="Jordan Lee" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-icon">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="email-icon" type="email" className="pl-9" placeholder="you@mtverse.io" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-icon">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="user-icon" className="pl-9" placeholder="jordanlee" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pw">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="pw"
                  type={showPw ? "text" : "password"}
                  className="pl-9 pr-9"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 size-7"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Buttons & Affixes" description="Append and prepend button actions.">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prepend">Coupon Code</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input id="prepend" className="pl-9" placeholder="SUMMER50" />
                </div>
                <Button variant="outline" onClick={() => toast.success("Coupon applied", { description: "20% off your next order." })}>
                  Apply
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subscribe">Newsletter</Label>
              <div className="flex gap-2">
                <Input id="subscribe" type="email" placeholder="you@email.com" className="flex-1" />
                <Button onClick={() => toast.success("Subscribed!", { description: "Check your inbox to confirm." })}>
                  <Send className="size-4 mr-1" /> Subscribe
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="search-url">Domain lookup</Label>
              <div className="flex rounded-md border border-border overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                <span className="inline-flex items-center px-3 bg-muted text-xs text-muted-foreground border-r border-border">https://</span>
                <Input id="search-url" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="mtverse.io" />
                <Button variant="ghost" className="rounded-none" onClick={() => toast.info("Domain is available")}>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag-input">Tags</Label>
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-border p-2">
                {["TypeScript", "React", "Next.js"].map((t) => (
                  <Badge key={t} variant="secondary" className="gap-1">
                    {t}
                    <button onClick={() => toast.info(`Removed ${t}`)} aria-label={`Remove ${t}`}><X className="size-3" /></button>
                  </Badge>
                ))}
                <Input id="tag-input" className="border-0 flex-1 min-w-[100px] focus-visible:ring-0 focus-visible:ring-offset-0 h-7" placeholder="Add tag…" />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Helper Text & Validation" description="Helper hints and error / success states.">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hint-username">Username</Label>
              <Input id="hint-username" defaultValue="alex.morgan" />
              <p className="text-xs text-muted-foreground">Lowercase letters, numbers, and hyphens. 3–20 characters.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="success-email">Email</Label>
              <Input
                id="success-email"
                defaultValue="alex@mtverse.io"
                className="border-success/50 focus-visible:ring-success/30"
              />
              <p className="text-xs text-success flex items-center gap-1"><CheckCircle2 className="size-3" />Email verified on Mar 12, 2025.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="err-email">Recovery Email</Label>
              <Input
                id="err-email"
                defaultValue="alex@"
                aria-invalid
                className="border-destructive/50 focus-visible:ring-destructive/30"
              />
              <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="size-3" />Please enter a valid email address.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled-id">Account ID</Label>
              <Input id="disabled-id" defaultValue="ACCT-9182-44A" disabled />
              <p className="text-xs text-muted-foreground">Account ID cannot be changed.</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Sizes & Specialized" description="Input sizes, OTP, and search with live results.">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="size-sm">Small</Label>
              <Input id="size-sm" placeholder="Small input" className="h-8 text-xs" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size-md">Default</Label>
              <Input id="size-md" placeholder="Default input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size-lg">Large</Label>
              <Input id="size-lg" placeholder="Large input" className="h-12 text-base" />
            </div>
            <div className="space-y-2">
              <Label>Two-factor code</Label>
              <InputOTP maxLength={6} value={otp} onChange={(v) => setOtp(v)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {otp.length === 6 && <p className="text-xs text-success flex items-center gap-1"><CheckCircle2 className="size-3" />Code complete</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="search">Live search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="search"
                  className="pl-9"
                  placeholder="Search fruits…"
                  value={query}
                  onChange={(e) => onSearch(e.target.value)}
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 size-7"
                    onClick={() => onSearch("")}
                    aria-label="Clear"
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
              {searchResults && (
                <div className="rounded-md border border-border bg-popover p-1 max-h-40 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((r) => (
                      <button
                        key={r}
                        className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent"
                        onClick={() => { setQuery(r); setSearchResults(null); toast.info(`Selected ${r}`); }}
                      >
                        {r}
                      </button>
                    ))
                  ) : (
                    <p className="px-2 py-3 text-xs text-muted-foreground">No results for &quot;{query}&quot;.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Textarea & Long-form" description="Multi-line inputs with helper text and character count.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" rows={4} placeholder="Tell us about yourself…" defaultValue="Design engineer building MTVerse. Coffee enthusiast, trail runner, weekend woodworker." />
            <p className="text-xs text-muted-foreground">Max 280 characters.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea id="comment" rows={4} placeholder="Share your thoughts…" />
            <div className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground">Markdown supported.</p>
              <Button size="sm" className="h-7" onClick={() => toast.success("Comment posted")}>
                <Plus className="size-3.5 mr-1" /> Post
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
