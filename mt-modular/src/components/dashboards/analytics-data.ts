/* ========================================================================
   Analytics dashboard mock data — realistic audience intelligence numbers.
   Internally consistent: 32,210 visitors → 46,210 sessions → 84,520 pageviews.
   ======================================================================== */

/* ---- Audience Pulse hero ---- */
export type TrafficPoint = {
  date: string;
  visitors: number;
  sessions: number;
  pageviews: number;
  bounceRate: number;
  avgDuration: string;
  annotation?: string;
};

export const trafficSeries: Record<'24h' | '7d' | '30d' | '90d', TrafficPoint[]> = {
  '24h': [
    { date: '00:00', visitors: 420, sessions: 610, pageviews: 1080, bounceRate: 38.2, avgDuration: '2m 48s' },
    { date: '03:00', visitors: 280, sessions: 410, pageviews: 720, bounceRate: 41.4, avgDuration: '2m 22s' },
    { date: '06:00', visitors: 380, sessions: 540, pageviews: 980, bounceRate: 39.8, avgDuration: '2m 38s' },
    { date: '09:00', visitors: 820, sessions: 1180, pageviews: 2140, bounceRate: 36.1, avgDuration: '3m 12s' },
    { date: '12:00', visitors: 1240, sessions: 1780, pageviews: 3280, bounceRate: 34.8, avgDuration: '3m 28s' },
    { date: '15:00', visitors: 1620, sessions: 2320, pageviews: 4180, bounceRate: 35.2, avgDuration: '3m 18s' },
    { date: '18:00', visitors: 1840, sessions: 2640, pageviews: 4820, bounceRate: 36.4, avgDuration: '3m 02s' },
    { date: '21:00', visitors: 980, sessions: 1410, pageviews: 2580, bounceRate: 38.8, avgDuration: '2m 52s' },
  ],
  '7d': [
    { date: 'Jun 17', visitors: 3840, sessions: 5240, pageviews: 9180, bounceRate: 39.2, avgDuration: '2m 58s' },
    { date: 'Jun 18', visitors: 4210, sessions: 5840, pageviews: 10420, bounceRate: 37.8, avgDuration: '3m 12s' },
    { date: 'Jun 19', visitors: 5180, sessions: 7240, pageviews: 12840, bounceRate: 36.4, avgDuration: '3m 28s', annotation: 'Newsletter campaign' },
    { date: 'Jun 20', visitors: 4640, sessions: 6580, pageviews: 11620, bounceRate: 37.1, avgDuration: '3m 18s' },
    { date: 'Jun 21', visitors: 5420, sessions: 7620, pageviews: 13480, bounceRate: 35.8, avgDuration: '3m 32s' },
    { date: 'Jun 22', visitors: 6840, sessions: 9420, pageviews: 16820, bounceRate: 34.2, avgDuration: '3m 48s', annotation: 'Docs update' },
    { date: 'Jun 23', visitors: 6080, sessions: 8480, pageviews: 15240, bounceRate: 35.6, avgDuration: '3m 36s' },
  ],
  '30d': [
    { date: 'May 25', visitors: 2840, sessions: 4120, pageviews: 7280, bounceRate: 41.2, avgDuration: '2m 48s' },
    { date: 'May 28', visitors: 3120, sessions: 4480, pageviews: 7920, bounceRate: 40.4, avgDuration: '2m 58s' },
    { date: 'Jun 01', visitors: 3640, sessions: 5240, pageviews: 9280, bounceRate: 39.2, avgDuration: '3m 08s' },
    { date: 'Jun 04', visitors: 4280, sessions: 6120, pageviews: 10840, bounceRate: 38.1, avgDuration: '3m 18s' },
    { date: 'Jun 07', visitors: 5180, sessions: 7380, pageviews: 13040, bounceRate: 36.8, avgDuration: '3m 28s' },
    { date: 'Jun 10', visitors: 5840, sessions: 8320, pageviews: 14720, bounceRate: 35.9, avgDuration: '3m 38s', annotation: 'Product Hunt launch' },
    { date: 'Jun 13', visitors: 7240, sessions: 10280, pageviews: 18240, bounceRate: 34.2, avgDuration: '3m 52s', annotation: 'Newsletter campaign' },
    { date: 'Jun 16', visitors: 6420, sessions: 9180, pageviews: 16280, bounceRate: 35.1, avgDuration: '3m 42s' },
    { date: 'Jun 19', visitors: 5180, sessions: 7240, pageviews: 12840, bounceRate: 36.4, avgDuration: '3m 28s' },
    { date: 'Jun 22', visitors: 6840, sessions: 9420, pageviews: 16820, bounceRate: 34.2, avgDuration: '3m 48s', annotation: 'Docs update' },
    { date: 'Jun 23', visitors: 6080, sessions: 8480, pageviews: 15240, bounceRate: 35.6, avgDuration: '3m 36s' },
  ],
  '90d': [
    { date: 'Mar 25', visitors: 18420, sessions: 26480, pageviews: 46820, bounceRate: 42.1, avgDuration: '2m 38s' },
    { date: 'Apr 05', visitors: 22480, sessions: 32180, pageviews: 57240, bounceRate: 40.8, avgDuration: '2m 52s' },
    { date: 'Apr 15', visitors: 26120, sessions: 37240, pageviews: 66480, bounceRate: 39.4, avgDuration: '3m 04s' },
    { date: 'Apr 25', visitors: 28840, sessions: 41280, pageviews: 73920, bounceRate: 38.6, avgDuration: '3m 14s' },
    { date: 'May 05', visitors: 31480, sessions: 44820, pageviews: 80480, bounceRate: 37.8, avgDuration: '3m 22s' },
    { date: 'May 15', visitors: 34280, sessions: 48840, pageviews: 87820, bounceRate: 37.1, avgDuration: '3m 32s' },
    { date: 'May 25', visitors: 36820, sessions: 52480, pageviews: 94480, bounceRate: 36.4, avgDuration: '3m 42s', annotation: 'Product Hunt launch' },
    { date: 'Jun 05', visitors: 39480, sessions: 56240, pageviews: 101280, bounceRate: 35.8, avgDuration: '3m 52s' },
    { date: 'Jun 15', visitors: 42120, sessions: 59840, pageviews: 108420, bounceRate: 35.2, avgDuration: '4m 02s', annotation: 'Newsletter campaign' },
    { date: 'Jun 23', visitors: 32210, sessions: 46210, pageviews: 84520, bounceRate: 38.4, avgDuration: '2m 56s' },
  ],
};

export const audiencePulse = {
  visitors: 32210,
  visitorsChange: '+14.5%',
  sessions: 46210,
  pageviews: 84520,
  avgDuration: '2m 56s',
  insight: 'Traffic peaked after newsletter distribution and docs update.',
};

/* ---- Live Now card ---- */
export const liveNow = {
  activeVisitors: 1284,
  topPage: '/pricing',
  topSource: 'Google',
  topCountry: 'United States',
  topDevice: 'Mobile',
  newVisitors: 842,
  returningVisitors: 442,
  activeCountries: 38,
  anomalyCount: 5,
  sparkline: [820, 940, 1080, 1180, 1240, 1284, 1320, 1284],
};

/* ---- Traffic Quality card ---- */
export const trafficQuality = {
  bounceRate: 38.4,
  engagedSessions: 29840,
  pagesPerSession: 3.18,
  avgScrollDepth: 68,
  desktopBounce: 34.2,
  mobileBounce: 42.8,
};

/* ---- Key Signals strip ---- */
export type Signal = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'warning';
  icon: 'new' | 'returning' | 'signup' | 'mobile' | 'engagement';
  sparkline: number[];
  tooltip: string;
};

export const signals: Signal[] = [
  { id: 's1', label: 'New visitors', value: '18.4K', change: '+12.1%', trend: 'up', icon: 'new', sparkline: [12, 14, 16, 15, 17, 18, 18.4], tooltip: '58% of total visitors this period' },
  { id: 's2', label: 'Returning visitors', value: '13.8K', change: '+8.4%', trend: 'up', icon: 'returning', sparkline: [10, 11, 12, 13, 13, 14, 13.8], tooltip: '42% of total visitors this period' },
  { id: 's3', label: 'Signup conversion', value: '8.4%', change: '+1.2%', trend: 'up', icon: 'signup', sparkline: [6.8, 7.1, 7.4, 7.8, 8.1, 8.2, 8.4], tooltip: 'Signups / visitors this period' },
  { id: 's4', label: 'Mobile bounce', value: '42.8%', change: '+2.1%', trend: 'warning', icon: 'mobile', sparkline: [38, 39, 40, 41, 42, 42, 42.8], tooltip: '8.4% higher than desktop — investigate mobile UX' },
  { id: 's5', label: 'Avg engagement', value: '3m 42s', change: '+18s', trend: 'up', icon: 'engagement', sparkline: [180, 195, 210, 218, 222, 222, 222], tooltip: 'Average session duration across all sources' },
  { id: 's6', label: 'Page depth', value: '3.18', change: '+0.4', trend: 'up', icon: 'engagement', sparkline: [2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.18], tooltip: 'Pages viewed per session' },
];

/* ---- Acquisition Quality ---- */
export type Channel = {
  name: string;
  sessions: number;
  share: number;
  conversion: number;
  bounce: number;
  avgDuration: string;
  trend: 'up' | 'down' | 'flat';
  quality: 'high' | 'medium' | 'low';
};

export const channels: Channel[] = [
  { name: 'Google', sessions: 15328, share: 42, conversion: 8.4, bounce: 34.2, avgDuration: '3m 48s', trend: 'up', quality: 'high' },
  { name: 'Newsletter', sessions: 2920, share: 8, conversion: 12.8, bounce: 29.4, avgDuration: '4m 34s', trend: 'up', quality: 'high' },
  { name: 'YouTube', sessions: 7730, share: 24, conversion: 6.1, bounce: 40.8, avgDuration: '2m 52s', trend: 'up', quality: 'medium' },
  { name: 'Direct', sessions: 4810, share: 13, conversion: 6.8, bounce: 36.5, avgDuration: '3m 02s', trend: 'flat', quality: 'medium' },
  { name: 'Facebook', sessions: 5154, share: 16, conversion: 4.8, bounce: 45.1, avgDuration: '2m 18s', trend: 'down', quality: 'low' },
  { name: 'Instagram', sessions: 3221, share: 10, conversion: 5.6, bounce: 43.9, avgDuration: '2m 26s', trend: 'up', quality: 'medium' },
  { name: 'Twitter / X', sessions: 2577, share: 8, conversion: 3.9, bounce: 48.4, avgDuration: '1m 58s', trend: 'down', quality: 'low' },
];

export const channelInsight = 'Newsletter drives the highest-quality traffic with 12.8% conversion and 29.4% bounce. Twitter / X shows high bounce — consider refining landing pages.';

/* ---- Device & Platform Mix ---- */
export type DeviceSegment = {
  name: string;
  share: number;
  sessions: number;
  bounce: number;
  avgDuration: string;
  color: string;
};

export const devices: DeviceSegment[] = [
  { name: 'Desktop', share: 52, sessions: 24030, bounce: 34.2, avgDuration: '3m 28s', color: '#465FFF' },
  { name: 'Mobile', share: 36, sessions: 16635, bounce: 42.8, avgDuration: '2m 18s', color: '#12B76A' },
  { name: 'Tablet', share: 12, sessions: 5545, bounce: 38.4, avgDuration: '2m 48s', color: '#F79009' },
];

export const platforms = [
  { name: 'iOS', share: 31, color: '#465FFF' },
  { name: 'Windows', share: 28, color: '#12B76A' },
  { name: 'Android', share: 22, color: '#F79009' },
  { name: 'macOS', share: 14, color: '#0BA5EC' },
  { name: 'Other', share: 5, color: '#7A5AF8' },
];

export const deviceInsight = 'Mobile bounce is 8.4% higher than desktop — investigate mobile UX on /onboarding and /signup.';

/* ---- Geo Intelligence ---- */
export type Country = {
  name: string;
  code: string;
  visitors: number;
  sessions: number;
  conversion: number;
  bounce: number;
  growth: number;
  lat: number;
  lng: number;
};

export const countries: Country[] = [
  { name: 'United States', code: 'US', visitors: 12840, sessions: 18420, conversion: 9.2, bounce: 36.4, growth: 4.2, lat: 37.26, lng: -104.66 },
  { name: 'United Kingdom', code: 'GB', visitors: 6820, sessions: 9480, conversion: 7.8, bounce: 38.2, growth: 3.8, lat: 53.61, lng: -11.64 },
  { name: 'Germany', code: 'DE', visitors: 4310, sessions: 6240, conversion: 8.1, bounce: 35.8, growth: 3.1, lat: 51.16, lng: 10.45 },
  { name: 'France', code: 'FR', visitors: 3280, sessions: 4820, conversion: 6.4, bounce: 39.4, growth: 2.9, lat: 46.23, lng: 2.21 },
  { name: 'Australia', code: 'AU', visitors: 2480, sessions: 3640, conversion: 7.2, bounce: 37.8, growth: 4.8, lat: -25.03, lng: 115.21 },
  { name: 'Japan', code: 'JP', visitors: 1820, sessions: 2680, conversion: 5.8, bounce: 41.2, growth: 5.2, lat: 36.20, lng: 138.25 },
];

/* ---- Goal Conversion Funnel (Visitor Journey Flow) ---- */
export type FunnelStage = {
  name: string;
  count: number;
  color: string;
  icon: 'landing' | 'engaged' | 'keypage' | 'signup-start' | 'signup-done' | 'activated' | 'goal';
};

export const funnelStages: FunnelStage[] = [
  { name: 'Landing page', count: 32210, color: '#465FFF', icon: 'landing' },
  { name: 'Engaged visitors', count: 21840, color: '#0BA5EC', icon: 'engaged' },
  { name: 'Key page views', count: 18420, color: '#12B76A', icon: 'keypage' },
  { name: 'Signup started', count: 9840, color: '#F79009', icon: 'signup-start' },
  { name: 'Signup completed', count: 7320, color: '#7A5AF8', icon: 'signup-done' },
  { name: 'Activated users', count: 4180, color: '#EC4899', icon: 'activated' },
  { name: 'Goal completed', count: 2712, color: '#F04438', icon: 'goal' },
];

export const funnelInsight = 'Largest drop-off happens before signup start. Improve landing page clarity and CTA placement.';

/* ---- Top Pages ---- */
export type Page = {
  path: string;
  views: number;
  avgTime: string;
  exitRate: number;
  uniqueVisitors: number;
  conversionContribution: number;
  sparkline: number[];
  type: 'pricing' | 'docs' | 'features' | 'blog' | 'signup' | 'onboarding';
};

export const topPages: Page[] = [
  { path: '/pricing', views: 18420, avgTime: '14m 22s', exitRate: 22, uniqueVisitors: 12840, conversionContribution: 18.4, sparkline: [12, 14, 16, 17, 18, 18, 18.4], type: 'pricing' },
  { path: '/docs/getting-started', views: 14210, avgTime: '2m 18s', exitRate: 38, uniqueVisitors: 9840, conversionContribution: 12.2, sparkline: [10, 11, 12, 13, 14, 14, 14.2], type: 'docs' },
  { path: '/features/analytics', views: 9840, avgTime: '3m 04s', exitRate: 31, uniqueVisitors: 6820, conversionContribution: 8.6, sparkline: [7, 8, 8, 9, 9, 10, 9.8], type: 'features' },
  { path: '/blog/why-m3-chip', views: 7620, avgTime: '6m 12s', exitRate: 18, uniqueVisitors: 5240, conversionContribution: 4.2, sparkline: [5, 5, 6, 6, 7, 7, 7.6], type: 'blog' },
  { path: '/signup', views: 6430, avgTime: '4m 08s', exitRate: 24, uniqueVisitors: 4480, conversionContribution: 14.8, sparkline: [4, 5, 5, 6, 6, 6, 6.4], type: 'signup' },
  { path: '/onboarding', views: 5320, avgTime: '0m 48s', exitRate: 52, uniqueVisitors: 3680, conversionContribution: 22.4, sparkline: [4, 4, 5, 5, 5, 5, 5.3], type: 'onboarding' },
];

/* ---- User Retention ---- */
export type RetentionWeek = {
  week: string;
  retention: number;
  users: number;
};

export const retentionData: RetentionWeek[] = [
  { week: 'Week 0', retention: 100, users: 8420 },
  { week: 'Week 1', retention: 72, users: 6062 },
  { week: 'Week 2', retention: 58, users: 4884 },
  { week: 'Week 3', retention: 49, users: 4126 },
  { week: 'Week 4', retention: 43, users: 3621 },
  { week: 'Week 5', retention: 40, users: 3368 },
  { week: 'Week 6', retention: 38, users: 3200 },
  { week: 'Week 7', retention: 36, users: 3031 },
];

export const retentionInsight = 'Retention stabilizes after week 4, indicating a healthy returning audience.';

/* ---- Top Events ---- */
export type AnalyticsEvent = {
  name: string;
  count: number;
  category: 'Navigation' | 'Engagement' | 'Conversion' | 'Download';
  change: string;
  trend: 'up' | 'down' | 'flat';
  sparkline: number[];
};

export const topEvents: AnalyticsEvent[] = [
  { name: 'page_view', count: 84520, category: 'Navigation', change: '+14.5%', trend: 'up', sparkline: [62, 68, 72, 76, 80, 82, 84.5] },
  { name: 'scroll_depth_75', count: 28410, category: 'Engagement', change: '+8.2%', trend: 'up', sparkline: [20, 22, 24, 25, 27, 28, 28.4] },
  { name: 'signup_started', count: 9840, category: 'Conversion', change: '+12.1%', trend: 'up', sparkline: [6.8, 7.2, 7.8, 8.4, 9.0, 9.4, 9.8] },
  { name: 'signup_completed', count: 7320, category: 'Conversion', change: '+9.4%', trend: 'up', sparkline: [5.2, 5.8, 6.2, 6.6, 6.9, 7.1, 7.3] },
  { name: 'file_download', count: 4680, category: 'Download', change: '+4.8%', trend: 'up', sparkline: [3.8, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7] },
  { name: 'pricing_clicked', count: 3920, category: 'Engagement', change: '-2.1%', trend: 'down', sparkline: [4.2, 4.1, 4.0, 3.9, 3.9, 3.9, 3.9] },
  { name: 'docs_search', count: 2840, category: 'Navigation', change: '+6.4%', trend: 'up', sparkline: [2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.84] },
  { name: 'video_played', count: 1920, category: 'Engagement', change: '+18.2%', trend: 'up', sparkline: [1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.92] },
];

/* ---- Anomaly Watch ---- */
export type Anomaly = {
  id: string;
  title: string;
  detail: string;
  severity: 'info' | 'warning' | 'critical';
  action: string;
  time: string;
};

export const anomalies: Anomaly[] = [
  { id: 'a1', title: 'Bounce rate spike on mobile', detail: '+8.4% increase in the last 24h', severity: 'warning', action: 'Review mobile landing pages and /onboarding flow', time: '2h ago' },
  { id: 'a2', title: 'Twitter / X traffic down', detail: '-12.8% session drop this week', severity: 'warning', action: 'Check recent social posts and referral links', time: '5h ago' },
  { id: 'a3', title: '/onboarding exit rate increased', detail: '+6.1% exit rate on /onboarding', severity: 'critical', action: 'Audit onboarding flow and reduce friction steps', time: '8h ago' },
  { id: 'a4', title: 'Newsletter outperforming', detail: '+18.6% conversion from newsletter', severity: 'info', action: 'Consider increasing newsletter frequency', time: '1d ago' },
  { id: 'a5', title: 'Germany traffic growth', detail: '+3.1% visitor growth from Germany', severity: 'info', action: 'Localize content for German audience', time: '2d ago' },
];

/* ---- Engagement Heatmap (day × hour) ---- */
export const engagementHeatmap = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  hours: ['00', '04', '08', '12', '16', '20'],
  // 7 days × 6 hours — engagement score 0-100
  cells: [
    [12, 18, 42, 68, 82, 38],  // Mon
    [14, 20, 48, 72, 88, 42],  // Tue
    [16, 22, 52, 78, 92, 45],  // Wed
    [15, 21, 50, 74, 86, 40],  // Thu
    [18, 24, 54, 80, 90, 48],  // Fri
    [22, 28, 38, 58, 64, 52],  // Sat
    [20, 26, 36, 54, 60, 50],  // Sun
  ],
};

/* ---- Retention Cohort Grid ---- */
export type CohortRow = {
  cohort: string;
  size: number;
  weeks: (number | null)[]; // 6 values: Week 0 (100) through Week 5, null = no data yet
};

export const cohortGrid: CohortRow[] = [
  { cohort: 'May 06', size: 1820, weeks: [100, 72, 58, 49, 43, 40] },
  { cohort: 'May 13', size: 1640, weeks: [100, 74, 60, 51, 44, 41] },
  { cohort: 'May 20', size: 1480, weeks: [100, 71, 56, 47, 42, 38] },
  { cohort: 'May 27', size: 1320, weeks: [100, 73, 59, 50, 45, null] },
  { cohort: 'Jun 03', size: 1180, weeks: [100, 75, 62, 53, null, null] },
  { cohort: 'Jun 10', size: 980, weeks: [100, 68, 54, null, null, null] },
];

export const cohortSummary = {
  week4Avg: 43,
  returningRate: 42.8,
};

/* ---- Real-time Sessions ---- */
export type Session = {
  id: string;
  visitor: string;
  location: string;
  source: string;
  entryPage: string;
  currentPage: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  duration: string;
  events: number;
  status: 'Active' | 'Idle' | 'Bouncing';
  referrer?: string;
  path?: { page: string; time: string }[];
  eventsFired?: string[];
};

export const realtimeSessions: Session[] = [
  {
    id: 'rt1', visitor: 'Anonymous', location: 'San Francisco, US', source: 'Direct', entryPage: '/pricing', currentPage: '/pricing',
    device: 'Desktop', duration: '12s', events: 3, status: 'Active', referrer: 'Direct',
    path: [{ page: '/pricing', time: '0s' }, { page: '/pricing#features', time: '8s' }],
    eventsFired: ['page_view', 'scroll_depth_25', 'pricing_clicked'],
  },
  {
    id: 'rt2', visitor: 'Jane C.', location: 'London, GB', source: 'Google', entryPage: '/docs/getting-started', currentPage: '/features/analytics',
    device: 'Mobile', duration: '1m 04s', events: 8, status: 'Active', referrer: 'google.com/search',
    path: [{ page: '/docs/getting-started', time: '0s' }, { page: '/docs/api-reference', time: '22s' }, { page: '/features/analytics', time: '48s' }],
    eventsFired: ['page_view', 'scroll_depth_50', 'docs_search', 'page_view', 'scroll_depth_75', 'video_played', 'page_view', 'scroll_depth_25'],
  },
  {
    id: 'rt3', visitor: 'Anonymous', location: 'Berlin, DE', source: 'Twitter / X', entryPage: '/blog/why-m3-chip', currentPage: '/signup',
    device: 'Desktop', duration: '2m 18s', events: 6, status: 'Active', referrer: 't.co/abc123',
    path: [{ page: '/blog/why-m3-chip', time: '0s' }, { page: '/pricing', time: '1m 12s' }, { page: '/signup', time: '1m 58s' }],
    eventsFired: ['page_view', 'scroll_depth_75', 'page_view', 'pricing_clicked', 'page_view', 'signup_started'],
  },
  {
    id: 'rt4', visitor: 'Darlene R.', location: 'Sydney, AU', source: 'Email', entryPage: '/newsletter', currentPage: '/docs/getting-started',
    device: 'Mobile', duration: '4m 02s', events: 12, status: 'Active', referrer: 'mail.app',
    path: [{ page: '/newsletter', time: '0s' }, { page: '/features/analytics', time: '38s' }, { page: '/docs/getting-started', time: '1m 24s' }, { page: '/docs/api-reference', time: '2m 48s' }],
    eventsFired: ['page_view', 'scroll_depth_50', 'page_view', 'video_played', 'page_view', 'scroll_depth_75', 'docs_search', 'page_view', 'scroll_depth_25', 'file_download', 'page_view', 'scroll_depth_50'],
  },
  {
    id: 'rt5', visitor: 'Anonymous', location: 'Tokyo, JP', source: 'Google', entryPage: '/', currentPage: '/pricing',
    device: 'Tablet', duration: '37s', events: 4, status: 'Active', referrer: 'google.com/search',
    path: [{ page: '/', time: '0s' }, { page: '/pricing', time: '18s' }],
    eventsFired: ['page_view', 'scroll_depth_25', 'page_view', 'pricing_clicked'],
  },
  {
    id: 'rt6', visitor: 'Martin K.', location: 'Berlin, DE', source: 'Newsletter', entryPage: '/pricing', currentPage: '/signup',
    device: 'Desktop', duration: '3m 11s', events: 9, status: 'Active', referrer: 'mail.app',
    path: [{ page: '/pricing', time: '0s' }, { page: '/features/analytics', time: '52s' }, { page: '/signup', time: '2m 18s' }],
    eventsFired: ['page_view', 'pricing_clicked', 'page_view', 'scroll_depth_50', 'video_played', 'page_view', 'signup_started', 'signup_completed', 'page_view'],
  },
  {
    id: 'rt7', visitor: 'Anonymous', location: 'Paris, FR', source: 'Facebook', entryPage: '/', currentPage: '/',
    device: 'Mobile', duration: '8s', events: 1, status: 'Bouncing', referrer: 'facebook.com',
    path: [{ page: '/', time: '0s' }],
    eventsFired: ['page_view'],
  },
  {
    id: 'rt8', visitor: 'Sara N.', location: 'New York, US', source: 'Google', entryPage: '/docs/getting-started', currentPage: '/blog/why-m3-chip',
    device: 'Desktop', duration: '6m 42s', events: 14, status: 'Active', referrer: 'google.com/search',
    path: [{ page: '/docs/getting-started', time: '0s' }, { page: '/docs/api-reference', time: '1m 12s' }, { page: '/features/analytics', time: '2m 38s' }, { page: '/blog/why-m3-chip', time: '4m 18s' }],
    eventsFired: ['page_view', 'scroll_depth_75', 'docs_search', 'page_view', 'scroll_depth_50', 'file_download', 'page_view', 'video_played', 'scroll_depth_75', 'page_view', 'scroll_depth_25', 'page_view', 'scroll_depth_50', 'scroll_depth_75'],
  },
  {
    id: 'rt9', visitor: 'Anonymous', location: 'Munich, DE', source: 'Direct', entryPage: '/blog/why-m3-chip', currentPage: '/blog/why-m3-chip',
    device: 'Mobile', duration: '2m 48s', events: 5, status: 'Idle', referrer: 'Direct',
    path: [{ page: '/blog/why-m3-chip', time: '0s' }],
    eventsFired: ['page_view', 'scroll_depth_25', 'scroll_depth_50', 'scroll_depth_75', 'video_played'],
  },
  {
    id: 'rt10', visitor: 'Alex P.', location: 'Toronto, CA', source: 'Newsletter', entryPage: '/pricing', currentPage: '/signup',
    device: 'Desktop', duration: '4m 28s', events: 9, status: 'Active', referrer: 'mail.app',
    path: [{ page: '/pricing', time: '0s' }, { page: '/signup', time: '1m 38s' }, { page: '/onboarding', time: '3m 12s' }],
    eventsFired: ['page_view', 'pricing_clicked', 'page_view', 'signup_started', 'signup_completed', 'page_view', 'scroll_depth_25', 'scroll_depth_50', 'scroll_depth_75'],
  },
];

/* ---- Export helper data (for CSV) ---- */
export const exportSessions = realtimeSessions;
