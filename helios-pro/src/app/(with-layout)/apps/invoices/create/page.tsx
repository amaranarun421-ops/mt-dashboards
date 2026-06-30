import InvoiceForm from "../_form";

export const metadata = {
  title: "Create Invoice",
  description: "Build a new invoice — totals compute automatically as you edit line items.",
};

export default function CreateInvoicePage() {
  return <InvoiceForm mode="create" />;
}
