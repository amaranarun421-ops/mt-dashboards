import ProductForm from "../_form";

export const metadata = {
  title: "Add Product",
  description: "Helios Pro ecommerce — create a new product with pricing, inventory, variants and SEO.",
};

export default function AddProductPage() {
  return <ProductForm mode="create" />;
}
