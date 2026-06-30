"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

const AboutPage = () => (
  <PageContainer title="About Us" description="Learn about mtverse — our mission, team, and vision for the future of admin dashboards.">
    {/* Hero */}
    <div className="rounded-2xl bg-primary text-white p-10 md:p-14 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/backgrounds/profilebg.jpg')", backgroundSize: "cover" }} />
      <div className="relative max-w-2xl">
        <Badge className="bg-white text-primary mb-4">Our Story</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Building the future of admin dashboards</h1>
        <p className="text-lg opacity-90 leading-relaxed">
          mtverse was born from a simple idea: developer tools should be beautiful, fast, and delightful to use. We're on a mission to help teams ship better products faster.
        </p>
      </div>
    </div>

    {/* Mission/Vision/Values */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {[
        { icon: "solar:target-bold-duotone", color: "primary", title: "Our Mission", desc: "Empower developers with production-ready, beautiful UI components that save time and delight users." },
        { icon: "solar:eye-bold-duotone", color: "success", title: "Our Vision", desc: "A world where every dashboard is a joy to use — fast, accessible, and beautifully designed." },
        { icon: "solar:heart-bold-duotone", color: "error", title: "Our Values", desc: "Quality over quantity. Speed without compromise. Accessibility as a default, not an afterthought." },
      ].map((v) => (
        <div key={v.title} className="rounded-xl bg-background border border-defaultBorder p-6 hover:shadow-md transition-shadow">
          <div className={`h-12 w-12 rounded-xl bg-light${v.color} text-${v.color} flex items-center justify-center mb-4`}>
            <Icon icon={v.icon} width={26} />
          </div>
          <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
        </div>
      ))}
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { v: "138+", l: "Pages Built", icon: "solar:document-bold-duotone", color: "primary" },
        { v: "10k+", l: "Active Developers", icon: "solar:users-group-rounded-bold-duotone", color: "success" },
        { v: "4.9★", l: "Average Rating", icon: "solar:star-bold-duotone", color: "warning" },
        { v: "99.9%", l: "Uptime", icon: "solar:server-bold-duotone", color: "info" },
      ].map((s) => (
        <div key={s.l} className="rounded-xl bg-background border border-defaultBorder p-5 text-center">
          <div className={`h-10 w-10 rounded-xl bg-light${s.color} text-${s.color} flex items-center justify-center mx-auto mb-3`}>
            <Icon icon={s.icon} width={22} />
          </div>
          <p className="text-2xl font-bold">{s.v}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
        </div>
      ))}
    </div>

    {/* Team */}
    <div className="rounded-xl bg-background border border-defaultBorder p-6">
      <h2 className="text-xl font-bold mb-1">Meet the Team</h2>
      <p className="text-sm text-muted-foreground mb-6">The passionate people behind mtverse</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: "Sarah Johnson", role: "CEO & Co-founder", img: 4 },
          { name: "Michael Chen", role: "CTO & Co-founder", img: 5 },
          { name: "Emily Rodriguez", role: "Design Lead", img: 6 },
          { name: "David Park", role: "Engineering Lead", img: 7 },
        ].map((m) => (
          <div key={m.name} className="text-center p-4 rounded-lg hover:bg-lightgray dark:hover:bg-dark transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/profile/user-${m.img}.jpg`} alt={m.name} className="h-20 w-20 rounded-full mx-auto mb-3 object-cover ring-2 ring-defaultBorder" />
            <p className="font-semibold text-sm">{m.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{m.role}</p>
            <div className="flex gap-1 justify-center mt-3">
              {["solar:twitter-logo-bold", "solar:linkedin-logo-bold"].map((i) => (
                <button key={i} className="h-7 w-7 rounded-full bg-lightgray dark:bg-dark hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                  <Icon icon={i} width={12} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageContainer>
);

export default AboutPage;
