import PaymentFormClient from "./_client";

export const metadata = {
  title: "Payment Form",
  description:
    "Helios Pro — UI-only card form with card-type detection, formatted card number, expiry MM/YY, CVC and billing ZIP.",
};

export default function PaymentFormPage() {
  return <PaymentFormClient />;
}
