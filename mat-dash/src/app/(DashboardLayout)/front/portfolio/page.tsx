"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const FrontPortfolio = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web App", "Dashboard", "Mobile"];

  const projects = [
    { title: "SaaS Analytics Dashboard", category: "Web App", img: "/images/blog/blog-img1.jpg", tags: ["Next.js", "Charts", "Realtime"], desc: "A comprehensive analytics platform with real-time data visualization." },
    { title: "Ecommerce Platform", category: "Web App", img: "/images/blog/blog-img2.jpg", tags: ["React", "Stripe", "PWA"], desc: "Full-featured online store with cart, checkout, and inventory." },
    { title: "CRM System", category: "Dashboard", img: "/images/blog/blog-img3.jpg", tags: ["TypeScript", "Prisma"], desc: "Customer relationship management with pipeline tracking." },
    { title: "Project Management", category: "Web App", img: "/images/blog/blog-img4.jpg", tags: ["Kanban", "WebSocket"], desc: "Team collaboration tool with drag-and-drop kanban boards." },
    { title: "Financial Tracker", category: "Mobile", img: "/images/blog/blog-img5.jpg", tags: ["Charts", "PWA"], desc: "Personal finance app with budgeting and expense tracking." },
    { title: "Admin Portal", category: "Dashboard", img: "/images/blog/blog-img6.jpg", tags: ["RBAC", "Audit"], desc: "Enterprise admin with role-based access and audit logs." },
  ];

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <PageContainer title="Portfolio" description="A selection of projects built with mtverse.">
      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <Button key={c} size="sm" variant={filter === c ? "default" : "outline"} onClick={() => setFilter(c)}>{c}</Button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div key={p.title} className="rounded-xl bg-background border border-defaultBorder overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden bg-lightgray dark:bg-dark relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                <Badge variant="lightPrimary">{p.category}</Badge>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" className="bg-white text-dark hover:bg-white/90 gap-1.5">
                  <Icon icon="solar:eye-bold" width={14} /> View Project
                </Button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-base mb-1.5">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-lightgray dark:bg-dark text-muted-foreground font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Icon icon="solar:gallery-bold-duotone" width={48} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No projects in this category.</p>
        </div>
      )}
    </PageContainer>
  );
};

export default FrontPortfolio;
