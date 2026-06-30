export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  location: string;
  focus: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Aarav Mehta",
    role: "Founder & CEO",
    bio: "Two decades shipping developer tools. Previously led platform at a Series C analytics startup; obsessed with the small details that make a UI feel premium.",
    location: "San Francisco, CA",
    focus: "Product · Brand",
  },
  {
    name: "Priya Nair",
    role: "Head of Design",
    bio: "Designed systems for fintech, healthcare and developer tools. Built the Helios emerald + amber design language from the ground up.",
    location: "Bengaluru, IN",
    focus: "Design System",
  },
  {
    name: "Daniel Okafor",
    role: "Principal Engineer",
    bio: "Maintains the HeliosChart wrapper and the DataTable engine. Wrote the first line of the App Router migration to Next.js 16.",
    location: "Lagos, NG",
    focus: "Frontend Perf",
  },
  {
    name: "Sofia Rossi",
    role: "Staff Engineer, Charts",
    bio: "Owns the chart layer — ApexCharts, jsvectormap, the realtime websocket transport and the AI Insights panel.",
    location: "Milan, IT",
    focus: "Data Viz",
  },
  {
    name: "Liam Chen",
    role: "Engineering Manager",
    bio: "Leads the apps and ecommerce tracks. Cares deeply about accessibility, keyboard nav and screen-reader parity.",
    location: "Singapore, SG",
    focus: "Apps · a11y",
  },
  {
    name: "Yuki Tanaka",
    role: "Staff Designer",
    bio: "Designed every dashboard variant — analytics, CRM, finance, SaaS, projects, marketing, AI, support, logistics.",
    location: "Tokyo, JP",
    focus: "Dashboards",
  },
  {
    name: "Emma Novak",
    role: "Developer Advocate",
    bio: "Writes the docs, records the demos, runs the community Discord. Happy to chat about anything Helios-related.",
    location: "Austin, TX",
    focus: "Docs · Community",
  },
  {
    name: "Marcus Webb",
    role: "Security Lead",
    bio: "Owns SOC 2, SSO/SCIM and the encryption envelope. Will happily sign your NDA and walk you through the audit report.",
    location: "London, UK",
    focus: "Security · Compliance",
  },
];

export type CompanyMilestone = {
  time: string;
  title: string;
  description: string;
  tone: "primary" | "accent" | "violet" | "info" | "success" | "danger";
};

export const companyMilestones: CompanyMilestone[] = [
  {
    time: "2021 — Q3",
    title: "Helios is founded",
    description:
      "Aarav and Priya quit their day jobs and incorporate Helios. First commit is a single Tailwind config.",
    tone: "primary",
  },
  {
    time: "2022 — Q1",
    title: "v1.0 — first paying customer",
    description:
      "The kit ships on Gumroad with 18 pages. Within a week, a Y Combinator startup buys a team license.",
    tone: "accent",
  },
  {
    time: "2022 — Q4",
    title: "Crossed $1M ARR",
    description:
      "Word of mouth from indie hackers and agencies pushes Helios past a million dollars in annual recurring revenue.",
    tone: "success",
  },
  {
    time: "2023 — Q2",
    title: "Ecommerce + Tables suite",
    description:
      "Ship the full ecommerce flow and 11 data-table variants. Team grows to 6 people across 4 timezones.",
    tone: "info",
  },
  {
    time: "2024 — Q3",
    title: "SOC 2 Type II certified",
    description:
      "Marcus joins as Security Lead and closes the SOC 2 audit in 90 days. Enterprise pipeline opens up.",
    tone: "violet",
  },
  {
    time: "2025 — Q3",
    title: "Next.js 16 + React 19 migration",
    description:
      "Full rewrite on the App Router with server components. Bundle size drops 38%, first paint is 2x faster.",
    tone: "primary",
  },
  {
    time: "2026 — Q1",
    title: "Helios Pro rebrand",
    description:
      "New name, new logo, new emerald + amber design language, 100+ routes, 25+ reusable components.",
    tone: "accent",
  },
];

export type CompanyStat = {
  label: string;
  value: string;
  hint: string;
};

export const companyStats: CompanyStat[] = [
  { label: "Customers", value: "12,400+", hint: "active workspaces" },
  { label: "Countries", value: "78", hint: "across 6 continents" },
  { label: "Open-source stars", value: "9.2k", hint: "on GitHub" },
  { label: "Team", value: "24", hint: "remote-first, 11 timezones" },
];

export type CompanyValue = {
  title: string;
  description: string;
  icon: "rocket" | "shield" | "globe" | "wrench" | "bell" | "server";
};

export const companyValues: CompanyValue[] = [
  {
    title: "Craft over churn",
    description:
      "We sweat the 1% details — pixel snapping, focus rings, dark-mode parity — because that is what makes a UI feel premium.",
    icon: "rocket",
  },
  {
    title: "Security by default",
    description:
      "Encryption, SSO, audit logs and SOC 2 are not add-ons. They ship with every plan, including Starter.",
    icon: "shield",
  },
  {
    title: "Remote-first, global",
    description:
      "We hire the best person for the job, wherever they live. 24 people across 11 timezones, async by default.",
    icon: "globe",
  },
  {
    title: "Boring infrastructure",
    description:
      "We pick proven tools (Postgres, AWS, Stripe) over hype. The kit you build on today should still work in 2030.",
    icon: "server",
  },
  {
    title: "Listen, then ship",
    description:
      "Every release starts in the community Discord. We tag ideas as Now / Next / Later / Done and ship every two weeks.",
    icon: "bell",
  },
  {
    title: "Built to be extended",
    description:
      "Every component is typed, composable and documented. The kit is a starting point, not a straitjacket.",
    icon: "wrench",
  },
];
