import CustomersClient from "./_client";

export const metadata = {
  title: "Customers",
  description: "Helios Pro ecommerce — manage customer profiles, segments, lifetime value and order history.",
};

export default function CustomersPage() {
  return <CustomersClient />;
}
