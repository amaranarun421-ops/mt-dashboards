import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";

export function UiTypographyPage() {
  return (
    <div>
      <PageHeader breadcrumb={["UI Components", "Typography"]} title="Typography" description="Font scale, weights, and text styles." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6"><h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Headings</h3><div className="space-y-3"><h1 className="text-4xl font-bold">Heading 1</h1><h2 className="text-3xl font-bold">Heading 2</h2><h3 className="text-2xl font-bold">Heading 3</h3><h4 className="text-xl font-bold">Heading 4</h4><h5 className="text-lg font-bold">Heading 5</h5><h6 className="text-base font-bold">Heading 6</h6></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Body Text</h3><div className="space-y-3"><p className="text-xs">Extra Small · 12px — Used for captions and metadata</p><p className="text-sm">Small · 14px — Used for secondary text and labels</p><p className="text-base">Base · 16px — Default body text size</p><p className="text-lg">Large · 18px — For emphasized paragraphs</p><p className="text-xl">Extra Large · 20px — For lead paragraphs</p></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Weights</h3><div className="space-y-2"><p className="font-light">Light (300) — The quick brown fox</p><p className="font-normal">Normal (400) — The quick brown fox</p><p className="font-medium">Medium (500) — The quick brown fox</p><p className="font-semibold">Semibold (600) — The quick brown fox</p><p className="font-bold">Bold (700) — The quick brown fox</p><p className="font-extrabold">Extrabold (800) — The quick brown fox</p></div></Card>
        <Card className="p-6"><h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Styles</h3><div className="space-y-3"><p className="text-gray-500 dark:text-gray-400">Muted text for secondary information</p><p className="text-brand-500">Primary colored text for emphasis</p><p className="text-success-600 dark:text-success-500">Success colored text for positive states</p><p className="text-warning-600 dark:text-orange-400">Warning colored text for caution</p><p className="text-error-600 dark:text-error-500">Destructive colored text for errors</p><p className="font-mono text-sm">Monospace for code snippets</p><p><span className="line-through text-gray-500 dark:text-gray-400">Strikethrough</span> · <span className="underline">Underline</span> · <span className="font-italic">Italic</span></p><blockquote className="border-l-2 border-brand-500 pl-4 italic text-gray-500 dark:text-gray-400">Blockquote — design is not just what it looks like and feels like. Design is how it works.</blockquote></div></Card>
      </div>
    </div>
  );
}
