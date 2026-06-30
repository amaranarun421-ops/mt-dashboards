"use client";
import { PageHeader, Card, CardHeader, CardBody, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Check, AlertTriangle, Info, X, Bell, Star, Sparkles, Flame, Crown } from "lucide-react";

type Tone = "brand" | "success" | "warning" | "error" | "gray" | "purple" | "pink" | "orange";
type Variant = "soft" | "outline" | "solid";

const TONES: Tone[] = ["brand", "success", "warning", "error", "gray", "purple", "pink", "orange"];

const TONE_ICONS: Record<Tone, React.ComponentType<{ className?: string }>> = {
  brand: Sparkles,
  success: Check,
  warning: AlertTriangle,
  error: X,
  gray: Info,
  purple: Crown,
  pink: Star,
  orange: Flame,
};

const sizeClass: Record<"sm" | "md" | "lg", string> = {
  sm: "text-[10px] px-1.5 py-0",
  md: "text-xs px-2 py-0.5",
  lg: "text-sm px-2.5 py-1",
};

function BadgeSize({ size, tone, variant }: { size: "sm" | "md" | "lg"; tone: Tone; variant: Variant }) {
  return (
    <Badge tone={tone} variant={variant} className={cn(sizeClass[size])}>
      {tone}
    </Badge>
  );
}

export default function BadgesPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Badges"
        description="Eight tones × three variants — soft, outline, solid — with dots, icons, sizes, and count badges."
        breadcrumbs={[{ label: "UI Components" }, { label: "Badges" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Soft tones */}
        <Card>
          <CardHeader title="Soft Variant" description="Tinted background + matching text — the default style" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2.5">
              {TONES.map((t) => (
                <Badge key={t} tone={t} variant="soft">
                  {t}
                </Badge>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Outline tones */}
        <Card>
          <CardHeader title="Outline Variant" description="Hairline border + colored text — minimal and airy" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2.5">
              {TONES.map((t) => (
                <Badge key={t} tone={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Solid tones */}
        <Card>
          <CardHeader title="Solid Variant" description="Filled background + white text — strongest emphasis" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2.5">
              {TONES.map((t) => (
                <Badge key={t} tone={t} variant="solid">
                  {t}
                </Badge>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* With dot */}
        <Card>
          <CardHeader title="With Dot" description="Pulsing dot for status indicators" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2.5">
              {TONES.map((t) => (
                <Badge key={t} tone={t} dot>
                  {t}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-900/40">
              <Badge tone="success" dot>
                Online
              </Badge>
              <Badge tone="warning" dot>
                Away
              </Badge>
              <Badge tone="error" dot>
                Offline
              </Badge>
              <Badge tone="brand" dot>
                Synced
              </Badge>
            </div>
          </CardBody>
        </Card>

        {/* With icon */}
        <Card>
          <CardHeader title="With Icon" description="Use icons to add semantic meaning" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-2.5">
              {TONES.map((t) => {
                const Icon = TONE_ICONS[t];
                return (
                  <Badge key={t} tone={t}>
                    <Icon className="h-3 w-3" />
                    {t}
                  </Badge>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="Three sizes via the className override" />
          <CardBody className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <BadgeSize size="sm" tone="brand" variant="soft" />
              <BadgeSize size="md" tone="brand" variant="soft" />
              <BadgeSize size="lg" tone="brand" variant="soft" />
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <BadgeSize size="sm" tone="purple" variant="outline" />
              <BadgeSize size="md" tone="purple" variant="outline" />
              <BadgeSize size="lg" tone="purple" variant="outline" />
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <BadgeSize size="sm" tone="pink" variant="solid" />
              <BadgeSize size="md" tone="pink" variant="solid" />
              <BadgeSize size="lg" tone="pink" variant="solid" />
            </div>
          </CardBody>
        </Card>

        {/* Count badges */}
        <Card>
          <CardHeader title="Count Badges" description="Numeric indicators — inbox, notifications, comments" />
          <CardBody className="space-y-5">
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-500" />
                <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-error-500 px-1 text-[10px] font-bold text-white">
                  9
                </span>
              </div>
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                  24
                </span>
              </div>
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400">
                  <Info className="h-5 w-5" />
                </div>
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-500 px-1.5 text-[10px] font-bold text-white ring-2 ring-white dark:ring-gray-900">
                  99+
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge tone="error" variant="solid">
                New · 12
              </Badge>
              <Badge tone="brand" variant="soft">
                Updated · 4
              </Badge>
              <Badge tone="gray" variant="outline">
                Archived · 87
              </Badge>
              <Badge tone="warning" variant="soft">
                Pending · 3
              </Badge>
            </div>
          </CardBody>
        </Card>

        {/* Status / usage examples */}
        <Card>
          <CardHeader title="Usage Examples" description="Real contexts where badges shine" />
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Pro account</p>
                  <p className="text-xs text-gray-500">Premium tier active</p>
                </div>
              </div>
              <Badge tone="brand" variant="solid">PRO</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Subscription</p>
                  <p className="text-xs text-gray-500">Expires in 7 days</p>
                </div>
              </div>
              <Badge tone="warning" dot>Renew</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Deploy</p>
                  <p className="text-xs text-gray-500">Build #2349 succeeded</p>
                </div>
              </div>
              <Badge tone="success" variant="outline">Live</Badge>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
