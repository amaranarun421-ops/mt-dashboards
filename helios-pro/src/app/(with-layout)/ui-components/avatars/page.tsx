import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Avatar, AvatarGroup } from "@/components/shared/avatar";
import { AvatarIcon } from "@/components/Layouts/sidebar/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatars",
  description:
    "Helios Pro — avatar component showcase: single avatars, status dots, groups, name pairs, online/offline indicators and square avatars.",
};

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const team = [
  "Aarav Sharma",
  "Priya Nair",
  "Daniel Kim",
  "Sofia Marquez",
  "Liam Murphy",
  "Yuki Sato",
];

export default function AvatarsPage() {
  return (
    <>
      <PageHeader
        title="Avatars"
        description="Round avatars with auto-generated tone colors from the name, in five sizes, with optional rings and status indicators."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/avatars" },
          { label: "Avatars" },
        ]}
        actions={
          <Badge variant="primary">
            <AvatarIcon className="size-3.5" /> 5 sizes
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader title="Sizes" subtitle="xs through xl." />
          <div className="flex flex-wrap items-end gap-6">
            {sizes.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar name="Sofia Marquez" size={s} />
                <span className="text-xs text-dark-5 dark:text-dark-6">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Avatar with status dot"
            subtitle="Online, busy, away and offline indicators."
          />
          <div className="flex flex-wrap items-end gap-8">
            {[
              { tone: "bg-green", label: "Online" },
              { tone: "bg-accent", label: "Away" },
              { tone: "bg-red", label: "Busy" },
              { tone: "bg-gray-4", label: "Offline" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <span className="relative inline-flex">
                  <Avatar name="Daniel Kim" size="lg" />
                  <span
                    className={`absolute bottom-0 right-0 size-4 rounded-full ring-2 ring-white dark:ring-gray-dark ${s.tone}`}
                  />
                </span>
                <span className="text-xs text-dark-5 dark:text-dark-6">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Avatar groups"
            subtitle="Stacked avatars with a +N overflow counter."
          />
          <div className="flex flex-col gap-6">
            {(["xs", "sm", "md", "lg"] as const).map((sz) => (
              <div
                key={sz}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-xs uppercase text-dark-5 dark:text-dark-6">
                  Size {sz}
                </span>
                <AvatarGroup names={team} max={4} size={sz} />
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader
              title="Avatar with name"
              subtitle="Pair an avatar with a name and role."
            />
            <div className="space-y-4">
              {team.slice(0, 4).map((name, i) => (
                <div key={name} className="flex items-center gap-3">
                  <Avatar name={name} size="md" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-dark dark:text-white">
                      {name}
                    </p>
                    <p className="text-xs text-dark-5 dark:text-dark-6">
                      {[
                        "Owner",
                        "Admin",
                        "Designer",
                        "Engineer",
                      ][i]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Online / offline"
              subtitle="A vertical list with presence indicators."
            />
            <div className="space-y-3">
              {team.map((name, i) => {
                const online = i % 3 !== 0;
                return (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="relative inline-flex">
                        <Avatar name={name} size="sm" />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white dark:ring-gray-dark ${
                            online ? "bg-green" : "bg-gray-4"
                          }`}
                        />
                      </span>
                      <span className="text-sm font-medium text-dark dark:text-white">
                        {name}
                      </span>
                    </div>
                    <Badge variant={online ? "success" : "neutral"} size="sm">
                      {online ? "Online" : "Offline"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Square avatars"
            subtitle="Use rounded-lg instead of full for media tiles."
          />
          <div className="flex flex-wrap items-end gap-6">
            {sizes.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Avatar
                  name={team[i]}
                  size={s}
                  className="rounded-lg"
                />
                <span className="text-xs text-dark-5 dark:text-dark-6">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Tone variants"
            subtitle="Pin an explicit tone instead of deriving one from the name."
          />
          <div className="flex flex-wrap items-center gap-4">
            {(
              [
                "primary",
                "accent",
                "violet",
                "info",
                "rose",
                "neutral",
                "success",
                "danger",
              ] as const
            ).map((tone) => (
              <div key={tone} className="flex flex-col items-center gap-2">
                <Avatar name="Helios Pro" tone={tone} size="lg" />
                <span className="text-xs capitalize text-dark-5 dark:text-dark-6">
                  {tone}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
