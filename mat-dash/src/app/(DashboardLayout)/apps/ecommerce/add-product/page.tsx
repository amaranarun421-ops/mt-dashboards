"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { ProductForm } from "@/app/components/apps/ecommerce/ProductForm";

const AddProductPage = () => {
  return (
    <PageContainer
      title="Add Product"
      breadcrumb={[{ to: "/", title: "Home" }, { to: "/apps/ecommerce/list", title: "Products" }, { title: "Add New" }]}
    >
      <ProductForm />
    </PageContainer>
  );
};

export default AddProductPage;
