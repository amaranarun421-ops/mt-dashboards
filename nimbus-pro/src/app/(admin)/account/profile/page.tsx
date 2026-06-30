"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, StatCard, Badge, Button, Avatar, Progress } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Mail, Phone, MapPin, Globe, Calendar, MessageSquare, Pencil,
  AtSign, Link2, Rss, Star, Users, FileText, Award, TrendingUp,
  Settings, LogIn, Upload, UserPlus,
} from "lucide-react";

const SKILLS = ["TypeScript", "React", "Next.js", "Design Systems", "Tailwind", "Node.js", "GraphQL", "PostgreSQL", "AWS", "Figma"];

const SOCIALS = [
  { label: "twitter", icon: AtSign, href: "#" },
  { label: "github", icon: Link2, href: "#" },
  { label: "linkedin", icon: Rss, href: "#" },
  { label: "website", icon: Globe, href: "#" },
];

const TIMELINE = [
  { id: 1, icon: LogIn, tone: "brand", title: "Logged in from Mumbai", desc: "MacOS · Chrome 119", time: "2m ago" },
  { id: 2, icon: FileText, title: "Published article 'Scaling Design Systems'", desc: "Posted on company blog", time: "4h ago" },
  { id: 3, icon: Star, tone: "warning", title: "Earned 'Top Contributor' badge", desc: "For Q2 2026 contributions", time: "1d ago" },
  { id: 4, icon: Users, tone: "purple", title: "Joined team 'Platform Engineering'", desc: "Invited by Priya Iyer", time: "3d ago" },
  { id: 5, icon: Upload, tone: "success", title: "Uploaded 12 files to shared drive", desc: "Project assets for Nimbus v3", time: "1w ago" },
  { id: 6, icon: Settings, title: "Updated notification preferences", desc: "Enabled weekly digest emails", time: "1w ago" },
];

const ACTIVITY_FEED = [
  { id: 1, icon: FileText, tone: "brand", title: "Created post", desc: "Design system principles — part 2", time: "12m" },
  { id: 2, icon: Star, tone: "warning", title: "Starred repository", desc: "vercel/next.js", time: "1h" },
  { id: 3, icon: Users, tone: "purple", title: "Followed", desc: "Sofia García and 3 others", time: "3h" },
  { id: 4, icon: Upload, tone: "success", title: "Uploaded file", desc: "Q3-roadmap.pdf (2.4 MB)", time: "5h" },
];

const TONE_ICON: Record<string, string> = {
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400",
  warning: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  pink: "bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  error: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400",
};

export default function ProfilePage() {
  const [following, setFollowing] = useState(false);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Profile"
        description="View and manage your public profile, contact info, and recent activity."
        breadcrumbs={[{ label: "Account" }, { label: "Profile" }]}
        actions={
          <>
            <Button variant="secondary"><MessageSquare className="h-4 w-4" /> Message</Button>
            <Button><Pencil className="h-4 w-4" /> Edit Profile</Button>
          </>
        }
      />

      {/* Cover + Header */}
      <Card className="overflow-hidden p-0">
        <div className="h-36 w-full bg-gradient-to-br from-brand-500 via-accent-500 to-purple-500" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
              <div className="rounded-full ring-4 ring-white dark:ring-gray-900">
                <Avatar name="Aaroh Sharma" size={96} />
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Aaroh Sharma</h2>
                  <Badge tone="brand" variant="solid" dot>Admin</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">@aaroh · Member since Apr 2023</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <MapPin className="h-3 w-3" /> Mumbai, India · <Calendar className="h-3 w-3" /> Joined Apr 12, 2023
                </p>
              </div>
            </div>
            <Button variant={following ? "outline" : "primary"} onClick={() => setFollowing((v) => !v)}>
              {following ? "Following" : "Follow"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Posts" value="248" delta="+12 this week" deltaTone="up" icon={FileText} iconTone="brand" />
        <StatCard label="Followers" value="4,920" delta="+186" deltaTone="up" icon={Users} iconTone="purple" />
        <StatCard label="Following" value="312" delta="+4" deltaTone="up" icon={UserPlus} iconTone="orange" />
        <StatCard label="Reputation" value="9,840" delta="+5.2%" deltaTone="up" icon={Award} iconTone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: Profile card */}
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardHeader title="About" description="Bio and contact information" />
            <CardBody className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Principal product designer leading the Nimbus Pro design system. Passionate about building accessible, performant interfaces that scale across teams.
              </p>
              <div className="space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><Mail className="h-4 w-4 text-gray-400" /> aaroh.sharma@nimbuspro.io</p>
                <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><Phone className="h-4 w-4 text-gray-400" /> +91 98200 41122</p>
                <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><MapPin className="h-4 w-4 text-gray-400" /> Mumbai, Maharashtra, India</p>
                <p className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><Globe className="h-4 w-4 text-gray-400" /> aaroh.design</p>
              </div>
              <div className="flex gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 dark:border-gray-800 dark:hover:bg-brand-500/10"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Skills" description="Areas of expertise" />
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span key={s} className="rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                    {s}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Achievements" description="Recent badges earned" />
            <CardBody className="grid grid-cols-3 gap-3">
              {[
                { icon: Star, tone: "warning", label: "Top Contributor" },
                { icon: TrendingUp, tone: "brand", label: "Fast Mover" },
                { icon: Award, tone: "purple", label: "5-Year" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 p-3 text-center dark:border-gray-800">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", TONE_ICON[b.tone])}>
                    <b.icon className="h-5 w-5" />
                  </div>
                  <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">{b.label}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Middle: Activity */}
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader title="Recent Activity" description="Latest updates from your network" action={<Button variant="ghost" size="sm">View all</Button>} />
            <CardBody className="space-y-3">
              {ACTIVITY_FEED.map((a) => (
                <div key={a.id} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40">
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", TONE_ICON[a.tone])}>
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-semibold">{a.title}</span>{" "}
                      <span className="text-gray-500 dark:text-gray-400">{a.desc}</span>
                    </p>
                    <p className="text-xs text-gray-400">{a.time} ago</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Contribution Stats" description="Your activity this quarter" />
            <CardBody className="space-y-4">
              {[
                { label: "Posts published", value: 24, max: 40, tone: "brand" },
                { label: "Comments received", value: 312, max: 500, tone: "purple" },
                { label: "Helpful answers", value: 88, max: 100, tone: "success" },
                { label: "Profile completeness", value: 92, max: 100, tone: "warning" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{s.label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{s.value}/{s.max}</span>
                  </div>
                  <Progress
                    value={(s.value / s.max) * 100}
                    tone={s.tone as "brand" | "purple" | "success" | "warning"}
                  />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Bottom timeline */}
      <Card>
        <CardHeader title="Activity Timeline" description="Recent account events across the workspace" action={<Button variant="ghost" size="sm">Export</Button>} />
        <CardBody>
          <ol className="relative space-y-6 border-l border-gray-200 pl-6 dark:border-gray-800">
            {TIMELINE.map((t) => (
              <li key={t.id} className="relative">
                <span className={cn("absolute -left-[31px] flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900", TONE_ICON[t.tone || "brand"])}>
                  <t.icon className="h-3.5 w-3.5" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.title}</p>
                    <span className="text-xs text-gray-400">{t.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}
