"use client";

import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { FormSection } from "@/components/shared/form-section";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { EditIcon } from "@/components/Layouts/sidebar/icons";

function classNames(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type Tool =
  | "bold"
  | "italic"
  | "underline"
  | "strikeThrough"
  | "insertUnorderedList"
  | "insertOrderedList"
  | "formatBlock-h2"
  | "formatBlock-h3"
  | "formatBlock-p"
  | "justifyLeft"
  | "justifyCenter"
  | "justifyRight"
  | "link";

const TOOL_GROUPS: { label: string; tools: { cmd: Tool; label: string; icon: React.ReactNode }[] }[] = [
  {
    label: "Block",
    tools: [
      { cmd: "formatBlock-p", label: "Paragraph", icon: <span className="text-xs font-semibold">¶</span> },
      { cmd: "formatBlock-h2", label: "Heading 2", icon: <span className="text-xs font-bold">H2</span> },
      { cmd: "formatBlock-h3", label: "Heading 3", icon: <span className="text-xs font-bold">H3</span> },
    ],
  },
  {
    label: "Inline",
    tools: [
      { cmd: "bold", label: "Bold", icon: <span className="text-xs font-bold">B</span> },
      { cmd: "italic", label: "Italic", icon: <span className="text-xs italic">I</span> },
      { cmd: "underline", label: "Underline", icon: <span className="text-xs underline">U</span> },
      { cmd: "strikeThrough", label: "Strikethrough", icon: <span className="text-xs line-through">S</span> },
    ],
  },
  {
    label: "Lists",
    tools: [
      { cmd: "insertUnorderedList", label: "Bullet list", icon: <ListIcon variant="ul" /> },
      { cmd: "insertOrderedList", label: "Numbered list", icon: <ListIcon variant="ol" /> },
    ],
  },
  {
    label: "Align",
    tools: [
      { cmd: "justifyLeft", label: "Align left", icon: <AlignIcon variant="left" /> },
      { cmd: "justifyCenter", label: "Align center", icon: <AlignIcon variant="center" /> },
      { cmd: "justifyRight", label: "Align right", icon: <AlignIcon variant="right" /> },
    ],
  },
  {
    label: "Insert",
    tools: [
      { cmd: "link", label: "Insert link", icon: <LinkIcon /> },
    ],
  },
];

function ListIcon({ variant }: { variant: "ul" | "ol" }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      {variant === "ul" ? (
        <>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="3.5" cy="6" r="1.5" fill="currentColor" />
          <circle cx="3.5" cy="12" r="1.5" fill="currentColor" />
          <circle cx="3.5" cy="18" r="1.5" fill="currentColor" />
        </>
      ) : (
        <>
          <line x1="9" y1="6" x2="21" y2="6" />
          <line x1="9" y1="12" x2="21" y2="12" />
          <line x1="9" y1="18" x2="21" y2="18" />
          <text x="1.5" y="9" fontSize="8" fill="currentColor" stroke="none">1.</text>
          <text x="1.5" y="15" fontSize="8" fill="currentColor" stroke="none">2.</text>
          <text x="1.5" y="21" fontSize="8" fill="currentColor" stroke="none">3.</text>
        </>
      )}
    </svg>
  );
}

function AlignIcon({ variant }: { variant: "left" | "center" | "right" }) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="3" y1="6" x2="21" y2="6" />
      {variant === "left" && <line x1="3" y1="12" x2="14" y2="12" />}
      {variant === "center" && <line x1="6" y1="12" x2="18" y2="12" />}
      {variant === "right" && <line x1="10" y1="12" x2="21" y2="12" />}
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function execCmd(cmd: Tool) {
  if (cmd === "link") {
    const url = typeof window !== "undefined" ? window.prompt("Link URL", "https://") : null;
    if (url) document.execCommand("createLink", false, url);
    return;
  }
  if (cmd.startsWith("formatBlock-")) {
    const tag = cmd.split("-")[1];
    document.execCommand("formatBlock", false, tag);
    return;
  }
  document.execCommand(cmd, false);
}

export default function RichTextEditorClient() {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<Set<string>>(new Set());
  const [wordCount, setWordCount] = useState(0);

  const refreshState = () => {
    const next = new Set<string>();
    if (document.queryCommandState("bold")) next.add("bold");
    if (document.queryCommandState("italic")) next.add("italic");
    if (document.queryCommandState("underline")) next.add("underline");
    if (document.queryCommandState("strikeThrough")) next.add("strikeThrough");
    if (document.queryCommandState("insertUnorderedList")) next.add("insertUnorderedList");
    if (document.queryCommandState("insertOrderedList")) next.add("insertOrderedList");
    if (document.queryCommandState("justifyLeft")) next.add("justifyLeft");
    if (document.queryCommandState("justifyCenter")) next.add("justifyCenter");
    if (document.queryCommandState("justifyRight")) next.add("justifyRight");
    setActive(next);
    if (editorRef.current) {
      const txt = editorRef.current.innerText || "";
      setWordCount(txt.trim() ? txt.trim().split(/\s+/).length : 0);
    }
  };

  useEffect(() => {
    document.addEventListener("selectionchange", refreshState);
    return () => document.removeEventListener("selectionchange", refreshState);
  }, []);

  const clearEditor = () => {
    if (editorRef.current) editorRef.current.innerHTML = "<p>Start writing…</p>";
    refreshState();
  };

  return (
    <div>
      <PageHeader
        title="Rich Text Editor"
        description="UI-only editor with a full toolbar — bold/italic/lists/headings/alignment/links."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Forms", href: "/forms/basic-inputs" },
          { label: "Rich Text Editor" },
        ]}
        actions={
          <Badge variant="accent" size="lg">
            <EditIcon className="size-4" /> UI-only
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* editor */}
        <div className="xl:col-span-2">
          <Card padded={false}>
            {/* toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b border-stroke p-2 dark:border-dark-3">
              {TOOL_GROUPS.map((group, gi) => (
                <div key={group.label} className="flex items-center gap-1">
                  {gi > 0 && <span className="mx-1 h-5 w-px bg-stroke dark:bg-dark-3" />}
                  {group.tools.map((t) => (
                    <button
                      key={t.cmd}
                      type="button"
                      title={t.label}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        execCmd(t.cmd);
                        refreshState();
                        editorRef.current?.focus();
                      }}
                      className={classNames(
                        "grid size-8 place-items-center rounded-md text-dark-7 transition hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-white/5",
                        active.has(t.cmd) && "bg-primary-subtle text-primary dark:bg-primary/15",
                      )}
                    >
                      {t.icon}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            {/* content */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={refreshState}
              onBlur={refreshState}
              className="helios-scroll min-h-[420px] max-h-[640px] overflow-y-auto p-5 text-sm text-dark outline-none dark:text-white"
              style={{ lineHeight: 1.7 }}
            >
              <h2>Welcome to Helios Pro</h2>
              <p>
                This is a <b>UI-only</b> rich-text editor built with a <code>contentEditable</code> surface
                and a toolbar that calls <code>document.execCommand</code>. It supports{" "}
                <i>inline formatting</i>, <u>headings</u>, ordered and unordered lists, alignment and links.
              </p>
              <p>
                Try selecting some text and clicking <b>Bold</b>, or place your cursor on a new line and
                click <b>H2</b> to turn it into a heading.
              </p>
              <ul>
                <li>Headings — H2, H3 and paragraph blocks</li>
                <li>Lists — bullets and numbered</li>
                <li>Alignment — left, center, right</li>
                <li>Links — prompt-driven</li>
              </ul>
            </div>
            {/* footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stroke px-5 py-2 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
              <span>{wordCount} words · auto-saved</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={clearEditor}>
                  Clear
                </Button>
                <Button variant="outline" size="sm">
                  Save draft
                </Button>
                <Button variant="primary" size="sm">
                  Publish
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* sidebar */}
        <div className="space-y-6">
          <FormSection title="Document" description="Lightweight metadata for the editor." columns={1}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Title</label>
              <input
                defaultValue="Q4 product launch announcement"
                className="w-full rounded-lg border border-stroke bg-white px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Slug</label>
              <input
                defaultValue="q4-product-launch"
                className="w-full rounded-lg border border-stroke bg-white px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">Tags</label>
              <div className="flex flex-wrap gap-1.5">
                {["product", "launch", "press"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-medium text-primary dark:bg-primary/15 dark:text-primary-light"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </FormSection>

          <Card>
            <CardHeader title="Toolbar reference" subtitle="What each button does." />
            <ul className="space-y-2 text-xs text-dark-5 dark:text-dark-6">
              {TOOL_GROUPS.map((g) => (
                <li key={g.label}>
                  <span className="font-semibold text-dark dark:text-white">{g.label}:</span>{" "}
                  {g.tools.map((t) => t.label).join(", ")}
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-lg bg-gray-2 p-2 text-xs text-dark-5 dark:bg-dark-2 dark:text-dark-6">
              Note: this editor is UI-only. In production you would pair it with a sanitizer and a
              real document model — the toolbar pattern shown here is portable.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
