'use client';

import { Check, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TUnitSystem } from '@/types/recipe.type';

type UnitSystemMenuProps = {
  value: TUnitSystem;
  onChange: (value: TUnitSystem) => void;
};

export default function UnitSystemMenu({
  value,
  onChange,
}: UnitSystemMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label="Measurement system"
          className="gap-1.5"
        >
          {value === 'us' ? 'US' : 'Metric'}
          <ChevronDown className="size-3.5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange('us')}>
          <span className="flex-1">US</span>

          {value === 'us' && <Check className="size-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onChange('metric')}>
          <span className="flex-1">Metric</span>

          {value === 'metric' && <Check className="size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
