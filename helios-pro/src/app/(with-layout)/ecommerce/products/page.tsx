import ProductsClient from "./_client";

export const metadata = {
  title: "Products",
  description: "Helios Pro ecommerce — manage your product catalog, inventory, pricing and variants.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
