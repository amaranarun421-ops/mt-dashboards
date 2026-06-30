'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * ComponentKeywords — a modern pill-chip table-of-contents strip shown at
 * the top of each component page. Each chip is clickable and scrolls to the
 * corresponding section on the page.
 */

interface ComponentKeywordsProps {
  keywords: string[];
  className?: string;
}

export function ComponentKeywords({ keywords, className }: ComponentKeywordsProps) {
  function scrollToKeyword(keyword: string) {
    // Find a SectionCard whose title contains the keyword (case-insensitive)
    const sections = document.querySelectorAll('[id="dashboard-main"] section, [id="dashboard-main"] [class*="ds-card"]');
    for (const s of sections) {
      const heading = s.querySelector('h2, h3, .ds-section-title');
      if (heading && heading.textContent?.toLowerCase().includes(keyword.toLowerCase())) {
        s.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // Fallback: try matching any heading text
    const allHeadings = document.querySelectorAll('[id="dashboard-main"] h2, [id="dashboard-main"] h3, [id="dashboard-main"] .ds-section-title');
    for (const h of allHeadings) {
      if (h.textContent?.toLowerCase().includes(keyword.toLowerCase())) {
        h.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
  }

  return (
    <div className={cn('mb-6', className)}>
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => scrollToKeyword(kw)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] transition-all hover:border-[var(--color-brand-400)] hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-700)] hover:shadow-sm dark:hover:bg-[rgba(70,95,255,0.16)] dark:hover:text-[var(--color-brand-300)]"
          >
            {kw}
          </button>
        ))}
      </div>
    </div>
  );
}
