import BillingSettingsClient from "./_client";

export const metadata = {
  title: "Billing settings",
  description:
    "Helios Pro — your subscription, payment methods, invoices and usage meters in one place.",
};

export default function BillingSettingsPage() {
  return <BillingSettingsClient />;
}
