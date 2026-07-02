import { AppShell } from '@/components/layout/app-shell';
import { OverviewContent } from '@/components/dashboard/overview-content';

export default function Home() {
  return (
    <AppShell>
      <OverviewContent />
    </AppShell>
  );
}
