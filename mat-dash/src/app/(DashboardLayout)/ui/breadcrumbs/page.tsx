"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Icon } from "@iconify/react";
import Link from "next/link";

const BreadcrumbsPage = () => {
  return (
    <PageContainer
      title="Breadcrumbs"
      description="Trail of the user's location within the app hierarchy. Multiple separators and styles."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Default (Chevron)">
          <nav className="flex items-center text-sm">
            <Link href="/" className="opacity-70 hover:text-primary">Home</Link>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
            <Link href="/ui" className="opacity-70 hover:text-primary">UI Components</Link>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
            <span className="text-primary font-medium">Breadcrumbs</span>
          </nav>
        </DemoBlock>

        <DemoBlock title="Slash Separator">
          <nav className="flex items-center text-sm">
            <Link href="/" className="opacity-70 hover:text-primary">Home</Link>
            <span className="mx-2 opacity-40">/</span>
            <Link href="/apps" className="opacity-70 hover:text-primary">Apps</Link>
            <span className="mx-2 opacity-40">/</span>
            <Link href="/apps/ecommerce" className="opacity-70 hover:text-primary">Ecommerce</Link>
            <span className="mx-2 opacity-40">/</span>
            <span className="text-primary font-medium">Shop</span>
          </nav>
        </DemoBlock>

        <DemoBlock title="With Icons">
          <nav className="flex items-center text-sm">
            <Link href="/" className="flex items-center gap-1 opacity-70 hover:text-primary"><Icon icon="solar:home-2-linear" width={14} /> Home</Link>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
            <Link href="/dashboards" className="flex items-center gap-1 opacity-70 hover:text-primary"><Icon icon="solar:widget-4-linear" width={14} /> Dashboards</Link>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
            <span className="flex items-center gap-1 text-primary font-medium"><Icon icon="solar:chart-line-linear" width={14} /> Analytics</span>
          </nav>
        </DemoBlock>

        <DemoBlock title="Card Style">
          <div className="rounded-lg bg-lightprimary dark:bg-darkinfo px-4 py-3">
            <nav className="flex items-center text-sm">
              <Link href="/" className="opacity-70 hover:text-primary">Home</Link>
              <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
              <Link href="/pages" className="opacity-70 hover:text-primary">Pages</Link>
              <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
              <span className="text-primary font-medium">FAQ</span>
            </nav>
          </div>
        </DemoBlock>

        <DemoBlock title="With Truncation" description="Long paths collapse">
          <nav className="flex items-center text-sm">
            <Link href="/" className="opacity-70 hover:text-primary">Home</Link>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
            <span className="opacity-50">…</span>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
            <Link href="/apps/ecommerce" className="opacity-70 hover:text-primary">Ecommerce</Link>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="mx-2 opacity-50" />
            <span className="text-primary font-medium">Product Details</span>
          </nav>
        </DemoBlock>

        <DemoBlock title="Pill Style">
          <nav className="flex items-center gap-1 text-sm">
            <Link href="/" className="px-2.5 py-1 rounded-full bg-lightprimary text-primary hover:bg-primary hover:text-white transition-colors">Home</Link>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="opacity-50" />
            <Link href="/ui" className="px-2.5 py-1 rounded-full bg-lightprimary text-primary hover:bg-primary hover:text-white transition-colors">UI</Link>
            <Icon icon="solar:alt-arrow-right-linear" width={14} className="opacity-50" />
            <span className="px-2.5 py-1 rounded-full bg-primary text-white">Breadcrumbs</span>
          </nav>
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default BreadcrumbsPage;
