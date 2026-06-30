import ProductForm from "../_form";
import { sampleProduct } from "@/data/ecommerce/products";

export const metadata = {
  title: "Edit Product",
  description: "Helios Pro ecommerce — edit an existing product's details, pricing and inventory.",
};

export default function EditProductPage() {
  return <ProductForm mode="edit" initialValues={sampleProduct} />;
}
