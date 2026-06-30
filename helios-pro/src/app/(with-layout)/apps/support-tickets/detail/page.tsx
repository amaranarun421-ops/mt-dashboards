import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Timeline } from "@/components/shared/timeline";
import { inputClass } from "@/components/shared/form-section";
import { ArrowLeftIcon, TicketIcon, CheckIcon } from "@/components/Layouts/sidebar/icons";
import { ticketThread, ticketStatusTone, ticketPriorityTone } from "@/data/apps/tickets";

export const metadata = {
  title: "Ticket Detail",
  description: "Conversation thread, metadata and resolution workflow for a support ticket.",
};

export default function TicketDetailPage() {
  const t = ticketThread;

  return (
    <div>
      <PageHeader
        title={`Ticket ${t.id}`}
        description={t.subject}
        breadcrumbs={[
          { label: "Helios Pro", href: "/" },
          { label: "Apps" },
          { label: "Support Tickets", href: "/apps/support-tickets" },
          { label: t.id },
        ]}
        actions={
          <>
            <Link href="/apps/support-tickets">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="size-4" />
                Back to list
              </Button>
            </Link>
            <Button variant="primary" size="sm">
              <CheckIcon className="size-4" />
              Resolve
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Conversation */}
        <Card padded={false}>
          <div className="border-b border-stroke p-5 dark:border-dark-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={ticketStatusTone[t.status]} size="sm">{t.status}</Badge>
              <Badge variant={ticketPriorityTone[t.priority]} size="sm">{t.priority}</Badge>
              <Badge variant="neutral" size="sm">{t.channel}</Badge>
              <Badge variant="info" size="sm">{t.category}</Badge>
              <span className="ml-auto text-xs text-dark-5 dark:text-dark-6">
                Created {t.created} · Updated {t.updated}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold tracking-tight text-dark dark:text-white">
              {t.subject}
            </h2>
          </div>

          <ol className="divide-y divide-stroke dark:divide-dark-3">
            {t.replies.map((r, idx) => (
              <li key={r.id} className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar name={r.author} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <span className="text-sm font-semibold text-dark dark:text-white">{r.author}</span>
                        <span className="ml-2 text-xs text-dark-5 dark:text-dark-6">{r.role}</span>
                      </div>
                      <span className="text-xs text-dark-5 dark:text-dark-6">{r.time}</span>
                    </div>
                    <p className="mt-1">
                      <Badge
                        variant={r.role === "Requester" ? "violet" : r.role === "Engineer" ? "primary" : "neutral"}
                        size="sm"
                      >
                        {r.role}
                      </Badge>
                      {idx === 0 && <Badge variant="info" size="sm" className="ml-1.5">First message</Badge>}
                    </p>
                    <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-dark-7 dark:text-dark-7">
                      {r.body}
                    </div>
                    {r.body.includes("SAML") && (
                      <div className="mt-3 rounded-xl border border-stroke bg-gray-2/60 p-3 dark:border-dark-3 dark:bg-white/[0.03]">
                        <p className="text-xs font-semibold text-dark-5 dark:text-dark-6">SAML response (redacted)</p>
                        <pre className="mt-1 overflow-x-auto text-[11px] text-dark-7 dark:text-dark-7">
{`<saml2:AttributeStatement>
  <saml2:Attribute Name="email">
    <saml2:AttributeValue>grace@northwind.io</saml2:AttributeValue>
  </saml2:Attribute>
  <saml2:Attribute Name="name">
    <saml2:AttributeValue>Grace Okoro</saml2:AttributeValue>
  </saml2:Attribute>
  <!-- helios_role is MISSING -->
</saml2:AttributeStatement>`}
                        </pre>
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
              Internal reply
            </p>
            <div className="rounded-xl border border-stroke bg-gray-2/40 p-3 dark:border-dark-3 dark:bg-white/[0.02]">
              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                <Button variant="ghost" size="sm">Public reply</Button>
                <Button variant="soft" size="sm">Internal note</Button>
                <span className="ml-auto text-[11px] text-dark-5 dark:text-dark-6">Replying as Daniel Chen</span>
              </div>
              <textarea
                rows={4}
                defaultValue="Hotfix shipped — clearer error message when helios_role attribute is missing. Closing this out. Thanks for the quick triage, Layla!"
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
                  <Button variant="outline" size="sm">Save as draft</Button>
                  <Button size="sm" variant="primary">
                    <CheckIcon className="size-4" />
                    Send & resolve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Side panel */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-dark dark:text-white">Ticket details</h3>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Requester</dt>
                <dd className="text-dark dark:text-white">{t.requester}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Company</dt>
                <dd className="text-dark dark:text-white">{t.company}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Assignee</dt>
                <dd className="flex items-center gap-1.5 text-dark dark:text-white">
                  <Avatar name={t.assignee} size="xs" />
                  {t.assignee}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Channel</dt>
                <dd className="capitalize text-dark dark:text-white">{t.channel}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Category</dt>
                <dd className="text-dark dark:text-white">{t.category}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-dark-5 dark:text-dark-6">Priority</dt>
                <dd>
                  <Badge variant={ticketPriorityTone[t.priority]} size="sm">{t.priority}</Badge>
                </dd>
              </div>
            </dl>
            <div className="mt-4 border-t border-stroke pt-4 dark:border-dark-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">SLA</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">First response</span>
                <span className="font-semibold text-primary dark:text-primary-light">8 min · within SLA</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-dark-5 dark:text-dark-6">Resolution target</span>
                <span className="font-semibold text-accent-dark dark:text-accent-light">2h 14m remaining</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-dark dark:text-white">Activity</h3>
            <Timeline
              events={[
                { title: "Ticket created", description: "Grace Okoro via email", time: "09:14", tone: "primary" },
                { title: "Layla Hassan responded", description: "Asked for SAML response", time: "09:22", tone: "info" },
                { title: "Daniel Chen took ownership", description: "Looped in as SSO engineer", time: "09:48", tone: "violet" },
                { title: "Hotfix in progress", description: "Clearer error message", time: "10:31", tone: "accent" },
                { title: "Awaiting deploy", description: "Closing once live", time: "Now", tone: "success" },
              ]}
            />
          </Card>

          <Card>
            <h3 className="mb-3 text-sm font-semibold text-dark dark:text-white">Linked</h3>
            <ul className="space-y-2">
              {[
                { label: "Customer: Northwind Labs", href: "/apps/contacts" },
                { label: "Invoice: INV-2024-0140", href: "/apps/invoices/detail" },
                { label: "Internal RFC: SSO attribute mapping", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 rounded-lg border border-stroke px-3 py-2 text-xs text-dark-7 transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-7"
                  >
                    <TicketIcon className="size-3.5" />
                    {l.label}
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
