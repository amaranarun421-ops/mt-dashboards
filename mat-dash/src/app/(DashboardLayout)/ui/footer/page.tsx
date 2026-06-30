"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Icon } from "@iconify/react";
import Link from "next/link";

const FooterPage = () => (
  <PageContainer title="Footer" description="Page footer variants with links, social, and copyright.">
    <div className="space-y-6">
      <DemoBlock title="Simple Footer">
        <footer className="border-t border-defaultBorder pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70">© 2024 mtverse. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Support", "Contact"].map((l) => <Link key={l} href="#" className="text-sm hover:text-primary">{l}</Link>)}
          </div>
        </footer>
      </DemoBlock>

      <DemoBlock title="Multi-Column Footer">
        <footer className="border-t border-defaultBorder pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <h5 className="font-semibold text-sm mb-3">Product</h5>
              <ul className="space-y-2 text-sm opacity-70">
                {["Features", "Pricing", "Changelog", "Roadmap"].map((l) => <li key={l}><Link href="#" className="hover:text-primary">{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-sm mb-3">Company</h5>
              <ul className="space-y-2 text-sm opacity-70">
                {["About", "Blog", "Careers", "Contact"].map((l) => <li key={l}><Link href="#" className="hover:text-primary">{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-sm mb-3">Resources</h5>
              <ul className="space-y-2 text-sm opacity-70">
                {["Docs", "API", "Community", "Status"].map((l) => <li key={l}><Link href="#" className="hover:text-primary">{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-sm mb-3">Legal</h5>
              <ul className="space-y-2 text-sm opacity-70">
                {["Privacy", "Terms", "Security", "Cookies"].map((l) => <li key={l}><Link href="#" className="hover:text-primary">{l}</Link></li>)}
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-defaultBorder">
            <p className="text-sm opacity-70">© 2024 mtverse. All rights reserved.</p>
            <div className="flex gap-2">
              {["solar:twitter-logo-bold", "solar:facebook-logo-bold", "solar:linkedin-logo-bold", "solar:instagram-logo-bold"].map((i) => (
                <Link key={i} href="#" className="h-8 w-8 rounded-full bg-lightgray dark:bg-dark hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                  <Icon icon={i} width={16} />
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </DemoBlock>
    </div>
  </PageContainer>
);

export default FooterPage;
