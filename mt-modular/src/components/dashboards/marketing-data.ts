/* ========================================================================
   Marketing dashboard mock data — realistic campaign numbers.
   Internally consistent: $66,720 spend → 1.39M impressions → 42,180 clicks → 2,930 conversions.
   ======================================================================== */

/* ---- Campaign Pulse hero ---- */
export type CampaignPoint = {
  date: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpa: number;
  roas: number;
  annotation?: string;
};

export const campaignSeries: CampaignPoint[] = [
  { date: 'May 25', spend: 1840, impressions: 38200, clicks: 1080, conversions: 72, ctr: 2.83, cpa: 25.56, roas: 4.1, annotation: 'Summer Mega Sale launched' },
  { date: 'May 28', spend: 2240, impressions: 44800, clicks: 1340, conversions: 92, ctr: 2.99, cpa: 24.35, roas: 4.4 },
  { date: 'Jun 01', spend: 2840, impressions: 62400, clicks: 1820, conversions: 128, ctr: 2.92, cpa: 22.19, roas: 4.8 },
  { date: 'Jun 04', spend: 3120, impressions: 72800, clicks: 2180, conversions: 148, ctr: 2.99, cpa: 21.08, roas: 5.1, annotation: 'Influencer push' },
  { date: 'Jun 07', spend: 2980, impressions: 68400, clicks: 2040, conversions: 142, ctr: 2.98, cpa: 20.99, roas: 5.0 },
  { date: 'Jun 10', spend: 3480, impressions: 84200, clicks: 2480, conversions: 168, ctr: 2.95, cpa: 20.71, roas: 4.9 },
  { date: 'Jun 13', spend: 3820, impressions: 92400, clicks: 2820, conversions: 192, ctr: 3.06, cpa: 19.90, roas: 5.2, annotation: 'Email win-back sent' },
  { date: 'Jun 16', spend: 3680, impressions: 88200, clicks: 2640, conversions: 184, ctr: 2.99, cpa: 20.00, roas: 5.0 },
  { date: 'Jun 19', spend: 3940, impressions: 96400, clicks: 2920, conversions: 208, ctr: 3.03, cpa: 18.94, roas: 5.4, annotation: 'Creative refresh' },
  { date: 'Jun 22', spend: 4180, impressions: 104200, clicks: 3140, conversions: 224, ctr: 3.01, cpa: 18.66, roas: 5.5 },
  { date: 'Jun 23', spend: 4400, impressions: 108400, clicks: 3280, conversions: 236, ctr: 3.03, cpa: 18.64, roas: 5.6 },
];

export const campaignPulse = {
  totalSpend: 66720,
  impressions: 1390000,
  clicks: 42180,
  conversions: 2930,
  blendedRoas: 4.6,
  cpa: 21.88,
  spendChange: '+8.4%',
  impressionsChange: '+12.1%',
  clicksChange: '+9.6%',
  conversionsChange: '+14.2%',
  roasChange: '+0.3x',
};

/* ---- Budget Pacing ---- */
export const budgetPacing = {
  monthlyBudget: 82000,
  spent: 66720,
  remaining: 15280,
  pacing: 81.4,
  forecastedSpend: 84900,
  risk: 'Slight overpace',
  dailyBurnRate: 2840,
  daysAhead: 3.5,
  channelSplit: [
    { channel: 'Google Ads', amount: 24800, color: '#4285F4' },
    { channel: 'Meta Ads', amount: 19600, color: '#0866FF' },
    { channel: 'YouTube', amount: 8900, color: '#FF0000' },
    { channel: 'Instagram', amount: 7400, color: '#E1306C' },
    { channel: 'TikTok', amount: 4820, color: '#000000' },
    { channel: 'LinkedIn', amount: 6200, color: '#0A66C2' },
    { channel: 'Email', amount: 990, color: '#EA4335' },
  ],
};

/* ---- Live Campaign Alerts ---- */
export type CampaignAlert = {
  id: string;
  title: string;
  detail: string;
  severity: 'info' | 'warning' | 'critical';
  action: string;
  time: string;
};

export const campaignAlerts: CampaignAlert[] = [
  { id: 'ca1', title: 'Meta Ads CPA increased', detail: '+12.4% CPA increase in last 24h', severity: 'warning', action: 'Review audience targeting and bid strategy', time: '32m ago' },
  { id: 'ca2', title: 'Newsletter ROAS outperforming', detail: '12.4x ROAS — 2.7x above blended average', severity: 'info', action: 'Increase send frequency for win-back flow', time: '1h ago' },
  { id: 'ca3', title: 'TikTok CTR dropped below 1.8%', detail: '1.72% CTR — below 2% benchmark', severity: 'warning', action: 'Refresh creative — fatigue detected on top ad', time: '2h ago' },
  { id: 'ca4', title: 'Google Ads search terms trending up', detail: '+18% impression share for brand terms', severity: 'info', action: 'Consider increasing brand campaign budget', time: '4h ago' },
  { id: 'ca5', title: 'LinkedIn B2B leads high quality', detail: '184 leads at $42.50 CPA — 68% SQL rate', severity: 'info', action: 'Scale lookalike audience targeting', time: '6h ago' },
];

/* ---- Channel Signal Strip ---- */
export type ChannelSignal = {
  id: string;
  channel: 'google' | 'meta' | 'youtube' | 'instagram' | 'tiktok' | 'email' | 'linkedin';
  label: string;
  value: string;
  metric: string;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  tooltip: string;
};

export const channelSignals: ChannelSignal[] = [
  { id: 'cs1', channel: 'google', label: 'Google Ads', value: '$94.2K', metric: 'attributed revenue', trend: 'up', trendValue: '5.4x ROAS', tooltip: 'Best paid channel by revenue — 842 conversions at $21.88 CPA' },
  { id: 'cs2', channel: 'meta', label: 'Meta Ads', value: '$61.8K', metric: 'attributed revenue', trend: 'up', trendValue: '3.8x ROAS', tooltip: '514 conversions — strong retargeting performance' },
  { id: 'cs3', channel: 'youtube', label: 'YouTube', value: '7.7K', metric: 'clicks', trend: 'up', trendValue: '6.1% CTR', tooltip: 'Awareness campaign — 730K impressions, 1.06% CTR' },
  { id: 'cs4', channel: 'instagram', label: 'Instagram', value: '3.2K', metric: 'engagements', trend: 'up', trendValue: '5.6% CVR', tooltip: '318 conversions — strong visual creative performance' },
  { id: 'cs5', channel: 'tiktok', label: 'TikTok', value: '2.9M', metric: 'reach', trend: 'down', trendValue: '1.9% CTR', tooltip: 'High reach but CTR below 2% benchmark — creative fatigue' },
  { id: 'cs6', channel: 'email', label: 'Email', value: '12.4x', metric: 'ROAS', trend: 'up', trendValue: '38.4% open rate', tooltip: 'Highest ROAS channel — 386 conversions at $3.06 CPA' },
  { id: 'cs7', channel: 'linkedin', label: 'LinkedIn', value: '184', metric: 'B2B leads', trend: 'up', trendValue: '5.2x ROAS', tooltip: 'High-quality leads — 68% SQL rate at $42.50 CPA' },
];

/* ---- Channel War Room ---- */
export type ChannelPerformance = {
  id: string;
  channel: 'google' | 'meta' | 'youtube' | 'instagram' | 'tiktok' | 'linkedin' | 'email';
  name: string;
  spend: number;
  impressions: string;
  clicks: number;
  ctr: number;
  conversions: number;
  cpa: number;
  roas: number;
  status: 'active' | 'paused' | 'at-risk';
  highlight: 'best' | 'high-spend' | 'risk' | null;
  sparkline: number[];
};

export const channelPerformance: ChannelPerformance[] = [
  { id: 'ch1', channel: 'google', name: 'Google Ads', spend: 24800, impressions: '412K', clicks: 12400, ctr: 3.01, conversions: 842, cpa: 21.88, roas: 4.6, status: 'active', highlight: 'high-spend', sparkline: [620, 680, 720, 780, 820, 842, 880] },
  { id: 'ch2', channel: 'meta', name: 'Meta Ads', spend: 19600, impressions: '286K', clicks: 8420, ctr: 2.94, conversions: 514, cpa: 19.14, roas: 3.8, status: 'active', highlight: null, sparkline: [420, 460, 480, 500, 510, 514, 520] },
  { id: 'ch3', channel: 'youtube', name: 'YouTube', spend: 8900, impressions: '730K', clicks: 7730, ctr: 1.06, conversions: 220, cpa: 40.45, roas: 2.7, status: 'active', highlight: null, sparkline: [180, 190, 200, 210, 215, 220, 225] },
  { id: 'ch4', channel: 'instagram', name: 'Instagram', spend: 7400, impressions: '312K', clicks: 5820, ctr: 1.86, conversions: 318, cpa: 23.27, roas: 3.4, status: 'active', highlight: null, sparkline: [240, 260, 280, 300, 310, 318, 325] },
  { id: 'ch5', channel: 'tiktok', name: 'TikTok', spend: 4820, impressions: '2.9M', clicks: 6430, ctr: 1.92, conversions: 176, cpa: 27.38, roas: 2.9, status: 'at-risk', highlight: 'risk', sparkline: [220, 210, 200, 190, 185, 176, 170] },
  { id: 'ch6', channel: 'linkedin', name: 'LinkedIn', spend: 6200, impressions: '84K', clicks: 2180, ctr: 2.60, conversions: 184, cpa: 42.50, roas: 5.2, status: 'active', highlight: null, sparkline: [140, 150, 160, 170, 180, 184, 190] },
  { id: 'ch7', channel: 'email', name: 'Email', spend: 990, impressions: '48K', clicks: 4120, ctr: 8.58, conversions: 386, cpa: 3.06, roas: 12.4, status: 'active', highlight: 'best', sparkline: [280, 300, 320, 340, 360, 386, 400] },
];

/* ---- Creative Performance Board ---- */
export type CreativeTest = {
  id: string;
  test: string;
  variants: string;
  winner: string;
  lift: number;
  confidence: number;
  status: 'winner' | 'running' | 'testing' | 'needs-data';
  type: 'cta' | 'video' | 'carousel' | 'headline';
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpa: number;
};

export const creativeTests: CreativeTest[] = [
  { id: 'ct1', test: 'Hero CTA', variants: 'Buy Now vs Shop Sale', winner: 'Variant B (Shop Sale)', lift: 18.4, confidence: 96, status: 'winner', type: 'cta', impressions: 84200, clicks: 2840, conversions: 196, ctr: 3.37, cpa: 18.42 },
  { id: 'ct2', test: 'Video Hook', variants: '3-sec demo vs testimonial', winner: 'Demo hook', lift: 12.8, confidence: 91, status: 'running', type: 'video', impressions: 64800, clicks: 1940, conversions: 128, ctr: 2.99, cpa: 22.14 },
  { id: 'ct3', test: 'Carousel', variants: 'Benefits vs social proof', winner: 'Social proof', lift: 7.2, confidence: 88, status: 'testing', type: 'carousel', impressions: 42100, clicks: 1120, conversions: 72, ctr: 2.66, cpa: 28.40 },
  { id: 'ct4', test: 'Landing headline', variants: 'Fast setup vs no-code', winner: 'No-code', lift: 5.6, confidence: 82, status: 'needs-data', type: 'headline', impressions: 28400, clicks: 680, conversions: 38, ctr: 2.39, cpa: 32.60 },
];

/* ---- Audience Segments ---- */
export type AudienceSegment = {
  id: string;
  name: string;
  size: string;
  sizeNum: number;
  engagement: number;
  conversion: number;
  cpa: number;
  bestChannel: string;
  icon: 'new' | 'returning' | 'lookalike' | 'newsletter' | 'abandoner' | 'enterprise';
  action: string;
};

export const audienceSegments: AudienceSegment[] = [
  { id: 'as1', name: 'New visitors', size: '184K', sizeNum: 184000, engagement: 38.4, conversion: 4.8, cpa: 28, bestChannel: 'Google Ads', icon: 'new', action: 'Optimize landing page for first-visit clarity' },
  { id: 'as2', name: 'Returning visitors', size: '72K', sizeNum: 72000, engagement: 52.8, conversion: 9.6, cpa: 16, bestChannel: 'Email', icon: 'returning', action: 'Trigger personalized content recommendations' },
  { id: 'as3', name: 'Lookalike audience', size: '128K', sizeNum: 128000, engagement: 41.2, conversion: 5.4, cpa: 24, bestChannel: 'Meta Ads', icon: 'lookalike', action: 'Expand to 2% lookalike for broader reach' },
  { id: 'as4', name: 'Newsletter subscribers', size: '42K', sizeNum: 42000, engagement: 68.4, conversion: 12.4, cpa: 3, bestChannel: 'Email', icon: 'newsletter', action: 'Increase send frequency for top converters' },
  { id: 'as5', name: 'Signup abandoners', size: '9.8K', sizeNum: 9800, engagement: 44.6, conversion: 8.1, cpa: 11, bestChannel: 'Retargeting', icon: 'abandoner', action: 'Launch win-back sequence with incentive' },
  { id: 'as6', name: 'Enterprise intent', size: '4.2K', sizeNum: 4200, engagement: 38.8, conversion: 6.8, cpa: 42, bestChannel: 'LinkedIn', icon: 'enterprise', action: 'Route to sales team for ABM follow-up' },
];

/* ---- Attribution Paths ---- */
export type AttributionPath = {
  id: string;
  path: string[];
  conversions: number;
  share: number;
  channels: string[];
};

export const attributionPaths: AttributionPath[] = [
  { id: 'ap1', path: ['Google Ads', 'Pricing', 'Email', 'Signup'], conversions: 842, share: 28.7, channels: ['google', 'email'] },
  { id: 'ap2', path: ['YouTube', 'Blog', 'Direct', 'Signup'], conversions: 514, share: 17.5, channels: ['youtube'] },
  { id: 'ap3', path: ['LinkedIn', 'Case Study', 'Demo Request'], conversions: 184, share: 6.3, channels: ['linkedin'] },
  { id: 'ap4', path: ['Instagram', 'Landing Page', 'Signup'], conversions: 318, share: 10.9, channels: ['instagram'] },
  { id: 'ap5', path: ['Newsletter', 'Pricing', 'Signup'], conversions: 386, share: 13.2, channels: ['email'] },
];

/* ---- Campaign Calendar ---- */
export type CalendarEvent = {
  id: string;
  date: string;
  day: string;
  title: string;
  type: 'creative' | 'email' | 'social' | 'video' | 'sale';
  status: 'scheduled' | 'live' | 'needs-review' | 'completed';
  channel: string;
};

export const calendarEvents: CalendarEvent[] = [
  { id: 'ce1', date: 'Jun 24', day: 'Tomorrow', title: 'Creative refresh — Summer Sale', type: 'creative', status: 'scheduled', channel: 'Meta Ads' },
  { id: 'ce2', date: 'Jun 26', day: 'In 3 days', title: 'Newsletter drop — Win-back flow', type: 'email', status: 'scheduled', channel: 'Email' },
  { id: 'ce3', date: 'Jun 28', day: 'In 5 days', title: 'LinkedIn lead-gen push', type: 'social', status: 'needs-review', channel: 'LinkedIn' },
  { id: 'ce4', date: 'Jul 02', day: 'In 9 days', title: 'YouTube retargeting launch', type: 'video', status: 'scheduled', channel: 'YouTube' },
  { id: 'ce5', date: 'Jul 05', day: 'In 12 days', title: 'Summer Sale ends', type: 'sale', status: 'live', channel: 'All channels' },
];

/* ---- Campaign Portfolio ---- */
export type Campaign = {
  id: string;
  name: string;
  channel: 'Google Ads' | 'Meta Ads' | 'YouTube' | 'Instagram' | 'TikTok' | 'LinkedIn' | 'Email';
  objective: 'Conversions' | 'Awareness' | 'Retention' | 'Reach' | 'Leads' | 'Consideration';
  status: 'Active' | 'Paused' | 'Scheduled' | 'Completed';
  spend: string;
  spendNum: number;
  impressions: string;
  ctr: string;
  conversions: number;
  cpa: string;
  roas: string;
  trend: number[];
};

export const campaigns: Campaign[] = [
  { id: 'c1', name: 'Summer Mega Sale 2026', channel: 'Google Ads', objective: 'Conversions', status: 'Active', spend: '$24.8K', spendNum: 24800, impressions: '412K', ctr: '3.01%', conversions: 842, cpa: '$21.88', roas: '4.6x', trend: [620, 680, 720, 780, 820, 842, 880] },
  { id: 'c2', name: 'Brand Awareness Q2', channel: 'Meta Ads', objective: 'Awareness', status: 'Active', spend: '$19.6K', spendNum: 19600, impressions: '286K', ctr: '2.94%', conversions: 514, cpa: '$19.14', roas: '3.8x', trend: [420, 460, 480, 500, 510, 514, 520] },
  { id: 'c3', name: 'Email Win-back Series', channel: 'Email', objective: 'Retention', status: 'Active', spend: '$990', spendNum: 990, impressions: '48K', ctr: '8.58%', conversions: 386, cpa: '$3.06', roas: '12.4x', trend: [280, 300, 320, 340, 360, 386, 400] },
  { id: 'c4', name: 'New Product Launch', channel: 'TikTok', objective: 'Reach', status: 'Paused', spend: '$4.8K', spendNum: 4820, impressions: '2.9M', ctr: '1.92%', conversions: 176, cpa: '$27.38', roas: '2.9x', trend: [220, 210, 200, 190, 185, 176, 170] },
  { id: 'c5', name: 'B2B Lead Gen LinkedIn', channel: 'LinkedIn', objective: 'Leads', status: 'Active', spend: '$6.2K', spendNum: 6200, impressions: '84K', ctr: '2.60%', conversions: 184, cpa: '$42.50', roas: '5.2x', trend: [140, 150, 160, 170, 180, 184, 190] },
  { id: 'c6', name: 'YouTube Retargeting', channel: 'YouTube', objective: 'Consideration', status: 'Active', spend: '$8.9K', spendNum: 8900, impressions: '730K', ctr: '1.06%', conversions: 220, cpa: '$40.45', roas: '2.7x', trend: [180, 190, 200, 210, 215, 220, 225] },
  { id: 'c7', name: 'Instagram Reels Boost', channel: 'Instagram', objective: 'Awareness', status: 'Active', spend: '$7.4K', spendNum: 7400, impressions: '312K', ctr: '1.86%', conversions: 318, cpa: '$23.27', roas: '3.4x', trend: [240, 260, 280, 300, 310, 318, 325] },
  { id: 'c8', name: 'Q2 Demo Webinar', channel: 'LinkedIn', objective: 'Leads', status: 'Completed', spend: '$2.1K', spendNum: 2100, impressions: '28K', ctr: '3.82%', conversions: 84, cpa: '$25.00', roas: '4.8x', trend: [60, 68, 72, 78, 82, 84, 84] },
];

/* ---- Social Content Performance ---- */
export type SocialContent = {
  id: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'linkedin' | 'twitter';
  name: string;
  reach: string;
  engagement: number;
  saves: string;
  followers: string;
  topPost: string;
  sparkline: number[];
};

export const socialContent: SocialContent[] = [
  { id: 'sc1', platform: 'instagram', name: 'Instagram Reels', reach: '248K', engagement: 6.8, saves: '4.2K', followers: '+1,840', topPost: 'Behind the scenes: M3 chip teardown', sparkline: [180, 200, 220, 230, 240, 248, 260] },
  { id: 'sc2', platform: 'youtube', name: 'YouTube Shorts', reach: '184K', engagement: 4.2, saves: '1.8K', followers: '+920', topPost: '60-sec product demo', sparkline: [140, 150, 160, 170, 178, 184, 190] },
  { id: 'sc3', platform: 'tiktok', name: 'TikTok', reach: '420K', engagement: 8.4, saves: '8.6K', followers: '+3,200', topPost: 'Trending sound + product hook', sparkline: [320, 360, 380, 400, 410, 420, 440] },
  { id: 'sc4', platform: 'linkedin', name: 'LinkedIn Posts', reach: '48K', engagement: 3.8, saves: '680', followers: '+420', topPost: 'Industry report — Q2 benchmarks', sparkline: [38, 40, 42, 44, 46, 48, 50] },
  { id: 'sc5', platform: 'twitter', name: 'X/Twitter Threads', reach: '92K', engagement: 2.4, saves: '1.2K', followers: '+680', topPost: 'Thread: 10 growth tactics for SaaS', sparkline: [70, 78, 82, 86, 88, 92, 96] },
];

/* ---- Email Lifecycle ---- */
export type EmailFlow = {
  id: string;
  name: string;
  openRate: number;
  clickRate: number;
  sent: number;
  type: 'welcome' | 'winback' | 'newsletter' | 'launch';
};

export const emailFlows: EmailFlow[] = [
  { id: 'ef1', name: 'Welcome sequence', openRate: 48.2, clickRate: 9.1, sent: 8420, type: 'welcome' },
  { id: 'ef2', name: 'Win-back', openRate: 34.6, clickRate: 6.4, sent: 3280, type: 'winback' },
  { id: 'ef3', name: 'Newsletter', openRate: 41.8, clickRate: 7.8, sent: 42180, type: 'newsletter' },
  { id: 'ef4', name: 'Launch announcement', openRate: 39.2, clickRate: 8.2, sent: 38400, type: 'launch' },
];

export const emailStats = {
  subscribers: 42180,
  openRate: 38.4,
  clickRate: 7.2,
  unsubscribeRate: 0.18,
  deliveredRate: 99.4,
  attributedConversions: 386,
};

/* ---- Keyword Intelligence ---- */
export type Keyword = {
  id: string;
  keyword: string;
  volume: string;
  ctr: number;
  cpc: string;
  cpa: string;
  intent: 'Commercial' | 'Transactional' | 'Informational' | 'Navigational';
  trend: 'up' | 'down' | 'flat';
  landingPage: string;
};

export const keywords: Keyword[] = [
  { id: 'k1', keyword: 'macbook pro m3', volume: '74K', ctr: 4.8, cpc: '$1.84', cpa: '$24.20', intent: 'Commercial', trend: 'up', landingPage: '/products/macbook-pro' },
  { id: 'k2', keyword: 'wireless earbuds', volume: '248K', ctr: 3.2, cpc: '$1.24', cpa: '$18.40', intent: 'Commercial', trend: 'up', landingPage: '/collections/audio' },
  { id: 'k3', keyword: 'gaming laptop', volume: '182K', ctr: 2.8, cpc: '$2.12', cpa: '$28.60', intent: 'Commercial', trend: 'flat', landingPage: '/collections/laptops' },
  { id: 'k4', keyword: 'smartwatch series 9', volume: '92K', ctr: 4.2, cpc: '$1.68', cpa: '$22.80', intent: 'Transactional', trend: 'up', landingPage: '/products/watch' },
  { id: 'k5', keyword: '4k monitor', volume: '128K', ctr: 2.4, cpc: '$1.42', cpa: '$26.40', intent: 'Commercial', trend: 'down', landingPage: '/collections/monitors' },
  { id: 'k6', keyword: 'no-code dashboard', volume: '18K', ctr: 6.8, cpc: '$0.92', cpa: '$14.20', intent: 'Informational', trend: 'up', landingPage: '/blog/no-code-guide' },
  { id: 'k7', keyword: 'analytics template', volume: '12K', ctr: 5.4, cpc: '$1.08', cpa: '$16.80', intent: 'Informational', trend: 'up', landingPage: '/blog/analytics-setup' },
];
