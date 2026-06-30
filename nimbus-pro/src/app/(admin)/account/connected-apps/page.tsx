"use client";
import { useState } from "react";
import { PageHeader, Card, StatCard, Badge, Button, SearchInput } from "@/components/ui";
import { CONNECTED_APPS } from "@/data/mock";
import { cn } from "@/lib/utils";
import { Check, Plus, RefreshCw, Settings2, Zap, Grid, Layers } from "lucide-react";

const TONE_BG: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
};

export default function ConnectedAppsPage() {
  const [apps, setApps] = useState(CONNECTED_APPS.map((a) => ({ ...a })));
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");

  const categories = Array.from(new Set(apps.map((a) => a.category)));
  const filtered = apps.filter((a) => {
    const s = !search.trim() ? true : a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    const c = cat === "all" ? true : a.category === cat;
    return s && c;
  });

  const connectedCount = apps.filter((a) => a.connected).length;
  const toggle = (id: string) => {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, connected: !a.connected } : a));
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Connected Apps"
        description="Integrate Nimbus Pro with your favourite tools to streamline workflows."
        breadcrumbs={[{ label: "Account" }, { label: "Connected Apps" }]}
        actions={<Button variant="secondary"><RefreshCw className="h-4 w-4" /> Sync all</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Connected" value={connectedCount} delta="active integrations" deltaTone="up" icon={Check} iconTone="success" />
        <StatCard label="Available" value={apps.length - connectedCount} delta="ready to connect" deltaTone="neutral" icon={Plus} iconTone="brand" />
        <StatCard label="Categories" value={categories.length} delta="across integrations" deltaTone="neutral" icon={Grid} iconTone="purple" />
        <StatCard label="Last Sync" value="2m" delta="all healthy" deltaTone="up" icon={RefreshCw} iconTone="warning" />
      </div>

      {/* Filter bar */}
      <Card className="p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput value={search} onChange={setSearch} placeholder="Search integrations..." className="w-full sm:max-w-xs" />
          <div className="flex flex-wrap items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setCat("all")}
              className={cn("rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors",
                cat === "all" ? "bg-brand-500 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              )}
            >All</button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn("rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors",
                  cat === c ? "bg-brand-500 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                )}
              >{c}</button>
            ))}
          </div>
        </div>
      </Card>

      {/* Grid of integration cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((a) => (
          <Card key={a.id} hover className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-2xl", TONE_BG[a.color])}>
                  {a.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{a.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{a.category}</p>
                </div>
              </div>
              {a.connected ? (
                <Badge tone="success" variant="soft" dot>Connected</Badge>
              ) : (
                <Badge tone="gray" variant="soft" dot>Available</Badge>
              )}
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{a.desc}</p>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
              {a.connected ? (
                <>
                  <Button variant="outline" size="sm"><Settings2 className="h-3.5 w-3.5" /> Configure</Button>
                  <Button variant="ghost" size="sm" className="text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10" onClick={() => toggle(a.id)}>Disconnect</Button>
                </>
              ) : (
                <>
                  <span className="text-xs text-gray-400">Free to connect</span>
                  <Button size="sm" onClick={() => toggle(a.id)}><Zap className="h-3.5 w-3.5" /> Connect</Button>
                </>
              )}
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card className="col-span-full p-10 text-center">
            <Layers className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600" />
            <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">No integrations found</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Try a different search or category filter.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
