import ConnectedAppsClient from "./_client";

export const metadata = {
  title: "Connected apps",
  description:
    "Helios Pro — manage third-party integrations, scopes and access tokens, with the ability to revoke or connect new apps.",
};

export default function ConnectedAppsPage() {
  return <ConnectedAppsClient />;
}
