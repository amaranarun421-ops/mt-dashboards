export type CalendarEvent = {
  id: string;
  title: string;
  day: number; // 1..31 (relative to current month grid)
  start: string; // "09:00"
  end: string; // "10:00"
  tone: "primary" | "accent" | "violet" | "info" | "rose";
  location?: string;
  attendees: string[];
  isAllDay?: boolean;
};

// Sample month grid: assume current month is February 2025 (Feb 1 = Saturday)
// Calendar weeks (Sun-start):
//   Week 1: Jan 26 - Feb 1
//   Week 2: Feb 2 - Feb 8
//   Week 3: Feb 9 - Feb 15
//   Week 4: Feb 16 - Feb 22
//   Week 5: Feb 23 - Mar 1
export const calendarEvents: CalendarEvent[] = [
  { id: "ev1", title: "Sprint 24 kickoff", day: 3, start: "09:30", end: "10:30", tone: "primary", location: "Main room", attendees: ["Priya Patel", "Aarav Sharma", "Sofia Mendes"] },
  { id: "ev2", title: "1:1 with Daniel", day: 3, start: "14:00", end: "14:30", tone: "violet", location: "Quiet room", attendees: ["Priya Patel", "Daniel Chen"] },
  { id: "ev3", title: "Customer call — Northwind", day: 4, start: "11:00", end: "12:00", tone: "accent", location: "Zoom", attendees: ["Aarav Sharma", "Grace Okoro"] },
  { id: "ev4", title: "Design review — onboarding v3", day: 5, start: "15:00", end: "16:00", tone: "rose", location: "Design room", attendees: ["Sofia Mendes", "Emma Reyes", "Priya Patel"] },
  { id: "ev5", title: "AI platform sync", day: 6, start: "10:00", end: "10:45", tone: "info", attendees: ["Marcus Bell", "Aarav Sharma"] },
  { id: "ev6", title: "Security audit — platform review", day: 6, start: "13:00", end: "14:30", tone: "violet", location: "Conf B", attendees: ["Yuki Tanaka", "Daniel Chen", "Liam Walsh"] },
  { id: "ev7", title: "Marketing site v4 soft launch", day: 10, start: "09:00", end: "09:30", tone: "accent", attendees: ["Emma Reyes", "Liam Walsh"] },
  { id: "ev8", title: "Engineering all-hands", day: 11, start: "16:00", end: "17:00", tone: "primary", location: "Main room", attendees: ["Priya Patel", "Aarav Sharma", "Daniel Chen", "Marcus Bell", "Sofia Mendes", "Liam Walsh"] },
  { id: "ev9", title: "Stripe v3 cut-over dry run", day: 12, start: "11:00", end: "12:30", tone: "info", location: "War room", attendees: ["Aarav Sharma", "Priya Patel"] },
  { id: "ev10", title: "1:1 with Sofia", day: 13, start: "14:00", end: "14:30", tone: "violet", attendees: ["Priya Patel", "Sofia Mendes"] },
  { id: "ev11", title: "Support metrics review", day: 17, start: "10:00", end: "10:30", tone: "rose", attendees: ["Layla Hassan", "Priya Patel"] },
  { id: "ev12", title: "Q1 roadmap leadership sync", day: 18, start: "09:00", end: "10:30", tone: "primary", location: "Boardroom", attendees: ["Priya Patel", "Daniel Chen", "Marcus Bell", "Emma Reyes"] },
  { id: "ev13", title: "Customer interview — Brightwave", day: 20, start: "13:00", end: "14:00", tone: "accent", location: "Zoom", attendees: ["Aarav Sharma", "Mei Lin"] },
  { id: "ev14", title: "Team offsite planning", day: 24, start: "15:00", end: "16:00", tone: "info", attendees: ["Noah Kim", "Priya Patel"] },
  { id: "ev15", title: "Release retro — Sprint 24", day: 26, start: "16:00", end: "17:00", tone: "primary", location: "Main room", attendees: ["Priya Patel", "Aarav Sharma", "Daniel Chen"] },
  { id: "ev16", title: "Pricing experiment B review", day: 27, start: "11:00", end: "12:00", tone: "accent", attendees: ["Emma Reyes", "Liam Walsh"] },
];

export const upcomingEvents = calendarEvents.slice(0, 5);
