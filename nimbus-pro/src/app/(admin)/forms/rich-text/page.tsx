"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, Textarea, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Quote, Code, Link2, Image as ImageIcon, Heading1, Heading2, Heading3,
  Undo, Redo, Eye, Pencil, Check,
} from "lucide-react";

const TOOLBAR_GROUPS = [
  [
    { icon: Undo, label: "Undo" },
    { icon: Redo, label: "Redo" },
  ],
  [
    { icon: Heading1, label: "Heading 1" },
    { icon: Heading2, label: "Heading 2" },
    { icon: Heading3, label: "Heading 3" },
  ],
  [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Strikethrough, label: "Strikethrough" },
  ],
  [
    { icon: List, label: "Bullet list" },
    { icon: ListOrdered, label: "Numbered list" },
    { icon: Quote, label: "Quote" },
    { icon: Code, label: "Code block" },
  ],
  [
    { icon: Link2, label: "Insert link" },
    { icon: ImageIcon, label: "Insert image" },
  ],
];

const SAMPLE = `# Nimbus Pro — Release Notes v3.0

We're thrilled to ship the **biggest update yet** to Nimbus Pro. This release brings a complete rebrand, *100+ new pages*, and a refined design system.

## Highlights

1. **Complete rebrand** with new emerald→sky gradient identity
2. *100+ premium pages* across 11 categories
3. New \`design system\` with full token coverage
4. Theme customizer with 5 curated palettes

> "This is the most polished dashboard kit we've shipped." — Priya Iyer, Design Lead

### Code example

\`\`\`tsx
import { Card, Button } from "@/components/ui";

<Card>
  <Button>Click me</Button>
</Card>
\`\`\`

Stay tuned for more updates!`;

export default function RichTextPage() {
  const [content, setContent] = useState(SAMPLE);
  const [preview, setPreview] = useState(false);
  const [active, setActive] = useState<string[]>(["Bold", "Heading1"]);

  const charCount = content.length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const ToolbarButton = ({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) => {
    const on = active.includes(label);
    return (
      <button
        onClick={() => setActive((p) => on ? p.filter((x) => x !== label) : [...p, label])}
        title={label}
        aria-label={label}
        className={cn("flex h-8 w-8 items-center justify-center rounded-md transition-colors",
          on ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        )}
      >
        <Icon className="h-4 w-4" />
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Rich Text Editor"
        description="A polished editor UI with formatting toolbar, character count, and preview toggle."
        breadcrumbs={[{ label: "Forms" }, { label: "Rich Text" }]}
        actions={
          <>
            <Button variant="secondary" onClick={() => setPreview((v) => !v)}>
              {preview ? <><Pencil className="h-4 w-4" /> Edit</> : <><Eye className="h-4 w-4" /> Preview</>}
            </Button>
            <Button><Check className="h-4 w-4" /> Publish</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="p-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-1 border-b border-gray-100 p-2 dark:border-gray-800">
            {TOOLBAR_GROUPS.map((group, gi) => (
              <div key={gi} className="flex items-center gap-1">
                {gi > 0 && <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-800" />}
                {group.map((t) => <ToolbarButton key={t.label} {...t} />)}
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <Badge tone="brand" variant="soft">{wordCount} words</Badge>
            </div>
          </div>

          {/* Editor / Preview */}
          {preview ? (
            <div className="prose prose-sm max-w-none p-5 dark:prose-invert">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700 dark:text-gray-300">{content}</pre>
            </div>
          ) : (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[420px] rounded-none border-0 font-mono text-sm leading-relaxed focus:ring-0"
              placeholder="Start writing..."
            />
          )}

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <span>{charCount} characters</span>
              <span>·</span>
              <span>{wordCount} words</span>
              <span>·</span>
              <span>{readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success-500" /> Saved</span>
            </div>
          </div>
        </Card>

        <aside className="space-y-4">
          <Card>
            <CardHeader title="Document info" description="Metadata" />
            <CardBody className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Status</span><Badge tone="warning" variant="soft" dot>Draft</Badge></div>
              <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Visibility</span><span className="font-semibold text-gray-900 dark:text-white">Private</span></div>
              <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Author</span><span className="font-semibold text-gray-900 dark:text-white">Aaroh S.</span></div>
              <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Last saved</span><span className="font-semibold text-gray-900 dark:text-white">2m ago</span></div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Tags" />
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {["release-notes", "v3.0", "announcement"].map((t) => (
                  <Badge key={t} tone="brand" variant="soft">{t}</Badge>
                ))}
                <button className="rounded-md border border-dashed border-gray-300 px-2 py-0.5 text-xs font-medium text-gray-400 hover:border-brand-300 hover:text-brand-500 dark:border-gray-700">+ Add tag</button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Shortcuts" description="Markdown supported" />
            <CardBody className="space-y-2 text-xs">
              <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Bold</span><kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-gray-800">Cmd+B</kbd></div>
              <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Italic</span><kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-gray-800">Cmd+I</kbd></div>
              <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Link</span><kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-gray-800">Cmd+K</kbd></div>
              <div className="flex items-center justify-between"><span className="text-gray-500 dark:text-gray-400">Code</span><kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] dark:bg-gray-800">Cmd+E</kbd></div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  );
}
