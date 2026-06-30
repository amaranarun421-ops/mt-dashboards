import * as React from "react";
import { cn } from "@/lib/utils";
import { HeliosMark, QuoteIcon } from "./icons";

type Stat = { label: string; value: string };
type Benefit = { title: string; description: string };

type AuthHeroProps = {
  /** Headline at the top of the hero panel. */
  eyebrow?: string;
  title: string;
  description: string;
  benefits?: Benefit[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    avatarName: string;
  };
  stats?: Stat[];
  className?: string;
};

/**
 * Gradient hero panel used as the left side of the side-login / side-register
 * pages. Emerald→amber brand gradient, big title, optional benefits list,
 * optional testimonial card, and a stats row at the bottom.
 *
 * On mobile (below `lg`) this panel is hidden — the form panel takes the
 * full width. Use a compact brand strip there instead.
 */
export function AuthHero({
  eyebrow,
  title,
  description,
  benefits,
  testimonial,
  stats,
  className,
}: AuthHeroProps) {
  return (
    <div
      className={cn(
        "relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex xl:p-14",
        "bg-gradient-to-br from-primary-dark via-primary to-accent-dark",
        className,
      )}
    >
      {/* Decorative glow circles */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-accent/30 blur-3xl"
      />
      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Brand */}
      <div className="relative z-[1] flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
          <HeliosMark className="text-white" />
        </span>
        <div>
          <p className="text-lg font-bold leading-tight">Helios Pro</p>
          <p className="text-xs text-white/80">Illuminating Data</p>
        </div>
      </div>

      {/* Body */}
      <div className="relative z-[1] my-10 max-w-md">
        {eyebrow && (
          <span className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/25">
            {eyebrow}
          </span>
        )}
        <h1 className="text-3xl font-bold leading-tight xl:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/85 xl:text-base">
          {description}
        </p>

        {benefits && benefits.length > 0 && (
          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/20 ring-1 ring-white/40">
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{b.title}</p>
                  <p className="text-xs text-white/80">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {testimonial && (
          <figure className="mt-8 rounded-2xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur">
            <QuoteIcon className="text-white/70" />
            <blockquote className="mt-3 text-sm leading-relaxed text-white/95">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span
                className="grid size-9 place-items-center rounded-full bg-white/20 text-xs font-bold ring-1 ring-white/40"
                aria-hidden
              >
                {testimonial.avatarName
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="text-xs text-white/75">{testimonial.role}</p>
              </div>
            </figcaption>
          </figure>
        )}
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="relative z-[1] grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold xl:text-2xl">{s.value}</p>
              <p className="text-xs text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
