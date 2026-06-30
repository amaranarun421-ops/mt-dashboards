export type FileKind = "pdf" | "image" | "doc" | "sheet" | "video" | "audio" | "archive" | "code" | "folder";

export type FileItem = {
  id: string;
  name: string;
  kind: FileKind;
  size: string;
  modified: string;
  owner: string;
  starred?: boolean;
  sharedWith?: number;
};

export type FolderNode = {
  id: string;
  name: string;
  children?: FolderNode[];
};

export const folderTree: FolderNode[] = [
  {
    id: "f-root",
    name: "My Drive",
    children: [
      {
        id: "f-engineering",
        name: "Engineering",
        children: [
          { id: "f-eng-specs", name: "Specs" },
          { id: "f-eng-rfcs", name: "RFCs" },
          { id: "f-eng-postmortems", name: "Postmortems" },
        ],
      },
      {
        id: "f-design",
        name: "Design",
        children: [
          { id: "f-des-figma", name: "Figma exports" },
          { id: "f-des-icons", name: "Icon library" },
        ],
      },
      {
        id: "f-finance",
        name: "Finance",
        children: [
          { id: "f-fin-2024", name: "2024" },
          { id: "f-fin-2025", name: "2025" },
        ],
      },
      { id: "f-marketing", name: "Marketing" },
      { id: "f-people", name: "People" },
      { id: "f-shared", name: "Shared with me" },
    ],
  },
];

export const recentFiles: FileItem[] = [
  { id: "fi1", name: "Q1-roadmap-final.pdf", kind: "pdf", size: "1.8 MB", modified: "12 min ago", owner: "Priya Patel", starred: true, sharedWith: 12 },
  { id: "fi2", name: "onboarding-v3.fig", kind: "image", size: "4.2 MB", modified: "1 hr ago", owner: "Sofia Mendes", sharedWith: 6 },
  { id: "fi3", name: "audit-findings-q1.pdf", kind: "pdf", size: "640 KB", modified: "3 hr ago", owner: "Yuki Tanaka", starred: true, sharedWith: 4 },
  { id: "fi4", name: "billing-migration-plan.docx", kind: "doc", size: "92 KB", modified: "5 hr ago", owner: "Aarav Sharma", sharedWith: 8 },
  { id: "fi5", name: "ai-cost-breakdown.xlsx", kind: "sheet", size: "118 KB", modified: "Yesterday", owner: "Marcus Bell", sharedWith: 3 },
  { id: "fi6", name: "team-offsite-2025.mp4", kind: "video", size: "248 MB", modified: "Yesterday", owner: "Noah Kim", sharedWith: 22 },
  { id: "fi7", name: "release-2025-01-22.zip", kind: "archive", size: "44 MB", modified: "2 days ago", owner: "Daniel Chen" },
  { id: "fi8", name: "helios-pro.css", kind: "code", size: "18 KB", modified: "2 days ago", owner: "Emma Reyes" },
  { id: "fi9", name: "customer-call-recording.mp3", kind: "audio", size: "8.4 MB", modified: "3 days ago", owner: "Layla Hassan" },
  { id: "fi10", name: "support-metrics-jan.xlsx", kind: "sheet", size: "212 KB", modified: "3 days ago", owner: "Layla Hassan" },
  { id: "fi11", name: "schema.prisma", kind: "code", size: "6 KB", modified: "4 days ago", owner: "Aarav Sharma" },
  { id: "fi12", name: "marketing-brief-q1.pdf", kind: "pdf", size: "1.1 MB", modified: "5 days ago", owner: "Emma Reyes" },
];

export const storageUsed = {
  used: 184.6,
  total: 500,
  breakdown: [
    { label: "Documents", value: 72.4, tone: "primary" as const },
    { label: "Media", value: 64.2, tone: "accent" as const },
    { label: "Archives", value: 28.0, tone: "violet" as const },
    { label: "Other", value: 20.0, tone: "info" as const },
  ],
};
