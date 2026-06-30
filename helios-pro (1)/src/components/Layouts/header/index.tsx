"use client";

import { CommandPalette, useCommandPalette } from "@/components/shared/command-palette";
import { ThemeCustomizer } from "@/components/shared/theme-customizer";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon, SearchIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

function deriveTitle(pathname: string): { title: string; subtitle: string } {
  if (!pathname || pathname === "/") return { title: "Ecommerce", subtitle: "Helios Pro commerce overview" };
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "dashboard";
  const title = last
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
  return { title, subtitle: "Helios Pro workspace" };
}

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const { open, setOpen } = useCommandPalette();
  const pathname = usePathname();
  const { title, subtitle } = useMemo(() => deriveTitle(pathname), [pathname]);

  return (
    <>
      <header className="border-stroke shadow-1 dark:border-stroke-dark dark:bg-gray-dark sticky top-0 z-30 flex items-center justify-between border-b bg-white/95 px-4 py-3.5 backdrop-blur md:px-5 2xl:px-10">
        <button
          onClick={toggleSidebar}
          className="dark:border-stroke-dark rounded-lg border px-1.5 py-1 lg:hidden dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A]"
        >
          <MenuIcon />
          <span className="sr-only">Toggle Sidebar</span>
        </button>

        {isMobile && (
          <Link href={"/"} className="2xsm:ml-4 ml-2 max-[430px]:hidden">
            <Image
              src={"/images/logo/logo-icon.svg"}
              width={32}
              height={32}
              alt=""
              role="presentation"
            />
          </Link>
        )}

        <div className="max-xl:hidden">
          <h1 className="text-heading-6 text-dark mb-0.5 font-bold dark:text-white">
            {title}
          </h1>
          <p className="font-medium text-dark-5 dark:text-dark-6">{subtitle}</p>
        </div>

        <div className="2xsm:gap-3 flex flex-1 items-center justify-end gap-2">
          <button
            onClick={() => setOpen(true)}
            className="bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 flex w-full max-w-72 items-center gap-3 rounded-full border border-transparent px-4 py-2.5 text-sm text-dark-5 transition hover:border-primary/30 dark:text-dark-6 md:max-w-80 lg:max-w-96"
          >
            <SearchIcon className="size-4 shrink-0" />
            <span className="flex-1 text-left">Search pages, files, people...</span>
            <kbd className="hidden rounded border border-stroke bg-white px-1.5 py-0.5 text-[10px] font-medium text-dark-5 dark:border-dark-3 dark:bg-dark-3 dark:text-dark-6 sm:inline-block">
              ⌘K
            </kbd>
          </button>

          <ThemeToggleSwitch />
          <ThemeCustomizer />
          <Notification />

          <div className="shrink-0">
            <UserInfo />
          </div>
        </div>
      </header>

      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
