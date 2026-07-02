import * as React from "react";
import { Bell, Search, Settings, Heart, Star, Bookmark, Share2, Download, Info } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function UiTooltips() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Elements", "Tooltips & Popovers"]} title="Tooltips & Popovers" description="Contextual information overlays for interactive elements." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Tooltip Positions</h3>
          <div className="flex flex-wrap gap-4">
            <TooltipProvider>
              {[
                { icon: Bell, label: "Notifications", side: "top" },
                { icon: Search, label: "Search", side: "right" },
                { icon: Settings, label: "Settings", side: "bottom" },
                { icon: Heart, label: "Favorites", side: "left" },
                { icon: Star, label: "Star this", side: "top" },
                { icon: Bookmark, label: "Bookmark", side: "top" },
              ].map((t, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild><Button variant="outline" size="icon"><t.icon className="h-4 w-4" /></Button></TooltipTrigger>
                  <TooltipContent side={t.side as any}>{t.label}</TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Info Tooltips</h3>
          <div className="space-y-3">
            {[
              { label: "API Rate Limit", desc: "Maximum requests per minute" },
              { label: "Storage Quota", desc: "Total disk space available" },
              { label: "Team Members", desc: "Active users in workspace" },
            ].map(t => (
              <div key={t.label} className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">{t.label}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild><button className="text-gray-400 hover:text-brand-500"><Info className="h-3.5 w-3.5" /></button></TooltipTrigger>
                    <TooltipContent>{t.desc}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Popover (Click)</h3>
          <div className="flex gap-3">
            <Popover>
              <PopoverTrigger asChild><Button variant="outline" className="gap-1.5"><Share2 className="h-4 w-4" /> Share</Button></PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Share this page</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Copy Link</Button>
                    <Button variant="outline" size="sm" className="flex-1">Email</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild><Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button></PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-1">
                  <button className="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5">Export as PDF</button>
                  <button className="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5">Export as CSV</button>
                  <button className="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/5">Export as JSON</button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-base font-semibold text-gray-800 dark:text-white/90">Rich Tooltips</h3>
          <div className="flex gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild><Button size="icon" variant="outline"><Star className="h-4 w-4" /></Button></TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div>
                    <p className="font-semibold">Add to favorites</p>
                    <p className="text-xs opacity-80 mt-1">Save this item to your favorites for quick access later.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild><Button size="icon" variant="outline"><Info className="h-4 w-4" /></Button></TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div>
                    <p className="font-semibold">Need help?</p>
                    <p className="text-xs opacity-80 mt-1">Check our documentation or contact support for assistance.</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </div>
    </div>
  );
}
