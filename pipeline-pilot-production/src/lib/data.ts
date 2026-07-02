// Central sales operations data — realistic, internally consistent
// Used across dashboard, pipeline, deals, customers, forecasts, etc.

export const STAGES = [
  'Lead',
  'Qualified',
  'Discovery',
  'Proposal',
  'Negotiation',
  'Closed Won',
  'Closed Lost',
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_COLORS: Record<Stage, string> = {
  Lead: 'var(--chart-1)',
  Qualified: 'var(--chart-2)',
  Discovery: 'var(--chart-3)',
  Proposal: 'var(--chart-5)',
  Negotiation: 'var(--accent)',
  'Closed Won': 'var(--success)',
  'Closed Lost': 'var(--destructive)',
};

export interface Rep {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  avatarColor: string;
  quota: number;
  revenue: number;
  dealsClosed: number;
  dealsOpen: number;
  winRate: number;
  rank: number;
  changePct: number;
  territory: string;
  lastActivity: string;
}

export const reps: Rep[] = [
  { id: 'r1', name: 'Sarah Chen', initials: 'SC', role: 'Senior AE', email: 'sarah.chen@pipelinepilot.io', phone: '+1 (415) 555-0148', avatarColor: 'oklch(0.7 0.18 145)', quota: 450000, revenue: 487500, dealsClosed: 24, dealsOpen: 11, winRate: 68, rank: 1, changePct: 15, territory: 'West Coast', lastActivity: '2h ago' },
  { id: 'r2', name: 'Mike Johnson', initials: 'MJ', role: 'Account Executive', email: 'mike.johnson@pipelinepilot.io', phone: '+1 (415) 555-0151', avatarColor: 'oklch(0.7 0.18 220)', quota: 400000, revenue: 356200, dealsClosed: 19, dealsOpen: 9, winRate: 58, rank: 2, changePct: 8, territory: 'Central', lastActivity: '4h ago' },
  { id: 'r3', name: 'Emily Davis', initials: 'ED', role: 'Senior AE', email: 'emily.davis@pipelinepilot.io', phone: '+1 (646) 555-0177', avatarColor: 'oklch(0.75 0.18 55)', quota: 350000, revenue: 312800, dealsClosed: 17, dealsOpen: 8, winRate: 62, rank: 3, changePct: 12, territory: 'East Coast', lastActivity: '1h ago' },
  { id: 'r4', name: 'James Wilson', initials: 'JW', role: 'Account Executive', email: 'james.wilson@pipelinepilot.io', phone: '+1 (312) 555-0193', avatarColor: 'oklch(0.7 0.15 300)', quota: 350000, revenue: 289400, dealsClosed: 15, dealsOpen: 7, winRate: 51, rank: 4, changePct: -5, territory: 'Midwest', lastActivity: '6h ago' },
  { id: 'r5', name: 'Lisa Park', initials: 'LP', role: 'Account Executive', email: 'lisa.park@pipelinepilot.io', phone: '+1 (213) 555-0112', avatarColor: 'oklch(0.65 0.2 25)', quota: 300000, revenue: 267100, dealsClosed: 14, dealsOpen: 6, winRate: 55, rank: 5, changePct: 9, territory: 'West Coast', lastActivity: '3h ago' },
  { id: 'r6', name: 'David Okafor', initials: 'DO', role: 'SDR Lead', email: 'david.okafor@pipelinepilot.io', phone: '+1 (470) 555-0166', avatarColor: 'oklch(0.7 0.18 220)', quota: 250000, revenue: 218900, dealsClosed: 22, dealsOpen: 14, winRate: 47, rank: 6, changePct: 18, territory: 'South', lastActivity: '30m ago' },
  { id: 'r7', name: 'Priya Sharma', initials: 'PS', role: 'Account Executive', email: 'priya.sharma@pipelinepilot.io', phone: '+1 (206) 555-0184', avatarColor: 'oklch(0.75 0.18 55)', quota: 300000, revenue: 254700, dealsClosed: 13, dealsOpen: 10, winRate: 53, rank: 7, changePct: 4, territory: 'Northwest', lastActivity: '12m ago' },
  { id: 'r8', name: 'Marcus Bell', initials: 'MB', role: 'Senior AE', email: 'marcus.bell@pipelinepilot.io', phone: '+1 (305) 555-0199', avatarColor: 'oklch(0.7 0.15 300)', quota: 350000, revenue: 198400, dealsClosed: 11, dealsOpen: 9, winRate: 49, rank: 8, changePct: -2, territory: 'Southeast', lastActivity: '1d ago' },
];

export interface Account {
  id: string;
  name: string;
  industry: string;
  tier: 'Enterprise' | 'Growth' | 'Starter';
  location: string;
  website: string;
  employees: number;
  revenue: number;
  arr: number;
  activeDeals: number;
  healthScore: number;
  churnRisk: number;
  renewalDate: string;
  owner: string;
  ownerInitials: string;
  lastContact: string;
  logoColor: string;
}

export const accounts: Account[] = [
  { id: 'a1', name: 'Acme Corporation', industry: 'Technology', tier: 'Enterprise', location: 'San Francisco, CA', website: 'acme.com', employees: 5400, revenue: 485000, arr: 420000, activeDeals: 3, healthScore: 92, churnRisk: 8, renewalDate: '2025-09-14', owner: 'Sarah Chen', ownerInitials: 'SC', lastContact: '2d ago', logoColor: 'oklch(0.7 0.18 220)' },
  { id: 'a2', name: 'GlobalTech Industries', industry: 'Manufacturing', tier: 'Enterprise', location: 'New York, NY', website: 'globaltech.io', employees: 12000, revenue: 320000, arr: 285000, activeDeals: 2, healthScore: 85, churnRisk: 14, renewalDate: '2025-11-02', owner: 'Emily Davis', ownerInitials: 'ED', lastContact: '1w ago', logoColor: 'oklch(0.7 0.18 145)' },
  { id: 'a3', name: 'Innovate Labs', industry: 'Healthcare', tier: 'Growth', location: 'Boston, MA', website: 'innovelabs.co', employees: 850, revenue: 156000, arr: 138000, activeDeals: 1, healthScore: 78, churnRisk: 22, renewalDate: '2025-08-21', owner: 'Mike Johnson', ownerInitials: 'MJ', lastContact: '3d ago', logoColor: 'oklch(0.75 0.18 55)' },
  { id: 'a4', name: 'DataStream Analytics', industry: 'Data Services', tier: 'Growth', location: 'Austin, TX', website: 'datastream.ai', employees: 420, revenue: 98000, arr: 92000, activeDeals: 2, healthScore: 65, churnRisk: 38, renewalDate: '2025-07-08', owner: 'James Wilson', ownerInitials: 'JW', lastContact: '2w ago', logoColor: 'oklch(0.7 0.15 300)' },
  { id: 'a5', name: 'NextGen Solutions', industry: 'Finance', tier: 'Starter', location: 'Chicago, IL', website: 'nextgen.finance', employees: 95, revenue: 45000, arr: 38000, activeDeals: 1, healthScore: 88, churnRisk: 11, renewalDate: '2026-01-15', owner: 'Lisa Park', ownerInitials: 'LP', lastContact: 'Yesterday', logoColor: 'oklch(0.65 0.2 25)' },
  { id: 'a6', name: 'CloudFirst Inc', industry: 'Cloud Services', tier: 'Enterprise', location: 'Seattle, WA', website: 'cloudfirst.cloud', employees: 7800, revenue: 275000, arr: 240000, activeDeals: 4, healthScore: 95, churnRisk: 5, renewalDate: '2025-12-03', owner: 'Priya Sharma', ownerInitials: 'PS', lastContact: 'Today', logoColor: 'oklch(0.7 0.18 220)' },
  { id: 'a7', name: 'Vertex Robotics', industry: 'Manufacturing', tier: 'Growth', location: 'Detroit, MI', website: 'vertexrobotics.com', employees: 1100, revenue: 178000, arr: 165000, activeDeals: 2, healthScore: 71, churnRisk: 27, renewalDate: '2025-10-19', owner: 'Marcus Bell', ownerInitials: 'MB', lastContact: '5d ago', logoColor: 'oklch(0.7 0.18 145)' },
  { id: 'a8', name: 'BrightWave Media', industry: 'Media', tier: 'Growth', location: 'Los Angeles, CA', website: 'brightwave.tv', employees: 670, revenue: 142000, arr: 128000, activeDeals: 1, healthScore: 83, churnRisk: 17, renewalDate: '2025-09-28', owner: 'Sarah Chen', ownerInitials: 'SC', lastContact: '4d ago', logoColor: 'oklch(0.75 0.18 55)' },
  { id: 'a9', name: 'Quantum Logistics', industry: 'Logistics', tier: 'Enterprise', location: 'Houston, TX', website: 'quantumlog.com', employees: 3200, revenue: 215000, arr: 198000, activeDeals: 3, healthScore: 79, churnRisk: 19, renewalDate: '2025-08-30', owner: 'David Okafor', ownerInitials: 'DO', lastContact: '2d ago', logoColor: 'oklch(0.7 0.15 300)' },
  { id: 'a10', name: 'Pulse Health Systems', industry: 'Healthcare', tier: 'Enterprise', location: 'Phoenix, AZ', website: 'pulsehealth.io', employees: 4800, revenue: 312000, arr: 290000, activeDeals: 2, healthScore: 89, churnRisk: 9, renewalDate: '2025-12-20', owner: 'Emily Davis', ownerInitials: 'ED', lastContact: '1d ago', logoColor: 'oklch(0.7 0.18 220)' },
  { id: 'a11', name: 'Skyline Capital', industry: 'Finance', tier: 'Enterprise', location: 'New York, NY', website: 'skyline.capital', employees: 2400, revenue: 268000, arr: 248000, activeDeals: 2, healthScore: 86, churnRisk: 12, renewalDate: '2025-11-25', owner: 'Sarah Chen', ownerInitials: 'SC', lastContact: '6h ago', logoColor: 'oklch(0.7 0.18 145)' },
  { id: 'a12', name: 'Forge & Co', industry: 'Manufacturing', tier: 'Starter', location: 'Portland, OR', website: 'forgeand.co', employees: 120, revenue: 38000, arr: 32000, activeDeals: 1, healthScore: 74, churnRisk: 24, renewalDate: '2026-02-10', owner: 'Lisa Park', ownerInitials: 'LP', lastContact: '1w ago', logoColor: 'oklch(0.65 0.2 25)' },
];

export interface Deal {
  id: string;
  name: string;
  account: string;
  accountId: string;
  value: number;
  stage: Stage;
  probability: number;
  closeDate: string;
  owner: string;
  ownerInitials: string;
  ownerId: string;
  daysInStage: number;
  age: number;
  nextStep: string;
  source: string;
  type: 'New Business' | 'Expansion' | 'Renewal' | 'Upsell';
  riskScore: number;
  weightedValue: number;
  created: string;
  lastActivity: string;
}

export const deals: Deal[] = [
  { id: 'D-2041', name: 'Enterprise Platform — Annual', account: 'Acme Corporation', accountId: 'a1', value: 125000, stage: 'Negotiation', probability: 80, closeDate: '2025-07-22', owner: 'Sarah Chen', ownerInitials: 'SC', ownerId: 'r1', daysInStage: 12, age: 47, nextStep: 'Send revised MSA', source: 'Outbound', type: 'New Business', riskScore: 22, weightedValue: 100000, created: '2025-06-04', lastActivity: '2h ago' },
  { id: 'D-2042', name: 'Analytics Add-On', account: 'Acme Corporation', accountId: 'a1', value: 48000, stage: 'Proposal', probability: 60, closeDate: '2025-08-05', owner: 'Sarah Chen', ownerInitials: 'SC', ownerId: 'r1', daysInStage: 6, age: 21, nextStep: 'Pricing review call', source: 'Expansion', type: 'Upsell', riskScore: 18, weightedValue: 28800, created: '2025-06-25', lastActivity: '5h ago' },
  { id: 'D-2043', name: 'Manufacturing Suite Q3', account: 'GlobalTech Industries', accountId: 'a2', value: 245000, stage: 'Negotiation', probability: 75, closeDate: '2025-07-30', owner: 'Emily Davis', ownerInitials: 'ED', ownerId: 'r3', daysInStage: 9, age: 38, nextStep: 'Security review with IT', source: 'Inbound', type: 'New Business', riskScore: 28, weightedValue: 183750, created: '2025-06-12', lastActivity: '1h ago' },
  { id: 'D-2044', name: 'Healthcare Compliance Pack', account: 'Innovate Labs', accountId: 'a3', value: 89000, stage: 'Proposal', probability: 55, closeDate: '2025-08-12', owner: 'Mike Johnson', ownerInitials: 'MJ', ownerId: 'r2', daysInStage: 14, age: 52, nextStep: 'Schedule legal review', source: 'Referral', type: 'New Business', riskScore: 35, weightedValue: 48950, created: '2025-05-29', lastActivity: '4h ago' },
  { id: 'D-2045', name: 'Data Platform Renewal', account: 'DataStream Analytics', accountId: 'a4', value: 92000, stage: 'Discovery', probability: 40, closeDate: '2025-07-08', owner: 'James Wilson', ownerInitials: 'JW', ownerId: 'r4', daysInStage: 18, age: 67, nextStep: 'Renewal QBR', source: 'Renewal', type: 'Renewal', riskScore: 58, weightedValue: 36800, created: '2025-05-14', lastActivity: '2d ago' },
  { id: 'D-2046', name: 'Finance Automation Pilot', account: 'NextGen Solutions', accountId: 'a5', value: 38000, stage: 'Qualified', probability: 35, closeDate: '2025-09-01', owner: 'Lisa Park', ownerInitials: 'LP', ownerId: 'r5', daysInStage: 4, age: 12, nextStep: 'Discovery call', source: 'Inbound', type: 'New Business', riskScore: 24, weightedValue: 13300, created: '2025-06-30', lastActivity: '6h ago' },
  { id: 'D-2047', name: 'Cloud Expansion — Multi-Region', account: 'CloudFirst Inc', accountId: 'a6', value: 178000, stage: 'Proposal', probability: 65, closeDate: '2025-08-18', owner: 'Priya Sharma', ownerInitials: 'PS', ownerId: 'r7', daysInStage: 8, age: 33, nextStep: 'Architecture workshop', source: 'Expansion', type: 'Expansion', riskScore: 16, weightedValue: 115700, created: '2025-06-17', lastActivity: '1h ago' },
  { id: 'D-2048', name: 'Robotics Vision Stack', account: 'Vertex Robotics', accountId: 'a7', value: 156000, stage: 'Negotiation', probability: 70, closeDate: '2025-07-15', owner: 'Marcus Bell', ownerInitials: 'MB', ownerId: 'r8', daysInStage: 15, age: 41, nextStep: 'Final pricing approval', source: 'Outbound', type: 'New Business', riskScore: 31, weightedValue: 109200, created: '2025-06-01', lastActivity: '3h ago' },
  { id: 'D-2049', name: 'Media Workflow Suite', account: 'BrightWave Media', accountId: 'a8', value: 67000, stage: 'Qualified', probability: 45, closeDate: '2025-08-25', owner: 'Sarah Chen', ownerInitials: 'SC', ownerId: 'r1', daysInStage: 3, age: 9, nextStep: 'Demo scheduled', source: 'Inbound', type: 'New Business', riskScore: 14, weightedValue: 30150, created: '2025-07-01', lastActivity: '20m ago' },
  { id: 'D-2050', name: 'Logistics Optimization Engine', account: 'Quantum Logistics', accountId: 'a9', value: 203000, stage: 'Proposal', probability: 55, closeDate: '2025-08-30', owner: 'David Okafor', ownerInitials: 'DO', ownerId: 'r6', daysInStage: 7, age: 28, nextStep: 'ROI workshop', source: 'Outbound', type: 'New Business', riskScore: 26, weightedValue: 111650, created: '2025-06-22', lastActivity: '5h ago' },
  { id: 'D-2051', name: 'Patient Records Migration', account: 'Pulse Health Systems', accountId: 'a10', value: 134000, stage: 'Negotiation', probability: 78, closeDate: '2025-07-19', owner: 'Emily Davis', ownerInitials: 'ED', ownerId: 'r3', daysInStage: 11, age: 36, nextStep: 'HIPAA sign-off', source: 'Inbound', type: 'New Business', riskScore: 19, weightedValue: 104520, created: '2025-06-10', lastActivity: '1h ago' },
  { id: 'D-2052', name: 'Capital Markets Module', account: 'Skyline Capital', accountId: 'a11', value: 187000, stage: 'Discovery', probability: 42, closeDate: '2025-09-15', owner: 'Sarah Chen', ownerInitials: 'SC', ownerId: 'r1', daysInStage: 5, age: 14, nextStep: 'Stakeholder mapping', source: 'Outbound', type: 'New Business', riskScore: 30, weightedValue: 78540, created: '2025-06-27', lastActivity: '30m ago' },
  { id: 'D-2053', name: 'Forge Workshop Pilot', account: 'Forge & Co', accountId: 'a12', value: 28000, stage: 'Lead', probability: 20, closeDate: '2025-10-01', owner: 'Lisa Park', ownerInitials: 'LP', ownerId: 'r5', daysInStage: 2, age: 5, nextStep: 'Qualify budget', source: 'Inbound', type: 'New Business', riskScore: 12, weightedValue: 5600, created: '2025-06-30', lastActivity: '4h ago' },
  { id: 'D-2054', name: 'Acme Multi-Year Renewal', account: 'Acme Corporation', accountId: 'a1', value: 320000, stage: 'Discovery', probability: 50, closeDate: '2025-09-14', owner: 'Sarah Chen', ownerInitials: 'SC', ownerId: 'r1', daysInStage: 6, age: 22, nextStep: 'Executive briefing', source: 'Renewal', type: 'Renewal', riskScore: 20, weightedValue: 160000, created: '2025-06-24', lastActivity: '1d ago' },
  { id: 'D-2055', name: 'Vertex Service Tier Upgrade', account: 'Vertex Robotics', accountId: 'a7', value: 64000, stage: 'Proposal', probability: 58, closeDate: '2025-08-08', owner: 'Marcus Bell', ownerInitials: 'MB', ownerId: 'r8', daysInStage: 9, age: 24, nextStep: 'Send SOW', source: 'Expansion', type: 'Upsell', riskScore: 23, weightedValue: 37120, created: '2025-06-21', lastActivity: '7h ago' },
  { id: 'D-2056', name: 'Pulse Telehealth Add-On', account: 'Pulse Health Systems', accountId: 'a10', value: 89000, stage: 'Qualified', probability: 38, closeDate: '2025-09-22', owner: 'Emily Davis', ownerInitials: 'ED', ownerId: 'r3', daysInStage: 4, age: 11, nextStep: 'Discovery workshop', source: 'Expansion', type: 'Expansion', riskScore: 17, weightedValue: 33820, created: '2025-06-29', lastActivity: '2h ago' },
];

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  accountId: string;
  account: string;
  owner: string;
  lastContact: string;
  status: 'Decision Maker' | 'Champion' | 'Influencer' | 'Gatekeeper' | 'User';
  engagement: number;
  source: string;
}

export const contacts: Contact[] = [
  { id: 'c1', name: 'John Smith', email: 'john@acme.com', phone: '+1 (415) 555-0142', title: 'VP of Engineering', accountId: 'a1', account: 'Acme Corporation', owner: 'Sarah Chen', lastContact: '2h ago', status: 'Decision Maker', engagement: 92, source: 'Outbound' },
  { id: 'c2', name: 'Lisa Wong', email: 'lisa@techstart.io', phone: '+1 (628) 555-0177', title: 'CTO', accountId: 'a1', account: 'Acme Corporation', owner: 'Sarah Chen', lastContact: '5h ago', status: 'Champion', engagement: 88, source: 'Inbound' },
  { id: 'c3', name: 'Robert Davis', email: 'rdavis@globalfin.com', phone: '+1 (212) 555-0198', title: 'CFO', accountId: 'a2', account: 'GlobalTech Industries', owner: 'Emily Davis', lastContact: '1d ago', status: 'Decision Maker', engagement: 76, source: 'Referral' },
  { id: 'c4', name: 'Emma Wilson', email: 'emma@datasync.net', phone: '+1 (512) 555-0163', title: 'Head of Data', accountId: 'a4', account: 'DataStream Analytics', owner: 'James Wilson', lastContact: '3d ago', status: 'Influencer', engagement: 54, source: 'Inbound' },
  { id: 'c5', name: 'Michael Chen', email: 'm.chen@cloudbase.io', phone: '+1 (206) 555-0118', title: 'VP Infrastructure', accountId: 'a6', account: 'CloudFirst Inc', owner: 'Priya Sharma', lastContact: '4h ago', status: 'Decision Maker', engagement: 95, source: 'Outbound' },
  { id: 'c6', name: 'Jennifer Park', email: 'jpark@innovate.co', phone: '+1 (617) 555-0149', title: 'Director of Operations', accountId: 'a3', account: 'Innovate Labs', owner: 'Mike Johnson', lastContact: '6h ago', status: 'Champion', engagement: 71, source: 'Event' },
  { id: 'c7', name: 'David Lee', email: 'david@nextgen.tech', phone: '+1 (312) 555-0172', title: 'CEO', accountId: 'a5', account: 'NextGen Solutions', owner: 'Lisa Park', lastContact: '1d ago', status: 'Decision Maker', engagement: 83, source: 'Inbound' },
  { id: 'c8', name: 'Sarah Johnson', email: 'sj@primeanalytics.com', phone: '+1 (415) 555-0188', title: 'Head of Analytics', accountId: 'a4', account: 'DataStream Analytics', owner: 'James Wilson', lastContact: '2d ago', status: 'Influencer', engagement: 67, source: 'Outbound' },
  { id: 'c9', name: 'Alex Rivera', email: 'alex@vertexrobotics.com', phone: '+1 (313) 555-0154', title: 'VP Engineering', accountId: 'a7', account: 'Vertex Robotics', owner: 'Marcus Bell', lastContact: '8h ago', status: 'Decision Maker', engagement: 81, source: 'Outbound' },
  { id: 'c10', name: 'Maya Patel', email: 'maya@brightwave.tv', phone: '+1 (310) 555-0136', title: 'Head of Content', accountId: 'a8', account: 'BrightWave Media', owner: 'Sarah Chen', lastContact: '5d ago', status: 'Champion', engagement: 64, source: 'Inbound' },
];

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  score: number;
  status: 'New' | 'Working' | 'Nurturing' | 'Qualified' | 'Disqualified';
  owner: string;
  created: string;
  lastActivity: string;
  estimatedValue: number;
  intent: 'High' | 'Medium' | 'Low';
}

export const leads: Lead[] = [
  { id: 'L-881', name: 'Rebecca Lin', company: 'Northwind Trading', email: 'rebecca@northwind.co', phone: '+1 (503) 555-0123', source: 'Website', score: 88, status: 'New', owner: 'David Okafor', created: '2025-07-01', lastActivity: '12m ago', estimatedValue: 78000, intent: 'High' },
  { id: 'L-882', name: 'Tom Bradley', company: 'Atlas Freight', email: 'tom@atlasfreight.com', phone: '+1 (404) 555-0144', source: 'Webinar', score: 76, status: 'Working', owner: 'David Okafor', created: '2025-06-29', lastActivity: '2h ago', estimatedValue: 95000, intent: 'High' },
  { id: 'L-883', name: 'Carla Mendez', company: 'Helix Bio', email: 'carla@helixbio.io', phone: '+1 (619) 555-0167', source: 'Referral', score: 91, status: 'Qualified', owner: 'Sarah Chen', created: '2025-06-28', lastActivity: '4h ago', estimatedValue: 142000, intent: 'High' },
  { id: 'L-884', name: 'Neil Foster', company: 'Sentinel Cyber', email: 'neil@sentinelcyber.com', phone: '+1 (703) 555-0188', source: 'Paid Ads', score: 58, status: 'Nurturing', owner: 'Priya Sharma', created: '2025-06-25', lastActivity: '2d ago', estimatedValue: 48000, intent: 'Medium' },
  { id: 'L-885', name: 'Grace Kim', company: 'Modular Build Co', email: 'grace@modularbuild.com', phone: '+1 (415) 555-0192', source: 'Website', score: 64, status: 'Working', owner: 'Lisa Park', created: '2025-06-24', lastActivity: '6h ago', estimatedValue: 62000, intent: 'Medium' },
  { id: 'L-886', name: 'Omar Hassan', company: 'Vector Energy', email: 'omar@vectorenergy.com', phone: '+1 (713) 555-0115', source: 'Outbound', score: 81, status: 'Working', owner: 'Marcus Bell', created: '2025-06-22', lastActivity: '1d ago', estimatedValue: 115000, intent: 'High' },
  { id: 'L-887', name: 'Hannah Cruz', company: 'Lumen Studios', email: 'hannah@lumenstudios.tv', phone: '+1 (818) 555-0179', source: 'Inbound', score: 47, status: 'Nurturing', owner: 'David Okafor', created: '2025-06-20', lastActivity: '3d ago', estimatedValue: 35000, intent: 'Low' },
  { id: 'L-888', name: 'Victor Reyes', company: 'Summit Logistics', email: 'victor@summitlog.com', phone: '+1 (303) 555-0124', source: 'Referral', score: 85, status: 'Qualified', owner: 'Emily Davis', created: '2025-06-18', lastActivity: '5h ago', estimatedValue: 128000, intent: 'High' },
  { id: 'L-889', name: 'Diana Wells', company: 'Cresta Travel', email: 'diana@crestatravel.com', phone: '+1 (702) 555-0148', source: 'Event', score: 52, status: 'Disqualified', owner: 'Lisa Park', created: '2025-06-15', lastActivity: '1w ago', estimatedValue: 28000, intent: 'Low' },
  { id: 'L-890', name: 'Eric Bauer', company: 'Pinnacle Retail', email: 'eric@pinnacletail.com', phone: '+1 (214) 555-0163', source: 'Website', score: 73, status: 'New', owner: 'David Okafor', created: '2025-07-01', lastActivity: '1h ago', estimatedValue: 84000, intent: 'Medium' },
];

export interface Activity {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'task' | 'note' | 'deal_update';
  title: string;
  description: string;
  owner: string;
  ownerInitials: string;
  relatedTo: string;
  relatedType: 'deal' | 'account' | 'contact' | 'lead';
  timestamp: string;
  duration?: number;
  outcome?: string;
}

export const activities: Activity[] = [
  { id: 'act1', type: 'call', title: 'Discovery call with John Smith', description: 'Discussed platform fit and integration timeline. Strong interest in Q3 deployment.', owner: 'Sarah Chen', ownerInitials: 'SC', relatedTo: 'Acme Corporation', relatedType: 'account', timestamp: '2h ago', duration: 32, outcome: 'Connected' },
  { id: 'act2', type: 'meeting', title: 'QBR with GlobalTech leadership', description: 'Presented Q2 results and roadmap. CFO requested updated pricing for multi-year renewal.', owner: 'Emily Davis', ownerInitials: 'ED', relatedTo: 'GlobalTech Industries', relatedType: 'account', timestamp: '4h ago', duration: 60, outcome: 'Successful' },
  { id: 'act3', type: 'email', title: 'Sent revised proposal to Vertex', description: 'Updated SOW with revised pricing terms and added SLA appendix.', owner: 'Marcus Bell', ownerInitials: 'MB', relatedTo: 'Vertex Robotics', relatedType: 'account', timestamp: '5h ago', outcome: 'Awaiting reply' },
  { id: 'act4', type: 'task', title: 'Follow up on DataStream renewal', description: 'Schedule renewal QBR before contract expiry.', owner: 'James Wilson', ownerInitials: 'JW', relatedTo: 'DataStream Analytics', relatedType: 'account', timestamp: '6h ago' },
  { id: 'act5', type: 'deal_update', title: 'Deal moved to Negotiation', description: 'Pulse Health Systems moved from Proposal to Negotiation stage.', owner: 'Emily Davis', ownerInitials: 'ED', relatedTo: 'Patient Records Migration', relatedType: 'deal', timestamp: '7h ago' },
  { id: 'act6', type: 'note', title: 'Champion identified at Skyline', description: 'VP of Engineering is our internal champion. Recommended multi-year contract.', owner: 'Sarah Chen', ownerInitials: 'SC', relatedTo: 'Skyline Capital', relatedType: 'account', timestamp: '1d ago' },
  { id: 'act7', type: 'call', title: 'Pricing negotiation call', description: 'Negotiated final price for Forge workshop pilot. Awaiting internal approval.', owner: 'Lisa Park', ownerInitials: 'LP', relatedTo: 'Forge & Co', relatedType: 'account', timestamp: '1d ago', duration: 28, outcome: 'Successful' },
  { id: 'act8', type: 'meeting', title: 'Demo with BrightWave team', description: 'Conducted platform demo with content operations team. Strong positive feedback.', owner: 'Sarah Chen', ownerInitials: 'SC', relatedTo: 'BrightWave Media', relatedType: 'account', timestamp: '2d ago', duration: 45, outcome: 'Successful' },
];

export interface Territory {
  id: string;
  name: string;
  region: string;
  owner: string;
  ownerInitials: string;
  accounts: number;
  openDeals: number;
  pipelineValue: number;
  revenue: number;
  quota: number;
  attainment: number;
  growth: number;
  repCount: number;
}

export const territories: Territory[] = [
  { id: 't1', name: 'West Coast', region: 'Pacific', owner: 'Sarah Chen', ownerInitials: 'SC', accounts: 42, openDeals: 14, pipelineValue: 1240000, revenue: 754500, quota: 800000, attainment: 94, growth: 18, repCount: 2 },
  { id: 't2', name: 'East Coast', region: 'Atlantic', owner: 'Emily Davis', ownerInitials: 'ED', accounts: 38, openDeals: 11, pipelineValue: 980000, revenue: 612300, quota: 650000, attainment: 94, growth: 12, repCount: 2 },
  { id: 't3', name: 'Central', region: 'Midwest', owner: 'Mike Johnson', ownerInitials: 'MJ', accounts: 31, openDeals: 9, pipelineValue: 720000, revenue: 456200, quota: 500000, attainment: 91, growth: 8, repCount: 1 },
  { id: 't4', name: 'South', region: 'Southern', owner: 'David Okafor', ownerInitials: 'DO', accounts: 28, openDeals: 8, pipelineValue: 540000, revenue: 318900, quota: 400000, attainment: 80, growth: 22, repCount: 1 },
  { id: 't5', name: 'Southeast', region: 'Southern', owner: 'Marcus Bell', ownerInitials: 'MB', accounts: 24, openDeals: 7, pipelineValue: 480000, revenue: 288400, quota: 400000, attainment: 72, growth: -3, repCount: 1 },
  { id: 't6', name: 'Northwest', region: 'Pacific', owner: 'Priya Sharma', ownerInitials: 'PS', accounts: 22, openDeals: 6, pipelineValue: 410000, revenue: 254700, quota: 300000, attainment: 85, growth: 6, repCount: 1 },
];

// Charts data
export const revenueTrend = [
  { month: 'Jan', revenue: 186000, target: 180000, pipeline: 380000 },
  { month: 'Feb', revenue: 205000, target: 190000, pipeline: 420000 },
  { month: 'Mar', revenue: 237000, target: 200000, pipeline: 460000 },
  { month: 'Apr', revenue: 273000, target: 220000, pipeline: 510000 },
  { month: 'May', revenue: 309000, target: 240000, pipeline: 540000 },
  { month: 'Jun', revenue: 314000, target: 260000, pipeline: 580000 },
  { month: 'Jul', revenue: 352000, target: 280000, pipeline: 620000 },
  { month: 'Aug', revenue: 389000, target: 300000, pipeline: 660000 },
  { month: 'Sep', revenue: 421000, target: 320000, pipeline: 700000 },
  { month: 'Oct', revenue: 458000, target: 340000, pipeline: 740000 },
  { month: 'Nov', revenue: 492000, target: 360000, pipeline: 780000 },
  { month: 'Dec', revenue: 547000, target: 380000, pipeline: 820000 },
];

export const forecastData = [
  { month: 'Jan', actual: 420000, forecast: 400000, target: 450000 },
  { month: 'Feb', actual: 480000, forecast: 460000, target: 450000 },
  { month: 'Mar', actual: 510000, forecast: 500000, target: 500000 },
  { month: 'Apr', actual: 485000, forecast: 520000, target: 500000 },
  { month: 'May', actual: 560000, forecast: 550000, target: 550000 },
  { month: 'Jun', actual: 620000, forecast: 600000, target: 550000 },
  { month: 'Jul', actual: null, forecast: 650000, target: 600000 },
  { month: 'Aug', actual: null, forecast: 680000, target: 600000 },
  { month: 'Sep', actual: null, forecast: 720000, target: 650000 },
  { month: 'Oct', actual: null, forecast: 750000, target: 650000 },
  { month: 'Nov', actual: null, forecast: 800000, target: 700000 },
  { month: 'Dec', actual: null, forecast: 850000, target: 700000 },
];

export const pipelineStages = [
  { name: 'Lead', value: 45, count: 892, value$  : 892000, color: 'var(--chart-1)' },
  { name: 'Qualified', value: 28, count: 556, value$: 556000, color: 'var(--chart-2)' },
  { name: 'Discovery', value: 18, count: 357, value$: 357000, color: 'var(--chart-3)' },
  { name: 'Proposal', value: 9, count: 179, value$: 179000, color: 'var(--chart-5)' },
  { name: 'Negotiation', value: 4, count: 87, value$: 245000, color: 'var(--accent)' },
];

export const sourceData = [
  { name: 'Direct', value: 35, color: 'var(--chart-1)' },
  { name: 'Referral', value: 25, color: 'var(--chart-2)' },
  { name: 'Organic', value: 20, color: 'var(--chart-3)' },
  { name: 'Paid Ads', value: 15, color: 'var(--chart-4)' },
  { name: 'Social', value: 5, color: 'var(--chart-5)' },
];

export const conversionData = [
  { month: 'Jan', rate: 18, deals: 12 },
  { month: 'Feb', rate: 22, deals: 15 },
  { month: 'Mar', rate: 19, deals: 13 },
  { month: 'Apr', rate: 25, deals: 18 },
  { month: 'May', rate: 23, deals: 17 },
  { month: 'Jun', rate: 28, deals: 21 },
  { month: 'Jul', rate: 26, deals: 19 },
  { month: 'Aug', rate: 31, deals: 24 },
  { month: 'Sep', rate: 29, deals: 22 },
  { month: 'Oct', rate: 32, deals: 25 },
  { month: 'Nov', rate: 35, deals: 28 },
  { month: 'Dec', rate: 38, deals: 31 },
];

export const winLossData = [
  { name: 'Won', value: 187, color: 'var(--success)' },
  { name: 'Lost', value: 89, color: 'var(--destructive)' },
  { name: 'In Progress', value: 134, color: 'var(--chart-3)' },
];

export const winLossReasons = [
  { reason: 'Price too high', lost: 32, color: 'var(--destructive)' },
  { reason: 'Went to competitor', lost: 28, color: 'var(--chart-4)' },
  { reason: 'No decision', lost: 18, color: 'var(--chart-3)' },
  { reason: 'Bad timing', lost: 11, color: 'var(--chart-5)' },
];

export const activityVolume = [
  { day: 'Mon', calls: 24, meetings: 8, emails: 142 },
  { day: 'Tue', calls: 31, meetings: 12, emails: 168 },
  { day: 'Wed', calls: 28, meetings: 9, emails: 154 },
  { day: 'Thu', calls: 35, meetings: 14, emails: 192 },
  { day: 'Fri', calls: 22, meetings: 6, emails: 128 },
];

export const quarterlyForecast = [
  { quarter: 'Q1', committed: 1200000, bestCase: 1450000, pipeline: 1800000 },
  { quarter: 'Q2', committed: 1500000, bestCase: 1750000, pipeline: 2100000 },
  { quarter: 'Q3', committed: 1800000, bestCase: 2100000, pipeline: 2500000 },
  { quarter: 'Q4', committed: 2200000, bestCase: 2600000, pipeline: 3000000 },
];

export const teamPerformanceData = [
  { name: 'Sarah', revenue: 487, quota: 450, deals: 24 },
  { name: 'Mike', revenue: 356, quota: 400, deals: 19 },
  { name: 'Emily', revenue: 312, quota: 350, deals: 17 },
  { name: 'James', revenue: 289, quota: 350, deals: 15 },
  { name: 'Lisa', revenue: 267, quota: 300, deals: 14 },
  { name: 'David', revenue: 219, quota: 250, deals: 22 },
  { name: 'Priya', revenue: 254, quota: 300, deals: 13 },
];

export const churnRiskData = [
  { name: 'Low Risk', accounts: 78, value: 1240000, color: 'var(--success)' },
  { name: 'Medium Risk', accounts: 18, value: 480000, color: 'var(--warning)' },
  { name: 'High Risk', accounts: 6, value: 215000, color: 'var(--destructive)' },
];

export const cohortData = [
  { cohort: 'Jan', m0: 100, m1: 95, m2: 92, m3: 88, m4: 86, m5: 84 },
  { cohort: 'Feb', m0: 100, m1: 92, m2: 89, m3: 86, m4: 83, m5: null },
  { cohort: 'Mar', m0: 100, m1: 96, m2: 93, m3: 90, m4: null, m5: null },
  { cohort: 'Apr', m0: 100, m1: 94, m2: 91, m3: null, m4: null, m5: null },
  { cohort: 'May', m0: 100, m1: 97, m2: null, m3: null, m4: null, m5: null },
  { cohort: 'Jun', m0: 100, m1: null, m2: null, m3: null, m4: null, m5: null },
];

// Notifications
export const notifications = [
  { id: 'n1', title: 'Deal moved to Negotiation', message: 'Pulse Health Systems moved from Proposal to Negotiation', type: 'deal', time: '7m ago', read: false, priority: 'high' },
  { id: 'n2', title: 'Quota milestone reached', message: 'Sarah Chen hit 108% of monthly quota', type: 'achievement', time: '32m ago', read: false, priority: 'medium' },
  { id: 'n3', title: 'High-risk deal alert', message: 'DataStream Analytics renewal shows 58% churn risk', type: 'risk', time: '1h ago', read: false, priority: 'high' },
  { id: 'n4', title: 'New lead assigned', message: 'Rebecca Lin from Northwind Trading assigned to you', type: 'lead', time: '2h ago', read: true, priority: 'medium' },
  { id: 'n5', title: 'Meeting reminder', message: 'QBR with GlobalTech leadership in 30 minutes', type: 'meeting', time: '3h ago', read: true, priority: 'low' },
  { id: 'n6', title: 'CRM sync completed', message: 'Salesforce sync completed successfully — 248 records updated', type: 'system', time: '4h ago', read: true, priority: 'low' },
  { id: 'n7', title: 'Forecast submitted', message: 'Q3 forecast submitted by Mike Johnson — $1.8M committed', type: 'forecast', time: '5h ago', read: true, priority: 'medium' },
  { id: 'n8', title: 'Stakeholder added', message: 'Lisa Wong added as Champion on Acme Corporation', type: 'contact', time: '6h ago', read: true, priority: 'low' },
];

export const inboxMessages = [
  { id: 'm1', from: 'John Smith', fromInitials: 'JS', account: 'Acme Corporation', subject: 'Re: Updated MSA for review', preview: 'Hi Sarah, thanks for sending over the revised MSA. Legal has reviewed and we have a few comments...', time: '12m ago', unread: true, starred: true },
  { id: 'm2', from: 'Robert Davis', fromInitials: 'RD', account: 'GlobalTech Industries', subject: 'Q3 pricing discussion', preview: 'Following up on our QBR — we would like to revisit the multi-year pricing structure...', time: '1h ago', unread: true, starred: false },
  { id: 'm3', from: 'Alex Rivera', fromInitials: 'AR', account: 'Vertex Robotics', subject: 'SOW approval update', preview: 'Engineering has approved the SOW. We need to align on implementation timeline next week...', time: '3h ago', unread: false, starred: true },
  { id: 'm4', from: 'Lisa Wong', fromInitials: 'LW', account: 'Acme Corporation', subject: 'Champion introduction', preview: 'I wanted to introduce our VP of Platform who will be joining the technical evaluation...', time: '5h ago', unread: false, starred: false },
  { id: 'm5', from: 'Maya Patel', fromInitials: 'MP', account: 'BrightWave Media', subject: 'Demo follow-up questions', preview: 'Thanks for the demo yesterday — the team had a few questions about the analytics module...', time: '8h ago', unread: false, starred: false },
];

export const auditLogs = [
  { id: 'log1', user: 'Sarah Chen', action: 'Updated deal stage', target: 'D-2041 → Negotiation', ip: '73.142.88.12', time: '2m ago', severity: 'info' },
  { id: 'log2', user: 'System', action: 'CRM sync completed', target: 'Salesforce', ip: 'system', time: '4h ago', severity: 'info' },
  { id: 'log3', user: 'Mike Johnson', action: 'Submitted forecast', target: 'Q3 Forecast — $1.8M', ip: '73.142.88.18', time: '5h ago', severity: 'info' },
  { id: 'log4', user: 'Admin', action: 'Updated permissions', target: 'James Wilson → AE role', ip: '10.0.1.4', time: '1d ago', severity: 'warning' },
  { id: 'log5', user: 'Emily Davis', action: 'Exported report', target: 'Pipeline Forecast.xlsx', ip: '73.142.88.21', time: '1d ago', severity: 'info' },
  { id: 'log6', user: 'System', action: 'Failed login attempt', target: 'unknown@external.com', ip: '188.42.91.7', time: '2d ago', severity: 'critical' },
  { id: 'log7', user: 'Lisa Park', action: 'Created new lead', target: 'Eric Bauer — Pinnacle Retail', ip: '73.142.88.34', time: '2d ago', severity: 'info' },
  { id: 'log8', user: 'Admin', action: 'Revoked API key', target: 'key_prod_8f3a2', ip: '10.0.1.4', time: '3d ago', severity: 'warning' },
];

export const integrations = [
  { id: 'salesforce', name: 'Salesforce', description: 'Sync contacts, opportunities, and accounts', category: 'CRM', connected: true, lastSync: '2h ago', logo: 'SF', color: 'oklch(0.6 0.18 220)' },
  { id: 'hubspot', name: 'HubSpot', description: 'Marketing automation and inbound CRM', category: 'CRM', connected: true, lastSync: '5m ago', logo: 'HS', color: 'oklch(0.7 0.18 25)' },
  { id: 'slack', name: 'Slack', description: 'Team notifications and deal alerts', category: 'Communication', connected: true, lastSync: 'Real-time', logo: 'SL', color: 'oklch(0.7 0.18 220)' },
  { id: 'gmail', name: 'Gmail', description: 'Email tracking and conversation sync', category: 'Email', connected: false, lastSync: null, logo: 'GM', color: 'oklch(0.65 0.2 25)' },
  { id: 'outlook', name: 'Outlook', description: 'Microsoft 365 email and calendar', category: 'Email', connected: true, lastSync: '1h ago', logo: 'OL', color: 'oklch(0.6 0.18 220)' },
  { id: 'gcal', name: 'Google Calendar', description: 'Meeting scheduling and reminders', category: 'Calendar', connected: false, lastSync: null, logo: 'GC', color: 'oklch(0.7 0.18 145)' },
  { id: 'zoom', name: 'Zoom', description: 'Video conferencing and call recording', category: 'Video', connected: true, lastSync: '1h ago', logo: 'ZM', color: 'oklch(0.6 0.18 220)' },
  { id: 'segment', name: 'Segment', description: 'Customer data platform integration', category: 'Data', connected: true, lastSync: '12m ago', logo: 'SG', color: 'oklch(0.7 0.18 145)' },
  { id: 'stripe', name: 'Stripe', description: 'Billing, subscriptions, and payments', category: 'Billing', connected: true, lastSync: '3m ago', logo: 'ST', color: 'oklch(0.7 0.18 220)' },
  { id: 'intercom', name: 'Intercom', description: 'Customer support and engagement', category: 'Support', connected: false, lastSync: null, logo: 'IC', color: 'oklch(0.7 0.18 25)' },
];

export const reports = [
  { id: 'rpt1', name: 'Monthly Sales Summary', type: 'Sales', date: 'Jul 1, 2025', status: 'ready', owner: 'Sarah Chen', size: '2.4 MB' },
  { id: 'rpt2', name: 'Q4 Performance Analysis', type: 'Performance', date: 'Jun 28, 2025', status: 'ready', owner: 'Emily Davis', size: '4.8 MB' },
  { id: 'rpt3', name: 'Pipeline Forecast Q3', type: 'Forecast', date: 'Jun 25, 2025', status: 'ready', owner: 'Mike Johnson', size: '1.2 MB' },
  { id: 'rpt4', name: 'Team Productivity Report', type: 'Team', date: 'Jun 22, 2025', status: 'generating', owner: 'Admin', size: '—' },
  { id: 'rpt5', name: 'Lead Source Analysis', type: 'Marketing', date: 'Jun 20, 2025', status: 'ready', owner: 'David Okafor', size: '1.8 MB' },
  { id: 'rpt6', name: 'Churn Risk Assessment', type: 'Customer', date: 'Jun 18, 2025', status: 'ready', owner: 'Emily Davis', size: '3.1 MB' },
  { id: 'rpt7', name: 'Win/Loss Q2 Analysis', type: 'Performance', date: 'Jun 15, 2025', status: 'ready', owner: 'Sarah Chen', size: '2.6 MB' },
  { id: 'rpt8', name: 'Quota Attainment Tracker', type: 'Sales', date: 'Jun 12, 2025', status: 'ready', owner: 'Admin', size: '1.5 MB' },
];

export const playbooks = [
  { id: 'pb1', title: 'Enterprise Discovery Framework', description: 'Structured approach to enterprise discovery calls with qualification criteria and sample questions.', category: 'Discovery', stage: 'Discovery', views: 248, lastUpdated: '5d ago', author: 'Sarah Chen' },
  { id: 'pb2', title: 'Negotiation Playbook', description: 'Tactics for handling pricing objections and closing deals at full value. Includes scripts and counter-offer templates.', category: 'Negotiation', stage: 'Negotiation', views: 412, lastUpdated: '1w ago', author: 'Emily Davis' },
  { id: 'pb3', title: 'Multi-Threading Strategy', description: 'How to expand relationships within accounts and build champion networks across stakeholders.', category: 'Strategy', stage: 'All', views: 187, lastUpdated: '2w ago', author: 'Marcus Bell' },
  { id: 'pb4', title: 'Renewal Expansion Motion', description: 'Process for identifying expansion opportunities during renewal cycles with ROI calculation templates.', category: 'Renewals', stage: 'Discovery', views: 156, lastUpdated: '3d ago', author: 'Priya Sharma' },
  { id: 'pb5', title: 'Champion Building Guide', description: 'Identify, develop, and empower internal champions to drive deals forward.', category: 'Strategy', stage: 'All', views: 203, lastUpdated: '6d ago', author: 'Lisa Park' },
  { id: 'pb6', title: 'Objection Handling Library', description: 'Comprehensive library of common objections with proven response frameworks and example scripts.', category: 'Sales', stage: 'All', views: 521, lastUpdated: '1d ago', author: 'David Okafor' },
];

export const compensationPlans = [
  { id: 'cp1', name: 'Senior AE Plan 2025', role: 'Senior AE', baseSalary: 95000, onTargetEarnings: 220000, commissionRate: 12, accelerators: 1.5, effectiveDate: 'Jan 1, 2025', status: 'Active', reps: 3 },
  { id: 'cp2', name: 'AE Plan 2025', role: 'Account Executive', baseSalary: 75000, onTargetEarnings: 170000, commissionRate: 10, accelerators: 1.4, effectiveDate: 'Jan 1, 2025', status: 'Active', reps: 5 },
  { id: 'cp3', name: 'SDR Plan 2025', role: 'Sales Development Rep', baseSalary: 55000, onTargetEarnings: 95000, commissionRate: 6, accelerators: 1.25, effectiveDate: 'Jan 1, 2025', status: 'Active', reps: 4 },
  { id: 'cp4', name: 'Enterprise AE Plan', role: 'Enterprise AE', baseSalary: 120000, onTargetEarnings: 280000, commissionRate: 14, accelerators: 1.6, effectiveDate: 'Mar 1, 2025', status: 'Active', reps: 2 },
];

export const commissionEstimates = reps.map((r) => ({
  rep: r.name,
  initials: r.initials,
  quota: r.quota,
  revenue: r.revenue,
  attainment: Math.round((r.revenue / r.quota) * 100),
  baseCommission: Math.round(r.revenue * 0.12),
  accelerator: r.revenue > r.quota ? Math.round((r.revenue - r.quota) * 0.18) : 0,
  total: Math.round(r.revenue * 0.12) + (r.revenue > r.quota ? Math.round((r.revenue - r.quota) * 0.18) : 0),
}));

export const apiKeys = [
  { id: 'key1', name: 'Production API', key: 'pk_live_8f3a2••••••••••••2b9c', created: 'Jan 12, 2025', lastUsed: '2m ago', scopes: ['read', 'write', 'webhooks'], status: 'Active' },
  { id: 'key2', name: 'Staging API', key: 'pk_test_2c4d9••••••••••••9f1a', created: 'Feb 3, 2025', lastUsed: '4h ago', scopes: ['read', 'write'], status: 'Active' },
  { id: 'key3', name: 'Webhook Listener', key: 'pk_hook_7e8f1••••••••••••4d2b', created: 'Mar 21, 2025', lastUsed: '12m ago', scopes: ['webhooks'], status: 'Active' },
  { id: 'key4', name: 'Legacy Sync', key: 'pk_legacy_1a2b3••••••••••••5c6d', created: 'Oct 8, 2024', lastUsed: '3w ago', scopes: ['read'], status: 'Revoked' },
];

export const webhooks = [
  { id: 'wh1', url: 'https://api.acme.com/webhooks/pipeline-pilot', events: ['deal.created', 'deal.stage_changed', 'deal.won'], lastFired: '5m ago', status: 'Active', successRate: 99.8 },
  { id: 'wh2', url: 'https://crm.globaltech.io/sync/inbound', events: ['contact.created', 'contact.updated'], lastFired: '1h ago', status: 'Active', successRate: 100 },
  { id: 'wh3', url: 'https://hooks.slack.com/services/T0/B0/x', events: ['notification.created'], lastFired: '12m ago', status: 'Active', successRate: 99.5 },
  { id: 'wh4', url: 'https://api.legacy.com/incoming', events: ['deal.created'], lastFired: '4d ago', status: 'Paused', successRate: 87.2 },
];

export const roles = [
  { id: 'role1', name: 'Administrator', users: 2, permissions: 48, description: 'Full access to all features, settings, and data', color: 'var(--destructive)' },
  { id: 'role2', name: 'Sales Manager', users: 4, permissions: 32, description: 'Manage teams, view all deals, run reports', color: 'var(--accent)' },
  { id: 'role3', name: 'Account Executive', users: 12, permissions: 18, description: 'Manage own pipeline, deals, and customers', color: 'var(--chart-1)' },
  { id: 'role4', name: 'SDR', users: 8, permissions: 12, description: 'Manage leads, schedule meetings', color: 'var(--chart-3)' },
  { id: 'role5', name: 'Operations', users: 3, permissions: 28, description: 'Configure workflows, manage data imports', color: 'var(--chart-5)' },
  { id: 'role6', name: 'Viewer', users: 6, permissions: 6, description: 'Read-only access to dashboards and reports', color: 'var(--muted-foreground)' },
];

export const teamMembersAdmin = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah.chen@pipelinepilot.io', role: 'Senior AE', status: 'Active', lastActive: '2m ago', deals: 24, avatar: 'SC' },
  { id: 'u2', name: 'Mike Johnson', email: 'mike.johnson@pipelinepilot.io', role: 'Account Executive', status: 'Active', lastActive: '4h ago', deals: 19, avatar: 'MJ' },
  { id: 'u3', name: 'Emily Davis', email: 'emily.davis@pipelinepilot.io', role: 'Senior AE', status: 'Active', lastActive: '1h ago', deals: 17, avatar: 'ED' },
  { id: 'u4', name: 'James Wilson', email: 'james.wilson@pipelinepilot.io', role: 'Account Executive', status: 'Inactive', lastActive: '3d ago', deals: 15, avatar: 'JW' },
  { id: 'u5', name: 'Lisa Park', email: 'lisa.park@pipelinepilot.io', role: 'Account Executive', status: 'Active', lastActive: '6h ago', deals: 14, avatar: 'LP' },
  { id: 'u6', name: 'David Okafor', email: 'david.okafor@pipelinepilot.io', role: 'SDR Lead', status: 'Active', lastActive: '30m ago', deals: 22, avatar: 'DO' },
  { id: 'u7', name: 'Priya Sharma', email: 'priya.sharma@pipelinepilot.io', role: 'Account Executive', status: 'Active', lastActive: '12m ago', deals: 13, avatar: 'PS' },
  { id: 'u8', name: 'Marcus Bell', email: 'marcus.bell@pipelinepilot.io', role: 'Senior AE', status: 'Active', lastActive: '1d ago', deals: 11, avatar: 'MB' },
];

export const targets = [
  { period: 'Q1 2025', revenue: 1200000, deals: 48, newAccounts: 12, attainment: 108, status: 'exceeded' },
  { period: 'Q2 2025', revenue: 1500000, deals: 56, newAccounts: 18, attainment: 96, status: 'on_track' },
  { period: 'Q3 2025', revenue: 1800000, deals: 64, newAccounts: 22, attainment: 0, status: 'in_progress' },
  { period: 'Q4 2025', revenue: 2200000, deals: 72, newAccounts: 28, attainment: 0, status: 'in_progress' },
];

export const salesVelocity = [
  { month: 'Jan', velocity: 42500, deals: 12, avgSize: 125000, cycleDays: 47, winRate: 68 },
  { month: 'Feb', velocity: 48200, deals: 15, avgSize: 132000, cycleDays: 44, winRate: 71 },
  { month: 'Mar', velocity: 52100, deals: 13, avgSize: 138000, cycleDays: 42, winRate: 73 },
  { month: 'Apr', velocity: 56800, deals: 18, avgSize: 142000, cycleDays: 41, winRate: 75 },
  { month: 'May', velocity: 61300, deals: 17, avgSize: 148000, cycleDays: 39, winRate: 76 },
  { month: 'Jun', velocity: 68700, deals: 21, avgSize: 156000, cycleDays: 37, winRate: 78 },
];

export const campaignAttribution = [
  { campaign: 'Q2 Enterprise Outbound', deals: 14, pipeline: 1240000, revenue: 487000, cost: 28000, roi: 1640 },
  { campaign: 'Healthcare Webinar Series', deals: 9, pipeline: 680000, revenue: 312000, cost: 18000, roi: 1633 },
  { campaign: 'Referral Program 2025', deals: 11, pipeline: 540000, revenue: 268000, cost: 8000, roi: 3250 },
  { campaign: 'Google Ads — Brand', deals: 7, pipeline: 320000, revenue: 142000, cost: 22000, roi: 545 },
  { campaign: 'LinkedIn ABM Campaign', deals: 6, pipeline: 410000, revenue: 178000, cost: 24000, roi: 642 },
  { campaign: 'Trade Show — SaaStr', deals: 4, pipeline: 280000, revenue: 95000, cost: 45000, roi: 111 },
];

export const calendars = [
  { id: 'cal1', day: 'Mon', date: 30, events: [
    { time: '09:00', title: 'Pipeline Review', with: 'Sarah Chen', type: 'internal', duration: 30 },
    { time: '11:00', title: 'Discovery call — Northwind', with: 'Rebecca Lin', type: 'external', duration: 45 },
    { time: '14:00', title: 'QBR — Acme Corp', with: 'John Smith', type: 'external', duration: 60 },
  ]},
  { id: 'cal2', day: 'Tue', date: 1, events: [
    { time: '10:00', title: 'Demo — BrightWave', with: 'Maya Patel', type: 'external', duration: 45 },
    { time: '13:30', title: 'Team standup', with: 'Sales Team', type: 'internal', duration: 30 },
    { time: '15:00', title: 'Pricing call — Vertex', with: 'Alex Rivera', type: 'external', duration: 30 },
  ]},
  { id: 'cal3', day: 'Wed', date: 2, events: [
    { time: '09:30', title: 'Forecast review', with: 'Mike Johnson', type: 'internal', duration: 60 },
    { time: '14:00', title: 'Security review — GlobalTech', with: 'Robert Davis', type: 'external', duration: 90 },
  ]},
  { id: 'cal4', day: 'Thu', date: 3, events: [
    { time: '11:00', title: 'Discovery — Sentinel', with: 'Neil Foster', type: 'external', duration: 45 },
    { time: '16:00', title: 'Deal strategy sync', with: 'Sarah Chen', type: 'internal', duration: 30 },
  ]},
  { id: 'cal5', day: 'Fri', date: 4, events: [
    { time: '10:00', title: 'Negotiation — Forge', with: 'Carla Mendez', type: 'external', duration: 45 },
    { time: '15:30', title: 'Weekly wrap-up', with: 'Sales Team', type: 'internal', duration: 30 },
  ]},
];

export const tasks = [
  { id: 'task1', title: 'Send revised MSA to Acme legal', due: 'Today · 5:00 PM', priority: 'high', status: 'in_progress', owner: 'Sarah Chen', related: 'D-2041', type: 'follow_up' },
  { id: 'task2', title: 'Schedule renewal QBR with DataStream', due: 'Tomorrow', priority: 'high', status: 'pending', owner: 'James Wilson', related: 'D-2045', type: 'meeting' },
  { id: 'task3', title: 'Prepare ROI workshop materials', due: 'Jul 4', priority: 'medium', status: 'pending', owner: 'David Okafor', related: 'D-2050', type: 'prep' },
  { id: 'task4', title: 'Follow up on Vertex SOW approval', due: 'Today · 3:00 PM', priority: 'high', status: 'in_progress', owner: 'Marcus Bell', related: 'D-2048', type: 'follow_up' },
  { id: 'task5', title: 'Update forecast for Q3 commit', due: 'Jul 5', priority: 'medium', status: 'pending', owner: 'Mike Johnson', related: 'Q3 Forecast', type: 'admin' },
  { id: 'task6', title: 'Demo prep — Pulse Health Systems', due: 'Jul 3', priority: 'medium', status: 'pending', owner: 'Emily Davis', related: 'D-2051', type: 'prep' },
  { id: 'task7', title: 'Send BrightWave pricing options', due: 'Jul 6', priority: 'low', status: 'pending', owner: 'Sarah Chen', related: 'D-2049', type: 'follow_up' },
];

export const calls = [
  { id: 'call1', contact: 'John Smith', account: 'Acme Corporation', duration: 32, outcome: 'Connected', time: '2h ago', owner: 'Sarah Chen', recording: true, notes: 5 },
  { id: 'call2', contact: 'Robert Davis', account: 'GlobalTech Industries', duration: 28, outcome: 'Connected', time: '4h ago', owner: 'Emily Davis', recording: true, notes: 3 },
  { id: 'call3', contact: 'Alex Rivera', account: 'Vertex Robotics', duration: 0, outcome: 'No Answer', time: '5h ago', owner: 'Marcus Bell', recording: false, notes: 0 },
  { id: 'call4', contact: 'Emma Wilson', account: 'DataStream Analytics', duration: 18, outcome: 'Voicemail', time: '6h ago', owner: 'James Wilson', recording: false, notes: 1 },
  { id: 'call5', contact: 'Michael Chen', account: 'CloudFirst Inc', duration: 45, outcome: 'Connected', time: '8h ago', owner: 'Priya Sharma', recording: true, notes: 8 },
  { id: 'call6', contact: 'Jennifer Park', account: 'Innovate Labs', duration: 22, outcome: 'Connected', time: '1d ago', owner: 'Mike Johnson', recording: true, notes: 4 },
];

export const meetings = [
  { id: 'mtg1', title: 'QBR with Acme leadership', account: 'Acme Corporation', attendees: 6, duration: 60, time: 'Today · 2:00 PM', owner: 'Sarah Chen', type: 'qbr', location: 'Zoom' },
  { id: 'mtg2', title: 'Discovery — Northwind Trading', account: 'Northwind Trading', attendees: 3, duration: 45, time: 'Today · 11:00 AM', owner: 'David Okafor', type: 'discovery', location: 'Zoom' },
  { id: 'mtg3', title: 'Demo — BrightWave Media', account: 'BrightWave Media', attendees: 4, duration: 45, time: 'Tomorrow · 10:00 AM', owner: 'Sarah Chen', type: 'demo', location: 'On-site' },
  { id: 'mtg4', title: 'Security review — GlobalTech', account: 'GlobalTech Industries', attendees: 8, duration: 90, time: 'Wed · 2:00 PM', owner: 'Emily Davis', type: 'technical', location: 'Zoom' },
  { id: 'mtg5', title: 'Negotiation call — Vertex', account: 'Vertex Robotics', attendees: 5, duration: 30, time: 'Tomorrow · 3:00 PM', owner: 'Marcus Bell', type: 'negotiation', location: 'Zoom' },
  { id: 'mtg6', title: 'ROI workshop — Quantum Logistics', account: 'Quantum Logistics', attendees: 7, duration: 60, time: 'Fri · 10:00 AM', owner: 'David Okafor', type: 'workshop', location: 'On-site' },
];

export const emails = [
  { id: 'em1', subject: 'Re: Updated MSA for review', to: 'John Smith', account: 'Acme Corporation', time: '12m ago', owner: 'Sarah Chen', opened: true, replied: true, clicks: 3 },
  { id: 'em2', subject: 'Q3 pricing discussion', to: 'Robert Davis', account: 'GlobalTech Industries', time: '1h ago', owner: 'Emily Davis', opened: true, replied: false, clicks: 1 },
  { id: 'em3', subject: 'SOW approval update', to: 'Alex Rivera', account: 'Vertex Robotics', time: '3h ago', owner: 'Marcus Bell', opened: true, replied: true, clicks: 2 },
  { id: 'em4', subject: 'Champion introduction', to: 'Lisa Wong', account: 'Acme Corporation', time: '5h ago', owner: 'Sarah Chen', opened: false, replied: false, clicks: 0 },
  { id: 'em5', subject: 'Demo follow-up questions', to: 'Maya Patel', account: 'BrightWave Media', time: '8h ago', owner: 'Sarah Chen', opened: true, replied: false, clicks: 4 },
];

export const leaderboard = reps
  .slice()
  .sort((a, b) => b.revenue - a.revenue)
  .map((r, i) => ({ ...r, rank: i + 1 }));

export const stageConversion = [
  { stage: 'Lead', entered: 892, converted: 556, rate: 62 },
  { stage: 'Qualified', entered: 556, converted: 357, rate: 64 },
  { stage: 'Discovery', entered: 357, converted: 179, rate: 50 },
  { stage: 'Proposal', entered: 179, converted: 87, rate: 49 },
  { stage: 'Negotiation', entered: 87, converted: 62, rate: 71 },
];

export const funnelData = [
  { stage: 'Leads', value: 892, color: 'var(--chart-1)' },
  { stage: 'Qualified', value: 556, color: 'var(--chart-2)' },
  { stage: 'Discovery', value: 357, color: 'var(--chart-3)' },
  { stage: 'Proposal', value: 179, color: 'var(--chart-5)' },
  { stage: 'Negotiation', value: 87, color: 'var(--accent)' },
  { stage: 'Won', value: 62, color: 'var(--success)' },
];

export const customerHealth = accounts.map((a) => ({
  account: a.name,
  healthScore: a.healthScore,
  churnRisk: a.churnRisk,
  arr: a.arr,
  tier: a.tier,
}));
