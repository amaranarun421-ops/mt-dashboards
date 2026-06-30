"use client";
import { PageHeader, Card, Badge, Button } from "@/components/ui";
import { Download, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type Deal = {
  id: string;
  account: string;
  owner: string;
  stage: "Prospecting" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
  amount: number;
  probability: number;
  close: string;
  lastActivity: string;
  region: string;
};

const ROWS: Deal[] = [
  { id: "D1", account: "Acme Corporation", owner: "Priya Iyer", stage: "Negotiation", amount: 48200, probability: 75, close: "Jul 14", lastActivity: "2h ago", region: "NA" },
  { id: "D2", account: "Globex Industries", owner: "Marcus Chen", stage: "Proposal", amount: 28400, probability: 60, close: "Jul 22", lastActivity: "5h ago", region: "EU" },
  { id: "D3", account: "Initech LLC", owner: "Sofia García", stage: "Qualified", amount: 12800, probability: 40, close: "Aug 04", lastActivity: "1d ago", region: "NA" },
  { id: "D4", account: "Umbrella Group", owner: "Yuki Tanaka", stage: "Closed Won", amount: 64200, probability: 100, close: "Jun 28", lastActivity: "3d ago", region: "APAC" },
  { id: "D5", account: "Stark Enterprises", owner: "Aaroh Sharma", stage: "Prospecting", amount: 9800, probability: 20, close: "Aug 18", lastActivity: "4h ago", region: "EU" },
  { id: "D6", account: "Wayne Foundation", owner: "Priya Iyer", stage: "Negotiation", amount: 32400, probability: 80, close: "Jul 09", lastActivity: "1h ago", region: "NA" },
  { id: "D7", account: "Hooli Inc.", owner: "Marcus Chen", stage: "Proposal", amount: 18900, probability: 55, close: "Jul 30", lastActivity: "6h ago", region: "NA" },
  { id: "D8", account: "Pied Piper", owner: "Sofia García", stage: "Qualified", amount: 22600, probability: 45, close: "Aug 11", lastActivity: "8h ago", region: "EU" },
  { id: "D9", account: "Vehement Capital", owner: "Yuki Tanaka", stage: "Closed Won", amount: 84500, probability: 100, close: "Jun 25", lastActivity: "2d ago", region: "APAC" },
  { id: "D10", account: "Massive Dynamic", owner: "Aaroh Sharma", stage: "Negotiation", amount: 56800, probability: 70, close: "Jul 17", lastActivity: "30m ago", region: "NA" },
  { id: "D11", account: "Soylent Corp", owner: "Priya Iyer", stage: "Prospecting", amount: 7200, probability: 15, close: "Sep 02", lastActivity: "2d ago", region: "EU" },
  { id: "D12", account: "Cyberdyne Systems", owner: "Marcus Chen", stage: "Proposal", amount: 41200, probability: 65, close: "Aug 08", lastActivity: "4h ago", region: "NA" },
  { id: "D13", account: "Tyrell Corp", owner: "Sofia García", stage: "Closed Lost", amount: 38400, probability: 0, close: "Jun 20", lastActivity: "1w ago", region: "APAC" },
  { id: "D14", account: "Weyland-Yutani", owner: "Yuki Tanaka", stage: "Qualified", amount: 19800, probability: 35, close: "Aug 25", lastActivity: "12h ago", region: "EU" },
  { id: "D15", account: "Wonka Industries", owner: "Aaroh Sharma", stage: "Negotiation", amount: 24700, probability: 65, close: "Jul 21", lastActivity: "3h ago", region: "NA" },
  { id: "D16", account: "Nakatomi Trading", owner: "Priya Iyer", stage: "Proposal", amount: 31500, probability: 50, close: "Aug 15", lastActivity: "1d ago", region: "APAC" },
  { id: "D17", account: "Gringotts Banking", owner: "Marcus Chen", stage: "Closed Won", amount: 72800, probability: 100, close: "Jun 30", lastActivity: "5h ago", region: "EU" },
  { id: "D18", account: "Stark Industries", owner: "Sofia García", stage: "Prospecting", amount: 14200, probability: 25, close: "Sep 14", lastActivity: "6h ago", region: "NA" },
];

const STAGE_TONE: Record<Deal["stage"], "gray" | "brand" | "purple" | "warning" | "success" | "error"> = {
  Prospecting: "gray",
  Qualified: "brand",
  Proposal: "purple",
  Negotiation: "warning",
  "Closed Won": "success",
  "Closed Lost": "error",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

const PROB_TONE = (p: number) =>
  p >= 70 ? "bg-success-500" : p >= 40 ? "bg-warning-500" : p > 0 ? "bg-error-500" : "bg-gray-400";

export default function StickyTablePage() {
  const totalValue = ROWS.reduce((s, r) => s + r.amount, 0);
  const wonValue = ROWS.filter((r) => r.stage === "Closed Won").reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Sticky Header & First Column"
        description="Large tables that scroll both vertically and horizontally, keeping the header row and the first column pinned."
        breadcrumbs={[{ label: "Tables" }, { label: "Sticky" }]}
        actions={
          <>
            <Button variant="secondary"><Download className="h-4 w-4" /> Export</Button>
            <Button><Lock className="h-4 w-4" /> Pin column</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total pipeline</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalValue)}</p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{ROWS.length} active deals</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Closed won</p>
          <p className="mt-1 text-2xl font-bold text-success-600 dark:text-success-400">{formatCurrency(wonValue)}</p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{ROWS.filter((r) => r.stage === "Closed Won").length} deals won</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Avg probability</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(ROWS.reduce((s, r) => s + r.probability, 0) / ROWS.length)}%
          </p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">weighted across pipeline</p>
        </Card>
      </div>

      <Card className="p-0">
        {/* Scroll container — sticky header AND sticky first column */}
        <div className="max-h-[500px] overflow-auto rounded-xl">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="[&>th]:sticky [&>th]:top-0 [&>th]:z-30 [&>th]:bg-gray-100 [&>th]:px-4 [&>th]:py-3 [&>th]:text-left [&>th]:text-xs [&>th]:font-semibold [&>th]:uppercase [&>th]:tracking-wider [&>th]:text-gray-600 dark:[&>th]:bg-gray-800 dark:[&>th]:text-gray-300 [&>th]:border-b [&>th]:border-gray-200 dark:[&>th]:border-gray-700">
                <th className="sticky left-0 z-40 min-w-[200px] border-r border-gray-200 dark:border-gray-700">Account</th>
                <th className="min-w-[150px]">Owner</th>
                <th className="min-w-[140px]">Stage</th>
                <th className="min-w-[120px] text-right">Amount</th>
                <th className="min-w-[140px]">Probability</th>
                <th className="min-w-[110px]">Close Date</th>
                <th className="min-w-[120px]">Region</th>
                <th className="min-w-[120px]">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.id} className={cn(i % 2 === 1 && "bg-gray-50/60 dark:bg-gray-800/30", "hover:bg-brand-50/60 dark:hover:bg-brand-500/10")}>
                  <td className="sticky left-0 z-20 min-w-[200px] bg-white px-4 py-3 font-semibold text-gray-900 dark:bg-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                        {r.account.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="truncate">{r.account}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{r.owner}</td>
                  <td className="px-4 py-3">
                    <Badge tone={STAGE_TONE[r.stage]} variant="soft">{r.stage}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(r.amount)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                        <div className={cn("h-full rounded-full", PROB_TONE(r.probability))} style={{ width: `${r.probability}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{r.probability}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">{r.close}</td>
                  <td className="px-4 py-3">
                    <Badge tone="gray" variant="outline">{r.region}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">{r.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Scroll the table vertically to see the header stay pinned at the top, and horizontally to see the first column stay pinned to the left. The top-left corner cell has the highest z-index so it never disappears.
      </p>
    </div>
  );
}
