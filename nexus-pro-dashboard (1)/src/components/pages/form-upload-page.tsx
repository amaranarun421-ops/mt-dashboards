"use client";

import * as React from "react";
import { Upload, FileText, Image, Film, X, CheckCircle2, File } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FormUpload() {
  const [files, setFiles] = React.useState([
    { name: "project-brief.pdf", size: "2.4 MB", progress: 100, type: "pdf" },
    { name: "design-mockups.fig", size: "8.1 MB", progress: 65, type: "fig" },
    { name: "demo-video.mp4", size: "42 MB", progress: 28, type: "video" },
  ]);

  const typeIcons: Record<string, any> = { pdf: FileText, fig: File, video: Film, image: Image };

  return (
    <div>
      <PageHeader breadcrumb={["Forms", "File Upload"]} title="File Upload" description="Drag-and-drop file uploads with progress tracking." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Upload Area</h3>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 text-center hover:border-brand-400 transition cursor-pointer">
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15 mb-4"><Upload className="h-7 w-7" /></div>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">Drop files here or click to browse</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Supports: PDF, DOCX, PNG, JPG, MP4 (max 100MB)</p>
            <Button variant="outline" size="sm" className="mt-4">Choose Files</Button>
          </div>
        </Card>
        <Card className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Upload Progress</h3>
          <div className="space-y-3">
            {files.map((f, i) => {
              const Icon = typeIcons[f.type] || File;
              return (
                <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"><Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90 truncate">{f.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{f.size}</p>
                    </div>
                    {f.progress === 100 ? <CheckCircle2 className="h-5 w-5 text-success-500" /> : <button onClick={()=>setFiles(prev=>prev.filter((_,idx)=>idx!==i))}><X className="h-4 w-4 text-gray-400" /></button>}
                  </div>
                  {f.progress < 100 && (
                    <div className="mt-2"><div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-brand-500 rounded-full transition-all" style={{width: `${f.progress}%`}} /></div><p className="text-xs text-gray-400 mt-1">{f.progress}% uploaded</p></div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
