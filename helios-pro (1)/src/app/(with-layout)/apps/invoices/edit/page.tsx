import InvoiceForm from "../_form";
import { sampleInvoice } from "@/data/apps/invoices";

export const metadata = {
  title: "Edit Invoice",
  description: "Update line items, tax and totals. Changes are reflected on the live preview.",
};

export default function EditInvoicePage() {
  return <InvoiceForm mode="edit" initialValues={sampleInvoice} />;
}
