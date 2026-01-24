import { useCountdown } from '@/hooks/useCountdown';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  timerEndAt?: string | null;
  compact?: boolean;
}

export function CountdownTimer({ timerEndAt, compact = false }: CountdownTimerProps) {
  const { hours, minutes, seconds, isExpired, totalSeconds } = useCountdown(timerEndAt);

  if (isExpired) {
    return (
      <div className={cn(
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-success/10 text-success',
        compact && 'px-2 py-1'
      )}>
        <Clock className={cn('w-3.5 h-3.5', compact && 'w-3 h-3')} />
        <span className={cn('text-xs font-semibold', compact && 'text-[10px]')}>
          Ochiq
        </span>
      </div>
    );
  }

  const isUrgent = totalSeconds < 3600; // Less than 1 hour

  return (
    <div className={cn(
      'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all',
      isUrgent 
        ? 'bg-accent text-accent-foreground animate-pulse-soft' 
        : 'bg-secondary text-secondary-foreground',
      compact && 'px-2 py-1'
    )}>
      <Clock className={cn('w-3.5 h-3.5', compact && 'w-3 h-3')} />
      <span className={cn('text-xs font-bold tabular-nums', compact && 'text-[10px]')}>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
