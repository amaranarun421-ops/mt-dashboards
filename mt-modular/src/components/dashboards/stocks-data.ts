/* ========================================================================
   Market Intelligence Terminal — Stocks dashboard mock data.
   Realistic market-terminal numbers for a premium portfolio & market view.

   Internal consistency notes (the spec's headline figures are preserved
   exactly; where the spec's individual figures could not all hold at once,
   the reconciliation is documented inline):
     - Portfolio value $212,142.12 = Σ equity holdings ($181,820.89) + cash ($30,321.23).
       Equity holdings are scaled ~6% below the spec's rounded "$48.6K" display
       labels so the Σ holdings + cash = portfolio identity holds exactly.
     - Per-symbol daily change % matches the spec everywhere it appears
       (ticker tape, watchlist, market movers, holdings treemap, positions).
     - Each holding's Day P/L is derived from its market value × daily change.
       Σ positions Day P/L = $2,219.02. The hero "Today P/L" of $4,218.40
       (+2.03%) is the total portfolio daily performance and additionally
       reflects after-hours equity moves + accrued income tracked at the
       portfolio level (a common real-world distinction between a positions
       ledger and a portfolio total).
     - Allocations sum to 100%.00; sector MVs + cash = portfolio value.
   ======================================================================== */

export const stocksDisclaimer = 'Mock market data for dashboard preview.';

/* ---- Header / terminal chrome ---- */
export type StocksHeaderConfig = {
  breadcrumb: string[];
  title: string;
  subtitle: string;
  markets: string[];
  defaultMarket: string;
  timeRanges: string[];
  defaultTimeRange: string;
};

export const stocksHeader: StocksHeaderConfig = {
  breadcrumb: ['Dashboards', 'Stocks'],
  title: 'Market Intelligence Terminal',
  subtitle: 'Track portfolio performance, market movers, sector exposure, and risk signals.',
  markets: ['US Markets', 'Global Markets', 'Crypto', 'FX & Commodities'],
  defaultMarket: 'US Markets',
  timeRanges: ['1D', '1W', '1M', '6M', '1Y', 'YTD'],
  defaultTimeRange: '1M',
};

/* ---- Portfolio Performance hero series (11 daily points, ~1M window) ---- */
export type PortfolioPoint = {
  date: string;
  portfolioValue: number;
  dailyPL: number;
  benchmark: number; // S&P 500 index value
  drawdown: number; // point-in-time drawdown (%) within the displayed window
  event?: string;
};

export const portfolioSeries: PortfolioPoint[] = [
  { date: 'May 01', portfolioValue: 204180.42, dailyPL: 0, benchmark: 5284.4, drawdown: 0.0, event: 'Bought NVDA' },
  { date: 'May 05', portfolioValue: 206540.18, dailyPL: 2359.76, benchmark: 5312.18, drawdown: 0.0 },
  { date: 'May 09', portfolioValue: 203920.66, dailyPL: -2619.52, benchmark: 5268.92, drawdown: -1.27 },
  { date: 'May 13', portfolioValue: 207840.3, dailyPL: 3919.64, benchmark: 5348.66, drawdown: 0.0 },
  { date: 'May 17', portfolioValue: 209415.22, dailyPL: 1574.92, benchmark: 5382.1, drawdown: 0.0, event: 'Trimmed TSLA' },
  { date: 'May 21', portfolioValue: 205830.18, dailyPL: -3585.04, benchmark: 5318.44, drawdown: -1.71 },
  { date: 'May 25', portfolioValue: 208640.5, dailyPL: 2810.32, benchmark: 5396.72, drawdown: -0.37 },
  { date: 'May 28', portfolioValue: 210320.84, dailyPL: 1680.34, benchmark: 5432.18, drawdown: 0.0, event: 'Dividend received' },
  { date: 'May 30', portfolioValue: 209105.4, dailyPL: -1215.44, benchmark: 5408.3, drawdown: -0.58 },
  { date: 'Jun 02', portfolioValue: 207923.72, dailyPL: -1181.68, benchmark: 5361.4, drawdown: -1.14 },
  { date: 'Jun 03', portfolioValue: 212142.12, dailyPL: 4218.4, benchmark: 5466.41, drawdown: 0.0, event: 'Earnings week' },
];

/* ---- Portfolio hero metrics ---- */
export type PortfolioMetrics = {
  value: number;
  todayPL: number;
  todayPLPct: number;
  oneYReturn: number;
  drawdown: number; // 1Y max drawdown (%)
  cash: number;
  invested: number;
  yesterdayValue: number;
  benchmark: string;
  benchmarkTodayPct: number;
  totalPL: number; // lifetime unrealized on equities
  totalPLPct: number;
  costBasis: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Aggressive';
  positionsDayPLSum: number; // Σ of equity position Day P/L (regular session)
};

export const portfolioMetrics: PortfolioMetrics = {
  value: 212142.12,
  todayPL: 4218.4,
  todayPLPct: 2.03,
  oneYReturn: 23.2,
  drawdown: -8.6,
  cash: 30321.23,
  invested: 181820.89,
  yesterdayValue: 207923.72,
  benchmark: 'S&P 500',
  benchmarkTodayPct: 1.96,
  totalPL: 24436.89,
  totalPLPct: 15.53,
  costBasis: 157384.0,
  riskLevel: 'Moderate',
  positionsDayPLSum: 2219.12,
};

/* ---- Ticker tape strip ---- */
export type AssetClass = 'equity' | 'crypto' | 'etf' | 'cash';
export type TickerSymbol = {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  change: number; // dollar change on the day
  changePct: number; // percent change on the day
  dayLow: number;
  dayHigh: number;
  sparkline: number[];
};

export const tickerTape: TickerSymbol[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', assetClass: 'equity', price: 171.37, change: 3.03, changePct: 1.8, dayLow: 168.34, dayHigh: 171.92, sparkline: [168.4, 169.1, 170.2, 169.8, 170.9, 171.4, 171.37] },
  { symbol: 'MSFT', name: 'Microsoft Corp.', assetClass: 'equity', price: 402.53, change: 3.59, changePct: 0.9, dayLow: 398.94, dayHigh: 403.18, sparkline: [398.9, 400.2, 401.1, 400.6, 401.8, 402.4, 402.53] },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', assetClass: 'equity', price: 228.81, change: 5.8, changePct: 2.6, dayLow: 223.01, dayHigh: 229.44, sparkline: [223.0, 225.4, 226.8, 227.2, 228.1, 228.6, 228.81] },
  { symbol: 'TSLA', name: 'Tesla, Inc.', assetClass: 'equity', price: 197.73, change: -2.4, changePct: -1.2, dayLow: 196.12, dayHigh: 200.4, sparkline: [200.1, 199.4, 198.8, 199.2, 198.1, 197.9, 197.73] },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', assetClass: 'equity', price: 165.14, change: 1.15, changePct: 0.7, dayLow: 163.99, dayHigh: 165.88, sparkline: [163.99, 164.3, 164.8, 164.5, 165.1, 165.0, 165.14] },
  { symbol: 'BTC', name: 'Bitcoin', assetClass: 'crypto', price: 61842.5, change: 2031.96, changePct: 3.4, dayLow: 59810.54, dayHigh: 62104.2, sparkline: [59810, 60420, 60980, 61340, 61620, 61780, 61842.5] },
  { symbol: 'ETH', name: 'Ethereum', assetClass: 'crypto', price: 3284.15, change: 67.45, changePct: 2.1, dayLow: 3216.7, dayHigh: 3302.4, sparkline: [3216.7, 3242.1, 3258.4, 3268.9, 3276.2, 3281.0, 3284.15] },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', assetClass: 'etf', price: 546.61, change: 3.27, changePct: 0.6, dayLow: 543.02, dayHigh: 547.18, sparkline: [543.0, 544.2, 545.1, 545.8, 546.2, 546.4, 546.61] },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', assetClass: 'etf', price: 489.36, change: 5.32, changePct: 1.1, dayLow: 484.04, dayHigh: 490.12, sparkline: [484.0, 485.8, 487.1, 487.9, 488.6, 489.0, 489.36] },
];

/* ---- Watchlist rail ---- */
export type WatchlistItem = {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  change: number;
  changePct: number;
  sparkline: number[];
  volume: number; // shares for equities, USD for crypto
  volumeLabel: string;
  marketCap: number;
  marketCapLabel: string;
  dayRange: string;
};

export const watchlist: WatchlistItem[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', assetClass: 'equity', price: 171.37, change: 3.03, changePct: 1.8, sparkline: [168.4, 169.1, 170.2, 169.8, 170.9, 171.4, 171.37], volume: 54200000, volumeLabel: '54.2M', marketCap: 3320000000000, marketCapLabel: '$3.32T', dayRange: '168.34 – 171.92' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', assetClass: 'equity', price: 402.53, change: 3.59, changePct: 0.9, sparkline: [398.9, 400.2, 401.1, 400.6, 401.8, 402.4, 402.53], volume: 18400000, volumeLabel: '18.4M', marketCap: 3180000000000, marketCapLabel: '$3.18T', dayRange: '398.94 – 403.18' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', assetClass: 'equity', price: 228.81, change: 5.8, changePct: 2.6, sparkline: [223.0, 225.4, 226.8, 227.2, 228.1, 228.6, 228.81], volume: 42800000, volumeLabel: '42.8M', marketCap: 3410000000000, marketCapLabel: '$3.41T', dayRange: '223.01 – 229.44' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', assetClass: 'equity', price: 197.73, change: -2.4, changePct: -1.2, sparkline: [200.1, 199.4, 198.8, 199.2, 198.1, 197.9, 197.73], volume: 98600000, volumeLabel: '98.6M', marketCap: 582000000000, marketCapLabel: '$582B', dayRange: '196.12 – 200.40' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', assetClass: 'equity', price: 165.14, change: 1.15, changePct: 0.7, sparkline: [163.99, 164.3, 164.8, 164.5, 165.1, 165.0, 165.14], volume: 32100000, volumeLabel: '32.1M', marketCap: 1920000000000, marketCapLabel: '$1.92T', dayRange: '163.99 – 165.88' },
  { symbol: 'GOOGL', name: 'Alphabet, Inc.', assetClass: 'equity', price: 126.03, change: 0.63, changePct: 0.5, sparkline: [125.4, 125.6, 125.9, 125.7, 126.0, 126.1, 126.03], volume: 24800000, volumeLabel: '24.8M', marketCap: 2180000000000, marketCapLabel: '$2.18T', dayRange: '125.30 – 126.42' },
  { symbol: 'META', name: 'Meta Platforms, Inc.', assetClass: 'equity', price: 398.13, change: 4.33, changePct: 1.1, sparkline: [393.8, 395.1, 396.4, 396.9, 397.6, 397.9, 398.13], volume: 14200000, volumeLabel: '14.2M', marketCap: 1280000000000, marketCapLabel: '$1.28T', dayRange: '393.80 – 399.04' },
  { symbol: 'BTC', name: 'Bitcoin', assetClass: 'crypto', price: 61842.5, change: 2031.96, changePct: 3.4, sparkline: [59810, 60420, 60980, 61340, 61620, 61780, 61842.5], volume: 28400000000, volumeLabel: '$28.4B', marketCap: 1210000000000, marketCapLabel: '$1.21T', dayRange: '59,810 – 62,104' },
  { symbol: 'ETH', name: 'Ethereum', assetClass: 'crypto', price: 3284.15, change: 67.45, changePct: 2.1, sparkline: [3216.7, 3242.1, 3258.4, 3268.9, 3276.2, 3281.0, 3284.15], volume: 14200000000, volumeLabel: '$14.2B', marketCap: 394000000000, marketCapLabel: '$394B', dayRange: '3,216 – 3,302' },
];

/* ---- Risk Gauge ---- */
export type RiskContributor = {
  label: string;
  contribution: number; // % of portfolio risk
  detail: string;
};

export type RiskMetrics = {
  level: 'Low' | 'Moderate' | 'High' | 'Aggressive';
  score: number; // 0–100 (higher = riskier)
  beta: number;
  volatility: number; // annualized %
  maxDrawdown: number; // %
  concentrationTop3: number; // % — spec'd display metric for top-3 concentration
  top3ActualWeight: number; // computed top-3 MV weight of portfolio (transparency)
  sharpe: number;
  sortino: number;
  var95: number; // 1-day 95% VaR (%)
  gaugeSegments: { label: string; from: number; to: number; color: string }[];
  contributors: RiskContributor[];
};

export const riskMetrics: RiskMetrics = {
  level: 'Moderate',
  score: 64,
  beta: 1.18,
  volatility: 18.4,
  maxDrawdown: -8.6,
  concentrationTop3: 32, // spec'd display value
  top3ActualWeight: 52.91, // NVDA + AAPL + MSFT as % of portfolio (computed)
  sharpe: 1.42,
  sortino: 1.86,
  var95: -2.4,
  gaugeSegments: [
    { label: 'Low', from: 0, to: 35, color: '#12B76A' },
    { label: 'Moderate', from: 35, to: 65, color: '#F79009' },
    { label: 'High', from: 65, to: 85, color: '#FB6514' },
    { label: 'Aggressive', from: 85, to: 100, color: '#F04438' },
  ],
  contributors: [
    { label: 'NVDA position size', contribution: 28, detail: '21.6% of portfolio in a single high-beta semiconductor name.' },
    { label: 'Tech sector crowding', contribution: 24, detail: '52.9% of portfolio concentrated in Technology mega-caps.' },
    { label: 'TSLA volatility', contribution: 14, detail: 'TSLA 30-day realized vol of 42% dragging on risk-adjusted return.' },
    { label: 'Crypto-adjacent beta', contribution: 11, detail: 'BTC/ETH correlation to mega-cap tech elevated at 0.28–0.41.' },
    { label: 'Cash buffer', contribution: -9, detail: '14.3% cash sleeve reducing overall portfolio volatility.' },
  ],
};

/* ---- Holdings (treemap + positions source of truth) ---- */
export type Holding = {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  sector: string;
  shares: number;
  avgCost: number;
  lastPrice: number; // 2dp display price; shares × lastPrice ≈ marketValue (within cents)
  marketValue: number; // authoritative, reconciled so Σ = portfolio − cash
  costBasis: number;
  dayPL: number;
  dayPLPct: number; // daily change % (market)
  totalPL: number;
  totalPLPct: number;
  allocation: number; // % of portfolio
  sparkline: number[];
  brandColor: string;
};

export const holdings: Holding[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.', assetClass: 'equity', sector: 'Technology', shares: 200, avgCost: 172.4, lastPrice: 228.81, marketValue: 45761.51, costBasis: 34480.0, dayPL: 1159.65, dayPLPct: 2.6, totalPL: 11281.51, totalPLPct: 32.69, allocation: 21.57, sparkline: [223.0, 225.4, 226.8, 227.2, 228.1, 228.6, 228.81], brandColor: '#76B900' },
  { symbol: 'AAPL', name: 'Apple Inc.', assetClass: 'equity', sector: 'Technology', shares: 200, avgCost: 148.2, lastPrice: 171.37, marketValue: 34274.06, costBasis: 29640.0, dayPL: 606.03, dayPLPct: 1.8, totalPL: 4634.06, totalPLPct: 15.63, allocation: 16.16, sparkline: [168.4, 169.1, 170.2, 169.8, 170.9, 171.4, 171.37], brandColor: '#A2AAAD' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', assetClass: 'equity', sector: 'Technology', shares: 80, avgCost: 362.1, lastPrice: 402.53, marketValue: 32202.55, costBasis: 28968.0, dayPL: 287.24, dayPLPct: 0.9, totalPL: 3234.55, totalPLPct: 11.16, allocation: 15.18, sparkline: [398.9, 400.2, 401.1, 400.6, 401.8, 402.4, 402.53], brandColor: '#5E5E5E' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', assetClass: 'equity', sector: 'Consumer Discretionary', shares: 130, avgCost: 142.8, lastPrice: 165.14, marketValue: 21468.37, costBasis: 18564.0, dayPL: 149.23, dayPLPct: 0.7, totalPL: 2904.37, totalPLPct: 15.65, allocation: 10.12, sparkline: [163.99, 164.3, 164.8, 164.5, 165.1, 165.0, 165.14], brandColor: '#FF9900' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', assetClass: 'equity', sector: 'Consumer Discretionary', shares: 90, avgCost: 215.4, lastPrice: 197.73, marketValue: 17796.14, costBasis: 19386.0, dayPL: -216.14, dayPLPct: -1.2, totalPL: -1589.86, totalPLPct: -8.2, allocation: 8.39, sparkline: [200.1, 199.4, 198.8, 199.2, 198.1, 197.9, 197.73], brandColor: '#E82127' },
  { symbol: 'GOOGL', name: 'Alphabet, Inc.', assetClass: 'equity', sector: 'Communication Services', shares: 130, avgCost: 118.5, lastPrice: 126.03, marketValue: 16383.75, costBasis: 15405.0, dayPL: 81.51, dayPLPct: 0.5, totalPL: 978.75, totalPLPct: 6.35, allocation: 7.72, sparkline: [125.4, 125.6, 125.9, 125.7, 126.0, 126.1, 126.03], brandColor: '#4285F4' },
  { symbol: 'META', name: 'Meta Platforms, Inc.', assetClass: 'equity', sector: 'Communication Services', shares: 35, avgCost: 312.6, lastPrice: 398.13, marketValue: 13934.51, costBasis: 10941.0, dayPL: 151.6, dayPLPct: 1.1, totalPL: 2993.51, totalPLPct: 27.36, allocation: 6.57, sparkline: [393.8, 395.1, 396.4, 396.9, 397.6, 397.9, 398.13], brandColor: '#0866FF' },
];

// Cash sleeve (treemap tile + positions row), not a tradable equity.
export type CashSleeve = {
  symbol: 'CASH';
  name: string;
  assetClass: AssetClass;
  marketValue: number;
  dayPL: number;
  totalPL: number;
  allocation: number;
  apy: number;
  sparkline: number[];
};

export const cashSleeve: CashSleeve = {
  symbol: 'CASH',
  name: 'Cash & Equivalents',
  assetClass: 'cash',
  marketValue: 30321.23,
  dayPL: 0,
  totalPL: 0,
  allocation: 14.29,
  apy: 5.12,
  sparkline: [30180, 30198, 30222, 30258, 30284, 30302, 30321.23],
};

/* ---- Sector heatmap ---- */
export type Sector = {
  name: string;
  allocation: number; // % of portfolio
  marketValue: number;
  dailyChange: number; // portfolio-weighted sector return for held sectors; market return for unheld
  dayPL: number;
  contribution: number; // contribution to today's portfolio return (%)
  isHeld: boolean;
  topHoldings: string[]; // symbols
  marketDailyChange: number; // broader market sector daily change (%)
};

export const sectors: Sector[] = [
  { name: 'Technology', allocation: 52.91, marketValue: 112238.12, dailyChange: 1.86, dayPL: 2052.92, contribution: 0.97, isHeld: true, topHoldings: ['NVDA', 'AAPL', 'MSFT'], marketDailyChange: 1.62 },
  { name: 'Communication Services', allocation: 14.29, marketValue: 30318.26, dailyChange: 0.78, dayPL: 233.11, contribution: 0.11, isHeld: true, topHoldings: ['GOOGL', 'META'], marketDailyChange: 0.84 },
  { name: 'Consumer Discretionary', allocation: 18.51, marketValue: 39264.51, dailyChange: -0.17, dayPL: -66.91, contribution: -0.03, isHeld: true, topHoldings: ['AMZN', 'TSLA'], marketDailyChange: 0.21 },
  { name: 'Financials', allocation: 0.0, marketValue: 0, dailyChange: 0.32, dayPL: 0, contribution: 0.0, isHeld: false, topHoldings: [], marketDailyChange: 0.32 },
  { name: 'Healthcare', allocation: 0.0, marketValue: 0, dailyChange: -0.18, dayPL: 0, contribution: 0.0, isHeld: false, topHoldings: [], marketDailyChange: -0.18 },
  { name: 'Energy', allocation: 0.0, marketValue: 0, dailyChange: -0.84, dayPL: 0, contribution: 0.0, isHeld: false, topHoldings: [], marketDailyChange: -0.84 },
  { name: 'Industrials', allocation: 0.0, marketValue: 0, dailyChange: 0.46, dayPL: 0, contribution: 0.0, isHeld: false, topHoldings: [], marketDailyChange: 0.46 },
  { name: 'Utilities', allocation: 0.0, marketValue: 0, dailyChange: -0.12, dayPL: 0, contribution: 0.0, isHeld: false, topHoldings: [], marketDailyChange: -0.12 },
];

/* ---- Market movers ---- */
export type MarketMover = {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  change: number;
  changePct: number;
  sparkline: number[];
  brandColor: string;
};

export const marketMovers: { gainers: MarketMover[]; losers: MarketMover[] } = {
  gainers: [
    { symbol: 'NVDA', name: 'NVIDIA Corp.', assetClass: 'equity', price: 228.81, change: 5.8, changePct: 2.6, sparkline: [223.0, 225.4, 226.8, 227.2, 228.1, 228.6, 228.81], brandColor: '#76B900' },
    { symbol: 'AMD', name: 'Advanced Micro Devices', assetClass: 'equity', price: 162.4, change: 3.34, changePct: 2.1, sparkline: [159.06, 160.2, 161.1, 161.4, 161.9, 162.2, 162.4], brandColor: '#ED1C24' },
    { symbol: 'META', name: 'Meta Platforms, Inc.', assetClass: 'equity', price: 398.13, change: 4.33, changePct: 1.1, sparkline: [393.8, 395.1, 396.4, 396.9, 397.6, 397.9, 398.13], brandColor: '#0866FF' },
    { symbol: 'AAPL', name: 'Apple Inc.', assetClass: 'equity', price: 171.37, change: 3.03, changePct: 1.8, sparkline: [168.4, 169.1, 170.2, 169.8, 170.9, 171.4, 171.37], brandColor: '#A2AAAD' },
  ],
  losers: [
    { symbol: 'TSLA', name: 'Tesla, Inc.', assetClass: 'equity', price: 197.73, change: -2.4, changePct: -1.2, sparkline: [200.1, 199.4, 198.8, 199.2, 198.1, 197.9, 197.73], brandColor: '#E82127' },
    { symbol: 'NFLX', name: 'Netflix, Inc.', assetClass: 'equity', price: 612.85, change: -4.94, changePct: -0.8, sparkline: [617.79, 616.2, 615.1, 614.4, 613.6, 613.1, 612.85], brandColor: '#E50914' },
    { symbol: 'PYPL', name: 'PayPal Holdings', assetClass: 'equity', price: 58.42, change: -0.35, changePct: -0.6, sparkline: [58.77, 58.62, 58.5, 58.58, 58.44, 58.48, 58.42], brandColor: '#003087' },
  ],
};

/* ---- Correlation matrix (6×6) ---- */
export type CorrelationMatrix = {
  symbols: string[];
  cells: { row: string; col: string; value: number; insight: string }[][];
};

const corrInsight = (a: string, b: string, v: number): string => {
  if (a === b) return 'Perfect self-correlation (1.00).';
  const abs = Math.abs(v);
  const dir = v > 0 ? 'positive' : 'negative';
  const strength = abs >= 0.75 ? 'Strong' : abs >= 0.5 ? 'Moderate' : abs >= 0.3 ? 'Weak' : 'Negligible';
  if (a === 'BTC' || b === 'BTC') {
    return v >= 0.4 ? `${strength} ${dir} — crypto provides diversification but still tracks risk-on tech flows.` : `${strength} ${dir} — BTC adds diversification vs. this equity.`;
  }
  return `${strength} ${dir} — typical for mega-cap ${a === 'TSLA' || b === 'TSLA' ? 'growth / discretionary' : 'tech'} peers moving together on macro flows.`;
};

const corrSymbols = ['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN', 'BTC'];
const corrValues: number[][] = [
  [1.0, 0.82, 0.65, 0.48, 0.71, 0.31],
  [0.82, 1.0, 0.78, 0.42, 0.74, 0.28],
  [0.65, 0.78, 1.0, 0.55, 0.62, 0.41],
  [0.48, 0.42, 0.55, 1.0, 0.5, 0.35],
  [0.71, 0.74, 0.62, 0.5, 1.0, 0.33],
  [0.31, 0.28, 0.41, 0.35, 0.33, 1.0],
];

export const correlationMatrix: CorrelationMatrix = {
  symbols: corrSymbols,
  cells: corrSymbols.map((row, i) =>
    corrSymbols.map((col, j) => ({
      row,
      col,
      value: corrValues[i][j],
      insight: corrInsight(row, col, corrValues[i][j]),
    })),
  ),
};

/* ---- Dividend & events calendar ---- */
export type CalendarEventType = 'earnings' | 'dividend' | 'macro' | 'split' | 'ex-div';
export type CalendarEvent = {
  id: string;
  date: string; // ISO-ish display date
  isoDate: string;
  type: CalendarEventType;
  title: string;
  symbol?: string;
  impact: 'low' | 'medium' | 'high';
  detail: string;
  eta: string;
};

export const calendarEvents: CalendarEvent[] = [
  { id: 'ev1', date: 'Jun 28', isoDate: '2024-06-28', type: 'dividend', title: 'SPY ex-dividend', symbol: 'SPY', impact: 'low', detail: 'SPY goes ex-dividend; estimated $1.62/share distribution. Portfolio SPY tracking adds ~$0.40 to NAV.', eta: 'In 25 days' },
  { id: 'ev2', date: 'Jul 24', isoDate: '2024-07-24', type: 'earnings', title: 'AAPL earnings', symbol: 'AAPL', impact: 'high', detail: 'Apple Q3 report after the bell. Consensus EPS $1.34, revenue $84.5B. Position: 200 shares (16.2% of portfolio).', eta: 'In 51 days' },
  { id: 'ev3', date: 'Jul 29', isoDate: '2024-07-29', type: 'earnings', title: 'MSFT earnings', symbol: 'MSFT', impact: 'high', detail: 'Microsoft Q4 report. Azure growth & Copilot attach in focus. Position: 80 shares (15.2% of portfolio).', eta: 'In 56 days' },
  { id: 'ev4', date: 'Jul 31', isoDate: '2024-07-31', type: 'macro', title: 'FOMC rate decision', impact: 'high', detail: 'Federal Reserve rate decision. Market pricing 78% odds of a hold; forward guidance on cuts will drive mega-cap tech beta.', eta: 'In 58 days' },
  { id: 'ev5', date: 'Aug 12', isoDate: '2024-08-12', type: 'earnings', title: 'NVDA earnings', symbol: 'NVDA', impact: 'high', detail: 'NVIDIA Q2 report. Data-center revenue & Blackwell ramp in focus. Position: 200 shares (21.6% of portfolio).', eta: 'In 70 days' },
];

/* ---- Positions table (8 rows: 7 equities + cash) ---- */
export type PositionRow = {
  id: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  sector: string;
  shares: number | null;
  avgCost: number | null;
  lastPrice: number | null;
  marketValue: number;
  dayPL: number;
  dayPLPct: number | null;
  totalPL: number;
  totalPLPct: number | null;
  allocation: number;
  sparkline: number[];
  isCash?: boolean;
};

export const positions: PositionRow[] = [
  { id: 'p1', symbol: 'NVDA', name: 'NVIDIA Corp.', assetClass: 'equity', sector: 'Technology', shares: 200, avgCost: 172.4, lastPrice: 228.81, marketValue: 45761.51, dayPL: 1159.65, dayPLPct: 2.6, totalPL: 11281.51, totalPLPct: 32.69, allocation: 21.57, sparkline: [223.0, 225.4, 226.8, 227.2, 228.1, 228.6, 228.81] },
  { id: 'p2', symbol: 'AAPL', name: 'Apple Inc.', assetClass: 'equity', sector: 'Technology', shares: 200, avgCost: 148.2, lastPrice: 171.37, marketValue: 34274.06, dayPL: 606.03, dayPLPct: 1.8, totalPL: 4634.06, totalPLPct: 15.63, allocation: 16.16, sparkline: [168.4, 169.1, 170.2, 169.8, 170.9, 171.4, 171.37] },
  { id: 'p3', symbol: 'MSFT', name: 'Microsoft Corp.', assetClass: 'equity', sector: 'Technology', shares: 80, avgCost: 362.1, lastPrice: 402.53, marketValue: 32202.55, dayPL: 287.24, dayPLPct: 0.9, totalPL: 3234.55, totalPLPct: 11.16, allocation: 15.18, sparkline: [398.9, 400.2, 401.1, 400.6, 401.8, 402.4, 402.53] },
  { id: 'p4', symbol: 'AMZN', name: 'Amazon.com, Inc.', assetClass: 'equity', sector: 'Consumer Discretionary', shares: 130, avgCost: 142.8, lastPrice: 165.14, marketValue: 21468.37, dayPL: 149.23, dayPLPct: 0.7, totalPL: 2904.37, totalPLPct: 15.65, allocation: 10.12, sparkline: [163.99, 164.3, 164.8, 164.5, 165.1, 165.0, 165.14] },
  { id: 'p5', symbol: 'TSLA', name: 'Tesla, Inc.', assetClass: 'equity', sector: 'Consumer Discretionary', shares: 90, avgCost: 215.4, lastPrice: 197.73, marketValue: 17796.14, dayPL: -216.14, dayPLPct: -1.2, totalPL: -1589.86, totalPLPct: -8.2, allocation: 8.39, sparkline: [200.1, 199.4, 198.8, 199.2, 198.1, 197.9, 197.73] },
  { id: 'p6', symbol: 'GOOGL', name: 'Alphabet, Inc.', assetClass: 'equity', sector: 'Communication Services', shares: 130, avgCost: 118.5, lastPrice: 126.03, marketValue: 16383.75, dayPL: 81.51, dayPLPct: 0.5, totalPL: 978.75, totalPLPct: 6.35, allocation: 7.72, sparkline: [125.4, 125.6, 125.9, 125.7, 126.0, 126.1, 126.03] },
  { id: 'p7', symbol: 'META', name: 'Meta Platforms, Inc.', assetClass: 'equity', sector: 'Communication Services', shares: 35, avgCost: 312.6, lastPrice: 398.13, marketValue: 13934.51, dayPL: 151.6, dayPLPct: 1.1, totalPL: 2993.51, totalPLPct: 27.36, allocation: 6.57, sparkline: [393.8, 395.1, 396.4, 396.9, 397.6, 397.9, 398.13] },
  { id: 'p8', symbol: 'CASH', name: 'Cash & Equivalents', assetClass: 'cash', sector: '—', shares: null, avgCost: null, lastPrice: null, marketValue: 30321.23, dayPL: 0, dayPLPct: null, totalPL: 0, totalPLPct: null, allocation: 14.29, sparkline: [30180, 30198, 30222, 30258, 30284, 30302, 30321.23], isCash: true },
];

/* ---- Activity ledger (recent orders / corporate actions) ---- */
export type ActivityType = 'buy' | 'sell' | 'dividend' | 'limit' | 'stop' | 'split';
export type ActivityStatus = 'filled' | 'working' | 'partial' | 'settled' | 'cancelled';
export type ActivityEntry = {
  id: string;
  type: ActivityType;
  symbol: string;
  detail: string;
  shares: number | null;
  price: number | null;
  amount: number;
  date: string;
  time: string;
  status: ActivityStatus;
};

export const activityLedger: ActivityEntry[] = [
  { id: 'a1', type: 'limit', symbol: 'AMD', detail: 'Limit buy — AMD 50 @ $160.00', shares: 50, price: 160.0, amount: 8000.0, date: 'Jun 02', time: '09:42 ET', status: 'working' },
  { id: 'a2', type: 'buy', symbol: 'NVDA', detail: 'Bought NVDA — added 25 shares', shares: 25, price: 228.4, amount: 5710.0, date: 'May 01', time: '14:18 ET', status: 'filled' },
  { id: 'a3', type: 'sell', symbol: 'TSLA', detail: 'Trimmed TSLA — sold 15 shares', shares: 15, price: 197.8, amount: 2967.0, date: 'May 17', time: '11:05 ET', status: 'filled' },
  { id: 'a4', type: 'dividend', symbol: 'AAPL', detail: 'Dividend received — AAPL $0.24/sh × 200', shares: 200, price: 0.24, amount: 48.0, date: 'May 28', time: '—', status: 'settled' },
  { id: 'a5', type: 'sell', symbol: 'AMZN', detail: 'Trimmed AMZN — sold 10 shares', shares: 10, price: 164.9, amount: 1649.0, date: 'May 09', time: '10:32 ET', status: 'filled' },
  { id: 'a6', type: 'buy', symbol: 'META', detail: 'Bought META — added 5 shares', shares: 5, price: 461.2, amount: 2306.0, date: 'Apr 22', time: '15:51 ET', status: 'filled' },
];

/* ---- Add-symbol drawer config ---- */
export type AddSymbolConfig = {
  assetTypes: { value: AssetClass; label: string }[];
  watchlistGroups: string[];
  alertTypes: { value: string; label: string }[];
  defaultGroup: string;
};

export const addSymbolConfig: AddSymbolConfig = {
  assetTypes: [
    { value: 'equity', label: 'Equity' },
    { value: 'etf', label: 'ETF / Fund' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'cash', label: 'Cash / Money Market' },
  ],
  watchlistGroups: ['Core Holdings', 'Mega-Cap Tech', 'Crypto', 'Watchlist', 'Dividend Income'],
  alertTypes: [
    { value: 'above', label: 'Price crosses above' },
    { value: 'below', label: 'Price crosses below' },
    { value: 'earnings', label: 'Earnings announcement' },
    { value: 'volume', label: 'Volume spike' },
    { value: 'drawdown', label: 'Position drawdown > 5%' },
  ],
  defaultGroup: 'Watchlist',
};

/* ---- Quick-lookup helpers ---- */
export const holdingsTreemap = [
  ...holdings.map((h) => ({ symbol: h.symbol, name: h.name, marketValue: h.marketValue, allocation: h.allocation, dayPLPct: h.dayPLPct, sector: h.sector, brandColor: h.brandColor, shares: h.shares, avgCost: h.avgCost, lastPrice: h.lastPrice, dayPL: h.dayPL, totalPL: h.totalPL })),
  { symbol: cashSleeve.symbol, name: cashSleeve.name, marketValue: cashSleeve.marketValue, allocation: cashSleeve.allocation, dayPLPct: 0, sector: 'Cash', brandColor: '#475467', shares: null, avgCost: null, lastPrice: null, dayPL: 0, totalPL: 0 },
];

export const formatCurrency = (value: number, maximumFractionDigits = 2): string =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits });

export const formatSignedCurrency = (value: number, maximumFractionDigits = 2): string => {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: maximumFractionDigits, maximumFractionDigits })}`;
};

export const formatSignedPercent = (value: number): string => `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
