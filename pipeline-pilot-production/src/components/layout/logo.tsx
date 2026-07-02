import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg bg-gradient-to-br from-accent via-accent to-chart-1 flex items-center justify-center overflow-hidden shadow-lg shadow-accent/20',
        className
      )}
    >
      {/* Inner shape — abstract pipeline chart */}
      <svg viewBox="0 0 24 24" fill="none" className="w-1/2 h-1/2">
        <path
          d="M5 16 L9 11 L13 13 L19 6"
          stroke="oklch(0.09 0.005 260)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="6" r="2" fill="oklch(0.09 0.005 260)" />
        <circle cx="5" cy="16" r="1.4" fill="oklch(0.09 0.005 260)" opacity="0.6" />
      </svg>
    </div>
  );
}
