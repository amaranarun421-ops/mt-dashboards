"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";

// Demo user — Helios Pro ships in demo mode (no auth backend required).
// To wire up real auth, replace this with `useSession()` from @/lib/auth/auth-client.
const DEMO_USER = {
  name: "Helios Admin",
  email: "admin@helios.pro",
  img: null as string | null,
};

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleLogout() {
    setIsOpen(false);
    toast.success("Demo logout — redirecting to login");
    router.push("/auth/sign-in");
  }

  const user = DEMO_USER;

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="cursor-pointer rounded align-middle ring-primary ring-offset-2 outline-none focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          {user?.img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.img}
              className="size-10 overflow-hidden rounded-full object-cover"
              alt={`Avatar of ${user.name}`}
            />
          ) : (
            <UserAvatar />
          )}
          <figcaption className="flex items-center gap-1 font-medium text-dark max-[1024px]:sr-only dark:text-dark-6">
            <span className="max-w-24 truncate">{user.name}</span>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md min-[230px]:min-w-70 dark:border-dark-3 dark:bg-gray-dark"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          <UserAvatar />
          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {user.name}
            </div>
            <div className="w-full max-w-47.5 truncate leading-none text-gray-6">
              {user.email}
            </div>
          </figcaption>
        </figure>

        <hr className="border-stroke dark:border-dark-3" />

        <div className="p-2 text-base text-dark-5 dark:text-dark-6">
          <Link
            href={"/user-account/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 ring-primary outline-0 hover:bg-gray-2 hover:text-dark focus-visible:ring-1 dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <UserIcon />
            <span className="mr-auto text-sm font-medium">View profile</span>
          </Link>

          <Link
            href={"/user-account/account-settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 ring-primary outline-0 hover:bg-gray-2 hover:text-dark focus-visible:ring-1 dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />
            <span className="mr-auto text-sm font-medium">Account Settings</span>
          </Link>
        </div>

        <hr className="border-stroke dark:border-dark-3" />

        <div className="p-2 text-base text-dark-5 dark:text-dark-6">
          <button
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 ring-primary outline-0 hover:bg-gray-2 hover:text-dark focus-visible:ring-1 dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={handleLogout}
          >
            <LogOutIcon />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}

function UserAvatar() {
  return (
    <span className="flex size-10 items-center justify-center rounded-full border border-stroke bg-primary-subtle text-primary outline-none dark:border-dark-4 dark:bg-primary/15 dark:text-primary-light">
      <UserIcon />
    </span>
  );
}
