import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Avatar, AvatarGroup } from "@/components/shared/avatar";
import { Timeline } from "@/components/shared/timeline";
import {
  RocketIcon,
  ShieldIcon,
  GlobeIcon,
  ServerIcon,
  BellIcon,
  WrenchIcon,
  CheckIcon,
  MailIcon,
} from "@/components/Layouts/sidebar/icons";
import {
  teamMembers,
  companyMilestones,
  companyStats,
  companyValues,
  type CompanyValue,
} from "@/data/pages/team";

export const metadata = {
  title: "About",
  description:
    "About Helios Pro — our mission, our story, the values we ship by, and the 24 people building the kit across 11 timezones.",
};

const valueIcons: Record<CompanyValue["icon"], React.ReactNode> = {
  rocket: <RocketIcon className="size-5" />,
  shield: <ShieldIcon className="size-5" />,
  globe: <GlobeIcon className="size-5" />,
  wrench: <WrenchIcon className="size-5" />,
  bell: <BellIcon className="size-5" />,
  server: <ServerIcon className="size-5" />,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Helios Pro"
        description="We build the premium admin UI kit we always wished existed — refined, typed, accessible and shipped on time."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Pages", href: "/pages/about" },
          { label: "About" },
        ]}
        actions={
          <Badge variant="primary">
            <RocketIcon className="size-3.5" /> v4.2 · 2026
          </Badge>
        }
      />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-stroke bg-gradient-to-br from-primary-subtle via-white to-accent-subtle p-8 dark:border-dark-3 dark:from-primary/15 dark:via-gray-dark dark:to-accent/15 md:p-14">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-accent/20 blur-3xl"
          aria-hidden
        />
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <Badge variant="primary" size="lg" className="mb-5">
              <RocketIcon className="size-3.5" /> Our mission
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-dark dark:text-white md:text-4xl md:leading-tight">
              Give every product team a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                premium head start
              </span>
              .
            </h1>
            <p className="mt-5 text-base text-dark-5 dark:text-dark-6 md:text-lg">
              We believe the best products are built by small teams that ship
              fast. Helios Pro removes the boring 80% — auth, layout, tables,
              charts, theming — so you can focus on the 20% that makes your
              product unique.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg">
                <RocketIcon className="size-4" /> Get Helios Pro
              </Button>
              <Button size="lg" variant="outline">
                <MailIcon className="size-4" /> Talk to the team
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {companyStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-stroke bg-white/70 p-5 backdrop-blur dark:border-dark-3 dark:bg-white/5"
              >
                <p className="text-3xl font-bold tracking-tight text-dark dark:text-white">
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-medium text-dark dark:text-white">
                  {s.label}
                </p>
                <p className="text-xs text-dark-5 dark:text-dark-6">{s.hint}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY TIMELINE */}
      <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <Badge variant="accent">Our story</Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-dark dark:text-white">
            From a single Tailwind config to 12,400+ teams
          </h2>
          <p className="mt-2 text-sm text-dark-5 dark:text-dark-6">
            Helios was founded in 2021 by two ex-product engineers who were
            tired of rebuilding the same dashboard scaffolding on every client
            project. Five years later, the kit powers dashboards at Y
            Combinator startups, Fortune 500s and indie hackers alike.
          </p>
          <div className="mt-5 flex items-center gap-3 border-t border-stroke pt-5 dark:border-dark-3">
            <AvatarGroup
              names={["Aarav Mehta", "Priya Nair", "Daniel Okafor", "Sofia Rossi", "Marcus Webb"]}
              size="sm"
            />
            <p className="text-xs text-dark-5 dark:text-dark-6">
              The first five hires — still all here.
            </p>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader title="Milestones" subtitle="The big moments on the Helios Pro journey." />
          <Timeline
            events={companyMilestones.map((m) => ({
              title: m.title,
              description: m.description,
              time: m.time,
              tone: m.tone,
            }))}
          />
        </Card>
      </section>

      {/* VALUES */}
      <section className="mt-12">
        <div className="mb-6 text-center">
          <Badge variant="violet">Values</Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-dark dark:text-white md:text-3xl">
            The principles we ship by
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-dark-5 dark:text-dark-6 md:text-base">
            Six rules that show up in every commit, every release note and
            every customer conversation.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companyValues.map((v) => (
            <Card key={v.title} hover>
              <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
                {valueIcons[v.icon]}
              </div>
              <h3 className="text-base font-semibold text-dark dark:text-white">
                {v.title}
              </h3>
              <p className="mt-1.5 text-sm text-dark-5 dark:text-dark-6">
                {v.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="mt-12">
        <div className="mb-6 text-center">
          <Badge variant="success">Team</Badge>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-dark dark:text-white md:text-3xl">
            The people behind Helios Pro
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-dark-5 dark:text-dark-6 md:text-base">
            24 of us across 11 timezones — designers, engineers, advocates and
            security folks. Async by default, sync when it counts.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((m) => (
            <Card key={m.name} hover className="text-center">
              <div className="mx-auto mb-4 w-fit">
                <Avatar name={m.name} size="xl" />
              </div>
              <h3 className="text-base font-semibold text-dark dark:text-white">
                {m.name}
              </h3>
              <p className="text-sm font-medium text-primary dark:text-primary-light">
                {m.role}
              </p>
              <p className="mt-3 text-xs text-dark-5 dark:text-dark-6">
                {m.bio}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 border-t border-stroke pt-3 text-xs text-dark-5 dark:border-dark-3 dark:text-dark-6">
                <GlobeIcon className="size-3.5" />
                <span>{m.location}</span>
                <span className="text-dark-6">·</span>
                <span>{m.focus}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 text-white md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Want to join the team?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">
              We are always hiring thoughtful designers and engineers — wherever
              you live. Open roles are listed below; we also welcome speculative
              applications.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Senior Frontend Engineer", "Staff Designer", "Developer Advocate"].map(
                (r) => (
                  <span
                    key={r}
                    className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium"
                  >
                    <CheckIcon className="size-3" /> {r}
                  </span>
                ),
              )}
            </div>
          </div>
          <Button
            size="lg"
            className="shrink-0 bg-white text-primary hover:bg-white/90"
          >
            <RocketIcon className="size-4" /> See open roles
          </Button>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { icon: <GlobeIcon className="size-4" />, label: "Remote-first", value: "11 timezones" },
          { icon: <ShieldIcon className="size-4" />, label: "SOC 2 Type II", value: "Certified 2024" },
          { icon: <ServerIcon className="size-4" />, label: "Open source", value: "9.2k GitHub stars" },
          { icon: <BellIcon className="size-4" />, label: "Releases", value: "Every 2 weeks" },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-3 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-subtle text-primary dark:bg-primary/15 dark:text-primary-light">
              {s.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-dark dark:text-white">
                {s.label}
              </p>
              <p className="text-xs text-dark-5 dark:text-dark-6">{s.value}</p>
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}
