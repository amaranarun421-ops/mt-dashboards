export type EmailFolder =
  | "Inbox"
  | "Starred"
  | "Sent"
  | "Drafts"
  | "Archive"
  | "Spam"
  | "Trash";

export type Email = {
  id: string;
  from: { name: string; email: string };
  to: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  folder: EmailFolder;
  starred: boolean;
  unread: boolean;
  hasAttachment: boolean;
  labels: string[];
  threadCount?: number;
};

export const emailFolders: { key: EmailFolder; count: number; tone: "primary" | "accent" | "violet" | "info" | "neutral" | "success" }[] = [
  { key: "Inbox", count: 24, tone: "primary" },
  { key: "Starred", count: 7, tone: "accent" },
  { key: "Sent", count: 142, tone: "neutral" },
  { key: "Drafts", count: 3, tone: "info" },
  { key: "Archive", count: 1284, tone: "violet" },
  { key: "Spam", count: 18, tone: "neutral" },
  { key: "Trash", count: 5, tone: "neutral" },
];

export const emails: Email[] = [
  {
    id: "e1",
    from: { name: "Priya Patel", email: "priya.patel@heliospro.io" },
    to: "team@heliospro.io",
    subject: "Q1 product roadmap — final review before Monday",
    preview:
      "Hi all, attached is the final draft of the Q1 roadmap. Please review by EOD Monday so we can lock scope before the leadership sync.",
    body:
      "Hi all,\n\nAttached is the final draft of the Q1 roadmap. Please review by EOD Monday so we can lock scope before the leadership sync on Tuesday.\n\nKey changes from last week:\n- Pulled in the SSO + SCIM migration (Daniel owns)\n- Pushed the AI inference refactor to Q2\n- Added the customer analytics v2 milestone\n\nLet me know if anything looks off. The engineering hours per workstream are on tab 2.\n\nThanks,\nPriya",
    time: "9:42 AM",
    folder: "Inbox",
    starred: true,
    unread: true,
    hasAttachment: true,
    labels: ["roadmap", "engineering"],
    threadCount: 4,
  },
  {
    id: "e2",
    from: { name: "Stripe Billing", email: "no-reply@stripe.com" },
    to: "billing@heliospro.io",
    subject: "Your January invoice is ready",
    preview:
      "Invoice INV-2024-0142 for $12,480.00 was generated. Payment will be collected on the 28th.",
    body:
      "Hi,\n\nInvoice INV-2024-0142 for $12,480.00 was generated. Payment will be collected automatically on the 28th via the card on file.\n\nYou can download a PDF copy from the billing portal.\n\n— Stripe",
    time: "8:14 AM",
    folder: "Inbox",
    starred: false,
    unread: true,
    hasAttachment: true,
    labels: ["finance"],
  },
  {
    id: "e3",
    from: { name: "Daniel Chen", email: "daniel.chen@heliospro.io" },
    to: "platform@heliospro.io",
    subject: "Re: SSO migration — SCIM provisioning working in staging",
    preview:
      "Got SCIM provisioning fully working against the staging Okta tenant this morning. Pushing to prod tomorrow during the maintenance window.",
    body:
      "Got SCIM provisioning fully working against the staging Okta tenant this morning.\n\n- User create/update/delete: working\n- Group push: working\n- Deactivation cascades to all SaaS apps: working\n\nPushing to prod tomorrow during the 02:00–04:00 UTC maintenance window. Will page on-call if anything drifts.\n\nDaniel",
    time: "Yesterday",
    folder: "Inbox",
    starred: true,
    unread: false,
    hasAttachment: false,
    labels: ["engineering", "security"],
    threadCount: 6,
  },
  {
    id: "e4",
    from: { name: "Sofia Mendes", email: "sofia.mendes@heliospro.io" },
    to: "design@heliospro.io",
    subject: "Mobile onboarding — new Figma file + prototype link",
    preview:
      "Pushed the v3 onboarding flow to Figma. The prototype is interactive — tap through screens 1–7 to see the transitions.",
    body:
      "Hey team,\n\nPushed the v3 onboarding flow to Figma. The prototype is interactive — tap through screens 1–7 to see the transitions.\n\nMain changes from v2:\n- Consolidated to 4 screens (was 7)\n- Added the workspace setup step back\n- New progress indicator\n\nWould love feedback on the workspace step — I'm not sure the empty state is strong enough.\n\nSofia",
    time: "Yesterday",
    folder: "Inbox",
    starred: false,
    unread: false,
    hasAttachment: true,
    labels: ["design"],
  },
  {
    id: "e5",
    from: { name: "Marcus Bell", email: "marcus.bell@heliospro.io" },
    to: "ai-platform@heliospro.io",
    subject: "Inference cost spike on cluster-b — investigating",
    preview:
      "P50 latency is fine but cost on cluster-b spiked 38% overnight. Looks like a few heavy prompts are being routed there instead of cluster-a.",
    body:
      "Team,\n\nP50 latency is fine but cost on cluster-b spiked 38% overnight. Looks like a few heavy prompts are being routed there instead of cluster-a due to a stale capacity hint.\n\nHotfix rolling out in ~20 min. Will report back.\n\nMarcus",
    time: "Yesterday",
    folder: "Inbox",
    starred: false,
    unread: false,
    hasAttachment: false,
    labels: ["engineering", "ai"],
    threadCount: 3,
  },
  {
    id: "e6",
    from: { name: "Emma Reyes", email: "emma.reyes@heliospro.io" },
    to: "marketing@heliospro.io",
    subject: "Marketing site v4 — soft launch Monday",
    preview:
      "Marketing site v4 is staged and ready. We'll soft launch Monday with the homepage + pricing; the rest of the pages ship Wednesday.",
    body:
      "Hi,\n\nMarketing site v4 is staged and ready. We'll soft launch Monday with the homepage + pricing; the rest of the pages ship Wednesday.\n\nAnalytics + GTM are wired. Posthog events are queued and waiting for the deploy.\n\nEmma",
    time: "2 days ago",
    folder: "Inbox",
    starred: false,
    unread: false,
    hasAttachment: false,
    labels: ["marketing"],
  },
  {
    id: "e7",
    from: { name: "Yuki Tanaka", email: "yuki.tanaka@heliospro.io" },
    to: "security@heliospro.io",
    subject: "Q1 security audit — findings draft",
    preview:
      "First pass of the Q1 security audit findings attached. Two medium-severity items in the API gateway, one low in the worker pool.",
    body:
      "Hi,\n\nFirst pass of the Q1 security audit findings attached.\n\n- Two medium-severity items in the API gateway (rate limiter bypass, header injection on /v2/uploads)\n- One low in the worker pool (log injection via webhook payload)\n- All findings have suggested fixes\n\nWill schedule a review with the platform team this week.\n\nYuki",
    time: "3 days ago",
    folder: "Inbox",
    starred: true,
    unread: false,
    hasAttachment: true,
    labels: ["security", "audit"],
    threadCount: 2,
  },
  {
    id: "e8",
    from: { name: "Layla Hassan", email: "layla.hassan@heliospro.io" },
    to: "support@heliospro.io",
    subject: "Help center search — live + early metrics",
    preview:
      "Help center search shipped yesterday. Early metrics: 22% of visitors use search, top query is 'reset password', zero-rating is down to 4%.",
    body:
      "Hi,\n\nHelp center search shipped yesterday. Early metrics:\n\n- 22% of visitors use search (vs 8% with the old tag-based filter)\n- Top query: 'reset password' (no surprise)\n- Zero-result rate: 4% (down from 31%)\n\nNext: add the 'was this helpful' feedback loop and tune ranking based on click-through.\n\nLayla",
    time: "3 days ago",
    folder: "Inbox",
    starred: false,
    unread: false,
    hasAttachment: false,
    labels: ["support"],
  },
  {
    id: "e9",
    from: { name: "Noah Kim", email: "noah.kim@heliospro.io" },
    to: "team@heliospro.io",
    subject: "Welcome to the new Helios Pro workspace",
    preview:
      "Welcome to the new Helios Pro workspace! A few quick tips to get you oriented in the first week.",
    body:
      "Welcome to the new Helios Pro workspace!\n\nA few quick tips to get you oriented in the first week:\n1. Bookmark the engineering handbook\n2. Say hi in #intros\n3. Set up 2FA on your account (Daniel can help)\n4. Pull the design tokens package\n\nGlad to have you on the team.\n\nNoah",
    time: "5 days ago",
    folder: "Inbox",
    starred: false,
    unread: false,
    hasAttachment: false,
    labels: ["onboarding"],
  },
  {
    id: "e10",
    from: { name: "Aarav Sharma", email: "aarav.sharma@heliospro.io" },
    to: "platform@heliospro.io",
    subject: "Billing migration to Stripe v3 — status update",
    preview:
      "Stripe v3 migration is at 62% complete. Customer sync is done, subscription sync lands this week, webhook handlers next.",
    body:
      "Status update on the Stripe v3 billing migration:\n\n- Customer sync: DONE (100%)\n- Subscription sync: 80% — lands this week\n- Webhook handlers: 30% — next sprint\n- Frontend billing portal: not started\n\nNo regressions so far. Aarav",
    time: "1 week ago",
    folder: "Inbox",
    starred: false,
    unread: false,
    hasAttachment: false,
    labels: ["engineering", "finance"],
    threadCount: 1,
  },
];

export const emailThread: { id: string; from: string; email: string; time: string; body: string; initials: string; role: string }[] = [
  { id: "t1", from: "Priya Patel", email: "priya.patel@heliospro.io", time: "9:42 AM, Today", initials: "PP", role: "Author", body: "Hi all, attached is the final draft of the Q1 roadmap. Please review by EOD Monday so we can lock scope before the leadership sync on Tuesday." },
  { id: "t2", from: "Daniel Chen", email: "daniel.chen@heliospro.io", time: "10:08 AM, Today", initials: "DC", role: "Reply", body: "Looks good. One nit — can we move the SSO migration a week earlier? Okta tenant is ready earlier than expected and I have the bandwidth." },
  { id: "t3", from: "Aarav Sharma", email: "aarav.sharma@heliospro.io", time: "10:21 AM, Today", initials: "AS", role: "Reply", body: "Agreed with Daniel. Moving SSO to week 2 frees up the platform team for the billing cutover. I'll reshuffle the workstream hours." },
  { id: "t4", from: "Priya Patel", email: "priya.patel@heliospro.io", time: "10:45 AM, Today", initials: "PP", role: "Latest", body: "Done — pushed v2 with SSO in week 2 and AI refactor pulled to Q2. Updated the engineering hours on tab 2. Please re-review by noon." },
];
