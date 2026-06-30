"use client";
import PageContainer from "../../../../layout/shared/page-container/PageContainer";
import { InvoiceForm } from "@/app/components/apps/invoice/InvoiceForm";

const EditInvoicePage = ({ params }: { params: { id: string } }) => {
  return (
    <PageContainer
      title="Edit Invoice"
      breadcrumb={[{ to: "/", title: "Home" }, { to: "/apps/invoice/list", title: "Invoices" }, { title: `Edit ${params.id}` }]}
    >
      <InvoiceForm />
    </PageContainer>
  );
};

export default EditInvoicePage;
