'use client';

import * as React from 'react';
import {
  Search, Send, Paperclip, Mic, MoreHorizontal, Phone, Video, ArrowLeft,
  CheckCheck, Check, Pin, Smile, Star, Users, Bot, Circle, Info, Image as ImageIcon,
  FileText, Download, Trash2, Edit3, ChevronDown, Filter, Plus, Settings, X,
} from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

/* ====================== CHAT PAGE STYLES ====================== */
function ChatStyles() {
  return (
    <style jsx global>{`
      .ct-bg { background: var(--background); }
      .ct-card { border-radius: 16px; border: 1px solid var(--border); background: var(--card); box-shadow: 0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06); }
      .ct-title { font-size: 0.9375rem; font-weight: 600; color: var(--text-strong); letter-spacing: -0.01em; }
      .ct-desc { font-size: 0.75rem; font-weight: 400; color: var(--text-muted); }
      .ct-badge { display: inline-flex; align-items: center; gap: 0.25rem; border-radius: 6px; padding: 0.125rem 0.5rem; font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; background: rgba(122,90,248,0.1); color: #7A5AF8; }
      .ct-input { height: 2.5rem; width: 100%; border-radius: 10px; border: 1px solid var(--border); background: var(--card); padding-left: 2.25rem; padding-right: 0.75rem; font-size: 0.8125rem; font-weight: 400; color: var(--text-strong); transition: border-color 0.15s ease, box-shadow 0.15s ease; box-shadow: 0 1px 2px rgba(15,23,42,0.04); outline: none; }
      .ct-input::placeholder { color: var(--text-subtle); }
      .ct-input:focus { border-color: var(--color-brand-500); box-shadow: 0 0 0 3px rgba(70,95,255,0.12); }
      @keyframes ct-msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      .ct-msg-in { animation: ct-msg-in 0.3s ease-out; }
      @keyframes ct-typing { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-4px); opacity: 1; } }
      .ct-typing-dot { animation: ct-typing 1.4s ease-in-out infinite; }
      .ct-scroll::-webkit-scrollbar { width: 4px; }
      .ct-scroll::-webkit-scrollbar-track { background: transparent; }
      .ct-scroll::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 2px; }
    `}</style>
  );
}

/* ====================== MOCK DATA ====================== */
interface Message { id: string; sender: 'me' | 'them'; text: string; time: string; status?: 'sent' | 'delivered' | 'read'; reactions?: string[]; }
interface Conversation { id: string; name: string; avatar: string; lastMessage: string; time: string; unread: number; online: boolean; type: 'dm' | 'group' | 'ai'; pinned?: boolean; messages: Message[]; }

const initialConversations: Conversation[] = [
  {
    id: 'c1', name: 'Sara Nguyen', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50',
    lastMessage: 'Perfect! Let me review the design.', time: '2m', unread: 2, online: true, type: 'dm', pinned: true,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey! I just finished the new dashboard mockups.', time: '10:24 AM' },
      { id: 'm2', sender: 'me', text: 'Awesome! Can you share them?', time: '10:25 AM', status: 'read' },
      { id: 'm3', sender: 'them', text: 'Sure, sending the Figma link now.', time: '10:26 AM' },
      { id: 'm4', sender: 'them', text: 'Perfect! Let me review the design.', time: '10:28 AM', reactions: ['heart'] },
    ],
  },
  {
    id: 'c2', name: 'Design Team', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50',
    lastMessage: 'James: Standup in 5 minutes', time: '8m', unread: 5, online: false, type: 'group',
    messages: [
      { id: 'm1', sender: 'them', text: 'James: Morning everyone! Standup in 5 minutes', time: '10:20 AM' },
      { id: 'm2', sender: 'them', text: 'Maria: I will be 2 min late', time: '10:21 AM' },
      { id: 'm3', sender: 'me', text: 'On my way', time: '10:22 AM', status: 'delivered' },
    ],
  },
  {
    id: 'c3', name: 'AI Assistant', avatar: '', lastMessage: 'How can I help you today?', time: '15m', unread: 0, online: true, type: 'ai',
    messages: [
      { id: 'm1', sender: 'them', text: 'Hello! I am your AI assistant. How can I help you today?', time: '10:15 AM' },
    ],
  },
  {
    id: 'c4', name: 'James Park', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50',
    lastMessage: 'The PR is ready for review', time: '1h', unread: 0, online: false, type: 'dm',
    messages: [
      { id: 'm1', sender: 'them', text: 'The PR is ready for review', time: '9:30 AM' },
      { id: 'm2', sender: 'me', text: 'Great, I will check it after standup', time: '9:32 AM', status: 'read' },
    ],
  },
  {
    id: 'c5', name: 'Maria Lopez', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50',
    lastMessage: 'Thanks for the quick turnaround!', time: '3h', unread: 0, online: true, type: 'dm',
    messages: [
      { id: 'm1', sender: 'me', text: 'Here are the updated API docs', time: '7:30 AM', status: 'read' },
      { id: 'm2', sender: 'them', text: 'Thanks for the quick turnaround!', time: '7:45 AM' },
    ],
  },
  {
    id: 'c6', name: 'Engineering Team', avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50',
    lastMessage: 'Alex: Deploy is successful', time: '5h', unread: 0, online: false, type: 'group',
    messages: [
      { id: 'm1', sender: 'them', text: 'Alex: Deploy is successful', time: '5:30 AM' },
    ],
  },
];

/* ====================== CHAT PAGE ====================== */
export function ChatPage() {
  return (
    <div className="ct-bg space-y-6">
      <ChatStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Forms & Data' }, { label: 'Chat' }]} title="Chat" description="Chat inbox with conversations, messages, typing indicators, reactions, and mock interactions." />
      <ChatInbox />
    </div>
  );
}

/* ====================== CHAT INBOX ====================== */
function ChatInbox() {
  const [conversations, setConversations] = React.useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = React.useState('c1');
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | 'dm' | 'group' | 'ai'>('all');
  const [message, setMessage] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const [showMobileList, setShowMobileList] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const active = conversations.find(c => c.id === activeId)!;
  const filtered = conversations.filter(c =>
    (filter === 'all' || c.type === filter) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [active.messages, typing]);

  function sendMessage() {
    if (!message.trim()) return;
    const newMsg: Message = { id: 'm' + Date.now(), sender: 'me', text: message, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), status: 'sent' };
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, newMsg], lastMessage: message, time: 'now' } : c));
    setMessage('');

    // Simulate typing + reply
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const replies = ['Got it!', 'Sure, I will take a look.', 'Thanks for sharing!', 'Let me check and get back to you.', 'Sounds good!', 'Perfect, that works for me.'];
      const reply: Message = { id: 'm' + Date.now() + 1, sender: 'them', text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) };
      setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text, time: 'now' } : c));
    }, 2000);
  }

  function selectConversation(id: string) {
    setActiveId(id);
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
    setShowMobileList(false);
  }

  return (
    <div className="ct-card overflow-hidden">
      <div className="mb-3 flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-8 items-center justify-center rounded-lg" style={{ background: 'rgba(122,90,248,0.1)', color: '#7A5AF8' }}><Users className="size-4" strokeWidth={2.5} /></span>
          <div><div className="flex items-center gap-2"><h3 className="ct-title">Chat Inbox</h3><span className="ct-badge">Chat · 01</span></div><p className="ct-desc">Real-time messaging with mock interactions.</p></div>
        </div>
        <div className="flex gap-1">
          <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Filter className="size-3.5" strokeWidth={2.5} /></button>
          <button className="inline-flex size-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Settings className="size-3.5" strokeWidth={2.5} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ height: 560 }}>
        {/* Conversation List */}
        <div className={cn('border-r border-[var(--border)]', !showMobileList && 'hidden lg:block')}>
          {/* Search + filters */}
          <div className="border-b border-[var(--border)] p-3">
            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" strokeWidth={2.5} />
              <input className="ct-input" placeholder="Search conversations..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1">
              {(['all', 'dm', 'group', 'ai'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={cn('inline-flex h-7 items-center rounded-lg px-2.5 text-[10px] font-medium capitalize transition', filter === f ? 'bg-[var(--color-brand-500)] text-white' : 'bg-[var(--surface-sunken)] text-[var(--text-muted)] hover:text-[var(--text-strong)]')}>{f === 'dm' ? 'Direct' : f === 'ai' ? 'AI' : f}</button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="ct-scroll overflow-y-auto" style={{ height: 'calc(100% - 100px)' }}>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Search className="size-8 text-[var(--text-faint)]" strokeWidth={1.5} />
                <p className="mt-2 text-sm font-medium text-[var(--text-strong)]">No conversations found</p>
                <p className="text-xs font-medium text-[var(--text-muted)]">Try a different search</p>
              </div>
            ) : (
              filtered.map(c => (
                <button key={c.id} onClick={() => selectConversation(c.id)} className={cn('flex w-full items-center gap-3 border-b border-[var(--border-subtle)] p-3 text-left transition', activeId === c.id ? 'bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.08)]' : 'hover:bg-[var(--surface-sunken)]')}>
                  <div className="relative shrink-0">
                    {c.type === 'ai' ? (
                      <span className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white"><Bot className="size-5" strokeWidth={2.5} /></span>
                    ) : (
                      <img src={c.avatar} alt={c.name} className="size-10 rounded-full object-cover" />
                    )}
                    {c.online && <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[var(--card)] bg-[var(--color-success-500)]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {c.type === 'group' && <Users className="size-3 text-[var(--text-muted)]" strokeWidth={2.5} />}
                        <p className="truncate text-sm font-medium text-[var(--text-strong)]">{c.name}</p>
                        {c.pinned && <Pin className="size-2.5 text-[var(--text-muted)]" strokeWidth={2.5} />}
                      </div>
                      <span className="text-[10px] font-medium text-[var(--text-subtle)]">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="truncate text-xs font-medium text-[var(--text-muted)]">{c.lastMessage}</p>
                      {c.unread > 0 && <span className="ml-1 inline-flex size-4 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-[9px] font-bold text-white">{c.unread}</span>}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Active Chat */}
        <div className={cn('flex flex-col lg:col-span-2', showMobileList && 'hidden lg:flex')}>
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] p-3">
            <div className="flex items-center gap-2.5">
              <button onClick={() => setShowMobileList(true)} className="lg:hidden text-[var(--text-muted)]"><ArrowLeft className="size-4" strokeWidth={2.5} /></button>
              <div className="relative">
                {active.type === 'ai' ? <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white"><Bot className="size-4" strokeWidth={2.5} /></span> : <img src={active.avatar} alt={active.name} className="size-9 rounded-full object-cover" />}
                {active.online && <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[var(--card)] bg-[var(--color-success-500)]" />}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-strong)]">{active.name}</p>
                <p className="text-[10px] font-medium text-[var(--text-muted)]">{active.online ? 'Online' : 'Offline'} {active.type === 'group' && '· 8 members'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Phone className="size-4" strokeWidth={2.5} /></button>
              <button className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Video className="size-4" strokeWidth={2.5} /></button>
              <button className="inline-flex size-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><MoreHorizontal className="size-4" strokeWidth={2.5} /></button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="ct-scroll flex-1 overflow-y-auto bg-[var(--surface-sunken)] p-4">
            <div className="space-y-3">
              {active.messages.map(msg => (
                <div key={msg.id} className={cn('flex ct-msg-in', msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[75%] rounded-2xl px-3.5 py-2.5', msg.sender === 'me' ? 'rounded-br-md bg-[var(--color-brand-500)] text-white' : 'rounded-bl-md bg-[var(--card)] text-[var(--text-body)] shadow-sm')}>
                    <p className="text-sm font-medium">{msg.text}</p>
                    <div className={cn('mt-1 flex items-center gap-1', msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                      <span className={cn('text-[10px] font-medium', msg.sender === 'me' ? 'text-white/60' : 'text-[var(--text-subtle)]')}>{msg.time}</span>
                      {msg.sender === 'me' && msg.status === 'read' && <CheckCheck className="size-3 text-white/60" strokeWidth={2.5} />}
                      {msg.sender === 'me' && msg.status === 'delivered' && <CheckCheck className="size-3 text-white/40" strokeWidth={2.5} />}
                      {msg.sender === 'me' && msg.status === 'sent' && <Check className="size-3 text-white/40" strokeWidth={2.5} />}
                    </div>
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="mt-1 flex gap-0.5">
                        {msg.reactions.map((r, i) => <span key={i} className="inline-flex items-center justify-center rounded-full bg-[var(--color-error-50)] px-1.5 py-0.5 text-[10px] dark:bg-[rgba(240,68,56,0.16)]">{r === 'heart' && <Heart className="size-2.5 text-[var(--color-error-500)] fill-current" />}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-[var(--card)] px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="ct-typing-dot size-1.5 rounded-full bg-[var(--text-muted)]" />
                      <span className="ct-typing-dot size-1.5 rounded-full bg-[var(--text-muted)]" style={{ animationDelay: '0.2s' }} />
                      <span className="ct-typing-dot size-1.5 rounded-full bg-[var(--text-muted)]" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[var(--border)] p-3">
            <div className="flex items-center gap-2">
              <button className="inline-flex size-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Paperclip className="size-4" strokeWidth={2.5} /></button>
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--text-strong)] outline-none transition focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[rgba(70,95,255,0.12)] placeholder:text-[var(--text-subtle)]"
              />
              <button className="inline-flex size-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Smile className="size-4" strokeWidth={2.5} /></button>
              <button className="inline-flex size-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)]"><Mic className="size-4" strokeWidth={2.5} /></button>
              <button onClick={sendMessage} disabled={!message.trim()} className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-white transition hover:bg-[var(--color-brand-600)] disabled:opacity-40"><Send className="size-4" strokeWidth={2.5} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heart({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>;
}
