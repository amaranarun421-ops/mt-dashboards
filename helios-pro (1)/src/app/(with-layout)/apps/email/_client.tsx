"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { inputClass } from "@/components/shared/form-section";
import {
  MailIcon,
  EditIcon,
  StarIcon,
  CheckIcon,
  FolderIcon,
} from "@/components/Layouts/sidebar/icons";
import { emailFolders, emails, type EmailFolder } from "@/data/apps/emails";

const folderIcon = (key: EmailFolder, active: boolean) => {
  const cls = `size-4 ${active ? "text-primary dark:text-primary-light" : "text-dark-5 dark:text-dark-6"}`;
  if (key === "Starred") return <StarIcon className={cls} />;
  if (key === "Drafts") return <EditIcon className={cls} />;
  if (key === "Archive") return <FolderIcon className={cls} />;
  return <MailIcon className={cls} />;
};

export default function EmailPage() {
  const [folder, setFolder] = useState<EmailFolder>("Inbox");
  const [selectedId, setSelectedId] = useState<string | null>(emails[0].id);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return emails.filter((e) => {
      if (folder === "Starred") return e.starred;
      if (folder === "Inbox") return e.folder === "Inbox";
      return e.folder === folder;
    }).filter((e) =>
      query.trim() === ""
        ? true
        : (e.subject + e.from.name + e.preview).toLowerCase().includes(query.toLowerCase()),
    );
  }, [folder, query]);

  const selected = emails.find((e) => e.id === selectedId) || filtered[0] || null;

  return (
    <div>
      <PageHeader
        title="Email"
        description="Inbox, threads and quick replies for your Helios Pro mailbox."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "Email" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Mark all read</Button>
            <Button variant="primary" size="sm">
              <EditIcon className="size-4" />
              Compose
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Folders / nav */}
        <Card padded={false} className="hidden lg:block">
          <div className="border-b border-stroke p-4 dark:border-dark-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
              Folders
            </p>
          </div>
          <nav className="p-2">
            {emailFolders.map((f) => {
              const active = folder === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFolder(f.key)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                      : "text-dark-7 hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {folderIcon(f.key, active)}
                    <span className="font-medium">{f.key}</span>
                  </span>
                  <Badge variant={active ? "primary" : "neutral"} size="sm">
                    {f.count}
                  </Badge>
                </button>
              );
            })}
          </nav>
          <div className="border-t border-stroke p-4 dark:border-dark-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
              Labels
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["engineering", "design", "security", "finance", "marketing", "support"].map((l) => (
                <span
                  key={l}
                  className="inline-flex items-center gap-1 rounded-full border border-stroke px-2 py-0.5 text-xs text-dark-7 dark:border-dark-3 dark:text-dark-7"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                  {l}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Message list */}
        <Card padded={false} className="flex min-h-[600px] flex-col">
          <div className="flex items-center gap-3 border-b border-stroke p-4 dark:border-dark-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mail…"
              className={inputClass}
            />
          </div>
          <div className="flex items-center justify-between border-b border-stroke px-4 py-2.5 dark:border-dark-3">
            <p className="text-sm font-semibold text-dark dark:text-white">
              {folder} <span className="text-dark-5 dark:text-dark-6">· {filtered.length}</span>
            </p>
            <Button variant="ghost" size="sm">Newest first</Button>
          </div>
          <ul className="helios-scroll max-h-[640px] flex-1 divide-y divide-stroke overflow-y-auto dark:divide-dark-3">
            {filtered.length === 0 ? (
              <li>
                <EmptyState
                  size="md"
                  icon={<MailIcon className="size-6" />}
                  title="No messages"
                  description="Try a different folder or search term."
                />
              </li>
            ) : (
              filtered.map((m) => {
                const active = selected?.id === m.id;
                return (
                  <li key={m.id}>
                    <button
                      onClick={() => setSelectedId(m.id)}
                      className={`flex w-full gap-3 px-4 py-3.5 text-left transition ${
                        active
                          ? "bg-primary-subtle/70 dark:bg-primary/10"
                          : "hover:bg-gray-2/70 dark:hover:bg-white/[0.03]"
                      }`}
                    >
                      <Avatar name={m.from.name} size="sm" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`truncate text-sm ${
                              m.unread
                                ? "font-semibold text-dark dark:text-white"
                                : "text-dark-7 dark:text-dark-7"
                            }`}
                          >
                            {m.from.name}
                          </p>
                          <span className="shrink-0 text-xs text-dark-5 dark:text-dark-6">{m.time}</span>
                        </div>
                        <p
                          className={`mt-0.5 truncate text-sm ${
                            m.unread
                              ? "font-medium text-dark dark:text-white"
                              : "text-dark-5 dark:text-dark-6"
                          }`}
                        >
                          {m.subject}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-dark-5 dark:text-dark-6">
                          {m.preview}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          {m.starred && (
                            <StarIcon className="size-3.5 text-accent" />
                          )}
                          {m.hasAttachment && (
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" className="text-dark-5 dark:text-dark-6">
                              <path d="M21 10v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8a3 3 0 013-3h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                              <path d="M16 4l4 4-8 8H8v-4l8-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                            </svg>
                          )}
                          {m.labels.slice(0, 1).map((l) => (
                            <span
                              key={l}
                              className="rounded-full bg-gray-2 px-1.5 py-0.5 text-[10px] font-medium text-dark-7 dark:bg-white/10 dark:text-dark-7"
                            >
                              {l}
                            </span>
                          ))}
                          {m.threadCount && m.threadCount > 1 && (
                            <span className="ml-auto inline-flex items-center gap-0.5 rounded-full bg-violet-subtle px-1.5 py-0.5 text-[10px] font-medium text-violet dark:bg-violet/15 dark:text-violet-light">
                              {m.threadCount} in thread
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </Card>

        {/* Preview pane */}
        <Card padded={false} className="hidden min-h-[600px] lg:flex lg:flex-col">
          {!selected ? (
            <EmptyState
              className="m-auto"
              size="md"
              icon={<MailIcon className="size-6" />}
              title="Select a message"
              description="Choose an email from the list to preview it here."
            />
          ) : (
            <>
              <div className="border-b border-stroke p-5 dark:border-dark-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-dark dark:text-white">
                      {selected.subject}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      <Badge variant="primary" size="sm">{selected.folder}</Badge>
                      {selected.labels.map((l) => (
                        <Badge key={l} variant="neutral" size="sm">{l}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="iconSm" aria-label="star">
                      <StarIcon className={`size-4 ${selected.starred ? "text-accent" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="iconSm" aria-label="archive">
                      <FolderIcon className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar name={selected.from.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-dark dark:text-white">
                      {selected.from.name}
                    </p>
                    <p className="truncate text-xs text-dark-5 dark:text-dark-6">
                      {selected.from.email} → {selected.to}
                    </p>
                  </div>
                  <span className="text-xs text-dark-5 dark:text-dark-6">{selected.time}</span>
                </div>
              </div>
              <div className="helios-scroll flex-1 overflow-y-auto p-5">
                <div className="prose prose-sm max-w-none whitespace-pre-line text-sm leading-relaxed text-dark-7 dark:text-dark-7">
                  {selected.body}
                </div>
                {selected.hasAttachment && (
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                      Attachments
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "q1-roadmap-v2.pdf", size: "1.8 MB", kind: "pdf" as const },
                        { name: "eng-hours-breakdown.xlsx", size: "118 KB", kind: "sheet" as const },
                      ].map((a) => (
                        <div
                          key={a.name}
                          className="flex items-center gap-2 rounded-lg border border-stroke bg-gray-2/60 p-2 dark:border-dark-3 dark:bg-white/[0.03]"
                        >
                          <span className="grid size-8 place-items-center rounded-md bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                            <FileTextIconSmall kind={a.kind} />
                          </span>
                          <div>
                            <p className="text-xs font-medium text-dark dark:text-white">{a.name}</p>
                            <p className="text-[10px] text-dark-5 dark:text-dark-6">{a.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-stroke p-4 dark:border-dark-3">
                <div className="rounded-xl border border-stroke bg-gray-2/40 p-3 dark:border-dark-3 dark:bg-white/[0.02]">
                  <textarea
                    rows={3}
                    placeholder="Reply to Priya…"
                    className="w-full resize-none bg-transparent text-sm text-dark outline-none placeholder:text-dark-6 dark:text-white"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="iconSm" aria-label="attach">
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M21 10v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8a3 3 0 013-3h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M16 4l4 4-8 8H8v-4l8-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                      </Button>
                      <Button variant="ghost" size="iconSm" aria-label="emoji">
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M9 14c1 1 5 1 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>
                      </Button>
                    </div>
                    <Button size="sm" variant="primary">
                      <CheckIcon className="size-4" />
                      Send reply
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

function FileTextIconSmall({ kind }: { kind: "pdf" | "sheet" }) {
  if (kind === "pdf") {
    return (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
        <path d="M5 3h9l5 5v13H5V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v5h5M8 13h8M8 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M5 3h9l5 5v13H5V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 17v-3M11 17v-5M14 17v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
