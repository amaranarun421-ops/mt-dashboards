'use client';

import * as React from 'react';
import { Bot, Plus, Send, Sparkles, Paperclip, MessageSquare, Search, Trash2, MoreHorizontal, Copy, ThumbsUp, ThumbsDown, RefreshCw, User, Mic } from 'lucide-react';
import { PageHeader, StatusBadge, UserAvatar } from '@/components/dashboard/primitives';
import { Select } from '@/components/dashboard/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  time: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: '1', title: 'React performance optimization', preview: 'Here are 5 key strategies...', time: '2 min ago',
    messages: [
      { id: 'm1', role: 'user', content: 'How can I optimize React re-renders in a large dashboard?', time: '2:30 PM' },
      { id: 'm2', role: 'assistant', content: 'Here are 5 key strategies for optimizing React re-renders in large dashboards:\n\n1. **Memoization** — Use React.memo for pure components, useMemo for expensive computations, and useCallback for event handlers passed as props.\n\n2. **State colocation** — Keep state as close to where it is used as possible. Avoid putting all state in a single top-level context.\n\n3. **Virtualization** — For long lists and tables, use react-window or @tanstack/react-virtual to only render visible rows.\n\n4. **Code splitting** — Use dynamic imports and React.lazy for route-level components to reduce initial bundle size.\n\n5. **Avoid inline objects** — Inline objects and arrays create new references on every render, causing memoized children to re-render.', time: '2:31 PM' },
    ],
  },
  {
    id: '2', title: 'TypeScript generic constraints', preview: 'You can use the extends keyword...', time: '1 hour ago',
    messages: [
      { id: 'm1', role: 'user', content: 'How do I constrain a generic type in TypeScript?', time: '1:00 PM' },
      { id: 'm2', role: 'assistant', content: 'You can use the `extends` keyword to constrain generics in TypeScript...', time: '1:01 PM' },
    ],
  },
  {
    id: '3', title: 'Tailwind CSS dark mode setup', preview: 'Use the dark: variant...', time: '3 hours ago',
    messages: [
      { id: 'm1', role: 'user', content: 'How to set up dark mode in Tailwind v4?', time: '11:00 AM' },
      { id: 'm2', role: 'assistant', content: 'Use the `dark:` variant with a class strategy...', time: '11:02 AM' },
    ],
  },
];

const portraitUrl = 'https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50';

export function AIChatPage() {
  const { toast } = useToast();
  const [activeConv, setActiveConv] = React.useState('1');
  const [input, setInput] = React.useState('');
  const [model, setModel] = React.useState('gpt-4-turbo');
  const [isTyping, setIsTyping] = React.useState(false);
  const [extraMessages, setExtraMessages] = React.useState<Message[]>([]);
  const [search, setSearch] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const currentConv = conversations.find((c) => c.id === activeConv) ?? conversations[0];
  const allMessages = [...currentConv.messages, ...extraMessages];

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages.length, isTyping]);

  function handleSend() {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    setExtraMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Great question! Here is my analysis:\n\nBased on your input, I would recommend focusing on the following areas:\n\n1. **Architecture** — Consider a modular approach with clear separation of concerns\n2. **Performance** — Profile before optimizing, and target the biggest bottlenecks first\n3. **Testing** — Add unit tests for critical paths and integration tests for user flows\n\nWould you like me to elaborate on any of these points?',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setExtraMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  }

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col gap-0 sm:h-[calc(100vh-160px)]">
      <div className="flex flex-1 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        {/* Sidebar — conversation list */}
        <div className="hidden w-72 flex-shrink-0 flex-col border-r border-[var(--border-subtle)] md:flex">
          <div className="border-b border-[var(--border-subtle)] p-3">
            <button type="button" onClick={() => { setExtraMessages([]); toast({ title: 'New conversation' }); }} className="ds-btn ds-btn-primary w-full">
              <Plus className="size-4" /> New chat
            </button>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-subtle)]" />
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search chats..." className="ds-input !h-9 pl-9 text-xs" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto modern-scrollbar p-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => { setActiveConv(conv.id); setExtraMessages([]); }}
                className={cn(
                  'mb-1 flex w-full cursor-pointer items-start gap-2.5 rounded-xl p-3 text-left transition',
                  activeConv === conv.id ? 'bg-[var(--color-brand-50)] dark:bg-[rgba(70,95,255,0.16)]' : 'hover:bg-[var(--surface-sunken)]',
                )}
              >
                <MessageSquare className={cn('mt-0.5 size-4 flex-shrink-0', activeConv === conv.id ? 'text-[var(--color-brand-500)]' : 'text-[var(--text-muted)]')} />
                <div className="min-w-0 flex-1">
                  <p className={cn('truncate text-sm font-semibold', activeConv === conv.id ? 'text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]' : 'text-[var(--text-strong)]')}>{conv.title}</p>
                  <p className="mt-0.5 truncate text-xs font-medium text-[var(--text-muted)]">{conv.preview}</p>
                  <p className="mt-0.5 text-[10px] font-semibold text-[var(--text-subtle)]">{conv.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white">
                <Bot className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--text-strong)]">{currentConv.title}</p>
                <div className="flex items-center gap-1.5">
                  <span className="ds-dot ds-dot-success" />
                  <span className="text-xs font-medium text-[var(--text-muted)]">Online · {model}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-44">
                <Select size="sm" value={model} onChange={setModel} options={[
                  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
                  { value: 'gpt-4o', label: 'GPT-4o' },
                  { value: 'claude-3.5', label: 'Claude 3.5 Sonnet' },
                  { value: 'gemini-1.5', label: 'Gemini 1.5 Pro' },
                ]} aria-label="Model selector" />
              </div>
              <button type="button" className="ds-btn-icon !h-9 !w-9" aria-label="More"><MoreHorizontal className="size-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto modern-scrollbar p-4">
            <div className="mx-auto max-w-3xl space-y-6">
              {allMessages.map((msg) => (
                <div key={msg.id} className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}>
                  {msg.role === 'assistant' ? (
                    <span className="inline-flex size-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white">
                      <Bot className="size-5" />
                    </span>
                  ) : (
                    <img src={portraitUrl} alt="User" className="size-9 flex-shrink-0 rounded-xl object-cover" />
                  )}
                  <div className={cn('max-w-[80%]', msg.role === 'user' && 'items-end flex flex-col')}>
                    <div className={cn(
                      'rounded-2xl px-4 py-3 text-sm font-medium',
                      msg.role === 'assistant'
                        ? 'rounded-tl-sm bg-[var(--surface-sunken)] text-[var(--text-strong)]'
                        : 'rounded-tr-sm bg-[var(--color-brand-500)] text-white',
                    )}>
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="mt-1.5 flex items-center gap-2 pl-1">
                        <span className="text-[10px] font-medium text-[var(--text-subtle)]">{msg.time}</span>
                        <button type="button" onClick={() => { navigator.clipboard?.writeText(msg.content); toast({ title: 'Copied to clipboard' }); }} className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]" aria-label="Copy"><Copy className="size-3.5" /></button>
                        <button type="button" className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]" aria-label="Good response"><ThumbsUp className="size-3.5" /></button>
                        <button type="button" className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]" aria-label="Bad response"><ThumbsDown className="size-3.5" /></button>
                        <button type="button" className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]" aria-label="Regenerate"><RefreshCw className="size-3.5" /></button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <span className="inline-flex size-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-white">
                    <Bot className="size-5" />
                  </span>
                  <div className="rounded-2xl rounded-tl-sm bg-[var(--surface-sunken)] px-4 py-3">
                    <div className="flex gap-1">
                      <span className="size-2 animate-bounce rounded-full bg-[var(--text-muted)]" style={{ animationDelay: '0ms' }} />
                      <span className="size-2 animate-bounce rounded-full bg-[var(--text-muted)]" style={{ animationDelay: '150ms' }} />
                      <span className="size-2 animate-bounce rounded-full bg-[var(--text-muted)]" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[var(--border-subtle)] p-3">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-end gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 focus-within:border-[var(--color-brand-400)] focus-within:ring-4 focus-within:ring-[rgba(70,95,255,0.12)]">
                <button type="button" className="ds-btn-icon !h-9 !w-9 flex-shrink-0" aria-label="Attach file"><Paperclip className="size-4" /></button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Type your message... (Shift+Enter for newline)"
                  rows={1}
                  className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm font-medium text-[var(--text-strong)] outline-none placeholder:text-[var(--text-subtle)]"
                />
                <button type="button" className="ds-btn-icon !h-9 !w-9 flex-shrink-0" aria-label="Voice input"><Mic className="size-4" /></button>
                <button type="button" onClick={handleSend} disabled={!input.trim()} className="ds-btn ds-btn-primary !h-9 !w-9 flex-shrink-0 !px-0 disabled:opacity-40" aria-label="Send">
                  <Send className="size-4" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] font-medium text-[var(--text-subtle)]">AI may produce inaccurate information. Verify important details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
