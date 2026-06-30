"use client";

import * as React from "react";
import { Button } from "@/components/shared/button";
import { GoogleIcon, GitHubIcon } from "./icons";

type SocialProps = {
  onGoogle?: () => void;
  onGitHub?: () => void;
  googleLabel?: string;
  githubLabel?: string;
  className?: string;
};

/**
 * Two side-by-side social sign-in buttons (Google + GitHub) using the shared
 * `Button` component with the `outline` variant. Inline brand SVGs — no emojis.
 */
export function SocialButtons({
  onGoogle,
  onGitHub,
  googleLabel = "Google",
  githubLabel = "GitHub",
  className,
}: SocialProps) {
  return (
    <div className={className ?? "grid grid-cols-2 gap-3"}>
      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={onGoogle}
        className="w-full bg-white dark:bg-dark-2"
      >
        <GoogleIcon />
        <span className="truncate">{googleLabel}</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={onGitHub}
        className="w-full bg-white dark:bg-dark-2"
      >
        <GitHubIcon className="text-dark dark:text-white" />
        <span className="truncate">{githubLabel}</span>
      </Button>
    </div>
  );
}
