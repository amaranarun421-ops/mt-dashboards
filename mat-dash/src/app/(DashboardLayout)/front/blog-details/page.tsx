"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const FrontBlogDetails = () => (
  <PageContainer title="Blog Details" breadcrumb={[{ to: "/", title: "Home" }, { to: "/front/blog", title: "Blog" }, { title: "Article" }]}>
    <article className="max-w-3xl mx-auto">
      {/* Hero image */}
      <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8 bg-lightgray dark:bg-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/blog/blog-img1.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="lightPrimary">Tutorial</Badge>
          <Badge variant="lightSuccess">Beginner</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Getting Started with mtverse: A Complete Guide</h1>
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-defaultBorder">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11"><AvatarImage src="/images/profile/user-1.jpg" /><AvatarFallback>JD</AvatarFallback></Avatar>
            <div>
              <p className="font-semibold text-sm">John Doe</p>
              <p className="text-xs text-muted-foreground">Published Jun 24, 2024 · 5 min read</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {["solar:twitter-logo-bold", "solar:facebook-logo-bold", "solar:linkedin-logo-bold"].map((i) => (
              <button key={i} className="h-9 w-9 rounded-full bg-lightgray dark:bg-dark hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                <Icon icon={i} width={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>mtverse is a premium admin dashboard template built with Next.js 16, React 19, and Tailwind CSS 4. In this comprehensive guide, we'll walk through everything you need to get started — from installation to deployment.</p>

        <div className="rounded-xl bg-lightprimary border border-primary/20 p-5 flex items-start gap-3">
          <Icon icon="solar:lightbulb-bolt-bold-duotone" width={24} className="text-primary shrink-0" />
          <div>
            <p className="font-semibold text-primary text-sm mb-1">Quick Tip</p>
            <p className="text-sm text-muted-foreground">If you're new to Next.js, we recommend reading the Next.js docs first. mtverse follows all App Router conventions.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-dark dark:text-white pt-4">Installation</h2>
        <p>First, clone the repository and install dependencies. We recommend using npm or bun for the best performance and compatibility.</p>

        <div className="rounded-lg bg-dark text-white p-4 font-mono text-sm overflow-x-auto">
          <span className="text-muted-foreground">$</span> git clone https://github.com/mtverse/dashboard.git<br />
          <span className="text-muted-foreground">$</span> cd dashboard<br />
          <span className="text-muted-foreground">$</span> npm install<br />
          <span className="text-muted-foreground">$</span> npm run dev
        </div>

        <h2 className="text-2xl font-bold text-dark dark:text-white pt-4">Project Structure</h2>
        <p>The project follows the Next.js App Router convention with route groups for dashboard and auth layouts. All pages live inside <code className="px-1.5 py-0.5 rounded bg-lightgray dark:bg-dark text-primary text-sm">src/app/</code> and are organized by section.</p>

        <h2 className="text-2xl font-bold text-dark dark:text-white pt-4">Customization</h2>
        <p>All colors, shadows, and radii are exposed as CSS variables in the theme files. Edit <code className="px-1.5 py-0.5 rounded bg-lightgray dark:bg-dark text-primary text-sm">default-colors.css</code> or <code className="px-1.5 py-0.5 rounded bg-lightgray dark:bg-dark text-primary text-sm">dark-colors.css</code> to rebrand the entire kit in minutes.</p>

        <blockquote className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground">
          "mtverse saved us 3 months of development time. The code quality is exceptional." — Sarah Johnson, CTO at StartupX
        </blockquote>
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-defaultBorder">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "Tailwind", "TypeScript"].map((t) => (
              <Badge key={t} variant="gray">{t}</Badge>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:share-bold" width={14} /> Share Article</Button>
        </div>
      </div>

      {/* Author card */}
      <div className="mt-8 rounded-xl bg-background border border-defaultBorder p-6 flex items-center gap-4">
        <Avatar className="h-16 w-16"><AvatarImage src="/images/profile/user-1.jpg" /><AvatarFallback>JD</AvatarFallback></Avatar>
        <div className="flex-1">
          <p className="font-semibold">John Doe</p>
          <p className="text-sm text-muted-foreground">Senior Developer at mtverse. Passionate about building tools that make developers' lives easier.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5"><Icon icon="solar:user-plus-rounded-bold" width={14} /> Follow</Button>
      </div>
    </article>
  </PageContainer>
);

export default FrontBlogDetails;
