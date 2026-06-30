"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar, AvatarGroup } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";
import { inputClass } from "@/components/shared/form-section";
import {
  ChatIcon,
  EditIcon,
  PhoneIcon,
  WrenchIcon,
  BookIcon,
  StarIcon,
  UsersIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  chatChannels,
  chatContacts,
  chatMessages,
  chatSharedFiles,
  type ChatContact,
} from "@/data/apps/chat";

const statusTone: Record<ChatContact["status"], string> = {
  online: "bg-primary",
  away: "bg-accent",
  busy: "bg-red",
  offline: "bg-gray-4",
};

export default function ChatPage() {
  const [activeId, setActiveId] = useState(chatContacts[0].id);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [query, setQuery] = useState("");

  const filteredContacts = useMemo(() => {
    return chatContacts.filter((c) =>
      query.trim() === ""
        ? true
        : (c.name + c.role).toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const active = chatContacts.find((c) => c.id === activeId) || chatContacts[0];

  function send() {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m${prev.length + 1}`,
        from: "Me",
        text: draft.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mine: true,
      },
    ]);
    setDraft("");
  }

  return (
    <div>
      <PageHeader
        title="Chat"
        description="Real-time messaging with your Helios Pro team — DMs, channels and shared files."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "Chat" }]}
        actions={
          <>
            <Button variant="outline" size="sm">
              <PhoneIcon className="size-4" />
              Start call
            </Button>
            <Button variant="primary" size="sm">
              <EditIcon className="size-4" />
              New message
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
        {/* Contacts list */}
        <Card padded={false} className="hidden lg:flex lg:min-h-[640px] lg:flex-col">
          <div className="border-b border-stroke p-4 dark:border-dark-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people…"
              className={inputClass}
            />
            <div className="mt-3 flex flex-wrap gap-1">
              {chatChannels.map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-1 rounded-full bg-gray-2 px-2 py-0.5 text-[11px] font-medium text-dark-7 dark:bg-white/10 dark:text-dark-7"
                >
                  <span className="text-dark-5 dark:text-dark-6">#</span>
                  {c.name}
                  {c.unread > 0 && (
                    <span className="rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
                      {c.unread}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
            <span>Direct messages</span>
            <span>{filteredContacts.length}</span>
          </div>
          <ul className="helios-scroll flex-1 divide-y divide-stroke overflow-y-auto dark:divide-dark-3">
            {filteredContacts.map((c) => {
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    onClick={() => setActiveId(c.id)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                      isActive
                        ? "bg-primary-subtle/70 dark:bg-primary/10"
                        : "hover:bg-gray-2/70 dark:hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="relative">
                      <Avatar name={c.name} size="sm" />
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white dark:ring-gray-dark ${statusTone[c.status]}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-dark dark:text-white">
                          {c.name}
                        </p>
                        <span className="shrink-0 text-[11px] text-dark-5 dark:text-dark-6">
                          {c.time}
                        </span>
                      </div>
                      <p className="truncate text-xs text-dark-5 dark:text-dark-6">
                        {c.lastMessage}
                      </p>
                    </div>
                    {c.unread ? (
                      <span className="ml-auto grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">
                        {c.unread}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Conversation */}
        <Card padded={false} className="flex min-h-[640px] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-stroke p-4 dark:border-dark-3">
            <div className="flex items-center gap-3">
              <Avatar name={active.name} size="md" />
              <div>
                <p className="text-sm font-semibold text-dark dark:text-white">{active.name}</p>
                <p className="text-xs text-dark-5 dark:text-dark-6">
                  {active.role} · <span className="capitalize">{active.status}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="iconSm" aria-label="call">
                <PhoneIcon className="size-4" />
              </Button>
              <Button variant="ghost" size="iconSm" aria-label="info">
                <WrenchIcon className="size-4" />
              </Button>
            </div>
          </div>

          <div className="helios-scroll flex-1 space-y-4 overflow-y-auto p-5">
            <div className="flex justify-center">
              <span className="rounded-full bg-gray-2 px-3 py-0.5 text-[11px] text-dark-5 dark:bg-white/10 dark:text-dark-6">
                Today
              </span>
            </div>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-end gap-2 ${m.mine ? "flex-row-reverse" : ""}`}
              >
                {!m.mine && <Avatar name={m.from} size="sm" />}
                <div className={`max-w-[78%] ${m.mine ? "items-end" : "items-start"} flex flex-col`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.mine
                        ? "rounded-br-sm bg-primary text-white"
                        : "rounded-bl-sm bg-gray-2 text-dark-7 dark:bg-white/[0.06] dark:text-dark-7"
                    }`}
                  >
                    {m.text}
                    {m.attachment && (
                      <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 p-2">
                        <span className="grid size-8 place-items-center rounded-md bg-white/20 text-white">
                          <ChatIcon className="size-4" />
                        </span>
                        <div>
                          <p className="text-xs font-medium text-white">{m.attachment.name}</p>
                          <p className="text-[10px] text-white/80">{m.attachment.size}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="mt-1 px-1 text-[10px] text-dark-5 dark:text-dark-6">
                    {m.mine ? "You" : m.from} · {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-stroke p-4 dark:border-dark-3">
            <div className="flex items-end gap-2">
              <Button variant="ghost" size="icon" aria-label="attach">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none"><path d="M21 10v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8a3 3 0 013-3h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M16 4l4 4-8 8H8v-4l8-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              </Button>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder={`Message ${active.name.split(" ")[0]}…`}
                className="flex-1 resize-none rounded-xl border border-stroke bg-white px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-dark-6 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:placeholder:text-dark-6"
              />
              <Button variant="primary" size="icon" onClick={send} aria-label="send">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l16-8-6 16-3-7-7-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>

        {/* Details side panel */}
        <Card padded={false} className="hidden lg:flex lg:min-h-[640px] lg:flex-col">
          <div className="border-b border-stroke p-5 text-center dark:border-dark-3">
            <Avatar name={active.name} size="xl" className="mx-auto" />
            <h3 className="mt-3 text-base font-semibold text-dark dark:text-white">{active.name}</h3>
            <p className="text-xs text-dark-5 dark:text-dark-6">{active.role}</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className={`size-2 rounded-full ${statusTone[active.status]}`} />
              <span className="text-xs capitalize text-dark-7 dark:text-dark-7">{active.status}</span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm">
                <PhoneIcon className="size-4" />
                Call
              </Button>
              <Button variant="soft" size="sm">
                <WrenchIcon className="size-4" />
                Mute
              </Button>
            </div>
          </div>

          <div className="helios-scroll flex-1 space-y-5 overflow-y-auto p-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                About
              </p>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-dark-5 dark:text-dark-6">Timezone</dt>
                  <dd className="text-dark dark:text-white">UTC+5:30</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-dark-5 dark:text-dark-6">Team</dt>
                  <dd className="text-dark dark:text-white">Engineering</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-dark-5 dark:text-dark-6">Status</dt>
                  <dd className="text-dark dark:text-white">Available</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Shared files
              </p>
              <ul className="space-y-2">
                {chatSharedFiles.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center gap-2 rounded-lg border border-stroke p-2 dark:border-dark-3"
                  >
                    <span className="grid size-8 place-items-center rounded-md bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                      <BookIcon className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-dark dark:text-white">{f.name}</p>
                      <p className="text-[10px] text-dark-5 dark:text-dark-6">
                        {f.size} · {f.from}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Shared groups
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-stroke p-2 dark:border-dark-3">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-md bg-violet-subtle text-violet dark:bg-violet/15 dark:text-violet-light">
                      <UsersIcon className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-dark dark:text-white">#engineering</p>
                      <p className="text-[10px] text-dark-5 dark:text-dark-6">12 members</p>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">4 new</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-stroke p-2 dark:border-dark-3">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-md bg-accent-subtle text-accent-dark dark:bg-accent/15 dark:text-accent-light">
                      <StarIcon className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-dark dark:text-white">#leadership</p>
                      <p className="text-[10px] text-dark-5 dark:text-dark-6">6 members</p>
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">—</Badge>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-2/60 p-3 dark:bg-white/[0.03]">
              <p className="text-xs font-medium text-dark dark:text-white">Pin a message</p>
              <p className="mt-1 text-[11px] text-dark-5 dark:text-dark-6">
                Pinned messages appear at the top of the conversation for everyone.
              </p>
              <EmptyState
                className="py-4"
                size="sm"
                title="No pinned messages"
                description="Drag a message here or click the pin icon."
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
