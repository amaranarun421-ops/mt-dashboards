"use client";

import * as React from "react";
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Link2, Image as ImageIcon, Code, AlignLeft, AlignCenter, AlignRight, Undo, Redo } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FormEditor() {
  const [content, setContent] = React.useState("Welcome to Nexus Pro's rich text editor.\n\nThis editor supports formatting like bold, italic, and lists. You can write documentation, blog posts, or any content that needs formatting.\n\nKey features include:\n- Text formatting (bold, italic, underline)\n- Lists (ordered and unordered)\n- Links and images\n- Code blocks\n- Alignment options\n\nStart typing to create your content...");

  return (
    <div>
      <PageHeader breadcrumb={["Forms", "Rich Text Editor"]} title="Rich Text Editor" description="WYSIWYG content editing with formatting toolbar." />
      <Card className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-100 dark:border-gray-800 p-2">
          <Button variant="ghost" size="icon" className="h-8 w-8"><Undo className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Redo className="h-4 w-4" /></Button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8"><Bold className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Italic className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Underline className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Strikethrough className="h-4 w-4" /></Button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8"><AlignLeft className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><AlignCenter className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><AlignRight className="h-4 w-4" /></Button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8"><List className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><ListOrdered className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Quote className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Code className="h-4 w-4" /></Button>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8"><Link2 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><ImageIcon className="h-4 w-4" /></Button>
          <select className="ml-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-1.5 text-sm">
            <option>Paragraph</option><option>Heading 1</option><option>Heading 2</option><option>Heading 3</option><option>Code Block</option>
          </select>
        </div>
        {/* Editor */}
        <textarea
          value={content}
          onChange={e=>setContent(e.target.value)}
          className="w-full min-h-[400px] p-6 text-sm text-gray-800 dark:text-white/90 outline-none resize-y bg-white dark:bg-transparent"
          placeholder="Start writing..."
        />
        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 p-3 text-xs text-gray-400">
          <span>{content.length} characters · {content.split(/\s+/).length} words</span>
          <span>Auto-saved</span>
        </div>
      </Card>
    </div>
  );
}
