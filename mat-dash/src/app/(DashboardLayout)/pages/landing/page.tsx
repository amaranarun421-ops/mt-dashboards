"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <PageContainer title="Landing Page" description="Marketing-style landing page demonstrating hero, features, stats, testimonials, and CTA sections.">
      {/* Hero */}
      <div className="rounded-3xl bg-primary p-8 md:p-16 text-white text-center mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/backgrounds/profilebg.jpg')", backgroundSize: "cover" }} />
        <div className="relative">
          <Badge className="bg-white text-primary text-white border-white/50 mb-4">🚀 Now with AI-powered insights</Badge>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Build Beautiful Dashboards<br />in Minutes, Not Weeks</h1>
          <p className="text-lg opacity-90 mt-4 max-w-2xl mx-auto">mtverse is the most developer-friendly admin template. 50+ pages, 25+ components, full dark mode, and zero config.</p>
          <div className="flex gap-3 justify-center mt-7">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2" asChild><Link href="/auth/register"><Icon icon="solar:rocket-bold" width={18} /> Get Started Free</Link></Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/30 hover:text-white gap-2" asChild><Link href="/"><Icon icon="solar:play-bold" width={18} /> Watch Demo</Link></Button>
          </div>
          <p className="text-xs opacity-70 mt-4">No credit card required · 14-day free trial</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { value: "50+", label: "Pages", icon: "solar:document-bold-duotone" },
          { value: "25+", label: "Components", icon: "solar:widget-bold-duotone" },
          { value: "10k+", label: "Developers", icon: "solar:users-group-rounded-bold-duotone" },
          { value: "4.9★", label: "Rating", icon: "solar:star-bold-duotone" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-background p-6 shadow-xs text-center">
            <Icon icon={s.icon} width={32} className="text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-sm opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="rounded-xl bg-background p-8 shadow-xs mb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Everything you need to ship faster</h2>
          <p className="text-sm opacity-70 mt-2">A complete toolkit for modern admin interfaces</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "solar:bolt-bold-duotone", color: "primary", title: "Lightning Fast", desc: "Built on Next.js 16 with Turbopack. Sub-second page loads, optimized bundle size." },
            { icon: "solar:moon-stars-bold-duotone", color: "warning", title: "Dark Mode", desc: "Full dark mode support with system preference detection. One-click theme switching." },
            { icon: "solar:widget-bold-duotone", color: "secondary", title: "25+ Components", desc: "Every component you need: tables, charts, forms, modals, tabs, and more." },
            { icon: "solar:smartphone-bold-duotone", color: "success", title: "Responsive", desc: "Mobile-first design. Looks great on phone, tablet, and desktop out of the box." },
            { icon: "solar:shield-check-bold-duotone", color: "info", title: "Secure", desc: "SOC 2 ready. Auth flows, role-based access, and audit logging built-in." },
            { icon: "solar:palette-bold-duotone", color: "error", title: "Customizable", desc: "CSS variables, theme tokens, and shadcn/ui make customization effortless." },
          ].map((f) => (
            <div key={f.title} className="p-5 rounded-xl border border-defaultBorder hover:shadow-md transition-shadow">
              <div className={`h-12 w-12 rounded-2xl bg-light${f.color} text-${f.color} flex items-center justify-center mb-3`}>
                <Icon icon={f.icon} width={26} />
              </div>
              <h3 className="font-semibold text-base">{f.title}</h3>
              <p className="text-sm opacity-70 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="rounded-xl bg-background p-8 shadow-xs mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { quote: "mtverse transformed our admin workflow. We shipped our SaaS dashboard in 2 weeks instead of 2 months.", name: "Sarah Johnson", role: "CTO, StartupX", img: 4 },
            { quote: "The attention to detail is remarkable. Every interaction feels polished and intentional. Best admin template I've used.", name: "Michael Chen", role: "Lead Dev, TechCo", img: 5 },
          ].map((t) => (
            <div key={t.name} className="p-6 rounded-xl bg-lightgray/40 dark:bg-dark/30">
              <Icon icon="solar:chat-round-dots-bold-duotone" width={32} className="text-primary mb-3" />
              <p className="text-base opacity-80 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/profile/user-${t.img}.jpg`} alt={t.name} className="h-10 w-10 rounded-full" />
                <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs opacity-70">{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-dark dark:bg-darkgray p-8 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to build something amazing?</h2>
        <p className="opacity-80 mt-2 max-w-xl mx-auto">Join 10,000+ developers who use mtverse to ship beautiful admin interfaces faster.</p>
        <Button size="lg" className="bg-white text-dark hover:bg-white/90 mt-5 gap-2" asChild><Link href="/auth/register"><Icon icon="solar:rocket-bold" width={18} /> Start Free Today</Link></Button>
      </div>
    </PageContainer>
  );
};

import { Badge } from "@/components/ui/badge";
export default LandingPage;
