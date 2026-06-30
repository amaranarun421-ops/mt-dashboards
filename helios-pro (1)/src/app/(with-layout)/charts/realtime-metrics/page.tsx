import RealtimeMetricsClient from "./_client";

export const metadata = {
  title: "Realtime Metrics",
  description:
    "Helios Pro realtime metrics dashboard with a 2-second live-updating chart, ticker and status panel.",
};

export default function RealtimeMetricsPage() {
  return <RealtimeMetricsClient />;
}
