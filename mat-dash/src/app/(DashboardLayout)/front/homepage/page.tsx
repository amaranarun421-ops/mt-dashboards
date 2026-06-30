"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

const FrontHomepage = () => (
  <div className="space-y-16 py-4">
    {/* Hero Section */}
    <section className="relative overflow-hidden rounded-2xl bg-primary text-white">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/backgrounds/profilebg.jpg')", backgroundSize: "cover" }} />
      <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
        <Badge className="bg-white text-primary mb-6 gap-1.5">
          <Icon icon="solar:bolt-bold" width={14} /> Now with AI-powered insights
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Build Beautiful Dashboards<br />in Minutes, Not Weeks
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
          mtverse is the most developer-friendly admin template. 138+ pages, 30+ components, full dark mode, and zero config.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2">
            <Icon icon="solar:rocket-bold" width={18} /> Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white gap-2">
            <Icon icon="solar:play-bold" width={18} /> Watch Demo
          </Button>
        </div>
        <p className="text-xs opacity-70 mt-4">No credit card required · 14-day free trial</p>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20 max-w-2xl mx-auto">
          {[
            { v: "138+", l: "Pages" },
            { v: "30+", l: "Components" },
            { v: "10k+", l: "Developers" },
            { v: "4.9★", l: "Rating" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-2xl md:text-3xl font-bold">{s.v}</p>
              <p className="text-xs opacity-80 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features Bento Grid */}
    <section>
      <div className="text-center mb-10">
        <Badge variant="lightPrimary" className="mb-3">Features</Badge>
        <h2 className="text-3xl font-bold mb-2">Everything you need to ship faster</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">A complete toolkit for modern admin interfaces, designed with attention to every detail.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { icon: "solar:bolt-bold-duotone", color: "primary", title: "Lightning Fast", desc: "Built on Next.js 16 with Turbopack. Sub-second page loads, optimized bundle size.", size: "lg" },
          { icon: "solar:moon-stars-bold-duotone", color: "warning", title: "Dark Mode", desc: "Full dark mode with system detection.", size: "sm" },
          { icon: "solar:widget-bold-duotone", color: "secondary", title: "30+ Components", desc: "Every component you need: tables, charts, forms, modals.", size: "sm" },
          { icon: "solar:smartphone-bold-duotone", color: "success", title: "Responsive", desc: "Mobile-first design across all breakpoints.", size: "sm" },
          { icon: "solar:shield-check-bold-duotone", color: "info", title: "Secure", desc: "Auth flows, RBAC, and audit logging built-in.", size: "sm" },
          { icon: "solar:palette-bold-duotone", color: "error", title: "Customizable", desc: "CSS variables, theme tokens, and shadcn/ui make customization effortless. Rebrand the entire kit in minutes.", size: "lg" },
        ].map((f) => (
          <div key={f.title} className={`rounded-xl bg-background border border-defaultBorder p-6 hover:shadow-md transition-shadow ${f.size === "lg" ? "md:col-span-2" : ""}`}>
            <div className={`h-12 w-12 rounded-xl bg-light${f.color} text-${f.color} flex items-center justify-center mb-4`}>
              <Icon icon={f.icon} width={26} />
            </div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section>
      <div className="text-center mb-10">
        <Badge variant="lightSuccess" className="mb-3">Testimonials</Badge>
        <h2 className="text-3xl font-bold mb-2">Loved by developers worldwide</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { quote: "mtverse transformed our admin workflow. We shipped our SaaS dashboard in 2 weeks instead of 2 months.", name: "Sarah Johnson", role: "CTO, StartupX", img: 4 },
          { quote: "Best admin template I've used in 10 years. The code is clean, customizable, and production-ready.", name: "Michael Chen", role: "Lead Dev, TechCo", img: 5 },
          { quote: "The attention to detail is remarkable. Every interaction feels polished and intentional.", name: "Emily Rodriguez", role: "UX Designer, DesignHub", img: 6 },
        ].map((t) => (
          <div key={t.name} className="rounded-xl bg-background border border-defaultBorder p-6">
            <Icon icon="solar:chat-round-dots-bold-duotone" width={32} className="text-primary mb-4" />
            <p className="text-sm opacity-80 italic leading-relaxed mb-4">"{t.quote}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-defaultBorder">
              <Avatar className="h-10 w-10"><AvatarImage src={`/images/profile/user-${t.img}.jpg`} /><AvatarFallback>{t.name[0]}</AvatarFallback></Avatar>
              <div><p className="font-semibold text-sm">{t.name}</p><p className="text-xs opacity-60">{t.role}</p></div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="rounded-2xl bg-dark text-white p-10 md:p-16 text-center relative overflow-hidden">
      <Icon icon="solar:rocket-bold-duotone" width={80} className="absolute top-4 right-4 opacity-10" />
      <h2 className="text-3xl font-bold mb-3">Ready to build something amazing?</h2>
      <p className="opacity-80 mb-6 max-w-xl mx-auto">Join 10,000+ developers who use mtverse to ship beautiful admin interfaces faster.</p>
      <div className="flex gap-3 justify-center">
        <Button size="lg" className="bg-white text-dark hover:bg-white/90 gap-2"><Icon icon="solar:rocket-bold" width={18} /> Start Free Today</Button>
        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white gap-2"><Icon icon="solar:document-bold" width={18} /> View Docs</Button>
      </div>
    </section>
  </div>
);

export default FrontHomepage;
