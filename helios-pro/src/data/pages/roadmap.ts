export type RoadmapColumn = "Now" | "Next" | "Later" | "Done";

export type RoadmapStatus =
  | "In Progress"
  | "Planned"
  | "Exploring"
  | "Shipped"
  | "Under Review";

export type RoadmapCard = {
  id: string;
  column: RoadmapColumn;
  title: string;
  description: string;
  status: RoadmapStatus;
  upvotes: number;
  category: "Dashboard" | "Charts" | "Integrations" | "Performance" | "Mobile" | "AI";
};

export const roadmapColumns: RoadmapColumn[] = ["Now", "Next", "Later", "Done"];

export const roadmapCards: RoadmapCard[] = [
  // NOW
  {
    id: "r-1",
    column: "Now",
    title: "Realtime streaming charts",
    description:
      "Websocket-backed live metrics for any chart with a 1-second tick. Pause, resume and snapshot to PNG.",
    status: "In Progress",
    upvotes: 348,
    category: "Charts",
  },
  {
    id: "r-2",
    column: "Now",
    title: "AI Insights panel",
    description:
      "An LLM that watches your metrics and explains anomalies in plain English, with a confidence score.",
    status: "In Progress",
    upvotes: 291,
    category: "AI",
  },
  {
    id: "r-3",
    column: "Now",
    title: "Saved dashboard views",
    description:
      "Pin personal and team-wide views per dashboard, with deep-linkable URLs and a viewer switcher.",
    status: "In Progress",
    upvotes: 154,
    category: "Dashboard",
  },

  // NEXT
  {
    id: "r-4",
    column: "Next",
    title: "Mobile companion app",
    description:
      "Native iOS + Android shell with push notifications for alerts, weekly digests and offline cached dashboards.",
    status: "Planned",
    upvotes: 422,
    category: "Mobile",
  },
  {
    id: "r-5",
    column: "Next",
    title: "Snowflake + dbt connector",
    description:
      "Native Snowflake connector with model-aware joins, plus a dbt model picker in the query builder.",
    status: "Planned",
    upvotes: 268,
    category: "Integrations",
  },
  {
    id: "r-6",
    column: "Next",
    title: "Pivot table widget",
    description:
      "Drag-and-drop pivot table that drops onto any dashboard with conditional formatting and totals.",
    status: "Planned",
    upvotes: 207,
    category: "Dashboard",
  },

  // LATER
  {
    id: "r-7",
    column: "Later",
    title: "Anomaly detection v2",
    description:
      "Statistical anomaly detection with seasonality-aware baselines and multi-metric correlations.",
    status: "Exploring",
    upvotes: 183,
    category: "AI",
  },
  {
    id: "r-8",
    column: "Later",
    title: "Embedded analytics SDK",
    description:
      "Drop a Helios dashboard into any React app with a single component — sandboxed, themed and auth-scoped.",
    status: "Exploring",
    upvotes: 162,
    category: "Integrations",
  },
  {
    id: "r-9",
    column: "Later",
    title: "Edge cache for dashboards",
    description:
      "Render static dashboard tiles at the edge for sub-50ms TTFB anywhere in the world.",
    status: "Under Review",
    upvotes: 98,
    category: "Performance",
  },
  {
    id: "r-10",
    column: "Later",
    title: "Dark-mode map tiles",
    description:
      "Custom dark-mode vector tiles for the jsvectormap world map, plus region drill-down.",
    status: "Under Review",
    upvotes: 71,
    category: "Charts",
  },

  // DONE
  {
    id: "r-11",
    column: "Done",
    title: "Command palette (Cmd/Ctrl+K)",
    description:
      "Global fuzzy search across every route and action, with recently-used and pinned items.",
    status: "Shipped",
    upvotes: 512,
    category: "Dashboard",
  },
  {
    id: "r-12",
    column: "Done",
    title: "Theme customizer",
    description:
      "Pick primary/accent color, density, radius and light/dark — preview live before applying.",
    status: "Shipped",
    upvotes: 389,
    category: "Dashboard",
  },
  {
    id: "r-13",
    column: "Done",
    title: "11 data table variants",
    description:
      "Basic, data, sorting, filtering, pagination, row-selection, editable, sticky, column-visibility, drag-drop, empty-state.",
    status: "Shipped",
    upvotes: 274,
    category: "Dashboard",
  },
];
