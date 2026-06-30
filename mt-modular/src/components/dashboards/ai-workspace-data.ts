/* ========================================================================
   AI Workspace dashboard mock data — agents, prompts, models, tokens,
   automations, evals, and cost guardrails for an AI Operations console.
   ======================================================================== */

/* ============================================================
   Agent Operations Canvas — 6 connected agents
   ============================================================ */
export type AgentStatus = 'running' | 'idle' | 'queued' | 'error';

export type Agent = {
  id: string;
  name: string;
  shortName: string;
  status: AgentStatus;
  model: string;
  runsToday: number;
  avgLatency: string;
  successRate: number;
  tokensToday: string;
  owner: string;
  description: string;
  tools: string[];
  lastRun: string;
  // canvas coordinates (0-100 viewbox scale)
  x: number;
  y: number;
  color: string;
  accent: string;
  icon: 'research' | 'support' | 'review' | 'content' | 'analyst' | 'router';
};

export const agents: Agent[] = [
  {
    id: 'ag-router',
    name: 'Router Agent',
    shortName: 'Router',
    status: 'running',
    model: 'GPT-4o mini',
    runsToday: 1842,
    avgLatency: '0.3s',
    successRate: 99.6,
    tokensToday: '1.8M',
    owner: 'Darlene Robertson',
    description: 'Central dispatcher that routes incoming requests to the right specialist agent based on intent classification and model affinity.',
    tools: ['intent-classifier', 'model-router', 'cost-optimizer'],
    lastRun: '2s ago',
    x: 50,
    y: 18,
    color: '#465FFF',
    accent: 'rgba(70,95,255,0.16)',
    icon: 'router',
  },
  {
    id: 'ag-research',
    name: 'Research Agent',
    shortName: 'Research',
    status: 'running',
    model: 'GPT-4.1',
    runsToday: 624,
    avgLatency: '4.2s',
    successRate: 96.8,
    tokensToday: '3.4M',
    owner: 'Albert Flores',
    description: 'Crawls trusted web sources, summarizes findings, and returns citations. Currently researching competitor pricing and market signals.',
    tools: ['web-search', 'citation-finder', 'summarizer'],
    lastRun: '14s ago',
    x: 18,
    y: 48,
    color: '#12B76A',
    accent: 'rgba(18,183,106,0.16)',
    icon: 'research',
  },
  {
    id: 'ag-support',
    name: 'Support Agent',
    shortName: 'Support',
    status: 'running',
    model: 'Claude 3.7',
    runsToday: 1284,
    avgLatency: '1.4s',
    successRate: 98.4,
    tokensToday: '2.1M',
    owner: 'Jane Cooper',
    description: 'Drafts support replies from KB articles, escalates sensitive tickets, and routes product bugs to engineering. Handles inbox triage.',
    tools: ['kb-search', 'ticket-router', 'sentiment'],
    lastRun: '4s ago',
    x: 82,
    y: 48,
    color: '#F79009',
    accent: 'rgba(247,144,9,0.16)',
    icon: 'support',
  },
  {
    id: 'ag-analyst',
    name: 'Data Analyst Agent',
    shortName: 'Data Analyst',
    status: 'idle',
    model: 'Gemini 2.5 Pro',
    runsToday: 184,
    avgLatency: '3.6s',
    successRate: 94.2,
    tokensToday: '0.9M',
    owner: 'Devon Lane',
    description: 'Translates natural-language questions into SQL, runs them against the warehouse, and produces chart-ready summaries.',
    tools: ['sql-generator', 'warehouse-runner', 'chart-builder'],
    lastRun: '6m ago',
    x: 18,
    y: 82,
    color: '#0BA5EC',
    accent: 'rgba(11,165,236,0.16)',
    icon: 'analyst',
  },
  {
    id: 'ag-content',
    name: 'Content Agent',
    shortName: 'Content',
    status: 'queued',
    model: 'GPT-4.1',
    runsToday: 312,
    avgLatency: '5.8s',
    successRate: 92.6,
    tokensToday: '2.6M',
    owner: 'Kristin Watson',
    description: 'Generates SEO outlines, blog drafts, and product changelog entries. Waits in queue for the next editor review slot.',
    tools: ['outline-builder', 'draft-writer', 'seo-checker'],
    lastRun: '3m ago',
    x: 50,
    y: 82,
    color: '#7A5AF8',
    accent: 'rgba(122,90,248,0.16)',
    icon: 'content',
  },
  {
    id: 'ag-review',
    name: 'Code Review Agent',
    shortName: 'Code Review',
    status: 'error',
    model: 'xAI Grok',
    runsToday: 96,
    avgLatency: '8.4s',
    successRate: 88.1,
    tokensToday: '1.7M',
    owner: 'Martin K.',
    description: 'Reviews pull requests for security, style, and logic. Currently blocked — JSON schema validation failed on 3 of the last 8 runs.',
    tools: ['pr-fetcher', 'lint-runner', 'schema-validator'],
    lastRun: '11m ago',
    x: 82,
    y: 82,
    color: '#F04438',
    accent: 'rgba(240,68,56,0.16)',
    icon: 'review',
  },
];

/* Connections: from → to (referenced by agent id) */
export type AgentConnection = { from: string; to: string; label?: string };

export const agentConnections: AgentConnection[] = [
  { from: 'ag-router', to: 'ag-research', label: 'research intent' },
  { from: 'ag-router', to: 'ag-support', label: 'support intent' },
  { from: 'ag-research', to: 'ag-analyst', label: 'data enrichment' },
  { from: 'ag-content', to: 'ag-review', label: 'draft review' },
];

/* ============================================================
   Token Usage — totals + per model breakdown
   ============================================================ */
export type TokenModel = {
  name: string;
  provider: 'OpenAI' | 'Google' | 'xAI' | 'Anthropic';
  tokens: number; // in millions
  share: number; // percentage
  cost: number;
  color: string;
  inputTokens: number; // in millions
  outputTokens: number; // in millions
};

export const tokenUsage = {
  total: 13.5, // millions
  input: 8.2,
  output: 5.3,
  cost: 428.6,
  costChange: 12.4,
  costChangeDir: 'up' as 'up' | 'down',
  byModel: [
    { name: 'GPT', provider: 'OpenAI' as const, tokens: 7.2, share: 53.3, cost: 248.4, color: '#10A37F', inputTokens: 4.4, outputTokens: 2.8 },
    { name: 'Gemini', provider: 'Google' as const, tokens: 3.4, share: 25.2, cost: 86.8, color: '#4285F4', inputTokens: 2.1, outputTokens: 1.3 },
    { name: 'xAI', provider: 'xAI' as const, tokens: 1.8, share: 13.3, cost: 54.2, color: '#0F172A', inputTokens: 1.1, outputTokens: 0.7 },
    { name: 'Claude', provider: 'Anthropic' as const, tokens: 1.1, share: 8.2, cost: 39.2, color: '#D97757', inputTokens: 0.6, outputTokens: 0.5 },
  ] as TokenModel[],
};

/* ============================================================
   API Health — compact status grid
   ============================================================ */
export const apiHealth = {
  successRate: 99.2,
  p95Latency: '1.8s',
  p95LatencyMs: 1800,
  errorRate: 0.8,
  rateLimitHits: 42,
  uptime: '99.98%',
  requestsPerMin: 1284,
  status: 'operational' as 'operational' | 'degraded' | 'outage',
  // sparkline of last 12 intervals (requests/min)
  sparkline: [1180, 1220, 1240, 1180, 1280, 1260, 1284, 1300, 1280, 1240, 1284, 1284],
  recentIncidents: [
    { time: '14:22', detail: 'Rate limit on Gemini endpoint (3 retries, recovered)', severity: 'warning' as const },
    { time: '11:08', detail: 'xAI Grok P95 spike to 4.2s — auto-routed to Claude', severity: 'warning' as const },
    { time: '08:42', detail: 'All systems operational', severity: 'info' as const },
  ],
};

/* ============================================================
   Model Performance Matrix
   ============================================================ */
export type ModelPerfMetric = {
  // 0-100 normalized score for color coding
  quality: number;
  latency: number; // ms
  costPer1K: number; // USD
  toolSuccess: number; // percentage
  contextLength: number; // tokens (thousands)
};

export type ModelPerf = {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Google' | 'xAI' | 'Anthropic';
  logoColor: string;
  metrics: ModelPerfMetric;
  // raw display values
  display: {
    quality: string;
    latency: string;
    costPer1K: string;
    toolSuccess: string;
    contextLength: string;
  };
  trend: 'up' | 'down' | 'flat';
  status: 'production' | 'beta' | 'deprecated';
  share: number;
  description: string;
};

export const modelPerformance: ModelPerf[] = [
  {
    id: 'mp-gpt41',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    logoColor: '#10A37F',
    metrics: { quality: 94, latency: 2400, costPer1K: 0.005, toolSuccess: 92.4, contextLength: 1000 },
    display: { quality: '94 / 100', latency: '2.4s', costPer1K: '$0.005', toolSuccess: '92.4%', contextLength: '1M tokens' },
    trend: 'up',
    status: 'production',
    share: 38,
    description: 'Frontier model used for research, content drafting, and complex reasoning. Highest quality at moderate latency.',
  },
  {
    id: 'mp-gpt4omini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    logoColor: '#10A37F',
    metrics: { quality: 82, latency: 800, costPer1K: 0.0006, toolSuccess: 96.8, contextLength: 128 },
    display: { quality: '82 / 100', latency: '0.8s', costPer1K: '$0.0006', toolSuccess: '96.8%', contextLength: '128K tokens' },
    trend: 'up',
    status: 'production',
    share: 28,
    description: 'Default router model. Lowest cost-per-1K, fastest latency. Used for classification and short responses.',
  },
  {
    id: 'mp-gemini',
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    logoColor: '#4285F4',
    metrics: { quality: 91, latency: 3200, costPer1K: 0.0035, toolSuccess: 89.6, contextLength: 2000 },
    display: { quality: '91 / 100', latency: '3.2s', costPer1K: '$0.0035', toolSuccess: '89.6%', contextLength: '2M tokens' },
    trend: 'flat',
    status: 'production',
    share: 18,
    description: 'Long-context workhorse for data analyst agent and large-document summarization. 2M context window.',
  },
  {
    id: 'mp-claude',
    name: 'Claude 3.7',
    provider: 'Anthropic',
    logoColor: '#D97757',
    metrics: { quality: 93, latency: 2100, costPer1K: 0.0048, toolSuccess: 90.2, contextLength: 500 },
    display: { quality: '93 / 100', latency: '2.1s', costPer1K: '$0.0048', toolSuccess: '90.2%', contextLength: '500K tokens' },
    trend: 'up',
    status: 'production',
    share: 12,
    description: 'Default for support agent. Strong at conversational tone, JSON adherence, and policy-aware replies.',
  },
  {
    id: 'mp-grok',
    name: 'xAI Grok',
    provider: 'xAI',
    logoColor: '#0F172A',
    metrics: { quality: 78, latency: 4800, costPer1K: 0.0072, toolSuccess: 82.4, contextLength: 256 },
    display: { quality: '78 / 100', latency: '4.8s', costPer1K: '$0.0072', toolSuccess: '82.4%', contextLength: '256K tokens' },
    trend: 'down',
    status: 'beta',
    share: 4,
    description: 'Experimental model used for code review. Higher error rate on schema validation — under evaluation.',
  },
];

/* ============================================================
   Prompt Run Stream — live event stream
   ============================================================ */
export type PromptRunStatus = 'success' | 'failed' | 'review' | 'retry' | 'running';

export type PromptRun = {
  id: string;
  title: string;
  agent: string;
  model: string;
  status: PromptRunStatus;
  latency: string;
  tokens: string;
  tokensNum: number;
  time: string;
  type: 'summarization' | 'review' | 'research' | 'rewrite' | 'sql' | 'support';
  promptPreview: string;
  outputSummary: string;
  // optional flags
  retryQueued?: boolean;
  sources?: number;
  variants?: number;
};

export const promptRuns: PromptRun[] = [
  {
    id: 'pr-2842',
    title: 'Support summarization completed',
    agent: 'Support Agent',
    model: 'Claude 3.7',
    status: 'success',
    latency: '1.2s',
    tokens: '4.2K',
    tokensNum: 4200,
    time: '32s ago',
    type: 'summarization',
    promptPreview: 'Summarize this customer thread and suggest a reply. Customer reports that webhook retries are failing with 502...',
    outputSummary: 'Drafted a 3-paragraph reply citing the webhook retry docs, proposed an exponential backoff, and escalated to engineering for the 502.',
  },
  {
    id: 'pr-2841',
    title: 'Code review failed schema validation',
    agent: 'Code Review Agent',
    model: 'xAI Grok',
    status: 'failed',
    latency: '2.8s',
    tokens: '6.8K',
    tokensNum: 6800,
    time: '1m ago',
    type: 'review',
    promptPreview: 'Review this PR for security, style, and JSON schema conformance. Files changed: api/webhook.ts, lib/retry.ts...',
    outputSummary: 'Run aborted: model returned a review object missing the required "severity" field. Retry queued with stricter system prompt.',
    retryQueued: true,
  },
  {
    id: 'pr-2840',
    title: 'Research agent cited 8 sources',
    agent: 'Research Agent',
    model: 'GPT-4.1',
    status: 'success',
    latency: '5.4s',
    tokens: '8.4K',
    tokensNum: 8400,
    time: '3m ago',
    type: 'research',
    promptPreview: 'Compare our pricing against the top 5 competitors in the analytics space. Include source links.',
    outputSummary: 'Produced a comparison table with 8 cited sources covering monthly pricing, seat limits, and overage rates.',
    sources: 8,
  },
  {
    id: 'pr-2839',
    title: 'Content rewrite generated 3 variants',
    agent: 'Content Agent',
    model: 'GPT-4.1',
    status: 'success',
    latency: '2.1s',
    tokens: '3.6K',
    tokensNum: 3600,
    time: '5m ago',
    type: 'rewrite',
    promptPreview: 'Rewrite this landing page hero in 3 variants: punchy, story-led, and feature-led. Keep CTA consistent.',
    outputSummary: 'Generated 3 hero variants each 60-90 words, all including the "Start free trial" CTA. Variants sent to editor queue.',
    variants: 3,
  },
  {
    id: 'pr-2838',
    title: 'Data analyst created SQL query',
    agent: 'Data Analyst Agent',
    model: 'Gemini 2.5 Pro',
    status: 'review',
    latency: '3.6s',
    tokens: '5.2K',
    tokensNum: 5200,
    time: '8m ago',
    type: 'sql',
    promptPreview: 'Show me weekly active users broken down by plan, last 8 weeks, excluding internal accounts.',
    outputSummary: 'Generated a 24-line SQL query against events.user_active. Flagged for human review — uses a window function on a partition key.',
  },
  {
    id: 'pr-2837',
    title: 'Router classified 1,284 intents',
    agent: 'Router Agent',
    model: 'GPT-4o mini',
    status: 'success',
    latency: '0.3s',
    tokens: '2.1K',
    tokensNum: 2100,
    time: '11m ago',
    type: 'support',
    promptPreview: 'Classify each incoming request into research | support | code-review | content | analyst...',
    outputSummary: 'Classified 1,284 messages: 612 support, 284 research, 184 content, 96 review, 108 analyst. Routed with 99.6% confidence.',
  },
  {
    id: 'pr-2836',
    title: 'Support draft pending review',
    agent: 'Support Agent',
    model: 'Claude 3.7',
    status: 'review',
    latency: '1.8s',
    tokens: '3.4K',
    tokensNum: 3400,
    time: '14m ago',
    type: 'support',
    promptPreview: 'Draft a reply to this customer asking for an SLA credit. Tone: empathetic, formal, no commitments...',
    outputSummary: 'Drafted a 180-word reply acknowledging the delay, citing the published 99.9% uptime SLA, and offering a 5% service credit.',
  },
];

/* ============================================================
   Eval Results — scorecard grid
   ============================================================ */
export type EvalResult = {
  id: string;
  task: string;
  passRate: number;
  prevPassRate: number;
  regressions: number;
  lastRun: string;
  trend: 'up' | 'down' | 'flat';
  failingExamples: string[];
  category: 'quality' | 'accuracy' | 'schema' | 'code' | 'safety' | 'sla';
  target: number;
};

export const evalResults: EvalResult[] = [
  {
    id: 'ev-1',
    task: 'Support answer quality',
    passRate: 94.2,
    prevPassRate: 92.8,
    regressions: 2,
    lastRun: '12m ago',
    trend: 'up',
    failingExamples: [
      'Ticket #4821 — missed compensation clause',
      'Ticket #4818 — tone flagged as dismissive',
    ],
    category: 'quality',
    target: 90,
  },
  {
    id: 'ev-2',
    task: 'Citation accuracy',
    passRate: 88.6,
    prevPassRate: 91.2,
    regressions: 4,
    lastRun: '34m ago',
    trend: 'down',
    failingExamples: [
      'Run #2840 — citation #3 returns 404',
      'Run #2838 — source does not support the claim',
      'Run #2836 — outdated pricing',
      'Run #2834 — misattributed quote',
    ],
    category: 'accuracy',
    target: 90,
  },
  {
    id: 'ev-3',
    task: 'JSON schema validity',
    passRate: 96.4,
    prevPassRate: 95.8,
    regressions: 1,
    lastRun: '1h ago',
    trend: 'up',
    failingExamples: ['Run #2841 — missing required "severity" field'],
    category: 'schema',
    target: 95,
  },
  {
    id: 'ev-4',
    task: 'Code patch success',
    passRate: 82.1,
    prevPassRate: 84.4,
    regressions: 3,
    lastRun: '2h ago',
    trend: 'down',
    failingExamples: [
      'PR #1182 — patch broke tests',
      'PR #1179 — introduced a SQL injection',
      'PR #1175 — did not handle null case',
    ],
    category: 'code',
    target: 85,
  },
  {
    id: 'ev-5',
    task: 'Safety compliance',
    passRate: 99.8,
    prevPassRate: 99.8,
    regressions: 0,
    lastRun: '4h ago',
    trend: 'flat',
    failingExamples: [],
    category: 'safety',
    target: 99,
  },
  {
    id: 'ev-6',
    task: 'Latency SLA',
    passRate: 91.4,
    prevPassRate: 89.2,
    regressions: 2,
    lastRun: '20m ago',
    trend: 'up',
    failingExamples: [
      'xAI Grok P95 4.8s > 3s SLA',
      'Gemini P95 3.2s > 3s SLA',
    ],
    category: 'sla',
    target: 95,
  },
];

/* ============================================================
   Automation Queue — board with 5 columns
   ============================================================ */
export type QueueKey = 'scheduled' | 'running' | 'review' | 'failed' | 'completed';

export type AutomationTask = {
  id: string;
  title: string;
  queue: QueueKey;
  agent: string;
  schedule?: string;
  owner: string;
  priority: 'low' | 'medium' | 'high';
  lastRun?: string;
  nextRun?: string;
  detail: string;
  progress?: number;
};

export const queueColumns: { key: QueueKey; name: string; color: string; accent: string }[] = [
  { key: 'scheduled', name: 'Scheduled', color: '#0BA5EC', accent: 'rgba(11,165,236,0.16)' },
  { key: 'running', name: 'Running', color: '#465FFF', accent: 'rgba(70,95,255,0.16)' },
  { key: 'review', name: 'Needs review', color: '#F79009', accent: 'rgba(247,144,9,0.16)' },
  { key: 'failed', name: 'Failed', color: '#F04438', accent: 'rgba(240,68,56,0.16)' },
  { key: 'completed', name: 'Completed', color: '#12B76A', accent: 'rgba(18,183,106,0.16)' },
];

export const automationTasks: AutomationTask[] = [
  // Scheduled
  { id: 'at-1', title: 'Daily market summary', queue: 'scheduled', agent: 'Research Agent', schedule: '07:00 daily', owner: 'Albert Flores', priority: 'medium', nextRun: 'Tomorrow 07:00', detail: 'Pull overnight market signals, competitor news, and produce a 5-bullet summary delivered to the #market Slack channel.' },
  { id: 'at-2', title: 'CRM lead enrichment', queue: 'scheduled', agent: 'Data Analyst Agent', schedule: 'Mon 09:00', owner: 'Devon Lane', priority: 'high', nextRun: 'Mon 09:00', detail: 'Enrich new leads from last week with firmographics, LinkedIn URLs, and an intent score.' },
  { id: 'at-3', title: 'Product changelog draft', queue: 'scheduled', agent: 'Content Agent', schedule: 'Fri 16:00', owner: 'Kristin Watson', priority: 'low', nextRun: 'Fri 16:00', detail: 'Draft a public changelog entry from merged PRs since the last release.' },
  // Running
  { id: 'at-4', title: 'Support inbox triage', queue: 'running', agent: 'Support Agent', owner: 'Jane Cooper', priority: 'high', lastRun: 'Running now', progress: 62, detail: 'Triage 184 open support tickets: classify, draft replies, escalate sensitive ones.' },
  { id: 'at-5', title: 'Invoice classification', queue: 'running', agent: 'Data Analyst Agent', owner: 'Devon Lane', priority: 'medium', lastRun: 'Running now', progress: 28, detail: 'Classify 1,240 invoices into categories: software, hardware, services, travel.' },
  // Needs review
  { id: 'at-6', title: 'SEO outline generator', queue: 'review', agent: 'Content Agent', owner: 'Kristin Watson', priority: 'medium', lastRun: '20m ago', detail: 'Generated 4 SEO outlines — 1 needs an editor check for tone before publishing.' },
  { id: 'at-7', title: 'SQL insight analyst', queue: 'review', agent: 'Data Analyst Agent', owner: 'Devon Lane', priority: 'high', lastRun: '8m ago', detail: 'Generated a SQL query with a window function — human review required before warehouse execution.' },
  // Failed
  { id: 'at-8', title: 'Code review batch', queue: 'failed', agent: 'Code Review Agent', owner: 'Martin K.', priority: 'high', lastRun: '11m ago', detail: '3 of 8 PRs failed JSON schema validation. Retry queued with stricter system prompt.' },
  { id: 'at-9', title: 'Research competitor pricing', queue: 'failed', agent: 'Research Agent', owner: 'Albert Flores', priority: 'medium', lastRun: '1h ago', detail: 'Citation #3 returned 404. Run aborted. Source needs replacement.' },
  // Completed
  { id: 'at-10', title: 'Support summarization', queue: 'completed', agent: 'Support Agent', owner: 'Jane Cooper', priority: 'medium', lastRun: '32m ago', detail: 'Summarized 24 support threads. Drafts delivered to inbox for review.' },
  { id: 'at-11', title: 'Content rewrite batch', queue: 'completed', agent: 'Content Agent', owner: 'Kristin Watson', priority: 'low', lastRun: '5m ago', detail: 'Generated 3 hero variants. Sent to editor queue.' },
];

/* ============================================================
   Cost Guardrails
   ============================================================ */
export const costGuardrails = {
  budget: 1200,
  spent: 428.6,
  forecast: 1086,
  alertThreshold: 85, // percentage
  daysElapsed: 18,
  daysInMonth: 30,
  // cost per model this month
  byModel: [
    { name: 'GPT-4.1', provider: 'OpenAI', cost: 248.4, color: '#10A37F', share: 57.9 },
    { name: 'Gemini 2.5 Pro', provider: 'Google', cost: 86.8, color: '#4285F4', share: 20.2 },
    { name: 'xAI Grok', provider: 'xAI', cost: 54.2, color: '#0F172A', share: 12.6 },
    { name: 'Claude 3.7', provider: 'Anthropic', cost: 39.2, color: '#D97757', share: 9.1 },
  ],
  // projected monthly burn rate per day (for hover projection)
  projectedSpend: 1086,
  projectedDate: 'Jun 30, 2026',
  alertTriggered: false, // 35.7% spent, below 85%
};

/* ============================================================
   Prompt Library
   ============================================================ */
export type Prompt = {
  id: string;
  name: string;
  version: string;
  lastRun: string;
  successRate: number;
  owner: string;
  tags: string[];
  category: 'support' | 'seo' | 'sql' | 'code' | 'notes';
  description: string;
  runs: number;
};

export const promptLibrary: Prompt[] = [
  {
    id: 'pl-1',
    name: 'Support Answer Builder',
    version: 'v2.4.1',
    lastRun: '32s ago',
    successRate: 94.2,
    owner: 'Jane Cooper',
    tags: ['support', 'claude-3.7', 'tone-aware'],
    category: 'support',
    description: 'Drafts a customer reply from KB articles, applies an empathetic tone, and proposes a resolution path.',
    runs: 1284,
  },
  {
    id: 'pl-2',
    name: 'SEO Outline Generator',
    version: 'v1.8.0',
    lastRun: '20m ago',
    successRate: 91.6,
    owner: 'Kristin Watson',
    tags: ['content', 'gpt-4.1', 'seo'],
    category: 'seo',
    description: 'Produces a search-optimized blog outline with H2/H3 structure, target keywords, and internal links.',
    runs: 312,
  },
  {
    id: 'pl-3',
    name: 'SQL Insight Analyst',
    version: 'v3.1.2',
    lastRun: '8m ago',
    successRate: 88.4,
    owner: 'Devon Lane',
    tags: ['analyst', 'gemini-2.5', 'warehouse'],
    category: 'sql',
    description: 'Translates a natural-language question into a SQL query, runs it against the warehouse, and summarizes results.',
    runs: 184,
  },
  {
    id: 'pl-4',
    name: 'Code Review Checklist',
    version: 'v1.2.0',
    lastRun: '11m ago',
    successRate: 82.1,
    owner: 'Martin K.',
    tags: ['code-review', 'grok', 'security'],
    category: 'code',
    description: 'Reviews a PR against security, style, and correctness checklists. Outputs a structured JSON review object.',
    runs: 96,
  },
  {
    id: 'pl-5',
    name: 'Meeting Notes Summarizer',
    version: 'v2.0.3',
    lastRun: '1h ago',
    successRate: 96.8,
    owner: 'Darlene Robertson',
    tags: ['notes', 'gpt-4o-mini', 'summarization'],
    category: 'notes',
    description: 'Summarizes a transcript into decisions, action items, and open questions. Routes action items to owners.',
    runs: 642,
  },
];

/* ============================================================
   New Agent drawer — selectable options
   ============================================================ */
export const agentModels = [
  'GPT-4.1',
  'GPT-4o mini',
  'Gemini 2.5 Pro',
  'Claude 3.7',
  'xAI Grok',
];

export const agentTools = [
  'web-search',
  'kb-search',
  'sql-generator',
  'warehouse-runner',
  'citation-finder',
  'summarizer',
  'sentiment',
  'ticket-router',
  'outline-builder',
  'draft-writer',
  'seo-checker',
  'pr-fetcher',
  'lint-runner',
  'schema-validator',
  'chart-builder',
];

export const agentSchedules = [
  'On demand',
  'Every 15 minutes',
  'Hourly',
  'Daily at 09:00',
  'Weekdays 09:00',
  'Weekly Monday 09:00',
];

export const agentOwners = [
  'Darlene Robertson',
  'Kristin Watson',
  'Albert Flores',
  'Jane Cooper',
  'Devon Lane',
  'Martin K.',
];

/* ============================================================
   Workspace + filter presets
   ============================================================ */
export const workspaces = [
  { id: 'ws-prod', name: 'Production', detail: 'Live customer-facing agents', color: '#12B76A' },
  { id: 'ws-staging', name: 'Staging', detail: 'Pre-release agent testing', color: '#F79009' },
  { id: 'ws-research', name: 'Research lab', detail: 'Experimental models & evals', color: '#7A5AF8' },
];

export const modelFilters = [
  { id: 'all', name: 'All models' },
  { id: 'openai', name: 'OpenAI', detail: 'GPT-4.1, GPT-4o mini' },
  { id: 'google', name: 'Google', detail: 'Gemini 2.5 Pro' },
  { id: 'anthropic', name: 'Anthropic', detail: 'Claude 3.7' },
  { id: 'xai', name: 'xAI', detail: 'Grok' },
];

export const datePresets = [
  { key: 'today', label: 'Today', range: 'Jun 23, 2026' },
  { key: '7d', label: 'Last 7 days', range: 'Jun 17 – Jun 23, 2026' },
  { key: '30d', label: 'Last 30 days', range: 'May 24 – Jun 23, 2026' },
  { key: '90d', label: 'Last 90 days', range: 'Mar 25 – Jun 23, 2026' },
];
