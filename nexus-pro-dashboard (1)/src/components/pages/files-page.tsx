"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Folder, FileText, Image, Film, Music, Archive, MoreVertical, Upload, Search, Grid, List } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/common/status-badge";

const folders = [
  { name: "Documents", count: 248, size: "1.2 GB", color: "bg-brand-500/15 text-brand-500" },
  { name: "Images", count: 1240, size: "4.8 GB", color: "bg-blue-light-500/15 text-blue-light-500" },
  { name: "Videos", count: 84, size: "12.4 GB", color: "bg-warning-500/15 text-warning-600 dark:text-orange-400" },
  { name: "Audio", count: 142, size: "820 MB", color: "bg-success-500/15 text-success-600 dark:text-success-500" },
  { name: "Archives", count: 28, size: "2.1 GB", color: "bg-error-500/15 text-error-600 dark:text-error-500" },
  { name: "Projects", count: 18, size: "640 MB", color: "bg-brand-500/15 text-brand-500" },
];

const files = [
  { name: "Q3-Roadmap-v4.pdf", type: "pdf", size: "2.4 MB", modified: "2 hours ago", shared: 3 },
  { name: "Brand-Guidelines.fig", type: "fig", size: "8.1 MB", modified: "5 hours ago", shared: 8 },
  { name: "Product-Demo.mp4", type: "video", size: "142 MB", modified: "Yesterday", shared: 12 },
  { name: "Team-Photo.jpg", type: "image", size: "4.2 MB", modified: "2 days ago", shared: 24 },
  { name: "Financial-Model.xlsx", type: "sheet", size: "1.8 MB", modified: "3 days ago", shared: 4 },
  { name: "Source-Archive.zip", type: "archive", size: "84 MB", modified: "Last week", shared: 0 },
  { name: "Onboarding-Deck.pptx", type: "slides", size: "12 MB", modified: "Last week", shared: 18 },
  { name: "Logo-Assets", type: "folder", size: "—", modified: "Last week", shared: 6 },
];

const typeIcons: Record<string, any> = {
  pdf: { icon: FileText, color: "bg-error-500/15 text-error-600 dark:text-error-500" },
  fig: { icon: FileText, color: "bg-brand-500/15 text-brand-500" },
  video: { icon: Film, color: "bg-warning-500/15 text-warning-600 dark:text-orange-400" },
  image: { icon: Image, color: "bg-blue-light-500/15 text-blue-light-500" },
  sheet: { icon: FileText, color: "bg-success-500/15 text-success-600 dark:text-success-500" },
  archive: { icon: Archive, color: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400" },
  slides: { icon: FileText, color: "bg-warning-500/15 text-warning-600 dark:text-orange-400" },
  folder: { icon: Folder, color: "bg-brand-500/15 text-brand-500" },
};

export function FilesPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={["Apps", "File Manager"]}
        title="My Files"
        description="6 folders · 1,760 files · 21.8 GB used of 100 GB"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5"><Grid className="h-4 w-4" /></Button>
            <Button size="sm" className="gap-1.5"><Upload className="h-4 w-4" /> Upload</Button>
          </>
        }
      />
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input placeholder="Search files and folders..." className="pl-9" />
        </div>
      </div>

      {/* Folders */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {folders.map((f, i) => (
          <motion.div key={f.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="card-hover cursor-pointer p-4 text-center">
              <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                <Folder className="h-6 w-6" />
              </div>
              <p className="truncate text-sm font-semibold">{f.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{f.count} files</p>
              <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">{f.size}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Storage bar */}
      <Card className="mb-4 p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">Storage Usage</p>
          <span className="text-xs text-gray-500 dark:text-gray-400">21.8 GB of 100 GB</span>
        </div>
        <div className="flex h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div className="bg-brand-500" style={{ width: "12%" }} />
          <div className="bg-blue-light-500" style={{ width: "5%" }} />
          <div className="bg-warning-500" style={{ width: "3%" }} />
          <div className="bg-success-500" style={{ width: "2%" }} />
        </div>
        <div className="mt-2 flex gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-500" /> Documents</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-light-500" /> Images</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning-500" /> Videos</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success-500" /> Other</span>
        </div>
      </Card>

      {/* Files table */}
      <Card className="overflow-hidden p-0">
        <div className="border-b border-border/60 p-4">
          <h3 className="text-base font-semibold">Recent Files</h3>
        </div>
        <div className="divide-y divide-border/50">
          {files.map((f, i) => {
            const TypeInfo = typeIcons[f.type] || typeIcons.folder;
            const Icon = TypeInfo.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="group flex items-center gap-3 p-3 transition hover:bg-gray-100 dark:bg-gray-800/30">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${TypeInfo.color}`}><Icon className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{f.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{f.size} · {f.modified}</p>
                </div>
                {f.shared > 0 && (
                  <div className="hidden items-center gap-1 text-xs text-gray-500 dark:text-gray-400 sm:flex">
                    <div className="flex -space-x-1.5">
                      {[0, 1, 2].slice(0, Math.min(3, f.shared)).map((idx) => (
                        <div key={idx} className="h-5 w-5 rounded-full border-2 border-card bg-gray-100 dark:bg-gray-800" />
                      ))}
                    </div>
                    <span>{f.shared} shared</span>
                  </div>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100"><MoreVertical className="h-4 w-4" /></Button>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
