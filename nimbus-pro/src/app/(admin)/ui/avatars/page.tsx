"use client";
import { PageHeader, Card, CardHeader, CardBody, Avatar, AvatarGroup, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const SIZES = [
  { label: "xs", value: 24 },
  { label: "sm", value: 32 },
  { label: "md", value: 40 },
  { label: "lg", value: 48 },
  { label: "xl", value: 64 },
];

const STATUS_TONE: Record<"online" | "away" | "busy" | "offline", string> = {
  online: "bg-success-500",
  away: "bg-warning-500",
  busy: "bg-error-500",
  offline: "bg-gray-400",
};

const STATUS_LABEL: Record<"online" | "away" | "busy" | "offline", string> = {
  online: "Online",
  away: "Away",
  busy: "Do not disturb",
  offline: "Offline",
};

const USERS = [
  { name: "Aria Chen", status: "online" as const },
  { name: "Maya Patel", status: "busy" as const },
  { name: "Jordan Lee", status: "away" as const },
  { name: "Sam Rivera", status: "online" as const },
  { name: "Theo Park", status: "offline" as const },
  { name: "Nina Okafor", status: "online" as const },
  { name: "Liam Walsh", status: "away" as const },
  { name: "Priya Shah", status: "offline" as const },
];

function AvatarWithStatus({ name, size, status }: { name: string; size: number; status: keyof typeof STATUS_TONE }) {
  const dot = Math.max(8, Math.round(size * 0.28));
  return (
    <div className="relative inline-block">
      <Avatar name={name} size={size} />
      <span
        className={cn(
          "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-gray-900",
          STATUS_TONE[status]
        )}
        style={{ width: dot, height: dot }}
      />
    </div>
  );
}

export default function AvatarsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Avatars"
        description="Sizes, status indicators, rings, groups with overflow, and shapes — all powered by deterministic gradients."
        breadcrumbs={[{ label: "UI Components" }, { label: "Avatars" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="Five standard sizes from xs (24px) to xl (64px)" />
          <CardBody>
            <div className="flex flex-wrap items-end gap-5">
              {SIZES.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <Avatar name="Aria Chen" size={s.value} />
                  <span className="text-xs font-medium text-gray-500">{s.label}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Initials (no images) */}
        <Card>
          <CardHeader title="Initials" description="Deterministic gradient background per name" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-4">
              {["Aria Chen", "Maya Patel", "Jordan Lee", "Sam Rivera", "Theo Park", "Nina Okafor"].map((n) => (
                <div key={n} className="flex flex-col items-center gap-1.5">
                  <Avatar name={n} size={48} />
                  <span className="max-w-[64px] truncate text-[11px] text-gray-500">{n.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* With ring */}
        <Card>
          <CardHeader title="With Ring" description="White/dark ring for stacking and emphasis" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-4">
              {SIZES.map((s) => (
                <Avatar key={s.label} name="Aria Chen" size={s.value} ring />
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-gray-900/40">
              <p className="mb-3 text-xs font-medium text-gray-500">On tinted background</p>
              <div className="flex flex-wrap items-center gap-3">
                <Avatar name="Maya Patel" size={44} ring />
                <Avatar name="Jordan Lee" size={44} ring />
                <Avatar name="Sam Rivera" size={44} ring />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Status indicator */}
        <Card>
          <CardHeader title="Status Indicator" description="Online, away, busy, offline — corner dot" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-6">
              {(["online", "away", "busy", "offline"] as const).map((status) => (
                <div key={status} className="flex flex-col items-center gap-2">
                  <AvatarWithStatus name="Aria Chen" size={48} status={status} />
                  <span className="text-xs font-medium text-gray-500">{STATUS_LABEL[status]}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              {USERS.slice(0, 4).map((u) => (
                <div key={u.name} className="flex items-center justify-between rounded-lg border border-gray-100 p-2.5 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <AvatarWithStatus name={u.name} size={36} status={u.status} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{u.name}</p>
                      <p className="text-xs text-gray-500">{STATUS_LABEL[u.status]}</p>
                    </div>
                  </div>
                  <Badge tone={u.status === "online" ? "success" : u.status === "busy" ? "error" : u.status === "away" ? "warning" : "gray"} variant="soft">
                    {STATUS_LABEL[u.status]}
                  </Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Avatar group with +N overflow */}
        <Card>
          <CardHeader title="Avatar Group" description="Stacked with +N overflow indicator" />
          <CardBody className="space-y-5">
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-500">max = 3 (8 users)</p>
              <AvatarGroup users={USERS} max={3} size={36} />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-500">max = 5 (8 users)</p>
              <AvatarGroup users={USERS} max={5} size={36} />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-500">max = 4, large size</p>
              <AvatarGroup users={USERS} max={4} size={48} />
            </div>
            <div className="flex flex-wrap items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-gray-900/40">
              <div className="flex items-center gap-3">
                <AvatarGroup users={USERS} max={4} size={32} />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Design team</p>
                  <p className="text-xs text-gray-500">{USERS.length} members · 4 online</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View all</Button>
            </div>
          </CardBody>
        </Card>

        {/* Shapes */}
        <Card>
          <CardHeader title="Shapes" description="Round (default) and square via className override" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Aria Chen" size={56} />
                <span className="text-xs font-medium text-gray-500">Round</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Aria Chen" size={56} className="rounded-xl" />
                <span className="text-xs font-medium text-gray-500">Rounded square</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Aria Chen" size={56} className="rounded-2xl" />
                <span className="text-xs font-medium text-gray-500">Softer square</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Aria Chen" size={56} className="rounded-none" />
                <span className="text-xs font-medium text-gray-500">Square</span>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {USERS.slice(0, 4).map((u, i) => {
                const shapes = ["rounded-full", "rounded-xl", "rounded-2xl", "rounded-md"];
                return (
                  <div key={u.name} className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                    <Avatar name={u.name} size={48} className={shapes[i]} />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{u.name.split(" ")[0]}</span>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
