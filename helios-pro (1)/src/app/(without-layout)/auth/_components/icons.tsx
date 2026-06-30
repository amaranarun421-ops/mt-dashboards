import { SVGProps } from "react";

type PropsType = SVGProps<SVGSVGElement>;

/**
 * Google "G" logo — 4-color official mark.
 */
export function GoogleIcon(props: PropsType) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...props}>
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
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/**
 * GitHub mark (silhouette).
 */
export function GitHubIcon(props: PropsType) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.04 11.04 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56A11.51 11.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

/**
 * Eye icon for password reveal.
 */
export function EyeIcon(props: PropsType) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * Eye-off icon for password hide.
 */
export function EyeOffIcon(props: PropsType) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10.6 10.6a3 3 0 004.2 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9.4 5.2A10.6 10.6 0 0112 5c6.5 0 10 7 10 7a17.7 17.7 0 01-3.1 4M6.1 6.1A17.7 17.7 0 002 12s3.5 7 10 7a10.5 10.5 0 003.9-.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Helios sun-ray brand mark used in hero panels (single-color).
 */
export function HeliosMark(props: PropsType) {
  return (
    <svg width={48} height={48} viewBox="0 0 32 32" fill="none" {...props}>
      <circle cx="16" cy="16" r="6" fill="currentColor" />
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.55" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.9">
        <line x1="16" y1="2" x2="16" y2="5.5" />
        <line x1="16" y1="26.5" x2="16" y2="30" />
        <line x1="2" y1="16" x2="5.5" y2="16" />
        <line x1="26.5" y1="16" x2="30" y2="16" />
        <line x1="6.1" y1="6.1" x2="8.6" y2="8.6" />
        <line x1="23.4" y1="23.4" x2="25.9" y2="25.9" />
        <line x1="25.9" y1="6.1" x2="23.4" y2="8.6" />
        <line x1="8.6" y1="23.4" x2="6.1" y2="25.9" />
      </g>
    </svg>
  );
}

/**
 * Quote icon for testimonial panels.
 */
export function QuoteIcon(props: PropsType) {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M11.2 8C7.2 9.6 4.8 13 4.8 17.2c0 4.2 2 6.8 5.4 6.8 2.6 0 4.6-1.8 4.6-4.4 0-2.4-1.6-4.2-3.8-4.2-.4 0-.9.1-1.4.3.4-2 2.1-3.8 4.6-5L11.2 8zm12 0c-4 1.6-6.4 5-6.4 9.2 0 4.2 2 6.8 5.4 6.8 2.6 0 4.6-1.8 4.6-4.4 0-2.4-1.6-4.2-3.8-4.2-.4 0-.9.1-1.4.3.4-2 2.1-3.8 4.6-5L23.2 8z" />
    </svg>
  );
}
