"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import {
  FormSection,
  FormField,
  inputClass,
} from "@/components/shared/form-section";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CheckIcon,
  BellIcon,
  ChatIcon,
  HelpCircleIcon,
  RocketIcon,
} from "@/components/Layouts/sidebar/icons";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const subjects = [
  "Sales question",
  "Technical support",
  "Partnership",
  "Bug report",
  "Feature request",
  "Press / media",
  "Other",
];

const contactInfo = [
  {
    icon: <MailIcon className="size-5" />,
    title: "Email us",
    lines: ["support@heliospro.io", "billing@heliospro.io"],
    hint: "Replies within a few hours, Mon–Fri.",
    tone: "primary" as const,
  },
  {
    icon: <PhoneIcon className="size-5" />,
    title: "Call us",
    lines: ["+1 (415) 555-0142", "+44 20 7946 0321"],
    hint: "9am–6pm PT / 9am–6pm GMT.",
    tone: "accent" as const,
  },
  {
    icon: <MapPinIcon className="size-5" />,
    title: "Visit us",
    lines: ["548 Market Street, San Francisco", "1 Finsbury Avenue, London"],
    hint: "By appointment only.",
    tone: "violet" as const,
  },
];

const toneAccent = {
  primary: "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light",
  accent: "bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light",
  violet: "bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light",
};

export default function ContactClient() {
  const [form, setForm] = React.useState<FormState>(initialState);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [touched, setTouched] = React.useState<Partial<Record<keyof FormState, boolean>>>({});

  function validate(state: FormState): FormErrors {
    const next: FormErrors = {};
    if (!state.name.trim()) next.name = "Please enter your name.";
    else if (state.name.trim().length < 2) next.name = "Name must be at least 2 characters.";

    if (!state.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))
      next.email = "Please enter a valid email address.";

    if (!state.subject) next.subject = "Please pick a subject.";

    if (!state.message.trim()) next.message = "Please enter a message.";
    else if (state.message.trim().length < 20)
      next.message = "Message must be at least 20 characters.";
    else if (state.message.trim().length > 2000)
      next.message = "Message must be 2000 characters or fewer.";

    return next;
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (touched[key]) {
      setErrors(validate(next));
    }
  }

  function blur(key: keyof FormState) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(form));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  function reset() {
    setForm(initialState);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  }

  const messageLen = form.message.length;

  return (
    <>
      <PageHeader
        title="Contact us"
        description="Questions about Helios Pro? Sales, support, partnerships or press — we read every message and reply within a few hours."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Pages", href: "/pages/contact" },
          { label: "Contact" },
        ]}
        actions={
          <Badge variant="success">
            <BellIcon className="size-3.5" /> Avg reply: 2h
          </Badge>
        }
      />

      {/* CONTACT INFO CARDS */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {contactInfo.map((c) => (
          <Card key={c.title} hover>
            <div className={`mb-4 grid size-11 place-items-center rounded-xl ${toneAccent[c.tone]}`}>
              {c.icon}
            </div>
            <h3 className="text-base font-semibold text-dark dark:text-white">
              {c.title}
            </h3>
            <ul className="mt-2 space-y-0.5">
              {c.lines.map((l) => (
                <li key={l} className="text-sm text-dark dark:text-white">
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-dark-5 dark:text-dark-6">{c.hint}</p>
          </Card>
        ))}
      </section>

      {/* FORM + MAP */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* FORM */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Send us a message"
            subtitle="Fill out the form and our team will get back to you shortly."
            action={
              submitted ? (
                <Badge variant="success">
                  <CheckIcon className="size-3.5" /> Sent
                </Badge>
              ) : (
                <Badge variant="neutral">All fields required</Badge>
              )
            }
          />

          {submitted ? (
            <div className="rounded-xl border border-primary/30 bg-primary-subtle/60 p-6 text-center dark:bg-primary/10">
              <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-primary text-white">
                <CheckIcon className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-dark dark:text-white">
                Message sent — thank you!
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-dark-5 dark:text-dark-6">
                We have received your message and will reply to{" "}
                <strong className="text-dark dark:text-white">
                  {form.email}
                </strong>{" "}
                within a few hours during business days.
              </p>
              <div className="mt-5 flex justify-center gap-2">
                <Button variant="outline" size="sm" onClick={reset}>
                  Send another
                </Button>
                <Button size="sm">
                  <RocketIcon className="size-4" /> Back to dashboard
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <FormSection
                title="Your details"
                description="Tell us who you are so we can route your message to the right team."
                columns={2}
              >
                <FormField
                  label="Full name"
                  htmlFor="name"
                  required
                  error={errors.name}
                  hint="2+ characters."
                >
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => blur("name")}
                    className={inputClass}
                    placeholder="Aarav Mehta"
                  />
                </FormField>
                <FormField
                  label="Email"
                  htmlFor="email"
                  required
                  error={errors.email}
                  hint="We will never share your email."
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => blur("email")}
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </FormField>
              </FormSection>

              <FormSection
                title="Your message"
                description="Pick a category and write your message. The more detail, the faster we can help."
                columns={1}
                className="mt-5"
              >
                <FormField
                  label="Subject"
                  htmlFor="subject"
                  required
                  error={errors.subject}
                  hint="Pick the closest match — we will route it from there."
                >
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    onBlur={() => blur("subject")}
                    className={inputClass}
                  >
                    <option value="">Select a subject…</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField
                  label="Message"
                  htmlFor="message"
                  required
                  error={errors.message}
                  hint={`${messageLen}/2000 characters`}
                >
                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => blur("message")}
                    className={`${inputClass} resize-y`}
                    placeholder="Tell us what you are working on, what you need help with, and any context that will help us reply faster."
                  />
                </FormField>
              </FormSection>

              <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-xs text-dark-5 dark:text-dark-6">
                  By submitting, you agree to our privacy policy. We use your
                  details only to reply to this message.
                </p>
                <div className="flex w-full gap-2 sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={reset}
                    className="flex-1 sm:flex-none"
                  >
                    Reset
                  </Button>
                  <Button type="submit" className="flex-1 sm:flex-none">
                    <MailIcon className="size-4" /> Send message
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Card>

        {/* MAP + OFFICE HOURS */}
        <div className="space-y-6">
          <Card padded={false} className="overflow-hidden">
            <div className="relative h-56 w-full bg-gray-2 dark:bg-dark-2">
              {/* MAP PLACEHOLDER */}
              <svg
                className="absolute inset-0 size-full text-stroke dark:text-dark-3"
                viewBox="0 0 400 224"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="400" height="224" fill="url(#grid)" />
                <path
                  d="M0 90 Q 100 60 200 100 T 400 90"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M0 160 Q 100 130 200 160 T 400 160"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M120 0 L 120 224"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M280 0 L 280 224"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex size-5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
                  <span className="relative inline-flex size-5 rounded-full bg-primary ring-4 ring-white dark:ring-gray-dark" />
                </span>
              </div>
              <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-dark shadow-card-2 dark:bg-dark-2/90 dark:text-white">
                548 Market St · San Francisco
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-sm font-semibold text-dark dark:text-white">
                Headquarters
              </h3>
              <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                548 Market Street, Suite 1200
                <br />
                San Francisco, CA 94104, USA
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Office hours"
              subtitle="Across our two main hubs."
            />
            <ul className="space-y-3">
              {[
                { city: "San Francisco", tz: "PT (UTC−7)", hours: "9:00 AM – 6:00 PM", days: "Mon – Fri" },
                { city: "London", tz: "GMT (UTC+0)", hours: "9:00 AM – 6:00 PM", days: "Mon – Fri" },
                { city: "Bengaluru", tz: "IST (UTC+5:30)", hours: "10:00 AM – 7:00 PM", days: "Mon – Fri" },
              ].map((o) => (
                <li
                  key={o.city}
                  className="flex items-start justify-between gap-3 border-b border-stroke pb-3 last:border-0 last:pb-0 dark:border-dark-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-dark dark:text-white">
                      {o.city}
                    </p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">
                      {o.tz} · {o.days}
                    </p>
                  </div>
                  <Badge variant="neutral" size="sm">
                    {o.hours}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Other channels" />
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: <ChatIcon className="size-4" />, label: "Live chat", value: "8am–8pm UTC, weekdays" },
                { icon: <HelpCircleIcon className="size-4" />, label: "Discord", value: "4,200+ members" },
                { icon: <MailIcon className="size-4" />, label: "Press", value: "press@heliospro.io" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 rounded-lg border border-stroke px-3 py-2.5 dark:border-dark-3"
                >
                  <span className="grid size-8 place-items-center rounded-md bg-gray-2 text-dark-5 dark:bg-white/5 dark:text-dark-6">
                    {c.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-dark dark:text-white">
                      {c.label}
                    </p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
