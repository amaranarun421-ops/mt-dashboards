/* ========================================================================
   CRM dashboard mock data — realistic relationship intelligence numbers.
   ======================================================================== */

/* ---- Relationship Timeline hero ---- */
export type Touchpoint = {
  date: string;
  emails: number;
  calls: number;
  meetings: number;
  dealsAdvanced: number;
  annotation?: string;
};

export const touchpointSeries: Touchpoint[] = [
  { date: 'May 25', emails: 42, calls: 18, meetings: 6, dealsAdvanced: 2 },
  { date: 'May 28', emails: 58, calls: 24, meetings: 8, dealsAdvanced: 3, annotation: 'Demo completed' },
  { date: 'Jun 01', emails: 72, calls: 32, meetings: 12, dealsAdvanced: 4 },
  { date: 'Jun 04', emails: 64, calls: 28, meetings: 10, dealsAdvanced: 3, annotation: 'Contract sent' },
  { date: 'Jun 07', emails: 82, calls: 36, meetings: 14, dealsAdvanced: 5 },
  { date: 'Jun 10', emails: 76, calls: 30, meetings: 11, dealsAdvanced: 4, annotation: 'Renewal discussion' },
  { date: 'Jun 13', emails: 94, calls: 42, meetings: 16, dealsAdvanced: 6 },
  { date: 'Jun 16', emails: 88, calls: 38, meetings: 13, dealsAdvanced: 5, annotation: 'Pricing objection' },
  { date: 'Jun 19', emails: 102, calls: 44, meetings: 18, dealsAdvanced: 7 },
  { date: 'Jun 22', emails: 96, calls: 40, meetings: 15, dealsAdvanced: 6 },
  { date: 'Jun 23', emails: 108, calls: 46, meetings: 17, dealsAdvanced: 7 },
];

export const crmPulse = {
  activeAccounts: 1248,
  openOpportunities: 386,
  pipelineValue: 4820000,
  avgResponseTime: '2h 18m',
};

/* ---- Today's Follow-ups ---- */
export type FollowUp = {
  id: string;
  task: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  type: 'call' | 'email' | 'meeting' | 'review';
  done: boolean;
  detail: string;
};

export const followUps: FollowUp[] = [
  { id: 'f1', task: 'Call Kristin Watson about renewal', time: '10:30 AM', priority: 'high', type: 'call', done: false, detail: 'Renewal due in 12 days. Last touch: email 3 days ago. Discuss contract terms.' },
  { id: 'f2', task: 'Send proposal to Acme Studio', time: '11:15 AM', priority: 'high', type: 'email', done: false, detail: 'Custom pricing for 50-seat plan. Include security overview attachment.' },
  { id: 'f3', task: 'Review contract redline with OrbitLabs', time: '2:00 PM', priority: 'medium', type: 'review', done: false, detail: 'Legal team sent redlines on Section 4 (Liability) and Section 7 (Termination).' },
  { id: 'f4', task: 'Follow up with Jane Cooper', time: '4:45 PM', priority: 'low', type: 'email', done: false, detail: 'Warm lead from webinar. Share case study and schedule discovery call.' },
];

/* ---- Account Health Radar ---- */
export const accountHealth = {
  overallScore: 82,
  atRiskAccounts: 24,
  expansionReady: 68,
  dimensions: [
    { name: 'Engagement', score: 88, color: '#465FFF' },
    { name: 'Deal velocity', score: 76, color: '#12B76A' },
    { name: 'Support load', score: 64, color: '#F79009' },
    { name: 'Renewal confidence', score: 84, color: '#0BA5EC' },
    { name: 'Payment health', score: 92, color: '#7A5AF8' },
    { name: 'Product usage', score: 78, color: '#EC4899' },
  ],
};

/* ---- CRM Signal Strip ---- */
export type CrmSignal = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'warning';
  icon: 'leads' | 'hot' | 'stalled' | 'followups' | 'reply' | 'renewal';
  tooltip: string;
  sparkline: number[];
};

export const crmSignals: CrmSignal[] = [
  { id: 's1', label: 'New leads', value: '428', change: '+14.2%', trend: 'up', icon: 'leads', tooltip: '428 new leads this period — 62 from inbound, 184 from outbound, 182 from referrals', sparkline: [280, 320, 360, 380, 400, 420, 428] },
  { id: 's2', label: 'Hot accounts', value: '76', change: '+8.6%', trend: 'up', icon: 'hot', tooltip: '76 accounts with high engagement and active opportunities', sparkline: [58, 62, 66, 70, 72, 74, 76] },
  { id: 's3', label: 'Stalled deals', value: '31', change: '+5', trend: 'warning', icon: 'stalled', tooltip: '31 deals with no activity in 14+ days — review needed', sparkline: [22, 24, 26, 28, 29, 30, 31] },
  { id: 's4', label: 'Follow-ups due', value: '58', change: 'today', trend: 'up', icon: 'followups', tooltip: '58 follow-ups scheduled for today — 12 high priority', sparkline: [42, 48, 52, 54, 56, 57, 58] },
  { id: 's5', label: 'Avg reply time', value: '2h 18m', change: '-22m', trend: 'up', icon: 'reply', tooltip: 'Average response time improved by 22 minutes vs last period', sparkline: [180, 170, 165, 155, 148, 142, 138] },
  { id: 's6', label: 'Renewal risk', value: '24', change: 'accounts', trend: 'warning', icon: 'renewal', tooltip: '24 accounts at risk of non-renewal — $284K pipeline at stake', sparkline: [18, 20, 21, 22, 23, 24, 24] },
];

/* ---- Pipeline Board (kanban) ---- */
export type Deal = {
  id: string;
  account: string;
  owner: string;
  value: number;
  probability: number;
  nextAction: string;
  risk: 'low' | 'medium' | 'high';
  stage: 'new' | 'qualified' | 'demo' | 'proposal' | 'negotiation' | 'won';
  daysInStage: number;
};

export const pipelineStages = [
  { key: 'new' as const, name: 'New Lead', count: 84, value: 420000, color: '#465FFF' },
  { key: 'qualified' as const, name: 'Qualified', count: 62, value: 780000, color: '#0BA5EC' },
  { key: 'demo' as const, name: 'Demo Scheduled', count: 41, value: 1120000, color: '#12B76A' },
  { key: 'proposal' as const, name: 'Proposal', count: 29, value: 1380000, color: '#F79009' },
  { key: 'negotiation' as const, name: 'Negotiation', count: 18, value: 860000, color: '#7A5AF8' },
  { key: 'won' as const, name: 'Closed Won', count: 12, value: 420000, color: '#EC4899' },
];

export const deals: Deal[] = [
  { id: 'd1', account: 'Acme Studio', owner: 'Darlene Robertson', value: 84000, probability: 45, nextAction: 'Send custom pricing', risk: 'low', stage: 'qualified', daysInStage: 4 },
  { id: 'd2', account: 'BrightCart', owner: 'Kristin Watson', value: 68000, probability: 30, nextAction: 'Schedule discovery call', risk: 'low', stage: 'new', daysInStage: 2 },
  { id: 'd3', account: 'OrbitLabs', owner: 'Albert Flores', value: 126000, probability: 60, nextAction: 'Contract redline review', risk: 'medium', stage: 'proposal', daysInStage: 8 },
  { id: 'd4', account: 'Northstar AI', owner: 'Jane Cooper', value: 240000, probability: 72, nextAction: 'Security review call', risk: 'low', stage: 'negotiation', daysInStage: 12 },
  { id: 'd5', account: 'FlowDesk', owner: 'Devon Lane', value: 42000, probability: 25, nextAction: 'Follow up after demo', risk: 'high', stage: 'demo', daysInStage: 16 },
  { id: 'd6', account: 'AtlasCloud', owner: 'Darlene Robertson', value: 180000, probability: 55, nextAction: 'Pricing objection response', risk: 'medium', stage: 'demo', daysInStage: 6 },
  { id: 'd7', account: 'NovaRetail', owner: 'Kristin Watson', value: 94000, probability: 80, nextAction: 'Procurement sign-off', risk: 'low', stage: 'negotiation', daysInStage: 5 },
  { id: 'd8', account: 'BluePeak', owner: 'Albert Flores', value: 156000, probability: 35, nextAction: 'Re-engage champion', risk: 'high', stage: 'qualified', daysInStage: 21 },
  { id: 'd9', account: 'CloudMint', owner: 'Jane Cooper', value: 72000, probability: 68, nextAction: 'Send final proposal', risk: 'low', stage: 'proposal', daysInStage: 7 },
  { id: 'd10', account: 'AlphaWorks', owner: 'Devon Lane', value: 58000, probability: 90, nextAction: 'Onboarding kickoff', risk: 'low', stage: 'won', daysInStage: 2 },
  { id: 'd11', account: 'QuantumLeap', owner: 'Darlene Robertson', value: 112000, probability: 40, nextAction: 'Schedule product demo', risk: 'medium', stage: 'new', daysInStage: 1 },
  { id: 'd12', account: 'ZenithCorp', owner: 'Kristin Watson', value: 198000, probability: 65, nextAction: 'Legal review meeting', risk: 'medium', stage: 'proposal', daysInStage: 9 },
];

/* ---- Lead Intent Radar (scatter) ---- */
export type LeadIntent = {
  id: string;
  account: string;
  value: number;
  engagement: number;
  intent: number;
  owner: string;
  nextAction: string;
  lastActivity: string;
};

export const leadIntents: LeadIntent[] = [
  { id: 'li1', account: 'Acme Studio', value: 84000, engagement: 92, intent: 88, owner: 'Darlene Robertson', nextAction: 'Send pricing', lastActivity: '2h ago — Email opened' },
  { id: 'li2', account: 'OrbitLabs', value: 126000, engagement: 78, intent: 74, owner: 'Albert Flores', nextAction: 'Contract review', lastActivity: '1d ago — Demo completed' },
  { id: 'li3', account: 'Northstar AI', value: 240000, engagement: 86, intent: 91, owner: 'Jane Cooper', nextAction: 'Security call', lastActivity: '3h ago — Proposal viewed' },
  { id: 'li4', account: 'FlowDesk', value: 42000, engagement: 64, intent: 58, owner: 'Devon Lane', nextAction: 'Follow up', lastActivity: '5d ago — No response' },
  { id: 'li5', account: 'BrightCart', value: 68000, engagement: 72, intent: 66, owner: 'Kristin Watson', nextAction: 'Discovery call', lastActivity: '2d ago — Form submitted' },
  { id: 'li6', account: 'AtlasCloud', value: 180000, engagement: 55, intent: 82, owner: 'Darlene Robertson', nextAction: 'Re-engage', lastActivity: '8d ago — Champion left' },
];

/* ---- Account Health Matrix ---- */
export type HealthCell = {
  segment: string;
  status: string;
  count: number;
  trend: number;
  examples: string[];
};

export const healthMatrix: HealthCell[] = [
  { segment: 'Enterprise', status: 'Healthy', count: 42, trend: 4, examples: ['Northstar AI', 'AtlasCloud', 'ZenithCorp'] },
  { segment: 'Enterprise', status: 'Needs attention', count: 12, trend: -2, examples: ['BluePeak', 'NovaRetail'] },
  { segment: 'Enterprise', status: 'At risk', count: 6, trend: -1, examples: ['QuantumLeap'] },
  { segment: 'Enterprise', status: 'Expansion-ready', count: 18, trend: 6, examples: ['Northstar AI', 'OrbitLabs'] },
  { segment: 'Mid-market', status: 'Healthy', count: 128, trend: 8, examples: ['Acme Studio', 'CloudMint', 'AlphaWorks'] },
  { segment: 'Mid-market', status: 'Needs attention', count: 24, trend: -3, examples: ['FlowDesk', 'BrightCart'] },
  { segment: 'Mid-market', status: 'At risk', count: 12, trend: 2, examples: ['DataPulse'] },
  { segment: 'Mid-market', status: 'Expansion-ready', count: 36, trend: 12, examples: ['Acme Studio', 'CloudMint'] },
  { segment: 'SMB', status: 'Healthy', count: 384, trend: 14, examples: ['SyncHub', 'PixelForge', 'DevNest'] },
  { segment: 'SMB', status: 'Needs attention', count: 68, trend: -6, examples: ['QuickShip', 'MailBot'] },
  { segment: 'SMB', status: 'At risk', count: 5, trend: 1, examples: ['TinyOps'] },
  { segment: 'SMB', status: 'Expansion-ready', count: 14, trend: 4, examples: ['SyncHub', 'PixelForge'] },
  { segment: 'Trial', status: 'Healthy', count: 248, trend: 22, examples: ['Trial accounts'] },
  { segment: 'Trial', status: 'Needs attention', count: 86, trend: -8, examples: ['Stale trials'] },
  { segment: 'Trial', status: 'At risk', count: 1, trend: 0, examples: ['None'] },
  { segment: 'Trial', status: 'Expansion-ready', count: 0, trend: 0, examples: ['None'] },
];

/* ---- Conversation Inbox ---- */
export type Conversation = {
  id: string;
  contact: string;
  channel: 'email' | 'phone' | 'linkedin' | 'chat' | 'support';
  preview: string;
  time: string;
  unread: boolean;
  account: string;
};

export const conversations: Conversation[] = [
  { id: 'cv1', contact: 'Darlene Robertson', channel: 'email', preview: 'Asked for pricing revision on 50-seat plan', time: '12m ago', unread: true, account: 'Acme Studio' },
  { id: 'cv2', contact: 'Albert Flores', channel: 'email', preview: 'Replied to proposal — wants 3-year term', time: '1h ago', unread: true, account: 'OrbitLabs' },
  { id: 'cv3', contact: 'Jane Cooper', channel: 'linkedin', preview: 'Requested integration docs for API', time: '2h ago', unread: false, account: 'Northstar AI' },
  { id: 'cv4', contact: 'Devon Lane', channel: 'chat', preview: 'Asked for procurement timeline', time: '3h ago', unread: false, account: 'FlowDesk' },
  { id: 'cv5', contact: 'Kristin Watson', channel: 'phone', preview: 'Called about renewal terms — left voicemail', time: '4h ago', unread: false, account: 'BluePeak' },
  { id: 'cv6', contact: 'Support Team', channel: 'support', preview: 'Escalated ticket: BluePeak usage down 18%', time: '6h ago', unread: false, account: 'BluePeak' },
];

/* ---- Renewal Risk ---- */
export type RenewalRisk = {
  id: string;
  account: string;
  daysToRenewal: number;
  signal: string;
  risk: 'high' | 'medium' | 'low';
  action: string;
  value: number;
};

export const renewalRisks: RenewalRisk[] = [
  { id: 'rr1', account: 'BluePeak', daysToRenewal: 12, signal: 'Usage down 18%', risk: 'high', action: 'Schedule executive check-in and offer training session', value: 84000 },
  { id: 'rr2', account: 'CloudMint', daysToRenewal: 24, signal: 'Support tickets up 32%', risk: 'medium', action: 'Assign CSM for proactive support review', value: 42000 },
  { id: 'rr3', account: 'NovaRetail', daysToRenewal: 31, signal: 'Champion inactive 14 days', risk: 'medium', action: 'Identify new champion and re-engage stakeholders', value: 68000 },
  { id: 'rr4', account: 'AlphaWorks', daysToRenewal: 45, signal: 'Healthy usage', risk: 'low', action: 'Send renewal reminder and expansion proposal', value: 38000 },
];

/* ---- Meeting Schedule ---- */
export type Meeting = {
  id: string;
  title: string;
  account: string;
  time: string;
  type: 'demo' | 'renewal' | 'contract' | 'onboarding';
};

export const meetings: Meeting[] = [
  { id: 'm1', title: 'Product demo', account: 'Acme Studio', time: '9:30 AM', type: 'demo' },
  { id: 'm2', title: 'Renewal review', account: 'BluePeak', time: '11:00 AM', type: 'renewal' },
  { id: 'm3', title: 'Contract call', account: 'Northstar AI', time: '2:00 PM', type: 'contract' },
  { id: 'm4', title: 'Onboarding sync', account: 'FlowDesk', time: '4:15 PM', type: 'onboarding' },
];

/* ---- Contacts & Accounts table ---- */
export type Contact = {
  id: string;
  account: string;
  contact: string;
  owner: string;
  stage: string;
  value: string;
  health: 'healthy' | 'attention' | 'at-risk' | 'expansion';
  lastTouch: string;
  nextAction: string;
  status: 'Active' | 'Stalled' | 'Won' | 'Lost';
};

export const contacts: Contact[] = [
  { id: 'ct1', account: 'Northstar AI', contact: 'Jane Cooper', owner: 'Jane Cooper', stage: 'Negotiation', value: '$240K', health: 'expansion', lastTouch: '3h ago', nextAction: 'Security review call', status: 'Active' },
  { id: 'ct2', account: 'Acme Studio', contact: 'Darlene Robertson', owner: 'Darlene Robertson', stage: 'Qualified', value: '$84K', health: 'healthy', lastTouch: '2h ago', nextAction: 'Send custom pricing', status: 'Active' },
  { id: 'ct3', account: 'OrbitLabs', contact: 'Albert Flores', owner: 'Albert Flores', stage: 'Proposal', value: '$126K', health: 'attention', lastTouch: '1d ago', nextAction: 'Contract redline review', status: 'Active' },
  { id: 'ct4', account: 'BluePeak', contact: 'Kristin Watson', owner: 'Kristin Watson', stage: 'Renewal', value: '$84K', health: 'at-risk', lastTouch: '4h ago', nextAction: 'Call about renewal', status: 'Stalled' },
  { id: 'ct5', account: 'FlowDesk', contact: 'Devon Lane', owner: 'Devon Lane', stage: 'Demo', value: '$42K', health: 'attention', lastTouch: '5d ago', nextAction: 'Follow up after demo', status: 'Stalled' },
  { id: 'ct6', account: 'AlphaWorks', contact: 'Martin K.', owner: 'Devon Lane', stage: 'Closed Won', value: '$58K', health: 'healthy', lastTouch: '2d ago', nextAction: 'Onboarding kickoff', status: 'Won' },
  { id: 'ct7', account: 'AtlasCloud', contact: 'Sara N.', owner: 'Darlene Robertson', stage: 'Demo', value: '$180K', health: 'attention', lastTouch: '8d ago', nextAction: 'Re-engage champion', status: 'Stalled' },
  { id: 'ct8', account: 'CloudMint', contact: 'Alex P.', owner: 'Jane Cooper', stage: 'Proposal', value: '$72K', health: 'healthy', lastTouch: '1d ago', nextAction: 'Send final proposal', status: 'Active' },
  { id: 'ct9', account: 'NovaRetail', contact: 'Wade W.', owner: 'Kristin Watson', stage: 'Negotiation', value: '$94K', health: 'attention', lastTouch: '3d ago', nextAction: 'Procurement sign-off', status: 'Active' },
  { id: 'ct10', account: 'ZenithCorp', contact: 'Esther H.', owner: 'Kristin Watson', stage: 'Proposal', value: '$198K', health: 'healthy', lastTouch: '6h ago', nextAction: 'Legal review meeting', status: 'Active' },
];
