export type ChangeKind = "Added" | "Changed" | "Fixed" | "Removed" | "Deprecated";

export type ChangeEntry = {
  kind: ChangeKind;
  text: string;
};

export type ChangelogVersion = {
  version: string;
  date: string;
  title: string;
  highlight?: string;
  changes: ChangeEntry[];
};

export const changelogVersions: ChangelogVersion[] = [
  {
    version: "v4.2.0",
    date: "2026-04-22",
    title: "Realtime dashboards + AI insights",
    highlight:
      "Live data streaming for any chart, plus an AI panel that explains anomalies in plain English.",
    changes: [
      { kind: "Added", text: "Realtime streaming mode for HeliosChart (websocket-backed, 1s tick)." },
      { kind: "Added", text: "AI Insights panel — explains spikes and dips in any metric." },
      { kind: "Added", text: "Saved views with per-user and shared scopes." },
      { kind: "Changed", text: "Dashboard grid now supports 12-column layouts on desktop." },
      { kind: "Changed", text: "Upgraded ApexCharts to v4 — smaller bundle, faster first paint." },
      { kind: "Fixed", text: "CSV export dropped the last row when the page size was not divisible by 10." },
      { kind: "Fixed", text: "Date picker preset \"Last 30 days\" excluded today in UTC+N timezones." },
    ],
  },
  {
    version: "v4.1.0",
    date: "2026-03-15",
    title: "Command palette, theme customizer, 12 new apps pages",
    highlight:
      "Press Cmd/Ctrl+K anywhere to jump to any page or run any action, plus a full theme customizer.",
    changes: [
      { kind: "Added", text: "Global Command Palette (Ctrl/Cmd+K) with fuzzy route + action search." },
      { kind: "Added", text: "Theme Customizer — pick primary/accent, density, radius, light/dark." },
      { kind: "Added", text: "12 new apps pages: chat, kanban, file manager, contacts, support tickets." },
      { kind: "Added", text: "Inbox-style email app with threading and snooze." },
      { kind: "Changed", text: "Sidebar now remembers collapsed state per device." },
      { kind: "Fixed", text: "Modal focus trap lost focus when a Tooltip was triggered inside." },
      { kind: "Removed", text: "Legacy `ui-elements/*` routes — superseded by `ui-components/*`." },
    ],
  },
  {
    version: "v4.0.0",
    date: "2026-02-01",
    title: "Helios Pro — full rebrand",
    highlight:
      "New emerald + amber brand, redesigned logo, premium design tokens, 25+ reusable components.",
    changes: [
      { kind: "Added", text: "Helios Pro brand: sun-ray logo, emerald + amber palette, premium shadows." },
      { kind: "Added", text: "Reusable component library: Button, Card, Badge, Avatar, StatCard, ChartCard, DataTable, Modal, Drawer, Tabs, Accordion, Progress, Timeline, Tooltip, Popover, Banner, Pagination, Breadcrumbs, CommandPalette, ThemeCustomizer." },
      { kind: "Added", text: "100+ routes wired into a collapsible, searchable sidebar." },
      { kind: "Changed", text: "Migrated from Tailwind v3 to v4 with `@theme` design tokens." },
      { kind: "Changed", text: "All charts now go through `HeliosChart` (theme-aware ApexCharts wrapper)." },
      { kind: "Removed", text: "TailAdmin legacy navigation and color tokens." },
      { kind: "Deprecated", text: "Old `Chart` import from react-apexcharts — use `HeliosChart` instead." },
    ],
  },
  {
    version: "v3.5.0",
    date: "2025-12-10",
    title: "Ecommerce suite + advanced data tables",
    highlight:
      "Full ecommerce flow (products, orders, customers, cart, checkout) and 11 table variants.",
    changes: [
      { kind: "Added", text: "Ecommerce suite: products, orders, customers, cart, checkout, reviews, coupons, inventory." },
      { kind: "Added", text: "11 table variants: basic, data, sorting, filtering, pagination, row-selection, editable, sticky, column-visibility, drag-drop, empty-state." },
      { kind: "Added", text: "Inline editable cells with Enter-to-save, Esc-to-cancel." },
      { kind: "Changed", text: "DataTable now supports `stickyHeader` and per-column `className`." },
      { kind: "Fixed", text: "Editable table lost focus after save when a tooltip was open." },
    ],
  },
  {
    version: "v3.0.0",
    date: "2025-09-04",
    title: "Next.js 16 + React 19",
    highlight:
      "Migrated to the Next.js 16 App Router, React 19 server components, and TypeScript 5 strict mode.",
    changes: [
      { kind: "Added", text: "App Router layout groups: `(with-layout)` and `(without-layout)`." },
      { kind: "Added", text: "Server components by default — `\"use client\"` only where state/effects are needed." },
      { kind: "Changed", text: "Upgraded to React 19 — actions, use() hook, server functions." },
      { kind: "Changed", text: "TypeScript strict mode + `noUnusedLocals` enabled project-wide." },
      { kind: "Fixed", text: "Hydration mismatch when theme was resolved on the client." },
      { kind: "Removed", text: "Pages Router (`/pages/*`) — fully migrated to App Router." },
    ],
  },
  {
    version: "v2.4.0",
    date: "2025-06-18",
    title: "Auth flows + error pages",
    highlight: "10 auth layouts and 6 error screens, all in light and dark.",
    changes: [
      { kind: "Added", text: "10 auth layouts: sign-in, sign-up, forgot/reset, two-step, lock-screen, side/boxed variants." },
      { kind: "Added", text: "6 error pages: 400, 401, 403, 404, 500, 503." },
      { kind: "Added", text: "Public pages: landing, pricing, faq, help-center, about, contact, maintenance, coming-soon, changelog, roadmap." },
      { kind: "Changed", text: "Auth pages moved to `(without-layout)` route group — no sidebar." },
      { kind: "Fixed", text: "Lock-screen countdown paused when the tab was backgrounded." },
    ],
  },
];
