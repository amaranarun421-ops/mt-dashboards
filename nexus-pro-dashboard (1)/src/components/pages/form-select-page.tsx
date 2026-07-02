"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FormSelect() {
  const [multi, setMulti] = React.useState<string[]>(["react", "typescript"]);
  const options = ["React","TypeScript","Next.js","Tailwind","Node.js","Python","Go","Rust"];
  const toggle = (v: string) => setMulti(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  return (
    <div>
      <PageHeader breadcrumb={["Forms", "Select & Multiselect"]} title="Select & Multiselect" description="Advanced selection components with search and multi-select." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Single Select</h3>
          <div className="space-y-4">
            <div><Label>Country</Label><Select defaultValue="us"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="us">United States</SelectItem><SelectItem value="uk">United Kingdom</SelectItem><SelectItem value="ca">Canada</SelectItem><SelectItem value="au">Australia</SelectItem><SelectItem value="de">Germany</SelectItem></SelectContent></Select></div>
            <div><Label>Language</Label><Select defaultValue="en"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Spanish</SelectItem><SelectItem value="fr">French</SelectItem><SelectItem value="de">German</SelectItem><SelectItem value="ja">Japanese</SelectItem></SelectContent></Select></div>
            <div><Label>Timezone</Label><Select defaultValue="pst"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pst">Pacific (PT)</SelectItem><SelectItem value="est">Eastern (ET)</SelectItem><SelectItem value="cst">Central (CT)</SelectItem><SelectItem value="gmt">Greenwich (GMT)</SelectItem></SelectContent></Select></div>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Multi-Select (Custom)</h3>
          <Label>Technologies</Label>
          <div className="mt-1.5 rounded-lg border border-gray-200 dark:border-gray-800 p-2 min-h-[44px] flex flex-wrap gap-1.5 items-center">
            {multi.map(v => (
              <span key={v} className="inline-flex items-center gap-1 rounded-full bg-brand-50 dark:bg-brand-500/15 px-2.5 py-1 text-xs font-medium text-brand-500 dark:text-brand-400">
                {v}<button onClick={()=>toggle(v)} className="hover:text-brand-700"><X className="h-3 w-3" /></button>
              </span>
            ))}
            {multi.length === 0 && <span className="text-sm text-gray-400 px-2">Select technologies...</span>}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {options.filter(o => !multi.includes(o.toLowerCase().replace(".","").replace("#",""))).map(o => (
              <button key={o} onClick={()=>toggle(o.toLowerCase().replace(".","").replace("#",""))} className="rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-brand-300 hover:text-brand-500 transition">{o}</button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-400 mb-2">Selected: {multi.length} of {options.length}</p>
            <button onClick={()=>setMulti([])} className="text-xs text-error-500 hover:underline">Clear all</button>
          </div>
        </Card>
      </div>
    </div>
  );
}
