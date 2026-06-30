"use client";

import * as React from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import {
  Bold, Italic, Underline, Strikethrough, List, ListOrdered, Quote, Code,
  Link as LinkIcon, Image, Heading1, Heading2, Heading3, Undo, Redo,
  Check, Eye, Pencil, Download, Copy, Trash, FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { PageHeader, SectionCard } from "@/components/mtv/primitives";

const defaultContent = `# Q4 Product Update

Welcome to the **December release** of MTVerse. This quarter we shipped _12 new dashboards_, 8 enterprise pages, and 24 UI library showcase pages.

## Highlights

- **Charts library**: added radar and radial chart support
- _Performance_: 40% faster initial load
- 100% type-safe with TypeScript 5

### Code example

\`\`\`tsx
import { RadarChart } from "@/components/charts";

<RadarChart data={data} xKey="metric" />
\`\`\`

> Tip: press \`⌘K\` anywhere to open the command palette.

### Links and more

Read the [full changelog](https://mtverse.io/changelog) or visit our [docs](https://docs.mtverse.io).

1. First priority
2. Second priority
3. Third priority

---

Thanks for using MTVerse!
`;

const toolbarGroups = [
  {
    items: [
      { icon: Undo, label: "Undo", action: () => toast.info("Undo") },
      { icon: Redo, label: "Redo", action: () => toast.info("Redo") },
    ],
  },
  {
    items: [
      { icon: Heading1, label: "H1", action: (r: RefApi) => r.wrap("# ") },
      { icon: Heading2, label: "H2", action: (r: RefApi) => r.wrap("## ") },
      { icon: Heading3, label: "H3", action: (r: RefApi) => r.wrap("### ") },
    ],
  },
  {
    items: [
      { icon: Bold, label: "Bold", action: (r: RefApi) => r.wrap("**", "**") },
      { icon: Italic, label: "Italic", action: (r: RefApi) => r.wrap("_", "_") },
      { icon: Strikethrough, label: "Strike", action: (r: RefApi) => r.wrap("~~", "~~") },
      { icon: Code, label: "Code", action: (r: RefApi) => r.wrap("`", "`") },
    ],
  },
  {
    items: [
      { icon: List, label: "Bullet list", action: (r: RefApi) => r.wrap("- ") },
      { icon: ListOrdered, label: "Numbered list", action: (r: RefApi) => r.wrap("1. ") },
      { icon: Quote, label: "Quote", action: (r: RefApi) => r.wrap("> ") },
    ],
  },
  {
    items: [
      { icon: LinkIcon, label: "Link", action: (r: RefApi) => r.wrap("[", "](https://)") },
      { icon: Image, label: "Image", action: (r: RefApi) => r.wrap("![alt](", ")") },
    ],
  },
];

type RefApi = {
  wrap: (prefix: string, suffix?: string) => void;
};

export default function RichTextPage() {
  const [content, setContent] = React.useState(defaultContent);
  const [mode, setMode] = React.useState("write");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const refApi: RefApi = React.useMemo(() => ({
    wrap: (prefix: string, suffix?: string) => {
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const selected = content.slice(start, end);
      const newText = content.slice(0, start) + prefix + selected + (suffix ?? "") + content.slice(end);
      setContent(newText);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + prefix.length, end + (suffix?.length ?? 0) + prefix.length);
      }, 0);
    },
  }), [content]);

  const charCount = content.length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const lineCount = content.split("\n").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rich Text Editor"
        description="Markdown editor with live preview, formatting toolbar and document stats."
        breadcrumbs={[{ label: "UI Library" }, { label: "Rich Text" }]}
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => { navigator.clipboard?.writeText(content); toast.success("Copied to clipboard"); }}>
              <Copy className="size-4 mr-1.5" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Downloaded as .md")}>
              <Download className="size-4 mr-1.5" /> Export
            </Button>
            <Button size="sm" onClick={() => toast.success("Document saved")}>
              <Check className="size-4 mr-1.5" /> Save
            </Button>
          </>
        }
      />

      <SectionCard
        title="Markdown Editor"
        description="Write Markdown on the left, see formatted preview on the right"
        actions={
          <Tabs value={mode} onValueChange={setMode}>
            <TabsList className="h-7">
              <TabsTrigger value="write" className="text-xs h-5"><Pencil className="size-3 mr-1" /> Write</TabsTrigger>
              <TabsTrigger value="preview" className="text-xs h-5"><Eye className="size-3 mr-1" /> Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        }
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 pb-3 mb-3 border-b border-border">
          {toolbarGroups.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div className="h-5 w-px bg-border mx-1" />}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => item.action(refApi)}
                    title={item.label}
                  >
                    <Icon className="size-3.5" />
                  </Button>
                );
              })}
            </React.Fragment>
          ))}
          <div className="flex-1" />
          <Badge variant="outline" className="text-[10px] gap-1">
            <FileText className="size-3" /> Markdown
          </Badge>
        </div>

        <Tabs value={mode} onValueChange={setMode}>
          <TabsContent value="write" className="mt-0">
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
              className="font-mono text-sm resize-none focus-visible:ring-0 border-0"
              placeholder="Start writing in Markdown…"
            />
          </TabsContent>
          <TabsContent value="preview" className="mt-0">
            <div className="prose prose-sm max-w-none min-h-[400px] p-4 rounded-md border border-border bg-muted/20 overflow-auto">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold mb-3 mt-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold mb-2 mt-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-3">{children}</h3>,
                  p: ({ children }) => <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1 text-sm text-muted-foreground">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1 text-sm text-muted-foreground">{children}</ol>,
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  code: ({ children, className }) => className ? (
                    <code className={cn("block bg-muted p-3 rounded-md text-xs font-mono overflow-x-auto my-2", className)}>{children}</code>
                  ) : (
                    <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-primary">{children}</code>
                  ),
                  blockquote: ({ children }) => <blockquote className="border-l-2 border-primary pl-3 italic text-muted-foreground my-3 text-sm">{children}</blockquote>,
                  a: ({ children, href }) => <a href={href} className="text-primary underline hover:no-underline">{children}</a>,
                  hr: () => <hr className="border-border my-4" />,
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer with stats */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>{wordCount} words</span>
            <span>·</span>
            <span>{charCount} chars</span>
            <span>·</span>
            <span>{lineCount} lines</span>
            <span>·</span>
            <span>~{Math.ceil(wordCount / 200)} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] gap-1">
              <span className="size-1.5 rounded-full bg-success" /> Auto-saved
            </Badge>
            <Button variant="ghost" size="sm" className="text-destructive h-7" onClick={() => { setContent(""); toast.info("Editor cleared"); }}>
              <Trash className="size-3 mr-1" /> Clear
            </Button>
          </div>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Mini Editor" description="Compact single-line markdown editor">
          <div className="space-y-2">
            <div className="flex items-center gap-1 pb-2 border-b border-border">
              {[Bold, Italic, LinkIcon].map((Icon, i) => (
                <Button key={i} variant="ghost" size="icon" className="size-7"><Icon className="size-3" /></Button>
              ))}
            </div>
            <Textarea rows={3} placeholder="Quick note in Markdown…" className="font-mono text-xs resize-none" />
            <p className="text-[10px] text-muted-foreground">Supports **bold**, _italic_, [links](url) and `code`.</p>
          </div>
        </SectionCard>

        <SectionCard title="Markdown Reference" description="Common syntax cheat sheet">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { syntax: "# Heading 1", result: "Large title" },
              { syntax: "## Heading 2", result: "Medium title" },
              { syntax: "**bold**", result: "bold text" },
              { syntax: "_italic_", result: "italic text" },
              { syntax: "`code`", result: "inline code" },
              { syntax: "[text](url)", result: "hyperlink" },
              { syntax: "- item", result: "bullet item" },
              { syntax: "> quote", result: "blockquote" },
            ].map((r) => (
              <div key={r.syntax} className="rounded-md border border-border p-2">
                <p className="font-mono text-[10px] text-primary">{r.syntax}</p>
                <p className="text-muted-foreground mt-0.5">→ {r.result}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
