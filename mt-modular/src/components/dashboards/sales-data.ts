/* ========================================================================
   Sales dashboard mock data — Sales Revenue Command Center.
   Internally consistent: $2.4M quota, $1.82M closed won, $2.68M forecast,
   76% attainment, 3.2x pipeline coverage.
   ======================================================================== */

/* ---- Header constants ---- */
export const QUARTERS = ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'];
export const TEAMS = ['All teams', 'Enterprise', 'Mid-Market', 'SMB', 'Strategic'];
export const TERRITORIES = ['All territories', 'West', 'East', 'Central', 'EMEA', 'APAC'];
export const OWNERS = [
  'All owners',
  'Darlene Robertson',
  'Kristin Watson',
  'Albert Flores',
  'Devon Lane',
  'Jane Cooper',
];

/* ---- Quota & Forecast hero ---- */
export const quotaHero = {
  quota: 2400000,
  closedWon: 1820000,
  forecasted: 2680000,
  attainment: 76,
  pipelineCoverage: 3.2,
  insight:
    'Forecast is pacing 11% ahead of commit. Commit coverage is 1.18x; pipeline coverage remains healthy at 3.2x — push reps to convert best-case to commit by week 8.',
};

/* Weekly forecast cone (commit / best case / pipeline vs. quota) */
export type ForecastConePoint = {
  week: string;
  commit: number;
  bestCase: number;
  pipeline: number;
  quota: number;
};
export const forecastCone: ForecastConePoint[] = [
  { week: 'W1', commit: 1180, bestCase: 1380, pipeline: 2200, quota: 1500 },
  { week: 'W2', commit: 1280, bestCase: 1480, pipeline: 2480, quota: 1500 },
  { week: 'W3', commit: 1340, bestCase: 1560, pipeline: 2680, quota: 1500 },
  { week: 'W4', commit: 1420, bestCase: 1680, pipeline: 2920, quota: 1500 },
  { week: 'W5', commit: 1480, bestCase: 1820, pipeline: 3140, quota: 1500 },
  { week: 'W6', commit: 1560, bestCase: 1980, pipeline: 3380, quota: 1500 },
  { week: 'W7', commit: 1660, bestCase: 2180, pipeline: 3580, quota: 1500 },
  { week: 'W8', commit: 1780, bestCase: 2380, pipeline: 3840, quota: 1500 },
  { week: 'W9', commit: 1860, bestCase: 2480, pipeline: 4080, quota: 1500 },
  { week: 'W10', commit: 1960, bestCase: 2680, pipeline: 4320, quota: 1500 },
  { week: 'W11', commit: 2020, bestCase: 2740, pipeline: 4580, quota: 1500 },
  { week: 'W12', commit: 2100, bestCase: 2840, pipeline: 4820, quota: 1500 },
];

/* ---- Close Plan (right rail) ---- */
export type ClosePlanItem = {
  id: string;
  account: string;
  moment: string;
  when: string;
  dueIn: 'today' | 'tomorrow' | 'this-week' | 'next-week';
  amount: number;
  stage: string;
  owner: string;
  detail: string;
  confidence: 'high' | 'medium' | 'low';
};
export const closePlan: ClosePlanItem[] = [
  {
    id: 'cp1', account: 'Acme Studio', moment: 'Procurement call', when: 'Today · 2:00 PM',
    dueIn: 'today', amount: 126000, stage: 'Best case', owner: 'Darlene Robertson',
    detail: 'Procurement has final pricing questions on the 50-seat plan. Confirm 3-year term discount and MSSP add-on.',
    confidence: 'high',
  },
  {
    id: 'cp2', account: 'Northstar AI', moment: 'Security review', when: 'Tomorrow · 10:30 AM',
    dueIn: 'tomorrow', amount: 240000, stage: 'Commit', owner: 'Jane Cooper',
    detail: 'CISO walkthrough of SOC 2 + GDPR artifacts. Champion prepped with 14-day pilot data and ROI deck.',
    confidence: 'high',
  },
  {
    id: 'cp3', account: 'OrbitLabs', moment: 'Pricing approval', when: 'Jun 28 · 3:00 PM',
    dueIn: 'this-week', amount: 180000, stage: 'Proposal', owner: 'Albert Flores',
    detail: 'CFO sign-off needed on implementation fee. Send revised SOW with phased billing before EOW.',
    confidence: 'medium',
  },
  {
    id: 'cp4', account: 'BrightCart', moment: 'Legal redlines', when: 'Jul 01 · 11:00 AM',
    dueIn: 'next-week', amount: 94000, stage: 'Proposal', owner: 'Kristin Watson',
    detail: 'Legal returned redlines on liability (Section 4) and termination (Section 7). Pre-clear with counsel.',
    confidence: 'medium',
  },
];

/* ---- Deal Risk Snapshot (right rail) ---- */
export type RiskSnapshotItem = {
  id: string;
  label: string;
  count: number;
  severity: 'high' | 'medium' | 'warning';
  hint: string;
  trend: number[];
};
export const riskSnapshot: RiskSnapshotItem[] = [
  { id: 'rs1', label: 'Slipped deals', count: 14, severity: 'high', hint: '12 slipped from Q2 close — review with rep owners today', trend: [6, 8, 9, 11, 12, 13, 14] },
  { id: 'rs2', label: 'No next step', count: 22, severity: 'high', hint: 'Assign next step or move to nurture — 22 deals stalled', trend: [14, 16, 17, 19, 20, 21, 22] },
  { id: 'rs3', label: 'Procurement blocked', count: 8, severity: 'medium', hint: '8 deals waiting on procurement — exec sponsor needed', trend: [3, 4, 5, 6, 7, 7, 8] },
  { id: 'rs4', label: 'Champion inactive', count: 11, severity: 'warning', hint: '11 deals — champion went dark 14+ days, re-engage', trend: [5, 7, 8, 9, 10, 10, 11] },
];

/* ---- Pipeline Stage Board ---- */
export type PipelineStage = {
  key: string;
  name: string;
  value: number;
  count: number;
  probability: number;
  velocity: number; // avg days in stage
  weighted: number; // weighted pipeline
  color: string;
  trend: number[];
};
export const pipelineStages: PipelineStage[] = [
  { key: 'prospecting', name: 'Prospecting', value: 820000, count: 84, probability: 10, velocity: 6, weighted: 82000, color: '#465FFF', trend: [620, 680, 720, 760, 790, 810, 820] },
  { key: 'discovery', name: 'Discovery', value: 1140000, count: 62, probability: 25, velocity: 9, weighted: 285000, color: '#0BA5EC', trend: [920, 980, 1020, 1080, 1100, 1130, 1140] },
  { key: 'solution-fit', name: 'Solution Fit', value: 1420000, count: 41, probability: 45, velocity: 11, weighted: 639000, color: '#12B76A', trend: [1180, 1240, 1300, 1340, 1380, 1410, 1420] },
  { key: 'proposal', name: 'Proposal', value: 980000, count: 29, probability: 65, velocity: 7, weighted: 637000, color: '#F79009', trend: [820, 860, 890, 920, 950, 970, 980] },
  { key: 'commit', name: 'Commit', value: 640000, count: 18, probability: 85, velocity: 5, weighted: 544000, color: '#7A5AF8', trend: [480, 520, 560, 590, 610, 630, 640] },
  { key: 'closed-won', name: 'Closed Won', value: 1820000, count: 24, probability: 100, velocity: 4, weighted: 1820000, color: '#EC4899', trend: [1380, 1480, 1580, 1660, 1720, 1780, 1820] },
];

/* ---- Deal Velocity ---- */
export const dealVelocity = {
  avgCycle: 42,
  stageConversion: 28,
  winRate: 31.4,
  avgDealSize: 48200,
  insight: 'Discovery is the #1 bottleneck — 11 avg days vs 7-day target. Coaching reps on discovery questioning could compress cycle by ~3 days.',
};

export type VelocityStage = {
  name: string;
  days: number;
  target: number;
  conversion: number;
  bottleneck: string;
  color: string;
};
export const velocityStages: VelocityStage[] = [
  { name: 'Prospecting', days: 6, target: 5, conversion: 100, bottleneck: 'Lead response time within target', color: '#465FFF' },
  { name: 'Discovery', days: 11, target: 7, conversion: 74, bottleneck: 'Above target — 4 days over. Discovery calls running long.', color: '#0BA5EC' },
  { name: 'Solution Fit', days: 11, target: 8, conversion: 71, bottleneck: 'Above target — multi-stakeholder demos delaying stage.', color: '#12B76A' },
  { name: 'Proposal', days: 7, target: 6, conversion: 65, bottleneck: '1 day over target — pricing approvals blocking.', color: '#F79009' },
  { name: 'Commit', days: 5, target: 5, conversion: 78, bottleneck: 'On target — healthy commit to close conversion.', color: '#7A5AF8' },
  { name: 'Closed Won', days: 4, target: 4, conversion: 31, bottleneck: 'On target — contract execution streamlined via DocuSign.', color: '#EC4899' },
];

/* ---- Rep Performance Arena ---- */
export type Rep = {
  id: string;
  name: string;
  rank: number;
  closedWon: number;
  quota: number;
  attainment: number;
  pipelineCreated: number;
  winRate: number;
  activityScore: number;
  sparkline: number[];
  breakdown: {
    prospecting: number;
    discovery: number;
    proposal: number;
    commit: number;
    won: number;
  };
  topDeals: number;
  avgCycle: number;
};
export const reps: Rep[] = [
  {
    id: 'r1', name: 'Darlene Robertson', rank: 1, closedWon: 486000, quota: 600000, attainment: 81,
    pipelineCreated: 1240000, winRate: 34.2, activityScore: 92, sparkline: [28, 32, 38, 42, 46, 48, 48.6],
    breakdown: { prospecting: 18, discovery: 14, proposal: 9, commit: 6, won: 12 },
    topDeals: 4, avgCycle: 38,
  },
  {
    id: 'r2', name: 'Kristin Watson', rank: 2, closedWon: 412000, quota: 600000, attainment: 69,
    pipelineCreated: 1080000, winRate: 31.8, activityScore: 86, sparkline: [26, 30, 34, 37, 39, 41, 41.2],
    breakdown: { prospecting: 22, discovery: 16, proposal: 11, commit: 5, won: 9 },
    topDeals: 3, avgCycle: 41,
  },
  {
    id: 'r3', name: 'Albert Flores', rank: 3, closedWon: 348000, quota: 600000, attainment: 58,
    pipelineCreated: 940000, winRate: 29.6, activityScore: 78, sparkline: [22, 26, 28, 31, 33, 35, 34.8],
    breakdown: { prospecting: 24, discovery: 18, proposal: 7, commit: 4, won: 7 },
    topDeals: 2, avgCycle: 44,
  },
  {
    id: 'r4', name: 'Devon Lane', rank: 4, closedWon: 312000, quota: 600000, attainment: 52,
    pipelineCreated: 820000, winRate: 27.4, activityScore: 72, sparkline: [20, 24, 26, 28, 30, 31, 31.2],
    breakdown: { prospecting: 28, discovery: 14, proposal: 6, commit: 3, won: 6 },
    topDeals: 2, avgCycle: 46,
  },
  {
    id: 'r5', name: 'Jane Cooper', rank: 5, closedWon: 262000, quota: 600000, attainment: 44,
    pipelineCreated: 740000, winRate: 33.9, activityScore: 68, sparkline: [18, 20, 22, 24, 25, 26, 26.2],
    breakdown: { prospecting: 16, discovery: 12, proposal: 5, commit: 3, won: 5 },
    topDeals: 1, avgCycle: 49,
  },
];

/* ---- Territory Map ---- */
export type Territory = {
  id: string;
  name: string;
  code: string;
  closed: number;
  pipeline: number;
  quota: number;
  attainment: number;
  topRep: string;
  lat: number;
  lng: number;
  regionCodes: string[]; // jvectormap region codes covered
};
export const territories: Territory[] = [
  {
    id: 't1', name: 'West', code: 'US-W', closed: 680000, pipeline: 1480000, quota: 829000, attainment: 82,
    topRep: 'Darlene Robertson', lat: 37.26, lng: -122.4, regionCodes: ['US'],
  },
  {
    id: 't2', name: 'East', code: 'US-E', closed: 520000, pipeline: 1140000, quota: 703000, attainment: 74,
    topRep: 'Kristin Watson', lat: 40.71, lng: -74.0, regionCodes: ['US'],
  },
  {
    id: 't3', name: 'Central', code: 'US-C', closed: 410000, pipeline: 920000, quota: 594000, attainment: 69,
    topRep: 'Albert Flores', lat: 41.88, lng: -87.63, regionCodes: ['US'],
  },
  {
    id: 't4', name: 'EMEA', code: 'EMEA', closed: 360000, pipeline: 780000, quota: 409000, attainment: 88,
    topRep: 'Devon Lane', lat: 50.11, lng: 8.68, regionCodes: ['GB', 'DE', 'FR', 'ES', 'IT', 'NL', 'SE'],
  },
  {
    id: 't5', name: 'APAC', code: 'APAC', closed: 210000, pipeline: 500000, quota: 339000, attainment: 62,
    topRep: 'Jane Cooper', lat: 1.35, lng: 103.82, regionCodes: ['JP', 'AU', 'SG', 'IN', 'CN', 'KR'],
  },
];

/* ---- Forecast Categories ---- */
export type ForecastCategory = {
  name: string;
  value: number;
  color: string;
  description: string;
  deals: number;
};
export const forecastCategories: ForecastCategory[] = [
  { name: 'Closed Won', value: 1820000, color: '#12B76A', description: 'Booked revenue — locked in', deals: 24 },
  { name: 'Commit', value: 1960000, color: '#465FFF', description: 'Rep-committed, 85%+ confidence', deals: 18 },
  { name: 'Best Case', value: 2680000, color: '#7A5AF8', description: '50–85% confidence — upside', deals: 32 },
  { name: 'Pipeline', value: 4820000, color: '#F79009', description: 'All open pipeline, weighted', deals: 84 },
];

/* Weekly forecast category build-up */
export type ForecastCategoryWeek = {
  week: string;
  closedWon: number;
  commit: number;
  bestCase: number;
  pipeline: number;
};
export const forecastCategoryWeekly: ForecastCategoryWeek[] = [
  { week: 'W1', closedWon: 820, commit: 360, bestCase: 200, pipeline: 820 },
  { week: 'W2', closedWon: 1040, commit: 460, bestCase: 280, pipeline: 740 },
  { week: 'W3', closedWon: 1180, commit: 520, bestCase: 320, pipeline: 680 },
  { week: 'W4', closedWon: 1340, commit: 580, bestCase: 360, pipeline: 620 },
  { week: 'W5', closedWon: 1460, commit: 640, bestCase: 420, pipeline: 580 },
  { week: 'W6', closedWon: 1580, commit: 720, bestCase: 480, pipeline: 540 },
  { week: 'W7', closedWon: 1660, commit: 820, bestCase: 540, pipeline: 500 },
  { week: 'W8', closedWon: 1740, commit: 940, bestCase: 620, pipeline: 460 },
];

/* ---- Key Deals Board ---- */
export type KeyDeal = {
  id: string;
  account: string;
  value: number;
  stage: string;
  probability: number;
  nextStep: string;
  risk: 'low' | 'medium' | 'high';
  owner: string;
  closeDate: string;
  territory: string;
  champion: string;
  competitor: string;
  history: { date: string; note: string }[];
};
export const keyDeals: KeyDeal[] = [
  {
    id: 'kd1', account: 'Northstar AI', value: 240000, stage: 'Commit', probability: 85,
    nextStep: 'Security review with CISO', risk: 'low', owner: 'Jane Cooper', closeDate: 'Jul 12, 2026',
    territory: 'West', champion: 'Mira Patel (VP Eng)', competitor: 'Salesforce',
    history: [
      { date: 'Jun 18', note: 'Champion confirmed budget allocation' },
      { date: 'Jun 22', note: 'CISO accepted SOC 2 artifacts' },
      { date: 'Jun 25', note: 'Pilot results shared — 32% efficiency gain' },
    ],
  },
  {
    id: 'kd2', account: 'Acme Studio', value: 126000, stage: 'Best Case', probability: 65,
    nextStep: 'Procurement final pricing call', risk: 'medium', owner: 'Darlene Robertson', closeDate: 'Jul 05, 2026',
    territory: 'East', champion: 'Tom Yang (Head of Ops)', competitor: 'HubSpot',
    history: [
      { date: 'Jun 14', note: 'Demo completed — strong fit on workflow automation' },
      { date: 'Jun 20', note: 'Pricing objection on 3-year term' },
      { date: 'Jun 24', note: 'Revised quote sent with phased billing' },
    ],
  },
  {
    id: 'kd3', account: 'OrbitLabs', value: 180000, stage: 'Proposal', probability: 55,
    nextStep: 'Legal redlines + CFO sign-off', risk: 'high', owner: 'Albert Flores', closeDate: 'Jul 19, 2026',
    territory: 'Central', champion: 'Sara Lin (Director Procurement)', competitor: 'Microsoft',
    history: [
      { date: 'Jun 10', note: 'Proposal delivered — 18-month term' },
      { date: 'Jun 17', note: 'Legal requested changes to liability cap' },
      { date: 'Jun 23', note: 'CFO requested implementation fee reduction' },
    ],
  },
  {
    id: 'kd4', account: 'FlowDesk', value: 84000, stage: 'Discovery', probability: 35,
    nextStep: 'Schedule technical deep-dive', risk: 'low', owner: 'Devon Lane', closeDate: 'Aug 02, 2026',
    territory: 'West', champion: 'Alex Roe (CTO)', competitor: 'Notion',
    history: [
      { date: 'Jun 12', note: 'Inbound from webinar — strong intent' },
      { date: 'Jun 19', note: 'Discovery call — 14 use cases identified' },
      { date: 'Jun 24', note: 'Champion very active, sharing internal docs' },
    ],
  },
];

/* ---- Sales Activities (stacked timeline) ---- */
export type ActivityWeek = {
  week: string;
  calls: number;
  emails: number;
  demos: number;
  proposals: number;
  meetings: number;
  conversion: number;
};
export const activityWeekly: ActivityWeek[] = [
  { week: 'W1', calls: 184, emails: 612, demos: 28, proposals: 14, meetings: 42, conversion: 18.2 },
  { week: 'W2', calls: 198, emails: 648, demos: 32, proposals: 18, meetings: 48, conversion: 19.8 },
  { week: 'W3', calls: 212, emails: 702, demos: 36, proposals: 22, meetings: 54, conversion: 22.4 },
  { week: 'W4', calls: 224, emails: 738, demos: 38, proposals: 24, meetings: 58, conversion: 24.1 },
  { week: 'W5', calls: 218, emails: 762, demos: 42, proposals: 26, meetings: 62, conversion: 25.6 },
  { week: 'W6', calls: 238, emails: 794, demos: 44, proposals: 28, meetings: 64, conversion: 26.8 },
  { week: 'W7', calls: 252, emails: 824, demos: 48, proposals: 30, meetings: 68, conversion: 28.4 },
  { week: 'W8', calls: 248, emails: 856, demos: 52, proposals: 32, meetings: 72, conversion: 29.6 },
];

/* ---- Deals table ---- */
export type SalesDeal = {
  id: string;
  deal: string;
  account: string;
  owner: string;
  territory: 'West' | 'East' | 'Central' | 'EMEA' | 'APAC';
  stage: 'Prospecting' | 'Discovery' | 'Solution Fit' | 'Proposal' | 'Commit' | 'Closed Won';
  value: number;
  probability: number;
  closeDate: string;
  risk: 'low' | 'medium' | 'high';
  nextStep: string;
  daysInStage: number;
};

export const salesDeals: SalesDeal[] = [
  { id: 'sd1', deal: 'Enterprise Platform', account: 'Northstar AI', owner: 'Jane Cooper', territory: 'West', stage: 'Commit', value: 240000, probability: 85, closeDate: 'Jul 12, 2026', risk: 'low', nextStep: 'Security review with CISO', daysInStage: 12 },
  { id: 'sd2', deal: 'Studio Plan', account: 'Acme Studio', owner: 'Darlene Robertson', territory: 'East', stage: 'Proposal', value: 126000, probability: 65, closeDate: 'Jul 05, 2026', risk: 'medium', nextStep: 'Procurement final pricing call', daysInStage: 8 },
  { id: 'sd3', deal: 'Cloud Migration', account: 'OrbitLabs', owner: 'Albert Flores', territory: 'Central', stage: 'Proposal', value: 180000, probability: 55, closeDate: 'Jul 19, 2026', risk: 'high', nextStep: 'Legal redlines + CFO sign-off', daysInStage: 9 },
  { id: 'sd4', deal: 'Workspace License', account: 'FlowDesk', owner: 'Devon Lane', territory: 'West', stage: 'Discovery', value: 84000, probability: 35, closeDate: 'Aug 02, 2026', risk: 'low', nextStep: 'Schedule technical deep-dive', daysInStage: 4 },
  { id: 'sd5', deal: 'Retail Suite', account: 'BrightCart', owner: 'Kristin Watson', territory: 'East', stage: 'Proposal', value: 94000, probability: 60, closeDate: 'Jul 08, 2026', risk: 'medium', nextStep: 'Legal redlines review', daysInStage: 7 },
  { id: 'sd6', deal: 'Data Platform', account: 'AtlasCloud', owner: 'Darlene Robertson', territory: 'West', stage: 'Solution Fit', value: 156000, probability: 50, closeDate: 'Jul 22, 2026', risk: 'medium', nextStep: 'Pricing objection response', daysInStage: 6 },
  { id: 'sd7', deal: 'Commerce Cloud', account: 'NovaRetail', owner: 'Kristin Watson', territory: 'East', stage: 'Commit', value: 94000, probability: 80, closeDate: 'Jul 03, 2026', risk: 'low', nextStep: 'Procurement sign-off', daysInStage: 5 },
  { id: 'sd8', deal: 'Analytics Add-on', account: 'BluePeak', owner: 'Albert Flores', territory: 'Central', stage: 'Discovery', value: 72000, probability: 30, closeDate: 'Aug 14, 2026', risk: 'high', nextStep: 'Re-engage champion', daysInStage: 21 },
  { id: 'sd9', deal: 'Growth Bundle', account: 'CloudMint', owner: 'Jane Cooper', territory: 'West', stage: 'Proposal', value: 68000, probability: 68, closeDate: 'Jul 10, 2026', risk: 'low', nextStep: 'Send final proposal', daysInStage: 7 },
  { id: 'sd10', deal: 'Starter Plan', account: 'AlphaWorks', owner: 'Devon Lane', territory: 'Central', stage: 'Closed Won', value: 58000, probability: 100, closeDate: 'Jun 24, 2026', risk: 'low', nextStep: 'Onboarding kickoff', daysInStage: 2 },
  { id: 'sd11', deal: 'Scale Package', account: 'QuantumLeap', owner: 'Darlene Robertson', territory: 'West', stage: 'Prospecting', value: 112000, probability: 15, closeDate: 'Aug 21, 2026', risk: 'medium', nextStep: 'Schedule discovery call', daysInStage: 1 },
  { id: 'sd12', deal: 'Enterprise Renewal', account: 'ZenithCorp', owner: 'Kristin Watson', territory: 'East', stage: 'Commit', value: 198000, probability: 88, closeDate: 'Jul 15, 2026', risk: 'low', nextStep: 'Legal review meeting', daysInStage: 6 },
  { id: 'sd13', deal: 'EMEA Expansion', account: 'Berlin Robotics', owner: 'Devon Lane', territory: 'EMEA', stage: 'Solution Fit', value: 142000, probability: 48, closeDate: 'Aug 09, 2026', risk: 'medium', nextStep: 'Multi-stakeholder demo', daysInStage: 9 },
  { id: 'sd14', deal: 'APAC Pilot', account: 'Tokyo Systems', owner: 'Jane Cooper', territory: 'APAC', stage: 'Discovery', value: 88000, probability: 38, closeDate: 'Aug 28, 2026', risk: 'medium', nextStep: 'Pilot scoping call', daysInStage: 5 },
  { id: 'sd15', deal: 'Mid-Market Suite', account: 'PixelForge', owner: 'Albert Flores', territory: 'West', stage: 'Closed Won', value: 64000, probability: 100, closeDate: 'Jun 21, 2026', risk: 'low', nextStep: 'CSM handoff', daysInStage: 3 },
  { id: 'sd16', deal: 'Strategic License', account: 'DataPulse', owner: 'Darlene Robertson', territory: 'EMEA', stage: 'Proposal', value: 168000, probability: 62, closeDate: 'Jul 26, 2026', risk: 'medium', nextStep: 'Final pricing approval', daysInStage: 8 },
  { id: 'sd17', deal: 'Gov Cloud', account: 'CivicGrid', owner: 'Kristin Watson', territory: 'Central', stage: 'Discovery', value: 224000, probability: 32, closeDate: 'Sep 04, 2026', risk: 'high', nextStep: 'FedRAMP requirements review', daysInStage: 14 },
  { id: 'sd18', deal: 'Renewal + Upsell', account: 'MailBot', owner: 'Devon Lane', territory: 'APAC', stage: 'Commit', value: 76000, probability: 84, closeDate: 'Jul 02, 2026', risk: 'low', nextStep: 'Contract renewal signature', daysInStage: 4 },
];

/* ---- Header range label ---- */
export const SALES_RANGE = 'Apr 01 – Jun 23, 2026';
