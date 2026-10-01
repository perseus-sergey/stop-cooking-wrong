'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TUnitSystem } from '@/types/recipe.type';

type TUnitSystemToggleProps = {
  value: TUnitSystem;
  onChange: (value: TUnitSystem) => void;
  className?: string;
};

export default function UnitSystemToggle({
  value,
  onChange,
  className,
}: TUnitSystemToggleProps) {
  return (
    <div
      className={cn(
        'flex items-center rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800',
        className
      )}
    >
      <Button
        type="button"
        size="sm"
        variant="ghost"
        aria-pressed={value === 'us'}
        onClick={() => onChange('us')}
        className={cn(
          'h-7 px-2 text-xs',
          value === 'us'
            ? 'bg-white text-zinc-900 shadow-sm hover:bg-white dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-950'
            : 'text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-50'
        )}
      >
        US
      </Button>

      <Button
        type="button"
        size="sm"
        variant="ghost"
        aria-pressed={value === 'metric'}
        onClick={() => onChange('metric')}
        className={cn(
          'h-7 px-2 text-xs',
          value === 'metric'
            ? 'bg-white text-zinc-900 shadow-sm hover:bg-white dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-950'
            : 'text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-50'
        )}
      >
        Metric
      </Button>
    </div>
  );
}
