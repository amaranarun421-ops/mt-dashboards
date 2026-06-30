"use client";
import { useState, useMemo } from "react";
import { Card, Badge, Button, SearchInput, EmptyState } from "@/components/ui";
import { FAQ } from "@/data/mock";
import { cn } from "@/lib/utils";
import { LifeBuoy, MessageCircle, BookOpen, ChevronDown, Inbox, Headphones } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All topics", icon: BookOpen },
  { id: "licensing", label: "Licensing", icon: BookOpen },
  { id: "tech", label: "Technical", icon: BookOpen },
  { id: "design", label: "Design", icon: BookOpen },
  { id: "support", label: "Support", icon: BookOpen },
] as const;

const TAGS: Record<string, string[]> = {
  "What does the Nimbus Pro license include?": ["licensing"],
  "Can I use Nimbus Pro for client projects?": ["licensing"],
  "Does Nimbus Pro support dark mode?": ["design"],
  "Which browsers are supported?": ["tech"],
  "Can I change the primary color?": ["design"],
  "Is the codebase TypeScript?": ["tech"],
};

function categorize(q: string): string[] {
  return TAGS[q] ?? ["support"];
}

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ
      .map((item, idx) => ({ item, idx, tags: categorize(item.q) }))
      .filter(({ item, tags }) => {
        const matchCat = activeCat === "all" || tags.includes(activeCat);
        const matchQ = q === "" ||
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q);
        return matchCat && matchQ;
      });
  }, [query, activeCat]);

  return (
    <div className="space-y-10">
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-12 text-center dark:border-gray-800 dark:bg-gray-900 sm:px-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 gradient-bg-soft" />
        <div className="relative">
          <Badge tone="brand" variant="soft" className="mb-4">
            <LifeBuoy className="h-3 w-3" /> Help & FAQs
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-300">
            Browse common questions or search for a specific topic. Can&apos;t find it? Reach out
            and we will get back within one business day.
          </p>
          <div className="mx-auto mt-6 max-w-xl">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search FAQs..."
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ============ Category pills ============ */}
      <section className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          const active = activeCat === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                active
                  ? "bg-brand-500 text-white shadow-theme-sm"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:text-brand-600 hover:ring-brand-300 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800 dark:hover:text-brand-400"
              )}
            >
              <Icon className="h-4 w-4" /> {c.label}
            </button>
          );
        })}
      </section>

      {/* ============ Accordion ============ */}
      <section className="mx-auto max-w-3xl">
        {filtered.length === 0 ? (
          <Card>
            <EmptyState
              icon={Inbox}
              title="No matching FAQs"
              description="Try a different keyword or browse another category."
              action={<Button variant="outline" onClick={() => { setQuery(""); setActiveCat("all"); }}>Reset filters</Button>}
            />
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map(({ item, idx }) => {
              const open = openIdx === idx;
              return (
                <Card key={idx} className="overflow-hidden p-0">
                  <button
                    onClick={() => setOpenIdx(open ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-gray-400 transition-transform",
                        open && "rotate-180 text-brand-500"
                      )}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.a}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* ============ Contact CTA ============ */}
      <section>
        <Card className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Still have questions?
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Our support team replies within one business day, every day.
              </p>
            </div>
          </div>
          <Button className="shrink-0">
            <MessageCircle className="h-4 w-4" /> Contact support
          </Button>
        </Card>
      </section>
    </div>
  );
}
