import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar, AvatarGroup } from "@/components/shared/avatar";
import { Progress } from "@/components/shared/progress";
import {
  CardIcon,
  CheckIcon,
  StarIcon,
  WalletIcon,
  UsersIcon,
  ActivityIcon,
  ChevronRight,
} from "@/components/Layouts/sidebar/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cards",
  description:
    "Helios Pro — card component showcase: basic, header/footer, hoverable, image, stat, profile, pricing and gradient cards.",
};

export default function CardsPage() {
  return (
    <>
      <PageHeader
        title="Cards"
        description="Eight card patterns for content containers — from basic surfaces to gradient highlights."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/cards" },
          { label: "Cards" },
        ]}
        actions={
          <Badge variant="primary">
            <CardIcon className="size-3.5" /> 8 patterns
          </Badge>
        }
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader title="Basic card" />
            <p className="text-sm text-dark-5 dark:text-dark-6">
              A simple surface for grouping related content with consistent
              padding and a premium shadow.
            </p>
          </Card>

          <Card>
            <CardHeader
              title="With header"
              subtitle="And an action slot"
              action={
                <Button size="sm" variant="ghost">
                  View
                </Button>
              }
            />
            <p className="text-sm text-dark-5 dark:text-dark-6">
              Headers can include a title, subtitle and a right-aligned action
              without extra layout work.
            </p>
          </Card>

          <Card>
            <CardHeader title="With footer" />
            <p className="text-sm text-dark-5 dark:text-dark-6">
              Footers are great for primary actions, totals or row metadata.
            </p>
            <CardFooter>
              <span className="text-xs text-dark-5 dark:text-dark-6">
                Updated 3 min ago
              </span>
              <Button size="sm" variant="primary">
                <CheckIcon className="size-4" /> Confirm
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card hover>
            <CardHeader
              title="Hoverable card"
              subtitle="Lifts on hover"
              action={<ChevronRight className="size-5 text-dark-5" />}
            />
            <p className="text-sm text-dark-5 dark:text-dark-6">
              Pass the <code className="rounded bg-gray-2 px-1">hover</code>{" "}
              prop to add a subtle lift and border tint on cursor enter.
            </p>
          </Card>

          <Card padded={false} className="overflow-hidden">
            <div className="relative h-32 bg-gradient-to-br from-primary/70 to-accent/60">
              <span className="absolute bottom-3 left-4 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur">
                Featured
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-base font-semibold text-dark dark:text-white">
                Card with image
              </h3>
              <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                Use <code className="rounded bg-gray-2 px-1">padded=&#123;false&#125;</code>{" "}
                when you want an edge-to-edge media header.
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Stat card" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-dark-5 dark:text-dark-6">
                  Monthly revenue
                </p>
                <p className="mt-1 text-2xl font-bold text-dark dark:text-white">
                  $48,210
                </p>
                <p className="mt-1 text-xs font-medium text-primary">
                  +12.4% vs last month
                </p>
              </div>
              <span className="grid size-12 place-items-center rounded-xl bg-primary-subtle text-primary dark:bg-primary/15">
                <WalletIcon className="size-6" />
              </span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader title="Profile card" subtitle="Team member snapshot" />
            <div className="flex items-center gap-4">
              <Avatar name="Sofia Marquez" size="xl" />
              <div className="min-w-0">
                <p className="text-base font-semibold text-dark dark:text-white">
                  Sofia Marquez
                </p>
                <p className="text-sm text-dark-5 dark:text-dark-6">
                  Senior Product Designer
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="success" size="sm">
                    Online
                  </Badge>
                  <Badge variant="info" size="sm">
                    Remote
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-stroke pt-4 text-center dark:border-dark-3">
              <div>
                <p className="text-base font-semibold text-dark dark:text-white">
                  128
                </p>
                <p className="text-xs text-dark-5 dark:text-dark-6">Projects</p>
              </div>
              <div>
                <p className="text-base font-semibold text-dark dark:text-white">
                  4.9
                </p>
                <p className="text-xs text-dark-5 dark:text-dark-6">Rating</p>
              </div>
              <div>
                <p className="text-base font-semibold text-dark dark:text-white">
                  6y
                </p>
                <p className="text-xs text-dark-5 dark:text-dark-6">Tenure</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Pricing card" subtitle="Mid-tier plan" />
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-dark dark:text-white">
                $49
              </span>
              <span className="text-sm text-dark-5 dark:text-dark-6">
                / month
              </span>
            </div>
            <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
              For growing teams that need analytics and exports.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-dark-7 dark:text-dark-7">
              {[
                "Up to 25 workspaces",
                "Advanced analytics",
                "CSV / PDF exports",
                "Priority email support",
              ].map((feat) => (
                <li key={feat} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-primary-subtle text-primary dark:bg-primary/15">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>
            <Button className="mt-5 w-full" variant="primary">
              Choose Pro
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card
            padded={false}
            className="overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white"
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                  <StarIcon className="size-3.5" /> Gradient
                </span>
                <ActivityIcon className="size-6 opacity-80" />
              </div>
              <p className="mt-6 text-3xl font-bold">$128,400</p>
              <p className="mt-1 text-sm text-white/80">
                Total pipeline value this quarter
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/90">
                <span className="rounded-full bg-white/20 px-2 py-0.5 font-medium">
                  +18.2%
                </span>
                vs previous quarter
              </div>
            </div>
          </Card>

          <Card
            padded={false}
            className="overflow-hidden bg-gradient-to-br from-accent to-accent-dark text-white"
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                  <UsersIcon className="size-3.5" /> Team
                </span>
                <UsersIcon className="size-6 opacity-80" />
              </div>
              <p className="mt-6 text-3xl font-bold">42 members</p>
              <p className="mt-1 text-sm text-white/80">
                Across 6 active projects
              </p>
              <div className="mt-4">
                <AvatarGroup
                  names={[
                    "Aarav Sharma",
                    "Priya Nair",
                    "Daniel Kim",
                    "Yuki Sato",
                    "Emma Watson",
                  ]}
                  max={4}
                />
              </div>
            </div>
          </Card>

          <Card
            padded={false}
            className="overflow-hidden bg-gradient-to-br from-violet to-violet-dark text-white"
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                  <ActivityIcon className="size-3.5" /> Live
                </span>
                <ActivityIcon className="size-6 opacity-80" />
              </div>
              <p className="mt-6 text-3xl font-bold">99.98%</p>
              <p className="mt-1 text-sm text-white/80">
                Uptime over the last 30 days
              </p>
              <div className="mt-4">
                <Progress
                  value={99.98}
                  tone="accent"
                  size="md"
                  className="[&>div>div]:bg-white"
                />
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Composed example"
            subtitle="CardHeader + CardBody + CardFooter with real content"
          />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name="Daniel Kim" />
                <div>
                  <p className="text-sm font-semibold text-dark dark:text-white">
                    Daniel Kim
                  </p>
                  <p className="text-xs text-dark-5 dark:text-dark-6">
                    daniel.kim@heliospro.io
                  </p>
                </div>
              </div>
              <Badge variant="warning" size="sm">
                Pending
              </Badge>
            </div>
            <Progress
              value={62}
              tone="primary"
              size="sm"
              showLabel
              label="Profile completion"
            />
          </CardBody>
          <CardFooter>
            <Button size="sm" variant="ghost">
              Decline
            </Button>
            <Button size="sm" variant="primary">
              Approve
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
