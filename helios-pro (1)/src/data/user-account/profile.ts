export type Skill = { name: string; level: number };

export type SocialLink = { label: string; handle: string; tone: "primary" | "accent" | "violet" | "info" | "rose" | "neutral" };

export type ProfileStat = { label: string; value: string; sub: string; tone: "primary" | "accent" | "violet" | "info" | "rose" };

export type ProfileActivity = {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  tone: "primary" | "accent" | "violet" | "info" | "rose" | "success" | "danger";
};

export const profileUser = {
  name: "Aarav Mehta",
  handle: "@aarav",
  role: "Founder & CEO",
  email: "aarav.mehta@heliospro.io",
  location: "Bengaluru, India",
  timezone: "IST · UTC+5:30",
  joinedAt: "January 14, 2021",
  bio: "Founder of Helios Pro. Building data tools that help teams make decisions with confidence. Previously led platform engineering at two YC-backed startups. Coffee enthusiast, weekend climber.",
  cover: "/images/cover/cover-02.jpg",
  avatarSrc: "/images/user/user-01.png",
  website: "heliospro.io",
};

export const profileStats: ProfileStat[] = [
  { label: "Projects owned", value: "28", sub: "+3 this quarter", tone: "primary" },
  { label: "Tasks completed", value: "1,482", sub: "+124 this month", tone: "accent" },
  { label: "Reviews submitted", value: "318", sub: "92% positive", tone: "violet" },
  { label: "Team members", value: "12", sub: "Across 6 teams", tone: "info" },
];

export const skills: Skill[] = [
  { name: "Product Strategy", level: 92 },
  { name: "Engineering Leadership", level: 88 },
  { name: "Go-to-Market", level: 76 },
  { name: "Data Analysis", level: 84 },
  { name: "Customer Research", level: 71 },
  { name: "Public Speaking", level: 65 },
];

export const skillBadges: string[] = [
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "Prisma",
  "ApexCharts",
  "Tailwind CSS",
  "Figma",
  "Linear",
  "Notion",
  "Stripe",
  "Vercel",
  "PostHog",
  "Mixpanel",
  "Segment",
];

export const socialLinks: SocialLink[] = [
  { label: "Twitter", handle: "@aaravmehta", tone: "info" },
  { label: "GitHub", handle: "github.com/aaravm", tone: "neutral" },
  { label: "LinkedIn", handle: "in/aarav-mehta", tone: "primary" },
  { label: "Dribbble", handle: "dribbble.com/aarav", tone: "rose" },
];

export const profileActivity: ProfileActivity[] = [
  { id: "PA-1", user: "Aarav Mehta", action: "shipped", target: "Q1 OKRs dashboard", time: "2 hours ago", tone: "success" },
  { id: "PA-2", user: "Aarav Mehta", action: "commented on", target: "Pricing experiment v3", time: "5 hours ago", tone: "info" },
  { id: "PA-3", user: "Aarav Mehta", action: "merged pull request", target: "#1284 · add billing v2", time: "Yesterday", tone: "primary" },
  { id: "PA-4", user: "Aarav Mehta", action: "scheduled", target: "All-hands · Feb 20", time: "Yesterday", tone: "accent" },
  { id: "PA-5", user: "Aarav Mehta", action: "approved budget for", target: "Q2 marketing campaigns", time: "2 days ago", tone: "violet" },
  { id: "PA-6", user: "Aarav Mehta", action: "published", target: "Helios Pro v3.2 changelog", time: "3 days ago", tone: "success" },
];
