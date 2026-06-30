"use client";
import PageContainer from "../../../layout/shared/page-container/PageContainer";
import { InvoiceForm } from "@/app/components/apps/invoice/InvoiceForm";

const CreateInvoicePage = () => {
  return (
    <PageContainer
      title="Create Invoice"
      breadcrumb={[{ to: "/", title: "Home" }, { to: "/apps/invoice/list", title: "Invoices" }, { title: "Create" }]}
    >
      <InvoiceForm />
    </PageContainer>
  );
};

export default CreateInvoicePage;
