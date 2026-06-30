import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { useSidebarContext } from "./sidebar-context";

const menuItemBaseStyles = cva(
  "group flex items-center gap-3 rounded-lg px-3 font-medium text-dark-5 transition-all duration-200 hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-white",
  {
    variants: {
      isActive: {
        true: "bg-primary-subtle text-primary hover:bg-primary-subtle hover:text-primary dark:bg-primary/10 dark:text-primary-light dark:hover:bg-primary/10 dark:hover:text-primary-light",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export function MenuItem(
  props: {
    className?: string;
    children: React.ReactNode;
    isActive: boolean;
  } & ({ as?: "button"; onClick: () => void } | { as: "link"; href: string }),
) {
  const { toggleSidebar, isMobile } = useSidebarContext();

  if (props.as === "link") {
    return (
      <Link
        href={props.href}
        onClick={() => isMobile && toggleSidebar()}
        className={cn(
          menuItemBaseStyles({
            isActive: props.isActive,
            className: "relative block py-2 text-sm",
          }),
          props.className,
        )}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      onClick={props.onClick}
      aria-expanded={props.isActive}
      className={cn(
        menuItemBaseStyles({
          isActive: props.isActive,
          className: "w-full py-2.5 text-sm",
        }),
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}
