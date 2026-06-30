"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const base: ApexOptions = { chart: { toolbar: { show: false }, fontFamily: "inherit" }, dataLabels: { enabled: false }, tooltip: { theme: "dark" }, grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 } };

const MinimalDashboard = () => (
  <PageContainer title="Minimal Dashboard" description="Clean, minimal layout focused on the essentials. Less chrome, more data.">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {[
        { label: "Balance", value: "$48,920.50", change: "+12.5%", icon: "solar:wallet-bold-duotone", color: "primary" },
        { label: "Income", value: "$12,430.00", change: "+5.2%", icon: "solar:arrow-down-bold-duotone", color: "success" },
        { label: "Expenses", value: "$4,820.30", change: "-3.1%", icon: "solar:arrow-up-bold-duotone", color: "error" },
      ].map((s) => (
        <div key={s.label} className="rounded-xl bg-background p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div className={`h-10 w-10 rounded-full bg-light${s.color} text-${s.color} flex items-center justify-center`}>
              <Icon icon={s.icon} width={22} />
            </div>
            <span className={`text-xs font-medium ${s.change.startsWith("+") ? "text-success" : "text-error"}`}>{s.change}</span>
          </div>
          <p className="text-2xl font-bold mt-4">{s.value}</p>
          <p className="text-xs opacity-60">{s.label}</p>
        </div>
      ))}
    </div>

    <DemoBlock title="Cash Flow">
      <Chart options={{ ...base, colors: ["var(--color-primary)", "var(--color-error)"], stroke: { curve: "smooth", width: 2 }, xaxis: { categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"] }, legend: { position: "top" } }} series={[{ name: "Income", data: [3200, 4100, 3800, 5100, 4900, 6200, 5800, 7100, 6800] }, { name: "Expenses", data: [-1800, -2100, -1900, -2400, -2200, -2800, -2500, -3100, -2900] }]} type="bar" height={320} />
    </DemoBlock>

    <DemoBlock title="Recent Transactions" className="mt-6">
      <div className="space-y-2">
        {[
          { name: "Spotify Subscription", cat: "Entertainment", date: "Jun 24, 2024", amount: -9.99, icon: "solar:music-note-2-bold-duotone", color: "success" },
          { name: "Salary Deposit", cat: "Income", date: "Jun 23, 2024", amount: 4200.00, icon: "solar:wallet-bold-duotone", color: "primary" },
          { name: "Amazon Purchase", cat: "Shopping", date: "Jun 22, 2024", amount: -127.45, icon: "solar:cart-large-2-bold-duotone", color: "warning" },
          { name: "Refund - Best Buy", cat: "Refund", date: "Jun 21, 2024", amount: 89.99, icon: "solar:undo-left-round-bold-duotone", color: "info" },
          { name: "Coffee Shop", cat: "Food & Drinks", date: "Jun 21, 2024", amount: -5.75, icon: "solar:cup-hot-bold-duotone", color: "error" },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-defaultBorder last:border-b-0">
            <div className={`h-10 w-10 rounded-full bg-light${t.color} text-${t.color} flex items-center justify-center`}>
              <Icon icon={t.icon} width={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs opacity-60">{t.cat} · {t.date}</p>
            </div>
            <span className={`font-semibold ${t.amount > 0 ? "text-success" : ""}`}>{t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </DemoBlock>
  </PageContainer>
);

export default MinimalDashboard;
