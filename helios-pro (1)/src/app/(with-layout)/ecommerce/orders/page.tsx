import OrdersClient from "./_client";

export const metadata = {
  title: "Orders",
  description: "Helios Pro ecommerce — manage customer orders, fulfillment, payments and returns.",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
