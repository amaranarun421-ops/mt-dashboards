'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, CheckCircle2, Loader2, Clock } from 'lucide-react';

interface UpdatesFormProps {
  /** Target completion time as ISO string */
  targetIso: string;
}

function formatCountdown(ms: number): string {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

export function UpdatesForm({ targetIso }: UpdatesFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const tick = () => setRemaining(formatCountdown(target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status !== 'idle') return;
    setStatus('loading');
    // simulate API call
    setTimeout(() => setStatus('done'), 900);
  };

  return (
    <div className="w-full">
      {/* Estimated completion countdown */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 mb-5 text-left">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-3">
          <Clock className="w-3.5 h-3.5" />
          Estimated time remaining
        </div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <p className="font-mono text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-foreground">
            {remaining}
          </p>
          <p className="text-sm text-muted-foreground">
            (target completion:{' '}
            <span className="font-medium text-foreground/90">
              {new Date(targetIso).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </span>
            )
          </p>
        </div>
        <div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent via-accent to-chart-1 animate-pulse"
            style={{ width: '38%' }}
          />
        </div>
      </div>

      {/* Subscribe form */}
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 text-left">
        <p className="text-sm font-semibold mb-1">Get notified when we&apos;re back</p>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          We&apos;ll email you the moment Pipeline Pilot is fully operational again — no spam, just
          the all-clear.
        </p>

        {status === 'done' ? (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-success/10 border border-success/25">
            <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">You&apos;re on the list</p>
              <p className="text-xs text-muted-foreground mt-0.5 break-words">
                Confirmation sent to <span className="font-mono">{email}</span>. We&apos;ll be in
                touch shortly.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 flex-1"
              autoComplete="email"
              disabled={status === 'loading'}
            />
            <Button
              type="submit"
              size="lg"
              disabled={status === 'loading' || !email}
              className="bg-accent text-accent-foreground hover:bg-accent/90 h-10 sm:px-5"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Subscribing…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Notify me
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
