'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  EcommerceHeader,
  KpiCardNetRevenue,
  KpiCardOrders,
  KpiCardConversion,
  KpiCardCartRecovery,
  RevenueForecastCard,
  CategoryMixCard,
  CheckoutFunnelCard,
  ChannelPerformanceCard,
} from './ecommerce-sections-1';
import {
  ProductPerformanceTable,
  InventoryRiskCard,
  FulfillmentQueueCard,
  RealtimeMonitor,
  RecentOrdersSection,
  ReturnsRefundsCard,
  CustomerSegmentsCard,
} from './ecommerce-sections-2';
import * as Data from './ecommerce-data';
import type { Order } from './ecommerce-data';
import type { NewOrder } from './ecommerce-interactions';

/* Premium staggered fade-up animation */
const STAGGER_STYLE = `
  @keyframes dashFadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .ecom-stagger > * { animation: dashFadeUp 480ms cubic-bezier(0.4, 0, 0.2, 1) both; }
  .ecom-stagger > *:nth-child(1) { animation-delay: 0ms; }
  .ecom-stagger > *:nth-child(2) { animation-delay: 60ms; }
  .ecom-stagger > *:nth-child(3) { animation-delay: 120ms; }
  .ecom-stagger > *:nth-child(4) { animation-delay: 180ms; }
  .ecom-stagger > *:nth-child(5) { animation-delay: 240ms; }
  .ecom-stagger > *:nth-child(6) { animation-delay: 300ms; }
  .ecom-stagger > *:nth-child(7) { animation-delay: 360ms; }
  .ecom-stagger > *:nth-child(8) { animation-delay: 420ms; }
  .ecom-stagger > *:nth-child(9) { animation-delay: 480ms; }
  .ecom-stagger > *:nth-child(10) { animation-delay: 540ms; }
  @media (prefers-reduced-motion: reduce) {
    .ecom-stagger > * { animation: none !important; }
  }
`;

/* ============================================================
   Main Ecommerce Dashboard export
   ============================================================ */
export function EcommerceDashboard() {
  // Lifted state — orders can be added from the header drawer and
  // read by the Recent Orders section.
  const [orders, setOrders] = React.useState<Order[]>(Data.orders);
  const [orderPulse, setOrderPulse] = React.useState(0);

  function handleCreateOrder(order: NewOrder) {
    setOrders((prev) => [order, ...prev]);
    setOrderPulse((p) => p + 1);
  }

  return (
    <div className="space-y-6">
      <style jsx global>{STAGGER_STYLE}</style>

      {/* Page header — passes order-creation callback */}
      <EcommerceHeader onCreateOrder={handleCreateOrder} onOrderCreated={() => {}} />

      <div className="ecom-stagger space-y-6">
        {/* 4 KPI cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCardNetRevenue />
          <KpiCardOrders />
          <KpiCardConversion />
          <KpiCardCartRecovery />
        </div>

        {/* Revenue & Forecast (large) + Category Mix (side) */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
          <RevenueForecastCard />
          <CategoryMixCard />
        </div>

        {/* Checkout Funnel + Channel Performance */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CheckoutFunnelCard />
          <ChannelPerformanceCard />
        </div>

        {/* Product Performance table (wide) */}
        <ProductPerformanceTable />

        {/* Realtime Monitor (5 cards) */}
        <RealtimeMonitor />

        {/* Recent Orders + Customer Activity — shared orders state */}
        <RecentOrdersSection orders={orders} orderPulse={orderPulse} />

        {/* Inventory Risk + Fulfillment Queue + Returns & Refunds + Customer Segments */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InventoryRiskCard />
          <FulfillmentQueueCard />
          <ReturnsRefundsCard />
          <CustomerSegmentsCard />
        </div>
      </div>
    </div>
  );
}
