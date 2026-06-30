import { PageHeader } from "@/components/shared/page-header";
import { Card, CardHeader } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import {
  ChevronRight,
  HomeIcon,
  FolderIcon,
  FileTextIcon,
  User,
  TagIcon,
  PackageIcon,
  ShoppingCartIcon,
} from "@/components/Layouts/sidebar/icons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breadcrumbs",
  description:
    "Helios Pro — breadcrumb component showcase: basic, with icons, many items (truncate), with home and custom separator.",
};

// Inline breadcrumb item that supports icons + custom separators
function IconItem({
  icon,
  label,
  href,
  isLast,
}: {
  icon?: React.ReactNode;
  label: string;
  href?: string;
  isLast?: boolean;
}) {
  const cls = isLast
    ? "font-semibold text-dark dark:text-white"
    : "transition hover:text-primary dark:hover:text-primary-light";
  const inner = (
    <span className={`flex items-center gap-1.5 ${cls}`}>
      {icon}
      {label}
    </span>
  );
  return href && !isLast ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    inner
  );
}

function IconCrumbs({
  items,
  separator,
}: {
  items: { icon?: React.ReactNode; label: string; href?: string }[];
  separator?: React.ReactNode;
}) {
  const sep = separator ?? <ChevronRight className="size-3.5 text-dark-6" />;
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs text-dark-5 dark:text-dark-6"
    >
      {items.map((c, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            <IconItem
              icon={c.icon}
              label={c.label}
              href={c.href}
              isLast={isLast}
            />
            {!isLast && sep}
          </span>
        );
      })}
    </nav>
  );
}

export default function BreadcrumbsPage() {
  return (
    <>
      <PageHeader
        title="Breadcrumbs"
        description="Trail-of-crumbs navigation showing the user's location in the app hierarchy."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "UI Components", href: "/ui-components/breadcrumbs" },
          { label: "Breadcrumbs" },
        ]}
        actions={
          <Badge variant="primary">
            <ChevronRight className="size-3.5" /> 5 patterns
          </Badge>
        }
      />

      <div className="space-y-6">
        <Card>
          <CardHeader
            title="Basic breadcrumbs"
            subtitle="The shared Breadcrumbs component with plain text labels."
          />
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/" },
              { label: "Ecommerce", href: "/ecommerce/products" },
              { label: "Products", href: "/ecommerce/products" },
              { label: "Aurora Wireless Headphones" },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="With home"
            subtitle="Start the trail with a home icon for quick top-level access."
          />
          <IconCrumbs
            items={[
              {
                icon: <HomeIcon className="size-3.5" />,
                label: "Home",
                href: "/",
              },
              { label: "Apps", href: "/apps/calendar" },
              { label: "Calendar", href: "/apps/calendar" },
              { label: "April 2026" },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="With icons"
            subtitle="Each crumb carries a relevant lead icon."
          />
          <IconCrumbs
            items={[
              {
                icon: <HomeIcon className="size-3.5" />,
                label: "Home",
                href: "/",
              },
              {
                icon: <FolderIcon className="size-3.5" />,
                label: "Projects",
                href: "/dashboards/projects",
              },
              {
                icon: <PackageIcon className="size-3.5" />,
                label: "Helios Pro v2.4",
                href: "/apps/file-manager",
              },
              { icon: <FileTextIcon className="size-3.5" />, label: "Release notes" },
            ]}
          />
        </Card>

        <Card>
          <CardHeader
            title="Custom separator"
            subtitle="Swap the default slash for a chevron, dot or arrow."
          />
          <div className="space-y-3">
            <IconCrumbs
              separator={<ChevronRight className="size-3.5 text-dark-6" />}
              items={[
                { label: "Dashboard", href: "/" },
                { label: "Customers", href: "/ecommerce/customers" },
                { label: "Grace Whitfield" },
              ]}
            />
            <IconCrumbs
              separator={<span className="text-dark-6">·</span>}
              items={[
                { label: "Settings", href: "/pages/settings" },
                { label: "Team", href: "/user-account/team-members" },
                { label: "Roles", href: "/user-account/roles" },
                { label: "Admin" },
              ]}
            />
            <IconCrumbs
              separator={<span className="text-dark-6">/</span>}
              items={[
                { label: "Ecommerce", href: "/ecommerce/products" },
                { label: "Orders", href: "/ecommerce/orders" },
                { label: "#HLP-2041" },
              ]}
            />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Many items"
            subtitle="Truncate long trails with an ellipsis collapse for mid-trail items."
          />
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-dark-5 dark:text-dark-6"
          >
            <a href="/" className="transition hover:text-primary">
              Dashboard
            </a>
            <ChevronRight className="size-3.5 text-dark-6" />
            <a href="/ecommerce/products" className="transition hover:text-primary">
              Ecommerce
            </a>
            <ChevronRight className="size-3.5 text-dark-6" />
            <a href="/ecommerce/products" className="transition hover:text-primary">
              Products
            </a>
            <ChevronRight className="size-3.5 text-dark-6" />
            <button
              type="button"
              className="rounded px-1 text-dark-5 transition hover:bg-gray-2 dark:hover:bg-white/5"
              aria-label="Show hidden crumbs"
            >
              …
            </button>
            <ChevronRight className="size-3.5 text-dark-6" />
            <a href="/ecommerce/products/detail" className="transition hover:text-primary">
              Audio
            </a>
            <ChevronRight className="size-3.5 text-dark-6" />
            <a href="/ecommerce/products/detail" className="transition hover:text-primary">
              Headphones
            </a>
            <ChevronRight className="size-3.5 text-dark-6" />
            <span className="font-semibold text-dark dark:text-white">
              Aurora Wireless
            </span>
          </nav>
        </Card>

        <Card>
          <CardHeader
            title="In context"
            subtitle="Breadcrumbs sitting above a page title inside a card header."
          />
          <div className="space-y-3 rounded-xl border border-stroke p-4 dark:border-dark-3">
            <IconCrumbs
              items={[
                {
                  icon: <HomeIcon className="size-3.5" />,
                  label: "Home",
                  href: "/",
                },
                {
                  icon: <ShoppingCartIcon className="size-3.5" />,
                  label: "Orders",
                  href: "/ecommerce/orders",
                },
                {
                  icon: <TagIcon className="size-3.5" />,
                  label: "#HLP-2041",
                },
              ]}
            />
            <div>
              <h3 className="text-lg font-bold text-dark dark:text-white">
                Order #HLP-2041
              </h3>
              <p className="text-sm text-dark-5 dark:text-dark-6">
                Placed by Grace Whitfield · Shipped Apr 12
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Avatar-led crumb"
            subtitle="Pair an avatar with the final crumb for entity context."
          />
          <IconCrumbs
            items={[
              {
                icon: <HomeIcon className="size-3.5" />,
                label: "Home",
                href: "/",
              },
              { label: "Team", href: "/user-account/team-members" },
              {
                icon: <User className="size-3.5" />,
                label: "Daniel Kim",
              },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
