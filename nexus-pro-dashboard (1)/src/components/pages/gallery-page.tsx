"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video, FileText, Download, Eye, Heart, MoreHorizontal, Filter } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const media = [
  { type: "image", title: "Product Launch Photo", size: "4.2 MB", views: 1284, likes: 84, color: "from-blue-400 to-purple-500" },
  { type: "image", title: "Team Offsite 2026", size: "8.1 MB", views: 892, likes: 142, color: "from-orange-400 to-pink-500" },
  { type: "video", title: "Demo Recording", size: "142 MB", views: 2840, likes: 218, color: "from-green-400 to-blue-500" },
  { type: "image", title: "Office Workspace", size: "3.8 MB", views: 642, likes: 56, color: "from-yellow-400 to-orange-500" },
  { type: "image", title: "Brand Assets Pack", size: "12 MB", views: 1840, likes: 98, color: "from-purple-400 to-pink-500" },
  { type: "video", title: "Customer Testimonial", size: "88 MB", views: 1620, likes: 184, color: "from-red-400 to-yellow-500" },
  { type: "image", title: "Conference Booth", size: "5.4 MB", views: 720, likes: 62, color: "from-teal-400 to-green-500" },
  { type: "image", title: "Product Mockup", size: "2.8 MB", views: 1140, likes: 124, color: "from-indigo-400 to-purple-500" },
];

const typeIcons: Record<string, any> = { image: ImageIcon, video: Video };

export function Gallery() {
  return (
    <div>
      <PageHeader breadcrumb={["Pages", "Gallery"]} title="Media Gallery" description="Browse and manage your visual assets." actions={<><Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> Filter</Button><Button size="sm">Upload</Button></>} />
      <div className="mb-4 flex gap-2">
        {["All", "Images", "Videos", "Documents"].map((f, i) => (
          <button key={f} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${i === 0 ? "bg-brand-500 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"}`}>{f}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {media.map((m, i) => {
          const Icon = typeIcons[m.type] || FileText;
          return (
            <motion.div key={i} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay: i*0.04}}>
              <Card className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 cursor-pointer">
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                  <Icon className="h-12 w-12 text-white/80" />
                  <div className="absolute top-2 right-2"><span className="rounded-full bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur">{m.type}</span></div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white"><Eye className="h-4 w-4" /></button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white"><Download className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">{m.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">{m.size}</span>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{m.views}</span>
                      <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{m.likes}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
