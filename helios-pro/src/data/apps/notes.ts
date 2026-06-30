export type NoteColor = "amber" | "emerald" | "violet" | "sky" | "rose" | "slate";

export type Note = {
  id: string;
  title: string;
  body: string;
  color: NoteColor;
  tags: string[];
  updatedAt: string;
  pinned?: boolean;
};

export const notes: Note[] = [
  { id: "n1", title: "Sprint 24 kickoff talking points", body: "- Remind team about the new SCIM hotfix window (02:00 UTC)\n- Walk through Q1 roadmap shifts\n- Call out Sofia's onboarding redesign as the showcase\n- Ask Marcus for the AI cost postmortem", color: "amber", tags: ["sprint", "leadership"], updatedAt: "12 min ago", pinned: true },
  { id: "n2", title: "Stripe v3 migration checklist", body: "[x] Customer sync\n[x] Subscription sync — partial\n[ ] Webhook handlers\n[ ] Billing portal UI\n[ ] Backfill historical invoices\n[ ] Switch prod traffic\n\nOwner: Aarav", color: "emerald", tags: ["engineering", "billing"], updatedAt: "1 hr ago", pinned: true },
  { id: "n3", title: "Customer interview — Northwind", body: "Grace mentioned three pain points:\n1. Audit log retention is too short\n2. Wants per-workspace roles\n3. Mobile app feels 'half-baked'\n\nFollow-up: send the audit log roadmap doc.", color: "violet", tags: ["customer", "research"], updatedAt: "3 hr ago" },
  { id: "n4", title: "Hiring pipeline — Q1", body: "Open roles:\n- 2x Sr Backend Eng (offers out)\n- 1x ML Eng (onsite loop Thursday)\n- 1x Designer (screening)\n- 1x Support Eng (closing this week)", color: "sky", tags: ["people", "hiring"], updatedAt: "Yesterday" },
  { id: "n5", title: "AI inference cost — root cause", body: "cluster-b cost spike was a stale capacity hint.\nRouting decision used cluster-b for heavy prompts even when cluster-a had capacity.\nHotfix: refresh capacity hint every 30s (was 5m).", color: "rose", tags: ["ai", "postmortem"], updatedAt: "Yesterday" },
  { id: "n6", title: "Marketing site v4 — launch checklist", body: "[x] Homepage + pricing staged\n[x] Analytics + GTM wired\n[x] Posthog events queued\n[ ] Soft launch Monday\n[ ] Remaining pages Wednesday\n[ ] Redirect map reviewed", color: "emerald", tags: ["marketing"], updatedAt: "2 days ago" },
  { id: "n7", title: "Security audit — open items", body: "Medium:\n- Rate limiter bypass on /v2/uploads\n- Header injection on /v2/uploads\n\nLow:\n- Log injection via webhook payload\n\nAll have suggested fixes. Review with platform team this week.", color: "amber", tags: ["security"], updatedAt: "3 days ago" },
  { id: "n8", title: "Team offsite — agenda draft", body: "Day 1: Strategy + roadmap review\nDay 2: Workshops (AI safety, customer empathy)\nDay 3: Team building + retrospective\n\nNeed to confirm venue by Jan 31.", color: "slate", tags: ["people", "offsite"], updatedAt: "4 days ago" },
  { id: "n9", title: "Pricing experiment — results", body: "Annual prepay variant B beat variant A by 11.4% on conversion.\nRecommend rolling out B globally next sprint.\nWatch churn signal for first 60 days.", color: "violet", tags: ["growth", "experiment"], updatedAt: "5 days ago" },
];
