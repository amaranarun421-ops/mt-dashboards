'use client';

import * as React from 'react';

/**
 * Real brand SVG icons for traffic sources, integrations, and platforms.
 * All icons use viewBox 0 0 24 24 unless noted otherwise.
 * Brand colors are baked in as the fill color, so you can drop these into
 * any neutral container.
 */

/* ----------------------------- Google ----------------------------- */
export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

/* ----------------------------- YouTube ----------------------------- */
export function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ----------------------------- Facebook ----------------------------- */
export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

/* ----------------------------- Instagram (gradient) ----------------------------- */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="10%" stopColor="#FFDD55" />
          <stop offset="50%" stopColor="#FF543E" />
          <stop offset="100%" stopColor="#C837AB" />
        </radialGradient>
        <radialGradient id="ig-grad-2" cx="20%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#3771C8" />
          <stop offset="100%" stopColor="#3771C8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <rect width="24" height="24" rx="6" fill="url(#ig-grad-2)" />
      <path
        fill="#FFFFFF"
        d="M12 6.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm5.338-8.469a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"
      />
    </svg>
  );
}

/* ----------------------------- X (Twitter) ----------------------------- */
export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#000000"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
      />
    </svg>
  );
}

/* ----------------------------- Twitter (legacy bird) ----------------------------- */
export function TwitterBirdIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#1DA1F2"
        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.78-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
      />
    </svg>
  );
}

/* ----------------------------- LinkedIn ----------------------------- */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

/* ----------------------------- Meta (Facebook parent) ----------------------------- */
export function MetaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#0866FF"
        d="M6.898 0C3.072 0 0 3.636 0 8.077c0 4.294 2.667 9.302 5.493 12.615C8.32 24.005 11.058 24 12 24c2.96 0 4.79-1.93 4.79-3.97 0-1.16-.56-2.27-1.46-3.16-1.18-1.16-2.32-2.13-2.97-2.79 1.65-1.81 3.4-4.16 3.4-7.07C15.76 3.07 12.27 0 6.898 0zm-.05 2.6c2.96 0 5.91 2.42 5.91 6.4 0 2.5-1.85 5.18-3.83 7.39-1.07-1.18-3.18-3.78-3.18-7.39 0-2.5 1.34-4.04 3.1-4.04z"
      />
      <path
        fill="#0081FB"
        d="M17.102 24c3.826 0 6.898-3.636 6.898-8.077 0-4.294-2.667-9.302-5.493-12.615C15.68.005 12.942 0 12 0c2.96 0 4.79 1.93 4.79 3.97 0 1.16.84 1.96 1.74 2.85 1.18 1.16 2.69 3.27 2.69 6.18 0 3.93-3.45 6.4-7.41 6.4-2.49 0-4.83-1.18-6.92-3.4.79 1.18 3.7 4.41 6.92 7.39 1.07.99 2.04 1.61 3.29 1.61z"
      />
    </svg>
  );
}

/* ----------------------------- TikTok ----------------------------- */
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#25F4EE"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.26z"
      />
      <path
        fill="#FE2C55"
        d="M18.13 7.34a4.82 4.82 0 0 1-2.31-1.18 4.83 4.83 0 0 1-1.42-2.71H12.4v11.62a2.89 2.89 0 0 1-5.18 1.74 2.89 2.89 0 0 1 3.6-4.41V8.39A6.33 6.33 0 0 0 5.61 19.1a6.33 6.33 0 0 0 10.85-4.43V8.92c.86.62 1.84 1.06 2.92 1.27V6.69a4.85 4.85 0 0 1-1.25-.05z"
      />
      <path
        fill="#000000"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.26z"
      />
    </svg>
  );
}

/* ----------------------------- Pinterest ----------------------------- */
export function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#BD081C"
        d="M12.017 0C5.396 0 .019 5.377.019 11.998c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.377 11.99-11.998C24.007 5.377 18.641.001 12.017.001z"
      />
    </svg>
  );
}

/* ----------------------------- Reddit ----------------------------- */
export function RedditIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#FF4500"
        d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.214-4.259-1.985-6.971-2.078l1.182-5.498 3.857.811-.005.157c0 1.082.844 1.96 1.881 1.96 1.038 0 1.882-.878 1.882-1.96 0-1.083-.844-1.96-1.882-1.96-.766 0-1.426.482-1.715 1.171l-4.273-.899a.467.467 0 0 0-.318.05.413.413 0 0 0-.182.27l-1.318 6.123c-2.727.083-5.193.854-7.014 2.075-.477-.46-1.125-.746-1.84-.746-1.465 0-2.657 1.186-2.657 2.645 0 1.031.597 1.922 1.459 2.357-.057.318-.087.643-.087.973 0 3.289 3.829 5.961 8.547 5.961 4.719 0 8.548-2.672 8.548-5.961 0-.33-.03-.655-.087-.973.861-.435 1.459-1.326 1.459-2.357zm-15.643 1.96c0-1.083.844-1.961 1.882-1.961 1.038 0 1.882.878 1.882 1.961 0 1.082-.844 1.96-1.882 1.96-1.038 0-1.882-.878-1.882-1.96zm8.276 4.158c-.748.748-2.117 1.107-4.108 1.107h-.018c-1.992 0-3.36-.359-4.108-1.107a.413.413 0 0 1 .585-.583c.482.482 1.515.823 3.523.823h.018c2.008 0 3.041-.341 3.523-.823a.414.414 0 0 1 .585.583zm-.099-2.198c-1.038 0-1.882-.878-1.882-1.96 0-1.083.844-1.961 1.882-1.961 1.038 0 1.882.878 1.882 1.961 0 1.082-.844 1.96-1.882 1.96z"
      />
    </svg>
  );
}

/* ----------------------------- Organic / Direct / Email ----------------------------- */
export function OrganicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function DirectIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* ========================================================================
   TRAFFIC SOURCE REGISTRY
   ======================================================================== */
export type TrafficSourceKey =
  | 'google'
  | 'youtube'
  | 'facebook'
  | 'instagram'
  | 'meta'
  | 'x'
  | 'twitter'
  | 'linkedin'
  | 'tiktok'
  | 'pinterest'
  | 'reddit'
  | 'email'
  | 'direct'
  | 'organic';

export interface TrafficSourceMeta {
  /** Component that renders the real brand icon (sized via className) */
  Icon: React.ComponentType<{ className?: string }>;
  /** Solid brand accent color, used for the progress bar fill */
  color: string;
  /** Optional background tone for the icon container — if the icon is single-color on a flat field */
  bg?: string;
}

export const TRAFFIC_SOURCES: Record<TrafficSourceKey, TrafficSourceMeta> = {
  google: { Icon: GoogleIcon, color: '#4285F4' },
  youtube: { Icon: YouTubeIcon, color: '#FF0000' },
  facebook: { Icon: FacebookIcon, color: '#1877F2' },
  instagram: { Icon: InstagramIcon, color: '#E4405F' },
  meta: { Icon: MetaIcon, color: '#0866FF' },
  x: { Icon: XIcon, color: '#0f1419', bg: '#f2f4f7' },
  twitter: { Icon: TwitterBirdIcon, color: '#1DA1F2' },
  linkedin: { Icon: LinkedInIcon, color: '#0A66C2' },
  tiktok: { Icon: TikTokIcon, color: '#000000', bg: '#f2f4f7' },
  pinterest: { Icon: PinterestIcon, color: '#BD081C' },
  reddit: { Icon: RedditIcon, color: '#FF4500' },
  email: {
    Icon: EmailIcon,
    color: 'var(--color-brand-500)',
    bg: 'var(--color-brand-50)',
  },
  direct: {
    Icon: DirectIcon,
    color: 'var(--color-success-600)',
    bg: 'var(--color-success-50)',
  },
  organic: {
    Icon: OrganicIcon,
    color: 'var(--color-warning-600)',
    bg: 'var(--color-warning-50)',
  },
};

/* ========================================================================
   COUNTRY FLAG SVGs (4:3 rounded rectangles, real national flags)
   ======================================================================== */
type FlagProps = { className?: string };

function FlagFrame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={
        className ??
        'inline-flex h-4 w-6 items-center justify-center overflow-hidden rounded-[3px] ring-1 ring-black/5'
      }
    >
      <svg viewBox="0 0 24 18" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
}

/* United States — 13 stripes + 50-star canton */
export function USFlag({ className }: FlagProps) {
  const stars = Array.from({ length: 9 }).map((_, row) => {
    const starsInRow = row % 2 === 0 ? 6 : 5;
    return Array.from({ length: starsInRow }).map((_, col) => {
      const x = 1.6 + col * 1.7 + (row % 2 === 0 ? 0 : 0.85);
      const y = 0.9 + row * 1.0;
      return <circle key={`${row}-${col}`} cx={x} cy={y} r="0.45" fill="#FFFFFF" />;
    });
  });
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#FFFFFF" />
      {[0, 2, 4, 6, 8, 10, 12].map((y) => (
        <rect key={y} x="0" y={y} width="24" height="1.385" fill="#B22234" />
      ))}
      <rect width="9.6" height="9.7" fill="#3C3B6E" />
      {stars}
    </FlagFrame>
  );
}

/* United Kingdom — Union Jack */
export function GBFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#012169" />
      <path d="M0 0 L24 18 M24 0 L0 18" stroke="#FFFFFF" strokeWidth="3.6" />
      <path d="M0 0 L24 18 M24 0 L0 18" stroke="#C8102E" strokeWidth="2.2" />
      <path d="M12 0 V18 M0 9 H24" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M12 0 V18 M0 9 H24" stroke="#C8102E" strokeWidth="3.6" />
    </FlagFrame>
  );
}

/* Germany — black, red, gold horizontal stripes */
export function DEFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#FFCE00" />
      <rect width="24" height="12" fill="#DD0000" />
      <rect width="24" height="6" fill="#000000" />
    </FlagFrame>
  );
}

/* France — blue, white, red vertical stripes */
export function FRFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="8" height="18" fill="#0055A4" />
      <rect x="8" width="8" height="18" fill="#FFFFFF" />
      <rect x="16" width="8" height="18" fill="#EF4135" />
    </FlagFrame>
  );
}

/* Australia — Union Jack canton + Southern Cross */
export function AUFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#00008B" />
      {/* Union Jack canton */}
      <g transform="scale(0.5)">
        <rect width="24" height="18" fill="#012169" />
        <path d="M0 0 L24 18 M24 0 L0 18" stroke="#FFFFFF" strokeWidth="3.6" />
        <path d="M0 0 L24 18 M24 0 L0 18" stroke="#C8102E" strokeWidth="2.2" />
        <path d="M12 0 V18 M0 9 H24" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M12 0 V18 M0 9 H24" stroke="#C8102E" strokeWidth="3.6" />
      </g>
      {/* Commonwealth star + Southern Cross dots */}
      <circle cx="14" cy="4" r="0.5" fill="#FFFFFF" />
      <circle cx="17" cy="6" r="0.5" fill="#FFFFFF" />
      <circle cx="17" cy="9" r="0.5" fill="#FFFFFF" />
      <circle cx="14" cy="11" r="0.5" fill="#FFFFFF" />
      <circle cx="20" cy="13" r="0.5" fill="#FFFFFF" />
    </FlagFrame>
  );
}

/* Japan — red circle on white */
export function JPFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#FFFFFF" />
      <circle cx="12" cy="9" r="5.4" fill="#BC002D" />
    </FlagFrame>
  );
}

/* Canada — red/white/red with maple leaf */
export function CAFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="6" height="18" fill="#FF0000" />
      <rect x="6" width="12" height="18" fill="#FFFFFF" />
      <rect x="18" width="6" height="18" fill="#FF0000" />
      <path
        d="M12 3 L13.2 6 L16 5.4 L14.6 8 L17 9.2 L14.4 10 L15 12.6 L12.6 11.4 L12 14 L11.4 11.4 L9 12.6 L9.6 10 L7 9.2 L9.4 8 L8 5.4 L10.8 6 Z"
        fill="#FF0000"
      />
    </FlagFrame>
  );
}

/* India — saffron, white, green with chakra */
export function INFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#FFFFFF" />
      <rect width="24" height="6" fill="#FF9933" />
      <rect y="12" width="24" height="6" fill="#138808" />
      <circle cx="12" cy="9" r="2.4" fill="none" stroke="#000080" strokeWidth="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 12 + Math.cos(angle) * 1.0;
        const y1 = 9 + Math.sin(angle) * 1.0;
        const x2 = 12 + Math.cos(angle) * 2.4;
        const y2 = 9 + Math.sin(angle) * 2.4;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000080" strokeWidth="0.3" />;
      })}
    </FlagFrame>
  );
}

/* Brazil — green field, yellow diamond, blue circle */
export function BRFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#009C3B" />
      <path d="M12 2 L22 9 L12 16 L2 9 Z" fill="#FFDF00" />
      <circle cx="12" cy="9" r="3.5" fill="#002776" />
      <path d="M8.5 8.2 Q12 7.4 15.5 8.2" stroke="#FFFFFF" strokeWidth="0.6" fill="none" />
    </FlagFrame>
  );
}

/* Netherlands — red, white, blue horizontal stripes */
export function NLFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#FFFFFF" />
      <rect width="24" height="6" fill="#AE1C28" />
      <rect y="12" width="24" height="6" fill="#21468B" />
    </FlagFrame>
  );
}

/* Spain — red/yellow/red horizontal stripes */
export function ESFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="18" fill="#AA151B" />
      <rect y="4.5" width="24" height="9" fill="#F1BF00" />
    </FlagFrame>
  );
}

/* Italy — green, white, red vertical stripes */
export function ITFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="8" height="18" fill="#009246" />
      <rect x="8" width="8" height="18" fill="#FFFFFF" />
      <rect x="16" width="8" height="18" fill="#CE2B37" />
    </FlagFrame>
  );
}

/* Singapore — red top, white bottom, with crescent + stars */
export function SGFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="24" height="9" fill="#EF3340" />
      <rect y="9" width="24" height="9" fill="#FFFFFF" />
      <g transform="translate(4,4.5)">
        <path d="M0 -2 A2 2 0 1 0 2 0 L3.5 -0.6 A3.6 3.6 0 1 1 0 -3.6 Z" fill="#FFFFFF" />
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 36 - 90) * (Math.PI / 180);
          const r = 1.4;
          const x = 1.5 + Math.cos(angle) * r;
          const y = -0.5 + Math.sin(angle) * r;
          return <circle key={i} cx={x} cy={y} r="0.3" fill="#FFFFFF" />;
        })}
      </g>
    </FlagFrame>
  );
}

/* UAE — red vertical stripe + green/white/black horizontal */
export function AEFlag({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="6" height="18" fill="#CE1126" />
      <rect x="6" width="18" height="6" fill="#009E49" />
      <rect x="6" y="6" width="18" height="6" fill="#FFFFFF" />
      <rect x="6" y="12" width="18" height="6" fill="#000000" />
    </FlagFrame>
  );
}

/* ========================================================================
   COUNTRY FLAG REGISTRY
   ======================================================================== */
export type CountryCode =
  | 'US'
  | 'GB'
  | 'DE'
  | 'FR'
  | 'AU'
  | 'JP'
  | 'CA'
  | 'IN'
  | 'BR'
  | 'NL'
  | 'ES'
  | 'IT'
  | 'SG'
  | 'AE';

export const COUNTRY_FLAGS: Record<CountryCode, React.ComponentType<{ className?: string }>> = {
  US: USFlag,
  GB: GBFlag,
  DE: DEFlag,
  FR: FRFlag,
  AU: AUFlag,
  JP: JPFlag,
  CA: CAFlag,
  IN: INFlag,
  BR: BRFlag,
  NL: NLFlag,
  ES: ESFlag,
  IT: ITFlag,
  SG: SGFlag,
  AE: AEFlag,
};
