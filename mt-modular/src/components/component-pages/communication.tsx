'use client';
import * as React from 'react';
import {
  Heart, Star, Share2, Copy, Send, Mic, Play, ThumbsUp, MessageCircle,
  MoreHorizontal, Twitter, Github, Linkedin, Facebook, Check, X,
} from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/dashboard/primitives';
import { cn } from '@/lib/utils';

/* ====================== PREMIUM DESIGN SYSTEM (Communication) ====================== */
function CmStyles() {
  return (
    <style jsx global>{`
      .cm2-root {
        --cm2-radius-sm: 8px;
        --cm2-radius-md: 12px;
        --cm2-radius-lg: 16px;
        --cm2-shadow-xs: 0 1px 2px rgba(15,23,42,0.04);
        --cm2-shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
        --cm2-shadow-md: 0 4px 8px -2px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04);
        --cm2-shadow-lg: 0 12px 20px -4px rgba(15,23,42,0.08), 0 4px 8px -4px rgba(15,23,42,0.04);
      }
      .cm2-bg {
        background-color: var(--background);
        background-image:
          radial-gradient(at 15% 0%, rgba(70,95,255,0.030) 0px, transparent 50%),
          radial-gradient(at 85% 100%, rgba(122,90,248,0.024) 0px, transparent 50%);
      }
      .cm2-label {
        font-size: 0.6875rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
      .cm2-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, var(--border), transparent);
      }
      @keyframes cm2-typing {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-4px); opacity: 1; }
      }
      .cm2-dot-1 { animation: cm2-typing 1.4s ease-in-out infinite; }
      .cm2-dot-2 { animation: cm2-typing 1.4s ease-in-out 0.2s infinite; }
      .cm2-dot-3 { animation: cm2-typing 1.4s ease-in-out 0.4s infinite; }
    `}</style>
  );
}

export function CommunicationPage() {
  return (
    <div className="cm2-root cm2-bg space-y-6">
      <CmStyles />
      <PageHeader breadcrumb={[{ label: 'Components' }, { label: 'Communication & Social' }]} title="Communication & Social" description="Chat bubbles, comments, reviews, share components, social icons" />

      {/* ============================================ CHAT BUBBLES ============================================ */}
      <SectionCard title="Chat Bubbles" description="4 variants — AI, User, Voice, Streaming">
        <div className="max-w-2xl space-y-4">
          {/* User message */}
          <div className="flex justify-end gap-2">
            <div className="max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-600)] px-4 py-2.5 text-sm font-medium text-white shadow-[var(--cm2-shadow-sm)]">
              How do I add a new product?
            </div>
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50" alt="" className="size-8 rounded-full object-cover" />
          </div>
          {/* AI message */}
          <div className="flex justify-start gap-2">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--cm2-shadow-xs)]"><Star className="size-4" strokeWidth={2.5} /></span>
            <div className="max-w-[75%] rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--text-body)] shadow-[var(--cm2-shadow-xs)]">
              Navigate to <span className="font-medium text-[var(--color-brand-500)]">E-commerce → Add Product</span>. Fill in details and click Save.
            </div>
          </div>
          {/* Voice message */}
          <div className="flex justify-start gap-2">
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50" alt="" className="size-8 rounded-full object-cover" />
            <div className="flex max-w-[75%] items-center gap-3 rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-[var(--cm2-shadow-xs)]">
              <button className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white"><Play className="size-3.5 translate-x-0.5 fill-current" /></button>
              <div className="flex items-center gap-0.5">
                {[8, 16, 12, 20, 14, 18, 10, 16, 6, 14, 20, 8, 12, 16, 10, 6, 14, 18, 12, 8].map((h, i) => (
                  <div key={i} className="w-0.5 rounded-full bg-[var(--color-brand-500)]" style={{ height: `${h}px` }} />
                ))}
              </div>
              <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--text-muted)]">0:12</span>
            </div>
          </div>
          {/* Streaming / typing indicator */}
          <div className="flex justify-start gap-2">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[#7a5af8] text-white shadow-[var(--cm2-shadow-xs)]"><Star className="size-4" strokeWidth={2.5} /></span>
            <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--card)] px-4 py-3.5 shadow-[var(--cm2-shadow-xs)]">
              <span className="cm2-dot-1 size-2 rounded-full bg-[var(--text-muted)]" />
              <span className="cm2-dot-2 size-2 rounded-full bg-[var(--text-muted)]" />
              <span className="cm2-dot-3 size-2 rounded-full bg-[var(--text-muted)]" />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ COMMENTS ============================================ */}
      <SectionCard title="Comments" description="3 variants — Threaded, Reactions, Review">
        <div className="max-w-2xl space-y-5">
          {/* Comment with reactions */}
          <div className="flex gap-3">
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=8B5CF6&radius=50" alt="" className="size-9 rounded-full object-cover" />
            <div className="flex-1">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--cm2-shadow-xs)]">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[var(--text-strong)]">Sara Nguyen</p>
                  <span className="text-xs font-medium text-[var(--text-subtle)]">2h ago</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--text-body)]">This looks great! The animations are smooth and the design is clean.</p>
              </div>
              <div className="mt-1.5 flex gap-2">
                <button className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)] transition hover:border-[var(--color-brand-300)] hover:text-[var(--color-brand-500)]"><Heart className="size-3" strokeWidth={2.5} /> 4</button>
                <button className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)] transition hover:border-[var(--color-brand-300)] hover:text-[var(--color-brand-500)]"><ThumbsUp className="size-3" strokeWidth={2.5} /> 2</button>
                <button className="text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">Reply</button>
              </div>

              {/* Threaded reply */}
              <div className="mt-3 flex gap-3 border-l-2 border-[var(--border)] pl-3">
                <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50" alt="" className="size-7 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--cm2-shadow-xs)]">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[var(--text-strong)]">James Park</p>
                      <span className="rounded-full bg-[var(--color-brand-50)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--color-brand-600)] dark:bg-[rgba(70,95,255,0.16)] dark:text-[var(--color-brand-300)]">AUTHOR</span>
                      <span className="text-xs font-medium text-[var(--text-subtle)]">1h ago</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[var(--text-body)]">Thanks Sara! We spent a lot of time on the microinteractions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review comment */}
          <div className="cm2-divider" />
          <div className="flex gap-3">
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50" alt="" className="size-9 rounded-full object-cover" />
            <div className="flex-1">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-[var(--cm2-shadow-xs)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--text-strong)]">Maria Lopez</p>
                    <span className="text-xs font-medium text-[var(--text-subtle)]">3h ago</span>
                  </div>
                  <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" strokeWidth={2.5} />)}</div>
                </div>
                <p className="mt-1.5 text-sm font-medium text-[var(--text-body)]">Absolutely love this! The attention to detail is incredible. 5 stars!</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ REVIEWS ============================================ */}
      <SectionCard title="Reviews" description="3 variants — Product, Star, Testimonial">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Product review */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--cm2-shadow-xs)]">
            <div className="flex items-center gap-3">
              <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=10B981&radius=50" alt="" className="size-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-[var(--text-strong)]">James Park</p>
                <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" strokeWidth={2.5} />)}</div>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-[var(--text-body)]">Exceeded all my expectations. Build quality is amazing and it works flawlessly.</p>
            <p className="mt-2 text-xs font-medium text-[var(--text-muted)]">Verified Purchase · 2 days ago</p>
          </div>
          {/* Product review 2 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-[var(--cm2-shadow-xs)]">
            <div className="flex items-center gap-3">
              <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=EC4899&radius=50" alt="" className="size-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-[var(--text-strong)]">Maria Lopez</p>
                <div className="flex gap-0.5">{[1, 2, 3, 4].map(s => <Star key={s} className="size-3 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" strokeWidth={2.5} />)}<Star className="size-3 text-[var(--text-faint)]" strokeWidth={2.5} /></div>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-[var(--text-body)]">Great product overall, but setup was a bit confusing. Documentation could be better.</p>
            <p className="mt-2 text-xs font-medium text-[var(--text-muted)]">Verified Purchase · 1 week ago</p>
          </div>
          {/* Testimonial */}
          <div className="sm:col-span-2 rounded-xl border border-[var(--color-brand-200)] bg-gradient-to-br from-[var(--color-brand-50)] to-[#7a5af8]/5 p-6 shadow-[var(--cm2-shadow-xs)] dark:border-[rgba(70,95,255,0.24)] dark:from-[rgba(70,95,255,0.08)]">
            <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="size-5 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" strokeWidth={2.5} />)}</div>
            <p className="mt-3 text-base font-medium text-[var(--text-strong)]">"This is the best UI library we've ever used. Our team ships 3x faster and the quality is outstanding. Highly recommended for any serious project."</p>
            <div className="mt-4 flex items-center gap-3">
              <img src="https://api.dicebear.com/9.x/initials/svg?seed=User&backgroundColor=F79009&radius=50" alt="" className="size-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-[var(--text-strong)]">Alex Chen</p>
                <p className="text-xs font-medium text-[var(--text-muted)]">CTO, TechCorp</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ============================================ SHARE & SOCIAL ============================================ */}
      <SectionCard title="Share & Social" description="4 variants — Social Share, Copy, Floating, Icons">
        <div className="space-y-5">
          {/* Social share buttons */}
          <div>
            <p className="cm2-label mb-3">Social Share</p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1DA1F2] px-4 text-sm font-medium text-white transition hover:opacity-90"><Twitter className="size-4" strokeWidth={2.5} /> Twitter</button>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#0A66C2] px-4 text-sm font-medium text-white transition hover:opacity-90"><Linkedin className="size-4" strokeWidth={2.5} /> LinkedIn</button>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1877F2] px-4 text-sm font-medium text-white transition hover:opacity-90"><Facebook className="size-4" strokeWidth={2.5} /> Facebook</button>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#181717] px-4 text-sm font-medium text-white transition hover:opacity-90"><Github className="size-4" strokeWidth={2.5} /> GitHub</button>
            </div>
          </div>
          <div className="cm2-divider" />
          {/* Copy link */}
          <div>
            <p className="cm2-label mb-3">Copy Link</p>
            <ShareCopyBar />
          </div>
          <div className="cm2-divider" />
          {/* Social icons */}
          <div>
            <p className="cm2-label mb-3">Social Icons</p>
            <div className="flex flex-wrap gap-2">
              {[Twitter, Linkedin, Facebook, Github, Share2].map((Icon, i) => (
                <button key={i} className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)] shadow-[var(--cm2-shadow-xs)] transition hover:scale-110 hover:border-[var(--color-brand-300)] hover:text-[var(--color-brand-500)]">
                  <Icon className="size-4" strokeWidth={2.5} />
                </button>
              ))}
            </div>
          </div>
          <div className="cm2-divider" />
          {/* Floating share */}
          <div>
            <p className="cm2-label mb-3">Floating Share</p>
            <div className="inline-flex items-center gap-1 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[var(--cm2-shadow-lg)]">
              <button className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--surface-sunken)] text-[var(--text-muted)] transition hover:text-[var(--text-strong)]"><Share2 className="size-4" strokeWidth={2.5} /></button>
              <div className="h-6 w-px bg-[var(--border)]" />
              <button className="inline-flex size-9 items-center justify-center rounded-xl text-[#1DA1F2] transition hover:bg-[var(--surface-sunken)]"><Twitter className="size-4" strokeWidth={2.5} /></button>
              <button className="inline-flex size-9 items-center justify-center rounded-xl text-[#0A66C2] transition hover:bg-[var(--surface-sunken)]"><Linkedin className="size-4" strokeWidth={2.5} /></button>
              <button className="inline-flex size-9 items-center justify-center rounded-xl text-[#1877F2] transition hover:bg-[var(--surface-sunken)]"><Facebook className="size-4" strokeWidth={2.5} /></button>
              <div className="h-6 w-px bg-[var(--border)]" />
              <button className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[var(--color-brand-500)] px-3 text-xs font-medium text-white transition hover:bg-[var(--color-brand-600)]"><Copy className="size-3.5" strokeWidth={2.5} /> Copy</button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function ShareCopyBar() {
  const [copied, setCopied] = React.useState(false);
  const url = 'mtverse.io/p/1428';
  return (
    <div className="flex max-w-md items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-[var(--cm2-shadow-xs)]">
      <span className="flex-1 truncate px-2 text-sm font-medium text-[var(--text-body)]">{url}</span>
      <button onClick={() => { navigator.clipboard?.writeText('https://' + url); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className={cn('inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium transition', copied ? 'bg-[var(--color-success-50)] text-[var(--color-success-600)] dark:bg-[rgba(18,183,106,0.16)] dark:text-[var(--color-success-500)]' : 'bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]')}>
        {copied ? <><Check className="size-3.5" strokeWidth={2.5} /> Copied</> : <><Copy className="size-3.5" strokeWidth={2.5} /> Copy link</>}
      </button>
    </div>
  );
}
