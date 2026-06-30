"use client";
import { useState } from "react";
import { PageHeader, Card, CardHeader, CardBody, Button, IconButton, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Plus,
  Search,
  Download,
  Trash2,
  Mail,
  ChevronRight,
  Heart,
  Settings,
  Bell,
  Share2,
  Loader2,
  ArrowRight,
  Check,
  Star,
  Pencil,
} from "lucide-react";

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeSegment, setActiveSegment] = useState(1);

  const simulateLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2200);
  };

  const segments = ["Day", "Week", "Month", "Year"];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Buttons"
        description="All button variants, sizes, states, and groupings used across the Nimbus Pro kit."
        breadcrumbs={[{ label: "UI Components" }, { label: "Buttons" }]}
        actions={
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4" /> New component
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Variants */}
        <Card>
          <CardHeader title="Variants" description="Five base styles — primary, secondary, ghost, danger, outline" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-900/40">
              <span className="text-xs font-medium text-gray-500">On tinted bg:</span>
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
            </div>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader title="Sizes" description="sm, md (default), lg, and icon-only" />
          <CardBody>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button size="sm" variant="outline">
                <Search className="h-3.5 w-3.5" /> Search
              </Button>
              <Button size="md" variant="outline">
                <Mail className="h-4 w-4" /> Email
              </Button>
              <Button size="lg" variant="outline">
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button size="icon" variant="primary" aria-label="settings">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" aria-label="bell">
                <Bell className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="heart">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="danger" aria-label="trash">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* With icons */}
        <Card>
          <CardHeader title="With Icons" description="Leading, trailing, and icon-only" />
          <CardBody className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">
                <Plus className="h-4 w-4" /> New project
              </Button>
              <Button variant="secondary">
                <Download className="h-4 w-4" /> Export
              </Button>
              <Button variant="outline">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost" size="sm">
                <Share2 className="h-3.5 w-3.5" /> Share
              </Button>
              <Button variant="danger" size="sm">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
              <Button variant="secondary" size="sm">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* States */}
        <Card>
          <CardHeader title="States" description="Loading, disabled, active toggle" />
          <CardBody className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={simulateLoad} disabled={loading} variant="primary">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" /> Save changes
                  </>
                )}
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
              <Button variant="outline" disabled>
                <Download className="h-4 w-4" /> Disabled
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setLiked((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                  liked
                    ? "bg-pink-500 text-white shadow-[0_4px_12px_-2px_rgba(236,72,188,0.35)]"
                    : "border border-gray-200 text-gray-700 hover:border-pink-400 hover:text-pink-600 dark:border-gray-700 dark:text-gray-300"
                )}
              >
                <Heart className={cn("h-4 w-4 transition-all", liked && "fill-current")} />
                {liked ? "Liked" : "Like"}
              </button>
              <Badge tone={loading ? "warning" : "success"} variant="soft">
                {loading ? "Saving" : "Idle"}
              </Badge>
            </div>
          </CardBody>
        </Card>

        {/* Button group */}
        <Card>
          <CardHeader title="Button Group" description="Segmented controls and joined groups" />
          <CardBody className="space-y-4">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 dark:border-gray-800">
              {segments.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setActiveSegment(i)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition-all",
                    i === activeSegment
                      ? "bg-brand-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                <button className="border-r border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800" aria-label="search">
                  <Search className="h-3.5 w-3.5" />
                </button>
                <button className="border-r border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800" aria-label="edit">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button className="px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800" aria-label="share">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <Button size="sm" variant="secondary">
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Icon buttons (IconButton) */}
        <Card>
          <CardHeader title="Icon Buttons" description="Standalone square icon buttons" />
          <CardBody className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <IconButton aria-label="search">
                <Search className="h-4 w-4" />
              </IconButton>
              <IconButton aria-label="settings">
                <Settings className="h-4 w-4" />
              </IconButton>
              <IconButton aria-label="notifications">
                <Bell className="h-4 w-4" />
              </IconButton>
              <IconButton aria-label="share">
                <Share2 className="h-4 w-4" />
              </IconButton>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton className="bg-brand-50 text-brand-600 hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-400" aria-label="star">
                <Star className="h-4 w-4" />
              </IconButton>
              <IconButton className="bg-error-50 text-error-600 hover:bg-error-100 dark:bg-error-500/15 dark:text-error-400" aria-label="delete">
                <Trash2 className="h-4 w-4" />
              </IconButton>
              <IconButton className="bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-500/15 dark:text-purple-400" aria-label="like">
                <Heart className={cn("h-4 w-4", liked && "fill-current")} />
              </IconButton>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
