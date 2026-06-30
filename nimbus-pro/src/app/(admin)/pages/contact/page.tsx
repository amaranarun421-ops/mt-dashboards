"use client";
import { useState } from "react";
import { Card, CardBody, Badge, Button, Input, Textarea, Label, Select } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle2,
  Bird, Code2, Briefcase
} from "lucide-react";

const CHANNELS = [
  { icon: Mail, label: "Email us", value: "hello@nimbuspro.io", desc: "Best for general inquiries", tone: "brand" },
  { icon: Phone, label: "Call us", value: "+1 (555) 014-2880", desc: "Mon–Fri, 9am–6pm PT", tone: "success" },
  { icon: MessageCircle, label: "Live chat", value: "Available in app", desc: "Avg. response < 2 min", tone: "purple" },
];

const TONE: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", topic: "general", message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-10">
      {/* ============ Hero ============ */}
      <section className="text-center">
        <Badge tone="brand" variant="soft" className="mb-4">
          <Mail className="h-3 w-3" /> Get in touch
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Let&apos;s talk
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-300">
          Questions, feedback, or partnership ideas? Drop us a line — we read every message
          and respond within one business day.
        </p>
      </section>

      {/* ============ Channels ============ */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {CHANNELS.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label} hover className="p-5">
              <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", TONE[c.tone])}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {c.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{c.value}</p>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{c.desc}</p>
            </Card>
          );
        })}
      </section>

      {/* ============ Form + Info ============ */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Form */}
        <Card className="lg:col-span-3">
          <CardBody>
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Message sent!
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Thanks {form.name || "there"} — we&apos;ll be in touch within one business day.
                  </p>
                </div>
                <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", topic: "general", message: "" }); }}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label required>Full name</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Aaroh Sharma"
                    />
                  </div>
                  <div>
                    <Label required>Email</Label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <Label>Topic</Label>
                    <Select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                      <option value="general">General inquiry</option>
                      <option value="sales">Sales & licensing</option>
                      <option value="support">Technical support</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press</option>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label required>Message</Label>
                  <Textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By submitting you agree to our privacy policy.
                  </p>
                  <Button type="submit">
                    Send message <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>

        {/* Info + Map placeholder */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Office</h3>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Nimbus Labs</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    500 Pine Street, Suite 4<br />
                    San Francisco, CA 94104
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Working hours</p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Mon–Fri, 9am–6pm PT<br />
                    Closed on weekends
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-5 dark:border-gray-800">
              {[Bird, Code2, Briefcase].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors hover:bg-brand-50 hover:text-brand-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-brand-500/15 dark:hover:text-brand-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Card>

          {/* Map placeholder */}
          <Card className="relative h-64 overflow-hidden p-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-accent-100 dark:from-gray-800 dark:to-gray-900" />
            {/* Faux map grid */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(16,185,129,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.2) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Faux roads */}
            <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 bg-white/60 dark:bg-gray-700/60" />
            <div className="absolute bottom-0 left-1/3 top-0 w-1.5 bg-white/60 dark:bg-gray-700/60" />
            <div className="absolute bottom-6 right-6 h-16 w-16 rotate-12 rounded-lg bg-white/40 dark:bg-gray-700/40" />
            {/* Pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-theme-lg ring-4 ring-white dark:ring-gray-900">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="mt-1 rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-gray-900 shadow-theme-md dark:bg-gray-900 dark:text-white">
                  Nimbus HQ
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
