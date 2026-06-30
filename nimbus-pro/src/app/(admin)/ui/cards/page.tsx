"use client";
import { useState } from "react";
import {
  PageHeader,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  StatCard,
  Button,
  Badge,
  Avatar,
  Input,
  Label,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Check,
  Sparkles,
  ArrowRight,
  Mail,
  Lock,
  Star,
  MapPin,
  Zap,
} from "lucide-react";

export default function CardsPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="space-y-4">
      <PageHeader
        title="Cards"
        description="Eight card designs — basic, with header/footer, image, gradient, hover, stats, pricing, and login."
        breadcrumbs={[{ label: "UI Components" }, { label: "Cards" }]}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic */}
        <Card>
          <CardBody>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Basic card</p>
            <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">A simple container</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Cards group related content with a soft shadow, rounded corners, and subtle border. Use them as the
              building blocks of dashboards and detail views.
            </p>
          </CardBody>
        </Card>

        {/* With header + footer */}
        <Card>
          <CardHeader title="Header & Footer" description="Add structure with named regions" />
          <CardBody>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">CardHeader</code> for titles and
              <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">CardFooter</code> for actions.
            </p>
          </CardBody>
          <CardFooter>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Save</Button>
          </CardFooter>
        </Card>

        {/* With image (gradient banner stand-in) */}
        <Card className="overflow-hidden">
          <div className="relative h-32 w-full gradient-bg">
            <div className="absolute inset-0 flex items-end justify-between p-4">
              <Badge tone="gray" variant="solid" className="bg-white/20 text-white backdrop-blur">Featured</Badge>
              <Sparkles className="h-5 w-5 text-white/80" />
            </div>
          </div>
          <CardBody>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Image header card</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Replace the gradient banner with a real <code className="rounded bg-gray-100 px-1 text-xs dark:bg-gray-800">&lt;img&gt;</code> for product shots or cover photos.
            </p>
          </CardBody>
        </Card>

        {/* Gradient card */}
        <Card className="overflow-hidden border-0">
          <div className="relative gradient-bg p-5 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Total revenue</p>
                <p className="mt-1 text-3xl font-bold">$48,290</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-white/90">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="font-semibold">+12.5%</span>
              <span>vs last month</span>
            </div>
          </div>
        </Card>

        {/* Hover card */}
        <Card hover>
          <CardBody>
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Hover me</p>
            <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">Interactive card</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Hover lifts the card with a deeper shadow and brand-tinted border. Great for clickable list items.
            </p>
            <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400">
              Learn more <ArrowRight className="h-4 w-4" />
            </div>
          </CardBody>
        </Card>

        {/* Stats card */}
        <StatCard
          label="Active users"
          value="8,492"
          delta="8.2%"
          deltaTone="up"
          icon={Users}
          iconTone="brand"
          footer="vs last week"
        />

        {/* Pricing card */}
        <Card className="relative overflow-hidden">
          <div className="absolute right-4 top-4">
            <Badge tone="brand" variant="solid">Popular</Badge>
          </div>
          <CardBody className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Pro plan</p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${billingCycle === "monthly" ? 29 : 290}
                </span>
                <span className="text-sm text-gray-500">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
              </div>
            </div>
            <div className="inline-flex rounded-lg border border-gray-200 p-1 dark:border-gray-800">
              {(["monthly", "yearly"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setBillingCycle(c)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-semibold capitalize transition-all",
                    billingCycle === c
                      ? "bg-brand-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <ul className="space-y-2">
              {["10 projects", "Unlimited collaborators", "Priority support", "Advanced analytics"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="h-4 w-4 text-success-500" /> {f}
                </li>
              ))}
            </ul>
            <Button variant="primary" className="w-full">Start free trial</Button>
          </CardBody>
        </Card>

        {/* Profile card */}
        <Card>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar name="Aria Chen" size={56} ring />
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Aria Chen</h3>
                <p className="text-xs text-gray-500">Product Designer · San Francisco</p>
                <div className="mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-400">PST timezone</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-gray-50 p-3 text-center dark:bg-gray-900/40">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">128</p>
                <p className="text-[10px] uppercase text-gray-500">Projects</p>
              </div>
              <div className="border-x border-gray-200 dark:border-gray-800">
                <p className="text-sm font-bold text-gray-900 dark:text-white">2.4k</p>
                <p className="text-[10px] uppercase text-gray-500">Followers</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">4.9</p>
                <p className="text-[10px] uppercase text-gray-500">Rating</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="flex-1">Follow</Button>
              <Button variant="outline" size="sm" className="flex-1">Message</Button>
            </div>
          </CardBody>
        </Card>

        {/* Login card */}
        <Card className="md:col-span-2 lg:col-span-1">
          <CardBody className="space-y-4">
            <div className="space-y-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg text-white">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Welcome back</h3>
              <p className="text-xs text-gray-500">Sign in to your Nimbus Pro account</p>
            </div>
            <div className="space-y-3">
              <div>
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input type="email" placeholder="you@company.com" className="pl-9" />
                </div>
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input type="password" placeholder="••••••••" className="pl-9" />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 text-brand-500" />
                  Remember me
                </label>
                <a href="#" className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">Forgot password?</a>
              </div>
              <Button variant="primary" className="w-full">Sign in</Button>
            </div>
          </CardBody>
        </Card>

        {/* Review / quote card */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardBody>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex -space-x-2">
                <Avatar name="Maya Patel" size={36} ring />
                <Avatar name="Jordan Lee" size={36} ring />
                <Avatar name="Sam Rivera" size={36} ring />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning-400 text-warning-400" />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-gray-700 dark:text-gray-300">4.9 / 5</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  &ldquo;Nimbus Pro transformed how our team ships dashboards. The component library is thoughtful, the
                  theming system is flexible, and our designers and engineers now speak the same language. We cut our
                  UI development time in half.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Maya Patel</p>
                    <p className="text-xs text-gray-500">VP of Engineering, Lumina</p>
                  </div>
                  <Badge tone="success" variant="soft">
                    <ShoppingCart className="h-3 w-3" /> Verified
                  </Badge>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
