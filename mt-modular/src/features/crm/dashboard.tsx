'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Contact, Deal, Conversation } from './types';
import { CrmHeader } from './sections/header';
import { RelationshipTimelineHero } from './sections/relationship-timeline';
import { FollowUpsCard } from './sections/follow-ups';
import { AccountHealthRadar } from './sections/account-health-radar';
import { CrmSignalStrip } from './sections/signal-strip';
import { PipelineBoard } from './sections/pipeline-board';
import { LeadIntentRadar } from './sections/lead-intent-radar';
import { AccountHealthMatrix } from './sections/account-health-matrix';
import { ConversationInbox } from './sections/conversation-inbox';
import { RenewalRiskCard } from './sections/renewal-risk';
import { MeetingSchedule } from './sections/meeting-schedule';
import { ContactsTable } from './sections/contacts-table';
import { NewContactDrawer, DealDetailDrawer, ConversationDetailDrawer } from './sections/drawers';
import * as Data from './data/mock-data';

/**
 * CRM Dashboard — Relationship Command Center.
 *
 * Composition root for the CRM feature. Imports all section components and
 * arranges them in the premium bento layout. State for drawers is lifted here
 * so the Header (Create contact) and ContactsTable (row click) can both
 * trigger drawer opens.
 *
 * Modular architecture:
 *   features/crm/
 *     dashboard.tsx        ← you are here (composition root)
 *     sections/            ← 13 section components, each <500 lines
 *     data/mock-data.ts    ← realistic CRM mock data
 *     types/index.ts       ← type re-exports
 *     hooks/               ← (reserved for future CRM-specific hooks)
 */
export function CrmDashboard() {
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [contacts, setContacts] = React.useState<Contact[]>(Data.contacts);
  const [selectedDeal, setSelectedDeal] = React.useState<Deal | null>(null);
  const [selectedConv, setSelectedConv] = React.useState<Conversation | null>(null);

  function handleCreateContact(c: Contact) {
    setContacts((prev) => [c, ...prev]);
    toast({ title: 'Contact created', description: `${c.account} — ${c.contact}` });
  }

  return (
    <div className="space-y-6">
      <CrmHeader onNewContact={() => setDrawerOpen(true)} />

      {/* Hero: Relationship Timeline (left) + Follow-ups + Health Radar (right) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <RelationshipTimelineHero />
        <div className="flex flex-col gap-5">
          <FollowUpsCard />
          <AccountHealthRadar />
        </div>
      </div>

      {/* Signal Strip */}
      <CrmSignalStrip />

      {/* Pipeline Board (full width) */}
      <PipelineBoard onDealClick={setSelectedDeal} />

      {/* Lead Intent Radar + Account Health Matrix */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <LeadIntentRadar />
        <AccountHealthMatrix />
      </div>

      {/* Conversation Inbox + Renewal Risk + Meeting Schedule */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ConversationInbox onConversationClick={setSelectedConv} />
        <RenewalRiskCard />
        <MeetingSchedule />
      </div>

      {/* Contacts table */}
      <ContactsTable contacts={contacts} onRowClick={(c) => toast({ title: c.account, description: c.contact })} />

      {/* Drawers */}
      <NewContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onCreate={handleCreateContact} />
      <DealDetailDrawer deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      <ConversationDetailDrawer conv={selectedConv} onClose={() => setSelectedConv(null)} />
    </div>
  );
}

export default CrmDashboard;
