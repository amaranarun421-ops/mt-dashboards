"use client";
import { useState } from "react";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const FrontBlog = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Tutorial", "Design", "A11y", "Performance", "Engineering"];

  const posts = [
    { title: "Getting Started with mtverse: A Complete Guide", category: "Tutorial", date: "Jun 24, 2024", readTime: "5 min", img: "/images/blog/blog-img1.jpg", excerpt: "Learn how to set up, customize, and deploy your first mtverse dashboard in under 10 minutes." },
    { title: "10 UI Design Trends Shaping 2024", category: "Design", date: "Jun 20, 2024", readTime: "7 min", img: "/images/blog/blog-img2.jpg", excerpt: "From bento grids to micro-interactions, here are the trends defining modern web design." },
    { title: "Building Accessible Dashboards That Everyone Can Use", category: "A11y", date: "Jun 18, 2024", readTime: "8 min", img: "/images/blog/blog-img3.jpg", excerpt: "A practical guide to WCAG compliance, ARIA patterns, and keyboard navigation in React." },
    { title: "Optimizing Next.js Performance: A Deep Dive", category: "Performance", date: "Jun 15, 2024", readTime: "10 min", img: "/images/blog/blog-img4.jpg", excerpt: "Bundle analysis, code splitting, image optimization, and more techniques for blazing-fast apps." },
    { title: "Dark Mode Done Right: A Comprehensive Guide", category: "Design", date: "Jun 12, 2024", readTime: "6 min", img: "/images/blog/blog-img5.jpg", excerpt: "System detection, smooth transitions, color tokens — everything you need for perfect dark mode." },
    { title: "State Management in 2024: What You Need to Know", category: "Engineering", date: "Jun 10, 2024", readTime: "9 min", img: "/images/blog/blog-img6.jpg", excerpt: "Zustand, Jotai, TanStack Query, and the evolving landscape of React state management." },
  ];

  const filtered = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <PageContainer title="Blog" description="Insights, tutorials, and updates from the mtverse team.">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <Button key={c} size="sm" variant={filter === c ? "default" : "outline"} onClick={() => setFilter(c)}>{c}</Button>
        ))}
      </div>

      {/* Featured post */}
      {featured && (
        <div className="rounded-2xl bg-background border border-defaultBorder overflow-hidden mb-6 hover:shadow-md transition-shadow group">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto overflow-hidden bg-lightgray dark:bg-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="lightPrimary">{featured.category}</Badge>
                <Badge variant="lightSuccess">Featured</Badge>
              </div>
              <h2 className="text-2xl font-bold mb-3 leading-tight">{featured.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Icon icon="solar:calendar-bold" width={14} /> {featured.date}</span>
                <span className="flex items-center gap-1"><Icon icon="solar:clock-circle-bold" width={14} /> {featured.readTime}</span>
              </div>
              <Button className="gap-2 w-fit"><Icon icon="solar:document-bold" width={16} /> Read Article</Button>
            </div>
          </div>
        </div>
      )}

      {/* Rest of posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((p) => (
          <article key={p.title} className="rounded-xl bg-background border border-defaultBorder overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
            <div className="aspect-video overflow-hidden bg-lightgray dark:bg-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <Badge variant="lightPrimary" className="mb-2">{p.category}</Badge>
              <h3 className="font-semibold text-base mb-2 leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Icon icon="solar:calendar-bold" width={12} /> {p.date}</span>
                <span className="flex items-center gap-1"><Icon icon="solar:clock-circle-bold" width={12} /> {p.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Icon icon="solar:document-bold-duotone" width={48} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No posts in this category yet.</p>
        </div>
      )}
    </PageContainer>
  );
};

export default FrontBlog;
