"use client";
import PageContainer from "../../../../layout/shared/page-container/PageContainer";
import { ProductForm } from "@/app/components/apps/ecommerce/ProductForm";

const EditProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <PageContainer
      title="Edit Product"
      breadcrumb={[{ to: "/", title: "Home" }, { to: "/apps/ecommerce/list", title: "Products" }, { title: `Edit #${params.id}` }]}
    >
      <ProductForm />
    </PageContainer>
  );
};

export default EditProductPage;
