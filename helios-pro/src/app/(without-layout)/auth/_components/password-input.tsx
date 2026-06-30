"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { inputClass } from "@/components/shared/form-section";
import { EyeIcon, EyeOffIcon } from "./icons";

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  /** Optional leading icon node (e.g. `<LockIcon className="size-4" />`). */
  leadingIcon?: React.ReactNode;
  containerClassName?: string;
  invalid?: boolean;
};

/**
 * Password input with an eye/eye-off visibility toggle.
 *
 * Reuses the shared `inputClass` so it looks identical to other text inputs
 * on the page. The eye toggle sits inside the input on the right; a leading
 * icon (if provided) sits on the left.
 */
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(
  { className, containerClassName, leadingIcon, invalid, ...props },
  ref,
) {
  const [visible, setVisible] = React.useState(false);
  return (
    <div className={cn("relative", containerClassName)}>
      {leadingIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-6 dark:text-dark-6">
          {leadingIcon}
        </span>
      )}
      <input
        ref={ref}
        type={visible ? "text" : "password"}
        className={cn(
          inputClass,
          leadingIcon && "pl-10",
          "pr-10",
          invalid &&
            "border-red focus:border-red focus:ring-red/20 dark:border-red",
          className,
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 grid size-7 place-items-center rounded-md text-dark-6 transition hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-white"
      >
        {visible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  );
});
