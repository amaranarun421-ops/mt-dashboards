import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Timeline } from "@/components/shared/timeline";
import { ArrowLeftIcon, StarIcon, MailIcon, FolderIcon, EditIcon, CheckIcon } from "@/components/Layouts/sidebar/icons";
import { emails, emailThread } from "@/data/apps/emails";

export const metadata = {
  title: "Email Thread",
  description: "Single email view with full thread history.",
};

export default function EmailDetailPage() {
  const email = emails[0];

  return (
    <div>
      <PageHeader
        title="Email Thread"
        description="Conversation view — read the full back-and-forth without leaving the page."
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Apps" },
          { label: "Email", href: "/apps/email" },
          { label: "Thread" },
        ]}
        actions={
          <>
            <Link href="/apps/email">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="size-4" />
                Back to inbox
              </Button>
            </Link>
            <Button variant="primary" size="sm">
              <EditIcon className="size-4" />
              Reply all
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main thread */}
        <Card padded={false}>
          <div className="border-b border-stroke p-5 dark:border-dark-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm">Inbox</Badge>
              <Badge variant="accent" size="sm">Starred</Badge>
              {email.labels.map((l) => (
                <Badge key={l} variant="neutral" size="sm">{l}</Badge>
              ))}
              <span className="ml-auto text-xs text-dark-5 dark:text-dark-6">
                {email.threadCount || 1} messages · last reply {email.time}
              </span>
            </div>
            <h2 className="mt-3 text-xl font-bold tracking-tight text-dark dark:text-white">
              {email.subject}
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name={email.from.name} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-dark dark:text-white">{email.from.name}</p>
                <p className="truncate text-xs text-dark-5 dark:text-dark-6">
                  {email.from.email} → {email.to}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="iconSm" aria-label="star">
                  <StarIcon className="size-4 text-accent" />
                </Button>
                <Button variant="ghost" size="iconSm" aria-label="archive">
                  <FolderIcon className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Thread messages */}
          <ol className="divide-y divide-stroke dark:divide-dark-3">
            {emailThread.map((msg, idx) => (
              <li key={msg.id} className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar name={msg.from} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <span className="text-sm font-semibold text-dark dark:text-white">
                          {msg.from}
                        </span>
                        <span className="ml-2 text-xs text-dark-5 dark:text-dark-6">
                          {msg.email}
                        </span>
                      </div>
                      <span className="text-xs text-dark-5 dark:text-dark-6">{msg.time}</span>
                    </div>
                    <p className="mt-1">
                      <Badge variant={idx === 0 ? "violet" : idx === emailThread.length - 1 ? "success" : "neutral"} size="sm">
                        {msg.role}
                      </Badge>
                    </p>
                    <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-dark-7 dark:text-dark-7">
                      {msg.body}
                    </div>
                    {idx === 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          { name: "q1-roadmap-v2.pdf", size: "1.8 MB" },
                          { name: "eng-hours-breakdown.xlsx", size: "118 KB" },
                        ].map((a) => (
                          <div
                            key={a.name}
                            className="flex items-center gap-2 rounded-lg border border-stroke bg-gray-2/60 p-2 dark:border-dark-3 dark:bg-white/[0.03]"
                          >
                            <span className="grid size-8 place-items-center rounded-md bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                              <MailIcon className="size-4" />
                            </span>
                            <div>
                              <p className="text-xs font-medium text-dark dark:text-white">{a.name}</p>
                              <p className="text-[10px] text-dark-5 dark:text-dark-6">{a.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Reply box */}
          <div className="border-t border-stroke p-5 dark:border-dark-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
              Reply to thread
            </p>
            <div className="rounded-xl border border-stroke bg-gray-2/40 p-3 dark:border-dark-3 dark:bg-white/[0.02]">
              <textarea
                rows={4}
                defaultValue="Looks good — approving the v2.1 scope. SSO in week 2 works for me. Daniel, ping me when the prod cutover window is locked."
                className="w-full resize-none bg-transparent text-sm text-dark outline-none placeholder:text-dark-6 dark:text-white"
              />
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="iconSm" aria-label="attach">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M21 10v8a3 3 0 01-3 3H6a3 3 0 01-3-3V8a3 3 0 013-3h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M16 4l4 4-8 8H8v-4l8-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                  </Button>
                  <Button variant="ghost" size="iconSm" aria-label="mention">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.6 7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Save draft</Button>
                  <Button size="sm" variant="primary">
                    <CheckIcon className="size-4" />
                    Send reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Side panel */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-dark dark:text-white">Thread summary</h3>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Started</dt>
                <dd className="text-dark dark:text-white">Today, 9:42 AM</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Participants</dt>
                <dd className="text-dark dark:text-white">3 people</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Replies</dt>
                <dd className="text-dark dark:text-white">{emailThread.length}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Last activity</dt>
                <dd className="text-dark dark:text-white">{email.time}</dd>
              </div>
            </dl>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Participants
              </p>
              <div className="flex flex-wrap gap-2">
                {["Priya Patel", "Daniel Chen", "Aarav Sharma"].map((n) => (
                  <div key={n} className="flex items-center gap-2 rounded-lg border border-stroke px-2 py-1 dark:border-dark-3">
                    <Avatar name={n} size="xs" />
                    <span className="text-xs font-medium text-dark dark:text-white">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-dark dark:text-white">Activity timeline</h3>
            <div className="mt-4">
              <Timeline
                events={[
                  { title: "Priya started the thread", description: "Shared the Q1 roadmap draft", time: "9:42 AM", tone: "primary" },
                  { title: "Daniel replied", description: "Asked to move SSO a week earlier", time: "10:08 AM", tone: "info" },
                  { title: "Aarav replied", description: "Agreed — will reshuffle hours", time: "10:21 AM", tone: "violet" },
                  { title: "Priya pushed v2.1", description: "SSO in week 2, AI refactor in Q2", time: "10:45 AM", tone: "success" },
                ]}
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-dark dark:text-white">Related</h3>
            <ul className="mt-3 space-y-2">
              {emails.slice(1, 4).map((m) => (
                <li key={m.id}>
                  <Link
                    href="/apps/email/detail"
                    className="flex items-start gap-2 rounded-lg p-2 transition hover:bg-gray-2 dark:hover:bg-white/5"
                  >
                    <MailIcon className="mt-0.5 size-4 text-dark-5 dark:text-dark-6" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-dark dark:text-white">{m.subject}</p>
                      <p className="truncate text-[11px] text-dark-5 dark:text-dark-6">{m.from.name} · {m.time}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
