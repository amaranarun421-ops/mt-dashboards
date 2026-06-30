import InventoryClient from "./_client";

export const metadata = {
  title: "Inventory",
  description: "Helios Pro ecommerce — track stock levels, low-stock alerts, warehouse capacity and stock movement.",
};

export default function InventoryPage() {
  return <InventoryClient />;
}
