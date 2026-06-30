"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Drawer } from "@/components/shared/drawer";
import { DataTable } from "@/components/shared/data-table";
import { EmptyState } from "@/components/shared/empty-state";
import { inputClass } from "@/components/shared/form-section";
import {
  ContactBookIcon,
  EditIcon,
  StarIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/Layouts/sidebar/icons";
import { contacts, contactFilters, type Contact } from "@/data/apps/contacts";

const statusTone: Record<Contact["status"], "primary" | "accent" | "neutral"> = {
  active: "primary",
  lead: "accent",
  dormant: "neutral",
};

export default function ContactsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    return contacts
      .filter((c) => {
        if (filter === "all") return true;
        if (filter === "starred") return c.starred;
        return c.status === filter;
      })
      .filter((c) =>
        query.trim() === ""
          ? true
          : (c.name + c.email + c.company + c.role).toLowerCase().includes(query.toLowerCase()),
      );
  }, [filter, query]);

  function openContact(c: Contact) {
    setSelected(c);
    setDrawerOpen(true);
  }

  const columns = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      sortAccessor: (c: Contact) => c.name,
      cell: (c: Contact) => (
        <div className="flex items-center gap-3">
          <Avatar name={c.name} size="sm" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-dark dark:text-white">{c.name}</p>
              {c.starred && <StarIcon className="size-3 text-accent" />}
            </div>
            <p className="text-xs text-dark-5 dark:text-dark-6">{c.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company",
      sortable: true,
      sortAccessor: (c: Contact) => c.company,
      cell: (c: Contact) => (
        <div>
          <p className="text-sm font-medium text-dark dark:text-white">{c.company}</p>
          <p className="text-xs text-dark-5 dark:text-dark-6">{c.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      cell: (c: Contact) => <span className="text-sm text-dark-7 dark:text-dark-7">{c.phone}</span>,
    },
    {
      key: "location",
      header: "Location",
      cell: (c: Contact) => (
        <span className="inline-flex items-center gap-1 text-xs text-dark-5 dark:text-dark-6">
          <MapPinIcon className="size-3.5" />
          {c.location}
        </span>
      ),
    },
    {
      key: "tags",
      header: "Tags",
      cell: (c: Contact) => (
        <div className="flex flex-wrap gap-1">
          {c.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="neutral" size="sm">#{t}</Badge>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortAccessor: (c: Contact) => c.status,
      cell: (c: Contact) => <Badge variant={statusTone[c.status]} size="sm">{c.status}</Badge>,
    },
    {
      key: "lastContact",
      header: "Last contact",
      cell: (c: Contact) => <span className="text-xs text-dark-5 dark:text-dark-6">{c.lastContact}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Contacts"
        description="Manage customers, partners and team members in one place."
        breadcrumbs={[{ label: "Helios Pro", href: "/" }, { label: "Apps" }, { label: "Contacts" }]}
        actions={
          <>
            <Button variant="outline" size="sm">Import CSV</Button>
            <Button variant="primary" size="sm">
              <EditIcon className="size-4" />
              Add contact
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Filter sidebar */}
        <div className="space-y-4">
          <Card padded>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
              Status
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setFilter("all")}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                    filter === "all"
                      ? "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                      : "text-dark-7 hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
                  }`}
                >
                  <span>All contacts</span>
                  <Badge variant="neutral" size="sm">{contacts.length}</Badge>
                </button>
              </li>
              {contactFilters.map((f) => {
                const count = f.key === "starred"
                  ? contacts.filter((c) => c.starred).length
                  : contacts.filter((c) => c.status === f.key).length;
                return (
                  <li key={f.key}>
                    <button
                      onClick={() => setFilter(f.key)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                        filter === f.key
                          ? "bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light"
                          : "text-dark-7 hover:bg-gray-2 dark:text-dark-7 dark:hover:bg-white/5"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${
                          f.tone === "primary" ? "bg-primary"
                            : f.tone === "accent" ? "bg-accent"
                            : f.tone === "violet" ? "bg-violet"
                            : f.tone === "info" ? "bg-blue"
                            : f.tone === "success" ? "bg-primary"
                            : f.tone === "danger" ? "bg-red"
                            : "bg-gray-4"
                        }`} />
                        {f.label}
                      </span>
                      <Badge variant="neutral" size="sm">{count}</Badge>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card padded>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["engineering", "design", "security", "customer", "marketing", "people", "data", "ai", "support"].map((t) => (
                <button
                  key={t}
                  className="rounded-full border border-stroke px-2 py-0.5 text-xs text-dark-7 transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-dark-7"
                >
                  #{t}
                </button>
              ))}
            </div>
          </Card>

          <Card padded>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                <ContactBookIcon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-dark dark:text-white">{contacts.length} total</p>
                <p className="text-xs text-dark-5 dark:text-dark-6">across 8 companies</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Table */}
        <div>
          <div className="mb-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email, company…"
              className={inputClass}
            />
          </div>
          {filtered.length === 0 ? (
            <Card>
              <EmptyState
                size="md"
                icon={<ContactBookIcon className="size-6" />}
                title="No contacts match"
                description="Try a different filter or search term."
              />
            </Card>
          ) : (
            <DataTable
              columns={columns}
              data={filtered}
              rowKey={(c) => c.id}
              onRowClick={openContact}
              pageSize={8}
            />
          )}
        </div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selected?.name}
        description={selected?.role}
        width="max-w-md"
        footer={
          <>
            <Button variant="outline" size="sm">Edit</Button>
            <Button variant="primary" size="sm">Send message</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex flex-col items-center text-center">
              <Avatar name={selected.name} size="xl" />
              <h3 className="mt-3 text-lg font-semibold text-dark dark:text-white">{selected.name}</h3>
              <p className="text-sm text-dark-5 dark:text-dark-6">{selected.role} · {selected.company}</p>
              <div className="mt-2">
                <Badge variant={statusTone[selected.status]} size="sm">{selected.status}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm">
                <MailIcon className="size-4" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <PhoneIcon className="size-4" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <StarIcon className={`size-4 ${selected.starred ? "text-accent" : ""}`} />
                {selected.starred ? "Starred" : "Star"}
              </Button>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Contact info
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-dark-5 dark:text-dark-6">Email</dt>
                  <dd className="text-right text-dark dark:text-white">{selected.email}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-dark-5 dark:text-dark-6">Phone</dt>
                  <dd className="text-dark dark:text-white">{selected.phone}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-dark-5 dark:text-dark-6">Location</dt>
                  <dd className="text-dark dark:text-white">{selected.location}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-dark-5 dark:text-dark-6">Last contact</dt>
                  <dd className="text-dark dark:text-white">{selected.lastContact}</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-5 dark:text-dark-6">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map((t) => (
                  <Badge key={t} variant="neutral" size="sm">#{t}</Badge>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-stroke bg-gray-2/40 p-3 dark:border-dark-3 dark:bg-white/[0.02]">
              <p className="text-xs font-semibold text-dark dark:text-white">Recent activity</p>
              <ul className="mt-2 space-y-1.5 text-xs text-dark-5 dark:text-dark-6">
                <li>· Replied to your email — 2 hours ago</li>
                <li>· Opened INV-2024-0142 — yesterday</li>
                <li>· Attended onboarding call — 3 days ago</li>
              </ul>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
