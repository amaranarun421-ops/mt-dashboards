'use client';

import * as React from 'react';
import {
  Inbox as InboxIcon, Plus, Star, Reply, Forward, Archive,
  Clock, Paperclip, ArrowLeft, MoreHorizontal, Mail,
  Search,
} from 'lucide-react';
import { PageHeader } from '@/components/common/page-header';
import { AvatarBadge } from '@/components/common/status-badge';
import { inboxMessages } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';

type Filter = 'all' | 'unread' | 'starred';

const FILTER_CHIPS: { value: Filter; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All', icon: InboxIcon },
  { value: 'unread', label: 'Unread', icon: Mail },
  { value: 'starred', label: 'Starred', icon: Star },
];

// Synthesize message bodies
const MESSAGE_BODIES: Record<string, string> = {
  'm1': `Hi Sarah,

Thanks for sending over the revised MSA. Legal has reviewed and we have a few comments before we can move forward with execution:

1. Section 4.2 (Data Processing) — please clarify the subprocessor list and notification window. We'd like 30 days written notice prior to any new subprocessor addition.

2. Section 7.1 (Liability Cap) — the proposed annual cap of 12 months of fees feels low for an enterprise commitment of this size. We typically see 24 months for our tier of accounts.

3. SLA Appendix B — uptime commitment of 99.9% looks good, but please add explicit remediation credits for any monthly miss.

Once these are addressed, we should be good to execute by end of week. Happy to jump on a quick call if easier.

Best,
John`,
  'm2': `Hi Emily,

Following up on our QBR — we would like to revisit the multi-year pricing structure you proposed. After internal review, our procurement team has a few questions:

- Can you provide discounted pricing for a 3-year commit vs the 1-year option?
- What's the volume discount tier structure beyond 500 seats?
- Are there any flexibility clauses for true-down at anniversary?

Let's schedule a follow-up call this week. Thursday afternoon works on our end.

Best regards,
Robert Davis
CFO, GlobalTech Industries`,
  'm3': `Hi Marcus,

Engineering has approved the SOW. We need to align on implementation timeline next week. Specifically:

- Kickoff target: week of July 14
- Phase 1 (data migration): 2 weeks
- Phase 2 (integration testing): 3 weeks
- Go-live: target August 8

Can you send over the project plan and resource assignments? We'll need to book the technical resources on our side.

Thanks,
Alex`,
  'm4': `Hi Sarah,

I wanted to introduce our VP of Platform, Michael Chen, who will be joining the technical evaluation alongside our team. Michael will be reviewing the architecture and security posture.

Could you share the technical brief and security documentation at your earliest convenience? Michael will have questions during next Tuesday's call.

Best,
Lisa Wong
VP Engineering, Acme Corporation`,
  'm5': `Hi Sarah,

Thanks for the demo yesterday — the team had a few questions about the analytics module:

1. Can we build custom dashboards on top of the data warehouse, or only via the in-app builder?
2. What's the data freshness SLA? Real-time, hourly, or daily?
3. Can we export raw events to our own S3 / Snowflake?
4. Are there pre-built templates for media/content operations metrics?

Looking forward to your response.

Thanks,
Maya`,
};

const MESSAGE_META: Record<string, { fromEmail: string; attachments: string[] }> = {
  'm1': { fromEmail: 'john@acme.com', attachments: ['Revised_MSA_v3.pdf'] },
  'm2': { fromEmail: 'rdavis@globalfin.com', attachments: [] },
  'm3': { fromEmail: 'alex@vertexrobotics.com', attachments: ['SOW_Vertual_v2.pdf', 'Implementation_Plan.xlsx'] },
  'm4': { fromEmail: 'lisa@techstart.io', attachments: [] },
  'm5': { fromEmail: 'maya@brightwave.tv', attachments: [] },
};

const AVATAR_COLORS: Record<string, string> = {
  'JS': 'var(--accent)',
  'RD': 'var(--chart-1)',
  'AR': 'var(--chart-3)',
  'LW': 'var(--chart-5)',
  'MP': 'var(--warning)',
};

export default function InboxPage() {
  const [filter, setFilter] = React.useState<Filter>('all');
  const [selected, setSelected] = React.useState<string | null>(inboxMessages[0]?.id ?? null);
  const [mobilePreviewOpen, setMobilePreviewOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const filtered = React.useMemo(() => {
    let list = inboxMessages;
    if (filter === 'unread') list = list.filter((m) => m.unread);
    if (filter === 'starred') list = list.filter((m) => m.starred);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((m) =>
        m.from.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.account.toLowerCase().includes(q) ||
        m.preview.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search]);

  const selectedMessage = inboxMessages.find((m) => m.id === selected) ?? null;
  const unreadCount = inboxMessages.filter((m) => m.unread).length;
  const starredCount = inboxMessages.filter((m) => m.starred).length;

  const handleSelect = (id: string) => {
    setSelected(id);
    setMobilePreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbox"
        description="Customer and prospect messages synced from your connected email accounts"
        icon={InboxIcon}
        actions={
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Compose
          </Button>
        }
      />

      {/* Inbox container */}
      <div className="bg-card border border-border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Top bar: search + filter chips */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-2">
            {FILTER_CHIPS.map((chip) => {
              const active = filter === chip.value;
              const count = chip.value === 'all'
                ? inboxMessages.length
                : chip.value === 'unread'
                ? unreadCount
                : starredCount;
              return (
                <button
                  key={chip.value}
                  onClick={() => setFilter(chip.value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-all',
                    active
                      ? 'bg-accent/15 text-accent border-accent/40'
                      : 'bg-secondary text-muted-foreground border-border hover:text-foreground hover:border-accent/40'
                  )}
                >
                  <chip.icon className="w-3 h-3" />
                  {chip.label}
                  <span className="text-[10px] text-muted-foreground">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inbox…"
              className="pl-9 w-full sm:w-64 h-8 bg-secondary border-border text-xs"
            />
          </div>
        </div>

        {/* Two-pane layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
          {/* Message list */}
          <div className={cn(
            'lg:col-span-2 border-r border-border overflow-y-auto max-h-[640px]',
            'lg:block',
            selected && 'hidden lg:block'
          )}>
            <div className="divide-y divide-border">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                    <InboxIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">No messages found</h3>
                  <p className="text-xs text-muted-foreground mt-1">Try adjusting your filter or search query.</p>
                </div>
              ) : (
                filtered.map((m, i) => {
                  const isSelected = selected === m.id;
                  const avatarColor = AVATAR_COLORS[m.fromInitials] ?? 'var(--accent)';
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSelect(m.id)}
                      className={cn(
                        'w-full text-left p-3 transition-colors group relative animate-in fade-in slide-in-from-bottom-1',
                        isSelected ? 'bg-accent/5' : 'hover:bg-secondary/40',
                        m.unread && !isSelected && 'bg-secondary/20'
                      )}
                      style={{ animationDelay: `${Math.min(i, 8) * 30}ms`, animationFillMode: 'both' }}
                    >
                      {/* unread indicator */}
                      {m.unread && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-accent" />
                      )}
                      <div className="flex items-start gap-3 pl-2">
                        <AvatarBadge initials={m.fromInitials} size="md" color={avatarColor} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className={cn('text-xs truncate', m.unread ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground')}>
                                {m.from}
                              </span>
                              {m.starred && <Star className="w-3 h-3 text-warning fill-current shrink-0" />}
                            </div>
                            <span className={cn('text-[10px] shrink-0', m.unread ? 'text-accent font-medium' : 'text-muted-foreground')}>
                              {m.time}
                            </span>
                          </div>
                          <p className={cn('text-xs truncate mb-0.5', m.unread ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                            {m.subject}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate">{m.preview}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-md">
                              {m.account}
                            </span>
                            {m.unread && (
                              <span className="text-[10px] text-accent font-medium">New</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Message preview pane (desktop) */}
          <div className={cn(
            'lg:col-span-3 flex flex-col',
            'hidden lg:flex',
            !selected && 'flex'
          )}>
            {selectedMessage ? (
              <DesktopPreview
                message={selectedMessage}
                body={MESSAGE_BODIES[selectedMessage.id] ?? ''}
                meta={MESSAGE_META[selectedMessage.id] ?? { fromEmail: '', attachments: [] }}
                onBack={() => setSelected(null)}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-base font-semibold text-foreground">No message selected</h3>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-md leading-relaxed">
                  Select a message from the list to read its full content and reply.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile preview sheet */}
      <Sheet open={mobilePreviewOpen} onOpenChange={setMobilePreviewOpen}>
        <SheetContent side="bottom" className="h-[90vh] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Message Preview</SheetTitle>
            <SheetDescription>View full message content</SheetDescription>
          </SheetHeader>
          {selectedMessage && (
            <MobilePreview
              message={selectedMessage}
              body={MESSAGE_BODIES[selectedMessage.id] ?? ''}
              meta={MESSAGE_META[selectedMessage.id] ?? { fromEmail: '', attachments: [] }}
              onBack={() => setMobilePreviewOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ---- Desktop preview component ----
function DesktopPreview({
  message, body, meta, onBack,
}: {
  message: typeof inboxMessages[number];
  body: string;
  meta: { fromEmail: string; attachments: string[] };
  onBack: () => void;
}) {
  const avatarColor = AVATAR_COLORS[message.fromInitials] ?? 'var(--accent)';
  return (
    <div className="flex flex-col h-full">
      {/* Preview header */}
      <div className="p-4 border-b border-border flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <button
            onClick={onBack}
            className="lg:hidden w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <AvatarBadge initials={message.fromInitials} size="lg" color={avatarColor} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground truncate">{message.from}</h3>
              {message.starred && <Star className="w-3.5 h-3.5 text-warning fill-current shrink-0" />}
            </div>
            <p className="text-[11px] text-muted-foreground truncate">{meta.fromEmail}</p>
            <p className="text-[11px] text-muted-foreground truncate">to: Sarah Chen</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Reply">
            <Reply className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Forward">
            <Forward className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Archive">
            <Archive className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subject + meta */}
      <div className="p-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground mb-2">{message.subject}</h2>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 bg-secondary px-2 py-0.5 rounded-md">
            {message.account}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {message.time}
          </span>
          {meta.attachments.length > 0 && (
            <span className="inline-flex items-center gap-1">
              <Paperclip className="w-3 h-3" />
              {meta.attachments.length} attachment{meta.attachments.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap text-xs text-foreground leading-relaxed font-sans">
            {body}
          </pre>
        </div>

        {/* Attachments */}
        {meta.attachments.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Attachments</p>
            <div className="space-y-2">
              {meta.attachments.map((att) => (
                <div key={att} className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:border-accent/40 transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Paperclip className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{att}</p>
                    <p className="text-[10px] text-muted-foreground">Click to download</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reply box */}
      <div className="p-4 border-t border-border">
        <div className="bg-secondary/40 border border-border rounded-lg p-3">
          <textarea
            placeholder="Type your reply…"
            rows={2}
            className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Attach">
                <Paperclip className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" title="Snooze">
                <Clock className="w-3.5 h-3.5" />
              </button>
            </div>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground h-7 text-xs">
              <Reply className="w-3 h-3 mr-1" /> Send Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Mobile preview (sheet content) ----
function MobilePreview({
  message, body, meta, onBack,
}: {
  message: typeof inboxMessages[number];
  body: string;
  meta: { fromEmail: string; attachments: string[] };
  onBack: () => void;
}) {
  const avatarColor = AVATAR_COLORS[message.fromInitials] ?? 'var(--accent)';
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <AvatarBadge initials={message.fromInitials} size="md" color={avatarColor} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-foreground truncate">{message.from}</p>
          <p className="text-[11px] text-muted-foreground truncate">{meta.fromEmail}</p>
        </div>
        <button className="w-8 h-8 rounded-md hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-base font-bold text-foreground mb-2">{message.subject}</h2>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-4">
          <span className="inline-flex items-center gap-1 bg-secondary px-2 py-0.5 rounded-md">
            {message.account}
          </span>
          <span>{message.time}</span>
        </div>
        <pre className="whitespace-pre-wrap text-xs text-foreground leading-relaxed font-sans">
          {body}
        </pre>
      </div>
      <div className="p-3 border-t border-border flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1 h-9">
          <Reply className="w-3.5 h-3.5 mr-1" /> Reply
        </Button>
        <Button variant="outline" size="sm" className="flex-1 h-9">
          <Forward className="w-3.5 h-3.5 mr-1" /> Forward
        </Button>
        <Button variant="outline" size="sm" className="h-9 w-9 p-0">
          <Archive className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
