"use client";

import * as React from "react";
import { useState } from "react";
import {
  Settings, Palette, Shield, Bell, Plug, Cog, Save, Upload, Loader2,
  Globe, Check, AlertTriangle, Trash2, Download, Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";
import { toast } from "sonner";

const sections = [
  { key: "general", label: "General", icon: Settings },
  { key: "branding", label: "Branding", icon: Palette },
  { key: "security", label: "Security", icon: Shield },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "integrations", label: "Integrations", icon: Plug },
  { key: "advanced", label: "Advanced", icon: Cog },
];

const presetColors = [
  { name: "Aurora Violet", value: "#7c3aed" },
  { name: "Ocean Blue", value: "#0ea5e9" },
  { name: "Forest Green", value: "#10b981" },
  { name: "Sunset Orange", value: "#f97316" },
  { name: "Rose Pink", value: "#ec4899" },
  { name: "Slate Gray", value: "#64748b" },
];

export default function SettingsPage() {
  const [active, setActive] = useState("general");
  const [saving, setSaving] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#7c3aed");
  const [radius, setRadius] = useState([8]);

  const [general, setGeneral] = useState({
    workspaceName: "MTVerse Inc.",
    description: "Premium dashboard kit for modern SaaS teams.",
    timezone: "America/Los_Angeles",
    language: "en",
    dateFormat: "MM/DD/YYYY",
    weekStart: "monday",
  });

  const [branding, setBranding] = useState({
    customDomain: "app.mtverse.io",
    domainVerified: true,
    hideMTVerseBranding: false,
  });

  const [security, setSecurity] = useState({
    twoFARequired: true,
    ssoEnabled: true,
    sessionTimeout: "24",
    passwordPolicy: "strict",
    ipWhitelist: false,
    dataEncryption: true,
  });

  const handleSave = (section: string) => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success(`${sections.find((s) => s.key === section)?.label} settings saved`);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your workspace configuration, branding, security, and integrations."
        breadcrumbs={[{ label: "Enterprise" }, { label: "Settings" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-1 p-2 h-fit sticky top-4">
          <nav className="space-y-1">
            {sections.map((s) => {
              const isActive = active === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <s.icon className="size-4" /> {s.label}
                </button>
              );
            })}
          </nav>
          <Separator className="my-2" />
          <div className="p-3">
            <p className="text-xs text-muted-foreground mb-1">Last saved</p>
            <p className="text-xs font-medium">2 hours ago</p>
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-4">
          {active === "general" && (
            <SectionCard
              title="General settings"
              description="Basic workspace configuration"
              actions={<Button size="sm" className="h-8" onClick={() => handleSave("general")} disabled={saving}>
                {saving && <Loader2 className="size-3.5 mr-1.5 animate-spin" />} Save
              </Button>}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ws-name">Workspace name</Label>
                  <Input id="ws-name" value={general.workspaceName} onChange={(e) => setGeneral((g) => ({ ...g, workspaceName: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ws-desc">Description</Label>
                  <Textarea id="ws-desc" rows={2} value={general.description} onChange={(e) => setGeneral((g) => ({ ...g, description: e.target.value }))} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={general.timezone} onValueChange={(v) => setGeneral((g) => ({ ...g, timezone: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">(GMT-8) Pacific Time</SelectItem>
                        <SelectItem value="America/New_York">(GMT-5) Eastern Time</SelectItem>
                        <SelectItem value="Europe/London">(GMT+0) London</SelectItem>
                        <SelectItem value="Asia/Tokyo">(GMT+9) Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={general.language} onValueChange={(v) => setGeneral((g) => ({ ...g, language: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date format</Label>
                    <Select value={general.dateFormat} onValueChange={(v) => setGeneral((g) => ({ ...g, dateFormat: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Week starts on</Label>
                    <Select value={general.weekStart} onValueChange={(v) => setGeneral((g) => ({ ...g, weekStart: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {active === "branding" && (
            <>
              <SectionCard
                title="Branding"
                description="Customize the look and feel of your workspace"
                actions={<Button size="sm" className="h-8" onClick={() => handleSave("branding")} disabled={saving}>
                  {saving && <Loader2 className="size-3.5 mr-1.5 animate-spin" />} Save
                </Button>}
              >
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex size-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-chart-4 text-primary-foreground text-xl font-bold">
                        MTV
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="h-8" onClick={() => toast.info("Select a file to upload")}>
                          <Upload className="size-3.5 mr-1.5" /> Upload logo
                        </Button>
                        <p className="text-xs text-muted-foreground">PNG, SVG, or JPG. Max 2MB. Recommended 256×256px.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary color</Label>
                    <div className="flex flex-wrap gap-2">
                      {presetColors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => { setPrimaryColor(c.value); toast.success(`Primary color set to ${c.name}`); }}
                          className={`size-9 rounded-lg border-2 transition-all ${
                            primaryColor === c.value ? "border-foreground scale-105" : "border-transparent hover:scale-105"
                          }`}
                          style={{ background: c.value }}
                          title={c.name}
                        >
                          {primaryColor === c.value && <Check className="size-4 text-white mx-auto" />}
                        </button>
                      ))}
                      <label className="size-9 rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-accent">
                        <ImageIcon className="size-4 text-muted-foreground" />
                        <input type="color" className="sr-only" onChange={(e) => setPrimaryColor(e.target.value)} />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Corner radius</Label>
                      <span className="text-xs text-muted-foreground">{radius[0]}px</span>
                    </div>
                    <Slider value={radius} onValueChange={setRadius} min={0} max={20} step={1} />
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Custom domain" description="Use your own domain for the workspace">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Domain</Label>
                    <div className="flex gap-2">
                      <Input
                        value={branding.customDomain}
                        onChange={(e) => setBranding((b) => ({ ...b, customDomain: e.target.value }))}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={() => toast.success("DNS verification started")}>
                        <Globe className="size-4 mr-2" /> Verify
                      </Button>
                    </div>
                  </div>
                  {branding.domainVerified ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-success/5 border border-success/20">
                      <Check className="size-4 text-success" />
                      <p className="text-xs text-muted-foreground">Domain verified — serving workspace over HTTPS.</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/5 border border-warning/20">
                      <AlertTriangle className="size-4 text-warning" />
                      <p className="text-xs text-muted-foreground">Add a CNAME record pointing to <code className="font-mono">mtverse.io</code> to verify.</p>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Hide MTVerse branding</p>
                      <p className="text-xs text-muted-foreground">Remove "Powered by MTVerse" from your workspace.</p>
                    </div>
                    <Switch
                      checked={branding.hideMTVerseBranding}
                      onCheckedChange={(c) => {
                        setBranding((b) => ({ ...b, hideMTVerseBranding: c }));
                        if (c) toast.info("White-label mode requires Enterprise plan");
                      }}
                    />
                  </div>
                </div>
              </SectionCard>
            </>
          )}

          {active === "security" && (
            <SectionCard
              title="Security"
              description="Configure authentication and access policies"
              actions={<Button size="sm" className="h-8" onClick={() => handleSave("security")} disabled={saving}>
                {saving && <Loader2 className="size-3.5 mr-1.5 animate-spin" />} Save
              </Button>}
            >
              <div className="space-y-1">
                {[
                  { key: "twoFARequired", label: "Require 2FA for all members", desc: "Force all team members to enable two-factor authentication.", badge: "Recommended" },
                  { key: "ssoEnabled", label: "Enable SSO (SAML)", desc: "Allow single sign-on with your identity provider (Okta, Azure AD, etc.).", badge: "Enterprise" },
                  { key: "dataEncryption", label: "End-to-end encryption", desc: "Encrypt data at rest with customer-managed keys.", badge: "Enterprise" },
                  { key: "ipWhitelist", label: "IP whitelist", desc: "Restrict access to specific IP ranges only." },
                ].map((item) => (
                  <React.Fragment key={item.key}>
                    <div className="flex items-start justify-between gap-4 py-3">
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{item.label}</p>
                          {item.badge && (
                            <Badge variant="outline" className="text-[10px] h-4 px-1 font-normal bg-primary/10 text-primary border-primary/20">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={(security as any)[item.key]}
                        onCheckedChange={(c) => setSecurity((s) => ({ ...s, [item.key]: c }))}
                      />
                    </div>
                    <Separator />
                  </React.Fragment>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>Session timeout</Label>
                    <Select value={security.sessionTimeout} onValueChange={(v) => setSecurity((s) => ({ ...s, sessionTimeout: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="168">7 days</SelectItem>
                        <SelectItem value="720">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Password policy</Label>
                    <Select value={security.passwordPolicy} onValueChange={(v) => setSecurity((s) => ({ ...s, passwordPolicy: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lenient">Lenient (8+ chars)</SelectItem>
                        <SelectItem value="standard">Standard (12+ chars, mixed)</SelectItem>
                        <SelectItem value="strict">Strict (16+ chars, symbols)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {active === "notifications" && (
            <SectionCard
              title="Notification defaults"
              description="Default notification preferences for new members"
              actions={<Button size="sm" className="h-8" onClick={() => handleSave("notifications")} disabled={saving}>
                {saving && <Loader2 className="size-3.5 mr-1.5 animate-spin" />} Save
              </Button>}
            >
              <div className="space-y-1">
                {[
                  { label: "Mentions", desc: "Notify when someone @mentions a member", enabled: true },
                  { label: "Task assignments", desc: "Notify when a task is assigned", enabled: true },
                  { label: "Pull request reviews", desc: "Notify when a PR review is requested", enabled: true },
                  { label: "Weekly digest", desc: "Send a summary of activity every Monday", enabled: false },
                  { label: "Security alerts", desc: "Notify on suspicious activity or login attempts", enabled: true },
                  { label: "Billing events", desc: "Notify on invoices, payment failures, plan changes", enabled: true },
                  { label: "Product announcements", desc: "Notify about new features and updates", enabled: true },
                ].map((item, i, arr) => (
                  <React.Fragment key={item.label}>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked={item.enabled} onCheckedChange={(c) => toast.success(`${item.label} ${c ? "enabled" : "disabled"}`)} />
                    </div>
                    {i !== arr.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </SectionCard>
          )}

          {active === "integrations" && (
            <SectionCard
              title="Integration defaults"
              description="Default behavior for connected integrations"
              actions={<Button size="sm" className="h-8" onClick={() => handleSave("integrations")} disabled={saving}>
                {saving && <Loader2 className="size-3.5 mr-1.5 animate-spin" />} Save
              </Button>}
            >
              <div className="space-y-1">
                {[
                  { label: "Auto-sync data", desc: "Automatically sync data with connected integrations every 5 minutes", enabled: true },
                  { label: "Send webhooks", desc: "Trigger webhooks for all workspace events", enabled: true },
                  { label: "Allow custom integrations", desc: "Let team members connect their own integrations", enabled: false },
                  { label: "Require admin approval", desc: "New integrations require admin approval before activation", enabled: true },
                ].map((item, i, arr) => (
                  <React.Fragment key={item.label}>
                    <div className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked={item.enabled} />
                    </div>
                    {i !== arr.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </SectionCard>
          )}

          {active === "advanced" && (
            <>
              <SectionCard title="Advanced" description="Power-user settings and developer options">
                <div className="space-y-1">
                  {[
                    { label: "Beta features", desc: "Enable early access to features in development", enabled: true },
                    { label: "Developer mode", desc: "Show API request inspector and debug tools", enabled: false },
                    { label: "Verbose logging", desc: "Record detailed logs for troubleshooting (may impact performance)", enabled: false },
                    { label: "Custom CSS", desc: "Apply custom CSS to your workspace", enabled: false },
                  ].map((item, i, arr) => (
                    <React.Fragment key={item.label}>
                      <div className="flex items-center justify-between gap-4 py-3">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch defaultChecked={item.enabled} />
                      </div>
                      {i !== arr.length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Data management" description="Export or delete your workspace data">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="text-sm font-medium">Export workspace data</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Download all data as a JSON archive (includes all dashboards, members, and settings).</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast.success("Export started", { description: "You'll receive an email with a download link." })}>
                      <Download className="size-4 mr-2" /> Export
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div>
                      <p className="text-sm font-medium text-destructive">Delete workspace</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Permanently delete this workspace and all associated data. This action cannot be undone.</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => toast.error("Deletion requires email confirmation")}>
                      <Trash2 className="size-4 mr-2" /> Delete
                    </Button>
                  </div>
                </div>
              </SectionCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
