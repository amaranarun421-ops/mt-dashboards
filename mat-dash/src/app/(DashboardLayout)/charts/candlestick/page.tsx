"use client";
import PageContainer from "../../layout/shared/page-container/PageContainer";
import { DemoBlock } from "@/app/components/shared/DemoBlock";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Generate candlestick data
const genCandles = () => {
  const data: { x: Date; y: number[] }[] = [];
  let price = 145;
  for (let i = 0; i < 30; i++) {
    const date = new Date(2024, 0, i + 1);
    const open = price + (Math.random() - 0.5) * 4;
    const close = open + (Math.random() - 0.5) * 8;
    const high = Math.max(open, close) + Math.random() * 3;
    const low = Math.min(open, close) - Math.random() * 3;
    data.push({ x: date, y: [Number(open.toFixed(2)), Number(high.toFixed(2)), Number(low.toFixed(2)), Number(close.toFixed(2))] });
    price = close;
  }
  return data;
};

const CandlestickPage = () => {
  const candles = genCandles();

  return (
    <PageContainer
      title="Candlestick"
      description="OHLC charts for financial analysis. Includes classic candles, hollow candles, and bar charts."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemoBlock title="Basic Candlestick" className="lg:col-span-2">
          <Chart
            options={{
              chart: { toolbar: { show: false }, fontFamily: "inherit" },
              xaxis: { type: "datetime" },
              yaxis: { tooltip: { enabled: true } },
              tooltip: { theme: "dark" },
              plotOptions: { candlestick: { colors: { upward: "var(--color-success)", downward: "var(--color-error)" }, wick: { useFillColor: true } } },
              grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 },
            }}
            series={[{ name: "Price", data: candles }]}
            type="candlestick"
            height={400}
          />
        </DemoBlock>

        <DemoBlock title="With Volume" description="Candlestick + bar chart combo">
          <Chart
            options={{
              chart: { toolbar: { show: false }, fontFamily: "inherit" },
              xaxis: { type: "datetime" },
              tooltip: { theme: "dark" },
              plotOptions: { candlestick: { colors: { upward: "var(--color-primary)", downward: "var(--color-secondary)" } } },
              grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 },
            }}
            series={[
              { name: "Price", data: candles.slice(0, 20), type: "candlestick" },
              { name: "Volume", data: candles.slice(0, 20).map((c) => ({ x: c.x, y: Math.round(Math.random() * 1000) + 200 })), type: "bar" },
            ]}
            height={320}
          />
        </DemoBlock>

        <DemoBlock title="Bar OHLC" description="Open-high-low-close as bars">
          <Chart
            options={{
              chart: { toolbar: { show: false }, fontFamily: "inherit" },
              xaxis: { type: "datetime" },
              tooltip: { theme: "dark" },
              plotOptions: { bar: { columnWidth: "60%", colors: { ranges: [{ from: 0, to: 100000, color: "var(--color-primary)" }] } } },
              grid: { borderColor: "rgba(133, 146, 173, 0.2)", strokeDashArray: 4 },
              dataLabels: { enabled: false },
            }}
            series={[{ name: "Close", data: candles.slice(0, 20).map((c) => ({ x: c.x, y: c.y[3] })) }]}
            type="bar"
            height={320}
          />
        </DemoBlock>
      </div>
    </PageContainer>
  );
};

export default CandlestickPage;
