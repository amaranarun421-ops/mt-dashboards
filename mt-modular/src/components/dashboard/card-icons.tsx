'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Real card brand icons — SVG paths                                  */
/* ------------------------------------------------------------------ */

export type CardBrand =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'paypal'
  | 'applepay'
  | 'googlepay'
  | 'stripe'
  | 'unknown';

export function VisaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="Visa">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path
        d="M20.5 22.4L22.3 9.7h2.9L23.4 22.4h-2.9zm13.4-12.4c-.6-.2-1.5-.4-2.6-.4-2.9 0-4.9 1.5-4.9 3.6 0 1.6 1.4 2.4 2.5 2.9 1.1.5 1.5.8 1.5 1.3 0 .7-.9 1-1.7 1-1.1 0-1.7-.2-2.6-.5l-.4-.2-.4 2.4c.6.3 1.8.5 3 .5 3 0 5-1.5 5-3.7 0-1.2-.8-2.2-2.5-2.9-1-.5-1.7-.8-1.7-1.3 0-.5.5-.9 1.7-.9.9 0 1.7.2 2.2.4l.3.1.4-2.3M30.7 9.7l-2.2 8.7-.2-1c-.5-1.5-1.8-3.1-3.4-3.9l2 9.9h2.9l4.4-12.7h-2.9M16.7 9.7l-2.8 8.7-.3-1.4c-.5-1.6-2-3.4-3.7-4.3l2.6 9.7h3L19.6 9.7h-3"
        fill="#fff"
      />
    </svg>
  );
}

export function MastercardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="Mastercard">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <circle cx="19" cy="16" r="8" fill="#EB001B" />
      <circle cx="29" cy="16" r="8" fill="#F79E1B" />
      <path
        d="M24 9.5c1.8 1.5 3 3.7 3 6.1s-1.1 4.6-3 6.1c-1.8-1.5-3-3.7-3-6.1s1.1-4.6 3-6.1z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function AmexIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="American Express">
      <rect width="48" height="32" rx="4" fill="#1F72CD" />
      <path
        d="M9 19.5h2l.5-1.2H9v-1h2.8l.5-1.2H7v6h2v-2.6zm5.5-2.6L12 21h2l.4-1h2.2l.4 1h2v-4.1h-2v3l-1.5-3h-2zm.8 2.1l.6-1.6.6 1.6h-1.2zM21 17h2v6h-2v-6zm4.5 0L23 21h2l.4-1h2.2l.4 1h2v-4.1h-2v3l-1.5-3h-2zm.8 2.1l.6-1.6.6 1.6h-1.2zM34 17l-1 2-1-2h-2l2 4-1 2h2l3-6h-2z"
        fill="#fff"
      />
    </svg>
  );
}

export function DiscoverIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="Discover">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <path d="M0 16h48v12c0 2-2 4-4 4H4c-2 0-4-2-4-4V16z" fill="#F76B1C" />
      <circle cx="34" cy="11" r="5" fill="#F76B1C" />
      <path
        d="M6 9.5h2.5c1.8 0 3 1 3 2.5s-1.2 2.5-3 2.5H6v-5zm1.5 1.2v2.6h1c1 0 1.6-.5 1.6-1.3s-.6-1.3-1.6-1.3h-1zM14 9.5h1.5v5H14v-5zm5 0c1.7 0 3 1.1 3 2.5s-1.3 2.5-3 2.5-3-1.1-3-2.5 1.3-2.5 3-2.5zm0 1.2c-.8 0-1.5.6-1.5 1.3s.7 1.3 1.5 1.3 1.5-.6 1.5-1.3-.7-1.3-1.5-1.3z"
        fill="#231F20"
      />
    </svg>
  );
}

export function PaypalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="PayPal">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <path
        d="M17 9h6c2.5 0 4 1.5 3.5 4-.5 2.5-2.5 4-5 4h-2l-.5 3H16l1-7zm3 2l-.5 4h2c1 0 2-.5 2.2-2 .3-1.5-.5-2-1.7-2H20z"
        fill="#003087"
      />
      <path
        d="M24 9h6c2.5 0 4 1.5 3.5 4-.5 2.5-2.5 4-5 4h-2l-.5 3H23l1-7zm3 2l-.5 4h2c1 0 2-.5 2.2-2 .3-1.5-.5-2-1.7-2H27z"
        fill="#009CDE"
      />
    </svg>
  );
}

export function ApplePayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="Apple Pay">
      <rect width="48" height="32" rx="4" fill="#000" />
      <path
        d="M14 11.5c.3-.4.5-1 .4-1.5-.5 0-1 .3-1.4.7-.3.4-.5.9-.4 1.4.5.1 1-.2 1.4-.6zm.4 1c-.7 0-1.3.4-1.6.4-.4 0-.9-.4-1.5-.4-.8 0-1.5.4-1.9 1.2-.8 1.4-.2 3.5.6 4.6.4.6.8 1.2 1.4 1.2.6 0 .8-.4 1.5-.4.7 0 .9.4 1.5.4.6 0 1-.6 1.4-1.2.4-.6.6-1.3.6-1.3-.4-.2-1.1-.7-1.1-1.7 0-.9.6-1.4.7-1.4-.4-.6-1-.6-1.2-.6-.7-.1-1.3.4-1.4.4z"
        fill="#fff"
      />
      <text x="20" y="20" fontSize="10" fontWeight="700" fill="#fff" fontFamily="system-ui">Pay</text>
    </svg>
  );
}

export function GooglePayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="Google Pay">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <circle cx="11" cy="13" r="2.5" fill="#4285F4" />
      <circle cx="14" cy="11" r="2.5" fill="#EA4335" />
      <circle cx="14" cy="15" r="2.5" fill="#FBBC05" />
      <circle cx="17" cy="13" r="2.5" fill="#34A853" />
      <text x="22" y="17" fontSize="9" fontWeight="700" fill="#5F6368" fontFamily="system-ui">Pay</text>
    </svg>
  );
}

export function StripeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="Stripe">
      <rect width="48" height="32" rx="4" fill="#635BFF" />
      <path
        d="M22 13.5c0-1 1-1.5 2.4-1.5 2.2 0 4.4.6 4.4.6V8.5S26.7 8 24.5 8C20.7 8 18 9.8 18 13.4c0 4.3 6 3.6 6 5.5 0 .8-1 1.3-2.5 1.3-2.3 0-4.7-.9-4.7-.9v3.7s2 .8 4.5.8c4 0 6.7-1.8 6.7-5.4 0-4.6-6-3.9-6-5.9z"
        fill="#fff"
      />
    </svg>
  );
}

export function UnknownCardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={cn('size-7', className)} role="img" aria-label="Card">
      <rect width="48" height="32" rx="4" fill="#1D2939" />
      <rect x="4" y="9" width="14" height="3" rx="1" fill="#667085" />
      <rect x="4" y="20" width="20" height="3" rx="1" fill="#667085" />
      <rect x="34" y="20" width="10" height="3" rx="1" fill="#667085" />
    </svg>
  );
}

export function CardIcon({ brand, className }: { brand: CardBrand; className?: string }) {
  switch (brand) {
    case 'visa':
      return <VisaIcon className={className} />;
    case 'mastercard':
      return <MastercardIcon className={className} />;
    case 'amex':
      return <AmexIcon className={className} />;
    case 'discover':
      return <DiscoverIcon className={className} />;
    case 'paypal':
      return <PaypalIcon className={className} />;
    case 'applepay':
      return <ApplePayIcon className={className} />;
    case 'googlepay':
      return <GooglePayIcon className={className} />;
    case 'stripe':
      return <StripeIcon className={className} />;
    default:
      return <UnknownCardIcon className={className} />;
  }
}

export function detectCardBrand(number: string): CardBrand {
  const cleaned = number.replace(/\s/g, '');
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  if (/^6(?:011|5)/.test(cleaned)) return 'discover';
  return 'unknown';
}

export function formatCardNumber(number: string): string {
  const cleaned = number.replace(/\s/g, '');
  const matches = cleaned.match(/.{1,4}/g);
  return matches ? matches.join(' ') : cleaned;
}

export function maskCardNumber(number: string): string {
  const cleaned = number.replace(/\s/g, '');
  if (cleaned.length < 8) return cleaned;
  return `${cleaned.slice(0, 4)} •••• •••• ${cleaned.slice(-4)}`;
}
